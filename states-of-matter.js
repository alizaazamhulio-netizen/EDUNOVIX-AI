/**
 * STATES OF MATTER — MDCAT VIRTUAL LAB JAVASCRIPT
 * 100% Vanilla JS Engine: Interactive Particle Simulations, Gas Laws,
 * Phase Changes, Calculators, Smart Search, Progress & 25-Question MDCAT Quiz.
 */

// ==========================================
// 1. STATE & STORAGE MANAGEMENT
// ==========================================
const LabState = {
  theme: localStorage.getItem('mdcat_theme') || 'dark',
  completedTopics: JSON.parse(localStorage.getItem('mdcat_completed_topics') || '[]'),
  bookmarkedTopics: JSON.parse(localStorage.getItem('mdcat_bookmarks') || '[]'),
  bestQuizScore: parseInt(localStorage.getItem('mdcat_quiz_best_score') || '0', 10),
  activeState: 'solid',
  heroPlaying: true,
  heroTemp: 300,
  gasPressureTemp: 300,
  gasPressureVol: 50,
  boyleVol: 50,
  charlesTemp: 300,
  pressureLawTemp: 300,
  evapTemp: 30,
  evapArea: 50,
  evapWind: 20,
  heatCurveStep: 0,
  heatCurvePlaying: false,
};

function saveState() {
  localStorage.setItem('mdcat_theme', LabState.theme);
  localStorage.setItem('mdcat_completed_topics', JSON.stringify(LabState.completedTopics));
  localStorage.setItem('mdcat_bookmarks', JSON.stringify(LabState.bookmarkedTopics));
  localStorage.setItem('mdcat_quiz_best_score', LabState.bestQuizScore.toString());
}

// ==========================================
// 2. THEME & INITIALIZATION
// ==========================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', LabState.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = LabState.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

function toggleTheme() {
  LabState.theme = LabState.theme === 'dark' ? 'light' : 'dark';
  saveState();
  initTheme();
}

// ==========================================
// 3. PROGRESS & TOPIC TRACKER
// ==========================================
const TOTAL_TOPICS = 18;

function updateProgressUI() {
  const count = LabState.completedTopics.length;
  const pct = Math.round((count / TOTAL_TOPICS) * 100);
  const fillElem = document.getElementById('progress-fill');
  const textElem = document.getElementById('progress-text');
  const headerPct = document.getElementById('header-progress-pct');
  
  if (fillElem) fillElem.style.width = `${pct}%`;
  if (textElem) textElem.textContent = `${pct}% Completed (${count}/${TOTAL_TOPICS})`;
  if (headerPct) headerPct.textContent = `${pct}%`;

  document.querySelectorAll('[data-topic-id]').forEach(elem => {
    const tid = elem.getAttribute('data-topic-id');
    const checkBtn = elem.querySelector('.btn-mark-complete');
    const starBtn = elem.querySelector('.btn-bookmark');

    if (checkBtn) {
      const isDone = LabState.completedTopics.includes(tid);
      checkBtn.classList.toggle('checked', isDone);
      checkBtn.innerHTML = isDone ? '✓ Completed' : '○ Mark Done';
    }
    if (starBtn) {
      const isStarred = LabState.bookmarkedTopics.includes(tid);
      starBtn.classList.toggle('bookmarked', isStarred);
      starBtn.innerHTML = isStarred ? '★ Saved' : '☆ Bookmark';
    }
  });
}

function toggleTopicComplete(topicId) {
  const idx = LabState.completedTopics.indexOf(topicId);
  if (idx > -1) {
    LabState.completedTopics.splice(idx, 1);
  } else {
    LabState.completedTopics.push(topicId);
  }
  saveState();
  updateProgressUI();
}

function toggleTopicBookmark(topicId) {
  const idx = LabState.bookmarkedTopics.indexOf(topicId);
  if (idx > -1) {
    LabState.bookmarkedTopics.splice(idx, 1);
  } else {
    LabState.bookmarkedTopics.push(topicId);
  }
  saveState();
  updateProgressUI();
}

// ==========================================
// 4. SMART SEARCH
// ==========================================
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const contentCards = document.querySelectorAll('.searchable-content');
    
    if (!query) {
      contentCards.forEach(c => {
        c.style.display = '';
        removeHighlights(c);
      });
      return;
    }

    contentCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
        highlightText(card, query);
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function removeHighlights(container) {
  const marks = container.querySelectorAll('mark.highlight');
  marks.forEach(m => {
    const parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });
}

function highlightText(container, term) {
  removeHighlights(container);
  // Basic safe highlight inside text nodes only
  function walk(node) {
    if (node.nodeType === 3) {
      const idx = node.nodeValue.toLowerCase().indexOf(term);
      if (idx >= 0) {
        const span = document.createElement('mark');
        span.className = 'highlight';
        const matched = node.splitText(idx);
        matched.splitText(term.length);
        span.appendChild(matched.cloneNode(true));
        matched.parentNode.replaceChild(span, matched);
      }
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'CANVAS' && node.nodeName !== 'BUTTON') {
      node.childNodes.forEach(child => walk(child));
    }
  }
  walk(container);
}

// ==========================================
// 5. HERO PARTICLE SIMULATION (3-ZONES)
// ==========================================
let heroCanvas, heroCtx;
let heroParticles = { solid: [], liquid: [], gas: [] };

function initHeroCanvas() {
  heroCanvas = document.getElementById('hero-canvas');
  if (!heroCanvas) return;
  heroCtx = heroCanvas.getContext('2d');
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas);

  createHeroParticles();
  requestAnimationFrame(animateHero);
}

function resizeHeroCanvas() {
  if (!heroCanvas) return;
  const rect = heroCanvas.parentElement.getBoundingClientRect();
  heroCanvas.width = rect.width;
  heroCanvas.height = rect.height || 300;
  createHeroParticles();
}

function createHeroParticles() {
  if (!heroCanvas) return;
  const w = heroCanvas.width;
  const h = heroCanvas.height;
  const zoneW = w / 3;

  // Solid (Zone 1)
  heroParticles.solid = [];
  const rows = 5, cols = 5;
  const startX = zoneW * 0.25;
  const startY = h * 0.3;
  const spacing = Math.min((zoneW * 0.5) / cols, (h * 0.45) / rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heroParticles.solid.push({
        baseX: startX + c * spacing,
        baseY: startY + r * spacing,
        x: startX + c * spacing,
        y: startY + r * spacing,
        phase: Math.random() * Math.PI * 2,
        r: 6
      });
    }
  }

  // Liquid (Zone 2)
  heroParticles.liquid = [];
  for (let i = 0; i < 28; i++) {
    heroParticles.liquid.push({
      x: zoneW + 15 + Math.random() * (zoneW - 30),
      y: h * 0.5 + Math.random() * (h * 0.45),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: 6
    });
  }

  // Gas (Zone 3)
  heroParticles.gas = [];
  for (let i = 0; i < 18; i++) {
    heroParticles.gas.push({
      x: zoneW * 2 + 15 + Math.random() * (zoneW - 30),
      y: 20 + Math.random() * (h - 40),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      r: 5
    });
  }
}

function animateHero() {
  if (!heroCanvas || !heroCtx) return;
  const w = heroCanvas.width;
  const h = heroCanvas.height;
  const zoneW = w / 3;

  heroCtx.clearRect(0, 0, w, h);

  // Draw Zone Dividers & Labels
  heroCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  heroCtx.setLineDash([4, 4]);
  heroCtx.beginPath();
  heroCtx.moveTo(zoneW, 10);
  heroCtx.lineTo(zoneW, h - 10);
  heroCtx.moveTo(zoneW * 2, 10);
  heroCtx.lineTo(zoneW * 2, h - 10);
  heroCtx.stroke();
  heroCtx.setLineDash([]);

  heroCtx.font = 'bold 13px system-ui, sans-serif';
  heroCtx.textAlign = 'center';
  
  heroCtx.fillStyle = '#38bdf8';
  heroCtx.fillText('🧊 SOLID (Vibrating)', zoneW * 0.5, 28);
  
  heroCtx.fillStyle = '#06b6d4';
  heroCtx.fillText('💧 LIQUID (Flowing)', zoneW * 1.5, 28);
  
  heroCtx.fillStyle = '#a855f7';
  heroCtx.fillText('💨 GAS (Random & Rapid)', zoneW * 2.5, 28);

  const speedScale = (LabState.heroTemp / 300) * (LabState.heroPlaying ? 1 : 0);

  // Animate Solid
  heroParticles.solid.forEach(p => {
    p.phase += 0.15 * speedScale;
    const amp = 1.8 * Math.min(speedScale, 2.5);
    p.x = p.baseX + Math.sin(p.phase) * amp;
    p.y = p.baseY + Math.cos(p.phase * 1.3) * amp;

    heroCtx.beginPath();
    heroCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    heroCtx.fillStyle = '#38bdf8';
    heroCtx.shadowColor = '#38bdf8';
    heroCtx.shadowBlur = 8;
    heroCtx.fill();
    heroCtx.shadowBlur = 0;
  });

  // Animate Liquid
  heroParticles.liquid.forEach(p => {
    p.x += p.vx * speedScale;
    p.y += p.vy * speedScale;

    // Boundary bounce
    if (p.x < zoneW + p.r || p.x > zoneW * 2 - p.r) p.vx *= -1;
    if (p.y < h * 0.45 || p.y > h - 12 - p.r) p.vy *= -1;

    heroCtx.beginPath();
    heroCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    heroCtx.fillStyle = '#06b6d4';
    heroCtx.shadowColor = '#06b6d4';
    heroCtx.shadowBlur = 8;
    heroCtx.fill();
    heroCtx.shadowBlur = 0;
  });

  // Animate Gas
  heroParticles.gas.forEach(p => {
    p.x += p.vx * speedScale;
    p.y += p.vy * speedScale;

    if (p.x < zoneW * 2 + p.r || p.x > w - 15) p.vx *= -1;
    if (p.y < 35 || p.y > h - 15) p.vy *= -1;

    heroCtx.beginPath();
    heroCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    heroCtx.fillStyle = '#c084fc';
    heroCtx.shadowColor = '#c084fc';
    heroCtx.shadowBlur = 10;
    heroCtx.fill();
    heroCtx.shadowBlur = 0;
  });

  requestAnimationFrame(animateHero);
}

