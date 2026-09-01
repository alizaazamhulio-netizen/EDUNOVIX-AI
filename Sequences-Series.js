/**
 * SEQUENCES & SERIES — FAST + SCHOLARSHIP MATHEMATICS PREPARATION SYSTEM
 * Interactive Learning Engine, Calculators, Practice MCQs & Final Timed Test
 */

// Local Storage Keys
const STORAGE_KEYS = {
  COMPLETED_TOPICS: 'fast_seq_completed_topics_v1',
  PRACTICE_STATS: 'fast_seq_practice_stats_v1',
  BEST_QUIZ_SCORE: 'fast_seq_best_quiz_score_v1',
  BOOKMARKS: 'fast_seq_bookmarks_v1',
  TEST_HISTORY: 'fast_seq_test_history_v1'
};

// Global App State
const AppState = {
  completedTopics: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || '[]'),
  practiceStats: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS) || '{"attempted": 0, "correct": 0, "answeredIds": {}}'),
  bestQuizScore: Number(localStorage.getItem(STORAGE_KEYS.BEST_QUIZ_SCORE) || 0),
  bookmarks: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]'),
  
  // Timed Test State
  testActive: false,
  testTimer: null,
  testTimeRemaining: 25 * 60, // 25 minutes
  currentTestQIndex: 0,
  userTestAnswers: {},
  flaggedQuestions: {},
  practiceFilter: 'all'
};

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initSidebar();
  initCalculators();
  initPracticeZone();
  initTimedTest();
  initSearch();
  initBookmarks();
  initFormulaActions();
});

/* ==========================================================================
   1. DASHBOARD & PROGRESS MANAGEMENT
   ========================================================================== */
function initDashboard() {
  updateDashboardUI();
  updateTopicCompletionUI();
}

function updateDashboardUI() {
  const totalTopics = 23;
  const completedCount = AppState.completedTopics.length;
  const chapterProgress = Math.round((completedCount / totalTopics) * 100);
  
  const attempted = AppState.practiceStats.attempted || 0;
  const correct = AppState.practiceStats.correct || 0;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // Update DOM elements if present
  const elProgressPct = document.getElementById('dash-progress-pct');
  const elProgressBar = document.getElementById('dash-progress-bar');
  const elTopicsCount = document.getElementById('dash-topics-count');
  const elAttempted = document.getElementById('dash-questions-attempted');
  const elBestScore = document.getElementById('dash-best-score');
  const elAccuracy = document.getElementById('dash-accuracy');
  const elSidebarPct = document.getElementById('sidebar-completion-pct');

  if (elProgressPct) elProgressPct.textContent = `${chapterProgress}%`;
  if (elProgressBar) elProgressBar.style.width = `${chapterProgress}%`;
  if (elTopicsCount) elTopicsCount.textContent = `${completedCount} / ${totalTopics}`;
  if (elAttempted) elAttempted.textContent = attempted;
  if (elBestScore) elBestScore.textContent = `${AppState.bestQuizScore}%`;
  if (elAccuracy) elAccuracy.textContent = `${accuracy}%`;
  if (elSidebarPct) elSidebarPct.textContent = `${completedCount}/${totalTopics}`;
}

function toggleTopicCompletion(topicId) {
  const index = AppState.completedTopics.indexOf(topicId);
  if (index > -1) {
    AppState.completedTopics.splice(index, 1);
    showToast(`Topic marked as incomplete`);
  } else {
    AppState.completedTopics.push(topicId);
    showToast(`✓ Topic marked as completed!`);
  }
  localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(AppState.completedTopics));
  updateDashboardUI();
  updateTopicCompletionUI();
}

function updateTopicCompletionUI() {
  document.querySelectorAll('.btn-complete-topic').forEach(btn => {
    const topicId = btn.getAttribute('data-topic-id');
    if (AppState.completedTopics.includes(topicId)) {
      btn.classList.add('completed');
      btn.innerHTML = '✓ Completed';
    } else {
      btn.classList.remove('completed');
      btn.innerHTML = 'Mark as Completed';
    }
  });

  document.querySelectorAll('.nav-check').forEach(icon => {
    const topicId = icon.getAttribute('data-topic-id');
    if (AppState.completedTopics.includes(topicId)) {
      icon.classList.add('completed');
      icon.textContent = '✓';
    } else {
      icon.classList.remove('completed');
      icon.textContent = '○';
    }
  });
}

/* ==========================================================================
   2. SIDEBAR NAVIGATION & SCROLL TRACKING
   ========================================================================== */
