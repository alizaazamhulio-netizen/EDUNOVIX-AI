/**
 * ==========================================================================
 * MDCAT PHYSICS: ELECTROSTATICS INTERACTIVE ENGINE
 * High-Yield Physics Interactive Learning & Assessment System
 * ==========================================================================
 */

(function () {
  'use strict';

  // Constants
  const K_CONSTANT = 8.9875517923e9; // N·m²/C² ≈ 9 × 10⁹
  const EPSILON_0 = 8.854187817e-12; // C²/(N·m²) or F/m
  const ELEC_CHARGE = 1.602176634e-19; // C

  /* --------------------------------------------------------------------------
   * 1. 28 AUTHENTIC MDCAT MCQS DATABASE
   * -------------------------------------------------------------------------- */
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "If a body possesses a net negative charge of 1 Coulomb, how many excess electrons are present on it?",
      options: [
        "1.6 × 10⁻¹⁹ electrons",
        "6.25 × 10¹⁸ electrons",
        "6.25 × 10¹⁹ electrons",
        "9.0 × 10⁹ electrons"
      ],
      correctIndex: 1,
      explanation: "Using the quantization formula q = n·e: n = q / e = 1 / (1.602 × 10⁻¹⁹) = 6.25 × 10¹⁸ electrons."
    },
    {
      id: 2,
      question: "When a neutral glass rod is rubbed with silk cloth and becomes positively charged, its mass:",
      options: [
        "Increases slightly",
        "Decreases slightly",
        "Remains exactly constant",
        "First increases then decreases"
      ],
      correctIndex: 1,
      explanation: "A body becomes positively charged by losing electrons. Since electrons have mass (m_e = 9.1 × 10⁻³¹ kg), losing electrons decreases its mass slightly."
    },
    {
      id: 3,
      question: "Two stationary point charges exert a force F on each other in vacuum. If a dielectric medium of relative permittivity ε_r = 5 is placed between them, the new electrostatic force becomes:",
      options: [
        "5 F",
        "25 F",
        "F / 5",
        "F / 25"
      ],
      correctIndex: 2,
      explanation: "Coulomb's force in a dielectric medium is given by F_med = F_vac / ε_r. For ε_r = 5, the new force is F / 5."
    },
    {
      id: 4,
      question: "If the separation distance between two point charges is halved, the electrostatic force between them:",
      options: [
        "Is halved",
        "Doubles",
        "Increases fourfold",
        "Decreases to one-fourth"
      ],
      correctIndex: 2,
      explanation: "According to Coulomb's inverse-square law, F ∝ 1/r². If r becomes r/2, F becomes 1/(1/2)² = 4 times the original value."
    },
    {
      id: 5,
      question: "Which of the following statements regarding the vector form of Coulomb's Law is TRUE?",
      options: [
        "F₁₂ = F₂₁ (vectors are identical)",
        "F₁₂ = -F₂₁ (obeys Newton's Third Law)",
        "Coulomb's force is a non-central force",
        "Coulomb's constant k depends on the speed of charges"
      ],
      correctIndex: 1,
      explanation: "Electrostatic forces form an action-reaction pair obeying Newton's Third Law: F₁₂ = -F₂₁. It acts strictly along the line joining charge centers (central force)."
    },
    {
      id: 6,
      question: "The SI unit of electric field intensity (E) is equivalent to:",
      options: [
        "Joule / Coulomb",
        "Volt · meter",
        "Volt / meter",
        "Newton · meter"
      ],
      correctIndex: 2,
      explanation: "Electric field intensity is measured in N/C. Since 1 N/C = (1 J/m) / C = (1 J/C) / m = 1 Volt/meter (V/m)."
    },
    {
      id: 7,
      question: "Electric field lines never cross each other because:",
      options: [
        "They are closed circular loops",
        "They originate from negative charges",
        "At the point of intersection, there would be two distinct field directions, which is physically impossible",
        "Electric fields are non-conservative"
      ],
      correctIndex: 2,
      explanation: "A tangent to a field line gives the direction of electric force. If two lines crossed, a test charge placed at the intersection would experience two simultaneous directions of force, which is impossible."
    },
    {
      id: 8,
      question: "A flat rectangular surface of area A is held parallel to a uniform electric field E. The electric flux through the surface is:",
      options: [
        "E · A",
        "0",
        "E · A / 2",
        "E · A / ε₀"
      ],
      correctIndex: 1,
      explanation: "When the surface is parallel to the field, its normal vector is perpendicular to E (θ = 90°). Thus Φ = EA cos(90°) = 0."
    },
    {
      id: 9,
      question: "The total electric flux emerging from a closed surface enclosing a dipole consisting of +q and -q is:",
      options: [
        "2q / ε₀",
        "q / ε₀",
        "Zero",
        "q / (2ε₀)"
      ],
      correctIndex: 2,
      explanation: "By Gauss's Law, Φ = Q_enclosed / ε₀. For an electric dipole, the total enclosed charge is (+q) + (-q) = 0. Therefore, net flux is 0."
    },
    {
      id: 10,
      question: "The electric field intensity inside a uniformly charged hollow spherical conductor in electrostatic equilibrium is:",
      options: [
        "Zero",
        "kQ / R²",
        "kQ / R",
        "Infinite"
      ],
      correctIndex: 0,
      explanation: "All charge resides on the outer surface of a conductor. Inside the hollow cavity, enclosed charge is zero, so by Gauss's Law, E_inside = 0 (Electrostatic Shielding)."
    },
    {
      id: 11,
      question: "The electric field intensity E at a distance r from an infinite plane sheet of uniform surface charge density σ is:",
      options: [
        "σ / ε₀",
        "σ / (2ε₀)",
        "2σ / ε₀",
        "σ / (4πε₀r²)"
      ],
      correctIndex: 1,
      explanation: "By applying Gauss's Law to a cylindrical Gaussian pillbox piercing the infinite sheet, E = σ / (2ε₀), which is independent of the distance r from the sheet."
    },
    {
      id: 12,
      question: "Electric potential at a distance r from an isolated positive point charge Q is proportional to:",
      options: [
        "1 / r²",
        "1 / r",
        "r",
        "r²"
      ],
      correctIndex: 1,
      explanation: "Electric potential of a point charge is V = kQ / r. Thus V is inversely proportional to r (unlike electric field which is proportional to 1/r²)."
    },
    {
      id: 13,
      question: "The negative sign in the potential gradient relation E = -ΔV/Δr signifies that:",
      options: [
        "Electric field is always negative",
        "Electric field points in the direction of decreasing electric potential",
        "Work done is always negative",
        "Potential increases as distance increases"
      ],
      correctIndex: 1,
      explanation: "The negative sign indicates that the electric field vector always points downhill in the direction in which electric potential decreases most rapidly."
    },
    {
      id: 14,
      question: "How much work is required to move a charge of +5 μC across two points on the same equipotential surface separated by 20 cm?",
      options: [
        "100 μJ",
        "20 μJ",
        "Zero",
        "1.0 J"
      ],
      correctIndex: 2,
      explanation: "On an equipotential surface, the potential difference ΔV = 0. Work done W = q · ΔV = q · 0 = 0."
    },
    {
      id: 15,
      question: "1 Electron-Volt (1 eV) is equal to:",
      options: [
        "1.6 × 10⁻¹⁹ Joules",
        "9.1 × 10⁻³¹ Joules",
        "6.25 × 10¹⁸ Joules",
        "1.6 × 10⁻¹⁶ Joules"
      ],
      correctIndex: 0,
      explanation: "1 eV is the kinetic energy gained by an electron accelerated through 1 Volt: 1 eV = (1.602 × 10⁻¹⁹ C)(1 V) = 1.602 × 10⁻¹⁹ J."
    },
    {
      id: 16,
      question: "If a parallel plate capacitor has plate area A and separation d, its capacitance in vacuum is given by:",
      options: [
        "ε₀ · d / A",
        "ε₀ · A / d",
        "A · d / ε₀",
        "ε₀ / (A · d)"
      ],
      correctIndex: 1,
      explanation: "The capacitance of a parallel plate capacitor in vacuum is C = ε₀ A / d."
    },
    {
      id: 17,
      question: "When a dielectric slab (ε_r > 1) is inserted between the plates of an ISOLATED (disconnected from battery) charged capacitor:",
      options: [
        "Charge increases, potential difference decreases",
        "Charge remains constant, potential difference decreases",
        "Capacitance decreases, electric field increases",
        "Stored energy increases, charge increases"
      ],
      correctIndex: 1,
      explanation: "When disconnected, charge Q is trapped and remains constant. Capacitance increases (C = ε_r C₀), so voltage V = Q/C decreases by factor of ε_r."
    },
    {
      id: 18,
      question: "When a dielectric slab is inserted while the capacitor remains CONNECTED to a constant voltage battery:",
      options: [
        "Potential difference decreases",
        "Stored charge remains constant",
        "Stored charge increases and stored energy increases",
        "Capacitance decreases"
      ],
      correctIndex: 2,
      explanation: "With the battery connected, V remains constant. Capacitance increases to ε_r C₀, so stored charge Q = C·V increases, and stored energy U = ½CV² also increases by ε_r."
    },
    {
      id: 19,
      question: "Three identical capacitors each of capacitance C are connected in SERIES. Their equivalent capacitance is:",
      options: [
        "3 C",
        "C / 3",
        "C / 9",
        "9 C"
      ],
      correctIndex: 1,
      explanation: "For n identical capacitors in series: 1/C_eq = n/C ⟹ C_eq = C/n. For n = 3, C_eq = C / 3."
    },
    {
      id: 20,
      question: "Three identical capacitors each of capacitance 6 μF are connected in PARALLEL. Their equivalent capacitance is:",
      options: [
        "2 μF",
        "6 μF",
        "18 μF",
        "36 μF"
      ],
      correctIndex: 2,
      explanation: "In parallel, capacitances add directly: C_eq = C₁ + C₂ + C₃ = 6 + 6 + 6 = 18 μF (or C_eq = n·C = 3 × 6 = 18 μF)."
    },
    {
      id: 21,
      question: "Two capacitors of 3 μF and 6 μF are connected in series. The equivalent capacitance is:",
      options: [
        "9 μF",
        "2 μF",
        "4.5 μF",
        "18 μF"
      ],
      correctIndex: 1,
      explanation: "For two capacitors in series: C_eq = (C₁ · C₂) / (C₁ + C₂) = (3 × 6) / (3 + 6) = 18 / 9 = 2 μF."
    },
    {
      id: 22,
      question: "The electrostatic energy stored in a charged capacitor is stored in:",
      options: [
        "The metallic plates only",
        "The connecting wires",
        "The electric field established between the plates",
        "The positive charges only"
      ],
      correctIndex: 2,
      explanation: "Electrostatic potential energy in a capacitor is stored directly within the electric field in the volume between the plates with energy density u = ½ε₀ε_r E²."
    },
    {
      id: 23,
      question: "If the potential difference across a capacitor is DOUBLED, its stored electrostatic energy:",
      options: [
        "Doubles",
        "Quadruples (increases 4 times)",
        "Is halved",
        "Remains unchanged"
      ],
      correctIndex: 1,
      explanation: "Since U = ½ C V², stored energy is directly proportional to V². If V is doubled, U increases by (2)² = 4 times."
    },
    {
      id: 24,
      question: "The SI unit of electrostatic energy density (u) is:",
      options: [
        "Joule / meter",
        "Joule / meter²",
        "Joule / meter³",
        "Newton / meter²"
      ],
      correctIndex: 2,
      explanation: "Energy density is energy stored per unit volume: u = Energy / Volume = Joules / m³ (J/m³)."
    },
    {
      id: 25,
      question: "The product of Resistance (R) and Capacitance (C) has the SI dimensions of:",
      options: [
        "Current [I]",
        "Time [T]",
        "Frequency [T⁻¹]",
        "Velocity [L T⁻¹]"
      ],
      correctIndex: 1,
      explanation: "The RC time constant τ = R·C. [R] = V/I, [C] = Q/V ⟹ [RC] = (V/I) · (Q/V) = Q/I = Time [T]. Unit is seconds (s)."
    },
    {
      id: 26,
      question: "During charging of an RC circuit, the charge on the capacitor reaches 63.2% of its maximum value in a time equal to:",
      options: [
        "0.5 RC",
        "1 RC (One Time Constant)",
        "2 RC",
        "5 RC"
      ],
      correctIndex: 1,
      explanation: "At t = τ = RC, q(t) = q₀(1 - e⁻¹) = q₀(1 - 0.368) = 0.632 q₀ (63.2% of maximum equilibrium charge)."
    },
    {
      id: 27,
      question: "An electric dipole placed in a uniform electric field experiences:",
      options: [
        "Only net force, zero torque",
        "Only net torque, zero net force",
        "Both net force and net torque",
        "Neither force nor torque"
      ],
      correctIndex: 1,
      explanation: "In a uniform field, the equal and opposite forces (+qE and -qE) sum to zero net force (F_net = 0), but form a couple producing a net torque τ = p × E = pE sin(θ)."
    },
    {
      id: 28,
      question: "A charge q is placed at the center of an imaginary cube of side a. The electric flux emerging through ONE of its six faces is:",
      options: [
        "q / ε₀",
        "q / (6ε₀)",
        "q / (4πε₀)",
        "6q / ε₀"
      ],
      correctIndex: 1,
      explanation: "Total flux through the entire 6-faced cube is Φ_total = q / ε₀. By symmetry, the flux through any single face is (1/6) · (q / ε₀) = q / (6ε₀)."
    }
  ];

  /* --------------------------------------------------------------------------
   * 2. CHECKLIST MASTERY ITEMS
   * -------------------------------------------------------------------------- */
  const CHECKLIST_ITEMS = [
    "Quantization of charge (q = n·e) & calculation of electrons in 1C",
    "Coulomb's Law in vacuum (F = k·q₁q₂/r²) and inverse-square relation",
    "Effect of dielectric medium on electrostatic force (F_med = F_vac / ε_r)",
    "Vector form of Coulomb's Law & Newton's 3rd Law action-reaction pair",
    "Electric field intensity (E = F/q₀ = kQ/r²) and unit equivalence (N/C = V/m)",
    "Properties of electric field lines (never cross, perpendicular to conductor)",
    "Electric flux formula (Φ = E·A·cos θ) and angle traps (plane vs normal)",
    "Gauss's Law formula (Φ = Q_enc / ε₀) and 3 classic applications",
    "Electrostatic shielding principle (E = 0 inside hollow conductor)",
    "Electric potential (V = kQ/r) and potential gradient (E = -ΔV/Δr)",
    "Work done on equipotential surface is strictly zero",
    "Parallel plate capacitance formula (C = ε_r ε₀ A / d)",
    "Golden table: Dielectric insertion (battery connected vs disconnected)",
    "Series combinations (1/C_eq = Σ1/C_i, Q same) vs Parallel (C_eq = ΣC_i, V same)",
    "Stored energy formulas (U = ½CV² = ½QV = Q²/2C) and energy density",
    "RC circuit time constant (τ = RC, 63.2% charging, unit is seconds)"
  ];

  /* --------------------------------------------------------------------------
   * 3. APPLICATION STATE
   * -------------------------------------------------------------------------- */
  let currentQuizIndex = 0;
  let userQuizAnswers = {}; // { questionIndex: chosenOptionIndex }
  let visualizerMode = 'dipole'; // 'dipole' or 'like'
  let animFrameId = null;

  /* --------------------------------------------------------------------------
   * 4. DOM READY INITIALIZATION
   * -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initScrollProgress();
    initStickySubnav();
    initHeroVisualizer();
    initFormulaCopy();
    initCalculators();
    initNumericalsAccordion();
    initQuizEngine();
    initChecklist();
    initSearch();
    initJumpButtons();
    initBackToTop();
    initKaTeXAutoRender();
  });

  /* --------------------------------------------------------------------------
   * 5. THEME TOGGLE (DARK / LIGHT)
   * -------------------------------------------------------------------------- */
  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('mdcat_electro_theme') || 'theme-light';

    document.body.className = savedTheme;
    updateThemeIcon(savedTheme, themeIcon);

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const isDark = document.body.classList.contains('theme-dark');
        const newTheme = isDark ? 'theme-light' : 'theme-dark';
        document.body.className = newTheme;
        localStorage.setItem('mdcat_electro_theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
      });
    }
  }

  function updateThemeIcon(theme, iconEl) {
    if (!iconEl) return;
    iconEl.textContent = theme === 'theme-dark' ? '☀️' : '🌙';
  }

  /* --------------------------------------------------------------------------
   * 6. SCROLL PROGRESS BAR
   * -------------------------------------------------------------------------- */
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
   * 7. STICKY SUBNAV HIGHLIGHT ON SCROLL
   * -------------------------------------------------------------------------- */
  function initStickySubnav() {
    const links = document.querySelectorAll('.subnav-link');
    if (!links.length) return;

    const sections = [];
    links.forEach(link => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const sec = document.querySelector(targetId);
        if (sec) {
          sections.push({ id: targetId, element: sec, link: link });
        }
      }
    });

    window.addEventListener('scroll', function () {
      const scrollPos = window.scrollY + 140;
      let currentSecId = null;

      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].element.offsetTop;
        const height = sections[i].element.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSecId = sections[i].id;
          break;
        }
      }

      if (currentSecId) {
        links.forEach(link => {
          if (link.getAttribute('href') === currentSecId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
   * 8. INTERACTIVE FIELD CANVAS VISUALIZER
   * -------------------------------------------------------------------------- */
  function initHeroVisualizer() {
    const canvas = document.getElementById('hero-field-canvas');
    const btnDipole = document.getElementById('btn-dipole-mode');
    const btnLike = document.getElementById('btn-like-mode');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas resolution for crisp rendering
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (btnDipole && btnLike) {
      btnDipole.addEventListener('click', function () {
        visualizerMode = 'dipole';
        btnDipole.classList.add('active');
        btnLike.classList.remove('active');
      });
      btnLike.addEventListener('click', function () {
        visualizerMode = 'like';
        btnLike.classList.add('active');
        btnDipole.classList.remove('active');
      });
    }

    // Particle tracer simulation for field lines
    let particles = [];
    const NUM_PARTICLES = 45;

    function resetParticles() {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
          x: Math.random() * 360,
          y: Math.random() * 240,
          vx: 0,
          vy: 0,
          life: Math.random() * 120 + 30
        });
      }
    }
    resetParticles();

    function renderField() {
      const width = canvas.getBoundingClientRect().width || 360;
      const height = canvas.getBoundingClientRect().height || 240;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Charge positions
      const c1 = { x: width * 0.3, y: height * 0.5, q: 1 }; // Positive Charge
      const c2 = { x: width * 0.7, y: height * 0.5, q: visualizerMode === 'dipole' ? -1 : 1 };

      // Draw Field Vectors & Particles
      particles.forEach(p => {
        // Compute net E vector at (p.x, p.y)
        const dx1 = p.x - c1.x;
        const dy1 = p.y - c1.y;
        const r1Sq = dx1 * dx1 + dy1 * dy1 + 400;
        const r1 = Math.sqrt(r1Sq);
        const e1 = (c1.q / r1Sq);

        const dx2 = p.x - c2.x;
        const dy2 = p.y - c2.y;
        const r2Sq = dx2 * dx2 + dy2 * dy2 + 400;
        const r2 = Math.sqrt(r2Sq);
        const e2 = (c2.q / r2Sq);

        const ex = e1 * (dx1 / r1) + e2 * (dx2 / r2);
        const ey = e1 * (dy1 / r1) + e2 * (dy2 / r2);
        const mag = Math.sqrt(ex * ex + ey * ey);

        if (mag > 0.0001) {
          p.x += (ex / mag) * 1.6;
          p.y += (ey / mag) * 1.6;
        }

        p.life--;
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height || (r1 < 12) || (r2 < 12)) {
          // Re-spawn near charge 1
          const angle = Math.random() * Math.PI * 2;
          p.x = c1.x + Math.cos(angle) * 18;
          p.y = c1.y + Math.sin(angle) * 18;
          p.life = Math.random() * 140 + 40;
        }

        // Draw particle dot
        ctx.fillStyle = visualizerMode === 'dipole' ? 'rgba(0, 210, 255, 0.75)' : 'rgba(167, 139, 250, 0.75)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Field Lines Static Curves
      const numLines = 16;
      ctx.strokeStyle = visualizerMode === 'dipole' ? 'rgba(0, 210, 255, 0.22)' : 'rgba(167, 139, 250, 0.22)';
      ctx.lineWidth = 1.2;

      for (let i = 0; i < numLines; i++) {
        const theta = (i / numLines) * Math.PI * 2;
        let lx = c1.x + Math.cos(theta) * 14;
        let ly = c1.y + Math.sin(theta) * 14;

        ctx.beginPath();
        ctx.moveTo(lx, ly);

        for (let step = 0; step < 75; step++) {
          const dx1 = lx - c1.x;
          const dy1 = ly - c1.y;
          const r1Sq = dx1 * dx1 + dy1 * dy1 + 200;
          const r1 = Math.sqrt(r1Sq);
          const e1 = (c1.q / r1Sq);

          const dx2 = lx - c2.x;
          const dy2 = ly - c2.y;
          const r2Sq = dx2 * dx2 + dy2 * dy2 + 200;
          const r2 = Math.sqrt(r2Sq);
          const e2 = (c2.q / r2Sq);

          const ex = e1 * (dx1 / r1) + e2 * (dx2 / r2);
          const ey = e1 * (dy1 / r1) + e2 * (dy2 / r2);
          const mag = Math.sqrt(ex * ex + ey * ey);

          if (mag < 0.0001) break;
          lx += (ex / mag) * 3;
          ly += (ey / mag) * 3;
          ctx.lineTo(lx, ly);

          if (lx < 0 || lx > width || ly < 0 || ly > height || (visualizerMode === 'dipole' && r2 < 14)) {
            break;
          }
        }
        ctx.stroke();
      }

      // Draw Charge 1 (+ Positive)
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#DC2626'; // Red for Positive
      ctx.beginPath();
      ctx.arc(c1.x, c1.y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', c1.x, c1.y);

      // Draw Charge 2
      ctx.fillStyle = visualizerMode === 'dipole' ? '#2563EB' : '#DC2626'; // Blue for Negative, Red for Positive
      ctx.beginPath();
      ctx.arc(c2.x, c2.y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(visualizerMode === 'dipole' ? '−' : '+', c2.x, c2.y);

      animFrameId = requestAnimationFrame(renderField);
    }

    renderField();
  }

  /* --------------------------------------------------------------------------
   * 9. FORMULA CLIPBOARD COPY & TOAST
   * -------------------------------------------------------------------------- */
  function initFormulaCopy() {
    const copyBtns = document.querySelectorAll('.btn-copy-formula');
    const toast = document.getElementById('toast-message');

    copyBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const formula = this.getAttribute('data-formula') || this.innerText;
        copyToClipboard(formula);
        showToast('Formula copied to clipboard: ' + formula);
      });
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.warn('Copy fallback failed', err);
    }
    document.body.removeChild(textArea);
  }

  let toastTimeout = null;
  function showToast(message) {
    const toast = document.getElementById('toast-message');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  /* --------------------------------------------------------------------------
   * 10. INTERACTIVE CALCULATORS
   * -------------------------------------------------------------------------- */
  function initCalculators() {
    // 1. Coulomb's Law Force
    const btnCoulomb = document.getElementById('btn-calc-coulomb');
    const btnResetCoulomb = document.getElementById('btn-reset-coulomb');
    if (btnCoulomb) {
      btnCoulomb.addEventListener('click', calculateCoulombForce);
    }
    if (btnResetCoulomb) {
      btnResetCoulomb.addEventListener('click', function () {
        document.getElementById('coulomb-q1').value = '2';
        document.getElementById('coulomb-q2').value = '-8';
        document.getElementById('coulomb-r').value = '20';
        document.getElementById('coulomb-er').value = '1';
        document.getElementById('coulomb-output').innerHTML = '<div class="out-val">Ready for calculation.</div>';
      });
    }

    // 2. Electric Field Intensity
    const btnEfield = document.getElementById('btn-calc-efield');
    const btnResetEfield = document.getElementById('btn-reset-efield');
    if (btnEfield) {
      btnEfield.addEventListener('click', calculateElectricField);
    }
    if (btnResetEfield) {
      btnResetEfield.addEventListener('click', function () {
        document.getElementById('efield-q').value = '5';
        document.getElementById('efield-r').value = '30';
        document.getElementById('efield-output').innerHTML = '<div class="out-val">Ready for calculation.</div>';
      });
    }

    // 3. Parallel Plate Capacitance
    const btnCap = document.getElementById('btn-calc-cap');
    const btnResetCap = document.getElementById('btn-reset-cap');
    if (btnCap) {
      btnCap.addEventListener('click', calculateCapacitance);
    }
    if (btnResetCap) {
      btnResetCap.addEventListener('click', function () {
        document.getElementById('cap-area').value = '100';
        document.getElementById('cap-dist').value = '2';
        document.getElementById('cap-er').value = '4';
        document.getElementById('cap-output').innerHTML = '<div class="out-val">Ready for calculation.</div>';
      });
    }

    // 4. Capacitor Stored Energy
    const btnEnergy = document.getElementById('btn-calc-energy');
    const btnResetEnergy = document.getElementById('btn-reset-energy');
    if (btnEnergy) {
      btnEnergy.addEventListener('click', calculateStoredEnergy);
    }
    if (btnResetEnergy) {
      btnResetEnergy.addEventListener('click', function () {
        document.getElementById('energy-c').value = '50';
        document.getElementById('energy-v').value = '12';
        document.getElementById('energy-output').innerHTML = '<div class="out-val">Ready for calculation.</div>';
      });
    }
  }

  function calculateCoulombForce() {
    const q1Micro = parseFloat(document.getElementById('coulomb-q1').value);
    const q2Micro = parseFloat(document.getElementById('coulomb-q2').value);
    const rCm = parseFloat(document.getElementById('coulomb-r').value);
    const er = parseFloat(document.getElementById('coulomb-er').value) || 1;
    const output = document.getElementById('coulomb-output');

    if (isNaN(q1Micro) || isNaN(q2Micro) || isNaN(rCm) || isNaN(er) || rCm <= 0 || er < 1) {
      output.innerHTML = '<span style="color:var(--red-accent);">⚠️ Please enter valid positive values for distance r (>0) and relative permittivity ε_r (≥1).</span>';
      return;
    }

    const q1 = q1Micro * 1e-6;
    const q2 = q2Micro * 1e-6;
    const r = rCm / 100; // to meters

    const forceMag = (K_CONSTANT * Math.abs(q1 * q2)) / (er * (r * r));
    const isAttractive = (q1 * q2) < 0;
    const nature = isAttractive ? 'Attractive (Opposite charges)' : 'Repulsive (Like charges)';
    const color = isAttractive ? 'var(--royal-blue)' : 'var(--red-accent)';

    output.innerHTML = `
      <div class="out-val" style="color: ${color}; font-size: 1.15rem; margin-bottom: 0.35rem;">
        Force F = ${forceMag.toExponential(4)} N (${forceMag.toFixed(3)} N)
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        • <strong>Nature:</strong> ${nature}<br>
        • <strong>Given:</strong> q₁ = ${q1Micro} μC, q₂ = ${q2Micro} μC, r = ${r} m, ε_r = ${er}<br>
        • <strong>Substitution:</strong> F = (9×10⁹ × |${q1Micro}×10⁻⁶ × ${q2Micro}×10⁻⁶|) / (${er} × ${r}²)
      </div>
    `;
  }

  function calculateElectricField() {
    const qMicro = parseFloat(document.getElementById('efield-q').value);
    const rCm = parseFloat(document.getElementById('efield-r').value);
    const output = document.getElementById('efield-output');

    if (isNaN(qMicro) || isNaN(rCm) || rCm <= 0) {
      output.innerHTML = '<span style="color:var(--red-accent);">⚠️ Please enter a valid distance r > 0.</span>';
      return;
    }

    const q = qMicro * 1e-6;
    const r = rCm / 100; // to meters
    const fieldMag = (K_CONSTANT * Math.abs(q)) / (r * r);
    const direction = q >= 0 ? 'Radially Outward (+ charge)' : 'Radially Inward (− charge)';

    output.innerHTML = `
      <div class="out-val" style="font-size: 1.15rem; margin-bottom: 0.35rem;">
        E = ${fieldMag.toExponential(4)} N/C (or V/m)
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        • <strong>Direction:</strong> ${direction}<br>
        • <strong>Value in Standard Form:</strong> ${(fieldMag / 1e5).toFixed(3)} × 10⁵ N/C<br>
        • <strong>Formula:</strong> E = (9 × 10⁹ × |${qMicro} × 10⁻⁶|) / (${r}²)
      </div>
    `;
  }

  function calculateCapacitance() {
    const areaCm2 = parseFloat(document.getElementById('cap-area').value);
    const distMm = parseFloat(document.getElementById('cap-dist').value);
    const er = parseFloat(document.getElementById('cap-er').value) || 1;
    const output = document.getElementById('cap-output');

    if (isNaN(areaCm2) || isNaN(distMm) || isNaN(er) || areaCm2 <= 0 || distMm <= 0 || er < 1) {
      output.innerHTML = '<span style="color:var(--red-accent);">⚠️ Please enter valid positive dimensions and dielectric constant.</span>';
      return;
    }

    const areaM2 = areaCm2 * 1e-4; // cm² to m²
    const distM = distMm * 1e-3;   // mm to m
    const capFarads = (er * EPSILON_0 * areaM2) / distM;
    const capPf = capFarads * 1e12;
    const capNf = capFarads * 1e9;
    const capMicroF = capFarads * 1e6;

    output.innerHTML = `
      <div class="out-val" style="font-size: 1.15rem; margin-bottom: 0.35rem;">
        C = ${capPf.toFixed(2)} pF (${capNf.toFixed(4)} nF)
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        • <strong>In Farads:</strong> ${capFarads.toExponential(4)} F<br>
        • <strong>Area:</strong> ${areaCm2} cm² = ${areaM2} m² | <strong>d:</strong> ${distMm} mm = ${distM} m<br>
        • <strong>Formula:</strong> C = (${er} × 8.854×10⁻¹² × ${areaM2}) / ${distM}
      </div>
    `;
  }

  function calculateStoredEnergy() {
    const capMicroF = parseFloat(document.getElementById('energy-c').value);
    const voltage = parseFloat(document.getElementById('energy-v').value);
    const output = document.getElementById('energy-output');

    if (isNaN(capMicroF) || isNaN(voltage) || capMicroF <= 0) {
      output.innerHTML = '<span style="color:var(--red-accent);">⚠️ Please enter valid positive values for capacitance and voltage.</span>';
      return;
    }

    const cFarads = capMicroF * 1e-6;
    const energyJoules = 0.5 * cFarads * (voltage * voltage);
    const chargeCoulombs = cFarads * voltage;
    const energyMilliJoules = energyJoules * 1000;
    const chargeMicroC = chargeCoulombs * 1e6;

    output.innerHTML = `
      <div class="out-val" style="font-size: 1.15rem; margin-bottom: 0.35rem;">
        Energy U = ${energyMilliJoules.toFixed(3)} mJ (${energyJoules.toExponential(4)} J)
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        • <strong>Stored Charge (Q = CV):</strong> ${chargeMicroC.toFixed(2)} μC (${chargeCoulombs.toExponential(3)} C)<br>
        • <strong>Work Done by Battery (W = QV):</strong> ${(energyJoules * 2 * 1000).toFixed(3)} mJ<br>
        • <strong>Note:</strong> Exactly 50% of battery energy is stored as electrostatic field; 50% is dissipated as heat during charging.
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
   * 11. SOLVED NUMERICALS ACCORDION
   * -------------------------------------------------------------------------- */
  function initNumericalsAccordion() {
    const toggleBtns = document.querySelectorAll('.btn-toggle-sol');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.num-item-card');
        if (!card) return;
        const solDiv = card.querySelector('.num-item-sol');
        if (!solDiv) return;

        const isOpen = solDiv.classList.contains('open');
        if (isOpen) {
          solDiv.classList.remove('open');
          this.textContent = 'Show Solution ↓';
        } else {
          solDiv.classList.add('open');
          this.textContent = 'Hide Solution ↑';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 12. 28 MCQS QUIZ ENGINE
   * -------------------------------------------------------------------------- */
  function initQuizEngine() {
    const qHeading = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options-list');
    const trackerText = document.getElementById('quiz-tracker-text');
    const scoreNum = document.getElementById('quiz-score-num');
    const scorePct = document.getElementById('quiz-score-pct');
    const progressFill = document.getElementById('quiz-progress-fill');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');
    const btnReset = document.getElementById('btn-quiz-reset');

    if (!qHeading || !optionsContainer) return;

    function renderCurrentQuestion() {
      const q = QUIZ_QUESTIONS[currentQuizIndex];
      if (!q) return;

      // Update Tracker & Progress
      if (trackerText) trackerText.textContent = `Question ${currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`;
      if (progressFill) {
        const pct = ((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100;
        progressFill.style.width = pct + '%';
      }

      // Update Question text
      qHeading.innerHTML = `<strong>Q${currentQuizIndex + 1}:</strong> ${q.question}`;

      // Update Options
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const hasAnswered = userQuizAnswers.hasOwnProperty(currentQuizIndex);
      const chosenIdx = userQuizAnswers[currentQuizIndex];

      q.options.forEach((optText, idx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-opt-btn';
        optBtn.innerHTML = `<span class="quiz-opt-letter">${letters[idx]}</span> <span>${optText}</span>`;

        if (hasAnswered) {
          optBtn.disabled = true;
          if (idx === q.correctIndex) {
            optBtn.classList.add('correct');
          } else if (idx === chosenIdx) {
            optBtn.classList.add('incorrect');
          }
        } else {
          optBtn.addEventListener('click', function () {
            handleAnswer(idx);
          });
        }

        optionsContainer.appendChild(optBtn);
      });

      // Update Feedback Box
      if (hasAnswered) {
        feedbackBox.classList.remove('hidden', 'correct', 'incorrect');
        const isCorrect = chosenIdx === q.correctIndex;
        feedbackBox.classList.add(isCorrect ? 'correct' : 'incorrect');
        feedbackBox.innerHTML = `
          <strong>${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect!'}</strong><br>
          ${q.explanation}
        `;
      } else {
        feedbackBox.classList.add('hidden');
        feedbackBox.innerHTML = '';
      }

      // Update Prev / Next buttons state
      if (btnPrev) btnPrev.disabled = currentQuizIndex === 0;
      if (btnNext) {
        btnNext.textContent = currentQuizIndex === QUIZ_QUESTIONS.length - 1 ? 'Finish Review' : 'Next Question →';
      }

      updateScoreDisplay();
    }

    function handleAnswer(chosenIdx) {
      userQuizAnswers[currentQuizIndex] = chosenIdx;
      renderCurrentQuestion();
    }

    function updateScoreDisplay() {
      let correctCount = 0;
      Object.keys(userQuizAnswers).forEach(qIdx => {
        if (userQuizAnswers[qIdx] === QUIZ_QUESTIONS[qIdx].correctIndex) {
          correctCount++;
        }
      });

      const totalAnswered = Object.keys(userQuizAnswers).length;
      const pct = QUIZ_QUESTIONS.length > 0 ? Math.round((correctCount / QUIZ_QUESTIONS.length) * 100) : 0;

      if (scoreNum) scoreNum.textContent = correctCount;
      if (scorePct) scorePct.textContent = pct + '%';
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          renderCurrentQuestion();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderCurrentQuestion();
        } else {
          showToast('You have completed all 28 MDCAT Practice Questions!');
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', function () {
        if (confirm('Are you sure you want to reset your quiz score and answers?')) {
          userQuizAnswers = {};
          currentQuizIndex = 0;
          renderCurrentQuestion();
          showToast('Quiz has been reset.');
        }
      });
    }

    renderCurrentQuestion();
  }

  /* --------------------------------------------------------------------------
   * 13. "I AM MDCAT READY" CHECKLIST
   * -------------------------------------------------------------------------- */
  function initChecklist() {
    const container = document.getElementById('checklist-items-container');
    const fillBar = document.getElementById('chk-progress-fill');
    const lbl = document.getElementById('chk-progress-lbl');
    if (!container) return;

    const savedState = JSON.parse(localStorage.getItem('mdcat_electro_checklist') || '{}');

    container.innerHTML = '';
    CHECKLIST_ITEMS.forEach((itemText, idx) => {
      const isChecked = !!savedState[idx];
      const itemEl = document.createElement('label');
      itemEl.className = 'chk-item';
      itemEl.innerHTML = `
        <input type="checkbox" data-idx="${idx}" ${isChecked ? 'checked' : ''}>
        <span>${itemText}</span>
      `;

      const input = itemEl.querySelector('input');
      input.addEventListener('change', function () {
        savedState[idx] = this.checked;
        localStorage.setItem('mdcat_electro_checklist', JSON.stringify(savedState));
        updateChecklistProgress(savedState, fillBar, lbl);
      });

      container.appendChild(itemEl);
    });

    updateChecklistProgress(savedState, fillBar, lbl);
  }

  function updateChecklistProgress(state, fillBar, lbl) {
    const total = CHECKLIST_ITEMS.length;
    let checkedCount = 0;
    for (let i = 0; i < total; i++) {
      if (state[i]) checkedCount++;
    }

    const pct = Math.round((checkedCount / total) * 100);
    if (fillBar) fillBar.style.width = pct + '%';
    if (lbl) lbl.textContent = `${pct}% Mastered (${checkedCount}/${total} items)`;
  }

  /* --------------------------------------------------------------------------
   * 14. REAL-TIME SEARCH ENGINE
   * -------------------------------------------------------------------------- */
  function initSearch() {
    const searchInput = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      const term = this.value.trim().toLowerCase();
      if (clearBtn) {
        if (term.length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }
      }

      if (term.length < 2) {
        removeSearchHighlights();
        return;
      }

      performSearch(term);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        removeSearchHighlights();
        searchInput.focus();
      });
    }
  }

  function performSearch(term) {
    removeSearchHighlights();
    const sections = document.querySelectorAll('.topic-section, .definition-card, .formula-card, .info-card, .example-card');
    let firstMatch = null;

    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(term)) {
        if (!firstMatch) firstMatch = sec;
      }
    });

    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstMatch.style.outline = '2px solid var(--accent-cyan)';
      setTimeout(() => {
        firstMatch.style.outline = 'none';
      }, 2500);
    }
  }

  function removeSearchHighlights() {
    const highlighted = document.querySelectorAll('.search-highlight');
    highlighted.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }

  /* --------------------------------------------------------------------------
   * 15. QUICK JUMP BUTTONS
   * -------------------------------------------------------------------------- */
  function initJumpButtons() {
    const btnRev = document.getElementById('quick-rev-jump');
    const btnQuiz = document.getElementById('quiz-jump');

    if (btnRev) {
      btnRev.addEventListener('click', function () {
        const sec = document.getElementById('sec-revision');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (btnQuiz) {
      btnQuiz.addEventListener('click', function () {
        const sec = document.getElementById('sec-mcqs');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 16. FLOATING BACK TO TOP BUTTON
   * -------------------------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
   * 17. KATEX AUTO-RENDER
   * -------------------------------------------------------------------------- */
  function initKaTeXAutoRender() {
    function tryRender() {
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '\\[', right: '\\]', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {
          console.log('KaTeX auto-render init info:', e);
        }
      }
    }

    if (document.readyState === 'complete') {
      tryRender();
    } else {
      window.addEventListener('load', tryRender);
    }
  }

})();
