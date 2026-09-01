/**
 * MDCAT BIOLOGY: EVOLUTION MASTERCLASS
 * Script: evolution.js
 * Comprehensive Interactive Learning Engine & Simulation System
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initScrollReveal();
  initStudyMode();
  initHeroFlow();
  initGiraffeComparison();
  initNaturalSelectionSim();
  initFinchesExplorer();
  initIndustrialMelanism();
  initBoneExplorer();
  initPetriDishLab();
  initQuickRevisionAccordion();
  initMdcatQuiz();
  initChapterCompletion();
  updateGlobalProgress();
});

/* ==========================================================================
   1. Reading Progress Bar & Global Tracker
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('readingProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  });
}

function updateGlobalProgress() {
  const isCompleted = localStorage.getItem('mdcat_evolution_completed') === 'true';
  const quizScore = localStorage.getItem('mdcat_evolution_quiz_score');
  
  let progress = 30; // base reading progress
  if (quizScore) progress += 35;
  if (isCompleted) progress = 100;

  const progressFill = document.getElementById('navProgressFill');
  const progressText = document.getElementById('navProgressText');

  if (progressFill && progressText) {
    progressFill.style.width = progress + '%';
    progressText.textContent = progress + '% Complete';
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. Focus Study Mode Toggle
   ========================================================================== */
