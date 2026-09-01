/**
 * FAST-NUCES Admission & Scholarship Preparation Hub - Core JavaScript
 * EduNexa AI Educational Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSearch();
  initDashboard();
  initChecklist();
  initAnalyticalTopics();
  initEnglishTopics();
  initScholarshipQuiz();
  initFaqAccordion();
  initPracticeModals();
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section observer
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   Live Search System
   ========================================================================== */
const searchDatabase = [
  // Math Topics
  { title: 'Basic Mathematics - Fractions & Percentages', category: 'Math', sectionId: 'mathematics', snippet: 'Essential arithmetic concepts, ratios, proportions, speed-time-distance.' },
  { title: 'Advanced Mathematics - Calculus & Derivatives', category: 'Math', sectionId: 'mathematics', snippet: 'Differentiation, limits, integration, and applications of derivatives for FAST.' },
  { title: 'Advanced Mathematics - Trigonometry & Vectors', category: 'Math', sectionId: 'mathematics', snippet: 'Trigonometric identities, equations, matrices, determinants, and vector algebra.' },
  { title: 'Algebra & Quadratic Equations', category: 'Math', sectionId: 'mathematics', snippet: 'Polynomials, logarithms, sequences & series, permutations & combinations.' },
  
  // Test Pattern
  { title: 'FAST Test Pattern & Weightage', category: 'Admission Test', sectionId: 'pattern', snippet: '70% Combined Math (50% Adv + 20% Basic), 20% IQ, 10% English. Negative marking applies.' },
  { title: 'Test Options: FAST vs SAT vs NTS NAT', category: 'Admission Test', sectionId: 'test-options', snippet: 'Explore admission test choices accepted for undergraduate programs.' },
  { title: 'Calculator Policy & Negative Marking', category: 'Admission Test', sectionId: 'pattern', snippet: 'Calculators are strictly not allowed. Negative marking requires high accuracy.' },
  
  // Analytical & IQ
  { title: 'Number Series & Logical Sequences', category: 'Analytical', sectionId: 'analytical', snippet: 'Identify patterns, missing elements, arithmetic and geometric progressions.' },
  { title: 'Blood Relations & Family Tree', category: 'Analytical', sectionId: 'analytical', snippet: 'Deductive relational logic problems with solved examples.' },
  { title: 'Direction Sense & Spatial Reasoning', category: 'Analytical', sectionId: 'analytical', snippet: 'Compass orientation, distances, and path-tracing problems.' },
  { title: 'Statement & Assumptions / Critical Thinking', category: 'Analytical', sectionId: 'analytical', snippet: 'Logical deductions, syllogisms, and validity assessment.' },
  
  // English
  { title: 'Vocabulary & Contextual Synonyms', category: 'English', sectionId: 'english', snippet: 'High-frequency entry test vocabulary, sentence completions, and idioms.' },
  { title: 'Sentence Correction & Grammar Rules', category: 'English', sectionId: 'english', snippet: 'Subject-verb agreement, tenses, prepositions, active/passive voice.' },
  { title: 'Reading Comprehension Strategies', category: 'English', sectionId: 'english', snippet: 'Passage analysis, main ideas, tone, and inference questions.' },
  
  // Scholarships
  { title: 'FAST Merit Scholarship (Board & NU Test)', category: 'Scholarship', sectionId: 'scholarships', snippet: 'Top 3 position holders of Exam Boards and NU merit list per campus. Requires 3.0 GPA.' },
  { title: 'FAST Interest-Free Study Loan', category: 'Financial Aid', sectionId: 'scholarships', snippet: 'Need-based repayment assistance for students facing financial hardship.' },
  { title: 'Sindh Government Endowment Board Scholarship', category: 'Scholarship', sectionId: 'scholarships', snippet: 'Full tuition coverage for rural (60%) and urban (40%) Sindh students.' },
  { title: 'PEEF & Punjab Honhaar Scholarships', category: 'Scholarship', sectionId: 'scholarships', snippet: 'Provincial merit and need programs applicable under government rules.' },
  { title: 'OSAF & FANA Alumni Financial Assistance', category: 'Financial Aid', sectionId: 'scholarships', snippet: 'Alumni-backed funding for students who cannot afford the full semester fee.' },
  { title: 'Ihsan Trust Financial Assistance', category: 'Financial Aid', sectionId: 'scholarships', snippet: 'Interest-free Qarz-e-Hasna program for deserving students.' },
  
  // Programs & Campuses
  { title: 'Computing Degrees: CS, AI, Data Science, Cyber Security, SE', category: 'Programs', sectionId: 'programs', snippet: 'FLAGSHIP undergraduate computing programs at FAST-NUCES.' },
  { title: 'Campuses: Karachi, Lahore, Islamabad, Peshawar, Multan, CFD', category: 'Campuses', sectionId: 'campuses', snippet: 'Overview of all 6 nationwide FAST-NUCES campuses.' }
];

function initSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const resultsBox = document.getElementById('searchResultsBox');
  const clearBtn = document.getElementById('searchClearBtn');

  if (!searchInput || !resultsBox) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    if (query.length < 2) {
      resultsBox.style.display = 'none';
      return;
    }

    const matches = searchDatabase.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.snippet.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsBox.innerHTML = `
        <div class="search-results-header">No results found</div>
        <div style="padding: 16px; font-size: 0.9rem; color: var(--gray-600); text-align: center;">
          No matching preparation topics found for "<strong>${escapeHtml(query)}</strong>". Try searching for "Math", "Merit", "IQ", or "Loan".
        </div>
      `;
    } else {
      resultsBox.innerHTML = `
        <div class="search-results-header">Found ${matches.length} topic${matches.length > 1 ? 's' : ''}</div>
        ${matches.map(m => `
          <a class="search-result-item" href="#${m.sectionId}" data-target="${m.sectionId}">
            <div class="item-title"><span class="item-category">${m.category}</span> ${highlightMatch(m.title, query)}</div>
            <div class="item-snippet">${highlightMatch(m.snippet, query)}</div>
          </a>
        `).join('')}
      `;
    }

    resultsBox.style.display = 'block';

    // Click handler for result items
    resultsBox.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', (ev) => {
        resultsBox.style.display = 'none';
        searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
      });
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      resultsBox.style.display = 'none';
      clearBtn.style.display = 'none';
      searchInput.focus();
    });
  }

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.style.display = 'none';
    }
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background: #fef08a; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   Preparation Dashboard & LocalStorage
   ========================================================================== */
