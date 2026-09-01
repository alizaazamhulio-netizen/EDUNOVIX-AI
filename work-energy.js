/* =========================================================
   WORK & ENERGY — MDCAT Physics
   Interactive JavaScript Module
   ========================================================= */

'use strict';

/* ===== CONSTANTS ===== */
const g = 9.8;
const ELASTIC_LIMIT_X = 0.40;

/* ===== UTILITY FUNCTIONS ===== */
function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function toRad(deg) { return deg * Math.PI / 180; }
function round2(v) { return Math.round(v * 100) / 100; }
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val; }

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

/* ===== THEME TOGGLE ===== */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('we_theme') || 'light';
  if (saved === 'dark') document.body.classList.add('dark');
  if (btn) {
    btn.textContent = document.body.classList.contains('dark') ? '☀ Light' : '🌙 Dark';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      btn.textContent = isDark ? '☀ Light' : '🌙 Dark';
      localStorage.setItem('we_theme', isDark ? 'dark' : 'light');
    });
  }
}

/* ===== SIDEBAR ===== */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const close = document.getElementById('sidebarClose');
  if (!sidebar) return;
  toggle && toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  close && close.addEventListener('click', () => sidebar.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Active link on scroll
  const sections = document.querySelectorAll('[data-section]');
  const links = document.querySelectorAll('.sidebar-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-section');
        links.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-link[href="#section-${id}"]`) ||
                           document.querySelector(`.sidebar-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

/* ===== PROGRESS SYSTEM ===== */
const TOTAL_SECTIONS = 14;
let completedSections = new Set();

function initProgress() {
  const saved = localStorage.getItem('we_completed_sections');
  if (saved) {
    try { completedSections = new Set(JSON.parse(saved)); } catch(e) { completedSections = new Set(); }
  }
  updateProgress();

  const btn1 = document.getElementById('markComplete');
  const btn2 = document.getElementById('markComplete2');
  [btn1, btn2].forEach(btn => {
    if (btn) btn.addEventListener('click', markChapterComplete);
  });

  // Auto-track section visibility
  const sections = document.querySelectorAll('[data-section]');
  const tracker = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('data-section');
        if (id && !completedSections.has(id)) {
          completedSections.add(id);
          localStorage.setItem('we_completed_sections', JSON.stringify([...completedSections]));
          updateProgress();
        }
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => tracker.observe(s));
}

function updateProgress() {
  const pct = Math.min(100, Math.round((completedSections.size / TOTAL_SECTIONS) * 100));
  setText('navProgress', pct + '%');
  setText('progressText', pct + '%');
  const ring = document.getElementById('progressRing');
  if (ring) {
    const circumference = 213.6;
    ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
  }
  const status = document.getElementById('completionStatus');
  if (status) {
    if (pct === 100) { status.textContent = '✓ Chapter Complete!'; status.style.color = 'var(--success)'; }
    else { status.textContent = `Progress: ${pct}% (${completedSections.size}/${TOTAL_SECTIONS} sections)`; }
  }
}

function markChapterComplete() {
  const allIds = ['work','worklab','worktypes','energy','ke','pe','transform','conservation','wet','power','efficiency','elastic','hooke','formulalab'];
  allIds.forEach(id => completedSections.add(id));
  localStorage.setItem('we_completed_sections', JSON.stringify([...completedSections]));
  updateProgress();
  showToast('🎉 Chapter marked as complete!');
}

/* ===== HERO ANIMATION ===== */
function initHero() {
  const box = document.getElementById('heroBox');
  if (box) box.classList.add('moving');
}

/* ===== ANGLE DIAGRAM CANVAS ===== */
function drawAngleDiagram() {
  const canvas = document.getElementById('angleDiagram');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const ox = 60, oy = 150;
  const len = 200;
  const theta = 35;
  const rad = toRad(theta);

  const isDark = document.body.classList.contains('dark');
  const textCol = isDark ? '#a8ccb8' : '#2d4a3a';
  const fCol = '#0f7a5a';
  const dCol = '#0e8a8a';
  const compCol = '#f59e0b';

  // Displacement arrow (horizontal)
  ctx.strokeStyle = dCol; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + len, oy); ctx.stroke();
  drawArrowHead(ctx, ox + len - 15, oy, ox + len, oy, dCol);

  // Force arrow (at angle)
  const fx = ox + Math.cos(rad) * 160;
  const fy = oy - Math.sin(rad) * 160;
  ctx.strokeStyle = fCol; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(fx, fy); ctx.stroke();
  drawArrowHead(ctx, fx - 15 * Math.cos(rad), fy + 15 * Math.sin(rad), fx, fy, fCol);

  // Projection (component of F along d)
  const projX = ox + Math.cos(rad) * 160 * Math.cos(rad);
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = compCol; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(projX, oy); ctx.lineTo(fx, fy); ctx.stroke();
  ctx.setLineDash([]);

  // Angle arc
  ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(ox, oy, 50, -rad, 0, false); ctx.stroke();

  // Labels
  ctx.font = 'bold 14px Segoe UI'; ctx.fillStyle = fCol;
  ctx.fillText('F', fx + 8, fy - 6);
  ctx.fillStyle = dCol; ctx.fillText('d', ox + len + 8, oy + 5);
  ctx.fillStyle = '#dc2626'; ctx.fillText('θ = 35°', ox + 55, oy - 12);
  ctx.fillStyle = compCol; ctx.font = '12px Segoe UI';
  ctx.fillText('F·cosθ (does work)', projX + 6, oy - 22);
}

function drawArrowHead(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(angle - 0.4), y2 - size * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - size * Math.cos(angle + 0.4), y2 - size * Math.sin(angle + 0.4));
  ctx.closePath(); ctx.fill();
}

/* ===== WORK REVEAL ===== */
function initWorkReveal() {
  const btn = document.getElementById('workRevealBtn');
  const content = document.getElementById('workReveal');
  if (!btn || !content) return;
  btn.addEventListener('click', () => {
    content.classList.toggle('visible');
    btn.textContent = content.classList.contains('visible') ? 'Hide Explanation' : 'Is Physics Work Being Done? Show Me!';
  });
}

/* ===== WORK LAB ===== */
function initWorkLab() {
  const forceSlider = document.getElementById('forceSlider');
  const dispSlider = document.getElementById('dispSlider');
  const angleSlider = document.getElementById('angleSlider');
  const canvas = document.getElementById('workLabCanvas');
  if (!canvas || !forceSlider) return;
  const ctx = canvas.getContext('2d');

  const state = { F: 10, d: 5, theta: 0 };

  function update() {
    const F = +forceSlider.value;
    const d = +dispSlider.value;
    const theta = +angleSlider.value;
    state.F = F; state.d = d; state.theta = theta;

    setText('forceVal', F);
    setText('dispVal', d);
    setText('angleVal', theta);

    const cosT = Math.cos(toRad(theta));
    const W = round2(F * d * cosT);

    setText('workValue', W + ' J');
    const wDisplay = document.getElementById('workValue');
    const typeEl = document.getElementById('workType');
    const insightEl = document.getElementById('angleInsightText');

    wDisplay.style.color = W > 0 ? '#16a34a' : W < 0 ? '#dc2626' : '#d97706';

    if (Math.abs(theta - 90) < 1) {
      typeEl.textContent = 'Zero Work';
      typeEl.className = 'wr-type zero-work';
      insightEl.textContent = 'θ = 90°: Force is perpendicular to displacement. cos(90°) = 0, so Work = 0. This is ZERO work!';
    } else if (theta > 90) {
      typeEl.textContent = 'Negative Work';
      typeEl.className = 'wr-type negative-work';
      insightEl.textContent = 'θ > 90°: Force opposes motion. Work is NEGATIVE — the object loses kinetic energy.';
    } else {
      typeEl.textContent = 'Positive Work';
      typeEl.className = 'wr-type positive-work';
      insightEl.textContent = 'θ < 90°: Force has a component along displacement. POSITIVE work — object gains energy.';
    }

    const eq = `W = ${F} × ${d} × cos(${theta}°) = ${F} × ${d} × ${round2(cosT)} = <strong>${W} J</strong>`;
    setHTML('labEqDisplay', eq);

    // Update preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.toggle('active', +btn.dataset.angle === theta);
    });

    drawWorkLab(ctx, canvas, F, d, theta, W);
  }

  forceSlider.addEventListener('input', update);
  dispSlider.addEventListener('input', update);
  angleSlider.addEventListener('input', update);

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      angleSlider.value = btn.dataset.angle;
      update();
    });
  });

  const resetBtn = document.getElementById('workLabReset');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    forceSlider.value = 10; dispSlider.value = 5; angleSlider.value = 0;
    update();
  });

  update();
}