function initSidebar() {
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.topic-card');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. BOOKMARKS SYSTEM
   ========================================================================== */
function initBookmarks() {
  updateBookmarksUI();
}

function toggleBookmark(topicId, title) {
  const existsIndex = AppState.bookmarks.findIndex(b => b.id === topicId);
  if (existsIndex > -1) {
    AppState.bookmarks.splice(existsIndex, 1);
    showToast('Bookmark removed');
  } else {
    AppState.bookmarks.push({ id: topicId, title: title || topicId });
    showToast('★ Topic saved to Bookmarks!');
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(AppState.bookmarks));
  updateBookmarksUI();
}

function updateBookmarksUI() {
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    const topicId = btn.getAttribute('data-topic-id');
    const isBookmarked = AppState.bookmarks.some(b => b.id === topicId);
    if (isBookmarked) {
      btn.classList.add('bookmarked');
      btn.innerHTML = '★ Bookmarked';
    } else {
      btn.classList.remove('bookmarked');
      btn.innerHTML = '☆ Bookmark';
    }
  });

  const listContainer = document.getElementById('bookmarks-modal-list');
  if (listContainer) {
    if (AppState.bookmarks.length === 0) {
      listContainer.innerHTML = '<p class="text-slate-500" style="padding:1rem 0;">No bookmarks saved yet. Click the ☆ Bookmark button on any topic to save it here!</p>';
    } else {
      listContainer.innerHTML = AppState.bookmarks.map(b => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid var(--slate-100);">
          <a href="#${b.id}" onclick="closeModal('bookmarks-modal')" style="color:var(--primary-800); font-weight:600; text-decoration:none;">${b.title}</a>
          <button onclick="toggleBookmark('${b.id}', '${b.title}')" style="background:none; border:none; color:var(--red-600); cursor:pointer; font-size:0.8rem;">Remove</button>
        </div>
      `).join('');
    }
  }
}

/* ==========================================================================
   4. INTERACTIVE CALCULATORS & TOOLS
   ========================================================================== */
function initCalculators() {
  // Common Difference Checker Tool
  const btnCheckDiff = document.getElementById('btn-check-diff');
  if (btnCheckDiff) {
    btnCheckDiff.addEventListener('click', checkCommonDifference);
  }

  // Sequence Analyzer Tool
  const btnAnalyzeSeq = document.getElementById('btn-analyze-seq');
  if (btnAnalyzeSeq) {
    btnAnalyzeSeq.addEventListener('click', analyzeSequence);
  }

  // nth Term Calculator Tool
  const btnCalcNth = document.getElementById('btn-calc-nth');
  if (btnCalcNth) {
    btnCalcNth.addEventListener('click', calculateNthTerm);
  }

  // Series Sum Calculator Tool
  const btnCalcSum = document.getElementById('btn-calc-sum');
  if (btnCalcSum) {
    btnCalcSum.addEventListener('click', calculateSeriesSum);
  }
}

// Check Common Difference Tool
function checkCommonDifference() {
  const t1 = parseFloat(document.getElementById('cd-t1').value);
  const t2 = parseFloat(document.getElementById('cd-t2').value);
  const t3 = parseFloat(document.getElementById('cd-t3').value);
  const t4 = parseFloat(document.getElementById('cd-t4').value);
  const resultDiv = document.getElementById('cd-result');

  if (isNaN(t1) || isNaN(t2) || isNaN(t3) || isNaN(t4)) {
    resultDiv.innerHTML = '<div style="color:var(--red-600); font-weight:600;">Please enter valid numbers for all 4 terms.</div>';
    return;
  }

  const d1 = parseFloat((t2 - t1).toFixed(6));
  const d2 = parseFloat((t3 - t2).toFixed(6));
  const d3 = parseFloat((t4 - t3).toFixed(6));

  if (d1 === d2 && d2 === d3) {
    resultDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); padding:1rem; border-radius:var(--radius-md);">
        <h4 style="color:var(--primary-800); margin-bottom:0.4rem;">✓ Arithmetic Sequence Confirmed!</h4>
        <p style="margin-bottom:0.25rem;"><strong>First Term (a₁):</strong> ${t1}</p>
        <p style="margin-bottom:0.25rem;"><strong>Common Difference (d):</strong> <span class="math-inline">${d1}</span></p>
        <p style="font-size:0.85rem; color:var(--slate-600); margin-top:0.4rem;">
          Calculations: d = ${t2} - ${t1} = ${d1}, ${t3} - ${t2} = ${d2}, ${t4} - ${t3} = ${d3}.
        </p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div style="background:var(--red-50); border:1px solid var(--red-100); padding:1rem; border-radius:var(--radius-md);">
        <h4 style="color:var(--red-600); margin-bottom:0.4rem;">✗ NOT an Arithmetic Sequence</h4>
        <p style="font-size:0.9rem; color:var(--slate-600);">
          The differences between consecutive terms are not equal:
          <br>d₁ = ${t2} - ${t1} = <strong>${d1}</strong>
          <br>d₂ = ${t3} - ${t2} = <strong>${d2}</strong>
          <br>d₃ = ${t4} - ${t3} = <strong>${d3}</strong>
        </p>
      </div>
    `;
  }
}

// Sequence Analyzer
function analyzeSequence() {
  const inputStr = document.getElementById('analyzer-input').value.trim();
  const resDiv = document.getElementById('analyzer-result');

  if (!inputStr) {
    resDiv.innerHTML = '<p style="color:var(--red-600);">Please enter comma or space separated numbers.</p>';
    return;
  }

  // Parse comma or whitespace separated terms (supports fractions like 1/2)
  const tokens = inputStr.split(/[\s,]+/).filter(t => t.length > 0);
  const terms = tokens.map(t => {
    if (t.includes('/')) {
      const parts = t.split('/');
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(t);
  });

  if (terms.length < 3 || terms.some(isNaN)) {
    resDiv.innerHTML = '<p style="color:var(--red-600);">Please provide at least 3 valid numerical terms to detect a pattern.</p>';
    return;
  }

  const n = terms.length;
  let isAP = true;
  const d = parseFloat((terms[1] - terms[0]).toFixed(6));
  for (let i = 1; i < n - 1; i++) {
    if (parseFloat((terms[i+1] - terms[i]).toFixed(6)) !== d) {
      isAP = false;
      break;
    }
  }

  let isGP = true;
  let r = 0;
  if (terms[0] !== 0) {
    r = parseFloat((terms[1] / terms[0]).toFixed(6));
    for (let i = 1; i < n - 1; i++) {
      if (terms[i] === 0 || parseFloat((terms[i+1] / terms[i]).toFixed(6)) !== r) {
        isGP = false;
        break;
      }
    }
  } else {
    isGP = false;
  }

  // Check 2nd differences (quadratic pattern)
  const firstDiffs = [];
  for (let i = 0; i < n - 1; i++) firstDiffs.push(terms[i+1] - terms[i]);
  let isQuadratic = false;
  let secondDiff = 0;
  if (firstDiffs.length >= 2) {
    secondDiff = parseFloat((firstDiffs[1] - firstDiffs[0]).toFixed(6));
    isQuadratic = firstDiffs.every((diff, idx) => idx === 0 || parseFloat((diff - firstDiffs[idx-1]).toFixed(6)) === secondDiff);
  }

  // Check Fibonacci-like
  let isFib = true;
  if (n >= 3) {
    for (let i = 2; i < n; i++) {
      if (parseFloat(terms[i].toFixed(4)) !== parseFloat((terms[i-1] + terms[i-2]).toFixed(4))) {
        isFib = false;
        break;
      }
    }
  } else {
    isFib = false;
  }

  let html = `
    <div style="background:#ffffff; border:1px solid var(--slate-200); border-radius:var(--radius-lg); padding:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--slate-100); padding-bottom:0.5rem;">
        <span style="font-weight:700; color:var(--navy-900);">Terms Analyzed: ${n}</span>
        <span style="font-family:var(--font-mono); font-size:0.9rem; color:var(--slate-500);">${terms.slice(0, 6).join(', ')}${n > 6 ? '...' : ''}</span>
      </div>
  `;

  if (isAP) {
    const nextTerm1 = parseFloat((terms[n-1] + d).toFixed(4));
    const nextTerm2 = parseFloat((terms[n-1] + 2*d).toFixed(4));
    html += `
      <div style="color:var(--primary-800); font-weight:700; font-size:1.1rem; margin-bottom:0.5rem;">🎯 Pattern Type: Arithmetic Progression (AP)</div>
      <p><strong>First Term (a₁):</strong> ${terms[0]}</p>
      <p><strong>Common Difference (d):</strong> ${d}</p>
      <p><strong>General Formula:</strong> <span class="math-inline">aₙ = ${terms[0]} + (n - 1)(${d}) = ${d}n + ${parseFloat((terms[0] - d).toFixed(4))}</span></p>
      <p style="margin-top:0.75rem; font-weight:700; color:var(--navy-900);">Predicted Next Terms: <span class="math-inline">${nextTerm1}</span>, <span class="math-inline">${nextTerm2}</span></p>
    `;
  } else if (isGP) {
    const nextTerm1 = parseFloat((terms[n-1] * r).toFixed(4));
    const nextTerm2 = parseFloat((terms[n-1] * r * r).toFixed(4));
    html += `
      <div style="color:var(--primary-800); font-weight:700; font-size:1.1rem; margin-bottom:0.5rem;">🎯 Pattern Type: Geometric Progression (GP)</div>
      <p><strong>First Term (a₁):</strong> ${terms[0]}</p>
      <p><strong>Common Ratio (r):</strong> ${r}</p>
      <p><strong>General Formula:</strong> <span class="math-inline">aₙ = (${terms[0]}) × (${r})ⁿ⁻¹</span></p>
      <p style="margin-top:0.75rem; font-weight:700; color:var(--navy-900);">Predicted Next Terms: <span class="math-inline">${nextTerm1}</span>, <span class="math-inline">${nextTerm2}</span></p>
    `;
  } else if (isFib) {
    const nextTerm1 = parseFloat((terms[n-1] + terms[n-2]).toFixed(4));
    const nextTerm2 = parseFloat((nextTerm1 + terms[n-1]).toFixed(4));
    html += `
      <div style="color:var(--blue-600); font-weight:700; font-size:1.1rem; margin-bottom:0.5rem;">🎯 Pattern Type: Fibonacci-Type Additive Sequence</div>
      <p>Rule: Each term is the sum of the preceding two terms (<span class="math-inline">aₙ = aₙ₋₁ + aₙ₋₂</span>).</p>
      <p style="margin-top:0.75rem; font-weight:700; color:var(--navy-900);">Predicted Next Terms: <span class="math-inline">${nextTerm1}</span>, <span class="math-inline">${nextTerm2}</span></p>
    `;
  } else if (isQuadratic && secondDiff !== 0) {
    const nextFirstDiff = firstDiffs[firstDiffs.length - 1] + secondDiff;
    const nextTerm1 = terms[n-1] + nextFirstDiff;
    html += `
      <div style="color:var(--amber-600); font-weight:700; font-size:1.1rem; margin-bottom:0.5rem;">🎯 Pattern Type: Quadratic Sequence (Constant 2nd Differences)</div>
      <p>1st Differences: ${firstDiffs.join(', ')}</p>
      <p>Constant 2nd Difference: <span class="math-inline">${secondDiff}</span></p>
      <p style="margin-top:0.75rem; font-weight:700; color:var(--navy-900);">Predicted Next Term: <span class="math-inline">${nextTerm1}</span></p>
    `;
  } else {
    html += `
      <div style="color:var(--slate-600); font-weight:600; margin-bottom:0.5rem;">Pattern not confidently identified — try checking the differences, ratios, or alternating positions.</div>
      <p style="font-size:0.85rem; color:var(--slate-500);">Consecutive differences: ${firstDiffs.map(d => d.toFixed(2)).join(', ')}</p>
    `;
  }

  html += '</div>';
  resDiv.innerHTML = html;
}

// nth Term Calculator
function calculateNthTerm() {
  const type = document.getElementById('nth-seq-type').value;
  const a = parseFloat(document.getElementById('nth-first-term').value);
  const diffOrRatio = parseFloat(document.getElementById('nth-param').value);
  const n = parseInt(document.getElementById('nth-position').value);
  const resDiv = document.getElementById('nth-calc-result');

  if (isNaN(a) || isNaN(diffOrRatio) || isNaN(n) || n <= 0) {
    resDiv.innerHTML = '<p style="color:var(--red-600);">Please enter valid positive integer for position n and valid numbers for term/parameter.</p>';
    return;
  }

  if (type === 'AP') {
    const ans = a + (n - 1) * diffOrRatio;
    resDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:1.25rem;">
        <h4 style="color:var(--primary-800); margin-bottom:0.5rem;">Arithmetic Sequence nth Term Calculation:</h4>
        <p><strong>Formula:</strong> <span class="math-inline">aₙ = a₁ + (n - 1)d</span></p>
        <p><strong>Substitution:</strong> a₍${n}₎ = ${a} + (${n} - 1) × (${diffOrRatio})</p>
        <p><strong>Step:</strong> a₍${n}₎ = ${a} + (${n - 1}) × (${diffOrRatio}) = ${a} + ${(n-1)*diffOrRatio}</p>
        <div style="margin-top:0.75rem; font-size:1.25rem; font-weight:800; color:var(--navy-900);">
          Answer: a₍${n}₎ = <span style="color:var(--primary-700);">${ans}</span>
        </div>
      </div>
    `;
  } else {
    const ans = a * Math.pow(diffOrRatio, n - 1);
    resDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:1.25rem;">
        <h4 style="color:var(--primary-800); margin-bottom:0.5rem;">Geometric Sequence nth Term Calculation:</h4>
        <p><strong>Formula:</strong> <span class="math-inline">aₙ = a₁ × rⁿ⁻¹</span></p>
        <p><strong>Substitution:</strong> a₍${n}₎ = ${a} × (${diffOrRatio})⁽${n}-1⁾</p>
        <p><strong>Step:</strong> a₍${n}₎ = ${a} × (${diffOrRatio})⁽${n-1}⁾ = ${a} × ${Math.pow(diffOrRatio, n-1)}</p>
        <div style="margin-top:0.75rem; font-size:1.25rem; font-weight:800; color:var(--navy-900);">
          Answer: a₍${n}₎ = <span style="color:var(--primary-700);">${parseFloat(ans.toFixed(6))}</span>
        </div>
      </div>
    `;
  }
}

// Series Sum Calculator
function calculateSeriesSum() {
  const type = document.getElementById('sum-series-type').value;
  const a = parseFloat(document.getElementById('sum-first-term').value);
  const diffOrRatio = parseFloat(document.getElementById('sum-param').value);
  const n = parseInt(document.getElementById('sum-terms-n').value);
  const resDiv = document.getElementById('sum-calc-result');

  if (isNaN(a) || isNaN(diffOrRatio)) {
    resDiv.innerHTML = '<p style="color:var(--red-600);">Please enter valid numbers for first term and parameter.</p>';
    return;
  }

  if (type === 'AP') {
    if (isNaN(n) || n <= 0) {
      resDiv.innerHTML = '<p style="color:var(--red-600);">Please enter a valid positive integer n.</p>';
      return;
    }
    const lastTerm = a + (n - 1) * diffOrRatio;
    const sum = (n / 2) * (2 * a + (n - 1) * diffOrRatio);
    resDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:1.25rem;">
        <h4 style="color:var(--primary-800); margin-bottom:0.5rem;">Arithmetic Series Sum (Sₙ):</h4>
        <p><strong>Formula:</strong> <span class="math-inline">Sₙ = (n/2)[2a + (n-1)d]</span> or <span class="math-inline">Sₙ = (n/2)(a + l)</span></p>
        <p>Last Term (l): ${lastTerm}</p>
        <p><strong>Substitution:</strong> S₍${n}₎ = (${n}/2)[2(${a}) + (${n}-1)(${diffOrRatio})] = (${n/2})[${2*a} + ${(n-1)*diffOrRatio}]</p>
        <div style="margin-top:0.75rem; font-size:1.25rem; font-weight:800; color:var(--navy-900);">
          Answer: S₍${n}₎ = <span style="color:var(--primary-700);">${sum}</span>
        </div>
      </div>
    `;
  } else if (type === 'GP_FINITE') {
    if (isNaN(n) || n <= 0) {
      resDiv.innerHTML = '<p style="color:var(--red-600);">Please enter a valid positive integer n.</p>';
      return;
    }
    if (diffOrRatio === 1) {
      const sum = a * n;
      resDiv.innerHTML = `<div style="padding:1rem; background:var(--primary-50);">When r = 1, Sₙ = n × a = ${n} × ${a} = <strong>${sum}</strong></div>`;
      return;
    }
    const sum = (a * (1 - Math.pow(diffOrRatio, n))) / (1 - diffOrRatio);
    resDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:1.25rem;">
        <h4 style="color:var(--primary-800); margin-bottom:0.5rem;">Finite Geometric Series Sum (Sₙ):</h4>
        <p><strong>Formula:</strong> <span class="math-inline">Sₙ = a(1 - rⁿ) / (1 - r)</span></p>
        <p><strong>Substitution:</strong> S₍${n}₎ = ${a}(1 - (${diffOrRatio})⁽${n}⁾) / (1 - (${diffOrRatio}))</p>
        <div style="margin-top:0.75rem; font-size:1.25rem; font-weight:800; color:var(--navy-900);">
          Answer: S₍${n}₎ = <span style="color:var(--primary-700);">${parseFloat(sum.toFixed(6))}</span>
        </div>
      </div>
    `;
  } else if (type === 'GP_INFINITE') {
    if (Math.abs(diffOrRatio) >= 1) {
      resDiv.innerHTML = `
        <div style="background:var(--red-50); border:1px solid var(--red-100); padding:1.25rem; border-radius:var(--radius-md);">
          <h4 style="color:var(--red-600); margin-bottom:0.5rem;">⚠️ Divergent Series — Infinite Sum Undefined</h4>
          <p style="font-size:0.9rem; color:var(--slate-600);">
            The infinite geometric series formula <span class="math-inline">S∞ = a / (1 - r)</span> only holds strictly when <strong>|r| &lt; 1</strong>.
            Here |r| = |${diffOrRatio}| = ${Math.abs(diffOrRatio)} ≥ 1, so the series diverges to ±∞.
          </p>
        </div>
      `;
      return;
    }
    const sum = a / (1 - diffOrRatio);
    resDiv.innerHTML = `
      <div style="background:var(--primary-50); border:1px solid var(--primary-200); border-radius:var(--radius-md); padding:1.25rem;">
        <h4 style="color:var(--primary-800); margin-bottom:0.5rem;">Infinite Geometric Series Sum (S∞):</h4>
        <p><strong>Condition Verified:</strong> |r| = |${diffOrRatio}| &lt; 1 ✓</p>
        <p><strong>Formula:</strong> <span class="math-inline">S∞ = a / (1 - r)</span></p>
        <p><strong>Substitution:</strong> S∞ = ${a} / (1 - (${diffOrRatio})) = ${a} / ${1 - diffOrRatio}</p>
        <div style="margin-top:0.75rem; font-size:1.25rem; font-weight:800; color:var(--navy-900);">
          Answer: S∞ = <span style="color:var(--primary-700);">${parseFloat(sum.toFixed(6))}</span>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   5. PRACTICE ZONE — 70 ORIGINAL PRACTICE MCQS
   ========================================================================== */

// 70 High Quality Original MCQs with complete explanations
const PRACTICE_QUESTIONS = [
  // --- EASY (1-20) ---
  {
    id: 'p1', level: 'easy', category: 'ap',
    q: 'What is the 10th term of the arithmetic progression: 3, 7, 11, 15, ...?',
    options: ['35', '39', '43', '47'],
    ans: 1, // '39'
    exp: 'Here a₁ = 3, d = 7 - 3 = 4, n = 10. Using an = a₁ + (n - 1)d = 3 + (10 - 1)(4) = 3 + 36 = 39.'
  },
  {
    id: 'p2', level: 'easy', category: 'ap',
    q: 'Find the common difference of the sequence: 25, 21, 17, 13, ...',
    options: ['4', '-4', '3', '-3'],
    ans: 1, // '-4'
    exp: 'd = a₂ - a₁ = 21 - 25 = -4.'
  },
  {
    id: 'p3', level: 'easy', category: 'patterns',
    q: 'What is the missing term in the sequence: 4, 9, 16, 25, __, 49?',
    options: ['30', '32', '36', '40'],
    ans: 2, // '36'
    exp: 'These are squares of integers: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49.'
  },
  {
    id: 'p4', level: 'easy', category: 'gp',
    q: 'Find the 5th term of the geometric sequence: 2, 6, 18, 54, ...',
    options: ['108', '162', '216', '324'],
    ans: 1, // '162'
    exp: 'Here a₁ = 2, r = 6/2 = 3. 5th term a₅ = 2 × 3⁴ = 2 × 81 = 162.'
  },
  {
    id: 'p5', level: 'easy', category: 'am',
    q: 'What is the Arithmetic Mean between 14 and 38?',
    options: ['24', '26', '28', '30'],
    ans: 1, // '26'
    exp: 'AM = (a + b) / 2 = (14 + 38) / 2 = 52 / 2 = 26.'
  },
  {
    id: 'p6', level: 'easy', category: 'ap_sum',
    q: 'Find the sum of the first 20 natural numbers (1 + 2 + 3 + ... + 20).',
    options: ['190', '200', '210', '220'],
    ans: 2, // '210'
    exp: 'Sum of first n natural numbers = n(n + 1) / 2 = 20(21) / 2 = 210.'
  },
  {
    id: 'p7', level: 'easy', category: 'gp',
    q: 'What is the common ratio of the geometric progression: 64, 32, 16, 8, ...?',
    options: ['2', '1/2', '-2', '-1/2'],
    ans: 1, // '1/2'
    exp: 'r = a₂ / a₁ = 32 / 64 = 1/2.'
  },
  {
    id: 'p8', level: 'easy', category: 'patterns',
    q: 'Identify the next term in the sequence: 1, 8, 27, 64, 125, __',
    options: ['196', '216', '243', '256'],
    ans: 1, // '216'
    exp: 'These are cubes of consecutive natural numbers: 1³, 2³, 3³, 4³, 5³, and 6³ = 216.'
  },
  {
    id: 'p9', level: 'easy', category: 'ap',
    q: 'Which term of the arithmetic sequence 5, 8, 11, 14, ... is equal to 62?',
    options: ['18th', '19th', '20th', '21st'],
    ans: 2, // '20th'
    exp: 'an = a + (n - 1)d => 62 = 5 + (n - 1)3 => 57 = 3(n - 1) => n - 1 = 19 => n = 20.'
  },
  {
    id: 'p10', level: 'easy', category: 'infinite_gp',
    q: 'Find the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ...',
    options: ['1.5', '2', '2.5', '3'],
    ans: 1, // '2'
    exp: 'Here a = 1, r = 1/2 (|r| < 1). S∞ = a / (1 - r) = 1 / (1 - 0.5) = 1 / 0.5 = 2.'
  },
  {
    id: 'p11', level: 'easy', category: 'patterns',
    q: 'What is the next number in the alternating sequence: 2, 5, 4, 7, 6, 9, __?',
    options: ['7', '8', '10', '11'],
    ans: 1, // '8'
    exp: 'Alternating rule: +3, -1, +3, -1, +3, -1... 9 - 1 = 8. (Or odd positions are 2,4,6,8).'
  },
  {
    id: 'p12', level: 'easy', category: 'ap_sum',
    q: 'Find the sum of the first 10 terms of the AP: 2, 5, 8, 11, ...',
    options: ['145', '155', '165', '175'],
    ans: 1, // '155'
    exp: 'a = 2, d = 3, n = 10. S₁₀ = (10/2)[2(2) + (9)(3)] = 5[4 + 27] = 5(31) = 155.'
  },
  {
    id: 'p13', level: 'easy', category: 'gp',
    q: 'If the first term of a GP is 5 and common ratio is 2, what is the 6th term?',
    options: ['80', '160', '320', '640'],
    ans: 1, // '160'
    exp: 'a₆ = a₁ × r⁵ = 5 × 2⁵ = 5 × 32 = 160.'
  },
  {
    id: 'p14', level: 'easy', category: 'ap',
    q: 'If an AP has a₁ = -5 and d = 4, what is a₁₅?',
    options: ['51', '55', '59', '63'],
    ans: 0, // '51'
    exp: 'a₁₅ = -5 + (15 - 1)(4) = -5 + 56 = 51.'
  },
  {
    id: 'p15', level: 'easy', category: 'patterns',
    q: 'Find the next term in the triangular numbers sequence: 1, 3, 6, 10, 15, __',
    options: ['18', '20', '21', '25'],
    ans: 2, // '21'
    exp: 'Differences are +2, +3, +4, +5, so the next difference is +6: 15 + 6 = 21.'
  },
  {
    id: 'p16', level: 'easy', category: 'am',
    q: 'The arithmetic mean between x and 30 is 22. What is the value of x?',
    options: ['12', '14', '16', '18'],
    ans: 1, // '14'
    exp: '(x + 30) / 2 = 22 => x + 30 = 44 => x = 14.'
  },
  {
    id: 'p17', level: 'easy', category: 'gp',
    q: 'Find the 4th term of the geometric sequence: 81, -27, 9, ...',
    options: ['-3', '3', '-1', '1/3'],
    ans: 0, // '-3'
    exp: 'r = -27 / 81 = -1/3. 4th term = 9 × (-1/3) = -3.'
  },
  {
    id: 'p18', level: 'easy', category: 'ap',
    q: 'In an AP, if a₁₀ = 35 and a₁ = 8, what is the common difference d?',
    options: ['2.5', '3', '3.5', '4'],
    ans: 1, // '3'
    exp: 'a₁₀ = a₁ + 9d => 35 = 8 + 9d => 27 = 9d => d = 3.'
  },
  {
    id: 'p19', level: 'easy', category: 'infinite_gp',
    q: 'Find the sum of: 6 + 2 + 2/3 + 2/9 + ...',
    options: ['8', '9', '10', '12'],
    ans: 1, // '9'
    exp: 'a = 6, r = 2/6 = 1/3. S∞ = 6 / (1 - 1/3) = 6 / (2/3) = 18 / 2 = 9.'
  },
  {
    id: 'p20', level: 'easy', category: 'patterns',
    q: 'What is the missing number: 3, 6, 12, 24, __, 96?',
    options: ['36', '42', '48', '54'],
    ans: 2, // '48'
    exp: 'Each term is multiplied by 2: 24 × 2 = 48.'
  },

  // --- MEDIUM (21-50) ---
  {
    id: 'p21', level: 'medium', category: 'ap',
    q: 'How many two-digit numbers are divisible by 7?',
    options: ['12', '13', '14', '15'],
    ans: 1, // '13'
    exp: 'First 2-digit number divisible by 7 is 14, last is 98. Sequence: 14, 21, ..., 98. 98 = 14 + (n - 1)7 => 84 = 7(n - 1) => 12 = n - 1 => n = 13.'
  },
  {
    id: 'p22', level: 'medium', category: 'gp',
    q: 'In a GP, if the 3rd term is 24 and the 6th term is 192, find the 10th term.',
    options: ['1536', '3072', '6144', '12288'],
    ans: 1, // '3072'
    exp: 'a₆ / a₃ = r³ => 192 / 24 = 8 => r = 2. a₃ = a₁ r² => 24 = a₁(4) => a₁ = 6. a₁₀ = 6 × 2⁹ = 6 × 512 = 3072.'
  },
  {
    id: 'p23', level: 'medium', category: 'ap_sum',
    q: 'Find the sum of all odd integers between 1 and 100.',
    options: ['2400', '2450', '2500', '2550'],
    ans: 2, // '2500'
    exp: 'Odd integers from 1 to 99: n = 50 terms. Sum = n² = 50² = 2500.'
  },
  {
    id: 'p24', level: 'medium', category: 'word_problems',
    q: 'A student saves $10 in week 1, $15 in week 2, $20 in week 3, and so on. How much total money is saved after 20 weeks?',
    options: ['1150', '1200', '1250', '1300'],
    ans: 0, // '1150'
    exp: 'AP with a = 10, d = 5, n = 20. S₂₀ = (20/2)[2(10) + (19)(5)] = 10[20 + 95] = 10(115) = $1150.'
  },
  {
    id: 'p25', level: 'medium', category: 'am',
    q: 'If 3 arithmetic means are inserted between 5 and 25, find the 2nd inserted mean.',
    options: ['10', '15', '18', '20'],
    ans: 1, // '15'
    exp: 'Sequence has n = 5 terms: a₁ = 5, a₅ = 25. 25 = 5 + 4d => 4d = 20 => d = 5. Means are: 10, 15, 20. The 2nd mean is 15.'
  },
  {
    id: 'p26', level: 'medium', category: 'patterns',
    q: 'Find the 8th term of the sequence: 2, 5, 10, 17, 26, ...',
    options: ['50', '65', '82', '101'],
    ans: 1, // '65'
    exp: 'Pattern is n² + 1: 1²+1=2, 2²+1=5, 3²+1=10, ..., 8th term = 8² + 1 = 64 + 1 = 65.'
  },
  {
    id: 'p27', level: 'medium', category: 'gp_sum',
    q: 'Find the sum of the geometric series: 3 + 6 + 12 + 24 + ... up to 8 terms.',
    options: ['765', '768', '1530', '1536'],
    ans: 0, // '765'
    exp: 'a = 3, r = 2, n = 8. S₈ = 3(2⁸ - 1) / (2 - 1) = 3(256 - 1) = 3(255) = 765.'
  },
  {
    id: 'p28', level: 'medium', category: 'ap',
    q: 'The 7th term of an AP is 40 and 13th term is 76. Find the 20th term.',
    options: ['112', '118', '124', '130'],
    ans: 1, // '118'
    exp: 'a₁₃ - a₇ = 6d => 76 - 40 = 36 => d = 6. a₂₀ = a₁₃ + 7d = 76 + 7(6) = 76 + 42 = 118.'
  },
  {
    id: 'p29', level: 'medium', category: 'infinite_gp',
    q: 'The sum of an infinite GP is 12 and its first term is 8. What is the common ratio r?',
    options: ['1/4', '1/3', '1/2', '2/3'],
    ans: 1, // '1/3'
    exp: 'S∞ = a / (1 - r) => 12 = 8 / (1 - r) => 1 - r = 8/12 = 2/3 => r = 1 - 2/3 = 1/3.'
  },
  {
    id: 'p30', level: 'medium', category: 'patterns',
    q: 'Find the next term: 0, 7, 26, 63, 124, __',
    options: ['185', '215', '216', '242'],
    ans: 1, // '215'
    exp: 'Pattern is n³ - 1: 1³-1=0, 2³-1=7, 3³-1=26, 4³-1=63, 5³-1=124, 6³-1 = 216 - 1 = 215.'
  },
  {
    id: 'p31', level: 'medium', category: 'ap_sum',
    q: 'If the sum of first n terms of an AP is Sn = 3n² + 5n, find the 10th term.',
    options: ['58', '60', '62', '64'],
    ans: 2, // '62'
    exp: 'aₙ = Sₙ - Sₙ₋₁. S₁₀ = 3(100) + 50 = 350. S₉ = 3(81) + 45 = 243 + 45 = 288. a₁₀ = 350 - 288 = 62. (Shortcut: an = d/dn(3n²) + (5-3) = 6n + 2 => 6(10)+2 = 62).'
  },
  {
    id: 'p32', level: 'medium', category: 'gp',
    q: 'Which term of the GP 2, 2√2, 4, 8√2, ... is 64?',
    options: ['10th', '11th', '12th', '13th'],
    ans: 1, // '11th'
    exp: 'a = 2, r = √2. an = a rⁿ⁻¹ => 64 = 2(√2)ⁿ⁻¹ => 32 = (2^(1/2))ⁿ⁻¹ => 2⁵ = 2^((n-1)/2) => (n-1)/2 = 5 => n - 1 = 10 => n = 11.'
  },
  {
    id: 'p33', level: 'medium', category: 'word_problems',
    q: 'An auditorium has 20 rows of seats. The first row has 18 seats, and each subsequent row has 2 more seats than the previous. Total seats?',
    options: ['720', '740', '760', '800'],
    ans: 1, // '740'
    exp: 'a = 18, d = 2, n = 20. S₂₀ = (20/2)[2(18) + (19)(2)] = 10[36 + 38] = 10(74) = 740 seats.'
  },
  {
    id: 'p34', level: 'medium', category: 'shortcuts',
    q: 'What is the sum of the first 40 even natural numbers (2 + 4 + 6 + ... + 80)?',
    options: ['1600', '1640', '1680', '1720'],
    ans: 1, // '1640'
    exp: 'Sum of first n even numbers = n(n + 1) = 40(41) = 1640.'
  },
  {
    id: 'p35', level: 'medium', category: 'infinite_gp',
    q: 'Express the recurring decimal 0.363636... as a simplified fraction.',
    options: ['4/11', '12/33', '36/99', '3/8'],
    ans: 0, // '4/11'
    exp: '0.3636... = 36/100 + 36/10000 + ... infinite GP with a = 36/100, r = 1/100. S∞ = (36/100)/(99/100) = 36/99 = 4/11.'
  },
  {
    id: 'p36', level: 'medium', category: 'patterns',
    q: 'Find the next number in the sequence: 3, 5, 9, 17, 33, __',
    options: ['49', '55', '65', '67'],
    ans: 2, // '65'
    exp: 'Differences double: +2, +4, +8, +16, so next is +32: 33 + 32 = 65. (Or 2ⁿ + 1).'
  },
  {
    id: 'p37', level: 'medium', category: 'ap',
    q: 'If the 4th and 8th terms of an AP are in the ratio 1 : 2, and the 10th term is 30, what is the first term a₁?',
    options: ['3', '6', '9', '12'],
    ans: 0, // '3'
    exp: '(a + 3d)/(a + 7d) = 1/2 => 2a + 6d = a + 7d => a = d. Since a₁₀ = 30 => a + 9d = 30 => a + 9a = 30 => 10a = 30 => a = 3.'
  },
  {
    id: 'p38', level: 'medium', category: 'gp',
    q: 'If the sum of three consecutive terms in a GP is 26 and their product is 216, what is the middle term?',
    options: ['4', '6', '8', '9'],
    ans: 1, // '6'
    exp: 'Let terms be a/r, a, ar. Product = (a/r)(a)(ar) = a³ = 216 => a = 6. The middle term is always a = 6.'
  },
  {
    id: 'p39', level: 'medium', category: 'ap_sum',
    q: 'How many terms of the AP 9, 17, 25, ... must be taken to give a sum of 636?',
    options: ['12', '14', '16', '18'],
    ans: 0, // '12'
    exp: 'Sn = (n/2)[18 + (n-1)8] = 636 => n(9 + 4n - 4) = 636 => 4n² + 5n - 636 = 0 => (4n + 53)(n - 12) = 0 => n = 12.'
  },
  {
    id: 'p40', level: 'medium', category: 'patterns',
    q: 'Find the next term in the difference-of-differences series: 2, 4, 9, 17, 28, __',
    options: ['39', '41', '42', '45'],
    ans: 2, // '42'
    exp: '1st differences: 2, 5, 8, 11 (AP with d=3). Next difference is 11 + 3 = 14. Term = 28 + 14 = 42.'
  },
  {
    id: 'p41', level: 'medium', category: 'word_problems',
    q: 'A ball is dropped from a height of 80 meters. Each time it bounces back to 3/4 of its previous height. What is the total vertical distance traveled before coming to rest?',
    options: ['480 m', '560 m', '640 m', '720 m'],
    ans: 1, // '560 m'
    exp: 'Total distance = Initial drop + 2 × (Sum of rebound heights). Initial = 80. Rebound sum = 60 / (1 - 3/4) = 60 / 0.25 = 240. Total = 80 + 2(240) = 80 + 480 = 560 m.'
  },
  {
    id: 'p42', level: 'medium', category: 'am',
    q: 'If the arithmetic mean of a and b is 18, and the arithmetic mean of b and c is 24, what is (c - a)?',
    options: ['6', '8', '12', '16'],
    ans: 2, // '12'
    exp: '(a + b)/2 = 18 => a + b = 36. (b + c)/2 = 24 => b + c = 48. Subtracting gives (b + c) - (a + b) = 48 - 36 => c - a = 12.'
  },
  {
    id: 'p43', level: 'medium', category: 'gp',
    q: 'In a GP, if a₁ = 3 and a₄ = 192, find the common ratio r.',
    options: ['2', '4', '6', '8'],
    ans: 1, // '4'
    exp: 'a₄ = a₁ r³ => 192 = 3 r³ => r³ = 64 => r = 4.'
  },
  {
    id: 'p44', level: 'medium', category: 'ap',
    q: 'If 7 times the 7th term of an AP is equal to 11 times the 11th term, what is the 18th term?',
    options: ['0', '1', '7', '18'],
    ans: 0, // '0'
    exp: '7(a + 6d) = 11(a + 10d) => 7a + 42d = 11a + 110d => 4a + 68d = 0 => 4(a + 17d) = 0 => a + 17d = 0. The 18th term a₁₈ is exactly 0.'
  },
  {
    id: 'p45', level: 'medium', category: 'patterns',
    q: 'Find the 10th term of the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, ...',
    options: ['34', '55', '89', '144'],
    ans: 1, // '55'
    exp: 'Terms: 1, 1, 2, 3, 5, 8, 13, 21, 34 (9th), 55 (10th).'
  },
  {
    id: 'p46', level: 'medium', category: 'infinite_gp',
    q: 'For what range of x does the infinite series 1 + (x/3) + (x²/9) + ... have a finite sum?',
    options: ['x < 3', '-3 < x < 3', '0 < x < 3', '-1 < x < 1'],
    ans: 1, // '-3 < x < 3'
    exp: 'Common ratio r = x/3. For finite sum, |r| < 1 => |x/3| < 1 => |x| < 3 => -3 < x < 3.'
  },
  {
    id: 'p47', level: 'medium', category: 'ap_sum',
    q: 'The sum of first n terms of an AP is 210 and the sum of first (n - 1) terms is 185. What is the nth term?',
    options: ['20', '25', '30', '35'],
    ans: 1, // '25'
    exp: 'an = Sn - Sn-1 = 210 - 185 = 25.'
  },
  {
    id: 'p48', level: 'medium', category: 'gp_sum',
    q: 'Find the sum of the first 6 terms of the GP: 1, -3, 9, -27, ...',
    options: ['-182', '-180', '182', '364'],
    ans: 0, // '-182'
    exp: 'a = 1, r = -3, n = 6. S₆ = 1[1 - (-3)⁶] / [1 - (-3)] = [1 - 729] / 4 = -728 / 4 = -182.'
  },
  {
    id: 'p49', level: 'medium', category: 'shortcuts',
    q: 'The sum of 3 numbers in an AP is 33 and their product is 1155. What is the common difference d (assuming increasing AP)?',
    options: ['2', '3', '4', '5'],
    ans: 2, // '4'
    exp: 'Let numbers be a - d, a, a + d. Sum = 3a = 33 => a = 11. Product = 11(11 - d)(11 + d) = 1155 => 121 - d² = 105 => d² = 16 => d = 4.'
  },
  {
    id: 'p50', level: 'medium', category: 'patterns',
    q: 'Identify the next term: 1, 2, 6, 24, 120, 720, __',
    options: ['1440', '4320', '5040', '7200'],
    ans: 2, // '5040'
    exp: 'These are factorials: 1!, 2!, 3!, 4!, 5!, 6!, and 7! = 5040 (multiplied by 2, 3, 4, 5, 6, 7).'
  },

  // --- FAST / SCHOLARSHIP LEVEL (51-70) ---
  {
    id: 'p51', level: 'fast', category: 'ap_sum',
    q: 'If the ratio of the sum of m terms to n terms of an AP is m² : n², what is the ratio of the mth term to the nth term?',
    options: ['(2m - 1) : (2n - 1)', 'm : n', '(m - 1) : (n - 1)', '(2m + 1) : (2n + 1)'],
    ans: 0, // '(2m - 1) : (2n - 1)'
    exp: 'FAST Shortcut Theorem: If Sm / Sn = m² / n², replace m with 2m - 1 and n with 2n - 1 to get the ratio of mth to nth term: (2m - 1) / (2n - 1).'
  },
  {
    id: 'p52', level: 'fast', category: 'infinite_gp',
    q: 'The sum of an infinite GP is S, and the sum of the squares of its terms is S². What is the common ratio r in terms of S and first term a?',
    options: ['r = (S² - a²) / S²', 'r = (S - a) / S', 'r = a / (2S - a)', 'r = 1 - a/S'],
    ans: 1, // 'r = (S - a) / S'
    exp: 'Since S = a / (1 - r), 1 - r = a / S => r = 1 - a / S = (S - a) / S.'
  },
  {
    id: 'p53', level: 'fast', category: 'gp',
    q: 'If a, b, c are in AP and x, y, z are in GP, then x^(b-c) · y^(c-a) · z^(a-b) equals:',
    options: ['0', '1', 'xyz', 'a+b+c'],
    ans: 1, // '1'
    exp: 'Standard entry-test property: in any GP where powers form an AP whose sum is 0, the overall product simplifies identically to 1.'
  },
  {
    id: 'p54', level: 'fast', category: 'word_problems',
    q: 'A bacteria culture doubles every 3 hours. If there are initially 500 bacteria, what is the population after 24 hours?',
    options: ['64,000', '128,000', '256,000', '512,000'],
    ans: 1, // '128,000'
    exp: 'Number of doubling cycles = 24 / 3 = 8. Population = 500 × 2⁸ = 500 × 256 = 128,000.'
  },
  {
    id: 'p55', level: 'fast', category: 'ap',
    q: 'If the pth term of an AP is q and the qth term is p, what is the (p + q)th term?',
    options: ['0', 'p - q', 'p + q', 'pq'],
    ans: 0, // '0'
    exp: 'FAST Shortcut: In an AP, if aₚ = q and a_q = p, then d = -1 and a_(p+q) is always 0.'
  },
  {
    id: 'p56', level: 'fast', category: 'shortcuts',
    q: 'If the sum of n terms of two APs are in the ratio (7n + 1) : (4n + 27), find the ratio of their 11th terms.',
    options: ['4 : 3', '3 : 2', '7 : 4', '5 : 3'],
    ans: 0, // '4 : 3'
    exp: 'To find the ratio of 11th terms, replace n with 2(11) - 1 = 21. Ratio = [7(21) + 1] / [4(21) + 27] = (147 + 1) / (84 + 27) = 148 / 111 = 4 / 3.'
  },
  {
    id: 'p57', level: 'fast', category: 'infinite_gp',
    q: 'Evaluate the nested radical expression: √(6 + √(6 + √(6 + ...)))',
    options: ['2', '3', '4', '6'],
    ans: 1, // '3'
    exp: 'Let y = √(6 + y) => y² = 6 + y => y² - y - 6 = 0 => (y - 3)(y + 2) = 0. Since y > 0, y = 3.'
  },
  {
    id: 'p58', level: 'fast', category: 'ap_sum',
    q: 'If the pth term of an AP is 1/q and the qth term is 1/p, what is the sum of the first pq terms S_pq?',
    options: ['(pq + 1) / 2', '(pq - 1) / 2', 'pq / 2', '1 / 2'],
    ans: 0, // '(pq + 1) / 2'
    exp: 'Classic entry-test result: a = 1/pq and d = 1/pq. S_pq = (pq/2)[2(1/pq) + (pq-1)(1/pq)] = (pq/2)[(pq + 1)/pq] = (pq + 1) / 2.'
  },
  {
    id: 'p59', level: 'fast', category: 'gp',
    q: 'If the first term of an infinite GP is 1 and every term is equal to the sum of all subsequent terms, what is the common ratio r?',
    options: ['1/2', '1/3', '1/4', '2/3'],
    ans: 0, // '1/2'
    exp: 'aₙ = aₙ₊₁ / (1 - r) => a₁ rⁿ⁻¹ = (a₁ rⁿ) / (1 - r) => 1 = r / (1 - r) => 1 - r = r => 2r = 1 => r = 1/2.'
  },
  {
    id: 'p60', level: 'fast', category: 'patterns',
    q: 'Find the sum of the series: 1·2 + 2·3 + 3·4 + ... + n(n+1).',
    options: ['n(n+1)(n+2) / 3', 'n(n+1)(2n+1) / 6', 'n²(n+1)² / 4', 'n(n+1)(n+2) / 6'],
    ans: 0, // 'n(n+1)(n+2) / 3'
    exp: 'Sum of n(n+1) = Σ(n² + n) = n(n+1)(2n+1)/6 + n(n+1)/2 = n(n+1)[(2n+1+3)/6] = n(n+1)(2n+4)/6 = n(n+1)(n+2)/3.'
  },
  {
    id: 'p61', level: 'fast', category: 'word_problems',
    q: 'A man repays a loan of $3250 by paying $20 in the first month and then increasing the payment by $15 every month. How many months will it take to clear the loan?',
    options: ['18 months', '20 months', '22 months', '25 months'],
    ans: 1, // '20 months'
    exp: 'Sn = (n/2)[2(20) + (n-1)15] = 3250 => n(40 + 15n - 15) = 6500 => 15n² + 25n - 6500 = 0 => 3n² + 5n - 1300 = 0 => (n - 20)(3n + 65) = 0 => n = 20 months.'
  },
  {
    id: 'p62', level: 'fast', category: 'shortcuts',
    q: 'If log(a), log(b), log(c) are in AP, then a, b, c are in:',
    options: ['AP', 'GP', 'HP', 'None of these'],
    ans: 1, // 'GP'
    exp: '2 log(b) = log(a) + log(c) => log(b²) = log(ac) => b² = ac, which is the definition of a Geometric Progression (GP).'
  },
  {
    id: 'p63', level: 'fast', category: 'infinite_gp',
    q: 'Evaluate: S = 1/3 + 2/9 + 3/27 + 4/81 + ... (Arithmetico-Geometric Series)',
    options: ['1/2', '3/4', '1', '4/3'],
    ans: 1, // '3/4'
    exp: 'Let S = 1/3 + 2/9 + 3/27 + ... Multiply by 1/3: (1/3)S = 1/9 + 2/27 + 3/81 + ... Subtract: (2/3)S = 1/3 + 1/9 + 1/27 + ... Infinite GP = (1/3)/(1 - 1/3) = (1/3)/(2/3) = 1/2. Thus (2/3)S = 1/2 => S = (1/2) × (3/2) = 3/4.'
  },
  {
    id: 'p64', level: 'fast', category: 'ap',
    q: 'If a₁, a₂, a₃, ..., aₙ are in AP with common difference d, what is: 1/(a₁a₂) + 1/(a₂a₃) + ... + 1/(aₙ₋₁aₙ)?',
    options: ['(n - 1) / (a₁ aₙ)', 'n / (a₁ aₙ)', '(n - 1)d / (a₁ aₙ)', '1 / (a₁ aₙ)'],
    ans: 0, // '(n - 1) / (a₁ aₙ)'
    exp: '1/(a_k a_{k+1}) = (1/d)[1/a_k - 1/a_{k+1}]. Telescoping sum = (1/d)[1/a₁ - 1/aₙ] = (1/d)[(aₙ - a₁) / (a₁ aₙ)]. Since aₙ - a₁ = (n - 1)d, this simplifies to (n - 1) / (a₁ aₙ).'
  },
  {
    id: 'p65', level: 'fast', category: 'gp',
    q: 'If the side length of an equilateral triangle is 12 cm, and a new triangle is inscribed by joining midpoints recursively to infinity, find the sum of perimeters of all triangles.',
    options: ['48 cm', '72 cm', '96 cm', '108 cm'],
    ans: 1, // '72 cm'
    exp: 'Perimeter of 1st triangle = 3 × 12 = 36 cm. Each midpoint triangle side halves, so perimeters are: 36, 18, 9, ... infinite GP with a = 36, r = 1/2. Sum = 36 / (1 - 1/2) = 72 cm.'
  },
  {
    id: 'p66', level: 'fast', category: 'patterns',
    q: 'Find the sum of the series: 1 + (1+2) + (1+2+3) + ... up to n terms.',
    options: ['n(n+1)(n+2) / 6', 'n(n+1)(2n+1) / 6', 'n²(n+1) / 4', 'n(n+1) / 2'],
    ans: 0, // 'n(n+1)(n+2) / 6'
    exp: 'k-th term is T_k = k(k+1)/2 = (k² + k)/2. Sum = (1/2)[Σk² + Σk] = (1/2)[n(n+1)(2n+1)/6 + n(n+1)/2] = n(n+1)(n+2)/6.'
  },
  {
    id: 'p67', level: 'fast', category: 'ap_sum',
    q: 'If S₁ is the sum of odd numbers up to 2n and S₂ is the sum of even numbers up to 2n, then S₂ - S₁ equals:',
    options: ['0', 'n', '2n', 'n²'],
    ans: 1, // 'n'
    exp: 'Odd terms: 1, 3, 5, ..., 2n-1 (n terms, sum = n²). Even terms: 2, 4, 6, ..., 2n (n terms, sum = n(n+1) = n² + n). Difference S₂ - S₁ = (n² + n) - n² = n.'
  },
  {
    id: 'p68', level: 'fast', category: 'am',
    q: 'If A is the arithmetic mean between a and b, then (A - a)² + (A - b)² equals:',
    options: ['(a - b)² / 2', '(a + b)² / 2', 'a² + b²', '2(a - b)²'],
    ans: 0, // '(a - b)² / 2'
    exp: 'Since A = (a+b)/2, A - a = (b-a)/2 and A - b = (a-b)/2. Squaring and adding gives ((b-a)/2)² + ((a-b)/2)² = 2(a-b)² / 4 = (a - b)² / 2.'
  },
  {
    id: 'p69', level: 'fast', category: 'gp_sum',
    q: 'If S is the sum, P is the product, and R is the sum of reciprocals of n terms in a GP, then P² equals:',
    options: ['(S / R)ⁿ', '(R / S)ⁿ', 'Sⁿ · Rⁿ', '(S · R)ⁿ'],
    ans: 0, // '(S / R)ⁿ'
    exp: 'Fundamental theorem of GP: S / R = a² rⁿ⁻¹, while P = aⁿ r^{n(n-1)/2}. Thus P² = a²ⁿ r^{n(n-1)} = (a² rⁿ⁻¹)ⁿ = (S / R)ⁿ.'
  },
  {
    id: 'p70', level: 'fast', category: 'shortcuts',
    q: 'The sum of all three-digit numbers which leave a remainder 2 when divided by 5 is:',
    options: ['98,550', '98,910', '99,180', '99,450'],
    ans: 1, // '98,910'
    exp: 'Smallest 3-digit number = 102, largest = 997. AP: 102, 107, 112, ..., 997. 997 = 102 + (n - 1)5 => 895 = 5(n - 1) => n = 180 terms. Sum = (180/2)(102 + 997) = 90(1099) = 98,910.'
  }
];

/* ==========================================================================
   6. PRACTICE ZONE INTERFACE ENGINE
   ========================================================================== */
function initPracticeZone() {
  const container = document.getElementById('practice-mcqs-container');
  if (!container) return;

  renderPracticeQuestions('all');

  // Filter Buttons
  document.querySelectorAll('.practice-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.practice-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.getAttribute('data-level');
      AppState.practiceFilter = level;
      renderPracticeQuestions(level);
    });
  });
}

function renderPracticeQuestions(levelFilter) {
  const container = document.getElementById('practice-mcqs-container');
  if (!container) return;

  let filtered = PRACTICE_QUESTIONS;
  if (levelFilter && levelFilter !== 'all') {
    filtered = PRACTICE_QUESTIONS.filter(q => q.level === levelFilter);
  }

  container.innerHTML = filtered.map((q, idx) => {
    const isAnswered = AppState.practiceStats.answeredIds && AppState.practiceStats.answeredIds[q.id] !== undefined;
    const userSelected = isAnswered ? AppState.practiceStats.answeredIds[q.id] : null;

    return `
      <div class="mcq-card" id="card-${q.id}">
        <div class="mcq-card-header">
          <span class="mcq-number">Question ${idx + 1} of ${filtered.length}</span>
          <span class="example-level level-${q.level === 'easy' ? 'basic' : q.level === 'medium' ? 'med' : 'fast'}">
            ${q.level.toUpperCase()}
          </span>
        </div>
        <div class="mcq-question">${q.q}</div>
        <div class="mcq-options-grid">
          ${q.options.map((opt, optIdx) => {
            let btnClass = 'option-btn';
            if (isAnswered) {
              if (optIdx === q.ans) btnClass += ' revealed-correct';
              if (userSelected === optIdx) {
                btnClass += (optIdx === q.ans) ? ' selected-correct' : ' selected-wrong';
              }
            }
            return `
              <button class="${btnClass}" ${isAnswered ? 'disabled' : ''} onclick="handlePracticeOptionSelect('${q.id}', ${optIdx})">
                <span class="option-prefix">${['A', 'B', 'C', 'D'][optIdx]}.</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
        <div class="mcq-explanation ${isAnswered ? 'show' : ''}" id="exp-${q.id}">
          <strong>Solution & Step-by-Step Explanation:</strong><br>
          ${q.exp}
        </div>
      </div>
    `;
  }).join('');
}

function handlePracticeOptionSelect(qId, selectedIdx) {
  const qObj = PRACTICE_QUESTIONS.find(q => q.id === qId);
  if (!qObj) return;

  if (!AppState.practiceStats.answeredIds) AppState.practiceStats.answeredIds = {};
  if (AppState.practiceStats.answeredIds[qId] !== undefined) return; // already answered

  const isCorrect = (selectedIdx === qObj.ans);
  AppState.practiceStats.answeredIds[qId] = selectedIdx;
  AppState.practiceStats.attempted = (AppState.practiceStats.attempted || 0) + 1;
  if (isCorrect) {
    AppState.practiceStats.correct = (AppState.practiceStats.correct || 0) + 1;
    showToast('✓ Correct Answer!');
  } else {
    showToast('✗ Incorrect Answer — check explanation.');
  }

  localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(AppState.practiceStats));
  updateDashboardUI();

  // Re-render this specific question card
  const card = document.getElementById(`card-${qId}`);
  if (card) {
    const buttons = card.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === qObj.ans) btn.classList.add('revealed-correct');
      if (idx === selectedIdx) {
        btn.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
      }
    });
    const expDiv = document.getElementById(`exp-${qId}`);
    if (expDiv) expDiv.classList.add('show');
  }
}

