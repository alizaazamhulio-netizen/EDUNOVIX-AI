/**
 * Active & Passive Voice — MDCAT English Learning Module
 * File: active-passive-voice.js
 * Comprehensive interactive script with Quiz (25 MCQs), Flashcards, Voice Transformer,
 * Search, Bookmarks, Theme toggle, Progress Tracking, and Copy Utilities.
 */

// ==========================================
// 1. Data Store: MCQs, Flashcards, Transformer
// ==========================================

const MDCAT_QUESTIONS = [
  {
    id: 1,
    question: 'Choose the correct passive form: "The doctor examines the patient."',
    options: [
      'The patient examined the doctor.',
      'The patient is examined by the doctor.',
      'The patient was examined by the doctor.',
      'The patient has examined the doctor.'
    ],
    correctAnswer: 1,
    category: 'Active to Passive',
    rule: 'Present Simple Active (V1) → is/am/are + V3',
    explanation: '"examines" is Present Simple. Passive structure requires "is examined by the doctor".'
  },
  {
    id: 2,
    question: 'Choose the correct passive form: "The researchers are conducting the experiment."',
    options: [
      'The experiment is conducted by the researchers.',
      'The experiment was conducted by the researchers.',
      'The experiment is being conducted by the researchers.',
      'The experiment has been conducted by the researchers.'
    ],
    correctAnswer: 2,
    category: 'Active to Passive',
    rule: 'Present Continuous Active (is/are + V-ing) → is/are + being + V3',
    explanation: 'Continuous tenses MUST retain "being" + V3 in the passive form.'
  },
  {
    id: 3,
    question: 'Choose the correct passive form: "The scientist has completed the experiment."',
    options: [
      'The experiment has been completed by the scientist.',
      'The experiment was completed by the scientist.',
      'The experiment is completed by the scientist.',
      'The experiment is being completed by the scientist.'
    ],
    correctAnswer: 0,
    category: 'Active to Passive',
    rule: 'Present Perfect Active (has/have + V3) → has/have + been + V3',
    explanation: 'Perfect tenses MUST introduce "been" + V3 in the passive voice.'
  },
  {
    id: 4,
    question: 'Identify the tense and voice: "The sample was analyzed by the technician."',
    options: [
      'Present Simple Passive',
      'Past Simple Passive',
      'Past Continuous Passive',
      'Past Perfect Passive'
    ],
    correctAnswer: 1,
    category: 'Tense Recognition',
    rule: 'was/were + V3 = Past Simple Passive',
    explanation: '"was analyzed" is formed by was + V3 (Past Simple Passive).'
  },
  {
    id: 5,
    question: 'Choose the correct passive form: "The technician was testing the machine."',
    options: [
      'The machine is tested by the technician.',
      'The machine was tested by the technician.',
      'The machine was being tested by the technician.',
      'The machine had been tested by the technician.'
    ],
    correctAnswer: 2,
    category: 'Active to Passive',
    rule: 'Past Continuous Active (was/were + V-ing) → was/were + being + V3',
    explanation: 'Past Continuous passive requires "was being" + V3 ("tested").'
  },
  {
    id: 6,
    question: 'Choose the correct passive form: "The researchers had completed the study."',
    options: [
      'The study had been completed by the researchers.',
      'The study was completed by the researchers.',
      'The study has been completed by the researchers.',
      'The study will be completed by the researchers.'
    ],
    correctAnswer: 0,
    category: 'Active to Passive',
    rule: 'Past Perfect Active (had + V3) → had + been + V3',
    explanation: 'Past Perfect active transforms into "had been" + V3.'
  },
  {
    id: 7,
    question: 'Choose the correct passive form: "The laboratory will conduct the test."',
    options: [
      'The test would be conducted by the laboratory.',
      'The test will be conducted by the laboratory.',
      'The test is conducted by the laboratory.',
      'The test will have conducted by the laboratory.'
    ],
    correctAnswer: 1,
    category: 'Modals & Future',
    rule: 'Future Simple (will + V1) → will + be + V3',
    explanation: 'Future Simple active uses "will be" + V3 in the passive form.'
  },
  {
    id: 8,
    question: 'Choose the correct passive form: "The scientists will have completed the research."',
    options: [
      'The research will be completed by the scientists.',
      'The research will have been completed by the scientists.',
      'The research would have been completed by the scientists.',
      'The research has been completed by the scientists.'
    ],
    correctAnswer: 1,
    category: 'Modals & Future',
    rule: 'Future Perfect (will have + V3) → will have been + V3',
    explanation: 'Future Perfect passive requires "will have been" + V3.'
  },
  {
    id: 9,
    question: 'Choose the correct passive form: "Students must follow the instructions."',
    options: [
      'The instructions must follow by students.',
      'The instructions must be followed by students.',
      'The instructions should have followed by students.',
      'The instructions are must followed by students.'
    ],
    correctAnswer: 1,
    category: 'Modals & Future',
    rule: 'Modal Verbs (modal + V1) → modal + be + V3',
    explanation: 'Modals take "modal + be + V3" (e.g. "must be followed").'
  },
  {
    id: 10,
    question: 'Choose the correct passive form: "The doctor did not prescribe the medicine."',
    options: [
      'The medicine is not prescribed by the doctor.',
      'The medicine was not prescribed by the doctor.',
      'The medicine did not prescribed by the doctor.',
      'The medicine had not been prescribed by the doctor.'
    ],
    correctAnswer: 1,
    category: 'Negative & Interrogative',
    rule: 'Past Simple Negative (did not + V1) → was/were + not + V3',
    explanation: '"did not prescribe" indicates Past Simple, which changes to "was not prescribed".'
  },
  {
    id: 11,
    question: 'Choose the correct passive form: "Did the scientist conduct the experiment?"',
    options: [
      'Is the experiment conducted by the scientist?',
      'Was the experiment conducted by the scientist?',
      'Did the experiment conducted by the scientist?',
      'Has the experiment been conducted by the scientist?'
    ],
    correctAnswer: 1,
    category: 'Negative & Interrogative',
    rule: 'Past Simple Question (Did + S + V1?) → Was/Were + Object + V3?',
    explanation: 'Past Simple question starting with "Did" converts into "Was the experiment conducted...".'
  },
  {
    id: 12,
    question: 'Choose the correct passive form: "Open the door."',
    options: [
      'The door must open.',
      'Let the door be opened.',
      'You open the door.',
      'The door is opened.'
    ],
    correctAnswer: 1,
    category: 'Imperatives',
    rule: 'Imperative (Command) → Let + Object + be + V3',
    explanation: 'Standard imperative commands transform using "Let + Object + be + V3".'
  },
  {
    id: 13,
    question: 'Why can "The baby sleeps peacefully" NOT be converted into passive voice?',
    options: [
      'Because "sleeps" is in the present continuous tense.',
      'Because "sleeps" is an intransitive verb and has no direct object.',
      'Because the subject is a living person.',
      'Because an adverb ("peacefully") is present.'
    ],
    correctAnswer: 1,
    category: 'Special Cases',
    rule: 'Intransitive Verbs cannot form Passive Voice',
    explanation: 'Passive voice requires an object to receive the action. "Sleeps" is intransitive with no direct object.'
  },
  {
    id: 14,
    question: 'Choose the most natural passive form: "Someone stole my bicycle."',
    options: [
      'My bicycle was stolen by someone.',
      'My bicycle is stolen by someone.',
      'My bicycle was stolen.',
      'My bicycle had stolen.'
    ],
    correctAnswer: 2,
    category: 'Special Cases',
    rule: 'Omission of "by + agent" when subject is vague/unknown',
    explanation: 'When the doer is unknown (like "someone", "somebody", "people"), omit "by someone" for standard natural English.'
  },
  {
    id: 15,
    question: 'Choose the correct passive form: "She helps me."',
    options: [
      'I was helped by her.',
      'I am helped by her.',
      'She is helped by me.',
      'Me is helped by she.'
    ],
    correctAnswer: 1,
    category: 'Pronoun Changes',
    rule: 'Subject "She" → "her" after by, Object "me" → Subject "I"',
    explanation: 'Present Simple "helps" + Object "me" → "I am helped by her".'
  },
  {
    id: 16,
    question: 'Identify the error in this sentence: "The letter is wrote by Ali."',
    options: [
      'Missing the helping verb "being"',
      'Incorrect preposition instead of "with"',
      'Incorrect verb form: V2 "wrote" used instead of V3 "written"',
      'Subject-verb agreement error'
    ],
    correctAnswer: 2,
    category: 'MDCAT Traps & Errors',
    rule: 'Passive Voice ALWAYS uses V3 (Past Participle)',
    explanation: 'Passive voice strictly requires Past Participle (V3). "wrote" is V2; the correct form is "written".'
  },
  {
    id: 17,
    question: 'Choose the correct passive form: "The surgeon operates on the patient."',
    options: [
      'The patient is operated by the surgeon.',
      'The patient was operated on by the surgeon.',
      'The patient is operated on by the surgeon.',
      'The surgeon is operated by the patient.'
    ],
    correctAnswer: 2,
    category: 'MDCAT Traps & Errors',
    rule: 'Prepositional Verbs retain their prepositions in passive voice',
    explanation: '"operate on" is a prepositional phrase; the preposition "on" must NOT be dropped in passive voice.'
  },
  {
    id: 18,
    question: 'Choose the correct passive form: "Who wrote this medical article?"',
    options: [
      'By whom was this medical article written?',
      'Who was written this medical article?',
      'Whom was written this medical article?',
      'By whom this medical article was written?'
    ],
    correctAnswer: 0,
    category: 'Negative & Interrogative',
    rule: 'Who → By whom + Auxiliary + Subject + V3?',
    explanation: 'Questions with "Who" change to "By whom was this medical article written?". Note inverted auxiliary-subject order.'
  },
  {
    id: 19,
    question: 'Choose the active form of: "The instructions should have been read by the candidate."',
    options: [
      'The candidate should read the instructions.',
      'The candidate should have read the instructions.',
      'The candidate had read the instructions.',
      'The candidate must have read the instructions.'
    ],
    correctAnswer: 1,
    category: 'Passive to Active',
    rule: 'modal + have been + V3 → modal + have + V3',
    explanation: '"should have been read" in passive converts to "should have read" in active.'
  },
  {
    id: 20,
    question: 'Choose the correct passive form: "Doctors can treat the disease."',
    options: [
      'The disease can treated by doctors.',
      'The disease can be treated by doctors.',
      'The disease could be treated by doctors.',
      'The disease is can treated by doctors.'
    ],
    correctAnswer: 1,
    category: 'Modals & Future',
    rule: 'can + V1 → can + be + V3',
    explanation: '"can treat" changes to "can be treated by doctors". Modals do not shift tense in voice transformation.'
  },
  {
    id: 21,
    question: 'What is the passive form of: "Complete the assignment immediately."',
    options: [
      'Let the assignment be completed immediately.',
      'The assignment is completed immediately.',
      'Let the assignment completed immediately.',
      'You complete the assignment immediately.'
    ],
    correctAnswer: 0,
    category: 'Imperatives',
    rule: 'Imperative → Let + Object + be + V3',
    explanation: 'Imperative orders use "Let + Object + be + V3" ("Let the assignment be completed immediately").'
  },
  {
    id: 22,
    question: 'Choose the correct passive form: "They did not invite us."',
    options: [
      'We were not invited by them.',
      'We are not invited by them.',
      'Us was not invited by them.',
      'We had not been invited by them.'
    ],
    correctAnswer: 0,
    category: 'Pronoun Changes',
    rule: 'did not invite (Past Simple) → were not invited',
    explanation: '"us" becomes subject "We", "did not invite" becomes "were not invited by them".'
  },
  {
    id: 23,
    question: 'Identify the voice of: "The test will be conducted tomorrow."',
    options: [
      'Active Voice — Future Simple',
      'Passive Voice — Future Simple',
      'Passive Voice — Present Continuous',
      'Active Voice — Future Perfect'
    ],
    correctAnswer: 1,
    category: 'Tense Recognition',
    rule: 'will + be + V3 = Future Simple Passive',
    explanation: '"will be conducted" contains will + be + V3, representing Future Simple in the Passive Voice.'
  },
  {
    id: 24,
    question: 'Which of the following sentences CANNOT be made passive?',
    options: [
      'The professor delivered a lecture.',
      'The students arrived early in the morning.',
      'The nurse administered the injection.',
      'The chemist synthesized the compound.'
    ],
    correctAnswer: 1,
    category: 'Special Cases',
    rule: 'Intransitive verb "arrived" cannot form passive',
    explanation: '"arrived" is an intransitive verb with no object to become the passive subject.'
  },
  {
    id: 25,
    question: 'Spot the incorrect passive transformation: Active: "The pathologist is examining the biopsy."',
    options: [
      'Passive: "The biopsy is being examined by the pathologist."',
      'Passive: "The biopsy was examined by the pathologist."',
      'Passive: "The biopsy has been examined by the pathologist."',
      'Both B and C are incorrect transformations.'
    ],
    correctAnswer: 3,
    category: 'MDCAT Traps & Errors',
    rule: 'Never change the tense when converting active to passive',
    explanation: 'Option A is the only correct conversion. Changing Present Continuous to Past Simple (B) or Present Perfect (C) alters the tense.'
  }
];

