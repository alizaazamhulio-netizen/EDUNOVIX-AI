/**
 * EduNexa AI — English MDCAT Portal Controller
 * Manages search, filters, progress state, 20-MCQ mock exam,
 * daily practice drills, revision accordions, day/night mode, and achievements.
 */
const STUDYMATE = (() => {
  // ==========================================
  // 1. DATA REPOSITORY
  // ==========================================
  const TOPICS_CONFIG = [
    {
      id: 'active-passive-voice',
      title: 'Active & Passive Voice',
      file: 'active-passive-voice.html',
      category: 'grammar',
      badgeId: 'status-badge-active-passive',
      cardId: 'card-active-passive'
    },
    {
      id: 'direct-indirect-speech',
      title: 'Direct & Indirect Speech',
      file: 'direct-indirect-speech.html',
      category: 'grammar',
      badgeId: 'status-badge-direct-indirect',
      cardId: 'card-direct-indirect'
    },
    {
      id: 'error-detection',
      title: 'Error Detection',
      file: 'error-detection.html',
      category: 'grammar',
      badgeId: 'status-badge-error-detection',
      cardId: 'card-error-detection'
    },
    {
      id: 'parts-of-speech',
      title: 'Parts of Speech',
      file: 'parts-of-speech.html',
      category: 'grammar',
      badgeId: 'status-badge-parts-of-speech',
      cardId: 'card-parts-of-speech'
    },
    {
      id: 'punctuation',
      title: 'Punctuation',
      file: 'punctuation.html',
      category: 'grammar',
      badgeId: 'status-badge-punctuation',
      cardId: 'card-punctuation'
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension',
      file: 'reading-comprehension.html',
      category: 'comprehension',
      badgeId: 'status-badge-reading-comprehension',
      cardId: 'card-reading-comp'
    },
    {
      id: 'synonyms-antonyms',
      title: 'Synonyms & Antonyms',
      file: 'synonyms-antonyms.html',
      category: 'vocabulary',
      badgeId: 'status-badge-synonyms-antonyms',
      cardId: 'card-synonyms-antonyms'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      file: 'vocabulary.html',
      category: 'vocabulary',
      badgeId: 'status-badge-vocabulary',
      cardId: 'card-vocabulary'
    }
  ];

  // 20 Realistic Authentic English MDCAT MCQs
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      category: 'Active & Passive Voice',
      question: 'Choose the correct passive voice: "The surgeon was performing a complex bypass surgery."',
      options: [
        'A complex bypass surgery has been performed by the surgeon.',
        'A complex bypass surgery was being performed by the surgeon.',
        'A complex bypass surgery is being performed by the surgeon.',
        'A complex bypass surgery had been performed by the surgeon.'
      ],
      answer: 1,
      explanation: 'Past Continuous tense in active voice ("was performing") converts to "was/were + being + V3" ("was being performed") in passive voice.'
    },
    {
      id: 2,
      category: 'Direct & Indirect Speech',
      question: 'Identify the correct indirect speech: The professor said to the students, "Do not forget to submit your lab reports tomorrow."',
      options: [
        'The professor advised the students not to forget to submit their lab reports the next day.',
        'The professor told the students to not forgot submitting their lab reports tomorrow.',
        'The professor ordered the students that do not forget to submit their lab reports the next day.',
        'The professor asked the students they should not forget submitting their lab reports yesterday.'
      ],
      answer: 0,
      explanation: 'Negative imperatives change to "advised/instructed + object + not to + V1". "Tomorrow" converts to "the next day", and "your" converts to "their".'
    },
    {
      id: 3,
      category: 'Subject-Verb Agreement',
      question: 'Select the grammatically correct sentence:',
      options: [
        'The committee have reached an unanimous decision after hours of debate.',
        'Neither the principal nor the lecturers was present at the annual symposium.',
        'The team of doctors, along with several nurses, has arrived at the trauma center.',
        'Every boy and girl in the medical college are required to wear a lab coat.'
      ],
      answer: 2,
      explanation: 'In option C, the phrase "along with several nurses" is a parenthetical prepositional phrase; the singular subject "The team of doctors" governs the singular verb "has arrived".'
    },
    {
      id: 4,
      category: 'Error Detection',
      question: 'Identify the underlined segment containing an error: "Scarcely had the doctor [A] entered the ward [B] than the patient [C] began to experience [D] palpitations."',
      options: [
        '[A] Scarcely had the doctor',
        '[B] entered the ward',
        '[C] than the patient',
        '[D] began to experience'
      ],
      answer: 2,
      explanation: '"Scarcely" and "Hardly" are correlatively paired with "when" or "before", never with "than". "Than" is exclusively used with "No sooner".'
    },
    {
      id: 5,
      category: 'Parts of Speech',
      question: 'In the sentence: "Smoking in the hospital vicinity is strictly prohibited," the word "Smoking" functions as a/an:',
      options: [
        'Present Participle',
        'Gerund (Verbal Noun)',
        'Adverb of Manner',
        'Infinitive'
      ],
      answer: 1,
      explanation: '"Smoking" is an -ing form of a verb acting as the grammatical subject of the sentence; hence, it is a Gerund.'
    },
    {
      id: 6,
      category: 'Punctuation',
      question: 'Which of the following sentences exhibits flawless punctuation?',
      options: [
        'The patient needed three medications: aspirin, penicillin, and a sedative.',
        'The patient needed three medications, aspirin, penicillin and a sedative.',
        'The patient needed; three medications: aspirin penicillin and a sedative.',
        'The patient needed three medications: aspirin; penicillin; and a sedative.'
      ],
      answer: 0,
      explanation: 'A colon is properly used after a complete independent clause to introduce an enumerated list of items separated by commas with an Oxford comma.'
    },
    {
      id: 7,
      category: 'Synonyms',
      question: 'Choose the most accurate synonym for "PRAGMATIC":',
      options: [
        'Idealistic',
        'Practical',
        'Theoretical',
        'Dogmatic'
      ],
      answer: 1,
      explanation: '"Pragmatic" means dealing with things sensibly and realistically based on practical rather than theoretical considerations.'
    },
    {
      id: 8,
      category: 'Antonyms',
      question: 'Choose the most accurate antonym for "BENEVOLENT":',
      options: [
        'Altruistic',
        'Magnanimous',
        'Malevolent',
        'Sympathetic'
      ],
      answer: 2,
      explanation: '"Benevolent" means well-meaning and kindly (root: bene- = good). Its exact antonym is "Malevolent" (root: male- = bad/harmful).'
    },
    {
      id: 9,
      category: 'Vocabulary in Context',
      question: 'The pathogen was so _____ that even minimal exposure triggered severe respiratory distress.',
      options: [
        'Benign',
        'Virulent',
        'Inocuous',
        'Dormant'
      ],
      answer: 1,
      explanation: '"Virulent" means extremely severe, infectious, or harmful in its effects, fitting the context of minimal exposure causing acute illness.'
    },
    {
      id: 10,
      category: 'Conditionals',
      question: 'Choose the correct conditional form: "If the researcher _____ the trial earlier, the data discrepancies would have been prevented."',
      options: [
        'audited',
        'has audited',
        'had audited',
        'would audit'
      ],
      answer: 2,
      explanation: 'Third conditional (impossible past condition) follows the formula: If + Past Perfect ("had audited"), would have + past participle ("would have been prevented").'
    },
    {
      id: 11,
      category: 'Error Detection',
      question: 'Choose the sentence that contains a dangling modifier error:',
      options: [
        'After examining the X-rays, the radiologist delivered the diagnosis.',
        'While walking through the clinical lab, a vial of serum was shattered by the nurse.',
        'Having completed the internship, Dr. Sara applied for residency.',
        'To ensure sterile conditions, all surgical instruments must be autoclaved.'
      ],
      answer: 1,
      explanation: 'In option B, the introductory participial phrase "While walking through the clinical lab" modifies "a vial of serum", which cannot walk. The subject performing the action is the nurse.'
    },
    {
      id: 12,
      category: 'Active & Passive Voice',
      question: 'Convert to Active Voice: "Why were you reprimanded by the chief medical officer?"',
      options: [
        'Why did the chief medical officer reprimand you?',
        'Why has the chief medical officer reprimanded you?',
        'Why was the chief medical officer reprimanding you?',
        'Why the chief medical officer reprimanded you?'
      ],
      answer: 0,
      explanation: 'Passive interrogative in simple past ("Why were you reprimanded...?") converts to "Why did + Subject + V1...?" in active voice.'
    },
    {
      id: 13,
      category: 'Direct & Indirect Speech',
      question: 'Convert to Indirect: The patient inquired, "Will the anesthesia wear off before noon?"',
      options: [
        'The patient inquired if the anesthesia would wear off before noon.',
        'The patient inquired that will the anesthesia wear off before noon.',
        'The patient asked whether the anesthesia will wear off before noon.',
        'The patient inquired if the anesthesia wore off before noon.'
      ],
      answer: 0,
      explanation: 'Yes/No interrogatives take "if/whether", the auxiliary "will" shifts to "would", and the question structure converts to an affirmative clause.'
    },
    {
      id: 14,
      category: 'Synonyms',
      question: 'Choose the word closest in meaning to "LUCID":',
      options: [
        'Ambiguous',
        'Opaque',
        'Clear and easily understood',
        'Mysterious'
      ],
      answer: 2,
      explanation: '"Lucid" originates from Latin lucidus (light/clear), meaning clear, intelligible, and easily comprehended.'
    },
    {
      id: 15,
      category: 'Antonyms',
      question: 'Select the exact antonym for "METICULOUS":',
      options: [
        'Painstaking',
        'Fastidious',
        'Careless',
        'Scrupulous'
      ],
      answer: 2,
      explanation: '"Meticulous" means showing great attention to detail and thorough precision. Its opposite is "Careless" or "Sloppy".'
    },
    {
      id: 16,
      category: 'Prepositions',
      question: 'The young surgeon was completely absorbed _____ his clinical research.',
      options: [
        'at',
        'in',
        'with',
        'for'
      ],
      answer: 1,
      explanation: 'The adjective "absorbed" takes the dependent preposition "in" when indicating engrossment or immersion in an activity.'
    },
    {
      id: 17,
      category: 'Reading Comprehension',
      question: 'Passage excerpt: "Antibiotic resistance is no longer a future threat; it is a current global healthcare crisis driven by widespread overprescription." What is the primary implication of this statement?',
      options: [
        'Antibiotics are inherently harmful and should never be prescribed.',
        'Overprescription is an active and urgent driver of antibiotic resistance today.',
        'Resistance will only become problematic in the next century.',
        'Healthcare workers have eradicated most drug-resistant bacterial strains.'
      ],
      answer: 1,
      explanation: 'The excerpt clearly states that resistance is a "current global crisis" directly "driven by widespread overprescription".'
    },
    {
      id: 18,
      category: 'Vocabulary',
      question: 'What is the meaning of the medical-root derived word "UBIQUITOUS"?',
      options: [
        'Extremely rare',
        'Found or existing everywhere',
        'Harmful to living organisms',
        'Temporary and unstable'
      ],
      answer: 1,
      explanation: '"Ubiquitous" means present, appearing, or found everywhere simultaneously (e.g. ubiquitous microorganisms).'
    },
    {
      id: 19,
      category: 'Punctuation',
      question: 'Choose the correct use of semicolon and comma in a compound sentence:',
      options: [
        'The symptoms subsided; however, the infection remained active.',
        'The symptoms subsided, however; the infection remained active.',
        'The symptoms subsided; however the infection remained active.',
        'The symptoms subsided however, the infection remained active.'
      ],
      answer: 0,
      explanation: 'When connecting two independent clauses with a conjunctive adverb like "however", use a semicolon before it and a comma after it.'
    },
    {
      id: 20,
      category: 'Parts of Speech',
      question: 'In the sentence: "The newly qualified doctor worked very diligently," the word "diligently" is an:',
      options: [
        'Adjective modifying doctor',
        'Adverb modifying worked',
        'Noun functioning as an object',
        'Conjunction connecting clauses'
      ],
      answer: 1,
      explanation: '"Diligently" describes the manner in which the doctor "worked" (verb), making it an Adverb of Manner.'
    }
  ];

  // 10 Daily Practice Drill Questions
  const DAILY_QUESTIONS = [
    {
      id: 1,
      tag: 'Subject-Verb Agreement',
      question: 'Neither the doctor nor the nurses _____ present in the emergency ward yesterday.',
      options: ['A. was', 'B. were', 'C. is', 'D. are'],
      answer: 1,
      explanation: 'With "neither...nor", the verb agrees with the closer subject ("the nurses" - plural), hence "were".'
    },
    {
      id: 2,
      tag: 'Voice Transformation',
      question: 'Active: "They will announce the MDCAT merit list on Friday." Passive:',
      options: [
        'A. The MDCAT merit list will announced by them on Friday.',
        'B. The MDCAT merit list will be announced on Friday.',
        'C. The MDCAT merit list shall being announced on Friday.',
        'D. The MDCAT merit list has been announced on Friday.'
      ],
      answer: 1,
      explanation: 'Future simple ("will announce") converts to "will be + V3" ("will be announced").'
    },
    {
      id: 3,
      tag: 'Error Spotting',
      question: 'Spot the error: "Each of the candidates have submitted their original certificates."',
      options: [
        'A. Each of the candidates',
        'B. have submitted',
        'C. their original',
        'D. certificates'
      ],
      answer: 1,
      explanation: '"Each" is singular and requires the singular verb "has submitted", not "have submitted".'
    },
    {
      id: 4,
      tag: 'Vocabulary / Synonyms',
      question: 'Choose the synonym of "CANDID":',
      options: ['A. Deceitful', 'B. Frank and straightforward', 'C. Secretive', 'D. Complex'],
      answer: 1,
      explanation: '"Candid" means truthful, straightforward, and sincere.'
    },
    {
      id: 5,
      tag: 'Vocabulary / Antonyms',
      question: 'Choose the antonym of "LETHARGIC":',
      options: ['A. Sluggish', 'B. Energetic', 'C. Drowsy', 'D. Apathetic'],
      answer: 1,
      explanation: '"Lethargic" means slow, sluggish, and lacking energy. Its antonym is "Energetic".'
    },
    {
      id: 6,
      tag: 'Punctuation',
      question: 'Identify the correctly punctuated possessive form:',
      options: [
        'A. The students lab coats were hung neatly.',
        'B. The students\' lab coats were hung neatly.',
        'C. The student\'s lab coats were hung neatly (referring to plural students).',
        'D. The students\'s lab coats were hung neatly.'
      ],
      answer: 1,
      explanation: 'For a regular plural noun ending in "s" (students), add an apostrophe at the end: students\'.'
    },
    {
      id: 7,
      tag: 'Narration',
      question: 'Ali said, "I have been revising biology since morning." Indirect:',
      options: [
        'A. Ali said that he had been revising biology since morning.',
        'B. Ali said that I had been revising biology since morning.',
        'C. Ali said that he has been revising biology since morning.',
        'D. Ali told he was revising biology since morning.'
      ],
      answer: 0,
      explanation: 'Present Perfect Continuous ("have been revising") changes to Past Perfect Continuous ("had been revising").'
    },
    {
      id: 8,
      tag: 'Prepositional Usage',
      question: 'He is not accustomed _____ working late night hospital shifts.',
      options: ['A. with', 'B. for', 'C. to', 'D. in'],
      answer: 2,
      explanation: 'The fixed expression is "accustomed to + noun/gerund".'
    },
    {
      id: 9,
      tag: 'Subjunctive Mood',
      question: 'The medical board insisted that every intern _____ on time.',
      options: ['A. is', 'B. was', 'C. be', 'D. are'],
      answer: 2,
      explanation: 'Subjunctive mood following verbs of demand/insistence uses the base form of the verb: "that every intern be...".'
    },
    {
      id: 10,
      tag: 'Commonly Confused Words',
      question: 'The new clinical protocol had a positive _____ on recovery rates.',
      options: ['A. affect', 'B. effect', 'C. effected', 'D. effecting'],
      answer: 1,
      explanation: '"Effect" is the noun meaning result/consequence. "Affect" is the verb.'
    }
  ];

  // ==========================================
  // 2. INTERNAL STATE & STORAGE
  // ==========================================
  const STORAGE_KEYS = {
    COMPLETED_TOPICS: 'studymate_completed_topics',
    LAST_TOPIC: 'studymate_last_topic',
    QUIZ_STATS: 'studymate_quiz_stats',
    DAILY_STREAK: 'studymate_daily_streak',
    THEME: 'studymate_theme'
  };

  let state = {
    completedTopics: [],
    lastTopic: null,
    quizStats: {
      attempts: 0,
      bestScore: 0,
      totalQuestions: 0,
      totalCorrect: 0
    },
    dailyStreak: {
      streak: 1,
      todayAttempted: 0,
      todayCorrect: 0,
      lastDate: new Date().toISOString().split('T')[0]
    },
    activeFilter: 'all',
    searchQuery: '',
    // Quiz Session State
    quiz: {
      active: false,
      currentQuestionIndex: 0,
      userAnswers: new Array(20).fill(null),
      timerSeconds: 1200, // 20 minutes
      timerInterval: null,
      startTime: null
    },
    // Daily Drill Session State
    daily: {
      currentIndex: 0,
      answered: false,
      attemptedCount: 0,
      correctCount: 0
    }
  };

  // ==========================================
  // 3. PERSISTENCE HELPERS
  // ==========================================
  const loadState = () => {
    try {
      const savedTopics = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      if (savedTopics) state.completedTopics = JSON.parse(savedTopics);

      const savedLast = localStorage.getItem(STORAGE_KEYS.LAST_TOPIC);
      if (savedLast) state.lastTopic = JSON.parse(savedLast);

      const savedStats = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
      if (savedStats) state.quizStats = JSON.parse(savedStats);

      const savedDaily = localStorage.getItem(STORAGE_KEYS.DAILY_STREAK);
      if (savedDaily) {
        const parsedDaily = JSON.parse(savedDaily);
        const todayStr = new Date().toISOString().split('T')[0];
        if (parsedDaily.lastDate === todayStr) {
          state.dailyStreak = parsedDaily;
        } else {
          // Check if yesterday for streak maintenance
          const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];
          state.dailyStreak = {
            streak: parsedDaily.lastDate === yesterday ? parsedDaily.streak + 1 : 1,
            todayAttempted: 0,
            todayCorrect: 0,
            lastDate: todayStr
          };
          saveDailyStreak();
        }
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
  };

  const saveCompletedTopics = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(state.completedTopics));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveLastTopic = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_TOPIC, JSON.stringify(state.lastTopic));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveQuizStats = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(state.quizStats));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveDailyStreak = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, JSON.stringify(state.dailyStreak));
    } catch (e) {
      console.warn(e);
    }
  };

  // ==========================================
  // 4. DAY / NIGHT THEME CONTROLLER
  // ==========================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    // Respect user's saved choice; otherwise default to clean light mode
    const activeTheme = savedTheme || 'light';
    applyTheme(activeTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-theme');
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        try {
          localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
        } catch (e) {
          console.warn(e);
        }
        showToast(`Switched to ${nextTheme === 'dark' ? 'Night (Dark)' : 'Day (Light)'} Mode`, nextTheme === 'dark' ? '🌙' : '☀️');
      });
    }
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
    }
  };

  // ==========================================
  // 5. UI NOTIFICATIONS (TOASTS)
  // ==========================================
  const showToast = (message, icon = '✓') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.1rem; flex-shrink: 0;">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // ==========================================
  // 6. PROGRESS & DASHBOARD RENDERERS
  // ==========================================
  const renderProgress = () => {
    const totalTopics = TOPICS_CONFIG.length;
    const completedCount = state.completedTopics.length;
    const percentage = Math.round((completedCount / totalTopics) * 100);

    // Hero Progress Circle & Linear Bar
    const circleFill = document.getElementById('hero-circle-fill');
    const circleText = document.getElementById('hero-circle-pct');
    const heroLinear = document.getElementById('hero-linear-fill');
    const heroStatus = document.getElementById('hero-progress-status-text');
    const heroMetricProgress = document.getElementById('hero-metric-progress');

    if (circleFill) {
      // Circumference = 2 * PI * 38 ≈ 238.76
      const offset = 238.76 - (238.76 * percentage) / 100;
      circleFill.style.strokeDashoffset = offset;
    }
    if (circleText) circleText.textContent = `${percentage}%`;
    if (heroLinear) heroLinear.style.width = `${percentage}%`;
    if (heroStatus) heroStatus.textContent = `${completedCount} of ${totalTopics} Topics Completed`;
    if (heroMetricProgress) heroMetricProgress.textContent = `${percentage}%`;

    // Featured Topic Chip update
    const featuredChip = document.getElementById('featured-topic-status-chip');
    if (featuredChip) {
      const isSynCompleted = state.completedTopics.includes('synonyms-antonyms.html');
      featuredChip.textContent = isSynCompleted ? 'Status: ✓ Completed' : 'Status: In Progress';
      featuredChip.style.color = isSynCompleted ? '#10b981' : '';
    }

    // Dashboard Cards
    const statCompletedVal = document.getElementById('stat-completed-val');
    const statRemainingSub = document.getElementById('stat-remaining-sub');
    const statBestScore = document.getElementById('stat-best-score-val');
    const statQuizAttempts = document.getElementById('stat-quiz-attempts-sub');
    const statAvgAccuracy = document.getElementById('stat-avg-accuracy-val');
    const statOverallReadiness = document.getElementById('stat-overall-readiness');
    const statReadinessLabel = document.getElementById('stat-readiness-label');

    if (statCompletedVal) statCompletedVal.textContent = `${completedCount} / ${totalTopics}`;
    if (statRemainingSub) statRemainingSub.textContent = `${totalTopics - completedCount} topics remaining`;
    if (statBestScore) statBestScore.textContent = `${state.quizStats.bestScore} / 20`;
    if (statQuizAttempts) statQuizAttempts.textContent = `${state.quizStats.attempts} mock tests taken`;

    let avgAcc = 0;
    if (state.quizStats.totalQuestions > 0) {
      avgAcc = Math.round((state.quizStats.totalCorrect / state.quizStats.totalQuestions) * 100);
    }
    if (statAvgAccuracy) statAvgAccuracy.textContent = `${avgAcc}%`;

    // Readiness formula: 50% topics coverage + 50% quiz best score
    const quizPct = (state.quizStats.bestScore / 20) * 100;
    const readinessScore = Math.round(percentage * 0.5 + quizPct * 0.5);
    if (statOverallReadiness) statOverallReadiness.textContent = `${readinessScore}%`;
    if (statReadinessLabel) {
      if (readinessScore >= 85) statReadinessLabel.textContent = 'Merit Qualifier Tier (A+)';
      else if (readinessScore >= 60) statReadinessLabel.textContent = 'Intermediate Tier (B+)';
      else statReadinessLabel.textContent = 'Foundation Tier (Developing)';
    }

    // Update each topic card's status badge & complete button
    TOPICS_CONFIG.forEach(topic => {
      const isComplete = state.completedTopics.includes(topic.file);
      const badge = document.getElementById(topic.badgeId);
      const card = document.getElementById(topic.cardId);

      if (badge) {
        if (isComplete) {
          badge.className = 'topic-status-badge completed';
          badge.innerHTML = '✓ Completed';
        } else {
          badge.className = 'topic-status-badge';
          badge.innerHTML = '<span class="status-dot">○</span> Not Completed';
        }
      }

      if (card) {
        if (isComplete) {
          card.classList.add('completed');
        } else {
          card.classList.remove('completed');
        }

        const btn = card.querySelector('.btn-mark-complete');
        if (btn) {
          if (isComplete) {
            btn.classList.add('completed');
            btn.innerHTML = '✓';
            btn.title = 'Completed (Click to unmark)';
          } else {
            btn.classList.remove('completed');
            btn.innerHTML = '✓';
            btn.title = 'Mark as Completed';
          }
        }
      }
    });

    renderContinueLearning();
    checkAchievements();
  };

  // ==========================================
  // 7. CONTINUE LEARNING BANNER
  // ==========================================
  const renderContinueLearning = () => {
    const titleEl = document.getElementById('continue-topic-title');
    const descEl = document.getElementById('continue-topic-desc');
    const btnEl = document.getElementById('continue-topic-btn');

    if (!titleEl || !btnEl) return;

    if (state.lastTopic && state.lastTopic.title && state.lastTopic.file) {
      titleEl.textContent = `Continue: ${state.lastTopic.title}`;
      if (descEl) descEl.textContent = `Resume where you left off in ${state.lastTopic.title}.`;
      btnEl.href = state.lastTopic.file;
      btnEl.innerHTML = `<span>Continue Topic →</span>`;
    } else {
      // Find first uncompleted topic
      const nextUncompleted = TOPICS_CONFIG.find(t => !state.completedTopics.includes(t.file)) || TOPICS_CONFIG[0];
      titleEl.textContent = `Start: ${nextUncompleted.title}`;
      if (descEl) descEl.textContent = 'Begin your systematic PMDC English preparation step by step.';
      btnEl.href = nextUncompleted.file;
      btnEl.innerHTML = `<span>Start ${nextUncompleted.title} →</span>`;
    }
  };

  const trackTopicClick = (topicTitle, topicFile) => {
    state.lastTopic = {
      title: topicTitle,
      file: topicFile,
      timestamp: new Date().toISOString()
    };
    saveLastTopic();
    renderContinueLearning();
  };

  const toggleTopicCompletion = (topicFile, btnEl) => {
    const topic = TOPICS_CONFIG.find(t => t.file === topicFile);
    const title = topic ? topic.title : 'Topic';
    const index = state.completedTopics.indexOf(topicFile);

    if (index > -1) {
      state.completedTopics.splice(index, 1);
      showToast(`${title} marked as uncompleted.`, 'ℹ️');
    } else {
      state.completedTopics.push(topicFile);
      showToast(`${title} marked as completed! 🎉`, '✓');
    }

    saveCompletedTopics();
    renderProgress();
  };

  // ==========================================
  // 8. SEARCH & FILTERING ENGINE
  // ==========================================
  const filterTopics = () => {
    const query = state.searchQuery.trim().toLowerCase();
    const activeFilter = state.activeFilter;
    const cards = document.querySelectorAll('.topic-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('.topic-card-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.topic-card-desc')?.textContent || '').toLowerCase();

      // Category check
      const matchesCategory = activeFilter === 'all' || category === activeFilter;

      // Text search check
      const matchesSearch = !query ||
        title.includes(query) ||
        desc.includes(query) ||
        keywords.includes(query) ||
        category.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyState = document.getElementById('topics-empty-state');
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  const resetSearchAndFilters = () => {
    state.searchQuery = '';
    state.activeFilter = 'all';

    const searchInput = document.getElementById('topic-search-input');
    const clearBtn = document.getElementById('search-clear-btn');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.remove('active');

    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-filter') === 'all');
    });

    filterTopics();
  };

  // ==========================================
  // 9. REAL 20-MCQ QUIZ ENGINE
  // ==========================================
  const startQuiz = () => {
    state.quiz.active = true;
    state.quiz.currentQuestionIndex = 0;
    state.quiz.userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    state.quiz.timerSeconds = 1200; // 20 minutes
    state.quiz.startTime = Date.now();

    const startView = document.getElementById('quiz-start-view');
    const resultsView = document.getElementById('quiz-results-view');
    const activeView = document.getElementById('quiz-active-view');

    if (startView) startView.style.display = 'none';
    if (resultsView) resultsView.style.display = 'none';
    if (activeView) activeView.style.display = 'block';

    renderQuizPalette();
    renderActiveQuestion();
    startQuizTimer();
  };

  const startQuizTimer = () => {
    if (state.quiz.timerInterval) clearInterval(state.quiz.timerInterval);
    updateTimerDisplay();

    state.quiz.timerInterval = setInterval(() => {
      state.quiz.timerSeconds--;
      updateTimerDisplay();

      if (state.quiz.timerSeconds <= 0) {
        clearInterval(state.quiz.timerInterval);
        showToast('Time expired! Quiz automatically submitted.', '⏰');
        submitQuiz(false);
      }
    }, 1000);
  };

  const updateTimerDisplay = () => {
    const timerText = document.getElementById('quiz-time-left');
    const timerBox = document.getElementById('quiz-timer-display');
    if (!timerText) return;

    const mins = Math.floor(state.quiz.timerSeconds / 60);
    const secs = state.quiz.timerSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerText.textContent = formatted;

    if (timerBox) {
      if (state.quiz.timerSeconds <= 120) {
        timerBox.style.color = '#ef4444';
        timerBox.style.borderColor = '#ef4444';
      } else {
        timerBox.style.color = '';
        timerBox.style.borderColor = '';
      }
    }
  };

  const renderQuizPalette = () => {
    const container = document.getElementById('quiz-palette-container');
    if (!container) return;

    container.innerHTML = '';
    QUIZ_QUESTIONS.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;
      btn.title = `Question ${idx + 1}`;

      if (idx === state.quiz.currentQuestionIndex) {
        btn.classList.add('current');
      }
      if (state.quiz.userAnswers[idx] !== null) {
        btn.classList.add('answered');
      }

      btn.addEventListener('click', () => {
        state.quiz.currentQuestionIndex = idx;
        renderActiveQuestion();
      });

      container.appendChild(btn);
    });
  };

  const renderActiveQuestion = () => {
    const qIndex = state.quiz.currentQuestionIndex;
    const qData = QUIZ_QUESTIONS[qIndex];
    if (!qData) return;

    // Header counter & tag
    const counterEl = document.getElementById('quiz-q-counter');
    const tagEl = document.getElementById('quiz-category-tag');
    const linearBar = document.getElementById('quiz-linear-bar');
    const questionText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options-container');

    if (counterEl) counterEl.textContent = `Question ${qIndex + 1} of ${QUIZ_QUESTIONS.length}`;
    if (tagEl) tagEl.textContent = qData.category;
    if (linearBar) {
      const pct = ((qIndex + 1) / QUIZ_QUESTIONS.length) * 100;
      linearBar.style.width = `${pct}%`;
    }
    if (questionText) questionText.textContent = `${qIndex + 1}. ${qData.question}`;

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      qData.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'option-btn';
        if (state.quiz.userAnswers[qIndex] === optIdx) {
          optBtn.classList.add('selected');
        }

        optBtn.innerHTML = `
          <div class="opt-prefix">${letters[optIdx]}</div>
          <div style="flex: 1;">${optText}</div>
        `;

        optBtn.addEventListener('click', () => {
          state.quiz.userAnswers[qIndex] = optIdx;
          renderActiveQuestion();
          renderQuizPalette();
        });

        optionsContainer.appendChild(optBtn);
      });
    }

    // Previous / Next button states
    const prevBtn = document.getElementById('quiz-btn-prev');
    const nextBtn = document.getElementById('quiz-btn-next');

    if (prevBtn) prevBtn.disabled = qIndex === 0;
    if (nextBtn) {
      if (qIndex === QUIZ_QUESTIONS.length - 1) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
      }
    }

    renderQuizPalette();
  };

  const nextQuestion = () => {
    if (state.quiz.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      state.quiz.currentQuestionIndex++;
      renderActiveQuestion();
    }
  };

  const prevQuestion = () => {
    if (state.quiz.currentQuestionIndex > 0) {
      state.quiz.currentQuestionIndex--;
      renderActiveQuestion();
    }
  };

  const submitQuiz = (isManual = true) => {
    if (isManual) {
      const unansweredCount = state.quiz.userAnswers.filter(a => a === null).length;
      if (unansweredCount > 0) {
        const confirmSubmit = confirm(`You still have ${unansweredCount} unanswered questions. Are you sure you want to submit?`);
        if (!confirmSubmit) return;
      }
    }

    if (state.quiz.timerInterval) clearInterval(state.quiz.timerInterval);

    // Score evaluation
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (state.quiz.userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const wrongCount = QUIZ_QUESTIONS.length - correctCount;
    const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    const elapsedSeconds = Math.max(0, 1200 - state.quiz.timerSeconds);
    const elapsedMins = Math.floor(elapsedSeconds / 60);
    const elapsedSecsRemaining = elapsedSeconds % 60;
    const formattedTime = `${elapsedMins}m ${elapsedSecsRemaining}s`;

    // Update Persistent Stats
    state.quizStats.attempts++;
    state.quizStats.totalQuestions += QUIZ_QUESTIONS.length;
    state.quizStats.totalCorrect += correctCount;
    if (correctCount > state.quizStats.bestScore) {
      state.quizStats.bestScore = correctCount;
    }
    saveQuizStats();

    // Render Results View
    const activeView = document.getElementById('quiz-active-view');
    const resultsView = document.getElementById('quiz-results-view');
    if (activeView) activeView.style.display = 'none';
    if (resultsView) resultsView.style.display = 'block';

    const scoreNum = document.getElementById('results-score-num');
    const headline = document.getElementById('results-headline');
    const evalMsg = document.getElementById('results-eval-message');
    const correctEl = document.getElementById('results-correct-count');
    const wrongEl = document.getElementById('results-wrong-count');
    const pctEl = document.getElementById('results-percentage');
    const timeEl = document.getElementById('results-time-taken');

    if (scoreNum) scoreNum.textContent = correctCount;
    if (correctEl) correctEl.textContent = correctCount;
    if (wrongEl) wrongEl.textContent = wrongCount;
    if (pctEl) pctEl.textContent = `${percentage}%`;
    if (timeEl) timeEl.textContent = formattedTime;

    if (headline && evalMsg) {
      if (percentage >= 85) {
        headline.textContent = '🌟 Outstanding Mastery!';
        evalMsg.textContent = 'You are performing at top medical college merit tier for English MDCAT.';
      } else if (percentage >= 70) {
        headline.textContent = '👍 Solid Performance!';
        evalMsg.textContent = 'Great preparation! Review your incorrect answers to lock down remaining marks.';
      } else if (percentage >= 50) {
        headline.textContent = '📚 Good Effort!';
        evalMsg.textContent = 'Solid foundation. Revisit grammar and vocabulary topic guides for higher accuracy.';
      } else {
        headline.textContent = '💡 Room for Growth!';
        evalMsg.textContent = 'Keep practicing! Review our Quick Revision notes and retry the test.';
      }
    }

    // Populate Detailed Review
    const reviewList = document.getElementById('quiz-review-list');
    if (reviewList) {
      reviewList.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      QUIZ_QUESTIONS.forEach((q, idx) => {
        const userChoice = state.quiz.userAnswers[idx];
        const isCorrect = userChoice === q.answer;
        const userChoiceText = userChoice !== null ? `${letters[userChoice]}. ${q.options[userChoice]}` : 'Unanswered';
        const correctChoiceText = `${letters[q.answer]}. ${q.options[q.answer]}`;

        const item = document.createElement('div');
        item.className = `review-item-card ${isCorrect ? 'is-correct' : 'is-wrong'}`;
        item.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span class="review-q-num">Question ${idx + 1} • ${q.category}</span>
            <span style="font-size: 0.8rem; font-weight: 800; color: ${isCorrect ? '#10b981' : '#ef4444'};">
              ${isCorrect ? '✓ Correct (+1)' : '✗ Incorrect (0)'}
            </span>
          </div>
          <div class="review-q-text">${q.question}</div>
          <div class="review-answers-box">
            <div class="review-ans-row ${isCorrect ? 'review-user-correct' : 'review-user-wrong'}">
              <strong>Your Choice:</strong> ${userChoiceText}
            </div>
            ${!isCorrect ? `
              <div class="review-ans-row review-correct-reveal">
                <strong>Correct Answer:</strong> ${correctChoiceText}
              </div>
            ` : ''}
          </div>
          <div class="review-explanation">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        `;
        reviewList.appendChild(item);
      });
    }

    renderProgress();
    showToast(`Quiz completed! You scored ${correctCount}/20 (${percentage}%)`, '🎉');
  };

  const retryQuiz = () => {
    const resultsView = document.getElementById('quiz-results-view');
    const startView = document.getElementById('quiz-start-view');
    if (resultsView) resultsView.style.display = 'none';
    if (startView) startView.style.display = 'block';
  };

  // ==========================================
  // 10. DAILY PRACTICE DRILL ENGINE
  // ==========================================
  const initDailyDrill = () => {
    state.daily.currentIndex = 0;
    state.daily.answered = false;
    renderDailyQuestion();
    showToast('Daily Practice initialized! Answer 10 fast MCQs.', '⚡');
  };

  const renderDailyQuestion = () => {
    const q = DAILY_QUESTIONS[state.daily.currentIndex];
    if (!q) return;

    state.daily.answered = false;
    const tagEl = document.getElementById('daily-q-tag');
    const subTopicEl = document.getElementById('daily-sub-topic');
    const questionEl = document.getElementById('daily-question-content');
    const optionsBox = document.getElementById('daily-options-box');
    const feedbackBox = document.getElementById('daily-feedback');
    const nextBtn = document.getElementById('daily-next-btn');

    if (tagEl) tagEl.textContent = `Question ${state.daily.currentIndex + 1} of ${DAILY_QUESTIONS.length}`;
    if (subTopicEl) subTopicEl.textContent = q.tag;
    if (questionEl) questionEl.textContent = q.question;

    if (feedbackBox) {
      feedbackBox.className = 'daily-feedback-box';
      feedbackBox.style.display = 'none';
      feedbackBox.textContent = '';
    }

    if (nextBtn) nextBtn.style.display = 'none';

    if (optionsBox) {
      optionsBox.innerHTML = '';
      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'daily-opt-btn';
        btn.textContent = optText;
        btn.onclick = () => handleDailyChoice(optIdx);
        optionsBox.appendChild(btn);
      });
    }

    updateDailyStatsDisplay();
  };

  const handleDailyChoice = (choiceIdx) => {
    if (state.daily.answered) return;
    state.daily.answered = true;

    const q = DAILY_QUESTIONS[state.daily.currentIndex];
    const isCorrect = choiceIdx === q.answer;

    state.daily.attemptedCount++;
    state.dailyStreak.todayAttempted++;
    if (isCorrect) {
      state.daily.correctCount++;
      state.dailyStreak.todayCorrect++;
    }
    saveDailyStreak();

    // Style options
    const optionBtns = document.querySelectorAll('.daily-opt-btn');
    optionBtns.forEach((btn, idx) => {
      btn.style.pointerEvents = 'none';
      if (idx === q.answer) {
        btn.classList.add('correct');
      } else if (idx === choiceIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Feedback box
    const feedbackBox = document.getElementById('daily-feedback');
    if (feedbackBox) {
      feedbackBox.className = `daily-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        <strong>${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect.'}</strong> ${q.explanation}
      `;
    }

    // Next button
    const nextBtn = document.getElementById('daily-next-btn');
    if (nextBtn) {
      if (state.daily.currentIndex === DAILY_QUESTIONS.length - 1) {
        nextBtn.textContent = 'Finish Practice Drill 🎉';
      } else {
        nextBtn.textContent = 'Next Question →';
      }
      nextBtn.style.display = 'inline-block';
    }

    updateDailyStatsDisplay();
  };

  const nextDailyQuestion = () => {
    if (state.daily.currentIndex < DAILY_QUESTIONS.length - 1) {
      state.daily.currentIndex++;
      renderDailyQuestion();
    } else {
      // Completed all 10 questions
      const pct = Math.round((state.daily.correctCount / DAILY_QUESTIONS.length) * 100);
      showToast(`Daily Drill Completed! Score: ${state.daily.correctCount}/10 (${pct}%)`, '🔥');
      const feedbackBox = document.getElementById('daily-feedback');
      if (feedbackBox) {
        feedbackBox.innerHTML = `<strong>Workout Complete!</strong> You answered ${state.daily.correctCount} out of 10 correctly (${pct}%). Come back tomorrow to keep your streak alive!`;
      }
    }
  };

  const updateDailyStatsDisplay = () => {
    const attemptedEl = document.getElementById('daily-attempted-stat');
    const accEl = document.getElementById('daily-accuracy-stat');
    const streakCountEl = document.getElementById('daily-streak-count');

    if (attemptedEl) attemptedEl.textContent = `${state.dailyStreak.todayAttempted} / 10`;
    if (accEl) {
      const acc = state.dailyStreak.todayAttempted > 0
        ? Math.round((state.dailyStreak.todayCorrect / state.dailyStreak.todayAttempted) * 100)
        : 0;
      accEl.textContent = `${acc}%`;
    }
    if (streakCountEl) streakCountEl.textContent = state.dailyStreak.streak;
  };

  // ==========================================
  // 11. ACCORDION CONTROLLER
  // ==========================================
  const toggleAccordion = (itemId) => {
    const item = document.getElementById(itemId);
    if (!item) return;

    const isActive = item.classList.contains('active');

    // Close other open items
    document.querySelectorAll('.accordion-item').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });

    if (isActive) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  };

  // ==========================================
  // 12. ACHIEVEMENTS SYSTEM
  // ==========================================
  const checkAchievements = () => {
    const completedCount = state.completedTopics.length;
    const attempts = state.quizStats.attempts;
    const bestScore = state.quizStats.bestScore;
    const streak = state.dailyStreak.streak;

    // Grammar topics
    const grammarTopics = ['active-passive-voice.html', 'direct-indirect-speech.html', 'error-detection.html', 'parts-of-speech.html', 'punctuation.html'];
    const hasAllGrammar = grammarTopics.every(file => state.completedTopics.includes(file));

    // Vocabulary topics
    const vocabTopics = ['synonyms-antonyms.html', 'vocabulary.html'];
    const hasAllVocab = vocabTopics.every(file => state.completedTopics.includes(file));

    const unlockBadge = (cardId, statusId, condition) => {
      const card = document.getElementById(cardId);
      const statusEl = document.getElementById(statusId);
      if (!card || !statusEl) return;

      if (condition) {
        card.classList.add('unlocked');
        statusEl.textContent = '✓ Unlocked';
      } else {
        card.classList.remove('unlocked');
        statusEl.textContent = 'Locked';
      }
    };

    unlockBadge('achieve-first-quiz', 'achieve-status-1', attempts >= 1);
    unlockBadge('achieve-grammar-master', 'achieve-status-2', hasAllGrammar);
    unlockBadge('achieve-five-topics', 'achieve-status-3', completedCount >= 5);
    unlockBadge('achieve-high-scorer', 'achieve-status-4', bestScore >= 16);
    unlockBadge('achieve-vocab-explorer', 'achieve-status-5', hasAllVocab);
    unlockBadge('achieve-streak-champion', 'achieve-status-6', streak >= 3);
  };

  const resetAllProgress = () => {
    const confirmed = confirm('Are you sure you want to reset all your English MDCAT progress, quiz statistics, and streak data?');
    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TOPICS);
    localStorage.removeItem(STORAGE_KEYS.LAST_TOPIC);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_STATS);
    localStorage.removeItem(STORAGE_KEYS.DAILY_STREAK);

    state.completedTopics = [];
    state.lastTopic = null;
    state.quizStats = { attempts: 0, bestScore: 0, totalQuestions: 0, totalCorrect: 0 };
    state.dailyStreak = { streak: 1, todayAttempted: 0, todayCorrect: 0, lastDate: new Date().toISOString().split('T')[0] };

    renderProgress();
    updateDailyStatsDisplay();
    showToast('All progress data has been reset.', '🔄');
  };

  // ==========================================
  // 13. INITIALIZATION & EVENT LISTENERS
  // ==========================================
  const init = () => {
    initTheme();
    loadState();
    renderProgress();
    updateDailyStatsDisplay();

    // Mobile Drawer Setup
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closeBtn = document.getElementById('drawer-close-btn');

    const toggleDrawer = (open) => {
      if (drawer) drawer.classList.toggle('active', open);
      if (overlay) overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    if (menuBtn) menuBtn.addEventListener('click', () => toggleDrawer(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
    if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

    document.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    // Search Input listeners
    const searchInput = document.getElementById('topic-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const navSearchBtn = document.getElementById('nav-search-trigger');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (clearBtn) {
          clearBtn.classList.toggle('active', state.searchQuery.length > 0);
        }
        filterTopics();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        clearBtn.classList.remove('active');
        filterTopics();
      });
    }

    if (navSearchBtn) {
      navSearchBtn.addEventListener('click', () => {
        const target = document.getElementById('topics-anchor');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (searchInput) searchInput.focus();
          }, 400);
        }
      });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.getAttribute('data-filter') || 'all';
        filterTopics();
      });
    });
  };

  // Public API
  return {
    init,
    trackTopicClick,
    toggleTopicCompletion,
    filterTopics,
    resetSearchAndFilters,
    startQuiz,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    retryQuiz,
    initDailyDrill,
    handleDailyChoice,
    nextDailyQuestion,
    toggleAccordion,
    resetAllProgress
  };
})();

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  STUDYMATE.init();
});
