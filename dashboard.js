/**
 * @license
 * EduNexa AI — Core Dashboard Engine (dashboard.js)
 * Production-ready modular JavaScript handling local study utilities,
 * navigation, calendar, calculator, stopwatch, timer, tasks, notes, and metrics.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. LOCAL STORAGE KEYS & DEFAULT STATE
     ========================================================================== */
  const STORAGE_KEYS = {
    STUDENT_NAME: 'studymate_student_name',
    SETTINGS: 'studymate_settings',
    STATS: 'studymate_stats',
    TODOS: 'studymate_todos',
    NOTES: 'studymate_notes',
    ACTIVITY: 'studymate_activity',
    GRADE_PROGRESS: 'studymate_grade_progress',
  };

  // Safe localStorage helper
  const storage = {
    get(key, fallback = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn('LocalStorage get error for key:', key, e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage set error for key:', key, e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('LocalStorage remove error for key:', key, e);
      }
    }
  };

  /* ==========================================================================
     2. APP STATE
     ========================================================================== */
  const state = {
    studentName: storage.get(STORAGE_KEYS.STUDENT_NAME, 'Alex'),
    settings: storage.get(STORAGE_KEYS.SETTINGS, {
      soundEnabled: true,
      clock24h: true,
    }),
    stats: storage.get(STORAGE_KEYS.STATS, {
      studySessions: 0,
      tasksCompleted: 0,
      notesSaved: 0,
    }),
    todos: storage.get(STORAGE_KEYS.TODOS, []),
    note: storage.get(STORAGE_KEYS.NOTES, { title: '', content: '', lastSaved: null }),
    activities: storage.get(STORAGE_KEYS.ACTIVITY, []),
    todoFilter: 'all', // 'all' | 'active' | 'completed'
  };

  /* ==========================================================================
     3. AUDIO SYNTHESIZER (WEB AUDIO API — NO EXTERNAL AUDIO FILES NEEDED)
     ========================================================================== */
  const audioService = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    playChime() {
      if (!state.settings.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }

        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(880, now);
        osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.3); // D6

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.8);
        osc2.stop(now + 0.8);
      } catch (err) {
        console.warn('Audio chime playback error:', err);
      }
    }
  };

  /* ==========================================================================
     4. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const iconSvg = type === 'success' 
      ? `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  /* ==========================================================================
     5. RECENT ACTIVITY LOGGER
     ========================================================================== */
  function logActivity(text) {
    const now = new Date();
    const newActivity = {
      id: 'act_' + Date.now(),
      text,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString(),
      timestamp: Date.now()
    };

    state.activities.unshift(newActivity);
    if (state.activities.length > 20) {
      state.activities = state.activities.slice(0, 20);
    }
    storage.set(STORAGE_KEYS.ACTIVITY, state.activities);
    renderActivityList();
  }

  function renderActivityList() {
    const container = document.getElementById('activity-list-container');
    const emptyState = document.getElementById('activity-empty-state');
    if (!container) return;

    if (state.activities.length === 0) {
      container.innerHTML = `
        <div class="activity-empty-state" id="activity-empty-state">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.5" fill="none">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 14 14"></polyline>
          </svg>
          <p>No recent activity yet.</p>
          <span>Your grade explorations, study sessions, and notes will be tracked here locally.</span>
        </div>
      `;
      return;
    }

    const itemsHtml = state.activities.slice(0, 6).map(act => `
      <div class="activity-item">
        <div class="activity-left">
          <span class="activity-badge"></span>
          <span class="activity-title">${escapeHtml(act.text)}</span>
        </div>
        <span class="activity-time">${act.time}</span>
      </div>
    `).join('');

    container.innerHTML = itemsHtml;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  /* ==========================================================================
     6. STATISTICS DISPLAY
     ========================================================================== */
  function renderStats() {
    const elGrades = document.getElementById('stat-grades-val');
    const elSessions = document.getElementById('stat-sessions-val');
    const elTasks = document.getElementById('stat-tasks-val');
    const elNotes = document.getElementById('stat-notes-val');

    if (elGrades) elGrades.textContent = '10';
    if (elSessions) elSessions.textContent = state.stats.studySessions.toString();
    if (elTasks) elTasks.textContent = state.stats.tasksCompleted.toString();
    if (elNotes) elNotes.textContent = state.stats.notesSaved.toString();
  }

  function incrementStat(key) {
    if (key in state.stats) {
      state.stats[key]++;
      storage.set(STORAGE_KEYS.STATS, state.stats);
      renderStats();
    }
  }

  /* ==========================================================================
     7. DIGITAL CLOCK & GREETING
     ========================================================================== */
  function initClockAndGreeting() {
    const greetingEl = document.getElementById('live-time-greeting');
    const heroClockEl = document.getElementById('hero-live-clock');
    const heroDateEl = document.getElementById('hero-live-date');
    const heroTzEl = document.getElementById('hero-tz-name');
    const heroClockFormatEl = document.getElementById('hero-clock-format');

    // Timezone label
    if (heroTzEl) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        heroTzEl.textContent = tz || 'Local Time';
      } catch (e) {
        heroTzEl.textContent = 'Local Time';
      }
    }

    function updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const is24h = state.settings.clock24h;

      // Greeting logic
      let greeting = 'Good evening';
      if (hours >= 5 && hours < 12) {
        greeting = 'Good morning';
      } else if (hours >= 12 && hours < 17) {
        greeting = 'Good afternoon';
      }

      const displayName = state.studentName ? `, ${state.studentName}` : '';
      if (greetingEl) {
        greetingEl.textContent = `${greeting}${displayName}`;
      }

      // Time string format
      let timeString;
      if (is24h) {
        const hh = String(hours).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        timeString = `${hh}:${mm}:${ss}`;
      } else {
        timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      }

      if (heroClockEl) heroClockEl.textContent = timeString;
      if (heroClockFormatEl) heroClockFormatEl.textContent = is24h ? '24H' : '12H';

      // Date string format: "Monday, October 24, 2026"
      if (heroDateEl) {
        const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
        heroDateEl.textContent = now.toLocaleDateString(undefined, options);
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ==========================================================================
     8. SIDEBAR & MOBILE NAVIGATION
     ========================================================================== */
  function initNavigation() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function openSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.add('active');
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeSidebar);

    // Sidebar navigation buttons
    const navCalc = document.getElementById('nav-calculator');
    if (navCalc) {
      navCalc.addEventListener('click', () => {
        closeSidebar();
        openCalculatorModal();
      });
    }

    const navCal = document.getElementById('nav-calendar');
    if (navCal) {
      navCal.addEventListener('click', () => {
        closeSidebar();
        const calSection = document.getElementById('tool-calendar');
        if (calSection) calSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const navFocus = document.getElementById('nav-focus-mode');
    if (navFocus) {
      navFocus.addEventListener('click', () => {
        closeSidebar();
        enterFocusMode();
      });
    }

    const navSettings = document.getElementById('nav-settings-btn');
    if (navSettings) {
      navSettings.addEventListener('click', () => {
        closeSidebar();
        openSettingsModal();
      });
    }

    const headerFocus = document.getElementById('header-focus-btn');
    if (headerFocus) {
      headerFocus.addEventListener('click', enterFocusMode);
    }

    // Profile & Notifications dropdowns
    initHeaderDropdowns();
  }

  function initHeaderDropdowns() {
    const notifBtn = document.getElementById('notifications-btn');
    const notifDropdown = document.getElementById('notifications-dropdown');
    const notifBadge = document.getElementById('notif-badge');
    const clearNotifsBtn = document.getElementById('clear-notifs-btn');

    const profileBtn = document.getElementById('profile-pill-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const menuOpenSettings = document.getElementById('menu-open-settings');
    const footerSettings = document.getElementById('footer-settings-btn');

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.style.display === 'block';
        closeAllDropdowns();
        notifDropdown.style.display = isOpen ? 'none' : 'block';
        if (notifBadge) notifBadge.style.display = 'none';
      });
    }

    if (clearNotifsBtn) {
      clearNotifsBtn.addEventListener('click', () => {
        const notifList = document.getElementById('notifications-list');
        if (notifList) {
          notifList.innerHTML = '<p class="dropdown-empty-state">No new notifications.</p>';
        }
      });
    }

    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.style.display === 'block';
        closeAllDropdowns();
        profileDropdown.style.display = isOpen ? 'none' : 'block';
      });
    }

    if (menuOpenSettings) {
      menuOpenSettings.addEventListener('click', () => {
        closeAllDropdowns();
        openSettingsModal();
      });
    }

    if (footerSettings) {
      footerSettings.addEventListener('click', openSettingsModal);
    }

    document.addEventListener('click', () => {
      closeAllDropdowns();
    });
  }

  function closeAllDropdowns() {
    const notifDropdown = document.getElementById('notifications-dropdown');
    const profileDropdown = document.getElementById('profile-dropdown');
    const searchDropdown = document.getElementById('search-results-dropdown');

    if (notifDropdown) notifDropdown.style.display = 'none';
    if (profileDropdown) profileDropdown.style.display = 'none';
    if (searchDropdown) searchDropdown.style.display = 'none';
  }

  /* ==========================================================================
     9. SEARCH SYSTEM
     ========================================================================== */
  function initSearch() {
    const searchInput = document.getElementById('dashboard-search-input');
    const searchDropdown = document.getElementById('search-results-dropdown');
    const searchList = document.getElementById('search-results-list');
    const clearBtn = document.getElementById('search-clear-btn');

    if (!searchInput || !searchDropdown || !searchList) return;

    // Searchable platform index
    const searchIndex = [
      { title: 'Grade 1 Curriculum', category: 'Grades', target: 'grade1.html', desc: 'Primary 1 Foundational Math & Reading' },
      { title: 'Grade 2 Curriculum', category: 'Grades', target: 'grade2.html', desc: 'Primary 2 Addition & Discovery Science' },
      { title: 'Grade 3 Curriculum', category: 'Grades', target: 'grade3.html', desc: 'Primary 3 Multiplication & Grammar' },
      { title: 'Grade 4 Curriculum', category: 'Grades', target: 'grade4.html', desc: 'Primary 4 Fractions & Earth Systems' },
      { title: 'Grade 5 Curriculum', category: 'Grades', target: 'grade5.html', desc: 'Primary 5 Pre-Algebra & Geography' },
      { title: 'Grade 6 Curriculum', category: 'Grades', target: 'grade6.html', desc: 'Middle School Ratios & Earth Science' },
      { title: 'Grade 7 Curriculum', category: 'Grades', target: 'grade7.html', desc: 'Middle School Pre-Algebra & Biology' },
      { title: 'Grade 8 Curriculum', category: 'Grades', target: 'grade8.html', desc: 'Middle School Linear Equations & Physics' },
      { title: 'Grade 9 Curriculum', category: 'Grades', target: 'grade9.html', desc: 'High School Algebra 1 & Biology' },
      { title: 'Grade 10 Curriculum', category: 'Grades', target: 'grade10.html', desc: 'High School Geometry & Chemistry' },
      { title: 'EduNexa AI Assistant', category: 'AI', target: 'ai-assistant.html', desc: 'Ask questions, solve problems & study support' },
      { title: 'Scientific Calculator', category: 'Tools', action: 'calculator', desc: 'Arithmetic, percentage, and decimals' },
      { title: 'Pomodoro Study Timer', category: 'Tools', action: 'timer', desc: '25m Focus & Break sessions' },
      { title: 'To-Do Task Manager', category: 'Tools', action: 'todo', desc: 'Add and organize homework tasks' },
      { title: 'Study Notes Scratchpad', category: 'Tools', action: 'notes', desc: 'Local browser notes storage' },
      { title: 'Precision Stopwatch', category: 'Tools', action: 'stopwatch', desc: 'Measure exercise & test times' },
      { title: 'Interactive Calendar', category: 'Tools', action: 'calendar', desc: 'Monthly study calendar' },
      { title: 'Focus Mode', category: 'Tools', action: 'focus', desc: 'Distraction-free study workspace' },
    ];

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

      if (!query) {
        searchDropdown.style.display = 'none';
        return;
      }

      const results = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        searchList.innerHTML = `<div style="padding: 0.75rem; font-size: 0.8125rem; color: var(--text-muted); text-align: center;">No matches found for "${escapeHtml(query)}"</div>`;
      } else {
        searchList.innerHTML = results.map(item => `
          <div class="search-result-item" data-target="${item.target || ''}" data-action="${item.action || ''}">
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.875rem;">${escapeHtml(item.title)}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(item.desc)}</div>
            </div>
            <span class="search-result-badge">${item.category}</span>
          </div>
        `).join('');

        // Attach click handlers to search items
        searchList.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('click', () => {
            const target = el.getAttribute('data-target');
            const action = el.getAttribute('data-action');
            searchDropdown.style.display = 'none';
            searchInput.value = '';
            if (clearBtn) clearBtn.style.display = 'none';

            if (target) {
              window.location.href = target;
            } else if (action === 'calculator') {
              openCalculatorModal();
            } else if (action === 'focus') {
              enterFocusMode();
            } else if (action) {
              const toolEl = document.getElementById(`tool-${action}`);
              if (toolEl) toolEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      }

      searchDropdown.style.display = 'block';
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchDropdown.style.display = 'none';
        searchInput.focus();
      });
    }

    // Keyboard shortcut '/' to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === 'Escape' && searchDropdown.style.display === 'block') {
        searchDropdown.style.display = 'none';
      }
    });
  }

  /* ==========================================================================
     10. GRADE CARDS & FILTERING
     ========================================================================== */
  function initGradeSection() {
    const filterButtons = document.querySelectorAll('.grade-filter-btn');
    const gradeCards = document.querySelectorAll('.grade-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        gradeCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Track grade opening
    document.querySelectorAll('.btn-open-grade').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gradeNum = btn.getAttribute('data-grade-target');
        logActivity(`Opened Grade ${gradeNum} Learning Space`);
      });
    });
  }

  /* ==========================================================================
     11. POMODORO STUDY TIMER
     ========================================================================== */
  const studyTimer = {
    mode: 'study', // 'study' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
    durations: {
      study: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    },
    timeLeft: 25 * 60,
    totalTime: 25 * 60,
    interval: null,
    isRunning: false,

    init() {
      const modeButtons = document.querySelectorAll('.timer-mode-btn');
      const toggleBtn = document.getElementById('timer-toggle-btn');
      const resetBtn = document.getElementById('timer-reset-btn');

      modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          modeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mode = btn.getAttribute('data-mode');
          this.setMode(mode);
        });
      });

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          if (this.isRunning) {
            this.pause();
          } else {
            this.start();
          }
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.reset();
        });
      }

      this.updateDisplay();
    },

    setMode(mode) {
      this.pause();
      this.mode = mode;
      this.totalTime = this.durations[mode] || 25 * 60;
      this.timeLeft = this.totalTime;

      const labelEl = document.getElementById('timer-mode-label');
      if (labelEl) {
        if (mode === 'study') labelEl.textContent = 'Pomodoro Study Session';
        else if (mode === 'shortBreak') labelEl.textContent = 'Quick 5m Rest';
        else if (mode === 'longBreak') labelEl.textContent = 'Relaxing 15m Break';
      }

      this.updateDisplay();
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;

      const toggleText = document.getElementById('timer-toggle-text');
      const statusIndicator = document.getElementById('timer-status-indicator');
      const playIcon = document.getElementById('timer-play-icon');

      if (toggleText) toggleText.textContent = 'Pause Session';
      if (statusIndicator) statusIndicator.textContent = 'Running';
      if (playIcon) {
        playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      }

      // Sync focus mode controls if active
      const focusToggle = document.getElementById('focus-timer-toggle-btn');
      if (focusToggle) focusToggle.textContent = 'Pause';

      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.updateDisplay();
        } else {
          this.complete();
        }
      }, 1000);
    },

    pause() {
      this.isRunning = false;
      clearInterval(this.interval);

      const toggleText = document.getElementById('timer-toggle-text');
      const statusIndicator = document.getElementById('timer-status-indicator');
      const playIcon = document.getElementById('timer-play-icon');

      if (toggleText) toggleText.textContent = 'Resume Session';
      if (statusIndicator) statusIndicator.textContent = 'Paused';
      if (playIcon) {
        playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      }

      const focusToggle = document.getElementById('focus-timer-toggle-btn');
      if (focusToggle) focusToggle.textContent = 'Resume';
    },

    reset() {
      this.pause();
      this.timeLeft = this.totalTime;
      const toggleText = document.getElementById('timer-toggle-text');
      const statusIndicator = document.getElementById('timer-status-indicator');

      if (toggleText) toggleText.textContent = 'Start Session';
      if (statusIndicator) statusIndicator.textContent = 'Ready';

      this.updateDisplay();
    },

    complete() {
      this.pause();
      audioService.playChime();

      if (this.mode === 'study') {
        incrementStat('studySessions');
        logActivity('Completed a 25-minute Study Session');
        showToast('Study Session Complete! Take a well-deserved break.', 'success');
      } else {
        showToast('Break Finished! Ready to start studying?', 'info');
      }

      this.reset();
    },

    updateDisplay() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const digitsEl = document.getElementById('timer-display-digits');
      const focusDigitsEl = document.getElementById('focus-timer-display');
      const progressEl = document.getElementById('timer-svg-progress');

      if (digitsEl) digitsEl.textContent = timeFormatted;
      if (focusDigitsEl) focusDigitsEl.textContent = timeFormatted;

      // Update SVG circular stroke offset (circumference = 2 * PI * 70 ≈ 440)
      if (progressEl) {
        const circumference = 440;
        const progress = this.timeLeft / this.totalTime;
        const offset = circumference * (1 - progress);
        progressEl.style.strokeDashoffset = offset;
      }
    }
  };

  /* ==========================================================================
     12. TO-DO LIST TASK MANAGER
     ========================================================================== */
  function initTodoList() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const countLabel = document.getElementById('todo-count-label');
    const clearDoneBtn = document.getElementById('todo-clear-completed-btn');
    const filterButtons = document.querySelectorAll('.todo-filter');

    function saveAndRender() {
      storage.set(STORAGE_KEYS.TODOS, state.todos);
      renderTodos();
    }

    function renderTodos() {
      if (!todoList) return;

      const filtered = state.todos.filter(task => {
        if (state.todoFilter === 'active') return !task.completed;
        if (state.todoFilter === 'completed') return task.completed;
        return true;
      });

      const pendingCount = state.todos.filter(t => !t.completed).length;
      if (countLabel) {
        countLabel.textContent = `${pendingCount} ${pendingCount === 1 ? 'task' : 'tasks'} remaining`;
      }

      // Update focus mode active goal preview
      const focusGoal = document.getElementById('focus-current-goal');
      if (focusGoal) {
        const firstActive = state.todos.find(t => !t.completed);
        focusGoal.textContent = firstActive ? firstActive.text : 'All tasks completed! Fantastic work.';
      }

      if (filtered.length === 0) {
        todoList.innerHTML = `<p class="todo-empty-txt">${state.todos.length === 0 ? 'No tasks yet. Add a study goal above!' : 'No tasks in this view.'}</p>`;
        return;
      }

      todoList.innerHTML = filtered.map(task => `
        <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          <div class="todo-item-left">
            <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task completion">
            <span class="todo-text">${escapeHtml(task.text)}</span>
          </div>
          <button class="todo-delete-btn" aria-label="Delete task">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `).join('');

      // Attach item events
      todoList.querySelectorAll('.todo-item').forEach(itemEl => {
        const id = itemEl.getAttribute('data-id');
        const checkbox = itemEl.querySelector('.todo-checkbox');
        const deleteBtn = itemEl.querySelector('.todo-delete-btn');

        if (checkbox) {
          checkbox.addEventListener('change', () => {
            const task = state.todos.find(t => t.id === id);
            if (task) {
              task.completed = checkbox.checked;
              if (task.completed) {
                incrementStat('tasksCompleted');
                logActivity(`Completed task: "${task.text.substring(0, 24)}..."`);
                showToast('Task completed!', 'success');
              }
              saveAndRender();
            }
          });
        }

        if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.todos = state.todos.filter(t => t.id !== id);
            saveAndRender();
            showToast('Task deleted', 'info');
          });
        }
      });
    }

    if (todoForm) {
      todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;

        const newTask = {
          id: 'task_' + Date.now(),
          text,
          completed: false,
          createdAt: Date.now()
        };

        state.todos.unshift(newTask);
        todoInput.value = '';
        saveAndRender();
        logActivity(`Added new study task`);
        showToast('Task added to your list', 'success');
      });
    }

    if (clearDoneBtn) {
      clearDoneBtn.addEventListener('click', () => {
        const initialLen = state.todos.length;
        state.todos = state.todos.filter(t => !t.completed);
        if (state.todos.length !== initialLen) {
          saveAndRender();
          showToast('Completed tasks cleared', 'info');
        }
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.todoFilter = btn.getAttribute('data-filter');
        renderTodos();
      });
    });

    renderTodos();
  }

  /* ==========================================================================
     13. NOTES SCRATCHPAD
     ========================================================================== */
  function initNotes() {
    const titleInput = document.getElementById('note-title-input');
    const textarea = document.getElementById('notes-textarea');
    const saveBtn = document.getElementById('notes-save-btn');
    const clearBtn = document.getElementById('notes-clear-btn');
    const charCount = document.getElementById('notes-char-count');
    const lastSaved = document.getElementById('notes-last-saved');

    // Populate initial state
    if (state.note) {
      if (titleInput) titleInput.value = state.note.title || '';
      if (textarea) textarea.value = state.note.content || '';
      if (lastSaved && state.note.lastSaved) {
        lastSaved.textContent = `Last saved: ${state.note.lastSaved}`;
      }
    }

    function updateMeta() {
      if (textarea && charCount) {
        const len = textarea.value.length;
        charCount.textContent = `${len} ${len === 1 ? 'character' : 'characters'}`;
      }
    }

    if (textarea) {
      textarea.addEventListener('input', updateMeta);
      updateMeta();
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const title = titleInput ? titleInput.value.trim() : '';
        const content = textarea ? textarea.value.trim() : '';

        if (!title && !content) {
          showToast('Cannot save an empty note', 'info');
          return;
        }

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        state.note = {
          title,
          content,
          lastSaved: now
        };

        storage.set(STORAGE_KEYS.NOTES, state.note);
        incrementStat('notesSaved');
        logActivity(`Saved study note: "${title || 'Untitled Note'}"`);

        if (lastSaved) lastSaved.textContent = `Last saved at ${now}`;
        showToast('Notes saved successfully', 'success');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your current notes?')) {
          if (titleInput) titleInput.value = '';
          if (textarea) textarea.value = '';
          state.note = { title: '', content: '', lastSaved: null };
          storage.remove(STORAGE_KEYS.NOTES);
          updateMeta();
          if (lastSaved) lastSaved.textContent = 'Cleared';
          showToast('Notes cleared', 'info');
        }
      });
    }
  }

  /* ==========================================================================
     14. STOPWATCH
     ========================================================================== */
  const stopwatch = {
    startTime: 0,
    elapsed: 0,
    timerId: null,
    isRunning: false,
    laps: [],

    init() {
      const toggleBtn = document.getElementById('stopwatch-toggle-btn');
      const lapBtn = document.getElementById('stopwatch-lap-btn');
      const resetBtn = document.getElementById('stopwatch-reset-btn');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          if (this.isRunning) {
            this.pause();
          } else {
            this.start();
          }
        });
      }

      if (lapBtn) {
        lapBtn.addEventListener('click', () => {
          this.recordLap();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.reset();
        });
      }

      this.updateDisplay();
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.startTime = performance.now() - this.elapsed;

      const toggleText = document.getElementById('stopwatch-toggle-text');
      const lapBtn = document.getElementById('stopwatch-lap-btn');
      const playIcon = document.getElementById('stopwatch-play-icon');

      if (toggleText) toggleText.textContent = 'Pause';
      if (lapBtn) lapBtn.disabled = false;
      if (playIcon) {
        playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      }

      this.timerId = requestAnimationFrame(this.tick.bind(this));
    },

    tick(now) {
      if (!this.isRunning) return;
      this.elapsed = now - this.startTime;
      this.updateDisplay();
      this.timerId = requestAnimationFrame(this.tick.bind(this));
    },

    pause() {
      this.isRunning = false;
      cancelAnimationFrame(this.timerId);

      const toggleText = document.getElementById('stopwatch-toggle-text');
      const playIcon = document.getElementById('stopwatch-play-icon');

      if (toggleText) toggleText.textContent = 'Resume';
      if (playIcon) {
        playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      }
    },

    reset() {
      this.pause();
      this.elapsed = 0;
      this.laps = [];

      const toggleText = document.getElementById('stopwatch-toggle-text');
      const lapBtn = document.getElementById('stopwatch-lap-btn');
      const lapsContainer = document.getElementById('stopwatch-laps');

      if (toggleText) toggleText.textContent = 'Start';
      if (lapBtn) lapBtn.disabled = true;
      if (lapsContainer) {
        lapsContainer.innerHTML = '';
        lapsContainer.style.display = 'none';
      }

      this.updateDisplay();
    },

    recordLap() {
      if (!this.isRunning) return;
      const lapTime = this.formatTime(this.elapsed);
      this.laps.unshift({ num: this.laps.length + 1, time: lapTime.main + lapTime.ms });

      const lapsContainer = document.getElementById('stopwatch-laps');
      if (lapsContainer) {
        lapsContainer.style.display = 'flex';
        lapsContainer.innerHTML = this.laps.slice(0, 5).map(lap => `
          <div class="lap-row">
            <span>Lap ${lap.num}</span>
            <strong>${lap.time}</strong>
          </div>
        `).join('');
      }
    },

    formatTime(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const hundredths = Math.floor((ms % 1000) / 10);

      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      const msStr = `.${String(hundredths).padStart(2, '0')}`;

      return {
        main: `${hh}:${mm}:${ss}`,
        ms: msStr
      };
    },

    updateDisplay() {
      const formatted = this.formatTime(this.elapsed);
      const displayEl = document.getElementById('stopwatch-display');
      const msEl = document.getElementById('stopwatch-ms');

      if (displayEl) displayEl.textContent = formatted.main;
      if (msEl) msEl.textContent = formatted.ms;
    }
  };

  /* ==========================================================================
     15. LOCAL INTERACTIVE CALENDAR
     ========================================================================== */
  const calendarWidget = {
    currentDate: new Date(),
    viewDate: new Date(),
    selectedDate: new Date(),

    init() {
      const prevBtn = document.getElementById('cal-prev-btn');
      const nextBtn = document.getElementById('cal-next-btn');
      const todayBtn = document.getElementById('cal-today-btn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.viewDate.setMonth(this.viewDate.getMonth() - 1);
          this.render();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.viewDate.setMonth(this.viewDate.getMonth() + 1);
          this.render();
        });
      }

      if (todayBtn) {
        todayBtn.addEventListener('click', () => {
          this.viewDate = new Date();
          this.selectedDate = new Date();
          this.render();
        });
      }

      this.render();
    },

    render() {
      const titleEl = document.getElementById('cal-month-year-title');
      const gridEl = document.getElementById('calendar-days-grid');
      const selectedTxt = document.getElementById('cal-selected-date-txt');

      const year = this.viewDate.getFullYear();
      const month = this.viewDate.getMonth();

      // Month name
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      if (titleEl) titleEl.textContent = `${monthNames[month]} ${year}`;

      if (!gridEl) return;

      const firstDayIndex = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      let daysHtml = '';

      // Blank slots before first day
      for (let i = 0; i < firstDayIndex; i++) {
        daysHtml += `<div class="cal-day empty"></div>`;
      }

      // Day slots
      const today = new Date();
      for (let day = 1; day <= totalDays; day++) {
        const isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        const isSelected = (day === this.selectedDate.getDate() && month === this.selectedDate.getMonth() && year === this.selectedDate.getFullYear());

        let classNames = 'cal-day';
        if (isToday) classNames += ' today';
        if (isSelected) classNames += ' selected';

        daysHtml += `<div class="${classNames}" data-day="${day}">${day}</div>`;
      }

      gridEl.innerHTML = daysHtml;

      if (selectedTxt) {
        const isSelectedToday = (this.selectedDate.toDateString() === today.toDateString());
        selectedTxt.textContent = isSelectedToday 
          ? 'Today (' + this.selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ')' 
          : this.selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }

      // Attach day clicks
      gridEl.querySelectorAll('.cal-day:not(.empty)').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
          const dayNum = parseInt(dayEl.getAttribute('data-day'), 10);
          this.selectedDate = new Date(year, month, dayNum);
          this.render();
        });
      });
    }
  };

  /* ==========================================================================
     16. SCIENTIFIC CALCULATOR (SAFE PARSER — ZERO EVAL())
     ========================================================================== */
  const calculator = {
    displayValue: '0',
    historyValue: '',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,

    init() {
      const keys = document.querySelectorAll('.calc-btn');
      keys.forEach(key => {
        key.addEventListener('click', () => {
          const action = key.getAttribute('data-action');
          const val = key.getAttribute('data-val');

          if (action === 'num') {
            this.inputDigit(val);
          } else if (action === 'operator') {
            this.handleOperator(val);
          } else if (action === 'equals') {
            this.calculate();
          } else if (action === 'clear') {
            this.clear();
          } else if (action === 'backspace') {
            this.backspace();
          } else if (action === 'percent') {
            this.percentage();
          } else if (action === 'toggleSign') {
            this.toggleSign();
          }

          this.updateDisplay();
        });
      });

      // Keyboard support for calculator
      document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('calculator-modal');
        if (!modal || modal.style.display !== 'flex') return;

        if (e.key >= '0' && e.key <= '9') {
          this.inputDigit(e.key);
        } else if (e.key === '.') {
          this.inputDigit('.');
        } else if (['+', '-', '*', '/'].includes(e.key)) {
          this.handleOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
          e.preventDefault();
          this.calculate();
        } else if (e.key === 'Backspace') {
          this.backspace();
        } else if (e.key === 'Escape') {
          closeCalculatorModal();
        } else if (e.key === '%') {
          this.percentage();
        }

        this.updateDisplay();
      });

      this.updateDisplay();
    },

    inputDigit(digit) {
      if (digit === '.') {
        if (this.waitingForSecondOperand) {
          this.displayValue = '0.';
          this.waitingForSecondOperand = false;
          return;
        }
        if (!this.displayValue.includes('.')) {
          this.displayValue += '.';
        }
        return;
      }

      if (this.waitingForSecondOperand) {
        this.displayValue = digit;
        this.waitingForSecondOperand = false;
      } else {
        this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
      }
    },

    handleOperator(nextOperator) {
      const inputValue = parseFloat(this.displayValue);

      if (this.operator && this.waitingForSecondOperand) {
        this.operator = nextOperator;
        this.historyValue = `${this.firstOperand} ${this.getOpSymbol(nextOperator)}`;
        return;
      }

      if (this.firstOperand === null && !isNaN(inputValue)) {
        this.firstOperand = inputValue;
      } else if (this.operator) {
        const result = this.performCalculation(this.operator, this.firstOperand, inputValue);
        this.displayValue = String(result);
        this.firstOperand = result;
      }

      this.waitingForSecondOperand = true;
      this.operator = nextOperator;
      this.historyValue = `${this.firstOperand} ${this.getOpSymbol(nextOperator)}`;
    },

    calculate() {
      if (this.operator === null || this.waitingForSecondOperand) return;

      const inputValue = parseFloat(this.displayValue);
      const result = this.performCalculation(this.operator, this.firstOperand, inputValue);

      this.historyValue = `${this.firstOperand} ${this.getOpSymbol(this.operator)} ${inputValue} =`;
      this.displayValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    },

    performCalculation(op, a, b) {
      if (op === '+') return a + b;
      if (op === '-') return a - b;
      if (op === '*') return a * b;
      if (op === '/') {
        if (b === 0) return 'Error';
        return a / b;
      }
      return b;
    },

    getOpSymbol(op) {
      if (op === '*') return '×';
      if (op === '/') return '÷';
      if (op === '-') return '−';
      return op;
    },

    clear() {
      this.displayValue = '0';
      this.historyValue = '';
      this.firstOperand = null;
      this.waitingForSecondOperand = false;
      this.operator = null;
    },

    backspace() {
      if (this.waitingForSecondOperand) return;
      if (this.displayValue.length > 1) {
        this.displayValue = this.displayValue.slice(0, -1);
      } else {
        this.displayValue = '0';
      }
    },

    percentage() {
      const current = parseFloat(this.displayValue);
      if (!isNaN(current)) {
        this.displayValue = String(current / 100);
      }
    },

    toggleSign() {
      const current = parseFloat(this.displayValue);
      if (!isNaN(current)) {
        this.displayValue = String(current * -1);
      }
    },

    updateDisplay() {
      const displayEl = document.getElementById('calc-display');
      const historyEl = document.getElementById('calc-history');

      if (displayEl) {
        // Truncate long floating numbers nicely
        let str = this.displayValue;
        if (str.length > 12 && !isNaN(parseFloat(str))) {
          str = parseFloat(str).toPrecision(8);
        }
        displayEl.textContent = str;
      }
      if (historyEl) historyEl.textContent = this.historyValue || '0';
    }
  };

  function openCalculatorModal() {
    const modal = document.getElementById('calculator-modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCalculatorModal() {
    const modal = document.getElementById('calculator-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /* ==========================================================================
     17. FOCUS MODE (DISTRACTION-FREE)
     ========================================================================== */
  const focusQuotes = [
    { quote: "Deep focus is the superpower that unlocks all knowledge.", author: "EduNexa AI Wisdom" },
    { quote: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John C. Maxwell" },
    { quote: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
    { quote: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams" }
  ];

  function enterFocusMode() {
    const overlay = document.getElementById('focus-mode-overlay');
    if (!overlay) return;

    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');

    // Random inspirational quote
    const randQuote = focusQuotes[Math.floor(Math.random() * focusQuotes.length)];
    const quoteText = document.getElementById('focus-quote-text');
    const quoteAuthor = document.getElementById('focus-quote-author');

    if (quoteText) quoteText.textContent = `"${randQuote.quote}"`;
    if (quoteAuthor) quoteAuthor.textContent = `— ${randQuote.author}`;

    // Update goal preview from pending tasks
    const focusGoal = document.getElementById('focus-current-goal');
    if (focusGoal) {
      const activeTask = state.todos.find(t => !t.completed);
      focusGoal.textContent = activeTask ? activeTask.text : 'All tasks completed! Focus on reading or exploring Grade curriculums.';
    }

    logActivity('Entered Focus Mode');
    showToast('Focus Mode activated. Press Esc to exit.', 'info');
  }

  function exitFocusMode() {
    const overlay = document.getElementById('focus-mode-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  function initFocusMode() {
    const exitBtn = document.getElementById('focus-exit-btn');
    const focusTimerToggle = document.getElementById('focus-timer-toggle-btn');
    const focusTimerReset = document.getElementById('focus-timer-reset-btn');

    if (exitBtn) exitBtn.addEventListener('click', exitFocusMode);

    if (focusTimerToggle) {
      focusTimerToggle.addEventListener('click', () => {
        if (studyTimer.isRunning) {
          studyTimer.pause();
        } else {
          studyTimer.start();
        }
      });
    }

    if (focusTimerReset) {
      focusTimerReset.addEventListener('click', () => {
        studyTimer.reset();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('focus-mode-overlay');
        if (overlay && overlay.style.display === 'flex') {
          exitFocusMode();
        }
      }
    });
  }

  /* ==========================================================================
     18. SETTINGS MODAL & DATA MANAGEMENT
     ========================================================================== */
  function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    const nameInput = document.getElementById('setting-student-name');
    const soundToggle = document.getElementById('setting-sound-toggle');
    const clockToggle = document.getElementById('setting-clock-format-toggle');

    if (nameInput) nameInput.value = state.studentName;
    if (soundToggle) soundToggle.checked = state.settings.soundEnabled;
    if (clockToggle) clockToggle.checked = state.settings.clock24h;

    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function initSettings() {
    const saveBtn = document.getElementById('settings-save-btn');
    const cancelBtn = document.getElementById('settings-cancel-btn');
    const closeBtn = document.getElementById('settings-modal-close-btn');
    const resetDataBtn = document.getElementById('setting-reset-data-btn');
    const activityClearBtn = document.getElementById('activity-clear-btn');

    if (cancelBtn) cancelBtn.addEventListener('click', closeSettingsModal);
    if (closeBtn) closeBtn.addEventListener('click', closeSettingsModal);

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('setting-student-name');
        const soundToggle = document.getElementById('setting-sound-toggle');
        const clockToggle = document.getElementById('setting-clock-format-toggle');

        if (nameInput) {
          const trimmed = nameInput.value.trim() || 'Student';
          state.studentName = trimmed;
          storage.set(STORAGE_KEYS.STUDENT_NAME, trimmed);

          // Update header profile names
          const headerName = document.getElementById('header-user-name');
          const menuName = document.getElementById('menu-user-name');
          const avatarPill = document.getElementById('profile-avatar');
          const menuAvatar = document.getElementById('menu-avatar');

          if (headerName) headerName.textContent = trimmed;
          if (menuName) menuName.textContent = trimmed;
          const initial = trimmed.charAt(0).toUpperCase();
          if (avatarPill) avatarPill.textContent = initial;
          if (menuAvatar) menuAvatar.textContent = initial;
        }

        if (soundToggle) state.settings.soundEnabled = soundToggle.checked;
        if (clockToggle) state.settings.clock24h = clockToggle.checked;

        storage.set(STORAGE_KEYS.SETTINGS, state.settings);

        closeSettingsModal();
        showToast('Preferences saved', 'success');
      });
    }

    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all local tasks, notes, sessions, and activity logs? This action cannot be undone.')) {
          storage.remove(STORAGE_KEYS.STATS);
          storage.remove(STORAGE_KEYS.TODOS);
          storage.remove(STORAGE_KEYS.NOTES);
          storage.remove(STORAGE_KEYS.ACTIVITY);

          state.stats = { studySessions: 0, tasksCompleted: 0, notesSaved: 0 };
          state.todos = [];
          state.note = { title: '', content: '', lastSaved: null };
          state.activities = [];

          renderStats();
          renderActivityList();
          initNotes();
          initTodoList();

          closeSettingsModal();
          showToast('All local study data reset', 'info');
        }
      });
    }

    if (activityClearBtn) {
      activityClearBtn.addEventListener('click', () => {
        state.activities = [];
        storage.remove(STORAGE_KEYS.ACTIVITY);
        renderActivityList();
        showToast('Activity log cleared', 'info');
      });
    }
  }

  /* ==========================================================================
     19. MODAL BACKDROP CLICK DISMISSALS
     ========================================================================== */
  function initModals() {
    const calcCloseBtn = document.getElementById('calc-modal-close-btn');
    if (calcCloseBtn) calcCloseBtn.addEventListener('click', closeCalculatorModal);

    const calcModal = document.getElementById('calculator-modal');
    if (calcModal) {
      calcModal.addEventListener('click', (e) => {
        if (e.target === calcModal) closeCalculatorModal();
      });
    }

    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettingsModal();
      });
    }

    // Hub Shortcuts clicks
    const hubCalc = document.getElementById('hub-open-calc-btn');
    if (hubCalc) hubCalc.addEventListener('click', openCalculatorModal);

    const hubFocus = document.getElementById('hub-open-focus-btn');
    if (hubFocus) hubFocus.addEventListener('click', enterFocusMode);
  }

  /* ==========================================================================
     20. INITIALIZATION
     ========================================================================== */
  function initApp() {
    // 1. Initial User Profile Rendering
    const initial = (state.studentName || 'S').charAt(0).toUpperCase();
    const headerName = document.getElementById('header-user-name');
    const menuName = document.getElementById('menu-user-name');
    const avatarPill = document.getElementById('profile-avatar');
    const menuAvatar = document.getElementById('menu-avatar');

    if (headerName) headerName.textContent = state.studentName;
    if (menuName) menuName.textContent = state.studentName;
    if (avatarPill) avatarPill.textContent = initial;
    if (menuAvatar) menuAvatar.textContent = initial;

    // 2. Sub-modules setup
    initClockAndGreeting();
    initNavigation();
    initSearch();
    initGradeSection();
    studyTimer.init();
    initTodoList();
    initNotes();
    stopwatch.init();
    calendarWidget.init();
    calculator.init();
    initFocusMode();
    initSettings();
    initModals();

    // 3. Render state-driven components
    renderStats();
    renderActivityList();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