function initDashboard() {
  updateDashboardDisplay();
}

function getPrepProgress() {
  const saved = localStorage.getItem('fast_prep_progress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
  }
  return {
    math: 35, // default initial prompt engagement
    analytical: 20,
    english: 20,
    scholarship: 0
  };
}

function savePrepProgress(data) {
  localStorage.setItem('fast_prep_progress', JSON.stringify(data));
  updateDashboardDisplay();
}

function updateDashboardDisplay() {
  const data = getPrepProgress();
  
  // Calculate checklist contribution to scholarship research
  const checklistSaved = JSON.parse(localStorage.getItem('fast_checklist') || '[]');
  const checklistPct = Math.round((checklistSaved.length / 14) * 100);
  data.scholarship = checklistPct;

  const overall = Math.round((data.math * 0.4) + (data.analytical * 0.2) + (data.english * 0.15) + (data.scholarship * 0.25));

  const mathBar = document.getElementById('dashMathBar');
  const mathVal = document.getElementById('dashMathVal');
  if (mathBar && mathVal) {
    mathBar.style.width = `${data.math}%`;
    mathVal.textContent = `${data.math}%`;
  }

  const anaBar = document.getElementById('dashAnaBar');
  const anaVal = document.getElementById('dashAnaVal');
  if (anaBar && anaVal) {
    anaBar.style.width = `${data.analytical}%`;
    anaVal.textContent = `${data.analytical}%`;
  }

  const engBar = document.getElementById('dashEngBar');
  const engVal = document.getElementById('dashEngVal');
  if (engBar && engVal) {
    engBar.style.width = `${data.english}%`;
    engVal.textContent = `${data.english}%`;
  }

  const schBar = document.getElementById('dashSchBar');
  const schVal = document.getElementById('dashSchVal');
  if (schBar && schVal) {
    schBar.style.width = `${data.scholarship}%`;
    schVal.textContent = `${data.scholarship}%`;
  }

  const overallBar = document.getElementById('dashOverallBar');
  const overallVal = document.getElementById('dashOverallVal');
  if (overallBar && overallVal) {
    overallBar.style.width = `${overall}%`;
    overallVal.textContent = `${overall}%`;
  }
}

/* ==========================================================================
   Interactive Scholarship & Admission Checklist
   ========================================================================== */
const checklistItemsData = [
  "Check FAST admission eligibility",
  "Check academic marks requirement",
  "Prepare Mathematics",
  "Prepare Analytical Skills",
  "Prepare English",
  "Choose admission test",
  "Prepare documents",
  "Check scholarship eligibility",
  "Prepare financial information if required",
  "Check official deadlines",
  "Submit application correctly",
  "Save application/registration information",
  "Check merit list",
  "Check financial aid instructions"
];

function initChecklist() {
  const container = document.getElementById('checklistContainer');
  const progressText = document.getElementById('checklistProgressText');
  const progressBar = document.getElementById('checklistProgressBar');
  const resetBtn = document.getElementById('resetChecklistBtn');

  if (!container) return;

  let savedCompleted = JSON.parse(localStorage.getItem('fast_checklist') || '[]');

  function render() {
    container.innerHTML = '';
    checklistItemsData.forEach((itemText, index) => {
      const isChecked = savedCompleted.includes(index);
      const row = document.createElement('div');
      row.className = `checklist-item-row ${isChecked ? 'completed' : ''}`;
      row.innerHTML = `
        <input type="checkbox" id="chk_${index}" class="checklist-checkbox" ${isChecked ? 'checked' : ''}>
        <label for="chk_${index}" class="checklist-label">${index + 1}. ${itemText}</label>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const chk = row.querySelector('input');
          chk.checked = !chk.checked;
          toggleItem(index, chk.checked);
        }
      });

      const input = row.querySelector('input');
      input.addEventListener('change', (e) => {
        toggleItem(index, e.target.checked);
      });

      container.appendChild(row);
    });

    updateProgress();
  }

  function toggleItem(index, checked) {
    if (checked) {
      if (!savedCompleted.includes(index)) savedCompleted.push(index);
    } else {
      savedCompleted = savedCompleted.filter(i => i !== index);
    }
    localStorage.setItem('fast_checklist', JSON.stringify(savedCompleted));
    render();
    updateDashboardDisplay();

    if (savedCompleted.length === checklistItemsData.length) {
      showToast('🎉 Awesome! You completed the entire FAST preparation checklist!', 'success');
    }
  }

  function updateProgress() {
    const pct = Math.round((savedCompleted.length / checklistItemsData.length) * 100);
    if (progressText) progressText.textContent = `Scholarship Preparation Progress: ${pct}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all checklist items?')) {
        savedCompleted = [];
        localStorage.setItem('fast_checklist', JSON.stringify(savedCompleted));
        render();
        updateDashboardDisplay();
        showToast('Checklist reset', 'info');
      }
    });
  }

  render();
}

/* ==========================================================================
   Analytical Skills & IQ Preparation Section (15 Topics)
   ========================================================================== */
