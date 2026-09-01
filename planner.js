/**
 * EduNexa / NOVIX - Real Functional Study Planner Engine
 * Fully integrated with Firebase Auth & Firestore with UID isolation.
 */

import { auth, db } from './firebase.js';

// Application State
let currentUser = null;
let tasks = [];
let subjects = [];
let studySessions = [];
let currentFilter = 'all';
let searchQuery = '';
let selectedCalendarDate = null;
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();

// Active Study Session State
let studyTimerInterval = null;
let studyTimerSeconds = 0;
let isStudyTimerRunning = false;
let currentStudySubject = 'General';
let currentStudyTaskId = null;

// Pomodoro Timer State
let pomodoroMode = 'focus'; // 'focus' | 'shortBreak' | 'longBreak'
let pomodoroTimeLeft = 25 * 60;
let pomodoroInterval = null;
let isPomodoroRunning = false;
let completedPomodorosCount = 0;

// Scratchpad debounce
let scratchpadTimeout = null;

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initAuth();
});

function setupEventListeners() {
  // Task Modal Trigger Buttons
  const addTaskBtns = document.querySelectorAll('#btnAddTask, #btnQuickAddTask, #btnAddNewTask, .btn-add-task');
  addTaskBtns.forEach(btn => {
    btn.addEventListener('click', () => openTaskModal());
  });

  // Modal Close Buttons
  const closeTaskModalBtn = document.getElementById('closeTaskModal');
  const cancelTaskBtn = document.getElementById('cancelTaskBtn');
  const taskModalOverlay = document.getElementById('taskModalOverlay');

  if (closeTaskModalBtn) closeTaskModalBtn.addEventListener('click', closeTaskModal);
  if (cancelTaskBtn) cancelTaskBtn.addEventListener('click', closeTaskModal);
  if (taskModalOverlay) {
    taskModalOverlay.addEventListener('click', (e) => {
      if (e.target === taskModalOverlay) closeTaskModal();
    });
  }

  // Task Form Submission
  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    taskForm.addEventListener('submit', handleTaskFormSubmit);
  }

  // Task Filter Tabs
  const filterBtns = document.querySelectorAll('.task-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-indigo-600/30', 'border-indigo-500'));
      btn.classList.add('active', 'bg-indigo-600/30', 'border-indigo-500');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderTasks();
    });
  });

  // Task Search Input
  const searchInput = document.getElementById('taskSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTasks();
    });
  }

  // Calendar Controls
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const todayBtn = document.getElementById('todayBtn');

  if (prevMonthBtn) prevMonthBtn.addEventListener('click', prevMonth);
  if (nextMonthBtn) nextMonthBtn.addEventListener('click', nextMonth);
  if (todayBtn) todayBtn.addEventListener('click', goToToday);

  // Study Session Controls
  const btnStartStudy = document.getElementById('btnStartStudy');
  const btnPauseStudy = document.getElementById('btnPauseStudy');
  const btnStopStudy = document.getElementById('btnStopStudy');

  if (btnStartStudy) btnStartStudy.addEventListener('click', startStudySession);
  if (btnPauseStudy) btnPauseStudy.addEventListener('click', togglePauseStudySession);
  if (btnStopStudy) btnStopStudy.addEventListener('click', stopStudySession);

  // Pomodoro Controls
  const pomodoroFocusBtn = document.getElementById('pomoFocusBtn');
  const pomodoroShortBreakBtn = document.getElementById('pomoShortBreakBtn');
  const pomodoroLongBreakBtn = document.getElementById('pomoLongBreakBtn');
  const pomoStartBtn = document.getElementById('pomoStartBtn');
  const pomoResetBtn = document.getElementById('pomoResetBtn');

  if (pomodoroFocusBtn) pomodoroFocusBtn.addEventListener('click', () => setPomodoroMode('focus', 25));
  if (pomodoroShortBreakBtn) pomodoroShortBreakBtn.addEventListener('click', () => setPomodoroMode('shortBreak', 5));
  if (pomodoroLongBreakBtn) pomodoroLongBreakBtn.addEventListener('click', () => setPomodoroMode('longBreak', 15));
  if (pomoStartBtn) pomoStartBtn.addEventListener('click', togglePomodoro);
  if (pomoResetBtn) pomoResetBtn.addEventListener('click', resetPomodoro);

  // Quick Scratchpad
  const scratchpadTextarea = document.getElementById('scratchpadText');
  const saveScratchpadBtn = document.getElementById('saveScratchpadBtn');
  const clearScratchpadBtn = document.getElementById('clearScratchpadBtn');

  if (scratchpadTextarea) {
    scratchpadTextarea.addEventListener('input', () => {
      const statusEl = document.getElementById('scratchpadStatus');
      if (statusEl) statusEl.textContent = 'Saving...';
      clearTimeout(scratchpadTimeout);
      scratchpadTimeout = setTimeout(saveQuickNote, 1200);
    });
  }

  if (saveScratchpadBtn) saveScratchpadBtn.addEventListener('click', saveQuickNote);
  if (clearScratchpadBtn) {
    clearScratchpadBtn.addEventListener('click', () => {
      if (scratchpadTextarea) {
        scratchpadTextarea.value = '';
        saveQuickNote();
      }
    });
  }

  // Add Subject Modal
  const btnOpenSubjectModal = document.getElementById('btnOpenSubjectModal');
  if (btnOpenSubjectModal) {
    btnOpenSubjectModal.addEventListener('click', openSubjectModal);
  }

  const subjectForm = document.getElementById('subjectForm');
  if (subjectForm) {
    subjectForm.addEventListener('submit', handleSubjectFormSubmit);
  }

  const closeSubjectModalBtn = document.getElementById('closeSubjectModal');
  if (closeSubjectModalBtn) {
    closeSubjectModalBtn.addEventListener('click', closeSubjectModal);
  }

  // Profile Edit / Switcher
  const userProfileBtn = document.getElementById('userProfileBtn');
  if (userProfileBtn) {
    userProfileBtn.addEventListener('click', openProfileModal);
  }
}