// ==========================================
// 6. THREE STATES INTERACTIVE LAB
// ==========================================
let stateLabCanvas, stateLabCtx;
let stateLabParticles = [];
let stateLabTemp = 300;

const stateData = {
  solid: {
    name: 'Solid',
    emoji: '🧊',
    color: '#38bdf8',
    shape: 'Fixed (Rigid)',
    volume: 'Fixed',
    spacing: 'Very small (Tightly packed)',
    movement: 'Vibrates in fixed positions',
    force: 'Very Strong',
    compressibility: 'Extremely Low / Incompressible',
    flow: 'Does not flow',
    mdcatTip: 'Solids have the strongest intermolecular attraction and lowest kinetic energy.'
  },
  liquid: {
    name: 'Liquid',
    emoji: '💧',
    color: '#06b6d4',
    shape: 'Takes container shape',
    volume: 'Fixed',
    spacing: 'Small (Close together)',
    movement: 'Slides and flows past each other',
    force: 'Moderate (Weaker than solid)',
    compressibility: 'Very Low',
    flow: 'Flows easily',
    mdcatTip: 'Liquids have fixed volume because particles stay close, but can flow freely.'
  },
  gas: {
    name: 'Gas',
    emoji: '💨',
    color: '#a855f7',
    shape: 'No fixed shape (Fills whole container)',
    volume: 'No fixed volume (Compressible)',
    spacing: 'Very Large (Much empty space)',
    movement: 'Rapid, random, straight-line motion',
    force: 'Very Weak / Negligible',
    compressibility: 'High (Easily compressed)',
    flow: 'Flows and diffuses rapidly',
    mdcatTip: 'Gas pressure is caused by continuous particle collisions with container walls.'
  }
};

function initStateLab() {
  stateLabCanvas = document.getElementById('statelab-canvas');
  if (!stateLabCanvas) return;
  stateLabCtx = stateLabCanvas.getContext('2d');
  resizeStateLab();
  window.addEventListener('resize', resizeStateLab);

  selectState('solid');
  requestAnimationFrame(animateStateLab);
}

function resizeStateLab() {
  if (!stateLabCanvas) return;
  const rect = stateLabCanvas.parentElement.getBoundingClientRect();
  stateLabCanvas.width = rect.width;
  stateLabCanvas.height = 300;
  createStateLabParticles();
}