function initStudyMode() {
  const btnToggle = document.getElementById('btnStudyModeToggle');
  if (!btnToggle) return;

  let isFocus = false;
  btnToggle.addEventListener('click', () => {
    isFocus = !isFocus;
    if (isFocus) {
      document.body.style.backgroundColor = '#fdfdfd';
      btnToggle.innerHTML = 'Normal Mode';
      btnToggle.classList.add('active');
    } else {
      document.body.style.backgroundColor = '';
      btnToggle.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> Focus`;
      btnToggle.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. Hero Section Flow Step Switcher
   ========================================================================== */
function initHeroFlow() {
  const steps = document.querySelectorAll('.flow-step-item');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. Giraffe Evolution Interactive Switcher (Lamarck vs Darwin)
   ========================================================================== */
function initGiraffeComparison() {
  const container = document.getElementById('giraffeFlowContainer');
  const btnLamarck = document.getElementById('btnGiraffeLamarck');
  const btnDarwin = document.getElementById('btnGiraffeDarwin');
  const summaryText = document.getElementById('giraffeSummaryText');

  if (!container || !btnLamarck || !btnDarwin) return;

  const lamarckSteps = [
    {
      title: "1. Ancestral Giraffe",
      desc: "Original ancestors had short necks and fed on low shrubs and grass.",
      neckHeight: 25
    },
    {
      title: "2. Stretching for Leaves",
      desc: "Low foliage ran out; giraffes continuously stretched necks to reach high tree branches.",
      neckHeight: 45
    },
    {
      title: "3. Acquired Trait",
      desc: "Repeated use caused neck vertebrae and muscles to elongate slightly during lifespan.",
      neckHeight: 65
    },
    {
      title: "4. Inheritance of Acquired Trait",
      desc: "Offspring inherited the slightly longer neck; repeated over generations resulted in modern long necks.",
      neckHeight: 85
    }
  ];

  const darwinSteps = [
    {
      title: "1. Pre-existing Variation",
      desc: "Ancestral populations naturally had variable neck lengths due to genetic diversity.",
      neckHeight: 30
    },
    {
      title: "2. Environmental Scarcity",
      desc: "Drought and competition reduced low vegetation; only high tree leaves remained.",
      neckHeight: 30
    },
    {
      title: "3. Survival of the Fittest",
      desc: "Taller giraffes reached foliage and survived; short-necked giraffes starved (differential survival).",
      neckHeight: 75
    },
    {
      title: "4. Population Frequency Shift",
      desc: "Long-necked survivors reproduced, passing long-neck alleles to progeny; population evolved.",
      neckHeight: 90
    }
  ];

  function renderSteps(steps, isLamarck) {
    container.innerHTML = steps.map((step, idx) => `
      <div class="giraffe-step-card">
        <div class="giraffe-svg-container">
          <svg viewBox="0 0 80 120" width="70" height="110">
            <!-- Body -->
            <ellipse cx="40" cy="90" rx="20" ry="14" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
            <!-- Legs -->
            <line x1="28" y1="100" x2="26" y2="118" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
            <line x1="36" y1="102" x2="35" y2="118" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
            <line x1="44" y1="102" x2="45" y2="118" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
            <line x1="52" y1="100" x2="54" y2="118" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
            <!-- Dynamic Neck -->
            <path d="M48 85 L56 ${100 - step.neckHeight} L50 ${100 - step.neckHeight} L42 85 Z" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
            <!-- Head & Ears -->
            <ellipse cx="53" cy="${96 - step.neckHeight}" rx="8" ry="6" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
            <circle cx="56" cy="${94 - step.neckHeight}" r="1.5" fill="#0f172a"/>
            <!-- Horns -->
            <line x1="52" y1="${90 - step.neckHeight}" x2="50" y2="${84 - step.neckHeight}" stroke="#b45309" stroke-width="2"/>
            <line x1="55" y1="${90 - step.neckHeight}" x2="55" y2="${84 - step.neckHeight}" stroke="#b45309" stroke-width="2"/>
            <!-- High Leaf Foliage -->
            <circle cx="68" cy="15" r="10" fill="#10b981" opacity="0.8"/>
            <circle cx="72" cy="22" r="8" fill="#059669" opacity="0.9"/>
          </svg>
        </div>
        <div class="giraffe-step-title">${step.title}</div>
        <div class="giraffe-step-desc">${step.desc}</div>
      </div>
    `).join('');

    if (isLamarck) {
      summaryText.innerHTML = `<em>⚠️ <strong>Lamarck's Hypothesis:</strong> Stretching in an individual's lifetime causes elongation, which is directly inherited. (Refuted by Weismann's Germplasm theory).</em>`;
    } else {
      summaryText.innerHTML = `<em>⭐ <strong>Darwin's Scientific Model:</strong> Pre-existing genetic variation meant long-necked individuals had higher survival and differential reproduction under scarcity.</em>`;
    }
  }

  btnLamarck.addEventListener('click', () => {
    btnLamarck.classList.add('active');
    btnDarwin.classList.remove('active');
    renderSteps(lamarckSteps, true);
  });

  btnDarwin.addEventListener('click', () => {
    btnDarwin.classList.add('active');
    btnLamarck.classList.remove('active');
    renderSteps(darwinSteps, false);
  });

  // Initial render
  renderSteps(lamarckSteps, true);
}

/* ==========================================================================
   6. Interactive Natural Selection Simulator (Canvas & Moth Engine)
   ========================================================================== */
function initNaturalSelectionSim() {
  const canvas = document.getElementById('mothCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('simCanvasWrapper');

  const btnStep = document.getElementById('btnSimStep');
  const btnAuto = document.getElementById('btnSimAuto');
  const btnReset = document.getElementById('btnSimReset');
  const envBtns = document.querySelectorAll('.btn-env-select');
  const sliderPredation = document.getElementById('sliderPredation');
  const labelPredation = document.getElementById('labelPredation');

  const simGenLabel = document.getElementById('simGenerationLabel');
  const simLightFill = document.getElementById('simLightFill');
  const simDarkFill = document.getElementById('simDarkFill');
  const simLightPct = document.getElementById('simLightPct');
  const simDarkPct = document.getElementById('simDarkPct');
  const simPedagogyText = document.getElementById('simPedagogyText');

  let currentEnv = 'light'; // 'light' | 'dark' | 'forest'
  let generation = 1;
  let isAutoRunning = false;
  let autoInterval = null;
  const TOTAL_POPULATION = 80;

  // Organism Population state
  let organisms = [];

  function resetPopulation() {
    organisms = [];
    generation = 1;
    for (let i = 0; i < TOTAL_POPULATION; i++) {
      organisms.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: Math.random() * (canvas.height - 20) + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: i < TOTAL_POPULATION / 2 ? 'light' : 'dark',
        radius: 6
      });
    }
    updateMetrics();
  }

  function advanceGeneration() {
    generation++;
    const predationIntensity = parseInt(sliderPredation.value, 10) / 100;

    // Determine survival probabilities based on environment match
    let lightSurvivalProb = 0.8;
    let darkSurvivalProb = 0.2;

    if (currentEnv === 'dark') {
      lightSurvivalProb = 0.15;
      darkSurvivalProb = 0.85;
    } else if (currentEnv === 'forest') {
      lightSurvivalProb = 0.45;
      darkSurvivalProb = 0.55;
    }

    // Adjust by predation slider
    lightSurvivalProb = Math.max(0.05, Math.min(0.95, lightSurvivalProb - (predationIntensity - 0.5) * 0.4));
    darkSurvivalProb = Math.max(0.05, Math.min(0.95, darkSurvivalProb - (predationIntensity - 0.5) * 0.4));

    // Selection Phase: filter survivors
    const survivors = organisms.filter(org => {
      const prob = org.type === 'light' ? lightSurvivalProb : darkSurvivalProb;
      return Math.random() < prob;
    });

    // Handle extreme case of extinction
    if (survivors.length === 0) {
      survivors.push({ type: currentEnv === 'dark' ? 'dark' : 'light' });
    }

    // Reproduction Phase: offspring inherit parents' phenotypes
    const newOrganisms = [];
    for (let i = 0; i < TOTAL_POPULATION; i++) {
      const parent = survivors[Math.floor(Math.random() * survivors.length)];
      // 2% random mutation rate
      let childType = parent.type;
      if (Math.random() < 0.02) {
        childType = childType === 'light' ? 'dark' : 'light';
      }

      newOrganisms.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: Math.random() * (canvas.height - 20) + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: childType,
        radius: 6
      });
    }

    organisms = newOrganisms;
    updateMetrics();
  }

  function updateMetrics() {
    const lightCount = organisms.filter(o => o.type === 'light').length;
    const darkCount = organisms.length - lightCount;
    const lightPercent = Math.round((lightCount / organisms.length) * 100);
    const darkPercent = 100 - lightPercent;

    if (simGenLabel) simGenLabel.textContent = `Generation ${generation}`;
    if (simLightFill) simLightFill.style.width = `${lightPercent}%`;
    if (simDarkFill) simDarkFill.style.width = `${darkPercent}%`;
    if (simLightPct) simLightPct.textContent = `${lightPercent}%`;
    if (simDarkPct) simDarkPct.textContent = `${darkPercent}%`;

    // Pedagogical narrative update
    if (simPedagogyText) {
      if (currentEnv === 'light') {
        simPedagogyText.innerHTML = `💡 <strong>Generation ${generation} in Light Lichen:</strong> Light morphs (${lightPercent}%) have superior camouflage against predators. Dark morphs (${darkPercent}%) are conspicuous and heavily predated.`;
      } else if (currentEnv === 'dark') {
        simPedagogyText.innerHTML = `💡 <strong>Generation ${generation} in Dark Soot:</strong> Soot-blackened environment provides camouflage for dark morphs (${darkPercent}%). Light morphs (${lightPercent}%) suffer high predation mortality.`;
      } else {
        simPedagogyText.innerHTML = `💡 <strong>Generation ${generation} in Deep Moss:</strong> Mixed selective pressures maintain balanced polymorphic frequencies between light and dark variants.`;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    organisms.forEach(org => {
      // Move
      org.x += org.vx;
      org.y += org.vy;

      // Bounce
      if (org.x <= org.radius || org.x >= canvas.width - org.radius) org.vx *= -1;
      if (org.y <= org.radius || org.y >= canvas.height - org.radius) org.vy *= -1;

      // Draw Moth Shape
      ctx.save();
      ctx.translate(org.x, org.y);

      if (org.type === 'light') {
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#94a3b8';
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
      }

      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(-4, 0, 7, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(4, 0, 7, 4, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Body core
      ctx.fillStyle = org.type === 'light' ? '#cbd5e1' : '#000000';
      ctx.beginPath();
      ctx.ellipse(0, 0, 2, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  // Event Listeners
  btnStep.addEventListener('click', advanceGeneration);

  btnAuto.addEventListener('click', () => {
    isAutoRunning = !isAutoRunning;
    if (isAutoRunning) {
      btnAuto.textContent = '⏸ Pause';
      btnAuto.classList.add('active');
      autoInterval = setInterval(advanceGeneration, 900);
    } else {
      btnAuto.textContent = '▶ Auto Run';
      btnAuto.classList.remove('active');
      clearInterval(autoInterval);
    }
  });

  btnReset.addEventListener('click', () => {
    if (isAutoRunning) {
      clearInterval(autoInterval);
      isAutoRunning = false;
      btnAuto.textContent = '▶ Auto Run';
      btnAuto.classList.remove('active');
    }
    resetPopulation();
  });

  envBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      envBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEnv = btn.dataset.env;

      wrapper.className = `sim-canvas-wrapper env-${currentEnv}`;
      updateMetrics();
    });
  });

  sliderPredation.addEventListener('input', (e) => {
    const val = e.target.value;
    let label = 'Medium (50%)';
    if (val < 35) label = `Low (${val}%)`;
    else if (val > 65) label = `High (${val}%)`;
    else label = `Medium (${val}%)`;
    labelPredation.textContent = label;
  });

  // Start Simulation
  resetPopulation();
  draw();
}

/* ==========================================================================
   7. Darwin's Finches Explorer
   ========================================================================== */
function initFinchesExplorer() {
  const finchGrid = document.getElementById('finchGrid');
  const finchTitle = document.getElementById('finchDetailTitle');
  const finchDesc = document.getElementById('finchDetailDesc');
  const finchDiet = document.getElementById('finchDetailDiet');
  const finchNiche = document.getElementById('finchDetailNiche');
  const finchExam = document.getElementById('finchDetailExam');

  if (!finchGrid) return;

  const finches = [
    {
      id: 'large-ground',
      name: 'Large Ground Finch',
      latin: 'Geospiza magnirostris',
      beak: 'Deep, heavy crushing bill',
      diet: 'Hard, large woody seeds',
      niche: 'Low arid ground foraging',
      desc: 'Has the deepest and most powerful crushing beak. Can exert tremendous force to crack tough seed hulls that other finches cannot penetrate.',
      examTip: 'Classic example of morphological divergence driven by seed toughness during Galápagos droughts.',
      svgBeak: `<path d="M50 45 L78 50 L50 65 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>`
    },
    {
      id: 'medium-ground',
      name: 'Medium Ground Finch',
      latin: 'Geospiza fortis',
      beak: 'Intermediate crushing bill',
      diet: 'Small to medium seeds',
      niche: 'Variable ground and shrub foraging',
      desc: 'Versatile generalist bill. Studied extensively by Peter and Rosemary Grant; beak depth evolved larger during droughts when small seeds vanished.',
      examTip: 'Demonstrates rapid measurable natural selection in response to climatic shifts over just 1-2 seasons.',
      svgBeak: `<path d="M50 48 L72 52 L50 60 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>`
    },
    {
      id: 'cactus-finch',
      name: 'Cactus Finch',
      latin: 'Geospiza scandens',
      beak: 'Long, sharp probing bill',
      diet: 'Opuntia cactus pulp & nectar',
      niche: 'Prickly pear cactus specialist',
      desc: 'Elongated and decurved beak specialized to reach deep into cactus flowers for nectar and extract seeds without getting punctured by spines.',
      examTip: 'Niche specialization reduces interspecific competition with ground finches.',
      svgBeak: `<path d="M50 48 L82 52 L50 56 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>`
    },
    {
      id: 'warbler-finch',
      name: 'Warbler Finch',
      latin: 'Certhidea olivacea',
      beak: 'Slender, needle-like probe',
      diet: 'Small flying insects & larvae',
      niche: 'Foliage and bark gleaning',
      desc: 'Smallest beak of all Galápagos finches, resembling an insectivorous warbler. Adapted to pluck insects from crevices and tree bark.',
      examTip: 'Evolutionary convergence in beak morphology toward unrelated mainland warblers.',
      svgBeak: `<path d="M50 50 L75 51 L50 54 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>`
    },
    {
      id: 'vegetarian-finch',
      name: 'Vegetarian Tree Finch',
      latin: 'Platyspiza crassirostris',
      beak: 'Heavy, curved parrot-like bill',
      diet: 'Tree buds, leaves & fruits',
      niche: 'Arboreal forest canopy',
      desc: 'Curved parrot-like beak suited for stripping bark, crushing tough tree buds, and biting through fleshy fruits in the humid forest zones.',
      examTip: 'Demonstrates adaptive radiation into arboreal herbivorous niches.',
      svgBeak: `<path d="M50 46 Q70 47 75 58 L50 62 Z" fill="#475569" stroke="#1e293b" stroke-width="2"/>`
    }
  ];

  finchGrid.innerHTML = finches.map((finch, idx) => `
    <div class="finch-card ${idx === 0 ? 'active' : ''}" data-finch="${finch.id}">
      <div class="finch-avatar-box">
        <svg viewBox="0 0 100 100" width="70" height="70">
          <circle cx="45" cy="50" r="24" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
          <circle cx="48" cy="44" r="3.5" fill="#0f172a"/>
          ${finch.svgBeak}
        </svg>
      </div>
      <div class="finch-species-name">${finch.name}</div>
      <div class="finch-latin-name">${finch.latin}</div>
      <span class="finch-beak-badge">${finch.beak}</span>
    </div>
  `).join('');

  const cards = finchGrid.querySelectorAll('.finch-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const found = finches.find(f => f.id === card.dataset.finch);
      if (found) {
        finchTitle.textContent = `${found.name} (${found.latin})`;
        finchDesc.textContent = found.desc;
        finchDiet.textContent = found.diet;
        finchNiche.textContent = found.niche;
        finchExam.textContent = found.examTip;
      }
    });
  });
}