function drawWorkLab(ctx, canvas, F, d, theta, W) {
  const W_px = canvas.width, H_px = canvas.height;
  ctx.clearRect(0, 0, W_px, H_px);
  const isDark = document.body.classList.contains('dark');
  const bg = isDark ? '#1a2e1e' : '#f1f5f3';
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W_px, H_px);

  // Ground
  const groundY = H_px - 60;
  ctx.strokeStyle = isDark ? '#2a4a32' : '#d1e0d8'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W_px, groundY); ctx.stroke();
  for (let x = 0; x < W_px; x += 18) {
    ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x - 10, groundY + 10); ctx.stroke();
  }

  // Box
  const boxX = 160, boxY = groundY - 50, boxS = 50;
  ctx.fillStyle = isDark ? '#22543d' : '#d1fae5';
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(boxX, boxY, boxS, boxS, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#0f7a5a'; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('📦', boxX + boxS / 2, boxY + 34);

  // Force arrow
  const rad = toRad(theta);
  const arrowLen = 120 * (F / 50) + 30;
  const endX = boxX + boxS / 2 + Math.cos(-rad) * arrowLen;
  const endY = boxY + boxS / 2 + Math.sin(-rad) * arrowLen;
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(boxX + boxS / 2, boxY + boxS / 2); ctx.lineTo(endX, endY); ctx.stroke();
  drawArrowHead(ctx, boxX + boxS / 2, boxY + boxS / 2, endX, endY, '#0f7a5a');
  ctx.fillStyle = '#0f7a5a'; ctx.font = 'bold 13px Segoe UI'; ctx.textAlign = 'left';
  ctx.fillText(`F = ${F}N`, endX + 8, endY);

  // Displacement arrow
  const dispLen = Math.min(d * 10, 160);
  const dispEndX = boxX + boxS + 20 + dispLen;
  const dispY = groundY - 18;
  ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(boxX + boxS + 10, dispY); ctx.lineTo(dispEndX, dispY); ctx.stroke();
  drawArrowHead(ctx, dispEndX - 12, dispY, dispEndX, dispY, '#0e8a8a');
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 12px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText(`d = ${d}m`, boxX + boxS + 10 + dispLen / 2, dispY - 8);

  // Angle arc
  if (theta > 0) {
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(boxX + boxS / 2, boxY + boxS / 2, 35, -rad, 0, false); ctx.stroke();
    ctx.fillStyle = '#dc2626'; ctx.font = '12px Segoe UI'; ctx.textAlign = 'left';
    ctx.fillText(`θ=${theta}°`, boxX + boxS / 2 + 38, boxY + boxS / 2 - 8);
  }

  // Work label bottom
  const workCol = W > 0 ? '#16a34a' : W < 0 ? '#dc2626' : '#d97706';
  ctx.fillStyle = workCol; ctx.font = 'bold 16px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText(`W = ${W} J`, W_px / 2, H_px - 20);
}

/* ===== WORK TYPE CANVASES ===== */
function drawWorkTypeCanvases() {
  drawPositiveWork(); drawZeroWork(); drawNegativeWork();
}

function drawPositiveWork() {
  const canvas = document.getElementById('posWorkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const isDark = document.body.classList.contains('dark');
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);
  // Ground
  ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, H - 25); ctx.lineTo(W, H - 25); ctx.stroke();
  // Box
  ctx.fillStyle = '#dcfce7'; ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
  ctx.fillRect(80, H - 75, 40, 50); ctx.strokeRect(80, H - 75, 40, 50);
  // Force arrow →
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(20, H - 50); ctx.lineTo(75, H - 50); ctx.stroke();
  drawArrowHead(ctx, 60, H - 50, 75, H - 50, '#0f7a5a');
  ctx.fillStyle = '#0f7a5a'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('F →', 22, H - 55);
  // Displacement arrow →
  ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(125, H - 50); ctx.lineTo(195, H - 50); ctx.stroke();
  drawArrowHead(ctx, 180, H - 50, 195, H - 50, '#0e8a8a');
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('d →', 140, H - 55);
  // Label
  ctx.fillStyle = '#16a34a'; ctx.font = 'bold 13px Segoe UI';
  ctx.fillText('W > 0  ✅', 90, 20);
}

function drawZeroWork() {
  const canvas = document.getElementById('zeroWorkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const isDark = document.body.classList.contains('dark');
  ctx.fillStyle = isDark ? '#1a2e1e' : '#fffbeb'; ctx.fillRect(0, 0, W, H);
  // Person walking
  ctx.fillStyle = '#fef3c7'; ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
  ctx.fillRect(100, H - 75, 40, 50); ctx.strokeRect(100, H - 75, 40, 50);
  // Force arrow ↑
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(120, H - 80); ctx.lineTo(120, H - 120); ctx.stroke();
  drawArrowHead(ctx, 120, H - 105, 120, H - 120, '#d97706');
  ctx.fillStyle = '#d97706'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('F↑', 126, H - 95);
  // Displacement arrow →
  ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(145, H - 50); ctx.lineTo(210, H - 50); ctx.stroke();
  drawArrowHead(ctx, 195, H - 50, 210, H - 50, '#0e8a8a');
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('d →', 160, H - 55);
  // θ = 90°
  ctx.fillStyle = '#dc2626'; ctx.font = '11px Segoe UI';
  ctx.fillText('θ = 90°', 50, H - 90);
  ctx.fillStyle = '#d97706'; ctx.font = 'bold 13px Segoe UI';
  ctx.fillText('W = 0  ⭕', 90, 20);
}

function drawNegativeWork() {
  const canvas = document.getElementById('negWorkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const isDark = document.body.classList.contains('dark');
  ctx.fillStyle = isDark ? '#1a2e1e' : '#fef2f2'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, H - 25); ctx.lineTo(W, H - 25); ctx.stroke();
  // Box
  ctx.fillStyle = '#fee2e2'; ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 2;
  ctx.fillRect(100, H - 75, 40, 50); ctx.strokeRect(100, H - 75, 40, 50);
  // Motion arrow →
  ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(145, H - 50); ctx.lineTo(215, H - 50); ctx.stroke();
  drawArrowHead(ctx, 200, H - 50, 215, H - 50, '#0e8a8a');
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('d →', 165, H - 55);
  // Friction arrow ←
  ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(95, H - 35); ctx.lineTo(40, H - 35); ctx.stroke();
  drawArrowHead(ctx, 55, H - 35, 40, H - 35, '#dc2626');
  ctx.fillStyle = '#dc2626'; ctx.font = 'bold 11px Segoe UI';
  ctx.fillText('← f (friction)', 20, H - 40);
  ctx.fillStyle = '#dc2626'; ctx.font = 'bold 13px Segoe UI';
  ctx.fillText('W < 0  ❌', 90, 20);
}

/* ===== KE LAB ===== */
let keAnimFrame = null;
let keBallX = 60, keBallSpeed = 0;

const keChallengers = [
  { q: 'An object of mass 4 kg has velocity 6 m/s. What is its KE?', a: 'KE = ½ × 4 × 6² = ½ × 4 × 36 = 72 J' },
  { q: 'Velocity is doubled. By what factor does KE change?', a: 'KE ∝ v², so doubling v → KE becomes 4× larger.' },
  { q: 'Mass doubles, velocity stays same. What happens to KE?', a: 'KE = ½mv², doubling m → KE doubles. (2× original)' },
];
let keChallengeCurrent = 0;

function initKELab() {
  const massSlider = document.getElementById('keMassSlider');
  const velSlider = document.getElementById('keVelSlider');
  const canvas = document.getElementById('keCanvas');
  if (!canvas || !massSlider) return;
  const ctx = canvas.getContext('2d');

  function updateKE() {
    const m = +massSlider.value;
    const v = +velSlider.value;
    const ke = round2(0.5 * m * v * v);

    setText('keMassVal', m); setText('keVelVal', v);
    setText('keM', m); setText('keV', v); setText('keAnswer', ke + ' J');
    setText('keMassDisplay', m + ' kg'); setText('keVelDisplay', v + ' m/s'); setText('keDisplay', ke + ' J');

    // Update bars
    const massBar = document.getElementById('keBarMass');
    const velBar = document.getElementById('keBarVel');
    const keBar = document.getElementById('keBarKE');
    if (massBar) massBar.style.width = (m / 20 * 100) + '%';
    if (velBar) velBar.style.width = (v / 20 * 100) + '%';
    const maxKE = 0.5 * 20 * 400;
    if (keBar) keBar.style.width = Math.min(100, ke / maxKE * 100) + '%';

    // Insights
    setText('kiMassNote', 'Double mass → KE doubles');
    setText('kiVelNote', 'Double v → KE × 4 (v² effect!)');

    // Animate ball
    keBallSpeed = v;
    animateKEBall(ctx, canvas, m, v, ke);
  }

  massSlider.addEventListener('input', updateKE);
  velSlider.addEventListener('input', updateKE);

  const challengeBtn = document.getElementById('keChallenge');
  const challengeBox = document.getElementById('keChallengeBox');
  const challengeQ = document.getElementById('keChallengeQ');
  const challengeAns = document.getElementById('keChallengeAns');
  const solvBtn = document.getElementById('keChallengeSolve');

  if (challengeBtn) {
    challengeBtn.addEventListener('click', () => {
      const ch = keChallengers[keChallengeCurrent % keChallengers.length];
      keChallengeCurrent++;
      if (challengeQ) challengeQ.textContent = ch.q;
      if (challengeAns) { challengeAns.textContent = ''; challengeAns.classList.remove('visible'); }
      challengeBox.classList.add('visible');
    });
  }
  if (solvBtn && challengeAns) {
    solvBtn.addEventListener('click', () => {
      const ch = keChallengers[(keChallengeCurrent - 1) % keChallengers.length];
      challengeAns.textContent = ch.a;
      challengeAns.classList.add('visible');
    });
  }
  updateKE();
}

function animateKEBall(ctx, canvas, m, v, ke) {
  if (keAnimFrame) cancelAnimationFrame(keAnimFrame);
  if (v === 0) {
    drawKEScene(ctx, canvas, 80, m, v, ke);
    return;
  }
  const speed = Math.max(0.5, v * 0.8);
  function step() {
    keBallX += speed * 0.4;
    if (keBallX > canvas.width - 40) keBallX = 40;
    drawKEScene(ctx, canvas, keBallX, m, v, ke);
    keAnimFrame = requestAnimationFrame(step);
  }
  step();
}

function drawKEScene(ctx, canvas, ballX, m, v, ke) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  // Track
  ctx.strokeStyle = isDark ? '#2a4a32' : '#d1fae5'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(20, H - 30); ctx.lineTo(W - 20, H - 30); ctx.stroke();

  // Ball — size proportional to mass
  const r = 10 + m * 1.2;
  const keColor = ke > 200 ? '#dc2626' : ke > 80 ? '#f59e0b' : '#16a34a';
  ctx.fillStyle = keColor;
  ctx.beginPath(); ctx.arc(clamp(ballX, r, W - r), H - 30 - r, r, 0, Math.PI * 2); ctx.fill();

  // Velocity arrow
  if (v > 0) {
    const arrowLen = Math.min(v * 6, 80);
    const ax = clamp(ballX, r, W - r);
    ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(ax + r, H - 30 - r); ctx.lineTo(ax + r + arrowLen, H - 30 - r); ctx.stroke();
    drawArrowHead(ctx, ax + r + arrowLen - 10, H - 30 - r, ax + r + arrowLen, H - 30 - r, '#0f7a5a');
    ctx.fillStyle = '#0f7a5a'; ctx.font = 'bold 11px Segoe UI';
    ctx.fillText(`v = ${v} m/s`, ax + r, H - 30 - r - 14);
  }

  // Labels
  ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '12px Segoe UI';
  ctx.fillText(`m = ${m} kg`, 20, 22);
  ctx.fillStyle = keColor; ctx.font = 'bold 14px Segoe UI';
  ctx.fillText(`KE = ${ke} J`, W / 2, 22);
}