const FLASHCARDS = [
  {
    id: 1,
    title: 'Core Voice Definition',
    category: 'Rule',
    front: 'What is the key difference between Active and Passive Voice?',
    back: 'Active Voice: Subject PERFORMS the action (Ali writes a letter).\nPassive Voice: Subject RECEIVES the action (The letter is written by Ali).',
    tip: 'MDCAT Tip: Look for whether the subject is doing or receiving the action.'
  },
  {
    id: 2,
    title: 'Universal V3 Rule',
    category: 'Rule',
    front: 'What form of the main verb is ALWAYS used in all Passive sentences?',
    back: 'Past Participle (V3 Form).\nExamples: written, examined, broken, taken, seen.',
    tip: 'Never choose an option containing V1 or V2 (e.g. "is wrote" ❌).'
  },
  {
    id: 3,
    title: 'Present Simple Passive',
    category: 'Tense',
    front: 'What is the passive formula for Present Simple?\n(Active: Doctor examines patient)',
    back: 'Object + is / am / are + V3 (+ by Subject)\n→ The patient is examined by the doctor.',
    tip: 'Do not add "being" or "been" in simple tenses.'
  },
  {
    id: 4,
    title: 'Present Continuous Passive',
    category: 'Tense',
    front: 'What is the passive formula for Continuous tenses?\n(Active: Doctor is examining patient)',
    back: 'Object + is/am/are + BEING + V3\n→ The patient is being examined by the doctor.',
    tip: 'Continuous Voice ALWAYS requires "BEING" + V3.'
  },
  {
    id: 5,
    title: 'Present Perfect Passive',
    category: 'Tense',
    front: 'What is the passive formula for Perfect tenses?\n(Active: Scientist has done research)',
    back: 'Object + has/have + BEEN + V3\n→ Research has been done by the scientist.',
    tip: 'Perfect Voice ALWAYS requires "BEEN" + V3.'
  },
  {
    id: 6,
    title: 'Past Simple Passive',
    category: 'Tense',
    front: 'What is the passive formula for Past Simple?\n(Active: Scientist discovered substance)',
    back: 'Object + was / were + V3\n→ The substance was discovered by the scientist.',
    tip: 'Beware: Active V2 ("discovered") turns into was/were + V3.'
  },
  {
    id: 7,
    title: 'Past Continuous Passive',
    category: 'Tense',
    front: 'What is the passive formula for Past Continuous?\n(Active: Technician was testing machine)',
    back: 'Object + was/were + BEING + V3\n→ The machine was being tested by technician.',
    tip: 'Look for "was/were being" + V3.'
  },
  {
    id: 8,
    title: 'Past Perfect Passive',
    category: 'Tense',
    front: 'What is the passive formula for Past Perfect?\n(Active: Team had finished study)',
    back: 'Object + had + BEEN + V3\n→ The study had been completed by the team.',
    tip: 'Both singular & plural take "had been + V3".'
  },
  {
    id: 9,
    title: 'Future Simple Passive',
    category: 'Tense',
    front: 'What is the passive formula for Future Simple?\n(Active: Lab will conduct test)',
    back: 'Object + will + BE + V3\n→ The test will be conducted by the laboratory.',
    tip: 'Future simple active (will + V1) becomes "will be + V3".'
  },
  {
    id: 10,
    title: 'Modal Verbs Rule',
    category: 'Modals',
    front: 'How do Modal Verbs (can, must, should, may) convert to Passive?',
    back: 'Object + modal + BE + V3\nExample: Students must follow rules → Rules must be followed.',
    tip: 'Do not alter modal tense (can stays can, must stays must).'
  },
  {
    id: 11,
    title: 'Imperative Sentences',
    category: 'Special Cases',
    front: 'How do command/order sentences change into passive?\n(e.g., "Open the door")',
    back: 'Let + Object + BE + V3\n→ "Let the door be opened."',
    tip: 'For advice/requests: "You are requested/advised to..."'
  },
  {
    id: 12,
    title: 'Intransitive Verbs (No Object)',
    category: 'MDCAT Trap',
    front: 'Can "The patient slept peacefully" or "They arrived early" be made passive?',
    back: 'NO! Intransitive verbs do not have an object receiving action, so passive is impossible.',
    tip: 'Watch out for trap questions asking for passive of sleep/arrive/laugh/die.'
  },
  {
    id: 13,
    title: 'Omission of "By + Agent"',
    category: 'Special Cases',
    front: 'When is "by + subject" omitted in passive sentences?',
    back: 'When the agent is unknown, obvious, or unimportant.\nExample: "Someone stole my pen" → "My pen was stolen." (Not by someone)',
    tip: 'Natural MDCAT sentences omit vague doers like someone, people, they.'
  },
  {
    id: 14,
    title: 'Pronoun Case Shift',
    category: 'Rule',
    front: 'How do pronouns change from Active Subject to Passive Object?',
    back: 'I → me | We → us | You → you | He → him | She → her | They → them | It → it\nExample: "She helps me" → "I am helped by her."',
    tip: 'Subjective case before verb; Objective case after "by".'
  }
];

