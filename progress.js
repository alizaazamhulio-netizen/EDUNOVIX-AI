/* ==========================================
   NOVIX - PROGRESS PAGE INTERACTION ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initLiveClock();
  animateCounterNumbers();
  animateHeroRing();
  renderMiniCalendar();
  renderProductivityHeatmap();
  initSearchAndKeyboardShortcuts();
  initInteractiveButtons();
});

/* ------------------------------------------
   1. DARK / LIGHT THEME TOGGLE
   ------------------------------------------ */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Read saved theme from localStorage
  const savedTheme = localStorage.getItem('studymate_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('studymate_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  }
}

/* ------------------------------------------
   2. REAL-TIME CLOCK DISPLAY
   ------------------------------------------ */
function initLiveClock() {
  const clockEl = document.getElementById('liveTimeDisplay');
  
  function updateTime() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

/* ------------------------------------------
   3. ANIMATED METRIC COUNTERS
   ------------------------------------------ */
function animateCounterNumbers() {
  const counters = document.querySelectorAll('.stat-value[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1200; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, stepTime);
  });
}

/* ------------------------------------------
   4. HERO SVG PROGRESS RING ANIMATION
   ------------------------------------------ */
function animateHeroRing() {
  const ringFill = document.getElementById('heroRingCircle');
  const percentText = document.getElementById('heroPercentText');
  
  if (!ringFill) return;

  const targetPercent = 84;
  const radius = 85;
  const circumference = 2 * Math.PI * radius; // ~534.07

  ringFill.style.strokeDasharray = `${circumference}`;
  const offset = circumference - (targetPercent / 100) * circumference;

  setTimeout(() => {
    ringFill.style.strokeDashoffset = `${offset}`;
  }, 100);
}

/* ------------------------------------------
   5. MINI LEARNING CALENDAR RENDERER
   ------------------------------------------ */
function renderMiniCalendar() {
  const grid = document.getElementById('calendarDaysGrid');
  if (!grid) return;

  // August 2026 calendar mockup data (1st is Saturday)
  const totalDays = 31;
  const startOffset = 5; // Saturday offset (Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6)
  
  const completedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const today = 1; // August 1st as per metadata
  const missedDays = [19, 24];

  let html = '';

  // Empty leading cells
  for (let i = 0; i < startOffset; i++) {
    html += `<div class="cal-day" style="opacity:0.2;"></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    let classes = 'cal-day';
    if (day === today) {
      classes += ' today';
    } else if (completedDays.includes(day)) {
      classes += ' completed';
    } else if (missedDays.includes(day)) {
      classes += ' missed';
    }

    html += `<div class="${classes}" title="Aug ${day}, 2026">${day}</div>`;
  }

  grid.innerHTML = html;
}

/* ------------------------------------------
   6. PRODUCTIVITY HEATMAP MATRIX RENDERER
   ------------------------------------------ */
function renderProductivityHeatmap() {
  const container = document.getElementById('heatmapGrid');
  if (!container) return;

  const weeks = 16;
  const daysPerWeek = 7;
  let html = '';

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < daysPerWeek; d++) {
      // Generate pseudo activity levels (0 to 4)
      let level = 0;
      const rand = Math.random();
      if (rand > 0.75) level = 4;
      else if (rand > 0.5) level = 3;
      else if (rand > 0.3) level = 2;
      else if (rand > 0.1) level = 1;

      html += `<div class="heatmap-cell" data-level="${level}" title="Study Session: ${level * 1.5} hrs"></div>`;
    }
  }

  container.innerHTML = html;
}

/* ------------------------------------------
   7. SEARCH FILTER & KEYBOARD SHORTCUTS
   ------------------------------------------ */
function initSearchAndKeyboardShortcuts() {
  const searchInput = document.getElementById('searchInput');

  document.addEventListener('keydown', (e) => {
    // Ctrl + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterCardsByQuery(query);
    });
  }

  function filterCardsByQuery(query) {
    const cards = document.querySelectorAll('.subject-card, .stat-card, .insight-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query) || query === '') {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

/* ------------------------------------------
   8. INTERACTIVE BUTTON HANDLERS
   ------------------------------------------ */
function initInteractiveButtons() {
  const notificationBtn = document.getElementById('notificationBtn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      alert('🔔 Notifications:\n• Daily Goal Reached! (3.5 Hrs completed)\n• Quiz Master Badge Unlocked!\n• Physics Review Scheduled for tomorrow.');
    });
  }

  // AI Suggestion buttons
  const aiButtons = document.querySelectorAll('.ai-suggestion-btn');
  aiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const actionText = btn.textContent.trim();
      alert(`🤖 NOVIX Assistant:\nOpening interactive practice module for "${actionText}"...`);
    });
  });
}