/* ===== PE LAB ===== */
function initPELab() {
  const massSlider = document.getElementById('peMassSlider');
  const heightSlider = document.getElementById('peHeightSlider');
  const canvas = document.getElementById('peCanvas');
  if (!canvas || !massSlider) return;
  const ctx = canvas.getContext('2d');

  function updatePE() {
    const m = +massSlider.value;
    const h = +heightSlider.value;
    const pe = round2(m * g * h);
    setText('peMassVal', m); setText('peHeightVal', h);
    setText('peM', m); setText('peH', h); setText('peAnswer', pe + ' J');
    drawPEScene(ctx, canvas, m, h, pe);
  }

  massSlider.addEventListener('input', updatePE);
  heightSlider.addEventListener('input', updatePE);
  updatePE();
}

function drawPEScene(ctx, canvas, m, h, pe) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  const groundY = H - 40;
  const maxH = 20; // m
  const ballY = groundY - (h / maxH) * (groundY - 60);
  const ballR = 18 + m * 0.8;

  // Ground
  ctx.fillStyle = isDark ? '#2a4a32' : '#d1fae5'; ctx.fillRect(0, groundY, W, H - groundY);
  ctx.strokeStyle = isDark ? '#0f7a5a' : '#0f7a5a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
  ctx.fillStyle = '#0f7a5a'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'right';
  ctx.fillText('Ground (h=0)', W - 8, groundY - 5);

  // Height line
  ctx.setLineDash([5, 4]); ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W / 2, ballY); ctx.lineTo(W / 2, groundY); ctx.stroke();
  ctx.setLineDash([]);

  // h arrow
  ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2 + 20, groundY); ctx.lineTo(W / 2 + 20, ballY); ctx.stroke();
  drawArrowHead(ctx, W / 2 + 20, ballY + 14, W / 2 + 20, ballY, '#0e8a8a');
  drawArrowHead(ctx, W / 2 + 20, groundY - 14, W / 2 + 20, groundY, '#0e8a8a');
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 12px Segoe UI'; ctx.textAlign = 'left';
  ctx.fillText(`h = ${h} m`, W / 2 + 28, (ballY + groundY) / 2 + 5);

  // Ball — color based on PE
  const peColor = pe > 1000 ? '#dc2626' : pe > 400 ? '#f59e0b' : '#0e8a8a';
  ctx.fillStyle = peColor;
  ctx.beginPath(); ctx.arc(W / 2, ballY, ballR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(W / 2, ballY, ballR, 0, Math.PI * 2); ctx.stroke();

  // PE label
  ctx.fillStyle = peColor; ctx.font = 'bold 15px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText(`PE = ${pe} J`, W / 2, ballY - ballR - 10);
  ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '12px Segoe UI';
  ctx.fillText(`m = ${m} kg`, W / 2, 20);
}

/* ===== RAMP / ROLLER COASTER ===== */
let rampAnim = null, rampT = 0, rampPlaying = false;

function initRampLab() {
  const canvas = document.getElementById('rampCanvas');
  const hSlider = document.getElementById('rampHeightSlider');
  const mSlider = document.getElementById('rampMassSlider');
  const playBtn = document.getElementById('rampPlay');
  const resetBtn = document.getElementById('rampReset');
  if (!canvas || !hSlider) return;
  const ctx = canvas.getContext('2d');

  function drawRamp(ballPos) {
    const h0 = +hSlider.value;
    const m = +mSlider.value;
    drawRampScene(ctx, canvas, h0, m, ballPos);
    // compute PE/KE from ball position
    const maxPE = m * g * h0;
    const currentH = getRampHeight(ballPos, h0, canvas);
    const currentPE = round2(m * g * currentH);
    const currentKE = round2(maxPE - currentPE);
    setText('rampHeightVal', h0);
    setText('rampMassVal', m);
    setText('rampPEVal', currentPE + ' J');
    setText('rampKEVal', currentKE + ' J');
    setText('rampTotalVal', round2(maxPE) + ' J');
    updateRampMeter('rampPEBar', currentPE, maxPE);
    updateRampMeter('rampKEBar', currentKE, maxPE);
    updateRampMeter('rampTotalBar', maxPE, maxPE);
  }

  hSlider.addEventListener('input', () => { rampT = 0; drawRamp(0); });
  mSlider.addEventListener('input', () => { rampT = 0; drawRamp(0); });

  if (playBtn) playBtn.addEventListener('click', () => {
    if (rampPlaying) return;
    rampPlaying = true; rampT = 0;
    playBtn.textContent = '▶ Playing...';
    function step() {
      rampT += 0.008;
      drawRamp(rampT);
      if (rampT < 1) { rampAnim = requestAnimationFrame(step); }
      else {
        rampPlaying = false;
        playBtn.textContent = '▶ Drop Ball';
        rampT = 1; drawRamp(1);
      }
    }
    rampAnim = requestAnimationFrame(step);
  });

  if (resetBtn) resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(rampAnim); rampPlaying = false; rampT = 0;
    playBtn.textContent = '▶ Drop Ball';
    drawRamp(0);
  });
  drawRamp(0);
}

function getRampPath(canvas, h0) {
  const W = canvas.width, H = canvas.height;
  const groundY = H - 50;
  const maxHpx = (h0 / 10) * (groundY - 60);
  const startY = groundY - maxHpx;
  const pts = [
    { x: 60, y: startY },
    { x: 180, y: groundY - 15 },
    { x: 360, y: groundY - 15 },
    { x: W - 60, y: startY * 1.2 }
  ];
  return pts;
}

function getRampHeight(t, h0, canvas) {
  const pts = getRampPath(canvas, h0);
  const W = canvas.width, H = canvas.height;
  const groundY = H - 50;
  // Interpolate along path
  const n = pts.length - 1;
  const seg = Math.floor(t * n);
  const local = (t * n) - seg;
  const p1 = pts[Math.min(seg, n)];
  const p2 = pts[Math.min(seg + 1, n)];
  const curY = p1.y + (p2.y - p1.y) * local;
  return Math.max(0, (groundY - curY) / (groundY - 60) * h0);
}

function drawRampScene(ctx, canvas, h0, m, t) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  const pts = getRampPath(canvas, h0);
  const groundY = H - 50;

  // Ramp
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const xc = (pts[i - 1].x + pts[i].x) / 2;
    const yc = (pts[i - 1].y + pts[i].y) / 2;
    ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.stroke();

  // Ground
  ctx.fillStyle = isDark ? '#2a4a32' : '#d1fae5'; ctx.fillRect(0, groundY, W, H - groundY);

  // Ball position
  const n = pts.length - 1;
  const seg = Math.min(Math.floor(t * n), n - 1);
  const local = (t * n) - seg;
  const bx = pts[seg].x + (pts[seg + 1].x - pts[seg].x) * local;
  const by = pts[seg].y + (pts[seg + 1].y - pts[seg].y) * local;
  const br = 12 + m * 2;

  const currentH = getRampHeight(t, h0, canvas);
  const maxPE = m * g * h0;
  const currentPE = m * g * currentH;
  const ratio = currentPE / maxPE;
  const ballCol = ratio > 0.6 ? '#0e8a8a' : ratio > 0.3 ? '#f59e0b' : '#dc2626';

  ctx.fillStyle = ballCol;
  ctx.beginPath(); ctx.arc(bx, by - br, br, 0, Math.PI * 2); ctx.fill();

  // Labels
  ctx.fillStyle = '#0e8a8a'; ctx.font = 'bold 11px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText(`h ≈ ${round2(currentH)} m`, bx, by - br * 2 - 8);
  ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '12px Segoe UI';
  ctx.fillText(`Starting h = ${h0} m | Mass = ${m} kg`, W / 2, 22);
}

