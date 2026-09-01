/**
 * EduNexa AI - MDCAT Biology Chapter 06: Enzymes
 * Interactive Engine & Kinetics Simulator (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  initWatermarkCanvas();
  initNavigationAndProgress();
  initHeroEnzymeAnimation();
  initLifecycleExplorer();
  initModelsComparator();
  initEnergyProfileGraph();
  initFactorsSimulators();
  initInhibitionSimulator();
  initRevisionAccordion();
  initQuizEngine();
  initChapterCompletion();
});

/* ==========================================================================
   1. Subtle Dynamic Watermark Canvas (Molecules, Hexagons, Enzyme Silhouettes)
   ========================================================================== */
function initWatermarkCanvas() {
  const canvas = document.getElementById('bgWatermarkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Create subtle floating background particles
  const particleCount = Math.min(24, Math.floor(window.innerWidth / 50));
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 12 + Math.random() * 24,
      type: i % 4, // 0: Hexagon, 1: Enzyme Cleft, 2: Key Substrate, 3: Molecular Ring
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.005,
      alpha: 0.03 + Math.random() * 0.04
    });
  }

  function drawHexagon(x, y, r, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const px = r * Math.cos(a);
      const py = r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawEnzymeSilhouette(x, y, r, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0.25 * Math.PI, 1.75 * Math.PI, false);
    ctx.lineTo(r * 0.3, 0);
    ctx.closePath();
    ctx.strokeStyle = `rgba(5, 150, 105, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawMolecularNode(x, y, r, alpha) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(79, 70, 229, ${alpha * 0.8})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r, y - r * 0.5, r * 0.2, 0, Math.PI * 2);
    ctx.arc(x - r * 0.8, y + r * 0.6, r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.6})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.5})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + r, y - r * 0.5);
    ctx.moveTo(x, y);
    ctx.lineTo(x - r * 0.8, y + r * 0.6);
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;

      if (p.x < -50) p.x = width + 50;
      if (p.x > width + 50) p.x = -50;
      if (p.y < -50) p.y = height + 50;
      if (p.y > height + 50) p.y = -50;

      if (p.type === 0) {
        drawHexagon(p.x, p.y, p.radius, p.angle, p.alpha);
      } else if (p.type === 1) {
        drawEnzymeSilhouette(p.x, p.y, p.radius, p.angle, p.alpha);
      } else if (p.type === 2) {
        drawHexagon(p.x, p.y, p.radius * 0.7, p.angle, p.alpha);
      } else {
        drawMolecularNode(p.x, p.y, p.radius, p.alpha);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Sticky Navigation, Scroll Progress, Section Highlighting
   ========================================================================== */
function initNavigationAndProgress() {
  const header = document.getElementById('mainHeader');
  const progressBar = document.getElementById('scrollProgressBar');
  const navProgressRing = document.getElementById('navProgressRing');
  const navProgressText = document.getElementById('navProgressText');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(100, Math.max(0, Math.round((scrollY / (docHeight || 1)) * 100)));

    // Scroll bar update
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Header elevation shadow
    if (header) {
      if (scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    // Mini circle progress in top bar (combines reading & stored mastery)
    const isCompleted = localStorage.getItem('studymate_enzymes_mastery') === 'true';
    const displayProgress = isCompleted ? 100 : Math.max(progress, parseInt(localStorage.getItem('studymate_quiz_score_pct') || '0', 10));
    if (navProgressRing) navProgressRing.setAttribute('stroke-dasharray', `${displayProgress}, 100`);
    if (navProgressText) navProgressText.textContent = `${displayProgress}%`;
  });

  // IntersectionObserver for active navigation links
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));

  // Explore Simulators scroll button
  const btnScrollLab = document.getElementById('btnInteractiveLabScroll');
  if (btnScrollLab) {
    btnScrollLab.addEventListener('click', () => {
      const factorsSection = document.getElementById('factors');
      if (factorsSection) factorsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Hero Interactive Enzyme Reaction Simulator
   ========================================================================== */
function initHeroEnzymeAnimation() {
  const enzymeBody = document.getElementById('heroEnzymeBody');
  const substrate = document.getElementById('heroSubstrate');
  const products = document.getElementById('heroProducts');
  const sparkle = document.getElementById('heroSparkle');
  const stepText = document.getElementById('heroStepText');
  const btnReplay = document.getElementById('btnPlayHeroSim');
  const btnToggleInduced = document.getElementById('btnToggleInducedHero');
  const fitModeText = document.getElementById('heroFitMode');

  let isInducedFitActive = true;
  let animTimer = null;
  let currentStep = 0;

  function runCycle() {
    if (!enzymeBody || !substrate || !products || !sparkle) return;

    // Clear previous timeouts
    if (animTimer) clearTimeout(animTimer);

    // Step 0: Initial Free State
    currentStep = 0;
    stepText.innerHTML = 'Step: <strong>1. Free Enzyme & Substrate</strong>';
    substrate.style.opacity = '1';
    substrate.style.transform = 'translateY(-65px) scale(1)';
    products.style.opacity = '0';
    products.style.transform = 'translateY(0px) scale(0.5)';
    sparkle.style.opacity = '0';
    enzymeBody.style.transform = 'scale(1)';
    enzymeBody.style.borderRadius = '45% 55% 50% 50% / 50% 45% 55% 50%';

    // Step 1: Substrate Enters Active Site (after 1000ms)
    animTimer = setTimeout(() => {
      currentStep = 1;
      stepText.innerHTML = 'Step: <strong>2. Binding & Active Site Recognition</strong>';
      substrate.style.transform = 'translateY(-20px) scale(1)';

      // Step 2: Induced Fit Conformational Clamping (after 1200ms)
      animTimer = setTimeout(() => {
        currentStep = 2;
        stepText.innerHTML = 'Step: <strong>3. Induced Fit & Transition State ($E_a$ Lowered)</strong>';
        if (isInducedFitActive) {
          enzymeBody.style.transform = 'scale(1.06)';
          enzymeBody.style.borderRadius = '40% 60% 45% 55% / 55% 45% 55% 45%';
        }
        sparkle.style.opacity = '1';

        // Step 3: Catalytic Bond Splitting & Product Formation (after 1400ms)
        animTimer = setTimeout(() => {
          currentStep = 3;
          stepText.innerHTML = 'Step: <strong>4. Catalytic Cleavage & Products Released</strong>';
          sparkle.style.opacity = '0';
          substrate.style.opacity = '0';
          products.style.opacity = '1';
          products.style.transform = 'translateY(-60px) scale(1.1)';
          enzymeBody.style.transform = 'scale(1)';
          enzymeBody.style.borderRadius = '45% 55% 50% 50% / 50% 45% 55% 50%';

          // Loop back after 2500ms
          animTimer = setTimeout(runCycle, 2800);
        }, 1400);
      }, 1200);
    }, 1000);
  }

  runCycle();

  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      runCycle();
    });
  }

  if (btnToggleInduced) {
    btnToggleInduced.addEventListener('click', () => {
      isInducedFitActive = !isInducedFitActive;
      fitModeText.textContent = isInducedFitActive ? 'Active' : 'Rigid (Lock-Key)';
      fitModeText.className = isInducedFitActive ? 'txt-green' : 'txt-amber';
      runCycle();
    });
  }
}

/* ==========================================================================
   4. Section 2: 4-Stage Catalytic Lifecycle Explorer
   ========================================================================== */
function initLifecycleExplorer() {
  const stageBtns = document.querySelectorAll('.stage-btn');
  const stageTitle = document.getElementById('stageTitle');
  const stageText = document.getElementById('stageText');
  const stageTags = document.getElementById('stageTags');
  const stageGraphic = document.getElementById('stageGraphic');

  const stageData = {
    1: {
      title: 'Stage 1: Free Enzyme & Free Substrate',
      text: 'The enzyme active site is open and vacant. Substrates collide randomly with the enzyme in aqueous solution via Brownian kinetic motion.',
      tags: ['Ground State', 'High Activation Barrier', 'Apoenzyme / Holoenzyme'],
      svg: `
        <svg viewBox="0 0 300 160" width="100%" height="100%">
          <rect x="50" y="50" width="90" height="70" rx="16" fill="#10b981" />
          <path d="M 80,50 Q 95,75 110,50 Z" fill="#ffffff" />
          <text x="95" y="100" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Enzyme [E]</text>
          <rect x="200" y="30" width="40" height="25" rx="6" fill="#3b82f6" />
          <text x="220" y="47" fill="white" font-size="9" font-weight="bold" text-anchor="middle">Substrate [S]</text>
          <line x1="190" y1="45" x2="130" y2="55" stroke="#94a3b8" stroke-dasharray="4" stroke-width="2"/>
        </svg>
      `
    },
    2: {
      title: 'Stage 2: Active Site Recognition & Initial Docking',
      text: 'The substrate binds non-covalently into the binding site pocket via weak hydrogen bonds, ionic interactions, and van der Waals forces.',
      tags: ['Recognition Pocket', 'Complementary Shape', 'Stereospecificity'],
      svg: `
        <svg viewBox="0 0 300 160" width="100%" height="100%">
          <rect x="100" y="50" width="100" height="75" rx="16" fill="#10b981" />
          <path d="M 130,50 Q 150,75 170,50 Z" fill="#ffffff" />
          <text x="150" y="105" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Enzyme [E]</text>
          <rect x="132" y="38" width="36" height="24" rx="6" fill="#3b82f6" />
          <text x="150" y="54" fill="white" font-size="9" font-weight="bold" text-anchor="middle">Substrate [S]</text>
        </svg>
      `
    },
    3: {
      title: 'Stage 3: Enzyme-Substrate Complex (Transition State)',
      text: 'Induced fit causes dynamic conformational wrapping. Catalytic residues stretch, strain, and polarize substrate chemical bonds, drastically reducing activation energy ($E_a$).',
      tags: ['[ES] Complex', 'Lowest Ea', 'Transition State Strain'],
      svg: `
        <svg viewBox="0 0 300 160" width="100%" height="100%">
          <rect x="95" y="45" width="110" height="85" rx="22" fill="#059669" />
          <circle cx="150" cy="55" r="28" fill="#fde68a" opacity="0.4"/>
          <rect x="130" y="45" width="40" height="25" rx="8" fill="#d97706" />
          <text x="150" y="62" fill="white" font-size="9" font-weight="bold" text-anchor="middle">Transition [ES]*</text>
          <text x="150" y="110" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Catalytic Conformation</text>
        </svg>
      `
    },
    4: {
      title: 'Stage 4: Product Release & Enzyme Regeneration',
      text: 'Chemical transformation is complete. The resulting products have lower affinity for the active site, detach immediately, and the enzyme returns to its original unperturbed conformation ready for recycling.',
      tags: ['Products [P1 + P2]', 'Enzyme Reused', 'High Turnover Rate'],
      svg: `
        <svg viewBox="0 0 300 160" width="100%" height="100%">
          <rect x="50" y="50" width="90" height="70" rx="16" fill="#10b981" />
          <path d="M 80,50 Q 95,75 110,50 Z" fill="#ffffff" />
          <text x="95" y="100" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Enzyme (Recycled)</text>
          <rect x="180" y="30" width="30" height="20" rx="4" fill="#f59e0b" />
          <text x="195" y="44" fill="white" font-size="8" font-weight="bold" text-anchor="middle">Prod A</text>
          <rect x="230" y="30" width="30" height="20" rx="4" fill="#ec4899" />
          <text x="245" y="44" fill="white" font-size="8" font-weight="bold" text-anchor="middle">Prod B</text>
        </svg>
      `
    }
  };

  function setStage(stageNum) {
    stageBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.stage === String(stageNum));
    });

    const data = stageData[stageNum];
    if (!data) return;

    if (stageTitle) stageTitle.textContent = data.title;
    if (stageText) stageText.textContent = data.text;
    if (stageTags) {
      stageTags.innerHTML = data.tags.map((t) => `<span class="tag">${t}</span>`).join('');
    }
    if (stageGraphic) {
      stageGraphic.innerHTML = data.svg;
    }
  }

  stageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setStage(btn.dataset.stage);
    });
  });

  // Init stage 1
  setStage(1);
}

/* ==========================================================================
   5. Section 3: Lock-and-Key vs. Induced-Fit Comparator
   ========================================================================== */
function initModelsComparator() {
  const btnToggleSide = document.getElementById('btnToggleSideBySide');
  const btnAnimateModels = document.getElementById('btnAnimateModels');
  const rigidSub = document.getElementById('simRigidSubstrate');
  const flexSub = document.getElementById('simFlexibleSubstrate');
  const flexEnz = document.getElementById('simFlexibleEnzyme');
  const flexPocket = document.getElementById('simFlexiblePocket');

  let isFitted = false;

  if (btnAnimateModels) {
    btnAnimateModels.addEventListener('click', () => {
      isFitted = !isFitted;
      if (isFitted) {
        // Lock & Key: slides down rigid
        if (rigidSub) rigidSub.style.transform = 'translate(-30px, 10px)';
        // Induced Fit: morphs active pocket and wraps
        if (flexSub) flexSub.style.transform = 'translate(-35px, 5px) scale(0.95)';
        if (flexEnz) {
          flexEnz.style.borderRadius = '30% 30% 10% 10%';
          flexEnz.style.transform = 'scale(1.08)';
        }
        if (flexPocket) flexPocket.style.height = '36px';
        btnAnimateModels.textContent = 'Reset Model Fitting';
      } else {
        if (rigidSub) rigidSub.style.transform = 'none';
        if (flexSub) flexSub.style.transform = 'none';
        if (flexEnz) {
          flexEnz.style.borderRadius = '20% 20% 10% 10%';
          flexEnz.style.transform = 'scale(1)';
        }
        if (flexPocket) flexPocket.style.height = '30px';
        btnAnimateModels.textContent = 'Trigger Interactive Fitting Test';
      }
    });
  }

  if (btnToggleSide) {
    btnToggleSide.addEventListener('click', () => {
      const grid = document.getElementById('modelsGrid');
      if (grid) {
        grid.style.display = grid.style.display === 'block' ? 'grid' : 'grid';
      }
    });
  }
}

/* ==========================================================================
   6. Section 4: Activation Energy ($E_a$) Energy Profile Diagram
   ========================================================================== */
function initEnergyProfileGraph() {
  const btnToggle = document.getElementById('btnToggleCatalysisGraph');
  const curveUncatalyzed = document.getElementById('curveUncatalyzed');
  const curveCatalyzed = document.getElementById('curveCatalyzed');
  const ptUncat = document.getElementById('pointUncatalyzedTS');
  const ptCat = document.getElementById('pointCatalyzedTS');
  const readout = document.getElementById('energyReadout');

  let showBoth = true;

  if (btnToggle && curveUncatalyzed && curveCatalyzed) {
    btnToggle.addEventListener('click', () => {
      showBoth = !showBoth;
      if (showBoth) {
        curveUncatalyzed.style.opacity = '1';
        curveCatalyzed.style.opacity = '1';
        btnToggle.textContent = 'Focus on Catalyzed Curve';
      } else {
        curveUncatalyzed.style.opacity = '0.2';
        curveCatalyzed.style.opacity = '1';
        btnToggle.textContent = 'Show Both Comparison Curves';
      }
    });
  }

  if (ptUncat && readout) {
    ptUncat.addEventListener('mouseenter', () => {
      readout.innerHTML = '<span class="readout-title">Uncatalyzed Peak:</span> High activation barrier requiring large thermal collisions or long reaction times.';
    });
  }

  if (ptCat && readout) {
    ptCat.addEventListener('mouseenter', () => {
      readout.innerHTML = '<span class="readout-title">Catalyzed Peak:</span> Drastically lowered $E_a$ transition barrier; $\\Delta G$ between Reactants and Products is unchanged.';
    });
  }
}

/* ==========================================================================
   7. Section 5: Factors Affecting Activity (4 Simulators & Live Canvas Charts)
   ========================================================================== */
function initFactorsSimulators() {
  initTemperatureSimulator();
  initPHSimulator();
  initEnzymeConcentrationSimulator();
  initSubstrateConcentrationSimulator();
}

// 7A: Temperature Simulator
function initTemperatureSimulator() {
  const slider = document.getElementById('tempSlider');
  const display = document.getElementById('tempDisplay');
  const badge = document.getElementById('tempStateBadge');
  const canvas = document.getElementById('tempGraphCanvas');
  const miniEnzyme = document.getElementById('tempMiniEnzyme');
  const enzymeLabel = document.getElementById('tempEnzymeLabel');
  if (!slider || !canvas) return;

  const ctx = canvas.getContext('2d');

  function drawTempCurve(currentTemp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 10);
    ctx.lineTo(25, h - 20);
    ctx.lineTo(w - 10, h - 20);
    ctx.stroke();

    // Bell-shaped temperature activity curve
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;

    for (let x = 0; x <= 80; x += 1) {
      let activity = 0;
      if (x <= 37) {
        activity = Math.pow(x / 37, 2.2);
      } else {
        activity = Math.max(0, 1 - Math.pow((x - 37) / 22, 1.8));
      }
      const plotX = 25 + (x / 80) * (w - 40);
      const plotY = (h - 22) - activity * (h - 38);

      if (x === 0) ctx.moveTo(plotX, plotY);
      else ctx.lineTo(plotX, plotY);
    }
    ctx.stroke();

    // Draw active point circle
    let curActivity = 0;
    if (currentTemp <= 37) {
      curActivity = Math.pow(currentTemp / 37, 2.2);
    } else {
      curActivity = Math.max(0, 1 - Math.pow((currentTemp - 37) / 22, 1.8));
    }
    const curX = 25 + (currentTemp / 80) * (w - 40);
    const curY = (h - 22) - curActivity * (h - 38);

    ctx.fillStyle = currentTemp > 45 ? '#ef4444' : '#10b981';
    ctx.beginPath();
    ctx.arc(curX, curY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function update() {
    const temp = parseInt(slider.value, 10);
    display.textContent = `${temp}°C`;

    if (temp < 25) {
      badge.textContent = 'Low Kinetic Activity';
      badge.className = 'state-badge';
      if (miniEnzyme) {
        miniEnzyme.style.background = '#38bdf8';
        miniEnzyme.style.transform = 'scale(0.95)';
        enzymeLabel.textContent = 'Cold / Inactive';
      }
    } else if (temp <= 42) {
      badge.textContent = temp >= 35 && temp <= 39 ? '⭐ Optimum Activity' : 'High Catalytic Rate';
      badge.className = 'state-badge';
      if (miniEnzyme) {
        miniEnzyme.style.background = '#10b981';
        miniEnzyme.style.transform = 'scale(1.05)';
        enzymeLabel.textContent = 'Functional';
      }
    } else {
      badge.textContent = '⚠️ DENATURED (Heat)';
      badge.className = 'state-badge danger';
      if (miniEnzyme) {
        miniEnzyme.style.background = '#ef4444';
        miniEnzyme.style.transform = 'scale(0.85) skew(8deg)';
        enzymeLabel.textContent = 'Denatured!';
      }
    }

    drawTempCurve(temp);
  }

  slider.addEventListener('input', update);
  update();
}

// 7B: pH Simulator
function initPHSimulator() {
  const slider = document.getElementById('phSlider');
  const display = document.getElementById('phDisplay');
  const enzNameSpan = document.getElementById('phEnzymeName');
  const badge = document.getElementById('phStateBadge');
  const canvas = document.getElementById('phGraphCanvas');
  const statusText = document.getElementById('phStatusText');
  const presetBtns = document.querySelectorAll('.btn-preset');
  if (!slider || !canvas) return;

  const ctx = canvas.getContext('2d');
  let targetOptimum = 2.0;

  function drawPHCurve(curPH, optPH) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 10);
    ctx.lineTo(25, h - 20);
    ctx.lineTo(w - 10, h - 20);
    ctx.stroke();

    // Gaussian-like pH curve
    ctx.beginPath();
    ctx.strokeStyle = '#0891b2';
    ctx.lineWidth = 2.5;

    for (let ph = 0; ph <= 14; ph += 0.2) {
      const diff = Math.abs(ph - optPH);
      const activity = Math.max(0, Math.exp(-Math.pow(diff / 1.5, 2)));
      const plotX = 25 + (ph / 14) * (w - 40);
      const plotY = (h - 22) - activity * (h - 38);

      if (ph === 0) ctx.moveTo(plotX, plotY);
      else ctx.lineTo(plotX, plotY);
    }
    ctx.stroke();

    // Active point
    const diff = Math.abs(curPH - optPH);
    const curActivity = Math.max(0, Math.exp(-Math.pow(diff / 1.5, 2)));
    const curX = 25 + (curPH / 14) * (w - 40);
    const curY = (h - 22) - curActivity * (h - 38);

    ctx.fillStyle = diff > 2.0 ? '#ef4444' : '#0891b2';
    ctx.beginPath();
    ctx.arc(curX, curY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function update() {
    const ph = parseFloat(slider.value);
    display.textContent = ph.toFixed(1);

    const diff = Math.abs(ph - targetOptimum);
    if (diff < 0.5) {
      badge.textContent = '⭐ Max Optimum Activity';
      badge.className = 'state-badge';
      statusText.textContent = 'Active Site Residues Correctly Ionized';
    } else if (diff < 1.8) {
      badge.textContent = 'Reduced Velocity';
      badge.className = 'state-badge';
      statusText.textContent = 'Sub-optimal Ionization of Binding Site';
    } else {
      badge.textContent = '⚠️ Denatured / Inactive';
      badge.className = 'state-badge danger';
      statusText.textContent = 'Extreme H+ Disrupts Ionic Folding Bonds';
    }

    drawPHCurve(ph, targetOptimum);
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      targetOptimum = parseFloat(btn.dataset.ph);
      slider.value = targetOptimum;
      enzNameSpan.textContent = btn.dataset.name;
      update();
    });
  });

  slider.addEventListener('input', update);
  update();
}

// 7C: Enzyme Concentration Simulator
function initEnzymeConcentrationSimulator() {
  const slider = document.getElementById('enzConcSlider');
  const display = document.getElementById('enzConcDisplay');
  const grid = document.getElementById('enzCountGrid');
  const canvas = document.getElementById('enzConcGraphCanvas');
  if (!slider || !canvas) return;

  const ctx = canvas.getContext('2d');

  function drawEnzCurve(val) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 10);
    ctx.lineTo(25, h - 20);
    ctx.lineTo(w - 10, h - 20);
    ctx.stroke();

    // Linear curve Rate ∝ [E]
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.moveTo(25, h - 22);
    ctx.lineTo(w - 15, 20);
    ctx.stroke();

    // Active Point
    const curX = 25 + ((val - 10) / 90) * (w - 40);
    const curY = (h - 22) - ((val - 10) / 90) * (h - 42);

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(curX, curY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function update() {
    const val = parseInt(slider.value, 10);
    display.textContent = `${val} μM`;

    // Populate dots in visual grid
    const dotCount = Math.floor(val / 6);
    if (grid) {
      grid.innerHTML = '';
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'enz-dot';
        grid.appendChild(dot);
      }
    }

    drawEnzCurve(val);
  }

  slider.addEventListener('input', update);
  update();
}

// 7D: Substrate Concentration & Saturation Simulator
function initSubstrateConcentrationSimulator() {
  const slider = document.getElementById('subConcSlider');
  const display = document.getElementById('subConcDisplay');
  const badge = document.getElementById('subConcBadge');
  const occText = document.getElementById('occupancyText');
  const occBar = document.getElementById('occupancyBar');
  const canvas = document.getElementById('subConcGraphCanvas');
  if (!slider || !canvas) return;

  const ctx = canvas.getContext('2d');

  function drawSubCurve(subVal) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 10);
    ctx.lineTo(25, h - 20);
    ctx.lineTo(w - 10, h - 20);
    ctx.stroke();

    // Asymptotic Vmax dashed line
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(25, 20);
    ctx.lineTo(w - 10, 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Michaelis-Menten curve: V = (Vmax * [S]) / (Km + [S])
    const Km = 20;
    const Vmax = h - 42;

    ctx.beginPath();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 2.5;

    for (let s = 0; s <= 100; s += 1) {
      const rate = (Vmax * s) / (Km + s);
      const plotX = 25 + (s / 100) * (w - 40);
      const plotY = (h - 22) - rate;

      if (s === 0) ctx.moveTo(plotX, plotY);
      else ctx.lineTo(plotX, plotY);
    }
    ctx.stroke();

    // Active Point
    const curRate = (Vmax * subVal) / (Km + subVal);
    const curX = 25 + (subVal / 100) * (w - 40);
    const curY = (h - 22) - curRate;

    ctx.fillStyle = '#4f46e5';
    ctx.beginPath();
    ctx.arc(curX, curY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function update() {
    const s = parseInt(slider.value, 10);
    display.textContent = `${s} mM`;

    const Km = 20;
    const occupancy = Math.round((s / (Km + s)) * 100);

    if (occText) occText.textContent = `${occupancy}%`;
    if (occBar) occBar.style.width = `${occupancy}%`;

    if (occupancy < 40) {
      badge.textContent = 'Linear 1st-Order Phase';
    } else if (occupancy < 85) {
      badge.textContent = 'Transition to Plateau';
    } else {
      badge.textContent = '⭐ 100% Saturation (Vmax)';
    }

    drawSubCurve(s);
  }

  slider.addEventListener('input', update);
  update();
}

/* ==========================================================================
   8. Section 6: Competitive vs. Non-Competitive Inhibitor Battleground
   ========================================================================== */
function initInhibitionSimulator() {
  const btnComp = document.getElementById('btnModeCompetitive');
  const btnNonComp = document.getElementById('btnModeNonCompetitive');
  const enzyme = document.getElementById('arenaEnzyme');
  const substrate = document.getElementById('arenaSubstrate');
  const inhibitor = document.getElementById('arenaInhibitor');
  const logMsg = document.getElementById('arenaLogMsg');
  const targetSiteText = document.getElementById('targetSiteText');
  const reversibilityText = document.getElementById('reversibilityText');
  const kineticsText = document.getElementById('kineticsEffectText');
  const btnFlood = document.getElementById('btnFloodSubstrate');
  const btnReset = document.getElementById('btnResetInhibitorSim');
  const recoveryFill = document.getElementById('recoveryFill');
  const recoveryPercent = document.getElementById('recoveryPercent');

  let mode = 'competitive'; // or 'non-competitive'

  function setMode(newMode) {
    mode = newMode;
    btnComp.classList.toggle('active', mode === 'competitive');
    btnNonComp.classList.toggle('active', mode === 'non-competitive');

    resetArena();

    if (mode === 'competitive') {
      targetSiteText.textContent = 'Active Site (Direct Structural Competition)';
      reversibilityText.textContent = 'YES (Competitive Surmountable by [S])';
      reversibilityText.className = 'metric-value txt-green';
      kineticsText.textContent = 'Vmax is Unchanged; Apparent Km increases';
      logMsg.textContent = 'Competitive Inhibitor competes for the same Active Site pocket.';

      // Inhibitor docks in active site
      if (inhibitor) inhibitor.style.transform = 'translate(-45px, 35px)';
      if (substrate) substrate.style.transform = 'translate(0, 0)';
      if (enzyme) enzyme.style.borderRadius = '20px';
    } else {
      targetSiteText.textContent = 'Allosteric Site (Site other than Active Site)';
      reversibilityText.textContent = 'NO (Excess substrate cannot reverse distortion)';
      reversibilityText.className = 'metric-value txt-red';
      kineticsText.textContent = 'Vmax Decreases; Km remains unchanged';
      logMsg.textContent = 'Non-Competitive Inhibitor binds allosteric site, altering 3D enzyme shape!';

      // Inhibitor docks in allosteric site
      if (inhibitor) inhibitor.style.transform = 'translate(-40px, 95px)';
      if (substrate) substrate.style.transform = 'translate(0, 0)';
      // Enzyme changes shape / distorts
      if (enzyme) {
        enzyme.style.borderRadius = '35% 15% 45% 20%';
        enzyme.style.transform = 'skew(5deg, 3deg)';
      }
    }
  }

  function resetArena() {
    if (substrate) substrate.style.transform = 'none';
    if (inhibitor) inhibitor.style.transform = 'none';
    if (enzyme) {
      enzyme.style.borderRadius = '20px';
      enzyme.style.transform = 'none';
    }
    if (recoveryFill) recoveryFill.style.width = '50%';
    if (recoveryPercent) recoveryPercent.textContent = '50%';
  }

  if (btnComp) btnComp.addEventListener('click', () => setMode('competitive'));
  if (btnNonComp) btnNonComp.addEventListener('click', () => setMode('non-competitive'));
  if (btnReset) btnReset.addEventListener('click', () => setMode(mode));

  if (btnFlood) {
    btnFlood.addEventListener('click', () => {
      if (mode === 'competitive') {
        // High substrate wins competition!
        if (substrate) substrate.style.transform = 'translate(50px, 35px)';
        if (inhibitor) inhibitor.style.transform = 'translate(40px, -40px)';
        if (recoveryFill) recoveryFill.style.width = '96%';
        if (recoveryPercent) recoveryPercent.textContent = '96% (Vmax Restored!)';
        logMsg.textContent = 'Substrate flooded! 50x Substrate outcompeted inhibitor and occupied Active Sites.';
      } else {
        // High substrate fails against allosteric non-competitive inhibitor!
        if (substrate) substrate.style.transform = 'translate(50px, 15px)';
        if (recoveryFill) recoveryFill.style.width = '20%';
        if (recoveryPercent) recoveryPercent.textContent = '20% (Inhibition Persists)';
        logMsg.textContent = 'Failed to overcome! Active site remains distorted regardless of Substrate concentration.';
      }
    });
  }

  setMode('competitive');
}

/* ==========================================================================
   9. Section 8: Quick Revision Accordion
   ========================================================================== */
function initRevisionAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.parentElement;
      const isOpen = card.classList.contains('open');

      // Close other cards for accordion behavior
      document.querySelectorAll('.accordion-card').forEach((c) => {
        c.classList.remove('open');
        const t = c.querySelector('.accordion-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        card.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   10. Section 9: 10 High-Quality MDCAT MCQs Quiz Engine
   ========================================================================== */
function initQuizEngine() {
  const questions = [
    {
      id: 1,
      topic: 'Nature of Enzymes',
      difficulty: 'Easy',
      statement: 'Which of the following statements correctly defines the fundamental biochemical action of an enzyme?',
      options: [
        'They shift the chemical equilibrium toward product formation.',
        'They lower the activation energy without altering the overall free energy change (ΔG).',
        'They are permanently consumed and incorporated into the final reaction products.',
        'They increase reaction rate by raising the temperature of the cellular medium.'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Core Concept: Enzymes act strictly by lowering the activation energy (Ea) hurdle. They do NOT alter equilibrium (Keq) or standard Gibbs free energy change (ΔG).'
    },
    {
      id: 2,
      topic: 'Structure & Active Site',
      difficulty: 'Medium',
      statement: 'The non-protein organic molecule that is loosely attached to an apoenzyme to make it a catalytically active holoenzyme is termed as a:',
      options: [
        'Prosthetic group',
        'Coenzyme',
        'Activator',
        'Substrate analog'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Concept: A loosely bound organic non-protein cofactor is called a Coenzyme (e.g., NAD+, FAD, CoA, vitamins). Covalently/tightly bound organic groups are Prosthetic Groups, while inorganic ions are Activators.'
    },
    {
      id: 3,
      topic: 'Catalytic Models',
      difficulty: 'Medium',
      statement: 'According to Daniel Koshland’s Induced-Fit Model (1958), what happens when a substrate approaches an enzyme’s active site?',
      options: [
        'The substrate remains unchanged while the active site permanently alters its amino acid sequence.',
        'The substrate induces a slight conformational change in the active site to maximize catalytic alignment.',
        'The active site acts as a completely rigid template matching the key precisely prior to docking.',
        'The enzyme denatures reversibly into two separate polypeptide sub-fragments.'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Concept: The Induced-Fit model proposes flexibility; substrate docking triggers a conformational adjustment in the active site, putting catalytic strain on substrate bonds.'
    },
    {
      id: 4,
      topic: 'Temperature Kinetics',
      difficulty: 'Hard',
      statement: 'What is the primary biochemical reason that human enzymes lose catalytic function when heated above 55°C?',
      options: [
        'Substrate molecules break down into gaseous by-products.',
        'Disruption of peptide bonds holding the primary amino acid sequence together.',
        'Thermal vibration breaks weak hydrogen and ionic bonds stabilizing the tertiary globular structure.',
        'The active site becomes permanently occupied by water molecules.'
      ],
      correctIndex: 2,
      explanation: 'MDCAT Trap: High temperature causes denaturation by disrupting tertiary folding (hydrogen bonds, hydrophobic interactions, ionic bonds). It does NOT break primary covalent peptide bonds!'
    },
    {
      id: 5,
      topic: 'pH Sensitivity',
      difficulty: 'Medium',
      statement: 'Which of the following human digestive enzymes operates with maximum catalytic efficiency in a strongly acidic environment (pH 1.5 – 2.0)?',
      options: [
        'Salivary Amylase',
        'Trypsin',
        'Pepsin',
        'Pancreatic Lipase'
      ],
      correctIndex: 2,
      explanation: 'MDCAT High Yield: Pepsin in the stomach operates at an acidic optimum pH of 1.5 – 2.0, whereas Trypsin operates at an alkaline pH of ~7.8 – 8.5 in the duodenum.'
    },
    {
      id: 6,
      topic: 'Substrate Saturation',
      difficulty: 'Medium',
      statement: 'When enzyme concentration is kept constant and substrate concentration is increased to a very high level, the reaction velocity reaches a plateau (Vmax). Why?',
      options: [
        'Enzyme molecules become completely denatured due to product accumulation.',
        'All available active sites on the enzymes are 100% occupied by substrate (Saturation).',
        'Activation energy rises proportionally with substrate mass.',
        'Competitive inhibitors spontaneously generate from excess substrate.'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Concept: Saturation occurs when every catalytic cleft is actively occupied. At Vmax, adding more substrate produces zero rate increase unless additional enzyme is supplied.'
    },
    {
      id: 7,
      topic: 'Competitive Inhibition',
      difficulty: 'Hard',
      statement: 'How can the inhibitory effect of malonate on succinate dehydrogenase be experimentally overcome in an MDCAT laboratory assay?',
      options: [
        'By boiling the solution to 60°C.',
        'By significantly increasing the concentration of succinate (substrate).',
        'By lowering the pH to 1.0.',
        'By adding a non-competitive allosteric activator.'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Core Point: Malonate is a competitive inhibitor of succinate dehydrogenase. Because it competes directly for the active site, flooding the system with excess substrate (succinate) outcompetes the inhibitor.'
    },
    {
      id: 8,
      topic: 'Non-Competitive Inhibition',
      difficulty: 'Hard',
      statement: 'A poison binds to a regulatory allosteric site on an enzyme (distinct from the active site) and distorts its 3D folding. This is an example of:',
      options: [
        'Competitive inhibition with unchanged Km',
        'Non-competitive inhibition with reduced Vmax',
        'Prosthetic activation',
        'Feedback ribozyme synthesis'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Concept: Non-competitive inhibitors bind to allosteric sites, changing enzyme shape and lowering the maximum velocity (Vmax). This cannot be reversed by adding more substrate.'
    },
    {
      id: 9,
      topic: 'Thermodynamics & Kinetics',
      difficulty: 'Medium',
      statement: 'Enzymes increase the rate of a chemical reaction, but what do they NOT change?',
      options: [
        'The transition state energy',
        'The speed of bond cleavage',
        'The standard free energy change (ΔG) between reactants and products',
        'The activation energy (Ea)'
      ],
      correctIndex: 2,
      explanation: 'MDCAT Golden Rule: Enzymes accelerate kinetics (speed) by lowering Ea, but they are completely powerless to change thermodynamics: ΔG and equilibrium position remain identical.'
    },
    {
      id: 10,
      topic: 'Non-Protein Catalysts',
      difficulty: 'Medium',
      statement: 'Which of the following represents an exception to the general rule that "all enzymes are globular proteins"?',
      options: [
        'Carbonic Anhydrase',
        'Ribozymes (Catalytic RNA)',
        'Cytochrome Oxidase',
        'Succinate Dehydrogenase'
      ],
      correctIndex: 1,
      explanation: 'MDCAT Fact: While most enzymes are proteins, ribozymes (such as peptidyl transferase in 23S rRNA) are catalytic RNA molecules.'
    }
  ];

  let currentQ = 0;
  let score = 0;
  let answered = false;
  let startTime = Date.now();
  let timerInterval = null;

  const currentQNum = document.getElementById('currentQNum');
  const totalQNum = document.getElementById('totalQNum');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizTimerText = document.getElementById('quizTimerText');
  const qTopicBadge = document.getElementById('qTopicBadge');
  const qDiffBadge = document.getElementById('qDiffBadge');
  const qStatement = document.getElementById('qStatement');
  const qOptionsGrid = document.getElementById('qOptionsGrid');
  const qExplanationPanel = document.getElementById('qExplanationPanel');
  const expStatusText = document.getElementById('expStatusText');
  const expIcon = document.getElementById('expIcon');
  const expBody = document.getElementById('expBody');
  const btnNext = document.getElementById('btnNextQuestion');
  const quizQuestionBox = document.getElementById('quizQuestionBox');
  const quizScorecard = document.getElementById('quizScorecard');
  const btnRetry = document.getElementById('btnRetryQuiz');

  if (totalQNum) totalQNum.textContent = String(questions.length);

  function startTimer() {
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const secs = String(elapsedSec % 60).padStart(2, '0');
      if (quizTimerText) quizTimerText.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function renderQuestion(index) {
    answered = false;
    const q = questions[index];
    if (!q) return;

    if (currentQNum) currentQNum.textContent = String(index + 1);
    if (quizProgressFill) {
      const pct = Math.round(((index + 1) / questions.length) * 100);
      quizProgressFill.style.width = `${pct}%`;
    }

    if (qTopicBadge) qTopicBadge.textContent = q.topic;
    if (qDiffBadge) qDiffBadge.textContent = q.difficulty;
    if (qStatement) qStatement.textContent = q.statement;

    if (qExplanationPanel) qExplanationPanel.style.display = 'none';

    if (qOptionsGrid) {
      qOptionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'btn-option';
        optBtn.innerHTML = `
          <span class="opt-letter">${letters[optIdx]}</span>
          <span class="opt-text">${optText}</span>
        `;

        optBtn.addEventListener('click', () => {
          if (answered) return;
          handleAnswer(optIdx, q);
        });

        qOptionsGrid.appendChild(optBtn);
      });
    }
  }

  function handleAnswer(selectedIdx, q) {
    answered = true;
    const allButtons = qOptionsGrid.querySelectorAll('.btn-option');
    allButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('incorrect');
      }
    });

    const isCorrect = selectedIdx === q.correctIndex;
    if (isCorrect) score++;

    if (qExplanationPanel) {
      qExplanationPanel.style.display = 'block';
      if (expStatusText) expStatusText.textContent = isCorrect ? 'Correct Answer! ⭐' : 'Incorrect Choice';
      if (expIcon) {
        expIcon.textContent = isCorrect ? '✓' : '✗';
        expIcon.style.background = isCorrect ? '#10b981' : '#ef4444';
      }
      if (expBody) expBody.textContent = q.explanation;
      if (btnNext) {
        btnNext.textContent = currentQ < questions.length - 1 ? 'Next Question →' : 'View Full Scorecard 🏆';
      }
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentQ < questions.length - 1) {
        currentQ++;
        renderQuestion(currentQ);
      } else {
        finishQuiz();
      }
    });
  }

  function finishQuiz() {
    if (timerInterval) clearInterval(timerInterval);
    if (quizQuestionBox) quizQuestionBox.style.display = 'none';
    if (quizScorecard) quizScorecard.style.display = 'block';

    const pct = Math.round((score / questions.length) * 100);
    localStorage.setItem('studymate_quiz_score_pct', String(pct));

    const statScore = document.getElementById('statScore');
    const statPercent = document.getElementById('statPercent');
    const statCorrect = document.getElementById('statCorrect');
    const statIncorrect = document.getElementById('statIncorrect');
    const headline = document.getElementById('feedbackHeadline');
    const detail = document.getElementById('feedbackDetail');

    if (statScore) statScore.textContent = `${score}/${questions.length}`;
    if (statPercent) statPercent.textContent = `${pct}%`;
    if (statCorrect) statCorrect.textContent = String(score);
    if (statIncorrect) statIncorrect.textContent = String(questions.length - score);

    if (pct >= 80) {
      if (headline) headline.textContent = '🌟 Outstanding MDCAT Mastery!';
      if (detail) detail.textContent = 'You have mastered catalytic mechanisms, thermodynamics, and kinetics at an entrance-exam level.';
    } else if (pct >= 50) {
      if (headline) headline.textContent = '👍 Good Effort - Solid Foundation!';
      if (detail) detail.textContent = 'Review the enzyme factors, inhibition models, and tricky traps to push your score to 100%.';
    } else {
      if (headline) headline.textContent = '📚 Chapter Revision Recommended';
      if (detail) detail.textContent = 'Re-read the interactive sections and study the MDCAT Must-Know vault before retrying.';
    }
  }

  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      currentQ = 0;
      score = 0;
      if (quizQuestionBox) quizQuestionBox.style.display = 'block';
      if (quizScorecard) quizScorecard.style.display = 'none';
      startTimer();
      renderQuestion(0);
    });
  }

  // Initialize Quiz
  startTimer();
  renderQuestion(0);
}

/* ==========================================================================
   11. Section 10: Chapter Completion, LocalStorage & Celebration
   ========================================================================== */
function initChapterCompletion() {
  const btnMarkComplete = document.getElementById('btnMarkChapterComplete');
  const btnCompleteTop = document.getElementById('btnCompleteTop');
  const modal = document.getElementById('completionModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnDismiss = document.getElementById('btnModalDismiss');
  const btnReset = document.getElementById('btnResetProgress');

  function openCelebrationModal() {
    localStorage.setItem('studymate_enzymes_mastery', 'true');
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
    // Trigger celebratory visual elements
    triggerConfetti();
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnMarkComplete) btnMarkComplete.addEventListener('click', openCelebrationModal);
  if (btnCompleteTop) btnCompleteTop.addEventListener('click', openCelebrationModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      localStorage.removeItem('studymate_enzymes_mastery');
      localStorage.removeItem('studymate_quiz_score_pct');
      closeModal();
      window.location.reload();
    });
  }

  // Lightweight festive confetti generator (Pure Vanilla JS)
  function triggerConfetti() {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#7c3aed'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.style.position = 'fixed';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = '-10px';
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${8 + Math.random() * 10}px`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = '2px';
      piece.style.zIndex = '9999';
      piece.style.pointerEvents = 'none';
      piece.style.opacity = '1';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.transition = `top ${1.5 + Math.random() * 2}s cubic-bezier(0.25, 1, 0.5, 1), transform ${2}s linear, opacity 2s ease`;

      document.body.appendChild(piece);

      setTimeout(() => {
        piece.style.top = `${80 + Math.random() * 20}vh`;
        piece.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 80 - 40}px)`;
        piece.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        if (piece.parentElement) piece.parentElement.removeChild(piece);
      }, 3500);
    }
  }
}
