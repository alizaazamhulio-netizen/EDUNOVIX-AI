/**
 * EduNexa AI — MDCAT Physics Subject Page Logic
 * Handles search, category filtering, localStorage progress tracking,
 * stats computation, continue learning state, and mobile navigation.
 */

(function () {
  'use strict';

  // =========================================================================
  // Constants & Chapter Metadata
  // =========================================================================
  const STORAGE_KEY = 'studymate_physics_mdcat_progress';
  const TOTAL_CHAPTERS = 14;

  const CHAPTERS_DATA = [
    { id: 1, title: 'Alternating Current', file: 'alternating-current.html', category: 'Electricity & Magnetism' },
    { id: 2, title: 'Atomic Spectra', file: 'atomic-spectra.html', category: 'Modern Physics' },
    { id: 3, title: 'Electromagnetism', file: 'electromagnetism.html', category: 'Electricity & Magnetism' },
    { id: 4, title: 'Electronics', file: 'electronics.html', category: 'Electricity & Magnetism' },
    { id: 5, title: 'Electrostatics', file: 'electrostatics.html', category: 'Electricity & Magnetism' },
    { id: 6, title: 'Fluid Dynamics', file: 'fluid-dynamics.html', category: 'Mechanics' },
    { id: 7, title: 'Force & Motion', file: 'force-motion.html', category: 'Mechanics' },
    { id: 8, title: 'Modern Physics', file: 'modern-physics.html', category: 'Modern Physics' },
    { id: 9, title: 'Nuclear Physics', file: 'nuclear-physics.html', category: 'Modern Physics' },
    { id: 10, title: 'Rotational & Circular Motion', file: 'rotational-circular-motion.html', category: 'Mechanics' },
    { id: 11, title: 'Vectors & Equilibrium', file: 'vectors-equilibrium.html', category: 'Mechanics' },
    { id: 12, title: 'Waves', file: 'waves.html', category: 'Waves' },
    { id: 13, title: 'Work & Energy', file: 'work-energy.html', category: 'Mechanics' },
    { id: 14, title: 'Support & Movement', file: 'support-movement.html', category: 'Modern Physics' }
  ];

  // =========================================================================
  // DOM Elements Cache
  // =========================================================================
  const elements = {
    // Search & Filter
    searchInput: document.getElementById('chapterSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    filterPills: document.querySelectorAll('.filter-pill'),
    searchFeedbackBar: document.getElementById('searchFeedbackBar'),
    searchResultCount: document.getElementById('searchResultCount'),
    resetSearchFilterBtn: document.getElementById('resetSearchFilterBtn'),
    chaptersGrid: document.getElementById('chaptersGrid'),
    chapterCards: document.querySelectorAll('.chapter-card'),
    noResultsState: document.getElementById('noResultsState'),
    clearSearchQueryBtn: document.getElementById('clearSearchQueryBtn'),
    searchTriggerBtn: document.getElementById('searchTriggerBtn'),

    // Hero Progress
    heroProgressPercent: document.getElementById('heroProgressPercent'),
    heroProgressBar: document.getElementById('heroProgressBar'),
    progressRingFill: document.getElementById('progressRingFill'),
    heroCompletedCount: document.getElementById('heroCompletedCount'),
    completionStatusPill: document.getElementById('completionStatusPill'),
    completionStatusText: document.getElementById('completionStatusText'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    footerResetBtn: document.getElementById('footerResetBtn'),

    // Quick Stats
    statCompletedValue: document.getElementById('statCompletedValue'),
    statCompletedSub: document.getElementById('statCompletedSub'),
    statInProgressValue: document.getElementById('statInProgressValue'),
    statRemainingValue: document.getElementById('statRemainingValue'),

    // Continue Learning
    continueTitle: document.getElementById('continueTitle'),
    continueDesc: document.getElementById('continueDesc'),
    continueBtnLink: document.getElementById('continueBtnLink'),
    continueBtnText: document.getElementById('continueBtnText'),
    btnHeroContinue: document.getElementById('btnHeroContinue'),

    // Mobile Drawer
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    drawerCloseBtn: document.getElementById('drawerCloseBtn'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    drawerProgressBar: document.getElementById('drawerProgressBar'),
    drawerProgressText: document.getElementById('drawerProgressText'),

    // Toast
    toastContainer: document.getElementById('toastContainer'),
    header: document.getElementById('mainHeader')
  };

  // State
  let activeFilter = 'all';
  let searchQuery = '';

  // =========================================================================
  // Storage Management
  // =========================================================================
  function getStoredProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { completed: [], opened: [], lastOpened: null };
      }
      const data = JSON.parse(raw);
      return {
        completed: Array.isArray(data.completed) ? data.completed : [],
        opened: Array.isArray(data.opened) ? data.opened : [],
        lastOpened: data.lastOpened || null
      };
    } catch (e) {
      console.warn('STUDYMATE: Could not access localStorage', e);
      return { completed: [], opened: [], lastOpened: null };
    }
  }

  function saveStoredProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('STUDYMATE: Could not write to localStorage', e);
    }
  }

  // =========================================================================
  // Progress & Stats UI Updates
  // =========================================================================
  function updateProgressUI() {
    const progress = getStoredProgress();
    const completedCount = progress.completed.length;
    const inProgressCount = progress.opened.filter(id => !progress.completed.includes(id)).length;
    const remainingCount = Math.max(0, TOTAL_CHAPTERS - completedCount);
    const percent = Math.round((completedCount / TOTAL_CHAPTERS) * 100);

    // 1. Update Hero Progress Ring & Bars
    if (elements.heroProgressPercent) {
      elements.heroProgressPercent.textContent = `${percent}%`;
    }
    if (elements.heroProgressBar) {
      elements.heroProgressBar.style.width = `${percent}%`;
    }
    if (elements.heroCompletedCount) {
      elements.heroCompletedCount.textContent = completedCount;
    }

    // Circular Progress Ring Offset (Circumference ~ 364.4)
    if (elements.progressRingFill) {
      const circumference = 2 * Math.PI * 58; // 364.42
      const offset = circumference - (percent / 100) * circumference;
      elements.progressRingFill.style.strokeDashoffset = offset;
    }

    // Status Pill
    if (elements.completionStatusPill && elements.completionStatusText) {
      elements.completionStatusPill.className = 'completion-pill';
      if (percent === 100) {
        elements.completionStatusPill.classList.add('completed');
        elements.completionStatusText.textContent = '100% Prepared (Ready for MDCAT)';
      } else if (percent > 0) {
        elements.completionStatusPill.classList.add('in-progress');
        elements.completionStatusText.textContent = `${percent}% Completed`;
      } else {
        elements.completionStatusText.textContent = 'Getting Started';
      }
    }

    // 2. Update Drawer Progress
    if (elements.drawerProgressText) {
      elements.drawerProgressText.textContent = `${percent}%`;
    }
    if (elements.drawerProgressBar) {
      elements.drawerProgressBar.style.width = `${percent}%`;
    }

    // 3. Update Quick Stats Section
    if (elements.statCompletedValue) {
      elements.statCompletedValue.textContent = completedCount;
    }
    if (elements.statCompletedSub) {
      elements.statCompletedSub.textContent = `${percent}% of total syllabus`;
    }
    if (elements.statInProgressValue) {
      elements.statInProgressValue.textContent = inProgressCount;
    }
    if (elements.statRemainingValue) {
      elements.statRemainingValue.textContent = remainingCount;
    }

    // 4. Update Each Chapter Card Status & Badge
    elements.chapterCards.forEach(card => {
      const chapterId = parseInt(card.getAttribute('data-id'), 10);
      const isCompleted = progress.completed.includes(chapterId);
      const isOpened = progress.opened.includes(chapterId);
      const statusBadge = card.querySelector('.chapter-status-badge');
      const checkBtn = card.querySelector('.mark-complete-btn');

      if (isCompleted) {
        card.classList.add('completed');
        if (statusBadge) {
          statusBadge.textContent = 'Completed';
          statusBadge.className = 'chapter-status-badge status-completed';
        }
        if (checkBtn) {
          checkBtn.setAttribute('title', 'Mark as Incomplete');
          checkBtn.innerHTML = `
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="check-btn-text">Completed</span>
          `;
        }
      } else {
        card.classList.remove('completed');
        if (isOpened) {
          if (statusBadge) {
            statusBadge.textContent = 'In Progress';
            statusBadge.className = 'chapter-status-badge status-inprogress';
          }
        } else {
          if (statusBadge) {
            statusBadge.textContent = 'Not Started';
            statusBadge.className = 'chapter-status-badge status-unstarted';
          }
        }
        if (checkBtn) {
          checkBtn.setAttribute('title', 'Mark as Completed');
          checkBtn.innerHTML = `
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="check-btn-text">Done</span>
          `;
        }
      }
    });

    // 5. Update Continue Learning Card
    updateContinueLearningUI(progress);
  }

  // =========================================================================
  // Continue Learning Section State
  // =========================================================================
  function updateContinueLearningUI(progress) {
    if (!elements.continueTitle || !elements.continueBtnLink) return;

    if (progress.lastOpened && progress.lastOpened.title && progress.lastOpened.file) {
      elements.continueTitle.textContent = `Continue: ${progress.lastOpened.title}`;
      elements.continueDesc.textContent = `Resume your review where you last left off in MDCAT Physics.`;
      elements.continueBtnLink.href = progress.lastOpened.file;
      if (elements.continueBtnText) {
        elements.continueBtnText.textContent = 'Continue Chapter →';
      }
      if (elements.btnHeroContinue) {
        elements.btnHeroContinue.href = progress.lastOpened.file;
      }
    } else {
      elements.continueTitle.textContent = 'Start with any chapter above.';
      elements.continueDesc.textContent = 'Choose any of the 14 high-yield MDCAT Physics chapters below to begin your revision.';
      elements.continueBtnLink.href = 'force-motion.html';
      if (elements.continueBtnText) {
        elements.continueBtnText.textContent = 'Start Learning →';
      }
      if (elements.btnHeroContinue) {
        elements.btnHeroContinue.href = '#chapters';
      }
    }
  }

  // =========================================================================
  // Chapter Click & Completed Toggle Handlers
  // =========================================================================
  function handleMarkComplete(chapterId) {
    const progress = getStoredProgress();
    const index = progress.completed.indexOf(chapterId);
    const chapter = CHAPTERS_DATA.find(c => c.id === chapterId);
    const chapterName = chapter ? chapter.title : `Chapter ${chapterId}`;

    if (index > -1) {
      // Unmark completed
      progress.completed.splice(index, 1);
      showToast(`Marked "${chapterName}" as in progress`, 'info');
    } else {
      // Mark as completed
      progress.completed.push(chapterId);
      if (!progress.opened.includes(chapterId)) {
        progress.opened.push(chapterId);
      }
      showToast(`🎉 "${chapterName}" marked as completed!`, 'success');
    }

    saveStoredProgress(progress);
    updateProgressUI();
  }

  function handleChapterLinkClick(e) {
    const link = e.currentTarget;
    const chapterId = parseInt(link.getAttribute('data-chapter-id'), 10);
    const chapterTitle = link.getAttribute('data-chapter-title');
    const chapterFile = link.getAttribute('data-chapter-file');

    if (!chapterId || !chapterFile) return;

    const progress = getStoredProgress();
    if (!progress.opened.includes(chapterId)) {
      progress.opened.push(chapterId);
    }
    progress.lastOpened = {
      id: chapterId,
      title: chapterTitle || `Chapter ${chapterId}`,
      file: chapterFile,
      timestamp: Date.now()
    };
    saveStoredProgress(progress);
  }

  function resetAllProgress() {
    if (confirm('Are you sure you want to reset your Physics MDCAT progress? This will clear all completed chapter marks.')) {
      localStorage.removeItem(STORAGE_KEY);
      updateProgressUI();
      showToast('Physics progress has been reset', 'info');
    }
  }

  // =========================================================================
  // Search & Category Filtering
  // =========================================================================
  function filterChapters() {
    const query = searchQuery.trim().toLowerCase();
    let visibleCount = 0;

    elements.chapterCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.chapter-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.chapter-desc')?.textContent.toLowerCase() || '';
      const keywords = card.getAttribute('data-keywords') || '';
      const fullText = `${title} ${desc} ${keywords}`.toLowerCase();

      // Category matching
      const matchesCategory = (activeFilter === 'all') || (category === activeFilter);

      // Search query matching
      let matchesSearch = true;
      if (query.length > 0) {
        // Special synonyms/alias matching
        if (query === 'electric' || query === 'electricity') {
          matchesSearch = category === 'Electricity & Magnetism' || fullText.includes('electric') || fullText.includes('electro');
        } else {
          matchesSearch = fullText.includes(query);
        }
      }

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Empty state handling
    if (visibleCount === 0) {
      if (elements.noResultsState) elements.noResultsState.style.display = 'block';
      if (elements.chaptersGrid) elements.chaptersGrid.style.display = 'none';
    } else {
      if (elements.noResultsState) elements.noResultsState.style.display = 'none';
      if (elements.chaptersGrid) elements.chaptersGrid.style.display = 'grid';
    }

    // Feedback bar
    if (elements.searchFeedbackBar && elements.searchResultCount) {
      if (query.length > 0 || activeFilter !== 'all') {
        elements.searchFeedbackBar.style.display = 'flex';
        const filterName = activeFilter === 'all' ? '' : ` in ${activeFilter}`;
        elements.searchResultCount.textContent = `Showing ${visibleCount} of ${TOTAL_CHAPTERS} chapters${filterName}${query ? ` for "${query}"` : ''}`;
      } else {
        elements.searchFeedbackBar.style.display = 'none';
      }
    }

    // Clear search button visibility
    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }
  }

  function setupSearchAndFilters() {
    // Search input typing
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterChapters();
      });
    }

    // Clear search button
    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        if (elements.searchInput) {
          elements.searchInput.value = '';
          searchQuery = '';
          filterChapters();
          elements.searchInput.focus();
        }
      });
    }

    // Reset from no-results button
    if (elements.clearSearchQueryBtn) {
      elements.clearSearchQueryBtn.addEventListener('click', () => {
        if (elements.searchInput) elements.searchInput.value = '';
        searchQuery = '';
        activeFilter = 'all';
        updateFilterPills();
        filterChapters();
      });
    }

    // Reset from feedback bar
    if (elements.resetSearchFilterBtn) {
      elements.resetSearchFilterBtn.addEventListener('click', () => {
        if (elements.searchInput) elements.searchInput.value = '';
        searchQuery = '';
        activeFilter = 'all';
        updateFilterPills();
        filterChapters();
      });
    }

    // Category pills click
    elements.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        activeFilter = pill.getAttribute('data-filter');
        updateFilterPills();
        filterChapters();
      });
    });

    // Quick search trigger in header
    if (elements.searchTriggerBtn) {
      elements.searchTriggerBtn.addEventListener('click', () => {
        if (elements.searchInput) {
          elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => elements.searchInput.focus(), 300);
        }
      });
    }
  }

  function updateFilterPills() {
    elements.filterPills.forEach(pill => {
      const filter = pill.getAttribute('data-filter');
      const isActive = filter === activeFilter;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // =========================================================================
  // Toast Notification System
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'success') {
      toast.style.borderLeftColor = 'var(--success)';
    }

    toast.innerHTML = `
      <span>${message}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // =========================================================================
  // Mobile Drawer Navigation
  // =========================================================================
  function setupMobileDrawer() {
    function openDrawer() {
      if (elements.mobileDrawer && elements.drawerOverlay) {
        elements.mobileDrawer.classList.add('open');
        elements.drawerOverlay.classList.add('open');
        elements.mobileDrawer.setAttribute('aria-hidden', 'false');
        if (elements.mobileMenuToggle) {
          elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
      }
    }

    function closeDrawer() {
      if (elements.mobileDrawer && elements.drawerOverlay) {
        elements.mobileDrawer.classList.remove('open');
        elements.drawerOverlay.classList.remove('open');
        elements.mobileDrawer.setAttribute('aria-hidden', 'true');
        if (elements.mobileMenuToggle) {
          elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }

    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.addEventListener('click', openDrawer);
    }
    if (elements.drawerCloseBtn) {
      elements.drawerCloseBtn.addEventListener('click', closeDrawer);
    }
    if (elements.drawerOverlay) {
      elements.drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer on clicking links
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // =========================================================================
  // Keyboard Shortcuts & Header Scroll
  // =========================================================================
  function setupGlobalListeners() {
    // Press '/' to search, 'Esc' to clear/close
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== elements.searchInput) {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elements.searchInput.focus();
        }
      } else if (e.key === 'Escape') {
        if (elements.mobileDrawer?.classList.contains('open')) {
          elements.mobileDrawer.classList.remove('open');
          elements.drawerOverlay?.classList.remove('open');
        } else if (elements.searchInput && document.activeElement === elements.searchInput) {
          elements.searchInput.value = '';
          searchQuery = '';
          filterChapters();
          elements.searchInput.blur();
        }
      }
    });

    // Header scroll elevation
    window.addEventListener('scroll', () => {
      if (elements.header) {
        if (window.scrollY > 20) {
          elements.header.classList.add('scrolled');
        } else {
          elements.header.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // Mark complete button clicks
    const markButtons = document.querySelectorAll('.mark-complete-btn');
    markButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const chapterId = parseInt(btn.getAttribute('data-chapter-id'), 10);
        if (chapterId) {
          handleMarkComplete(chapterId);
        }
      });
    });

    // Chapter link click tracking
    const chapterLinks = document.querySelectorAll('.btn-open-chapter');
    chapterLinks.forEach(link => {
      link.addEventListener('click', handleChapterLinkClick);
    });

    // Reset progress buttons
    if (elements.resetProgressBtn) {
      elements.resetProgressBtn.addEventListener('click', resetAllProgress);
    }
    if (elements.footerResetBtn) {
      elements.footerResetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetAllProgress();
      });
    }
  }

  // =========================================================================
  // App Initialization
  // =========================================================================
  function init() {
    setupSearchAndFilters();
    setupMobileDrawer();
    setupGlobalListeners();
    updateProgressUI();
    filterChapters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