function updateRampMeter(id, val, max) {
  const bar = document.getElementById(id);
  if (!bar) return;
  const pct = max > 0 ? Math.min(100, (val / max) * 100) : 0;
  bar.style.setProperty('--fill', pct + '%');
  // Use a pseudo-element trick via inline style on the bar itself
  bar.style.height = '140px'; // explicit height
  bar.style.position = 'relative';
  // Draw inside bar as overlay
  if (!bar._inner) {
    bar._inner = document.createElement('div');
    bar._inner.style.cssText = 'position:absolute;bottom:0;left:0;right:0;transition:height 0.2s ease;border-radius:6px;';
    bar.appendChild(bar._inner);
  }
  bar._inner.style.height = pct + '%';
  if (id === 'rampPEBar') bar._inner.style.background = '#0e8a8a';
  else if (id === 'rampKEBar') bar._inner.style.background = '#1d6fa4';
  else bar._inner.style.background = '#0f7a5a';
}

/* ===== WET SIMULATION ===== */
let wetAnim = null, wetPlaying = false;
let wetBoxX = 50;

function initWETSim() {
  const canvas = document.getElementById('wetCanvas');
  const v0Slider = document.getElementById('wetV0Slider');
  const fSlider = document.getElementById('wetFSlider');
  const mSlider = document.getElementById('wetMSlider');
  const playBtn = document.getElementById('wetPlay');
  const resetBtn = document.getElementById('wetReset');
  if (!canvas || !v0Slider) return;
  const ctx = canvas.getContext('2d');
  wetBoxX = 50;

  function compute() {
    const v0 = +v0Slider.value, F = +fSlider.value, m = +mSlider.value;
    setText('wetV0Val', v0); setText('wetFVal', F); setText('wetMVal', m);
    return { v0, F, m };
  }

  function drawWET(boxX, v0, F, m, currentV) {
    const W = canvas.width, H = canvas.height;
    const isDark = document.body.classList.contains('dark');
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);
    // Ground
    const gy = H - 35;
    ctx.fillStyle = isDark ? '#2a4a32' : '#d1fae5'; ctx.fillRect(0, gy, W, H - gy);
    // Box
    ctx.fillStyle = '#d1fae5'; ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 2;
    ctx.fillRect(boxX, gy - 46, 46, 46); ctx.strokeRect(boxX, gy - 46, 46, 46);
    ctx.fillStyle = '#0f7a5a'; ctx.font = '22px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('📦', boxX + 23, gy - 14);
    // Force arrow
    if (F > 0) {
      ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 3;
      const aLen = Math.min(F * 2.5, 80);
      ctx.beginPath(); ctx.moveTo(boxX - 10, gy - 23); ctx.lineTo(boxX - 10 + aLen, gy - 23); ctx.stroke();
      drawArrowHead(ctx, boxX + aLen - 12, gy - 23, boxX + aLen, gy - 23, '#0f7a5a');
      ctx.fillStyle = '#0f7a5a'; ctx.font = '11px Segoe UI';
      ctx.fillText(`F=${F}N`, boxX + aLen / 2 - 10, gy - 30);
    }
    // Velocity arrow
    if (currentV > 0) {
      ctx.strokeStyle = '#0e8a8a'; ctx.lineWidth = 2;
      const vLen = Math.min(currentV * 4, 60);
      ctx.beginPath(); ctx.moveTo(boxX + 46, gy - 36); ctx.lineTo(boxX + 46 + vLen, gy - 36); ctx.stroke();
      drawArrowHead(ctx, boxX + 46 + vLen - 10, gy - 36, boxX + 46 + vLen, gy - 36, '#0e8a8a');
      ctx.fillStyle = '#0e8a8a'; ctx.font = '11px Segoe UI';
      ctx.fillText(`v=${round2(currentV)}m/s`, boxX + 46, gy - 44);
    }
    // Labels
    ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '12px Segoe UI'; ctx.textAlign = 'left';
    ctx.fillText(`v₀=${v0} m/s`, 10, 22);
    ctx.fillText(`m=${m} kg`, 10, 40);
  }

  if (playBtn) playBtn.addEventListener('click', () => {
    if (wetPlaying) return;
    wetPlaying = true; wetBoxX = 50;
    const { v0, F, m } = compute();
    const a = F / m;
    let vCurrent = v0, dist = 0;
    playBtn.textContent = '▶ Running...';

    function step() {
      vCurrent += a * 0.04;
      dist += vCurrent * 0.04;
      wetBoxX = 50 + dist * 3;
      const wi = round2(F * dist);
      const dke = round2(0.5 * m * vCurrent * vCurrent - 0.5 * m * v0 * v0);
      setText('wetWork', wi + ' J');
      setText('wetDKE', dke + ' J');
      setText('wetVF', round2(vCurrent) + ' m/s');
      drawWET(Math.min(wetBoxX, canvas.width - 80), v0, F, m, vCurrent);
      if (wetBoxX < canvas.width - 80) { wetAnim = requestAnimationFrame(step); }
      else { wetPlaying = false; playBtn.textContent = '▶ Apply Force'; }
    }
    wetAnim = requestAnimationFrame(step);
  });

  if (resetBtn) resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(wetAnim); wetPlaying = false; wetBoxX = 50;
    playBtn.textContent = '▶ Apply Force';
    setText('wetWork', '0 J'); setText('wetDKE', '0 J'); setText('wetVF', '0 m/s');
    const { v0, F, m } = compute(); drawWET(50, v0, F, m, v0);
  });

  v0Slider.addEventListener('input', () => { cancelAnimationFrame(wetAnim); wetPlaying = false; playBtn.textContent = '▶ Apply Force'; const {v0,F,m} = compute(); drawWET(50,v0,F,m,v0); });
  fSlider.addEventListener('input', () => { cancelAnimationFrame(wetAnim); wetPlaying = false; const {v0,F,m} = compute(); drawWET(50,v0,F,m,v0); });
  mSlider.addEventListener('input', () => { cancelAnimationFrame(wetAnim); wetPlaying = false; const {v0,F,m} = compute(); drawWET(50,v0,F,m,v0); });

  const { v0, F, m } = compute();
  drawWET(50, v0, F, m, v0);
}

/* ===== POWER RACE ===== */
let raceAnim = null, racePlaying = false;

function initPowerRace() {
  const canvas = document.getElementById('powerRaceCanvas');
  const startBtn = document.getElementById('raceStart');
  const resetBtn2 = document.getElementById('raceReset');
  if (!canvas || !startBtn) return;
  const ctx = canvas.getContext('2d');
  const WORK = 300;

  function drawRace(ax, bx, aTime, bTime) {
    const W = canvas.width, H = canvas.height;
    const isDark = document.body.classList.contains('dark');
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);
    const finishX = W - 50;
    // Lanes
    ctx.strokeStyle = isDark ? '#2a4a32' : '#d1e0d8'; ctx.lineWidth = 1; ctx.setLineDash([6,4]);
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);
    // Finish line
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(finishX, 10); ctx.lineTo(finishX, H - 10); ctx.stroke();
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold 11px Segoe UI'; ctx.textAlign = 'center';
    ctx.fillText('FINISH', finishX, 8);
    // Machine A (slow — teal)
    ctx.fillStyle = '#0e8a8a';
    ctx.beginPath(); ctx.roundRect(ax, H / 4 - 20, 60, 35, 8); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Segoe UI';
    ctx.fillText('Machine A', ax + 30, H / 4 + 2);
    // Machine B (fast — green)
    ctx.fillStyle = '#0f7a5a';
    ctx.beginPath(); ctx.roundRect(bx, 3 * H / 4 - 20, 60, 35, 8); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Machine B', bx + 30, 3 * H / 4 + 2);
    // Labels
    ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'left';
    ctx.fillText(`Work = ${WORK} J | Time = ${aTime}s | P = ${round2(WORK/Math.max(aTime,0.1))} W`, 10, H / 4 - 28);
    ctx.fillText(`Work = ${WORK} J | Time = ${bTime}s | P = ${round2(WORK/Math.max(bTime,0.1))} W`, 10, 3 * H / 4 - 28);
  }

  startBtn.addEventListener('click', () => {
    if (racePlaying) return;
    racePlaying = true; startBtn.textContent = '▶ Racing...';
    const finishX = canvas.width - 50 - 60;
    let ax = 20, bx = 20;
    const aSpeed = 0.5, bSpeed = 1.8;
    let aTime = 0, bTime = 0;
    let aDone = false, bDone = false;

    function step() {
      if (!aDone) { ax += aSpeed; aTime = round2((ax - 20) / (finishX / 12)); }
      if (!bDone) { bx += bSpeed; bTime = round2((bx - 20) / (finishX / 4)); }
      if (ax >= finishX) aDone = true;
      if (bx >= finishX) bDone = true;
      drawRace(Math.min(ax, finishX), Math.min(bx, finishX), aTime, bTime);
      if (!aDone || !bDone) { raceAnim = requestAnimationFrame(step); }
      else {
        racePlaying = false; startBtn.textContent = '▶ Start Race';
        setText('raceATime', `Time: ${round2(aTime)} s`);
        setText('raceBTime', `Time: ${round2(bTime)} s`);
        setText('raceAPower', `Power: ${round2(WORK / aTime)} W`);
        setText('raceBPower', `Power: ${round2(WORK / bTime)} W`);
      }
    }
    raceAnim = requestAnimationFrame(step);
  });

  if (resetBtn2) resetBtn2.addEventListener('click', () => {
    cancelAnimationFrame(raceAnim); racePlaying = false;
    startBtn.textContent = '▶ Start Race';
    setText('raceATime', '—'); setText('raceBTime', '—');
    setText('raceAPower', '—'); setText('raceBPower', '—');
    drawRace(20, 20, 0, 0);
  });
  drawRace(20, 20, 0, 0);
}

