/**
 * EduNexa AI — Grade 2 Learning Hub JavaScript
 * File: grade2.js
 * Comprehensive interactive engine for Grade 2 Sindh Board Classroom
 */

/* ==========================================================================
   1. GLOBAL STATE & LOCAL STORAGE PERSISTENCE
   ========================================================================== */
const STORAGE_KEY = 'studymate_grade2_data';

let appState = {
  stars: 12,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  rank: 'Explorer ⭐',
  dailyTasks: {
    task_english: false,
    task_math: false,
    task_sindhi: false,
    task_science: false,
    task_game: false
  },
  subjectMastery: {
    english: 20,
    sindhi: 15,
    math: 25,
    science: 10,
    gk: 30
  },
  badges: {
    badge_first_quiz: true,
    badge_math_star: true,
    badge_reading_star: true,
    badge_sindhi_scholar: false,
    badge_science_explorer: false,
    badge_vocab_builder: false,
    badge_10_activities: false,
    badge_5_streak: false
  },
  quizHistory: {
    attempts: 1,
    lastScore: 23,
    bestScore: 23,
    totalQuestionsSolved: 35
  },
  soundEnabled: true
};

// Load saved progress from localStorage
function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
    }
    checkLearningStreak();
  } catch (e) {
    console.warn('LocalStorage error or unavailable:', e);
  }
}

// Save progress to localStorage
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn('Could not save to LocalStorage:', e);
  }
  updateGlobalUI();
}

// Calculate and update learning streak
function checkLearningStreak() {
  const today = new Date().toISOString().split('T')[0];
  if (appState.lastActiveDate !== today) {
    const lastDate = new Date(appState.lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      appState.streak += 1;
      if (appState.streak >= 5) {
        unlockBadge('badge_5_streak');
      }
    } else if (diffDays > 1) {
      appState.streak = 1;
    }
    appState.lastActiveDate = today;
    // Reset daily tasks on a new calendar day
    appState.dailyTasks = {
      task_english: false,
      task_math: false,
      task_sindhi: false,
      task_science: false,
      task_game: false
    };
    saveState();
  }
}

function addStars(amount) {
  appState.stars += amount;
  saveState();
  playAudioChime('star');
  showConfetti(25);
}

function unlockBadge(badgeId) {
  if (appState.badges[badgeId] !== undefined) {
    appState.badges[badgeId] = true;
    saveState();
    const badgeEl = document.getElementById(badgeId);
    if (badgeEl) {
      const iconWrap = badgeEl.querySelector('.badge-icon-wrap');
      const tag = badgeEl.querySelector('.badge-status-tag');
      if (iconWrap) iconWrap.classList.add('unlocked');
      if (tag) {
        tag.className = 'badge-status-tag tag-unlocked';
        tag.textContent = '✓ Unlocked';
      }
    }
  }
}

/* ==========================================================================
   2. AUDIO SYNTHESIZER & SPEECH SYNTHESIS (TTS)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Gentle pleasant synthesised sound effects
function playAudioChime(type = 'success') {
  if (!appState.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success' || type === 'star') {
      // Cheerful major chord arpeggio
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'retry') {
      // Soft gentle bonk tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'click') {
      // Subtle click feedback
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Audio unsupported
  }
}

// Web Speech API for Read Aloud
function speakText(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) {
    alert('Read Aloud is not supported in this browser. Please read along with the text on screen! 😊');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85; // Slightly slower, clear for Grade 2
  utterance.pitch = 1.1; // Cheerful friendly pitch
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   3. DAILY MOTIVATIONAL BANNER
   ========================================================================== */
const motivationalMessages = [
  "Welcome, superstar learner! Every question makes you smarter today! 🚀",
  "You're doing great! Keep exploring and collecting stars! 🌟",
  "Learning is fun! Let's discover something wonderful together! 📚",
  "You're becoming a Math and Reading Champion! ⭐",
  "سنڌي سکڻ ڏاڍو سولو، مٺو ۽ سٺو آهي! 🪶",
  "Take your time, think happily, and try your best! 🧠"
];

let motivateIdx = 0;
function initMotivationalBanner() {
  const textEl = document.getElementById('dailyMotivationText');
  if (!textEl) return;
  setInterval(() => {
    motivateIdx = (motivateIdx + 1) % motivationalMessages.length;
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = `"${motivationalMessages[motivateIdx]}"`;
      textEl.style.opacity = '1';
    }, 300);
  }, 6000);
}

/* ==========================================================================
   4. UI SYNC & DASHBOARD UPDATES
   ========================================================================== */
function updateGlobalUI() {
  // Update header badges
  const streakCount = document.getElementById('streakCount');
  const totalStarsCount = document.getElementById('totalStarsCount');
  if (streakCount) streakCount.textContent = appState.streak;
  if (totalStarsCount) totalStarsCount.textContent = appState.stars;

  // Calculate overall progress percentage
  const totalProg = Math.round(
    (appState.subjectMastery.english +
      appState.subjectMastery.sindhi +
      appState.subjectMastery.math +
      appState.subjectMastery.science +
      appState.subjectMastery.gk) / 5
  );

  const overallProgDisplay = document.getElementById('overallProgressDisplay');
  if (overallProgDisplay) overallProgDisplay.textContent = `${totalProg}%`;

  // Update subject cards progress
  const setProg = (txtId, barId, val) => {
    const txt = document.getElementById(txtId);
    const bar = document.getElementById(barId);
    if (txt) txt.textContent = `${val}%`;
    if (bar) bar.style.width = `${val}%`;
  };

  setProg('progTxtEnglish', 'progBarEnglish', appState.subjectMastery.english);
  setProg('progTxtSindhi', 'progBarSindhi', appState.subjectMastery.sindhi);
  setProg('progTxtMath', 'progBarMath', appState.subjectMastery.math);
  setProg('progTxtScience', 'progBarScience', appState.subjectMastery.science);
  setProg('progTxtGK', 'progBarGK', appState.subjectMastery.gk);

  // Update Daily Plan UI
  let completedTasks = 0;
  const tasks = ['task_english', 'task_math', 'task_sindhi', 'task_science', 'task_game'];
  tasks.forEach(taskId => {
    const el = document.querySelector(`[data-task-id="${taskId}"]`);
    if (el) {
      if (appState.dailyTasks[taskId]) {
        el.classList.add('completed');
        const btn = el.querySelector('.task-btn-complete');
        if (btn) btn.textContent = '✓ Done!';
        completedTasks++;
      } else {
        el.classList.remove('completed');
        const btn = el.querySelector('.task-btn-complete');
        if (btn) btn.textContent = '✓ Complete';
      }
    }
  });

  const dailyFill = document.getElementById('dailyProgressFill');
  const dailyPct = document.getElementById('dailyProgressPct');
  const planStatus = document.getElementById('planCompletionStatus');
  const pctVal = Math.round((completedTasks / tasks.length) * 100);

  if (dailyFill) dailyFill.style.width = `${pctVal}%`;
  if (dailyPct) dailyPct.textContent = `${pctVal}%`;
  if (planStatus) planStatus.textContent = `${completedTasks} of ${tasks.length} Activities Completed`;

  // Update Parent Panel Dashboard
  const parentStars = document.getElementById('parentTotalStars');
  const parentStreak = document.getElementById('parentStreak');
  const parentQuizAvg = document.getElementById('parentQuizAvg');
  const parentBadges = document.getElementById('parentBadgesCount');

  if (parentStars) parentStars.textContent = appState.stars;
  if (parentStreak) parentStreak.textContent = `${appState.streak} Day${appState.streak > 1 ? 's' : ''}`;
  if (parentQuizAvg) parentQuizAvg.textContent = `${Math.round((appState.quizHistory.bestScore / 25) * 100)}%`;

  let unlockedCount = 0;
  Object.values(appState.badges).forEach(val => { if (val) unlockedCount++; });
  if (parentBadges) parentBadges.textContent = `${unlockedCount} / 8`;

  // Parent Subject Bars
  const setParentBar = (txtId, barId, val) => {
    const txt = document.getElementById(txtId);
    const bar = document.getElementById(barId);
    if (txt) txt.textContent = `${val}%`;
    if (bar) bar.style.width = `${val}%`;
  };

  setParentBar('parentEngPct', 'pBarEng', appState.subjectMastery.english);
  setParentBar('parentSindhiPct', 'pBarSindhi', appState.subjectMastery.sindhi);
  setParentBar('parentMathPct', 'pBarMath', appState.subjectMastery.math);
  setParentBar('parentSciPct', 'pBarSci', appState.subjectMastery.science);
  setParentBar('parentGKPct', 'pBarGK', appState.subjectMastery.gk);
}

function toggleDailyTask(taskId) {
  appState.dailyTasks[taskId] = !appState.dailyTasks[taskId];
  if (appState.dailyTasks[taskId]) {
    addStars(2);
  }
  saveState();
}

function resetChildProgress() {
  if (confirm("Reset learning progress stats for a fresh start?")) {
    localStorage.removeItem(STORAGE_KEY);
    appState.stars = 0;
    appState.streak = 1;
    appState.subjectMastery = { english: 0, sindhi: 0, math: 0, science: 0, gk: 0 };
    appState.dailyTasks = { task_english: false, task_math: false, task_sindhi: false, task_science: false, task_game: false };
    saveState();
    location.reload();
  }
}

