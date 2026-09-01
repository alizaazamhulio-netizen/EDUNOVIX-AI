/**
 * ARTICLES — A, AN & THE: COMPLETE MASTERCLASS
 * JavaScript Interaction Engine & Grammar Database
 * File: articles.js
 */

(function () {
  'use strict';

  /* ============================================================
     1. LOCALSTORAGE STATE & PROGRESS ENGINE
     ============================================================ */
  const STORAGE_KEY = 'grammar_articles_progress_v1';
  const BOOKMARKS_KEY = 'grammar_articles_bookmarks_v1';

  let state = {
    lessonsViewed: [],
    questionsAnswered: 0,
    questionsCorrect: 0,
    soundLabSolved: [],
    dragDropScore: 0,
    flashcardsKnown: [],
    masteryScore: 0,
    dailyQuizCompleted: false
  };

  let bookmarks = [];

  function loadSavedData() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        state = Object.assign(state, JSON.parse(savedState));
      }
      const savedBm = localStorage.getItem(BOOKMARKS_KEY);
      if (savedBm) {
        bookmarks = JSON.parse(savedBm);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or restricted:', e);
    }
  }

  function persistData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
    updateDashboardUI();
    updateBookmarkBadge();
  }

  function updateDashboardUI() {
    const totalLessons = 8;
    const lessonsCountEl = document.getElementById('lessonsViewedCount');
    const lessonsFillEl = document.getElementById('lessonsProgressFill');
    const qAnsweredEl = document.getElementById('questionsAnsweredCount');
    const qCorrectEl = document.getElementById('questionsCorrectSubtext');
    const accuracyEl = document.getElementById('accuracyPercentage');
    const accuracySubEl = document.getElementById('accuracySubtext');
    const progressPctEl = document.getElementById('overallProgressPercentage');
    const progressFillEl = document.getElementById('overallProgressFill');
    const statusMsgEl = document.getElementById('progressStatusMessage');

    const lessonsCount = Math.min(state.lessonsViewed.length, totalLessons);
    if (lessonsCountEl) lessonsCountEl.textContent = `${lessonsCount} / ${totalLessons}`;
    if (lessonsFillEl) lessonsFillEl.style.width = `${(lessonsCount / totalLessons) * 100}%`;

    if (qAnsweredEl) qAnsweredEl.textContent = state.questionsAnswered;
    if (qCorrectEl) qCorrectEl.textContent = `${state.questionsCorrect} correct answers`;

    let acc = 0;
    if (state.questionsAnswered > 0) {
      acc = Math.round((state.questionsCorrect / state.questionsAnswered) * 100);
      if (accuracyEl) accuracyEl.textContent = `${acc}%`;
      if (accuracySubEl) accuracySubEl.textContent = `Based on ${state.questionsAnswered} attempts`;
    } else {
      if (accuracyEl) accuracyEl.textContent = '0%';
      if (accuracySubEl) accuracySubEl.textContent = 'Start answering to track';
    }

    // Calculate Overall Chapter Mastery (Weighted)
    // Lessons: 25%, SoundLab: 15%, DragDrop: 15%, Flashcards: 15%, Questions: 30%
    const lessonScore = (lessonsCount / totalLessons) * 25;
    const soundScore = (Math.min(state.soundLabSolved.length, 12) / 12) * 15;
    const dragScore = (Math.min(state.dragDropScore, 12) / 12) * 15;
    const flashScore = (Math.min(state.flashcardsKnown.length, 10) / 10) * 15;
    const quizScore = state.questionsAnswered > 0 ? (acc / 100) * 30 : 0;

    const overall = Math.min(100, Math.round(lessonScore + soundScore + dragScore + flashScore + quizScore));
    if (progressPctEl) progressPctEl.textContent = `${overall}%`;
    if (progressFillEl) progressFillEl.style.width = `${overall}%`;

    if (statusMsgEl) {
      if (overall === 0) {
        statusMsgEl.textContent = 'Start learning to build your progress. Complete interactive labs, flashcards, and quizzes below!';
      } else if (overall < 40) {
        statusMsgEl.textContent = `Great start! You have achieved ${overall}% chapter mastery. Explore intermediate rules and practice labs!`;
      } else if (overall < 85) {
        statusMsgEl.textContent = `Excellent progress! ${overall}% mastered. Tackle the advanced context lab and quiz engine!`;
      } else {
        statusMsgEl.textContent = `🎉 Outstanding! ${overall}% Mastery. You have achieved deep fluency in English articles!`;
      }
    }
  }

  function recordLessonView(lessonId) {
    if (!state.lessonsViewed.includes(lessonId)) {
      state.lessonsViewed.push(lessonId);
      persistData();
    }
  }

  function recordQuestionAttempt(isCorrect) {
    state.questionsAnswered++;
    if (isCorrect) state.questionsCorrect++;
    persistData();
  }

  /* ============================================================
     2. ARTICLE OF THE DAY ROTATION
     ============================================================ */
  const DAILY_ARTICLES = [
    {
      concept: "The Sound Rule: Vowels vs Letters",
      rule: "Use AN before words that start with a vowel sound (e.g. an hour), and A before words starting with a consonant sound (e.g. a university).",
      example: "She waited for an hour before attending a European conference.",
      question: "Choose the correct article: 'He holds ___ MBA degree from Oxford.'",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "an",
      reason: "'MBA' starts with the vowel sound /ɛm/ (em-bee-ay)."
    },
    {
      concept: "Unique Things & Entities",
      rule: "Use THE with things that are unique in the universe or mutually understood as one-of-a-kind in context.",
      example: "The earth revolves around the sun, and the moon orbits the earth.",
      question: "Choose the correct article: 'Look up at ___ moon tonight; it is full.'",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "The moon is a unique celestial body in our immediate reference frame."
    },
    {
      concept: "Uncountable Noun Traps: Advice & Information",
      rule: "Uncountable nouns in English never take 'a' or 'an' and cannot be pluralized directly. Use 'some' or 'a piece of'.",
      example: "He gave me some advice (NOT 'an advice') and a piece of equipment.",
      question: "Choose the correct sentence form: 'She gave me ___ useful advice.'",
      options: ["a", "an", "some / Ø", "the single"],
      correct: "some / Ø",
      reason: "'Advice' is strictly uncountable in English; never say 'an advice'."
    },
    {
      concept: "Second Mention Principle",
      rule: "Use A or AN when first introducing an indefinite singular noun. Once introduced, use THE for subsequent mentions.",
      example: "I saw a dog in the park. The dog barked happily.",
      question: "Complete the pair: 'He bought a laptop. ___ laptop works quickly.'",
      options: ["A", "An", "The", "Ø"],
      correct: "The",
      reason: "The laptop has already been introduced in the first sentence."
    },
    {
      concept: "Geographical Names: Oceans vs Continents",
      rule: "Use THE with oceans, rivers, and mountain ranges (the Pacific, the Nile, the Alps), but ZERO article with continents and single countries (Asia, Pakistan, France).",
      example: "They sailed across the Atlantic to visit Ø France.",
      question: "Choose the correct article: 'The plane flew over ___ Alps.'",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Plural mountain ranges always take the definite article 'the'."
    },
    {
      concept: "Institutions: Purpose vs Building",
      rule: "Use zero article when visiting an institution for its primary purpose (at school, in hospital, in prison). Use THE when visiting the physical building.",
      example: "The student is at school (learning). The plumber went to the school (to repair pipes).",
      question: "Choose the correct article: 'He was sick and had to stay in ___ hospital.' (UK English)",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "Ø (Zero)",
      reason: "In British English, being a patient receiving care is 'in hospital' with zero article."
    },
    {
      concept: "Superlatives & Ordinals",
      rule: "Superlative adjectives and ordinal numbers take THE because they identify a single unique entity.",
      example: "This is the best chapter, and it is the first lesson of the unit.",
      question: "Choose the correct article: 'She was ___ fastest runner in the marathon.'",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Superlatives take 'the' because there is only one fastest runner."
    }
  ];

  function initDailyArticle() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const item = DAILY_ARTICLES[dayOfYear % DAILY_ARTICLES.length];

    const dateEl = document.getElementById('dailyArticleDate');
    const conceptEl = document.getElementById('dailyConceptTitle');
    const ruleEl = document.getElementById('dailyRuleText');
    const exEl = document.getElementById('dailyExampleText');
    const qEl = document.getElementById('dailyQuestionText');
    const optsContainer = document.getElementById('dailyOptionsContainer');
    const feedbackEl = document.getElementById('dailyFeedback');

    if (dateEl) {
      dateEl.textContent = today.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    if (conceptEl) conceptEl.textContent = item.concept;
    if (ruleEl) ruleEl.innerHTML = item.rule;
    if (exEl) exEl.innerHTML = `"${item.example}"`;
    if (qEl) qEl.textContent = item.question;

    if (optsContainer) {
      optsContainer.innerHTML = '';
      item.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'daily-opt-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          const isCorrect = (opt.toLowerCase().startsWith(item.correct.toLowerCase()));
          const allBtns = optsContainer.querySelectorAll('.daily-opt-btn');
          allBtns.forEach(b => b.disabled = true);

          if (isCorrect) {
            btn.classList.add('correct');
            feedbackEl.className = 'daily-feedback success';
            feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Correct! ${item.reason}`;
            recordQuestionAttempt(true);
          } else {
            btn.classList.add('incorrect');
            feedbackEl.className = 'daily-feedback error';
            feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Incorrect. ${item.reason}`;
            recordQuestionAttempt(false);
          }
        });
        optsContainer.appendChild(btn);
      });
    }
  }

  /* ============================================================
     3. INTERACTIVE DECISION TREE
     ============================================================ */
  let treeState = {
    step1Countable: null,
    step2Specific: null,
    step3VowelSound: null
  };

  window.advanceTree = function (step, value) {
    if (step === 1) {
      treeState.step1Countable = value;
      document.getElementById('treeStep1').classList.remove('active');
      document.getElementById('treeStepDot1').classList.add('completed');
      document.getElementById('treeStepDot2').classList.add('active');

      if (!value) {
        // Not singular countable (Plural or Uncountable)
        document.getElementById('treeStep2').classList.add('active');
      } else {
        // Singular countable
        document.getElementById('treeStep2').classList.add('active');
      }
    } else if (step === 2) {
      treeState.step2Specific = value;
      document.getElementById('treeStep2').classList.remove('active');
      document.getElementById('treeStepDot2').classList.add('completed');

      if (value) {
        // Specific! Result is always THE
        showTreeResult('THE', 'Use Definite Article: THE', 'Because the noun is specific, identifiable, or unique to both speaker and listener (applies to singular, plural, and uncountable).', '"Please close the window." / "The water in this bottle is cold."');
      } else {
        // Not specific!
        if (treeState.step1Countable) {
          // Singular countable -> Move to sound check
          document.getElementById('treeStepDot3').classList.add('active');
          document.getElementById('treeStep3').classList.add('active');
        } else {
          // Plural or Uncountable and general -> Zero Article!
          showTreeResult('Ø (Zero)', 'Use Zero Article (No Article)', 'Plural nouns and uncountable nouns in general statements take no article.', '"Ø Books are useful." / "Ø Water is essential." / "I love Ø music."');
        }
      }
    } else if (step === 3) {
      treeState.step3VowelSound = value;
      document.getElementById('treeStep3').classList.remove('active');
      document.getElementById('treeStepDot3').classList.add('completed');

      if (value) {
        showTreeResult('AN', 'Use Indefinite Article: AN', 'Because the noun is singular, countable, non-specific, and begins with a vowel sound.', '"She ate an apple." / "Wait for an hour." / "He is an honest person."');
      } else {
        showTreeResult('A', 'Use Indefinite Article: A', 'Because the noun is singular, countable, non-specific, and begins with a consonant sound.', '"I read a book." / "He studies at a university." / "It was a one-time event."');
      }
    }
  };

  function showTreeResult(badge, title, explanation, examples) {
    const resView = document.getElementById('treeResult');
    const badgeEl = document.getElementById('resultArticleBadge');
    const titleEl = document.getElementById('resultArticleTitle');
    const explEl = document.getElementById('resultArticleExpl');
    const exEl = document.getElementById('resultArticleExamples');

    if (badgeEl) badgeEl.textContent = badge;
    if (titleEl) titleEl.textContent = title;
    if (explEl) explEl.textContent = explanation;
    if (exEl) exEl.innerHTML = `<strong>Examples:</strong> ${examples}`;

    resView.classList.add('active');
  }

  window.resetDecisionTree = function () {
    treeState = { step1Countable: null, step2Specific: null, step3VowelSound: null };
    document.querySelectorAll('.decision-step-view, .decision-result-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(d => d.classList.remove('active', 'completed'));

    document.getElementById('treeStep1').classList.add('active');
    document.getElementById('treeStepDot1').classList.add('active');
  };

  /* ============================================================
     4. A VS AN SOUND LAB (12 WORDS)
     ============================================================ */
  const SOUND_LAB_DATA = [
    { word: "university", phonetic: "/ˌjuːnɪˈvɜːsəti/", correct: "A", reason: "Begins with the consonant glide /j/ ('yoo' sound), despite starting with the letter 'U'." },
    { word: "hour", phonetic: "/ˈaʊər/", correct: "AN", reason: "The 'H' is completely silent; begins with the vowel sound /aʊ/ ('our')." },
    { word: "European city", phonetic: "/ˌjʊərəˈpiːən/", correct: "A", reason: "Begins with the consonant glide /j/ ('yoo-ro-pean'), despite starting with the letter 'E'." },
    { word: "honest person", phonetic: "/ˈɒnɪst/", correct: "AN", reason: "The 'H' is silent; begins with the short vowel sound /ɒ/ ('onest')." },
    { word: "umbrella", phonetic: "/ʌmˈbrɛlə/", correct: "AN", reason: "Begins with the short vowel sound /ʌ/ (as in 'up' or 'cup')." },
    { word: "one-time event", phonetic: "/wʌn taɪm/", correct: "A", reason: "Begins with the consonant glide /w/ ('won-time'), despite starting with the letter 'O'." },
    { word: "MBA graduate", phonetic: "/ˌɛm.biːˈeɪ/", correct: "AN", reason: "The letter 'M' is pronounced starting with the vowel sound /ɛ/ ('em')." },
    { word: "useful idea", phonetic: "/ˈjuːsfʊl/", correct: "A", reason: "Begins with the consonant glide /j/ ('yoo-sful'), not a vowel sound." },
    { word: "engineer", phonetic: "/ˌɛndʒɪˈnɪər/", correct: "AN", reason: "Begins with the standard short vowel sound /ɛ/ ('en-')." },
    { word: "historic event", phonetic: "/hɪˈstɒrɪk/", correct: "A", reason: "In modern standard English, the 'H' is pronounced /h/, taking 'A' (though 'an' was older)." },
    { word: "uniform", phonetic: "/ˈjuːnɪfɔːm/", correct: "A", reason: "Begins with the consonant sound /j/ ('yoo-niform')." },
    { word: "FBI agent", phonetic: "/ˌɛf.biːˈaɪ/", correct: "AN", reason: "The letter 'F' is pronounced starting with the vowel sound /ɛ/ ('ef')." }
  ];

  function initSoundLab() {
    const grid = document.getElementById('soundLabGrid');
    const scoreEl = document.getElementById('soundLabScore');
    const resetBtn = document.getElementById('resetSoundLabBtn');

    if (!grid) return;
    grid.innerHTML = '';

    SOUND_LAB_DATA.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'sound-lab-item';
      card.innerHTML = `
        <div class="sound-word-wrap">
          <span class="sound-word">${item.word}</span>
          <span class="sound-phonetic">${item.phonetic}</span>
        </div>
        <div class="sound-btn-group">
          <button class="sound-choice-btn" data-choice="A">A</button>
          <button class="sound-choice-btn" data-choice="AN">AN</button>
        </div>
        <div class="sound-explanation-box" id="soundExpl_${index}">
          <strong>${item.correct} ${item.word}:</strong> ${item.reason}
        </div>
      `;

      const btns = card.querySelectorAll('.sound-choice-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const choice = btn.dataset.choice;
          const expl = card.querySelector('.sound-explanation-box');
          btns.forEach(b => b.disabled = true);

          if (choice === item.correct) {
            btn.classList.add('active-correct');
            if (!state.soundLabSolved.includes(index)) {
              state.soundLabSolved.push(index);
              recordQuestionAttempt(true);
            }
          } else {
            btn.classList.add('active-incorrect');
            btns.forEach(b => {
              if (b.dataset.choice === item.correct) b.classList.add('active-correct');
            });
            recordQuestionAttempt(false);
          }
          expl.classList.add('show');
          if (scoreEl) scoreEl.textContent = state.soundLabSolved.length;
          persistData();
        });
      });

      grid.appendChild(card);
    });

    if (scoreEl) scoreEl.textContent = state.soundLabSolved.length;

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.soundLabSolved = [];
        persistData();
        initSoundLab();
      });
    }
  }

  /* ============================================================
     5. FIRST VS SECOND MENTION VISUAL STORY
     ============================================================ */
  const STORY_STEPS = [
    {
      s1: "A student found <span class='highlight-pill pill-a'>a book</span> on the desk.",
      e1: "First mention: listener does not know which book yet → Use <strong>A</strong>",
      s2: "<span class='highlight-pill pill-the'>The book</span> was about English grammar.",
      e2: "Second mention: identified as the book on the desk → Use <strong>THE</strong>"
    },
    {
      s1: "She adopted <span class='highlight-pill pill-a'>a dog</span> from the shelter.",
      e1: "First mention: introducing a new animal to the story → Use <strong>A</strong>",
      s2: "<span class='highlight-pill pill-the'>The dog</span> had bright brown eyes.",
      e2: "Second mention: refers to the newly adopted dog → Use <strong>THE</strong>"
    },
    {
      s1: "They saw <span class='highlight-pill pill-an'>an accident</span> on the highway.",
      e1: "First mention: begins with vowel sound /æ/ → Use <strong>AN</strong>",
      s2: "<span class='highlight-pill pill-the'>The accident</span> blocked two lanes.",
      e2: "Second mention: refers specifically to that highway accident → Use <strong>THE</strong>"
    },
    {
      s1: "He ordered <span class='highlight-pill pill-a'>a pizza</span> for dinner.",
      e1: "First mention: general singular item ordered → Use <strong>A</strong>",
      s2: "<span class='highlight-pill pill-the'>The pizza</span> was hot and fresh.",
      e2: "Second mention: identified as the ordered pizza → Use <strong>THE</strong>"
    }
  ];

  let currentStoryIndex = 0;

  function renderStoryStep() {
    const display = document.getElementById('storyStepDisplay');
    const counter = document.getElementById('storyCounterText');
    const prevBtn = document.getElementById('prevStoryStepBtn');
    const nextBtn = document.getElementById('nextStoryStepBtn');
    if (!display) return;

    const data = STORY_STEPS[currentStoryIndex];
    display.innerHTML = `
      <div class="sentence-bubble first-mention-bubble">
        <span class="badge-step">Sentence 1 (First Mention)</span>
        <p class="bubble-text">${data.s1}</p>
        <span class="bubble-expl"><i class="fa-solid fa-arrow-turn-up"></i> ${data.e1}</span>
      </div>
      <div class="sentence-bubble second-mention-bubble">
        <span class="badge-step">Sentence 2 (Second Mention)</span>
        <p class="bubble-text">${data.s2}</p>
        <span class="bubble-expl"><i class="fa-solid fa-arrow-turn-up"></i> ${data.e2}</span>
      </div>
    `;

    if (counter) counter.textContent = `Story ${currentStoryIndex + 1} of ${STORY_STEPS.length}`;
    if (prevBtn) prevBtn.disabled = currentStoryIndex === 0;
    if (nextBtn) nextBtn.disabled = currentStoryIndex === STORY_STEPS.length - 1;
  }

  /* ============================================================
     6. SPECIFIC VS GENERAL CLASSIFIER
     ============================================================ */
  const CLASSIFIER_DATA = [
    {
      sentence: "I love listening to music while studying.",
      correct: "GENERAL",
      expl: "Referring to music in general as an uncountable concept (Zero Article)."
    },
    {
      sentence: "The music at the concert last night was incredible.",
      correct: "SPECIFIC",
      expl: "Restricted to the specific performance at last night's concert (THE)."
    },
    {
      sentence: "Books are a great way to expand your vocabulary.",
      correct: "GENERAL",
      expl: "Referring to all books in general as a plural class (Zero Article)."
    },
    {
      sentence: "The books on that shelf belong to Professor Higgins.",
      correct: "SPECIFIC",
      expl: "Restricted to the specific books on that designated shelf (THE)."
    },
    {
      sentence: "Sugar is harmful if consumed in large quantities.",
      correct: "GENERAL",
      expl: "General statement about the substance sugar (Zero Article)."
    },
    {
      sentence: "Could you pass the sugar, please?",
      correct: "SPECIFIC",
      expl: "Refers to the specific sugar container on the table in front of them (THE)."
    }
  ];

  function initClassifier() {
    const grid = document.getElementById('classifierItemsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    CLASSIFIER_DATA.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'classifier-item';
      card.innerHTML = `
        <div class="classifier-sentence">"${item.sentence}"</div>
        <div class="classifier-btn-group">
          <button class="classifier-btn" data-type="GENERAL">GENERAL (Ø)</button>
          <button class="classifier-btn" data-type="SPECIFIC">SPECIFIC (THE)</button>
        </div>
        <div class="classifier-expl" id="classExpl_${index}">
          <strong>${item.correct}:</strong> ${item.expl}
        </div>
      `;

      const btns = card.querySelectorAll('.classifier-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.dataset.type;
          const expl = card.querySelector('.classifier-expl');
          btns.forEach(b => b.disabled = true);

          if (type === item.correct) {
            btn.classList.add('active-correct');
            recordQuestionAttempt(true);
          } else {
            btn.classList.add('active-incorrect');
            btns.forEach(b => {
              if (b.dataset.type === item.correct) b.classList.add('active-correct');
            });
            recordQuestionAttempt(false);
          }
          expl.classList.add('show');
        });
      });

      grid.appendChild(card);
    });
  }

  /* ============================================================
     7. UNCOUNTABLE NOUN TRAPS
     ============================================================ */
  const TRAPS_DATA = [
    { word: "Advice", wrong: "❌ an advice / advices", correct: "✅ some advice / a piece of advice", why: "'Advice' is strictly uncountable in English." },
    { word: "Information", wrong: "❌ an information / informations", correct: "✅ some information / a piece of info", why: "Never takes 'an'; cannot be pluralized." },
    { word: "Furniture", wrong: "❌ a furniture / furnitures", correct: "✅ some furniture / an item of furniture", why: "Collective uncountable noun." },
    { word: "Equipment", wrong: "❌ an equipment / equipments", correct: "✅ some equipment / a piece of equipment", why: "Takes zero article or 'some'." },
    { word: "Knowledge", wrong: "❌ a knowledge", correct: "✅ knowledge / a good knowledge of...", why: "Uncountable in general sense." },
    { word: "News", wrong: "❌ a news / many news", correct: "✅ the news / a piece of news", why: "Looks plural with 's', but takes singular verb." },
    { word: "Luggage", wrong: "❌ a luggage / luggages", correct: "✅ some luggage / a piece of luggage", why: "Baggage and luggage are uncountable." },
    { word: "Traffic", wrong: "❌ a traffic / traffics", correct: "✅ heavy traffic / stuck in traffic", why: "Refers to continuous flow of vehicles." }
  ];

  function initUncountableTraps() {
    const grid = document.getElementById('uncountableTrapsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    TRAPS_DATA.forEach(trap => {
      const card = document.createElement('div');
      card.className = 'trap-card';
      card.innerHTML = `
        <div class="trap-word">${trap.word}</div>
        <div class="trap-wrong">${trap.wrong}</div>
        <div class="trap-correct">${trap.correct}</div>
        <div class="trap-why">${trap.why}</div>
      `;
      grid.appendChild(card);
    });
  }

  /* ============================================================
     8. ADVANCED CONTEXT LAB (15 QUESTIONS)
     ============================================================ */
  const ADVANCED_LAB_QUESTIONS = [
    {
      category: "Generic Reference & Species",
      sentence: "In scientific taxonomy, ___ blue whale is the largest animal ever known.",
      options: ["A", "An", "The", "Ø (Zero)"],
      correct: "The",
      reason: "'The + singular countable noun' (The blue whale) is the formal, scientific way to represent an entire species as an abstract category."
    },
    {
      category: "Abstract Nouns with Relative Clauses",
      sentence: "He was fascinated by ___ history of the Ottoman Empire.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "While 'history' in general takes zero article, when modified by 'of the Ottoman Empire' it becomes specific and requires 'the'."
    },
    {
      category: "Proper Nouns vs Plural Republics",
      sentence: "They spent two weeks traveling across ___ Netherlands.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Countries with plural names (the Netherlands, the Philippines) or political titles (the UK, the USA) require 'the'."
    },
    {
      category: "Mode of Transportation",
      sentence: "She prefers commuting to work ___ train rather than by car.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "Ø (Zero)",
      reason: "The idiom 'by + mode of transport' (by train, by car, by plane) strictly takes zero article."
    },
    {
      category: "Musical Instruments as Skill",
      sentence: "Her son has been learning to play ___ cello for three years.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Standard English requires 'the' with musical instruments when referring to the musical practice/skill (play the cello)."
    },
    {
      category: "Institutional Purpose vs Building",
      sentence: "The inspector visited ___ prison to review the inmate facilities.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "The inspector is visiting the physical building as a guest/official, not serving time as an inmate."
    },
    {
      category: "Acronym Sound Rules",
      sentence: "He was appointed as ___ UNESCO representative last month.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "a",
      reason: "'UNESCO' is pronounced as an acronym starting with the consonant glide /j/ ('yoo-nes-ko'), taking 'a'."
    },
    {
      category: "Abstract Life vs Specific Life",
      sentence: "___ life he lived was full of extraordinary adventures.",
      options: ["A", "An", "The", "Ø (Zero)"],
      correct: "The",
      reason: "Restricted to his specific biography defined by the relative clause 'he lived'."
    },
    {
      category: "Times of Day & Fixed Phrases",
      sentence: "They usually enjoy going for long walks ___ night.",
      options: ["at a", "at an", "at the", "at Ø"],
      correct: "at Ø",
      reason: "'at night' is a fixed idiom with zero article (contrast with 'in the morning')."
    },
    {
      category: "Geographical Water Bodies",
      sentence: "___ Lake Superior is the largest of the Great Lakes.",
      options: ["A", "An", "The", "Ø (Zero)"],
      correct: "Ø (Zero)",
      reason: "Single lakes take zero article (Lake Superior, Lake Victoria), unlike oceans or rivers."
    },
    {
      category: "Uncountable Quantifier Trap",
      sentence: "Could you provide me with ___ piece of information?",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "a",
      reason: "While 'information' is uncountable, 'piece' is countable singular beginning with /p/ consonant sound → 'a piece'."
    },
    {
      category: "Meals in General",
      sentence: "What time do you usually eat ___ dinner with your family?",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "Ø (Zero)",
      reason: "Everyday meals (breakfast, lunch, dinner) take zero article when speaking generally."
    },
    {
      category: "Formal Superlative Preposition",
      sentence: "She was awarded the prize for being ___ most dedicated volunteer.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Superlative adjectives ('the most dedicated') require 'the'."
    },
    {
      category: "Specific Group in Society",
      sentence: "The new healthcare policy aims to support ___ elderly and disabled.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "'The + adjective' (the elderly) refers collectively to the entire category of people in society."
    },
    {
      category: "Double Article Context",
      sentence: "He bought ___ one-way ticket for the flight to London.",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "a",
      reason: "'One-way' starts with the consonant sound /w/ ('won-way'), so it takes 'a'."
    }
  ];

  let advLabIndex = 0;

  function renderAdvLabQuestion() {
    const stage = document.getElementById('advancedLabStage');
    const currNum = document.getElementById('advLabCurrentNum');
    const totalNum = document.getElementById('advLabTotalNum');
    const prevBtn = document.getElementById('advLabPrevBtn');
    const nextBtn = document.getElementById('advLabNextBtn');
    if (!stage) return;

    const q = ADVANCED_LAB_QUESTIONS[advLabIndex];
    if (currNum) currNum.textContent = advLabIndex + 1;
    if (totalNum) totalNum.textContent = ADVANCED_LAB_QUESTIONS.length;

    stage.innerHTML = `
      <div class="adv-question-card">
        <span class="adv-category-badge">${q.category}</span>
        <h4 class="adv-sentence">${q.sentence}</h4>
        <div class="adv-options-grid">
          ${q.options.map(opt => `<button class="adv-opt-btn" data-opt="${opt}">${opt}</button>`).join('')}
        </div>
        <div class="adv-expl-box" id="advExplBox">
          <strong>Rationale:</strong> ${q.reason}
        </div>
      </div>
    `;

    const btns = stage.querySelectorAll('.adv-opt-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.opt;
        const expl = stage.querySelector('.adv-expl-box');
        btns.forEach(b => b.disabled = true);

        const isCorrect = (selected.toLowerCase().startsWith(q.correct.toLowerCase()));
        if (isCorrect) {
          btn.classList.add('correct');
          recordQuestionAttempt(true);
        } else {
          btn.classList.add('incorrect');
          btns.forEach(b => {
            if (b.dataset.opt.toLowerCase().startsWith(q.correct.toLowerCase())) b.classList.add('correct');
          });
          recordQuestionAttempt(false);
        }
        expl.classList.add('show');
      });
    });

    if (prevBtn) prevBtn.disabled = advLabIndex === 0;
    if (nextBtn) nextBtn.disabled = advLabIndex === ADVANCED_LAB_QUESTIONS.length - 1;
  }

  /* ============================================================
     9. COMMON MISTAKES CLINIC (10 CARDS)
     ============================================================ */
  const MISTAKES_DATA = [
    {
      wrong: "❌ She is doctor at the city hospital.",
      correct: "✅ She is a doctor at the city hospital.",
      rule: "Professions Require Indefinite Article",
      expl: "In English, singular professions always take A/AN (He is a doctor, She is an engineer)."
    },
    {
      wrong: "❌ He is studying at an university in Europe.",
      correct: "✅ He is studying at a university in Europe.",
      rule: "Vowel Letter vs Consonant Sound",
      expl: "'University' begins with the consonant sound /j/ ('yoo'), so it takes 'a'."
    },
    {
      wrong: "❌ Can you give me an advice on this project?",
      correct: "✅ Can you give me some advice (or a piece of advice)?",
      rule: "Uncountable Noun Trap",
      expl: "'Advice' cannot take 'an' or plural 'advices'."
    },
    {
      wrong: "❌ The Pakistan is a beautiful country in South Asia.",
      correct: "✅ Pakistan is a beautiful country in South Asia.",
      rule: "Single Country Names Take Zero Article",
      expl: "Most individual country names take zero article unless they contain 'Kingdom', 'Republic', or plural states."
    },
    {
      wrong: "❌ I enjoy listening to the music in my free time.",
      correct: "✅ I enjoy listening to music in my free time.",
      rule: "General Uncountable Nouns",
      expl: "When speaking generally about an art form or genre, use zero article."
    },
    {
      wrong: "❌ She is tallest girl in our class.",
      correct: "✅ She is the tallest girl in our class.",
      rule: "Superlatives Require 'THE'",
      expl: "Superlative adjectives require 'the' because there is only one highest rank."
    },
    {
      wrong: "❌ We went to the Rome last summer.",
      correct: "✅ We went to Rome last summer.",
      rule: "Cities & Towns Take Zero Article",
      expl: "Proper names of cities (Rome, Tokyo, Paris) take zero article."
    },
    {
      wrong: "❌ I traveled to the office by the bus.",
      correct: "✅ I traveled to the office by bus.",
      rule: "By + Mode of Transport",
      expl: "The preposition 'by' with travel modes takes zero article (by car, by train, by bus)."
    },
    {
      wrong: "❌ First question was very easy.",
      correct: "✅ The first question was very easy.",
      rule: "Ordinal Numbers Require 'THE'",
      expl: "Ordinals (first, second, third, last) specify exact sequence and require 'the'."
    },
    {
      wrong: "❌ He has an unique talent for playing piano.",
      correct: "✅ He has a unique talent for playing the piano.",
      rule: "Phonetic /j/ Sound + Musical Instrument",
      expl: "'Unique' starts with /j/ ('yoo-nique') taking 'a', and playing instruments takes 'the'."
    }
  ];

  function initMistakesClinic() {
    const grid = document.getElementById('mistakesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    MISTAKES_DATA.forEach(item => {
      const card = document.createElement('div');
      card.className = 'mistake-card';
      card.innerHTML = `
        <div class="mistake-wrong">${item.wrong}</div>
        <div class="mistake-correct">${item.correct}</div>
        <div class="mistake-rule-title"><i class="fa-solid fa-book-bookmark"></i> ${item.rule}</div>
        <div class="mistake-expl">${item.expl}</div>
      `;
      grid.appendChild(card);
    });
  }

  /* ============================================================
     10. REAL-LIFE SCENARIOS LAB (7 SCENARIOS)
     ============================================================ */
  const SCENARIOS_DATA = [
    {
      tag: "Scenario 1: Ordering Food",
      title: "At a Café",
      context: "You sit down and want to order one cup of hot coffee from the barista.",
      question: "What do you say?",
      sentence: "\"I would like ___ cup of coffee, please.\"",
      options: ["a", "an", "the", "Ø"],
      correct: "a",
      feedback: "Singular countable noun ('cup') starting with consonant sound /k/ → 'a cup of coffee'."
    },
    {
      tag: "Scenario 2: Introducing an Object",
      title: "Describing a Purchase",
      context: "You are telling your friend about something new you bought yesterday.",
      question: "Choose the correct article:",
      sentence: "\"I bought ___ new laptop yesterday.\"",
      options: ["a", "an", "the", "Ø"],
      correct: "a",
      feedback: "First mention of an unidentified singular countable item → 'a new laptop'."
    },
    {
      tag: "Scenario 3: Second Mention",
      title: "Continuing the Story",
      context: "Now you are explaining how the laptop performs.",
      question: "Choose the correct article:",
      sentence: "\"___ laptop starts up in three seconds.\"",
      options: ["A", "An", "The", "Ø"],
      correct: "The",
      feedback: "Second mention of the identified laptop both you and your friend now know about → 'The laptop'."
    },
    {
      tag: "Scenario 4: Specific Room",
      title: "At Home",
      context: "You are asking your roommate where your keys are in the house.",
      question: "Choose the correct article:",
      sentence: "\"Did you leave my keys in ___ kitchen?\"",
      options: ["a", "an", "the", "Ø"],
      correct: "the",
      feedback: "In a house/apartment, there is typically one specific kitchen mutually understood → 'the kitchen'."
    },
    {
      tag: "Scenario 5: Talking About a Country",
      title: "Travel Plans",
      context: "You are discussing your upcoming summer vacation destination.",
      question: "Choose the correct article:",
      sentence: "\"We are planning to visit ___ Pakistan next July.\"",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "Ø (Zero)",
      feedback: "Single country names take zero article → 'visit Pakistan'."
    },
    {
      tag: "Scenario 6: Stating a Profession",
      title: "Introducing a Colleague",
      context: "You are introducing Sarah and stating what she does for a living.",
      question: "Choose the correct article:",
      sentence: "\"Sarah is ___ electrical engineer at Siemens.\"",
      options: ["a", "an", "the", "Ø"],
      correct: "an",
      feedback: "Singular profession starting with vowel sound /ɛ/ ('electrical') → 'an electrical engineer'."
    },
    {
      tag: "Scenario 7: Asking for Help",
      title: "Seeking Guidance",
      context: "You need general advice from your mentor about career paths.",
      question: "Choose the correct form:",
      sentence: "\"Could you give me ___ advice on my career?\"",
      options: ["an", "a", "some / Ø", "the one"],
      correct: "some / Ø",
      feedback: "'Advice' is strictly uncountable; use 'some' or zero article."
    }
  ];

  function initScenarios() {
    const grid = document.getElementById('scenariosGrid');
    if (!grid) return;
    grid.innerHTML = '';

    SCENARIOS_DATA.forEach((sc, index) => {
      const card = document.createElement('div');
      card.className = 'scenario-card';
      card.innerHTML = `
        <span class="scenario-tag">${sc.tag}</span>
        <h4 class="scenario-title">${sc.title}</h4>
        <p class="scenario-context">${sc.context}</p>
        <p style="font-weight: 700; color: #FFFFFF; margin-bottom: 0.75rem;">${sc.sentence}</p>
        <div class="scenario-options">
          ${sc.options.map(opt => `<button class="scenario-btn" data-opt="${opt}">${opt}</button>`).join('')}
        </div>
        <div class="scenario-feedback" id="scFeedback_${index}">
          <strong>Explanation:</strong> ${sc.feedback}
        </div>
      `;

      const btns = card.querySelectorAll('.scenario-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const choice = btn.dataset.opt;
          const fb = card.querySelector('.scenario-feedback');
          btns.forEach(b => b.disabled = true);

          if (choice.toLowerCase().startsWith(sc.correct.toLowerCase())) {
            btn.classList.add('correct');
            recordQuestionAttempt(true);
          } else {
            btn.classList.add('incorrect');
            btns.forEach(b => {
              if (b.dataset.opt.toLowerCase().startsWith(sc.correct.toLowerCase())) b.classList.add('correct');
            });
            recordQuestionAttempt(false);
          }
          fb.classList.add('show');
        });
      });

      grid.appendChild(card);
    });
  }

  /* ============================================================
     11. ARTICLE DETECTOR / SENTENCE ANALYZER
     ============================================================ */
  const DETECTOR_SENTENCES = [
    {
      tokens: [
        { text: "I bought", isArticle: false },
        { text: "a", isArticle: true, type: "Indefinite Article", noun: "book", phonetic: "/b/ consonant sound", reason: "First mention of a singular countable noun. Listener does not know which book yet." },
        { text: "book yesterday.", isArticle: false },
        { text: "The", isArticle: true, type: "Definite Article", noun: "book", phonetic: "/ðə/ before consonant", reason: "Second mention of the same book introduced earlier. Now specific to both speaker & listener." },
        { text: "book was written by", isArticle: false },
        { text: "an", isArticle: true, type: "Indefinite Article", noun: "honest professor", phonetic: "/ɒ/ vowel sound (silent 'H')", reason: "Indefinite article used before 'honest' because the letter 'H' is silent." },
        { text: "honest professor.", isArticle: false }
      ]
    },
    {
      tokens: [
        { text: "She attends", isArticle: false },
        { text: "a", isArticle: true, type: "Indefinite Article", noun: "university", phonetic: "/j/ consonant glide", reason: "Indefinite article used before 'university' because it begins with consonant glide /j/." },
        { text: "university in", isArticle: false },
        { text: "the", isArticle: true, type: "Definite Article", noun: "United States", phonetic: "/ðə/ before consonant", reason: "Countries with political unions/states (the United States) take the definite article 'the'." },
        { text: "United States and plays", isArticle: false },
        { text: "the", isArticle: true, type: "Definite Article", noun: "piano", phonetic: "/ðə/ before consonant", reason: "Musical instruments take 'the' when referring to the skill or activity of playing." },
        { text: "piano.", isArticle: false }
      ]
    },
    {
      tokens: [
        { text: "Ø", isArticle: true, type: "Zero Article", noun: "Tigers", phonetic: "No article needed", reason: "Plural countable noun used in a general statement about the whole species." },
        { text: "Tigers are dangerous, but", isArticle: false },
        { text: "the", isArticle: true, type: "Definite Article", noun: "tiger", phonetic: "/ðə/ before consonant", reason: "Specific tiger identified by the prepositional phrase 'at the zoo'." },
        { text: "tiger at", isArticle: false },
        { text: "the", isArticle: true, type: "Definite Article", noun: "zoo", phonetic: "/ðə/ before consonant", reason: "Specific local zoo understood in context." },
        { text: "zoo is sleeping.", isArticle: false }
      ]
    },
    {
      tokens: [
        { text: "He gave me", isArticle: false },
        { text: "Ø", isArticle: true, type: "Zero Article", noun: "advice", phonetic: "Uncountable noun", reason: "'Advice' is strictly uncountable and takes zero article (never 'an advice')." },
        { text: "advice about buying", isArticle: false },
        { text: "a", isArticle: true, type: "Indefinite Article", noun: "one-time ticket", phonetic: "/w/ consonant glide", reason: "'One-time' starts with consonant glide /w/ ('won-time'), taking 'a'." },
        { text: "one-time ticket for", isArticle: false },
        { text: "the", isArticle: true, type: "Definite Article", noun: "train", phonetic: "/ðə/ before consonant", reason: "Specific train service being discussed." },
        { text: "train.", isArticle: false }
      ]
    }
  ];

  function renderDetectorSentence(index) {
    const stage = document.getElementById('detectorDisplayStage');
    const panel = document.getElementById('detectorAnalysisPanel');
    if (!stage || !panel) return;

    stage.innerHTML = '';
    panel.innerHTML = `
      <div class="empty-analysis-state">
        <i class="fa-solid fa-arrow-pointer"></i> Click on any article word (<strong>A</strong>, <strong>AN</strong>, <strong>THE</strong>, or <strong>Ø</strong>) above to inspect its full grammatical breakdown.
      </div>
    `;

    const data = DETECTOR_SENTENCES[index];
    data.tokens.forEach(tok => {
      if (tok.isArticle) {
        const pill = document.createElement('button');
        let typeClass = 'token-a';
        if (tok.text.toLowerCase() === 'an') typeClass = 'token-an';
        else if (tok.text.toLowerCase() === 'the') typeClass = 'token-the';
        else if (tok.text === 'Ø') typeClass = 'token-zero';

        pill.className = `token-article ${typeClass}`;
        pill.textContent = tok.text;
        pill.addEventListener('click', () => {
          stage.querySelectorAll('.token-article').forEach(p => p.classList.remove('active-token'));
          pill.classList.add('active-token');

          panel.innerHTML = `
            <div class="active-analysis-grid">
              <div class="analysis-stat-box">
                <span class="analysis-label">Article Classification</span>
                <div class="analysis-value">${tok.type}</div>
              </div>
              <div class="analysis-stat-box">
                <span class="analysis-label">Target Noun</span>
                <div class="analysis-value">${tok.noun}</div>
              </div>
              <div class="analysis-stat-box">
                <span class="analysis-label">Phonetic Sound Logic</span>
                <div class="analysis-value">${tok.phonetic}</div>
              </div>
            </div>
            <div style="margin-top: 1rem; padding: 0.85rem; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
              <strong style="color: var(--cyan);">Grammatical Rationale:</strong>
              <p style="margin-top: 0.25rem; font-size: 0.95rem; color: #CBD5E1;">${tok.reason}</p>
            </div>
          `;
        });
        stage.appendChild(pill);
      } else {
        const span = document.createElement('span');
        span.className = 'token-word';
        span.textContent = tok.text;
        stage.appendChild(span);
      }
    });
  }

  /* ============================================================
     12. DRAG & DROP / TOUCH CLASSIFIER
     ============================================================ */
  const DRAG_ITEMS = [
    { text: "apple", category: "AN" },
    { text: "university", category: "A" },
    { text: "hour", category: "AN" },
    { text: "sun", category: "THE" },
    { text: "music (general)", category: "ZERO" },
    { text: "United States", category: "THE" },
    { text: "Pakistan", category: "ZERO" },
    { text: "first chapter", category: "THE" },
    { text: "honest answer", category: "AN" },
    { text: "European country", category: "A" },
    { text: "information", category: "ZERO" },
    { text: "piano (playing skill)", category: "THE" }
  ];

  let selectedTouchItem = null;

  function initDragAndDrop() {
    const pool = document.getElementById('dragPool');
    const remainingEl = document.getElementById('dragRemainingCount');
    const scoreEl = document.getElementById('dragScoreText');
    const resetBtn = document.getElementById('resetDragDropBtn');
    if (!pool) return;

    pool.innerHTML = '';
    document.querySelectorAll('.zone-items').forEach(zi => zi.innerHTML = '');

    let remainingCount = DRAG_ITEMS.length;
    let correctCount = 0;
    if (remainingEl) remainingEl.textContent = remainingCount;
    if (scoreEl) scoreEl.textContent = `Score: 0 / ${DRAG_ITEMS.length} items sorted accurately`;

    DRAG_ITEMS.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'draggable-item';
      el.textContent = item.text;
      el.draggable = true;
      el.dataset.category = item.category;
      el.dataset.index = index;

      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ category: item.category, text: item.text, index: index }));
      });

      // Mobile Touch Support
      el.addEventListener('click', () => {
        document.querySelectorAll('.draggable-item').forEach(d => d.classList.remove('selected-touch'));
        if (selectedTouchItem === el) {
          selectedTouchItem = null;
        } else {
          selectedTouchItem = el;
          el.classList.add('selected-touch');
        }
      });

      pool.appendChild(el);
    });

    // Drop Zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        try {
          const raw = e.dataTransfer.getData('text/plain');
          if (!raw) return;
          const data = JSON.parse(raw);
          handleItemPlacement(data.category, data.text, data.index, zone);
        } catch (err) {
          console.error(err);
        }
      });

      // Click to place on mobile
      zone.addEventListener('click', () => {
        if (selectedTouchItem) {
          const cat = selectedTouchItem.dataset.category;
          const txt = selectedTouchItem.textContent;
          const idx = selectedTouchItem.dataset.index;
          handleItemPlacement(cat, txt, idx, zone);
          selectedTouchItem = null;
        }
      });
    });

    function handleItemPlacement(itemCat, itemText, itemIndex, targetZone) {
      const zoneCat = targetZone.dataset.category;
      const targetItemsContainer = targetZone.querySelector('.zone-items');
      const itemEl = pool.querySelector(`[data-index="${itemIndex}"]`);

      if (!itemEl) return;

      const isCorrect = (itemCat === zoneCat);
      const placed = document.createElement('div');
      placed.className = 'placed-item';

      if (isCorrect) {
        placed.innerHTML = `<span>${itemText}</span> <i class="fa-solid fa-check text-green" style="color: #10B981;"></i>`;
        correctCount++;
        state.dragDropScore = correctCount;
        recordQuestionAttempt(true);
      } else {
        placed.innerHTML = `<span>${itemText}</span> <i class="fa-solid fa-xmark text-red" style="color: #EF4444;" title="Should be in ${itemCat}"></i>`;
        recordQuestionAttempt(false);
      }

      targetItemsContainer.appendChild(placed);
      itemEl.remove();

      remainingCount--;
      if (remainingEl) remainingEl.textContent = remainingCount;
      if (scoreEl) scoreEl.textContent = `Score: ${correctCount} / ${DRAG_ITEMS.length} items sorted accurately`;
      persistData();
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.dragDropScore = 0;
        persistData();
        initDragAndDrop();
      });
    }
  }

  /* ============================================================
     13. 3D FLASHCARDS ENGINE (10 CARDS)
     ============================================================ */
  const FLASHCARDS_DATA = [
    {
      id: "fc_a",
      category: "INDEFINITE ARTICLE: A",
      keyword: "A",
      question: "When do you use the indefinite article 'A'?",
      rule: "Used before a singular countable noun beginning with a consonant sound (e.g. /b/, /t/, /j/).",
      example: "a book, a student, a university, a European city",
      keyPoint: "Strictly sound-based: letter 'U' sounding like /j/ takes 'A'!"
    },
    {
      id: "fc_an",
      category: "INDEFINITE ARTICLE: AN",
      keyword: "AN",
      question: "When do you use the indefinite article 'AN'?",
      rule: "Used before a singular countable noun beginning with a vowel sound (e.g. /æ/, /aʊ/, /ɛ/).",
      example: "an apple, an hour, an honest person, an MBA",
      keyPoint: "Silent 'H' makes words start with vowel sounds → takes 'AN'!"
    },
    {
      id: "fc_the",
      category: "DEFINITE ARTICLE: THE",
      keyword: "THE",
      question: "When is the definite article 'THE' required?",
      rule: "Used when the noun is specific, identifiable, unique, previously mentioned, or superlative.",
      example: "the sun, the best player, the book on the table",
      keyPoint: "Signals that both speaker and listener know the exact item."
    },
    {
      id: "fc_zero",
      category: "ZERO ARTICLE (Ø)",
      keyword: "Ø",
      question: "What is Zero Article and when is it used?",
      rule: "Omission of articles with plural and uncountable nouns in general, single countries, languages, and meals.",
      example: "Ø Books are useful, in Ø Pakistan, study Ø English",
      keyPoint: "Zero article is an active signal of universal generality!"
    },
    {
      id: "fc_sound",
      category: "THE SOUND RULE",
      keyword: "SOUND",
      question: "Why is sound more important than spelling for A / AN?",
      rule: "A vs AN depends on the initial spoken phonetic phoneme, not the printed English alphabet letter.",
      example: "a university (/j/) vs an umbrella (/ʌ/); a one-way (/w/) vs an hour (/aʊ/)",
      keyPoint: "Never decide A vs AN by looking at letters alone!"
    },
    {
      id: "fc_first_second",
      category: "FIRST VS SECOND MENTION",
      keyword: "MENTION",
      question: "How do articles transition across a narrative?",
      rule: "First introduction of an unidentified noun uses A/AN; subsequent references use THE.",
      example: "I saw a dog yesterday. The dog had a red collar.",
      keyPoint: "Moves from indefinite (unknown) to definite (known)."
    },
    {
      id: "fc_specific_general",
      category: "SPECIFIC VS GENERAL",
      keyword: "SPECIFIC",
      question: "How does specificity affect uncountable nouns?",
      rule: "General uncountables take Zero Article; uncountables defined by a clause or context take THE.",
      example: "I love music (general) vs The music at the concert (specific)",
      keyPoint: "Qualifying phrases (of..., in...) usually trigger 'THE'."
    },
    {
      id: "fc_uncountable",
      category: "UNCOUNTABLE NOUNS",
      keyword: "COUNT",
      question: "Can uncountable nouns take A or AN?",
      rule: "No! Uncountable nouns in normal sense never take A/AN. Use 'some' or partitives ('a piece of').",
      example: "some advice (NOT an advice), a piece of information",
      keyPoint: "Advice, information, furniture, and luggage never take 'a'."
    },
    {
      id: "fc_superlatives",
      category: "SUPERLATIVES & ORDINALS",
      keyword: "SUPERLATIVE",
      question: "Why do superlatives and ordinals always take 'THE'?",
      rule: "Because there is only one highest or uniquely positioned entity in any comparison.",
      example: "the fastest car, the first question, the last chapter",
      keyPoint: "Unique rank triggers definite reference."
    },
    {
      id: "fc_geography",
      category: "GEOGRAPHICAL CONVENTIONS",
      keyword: "GEOGRAPHY",
      question: "Which geographical entities take 'THE'?",
      rule: "Oceans, rivers, mountain ranges (plural), and united republics take THE; single countries/continents take Zero.",
      example: "the Pacific, the Alps, the UK vs Pakistan, France, Asia",
      keyPoint: "Plural geography = THE; Singular geography = Ø."
    }
  ];

  let currentCardIndex = 0;
  let flashcardsDeck = [...FLASHCARDS_DATA];

  function renderFlashcard() {
    const cardEl = document.getElementById('flashcard3D');
    const idxEl = document.getElementById('currentCardIndex');
    const totalEl = document.getElementById('totalCardsCount');
    const statusEl = document.getElementById('cardMasteryStatus');

    const catFront = document.getElementById('cardCategoryFront');
    const keyFront = document.getElementById('cardKeywordFront');
    const qFront = document.getElementById('cardQuestionFront');

    const ruleBack = document.getElementById('cardRuleBack');
    const exBack = document.getElementById('cardExampleBack');
    const tagBack = document.getElementById('cardKeyPointTag');

    if (!cardEl) return;
    cardEl.classList.remove('flipped');

    const card = flashcardsDeck[currentCardIndex];
    if (idxEl) idxEl.textContent = currentCardIndex + 1;
    if (totalEl) totalEl.textContent = flashcardsDeck.length;

    const isKnown = state.flashcardsKnown.includes(card.id);
    if (statusEl) {
      statusEl.textContent = isKnown ? '✓ Mastered' : 'Needs Review';
      statusEl.style.color = isKnown ? '#34D399' : '#FBBF24';
    }

    if (catFront) catFront.textContent = card.category;
    if (keyFront) keyFront.textContent = card.keyword;
    if (qFront) qFront.textContent = card.question;

    if (ruleBack) ruleBack.textContent = card.rule;
    if (exBack) exBack.innerHTML = `<strong>Key Examples:</strong> <em>${card.example}</em>`;
    if (tagBack) tagBack.textContent = card.keyPoint;
  }

  function initFlashcards() {
    const cardEl = document.getElementById('flashcard3D');
    const prevBtn = document.getElementById('prevCardBtn');
    const nextBtn = document.getElementById('nextCardBtn');
    const shuffleBtn = document.getElementById('shuffleCardsBtn');
    const knownBtn = document.getElementById('markKnownBtn');
    const reviewBtn = document.getElementById('markReviewBtn');

    if (!cardEl) return;

    cardEl.addEventListener('click', () => {
      cardEl.classList.toggle('flipped');
    });

    cardEl.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        cardEl.classList.toggle('flipped');
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + flashcardsDeck.length) % flashcardsDeck.length;
        renderFlashcard();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % flashcardsDeck.length;
        renderFlashcard();
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        flashcardsDeck.sort(() => Math.random() - 0.5);
        currentCardIndex = 0;
        renderFlashcard();
      });
    }

    if (knownBtn) {
      knownBtn.addEventListener('click', () => {
        const id = flashcardsDeck[currentCardIndex].id;
        if (!state.flashcardsKnown.includes(id)) {
          state.flashcardsKnown.push(id);
          persistData();
        }
        currentCardIndex = (currentCardIndex + 1) % flashcardsDeck.length;
        renderFlashcard();
      });
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const id = flashcardsDeck[currentCardIndex].id;
        state.flashcardsKnown = state.flashcardsKnown.filter(k => k !== id);
        persistData();
        currentCardIndex = (currentCardIndex + 1) % flashcardsDeck.length;
        renderFlashcard();
      });
    }

    renderFlashcard();
  }

  /* ============================================================
     14. COMPREHENSIVE QUIZ ENGINE (15 QUESTION TYPES)
     ============================================================ */
  const QUIZ_QUESTIONS = [
    {
      type: "Type 1: A / AN / THE / ZERO Choice",
      question: "She hopes to become ___ architect after graduating from college.",
      context: "Choose the correct article for this singular profession:",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "an",
      reason: "'Architect' begins with the short vowel sound /ɑː/ or /æ/, requiring 'an'."
    },
    {
      type: "Type 2: Why THE is Used",
      question: "In the sentence 'Please pass the salt', why is 'THE' used?",
      context: "Analyze the situational definiteness:",
      options: [
        "Because salt is a superlative",
        "Because salt is an ordinal number",
        "Because it refers to the specific salt container on the immediate table",
        "Because salt is plural"
      ],
      correct: "Because it refers to the specific salt container on the immediate table",
      reason: "Both speaker and listener share the immediate physical context of the dining table."
    },
    {
      type: "Type 3: Sound-Based A vs AN",
      question: "Which of the following phrases correctly uses 'A' or 'AN' based on sound?",
      context: "Identify the phonetically accurate pair:",
      options: [
        "an university",
        "a honest man",
        "an European union",
        "an honorable mention"
      ],
      correct: "an honorable mention",
      reason: "'Honorable' has a silent 'H' and begins with the vowel sound /ɒ/."
    },
    {
      type: "Type 4: Countable vs Uncountable",
      question: "Which of the following sentences is grammatically correct in English?",
      context: "Check uncountable noun rules:",
      options: [
        "He gave me an advice regarding my thesis.",
        "He gave me a valuable piece of advice.",
        "He gave me many advices regarding my thesis.",
        "He gave me an useful information."
      ],
      correct: "He gave me a valuable piece of advice.",
      reason: "'Advice' is strictly uncountable; use the partitive 'a piece of'."
    },
    {
      type: "Type 5: First Mention vs Second Mention",
      question: "Fill in the blanks: 'I saw ___ bird in the garden. ___ bird was singing beautifully.'",
      context: "Follow narrative progression:",
      options: [
        "the / A",
        "a / The",
        "a / A",
        "the / The"
      ],
      correct: "a / The",
      reason: "First mention introduces unknown bird ('a'); second mention identifies it ('the')."
    },
    {
      type: "Type 6: Specific vs General",
      question: "Choose the correct sentence to express a general fact about music:",
      context: "Distinguish universal generality from specificity:",
      options: [
        "The music is important for human culture.",
        "A music is important for human culture.",
        "Music is important for human culture.",
        "An music is important for human culture."
      ],
      correct: "Music is important for human culture.",
      reason: "General uncountable concepts take zero article."
    },
    {
      type: "Type 7: Geographical Names",
      question: "Which geographical feature correctly takes 'THE'?",
      context: "Apply geographical article rules:",
      options: [
        "The Mount Everest",
        "The Pacific Ocean",
        "The Lake Superior",
        "The Asia"
      ],
      correct: "The Pacific Ocean",
      reason: "Oceans and seas take 'the' (the Pacific, the Atlantic), while single mountains, lakes, and continents take zero article."
    },
    {
      type: "Type 8: Superlatives",
      question: "Select the correct article: 'Mount Everest is ___ highest peak on Earth.'",
      context: "Superlative degree of comparison:",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Superlative adjectives always require the definite article 'the'."
    },
    {
      type: "Type 9: Ordinal Numbers",
      question: "Select the correct article: 'This is ___ third time I have watched this documentary.'",
      context: "Ordinal number sequencing:",
      options: ["a", "an", "the", "Ø (Zero)"],
      correct: "the",
      reason: "Ordinal numbers (first, second, third) designate unique sequence positions and take 'the'."
    },
    {
      type: "Type 10: Zero Article with Meals",
      question: "Which sentence correctly demonstrates zero article with everyday meals?",
      context: "Meals and daily routines:",
      options: [
        "We ate a breakfast at seven this morning.",
        "We ate the breakfast at seven this morning.",
        "We ate breakfast at seven this morning.",
        "We ate an breakfast at seven this morning."
      ],
      correct: "We ate breakfast at seven this morning.",
      reason: "Everyday meals take zero article when speaking generally."
    },
    {
      type: "Type 11: Fixed Prepositional Expressions",
      question: "Fill in the blank: 'He usually travels to work ___ bus.'",
      context: "Fixed idioms with 'by':",
      options: ["by a", "by an", "by the", "by Ø (zero)"],
      correct: "by Ø (zero)",
      reason: "'by + mode of transport' (by bus, by car, by train) takes zero article."
    },
    {
      type: "Type 12: Advanced Context & Abstract Nouns",
      question: "Fill in the blank: '___ knowledge required to pass this licensing exam is extensive.'",
      context: "Abstract noun with defining modifier:",
      options: ["A", "An", "The", "Ø (Zero)"],
      correct: "The",
      reason: "The abstract noun 'knowledge' is defined specifically by 'required to pass this licensing exam'."
    },
    {
      type: "Type 13: Common Mistakes Clinic",
      question: "Identify the mistake in: 'She is an university student living in the Pakistan.'",
      context: "Find and correct both errors:",
      options: [
        "Should be 'a university' and 'Pakistan' (zero article)",
        "Should be 'the university' and 'an Pakistan'",
        "Should be 'an university' and 'the Pakistan'",
        "Should be 'a university' and 'a Pakistan'"
      ],
      correct: "Should be 'a university' and 'Pakistan' (zero article)",
      reason: "'University' takes 'a' due to /j/ consonant sound, and single countries take zero article."
    },
    {
      type: "Type 14: British vs American Usage",
      question: "In standard British English, being hospitalized as a patient is expressed as:",
      context: "Dialectal institutional convention:",
      options: [
        "He is in a hospital.",
        "He is in hospital.",
        "He is in the hospital.",
        "He is in an hospital."
      ],
      correct: "He is in hospital.",
      reason: "British English uses 'in hospital' (zero article) for a patient, whereas American English uses 'in the hospital'."
    },
    {
      type: "Type 15: Generic Reference Styles",
      question: "Which of the following is an acceptable formal/scientific way to refer to the whole species?",
      context: "Generic reference structures:",
      options: [
        "The tiger is an endangered predator.",
        "Tigers are endangered predators.",
        "A tiger is an endangered predator.",
        "All three options are valid depending on style and register."
      ],
      correct: "All three options are valid depending on style and register.",
      reason: "English has 3 legitimate generic structures (The + singular, Plural + zero, A + singular)."
    }
  ];

  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function renderQuizQuestion() {
    const qTypeEl = document.getElementById('quizQuestionTypeBadge');
    const qNumEl = document.getElementById('quizCurrentNum');
    const qTotalEl = document.getElementById('quizTotalNum');
    const qScoreEl = document.getElementById('quizLiveScore');
    const qFillEl = document.getElementById('quizProgressFill');
    const qTextEl = document.getElementById('quizQuestionText');
    const qCtxEl = document.getElementById('quizQuestionContext');
    const optsGrid = document.getElementById('quizOptionsGrid');
    const fbBox = document.getElementById('quizFeedbackBox');
    const nextBtn = document.getElementById('quizNextBtn');

    if (!qTextEl || !optsGrid) return;

    quizAnswered = false;
    if (fbBox) fbBox.style.display = 'none';
    if (nextBtn) nextBtn.disabled = true;

    const q = QUIZ_QUESTIONS[quizIndex];

    if (qTypeEl) qTypeEl.textContent = q.type;
    if (qNumEl) qNumEl.textContent = quizIndex + 1;
    if (qTotalEl) qTotalEl.textContent = QUIZ_QUESTIONS.length;
    if (qScoreEl) qScoreEl.textContent = quizScore;
    if (qFillEl) qFillEl.style.width = `${((quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;

    qTextEl.textContent = q.question;
    if (qCtxEl) qCtxEl.textContent = q.context;

    // Randomize options
    const randomizedOptions = [...q.options].sort(() => Math.random() - 0.5);

    optsGrid.innerHTML = '';
    randomizedOptions.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${String.fromCharCode(65 + idx)}. ${opt}</span> <i class="fa-regular fa-circle"></i>`;

      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        quizAnswered = true;

        const allBtns = optsGrid.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(b => b.disabled = true);

        const isCorrect = (opt === q.correct);
        const fbStatus = document.getElementById('feedbackStatusText');
        const fbExpl = document.getElementById('feedbackExplText');

        if (isCorrect) {
          btn.classList.add('selected-correct');
          btn.querySelector('i').className = 'fa-solid fa-circle-check';
          quizScore++;
          if (qScoreEl) qScoreEl.textContent = quizScore;
          if (fbStatus) {
            fbStatus.className = 'feedback-status correct';
            fbStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct!';
          }
          recordQuestionAttempt(true);
        } else {
          btn.classList.add('selected-incorrect');
          btn.querySelector('i').className = 'fa-solid fa-circle-xmark';
          allBtns.forEach(b => {
            if (b.textContent.includes(q.correct)) {
              b.classList.add('selected-correct');
              b.querySelector('i').className = 'fa-solid fa-circle-check';
            }
          });
          if (fbStatus) {
            fbStatus.className = 'feedback-status incorrect';
            fbStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Incorrect';
          }
          recordQuestionAttempt(false);
        }

        if (fbExpl) fbExpl.textContent = q.reason;
        if (fbBox) fbBox.style.display = 'block';
        if (nextBtn) nextBtn.disabled = false;
      });

      optsGrid.appendChild(btn);
    });
  }

  function initQuiz() {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    const retryBtn = document.getElementById('retryQuizBtn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (quizIndex < QUIZ_QUESTIONS.length - 1) {
          quizIndex++;
          renderQuizQuestion();
        } else {
          showQuizResults();
        }
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        if (quizIndex < QUIZ_QUESTIONS.length - 1) {
          quizIndex++;
          renderQuizQuestion();
        } else {
          showQuizResults();
        }
      });
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        quizIndex = 0;
        quizScore = 0;
        document.getElementById('quizActiveBody').style.display = 'block';
        document.querySelector('.quiz-footer').style.display = 'flex';
        document.getElementById('quizResultsView').style.display = 'none';
        renderQuizQuestion();
      });
    }

    renderQuizQuestion();
  }

  function showQuizResults() {
    document.getElementById('quizActiveBody').style.display = 'none';
    document.querySelector('.quiz-footer').style.display = 'none';
    const resView = document.getElementById('quizResultsView');
    resView.style.display = 'block';

    const scoreDisplay = document.getElementById('finalScoreDisplay');
    const totalDisplay = document.getElementById('finalTotalDisplay');
    const percentDisplay = document.getElementById('finalPercentDisplay');
    const msgDisplay = document.getElementById('finalScoreMessage');

    const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
    if (scoreDisplay) scoreDisplay.textContent = quizScore;
    if (totalDisplay) totalDisplay.textContent = QUIZ_QUESTIONS.length;
    if (percentDisplay) percentDisplay.textContent = `${pct}%`;

    if (msgDisplay) {
      if (pct >= 90) {
        msgDisplay.textContent = '🎉 Master Level! You have total command of English articles, phonetics, and contextual nuance.';
      } else if (pct >= 70) {
        msgDisplay.textContent = '👏 Great Job! You understand the key rules well. Review the few tricky exceptions to reach 100%.';
      } else {
        msgDisplay.textContent = 'Keep practicing! Review the Sound Lab and Common Mistakes Clinic to strengthen your intuition.';
      }
    }
  }

  /* ============================================================
     15. ARTICLE MASTERY CHALLENGE (15 MULTI-BLANK EXERCISES)
     ============================================================ */
  const MASTERY_CHALLENGES = [
    {
      title: "First & Second Mention in Narrative",
      text: "She adopted [b1] dog from [b2] shelter yesterday. [b3] dog was very playful.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "a" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "a" },
        { id: "b3", options: ["A", "An", "The", "Ø"], correct: "The" }
      ],
      explanation: "Sentence 1 introduces unknown dog ('a') and unknown shelter ('a'). Sentence 2 identifies the specific adopted dog ('The')."
    },
    {
      title: "Phonetic Sound Exceptions",
      text: "He waited for [b1] hour before meeting [b2] European diplomat who had [b3] MBA degree.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "an" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "a" },
        { id: "b3", options: ["a", "an", "the", "Ø"], correct: "an" }
      ],
      explanation: "'Hour' has silent H (/aʊ/), 'European' starts with /j/ ('yoo'), and 'MBA' starts with vowel /ɛm/."
    },
    {
      title: "Geography: Oceans vs Countries",
      text: "They sailed across [b1] Pacific Ocean to visit [b2] Japan and explore [b3] Mount Fuji.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "Ø" },
        { id: "b3", options: ["a", "an", "the", "Ø"], correct: "Ø" }
      ],
      explanation: "Oceans take 'the' (the Pacific), while single countries (Japan) and single mountains (Mount Fuji) take zero article."
    },
    {
      title: "Uncountable Nouns & Superlatives",
      text: "He gave me [b1] advice on how to find [b2] best apartment in [b3] city center.",
      blanks: [
        { id: "b1", options: ["an", "some / Ø", "a", "the"], correct: "some / Ø" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b3", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "'Advice' is uncountable (zero article), 'best' is superlative ('the'), and 'city center' is specific in context ('the')."
    },
    {
      title: "Institutions & Musical Instruments",
      text: "While she was at [b1] university, she practiced [b2] violin for two hours [b3] day.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "Ø" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b3", options: ["a", "an", "the", "Ø"], correct: "a" }
      ],
      explanation: "UK: 'at university' (student purpose), musical instrument playing = 'the violin', rate = 'a day'."
    },
    {
      title: "Abstract Noun Specificity",
      text: "Although [b1] life can be unpredictable, [b2] life of Nelson Mandela inspired millions.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "Ø" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "General life = Zero article. Specific life defined by of-phrase = 'the life of Nelson Mandela'."
    },
    {
      title: "Modes of Travel & Time of Day",
      text: "We traveled [b1] train and arrived in Paris late [b2] night.",
      blanks: [
        { id: "b1", options: ["by a", "by an", "by the", "by Ø"], correct: "by Ø" },
        { id: "b2", options: ["at a", "at an", "at the", "at Ø"], correct: "at Ø" }
      ],
      explanation: "Fixed expressions: 'by train' and 'at night' both take zero article."
    },
    {
      title: "Plural Republics & Mountain Ranges",
      text: "They hiked across [b1] Alps before flying to [b2] United Kingdom.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "Plural mountain ranges (the Alps) and political kingdoms/unions (the UK) take 'the'."
    },
    {
      title: "General Plurals vs Specific Plurals",
      text: "[b1] Books provide knowledge, but [b2] books on that shelf are rare manuscripts.",
      blanks: [
        { id: "b1", options: ["A", "An", "The", "Ø"], correct: "Ø" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "General plural statement = Zero article. Specific restricted plural = 'the books on that shelf'."
    },
    {
      title: "Acronyms & Professions",
      text: "He works as [b1] FBI agent and speaks [b2] fluent English.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "an" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "Ø" }
      ],
      explanation: "'FBI' starts with vowel sound /ɛf/ → 'an'. Languages take zero article → 'English'."
    },
    {
      title: "One-Time Events & Ordinals",
      text: "It was [b1] one-time opportunity to attend [b2] first lecture of the semester.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "a" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "'One-time' starts with consonant glide /w/ → 'a'. Ordinals take 'the'."
    },
    {
      title: "Unique Things & Physical Context",
      text: "Please open [b1] window so we can see [b2] sun rising.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "Specific window in the room ('the window') and unique celestial object ('the sun')."
    },
    {
      title: "Categories of People in Society",
      text: "The charity provides hot meals for [b1] homeless and [b2] unemployed.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "the" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "'The + adjective' refers to the whole group in society (the homeless, the unemployed)."
    },
    {
      title: "Meals & Specific Dinners",
      text: "We usually have [b1] dinner at home, but [b2] dinner we had at that French bistro was unforgettable.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "Ø" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "the" }
      ],
      explanation: "General meal = zero article ('have dinner'). Specific memorable meal = 'the dinner we had'."
    },
    {
      title: "Double Sound Check Challenge",
      text: "She received [b1] honorable discharge and founded [b2] unique non-profit organization.",
      blanks: [
        { id: "b1", options: ["a", "an", "the", "Ø"], correct: "an" },
        { id: "b2", options: ["a", "an", "the", "Ø"], correct: "a" }
      ],
      explanation: "'Honorable' has silent H → 'an'. 'Unique' starts with /j/ ('yoo') → 'a'."
    }
  ];

  let masteryIndex = 0;

  function renderMasteryChallenge() {
    const body = document.getElementById('masteryBody');
    const currEl = document.getElementById('masteryCurrentIndex');
    const scoreEl = document.getElementById('masteryLiveScore');
    const prevBtn = document.getElementById('masteryPrevBtn');
    const nextBtn = document.getElementById('masteryNextBtn');
    if (!body) return;

    const challenge = MASTERY_CHALLENGES[masteryIndex];
    if (currEl) currEl.textContent = masteryIndex + 1;
    if (scoreEl) scoreEl.textContent = state.masteryScore;

    let passageHtml = challenge.text;
    challenge.blanks.forEach(b => {
      const selectHtml = `
        <select class="blank-select" id="blankSelect_${b.id}">
          <option value="">[ ? ]</option>
          ${b.options.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>
      `;
      passageHtml = passageHtml.replace(`[${b.id}]`, selectHtml);
    });

    body.innerHTML = `
      <h4 style="font-size: 1.15rem; color: var(--cyan); margin-bottom: 0.75rem;">${challenge.title}</h4>
      <div class="mastery-passage">${passageHtml}</div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <button class="btn btn-primary btn-sm" id="checkMasteryBtn">Check Answers</button>
        <span id="masteryFeedbackStatus" style="font-weight: 700; font-size: 0.95rem;"></span>
      </div>
      <div id="masteryExplBox" style="display: none; margin-top: 1.25rem; padding: 1rem; background: rgba(0, 0, 0, 0.35); border-left: 4px solid var(--pink); border-radius: 0 8px 8px 0; color: #E2E8F0;">
        <strong>Explanation:</strong> ${challenge.explanation}
      </div>
    `;

    const checkBtn = document.getElementById('checkMasteryBtn');
    const fbStatus = document.getElementById('masteryFeedbackStatus');
    const explBox = document.getElementById('masteryExplBox');

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        let allCorrect = true;
        challenge.blanks.forEach(b => {
          const sel = document.getElementById(`blankSelect_${b.id}`);
          if (sel) {
            const val = sel.value.trim();
            if (val.toLowerCase() === b.correct.toLowerCase() || (b.correct.includes('/') && b.correct.toLowerCase().includes(val.toLowerCase()))) {
              sel.style.borderColor = '#10B981';
              sel.style.background = 'rgba(16, 185, 129, 0.2)';
            } else {
              sel.style.borderColor = '#EF4444';
              sel.style.background = 'rgba(239, 68, 68, 0.2)';
              allCorrect = false;
            }
          }
        });

        if (allCorrect) {
          fbStatus.style.color = '#34D399';
          fbStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Perfect! All blanks correctly identified.';
          state.masteryScore = Math.max(state.masteryScore, masteryIndex + 1);
          recordQuestionAttempt(true);
        } else {
          fbStatus.style.color = '#F87171';
          fbStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Check the highlighted red blanks.';
          recordQuestionAttempt(false);
        }

        if (scoreEl) scoreEl.textContent = state.masteryScore;
        if (explBox) explBox.style.display = 'block';
        persistData();
      });
    }

    if (prevBtn) prevBtn.disabled = masteryIndex === 0;
    if (nextBtn) nextBtn.disabled = masteryIndex === MASTERY_CHALLENGES.length - 1;
  }

  function initMastery() {
    const prevBtn = document.getElementById('masteryPrevBtn');
    const nextBtn = document.getElementById('masteryNextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (masteryIndex > 0) {
          masteryIndex--;
          renderMasteryChallenge();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (masteryIndex < MASTERY_CHALLENGES.length - 1) {
          masteryIndex++;
          renderMasteryChallenge();
        }
      });
    }

    renderMasteryChallenge();
  }

  /* ============================================================
     16. LIVE SEARCH ENGINE
     ============================================================ */
  const SEARCH_INDEX = [
    { cat: "Indefinite Article", title: "Rule for 'A'", snippet: "Use A before singular countable nouns starting with consonant sounds (e.g. a book, a university, a European).", link: "#sectionA" },
    { cat: "Indefinite Article", title: "Rule for 'AN'", snippet: "Use AN before singular countable nouns starting with vowel sounds (e.g. an apple, an hour, an MBA).", link: "#sectionAn" },
    { cat: "Definite Article", title: "9 Uses of 'THE'", snippet: "Used for second mention, specific items, unique objects, superlatives, ordinals, oceans, and instruments.", link: "#sectionThe" },
    { cat: "Zero Article", title: "When NO Article is Used (Ø)", snippet: "Used for general plurals, general uncountables, single countries (Pakistan), languages, and meals.", link: "#sectionZero" },
    { cat: "Phonetics", title: "A vs AN Sound Lab", snippet: "Sound-based rules: silent H (an hour), consonant glide /j/ (a university, a European), acronyms (an MBA, an FBI).", link: "#soundLab" },
    { cat: "Countability", title: "Countable vs Uncountable Nouns", snippet: "Uncountable traps: advice, information, furniture, equipment, knowledge, news, luggage, traffic.", link: "#countableUncountableBlock" },
    { cat: "Geography", title: "Geographical Rules", snippet: "The Pacific, the Alps, the UK vs Pakistan, Asia, Lake Superior, Mount Everest.", link: "#geographyBlock" },
    { cat: "Institutions", title: "Institutions (School, Hospital, Bed)", snippet: "Primary purpose (at school, in hospital) vs physical building (at the school, visit the hospital).", link: "#institutionsBlock" },
    { cat: "Fixed Idioms", title: "Prepositional Expressions", snippet: "by car, by train, at night (Zero Article) vs in the morning, in the afternoon (THE).", link: "#fixedExpressionsBlock" },
    { cat: "Interactive Guide", title: "Article Decision Tree", snippet: "3-step interactive flowchart to determine whether you need A, AN, THE, or Zero Article.", link: "#decisionGuide" },
    { cat: "Practice", title: "Common Mistakes Clinic", snippet: "10 frequent mistakes with wrong forms, corrected versions, and grammatical reasons.", link: "#mistakesClinic" },
    { cat: "Memory Deck", title: "3D Grammar Flashcards", snippet: "10 3D flip cards covering core rules, superlatives, first/second mention, and countability.", link: "#flashcardSection" }
  ];

  function initSearch() {
    const modal = document.getElementById('searchModal');
    const openBtn = document.getElementById('openSearchBtn');
    const input = document.getElementById('globalSearchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const countEl = document.getElementById('searchResultsCount');
    const listEl = document.getElementById('searchResultsList');

    if (!modal || !input) return;

    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 100);
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (openBtn) openBtn.addEventListener('click', openModal);

    // Keyboard shortcut: Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('active')) closeModal();
        else openModal();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        renderResults('');
      });
    }

    input.addEventListener('input', () => {
      renderResults(input.value.trim().toLowerCase());
    });

    function renderResults(query) {
      if (!listEl) return;
      listEl.innerHTML = '';

      if (!query) {
        if (countEl) countEl.textContent = 'Type to search the grammar database';
        SEARCH_INDEX.slice(0, 5).forEach(item => {
          listEl.appendChild(createResultItem(item));
        });
        return;
      }

      const matches = SEARCH_INDEX.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.snippet.toLowerCase().includes(query) ||
               item.cat.toLowerCase().includes(query);
      });

      if (countEl) countEl.textContent = `${matches.length} results found for "${query}"`;

      if (matches.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--muted-text);">
            <i class="fa-solid fa-circle-question" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
            <p>No matches found for "${query}". Try searching 'university', 'geography', 'sound', or 'advice'.</p>
          </div>
        `;
        return;
      }

      matches.forEach(item => {
        listEl.appendChild(createResultItem(item));
      });
    }

    function createResultItem(item) {
      const el = document.createElement('div');
      el.className = 'search-result-item';
      el.innerHTML = `
        <div class="res-category">${item.cat}</div>
        <div class="res-title">${item.title}</div>
        <div class="res-snippet">${item.snippet}</div>
      `;
      el.addEventListener('click', () => {
        closeModal();
        window.location.hash = item.link;
      });
      return el;
    }
  }

  /* ============================================================
     17. BOOKMARK SYSTEM ("SAVED GRAMMAR")
     ============================================================ */
  const BOOKMARKABLE_ITEMS = {
    'rule-what-is-article': { title: "What is an Article?", desc: "Articles are determiners specifying whether a noun is indefinite, definite, or general.", link: "#whatIsArticleBlock" },
    'rule-section-a': { title: "Indefinite Article 'A'", desc: "Used before singular countable nouns starting with consonant sounds.", link: "#sectionA" },
    'rule-section-an': { title: "Indefinite Article 'AN'", desc: "Used before singular countable nouns starting with vowel sounds.", link: "#sectionAn" },
    'rule-section-the': { title: "Definite Article 'THE'", desc: "9 major uses including unique objects, superlatives, and identified items.", link: "#sectionThe" },
    'rule-section-zero': { title: "Zero Article (Ø)", desc: "Omitting articles for general plurals, uncountables, single countries, and meals.", link: "#sectionZero" },
    'rule-count-uncount': { title: "Countable vs Uncountable Traps", desc: "Advice, information, furniture, and equipment never take 'an'.", link: "#countableUncountableBlock" },
    'rule-generic-ref': { title: "Generic Reference (3 Styles)", desc: "Comparing tigers, a tiger, and the tiger.", link: "#genericReferenceBlock" },
    'rule-abstract-nouns': { title: "Abstract Nouns", desc: "General concepts (Ø) vs defined specific concepts (THE).", link: "#abstractNounsBlock" },
    'rule-geography': { title: "Geographical Conventions", desc: "Oceans & ranges take THE; single countries and mountains take Zero Article.", link: "#geographyBlock" },
    'rule-institutions': { title: "Institutions & Places", desc: "Primary purpose (at school) vs physical building (at the school).", link: "#institutionsBlock" },
    'rule-fixed-expressions': { title: "Fixed Prepositional Idioms", desc: "by car, at night (Ø) vs in the morning (THE).", link: "#fixedExpressionsBlock" }
  };

  function updateBookmarkBadge() {
    const badge = document.getElementById('bookmarkCount');
    const drawerCount = document.getElementById('drawerBookmarkCount');
    if (badge) badge.textContent = bookmarks.length;
    if (drawerCount) drawerCount.textContent = bookmarks.length;

    // Update bookmark buttons state
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      const id = btn.dataset.id;
      if (bookmarks.some(b => b.id === id)) {
        btn.classList.add('saved');
        btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      } else {
        btn.classList.remove('saved');
        btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      }
    });

    renderSavedDrawer();
  }

  function toggleBookmark(id) {
    const itemData = BOOKMARKABLE_ITEMS[id];
    if (!itemData) return;

    const existingIndex = bookmarks.findIndex(b => b.id === id);
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      showToast(`Removed "${itemData.title}" from saved notes.`);
    } else {
      bookmarks.push({ id, ...itemData });
      showToast(`Saved "${itemData.title}" to grammar notes!`);
    }
    persistData();
  }

  function renderSavedDrawer() {
    const listEl = document.getElementById('savedItemsList');
    const emptyEl = document.getElementById('emptyBookmarksMessage');
    if (!listEl || !emptyEl) return;

    listEl.innerHTML = '';
    if (bookmarks.length === 0) {
      emptyEl.style.display = 'block';
    } else {
      emptyEl.style.display = 'none';
      bookmarks.forEach(b => {
        const card = document.createElement('div');
        card.className = 'saved-item-card';
        card.innerHTML = `
          <div style="flex-grow: 1; cursor: pointer;">
            <div class="saved-item-title">${b.title}</div>
            <div class="saved-item-desc">${b.desc}</div>
          </div>
          <button class="remove-saved-btn" title="Remove bookmark"><i class="fa-solid fa-trash"></i></button>
        `;

        card.querySelector('.saved-item-title').parentElement.addEventListener('click', () => {
          document.getElementById('bookmarksDrawer').classList.remove('open');
          window.location.hash = b.link;
        });

        card.querySelector('.remove-saved-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          toggleBookmark(b.id);
        });

        listEl.appendChild(card);
      });
    }
  }

  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function initBookmarks() {
    const openBtn = document.getElementById('openBookmarksBtn');
    const closeBtn = document.getElementById('closeBookmarksBtn');
    const drawer = document.getElementById('bookmarksDrawer');
    const clearBtn = document.getElementById('clearAllBookmarksBtn');

    if (openBtn && drawer) {
      openBtn.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        bookmarks = [];
        persistData();
        showToast('Cleared all saved grammar notes.');
      });
    }

    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        toggleBookmark(id);
      });
    });

    updateBookmarkBadge();
  }

  /* ============================================================
     18. NAVIGATION, READING PROGRESS & INTERSECTION OBSERVER
     ============================================================ */
  function initNavigationAndScroll() {
    const bar = document.getElementById('readingProgressBar');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const resetProgBtn = document.getElementById('resetProgressBtn');

    // Scroll reading progress
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      if (bar) bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    });

    // Mobile navigation toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
      });

      document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Reset progress button
    if (resetProgBtn) {
      resetProgBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your learning progress and quiz scores?')) {
          state = {
            lessonsViewed: [],
            questionsAnswered: 0,
            questionsCorrect: 0,
            soundLabSolved: [],
            dragDropScore: 0,
            flashcardsKnown: [],
            masteryScore: 0,
            dailyQuizCompleted: false
          };
          persistData();
          showToast('Learning progress reset.');
        }
      });
    }

    // Track lesson viewing with IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            recordLessonView(entry.target.id);
          }
        });
      }, { threshold: 0.4 });

      const trackedSections = [
        'whatIsArticleBlock',
        'sectionA',
        'sectionAn',
        'soundLab',
        'sectionThe',
        'sectionZero',
        'level2',
        'level3'
      ];

      trackedSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    // Story buttons
    const prevStory = document.getElementById('prevStoryStepBtn');
    const nextStory = document.getElementById('nextStoryStepBtn');
    if (prevStory) {
      prevStory.addEventListener('click', () => {
        if (currentStoryIndex > 0) {
          currentStoryIndex--;
          renderStoryStep();
        }
      });
    }
    if (nextStory) {
      nextStory.addEventListener('click', () => {
        if (currentStoryIndex < STORY_STEPS.length - 1) {
          currentStoryIndex++;
          renderStoryStep();
        }
      });
    }

    // Advanced lab buttons
    const advPrev = document.getElementById('advLabPrevBtn');
    const advNext = document.getElementById('advLabNextBtn');
    if (advPrev) {
      advPrev.addEventListener('click', () => {
        if (advLabIndex > 0) {
          advLabIndex--;
          renderAdvLabQuestion();
        }
      });
    }
    if (advNext) {
      advNext.addEventListener('click', () => {
        if (advLabIndex < ADVANCED_LAB_QUESTIONS.length - 1) {
          advLabIndex++;
          renderAdvLabQuestion();
        }
      });
    }

    // Sentence selector
    const detSelect = document.getElementById('detectorSentenceSelect');
    if (detSelect) {
      detSelect.addEventListener('change', (e) => {
        renderDetectorSentence(parseInt(e.target.value, 10));
      });
    }
  }

  /* ============================================================
     19. INITIALIZATION BOOTSTRAPPER
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initDailyArticle();
    updateDashboardUI();
    initSoundLab();
    renderStoryStep();
    initClassifier();
    initUncountableTraps();
    renderAdvLabQuestion();
    initMistakesClinic();
    initScenarios();
    renderDetectorSentence(0);
    initDragAndDrop();
    initFlashcards();
    initQuiz();
    initMastery();
    initSearch();
    initBookmarks();
    initNavigationAndScroll();
  });

})();
