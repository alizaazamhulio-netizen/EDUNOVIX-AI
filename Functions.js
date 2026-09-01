/**
 * EduNexa Notes - Production JavaScript Engine (functions.js)
 * Clean, modular, and fully functional student knowledge manager.
 */

// ==========================================================================
// Initial Sample Data & Color Mapping
// ==========================================================================

const COLOR_MAP = {
  blue: { bg: 'rgba(37, 99, 235, 0.12)', text: '#2563eb', border: '#3b82f6' },
  emerald: { bg: 'rgba(16, 185, 129, 0.12)', text: '#059669', border: '#10b981' },
  purple: { bg: 'rgba(139, 92, 246, 0.12)', text: '#7c3aed', border: '#8b5cf6' },
  amber: { bg: 'rgba(245, 158, 11, 0.12)', text: '#d97706', border: '#f59e0b' },
  rose: { bg: 'rgba(244, 63, 94, 0.12)', text: '#e11d48', border: '#f43f5e' },
  indigo: { bg: 'rgba(99, 102, 241, 0.12)', text: '#4f46e5', border: '#6366f1' },
  teal: { bg: 'rgba(20, 184, 166, 0.12)', text: '#0d9488', border: '#14b8a6' },
  slate: { bg: 'rgba(100, 116, 139, 0.12)', text: '#475569', border: '#64748b' }
};

const DEFAULT_SUBJECTS = [
  { id: 'sub_cs', name: 'Computer Science', color: 'emerald' },
  { id: 'sub_math', name: 'Mathematics', color: 'blue' },
  { id: 'sub_physics', name: 'Physics', color: 'purple' },
  { id: 'sub_chem', name: 'Chemistry', color: 'amber' },
  { id: 'sub_english', name: 'English', color: 'rose' },
  { id: 'sub_other', name: 'Other', color: 'slate' }
];

const SAMPLE_NOTES = [
  {
    id: 'note_1',
    title: 'Python Functions & Scope (LEGB Rule)',
    content: `<h2>1. Defining Functions in Python</h2>
<p>Functions are declared using the <code>def</code> keyword followed by the function name and parameters.</p>
<pre><code>def calculate_gpa(grades, credits):
    total_points = sum(g * c for g, c in zip(grades, credits))
    return round(total_points / sum(credits), 2)</code></pre>
<h2>2. The LEGB Scope Resolution</h2>
<p>Python resolves variable names following the <strong>LEGB</strong> hierarchy:</p>
<ul>
  <li><mark>Local (L)</mark>: Names assigned inside a function.</li>
  <li><mark>Enclosing (E)</mark>: Names in the local scope of any enclosing functions.</li>
  <li><mark>Global (G)</mark>: Names assigned at the top-level of module file.</li>
  <li><mark>Built-in (B)</mark>: Names preassigned in Python (e.g. <code>len</code>, <code>range</code>).</li>
</ul>
<blockquote>Tip for Exam: Use <code>*args</code> for variable positional arguments and <code>**kwargs</code> for keyword arguments.</blockquote>`,
    subject: 'Computer Science',
    tags: ['python', 'coding', 'exam', 'fundamentals'],
    favorite: true,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 4 // 4 hours ago
  },
  {
    id: 'note_2',
    title: 'Linear Equations & Matrix Row Operations',
    content: `<h2>Gaussian Elimination</h2>
<p>Gaussian Elimination reduces an augmented matrix to <strong>Row Echelon Form (REF)</strong> or <strong>Reduced Row Echelon Form (RREF)</strong>.</p>
<h3>The Three Elementary Row Operations:</h3>
<ol>
  <li>Swapping two rows ($R_i \leftrightarrow R_j$)</li>
  <li>Multiplying a row by a non-zero scalar ($k R_i \rightarrow R_i$)</li>
  <li>Adding a multiple of one row to another ($R_i + k R_j \rightarrow R_i$)</li>
</ol>
<pre><code>[ 1  2  -1 |  3 ]
[ 0  1   4 |  6 ]
[ 0  0   1 | -2 ]</code></pre>
<blockquote>Key Rule: If a row reduces to <code>[ 0 0 0 | k ]</code> with $k \neq 0$, the system has <strong>No Solution (Inconsistent)</strong>.</blockquote>`,
    subject: 'Mathematics',
    tags: ['algebra', 'matrices', 'homework', 'linear-algebra'],
    favorite: true,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: 'note_3',
    title: "Newton's Laws of Motion & Conservation of Momentum",
    content: `<h2>1. The Fundamental Laws</h2>
<ul>
  <li><strong>First Law (Inertia):</strong> An object remains at rest or in uniform motion unless acted upon by a net external force.</li>
  <li><strong>Second Law (F = ma):</strong> Acceleration is directly proportional to force and inversely proportional to mass. <mark>$$\vec{F}_{net} = \frac{d\vec{p}}{dt} = m\vec{a}$$</mark></li>
  <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction ($\vec{F}_{AB} = -\vec{F}_{BA}$).</li>
</ul>
<h2>2. Linear Momentum Conservation</h2>
<p>In a closed system with no external net forces, the total momentum remains constant:</p>
<pre><code>m1 * v1_initial + m2 * v2_initial = m1 * v1_final + m2 * v2_final</code></pre>`,
    subject: 'Physics',
    tags: ['mechanics', 'physics101', 'formulas', 'midterm'],
    favorite: false,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: 'note_4',
    title: 'Organic Chemistry: Functional Groups & Hydrocarbons',
    content: `<h2>Primary Functional Groups Summary</h2>
<ul>
  <li><strong>Alcohols:</strong> Contains hydroxyl group (<code>-OH</code>). Suffix: <em>-ol</em> (e.g., Ethanol).</li>
  <li><strong>Aldehydes:</strong> Carbonyl at chain end (<code>-CHO</code>). Suffix: <em>-al</em>.</li>
  <li><strong>Ketones:</strong> Carbonyl between carbons (<code>R-CO-R'</code>). Suffix: <em>-one</em>.</li>
  <li><strong>Carboxylic Acids:</strong> Contains carboxyl group (<code>-COOH</code>). Suffix: <em>-oic acid</em>.</li>
  <li><strong>Esters:</strong> Formed by reaction of alcohol and acid (<code>R-COO-R'</code>). Fragrant compounds.</li>
</ul>
<blockquote>Safety Reminder in Lab: Always add acid to water, never water to acid!</blockquote>`,
    subject: 'Chemistry',
    tags: ['organic', 'lab', 'revision', 'chemistry'],
    favorite: false,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6
  },
  {
    id: 'note_5',
    title: 'English Essay Structure & Rhetorical Analysis',
    content: `<h2>The Classic 5-Paragraph Essay Matrix</h2>
<h3>1. Introduction</h3>
<ul>
  <li><strong>Hook:</strong> Engaging quote, paradox, or contextual statement.</li>
  <li><strong>Bridge:</strong> 2-3 sentences narrowing the topic to the core text.</li>
  <li><strong>Thesis Statement:</strong> Central argumentative claim with 3 supporting pillars.</li>
</ul>
<h3>2. Body Paragraphs (PEEL Method)</h3>
<p><mark>Point &rarr; Evidence &rarr; Explanation &rarr; Link back to Thesis</mark></p>
<h3>3. Conclusion</h3>
<p>Restate thesis in novel words, synthesize key arguments, and leave a broader thematic implication.</p>`,
    subject: 'English',
    tags: ['writing', 'literature', 'essay', 'composition'],
    favorite: false,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 10
  },
  {
    id: 'note_6',
    title: 'Data Structures: Binary Search Trees & Complexity',
    content: `<h2>BST Properties</h2>
<p>For any node $N$ in a Binary Search Tree:</p>
<ul>
  <li>All keys in the left subtree are strictly <strong>less than</strong> $N.key$.</li>
  <li>All keys in the right subtree are strictly <strong>greater than</strong> $N.key$.</li>
</ul>
<h2>Time Complexity Breakdown:</h2>
<pre><code>Operation   Average   Worst (Degenerate)
Search      O(log n)  O(n)
Insertion   O(log n)  O(n)
Deletion    O(log n)  O(n)</code></pre>
<blockquote>Self-Balancing Trees (AVL, Red-Black) guarantee $O(\log n)$ worst-case time!</blockquote>`,
    subject: 'Computer Science',
    tags: ['algorithms', 'cs', 'trees', 'finals'],
    favorite: true,
    archived: false,
    deleted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  }
];

