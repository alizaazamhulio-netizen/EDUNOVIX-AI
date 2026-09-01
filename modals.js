/**
 * ====================================================================
 * MODAL VERBS — MASTER JAVASCRIPT ENGINE (modals.js)
 * Complete educational logic, interactive datasets, quiz, flashcards,
 * syntax analyzer, classifier lab, search, and localStorage persistence.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

/* ====================================================================
   1. GLOBAL STATE & LOCALSTORAGE PERSISTENCE
   ==================================================================== */
const APP_STORAGE_KEY = 'modal_verbs_mastery_state';

const defaultState = {
  lessonsViewed: [],
  questionsAnswered: 0,
  correctAnswers: 0,
  flashcardsMastered: [],
  bookmarks: []
};

let userState = loadUserState();

function loadUserState() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading user state from localStorage:', e);
  }
  return { ...defaultState };
}

function saveUserState() {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(userState));
    updateDashboardUI();
  } catch (e) {
    console.error('Error saving user state to localStorage:', e);
  }
}

/* ====================================================================
   2. DASHBOARD & METRICS CONTROLLER
   ==================================================================== */
function updateDashboardUI() {
  const statLessons = document.getElementById('statLessonsViewed');
  const statQuestions = document.getElementById('statQuestionsAnswered');
  const statAccuracy = document.getElementById('statAccuracy');
  const statFlashcards = document.getElementById('statFlashcardsMastered');
  const progressBar = document.getElementById('overallProgressBar');
  const progressPercent = document.getElementById('overallProgressPercent');
  const statusText = document.getElementById('dashboardStatusText');
  const bookmarkCountBadge = document.getElementById('bookmarkCounter');

  const viewedCount = userState.lessonsViewed.length;
  const answeredCount = userState.questionsAnswered;
  const accuracy = answeredCount > 0 
    ? Math.round((userState.correctAnswers / answeredCount) * 100) 
    : 0;
  const masteredCards = userState.flashcardsMastered.length;

  if (statLessons) statLessons.textContent = `${viewedCount} / 9`;
  if (statQuestions) statQuestions.textContent = `${answeredCount}`;
  if (statAccuracy) statAccuracy.textContent = `${accuracy}%`;
  if (statFlashcards) statFlashcards.textContent = `${masteredCards} / 12`;

  if (bookmarkCountBadge) {
    bookmarkCountBadge.textContent = userState.bookmarks.length;
  }

  // Calculate overall progress: weighted composite (lessons 40%, quiz 30%, cards 30%)
  const lessonProgress = (viewedCount / 9) * 40;
  const quizProgress = Math.min((answeredCount / 15) * 30, 30);
  const cardProgress = (masteredCards / 12) * 30;
  const totalScore = Math.min(Math.round(lessonProgress + quizProgress + cardProgress), 100);

  if (progressBar) progressBar.style.width = `${totalScore}%`;
  if (progressPercent) progressPercent.textContent = `${totalScore}%`;

  if (statusText) {
    if (totalScore === 0) {
      statusText.textContent = 'Start learning to build your progress.';
    } else if (totalScore < 40) {
      statusText.textContent = 'Great start! Continue through the core modal lessons.';
    } else if (totalScore < 80) {
      statusText.textContent = 'Excellent progress! Test yourself in the Labs and Quiz.';
    } else {
      statusText.textContent = 'Outstanding achievement! You have mastered Modal Verbs!';
    }
  }

  // Update viewed lesson buttons
  document.querySelectorAll('.btn-mark-viewed').forEach(btn => {
    const lessonId = btn.getAttribute('data-lesson');
    if (userState.lessonsViewed.includes(lessonId)) {
      btn.classList.add('is-viewed');
      btn.innerHTML = '<i class="fa-solid fa-circle-check text-teal"></i> <span>Completed</span>';
    } else {
      btn.classList.remove('is-viewed');
      btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> <span>Mark Done</span>';
    }
  });

  // Update bookmark buttons state
  document.querySelectorAll('.bookmark-toggle-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    const isBookmarked = userState.bookmarks.some(b => b.id === id);
    if (isBookmarked) {
      btn.classList.add('is-bookmarked');
      btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
    } else {
      btn.classList.remove('is-bookmarked');
      btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    }
  });
}

/* ====================================================================
   3. MODAL OF THE DAY ENGINE
   ==================================================================== */
const motdList = [
  {
    verb: 'MUST',
    phonetic: '/mʌst/',
    type: 'Obligation & Deduction',
    meaning: 'Used to express strong necessity, rules, or confident logical deduction based on facts.',
    example: '"You must wear a seatbelt while driving."',
    question: '"No one is answering the door and the lights are out. They ______ be away."',
    options: ['must', 'can', 'shall', 'would'],
    correct: 0,
    explanation: 'Correct! "Must" is used for strong logical deduction based on the observed evidence.'
  },
  {
    verb: 'COULD',
    phonetic: '/kʊd/',
    type: 'Polite Requests & Possibility',
    meaning: 'Used for polite inquiries, suggestions, and theoretical possibility.',
    example: '"Could you please pass the dictionary?"',
    question: '"______ you please help me proofread this academic essay?"',
    options: ['Could', 'Must', 'Shall', 'Might'],
    correct: 0,
    explanation: 'Correct! "Could" makes the request polite, courteous, and non-demanding.'
  },
  {
    verb: 'MIGHT',
    phonetic: '/maɪt/',
    type: 'Tentative Possibility',
    meaning: 'Conveys a cautious or tentative possibility without high certainty.',
    example: '"Take a jacket; it might turn breezy later tonight."',
    question: '"The sky is clear now, but it ______ rain later according to the forecast."',
    options: ['might', 'must', 'shall', 'would'],
    correct: 0,
    explanation: 'Correct! "Might" conveys an uncertain or tentative future possibility.'
  },
  {
    verb: 'SHOULD',
    phonetic: '/ʃʊd/',
    type: 'Constructive Advice & Expectation',
    meaning: 'Used to suggest wise courses of action or state reasonable expectations.',
    example: '"You should revise your notes before taking the mock exam."',
    question: '"You look exhausted from studying. You ______ take a short break."',
    options: ['should', 'may', 'will', 'shall'],
    correct: 0,
    explanation: 'Correct! "Should" provides constructive, friendly advice for well-being.'
  }
];

function initModalOfTheDay() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const item = motdList[dayOfYear % motdList.length];

  const motdVerb = document.getElementById('motdVerb');
  const motdPhonetic = document.getElementById('motdPhonetic');
  const motdType = document.getElementById('motdType');
  const motdMeaning = document.getElementById('motdMeaning');
  const motdExample = document.getElementById('motdExample');
  const motdQuestionText = document.getElementById('motdQuestionText');
  const motdOptionsContainer = document.getElementById('motdOptionsContainer');
  const motdDate = document.getElementById('motdDate');

  if (motdDate) {
    const today = new Date();
    motdDate.textContent = today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  if (motdVerb) motdVerb.textContent = item.verb;
  if (motdPhonetic) motdPhonetic.textContent = item.phonetic;
  if (motdType) motdType.textContent = item.type;
  if (motdMeaning) motdMeaning.textContent = item.meaning;
  if (motdExample) motdExample.innerHTML = item.example;
  if (motdQuestionText) motdQuestionText.textContent = item.question;

  if (motdOptionsContainer) {
    motdOptionsContainer.innerHTML = '';
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'qc-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => handleMotdAnswer(idx, item);
      motdOptionsContainer.appendChild(btn);
    });
  }
}

