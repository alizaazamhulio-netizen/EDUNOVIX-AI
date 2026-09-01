/**
 * MDCAT BIOLOGICAL MOLECULES — INTERACTIVE LOGIC & QUIZ ENGINE
 * Handles: LocalStorage Persistence, Section Progress, High-Yield Filter,
 * Interactive SVG Visualizers, 15-Question MDCAT Quiz, and Scroll Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initProgressTracker();
  initQuiz();
  initHighYieldFilter();
  initInteractiveVisuals();
  initScrollAnimations();
  initNumberCounters();
  initNavigation();
});

/* ===================================================================
   1. LOCAL STORAGE & PROGRESS TRACKING ENGINE
   =================================================================== */
const STORAGE_KEYS = {
  COMPLETED_SECTIONS: 'mdcat_biomolecules_completed_sections',
  QUIZ_BEST_SCORE: 'mdcat_biomolecules_quiz_best',
  QUIZ_LAST_SCORE: 'mdcat_biomolecules_quiz_last',
  QUIZ_ATTEMPTS: 'mdcat_biomolecules_quiz_attempts'
};

const CHAPTER_SECTIONS = [
  { id: 'water', name: 'Water' },
  { id: 'carbohydrates', name: 'Carbohydrates' },
  { id: 'lipids', name: 'Lipids' },
  { id: 'proteins', name: 'Proteins' },
  { id: 'enzymes', name: 'Enzymes' },
  { id: 'nucleic-acids', name: 'Nucleic Acids' },
  { id: 'atp', name: 'ATP' },
  { id: 'high-yield', name: 'High-Yield Facts' },
  { id: 'traps', name: 'MDCAT Traps' }
];

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.COMPLETED_SECTIONS)) {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_SECTIONS, JSON.stringify([]));
  }
}

function getCompletedSections() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_SECTIONS)) || [];
  } catch (e) {
    return [];
  }
}

function toggleSectionCompletion(sectionId) {
  let completed = getCompletedSections();
  const index = completed.indexOf(sectionId);
  
  if (index > -1) {
    completed.splice(index, 1);
  } else {
    completed.push(sectionId);
  }
  
  localStorage.setItem(STORAGE_KEYS.COMPLETED_SECTIONS, JSON.stringify(completed));
  updateProgressUI();
}

function isSectionCompleted(sectionId) {
  const completed = getCompletedSections();
  return completed.includes(sectionId);
}