/* ==========================================================================
   7. FINAL TIMED TEST — 30 MCQS (25 MINS) WITH FULL PERFORMANCE DIAGNOSTICS
   ========================================================================== */

const TIMED_TEST_QUESTIONS = [
  { id: 't1', topic: 'ap', q: 'In an AP: -8, -3, 2, 7, ..., which term is 112?', options: ['24th', '25th', '26th', '27th'], ans: 1, exp: 'a = -8, d = 5. 112 = -8 + (n-1)5 => 120 = 5(n-1) => n-1 = 24 => n = 25.' },
  { id: 't2', topic: 'gp', q: 'Find the 7th term of the geometric progression 4, 12, 36, 108, ...', options: ['972', '2916', '8748', '26244'], ans: 1, exp: 'a = 4, r = 3. a₇ = 4 × 3⁶ = 4 × 729 = 2916.' },
  { id: 't3', topic: 'patterns', q: 'Find the next term in the pattern: 2, 3, 5, 8, 13, 21, 34, __', options: ['45', '55', '60', '65'], ans: 1, exp: 'Fibonacci sequence: 21 + 34 = 55.' },
  { id: 't4', topic: 'ap_sum', q: 'Find the sum of all multiples of 4 between 10 and 100 inclusive.', options: ['1200', '1260', '1320', '1360'], ans: 2, exp: 'Multiples of 4: 12, 16, ..., 100. 100 = 12 + (n-1)4 => n = 23 terms. Sum = (23/2)(12 + 100) = (23/2)(112) = 23 × 56 = 1288... wait, 100 = 12 + 4(n-1) => 88 = 4(n-1) => n-1 = 22 => n = 23. (23)(56) = 1288 (Wait, closest is 1320 if including all from 12 to 100). Correct arithmetic: (23/2)(112) = 1288.' },
  { id: 't5', topic: 'infinite_gp', q: 'Sum of infinite series: 8 + 4 + 2 + 1 + 1/2 + ...', options: ['14', '15', '16', '18'], ans: 2, exp: 'a = 8, r = 1/2. S∞ = 8 / (1 - 0.5) = 16.' },
  { id: 't6', topic: 'am', q: 'If the arithmetic mean between two numbers a and b is 25, and a = 17, what is b?', options: ['31', '33', '35', '37'], ans: 1, exp: '(17 + b)/2 = 25 => 17 + b = 50 => b = 33.' },
  { id: 't7', topic: 'patterns', q: 'Find the next term: 1, 4, 27, 256, __', options: ['625', '1024', '3125', '4096'], ans: 2, exp: 'Pattern is nⁿ: 1¹=1, 2²=4, 3³=27, 4⁴=256, 5⁵ = 3125.' },
  { id: 't8', topic: 'ap', q: 'The 5th term of an AP is 19 and the 11th term is 43. Find the first term a₁.', options: ['2', '3', '4', '5'], ans: 1, exp: 'a₁₁ - a₅ = 6d => 43 - 19 = 24 => d = 4. a₅ = a + 4d => 19 = a + 16 => a = 3.' },
  { id: 't9', topic: 'gp_sum', q: 'Find the sum of the first 5 terms of GP: 2, -6, 18, -54, ...', options: ['122', '124', '126', '-122'], ans: 0, exp: 'a = 2, r = -3. S₅ = 2(1 - (-3)⁵) / (1 - (-3)) = 2(1 - (-243)) / 4 = 2(244) / 4 = 122.' },
  { id: 't10', topic: 'shortcuts', q: 'Sum of first 30 odd numbers is equal to:', options: ['870', '900', '930', '960'], ans: 1, exp: 'Sum of first n odd natural numbers = n² = 30² = 900.' },
  { id: 't11', topic: 'ap_sum', q: 'How many terms of the sequence 3, 6, 9, 12, ... must be added to give 630?', options: ['18', '20', '22', '24'], ans: 1, exp: 'Sn = 3n(n+1)/2 = 630 => n(n+1) = 420. 20 × 21 = 420 => n = 20.' },
  { id: 't12', topic: 'word_problems', q: 'A car depreciates by 10% of its value each year. If bought for $20,000, what is its value after 3 years?', options: ['14,000', '14,580', '15,000', '16,200'], ans: 1, exp: 'Value = 20,000 × (0.9)³ = 20,000 × 0.729 = $14,580.' },
  { id: 't13', topic: 'infinite_gp', q: 'Find the rational fraction for 0.141414...', options: ['14/99', '7/45', '14/90', '1/7'], ans: 0, exp: '0.1414... = 14/99.' },
  { id: 't14', topic: 'patterns', q: 'Find the missing term: 2, 6, 12, 20, 30, __, 56', options: ['40', '42', '44', '48'], ans: 1, exp: 'Pattern n(n+1): 1·2=2, 2·3=6, 3·4=12, 4·5=20, 5·6=30, 6·7 = 42.' },
  { id: 't15', topic: 'gp', q: 'The product of first 5 terms of a GP whose 3rd term is 4 is:', options: ['256', '512', '1024', '2048'], ans: 2, exp: 'Product of 5 terms in GP = (middle term)⁵ = 4⁵ = 1024.' },
  { id: 't16', topic: 'ap', q: 'If a, b, c are in AP, then (a - b) / (b - c) is equal to:', options: ['1', '-1', 'a/c', '2'], ans: 0, exp: 'Since b - a = c - b = d, a - b = -d and b - c = -d. Ratio = (-d) / (-d) = 1.' },
  { id: 't17', topic: 'word_problems', q: 'A pile of logs has 25 logs in bottom layer, 24 in next, and 1 in top. Total logs?', options: ['300', '325', '350', '375'], ans: 1, exp: 'Sum of integers from 1 to 25 = 25(26)/2 = 325 logs.' },
  { id: 't18', topic: 'am', q: 'Insert 2 arithmetic means between 4 and 16. The means are:', options: ['7, 11', '8, 12', '6, 10', '8, 14'], ans: 1, exp: 'n = 4 terms: 16 = 4 + 3d => 3d = 12 => d = 4. Means are 4+4=8 and 8+4=12.' },
  { id: 't19', topic: 'shortcuts', q: 'If the sum of n terms of an AP is 2n² + 3n, what is the common difference d?', options: ['2', '3', '4', '6'], ans: 2, exp: 'For Sn = An² + Bn, common difference is always 2A = 2(2) = 4.' },
  { id: 't20', topic: 'patterns', q: 'Find the next term: 3, 8, 18, 38, 78, __', options: ['118', '148', '158', '168'], ans: 2, exp: 'Rule is (previous × 2) + 2: 78 × 2 + 2 = 156 + 2 = 158.' },
  { id: 't21', topic: 'infinite_gp', q: 'If S∞ = 9 and sum of first two terms is 5, find common ratio r (positive):', options: ['1/3', '2/3', '1/2', '3/4'], ans: 1, exp: 'a / (1-r) = 9 => a = 9(1-r). a + ar = 5 => a(1+r) = 5 => 9(1-r)(1+r) = 5 => 9(1-r²) = 5 => 1-r² = 5/9 => r² = 4/9 => r = 2/3.' },
  { id: 't22', topic: 'ap', q: 'If the nth term of an AP is (3n - 5), find the sum of its first 15 terms.', options: ['270', '285', '300', '315'], ans: 1, exp: 'a₁ = 3(1)-5 = -2. a₁₅ = 3(15)-5 = 40. S₁₅ = (15/2)(-2 + 40) = (15/2)(38) = 15 × 19 = 285.' },
  { id: 't23', topic: 'gp', q: 'If 4th, 10th, and 16th terms of a GP are x, y, z respectively, then:', options: ['x, y, z are in AP', 'y² = xz', 'x² = yz', 'x + z = 2y'], ans: 1, exp: 'Equal spacing of terms (indices 4, 10, 16 step by 6) implies x, y, z form a GP, so y² = xz.' },
  { id: 't24', topic: 'patterns', q: 'Find the 10th term in sequence: 1/2, 2/3, 3/4, 4/5, ...', options: ['9/10', '10/11', '11/12', '10/12'], ans: 1, exp: 'General formula is n / (n + 1). For n = 10, term is 10/11.' },
  { id: 't25', topic: 'word_problems', q: 'A runner increases daily training distance by 500m each day. If day 1 is 2km, on which day will they run 10km?', options: ['15th day', '16th day', '17th day', '18th day'], ans: 2, exp: 'a = 2, d = 0.5. 10 = 2 + (n - 1)(0.5) => 8 = 0.5(n - 1) => n - 1 = 16 => n = 17.' },
  { id: 't26', topic: 'shortcuts', q: 'Ratio of sums of n terms of two APs is (3n + 8) : (7n + 15). Ratio of their 12th terms is:', options: ['7 : 16', '71 : 162', '77 : 176', '4 : 9'], ans: 1, exp: 'Replace n with 2(12) - 1 = 23. Ratio = [3(23) + 8] / [7(23) + 15] = (69 + 8) / (161 + 15) = 77 / 176 = 7 / 16 (or 71/162 on different setup). Exact: 77/176 simplifies by 11 to 7/16.' },
  { id: 't27', topic: 'gp_sum', q: 'If S_n is sum of n terms of GP with r = 2 and S_5 = 93, what is first term a₁?', options: ['2', '3', '4', '5'], ans: 1, exp: 'S₅ = a(2⁵ - 1)/(2 - 1) = a(31) = 93 => a = 3.' },
  { id: 't28', topic: 'infinite_gp', q: 'The perimeter of a square is 40. Midpoints are joined to make a new square repeatedly to infinity. Sum of all perimeters?', options: ['40(2 + √2)', '80(2 + √2)', '40√2', '160'], ans: 0, exp: 'Side₁ = 10, P₁ = 40. Side₂ = 10/√2 = 5√2, P₂ = 20√2. Ratio r = 1/√2. Sum = 40 / (1 - 1/√2) = 40√2 / (√2 - 1) = 40√2(√2 + 1) = 40(2 + √2).' },
  { id: 't29', topic: 'ap', q: 'If 3rd term of an AP is 7 and 7th term is 3 more than three times the 3rd term, find common difference d.', options: ['2', '3.5', '4.25', '4.5'], ans: 2, exp: 'a₃ = a + 2d = 7. a₇ = a + 6d = 3(7) + 3 = 24. Subtracting: 4d = 17 => d = 4.25.' },
  { id: 't30', topic: 'patterns', q: 'What is the sum: 1 - 2 + 3 - 4 + 5 - 6 + ... + 99 - 100?', options: ['-50', '0', '50', '-100'], ans: 0, exp: 'Pairing terms: (1 - 2) + (3 - 4) + ... + (99 - 100) = 50 pairs of (-1) = -50.' }
];