/* ===== POWER CALCULATOR ===== */
function initPowerCalc() {
  const wInput = document.getElementById('calcWork');
  const tInput = document.getElementById('calcTime');
  const output = document.getElementById('calcPower');
  if (!wInput || !tInput || !output) return;
  function calc() {
    const w = +wInput.value, t = +tInput.value;
    if (t === 0) { output.textContent = '∞ (t=0!)'; return; }
    output.textContent = round2(w / t) + ' W';
  }
  wInput.addEventListener('input', calc);
  tInput.addEventListener('input', calc);
  calc();
}

/* ===== EFFICIENCY (SANKEY) ===== */
function initEfficiencyLab() {
  const effSlider = document.getElementById('effSlider');
  const inputSlider = document.getElementById('effInputSlider');
  const canvas = document.getElementById('sankeyCanvas');
  if (!canvas || !effSlider) return;
  const ctx = canvas.getContext('2d');

  function update() {
    const eff = +effSlider.value;
    const input = +inputSlider.value;
    const useful = round2(input * eff / 100);
    const wasted = round2(input - useful);
    setText('effVal', eff); setText('effInputVal', input);
    setText('effUseful', useful + ' J'); setText('effWasted', wasted + ' J');
    setText('effU2', useful); setText('effI2', input); setText('effPct', eff + '%');
    drawSankey(ctx, canvas, input, useful, wasted, eff);
  }
  effSlider.addEventListener('input', update);
  inputSlider.addEventListener('input', update);
  update();
}

function drawSankey(ctx, canvas, input, useful, wasted, eff) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  const totalH = 200;
  const usefulH = Math.max(10, totalH * eff / 100);
  const wastedH = totalH - usefulH;
  const startX = 60, machineX = 200, endX = 380;
  const cy = H / 2;

  // Input flow
  ctx.fillStyle = 'rgba(29,111,164,0.6)';
  ctx.fillRect(startX, cy - totalH / 2, machineX - startX, totalH);
  ctx.fillStyle = '#1d6fa4'; ctx.font = 'bold 13px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText('Input', startX + (machineX - startX) / 2, cy - totalH / 2 - 8);
  ctx.fillText(`${input} J`, startX + (machineX - startX) / 2, cy + 5);

  // Machine box
  ctx.fillStyle = isDark ? '#22543d' : '#d1fae5'; ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 2;
  ctx.fillRect(machineX, cy - totalH / 2 - 10, 80, totalH + 20);
  ctx.strokeRect(machineX, cy - totalH / 2 - 10, 80, totalH + 20);
  ctx.fillStyle = '#0f7a5a'; ctx.font = 'bold 12px Segoe UI';
  ctx.fillText('MACHINE', machineX + 40, cy - 8);
  ctx.fillText(`η=${eff}%`, machineX + 40, cy + 10);

  // Useful output (green, going right)
  ctx.fillStyle = 'rgba(22,163,74,0.65)';
  ctx.fillRect(machineX + 80, cy - usefulH / 2, endX - machineX - 80, usefulH);
  ctx.fillStyle = '#16a34a'; ctx.font = 'bold 12px Segoe UI';
  ctx.fillText('Useful', endX + 10, cy - usefulH / 2 - 6);
  ctx.fillText(`${useful} J`, endX + 10, cy - usefulH / 2 + 14);

  // Wasted (red, going up-right)
  ctx.fillStyle = 'rgba(220,38,38,0.5)';
  ctx.beginPath();
  ctx.moveTo(machineX + 80, cy - totalH / 2 + usefulH);
  ctx.lineTo(machineX + 80, cy - totalH / 2);
  ctx.lineTo(endX - 30, cy - totalH / 2 - 50);
  ctx.lineTo(endX - 30, cy - totalH / 2 - 50 - wastedH * 0.6);
  ctx.lineTo(endX + 20, cy - totalH / 2 - 50 - wastedH * 0.6);
  ctx.lineTo(endX + 20, cy - totalH / 2 - 50);
  ctx.lineTo(machineX + 80, cy - totalH / 2 + usefulH);
  ctx.fill();
  ctx.fillStyle = '#dc2626'; ctx.font = 'bold 12px Segoe UI';
  ctx.fillText('Wasted', endX - 10, cy - totalH / 2 - 55 - wastedH * 0.3);
  ctx.fillText(`${wasted} J`, endX - 10, cy - totalH / 2 - 40 - wastedH * 0.3);
}

/* ===== SPRING LAB ===== */
function initSpringLab() {
  const kSlider = document.getElementById('springKSlider');
  const xSlider = document.getElementById('springXSlider');
  const canvas = document.getElementById('springCanvas');
  if (!canvas || !kSlider) return;
  const ctx = canvas.getContext('2d');

  function update() {
    const k = +kSlider.value;
    const xCm = +xSlider.value;
    const x = xCm / 100;
    const F = round2(k * x);
    const EPE = round2(0.5 * k * x * x);
    setText('springKVal', k); setText('springXVal', x.toFixed(2));
    setText('springForce', F + ' N'); setText('springEPE', EPE + ' J');
    drawSpring(ctx, canvas, k, x, F, EPE);
  }
  kSlider.addEventListener('input', update);
  xSlider.addEventListener('input', update);
  update();
}

function drawSpring(ctx, canvas, k, x, F, EPE) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  const wallX = 50, cy = H / 2;
  const naturalLen = 120;
  const extension = Math.min(x * 200, 200);
  const springEnd = wallX + naturalLen + extension;

  // Wall
  ctx.fillStyle = isDark ? '#2a4a32' : '#d1e0d8'; ctx.fillRect(0, cy - 60, wallX, 120);
  ctx.strokeStyle = isDark ? '#0f7a5a' : '#4b5563'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(wallX, cy - 60); ctx.lineTo(wallX, cy + 60); ctx.stroke();
  for (let y = cy - 50; y < cy + 60; y += 15) {
    ctx.beginPath(); ctx.moveTo(wallX, y); ctx.lineTo(wallX - 14, y + 10); ctx.stroke();
  }

  // Spring coils
  const coils = 8;
  const coilW = (springEnd - wallX) / coils;
  const amp = 20 + extension * 0.05;
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(wallX, cy);
  for (let i = 0; i <= coils * 20; i++) {
    const px = wallX + (i / (coils * 20)) * (springEnd - wallX);
    const py = cy + amp * Math.sin((i / 20) * Math.PI * 2);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Block
  ctx.fillStyle = extension > 160 ? '#fee2e2' : '#d1fae5';
  ctx.strokeStyle = extension > 160 ? '#dc2626' : '#0f7a5a'; ctx.lineWidth = 2;
  ctx.fillRect(springEnd, cy - 25, 50, 50); ctx.strokeRect(springEnd, cy - 25, 50, 50);
  ctx.fillStyle = extension > 160 ? '#dc2626' : '#0f7a5a'; ctx.font = '22px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('📦', springEnd + 25, cy + 12);

  // Extension arrow
  if (extension > 5) {
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(wallX + naturalLen, cy + 40); ctx.lineTo(springEnd, cy + 40); ctx.stroke();
    ctx.setLineDash([]);
    drawArrowHead(ctx, wallX + naturalLen + 5, cy + 40, wallX + naturalLen, cy + 40, '#d97706');
    drawArrowHead(ctx, springEnd - 5, cy + 40, springEnd, cy + 40, '#d97706');
    ctx.fillStyle = '#d97706'; ctx.font = 'bold 12px Segoe UI';
    ctx.fillText(`x = ${x.toFixed(2)} m`, (wallX + naturalLen + springEnd) / 2, cy + 56);
  }

  // Natural length marker
  ctx.strokeStyle = isDark ? '#2a4a32' : '#d1e0d8'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(wallX + naturalLen, cy - 35); ctx.lineTo(wallX + naturalLen, cy + 35); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = isDark ? '#5a8a6a' : '#6b8a78'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText('Natural', wallX + naturalLen, cy - 40);

  // Labels
  ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = '12px Segoe UI'; ctx.textAlign = 'left';
  ctx.fillText(`F = ${F} N`, 10, 24);
  ctx.fillStyle = '#0f7a5a';
  ctx.fillText(`EPE = ${EPE} J`, 10, 44);
}

/* ===== HOOKE'S LAW GRAPH ===== */
const hookePoints = [];

function initHookeLab() {
  const kSlider = document.getElementById('hookeKSlider');
  const xSlider = document.getElementById('hookeXSlider');
  const canvas = document.getElementById('hookeCanvas');
  if (!canvas || !kSlider) return;
  const ctx = canvas.getContext('2d');

  function update() {
    const k = +kSlider.value;
    const xCm = +xSlider.value;
    const x = xCm / 100;
    const F = round2(k * x);
    setText('hookeKVal', k); setText('hookeXVal', x.toFixed(2));
    setText('hookeK2', k); setText('hookeX2', x.toFixed(2)); setText('hookeF', F + ' N');
    const withinLimit = x <= ELASTIC_LIMIT_X;
    const elasticEl = document.getElementById('hookeElastic');
    if (elasticEl) { elasticEl.textContent = withinLimit ? '✓ Yes' : '✗ No — Elastic Limit Exceeded!'; elasticEl.className = withinLimit ? 'elastic-ok' : 'elastic-warn'; }
    // Add point
    hookePoints.push({ x, F });
    if (hookePoints.length > 60) hookePoints.shift();
    drawHookeGraph(ctx, canvas, k);
  }
  kSlider.addEventListener('input', update);
  xSlider.addEventListener('input', () => { hookePoints.length = 0; update(); });
  update();
}