/* ==========================================================================
   8. Industrial Melanism Interactive 3-Era Switcher
   ========================================================================== */
function initIndustrialMelanism() {
  const treeDisplay = document.getElementById('mothTreeDisplay');
  const lightMoth = document.getElementById('mothVisualLight');
  const darkMoth = document.getElementById('mothVisualDark');
  const eraTitle = document.getElementById('mothEraTitle');
  const eraDesc = document.getElementById('mothEraDesc');

  const btnPre = document.getElementById('btnEraPre');
  const btnInd = document.getElementById('btnEraInd');
  const btnPost = document.getElementById('btnEraPost');

  if (!treeDisplay || !btnPre || !btnInd || !btnPost) return;

  const eras = {
    pre: {
      title: "Pre-Industrial Era (Prior to 1848)",
      desc: "Tree trunks were covered in pale lichens. Light-colored moths (typica) were perfectly camouflaged against predatory birds. Dark mutant moths (carbonaria) were easily spotted and heavily eaten. Light morph comprised >98% of the population.",
      bg: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #f1f5f9 100%)",
      lightOpacity: "1.0",
      darkOpacity: "0.35"
    },
    ind: {
      title: "Industrial Revolution (1850s–1950s)",
      desc: "Heavy industrial soot and sulfur dioxide pollution killed epiphytic lichens and blackened tree trunks with coal soot. Dark moths became camouflaged, while light moths were easily caught by birds. Dark morph frequency surged to >98% around industrial Manchester.",
      bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      lightOpacity: "0.25",
      darkOpacity: "1.0"
    },
    post: {
      title: "Clean Air Legislation (Post-1960s)",
      desc: "Enactment of the Clean Air Acts reduced airborne sulfur dioxide and coal smoke. Lichens recolonized tree surfaces, returning trunks to a pale shade. Directional selection reversed, and light-colored moths steadily regained dominant frequency.",
      bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #d1fae5 100%)",
      lightOpacity: "1.0",
      darkOpacity: "0.4"
    }
  };

  function setEra(key, activeBtn) {
    [btnPre, btnInd, btnPost].forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');

    const data = eras[key];
    treeDisplay.style.background = data.bg;
    lightMoth.style.opacity = data.lightOpacity;
    darkMoth.style.opacity = data.darkOpacity;
    eraTitle.textContent = data.title;
    eraDesc.textContent = data.desc;
  }

  btnPre.addEventListener('click', () => setEra('pre', btnPre));
  btnInd.addEventListener('click', () => setEra('ind', btnInd));
  btnPost.addEventListener('click', () => setEra('post', btnPost));

  setEra('pre', btnPre);
}

