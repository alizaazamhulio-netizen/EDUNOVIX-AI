/**
 * NOVIX Subjects Learning Hub - Core Client Controller
 * File: subjects.js
 */

(function () {
  'use strict';

  // Core Subject Metadata
  const SUBJECTS_DATA = {
    'mathematics': {
      name: 'Mathematics',
      file: 'maths.html',
      category: 'mathematics',
      tag: 'Formulas & Problem Solving',
      iconClass: 'icon-math'
    },
    'physics': {
      name: 'Physics',
      file: 'physics.html',
      category: 'science',
      tag: 'Concepts & Numericals',
      iconClass: 'icon-physics'
    },
    'chemistry': {
      name: 'Chemistry',
      file: 'chemistry.html',
      category: 'science',
      tag: 'Equations & Reactions',
      iconClass: 'icon-chem'
    },
    'biology': {
      name: 'Biology',
      file: 'biology.html',
      category: 'science',
      tag: 'Diagrams & Physiology',
      iconClass: 'icon-bio'
    },
    'computer': {
      name: 'Computer Science',
      file: 'computer.html',
      category: 'technology',
      tag: 'Code & Logic Architecture',
      iconClass: 'icon-cs'
    },
    'english': {
      name: 'English',
      file: 'english.html',
      category: 'humanities',
      tag: 'Grammar & Literature',
      iconClass: 'icon-eng'
    },
    'pakistan-studies': {
      name: 'Pakistan Studies',
      file: 'pakistan-studies.html',
      category: 'humanities',
      tag: 'History & Geography',
      iconClass: 'icon-pst'
    },
    'islamiat': {
      name: 'Islamiat',
      file: 'islamiat.html',
      category: 'humanities',
      tag: 'Quran & Islamic Ethics',
      iconClass: 'icon-isl'
    }
  };

  // DOM Elements Cache
  let searchInput = null;
  let searchClearBtn = null;
  let subjectCards = [];
  let filterPills = [];
  let noResultsBox = null;
  let resultsCountBadge = null;
  let resetSearchBtn = null;
  let continueContainer = null;
  let userDisplayElem = null;

  // Active Filter State
  let currentCategory = 'all';
  let searchQuery = '';

  /**
   * Initialize Hub Application
   */
  function initHub() {
    // Cache selectors
    searchInput = document.getElementById('subject-search-input');
    searchClearBtn = document.getElementById('search-clear-btn');
    subjectCards = Array.from(document.querySelectorAll('.subject-card'));
    filterPills = Array.from(document.querySelectorAll('.filter-pill'));
    noResultsBox = document.getElementById('no-results-box');
    resultsCountBadge = document.getElementById('results-count-badge');
    resetSearchBtn = document.getElementById('btn-reset-search');
    continueContainer = document.getElementById('continue-card-container');
    userDisplayElem = document.getElementById('user-display-name');

    // Register event listeners
    bindSearchEvents();
    bindFilterEvents();
    bindCardActionEvents();
    bindKeyboardShortcuts();

    // Check Firebase and Local user study state
    initUserPersonalization();
    renderContinueLearningState();
  }

  /**
   * Search Input & Clear Listeners
   */
  function bindSearchEvents() {
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      applyFiltersAndSearch();
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function () {
        clearSearch();
      });
    }

    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', function () {
        clearSearch();
        setCategoryFilter('all');
      });
    }
  }

  /**
   * Category Filter Pills
   */
  function bindFilterEvents() {
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const cat = pill.getAttribute('data-category');
        setCategoryFilter(cat);
      });
    });
  }

  function setCategoryFilter(cat) {
    currentCategory = cat || 'all';

    // Update active pill styling
    filterPills.forEach(function (pill) {
      const isMatch = pill.getAttribute('data-category') === currentCategory;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    applyFiltersAndSearch();
  }

  /**
   * Apply Search and Category Filters to Subject Cards
   */
  function applyFiltersAndSearch() {
    let visibleCount = 0;

    subjectCards.forEach(function (card) {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardSubjectId = card.getAttribute('data-subject-id') || '';
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const titleElem = card.querySelector('.subject-title');
      const descElem = card.querySelector('.subject-description');

      const titleText = titleElem ? titleElem.textContent.toLowerCase() : '';
      const descText = descElem ? descElem.textContent.toLowerCase() : '';

      // Check Category
      let matchesCategory = false;
      if (currentCategory === 'all') {
        matchesCategory = true;
      } else if (currentCategory === 'science' && (cardCategory === 'science' || cardSubjectId === 'physics' || cardSubjectId === 'chemistry' || cardSubjectId === 'biology')) {
        matchesCategory = true;
      } else if (currentCategory === 'mathematics' && (cardCategory === 'mathematics' || cardSubjectId === 'mathematics')) {
        matchesCategory = true;
      } else if (currentCategory === 'technology' && (cardCategory === 'technology' || cardSubjectId === 'computer')) {
        matchesCategory = true;
      } else if (currentCategory === 'humanities' && (cardCategory === 'humanities' || cardSubjectId === 'english' || cardSubjectId === 'pakistan-studies' || cardSubjectId === 'islamiat')) {
        matchesCategory = true;
      } else if (cardCategory === currentCategory) {
        matchesCategory = true;
      }

      // Check Search Query
      let matchesSearch = true;
      if (searchQuery.length > 0) {
        matchesSearch = (
          titleText.includes(searchQuery) ||
          descText.includes(searchQuery) ||
          keywords.includes(searchQuery) ||
          cardSubjectId.includes(searchQuery)
        );
      }

      const shouldShow = matchesCategory && matchesSearch;

      if (shouldShow) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Result Counter Badge
    if (resultsCountBadge) {
      resultsCountBadge.textContent = 'Showing ' + visibleCount + ' of ' + subjectCards.length + ' subjects';
    }

    // Toggle No Results Box
    if (noResultsBox) {
      noResultsBox.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function clearSearch() {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    if (searchClearBtn) {
      searchClearBtn.style.display = 'none';
    }
    searchQuery = '';
    applyFiltersAndSearch();
  }

  /**
   * Keyboard Navigation (Cmd/Ctrl + K, Escape)
   */
  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      // Cmd + K or Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      // Escape to clear search if active
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        clearSearch();
      }
    });
  }

  /**
   * Record Last Studied Subject on Click for "Continue Learning"
   */
  function bindCardActionEvents() {
    const actionButtons = document.querySelectorAll('.subject-cta-btn');
    actionButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const subjectName = btn.getAttribute('data-subject');
        const subjectHref = btn.getAttribute('data-href');
        const parentCard = btn.closest('.subject-card');
        const subjectId = parentCard ? parentCard.getAttribute('data-subject-id') : null;

        if (subjectName && subjectHref) {
          saveLastStudiedSubject(subjectId, subjectName, subjectHref);
        }
      });
    });
  }

  function saveLastStudiedSubject(id, name, href) {
    try {
      const stateObj = {
        id: id || 'mathematics',
        name: name,
        href: href,
        timestamp: Date.now()
      };
      localStorage.setItem('novix_last_subject', JSON.stringify(stateObj));
    } catch (err) {
      console.warn('Unable to write to localStorage', err);
    }
  }

  /**
   * Render Continue Learning Section
   */
  function renderContinueLearningState() {
    if (!continueContainer) return;

    let savedState = null;
    try {
      const raw = localStorage.getItem('novix_last_subject');
      if (raw) {
        savedState = JSON.parse(raw);
      }
    } catch (e) {
      savedState = null;
    }

    // If a subject was previously opened, render the highlighted study card
    if (savedState && savedState.name && savedState.href && SUBJECTS_DATA[savedState.id]) {
      const meta = SUBJECTS_DATA[savedState.id];
      continueContainer.innerHTML = [
        '<div class="continue-active-card" id="active-study-card">',
        '  <div class="active-subject-info">',
        '    <div class="active-subject-badge-icon ' + meta.iconClass + '">',
        '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">',
        '        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>',
        '        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
        '      </svg>',
        '    </div>',
        '    <div class="active-subject-details">',
        '      <h3>' + escapeHtml(savedState.name) + '</h3>',
        '      <p>' + escapeHtml(meta.tag) + ' &bull; Ready to resume</p>',
        '    </div>',
        '  </div>',
        '  <a href="' + escapeHtml(savedState.href) + '" class="active-resume-btn" id="btn-continue-active">',
        '    <span>Continue Learning</span>',
        '    <svg viewBox="0 0 20 20" fill="currentColor" style="width:16px;height:16px;">',
        '      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />',
        '    </svg>',
        '  </a>',
        '</div>'
      ].join('');

      // Update global hero metric if available
      const globalStatus = document.getElementById('global-study-status');
      const globalSub = document.getElementById('global-study-sub');
      if (globalStatus) globalStatus.textContent = savedState.name;
      if (globalSub) globalSub.textContent = 'Active subject';
    }
  }

  /**
   * Firebase Auth & Personalization Handler
   * Respects existing Firebase instance without re-initializing or inventing fake statistics.
   */
  function initUserPersonalization() {
    // Check if Firebase is available in global scope or window
    if (typeof window !== 'undefined' && window.firebase && window.firebase.auth) {
      try {
        window.firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            handleLoggedInUser(user);
          } else {
            handleGuestUser();
          }
        });
      } catch (err) {
        console.warn('Firebase auth listener note:', err);
        handleGuestUser();
      }
    } else {
      // Neutral guest state
      handleGuestUser();
    }
  }

  function handleLoggedInUser(user) {
    let displayName = 'Learner';
    if (user.displayName && user.displayName.trim().length > 0) {
      displayName = user.displayName.trim();
    } else if (user.email) {
      displayName = user.email.split('@')[0];
    }

    if (userDisplayElem) {
      userDisplayElem.textContent = 'Welcome back, ' + displayName;
    }

    // Check if real Firestore progress document exists
    if (window.firebase && window.firebase.firestore) {
      try {
        const db = window.firebase.firestore();
        db.collection('users').doc(user.uid).get().then(function (doc) {
          if (doc.exists) {
            const data = doc.data() || {};
            if (data.studyHours !== undefined) {
              const hoursVal = document.getElementById('stat-hours-val');
              const hoursSub = document.getElementById('stat-hours-sub');
              if (hoursVal) hoursVal.textContent = data.studyHours + ' hrs';
              if (hoursSub) hoursSub.textContent = 'Logged study time';
            }
            if (data.overallProgress !== undefined) {
              const progVal = document.getElementById('stat-progress-val');
              const progSub = document.getElementById('stat-progress-sub');
              if (progVal) progVal.textContent = data.overallProgress + '%';
              if (progSub) progSub.textContent = 'Completed modules';
            }
          }
        }).catch(function () {
          // Keep neutral state if no record
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }

  function handleGuestUser() {
    if (userDisplayElem) {
      userDisplayElem.textContent = 'Welcome back, Learner';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  // Self execute on DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHub);
  } else {
    initHub();
  }

})();