// --------------------------------------------------------------------------
// Authentication & Initialization
// --------------------------------------------------------------------------
function initAuth() {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      // If user isn't logged in, log in anonymously or guest
      try {
        const guest = await auth.signInAnonymously();
        currentUser = guest.user;
      } catch (e) {
        showToast('Running in local offline mode', 'info');
      }
    } else {
      currentUser = user;
    }

    loadUserProfile();
    await loadInitialData();
  });
}

async function loadInitialData() {
  if (!currentUser) return;

  // Real-time listener for tasks
  db.onTasksSnapshot((loadedTasks) => {
    tasks = loadedTasks || [];
    renderTasks();
    renderCalendar();
    renderStatistics();
    renderUpcomingTasks();
    populateTaskSelects();
  }, currentUser.uid);

  // Real-time listener for study sessions
  db.onSessionsSnapshot((loadedSessions) => {
    studySessions = loadedSessions || [];
    renderStatistics();
    renderSubjectCards();
  }, currentUser.uid);

  // Load Subjects
  subjects = await db.getSubjects(currentUser.uid);
  renderSubjectCards();
  populateSubjectDropdowns();

  // Load Scratchpad
  loadScratchpad();

  // Initialize Calendar for Current Month
  goToToday();
}

function loadUserProfile() {
  if (!currentUser) return;

  const nameEl = document.getElementById('userDisplayName');
  const emailEl = document.getElementById('userEmail');
  const avatarEl = document.getElementById('userAvatar');
  const greetingEl = document.getElementById('dashboardGreeting');

  const displayName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Student');
  const email = currentUser.email || 'student@studymate.app';

  if (nameEl) nameEl.textContent = displayName;
  if (emailEl) emailEl.textContent = email;

  // Generate Initials
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2) || 'ST';

  if (avatarEl) avatarEl.textContent = initials;

  if (greetingEl) {
    const hours = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hours >= 12 && hours < 17) timeGreeting = 'Good afternoon';
    else if (hours >= 17) timeGreeting = 'Good evening';
    greetingEl.textContent = `${timeGreeting}, ${displayName}`;
  }
}

// --------------------------------------------------------------------------
// Real Task Management
// --------------------------------------------------------------------------
export function openTaskModal(taskToEdit = null) {
  const modal = document.getElementById('taskModalOverlay');
  const titleInput = document.getElementById('taskTitleInput');
  const subjectSelect = document.getElementById('taskSubjectSelect');
  const prioritySelect = document.getElementById('taskPrioritySelect');
  const dateInput = document.getElementById('taskDateInput');
  const timeInput = document.getElementById('taskTimeInput');
  const durationInput = document.getElementById('taskDurationInput');
  const notesInput = document.getElementById('taskNotesInput');
  const editingIdInput = document.getElementById('editingTaskId');
  const modalTitle = document.getElementById('taskModalTitle');

  if (!modal) return;

  populateSubjectDropdowns();

  if (taskToEdit) {
    if (modalTitle) modalTitle.textContent = 'Edit Study Task';
    if (editingIdInput) editingIdInput.value = taskToEdit.id;
    if (titleInput) titleInput.value = taskToEdit.title;
    if (subjectSelect) subjectSelect.value = taskToEdit.subject;
    if (prioritySelect) prioritySelect.value = taskToEdit.priority;
    if (dateInput) dateInput.value = taskToEdit.date;
    if (timeInput) timeInput.value = taskToEdit.startTime || '09:00';
    if (durationInput) durationInput.value = taskToEdit.duration || 45;
    if (notesInput) notesInput.value = taskToEdit.notes || '';
  } else {
    if (modalTitle) modalTitle.textContent = 'Create New Study Task';
    if (editingIdInput) editingIdInput.value = '';
    if (titleInput) titleInput.value = '';
    if (subjectSelect && subjects.length > 0) subjectSelect.value = subjects[0].name;
    if (prioritySelect) prioritySelect.value = 'medium';
    
    // Default to selected calendar date or today
    const defaultDate = selectedCalendarDate || new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.value = defaultDate;
    if (timeInput) timeInput.value = '09:00';
    if (durationInput) durationInput.value = '45';
    if (notesInput) notesInput.value = '';
  }

  modal.classList.add('active');
  if (titleInput) titleInput.focus();
}