const TRANSFORMER_CHALLENGES = [
  {
    id: 't1',
    mode: 'active-to-passive',
    tense: 'Present Simple',
    sourceSentence: 'The cardiologist checks the blood pressure.',
    options: [
      'The blood pressure checked the cardiologist.',
      'The blood pressure is checked by the cardiologist.',
      'The blood pressure was checked by the cardiologist.',
      'The blood pressure is being checked by the cardiologist.'
    ],
    correctIndex: 1,
    explanation: 'Present Simple Active (checks) transforms to "is checked by the cardiologist" (is + V3).'
  },
  {
    id: 't2',
    mode: 'active-to-passive',
    tense: 'Present Continuous',
    sourceSentence: 'The surgeon is performing a delicate operation.',
    options: [
      'A delicate operation is performed by the surgeon.',
      'A delicate operation was performed by the surgeon.',
      'A delicate operation is being performed by the surgeon.',
      'A delicate operation has been performed by the surgeon.'
    ],
    correctIndex: 2,
    explanation: 'Continuous tenses require "is being performed" (is/am/are + being + V3).'
  },
  {
    id: 't3',
    mode: 'active-to-passive',
    tense: 'Past Simple',
    sourceSentence: 'Alexander Fleming discovered penicillin in 1928.',
    options: [
      'Penicillin was discovered by Alexander Fleming in 1928.',
      'Penicillin is discovered by Alexander Fleming in 1928.',
      'Penicillin had been discovered by Alexander Fleming in 1928.',
      'Penicillin was being discovered by Alexander Fleming in 1928.'
    ],
    correctIndex: 0,
    explanation: 'Past Simple (discovered) transforms to "was discovered" (was/were + V3).'
  },
  {
    id: 't4',
    mode: 'active-to-passive',
    tense: 'Modal Verb',
    sourceSentence: 'Students must submit the lab report before noon.',
    options: [
      'The lab report must submit by students before noon.',
      'The lab report must be submitted by students before noon.',
      'The lab report should be submitted by students before noon.',
      'The lab report is must submitted by students before noon.'
    ],
    correctIndex: 1,
    explanation: 'Modals take "modal + be + V3" ("must be submitted").'
  },
  {
    id: 't5',
    mode: 'passive-to-active',
    tense: 'Present Perfect',
    sourceSentence: 'The vaccine has been developed by the immunology team.',
    options: [
      'The immunology team developed the vaccine.',
      'The immunology team is developing the vaccine.',
      'The immunology team has developed the vaccine.',
      'The immunology team had developed the vaccine.'
    ],
    correctIndex: 2,
    explanation: 'Present Perfect Passive ("has been developed") converts back to Active "has developed".'
  },
  {
    id: 't6',
    mode: 'passive-to-active',
    tense: 'Past Continuous',
    sourceSentence: 'The patient was being monitored by the intensive care nurse.',
    options: [
      'The intensive care nurse was monitoring the patient.',
      'The intensive care nurse monitored the patient.',
      'The intensive care nurse is monitoring the patient.',
      'The intensive care nurse had monitored the patient.'
    ],
    correctIndex: 0,
    explanation: 'Past Continuous Passive ("was being monitored") converts back to Active "was monitoring".'
  }
];