function drawHookeGraph(ctx, canvas, k) {
  const W = canvas.width, H = canvas.height;
  const isDark = document.body.classList.contains('dark');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = isDark ? '#1a2e1e' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);

  const pad = { t: 30, r: 20, b: 50, l: 60 };
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;

  // Axes
  ctx.strokeStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + gH); ctx.lineTo(pad.l + gW, pad.t + gH); ctx.stroke();

  const maxX = 0.6, maxF = k * maxX;
  // Grid
  ctx.strokeStyle = isDark ? '#2a4a32' : '#e5efe9'; ctx.lineWidth = 1;
  for (let xi = 0; xi <= 6; xi++) {
    const px = pad.l + (xi / 6) * gW;
    ctx.beginPath(); ctx.moveTo(px, pad.t); ctx.lineTo(px, pad.t + gH); ctx.stroke();
    ctx.fillStyle = isDark ? '#a8ccb8' : '#4b5563'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'center';
    ctx.fillText((xi * 0.1).toFixed(1) + 'm', px, pad.t + gH + 16);
  }
  for (let yi = 0; yi <= 5; yi++) {
    const py = pad.t + gH - (yi / 5) * gH;
    ctx.beginPath(); ctx.moveTo(pad.l, py); ctx.lineTo(pad.l + gW, py); ctx.stroke();
    ctx.fillStyle = isDark ? '#a8ccb8' : '#4b5563'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'right';
    ctx.fillText(round2(yi / 5 * maxF) + 'N', pad.l - 6, py + 4);
  }

  // Elastic limit marker
  const elX = pad.l + (ELASTIC_LIMIT_X / maxX) * gW;
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]);
  ctx.beginPath(); ctx.moveTo(elX, pad.t); ctx.lineTo(elX, pad.t + gH); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 10px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText('⚠ Elastic Limit', elX, pad.t + 14);

  // Ideal Hooke's Law line
  ctx.strokeStyle = 'rgba(14,138,138,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t + gH);
  ctx.lineTo(pad.l + (ELASTIC_LIMIT_X / maxX) * gW, pad.t + gH - (k * ELASTIC_LIMIT_X / maxF) * gH);
  ctx.stroke(); ctx.setLineDash([]);

  // Plot points
  ctx.strokeStyle = '#0f7a5a'; ctx.lineWidth = 2.5;
  ctx.beginPath();
  hookePoints.forEach((pt, i) => {
    const px = pad.l + (pt.x / maxX) * gW;
    const py = pad.t + gH - (pt.F / maxF) * gH;
    const clamped = Math.max(pad.t, Math.min(pad.t + gH, py));
    if (i === 0) ctx.moveTo(px, clamped); else ctx.lineTo(px, clamped);
  });
  ctx.stroke();

  // Dots
  hookePoints.forEach(pt => {
    const px = pad.l + (pt.x / maxX) * gW;
    const py = pad.t + gH - (pt.F / maxF) * gH;
    const isOver = pt.x > ELASTIC_LIMIT_X;
    ctx.fillStyle = isOver ? '#dc2626' : '#0f7a5a';
    ctx.beginPath(); ctx.arc(px, Math.max(pad.t, Math.min(pad.t + gH, py)), 4, 0, Math.PI * 2); ctx.fill();
  });

  // Labels
  ctx.fillStyle = isDark ? '#a8ccb8' : '#2d4a3a'; ctx.font = 'bold 12px Segoe UI'; ctx.textAlign = 'center';
  ctx.fillText('Extension x (m)', pad.l + gW / 2, H - 6);
  ctx.save(); ctx.translate(14, pad.t + gH / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('Force F (N)', 0, 0); ctx.restore();
  ctx.fillText(`Force vs Extension  (k = ${k} N/m)`, pad.l + gW / 2, pad.t - 10);
}

/* ===== NUMERICAL TOGGLE ===== */
function toggleNumerical(header) {
  const body = header.nextElementSibling;
  const toggle = header.querySelector('.num-toggle');
  if (!body) return;
  const isOpen = body.classList.toggle('open');
  if (toggle) toggle.textContent = isOpen ? '− Hide Solution' : '+ Show Solution';
  body.style.display = isOpen ? 'block' : 'none';
}
// Make it global
window.toggleNumerical = toggleNumerical;

/* ===== CONCEPT CHALLENGES ===== */
const CHALLENGES = [
  { q: 'A person pushes a wall for 10 minutes. The wall does not move. Is work done?', a: 'No. Work requires displacement. Since d = 0, W = Fd cos θ = 0. No work is done, even though force is applied and muscles are getting tired!' },
  { q: 'A force acts perfectly perpendicular to displacement. What is the work done?', a: 'W = Fd cos 90° = Fd × 0 = 0 J. Zero work! The force has no component in the direction of motion.' },
  { q: 'If velocity is doubled, what happens to kinetic energy?', a: 'KE = ½mv². If v → 2v: KE = ½m(2v)² = 4 × ½mv² → KE becomes FOUR times. This is the v² relationship!' },
  { q: 'Two machines do the same work. One does it in half the time. Which has greater power?', a: 'The faster machine. P = W/t. Same W but half the t → Power is doubled. Power measures the RATE of doing work.' },
  { q: 'A satellite moves in a circular orbit. The gravitational force is centripetal. How much work does gravity do?', a: 'Zero! In uniform circular motion, gravitational force is always perpendicular to velocity (and displacement), so cos 90° = 0. W = 0.' },
  { q: 'Can kinetic energy ever be negative?', a: 'No! KE = ½mv². Since mass m > 0 and v² ≥ 0 always, KE ≥ 0. Energy is always non-negative.' },
  { q: 'A ball is thrown upward. What happens to its mechanical energy as it rises (ignoring air resistance)?', a: 'Mechanical energy stays constant! KE decreases (ball slows down) but PE increases by the same amount. KE + PE = constant.' },
  { q: 'Friction does negative work on a sliding object. What does this mean physically?', a: 'Negative work means friction removes kinetic energy from the object. The object slows down because some of its KE is converted to heat. ΔKE = W_friction < 0.' },
  { q: 'A spring is compressed by 2 cm and stores energy X. How much energy does it store when compressed 4 cm?', a: 'EPE = ½kx². If x doubles, EPE = ½k(2x)² = 4 × ½kx² = 4X. Energy becomes FOUR times because of the x² relationship.' },
  { q: 'Efficiency of a machine is 80%. What fraction of input energy is wasted?', a: '20% is wasted. Useful output = 80%, so wasted = 100% − 80% = 20%. Real machines always lose some energy to friction and heat.' },
];

