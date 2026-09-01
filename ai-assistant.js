/* ==========================================================================
   EDUNEXA AI — Core Client Application Logic
   ========================================================================== */

(function () {
  'use strict';

  // Application State
  const state = {
    conversations: [],
    activeConversationId: null,
    isGenerating: false,
    abortController: null,
    attachedImage: null, // { data: base64, mimeType: 'image/png', name: '...' }
    settings: {
      model: 'gemini-3.6-flash',
      systemInstruction: 'You are EduNexa AI, a patient educational coach who builds study plans, explains concepts clearly, creates quizzes, and guides learning progress step by step.',
      autoScroll: true,
      soundEffects: true
    }
  };

  // DOM Element Selectors
  const elements = {
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    appLayout: document.querySelector('.app-layout'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    closeSidebarBtn: document.getElementById('closeSidebarBtn'),
    newChatBtn: document.getElementById('newChatBtn'),
    searchInput: document.getElementById('searchInput'),
    conversationsList: document.getElementById('conversationsList'),
    settingsBtn: document.getElementById('settingsBtn'),
    profileBtn: document.getElementById('profileBtn'),

    // Main workspace
    activeModelLabel: document.getElementById('activeModelLabel'),
    chatTitle: document.getElementById('chatTitle'),
    exportChatBtn: document.getElementById('exportChatBtn'),
    clearChatBtn: document.getElementById('clearChatBtn'),
    chatViewport: document.getElementById('chatViewport'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    messagesContainer: document.getElementById('messagesContainer'),
    scrollBottomBtn: document.getElementById('scrollBottomBtn'),

    // Chat form
    chatForm: document.getElementById('chatForm'),
    chatTextarea: document.getElementById('chatTextarea'),
    charCounter: document.getElementById('charCounter'),
    attachBtn: document.getElementById('attachBtn'),
    studyPlanBtn: document.getElementById('studyPlanBtn'),
    imageFileInput: document.getElementById('imageFileInput'),
    attachmentPreview: document.getElementById('attachmentPreview'),
    previewImg: document.getElementById('previewImg'),
    previewFilename: document.getElementById('previewFilename'),
    removeAttachmentBtn: document.getElementById('removeAttachmentBtn'),
    voiceBtn: document.getElementById('voiceBtn'),
    stopBtn: document.getElementById('stopBtn'),
    sendBtn: document.getElementById('sendBtn'),

    // Modals
    settingsModal: document.getElementById('settingsModal'),
    profileModal: document.getElementById('profileModal'),
    confirmModal: document.getElementById('confirmModal'),
    confirmTitle: document.getElementById('confirmTitle'),
    confirmMessage: document.getElementById('confirmMessage'),
    confirmActionBtn: document.getElementById('confirmActionBtn'),

    // Settings inputs
    modelSelect: document.getElementById('modelSelect'),
    systemInstructionInput: document.getElementById('systemInstructionInput'),
    autoScrollToggle: document.getElementById('autoScrollToggle'),
    soundToggle: document.getElementById('soundToggle'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    exportAllDataBtn: document.getElementById('exportAllDataBtn'),
    importDataInput: document.getElementById('importDataInput'),
    clearAllDataBtn: document.getElementById('clearAllDataBtn'),

    // Profile counters
    metricChats: document.getElementById('metricChats'),
    metricMessages: document.getElementById('metricMessages'),
    metricStorage: document.getElementById('metricStorage'),

    toastContainer: document.getElementById('toastContainer')
  };

  // Configure Marked Markdown Renderer
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch (e) {
          console.error(e);
        }
      }
      return hljs.highlightAuto(code).value;
    }
  });

  // Audio Chime Synthesizer (Zero External File Dependencies)
  const soundFX = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playTone(frequency, type, duration, gainVal = 0.05) {
      if (!state.settings.soundEffects) return;
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio error silently ignored
      }
    },
    send() { this.playTone(587.33, 'sine', 0.15); }, // D5
    receive() { this.playTone(880, 'triangle', 0.25); }, // A5
    click() { this.playTone(440, 'sine', 0.08, 0.02); }
  };

  // Storage Helpers
  const STORAGE_KEYS = {
    CONVERSATIONS: 'edunexa_conversations',
    ACTIVE_ID: 'edunexa_active_id',
    SETTINGS: 'edunexa_settings'
  };

  function loadStorage() {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
        if (state.settings.model.includes('2.5-flash') || state.settings.model.includes('3.7-flash')) {
  state.settings.model = 'gemini-3.6-flash';
}
      }

      const savedConvs = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (savedConvs) {
        state.conversations = JSON.parse(savedConvs);
      }

      const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
      if (activeId && state.conversations.some(c => c.id === activeId)) {
        state.activeConversationId = activeId;
      } else if (state.conversations.length > 0) {
        state.activeConversationId = state.conversations[0].id;
      } else {
        createNewConversation();
      }
    } catch (e) {
      console.error('Storage parse error:', e);
      createNewConversation();
    }
  }

  function persistStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(state.conversations));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
      if (state.activeConversationId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, state.activeConversationId);
      }
    } catch (e) {
      showToast('Local storage quota reached. Consider clearing old conversations.', 'warning');
    }
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Conversation Helpers
  function createNewConversation() {
    const newId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newConv = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    state.conversations.unshift(newConv);
    state.activeConversationId = newId;
    persistStorage();
    renderConversationsList();
    renderActiveConversation();
    closeMobileSidebar();
  }

  function getActiveConversation() {
    return state.conversations.find(c => c.id === state.activeConversationId);
  }

  function generateTitleFromPrompt(prompt) {
    if (!prompt) return 'New Conversation';
    const clean = prompt.replace(/[^\w\s]/gi, '').trim();
    const words = clean.split(/\s+/).slice(0, 5).join(' ');
    return words.charAt(0).toUpperCase() + words.slice(1) || 'Conversation';
  }

  // Render Sidebar List with Search
  function renderConversationsList(filterQuery = '') {
    elements.conversationsList.innerHTML = '';
    const q = filterQuery.toLowerCase().trim();

    const filtered = state.conversations.filter(conv => {
      if (!q) return true;
      if (conv.title.toLowerCase().includes(q)) return true;
      return conv.messages.some(m => m.content.toLowerCase().includes(q));
    });

    if (filtered.length === 0) {
      elements.conversationsList.innerHTML = `<div style="padding:12px;font-size:0.8rem;color:var(--text-muted);text-align:center;">No conversations found</div>`;
      return;
    }

    filtered.forEach(conv => {
      const item = document.createElement('div');
      item.className = `conv-item ${conv.id === state.activeConversationId ? 'active' : ''}`;
      item.setAttribute('data-id', conv.id);

      item.innerHTML = `
        <span class="conv-title">${escapeHTML(conv.title)}</span>
        <button class="conv-delete-btn" title="Delete conversation" aria-label="Delete conversation">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.closest('.conv-delete-btn')) {
          e.stopPropagation();
          deleteConversation(conv.id);
          return;
        }
        state.activeConversationId = conv.id;
        persistStorage();
        renderConversationsList(elements.searchInput.value);
        renderActiveConversation();
        closeMobileSidebar();
      });

      elements.conversationsList.appendChild(item);
    });
  }

  function deleteConversation(id) {
    state.conversations = state.conversations.filter(c => c.id !== id);
    if (state.activeConversationId === id) {
      state.activeConversationId = state.conversations.length > 0 ? state.conversations[0].id : null;
      if (!state.activeConversationId) {
        createNewConversation();
        return;
      }
    }
    persistStorage();
    renderConversationsList(elements.searchInput.value);
    renderActiveConversation();
    showToast('Conversation deleted', 'info');
  }

  // Render Messages in Active Viewport
  function renderActiveConversation() {
    const conv = getActiveConversation();
    if (!conv) return;

    elements.chatTitle.textContent = conv.title;
    elements.activeModelLabel.textContent = state.settings.model;

    if (conv.messages.length === 0) {
      elements.welcomeScreen.style.display = 'flex';
      elements.messagesContainer.innerHTML = '';
      return;
    }

    elements.welcomeScreen.style.display = 'none';
    elements.messagesContainer.innerHTML = '';

    conv.messages.forEach((msg, idx) => {
      appendMessageToDOM(msg, idx);
    });

    scrollToBottom();
  }

  // Append Single Message to DOM
  function appendMessageToDOM(msg, index) {
    const isUser = msg.role === 'user';
    const row = document.createElement('div');
    row.className = `message-row ${isUser ? 'user' : 'assistant'}`;
    row.id = `msg-${index}`;

    const formattedTime = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let imageHTML = '';
    if (msg.image && msg.image.data) {
      imageHTML = `<img src="${msg.image.data}" class="msg-image-attachment" alt="User attachment">`;
    }

    const rawHTML = marked.parse(msg.content || '');
    const cleanHTML = DOMPurify.sanitize(rawHTML);

    row.innerHTML = `
      <div class="msg-avatar ${isUser ? 'user' : 'assistant'}">${isUser ? 'YOU' : 'AI'}</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-author">${isUser ? 'You' : 'EduNexa AI'}</span>
          <span class="msg-time">${formattedTime}</span>
        </div>
        <div class="msg-bubble">
          ${imageHTML}
          <div class="msg-text-content">${cleanHTML}</div>
        </div>
        <div class="msg-actions">
          <button class="msg-action-btn copy-msg-btn" title="Copy response">
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
          ${!isUser ? `
            <button class="msg-action-btn regen-msg-btn" title="Regenerate response">
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              <span>Regenerate</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Hook Code block copy buttons & message copy
    enhanceCodeBlocks(row);

    const copyBtn = row.querySelector('.copy-msg-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(msg.content);
        showToast('Message copied to clipboard', 'success');
      });
    }

    const regenBtn = row.querySelector('.regen-msg-btn');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        regenerateFromIndex(index);
      });
    }

    elements.messagesContainer.appendChild(row);
  }

  // Wrap `<pre>` with high-tech code card headers & real copy buttons
  function enhanceCodeBlocks(container) {
    const pres = container.querySelectorAll('pre');
    pres.forEach(pre => {
      if (pre.parentElement.classList.contains('code-block-wrapper')) return;

      const code = pre.querySelector('code');
      const langClass = code ? Array.from(code.classList).find(c => c.startsWith('language-')) : '';
      const language = langClass ? langClass.replace('language-', '') : 'Code';

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const header = document.createElement('div');
      header.className = 'code-header';
      header.innerHTML = `
        <span>${language.toUpperCase()}</span>
        <button class="copy-code-btn" type="button">Copy Code</button>
      `;

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const copyBtn = header.querySelector('.copy-code-btn');
      copyBtn.addEventListener('click', () => {
        const textToCopy = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = 'Copied!';
        showToast('Code copied to clipboard', 'success');
        setTimeout(() => { copyBtn.textContent = 'Copy Code'; }, 2000);
      });
    });
  }

  // Scroll Manager
  function scrollToBottom(force = false) {
    if (!state.settings.autoScroll && !force) return;
    elements.chatViewport.scrollTop = elements.chatViewport.scrollHeight;
  }

  // Streaming Chat Dispatcher
  async function sendMessage(textPrompt, attachedImg = null) {
    if (state.isGenerating) return;
    const prompt = (textPrompt || '').trim();
    if (!prompt && !attachedImg) return;

    const conv = getActiveConversation();
    if (!conv) return;

    soundFX.send();

    // Auto generate title on first user turn
    if (conv.messages.length === 0) {
      conv.title = generateTitleFromPrompt(prompt || 'Visual Analysis');
      elements.chatTitle.textContent = conv.title;
      renderConversationsList(elements.searchInput.value);
    }

    // Append user message
    const userMessage = {
      role: 'user',
      content: prompt,
      image: attachedImg ? { ...attachedImg } : null,
      timestamp: new Date().toISOString()
    };
    conv.messages.push(userMessage);
    conv.updatedAt = new Date().toISOString();
    persistStorage();

    // Clear input & preview
    elements.chatTextarea.value = '';
    elements.chatTextarea.style.height = 'auto';
    elements.charCounter.textContent = '0/4000';
    clearAttachment();

    // Update UI
    elements.welcomeScreen.style.display = 'none';
    appendMessageToDOM(userMessage, conv.messages.length - 1);
    scrollToBottom(true);

    // Prepare assistant streaming placeholder
    const assistantIndex = conv.messages.length;
    const assistantMessage = {
      role: 'model',
      content: '',
      timestamp: new Date().toISOString()
    };
    conv.messages.push(assistantMessage);

    // Create streaming row in DOM
    const row = document.createElement('div');
    row.className = 'message-row assistant';
    row.id = `msg-${assistantIndex}`;
    row.innerHTML = `
      <div class="msg-avatar assistant">AI</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-author">EduNexa AI</span>
          <span class="msg-time">Streaming...</span>
        </div>
        <div class="msg-bubble">
          <div class="msg-text-content"><span class="streaming-cursor"></span></div>
        </div>
      </div>
    `;
    elements.messagesContainer.appendChild(row);
    scrollToBottom(true);

    const textContainer = row.querySelector('.msg-text-content');

    // UI state switches
    setGeneratingState(true);
    state.abortController = new AbortController();

    try {
      // Build context history for server
      // Limit context to last 20 messages to prevent payload explosion
      const contextMessages = conv.messages.slice(0, -1).slice(-20).map(m => ({
        role: m.role,
        content: m.content
      }));

      const authHeaders = await (window.EduNexaAuth?.getAuthorizationHeader?.() || Promise.resolve({}));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        signal: state.abortController.signal,
        body: JSON.stringify({
          messages: contextMessages,
          model: state.settings.model,
          systemInstruction: state.settings.systemInstruction,
          image: attachedImg ? { data: attachedImg.data, mimeType: attachedImg.mimeType } : null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Server error HTTP ${response.status}` }));
        throw new Error(errorData.error || `Server HTTP Error: ${response.status}`);
      }

      // Read SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const block of lines) {
          if (!block.trim()) continue;
          const eventMatch = block.match(/^event:\s*(\w+)/m);
          const dataMatch = block.match(/^data:\s*(.*)$/m);

          const event = eventMatch ? eventMatch[1] : 'chunk';
          const dataStr = dataMatch ? dataMatch[1] : '{}';

          try {
            const data = JSON.parse(dataStr);
            if (event === 'chunk' && data.text) {
              accumulatedText += data.text;
              assistantMessage.content = accumulatedText;
              textContainer.innerHTML = DOMPurify.sanitize(marked.parse(accumulatedText)) + '<span class="streaming-cursor"></span>';
              enhanceCodeBlocks(row);
              scrollToBottom();
            } else if (event === 'error') {
              throw new Error(data.message || 'Stream error occurred.');
            }
          } catch (pe) {
            console.error('SSE JSON parse error:', pe);
          }
        }
      }

      // Finalize message rendering
      textContainer.innerHTML = DOMPurify.sanitize(marked.parse(accumulatedText));
      enhanceCodeBlocks(row);
      soundFX.receive();
    } catch (err) {
      if (err.name === 'AbortError') {
        showToast('Generation stopped by user', 'info');
      } else {
        console.error('Chat Error:', err);
        const errMsg = `⚠️ **Error generating response:** ${escapeHTML(err.message)}`;
        assistantMessage.content = errMsg;
        textContainer.innerHTML = DOMPurify.sanitize(marked.parse(errMsg));
        showToast(err.message, 'error');
      }
    } finally {
      setGeneratingState(false);
      persistStorage();
      renderActiveConversation(); // Re-render to wire copy & regen buttons cleanly
    }
  }

  function setGeneratingState(isGen) {
    state.isGenerating = isGen;
    if (isGen) {
      elements.stopBtn.style.display = 'flex';
      elements.sendBtn.style.display = 'none';
      elements.sendBtn.disabled = true;
    } else {
      elements.stopBtn.style.display = 'none';
      elements.sendBtn.style.display = 'flex';
      elements.sendBtn.disabled = false;
      state.abortController = null;
    }
  }

  function regenerateFromIndex(msgIndex) {
    if (state.isGenerating) return;
    const conv = getActiveConversation();
    if (!conv || msgIndex <= 0) return;

    // Previous message must be user prompt
    const userMsg = conv.messages[msgIndex - 1];
    if (!userMsg || userMsg.role !== 'user') return;

    // Remove old model response & trigger new generation
    conv.messages.splice(msgIndex, 1);
    persistStorage();
    renderActiveConversation();
    sendMessage(userMsg.content, userMsg.image);
  }

  // Voice Input (Speech-to-Text)
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      elements.voiceBtn.addEventListener('click', () => {
        showToast('Speech recognition is not supported in this browser. Please use Chrome/Edge.', 'warning');
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let isRecording = false;

    recognition.onstart = () => {
      isRecording = true;
      elements.voiceBtn.classList.add('recording');
      showToast('Listening... Speak into your microphone', 'info');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      elements.chatTextarea.value = (elements.chatTextarea.value + ' ' + transcript).trim();
      elements.chatTextarea.dispatchEvent(new Event('input'));
    };

    recognition.onerror = (e) => {
      console.error('Speech error:', e);
      showToast('Speech recognition error: ' + e.error, 'error');
    };

    recognition.onend = () => {
      isRecording = false;
      elements.voiceBtn.classList.remove('recording');
    };

    elements.voiceBtn.addEventListener('click', () => {
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  }

  // Image Attachment Handler
  function initAttachmentHandlers() {
    elements.attachBtn.addEventListener('click', () => {
      elements.imageFileInput.click();
    });

    elements.imageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        showToast('Please select a PNG, JPEG, or WEBP image.', 'warning');
        return;
      }

      if (file.size > 15 * 1024 * 1024) {
        showToast('Image size exceeds 15MB limit.', 'warning');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        state.attachedImage = {
          data: event.target.result,
          mimeType: file.type,
          name: file.name
        };
        elements.previewImg.src = event.target.result;
        elements.previewFilename.textContent = file.name;
        elements.attachmentPreview.style.display = 'flex';
        showToast('Image attached', 'success');
      };
      reader.readAsDataURL(file);
    });

    elements.removeAttachmentBtn.addEventListener('click', clearAttachment);
  }

  function clearAttachment() {
    state.attachedImage = null;
    elements.attachmentPreview.style.display = 'none';
    elements.previewImg.src = '';
    elements.previewFilename.textContent = '';
    elements.imageFileInput.value = '';
  }

  // Modal Handlers
  function openModal(modalEl) {
    modalEl.classList.add('show');
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('show');
  }

  function openConfirmModal(title, msg, onConfirm) {
    elements.confirmTitle.textContent = title;
    elements.confirmMessage.textContent = msg;
    openModal(elements.confirmModal);

    const handleConfirm = () => {
      onConfirm();
      closeModal(elements.confirmModal);
      elements.confirmActionBtn.removeEventListener('click', handleConfirm);
    };
    elements.confirmActionBtn.addEventListener('click', handleConfirm);
  }

  // Export / Import Helpers
  function exportChat(format = 'json') {
    const conv = getActiveConversation();
    if (!conv || conv.messages.length === 0) {
      showToast('No messages to export.', 'warning');
      return;
    }

    let content = '';
    let filename = `${conv.title.replace(/\s+/g, '_')}_${Date.now()}`;
    let mimeType = 'text/plain';

    if (format === 'json') {
      content = JSON.stringify(conv, null, 2);
      filename += '.json';
      mimeType = 'application/json';
    } else {
      content = `# ${conv.title}\n*Exported from EduNexa AI on ${new Date().toLocaleString()}*\n\n`;
      conv.messages.forEach(m => {
        content += `### ${m.role === 'user' ? 'User' : 'EduNexa AI'} (${m.timestamp})\n\n${m.content}\n\n---\n\n`;
      });
      filename += '.md';
      mimeType = 'text/markdown';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Chat exported as ${format.toUpperCase()}`, 'success');
  }

  function exportAllData() {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      conversations: state.conversations,
      settings: state.settings
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduNexa_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Full backup generated & downloaded', 'success');
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.conversations || !Array.isArray(data.conversations)) {
          throw new Error('Invalid backup file structure.');
        }
        state.conversations = data.conversations;
        if (data.settings) state.settings = { ...state.settings, ...data.settings };
        state.activeConversationId = state.conversations.length > 0 ? state.conversations[0].id : null;
        persistStorage();
        renderConversationsList();
        renderActiveConversation();
        closeModal(elements.settingsModal);
        showToast('Backup restored successfully!', 'success');
      } catch (err) {
        showToast('Import failed: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  }

  // Helper Utility
  function escapeHTML(str) {
    return (str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  async function generateStudyPlan() {
    const subject = window.prompt('Which subject or topic do you want to focus on?', 'Biology');
    if (subject === null) return;

    const goal = window.prompt('What is your learning goal?', 'Improve understanding and exam readiness');
    if (goal === null) return;

    const daysInput = window.prompt('How many days should the plan cover?', '7');
    const days = Number(daysInput) || 7;

    const conv = getActiveConversation();
    if (!conv) return;

    const userMessage = {
      role: 'user',
      content: `Create a ${days}-day study plan for ${subject}. Goal: ${goal}.`,
      timestamp: new Date().toISOString()
    };
    conv.messages.push(userMessage);
    conv.updatedAt = new Date().toISOString();
    persistStorage();

    appendMessageToDOM(userMessage, conv.messages.length - 1);
    elements.welcomeScreen.style.display = 'none';
    scrollToBottom(true);

    const assistantIndex = conv.messages.length;
    const assistantMessage = {
      role: 'model',
      content: '',
      timestamp: new Date().toISOString()
    };
    conv.messages.push(assistantMessage);

    const row = document.createElement('div');
    row.className = 'message-row assistant';
    row.id = `msg-${assistantIndex}`;
    row.innerHTML = `
      <div class="msg-avatar assistant">AI</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-author">EduNexa AI</span>
          <span class="msg-time">Planning...</span>
        </div>
        <div class="msg-bubble">
          <div class="msg-text-content"><span class="streaming-cursor"></span></div>
        </div>
      </div>
    `;
    elements.messagesContainer.appendChild(row);
    const textContainer = row.querySelector('.msg-text-content');

    try {
      const authHeaders = await (window.EduNexaAuth?.getAuthorizationHeader?.() || Promise.resolve({}));
      const response = await fetch('/api/agent/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({
          subject,
          goal,
          days,
          level: 'intermediate',
          learnerName: 'student'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Study plan generation failed.');
      }

      const planText = data.plan || 'No plan generated.';
      assistantMessage.content = planText;
      textContainer.innerHTML = DOMPurify.sanitize(marked.parse(planText));
      enhanceCodeBlocks(row);
      soundFX.receive();
      showToast('Study plan generated successfully', 'success');
    } catch (error) {
      const errText = `⚠️ **Study plan error:** ${escapeHTML(error.message)}`;
      assistantMessage.content = errText;
      textContainer.innerHTML = DOMPurify.sanitize(marked.parse(errText));
      showToast(error.message, 'error');
    } finally {
      persistStorage();
      renderActiveConversation();
    }
  }

  function isCompactViewport() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  // One drawer state function covers the desktop rail and the tablet/mobile overlay.
  // This prevents a hidden overlay or a stale fixed sidebar from blocking the chat.
  function setSidebarOpen(isOpen) {
    if (isCompactViewport()) {
      elements.sidebar.classList.toggle('open', isOpen);
      elements.sidebarOverlay.classList.toggle('show', isOpen);
      elements.sidebar.classList.remove('is-collapsed');
      elements.appLayout.classList.remove('sidebar-collapsed');
    } else {
      elements.sidebar.classList.toggle('is-collapsed', !isOpen);
      elements.appLayout.classList.toggle('sidebar-collapsed', !isOpen);
      elements.sidebar.classList.remove('open');
      elements.sidebarOverlay.classList.remove('show');
    }

    elements.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    elements.closeSidebarBtn.setAttribute('aria-expanded', String(isOpen));
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  // Event Listeners Initialization
  function initEvents() {
    // The same menu control reopens a desktop-collapsed rail or a mobile drawer.
    elements.mobileMenuBtn.addEventListener('click', () => {
      setSidebarOpen(true);
    });

    elements.closeSidebarBtn.addEventListener('click', closeSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);

    window.addEventListener('resize', () => {
      // An overlay is meaningful only on compact layouts; always clean it up on desktop.
      if (!isCompactViewport()) {
        elements.sidebar.classList.remove('open');
        elements.sidebarOverlay.classList.remove('show');
      }
    });

    // New Chat
    elements.newChatBtn.addEventListener('click', () => {
      soundFX.click();
      createNewConversation();
    });

    elements.studyPlanBtn.addEventListener('click', () => {
      generateStudyPlan();
    });

    // Search input
    elements.searchInput.addEventListener('input', (e) => {
      renderConversationsList(e.target.value);
    });

    // Welcome Prompt Suggestion Cards
    document.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        elements.chatTextarea.value = prompt;
        sendMessage(prompt);
      });
    });

    // Auto-resizing textarea & Char Counter
    elements.chatTextarea.addEventListener('input', () => {
      elements.chatTextarea.style.height = 'auto';
      elements.chatTextarea.style.height = Math.min(elements.chatTextarea.scrollHeight, 180) + 'px';
      elements.charCounter.textContent = `${elements.chatTextarea.value.length}/4000`;
    });

    // Chat Form Submit
    elements.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage(elements.chatTextarea.value, state.attachedImage);
    });

    // Keyboard handling
    elements.chatTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(elements.chatTextarea.value, state.attachedImage);
      }
    });

    // Global Shortcuts: Ctrl+K / Cmd+K (focus input), Ctrl+N / Cmd+N (new chat), Esc (modals)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isCompactViewport() && elements.sidebar.classList.contains('open')) closeSidebar();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        elements.chatTextarea.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createNewConversation();
      }
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(closeModal);
        closeMobileSidebar();
      }
    });

    // Stop generation
    elements.stopBtn.addEventListener('click', () => {
      if (state.abortController) {
        state.abortController.abort();
      }
    });

    // Scroll to bottom button visibility
    elements.chatViewport.addEventListener('scroll', () => {
      const distance = elements.chatViewport.scrollHeight - elements.chatViewport.scrollTop - elements.chatViewport.clientHeight;
      if (distance > 180) {
        elements.scrollBottomBtn.style.display = 'flex';
      } else {
        elements.scrollBottomBtn.style.display = 'none';
      }
    });
    elements.scrollBottomBtn.addEventListener('click', () => scrollToBottom(true));

    // Header actions
    elements.exportChatBtn.addEventListener('click', () => exportChat('markdown'));
    elements.clearChatBtn.addEventListener('click', () => {
      openConfirmModal('Clear Conversation', 'Are you sure you want to clear all messages in this conversation?', () => {
        const conv = getActiveConversation();
        if (conv) {
          conv.messages = [];
          persistStorage();
          renderActiveConversation();
          showToast('Conversation cleared', 'info');
        }
      });
    });

    // Modals trigger & close
    elements.settingsBtn.addEventListener('click', () => {
      elements.modelSelect.value = state.settings.model;
      elements.systemInstructionInput.value = state.settings.systemInstruction;
      elements.autoScrollToggle.checked = state.settings.autoScroll;
      elements.soundToggle.checked = state.settings.soundEffects;
      openModal(elements.settingsModal);
    });

    elements.saveSettingsBtn.addEventListener('click', () => {
      state.settings.model = elements.modelSelect.value;
      state.settings.systemInstruction = elements.systemInstructionInput.value.trim();
      state.settings.autoScroll = elements.autoScrollToggle.checked;
      state.settings.soundEffects = elements.soundToggle.checked;
      persistStorage();
      elements.activeModelLabel.textContent = state.settings.model;
      closeModal(elements.settingsModal);
      showToast('Settings saved successfully', 'success');
    });

    elements.profileBtn.addEventListener('click', () => {
      // Calculate real stats
      const totalChats = state.conversations.length;
      const totalMessages = state.conversations.reduce((acc, c) => acc + c.messages.length, 0);
      const storageBytes = new Blob([localStorage.getItem(STORAGE_KEYS.CONVERSATIONS) || '']).size;
      const storageKB = (storageBytes / 1024).toFixed(1);

      elements.metricChats.textContent = totalChats;
      elements.metricMessages.textContent = totalMessages;
      elements.metricStorage.textContent = `${storageKB} KB`;

      openModal(elements.profileModal);
    });

    // Close button delegated handles
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        const modal = document.getElementById(targetId);
        if (modal) closeModal(modal);
      });
    });

    // Backup & Restore
    elements.exportAllDataBtn.addEventListener('click', exportAllData);
    elements.importDataInput.addEventListener('change', (e) => {
      if (e.target.files[0]) importData(e.target.files[0]);
    });
    elements.clearAllDataBtn.addEventListener('click', () => {
      openConfirmModal('Delete All Data', 'This will permanently wipe all your saved chats and local history. Are you sure?', () => {
        localStorage.clear();
        state.conversations = [];
        createNewConversation();
        closeModal(elements.settingsModal);
        showToast('All local chat records wiped', 'info');
      });
    });

    // Check server connection
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (!data.hasKey) {
          showToast('Server notice: GEMINI_API_KEY environment secret is missing.', 'warning');
        }
      })
      .catch(() => {
        showToast('Unable to reach EduNexa backend server.', 'error');
      });
  }

  // App Lifecycle Initialization
  function init() {
    loadStorage();
    renderConversationsList();
    renderActiveConversation();
    initEvents();
    initAttachmentHandlers();
    initSpeechRecognition();
  }

  // Boot on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
