/* MODERN PHYSICS — MDCAT CHAPTER JAVASCRIPT */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DATA DEFINITIONS
  const TOPICS = [
    {
      num: 1,
      id: 'intro',
      category: 'quantum',
      title: 'What is Modern Physics?',
      definition: 'Modern Physics is the branch of physics that studies physical phenomena that cannot be fully explained by classical physics, especially phenomena involving very small particles, very high speeds, and very high energies.',
      points: [
        'Classical physics (Newton, Maxwell) breaks down at atomic and relativistic scales.',
        'Includes Quantum theory, Atomic physics, Nuclear physics, Relativity, Photoelectric effect, and Matter waves.'
      ]
    },
    {
      num: 2,
      id: 'quantum-theory',
      category: 'quantum',
      title: 'Quantum Theory',
      definition: 'Quantum theory states that energy is not always exchanged continuously; instead, it can be absorbed or emitted in small discrete packets called quanta (photons).',
      points: [
        'Photon Energy: E = hf = hc / λ',
        'Higher frequency (f) → Higher photon energy.',
        'Shorter wavelength (λ) → Higher photon energy.'
      ],
      trap: 'Doubling the wavelength of light halves its photon energy (inverse proportionality).'
    },
    {
      num: 3,
      id: 'plancks-hypothesis',
      category: 'quantum',
      title: "Planck's Quantum Hypothesis",
      definition: 'An atom can emit or absorb energy only in discrete amounts called quanta, where E = hf.',
      points: [
        'Planck constant: h = 6.63 × 10⁻³⁴ J·s (or 4.14 × 10⁻¹⁵ eV·s).',
        'Dimensions of h are [M L² T⁻¹], identical to Angular Momentum.'
      ],
      trap: 'Planck constant has the exact same dimensions as Angular Momentum.'
    },
    {
      num: 4,
      id: 'photon',
      category: 'quantum',
      title: 'Photon Properties',
      definition: 'A photon is a quantum packet of electromagnetic radiation traveling at speed c with zero rest mass.',
      points: [
        'Rest mass m₀ = 0 (cannot be at rest).',
        'Electric charge q = 0 (not deflected by electric or magnetic fields).',
        'Carries energy E = hf and relativistic momentum p = h / λ = E / c.'
      ],
      trap: 'Photons have zero rest mass, but non-zero relativistic momentum (p = h/λ).'
    },
    {
      num: 5,
      id: 'photoelectric-effect',
      category: 'photoelectric',
      title: 'Photoelectric Effect',
      definition: 'Emission of electrons from a metal surface when light of sufficiently high frequency falls on it.',
      points: [
        'Decisive experimental proof of the particle nature of light.',
        'Instantaneous process (time lag < 10⁻⁹ s).',
        'Intensity increases photocurrent count, while frequency increases electron kinetic energy (Kmax).'
      ],
      trap: 'Intensity governs CURRENT; Frequency governs KMAX & STOPPING POTENTIAL.'
    },
    {
      num: 6,
      id: 'work-function',
      category: 'photoelectric',
      title: 'Work Function (ϕ)',
      definition: 'The minimum energy required to liberate an electron from the metal surface: ϕ = hf₀ = hc/λ₀.',
      points: [
        'Purely an intrinsic material property of the metal.',
        'Alkali metals (Cs, K, Na) have lowest work functions (visible light sensitive).'
      ],
      trap: 'Work function is independent of light intensity or incident frequency.'
    },
    {
      num: 7,
      id: 'threshold-frequency',
      category: 'photoelectric',
      title: 'Threshold Frequency (f₀)',
      definition: 'Minimum frequency of incident radiation required to eject electrons from a metal surface.',
      points: [
        'If f < f₀: No electrons emitted, regardless of intensity or duration.',
        'If f ≥ f₀: Emission occurs with Kmax = h(f - f₀).'
      ],
      trap: 'Increasing intensity CANNOT compensate for a sub-threshold frequency (f < f₀).'
    },
    {
      num: 8,
      id: 'threshold-wavelength',
      category: 'photoelectric',
      title: 'Threshold Wavelength (λ₀)',
      definition: 'Maximum (longest) wavelength of incident light that can eject electrons: λ₀ = hc/ϕ.',
      points: [
        'Condition for emission: λ ≤ λ₀.',
        'If λ > λ₀: Photon energy is insufficient (E < ϕ).'
      ]
    },
    {
      num: 9,
      id: 'de-broglie-waves',
      category: 'matter-waves',
      title: 'de Broglie Matter Waves',
      definition: 'Every moving material particle exhibits an associated wave with wavelength λ = h/p = h/(mv).',
      points: [
        'Accelerated electron: λ ≈ 1.227 / √V nm.',
        'Smaller mass or lower momentum gives longer de Broglie wavelength.',
        'Verified experimentally by Davisson-Germer electron diffraction.'
      ],
      trap: 'At equal kinetic energy, an electron has a LONGER matter wavelength than a proton because m_e << m_p.'
    },
    {
      num: 10,
      id: 'wave-particle-duality',
      category: 'matter-waves',
      title: 'Wave-Particle Duality',
      definition: 'Both electromagnetic radiation and matter exhibit wave-like and particle-like properties.',
      points: [
        'Light propagation = Waves (interference, diffraction).',
        'Light interaction = Particles (photoelectric, Compton effect).'
      ]
    },
    {
      num: 11,
      id: 'bohr-model',
      category: 'bohr',
      title: "Bohr's Atomic Model",
      definition: 'Electrons revolve in non-radiating stationary orbits with quantized angular momentum: L = mvr = n(h/2π).',
      points: [
        'Stationary states do not radiate energy.',
        'Radius scales as n² (rₙ = n²·r₁ where r₁ = 0.53 Å).'
      ],
      trap: 'Orbit radius scales with n² (r₁:r₂:r₃ = 1:4:9), while speed scales as 1/n.'
    },
    {
      num: 12,
      id: 'energy-levels',
      category: 'bohr',
      title: 'Hydrogen Energy Levels',
      definition: 'Quantized energy states for Hydrogen: Eₙ = -13.6 / n² eV.',
      points: [
        'n=1: -13.6 eV (Ground State)',
        'n=2: -3.40 eV (1st Excited State)',
        'n=3: -1.51 eV (2nd Excited State)',
        'n=4: -0.85 eV (3rd Excited State)'
      ],
      trap: '"1st Excited State" corresponds to n = 2 (NOT n = 1).'
    },
    {
      num: 13,
      id: 'excitation',
      category: 'bohr',
      title: 'Excitation of Atoms',
      definition: 'Process where a bound electron absorbs exact energy difference and jumps to a higher orbit.',
      points: [
        'Photon excitation requires EXACT energy match: E_photon = E_high - E_low.',
        '1st Excitation energy of Hydrogen = -3.4 - (-13.6) = 10.2 eV.'
      ]
    },
    {
      num: 14,
      id: 'emission',
      category: 'bohr',
      title: 'Emission of Light',
      definition: 'When an excited electron falls to a lower orbit, it emits a single photon: hf = E_high - E_low.',
      points: [
        'Explains sharp discrete line spectra of chemical elements.',
        'Rydberg equation: 1/λ = R_H (1/n₁² - 1/n₂²).'
      ]
    },
    {
      num: 15,
      id: 'ground-state',
      category: 'bohr',
      title: 'Ground State',
      definition: 'Lowest energy and most stable state of an atom (n = 1 for Hydrogen, E = -13.6 eV).',
      points: ['Electron in ground state cannot spontaneously emit radiation.']
    },
    {
      num: 16,
      id: 'excited-state',
      category: 'bohr',
      title: 'Excited States & Transitions',
      definition: 'Any state with energy higher than ground state (n ≥ 2 for Hydrogen).',
      points: [
        'Total possible emission lines from level n: N = n(n - 1) / 2.',
        'For n = 4, total lines = 4(3)/2 = 6 lines.'
      ]
    },
    {
      num: 17,
      id: 'atomic-spectra',
      category: 'bohr',
      title: 'Atomic Spectra & Series',
      definition: 'Characteristic patterns of emission and absorption lines unique to each element.',
      points: [
        'Lyman Series (n₁=1): Ultraviolet (UV)',
        'Balmer Series (n₁=2): VISIBLE Region (H-α 656nm, H-β 486nm, H-γ 434nm, H-δ 410nm)',
        'Paschen Series (n₁=3): Infrared (IR)'
      ],
      trap: 'Balmer series is the ONLY series of Hydrogen falling in the visible spectrum.'
    },
    {
      num: 18,
      id: 'mass-energy',
      category: 'relativity',
      title: 'Mass-Energy Equivalence (E = mc²)',
      definition: 'Mass and energy are interconvertible: E = mc².',
      points: [
        '1 unified atomic mass unit (1 u) = 931.5 MeV.',
        'Minimum energy for electron-positron Pair Production = 1.02 MeV.'
      ]
    },
    {
      num: 19,
      id: 'relativity',
      category: 'relativity',
      title: 'Special Relativity Basics',
      definition: 'Describes physics at speeds approaching the speed of light c.',
      points: [
        'Laws of physics are invariant across all inertial frames.',
        'Speed of light in vacuum c is absolute constant for all observers.',
        'Time dilation: Moving clocks run slower. Length contraction: Moving objects shorten.'
      ]
    },
    {
      num: 20,
      id: 'formulas-summary',
      category: 'quantum',
      title: 'Master Relationships Table',
      definition: 'Synthesis of core equations: E = hf = hc/λ, p = h/λ, hf = ϕ + Kmax, λ = h/p, Eₙ = -13.6/n² eV.',
      points: [
        'Fast MDCAT Shortcut: E(eV) ≈ 1240 / λ(nm)',
        'de Broglie Electron: λ ≈ 1.227 / √V nm'
      ]
    }
  ];

  const TRAPS = [
    { id: 1, title: 'Photon Energy vs Intensity', trap: 'Assuming higher intensity light increases photon energy.', reality: 'Photon energy E = hf depends ONLY on frequency/wavelength. Intensity only increases photon quantity.' },
    { id: 2, title: 'Frequency vs Wavelength Scaling', trap: 'Thinking doubling wavelength doubles energy.', reality: 'Wavelength is inversely proportional (E = hc/λ). Doubling wavelength HALVES photon energy.' },
    { id: 3, title: 'Work Function Constancy', trap: 'Thinking work function changes with stronger light.', reality: 'Work function (ϕ) is strictly an intrinsic material constant of the cathode metal.' },
    { id: 4, title: 'Sub-Threshold Delusion', trap: 'Believing high intensity light below f₀ will eventually eject electrons.', reality: 'If f < f₀, single photon energy is insufficient. Zero electrons are ever emitted.' },
    { id: 5, title: 'Kinetic Energy on Doubling f', trap: 'Assuming Kmax doubles when frequency doubles.', reality: 'Kmax = 2hf - ϕ = 2Kmax + ϕ > 2Kmax. Kmax increases MORE than double!' },
    { id: 6, title: 'Photon Rest Mass', trap: 'Saying photons have rest mass because they carry momentum.', reality: 'Photons have EXACTLY ZERO rest mass (m₀ = 0). Momentum is purely relativistic (p = h/λ).' },
    { id: 7, title: 'Photon Charge', trap: 'Assuming photons can be deflected in electric or magnetic fields.', reality: 'Photons have zero charge (q = 0) and pass undeflected through fields.' },
    { id: 8, title: 'de Broglie Mass Relation', trap: 'Assuming heavier particles have longer wavelengths at equal energy.', reality: 'λ = h/√(2mK). Because mass is in denominator, the lighter electron has a LONGER wavelength.' },
    { id: 9, title: 'Excited State Numbering', trap: 'Confusing 1st excited state with n = 1.', reality: 'Ground state is n = 1. "1st excited state" is n = 2. "2nd excited state" is n = 3.' },
    { id: 10, title: 'Balmer Series Visible Trap', trap: 'Assuming Lyman or Paschen lines can be seen with human eye.', reality: 'Only the Balmer series (n₁ = 2) falls in the visible range (400-700 nm).' },
    { id: 11, title: 'Emission Direction', trap: 'Believing electrons emit light while jumping UP.', reality: 'Excitation (going up) ABSORBS energy; Emission (going down) RELEASES photons.' },
    { id: 12, title: 'Ground State Radiation', trap: 'Thinking ground state electron radiates continuously.', reality: 'Stationary orbits do not radiate. Ground state is unconditionally stable.' },
    { id: 13, title: 'Stopping Potential Independence', trap: 'Thinking stopping potential increases with intensity.', reality: 'Stopping potential depends solely on frequency (eV₀ = hf - ϕ), NOT intensity.' },
    { id: 14, title: 'Pair Production Threshold', trap: 'Assuming 0.51 MeV photon can create a pair.', reality: 'Creating an electron-positron pair requires at least 2 × 0.51 = 1.02 MeV.' }
  ];

  const QUIZ_QUESTIONS = [
    {
      q: 'If the wavelength of an electromagnetic radiation is halved, the energy of its photon is:',
      opts: ['Halved', 'Doubled', 'Unchanged', 'Quadrupled'],
      ans: 1,
      exp: 'E = hc / λ. Halving the wavelength doubles photon energy.',
      trap: 'Inverse proportionality: E ∝ 1/λ.'
    },
    {
      q: 'Which of the following is ZERO for a photon in vacuum?',
      opts: ['Momentum', 'Kinetic Energy', 'Rest Mass', 'Speed'],
      ans: 2,
      exp: 'A photon has zero rest mass (m₀ = 0).',
      trap: 'Photons have relativistic momentum p = h/λ, but zero rest mass.'
    },
    {
      q: 'Increasing the INTENSITY of incident light in photoelectric effect increases:',
      opts: ['Max Kinetic Energy', 'Stopping Potential', 'Photocurrent (emission rate)', 'Threshold frequency'],
      ans: 2,
      exp: 'Intensity increases photon flux, ejecting more photoelectrons per second.',
      trap: 'Intensity = rate/current; Frequency = energy/Kmax.'
    },
    {
      q: 'Light of frequency 2f₀ falls on a metal with threshold frequency f₀. The max kinetic energy is:',
      opts: ['hf₀', '2hf₀', '3hf₀', 'Zero'],
      ans: 0,
      exp: 'Kmax = h(2f₀) - hf₀ = hf₀.'
    },
    {
      q: 'An electron and a proton have the SAME kinetic energy. Which has the LONGER de Broglie wavelength?',
      opts: ['Proton', 'Electron', 'Both identical', 'Neither'],
      ans: 1,
      exp: 'λ = h / √(2mK). Smaller mass m_e yields a longer wavelength.',
      trap: 'Smaller mass = longer matter wave.'
    },
    {
      q: 'The energy of an electron in the 2nd excited state of Hydrogen is:',
      opts: ['-13.6 eV', '-3.40 eV', '-1.51 eV', '-0.85 eV'],
      ans: 2,
      exp: '2nd excited state is n = 3. E₃ = -13.6 / 9 = -1.51 eV.',
      trap: '2nd excited state is n = 3, not n = 2!'
    },
    {
      q: 'Which series of hydrogen spectrum lies in the VISIBLE spectrum?',
      opts: ['Lyman', 'Balmer', 'Paschen', 'Pfund'],
      ans: 1,
      exp: 'Balmer series (n₁ = 2) falls in the visible range (400 - 700 nm).'
    },
    {
      q: 'Total spectral lines possible when de-exciting from n = 4 to ground state is:',
      opts: ['3', '4', '6', '12'],
      ans: 2,
      exp: 'N = n(n - 1) / 2 = 4(3) / 2 = 6 lines.'
    }
  ];

  // 2. TAB SWITCHING
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      navBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = `section-${btn.dataset.tab}`;
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });

  // 3. READING PROGRESS BAR
  const progressBar = document.getElementById('scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (total > 0) {
      const pct = (window.scrollY / total) * 100;
      progressBar.style.width = `${pct}%`;
    }
  });

  // 4. TOPIC RENDERING & SEARCH
  const topicsListEl = document.getElementById('topics-list');
  const searchInput = document.getElementById('topic-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentCategory = 'all';

  function renderTopics() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filtered = TOPICS.filter((t) => {
      const matchesQuery = t.title.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query);
      const matchesCat = currentCategory === 'all' || t.category === currentCategory;
      return matchesQuery && matchesCat;
    });

    topicsListEl.innerHTML = filtered.map((t) => `
      <div class="topic-item" id="topic-${t.id}">
        <div class="topic-header" onclick="this.parentElement.classList.toggle('expanded')">
          <div class="topic-title-group">
            <span class="topic-num">${t.num}</span>
            <div>
              <h3>${t.title}</h3>
            </div>
          </div>
          <span style="font-size: 11px; color: var(--text-dim);">▼</span>
        </div>
        <div class="topic-body">
          <div class="def-box"><strong>Definition:</strong> ${t.definition}</div>
          <ul style="padding-left: 18px; line-height: 1.7;">
            ${t.points.map((p) => `<li>${p}</li>`).join('')}
          </ul>
          ${t.trap ? `<div class="trap-box"><strong>⭐ MDCAT Trap:</strong> ${t.trap}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderTopics);
  }
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      renderTopics();
    });
  });
  renderTopics();

  // 5. PHOTOELECTRIC SIMULATOR
  const peCanvas = document.getElementById('photoelectric-canvas');
  if (peCanvas) {
    const ctx = peCanvas.getContext('2d');
    const metalSelect = document.getElementById('pe-metal-select');
    const wlSlider = document.getElementById('pe-wl-slider');
    const intensitySlider = document.getElementById('pe-intensity-slider');
    const voltageSlider = document.getElementById('pe-voltage-slider');
    const wlVal = document.getElementById('pe-wl-val');
    const intensityVal = document.getElementById('pe-intensity-val');
    const voltageVal = document.getElementById('pe-voltage-val');
    const playBtn = document.getElementById('pe-toggle-play');
    const resetBtn = document.getElementById('pe-reset');

    const metals = {
      Cs: { phi: 2.14, lambda0: 579 },
      K: { phi: 2.30, lambda0: 539 },
      Na: { phi: 2.46, lambda0: 504 },
      Ca: { phi: 2.87, lambda0: 432 },
      Zn: { phi: 4.31, lambda0: 288 },
      Pt: { phi: 6.35, lambda0: 195 }
    };

    let isPlaying = true;
    let particles = [];

    function updatePeTelemetry() {
      const metal = metals[metalSelect.value] || metals.Na;
      const wl = parseFloat(wlSlider.value);
      const intensity = parseFloat(intensitySlider.value);
      const voltage = parseFloat(voltageSlider.value);

      wlVal.textContent = `${wl} nm`;
      intensityVal.textContent = `${intensity}%`;
      voltageVal.textContent = `${voltage > 0 ? '+' : ''}${voltage.toFixed(1)} V`;

      const photonE = 1240 / wl;
      const photonJ = photonE * 1.602e-19;
      const isEmitted = photonE >= metal.phi;
      const kMax = isEmitted ? photonE - metal.phi : 0;
      const kMaxJ = kMax * 1.602e-19;
      const speedKms = isEmitted ? Math.round(Math.sqrt((2 * kMaxJ) / 9.109e-31) / 1000) : 0;

      let current = 0;
      if (isEmitted && intensity > 0) {
        if (voltage <= -kMax) current = 0;
        else if (voltage >= 0) current = (intensity / 100) * 10;
        else current = (intensity / 100) * 10 * ((voltage + kMax) / kMax);
      }

      document.getElementById('pe-energy-ev').textContent = `${photonE.toFixed(2)} eV`;
      document.getElementById('pe-energy-j').textContent = `${(photonJ * 1e19).toFixed(2)} × 10⁻¹⁹ J`;
      document.getElementById('pe-phi-ev').textContent = `${metal.phi.toFixed(2)} eV`;
      document.getElementById('pe-lambda0').textContent = `λ₀ = ${metal.lambda0} nm`;
      document.getElementById('pe-kmax-ev').textContent = `${kMax.toFixed(2)} eV`;
      document.getElementById('pe-speed-kms').textContent = `${speedKms} km/s`;
      document.getElementById('pe-current-readout').textContent = `${current.toFixed(2)} µA`;
      document.getElementById('pe-v0-readout').textContent = `${kMax.toFixed(2)} V`;
    }

    [metalSelect, wlSlider, intensitySlider, voltageSlider].forEach((el) => {
      el.addEventListener('input', updatePeTelemetry);
    });

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        metalSelect.value = 'Na';
        wlSlider.value = 380;
        intensitySlider.value = 60;
        voltageSlider.value = 0;
        updatePeTelemetry();
      });
    }

    function renderPe() {
      const width = (peCanvas.width = peCanvas.parentElement.clientWidth || 600);
      const height = (peCanvas.height = 340);
      ctx.clearRect(0, 0, width, height);

      const metal = metals[metalSelect.value] || metals.Na;
      const wl = parseFloat(wlSlider.value);
      const intensity = parseFloat(intensitySlider.value);
      const voltage = parseFloat(voltageSlider.value);
      const photonE = 1240 / wl;
      const isEmitted = photonE >= metal.phi;
      const kMax = isEmitted ? photonE - metal.phi : 0;

      // Tube
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(width * 0.15, 30, width * 0.7, height - 60, 20);
      ctx.fill();
      ctx.stroke();

      // Cathode plate
      const cathodeX = width * 0.15 + 40;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cathodeX - 5, 60, 10, height - 120);

      // Anode plate
      const anodeX = width * 0.85 - 40;
      ctx.fillRect(anodeX - 5, 60, 10, height - 120);

      // Spawn photons
      if (isPlaying && Math.random() < (intensity / 100) * 0.7) {
        particles.push({
          type: 'photon',
          x: width * 0.1,
          y: 60 + Math.random() * (height - 120),
          vx: 6,
          vy: (Math.random() - 0.5) * 2
        });
      }

      // Update particles
      const nextP = [];
      particles.forEach((p) => {
        if (p.type === 'photon') {
          p.x += p.vx;
          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          if (p.x >= cathodeX) {
            if (isEmitted && isPlaying) {
              const speed = Math.sqrt(kMax) * 2 + 1;
              nextP.push({
                type: 'electron',
                x: cathodeX + 5,
                y: p.y,
                vx: speed,
                vy: (Math.random() - 0.5) * 1.5
              });
            }
          } else {
            nextP.push(p);
          }
        } else {
          p.vx += voltage * 0.05;
          p.x += p.vx;
          p.y += p.vy;

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();

          if (p.x < anodeX && p.x > cathodeX) {
            nextP.push(p);
          }
        }
      });
      particles = nextP;

      if (isPlaying) requestAnimationFrame(renderPe);
    }
    renderPe();
    updatePeTelemetry();
  }

  // 6. BOHR ATOM SIMULATOR
  const bohrCanvas = document.getElementById('bohr-canvas');
  if (bohrCanvas) {
    const ctx = bohrCanvas.getContext('2d');
    const niSelect = document.getElementById('bohr-ni-select');
    const nfSelect = document.getElementById('bohr-nf-select');
    const jumpBtn = document.getElementById('bohr-jump-btn');
    const quickOrbitBtns = document.querySelectorAll('.orbit-btn');

    let currentOrbit = 3;
    let angle = 0;

    const levels = [
      { n: 1, e: -13.6, r: 35 },
      { n: 2, e: -3.4, r: 65 },
      { n: 3, e: -1.51, r: 95 },
      { n: 4, e: -0.85, r: 125 },
      { n: 5, e: -0.54, r: 155 },
      { n: 6, e: -0.38, r: 185 }
    ];

    function updateBohrTelemetry(n1, n2) {
      const e1 = levels.find((l) => l.n === n1).e;
      const e2 = levels.find((l) => l.n === n2).e;
      const deltaE = Math.abs(e1 - e2);
      const wl = deltaE > 0 ? 1240 / deltaE : 0;
      const target = Math.min(n1, n2);

      let series = 'None';
      let region = 'Unknown';
      let line = '';

      if (target === 1) { series = 'Lyman Series'; region = 'Ultraviolet (UV)'; }
      else if (target === 2) {
        series = 'Balmer Series'; region = 'Visible';
        const maxN = Math.max(n1, n2);
        if (maxN === 3) line = 'H-α (Red, 656.3 nm)';
        else if (maxN === 4) line = 'H-β (Cyan, 486.1 nm)';
        else if (maxN === 5) line = 'H-γ (Blue, 434.0 nm)';
        else if (maxN === 6) line = 'H-δ (Violet, 410.2 nm)';
      }
      else if (target === 3) { series = 'Paschen Series'; region = 'Infrared (IR)'; }

      document.getElementById('bohr-delta-e').textContent = `${deltaE.toFixed(2)} eV`;
      document.getElementById('bohr-wl').textContent = `${wl.toFixed(1)} nm`;
      document.getElementById('bohr-series').textContent = series;
      document.getElementById('bohr-region').textContent = region;
      document.getElementById('bohr-line-name').textContent = line || 'Characteristic Line';
    }

    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const n1 = parseInt(niSelect.value);
        const n2 = parseInt(nfSelect.value);
        currentOrbit = n2;
        quickOrbitBtns.forEach((b) => b.classList.toggle('active', parseInt(b.dataset.n) === n2));
        updateBohrTelemetry(n1, n2);
      });
    }

    quickOrbitBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetN = parseInt(btn.dataset.n);
        const prev = currentOrbit;
        currentOrbit = targetN;
        quickOrbitBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        niSelect.value = prev;
        nfSelect.value = targetN;
        updateBohrTelemetry(prev, targetN);
      });
    });

    function renderBohr() {
      const width = (bohrCanvas.width = bohrCanvas.parentElement.clientWidth || 500);
      const height = (bohrCanvas.height = 380);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Concentric Orbits
      levels.forEach((lvl) => {
        ctx.strokeStyle = lvl.n === currentOrbit ? 'rgba(99, 102, 241, 0.7)' : 'rgba(71, 85, 105, 0.3)';
        ctx.lineWidth = lvl.n === currentOrbit ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, lvl.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Nucleus
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Electron
      angle += 0.03 / Math.sqrt(currentOrbit);
      const activeR = levels.find((l) => l.n === currentOrbit).r;
      const ex = cx + Math.cos(angle) * activeR;
      const ey = cy + Math.sin(angle) * activeR;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(ex, ey, 5, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(renderBohr);
    }
    renderBohr();
    updateBohrTelemetry(3, 2);
  }

  // 7. NUMERICAL CALCULATORS
  const calcPhotonWl = document.getElementById('calc-photon-wl');
  const calcPhotonOut = document.getElementById('calc-photon-out');
  function solvePhoton() {
    const wl = parseFloat(calcPhotonWl.value) || 500;
    const e = 1240 / wl;
    const p = 6.63e-34 / (wl * 1e-9);
    calcPhotonOut.innerHTML = `
      <div>E = 1240 / ${wl} = <strong>${e.toFixed(3)} eV</strong> (${(e * 1.6e-19).toExponential(3)} J)</div>
      <div>Momentum p = <strong>${p.toExponential(3)} kg·m/s</strong></div>
    `;
  }
  if (calcPhotonWl) {
    calcPhotonWl.addEventListener('input', solvePhoton);
    solvePhoton();
  }

  const calcPeWl = document.getElementById('calc-pe-wl');
  const calcPePhi = document.getElementById('calc-pe-phi');
  const calcPeOut = document.getElementById('calc-pe-out');
  function solvePe() {
    const wl = parseFloat(calcPeWl.value) || 300;
    const phi = parseFloat(calcPePhi.value) || 2.46;
    const e = 1240 / wl;
    const kMax = Math.max(0, e - phi);
    calcPeOut.innerHTML = `
      <div>Photon E = ${e.toFixed(2)} eV</div>
      <div>Kmax = E - ϕ = <strong>${kMax.toFixed(2)} eV</strong></div>
      <div>Stopping Potential V₀ = <strong>${kMax.toFixed(2)} V</strong></div>
    `;
  }
  if (calcPeWl && calcPePhi) {
    calcPeWl.addEventListener('input', solvePe);
    calcPePhi.addEventListener('input', solvePe);
    solvePe();
  }

  const calcDbV = document.getElementById('calc-db-v');
  const calcDbOut = document.getElementById('calc-db-out');
  function solveDb() {
    const v = parseFloat(calcDbV.value) || 100;
    const lambdaNm = 1.227 / Math.sqrt(v);
    calcDbOut.innerHTML = `
      <div>Shortcut: λ = 1.227 / √${v} nm</div>
      <div>Wavelength λ = <strong>${lambdaNm.toFixed(4)} nm</strong> (${(lambdaNm * 10).toFixed(3)} Å)</div>
    `;
  }
  if (calcDbV) {
    calcDbV.addEventListener('input', solveDb);
    solveDb();
  }

  const calcMassU = document.getElementById('calc-mass-u');
  const calcMassOut = document.getElementById('calc-mass-out');
  function solveMass() {
    const u = parseFloat(calcMassU.value) || 0.02;
    const mev = u * 931.5;
    calcMassOut.innerHTML = `
      <div>E = ${u} u × 931.5 MeV/u</div>
      <div>Released Energy = <strong>${mev.toFixed(3)} MeV</strong></div>
    `;
  }
  if (calcMassU) {
    calcMassU.addEventListener('input', solveMass);
    solveMass();
  }

  // 8. 14 TRAPS INJECTION
  const trapsGrid = document.getElementById('traps-grid');
  if (trapsGrid) {
    trapsGrid.innerHTML = TRAPS.map((t) => `
      <div class="trap-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: var(--amber);">#${t.id}. ${t.title}</strong>
        </div>
        <div style="background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #fecdd3;">
          <strong>Trap:</strong> ${t.trap}
        </div>
        <div style="background: var(--bg-card); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #6ee7b7;">
          <strong>Reality:</strong> ${t.reality}
        </div>
      </div>
    `).join('');
  }

  // 9. QUIZ ENGINE
  let currentQuizIdx = 0;
  let quizAnswers = {};
  let quizSubmitted = false;

  const quizCard = document.getElementById('quiz-question-card');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const quizPrevBtn = document.getElementById('quiz-prev-btn');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizSubmitBtn = document.getElementById('quiz-submit-btn');
  const quizResetBtn = document.getElementById('quiz-reset-btn');

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuizIdx];
    quizProgressText.textContent = `Question ${currentQuizIdx + 1} of ${QUIZ_QUESTIONS.length}`;

    quizCard.innerHTML = `
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px;">${currentQuizIdx + 1}. ${q.q}</h3>
      <div class="quiz-options">
        ${q.opts.map((opt, idx) => {
          let cls = 'quiz-opt-btn';
          if (quizAnswers[currentQuizIdx] === idx) cls += ' selected';
          if (quizSubmitted) {
            if (idx === q.ans) cls += ' correct';
            else if (quizAnswers[currentQuizIdx] === idx) cls += ' wrong';
          }
          return `<button class="${cls}" onclick="window.selectQuizOpt(${idx})">${String.fromCharCode(65 + idx)}. ${opt}</button>`;
        }).join('')}
      </div>
      ${quizSubmitted ? `
        <div style="margin-top: 14px; padding: 10px; background: var(--bg-card); border-radius: 8px; font-size: 12px;">
          <strong style="color: var(--emerald);">Explanation:</strong> ${q.exp}
        </div>
      ` : ''}
    `;
  }

  window.selectQuizOpt = (idx) => {
    if (quizSubmitted) return;
    quizAnswers[currentQuizIdx] = idx;
    renderQuizQuestion();
  };

  if (quizPrevBtn && quizNextBtn && quizSubmitBtn) {
    quizPrevBtn.addEventListener('click', () => {
      if (currentQuizIdx > 0) { currentQuizIdx--; renderQuizQuestion(); }
    });
    quizNextBtn.addEventListener('click', () => {
      if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) { currentQuizIdx++; renderQuizQuestion(); }
    });
    quizSubmitBtn.addEventListener('click', () => {
      quizSubmitted = true;
      let score = 0;
      QUIZ_QUESTIONS.forEach((q, idx) => {
        if (quizAnswers[idx] === q.ans) score++;
      });
      document.getElementById('quiz-score-live').textContent = `Score: ${score} / ${QUIZ_QUESTIONS.length}`;
      renderQuizQuestion();
    });
    if (quizResetBtn) {
      quizResetBtn.addEventListener('click', () => {
        currentQuizIdx = 0;
        quizAnswers = {};
        quizSubmitted = false;
        document.getElementById('quiz-score-live').textContent = 'Score: 0';
        renderQuizQuestion();
      });
    }
    renderQuizQuestion();
  }

  // 10. CONSTANTS & FORMULAS INJECTION
  const constGrid = document.getElementById('constants-grid');
  const formGrid = document.getElementById('formulas-grid');

  if (constGrid) {
    const constants = [
      { name: "Planck's constant (h)", val: '6.63 × 10⁻³⁴ J·s' },
      { name: 'Speed of light (c)', val: '3.0 × 10⁸ m/s' },
      { name: 'Elementary charge (e)', val: '1.6 × 10⁻¹⁹ C' },
      { name: 'Electron mass (m_e)', val: '9.11 × 10⁻³¹ kg' },
      { name: '1 u in MeV', val: '931.5 MeV' }
    ];
    constGrid.innerHTML = constants.map((c) => `
      <div class="constant-item">
        <span style="font-size: 11px; color: var(--text-dim);">${c.name}</span>
        <div style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--cyan);">${c.val}</div>
      </div>
    `).join('');
  }

  if (formGrid) {
    const formulas = [
      { title: 'Photon Energy', math: 'E = hf = hc / λ' },
      { title: 'Photoelectric Equation', math: 'hf = ϕ + Kmax = hf₀ + eV₀' },
      { title: 'de Broglie Matter Wavelength', math: 'λ = h / p = h / (mv)' },
      { title: 'Hydrogen Energy Levels', math: 'Eₙ = -13.6 / n² eV' },
      { title: 'Rydberg Equation', math: '1/λ = R_H (1/n₁² - 1/n₂²)' },
      { title: 'Mass-Energy Equivalence', math: 'E = mc² (1 u = 931.5 MeV)' }
    ];
    formGrid.innerHTML = formulas.map((f) => `
      <div class="formula-item">
        <h4>${f.title}</h4>
        <div class="formula-math">${f.math}</div>
      </div>
    `).join('');
  }
});