export function closeTaskModal() {
  const modal = document.getElementById('taskModalOverlay');
  if (modal) modal.classList.remove('active');
}

async function handleTaskFormSubmit(e) {
  e.preventDefault();
  if (!currentUser) {
    showToast('Please sign in to save tasks', 'error');
    return;
  }

  const title = document.getElementById('taskTitleInput')?.value.trim();
  const subject = document.getElementById('taskSubjectSelect')?.value || 'General';
  const priority = document.getElementById('taskPrioritySelect')?.value || 'medium';
  const date = document.getElementById('taskDateInput')?.value || new Date().toISOString().split('T')[0];
  const startTime = document.getElementById('taskTimeInput')?.value || '09:00';
  const duration = parseInt(document.getElementById('taskDurationInput')?.value, 10) || 45;
  const notes = document.getElementById('taskNotesInput')?.value.trim() || '';
  const editingId = document.getElementById('editingTaskId')?.value;

  if (!title) {
    showToast('Task title is required', 'error');
    return;
  }

  try {
    if (editingId) {
      await db.updateTask(editingId, {
        title,
        subject,
        priority,
        date,
        startTime,
        duration,
        notes
      }, currentUser.uid);
      showToast('Task updated successfully', 'success');
    } else {
      await db.addTask({
        title,
        subject,
        priority,
        date,
        startTime,
        duration,
        completed: false,
        notes
      }, currentUser.uid);
      showToast('Task created and saved to Firestore', 'success');
    }

    closeTaskModal();
  } catch (err) {
    console.error('Error saving task:', err);
    showToast('Failed to save task: ' + err.message, 'error');
  }
}

export async function toggleTaskComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task || !currentUser) return;

  const newStatus = !task.completed;
  try {
    await db.updateTask(taskId, { completed: newStatus }, currentUser.uid);
    if (newStatus) {
      showToast(`Completed: ${task.title}`, 'success');
    }
  } catch (err) {
    showToast('Could not update task status', 'error');
  }
}

export async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this study task?')) return;
  if (!currentUser) return;

  try {
    await db.deleteTask(taskId, currentUser.uid);
    showToast('Task deleted', 'info');
  } catch (err) {
    showToast('Failed to delete task', 'error');
  }
}

export function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    openTaskModal(task);
  }
}

