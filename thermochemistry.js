/**
 * 🧪 MDCAT Thermochemistry Interactive Lab — JavaScript Engine
 * Complete interactive simulation engine, numerical calculators, Hess's Law builder, and 25-Q practice exam.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- STATE STORAGE & PERSISTENCE ---
  const STORAGE_KEY_PREFIX = 'mdcat_thermochem_v2_';

  const appState = {
    theme: localStorage.getItem(`${STORAGE_KEY_PREFIX}theme`) || 'dark',
    completedTopics: JSON.parse(localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_topics`) || '[]'),
    masteredFormulas: JSON.parse(localStorage.getItem(`${STORAGE_KEY_PREFIX}mastered_formulas`) || '[]'),
    masteredTraps: JSON.parse(localStorage.getItem(`${STORAGE_KEY_PREFIX}mastered_traps`) || '[]'),
    quizBestScore: parseInt(localStorage.getItem(`${STORAGE_KEY_PREFIX}quiz_best`) || '0', 10),
    totalTopics: 22,
    totalFormulas: 8,
    totalTraps: 8
  };

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, icon = 'ℹ️') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  // --- THEME SWITCHER ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function updateThemeIcon() {
    const iconEl = themeIcon || document.getElementById('themeIcon');
    if (iconEl) {
      iconEl.textContent = appState.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Set initial theme
  document.documentElement.setAttribute('data-theme', appState.theme);
  updateThemeIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', appState.theme);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}theme`, appState.theme);
      updateThemeIcon();
      showToast(`Switched to ${appState.theme} mode`, '🎨');
    });
  }

  // --- RESET ALL PROGRESS ---
  const btnResetAllProgress = document.getElementById('btnResetAllProgress');
  if (btnResetAllProgress) {
    btnResetAllProgress.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all your completed topics and quiz scores?')) {
        appState.completedTopics = [];
        appState.masteredFormulas = [];
        appState.masteredTraps = [];
        appState.quizBestScore = 0;
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}completed_topics`);
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}mastered_formulas`);
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}mastered_traps`);
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}quiz_best`);
        updateMasteryDashboard();
        updateStudyButtons();
        showToast('Study progress reset to 0%', '🔄');
      }
    });
  }

  // --- MASTERY DASHBOARD UPDATE ---
  function updateMasteryDashboard() {
    const topicsDone = appState.completedTopics.length;
    const formulasDone = appState.masteredFormulas.length;
    const trapsDone = appState.masteredTraps.length;
    const quizScore = appState.quizBestScore;

    const statTopicsDone = document.getElementById('statTopicsDone');
    const statFormulasDone = document.getElementById('statFormulasDone');
    const statTrapsDone = document.getElementById('statTrapsDone');
    const statQuizBest = document.getElementById('statQuizBest');

    if (statTopicsDone) statTopicsDone.textContent = `${topicsDone} / ${appState.totalTopics}`;
    if (statFormulasDone) statFormulasDone.textContent = `${formulasDone} / ${appState.totalFormulas}`;
    if (statTrapsDone) statTrapsDone.textContent = `${trapsDone} / ${appState.totalTraps}`;
    if (statQuizBest) statQuizBest.textContent = `${quizScore} / 25`;

    const topicsPct = Math.round((topicsDone / appState.totalTopics) * 100);
    const formulasPct = Math.round((formulasDone / appState.totalFormulas) * 100);
    const trapsPct = Math.round((trapsDone / appState.totalTraps) * 100);
    const quizPct = Math.round((quizScore / 25) * 100);

    const txtTopicsPct = document.getElementById('txtTopicsPct');
    const txtFormulasPct = document.getElementById('txtFormulasPct');
    const txtTrapsPct = document.getElementById('txtTrapsPct');
    const txtQuizPct = document.getElementById('txtQuizPct');

    if (txtTopicsPct) txtTopicsPct.textContent = `${topicsPct}%`;
    if (txtFormulasPct) txtFormulasPct.textContent = `${formulasPct}%`;
    if (txtTrapsPct) txtTrapsPct.textContent = `${trapsPct}%`;
    if (txtQuizPct) txtQuizPct.textContent = `${quizPct}%`;

    // Update SVG rings (circumference = 2 * PI * 18 ≈ 113.1)
    const setRing = (id, pct) => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 113.1 - (113.1 * (pct / 100));
        el.style.strokeDashoffset = offset;
      }
    };

    setRing('ringTopics', topicsPct);
    setRing('ringFormulas', formulasPct);
    setRing('ringTraps', trapsPct);
    setRing('ringQuiz', quizPct);

    // Overall Combined Mastery
    const overallPct = Math.round((topicsPct * 0.4) + (formulasPct * 0.2) + (trapsPct * 0.2) + (quizPct * 0.2));
    const navMasteryFill = document.getElementById('navMasteryFill');
    const navMasteryPct = document.getElementById('navMasteryPct');

    if (navMasteryFill) navMasteryFill.style.width = `${overallPct}%`;
    if (navMasteryPct) navMasteryPct.textContent = `${overallPct}%`;
  }

  // --- STUDY ACTION BUTTONS (Mark Completed) ---
  function updateStudyButtons() {
    const studyBtns = document.querySelectorAll('.study-action-btn');
    studyBtns.forEach(btn => {
      const topic = btn.getAttribute('data-topic');
      if (appState.completedTopics.includes(topic)) {
        btn.classList.add('completed');
        btn.innerHTML = '<span>✓</span> Completed';
      } else {
        btn.classList.remove('completed');
        btn.innerHTML = '<span>✓</span> Mark Completed';
      }
    });
  }

  document.querySelectorAll('.study-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      if (!topic) return;

      if (appState.completedTopics.includes(topic)) {
        appState.completedTopics = appState.completedTopics.filter(t => t !== topic);
        showToast('Topic unmarked', '↩️');
      } else {
        appState.completedTopics.push(topic);
        showToast('Topic marked completed! Great job!', '🎉');
      }
      localStorage.setItem(`${STORAGE_KEY_PREFIX}completed_topics`, JSON.stringify(appState.completedTopics));
      updateMasteryDashboard();
      updateStudyButtons();
    });
  });

  updateMasteryDashboard();
  updateStudyButtons();

  // --- GLOBAL SEARCH ENGINE ---
  const globalSearchInput = document.getElementById('globalSearchInput');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query || query.length < 2) return;

      const sections = document.querySelectorAll('.section');
      for (const sec of sections) {
        if (sec.innerText.toLowerCase().includes(query)) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          sec.style.outline = '2px solid var(--accent-cyan)';
          setTimeout(() => {
            sec.style.outline = 'none';
          }, 1500);
          break;
        }
      }
    });
  }

  // --- TOPIC SCROLLSPY ---
  const topicPills = document.querySelectorAll('.topic-pill');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    const sections = document.querySelectorAll('.section, .hero-section');
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        topicPills.forEach(pill => {
          if (pill.getAttribute('href') === `#${id}`) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
      }
    });
  });

  // Helper for sizing Canvas to parent
  function fitCanvas(canvas) {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // =========================================================================
  // 1. HERO REACTION CHAMBER CANVAS SIMULATOR
  // =========================================================================
  const heroCanvas = document.getElementById('heroReactionCanvas');
  const heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;
  let heroMode = 'exo'; // 'exo' or 'endo'
  let heroPaused = false;
  let heroParticles = [];

  function initHeroParticles() {
    heroParticles = [];
    const count = 35;
    const w = heroCanvas ? heroCanvas.width : 400;
    const h = heroCanvas ? heroCanvas.height : 240;
    for (let i = 0; i < count; i++) {
      heroParticles.push({
        x: Math.random() * (w * 0.4) + w * 0.3,
        y: Math.random() * (h * 0.5) + h * 0.25,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 3 + 3,
        heatEnergy: Math.random() * 100
      });
    }
  }

  function drawHeroChamber() {
    if (!heroCtx || !heroCanvas) return;
    const w = heroCanvas.width;
    const h = heroCanvas.height;
    heroCtx.clearRect(0, 0, w, h);

    const isExo = heroMode === 'exo';
    const centerX = w / 2;
    const centerY = h / 2;

    // Draw Reaction Vessel in Center
    heroCtx.save();
    heroCtx.beginPath();
    heroCtx.arc(centerX, centerY, 56, 0, Math.PI * 2);
    heroCtx.fillStyle = isExo ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.15)';
    heroCtx.fill();
    heroCtx.lineWidth = 2.5;
    heroCtx.strokeStyle = isExo ? '#ef4444' : '#0ea5e9';
    heroCtx.stroke();

    // Center Vessel Label
    heroCtx.fillStyle = '#ffffff';
    heroCtx.font = 'bold 13px Inter, sans-serif';
    heroCtx.textAlign = 'center';
    heroCtx.textBaseline = 'middle';
    heroCtx.fillText(isExo ? '🔥 SYSTEM' : '❄️ SYSTEM', centerX, centerY - 8);
    heroCtx.font = '10px JetBrains Mono, monospace';
    heroCtx.fillStyle = isExo ? '#fca5a5' : '#7dd3fc';
    heroCtx.fillText(isExo ? 'ΔH is Negative (−)' : 'ΔH is Positive (+)', centerX, centerY + 12);
    heroCtx.restore();

    // Update & Draw Particles
    heroParticles.forEach(p => {
      if (!heroPaused) {
        if (isExo) {
          // Heat particles radiate outwards to surroundings
          const angle = Math.atan2(p.y - centerY, p.x - centerX);
          p.x += Math.cos(angle) * 1.8;
          p.y += Math.sin(angle) * 1.8;
          if (p.x < 10 || p.x > w - 10 || p.y < 10 || p.y > h - 10) {
            p.x = centerX + (Math.random() - 0.5) * 40;
            p.y = centerY + (Math.random() - 0.5) * 40;
          }
        } else {
          // Heat particles flow inward from surroundings into system
          const angle = Math.atan2(centerY - p.y, centerX - p.x);
          p.x += Math.cos(angle) * 1.5;
          p.y += Math.sin(angle) * 1.5;
          const dist = Math.hypot(p.x - centerX, p.y - centerY);
          if (dist < 15) {
            p.x = Math.random() < 0.5 ? 15 : w - 15;
            p.y = Math.random() * h;
          }
        }
      }

      heroCtx.beginPath();
      heroCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      heroCtx.fillStyle = isExo ? '#f97316' : '#38bdf8';
      heroCtx.fill();
    });

    // Surroundings Label Banner
    heroCtx.fillStyle = isExo ? 'rgba(239, 68, 68, 0.7)' : 'rgba(56, 189, 248, 0.7)';
    heroCtx.font = '11px Inter, sans-serif';
    heroCtx.textAlign = 'left';
    heroCtx.fillText(isExo ? 'SURROUNDINGS (Temperature Rises ↑)' : 'SURROUNDINGS (Temperature Drops ↓)', 15, 25);
  }

  function heroAnimLoop() {
    drawHeroChamber();
    requestAnimationFrame(heroAnimLoop);
  }

  if (heroCanvas) {
    fitCanvas(heroCanvas);
    initHeroParticles();
    heroAnimLoop();
  }

  // Hero Chamber Controls
  const heroBtnExo = document.getElementById('heroBtnExo');
  const heroBtnEndo = document.getElementById('heroBtnEndo');
  const heroBtnPause = document.getElementById('heroBtnPause');
  const heroBtnReset = document.getElementById('heroBtnReset');
  const heroHeatFlowText = document.getElementById('heroHeatFlowText');
  const heroDeltaHText = document.getElementById('heroDeltaHText');
  const heroTempText = document.getElementById('heroTempText');

  if (heroBtnExo && heroBtnEndo) {
    heroBtnExo.addEventListener('click', () => {
      heroMode = 'exo';
      heroBtnExo.classList.add('active');
      heroBtnEndo.classList.remove('active');
      if (heroHeatFlowText) {
        heroHeatFlowText.textContent = 'Leaves System (q < 0)';
        heroHeatFlowText.style.color = 'var(--exo-orange)';
      }
      if (heroDeltaHText) {
        heroDeltaHText.textContent = 'ΔH is Negative (−)';
        heroDeltaHText.style.color = 'var(--exo-orange)';
      }
      if (heroTempText) {
        heroTempText.textContent = 'Rises ↑ (+ΔT)';
        heroTempText.style.color = 'var(--warning)';
      }
    });

    heroBtnEndo.addEventListener('click', () => {
      heroMode = 'endo';
      heroBtnEndo.classList.add('active');
      heroBtnExo.classList.remove('active');
      if (heroHeatFlowText) {
        heroHeatFlowText.textContent = 'Enters System (q > 0)';
        heroHeatFlowText.style.color = 'var(--endo-cyan)';
      }
      if (heroDeltaHText) {
        heroDeltaHText.textContent = 'ΔH is Positive (+)';
        heroDeltaHText.style.color = 'var(--endo-cyan)';
      }
      if (heroTempText) {
        heroTempText.textContent = 'Drops ↓ (−ΔT)';
        heroTempText.style.color = 'var(--accent-cyan)';
      }
    });
  }

  if (heroBtnPause) {
    heroBtnPause.addEventListener('click', () => {
      heroPaused = !heroPaused;
      heroBtnPause.textContent = heroPaused ? '▶' : '⏸';
    });
  }

  if (heroBtnReset) {
    heroBtnReset.addEventListener('click', () => {
      initHeroParticles();
      showToast('Reaction chamber reset', '↻');
    });
  }

  // =========================================================================
  // 2. VIRTUAL CALORIMETER SIMULATOR CANVAS
  // =========================================================================
  const calCanvas = document.getElementById('calorimeterCanvas');
  const calCtx = calCanvas ? calCanvas.getContext('2d') : null;
  let calCurrentTemp = 20.0;
  let calTargetTemp = 27.5;

  function drawCalorimeter() {
    if (!calCtx || !calCanvas) return;
    const w = calCanvas.width;
    const h = calCanvas.height;
    calCtx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2 + 15;

    // Insulated Cup Container
    calCtx.fillStyle = '#1e293b';
    calCtx.strokeStyle = '#475569';
    calCtx.lineWidth = 4;
    calCtx.beginPath();
    calCtx.rect(centerX - 75, centerY - 70, 150, 130);
    calCtx.fill();
    calCtx.stroke();

    // Water Solution inside
    calCtx.fillStyle = 'rgba(14, 165, 233, 0.4)';
    calCtx.beginPath();
    calCtx.rect(centerX - 71, centerY - 25, 142, 82);
    calCtx.fill();

    // Stirrer Rod
    calCtx.strokeStyle = '#94a3b8';
    calCtx.lineWidth = 3;
    calCtx.beginPath();
    calCtx.moveTo(centerX - 35, centerY - 105);
    calCtx.lineTo(centerX - 35, centerY + 45);
    calCtx.lineTo(centerX - 20, centerY + 45);
    calCtx.stroke();

    // Thermometer Outer Tube
    calCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    calCtx.fillRect(centerX + 25, centerY - 105, 12, 150);
    calCtx.strokeStyle = '#64748b';
    calCtx.lineWidth = 1.5;
    calCtx.strokeRect(centerX + 25, centerY - 105, 12, 150);

    // Red Liquid inside Thermometer
    const tempHeight = Math.min(130, Math.max(15, (calCurrentTemp - 10) * 4.5));
    calCtx.fillStyle = '#ef4444';
    calCtx.fillRect(centerX + 27.5, centerY + 42 - tempHeight, 7, tempHeight);

    // Digital Temperature Display Box
    calCtx.fillStyle = '#0f172a';
    calCtx.fillRect(centerX - 65, centerY - 102, 70, 24);
    calCtx.strokeStyle = '#38bdf8';
    calCtx.strokeRect(centerX - 65, centerY - 102, 70, 24);
    calCtx.fillStyle = '#38bdf8';
    calCtx.font = 'bold 11px JetBrains Mono, monospace';
    calCtx.textAlign = 'center';
    calCtx.fillText(`${calCurrentTemp.toFixed(1)} °C`, centerX - 30, centerY - 86);
  }

  function animateCalorimeterThermometer() {
    if (Math.abs(calCurrentTemp - calTargetTemp) > 0.05) {
      calCurrentTemp += (calTargetTemp - calCurrentTemp) * 0.1;
      drawCalorimeter();
      requestAnimationFrame(animateCalorimeterThermometer);
    } else {
      calCurrentTemp = calTargetTemp;
      drawCalorimeter();
    }
  }

  if (calCanvas) {
    fitCanvas(calCanvas);
    drawCalorimeter();
  }

  function updateCalorimeterMath() {
    const m = parseFloat(document.getElementById('calInputMass')?.value) || 100;
    const c = parseFloat(document.getElementById('calInputC')?.value) || 4.184;
    const Ti = parseFloat(document.getElementById('calInputTi')?.value) || 20.0;
    const Tf = parseFloat(document.getElementById('calInputTf')?.value) || 27.5;

    const deltaT = Tf - Ti;
    const qWater = m * c * deltaT;
    const qRxn = -qWater;

    calTargetTemp = Tf;
    animateCalorimeterThermometer();

    const resDeltaT = document.getElementById('calResDeltaT');
    const resQWater = document.getElementById('calResQWater');
    const resQRxn = document.getElementById('calResQRxn');

    if (resDeltaT) resDeltaT.textContent = `${deltaT > 0 ? '+' : ''}${deltaT.toFixed(2)} °C`;
    if (resQWater) resQWater.textContent = `${qWater > 0 ? '+' : ''}${qWater.toFixed(1)} J (${(qWater / 1000).toFixed(2)} kJ)`;
    if (resQRxn) resQRxn.textContent = `${qRxn > 0 ? '+' : ''}${qRxn.toFixed(1)} J (${(qRxn / 1000).toFixed(2)} kJ)`;
  }

  ['calInputMass', 'calInputC', 'calInputTi', 'calInputTf'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCalorimeterMath);
  });

  const btnCalExoPreset = document.getElementById('btnCalExoPreset');
  const btnCalEndoPreset = document.getElementById('btnCalEndoPreset');

  if (btnCalExoPreset) {
    btnCalExoPreset.addEventListener('click', () => {
      document.getElementById('calInputTi').value = '20.0';
      document.getElementById('calInputTf').value = '28.5';
      updateCalorimeterMath();
      showToast('Exothermic test: Temperature rose to 28.5 °C', '🔥');
    });
  }

  if (btnCalEndoPreset) {
    btnCalEndoPreset.addEventListener('click', () => {
      document.getElementById('calInputTi').value = '25.0';
      document.getElementById('calInputTf').value = '17.2';
      updateCalorimeterMath();
      showToast('Endothermic test: Temperature dropped to 17.2 °C', '❄️');
    });
  }

  // =========================================================================
  // 3. DYNAMIC ENERGY PROFILE GRAPH CANVAS
  // =========================================================================
  const epCanvas = document.getElementById('energyProfileCanvas');
  const epCtx = epCanvas ? epCanvas.getContext('2d') : null;
  let epMode = 'exo';
  let epShowCatalyst = false;
  let epParticleProgress = 0;

  function drawEnergyProfile() {
    if (!epCtx || !epCanvas) return;
    const w = epCanvas.width;
    const h = epCanvas.height;
    epCtx.clearRect(0, 0, w, h);

    const isExo = epMode === 'exo';
    const padding = 50;

    const rY = isExo ? h * 0.55 : h * 0.75;
    const pY = isExo ? h * 0.80 : h * 0.45;
    const tsY = isExo ? h * 0.18 : h * 0.15;
    const catTsY = tsY + h * 0.15;

    // Axes
    epCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    epCtx.lineWidth = 2;
    epCtx.beginPath();
    epCtx.moveTo(padding, 20);
    epCtx.lineTo(padding, h - padding);
    epCtx.lineTo(w - 20, h - padding);
    epCtx.stroke();

    epCtx.fillStyle = '#94a3b8';
    epCtx.font = '11px Inter, sans-serif';
    epCtx.fillText('Potential Energy (kJ)', padding + 8, 30);
    epCtx.fillText('Reaction Progress →', w - 140, h - padding + 25);

    // Reactants & Products Levels
    epCtx.lineWidth = 3;
    epCtx.strokeStyle = '#38bdf8';
    epCtx.beginPath();
    epCtx.moveTo(padding + 20, rY);
    epCtx.lineTo(padding + 90, rY);
    epCtx.stroke();
    epCtx.fillStyle = '#38bdf8';
    epCtx.font = 'bold 12px Inter, sans-serif';
    epCtx.fillText('Reactants', padding + 25, rY - 8);

    epCtx.strokeStyle = '#a855f7';
    epCtx.beginPath();
    epCtx.moveTo(w - 110, pY);
    epCtx.lineTo(w - 30, pY);
    epCtx.stroke();
    epCtx.fillStyle = '#a855f7';
    epCtx.fillText('Products', w - 100, pY - 8);

    // Reaction Curve
    const cp1X = padding + (w - padding) * 0.35;
    const cp2X = padding + (w - padding) * 0.65;

    epCtx.beginPath();
    epCtx.moveTo(padding + 90, rY);
    epCtx.bezierCurveTo(cp1X, tsY - 20, cp2X, tsY - 20, w - 110, pY);
    epCtx.strokeStyle = isExo ? '#ef4444' : '#0ea5e9';
    epCtx.lineWidth = 3;
    epCtx.stroke();

    // Catalyzed Curve Overlay
    if (epShowCatalyst) {
      epCtx.save();
      epCtx.beginPath();
      epCtx.setLineDash([6, 6]);
      epCtx.moveTo(padding + 90, rY);
      epCtx.bezierCurveTo(cp1X, catTsY - 15, cp2X, catTsY - 15, w - 110, pY);
      epCtx.strokeStyle = '#06b6d4';
      epCtx.lineWidth = 2.5;
      epCtx.stroke();
      epCtx.restore();

      epCtx.fillStyle = '#06b6d4';
      epCtx.font = 'bold 11px Inter, sans-serif';
      epCtx.fillText('Catalyzed Path (Lower Ea)', w / 2 - 65, catTsY - 8);
    }

    // Animated glowing reaction particle moving along curve
    epParticleProgress += 0.008;
    if (epParticleProgress > 1) epParticleProgress = 0;

    const t = epParticleProgress;
    const startX = padding + 90;
    const startY = rY;
    const endX = w - 110;
    const endY = pY;
    const curTsY = epShowCatalyst ? catTsY - 15 : tsY - 20;

    // Cubic Bezier interpolation
    const bx = Math.pow(1 - t, 3) * startX + 3 * Math.pow(1 - t, 2) * t * cp1X + 3 * (1 - t) * Math.pow(t, 2) * cp2X + Math.pow(t, 3) * endX;
    const by = Math.pow(1 - t, 3) * startY + 3 * Math.pow(1 - t, 2) * t * curTsY + 3 * (1 - t) * Math.pow(t, 2) * curTsY + Math.pow(t, 3) * endY;

    epCtx.beginPath();
    epCtx.arc(bx, by, 6, 0, Math.PI * 2);
    epCtx.fillStyle = '#f59e0b';
    epCtx.fill();
    epCtx.strokeStyle = '#ffffff';
    epCtx.lineWidth = 1.5;
    epCtx.stroke();

    // Delta H Bracket
    const bracketX = w - 60;
    epCtx.strokeStyle = isExo ? '#f97316' : '#0ea5e9';
    epCtx.lineWidth = 2;
    epCtx.beginPath();
    epCtx.moveTo(bracketX, rY);
    epCtx.lineTo(bracketX, pY);
    epCtx.stroke();

    const dhVal = isExo ? '−120 kJ (Exo)' : '+150 kJ (Endo)';
    epCtx.fillStyle = isExo ? '#f97316' : '#0ea5e9';
    epCtx.font = 'bold 11px JetBrains Mono, monospace';
    epCtx.fillText(`ΔH = ${dhVal}`, bracketX - 90, (rY + pY) / 2);
  }

  function epAnimLoop() {
    drawEnergyProfile();
    requestAnimationFrame(epAnimLoop);
  }

  if (epCanvas) {
    fitCanvas(epCanvas);
    epAnimLoop();
  }

  const btnProfileExo = document.getElementById('btnProfileExo');
  const btnProfileEndo = document.getElementById('btnProfileEndo');
  const btnProfileCatToggle = document.getElementById('btnProfileCatToggle');
  const profileHrVal = document.getElementById('profileHrVal');
  const profileHpVal = document.getElementById('profileHpVal');
  const profileDeltaHVal = document.getElementById('profileDeltaHVal');

  if (btnProfileExo && btnProfileEndo) {
    btnProfileExo.addEventListener('click', () => {
      epMode = 'exo';
      btnProfileExo.classList.add('active');
      btnProfileEndo.classList.remove('active');
      if (profileHrVal) profileHrVal.textContent = '200 kJ';
      if (profileHpVal) profileHpVal.textContent = '80 kJ';
      if (profileDeltaHVal) {
        profileDeltaHVal.textContent = '−120 kJ (Exo)';
        profileDeltaHVal.style.color = 'var(--exo-orange)';
      }
    });

    btnProfileEndo.addEventListener('click', () => {
      epMode = 'endo';
      btnProfileEndo.classList.add('active');
      btnProfileExo.classList.remove('active');
      if (profileHrVal) profileHrVal.textContent = '100 kJ';
      if (profileHpVal) profileHpVal.textContent = '250 kJ';
      if (profileDeltaHVal) {
        profileDeltaHVal.textContent = '+150 kJ (Endo)';
        profileDeltaHVal.style.color = 'var(--endo-cyan)';
      }
    });
  }

  if (btnProfileCatToggle) {
    btnProfileCatToggle.addEventListener('click', () => {
      epShowCatalyst = !epShowCatalyst;
      showToast(epShowCatalyst ? 'Catalyst path activated (Lower Ea)!' : 'Catalyst path deactivated', '⚡');
    });
  }

  // =========================================================================
  // 4. ACTIVATION ENERGY PARTICLE BARRIER SIMULATOR
  // =========================================================================
  const aeCanvas = document.getElementById('activationEnergyCanvas');
  const aeCtx = aeCanvas ? aeCanvas.getContext('2d') : null;
  let aeCatalyzed = false;
  let aeTemp = 300;
  let aeParticles = [];
  let aeCrossedCount = 0;

  function initAeParticles() {
    aeParticles = [];
    const count = 30;
    const w = aeCanvas ? aeCanvas.width : 400;
    const h = aeCanvas ? aeCanvas.height : 300;
    for (let i = 0; i < count; i++) {
      aeParticles.push({
        x: Math.random() * (w * 0.3) + 30,
        y: h - 30 - Math.random() * 80,
        vx: (Math.random() * 2 + 1) * (aeTemp / 300),
        vy: (Math.random() - 0.5) * 3,
        size: 4.5,
        energy: Math.random() * 220,
        hasCrossed: false
      });
    }
  }

  function drawActivationEnergySim() {
    if (!aeCtx || !aeCanvas) return;
    const w = aeCanvas.width;
    const h = aeCanvas.height;
    aeCtx.clearRect(0, 0, w, h);

    const barrierX = w * 0.55;
    const barrierHeight = aeCatalyzed ? 75 : 155;
    const barrierTopY = h - 20 - barrierHeight;

    // Landscape hill
    aeCtx.beginPath();
    aeCtx.moveTo(20, h - 20);
    aeCtx.lineTo(barrierX - 50, h - 20);
    aeCtx.quadraticCurveTo(barrierX, barrierTopY - 20, barrierX + 50, h - 45);
    aeCtx.lineTo(w - 20, h - 45);
    aeCtx.lineTo(w - 20, h);
    aeCtx.lineTo(20, h);
    aeCtx.closePath();
    aeCtx.fillStyle = 'rgba(30, 41, 59, 0.75)';
    aeCtx.fill();
    aeCtx.strokeStyle = aeCatalyzed ? '#06b6d4' : '#ef4444';
    aeCtx.lineWidth = 3;
    aeCtx.stroke();

    // Barrier peak label
    aeCtx.fillStyle = aeCatalyzed ? '#06b6d4' : '#ef4444';
    aeCtx.font = 'bold 11px Inter, sans-serif';
    aeCtx.fillText(aeCatalyzed ? 'Catalyzed Barrier (Lower Ea)' : 'Uncatalyzed Ea Barrier', barrierX - 50, barrierTopY - 26);

    // Particles loop
    aeParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 30) { p.x = 30; p.vx = Math.abs(p.vx); }
      if (p.x > w - 30) { p.x = w - 30; p.vx = -Math.abs(p.vx); }
      if (p.y > h - 30) { p.y = h - 30; p.vy = -Math.abs(p.vy); }
      if (p.y < 30) { p.y = 30; p.vy = Math.abs(p.vy); }

      // Barrier collision logic
      if (p.x >= barrierX - 35 && p.x <= barrierX + 35 && !p.hasCrossed) {
        if (p.y > barrierTopY) {
          p.vx = -Math.abs(p.vx);
        } else {
          p.hasCrossed = true;
          aeCrossedCount++;
          const countEl = document.getElementById('simCrossedCount');
          if (countEl) countEl.textContent = aeCrossedCount;
        }
      }

      aeCtx.beginPath();
      aeCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      aeCtx.fillStyle = p.hasCrossed ? '#10b981' : (p.energy > barrierHeight ? '#f59e0b' : '#38bdf8');
      aeCtx.fill();
    });

    aeCtx.fillStyle = '#94a3b8';
    aeCtx.font = '11px Inter, sans-serif';
    aeCtx.fillText('Reactants Well', 40, h - 5);
    aeCtx.fillText('Products Formed', w - 140, h - 5);
  }

  function aeAnimLoop() {
    drawActivationEnergySim();
    requestAnimationFrame(aeAnimLoop);
  }

  if (aeCanvas) {
    fitCanvas(aeCanvas);
    initAeParticles();
    aeAnimLoop();
  }

  const btnSimNoCat = document.getElementById('btnSimNoCat');
  const btnSimWithCat = document.getElementById('btnSimWithCat');
  const simTempSlider = document.getElementById('simTempSlider');
  const simTempVal = document.getElementById('simTempVal');
  const btnSimResetParticles = document.getElementById('btnSimResetParticles');

  if (btnSimNoCat && btnSimWithCat) {
    btnSimNoCat.addEventListener('click', () => {
      aeCatalyzed = false;
      btnSimNoCat.classList.add('active');
      btnSimWithCat.classList.remove('active');
      showToast('High uncatalyzed Ea barrier', '⚡');
    });

    btnSimWithCat.addEventListener('click', () => {
      aeCatalyzed = true;
      btnSimWithCat.classList.add('active');
      btnSimNoCat.classList.remove('active');
      showToast('Catalyst added: Ea barrier visibly lowered!', '🎉');
    });
  }

  if (simTempSlider) {
    simTempSlider.addEventListener('input', (e) => {
      aeTemp = parseInt(e.target.value, 10);
      if (simTempVal) simTempVal.textContent = `${aeTemp} K`;
      aeParticles.forEach(p => {
        p.vx = (Math.sign(p.vx) || 1) * (Math.random() * 2 + 1) * (aeTemp / 300);
      });
    });
  }

  if (btnSimResetParticles) {
    btnSimResetParticles.addEventListener('click', () => {
      aeCrossedCount = 0;
      const countEl = document.getElementById('simCrossedCount');
      if (countEl) countEl.textContent = '0';
      initAeParticles();
    });
  }

  // =========================================================================
  // 5. NEUTRALIZATION ION CANVAS
  // =========================================================================
  const neutCanvas = document.getElementById('neutralizationCanvas');
  const neutCtx = neutCanvas ? neutCanvas.getContext('2d') : null;
  let neutIons = [];

  function initNeutIons() {
    neutIons = [];
    const w = neutCanvas ? neutCanvas.width : 400;
    const h = neutCanvas ? neutCanvas.height : 210;
    for (let i = 0; i < 8; i++) {
      neutIons.push({
        type: 'H+',
        x: Math.random() * (w * 0.4) + 20,
        y: Math.random() * (h - 40) + 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
      neutIons.push({
        type: 'OH-',
        x: Math.random() * (w * 0.4) + w * 0.5,
        y: Math.random() * (h - 40) + 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }
  }

  function drawNeutralizationSim() {
    if (!neutCtx || !neutCanvas) return;
    const w = neutCanvas.width;
    const h = neutCanvas.height;
    neutCtx.clearRect(0, 0, w, h);

    neutIons.forEach(ion => {
      ion.x += ion.vx;
      ion.y += ion.vy;

      if (ion.x < 20 || ion.x > w - 20) ion.vx *= -1;
      if (ion.y < 20 || ion.y > h - 20) ion.vy *= -1;

      neutCtx.beginPath();
      neutCtx.arc(ion.x, ion.y, 14, 0, Math.PI * 2);
      neutCtx.fillStyle = ion.type === 'H+' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(14, 165, 233, 0.25)';
      neutCtx.fill();
      neutCtx.strokeStyle = ion.type === 'H+' ? '#ef4444' : '#0ea5e9';
      neutCtx.lineWidth = 1.5;
      neutCtx.stroke();

      neutCtx.fillStyle = '#ffffff';
      neutCtx.font = 'bold 10px JetBrains Mono, monospace';
      neutCtx.textAlign = 'center';
      neutCtx.textBaseline = 'middle';
      neutCtx.fillText(ion.type, ion.x, ion.y);
    });
  }

  function neutAnimLoop() {
    drawNeutralizationSim();
    requestAnimationFrame(neutAnimLoop);
  }

  if (neutCanvas) {
    fitCanvas(neutCanvas);
    initNeutIons();
    neutAnimLoop();
  }

  // =========================================================================
  // 6. PARTICLE THERMAL MOTION CANVAS
  // =========================================================================
  const pHeatCanvas = document.getElementById('particleHeatCanvas');
  const pHeatCtx = pHeatCanvas ? pHeatCanvas.getContext('2d') : null;
  let pHeatParticles = [];
  let pHeatSpeed = 3;

  function initPHeatParticles() {
    pHeatParticles = [];
    const w = pHeatCanvas ? pHeatCanvas.width : 400;
    const h = pHeatCanvas ? pHeatCanvas.height : 210;
    for (let i = 0; i < 30; i++) {
      pHeatParticles.push({
        x: Math.random() * (w - 30) + 15,
        y: Math.random() * (h - 30) + 15,
        vx: (Math.random() - 0.5) * pHeatSpeed,
        vy: (Math.random() - 0.5) * pHeatSpeed
      });
    }
  }

  function drawPHeatSim() {
    if (!pHeatCtx || !pHeatCanvas) return;
    const w = pHeatCanvas.width;
    const h = pHeatCanvas.height;
    pHeatCtx.clearRect(0, 0, w, h);

    pHeatParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 15 || p.x > w - 15) p.vx *= -1;
      if (p.y < 15 || p.y > h - 15) p.vy *= -1;

      pHeatCtx.beginPath();
      pHeatCtx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      pHeatCtx.fillStyle = pHeatSpeed > 3 ? '#ef4444' : '#38bdf8';
      pHeatCtx.fill();
    });
  }

  function pHeatAnimLoop() {
    drawPHeatSim();
    requestAnimationFrame(pHeatAnimLoop);
  }

  if (pHeatCanvas) {
    fitCanvas(pHeatCanvas);
    initPHeatParticles();
    pHeatAnimLoop();
  }

  const sliderParticleEnergy = document.getElementById('sliderParticleEnergy');
  const particleSpeedBadge = document.getElementById('particleSpeedBadge');

  if (sliderParticleEnergy) {
    sliderParticleEnergy.addEventListener('input', (e) => {
      pHeatSpeed = parseInt(e.target.value, 10);
      if (particleSpeedBadge) {
        if (pHeatSpeed <= 2) particleSpeedBadge.textContent = 'Low Kinetic Energy (Cold)';
        else if (pHeatSpeed === 3) particleSpeedBadge.textContent = 'Medium Kinetic Energy';
        else particleSpeedBadge.textContent = 'High Kinetic Energy (Hot)';
      }
      pHeatParticles.forEach(p => {
        p.vx = (Math.random() - 0.5) * pHeatSpeed * 1.5;
        p.vy = (Math.random() - 0.5) * pHeatSpeed * 1.5;
      });
    });
  }

  // =========================================================================
  // 7. COMBUSTION SIMULATOR CANVAS
  // =========================================================================
  const combCanvas = document.getElementById('combustionCanvas');
  const combCtx = combCanvas ? combCanvas.getContext('2d') : null;
  let combFlames = [];

  function initCombFlames() {
    combFlames = [];
    const count = 35;
    const w = combCanvas ? combCanvas.width : 400;
    const h = combCanvas ? combCanvas.height : 210;
    for (let i = 0; i < count; i++) {
      combFlames.push({
        x: w / 2 + (Math.random() - 0.5) * 50,
        y: h - 30,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 2 + 2),
        size: Math.random() * 8 + 4,
        life: Math.random() * 40 + 20,
        maxLife: 60
      });
    }
  }

  function drawCombustionSim() {
    if (!combCtx || !combCanvas) return;
    const w = combCanvas.width;
    const h = combCanvas.height;
    combCtx.clearRect(0, 0, w, h);

    combFlames.forEach(f => {
      f.x += f.vx;
      f.y += f.vy;
      f.life--;

      if (f.life <= 0) {
        f.x = w / 2 + (Math.random() - 0.5) * 60;
        f.y = h - 25;
        f.vy = -(Math.random() * 2.5 + 2);
        f.life = Math.random() * 40 + 20;
      }

      combCtx.beginPath();
      combCtx.arc(f.x, f.y, f.size * (f.life / f.maxLife), 0, Math.PI * 2);
      combCtx.fillStyle = f.life > 30 ? 'rgba(249, 115, 22, 0.8)' : 'rgba(239, 68, 68, 0.4)';
      combCtx.fill();
    });

    combCtx.fillStyle = '#ffffff';
    combCtx.font = 'bold 12px Inter, sans-serif';
    combCtx.textAlign = 'center';
    combCtx.fillText('Fuel + Oxygen → CO₂ + H₂O + Heat Energy', w / 2, 25);
  }

  function combAnimLoop() {
    drawCombustionSim();
    requestAnimationFrame(combAnimLoop);
  }

  if (combCanvas) {
    fitCanvas(combCanvas);
    initCombFlames();
    combAnimLoop();
  }

  const btnCombustMethane = document.getElementById('btnCombustMethane');
  const btnCombustEthanol = document.getElementById('btnCombustEthanol');

  if (btnCombustMethane) {
    btnCombustMethane.addEventListener('click', () => {
      showToast('Methane Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O (ΔHc = −890 kJ/mol)', '🔥');
    });
  }

  if (btnCombustEthanol) {
    btnCombustEthanol.addEventListener('click', () => {
      showToast('Ethanol Combustion: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O (ΔHc = −1367 kJ/mol)', '🔥');
    });
  }

  // =========================================================================
  // 8. HESS'S LAW INTERACTIVE BUILDER
  // =========================================================================
  const hessPuzzles = {
    co: {
      targetEqn: 'C(s) + ½O₂(g) → CO(g) &nbsp;&nbsp;&nbsp; ΔH° = ?',
      targetVal: -110.5,
      reactions: [
        {
          id: 1,
          name: 'Combustion of Carbon to CO₂',
          reactants: 'C(s) + O₂(g)',
          products: 'CO₂(g)',
          deltaH: -393.5,
          reversed: false,
          multiplier: 1
        },
        {
          id: 2,
          name: 'Combustion of CO to CO₂',
          reactants: 'CO(g) + ½O₂(g)',
          products: 'CO₂(g)',
          deltaH: -283.0,
          reversed: true, // Needs reverse: CO₂(g) -> CO(g) + 1/2 O2(g) (+283 kJ)
          multiplier: 1
        }
      ]
    },
    so3: {
      targetEqn: 'S(s) + 1.5O₂(g) → SO₃(g) &nbsp;&nbsp;&nbsp; ΔH° = ?',
      targetVal: -395.7,
      reactions: [
        {
          id: 1,
          name: 'Formation of SO₂',
          reactants: 'S(s) + O₂(g)',
          products: 'SO₂(g)',
          deltaH: -296.8,
          reversed: false,
          multiplier: 1
        },
        {
          id: 2,
          name: 'Oxidation of SO₂ to SO₃',
          reactants: 'SO₂(g) + ½O₂(g)',
          products: 'SO₃(g)',
          deltaH: -98.9,
          reversed: false,
          multiplier: 1
        }
      ]
    }
  };

  let currentHessKey = 'co';

  function renderHessBuilder() {
    const puzzle = hessPuzzles[currentHessKey];
    const targetEqnEl = document.getElementById('hessTargetEqn');
    if (targetEqnEl) targetEqnEl.innerHTML = puzzle.targetEqn;

    const grid = document.getElementById('hessCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let totalSum = 0;

    puzzle.reactions.forEach(rxn => {
      const activeDeltaH = (rxn.reversed ? -rxn.deltaH : rxn.deltaH) * rxn.multiplier;
      totalSum += activeDeltaH;

      const r = rxn.reversed ? rxn.products : rxn.reactants;
      const p = rxn.reversed ? rxn.reactants : rxn.products;

      const card = document.createElement('div');
      card.className = `hess-card ${rxn.reversed || rxn.multiplier !== 1 ? 'modified' : ''}`;
      card.innerHTML = `
        <div class="hess-card-top">
          <span style="font-weight:700;">Reaction ${rxn.id}: ${rxn.name}</span>
          <span style="color:var(--accent-cyan); font-weight:800;">ΔH = ${activeDeltaH.toFixed(1)} kJ</span>
        </div>
        <div class="hess-eqn-line">
          ${rxn.multiplier !== 1 ? `${rxn.multiplier} × (` : ''}${r} → ${p}${rxn.multiplier !== 1 ? ')' : ''}
        </div>
        <div class="hess-controls">
          <button class="btn-hess-action btn-reverse" data-id="${rxn.id}">
            🔄 ${rxn.reversed ? 'Un-Reverse' : 'Reverse Reaction'}
          </button>
          <div style="display:flex; gap:0.25rem;">
            <button class="btn-hess-action btn-mult" data-id="${rxn.id}" data-m="0.5">×½</button>
            <button class="btn-hess-action btn-mult" data-id="${rxn.id}" data-m="1">×1</button>
            <button class="btn-hess-action btn-mult" data-id="${rxn.id}" data-m="2">×2</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    const sumEl = document.getElementById('hessCurrentSum');
    const badgeEl = document.getElementById('hessSuccessBadge');

    if (sumEl) sumEl.textContent = `${totalSum.toFixed(1)} kJ/mol`;

    if (badgeEl) {
      if (Math.abs(totalSum - puzzle.targetVal) < 0.2) {
        badgeEl.style.display = 'block';
        badgeEl.innerHTML = `🎉 Correct Solution! Target ΔH = ${puzzle.targetVal} kJ/mol achieved!`;
      } else {
        badgeEl.style.display = 'block';
        badgeEl.style.color = 'var(--warning)';
        badgeEl.innerHTML = `⚙️ Manipulate (Reverse/Scale) reactions to reach Target: ${puzzle.targetVal} kJ/mol`;
      }
    }

    // Attach listeners
    grid.querySelectorAll('.btn-reverse').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const r = puzzle.reactions.find(item => item.id === id);
        if (r) {
          r.reversed = !r.reversed;
          renderHessBuilder();
        }
      });
    });

    grid.querySelectorAll('.btn-mult').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const m = parseFloat(e.target.getAttribute('data-m'));
        const r = puzzle.reactions.find(item => item.id === id);
        if (r) {
          r.multiplier = m;
          renderHessBuilder();
        }
      });
    });
  }

  const btnHessPresetCO = document.getElementById('btnHessPresetCO');
  const btnHessPresetSO3 = document.getElementById('btnHessPresetSO3');
  const btnHessReset = document.getElementById('btnHessReset');

  if (btnHessPresetCO) {
    btnHessPresetCO.addEventListener('click', () => {
      currentHessKey = 'co';
      renderHessBuilder();
    });
  }

  if (btnHessPresetSO3) {
    btnHessPresetSO3.addEventListener('click', () => {
      currentHessKey = 'so3';
      renderHessBuilder();
    });
  }

  if (btnHessReset) {
    btnHessReset.addEventListener('click', () => {
      hessPuzzles[currentHessKey].reactions.forEach(r => {
        r.reversed = false;
        r.multiplier = 1;
      });
      renderHessBuilder();
      showToast('Hess builder reset', '↻');
    });
  }

  renderHessBuilder();

  // =========================================================================
  // 9. BOND ENERGY INTERACTIVE CALCULATOR
  // =========================================================================
  const bondData = {
    h2_cl2: {
      broken: [{ name: '1 × H–H bond', energy: 436 }, { name: '1 × Cl–Cl bond', energy: 242 }],
      formed: [{ name: '2 × H–Cl bonds (2 × 431)', energy: 862 }]
    },
    ch4_o2: {
      broken: [{ name: '4 × C–H bonds (4 × 413)', energy: 1652 }, { name: '2 × O=O bonds (2 × 498)', energy: 996 }],
      formed: [{ name: '2 × C=O bonds (2 × 799)', energy: 1598 }, { name: '4 × O–H bonds (4 × 463)', energy: 1852 }]
    },
    n2_h2: {
      broken: [{ name: '1 × N≡N triple bond', energy: 945 }, { name: '3 × H–H bonds (3 × 436)', energy: 1308 }],
      formed: [{ name: '6 × N–H bonds in NH₃ (6 × 391)', energy: 2346 }]
    }
  };

  function updateBondEnergyDisplay() {
    const sel = document.getElementById('bondSelectReaction');
    const box = document.getElementById('bondCalcBreakdown');
    if (!sel || !box) return;

    const data = bondData[sel.value];
    if (!data) return;

    let sumBroken = data.broken.reduce((acc, item) => acc + item.energy, 0);
    let sumFormed = data.formed.reduce((acc, item) => acc + item.energy, 0);
    let netDeltaH = sumBroken - sumFormed;

    let brokenHtml = data.broken.map(b => `<div>• ${b.name} = +${b.energy} kJ</div>`).join('');
    let formedHtml = data.formed.map(f => `<div>• ${f.name} = −${f.energy} kJ</div>`).join('');

    box.innerHTML = `
      <div style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.25rem;">1. Bonds Broken in Reactants (Energy Absorbed):</div>
      <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">${brokenHtml}<strong>Total Broken = +${sumBroken} kJ</strong></div>

      <div style="font-weight:700; color:var(--exo-orange); margin-bottom:0.25rem;">2. Bonds Formed in Products (Energy Released):</div>
      <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">${formedHtml}<strong>Total Formed = −${sumFormed} kJ</strong></div>

      <div class="calc-step-line" style="margin-top:0.5rem;">
        <span>Enthalpy Change ΔH = Broken − Formed:</span>
        <strong style="color:${netDeltaH < 0 ? 'var(--exo-orange)' : 'var(--endo-cyan)'};">${sumBroken} − ${sumFormed} = ${netDeltaH > 0 ? '+' : ''}${netDeltaH} kJ/mol (${netDeltaH < 0 ? 'Exothermic' : 'Endothermic'})</strong>
      </div>
    `;
  }

  const bondSelectReaction = document.getElementById('bondSelectReaction');
  if (bondSelectReaction) {
    bondSelectReaction.addEventListener('change', updateBondEnergyDisplay);
    updateBondEnergyDisplay();
  }

  // =========================================================================
  // 10. NUMERICAL PROBLEM SOLVERS (TABS)
  // =========================================================================
  document.querySelectorAll('.solver-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.solver-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.solver-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const target = document.getElementById(tabId);
      if (target) target.classList.add('active');
    });
  });

  // Calorimetry Solver
  function solveCalorimetryTab() {
    const m = parseFloat(document.getElementById('numMass')?.value) || 200;
    const c = parseFloat(document.getElementById('numC')?.value) || 4.184;
    const Ti = parseFloat(document.getElementById('numTi')?.value) || 21.0;
    const Tf = parseFloat(document.getElementById('numTf')?.value) || 28.5;
    const moles = parseFloat(document.getElementById('numMoles')?.value) || 0.05;

    const deltaT = Tf - Ti;
    const qSurr = m * c * deltaT;
    const qRxn = -qSurr;
    const molarDeltaH = (qRxn / 1000) / moles;

    const resBox = document.getElementById('numCalResults');
    if (resBox) {
      resBox.innerHTML = `
        <div class="calc-step-line"><span>Step 1: Temperature Change (ΔT)</span><strong>${Tf} − ${Ti} = ${deltaT.toFixed(2)} °C</strong></div>
        <div class="calc-step-line"><span>Step 2: Heat Gained by Water (q)</span><strong>${m} g × ${c} J/g·°C × ${deltaT.toFixed(2)} °C = ${qSurr.toFixed(1)} J (${(qSurr/1000).toFixed(3)} kJ)</strong></div>
        <div class="calc-step-line"><span>Step 3: Heat of Reaction (q_rxn)</span><strong>−${(qSurr/1000).toFixed(3)} kJ (${deltaT > 0 ? 'Exothermic' : 'Endothermic'})</strong></div>
        <div class="calc-step-line"><span>Step 4: Molar Enthalpy Change (ΔH = q / n)</span><strong style="color:var(--exo-orange); font-size:1.1rem;">${molarDeltaH.toFixed(2)} kJ/mol</strong></div>
      `;
    }
  }

  const btnSolveCalorimetry = document.getElementById('btnSolveCalorimetry');
  if (btnSolveCalorimetry) {
    btnSolveCalorimetry.addEventListener('click', solveCalorimetryTab);
    solveCalorimetryTab();
  }

  // Formation Solver
  function solveFormationTab() {
    const sumP = parseFloat(document.getElementById('numSumProducts')?.value) || -393.5;
    const sumR = parseFloat(document.getElementById('numSumReactants')?.value) || -110.5;
    const deltaH = sumP - sumR;

    const resBox = document.getElementById('numFormationResults');
    if (resBox) {
      resBox.innerHTML = `
        <div class="calc-step-line"><span>Formula:</span><strong>ΔH°_rxn = Total ΔHf°(Products) − Total ΔHf°(Reactants)</strong></div>
        <div class="calc-step-line"><span>Substitution:</span><strong>(${sumP}) − (${sumR})</strong></div>
        <div class="calc-step-line"><span>Answer:</span><strong style="color:${deltaH < 0 ? 'var(--exo-orange)' : 'var(--endo-cyan)'}; font-size:1.1rem;">${deltaH > 0 ? '+' : ''}${deltaH.toFixed(2)} kJ/mol (${deltaH < 0 ? 'Exothermic' : 'Endothermic'})</strong></div>
      `;
    }
  }

  const btnSolveFormation = document.getElementById('btnSolveFormation');
  if (btnSolveFormation) {
    btnSolveFormation.addEventListener('click', solveFormationTab);
    solveFormationTab();
  }

  // Bond Energy Solver
  function solveBondsTab() {
    const broken = parseFloat(document.getElementById('numBondsBroken')?.value) || 678;
    const formed = parseFloat(document.getElementById('numBondsFormed')?.value) || 862;
    const deltaH = broken - formed;

    const resBox = document.getElementById('numBondsResults');
    if (resBox) {
      resBox.innerHTML = `
        <div class="calc-step-line"><span>Formula:</span><strong>ΔH = Energy of Bonds Broken − Energy of Bonds Formed</strong></div>
        <div class="calc-step-line"><span>Substitution:</span><strong>${broken} − ${formed}</strong></div>
        <div class="calc-step-line"><span>Answer:</span><strong style="color:${deltaH < 0 ? 'var(--exo-orange)' : 'var(--endo-cyan)'}; font-size:1.1rem;">${deltaH > 0 ? '+' : ''}${deltaH.toFixed(2)} kJ/mol (${deltaH < 0 ? 'Exothermic' : 'Endothermic'})</strong></div>
      `;
    }
  }

  const btnSolveBonds = document.getElementById('btnSolveBonds');
  if (btnSolveBonds) {
    btnSolveBonds.addEventListener('click', solveBondsTab);
    solveBondsTab();
  }

  // =========================================================================
  // 11. AUTHENTIC 25-QUESTION MDCAT PRACTICE QUIZ
  // =========================================================================
  const quizQuestions = [
    {
      q: 'Which of the following processes is ALWAYS exothermic in nature?',
      options: ['Combustion of hydrocarbons', 'Thermal decomposition of CaCO₃', 'Melting of ice', 'Ionization of a gaseous atom'],
      correct: 0,
      exp: 'Combustion reactions always release heat energy to the surroundings, so ΔH is always negative.'
    },
    {
      q: 'When a chemical reaction takes place in a beaker and the thermometer temperature rises, what is the sign of ΔH for the reaction?',
      options: ['Positive (+)', 'Negative (−)', 'Zero (0)', 'Cannot be determined'],
      correct: 1,
      exp: 'The thermometer is part of the surroundings. A temperature rise means the system lost heat to the surroundings, so ΔH(system) is negative.'
    },
    {
      q: 'What is the standard enthalpy of formation (ΔHf°) for oxygen gas, O₂(g), at 298 K and 1 atm?',
      options: ['−498 kJ/mol', '+498 kJ/mol', '0 kJ/mol', '100 kJ/mol'],
      correct: 2,
      exp: 'By definition, the standard enthalpy of formation of any pure element in its standard state is exactly ZERO.'
    },
    {
      q: 'Which of the following is NOT a state function?',
      options: ['Enthalpy (H)', 'Internal Energy (E)', 'Temperature (T)', 'Heat (q)'],
      correct: 3,
      exp: 'Heat (q) and Work (w) are path functions. Their values depend on the specific pathway followed.'
    },
    {
      q: 'What is the value of standard enthalpy of neutralization for a strong acid reacting with a strong base?',
      options: ['−57.3 kJ/mol', '+57.3 kJ/mol', '−13.7 kJ/mol', '0 kJ/mol'],
      correct: 0,
      exp: 'For any strong acid and strong base, the reaction is H+(aq) + OH−(aq) → H₂O(l) with a constant ΔHn° of −57.3 kJ/mol.'
    },
    {
      q: 'Breaking a chemical bond is ALWAYS:',
      options: ['Exothermic', 'Endothermic', 'Thermoneutral', 'Spontaneous at 0 K'],
      correct: 1,
      exp: 'Energy is always required to overcome electrostatic attraction and pull bonded atoms apart. Therefore bond breaking is always endothermic (+ΔH).'
    },
    {
      q: 'How does the addition of a positive catalyst affect the enthalpy change (ΔH) of a reaction?',
      options: ['It increases ΔH', 'It decreases ΔH', 'It has NO effect on ΔH', 'It makes ΔH zero'],
      correct: 2,
      exp: 'A catalyst lowers the activation energy (Ea) for both forward and reverse paths equally, leaving the net enthalpy change ΔH completely unchanged.'
    },
    {
      q: 'According to Hess’s Law, if a chemical reaction is reversed, what happens to the value of ΔH?',
      options: ['It remains unchanged', 'Its sign is reversed (+ becomes −, or − becomes +)', 'It is multiplied by 2', 'It becomes zero'],
      correct: 1,
      exp: 'Reversing a reaction inverts the direction of heat flow, so the sign of ΔH is flipped.'
    },
    {
      q: 'The formula used to calculate heat (q) absorbed by water in a coffee-cup calorimeter is:',
      options: ['q = m × c × ΔT', 'q = P × V', 'q = ΔH / n', 'q = m / c'],
      correct: 0,
      exp: 'q = m × c × ΔT, where m is mass in grams, c is specific heat capacity (4.184 J/g·°C for water), and ΔT is temperature change.'
    },
    {
      q: 'What is the SI unit of specific heat capacity?',
      options: ['J / g', 'J / (g · °C)', 'kJ / mol', 'J / mol'],
      correct: 1,
      exp: 'Specific heat capacity is heat per unit mass per unit temperature, measured in J/(g·°C) or J/(g·K).'
    },
    {
      q: 'In an exothermic reaction, the potential energy of the products is:',
      options: ['Higher than reactants', 'Lower than reactants', 'Equal to reactants', 'Zero'],
      correct: 1,
      exp: 'In exothermic reactions, products are at a lower energy level than reactants, releasing the excess energy as heat.'
    },
    {
      q: 'Which apparatus is used to measure enthalpy of combustion at constant volume?',
      options: ['Coffee-cup calorimeter', 'Bomb calorimeter', 'Burette', 'Manometer'],
      correct: 1,
      exp: 'A bomb calorimeter operates at constant volume (ΔV = 0) with high-pressure oxygen to measure accurate combustion enthalpies.'
    },
    {
      q: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) with ΔH = −92.4 kJ, what is the enthalpy of formation of NH₃(g)?',
      options: ['−92.4 kJ/mol', '−46.2 kJ/mol', '+46.2 kJ/mol', '+92.4 kJ/mol'],
      correct: 1,
      exp: 'Standard enthalpy of formation is defined for ONE mole of compound. Since 2 moles of NH₃ are formed, ΔHf° = −92.4 / 2 = −46.2 kJ/mol.'
    },
    {
      q: 'Why is the enthalpy of neutralization of acetic acid (CH₃COOH) with NaOH slightly less negative (around −55 kJ/mol) than −57.3 kJ/mol?',
      options: ['Acetic acid is strong', 'Some heat is consumed to ionize the weak acetic acid', 'Acetic acid evaporates', 'NaOH does not react completely'],
      correct: 1,
      exp: 'Acetic acid is a weak acid. Part of the neutralization heat is absorbed to break O–H bonds and completely ionize the acid molecules.'
    },
    {
      q: 'When calculating reaction enthalpy from bond energies, the correct formula is:',
      options: ['ΔH = Total Bonds Formed − Total Bonds Broken', 'ΔH = Total Bonds Broken − Total Bonds Formed', 'ΔH = Total Bonds Broken + Total Bonds Formed', 'ΔH = Bonds Broken × Bonds Formed'],
      correct: 1,
      exp: 'Energy is absorbed to break reactant bonds (+) and released when product bonds form (−), so ΔH = Σ(Bonds Broken) − Σ(Bonds Formed).'
    },
    {
      q: 'Which of the following allotropes of carbon has a standard enthalpy of formation (ΔHf°) equal to zero?',
      options: ['Diamond', 'Graphite', 'Buckminsterfullerene (C60)', 'Carbon nanotube'],
      correct: 1,
      exp: 'Graphite is the most thermodynamically stable standard state of carbon at 298 K and 1 atm, so ΔHf°(Graphite) = 0.'
    },
    {
      q: 'If forward activation energy Ea(fwd) = 80 kJ and reverse activation energy Ea(rev) = 140 kJ, the reaction is:',
      options: ['Exothermic with ΔH = −60 kJ', 'Endothermic with ΔH = +60 kJ', 'Exothermic with ΔH = −220 kJ', 'Endothermic with ΔH = +220 kJ'],
      correct: 0,
      exp: 'ΔH = Ea(fwd) − Ea(rev) = 80 − 140 = −60 kJ (Exothermic).'
    },
    {
      q: 'The First Law of Thermodynamics states that energy:',
      options: ['Can be created from nothing', 'Can be destroyed easily', 'Cannot be created or destroyed, only transformed', 'Decreases in all spontaneous changes'],
      correct: 2,
      exp: 'The First Law of Thermodynamics is the Law of Conservation of Energy: total energy of an isolated system remains constant.'
    },
    {
      q: 'In an endothermic reaction energy profile, the transition state (activated complex) has:',
      options: ['The lowest energy', 'The highest energy on the reaction coordinate', 'Energy equal to products', 'Energy equal to reactants'],
      correct: 1,
      exp: 'The transition state is the highest potential energy peak that molecules must reach before transforming into products.'
    },
    {
      q: 'Which property is an EXTENSIVE property?',
      options: ['Specific heat capacity', 'Density', 'Heat capacity (C)', 'Temperature'],
      correct: 2,
      exp: 'Heat capacity (C = m × c) depends on the total mass of the object, making it an extensive property.'
    },
    {
      q: 'If 100 g of water cools from 30 °C to 20 °C, how much heat was released by the water? (c = 4.184 J/g·°C)',
      options: ['418.4 J', '4184 J (4.184 kJ)', '41.84 kJ', '8368 J'],
      correct: 1,
      exp: 'q = m × c × ΔT = 100 g × 4.184 J/g·°C × (20 − 30 °C) = −4184 J = −4.184 kJ released.'
    },
    {
      q: 'In Hess’s Law, if Reaction A has ΔH = −100 kJ and Reaction B has ΔH = +40 kJ, the combined reaction (A + B) has ΔH of:',
      options: ['−140 kJ', '−60 kJ', '+140 kJ', '+60 kJ'],
      correct: 1,
      exp: 'ΔH_total = (−100 kJ) + (+40 kJ) = −60 kJ.'
    },
    {
      q: 'Which of the following is true for an isolated system?',
      options: ['Exchanges both matter and energy', 'Exchanges energy but not matter', 'Exchanges neither matter nor energy', 'Exchanges matter but not energy'],
      correct: 2,
      exp: 'An isolated system (like an ideal thermos flask) cannot exchange either matter or energy with its surroundings.'
    },
    {
      q: 'At constant pressure, heat exchanged (q_p) is equal to:',
      options: ['Change in Volume (ΔV)', 'Enthalpy Change (ΔH)', 'Work done (w)', 'Activation Energy (Ea)'],
      correct: 1,
      exp: 'By definition in thermodynamics, heat absorbed or evolved at constant pressure equals the enthalpy change: q_p = ΔH.'
    },
    {
      q: 'A more negative standard enthalpy of formation (ΔHf°) indicates that the compound is:',
      options: ['More thermodynamically stable', 'Less stable and explosive', 'Highly endothermic', 'A weak electrolyte'],
      correct: 0,
      exp: 'A strongly negative ΔHf° means a large amount of heat was released during formation, placing the compound in a deep, stable potential energy well.'
    }
  ];

  let currentQuizIndex = 0;
  let quizUserAnswers = new Array(quizQuestions.length).fill(null);

  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsList = document.getElementById('quizOptionsList');
  const quizExplanationBox = document.getElementById('quizExplanationBox');
  const quizExplanationText = document.getElementById('quizExplanationText');
  const quizCurrentIndexEl = document.getElementById('quizCurrentIndex');
  const quizTotalQuestionsEl = document.getElementById('quizTotalQuestions');
  const quizScoreBadge = document.getElementById('quizScoreBadge');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const btnQuizNext = document.getElementById('btnQuizNext');
  const btnQuizPrev = document.getElementById('btnQuizPrev');
  const quizQuestionBox = document.getElementById('quizQuestionBox');
  const quizResultsScreen = document.getElementById('quizResultsScreen');

  function renderQuizQuestion() {
    const qData = quizQuestions[currentQuizIndex];
    if (!qData) return;

    if (quizCurrentIndexEl) quizCurrentIndexEl.textContent = currentQuizIndex + 1;
    if (quizTotalQuestionsEl) quizTotalQuestionsEl.textContent = quizQuestions.length;
    if (quizQuestionText) quizQuestionText.textContent = `${currentQuizIndex + 1}. ${qData.q}`;

    const progressPct = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
    if (quizProgressFill) quizProgressFill.style.width = `${progressPct}%`;

    if (btnQuizPrev) {
      btnQuizPrev.style.visibility = currentQuizIndex > 0 ? 'visible' : 'hidden';
    }

    if (btnQuizNext) {
      btnQuizNext.textContent = currentQuizIndex === quizQuestions.length - 1 ? 'Finish Quiz 🏁' : 'Next Question →';
    }

    if (quizOptionsList) {
      quizOptionsList.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const answered = quizUserAnswers[currentQuizIndex] !== null;

      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span style="font-weight:800; color:var(--accent-blue);">${letters[idx]}.</span> <span>${opt}</span>`;

        if (answered) {
          btn.disabled = true;
          if (idx === qData.correct) {
            btn.classList.add('correct');
          } else if (idx === quizUserAnswers[currentQuizIndex]) {
            btn.classList.add('wrong');
          }
        } else {
          btn.addEventListener('click', () => handleQuizOptionClick(idx));
        }

        quizOptionsList.appendChild(btn);
      });
    }

    if (quizExplanationBox && quizExplanationText) {
      if (quizUserAnswers[currentQuizIndex] !== null) {
        quizExplanationBox.style.display = 'block';
        quizExplanationText.textContent = qData.exp;
      } else {
        quizExplanationBox.style.display = 'none';
      }
    }

    updateQuizScoreBadge();
  }

  function handleQuizOptionClick(selectedIndex) {
    quizUserAnswers[currentQuizIndex] = selectedIndex;
    const qData = quizQuestions[currentQuizIndex];

    if (selectedIndex === qData.correct) {
      showToast('Correct answer!', '✅');
    } else {
      showToast('Incorrect answer. Check explanation.', '❌');
    }

    renderQuizQuestion();
  }

  function updateQuizScoreBadge() {
    let score = 0;
    let answeredCount = 0;
    quizUserAnswers.forEach((ans, idx) => {
      if (ans !== null) {
        answeredCount++;
        if (ans === quizQuestions[idx].correct) score++;
      }
    });

    if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${score} / ${answeredCount}`;
  }

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', () => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex++;
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    });
  }

  if (btnQuizPrev) {
    btnQuizPrev.addEventListener('click', () => {
      if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderQuizQuestion();
      }
    });
  }

  function showQuizResults() {
    let score = 0;
    quizUserAnswers.forEach((ans, idx) => {
      if (ans === quizQuestions[idx].correct) score++;
    });

    const pct = Math.round((score / quizQuestions.length) * 100);

    if (score > appState.quizBestScore) {
      appState.quizBestScore = score;
      localStorage.setItem(`${STORAGE_KEY_PREFIX}quiz_best`, score);
      updateMasteryDashboard();
    }

    if (quizQuestionBox) quizQuestionBox.style.display = 'none';
    if (quizResultsScreen) quizResultsScreen.style.display = 'block';

    const scoreEl = document.getElementById('quizFinalScore');
    const pctEl = document.getElementById('quizFinalPct');
    const statusEl = document.getElementById('quizFinalStatus');

    if (scoreEl) scoreEl.textContent = `${score} / 25`;
    if (pctEl) pctEl.textContent = `${pct}%`;

    if (statusEl) {
      if (pct >= 85) {
        statusEl.textContent = '🏆 MDCAT Ready (Master)';
        statusEl.style.color = 'var(--success)';
      } else if (pct >= 60) {
        statusEl.textContent = '⚡ Good Score';
        statusEl.style.color = 'var(--accent-blue)';
      } else {
        statusEl.textContent = '📖 Needs Revision';
        statusEl.style.color = 'var(--warning)';
      }
    }
  }

  const btnRetakeQuiz = document.getElementById('btnRetakeQuiz');
  if (btnRetakeQuiz) {
    btnRetakeQuiz.addEventListener('click', () => {
      currentQuizIndex = 0;
      quizUserAnswers = new Array(quizQuestions.length).fill(null);
      if (quizQuestionBox) quizQuestionBox.style.display = 'block';
      if (quizResultsScreen) quizResultsScreen.style.display = 'none';
      renderQuizQuestion();
      showToast('Quiz restarted', '🔄');
    });
  }

  renderQuizQuestion();

  // Window resize handler for all canvases
  window.addEventListener('resize', () => {
    fitCanvas(heroCanvas);
    fitCanvas(calCanvas);
    fitCanvas(epCanvas);
    fitCanvas(aeCanvas);
    fitCanvas(neutCanvas);
    fitCanvas(pHeatCanvas);
    fitCanvas(combCanvas);
    drawHeroChamber();
    drawCalorimeter();
    drawEnergyProfile();
    drawActivationEnergySim();
    drawNeutralizationSim();
    drawPHeatSim();
    drawCombustionSim();
  });
});