function updateProgressUI() {
  const completed = getCompletedSections();
  const total = CHAPTER_SECTIONS.length;
  const count = completed.length;
  const percentage = Math.round((count / total) * 100);

  // Update progress bar and text
  const progressBar = document.getElementById('chapterProgressBar');
  const progressText = document.getElementById('chapterProgressPct');
  const progressCount = document.getElementById('chapterProgressCount');
  const navBadgeText = document.getElementById('navProgressText');
  const completionPct = document.getElementById('completionPctDisplay');

  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}%`;
  if (progressCount) progressCount.textContent = `${count} / ${total} sections completed`;
  if (navBadgeText) navBadgeText.textContent = `${percentage}% Done`;
  if (completionPct) completionPct.textContent = `${percentage}%`;

  // Update section pill buttons
  CHAPTER_SECTIONS.forEach(sec => {
    const pill = document.querySelector(`.section-pill-btn[data-section="${sec.id}"]`);
    if (pill) {
      if (completed.includes(sec.id)) {
        pill.classList.add('completed');
      } else {
        pill.classList.remove('completed');
      }
    }

    // Update section card toggle buttons
    const btn = document.querySelector(`.section-complete-btn[data-section="${sec.id}"]`);
    if (btn) {
      if (completed.includes(sec.id)) {
        btn.classList.add('is-completed');
        btn.innerHTML = '✓ Completed';
      } else {
        btn.classList.remove('is-completed');
        btn.innerHTML = 'Mark as Completed';
      }
    }
  });

  // Update Best score on completion card
  const bestScore = localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE);
  const bestScoreDisplay = document.getElementById('completionBestScoreDisplay');
  if (bestScoreDisplay) {
    bestScoreDisplay.textContent = bestScore !== null ? `${bestScore}%` : 'Not Taken';
  }
}

function initProgressTracker() {
  // Attach listeners to section complete buttons
  document.querySelectorAll('.section-complete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sectionId = e.currentTarget.getAttribute('data-section');
      if (sectionId) {
        toggleSectionCompletion(sectionId);
      }
    });
  });

  // Attach listeners to pills for smooth scroll
  document.querySelectorAll('.section-pill-btn').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const sectionId = e.currentTarget.getAttribute('data-section');
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  updateProgressUI();
}

/* ===================================================================
   2. 15-QUESTION MDCAT BIOLOGICAL MOLECULES QUIZ
   =================================================================== */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following describes the bond between adjacent monosaccharides in disaccharides and polysaccharides?",
    options: [
      "Peptide bond",
      "Phosphodiester bond",
      "Glycosidic bond",
      "Ester bond"
    ],
    correct: 2,
    explanation: "Monosaccharides join together via glycosidic bonds formed through condensation (dehydration) reactions.",
    topic: "Carbohydrates"
  },
  {
    id: 2,
    question: "Sucrose is a disaccharide composed of which two monosaccharide units?",
    options: [
      "Glucose + Galactose",
      "Glucose + Glucose",
      "Glucose + Fructose",
      "Fructose + Galactose"
    ],
    correct: 2,
    explanation: "Sucrose = Glucose + Fructose. (Lactose = Glucose + Galactose; Maltose = Glucose + Glucose).",
    topic: "Carbohydrates"
  },
  {
    id: 3,
    question: "Which structural polysaccharide is found in arthropod exoskeletons and fungal cell walls?",
    options: [
      "Cellulose",
      "Chitin",
      "Glycogen",
      "Amylose"
    ],
    correct: 1,
    explanation: "Chitin is a structural polysaccharide containing nitrogen derivatives that forms arthropod exoskeletons and fungal cell walls.",
    topic: "Carbohydrates"
  },
  {
    id: 4,
    question: "A triglyceride molecule is chemically formed by condensation of:",
    options: [
      "1 glycerol and 2 fatty acids",
      "1 glycerol and 3 fatty acids",
      "3 glycerols and 1 fatty acid",
      "1 sphingosine and 3 fatty acids"
    ],
    correct: 1,
    explanation: "Triglycerides (neutral fats) consist of one glycerol molecule covalently linked to 3 fatty acids via ester bonds.",
    topic: "Lipids"
  },
  {
    id: 5,
    question: "Why do unsaturated fatty acids have lower melting points and remain liquid at room temperature?",
    options: [
      "They have shorter carbon chains",
      "They contain one or more C=C double bonds introducing kinks",
      "They possess hydrophilic heads",
      "They lack carboxyl groups"
    ],
    correct: 1,
    explanation: "Carbon-carbon double bonds (C=C) in unsaturated fatty acids create kinks that prevent tight packing, lowering melting points.",
    topic: "Lipids"
  },
  {
    id: 6,
    question: "Which of the following is TRUE regarding cholesterol?",
    options: [
      "It is a complex structural protein",
      "It is a lipid with four fused carbon rings",
      "It is present abundantly in plant cell walls",
      "It contains three ester-linked fatty acids"
    ],
    correct: 1,
    explanation: "Cholesterol is a steroid lipid characterized by 4 fused carbon rings. It is an animal membrane constituent and hormone precursor.",
    topic: "Lipids"
  },
  {
    id: 7,
    question: "Which part of an amino acid molecule gives each of the 20 standard amino acids its unique chemical properties?",
    options: [
      "Amino group (-NH2)",
      "Carboxyl group (-COOH)",
      "Central alpha hydrogen",
      "Variable R-group (side chain)"
    ],
    correct: 3,
    explanation: "All standard amino acids share a common backbone; the variable R-group determines polarity, charge, size, and specific reactivity.",
    topic: "Proteins"
  },
  {
    id: 8,
    question: "Alpha-helices and Beta-pleated sheets represent which level of protein structural organization?",
    options: [
      "Primary structure",
      "Secondary structure",
      "Tertiary structure",
      "Quaternary structure"
    ],
    correct: 1,
    explanation: "Secondary structure involves local repetitive folding (α-helix and β-pleated sheet) stabilized by hydrogen bonds between backbone peptide groups.",
    topic: "Proteins"
  },
  {
    id: 9,
    question: "What actually occurs during protein denaturation caused by elevated temperature or extreme pH?",
    options: [
      "All peptide bonds are completely cleaved into free amino acids",
      "The primary amino acid sequence is permanently scrambled",
      "Higher-order secondary, tertiary, and quaternary conformations are disrupted",
      "Hydrolysis splits the protein into dipeptides"
    ],
    correct: 2,
    explanation: "Denaturation disrupts hydrogen, ionic, and hydrophobic interactions maintaining 3D folding, but does NOT typically break primary peptide bonds.",
    topic: "Proteins"
  },
  {
    id: 10,
    question: "How do enzymes accelerate biochemical reaction rates?",
    options: [
      "By increasing the free energy difference (ΔG) between reactants and products",
      "By lowering the activation energy (Ea) barrier",
      "By raising cellular temperature inside the active site",
      "By permanently changing the chemical equilibrium position"
    ],
    correct: 1,
    explanation: "Enzymes are biological catalysts that speed up reactions strictly by lowering the activation energy barrier without altering overall ΔG or equilibrium.",
    topic: "Enzymes"
  },
  {
    id: 11,
    question: "The modern model of enzyme action which states that substrate binding induces conformational changes in the active site is known as:",
    options: [
      "Lock and Key model",
      "Fluid Mosaic model",
      "Induced-Fit model",
      "Allosteric cleavage model"
    ],
    correct: 2,
    explanation: "The induced-fit model (Koshland) explains that the enzyme's active site undergoes slight dynamic conformational adjustment upon substrate binding.",
    topic: "Enzymes"
  },
  {
    id: 12,
    question: "What is the critical chemical difference between a nucleoside and a nucleotide?",
    options: [
      "A nucleoside contains ribose; a nucleotide contains deoxyribose",
      "A nucleoside is Sugar + Base; a nucleotide is Sugar + Base + Phosphate",
      "A nucleoside has two nitrogenous bases; a nucleotide has one",
      "A nucleoside lacks a pentose sugar"
    ],
    correct: 1,
    explanation: "Nucleoside = Nitrogenous base + Pentose sugar. Nucleotide = Nucleoside + Phosphate group (Sugar + Base + Phosphate).",
    topic: "Nucleic Acids"
  },
  {
    id: 13,
    question: "Which nitrogenous base is present in RNA but absent in DNA?",
    options: [
      "Thymine",
      "Uracil",
      "Cytosine",
      "Guanine"
    ],
    correct: 1,
    explanation: "RNA contains Uracil (U) which pairs with Adenine (A), whereas DNA contains Thymine (T) instead.",
    topic: "Nucleic Acids"
  },
  {
    id: 14,
    question: "Water's high specific heat capacity is ecologically and physiologically critical because:",
    options: [
      "It allows water to freeze at high ambient temperatures",
      "It minimizes thermal fluctuations, stabilizing internal and aquatic environments",
      "It prevents hydrogen bonding in blood plasma",
      "It ensures water acts only as a nonpolar solvent"
    ],
    correct: 1,
    explanation: "High specific heat means water absorbs or releases large amounts of heat with minimal temperature change, acting as a temperature buffer.",
    topic: "Water"
  },
  {
    id: 15,
    question: "Hydrolysis of ATP into ADP and Inorganic Phosphate (Pi) provides free energy primarily because:",
    options: [
      "The peptide bonds are cleaved",
      "The terminal high-energy phosphoanhydride bond is broken",
      "The ribose sugar is oxidized",
      "Adenine is converted into guanine"
    ],
    correct: 1,
    explanation: "ATP contains unstable, high-energy phosphoanhydride bonds between negatively charged phosphate groups; their hydrolysis releases usable energy for cellular work.",
    topic: "ATP"
  }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let questionAnswered = false;

function initQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  questionAnswered = false;

  renderQuizQuestion();

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNextQuestion);
  }

  const retakeBtn = document.getElementById('retakeQuizBtn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', resetQuiz);
  }

  const reviewBtn = document.getElementById('reviewChapterBtn');
  if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
      document.getElementById('carbohydrates')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const compRetakeBtn = document.getElementById('compRetakeBtn');
  if (compRetakeBtn) {
    compRetakeBtn.addEventListener('click', () => {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
      resetQuiz();
    });
  }
}

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  if (!q) return;

  questionAnswered = false;

  // DOM Elements
  const container = document.getElementById('quizActiveContainer');
  const resultsContainer = document.getElementById('quizResultsContainer');
  if (container) container.style.display = 'block';
  if (resultsContainer) resultsContainer.classList.remove('show');

  const qNumTag = document.getElementById('quizQuestionNumTag');
  const qTracker = document.getElementById('quizTrackerText');
  const qTopicTag = document.getElementById('quizTopicTag');
  const qText = document.getElementById('quizQuestionText');
  const optionsList = document.getElementById('quizOptionsList');
  const explanationBox = document.getElementById('quizExplanationBox');
  const nextBtn = document.getElementById('quizNextBtn');
  const currentScoreBadge = document.getElementById('quizCurrentScoreBadge');

  if (qNumTag) qNumTag.textContent = `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`;
  if (qTracker) qTracker.textContent = `${currentQuestionIndex + 1} / ${QUIZ_QUESTIONS.length}`;
  if (qTopicTag) qTopicTag.textContent = q.topic;
  if (qText) qText.textContent = q.question;
  if (currentScoreBadge) currentScoreBadge.textContent = `Current Score: ${quizScore} / ${currentQuestionIndex}`;

  if (explanationBox) {
    explanationBox.classList.remove('show');
    explanationBox.innerHTML = '';
  }

  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) ? 'Finish Quiz' : 'Next Question →';
  }

  if (optionsList) {
    optionsList.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.setAttribute('data-index', idx);
      btn.innerHTML = `
        <span class="option-prefix">${prefixes[idx]}</span>
        <span class="option-label">${opt}</span>
      `;
      btn.addEventListener('click', () => selectAnswer(idx));
      optionsList.appendChild(btn);
    });
  }
}

function selectAnswer(selectedIndex) {
  if (questionAnswered) return;
  questionAnswered = true;

  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCorrect = (selectedIndex === q.correct);
  if (isCorrect) quizScore++;

  userAnswers.push({
    questionId: q.id,
    selected: selectedIndex,
    isCorrect: isCorrect
  });

  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  // Reveal explanation
  const explanationBox = document.getElementById('quizExplanationBox');
  if (explanationBox) {
    explanationBox.innerHTML = `
      <div class="explanation-title">
        ${isCorrect ? '<span style="color: var(--emerald-600);">✓ Correct Answer!</span>' : '<span style="color: var(--rose-600);">✗ Incorrect</span>'}
        <span style="font-size: 0.78rem; font-weight: 600; color: var(--slate-500); margin-left: 8px;">— MDCAT Concept</span>
      </div>
      <p class="explanation-text">${q.explanation}</p>
    `;
    explanationBox.classList.add('show');
  }

  // Update footer badge and enable Next button
  const currentScoreBadge = document.getElementById('quizCurrentScoreBadge');
  if (currentScoreBadge) {
    currentScoreBadge.textContent = `Current Score: ${quizScore} / ${currentQuestionIndex + 1}`;
  }

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

function handleNextQuestion() {
  if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
    currentQuestionIndex++;
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((quizScore / total) * 100);
  const incorrect = total - quizScore;

  // Store in LocalStorage
  const prevBest = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || '0', 10);
  if (percentage > prevBest) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_BEST_SCORE, percentage);
  }
  localStorage.setItem(STORAGE_KEYS.QUIZ_LAST_SCORE, percentage);
  const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);

  // Hide active quiz container, show results
  const container = document.getElementById('quizActiveContainer');
  const resultsContainer = document.getElementById('quizResultsContainer');
  if (container) container.style.display = 'none';
  if (resultsContainer) resultsContainer.classList.add('show');

  const resScore = document.getElementById('resScoreDisplay');
  const resCorrect = document.getElementById('resCorrectCount');
  const resIncorrect = document.getElementById('resIncorrectCount');
  const resBest = document.getElementById('resBestScore');
  const resFeedback = document.getElementById('resFeedbackText');

  if (resScore) resScore.textContent = `${percentage}%`;
  if (resCorrect) resCorrect.textContent = quizScore;
  if (resIncorrect) resIncorrect.textContent = incorrect;
  if (resBest) resBest.textContent = `${Math.max(percentage, prevBest)}%`;

  if (resFeedback) {
    if (percentage >= 85) {
      resFeedback.textContent = '🌟 Outstanding! You have mastered Biological Molecules for MDCAT.';
    } else if (percentage >= 70) {
      resFeedback.textContent = '👍 Good job! Review the MDCAT Traps and High-Yield Facts to hit 100%.';
    } else {
      resFeedback.textContent = '📚 Recommended: Review the chapter sections, especially Protein Structure and Enzymes.';
    }
  }

  updateProgressUI();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  quizScore = 0;
  userAnswers = [];
  questionAnswered = false;
  renderQuizQuestion();
}

/* ===================================================================
   3. HIGH-YIELD FACTS FILTER ENGINE
   =================================================================== */
function initHighYieldFilter() {
  const filterBtns = document.querySelectorAll('.fact-filter-btn');
  const factCards = document.querySelectorAll('.fact-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      factCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   4. INTERACTIVE VISUALIZERS (DENATURATION, ENZYME GRAPHS, ETC)
   =================================================================== */
function initInteractiveVisuals() {
  // Protein Denaturation Visual State Toggle
  const toggleBtn = document.getElementById('toggleDenatureBtn');
  const denatureGraphic = document.getElementById('denatureVisualGraphic');
  const denatureStatusText = document.getElementById('denatureStatusText');

  if (toggleBtn && denatureGraphic) {
    let isDenatured = false;
    toggleBtn.addEventListener('click', () => {
      isDenatured = !isDenatured;
      if (isDenatured) {
        toggleBtn.textContent = 'Reset to Folded Native State';
        if (denatureStatusText) {
          denatureStatusText.innerHTML = '<strong style="color: var(--rose-600);">DENATURED STATE:</strong> Secondary & tertiary bonds disrupted. Primary amino acid sequence remains intact!';
        }
        denatureGraphic.classList.add('is-denatured');
      } else {
        toggleBtn.textContent = 'Simulate Thermal Denaturation';
        if (denatureStatusText) {
          denatureStatusText.innerHTML = '<strong style="color: var(--emerald-600);">NATIVE STATE:</strong> Functional 3D globular conformation stabilized by H-bonds, ionic interactions, & disulfide bridges.';
        }
        denatureGraphic.classList.remove('is-denatured');
      }
    });
  }
}

/* ===================================================================
   5. NUMBER COUNTER ANIMATION
   =================================================================== */
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetVal, 1200, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ===================================================================
   6. SCROLL REVEAL ANIMATIONS
   =================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ===================================================================
   7. NAVIGATION & SMOOTH SCROLLING
   =================================================================== */
function initNavigation() {
  // Explorer card buttons
  document.querySelectorAll('.explorer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Hero CTA buttons
  const startBtn = document.getElementById('heroStartBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      document.getElementById('categoryExplorer')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const quizBtn = document.getElementById('heroQuizBtn');
  if (quizBtn) {
    quizBtn.addEventListener('click', () => {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