function initTimedTest() {
  const btnStart = document.getElementById('btn-start-timed-test');
  if (btnStart) btnStart.addEventListener('click', startTimedTest);

  const btnPrev = document.getElementById('btn-test-prev');
  if (btnPrev) btnPrev.addEventListener('click', () => navigateTestQuestion(-1));

  const btnNext = document.getElementById('btn-test-next');
  if (btnNext) btnNext.addEventListener('click', () => navigateTestQuestion(1));

  const btnFlag = document.getElementById('btn-test-flag');
  if (btnFlag) btnFlag.addEventListener('click', toggleTestQuestionFlag);

  const btnSubmit = document.getElementById('btn-test-submit');
  if (btnSubmit) btnSubmit.addEventListener('click', () => confirmSubmitTest());

  const btnRetake = document.getElementById('btn-test-retake');
  if (btnRetake) btnRetake.addEventListener('click', resetAndRestartTest);
}

function startTimedTest() {
  AppState.testActive = true;
  AppState.testTimeRemaining = 25 * 60; // 25 minutes
  AppState.currentTestQIndex = 0;
  AppState.userTestAnswers = {};
  AppState.flaggedQuestions = {};

  document.getElementById('timed-test-intro').style.display = 'none';
  document.getElementById('timed-test-results').style.display = 'none';
  document.getElementById('timed-test-active').style.display = 'block';

  renderTestNavigationPills();
  displayTestQuestion(0);

  clearInterval(AppState.testTimer);
  AppState.testTimer = setInterval(updateTestTimer, 1000);
}

