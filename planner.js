/* ==========================================================================
   PLANNER.JS - NOVIX Study Planner Interactive Engine
   Handles tasks management, calendar navigation, pomodoro timer,
   statistics recalculation, search filtering, quick actions & modals
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive modules
  initLiveClock();
  initThemeToggle();
  initTasksManager();
  initSmartCalendar();
  initPomodoroTimer();
  initQuickActions();
  initAiSuggestions();
  initScratchpad();
  initHeaderSearch();
  initMiniCalendar();
});

/* ==========================================
   1. TOAST NOTIFICATION UTILITY
   ========================================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-check-circle";
  if (type === "info") iconClass = "fa-info-circle";
  if (type === "warning") iconClass = "fa-exclamation-circle";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ==========================================
   2. LIVE DATE & CLOCK UPDATER
   ========================================== */
function initLiveClock() {
  const timeEl = document.getElementById("liveTimeText");
  const dateEl = document.getElementById("liveDateText");

  function update() {
    const now = new Date();
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (dateEl) {
      const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      dateEl.innerHTML = `<i class="fa-regular fa-calendar"></i> <span>${dateStr}</span>`;
    }
  }

  update();
  setInterval(update, 1000);
}


/* ==========================================
   3. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const icon = document.getElementById("themeIcon");
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);
  if (icon) {
    icon.className = savedTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }

  toggleBtn?.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    if (icon) {
      icon.className = next === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }

    showToast(`Switched to ${next === "dark" ? "Dark Glass" : "Clean Light"} mode`);
  });
}


/* ==========================================
   4. TASKS MANAGER (ADD, EDIT, DELETE, COMPLETE)
   ========================================== */
let defaultTasks = [
  { id: 1, name: "Calculus Integration Problem Set #4", subject: "Mathematics", priority: "High", startTime: "09:00 AM", duration: "45 mins", completed: true },
  { id: 2, name: "Data Structures Binary Trees Review", subject: "Computer Science", priority: "High", startTime: "11:30 AM", duration: "60 mins", completed: true },
  { id: 3, name: "Physics Electromagnetism Formulas", subject: "Physics", priority: "Medium", startTime: "02:00 PM", duration: "30 mins", completed: true },
  { id: 4, name: "Organic Chemistry Mechanism Practice", subject: "Chemistry", priority: "Medium", startTime: "03:30 PM", duration: "45 mins", completed: true },
  { id: 5, name: "Biology Mitosis & Cell Division Notes", subject: "Biology", priority: "High", startTime: "05:00 PM", duration: "40 mins", completed: true },
  { id: 6, name: "English Literature Hamlet Essay Outline", subject: "English", priority: "Medium", startTime: "07:00 PM", duration: "50 mins", completed: false },
  { id: 7, name: "Algorithms Time Complexity Quiz Prep", subject: "Computer Science", priority: "Low", startTime: "08:30 PM", duration: "30 mins", completed: false }
];