function initChallenges() {
  const grid = document.getElementById('challengesGrid');
  if (!grid) return;
  CHALLENGES.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
      <div class="ch-q">Q${i + 1}. ${ch.q}</div>
      <button class="btn-reveal-ch" onclick="toggleChallenge(this)">💡 Reveal Answer</button>
      <div class="ch-answer">${ch.a}</div>
    `;
    grid.appendChild(card);
  });
}

function toggleChallenge(btn) {
  const ans = btn.nextElementSibling;
  if (!ans) return;
  const isVisible = ans.classList.toggle('visible');
  btn.textContent = isVisible ? '🔒 Hide Answer' : '💡 Reveal Answer';
}
window.toggleChallenge = toggleChallenge;

/* ===== MCQ DATA ===== */
const MCQ_DATA = [
  { q: 'Which of the following is the SI unit of work?', opts: ['Watt', 'Joule', 'Newton', 'Pascal'], ans: 1, exp: 'Work is measured in Joules (J). 1 J = 1 N·m. Watt is for power, Newton for force.' },
  { q: 'A force of 20 N acts on a box. The box moves 5 m in the direction of force. What is the work done?', opts: ['4 J', '25 J', '100 J', '200 J'], ans: 2, exp: 'W = Fd cos 0° = 20 × 5 × 1 = 100 J.' },
  { q: 'A man carries a heavy bag on his head and walks horizontally. The work done by gravity is:', opts: ['Positive', 'Negative', 'Zero', 'Depends on bag weight'], ans: 2, exp: 'Gravity acts downward, displacement is horizontal. θ = 90°, cos 90° = 0. Work by gravity = 0.' },
  { q: 'If velocity of an object doubles, its kinetic energy becomes:', opts: ['Double', 'Half', 'Four times', 'Same'], ans: 2, exp: 'KE = ½mv². If v → 2v, KE = ½m(2v)² = 4 × ½mv². KE becomes four times.' },
  { q: 'KE = ½mv². Which variable has the greatest effect on kinetic energy?', opts: ['Mass', 'Velocity', 'Time', 'Force'], ans: 1, exp: 'Velocity has a squared (v²) effect. Doubling v quadruples KE. Mass has only a linear effect.' },
  { q: 'The gravitational potential energy of an object is PE = mgh. If height doubles, PE:', opts: ['Halves', 'Doubles', 'Quadruples', 'Stays the same'], ans: 1, exp: 'PE = mgh. PE ∝ h (linear). If h doubles, PE doubles.' },
  { q: 'An object falls freely from height h. Just before hitting the ground (no air resistance), its kinetic energy equals:', opts: ['0', 'mgh/2', 'mgh', '2mgh'], ans: 2, exp: 'By conservation of energy: all PE converts to KE. KE = mgh.' },
  { q: 'The work-energy theorem states that net work done on an object equals:', opts: ['Its total energy', 'Its momentum', 'Change in kinetic energy', 'Change in potential energy'], ans: 2, exp: 'W_net = ΔKE = KE_f − KE_i. This is the work-energy theorem.' },
  { q: 'Which of these does negative work on a sliding object?', opts: ['Applied push force', 'Normal force', 'Friction', 'Gravity (horizontal motion)'], ans: 2, exp: 'Friction always opposes motion, so θ = 180°, cos 180° = −1. Friction does negative work.' },
  { q: 'Power is defined as:', opts: ['Force × velocity', 'Work done per unit time', 'Force × displacement', 'Both A and B'], ans: 3, exp: 'P = W/t (work per time) and P = Fv (for constant force and velocity). Both are correct.' },
  { q: 'The SI unit of power is:', opts: ['Joule', 'Newton', 'Watt', 'Pascal'], ans: 2, exp: 'Power is measured in Watts (W). 1 W = 1 J/s.' },
  { q: 'Efficiency of a machine can be MOST accurately described as:', opts: ['Power output divided by power input', 'Force output divided by force input', 'Useful energy output × 100% / energy input', 'Work input / work output'], ans: 2, exp: 'η = (Useful Energy Output / Energy Input) × 100%. For an ideal machine, η = 100%.' },
  { q: 'Which efficiency value is impossible for a real machine?', opts: ['50%', '75%', '100%', 'None — all are possible'], ans: 2, exp: '100% efficiency is impossible for real machines because energy is always lost (heat, friction, sound). η < 100% always.' },
  { q: 'Hooke\'s Law states F = kx. What does k represent?', opts: ['Extension', 'Force', 'Spring constant (stiffness)', 'Elastic potential energy'], ans: 2, exp: 'k is the spring constant, measured in N/m. It measures the stiffness of the spring.' },
  { q: 'Elastic potential energy stored in a spring is:', opts: ['kx', '2kx²', '½kx²', 'kx²/4'], ans: 2, exp: 'EPE = ½kx². The ½ factor arises because force builds from 0 to kx (average = kx/2).' },
  { q: 'A spring of constant k = 500 N/m is compressed 0.2 m. The elastic PE stored is:', opts: ['10 J', '50 J', '100 J', '200 J'], ans: 0, exp: 'EPE = ½kx² = ½ × 500 × 0.04 = 10 J.' },
  { q: 'At the top of a roller coaster, compared to the bottom, the car has:', opts: ['More KE, less PE', 'Less KE, more PE', 'Same KE and PE', 'More of both'], ans: 1, exp: 'At the top, height is maximum → PE is high, KE is low. At the bottom, all PE has converted to KE.' },
  { q: 'When a pendulum swings, at the equilibrium position (lowest point):', opts: ['KE = 0', 'PE is maximum', 'KE is maximum', 'Total energy = 0'], ans: 2, exp: 'At the lowest point, height = 0 (PE = 0) so all energy is KE. KE is maximum here.' },
  { q: 'A 5 kg object has KE = 250 J. Its speed is:', opts: ['5 m/s', '10 m/s', '50 m/s', '100 m/s'], ans: 1, exp: 'KE = ½mv² → 250 = ½(5)v² → v² = 100 → v = 10 m/s.' },
  { q: 'An engine does 6000 J of work in 30 s. Its power output is:', opts: ['60 W', '180 W', '200 W', '2000 W'], ans: 2, exp: 'P = W/t = 6000/30 = 200 W.' },
  { q: 'A force F is applied at angle θ to displacement d. Work is maximum when:', opts: ['θ = 90°', 'θ = 180°', 'θ = 0°', 'θ = 45°'], ans: 2, exp: 'W = Fd cos θ. cos θ is maximum (= 1) when θ = 0°. So work is maximum when force is parallel to displacement.' },
  { q: 'What is the total mechanical energy of an object of mass 2 kg at height 5 m moving at 4 m/s?', opts: ['16 J', '98 J', '114 J', '82 J'], ans: 2, exp: 'KE = ½ × 2 × 16 = 16 J. PE = 2 × 9.8 × 5 = 98 J. Total = 16 + 98 = 114 J.' },
  { q: 'The law of conservation of energy states that in a closed system, total energy is:', opts: ['Always increasing', 'Always decreasing', 'Constant', 'Equal to kinetic energy'], ans: 2, exp: 'Energy cannot be created or destroyed. It can only be transferred or transformed. Total energy in a closed system is constant.' },
  { q: 'If a force does negative work on an object, the object\'s kinetic energy:', opts: ['Increases', 'Decreases', 'Stays the same', 'Becomes negative'], ans: 1, exp: 'W_net = ΔKE. If W < 0, then ΔKE < 0, so KE decreases. The object slows down.' },
  { q: 'A machine has input power 400 W and efficiency 75%. What is the useful output power?', opts: ['300 W', '400 W', '350 W', '100 W'], ans: 0, exp: 'Useful output = η × input = 0.75 × 400 = 300 W.' },
  { q: 'Hooke\'s Law is valid only:', opts: ['For all materials', 'Within the elastic limit', 'Above the elastic limit', 'For rigid bodies only'], ans: 1, exp: 'F = kx only holds within the elastic limit. Beyond this, the spring is permanently deformed and Hooke\'s Law fails.' },
  { q: 'A car moves at constant velocity. The engine force equals friction. Net work is:', opts: ['Positive', 'Negative', 'Zero', 'Cannot say'], ans: 2, exp: 'Net force = 0 (engine = friction). W_net = F_net × d = 0. By the work-energy theorem, ΔKE = 0 (constant velocity).' },
  { q: 'Which of the following stores elastic potential energy?', opts: ['A stone on a table', 'A stretched rubber band', 'A moving car', 'A lit candle'], ans: 1, exp: 'A stretched rubber band stores elastic PE (EPE = ½kx²). A stone has gravitational PE; a moving car has KE; a candle has chemical energy.' },
  { q: 'Two workers lift identical boxes to the same height. Worker A takes 20 s, Worker B takes 40 s. Which statement is correct?', opts: ['A does more work', 'B does more work', 'Both do the same work', 'A has more power and does more work'], ans: 2, exp: 'W = mgh — same mass, same g, same h → same work. But A takes half the time, so A has double the power.' },
  { q: 'A spring is stretched by 0.1 m with force 50 N. Its spring constant k is:', opts: ['5 N/m', '50 N/m', '500 N/m', '0.002 N/m'], ans: 2, exp: 'F = kx → k = F/x = 50/0.1 = 500 N/m.' },
];

let mcqState = { started: false, selected: [], checked: [], score: 0 };

function initMCQ() {
  const startScreen = document.getElementById('mcqStartScreen');
  const questions = document.getElementById('mcqQuestions');
  const resultsDiv = document.getElementById('mcqResults');
  const beginBtn = document.getElementById('mcqBegin');
  const startBtn = document.getElementById('mcqStart');
  const resetBtn = document.getElementById('mcqReset');

  const savedBest = localStorage.getItem('we_mcq_best');
  setText('mcqBest', savedBest ? savedBest + '%' : '—');
  setText('mcqTotal', MCQ_DATA.length);

  if (beginBtn) beginBtn.addEventListener('click', startMCQ);
  if (startBtn) startBtn.addEventListener('click', startMCQ);
  if (resetBtn) resetBtn.addEventListener('click', resetMCQ);
}

function startMCQ() {
  const startScreen = document.getElementById('mcqStartScreen');
  const questions = document.getElementById('mcqQuestions');
  if (startScreen) startScreen.style.display = 'none';
  if (questions) { questions.style.display = 'block'; questions.innerHTML = ''; }

  mcqState = { started: true, selected: new Array(MCQ_DATA.length).fill(null), checked: new Array(MCQ_DATA.length).fill(false), score: 0 };

  MCQ_DATA.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'mcq-question';
    div.innerHTML = `
      <div class="mcq-q-number">Question ${qi + 1} of ${MCQ_DATA.length}</div>
      <div class="mcq-q-text">${q.q}</div>
      <div class="mcq-options" id="opts-${qi}">
        ${q.opts.map((opt, oi) => `
          <div class="mcq-option" data-qi="${qi}" data-oi="${oi}" onclick="selectMCQ(${qi}, ${oi})">
            <span class="opt-letter">${'ABCD'[oi]}</span>
            ${opt}
          </div>
        `).join('')}
      </div>
      <button class="mcq-check-btn" id="check-${qi}" onclick="checkMCQ(${qi})" disabled>Check Answer</button>
      <div class="mcq-explanation" id="exp-${qi}">${q.exp}</div>
    `;
    questions.appendChild(div);
  });

  updateMCQScore();
}

function selectMCQ(qi, oi) {
  if (mcqState.checked[qi]) return;
  mcqState.selected[qi] = oi;
  document.querySelectorAll(`#opts-${qi} .mcq-option`).forEach((el, i) => {
    el.classList.toggle('selected', i === oi);
  });
  const checkBtn = document.getElementById(`check-${qi}`);
  if (checkBtn) checkBtn.disabled = false;
}
window.selectMCQ = selectMCQ;