const analyticalTopics = [
  {
    name: "Number Series",
    desc: "Examines mathematical patterns including arithmetic progressions, geometric intervals, alternating increments, square/cube sequences, and Fibonacci series.",
    q: "Find the next number in the sequence: 4, 9, 25, 49, 121, ?",
    opts: ["144", "169", "196", "225"],
    correct: 1,
    solution: "The series represents squares of prime numbers: 2² (4), 3² (9), 5² (25), 7² (49), 11² (121). The next prime number is 13, and 13² = 169."
  },
  {
    name: "Letter Series",
    desc: "Sequences where alphabetical positions shift by consistent numeric offsets, reverse order shifts, or alternating vowel-consonant rules.",
    q: "What comes next in: B, E, I, N, T, ?",
    opts: ["Y", "Z", "A", "W"],
    correct: 2,
    solution: "Offsets: B (+3) -> E (+4) -> I (+5) -> N (+6) -> T (+7) -> A (20 + 7 = 27 = 1st letter 'A')."
  },
  {
    name: "Analogies",
    desc: "Identifying structural or semantic relationships between two given concepts and applying the identical relational rule to a new pair.",
    q: "PENCIL : LEAD :: LAMP : ?",
    opts: ["SHADE", "OIL", "LIGHT", "WICK"],
    correct: 3,
    solution: "A pencil functions with lead (or graphite core); a lamp functions with a wick (or filament/energy core)."
  },
  {
    name: "Classification",
    desc: "Grouping elements by shared properties and isolating the element that does not satisfy the governing rule.",
    q: "Which word does not belong with the others?",
    opts: ["Triangle", "Hexagon", "Octagon", "Cylinder"],
    correct: 3,
    solution: "Triangle, Hexagon, and Octagon are 2D polygons, while Cylinder is a 3D solid."
  },
  {
    name: "Coding-Decoding",
    desc: "Deciphering alphanumeric substitution ciphers, positional reflections, or symbolic mappings.",
    q: "If FAST is coded as GZTU, how is EXAM coded in the same system?",
    opts: ["FWBL", "FYBN", "FYBL", "EYBL"],
    correct: 1,
    solution: "F(+1)=G, A(-1)=Z, S(+1)=T, T(+1)=U (Rule: +1, -1, +1, +1). E(+1)=F, X(+1)/(-1): E(+1)=F, X(+1)=Y, A(+1)=B, M(+1)=N -> FYBN."
  },
  {
    name: "Logical Sequences",
    desc: "Arranging events, procedural stages, or natural hierarchies in temporal or causal order.",
    q: "Arrange in logical order: 1. Application, 2. Merit List, 3. Entry Test, 4. Enrollment",
    opts: ["1, 3, 2, 4", "1, 2, 3, 4", "3, 1, 2, 4", "1, 3, 4, 2"],
    correct: 0,
    solution: "The standard sequence is: Submit Application (1) -> Take Entry Test (3) -> Check Merit List (2) -> Final Enrollment (4)."
  },
  {
    name: "Pattern Recognition",
    desc: "Visual or symbolic matrix completion based on rotational symmetry, shape counts, or line inversions.",
    q: "A sequence of shapes increases sides: Triangle (3), Square (4), Pentagon (5). What is shape 6?",
    opts: ["Octagon", "Hexagon", "Nonagon", "Decagon"],
    correct: 1,
    solution: "A 6-sided polygon is a Hexagon."
  },
  {
    name: "Direction Sense",
    desc: "Vector movement in cardinal and intercardinal coordinates with distance tracking and turning angles.",
    q: "A student walks 6m North, turns East and walks 8m. How far is he from his starting point?",
    opts: ["14m", "10m", "12m", "2m"],
    correct: 1,
    solution: "Using the Pythagorean theorem: Distance = √(6² + 8²) = √(36 + 64) = √100 = 10m."
  },
  {
    name: "Blood Relations",
    desc: "Deductive genealogy problem solving using relational mapping and gender indicators.",
    q: "Pointing to a photograph, Ali says, 'He is the son of the only son of my grandfather.' How is Ali related to the person?",
    opts: ["Father", "Brother or Ali himself", "Uncle", "Cousin"],
    correct: 1,
    solution: "Grandfather's only son is Ali's father. The son of Ali's father is either Ali himself or Ali's brother."
  },
  {
    name: "Statement-Based Reasoning",
    desc: "Determining whether a given conclusion logically and unequivocally follows from given premises.",
    q: "Statements: All coders love math. Some math lovers are engineers. Conclusion: Are all coders engineers?",
    opts: ["Definitely True", "Definitely False", "Cannot be determined with certainty", "Partially True"],
    correct: 2,
    solution: "We know some math lovers are engineers, but we cannot conclude whether coders belong to that subset."
  },
  {
    name: "Data Interpretation",
    desc: "Analyzing comparative data tables, percentages, and numerical ratios without a calculator.",
    q: "If 120 applicants out of 600 qualify for interviews, what is the qualification percentage?",
    opts: ["15%", "18%", "20%", "25%"],
    correct: 2,
    solution: "Qualification % = (120 / 600) × 100% = 1/5 × 100% = 20%."
  },
  {
    name: "Logical Deduction",
    desc: "Applying conditional logic rules (Modus Ponens, Modus Tollens, and Syllogistic rules).",
    q: "If it rains, the test is online. The test is in-person. What follows?",
    opts: ["It rained", "It did not rain", "It might rain", "Test was cancelled"],
    correct: 1,
    solution: "By Modus Tollens: If P implies Q, and NOT Q is true, then NOT P is true (It did not rain)."
  },
  {
    name: "Odd One Out",
    desc: "Filtering words, numerical values, or formulas to isolate semantic or mathematical outliers.",
    q: "Find the odd one out: 17, 23, 29, 33, 37",
    opts: ["17", "23", "33", "37"],
    correct: 2,
    solution: "17, 23, 29, and 37 are prime numbers; 33 is composite (3 × 11)."
  },
  {
    name: "Quantitative Reasoning",
    desc: "Mental arithmetic, unit conversions, work rate, and proportionality problems.",
    q: "If 4 workers build a wall in 6 hours, how many hours will 8 workers take at the same rate?",
    opts: ["12 hours", "4 hours", "3 hours", "2 hours"],
    correct: 2,
    solution: "Inverse proportionality: 4 × 6 = 8 × Time -> Time = 24 / 8 = 3 hours."
  },
  {
    name: "Critical Thinking",
    desc: "Evaluating arguments, underlying assumptions, and detecting logical fallacies.",
    q: "An argument assumes that because A occurred before B, A caused B. What fallacy is this?",
    opts: ["Ad Hominem", "Post Hoc Ergo Propter Hoc", "Circular Reasoning", "Straw Man"],
    correct: 1,
    solution: "Assuming sequence implies causation is the classic 'Post Hoc Ergo Propter Hoc' fallacy."
  }
];