function initTasksManager() {
  const stored = localStorage.getItem("studyMatePlannerTasks");
  let tasks = stored ? JSON.parse(stored) : defaultTasks;

  const listContainer = document.getElementById("tasksListContainer");
  const counterEl = document.getElementById("taskManagerCounter");
  const filterPills = document.querySelectorAll("#taskFilterPills .pill-btn");
  const searchInput = document.getElementById("taskFilterInput");

  // Modal Elements
  const modal = document.getElementById("addTaskModal");
  const openBtnTop = document.getElementById("addNewTaskTopBtn");
  const closeBtn = document.getElementById("closeTaskModalBtn");
  const cancelBtn = document.getElementById("cancelTaskModalBtn");
  const taskForm = document.getElementById("taskForm");
  const modalTitle = document.getElementById("taskModalTitle");

  let currentFilter = "all";
  let searchQuery = "";

  function saveTasks() {
    localStorage.setItem("studyMatePlannerTasks", JSON.stringify(tasks));
    updateHeroStats();
  }

  function getSubjectClass(subject) {
    if (subject === "Mathematics") return "tag-math";
    if (subject === "Physics") return "tag-physics";
    if (subject === "Chemistry") return "tag-chem";
    if (subject === "Biology") return "tag-bio";
    if (subject === "English") return "tag-english";
    return "tag-cs";
  }

  function renderTasks() {
    if (!listContainer) return;

    listContainer.innerHTML = "";

    const filtered = tasks.filter(task => {
      // Filter tab check
      if (currentFilter === "pending" && task.completed) return false;
      if (currentFilter === "completed" && !task.completed) return false;
      if (currentFilter === "high" && task.priority !== "High") return false;
      if (currentFilter === "math" && task.subject !== "Mathematics") return false;
      if (currentFilter === "cs" && task.subject !== "Computer Science") return false;

      // Search check
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return task.name.toLowerCase().includes(query) || task.subject.toLowerCase().includes(query);
      }

      return true;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding: 24px; color: var(--text-muted);">
          <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; margin-bottom: 8px; opacity: 0.5;"></i>
          <p>No study tasks matching this filter.</p>
        </div>
      `;
    } else {
      filtered.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-item-card ${task.completed ? 'completed' : ''}`;

        const prioClass = task.priority === "High" ? "prio-high" : (task.priority === "Medium" ? "prio-medium" : "prio-low");

        item.innerHTML = `
          <div class="task-left-group">
            <div class="custom-checkbox" data-id="${task.id}">
              <i class="fa-solid fa-check"></i>
            </div>
            <div class="task-info-block">
              <span class="task-title">${task.name}</span>
              <div class="task-meta-row">
                <span class="task-subject-tag ${getSubjectClass(task.subject)}">${task.subject}</span>
                <span><i class="fa-regular fa-clock"></i> ${task.startTime || 'Flexible'} (${task.duration || '30m'})</span>
              </div>
            </div>
          </div>
          <div class="task-right-group">
            <span class="priority-badge ${prioClass}">${task.priority} Priority</span>
            <button class="task-action-btn edit" data-id="${task.id}" title="Edit Task"><i class="fa-solid fa-pen"></i></button>
            <button class="task-action-btn delete" data-id="${task.id}" title="Delete Task"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;

        listContainer.appendChild(item);
      });
    }

    // Update Counter
    const completedCount = tasks.filter(t => t.completed).length;
    if (counterEl) {
      counterEl.textContent = `${completedCount} / ${tasks.length} Tasks Completed`;
    }

    attachTaskEvents();
  }

  function attachTaskEvents() {
    // Checkbox Toggle
    document.querySelectorAll(".custom-checkbox").forEach(box => {
      box.addEventListener("click", () => {
        const id = parseInt(box.getAttribute("data-id"));
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.completed = !task.completed;
          saveTasks();
          renderTasks();
          showToast(task.completed ? "Task marked as completed!" : "Task marked as pending");
        }
      });
    });

    // Delete Task
    document.querySelectorAll(".task-action-btn.delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        showToast("Task removed from planner", "info");
      });
    });

    // Edit Task
    document.querySelectorAll(".task-action-btn.edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const task = tasks.find(t => t.id === id);
        if (task) {
          document.getElementById("taskIdInput").value = task.id;
          document.getElementById("taskNameInput").value = task.name;
          document.getElementById("taskSubjectSelect").value = task.subject;
          document.getElementById("taskPrioritySelect").value = task.priority;
          document.getElementById("taskStartTimeInput").value = task.startTime || "";
          document.getElementById("taskDurationInput").value = task.duration || "";

          if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-pen text-indigo"></i> Edit Task`;
          modal?.classList.remove("hidden");
        }
      });
    });
  }

  // Filter Pills Event
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.getAttribute("data-filter");
      renderTasks();
    });
  });

  // Search Input Event
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderTasks();
  });

  // Modal Open / Close
  function openModal() {
    taskForm.reset();
    document.getElementById("taskIdInput").value = "";
    if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-plus text-indigo"></i> Add New Task`;
    modal?.classList.remove("hidden");
  }

  function closeModal() {
    modal?.classList.add("hidden");
  }

  openBtnTop?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  // Submit Task Form
  taskForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskId = document.getElementById("taskIdInput").value;
    const name = document.getElementById("taskNameInput").value;
    const subject = document.getElementById("taskSubjectSelect").value;
    const priority = document.getElementById("taskPrioritySelect").value;
    const startTime = document.getElementById("taskStartTimeInput").value || "Flexible";
    const duration = document.getElementById("taskDurationInput").value || "30 mins";

    if (taskId) {
      // Edit existing
      const task = tasks.find(t => t.id === parseInt(taskId));
      if (task) {
        task.name = name;
        task.subject = subject;
        task.priority = priority;
        task.startTime = startTime;
        task.duration = duration;
        showToast("Task updated successfully!");
      }
    } else {
      // Add new
      const newTask = {
        id: Date.now(),
        name,
        subject,
        priority,
        startTime,
        duration,
        completed: false
      };
      tasks.unshift(newTask);
      showToast("New task added to schedule!");
    }

    saveTasks();
    renderTasks();
    closeModal();
  });

  renderTasks();
  initUpcomingTasks();
}