/* ==========================================================================
   5. ENGLISH LEARNING ACTIVITIES
   ========================================================================== */
const sentencePuzzles = [
  {
    words: ['happy', 'Ali', 'is', 'today.'],
    correct: 'Ali is happy today.',
    prompt: 'Make the sentence: Ali is happy today.'
  },
  {
    words: ['The', 'cat', 'drinks', 'warm', 'milk.'],
    correct: 'The cat drinks warm milk.',
    prompt: 'Make the sentence: The cat drinks warm milk.'
  },
  {
    words: ['Birds', 'fly', 'high', 'in', 'the', 'sky.'],
    correct: 'Birds fly high in the sky.',
    prompt: 'Make the sentence: Birds fly high in the sky.'
  },
  {
    words: ['We', 'love', 'reading', 'colorful', 'books.'],
    correct: 'We love reading colorful books.',
    prompt: 'Make the sentence: We love reading colorful books.'
  }
];

let currentSentenceIdx = 0;
let userPlacedWords = [];

function initSentenceBuilder() {
  userPlacedWords = [];
  const puzzle = sentencePuzzles[currentSentenceIdx];
  const indexEl = document.getElementById('engSentenceIndex');
  if (indexEl) indexEl.textContent = currentSentenceIdx + 1;

  const dropZone = document.getElementById('sentenceDropZone');
  const wordBank = document.getElementById('sentenceWordBank');
  const feedback = document.getElementById('sentenceFeedback');
  const nextBtn = document.getElementById('btnNextSentence');

  if (feedback) feedback.textContent = '';
  if (nextBtn) nextBtn.style.display = 'none';

  if (dropZone) {
    dropZone.innerHTML = '<span class="placeholder-text" id="sentenceDropPlaceholder">Click the word tiles below in the right order...</span>';
  }

  if (wordBank) {
    wordBank.innerHTML = '';
    // Shuffle words
    const shuffled = [...puzzle.words].sort(() => Math.random() - 0.5);
    shuffled.forEach((word) => {
      const btn = document.createElement('button');
      btn.className = 'word-tile';
      btn.textContent = word;
      btn.onclick = () => handleWordClick(word, btn);
      wordBank.appendChild(btn);
    });
  }
}

function handleWordClick(word, btnEl) {
  playAudioChime('click');
  userPlacedWords.push(word);
  btnEl.style.display = 'none';

  const dropZone = document.getElementById('sentenceDropZone');
  const placeholder = document.getElementById('sentenceDropPlaceholder');
  if (placeholder) placeholder.style.display = 'none';

  const placedSpan = document.createElement('span');
  placedSpan.className = 'word-tile placed';
  placedSpan.textContent = word;
  placedSpan.onclick = () => {
    // Remove word
    const idx = userPlacedWords.indexOf(word);
    if (idx > -1) {
      userPlacedWords.splice(idx, 1);
    }
    placedSpan.remove();
    btnEl.style.display = 'inline-block';
    if (userPlacedWords.length === 0 && placeholder) {
      placeholder.style.display = 'inline';
    }
  };
  dropZone.appendChild(placedSpan);
}

function resetCurrentSentence() {
  initSentenceBuilder();
}

function checkCurrentSentence() {
  const currentSentence = userPlacedWords.join(' ');
  const puzzle = sentencePuzzles[currentSentenceIdx];
  const feedback = document.getElementById('sentenceFeedback');
  const nextBtn = document.getElementById('btnNextSentence');

  if (currentSentence === puzzle.correct) {
    if (feedback) {
      feedback.className = 'sentence-feedback feedback-success';
      feedback.textContent = '🌟 Excellent! You built the sentence correctly!';
    }
    addStars(2);
    appState.subjectMastery.english = Math.min(100, appState.subjectMastery.english + 10);
    saveState();
    if (nextBtn) nextBtn.style.display = 'inline-block';
    speakText(puzzle.correct);
  } else {
    if (feedback) {
      feedback.className = 'sentence-feedback feedback-retry';
      feedback.textContent = 'Almost! Click a word to remove it, or reset and try again 😊';
    }
    playAudioChime('retry');
  }
}

function nextSentencePuzzle() {
  currentSentenceIdx = (currentSentenceIdx + 1) % sentencePuzzles.length;
  initSentenceBuilder();
}

function speakCurrentSentencePrompt() {
  const puzzle = sentencePuzzles[currentSentenceIdx];
  speakText(puzzle.prompt);
}

/* --- English Grammar Detective --- */
const grammarQuestions = [
  { sentence: 'The <span class="highlight-grammar-word">clever</span> parrot ate a juicy mango.', word: 'clever', answer: 'Adjective', hint: 'It describes what kind of parrot!' },
  { sentence: 'Zainab is reading a <span class="highlight-grammar-word">book</span> in the library.', word: 'book', answer: 'Noun', hint: 'It is the name of a thing you read!' },
  { sentence: 'Ali and Sami <span class="highlight-grammar-word">ran</span> to the school playground.', word: 'ran', answer: 'Verb', hint: 'Running is an action word!' },
  { sentence: '<span class="highlight-grammar-word">She</span> is the smartest student in Class 2.', word: 'She', answer: 'Pronoun', hint: 'It takes the place of a girl\'s name!' }
];

let currentGrammarIdx = 0;

function checkGrammarAnswer(choice) {
  const q = grammarQuestions[currentGrammarIdx];
  const feedback = document.getElementById('grammarFeedback');
  const nextBtn = document.getElementById('btnNextGrammar');

  if (choice === q.answer) {
    feedback.className = 'grammar-feedback feedback-success';
    feedback.textContent = `⭐ Correct! "${q.word}" is an ${q.answer}! Great thinking!`;
    addStars(2);
    if (nextBtn) nextBtn.style.display = 'inline-block';
  } else {
    feedback.className = 'grammar-feedback feedback-retry';
    feedback.textContent = `Almost! ${q.hint} Let's try again 😊`;
    playAudioChime('retry');
  }
}

function nextGrammarQuestion() {
  currentGrammarIdx = (currentGrammarIdx + 1) % grammarQuestions.length;
  const q = grammarQuestions[currentGrammarIdx];
  document.getElementById('grammarSentenceDisplay').innerHTML = q.sentence;
  document.getElementById('grammarTargetWord').textContent = q.word;
  document.getElementById('grammarFeedback').textContent = '';
  document.getElementById('btnNextGrammar').style.display = 'none';
}

/* --- English Vocab Matching --- */
const vocabPairs = [
  { word: 'Butterfly', emoji: '🦋' },
  { word: 'Rainbow', emoji: '🌈' },
  { word: 'School', emoji: '🏫' },
  { word: 'Mango', emoji: '🥭' }
];

let selectedWordTile = null;
let selectedPicTile = null;

function initVocabMatch() {
  const wordsCol = document.getElementById('vocabWordsCol');
  const picsCol = document.getElementById('vocabPicsCol');
  if (!wordsCol || !picsCol) return;

  wordsCol.innerHTML = '';
  picsCol.innerHTML = '';

  const shuffledWords = [...vocabPairs].sort(() => Math.random() - 0.5);
  const shuffledPics = [...vocabPairs].sort(() => Math.random() - 0.5);

  shuffledWords.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'match-tile';
    tile.textContent = item.word;
    tile.dataset.word = item.word;
    tile.onclick = () => {
      document.querySelectorAll('#vocabWordsCol .match-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedWordTile = tile;
      speakText(item.word);
      checkPairMatch();
    };
    wordsCol.appendChild(tile);
  });

  shuffledPics.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'match-tile';
    tile.textContent = `${item.emoji} Picture`;
    tile.dataset.word = item.word;
    tile.onclick = () => {
      document.querySelectorAll('#vocabPicsCol .match-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedPicTile = tile;
      checkPairMatch();
    };
    picsCol.appendChild(tile);
  });
}

function checkPairMatch() {
  if (selectedWordTile && selectedPicTile) {
    const feedback = document.getElementById('vocabMatchFeedback');
    if (selectedWordTile.dataset.word === selectedPicTile.dataset.word) {
      selectedWordTile.classList.remove('selected');
      selectedPicTile.classList.remove('selected');
      selectedWordTile.classList.add('matched');
      selectedPicTile.classList.add('matched');
      feedback.className = 'vocab-match-feedback feedback-success';
      feedback.textContent = `⭐ Match! ${selectedWordTile.dataset.word} matched!`;
      addStars(1);
      selectedWordTile = null;
      selectedPicTile = null;
    } else {
      feedback.className = 'vocab-match-feedback feedback-retry';
      feedback.textContent = 'Not quite a pair. Try matching another one! 😊';
      playAudioChime('retry');
      setTimeout(() => {
        if (selectedWordTile) selectedWordTile.classList.remove('selected');
        if (selectedPicTile) selectedPicTile.classList.remove('selected');
        selectedWordTile = null;
        selectedPicTile = null;
      }, 700);
    }
  }
}

/* --- English Spelling Bee --- */
const spellingWords = [
  { word: 'PARROT', emoji: '🦜', hint: 'A green bird that eats sweet mangoes' },
  { word: 'TIGER', emoji: '🐅', hint: 'A powerful striped wild cat' },
  { word: 'FLOWER', emoji: '🌸', hint: 'A colorful blooming plant part' },
  { word: 'SMILE', emoji: '😊', hint: 'A happy face expression' }
];