export function renderTasks() {
  const taskListEl = document.getElementById('taskListContainer');
  const taskCountBadge = document.getElementById('taskCountBadge');
  if (!taskListEl) return;

  // Filter tasks
  let filtered = tasks.filter(task => {
    // Filter status
    if (currentFilter === 'pending' && task.completed) return false;
    if (currentFilter === 'completed' && !task.completed) return false;
    if (currentFilter === 'high' && task.priority !== 'high' && task.priority !== 'urgent') return false;

    // Search query
    if (searchQuery) {
      const matchTitle = task.title.toLowerCase().includes(searchQuery);
      const matchSubject = task.subject.toLowerCase().includes(searchQuery);
      const matchNotes = (task.notes || '').toLowerCase().includes(searchQuery);
      if (!matchTitle && !matchSubject && !matchNotes) return false;
    }

    // Calendar selection filter (if user clicked a specific date)
    if (selectedCalendarDate && task.date !== selectedCalendarDate) {
      return false;
    }

    return true;
  });

  // Sort: Pending first, then by date and time
  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (a.date + ' ' + a.startTime).localeCompare(b.date + ' ' + b.startTime);
  });

  if (taskCountBadge) {
    taskCountBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'task' : 'tasks'}`;
  }

  // Empty State
  if (filtered.length === 0) {
    taskListEl.innerHTML = `
      <div class="text-center py-16 px-4 glass-card rounded-2xl border border-white/5">
        <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 text-2xl">
          📝
        </div>
        <h3 class="text-lg font-semibold text-white mb-1">
          ${searchQuery ? 'No matching study tasks' : selectedCalendarDate ? `No tasks scheduled for ${formatPrettyDate(selectedCalendarDate)}` : 'No tasks yet'}
        </h3>
        <p class="text-sm text-slate-400 max-w-sm mx-auto mb-6">
          ${searchQuery ? 'Try changing your search terms or filter.' : 'Add your first study task to start organizing your schedule.'}
        </p>
        <button id="btnEmptyAddTask" class="btn-primary">
          <span class="text-lg">+</span> Add Your First Study Task
        </button>
      </div>
    `;

    const emptyBtn = document.getElementById('btnEmptyAddTask');
    if (emptyBtn) emptyBtn.addEventListener('click', () => openTaskModal());
    return;
  }

  // Render Task Items
  taskListEl.innerHTML = filtered.map(task => {
    const priorityClass = getPriorityBadgeClass(task.priority);
    const subjectObj = subjects.find(s => s.name.toLowerCase() === task.subject.toLowerCase());
    const subjectColor = subjectObj ? subjectObj.color : '#6366f1';
    const isCompleted = task.completed;

    return `
      <div class="glass-card p-4 rounded-xl flex items-start gap-4 transition-all duration-200 hover:border-white/20 ${isCompleted ? 'opacity-60 bg-slate-900/40' : ''}" data-task-id="${task.id}">
        <button class="btn-toggle-task mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-600 hover:border-indigo-400 bg-slate-800/80 text-transparent'}" onclick="window.plannerApp.toggleTask('${task.id}')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="text-xs px-2.5 py-0.5 rounded-full font-medium" style="background: ${subjectColor}20; color: ${subjectColor}; border: 1px solid ${subjectColor}40;">
              ${task.subject}
            </span>
            <span class="text-xs px-2 py-0.5 rounded-full font-semibold ${priorityClass}">
              ${task.priority.toUpperCase()}
            </span>
            <span class="text-xs text-slate-400 flex items-center gap-1 ml-auto">
              📅 ${formatRelativeTaskDate(task.date)} ${task.startTime ? 'at ' + task.startTime : ''} • ⏱️ ${task.duration}m
            </span>
          </div>

          <h4 class="text-base font-medium text-white break-words ${isCompleted ? 'line-through text-slate-400' : ''}">
            ${escapeHtml(task.title)}
          </h4>

          ${task.notes ? `<p class="text-xs text-slate-400 mt-1 line-clamp-2">${escapeHtml(task.notes)}</p>` : ''}
        </div>

        <div class="flex items-center gap-1">
          <button class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-white/5 transition" title="Start Study Session on this task" onclick="window.plannerApp.startSessionForTask('${task.id}')">
            ▶️
          </button>
          <button class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition" title="Edit Task" onclick="window.plannerApp.editTask('${task.id}')">
            ✏️
          </button>
          <button class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition" title="Delete Task" onclick="window.plannerApp.deleteTask('${task.id}')">
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// Real Smart Study Calendar
// --------------------------------------------------------------------------
export function renderCalendar() {
  const monthTitleEl = document.getElementById('calendarMonthTitle');
  const calendarGridEl = document.getElementById('calendarDaysGrid');
  if (!calendarGridEl) return;

  const date = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const monthName = date.toLocaleString('default', { month: 'long' });
  
  if (monthTitleEl) {
    monthTitleEl.textContent = `${monthName} ${currentCalendarYear}`;
  }

  // Days calculations
  const firstDayIndex = date.getDay(); // 0 = Sun, 1 = Mon ...
  const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const prevLastDay = new Date(currentCalendarYear, currentCalendarMonth, 0).getDate();
  const todayStr = new Date().toISOString().split('T')[0];

  let html = '';

  // Previous month days
  for (let i = firstDayIndex; i > 0; i--) {
    const d = prevLastDay - i + 1;
    html += `
      <div class="calendar-day-cell other-month opacity-30">
        <span class="text-xs text-slate-500">${d}</span>
      </div>
    `;
  }

  // Current month days
  for (let day = 1; day <= lastDay; day++) {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(currentCalendarMonth + 1).padStart(2, '0');
    const fullDateStr = `${currentCalendarYear}-${formattedMonth}-${formattedDay}`;

    const isToday = fullDateStr === todayStr;
    const isSelected = fullDateStr === selectedCalendarDate;

    // Check tasks on this date
    const dayTasks = tasks.filter(t => t.date === fullDateStr);
    const hasPending = dayTasks.some(t => !t.completed);
    const hasCompleted = dayTasks.some(t => t.completed);

    let indicatorHtml = '';
    if (dayTasks.length > 0) {
      indicatorHtml = `
        <div class="flex items-center gap-1 mt-1">
          ${hasPending ? `<span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>` : ''}
          ${hasCompleted ? `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>` : ''}
          ${dayTasks.length > 2 ? `<span class="text-[9px] text-slate-400">+${dayTasks.length}</span>` : ''}
        </div>
      `;
    }

    html += `
      <div class="calendar-day-cell ${isToday ? 'is-today font-bold' : ''} ${isSelected ? 'is-selected ring-2 ring-indigo-500' : ''}" 
           onclick="window.plannerApp.selectCalendarDate('${fullDateStr}')">
        <span class="text-xs ${isToday ? 'text-indigo-400' : 'text-slate-200'}">${day}</span>
        ${indicatorHtml}
      </div>
    `;
  }

  // Next month fill days to complete the 35 or 42 grid
  const totalCells = firstDayIndex + lastDay;
  const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
  for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
    html += `
      <div class="calendar-day-cell other-month opacity-30">
        <span class="text-xs text-slate-500">${nextDay}</span>
      </div>
    `;
  }

  calendarGridEl.innerHTML = html;
}