function checkMCQ(qi) {
  if (mcqState.checked[qi]) return;
  mcqState.checked[qi] = true;
  const sel = mcqState.selected[qi];
  const correct = MCQ_DATA[qi].ans;
  const wasCorrect = sel === correct;
  if (wasCorrect) mcqState.score++;

  document.querySelectorAll(`#opts-${qi} .mcq-option`).forEach((el, i) => {
    el.classList.add('locked');
    el.classList.remove('selected');
    if (i === correct) el.classList.add('correct');
    else if (i === sel && !wasCorrect) el.classList.add('wrong');
  });

  const expEl = document.getElementById(`exp-${qi}`);
  if (expEl) expEl.classList.add('visible');
  const checkBtn = document.getElementById(`check-${qi}`);
  if (checkBtn) { checkBtn.disabled = true; checkBtn.textContent = wasCorrect ? '✓ Correct!' : '✗ Wrong'; checkBtn.style.background = wasCorrect ? 'var(--success)' : 'var(--error)'; }

  updateMCQScore();

  const allChecked = mcqState.checked.every(Boolean);
  if (allChecked) setTimeout(showMCQResults, 800);
}
window.checkMCQ = checkMCQ;

function updateMCQScore() {
  const answered = mcqState.checked.filter(Boolean).length;
  setText('mcqScore', mcqState.score + '/' + answered);
}

function showMCQResults() {
  const questions = document.getElementById('mcqQuestions');
  const resultsDiv = document.getElementById('mcqResults');
  if (questions) questions.style.display = 'none';
  if (!resultsDiv) return;
  resultsDiv.style.display = 'block';

  const total = MCQ_DATA.length;
  const pct = Math.round(mcqState.score / total * 100);
  const wrong = total - mcqState.score;

  const savedBest = +(localStorage.getItem('we_mcq_best') || 0);
  if (pct > savedBest) { localStorage.setItem('we_mcq_best', pct); setText('mcqBest', pct + '%'); }

  let level, levelClass;
  if (pct >= 90) { level = '🏆 Excellent'; levelClass = 'level-excellent'; }
  else if (pct >= 70) { level = '✅ Good'; levelClass = 'level-good'; }
  else if (pct >= 50) { level = '⚡ Fair'; levelClass = 'level-fair'; }
  else { level = '📚 Needs More Practice'; levelClass = 'level-needs-work'; }

  resultsDiv.innerHTML = `
    <h3>Quiz Complete!</h3>
    <div class="results-score">${mcqState.score}/${total}</div>
    <div class="results-pct">${pct}%</div>
    <div class="results-grid">
      <div class="result-stat"><span class="rs-val" style="color:var(--success)">${mcqState.score}</span><span class="rs-label">Correct</span></div>
      <div class="result-stat"><span class="rs-val" style="color:var(--error)">${wrong}</span><span class="rs-label">Incorrect</span></div>
      <div class="result-stat"><span class="rs-val" style="color:var(--primary)">${pct}%</span><span class="rs-label">Score</span></div>
    </div>
    <div class="performance-level ${levelClass}">${level}</div>
    <button class="btn-primary" onclick="resetMCQ()">Try Again</button>
  `;
}

function resetMCQ() {
  const startScreen = document.getElementById('mcqStartScreen');
  const questions = document.getElementById('mcqQuestions');
  const results = document.getElementById('mcqResults');
  if (startScreen) startScreen.style.display = 'block';
  if (questions) { questions.style.display = 'none'; questions.innerHTML = ''; }
  if (results) { results.style.display = 'none'; results.innerHTML = ''; }
  mcqState = { started: false, selected: [], checked: [], score: 0 };
  setText('mcqScore', '0');
  updateMCQScore();
}
window.resetMCQ = resetMCQ;

/* ===== FLASHCARDS ===== */
const FLASHCARDS = [
  { front: 'What is Work?', back: 'Work is done when a force causes displacement in the direction of the force. W = Fd cos θ. SI unit: Joule (J).' },
  { front: 'What is Positive Work?', back: 'Work done when force has a component in the direction of displacement. θ < 90°, so cos θ > 0 → W > 0. Object gains kinetic energy.' },
  { front: 'What is Negative Work?', back: 'Work done when force opposes displacement. θ > 90°, cos θ < 0 → W < 0. Object loses kinetic energy. Example: friction.' },
  { front: 'When is Work Zero?', back: 'Three cases: (1) No displacement (d=0), (2) No force (F=0), (3) Force perpendicular to displacement (θ=90°, cos 90°=0).' },
  { front: 'What is Energy?', back: 'Energy is the capacity of a system to do work. It exists in many forms (KE, PE, thermal, etc.). SI unit: Joule (J).' },
  { front: 'Kinetic Energy Formula', back: 'KE = ½mv²\nKE ∝ m (linear)\nKE ∝ v² (quadratic)\nDouble v → KE becomes 4×.' },
  { front: 'Potential Energy Formula', back: 'Gravitational PE = mgh\nPE ∝ m, PE ∝ h (both linear)\nDouble height → PE doubles.' },
  { front: 'What is Power?', back: 'Power is the rate of doing work. P = W/t or P = Fv. SI unit: Watt (W). 1 W = 1 J/s.' },
  { front: 'What is Efficiency?', back: 'η = (Useful Output / Input) × 100%. For real machines, η < 100% because energy is wasted as heat, sound, or friction.' },
  { front: 'Conservation of Energy', back: 'Energy cannot be created or destroyed. It can only change form. In a closed system: Total energy = constant.' },
  { front: 'Work-Energy Theorem', back: 'W_net = ΔKE = KE_f − KE_i. The net work done on an object equals its change in kinetic energy.' },
  { front: 'Hooke\'s Law', back: 'F = kx (within elastic limit). k = spring constant (N/m). The restoring force is proportional to extension.' },
  { front: 'Elastic Potential Energy', back: 'EPE = ½kx². The energy stored in a stretched or compressed spring. Doubling extension → EPE becomes 4×.' },
  { front: 'Mechanical Energy', back: 'E = KE + PE. In the absence of non-conservative forces: KE_i + PE_i = KE_f + PE_f. Total mechanical energy is conserved.' },
  { front: 'What is the Spring Constant (k)?', back: 'k measures spring stiffness. k = F/x. Units: N/m. Large k = stiff spring. Small k = flexible spring. Valid only within elastic limit.' },
];

let fcCurrent = 0, fcFlipped = false;

function initFlashcards() {
  const grid = document.getElementById('fcGrid');
  if (grid) {
    FLASHCARDS.forEach((card, i) => {
      const mini = document.createElement('div');
      mini.className = 'fc-mini' + (i === 0 ? ' active-mini' : '');
      mini.textContent = card.front.split(' ').slice(0, 4).join(' ') + '...';
      mini.addEventListener('click', () => goToCard(i));
      grid.appendChild(mini);
    });
  }
  renderCard();
  document.getElementById('fcPrev') && document.getElementById('fcPrev').addEventListener('click', () => goToCard(fcCurrent - 1));
  document.getElementById('fcNext') && document.getElementById('fcNext').addEventListener('click', () => goToCard(fcCurrent + 1));
}

function goToCard(i) {
  fcCurrent = (i + FLASHCARDS.length) % FLASHCARDS.length;
  fcFlipped = false;
  renderCard();
}

function renderCard() {
  const card = document.getElementById('flashcard');
  const front = document.getElementById('fcFront');
  const back = document.getElementById('fcBack');
  const counter = document.getElementById('fcCounter');
  if (!card || !front || !back) return;
  const data = FLASHCARDS[fcCurrent];
  front.textContent = data.front;
  back.textContent = data.back;
  card.classList.toggle('flipped', fcFlipped);
  if (counter) counter.textContent = `${fcCurrent + 1} / ${FLASHCARDS.length}`;
  document.querySelectorAll('.fc-mini').forEach((m, i) => m.classList.toggle('active-mini', i === fcCurrent));
}

function flipCard() {
  fcFlipped = !fcFlipped;
  const card = document.getElementById('flashcard');
  if (card) card.classList.toggle('flipped', fcFlipped);
}
window.flipCard = flipCard;

/* ===== FORMULA COPY ===== */
function copyFormula(formula, btn) {
  navigator.clipboard.writeText(formula).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    showToast('Formula copied: ' + formula);
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => { showToast('Copy: ' + formula); });
}
window.copyFormula = copyFormula;

/* ===== POWER CALC LIVE ===== */
function initPowerCalcLive() {
  // Already handled in initPowerCalc
}

/* ===== NUMERICAL DISPLAY FIX ===== */
function initNumericalDisplay() {
  document.querySelectorAll('.num-body').forEach(body => { body.style.display = 'none'; });
}

/* ===== REDRAW ON THEME ===== */
function bindThemeRedraw() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;
  themeBtn.addEventListener('click', () => {
    setTimeout(() => {
      drawAngleDiagram();
      drawWorkTypeCanvases();
    }, 100);
  });
}

/* ===== SMOOTH SCROLL FOR SIDEBAR LINKS ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 900) {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('open');
        }
      }
    });
  });
}

/* ===== MAIN INIT ===== */
function init() {
  initTheme();
  initSidebar();
  initProgress();
  initHero();
  drawAngleDiagram();
  initWorkReveal();
  initWorkLab();
  drawWorkTypeCanvases();
  initKELab();
  initPELab();
  initRampLab();
  initWETSim();
  initPowerRace();
  initPowerCalc();
  initEfficiencyLab();
  initSpringLab();
  initHookeLab();
  initChallenges();
  initMCQ();
  initFlashcards();
  initNumericalDisplay();
  bindThemeRedraw();
  initSmoothScroll();
}

document.addEventListener('DOMContentLoaded', init);
