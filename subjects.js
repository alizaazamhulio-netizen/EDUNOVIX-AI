/**
 * EDUNOVIX - Centralized Subjects & Curriculum Data Layer
 * File: subjects.js
 * Strictly connects to real existing files in the EDUNOVIX repository.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Centralized Subject & Topic Configuration (All Real Repository Files)
  // =========================================================================
  const SUBJECTS = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      category: 'mathematics',
      categoryLabel: 'Mathematics',
      file: 'maths.html',
      description: 'Master real numbers, algebraic formulas, linear & quadratic equations, geometry, trigonometry, and probability.',
      keywords: 'mathematics maths algebra geometry trigonometry probability equations sequences real numbers functions formulas matrices statistics calculus arithmetic',
      iconClass: 'icon-math',
      colorVar: 'var(--domain-math)',
      bgVar: 'var(--domain-math-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <path d="M6 16H26M16 6V26" />
        <path d="M9 23L23 9" />
        <circle cx="8" cy="8" r="2.2" fill="currentColor" />
        <circle cx="24" cy="24" r="2.2" fill="currentColor" />
      </svg>`,
      topics: [
        { name: 'Algebra & Algebraic Expressions', file: 'Algebra.html', tag: 'Core Algebra' },
        { name: 'Geometry & Mensuration', file: 'Geometry.html', tag: 'Geometry' },
        { name: 'Trigonometry & Ratios', file: 'Trigonometry.html', tag: 'Trigonometry' },
        { name: 'Linear Equations & Inequalities', file: 'Linear-Equations.html', tag: 'Equations' },
        { name: 'Quadratic Equations', file: 'Quadratic-Equations.html', tag: 'Equations' },
        { name: 'Coordinate Geometry', file: 'Coordinate-Geometry.html', tag: 'Geometry' },
        { name: 'Probability Theory', file: 'Probability.html', tag: 'Statistics' },
        { name: 'Sequences & Series', file: 'Sequences-Series.html', tag: 'Algebra' },
        { name: 'Number Systems & Real Numbers', file: 'Number-System.html', tag: 'Foundation' },
        { name: 'Percentages, Ratios & Proportions', file: 'Percentages-Ratios.html', tag: 'Arithmetic' },
        { name: 'Mathematical Word Problems', file: 'Word-Problems.html', tag: 'Problem Solving' },
        { name: 'Permutations & Combinations', file: 'Permutations-Combinations.html', tag: 'Combinatorics' },
        { name: 'Profit, Loss & Discount', file: 'Profit-loss-discount.html', tag: 'Commercial Math' },
        { name: 'Matrices & Determinants', file: 'matrices.html', tag: 'Linear Algebra' },
        { name: 'Statistics & Data Interpretation', file: 'statics.html', tag: 'Data Science' },
        { name: 'Exponents, Powers & Logarithms', file: 'exponents-powers-logarithms.html', tag: 'Algebra' },
        { name: 'ECAT Mathematics Preparation', file: 'ecatmaths.html', tag: 'Exam Prep' }
      ]
    },
    {
      id: 'physics',
      name: 'Physics',
      category: 'science',
      categoryLabel: 'Science',
      file: 'physics.html',
      description: 'Explore mechanics, thermodynamics, fluid dynamics, electromagnetism, atomic spectra, and modern physics.',
      keywords: 'physics mechanics motion forces vectors work energy circular motion thermodynamics waves electromagnetism electricity modern physics nuclear quantum',
      iconClass: 'icon-physics',
      colorVar: 'var(--domain-physics)',
      bgVar: 'var(--domain-physics-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-30 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(30 16 16)" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>`,
      topics: [
        { name: 'Vectors & Equilibrium', file: 'vectors-equilibrium.html', tag: 'Mechanics' },
        { name: 'Force & Motion', file: 'force-motion.html', tag: 'Kinematics' },
        { name: 'Work & Energy', file: 'work-energy.html', tag: 'Dynamics' },
        { name: 'Rotational & Circular Motion', file: 'rotational-circular-motion.html', tag: 'Mechanics' },
        { name: 'Fluid Dynamics', file: 'fluid-dynamics.html', tag: 'Hydrodynamics' },
        { name: 'Waves & Oscillations', file: 'waves.html', tag: 'Wave Mechanics' },
        { name: 'Thermodynamics & Heat', file: 'thermodynamics.html', tag: 'Thermal Physics' },
        { name: 'Electrostatics', file: 'electrostatics.html', tag: 'Electricity' },
        { name: 'Electromagnetism & Induction', file: 'electromagnetism.html', tag: 'Electromagnetism' },
        { name: 'Alternating Current', file: 'alternating-current.html', tag: 'Circuits' },
        { name: 'Electronics & Semiconductor Physics', file: 'electronics.html', tag: 'Electronics' },
        { name: 'Modern Physics', file: 'modern-physics.html', tag: 'Relativity & Quantum' },
        { name: 'Atomic Spectra', file: 'atomic-spectra.html', tag: 'Atomic Physics' },
        { name: 'Nuclear Physics', file: 'nuclear-physics.html', tag: 'Nuclear Physics' },
        { name: 'MDCAT Physics Preparation', file: 'physicsmdcat.html', tag: 'Exam Prep' }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      category: 'science',
      categoryLabel: 'Science',
      file: 'chemistry.html',
      description: 'Study atomic structure, chemical bonding, organic reactions, equilibrium, thermochemistry, and solutions.',
      keywords: 'chemistry stoichiometry atomic structure bonding equilibrium states of matter solutions thermochemistry periodic table carboxylic acids aldehydes ketones amines acids bases reactions organic inorganic',
      iconClass: 'icon-chem',
      colorVar: 'var(--domain-chem)',
      bgVar: 'var(--domain-chem-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <path d="M12 4H20" />
        <path d="M14 4V10L7 23C6 24.8 7.3 27 9.4 27H22.6C24.7 27 26 24.8 25 23L18 10V4" />
        <line x1="10" y1="18" x2="22" y2="18" />
        <circle cx="16" cy="22" r="1.5" fill="currentColor" />
      </svg>`,
      topics: [
        { name: 'Basic Concepts & Stoichiometry', file: 'Basic Concepts.html', tag: 'Physical Chem' },
        { name: 'Atomic Structure & Orbitals', file: 'atomic-structure.html', tag: 'Atomic Theory' },
        { name: 'Chemical Bonding & Geometry', file: 'chemical-bonding.html', tag: 'Inorganic' },
        { name: 'Chemical Equilibrium', file: 'chemical-equilibrium.html', tag: 'Equilibrium' },
        { name: 'States of Matter Overview', file: 'states-of-matter.html', tag: 'States of Matter' },
        { name: 'Gases & Gas Laws', file: 'gases.html', tag: 'Physical Chem' },
        { name: 'Liquids & Solids', file: 'liquids-solids.html', tag: 'Condensed Matter' },
        { name: 'Solutions & Colligative Properties', file: 'solutions.html', tag: 'Solutions Lab' },
        { name: 'Thermochemistry & Energetics', file: 'thermochemistry.html', tag: 'Thermodynamics' },
        { name: 'Periodic Table & Periodicity', file: 'periodic-table.html', tag: 'Periodic Properties' },
        { name: 'Carboxylic Acids', file: 'carboxylic-acids.html', tag: 'Organic Chem' },
        { name: 'Alcohols, Phenols & Ethers', file: 'alcohols-phenols-ethers.html', tag: 'Organic Chem' },
        { name: 'Aldehydes & Ketones', file: 'aldehydes-ketones.html', tag: 'Carbonyl Compounds' },
        { name: 'Amines & Nitrogen Compounds', file: 'amines.html', tag: 'Organic Chem' },
        { name: 'Acids, Bases & Salts', file: 'acids-bases-salts.html', tag: 'Inorganic' },
        { name: 'Coordination Compounds', file: 'coordination.html', tag: 'Inorganic' },
        { name: 'MDCAT Chemistry Preparation', file: 'chemistrymdcat.html', tag: 'Exam Prep' }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      category: 'science',
      categoryLabel: 'Science',
      file: 'biology.html',
      description: 'Investigate cell biology, biological molecules, genetics, human physiology, biotechnology, and evolution.',
      keywords: 'biology cells cell biology molecules dna genetics evolution biotechnology enzymes homeostasis physiology reproduction inheritance microbiology anatomy zoology botany',
      iconClass: 'icon-bio',
      colorVar: 'var(--domain-bio)',
      bgVar: 'var(--domain-bio-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <path d="M7 6C11 10 15 16 25 16" />
        <path d="M25 6C21 10 17 16 7 16" />
        <path d="M7 26C11 22 15 16 25 16" />
        <path d="M25 26C21 22 17 16 7 16" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>`,
      topics: [
        { name: 'Cell Biology & Ultrastructure', file: 'Cell-Biology.html', tag: 'Cytology' },
        { name: 'Biological Molecules', file: 'Biological-Molecules.html', tag: 'Biochemistry' },
        { name: 'Enzymes & Catalysis', file: 'enzymes.html', tag: 'Enzymology' },
        { name: 'Bioenergetics & Cellular Respiration', file: 'Bioenergetics.html', tag: 'Bioenergetics' },
        { name: 'Biotechnology & Genetic Engineering', file: 'Biotechnology.html', tag: 'Biotechnology' },
        { name: 'Genetics & Molecular Biology', file: 'Genetics.html', tag: 'Genetics' },
        { name: 'Evolution & Natural Selection', file: 'Evolution.html', tag: 'Evolution' },
        { name: 'Homeostasis & Osmoregulation', file: 'Homeostasis.html', tag: 'Physiology' },
        { name: 'Human Physiology', file: 'Human Physiology.html', tag: 'Human Anatomy' },
        { name: 'Inheritance & Variation', file: 'Inheritance.html', tag: 'Genetics' },
        { name: 'Reproduction in Living Organisms', file: 'reproduction.html', tag: 'Reproduction' },
        { name: 'Support & Movement', file: 'support-movement.html', tag: 'Skeletal & Muscular' },
        { name: 'Biochemistry & Cellular Metabolism', file: 'biochemistry.html', tag: 'Metabolism' },
        { name: 'Coordination & Control', file: 'coordination.html', tag: 'Neurobiology' },
        { name: 'MDCAT Biology Preparation', file: 'biologymdcat.html', tag: 'Exam Prep' }
      ]
    },
    {
      id: 'computer',
      name: 'Computer Science',
      category: 'technology',
      categoryLabel: 'Technology',
      file: 'computer.html',
      description: 'Build foundations in programming fundamentals, Python, web technologies, algorithms, and databases.',
      keywords: 'computer science programming coding python javascript html css databases sql algorithms data structures software hardware networking logic web development',
      iconClass: 'icon-cs',
      colorVar: 'var(--domain-cs)',
      bgVar: 'var(--domain-cs-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <rect x="5" y="6" width="22" height="15" rx="3" />
        <line x1="10" y1="26" x2="22" y2="26" />
        <line x1="16" y1="21" x2="16" y2="26" />
        <polyline points="10 13 13 16 10 19" />
        <line x1="16" y1="19" x2="20" y2="19" />
      </svg>`,
      topics: [
        { name: 'Programming Fundamentals', file: 'computer.html#programming-fundamentals', tag: 'Programming' },
        { name: 'Python Programming', file: 'computer.html#python-programming', tag: 'Python' },
        { name: 'JavaScript Basics', file: 'computer.html#javascript-basics', tag: 'JavaScript' },
        { name: 'Web Development (HTML & CSS)', file: 'computer.html#html-css', tag: 'Web Dev' },
        { name: 'Databases & SQL Basics', file: 'computer.html#databases', tag: 'Databases' },
        { name: 'Computer Fundamentals & Architecture', file: 'computer.html#topics', tag: 'Architecture' }
      ]
    },
    {
      id: 'english',
      name: 'English',
      category: 'humanities',
      categoryLabel: 'Languages & Social',
      file: 'english.html',
      description: 'Strengthen English grammar, sentence correction, active/passive voice, vocabulary, and reading comprehension.',
      keywords: 'english grammar parts of speech articles modals voice speech punctuation error detection reading comprehension vocabulary synonyms antonyms language literature',
      iconClass: 'icon-eng',
      colorVar: 'var(--domain-eng)',
      bgVar: 'var(--domain-eng-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <path d="M6 7a3 3 0 0 1 3-3h14v20H9a3 3 0 0 0-3 3V7z" />
        <path d="M6 7a3 3 0 0 0-3 3v17a3 3 0 0 0 3 3h17" />
        <line x1="11" y1="9" x2="19" y2="9" />
        <line x1="11" y1="13" x2="17" y2="13" />
      </svg>`,
      topics: [
        { name: 'Parts of Speech Mastery', file: 'parts-of-speech.html', tag: 'Grammar' },
        { name: 'Articles: A, An & The', file: 'articles.html', tag: 'Grammar' },
        { name: 'Modal Verbs & Auxiliaries', file: 'modals.html', tag: 'Verbs' },
        { name: 'Direct & Indirect Speech', file: 'direct-indirect-speech.html', tag: 'Narration' },
        { name: 'Active & Passive Voice', file: 'active-passive-voice.html', tag: 'Syntax' },
        { name: 'English Punctuation Mechanics', file: 'punctuation.html', tag: 'Mechanics' },
        { name: 'Error Detection & Sentence Correction', file: 'error-detection.html', tag: 'Sentence Correction' },
        { name: 'Reading Comprehension & Analysis', file: 'reading-comprehension.html', tag: 'Comprehension' },
        { name: 'Vocabulary Mastery & Word Bank', file: 'vocabulary.html', tag: 'Vocabulary' },
        { name: 'Synonyms & Antonyms', file: 'synonyms-antonyms.html', tag: 'Vocabulary' },
        { name: 'English MDCAT Preparation', file: 'englishmdcat.html', tag: 'Exam Prep' }
      ]
    },
    {
      id: 'pakistan-studies',
      name: 'Pakistan Studies',
      category: 'humanities',
      categoryLabel: 'Languages & Social',
      file: 'pakistan-studies.html',
      description: 'Understand the Pakistan Movement, historical timeline, constitutional frameworks, geography, and culture.',
      keywords: 'pakistan studies pst history geography constitution culture economy movement foreign policy nation quaid allama iqbal natural resources provinces',
      iconClass: 'icon-pst',
      colorVar: 'var(--domain-pst)',
      bgVar: 'var(--domain-pst-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <path d="M14 10a7 7 0 1 0 5.5 11.3A6 6 0 1 1 14 10z" fill="currentColor" stroke="none" />
        <polygon points="19,10 20.5,13.5 24,13.5 21,15.5 22,19 19,17 16,19 17,15.5 14,13.5 17.5,13.5" fill="currentColor" stroke="none" />
      </svg>`,
      topics: [
        { name: 'History of Early Pakistan & Civilization', file: 'pakistan-studies.html#history-of-pakistan', tag: 'History' },
        { name: 'The Pakistan Movement & Independence', file: 'pakistan-studies.html#pakistan-movement', tag: 'Independence' },
        { name: 'Geography & Natural Resources', file: 'pakistan-studies.html#geography', tag: 'Geography' },
        { name: 'Constitutional & Political System', file: 'pakistan-studies.html#political-system', tag: 'Civics' },
        { name: 'Culture, Heritage & Foreign Relations', file: 'pakistan-studies.html#notes', tag: 'Culture' },
        { name: 'Pakistan Studies Assessment & Quizzes', file: 'pakistan-studies.html#ai-quiz', tag: 'Assessment' }
      ]
    },
    {
      id: 'islamiat',
      name: 'Islamiat',
      category: 'humanities',
      categoryLabel: 'Languages & Social',
      file: 'islamiat.html',
      description: 'Study Quranic verses, Hadith sciences, the Seerah of Prophet Muhammad ﷺ, ethics, and pillars of Islam.',
      keywords: 'islamiat islamic studies quran hadith seerah prophet muhammad pillars worship ethics morals values fiqh islamic history civilization',
      iconClass: 'icon-isl',
      colorVar: 'var(--domain-isl)',
      bgVar: 'var(--domain-isl-bg)',
      iconSvg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="subject-icon-svg" aria-hidden="true">
        <path d="M6 26V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v18" />
        <path d="M16 6v20" />
        <path d="M6 22c3-1.5 7-1.5 10 0 3-1.5 7-1.5 10 0" />
      </svg>`,
      topics: [
        { name: 'Quranic Studies & Key Concepts', file: 'islamiat.html#quran-studies', tag: 'Quran' },
        { name: 'Hadith Studies & Prophetic Guidance', file: 'islamiat.html#hadith-studies', tag: 'Hadith' },
        { name: 'Seerah of Prophet Muhammad ﷺ', file: 'islamiat.html#seerah', tag: 'Seerah' },
        { name: 'Pillars of Islam & Worship', file: 'islamiat.html#pillars', tag: 'Pillars' },
        { name: 'Islamic Ethics, Morals & Values', file: 'islamiat.html#notes', tag: 'Ethics' },
        { name: 'Islamiat Assessment & Review', file: 'islamiat.html#ai-quiz', tag: 'Assessment' }
      ]
    }
  ];

  // Storage Keys
  const STORAGE_KEY_THEME = 'edunovix-theme';
  const STORAGE_KEY_LAST_LEARNING = 'edunovix-last-learning';
  const STORAGE_KEY_LEGACY_LAST = 'novix_last_subject';

  // State
  let activeCategory = 'all';
  let searchQuery = '';
  let activeDrawerSubject = null;

  // DOM Elements
  let searchInput = null;
  let searchClearBtn = null;
  let filterButtons = [];
  let subjectsGrid = null;
  let emptyStateCard = null;
  let resultsStatusText = null;
  let continueCardContainer = null;
  let themeToggleBtn = null;
  let mobileMenuBtn = null;
  let mobileNavPanel = null;
  
  // Drawer Elements
  let drawer = null;
  let drawerBackdrop = null;
  let drawerCloseBtn = null;
  let drawerIconBox = null;
  let drawerCategoryBadge = null;
  let drawerSubjectTitle = null;
  let drawerDescription = null;
  let drawerPortalLink = null;
  let drawerTopicsBody = null;
  let drawerTopicSearch = null;
  let drawerTopicCount = null;

  // =========================================================================
  // 2. Application Boot & Initialization
  // =========================================================================
  function init() {
    cacheDomElements();
    initThemeManager();
    computeAndRenderHeroStats();
    renderSubjectCards();
    renderContinueLearningCard();
    bindEventListeners();
  }

  function cacheDomElements() {
    searchInput = document.getElementById('subject-search-input');
    searchClearBtn = document.getElementById('search-clear-btn');
    filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    subjectsGrid = document.getElementById('subjects-grid');
    emptyStateCard = document.getElementById('empty-state-card');
    resultsStatusText = document.getElementById('results-status-text');
    continueCardContainer = document.getElementById('continue-learning-section');
    themeToggleBtn = document.getElementById('theme-toggle-btn');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileNavPanel = document.getElementById('mobile-nav-panel');

    // Drawer Elements
    drawer = document.getElementById('topic-drawer');
    drawerBackdrop = document.getElementById('drawer-backdrop');
    drawerCloseBtn = document.getElementById('drawer-close-btn');
    drawerIconBox = document.getElementById('drawer-icon-box');
    drawerCategoryBadge = document.getElementById('drawer-category-badge');
    drawerSubjectTitle = document.getElementById('drawer-subject-title');
    drawerDescription = document.getElementById('drawer-description');
    drawerPortalLink = document.getElementById('drawer-portal-link');
    drawerTopicsBody = document.getElementById('drawer-topics-body');
    drawerTopicSearch = document.getElementById('drawer-topic-search');
    drawerTopicCount = document.getElementById('drawer-topic-count');
  }

  // =========================================================================
  // 3. Theme Manager (Day & Night Mode with LocalStorage Persistence)
  // =========================================================================
  function initThemeManager() {
    let currentTheme = 'light';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) || 
                    localStorage.getItem('novix_theme') || 
                    localStorage.getItem('studymate_theme');
      if (saved) {
        currentTheme = saved;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      }
    } catch (e) {
      currentTheme = 'light';
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        const active = document.documentElement.getAttribute('data-theme') || 'light';
        const next = active === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      localStorage.setItem('novix_theme', theme);
    } catch (e) {}

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode');
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode');
    }
  }

  // =========================================================================
  // 4. Dynamic Stats Computation from Actual Repository Data
  // =========================================================================
  function computeAndRenderHeroStats() {
    const totalSubjects = SUBJECTS.length;
    const totalTopics = SUBJECTS.reduce(function (sum, subj) {
      return sum + subj.topics.length;
    }, 0);
    // Learning Resources = Total dedicated topic modules + core subject platforms
    const totalResources = totalTopics + totalSubjects;

    const subjectsCountElem = document.getElementById('stat-subjects-count');
    const topicsCountElem = document.getElementById('stat-topics-count');
    const resourcesCountElem = document.getElementById('stat-resources-count');

    if (subjectsCountElem) subjectsCountElem.textContent = totalSubjects;
    if (topicsCountElem) topicsCountElem.textContent = totalTopics;
    if (resourcesCountElem) resourcesCountElem.textContent = totalResources;

    // Update category filter badge counts dynamically
    const countScience = SUBJECTS.filter(s => s.category === 'science').length;
    const countMath = SUBJECTS.filter(s => s.category === 'mathematics').length;
    const countTech = SUBJECTS.filter(s => s.category === 'technology').length;
    const countHumanities = SUBJECTS.filter(s => s.category === 'humanities').length;

    const elAll = document.getElementById('count-all');
    const elSci = document.getElementById('count-science');
    const elMath = document.getElementById('count-mathematics');
    const elTech = document.getElementById('count-technology');
    const elHum = document.getElementById('count-humanities');

    if (elAll) elAll.textContent = totalSubjects;
    if (elSci) elSci.textContent = countScience;
    if (elMath) elMath.textContent = countMath;
    if (elTech) elTech.textContent = countTech;
    if (elHum) elHum.textContent = countHumanities;
  }

  // =========================================================================
  // 5. Subject Cards Rendering & Filtering
  // =========================================================================
  function renderSubjectCards() {
    if (!subjectsGrid) return;
    subjectsGrid.innerHTML = '';

    const query = searchQuery.trim().toLowerCase();
    let visibleCount = 0;

    SUBJECTS.forEach(function (subject) {
      // Category check
      const matchesCategory = (activeCategory === 'all') || (subject.category === activeCategory);

      // Search check across subject name, category, description, keywords and topic names
      let matchesSearch = true;
      if (query.length > 0) {
        const matchTitle = subject.name.toLowerCase().includes(query);
        const matchDesc = subject.description.toLowerCase().includes(query);
        const matchCat = subject.categoryLabel.toLowerCase().includes(query);
        const matchKeywords = subject.keywords.toLowerCase().includes(query);
        const matchTopics = subject.topics.some(t => t.name.toLowerCase().includes(query) || (t.tag && t.tag.toLowerCase().includes(query)));

        matchesSearch = (matchTitle || matchDesc || matchCat || matchKeywords || matchTopics);
      }

      if (matchesCategory && matchesSearch) {
        visibleCount++;
        const cardElem = createSubjectCardElement(subject, query);
        subjectsGrid.appendChild(cardElem);
      }
    });

    // Update Results Counter Text
    if (resultsStatusText) {
      if (query.length > 0) {
        resultsStatusText.textContent = `Found ${visibleCount} subject${visibleCount === 1 ? '' : 's'} matching "${escapeHtml(query)}"`;
      } else if (activeCategory !== 'all') {
        const activeLabel = filterButtons.find(b => b.dataset.category === activeCategory)?.querySelector('span')?.textContent || activeCategory;
        resultsStatusText.textContent = `Showing ${visibleCount} subject${visibleCount === 1 ? '' : 's'} in ${activeLabel}`;
      } else {
        resultsStatusText.textContent = `Showing all ${visibleCount} core subjects`;
      }
    }

    // Toggle Empty State
    if (emptyStateCard) {
      emptyStateCard.style.display = visibleCount === 0 ? 'block' : 'none';
      const emptyDesc = document.getElementById('empty-description');
      if (emptyDesc && query.length > 0) {
        emptyDesc.textContent = `No learning materials found matching "${escapeHtml(query)}". Check spelling or select "All" categories.`;
      }
    }
  }

  function createSubjectCardElement(subject, activeQuery) {
    const card = document.createElement('article');
    card.className = `subject-card card-${subject.id}`;
    card.setAttribute('data-subject-id', subject.id);
    card.setAttribute('data-category', subject.category);

    // Subtle glow overlay
    const glow = document.createElement('div');
    glow.className = 'subject-card-glow';
    glow.style.background = subject.colorVar;
    card.appendChild(glow);

    // Card Top Row (Icon & Category Badge)
    const topRow = document.createElement('div');
    topRow.className = 'card-top-row';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'subject-icon-wrap';
    iconWrap.style.background = subject.bgVar;
    iconWrap.style.color = subject.colorVar;
    iconWrap.innerHTML = subject.iconSvg;
    topRow.appendChild(iconWrap);

    const badge = document.createElement('span');
    badge.className = 'card-badge';
    badge.style.background = subject.bgVar;
    badge.style.color = subject.colorVar;
    badge.textContent = subject.categoryLabel;
    topRow.appendChild(badge);

    card.appendChild(topRow);

    // Subject Information
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const titleRow = document.createElement('h2');
    titleRow.className = 'subject-card-title';
    titleRow.innerHTML = `<span>${escapeHtml(subject.name)}</span> <span class="card-topic-count-pill">${subject.topics.length} topics</span>`;
    cardInfo.appendChild(titleRow);

    const desc = document.createElement('p');
    desc.className = 'subject-card-desc';
    desc.textContent = subject.description;
    cardInfo.appendChild(desc);

    card.appendChild(cardInfo);

    // Topic Preview Section (Show top 4 real topics + "+ X more" pill)
    const previewSection = document.createElement('div');
    previewSection.className = 'topic-preview-container';

    const previewHeader = document.createElement('div');
    previewHeader.className = 'topic-preview-label';
    previewHeader.innerHTML = `
      <span>Topic Modules</span>
      <button type="button" class="view-all-topics-text-btn" data-subject-id="${subject.id}">
        View all ${subject.topics.length} →
      </button>
    `;
    previewSection.appendChild(previewHeader);

    const chipsCloud = document.createElement('div');
    chipsCloud.className = 'chips-cloud';

    // Prioritize topics that match active query, or pick first 4
    let displayTopics = subject.topics.slice(0, 4);
    if (activeQuery && activeQuery.length > 0) {
      const matchingTopics = subject.topics.filter(t => t.name.toLowerCase().includes(activeQuery));
      if (matchingTopics.length > 0) {
        displayTopics = matchingTopics.slice(0, 4);
      }
    }

    displayTopics.forEach(function (topic) {
      const chip = document.createElement('a');
      chip.href = topic.file;
      chip.className = 'topic-chip-link';
      chip.textContent = topic.name;
      chip.title = `Open ${topic.name}`;
      chip.addEventListener('click', function () {
        recordLastLearning(subject.id, subject.name, topic.name, topic.file);
      });
      chipsCloud.appendChild(chip);
    });

    const remainingCount = subject.topics.length - displayTopics.length;
    if (remainingCount > 0) {
      const morePill = document.createElement('button');
      morePill.type = 'button';
      morePill.className = 'more-chips-pill';
      morePill.textContent = `+${remainingCount} more`;
      morePill.title = `View all ${subject.topics.length} topics for ${subject.name}`;
      morePill.addEventListener('click', function () {
        openTopicDrawer(subject);
      });
      chipsCloud.appendChild(morePill);
    }

    previewSection.appendChild(chipsCloud);
    card.appendChild(previewSection);

    // Card Bottom Row (Honest progress status + Primary CTA Pair)
    const bottomRow = document.createElement('div');
    bottomRow.className = 'card-bottom-actions';

    const statusRow = document.createElement('div');
    statusRow.className = 'card-status-row';

    const statusState = getSubjectStatus(subject.id);
    statusRow.innerHTML = `
      <span class="status-dot-wrap">
        <span class="status-pulse-dot ${statusState.isActive ? 'active' : ''}"></span>
        <span>${statusState.label}</span>
      </span>
      <span>${subject.topics.length} Modules Available</span>
    `;
    bottomRow.appendChild(statusRow);

    const buttonsPair = document.createElement('div');
    buttonsPair.className = 'card-buttons-pair';

    // Explore Subject Drawer Button
    const exploreBtn = document.createElement('button');
    exploreBtn.type = 'button';
    exploreBtn.className = 'explore-subject-btn';
    exploreBtn.innerHTML = `
      <span>Explore Subject</span>
      <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-svg" aria-hidden="true">
        <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
      </svg>
    `;
    exploreBtn.addEventListener('click', function () {
      openTopicDrawer(subject);
    });
    buttonsPair.appendChild(exploreBtn);

    // Direct Quick Portal Link (links to real subject file maths.html, physics.html etc.)
    const portalLink = document.createElement('a');
    portalLink.href = subject.file;
    portalLink.className = 'quick-portal-link';
    portalLink.textContent = 'Open Portal';
    portalLink.title = `Go to ${subject.name} central hub (${subject.file})`;
    portalLink.addEventListener('click', function () {
      recordLastLearning(subject.id, subject.name, 'Main Portal', subject.file);
    });
    buttonsPair.appendChild(portalLink);

    bottomRow.appendChild(buttonsPair);
    card.appendChild(bottomRow);

    return card;
  }

  // =========================================================================
  // 6. Slide-Over Subject Explorer Drawer
  // =========================================================================
  function openTopicDrawer(subject) {
    if (!drawer || !drawerBackdrop) return;
    activeDrawerSubject = subject;

    // Populate drawer header
    if (drawerIconBox) {
      drawerIconBox.style.background = subject.bgVar;
      drawerIconBox.style.color = subject.colorVar;
      drawerIconBox.innerHTML = subject.iconSvg;
    }
    if (drawerCategoryBadge) {
      drawerCategoryBadge.style.background = subject.bgVar;
      drawerCategoryBadge.style.color = subject.colorVar;
      drawerCategoryBadge.textContent = subject.categoryLabel;
    }
    if (drawerSubjectTitle) {
      drawerSubjectTitle.textContent = subject.name;
    }
    if (drawerDescription) {
      drawerDescription.textContent = subject.description;
    }
    if (drawerPortalLink) {
      drawerPortalLink.href = subject.file;
      drawerPortalLink.onclick = function () {
        recordLastLearning(subject.id, subject.name, 'Subject Portal', subject.file);
      };
    }
    if (drawerTopicSearch) {
      drawerTopicSearch.value = '';
    }

    renderDrawerTopicList(subject.topics, '');

    // Open animations & accessibility states
    drawerBackdrop.classList.add('active');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (drawerCloseBtn) {
      drawerCloseBtn.focus();
    }
  }

  function closeTopicDrawer() {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeDrawerSubject = null;
  }

  function renderDrawerTopicList(topics, filterQuery) {
    if (!drawerTopicsBody) return;
    drawerTopicsBody.innerHTML = '';

    const query = filterQuery.trim().toLowerCase();
    const filtered = topics.filter(function (t) {
      if (!query) return true;
      return t.name.toLowerCase().includes(query) || (t.tag && t.tag.toLowerCase().includes(query));
    });

    if (drawerTopicCount) {
      drawerTopicCount.textContent = `${filtered.length} of ${topics.length} topics`;
    }

    if (filtered.length === 0) {
      drawerTopicsBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.9rem;">
          No topics matching "${escapeHtml(filterQuery)}" in this subject.
        </div>
      `;
      return;
    }

    filtered.forEach(function (topic, index) {
      const item = document.createElement('a');
      item.href = topic.file;
      item.className = 'drawer-topic-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="drawer-topic-left">
          <span class="drawer-topic-index">${index + 1}</span>
          <span class="drawer-topic-name">${escapeHtml(topic.name)}</span>
        </div>
        <span class="drawer-topic-open-btn">
          <span>Open Topic</span>
          <svg viewBox="0 0 20 20" fill="currentColor" style="width:14px;height:14px;" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </span>
      `;

      item.addEventListener('click', function () {
        if (activeDrawerSubject) {
          recordLastLearning(activeDrawerSubject.id, activeDrawerSubject.name, topic.name, topic.file);
        }
      });

      drawerTopicsBody.appendChild(item);
    });
  }

  // =========================================================================
  // 7. Continue Learning State Management
  // =========================================================================
  function recordLastLearning(subjectId, subjectName, topicName, file) {
    try {
      const record = {
        subjectId: subjectId,
        subjectName: subjectName,
        topicName: topicName,
        file: file,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_LAST_LEARNING, JSON.stringify(record));
      // Also update legacy key for cross-module compatibility
      localStorage.setItem(STORAGE_KEY_LEGACY_LAST, JSON.stringify({
        id: subjectId,
        name: subjectName,
        href: file,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('LocalStorage write warning:', e);
    }
  }

  function renderContinueLearningCard() {
    const continueTitle = document.getElementById('continue-title');
    const continueSub = document.getElementById('continue-sub');
    const continueBtn = document.getElementById('continue-btn');

    if (!continueTitle || !continueBtn) return;

    let saved = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LAST_LEARNING) || localStorage.getItem(STORAGE_KEY_LEGACY_LAST);
      if (raw) {
        saved = JSON.parse(raw);
      }
    } catch (e) {
      saved = null;
    }

    if (saved && (saved.subjectName || saved.name) && (saved.file || saved.href)) {
      const sName = saved.subjectName || saved.name;
      const tName = saved.topicName || 'Resume Session';
      const targetFile = saved.file || saved.href;

      continueTitle.textContent = `${sName} — ${tName}`;
      if (continueSub) {
        continueSub.textContent = `Jump straight back into your last opened learning module.`;
      }
      continueBtn.href = targetFile;
      continueBtn.innerHTML = `
        <span>Continue →</span>
      `;
    } else {
      continueTitle.textContent = 'Choose a subject to start learning.';
      if (continueSub) {
        continueSub.textContent = 'Pick from 8 core disciplines below to start your study track.';
      }
      continueBtn.href = '#subjects-grid-section';
      continueBtn.innerHTML = `
        <span>Start Learning</span>
        <span class="btn-arrow" aria-hidden="true">→</span>
      `;
    }
  }

  function getSubjectStatus(subjectId) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LAST_LEARNING) || localStorage.getItem(STORAGE_KEY_LEGACY_LAST);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.subjectId === subjectId || parsed.id === subjectId) {
          return { label: 'Active Session', isActive: true };
        }
      }
    } catch (e) {}

    return { label: 'Ready to study', isActive: false };
  }

  // =========================================================================
  // 8. Event Listeners & Shortcuts
  // =========================================================================
  function bindEventListeners() {
    // Search input listener
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
        }
        renderSubjectCards();
      });
    }

    // Search clear button
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClearBtn.style.display = 'none';
        searchQuery = '';
        renderSubjectCards();
      });
    }

    // Reset filters button in empty state
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
        filterButtons.forEach(b => {
          b.classList.toggle('active', b.dataset.category === 'all');
          b.setAttribute('aria-selected', b.dataset.category === 'all' ? 'true' : 'false');
        });
        renderSubjectCards();
      });
    }

    // Category Filter Buttons
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeCategory = btn.dataset.category || 'all';
        renderSubjectCards();
      });
    });

    // Drawer internal search
    if (drawerTopicSearch) {
      drawerTopicSearch.addEventListener('input', function (e) {
        if (activeDrawerSubject) {
          renderDrawerTopicList(activeDrawerSubject.topics, e.target.value);
        }
      });
    }

    // Drawer close events
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeTopicDrawer);
    }
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeTopicDrawer);
    }

    // Mobile Navigation Menu Toggle
    if (mobileMenuBtn && mobileNavPanel) {
      mobileMenuBtn.addEventListener('click', function () {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        mobileNavPanel.classList.toggle('open', !isExpanded);
        mobileNavPanel.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
      });
    }

    // Keyboard Shortcuts (Ctrl/Cmd + K to focus search, Esc to close drawer/search)
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      if (e.key === 'Escape') {
        if (drawer && drawer.classList.contains('open')) {
          closeTopicDrawer();
        } else if (searchInput && document.activeElement === searchInput && searchQuery.length > 0) {
          searchInput.value = '';
          searchQuery = '';
          if (searchClearBtn) searchClearBtn.style.display = 'none';
          renderSubjectCards();
        }
      }
    });

    // Event delegation for "View all X topics" text button in cards
    if (subjectsGrid) {
      subjectsGrid.addEventListener('click', function (e) {
        const textBtn = e.target.closest('.view-all-topics-text-btn');
        if (textBtn) {
          const subId = textBtn.getAttribute('data-subject-id');
          const subObj = SUBJECTS.find(s => s.id === subId);
          if (subObj) {
            openTopicDrawer(subObj);
          }
        }
      });
    }
  }

  // =========================================================================
  // 9. Utility Functions
  // =========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