let currentSpellIdx = 0;
let currentSpellPlaced = [];

function initSpellingBee() {
  currentSpellPlaced = [];
  const current = spellingWords[currentSpellIdx];
  document.getElementById('spellingPicDisplay').textContent = current.emoji;
  document.getElementById('spellingWordHint').textContent = `"${current.hint}"`;
  document.getElementById('spellingFeedback').textContent = '';
  document.getElementById('btnNextSpelling').style.display = 'none';

  const targetSlots = document.getElementById('spellingTargetSlots');
  const letterTiles = document.getElementById('spellingLetterTiles');

  targetSlots.innerHTML = '';
  letterTiles.innerHTML = '';

  // Render blank slots
  for (let i = 0; i < current.word.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'spell-slot';
    slot.id = `spellSlot_${i}`;
    targetSlots.appendChild(slot);
  }

  // Render shuffled letter tiles
  const letters = current.word.split('').sort(() => Math.random() - 0.5);
  letters.forEach(letter => {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.textContent = letter;
    tile.onclick = () => {
      if (currentSpellPlaced.length < current.word.length) {
        currentSpellPlaced.push(letter);
        tile.style.visibility = 'hidden';
        renderPlacedSpelling();
        playAudioChime('click');
      }
    };
    letterTiles.appendChild(tile);
  });
}

function renderPlacedSpelling() {
  const current = spellingWords[currentSpellIdx];
  for (let i = 0; i < current.word.length; i++) {
    const slot = document.getElementById(`spellSlot_${i}`);
    if (slot) {
      slot.textContent = currentSpellPlaced[i] || '';
    }
  }
}

function resetSpelling() {
  initSpellingBee();
}

function checkSpelling() {
  const current = spellingWords[currentSpellIdx];
  const feedback = document.getElementById('spellingFeedback');
  const nextBtn = document.getElementById('btnNextSpelling');

  if (currentSpellPlaced.join('') === current.word) {
    feedback.className = 'spelling-feedback feedback-success';
    feedback.textContent = `🎉 Superb! You spelled ${current.word} correctly!`;
    addStars(2);
    unlockBadge('badge_vocab_builder');
    if (nextBtn) nextBtn.style.display = 'inline-block';
    speakText(current.word);
  } else {
    feedback.className = 'spelling-feedback feedback-retry';
    feedback.textContent = 'Almost! Hit Reset to rearrange the letters 😊';
    playAudioChime('retry');
  }
}

function nextSpellingWord() {
  currentSpellIdx = (currentSpellIdx + 1) % spellingWords.length;
  initSpellingBee();
}

function speakCurrentSpellingWord() {
  speakText(spellingWords[currentSpellIdx].word);
}

function switchEnglishTab(tabName) {
  document.querySelectorAll('.lab-english .lab-pill-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.lab-english .lab-tab-panel').forEach(p => p.style.display = 'none');

  if (tabName === 'sentence') {
    document.getElementById('engTabSentence').style.display = 'block';
    initSentenceBuilder();
  } else if (tabName === 'grammar') {
    document.getElementById('engTabGrammar').style.display = 'block';
    nextGrammarQuestion();
  } else if (tabName === 'vocab') {
    document.getElementById('engTabVocab').style.display = 'block';
    initVocabMatch();
  } else if (tabName === 'spelling') {
    document.getElementById('engTabSpelling').style.display = 'block';
    initSpellingBee();
  }
  event.target.classList.add('active');
}

/* ==========================================================================
   6. SINDHI LEARNING ACTIVITIES (سنڌي سرگرميون)
   ========================================================================== */
const sindhiAlphabetData = [
  { letter: 'ا', word: 'انب (Mango)', sentence: 'انب سنڌ جو مٺو ميوو آهي.', emoji: '🥭' },
  { letter: 'ب', word: 'ٻڪري (Goat)', sentence: 'ٻڪري گاهه کائي ٿي.', emoji: '🐐' },
  { letter: 'ٻ', word: 'ٻلي (Cat)', sentence: 'ٻلي کير پيئي ٿي.', emoji: '🐱' },
  { letter: 'ت', word: 'تارو (Star)', sentence: 'رات جو آسمان ۾ تارو چمڪي ٿو.', emoji: '⭐' },
  { letter: 'ٽ', word: 'ٽوپي (Sindhi Topi)', sentence: 'سنڌي ٽوپي اسان جي سڃاڻپ آهي.', emoji: '👑' },
  { letter: 'پ', word: 'پکي (Bird)', sentence: 'پکي وڻ تي ويهي مٺو ڳائي ٿو.', emoji: '🐦' },
  { letter: 'ج', word: 'جهاز (Aeroplane)', sentence: 'جهاز آسمان ۾ اڏامي ٿو.', emoji: '✈️' },
  { letter: 'ڪ', word: 'ڪتاب (Book)', sentence: 'ڪتاب پڙهڻ سان علم وڌي ٿو.', emoji: '📖' },
  { letter: 'گ', word: 'گل (Flower)', sentence: 'گل جي خوشبو ڏاڍي وڻندڙ آهي.', emoji: '🌸' },
  { letter: 'م', word: 'مڇي (Fish)', sentence: 'مڇي پاڻيءَ ۾ تري ٿي.', emoji: '🐟' },
  { letter: 'س', word: 'سج (Sun)', sentence: 'سج اسان کي روشني ۽ گرمي ڏئي ٿو.', emoji: '☀️' }
];

let selectedSindhiIndex = 2; // Default to 'ٻ'

function initSindhiLetters() {
  const grid = document.getElementById('sindhiAlphabetGrid');
  if (!grid) return;
  grid.innerHTML = '';

  sindhiAlphabetData.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `sindhi-alpha-btn ${idx === selectedSindhiIndex ? 'active' : ''}`;
    btn.textContent = item.letter;
    btn.onclick = () => {
      selectedSindhiIndex = idx;
      document.querySelectorAll('.sindhi-alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displaySindhiLetterCard(item);
    };
    grid.appendChild(btn);
  });
  displaySindhiLetterCard(sindhiAlphabetData[selectedSindhiIndex]);
}

function displaySindhiLetterCard(item) {
  document.getElementById('sindhiBigLetter').textContent = item.letter;
  document.getElementById('sindhiWordName').textContent = item.word;
  document.getElementById('sindhiWordSentence').textContent = item.sentence;
  document.getElementById('sindhiWordEmoji').textContent = item.emoji;
}

function speakSindhiWord() {
  const item = sindhiAlphabetData[selectedSindhiIndex];
  // Attempt speech in available voice or fallback alert
  speakText(`${item.word}. ${item.sentence}`, 'ur-PK');
}

/* --- Sindhi Picture-to-Word Quiz --- */
const sindhiWordQuestions = [
  { emoji: '🌸', q: 'هن تصوير جو سنڌي نالو ڇا آهي؟', options: ['گل', 'ڪتاب', 'ٻلي'], correct: 'گل' },
  { emoji: '🐟', q: 'هن تصوير جو سنڌي نالو ڇا آهي؟', options: ['مڇي', 'پکي', 'سج'], correct: 'مڇي' },
  { emoji: '📖', q: 'هن تصوير جو سنڌي نالو ڇا آهي؟', options: ['ڪتاب', 'قلم', 'گهر'], correct: 'ڪتاب' },
  { emoji: '☀️', q: 'هن تصوير جو سنڌي نالو ڇا آهي؟', options: ['سج', 'تارو', 'ٻيڙي'], correct: 'سج' }
];

let currentSindhiWordQ = 0;

function initSindhiWordQuiz() {
  const q = sindhiWordQuestions[currentSindhiWordQ];
  document.getElementById('sindhiQuizEmoji').textContent = q.emoji;
  document.getElementById('sindhiQuizQuestion').textContent = q.q;
  document.getElementById('sindhiWordFeedback').textContent = '';
  document.getElementById('btnNextSindhiWord').style.display = 'none';

  const container = document.getElementById('sindhiWordOptions');
  container.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'sindhi-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => checkSindhiWordAnswer(opt);
    container.appendChild(btn);
  });
}

function checkSindhiWordAnswer(choice) {
  const q = sindhiWordQuestions[currentSindhiWordQ];
  const feedback = document.getElementById('sindhiWordFeedback');
  const nextBtn = document.getElementById('btnNextSindhiWord');

  if (choice === q.correct) {
    feedback.className = 'sindhi-feedback feedback-success rtl-text';
    feedback.textContent = `⭐ تمام سٺو! صحيح جواب "${q.correct}" آهي!`;
    addStars(2);
    appState.subjectMastery.sindhi = Math.min(100, appState.subjectMastery.sindhi + 10);
    saveState();
    if (nextBtn) nextBtn.style.display = 'inline-block';
  } else {
    feedback.className = 'sindhi-feedback feedback-retry rtl-text';
    feedback.textContent = 'ٿورو ويجهو! وري ڪوشش ڪريو 😊';
    playAudioChime('retry');
  }
}

function nextSindhiWordQuestion() {
  currentSindhiWordQ = (currentSindhiWordQ + 1) % sindhiWordQuestions.length;
  initSindhiWordQuiz();
}