function handleMotdAnswer(chosenIdx, item) {
  const fb = document.getElementById('motdFeedback');
  if (!fb) return;

  fb.style.display = 'block';
  if (chosenIdx === item.correct) {
    fb.className = 'qc-feedback-box feedback-success';
    fb.innerHTML = `<i class="fa-solid fa-check"></i> ${item.explanation}`;
  } else {
    fb.className = 'qc-feedback-box feedback-error';
    fb.innerHTML = `<i class="fa-solid fa-xmark"></i> Not quite. The correct answer is <strong>${item.options[item.correct]}</strong>. ${item.explanation}`;
  }
}

/* ====================================================================
   4. NAVIGATION, LESSON JUMPING & BOOKMARKS
   ==================================================================== */
window.navigateToLesson = function(lessonElementId) {
  const target = document.getElementById(lessonElementId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('highlight-pulse');
    setTimeout(() => {
      target.classList.remove('highlight-pulse');
    }, 2000);

    // Auto mark as viewed
    const lessonId = target.getAttribute('data-lesson-id');
    if (lessonId && !userState.lessonsViewed.includes(lessonId)) {
      userState.lessonsViewed.push(lessonId);
      saveUserState();
    }
  }
};

function initBookmarkListeners() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.bookmark-toggle-btn');
    if (btn) {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const type = btn.getAttribute('data-type');
      toggleBookmark(id, title, type);
    }
  });

  const triggerBtn = document.getElementById('bookmarksTriggerBtn');
  const drawer = document.getElementById('bookmarksDrawer');
  const closeBtn = document.getElementById('closeBookmarksBtn');
  const backdrop = document.getElementById('drawerBackdrop');

  if (triggerBtn && drawer) {
    triggerBtn.addEventListener('click', () => {
      renderBookmarksList();
      drawer.classList.add('is-open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('is-open'));
  }
  if (backdrop && drawer) {
    backdrop.addEventListener('click', () => drawer.classList.remove('is-open'));
  }
}

function toggleBookmark(id, title, type) {
  const existingIdx = userState.bookmarks.findIndex(b => b.id === id);
  if (existingIdx >= 0) {
    userState.bookmarks.splice(existingIdx, 1);
  } else {
    userState.bookmarks.push({ id, title, type, date: new Date().toISOString() });
  }
  saveUserState();
}

function renderBookmarksList() {
  const list = document.getElementById('bookmarksList');
  if (!list) return;

  if (userState.bookmarks.length === 0) {
    list.innerHTML = `
      <div class="empty-bookmarks">
        <i class="fa-regular fa-bookmark"></i>
        <p>No saved items yet.</p>
        <small>Click the bookmark icon on any lesson or rule to save it for quick review.</small>
      </div>
    `;
    return;
  }

  list.innerHTML = userState.bookmarks.map(b => `
    <div class="bookmark-item">
      <div>
        <strong style="color: var(--navy); display:block; font-size: 0.95rem;">${b.title}</strong>
        <span style="font-size:0.75rem; color: var(--indigo); text-transform: uppercase;">${b.type}</span>
      </div>
      <div style="display:flex; gap:0.4rem;">
        <button class="btn btn-ghost-sm" onclick="navigateToLesson('lesson-${b.id}'); document.getElementById('bookmarksDrawer').classList.remove('is-open');">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
        </button>
        <button class="btn btn-ghost-sm" onclick="toggleBookmark('${b.id}', '${b.title}', '${b.type}'); renderBookmarksList();" style="color:#DC2626;">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/* ====================================================================
   5. MINI-CHECK & INTERACTIVE SELECTORS
   ==================================================================== */
window.checkMiniQuestion = function(choice) {
  const res = document.getElementById('miniCheckResult');
  if (!res) return;

  res.style.display = 'block';
  if (choice === 'donthaveto') {
    res.className = 'mini-check-result feedback-success';
    res.innerHTML = '<i class="fa-solid fa-check"></i> <strong>Correct!</strong> "Tomorrow is Sunday; we don\'t have to wake up early." (Waking up early is optional; there is no obligation).';
  } else {
    res.className = 'mini-check-result feedback-error';
    res.innerHTML = '<i class="fa-solid fa-xmark"></i> <strong>Incorrect.</strong> "Mustn\'t" means it is strictly forbidden or prohibited. Sunday is a rest day, so waking up early is simply <em>not necessary</em> ("don\'t have to").';
  }
};

function initPossibilityTabs() {
  const tabs = document.querySelectorAll('.pos-tab');
  const title = document.getElementById('posTitle');
  const badge = document.getElementById('posDegreeBadge');
  const desc = document.getElementById('posDesc');
  const example = document.getElementById('posExample');
  const context = document.getElementById('posContext');

  const posData = {
    should: {
      badge: 'EXPECTED OCCURRENCE',
      title: 'SHOULD: Logical Expectation',
      desc: 'Indicates that something is reasonably expected to happen if everything proceeds as planned.',
      example: '"The delivery package should arrive by tomorrow afternoon."',
      context: 'Based on typical shipping times, there is strong expectation without 100% certainty.'
    },
    may: {
      badge: 'REALISTIC POSSIBILITY (~50%)',
      title: 'MAY: Realistic Possibility',
      desc: 'Expresses a genuine 50/50 possibility of an event happening in the present or future.',
      example: '"The professor may hold an extra revision session tomorrow."',
      context: 'There is a fair, realistic chance of this happening based on ongoing discussions.'
    },
    could: {
      badge: 'THEORETICAL POSSIBILITY',
      title: 'COULD: Theoretical Possibility',
      desc: 'Suggests something is physically or conceptually possible under the right circumstances.',
      example: '"You could catch a cold if you walk in the rain without an umbrella."',
      context: 'A possible outcome, though not guaranteed to happen.'
    },
    might: {
      badge: 'TENTATIVE POSSIBILITY',
      title: 'MIGHT: Tentative / Cautious Possibility',
      desc: 'Conveys a cautious, tentative possibility with relatively lower certainty.',
      example: '"It might snow in the mountains, but temperatures are still mild."',
      context: 'The speaker remains tentative and avoids making a strong prediction.'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-pos');
      const data = posData[key];

      if (title && data) {
        badge.textContent = data.badge;
        title.textContent = data.title;
        desc.textContent = data.desc;
        example.innerHTML = data.example;
        context.textContent = data.context;
      }
    });
  });
}

function initPolitenessSelector() {
  const cards = document.querySelectorAll('.poly-card');
  const title = document.getElementById('polyDetailTitle');
  const desc = document.getElementById('polyDetailDesc');

  const polyData = {
    may: {
      title: '"May I come in?" (Formal Permission)',
      desc: 'Ideal for classrooms, formal interviews, legal environments, and interactions with superiors where high courtesy and hierarchy are observed.'
    },
    would: {
      title: '"Would you help me with this task?" (Courteous & Polite)',
      desc: 'Standard polite choice for professional workplace collaboration, offering refreshments to guests, and making formal inquiries.'
    },
    could: {
      title: '"Could you pass the salt, please?" (Soft & Considerate)',
      desc: 'Soft and considerate for everyday requests in restaurants, study groups, and courteous peer conversations.'
    },
    can: {
      title: '"Can you lend me a pencil?" (Casual & Direct)',
      desc: 'Best suited for close friends, family members, and informal peer settings where formal etiquette is not expected.'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const level = card.getAttribute('data-level');
      const data = polyData[level];
      if (title && data) {
        title.textContent = data.title;
        desc.textContent = data.desc;
      }
    });
  });
}

/* ====================================================================
   6. MODAL PERFECT INTERACTIVE LAB
   ==================================================================== */
const labQuestions = [
  {
    prefix: '"The ground is soaking wet this morning. It',
    suffix: 'have rained heavily last night."',
    options: ['must', 'should', 'can', 'shall'],
    correct: 'must',
    explanation: '<strong>Must have + V3:</strong> Strong logical deduction based on obvious physical evidence (the wet ground).'
  },
  {
    prefix: '"I got a poor score on the grammar test. I',
    suffix: 'have studied earlier."',
    options: ['should', 'might', 'will', 'can'],
    correct: 'should',
    explanation: '<strong>Should have + V3:</strong> Expresses past regret or a missed sensible action that was not performed.'
  },
  {
    prefix: '"We were leading until the final two minutes; we',
    suffix: 'have won the championship."',
    options: ['could', 'must', 'shall', 'may'],
    correct: 'could',
    explanation: '<strong>Could have + V3:</strong> An unrealized past opportunity that was within our grasp.'
  },
  {
    prefix: '"She hasn\'t arrived at the airport yet; her flight',
    suffix: 'have been delayed."',
    options: ['might', 'shall', 'must to', 'will'],
    correct: 'might',
    explanation: '<strong>Might have + V3:</strong> A tentative past possibility explaining her delay.'
  }
];

let currentLabIndex = 0;

function renderLabQuestion() {
  const item = labQuestions[currentLabIndex];
  const prefix = document.getElementById('labSentencePrefix');
  const suffix = document.getElementById('labSentenceSuffix');
  const blank = document.getElementById('labBlank');
  const optionsRow = document.getElementById('labOptionsRow');
  const feedbackCard = document.getElementById('labFeedbackCard');

  if (prefix) prefix.textContent = item.prefix;
  if (suffix) suffix.textContent = item.suffix;
  if (blank) blank.textContent = '________';
  if (feedbackCard) feedbackCard.style.display = 'none';

  if (optionsRow) {
    optionsRow.innerHTML = '';
    item.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'lab-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => handleLabAnswer(opt, item);
      optionsRow.appendChild(btn);
    });
  }
}

function handleLabAnswer(chosen, item) {
  const blank = document.getElementById('labBlank');
  const feedbackCard = document.getElementById('labFeedbackCard');

  if (blank) blank.textContent = chosen;
  if (!feedbackCard) return;

  feedbackCard.style.display = 'block';
  if (chosen === item.correct) {
    feedbackCard.className = 'lab-feedback-card feedback-success';
    feedbackCard.innerHTML = `<i class="fa-solid fa-check"></i> <strong>Correct!</strong> ${item.explanation}`;
  } else {
    feedbackCard.className = 'lab-feedback-card feedback-error';
    feedbackCard.innerHTML = `<i class="fa-solid fa-xmark"></i> <strong>Incorrect.</strong> The correct choice is <strong>${item.correct}</strong>. ${item.explanation}`;
  }
}

function initLabListeners() {
  const nextBtn = document.getElementById('nextLabQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentLabIndex = (currentLabIndex + 1) % labQuestions.length;
      renderLabQuestion();
    });
  }
  renderLabQuestion();
}

/* ====================================================================
   7. COMMON MISTAKES RENDERER
   ==================================================================== */
const commonMistakesData = [
  {
    wrong: 'He can goes to the library.',
    correct: 'He can go to the library.',
    rule: 'Never add -s / -es to the main verb after a modal. Always use the bare infinitive.'
  },
  {
    wrong: 'She should to study harder.',
    correct: 'She should study harder.',
    rule: 'Never insert "to" after a core modal verb (should, must, can, will, etc.).'
  },
  {
    wrong: 'They must to leave immediately.',
    correct: 'They must leave immediately.',
    rule: 'Must is followed directly by the base verb without "to".'
  },
  {
    wrong: 'He cans swim very fast.',
    correct: 'He can swim very fast.',
    rule: 'Modal verbs never conjugate with -s for third-person singular subjects (he/she/it).'
  },
  {
    wrong: 'She doesn\'t can drive.',
    correct: 'She can\'t drive.',
    rule: 'Modal verbs form negatives by adding "not" directly, never using do/does/did.'
  },
  {
    wrong: 'You mustn\'t to enter the lab.',
    correct: 'You mustn\'t enter the lab.',
    rule: 'Mustn\'t is directly followed by the bare base verb.'
  },
  {
    wrong: 'I must had finished it yesterday.',
    correct: 'I must have finished it yesterday.',
    rule: 'Past modal deduction is formed with Modal + have + V3, never "had".'
  },
  {
    wrong: 'Could you to help me?',
    correct: 'Could you help me?',
    rule: 'In interrogatives, use Modal + Subject + Bare Verb without "to".'
  }
];

function renderCommonMistakes() {
  const container = document.getElementById('mistakesGrid');
  if (!container) return;

  container.innerHTML = commonMistakesData.map((m, idx) => `
    <div class="mistake-card">
      <div class="mistake-card-top">
        <span class="mistake-tag-danger"><i class="fa-solid fa-triangle-exclamation"></i> ERROR #${idx + 1}</span>
      </div>
      <div class="mistake-row row-wrong">
        <i class="fa-solid fa-xmark"></i> <span>${m.wrong}</span>
      </div>
      <div class="mistake-row row-correct">
        <i class="fa-solid fa-check"></i> <span>${m.correct}</span>
      </div>
      <div class="mistake-rule-box">
        <strong>Rule:</strong> ${m.rule}
      </div>
    </div>
  `).join('');
}

/* ====================================================================
   8. REAL-LIFE SCENARIOS LAB
   ==================================================================== */
const scenariosData = [
  {
    title: 'University Office Hours',
    tag: 'FORMAL PERMISSION',
    dialogue: 'You knock on your professor’s office door to submit an assignment: "______ I come in for a brief consultation, Professor Reynolds?"',
    options: ['May', 'Can', 'Shall', 'Must'],
    correct: 0,
    explanation: '"May I...?" is the universally accepted polite and formal expression when requesting permission from a professor or supervisor.'
  },
  {
    title: 'Supportive Advice to a Colleague',
    tag: 'CONSTRUCTIVE ADVICE',
    dialogue: 'Your coworker has been working 60-hour weeks and feels exhausted: "You ______ take the weekend off and recharge."',
    options: ['should', 'mustn\'t', 'shall', 'may'],
    correct: 0,
    explanation: '"Should" provides friendly, non-aggressive advice that conveys care without demanding authority.'
  },
  {
    title: 'Weather & Travel Forecast',
    tag: 'TENTATIVE PREDICTION',
    dialogue: 'Dark clouds are drifting over the airport runway: "The pilot warned that our flight ______ experience turbulence."',
    options: ['might', 'shall', 'must to', 'would to'],
    correct: 0,
    explanation: '"Might" is used for uncertain weather conditions that could occur during transit.'
  },
  {
    title: 'Airport Security Checkpoint',
    tag: 'REGULATORY PROHIBITION',
    dialogue: 'Signboard at the security screening area: "Passengers ______ carry liquids over 100ml beyond this gate."',
    options: ['must not', 'don\'t have to', 'could', 'might not'],
    correct: 0,
    explanation: '"Must not" (prohibition) signifies that carrying large liquids is strictly banned by aviation law.'
  },
  {
    title: 'Detective Clue Deduction',
    tag: 'LOGICAL CERTAINTY',
    dialogue: 'The suspect\'s warm coffee cup is still on the desk: "He ______ be close by; he just stepped out."',
    options: ['must', 'can', 'shall', 'would'],
    correct: 0,
    explanation: '"Must" indicates strong logical deduction based on the warm coffee cup clue.'
  }
];

let activeScenarioIndex = 0;

function renderScenarios() {
  const tabRow = document.getElementById('scenarioTabs');
  const cardContainer = document.getElementById('scenarioCard');

  if (tabRow) {
    tabRow.innerHTML = scenariosData.map((sc, idx) => `
      <button class="scenario-tab-btn ${idx === activeScenarioIndex ? 'active' : ''}" onclick="selectScenario(${idx})">
        ${sc.title}
      </button>
    `).join('');
  }

  if (cardContainer) {
    const sc = scenariosData[activeScenarioIndex];
    cardContainer.innerHTML = `
      <div class="scenario-card-body">
        <div class="sc-context-badge"><i class="fa-solid fa-tag"></i> ${sc.tag}</div>
        <h4 class="sc-situation-title">${sc.title}</h4>
        <div class="sc-dialogue-box">
          ${sc.dialogue}
        </div>
        <div class="sc-options-grid">
          ${sc.options.map((opt, i) => `
            <button class="sc-opt-btn" onclick="checkScenarioAnswer(${i})">${opt}</button>
          `).join('')}
        </div>
        <div id="scenarioFeedback" class="sc-feedback-box" style="display:none;"></div>
      </div>
    `;
  }
}

window.selectScenario = function(idx) {
  activeScenarioIndex = idx;
  renderScenarios();
};

window.checkScenarioAnswer = function(chosenIdx) {
  const sc = scenariosData[activeScenarioIndex];
  const fb = document.getElementById('scenarioFeedback');
  if (!fb) return;

  fb.style.display = 'block';
  if (chosenIdx === sc.correct) {
    fb.className = 'sc-feedback-box feedback-success';
    fb.innerHTML = `<i class="fa-solid fa-check"></i> <strong>Excellent!</strong> ${sc.explanation}`;
  } else {
    fb.className = 'sc-feedback-box feedback-error';
    fb.innerHTML = `<i class="fa-solid fa-xmark"></i> <strong>Not optimal.</strong> The most natural modal here is <strong>${sc.options[sc.correct]}</strong>. ${sc.explanation}`;
  }
};

/* ====================================================================
   9. MODAL VERB DETECTOR & SENTENCE ANALYZER
   ==================================================================== */
const analyzerSentences = [
  {
    sentence: "She might be studying in the university library.",
    tokens: [
      { word: "She", type: "Subject (Pronoun)", role: "The agent performing or undergoing the action." },
      { word: "might", type: "Modal Auxiliary", role: "Expresses tentative possibility in the present/future." },
      { word: "be", type: "Continuous Auxiliary", role: "Forms the continuous aspect with the -ing verb." },
      { word: "studying", type: "Present Participle (V-ing)", role: "Main lexical verb denoting the ongoing activity." },
      { word: "in the university library.", type: "Prepositional Phrase", role: "Locative adverbial specifying where." }
    ]
  },
  {
    sentence: "They must have left their keys on the dining table.",
    tokens: [
      { word: "They", type: "Subject (Pronoun)", role: "Third-person plural subject." },
      { word: "must", type: "Modal Auxiliary", role: "Expresses strong logical deduction based on evidence." },
      { word: "have", type: "Perfect Aspect Auxiliary", role: "Partners with must and left to refer to past time." },
      { word: "left", type: "Past Participle (V3)", role: "Main lexical verb representing the completed past event." },
      { word: "their keys on the dining table.", type: "Direct Object + Complement", role: "The object and location of the action." }
    ]
  },
  {
    sentence: "May I ask a question regarding the final assignment?",
    tokens: [
      { word: "May", type: "Modal Auxiliary (Interrogative)", role: "Requests formal permission courteously." },
      { word: "I", type: "Subject (1st Person Pronoun)", role: "The person requesting permission." },
      { word: "ask", type: "Bare Infinitive (Base Verb)", role: "The main verb following the modal auxiliary." },
      { word: "a question regarding the final assignment?", type: "Direct Object & Prepositional Modifier", role: "The subject matter of the query." }
    ]
  },
  {
    sentence: "The project must be completed before Friday evening.",
    tokens: [
      { word: "The project", type: "Subject (Noun Phrase)", role: "The receiver of the action (Passive voice)." },
      { word: "must", type: "Modal Auxiliary", role: "Expresses strong requirement / strict deadline." },
      { word: "be", type: "Passive Auxiliary", role: "Forms the passive voice structure with V3." },
      { word: "completed", type: "Past Participle (V3)", role: "Main passive action." },
      { word: "before Friday evening.", type: "Time Adverbial", role: "Specifies the deadline." }
    ]
  },
  {
    sentence: "You should have revised the chapter more thoroughly.",
    tokens: [
      { word: "You", type: "Subject (Pronoun)", role: "Second person pronoun." },
      { word: "should", type: "Modal Auxiliary", role: "Expresses past recommendation / advice." },
      { word: "have", type: "Perfect Auxiliary", role: "Indicates past time reference in modal perfect." },
      { word: "revised", type: "Past Participle (V3)", role: "Main lexical verb in past participle." },
      { word: "the chapter more thoroughly.", type: "Direct Object + Adverbial", role: "Details what was recommended." }
    ]
  }
];

let activeSentenceIndex = 0;

function initSentenceAnalyzer() {
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSentenceIndex = parseInt(btn.getAttribute('data-sentence-index'), 10);
      renderSentenceTokens();
    });
  });

  renderSentenceTokens();
}

function renderSentenceTokens() {
  const container = document.getElementById('tokensContainer');
  const panel = document.getElementById('tokenAnalysisPanel');
  if (!container) return;

  const sentenceObj = analyzerSentences[activeSentenceIndex];
  container.innerHTML = sentenceObj.tokens.map((t, idx) => `
    <button class="token-word" onclick="inspectToken(${idx})">${t.word}</button>
  `).join('');

  if (panel) {
    panel.innerHTML = `
      <div class="panel-placeholder">
        <i class="fa-solid fa-arrow-pointer"></i>
        <span>Click on any word token above to inspect its syntactic category and modal role.</span>
      </div>
    `;
  }
}

window.inspectToken = function(tokenIdx) {
  const sentenceObj = analyzerSentences[activeSentenceIndex];
  const token = sentenceObj.tokens[tokenIdx];
  const panel = document.getElementById('tokenAnalysisPanel');
  if (!panel || !token) return;

  document.querySelectorAll('.token-word').forEach((w, i) => {
    w.classList.toggle('active-token', i === tokenIdx);
  });

  panel.innerHTML = `
    <div class="token-detail-card">
      <span style="font-size:0.75rem; font-weight:800; color:var(--indigo); letter-spacing:0.8px; text-transform:uppercase;">SYNTACTIC ANALYSIS</span>
      <h4 style="font-size: 1.3rem; margin: 0.25rem 0; color:var(--navy); font-family:var(--font-heading);">"${token.word}"</h4>
      <p style="font-weight:700; color:var(--royal-blue); margin-bottom:0.5rem;"><strong>Category:</strong> ${token.type}</p>
      <p style="color:var(--gray-700); font-size:0.95rem;"><strong>Grammatical Role:</strong> ${token.role}</p>
    </div>
  `;
};

/* ====================================================================
   10. CLASSIFICATION LAB (DRAG & DROP + CLICK-TO-CLASSIFY)
   ==================================================================== */
const classificationCategories = [
  { id: 'ability', title: 'ABILITY' },
  { id: 'possibility', title: 'POSSIBILITY' },
  { id: 'permission', title: 'PERMISSION' },
  { id: 'obligation', title: 'OBLIGATION' },
  { id: 'advice', title: 'ADVICE' },
  { id: 'prediction', title: 'PREDICTION' },
  { id: 'polite_request', title: 'POLITE REQUEST' }
];

const expressionsBankData = [
  { id: 'e1', text: 'can swim', category: 'ability' },
  { id: 'e2', text: 'may enter', category: 'permission' },
  { id: 'e3', text: 'must wear seatbelt', category: 'obligation' },
  { id: 'e4', text: 'should revise', category: 'advice' },
  { id: 'e5', text: 'might rain', category: 'possibility' },
  { id: 'e6', text: 'could you help me?', category: 'polite_request' },
  { id: 'e7', text: 'will arrive tomorrow', category: 'prediction' }
];

let classifiedItems = {};
let selectedExpressionForClick = null;

function initClassifierLab() {
  renderClassifierZones();
  renderExpressionBank();

  const resetBtn = document.getElementById('resetClassifierBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      classifiedItems = {};
      selectedExpressionForClick = null;
      renderExpressionBank();
      renderClassifierZones();
      updateClassifierScore();
    });
  }
}

function renderClassifierZones() {
  const zonesGrid = document.getElementById('dropZonesGrid');
  if (!zonesGrid) return;

  zonesGrid.innerHTML = classificationCategories.map(cat => `
    <div class="drop-zone" data-category="${cat.id}" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, '${cat.id}')" onclick="handleClickZone('${cat.id}')">
      <div class="zone-header">${cat.title}</div>
      <div class="zone-content" id="zoneContent-${cat.id}">
        ${(classifiedItems[cat.id] || []).map(item => `
          <div class="draggable-item" style="cursor:default; background: #ECFDF5; border-color:#10B981; color:#065F46;">
            <i class="fa-solid fa-check"></i> ${item.text}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderExpressionBank() {
  const bank = document.getElementById('expressionsBank');
  if (!bank) return;

  const placedIds = Object.values(classifiedItems).flat().map(i => i.id);
  const remaining = expressionsBankData.filter(e => !placedIds.includes(e.id));

  if (remaining.length === 0) {
    bank.innerHTML = '<span style="color:#15803D; font-weight:700;"><i class="fa-solid fa-award"></i> All expressions successfully classified!</span>';
    return;
  }

  bank.innerHTML = remaining.map(e => `
    <div class="draggable-item ${selectedExpressionForClick && selectedExpressionForClick.id === e.id ? 'selected-for-click' : ''}" 
         draggable="true" 
         ondragstart="handleDragStart(event, '${e.id}')" 
         onclick="handleSelectExpression('${e.id}')">
      ${e.text}
    </div>
  `).join('');
}

window.handleDragStart = function(e, id) {
  e.dataTransfer.setData('text/plain', id);
};

window.handleDragOver = function(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
};

window.handleDragLeave = function(e) {
  e.currentTarget.classList.remove('drag-over');
};

window.handleDrop = function(e, targetCategoryId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const expressionId = e.dataTransfer.getData('text/plain');
  processPlacement(expressionId, targetCategoryId);
};

window.handleSelectExpression = function(id) {
  const item = expressionsBankData.find(e => e.id === id);
  if (selectedExpressionForClick && selectedExpressionForClick.id === id) {
    selectedExpressionForClick = null;
  } else {
    selectedExpressionForClick = item;
  }
  renderExpressionBank();
};

window.handleClickZone = function(targetCategoryId) {
  if (selectedExpressionForClick) {
    processPlacement(selectedExpressionForClick.id, targetCategoryId);
    selectedExpressionForClick = null;
  }
};

function processPlacement(expressionId, targetCategoryId) {
  const item = expressionsBankData.find(e => e.id === expressionId);
  if (!item) return;

  if (item.category === targetCategoryId) {
    if (!classifiedItems[targetCategoryId]) classifiedItems[targetCategoryId] = [];
    classifiedItems[targetCategoryId].push(item);
    renderExpressionBank();
    renderClassifierZones();
    updateClassifierScore();
  } else {
    alert(`"${item.text}" does not belong to this category. Think about its grammatical function.`);
  }
}

function updateClassifierScore() {
  const scoreDisplay = document.getElementById('classifierScore');
  const count = Object.values(classifiedItems).flat().length;
  if (scoreDisplay) scoreDisplay.textContent = `${count} / ${expressionsBankData.length}`;
}

/* ====================================================================
   11. 3D FLASHCARDS ENGINE
   ==================================================================== */
const flashcardsDeck = [
  {
    type: 'CORE MODAL',
    verb: 'CAN',
    phonetic: '/kæn/',
    prompt: 'What are the four primary functions of "can" in modern English?',
    meanings: [
      '1. Present physical / learned ability',
      '2. Informal permission between peers',
      '3. General theoretical possibility',
      '4. Casual everyday requests'
    ],
    example: 'Example: "She can speak four languages." &bull; "Can I borrow your pen?"'
  },
  {
    type: 'CORE MODAL',
    verb: 'COULD',
    phonetic: '/kʊd/',
    prompt: 'How does "could" differ when expressing past time versus present politeness?',
    meanings: [
      '1. Past general ability ("I could swim when I was 5")',
      '2. Polite present request ("Could you help me?")',
      '3. Tentative possibility ("It could rain later")',
      '4. Friendly suggestion ("We could try another method")'
    ],
    example: 'Example: "Could you please open the window?"'
  },
  {
    type: 'CORE MODAL',
    verb: 'MAY',
    phonetic: '/meɪ/',
    prompt: 'What makes "may" suitable for academic and professional communication?',
    meanings: [
      '1. Formal permission in academic & official settings',
      '2. Real possibility (~50% likelihood)',
      '3. Polite first-person requests ("May I ask...")'
    ],
    example: 'Example: "Candidates may now begin the examination."'
  },
  {
    type: 'CORE MODAL',
    verb: 'MIGHT',
    phonetic: '/maɪt/',
    prompt: 'How does "might" express tentative possibility and caution?',
    meanings: [
      '1. Tentative, cautious present/future possibility',
      '2. Hypothetical situations & speculative ideas'
    ],
    example: 'Example: "It might rain, but the clouds look scattered."'
  },
  {
    type: 'CORE MODAL',
    verb: 'MUST',
    phonetic: '/mʌst/',
    prompt: 'What are the two major meanings of "must"?',
    meanings: [
      '1. Strong obligation / urgent necessity (Internal rule/speaker command)',
      '2. Strong logical deduction based on clear evidence ("He must be tired")'
    ],
    example: 'Example: "You must wear a seatbelt." &bull; "She must be exhausted."'
  },
  {
    type: 'CORE MODAL',
    verb: 'SHOULD',
    phonetic: '/ʃʊd/',
    prompt: 'When is "should" used for advice versus logical expectation?',
    meanings: [
      '1. Constructive advice & recommendation',
      '2. Logical expectation based on normal schedules',
      '3. Mild moral duty / obligation'
    ],
    example: 'Example: "You should rest." &bull; "The train should arrive soon."'
  },
  {
    type: 'CORE MODAL',
    verb: 'SHALL',
    phonetic: '/ʃæl/',
    prompt: 'What are the modern traditional uses of "shall"?',
    meanings: [
      '1. First-person suggestions ("Shall we begin?")',
      '2. First-person offers of help ("Shall I assist you?")',
      '3. Formal legal and contractual mandates'
    ],
    example: 'Example: "Shall we proceed to the lecture hall?"'
  },
  {
    type: 'CORE MODAL',
    verb: 'WILL',
    phonetic: '/wɪl/',
    prompt: 'What functions does "will" serve beyond future tense?',
    meanings: [
      '1. Spontaneous decision at speech time ("I\'ll help")',
      '2. Confident prediction based on belief',
      '3. Solemn promise or firm commitment',
      '4. Refusal with negative ("The engine won\'t start")'
    ],
    example: 'Example: "I will support you throughout your study."'
  },
  {
    type: 'CORE MODAL',
    verb: 'WOULD',
    phonetic: '/wʊd/',
    prompt: 'How is "would" utilized in polite discourse and conditionals?',
    meanings: [
      '1. Highly courteous requests & offers ("Would you like...")',
      '2. Hypothetical conditional results (2nd/3rd conditional)',
      '3. Repeated past habits & nostalgic routines'
    ],
    example: 'Example: "Would you mind closing the door?"'
  },
  {
    type: 'SEMI-MODAL',
    verb: 'HAVE TO',
    phonetic: '/hæv tuː/',
    prompt: 'How does "have to" differ from "must"?',
    meanings: [
      '1. External requirement, legal rule, or official schedule',
      '2. Unlike pure modals, conjugates across tenses (had to, will have to)'
    ],
    example: 'Example: "I have to renew my library pass today."'
  },
  {
    type: 'SEMI-MODAL',
    verb: 'OUGHT TO',
    phonetic: '/ɔːt tuː/',
    prompt: 'What is the grammatical rule for "ought to"?',
    meanings: [
      '1. Carries identical meaning to "should" (moral duty & advice)',
      '2. Always followed by the particle "to" before the base verb'
    ],
    example: 'Example: "You ought to double-check your calculations."'
  },
  {
    type: 'ADVANCED PERFECT',
    verb: 'MUST HAVE + V3',
    phonetic: '/mʌst hæv/',
    prompt: 'What does "must have + past participle" indicate?',
    meanings: [
      '1. High certainty / logical deduction regarding a completed past event',
      '2. Opposite of "can\'t have + V3" (past impossibility)'
    ],
    example: 'Example: "The lights were on; they must have been at home."'
  }
];

let activeFlashcardIndex = 0;

function initFlashcards() {
  renderActiveFlashcard();

  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');
  const shuffleBtn = document.getElementById('shuffleDeckBtn');
  const masteredBtn = document.getElementById('markMasteredBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeFlashcardIndex = (activeFlashcardIndex - 1 + flashcardsDeck.length) % flashcardsDeck.length;
      unflipCard();
      renderActiveFlashcard();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeFlashcardIndex = (activeFlashcardIndex + 1) % flashcardsDeck.length;
      unflipCard();
      renderActiveFlashcard();
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      activeFlashcardIndex = Math.floor(Math.random() * flashcardsDeck.length);
      unflipCard();
      renderActiveFlashcard();
    });
  }

  if (masteredBtn) {
    masteredBtn.addEventListener('click', () => {
      const card = flashcardsDeck[activeFlashcardIndex];
      if (!userState.flashcardsMastered.includes(card.verb)) {
        userState.flashcardsMastered.push(card.verb);
        saveUserState();
      }
      activeFlashcardIndex = (activeFlashcardIndex + 1) % flashcardsDeck.length;
      unflipCard();
      renderActiveFlashcard();
    });
  }
}

window.flipActiveFlashcard = function() {
  const cardElement = document.getElementById('activeFlashcard');
  if (cardElement) {
    cardElement.classList.toggle('is-flipped');
  }
};

function unflipCard() {
  const cardElement = document.getElementById('activeFlashcard');
  if (cardElement) {
    cardElement.classList.remove('is-flipped');
  }
}

function renderActiveFlashcard() {
  const card = flashcardsDeck[activeFlashcardIndex];
  const progressText = document.getElementById('flashcardDeckProgress');
  const masteryBadge = document.getElementById('flashcardMasteryBadge');
  const frontType = document.getElementById('fcFrontType');
  const frontTitle = document.getElementById('fcFrontTitle');
  const frontPhonetic = document.getElementById('fcFrontPhonetic');
  const frontPrompt = document.getElementById('fcFrontPrompt');
  const backTitle = document.getElementById('fcBackTitle');
  const backMeanings = document.getElementById('fcBackMeanings');
  const backExample = document.getElementById('fcBackExample');

  if (progressText) progressText.textContent = `Card ${activeFlashcardIndex + 1} of ${flashcardsDeck.length}`;
  
  if (masteryBadge) {
    const isMastered = userState.flashcardsMastered.includes(card.verb);
    masteryBadge.textContent = isMastered ? 'Mastered ✓' : 'In Progress';
    masteryBadge.style.color = isMastered ? '#15803D' : 'var(--indigo)';
  }

  if (frontType) frontType.textContent = card.type;
  if (frontTitle) frontTitle.textContent = card.verb;
  if (frontPhonetic) frontPhonetic.textContent = card.phonetic;
  if (frontPrompt) frontPrompt.textContent = card.prompt;
  if (backTitle) backTitle.textContent = card.verb;

  if (backMeanings) {
    backMeanings.innerHTML = card.meanings.map(m => `<p>${m}</p>`).join('');
  }
  if (backExample) {
    backExample.innerHTML = `<div style="background:var(--soft-bg); padding:0.75rem; border-radius:var(--radius-sm); font-size:0.88rem; color:var(--navy);">${card.example}</div>`;
  }
}

/* ====================================================================
   12. COMPLETE QUIZ ENGINE (15 Varied Questions)
   ==================================================================== */
const quizQuestionsBank = [
  {
    type: 'Meaning Identification',
    prompt: 'In the sentence "She can speak four languages," what does "can" express?',
    options: ['Present learned ability', 'Formal permission', 'Strict obligation', 'Past regret'],
    correct: 0,
    explanation: '"Can speak" refers directly to an acquired skill and physical capability in the present.'
  },
  {
    type: 'Grammatical Structure',
    prompt: 'Which of the following sentences adheres correctly to modal syntax?',
    options: [
      'He can to solve the problem.',
      'She must goes to the office.',
      'They should study the syllabus.',
      'You will to succeed.'
    ],
    correct: 2,
    explanation: 'Core modal verbs must be followed immediately by the bare base verb without "to" and without "-s".'
  },
  {
    type: 'Mustn\'t vs. Don\'t Have To',
    prompt: 'Complete the sentence: "Visitors ______ touch the fragile artifacts in the museum."',
    options: ['mustn\'t', 'don\'t have to', 'could', 'shall not'],
    correct: 0,
    explanation: '"Mustn\'t" signifies strict prohibition. Touching museum artifacts is strictly forbidden.'
  },
  {
    type: 'Polite Requests',
    prompt: 'Which phrasing is the most polite and respectful for a formal conference room?',
    options: [
      'May I ask a question?',
      'Can I ask a question?',
      'Must I ask a question?',
      'Will I ask a question?'
    ],
    correct: 0,
    explanation: '"May I...?" is the recognized standard for formal, respectful first-person permission.'
  },
  {
    type: 'Modal Perfect (Past Deduction)',
    prompt: '"The ground is completely dry; it ______ have rained during the night."',
    options: ['can\'t', 'must', 'should', 'shall'],
    correct: 0,
    explanation: '"Can\'t have + V3" is used for past logical impossibility based on the dry ground.'
  },
  {
    type: 'Modal Perfect (Past Regret)',
    prompt: '"I failed the road driving test. I ______ have practiced parking more."',
    options: ['should', 'might', 'will', 'can'],
    correct: 0,
    explanation: '"Should have + V3" expresses regret over a sensible past action that was omitted.'
  },
  {
    type: 'Modal Passive',
    prompt: 'What is the passive form of "You must submit the report today"?',
    options: [
      'The report must be submitted today.',
      'The report must submitted today.',
      'The report must to be submit today.',
      'The report must have submit today.'
    ],
    correct: 0,
    explanation: 'Modal passive is formed using: Modal + be + Past Participle (V3).'
  },
  {
    type: 'Modal Continuous',
    prompt: '"Don\'t phone him now; he ______ be sleeping after his night shift."',
    options: ['may', 'shall', 'ought', 'would to'],
    correct: 0,
    explanation: '"May be sleeping" forms the modal continuous aspect for an action currently in progress.'
  },
  {
    type: 'May vs. Might',
    prompt: 'Which statement accurately describes the nuance between "may" and "might"?',
    options: [
      '"Might" conveys a more tentative, cautious possibility than "may".',
      '"May" is only used for past events.',
      '"Might" is never used for possibility.',
      '"May" requires the preposition "to".'
    ],
    correct: 0,
    explanation: '"Might" expresses a more tentative and speculative nuance of possibility than "may".'
  },
  {
    type: 'Obligation vs. Advice',
    prompt: '"You ______ take an umbrella; the weather forecast looks unpredictable." (Helpful recommendation)',
    options: ['should', 'must', 'shall', 'would to'],
    correct: 0,
    explanation: '"Should" represents sensible advice and recommendation.'
  },
  {
    type: 'Specific Past Ability',
    prompt: '"After hours of intense debugging, the programmer ______ fix the critical error."',
    options: ['was able to', 'could to', 'can', 'should to'],
    correct: 0,
    explanation: 'For a single, specific successful past achievement, standard English uses "was/were able to" rather than "could".'
  },
  {
    type: 'Correct a Modal Mistake',
    prompt: 'Identify the corrected version of: "He cans speak English."',
    options: [
      'He can speak English.',
      'He can to speak English.',
      'He cans to speak English.',
      'He can speaks English.'
    ],
    correct: 0,
    explanation: 'Modal verbs never take the third-person "-s" suffix.'
  },
  {
    type: 'Semi-Modals',
    prompt: 'Which semi-modal properly expresses external requirement and conjugates across tenses?',
    options: ['have to', 'must', 'can', 'should'],
    correct: 0,
    explanation: '"Have to" conjugates into had to, will have to, has to, representing external obligation.'
  },
  {
    type: 'Modal Perfect Continuous',
    prompt: '"His eyes are exhausted; he ______ have been reading the manuscript all night."',
    options: ['must', 'can', 'shall', 'would to'],
    correct: 0,
    explanation: '"Must have been + V-ing" expresses strong deduction about an ongoing past activity.'
  },
  {
    type: 'Contextual Selection',
    prompt: '"______ we begin the team presentation, ladies and gentlemen?"',
    options: ['Shall', 'Mustn\'t', 'Might to', 'Can to'],
    correct: 0,
    explanation: '"Shall we...?" is the formal and elegant structure for proposing a collective action.'
  }
];

let currentQuizIndex = 0;
let quizScore = 0;
let userQuizAnswers = [];

function initQuizEngine() {
  currentQuizIndex = 0;
  quizScore = 0;
  userQuizAnswers = [];
  renderQuizQuestion();

  const nextBtn = document.getElementById('nextQuestionBtn');
  const restartBtn = document.getElementById('restartQuizBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuizIndex++;
      if (currentQuizIndex < quizQuestionsBank.length) {
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuizIndex = 0;
      quizScore = 0;
      userQuizAnswers = [];
      const resultsScreen = document.getElementById('quizResultsScreen');
      const questionBox = document.querySelector('.quiz-question-box');
      if (resultsScreen) resultsScreen.style.display = 'none';
      if (questionBox) questionBox.style.display = 'block';
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const item = quizQuestionsBank[currentQuizIndex];
  const qNum = document.getElementById('currentQuestionNum');
  const totalNum = document.getElementById('totalQuestionsNum');
  const qType = document.getElementById('quizQuestionType');
  const liveScore = document.getElementById('liveQuizScore');
  const prompt = document.getElementById('quizQuestionPrompt');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const progressFill = document.getElementById('quizStepProgressFill');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('nextQuestionBtn');

  if (qNum) qNum.textContent = currentQuizIndex + 1;
  if (totalNum) totalNum.textContent = quizQuestionsBank.length;
  if (qType) qType.textContent = item.type;
  if (liveScore) liveScore.textContent = `${quizScore} / ${quizQuestionsBank.length}`;
  if (prompt) prompt.textContent = item.prompt;
  if (feedbackBox) feedbackBox.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  if (progressFill) {
    const percent = ((currentQuizIndex + 1) / quizQuestionsBank.length) * 100;
    progressFill.style.width = `${percent}%`;
  }

  if (optionsContainer) {
    optionsContainer.innerHTML = '';

    // Create randomized option indices so correct answer isn't fixed
    const shuffledIndices = item.options.map((_, i) => i).sort(() => Math.random() - 0.5);

    shuffledIndices.forEach(originalIdx => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span>${item.options[originalIdx]}</span> <i class="fa-regular fa-circle"></i>`;
      btn.onclick = () => handleQuizOptionClick(originalIdx, btn, item);
      optionsContainer.appendChild(btn);
    });
  }
}

function handleQuizOptionClick(selectedIndex, clickedBtn, item) {
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const statusTitle = document.getElementById('feedbackStatusTitle');
  const explanationText = document.getElementById('feedbackExplanationText');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const liveScore = document.getElementById('liveQuizScore');

  // Disable all options
  if (optionsContainer) {
    optionsContainer.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
  }

  userState.questionsAnswered++;
  const isCorrect = (selectedIndex === item.correct);

  if (isCorrect) {
    quizScore++;
    userState.correctAnswers++;
    clickedBtn.classList.add('correct-opt');
    clickedBtn.querySelector('i').className = 'fa-solid fa-circle-check';
  } else {
    clickedBtn.classList.add('wrong-opt');
    clickedBtn.querySelector('i').className = 'fa-solid fa-circle-xmark';
  }

  saveUserState();

  if (liveScore) liveScore.textContent = `${quizScore} / ${quizQuestionsBank.length}`;

  if (feedbackBox) {
    feedbackBox.style.display = 'flex';
    feedbackBox.className = `quiz-feedback-banner ${isCorrect ? 'fb-correct' : 'fb-wrong'}`;
    if (statusTitle) statusTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    if (explanationText) explanationText.innerHTML = item.explanation;
    if (feedbackIcon) feedbackIcon.innerHTML = isCorrect ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>';
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = (currentQuizIndex === quizQuestionsBank.length - 1) ? 'View Results' : 'Next Question';
  }
}

function showQuizResults() {
  const resultsScreen = document.getElementById('quizResultsScreen');
  const questionBox = document.querySelector('.quiz-question-box');
  const finalScore = document.getElementById('finalScoreDisplay');
  const finalPercent = document.getElementById('finalPercentDisplay');
  const gradeBadge = document.getElementById('finalGradeBadge');

  if (questionBox) questionBox.style.display = 'none';
  if (resultsScreen) resultsScreen.style.display = 'block';

  const percentage = Math.round((quizScore / quizQuestionsBank.length) * 100);

  if (finalScore) finalScore.textContent = `${quizScore} / ${quizQuestionsBank.length}`;
  if (finalPercent) finalPercent.textContent = `${percentage}% Accuracy`;

  if (gradeBadge) {
    if (percentage >= 90) {
      gradeBadge.textContent = '🌟 Master Grammarian (Distinction)';
    } else if (percentage >= 70) {
      gradeBadge.textContent = '🏅 Advanced Grammar Scholar';
    } else if (percentage >= 50) {
      gradeBadge.textContent = '📖 Competent Explorer';
    } else {
      gradeBadge.textContent = '🌱 Keep Practicing';
    }
  }
}

/* ====================================================================
   13. ADVANCED MASTERY CHALLENGE
   ==================================================================== */
const challengeData = {
  prompt: 'Look at those dense, dark clouds descending over the summit. The barometric pressure has plummeted, so it ______ snow heavily before midnight.',
  options: ['is bound to / will', 'might to', 'can to', 'shall not'],
  correct: 0,
  explanation: 'Compelling meteorological evidence and physical certainty require "will" or modal expressions of strong certainty.'
};

function initMasteryChallenge() {
  const optionsContainer = document.getElementById('challengeOptions');
  const feedback = document.getElementById('challengeFeedback');
  if (!optionsContainer) return;

  optionsContainer.innerHTML = challengeData.options.map((opt, idx) => `
    <button class="ch-btn" onclick="handleChallengeAnswer(${idx})">${opt}</button>
  `).join('');
}

window.handleChallengeAnswer = function(chosenIdx) {
  const feedback = document.getElementById('challengeFeedback');
  if (!feedback) return;

  feedback.style.display = 'block';
  if (chosenIdx === challengeData.correct) {
    feedback.className = 'ch-feedback feedback-success';
    feedback.innerHTML = `<i class="fa-solid fa-check"></i> <strong>Spot on!</strong> ${challengeData.explanation}`;
  } else {
    feedback.className = 'ch-feedback feedback-error';
    feedback.innerHTML = `<i class="fa-solid fa-xmark"></i> <strong>Not quite.</strong> ${challengeData.explanation}`;
  }
};

/* ====================================================================
   14. LIVE SEARCH & KEYBOARD SHORTCUTS
   ==================================================================== */
const searchIndex = [
  { title: 'CAN — Ability & Permission', snippet: 'Physical ability, informal permission, general possibility, requests.', target: 'lesson-can' },
  { title: 'COULD — Past Ability & Polite Requests', snippet: 'Past ability, polite requests, tentative suggestions, possibility.', target: 'lesson-could' },
  { title: 'MAY — Formal Permission & Possibility', snippet: 'Formal classroom permission, 50% probability, courteous requests.', target: 'lesson-may' },
  { title: 'MIGHT — Tentative Possibility', snippet: 'Cautious hypothesis, tentative possibility, weather predictions.', target: 'lesson-might' },
  { title: 'MUST — Strong Obligation & Deduction', snippet: 'Urgent necessity, official rules, logical conclusions based on evidence.', target: 'lesson-must' },
  { title: 'SHOULD — Constructive Advice & Expectation', snippet: 'Giving recommendations, logical expectation, mild duties.', target: 'lesson-should' },
  { title: 'SHALL — Suggestions & Legal Usage', snippet: 'Offers with I, suggestions with we, formal contract rules.', target: 'lesson-shall' },
  { title: 'WILL — Future, Promise & Willingness', snippet: 'Future actions, spontaneous decisions, firm promises.', target: 'lesson-will' },
  { title: 'WOULD — Politeness & Conditionals', snippet: 'Polite requests, second & third conditionals, past habitual actions.', target: 'lesson-would' },
  { title: 'The Universal Modal Formula', snippet: 'Subject + Modal + Bare Base Verb (V1) without "to" or "-s".', target: 'formula' },
  { title: 'Must vs. Have To', snippet: 'Internal speaker obligation vs. External legal/schedule rules.', target: 'must-vs-haveto' },
  { title: 'Mustn\'t vs. Don\'t Have To', snippet: 'Strict prohibition (Do not do it!) vs. Lack of obligation (Optional).', target: 'mustnt-vs-donthaveto' },
  { title: 'Modal Perfect (Have + V3)', snippet: 'Must have, Should have, Could have, Might have for past deductions and regrets.', target: 'advanced' },
  { title: 'Modal Passive Structure', snippet: 'Modal + be + past participle & Modal + have been + past participle.', target: 'advanced' },
  { title: 'Common Mistakes Gallery', snippet: 'Reviewing high-frequency modal verb errors and rules.', target: 'mistakes' }
];

function initSearchEngine() {
  const triggerBtn = document.getElementById('searchTriggerBtn');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const resultsList = document.getElementById('searchResultsList');
  const resultsCount = document.getElementById('searchResultsCount');

  function openSearch() {
    if (modal) {
      modal.classList.add('is-open');
      if (input) {
        input.focus();
        input.value = '';
      }
      renderSearchResults('');
    }
  }

  function closeSearch() {
    if (modal) modal.classList.remove('is-open');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openSearch);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (input) {
        input.value = '';
        renderSearchResults('');
        input.focus();
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });
  }

  // Keyboard shortcut: Press / or Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeSearch();
    }
  });

  function renderSearchResults(query) {
    if (!resultsList) return;

    if (!query) {
      if (resultsCount) resultsCount.textContent = 'Type to search the grammar chapter';
      resultsList.innerHTML = searchIndex.map(item => `
        <div class="search-result-item" onclick="navigateToLesson('${item.target}'); document.getElementById('searchModal').classList.remove('is-open');">
          <h5>${item.title}</h5>
          <p>${item.snippet}</p>
        </div>
      `).join('');
      return;
    }

    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.snippet.toLowerCase().includes(query)
    );

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} result(s) found`;
    }

    if (filtered.length === 0) {
      resultsList.innerHTML = '<div style="padding:1.5rem; text-align:center; color:var(--gray-600);">No matching grammar topics found. Try searching "must", "permission", or "formula".</div>';
      return;
    }

    resultsList.innerHTML = filtered.map(item => `
      <div class="search-result-item" onclick="navigateToLesson('${item.target}'); document.getElementById('searchModal').classList.remove('is-open');">
        <h5>${item.title}</h5>
        <p>${item.snippet}</p>
      </div>
    `).join('');
  }
}

/* ====================================================================
   15. INITIALIZATION DISPATCHER
   ==================================================================== */
function initApp() {
  updateDashboardUI();
  initModalOfTheDay();
  initBookmarkListeners();
  initPossibilityTabs();
  initPolitenessSelector();
  initLabListeners();
  renderCommonMistakes();
  renderScenarios();
  initSentenceAnalyzer();
  initClassifierLab();
  initFlashcards();
  initQuizEngine();
  initMasteryChallenge();
  initSearchEngine();

  // Reset Progress Button Listener
  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your saved grammar progress and bookmarks?')) {
        userState = { ...defaultState };
        saveUserState();
      }
    });
  }

  // Mobile Menu Toggle Listener
  const mobBtn = document.getElementById('mobileMenuBtn');
  const mobMenu = document.getElementById('mobileMenu');
  if (mobBtn && mobMenu) {
    mobBtn.addEventListener('click', () => {
      const isExpanded = mobBtn.getAttribute('aria-expanded') === 'true';
      mobBtn.setAttribute('aria-expanded', !isExpanded);
      mobMenu.style.display = isExpanded ? 'none' : 'block';
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        mobMenu.style.display = 'none';
        mobBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mark Lesson viewed button listeners
  document.querySelectorAll('.btn-mark-viewed').forEach(btn => {
    btn.addEventListener('click', () => {
      const lessonId = btn.getAttribute('data-lesson');
      if (lessonId) {
        if (!userState.lessonsViewed.includes(lessonId)) {
          userState.lessonsViewed.push(lessonId);
        } else {
          userState.lessonsViewed = userState.lessonsViewed.filter(id => id !== lessonId);
        }
        saveUserState();
      }
    });
  });
}