function updateHeroStats() {
  const stored = localStorage.getItem("studyMatePlannerTasks");
  if (!stored) return;
  const tasks = JSON.parse(stored);

  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pctEl = document.getElementById("heroProgressPercent");
  const completedEl = document.getElementById("heroCompletedTasksCount");
  const totalEl = document.getElementById("heroTotalTasksCount");
  const ringFill = document.getElementById("heroProgressCircle");
  const remainingTag = document.getElementById("heroRemainingTasksTag");

  if (pctEl) pctEl.textContent = `${pct}%`;
  if (completedEl) completedEl.textContent = completed;
  if (totalEl) totalEl.textContent = total;
  if (remainingTag) {
    const remaining = total - completed;
    remainingTag.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> ${remaining} Remaining`;
  }

  if (ringFill) {
    const strokeDashoffset = 339 - (339 * pct) / 100;
    ringFill.style.strokeDashoffset = strokeDashoffset;
  }
}

/* Render Upcoming Tasks List */
function initUpcomingTasks() {
  const listEl = document.getElementById("upcomingTasksList");
  if (!listEl) return;

  const upcomingData = [
    { day: "02", month: "Aug", title: "Physics Lab Electromagnetism Experiment", time: "Tomorrow at 10:00 AM", subject: "Physics" },
    { day: "04", month: "Aug", title: "Chemistry Acid-Base Equilibrium Assignment", time: "Aug 4 at 02:00 PM", subject: "Chemistry" },
    { day: "08", month: "Aug", title: "Computer Science Data Structures Midterm", time: "Aug 8 at 09:00 AM", subject: "Computer Science" },
    { day: "12", month: "Aug", title: "Mathematics Linear Algebra Quiz", time: "Aug 12 at 11:30 AM", subject: "Mathematics" }
  ];

  listEl.innerHTML = "";
  upcomingData.forEach(item => {
    const card = document.createElement("div");
    card.className = "upcoming-item";
    card.innerHTML = `
      <div class="upcoming-left">
        <div class="upcoming-date-badge">
          <span class="day">${item.day}</span>
          <span class="month">${item.month}</span>
        </div>
        <div class="upcoming-info">
          <h4>${item.title}</h4>
          <p><i class="fa-regular fa-clock"></i> ${item.time} &bull; ${item.subject}</p>
        </div>
      </div>
      <button class="btn-icon-pill" title="Toggle Reminder"><i class="fa-solid fa-bell"></i></button>
    `;
    listEl.appendChild(card);
  });
}


/* ==========================================
   5. SMART STUDY CALENDAR
   ========================================== */
function initSmartCalendar() {
  const gridEl = document.getElementById("calendarDaysGrid");
  const monthTitle = document.getElementById("calCurrentMonthTitle");
  const prevBtn = document.getElementById("calPrevMonthBtn");
  const nextBtn = document.getElementById("calNextMonthBtn");
  const todayBtn = document.getElementById("calTodayBtn");

  let currDate = new Date(2026, 7, 1); // August 2026

  const examDays = [4, 8, 12, 19];
  const deadlineDays = [2, 6, 15, 24];

  function renderCalendar() {
    if (!gridEl || !monthTitle) return;

    const year = currDate.getFullYear();
    const month = currDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    gridEl.innerHTML = "";

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // Previous month filler days
    for (let x = firstDayIndex; x > 0; x--) {
      const dayCell = document.createElement("div");
      dayCell.className = "cal-day-cell other-month";
      dayCell.innerHTML = `<span class="cal-day-num">${prevMonthTotalDays - x + 1}</span>`;
      gridEl.appendChild(dayCell);
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const dayCell = document.createElement("div");
      dayCell.className = "cal-day-cell";

      if (i === 1 && month === 7 && year === 2026) {
        dayCell.classList.add("is-today");
      }

      let badgesHtml = '<div class="cal-day-dots">';

      if (examDays.includes(i)) {
        badgesHtml += `<span class="cal-badge-pill badge-exam-pill">EXAM</span>`;
      }
      if (deadlineDays.includes(i)) {
        badgesHtml += `<span class="cal-badge-pill badge-deadline-pill">DUE</span>`;
      }
      if (i % 2 === 0) {
        badgesHtml += `<span class="dot dot-study"></span>`;
      }

      badgesHtml += '</div>';

      dayCell.innerHTML = `
        <span class="cal-day-num">${i}</span>
        ${badgesHtml}
      `;

      dayCell.addEventListener("click", () => {
        showToast(`Viewing study schedule for ${monthNames[month]} ${i}, ${year}`);
      });

      gridEl.appendChild(dayCell);
    }
  }

  prevBtn?.addEventListener("click", () => {
    currDate.setMonth(currDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn?.addEventListener("click", () => {
    currDate.setMonth(currDate.getMonth() + 1);
    renderCalendar();
  });

  todayBtn?.addEventListener("click", () => {
    currDate = new Date(2026, 7, 1);
    renderCalendar();
    showToast("Returned to today's date");
  });

  renderCalendar();
}


/* ==========================================
   6. POMODORO TIMER MODULE
   ========================================== */
function initPomodoroTimer() {
  const digitsEl = document.getElementById("pomoTimeDigits");
  const modeLabel = document.getElementById("pomoModeLabel");
  const startBtn = document.getElementById("pomoStartBtn");
  const resetBtn = document.getElementById("pomoResetBtn");
  const ringFill = document.getElementById("pomoRingFill");
  const tabs = document.querySelectorAll("#pomoTabs .pomo-tab");
  const sessionCountEl = document.getElementById("pomoSessionCount");

  let totalSeconds = 1500; // 25 mins
  let remainingSeconds = 1500;
  let timerInterval = null;
  let isRunning = false;
  let completedSessions = 4;

  function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    if (digitsEl) {
      digitsEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (ringFill) {
      const strokeDashoffset = 597 - (597 * remainingSeconds) / totalSeconds;
      ringFill.style.strokeDashoffset = strokeDashoffset;
    }
  }

  function startTimer() {
    if (isRunning) {
      // Pause
      clearInterval(timerInterval);
      isRunning = false;
      if (startBtn) startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Resume`;
      showToast("Pomodoro timer paused", "info");
    } else {
      // Start
      isRunning = true;
      if (startBtn) startBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;
      showToast("Pomodoro study sprint started!");

      timerInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();

        if (remainingSeconds <= 0) {
          clearInterval(timerInterval);
          isRunning = false;
          completedSessions++;
          if (sessionCountEl) sessionCountEl.textContent = completedSessions;
          if (startBtn) startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Timer`;
          showToast("Pomodoro session completed! Take a break 🎉");
          remainingSeconds = totalSeconds;
          updateDisplay();
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    remainingSeconds = totalSeconds;
    if (startBtn) startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Timer`;
    updateDisplay();
    showToast("Timer reset to initial duration");
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const seconds = parseInt(tab.getAttribute("data-time"));
      const mode = tab.getAttribute("data-mode");

      totalSeconds = seconds;
      remainingSeconds = seconds;

      if (modeLabel) {
        modeLabel.textContent = mode === "focus" ? "Focus Session" : (mode === "shortBreak" ? "Short Break" : "Long Break");
      }

      resetTimer();
    });
  });

  startBtn?.addEventListener("click", startTimer);
  resetBtn?.addEventListener("click", resetTimer);

  updateDisplay();
}