/* --- Sindhi Missing Letter --- */
const sindhiMissingQuestions = [
  { visual: '🏡', display: 'گـ [؟] ر (گهر)', correct: 'هـ', bank: ['هـ', 'ب', 'ت'], hint: 'گهر (Home)' },
  { visual: '📖', display: 'ڪـ [؟] اب (ڪتاب)', correct: 'تـ', bank: ['تـ', 'م', 'س'], hint: 'ڪتاب (Book)' },
  { visual: '🌸', display: 'گـ [؟] (گل)', correct: 'ل', bank: ['ل', 'ن', 'ر'], hint: 'گل (Flower)' }
];

let currentSindhiMissingQ = 0;

function initSindhiMissing() {
  const q = sindhiMissingQuestions[currentSindhiMissingQ];
  document.getElementById('missingPromptVisual').textContent = q.visual;
  document.getElementById('missingWordDisplay').innerHTML = q.display.replace('[؟]', '<span class="missing-slot-highlight">؟</span>');
  document.getElementById('sindhiMissingFeedback').textContent = '';
  document.getElementById('btnNextSindhiMissing').style.display = 'none';

  const bank = document.getElementById('missingLettersBank');
  bank.innerHTML = '';
  q.bank.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'sindhi-choice-btn';
    btn.textContent = letter;
    btn.onclick = () => checkSindhiMissing(letter);
    bank.appendChild(btn);
  });
}

function checkSindhiMissing(letter) {
  const q = sindhiMissingQuestions[currentSindhiMissingQ];
  const feedback = document.getElementById('sindhiMissingFeedback');
  const nextBtn = document.getElementById('btnNextSindhiMissing');

  if (letter === q.correct) {
    feedback.className = 'sindhi-feedback feedback-success rtl-text';
    feedback.textContent = `⭐ شاباش! "${q.hint}" لفظ مڪمل ٿيو!`;
    addStars(2);
    if (nextBtn) nextBtn.style.display = 'inline-block';
  } else {
    feedback.className = 'sindhi-feedback feedback-retry rtl-text';
    feedback.textContent = 'ٻيو اکر چونڊي ڏسو 😊';
    playAudioChime('retry');
  }
}

function nextSindhiMissingQuestion() {
  currentSindhiMissingQ = (currentSindhiMissingQ + 1) % sindhiMissingQuestions.length;
  initSindhiMissing();
}

function checkSindhiSentenceAns(choice, isCorrect) {
  const feedback = document.getElementById('sindhiSentenceFeedback');
  if (isCorrect) {
    feedback.className = 'sindhi-feedback feedback-success rtl-text';
    feedback.textContent = '⭐ صحيح جواب! ڪراچي سنڌ جو وڏو شهر آهي.';
    addStars(2);
    unlockBadge('badge_sindhi_scholar');
  } else {
    feedback.className = 'sindhi-feedback feedback-retry rtl-text';
    feedback.textContent = 'ٻيهر پڙهي صحيح شهر چونڊيو 😊';
    playAudioChime('retry');
  }
}

function switchSindhiTab(tabName) {
  document.querySelectorAll('.lab-sindhi .lab-pill-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.lab-sindhi .lab-tab-panel').forEach(p => p.style.display = 'none');

  if (tabName === 'letters') {
    document.getElementById('sindhiTabLetters').style.display = 'block';
    initSindhiLetters();
  } else if (tabName === 'words') {
    document.getElementById('sindhiTabWords').style.display = 'block';
    initSindhiWordQuiz();
  } else if (tabName === 'missing') {
    document.getElementById('sindhiTabMissing').style.display = 'block';
    initSindhiMissing();
  } else if (tabName === 'sentences') {
    document.getElementById('sindhiTabSentences').style.display = 'block';
  }
  event.target.classList.add('active');
}

/* ==========================================================================
   7. MATHEMATICS LAB ACTIVITIES
   ========================================================================== */
function generateNewPlaceValueNum() {
  const randomNum = Math.floor(Math.random() * 800) + 100; // 100 - 899
  const h = Math.floor(randomNum / 100);
  const t = Math.floor((randomNum % 100) / 10);
  const o = randomNum % 10;

  document.getElementById('pvTargetNumber').textContent = randomNum;
  document.getElementById('pvDigitHundreds').textContent = h;
  document.getElementById('pvDigitTens').textContent = t;
  document.getElementById('pvDigitOnes').textContent = o;

  document.getElementById('pvValHundreds').textContent = `= ${h * 100}`;
  document.getElementById('pvValTens').textContent = `= ${t * 10}`;
  document.getElementById('pvValOnes').textContent = `= ${o}`;
  document.getElementById('pvExpandedEquation').textContent = `${h * 100} + ${t * 10} + ${o} = ${randomNum}`;

  // Render visual block stacks
  const blockH = document.getElementById('pvBlocksHundreds');
  const blockT = document.getElementById('pvBlocksTens');
  const blockO = document.getElementById('pvBlocksOnes');

  blockH.innerHTML = '';
  for (let i = 0; i < h; i++) {
    const el = document.createElement('div');
    el.className = 'block-hundred';
    el.textContent = '100';
    blockH.appendChild(el);
  }

  blockT.innerHTML = '';
  for (let i = 0; i < t; i++) {
    const el = document.createElement('div');
    el.className = 'block-ten';
    el.textContent = '10';
    blockT.appendChild(el);
  }

  blockO.innerHTML = '';
  for (let i = 0; i < o; i++) {
    const el = document.createElement('div');
    el.className = 'block-one';
    el.textContent = '1';
    blockO.appendChild(el);
  }
  playAudioChime('click');
}

/* --- Column Addition & Subtraction --- */
let mathMode = 'add';
let mathTop = 45;
let mathBottom = 23;

function setMathProblemMode(mode) {
  mathMode = mode;
  document.getElementById('btnModeAdd').classList.toggle('active', mode === 'add');
  document.getElementById('btnModeSub').classList.toggle('active', mode === 'sub');
  document.getElementById('mathOpSign').textContent = mode === 'add' ? '+' : '−';
  generateNewColumnProblem();
}

function generateNewColumnProblem() {
  const input = document.getElementById('mathAnswerInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  document.getElementById('mathColumnFeedback').textContent = '';

  if (mathMode === 'add') {
    mathTop = Math.floor(Math.random() * 50) + 15;
    mathBottom = Math.floor(Math.random() * 40) + 10;
  } else {
    mathTop = Math.floor(Math.random() * 50) + 40;
    mathBottom = Math.floor(Math.random() * (mathTop - 10)) + 5;
  }

  document.getElementById('mathRowTop').textContent = mathTop;
  document.getElementById('mathRowBottom').textContent = mathBottom;
}

function checkColumnMathAnswer() {
  const userAns = parseInt(document.getElementById('mathAnswerInput').value, 10);
  const correctAns = mathMode === 'add' ? (mathTop + mathBottom) : (mathTop - mathBottom);
  const feedback = document.getElementById('mathColumnFeedback');

  if (userAns === correctAns) {
    feedback.className = 'math-feedback feedback-success';
    feedback.textContent = `⭐ Correct! ${mathTop} ${mathMode === 'add' ? '+' : '−'} ${mathBottom} = ${correctAns}!`;
    addStars(2);
    appState.subjectMastery.math = Math.min(100, appState.subjectMastery.math + 10);
    saveState();
  } else {
    feedback.className = 'math-feedback feedback-retry';
    feedback.textContent = `Almost! Check the ones and tens columns carefully 😊`;
    playAudioChime('retry');
  }
}

/* --- Clock & Time --- */
const clockQuizItems = [
  { hour: 3, minute: 0, hDeg: 90, mDeg: 0, text: "3:00 (3 o'clock)" },
  { hour: 6, minute: 30, hDeg: 195, mDeg: 180, text: "6:30 (Half past 6)" },
  { hour: 9, minute: 0, hDeg: 270, mDeg: 0, text: "9:00 (9 o'clock)" },
  { hour: 12, minute: 0, hDeg: 0, mDeg: 0, text: "12:00 (12 o'clock)" }
];

let currentClockIdx = 0;

function initClockQuestion() {
  const q = clockQuizItems[currentClockIdx];
  const hHand = document.getElementById('clockHourHand');
  const mHand = document.getElementById('clockMinuteHand');
  const feedback = document.getElementById('clockFeedback');
  const nextBtn = document.getElementById('btnNextClock');

  if (hHand) hHand.style.transform = `rotate(${q.hDeg}deg)`;
  if (mHand) mHand.style.transform = `rotate(${q.mDeg}deg)`;
  if (feedback) feedback.textContent = '';
  if (nextBtn) nextBtn.style.display = 'none';

  const container = document.getElementById('clockTimeOptions');
  container.innerHTML = '';

  const options = [
    q.text,
    "4:15",
    "8:30",
    "1:00"
  ].sort(() => Math.random() - 0.5);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'clock-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.text) {
        feedback.className = 'math-feedback feedback-success';
        feedback.textContent = `⭐ Correct! The clock shows ${q.text}!`;
        addStars(2);
        if (nextBtn) nextBtn.style.display = 'inline-block';
      } else {
        feedback.className = 'math-feedback feedback-retry';
        feedback.textContent = `Check the short hour hand and long minute hand! 😊`;
        playAudioChime('retry');
      }
    };
    container.appendChild(btn);
  });
}