function selectState(st) {
  LabState.activeState = st;
  document.querySelectorAll('.state-card-select').forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-state') === st);
  });

  const data = stateData[st];
  const infoContainer = document.getElementById('state-info-display');
  if (infoContainer) {
    infoContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <span style="font-size: 2.2rem;">${data.emoji}</span>
        <div>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: ${data.color};">${data.name.toUpperCase()} STATE</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">MDCAT Core Particle Profile</p>
        </div>
      </div>
      <div class="state-prop-list">
        <div class="state-prop-item"><span class="state-prop-label">Shape</span><span class="state-prop-val">${data.shape}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Volume</span><span class="state-prop-val">${data.volume}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Particle Distance</span><span class="state-prop-val">${data.spacing}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Particle Movement</span><span class="state-prop-val">${data.movement}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Attractive Forces</span><span class="state-prop-val">${data.force}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Compressibility</span><span class="state-prop-val">${data.compressibility}</span></div>
        <div class="state-prop-item"><span class="state-prop-label">Can it Flow?</span><span class="state-prop-val">${data.flow}</span></div>
      </div>
      <div class="high-yield-box" style="margin-top: 1rem;">
        <div class="high-yield-icon">⭐</div>
        <div class="high-yield-content">
          <div class="high-yield-title">MDCAT HIGH-YIELD SUMMARY</div>
          ${data.mdcatTip}
        </div>
      </div>
    `;
  }

  createStateLabParticles();
}

function createStateLabParticles() {
  if (!stateLabCanvas) return;
  const w = stateLabCanvas.width;
  const h = stateLabCanvas.height;
  stateLabParticles = [];

  if (LabState.activeState === 'solid') {
    const cols = 8, rows = 6;
    const spacing = 28;
    const startX = (w - (cols - 1) * spacing) / 2;
    const startY = (h - (rows - 1) * spacing) / 2 + 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        stateLabParticles.push({
          baseX: startX + c * spacing,
          baseY: startY + r * spacing,
          x: startX + c * spacing,
          y: startY + r * spacing,
          phase: Math.random() * Math.PI * 2,
          r: 8
        });
      }
    }
  } else if (LabState.activeState === 'liquid') {
    for (let i = 0; i < 48; i++) {
      stateLabParticles.push({
        x: 40 + Math.random() * (w - 80),
        y: h * 0.45 + Math.random() * (h * 0.45),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: 8
      });
    }
  } else if (LabState.activeState === 'gas') {
    for (let i = 0; i < 28; i++) {
      stateLabParticles.push({
        x: 20 + Math.random() * (w - 40),
        y: 20 + Math.random() * (h - 40),
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        r: 6
      });
    }
  }
}

function animateStateLab() {
  if (!stateLabCanvas || !stateLabCtx) return;
  const w = stateLabCanvas.width;
  const h = stateLabCanvas.height;

  stateLabCtx.clearRect(0, 0, w, h);

  // Draw Container Beaker
  stateLabCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  stateLabCtx.lineWidth = 2;
  stateLabCtx.strokeRect(15, 15, w - 30, h - 30);

  const speedScale = stateLabTemp / 300;
  const curColor = stateData[LabState.activeState].color;

  if (LabState.activeState === 'solid') {
    // Intermolecular bond lines
    stateLabCtx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    stateLabCtx.lineWidth = 1;
    for (let i = 0; i < stateLabParticles.length; i++) {
      for (let j = i + 1; j < stateLabParticles.length; j++) {
        const dx = stateLabParticles[i].x - stateLabParticles[j].x;
        const dy = stateLabParticles[i].y - stateLabParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 34) {
          stateLabCtx.beginPath();
          stateLabCtx.moveTo(stateLabParticles[i].x, stateLabParticles[i].y);
          stateLabCtx.lineTo(stateLabParticles[j].x, stateLabParticles[j].y);
          stateLabCtx.stroke();
        }
      }
    }

    stateLabParticles.forEach(p => {
      p.phase += 0.2 * speedScale;
      const amp = 2.5 * speedScale;
      p.x = p.baseX + Math.sin(p.phase) * amp;
      p.y = p.baseY + Math.cos(p.phase * 1.4) * amp;

      stateLabCtx.beginPath();
      stateLabCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      stateLabCtx.fillStyle = curColor;
      stateLabCtx.shadowColor = curColor;
      stateLabCtx.shadowBlur = 10;
      stateLabCtx.fill();
      stateLabCtx.shadowBlur = 0;
    });
  } else if (LabState.activeState === 'liquid') {
    stateLabParticles.forEach(p => {
      p.x += p.vx * speedScale;
      p.y += p.vy * speedScale;

      if (p.x < 25 + p.r || p.x > w - 25 - p.r) p.vx *= -1;
      if (p.y < h * 0.4 || p.y > h - 25 - p.r) p.vy *= -1;

      stateLabCtx.beginPath();
      stateLabCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      stateLabCtx.fillStyle = curColor;
      stateLabCtx.shadowColor = curColor;
      stateLabCtx.shadowBlur = 8;
      stateLabCtx.fill();
      stateLabCtx.shadowBlur = 0;
    });
  } else if (LabState.activeState === 'gas') {
    stateLabParticles.forEach(p => {
      p.x += p.vx * speedScale;
      p.y += p.vy * speedScale;

      if (p.x < 20 + p.r || p.x > w - 20 - p.r) p.vx *= -1;
      if (p.y < 20 + p.r || p.y > h - 20 - p.r) p.vy *= -1;

      stateLabCtx.beginPath();
      stateLabCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      stateLabCtx.fillStyle = curColor;
      stateLabCtx.shadowColor = curColor;
      stateLabCtx.shadowBlur = 12;
      stateLabCtx.fill();
      stateLabCtx.shadowBlur = 0;
    });
  }

  requestAnimationFrame(animateStateLab);
}

function updateStateLabTemp(val) {
  stateLabTemp = parseInt(val, 10);
  const valElem = document.getElementById('statelab-temp-val');
  const energyElem = document.getElementById('statelab-energy-badge');
  if (valElem) valElem.textContent = `${stateLabTemp} K`;
  
  if (energyElem) {
    if (stateLabTemp < 200) {
      energyElem.className = 'energy-pill energy-low';
      energyElem.innerHTML = '❄️ LOW KINETIC ENERGY';
    } else if (stateLabTemp <= 450) {
      energyElem.className = 'energy-pill energy-med';
      energyElem.innerHTML = '⚡ MEDIUM KINETIC ENERGY';
    } else {
      energyElem.className = 'energy-pill energy-high';
      energyElem.innerHTML = '🔥 HIGH KINETIC ENERGY';
    }
  }
}

// ==========================================
// 7. PHASE TRANSITIONS MATRIX
// ==========================================
const transitionsData = {
  melting: {
    title: 'Melting (Fusion)',
    from: 'Solid',
    to: 'Liquid',
    heat: 'Heat is Absorbed (Endothermic)',
    example: 'Ice cubes melting into liquid water',
    particles: 'Particles absorb thermal energy, vibrate vigorously, and break out of their rigid lattice positions to flow freely.',
    mdcatPoint: 'Temperature remains CONSTANT at the melting point while latent heat of fusion is absorbed.'
  },
  freezing: {
    title: 'Freezing (Solidification)',
    from: 'Liquid',
    to: 'Solid',
    heat: 'Heat is Released (Exothermic)',
    example: 'Liquid water turning into ice in a freezer',
    particles: 'Particles lose kinetic energy, slow down, and attractive forces pull them back into fixed lattice positions.',
    mdcatPoint: 'Freezing point and melting point are equal for a pure substance under constant pressure.'
  },
  vaporization: {
    title: 'Vaporization (Boiling / Evaporation)',
    from: 'Liquid',
    to: 'Gas',
    heat: 'Heat is Absorbed (Endothermic)',
    example: 'Boiling water turning into steam',
    particles: 'Particles gain enough energy to completely overcome intermolecular attraction and fly apart into rapid random motion.',
    mdcatPoint: 'Boiling occurs throughout the liquid at boiling point; evaporation is a surface phenomenon below boiling point.'
  },
  condensation: {
    title: 'Condensation',
    from: 'Gas',
    to: 'Liquid',
    heat: 'Heat is Released (Exothermic)',
    example: 'Water droplets forming on the outside of a cold glass',
    particles: 'Gas particles cool down, lose kinetic energy, and attractive forces draw them close together into liquid form.',
    mdcatPoint: 'Condensation is exothermic: heat energy is released to the surroundings.'
  },
  sublimation: {
    title: 'Sublimation',
    from: 'Solid directly to Gas',
    to: 'Gas (No liquid phase)',
    heat: 'Heat is Absorbed (Endothermic)',
    example: 'Dry Ice ($CO_2$), Iodine Crystals, Naphthalene (Mothballs)',
    particles: 'Particles at the solid surface gain sufficient energy to break directly into the vapor phase without passing through a liquid state.',
    mdcatPoint: 'Classic MDCAT Example: Dry ice (solid carbon dioxide) sublimes directly into gas at room pressure.'
  },
  deposition: {
    title: 'Deposition (Desublimation)',
    from: 'Gas directly to Solid',
    to: 'Solid (No liquid phase)',
    heat: 'Heat is Released (Exothermic)',
    example: 'Frost forming on car windows on sub-zero winter nights',
    particles: 'Gas particles rapidly lose thermal energy and bind directly into a crystal solid matrix.',
    mdcatPoint: 'Deposition bypasses the liquid state completely and is an exothermic phase change.'
  }
};

function selectTransition(key) {
  document.querySelectorAll('.phase-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-transition') === key);
  });
  const data = transitionsData[key];
  const container = document.getElementById('phase-details-container');
  if (container && data) {
    container.innerHTML = `
      <div class="phase-details-card">
        <div>
          <div class="phase-metric-title">Process Name</div>
          <div class="phase-metric-val" style="color: var(--accent-cyan);">${data.title}</div>
        </div>
        <div>
          <div class="phase-metric-title">Starting State → Ending State</div>
          <div class="phase-metric-val">${data.from} → ${data.to}</div>
        </div>
        <div>
          <div class="phase-metric-title">Thermodynamic Status</div>
          <div class="phase-metric-val" style="color: ${data.heat.includes('Absorbed') ? '#fb923c' : '#38bdf8'};">${data.heat}</div>
        </div>
        <div>
          <div class="phase-metric-title">Common Example</div>
          <div class="phase-metric-val">${data.example}</div>
        </div>
      </div>
      <div style="margin-top: 1rem; background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">What Happens to Particles:</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">${data.particles}</p>
        <div class="high-yield-box">
          <div class="high-yield-icon">⭐</div>
          <div class="high-yield-content">
            <div class="high-yield-title">MDCAT TRAP & INSIGHT</div>
            ${data.mdcatPoint}
          </div>
        </div>
      </div>
    `;
  }
}

// ==========================================
// 8. HEATING CURVE SIMULATION
// ==========================================
let heatCurveCanvas, heatCurveCtx;
const heatStages = [
  { name: '1. Solid Heating', temp: 'Increasing (-20°C → 0°C)', state: 'Solid (Ice)', note: 'Kinetic energy of ice particles increases as temperature rises.' },
  { name: '2. Melting (Phase Change)', temp: 'Constant (0°C)', state: 'Solid + Liquid mixture', note: '⭐ MDCAT Trap: Temperature stays CONSTANT at 0°C while latent heat breaks crystal bonds.' },
  { name: '3. Liquid Heating', temp: 'Increasing (0°C → 100°C)', state: 'Liquid (Water)', note: 'Kinetic energy of water molecules increases until boiling point is reached.' },
  { name: '4. Boiling (Phase Change)', temp: 'Constant (100°C)', state: 'Liquid + Gas mixture', note: '⭐ MDCAT High-Yield: Temperature stays CONSTANT at 100°C while latent heat of vaporization is supplied.' },
  { name: '5. Gas Heating', temp: 'Increasing (100°C → 140°C+)', state: 'Gas (Steam)', note: 'Kinetic energy and velocity of steam particles increase continuously.' }
];

function initHeatingCurve() {
  heatCurveCanvas = document.getElementById('heating-curve-canvas');
  if (!heatCurveCanvas) return;
  heatCurveCtx = heatCurveCanvas.getContext('2d');
  resizeHeatCurve();
  window.addEventListener('resize', resizeHeatCurve);
  drawHeatingCurve();
}

function resizeHeatCurve() {
  if (!heatCurveCanvas) return;
  const rect = heatCurveCanvas.parentElement.getBoundingClientRect();
  heatCurveCanvas.width = rect.width;
  heatCurveCanvas.height = 280;
  drawHeatingCurve();
}

function drawHeatingCurve() {
  if (!heatCurveCanvas || !heatCurveCtx) return;
  const w = heatCurveCanvas.width;
  const h = heatCurveCanvas.height;
  const ctx = heatCurveCtx;

  ctx.clearRect(0, 0, w, h);

  const padX = 55;
  const padY = 35;
  const plotW = w - padX - 30;
  const plotH = h - padY - 35;

  // Axes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, padY);
  ctx.lineTo(padX, padY + plotH);
  ctx.lineTo(padX + plotW, padY + plotH);
  ctx.stroke();

  // Labels
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('Heat Energy Added (Time) →', padX + plotW / 2, padY + plotH + 28);
  
  ctx.save();
  ctx.translate(18, padY + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Temperature (°C) →', 0, 0);
  ctx.restore();

  // Heating Curve Points
  const p0 = { x: padX, y: padY + plotH - 20 }; // -20 C
  const p1 = { x: padX + plotW * 0.18, y: padY + plotH * 0.7 }; // 0 C
  const p2 = { x: padX + plotW * 0.38, y: padY + plotH * 0.7 }; // melting flat
  const p3 = { x: padX + plotW * 0.58, y: padY + plotH * 0.25 }; // 100 C
  const p4 = { x: padX + plotW * 0.82, y: padY + plotH * 0.25 }; // boiling flat
  const p5 = { x: padX + plotW, y: padY + 15 }; // steam heating

  const points = [p0, p1, p2, p3, p4, p5];

  // Draw full curve line
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // Highlight flat latent heat lines
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.moveTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.stroke();

  // Stage highlights
  const curStep = LabState.heatCurveStep;
  let activePt = points[curStep];

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(activePt.x, activePt.y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Annotations
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('0°C MELTING', (p1.x + p2.x) / 2, p1.y - 10);
  ctx.fillText('100°C BOILING', (p3.x + p4.x) / 2, p3.y - 10);
}

function setHeatCurveStep(step) {
  LabState.heatCurveStep = Math.max(0, Math.min(5, step));
  drawHeatingCurve();
  const infoElem = document.getElementById('heating-curve-info');
  const stage = heatStages[Math.min(LabState.heatCurveStep, 4)];
  if (infoElem && stage) {
    infoElem.innerHTML = `
      <div style="font-weight: 700; color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 0.25rem;">
        ${stage.name}
      </div>
      <div style="display: flex; gap: 1.5rem; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem; flex-wrap: wrap;">
        <div><strong>Temperature:</strong> ${stage.temp}</div>
        <div><strong>State Present:</strong> ${stage.state}</div>
      </div>
      <div style="font-size: 0.9rem; color: var(--text-primary);">${stage.note}</div>
    `;
  }
}

// ==========================================
// 9. EVAPORATION LAB
// ==========================================
let evapCanvas, evapCtx;
let evapParticles = [];
let evapEscapedCount = 0;

function initEvaporationLab() {
  evapCanvas = document.getElementById('evaporation-canvas');
  if (!evapCanvas) return;
  evapCtx = evapCanvas.getContext('2d');
  resizeEvapCanvas();
  window.addEventListener('resize', resizeEvapCanvas);

  createEvapParticles();
  requestAnimationFrame(animateEvaporation);
}

function resizeEvapCanvas() {
  if (!evapCanvas) return;
  const rect = evapCanvas.parentElement.getBoundingClientRect();
  evapCanvas.width = rect.width;
  evapCanvas.height = 280;
  createEvapParticles();
}

function createEvapParticles() {
  if (!evapCanvas) return;
  const w = evapCanvas.width;
  const h = evapCanvas.height;
  evapParticles = [];
  const surfaceW = (w * (LabState.evapArea / 100));
  const startX = (w - surfaceW) / 2;

  for (let i = 0; i < 60; i++) {
    evapParticles.push({
      x: startX + Math.random() * surfaceW,
      y: h * 0.55 + Math.random() * (h * 0.4),
      vx: (Math.random() - 0.5) * (LabState.evapTemp / 20),
      vy: (Math.random() - 0.5) * (LabState.evapTemp / 20),
      escaped: false,
      r: 6
    });
  }
}

function animateEvaporation() {
  if (!evapCanvas || !evapCtx) return;
  const w = evapCanvas.width;
  const h = evapCanvas.height;
  const ctx = evapCtx;

  ctx.clearRect(0, 0, w, h);

  const surfaceW = (w * (LabState.evapArea / 100));
  const startX = (w - surfaceW) / 2;
  const waterSurfaceY = h * 0.52;

  // Draw Container
  ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
  ctx.fillRect(startX, waterSurfaceY, surfaceW, h - waterSurfaceY - 15);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, waterSurfaceY, surfaceW, h - waterSurfaceY - 15);

  // Surface line
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(startX, waterSurfaceY);
  ctx.lineTo(startX + surfaceW, waterSurfaceY);
  ctx.stroke();

  // Wind breeze effect
  if (LabState.evapWind > 0) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 2;
    for (let wy = 30; wy < waterSurfaceY; wy += 35) {
      ctx.beginPath();
      ctx.moveTo(10, wy);
      ctx.lineTo(w - 10, wy);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // Animate Particles
  const escapeThreshold = waterSurfaceY;
  const windFactor = LabState.evapWind / 35;

  evapParticles.forEach(p => {
    if (!p.escaped) {
      p.x += p.vx;
      p.y += p.vy;

      // Bound in liquid
      if (p.x < startX + p.r || p.x > startX + surfaceW - p.r) p.vx *= -1;
      if (p.y > h - 20 - p.r) p.vy *= -1;

      // Escape condition at surface
      if (p.y <= escapeThreshold && Math.random() < (LabState.evapTemp / 1500) * (LabState.evapArea / 50)) {
        p.escaped = true;
        p.vy = - (1.5 + Math.random() * 2);
        evapEscapedCount++;
        const escCountElem = document.getElementById('evap-escaped-count');
        if (escCountElem) escCountElem.textContent = evapEscapedCount;
      } else if (p.y <= escapeThreshold) {
        p.vy *= -1; // reflect back down if not enough escape energy
      }

      ctx.fillStyle = '#06b6d4';
    } else {
      // Escaped particle moving upwards and blown by wind
      p.y += p.vy;
      p.x += windFactor * 2;

      ctx.fillStyle = '#e0f2fe';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;

      if (p.y < 10 || p.x > w + 10) {
        // Recycle back into bottom liquid
        p.escaped = false;
        p.x = startX + Math.random() * surfaceW;
        p.y = waterSurfaceY + 20 + Math.random() * (h - waterSurfaceY - 40);
        p.vx = (Math.random() - 0.5) * (LabState.evapTemp / 20);
        p.vy = (Math.random() - 0.5) * (LabState.evapTemp / 20);
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animateEvaporation);
}

function updateEvapControls(temp, area, wind) {
  if (temp !== undefined) LabState.evapTemp = parseInt(temp, 10);
  if (area !== undefined) LabState.evapArea = parseInt(area, 10);
  if (wind !== undefined) LabState.evapWind = parseInt(wind, 10);

  const tVal = document.getElementById('evap-temp-val');
  const aVal = document.getElementById('evap-area-val');
  const wVal = document.getElementById('evap-wind-val');
  const rateElem = document.getElementById('evap-rate-meter');

  if (tVal) tVal.textContent = `${LabState.evapTemp}°C`;
  if (aVal) aVal.textContent = `${LabState.evapArea}%`;
  if (wVal) wVal.textContent = `${LabState.evapWind} km/h`;

  if (rateElem) {
    const rateScore = Math.round((LabState.evapTemp * 0.4 + LabState.evapArea * 0.35 + LabState.evapWind * 0.25));
    rateElem.textContent = `${rateScore} Rate Units`;
    rateElem.style.color = rateScore > 50 ? '#f97316' : '#38bdf8';
  }
}

// ==========================================
// 10. BOILING VS EVAPORATION LAB
// ==========================================
let boilCanvas, boilCtx;
let boilParticles = [];
let boilBubbles = [];

function initBoilingLab() {
  boilCanvas = document.getElementById('boiling-canvas');
  if (!boilCanvas) return;
  boilCtx = boilCanvas.getContext('2d');
  resizeBoilCanvas();
  window.addEventListener('resize', resizeBoilCanvas);

  createBoilParticles();
  requestAnimationFrame(animateBoiling);
}

function resizeBoilCanvas() {
  if (!boilCanvas) return;
  const rect = boilCanvas.parentElement.getBoundingClientRect();
  boilCanvas.width = rect.width;
  boilCanvas.height = 260;
  createBoilParticles();
}

function createBoilParticles() {
  if (!boilCanvas) return;
  const w = boilCanvas.width;
  const h = boilCanvas.height;
  boilParticles = [];
  boilBubbles = [];

  for (let i = 0; i < 40; i++) {
    boilParticles.push({
      x: 30 + Math.random() * (w - 60),
      y: 60 + Math.random() * (h - 90),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      r: 6
    });
  }

  for (let b = 0; b < 12; b++) {
    boilBubbles.push({
      x: 40 + Math.random() * (w - 80),
      y: h - 30 - Math.random() * (h - 90),
      r: 4 + Math.random() * 8,
      speed: 1.5 + Math.random() * 2.5
    });
  }
}

function animateBoiling() {
  if (!boilCanvas || !boilCtx) return;
  const w = boilCanvas.width;
  const h = boilCanvas.height;
  const ctx = boilCtx;

  ctx.clearRect(0, 0, w, h);

  // Beaker outline
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 40, w - 40, h - 55);

  // Flame underneath
  ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
  ctx.beginPath();
  ctx.arc(w / 2, h - 5, 25, Math.PI, 0);
  ctx.fill();

  // Boiling Bubbles forming throughout the liquid
  boilBubbles.forEach(b => {
    b.y -= b.speed;
    b.r += 0.05; // Expands as it rises (hydrostatic pressure drops)
    if (b.y < 45) {
      b.y = h - 25;
      b.r = 4 + Math.random() * 6;
      b.x = 40 + Math.random() * (w - 80);
    }

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
    ctx.fill();
    ctx.stroke();
  });

  // Rapid particles
  boilParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 25 || p.x > w - 25) p.vx *= -1;
    if (p.y < 45 || p.y > h - 25) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fb923c';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animateBoiling);
}

function pulseComparisonDiff() {
  const compCard = document.getElementById('boil-evap-diff-card');
  if (compCard) {
    compCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    compCard.style.transform = 'scale(1.02)';
    compCard.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.5)';
    setTimeout(() => {
      compCard.style.transform = 'scale(1)';
      compCard.style.boxShadow = '';
    }, 400);
  }
}

// ==========================================
// 11. GAS LAWS (BOYLE, CHARLES, GAY-LUSSAC)
// ==========================================
// Boyle's Law Simulation
let boyleCanvas, boyleCtx;
let boyleParticles = [];

function initBoyleLab() {
  boyleCanvas = document.getElementById('boyle-canvas');
  if (!boyleCanvas) return;
  boyleCtx = boyleCanvas.getContext('2d');
  resizeBoyleCanvas();
  window.addEventListener('resize', resizeBoyleCanvas);

  createBoyleParticles();
  requestAnimationFrame(animateBoyle);
}

function resizeBoyleCanvas() {
  if (!boyleCanvas) return;
  const rect = boyleCanvas.parentElement.getBoundingClientRect();
  boyleCanvas.width = rect.width;
  boyleCanvas.height = 260;
  createBoyleParticles();
}

function createBoyleParticles() {
  if (!boyleCanvas) return;
  boyleParticles = [];
  for (let i = 0; i < 30; i++) {
    boyleParticles.push({
      x: 30 + Math.random() * 200,
      y: 40 + Math.random() * 150,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      r: 6
    });
  }
}

function animateBoyle() {
  if (!boyleCanvas || !boyleCtx) return;
  const w = boyleCanvas.width;
  const h = boyleCanvas.height;
  const ctx = boyleCtx;

  ctx.clearRect(0, 0, w, h);

  // Piston Cylinder
  const cylLeft = 30;
  const cylRight = w - 30;
  const cylTop = 20;
  const cylBottom = h - 20;

  // Piston Position based on Volume (20% to 90%)
  const pistonX = cylLeft + (cylRight - cylLeft) * (LabState.boyleVol / 100);

  // Cylinder chamber
  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.fillRect(cylLeft, cylTop, pistonX - cylLeft, cylBottom - cylTop);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(cylLeft, cylTop, cylRight - cylLeft, cylBottom - cylTop);

  // Piston Head
  ctx.fillStyle = '#64748b';
  ctx.fillRect(pistonX, cylTop, 18, cylBottom - cylTop);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(pistonX, cylTop, 18, cylBottom - cylTop);

  // Particles bouncing inside the compressed volume
  boyleParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < cylLeft + p.r) { p.x = cylLeft + p.r; p.vx *= -1; }
    if (p.x > pistonX - p.r) { p.x = pistonX - p.r; p.vx *= -1; }
    if (p.y < cylTop + p.r || p.y > cylBottom - p.r) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animateBoyle);
}

function updateBoyleVol(val) {
  LabState.boyleVol = parseInt(val, 10);
  const volElem = document.getElementById('boyle-vol-val');
  const pressElem = document.getElementById('boyle-press-val');
  if (volElem) volElem.textContent = `${LabState.boyleVol} L`;
  if (pressElem) {
    const press = (100 / LabState.boyleVol).toFixed(2);
    pressElem.textContent = `${press} atm`;
  }
}

// Charles's Law Update
function updateCharlesTemp(val) {
  LabState.charlesTemp = parseInt(val, 10);
  const tempVal = document.getElementById('charles-temp-val');
  const volVal = document.getElementById('charles-vol-val');
  if (tempVal) tempVal.textContent = `${LabState.charlesTemp} K (${LabState.charlesTemp - 273}°C)`;
  if (volVal) {
    const calcVol = ((LabState.charlesTemp / 300) * 20).toFixed(1);
    volVal.textContent = `${calcVol} L`;
  }
  const pistonElem = document.getElementById('charles-piston');
  if (pistonElem) {
    const pct = Math.min(90, Math.max(15, (LabState.charlesTemp / 600) * 100));
    pistonElem.style.height = `${pct}%`;
  }
}

// Pressure Law (Gay-Lussac) Update
function updatePressureLawTemp(val) {
  LabState.pressureLawTemp = parseInt(val, 10);
  const tempVal = document.getElementById('pressure-law-temp-val');
  const pressVal = document.getElementById('pressure-law-press-val');
  if (tempVal) tempVal.textContent = `${LabState.pressureLawTemp} K`;
  if (pressVal) {
    const calcPress = (LabState.pressureLawTemp / 300).toFixed(2);
    pressVal.textContent = `${calcPress} atm`;
  }
}

// ==========================================
// 12. DIFFUSION & GRAHAM'S LAW
// ==========================================
let diffCanvas, diffCtx;
let diffParticlesH2 = [];
let diffParticlesO2 = [];
let diffRunning = false;

function initDiffusionLab() {
  diffCanvas = document.getElementById('diffusion-canvas');
  if (!diffCanvas) return;
  diffCtx = diffCanvas.getContext('2d');
  resizeDiffCanvas();
  window.addEventListener('resize', resizeDiffCanvas);

  resetDiffusion();
  requestAnimationFrame(animateDiffusion);
}

function resizeDiffCanvas() {
  if (!diffCanvas) return;
  const rect = diffCanvas.parentElement.getBoundingClientRect();
  diffCanvas.width = rect.width;
  diffCanvas.height = 240;
  resetDiffusion();
}

function resetDiffusion() {
  if (!diffCanvas) return;
  const w = diffCanvas.width;
  const h = diffCanvas.height;
  diffParticlesH2 = [];
  diffParticlesO2 = [];
  diffRunning = false;

  // H2 (Light, Fast - M=2) - starts on left
  for (let i = 0; i < 25; i++) {
    diffParticlesH2.push({
      x: 20 + Math.random() * (w * 0.25),
      y: 20 + Math.random() * (h * 0.4),
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      r: 4
    });
  }

  // O2 (Heavy, Slower - M=32) - starts on left bottom
  for (let i = 0; i < 25; i++) {
    diffParticlesO2.push({
      x: 20 + Math.random() * (w * 0.25),
      y: h * 0.55 + Math.random() * (h * 0.35),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: 7
    });
  }
}

function startDiffusionRace() {
  diffRunning = true;
  diffParticlesH2.forEach(p => { p.vx = Math.abs(p.vx) + 3; });
  diffParticlesO2.forEach(p => { p.vx = Math.abs(p.vx) + 0.75; });
}

function animateDiffusion() {
  if (!diffCanvas || !diffCtx) return;
  const w = diffCanvas.width;
  const h = diffCanvas.height;
  const ctx = diffCtx;

  ctx.clearRect(0, 0, w, h);

  // Race Lanes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.strokeRect(10, 10, w - 20, h * 0.45);
  ctx.strokeRect(10, h * 0.52, w - 20, h * 0.45);

  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('⚡ HYDROGEN (H₂, M=2) — LIGHT & FAST', 25, 28);
  
  ctx.fillStyle = '#fb923c';
  ctx.fillText('🐢 OXYGEN (O₂, M=32) — HEAVY & SLOWER', 25, h * 0.52 + 20);

  // Finish Line
  ctx.strokeStyle = '#10b981';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(w - 30, 10);
  ctx.lineTo(w - 30, h - 10);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw H2
  diffParticlesH2.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 15 || p.x > w - 25) p.vx *= -1;
    if (p.y < 15 || p.y > h * 0.45 + 5) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
  });

  // Draw O2
  diffParticlesO2.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 15 || p.x > w - 25) p.vx *= -1;
    if (p.y < h * 0.52 + 5 || p.y > h - 15) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fb923c';
    ctx.fill();
  });

  requestAnimationFrame(animateDiffusion);
}

// ==========================================
// 13. PLASMA & BOSE-EINSTEIN SIMULATORS
// ==========================================
let plasmaCanvas, plasmaCtx;
let plasmaIons = [];
let plasmaElectrons = [];

function initPlasmaChamber() {
  plasmaCanvas = document.getElementById('plasma-canvas');
  if (!plasmaCanvas) return;
  plasmaCtx = plasmaCanvas.getContext('2d');
  resizePlasmaCanvas();
  window.addEventListener('resize', resizePlasmaCanvas);

  createPlasmaParticles();
  requestAnimationFrame(animatePlasma);
}

function resizePlasmaCanvas() {
  if (!plasmaCanvas) return;
  const rect = plasmaCanvas.parentElement.getBoundingClientRect();
  plasmaCanvas.width = rect.width;
  plasmaCanvas.height = 240;
  createPlasmaParticles();
}

function createPlasmaParticles() {
  if (!plasmaCanvas) return;
  const w = plasmaCanvas.width;
  const h = plasmaCanvas.height;
  plasmaIons = [];
  plasmaElectrons = [];

  for (let i = 0; i < 20; i++) {
    plasmaIons.push({
      x: 20 + Math.random() * (w - 40),
      y: 20 + Math.random() * (h - 40),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      r: 8
    });
  }

  for (let e = 0; e < 35; e++) {
    plasmaElectrons.push({
      x: 20 + Math.random() * (w - 40),
      y: 20 + Math.random() * (h - 40),
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.5) * 7,
      r: 3
    });
  }
}

function animatePlasma() {
  if (!plasmaCanvas || !plasmaCtx) return;
  const w = plasmaCanvas.width;
  const h = plasmaCanvas.height;
  const ctx = plasmaCtx;

  ctx.clearRect(0, 0, w, h);

  // Glowing ionized aura
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  // Positive Ions (+)
  plasmaIons.forEach(ion => {
    ion.x += ion.vx;
    ion.y += ion.vy;
    if (ion.x < 18 || ion.x > w - 18) ion.vx *= -1;
    if (ion.y < 18 || ion.y > h - 18) ion.vy *= -1;

    ctx.beginPath();
    ctx.arc(ion.x, ion.y, ion.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('+', ion.x, ion.y + 3);
  });

  // Free Electrons (e-)
  plasmaElectrons.forEach(e => {
    e.x += e.vx;
    e.y += e.vy;
    if (e.x < 15 || e.x > w - 15) e.vx *= -1;
    if (e.y < 15 || e.y > h - 15) e.vy *= -1;

    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animatePlasma);
}

// ==========================================
// 14. "WHAT HAPPENS TO PARTICLES?" TOOL
// ==========================================
const particleActionData = {
  heating: {
    title: 'Heating (Adding Thermal Energy)',
    speed: 'Speeds Up',
    space: 'Increases (Expands)',
    forces: 'Weakened / Overcome',
    summary: 'When matter is heated, particles absorb kinetic energy and move faster. In solids and liquids, this expansion weakens intermolecular forces.'
  },
  cooling: {
    title: 'Cooling (Removing Thermal Energy)',
    speed: 'Slows Down',
    space: 'Decreases (Contracts)',
    forces: 'Strengthened relatively',
    summary: 'Cooling reduces kinetic energy. Particles move slower, get closer together, and attractive forces draw them into more ordered arrangements.'
  },
  compression: {
    title: 'Compression (Applying Pressure to Gas)',
    speed: 'Unchanged (if isothermal)',
    space: 'Drastically Decreases',
    forces: 'Increase as particles are pushed together',
    summary: 'Because gas particles are separated by vast empty spaces, compressing forces them much closer together, increasing wall collisions and pressure.'
  },
  expansion: {
    title: 'Expansion (Increasing Container Volume)',
    speed: 'Unchanged',
    space: 'Increases',
    forces: 'Negligible',
    summary: 'Gas particles spread out uniformly to fill the newly available volume, resulting in fewer collisions per unit area and lower pressure.'
  },
  melting: {
    title: 'Melting (Solid → Liquid)',
    speed: 'Vibrations overcome lattice bonds',
    space: 'Slight increase (most substances)',
    forces: 'Rigid bonds become flexible',
    summary: 'Particles vibrate so energetically that they break free from fixed lattice positions and begin to slide around each other.'
  },
  boiling: {
    title: 'Boiling (Liquid → Gas throughout bulk)',
    speed: 'High kinetic energy',
    space: 'Drastically expands (~1000x)',
    forces: 'Completely broken',
    summary: 'Particles throughout the liquid gain sufficient energy to form vapor bubbles and escape entirely into the rapid gas phase.'
  },
  condensation: {
    title: 'Condensation (Gas → Liquid)',
    speed: 'Slows down significantly',
    space: 'Decreases drastically',
    forces: 'Re-establish and pull particles close',
    summary: 'Cooling gas particles lose kinetic energy, allowing intermolecular attractions to pull them together into the liquid phase.'
  },
  freezing: {
    title: 'Freezing (Liquid → Solid)',
    speed: 'Reduced to simple fixed vibration',
    space: 'Fixed organized distance',
    forces: 'Form rigid crystal lattice',
    summary: 'Particles slow down enough that attractive forces lock them into rigid, structured positions where they only vibrate in place.'
  }
};

function showParticleAction(actionKey) {
  document.querySelectorAll('.particle-tool-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-action') === actionKey);
  });
  const data = particleActionData[actionKey];
  const container = document.getElementById('particle-action-result');
  if (container && data) {
    container.innerHTML = `
      <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.75rem;">
          Action: ${data.title}
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
          <div><span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Particle Speed:</span> <div style="font-weight: 600; color: var(--text-primary);">${data.speed}</div></div>
          <div><span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Particle Spacing:</span> <div style="font-weight: 600; color: var(--text-primary);">${data.space}</div></div>
          <div><span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Attractive Forces:</span> <div style="font-weight: 600; color: var(--text-primary);">${data.forces}</div></div>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${data.summary}</p>
      </div>
    `;
  }
}

// ==========================================
// 15. MDCAT GAS LAW CALCULATOR
// ==========================================
let activeCalcTab = 'boyle';

function selectCalcTab(tab) {
  activeCalcTab = tab;
  document.querySelectorAll('.calc-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-calc') === tab);
  });

  const formElem = document.getElementById('calc-form-container');
  if (!formElem) return;

  if (tab === 'boyle') {
    formElem.innerHTML = `
      <div class="calc-form-grid">
        <div class="form-group"><label>Initial Pressure P₁ (atm)</label><input type="number" id="c_p1" class="form-control" value="2" step="any"></div>
        <div class="form-group"><label>Initial Volume V₁ (L)</label><input type="number" id="c_v1" class="form-control" value="10" step="any"></div>
        <div class="form-group"><label>Final Pressure P₂ (atm)</label><input type="number" id="c_p2" class="form-control" value="4" step="any"></div>
      </div>
      <button class="btn-primary" onclick="calculateGasLaw()">Solve for Final Volume V₂</button>
    `;
  } else if (tab === 'charles') {
    formElem.innerHTML = `
      <div class="calc-form-grid">
        <div class="form-group"><label>Initial Volume V₁ (L)</label><input type="number" id="c_v1" class="form-control" value="5" step="any"></div>
        <div class="form-group"><label>Initial Temp T₁ (°C)</label><input type="number" id="c_t1_c" class="form-control" value="27" step="any"></div>
        <div class="form-group"><label>Final Temp T₂ (°C)</label><input type="number" id="c_t2_c" class="form-control" value="127" step="any"></div>
      </div>
      <button class="btn-primary" onclick="calculateGasLaw()">Solve for Final Volume V₂</button>
    `;
  } else if (tab === 'pressure') {
    formElem.innerHTML = `
      <div class="calc-form-grid">
        <div class="form-group"><label>Initial Pressure P₁ (atm)</label><input type="number" id="c_p1" class="form-control" value="1.5" step="any"></div>
        <div class="form-group"><label>Initial Temp T₁ (K)</label><input type="number" id="c_t1" class="form-control" value="300" step="any"></div>
        <div class="form-group"><label>Final Temp T₂ (K)</label><input type="number" id="c_t2" class="form-control" value="450" step="any"></div>
      </div>
      <button class="btn-primary" onclick="calculateGasLaw()">Solve for Final Pressure P₂</button>
    `;
  } else if (tab === 'graham') {
    formElem.innerHTML = `
      <div class="calc-form-grid">
        <div class="form-group"><label>Gas 1 Molar Mass M₁ (g/mol, e.g. H₂ = 2)</label><input type="number" id="c_m1" class="form-control" value="2" step="any"></div>
        <div class="form-group"><label>Gas 2 Molar Mass M₂ (g/mol, e.g. O₂ = 32)</label><input type="number" id="c_m2" class="form-control" value="32" step="any"></div>
      </div>
      <button class="btn-primary" onclick="calculateGasLaw()">Calculate Relative Diffusion Rate (r₁ / r₂)</button>
    `;
  }
  calculateGasLaw();
}

function calculateGasLaw() {
  const outBox = document.getElementById('calc-output-box');
  if (!outBox) return;

  if (activeCalcTab === 'boyle') {
    const p1 = parseFloat(document.getElementById('c_p1').value);
    const v1 = parseFloat(document.getElementById('c_v1').value);
    const p2 = parseFloat(document.getElementById('c_p2').value);
    if (!p1 || !v1 || !p2) return;
    const v2 = (p1 * v1) / p2;
    outBox.innerHTML = `
      <div class="calc-steps">
        <strong>Formula:</strong> P₁ × V₁ = P₂ × V₂ &nbsp;→&nbsp; V₂ = (P₁ × V₁) / P₂<br>
        <strong>Substitution:</strong> V₂ = (${p1} × ${v1}) / ${p2}
      </div>
      <div class="calc-result-badge">V₂ = ${v2.toFixed(2)} Liters</div>
      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">Since pressure doubled from ${p1} atm to ${p2} atm, the volume halved inversely.</div>
    `;
  } else if (activeCalcTab === 'charles') {
    const v1 = parseFloat(document.getElementById('c_v1').value);
    const t1c = parseFloat(document.getElementById('c_t1_c').value);
    const t2c = parseFloat(document.getElementById('c_t2_c').value);
    if (isNaN(v1) || isNaN(t1c) || isNaN(t2c)) return;
    const t1k = t1c + 273;
    const t2k = t2c + 273;
    const v2 = (v1 * t2k) / t1k;
    outBox.innerHTML = `
      <div class="calc-steps">
        <strong>Step 1 (Convert to Kelvin):</strong> T₁ = ${t1c} + 273 = ${t1k} K | T₂ = ${t2c} + 273 = ${t2k} K<br>
        <strong>Formula:</strong> V₁ / T₁ = V₂ / T₂ &nbsp;→&nbsp; V₂ = (V₁ × T₂) / T₁<br>
        <strong>Substitution:</strong> V₂ = (${v1} × ${t2k}) / ${t1k}
      </div>
      <div class="calc-result-badge">V₂ = ${v2.toFixed(2)} Liters</div>
    `;
  } else if (activeCalcTab === 'pressure') {
    const p1 = parseFloat(document.getElementById('c_p1').value);
    const t1 = parseFloat(document.getElementById('c_t1').value);
    const t2 = parseFloat(document.getElementById('c_t2').value);
    if (!p1 || !t1 || !t2) return;
    const p2 = (p1 * t2) / t1;
    outBox.innerHTML = `
      <div class="calc-steps">
        <strong>Formula:</strong> P₁ / T₁ = P₂ / T₂ &nbsp;→&nbsp; P₂ = (P₁ × T₂) / T₁<br>
        <strong>Substitution:</strong> P₂ = (${p1} × ${t2}) / ${t1}
      </div>
      <div class="calc-result-badge">P₂ = ${p2.toFixed(2)} atm</div>
    `;
  } else if (activeCalcTab === 'graham') {
    const m1 = parseFloat(document.getElementById('c_m1').value);
    const m2 = parseFloat(document.getElementById('c_m2').value);
    if (!m1 || !m2) return;
    const ratio = Math.sqrt(m2 / m1);
    outBox.innerHTML = `
      <div class="calc-steps">
        <strong>Formula:</strong> Rate₁ / Rate₂ = √(M₂ / M₁)<br>
        <strong>Substitution:</strong> r₁ / r₂ = √(${m2} / ${m1}) = √(${(m2/m1).toFixed(2)})
      </div>
      <div class="calc-result-badge">Gas 1 diffuses ${ratio.toFixed(2)}× faster than Gas 2</div>
    `;
  }
}

// ==========================================
// 16. MDCAT PRACTICE QUIZ (25 ORIGINAL MCQs)
// ==========================================
const quizQuestions = [
  {
    q: "1. Which state of matter has a definite volume but no definite shape?",
    options: ["Solid", "Liquid", "Gas", "Plasma"],
    correct: 1,
    exp: "Liquids have fixed volume because attractive forces keep particles close together, but they take the shape of their container because particles can flow."
  },
  {
    q: "2. The average kinetic energy of gas particles is directly proportional to:",
    options: ["Absolute temperature (Kelvin)", "Pressure in atmospheres", "Volume of the container", "Density of the gas"],
    correct: 0,
    exp: "According to the kinetic molecular theory, average kinetic energy is directly proportional to absolute temperature in Kelvin ($KE \\propto T$)."
  },
  {
    q: "3. In which state of matter are intermolecular attractive forces the strongest?",
    options: ["Gas", "Liquid", "Solid", "Plasma"],
    correct: 2,
    exp: "Solids possess the strongest intermolecular attractive forces, holding particles tightly in fixed lattice positions."
  },
  {
    q: "4. Which process represents the direct transition from solid to gas without entering the liquid state?",
    options: ["Deposition", "Vaporization", "Sublimation", "Condensation"],
    correct: 2,
    exp: "Sublimation is the direct change from solid to gas without melting (e.g. Dry ice, naphthalene)."
  },
  {
    q: "5. Evaporation differs fundamentally from boiling because evaporation:",
    options: ["Occurs only at the boiling point", "Is a bulk phenomenon throughout the liquid", "Occurs at all temperatures from the liquid surface", "Is an exothermic process"],
    correct: 2,
    exp: "Evaporation is a spontaneous surface phenomenon occurring at temperatures below the boiling point, causing cooling."
  },
  {
    q: "6. During the melting of pure ice under constant pressure, what happens to the temperature?",
    options: ["Increases rapidly", "Decreases slightly", "Remains constant", "Fluctuates randomly"],
    correct: 2,
    exp: "During a phase change, the temperature remains constant because added thermal energy is consumed as latent heat to overcome intermolecular forces."
  },
  {
    q: "7. According to Boyle's Law, when the pressure of a fixed mass of gas is doubled at constant temperature, its volume:",
    options: ["Doubles", "Halves", "Remains constant", "Quadruples"],
    correct: 1,
    exp: "Boyle's Law states that pressure and volume are inversely related ($P \\propto 1/V$). Doubling pressure reduces volume by half."
  },
  {
    q: "8. What temperature scale must ALWAYS be used when performing gas law calculations?",
    options: ["Celsius scale", "Fahrenheit scale", "Kelvin scale", "Rankine scale"],
    correct: 2,
    exp: "Gas law calculations (Charles's Law, Ideal Gas equation) must strictly use absolute temperature on the Kelvin scale ($K = ^\\circ C + 273$)."
  },
  {
    q: "9. Charles's Law states that for a fixed mass of gas at constant pressure, volume is directly proportional to:",
    options: ["Temperature in Celsius", "Absolute temperature in Kelvin", "External atmospheric pressure", "Molar mass of the gas"],
    correct: 1,
    exp: "Charles's Law states $V \\propto T$ (where $T$ is absolute temperature in Kelvin)."
  },
  {
    q: "10. Gas pressure inside a sealed container is physically produced by:",
    options: ["Gravitational attraction between molecules", "Collisions of gas particles against the container walls", "Chemical bonds breaking and forming", "Nuclear forces inside particles"],
    correct: 1,
    exp: "Gas pressure is the cumulative force exerted per unit area when rapidly moving particles collide with container walls."
  },
  {
    q: "11. According to Graham's Law of Diffusion, which of the following gases will diffuse fastest under identical conditions?",
    options: ["Oxygen ($O_2$, M=32)", "Nitrogen ($N_2$, M=28)", "Carbon dioxide ($CO_2$, M=44)", "Hydrogen ($H_2$, M=2)"],
    correct: 3,
    exp: "Graham's Law states rate of diffusion is inversely proportional to the square root of molar mass ($r \\propto 1/\\sqrt{M}$). Hydrogen is the lightest gas (M=2) and diffuses fastest."
  },
  {
    q: "12. How many times faster does Hydrogen gas ($H_2$, M=2) diffuse compared to Oxygen gas ($O_2$, M=32)?",
    options: ["2 times", "4 times", "8 times", "16 times"],
    correct: 1,
    exp: "$r_1/r_2 = \\sqrt{M_2/M_1} = \\sqrt{32/2} = \\sqrt{16} = 4$. Hydrogen diffuses 4 times faster than oxygen."
  },
  {
    q: "13. What is Plasma?",
    options: ["A super-cooled solid", "A highly ionized gas containing free electrons and positive ions", "A high-density liquid crystal", "A theoretical state near absolute zero"],
    correct: 1,
    exp: "Plasma is the fourth state of matter, consisting of a superheated mixture of positively charged ions and free electrons (found in stars, lightning, neon lights)."
  },
  {
    q: "14. Which phase change is exothermic (releases heat energy to the surroundings)?",
    options: ["Melting", "Sublimation", "Vaporization", "Freezing"],
    correct: 3,
    exp: "Freezing (and condensation / deposition) releases latent heat to surroundings as particles slow down and form bonds."
  },
  {
    q: "15. The formation of frost directly from water vapor on freezing winter nights is an example of:",
    options: ["Condensation", "Sublimation", "Deposition", "Evaporation"],
    correct: 2,
    exp: "Deposition is the phase transition from gas directly into solid without passing through a liquid intermediate."
  },
  {
    q: "16. Which factor DECREASES the rate of evaporation of a liquid?",
    options: ["Increasing liquid surface area", "Increasing ambient temperature", "Increasing atmospheric humidity", "Increasing wind velocity"],
    correct: 2,
    exp: "Higher humidity means the surrounding air is already saturated with water vapor, which decreases the net rate of evaporation."
  },
  {
    q: "17. Boiling of a liquid occurs specifically when:",
    options: ["Temperature reaches 100°C regardless of pressure", "Vapour pressure of the liquid equals surrounding atmospheric pressure", "Particles completely stop vibrating", "The liquid turns into plasma"],
    correct: 1,
    exp: "Boiling occurs at the exact temperature where the liquid's internal saturated vapour pressure equals external atmospheric pressure."
  },
  {
    q: "18. What is the approximate value of Absolute Zero on the Celsius scale?",
    options: ["0°C", "-100°C", "-273.15°C", "-373.15°C"],
    correct: 2,
    exp: "Absolute Zero is 0 Kelvin, which equals -273.15°C."
  },
  {
    q: "19. Which state of matter is the most easily compressible?",
    options: ["Solid", "Liquid", "Gas", "Bose-Einstein Condensate"],
    correct: 2,
    exp: "Gases have vast intermolecular empty spaces between particles, making them highly compressible under applied pressure."
  },
  {
    q: "20. Bose-Einstein Condensate (BEC) is formed when matter is:",
    options: ["Heated to millions of degrees", "Cooled to temperatures extremely close to Absolute Zero", "Compressed inside a black hole", "Subjected to massive electric currents"],
    correct: 1,
    exp: "BEC is formed when a low-density gas of bosons is cooled to ultra-low temperatures near absolute zero, causing particles to collapse into a single quantum wave state."
  },
  {
    q: "21. If a rigid steel canister of gas at 300 K and 1 atm is heated to 600 K, the new pressure will be:",
    options: ["0.5 atm", "1.0 atm", "2.0 atm", "4.0 atm"],
    correct: 2,
    exp: "By the Pressure Law ($P_1/T_1 = P_2/T_2$): Doubling absolute temperature at constant volume doubles the pressure from 1 atm to 2 atm."
  },
  {
    q: "22. The spreading of perfume scent across an entire room is primarily due to:",
    options: ["Osmosis", "Diffusion of gas molecules", "Sublimation of air", "Capillary action"],
    correct: 1,
    exp: "Diffusion is the spontaneous movement of gas particles from an area of higher concentration to an area of lower concentration."
  },
  {
    q: "23. Stronger intermolecular forces in a liquid will result in:",
    options: ["Lower boiling point and faster evaporation", "Higher boiling point and lower vapour pressure", "Zero surface tension", "Infinite compressibility"],
    correct: 1,
    exp: "Stronger intermolecular forces hold molecules together more tightly, requiring more heat energy to boil (higher BP) and resisting evaporation (lower vapour pressure)."
  },
  {
    q: "24. In the kinetic theory of gases, collisions between gas particles are assumed to be:",
    options: ["Inelastic (kinetic energy lost)", "Perfect elastic (no kinetic energy lost)", "Adhesive and sticky", "Reactive at all times"],
    correct: 1,
    exp: "An ideal gas assumes perfectly elastic collisions, meaning total kinetic energy is conserved before and after impact."
  },
  {
    q: "25. Which statement regarding solid particles is TRUE?",
    options: ["They have no movement whatsoever", "They move freely around each other", "They only vibrate about fixed equilibrium positions", "They fly in straight random lines"],
    correct: 2,
    exp: "MDCAT Trap: Solid particles are NOT stationary; they constantly vibrate about fixed lattice points."
  }
];

let currentQuizIdx = 0;
let userQuizAnswers = new Array(quizQuestions.length).fill(null);

function initQuiz() {
  const bestElem = document.getElementById('quiz-best-score');
  if (bestElem) bestElem.textContent = `${LabState.bestQuizScore} / ${quizQuestions.length}`;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qObj = quizQuestions[currentQuizIdx];
  const qContainer = document.getElementById('quiz-container');
  if (!qContainer) return;

  const answered = userQuizAnswers[currentQuizIdx] !== null;

  let optionsHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  qObj.options.forEach((opt, idx) => {
    let optClass = 'quiz-opt-btn';
    if (answered) {
      if (idx === qObj.correct) optClass += ' correct';
      else if (idx === userQuizAnswers[currentQuizIdx]) optClass += ' incorrect';
    }

    optionsHTML += `
      <button class="${optClass}" onclick="handleQuizAnswer(${idx})" ${answered ? 'disabled' : ''}>
        <span class="quiz-opt-letter">${letters[idx]}</span>
        <span>${opt}</span>
      </button>
    `;
  });

  qContainer.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-progress-indicator">Question ${currentQuizIdx + 1} of ${quizQuestions.length}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">Topic: States of Matter MDCAT Mastery</div>
    </div>
    <div class="quiz-question-text">${qObj.q}</div>
    <div class="quiz-options">${optionsHTML}</div>
    <div id="quiz-explanation" class="quiz-explanation" style="${answered ? 'display: block;' : 'display: none;'}">
      <strong>Explanation:</strong> ${qObj.exp}
    </div>
    <div class="quiz-nav-btns">
      <button class="btn-secondary" onclick="prevQuizQuestion()" ${currentQuizIdx === 0 ? 'disabled' : ''}>← Previous</button>
      ${currentQuizIdx === quizQuestions.length - 1 && answered ? 
        `<button class="btn-primary" onclick="finishQuiz()">View Final Score 🏆</button>` : 
        `<button class="btn-primary" onclick="nextQuizQuestion()" ${!answered ? 'disabled' : ''}>Next →</button>`
      }
    </div>
  `;
}