export function prevMonth() {
  currentCalendarMonth--;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear--;
  }
  renderCalendar();
}

export function nextMonth() {
  currentCalendarMonth++;
  if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear++;
  }
  renderCalendar();
}

export function goToToday() {
  const now = new Date();
  currentCalendarMonth = now.getMonth();
  currentCalendarYear = now.getFullYear();
  selectedCalendarDate = now.toISOString().split('T')[0];
  renderCalendar();
  renderTasks();
}

export function selectCalendarDate(dateStr) {
  if (selectedCalendarDate === dateStr) {
    selectedCalendarDate = null; // Toggle off filter
  } else {
    selectedCalendarDate = dateStr;
  }
  renderCalendar();
  renderTasks();
}

// --------------------------------------------------------------------------
// Real Subject Planner
// --------------------------------------------------------------------------
export function renderSubjectCards() {
  const container = document.getElementById('subjectCardsContainer');
  if (!container) return;

  if (subjects.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-slate-400 text-sm">
        No subjects configured. Add your subjects to organize study sessions.
      </div>
    `;
    return;
  }

  container.innerHTML = subjects.map(subject => {
    // Calculate real stats for this subject
    const subjectTasks = tasks.filter(t => t.subject.toLowerCase() === subject.name.toLowerCase());
    const completedTasks = subjectTasks.filter(t => t.completed).length;
    
    // Calculate study hours spent from sessions
    const subjectSessions = studySessions.filter(s => s.subject.toLowerCase() === subject.name.toLowerCase());
    const totalMinutes = subjectSessions.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
    const totalHours = (totalMinutes / 60).toFixed(1);

    const goalHours = subject.targetWeeklyHours || 5;
    const progressPercent = Math.min(100, Math.round((totalHours / goalHours) * 100));

    return `
      <div class="glass-card p-5 rounded-2xl relative overflow-hidden transition-all hover:border-white/20">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style="background: ${subject.color}20; border: 1px solid ${subject.color}40;">
              ${subject.icon || '📖'}
            </div>
            <div>
              <h4 class="font-semibold text-white text-base">${escapeHtml(subject.name)}</h4>
              <p class="text-xs text-slate-400">${subjectTasks.length} ${subjectTasks.length === 1 ? 'task' : 'tasks'} (${completedTasks} done)</p>
            </div>
          </div>
          <button class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition" title="Start study on ${subject.name}" onclick="window.plannerApp.startSessionForSubject('${subject.name}')">
            ▶️
          </button>
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-slate-400">Study Time: <strong class="text-white">${totalHours}h</strong> / ${goalHours}h goal</span>
            <span class="font-semibold" style="color: ${subject.color}">${progressPercent}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" style="width: ${progressPercent}%; background: ${subject.color}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function populateSubjectDropdowns() {
  const selects = document.querySelectorAll('#taskSubjectSelect, #studySessionSubjectSelect');
  selects.forEach(select => {
    if (!select) return;
    const currentValue = select.value;
    select.innerHTML = subjects.map(s => `
      <option value="${escapeHtml(s.name)}">${s.icon || '📖'} ${escapeHtml(s.name)}</option>
    `).join('');
    if (currentValue) select.value = currentValue;
  });
}

function populateTaskSelects() {
  const select = document.getElementById('studySessionTaskSelect');
  if (!select) return;
  const pendingTasks = tasks.filter(t => !t.completed);
  select.innerHTML = `
    <option value="">-- Optional: Link a Specific Task --</option>
    ${pendingTasks.map(t => `<option value="${t.id}">${escapeHtml(t.title)} (${t.subject})</option>`).join('')}
  `;
}

function openSubjectModal() {
  const modal = document.getElementById('subjectModalOverlay');
  if (modal) modal.classList.add('active');
}

function closeSubjectModal() {
  const modal = document.getElementById('subjectModalOverlay');
  if (modal) modal.classList.remove('active');
}

async function handleSubjectFormSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const name = document.getElementById('subjectNameInput')?.value.trim();
  const color = document.getElementById('subjectColorInput')?.value || '#6366f1';
  const icon = document.getElementById('subjectIconInput')?.value || '📖';
  const targetWeeklyHours = parseInt(document.getElementById('subjectGoalInput')?.value, 10) || 5;

  if (!name) {
    showToast('Subject name is required', 'error');
    return;
  }

  try {
    const newSub = await db.addSubject({ name, color, icon, targetWeeklyHours }, currentUser.uid);
    subjects.push(newSub);
    renderSubjectCards();
    populateSubjectDropdowns();
    closeSubjectModal();
    showToast(`Added subject: ${name}`, 'success');
  } catch (err) {
    showToast('Failed to add subject', 'error');
  }
}

// --------------------------------------------------------------------------
// Real Study Session Timer
// --------------------------------------------------------------------------
export function startStudySession() {
  if (isStudyTimerRunning) return;

  const subjectSelect = document.getElementById('studySessionSubjectSelect');
  const taskSelect = document.getElementById('studySessionTaskSelect');

  currentStudySubject = subjectSelect ? subjectSelect.value : (subjects[0]?.name || 'General');
  currentStudyTaskId = taskSelect ? taskSelect.value : null;

  isStudyTimerRunning = true;
  updateStudyTimerUI();

  studyTimerInterval = setInterval(() => {
    studyTimerSeconds++;
    updateStudyTimerDisplay();
  }, 1000);

  showToast(`Study session started for ${currentStudySubject}`, 'info');
}

export function togglePauseStudySession() {
  if (!isStudyTimerRunning && studyTimerSeconds === 0) return;

  if (isStudyTimerRunning) {
    clearInterval(studyTimerInterval);
    isStudyTimerRunning = false;
    showToast('Study session paused', 'info');
  } else {
    isStudyTimerRunning = true;
    studyTimerInterval = setInterval(() => {
      studyTimerSeconds++;
      updateStudyTimerDisplay();
    }, 1000);
    showToast('Study session resumed', 'info');
  }
  updateStudyTimerUI();
}

export async function stopStudySession() {
  if (studyTimerSeconds === 0) return;
  clearInterval(studyTimerInterval);
  isStudyTimerRunning = false;

  const durationMinutes = Math.max(1, Math.round(studyTimerSeconds / 60));
  
  if (currentUser) {
    try {
      await db.saveStudySession({
        subject: currentStudySubject,
        taskId: currentStudyTaskId,
        durationMinutes: durationMinutes,
        mode: 'timer',
        date: new Date().toISOString()
      }, currentUser.uid);

      showToast(`Saved study session: ${durationMinutes} mins on ${currentStudySubject}`, 'success');
    } catch (e) {
      showToast('Error saving study session', 'error');
    }
  }

  studyTimerSeconds = 0;
  updateStudyTimerDisplay();
  updateStudyTimerUI();
}

function updateStudyTimerDisplay() {
  const display = document.getElementById('studyTimerDisplay');
  if (!display) return;

  const hrs = Math.floor(studyTimerSeconds / 3600);
  const mins = Math.floor((studyTimerSeconds % 3600) / 60);
  const secs = studyTimerSeconds % 60;

  display.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateStudyTimerUI() {
  const btnStart = document.getElementById('btnStartStudy');
  const btnPause = document.getElementById('btnPauseStudy');
  const btnStop = document.getElementById('btnStopStudy');

  if (btnStart) btnStart.style.display = isStudyTimerRunning ? 'none' : 'inline-flex';
  if (btnPause) {
    btnPause.style.display = (studyTimerSeconds > 0) ? 'inline-flex' : 'none';
    btnPause.textContent = isStudyTimerRunning ? '⏸️ Pause' : '▶️ Resume';
  }
  if (btnStop) btnStop.style.display = (studyTimerSeconds > 0) ? 'inline-flex' : 'none';
}

// --------------------------------------------------------------------------
// Real Pomodoro Timer
// --------------------------------------------------------------------------
export function setPomodoroMode(mode, minutes) {
  if (isPomodoroRunning) {
    clearInterval(pomodoroInterval);
    isPomodoroRunning = false;
  }

  pomodoroMode = mode;
  pomodoroTimeLeft = minutes * 60;
  updatePomodoroDisplay();

  const focusBtn = document.getElementById('pomoFocusBtn');
  const shortBreakBtn = document.getElementById('pomoShortBreakBtn');
  const longBreakBtn = document.getElementById('pomoLongBreakBtn');

  [focusBtn, shortBreakBtn, longBreakBtn].forEach(b => {
    if (b) b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500');
  });

  if (mode === 'focus' && focusBtn) focusBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
  if (mode === 'shortBreak' && shortBreakBtn) shortBreakBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
  if (mode === 'longBreak' && longBreakBtn) longBreakBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');

  const startBtn = document.getElementById('pomoStartBtn');
  if (startBtn) startBtn.textContent = 'Start Focus';
}

export function togglePomodoro() {
  const startBtn = document.getElementById('pomoStartBtn');

  if (isPomodoroRunning) {
    clearInterval(pomodoroInterval);
    isPomodoroRunning = false;
    if (startBtn) startBtn.textContent = 'Resume';
    showToast('Pomodoro paused', 'info');
  } else {
    isPomodoroRunning = true;
    if (startBtn) startBtn.textContent = 'Pause';
    
    pomodoroInterval = setInterval(async () => {
      if (pomodoroTimeLeft > 0) {
        pomodoroTimeLeft--;
        updatePomodoroDisplay();
      } else {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        if (startBtn) startBtn.textContent = 'Start';
        
        // Pomodoro complete!
        playChime();
        if (pomodoroMode === 'focus') {
          completedPomodorosCount++;
          const pomoBadge = document.getElementById('completedPomodoroBadge');
          if (pomoBadge) pomoBadge.textContent = `${completedPomodorosCount} Focus Sessions`;
          
          if (currentUser) {
            await db.saveStudySession({
              subject: 'Pomodoro Focus',
              durationMinutes: 25,
              mode: 'pomodoro',
              date: new Date().toISOString()
            }, currentUser.uid);
          }

          showToast('🎉 Pomodoro Completed! Time for a 5-minute break.', 'success');
          setPomodoroMode('shortBreak', 5);
        } else {
          showToast('Break finished! Ready for another focus session?', 'info');
          setPomodoroMode('focus', 25);
        }
      }
    }, 1000);
  }
}

export function resetPomodoro() {
  clearInterval(pomodoroInterval);
  isPomodoroRunning = false;
  const minutes = pomodoroMode === 'focus' ? 25 : pomodoroMode === 'shortBreak' ? 5 : 15;
  pomodoroTimeLeft = minutes * 60;
  updatePomodoroDisplay();
  const startBtn = document.getElementById('pomoStartBtn');
  if (startBtn) startBtn.textContent = 'Start Focus';
}

function updatePomodoroDisplay() {
  const display = document.getElementById('pomodoroTimerDisplay');
  if (!display) return;

  const mins = Math.floor(pomodoroTimeLeft / 60);
  const secs = pomodoroTimeLeft % 60;
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {}
}

// --------------------------------------------------------------------------
// Quick Scratchpad
// --------------------------------------------------------------------------
async function loadScratchpad() {
  if (!currentUser) return;
  const textarea = document.getElementById('scratchpadText');
  const statusEl = document.getElementById('scratchpadStatus');

  const note = await db.getScratchpad(currentUser.uid);
  if (textarea && note) {
    textarea.value = note.content || '';
    if (statusEl && note.updatedAt) {
      statusEl.textContent = 'Saved ' + formatRelativeTime(note.updatedAt);
    }
  }
}

export async function saveQuickNote() {
  if (!currentUser) return;
  const textarea = document.getElementById('scratchpadText');
  const statusEl = document.getElementById('scratchpadStatus');

  if (!textarea) return;
  const content = textarea.value;

  try {
    await db.saveScratchpad(content, currentUser.uid);
    if (statusEl) statusEl.textContent = 'All changes saved to Firestore';
    showToast('Scratchpad synced', 'success');
  } catch (e) {
    if (statusEl) statusEl.textContent = 'Failed to save note';
  }
}

// --------------------------------------------------------------------------
// Real Calculated Statistics (Zero fake numbers!)
// --------------------------------------------------------------------------
export function renderStatistics() {
  const todayHoursEl = document.getElementById('statTodayHours');
  const completedTasksEl = document.getElementById('statCompletedTasks');
  const pendingTasksEl = document.getElementById('statPendingTasks');
  const weeklyHoursEl = document.getElementById('statWeeklyHours');
  const completionRateEl = document.getElementById('statCompletionRate');
  const streakEl = document.getElementById('statStreakDays');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate Today's Study Hours from real sessions
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = studySessions.filter(s => s.date && s.date.startsWith(todayStr));
  const todayMins = todaySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const todayHours = (todayMins / 60).toFixed(1);

  // Calculate Weekly Study Hours (last 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weeklySessions = studySessions.filter(s => s.date && new Date(s.date) >= sevenDaysAgo);
  const weeklyMins = weeklySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const weeklyHours = (weeklyMins / 60).toFixed(1);

  // Calculate Real Study Streak
  const streakDays = calculateStudyStreak(studySessions, tasks);

  if (todayHoursEl) todayHoursEl.textContent = `${todayHours} hrs`;
  if (completedTasksEl) completedTasksEl.textContent = `${completedTasks}`;
  if (pendingTasksEl) pendingTasksEl.textContent = `${pendingTasks}`;
  if (weeklyHoursEl) weeklyHoursEl.textContent = `${weeklyHours} hrs`;
  if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;
  if (streakEl) streakEl.textContent = `${streakDays} ${streakDays === 1 ? 'day' : 'days'}`;
}

function calculateStudyStreak(sessions, taskList) {
  const activeDates = new Set();

  sessions.forEach(s => {
    if (s.date) activeDates.add(s.date.split('T')[0]);
  });

  taskList.filter(t => t.completed && t.completedAt).forEach(t => {
    activeDates.add(t.completedAt.split('T')[0]);
  });

  if (activeDates.size === 0) return 0;

  let streak = 0;
  const checkDate = new Date();
  
  // If not active today, check if active yesterday
  const todayStr = checkDate.toISOString().split('T')[0];
  if (!activeDates.has(todayStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dStr = checkDate.toISOString().split('T')[0];
    if (activeDates.has(dStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// --------------------------------------------------------------------------
// Real Upcoming Tasks (Next 7 Days)
// --------------------------------------------------------------------------
export function renderUpcomingTasks() {
  const container = document.getElementById('upcomingTasksContainer');
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcoming = tasks.filter(t => {
    if (t.completed) return false;
    const taskDate = new Date(t.date + 'T00:00:00');
    return taskDate >= today && taskDate <= nextWeek;
  });

  upcoming.sort((a, b) => (a.date + ' ' + a.startTime).localeCompare(b.date + ' ' + b.startTime));

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs">
        No upcoming deadlines in the next 7 days.
      </div>
    `;
    return;
  }

  container.innerHTML = upcoming.map(task => {
    const priorityClass = getPriorityBadgeClass(task.priority);
    return `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-white/5 hover:border-white/10 transition">
        <div class="min-w-0 flex-1 pr-2">
          <p class="text-sm font-medium text-white truncate">${escapeHtml(task.title)}</p>
          <p class="text-xs text-slate-400">${task.subject} • ${formatRelativeTaskDate(task.date)}</p>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold ${priorityClass}">
          ${task.priority.toUpperCase()}
        </span>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// Profile & Settings Modal
// --------------------------------------------------------------------------
function openProfileModal() {
  const modal = document.getElementById('profileModalOverlay');
  const nameInput = document.getElementById('profileNameInput');
  const emailInput = document.getElementById('profileEmailInput');
  const goalInput = document.getElementById('profileGoalInput');

  if (!modal) return;

  if (currentUser) {
    if (nameInput) nameInput.value = currentUser.displayName || '';
    if (emailInput) emailInput.value = currentUser.email || '';
    if (goalInput) goalInput.value = currentUser.weeklyGoalHours || 20;
  }

  modal.classList.add('active');

  const closeBtn = document.getElementById('closeProfileModal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  const form = document.getElementById('profileForm');
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const updatedName = nameInput.value.trim();
      const updatedGoal = parseInt(goalInput.value, 10) || 20;

      await auth.updateProfile({ displayName: updatedName, weeklyGoalHours: updatedGoal });
      loadUserProfile();
      modal.classList.remove('active');
      showToast('Profile updated', 'success');
    };
  }
}

// --------------------------------------------------------------------------
// Toast Notification Engine
// --------------------------------------------------------------------------
export function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Helper Utilities
function getPriorityBadgeClass(priority) {
  switch (priority) {
    case 'urgent': return 'badge-urgent';
    case 'high': return 'badge-high';
    case 'low': return 'badge-low';
    default: return 'badge-medium';
  }
}

function formatRelativeTaskDate(dateStr) {
  if (!dateStr) return '';
  const taskDate = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = taskDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;

  return taskDate.toLocaleDateString('default', { month: 'short', day: 'numeric' });
}

function formatPrettyDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatRelativeTime(isoStr) {
  try {
    const date = new Date(isoStr);
    const diffSecs = Math.round((Date.now() - date.getTime()) / 1000);
    if (diffSecs < 60) return 'just now';
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

// Global API Bridge for inline HTML event handlers
window.plannerApp = {
  toggleTask: toggleTaskComplete,
  deleteTask: deleteTask,
  editTask: editTask,
  selectCalendarDate: selectCalendarDate,
  startSessionForTask: (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const subSelect = document.getElementById('studySessionSubjectSelect');
      const taskSelect = document.getElementById('studySessionTaskSelect');
      if (subSelect) subSelect.value = task.subject;
      if (taskSelect) taskSelect.value = task.id;
      startStudySession();
    }
  },
  startSessionForSubject: (subjectName) => {
    const subSelect = document.getElementById('studySessionSubjectSelect');
    if (subSelect) subSelect.value = subjectName;
    startStudySession();
  }
};