function nextClockQuestion() {
  currentClockIdx = (currentClockIdx + 1) % clockQuizItems.length;
  initClockQuestion();
}

/* --- Pakistani Money Counter --- */
let cartItems = [];
let cartTotal = 0;

function addShopItem(name, price) {
  cartItems.push({ name, price });
  cartTotal += price;
  renderShopCart();
  playAudioChime('click');
}

function clearShopCart() {
  cartItems = [];
  cartTotal = 0;
  renderShopCart();
}

function renderShopCart() {
  const list = document.getElementById('shopCartList');
  const totalEl = document.getElementById('shopCartTotal');
  const feedback = document.getElementById('shopFeedback');

  if (feedback) feedback.textContent = '';

  if (cartItems.length === 0) {
    list.innerHTML = '<li class="empty-cart-text">Your basket is empty! Add items above.</li>';
    totalEl.textContent = '₨ 0';
    return;
  }

  list.innerHTML = '';
  cartItems.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><strong>₨ ${item.price}</strong>`;
    list.appendChild(li);
  });
  totalEl.textContent = `₨ ${cartTotal}`;
}

function checkoutShopCart() {
  const feedback = document.getElementById('shopFeedback');
  if (cartTotal === 0) {
    feedback.className = 'math-feedback feedback-retry';
    feedback.textContent = 'Please add some items to your shopping cart first!';
    return;
  }
  feedback.className = 'math-feedback feedback-success';
  feedback.textContent = `⭐ Paid ₨ ${cartTotal} successfully with PKR Notes! You are a Math Shopping Star!`;
  addStars(3);
  clearShopCart();
}

function switchMathTab(tabName) {
  document.querySelectorAll('.lab-math .lab-pill-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.lab-math .lab-tab-panel').forEach(p => p.style.display = 'none');

  if (tabName === 'placevalue') {
    document.getElementById('mathTabPlaceValue').style.display = 'block';
  } else if (tabName === 'addsub') {
    document.getElementById('mathTabAddSub').style.display = 'block';
    generateNewColumnProblem();
  } else if (tabName === 'fractions') {
    document.getElementById('mathTabFractions').style.display = 'block';
  } else if (tabName === 'clock') {
    document.getElementById('mathTabClock').style.display = 'block';
    initClockQuestion();
  } else if (tabName === 'money') {
    document.getElementById('mathTabMoney').style.display = 'block';
  }
  event.target.classList.add('active');
}

/* ==========================================================================
   8. SCIENCE EXPLORER LAB
   ========================================================================== */
const plantPartsInfo = {
  flower: {
    icon: '🌸',
    title: 'Flower',
    desc: 'Flowers are the most colorful part of a plant. They attract bees and butterflies and make seeds so new plants can grow!',
    fact: 'Sunflowers turn their faces toward the warm sun all day long!'
  },
  leaf: {
    icon: '🍃',
    title: 'Leaf',
    desc: 'Leaves are the food factories of a plant! They use sunlight, water, and air to make sweet food through photosynthesis.',
    fact: 'Leaves make the fresh oxygen that we breathe every day!'
  },
  stem: {
    icon: '🎋',
    title: 'Stem',
    desc: 'The stem acts like an elevator! It holds the plant straight and carries water and nutrients from roots to leaves.',
    fact: 'Bamboo stems are so strong they can grow nearly 1 meter in just one day!'
  },
  fruit: {
    icon: '🍎',
    title: 'Fruit',
    desc: 'Fruits protect seeds inside them and provide delicious, healthy vitamins for animals and humans!',
    fact: 'Sindh produces some of the world\'s sweetest Sindhri mangoes!'
  },
  roots: {
    icon: '🌱',
    title: 'Roots',
    desc: 'Roots grow deep underground. They anchor the plant firmly in the soil and absorb water and minerals.',
    fact: 'Carrots and radishes are actually thick edible plant roots!'
  }
};

function showPlantPartInfo(partKey) {
  const info = plantPartsInfo[partKey];
  if (!info) return;
  document.getElementById('plantPartIcon').textContent = info.icon;
  document.getElementById('plantPartTitle').textContent = info.title;
  document.getElementById('plantPartDescription').textContent = info.desc;
  document.getElementById('plantPartFact').textContent = info.fact;
  playAudioChime('click');
}

const animalQuestions = [
  { emoji: '🐪', prompt: 'Where does the Camel live?', answer: 'Domestic', note: 'Camels live and work with humans on desert farms and transport goods.' },
  { emoji: '🦁', prompt: 'Where does the Lion live?', answer: 'Wild', note: 'Lions live freely in wild jungles and savannahs.' },
  { emoji: '🐄', prompt: 'Where does the Cow live?', answer: 'Domestic', note: 'Cows live on dairy farms and give us fresh milk.' },
  { emoji: '🐐', prompt: 'Where does the Markhor live?', answer: 'Wild', note: 'Pakistan\'s national animal Markhor lives in high rocky wild mountains.' }
];

let currentAnimalIdx = 0;

function checkAnimalClassification(type) {
  const q = animalQuestions[currentAnimalIdx];
  const feedback = document.getElementById('animalFeedback');
  if (type === q.answer) {
    feedback.className = 'science-feedback feedback-success';
    feedback.textContent = `⭐ Correct! ${q.note}`;
    addStars(2);
    unlockBadge('badge_science_explorer');
    setTimeout(() => {
      currentAnimalIdx = (currentAnimalIdx + 1) % animalQuestions.length;
      const nextQ = animalQuestions[currentAnimalIdx];
      document.getElementById('currentAnimalEmoji').textContent = nextQ.emoji;
      document.getElementById('currentAnimalPrompt').textContent = nextQ.prompt;
      feedback.textContent = '';
    }, 1500);
  } else {
    feedback.className = 'science-feedback feedback-retry';
    feedback.textContent = `Almost! ${q.note} Let's try again 😊`;
    playAudioChime('retry');
  }
}

function switchScienceTab(tabName) {
  document.querySelectorAll('.lab-science .lab-pill-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.lab-science .lab-tab-panel').forEach(p => p.style.display = 'none');

  if (tabName === 'plants') {
    document.getElementById('sciTabPlants').style.display = 'block';
  } else if (tabName === 'animals') {
    document.getElementById('sciTabAnimals').style.display = 'block';
  } else if (tabName === 'senses') {
    document.getElementById('sciTabSenses').style.display = 'block';
  } else if (tabName === 'facts') {
    document.getElementById('sciTabFacts').style.display = 'block';
  }
  event.target.classList.add('active');
}

/* ==========================================================================
   9. TIMES TABLE CHALLENGE (Tables 2 to 10)
   ========================================================================== */
let activeTableNum = 2;
let tableQuizScore = 0;
let currentTableQ = { factor: 4, answer: 8 };

function selectTable(num) {
  activeTableNum = num;
  document.querySelectorAll('.table-select-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === `Table ${num}`);
  });

  // Render Table Chart
  document.getElementById('tableChartHeading').textContent = `Multiplication Table of ${num}`;
  const grid = document.getElementById('tableGridContainer');
  grid.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement('div');
    div.className = 'table-row-item';
    div.textContent = `${num} × ${i} = ${num * i}`;
    grid.appendChild(div);
  }

  generateTableQuizQuestion();
  playAudioChime('click');
}

function generateTableQuizQuestion() {
  const factor = Math.floor(Math.random() * 10) + 1;
  const ans = activeTableNum * factor;
  currentTableQ = { factor, answer: ans };

  document.getElementById('tableQuestionText').textContent = `${activeTableNum} × ${factor} = ?`;
  document.getElementById('tableFeedback').textContent = '';

  const options = [
    ans,
    ans + activeTableNum,
    Math.max(1, ans - activeTableNum),
    ans + 2
  ].sort(() => Math.random() - 0.5);

  const container = document.getElementById('tableQuizOptions');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'table-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === ans) {
        document.getElementById('tableFeedback').className = 'table-feedback feedback-success';
        document.getElementById('tableFeedback').textContent = `⭐ Correct! ${activeTableNum} × ${factor} = ${ans}!`;
        tableQuizScore++;
        document.getElementById('tableQuizScore').textContent = tableQuizScore;
        addStars(1);
        unlockBadge('badge_math_star');
        setTimeout(generateTableQuizQuestion, 1200);
      } else {
        document.getElementById('tableFeedback').className = 'table-feedback feedback-retry';
        document.getElementById('tableFeedback').textContent = 'Count by groups of ' + activeTableNum + ' and try again 😊';
        playAudioChime('retry');
      }
    };
    container.appendChild(btn);
  });
}

/* ==========================================================================
   10. 6 MINI-GAMES ARCADE ENGINE
   ========================================================================== */
let activeGameId = 1;
let gameStars = 0;
let gameScore = 0;