function initAnalyticalTopics() {
  const listNav = document.getElementById('analyticalTopicList');
  const detailCard = document.getElementById('analyticalDetailCard');
  if (!listNav || !detailCard) return;

  listNav.innerHTML = '';
  analyticalTopics.forEach((topic, idx) => {
    const btn = document.createElement('button');
    btn.className = `topic-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${idx + 1}. ${topic.name}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    `;
    btn.addEventListener('click', () => {
      listNav.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnalyticalTopic(idx);
    });
    listNav.appendChild(btn);
  });

  renderAnalyticalTopic(0);
}

function renderAnalyticalTopic(idx) {
  const topic = analyticalTopics[idx];
  const detailCard = document.getElementById('analyticalDetailCard');
  if (!detailCard || !topic) return;

  detailCard.innerHTML = `
    <h4 class="topic-detail-title">${idx + 1}. ${topic.name}</h4>
    <p class="topic-explanation">${topic.desc}</p>
    
    <div class="sample-problem-box">
      <h5>Solved Practice Question</h5>
      <p class="sample-q-text">${topic.q}</p>
      <div class="sample-options">
        ${topic.opts.map((opt, i) => `
          <div class="sample-opt-item ${i === topic.correct ? 'style="font-weight:600;"' : ''}">
            <strong>${String.fromCharCode(65 + i)}.</strong> ${opt} ${i === topic.correct ? '✓' : ''}
          </div>
        `).join('')}
      </div>
      <div class="sample-solution">
        <strong>Detailed Solution:</strong> ${topic.solution}
      </div>
    </div>

    <div style="display: flex; gap: 12px; margin-top: auto;">
      <button class="btn btn-primary btn-sm" onclick="openPracticeModal('analytical', ${idx})">
        Practice This Topic (MCQs)
      </button>
      <button class="btn btn-secondary btn-sm" onclick="markTopicReviewed('analytical')">
        Mark Reviewed ✓
      </button>
    </div>
  `;
}

/* ==========================================================================
   English Preparation Section (15 Topics)
   ========================================================================== */
