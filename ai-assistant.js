/**
 * AETHERIA AI ASSISTANT - MAIN JASVASCRIPT ENGINE
 * Full-stack Dark Glassmorphism Assistant Engine
 */

// ==========================================================================
// CONFIGURATION & GLOBAL STATE
// ==========================================================================
const CONFIG = {
  appName: 'Aetheria AI',
  streamEndpoint: '/api/chat/stream',
  fallbackEndpoint: '/api/chat',
  defaultModel: 'gemini-3.6-flash',
  chatsStorageKey: 'aetheria_chats_v2',
  settingsStorageKey: 'aetheria_settings_v2',
  activeChatKey: 'aetheria_active_chat_id_v2'
};

const state = {
  chats: [],
  activeChatId: null,
  isGenerating: false,
  abortController: null,
  attachedImage: null, // Base64 data
  speechRecognition: null,
  isRecording: false,
  settings: {
    systemInstruction: 'You are Aetheria AI, a helpful, brilliant, and precise AI assistant.',
    model: 'gemini-3.6-flash',
    autoScroll: true,
    soundEffects: true
  }
};

// Initialize Lucide Icons helper
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// TOAST NOTIFICATIONS SYSTEM
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  refreshIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Audio sound feedback helper
function playSound(type) {
  if (!state.settings.soundEffects) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'send') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'receive') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    // Ignore audio context errors if muted by browser
  }
}