function loadGame(gameId) {
  activeGameId = gameId;
  document.querySelectorAll('.game-tab-btn').forEach((b, i) => {
    b.classList.toggle('active', i + 1 === gameId);
  });

  const screen = document.getElementById('gameScreenContainer');
  const title = document.getElementById('activeGameTitle');
  const desc = document.getElementById('activeGameDesc');

  if (gameId === 1) {
    title.textContent = 'Game 1: Math Speed Challenge ⚡';
    desc.textContent = 'Solve fast addition, subtraction, and multiplication problems!';
    renderGame1(screen);
  } else if (gameId === 2) {
    title.textContent = 'Game 2: Sentence Scramble Quest 📝';
    desc.textContent = 'Rearrange scrambled tiles into a meaningful Grade 2 sentence!';
    renderGame2(screen);
  } else if (gameId === 3) {
    title.textContent = 'Game 3: Memory Picture Match 🃏';
    desc.textContent = 'Flip the cards to match pairs of educational pictures!';
    renderGame3(screen);
  } else if (gameId === 4) {
    title.textContent = 'Game 4: Shape Detective 🔍';
    desc.textContent = 'Identify geometric shapes: Circle, Triangle, Rectangle, Cylinder!';
    renderGame4(screen);
  } else if (gameId === 5) {
    title.textContent = 'Game 5: Number Detective (Skip Counting) 🔢';
    desc.textContent = 'Find the missing number in patterns of 2s, 5s, and 10s!';
    renderGame5(screen);
  } else if (gameId === 6) {
    title.textContent = 'Game 6: Science Sort Safari 🦁';
    desc.textContent = 'Sort Living vs Non-Living items into their correct crates!';
    renderGame6(screen);
  }
}

// GAME 1: MATH SPEED
function renderGame1(container) {
  const num1 = Math.floor(Math.random() * 12) + 2;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const ans = num1 + num2;

  container.innerHTML = `
    <div style="text-align:center;">
      <h2 style="font-size:3.5rem; color:#0284c7; margin-bottom:16px;">${num1} + ${num2} = ?</h2>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn-action-lg" onclick="checkG1(${ans - 2})">${ans - 2}</button>
        <button class="btn-action-lg" onclick="checkG1(${ans})">${ans}</button>
        <button class="btn-action-lg" onclick="checkG1(${ans + 3})">${ans + 3}</button>
      </div>
      <p id="g1Feedback" style="margin-top:20px; font-weight:700; font-size:1.2rem;"></p>
    </div>
  `;
}

window.checkG1 = function(val) {
  const feedback = document.getElementById('g1Feedback');
  const [n1, n2] = document.querySelector('#gameScreenContainer h2').textContent.split('+').map(s => parseInt(s));
  if (val === n1 + n2) {
    feedback.innerHTML = '⭐ Fantastic! +10 Points!';
    feedback.style.color = '#16a34a';
    gameScore += 10;
    document.getElementById('activeGameScore').textContent = gameScore;
    addStars(1);
    setTimeout(() => renderGame1(document.getElementById('gameScreenContainer')), 800);
  } else {
    feedback.innerHTML = 'Almost! Try again 😊';
    feedback.style.color = '#d97706';
    playAudioChime('retry');
  }
};

// GAME 2: WORD BUILDER
function renderGame2(container) {
  container.innerHTML = `
    <div style="text-align:center; max-width:500px;">
      <h3 style="margin-bottom:14px;">Arrange to say: "Sindh is beautiful."</h3>
      <div id="g2DropZone" style="min-height:50px; border:2px dashed #0284c7; border-radius:12px; padding:10px; margin-bottom:16px; background:#f0f9ff; font-weight:700; font-size:1.2rem;"></div>
      <div style="display:flex; gap:8px; justify-content:center; margin-bottom:16px;">
        <button class="word-tile" onclick="g2Add('Sindh')">Sindh</button>
        <button class="word-tile" onclick="g2Add('is')">is</button>
        <button class="word-tile" onclick="g2Add('beautiful.')">beautiful.</button>
      </div>
      <button class="btn-action-sm btn-check" onclick="g2Check()">Check Sentence</button>
      <p id="g2Feedback" style="margin-top:14px; font-weight:700;"></p>
    </div>
  `;
  window.g2Words = [];
}

window.g2Add = function(w) {
  window.g2Words.push(w);
  document.getElementById('g2DropZone').textContent = window.g2Words.join(' ');
  playAudioChime('click');
};

window.g2Check = function() {
  const fb = document.getElementById('g2Feedback');
  if (window.g2Words.join(' ') === 'Sindh is beautiful.') {
    fb.textContent = '🌟 Superb! +10 Points!';
    fb.style.color = '#16a34a';
    gameScore += 10;
    document.getElementById('activeGameScore').textContent = gameScore;
    addStars(2);
  } else {
    fb.textContent = 'Almost! Resetting...';
    fb.style.color = '#d97706';
    playAudioChime('retry');
    window.g2Words = [];
    document.getElementById('g2DropZone').textContent = '';
  }
};

// GAME 3: MEMORY MATCH
function renderGame3(container) {
  const cards = ['🌸', '🌸', '🦁', '🦁', '🚀', '🚀', '📚', '📚'].sort(() => Math.random() - 0.5);
  container.innerHTML = `
    <div class="memory-grid">
      ${cards.map((c, i) => `<button class="memory-card-btn" id="memCard_${i}" onclick="flipMemCard(${i}, '${c}')">❓</button>`).join('')}
    </div>
    <p id="memFeedback" style="margin-top:16px; font-weight:700;"></p>
  `;
  window.memFlipped = [];
}

window.flipMemCard = function(idx, val) {
  const card = document.getElementById(`memCard_${idx}`);
  if (card.classList.contains('flipped') || window.memFlipped.length >= 2) return;

  card.textContent = val;
  card.classList.add('flipped');
  window.memFlipped.push({ idx, val, card });

  if (window.memFlipped.length === 2) {
    const [c1, c2] = window.memFlipped;
    if (c1.val === c2.val) {
      c1.card.classList.add('matched');
      c2.card.classList.add('matched');
      window.memFlipped = [];
      addStars(1);
      playAudioChime('success');
    } else {
      setTimeout(() => {
        c1.card.textContent = '❓';
        c2.card.textContent = '❓';
        c1.card.classList.remove('flipped');
        c2.card.classList.remove('flipped');
        window.memFlipped = [];
      }, 800);
    }
  }
};

// GAME 4: SHAPE DETECTIVE
function renderGame4(container) {
  container.innerHTML = `
    <div style="text-align:center;">
      <h3 style="margin-bottom:16px;">Detective Mission: Find the <span style="color:#7c3aed;">Triangle</span>! 📐</h3>
      <div style="display:flex; gap:16px; justify-content:center; font-size:3.5rem;">
        <button style="background:none; border:none; cursor:pointer;" onclick="checkShapeG('Circle')">🔴</button>
        <button style="background:none; border:none; cursor:pointer;" onclick="checkShapeG('Square')">🟩</button>
        <button style="background:none; border:none; cursor:pointer;" onclick="checkShapeG('Triangle')">🔺</button>
        <button style="background:none; border:none; cursor:pointer;" onclick="checkShapeG('Star')">⭐</button>
      </div>
      <p id="shapeFeedback" style="margin-top:16px; font-weight:700;"></p>
    </div>
  `;
}

window.checkShapeG = function(shape) {
  const fb = document.getElementById('shapeFeedback');
  if (shape === 'Triangle') {
    fb.textContent = '⭐ Correct! You found the Triangle! +10 Points';
    fb.style.color = '#16a34a';
    gameScore += 10;
    document.getElementById('activeGameScore').textContent = gameScore;
    addStars(1);
  } else {
    fb.textContent = 'That is a ' + shape + '. Keep searching for the Triangle! 😊';
    fb.style.color = '#d97706';
    playAudioChime('retry');
  }
};

// GAME 5: NUMBER DETECTIVE
function renderGame5(container) {
  container.innerHTML = `
    <div style="text-align:center;">
      <h3 style="margin-bottom:14px;">Skip counting by 5s: Find the missing number!</h3>
      <h2 style="font-size:2.8rem; color:#ea580c; margin-bottom:16px;">5, 10, 15, <span style="background:#fef08a; padding:0 8px; border-radius:6px;">?</span>, 25</h2>
      <div style="display:flex; gap:12px; justify-content:center;">
        <button class="btn-action-lg" onclick="checkNumDet(18)">18</button>
        <button class="btn-action-lg" onclick="checkNumDet(20)">20</button>
        <button class="btn-action-lg" onclick="checkNumDet(22)">22</button>
      </div>
      <p id="numDetFeedback" style="margin-top:16px; font-weight:700;"></p>
    </div>
  `;
}

window.checkNumDet = function(val) {
  const fb = document.getElementById('numDetFeedback');
  if (val === 20) {
    fb.textContent = '⭐ Brilliant Detective! 5, 10, 15, 20, 25!';
    fb.style.color = '#16a34a';
    gameScore += 10;
    document.getElementById('activeGameScore').textContent = gameScore;
    addStars(1);
  } else {
    fb.textContent = 'Count by 5s: 15 + 5 = ? Try again 😊';
    fb.style.color = '#d97706';
    playAudioChime('retry');
  }
};