const englishTopics = [
  {
    name: "Vocabulary",
    desc: "Root words, prefixes, suffixes, contextual meanings, and frequently occurring entry test lexicon.",
    q: "Select the word that best expresses the meaning of 'PRAGMATIC':",
    opts: ["Theoretical", "Practical", "Arrogant", "Indifferent"],
    correct: 1,
    solution: "'Pragmatic' means dealing with things sensibly and realistically in a practical way."
  },
  {
    name: "Synonyms",
    desc: "Choosing words with closest semantic equivalence in academic reading contexts.",
    q: "Synonym of 'EPHEMERAL':",
    opts: ["Eternal", "Transient", "Monumental", "Enigmatic"],
    correct: 1,
    solution: "'Ephemeral' means lasting for a very short time; transient is its direct synonym."
  },
  {
    name: "Antonyms",
    desc: "Recognizing direct polar opposites in tone, magnitude, or meaning.",
    q: "Antonym of 'LACONIC':",
    opts: ["Verbose", "Concise", "Taciturn", "Brief"],
    correct: 0,
    solution: "'Laconic' means using very few words. 'Verbose' means using far more words than necessary (opposite)."
  },
  {
    name: "Sentence Completion",
    desc: "Single and double blank sentences testing vocabulary precision and contextual transition words.",
    q: "Despite her _______ initial reaction, she eventually _______ the new proposal enthusiastically.",
    opts: ["warm - rejected", "hesitant - embraced", "excited - condemned", "calm - avoided"],
    correct: 1,
    solution: "'Despite' indicates contrast between her initial reaction (hesitant) and later behavior (embraced)."
  },
  {
    name: "Grammar Rules",
    desc: "Core grammatical mechanics including modifiers, parallel structure, and conditional clauses.",
    q: "Identify the grammatically correct sentence:",
    opts: [
      "Neither the teacher nor the students was present.",
      "Neither the teacher nor the students were present.",
      "Neither the teacher or students was present.",
      "Neither of the students are present."
    ],
    correct: 1,
    solution: "With 'Neither... nor', the verb agrees with the closer subject ('students' -> 'were')."
  },
  {
    name: "Subject-Verb Agreement",
    desc: "Handling collective nouns, compound subjects, and inverted structures.",
    q: "The committee _______ unable to reach a unanimous verdict.",
    opts: ["were", "was", "are", "have been"],
    correct: 1,
    solution: "A collective noun acting as a single cohesive unit takes a singular verb ('was')."
  },
  {
    name: "Tenses & Sequence",
    desc: "Past perfect vs simple past, future conditionals, and tense consistency in complex clauses.",
    q: "By the time the test commenced, the candidate _______ his preparation.",
    opts: ["completed", "has completed", "had completed", "was completing"],
    correct: 2,
    solution: "An action completed before another past event requires the Past Perfect tense ('had completed')."
  },
  {
    name: "Articles",
    desc: "Definite and indefinite articles, zero article usage with abstract and mass nouns.",
    q: "He is _______ honest applicant with _______ unique perspective on computing.",
    opts: ["a, a", "an, a", "an, an", "a, an"],
    correct: 1,
    solution: "'Honest' starts with a vowel sound -> 'an'. 'Unique' starts with a consonant 'yu' sound -> 'a'."
  },
  {
    name: "Prepositions",
    desc: "Fixed prepositions, dependent prepositions, and phrasal verb combinations.",
    q: "The candidate was fully absorbed _______ his algorithm analysis.",
    opts: ["with", "at", "in", "on"],
    correct: 2,
    solution: "The correct dependent preposition with absorbed is 'in' (absorbed in something)."
  },
  {
    name: "Pronouns",
    desc: "Relative pronouns (who vs whom, which vs that) and antecedent agreement.",
    q: "The engineer _______ designed this neural network graduated from FAST.",
    opts: ["which", "whom", "who", "whose"],
    correct: 2,
    solution: "'Who' functions as the subject pronoun referring to a person ('The engineer')."
  },
  {
    name: "Active & Passive Voice",
    desc: "Voice transformation rules and maintaining correct tense inflection.",
    q: "Passive of: 'The university announced the merit list yesterday.'",
    opts: [
      "The merit list had been announced by the university.",
      "The merit list was announced by the university yesterday.",
      "The merit list is announced by the university.",
      "The merit list announced yesterday."
    ],
    correct: 1,
    solution: "Simple past active ('announced') converts to simple past passive ('was announced')."
  },
  {
    name: "Direct & Indirect Speech",
    desc: "Backshifting tenses, pronoun modifications, and time/place adverb shifts in reported speech.",
    q: "Ali said, 'I am preparing for FAST.' -> Indirect speech:",
    opts: [
      "Ali said that he was preparing for FAST.",
      "Ali said that I am preparing for FAST.",
      "Ali says that he is preparing for FAST.",
      "Ali said he is preparing for FAST."
    ],
    correct: 0,
    solution: "Present continuous ('am preparing') backshifts to past continuous ('was preparing')."
  },
  {
    name: "Sentence Correction",
    desc: "Identifying and replacing dangling modifiers, comma splices, and faulty parallelism.",
    q: "Choose the correct version: 'She likes programming, algorithms, and to solve problems.'",
    opts: [
      "She likes programming, algorithms, and problem-solving.",
      "She likes to program, algorithms, and solving problems.",
      "She likes programming, algorithms, and to problem solve.",
      "She likes programming, algorithm, and solving problems."
    ],
    correct: 0,
    solution: "Maintains parallel gerund/noun structure: 'programming, algorithms, and problem-solving'."
  },
  {
    name: "Reading Comprehension",
    desc: "Extracting thesis statements, author intent, contextual inferences, and structural tone.",
    q: "When a passage's author describes a test as 'rigorous yet indispensable', the tone is:",
    opts: ["Hostile", "Objective and Appreciative", "Cynical", "Sarcastic"],
    correct: 1,
    solution: "Acknowledging difficulty while affirming necessity demonstrates an objective, balanced, and appreciative tone."
  },
  {
    name: "Contextual Vocabulary",
    desc: "Selecting precise words matching technical, scholarly, or formal academic register.",
    q: "The algorithm exhibited exceptional _______, processing ten million records per millisecond.",
    opts: ["eloquence", "efficacy", "reluctance", "fragility"],
    correct: 1,
    solution: "'Efficacy' denotes the capacity to produce a desired result or high-performance output."
  }
];

function initEnglishTopics() {
  const listNav = document.getElementById('englishTopicList');
  const detailCard = document.getElementById('englishDetailCard');
  if (!listNav || !detailCard) return;

  listNav.innerHTML = '';
  englishTopics.forEach((topic, idx) => {
    const btn = document.createElement('button');
    btn.className = `topic-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${idx + 1}. ${topic.name}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    `;
    btn.addEventListener('click', () => {
      listNav.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEnglishTopic(idx);
    });
    listNav.appendChild(btn);
  });

  renderEnglishTopic(0);
}

function renderEnglishTopic(idx) {
  const topic = englishTopics[idx];
  const detailCard = document.getElementById('englishDetailCard');
  if (!detailCard || !topic) return;

  detailCard.innerHTML = `
    <h4 class="topic-detail-title">${idx + 1}. ${topic.name}</h4>
    <p class="topic-explanation">${topic.desc}</p>
    
    <div class="sample-problem-box">
      <h5>Solved Practice Question</h5>
      <p class="sample-q-text">${topic.q}</p>
      <div class="sample-options">
        ${topic.opts.map((opt, i) => `
          <div class="sample-opt-item ${i === topic.correct ? 'style="font-weight:600;"' : ''}">
            <strong>${String.fromCharCode(65 + i)}.</strong> ${opt} ${i === topic.correct ? '✓' : ''}
          </div>
        `).join('')}
      </div>
      <div class="sample-solution">
        <strong>Detailed Solution:</strong> ${topic.solution}
      </div>
    </div>

    <div style="display: flex; gap: 12px; margin-top: auto;">
      <button class="btn btn-primary btn-sm" onclick="openPracticeModal('english', ${idx})">
        Practice English MCQs
      </button>
      <button class="btn btn-secondary btn-sm" onclick="markTopicReviewed('english')">
        Mark Reviewed ✓
      </button>
    </div>
  `;
}