// ==========================================================================
// LOCAL STORAGE DATA PERSISTENCE
// ==========================================================================
function loadSettings() {
  try {
    const saved = localStorage.getItem(CONFIG.settingsStorageKey);
    if (saved) {
      state.settings = { ...state.settings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(CONFIG.settingsStorageKey, JSON.stringify(state.settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

function loadChats() {
  try {
    const saved = localStorage.getItem(CONFIG.chatsStorageKey);
    if (saved) {
      state.chats = JSON.parse(saved);
    }
    const savedActiveId = localStorage.getItem(CONFIG.activeChatKey);
    if (savedActiveId && state.chats.some(c => c.id === savedActiveId)) {
      state.activeChatId = savedActiveId;
    } else if (state.chats.length > 0) {
      state.activeChatId = state.chats[0].id;
    } else {
      createNewChat(false);
    }
  } catch (e) {
    console.error('Failed to load chats:', e);
    createNewChat(false);
  }
}

function saveChats() {
  try {
    localStorage.setItem(CONFIG.chatsStorageKey, JSON.stringify(state.chats));
    if (state.activeChatId) {
      localStorage.setItem(CONFIG.activeChatKey, state.activeChatId);
    }
  } catch (e) {
    console.error('Failed to save chats:', e);
  }
}

function getActiveChat() {
  return state.chats.find(c => c.id === state.activeChatId) || null;
}

// ==========================================================================
// CHAT MANAGEMENT
// ==========================================================================
function createNewChat(shouldSave = true) {
  const newChat = {
    id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    title: 'New Conversation',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: []
  };

  state.chats.unshift(newChat);
  state.activeChatId = newChat.id;

  if (shouldSave) {
    saveChats();
  }

  renderSidebar();
  renderChatMessages();
  closeMobileSidebar();
}

function deleteChat(chatId) {
  state.chats = state.chats.filter(c => c.id !== chatId);
  if (state.activeChatId === chatId) {
    state.activeChatId = state.chats.length > 0 ? state.chats[0].id : null;
  }
  if (!state.activeChatId) {
    createNewChat(false);
  }
  saveChats();
  renderSidebar();
  renderChatMessages();
  showToast('Chat deleted', 'info');
}

function renameChat(chatId) {
  const chat = state.chats.find(c => c.id === chatId);
  if (!chat) return;

  const newTitle = prompt('Enter new conversation title:', chat.title);
  if (newTitle && newTitle.trim()) {
    chat.title = newTitle.trim();
    chat.updatedAt = Date.now();
    saveChats();
    renderSidebar();
    updateHeaderTitle();
    showToast('Chat renamed', 'success');
  }
}

function autoGenerateTitle(chat, firstPrompt) {
  if (chat.title === 'New Conversation' && firstPrompt) {
    chat.title = firstPrompt.length > 32 ? firstPrompt.substring(0, 32) + '...' : firstPrompt;
    saveChats();
    renderSidebar();
    updateHeaderTitle();
  }
}

function clearCurrentChat() {
  const chat = getActiveChat();
  if (!chat || chat.messages.length === 0) return;

  if (confirm('Are you sure you want to clear all messages in this conversation?')) {
    chat.messages = [];
    chat.updatedAt = Date.now();
    saveChats();
    renderChatMessages();
    showToast('Conversation cleared', 'info');
  }
}

function exportChat() {
  const chat = getActiveChat();
  if (!chat || chat.messages.length === 0) {
    showToast('No messages to export', 'error');
    return;
  }

  let mdContent = `# ${chat.title}\n*Exported on ${new Date().toLocaleString()}*\n\n---\n\n`;
  chat.messages.forEach(msg => {
    const roleStr = msg.role === 'user' ? '👤 **User**' : '🤖 **Aetheria AI**';
    mdContent += `${roleStr}\n\n${msg.content}\n\n---\n\n`;
  });

  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Chat exported as Markdown', 'success');
}

// ==========================================================================
// MARKDOWN PARSER & SYNTAX HIGHLIGHTING
// ==========================================================================
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMarkdown(text) {
  if (!text) return '';

  // Storage for code blocks to prevent nested markdown parsing corruption
  const codeBlocks = [];
  
  // 1. Extract fenced code blocks
  let parsed = text.replace(/```([a-zA-Z0-9_\-+]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push({ lang: lang || 'code', code: code.trim() });
    return id;
  });

  // 2. Escape HTML on text outside code blocks
  parsed = escapeHtml(parsed);

  // 3. Headers
  parsed = parsed.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  parsed = parsed.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  parsed = parsed.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 4. Blockquotes
  parsed = parsed.replace(/^\&gt;\s?(.*$)/gim, '<blockquote>$1</blockquote>');

  // 5. Inline Code
  parsed = parsed.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 6. Bold & Italic
  parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 7. Links & Images
  parsed = parsed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="markdown-img" />');
  parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // 8. Markdown Tables
  parsed = parsed.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headers = header.split('|').filter(h => h.trim() !== '').map(h => `<th>${h.trim()}</th>`).join('');
    const bodyRows = rows.trim().split('\n').map(row => {
      const cols = row.split('|').filter(c => c.trim() !== '').map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cols}</tr>`;
    }).join('');
    return `<table class="markdown-table"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  });

  // 9. Unordered Lists
  parsed = parsed.replace(/^\s*[\-\*]\s+(.*)$/gim, '<ul><li>$1</li></ul>');
  parsed = parsed.replace(/<\/ul>\s*<ul>/g, '');

  // 10. Paragraphs
  const lines = parsed.split(/\n\n+/);
  parsed = lines.map(p => {
    if (p.startsWith('<h') || p.startsWith('<blockquote') || p.startsWith('<ul') || p.startsWith('<table') || p.startsWith('__CODE_BLOCK_')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('');

  // 11. Restore Code Blocks with custom glass header & copy button
  codeBlocks.forEach((item, index) => {
    const placeholder = `__CODE_BLOCK_${index}__`;
    const escapedCode = escapeHtml(item.code);
    const codeBlockHtml = `
      <div class="code-block-wrapper">
        <div class="code-header">
          <span class="code-lang">${item.lang.toUpperCase()}</span>
          <button class="copy-code-btn" data-code="${encodeURIComponent(item.code)}">
            <i data-lucide="copy"></i>
            <span>Copy Code</span>
          </button>
        </div>
        <pre><code>${highlightSyntax(escapedCode, item.lang)}</code></pre>
      </div>
    `;
    parsed = parsed.replace(placeholder, codeBlockHtml);
  });

  return parsed;
}

// Simple client-side Syntax Highlighter
function highlightSyntax(code, lang) {
  // Keywords
  code = code.replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|class|async|await|try|catch|new|type|interface|public|private)\b/g, '<span style="color: #c084fc;">$1</span>');
  // Strings
  code = code.replace(/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;|`[\s\S]*?`)/g, '<span style="color: #34d399;">$1</span>');
  // Numbers
  code = code.replace(/\b(\d+)\b/g, '<span style="color: #fbbf24;">$1</span>');
  // Comments
  code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span style="color: #6b7280; font-style: italic;">$1</span>');
  return code;
}

// ==========================================================================
// RENDER UI FUNCTIONS
// ==========================================================================
function updateHeaderTitle() {
  const titleEl = document.getElementById('currentChatTitle');
  const chat = getActiveChat();
  if (titleEl && chat) {
    titleEl.textContent = chat.title;
  }
}

function renderSidebar() {
  const chatList = document.getElementById('chatList');
  const emptyState = document.getElementById('historyEmptyState');
  if (!chatList) return;

  chatList.innerHTML = '';

  if (state.chats.length === 0) {
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  state.chats.forEach(chat => {
    const item = document.createElement('div');
    item.className = `chat-item ${chat.id === state.activeChatId ? 'active' : ''}`;
    item.onclick = () => {
      state.activeChatId = chat.id;
      saveChats();
      renderSidebar();
      renderChatMessages();
      closeMobileSidebar();
    };

    item.innerHTML = `
      <i data-lucide="message-square"></i>
      <span class="chat-item-title">${escapeHtml(chat.title)}</span>
      <div class="chat-item-actions">
        <button class="action-icon-btn" title="Rename" onclick="event.stopPropagation(); renameChat('${chat.id}')">
          <i data-lucide="edit-2"></i>
        </button>
        <button class="action-icon-btn delete" title="Delete" onclick="event.stopPropagation(); deleteChat('${chat.id}')">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    chatList.appendChild(item);
  });

  refreshIcons();
}

function renderChatMessages() {
  const messagesList = document.getElementById('messagesList');
  const welcomeHero = document.getElementById('welcomeHero');
  const chat = getActiveChat();

  updateHeaderTitle();

  if (!messagesList) return;

  messagesList.innerHTML = '';

  if (!chat || chat.messages.length === 0) {
    if (welcomeHero) welcomeHero.style.display = 'flex';
    return;
  }

  if (welcomeHero) welcomeHero.style.display = 'none';

  chat.messages.forEach(msg => {
    appendMessageToUI(msg);
  });

  scrollToBottom();
  refreshIcons();
}

function appendMessageToUI(msg) {
  const messagesList = document.getElementById('messagesList');
  if (!messagesList) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `message-item ${msg.role}`;
  msgDiv.dataset.id = msg.id;

  const avatarIcon = msg.role === 'user' ? 'user' : 'sparkles';

  let imageHtml = '';
  if (msg.image) {
    imageHtml = `<img src="${msg.image}" alt="User upload" class="message-image-attach" />`;
  }

  const formattedContent = msg.role === 'user'
    ? escapeHtml(msg.content).replace(/\n/g, '<br>')
    : renderMarkdown(msg.content);

  msgDiv.innerHTML = `
    <div class="message-avatar">
      <i data-lucide="${avatarIcon}"></i>
    </div>
    <div class="message-content-wrapper">
      <div class="message-bubble markdown-body">
        ${imageHtml}
        <div class="msg-text">${formattedContent}</div>
      </div>
      <div class="message-actions">
        <button class="msg-action-btn" onclick="copyMessageText('${msg.id}')" title="Copy Message">
          <i data-lucide="copy"></i>
          <span>Copy</span>
        </button>
        ${msg.role === 'model' ? `
          <button class="msg-action-btn" onclick="regenerateLastResponse()" title="Regenerate">
            <i data-lucide="rotate-cw"></i>
            <span>Regenerate</span>
          </button>
        ` : ''}
        <button class="msg-action-btn" onclick="deleteMessage('${msg.id}')" title="Delete">
          <i data-lucide="trash"></i>
        </button>
      </div>
    </div>
  `;

  messagesList.appendChild(msgDiv);
  refreshIcons();
  bindCopyCodeButtons();
}

function bindCopyCodeButtons() {
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const code = decodeURIComponent(btn.dataset.code || '');
      navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
      });
    };
  });
}