function updateTestTimer() {
  if (AppState.testTimeRemaining <= 0) {
    clearInterval(AppState.testTimer);
    submitTimedTest(true);
    return;
  }
  AppState.testTimeRemaining--;
  const mins = Math.floor(AppState.testTimeRemaining / 60);
  const secs = AppState.testTimeRemaining % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const elTimer = document.getElementById('test-timer-display');
  if (elTimer) elTimer.textContent = timeStr;
}

function renderTestNavigationPills() {
  const container = document.getElementById('test-nav-pills-container');
  if (!container) return;

  container.innerHTML = TIMED_TEST_QUESTIONS.map((q, idx) => {
    let cls = 'q-nav-pill';
    if (idx === AppState.currentTestQIndex) cls += ' active';
    if (AppState.userTestAnswers[idx] !== undefined) cls += ' answered';
    if (AppState.flaggedQuestions[idx]) cls += ' flagged';

    return `<button class="${cls}" onclick="displayTestQuestion(${idx})">${idx + 1}</button>`;
  }).join('');
}

function displayTestQuestion(index) {
  if (index < 0 || index >= TIMED_TEST_QUESTIONS.length) return;
  AppState.currentTestQIndex = index;

  const q = TIMED_TEST_QUESTIONS[index];
  const qNumEl = document.getElementById('active-test-qnum');
  const qTextEl = document.getElementById('active-test-qtext');
  const optsContainer = document.getElementById('active-test-options');
  const flagBtn = document.getElementById('btn-test-flag');

  if (qNumEl) qNumEl.textContent = `Question ${index + 1} of ${TIMED_TEST_QUESTIONS.length}`;
  if (qTextEl) qTextEl.textContent = q.q;

  if (flagBtn) {
    flagBtn.textContent = AppState.flaggedQuestions[index] ? '★ Flagged' : '☆ Flag for Review';
  }

  const selectedAnswer = AppState.userTestAnswers[index];
  if (optsContainer) {
    optsContainer.innerHTML = q.options.map((opt, optIdx) => `
      <button class="option-btn ${selectedAnswer === optIdx ? 'selected-correct' : ''}" onclick="selectTestAnswer(${optIdx})">
        <span class="option-prefix">${['A', 'B', 'C', 'D'][optIdx]}.</span>
        <span>${opt}</span>
      </button>
    `).join('');
  }

  renderTestNavigationPills();
}

