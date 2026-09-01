/**
 * EduNexa AI - Chemistry MDCAT Main Subject Page Script
 * File: chemistrymdcat.js
 * 
 * Handles:
 * - Real-time Chapter Search
 * - Category Filtering (All, Physical, Organic, Inorganic)
 * - Chapter Progress & Completion via LocalStorage
 * - "Continue Learning" dynamic tracking
 * - Quick stats calculation (Total 14, Completed, In Progress, Remaining, %)
 * - Mobile Navigation Menu
 * - UI Interactivity and Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Chapter metadata directory mapped strictly to the 14 existing HTML files
  const CHAPTERS = [
    {
      id: 1,
      name: 'Basic Concepts',
      file: 'Basic Concepts.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Mole calculations, Avogadro\'s number, stoichiometry, limiting reactant & yield percentages.',
      topics: ['Mole Concept', 'Stoichiometry', 'Limiting Reactant', '% Yield']
    },
    {
      id: 2,
      name: 'Atomic Structure',
      file: 'atomic-structure.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Bohr\'s atomic model, quantum numbers, electronic configuration, spectral lines & de Broglie.',
      topics: ['Bohr Model', 'Quantum Numbers', 'Orbital Shapes', 'Aufbau & Hund\'s']
    },
    {
      id: 3,
      name: 'States of Matter',
      file: 'states-of-matter.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Gas laws, ideal gas equation, Dalton\'s & Graham\'s laws, kinetic molecular theory & real gases.',
      topics: ['Ideal Gas Law', 'Graham\'s Diffusion', 'Dalton\'s Law', 'KMT & van der Waals']
    },
    {
      id: 4,
      name: 'Liquids & Solids',
      file: 'liquids-solids.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Intermolecular forces, vapor pressure, boiling point, crystal lattice, unit cells & allotropy.',
      topics: ['H-Bonding', 'Vapor Pressure', 'Crystal Lattices', 'Liquid Crystals']
    },
    {
      id: 5,
      name: 'Chemical Equilibrium',
      file: 'chemical-equilibrium.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Dynamic equilibrium, Kc, Kp, Le Chatelier\'s principle, common ion effect & solubility product Ksp.',
      topics: ['Kc & Kp', 'Le Chatelier Principle', 'Common Ion Effect', 'Ksp Calculations']
    },
    {
      id: 6,
      name: 'Acids, Bases & Salts',
      file: 'acids-bases-salts.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Arrhenius, Bronsted-Lowry, Lewis theories, pH, pOH, buffer solutions & salt hydrolysis.',
      topics: ['pH & pOH', 'Buffer Action', 'Henderson Equation', 'Salt Hydrolysis']
    },
    {
      id: 7,
      name: 'Thermochemistry',
      file: 'thermochemistry.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'Enthalpy changes, Hess\'s law of constant heat summation, Born-Haber cycle & calorimetry.',
      topics: ['Standard Enthalpy', 'Hess\'s Law', 'Calorimetry', 'Born-Haber Cycle']
    },
    {
      id: 8,
      name: 'Thermodynamics',
      file: 'thermodynamics.html',
      category: 'physical',
      categoryLabel: 'Physical Chemistry',
      description: 'First and second laws of thermodynamics, spontaneity, entropy (S) & Gibbs free energy (ΔG).',
      topics: ['1st & 2nd Laws', 'Gibbs Free Energy', 'Entropy Changes', 'Spontaneity']
    },
    {
      id: 9,
      name: 'Chemical Bonding',
      file: 'chemical-bonding.html',
      category: 'inorganic',
      categoryLabel: 'Inorganic Chemistry',
      description: 'VSEPR theory, atomic orbital hybridization (sp, sp2, sp3), dipole moments & MOT concepts.',
      topics: ['VSEPR Shapes', 'Hybridization', 'Dipole Moments', 'Sigma & Pi Bonds']
    },
    {
      id: 10,
      name: 'Periodic Table',
      file: 'periodic-table.html',
      category: 'inorganic',
      categoryLabel: 'Inorganic Chemistry',
      description: 'Periodic trends, shielding effect, atomic & ionic radii, ionization energy & electronegativity.',
      topics: ['Ionization Energy', 'Electronegativity', 'Shielding Effect', 'Periodicity']
    },
    {
      id: 11,
      name: 'Alcohols, Phenols & Ethers',
      file: 'alcohols-phenols-ethers.html',
      category: 'organic',
      categoryLabel: 'Organic Chemistry',
      description: 'Classification, Lucas test, acidity of phenols, Williamson synthesis & electrophilic reactions.',
      topics: ['Lucas Reagent', 'Phenol Acidity', 'Williamson Synthesis', 'Oxidation of Alcohols']
    },
    {
      id: 12,
      name: 'Aldehydes & Ketones',
      file: 'aldehydes-ketones.html',
      category: 'organic',
      categoryLabel: 'Organic Chemistry',
      description: 'Nucleophilic addition reactions, Tollens\' & Fehling\'s tests, Aldol condensation & Iodoform test.',
      topics: ['Carbonyl Addition', 'Tollens\' & Fehling\'s', 'Aldol Condensation', 'Haloform Test']
    },
    {
      id: 13,
      name: 'Carboxylic Acids',
      file: 'carboxylic-acids.html',
      category: 'organic',
      categoryLabel: 'Organic Chemistry',
      description: 'Acidity of carboxylic acids, esterification, acyl halides, amides, anhydrides & decarboxylation.',
      topics: ['Acid Strength', 'Esterification', 'Acid Chlorides', 'Amides & Decarboxylation']
    },
    {
      id: 14,
      name: 'Amines',
      file: 'amines.html',
      category: 'organic',
      categoryLabel: 'Organic Chemistry',
      description: 'Basicity order of amines, diazotization, Hinsberg test, synthesis and coupling reactions.',
      topics: ['Amine Basicity', 'Diazotization', 'Hinsberg Test', 'Coupling Reactions']
    }
  ];

  const STORAGE_KEYS = {
    PROGRESS: 'studymate_chemistry_progress',
    LAST_CHAPTER: 'studymate_chemistry_last_chapter'
  };

  // DOM Elements
  const searchInput = document.getElementById('chapterSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const chapterCards = document.querySelectorAll('.chapter-card');
  const chaptersGrid = document.getElementById('chaptersGrid');
  const emptyState = document.getElementById('emptySearchState');
  const resultsCountEl = document.getElementById('resultsCount');
  
  // Stats Elements
  const statTotalEl = document.getElementById('statTotalChapters');
  const statCompletedEl = document.getElementById('statCompletedChapters');
  const statProgressEl = document.getElementById('statProgressChapters');
  const statRemainingEl = document.getElementById('statRemainingChapters');
  const heroProgressPercentEl = document.getElementById('heroProgressPercent');
  const heroProgressBarEl = document.getElementById('heroProgressBar');
  const heroCompletedCountEl = document.getElementById('heroCompletedCount');

  // Continue Learning Elements
  const continueChapterNameEl = document.getElementById('continueChapterName');
  const continueMetaEl = document.getElementById('continueMeta');
  const continueBtnEl = document.getElementById('continueChapterBtn');

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuToggle');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  // Header quick search
  const headerSearchBtn = document.getElementById('headerSearchBtn');
  const resetProgressBtn = document.getElementById('resetProgressBtn');

  let currentCategory = 'all';
  let searchQuery = '';

  // --------------------------------------------------------------------------
  // 1. LocalStorage Helpers
  // --------------------------------------------------------------------------
  function getProgressData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('Could not read progress from localStorage', e);
      return {};
    }
  }

  function saveProgressData(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not write progress to localStorage', e);
    }
  }

  function getLastOpenedChapter() {
    return localStorage.getItem(STORAGE_KEYS.LAST_CHAPTER) || 'Basic Concepts.html';
  }

  function setLastOpenedChapter(fileName) {
    localStorage.setItem(STORAGE_KEYS.LAST_CHAPTER, fileName);
    updateContinueLearningCard();
  }

  // --------------------------------------------------------------------------
  // 2. UI Refresh & Progress Calculations
  // --------------------------------------------------------------------------
  function updateAllProgressStats() {
    const progressData = getProgressData();
    const totalChapters = CHAPTERS.length; // 14
    let completedCount = 0;

    CHAPTERS.forEach((ch) => {
      const isCompleted = !!progressData[ch.file];
      const card = document.querySelector(`.chapter-card[data-file="${CSS.escape(ch.file)}"]`);

      if (card) {
        const progressFill = card.querySelector('.card-progress-fill');
        const progressPercentText = card.querySelector('.card-progress-text');
        const completeBtn = card.querySelector('.btn-toggle-complete');

        if (isCompleted) {
          completedCount++;
          card.classList.add('completed');
          if (progressFill) progressFill.style.width = '100%';
          if (progressPercentText) progressPercentText.textContent = '100%';
          if (completeBtn) {
            completeBtn.setAttribute('title', 'Mark as incomplete');
            completeBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
          }
        } else {
          card.classList.remove('completed');
          if (progressFill) progressFill.style.width = '0%';
          if (progressPercentText) progressPercentText.textContent = '0%';
          if (completeBtn) {
            completeBtn.setAttribute('title', 'Mark as complete');
            completeBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
              </svg>
            `;
          }
        }
      }
    });

    const remainingCount = totalChapters - completedCount;
    const inProgressCount = completedCount > 0 && completedCount < totalChapters ? 1 : 0;
    const overallPercentage = Math.round((completedCount / totalChapters) * 100);

    // Update stats counters
    if (statTotalEl) statTotalEl.textContent = totalChapters;
    if (statCompletedEl) statCompletedEl.textContent = completedCount;
    if (statProgressEl) statProgressEl.textContent = inProgressCount;
    if (statRemainingEl) statRemainingEl.textContent = remainingCount;

    // Update Hero progress tracker
    if (heroProgressPercentEl) heroProgressPercentEl.textContent = `${overallPercentage}%`;
    if (heroProgressBarEl) heroProgressBarEl.style.width = `${overallPercentage}%`;
    if (heroCompletedCountEl) heroCompletedCountEl.textContent = `${completedCount}/${totalChapters} Chapters`;

    updateContinueLearningCard();
  }

  function updateContinueLearningCard() {
    const lastFile = getLastOpenedChapter();
    const chapter = CHAPTERS.find(c => c.file === lastFile) || CHAPTERS[0];
    const progressData = getProgressData();
    const isCompleted = !!progressData[chapter.file];

    if (continueChapterNameEl) {
      continueChapterNameEl.textContent = chapter.name;
    }
    if (continueMetaEl) {
      continueMetaEl.textContent = `${chapter.categoryLabel} • Chapter ${String(chapter.id).padStart(2, '0')} • ${isCompleted ? 'Completed' : 'Ready to study'}`;
    }
    if (continueBtnEl) {
      continueBtnEl.setAttribute('href', chapter.file);
      continueBtnEl.innerHTML = `
        <span>${isCompleted ? 'Review Chapter' : 'Continue Chapter'}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 3. Search and Category Filtering
  // --------------------------------------------------------------------------
  function filterChapters() {
    const query = searchQuery.trim().toLowerCase();
    let visibleCount = 0;

    chapterCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const description = (card.getAttribute('data-description') || '').toLowerCase();
      const topics = (card.getAttribute('data-topics') || '').toLowerCase();
      const chapterNum = card.getAttribute('data-chapter-num') || '';

      const matchesCategory = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = !query || 
                            name.includes(query) || 
                            description.includes(query) || 
                            topics.includes(query) ||
                            chapterNum.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Results Meta
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${visibleCount} of ${CHAPTERS.length} chapters`;
    }

    // Toggle Empty State
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.add('visible');
      } else {
        emptyState.classList.remove('visible');
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. Event Listeners
  // --------------------------------------------------------------------------
  
  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      filterChapters();
    });

    // Keyboard shortcut to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchQuery = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
        filterChapters();
        searchInput.blur();
      }
    });
  }

  // Search Clear Button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      filterChapters();
      searchInput.focus();
    });
  }

  // Category Filter Tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter') || 'all';
      filterChapters();
    });
  });

  // Track "Open Chapter" clicks and save to LocalStorage
  document.querySelectorAll('.btn-open-chapter, .continue-card a').forEach((link) => {
    link.addEventListener('click', function () {
      const href = this.getAttribute('href');
      if (href) {
        setLastOpenedChapter(href);
      }
    });
  });

  // Complete / Incomplete Checkbox Toggle
  document.querySelectorAll('.btn-toggle-complete').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = this.closest('.chapter-card');
      const file = card.getAttribute('data-file');
      const chapterName = card.getAttribute('data-name');
      
      const progressData = getProgressData();
      const newState = !progressData[file];
      progressData[file] = newState;
      saveProgressData(progressData);
      
      updateAllProgressStats();

      if (newState) {
        showToast(`Marked "${chapterName}" as Completed! 🎉`, 'success');
      } else {
        showToast(`Marked "${chapterName}" as Incomplete.`, 'normal');
      }
    });
  });

  // Header quick search scroll & focus
  if (headerSearchBtn && searchInput) {
    headerSearchBtn.addEventListener('click', () => {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => searchInput.focus(), 300);
    });
  }

  // Reset Progress Button
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all your Chemistry chapter progress?')) {
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        updateAllProgressStats();
        showToast('All progress has been reset.', 'normal');
      }
    });
  }

  // Mobile Navigation Menu Toggle
  if (mobileMenuBtn && mobileNavPanel) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavPanel.classList.toggle('open');
    });
  }

  // Navbar shadow on scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Toast Notification Utility
  // --------------------------------------------------------------------------
  function showToast(message, type = 'normal') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Initial calculation on load
  updateAllProgressStats();
  filterChapters();
});