function copyMessageText(msgId) {
  const chat = getActiveChat();
  if (!chat) return;
  const msg = chat.messages.find(m => m.id === msgId);
  if (msg) {
    navigator.clipboard.writeText(msg.content).then(() => {
      showToast('Text copied to clipboard!', 'success');
    });
  }
}

function deleteMessage(msgId) {
  const chat = getActiveChat();
  if (!chat) return;

  chat.messages = chat.messages.filter(m => m.id !== msgId);
  saveChats();
  renderChatMessages();
  showToast('Message removed', 'info');
}

function scrollToBottom() {
  if (!state.settings.autoScroll) return;
  const container = document.getElementById('chatMessagesContainer');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

// ==========================================================================
// REAL GEMINI STREAMING SEND LOGIC
// ==========================================================================
async function handleSendMessage() {
  const textarea = document.getElementById('chatTextarea');
  const promptText = textarea ? textarea.value.trim() : '';
  const imageAttachment = state.attachedImage;

  if ((!promptText && !imageAttachment) || state.isGenerating) return;

  const chat = getActiveChat();
  if (!chat) return;

  // Auto-generate title if first turn
  autoGenerateTitle(chat, promptText);

  // 1. Create and render user message
  const userMsg = {
    id: 'msg_' + Date.now(),
    role: 'user',
    content: promptText,
    image: imageAttachment,
    timestamp: Date.now()
  };

  chat.messages.push(userMsg);
  saveChats();

  // Reset Input state
  textarea.value = '';
  adjustTextareaHeight(textarea);
  updateCharCounter();
  clearAttachment();

  // Hide welcome hero if visible
  const welcomeHero = document.getElementById('welcomeHero');
  if (welcomeHero) welcomeHero.style.display = 'none';

  appendMessageToUI(userMsg);
  scrollToBottom();
  playSound('send');

  // 2. Prepare AI Message Placeholder
  const aiMsgId = 'msg_' + (Date.now() + 1);
  const aiMsg = {
    id: aiMsgId,
    role: 'model',
    content: '',
    timestamp: Date.now()
  };

  // Render thinking box in UI
  const messagesList = document.getElementById('messagesList');
  const thinkingDiv = document.createElement('div');
  thinkingDiv.className = 'message-item model streaming';
  thinkingDiv.id = `thinking_${aiMsgId}`;
  thinkingDiv.innerHTML = `
    <div class="message-avatar">
      <i data-lucide="sparkles"></i>
    </div>
    <div class="message-content-wrapper">
      <div class="message-bubble markdown-body">
        <div class="thinking-box">
          <div class="thinking-spinner"></div>
          <span>Aetheria is generating response...</span>
        </div>
      </div>
    </div>
  `;
  messagesList.appendChild(thinkingDiv);
  refreshIcons();
  scrollToBottom();

  // Set UI Generating state
  setGeneratingState(true);

  state.abortController = new AbortController();

  // Format payload history
  const historyPayload = chat.messages.slice(0, -1).map(m => ({
    role: m.role,
    content: m.content,
    image: m.image
  }));

  try {
    const response = await fetch(CONFIG.streamEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: state.abortController.signal,
      body: JSON.stringify({
        prompt: promptText,
        image: imageAttachment,
        history: historyPayload,
        systemInstruction: state.settings.systemInstruction,
        model: state.settings.model
      })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';

    // Remove thinking box and show stream message bubble
    thinkingDiv.remove();

    const streamMsgDiv = document.createElement('div');
    streamMsgDiv.className = 'message-item model';
    streamMsgDiv.id = `stream_${aiMsgId}`;
    streamMsgDiv.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="sparkles"></i>
      </div>
      <div class="message-content-wrapper">
        <div class="message-bubble markdown-body">
          <div class="msg-text" id="stream_text_${aiMsgId}"></div>
          <span class="streaming-cursor"></span>
        </div>
      </div>
    `;
    messagesList.appendChild(streamMsgDiv);
    refreshIcons();

    const streamTextEl = document.getElementById(`stream_text_${aiMsgId}`);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.replace('data: ', '').trim();
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedText += parsed.text;
              if (streamTextEl) {
                streamTextEl.innerHTML = renderMarkdown(accumulatedText);
                bindCopyCodeButtons();
              }
              scrollToBottom();
            } else if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (e) {
            // Ignore partial SSE JSON chunks
          }
        }
      }
    }

    // Finished streaming
    aiMsg.content = accumulatedText;
    chat.messages.push(aiMsg);
    chat.updatedAt = Date.now();
    saveChats();

    // Re-render UI to bind full message actions
    renderChatMessages();
    playSound('receive');

  } catch (error) {
    if (error.name === 'AbortError') {
      showToast('Generation stopped by user', 'info');
      if (aiMsg.content) {
        chat.messages.push(aiMsg);
        saveChats();
        renderChatMessages();
      } else {
        document.getElementById(`thinking_${aiMsgId}`)?.remove();
      }
    } else {
      console.error('Streaming error:', error);
      document.getElementById(`thinking_${aiMsgId}`)?.remove();
      showToast(`Error: ${error.message || 'Failed to connect to AI server'}`, 'error');

      // Append Error Message
      const errorMsg = {
        id: 'msg_err_' + Date.now(),
        role: 'model',
        content: `⚠️ **Network / Server Error**\n\n${error.message || 'Could not communicate with Gemini API backend.'}\n\nPlease verify your server connection and try again.`,
        timestamp: Date.now()
      };
      chat.messages.push(errorMsg);
      saveChats();
      renderChatMessages();
    }
  } finally {
    setGeneratingState(false);
    state.abortController = null;
  }
}

function setGeneratingState(isGen) {
  state.isGenerating = isGen;
  const sendBtn = document.getElementById('sendBtn');
  const sendIcon = document.getElementById('sendIcon');
  const stopIcon = document.getElementById('stopIcon');

  if (!sendBtn) return;

  if (isGen) {
    sendBtn.classList.add('stop');
    sendBtn.title = 'Stop Generating';
    if (sendIcon) sendIcon.style.display = 'none';
    if (stopIcon) stopIcon.style.display = 'inline-block';
  } else {
    sendBtn.classList.remove('stop');
    sendBtn.title = 'Send message (Enter)';
    if (sendIcon) sendIcon.style.display = 'inline-block';
    if (stopIcon) stopIcon.style.display = 'none';
  }
  refreshIcons();
}

function regenerateLastResponse() {
  const chat = getActiveChat();
  if (!chat || chat.messages.length === 0) return;

  // Find last model message and user message
  if (chat.messages[chat.messages.length - 1].role === 'model') {
    chat.messages.pop(); // Remove last model response
  }

  const lastUserMsg = chat.messages[chat.messages.length - 1];
  if (lastUserMsg && lastUserMsg.role === 'user') {
    const promptText = lastUserMsg.content;
    chat.messages.pop(); // Remove last user message so handleSendMessage re-appends it cleanly
    
    const textarea = document.getElementById('chatTextarea');
    if (textarea) textarea.value = promptText;
    handleSendMessage();
  }
}

// ==========================================================================
// TEXTAREA & ATTACHMENT CONTROLS
// ==========================================================================
function adjustTextareaHeight(textarea) {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px';
}

function updateCharCounter() {
  const textarea = document.getElementById('chatTextarea');
  const counter = document.getElementById('charCounter');
  if (textarea && counter) {
    counter.textContent = `${textarea.value.length}/4000`;
  }
}

function handleFileUpload(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please select a valid image file', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    state.attachedImage = e.target.result;

    const preview = document.getElementById('attachmentPreview');
    const thumb = document.getElementById('attachmentThumb');
    const filename = document.getElementById('attachmentFilename');

    if (thumb) thumb.src = state.attachedImage;
    if (filename) filename.textContent = file.name;
    if (preview) preview.style.display = 'flex';

    showToast('Image attached', 'success');
  };
  reader.readAsDataURL(file);
}

function clearAttachment() {
  state.attachedImage = null;
  const preview = document.getElementById('attachmentPreview');
  const fileInput = document.getElementById('fileInput');
  if (preview) preview.style.display = 'none';
  if (fileInput) fileInput.value = '';
}

// Speech Recognition Engine
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  state.speechRecognition = new SpeechRecognition();
  state.speechRecognition.continuous = false;
  state.speechRecognition.interimResults = true;

  const micBtn = document.getElementById('micBtn');

  state.speechRecognition.onstart = () => {
    state.isRecording = true;
    if (micBtn) micBtn.classList.add('recording');
    showToast('Listening... Speak now', 'info');
  };

  state.speechRecognition.onresult = (e) => {
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript)
      .join('');
    const textarea = document.getElementById('chatTextarea');
    if (textarea) {
      textarea.value = transcript;
      adjustTextareaHeight(textarea);
      updateCharCounter();
    }
  };

  state.speechRecognition.onerror = (e) => {
    showToast(`Speech error: ${e.error}`, 'error');
    stopRecording();
  };

  state.speechRecognition.onend = () => {
    stopRecording();
  };
}

function toggleRecording() {
  if (!state.speechRecognition) {
    showToast('Speech recognition not supported in this browser', 'error');
    return;
  }

  if (state.isRecording) {
    state.speechRecognition.stop();
  } else {
    state.speechRecognition.start();
  }
}

function stopRecording() {
  state.isRecording = false;
  const micBtn = document.getElementById('micBtn');
  if (micBtn) micBtn.classList.remove('recording');
}

// ==========================================================================
// MODALS & EVENT LISTENERS
// ==========================================================================
function closeMobileSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');
}

function openMobileSidebar() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('active');
}

function bindEvents() {
  // New Chat & Header actions
  document.getElementById('newChatBtn')?.addEventListener('click', () => createNewChat(true));
  document.getElementById('clearChatBtn')?.addEventListener('click', clearCurrentChat);
  document.getElementById('exportChatBtn')?.addEventListener('click', exportChat);

  // Mobile Sidebar Toggles
  document.getElementById('toggleSidebarBtn')?.addEventListener('click', openMobileSidebar);
  document.getElementById('closeSidebarBtn')?.addEventListener('click', closeMobileSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);

  // Send button & Textarea
  const sendBtn = document.getElementById('sendBtn');
  const textarea = document.getElementById('chatTextarea');

  sendBtn?.addEventListener('click', () => {
    if (state.isGenerating) {
      if (state.abortController) state.abortController.abort();
    } else {
      handleSendMessage();
    }
  });

  textarea?.addEventListener('input', () => {
    adjustTextareaHeight(textarea);
    updateCharCounter();
  });

  textarea?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Attachments & Speech
  const attachFileBtn = document.getElementById('attachFileBtn');
  const fileInput = document.getElementById('fileInput');
  const removeAttachmentBtn = document.getElementById('removeAttachmentBtn');
  const micBtn = document.getElementById('micBtn');

  attachFileBtn?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  });
  removeAttachmentBtn?.addEventListener('click', clearAttachment);
  micBtn?.addEventListener('click', toggleRecording);

  // Search History
  const searchInput = document.getElementById('searchChatsInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (clearSearchBtn) clearSearchBtn.style.display = query ? 'flex' : 'none';

    document.querySelectorAll('.chat-item').forEach(item => {
      const title = item.querySelector('.chat-item-title')?.textContent.toLowerCase() || '';
      item.style.display = title.includes(query) ? 'flex' : 'none';
    });
  });

  clearSearchBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }
  });

  // Welcome Hero Suggestion Cards
  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
      const promptText = card.dataset.prompt;
      if (textarea && promptText) {
        textarea.value = promptText;
        adjustTextareaHeight(textarea);
        updateCharCounter();
        handleSendMessage();
      }
    });
  });

  // Scroll Bottom Button
  const messagesContainer = document.getElementById('chatMessagesContainer');
  const scrollBottomBtn = document.getElementById('scrollBottomBtn');

  messagesContainer?.addEventListener('scroll', () => {
    if (!scrollBottomBtn) return;
    const isUp = messagesContainer.scrollTop < messagesContainer.scrollHeight - messagesContainer.clientHeight - 150;
    if (isUp) {
      scrollBottomBtn.classList.add('visible');
    } else {
      scrollBottomBtn.classList.remove('visible');
    }
  });

  scrollBottomBtn?.addEventListener('click', () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  // Settings Modal
  const settingsModal = document.getElementById('settingsModal');
  document.getElementById('settingsBtn')?.addEventListener('click', () => {
    document.getElementById('systemInstructionInput').value = state.settings.systemInstruction;
    document.getElementById('modelSelect').value = state.settings.model;
    document.getElementById('autoScrollToggle').checked = state.settings.autoScroll;
    document.getElementById('soundToggle').checked = state.settings.soundEffects;
    settingsModal?.classList.add('active');
  });

  document.getElementById('closeSettingsBtn')?.addEventListener('click', () => settingsModal?.classList.remove('active'));
  document.getElementById('cancelSettingsBtn')?.addEventListener('click', () => settingsModal?.classList.remove('active'));

  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
    state.settings.systemInstruction = document.getElementById('systemInstructionInput').value.trim();
    state.settings.model = document.getElementById('modelSelect').value;
    state.settings.autoScroll = document.getElementById('autoScrollToggle').checked;
    state.settings.soundEffects = document.getElementById('soundToggle').checked;
    saveSettings();

    const headerModel = document.getElementById('headerModelName');
    if (headerModel) headerModel.textContent = state.settings.model.includes('pro') ? 'Gemini 3.1 Pro' : 'Gemini 3.6 Flash';

    settingsModal?.classList.remove('active');
    showToast('Settings saved', 'success');
  });

  document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
    if (confirm('WARNING: This will permanently wipe all local chat history and settings! Continue?')) {
      localStorage.clear();
      state.chats = [];
      state.activeChatId = null;
      createNewChat(false);
      settingsModal?.classList.remove('active');
      showToast('All local data cleared', 'info');
    }
  });

  // Profile Modal
  const profileModal = document.getElementById('profileModal');
  document.getElementById('profileBtn')?.addEventListener('click', () => {
    const totalMsgs = state.chats.reduce((acc, c) => acc + c.messages.length, 0);
    const storageBytes = new Blob([localStorage.getItem(CONFIG.chatsStorageKey) || '']).size;

    document.getElementById('statChatsCount').textContent = state.chats.length;
    document.getElementById('statMessagesCount').textContent = totalMsgs;
    document.getElementById('statStorageSize').textContent = (storageBytes / 1024).toFixed(1) + ' KB';

    profileModal?.classList.add('active');
  });

  document.getElementById('closeProfileBtn')?.addEventListener('click', () => profileModal?.classList.remove('active'));
  document.getElementById('doneProfileBtn')?.addEventListener('click', () => profileModal?.classList.remove('active'));

  // Export / Import Backup Data
  document.getElementById('exportDataBtn')?.addEventListener('click', () => {
    const backup = {
      chats: state.chats,
      settings: state.settings,
      exportedAt: Date.now()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aetheria_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exported', 'success');
  });

  const importFileInput = document.getElementById('importFileInput');
  document.getElementById('importDataBtn')?.addEventListener('click', () => importFileInput?.click());

  importFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.chats && Array.isArray(data.chats)) {
          state.chats = data.chats;
          if (data.settings) state.settings = { ...state.settings, ...data.settings };
          saveChats();
          saveSettings();
          renderSidebar();
          renderChatMessages();
          profileModal?.classList.remove('active');
          showToast('Data backup restored!', 'success');
        } else {
          showToast('Invalid backup file format', 'error');
        }
      } catch (err) {
        showToast('Error reading backup file', 'error');
      }
    };
    reader.readAsText(file);
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      createNewChat(true);
    }
  });
}

// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadChats();
  bindEvents();
  setupSpeechRecognition();
  renderSidebar();
  renderChatMessages();
  refreshIcons();
});
