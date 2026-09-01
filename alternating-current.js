/**
 * ==========================================================================
 * THE AC ELECTRICITY LAB — ALTERNATING CURRENT (MDCAT/ECAT PHYSICS)
 * Core Physics Simulation & Interactive Learning Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive systems
  initGlobalState();
  initHeroOscilloscope();
  initMainOscilloscope();
  initCycleTimeline();
  initFreqPeriodLab();
  initRmsLab();
  initAcVsDcLab();
  initComponentsLab();
  initRlcLab();
  initResonanceLab();
  initGeneratorLab();
  initTransformerLab();
  initFormulaWall();
  initConceptCards();
  initFlashcards();
  initQuiz();
  initCalculators();
  initSearch();
  initBookmarks();
  initProgressAndCompletion();
  initBackToTop();
});

/* ==========================================================================
   GLOBAL APP STATE & LOCAL STORAGE
   ========================================================================== */
const AppState = {
  visitedSections: new Set(),
  simulationsInteracted: new Set(),
  masteredFlashcards: new Set(),
  quizScore: 0,
  quizAttempted: 0,
  calculationsDone: new Set(),
  bookmarkedConcepts: new Set(),
  chapterCompleted: false,
};

function initGlobalState() {
  try {
    const saved = localStorage.getItem('ac_lab_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.masteredFlashcards) AppState.masteredFlashcards = new Set(parsed.masteredFlashcards);
      if (parsed.bookmarkedConcepts) AppState.bookmarkedConcepts = new Set(parsed.bookmarkedConcepts);
      if (parsed.chapterCompleted) AppState.chapterCompleted = true;
      if (parsed.quizScore) AppState.quizScore = parsed.quizScore;
    }
  } catch (e) {
    console.warn('LocalStorage not available', e);
  }
}

function saveAppState() {
  try {
    const data = {
      masteredFlashcards: Array.from(AppState.masteredFlashcards),
      bookmarkedConcepts: Array.from(AppState.bookmarkedConcepts),
      chapterCompleted: AppState.chapterCompleted,
      quizScore: AppState.quizScore
    };
    localStorage.setItem('ac_lab_state', JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

function updateProgressUI() {
  const totalItems = 15;
  const currentCount = AppState.visitedSections.size;
  const percent = Math.min(100, Math.round((currentCount / totalItems) * 100));

  const bar = document.getElementById('chapter-progress-bar');
  const text = document.getElementById('progress-percent-text');
  const sum = document.getElementById('progress-stats-summary');

  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${percent}%`;
  if (sum) sum.textContent = `${currentCount}/15 Sections Explored`;
}

function trackSectionVisit(sectionId) {
  AppState.visitedSections.add(sectionId);
  updateProgressUI();
}

/* ==========================================================================
   HERO OSCILLOSCOPE SIMULATION
   ========================================================================== */
function initHeroOscilloscope() {
  const canvas = document.getElementById('hero-scope-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const fSlider = document.getElementById('hero-f-slider');
  const phiSlider = document.getElementById('hero-phi-slider');
  const fDisp = document.getElementById('hero-f-disp');
  const phiDisp = document.getElementById('hero-phi-disp');

  const vtDisp = document.getElementById('hero-scope-vt');
  const itDisp = document.getElementById('hero-scope-it');
  const vpDisp = document.getElementById('hero-scope-vp');
  const phiReadout = document.getElementById('hero-scope-phi');

  let time = 0;
  let freq = 50;
  let phaseDeg = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 220;
  }
  window.addEventListener('resize', resize);
  resize();

  if (fSlider) {
    fSlider.addEventListener('input', (e) => {
      freq = parseFloat(e.target.value);
      if (fDisp) fDisp.textContent = `${freq} Hz`;
      trackSectionVisit('hero');
    });
  }

  if (phiSlider) {
    phiSlider.addEventListener('input', (e) => {
      phaseDeg = parseFloat(e.target.value);
      if (phiDisp) phiDisp.textContent = `${phaseDeg}°`;
      if (phiReadout) phiReadout.textContent = `${phaseDeg.toFixed(1)}°`;
      trackSectionVisit('hero');
    });
  }

  function render() {
    time += 0.016;
    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Draw CRT Phosphor Grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center Axes
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    const omega = 2 * Math.PI * freq;
    const radPhase = (phaseDeg * Math.PI) / 180;
    const vAmp = 70;
    const iAmp = 45;

    // Draw Voltage Wave (Cyan)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const tSec = time * 0.08 + (x / w) * (2 / freq);
      const y = centerY - Math.sin(omega * tSec) * vAmp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Current Wave (Violet)
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(192, 132, 252, 0.8)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const tSec = time * 0.08 + (x / w) * (2 / freq);
      const y = centerY - Math.sin(omega * tSec - radPhase) * iAmp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowBlur = 0; // reset shadow

    // Calculate instantaneous values at center
    const curInstantV = 311.1 * Math.sin(omega * (time * 0.08));
    const curInstantI = 10.0 * Math.sin(omega * (time * 0.08) - radPhase);

    if (vtDisp) vtDisp.textContent = `${curInstantV >= 0 ? '+' : ''}${curInstantV.toFixed(1)} V`;
    if (itDisp) itDisp.textContent = `${curInstantI >= 0 ? '+' : ''}${curInstantI.toFixed(2)} A`;

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   MODULE 01: MAIN OSCILLOSCOPE SIGNAL TRACE SIMULATOR
   ========================================================================== */
function initMainOscilloscope() {
  const canvas = document.getElementById('main-sim-scope-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const ampSlider = document.getElementById('scope-amp-slider');
  const freqSlider = document.getElementById('scope-freq-slider');
  const phaseSlider = document.getElementById('scope-phase-slider');
  const ampVal = document.getElementById('scope-amp-val');
  const freqVal = document.getElementById('scope-freq-val');
  const phaseVal = document.getElementById('scope-phase-val');

  const wDisp = document.getElementById('main-sim-w');
  const tDisp = document.getElementById('main-sim-t');
  const vrmsDisp = document.getElementById('main-sim-vrms');
  const vtDisp = document.getElementById('main-sim-vt');

  const toggleBtn = document.getElementById('scope-toggle-run');
  const resetBtn = document.getElementById('scope-reset-btn');

  let peakV = 311;
  let freq = 50;
  let phaseDeg = 0;
  let isRunning = true;
  let animTime = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 260;
  }
  window.addEventListener('resize', resize);
  resize();

  function updateMath() {
    const w = 2 * Math.PI * freq;
    const T = 1 / freq;
    const vrms = peakV / Math.SQRT2;

    if (wDisp) wDisp.textContent = `${w.toFixed(2)} rad/s`;
    if (tDisp) tDisp.textContent = `${(T * 1000).toFixed(2)} ms`;
    if (vrmsDisp) vrmsDisp.textContent = `${vrms.toFixed(1)} V`;
  }

  if (ampSlider) {
    ampSlider.addEventListener('input', (e) => {
      peakV = parseFloat(e.target.value);
      if (ampVal) ampVal.textContent = `${peakV} V`;
      updateMath();
      trackSectionVisit('oscilloscope-lab');
    });
  }

  if (freqSlider) {
    freqSlider.addEventListener('input', (e) => {
      freq = parseFloat(e.target.value);
      if (freqVal) freqVal.textContent = `${freq} Hz`;
      updateMath();
      trackSectionVisit('oscilloscope-lab');
    });
  }

  if (phaseSlider) {
    phaseSlider.addEventListener('input', (e) => {
      phaseDeg = parseFloat(e.target.value);
      if (phaseVal) phaseVal.textContent = `${phaseDeg}°`;
      trackSectionVisit('oscilloscope-lab');
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      toggleBtn.innerHTML = isRunning
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg><span>Pause</span>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Play</span>`;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      peakV = 311;
      freq = 50;
      phaseDeg = 0;
      if (ampSlider) ampSlider.value = 311;
      if (freqSlider) freqSlider.value = 50;
      if (phaseSlider) phaseSlider.value = 0;
      if (ampVal) ampVal.textContent = '311 V';
      if (freqVal) freqVal.textContent = '50 Hz';
      if (phaseVal) phaseVal.textContent = '0°';
      updateMath();
    });
  }

  updateMath();

  function render() {
    if (isRunning) animTime += 0.016;

    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // CRT Grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Zero Volt Baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // RMS Horizontal Threshold Markers
    const scaleY = (h * 0.4) / 400;
    const rmsY_pos = centerY - (peakV / Math.SQRT2) * scaleY;
    const rmsY_neg = centerY + (peakV / Math.SQRT2) * scaleY;

    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(0, rmsY_pos);
    ctx.lineTo(w, rmsY_pos);
    ctx.moveTo(0, rmsY_neg);
    ctx.lineTo(w, rmsY_neg);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#22c55e';
    ctx.font = '10px monospace';
    ctx.fillText('+V_rms', 8, rmsY_pos - 4);
    ctx.fillText('-V_rms', 8, rmsY_neg + 12);

    const omega = 2 * Math.PI * freq;
    const radPhase = (phaseDeg * Math.PI) / 180;

    // Voltage Wave
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.7)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = animTime * 0.08 + (x / w) * (2.5 / freq);
      const y = centerY - peakV * scaleY * Math.sin(omega * t);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current Wave (Scalable representation)
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(192, 132, 252, 0.6)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const t = animTime * 0.08 + (x / w) * (2.5 / freq);
      const y = centerY - (peakV * scaleY * 0.6) * Math.sin(omega * t - radPhase);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Update Instantaneous Voltage
    const instantV = peakV * Math.sin(omega * (animTime * 0.08));
    if (vtDisp) vtDisp.textContent = `${instantV >= 0 ? '+' : ''}${instantV.toFixed(1)} V`;

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   MODULE 02: 1 COMPLETE AC CYCLE & INTERACTIVE TIMELINE
   ========================================================================== */
function initCycleTimeline() {
  const canvas = document.getElementById('cycle-timeline-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('cycle-scrubber-tooltip');

  let mouseX = -1;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth - 32;
    canvas.height = 220;
  }
  window.addEventListener('resize', resize);
  resize();

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    trackSectionVisit('waveform-explorer-section');

    const normX = Math.max(0, Math.min(1, mouseX / canvas.width));
    const angleDeg = Math.round(normX * 360);
    const instantI_val = Math.sin((angleDeg * Math.PI) / 180);

    let desc = '';
    if (angleDeg === 0) desc = '0 (Zero Crossing +)';
    else if (angleDeg === 90) desc = '+I₀ (Max Peak)';
    else if (angleDeg === 180) desc = '0 (Zero Crossing -)';
    else if (angleDeg === 270) desc = '-I₀ (Negative Peak)';
    else if (angleDeg === 360) desc = '0 (1 Cycle Complete)';
    else desc = `${instantI_val >= 0 ? '+' : ''}${instantI_val.toFixed(2)} I₀`;

    if (tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.left = `${mouseX}px`;
      tooltip.style.top = '30px';
      tooltip.textContent = `θ = ${angleDeg}° (${((angleDeg / 180) * Math.PI).toFixed(2)} rad) | i = ${desc}`;
    }
  }

  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseleave', () => {
    mouseX = -1;
    if (tooltip) tooltip.style.display = 'none';
  });

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;
    const amp = h * 0.38;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Subtle grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Baseline & Key Angle Markers
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.stroke();

    const angles = [
      { deg: 0, rad: '0', t: 't=0', x: 0 },
      { deg: 90, rad: 'π/2', t: 'T/4', x: w * 0.25 },
      { deg: 180, rad: 'π', t: 'T/2', x: w * 0.5 },
      { deg: 270, rad: '3π/2', t: '3T/4', x: w * 0.75 },
      { deg: 360, rad: '2π', t: 'T', x: w }
    ];

    angles.forEach(pt => {
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pt.x, 20);
      ctx.lineTo(pt.x, h - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`${pt.deg}°`, pt.x, centerY + (pt.deg === 90 ? -amp - 10 : pt.deg === 270 ? amp + 20 : 18));
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(pt.rad, pt.x, h - 6);
    });

    // Sine Wave path
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= w; x++) {
      const angle = (x / w) * 2 * Math.PI;
      const y = centerY - Math.sin(angle) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Interactive Scrubber Indicator
    if (mouseX >= 0 && mouseX <= w) {
      const angle = (mouseX / w) * 2 * Math.PI;
      const y = centerY - Math.sin(angle) * amp;

      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, h);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(mouseX, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   MODULE 03: FREQUENCY & TIME PERIOD LAB
   ========================================================================== */
function initFreqPeriodLab() {
  const fSlider = document.getElementById('freq-linked-slider');
  const tSlider = document.getElementById('period-linked-slider');
  const fDisp = document.getElementById('freq-linked-disp');
  const tDisp = document.getElementById('period-linked-disp');

  const mathT = document.getElementById('math-t-step');
  const mathW = document.getElementById('math-w-step');
  const mathCrossings = document.getElementById('math-crossings-step');

  const presets = document.querySelectorAll('.preset-freq-btn');

  function updateAll(freq) {
    freq = Math.max(0.1, freq);
    const T_sec = 1 / freq;
    const T_ms = T_sec * 1000;
    const w = 2 * Math.PI * freq;
    const reversals = 2 * freq;

    if (fDisp) fDisp.textContent = `${freq.toFixed(1)} Hz`;
    if (tDisp) tDisp.textContent = `${T_sec.toFixed(4)} s (${T_ms.toFixed(1)} ms)`;

    if (fSlider) fSlider.value = freq;
    if (tSlider) tSlider.value = T_ms;

    if (mathT) mathT.textContent = `T = 1 / f = 1 / ${freq.toFixed(1)} Hz = ${T_sec.toFixed(4)} s (${T_ms.toFixed(1)} ms)`;
    if (mathW) mathW.textContent = `ω = 2πf = 2 × 3.14159 × ${freq.toFixed(1)} = ${w.toFixed(2)} rad/s`;
    if (mathCrossings) mathCrossings.textContent = `Current reverses direction 2f = ${reversals.toFixed(0)} times/sec (${freq.toFixed(0)} +ve & ${freq.toFixed(0)} -ve peaks)`;
  }

  if (fSlider) {
    fSlider.addEventListener('input', (e) => {
      const f = parseFloat(e.target.value);
      updateAll(f);
      trackSectionVisit('freq-time-lab');
    });
  }

  if (tSlider) {
    tSlider.addEventListener('input', (e) => {
      const tMs = parseFloat(e.target.value);
      const f = 1000 / tMs;
      updateAll(f);
      trackSectionVisit('freq-time-lab');
    });
  }

  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = parseFloat(btn.getAttribute('data-freq'));
      updateAll(f);
      trackSectionVisit('freq-time-lab');
    });
  });
}

