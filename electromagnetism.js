/**
 * MDCAT PHYSICS: CHAPTER 14 & 15 — ELECTROMAGNETISM & INDUCTION
 * Master Interactive Engine: electromagnetism.js
 * Contains: Canvas Simulators, Real Calculators, 40+ MCQs,
 * Direction Tester, Spectrum Explorer, Search, and Progress Tracker
 */

(function () {
  'use strict';

  // Constants
  const MU_0 = 4 * Math.PI * 1e-7; // 1.256637e-6 T*m/A
  const C_SPEED = 3e8; // m/s
  const H_PLANCK = 6.626e-34; // J*s
  const E_CHARGE = 1.6e-19; // C
  const PROTON_MASS = 1.67e-27; // kg
  const ELECTRON_MASS = 9.11e-31; // kg

  // State Management
  const AppState = {
    theme: localStorage.getItem('mdcat_theme') || 'light',
    completedTopics: JSON.parse(localStorage.getItem('mdcat_em_topics') || '[]'),
    checkedList: JSON.parse(localStorage.getItem('mdcat_em_checklist') || '[]'),
    quizCategory: 'all',
    currentMcqIndex: 0,
    quizAnswers: {},
    quizScore: 0
  };

  // ===================================================================
  // 1. INITIALIZATION & THEME SETUP
  // ===================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderScrollProgress();
    initScrollSpy();
    initSearch();
    initProgressTracker();
    initChecklist();
    initSpectrumExplorer();
    initDirectionTester();
    initAccordions();
    initNumericalSolutions();
    initFormulaCopy();
    initCalculators();
    initQuizEngine();
    initHeroCanvas();
    initMotorSimulator();
    initGeneratorSimulator();
    initEmWaveSimulator();
    initFieldLinesSimulator();
  });

  function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', `Switch to ${AppState.theme === 'dark' ? 'light' : 'dark'} mode`);
      themeBtn.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', AppState.theme);
        localStorage.setItem('mdcat_theme', AppState.theme);
        themeBtn.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
        showToast(`Switched to ${AppState.theme} mode`);
      });
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> ${msg}`;
    toast.classList.add('show');
    clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ===================================================================
  // 2. SCROLL PROGRESS & SCROLLSPY TOC
  // ===================================================================
  function initHeaderScrollProgress() {
    const progressBar = document.getElementById('headerProgressBar');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      if (progressBar) progressBar.style.width = scrolled + '%';
    });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('.chapter-section');
    const tocLinks = document.querySelectorAll('.toc-item a');
    if (!sections.length || !tocLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      tocLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
          link.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        }
      });
    });
  }

  // ===================================================================
  // 3. SEARCH SYSTEM
  // ===================================================================
  function initSearch() {
    const searchInput = document.getElementById('chapterSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const searchableCards = document.querySelectorAll(
        '.concept-card, .formula-card, .numerical-card, .accordion-item, .trap-card-styled, .revision-card'
      );

      if (!term) {
        searchableCards.forEach((el) => (el.style.display = ''));
        return;
      }

      let matchCount = 0;
      searchableCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ===================================================================
  // 4. PROGRESS SYSTEM & CHECKLIST
  // ===================================================================
  function initProgressTracker() {
    updateProgressUI();
    const topicButtons = document.querySelectorAll('.topic-check-btn');
    topicButtons.forEach((btn) => {
      const topicId = btn.getAttribute('data-topic');
      if (AppState.completedTopics.includes(topicId)) {
        btn.classList.add('completed');
        btn.innerHTML = '<span>✓</span> Completed';
      }

      btn.addEventListener('click', () => {
        if (AppState.completedTopics.includes(topicId)) {
          AppState.completedTopics = AppState.completedTopics.filter((t) => t !== topicId);
          btn.classList.remove('completed');
          btn.innerHTML = '<span>○</span> Mark Complete';
          showToast(`Marked ${topicId} as incomplete`);
        } else {
          AppState.completedTopics.push(topicId);
          btn.classList.add('completed');
          btn.innerHTML = '<span>✓</span> Completed';
          showToast(`Completed: ${topicId}`);
        }
        localStorage.setItem('mdcat_em_topics', JSON.stringify(AppState.completedTopics));
        updateProgressUI();
      });
    });
  }

  function updateProgressUI() {
    const totalTopics = 20; // 20 primary chapter learning milestones
    const completedCount = AppState.completedTopics.length;
    const pct = Math.min(100, Math.round((completedCount / totalTopics) * 100));

    const fillBars = document.querySelectorAll('.hero-progress-fill');
    const textVals = document.querySelectorAll('.hero-progress-pct');

    fillBars.forEach((bar) => (bar.style.width = pct + '%'));
    textVals.forEach((val) => (val.textContent = pct + '%'));
  }

  function initChecklist() {
    const items = document.querySelectorAll('.checklist-item');
    items.forEach((item) => {
      const key = item.getAttribute('data-check-id');
      if (AppState.checkedList.includes(key)) {
        item.classList.add('checked');
      }

      item.addEventListener('click', () => {
        if (AppState.checkedList.includes(key)) {
          AppState.checkedList = AppState.checkedList.filter((k) => k !== key);
          item.classList.remove('checked');
        } else {
          AppState.checkedList.push(key);
          item.classList.add('checked');
        }
        localStorage.setItem('mdcat_em_checklist', JSON.stringify(AppState.checkedList));
      });
    });
  }

  // ===================================================================
  // 5. ACCORDIONS & NUMERICALS & FORMULA COPY
  // ===================================================================
  function initAccordions() {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        item.classList.toggle('active');
      });
    });
  }

  function initNumericalSolutions() {
    const solButtons = document.querySelectorAll('.toggle-solution-btn');
    solButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.numerical-card');
        const solBox = card.querySelector('.solution-container');
        if (solBox) {
          solBox.classList.toggle('open');
          btn.innerHTML = solBox.classList.contains('open') ? 'Hide Solution ▲' : 'Show Solution ▼';
        }
      });
    });
  }

  function initFormulaCopy() {
    const copyBtns = document.querySelectorAll('.copy-formula-btn');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy-text');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied formula: ${textToCopy}`);
          });
        }
      });
    });

    // Formula tab filters
    const filterBtns = document.querySelectorAll('.formula-filter-btn');
    const formulaCards = document.querySelectorAll('.formula-card');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        formulaCards.forEach((card) => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===================================================================
  // 6. ELECTROMAGNETIC SPECTRUM INTERACTIVE EXPLORER
  // ===================================================================
  const SpectrumData = {
    radio: {
      name: 'Radio Waves',
      freq: '< 3 × 10⁹ Hz (Lowest frequency)',
      wavelength: '> 0.1 m (Longest wavelength)',
      energy: '< 10⁻⁵ eV (Lowest energy per photon)',
      production: 'Accelerating electrons in oscillating electrical LC circuits / dipole antennas',
      detection: 'Radio aerial receivers, resonant tuning circuits',
      uses: 'Radio & TV broadcasting, AM/FM communications, cellular mobile networks, radar, MRI radio-frequency pulsing',
      mdcatTip: 'Longest wavelength and minimum photon energy in the EM spectrum. Not ionizing. Can bend around large obstacles by diffraction.'
    },
    microwave: {
      name: 'Microwaves',
      freq: '3 × 10⁹ Hz to 3 × 10¹¹ Hz',
      wavelength: '1 mm to 0.1 m',
      energy: '10⁻⁵ eV to 10⁻³ eV',
      production: 'Special vacuum tubes like Magnetrons, Klystrons, Gunn diodes',
      detection: 'Point-contact diodes, crystal detectors',
      uses: 'Microwave ovens (water molecule resonant rotation at 2.45 GHz), satellite communications, Wi-Fi, Doppler weather radar',
      mdcatTip: 'Microwave ovens heat food by causing forced dielectric heating / rotational vibration of polar water molecules.'
    },
    ir: {
      name: 'Infrared (Heat) Radiation',
      freq: '3 × 10¹¹ Hz to 4 × 10¹⁴ Hz',
      wavelength: '700 nm to 1 mm',
      energy: '0.001 eV to 1.7 eV',
      production: 'Thermal agitation and molecular vibrations in warm or hot bodies',
      detection: 'Thermopiles, bolometers, infrared semiconductor photodiodes',
      uses: 'Thermal imaging, night-vision cameras, physical therapy heating lamps, remote controls, greenhouse effect',
      mdcatTip: 'Also called Heat Waves. All objects above absolute zero (0 K) emit IR radiation according to Stefan-Boltzmann law.'
    },
    visible: {
      name: 'Visible Light (VIBGYOR)',
      freq: '4 × 10¹⁴ Hz to 7.5 × 10¹⁴ Hz',
      wavelength: '400 nm (Violet) to 700 nm (Red)',
      energy: '1.77 eV (Red) to 3.10 eV (Violet)',
      production: 'Outer electron transitions between energy levels in excited atoms, incandescence, LEDs',
      detection: 'Human retina (photoreceptor rods & cones), photocells, photographic film',
      uses: 'Human vision, plant photosynthesis, optical fiber communications, microscopy, endoscopy',
      mdcatTip: 'Mnemonic VIBGYOR: Violet has maximum frequency/energy & shortest wavelength. Red has minimum frequency/energy & longest visible wavelength.'
    },
    uv: {
      name: 'Ultraviolet Radiation',
      freq: '7.5 × 10¹⁴ Hz to 3 × 10¹⁶ Hz',
      wavelength: '10 nm to 400 nm',
      energy: '3.1 eV to 124 eV',
      production: 'Very hot bodies (Sun), electric sparks, mercury vapor discharge lamps',
      detection: 'Fluorescent screens, photographic emulsion, photocells',
      uses: 'Sterilization of medical instruments, water purification (UV-C germicidal), vitamin D synthesis, fluorescent mineral analysis',
      mdcatTip: 'Absorbed by the Earth’s stratospheric ozone (O₃) layer. Glass absorbs UV light; quartz transmits UV light.'
    },
    xray: {
      name: 'X-Rays (Röntgen Rays)',
      freq: '3 × 10¹⁶ Hz to 3 × 10¹⁹ Hz',
      wavelength: '0.01 nm to 10 nm',
      energy: '124 eV to 124 keV',
      production: 'Fast-moving high-energy electrons suddenly decelerated upon colliding with heavy metal targets (Bremsstrahlung & Characteristic X-rays)',
      detection: 'Photographic film, Geiger counters, ionization chambers',
      uses: 'Medical diagnostic radiography (bone fractures, chest X-rays), CT scans, airport baggage security, X-ray crystallography',
      mdcatTip: 'Highly penetrating and ionizing. Soft X-rays have lower energy; Hard X-rays have higher energy and deeper penetration.'
    },
    gamma: {
      name: 'Gamma Rays (γ-Rays)',
      freq: '> 3 × 10¹⁹ Hz (Highest frequency)',
      wavelength: '< 0.01 nm (Shortest wavelength)',
      energy: '> 100 keV (Highest photon energy)',
      production: 'Nuclear de-excitation, radioactive decay of unstable atomic nuclei, cosmic events',
      detection: 'Scintillation counters, solid-state semiconductor detectors',
      uses: 'Radiotherapy for cancer tumor destruction (Cobalt-60 teletherapy), food gamma-sterilization, industrial weld inspection',
      mdcatTip: 'Highest frequency, highest photon energy (E = hf), and greatest penetrating power. Strongest ionizing capability.'
    }
  };

  function initSpectrumExplorer() {
    const bands = document.querySelectorAll('.spectrum-band');
    const detailBox = document.getElementById('spectrumDetailBox');
    if (!bands.length || !detailBox) return;

    function renderSpectrumRegion(regionKey) {
      const data = SpectrumData[regionKey];
      if (!data) return;

      detailBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.8rem;">
          <h4 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin:0;">${data.name}</h4>
          <span class="card-badge badge-blue">Interactive Spectrum Node</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.8rem; margin-bottom:1rem; font-size:0.9rem;">
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--blue-primary); display:block; font-size:0.78rem; text-transform:uppercase;">Frequency Range:</strong>
            ${data.freq}
          </div>
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--teal-primary); display:block; font-size:0.78rem; text-transform:uppercase;">Wavelength Range:</strong>
            ${data.wavelength}
          </div>
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--violet-primary); display:block; font-size:0.78rem; text-transform:uppercase;">Photon Energy:</strong>
            ${data.energy}
          </div>
        </div>
        <div style="font-size:0.92rem; line-height:1.6; margin-bottom:0.8rem;">
          <p><strong>Method of Production:</strong> ${data.production}</p>
          <p><strong>Primary Applications:</strong> ${data.uses}</p>
        </div>
        <div class="pedagogy-box tip-box" style="margin:0.5rem 0 0;">
          <div class="tip-title">⚡ High-Yield MDCAT Exam Focus</div>
          ${data.mdcatTip}
        </div>
      `;
    }

    bands.forEach((band) => {
      band.addEventListener('click', () => {
        bands.forEach((b) => b.classList.remove('active'));
        band.classList.add('active');
        const regionKey = band.getAttribute('data-region');
        renderSpectrumRegion(regionKey);
      });
    });

    // Default region
    renderSpectrumRegion('visible');
  }

  // ===================================================================
  // 7. RIGHT-HAND RULES INTERACTIVE DIRECTION TESTER
  // ===================================================================
  const DirectionQuestions = [
    {
      prompt: 'A positive proton moves East into a uniform magnetic field directed North. In what direction does the magnetic force act?',
      options: ['Upward (out of page)', 'Downward (into page)', 'South', 'West'],
      correct: 0,
      rule: 'Right-Hand Palm Rule / Cross Product: Index in velocity direction (East), middle/fingers in field direction (North). Thumb points UP (out of page).'
    },
    {
      prompt: 'An electron moves vertically UPWARDS into a magnetic field directed EAST. What is the magnetic force direction on the electron?',
      options: ['North', 'South', 'Into the screen', 'Out of the screen'],
      correct: 0,
      rule: 'Charge is negative! By Right-Hand Rule: (v × B) = (Up × East) = South. Since q = -e, force is inverted to NORTH.'
    },
    {
      prompt: 'A straight horizontal wire carries electric current from West to East in a magnetic field pointing vertically Downwards. What is the magnetic force direction on the wire?',
      options: ['North', 'South', 'East', 'Zero'],
      correct: 0,
      rule: 'F = I(L × B): Current along East (+i), Magnetic field along Down (-k). East × Down = North.'
    },
    {
      prompt: 'A bar magnet’s North pole is pushed TOWARDS a stationary copper ring. From the magnet’s perspective, what is the induced current direction in the ring?',
      options: ['Counter-Clockwise (acts as North pole)', 'Clockwise (acts as South pole)', 'No induced current', 'Alternating randomly'],
      correct: 0,
      rule: 'By Lenz’s Law, the induced current must oppose the approaching North pole by creating its own North pole facing the magnet -> Counter-Clockwise.'
    }
  ];

  let currentDirQuestionIdx = 0;

  function initDirectionTester() {
    renderDirectionQuestion();
  }

  function renderDirectionQuestion() {
    const qBox = document.getElementById('testerQuestionBox');
    const optionsGrid = document.getElementById('testerOptionsGrid');
    const feedbackBox = document.getElementById('testerFeedbackBox');
    const nextBtn = document.getElementById('testerNextBtn');

    if (!qBox || !optionsGrid) return;
    feedbackBox.innerHTML = '';
    feedbackBox.style.color = '';

    const currentQ = DirectionQuestions[currentDirQuestionIdx];
    qBox.textContent = `Scenario ${currentDirQuestionIdx + 1} of ${DirectionQuestions.length}: ${currentQ.prompt}`;
    optionsGrid.innerHTML = '';

    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'tester-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        const allBtns = optionsGrid.querySelectorAll('.tester-btn');
        allBtns.forEach((b) => (b.disabled = true));

        if (idx === currentQ.correct) {
          btn.style.background = 'var(--emerald-light)';
          btn.style.borderColor = 'var(--emerald-primary)';
          btn.style.color = 'var(--emerald-primary)';
          feedbackBox.style.color = 'var(--emerald-primary)';
          feedbackBox.innerHTML = `✓ <strong>Correct!</strong> ${currentQ.rule}`;
        } else {
          btn.style.background = 'var(--rose-light)';
          btn.style.borderColor = 'var(--rose-primary)';
          btn.style.color = 'var(--rose-primary)';
          feedbackBox.style.color = 'var(--rose-primary)';
          feedbackBox.innerHTML = `✗ <strong>Incorrect.</strong> ${currentQ.rule}`;
        }
      });
      optionsGrid.appendChild(btn);
    });

    if (nextBtn) {
      nextBtn.onclick = () => {
        currentDirQuestionIdx = (currentDirQuestionIdx + 1) % DirectionQuestions.length;
        renderDirectionQuestion();
      };
    }
  }

  // ===================================================================
  // 8. INTERACTIVE CALCULATORS
  // ===================================================================
  function initCalculators() {
    // Tabs switching
    const tabBtns = document.querySelectorAll('.calc-tab-btn');
    const panels = document.querySelectorAll('.calculator-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-calc');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Calculator 1: Magnetic Force on Charge F = q v B sin(theta)
    const calcForceBtn = document.getElementById('calcForceBtn');
    if (calcForceBtn) {
      calcForceBtn.addEventListener('click', () => {
        const q = parseFloat(document.getElementById('forceChargeInput').value);
        const v = parseFloat(document.getElementById('forceVelocityInput').value);
        const b = parseFloat(document.getElementById('forceFieldInput').value);
        const angleDeg = parseFloat(document.getElementById('forceAngleInput').value);
        const resultDisplay = document.getElementById('forceResultVal');
        const stepsDisplay = document.getElementById('forceResultSteps');

        if (isNaN(q) || isNaN(v) || isNaN(b) || isNaN(angleDeg)) {
          resultDisplay.textContent = 'Invalid input';
          stepsDisplay.textContent = 'Please enter valid numerical values for all fields.';
          return;
        }

        const angleRad = (angleDeg * Math.PI) / 180;
        const sinTheta = Math.sin(angleRad);
        const force = Math.abs(q * v * b * sinTheta);

        resultDisplay.textContent = `${force.toExponential(3)} N`;
        stepsDisplay.innerHTML = `
          <strong>Calculation Breakdown:</strong><br>
          • Formula: <span class="math-inline"><span class="math-var">F</span> = |<span class="math-var">q</span>| · <span class="math-var">v</span> · <span class="math-var">B</span> · sin(<span class="math-var">&theta;</span>)</span><br>
          • Substitution: <span class="math-inline">${Math.abs(q)} C × ${v} m/s × ${b} T × sin(${angleDeg}°)</span><br>
          • sin(${angleDeg}°) = ${sinTheta.toFixed(4)}<br>
          • Calculated Force: <strong>${force.toExponential(4)} N</strong><br>
          • <em>Note:</em> If &theta; = 0° or 180°, F = 0 N (No deflection). If &theta; = 90°, F is maximum.
        `;
      });
    }

    // Calculator 2: Magnetic Field of Wire & Solenoid
    const calcFieldBtn = document.getElementById('calcFieldBtn');
    if (calcFieldBtn) {
      calcFieldBtn.addEventListener('click', () => {
        const type = document.getElementById('fieldTypeSelect').value;
        const current = parseFloat(document.getElementById('fieldCurrentInput').value);
        const param2 = parseFloat(document.getElementById('fieldParam2Input').value);
        const resultDisplay = document.getElementById('fieldResultVal');
        const stepsDisplay = document.getElementById('fieldResultSteps');

        if (isNaN(current) || isNaN(param2) || param2 <= 0) {
          resultDisplay.textContent = 'Invalid input';
          stepsDisplay.textContent = 'Please provide valid positive numbers.';
          return;
        }

        if (type === 'wire') {
          // B = (mu0 * I) / (2 * pi * r)
          const b = (MU_0 * current) / (2 * Math.PI * param2);
          resultDisplay.textContent = `${b.toExponential(3)} T`;
          stepsDisplay.innerHTML = `
            <strong>Straight Wire Magnetic Field:</strong><br>
            • Formula: <span class="math-inline"><span class="math-var">B</span> = (&mu;<sub>0</sub> · <span class="math-var">I</span>) / (2&pi;<span class="math-var">r</span>)</span><br>
            • &mu;<sub>0</sub> = 4&pi; × 10<sup>-7</sup> T·m/A<br>
            • Distance <span class="math-var">r</span> = ${param2} m, Current <span class="math-var">I</span> = ${current} A<br>
            • Result: <strong>${b.toExponential(4)} Tesla</strong> (${(b * 1e4).toFixed(3)} Gauss)
          `;
        } else {
          // Solenoid B = mu0 * n * I
          const b = MU_0 * param2 * current;
          resultDisplay.textContent = `${b.toExponential(3)} T`;
          stepsDisplay.innerHTML = `
            <strong>Solenoid Internal Magnetic Field:</strong><br>
            • Formula: <span class="math-inline"><span class="math-var">B</span> = &mu;<sub>0</sub> · <span class="math-var">n</span> · <span class="math-var">I</span></span><br>
            • Turns per meter <span class="math-var">n</span> = ${param2} turns/m, Current = ${current} A<br>
            • Result: <strong>${b.toExponential(4)} Tesla</strong>
          `;
        }
      });
    }

    // Calculator 3: Magnetic Flux Calculator Phi = B * A * cos(theta)
    const calcFluxBtn = document.getElementById('calcFluxBtn');
    if (calcFluxBtn) {
      calcFluxBtn.addEventListener('click', () => {
        const b = parseFloat(document.getElementById('fluxFieldInput').value);
        const a = parseFloat(document.getElementById('fluxAreaInput').value);
        const angleDeg = parseFloat(document.getElementById('fluxAngleInput').value);
        const resultDisplay = document.getElementById('fluxResultVal');
        const stepsDisplay = document.getElementById('fluxResultSteps');

        if (isNaN(b) || isNaN(a) || isNaN(angleDeg)) {
          resultDisplay.textContent = 'Invalid input';
          stepsDisplay.textContent = 'Please enter valid numbers for magnetic field, area, and angle.';
          return;
        }

        const angleRad = (angleDeg * Math.PI) / 180;
        const cosTheta = Math.cos(angleRad);
        const flux = b * a * cosTheta;

        resultDisplay.textContent = `${flux.toExponential(3)} Wb`;
        stepsDisplay.innerHTML = `
          <strong>Magnetic Flux Breakdown:</strong><br>
          • Formula: <span class="math-inline">&Phi; = <span class="math-var">B</span> · <span class="math-var">A</span> · cos(<span class="math-var">&theta;</span>)</span><br>
          • Substitution: <span class="math-inline">${b} T × ${a} m² × cos(${angleDeg}°)</span><br>
          • cos(${angleDeg}°) = ${cosTheta.toFixed(4)}<br>
          • Magnetic Flux: <strong>${flux.toExponential(4)} Weber (Wb)</strong> or T·m²
        `;
      });
    }

    // Calculator 4: Motional EMF & Faraday Law
    const calcEmfBtn = document.getElementById('calcEmfBtn');
    if (calcEmfBtn) {
      calcEmfBtn.addEventListener('click', () => {
        const v = parseFloat(document.getElementById('emfVelInput').value);
        const b = parseFloat(document.getElementById('emfFieldInput').value);
        const l = parseFloat(document.getElementById('emfLenInput').value);
        const angleDeg = parseFloat(document.getElementById('emfAngleInput').value);
        const resultDisplay = document.getElementById('emfResultVal');
        const stepsDisplay = document.getElementById('emfResultSteps');

        if (isNaN(v) || isNaN(b) || isNaN(l) || isNaN(angleDeg)) {
          resultDisplay.textContent = 'Invalid input';
          stepsDisplay.textContent = 'Please enter valid values.';
          return;
        }

        const angleRad = (angleDeg * Math.PI) / 180;
        const emf = v * b * l * Math.sin(angleRad);

        resultDisplay.textContent = `${emf.toFixed(3)} V`;
        stepsDisplay.innerHTML = `
          <strong>Motional Electromotive Force:</strong><br>
          • Formula: <span class="math-inline">&epsilon; = <span class="math-var">v</span> · <span class="math-var">B</span> · <span class="math-var">L</span> · sin(<span class="math-var">&theta;</span>)</span><br>
          • Substitution: <span class="math-inline">${v} m/s × ${b} T × ${l} m × sin(${angleDeg}°)</span><br>
          • Induced Motional EMF: <strong>${emf.toFixed(4)} Volts</strong>
        `;
      });
    }

    // Calculator 5: Transformer Equation
    const calcTransBtn = document.getElementById('calcTransBtn');
    if (calcTransBtn) {
      calcTransBtn.addEventListener('click', () => {
        const vp = parseFloat(document.getElementById('transVpInput').value);
        const np = parseFloat(document.getElementById('transNpInput').value);
        const ns = parseFloat(document.getElementById('transNsInput').value);
        const ip = parseFloat(document.getElementById('transIpInput').value) || 1;
        const resultDisplay = document.getElementById('transResultVal');
        const stepsDisplay = document.getElementById('transResultSteps');

        if (isNaN(vp) || isNaN(np) || isNaN(ns) || np <= 0 || ns <= 0) {
          resultDisplay.textContent = 'Invalid input';
          stepsDisplay.textContent = 'Turns must be positive integers.';
          return;
        }

        const turnsRatio = ns / np;
        const vs = vp * turnsRatio;
        const isVal = (ip * np) / ns;
        const type = turnsRatio > 1 ? 'Step-Up Transformer' : turnsRatio < 1 ? 'Step-Down Transformer' : '1:1 Isolation Transformer';

        resultDisplay.textContent = `${vs.toFixed(2)} V`;
        stepsDisplay.innerHTML = `
          <strong>Transformer Analysis (${type}):</strong><br>
          • Turns Ratio <span class="math-inline">(<span class="math-var">N<sub>s</sub></span> / <span class="math-var">N<sub>p</sub></span>)</span> = <strong>${turnsRatio.toFixed(3)}</strong><br>
          • Secondary Voltage: <span class="math-inline"><span class="math-var">V<sub>s</sub></span> = <span class="math-var">V<sub>p</sub></span> · (<span class="math-var">N<sub>s</sub></span> / <span class="math-var">N<sub>p</sub></span>) = ${vp} × ${turnsRatio.toFixed(3)} = <strong>${vs.toFixed(2)} V</strong></span><br>
          • Secondary Current (Ideal): <span class="math-inline"><span class="math-var">I<sub>s</sub></span> = <span class="math-var">I<sub>p</sub></span> · (<span class="math-var">N<sub>p</sub></span> / <span class="math-var">N<sub>s</sub></span>) = <strong>${isVal.toFixed(3)} A</strong></span><br>
          • Power Output (Ideal): <span class="math-inline"><span class="math-var">P</span> = ${(vp * ip).toFixed(2)} W</span> (Frequency remains unchanged!)
        `;
      });
    }
  }

  // ===================================================================
  // 9. MDCAT 40+ MCQS MASTER QUIZ ENGINE
  // ===================================================================
  const McqDatabase = [
    {
      id: 1,
      cat: 'field',
      q: 'The magnetic flux density B at a perpendicular distance r from a long straight conductor carrying current I is inversely proportional to:',
      options: ['r²', 'r', '√r', '1/r'],
      correct: 1,
      exp: 'According to Ampere’s Law for a straight wire: B = (μ₀I) / (2πr). Hence, B is inversely proportional to r (B ∝ 1/r).'
    },
    {
      id: 2,
      cat: 'force',
      q: 'When a charged particle enters perpendicularly into a uniform magnetic field, its path is circular. The work done by the magnetic force on the particle is:',
      options: ['Maximum', 'Negative', 'Always zero', 'Depends on charge polarity'],
      correct: 2,
      exp: 'The magnetic force F = q(v × B) is always perpendicular to instantaneous velocity v and displacement dr (F ⟂ dr). Therefore, W = F · dr = F dr cos(90°) = 0 J. Kinetic energy and speed remain constant!'
    },
    {
      id: 3,
      cat: 'force',
      q: 'The radius of the circular path executed by a charged particle of mass m, charge q, and speed v in a uniform magnetic field B is given by:',
      options: ['r = qB / (mv)', 'r = mv / (qB)', 'r = qv / (mB)', 'r = mB / (qv)'],
      correct: 1,
      exp: 'Equating magnetic force to centripetal force: q v B = (m v²) / r  =>  r = (m v) / (q B) = p / (q B).'
    },
    {
      id: 4,
      cat: 'induction',
      q: 'The SI unit of magnetic flux is Weber (Wb). Which of the following is equivalent to 1 Weber?',
      options: ['1 Tesla · meter', '1 Tesla · meter²', '1 Newton / (Ampere · meter)', '1 Volt / second'],
      correct: 1,
      exp: 'Magnetic flux Φ = B · A. Hence 1 Wb = 1 Tesla × 1 m² = 1 T·m². Also 1 Wb = 1 Volt·second.'
    },
    {
      id: 5,
      cat: 'induction',
      q: 'Lenz’s Law is a direct consequence of the Law of Conservation of:',
      options: ['Electric charge', 'Linear momentum', 'Energy', 'Angular momentum'],
      correct: 2,
      exp: 'Lenz’s law ensures that mechanical work done against opposing induced magnetic forces is converted into electrical energy, satisfying the Law of Conservation of Energy.'
    },
    {
      id: 6,
      cat: 'emw',
      q: 'In an electromagnetic wave propagating along the +X axis, if the electric field vector E oscillates along the +Y axis, the magnetic field vector B oscillates along:',
      options: ['+X axis', '-Y axis', '+Z axis', '-X axis'],
      correct: 2,
      exp: 'The direction of wave propagation is given by the Poynting vector S = (E × B)/μ₀. Here, Y (+j) × Z (+k) = X (+i). Thus, B oscillates along the Z axis.'
    },
    {
      id: 7,
      cat: 'motor',
      q: 'The primary function of the split-ring commutator in a DC motor is to:',
      options: [
        'Increase the magnetic field strength',
        'Reverse the current in the armature coil every half rotation to maintain unidirectional torque',
        'Prevent the coil from overheating',
        'Convert DC supply into high voltage AC'
      ],
      correct: 1,
      exp: 'The split-ring commutator reverses current direction in each coil side every 180° rotation, ensuring the torque acts continuously in the same rotational sense.'
    },
    {
      id: 8,
      cat: 'transformer',
      q: 'A transformer operates on the principle of:',
      options: ['Self-induction', 'Mutual induction', 'Electrochemical action', 'Electrostatic shielding'],
      correct: 1,
      exp: 'A transformer transfers electrical energy between two coils via mutual induction through a common changing magnetic flux in the laminated iron core.'
    },
    {
      id: 9,
      cat: 'transformer',
      q: 'In an ideal step-up transformer with turns ratio Ns/Np = 10, if the primary AC voltage is 220 V and primary current is 5 A, the secondary current is:',
      options: ['50 A', '0.5 A', '5 A', '22 A'],
      correct: 1,
      exp: 'For an ideal transformer, Vp Ip = Vs Is. Since Vs = 10 × Vp, Is = Ip / 10 = 5 A / 10 = 0.5 A. Voltage steps up, current steps down!'
    },
    {
      id: 10,
      cat: 'emw',
      q: 'Which of the following electromagnetic radiations has the shortest wavelength and maximum photon energy?',
      options: ['Ultraviolet rays', 'X-rays', 'Gamma rays', 'Microwaves'],
      correct: 2,
      exp: 'In the EM spectrum, Gamma rays (γ) have the highest frequency (> 10¹⁹ Hz), highest energy (E = hf), and shortest wavelength (< 0.01 nm).'
    },
    {
      id: 11,
      cat: 'field',
      q: 'The magnetic field inside a long tightly wound solenoid with n turns per unit length carrying current I is:',
      options: ['Zero', 'B = μ₀ n I', 'B = μ₀ I / (2π r)', 'B = (μ₀ n I) / 2'],
      correct: 1,
      exp: 'Inside an ideal long solenoid, the magnetic field is uniform, parallel to the axis, and given by B = μ₀ n I = μ₀ (N/L) I.'
    },
    {
      id: 12,
      cat: 'force',
      q: 'If a charged particle moves parallel (θ = 0°) to a uniform magnetic field, the magnetic force acting on it is:',
      options: ['Maximum (q v B)', 'Zero', 'Negative', 'Infinite'],
      correct: 1,
      exp: 'Magnetic force F = q v B sin(θ). Since sin(0°) = 0, F = 0 N. The particle continues undeflected in a straight line.'
    },
    {
      id: 13,
      cat: 'force',
      q: 'A 2 m long straight wire carrying a current of 3 A is placed at right angles to a 0.5 T magnetic field. The magnetic force on the wire is:',
      options: ['1.5 N', '3.0 N', '0.75 N', '6.0 N'],
      correct: 1,
      exp: 'F = I L B sin(90°) = 3 A × 2 m × 0.5 T × 1 = 3.0 N.'
    },
    {
      id: 14,
      cat: 'induction',
      q: 'A straight conductor of length L moves with velocity v perpendicular to a magnetic field B. The induced motional EMF across its ends is:',
      options: ['ε = v B / L', 'ε = v B L', 'ε = B L / v', 'ε = v² B L'],
      correct: 1,
      exp: 'Motional EMF is given by ε = -v B L sin(θ). For perpendicular motion (θ = 90°), |ε| = v B L.'
    },
    {
      id: 15,
      cat: 'generator',
      q: 'In an AC generator, the peak (maximum) induced EMF in a rotating coil of N turns, area A, and angular velocity ω in magnetic field B is:',
      options: ['ε₀ = N A B / ω', 'ε₀ = N A B ω', 'ε₀ = N B ω / A', 'ε₀ = A B ω / N'],
      correct: 1,
      exp: 'Instantaneous EMF is ε = N A B ω sin(ωt). The maximum (peak) value occurs when sin(ωt) = 1, so ε₀ = N A B ω.'
    },
    {
      id: 16,
      cat: 'transformer',
      q: 'Eddy current energy losses in transformer iron cores are minimized by using:',
      options: ['Solid copper core', 'Laminated soft iron sheets insulated from each other', 'Thick aluminum wire', 'Permanent steel magnet'],
      correct: 1,
      exp: 'Laminating the iron core with thin varnished sheets increases electrical resistance along eddy current paths, dramatically reducing I²R eddy current thermal dissipation.'
    },
    {
      id: 17,
      cat: 'emw',
      q: 'The speed of electromagnetic waves in vacuum is given by the relation:',
      options: ['c = √(μ₀ ε₀)', 'c = 1 / √(μ₀ ε₀)', 'c = μ₀ / ε₀', 'c = ε₀ / μ₀'],
      correct: 1,
      exp: 'From Maxwell’s electromagnetic equations: c = 1 / √(μ₀ ε₀) = 3 × 10⁸ m/s.'
    },
    {
      id: 18,
      cat: 'emw',
      q: 'Which region of the electromagnetic spectrum is used in medical diagnostic radiography to visualize bone fractures?',
      options: ['Infrared rays', 'X-rays', 'Radio waves', 'Microwaves'],
      correct: 1,
      exp: 'X-rays penetrate soft body tissue but are absorbed by dense calcium-rich bone structures, producing diagnostic shadowgraphs.'
    },
    {
      id: 19,
      cat: 'force',
      q: 'The ratio of charge to mass (e/m) for an electron moving in a circular path of radius r with speed v in field B is:',
      options: ['e/m = v / (B r)', 'e/m = B r / v', 'e/m = v² / (B r)', 'e/m = (B r)² / v'],
      correct: 0,
      exp: 'Since r = (m v) / (e B), rearranging gives e/m = v / (B r).'
    },
    {
      id: 20,
      cat: 'field',
      q: 'Two parallel long straight wires carrying electric currents in the SAME direction will:',
      options: ['Repel each other', 'Attract each other', 'Exert no force on each other', 'Rotate perpendicularly'],
      correct: 1,
      exp: 'Parallel currents in the same direction attract each other; anti-parallel (opposite) currents repel each other.'
    },
    {
      id: 21,
      cat: 'induction',
      q: 'If the magnetic flux linked with a coil of 100 turns changes from 0.8 Wb to 0.2 Wb in 0.1 seconds, the magnitude of average induced EMF is:',
      options: ['60 V', '600 V', '6 V', '6000 V'],
      correct: 1,
      exp: '|ε| = N |ΔΦ/Δt| = 100 × |0.2 - 0.8| / 0.1 = 100 × 0.6 / 0.1 = 600 V.'
    },
    {
      id: 22,
      cat: 'emw',
      q: 'Electromagnetic waves are transverse in nature because they exhibit the optical property of:',
      options: ['Reflection', 'Refraction', 'Interference', 'Polarization'],
      correct: 3,
      exp: 'Polarization can only occur in transverse waves where vibrations are perpendicular to wave propagation. Longitudinal waves cannot be polarized.'
    },
    {
      id: 23,
      cat: 'torque',
      q: 'The torque acting on a current-carrying rectangular coil of N turns, current I, area A in uniform field B when the plane of coil is PARALLEL to the field is:',
      options: ['Zero', 'Maximum (τ = N I A B)', 'Half of maximum', 'Infinite'],
      correct: 1,
      exp: 'When the plane of the coil is parallel to B, the angle between the area vector (normal) and B is 90°. Torque τ = N I A B sin(90°) = N I A B (Maximum).'
    },
    {
      id: 24,
      cat: 'transformer',
      q: 'If a 100% efficient step-down transformer steps down voltage from 240 V to 12 V to power a 24 W lamp, the primary current is:',
      options: ['2 A', '0.1 A', '10 A', '0.5 A'],
      correct: 1,
      exp: 'Power Pin = Pout = 24 W. Since Pin = Vp × Ip  =>  Ip = Pin / Vp = 24 W / 240 V = 0.1 A.'
    },
    {
      id: 25,
      cat: 'field',
      q: 'The magnetic dipole moment M of a flat circular coil of N turns, radius R, and carrying current I is:',
      options: ['M = N I (π R²)', 'M = N I / (π R²)', 'M = N I (2π R)', 'M = I / (N π R²)'],
      correct: 0,
      exp: 'Magnetic dipole moment M = N I A = N I (π R²). Its SI unit is Ampere·meter² (A·m²).'
    },
    {
      id: 26,
      cat: 'force',
      q: 'A proton (charge +e) and an alpha particle (charge +2e, mass 4m) enter a uniform magnetic field with equal kinetic energies perpendicular to field B. The ratio of their radii (r_proton / r_alpha) is:',
      options: ['1 : 1', '1 : 2', '2 : 1', '1 : 4'],
      correct: 0,
      exp: 'Radius in terms of kinetic energy K: r = √(2 m K) / (q B). For proton: r_p ∝ √(m) / 1. For alpha: r_α ∝ √(4m) / 2 = 2√(m) / 2 = √(m). Ratio = 1 : 1.'
    },
    {
      id: 27,
      cat: 'emw',
      q: 'Which of the following colors of visible light has the highest frequency and shortest wavelength?',
      options: ['Red', 'Yellow', 'Green', 'Violet'],
      correct: 3,
      exp: 'In VIBGYOR, Violet has the shortest wavelength (~400 nm) and highest frequency (~7.5 × 10¹⁴ Hz).'
    },
    {
      id: 28,
      cat: 'transformer',
      q: 'A transformer cannot be used to step up or step down DC (Direct Current) because:',
      options: [
        'DC produces zero magnetic field',
        'DC produces a constant, steady magnetic flux, so dΦ/dt = 0 and no EMF is induced in secondary',
        'DC burns transformer insulation immediately',
        'DC reverses direction too fast'
      ],
      correct: 1,
      exp: 'Faraday’s law requires a changing magnetic flux (dΦ/dt). Constant DC generates constant flux, producing zero induced secondary voltage.'
    },
    {
      id: 29,
      cat: 'induction',
      q: 'When the rotational speed of an AC generator armature is doubled, the peak induced EMF (ε₀ = NABω) becomes:',
      options: ['Halved', 'Doubled', 'Quadrupled', 'Remains unchanged'],
      correct: 1,
      exp: 'Since ε₀ = N A B ω, peak EMF is directly proportional to angular frequency ω. Doubling rotational speed doubles peak EMF.'
    },
    {
      id: 30,
      cat: 'force',
      q: '1 Tesla is equivalent to:',
      options: ['1 N · A / m', '1 N / (A · m)', '1 N · m / A', '1 N / (A · m²)'],
      correct: 1,
      exp: 'From F = I L B, B = F / (I L). Thus 1 Tesla = 1 Newton / (Ampere · meter) = 1 N/(A·m).'
    },
    {
      id: 31,
      cat: 'field',
      q: 'The SI unit of magnetic permeability μ₀ is:',
      options: ['T · m / A', 'T · A / m', 'T / (m · A)', 'T · m² / A'],
      correct: 0,
      exp: 'From B = (μ₀ I) / (2π r), μ₀ = (2π r B) / I  =>  Unit is Tesla · meter / Ampere (T·m/A) or Henry/meter (H/m).'
    },
    {
      id: 32,
      cat: 'emw',
      q: 'Microwave ovens heat organic food items primarily due to dielectric resonance heating of:',
      options: ['Lipid fats', 'Water molecules (polar H₂O)', 'Sodium ions', 'Protein peptide bonds'],
      correct: 1,
      exp: 'Microwaves (~2.45 GHz) oscillate polar water molecules back and forth, generating rapid frictional heat throughout the food.'
    },
    {
      id: 33,
      cat: 'torque',
      q: 'In a galvanometer, cylindrical soft iron core and concave pole pieces produce a radial magnetic field so that:',
      options: [
        'Torque is always zero',
        'The plane of the coil remains parallel to magnetic field lines in all positions (sin θ = 1)',
        'Eddy currents are completely eliminated',
        'Coil resistance becomes zero'
      ],
      correct: 1,
      exp: 'A radial magnetic field ensures the plane of the coil is always parallel to field lines, making deflecting torque directly proportional to current (linear scale).'
    },
    {
      id: 34,
      cat: 'transformer',
      q: 'Copper loss in transformers occurs due to:',
      options: [
        'Joule heat dissipation (I²R) in primary and secondary coil windings',
        'Continuous magnetization and demagnetization of iron core',
        'Air ionization',
        'Magnetic flux leakage'
      ],
      correct: 0,
      exp: 'Copper loss is caused by the ohmic resistance of copper windings (Power loss = I²R). It is minimized using thick wires of low resistance.'
    },
    {
      id: 35,
      cat: 'emw',
      q: 'Which component of the electromagnetic spectrum is emitted by hot greenhouse gases and trapped by CO₂ in Earth’s atmosphere?',
      options: ['Ultraviolet', 'Infrared (Thermal)', 'Gamma rays', 'Radio waves'],
      correct: 1,
      exp: 'Earth absorbs solar visible/UV light and re-emits lower-energy Infrared (IR) thermal radiation, which is absorbed and re-radiated by greenhouse gases.'
    },
    {
      id: 36,
      cat: 'force',
      q: 'The magnetic force on a moving charge is zero if the angle between velocity v and magnetic field B is:',
      options: ['0° or 180°', '90°', '45°', '60°'],
      correct: 0,
      exp: 'F = q v B sin(θ). When θ = 0° or 180°, sin(θ) = 0, so magnetic force is zero.'
    },
    {
      id: 37,
      cat: 'induction',
      q: 'A magnetic flux through a stationary loop of wire changes from 12 Wb to 4 Wb in 2 seconds. The induced EMF is:',
      options: ['8 V', '4 V', '16 V', '2 V'],
      correct: 1,
      exp: '|ε| = |ΔΦ/Δt| = |4 - 12| / 2 = 8 / 2 = 4 Volts.'
    },
    {
      id: 38,
      cat: 'emw',
      q: 'All electromagnetic waves travelling through a vacuum have the SAME:',
      options: ['Wavelength', 'Frequency', 'Speed (c = 3 × 10⁸ m/s)', 'Photon energy'],
      correct: 2,
      exp: 'In a vacuum, all EM waves travel at the exact same constant speed c = 3 × 10⁸ m/s regardless of their wavelength or frequency.'
    },
    {
      id: 39,
      cat: 'generator',
      q: 'The mechanical energy supplied to an AC generator is converted into electrical energy by utilizing:',
      options: ['Faraday’s Law of Electromagnetic Induction', 'Coulomb’s Law', 'Boyle’s Law', 'Photoelectric effect'],
      correct: 0,
      exp: 'AC generators rotate a conductor armature in a magnetic field, creating a continuously changing magnetic flux that generates induced electromotive force via Faraday’s Law.'
    },
    {
      id: 40,
      cat: 'transformer',
      q: 'In a step-down transformer, which quantity INCREASES from primary to secondary coil?',
      options: ['Voltage', 'Current', 'Frequency', 'Power'],
      correct: 1,
      exp: 'A step-down transformer decreases voltage (Vs < Vp), which causes current to increase (Is > Ip) to conserve electrical power.'
    }
  ];

  function initQuizEngine() {
    renderQuizQuestion();

    const catSelect = document.getElementById('quizCategorySelect');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        AppState.quizCategory = e.target.value;
        AppState.currentMcqIndex = 0;
        renderQuizQuestion();
      });
    }

    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    const restartBtn = document.getElementById('quizRestartBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const filtered = getFilteredMcqs();
        if (AppState.currentMcqIndex > 0) {
          AppState.currentMcqIndex--;
          renderQuizQuestion();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const filtered = getFilteredMcqs();
        if (AppState.currentMcqIndex < filtered.length - 1) {
          AppState.currentMcqIndex++;
          renderQuizQuestion();
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        AppState.quizAnswers = {};
        AppState.quizScore = 0;
        AppState.currentMcqIndex = 0;
        renderQuizQuestion();
        showToast('Quiz reset successfully!');
      });
    }
  }

  function getFilteredMcqs() {
    if (AppState.quizCategory === 'all') return McqDatabase;
    return McqDatabase.filter((m) => m.cat === AppState.quizCategory);
  }

  function renderQuizQuestion() {
    const list = getFilteredMcqs();
    const qCountBadge = document.getElementById('quizProgressBadge');
    const scoreBadge = document.getElementById('quizScoreBadge');
    const fillBar = document.getElementById('quizProgressBarFill');
    const qTextBox = document.getElementById('mcqQuestionText');
    const optionsList = document.getElementById('mcqOptionsList');
    const expBox = document.getElementById('mcqExplanationBox');
    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');

    if (!list.length || !qTextBox || !optionsList) return;

    const currentQ = list[AppState.currentMcqIndex];
    const totalQ = list.length;

    // Progress updates
    if (qCountBadge) qCountBadge.textContent = `Question ${AppState.currentMcqIndex + 1} of ${totalQ}`;
    if (scoreBadge) scoreBadge.textContent = `Score: ${AppState.quizScore} / ${totalQ}`;
    if (fillBar) fillBar.style.width = `${((AppState.currentMcqIndex + 1) / totalQ) * 100}%`;

    if (prevBtn) prevBtn.disabled = AppState.currentMcqIndex === 0;
    if (nextBtn) nextBtn.disabled = AppState.currentMcqIndex === totalQ - 1;

    qTextBox.textContent = `${AppState.currentMcqIndex + 1}. ${currentQ.q}`;
    optionsList.innerHTML = '';
    expBox.classList.remove('show');
    expBox.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    const isAnswered = AppState.quizAnswers[currentQ.id] !== undefined;
    const selectedAns = AppState.quizAnswers[currentQ.id];

    currentQ.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option-btn';
      btn.innerHTML = `<span class="option-letter">${letters[optIdx]}</span> <span>${optText}</span>`;

      if (isAnswered) {
        btn.classList.add('disabled');
        if (optIdx === currentQ.correct) {
          btn.classList.add('correct');
        } else if (optIdx === selectedAns) {
          btn.classList.add('wrong');
        }
      } else {
        btn.addEventListener('click', () => {
          AppState.quizAnswers[currentQ.id] = optIdx;
          if (optIdx === currentQ.correct) {
            AppState.quizScore++;
          }
          renderQuizQuestion();
        });
      }

      optionsList.appendChild(btn);
    });

    if (isAnswered) {
      expBox.classList.add('show');
      expBox.innerHTML = `
        <strong style="color:var(--blue-primary); display:block; margin-bottom:0.3rem;">💡 High-Yield Textbook Explanation:</strong>
        ${currentQ.exp}
      `;
    }
  }

  // ===================================================================
  // 10. HERO CANVAS ANIMATION (ELECTROMAGNETIC FIELD DYNAMICS)
  // ===================================================================
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let t = 0;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = '#060b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      t += 0.035;

      // Draw rotating magnetic field loops
      ctx.lineWidth = 1.5;
      for (let i = 1; i <= 5; i++) {
        const rx = 35 * i + Math.sin(t) * 4;
        const ry = 18 * i + Math.cos(t) * 3;
        ctx.beginPath();
        ctx.ellipse(cx - 70, cy, rx, ry, t * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.8 - i * 0.12})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx + 70, cy, rx, ry, -t * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.8 - i * 0.12})`;
        ctx.stroke();
      }

      // Draw central current vector
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, canvas.height - 20);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Current arrow
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(cx, 15);
      ctx.lineTo(cx - 6, 28);
      ctx.lineTo(cx + 6, 28);
      ctx.fill();

      // Flowing electrons
      for (let j = 0; j < 6; j++) {
        const yPos = (cy + ((t * 40 + j * 40) % (canvas.height - 40))) % (canvas.height - 30) + 15;
        ctx.beginPath();
        ctx.arc(cx, yPos, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15';
        ctx.fill();
      }

      // Status text
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('B-FIELD LOOPS', 15, 25);
      ctx.fillText('CURRENT I ↑', cx + 10, 30);

      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
  }

  // ===================================================================
  // 11. DC MOTOR SIMULATOR (LIVE CANVAS)
  // ===================================================================
  function initMotorSimulator() {
    const canvas = document.getElementById('motorSimCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let speed = 0.03;
    let isRunning = true;

    const toggleBtn = document.getElementById('motorToggleBtn');
    const speedBtn = document.getElementById('motorSpeedBtn');
    const revBtn = document.getElementById('motorRevBtn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        toggleBtn.textContent = isRunning ? '⏸ Pause' : '▶ Play';
      });
    }

    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        speed = speed === 0.03 ? 0.07 : speed === 0.07 ? 0.015 : 0.03;
        speedBtn.textContent = `Speed: ${speed === 0.07 ? 'Fast' : speed === 0.03 ? 'Normal' : 'Slow'}`;
      });
    }

    if (revBtn) {
      revBtn.addEventListener('click', () => {
        speed = -speed;
      });
    }

    function render() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#070e1b';
      ctx.fillRect(0, 0, w, h);

      // Draw North and South Magnet Poles
      // North Pole (Red/Navy)
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(30, cy - 80, 80, 160);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, cy - 80, 80, 160);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('N', 65, cy + 8);

      // South Pole (Rose/Dark)
      ctx.fillStyle = '#881337';
      ctx.fillRect(w - 110, cy - 80, 80, 160);
      ctx.strokeStyle = '#f43f5e';
      ctx.strokeRect(w - 110, cy - 80, 80, 160);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('S', w - 75, cy + 8);

      // Draw Magnetic Field Lines (Left to Right)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      for (let y = cy - 60; y <= cy + 60; y += 30) {
        ctx.beginPath();
        ctx.moveTo(110, y);
        ctx.lineTo(w - 110, y);
        ctx.stroke();

        // Arrowhead
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(cx - 8, y - 4);
        ctx.lineTo(cx - 8, y + 4);
        ctx.fill();
      }

      // Draw Rotating Coil in Perspective
      if (isRunning) angle += speed;

      const coilWidth = 140;
      const coilHeight = 100;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      ctx.save();
      ctx.translate(cx, cy);

      // Rotating rectangular frame
      ctx.beginPath();
      ctx.moveTo(-coilWidth / 2, -coilHeight * sinA * 0.5);
      ctx.lineTo(coilWidth / 2, -coilHeight * sinA * 0.5);
      ctx.lineTo(coilWidth / 2, coilHeight * sinA * 0.5);
      ctx.lineTo(-coilWidth / 2, coilHeight * sinA * 0.5);
      ctx.closePath();

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Current direction arrows on coil arms
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(coilWidth / 2, -coilHeight * sinA * 0.5, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(-coilWidth / 2, coilHeight * sinA * 0.5, 5, 0, Math.PI * 2);
      ctx.fill();

      // Split Ring Commutator at bottom
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 90, 16, angle, angle + Math.PI * 0.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 90, 16, angle + Math.PI, angle + Math.PI * 1.85);
      ctx.stroke();

      // Carbon Brushes (Fixed)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-22, 85, 5, 10);
      ctx.fillRect(17, 85, 5, 10);

      ctx.restore();

      // Torque & Commutator status text
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#38bdf8';
      const torque = Math.abs(cosA);
      ctx.fillText(`ROTATION ANGLE: ${(Math.abs(angle * 57.3) % 360).toFixed(0)}°`, 15, h - 35);
      ctx.fillText(`INSTANTANEOUS TORQUE: ${(torque * 100).toFixed(0)}% MAX`, 15, h - 18);
      ctx.fillText(`SPLIT-RING REVERSAL: ACTIVE`, w - 210, h - 18);

      requestAnimationFrame(render);
    }
    render();
  }

  // ===================================================================
  // 12. AC GENERATOR SIMULATOR (WITH LIVE OSCILLOSCOPE WAVE)
  // ===================================================================
  function initGeneratorSimulator() {
    const canvas = document.getElementById('genSimCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let wavePoints = [];

    function render() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.35;
      const cy = h / 2;

      ctx.fillStyle = '#070e1b';
      ctx.fillRect(0, 0, w, h);

      angle += 0.04;
      const sinVal = Math.sin(angle);

      // Left: Rotating Armature in Field
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(20, cy - 65, 50, 130);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('N', 38, cy + 6);

      ctx.fillStyle = '#881337';
      ctx.fillRect(cx * 2 - 70, cy - 65, 50, 130);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('S', cx * 2 - 52, cy + 6);

      // Rotating Coil
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(-45, -35, 90, 70);
      ctx.restore();

      // Slip rings at center
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy + 60, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + 80, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Right: Live Oscilloscope Screen
      const oscX = w * 0.58;
      const oscW = w * 0.38;
      const oscH = 150;
      const oscY = cy - oscH / 2;

      ctx.fillStyle = '#021814';
      ctx.fillRect(oscX, oscY, oscW, oscH);
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 1;
      ctx.strokeRect(oscX, oscY, oscW, oscH);

      // Centerline
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
      ctx.beginPath();
      ctx.moveTo(oscX, cy);
      ctx.lineTo(oscX + oscW, cy);
      ctx.stroke();

      // Add wave point
      wavePoints.unshift(sinVal);
      if (wavePoints.length > oscW) wavePoints.pop();

      // Draw sinusoidal wave
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < wavePoints.length; i++) {
        const px = oscX + oscW - i;
        const py = cy - wavePoints[i] * 55;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Oscilloscope labels
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#2dd4bf';
      ctx.fillText('AC INDUCED EMF: ε = ε₀ sin(ωt)', oscX + 10, oscY + 20);
      ctx.fillText(`PEAK EMF (ε₀) = NABω`, oscX + 10, oscY + 38);
      ctx.fillText(`SLIP RINGS (CONTINUOUS AC)`, 20, h - 15);

      requestAnimationFrame(render);
    }
    render();
  }

  // ===================================================================
  // 13. ELECTROMAGNETIC WAVE PROPAGATION SIMULATOR
  // ===================================================================
  function initEmWaveSimulator() {
    const canvas = document.getElementById('emWaveSimCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    function render() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.fillStyle = '#070e1b';
      ctx.fillRect(0, 0, w, h);

      phase += 0.05;
      const k = 0.035; // wave number

      // Axis of propagation (X-axis)
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, cy);
      ctx.lineTo(w - 40, cy);
      ctx.stroke();

      // Arrowhead for propagation
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(w - 30, cy);
      ctx.lineTo(w - 42, cy - 6);
      ctx.lineTo(w - 42, cy + 6);
      ctx.fill();

      // Draw E-field (Vertical Red/Violet sine wave) and B-field (Horizontal Cyan sine wave)
      const step = 6;
      for (let x = 50; x < w - 50; x += step) {
        const val = Math.sin(k * x - phase);
        const eAmp = val * 55;
        const bAmp = val * 35;

        // E-field vectors (Vertical)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, cy);
        ctx.lineTo(x, cy - eAmp);
        ctx.stroke();

        // B-field vectors (Perspective Horizontal / Oblique)
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.75)';
        ctx.beginPath();
        ctx.moveTo(x, cy);
        ctx.lineTo(x + bAmp * 0.7, cy + bAmp * 0.4);
        ctx.stroke();
      }

      // Continuous E-field envelope curve
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 50; x < w - 50; x += 3) {
        const eAmp = Math.sin(k * x - phase) * 55;
        if (x === 50) ctx.moveTo(x, cy - eAmp);
        else ctx.lineTo(x, cy - eAmp);
      }
      ctx.stroke();

      // Continuous B-field envelope curve
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 50; x < w - 50; x += 3) {
        const bAmp = Math.sin(k * x - phase) * 35;
        const px = x + bAmp * 0.7;
        const py = cy + bAmp * 0.4;
        if (x === 50) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Text Legends
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('ELECTRIC FIELD E (VERTICAL Y)', 20, 30);
      ctx.fillStyle = '#06b6d4';
      ctx.fillText('MAGNETIC FIELD B (HORIZONTAL Z)', 20, 48);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('SPEED IN VACUUM c = 3.0 × 10⁸ m/s →', w - 270, 30);

      requestAnimationFrame(render);
    }
    render();
  }

  // ===================================================================
  // 14. STRAIGHT WIRE & SOLENOID FIELD LINES SIMULATOR
  // ===================================================================
  function initFieldLinesSimulator() {
    const canvas = document.getElementById('fieldLinesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let mode = 'wire';
    let currentDir = 1;

    const wireModeBtn = document.getElementById('simModeWireBtn');
    const solModeBtn = document.getElementById('simModeSolBtn');
    const revCurrBtn = document.getElementById('simRevCurrBtn');

    if (wireModeBtn && solModeBtn) {
      wireModeBtn.addEventListener('click', () => {
        mode = 'wire';
        wireModeBtn.classList.add('active');
        solModeBtn.classList.remove('active');
      });
      solModeBtn.addEventListener('click', () => {
        mode = 'solenoid';
        solModeBtn.classList.add('active');
        wireModeBtn.classList.remove('active');
      });
    }

    if (revCurrBtn) {
      revCurrBtn.addEventListener('click', () => {
        currentDir = -currentDir;
      });
    }

    let t = 0;

    function render() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#070e1b';
      ctx.fillRect(0, 0, w, h);
      t += 0.03 * currentDir;

      if (mode === 'wire') {
        // Concentric Circles
        for (let r = 30; r <= 140; r += 25) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.9 - r / 180})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Direction Arrows around loop
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
            const curA = a + t;
            const ax = cx + Math.cos(curA) * r;
            const ay = cy + Math.sin(curA) * r;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(ax, ay, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Conductor wire cross section at center
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentDir > 0 ? '⊙' : '⊗', cx, cy);

        ctx.textAlign = 'left';
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`CURRENT DIRECTION: ${currentDir > 0 ? 'OUT OF SCREEN (⊙ CCW Field)' : 'INTO SCREEN (⊗ CW Field)'}`, 20, h - 20);
        ctx.fillText(`AMPÈRE’S LAW: B = μ₀I / (2πr)`, 20, 30);
      } else {
        // Solenoid Field Lines (Parallel inside, looping outside)
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.lineWidth = 2;

        // Inside lines
        for (let y = cy - 40; y <= cy + 40; y += 16) {
          ctx.beginPath();
          ctx.moveTo(cx - 150, y);
          ctx.lineTo(cx + 150, y);
          ctx.stroke();

          // Arrow on inside lines
          const arrowX = cx + ((t * 80) % 120) - 60;
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.moveTo(arrowX, y);
          ctx.lineTo(arrowX - 6 * currentDir, y - 4);
          ctx.lineTo(arrowX - 6 * currentDir, y + 4);
          ctx.fill();
        }

        // Solenoid coils top and bottom
        for (let x = cx - 140; x <= cx + 140; x += 22) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(x, cy - 50, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, cy + 50, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`SOLENOID UNIFORM FIELD: B = μ₀nI`, 20, 30);
        ctx.fillText(`MAGNETIC POLES: ${currentDir > 0 ? 'Left = North | Right = South' : 'Left = South | Right = North'}`, 20, h - 20);
      }

      requestAnimationFrame(render);
    }
    render();
  }

})();