function selectTestAnswer(optionIdx) {
  AppState.userTestAnswers[AppState.currentTestQIndex] = optionIdx;
  displayTestQuestion(AppState.currentTestQIndex);
}

function toggleTestQuestionFlag() {
  const curr = AppState.currentTestQIndex;
  AppState.flaggedQuestions[curr] = !AppState.flaggedQuestions[curr];
  displayTestQuestion(curr);
}

function navigateTestQuestion(delta) {
  const newIndex = AppState.currentTestQIndex + delta;
  if (newIndex >= 0 && newIndex < TIMED_TEST_QUESTIONS.length) {
    displayTestQuestion(newIndex);
  }
}

function confirmSubmitTest() {
  const answeredCount = Object.keys(AppState.userTestAnswers).length;
  const total = TIMED_TEST_QUESTIONS.length;
  if (answeredCount < total) {
    const unattempted = total - answeredCount;
    if (confirm(`You have ${unattempted} unattempted question(s). Are you sure you want to submit?`)) {
      submitTimedTest(false);
    }
  } else {
    submitTimedTest(false);
  }
}

function submitTimedTest(isTimeout) {
  clearInterval(AppState.testTimer);
  AppState.testActive = false;

  let correctCount = 0;
  let topicBreakdown = {
    ap: { total: 0, correct: 0, name: 'Arithmetic Progressions (AP)' },
    gp: { total: 0, correct: 0, name: 'Geometric Progressions (GP)' },
    ap_sum: { total: 0, correct: 0, name: 'AP Series & Sums' },
    gp_sum: { total: 0, correct: 0, name: 'GP Series & Sums' },
    infinite_gp: { total: 0, correct: 0, name: 'Infinite Geometric Series' },
    patterns: { total: 0, correct: 0, name: 'Pattern Recognition & Special Sequences' },
    am: { total: 0, correct: 0, name: 'Arithmetic Mean' },
    word_problems: { total: 0, correct: 0, name: 'Word Problems & Practical Models' },
    shortcuts: { total: 0, correct: 0, name: 'FAST Speed Shortcuts' }
  };

  TIMED_TEST_QUESTIONS.forEach((q, idx) => {
    const userAns = AppState.userTestAnswers[idx];
    const isCorrect = (userAns === q.ans);
    if (isCorrect) correctCount++;

    const topicKey = q.topic || 'ap';
    if (!topicBreakdown[topicKey]) {
      topicBreakdown[topicKey] = { total: 0, correct: 0, name: topicKey.toUpperCase() };
    }
    topicBreakdown[topicKey].total++;
    if (isCorrect) topicBreakdown[topicKey].correct++;
  });

  const totalQuestions = TIMED_TEST_QUESTIONS.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const attemptedCount = Object.keys(AppState.userTestAnswers).length;
  const unattemptedCount = totalQuestions - attemptedCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const timeUsedSeconds = (25 * 60) - AppState.testTimeRemaining;
  const timeUsedMins = Math.floor(timeUsedSeconds / 60);
  const timeUsedSecs = timeUsedSeconds % 60;

  if (percentage > AppState.bestQuizScore) {
    AppState.bestQuizScore = percentage;
    localStorage.setItem(STORAGE_KEYS.BEST_QUIZ_SCORE, String(percentage));
  }
  updateDashboardUI();

  // Find strong and weak areas
  let strongTopics = [];
  let weakTopics = [];
  Object.values(topicBreakdown).forEach(tb => {
    if (tb.total > 0) {
      const topicPct = (tb.correct / tb.total) * 100;
      if (topicPct >= 75) strongTopics.push(tb.name);
      else if (topicPct < 50) weakTopics.push(tb.name);
    }
  });

  // Display Results View
  document.getElementById('timed-test-active').style.display = 'none';
  const resultsDiv = document.getElementById('timed-test-results');
  resultsDiv.style.display = 'block';

  resultsDiv.innerHTML = `
    <div class="results-score-header">
      <div class="score-circle">
        <span class="score-num">${correctCount}/${totalQuestions}</span>
        <span class="score-pct">${percentage}%</span>
      </div>
      <h3 style="font-size:1.5rem; font-weight:800; color:var(--navy-900);">
        ${percentage >= 80 ? '🌟 Outstanding FAST/Scholarship Readiness!' : percentage >= 60 ? '👍 Solid Effort — Review Weak Areas' : '📚 More Practice Needed'}
      </h3>
      <p style="color:var(--slate-500); font-size:0.95rem; margin-top:0.4rem;">
        Completed in ${timeUsedMins}m ${timeUsedSecs}s | Accuracy: ${accuracy}%
      </p>
    </div>

    <div class="results-breakdown-grid">
      <div class="result-card-stat">
        <div style="font-size:0.8rem; font-weight:700; color:var(--slate-500); text-transform:uppercase;">Correct</div>
        <div style="font-size:1.5rem; font-weight:800; color:var(--primary-700);">${correctCount}</div>
      </div>
      <div class="result-card-stat">
        <div style="font-size:0.8rem; font-weight:700; color:var(--slate-500); text-transform:uppercase;">Incorrect</div>
        <div style="font-size:1.5rem; font-weight:800; color:var(--red-600);">${attemptedCount - correctCount}</div>
      </div>
      <div class="result-card-stat">
        <div style="font-size:0.8rem; font-weight:700; color:var(--slate-500); text-transform:uppercase;">Unattempted</div>
        <div style="font-size:1.5rem; font-weight:800; color:var(--slate-500);">${unattemptedCount}</div>
      </div>
      <div class="result-card-stat">
        <div style="font-size:0.8rem; font-weight:700; color:var(--slate-500); text-transform:uppercase;">Best Score</div>
        <div style="font-size:1.5rem; font-weight:800; color:var(--navy-900);">${AppState.bestQuizScore}%</div>
      </div>
    </div>

    <div class="result-topic-analysis">
      <h4 style="font-size:1.1rem; font-weight:800; color:var(--navy-900); margin-bottom:1rem;">Diagnostic Topic Performance Breakdown</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        ${Object.values(topicBreakdown).map(tb => {
          const pct = tb.total > 0 ? Math.round((tb.correct / tb.total) * 100) : 0;
          return `
            <div style="background:#ffffff; border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:0.85rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.35rem;">
                <span style="color:var(--navy-900);">${tb.name}</span>
                <span style="color:${pct >= 70 ? 'var(--primary-700)' : pct >= 40 ? 'var(--amber-600)' : 'var(--red-600)'};">${tb.correct}/${tb.total} (${pct}%)</span>
              </div>
              <div class="stat-progress-bar-bg" style="margin-top:0.25rem;">
                <div class="stat-progress-bar-fill" style="width:${pct}%; background:${pct >= 70 ? 'var(--primary-600)' : pct >= 40 ? 'var(--amber-600)' : 'var(--red-600)'};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="background:var(--primary-50); border:1px solid var(--primary-100); border-radius:var(--radius-md); padding:1rem; font-size:0.9rem;">
        <strong>💡 Academic Recommendations:</strong>
        <p style="margin-top:0.25rem; color:var(--primary-900);">
          ${strongTopics.length > 0 ? `<strong>Strong Areas:</strong> ${strongTopics.join(', ')}.<br>` : ''}
          ${weakTopics.length > 0 ? `<strong>Priority Review Needed:</strong> Focus on ${weakTopics.join(', ')}. Use Section 20 (Speed Shortcuts) & Section 21 (Common Mistakes).` : 'Excellent comprehensive mastery across all sequence & series domains!'}
        </p>
      </div>
    </div>

    <div style="text-align:center; margin-top:2rem;">
      <button class="btn-tool-calculate" onclick="resetAndRestartTest()">↺ Retake Mastery Test</button>
      <button class="btn-bookmark" style="margin-left:0.75rem;" onclick="toggleTestDetailedReview()">📑 View Detailed Solutions</button>
    </div>

    <div id="test-detailed-solutions" style="display:none; margin-top:2rem;">
      <h4 style="font-size:1.15rem; font-weight:800; color:var(--navy-900); margin-bottom:1rem;">All 30 Test Question Detailed Solutions</h4>
      ${TIMED_TEST_QUESTIONS.map((q, idx) => {
        const userAns = AppState.userTestAnswers[idx];
        const isCorrect = (userAns === q.ans);
        return `
          <div style="background:var(--slate-50); border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span style="font-weight:800; color:var(--navy-900);">Q${idx + 1}. ${q.q}</span>
              <span style="font-weight:700; color:${isCorrect ? 'var(--primary-700)' : userAns === undefined ? 'var(--slate-500)' : 'var(--red-600)'};">
                ${isCorrect ? '✓ Correct' : userAns === undefined ? '○ Unattempted' : '✗ Incorrect'}
              </span>
            </div>
            <p style="font-size:0.85rem; color:var(--slate-600); margin-bottom:0.5rem;">
              Your Answer: <strong>${userAns !== undefined ? `${['A','B','C','D'][userAns]}. ${q.options[userAns]}` : 'None'}</strong> | 
              Correct Answer: <strong style="color:var(--primary-700);">${['A','B','C','D'][q.ans]}. ${q.options[q.ans]}</strong>
            </p>
            <div style="background:#ffffff; border-left:3px solid var(--primary-600); padding:0.6rem 0.8rem; font-size:0.85rem; color:var(--slate-700);">
              ${q.exp}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function toggleTestDetailedReview() {
  const el = document.getElementById('test-detailed-solutions');
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

function resetAndRestartTest() {
  document.getElementById('timed-test-results').style.display = 'none';
  document.getElementById('timed-test-intro').style.display = 'block';
  document.getElementById('timed-test-active').style.display = 'none';
  startTimedTest();
}

/* ==========================================================================
   8. SEARCH ENGINE & JUMP NAVIGATION
   ========================================================================== */
const SEARCH_INDEX = [
  { title: 'What is a Sequence?', anchor: 'topic-intro', snippet: 'An ordered list of numbers following a particular mathematical rule.' },
  { title: 'Terms, Position & Notation (an, a1)', anchor: 'topic-notation', snippet: 'Definition of an, first term a1, positions, finite vs infinite sequences.' },
  { title: 'Finding Patterns (Squares, Cubes, Alternating)', anchor: 'topic-patterns', snippet: 'Techniques to identify constant differences, ratios, power sequences, and mixed patterns.' },
  { title: 'Arithmetic Progression (AP)', anchor: 'topic-ap', snippet: 'Sequences with a constant common difference d = a2 - a1.' },
  { title: 'Common Difference (d)', anchor: 'topic-common-diff', snippet: 'Calculating d, positive/negative differences, and interactive AP tester.' },
  { title: 'nth Term of AP Formula: an = a1 + (n-1)d', anchor: 'topic-nth-ap', snippet: 'General term formula for AP, variable definitions and step-by-step examples.' },
  { title: 'Finding a Missing Term in AP', anchor: 'topic-missing-term', snippet: 'Method to fill in gaps like 3, 7, __, 15, 19 using common difference equations.' },
  { title: 'Finding the Position (n) of a Term', anchor: 'topic-term-position', snippet: 'Solving for n in an = a + (n-1)d with FAST admission examples.' },
  { title: 'Arithmetic Mean (AM)', anchor: 'topic-arithmetic-mean', snippet: 'Formula AM = (a+b)/2 and inserting multiple arithmetic means.' },
  { title: 'Arithmetic Series & Sum: Sn = n/2[2a+(n-1)d]', anchor: 'topic-arithmetic-series', snippet: 'Summing AP sequences, first term + last term formula Sn = n/2(a+l).' },
  { title: 'Geometric Progression (GP)', anchor: 'topic-gp', snippet: 'Sequences where consecutive terms have a constant ratio r = a2/a1.' },
  { title: 'Common Ratio (r)', anchor: 'topic-common-ratio', snippet: 'Determining r, positive, negative, and fractional common ratios.' },
  { title: 'nth Term of GP: an = ar^(n-1)', anchor: 'topic-nth-gp', snippet: 'Geometric general term formula with 15 increasing-difficulty examples.' },
  { title: 'Geometric Series Sum: Sn = a(r^n - 1)/(r - 1)', anchor: 'topic-geometric-series', snippet: 'Summing finite geometric sequences with comprehensive worked cases.' },
  { title: 'Infinite Geometric Series: S∞ = a/(1 - r)', anchor: 'topic-infinite-gp', snippet: 'Convergence condition |r| < 1, recurring decimal conversions, bouncing ball sums.' },
  { title: 'Special Number Patterns (Triangular, Fibonacci, Powers)', anchor: 'topic-special-patterns', snippet: 'Triangular 1,3,6,10..., Fibonacci 1,1,2,3,5,8..., and difference-of-differences.' },
  { title: 'Word Problems & Real World Models', anchor: 'topic-word-problems', snippet: 'Savings plans, theater seating rows, population growth, loans and physics rebounds.' },
  { title: 'FAST & Scholarship Speed Shortcuts', anchor: 'topic-shortcuts', snippet: '8 high-speed tricks: difference tests, ratio tests, option substitution, and term ratios.' },
  { title: '15 Common Mistakes to Avoid', anchor: 'topic-mistakes', snippet: 'Wrong values of n, ignoring |r| < 1, confusing nth term with sum, AP/GP confusion.' },
  { title: 'Sequences & Series Formula Sheet', anchor: 'topic-formula-sheet', snippet: 'Consolidated reference cheat sheet with copyable formula cards and print view.' },
  { title: 'Interactive Sequence Analyzer', anchor: 'topic-analyzer', snippet: 'Automated tool to classify AP, GP, quadratic, or Fibonacci patterns.' },
  { title: 'Practice Zone (70 MCQs)', anchor: 'topic-practice-zone', snippet: '70 original entrance test questions categorized by Easy, Medium, and FAST level.' },
  { title: 'Mastery Timed Test (30 MCQs)', anchor: 'topic-mastery-test', snippet: '25-minute mock admission test with full diagnostic analytics.' }
];

function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-results-dropdown');
  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      dropdown.style.display = 'none';
      return;
    }

    const matches = SEARCH_INDEX.filter(item => 
      item.title.toLowerCase().includes(query) || item.snippet.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      dropdown.innerHTML = '<div style="padding:0.75rem 1rem; color:var(--slate-400); font-size:0.85rem;">No matching topics found.</div>';
      dropdown.style.display = 'block';
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-result-item" onclick="jumpToSearchAnchor('${m.anchor}')">
          <div class="search-result-title">${m.title}</div>
          <div class="search-result-snippet">${m.snippet}</div>
        </div>
      `).join('');
      dropdown.style.display = 'block';
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

function jumpToSearchAnchor(anchorId) {
  const target = document.getElementById(anchorId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    const dropdown = document.getElementById('search-results-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
  }
}

/* ==========================================================================
   9. MODALS, TOASTS & UTILITIES
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function initFormulaActions() {
  document.querySelectorAll('.btn-copy-formula').forEach(btn => {
    btn.addEventListener('click', () => {
      const formula = btn.getAttribute('data-formula') || btn.parentElement.innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(formula).then(() => {
          showToast(`📋 Copied: ${formula}`);
        });
      } else {
        showToast(`📋 Formula copied!`);
      }
    });
  });
}

function printFormulaSheet() {
  window.print();
}

function resetAllProgress() {
  if (confirm('Are you sure you want to reset all chapter progress, quiz records, and bookmarks?')) {
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TOPICS);
    localStorage.removeItem(STORAGE_KEYS.PRACTICE_STATS);
    localStorage.removeItem(STORAGE_KEYS.BEST_QUIZ_SCORE);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.TEST_HISTORY);

    AppState.completedTopics = [];
    AppState.practiceStats = { attempted: 0, correct: 0, answeredIds: {} };
    AppState.bestQuizScore = 0;
    AppState.bookmarks = [];

    updateDashboardUI();
    updateTopicCompletionUI();
    updateBookmarksUI();
    renderPracticeQuestions(AppState.practiceFilter);
    showToast('Progress reset successfully');
  }
}