// ==========================================================================
// Application State
// ==========================================================================

const state = {
  notes: [],
  subjects: [],
  currentView: 'all', // 'all', 'favorites', 'recent', 'archived', 'trash', or 'subject_{name}'
  selectedSubject: null,
  searchQuery: '',
  selectedSubjectFilter: 'ALL',
  sortBy: 'newest',
  activeTagFilter: null,
  layout: 'grid', // 'grid' or 'list'
  
  // Editor State
  editingNoteId: null,
  editorTags: [],
  isEditorFavorite: false,
  autosaveTimer: null,
  autosaveStatus: 'idle',
  
  // View/Modal State
  viewingNoteId: null,
  pendingDeleteNoteId: null,
  isClearingTrash: false,
  selectedSubjectColor: 'blue',
  theme: 'light'
};

// ==========================================================================
// Initialization & Storage
// ==========================================================================

function initializeApp() {
  loadTheme();
  loadSubjects();
  loadNotes();
  updateGreeting();
  setupEventListeners();
  renderSubjectsNav();
  populateSubjectDropdowns();
  renderNotes();
  updateStats();
  updateSidebarCounts();
}

function loadTheme() {
  const savedTheme = localStorage.getItem('studymate_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('studymate_theme', theme);
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  showToast(`Switched to ${nextTheme} theme`, 'info');
}

function loadSubjects() {
  const savedSubjects = localStorage.getItem('studymate_subjects');
  if (savedSubjects) {
    try {
      state.subjects = JSON.parse(savedSubjects);
    } catch (e) {
      state.subjects = [...DEFAULT_SUBJECTS];
    }
  } else {
    state.subjects = [...DEFAULT_SUBJECTS];
    saveSubjects();
  }
}

function saveSubjects() {
  localStorage.setItem('studymate_subjects', JSON.stringify(state.subjects));
}

function loadNotes() {
  const savedNotes = localStorage.getItem('studymate_notes');
  if (savedNotes) {
    try {
      state.notes = JSON.parse(savedNotes);
    } catch (e) {
      state.notes = [...SAMPLE_NOTES];
    }
  } else {
    state.notes = [...SAMPLE_NOTES];
    saveNotes();
  }
}

function saveNotes() {
  localStorage.setItem('studymate_notes', JSON.stringify(state.notes));
  updateStats();
  updateSidebarCounts();
  updateStorageUsage();
}

function updateStorageUsage() {
  try {
    const raw = JSON.stringify(state.notes) + JSON.stringify(state.subjects);
    const bytes = new Blob([raw]).size;
    const kb = (bytes / 1024).toFixed(1);
    const percent = Math.min(100, Math.max(8, (bytes / 500000) * 100)).toFixed(0);
    
    const fillEl = document.getElementById('storageProgressFill');
    const statusEl = document.getElementById('storageStatusText');
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (statusEl) statusEl.textContent = `${kb} KB Synced`;
  } catch (e) {
    // ignore
  }
}

// ==========================================================================
// Greeting & Date Utilities
// ==========================================================================

function updateGreeting() {
  const greetingEl = document.getElementById('greetingTitle');
  if (!greetingEl) return;
  const hour = new Date().getHours();
  let text = 'Good afternoon 👋';
  if (hour >= 5 && hour < 12) {
    text = 'Good morning ☀️';
  } else if (hour >= 12 && hour < 18) {
    text = 'Good afternoon 👋';
  } else if (hour >= 18 && hour < 22) {
    text = 'Good evening 🌙';
  } else {
    text = 'Burning the midnight oil ✨';
  }
  greetingEl.textContent = text;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Recently';
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatFullDate(timestamp) {
  if (!timestamp) return 'N/A';
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function getSubjectColor(subjectName) {
  const sub = state.subjects.find(s => s.name.toLowerCase() === (subjectName || '').toLowerCase());
  const colorKey = sub ? sub.color : 'slate';
  return COLOR_MAP[colorKey] || COLOR_MAP.slate;
}

// ==========================================================================
// Navigation & Sidebar
// ==========================================================================

function renderSubjectsNav() {
  const container = document.getElementById('subjectsNavList');
  if (!container) return;
  
  container.innerHTML = state.subjects.map(subject => {
    const colorDef = COLOR_MAP[subject.color] || COLOR_MAP.slate;
    const count = state.notes.filter(n => !n.deleted && !n.archived && n.subject === subject.name).length;
    const isActive = state.currentView === `subject_${subject.name}`;

    return `
      <button class="subject-item ${isActive ? 'active' : ''}" data-subject="${escapeHtml(subject.name)}" data-view="subject">
        <span class="subject-dot" style="--dot-color: ${colorDef.border};"></span>
        <span class="subject-item-label">${escapeHtml(subject.name)}</span>
        <span class="subject-item-count">${count}</span>
      </button>
    `;
  }).join('');
}

function populateSubjectDropdowns() {
  const selectEditor = document.getElementById('noteSubjectSelect');
  const selectFilter = document.getElementById('subjectFilterSelect');

  if (selectEditor) {
    selectEditor.innerHTML = state.subjects.map(s => 
      `<option value="${escapeHtml(s.name)}">${escapeHtml(s.name)}</option>`
    ).join('');
  }

  if (selectFilter) {
    selectFilter.innerHTML = `<option value="ALL">All Subjects</option>` + 
      state.subjects.map(s => 
        `<option value="${escapeHtml(s.name)}" ${state.selectedSubjectFilter === s.name ? 'selected' : ''}>${escapeHtml(s.name)}</option>`
      ).join('');
  }
}

function updateSidebarCounts() {
  const activeNotes = state.notes.filter(n => !n.deleted && !n.archived);
  const favoriteNotes = state.notes.filter(n => !n.deleted && !n.archived && n.favorite);
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  const recentNotes = state.notes.filter(n => !n.deleted && !n.archived && (n.updatedAt >= oneWeekAgo || n.createdAt >= oneWeekAgo));
  const archivedNotes = state.notes.filter(n => !n.deleted && n.archived);
  const trashNotes = state.notes.filter(n => n.deleted);

  safeSetText('countAll', activeNotes.length);
  safeSetText('countFavorites', favoriteNotes.length);
  safeSetText('countRecent', recentNotes.length);
  safeSetText('countArchived', archivedNotes.length);
  safeSetText('countTrash', trashNotes.length);

  // Profile stats
  safeSetText('profileNotesCount', state.notes.filter(n => !n.deleted).length);
  safeSetText('profileSubjectsCount', state.subjects.length);

  renderSubjectsNav();
}

function updateStats() {
  const activeNotes = state.notes.filter(n => !n.deleted && !n.archived);
  const favorites = activeNotes.filter(n => n.favorite);
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  const recent = activeNotes.filter(n => (n.updatedAt >= oneWeekAgo || n.createdAt >= oneWeekAgo));

  safeSetText('statTotalNotes', activeNotes.length);
  safeSetText('statFavorites', favorites.length);
  safeSetText('statRecentNotes', recent.length);
  safeSetText('statSubjects', state.subjects.length);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ==========================================================================
// Filtering, Sorting, and Rendering Notes
// ==========================================================================

function getFilteredAndSortedNotes() {
  let list = [...state.notes];

  // 1. View-based Filtering
  if (state.currentView === 'all') {
    list = list.filter(n => !n.deleted && !n.archived);
  } else if (state.currentView === 'favorites') {
    list = list.filter(n => !n.deleted && !n.archived && n.favorite);
  } else if (state.currentView === 'recent') {
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    list = list.filter(n => !n.deleted && !n.archived && (n.updatedAt >= oneWeekAgo || n.createdAt >= oneWeekAgo));
  } else if (state.currentView === 'archived') {
    list = list.filter(n => !n.deleted && n.archived);
  } else if (state.currentView === 'trash') {
    list = list.filter(n => n.deleted);
  } else if (state.currentView.startsWith('subject_')) {
    const subjectName = state.currentView.replace('subject_', '');
    list = list.filter(n => !n.deleted && !n.archived && n.subject === subjectName);
  }

  // 2. Subject Dropdown Filter
  if (state.selectedSubjectFilter && state.selectedSubjectFilter !== 'ALL') {
    list = list.filter(n => n.subject === state.selectedSubjectFilter);
  }

  // 3. Active Tag Filter
  if (state.activeTagFilter) {
    list = list.filter(n => n.tags && n.tags.includes(state.activeTagFilter));
  }

  // 4. Search Query Filter
  if (state.searchQuery && state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(n => {
      const matchTitle = (n.title || '').toLowerCase().includes(q);
      const matchContent = stripHtml(n.content || '').toLowerCase().includes(q);
      const matchSubject = (n.subject || '').toLowerCase().includes(q);
      const matchTags = (n.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchSubject || matchTags;
    });
  }

  // 5. Sorting
  list.sort((a, b) => {
    switch (state.sortBy) {
      case 'newest':
        return (b.createdAt || 0) - (a.createdAt || 0);
      case 'oldest':
        return (a.createdAt || 0) - (b.createdAt || 0);
      case 'updated':
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      case 'title_asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'title_desc':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  return list;
}

function renderNotes() {
  const container = document.getElementById('notesContainer');
  const emptyState = document.getElementById('emptyState');
  const currentViewTitle = document.getElementById('currentViewTitle');
  const resultsBadge = document.getElementById('resultsCountBadge');
  const emptyTrashBtn = document.getElementById('emptyTrashBtn');
  const activeFilterChips = document.getElementById('activeFilterChips');
  const chipsContainer = document.getElementById('chipsContainer');

  if (!container) return;

  // Update view title and subtitle
  let viewTitleText = 'All Notes';
  if (state.currentView === 'favorites') viewTitleText = '⭐ Starred Favorites';
  else if (state.currentView === 'recent') viewTitleText = '🕒 Recently Active Notes';
  else if (state.currentView === 'archived') viewTitleText = '📦 Archived Notes';
  else if (state.currentView === 'trash') viewTitleText = '🗑️ Trash (Deleted Notes)';
  else if (state.currentView.startsWith('subject_')) {
    viewTitleText = `📚 ${state.currentView.replace('subject_', '')}`;
  }

  if (currentViewTitle) currentViewTitle.textContent = viewTitleText;

  // Toggle Empty Trash button visibility
  if (emptyTrashBtn) {
    if (state.currentView === 'trash') {
      emptyTrashBtn.classList.remove('hidden');
    } else {
      emptyTrashBtn.classList.add('hidden');
    }
  }

  // Active filters chips
  const hasFilters = Boolean(state.searchQuery || (state.selectedSubjectFilter && state.selectedSubjectFilter !== 'ALL') || state.activeTagFilter);
  if (activeFilterChips && chipsContainer) {
    if (hasFilters) {
      activeFilterChips.classList.remove('hidden');
      let chipsHtml = '';
      if (state.searchQuery) {
        chipsHtml += `<span class="filter-chip">Search: "${escapeHtml(state.searchQuery)}"<span class="filter-chip-remove" data-clear="search">&times;</span></span>`;
      }
      if (state.selectedSubjectFilter && state.selectedSubjectFilter !== 'ALL') {
        chipsHtml += `<span class="filter-chip">Subject: ${escapeHtml(state.selectedSubjectFilter)}<span class="filter-chip-remove" data-clear="subject">&times;</span></span>`;
      }
      if (state.activeTagFilter) {
        chipsHtml += `<span class="filter-chip">Tag: #${escapeHtml(state.activeTagFilter)}<span class="filter-chip-remove" data-clear="tag">&times;</span></span>`;
      }
      chipsContainer.innerHTML = chipsHtml;
    } else {
      activeFilterChips.classList.add('hidden');
    }
  }

  const notesToRender = getFilteredAndSortedNotes();
  if (resultsBadge) resultsBadge.textContent = `${notesToRender.length} note${notesToRender.length === 1 ? '' : 's'}`;

  // Check if empty
  if (notesToRender.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    if (emptyState) {
      emptyState.classList.remove('hidden');
      renderEmptyState();
    }
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  container.classList.remove('hidden');

  container.className = `notes-container ${state.layout === 'list' ? 'list-layout' : 'grid-layout'}`;

  container.innerHTML = notesToRender.map(note => renderNoteCardHtml(note)).join('');
}

function renderNoteCardHtml(note) {
  const colorDef = getSubjectColor(note.subject);
  const plainText = stripHtml(note.content);
  const isTrash = Boolean(note.deleted);

  return `
    <article class="note-card" data-note-id="${escapeHtml(note.id)}" style="--accent-color: ${colorDef.border};">
      <div class="note-card-top">
        <span class="subject-badge" style="--subject-bg: ${colorDef.bg}; --subject-color: ${colorDef.text};">
          ${escapeHtml(note.subject || 'General')}
        </span>
        <div class="card-top-actions">
          ${!isTrash ? `
            <button class="star-card-btn ${note.favorite ? 'active' : ''}" data-action="favorite" data-id="${note.id}" title="${note.favorite ? 'Unstar note' : 'Star note'}" aria-label="Toggle star">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </button>
          ` : ''}
        </div>
      </div>

      <div class="note-card-body" data-action="open" data-id="${note.id}">
        <h3 class="note-card-title">${escapeHtml(note.title || 'Untitled Note')}</h3>
        <p class="note-card-preview">${escapeHtml(plainText || 'No content preview available.')}</p>
        
        ${note.tags && note.tags.length > 0 ? `
          <div class="note-card-tags">
            ${note.tags.slice(0, 4).map(t => `<span class="tag-pill" data-action="filter-tag" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`).join('')}
            ${note.tags.length > 4 ? `<span class="tag-pill">+${note.tags.length - 4}</span>` : ''}
          </div>
        ` : ''}
      </div>

      <div class="note-card-footer">
        <span class="note-time-info" title="Created: ${formatFullDate(note.createdAt)}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${formatRelativeTime(note.updatedAt || note.createdAt)}
        </span>

        <div class="card-action-btns">
          ${isTrash ? `
            <button class="card-action-btn" data-action="restore" data-id="${note.id}" title="Restore Note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
            </button>
            <button class="card-action-btn delete" data-action="delete-permanent" data-id="${note.id}" title="Delete Permanently">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          ` : `
            <button class="card-action-btn" data-action="edit" data-id="${note.id}" title="Edit Note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="card-action-btn" data-action="archive" data-id="${note.id}" title="${note.archived ? 'Unarchive' : 'Archive'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
            </button>
            <button class="card-action-btn delete" data-action="trash" data-id="${note.id}" title="Move to Trash">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          `}
        </div>
      </div>
    </article>
  `;
}

function renderEmptyState() {
  const titleEl = document.getElementById('emptyStateTitle');
  const descEl = document.getElementById('emptyStateDesc');
  const actionBtn = document.getElementById('emptyStateActionBtn');
  const iconEl = document.getElementById('emptyStateIcon');

  if (state.searchQuery) {
    if (titleEl) titleEl.textContent = `No notes found matching "${state.searchQuery}"`;
    if (descEl) descEl.textContent = 'Try adjusting your search terms or clearing active filters.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>Clear Search</span>`;
      actionBtn.onclick = () => {
        state.searchQuery = '';
        const input = document.getElementById('globalSearchInput');
        if (input) input.value = '';
        renderNotes();
      };
    }
  } else if (state.currentView === 'favorites') {
    if (titleEl) titleEl.textContent = 'No favorite notes yet';
    if (descEl) descEl.textContent = 'Click the star icon on any note card to pin your important lecture summaries here.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>Browse All Notes</span>`;
      actionBtn.onclick = () => setView('all');
    }
  } else if (state.currentView === 'recent') {
    if (titleEl) titleEl.textContent = 'No recent activity';
    if (descEl) descEl.textContent = 'Notes updated or created in the past 7 days will appear here.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>+ Create Note</span>`;
      actionBtn.onclick = () => openCreateNoteModal();
    }
  } else if (state.currentView === 'archived') {
    if (titleEl) titleEl.textContent = 'No archived notes';
    if (descEl) descEl.textContent = 'Archive completed course notes to keep your active workspace clutter-free.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>View Active Notes</span>`;
      actionBtn.onclick = () => setView('all');
    }
  } else if (state.currentView === 'trash') {
    if (titleEl) titleEl.textContent = 'Trash is empty';
    if (descEl) descEl.textContent = 'Deleted notes will be kept here safely so you can restore them anytime.';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>Back to Notes</span>`;
      actionBtn.onclick = () => setView('all');
    }
  } else if (state.currentView.startsWith('subject_')) {
    const subjectName = state.currentView.replace('subject_', '');
    if (titleEl) titleEl.textContent = `No notes in ${subjectName}`;
    if (descEl) descEl.textContent = `Get started by writing your first study note for ${subjectName}.`;
    if (actionBtn) {
      actionBtn.innerHTML = `<span>+ Add ${subjectName} Note</span>`;
      actionBtn.onclick = () => openCreateNoteModal(subjectName);
    }
  } else {
    if (titleEl) titleEl.textContent = 'No notes yet';
    if (descEl) descEl.textContent = 'Create your first study note and keep your knowledge organized!';
    if (actionBtn) {
      actionBtn.innerHTML = `<span>+ Create First Note</span>`;
      actionBtn.onclick = () => openCreateNoteModal();
    }
  }
}

function setView(view) {
  state.currentView = view;
  state.activeTagFilter = null;

  // Update Nav selection highlights
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });
  document.querySelectorAll('.subjects-list .subject-item').forEach(btn => {
    btn.classList.toggle('active', `subject_${btn.getAttribute('data-subject')}` === view);
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  renderNotes();
}

// ==========================================================================
// Note Editor (Create, Edit, Autosave)
// ==========================================================================

function openCreateNoteModal(presetSubject = null) {
  state.editingNoteId = null;
  state.editorTags = [];
  state.isEditorFavorite = false;

  const modal = document.getElementById('noteEditorModal');
  const titleInput = document.getElementById('noteTitleInput');
  const contentArea = document.getElementById('noteContentEditable');
  const subjectSelect = document.getElementById('noteSubjectSelect');
  const modalTitle = document.getElementById('editorModalTitle');
  const favoriteToggle = document.getElementById('editorFavoriteToggle');
  const autosaveText = document.getElementById('autosaveText');

  if (modalTitle) modalTitle.textContent = 'New Study Note';
  if (titleInput) titleInput.value = '';
  if (contentArea) contentArea.innerHTML = '';
  if (autosaveText) autosaveText.textContent = 'Ready';

  if (subjectSelect) {
    if (presetSubject) {
      subjectSelect.value = presetSubject;
    } else if (state.currentView.startsWith('subject_')) {
      subjectSelect.value = state.currentView.replace('subject_', '');
    } else if (state.subjects.length > 0) {
      subjectSelect.value = state.subjects[0].name;
    }
  }

  if (favoriteToggle) {
    favoriteToggle.classList.remove('active');
  }

  renderEditorTagChips();
  updateEditorWordCount();

  if (modal) modal.classList.remove('hidden');
  setTimeout(() => titleInput && titleInput.focus(), 100);
}

function openEditNoteModal(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  state.editingNoteId = note.id;
  state.editorTags = [...(note.tags || [])];
  state.isEditorFavorite = Boolean(note.favorite);

  const modal = document.getElementById('noteEditorModal');
  const titleInput = document.getElementById('noteTitleInput');
  const contentArea = document.getElementById('noteContentEditable');
  const subjectSelect = document.getElementById('noteSubjectSelect');
  const modalTitle = document.getElementById('editorModalTitle');
  const favoriteToggle = document.getElementById('editorFavoriteToggle');
  const autosaveText = document.getElementById('autosaveText');

  if (modalTitle) modalTitle.textContent = 'Edit Note';
  if (titleInput) titleInput.value = note.title || '';
  if (contentArea) contentArea.innerHTML = note.content || '';
  if (subjectSelect) subjectSelect.value = note.subject || state.subjects[0]?.name;
  if (autosaveText) autosaveText.textContent = 'Saved';

  if (favoriteToggle) {
    favoriteToggle.classList.toggle('active', state.isEditorFavorite);
  }

  renderEditorTagChips();
  updateEditorWordCount();

  // Close detail view if open
  closeNoteDetail();

  if (modal) modal.classList.remove('hidden');
  setTimeout(() => contentArea && contentArea.focus(), 100);
}

function closeEditor() {
  const modal = document.getElementById('noteEditorModal');
  if (modal) modal.classList.add('hidden');
  clearTimeout(state.autosaveTimer);
}

function renderEditorTagChips() {
  const container = document.getElementById('editorTagChips');
  if (!container) return;

  container.innerHTML = state.editorTags.map((tag, idx) => `
    <span class="tag-chip-item">
      #${escapeHtml(tag)}
      <span class="tag-chip-del" data-tag-idx="${idx}">&times;</span>
    </span>
  `).join('');
}

function addTagToEditor(rawTag) {
  const tag = rawTag.replace(/^#/, '').trim().toLowerCase();
  if (tag && !state.editorTags.includes(tag)) {
    state.editorTags.push(tag);
    renderEditorTagChips();
    triggerAutosave();
  }
}

function removeTagFromEditor(idx) {
  state.editorTags.splice(idx, 1);
  renderEditorTagChips();
  triggerAutosave();
}

function updateEditorWordCount() {
  const contentArea = document.getElementById('noteContentEditable');
  const counterEl = document.getElementById('editorCharCount');
  if (!contentArea || !counterEl) return;

  const text = contentArea.innerText || '';
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  counterEl.textContent = `${wordCount} word${wordCount === 1 ? '' : 's'}, ${charCount} char${charCount === 1 ? '' : 's'}`;
}

function triggerAutosave() {
  const badge = document.getElementById('editorAutosaveStatus');
  const autosaveText = document.getElementById('autosaveText');

  if (badge) badge.classList.add('saving');
  if (autosaveText) autosaveText.textContent = 'Saving...';

  clearTimeout(state.autosaveTimer);
  state.autosaveTimer = setTimeout(() => {
    performAutosave();
  }, 700);
}

function performAutosave() {
  const titleInput = document.getElementById('noteTitleInput');
  const contentArea = document.getElementById('noteContentEditable');
  const subjectSelect = document.getElementById('noteSubjectSelect');
  const badge = document.getElementById('editorAutosaveStatus');
  const autosaveText = document.getElementById('autosaveText');

  const title = (titleInput?.value || '').trim();
  const content = (contentArea?.innerHTML || '').trim();
  const subject = subjectSelect?.value || 'Other';

  // Only autosave if there is at least some content or title
  if (!title && !content) {
    if (badge) badge.classList.remove('saving');
    if (autosaveText) autosaveText.textContent = 'Ready';
    return;
  }

  const now = Date.now();

  if (state.editingNoteId) {
    // Update existing note
    const note = state.notes.find(n => n.id === state.editingNoteId);
    if (note) {
      note.title = title || 'Untitled Note';
      note.content = content;
      note.subject = subject;
      note.tags = [...state.editorTags];
      note.favorite = state.isEditorFavorite;
      note.updatedAt = now;
      saveNotes();
    }
  } else {
    // New draft note - create an ID once so next autosaves update the same record
    const newId = `note_${Date.now()}`;
    const newNote = {
      id: newId,
      title: title || 'Untitled Note',
      content: content,
      subject: subject,
      tags: [...state.editorTags],
      favorite: state.isEditorFavorite,
      archived: false,
      deleted: false,
      createdAt: now,
      updatedAt: now
    };
    state.notes.unshift(newNote);
    state.editingNoteId = newId;
    saveNotes();
  }

  if (badge) badge.classList.remove('saving');
  if (autosaveText) autosaveText.textContent = 'Saved';
  renderNotes();
}

function saveNoteManual() {
  const titleInput = document.getElementById('noteTitleInput');
  const contentArea = document.getElementById('noteContentEditable');
  const subjectSelect = document.getElementById('noteSubjectSelect');

  const title = (titleInput?.value || '').trim();
  const content = (contentArea?.innerHTML || '').trim();
  const subject = subjectSelect?.value || 'Other';

  if (!title && !content) {
    showToast('Please enter a title or note content', 'warning');
    return;
  }

  const now = Date.now();

  if (state.editingNoteId) {
    const note = state.notes.find(n => n.id === state.editingNoteId);
    if (note) {
      note.title = title || 'Untitled Note';
      note.content = content;
      note.subject = subject;
      note.tags = [...state.editorTags];
      note.favorite = state.isEditorFavorite;
      note.updatedAt = now;
      saveNotes();
      showToast('Note updated successfully', 'success');
    }
  } else {
    const newNote = {
      id: `note_${Date.now()}`,
      title: title || 'Untitled Note',
      content: content,
      subject: subject,
      tags: [...state.editorTags],
      favorite: state.isEditorFavorite,
      archived: false,
      deleted: false,
      createdAt: now,
      updatedAt: now
    };
    state.notes.unshift(newNote);
    saveNotes();
    showToast('Note created successfully', 'success');
  }

  closeEditor();
  renderNotes();
}

// ==========================================================================
// Note Actions (Favorite, Archive, Delete, Restore, Permanently Delete)
// ==========================================================================

function toggleFavorite(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  note.favorite = !note.favorite;
  note.updatedAt = Date.now();
  saveNotes();
  renderNotes();

  // If detail view is open, update its star
  if (state.viewingNoteId === noteId) {
    const detailStar = document.getElementById('detailFavoriteBtn');
    if (detailStar) detailStar.classList.toggle('active', note.favorite);
  }

  showToast(note.favorite ? 'Added to favorites ⭐' : 'Removed from favorites', 'info');
}

function toggleArchive(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  note.archived = !note.archived;
  note.updatedAt = Date.now();
  saveNotes();
  renderNotes();

  if (state.viewingNoteId === noteId) {
    closeNoteDetail();
  }

  showToast(note.archived ? 'Note moved to archive 📦' : 'Note unarchived', 'info');
}

function moveToTrash(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  note.deleted = true;
  note.updatedAt = Date.now();
  saveNotes();
  renderNotes();

  if (state.viewingNoteId === noteId) {
    closeNoteDetail();
  }

  showToast('Note moved to trash 🗑️', 'info');
}

function restoreNote(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  note.deleted = false;
  note.updatedAt = Date.now();
  saveNotes();
  renderNotes();

  showToast('Note restored successfully ✅', 'success');
}

function promptPermanentDelete(noteId) {
  state.pendingDeleteNoteId = noteId;
  state.isClearingTrash = false;

  const modal = document.getElementById('confirmModal');
  const titleEl = document.getElementById('confirmTitle');
  const descEl = document.getElementById('confirmDesc');
  const actionBtn = document.getElementById('confirmActionBtn');

  if (titleEl) titleEl.textContent = 'Delete this note permanently?';
  if (descEl) descEl.textContent = 'This action cannot be undone and will permanently erase this note.';
  if (actionBtn) actionBtn.textContent = 'Delete Permanently';

  if (modal) modal.classList.remove('hidden');
}

function promptEmptyTrash() {
  const trashNotes = state.notes.filter(n => n.deleted);
  if (trashNotes.length === 0) {
    showToast('Trash is already empty', 'info');
    return;
  }

  state.pendingDeleteNoteId = null;
  state.isClearingTrash = true;

  const modal = document.getElementById('confirmModal');
  const titleEl = document.getElementById('confirmTitle');
  const descEl = document.getElementById('confirmDesc');
  const actionBtn = document.getElementById('confirmActionBtn');

  if (titleEl) titleEl.textContent = 'Empty entire trash?';
  if (descEl) descEl.textContent = `Permanently delete all ${trashNotes.length} item${trashNotes.length === 1 ? '' : 's'} in the trash? This cannot be undone.`;
  if (actionBtn) actionBtn.textContent = 'Empty Trash';

  if (modal) modal.classList.remove('hidden');
}

function executeConfirmedDelete() {
  const modal = document.getElementById('confirmModal');
  if (modal) modal.classList.add('hidden');

  if (state.isClearingTrash) {
    state.notes = state.notes.filter(n => !n.deleted);
    saveNotes();
    renderNotes();
    showToast('Trash has been emptied', 'success');
  } else if (state.pendingDeleteNoteId) {
    state.notes = state.notes.filter(n => n.id !== state.pendingDeleteNoteId);
    saveNotes();
    renderNotes();
    showToast('Note permanently deleted', 'danger');
  }

  state.pendingDeleteNoteId = null;
  state.isClearingTrash = false;
}

// ==========================================================================
// Note Detail (Reading View)
// ==========================================================================

function openNoteDetail(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;

  state.viewingNoteId = note.id;

  const modal = document.getElementById('noteDetailModal');
  const titleEl = document.getElementById('detailTitle');
  const subjectEl = document.getElementById('detailSubject');
  const createdEl = document.getElementById('detailCreatedDate');
  const updatedEl = document.getElementById('detailUpdatedDate');
  const tagsRow = document.getElementById('detailTagsRow');
  const contentEl = document.getElementById('detailContent');
  const favoriteBtn = document.getElementById('detailFavoriteBtn');
  const archiveBtn = document.getElementById('detailArchiveBtn');

  if (titleEl) titleEl.textContent = note.title || 'Untitled Note';
  if (subjectEl) {
    const colorDef = getSubjectColor(note.subject);
    subjectEl.textContent = note.subject || 'General';
    subjectEl.style.backgroundColor = colorDef.bg;
    subjectEl.style.color = colorDef.text;
  }

  if (createdEl) createdEl.textContent = formatFullDate(note.createdAt);
  if (updatedEl) updatedEl.textContent = formatRelativeTime(note.updatedAt || note.createdAt);

  if (favoriteBtn) {
    favoriteBtn.classList.toggle('active', Boolean(note.favorite));
  }

  if (archiveBtn) {
    archiveBtn.title = note.archived ? 'Unarchive Note' : 'Archive Note';
  }

  if (tagsRow) {
    tagsRow.innerHTML = (note.tags || []).map(t => 
      `<span class="tag-pill" data-action="filter-tag" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`
    ).join('');
  }

  if (contentEl) {
    contentEl.innerHTML = note.content || '<p><em>No content in this note.</em></p>';
  }

  if (modal) modal.classList.remove('hidden');
}

function closeNoteDetail() {
  state.viewingNoteId = null;
  const modal = document.getElementById('noteDetailModal');
  if (modal) modal.classList.add('hidden');
}

// ==========================================================================
// Add Subject Modal
// ==========================================================================

function openAddSubjectModal() {
  const modal = document.getElementById('addSubjectModal');
  const input = document.getElementById('newSubjectNameInput');
  if (input) input.value = '';
  state.selectedSubjectColor = 'blue';

  document.querySelectorAll('#colorPaletteOptions .color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('data-color') === 'blue');
  });

  if (modal) modal.classList.remove('hidden');
  setTimeout(() => input && input.focus(), 100);
}

function closeAddSubjectModal() {
  const modal = document.getElementById('addSubjectModal');
  if (modal) modal.classList.add('hidden');
}

function createNewSubject() {
  const input = document.getElementById('newSubjectNameInput');
  const name = (input?.value || '').trim();

  if (!name) {
    showToast('Please enter a subject name', 'warning');
    return;
  }

  if (state.subjects.some(s => s.name.toLowerCase() === name.toLowerCase())) {
    showToast('Subject already exists', 'warning');
    return;
  }

  const newSub = {
    id: `sub_${Date.now()}`,
    name: name,
    color: state.selectedSubjectColor || 'blue'
  };

  state.subjects.push(newSub);
  saveSubjects();
  renderSubjectsNav();
  populateSubjectDropdowns();
  updateSidebarCounts();
  closeAddSubjectModal();

  showToast(`Subject "${name}" created`, 'success');
}

// ==========================================================================
// Toast System
// ==========================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'danger') {
    iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  } else if (type === 'warning') {
    iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
  } else {
    iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <span class="toast-msg">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Rich Text Formatting Commands
// ==========================================================================

function executeFormat(command, value = null) {
  const contentArea = document.getElementById('noteContentEditable');
  if (!contentArea) return;
  contentArea.focus();

  if (command === 'formatBlock') {
    document.execCommand('formatBlock', false, `<${value}>`);
  } else {
    document.execCommand(command, false, value);
  }
  triggerAutosave();
  updateEditorWordCount();
}

function insertHighlight() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  
  const range = selection.getRangeAt(0);
  if (range.collapsed) {
    showToast('Highlight text first with your cursor', 'info');
    return;
  }

  const mark = document.createElement('mark');
  mark.appendChild(range.extractContents());
  range.insertNode(mark);
  triggerAutosave();
}

function insertCodeBlock() {
  const contentArea = document.getElementById('noteContentEditable');
  if (!contentArea) return;
  contentArea.focus();

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = '// Insert your study code or formula here\n';
  pre.appendChild(code);

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(pre);
  } else {
    contentArea.appendChild(pre);
  }
  triggerAutosave();
}

// ==========================================================================
// Export & Sample Data Reset
// ==========================================================================

function exportNotesAsJson() {
  const data = {
    appName: 'EduNexa Notes',
    exportedAt: new Date().toISOString(),
    subjects: state.subjects,
    notes: state.notes
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `studymate_notes_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Notes exported to JSON file', 'success');
}

function resetSampleData() {
  if (confirm('Reload sample notes? This will add back the starter student notes.')) {
    state.notes = [...SAMPLE_NOTES];
    state.subjects = [...DEFAULT_SUBJECTS];
    saveNotes();
    saveSubjects();
    renderSubjectsNav();
    populateSubjectDropdowns();
    renderNotes();
    showToast('Sample student notes reloaded', 'success');
  }
}

// ==========================================================================
// Mobile Sidebar Drawer Helpers
// ==========================================================================

function openMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.add('mobile-open');
  if (backdrop) backdrop.classList.add('active');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
}

// ==========================================================================
// HTML Sanitization / Escape
// ==========================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Event Listeners Wiring
// ==========================================================================

function setupEventListeners() {
  // 1. Navigation & Theme
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar?.classList.contains('mobile-open')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  document.getElementById('sidebarBackdrop')?.addEventListener('click', closeMobileSidebar);

  // Global New Note Buttons
  document.getElementById('newNoteNavBtn')?.addEventListener('click', () => openCreateNoteModal());
  document.getElementById('createNoteMainBtn')?.addEventListener('click', () => openCreateNoteModal());

  // Search Input
  const searchInput = document.getElementById('globalSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('hidden', !state.searchQuery);
      }
      renderNotes();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      searchClearBtn.classList.add('hidden');
      renderNotes();
    });
  }

  // Keyboard shortcut Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      const editorModal = document.getElementById('noteEditorModal');
      if (editorModal && !editorModal.classList.contains('hidden')) {
        e.preventDefault();
        saveNoteManual();
      }
    }
    if (e.key === 'Escape') {
      closeEditor();
      closeNoteDetail();
      closeAddSubjectModal();
      document.getElementById('confirmModal')?.classList.add('hidden');
      document.getElementById('notificationMenu')?.classList.add('hidden');
      document.getElementById('profileMenu')?.classList.add('hidden');
    }
  });

  // Dropdowns (Notification & Profile)
  const notifBtn = document.getElementById('notificationBtn');
  const notifMenu = document.getElementById('notificationMenu');
  const profileBtn = document.getElementById('userProfileBtn');
  const profileMenu = document.getElementById('profileMenu');

  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu?.classList.add('hidden');
    notifMenu?.classList.toggle('hidden');
  });

  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifMenu?.classList.add('hidden');
    profileMenu?.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    notifMenu?.classList.add('hidden');
    profileMenu?.classList.add('hidden');
  });

  document.getElementById('exportDataBtn')?.addEventListener('click', exportNotesAsJson);
  document.getElementById('resetSampleDataBtn')?.addEventListener('click', resetSampleData);

  // Sidebar Nav Items
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      if (view) setView(view);
    });
  });

  // Subject Navigation items via event delegation
  document.getElementById('subjectsNavList')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.subject-item');
    if (btn) {
      const subject = btn.getAttribute('data-subject');
      if (subject) setView(`subject_${subject}`);
    }
  });

  // Add Subject Triggers
  document.getElementById('addSubjectTriggerBtn')?.addEventListener('click', openAddSubjectModal);
  document.getElementById('closeAddSubjectBtn')?.addEventListener('click', closeAddSubjectModal);
  document.getElementById('cancelAddSubjectBtn')?.addEventListener('click', closeAddSubjectModal);
  document.getElementById('confirmAddSubjectBtn')?.addEventListener('click', createNewSubject);

  // Color dots inside Add Subject Modal
  document.getElementById('colorPaletteOptions')?.addEventListener('click', (e) => {
    const dot = e.target.closest('.color-dot');
    if (dot) {
      document.querySelectorAll('#colorPaletteOptions .color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.selectedSubjectColor = dot.getAttribute('data-color');
    }
  });

  // Sort & Subject Filter Dropdowns
  document.getElementById('sortBySelect')?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderNotes();
  });

  document.getElementById('subjectFilterSelect')?.addEventListener('change', (e) => {
    state.selectedSubjectFilter = e.target.value;
    renderNotes();
  });

  // Layout View Toggles (Grid / List)
  const gridBtn = document.getElementById('layoutGridBtn');
  const listBtn = document.getElementById('layoutListBtn');

  gridBtn?.addEventListener('click', () => {
    state.layout = 'grid';
    gridBtn.classList.add('active');
    listBtn?.classList.remove('active');
    renderNotes();
  });

  listBtn?.addEventListener('click', () => {
    state.layout = 'list';
    listBtn.classList.add('active');
    gridBtn?.classList.remove('active');
    renderNotes();
  });

  // Active Filter Chips Clear Actions
  document.getElementById('activeFilterChips')?.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('.filter-chip-remove');
    if (clearBtn) {
      const type = clearBtn.getAttribute('data-clear');
      if (type === 'search') {
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
      } else if (type === 'subject') {
        state.selectedSubjectFilter = 'ALL';
        const subSelect = document.getElementById('subjectFilterSelect');
        if (subSelect) subSelect.value = 'ALL';
      } else if (type === 'tag') {
        state.activeTagFilter = null;
      }
      renderNotes();
    }
  });

  document.getElementById('clearAllFiltersBtn')?.addEventListener('click', () => {
    state.searchQuery = '';
    state.selectedSubjectFilter = 'ALL';
    state.activeTagFilter = null;
    if (searchInput) searchInput.value = '';
    const subSelect = document.getElementById('subjectFilterSelect');
    if (subSelect) subSelect.value = 'ALL';
    renderNotes();
  });

  // Empty Trash Button
  document.getElementById('emptyTrashBtn')?.addEventListener('click', promptEmptyTrash);

  // Confirm Modal Actions
  document.getElementById('confirmCancelBtn')?.addEventListener('click', () => {
    document.getElementById('confirmModal')?.classList.add('hidden');
    state.pendingDeleteNoteId = null;
    state.isClearingTrash = false;
  });
  document.getElementById('confirmActionBtn')?.addEventListener('click', executeConfirmedDelete);

  // Note Card Event Delegation
  document.getElementById('notesContainer')?.addEventListener('click', (e) => {
    const starBtn = e.target.closest('[data-action="favorite"]');
    if (starBtn) {
      e.stopPropagation();
      const id = starBtn.getAttribute('data-id');
      toggleFavorite(id);
      return;
    }

    const editBtn = e.target.closest('[data-action="edit"]');
    if (editBtn) {
      e.stopPropagation();
      const id = editBtn.getAttribute('data-id');
      openEditNoteModal(id);
      return;
    }

    const archiveBtn = e.target.closest('[data-action="archive"]');
    if (archiveBtn) {
      e.stopPropagation();
      const id = archiveBtn.getAttribute('data-id');
      toggleArchive(id);
      return;
    }

    const trashBtn = e.target.closest('[data-action="trash"]');
    if (trashBtn) {
      e.stopPropagation();
      const id = trashBtn.getAttribute('data-id');
      moveToTrash(id);
      return;
    }

    const restoreBtn = e.target.closest('[data-action="restore"]');
    if (restoreBtn) {
      e.stopPropagation();
      const id = restoreBtn.getAttribute('data-id');
      restoreNote(id);
      return;
    }

    const delPermBtn = e.target.closest('[data-action="delete-permanent"]');
    if (delPermBtn) {
      e.stopPropagation();
      const id = delPermBtn.getAttribute('data-id');
      promptPermanentDelete(id);
      return;
    }

    const tagPill = e.target.closest('[data-action="filter-tag"]');
    if (tagPill) {
      e.stopPropagation();
      const tag = tagPill.getAttribute('data-tag');
      state.activeTagFilter = tag;
      renderNotes();
      return;
    }

    const card = e.target.closest('.note-card');
    if (card) {
      const noteId = card.getAttribute('data-note-id');
      if (noteId) openNoteDetail(noteId);
    }
  });

  // Editor Modal Events
  document.getElementById('closeEditorBtn')?.addEventListener('click', closeEditor);
  document.getElementById('cancelEditorBtn')?.addEventListener('click', closeEditor);
  document.getElementById('saveNoteBtn')?.addEventListener('click', saveNoteManual);

  document.getElementById('editorFavoriteToggle')?.addEventListener('click', () => {
    state.isEditorFavorite = !state.isEditorFavorite;
    document.getElementById('editorFavoriteToggle')?.classList.toggle('active', state.isEditorFavorite);
    triggerAutosave();
  });

  // Editor Live Input Listeners for Autosave
  document.getElementById('noteTitleInput')?.addEventListener('input', triggerAutosave);
  document.getElementById('noteSubjectSelect')?.addEventListener('change', triggerAutosave);
  
  const contentArea = document.getElementById('noteContentEditable');
  if (contentArea) {
    contentArea.addEventListener('input', () => {
      triggerAutosave();
      updateEditorWordCount();
    });
  }

  // Tags Input in Editor
  const tagsInput = document.getElementById('noteTagsInput');
  if (tagsInput) {
    tagsInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTagToEditor(tagsInput.value);
        tagsInput.value = '';
      }
    });
    tagsInput.addEventListener('blur', () => {
      if (tagsInput.value.trim()) {
        addTagToEditor(tagsInput.value);
        tagsInput.value = '';
      }
    });
  }

  document.getElementById('editorTagChips')?.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.tag-chip-del');
    if (delBtn) {
      const idx = parseInt(delBtn.getAttribute('data-tag-idx'), 10);
      removeTagFromEditor(idx);
    }
  });

  // Rich Text Toolbar
  document.getElementById('editorToolbar')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.toolbar-btn');
    if (!btn) return;

    if (btn.id === 'highlightBtn') {
      insertHighlight();
      return;
    }

    if (btn.id === 'insertCodeBtn') {
      insertCodeBlock();
      return;
    }

    const cmd = btn.getAttribute('data-command');
    const val = btn.getAttribute('data-val') || null;
    if (cmd) {
      executeFormat(cmd, val);
    }
  });

  // Note Detail Modal Actions
  document.getElementById('detailBackBtn')?.addEventListener('click', closeNoteDetail);
  document.getElementById('detailCloseBtn')?.addEventListener('click', closeNoteDetail);
  document.getElementById('detailDoneBtn')?.addEventListener('click', closeNoteDetail);

  document.getElementById('detailFavoriteBtn')?.addEventListener('click', () => {
    if (state.viewingNoteId) toggleFavorite(state.viewingNoteId);
  });

  document.getElementById('detailArchiveBtn')?.addEventListener('click', () => {
    if (state.viewingNoteId) toggleArchive(state.viewingNoteId);
  });

  document.getElementById('detailEditBtn')?.addEventListener('click', () => {
    if (state.viewingNoteId) openEditNoteModal(state.viewingNoteId);
  });

  document.getElementById('detailDeleteBtn')?.addEventListener('click', () => {
    if (state.viewingNoteId) moveToTrash(state.viewingNoteId);
  });

  document.getElementById('detailPrintBtn')?.addEventListener('click', () => {
    window.print();
  });
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeApp);