/* ==========================================
   7. QUICK ACTIONS & SUBJECT CARDS
   ========================================== */
function initQuickActions() {
  document.getElementById("qaAddTaskBtn")?.addEventListener("click", () => {
    document.getElementById("addNewTaskTopBtn")?.click();
  });

  document.getElementById("qaAddSubjectBtn")?.addEventListener("click", () => {
    showToast("Opening Subject Builder...", "info");
    setTimeout(() => window.location.href = "subjects.html", 600);
  });

  document.getElementById("qaStartSessionBtn")?.addEventListener("click", () => {
    showToast("Live study session timer active!", "info");
  });

  document.getElementById("qaGenerateNotesBtn")?.addEventListener("click", () => {
    showToast("AI generating concise study summary notes...", "info");
    setTimeout(() => showToast("Notes compiled & saved to Documents!"), 1500);
  });

  document.getElementById("qaGenerateQuizBtn")?.addEventListener("click", () => {
    showToast("AI generating 10 practice questions...", "info");
    setTimeout(() => showToast("Practice Quiz Ready!"), 1500);
  });

  document.getElementById("qaStartRevisionBtn")?.addEventListener("click", () => {
    showToast("Spaced repetition flashcards launched!");
  });

  document.getElementById("qaPomodoroScrollBtn")?.addEventListener("click", () => {
    const card = document.getElementById("pomodoroTimerCard");
    card?.scrollIntoView({ behavior: 'smooth' });
  });

  initSubjectCards();
}