// GAME 6: SCIENCE SORT SAFARI
function renderGame6(container) {
  container.innerHTML = `
    <div style="text-align:center;">
      <h3 style="margin-bottom:14px;">Is a <span style="color:#16a34a;">Rose Plant (🌹)</span> Living or Non-Living?</h3>
      <div style="display:flex; gap:16px; justify-content:center; margin-top:20px;">
        <button class="btn-action-lg" style="background:#16a34a; color:#fff;" onclick="checkSciG(true)">🌱 Living Thing (Grows & Breathes)</button>
        <button class="btn-action-lg" style="background:#64748b; color:#fff;" onclick="checkSciG(false)">🪨 Non-Living Thing</button>
      </div>
      <p id="sciSortFeedback" style="margin-top:16px; font-weight:700;"></p>
    </div>
  `;
}

window.checkSciG = function(isLiving) {
  const fb = document.getElementById('sciSortFeedback');
  if (isLiving) {
    fb.textContent = '⭐ Correct! Plants are living things that grow and need water and sun!';
    fb.style.color = '#16a34a';
    gameScore += 10;
    document.getElementById('activeGameScore').textContent = gameScore;
    addStars(2);
  } else {
    fb.textContent = 'Plants grow and make seeds! They are living things 😊';
    fb.style.color = '#d97706';
    playAudioChime('retry');
  }
};

/* ==========================================================================
   11. READING CORNER (Stories with TTS & Comprehension)
   ========================================================================== */
function readAloudStory(storyId) {
  const textEl = document.getElementById(`${storyId}Text`);
  if (textEl) {
    speakText(textEl.textContent.trim());
  }
}

function checkStoryAnswer(storyNum, choice, isCorrect) {
  const fb = document.getElementById(`story${storyNum}Feedback`);
  if (isCorrect) {
    fb.className = 'story-feedback feedback-success';
    fb.textContent = `⭐ Correct! You are a brilliant reader!`;
    addStars(2);
    unlockBadge('badge_reading_star');
  } else {
    fb.className = 'story-feedback feedback-retry';
    fb.textContent = `Check the story details again 😊`;
    playAudioChime('retry');
  }
}

/* ==========================================================================
   12. GRADE 2 MEGA QUIZ (25 Questions Engine)
   ========================================================================== */
const megaQuizQuestions = [
  // ENGLISH (5 Questions)
  { subject: 'English', emoji: '📚', text: 'What is the plural form of the word "Child"?', options: ['Childs', 'Children', 'Childes', 'Childrens'], correct: 1 },
  { subject: 'English', emoji: '🏃', text: 'Identify the VERB (action word) in this sentence: "The dog barks loudly."', options: ['dog', 'barks', 'loudly', 'The'], correct: 1 },
  { subject: 'English', emoji: '🍎', text: 'Which article goes before "Orange"?', options: ['A orange', 'An orange', 'The orange only', 'No article'], correct: 1 },
  { subject: 'English', emoji: '✨', text: 'Which word is an ADJECTIVE (describing word)?', options: ['Jump', 'Table', 'Beautiful', 'Quickly'], correct: 2 },
  { subject: 'English', emoji: '✏️', text: 'Choose the correctly punctuated sentence:', options: ['ali is happy', 'Ali is happy.', 'ali is happy.', 'Ali is happy'], correct: 1 },

  // SINDHI (5 Questions)
  { subject: 'Sindhi', emoji: '🪶', text: 'سنڌي ٻوليءَ جو اکر "ٻ" ڪهڙي لفظ سان شروع ٿئي ٿو؟', options: ['ٻلي', 'ٽوپي', 'انب', 'قلم'], correct: 0 },
  { subject: 'Sindhi', emoji: '🏛️', text: 'موهن جو دڙو ڪهڙي ضلعي ۾ آهي؟', options: ['لاڙڪاڻو', 'حيدرآباد', 'ٺٽو', 'ڪراچي'], correct: 0 },
  { subject: 'Sindhi', emoji: '🌸', text: '"گل" جو جمع (گهڻا) ڇا هوندو؟', options: ['گلن', 'گل', 'گلا', 'گلڙا'], correct: 0 },
  { subject: 'Sindhi', emoji: '🐱', text: 'خالي جاءِ ڀريو: ٻلي کير ____ ٿي.', options: ['پيئي', 'کائي', 'ڏسي', 'ڳالهائي'], correct: 0 },
  { subject: 'Sindhi', emoji: '📜', text: 'سنڌي ثقافت جي سڃاڻپ ڪهڙي آهي؟', options: ['اجرڪ ۽ سنڌي ٽوپي', 'هيلمٽ', 'چمڙي جو ڪوٽ', 'رانديڪا'], correct: 0 },

  // MATHEMATICS (5 Questions)
  { subject: 'Mathematics', emoji: '🔢', text: 'In the number 358, what is the place value of digit 5?', options: ['5 Ones (5)', '5 Tens (50)', '5 Hundreds (500)', '5000'], correct: 1 },
  { subject: 'Mathematics', emoji: '➕', text: 'Solve: 45 + 32 = ?', options: ['75', '77', '87', '72'], correct: 1 },
  { subject: 'Mathematics', emoji: '✖️', text: 'What is 4 × 5 = ?', options: ['16', '18', '20', '24'], correct: 2 },
  { subject: 'Mathematics', emoji: '🍕', text: 'If an apple is cut into 2 equal parts, what is 1 part called?', options: ['One Quarter (1/4)', 'One Half (1/2)', 'Whole (1)', 'Three Quarters'], correct: 1 },
  { subject: 'Mathematics', emoji: '💵', text: 'Ali has one ₨50 note and one ₨20 note. How much total money does he have?', options: ['₨ 60', '₨ 70', '₨ 80', '₨ 100'], correct: 1 },

  // GENERAL SCIENCE (5 Questions)
  { subject: 'Science', emoji: '🌱', text: 'Which part of the plant absorbs water from the soil?', options: ['Flower', 'Leaf', 'Roots', 'Stem'], correct: 2 },
  { subject: 'Science', emoji: '🦁', text: 'Which of the following is a WILD animal?', options: ['Cow', 'Goat', 'Lion', 'Sheep'], correct: 2 },
  { subject: 'Science', emoji: '👂', text: 'Which sense organ do we use to hear music and sounds?', options: ['Eyes', 'Ears', 'Nose', 'Tongue'], correct: 1 },
  { subject: 'Science', emoji: '🥦', text: 'Which of these is a healthy food that helps children grow strong?', options: ['Fizzy Cola', 'Fresh Vegetables & Milk', 'Chips only', 'Candies'], correct: 1 },
  { subject: 'Science', emoji: '☁️', text: 'What kind of weather is it when dark clouds drop water from the sky?', options: ['Sunny', 'Rainy', 'Windy', 'Snowy'], correct: 1 },

  // GENERAL KNOWLEDGE (5 Questions)
  { subject: 'General Knowledge', emoji: '🇵🇰', text: 'Who is the Founder of Pakistan?', options: ['Allama Iqbal', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Sir Syed Ahmed', 'Liaquat Ali Khan'], correct: 1 },
  { subject: 'General Knowledge', emoji: '🌸', text: 'What is the National Flower of Pakistan?', options: ['Rose', 'Jasmine (چمبيلي)', 'Sunflower', 'Tulip'], correct: 1 },
  { subject: 'General Knowledge', emoji: '🌊', text: 'Keenjhar Lake is located in which city of Sindh?', options: ['Thatta', 'Sukkur', 'Nawabshah', 'Mirpurkhas'], correct: 0 },
  { subject: 'General Knowledge', emoji: '🚦', text: 'What does a RED traffic light mean?', options: ['Go fast', 'STOP', 'Get ready', 'Honk horn'], correct: 1 },
  { subject: 'General Knowledge', emoji: '👮', text: 'Which community helper helps keep our town safe and maintains law?', options: ['Doctor', 'Police Officer', 'Tailor', 'Baker'], correct: 1 }
];

let quizCurrentIdx = 0;
let quizUserAnswers = new Array(25).fill(null);
let quizSeconds = 0;
let quizTimerInterval = null;

function initMegaQuiz() {
  quizCurrentIdx = 0;
  quizUserAnswers = new Array(25).fill(null);
  quizSeconds = 0;
  clearInterval(quizTimerInterval);

  quizTimerInterval = setInterval(() => {
    quizSeconds++;
    const m = String(Math.floor(quizSeconds / 60)).padStart(2, '0');
    const s = String(quizSeconds % 60).padStart(2, '0');
    const timerEl = document.getElementById('quizTimerText');
    if (timerEl) timerEl.textContent = `${m}:${s}`;
  }, 1000);

  document.getElementById('quizActiveView').style.display = 'block';
  document.getElementById('quizResultView').style.display = 'none';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = megaQuizQuestions[quizCurrentIdx];
  document.getElementById('quizSubjectTag').textContent = q.subject;
  document.getElementById('quizCurrentQNum').textContent = quizCurrentIdx + 1;
  document.getElementById('quizProgressBarFill').style.width = `${((quizCurrentIdx + 1) / 25) * 100}%`;
  document.getElementById('quizQuestionEmoji').textContent = q.emoji;
  document.getElementById('quizQuestionText').textContent = q.text;

  const container = document.getElementById('quizOptionsContainer');
  container.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = `quiz-opt-btn ${quizUserAnswers[quizCurrentIdx] === idx ? 'selected' : ''}`;
    btn.innerHTML = `<span style="font-size:1.3rem;">${['🅰️', '🅱️', '🅲', '🅳'][idx]}</span> <span>${opt}</span>`;
    btn.onclick = () => {
      quizUserAnswers[quizCurrentIdx] = idx;
      playAudioChime('click');
      renderQuizQuestion();
    };
    container.appendChild(btn);
  });

  // Nav buttons
  document.getElementById('btnPrevQuiz').disabled = quizCurrentIdx === 0;
  const isLast = quizCurrentIdx === 24;
  document.getElementById('btnNextQuiz').style.display = isLast ? 'none' : 'inline-block';
  document.getElementById('btnSubmitQuiz').style.display = isLast ? 'inline-block' : 'none';
}