/* ==========================================================================
   MODULE 04: RMS (ROOT MEAN SQUARE) VISUALIZER
   ========================================================================== */
function initRmsLab() {
  const canvas = document.getElementById('rms-graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const slider = document.getElementById('rms-peak-input-slider');
  const inputDisp = document.getElementById('rms-input-disp');
  const vpDisp = document.getElementById('rms-card-vp');
  const vrmsDisp = document.getElementById('rms-card-vrms');

  let peakV = 311.1;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 230;
  }
  window.addEventListener('resize', resize);
  resize();

  if (slider) {
    slider.addEventListener('input', (e) => {
      peakV = parseFloat(e.target.value);
      const rms = peakV / Math.SQRT2;
      if (inputDisp) inputDisp.textContent = `${peakV.toFixed(1)} V`;
      if (vpDisp) vpDisp.textContent = `${peakV.toFixed(1)} V`;
      if (vrmsDisp) vrmsDisp.textContent = `${rms.toFixed(1)} V`;
      trackSectionVisit('rms-section');
    });
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;
    const scaleY = (h * 0.42) / 500;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Zero line
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.stroke();

    const rmsVal = peakV / Math.SQRT2;
    const rmsY_pos = centerY - rmsVal * scaleY;

    // RMS Constant Line (Green)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, rmsY_pos);
    ctx.lineTo(w, rmsY_pos);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`RMS Equivalent Level = ${rmsVal.toFixed(1)} V`, 10, rmsY_pos - 6);

    // Peak Sinusoidal Curve (Cyan)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const angle = (x / w) * 4 * Math.PI;
      const y = centerY - peakV * scaleY * Math.sin(angle);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Shaded i^2 heating area
    ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    for (let x = 0; x < w; x++) {
      const angle = (x / w) * 4 * Math.PI;
      const y = centerY - peakV * scaleY * Math.sin(angle);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, centerY);
    ctx.closePath();
    ctx.fill();

    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   MODULE 05: AC vs DC ELECTRON DRIFT SIMULATOR
   ========================================================================== */
function initAcVsDcLab() {
  const dcCanvas = document.getElementById('dc-anim-canvas');
  const acCanvas = document.getElementById('ac-anim-canvas');
  if (!dcCanvas || !acCanvas) return;

  const dcCtx = dcCanvas.getContext('2d');
  const acCtx = acCanvas.getContext('2d');

  function resize() {
    dcCanvas.width = dcCanvas.parentElement.clientWidth;
    dcCanvas.height = 180;
    acCanvas.width = acCanvas.parentElement.clientWidth;
    acCanvas.height = 180;
  }
  window.addEventListener('resize', resize);
  resize();

  const numElectrons = 35;
  const dcElectrons = Array.from({ length: numElectrons }, () => ({
    x: Math.random() * 300,
    y: 90 + (Math.random() * 20 - 10)
  }));

  const acElectrons = Array.from({ length: numElectrons }, (_, i) => ({
    baseX: (i / numElectrons) * 300,
    y: 90 + (Math.random() * 20 - 10)
  }));

  let time = 0;

  function render() {
    time += 0.02;

    // --- DC Canvas ---
    const w1 = dcCanvas.width;
    const h1 = dcCanvas.height;
    dcCtx.fillStyle = '#020617';
    dcCtx.fillRect(0, 0, w1, h1);

    // Conductor Tube
    dcCtx.strokeStyle = '#334155';
    dcCtx.lineWidth = 3;
    dcCtx.strokeRect(30, 70, w1 - 60, 40);

    // Direction arrow
    dcCtx.fillStyle = '#38bdf8';
    dcCtx.font = 'bold 11px system-ui';
    dcCtx.fillText('Steady Current Flow (Unidirectional →)', 40, 50);

    // Electrons (moving constantly to the right)
    dcElectrons.forEach(e => {
      e.x += 1.5;
      if (e.x > w1 - 35) e.x = 35;

      dcCtx.fillStyle = '#38bdf8';
      dcCtx.beginPath();
      dcCtx.arc(e.x, e.y, 4, 0, 2 * Math.PI);
      dcCtx.fill();
    });

    // --- AC Canvas ---
    const w2 = acCanvas.width;
    const h2 = acCanvas.height;
    acCtx.fillStyle = '#020617';
    acCtx.fillRect(0, 0, w2, h2);

    // Conductor Tube
    acCtx.strokeStyle = '#334155';
    acCtx.lineWidth = 3;
    acCtx.strokeRect(30, 70, w2 - 60, 40);

    const shift = Math.sin(time * 3) * 25;
    const dir = Math.cos(time * 3) > 0 ? '→ Positive Cycle' : '← Negative Cycle';

    acCtx.fillStyle = '#06b6d4';
    acCtx.font = 'bold 11px system-ui';
    acCtx.fillText(`Alternating Oscillation (${dir})`, 40, 50);

    acElectrons.forEach(e => {
      const curX = ((e.baseX / 300) * (w2 - 70) + 35) + shift;
      acCtx.fillStyle = '#06b6d4';
      acCtx.beginPath();
      acCtx.arc(curX, e.y, 4, 0, 2 * Math.PI);
      acCtx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   MODULE 06: PURE R, L, C CIRCUITS & PHASOR VISUALIZER
   ========================================================================== */
function initComponentsLab() {
  let activeTab = 'resistor'; // 'resistor' | 'inductor' | 'capacitor'
  const titleElem = document.getElementById('component-card-title');
  const badgeElem = document.getElementById('component-memory-badge');
  const controlsElem = document.getElementById('component-controls-container');
  const statsElem = document.getElementById('component-stats-grid');
  const yieldTitle = document.getElementById('component-yield-title');
  const yieldText = document.getElementById('component-yield-text');

  const canvas = document.getElementById('component-phasor-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const readout = document.getElementById('phasor-readout-text');

  let resR = 50, indL = 0.2, capC = 50, freq = 50;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 260;
  }
  window.addEventListener('resize', resize);
  resize();

  const tabs = {
    resistor: document.getElementById('tab-btn-resistor'),
    inductor: document.getElementById('tab-btn-inductor'),
    capacitor: document.getElementById('tab-btn-capacitor')
  };

  function setTab(tab) {
    activeTab = tab;
    Object.keys(tabs).forEach(k => {
      if (tabs[k]) {
        if (k === tab) {
          tabs[k].className = 'btn btn-primary component-tab-btn active';
        } else {
          tabs[k].className = 'btn btn-outline component-tab-btn';
        }
      }
    });
    renderControls();
    trackSectionVisit('components-lab');
  }

  if (tabs.resistor) tabs.resistor.addEventListener('click', () => setTab('resistor'));
  if (tabs.inductor) tabs.inductor.addEventListener('click', () => setTab('inductor'));
  if (tabs.capacitor) tabs.capacitor.addEventListener('click', () => setTab('capacitor'));

  function renderControls() {
    if (!controlsElem || !statsElem) return;

    if (activeTab === 'resistor') {
      if (titleElem) titleElem.textContent = 'Pure Resistor Circuit (R)';
      if (badgeElem) {
        badgeElem.textContent = 'ϕ = 0° (IN PHASE)';
        badgeElem.className = 'badge-pill badge-gold';
      }
      controlsElem.innerHTML = `
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">Resistance (R)</label>
            <span class="control-value-badge" id="c-r-disp">${resR} Ω</span>
          </div>
          <input type="range" id="c-r-slider" min="10" max="200" value="${resR}" class="lab-slider">
        </div>
      `;
      const curI = 220 / resR;
      statsElem.innerHTML = `
        <div class="hero-stat-card">
          <div class="stat-lbl">Opposition</div>
          <div class="stat-val">R = ${resR} Ω</div>
        </div>
        <div class="hero-stat-card">
          <div class="stat-lbl">Current (I_rms)</div>
          <div class="stat-val">${curI.toFixed(2)} A</div>
        </div>
      `;
      if (yieldTitle) yieldTitle.textContent = 'MDCAT Resistor Fact ⭐';
      if (yieldText) yieldText.textContent = 'Voltage and current are in phase (ϕ = 0°). Power factor cos ϕ = 1. Average power dissipated is P = V_rms × I_rms.';

      document.getElementById('c-r-slider')?.addEventListener('input', (e) => {
        resR = parseFloat(e.target.value);
        renderControls();
      });
    } else if (activeTab === 'inductor') {
      if (titleElem) titleElem.textContent = 'Pure Inductor Circuit (L)';
      if (badgeElem) {
        badgeElem.textContent = 'L = LAG (Current Lags by 90°)';
        badgeElem.className = 'badge-pill badge-blue';
      }
      const xl = 2 * Math.PI * freq * indL;
      controlsElem.innerHTML = `
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">Inductance (L)</label>
            <span class="control-value-badge">${indL.toFixed(2)} H</span>
          </div>
          <input type="range" id="c-l-slider" min="0.05" max="1.0" step="0.05" value="${indL}" class="lab-slider">
        </div>
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">Frequency (f)</label>
            <span class="control-value-badge">${freq} Hz</span>
          </div>
          <input type="range" id="c-f-slider" min="10" max="200" value="${freq}" class="lab-slider">
        </div>
      `;
      statsElem.innerHTML = `
        <div class="hero-stat-card">
          <div class="stat-lbl">Inductive Reactance (X_L)</div>
          <div class="stat-val" style="color: #0284c7;">${xl.toFixed(1)} Ω</div>
        </div>
        <div class="hero-stat-card">
          <div class="stat-lbl">Phase Difference</div>
          <div class="stat-val">Current Lags 90°</div>
        </div>
      `;
      if (yieldTitle) yieldTitle.textContent = 'Memory: "L = Lag" ⭐';
      if (yieldText) yieldText.textContent = 'X_L = 2πfL. As frequency increases, X_L increases proportionally! Inductors block high frequencies and pass DC.';

      document.getElementById('c-l-slider')?.addEventListener('input', (e) => {
        indL = parseFloat(e.target.value);
        renderControls();
      });
      document.getElementById('c-f-slider')?.addEventListener('input', (e) => {
        freq = parseFloat(e.target.value);
        renderControls();
      });
    } else {
      if (titleElem) titleElem.textContent = 'Pure Capacitor Circuit (C)';
      if (badgeElem) {
        badgeElem.textContent = 'C = CURRENT COMES FIRST (Leads by 90°)';
        badgeElem.className = 'badge-pill badge-cyan';
      }
      const xc = 1 / (2 * Math.PI * freq * (capC * 1e-6));
      controlsElem.innerHTML = `
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">Capacitance (C)</label>
            <span class="control-value-badge">${capC} µF</span>
          </div>
          <input type="range" id="c-c-slider" min="5" max="150" step="5" value="${capC}" class="lab-slider">
        </div>
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">Frequency (f)</label>
            <span class="control-value-badge">${freq} Hz</span>
          </div>
          <input type="range" id="c-f2-slider" min="10" max="200" value="${freq}" class="lab-slider">
        </div>
      `;
      statsElem.innerHTML = `
        <div class="hero-stat-card">
          <div class="stat-lbl">Capacitive Reactance (X_C)</div>
          <div class="stat-val" style="color: #e11d48;">${xc.toFixed(1)} Ω</div>
        </div>
        <div class="hero-stat-card">
          <div class="stat-lbl">Phase Difference</div>
          <div class="stat-val">Current Leads 90°</div>
        </div>
      `;
      if (yieldTitle) yieldTitle.textContent = 'Memory: "C = Current Leads" ⭐';
      if (yieldText) yieldText.textContent = 'X_C = 1/(2πfC). As frequency increases, X_C decreases inversely! Capacitors block DC (f=0 => X_C=∞) and pass high-frequency AC.';

      document.getElementById('c-c-slider')?.addEventListener('input', (e) => {
        capC = parseFloat(e.target.value);
        renderControls();
      });
      document.getElementById('c-f2-slider')?.addEventListener('input', (e) => {
        freq = parseFloat(e.target.value);
        renderControls();
      });
    }
  }
  renderControls();

  let phasorAngle = 0;
  function drawPhasor() {
    phasorAngle += 0.03;
    const w = canvas.width;
    const h = canvas.height;
    const phasorCenterX = 90;
    const phasorCenterY = h / 2;
    const phasorRadius = 60;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Phasor reference circle
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(phasorCenterX, phasorCenterY, phasorRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Determine phase shift for current
    let currentShift = 0;
    if (activeTab === 'inductor') currentShift = -Math.PI / 2; // lags
    if (activeTab === 'capacitor') currentShift = Math.PI / 2; // leads

    // Voltage Phasor (Cyan)
    const vx = phasorCenterX + Math.cos(phasorAngle) * phasorRadius;
    const vy = phasorCenterY - Math.sin(phasorAngle) * phasorRadius;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(phasorCenterX, phasorCenterY);
    ctx.lineTo(vx, vy);
    ctx.stroke();

    // Current Phasor (Violet)
    const ix = phasorCenterX + Math.cos(phasorAngle + currentShift) * (phasorRadius * 0.75);
    const iy = phasorCenterY - Math.sin(phasorAngle + currentShift) * (phasorRadius * 0.75);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(phasorCenterX, phasorCenterY);
    ctx.lineTo(ix, iy);
    ctx.stroke();

    // Waveform side (Right 65% of canvas)
    const waveStartX = 180;
    const waveWidth = w - waveStartX - 20;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < waveWidth; x++) {
      const angle = phasorAngle + (x / waveWidth) * 3 * Math.PI;
      const y = phasorCenterY - Math.sin(angle) * 55;
      if (x === 0) ctx.moveTo(waveStartX + x, y);
      else ctx.lineTo(waveStartX + x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < waveWidth; x++) {
      const angle = phasorAngle + currentShift + (x / waveWidth) * 3 * Math.PI;
      const y = phasorCenterY - Math.sin(angle) * 40;
      if (x === 0) ctx.moveTo(waveStartX + x, y);
      else ctx.lineTo(waveStartX + x, y);
    }
    ctx.stroke();

    if (readout) {
      if (activeTab === 'resistor') readout.textContent = 'Resistor: V & I in exact phase (ϕ = 0°)';
      else if (activeTab === 'inductor') readout.textContent = 'Inductor: Current LAGS Voltage by 90°';
      else readout.textContent = 'Capacitor: Current LEADS Voltage by 90°';
    }

    requestAnimationFrame(drawPhasor);
  }
  drawPhasor();
}

/* ==========================================================================
   MODULE 07: SERIES RLC CIRCUIT & IMPEDANCE LAB
   ========================================================================== */
function initRlcLab() {
  const rSlider = document.getElementById('rlc-r-slider');
  const lSlider = document.getElementById('rlc-l-slider');
  const cSlider = document.getElementById('rlc-c-slider');
  const fSlider = document.getElementById('rlc-f-slider');

  const rVal = document.getElementById('rlc-r-val');
  const lVal = document.getElementById('rlc-l-val');
  const cVal = document.getElementById('rlc-c-val');
  const fVal = document.getElementById('rlc-f-val');

  const xlOut = document.getElementById('rlc-xl-out');
  const xcOut = document.getElementById('rlc-xc-out');
  const zOut = document.getElementById('rlc-z-out');
  const phiOut = document.getElementById('rlc-phi-out');
  const pfOut = document.getElementById('rlc-pf-out');
  const stateBadge = document.getElementById('rlc-circuit-state-badge');

  const canvas = document.getElementById('rlc-triangle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let R = 50, L = 0.2, C = 50, f = 50;

  function update() {
    const XL = 2 * Math.PI * f * L;
    const XC = 1 / (2 * Math.PI * f * (C * 1e-6));
    const Xnet = XL - XC;
    const Z = Math.sqrt(R * R + Xnet * Xnet);
    const phiRad = Math.atan2(Xnet, R);
    const phiDeg = (phiRad * 180) / Math.PI;
    const pf = R / Z;

    if (rVal) rVal.textContent = `${R.toFixed(1)} Ω`;
    if (lVal) lVal.textContent = `${L.toFixed(2)} H (${(L * 1000).toFixed(0)} mH)`;
    if (cVal) cVal.textContent = `${C.toFixed(1)} µF`;
    if (fVal) fVal.textContent = `${f.toFixed(1)} Hz`;

    if (xlOut) xlOut.textContent = `${XL.toFixed(1)} Ω`;
    if (xcOut) xcOut.textContent = `${XC.toFixed(1)} Ω`;
    if (zOut) zOut.textContent = `${Z.toFixed(1)} Ω`;
    if (phiOut) phiOut.textContent = `${phiDeg >= 0 ? '+' : ''}${phiDeg.toFixed(1)}°`;
    if (pfOut) pfOut.textContent = `${pf.toFixed(3)}`;

    if (stateBadge) {
      if (Math.abs(XL - XC) < 1) {
        stateBadge.textContent = 'RESONANCE (Z = R)';
        stateBadge.className = 'badge-pill badge-gold';
      } else if (XL > XC) {
        stateBadge.textContent = 'INDUCTIVE (Current Lags)';
        stateBadge.className = 'badge-pill badge-blue';
      } else {
        stateBadge.textContent = 'CAPACITIVE (Current Leads)';
        stateBadge.className = 'badge-pill badge-cyan';
      }
    }

    drawTriangle(R, Xnet, Z, phiDeg);
  }

  function drawTriangle(r, xnet, z, phi) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const startX = 40;
    const startY = h / 2;
    const scale = Math.min(1.2, (w * 0.55) / Math.max(r, Math.abs(xnet), 80));

    const endRx = startX + r * scale;
    const endRy = startY;

    // Base R (Green)
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endRx, endRy);
    ctx.stroke();

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 11px system-ui';
    ctx.fillText(`R = ${r.toFixed(0)}Ω`, startX + (r * scale) / 2 - 20, startY + 16);

    // Vertical (X_L - X_C)
    const endXx = endRx;
    const endXy = startY - xnet * scale;

    ctx.strokeStyle = xnet >= 0 ? '#0284c7' : '#e11d48';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(endRx, endRy);
    ctx.lineTo(endXx, endXy);
    ctx.stroke();

    ctx.fillStyle = xnet >= 0 ? '#0284c7' : '#e11d48';
    ctx.fillText(`X = ${xnet.toFixed(0)}Ω`, endXx + 8, startY - (xnet * scale) / 2);

    // Hypotenuse Z (Navy)
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endXx, endXy);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.fillText(`Z = ${z.toFixed(0)}Ω`, startX + (endXx - startX) / 2 - 10, startY - (startY - endXy) / 2 - 8);
  }

  [rSlider, lSlider, cSlider, fSlider].forEach(s => {
    s?.addEventListener('input', () => {
      R = parseFloat(rSlider.value);
      L = parseFloat(lSlider.value);
      C = parseFloat(cSlider.value);
      f = parseFloat(fSlider.value);
      update();
      trackSectionVisit('rlc-lab');
    });
  });

  update();
}

/* ==========================================================================
   MODULE 08: SERIES RESONANCE LAB (MDCAT GOLD ⭐⭐⭐)
   ========================================================================== */
function initResonanceLab() {
  const sweepSlider = document.getElementById('res-sweep-slider');
  const sweepDisp = document.getElementById('res-sweep-disp');
  const f0Badge = document.getElementById('resonance-f0-badge');
  const alertBanner = document.getElementById('resonance-found-alert');
  const snapBtn = document.getElementById('res-snap-f0-btn');
  const lockBtn = document.getElementById('resonance-auto-tune-btn');

  const curOut = document.getElementById('res-current-out');
  const zOut = document.getElementById('res-z-out');
  const xnetOut = document.getElementById('res-xnet-out');
  const pfOut = document.getElementById('res-pf-out');

  const canvas = document.getElementById('resonance-curve-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let L = 0.2, C = 50e-6, R = 50, V = 220;
  let curFreq = 50;

  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 230;
  }
  window.addEventListener('resize', resize);
  resize();

  if (f0Badge) f0Badge.textContent = `Resonant f₀ = ${f0.toFixed(2)} Hz`;

  function calculateState(f) {
    const XL = 2 * Math.PI * f * L;
    const XC = 1 / (2 * Math.PI * f * C);
    const Xnet = XL - XC;
    const Z = Math.sqrt(R * R + Xnet * Xnet);
    const I = V / Z;
    const pf = R / Z;
    return { XL, XC, Xnet, Z, I, pf };
  }

  function update() {
    const state = calculateState(curFreq);
    if (sweepDisp) sweepDisp.textContent = `${curFreq.toFixed(1)} Hz`;
    if (curOut) curOut.textContent = `${state.I.toFixed(2)} A`;
    if (zOut) zOut.textContent = `${state.Z.toFixed(1)} Ω`;
    if (xnetOut) xnetOut.textContent = `${state.Xnet.toFixed(1)} Ω`;
    if (pfOut) pfOut.textContent = `${state.pf.toFixed(3)}`;

    const isNearResonance = Math.abs(curFreq - f0) < 1.5;
    if (alertBanner) {
      if (isNearResonance) alertBanner.classList.add('active');
      else alertBanner.classList.remove('active');
    }
  }

  if (sweepSlider) {
    sweepSlider.addEventListener('input', (e) => {
      curFreq = parseFloat(e.target.value);
      update();
      trackSectionVisit('resonance-lab');
    });
  }

  if (snapBtn) {
    snapBtn.addEventListener('click', () => {
      curFreq = f0;
      if (sweepSlider) sweepSlider.value = f0;
      update();
      trackSectionVisit('resonance-lab');
    });
  }

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      curFreq = f0;
      if (sweepSlider) sweepSlider.value = f0;
      update();
    });
  }

  function drawCurve() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, h - 30);
    ctx.lineTo(w - 20, h - 30);
    ctx.stroke();

    // Plot Resonance I vs f curve
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const maxI = V / R; // Peak current at resonance

    for (let px = 40; px < w - 20; px++) {
      const f = 10 + ((px - 40) / (w - 60)) * 140;
      const st = calculateState(f);
      const py = (h - 30) - (st.I / maxI) * (h - 60);

      if (px === 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Resonant Peak Vertical Line (Gold)
    const f0X = 40 + ((f0 - 10) / 140) * (w - 60);
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(f0X, 20);
    ctx.lineTo(f0X, h - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`f₀ = ${f0.toFixed(1)}Hz`, f0X - 25, 25);

    // Current Operating Point (Glowing Dot)
    const curX = 40 + ((curFreq - 10) / 140) * (w - 60);
    const curState = calculateState(curFreq);
    const curY = (h - 30) - (curState.I / maxI) * (h - 60);

    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(drawCurve);
  }
  drawCurve();
  update();
}

/* ==========================================================================
   MODULE 09: AC GENERATOR (ALTERNATOR) LAB
   ========================================================================== */
function initGeneratorLab() {
  const canvas = document.getElementById('generator-anim-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const speedSlider = document.getElementById('gen-speed-slider');
  const turnsSlider = document.getElementById('gen-turns-slider');
  const bSlider = document.getElementById('gen-b-slider');

  const speedVal = document.getElementById('gen-speed-val');
  const turnsVal = document.getElementById('gen-turns-val');
  const bVal = document.getElementById('gen-b-val');

  const angleOut = document.getElementById('gen-angle-readout');
  const fluxOut = document.getElementById('gen-flux-readout');
  const emfOut = document.getElementById('gen-emf-readout');

  let speed = 30; // RPM
  let turns = 200;
  let B = 0.5;
  let coilAngle = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 260;
  }
  window.addEventListener('resize', resize);
  resize();

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speed = parseFloat(e.target.value);
      if (speedVal) speedVal.textContent = `${speed} RPM`;
      trackSectionVisit('generator-lab');
    });
  }

  if (turnsSlider) {
    turnsSlider.addEventListener('input', (e) => {
      turns = parseFloat(e.target.value);
      if (turnsVal) turnsVal.textContent = `${turns} turns`;
      trackSectionVisit('generator-lab');
    });
  }

  if (bSlider) {
    bSlider.addEventListener('input', (e) => {
      B = parseFloat(e.target.value);
      if (bVal) bVal.textContent = `${B.toFixed(2)} T`;
      trackSectionVisit('generator-lab');
    });
  }

  function render() {
    coilAngle += (speed * 0.002);
    const w = canvas.width;
    const h = canvas.height;
    const centerY = h / 2;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Left: North Pole (Red/Amber), Right: South Pole (Blue)
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(20, 50, 45, 160);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px system-ui';
    ctx.fillText('N', 35, 140);

    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(w - 65, 50, 45, 160);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('S', w - 50, 140);

    // Magnetic Field Lines (N to S)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 1.5;
    for (let y = 70; y <= 190; y += 24) {
      ctx.beginPath();
      ctx.moveTo(65, y);
      ctx.lineTo(w - 65, y);
      ctx.stroke();
    }

    // Rotating Coil Armature
    const centerX = w / 2;
    const coilW = 55;
    const coilH = 90;
    const projW = coilW * Math.cos(coilAngle);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(-projW / 2, -coilH / 2, projW, coilH);
    ctx.restore();

    // Synchronized EMF Waveform at bottom
    const angleDeg = Math.round(((coilAngle % (2 * Math.PI)) * 180) / Math.PI);
    const instantEmf = turns * B * (speed * 0.1) * Math.sin(coilAngle);

    if (angleOut) angleOut.textContent = `${angleDeg}°`;
    if (fluxOut) fluxOut.textContent = `Φ = ${(B * Math.cos(coilAngle)).toFixed(2)} Wb`;
    if (emfOut) emfOut.textContent = `${instantEmf.toFixed(1)} V`;

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   MODULE 10: TRANSFORMER LAB (STEP-UP / STEP-DOWN)
   ========================================================================== */
function initTransformerLab() {
  const canvas = document.getElementById('transformer-anim-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const vpSlider = document.getElementById('trans-vp-slider');
  const npSlider = document.getElementById('trans-np-slider');
  const nsSlider = document.getElementById('trans-ns-slider');
  const rlSlider = document.getElementById('trans-rl-slider');

  const vpVal = document.getElementById('trans-vp-val');
  const npVal = document.getElementById('trans-np-val');
  const nsVal = document.getElementById('trans-ns-val');
  const rlVal = document.getElementById('trans-rl-val');

  const vpDisp = document.getElementById('trans-vp-disp');
  const ratioDisp = document.getElementById('trans-ratio-disp');
  const vsDisp = document.getElementById('trans-vs-disp');
  const pDisp = document.getElementById('trans-p-disp');
  const typeBadge = document.getElementById('trans-type-badge');

  let Vp = 120, Np = 100, Ns = 200, RL = 30;
  let fluxPhase = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 250;
  }
  window.addEventListener('resize', resize);
  resize();

  function update() {
    const ratio = Ns / Np;
    const Vs = Vp * ratio;
    const Is = Vs / RL;
    const Ip = Is * ratio;
    const Power = Vs * Is;

    if (vpVal) vpVal.textContent = `${Vp} V`;
    if (npVal) npVal.textContent = `${Np} turns`;
    if (nsVal) nsVal.textContent = `${Ns} turns`;
    if (rlVal) rlVal.textContent = `${RL} Ω`;

    if (vpDisp) vpDisp.textContent = `${Vp.toFixed(0)} V`;
    if (ratioDisp) ratioDisp.textContent = `${ratio.toFixed(2)}`;
    if (vsDisp) vsDisp.textContent = `${Vs.toFixed(0)} V`;
    if (pDisp) pDisp.textContent = `${Power.toFixed(0)} W`;

    if (typeBadge) {
      if (Ns > Np) {
        typeBadge.textContent = 'STEP-UP TRANSFORMER (Vs > Vp, Is < Ip)';
        typeBadge.className = 'badge-pill badge-gold';
      } else if (Ns < Np) {
        typeBadge.textContent = 'STEP-DOWN TRANSFORMER (Vs < Vp, Is > Ip)';
        typeBadge.className = 'badge-pill badge-blue';
      } else {
        typeBadge.textContent = '1:1 ISOLATION TRANSFORMER (Vs = Vp)';
        typeBadge.className = 'badge-pill badge-cyan';
      }
    }
  }

  [vpSlider, npSlider, nsSlider, rlSlider].forEach(s => {
    s?.addEventListener('input', () => {
      Vp = parseFloat(vpSlider.value);
      Np = parseFloat(npSlider.value);
      Ns = parseFloat(nsSlider.value);
      RL = parseFloat(rlSlider.value);
      update();
      trackSectionVisit('transformer-lab');
    });
  });

  function render() {
    fluxPhase += 0.04;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);

    // Iron Core Square Loop
    const coreW = 160;
    const coreH = 140;
    const coreX = (w - coreW) / 2;
    const coreY = (h - coreH) / 2;
    const coreThick = 24;

    ctx.fillStyle = '#334155';
    ctx.fillRect(coreX, coreY, coreW, coreH);
    ctx.fillStyle = '#020617';
    ctx.fillRect(coreX + coreThick, coreY + coreThick, coreW - coreThick * 2, coreH - coreThick * 2);

    // Magnetic Flux Lines Animation (Circulating)
    const fluxAlpha = (Math.sin(fluxPhase) + 1) / 2;
    ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 + fluxAlpha * 0.5})`;
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(coreX + coreThick / 2, coreY + coreThick / 2, coreW - coreThick, coreH - coreThick);
    ctx.setLineDash([]);

    // Primary Coils (Left Limb)
    ctx.fillStyle = '#e11d48';
    const numP = Math.min(12, Math.max(4, Math.round(Np / 25)));
    for (let i = 0; i < numP; i++) {
      const cy = coreY + 30 + i * (80 / numP);
      ctx.fillRect(coreX - 6, cy, coreThick + 12, 5);
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px system-ui';
    ctx.fillText(`Primary: ${Np}T`, coreX - 70, coreY + 70);

    // Secondary Coils (Right Limb)
    ctx.fillStyle = '#22c55e';
    const numS = Math.min(12, Math.max(4, Math.round(Ns / 25)));
    for (let i = 0; i < numS; i++) {
      const cy = coreY + 30 + i * (80 / numS);
      ctx.fillRect(coreX + coreW - coreThick - 6, cy, coreThick + 12, 5);
    }
    ctx.fillText(`Secondary: ${Ns}T`, coreX + coreW + 15, coreY + 70);

    requestAnimationFrame(render);
  }
  render();
  update();
}

/* ==========================================================================
   MODULE 11: AC FORMULA WALL
   ========================================================================== */
function initFormulaWall() {
  const container = document.getElementById('formula-wall-grid');
  if (!container) return;

  const formulas = [
    {
      title: 'Instantaneous Current',
      expr: 'i = I₀ sin(ωt)',
      symbols: ['i = Instantaneous current (A)', 'I₀ = Peak current (A)', 'ω = Angular frequency (rad/s)', 't = Instant of time (s)'],
      unit: 'Ampere (A)',
      tip: 'At t = T/4 (90°), i = +I₀. At t = T/12 (30°), i = 0.5 I₀.'
    },
    {
      title: 'Instantaneous Voltage',
      expr: 'V = V₀ sin(ωt)',
      symbols: ['V = Instantaneous voltage (V)', 'V₀ = Peak voltage (V)', 'ω = Angular frequency (rad/s)'],
      unit: 'Volt (V)',
      tip: 'Voltage continuously varies between +V₀ and -V₀.'
    },
    {
      title: 'RMS Current',
      expr: 'I_rms = I₀ / √2 ≈ 0.707 I₀',
      symbols: ['I_rms = Effective / RMS current', 'I₀ = Peak current'],
      unit: 'Ampere (A)',
      tip: 'I₀ = √2 × I_rms ≈ 1.414 I_rms. Standard AC meters measure RMS!'
    },
    {
      title: 'RMS Voltage',
      expr: 'V_rms = V₀ / √2 ≈ 0.707 V₀',
      symbols: ['V_rms = Effective AC voltage', 'V₀ = Peak AC voltage'],
      unit: 'Volt (V)',
      tip: 'For a 220V mains supply, peak voltage is V₀ = 220 × √2 = 311V.'
    },
    {
      title: 'Angular Frequency',
      expr: 'ω = 2πf = 2π / T',
      symbols: ['ω = Angular frequency (rad/s)', 'f = Frequency (Hz)', 'T = Period (s)'],
      unit: 'rad/s',
      tip: 'For 50 Hz AC, ω = 2π(50) = 314 rad/s. For 60 Hz, ω = 377 rad/s.'
    },
    {
      title: 'Inductive Reactance',
      expr: 'X_L = ωL = 2πfL',
      symbols: ['X_L = Inductive reactance (Ω)', 'L = Self-inductance (H)', 'f = Frequency (Hz)'],
      unit: 'Ohm (Ω)',
      tip: 'X_L ∝ f. At DC (f=0), X_L = 0. Inductors offer zero opposition to DC.'
    },
    {
      title: 'Capacitive Reactance',
      expr: 'X_C = 1 / (ωC) = 1 / (2πfC)',
      symbols: ['X_C = Capacitive reactance (Ω)', 'C = Capacitance (F)', 'f = Frequency (Hz)'],
      unit: 'Ohm (Ω)',
      tip: 'X_C ∝ 1/f. At DC (f=0), X_C = ∞. Capacitors block DC completely.'
    },
    {
      title: 'Series RLC Impedance',
      expr: 'Z = √[ R² + (X_L - X_C)² ]',
      symbols: ['Z = Total impedance (Ω)', 'R = Resistance (Ω)', 'X_L - X_C = Net reactance (Ω)'],
      unit: 'Ohm (Ω)',
      tip: 'Total opposition offered by series RLC circuit to AC flow.'
    },
    {
      title: 'Resonant Frequency',
      expr: 'f₀ = 1 / (2π√[LC])',
      symbols: ['f₀ = Series resonant frequency (Hz)', 'L = Inductance (H)', 'C = Capacitance (F)'],
      unit: 'Hertz (Hz)',
      tip: 'At f₀: X_L = X_C, Z_min = R, I_max = V/R, cos ϕ = 1.'
    },
    {
      title: 'AC Power Factor',
      expr: 'P = V_rms I_rms cos ϕ',
      symbols: ['P = Real power (W)', 'cos ϕ = Power factor (R/Z)', 'ϕ = Phase angle'],
      unit: 'Watt (W)',
      tip: 'In pure L or pure C: ϕ = 90° => cos 90° = 0 => Power loss is ZERO!'
    },
    {
      title: 'Transformer Turns Ratio',
      expr: 'V_s / V_p = N_s / N_p = I_p / I_s',
      symbols: ['V_s, V_p = Secondary/Primary voltage', 'N_s, N_p = Turns', 'I_s, I_p = Currents'],
      unit: 'Ratio (unitless)',
      tip: 'For Step-up: N_s > N_p => V_s > V_p & I_s < I_p (Equal power).'
    },
    {
      title: 'Generator Peak EMF',
      expr: 'E₀ = NABω',
      symbols: ['E₀ = Peak EMF (V)', 'N = Turns', 'A = Area (m²)', 'B = Field (T)', 'ω = rad/s'],
      unit: 'Volt (V)',
      tip: 'Doubling rotation speed doubles both peak EMF and AC frequency!'
    }
  ];

  container.innerHTML = formulas.map((f, i) => `
    <div class="formula-wall-card">
      <div>
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--electric-blue); text-transform: uppercase;">FORMULA ${i + 1}</div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.25rem;">${f.title}</h4>
        <div class="formula-expression">${f.expr}</div>
        <ul class="formula-symbols-list">
          ${f.symbols.map(s => `<li>• ${s}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div style="font-size: 0.6875rem; color: var(--text-dim); margin-bottom: 0.35rem;">SI Unit: <strong>${f.unit}</strong></div>
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 0.375rem; padding: 0.5rem; font-size: 0.75rem; color: #92400e;">
          💡 <strong>MDCAT Tip:</strong> ${f.tip}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   MODULE 12: 30+ HIGH-YIELD MDCAT CONCEPT CARDS
   ========================================================================== */
function initConceptCards() {
  const container = document.getElementById('concept-cards-grid');
  if (!container) return;

  const concepts = [
    { id: 'c1', title: '1. Alternating Current Definition', body: 'Electric current whose magnitude and direction change periodically with time in a repetitive cycle.' },
    { id: 'c2', title: '2. DC vs AC Unidirectionality', body: 'DC charges move unidirectionally; AC charges oscillate symmetrically about mean equilibrium positions.' },
    { id: 'c3', title: '3. Peak Value (V₀, I₀)', body: 'Maximum instantaneous value reached by voltage or current during a half cycle.' },
    { id: 'c4', title: '4. Peak-to-Peak Value (V_p-p)', body: 'The sum of positive and negative peak magnitudes: V_p-p = 2V₀.' },
    { id: 'c5', title: '5. Instantaneous Value Equation', body: 'The value at any specific time t: i = I₀ sin(ωt) or V = V₀ sin(ωt).' },
    { id: 'c6', title: '6. Time Period (T = 1/f)', body: 'Time taken to complete one full 360° cycle. For 50 Hz AC, T = 1/50 = 20 ms.' },
    { id: 'c7', title: '7. Frequency (f = 1/T)', body: 'Number of full cycles per second (unit: Hertz, Hz). Direct DC has f = 0 Hz.' },
    { id: 'c8', title: '8. Angular Frequency (ω = 2πf)', body: 'Rate of change of phase angle in radians per second (rad/s). 50 Hz = 314 rad/s.' },
    { id: 'c9', title: '9. Zero-Crossing Frequency', body: 'An AC of frequency f reverses its direction 2f times every second (100 times for 50Hz).' },
    { id: 'c10', title: '10. Average Value Over Full Cycle', body: 'Average of sinusoidal AC over 1 complete cycle is ZERO because positive and negative halves cancel.' },
    { id: 'c11', title: '11. Average Value Over Half Cycle', body: 'Average over positive half cycle is I_avg = (2/π)I₀ ≈ 0.637 I₀.' },
    { id: 'c12', title: '12. RMS Value (Effective Value)', body: 'The steady DC value that generates the exact same heating rate in an identical resistor.' },
    { id: 'c13', title: '13. Peak to RMS Ratio', body: 'I_rms = I₀ / √2 ≈ 0.707 I₀, and conversely I₀ = √2 × I_rms ≈ 1.414 I_rms.' },
    { id: 'c14', title: '14. AC Meter Calibration', body: 'Hot-wire and moving-iron AC meters read RMS values, never peak or average values.' },
    { id: 'c15', title: '15. Pure Resistor in AC', body: 'Voltage and current are in phase (ϕ = 0°). Opposition is simply resistance R.' },
    { id: 'c16', title: '16. Resistor Power Loss', body: 'P = V_rms × I_rms = I²_rms × R. Power factor cos ϕ = cos 0° = 1 (Unity).' },
    { id: 'c17', title: '17. Pure Inductor in AC', body: 'Current LAGS voltage by 90° (π/2 rad). Memory mnemonic: "L = Lag".' },
    { id: 'c18', title: '18. Inductive Reactance (X_L = 2πfL)', body: 'Opposition of inductor. Directly proportional to frequency (f ↑ => X_L ↑).' },
    { id: 'c19', title: '19. Inductor at DC (f = 0)', body: 'At f = 0, X_L = 0 Ω. A pure inductor acts as a zero-resistance short-circuit to DC.' },
    { id: 'c20', title: '20. Inductor Power Dissipation', body: 'In a pure inductor: ϕ = 90° => cos 90° = 0 => Average power consumed is ZERO (Wattless current).' },
    { id: 'c21', title: '21. Pure Capacitor in AC', body: 'Current LEADS voltage by 90° (π/2 rad). Memory mnemonic: "C = Current Comes first".' },
    { id: 'c22', title: '22. Capacitive Reactance (X_C = 1/2πfC)', body: 'Opposition of capacitor. Inversely proportional to frequency (f ↑ => X_C ↓).' },
    { id: 'c23', title: '23. Capacitor at DC (f = 0)', body: 'At f = 0, X_C = ∞. A capacitor blocks steady direct current completely.' },
    { id: 'c24', title: '24. Capacitor Power Dissipation', body: 'In a pure capacitor: ϕ = -90° => cos(-90°) = 0 => Average power consumed is ZERO.' },
    { id: 'c25', title: '25. Series RLC Impedance', body: 'Z = √[R² + (X_L - X_C)²]. Unit is Ohms (Ω).' },
    { id: 'c26', title: '26. Series Resonance Condition', body: 'Occurs when X_L = X_C. Net reactance vanishes, Z drops to minimum (Z = R).' },
    { id: 'c27', title: '27. Resonant Frequency (f₀)', body: 'f₀ = 1 / (2π√LC). Circuit current is maximum (I_max = V/R).' },
    { id: 'c28', title: '28. AC Generator Principle', body: 'Converts mechanical to electrical energy via Faraday electromagnetic induction: E = NABω sin(ωt).' },
    { id: 'c29', title: '29. Transformer Mutual Induction', body: 'Changes AC voltage via mutual induction: Vs/Vp = Ns/Np = Ip/Is.' },
    { id: 'c30', title: '30. Why Transformers Fail on DC', body: 'Steady DC has dΦ/dt = 0 => induced secondary voltage is 0, and primary coil overheats.' },
    { id: 'c31', title: '31. Transformer Energy Losses', body: 'Copper loss (I²R), Eddy currents (reduced by laminated core), Hysteresis (reduced by soft iron).' },
    { id: 'c32', title: '32. Step-Up vs Step-Down', body: 'Step-up increases voltage and decreases current; Step-down decreases voltage and increases current.' }
  ];

  container.innerHTML = concepts.map(c => `
    <div class="concept-card" id="card-${c.id}">
      <div class="concept-card-top">
        <span class="concept-number">${c.title.split('.')[0]}</span>
        <button class="concept-bookmark-btn ${AppState.bookmarkedConcepts.has(c.id) ? 'bookmarked' : ''}" data-concept="${c.id}" title="Bookmark Concept">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${AppState.bookmarkedConcepts.has(c.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
        </button>
      </div>
      <h4 class="concept-card-title">${c.title}</h4>
      <p class="concept-card-body">${c.body}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   MODULE 13: 25+ INTERACTIVE FLASHCARDS
   ========================================================================== */
function initFlashcards() {
  const cards = [
    { q: 'What is Alternating Current (AC)?', a: 'An electric current whose magnitude and direction change periodically with time in a sinusoidal cycle.' },
    { q: 'What is the relationship between Peak (I₀) and RMS current (I_rms)?', a: 'I_rms = I₀ / √2 ≈ 0.707 I₀, or conversely I₀ = √2 × I_rms ≈ 1.414 I_rms.' },
    { q: 'What is the physical meaning of the RMS value?', a: 'It is the equivalent steady DC value that generates the exact same heating rate in an identical resistance.' },
    { q: 'What is the phase difference between voltage and current in a pure resistor?', a: '0° (Voltage and current are in exact phase, cos ϕ = 1).' },
    { q: 'What is the phase relationship in a pure inductor?', a: 'Current LAGS voltage by 90° (π/2 rad). Memory: "L = Lag".' },
    { q: 'What is the phase relationship in a pure capacitor?', a: 'Current LEADS voltage by 90° (π/2 rad). Memory: "C = Current Comes first".' },
    { q: 'What is the formula for inductive reactance (X_L)?', a: 'X_L = ωL = 2πfL (measured in Ohms Ω). X_L increases with frequency.' },
    { q: 'What is the formula for capacitive reactance (X_C)?', a: 'X_C = 1 / (ωC) = 1 / (2πfC) (measured in Ohms Ω). X_C decreases with frequency.' },
    { q: 'How does an inductor behave at zero frequency (DC)?', a: 'At f = 0, X_L = 0 Ω. It acts as a pure conductor/short circuit.' },
    { q: 'How does a capacitor behave at zero frequency (DC)?', a: 'At f = 0, X_C = ∞. It acts as an open circuit and completely blocks DC.' },
    { q: 'What is the total opposition in a series RLC circuit called?', a: 'Impedance (Z). Formula: Z = √[R² + (X_L - X_C)²].' },
    { q: 'What is the condition for series electrical resonance?', a: 'X_L = X_C (Inductive reactance equals capacitive reactance).' },
    { q: 'What happens to impedance (Z) at series resonance?', a: 'Impedance reaches its absolute minimum: Z_min = R (purely resistive).' },
    { q: 'What happens to circuit current at series resonance?', a: 'Current reaches its absolute maximum: I_max = V / R.' },
    { q: 'What is the resonant frequency (f₀) formula?', a: 'f₀ = 1 / (2π√[LC]).' },
    { q: 'What is the average power consumed in a pure inductor or capacitor?', a: 'ZERO Watts, because the phase angle is 90° and power factor cos 90° = 0.' },
    { q: 'What does a standard AC voltmeter or ammeter measure?', a: 'RMS value (Effective value), not peak or average.' },
    { q: 'What is the peak voltage of a 220V household AC line?', a: 'V₀ = 220 × √2 ≈ 311.1 Volts.' },
    { q: 'What is the average value of sinusoidal AC over 1 complete cycle?', a: 'Zero (0 A), because the positive half cancels the negative half.' },
    { q: 'What is the working principle of an AC generator?', a: 'Electromagnetic Induction (Faraday’s law): Rotating coil changes magnetic flux.' },
    { q: 'What is the working principle of a transformer?', a: 'Mutual electromagnetic induction between primary and secondary windings.' },
    { q: 'Why does an ordinary transformer not work with steady DC?', a: 'Steady DC creates constant flux (dΦ/dt = 0), so no EMF is induced in the secondary.' },
    { q: 'In a Step-Up transformer, how do voltage and current change?', a: 'Voltage increases (V_s > V_p) and current decreases (I_s < I_p) to conserve power.' },
    { q: 'How are eddy current losses minimized in a transformer core?', a: 'By using thin laminated sheets of silicon steel insulated from each other.' },
    { q: 'What is the power factor at resonance in an RLC circuit?', a: 'cos ϕ = 1 (Unity), because voltage and current are in phase.' }
  ];

  let currentIdx = 0;
  const inner = document.getElementById('flashcard-inner-box');
  const cardBox = document.getElementById('flashcard-3d-box');
  const qText = document.getElementById('flashcard-question-text');
  const aText = document.getElementById('flashcard-answer-text');
  const curIdxDisp = document.getElementById('flashcard-current-idx');
  const totalDisp = document.getElementById('flashcard-total-count');
  const prevBtn = document.getElementById('flashcard-prev-btn');
  const nextBtn = document.getElementById('flashcard-next-btn');
  const masterBtn = document.getElementById('flashcard-master-btn');
  const masterCountDisp = document.getElementById('mastered-count');

  if (totalDisp) totalDisp.textContent = cards.length;

  function showCard(idx) {
    if (idx < 0) idx = cards.length - 1;
    if (idx >= cards.length) idx = 0;
    currentIdx = idx;

    if (inner) inner.classList.remove('flipped');
    if (qText) qText.textContent = cards[currentIdx].q;
    if (aText) aText.textContent = cards[currentIdx].a;
    if (curIdxDisp) curIdxDisp.textContent = currentIdx + 1;

    const isMastered = AppState.masteredFlashcards.has(currentIdx);
    if (masterBtn) {
      masterBtn.textContent = isMastered ? '★ Mastered' : '✓ Mark as Mastered';
      masterBtn.className = isMastered ? 'btn btn-cyan btn-sm' : 'btn btn-primary btn-sm';
    }
  }

  if (cardBox && inner) {
    cardBox.addEventListener('click', () => {
      inner.classList.toggle('flipped');
      trackSectionVisit('flashcards-section');
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showCard(currentIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showCard(currentIdx + 1); });

  if (masterBtn) {
    masterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (AppState.masteredFlashcards.has(currentIdx)) {
        AppState.masteredFlashcards.delete(currentIdx);
      } else {
        AppState.masteredFlashcards.add(currentIdx);
      }
      saveAppState();
      if (masterCountDisp) masterCountDisp.textContent = AppState.masteredFlashcards.size;
      showCard(currentIdx);
    });
  }

  if (masterCountDisp) masterCountDisp.textContent = AppState.masteredFlashcards.size;
  showCard(0);
}

/* ==========================================================================
   MODULE 14: 25+ MDCAT PRACTICE MCQs
   ========================================================================== */
function initQuiz() {
  const quizData = [
    {
      q: 'The peak value of an alternating voltage is 311 V. Its effective RMS value is approximately:',
      options: ['110 V', '220 V', '311 V', '440 V'],
      ans: 1,
      exp: 'V_rms = V₀ / √2 = 311 / 1.414 = 220 V.'
    },
    {
      q: 'In a purely inductive AC circuit, the current:',
      options: ['Leads voltage by 90°', 'Lags voltage by 90°', 'Is in phase with voltage', 'Lags voltage by 180°'],
      ans: 1,
      exp: 'In an inductor, current lags voltage by 90° (Memory: "L = Lag").'
    },
    {
      q: 'When the frequency of an AC circuit is doubled, the capacitive reactance (X_C):',
      options: ['Is doubled', 'Remains unchanged', 'Is halved', 'Is quadrupled'],
      ans: 2,
      exp: 'X_C = 1 / (2πfC). Since X_C is inversely proportional to frequency, doubling f halves X_C.'
    },
    {
      q: 'When the frequency of an AC circuit is doubled, the inductive reactance (X_L):',
      options: ['Is doubled', 'Is halved', 'Remains unchanged', 'Becomes zero'],
      ans: 0,
      exp: 'X_L = 2πfL. Since X_L is directly proportional to frequency, doubling f doubles X_L.'
    },
    {
      q: 'At series electrical resonance in an RLC circuit, the total impedance is:',
      options: ['Maximum and equal to X_L + X_C', 'Minimum and equal to resistance R', 'Zero', 'Infinite'],
      ans: 1,
      exp: 'At resonance, X_L = X_C so net reactance is zero and impedance Z = R (minimum).'
    },
    {
      q: 'The power factor of a purely capacitive AC circuit is:',
      options: ['1', '0.5', '0', '-1'],
      ans: 2,
      exp: 'In a pure capacitor, phase angle ϕ = 90°. Therefore, power factor cos 90° = 0.'
    },
    {
      q: 'The average value of a sinusoidal alternating current over one complete cycle is:',
      options: ['I₀ / √2', '2I₀ / π', 'Zero', 'I₀ / 2'],
      ans: 2,
      exp: 'Over 1 full cycle (360°), positive and negative half-cycles cancel completely, so average current is zero.'
    },
    {
      q: 'If the frequency of AC mains is 50 Hz, the time period of one complete cycle is:',
      options: ['0.01 s (10 ms)', '0.02 s (20 ms)', '0.05 s (50 ms)', '0.5 s'],
      ans: 1,
      exp: 'T = 1 / f = 1 / 50 Hz = 0.02 s = 20 ms.'
    },
    {
      q: 'The opposition offered by a capacitor to direct current (DC, f = 0) is:',
      options: ['Zero', 'Very small', 'Infinite', 'Equal to its capacitance'],
      ans: 2,
      exp: 'X_C = 1 / (2πfC). For DC, f = 0, so X_C = 1/0 = ∞ (Capacitor completely blocks DC).'
    },
    {
      q: 'In an ideal transformer with N_s = 400 and N_p = 100, if primary voltage is 220 V, secondary voltage is:',
      options: ['55 V', '110 V', '440 V', '880 V'],
      ans: 3,
      exp: 'V_s = V_p × (N_s / N_p) = 220 × (400 / 100) = 220 × 4 = 880 V (Step-Up).'
    },
    {
      q: 'An ordinary transformer cannot step up or down a steady DC voltage because:',
      options: ['DC has too high resistance', 'There is no change of magnetic flux (dΦ/dt = 0)', 'DC produces no magnetic field', 'Iron core cannot conduct DC'],
      ans: 1,
      exp: 'Transformers require mutual induction, which needs changing magnetic flux (dΦ/dt ≠ 0). In steady DC, dΦ/dt = 0.'
    },
    {
      q: 'The resonant frequency f₀ of a series RLC circuit is given by:',
      options: ['2π / √(LC)', '1 / (2π√(LC))', '2π√(LC)', '√(LC) / 2π'],
      ans: 1,
      exp: 'Equating 2πfL = 1/(2πfC) yields f₀ = 1 / (2π√(LC)).'
    },
    {
      q: 'If peak current is I₀, the instantaneous current at phase angle 30° is:',
      options: ['0.5 I₀', '0.707 I₀', '0.866 I₀', 'I₀'],
      ans: 0,
      exp: 'i = I₀ sin(30°) = I₀ × 0.5 = 0.5 I₀.'
    },
    {
      q: 'In an AC generator, induced EMF is maximum when the plane of the coil is:',
      options: ['Perpendicular to magnetic field', 'Parallel to magnetic field', 'At 45° to magnetic field', 'At 60° to magnetic field'],
      ans: 1,
      exp: 'When the coil plane is parallel to the field, flux is 0 but rate of change of flux (dΦ/dt) is maximum, inducing peak EMF.'
    },
    {
      q: 'Lamination of a transformer core is done to reduce:',
      options: ['Copper loss', 'Hysteresis loss', 'Eddy current loss', 'Flux leakage'],
      ans: 2,
      exp: 'Laminating the core into thin insulated sheets breaks the circulating loop paths of eddy currents, reducing heat loss.'
    },
    {
      q: 'A 100W, 220V AC electric bulb is connected across a 220V DC supply. The power consumed will be:',
      options: ['50 W', '100 W', '200 W', 'Zero'],
      ans: 1,
      exp: 'By definition, 220V AC RMS produces the exact same heating power as 220V steady DC in a resistor (100 W).'
    },
    {
      q: 'In a series RLC circuit, if X_C > X_L, the circuit behaves as:',
      options: ['Purely resistive', 'Predominantly inductive', 'Predominantly capacitive', 'Resonant'],
      ans: 2,
      exp: 'When capacitive reactance exceeds inductive reactance, the circuit is capacitive and current leads voltage.'
    },
    {
      q: 'The unit of inductive reactance (X_L) and capacitive reactance (X_C) is:',
      options: ['Henry', 'Farad', 'Ohm', 'Hertz'],
      ans: 2,
      exp: 'Both reactances represent opposition to current and are measured in Ohms (Ω).'
    },
    {
      q: 'If an AC current reverses direction 100 times in one second, its frequency is:',
      options: ['25 Hz', '50 Hz', '100 Hz', '200 Hz'],
      ans: 1,
      exp: 'Direction reverses 2f times per second. If 2f = 100, then f = 50 Hz.'
    },
    {
      q: 'In an ideal Step-Down transformer, secondary voltage decreases while secondary current:',
      options: ['Decreases', 'Increases', 'Remains unchanged', 'Becomes zero'],
      ans: 1,
      exp: 'To conserve power (P_p = P_s = V_p I_p = V_s I_s), lowering voltage increases current proportionally.'
    },
    {
      q: 'The power factor of a series RLC circuit at resonance is:',
      options: ['0', '0.5', '0.707', '1.0'],
      ans: 3,
      exp: 'At resonance, Z = R, so cos ϕ = R / Z = R / R = 1.0 (Unity).'
    },
    {
      q: 'A choke coil used in fluorescent lamp circuits has:',
      options: ['High resistance and low inductance', 'Low resistance and high inductance', 'High resistance and high inductance', 'Zero resistance and zero inductance'],
      ans: 1,
      exp: 'A choke coil has high L (large X_L to limit current) and very low R (to minimize energy loss).'
    },
    {
      q: 'The phase difference between voltage across inductor and voltage across capacitor in a series RLC circuit is:',
      options: ['0°', '90°', '180°', '360°'],
      ans: 2,
      exp: 'V_L leads current by 90° and V_C lags current by 90°, so V_L and V_C are 180° out of phase (directly opposite).'
    },
    {
      q: 'If the angular frequency ω of an AC source is 314 rad/s, its frequency in Hz is:',
      options: ['25 Hz', '50 Hz', '60 Hz', '100 Hz'],
      ans: 1,
      exp: 'f = ω / (2π) = 314 / 6.283 = 50 Hz.'
    },
    {
      q: 'Which of the following does NOT work on the principle of electromagnetic induction?',
      options: ['AC Generator', 'Transformer', 'Choke coil', 'Electric Heater'],
      ans: 3,
      exp: 'An electric heater works on Joule heating effect (I²Rt), not electromagnetic induction.'
    }
  ];

  let currentQ = 0;
  let score = 0;
  let answered = false;

  const card = document.getElementById('quiz-active-card');
  const resultCard = document.getElementById('quiz-result-card');
  const counterDisp = document.getElementById('quiz-counter-text');
  const qBody = document.getElementById('quiz-question-body');
  const optContainer = document.getElementById('quiz-options-container');
  const expBox = document.getElementById('quiz-explanation');
  const expText = document.getElementById('quiz-explanation-text');
  const liveScoreDisp = document.getElementById('quiz-live-score');
  const liveAttemptedDisp = document.getElementById('quiz-live-attempted');
  const nextBtn = document.getElementById('quiz-next-btn');
  const retryBtn = document.getElementById('quiz-retry-btn');

  function renderQuestion() {
    if (currentQ >= quizData.length) {
      showResults();
      return;
    }

    answered = false;
    const item = quizData[currentQ];

    if (counterDisp) counterDisp.textContent = `QUESTION ${currentQ + 1} OF ${quizData.length}`;
    if (qBody) qBody.textContent = item.q;
    if (expBox) expBox.classList.remove('show');
    if (nextBtn) nextBtn.style.display = 'none';

    if (optContainer) {
      optContainer.innerHTML = item.options.map((opt, i) => `
        <button class="quiz-option-btn" data-opt-idx="${i}">
          <span style="width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">
            ${String.fromCharCode(65 + i)}
          </span>
          <span>${opt}</span>
        </button>
      `).join('');

      optContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'));
          const isCorrect = selectedIdx === item.ans;

          if (isCorrect) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            const correctBtn = optContainer.querySelector(`[data-opt-idx="${item.ans}"]`);
            if (correctBtn) correctBtn.classList.add('correct');
          }

          if (expText) expText.textContent = item.exp;
          if (expBox) expBox.classList.add('show');
          if (nextBtn) nextBtn.style.display = 'inline-flex';

          if (liveScoreDisp) liveScoreDisp.textContent = score;
          if (liveAttemptedDisp) liveAttemptedDisp.textContent = currentQ + 1;

          AppState.quizScore = score;
          AppState.quizAttempted = currentQ + 1;
          saveAppState();
          trackSectionVisit('quiz-section');
        });
      });
    }
  }

  function showResults() {
    if (card) card.style.display = 'none';
    if (resultCard) resultCard.style.display = 'block';

    const finalCorrect = document.getElementById('final-correct-score');
    const finalWrong = document.getElementById('final-wrong-score');
    const finalPct = document.getElementById('final-percentage-score');
    const badge = document.getElementById('final-performance-badge');

    const pct = Math.round((score / quizData.length) * 100);
    if (finalCorrect) finalCorrect.textContent = score;
    if (finalWrong) finalWrong.textContent = quizData.length - score;
    if (finalPct) finalPct.textContent = `${pct}%`;

    if (badge) {
      if (pct >= 85) {
        badge.textContent = '🌟 MDCAT Physics Topper! Exceptional Readiness';
        badge.style.background = '#ecfdf5';
        badge.style.color = '#065f46';
      } else if (pct >= 65) {
        badge.textContent = '👍 Great Effort! Revise Inductor & Resonance formulas';
        badge.style.background = '#e0f2fe';
        badge.style.color = '#0369a1';
      } else {
        badge.textContent = '📚 Review High-Yield Cards and re-take the quiz!';
        badge.style.background = '#fff1f2';
        badge.style.color = '#9f1239';
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQ++;
      renderQuestion();
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      currentQ = 0;
      score = 0;
      if (card) card.style.display = 'block';
      if (resultCard) resultCard.style.display = 'none';
      if (liveScoreDisp) liveScoreDisp.textContent = '0';
      if (liveAttemptedDisp) liveAttemptedDisp.textContent = '0';
      renderQuestion();
    });
  }

  renderQuestion();
}