window.markTopicReviewed = function(type) {
  const data = getPrepProgress();
  if (type === 'analytical') {
    data.analytical = Math.min(100, (data.analytical || 0) + 10);
  } else if (type === 'english') {
    data.english = Math.min(100, (data.english || 0) + 10);
  }
  savePrepProgress(data);
  showToast(`Marked reviewed! Progress updated.`, 'success');
};

/* ==========================================================================
   Section 20: 15-Question Interactive Scholarship Knowledge Quiz
   ========================================================================== */
const scholarshipQuizQuestions = [
  {
    q: "1. Who among Examination Board students may receive the FAST Merit Scholarship in the year of admission?",
    opts: [
      "Top 10 position holders of each Board",
      "Top 3 position holders of each Board",
      "Only the 1st position holder of federal board",
      "Any student scoring above 90%"
    ],
    correct: 1,
    explanation: "Under official FAST scholarship guidelines, top three position holders of each Examination Board in the year of admission may receive the merit scholarship."
  },
  {
    q: "2. In addition to Board position holders, who else is eligible for the FAST Merit Scholarship on admission?",
    opts: [
      "All students in the top 50 of overall admission list",
      "Top 3 students in the NU admission merit list of each campus",
      "All students applying through SAT score",
      "Candidates who scored 100% in mathematics"
    ],
    correct: 1,
    explanation: "Top three students in the NU admission merit list of each individual campus may receive the merit scholarship."
  },
  {
    q: "3. What is the semester GPA condition currently specified by FAST to continue receiving the Merit Scholarship?",
    opts: [
      "Semester GPA of at least 2.5",
      "Semester GPA of at least 3.0",
      "Semester GPA of at least 3.7",
      "Semester GPA of at least 3.5"
    ],
    correct: 1,
    explanation: "Current FAST information states that students must maintain a semester GPA of at least 3.0 along with full course-load requirements to maintain continuation."
  },
  {
    q: "4. What is the fundamental nature of the FAST Study Loan?",
    opts: [
      "It is a non-repayable gift grant",
      "It is an interest-free need-based financial loan with repayment conditions",
      "It is a bank commercial loan with 15% interest",
      "It only covers transportation costs"
    ],
    correct: 1,
    explanation: "FAST provides financial assistance in the form of interest-free study loans for students with genuine financial need. Repayment conditions apply after graduation."
  },
  {
    q: "5. What are the quota reservations for the Sindh Government Endowment Board Scholarship?",
    opts: [
      "50% Rural and 50% Urban",
      "60% Rural and 40% Urban",
      "70% Rural and 30% Urban",
      "100% Open Merit across Sindh"
    ],
    correct: 1,
    explanation: "The Sindh Government Endowment Scholarship specifies a 60% quota for rural applicants and a 40% quota for urban applicants."
  },
  {
    q: "6. Which degree levels are covered under the Sindh Government Endowment Scholarship at FAST?",
    opts: [
      "Only PhD programs",
      "Undergraduate and Graduate levels across all disciplines",
      "Only BBA programs",
      "Only Diploma certifications"
    ],
    correct: 1,
    explanation: "The scholarship covers both undergraduate and graduate degree programs in all disciplines for eligible candidates."
  },
  {
    q: "7. What does the OSAF Financial Assistance program stand for?",
    opts: [
      "Overseas Students Admission Fund",
      "Old Students Association of FAST Financial Assistance",
      "Open Science Academic Foundation",
      "Online Scholarship Aid Forum"
    ],
    correct: 1,
    explanation: "OSAF is the Old Students Association of FAST, which provides financial assistance to students who cannot afford the full fee."
  },
  {
    q: "8. What is the FANA Scholarship at FAST?",
    opts: [
      "Financial Aid from National Authority",
      "Financial assistance provided by FAST Alumni of North America",
      "Foreign Affairs Non-profit Association",
      "Faculty Assistance Network Alliance"
    ],
    correct: 1,
    explanation: "FANA represents the FAST Alumni Association of North America, contributing financial aid funds for deserving FAST students."
  },
  {
    q: "9. What kind of financial assistance does the Ihsan Trust provide to university students?",
    opts: [
      "Interest-bearing bank loans",
      "Interest-free financial assistance (Qarz-e-Hasna) based on purely need-cum-merit",
      "Free computer equipment only",
      "Monthly luxury stipends"
    ],
    correct: 1,
    explanation: "Ihsan Trust is a renowned non-profit offering interest-free financial assistance (Qarz-e-Hasna) on a purely need-cum-merit basis."
  },
  {
    q: "10. Which external provincial scholarship is specifically aimed at students in Punjab?",
    opts: [
      "Sindh Endowment",
      "PEEF & Punjab Honhaar Scholarship programs",
      "Balochistan Endowment",
      "Aga Khan Foundation only"
    ],
    correct: 1,
    explanation: "PEEF (Punjab Educational Endowment Fund) and the Punjab Honhaar Scholarship program provide assistance to eligible domicile holders under applicable provincial rules."
  },
  {
    q: "11. Are external scholarship policies, quotas, and application deadlines determined by FAST or the respective provider?",
    opts: [
      "FAST decides all external scholarship rules permanently",
      "External scholarship rules and deadlines are controlled by the relevant external organization",
      "The Higher Education Commission fixes all rules identically",
      "External scholarships never have deadlines"
    ],
    correct: 1,
    explanation: "External scholarship terms, eligibility criteria, and deadlines are governed by the respective funding organization."
  },
  {
    q: "12. Is financial assistance / study loan automatically awarded upon admission?",
    opts: [
      "Yes, everyone admitted receives a loan automatically",
      "No, candidates must apply through the prescribed financial aid application process with verified documents",
      "No, only students with 100% test score receive loans",
      "Yes, it is automatically deducted from tuition"
    ],
    correct: 1,
    explanation: "Financial assistance requires a formal application with verifiable income, asset documentation, and evaluation by the financial aid committee."
  },
  {
    q: "13. What is the combined Mathematics weightage for FAST Computing/Engineering entrance preparation?",
    opts: [
      "30% (Basic only)",
      "50% (Advanced only)",
      "70% (20% Basic Mathematics + 50% Advanced Mathematics)",
      "90% (All Mathematics)"
    ],
    correct: 2,
    explanation: "In standard Computing test structures, Basic Math (20%) and Advanced Math (50%) combine for a total of 70% Mathematics weightage."
  },
  {
    q: "14. Can a student claim both a full tuition fee waiver scholarship and a full tuition study loan simultaneously for the same semester?",
    opts: [
      "Yes, always allowed",
      "No, financial aid programs assess actual unmet need according to university policy",
      "Yes, up to triple amounts",
      "Only if they study AI"
    ],
    correct: 1,
    explanation: "Aid packages assess unmet financial tuition requirements, preventing double funding for already covered tuition fees."
  },
  {
    q: "15. Where should an applicant always verify the most up-to-date FAST admission schedules and scholarship criteria?",
    opts: [
      "Unverified social media groups",
      "The official FAST-NUCES website (www.nu.edu.pk)",
      "Print magazines from previous years",
      "Random student blogs"
    ],
    correct: 1,
    explanation: "The official FAST website (https://www.nu.edu.pk/) is the ultimate single source of truth for current admission dates, test patterns, and scholarship regulations."
  }
];