function initSubjectCards() {
  const grid = document.getElementById("subjectCardsGrid");
  if (!grid) return;

  const subjects = [
    { name: "Mathematics", hours: "42.5 Hrs", pct: "85%", icon: "fa-calculator", color: "icon-indigo", fill: "fill-indigo", topic: "Calculus Integration", exam: "Aug 4" },
    { name: "Computer Science", hours: "38.0 Hrs", pct: "78%", icon: "fa-laptop-code", color: "icon-purple", fill: "fill-purple", topic: "Binary Trees & Graphs", exam: "Aug 8" },
    { name: "Physics", hours: "28.5 Hrs", pct: "70%", icon: "fa-atom", color: "icon-cyan", fill: "fill-cyan", topic: "Electromagnetism", exam: "Aug 12" },
    { name: "Chemistry", hours: "24.0 Hrs", pct: "65%", icon: "fa-vial", color: "icon-amber", fill: "fill-amber", topic: "Organic Reactions", exam: "Aug 15" },
    { name: "Biology", hours: "19.5 Hrs", pct: "60%", icon: "fa-dna", color: "icon-emerald", fill: "fill-emerald", topic: "Cell Division", exam: "Aug 18" },
    { name: "English", hours: "16.0 Hrs", pct: "90%", icon: "fa-book-open", color: "icon-rose", fill: "fill-rose", topic: "Hamlet Analysis", exam: "Aug 22" }
  ];

  grid.innerHTML = "";
  subjects.forEach(sub => {
    const card = document.createElement("div");
    card.className = "subject-planner-card";
    card.innerHTML = `
      <div class="sub-card-top">
        <div class="sub-title-wrap">
          <div class="sub-icon ${sub.color}"><i class="fa-solid ${sub.icon}"></i></div>
          <span class="sub-name">${sub.name}</span>
        </div>
        <span class="sub-hours">${sub.hours}</span>
      </div>
      <div class="sub-progress-bar-bg">
        <div class="sub-progress-bar-fill ${sub.fill}" style="width: ${sub.pct};"></div>
      </div>
      <div class="sub-meta-info">
        <span>Next: <strong>${sub.topic}</strong></span>
        <span>Exam: <strong>${sub.exam}</strong></span>
      </div>
      <button class="sub-rev-btn"><i class="fa-solid fa-rotate"></i> Start Revision</button>
    `;

    card.querySelector(".sub-rev-btn")?.addEventListener("click", () => {
      showToast(`Started revision session for ${sub.name}`);
    });

    grid.appendChild(card);
  });
}


/* ==========================================
   8. AI RECOMMENDATIONS & SCRATCHPAD
   ========================================== */
function initAiSuggestions() {
  document.getElementById("aiActionStartMath")?.addEventListener("click", () => {
    showToast("Math Calculus sprint launched!");
  });

  document.getElementById("aiActionReviewPhysics")?.addEventListener("click", () => {
    showToast("Opening Physics formula cards...", "info");
  });

  document.getElementById("aiActionTakeBioQuiz")?.addEventListener("click", () => {
    showToast("Launching 10-question Biology Quiz!", "info");
  });

  document.getElementById("aiActionGenEnglishNotes")?.addEventListener("click", () => {
    showToast("Generating English Hamlet Essay Notes...", "info");
  });
}

function initScratchpad() {
  const textarea = document.getElementById("quickNotesArea");
  const saveBtn = document.getElementById("saveQuickNoteBtn");

  const savedNote = localStorage.getItem("studyMateScratchpadNote");
  if (savedNote && textarea) {
    textarea.value = savedNote;
  }

  saveBtn?.addEventListener("click", () => {
    if (textarea) {
      localStorage.setItem("studyMateScratchpadNote", textarea.value);
      showToast("Quick note saved to workspace!");
    }
  });
}


/* ==========================================
   9. HEADER SEARCH & MINI CALENDAR
   ========================================== */
function initHeaderSearch() {
  const searchInput = document.getElementById("plannerSearchInput");

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  searchInput?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return;

    // Highlight matching cards or scroll
    const taskInput = document.getElementById("taskFilterInput");
    if (taskInput) {
      taskInput.value = q;
      taskInput.dispatchEvent(new Event("input"));
    }
  });
}

function initMiniCalendar() {
  const grid = document.getElementById("miniCalGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  days.forEach(d => {
    const cell = document.createElement("div");
    cell.style.fontWeight = "800";
    cell.style.color = "var(--text-dim)";
    cell.textContent = d;
    grid.appendChild(cell);
  });

  for (let i = 1; i <= 31; i++) {
    const cell = document.createElement("div");
    cell.className = `mini-cal-cell ${i === 1 ? 'today' : ''}`;
    cell.textContent = i;
    grid.appendChild(cell);
  }
}