// ==========================================
// 2. Application State & Storage Management
// ==========================================

const STORAGE_KEY = 'mdcat_voice_study_app_v1';

let appState = {
  theme: 'light',
  completedSections: [],
  bookmarks: [],
  quizBestScore: 0,
  quizTotalAttempts: 0,
  flashcardMastered: [],
  studyStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

function loadStoredState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
      
      // Calculate daily streak
      const today = new Date().toISOString().split('T')[0];
      if (appState.lastActiveDate !== today) {
        const lastDate = new Date(appState.lastActiveDate);
        const currDate = new Date(today);
        const diffTime = Math.abs(currDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          appState.studyStreakDays += 1;
        } else if (diffDays > 1) {
          appState.studyStreakDays = 1;
        }
        appState.lastActiveDate = today;
        saveState();
      }
    }
  } catch (e) {
    console.error('Failed to load local storage state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// ==========================================
// 3. UI Updates & Dashboard Sync
// ==========================================

function updateDashboardUI() {
  // Update Streak
  const streakEl = document.getElementById('stat-study-streak');
  if (streakEl) streakEl.textContent = `${appState.studyStreakDays} Day${appState.studyStreakDays > 1 ? 's' : ''}`;

  // Update Quiz Stats
  const bestScoreEl = document.getElementById('stat-best-score');
  if (bestScoreEl) {
    bestScoreEl.textContent = appState.quizTotalAttempts > 0 
      ? `${appState.quizBestScore} / ${MDCAT_QUESTIONS.length}`
      : 'Not taken';
  }

  // Update Bookmark Count
  const bmCountEl = document.getElementById('bookmarks-badge-count');
  if (bmCountEl) {
    bmCountEl.textContent = appState.bookmarks.length;
    bmCountEl.style.display = appState.bookmarks.length > 0 ? 'flex' : 'none';
  }

  // Update Chapter Progress
  const totalSections = document.querySelectorAll('.study-section').length || 24;
  const completedCount = appState.completedSections.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalSections) * 100));

  const progressPercentEl = document.getElementById('chapter-progress-percent');
  const heroProgressPercentEl = document.getElementById('hero-progress-percent');
  const progressCircle = document.getElementById('progress-circle-bar');
  const conceptsCountEl = document.getElementById('stat-concepts-count');

  if (progressPercentEl) progressPercentEl.textContent = `${progressPercent}%`;
  if (heroProgressPercentEl) heroProgressPercentEl.textContent = `${progressPercent}%`;
  if (conceptsCountEl) conceptsCountEl.textContent = `${completedCount} / ${totalSections}`;

  if (progressCircle) {
    const circumference = 157; // 2 * PI * 25
    const offset = circumference - (progressPercent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  // Update Bookmark buttons state
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const sectionId = btn.getAttribute('data-section-id');
    if (appState.bookmarks.includes(sectionId)) {
      btn.classList.add('active');
      btn.innerHTML = '★ Bookmarked';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '☆ Bookmark';
    }
  });

  // Update nav checkmarks
  document.querySelectorAll('.chapter-nav-item').forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (targetId && appState.completedSections.includes(targetId)) {
      item.classList.add('completed');
      const statusEl = item.querySelector('.nav-item-status');
      if (statusEl) statusEl.textContent = '✓';
    }
  });
}

