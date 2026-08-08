/**
 * NOVIX - English Subject Module Logic (english.js)
 * ES6+ Vanilla JavaScript Module for full interactivity & persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  // Main State Management
  const state = {
    topics: [],
    filteredTopics: [],
    activeTopic: null,
    activeCategory: 'all',
    activeDifficulty: 'all',
    searchQuery: '',
    
    // User Stats & Progress (Persisted in localStorage)
    userProgress: {
      completedTopicIds: [],
      bookmarkedTopicIds: [],
      quizScores: [], // Array of numbers e.g. [80, 100, 60]
      totalXp: 850,
      streakDays: 3,
      studyTimeMinutes: 45,
      lastTopicId: null
    },

    // Flashcard State inside Modal
    flashcards: {
      deck: [],
      currentIndex: 0,
      isFlipped: false
    },

    // Quiz Runner State
    quizRunner: {
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // { questionIndex: selectedOptionIndex }
      timerSeconds: 300,
      timerInterval: null,
      score: 0
    },

    // AI Drawer Context
    aiChatContext: {
      topic: null,
      history: []
    }
  };

  // DOM Elements References
  const DOM = {
    // Inputs & Filters
    searchInput: document.getElementById('search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    difficultyFilter: document.getElementById('difficulty-filter'),
    categoryPills: document.getElementById('category-pills'),
    
    // Containers
    topicsContainer: document.getElementById('topics-cards-container'),
    topicsLoading: document.getElementById('topics-loading'),
    noTopicsFound: document.getElementById('no-topics-found'),
    resultsCount: document.getElementById('results-count'),
    
    // Progress Elements
    masteryRingFill: document.getElementById('mastery-ring-fill'),
    masteryPercentage: document.getElementById('mastery-percentage'),
    masteryStatusText: document.getElementById('mastery-status-text'),
    quizAvgScore: document.getElementById('quiz-avg-score'),
    quizScoreBar: document.getElementById('quiz-score-bar'),
    quizAttemptsCount: document.getElementById('quiz-attempts-count'),
    continueTopicTitle: document.getElementById('continue-topic-title'),
    continueTopicCategory: document.getElementById('continue-topic-category'),
    btnContinueTopic: document.getElementById('btn-continue-topic'),
    totalStudyTime: document.getElementById('total-study-time'),
    bookmarksCount: document.getElementById('bookmarks-count'),
    headerStreakCount: document.getElementById('header-streak-count'),
    headerMasteryScore: document.getElementById('header-mastery-score'),
    recentActivityList: document.getElementById('recent-activity-list'),
    bookmarksList: document.getElementById('bookmarks-list'),
    
    // Modal Elements
    topicModal: document.getElementById('topic-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalTopicCategory: document.getElementById('modal-topic-category'),
    modalTopicDifficulty: document.getElementById('modal-topic-difficulty'),
    modalTopicTime: document.getElementById('modal-topic-time'),
    modalTopicTitle: document.getElementById('modal-topic-title'),
    modalDownloadNotesBtn: document.getElementById('modal-download-notes-btn'),
    modalBookmarkToggleBtn: document.getElementById('modal-bookmark-toggle-btn'),
    modalBookmarkStar: document.getElementById('modal-bookmark-star'),
    
    // Modal Tabs & Panes
    modalTabsBar: document.querySelector('.modal-tabs-bar'),
    modalObjectivesList: document.getElementById('modal-objectives-list'),
    modalDetailedNotes: document.getElementById('modal-detailed-notes'),
    modalImportantPointsList: document.getElementById('modal-important-points-list'),
    modalExamplesContainer: document.getElementById('modal-examples-container'),
    youtubeIframe: document.getElementById('youtube-iframe'),
    videoLectureTitle: document.getElementById('video-lecture-title'),
    modalFlashcardsCount: document.getElementById('modal-flashcards-count'),
    modalExercisesList: document.getElementById('modal-exercises-list'),
    modalMcqsCount: document.getElementById('modal-mcqs-count'),
    modalMcqsList: document.getElementById('modal-mcqs-list'),
    modalResourcesList: document.getElementById('modal-resources-list'),
    
    // Flashcard Elements
    fcCurrentIndex: document.getElementById('fc-current-index'),
    fcTotalCount: document.getElementById('fc-total-count'),
    fcBtnShuffle: document.getElementById('fc-btn-shuffle'),
    activeFlashcard: document.getElementById('active-flashcard'),
    fcFrontText: document.getElementById('fc-front-text'),
    fcBackText: document.getElementById('fc-back-text'),
    fcPrevBtn: document.getElementById('fc-prev-btn'),
    fcFlipBtn: document.getElementById('fc-flip-btn'),
    fcNextBtn: document.getElementById('fc-next-btn'),

    // Quiz Runner Elements
    quizRunnerModal: document.getElementById('quiz-runner-modal'),
    qrTopicName: document.getElementById('qr-topic-name'),
    qrTimer: document.getElementById('qr-timer'),
    qrCurrentNum: document.getElementById('qr-current-num'),
    qrTotalNum: document.getElementById('qr-total-num'),
    qrProgressBar: document.getElementById('qr-progress-bar'),
    qrQuestionText: document.getElementById('qr-question-text'),
    qrOptionsContainer: document.getElementById('qr-options-container'),
    qrExplanationBox: document.getElementById('qr-explanation-box'),
    qrExplanationText: document.getElementById('qr-explanation-text'),
    qrPrevBtn: document.getElementById('qr-prev-btn'),
    qrNextBtn: document.getElementById('qr-next-btn'),
    qrSubmitBtn: document.getElementById('qr-submit-btn'),
    qrExitBtn: document.getElementById('qr-exit-btn'),
    btnStartModalQuiz: document.getElementById('btn-start-modal-quiz'),

    // Quiz Results Modal
    quizResultsModal: document.getElementById('quiz-results-modal'),
    resultsScorePercent: document.getElementById('results-score-percent'),
    resCorrectCount: document.getElementById('res-correct-count'),
    resIncorrectCount: document.getElementById('res-incorrect-count'),
    resXpEarned: document.getElementById('res-xp-earned'),
    btnResultsRetry: document.getElementById('btn-results-retry'),
    btnResultsContinue: document.getElementById('btn-results-continue'),

    // AI Assistant Elements
    aiAssistantDrawer: document.getElementById('ai-assistant-drawer'),
    btnToggleAiFloating: document.getElementById('btn-toggle-ai-floating'),
    btnCloseAiDrawer: document.getElementById('btn-close-ai-drawer'),
    btnHeroAiExplain: document.getElementById('btn-hero-ai-explain'),
    aiActiveContextName: document.getElementById('ai-active-context-name'),
    aiChatMessages: document.getElementById('ai-chat-messages'),
    aiTypingIndicator: document.getElementById('ai-typing-indicator'),
    aiChatForm: document.getElementById('ai-chat-form'),
    aiChatInput: document.getElementById('ai-chat-input'),
    aiToolAsk: document.getElementById('ai-tool-ask'),
    aiToolSummarize: document.getElementById('ai-tool-summarize'),
    aiToolExplain: document.getElementById('ai-tool-explain'),
    aiToolQuiz: document.getElementById('ai-tool-quiz'),
    
    // Toast Container
    toastContainer: document.getElementById('toast-container'),
    btnResetProgress: document.getElementById('btn-reset-progress'),
    btnResetSearch: document.getElementById('btn-reset-search')
  };

  // --- INITIALIZATION ---
  init();

  async function init() {
    loadUserProgress();
    setupEventListeners();
    await fetchEnglishTopics();
    updateProgressDashboard();
    renderActivityAndBookmarks();
  }

  // --- DATA FETCHING ---
  async function fetchEnglishTopics() {
    try {
      DOM.topicsLoading.style.display = 'flex';
      DOM.topicsContainer.style.display = 'none';

      const response = await fetch('english.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      state.topics = await response.json();
      state.filteredTopics = [...state.topics];

      // Update counters in Hero
      const flashcardsTotal = state.topics.reduce((acc, t) => acc + (t.flashcards ? t.flashcards.length : 0), 0);
      const mcqsTotal = state.topics.reduce((acc, t) => acc + (t.mcqs ? t.mcqs.length : 0), 0);
      
      document.getElementById('total-topics-count').textContent = state.topics.length;
      document.getElementById('total-flashcards-count').textContent = `${flashcardsTotal}+`;
      document.getElementById('total-mcqs-count').textContent = `${mcqsTotal}+`;

      renderTopicsGrid();
    } catch (error) {
      console.error('Error loading english.json:', error);
      DOM.topicsLoading.innerHTML = `<p style="color: var(--red);">Failed to load English content modules. Please ensure english.json is available.</p>`;
      showToast('Error loading topics dataset', 'error');
    }
  }

  // --- LOCAL STORAGE PERSISTENCE ---
  function loadUserProgress() {
    const saved = localStorage.getItem('studymate_english_progress');
    if (saved) {
      try {
        state.userProgress = Object.assign(state.userProgress, JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved user progress:', e);
      }
    }
  }

  function saveUserProgress() {
    localStorage.setItem('studymate_english_progress', JSON.stringify(state.userProgress));
    updateProgressDashboard();
  }

  // --- RENDERING TOPICS GRID ---
  function renderTopicsGrid() {
    DOM.topicsLoading.style.display = 'none';
    
    // Filter topics by category, difficulty, search query
    state.filteredTopics = state.topics.filter(topic => {
      const matchesCategory = state.activeCategory === 'all' || topic.category === state.activeCategory;
      const matchesDifficulty = state.activeDifficulty === 'all' || topic.difficulty === state.activeDifficulty;
      
      const q = state.searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        topic.title.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q) ||
        topic.tags.some(tag => tag.toLowerCase().includes(q)) ||
        topic.category.toLowerCase().includes(q);

      return matchesCategory && matchesDifficulty && matchesSearch;
    });

    DOM.resultsCount.textContent = `Showing ${state.filteredTopics.length} of ${state.topics.length} topics`;

    if (state.filteredTopics.length === 0) {
      DOM.topicsContainer.style.display = 'none';
      DOM.noTopicsFound.style.display = 'flex';
      return;
    }

    DOM.noTopicsFound.style.display = 'none';
    DOM.topicsContainer.style.display = 'grid';
    DOM.topicsContainer.innerHTML = '';

    state.filteredTopics.forEach(topic => {
      const isBookmarked = state.userProgress.bookmarkedTopicIds.includes(topic.id);
      const isCompleted = state.userProgress.completedTopicIds.includes(topic.id);

      const card = document.createElement('div');
      card.className = `topic-card glass-card ${isCompleted ? 'completed-topic' : ''}`;
      card.dataset.id = topic.id;

      card.innerHTML = `
        <div class="topic-card-top">
          <span class="category-badge">${escapeHTML(topic.category)}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="difficulty-tag ${escapeHTML(topic.difficulty)}">${escapeHTML(topic.difficulty)}</span>
            <button class="bookmark-star-btn ${isBookmarked ? 'active' : ''}" data-id="${topic.id}" title="Bookmark topic">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </div>
        </div>

        <h3 class="topic-card-title">${escapeHTML(topic.title)}</h3>
        <p class="topic-card-desc">${escapeHTML(topic.description)}</p>

        <div class="topic-tags-row">
          ${topic.tags.map(t => `<span class="tag-chip">#${escapeHTML(t)}</span>`).join('')}
        </div>

        <div class="topic-card-footer">
          <span class="time-tag">⏱️ ${escapeHTML(topic.estimatedStudyTime)}</span>
          <button class="btn btn-primary btn-sm btn-open-topic" data-id="${topic.id}">
            <span>${isCompleted ? 'Review Topic' : 'Start Study'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;

      DOM.topicsContainer.appendChild(card);
    });

    // Attach Event Handlers to dynamic card elements
    document.querySelectorAll('.btn-open-topic').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const topicId = e.currentTarget.dataset.id;
        openTopicModal(topicId);
      });
    });

    document.querySelectorAll('.bookmark-star-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const topicId = e.currentTarget.dataset.id;
        toggleBookmark(topicId);
      });
    });
  }

  // --- TOPIC VIEWER MODAL LOGIC ---
  function openTopicModal(topicId, initialTab = 'tab-notes') {
    const topic = state.topics.find(t => t.id === topicId);
    if (!topic) return;

    state.activeTopic = topic;
    state.userProgress.lastTopicId = topic.id;
    saveUserProgress();

    // Populate Modal Meta Header
    DOM.modalTopicTitle.textContent = topic.title;
    DOM.modalTopicCategory.textContent = topic.category;
    DOM.modalTopicDifficulty.textContent = topic.difficulty;
    DOM.modalTopicDifficulty.className = `difficulty-tag ${topic.difficulty}`;
    DOM.modalTopicTime.textContent = `⏱️ ${topic.estimatedStudyTime}`;

    // Bookmark status
    const isBookmarked = state.userProgress.bookmarkedTopicIds.includes(topic.id);
    DOM.modalBookmarkStar.textContent = isBookmarked ? '★' : '☆';
    DOM.modalBookmarkStar.style.color = isBookmarked ? 'var(--amber)' : 'inherit';

    // Populate Tab 1: Objectives & Detailed Notes
    DOM.modalObjectivesList.innerHTML = topic.learningObjectives
      .map(obj => `<li>${escapeHTML(obj)}</li>`).join('');
    
    DOM.modalDetailedNotes.innerHTML = topic.detailedNotes;
    
    DOM.modalImportantPointsList.innerHTML = topic.importantPoints
      .map(pt => `<li>${escapeHTML(pt)}</li>`).join('');

    DOM.modalExamplesContainer.innerHTML = topic.examples.map(ex => `
      <div class="example-card glass-panel">
        <h5>📌 ${escapeHTML(ex.title)}</h5>
        <div class="example-sentence">${escapeHTML(ex.sentence)}</div>
        <p class="card-sub">${escapeHTML(ex.explanation)}</p>
      </div>
    `).join('');

    // Tab 2: Video Lecture
    if (topic.youtubeLecture) {
      DOM.videoLectureTitle.textContent = topic.youtubeLecture.title;
      DOM.youtubeIframe.src = topic.youtubeLecture.embedUrl;
    } else {
      DOM.youtubeIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    }

    // Tab 3: Flashcards Setup
    state.flashcards.deck = topic.flashcards || [];
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
    DOM.modalFlashcardsCount.textContent = state.flashcards.deck.length;
    renderActiveFlashcard();

    // Tab 4: Practice Exercises
    DOM.modalExercisesList.innerHTML = topic.practiceExercises.map((ex, idx) => `
      <div class="exercise-card glass-panel">
        <div class="exercise-q">${idx + 1}. ${escapeHTML(ex.question)}</div>
        <button class="exercise-hint-toggle" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
          💡 Toggle Hint & Answer
        </button>
        <div class="exercise-answer-box" style="display: none;">
          <p><strong>Hint:</strong> ${escapeHTML(ex.hint)}</p>
          <p style="margin-top:6px;"><strong>Answer:</strong> ${escapeHTML(ex.answer)}</p>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:4px;">${escapeHTML(ex.explanation)}</p>
        </div>
      </div>
    `).join('');

    // Tab 5: Inline MCQs
    DOM.modalMcqsCount.textContent = topic.mcqs ? topic.mcqs.length : 0;
    DOM.modalMcqsList.innerHTML = topic.mcqs.map((q, idx) => `
      <div class="mcq-item-card glass-panel">
        <p class="quiz-question-text" style="font-size:1.05rem; margin-bottom:12px;">${idx + 1}. ${escapeHTML(q.question)}</p>
        <div class="quiz-options-list">
          ${q.options.map((opt, oIdx) => `
            <div class="quiz-opt-btn" onclick="checkInlineMcq(this, ${oIdx}, ${q.correctIndex}, '${escapeJSString(q.explanation)}')">
              <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
              <span>${escapeHTML(opt)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Tab 6: Resources
    DOM.modalResourcesList.innerHTML = topic.recommendedResources.map(res => `
      <div class="glass-panel" style="padding: 16px;">
        <h5 style="color:var(--cyan); margin-bottom:4px;">🔗 ${escapeHTML(res.title)}</h5>
        <span class="category-badge">${escapeHTML(res.type)}</span>
        <a href="${res.url}" target="_blank" rel="noopener" style="display:block; margin-top:8px; font-size:0.85rem; color:var(--purple);">Visit Resource →</a>
      </div>
    `).join('');

    // Switch to target tab
    switchModalTab(initialTab);

    // Update AI Assistant Context
    updateAiContext(topic.title);

    // Show Modal
    DOM.topicModal.style.display = 'flex';
  }

  function closeTopicModal() {
    DOM.topicModal.style.display = 'none';
    DOM.youtubeIframe.src = ""; // Pause video playback
    state.activeTopic = null;
    updateAiContext('General English Hub');
  }

  function switchModalTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });
  }

  // --- FLASHCARD ENGINE ---
  function renderActiveFlashcard() {
    const deck = state.flashcards.deck;
    if (!deck || deck.length === 0) {
      DOM.fcFrontText.textContent = "No flashcards available for this topic.";
      DOM.fcBackText.textContent = "";
      return;
    }

    const card = deck[state.flashcards.currentIndex];
    DOM.fcCurrentIndex.textContent = state.flashcards.currentIndex + 1;
    DOM.fcTotalCount.textContent = deck.length;

    DOM.fcFrontText.textContent = card.front;
    DOM.fcBackText.textContent = card.back;

    // Reset 3D flip
    state.flashcards.isFlipped = false;
    DOM.activeFlashcard.classList.remove('is-flipped');
  }

  function flipFlashcard() {
    state.flashcards.isFlipped = !state.flashcards.isFlipped;
    DOM.activeFlashcard.classList.toggle('is-flipped', state.flashcards.isFlipped);
  }

  // --- QUIZ RUNNER ENGINE ---
  function startQuizRunner(topic) {
    if (!topic || !topic.quizQuestions || topic.quizQuestions.length === 0) {
      showToast('No quiz questions configured for this topic.', 'error');
      return;
    }

    state.quizRunner.questions = topic.quizQuestions;
    state.quizRunner.currentIndex = 0;
    state.quizRunner.userAnswers = {};
    state.quizRunner.timerSeconds = 300; // 5 minutes timer

    DOM.qrTopicName.textContent = topic.title;
    DOM.qrTotalNum.textContent = topic.quizQuestions.length;

    renderQuizQuestion();
    startQuizTimer();

    DOM.topicModal.style.display = 'none';
    DOM.quizRunnerModal.style.display = 'flex';
  }

  function renderQuizQuestion() {
    const qIndex = state.quizRunner.currentIndex;
    const q = state.quizRunner.questions[qIndex];

    DOM.qrCurrentNum.textContent = qIndex + 1;
    DOM.qrProgressBar.style.width = `${((qIndex + 1) / state.quizRunner.questions.length) * 100}%`;

    DOM.qrQuestionText.textContent = `${qIndex + 1}. ${q.question}`;
    DOM.qrExplanationBox.style.display = 'none';

    // Render options
    DOM.qrOptionsContainer.innerHTML = q.options.map((opt, oIdx) => {
      const isSelected = state.quizRunner.userAnswers[qIndex] === oIdx;
      return `
        <button class="quiz-opt-btn ${isSelected ? 'selected' : ''}" data-opt="${oIdx}">
          <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
          <span>${escapeHTML(opt)}</span>
        </button>
      `;
    }).join('');

    // Attach listener
    document.querySelectorAll('#qr-options-container .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const oIdx = parseInt(e.currentTarget.dataset.opt, 10);
        selectQuizOption(oIdx);
      });
    });

    // Nav Buttons
    DOM.qrPrevBtn.disabled = qIndex === 0;
    const isLast = qIndex === state.quizRunner.questions.length - 1;
    DOM.qrNextBtn.style.display = isLast ? 'none' : 'inline-flex';
    DOM.qrSubmitBtn.style.display = isLast ? 'inline-flex' : 'none';
  }

  function selectQuizOption(optionIndex) {
    const qIndex = state.quizRunner.currentIndex;
    const q = state.quizRunner.questions[qIndex];

    state.quizRunner.userAnswers[qIndex] = optionIndex;

    // Highlight option
    const btns = document.querySelectorAll('#qr-options-container .quiz-opt-btn');
    btns.forEach((btn, idx) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      if (idx === optionIndex) {
        if (optionIndex === q.correctIndex) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('incorrect');
        }
      }
      if (idx === q.correctIndex && optionIndex !== q.correctIndex) {
        btn.classList.add('correct');
      }
    });

    // Show Explanation
    DOM.qrExplanationText.textContent = q.explanation;
    DOM.qrExplanationBox.style.display = 'block';
  }

  function startQuizTimer() {
    clearInterval(state.quizRunner.timerInterval);
    state.quizRunner.timerInterval = setInterval(() => {
      state.quizRunner.timerSeconds--;
      
      const mins = Math.floor(state.quizRunner.timerSeconds / 60);
      const secs = state.quizRunner.timerSeconds % 60;
      DOM.qrTimer.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (state.quizRunner.timerSeconds <= 0) {
        clearInterval(state.quizRunner.timerInterval);
        submitQuizTest();
      }
    }, 1000);
  }

  function submitQuizTest() {
    clearInterval(state.quizRunner.timerInterval);

    let correctCount = 0;
    state.quizRunner.questions.forEach((q, idx) => {
      if (state.quizRunner.userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const total = state.quizRunner.questions.length;
    const percent = Math.round((correctCount / total) * 100);
    const xpEarned = correctCount * 20;

    // Record score
    state.userProgress.quizScores.push(percent);
    state.userProgress.totalXp += xpEarned;

    if (percent >= 70 && state.activeTopic && !state.userProgress.completedTopicIds.includes(state.activeTopic.id)) {
      state.userProgress.completedTopicIds.push(state.activeTopic.id);
    }

    saveUserProgress();

    // Populate Results Modal
    DOM.resultsScorePercent.textContent = `${percent}%`;
    DOM.resCorrectCount.textContent = correctCount;
    DOM.resIncorrectCount.textContent = total - correctCount;
    DOM.resXpEarned.textContent = `+${xpEarned} XP`;

    DOM.quizRunnerModal.style.display = 'none';
    DOM.quizResultsModal.style.display = 'flex';

    showToast(`Quiz completed! You scored ${percent}% and earned +${xpEarned} XP!`, 'success');
  }

  // --- PROGRESS DASHBOARD UPDATES ---
  function updateProgressDashboard() {
    const totalTopics = state.topics.length || 10;
    const completedCount = state.userProgress.completedTopicIds.length;
    const completionPercent = Math.round((completedCount / totalTopics) * 100);

    // Update Mastery Circle Ring (251.2 total circumference for r=40)
    const dashOffset = 251.2 - (251.2 * completionPercent) / 100;
    DOM.masteryRingFill.style.strokeDashoffset = dashOffset;
    DOM.masteryPercentage.textContent = `${completionPercent}%`;
    DOM.masteryStatusText.textContent = `${completedCount} of ${totalTopics} Topics Mastered`;

    // Quiz performance average
    const scores = state.userProgress.quizScores;
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    DOM.quizAvgScore.textContent = `${avgScore}%`;
    DOM.quizScoreBar.style.width = `${avgScore}%`;
    DOM.quizAttemptsCount.textContent = `${scores.length} Quiz test(s) completed`;

    // Header User Stats
    DOM.headerStreakCount.textContent = state.userProgress.streakDays;
    DOM.headerMasteryScore.textContent = state.userProgress.totalXp;
    DOM.totalStudyTime.textContent = `${state.userProgress.studyTimeMinutes} mins`;
    DOM.bookmarksCount.textContent = `${state.userProgress.bookmarkedTopicIds.length} Saved`;

    // Continue Learning Topic
    const lastId = state.userProgress.lastTopicId;
    const lastTopic = state.topics.find(t => t.id === lastId) || state.topics[0];
    if (lastTopic) {
      DOM.continueTopicTitle.textContent = lastTopic.title;
      DOM.continueTopicCategory.textContent = lastTopic.category;
      DOM.btnContinueTopic.onclick = () => openTopicModal(lastTopic.id);
    }

    renderTopicsGrid();
    renderActivityAndBookmarks();
  }

  function renderActivityAndBookmarks() {
    // Render Bookmarks List
    const bTopics = state.topics.filter(t => state.userProgress.bookmarkedTopicIds.includes(t.id));
    if (bTopics.length === 0) {
      DOM.bookmarksList.innerHTML = `<p class="empty-list-text">No bookmarked topics saved yet.</p>`;
    } else {
      DOM.bookmarksList.innerHTML = bTopics.map(t => `
        <div class="item-row" onclick="openTopicModal('${t.id}')">
          <div>
            <strong style="font-size:0.9rem;">${escapeHTML(t.title)}</strong>
            <span class="category-badge" style="margin-left:8px; font-size:0.7rem;">${escapeHTML(t.category)}</span>
          </div>
          <span style="color:var(--purple); font-size:0.85rem;">Study →</span>
        </div>
      `).join('');
    }

    // Render Recent Activity
    if (state.userProgress.lastTopicId) {
      const topic = state.topics.find(t => t.id === state.userProgress.lastTopicId);
      if (topic) {
        DOM.recentActivityList.innerHTML = `
          <div class="item-row" onclick="openTopicModal('${topic.id}')">
            <div>
              <strong style="font-size:0.9rem;">${escapeHTML(topic.title)}</strong>
              <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">Last studied topic</div>
            </div>
            <span class="category-badge">${escapeHTML(topic.category)}</span>
          </div>
        `;
      }
    }
  }

  function toggleBookmark(topicId) {
    const idx = state.userProgress.bookmarkedTopicIds.indexOf(topicId);
    if (idx > -1) {
      state.userProgress.bookmarkedTopicIds.splice(idx, 1);
      showToast('Topic removed from bookmarks', 'info');
    } else {
      state.userProgress.bookmarkedTopicIds.push(topicId);
      showToast('Topic saved to bookmarks! ★', 'success');
    }

    if (state.activeTopic && state.activeTopic.id === topicId) {
      const isBookmarked = state.userProgress.bookmarkedTopicIds.includes(topicId);
      DOM.modalBookmarkStar.textContent = isBookmarked ? '★' : '☆';
      DOM.modalBookmarkStar.style.color = isBookmarked ? 'var(--amber)' : 'inherit';
    }

    saveUserProgress();
  }

  // --- DOWNLOAD NOTES FEATURE ---
  function downloadTopicNotes() {
    if (!state.activeTopic) return;

    const t = state.activeTopic;
    let content = `====================================================\n`;
    content += `NOVIXES\n`;
    content += `Topic: ${t.title}\n`;
    content += `Category: ${t.category} | Difficulty: ${t.difficulty}\n`;
    content += `====================================================\n\n`;

    content += `--- LEARNING OBJECTIVES ---\n`;
    t.learningObjectives.forEach(obj => content += `• ${obj}\n`);

    content += `\n--- IMPORTANT TAKEAWAYS ---\n`;
    t.importantPoints.forEach(pt => content += `• ${pt}\n`);

    content += `\n--- DETAILED EXAMPLES ---\n`;
    t.examples.forEach(ex => content += `Title: ${ex.title}\nSentence: ${ex.sentence}\nExplanation: ${ex.explanation}\n\n`);

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${t.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded formatted notes for "${t.title}"`, 'success');
  }

  // --- AI ASSISTANT & TOOLBAR LOGIC ---
  function updateAiContext(contextName) {
    DOM.aiActiveContextName.textContent = contextName;
  }

  function toggleAiDrawer(show = null) {
    const isVisible = DOM.aiAssistantDrawer.style.display === 'flex';
    const target = show !== null ? show : !isVisible;
    DOM.aiAssistantDrawer.style.display = target ? 'flex' : 'none';
    if (target) DOM.aiChatInput.focus();
  }

  function sendAiMessage(promptText, presetType = null) {
    if (!promptText.trim()) return;

    // Append User Message
    appendChatMessage('user', promptText);

    // Show Typing Indicator
    DOM.aiTypingIndicator.style.display = 'flex';
    DOM.aiChatMessages.scrollTop = DOM.aiChatMessages.scrollHeight;

    setTimeout(() => {
      DOM.aiTypingIndicator.style.display = 'none';
      const aiResponse = generateAiResponse(promptText, presetType);
      appendChatMessage('bot', aiResponse);
    }, 900);
  }

  function appendChatMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    
    msgDiv.innerHTML = `
      <div class="msg-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
      <div class="msg-content">${sender === 'bot' ? formatMarkdown(text) : escapeHTML(text)}</div>
    `;

    DOM.aiChatMessages.appendChild(msgDiv);
    DOM.aiChatMessages.scrollTop = DOM.aiChatMessages.scrollHeight;
  }

  function generateAiResponse(query, presetType) {
    const currentTopic = state.activeTopic;
    const topicTitle = currentTopic ? currentTopic.title : "English Studies";

    if (presetType === 'summarize' || query.toLowerCase().includes('summarize')) {
      if (currentTopic) {
        return `### 📝 Key Summary: **${currentTopic.title}**\n` +
               `Here are the core takeaways for this module:\n` +
               currentTopic.importantPoints.map(p => `• **${p}**`).join('\n') +
               `\n\n*Study Tip: Review the practice exercises in Tab 4 to test your application!*`;
      }
      return `### 📝 General English Study Summary\n` +
             `To master English Grammar & Literature:\n` +
             `1. Focus on sentence structure and active/passive voice.\n` +
             `2. Expand contextual vocabulary daily.\n` +
             `3. Structure essays with clear thesis statements and logical paragraph flow.`;
    }

    if (presetType === 'explain' || query.toLowerCase().includes('explain')) {
      if (currentTopic) {
        return `### 💡 Concept Explanation: **${currentTopic.title}**\n` +
               `**Core Concept:** ${currentTopic.description}\n\n` +
               `**Example Breakdown:**\n` +
               (currentTopic.examples[0] ? `> *"${currentTopic.examples[0].sentence}"*\n${currentTopic.examples[0].explanation}` : `This concept improves clarity and academic writing precision.`);
      }
      return `### 💡 English Rules Explained\n` +
             `English sentence structure relies on **Subject + Verb + Object**. Master clauses, modifiers, and tense consistency to eliminate common grammatical errors!`;
    }

    if (presetType === 'quiz' || query.toLowerCase().includes('quiz') || query.toLowerCase().includes('question')) {
      if (currentTopic && currentTopic.mcqs) {
        const sample = currentTopic.mcqs[0];
        return `### 🎯 Practice AI Quiz Challenge for **${currentTopic.title}**\n` +
               `**Q:** ${sample.question}\n\n` +
               sample.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n') +
               `\n\n*(Answer: Option ${String.fromCharCode(65 + sample.correctIndex)} — ${sample.explanation})*`;
      }
      return `### 🎯 Quick Grammar Quiz\n**Q:** Which sentence is in the Active Voice?\nA) The essay was written by Sarah.\nB) Sarah wrote the essay.\n\n*Correct Answer: B! Active voice features the subject performing the action directly.*`;
    }

    return `I am analyzing **${topicTitle}**. ${currentTopic ? currentTopic.description : 'Feel free to ask any specific question about grammar rules, literary devices, poetry meter, or essay structures!'}`;
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Search & Filters
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      DOM.searchClearBtn.style.display = state.searchQuery ? 'flex' : 'none';
      renderTopicsGrid();
    });

    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.style.display = 'none';
      renderTopicsGrid();
    });

    DOM.difficultyFilter.addEventListener('change', (e) => {
      state.activeDifficulty = e.target.value;
      renderTopicsGrid();
    });

    // Category Pills
    DOM.categoryPills.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill-btn')) {
        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        state.activeCategory = e.target.dataset.category;
        renderTopicsGrid();
      }
    });

    // Category Hub Cards Click
    document.querySelectorAll('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.catLink;
        state.activeCategory = cat;
        
        document.querySelectorAll('.pill-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.category === cat);
        });

        const topicsGrid = document.getElementById('topics-grid');
        topicsGrid.scrollIntoView({ behavior: 'smooth' });
        renderTopicsGrid();
      });
    });

    // Reset Progress & Search
    DOM.btnResetProgress.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all quiz scores and completed topics?')) {
        state.userProgress = {
          completedTopicIds: [],
          bookmarkedTopicIds: [],
          quizScores: [],
          totalXp: 850,
          streakDays: 3,
          studyTimeMinutes: 45,
          lastTopicId: null
        };
        saveUserProgress();
        showToast('Learning progress reset successfully', 'info');
      }
    });

    DOM.btnResetSearch.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      state.activeCategory = 'all';
      state.activeDifficulty = 'all';
      DOM.difficultyFilter.value = 'all';
      document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
      renderTopicsGrid();
    });

    // Modal Close
    DOM.modalCloseBtn.addEventListener('click', closeTopicModal);
    DOM.topicModal.addEventListener('click', (e) => {
      if (e.target === DOM.topicModal) closeTopicModal();
    });

    // Modal Tabs
    DOM.modalTabsBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn')) {
        switchModalTab(e.target.dataset.tab);
      }
    });

    // Modal Download & Bookmark
    DOM.modalDownloadNotesBtn.addEventListener('click', downloadTopicNotes);
    DOM.modalBookmarkToggleBtn.addEventListener('click', () => {
      if (state.activeTopic) toggleBookmark(state.activeTopic.id);
    });

    // Flashcard Controls
    DOM.fcFlipBtn.addEventListener('click', flipFlashcard);
    DOM.activeFlashcard.addEventListener('click', flipFlashcard);
    DOM.fcNextBtn.addEventListener('click', () => {
      if (state.flashcards.deck.length === 0) return;
      state.flashcards.currentIndex = (state.flashcards.currentIndex + 1) % state.flashcards.deck.length;
      renderActiveFlashcard();
    });
    DOM.fcPrevBtn.addEventListener('click', () => {
      if (state.flashcards.deck.length === 0) return;
      state.flashcards.currentIndex = (state.flashcards.currentIndex - 1 + state.flashcards.deck.length) % state.flashcards.deck.length;
      renderActiveFlashcard();
    });
    DOM.fcBtnShuffle.addEventListener('click', () => {
      state.flashcards.deck.sort(() => Math.random() - 0.5);
      state.flashcards.currentIndex = 0;
      renderActiveFlashcard();
      showToast('Flashcard deck shuffled!', 'info');
    });

    // Quiz Runner Navigation
    DOM.btnStartModalQuiz.addEventListener('click', () => {
      if (state.activeTopic) startQuizRunner(state.activeTopic);
    });
    DOM.qrPrevBtn.addEventListener('click', () => {
      if (state.quizRunner.currentIndex > 0) {
        state.quizRunner.currentIndex--;
        renderQuizQuestion();
      }
    });
    DOM.qrNextBtn.addEventListener('click', () => {
      if (state.quizRunner.currentIndex < state.quizRunner.questions.length - 1) {
        state.quizRunner.currentIndex++;
        renderQuizQuestion();
      }
    });
    DOM.qrSubmitBtn.addEventListener('click', submitQuizTest);
    DOM.qrExitBtn.addEventListener('click', () => {
      clearInterval(state.quizRunner.timerInterval);
      DOM.quizRunnerModal.style.display = 'none';
      if (state.activeTopic) DOM.topicModal.style.display = 'flex';
    });

    // Quiz Results Actions
    DOM.btnResultsRetry.addEventListener('click', () => {
      DOM.quizResultsModal.style.display = 'none';
      if (state.activeTopic) startQuizRunner(state.activeTopic);
    });
    DOM.btnResultsContinue.addEventListener('click', () => {
      DOM.quizResultsModal.style.display = 'none';
      updateProgressDashboard();
    });

    // AI Drawer Controls
    DOM.btnToggleAiFloating.addEventListener('click', () => toggleAiDrawer());
    DOM.btnHeroAiExplain.addEventListener('click', () => toggleAiDrawer(true));
    DOM.btnCloseAiDrawer.addEventListener('click', () => toggleAiDrawer(false));
    document.getElementById('footer-link-ai').addEventListener('click', (e) => {
      e.preventDefault();
      toggleAiDrawer(true);
    });

    // AI Toolbar Buttons inside Modal
    DOM.aiToolAsk.addEventListener('click', () => {
      toggleAiDrawer(true);
      sendAiMessage(`Can you explain the key concepts of "${state.activeTopic.title}"?`, 'explain');
    });
    DOM.aiToolSummarize.addEventListener('click', () => {
      toggleAiDrawer(true);
      sendAiMessage(`Please summarize the main notes for "${state.activeTopic.title}".`, 'summarize');
    });
    DOM.aiToolExplain.addEventListener('click', () => {
      toggleAiDrawer(true);
      sendAiMessage(`Explain the difficult rules and examples in "${state.activeTopic.title}".`, 'explain');
    });
    DOM.aiToolQuiz.addEventListener('click', () => {
      toggleAiDrawer(true);
      sendAiMessage(`Generate 3 practice questions for "${state.activeTopic.title}".`, 'quiz');
    });

    // AI Chat Form Submit
    DOM.aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = DOM.aiChatInput.value;
      DOM.aiChatInput.value = '';
      sendAiMessage(val);
    });

    // AI Preset Chips
    document.querySelectorAll('.ai-preset-chips .chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.dataset.preset;
        sendAiMessage(chip.textContent, type);
      });
    });
  }

  // Global inline MCQ check helper
  window.checkInlineMcq = function(btnElement, selectedIdx, correctIdx, explanation) {
    const parentContainer = btnElement.parentElement;
    const allBtns = parentContainer.querySelectorAll('.quiz-opt-btn');
    
    allBtns.forEach((btn, idx) => {
      btn.classList.remove('correct', 'incorrect');
      if (idx === correctIdx) btn.classList.add('correct');
      if (idx === selectedIdx && selectedIdx !== correctIdx) btn.classList.add('incorrect');
    });

    showToast(selectedIdx === correctIdx ? 'Correct Answer! 🎉' : `Incorrect. ${explanation}`, selectedIdx === correctIdx ? 'success' : 'error');
  };

  // --- HELPER UTILITIES ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function escapeJSString(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^### (.*$)/gim, '<h4 style="margin:8px 0; color:var(--cyan);">$1</h4>')
      .replace(/\n/g, '<br/>');
  }
});