/* ==========================================================================
   MODULE 15: 7 MULTI-PARAMETER PHYSICS CALCULATORS
   ========================================================================== */
function initCalculators() {
  // 1. Time Period from f
  const c1_f = document.getElementById('calc1-f');
  const c1_sub = document.getElementById('calc1-sub');
  const c1_res = document.getElementById('calc1-res');
  function calc1() {
    const f = Math.max(0.001, parseFloat(c1_f?.value || 50));
    const T = 1 / f;
    if (c1_sub) c1_sub.textContent = `Substitution: T = 1 / ${f} Hz`;
    if (c1_res) c1_res.textContent = `${T.toFixed(4)} s (${(T * 1000).toFixed(1)} ms)`;
    AppState.calculationsDone.add('calc1');
  }
  c1_f?.addEventListener('input', calc1);

  // 2. Angular Frequency ω
  const c2_f = document.getElementById('calc2-f');
  const c2_sub = document.getElementById('calc2-sub');
  const c2_res = document.getElementById('calc2-res');
  function calc2() {
    const f = Math.max(0.001, parseFloat(c2_f?.value || 50));
    const w = 2 * Math.PI * f;
    if (c2_sub) c2_sub.textContent = `Substitution: ω = 2 × π × ${f}`;
    if (c2_res) c2_res.textContent = `${w.toFixed(2)} rad/s`;
    AppState.calculationsDone.add('calc2');
  }
  c2_f?.addEventListener('input', calc2);

  // 3. RMS from Peak
  const c3_v0 = document.getElementById('calc3-v0');
  const c3_sub = document.getElementById('calc3-sub');
  const c3_res = document.getElementById('calc3-res');
  function calc3() {
    const v0 = Math.max(0, parseFloat(c3_v0?.value || 311.1));
    const vrms = v0 / Math.SQRT2;
    if (c3_sub) c3_sub.textContent = `Substitution: ${v0} / 1.4142`;
    if (c3_res) c3_res.textContent = `${vrms.toFixed(2)} V RMS`;
    AppState.calculationsDone.add('calc3');
  }
  c3_v0?.addEventListener('input', calc3);

  // 4. XL
  const c4_f = document.getElementById('calc4-f');
  const c4_l = document.getElementById('calc4-l');
  const c4_sub = document.getElementById('calc4-sub');
  const c4_res = document.getElementById('calc4-res');
  function calc4() {
    const f = Math.max(0.001, parseFloat(c4_f?.value || 50));
    const l = Math.max(0.0001, parseFloat(c4_l?.value || 0.2));
    const xl = 2 * Math.PI * f * l;
    if (c4_sub) c4_sub.textContent = `X_L = 2 × π × ${f} × ${l}`;
    if (c4_res) c4_res.textContent = `${xl.toFixed(2)} Ω`;
    AppState.calculationsDone.add('calc4');
  }
  c4_f?.addEventListener('input', calc4);
  c4_l?.addEventListener('input', calc4);

  // 5. XC
  const c5_f = document.getElementById('calc5-f');
  const c5_c = document.getElementById('calc5-c');
  const c5_sub = document.getElementById('calc5-sub');
  const c5_res = document.getElementById('calc5-res');
  function calc5() {
    const f = Math.max(0.001, parseFloat(c5_f?.value || 50));
    const c = Math.max(0.001, parseFloat(c5_c?.value || 50)) * 1e-6;
    const xc = 1 / (2 * Math.PI * f * c);
    if (c5_sub) c5_sub.textContent = `X_C = 1 / (2π × ${f} × ${(c * 1e6).toFixed(0)}µF)`;
    if (c5_res) c5_res.textContent = `${xc.toFixed(2)} Ω`;
    AppState.calculationsDone.add('calc5');
  }
  c5_f?.addEventListener('input', calc5);
  c5_c?.addEventListener('input', calc5);

  // 6. Resonant Frequency f0
  const c6_l = document.getElementById('calc6-l');
  const c6_c = document.getElementById('calc6-c');
  const c6_sub = document.getElementById('calc6-sub');
  const c6_res = document.getElementById('calc6-res');
  function calc6() {
    const l = Math.max(0.0001, parseFloat(c6_l?.value || 0.2));
    const c = Math.max(0.001, parseFloat(c6_c?.value || 50)) * 1e-6;
    const f0 = 1 / (2 * Math.PI * Math.sqrt(l * c));
    if (c6_sub) c6_sub.textContent = `f₀ = 1 / (2π√(${l} × ${(c * 1e6).toFixed(0)}µF))`;
    if (c6_res) c6_res.textContent = `${f0.toFixed(2)} Hz`;
    AppState.calculationsDone.add('calc6');
  }
  c6_l?.addEventListener('input', calc6);
  c6_c?.addEventListener('input', calc6);

  // 7. Transformer
  const c7_vp = document.getElementById('calc7-vp');
  const c7_np = document.getElementById('calc7-np');
  const c7_ns = document.getElementById('calc7-ns');
  const c7_sub = document.getElementById('calc7-sub');
  const c7_res = document.getElementById('calc7-res');
  function calc7() {
    const vp = Math.max(1, parseFloat(c7_vp?.value || 220));
    const np = Math.max(1, parseFloat(c7_np?.value || 100));
    const ns = Math.max(1, parseFloat(c7_ns?.value || 400));
    const vs = vp * (ns / np);
    const type = ns > np ? 'Step-Up' : ns < np ? 'Step-Down' : '1:1';
    if (c7_sub) c7_sub.textContent = `V_s = ${vp} × (${ns} / ${np}) = ${(ns / np).toFixed(2)}× V_p`;
    if (c7_res) c7_res.textContent = `${vs.toFixed(1)} V (${type})`;
    AppState.calculationsDone.add('calc7');
  }
  c7_vp?.addEventListener('input', calc7);
  c7_np?.addEventListener('input', calc7);
  c7_ns?.addEventListener('input', calc7);

  // Run all initially
  calc1(); calc2(); calc3(); calc4(); calc5(); calc6(); calc7();
}