// ==========================================
// 4. Toast Notifications & Copy Utilities
// ==========================================

function showToast(message, type = 'normal') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'success' : ''}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

function initCopyButtons() {
  document.querySelectorAll('.copy-example-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = btn.textContent;
        btn.textContent = 'Copied!';
        showToast('Example copied to clipboard!', 'success');
        setTimeout(() => {
          btn.textContent = origText;
        }, 1800);
      }).catch(err => {
        showToast('Failed to copy text', 'error');
      });
    });
  });
}

// ==========================================
// 5. Interactive Example Breakdowns
// ==========================================

function initExampleBreakdowns() {
  document.querySelectorAll('.toggle-breakdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.example-card');
      if (!card) return;
      const breakdownBox = card.querySelector('.breakdown-box');
      if (!breakdownBox) return;

      const isOpening = !breakdownBox.classList.contains('open');
      breakdownBox.classList.toggle('open', isOpening);
      btn.textContent = isOpening ? 'Hide Explanation ▴' : 'Reveal Explanation ▾';

      // Mark section as completed if opened
      const section = card.closest('.study-section');
      if (section && section.id) {
        markSectionCompleted(section.id);
      }
    });
  });
}

function markSectionCompleted(sectionId) {
  if (!appState.completedSections.includes(sectionId)) {
    appState.completedSections.push(sectionId);
    saveState();
    updateDashboardUI();
  }
}