function handleQuizAnswer(selectedIdx) {
  if (userQuizAnswers[currentQuizIdx] !== null) return;
  userQuizAnswers[currentQuizIdx] = selectedIdx;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (currentQuizIdx < quizQuestions.length - 1) {
    currentQuizIdx++;
    renderQuizQuestion();
  }
}

function prevQuizQuestion() {
  if (currentQuizIdx > 0) {
    currentQuizIdx--;
    renderQuizQuestion();
  }
}

function finishQuiz() {
  let score = 0;
  userQuizAnswers.forEach((ans, i) => {
    if (ans === quizQuestions[i].correct) score++;
  });

  if (score > LabState.bestQuizScore) {
    LabState.bestQuizScore = score;
    saveState();
  }

  const pct = Math.round((score / quizQuestions.length) * 100);
  let badgeText = 'MDCAT Prodigy 🌟 (Outstanding!)';
  if (pct < 60) badgeText = 'Needs Review 📚 (Practice more concepts)';
  else if (pct < 85) badgeText = 'MDCAT Proficient 👍 (Solid foundation)';

  const qContainer = document.getElementById('quiz-container');
  if (qContainer) {
    qContainer.innerHTML = `
      <div class="score-card">
        <div class="score-big">${score} / ${quizQuestions.length}</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Score: ${pct}%</div>
        <div style="font-size: 1rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 1.5rem;">${badgeText}</div>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" onclick="retryQuiz()">🔄 Retry Quiz</button>
          <a href="#quick-revision" class="btn-secondary">📖 Review Key Traps</a>
        </div>
      </div>
    `;
  }
}

function retryQuiz() {
  currentQuizIdx = 0;
  userQuizAnswers = new Array(quizQuestions.length).fill(null);
  renderQuizQuestion();
}

// ==========================================
// 17. MDCAT TRAP REVEAL HANDLER
// ==========================================
function toggleTrapCard(card) {
  card.classList.toggle('revealed');
}

// ==========================================
// 18. DOM CONTENT LOADED ENTRY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateProgressUI();
  initSearch();
  initHeroCanvas();
  initStateLab();
  initHeatingCurve();
  initEvaporationLab();
  initBoilingLab();
  initBoyleLab();
  initDiffusionLab();
  initPlasmaChamber();
  selectCalcTab('boyle');
  selectTransition('melting');
  showParticleAction('heating');
  initQuiz();

  // Attach theme button
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
