/**
 * EduNexa AI - Grade 1 Learning System (Sindh Board Curriculum)
 * Pure Vanilla JavaScript: Interactive Lessons, Mini-Games, 20-Q Quiz,
 * Parent Analytics, Voice Synthesis, Rewards & Confetti.
 */

class EduNexaApp {
  constructor() {
    // Initial State & LocalStorage Keys
    this.storageKey = 'studymate_grade1_data_v1';
    this.state = this.loadState();

    // Audio & Speech
    this.audioEnabled = this.state.audioEnabled ?? true;
    this.speechAvailable = 'speechSynthesis' in window;

    // Current Game & Tab State
    this.currentGame = 1;
    this.currentSubject = 'english';
    this.currentSubModule = 'alphabet';
    this.game1SelectedWord = null;
    this.game1SelectedPic = null;
    this.game1MatchesCount = 0;

    // Quiz State
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    // Confetti Engine
    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];
    this.confettiAnimationId = null;

    // Initialize after DOM Ready
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  // =========================================================================
  // STATE MANAGEMENT & LOCAL STORAGE
  // =========================================================================

  getDefaultState() {
    return {
      stars: 35,
      streak: 2,
      lastActiveDate: new Date().toDateString(),
      audioEnabled: true,
      dailyTasks: {
        task1: false,
        task2: false,
        task3: false,
        task4: false,
      },
      unlockedBadges: ['badge_welcome'],
      subjectMastery: {
        english: 60,
        sindhi: 40,
        math: 80,
        science: 40,
        gk: 60
      },
      analytics: {
        questionsAttempted: 12,
        correctAnswers: 10,
        gamesPlayed: 5,
        quizzesCompleted: 1
      },
      gameScores: {
        game1: 0,
        game2: 0,
        game3: 0,
        game4: 0,
        game5: 0
      }
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      this.updateHeaderStats();
      this.updateParentDashboard();
      this.updateBadgesView();
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  addStars(amount, source = 'Activity') {
    this.state.stars += amount;
    this.saveState();
    this.showFloatingStarToast(`+${amount} Stars! ⭐`);
    this.triggerMascotCheer(`Awesome! You earned ${amount} stars for ${source}! ⭐`);
    this.checkBadgeUnlocks();
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================

  init() {
    this.setupNavigation();
    this.setupConfetti();
    this.setupSearch();
    this.setupDailyTasks();
    this.populateAllSubjects();
    this.initMathGenerators();
    this.initGames();
    this.initQuiz();
    this.updateBadgesView();
    this.updateParentDashboard();
    this.updateHeaderStats();
    this.setupMascotInteractions();

    // Check Streak
    const today = new Date().toDateString();
    if (this.state.lastActiveDate !== today) {
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  setupNavigation() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        this.state.audioEnabled = this.audioEnabled;
        this.saveState();
        document.getElementById('audioIcon').textContent = this.audioEnabled ? '🔊' : '🔇';
        audioBtn.querySelector('.btn-text').textContent = this.audioEnabled ? 'Voice On' : 'Voice Off';
        if (this.audioEnabled) {
          this.speakText('Audio guidance enabled!');
        }
      });
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
      });

      mobileNav.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('open'));
      });
    }

    const refreshQuoteBtn = document.getElementById('refreshQuoteBtn');
    if (refreshQuoteBtn) {
      refreshQuoteBtn.addEventListener('click', () => this.rotateMotivationQuote());
    }
  }

  updateHeaderStats() {
    const starCountEl = document.getElementById('headerStarCount');
    const streakCountEl = document.getElementById('headerStreakCount');
    const totalStarsCount = document.getElementById('totalStarsCount');
    const streakDaysCount = document.getElementById('streakDaysCount');

    if (starCountEl) starCountEl.textContent = this.state.stars;
    if (streakCountEl) streakCountEl.textContent = this.state.streak;
    if (totalStarsCount) totalStarsCount.textContent = this.state.stars;
    if (streakDaysCount) streakDaysCount.textContent = `${this.state.streak} Days`;
  }

  // =========================================================================
  // SPEECH SYNTHESIS
  // =========================================================================

  speakText(text, lang = 'en-US') {
    if (!this.audioEnabled || !this.speechAvailable) return;
    try {
      window.speechSynthesis.cancel(); // Stop prior audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Friendly child pace
      utterance.pitch = 1.2; // Cheerful bright pitch
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed', e);
    }
  }

  // =========================================================================
  // TODAY'S DAILY LEARNING PLAN
  // =========================================================================

  setupDailyTasks() {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach((card, idx) => {
      const taskId = `task${idx + 1}`;
      const btn = card.querySelector('.task-check-btn');

      if (this.state.dailyTasks[taskId]) {
        card.classList.add('completed');
      }

      if (btn) {
        btn.addEventListener('click', () => {
          const isDone = !this.state.dailyTasks[taskId];
          this.state.dailyTasks[taskId] = isDone;
          card.classList.toggle('completed', isDone);

          if (isDone) {
            this.addStars(10, 'Daily Task Complete');
            this.launchConfetti();
            this.speakText('Great job completing this task! You earned 10 stars!');
          }
          this.updateDailyPlanProgress();
          this.saveState();
        });
      }
    });

    this.updateDailyPlanProgress();
  }

  updateDailyPlanProgress() {
    const tasks = Object.values(this.state.dailyTasks);
    const completedCount = tasks.filter(Boolean).length;
    const percent = Math.round((completedCount / tasks.length) * 100);

    const percentEl = document.getElementById('dailyPlanPercent');
    const tasksDoneEl = document.getElementById('dailyTasksDone');
    const progressBar = document.getElementById('dailyPlanProgressBar');

    if (percentEl) percentEl.textContent = `${percent}%`;
    if (tasksDoneEl) tasksDoneEl.textContent = `${completedCount} of ${tasks.length} Completed`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (completedCount === 4) {
      this.unlockBadge('badge_super_learner');
    }
  }

  // =========================================================================
  // SUBJECT EXPLORATION HUB & TABS
  // =========================================================================

  switchTab(subjectKey) {
    this.currentSubject = subjectKey;
    document.querySelectorAll('.hub-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.hub-panel').forEach(panel => panel.classList.remove('active'));

    const tabBtn = document.getElementById(`tabBtn${this.capitalize(subjectKey)}`);
    const panel = document.getElementById(`panel${this.capitalize(subjectKey)}`);

    if (tabBtn) tabBtn.classList.add('active');
    if (panel) panel.classList.add('active');
  }

  openSubjectTab(subjectKey, subModuleKey) {
    this.switchTab(subjectKey);
    this.switchSubModule(subjectKey, subModuleKey);
    const hub = document.getElementById('interactive-hub');
    if (hub) hub.scrollIntoView({ behavior: 'smooth' });
  }

  switchSubModule(subjectKey, subModuleKey) {
    this.currentSubModule = subModuleKey;
    const panel = document.getElementById(`panel${this.capitalize(subjectKey)}`);
    if (!panel) return;

    panel.querySelectorAll('.sub-pill').forEach(pill => {
      pill.classList.toggle('active', pill.textContent.toLowerCase().includes(subModuleKey.toLowerCase()));
    });

    panel.querySelectorAll('.sub-module-view').forEach(view => {
      view.classList.toggle('active', view.id.toLowerCase().includes(subModuleKey.toLowerCase()));
    });
  }

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // =========================================================================
  // POPULATE SUBJECT DATA (ENGLISH, SINDHI, MATH, SCIENCE, GK)
  // =========================================================================

  populateAllSubjects() {
    this.populateEnglish();
    this.populateSindhi();
    this.populateMathCounting();
    this.populateMathShapes();
    this.populateMathComparison();
    this.populateScience();
    this.populateGK();
  }

  populateEnglish() {
    // A-Z Alphabet Data
    const alphabetData = [
      { letter: 'A a', word: 'Apple', emoji: '🍎', phonics: 'A is for Apple' },
      { letter: 'B b', word: 'Ball', emoji: '⚽', phonics: 'B is for Ball' },
      { letter: 'C c', word: 'Cat', emoji: '🐱', phonics: 'C is for Cat' },
      { letter: 'D d', word: 'Duck', emoji: '🦆', phonics: 'D is for Duck' },
      { letter: 'E e', word: 'Elephant', emoji: '🐘', phonics: 'E is for Elephant' },
      { letter: 'F f', word: 'Fish', emoji: '🐟', phonics: 'F is for Fish' },
      { letter: 'G g', word: 'Giraffe', emoji: '🦒', phonics: 'G is for Giraffe' },
      { letter: 'H h', word: 'Hat', emoji: '🎩', phonics: 'H is for Hat' },
      { letter: 'I i', word: 'Ice Cream', emoji: '🍦', phonics: 'I is for Ice Cream' },
      { letter: 'J j', word: 'Jug', emoji: '🏺', phonics: 'J is for Jug' },
      { letter: 'K k', word: 'Kite', emoji: '🪁', phonics: 'K is for Kite' },
      { letter: 'L l', word: 'Lion', emoji: '🦁', phonics: 'L is for Lion' },
      { letter: 'M m', word: 'Mango', emoji: '🥭', phonics: 'M is for Mango' },
      { letter: 'N n', word: 'Nest', emoji: '🪺', phonics: 'N is for Nest' },
      { letter: 'O o', word: 'Orange', emoji: '🍊', phonics: 'O is for Orange' },
      { letter: 'P p', word: 'Pencil', emoji: '✏️', phonics: 'P is for Pencil' },
      { letter: 'Q q', word: 'Queen', emoji: '👑', phonics: 'Q is for Queen' },
      { letter: 'R r', word: 'Rabbit', emoji: '🐰', phonics: 'R is for Rabbit' },
      { letter: 'S s', word: 'Sun', emoji: '☀️', phonics: 'S is for Sun' },
      { letter: 'T t', word: 'Tree', emoji: '🌳', phonics: 'T is for Tree' },
      { letter: 'U u', word: 'Umbrella', emoji: '☂️', phonics: 'U is for Umbrella' },
      { letter: 'V v', word: 'Van', emoji: '🚐', phonics: 'V is for Van' },
      { letter: 'W w', word: 'Watch', emoji: '⌚', phonics: 'W is for Watch' },
      { letter: 'X x', word: 'Xylophone', emoji: '🎵', phonics: 'X is for Xylophone' },
      { letter: 'Y y', word: 'Yo-yo', emoji: '🪀', phonics: 'Y is for Yo-yo' },
      { letter: 'Z z', word: 'Zebra', emoji: '🦓', phonics: 'Z is for Zebra' }
    ];

    const alphaGrid = document.getElementById('englishAlphabetGrid');
    if (alphaGrid) {
      alphaGrid.innerHTML = alphabetData.map(item => `
        <div class="letter-card" onclick="app.speakText('${item.phonics}')">
          <span class="big-letter">${item.letter}</span>
          <span class="letter-visual">${item.emoji}</span>
          <span class="letter-word">${item.word}</span>
          <span class="listen-chip">🔊 Hear</span>
        </div>
      `).join('');
    }

    // 3-Letter CVC Words
    const cvcWords = [
      { word: 'CAT', emoji: '🐱', sound: 'C - A - T : Cat' },
      { word: 'DOG', emoji: '🐶', sound: 'D - O - G : Dog' },
      { word: 'SUN', emoji: '☀️', sound: 'S - U - N : Sun' },
      { word: 'BAG', emoji: '🎒', sound: 'B - A - G : Bag' },
      { word: 'PEN', emoji: '🖊️', sound: 'P - E - N : Pen' },
      { word: 'HEN', emoji: '🐔', sound: 'H - E - N : Hen' },
      { word: 'BOX', emoji: '📦', sound: 'B - O - X : Box' },
      { word: 'CUP', emoji: '☕', sound: 'C - U - P : Cup' },
      { word: 'BAT', emoji: '🏏', sound: 'B - A - T : Bat' },
      { word: 'FAN', emoji: '🪭', sound: 'F - A - N : Fan' }
    ];

    const wordsGrid = document.getElementById('englishWordsGrid');
    if (wordsGrid) {
      wordsGrid.innerHTML = cvcWords.map(w => `
        <div class="word-card" onclick="app.speakText('${w.sound}')">
          <span class="word-visual">${w.emoji}</span>
          <span class="word-spelling">${w.word}</span>
          <span class="listen-chip">🔊 Read Aloud</span>
        </div>
      `).join('');
    }

    // Sentences
    const sentences = [
      { text: 'The cat is on the mat.', emoji: '🐱' },
      { text: 'I see a big red apple.', emoji: '🍎' },
      { text: 'The sun is shining bright in the sky.', emoji: '☀️' },
      { text: 'I love to read my school book.', emoji: '📚' }
    ];

    const sentList = document.getElementById('englishSentencesList');
    if (sentList) {
      sentList.innerHTML = sentences.map(s => `
        <div class="sentence-card">
          <div class="sentence-text-group">
            <span class="sentence-emoji">${s.emoji}</span>
            <span class="sentence-str">${s.text}</span>
          </div>
          <button class="listen-btn-round" onclick="app.speakText('${s.text}')">🔊 Listen</button>
        </div>
      `).join('');
    }
  }

  populateSindhi() {
    // Sindh Board Authentic Grade 1 Sindhi Alphabet & Pictures
    const sindhiData = [
      { letter: 'ا', word: 'اُٺ (Camel)', emoji: '🐪', roman: 'Uth (Camel)' },
      { letter: 'ب', word: 'ٻلي (Cat)', emoji: '🐱', roman: 'Bili (Cat)' },
      { letter: 'ٻ', word: 'ٻڪري (Goat)', emoji: '🐐', roman: 'Bakri (Goat)' },
      { letter: 'ڀ', word: 'ڀولڙو (Monkey)', emoji: '🐵', roman: 'Bholro (Monkey)' },
      { letter: 'ت', word: 'تارول (Star)', emoji: '⭐', roman: 'Taro (Star)' },
      { letter: 'ٽ', word: 'ٽوپي (Cap)', emoji: '🧢', roman: 'Topi (Cap)' },
      { letter: 'پ', word: 'پکو (Fan)', emoji: '🪭', roman: 'Pakho (Fan)' },
      { letter: 'ج', word: 'جھنڊو (Flag)', emoji: '🇵🇰', roman: 'Jhando (Flag)' },
      { letter: 'چ', word: 'چنڊ (Moon)', emoji: '🌙', roman: 'Chand (Moon)' },
      { letter: 'د', word: 'دروازو (Door)', emoji: '🚪', roman: 'Darwazo (Door)' },
      { letter: 'گ', word: 'گل (Flower)', emoji: '🌸', roman: 'Gul (Flower)' },
      { letter: 'گھ', word: 'گھوڙو (Horse)', emoji: '🐎', roman: 'Ghoro (Horse)' },
      { letter: 'ڪ', word: 'ڪتاب (Book)', emoji: '📚', roman: 'Kitaab (Book)' },
      { letter: 'م', word: 'مڇي (Fish)', emoji: '🐟', roman: 'Machhi (Fish)' },
      { letter: 'هـ', word: 'هٿ (Hand)', emoji: '✋', roman: 'Hath (Hand)' },
      { letter: 'ن', word: 'نانگ (Snake)', emoji: '🐍', roman: 'Naang (Snake)' }
    ];

    const sindhiGrid = document.getElementById('sindhiAlphabetGrid');
    if (sindhiGrid) {
      sindhiGrid.innerHTML = sindhiData.map(item => `
        <div class="letter-card" onclick="app.speakText('${item.roman}')">
          <span class="sindhi-letter">${item.letter}</span>
          <span class="letter-visual">${item.emoji}</span>
          <span class="letter-word" style="font-family: var(--font-arabic);">${item.word}</span>
          <span class="listen-chip">🔊 ٻڌو</span>
        </div>
      `).join('');
    }

    const sindhiWords = [
      { word: 'پاڻي (Water)', emoji: '💧', roman: 'Paani (Water)' },
      { word: 'چمچو (Spoon)', emoji: '🥄', roman: 'Chamcho (Spoon)' },
      { word: 'انب (Mango)', emoji: '🥭', roman: 'Amb (Mango)' },
      { word: 'پکي (Bird)', emoji: '🐦', roman: 'Pakhi (Bird)' },
      { word: 'گاڏي (Car)', emoji: '🚗', roman: 'Gaadi (Car)' },
      { word: 'قلم (Pen)', emoji: '🖊️', roman: 'Qalam (Pen)' }
    ];

    const sWordsGrid = document.getElementById('sindhiWordsGrid');
    if (sWordsGrid) {
      sWordsGrid.innerHTML = sindhiWords.map(w => `
        <div class="word-card" onclick="app.speakText('${w.roman}')">
          <span class="word-visual">${w.emoji}</span>
          <span class="word-spelling" style="font-family: var(--font-arabic); font-size: 1.6rem;">${w.word}</span>
          <span class="listen-chip">🔊 تلفظ</span>
        </div>
      `).join('');
    }

    const sindhiSentences = [
      { sindhi: 'هي منهنجو ڪتاب آهي.', english: 'This is my book.', emoji: '📚' },
      { sindhi: 'مڇي پاڻيءَ ۾ تري ٿي.', english: 'Fish swims in water.', emoji: '🐟' },
      { sindhi: 'چمڪندڙ تارو ڏسو.', english: 'Look at the shining star.', emoji: '⭐' }
    ];

    const sSentList = document.getElementById('sindhiSentencesList');
    if (sSentList) {
      sSentList.innerHTML = sindhiSentences.map(s => `
        <div class="sentence-card">
          <div class="sentence-text-group">
            <span class="sentence-emoji">${s.emoji}</span>
            <div>
              <span class="sentence-str" style="font-family: var(--font-arabic); font-size: 1.4rem; display:block;">${s.sindhi}</span>
              <span style="color: #64748b; font-weight: 600; font-size: 0.9rem;">${s.english}</span>
            </div>
          </div>
          <button class="listen-btn-round" onclick="app.speakText('${s.english}')">🔊 Listen</button>
        </div>
      `).join('');
    }
  }

  populateMathCounting() {
    const mathGrid = document.getElementById('mathCountingGrid');
    if (!mathGrid) return;

    const emojis = ['🍎', '⭐', '🎈', '🚗', '🍓', '🐠', '🦋', '🌸', '⚽', '🍦'];
    let html = '';
    for (let i = 1; i <= 20; i++) {
      const emoji = emojis[(i - 1) % emojis.length];
      const countVisual = emoji.repeat(Math.min(i, 5)) + (i > 5 ? ` (+${i - 5})` : '');
      html += `
        <div class="counting-card" onclick="app.speakText('${i}')">
          <span class="count-digit">${i}</span>
          <span class="count-objects">${countVisual}</span>
          <span class="count-word">${this.numberToWord(i)}</span>
        </div>
      `;
    }
    mathGrid.innerHTML = html;
  }

  numberToWord(num) {
    const words = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
    ];
    return words[num] || String(num);
  }

  populateMathShapes() {
    const shapes = [
      { name: 'Circle', icon: '⚪', sides: '0 sides (Round like a ball)', real: 'Clock, Coin, Wheel' },
      { name: 'Square', icon: '⬛', sides: '4 equal sides and 4 corners', real: 'Bread slice, Dice, Window' },
      { name: 'Triangle', icon: '🔺', sides: '3 sides and 3 sharp corners', real: 'Pizza slice, Traffic cone' },
      { name: 'Rectangle', icon: '▬', sides: '4 sides (Opposite sides equal)', real: 'Door, Book, Mobile screen' },
      { name: 'Star', icon: '⭐', sides: '5 shining points', real: 'Sky stars, Starfish' },
      { name: 'Oval', icon: '🥚', sides: 'Round egg shape with 0 corners', real: 'Egg, Watermelon' }
    ];

    const shapesGrid = document.getElementById('mathShapesGrid');
    if (shapesGrid) {
      shapesGrid.innerHTML = shapes.map(s => `
        <div class="shape-card" onclick="app.speakText('${s.name}: ${s.sides}')">
          <span class="shape-visual-icon">${s.icon}</span>
          <h4 class="shape-title">${s.name}</h4>
          <p class="shape-property">${s.sides}</p>
          <div style="font-size: 0.78rem; color: #0284c7; font-weight: 700; margin-top: 0.4rem;">Examples: ${s.real}</div>
        </div>
      `).join('');
    }
  }

  populateMathComparison() {
    const compBox = document.getElementById('mathComparisonBox');
    if (!compBox) return;

    compBox.innerHTML = `
      <div style="text-align: center; max-width: 600px; margin: 0 auto;">
        <h4 style="font-size: 1.3rem; font-weight: 900; margin-bottom: 1rem;">Comparing Numbers (Greater, Less, Equal)</h4>
        <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="background: #ffffff; padding: 1.25rem; border-radius: 16px; border: 2px solid #86efac; min-width: 150px;">
            <div style="font-size: 2.2rem; font-weight: 900; color: #15803d;">7 > 3</div>
            <p style="font-weight: 800; font-size: 0.9rem; color: #334155;">7 is <strong>Greater Than</strong> 3</p>
            <div style="font-size: 1.2rem;">🍎🍎🍎🍎🍎🍎🍎 vs 🍎🍎🍎</div>
          </div>

          <div style="background: #ffffff; padding: 1.25rem; border-radius: 16px; border: 2px solid #bae6fd; min-width: 150px;">
            <div style="font-size: 2.2rem; font-weight: 900; color: #0284c7;">4 < 8</div>
            <p style="font-weight: 800; font-size: 0.9rem; color: #334155;">4 is <strong>Less Than</strong> 8</p>
            <div style="font-size: 1.2rem;">⭐⭐⭐⭐ vs ⭐⭐⭐⭐⭐⭐⭐⭐</div>
          </div>

          <div style="background: #ffffff; padding: 1.25rem; border-radius: 16px; border: 2px solid #fed7aa; min-width: 150px;">
            <div style="font-size: 2.2rem; font-weight: 900; color: #ea580c;">5 = 5</div>
            <p style="font-weight: 800; font-size: 0.9rem; color: #334155;">5 is <strong>Equal To</strong> 5</p>
            <div style="font-size: 1.2rem;">🎈🎈🎈🎈🎈 = 🎈🎈🎈🎈🎈</div>
          </div>
        </div>
      </div>
    `;
  }

  populateScience() {
    const senses = [
      { name: 'Eyes (ڏسڻ جون اکيون)', icon: '👀', desc: 'We see colors, books, and nature.' },
      { name: 'Ears (ٻڌڻ جا ڪن)', icon: '👂', desc: 'We hear sounds, music, and voices.' },
      { name: 'Nose (سنگھڻ جو نڪ)', icon: '👃', desc: 'We smell sweet flowers and food.' },
      { name: 'Tongue (چکڻ جي ڄڀ)', icon: '👅', desc: 'We taste sweet apples and yummy food.' },
      { name: 'Skin / Hands (هٿ)', icon: '✋', desc: 'We feel soft teddy bears and warm sunshine.' }
    ];
    const bodyGrid = document.getElementById('scienceBodyGrid');
    if (bodyGrid) {
      bodyGrid.innerHTML = senses.map(s => `
        <div class="science-card" onclick="app.speakText('${s.name}. ${s.desc}')">
          <span class="science-visual-icon">${s.icon}</span>
          <h4 class="science-title">${s.name}</h4>
          <p class="science-desc">${s.desc}</p>
        </div>
      `).join('');
    }

    const animals = [
      { name: 'Cow (ڳئون)', icon: '🐄', desc: 'Farm animal that gives us healthy milk.' },
      { name: 'Lion (شينهن)', icon: '🦁', desc: 'King of the wild jungle!' },
      { name: 'Cat (ٻلي)', icon: '🐱', desc: 'Friendly pet animal that says meow.' },
      { name: 'Fish (مڇي)', icon: '🐟', desc: 'Water animal that swims using fins.' }
    ];
    const animalsGrid = document.getElementById('scienceAnimalsGrid');
    if (animalsGrid) {
      animalsGrid.innerHTML = animals.map(a => `
        <div class="science-card" onclick="app.speakText('${a.name}. ${a.desc}')">
          <span class="science-visual-icon">${a.icon}</span>
          <h4 class="science-title">${a.name}</h4>
          <p class="science-desc">${a.desc}</p>
        </div>
      `).join('');
    }

    const plants = [
      { name: 'Roots (پاڙون)', icon: '🌱', desc: 'Grow under the soil to drink water.' },
      { name: 'Stem (ٿڙ)', icon: '🎋', desc: 'Holds the plant strong and upright.' },
      { name: 'Leaves (پن)', icon: '🍃', desc: 'Green leaves prepare food using sunlight.' },
      { name: 'Flower (گل)', icon: '🌸', desc: 'Beautiful colorful part that turns into fruit.' }
    ];
    const plantsGrid = document.getElementById('sciencePlantsGrid');
    if (plantsGrid) {
      plantsGrid.innerHTML = plants.map(p => `
        <div class="science-card" onclick="app.speakText('${p.name}. ${p.desc}')">
          <span class="science-visual-icon">${p.icon}</span>
          <h4 class="science-title">${p.name}</h4>
          <p class="science-desc">${p.desc}</p>
        </div>
      `).join('');
    }

    const living = [
      { name: 'Living: Puppy 🐶', icon: '🐶', desc: 'Can grow, breathe, eat, and move.' },
      { name: 'Living: Tree 🌳', icon: '🌳', desc: 'Grows tall, breathes air, needs water.' },
      { name: 'Non-Living: Chair 🪑', icon: '🪑', desc: 'Cannot eat, breathe, or grow.' },
      { name: 'Non-Living: Car 🚗', icon: '🚗', desc: 'Made of metal, needs fuel to drive.' }
    ];
    const livingGrid = document.getElementById('scienceLivingGrid');
    if (livingGrid) {
      livingGrid.innerHTML = living.map(l => `
        <div class="science-card" onclick="app.speakText('${l.name}. ${l.desc}')">
          <span class="science-visual-icon">${l.icon}</span>
          <h4 class="science-title">${l.name}</h4>
          <p class="science-desc">${l.desc}</p>
        </div>
      `).join('');
    }

    const env = [
      { name: 'Clean Air (صاف هوا)', icon: '💨', desc: 'Trees give us fresh air to breathe.' },
      { name: 'Pure Water (پاڻي)', icon: '💧', desc: 'Drink clean boiled or filtered water.' },
      { name: 'Washing Hands (هٿ ڌوئڻ)', icon: '🧼', desc: 'Wash hands before eating to stay healthy.' },
      { name: 'Dustbin (ڪچري جو دٻو)', icon: '🗑️', desc: 'Always throw wrappers in the trash bin.' }
    ];
    const envGrid = document.getElementById('scienceEnvironmentGrid');
    if (envGrid) {
      envGrid.innerHTML = env.map(e => `
        <div class="science-card" onclick="app.speakText('${e.name}. ${e.desc}')">
          <span class="science-visual-icon">${e.icon}</span>
          <h4 class="science-title">${e.name}</h4>
          <p class="science-desc">${e.desc}</p>
        </div>
      `).join('');
    }
  }

  populateGK() {
    const helpers = [
      { name: 'Teacher (استاد)', icon: '👩‍🏫', desc: 'Teaches children to read and write in school.' },
      { name: 'Doctor (ڊاڪٽر)', icon: '👨‍⚕️', desc: 'Helps us heal when we are sick or unwell.' },
      { name: 'Police Officer', icon: '👮', desc: 'Keeps our community and streets safe.' },
      { name: 'Farmer (هارِي)', icon: '👨‍🌾', desc: 'Grows wheat, rice, fruits, and vegetables for us.' }
    ];
    const helpersGrid = document.getElementById('gkHelpersGrid');
    if (helpersGrid) {
      helpersGrid.innerHTML = helpers.map(h => `
        <div class="gk-card" onclick="app.speakText('${h.name}. ${h.desc}')">
          <span class="gk-visual-icon">${h.icon}</span>
          <h4 class="gk-title">${h.name}</h4>
          <p class="gk-desc">${h.desc}</p>
        </div>
      `).join('');
    }

    const seasons = [
      { name: 'Spring (بهار)', icon: '🌸', desc: 'Fresh flowers bloom and butterflies fly.' },
      { name: 'Summer (اونهارو)', icon: '☀️', desc: 'Hot sunny days, cool drinks, and sweet mangoes!' },
      { name: 'Autumn (سرءُ)', icon: '🍂', desc: 'Dry leaves fall gently from tall trees.' },
      { name: 'Winter (سيارو)', icon: '❄️', desc: 'Cold weather, warm jackets, and cozy hot soups.' }
    ];
    const seasonsGrid = document.getElementById('gkSeasonsGrid');
    if (seasonsGrid) {
      seasonsGrid.innerHTML = seasons.map(s => `
        <div class="gk-card" onclick="app.speakText('${s.name}. ${s.desc}')">
          <span class="gk-visual-icon">${s.icon}</span>
          <h4 class="gk-title">${s.name}</h4>
          <p class="gk-desc">${s.desc}</p>
        </div>
      `).join('');
    }

    const family = [
      { name: 'Mother (امڙ)', icon: '👩', desc: 'Loves and cares for the whole family.' },
      { name: 'Father (بابا)', icon: '👨', desc: 'Guides and supports the family.' },
      { name: 'Brother & Sister', icon: '👧👦', desc: 'Play, share toys, and learn together.' },
      { name: 'Grandparents (ڏاڏو / ڏاڏي)', icon: '👵🧓', desc: 'Tell beautiful bedtime stories.' }
    ];
    const familyGrid = document.getElementById('gkFamilyGrid');
    if (familyGrid) {
      familyGrid.innerHTML = family.map(f => `
        <div class="gk-card" onclick="app.speakText('${f.name}. ${f.desc}')">
          <span class="gk-visual-icon">${f.icon}</span>
          <h4 class="gk-title">${f.name}</h4>
          <p class="gk-desc">${f.desc}</p>
        </div>
      `).join('');
    }

    const safety = [
      { name: 'Red Light (ڳاڙهو)', icon: '🔴', desc: 'STOP! Do not cross the road.' },
      { name: 'Yellow Light (پيلو)', icon: '🟡', desc: 'WAIT and be ready.' },
      { name: 'Green Light (سائو)', icon: '🟢', desc: 'GO! It is safe to move.' },
      { name: 'Zebra Crossing', icon: '🦓', desc: 'Always cross the street at the zebra lines.' }
    ];
    const safetyGrid = document.getElementById('gkSafetyGrid');
    if (safetyGrid) {
      safetyGrid.innerHTML = safety.map(s => `
        <div class="gk-card" onclick="app.speakText('${s.name}. ${s.desc}')">
          <span class="gk-visual-icon">${s.icon}</span>
          <h4 class="gk-title">${s.name}</h4>
          <p class="gk-desc">${s.desc}</p>
        </div>
      `).join('');
    }

    const fruits = [
      { name: 'Mango (انب)', icon: '🥭', desc: 'The sweet king of summer fruits.' },
      { name: 'Apple (صوف)', icon: '🍎', desc: 'An apple a day keeps the doctor away!' },
      { name: 'Banana (ڪيلو)', icon: '🍌', desc: 'Rich in healthy vitamins and energy.' },
      { name: 'Carrot (گاجر)', icon: '🥕', desc: 'Crunchy orange vegetable good for eyes.' }
    ];
    const fruitsGrid = document.getElementById('gkFruitsGrid');
    if (fruitsGrid) {
      fruitsGrid.innerHTML = fruits.map(fr => `
        <div class="gk-card" onclick="app.speakText('${fr.name}. ${fr.desc}')">
          <span class="gk-visual-icon">${fr.icon}</span>
          <h4 class="gk-title">${fr.name}</h4>
          <p class="gk-desc">${fr.desc}</p>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // DYNAMIC MATH GENERATORS (ADDITION & SUBTRACTION)
  // =========================================================================

  initMathGenerators() {
    this.generateAdditionProblem();
    this.generateSubtractionProblem();
  }

  generateAdditionProblem() {
    const n1 = Math.floor(Math.random() * 4) + 1; // 1-4
    const n2 = Math.floor(Math.random() * 4) + 1; // 1-4
    const sum = n1 + n2;

    const visual1 = '🍎 '.repeat(n1);
    const visual2 = '🍎 '.repeat(n2);

    const n1El = document.getElementById('addNum1Visual');
    const n2El = document.getElementById('addNum2Visual');
    const promptEl = document.getElementById('addQuestionPrompt');
    const feedbackEl = document.getElementById('addFeedback');
    const optionsRow = document.getElementById('addOptionsRow');

    if (n1El) n1El.textContent = visual1;
    if (n2El) n2El.textContent = visual2;
    if (promptEl) promptEl.textContent = `Count all the apples! ${n1} + ${n2} = ?`;
    if (feedbackEl) feedbackEl.textContent = '';

    // Generate 3 choices including correct answer
    const choices = new Set([sum]);
    while (choices.size < 4) {
      const wrong = Math.max(1, sum + Math.floor(Math.random() * 5) - 2);
      choices.add(wrong);
    }
    const shuffled = Array.from(choices).sort(() => 0.5 - Math.random());

    if (optionsRow) {
      optionsRow.innerHTML = shuffled.map(ans => `
        <button class="math-opt-btn" onclick="app.checkAdditionAnswer(${ans}, ${sum})">${ans}</button>
      `).join('');
    }
  }

  checkAdditionAnswer(selected, correct) {
    const feedbackEl = document.getElementById('addFeedback');
    if (selected === correct) {
      if (feedbackEl) {
        feedbackEl.textContent = '🎉 Correct! Super job!';
        feedbackEl.style.color = '#16a34a';
      }
      this.speakText('Correct! Great counting!');
      this.addStars(5, 'Addition Sum');
      this.launchConfetti();
    } else {
      if (feedbackEl) {
        feedbackEl.textContent = '🤔 Try counting the apples one more time!';
        feedbackEl.style.color = '#dc2626';
      }
      this.speakText('Let us count the apples again together.');
    }
  }

  generateSubtractionProblem() {
    const n1 = Math.floor(Math.random() * 4) + 3; // 3-6
    const n2 = Math.floor(Math.random() * (n1 - 1)) + 1; // 1 to n1-1
    const diff = n1 - n2;

    const visual1 = '🎈 '.repeat(n1);
    const visual2 = '🎈 '.repeat(n2);

    const n1El = document.getElementById('subNum1Visual');
    const n2El = document.getElementById('subNum2Visual');
    const promptEl = document.getElementById('subQuestionPrompt');
    const feedbackEl = document.getElementById('subFeedback');
    const optionsRow = document.getElementById('subOptionsRow');

    if (n1El) n1El.textContent = visual1;
    if (n2El) n2El.textContent = visual2;
    if (promptEl) promptEl.textContent = `Take away ${n2} balloons! ${n1} - ${n2} = ?`;
    if (feedbackEl) feedbackEl.textContent = '';

    const choices = new Set([diff]);
    while (choices.size < 4) {
      const wrong = Math.max(1, diff + Math.floor(Math.random() * 4) - 1);
      choices.add(wrong);
    }
    const shuffled = Array.from(choices).sort(() => 0.5 - Math.random());

    if (optionsRow) {
      optionsRow.innerHTML = shuffled.map(ans => `
        <button class="math-opt-btn" onclick="app.checkSubtractionAnswer(${ans}, ${diff})">${ans}</button>
      `).join('');
    }
  }

  checkSubtractionAnswer(selected, correct) {
    const feedbackEl = document.getElementById('subFeedback');
    if (selected === correct) {
      if (feedbackEl) {
        feedbackEl.textContent = '🎉 Awesome! That is right!';
        feedbackEl.style.color = '#16a34a';
      }
      this.speakText('Awesome! Correct answer!');
      this.addStars(5, 'Subtraction Sum');
      this.launchConfetti();
    } else {
      if (feedbackEl) {
        feedbackEl.textContent = '🤔 Count remaining balloons carefully!';
        feedbackEl.style.color = '#dc2626';
      }
      this.speakText('Count the remaining balloons again.');
    }
  }

  // =========================================================================
  // 5 MINI-GAMES IMPLEMENTATION
  // =========================================================================

  initGames() {
    this.setupGame1();
    this.setupGame2();
    this.setupGame3();
    this.setupGame4();
    this.setupGame5();
  }

  switchGame(gameNum) {
    this.currentGame = gameNum;
    document.querySelectorAll('.game-pill').forEach((pill, idx) => {
      pill.classList.toggle('active', idx + 1 === gameNum);
    });

    document.querySelectorAll('.game-screen').forEach((screen, idx) => {
      screen.classList.toggle('active', idx + 1 === gameNum);
    });

    this.state.analytics.gamesPlayed++;
    this.saveState();
  }

  // GAME 1: Match Picture & Word
  setupGame1() {
    const wordBank = [
      { id: 'cat', word: 'Cat 🐱', pic: '🐱', name: 'Cat' },
      { id: 'apple', word: 'Apple 🍎', pic: '🍎', name: 'Apple' },
      { id: 'sun', word: 'Sun ☀️', pic: '☀️', name: 'Sun' },
      { id: 'book', word: 'Book 📚', pic: '📚', name: 'Book' }
    ];

    const wordsCol = document.getElementById('game1WordsCol');
    const picsCol = document.getElementById('game1PicsCol');
    if (!wordsCol || !picsCol) return;

    this.game1SelectedWord = null;
    this.game1SelectedPic = null;
    this.game1MatchesCount = 0;

    const shuffledWords = [...wordBank].sort(() => 0.5 - Math.random());
    const shuffledPics = [...wordBank].sort(() => 0.5 - Math.random());

    wordsCol.innerHTML = shuffledWords.map(w => `
      <button class="match-btn word-btn" data-id="${w.id}" onclick="app.onGame1WordClick('${w.id}', this)">
        <span>${w.word}</span>
      </button>
    `).join('');

    picsCol.innerHTML = shuffledPics.map(p => `
      <button class="match-btn pic-btn" data-id="${p.id}" onclick="app.onGame1PicClick('${p.id}', this)">
        <span style="font-size: 2.2rem;">${p.pic}</span>
      </button>
    `).join('');
  }

  onGame1WordClick(id, element) {
    document.querySelectorAll('.word-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    this.game1SelectedWord = { id, element };
    this.checkGame1Pair();
  }

  onGame1PicClick(id, element) {
    document.querySelectorAll('.pic-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    this.game1SelectedPic = { id, element };
    this.checkGame1Pair();
  }

  checkGame1Pair() {
    if (!this.game1SelectedWord || !this.game1SelectedPic) return;

    if (this.game1SelectedWord.id === this.game1SelectedPic.id) {
      this.game1SelectedWord.element.classList.add('matched');
      this.game1SelectedPic.element.classList.add('matched');
      this.game1SelectedWord.element.classList.remove('selected');
      this.game1SelectedPic.element.classList.remove('selected');
      this.speakText('Match found! Great job!');
      this.addStars(5, 'Match Game');
      this.game1MatchesCount++;

      this.game1SelectedWord = null;
      this.game1SelectedPic = null;

      if (this.game1MatchesCount >= 4) {
        this.launchConfetti();
        this.triggerMascotCheer('🎉 Round complete! You matched all pairs!');
      }
    } else {
      this.speakText('Not a match! Try again!');
      setTimeout(() => {
        if (this.game1SelectedWord) this.game1SelectedWord.element.classList.remove('selected');
        if (this.game1SelectedPic) this.game1SelectedPic.element.classList.remove('selected');
        this.game1SelectedWord = null;
        this.game1SelectedPic = null;
      }, 500);
    }
  }

  resetGame1() {
    this.setupGame1();
  }

  // GAME 2: Count Objects
  setupGame2() {
    const emojis = ['🦋', '⭐', '🍎', '🐟', '🚗', '🎈', '🍓', '🌸'];
    const selectedEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const count = Math.floor(Math.random() * 8) + 2; // 2 to 9

    const stage = document.getElementById('game2Stage');
    const options = document.getElementById('game2Options');
    const feedback = document.getElementById('game2Feedback');
    const prompt = document.getElementById('game2Prompt');

    if (feedback) feedback.textContent = '';
    if (prompt) prompt.textContent = `Count how many ${selectedEmoji} you see and choose the right number!`;

    if (stage) {
      stage.innerHTML = Array(count).fill(`<span style="animation: gentleBounce 2s infinite ease-in-out;">${selectedEmoji}</span>`).join(' ');
    }

    const choices = new Set([count]);
    while (choices.size < 4) {
      choices.add(Math.max(1, count + Math.floor(Math.random() * 5) - 2));
    }
    const shuffled = Array.from(choices).sort(() => 0.5 - Math.random());

    if (options) {
      options.innerHTML = shuffled.map(num => `
        <button class="count-choice-btn" onclick="app.checkGame2(${num}, ${count})">${num}</button>
      `).join('');
    }
  }

  checkGame2(selected, correct) {
    const feedback = document.getElementById('game2Feedback');
    if (selected === correct) {
      if (feedback) {
        feedback.textContent = `🎉 Correct! There are ${correct} objects!`;
        feedback.style.color = '#16a34a';
      }
      this.speakText(`Correct! There are ${correct} objects!`);
      this.addStars(5, 'Counting Game');
      this.launchConfetti();
      setTimeout(() => this.setupGame2(), 1500);
    } else {
      if (feedback) {
        feedback.textContent = '🤔 Count again slowly!';
        feedback.style.color = '#dc2626';
      }
      this.speakText('Count again slowly.');
    }
  }

  // GAME 3: Phonics Letter Star
  setupGame3() {
    const items = [
      { word: 'Apple', letter: 'A', visual: '🍎' },
      { word: 'Ball', letter: 'B', visual: '⚽' },
      { word: 'Cat', letter: 'C', visual: '🐱' },
      { word: 'Duck', letter: 'D', visual: '🦆' },
      { word: 'Fish', letter: 'F', visual: '🐟' },
      { word: 'Lion', letter: 'L', visual: '🦁' },
      { word: 'Sun', letter: 'S', visual: '☀️' }
    ];
    const item = items[Math.floor(Math.random() * items.length)];

    const visualEl = document.getElementById('game3Visual');
    const wordEl = document.getElementById('game3Word');
    const promptEl = document.getElementById('game3Prompt');
    const optionsEl = document.getElementById('game3Options');
    const feedbackEl = document.getElementById('game3Feedback');

    if (visualEl) visualEl.textContent = item.visual;
    if (wordEl) wordEl.textContent = `_ ${item.word.slice(1)}`;
    if (promptEl) promptEl.textContent = `Which letter starts "${item.word}"?`;
    if (feedbackEl) feedbackEl.textContent = '';

    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const choices = new Set([item.letter]);
    while (choices.size < 4) {
      choices.add(alpha[Math.floor(Math.random() * alpha.length)]);
    }
    const shuffled = Array.from(choices).sort(() => 0.5 - Math.random());

    if (optionsEl) {
      optionsEl.innerHTML = shuffled.map(l => `
        <button class="letter-choice-btn" onclick="app.checkGame3('${l}', '${item.letter}', '${item.word}')">${l}</button>
      `).join('');
    }
  }

  checkGame3(selected, correct, word) {
    const feedback = document.getElementById('game3Feedback');
    if (selected === correct) {
      if (feedback) {
        feedback.textContent = `🎉 Brilliant! ${correct} is for ${word}!`;
        feedback.style.color = '#16a34a';
      }
      this.speakText(`Brilliant! ${correct} is for ${word}!`);
      this.addStars(5, 'Letter Star Game');
      this.launchConfetti();
      setTimeout(() => this.setupGame3(), 1500);
    } else {
      if (feedback) {
        feedback.textContent = '🤔 Try another letter!';
        feedback.style.color = '#dc2626';
      }
      this.speakText('Try another letter.');
    }
  }

  // GAME 4: Shape Detective
  setupGame4() {
    const shapesBank = [
      { name: 'Triangle', icon: '🔺' },
      { name: 'Circle', icon: '⚪' },
      { name: 'Square', icon: '⬛' },
      { name: 'Star', icon: '⭐' }
    ];

    const target = shapesBank[Math.floor(Math.random() * shapesBank.length)];
    const targetNameEl = document.getElementById('game4TargetName');
    const choicesEl = document.getElementById('game4Choices');
    const feedbackEl = document.getElementById('game4Feedback');

    if (targetNameEl) targetNameEl.textContent = `${target.name} ${target.icon}`;
    if (feedbackEl) feedbackEl.textContent = '';

    const shuffled = [...shapesBank].sort(() => 0.5 - Math.random());

    if (choicesEl) {
      choicesEl.innerHTML = shuffled.map(s => `
        <button class="shape-detective-btn" onclick="app.checkGame4('${s.name}', '${target.name}')">
          <span class="shape-icon">${s.icon}</span>
          <span class="shape-name">${s.name}</span>
        </button>
      `).join('');
    }
  }

  checkGame4(selected, target) {
    const feedback = document.getElementById('game4Feedback');
    if (selected === target) {
      if (feedback) {
        feedback.textContent = `🎉 Detective Success! You found the ${target}!`;
        feedback.style.color = '#16a34a';
      }
      this.speakText(`Great detective work! You found the ${target}!`);
      this.addStars(5, 'Shape Detective');
      this.launchConfetti();
      setTimeout(() => this.setupGame4(), 1500);
    } else {
      if (feedback) {
        feedback.textContent = '🤔 Not that shape. Look again!';
        feedback.style.color = '#dc2626';
      }
      this.speakText('Not that shape. Look closely.');
    }
  }

  // GAME 5: Color Catcher
  setupGame5() {
    const colorBank = [
      { name: 'Yellow', color: '#facc15', label: '🟡' },
      { name: 'Sky Blue', color: '#38bdf8', label: '🔵' },
      { name: 'Bright Green', color: '#22c55e', label: '🟢' },
      { name: 'Pink', color: '#f472b6', label: '🌸' },
      { name: 'Orange', color: '#fb923c', label: '🟠' },
      { name: 'Purple', color: '#a855f7', label: '🟣' }
    ];

    const target = colorBank[Math.floor(Math.random() * colorBank.length)];
    const targetEl = document.getElementById('game5TargetColorName');
    const balloonsEl = document.getElementById('game5Balloons');
    const feedbackEl = document.getElementById('game5Feedback');

    if (targetEl) targetEl.textContent = `${target.name} ${target.label}`;
    if (feedbackEl) feedbackEl.textContent = '';

    const shuffled = [...colorBank].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffled.some(c => c.name === target.name)) {
      shuffled[0] = target;
    }
    shuffled.sort(() => 0.5 - Math.random());

    if (balloonsEl) {
      balloonsEl.innerHTML = shuffled.map(c => `
        <button class="color-balloon-btn" style="background: ${c.color};" onclick="app.checkGame5('${c.name}', '${target.name}')">
          <span>${c.name}</span>
        </button>
      `).join('');
    }
  }

  checkGame5(selected, target) {
    const feedback = document.getElementById('game5Feedback');
    if (selected === target) {
      if (feedback) {
        feedback.textContent = `🎉 Super! You caught the ${target} balloon!`;
        feedback.style.color = '#16a34a';
      }
      this.speakText(`Awesome! That is the ${target} balloon!`);
      this.addStars(5, 'Color Catcher');
      this.launchConfetti();
      setTimeout(() => this.setupGame5(), 1500);
    } else {
      if (feedback) {
        feedback.textContent = '🤔 Try finding the matching color balloon!';
        feedback.style.color = '#dc2626';
      }
      this.speakText('Try finding the matching color.');
    }
  }

  // =========================================================================
  // MEGA 20-QUESTION SINDH BOARD GRADE 1 QUIZ
  // =========================================================================

  initQuiz() {
    this.quizQuestions = [
      // English (Questions 1-4)
      {
        subject: 'English',
        visual: '🍎',
        question: 'Which letter does "Apple" start with?',
        options: ['Letter A', 'Letter B', 'Letter C', 'Letter D'],
        answer: 0,
        explanation: 'A is for Apple 🍎!'
      },
      {
        subject: 'English',
        visual: '🐱',
        question: 'Complete the 3-letter word: C _ T',
        options: ['O', 'A', 'E', 'U'],
        answer: 1,
        explanation: 'C-A-T makes Cat 🐱!'
      },
      {
        subject: 'English',
        visual: '🦁',
        question: 'Which of these is a wild jungle animal?',
        options: ['Lion 🦁', 'Cat 🐱', 'Cow 🐄', 'Sheep 🐑'],
        answer: 0,
        explanation: 'The Lion is the king of the jungle!'
      },
      {
        subject: 'English',
        visual: '☀️',
        question: 'What gives us bright light and warmth during the day?',
        options: ['The Moon 🌙', 'The Sun ☀️', 'The Stars ⭐', 'The Clouds ☁️'],
        answer: 1,
        explanation: 'The Sun shines bright during the day!'
      },

      // Sindhi (Questions 5-8)
      {
        subject: 'Sindhi',
        visual: '🐪',
        question: 'سنڌي الف-بي ۾ "اٺ" (Camel) ڪهڙي اکر سان شروع ٿئي ٿو؟',
        options: ['الف (ا)', 'ٻي (ب)', 'گل (گ)', 'ميم (م)'],
        answer: 0,
        explanation: 'ا سان اٺ 🐪!'
      },
      {
        subject: 'Sindhi',
        visual: '🐱',
        question: 'هن تصوير کي سنڌيءَ ۾ ڇا چئبو آهي؟',
        options: ['ٻلي (Cat)', 'ڪتو (Dog)', 'طوطو (Parrot)', 'گهوڙو (Horse)'],
        answer: 0,
        explanation: 'هي ٻلي (Cat) آهي 🐱!'
      },
      {
        subject: 'Sindhi',
        visual: '🌸',
        question: '"گل" (Flower) جو پهريون اکر ڪهڙو آهي؟',
        options: ['گ', 'ب', 'ڪ', 'د'],
        answer: 0,
        explanation: 'گ سان گل 🌸!'
      },
      {
        subject: 'Sindhi',
        visual: '📚',
        question: 'اسڪول ۾ اسين ڇا پڙهندا آهيون؟',
        options: ['ڪتاب (Book)', 'پٿر (Stone)', 'مٽي (Sand)', 'ڪاٺي (Stick)'],
        answer: 0,
        explanation: 'اسين ڪتاب پڙهندا آهيون 📚!'
      },

      // Mathematics (Questions 9-12)
      {
        subject: 'Mathematics',
        visual: '🍎🍎 + 🍎🍎🍎',
        question: 'Count the sum: 2 + 3 = ?',
        options: ['4', '5', '6', '7'],
        answer: 1,
        explanation: '2 plus 3 equals 5!'
      },
      {
        subject: 'Mathematics',
        visual: '🎈🎈🎈🎈🎈 - 🎈🎈',
        question: 'Solve the subtraction: 5 - 2 = ?',
        options: ['2', '3', '4', '1'],
        answer: 1,
        explanation: '5 minus 2 leaves 3 balloons!'
      },
      {
        subject: 'Mathematics',
        visual: '🔺',
        question: 'How many sides does a Triangle have?',
        options: ['2 sides', '3 sides', '4 sides', '0 sides'],
        answer: 1,
        explanation: 'A triangle always has 3 sides and 3 corners!'
      },
      {
        subject: 'Mathematics',
        visual: '🔢',
        question: 'Which number is Greater: 8 or 4?',
        options: ['8 is greater', '4 is greater', 'Both are equal', 'None'],
        answer: 0,
        explanation: '8 is bigger and greater than 4!'
      },

      // Science (Questions 13-16)
      {
        subject: 'Science',
        visual: '👀',
        question: 'Which body sense do we use to see colors and books?',
        options: ['Our Eyes 👀', 'Our Ears 👂', 'Our Nose 👃', 'Our Hands ✋'],
        answer: 0,
        explanation: 'We see the world using our Eyes!'
      },
      {
        subject: 'Science',
        visual: '🌱',
        question: 'Which part of the plant drinks water from the soil?',
        options: ['Roots (پاڙون)', 'Flower (گل)', 'Fruit (ميوو)', 'Stem (ٿڙ)'],
        answer: 0,
        explanation: 'Roots absorb water and nutrients from the soil!'
      },
      {
        subject: 'Science',
        visual: '🐄',
        question: 'Which animal lives on a farm and gives healthy milk?',
        options: ['Cow 🐄', 'Lion 🦁', 'Snake 🐍', 'Eagle 🦅'],
        answer: 0,
        explanation: 'Cows give us fresh healthy milk!'
      },
      {
        subject: 'Science',
        visual: '🧼',
        question: 'What should you use to wash hands and stay healthy?',
        options: ['Soap and clean water 🧼', 'Only sand', 'Juice', 'Paint'],
        answer: 0,
        explanation: 'Soap and clean water remove germs!'
      },

      // General Knowledge (Questions 17-20)
      {
        subject: 'General Knowledge',
        visual: '👩‍🏫',
        question: 'Who helps you learn, read, and write in the classroom?',
        options: ['Teacher 👩‍🏫', 'Pilot ✈️', 'Chef 🍳', 'Firefighter 👨‍🚒'],
        answer: 0,
        explanation: 'Our Teacher teaches us in school!'
      },
      {
        subject: 'General Knowledge',
        visual: '🚦',
        question: 'What does the RED traffic light mean?',
        options: ['STOP! 🔴', 'GO fast! 🟢', 'Dance 💃', 'Sleep 😴'],
        answer: 0,
        explanation: 'Red light means STOP!'
      },
      {
        subject: 'General Knowledge',
        visual: '🥭',
        question: 'Which sweet fruit is known as the King of Summer in Pakistan?',
        options: ['Mango 🥭', 'Lemon 🍋', 'Onion 🧅', 'Chili 🌶️'],
        answer: 0,
        explanation: 'The sweet Sindhri Mango is the King of Fruits!'
      },
      {
        subject: 'General Knowledge',
        visual: '📅',
        question: 'How many days are there in a week?',
        options: ['5 Days', '7 Days', '10 Days', '12 Days'],
        answer: 1,
        explanation: 'There are 7 days in a week (Monday to Sunday)!'
      }
    ];

    const readBtn = document.getElementById('quizReadQuestionBtn');
    if (readBtn) {
      readBtn.addEventListener('click', () => {
        const q = this.quizQuestions[this.quizIndex];
        this.speakText(q.question);
      });
    }

    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const q = this.quizQuestions[this.quizIndex];
    if (!q) return;

    this.quizAnswered = false;

    const stepBadge = document.getElementById('quizStepBadge');
    const subjTag = document.getElementById('quizSubjectTag');
    const liveScore = document.getElementById('quizLiveScore');
    const progressLine = document.getElementById('quizProgressLine');
    const qVisual = document.getElementById('quizQuestionVisual');
    const qText = document.getElementById('quizQuestionText');
    const optionsGrid = document.getElementById('quizOptionsGrid');
    const feedbackBanner = document.getElementById('quizFeedbackBanner');
    const nextBtn = document.getElementById('quizNextBtn');

    if (stepBadge) stepBadge.textContent = `Question ${this.quizIndex + 1} of ${this.quizQuestions.length}`;
    if (subjTag) subjTag.textContent = q.subject;
    if (liveScore) liveScore.textContent = this.quizScore;
    if (progressLine) {
      const pct = Math.round(((this.quizIndex + 1) / this.quizQuestions.length) * 100);
      progressLine.style.width = `${pct}%`;
    }
    if (qVisual) qVisual.textContent = q.visual;
    if (qText) qText.textContent = q.question;
    if (feedbackBanner) feedbackBanner.classList.add('hidden');
    if (nextBtn) nextBtn.disabled = true;

    if (optionsGrid) {
      optionsGrid.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-opt-btn" onclick="app.selectQuizOption(${i}, this)">
          <span>${opt}</span>
        </button>
      `).join('');
    }
  }

  selectQuizOption(selectedIndex, buttonEl) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;

    const q = this.quizQuestions[this.quizIndex];
    const isCorrect = selectedIndex === q.answer;
    const allOptionButtons = document.querySelectorAll('.quiz-opt-btn');

    this.state.analytics.questionsAttempted++;

    if (isCorrect) {
      this.quizScore++;
      this.state.analytics.correctAnswers++;
      this.addStars(5, 'Quiz Correct Answer');
      buttonEl.classList.add('correct');
      this.showQuizFeedback(true, `🎉 Correct! ${q.explanation}`);
      this.speakText(`Correct! ${q.explanation}`);
      this.launchConfetti();
    } else {
      buttonEl.classList.add('wrong');
      allOptionButtons[q.answer].classList.add('correct');
      this.showQuizFeedback(false, `💡 Nice try! Correct answer was: ${q.options[q.answer]}`);
      this.speakText(`The correct answer is ${q.options[q.answer]}`);
    }

    allOptionButtons.forEach(btn => btn.disabled = true);

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) nextBtn.disabled = false;

    this.saveState();
  }

  showQuizFeedback(isCorrect, message) {
    const banner = document.getElementById('quizFeedbackBanner');
    const icon = document.getElementById('feedbackIcon');
    const text = document.getElementById('feedbackText');

    if (!banner || !icon || !text) return;

    banner.className = `quiz-feedback-banner ${isCorrect ? 'correct-banner' : 'wrong-banner'}`;
    icon.textContent = isCorrect ? '🎉' : '💡';
    text.textContent = message;
    banner.classList.remove('hidden');
  }

  nextQuizQuestion() {
    if (this.quizIndex < this.quizQuestions.length - 1) {
      this.quizIndex++;
      this.renderQuizQuestion();
    } else {
      this.completeQuiz();
    }
  }

  completeQuiz() {
    const activeView = document.getElementById('quizActiveView');
    const resultView = document.getElementById('quizResultView');

    if (activeView) activeView.classList.add('hidden');
    if (resultView) resultView.classList.remove('hidden');

    const scoreEl = document.getElementById('resultScore');
    const starsEl = document.getElementById('resultStars');
    const percentEl = document.getElementById('resultPercent');

    const total = this.quizQuestions.length;
    const accuracy = Math.round((this.quizScore / total) * 100);
    const earnedStars = this.quizScore * 5 + 20;

    this.addStars(20, 'Quiz Completion Bonus');
    this.state.analytics.quizzesCompleted++;

    if (scoreEl) scoreEl.textContent = `${this.quizScore} / ${total}`;
    if (starsEl) starsEl.textContent = `+${earnedStars} ⭐`;
    if (percentEl) percentEl.textContent = `${accuracy}%`;

    this.unlockBadge('badge_first_quiz');
    if (accuracy >= 80) {
      this.unlockBadge('badge_quiz_master');
    }

    this.launchConfetti();
    this.speakText(`Congratulations! You completed the Grade 1 quiz with ${accuracy} percent accuracy!`);
    this.saveState();
  }

  restartQuiz() {
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    const activeView = document.getElementById('quizActiveView');
    const resultView = document.getElementById('quizResultView');

    if (activeView) activeView.classList.remove('hidden');
    if (resultView) resultView.classList.add('hidden');

    this.renderQuizQuestion();
  }

  // =========================================================================
  // REWARDS & BADGES SYSTEM
  // =========================================================================

  updateBadgesView() {
    const badgesData = [
      { id: 'badge_welcome', name: 'Welcome Starter', icon: '🌟', desc: 'Started your Grade 1 journey on EduNexa AI' },
      { id: 'badge_first_quiz', name: 'Quiz Champion', icon: '🏆', desc: 'Completed the 20-Question Mega Quiz' },
      { id: 'badge_math_star', name: 'Math Star', icon: '🔢', desc: 'Practiced counting and sums in math lab' },
      { id: 'badge_reading_hero', name: 'Reading Hero', icon: '📖', desc: 'Mastered English phonics & alphabet words' },
      { id: 'badge_sindhi_champ', name: 'Sindhi Champion', icon: '🪶', desc: 'Learned Sindhi alphabet letters & picture words' },
      { id: 'badge_science_jr', name: 'Junior Scientist', icon: '🔬', desc: 'Explored living things & 5 senses' },
      { id: 'badge_super_learner', name: 'Super Learner', icon: '🎖️', desc: 'Completed all 4 daily learning plan tasks' },
      { id: 'badge_quiz_master', name: 'Quiz Master (80%+)', icon: '👑', desc: 'Scored 80% or higher on the Mega Quiz' }
    ];

    const badgesGrid = document.getElementById('badgesGrid');
    const badgeCountEl = document.getElementById('unlockedBadgesCount');

    if (badgeCountEl) {
      badgeCountEl.textContent = `${this.state.unlockedBadges.length} / ${badgesData.length}`;
    }

    if (badgesGrid) {
      badgesGrid.innerHTML = badgesData.map(b => {
        const isUnlocked = this.state.unlockedBadges.includes(b.id);
        return `
          <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}" onclick="app.onBadgeClick('${b.name}', '${b.desc}', ${isUnlocked})">
            <span class="badge-medal-icon">${b.icon}</span>
            <h4 class="badge-name">${b.name}</h4>
            <p class="badge-desc">${b.desc}</p>
            <span class="badge-status-tag">${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}</span>
          </div>
        `;
      }).join('');
    }
  }

  unlockBadge(badgeId) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      this.saveState();
      this.launchConfetti();
      this.showFloatingStarToast('🏆 New Badge Unlocked!');
    }
  }

  checkBadgeUnlocks() {
    if (this.state.stars >= 50) this.unlockBadge('badge_math_star');
    if (this.state.stars >= 80) this.unlockBadge('badge_reading_hero');
    if (this.state.stars >= 100) this.unlockBadge('badge_sindhi_champ');
    if (this.state.stars >= 120) this.unlockBadge('badge_science_jr');
  }

  onBadgeClick(name, desc, isUnlocked) {
    if (isUnlocked) {
      this.speakText(`Badge: ${name}! ${desc}`);
      this.showFloatingStarToast(`🏆 ${name}: ${desc}`);
    } else {
      this.speakText(`Keep practicing to unlock the ${name} badge!`);
    }
  }

  // =========================================================================
  // PARENT PROGRESS DASHBOARD
  // =========================================================================

  updateParentDashboard() {
    const engPct = document.getElementById('parentEngPct');
    const sindhiPct = document.getElementById('parentSindhiPct');
    const mathPct = document.getElementById('parentMathPct');
    const sciencePct = document.getElementById('parentSciencePct');
    const gkPct = document.getElementById('parentGKPct');

    const engBar = document.getElementById('parentEngBar');
    const sindhiBar = document.getElementById('parentSindhiBar');
    const mathBar = document.getElementById('parentMathBar');
    const scienceBar = document.getElementById('parentScienceBar');
    const gkBar = document.getElementById('parentGKBar');

    const m = this.state.subjectMastery;
    if (engPct) engPct.textContent = `${m.english}%`;
    if (sindhiPct) sindhiPct.textContent = `${m.sindhi}%`;
    if (mathPct) mathPct.textContent = `${m.math}%`;
    if (sciencePct) sciencePct.textContent = `${m.science}%`;
    if (gkPct) gkPct.textContent = `${m.gk}%`;

    if (engBar) engBar.style.width = `${m.english}%`;
    if (sindhiBar) sindhiBar.style.width = `${m.sindhi}%`;
    if (mathBar) mathBar.style.width = `${m.math}%`;
    if (scienceBar) scienceBar.style.width = `${m.science}%`;
    if (gkBar) gkBar.style.width = `${m.gk}%`;

    const overall = Math.round((m.english + m.sindhi + m.math + m.science + m.gk) / 5);
    const overallEl = document.getElementById('parentOverallPercent');
    if (overallEl) overallEl.textContent = `${overall}%`;

    // Analytics numbers
    const qAttempted = document.getElementById('parentQuestionsAttempted');
    const qCorrect = document.getElementById('parentCorrectAnswers');
    const avgScore = document.getElementById('parentAverageScore');
    const gamesPlayed = document.getElementById('parentGamesPlayed');

    const a = this.state.analytics;
    if (qAttempted) qAttempted.textContent = a.questionsAttempted;
    if (qCorrect) qCorrect.textContent = a.correctAnswers;
    if (gamesPlayed) gamesPlayed.textContent = a.gamesPlayed;

    const avg = a.questionsAttempted > 0 ? Math.round((a.correctAnswers / a.questionsAttempted) * 100) : 0;
    if (avgScore) avgScore.textContent = `${avg}%`;
  }

  confirmResetProgress() {
    if (window.confirm('Are you sure you want to reset student progress data for a fresh practice session?')) {
      this.state = this.getDefaultState();
      this.saveState();
      this.init();
      alert('Progress data reset successfully!');
    }
  }

  // =========================================================================
  // SEARCH FILTERING
  // =========================================================================

  setupSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (clearBtn) clearBtn.classList.toggle('hidden', term === '');

      if (term === '') {
        document.querySelectorAll('.subject-card, .letter-card, .shape-card, .science-card, .gk-card').forEach(el => {
          el.style.display = '';
        });
        return;
      }

      // Filter elements
      document.querySelectorAll('.subject-card, .letter-card, .shape-card, .science-card, .gk-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        document.querySelectorAll('.subject-card, .letter-card, .shape-card, .science-card, .gk-card').forEach(el => {
          el.style.display = '';
        });
      });
    }
  }

  // =========================================================================
  // MASCOT & MOTIVATIONAL BANNER
  // =========================================================================

  setupMascotInteractions() {
    const heroChar = document.getElementById('heroCharacterInteractive');
    if (heroChar) {
      heroChar.addEventListener('click', () => {
        this.triggerMascotCheer("Hooray! You're the smartest Grade 1 student in Sindh!");
        this.launchConfetti();
      });
    }

    // Auto rotate motivational quotes every 15 seconds
    setInterval(() => this.rotateMotivationQuote(), 15000);
  }

  rotateMotivationQuote() {
    const quotes = [
      { text: '"Every day is a new chance to learn something amazing!"', icon: '🌟' },
      { text: '"You are becoming a super smart Grade 1 learner!"', icon: '🚀' },
      { text: '"Keep reading and exploring your Sindh Board books!"', icon: '📚' },
      { text: '"Let\'s count and solve another fun math question!"', icon: '🔢' },
      { text: '"سنڌي سکو ۽ خوش رهو! (Learn Sindhi and stay joyful!)"', icon: '🪶' },
      { text: '"Amazing work! Keep earning stars every day!"', icon: '🎉' }
    ];

    const random = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteEl = document.getElementById('motivationQuote');
    const iconEl = document.getElementById('motivationIcon');

    if (quoteEl) quoteEl.textContent = random.text;
    if (iconEl) iconEl.textContent = random.icon;
  }

  onMascotClick() {
    const greetings = [
      "Great job! Let's learn something new today! 🌟",
      "Can you solve the 20-Question Quiz? 🧠",
      "Wow! You are collecting so many golden stars! ⭐",
      "Keep practicing your Sindhi and English alphabet! 📖"
    ];
    const cheer = greetings[Math.floor(Math.random() * greetings.length)];
    this.triggerMascotCheer(cheer);
  }

  triggerMascotCheer(message) {
    const bubble = document.getElementById('mascotSpeechText');
    const heroBubble = document.getElementById('heroSpeechBubble');

    if (bubble) bubble.textContent = message;
    if (heroBubble) heroBubble.querySelector('span').textContent = message;

    this.speakText(message);
  }

  // =========================================================================
  // TOAST NOTIFICATIONS & CONFETTI ENGINE
  // =========================================================================

  showFloatingStarToast(text) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.right = '24px';
    toast.style.background = '#fef08a';
    toast.style.color = '#854d0e';
    toast.style.border = '2px solid #facc15';
    toast.style.padding = '8px 16px';
    toast.style.borderRadius = '9999px';
    toast.style.fontWeight = '900';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
    toast.style.zIndex = '1000';
    toast.style.transition = 'all 0.4s ease';
    toast.textContent = text;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transform = 'translateY(-20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 2000);
  }

  setupConfetti() {
    this.confettiCanvas = document.getElementById('confettiCanvas');
    if (this.confettiCanvas) {
      this.confettiCtx = this.confettiCanvas.getContext('2d');
      this.resizeConfettiCanvas();
      window.addEventListener('resize', () => this.resizeConfettiCanvas());
    }
  }

  resizeConfettiCanvas() {
    if (!this.confettiCanvas) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  launchConfetti() {
    if (!this.confettiCtx) return;

    this.confettiParticles = [];
    const colors = ['#f472b6', '#38bdf8', '#22c55e', '#facc15', '#a855f7', '#fb923c'];

    for (let i = 0; i < 70; i++) {
      this.confettiParticles.push({
        x: Math.random() * window.innerWidth,
        y: -10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    if (!this.confettiAnimationId) {
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx || this.confettiParticles.length === 0) {
      this.confettiCtx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.confettiAnimationId = null;
      return;
    }

    this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      this.confettiCtx.save();
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.confettiCtx.restore();

      if (p.y > window.innerHeight) {
        this.confettiParticles.splice(i, 1);
      }
    }

    this.confettiAnimationId = requestAnimationFrame(() => this.animateConfetti());
  }

  // =========================================================================
  // WORKSHEET GUIDE MODAL
  // =========================================================================

  showWorksheetGuideModal() {
    const modal = document.getElementById('worksheetModalOverlay');
    if (modal) modal.classList.remove('hidden');
  }

  closeWorksheetGuideModal() {
    const modal = document.getElementById('worksheetModalOverlay');
    if (modal) modal.classList.add('hidden');
  }
}

// Global App Instance
window.app = new EduNexaApp();