// ==========================================
// 6. Voice Transformer Component
// ==========================================

let currentTransformerIndex = 0;
let transformerMode = 'active-to-passive';

function initTransformer() {
  renderTransformerCard();

  document.querySelectorAll('.mode-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      transformerMode = pill.getAttribute('data-mode');
      currentTransformerIndex = 0;
      renderTransformerCard();
    });
  });

  const nextBtn = document.getElementById('transformer-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const filtered = TRANSFORMER_CHALLENGES.filter(c => c.mode === transformerMode);
      currentTransformerIndex = (currentTransformerIndex + 1) % filtered.length;
      renderTransformerCard();
    });
  }
}

function renderTransformerCard() {
  const filtered = TRANSFORMER_CHALLENGES.filter(c => c.mode === transformerMode);
  if (filtered.length === 0) return;

  const challenge = filtered[currentTransformerIndex % filtered.length];

  const tenseTag = document.getElementById('transformer-tense-tag');
  const promptSentence = document.getElementById('transformer-prompt-sentence');
  const optionsWrap = document.getElementById('transformer-options-wrap');
  const feedbackBox = document.getElementById('transformer-feedback');
  const nextBtn = document.getElementById('transformer-next-btn');

  if (tenseTag) tenseTag.textContent = `${challenge.tense} • ${transformerMode === 'active-to-passive' ? 'Active ➔ Passive' : 'Passive ➔ Active'}`;
  if (promptSentence) promptSentence.textContent = `"${challenge.sourceSentence}"`;

  if (feedbackBox) {
    feedbackBox.className = 'transformer-feedback';
    feedbackBox.style.display = 'none';
    feedbackBox.textContent = '';
  }

  if (nextBtn) nextBtn.style.display = 'none';

  if (optionsWrap) {
    optionsWrap.innerHTML = '';
    challenge.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'transformer-opt-btn';
      btn.innerHTML = `
        <span class="option-prefix" style="margin-right: 12px; font-weight:700;">${String.fromCharCode(65 + idx)}</span>
        <span>${opt}</span>
      `;
      btn.addEventListener('click', () => handleTransformerAnswer(challenge, idx, btn));
      optionsWrap.appendChild(btn);
    });
  }
}