/* ==========================================================================
   SEARCH ENGINE
   ========================================================================== */
function initSearch() {
  const input = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  const searchIndex = [
    { title: 'AC Waveform & Peak Value', cat: 'Fundamentals', anchor: '#oscilloscope-lab', desc: 'Sinusoidal equation i = I₀ sin(ωt), instantaneous values' },
    { title: 'Root Mean Square (RMS) Value', cat: 'RMS', anchor: '#rms-section', desc: 'Effective value, heating effect equivalent, I_rms = I₀ / √2' },
    { title: 'AC vs DC Comparison', cat: 'Fundamentals', anchor: '#ac-vs-dc', desc: 'Unidirectional vs alternating electron drift and transformers' },
    { title: 'Pure Inductor & Reactance (X_L)', cat: 'Components', anchor: '#components-lab', desc: 'Current lags voltage by 90°, X_L = 2πfL' },
    { title: 'Pure Capacitor & Reactance (X_C)', cat: 'Components', anchor: '#components-lab', desc: 'Current leads voltage by 90°, X_C = 1/(2πfC)' },
    { title: 'Series RLC Circuit & Impedance', cat: 'Circuits', anchor: '#rlc-lab', desc: 'Impedance triangle Z = √[R² + (X_L - X_C)²]' },
    { title: 'Series Electrical Resonance', cat: 'Resonance', anchor: '#resonance-lab', desc: 'X_L = X_C, Z = R, maximum current, f₀ = 1/(2π√LC)' },
    { title: 'AC Generator (Alternator)', cat: 'Induction', anchor: '#generator-lab', desc: 'Mechanical to electrical energy, E = NABω sin(ωt)' },
    { title: 'Power Transformers & Turns Ratio', cat: 'Mutual Induction', anchor: '#transformer-lab', desc: 'Step-up and step-down, Vs/Vp = Ns/Np' },
    { title: 'AC Formula Wall', cat: 'Formulary', anchor: '#formula-wall', desc: 'Complete master reference of 12+ AC equations' },
    { title: '30+ High-Yield Concept Cards', cat: 'Revision', anchor: '#high-yield-notes', desc: 'Syllabus-aligned rapid revision cards' },
    { title: 'MDCAT Flashcards (25+ Cards)', cat: 'Practice', anchor: '#flashcards-section', desc: 'Active recall flip cards' },
    { title: '25+ MDCAT MCQs Test', cat: 'Assessment', anchor: '#quiz-section', desc: 'Past-pattern multiple choice exam questions' },
    { title: 'AC Numerical Calculators', cat: 'Tools', anchor: '#calculators-section', desc: 'Reactance, resonance, and transformer solvers' }
  ];

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length === 0) {
      dropdown.classList.remove('show');
      return;
    }

    const matches = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.cat.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );

    if (matches.length > 0) {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-result-item" data-target="${m.anchor}">
          <div class="item-category">${m.cat}</div>
          <div class="item-title">${m.title}</div>
          <div class="item-snippet">${m.desc}</div>
        </div>
      `).join('');

      dropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const target = item.getAttribute('data-target');
          const elem = document.querySelector(target);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            dropdown.classList.remove('show');
            input.value = '';
          }
        });
      });
      dropdown.classList.add('show');
    } else {
      dropdown.innerHTML = `<div style="padding: 1rem; font-size: 0.8125rem; color: var(--text-muted); text-align: center;">No matching concepts found for "${q}".</div>`;
      dropdown.classList.add('show');
    }
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

/* ==========================================================================
   SAVED BOOKMARKS DRAWER
   ========================================================================== */
function initBookmarks() {
  const openBtn = document.getElementById('open-bookmarks-btn');
  const closeBtn = document.getElementById('close-bookmarks-btn');
  const drawer = document.getElementById('bookmarks-drawer');
  const backdrop = document.getElementById('bookmarks-backdrop');
  const list = document.getElementById('bookmarks-list-container');
  const countBadge = document.getElementById('saved-bookmarks-count');

  function updateCount() {
    if (countBadge) countBadge.textContent = AppState.bookmarkedConcepts.size;
  }

  function renderList() {
    if (!list) return;
    if (AppState.bookmarkedConcepts.size === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.875rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔖</div>
          No saved concepts yet.<br>Click the bookmark icon on any concept card or lab module to save it here!
        </div>
      `;
      return;
    }

    list.innerHTML = Array.from(AppState.bookmarkedConcepts).map(id => {
      const card = document.getElementById(`card-${id}`);
      const title = card ? card.querySelector('.concept-card-title')?.textContent : id;
      const body = card ? card.querySelector('.concept-card-body')?.textContent : '';

      return `
        <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: 0.5rem; padding: 0.875rem; margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
            <strong style="font-size: 0.875rem; color: var(--primary-navy);">${title}</strong>
            <button class="remove-bookmark-btn" data-id="${id}" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.8125rem;">✕</button>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.5;">${body}</p>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        AppState.bookmarkedConcepts.delete(id);
        saveAppState();
        updateCount();
        renderList();
        const cardBtn = document.querySelector(`[data-concept="${id}"]`);
        if (cardBtn) cardBtn.classList.remove('bookmarked');
      });
    });
  }

  function openDrawer() {
    renderList();
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.concept-bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-concept');
      if (AppState.bookmarkedConcepts.has(id)) {
        AppState.bookmarkedConcepts.delete(id);
        btn.classList.remove('bookmarked');
      } else {
        AppState.bookmarkedConcepts.add(id);
        btn.classList.add('bookmarked');
      }
      saveAppState();
      updateCount();
    });
  });

  updateCount();
}

/* ==========================================================================
   PROGRESS TRACKER & CHAPTER COMPLETION MODAL
   ========================================================================== */
function initProgressAndCompletion() {
  const completeBtn = document.getElementById('complete-chapter-btn');
  const modal = document.getElementById('completion-modal');
  const closeModalBtn = document.getElementById('close-completion-modal-btn');

  // Track sections when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trackSectionVisit(entry.target.id);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section').forEach(sec => observer.observe(sec));

  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      AppState.chapterCompleted = true;
      saveAppState();
      if (modal) modal.style.display = 'flex';
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