function navigateQuiz(direction) {
  quizCurrentIdx += direction;
  renderQuizQuestion();
}

function resetQuizCurrentAnswer() {
  quizUserAnswers[quizCurrentIdx] = null;
  renderQuizQuestion();
}

function submitMegaQuiz() {
  clearInterval(quizTimerInterval);
  let totalCorrect = 0;
  let subjectScores = { English: 0, Sindhi: 0, Mathematics: 0, Science: 0, 'General Knowledge': 0 };

  megaQuizQuestions.forEach((q, idx) => {
    if (quizUserAnswers[idx] === q.correct) {
      totalCorrect++;
      subjectScores[q.subject]++;
    }
  });

  const percentage = Math.round((totalCorrect / 25) * 100);

  // Update App State
  appState.quizHistory.attempts++;
  appState.quizHistory.lastScore = totalCorrect;
  appState.quizHistory.bestScore = Math.max(appState.quizHistory.bestScore, totalCorrect);
  appState.quizHistory.totalQuestionsSolved += 25;

  appState.subjectMastery.english = Math.round((subjectScores.English / 5) * 100);
  appState.subjectMastery.sindhi = Math.round((subjectScores.Sindhi / 5) * 100);
  appState.subjectMastery.math = Math.round((subjectScores.Mathematics / 5) * 100);
  appState.subjectMastery.science = Math.round((subjectScores.Science / 5) * 100);
  appState.subjectMastery.gk = Math.round((subjectScores['General Knowledge'] / 5) * 100);

  unlockBadge('badge_first_quiz');
  if (totalCorrect >= 20) {
    addStars(10);
  } else {
    addStars(5);
  }

  saveState();

  // Show Results Screen
  document.getElementById('quizActiveView').style.display = 'none';
  document.getElementById('quizResultView').style.display = 'block';

  document.getElementById('resultScoreNum').textContent = `${totalCorrect} / 25`;
  document.getElementById('resultPctNum').textContent = `${percentage}%`;

  const encourageMsg = document.getElementById('resultEncourageMsg');
  if (percentage >= 80) {
    encourageMsg.textContent = "🎉 Outstanding job! You are an official Grade 2 Master!";
    showConfetti(50);
  } else if (percentage >= 60) {
    encourageMsg.textContent = "⭐ Great effort! A little more practice and you will get 100%!";
  } else {
    encourageMsg.textContent = "Good try! Let's explore the fun activities and try again 😊";
  }

  // Subject breakdown
  document.getElementById('bkScoreEng').textContent = `${subjectScores.English} / 5`;
  document.getElementById('bkBarEng').style.width = `${(subjectScores.English / 5) * 100}%`;

  document.getElementById('bkScoreSindhi').textContent = `${subjectScores.Sindhi} / 5`;
  document.getElementById('bkBarSindhi').style.width = `${(subjectScores.Sindhi / 5) * 100}%`;

  document.getElementById('bkScoreMath').textContent = `${subjectScores.Mathematics} / 5`;
  document.getElementById('bkBarMath').style.width = `${(subjectScores.Mathematics / 5) * 100}%`;

  document.getElementById('bkScoreSci').textContent = `${subjectScores.Science} / 5`;
  document.getElementById('bkBarSci').style.width = `${(subjectScores.Science / 5) * 100}%`;

  document.getElementById('bkScoreGK').textContent = `${subjectScores['General Knowledge']} / 5`;
  document.getElementById('bkBarGK').style.width = `${(subjectScores['General Knowledge'] / 5) * 100}%`;
}

function restartMegaQuiz() {
  initMegaQuiz();
}

/* ==========================================================================
   13. GLOBAL LIVE SEARCH SYSTEM
   ========================================================================== */
const searchableItems = [
  { title: 'Sentence Builder', type: 'English Activity', desc: 'Arrange words into complete sentences.', link: '#english-lab' },
  { title: 'Grammar Detective', type: 'English Activity', desc: 'Identify Nouns, Verbs, Adjectives & Pronouns.', link: '#english-lab' },
  { title: 'Spelling Bee', type: 'English Activity', desc: 'Spell Grade 2 words with picture hints.', link: '#english-lab' },
  { title: 'سنڌي اکرن جي سڃاڻپ', type: 'Sindhi Activity', desc: 'Learn Sindhi letters and words.', link: '#sindhi-lab' },
  { title: 'کٽل اکر ڀريو', type: 'Sindhi Activity', desc: 'Fill in the missing Sindhi letter.', link: '#sindhi-lab' },
  { title: 'Place Value (Hundreds-Tens-Ones)', type: 'Math Activity', desc: 'Break numbers into H-T-O blocks.', link: '#math-lab' },
  { title: 'Times Tables (2 to 10)', type: 'Math Practice', desc: 'Multiplication flashcards and speed quiz.', link: '#math-tables' },
  { title: 'Pakistani Money (₨ Rupees)', type: 'Math Activity', desc: 'Practice buying stationery & fruits with PKR notes.', link: '#math-lab' },
  { title: 'Parts of a Plant', type: 'Science Explorer', desc: 'Discover Roots, Stem, Leaves, Flower, and Fruit.', link: '#science-lab' },
  { title: 'Animals (Wild & Domestic)', type: 'Science Explorer', desc: 'Classify animals into domestic farms vs wild jungles.', link: '#science-lab' },
  { title: 'Pakistan National Symbols', type: 'General Knowledge', desc: 'Founder, Flag, Markhor, Jasmine, and Mango.', link: '#gk-lab' },
  { title: 'Grade 2 Mini-Games Arcade', type: 'Games', desc: '6 exciting educational mini-games.', link: '#games' },
  { title: 'Grade 2 Mega Quiz (25 Questions)', type: 'Quiz', desc: 'Comprehensive assessment across all 5 subjects.', link: '#grade2-quiz' },
  { title: 'Reading Corner Stories', type: 'Reading', desc: 'Short illustrated stories with Read Aloud audio.', link: '#reading-corner' }
];

function initSearch() {
  const input = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const resultsSection = document.getElementById('searchResultsSection');
  const resultsList = document.getElementById('searchResultsList');
  const noResults = document.getElementById('noResultsMsg');
  const queryDisplay = document.getElementById('searchQueryDisplay');

  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length > 0) {
      clearBtn.style.display = 'block';
      resultsSection.style.display = 'block';
      queryDisplay.textContent = input.value;

      const filtered = searchableItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
      );

      resultsList.innerHTML = '';
      if (filtered.length > 0) {
        noResults.style.display = 'none';
        filtered.forEach(res => {
          const card = document.createElement('div');
          card.className = 'search-result-item';
          card.innerHTML = `
            <span class="search-res-type">${res.type}</span>
            <h4 class="search-res-title">${res.title}</h4>
            <p class="search-res-desc">${res.desc}</p>
          `;
          card.onclick = () => {
            resultsSection.style.display = 'none';
            window.location.href = res.link;
          };
          resultsList.appendChild(card);
        });
      } else {
        noResults.style.display = 'block';
      }
    } else {
      clearBtn.style.display = 'none';
      resultsSection.style.display = 'none';
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      resultsSection.style.display = 'none';
    });
  }

  const closeBtn = document.getElementById('closeSearchResultsBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      resultsSection.style.display = 'none';
    });
  }
}

/* ==========================================================================
   14. CELEBRATION CONFETTI ENGINE (Canvas Based)
   ========================================================================== */
function showConfetti(count = 40) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#0284c7', '#10b981', '#ec4899', '#7c3aed', '#f97316'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.3,
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        active = true;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (active) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}

/* ==========================================================================
   15. INITIALIZATION ON DOM LOAD
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initMotivationalBanner();
  initSearch();

  // Set today's date in Daily Plan
  const dateEl = document.getElementById('currentDateString');
  if (dateEl) {
    const opts = { weekday: 'long', month: 'short', day: 'numeric' };
    dateEl.textContent = `Today: ${new Date().toLocaleDateString('en-US', opts)}`;
  }

  // Initialize Labs
  initSentenceBuilder();
  initSindhiLetters();
  selectTable(2);
  loadGame(1);
  initMegaQuiz();

  // Sound Toggle Button
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      appState.soundEnabled = !appState.soundEnabled;
      soundIcon.textContent = appState.soundEnabled ? '🔊' : '🔇';
      saveState();
    });
  }

  // Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeMobileDrawerBtn');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
  }
  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    });
  });

  // Grade 1 Info Link Toast/Modal
  const grade1Link = document.getElementById('navGrade1Link');
  if (grade1Link) {
    grade1Link.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('grade1Modal');
      if (modal) modal.style.display = 'flex';
    });
  }

  window.closeGrade1Modal = function() {
    const modal = document.getElementById('grade1Modal');
    if (modal) modal.style.display = 'none';
  };

  updateGlobalUI();
});