function handleTransformerAnswer(challenge, selectedIndex, selectedBtn) {
  const optionsWrap = document.getElementById('transformer-options-wrap');
  const feedbackBox = document.getElementById('transformer-feedback');
  const nextBtn = document.getElementById('transformer-next-btn');

  // Disable all option buttons
  const allBtns = optionsWrap.querySelectorAll('.transformer-opt-btn');
  allBtns.forEach(btn => btn.disabled = true);

  const isCorrect = selectedIndex === challenge.correctIndex;

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    feedbackBox.className = 'transformer-feedback visible success';
    feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${challenge.explanation}`;
  } else {
    selectedBtn.classList.add('wrong');
    allBtns[challenge.correctIndex].classList.add('correct');
    feedbackBox.className = 'transformer-feedback visible failure';
    feedbackBox.innerHTML = `<strong>✗ Incorrect.</strong> ${challenge.explanation}`;
  }

  if (nextBtn) nextBtn.style.display = 'inline-flex';
}

// ==========================================
// 7. Flashcards Component
// ==========================================

let currentFlashcardIndex = 0;

function initFlashcards() {
  renderFlashcard();

  const cardInner = document.getElementById('flashcard-inner');
  if (cardInner) {
    cardInner.addEventListener('click', () => {
      cardInner.classList.toggle('flipped');
    });
  }

  const prevBtn = document.getElementById('flashcard-prev-btn');
  const nextBtn = document.getElementById('flashcard-next-btn');
  const flipBtn = document.getElementById('flashcard-flip-btn');
  const masterBtn = document.getElementById('flashcard-master-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        renderFlashcard();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentFlashcardIndex < FLASHCARDS.length - 1) {
        currentFlashcardIndex++;
        renderFlashcard();
      }
    });
  }

  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      if (cardInner) cardInner.classList.toggle('flipped');
    });
  }

  if (masterBtn) {
    masterBtn.addEventListener('click', () => {
      const card = FLASHCARDS[currentFlashcardIndex];
      const idx = appState.flashcardMastered.indexOf(card.id);
      if (idx > -1) {
        appState.flashcardMastered.splice(idx, 1);
        showToast('Card marked for review');
      } else {
        appState.flashcardMastered.push(card.id);
        showToast('Card marked as Mastered! ✓', 'success');
      }
      saveState();
      renderFlashcard();
    });
  }
}

function renderFlashcard() {
  const card = FLASHCARDS[currentFlashcardIndex];
  const cardInner = document.getElementById('flashcard-inner');
  if (cardInner) cardInner.classList.remove('flipped');

  const catEl = document.getElementById('flashcard-category');
  const counterEl = document.getElementById('flashcard-counter');
  const questionEl = document.getElementById('flashcard-front-text');
  const answerEl = document.getElementById('flashcard-back-text');
  const hintEl = document.getElementById('flashcard-back-hint');
  const masterBtn = document.getElementById('flashcard-master-btn');

  if (catEl) catEl.textContent = `${card.category} • ${card.title}`;
  if (counterEl) counterEl.textContent = `${currentFlashcardIndex + 1} / ${FLASHCARDS.length}`;
  if (questionEl) questionEl.textContent = card.front;
  if (answerEl) answerEl.textContent = card.back;
  if (hintEl) hintEl.textContent = card.tip || '';

  if (masterBtn) {
    const isMastered = appState.flashcardMastered.includes(card.id);
    masterBtn.textContent = isMastered ? '★ Mastered' : '☆ Mark as Mastered';
    masterBtn.className = isMastered ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
  }
}

// ==========================================
// 8. MDCAT Practice Test (25 MCQs)
// ==========================================

let currentQuizIndex = 0;
let userAnswers = []; // store selected index for each question
let quizSubmitted = false;

function initQuiz() {
  renderQuizQuestion();

  const nextBtn = document.getElementById('quiz-next-btn');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const submitBtn = document.getElementById('quiz-submit-btn');
  const retryBtn = document.getElementById('quiz-retry-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuizIndex < MDCAT_QUESTIONS.length - 1) {
        currentQuizIndex++;
        renderQuizQuestion();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderQuizQuestion();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitQuiz();
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      currentQuizIndex = 0;
      userAnswers = [];
      quizSubmitted = false;
      document.getElementById('quiz-results-card').classList.remove('visible');
      document.getElementById('quiz-question-card').style.display = 'block';
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const q = MDCAT_QUESTIONS[currentQuizIndex];

  const progressFill = document.getElementById('quiz-progress-bar-fill');
  const counterEl = document.getElementById('quiz-question-counter');
  const categoryTag = document.getElementById('quiz-category-tag');
  const questionText = document.getElementById('quiz-question-text');
  const optionsList = document.getElementById('quiz-options-list');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const submitBtn = document.getElementById('quiz-submit-btn');

  // Update Progress
  const percent = ((currentQuizIndex + 1) / MDCAT_QUESTIONS.length) * 100;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (counterEl) counterEl.textContent = `Question ${currentQuizIndex + 1} of ${MDCAT_QUESTIONS.length}`;
  if (categoryTag) categoryTag.textContent = q.category;
  if (questionText) questionText.textContent = q.question;

  const currentSelection = userAnswers[currentQuizIndex];

  // Render Options
  if (optionsList) {
    optionsList.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';

      const isSelected = currentSelection === idx;
      if (currentSelection !== undefined) {
        if (idx === q.correctAnswer) {
          btn.classList.add('selected-correct');
        } else if (isSelected && idx !== q.correctAnswer) {
          btn.classList.add('selected-wrong');
        }
      }

      btn.innerHTML = `
        <span class="option-prefix">${String.fromCharCode(65 + idx)}</span>
        <span>${opt}</span>
      `;

      btn.addEventListener('click', () => {
        if (userAnswers[currentQuizIndex] === undefined) {
          userAnswers[currentQuizIndex] = idx;
          renderQuizQuestion();
        }
      });

      optionsList.appendChild(btn);
    });
  }

  // Show explanation if answered
  if (explanationBox) {
    if (currentSelection !== undefined) {
      explanationBox.className = 'quiz-explanation-box visible';
      const isRight = currentSelection === q.correctAnswer;
      explanationBox.innerHTML = `
        <div style="font-weight:700; margin-bottom:4px; color:${isRight ? 'var(--emerald)' : 'var(--rose)'}">
          ${isRight ? '✓ Correct Answer!' : '✗ Incorrect Option Selected'}
        </div>
        <div><strong>Rule:</strong> ${q.rule}</div>
        <div style="margin-top:4px;">${q.explanation}</div>
      `;
    } else {
      explanationBox.className = 'quiz-explanation-box';
      explanationBox.style.display = 'none';
    }
  }

  // Nav buttons
  if (prevBtn) prevBtn.disabled = currentQuizIndex === 0;
  if (nextBtn) {
    nextBtn.style.display = currentQuizIndex === MDCAT_QUESTIONS.length - 1 ? 'none' : 'inline-flex';
  }
  if (submitBtn) {
    submitBtn.style.display = currentQuizIndex === MDCAT_QUESTIONS.length - 1 ? 'inline-flex' : 'none';
  }
}

function submitQuiz() {
  quizSubmitted = true;
  let correctCount = 0;

  MDCAT_QUESTIONS.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / MDCAT_QUESTIONS.length) * 100);

  // Update State
  appState.quizTotalAttempts += 1;
  if (correctCount > appState.quizBestScore) {
    appState.quizBestScore = correctCount;
  }
  saveState();
  updateDashboardUI();

  // Show Results Card
  const questionCard = document.getElementById('quiz-question-card');
  const resultsCard = document.getElementById('quiz-results-card');

  if (questionCard) questionCard.style.display = 'none';
  if (resultsCard) {
    resultsCard.classList.add('visible');

    const scoreBig = document.getElementById('result-score-val');
    const percentEl = document.getElementById('result-percent-val');
    const correctEl = document.getElementById('result-correct-count');
    const incorrectEl = document.getElementById('result-incorrect-count');
    const msgEl = document.getElementById('result-perf-msg');

    if (scoreBig) scoreBig.textContent = `${correctCount} / ${MDCAT_QUESTIONS.length}`;
    if (percentEl) percentEl.textContent = `${percentage}% Accuracy`;
    if (correctEl) correctEl.textContent = correctCount;
    if (incorrectEl) incorrectEl.textContent = MDCAT_QUESTIONS.length - correctCount;

    let performanceMsg = 'Good effort! Review the tense rules and flashcards, then retry to hit 100%.';
    if (percentage >= 90) {
      performanceMsg = 'Outstanding Performance! You have mastered Active & Passive Voice for MDCAT.';
    } else if (percentage >= 75) {
      performanceMsg = 'Strong Work! Just polish up the trap questions and modal transformations.';
    }
    if (msgEl) msgEl.textContent = performanceMsg;
  }
}

// ==========================================
// 9. Search Bar Functionality
// ==========================================

function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (clearBtn) clearBtn.classList.toggle('visible', query.length > 0);

    const sections = document.querySelectorAll('.study-section');
    sections.forEach(sec => {
      if (!query) {
        sec.style.display = 'block';
        return;
      }
      const text = sec.textContent.toLowerCase();
      if (text.includes(query)) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.focus();
    });
  }
}

// ==========================================
// 10. Bookmarks System
// ==========================================

function initBookmarks() {
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sectionId = btn.getAttribute('data-section-id');
      if (!sectionId) return;

      const idx = appState.bookmarks.indexOf(sectionId);
      if (idx > -1) {
        appState.bookmarks.splice(idx, 1);
        showToast('Bookmark removed');
      } else {
        appState.bookmarks.push(sectionId);
        showToast('Section bookmarked! ★', 'success');
      }
      saveState();
      updateDashboardUI();
    });
  });

  // Modal open / close
  const openModalBtn = document.getElementById('open-bookmarks-btn');
  const modalOverlay = document.getElementById('bookmarks-modal-overlay');
  const closeModalBtn = document.getElementById('close-bookmarks-modal');

  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', () => {
      renderBookmarksModal();
      modalOverlay.classList.add('open');
    });
  }

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }
}

function renderBookmarksModal() {
  const listWrap = document.getElementById('bookmarks-list-wrap');
  if (!listWrap) return;

  if (appState.bookmarks.length === 0) {
    listWrap.innerHTML = `
      <div style="text-align:center; padding: 24px; color: var(--text-muted);">
        <p>No sections bookmarked yet.</p>
        <p style="font-size:0.85rem; margin-top:6px;">Click the star icon (★) on any chapter section to save it for quick revision.</p>
      </div>
    `;
    return;
  }

  listWrap.innerHTML = '';
  appState.bookmarks.forEach(secId => {
    const secEl = document.getElementById(secId);
    const title = secEl ? secEl.querySelector('.section-title')?.textContent || secId : secId;

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.padding = '10px 14px';
    row.style.borderBottom = '1px solid var(--border-color)';

    row.innerHTML = `
      <a href="#${secId}" style="font-weight:600; color:var(--text-primary);" class="bookmark-jump-link">
        ${title}
      </a>
      <button class="icon-btn" style="width:28px; height:28px; font-size:12px;" title="Remove">✕</button>
    `;

    row.querySelector('.bookmark-jump-link').addEventListener('click', () => {
      document.getElementById('bookmarks-modal-overlay')?.classList.remove('open');
    });

    row.querySelector('button').addEventListener('click', () => {
      appState.bookmarks = appState.bookmarks.filter(id => id !== secId);
      saveState();
      updateDashboardUI();
      renderBookmarksModal();
    });

    listWrap.appendChild(row);
  });
}

// ==========================================
// 11. Verb Forms Table Filter
// ==========================================

function initVerbFilter() {
  const filterInput = document.getElementById('verb-search-input');
  if (!filterInput) return;

  filterInput.addEventListener('input', () => {
    const query = filterInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#verb-table-body tr');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// ==========================================
// 12. Theme Management (Light / Dark)
// ==========================================

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Apply stored theme or default
  document.documentElement.setAttribute('data-theme', appState.theme);
  updateThemeIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', appState.theme);
      saveState();
      updateThemeIcon();
      showToast(`Switched to ${appState.theme} mode`);
    });
  }
}

function updateThemeIcon() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = appState.theme === 'dark' ? '☀️' : '🌙';
  themeToggleBtn.title = `Switch to ${appState.theme === 'dark' ? 'light' : 'dark'} mode`;
}

// ==========================================
// 13. Smooth Scroll Observer & Nav Tracking
// ==========================================

function initScrollSpy() {
  const sections = document.querySelectorAll('.study-section');
  const navItems = document.querySelectorAll('.chapter-nav-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          const href = item.querySelector('a')?.getAttribute('href');
          if (href === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        markSectionCompleted(id);
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0.1
  });

  sections.forEach(sec => observer.observe(sec));
}

// Mobile sidebar toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    sidebar.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
      });
    });
  }
}

// ==========================================
// 14. Initialization on DOM Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  loadStoredState();
  initTheme();
  initSearch();
  initBookmarks();
  initCopyButtons();
  initExampleBreakdowns();
  initTransformer();
  initFlashcards();
  initQuiz();
  initVerbFilter();
  initScrollSpy();
  initMobileNav();
  updateDashboardUI();
});