let quizCurrentIndex = 0;
let quizScore = 0;
let quizUserAnswers = new Array(scholarshipQuizQuestions.length).fill(null);

function initScholarshipQuiz() {
  const qTitle = document.getElementById('quizQTitle');
  const optContainer = document.getElementById('quizOptionsList');
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const restartBtn = document.getElementById('quizRestartBtn');

  if (!qTitle || !optContainer) return;

  renderQuizQuestion();

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (quizCurrentIndex > 0) {
        quizCurrentIndex--;
        renderQuizQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (quizCurrentIndex < scholarshipQuizQuestions.length - 1) {
        quizCurrentIndex++;
        renderQuizQuestion();
      } else {
        showQuizScore();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      quizCurrentIndex = 0;
      quizScore = 0;
      quizUserAnswers = new Array(scholarshipQuizQuestions.length).fill(null);
      document.getElementById('quizActiveArea').style.display = 'block';
      document.getElementById('quizScoreScreen').style.display = 'none';
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const currentQ = scholarshipQuizQuestions[quizCurrentIndex];
  const qTitle = document.getElementById('quizQTitle');
  const optContainer = document.getElementById('quizOptionsList');
  const metaText = document.getElementById('quizMetaText');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const quizProgressBar = document.getElementById('quizProgressBar');

  if (!qTitle || !optContainer || !currentQ) return;

  if (metaText) {
    metaText.textContent = `Question ${quizCurrentIndex + 1} of ${scholarshipQuizQuestions.length}`;
  }

  if (quizProgressBar) {
    const pct = ((quizCurrentIndex + 1) / scholarshipQuizQuestions.length) * 100;
    quizProgressBar.style.width = `${pct}%`;
  }

  qTitle.textContent = currentQ.q;
  optContainer.innerHTML = '';
  feedbackBox.className = 'quiz-feedback-box';
  feedbackBox.style.display = 'none';

  const userAns = quizUserAnswers[quizCurrentIndex];

  currentQ.opts.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${optText}</span>
    `;

    if (userAns !== null) {
      btn.disabled = true;
      if (optIdx === currentQ.correct) {
        btn.classList.add('correct');
      } else if (optIdx === userAns) {
        btn.classList.add('incorrect');
      }
    } else {
      btn.addEventListener('click', () => handleQuizSelect(optIdx));
    }

    optContainer.appendChild(btn);
  });

  if (userAns !== null) {
    showQuizFeedback(userAns === currentQ.correct, currentQ.explanation);
  }

  if (prevBtn) {
    prevBtn.disabled = quizCurrentIndex === 0;
  }

  if (nextBtn) {
    nextBtn.textContent = quizCurrentIndex === scholarshipQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question →';
    nextBtn.disabled = userAns === null;
  }
}

function handleQuizSelect(optIdx) {
  const currentQ = scholarshipQuizQuestions[quizCurrentIndex];
  quizUserAnswers[quizCurrentIndex] = optIdx;

  const isCorrect = optIdx === currentQ.correct;
  if (isCorrect) quizScore++;

  renderQuizQuestion();
  showQuizFeedback(isCorrect, currentQ.explanation);

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.disabled = false;
}

function showQuizFeedback(isCorrect, explanation) {
  const feedbackBox = document.getElementById('quizFeedbackBox');
  if (!feedbackBox) return;

  feedbackBox.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
  feedbackBox.innerHTML = `
    <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
    <p style="margin-top: 4px; font-size: 0.88rem;">${explanation}</p>
  `;
  feedbackBox.style.display = 'block';
}

function showQuizScore() {
  const activeArea = document.getElementById('quizActiveArea');
  const scoreScreen = document.getElementById('quizScoreScreen');
  const scoreNumber = document.getElementById('quizScoreNumber');
  const scoreFeedback = document.getElementById('quizScoreFeedback');

  if (activeArea) activeArea.style.display = 'none';
  if (scoreScreen) scoreScreen.style.display = 'block';

  if (scoreNumber) {
    scoreNumber.textContent = `${quizScore}`;
  }

  const pct = Math.round((quizScore / scholarshipQuizQuestions.length) * 100);
  if (scoreFeedback) {
    let msg = '';
    if (pct >= 85) {
      msg = '🌟 Outstanding! You have an expert grasp of FAST scholarship policies, eligibility rules, and financial assistance options.';
    } else if (pct >= 60) {
      msg = '👍 Great effort! You understand the key distinctions between merit awards and interest-free study loans.';
    } else {
      msg = '📖 Good start! Review the scholarship and study loan sections above to master all financial assistance criteria.';
    }
    scoreFeedback.textContent = msg;
  }

  // Update prep dashboard progress
  const data = getPrepProgress();
  data.scholarship = Math.max(data.scholarship || 0, pct);
  savePrepProgress(data);
}

/* ==========================================================================
   Section 21: FAQ Accordion (15 Questions)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');
    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/* ==========================================================================
   Practice Modal Window
   ========================================================================== */
const practiceBanks = {
  analytical: [
    { q: "In a code, 'FAST' is 'GZTU' and 'STUDY' is 'TUTEX'. What is 'MATH'?", opts: ["NZUI", "NZTG", "NZSG", "MZUI"], correct: 0, sol: "Applying the pattern (+1, -1, +1, +1): M->N, A->Z, T->U, H->I." },
    { q: "If South-East becomes North and North-East becomes West, what will West become?", opts: ["South-East", "North-West", "South-West", "North-East"], correct: 0, sol: "Rotate clockwise by 135 degrees. West becomes South-East." },
    { q: "Ali ranks 7th from top and 28th from bottom in his entry class. Total students?", opts: ["34", "35", "36", "33"], correct: 0, sol: "Total = Top + Bottom - 1 = 7 + 28 - 1 = 34." }
  ],
  english: [
    { q: "Select the sentence with correct parallel structure:", opts: ["He likes coding, debugging, and to test apps.", "He likes coding, debugging, and testing apps.", "He likes to code, debugging, and testing.", "He likes code, debug, and testing."], correct: 1, sol: "All three elements must be parallel gerunds: coding, debugging, and testing." },
    { q: "Identify the antonym of 'METICULOUS':", opts: ["Careless", "Thorough", "Painstaking", "Accurate"], correct: 0, sol: "'Meticulous' means extremely careful; 'Careless' is its antonym." },
    { q: "Neither the student nor the instructors _______ present in the seminar.", opts: ["was", "were", "is", "has been"], correct: 1, sol: "Subject closer to verb is plural 'instructors', so 'were' is correct." }
  ],
  mixed: [
    { q: "What is the combined weightage of Mathematics in the standard FAST Computing test?", opts: ["50%", "60%", "70%", "80%"], correct: 2, sol: "Basic Math is 20% and Advanced Math is 50%, totaling 70% Mathematics weightage." },
    { q: "Are handheld calculators permitted in the FAST admission test?", opts: ["Yes, basic ones only", "Yes, scientific only", "No, calculators are strictly prohibited", "Only for engineering programs"], correct: 2, sol: "Calculators are strictly not permitted; candidates must practice mental arithmetic and formula speed." },
    { q: "What minimum semester GPA does FAST require to maintain the merit scholarship?", opts: ["2.50", "3.00", "3.50", "3.75"], correct: 1, sol: "FAST specifies maintaining a semester GPA of at least 3.00 with full course-load." }
  ]
};

function initPracticeModals() {
  const backdrop = document.getElementById('practiceModalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (backdrop && closeBtn) {
    closeBtn.addEventListener('click', () => {
      backdrop.style.display = 'none';
    });
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.style.display = 'none';
    });
  }
}

window.openPracticeModal = function(type, topicIndex = 0) {
  const backdrop = document.getElementById('practiceModalBackdrop');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (!backdrop || !title || !body) return;

  let questions = practiceBanks[type] || practiceBanks.mixed;
  let label = type === 'analytical' ? 'Analytical Skills & IQ Practice' : 
              type === 'english' ? 'English Language Practice' : 'FAST Admission Test Simulation';

  title.textContent = label;
  
  body.innerHTML = `
    <div style="margin-bottom: 20px; font-size: 0.9rem; color: var(--gray-600);">
      Solve these sample interactive questions to test your speed and accuracy. Remember, in the actual FAST test, calculators are prohibited!
    </div>
    <div id="modalQuestionsContainer" style="display: flex; flex-direction: column; gap: 20px;">
      ${questions.map((qObj, qIdx) => `
        <div class="sample-problem-box" style="margin-bottom: 0;">
          <p style="font-weight: 700; color: var(--secondary); margin-bottom: 12px;">Q${qIdx + 1}. ${qObj.q}</p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${qObj.opts.map((opt, oIdx) => `
              <button class="quiz-option-btn modal-opt-btn" data-q="${qIdx}" data-o="${oIdx}" onclick="handleModalOptionClick(${qIdx}, ${oIdx}, ${qObj.correct}, '${escapeHtml(qObj.sol)}')">
                <span><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}</span>
              </button>
            `).join('')}
          </div>
          <div id="modalSol_${qIdx}" class="sample-solution" style="display: none; margin-top: 12px;"></div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 24px; text-align: right;">
      <button class="btn btn-secondary btn-sm" onclick="document.getElementById('practiceModalBackdrop').style.display='none'">Close</button>
    </div>
  `;

  backdrop.style.display = 'flex';
};

window.handleModalOptionClick = function(qIdx, oIdx, correctIdx, solution) {
  const container = document.getElementById('modalQuestionsContainer');
  if (!container) return;

  const solBox = document.getElementById(`modalSol_${qIdx}`);
  const buttons = container.querySelectorAll(`button[data-q="${qIdx}"]`);

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (idx === oIdx) {
      btn.classList.add('incorrect');
    }
  });

  if (solBox) {
    solBox.innerHTML = `<strong>Solution:</strong> ${solution}`;
    solBox.style.display = 'block';
  }
};