/* ==========================================================================
   9. Homologous Bone Anatomical Explorer
   ========================================================================== */
function initBoneExplorer() {
  const legendItems = document.querySelectorAll('.bone-legend-item');
  const allBones = document.querySelectorAll('.bone-part');

  legendItems.forEach(item => {
    item.addEventListener('click', () => {
      legendItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const selected = item.dataset.bone;

      allBones.forEach(bone => {
        if (selected === 'all') {
          bone.style.opacity = '1';
          bone.style.filter = 'none';
        } else if (bone.classList.contains(selected)) {
          bone.style.opacity = '1';
          bone.style.filter = 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))';
        } else {
          bone.style.opacity = '0.18';
          bone.style.filter = 'grayscale(100%)';
        }
      });
    });
  });
}

/* ==========================================================================
   10. Antibiotic Resistance Virtual Petri Dish Simulator
   ========================================================================== */
function initPetriDishLab() {
  const dish = document.getElementById('petriDish');
  const zone = document.getElementById('zoneInhibition');
  const btnApply = document.getElementById('btnApplyAntibiotic');
  const btnRegrow = document.getElementById('btnRegrowCulture');
  const btnReset = document.getElementById('btnResetPetri');
  const countSusc = document.getElementById('countSusceptible');
  const countRes = document.getElementById('countResistant');

  if (!dish || !btnApply || !btnRegrow || !btnReset) return;

  let colonies = [];
  const TOTAL_INITIAL = 32;

  function renderDish(susceptibleNum, resistantNum) {
    // Clean previous colonies
    const oldColonies = dish.querySelectorAll('.petri-colony');
    oldColonies.forEach(c => c.remove());

    colonies = [];
    const dishRadius = 110;
    const centerX = 140;
    const centerY = 140;

    // Create colonies
    for (let i = 0; i < susceptibleNum; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * (dishRadius - 25);
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;

      colonies.push({ type: 'susceptible', x, y, dist });
    }

    for (let i = 0; i < resistantNum; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * (dishRadius - 25);
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;

      colonies.push({ type: 'resistant', x, y, dist });
    }

    colonies.forEach(col => {
      const el = document.createElement('div');
      el.className = `petri-colony colony-${col.type}`;
      el.style.width = '10px';
      el.style.height = '10px';
      el.style.left = `${col.x - 5}px`;
      el.style.top = `${col.y - 5}px`;
      dish.appendChild(el);
    });

    if (countSusc) countSusc.textContent = susceptibleNum;
    if (countRes) countRes.textContent = resistantNum;
  }

  btnApply.addEventListener('click', () => {
    zone.classList.add('active');

    // Kill susceptible colonies inside zone radius (80px)
    const colonyEls = dish.querySelectorAll('.petri-colony');
    let killedCount = 0;

    colonies.forEach((col, idx) => {
      if (col.type === 'susceptible' && col.dist < 80) {
        if (colonyEls[idx]) {
          colonyEls[idx].style.opacity = '0';
          colonyEls[idx].style.transform = 'scale(0)';
          killedCount++;
        }
      }
    });

    const currentSusc = parseInt(countSusc.textContent, 10);
    const newSusc = Math.max(0, currentSusc - killedCount);
    if (countSusc) countSusc.textContent = newSusc;
  });

  btnRegrow.addEventListener('click', () => {
    zone.classList.remove('active');
    // Surviving resistant bacteria divide to fill dish
    renderDish(2, 30);
  });

  btnReset.addEventListener('click', () => {
    zone.classList.remove('active');
    renderDish(28, 4);
  });

  // Initial culture
  renderDish(28, 4);
}

/* ==========================================================================
   11. Quick Revision Flashcard Accordion
   ========================================================================== */
function initQuickRevisionAccordion() {
  const items = document.querySelectorAll('.revision-item');
  items.forEach(item => {
    const header = item.querySelector('.revision-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   12. 12-Question High-Yield MDCAT Examination Engine
   ========================================================================== */
function initMdcatQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const progressText = document.getElementById('quizProgressText');
  const liveScoreText = document.getElementById('quizLiveScore');
  const btnNext = document.getElementById('btnNextQuestion');
  const btnPrev = document.getElementById('btnPrevQuestion');

  const activeView = document.getElementById('quizActiveView');
  const summaryView = document.getElementById('quizSummaryView');
  const summaryScore = document.getElementById('summaryScoreDisplay');
  const summaryTier = document.getElementById('summaryTierDisplay');
  const summaryCorrect = document.getElementById('summaryCorrect');
  const summaryIncorrect = document.getElementById('summaryIncorrect');
  const summaryPct = document.getElementById('summaryPct');
  const btnRetry = document.getElementById('btnRetryQuiz');

  if (!questionEl || !optionsEl || !btnNext) return;

  const quizQuestions = [
    {
      q: "1. According to the modern biological definition, at what biological level does evolution occur?",
      options: [
        "Individual organisms during their lifetime",
        "Populations of organisms over successive generations",
        "Individual cells adapting to environmental shifts",
        "Isolated organs responding to functional use"
      ],
      correct: 1,
      explanation: "Evolution is fundamentally defined as a multi-generational change in the inherited characteristics and gene pool of populations. Individuals do NOT evolve in their lifetimes."
    },
    {
      q: "2. What did Jean-Baptiste Lamarck propose as the primary mechanism for evolutionary change?",
      options: [
        "Natural selection acting on pre-existing variations",
        "Differential reproduction of fittest phenotypes",
        "Use and disuse and inheritance of acquired characteristics",
        "Random genetic drift in small isolated populations"
      ],
      correct: 2,
      explanation: "Lamarck proposed that organs strengthen through use or degenerate through disuse, and these acquired somatic modifications are inherited by offspring (later refuted by genetics)."
    },
    {
      q: "3. What serves as the essential 'raw material' upon which natural selection acts?",
      options: [
        "Environmental scarcity of food",
        "Heritable genetic variation",
        "Acquired physical strength in adults",
        "Geographic distance between islands"
      ],
      correct: 1,
      explanation: "Heritable genetic variation (generated by mutations, crossing over, and sexual reproduction) provides the diversity of phenotypes from which natural selection selects."
    },
    {
      q: "4. Human arm, bat wing, and whale flipper share the pentadactyl limb bone layout. This is a classic example of:",
      options: [
        "Analogous structures (Convergent evolution)",
        "Homologous structures (Divergent evolution)",
        "Vestigial remnants with no ancestral link",
        "Atavistic anomalies"
      ],
      correct: 1,
      explanation: "Homologous structures share a common evolutionary origin and skeletal blueprint (pentadactyl limb) adapted for distinct functions across different habitats."
    },
    {
      q: "5. Bird wing (bones & feathers) and insect wing (chitin & veins) perform the same function of flight but have different origins. They are:",
      options: [
        "Homologous structures",
        "Analogous structures",
        "Vestigial organs",
        "Embryonic homologs"
      ],
      correct: 1,
      explanation: "Analogous structures perform similar functions due to similar selective pressures (flight) but possess distinct evolutionary and embryonic origins (Convergent Evolution)."
    },
    {
      q: "6. When a bacterial population develops penicillin resistance, the antibiotic acts as a:",
      options: [
        "Mutagen that directly causes the resistant mutation",
        "Nutrient that stimulates bacteria to mutate on purpose",
        "Selective agent favoring pre-existing resistant mutants",
        "Chemical that alters bacterial phenotype without genetic change"
      ],
      correct: 2,
      explanation: "MDCAT Golden Point: Antibiotics do NOT induce resistance mutations on demand. They simply act as selective agents that kill susceptible cells while pre-existing resistant mutants survive."
    },
    {
      q: "7. In industrial melanism of Biston betularia, what caused dark moths (carbonaria) to become prevalent during the Industrial Revolution?",
      options: [
        "Moths learned to alter their pigmentation to hide",
        "Coal soot killed lichens, making dark moths camouflaged against bird predators",
        "Industrial toxins forced light moths to mutate into dark ones",
        "Dark moths required less food during the winter"
      ],
      correct: 1,
      explanation: "Soot-darkened tree trunks provided camouflage for the pre-existing dark morph, whereas light moths were heavily predated by birds (Directional Natural Selection)."
    },
    {
      q: "8. The diversification of Galápagos finches into 14+ species with distinct beak shapes from a single common ancestor is called:",
      options: [
        "Convergent evolution",
        "Adaptive radiation",
        "Lamarckian transformation",
        "Polyploid sympatry"
      ],
      correct: 1,
      explanation: "Adaptive radiation is the rapid diversification of an ancestral species into a multitude of new forms filling distinct ecological niches (seed cracking, insect probing, cactus feeding)."
    },
    {
      q: "9. Which of the following is a classic vestigial structure in humans?",
      options: [
        "Biceps brachii muscle",
        "Vermiform appendix",
        "Femur bone",
        "Alveoli of lungs"
      ],
      correct: 1,
      explanation: "The human vermiform appendix, coccyx (tailbone), and wisdom teeth are reduced evolutionary remnants with diminished ancestral function."
    },
    {
      q: "10. August Weismann disproved Lamarck's inheritance of acquired characteristics by:",
      options: [
        "Crossing yellow and green pea plants",
        "Cutting off mice tails for 22 generations and finding all offspring born with tails",
        "Irradiating fruit flies with X-rays",
        "Studying Galápagos tortoises"
      ],
      correct: 1,
      explanation: "Weismann's Germplasm Theory demonstrated that somatic alterations (cutting tails) do not affect germ cells or hereditary DNA passed to offspring."
    },
    {
      q: "11. What is the correct logical chronological sequence of speciation?",
      options: [
        "Reproductive isolation → Geographic barrier → Divergence",
        "Isolation → Genetic divergence → Reproductive isolation → New species",
        "New species → Genetic drift → Geographic barrier",
        "Natural selection → Immediate hybrid sterility → Mutation"
      ],
      correct: 1,
      explanation: "Speciation pathway: 1. Isolation separates groups → 2. Independent mutations and selective forces cause divergence → 3. Reproductive isolation develops → 4. Distinct species form."
    },
    {
      q: "12. Natural selection acts directly on an organism's __________, while evolution results in changes in a population's __________.",
      options: [
        "Genotype; Phenotype",
        "Phenotype; Genotype / Allele frequencies",
        "Somatic DNA; Embryonic stage",
        "Chromosome number; Acquired traits"
      ],
      correct: 1,
      explanation: "Selection acts directly on the physical traits (phenotypes) that interact with the environment, which shifts the underlying allele frequencies (genotypes) of the population over generations."
    }
  ];

  let currentIdx = 0;
  let userAnswers = new Array(quizQuestions.length).fill(null);

  function renderQuestion(idx) {
    const qData = quizQuestions[idx];
    questionEl.textContent = qData.q;
    progressText.textContent = `Question ${idx + 1} of ${quizQuestions.length}`;

    // Calculate score so far
    let currentScore = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === quizQuestions[i].correct) currentScore++;
    });
    const answeredCount = userAnswers.filter(a => a !== null).length;
    liveScoreText.textContent = `Score: ${currentScore} / ${answeredCount}`;

    // Options
    optionsEl.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    qData.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-prefix">${prefixes[optIdx]}</span>
        <span>${optText}</span>
      `;

      // If already answered
      if (userAnswers[idx] !== null) {
        btn.disabled = true;
        if (optIdx === qData.correct) {
          btn.classList.add('selected-correct');
        } else if (optIdx === userAnswers[idx]) {
          btn.classList.add('selected-wrong');
        }
      } else {
        btn.addEventListener('click', () => selectAnswer(idx, optIdx));
      }

      optionsEl.appendChild(btn);
    });

    // Feedback
    if (userAnswers[idx] !== null) {
      feedbackEl.style.display = 'block';
      if (userAnswers[idx] === qData.correct) {
        feedbackEl.className = 'quiz-feedback-box correct';
        feedbackEl.innerHTML = `✓ <strong>Correct!</strong> ${qData.explanation}`;
      } else {
        feedbackEl.className = 'quiz-feedback-box wrong';
        feedbackEl.innerHTML = `✕ <strong>Incorrect.</strong> Correct answer is <strong>${prefixes[qData.correct]}</strong>.<br>${qData.explanation}`;
      }
      btnNext.disabled = false;
    } else {
      feedbackEl.style.display = 'none';
      btnNext.disabled = true;
    }

    // Previous button visibility
    btnPrev.style.visibility = idx > 0 ? 'visible' : 'hidden';

    // Next button text
    if (idx === quizQuestions.length - 1) {
      btnNext.textContent = 'Finish & View Score →';
    } else {
      btnNext.textContent = 'Next Question →';
    }
  }

  function selectAnswer(qIdx, selectedOptIdx) {
    userAnswers[qIdx] = selectedOptIdx;
    renderQuestion(qIdx);
  }

  btnNext.addEventListener('click', () => {
    if (currentIdx < quizQuestions.length - 1) {
      currentIdx++;
      renderQuestion(currentIdx);
    } else {
      showSummary();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      renderQuestion(currentIdx);
    }
  });

  function showSummary() {
    activeView.style.display = 'none';
    summaryView.style.display = 'block';

    let correctCount = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === quizQuestions[i].correct) correctCount++;
    });
    const total = quizQuestions.length;
    const incorrectCount = total - correctCount;
    const pct = Math.round((correctCount / total) * 100);

    summaryScore.textContent = `${correctCount} / ${total}`;
    summaryCorrect.textContent = correctCount;
    summaryIncorrect.textContent = incorrectCount;
    summaryPct.textContent = `${pct}%`;

    localStorage.setItem('mdcat_evolution_quiz_score', correctCount);
    updateGlobalProgress();

    if (pct >= 85) {
      summaryTier.textContent = '🌟 MDCAT Mastery: Exceptional Biological Knowledge!';
      summaryTier.style.color = '#059669';
    } else if (pct >= 65) {
      summaryTier.textContent = '👍 MDCAT Proficient: Good foundation, review tricky points!';
      summaryTier.style.color = '#0284c7';
    } else {
      summaryTier.textContent = '📖 Revision Recommended: Review the core concept cards above!';
      summaryTier.style.color = '#b45309';
    }
  }

  btnRetry.addEventListener('click', () => {
    userAnswers = new Array(quizQuestions.length).fill(null);
    currentIdx = 0;
    activeView.style.display = 'block';
    summaryView.style.display = 'none';
    renderQuestion(0);
  });

  // Initial render
  renderQuestion(0);
}

/* ==========================================================================
   13. Chapter Completion & Confetti Animation
   ========================================================================== */
function initChapterCompletion() {
  const btn = document.getElementById('btnMarkComplete');
  const statusMsg = document.getElementById('completionStatusMessage');

  if (!btn) return;

  const isCompleted = localStorage.getItem('mdcat_evolution_completed') === 'true';
  if (isCompleted && statusMsg) {
    statusMsg.style.display = 'block';
    btn.textContent = '✓ Chapter Completed (Recorded)';
    btn.style.background = '#d1fae5';
    btn.style.color = '#065f46';
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('mdcat_evolution_completed', 'true');
    statusMsg.style.display = 'block';
    btn.textContent = '✓ Chapter Completed (Recorded)';
    btn.style.background = '#d1fae5';
    btn.style.color = '#065f46';

    updateGlobalProgress();
    launchConfetti();
  });
}

function launchConfetti() {
  const container = document.body;
  const colors = ['#10b981', '#059669', '#3b82f6', '#f59e0b', '#ec4899', '#6366f1'];

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '9999';
    confetti.style.width = `${Math.random() * 8 + 6}px`;
    confetti.style.height = `${Math.random() * 8 + 6}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-10px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), top 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 3s ease';

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = `${window.innerHeight + 20}px`;
      confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
      confetti.style.opacity = '0';
    }, 20);

    setTimeout(() => confetti.remove(), 3200);
  }
}
