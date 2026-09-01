/**
 * ==========================================================================
 * ATOMIC SPECTRA — MDCAT CHEMISTRY INTERACTIVE ENGINE
 * ==========================================================================
 */

(function () {
  "use strict";

  // Constants
  const RYDBERG_CONSTANT = 1.097373e7; // m^-1
  const PLANCK_CONSTANT = 6.62607e-34; // J*s
  const SPEED_OF_LIGHT = 2.99792e8; // m/s
  const EV_TO_JOULE = 1.60218e-19; // J per eV

  // MCQ Dataset (15+ Comprehensive MDCAT Questions)
  const MCQ_DATA = [
    {
      id: 1,
      category: "series",
      concept: "Balmer Series Region",
      question: "Which of the following hydrogen spectral series lies completely in the visible region of electromagnetic radiation?",
      options: [
        "Lyman series",
        "Balmer series",
        "Paschen series",
        "Pfund series"
      ],
      correct: 1,
      explanation: "Balmer series involves electron transitions ending at n = 2 (nf = 2) and falls directly in the visible region (approx. 400 nm to 700 nm). Lyman lies in UV, while Paschen, Brackett, and Pfund lie in Infrared."
    },
    {
      id: 2,
      category: "series",
      concept: "Lyman Series Final State",
      question: "In the hydrogen atom spectrum, the Lyman series is obtained when electrons de-excite from higher energy levels to:",
      options: [
        "First orbit (n = 1)",
        "Second orbit (n = 2)",
        "Third orbit (n = 3)",
        "Fourth orbit (n = 4)"
      ],
      correct: 0,
      explanation: "Lyman series corresponds to transitions ending at the ground state (nf = 1). Since the energy drop to n = 1 is the largest, Lyman photons have highest frequencies and lie in the Ultraviolet (UV) spectrum."
    },
    {
      id: 3,
      category: "energy",
      concept: "Emission vs Absorption",
      question: "An electron transitions from n = 2 to n = 4. What type of process is this and what happens to energy?",
      options: [
        "Emission process; a photon is released",
        "Absorption process; a photon is absorbed",
        "Ionization process; electron leaves the atom",
        "Radiationless transition; no energy involved"
      ],
      correct: 1,
      explanation: "Transition from a lower energy level (n = 2) to a higher energy level (n = 4) requires the atom to absorb energy equal to the difference (ΔE = E4 - E2). Thus, it is an absorption transition."
    },
    {
      id: 4,
      category: "math",
      concept: "Wavelength and Energy Relationship",
      question: "According to Planck's equation E = hc/λ, what is the relationship between the wavelength of emitted radiation and photon energy?",
      options: [
        "Directly proportional (longer wavelength = higher energy)",
        "Inversely proportional (shorter wavelength = higher energy)",
        "Independent of each other",
        "Energy is proportional to the square of wavelength"
      ],
      correct: 1,
      explanation: "E = hc/λ shows that energy (E) is inversely proportional to wavelength (λ). Shorter wavelength means higher frequency and therefore greater photon energy."
    },
    {
      id: 5,
      category: "series",
      concept: "H-alpha Spectral Line",
      question: "The first line (H-α) of the Balmer series corresponds to an electron transition between which levels?",
      options: [
        "n = 2 → n = 1",
        "n = 3 → n = 2",
        "n = 4 → n = 2",
        "n = ∞ → n = 2"
      ],
      correct: 1,
      explanation: "The first (longest wavelength / lowest energy) line of any series comes from the immediately adjacent upper level. For Balmer (nf = 2), the first line is n = 3 → n = 2, producing the famous red line at 656.3 nm."
    },
    {
      id: 6,
      category: "bohr",
      concept: "Quantized Energy Levels",
      question: "Atomic spectra of elements are discontinuous line spectra rather than continuous spectra because:",
      options: [
        "Atoms have infinite random orbits",
        "Electrons possess quantized stationary energy levels",
        "Electrons lose energy continuously as they rotate",
        "Light travels in straight lines only"
      ],
      correct: 1,
      explanation: "Niels Bohr established that electrons reside only in discrete, quantized orbits with specific energy values. Transitions between these fixed levels produce distinct wavelengths, resulting in sharp line spectra."
    },
    {
      id: 7,
      category: "energy",
      concept: "Hydrogen Ionization Energy",
      question: "The ionization energy of a hydrogen atom in its ground state (n = 1) is equal to:",
      options: [
        "3.4 eV",
        "10.2 eV",
        "13.6 eV",
        "0.85 eV"
      ],
      correct: 2,
      explanation: "For hydrogen in ground state (n = 1), E1 = -13.6 eV. Ionization requires removing the electron to n = ∞ (E∞ = 0 eV). Thus, ΔE = E∞ - E1 = 0 - (-13.6) = +13.6 eV."
    },
    {
      id: 8,
      category: "math",
      concept: "Rydberg Equation Value",
      question: "What is the approximate value of the Rydberg constant (RH) in SI units?",
      options: [
        "6.626 × 10^-34 J·s",
        "1.097 × 10^7 m^-1",
        "3.00 × 10^8 m/s",
        "9.11 × 10^-31 kg"
      ],
      correct: 1,
      explanation: "The Rydberg constant for hydrogen is approximately RH ≈ 1.097 × 10^7 m^-1 (or 1.09678 × 10^7 m^-1). It represents wave numbers."
    },
    {
      id: 9,
      category: "series",
      concept: "Infrared Series Identification",
      question: "Which of the following groups contains ONLY spectral series located in the Infrared region?",
      options: [
        "Lyman, Balmer, Paschen",
        "Balmer, Paschen, Brackett",
        "Paschen, Brackett, Pfund",
        "Lyman, Brackett, Pfund"
      ],
      correct: 2,
      explanation: "Paschen (nf = 3), Brackett (nf = 4), and Pfund (nf = 5) all produce spectral lines in the Infrared (IR) region of the electromagnetic spectrum."
    },
    {
      id: 10,
      category: "math",
      concept: "Maximum Energy Transition",
      question: "Which of the following electronic transitions in a hydrogen atom emits the photon with the MAXIMUM energy?",
      options: [
        "n = 4 → n = 3",
        "n = 3 → n = 2",
        "n = 2 → n = 1",
        "n = 5 → n = 4"
      ],
      correct: 2,
      explanation: "The energy difference between n = 2 and n = 1 is ΔE = 13.6 × (1 - 1/4) = 10.2 eV. This is significantly larger than any transition between higher adjacent shells (e.g. 3→2 is only 1.89 eV)."
    },
    {
      id: 11,
      category: "bohr",
      concept: "Characteristic Spectrum",
      question: "Why is the atomic spectrum often referred to as the 'fingerprint' of an element?",
      options: [
        "Every element contains the same number of neutrons",
        "Each element has a unique electronic arrangement and distinct set of quantized energy gaps",
        "All elements emit light at exactly the same wavelengths",
        "Spectra can only be observed using glass prisms"
      ],
      correct: 1,
      explanation: "Every chemical element possesses a unique nuclear charge (Z) and electron configuration, yielding a unique set of energy level differences. Hence, each element displays a distinct, unmistakable spectral pattern."
    },
    {
      id: 12,
      category: "energy",
      concept: "Absorption Spectrum Appearance",
      question: "How does an atomic absorption spectrum appear when viewed through a spectroscope?",
      options: [
        "Bright colorful lines on a dark background",
        "Dark lines on a continuous rainbow background",
        "A uniform unbroken white band",
        "Complete total darkness"
      ],
      correct: 1,
      explanation: "When continuous white light passes through a cold gas, atoms absorb specific wavelengths corresponding to their allowed transitions. The transmitted light shows dark absorption lines against a continuous bright background."
    },
    {
      id: 13,
      category: "math",
      concept: "Balmer Series Limiting Line",
      question: "The series limit (shortest wavelength line) of the Balmer series occurs when an electron transitions from:",
      options: [
        "n = 3 to n = 2",
        "n = 4 to n = 2",
        "n = ∞ to n = 2",
        "n = ∞ to n = 1"
      ],
      correct: 2,
      explanation: "The limiting line (maximum energy, shortest wavelength) of any series originates from n = ∞. For the Balmer series (nf = 2), this is n = ∞ → n = 2, with λ_limit ≈ 4/RH ≈ 364.6 nm."
    },
    {
      id: 14,
      category: "bohr",
      concept: "Ground State Definition",
      question: "The state of lowest possible energy for an electron in an atom is known as:",
      options: [
        "Excited state",
        "Ground state",
        "Ionized state",
        "Stationary limit"
      ],
      correct: 1,
      explanation: "The ground state corresponds to the lowest possible principal quantum level (n = 1 in hydrogen) where the atom is in its most stable electronic configuration."
    },
    {
      id: 15,
      category: "series",
      concept: "Paschen Series Formula",
      question: "For the Paschen series in the hydrogen spectrum, what is the value of the final energy level (nf)?",
      options: [
        "nf = 1",
        "nf = 2",
        "nf = 3",
        "nf = 4"
      ],
      correct: 2,
      explanation: "Paschen series corresponds to transitions where excited electrons fall to the third energy level (nf = 3), with initial levels ni = 4, 5, 6, etc."
    },
    {
      id: 16,
      category: "math",
      concept: "Wave Number Definition",
      question: "Wave number (ν̄) is defined as the reciprocal of wavelength (1/λ). Its SI unit is:",
      options: [
        "m",
        "m^-1",
        "s^-1 (Hz)",
        "J·s"
      ],
      correct: 1,
      explanation: "Wave number ν̄ = 1/λ represents the number of complete waves per unit distance. In SI units, its unit is per meter (m^-1)."
    }
  ];

  // DOM Elements State
  let userAnswers = {};
  let currentFilter = "all";

  // Init when DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    initScrollProgress();
    initBackToTop();
    initTableOfContents();
    initSearch();
    initSimulator();
    initSpectrumViewer();
    initFormulaCopying();
    initQuiz();
    initStorageProgress();
    initUrduToggle();
  });

  /* 1. Scroll Progress Bar */
  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    });
  }

  /* 2. Back To Top Floating Action */
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 3. Table of Contents & Intersection Observer */
  function initTableOfContents() {
    const sections = document.querySelectorAll(".learning-section, .hero-card, .exam-zone-wrapper, .quiz-wrapper");
    const tocItems = document.querySelectorAll(".toc-item");

    if (sections.length === 0 || tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            tocItems.forEach((item) => {
              const link = item.querySelector("a");
              if (link && link.getAttribute("href") === `#${id}`) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  /* 4. Search within Chapter */
  function initSearch() {
    const searchInput = document.getElementById("chapter-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll(".learning-section");

      sections.forEach((sec) => {
        const text = sec.innerText.toLowerCase();
        if (!query || text.includes(query)) {
          sec.style.display = "block";
        } else {
          sec.style.display = "none";
        }
      });
    });
  }

  /* 5. Hydrogen Energy-Level & Transition Interactive Simulator */
  function initSimulator() {
    const selectNi = document.getElementById("sim-ni");
    const selectNf = document.getElementById("sim-nf");
    const presetBtns = document.querySelectorAll(".preset-btn");

    if (!selectNi || !selectNf) return;

    function updateSimulation() {
      const niVal = selectNi.value === "inf" ? Infinity : parseInt(selectNi.value, 10);
      const nfVal = selectNf.value === "inf" ? Infinity : parseInt(selectNf.value, 10);

      const typeEl = document.getElementById("sim-result-type");
      const deEl = document.getElementById("sim-result-de");
      const lambdaEl = document.getElementById("sim-result-lambda");
      const freqEl = document.getElementById("sim-result-freq");
      const seriesEl = document.getElementById("sim-result-series");
      const regionEl = document.getElementById("sim-result-region");

      if (niVal === nfVal) {
        if (typeEl) typeEl.innerText = "No Transition";
        if (deEl) deEl.innerText = "0.00 eV";
        if (lambdaEl) lambdaEl.innerText = "—";
        if (freqEl) freqEl.innerText = "—";
        if (seriesEl) seriesEl.innerText = "None";
        if (regionEl) regionEl.innerText = "—";
        drawSvgEnergyDiagram(niVal, nfVal, 0, "none");
        return;
      }

      const isEmission = niVal > nfVal;
      const lower = Math.min(niVal, nfVal);
      const upper = Math.max(niVal, nfVal);

      // Energy in eV: |E_upper - E_lower|
      const eUpper = upper === Infinity ? 0 : -13.6 / (upper * upper);
      const eLower = lower === Infinity ? 0 : -13.6 / (lower * lower);
      const deltaE_eV = Math.abs(eUpper - eLower);
      const deltaE_J = deltaE_eV * EV_TO_JOULE;

      // Frequency ν = ΔE / h
      const frequency = deltaE_J / PLANCK_CONSTANT;

      // Wavelength λ = c / ν in nm
      const wavelengthM = SPEED_OF_LIGHT / frequency;
      const wavelengthNm = wavelengthM * 1e9;

      // Identify Series & Region
      let seriesName = "General";
      let spectralRegion = "Unknown";
      let regionClass = "";

      const finalState = isEmission ? nfVal : upper; // for emission, final is lower
      const activeBase = isEmission ? nfVal : lower;

      if (activeBase === 1) {
        seriesName = "Lyman Series";
        spectralRegion = "Ultraviolet (UV)";
        regionClass = "tag-uv";
      } else if (activeBase === 2) {
        seriesName = "Balmer Series";
        spectralRegion = "Visible Region";
        regionClass = "tag-vis";
      } else if (activeBase === 3) {
        seriesName = "Paschen Series";
        spectralRegion = "Infrared (Near IR)";
        regionClass = "tag-ir";
      } else if (activeBase === 4) {
        seriesName = "Brackett Series";
        spectralRegion = "Infrared (Mid IR)";
        regionClass = "tag-ir";
      } else if (activeBase === 5) {
        seriesName = "Pfund Series";
        spectralRegion = "Infrared (Far IR)";
        regionClass = "tag-ir";
      } else {
        seriesName = "High-Level Series";
        spectralRegion = "Far Infrared / Radio";
        regionClass = "tag-ir";
      }

      if (typeEl) {
        typeEl.innerText = isEmission ? "⚡ Emission (Photon Released)" : "📥 Absorption (Photon Absorbed)";
        typeEl.style.color = isEmission ? "#0284c7" : "#059669";
      }
      if (deEl) deEl.innerText = `${deltaE_eV.toFixed(2)} eV (${(deltaE_J * 1e19).toFixed(2)}×10⁻¹⁹ J)`;
      if (lambdaEl) lambdaEl.innerText = `${wavelengthNm.toFixed(1)} nm`;
      if (freqEl) freqEl.innerText = `${(frequency / 1e14).toFixed(2)} × 10¹⁴ Hz`;
      if (seriesEl) seriesEl.innerText = seriesName;
      if (regionEl) {
        regionEl.innerText = spectralRegion;
        regionEl.className = `sim-stat-val ${regionClass}`;
      }

      drawSvgEnergyDiagram(niVal, nfVal, wavelengthNm, isEmission ? "emission" : "absorption");
    }

    selectNi.addEventListener("change", () => {
      presetBtns.forEach((b) => b.classList.remove("active"));
      updateSimulation();
    });

    selectNf.addEventListener("change", () => {
      presetBtns.forEach((b) => b.classList.remove("active"));
      updateSimulation();
    });

    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        presetBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const ni = btn.getAttribute("data-ni");
        const nf = btn.getAttribute("data-nf");
        if (ni) selectNi.value = ni;
        if (nf) selectNf.value = nf;
        updateSimulation();
      });
    });

    // Initial run
    updateSimulation();
  }

  /* SVG Energy-Level Diagram Renderer */
  function drawSvgEnergyDiagram(ni, nf, wavelengthNm, mode) {
    const svg = document.getElementById("energy-level-svg");
    if (!svg) return;

    // Canvas dimensions
    const width = 600;
    const height = 280;

    // Energy levels Y positions (realistic Bohr spacing)
    // n=1 (-13.6 eV) -> Y = 250
    // n=2 (-3.4 eV)  -> Y = 160
    // n=3 (-1.51 eV) -> Y = 110
    // n=4 (-0.85 eV) -> Y = 75
    // n=5 (-0.54 eV) -> Y = 50
    // n=6 (-0.38 eV) -> Y = 35
    // n=∞ (0 eV)     -> Y = 20
    const levelMap = {
      1: { y: 250, label: "n=1 (Ground State, -13.6 eV)", color: "#38bdf8" },
      2: { y: 160, label: "n=2 (-3.40 eV)", color: "#818cf8" },
      3: { y: 110, label: "n=3 (-1.51 eV)", color: "#a78bfa" },
      4: { y: 75, label: "n=4 (-0.85 eV)", color: "#c084fc" },
      5: { y: 50, label: "n=5 (-0.54 eV)", color: "#e879f9" },
      6: { y: 35, label: "n=6 (-0.38 eV)", color: "#f472b6" },
      Infinity: { y: 20, label: "n=∞ (Ionized State, 0 eV)", color: "#fca5a5" }
    };

    let html = `<defs>
      <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
      </marker>
      <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80"/>
      </marker>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>`;

    // Draw Energy Rungs
    for (const key in levelMap) {
      const lvl = levelMap[key];
      html += `
        <line x1="80" y1="${lvl.y}" x2="520" y2="${lvl.y}" stroke="${lvl.color}" stroke-width="1.5" stroke-dasharray="${key === 'Infinity' ? '4 4' : 'none'}" opacity="0.8"/>
        <text x="70" y="${lvl.y + 4}" fill="${lvl.color}" font-size="11" font-family="sans-serif" text-anchor="end" font-weight="600">${key === 'Infinity' ? 'n=∞' : 'n=' + key}</text>
        <text x="530" y="${lvl.y + 4}" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="start">${lvl.label.split(', ')[1] || '0 eV'}</text>
      `;
    }

    // If valid transition, draw vertical transition arrow & photon ripple
    if (ni !== nf && levelMap[ni] && levelMap[nf]) {
      const yStart = levelMap[ni].y;
      const yEnd = levelMap[nf].y;
      const isEmission = mode === "emission";
      const arrowColor = isEmission ? "#38bdf8" : "#4ade80";
      const markerId = isEmission ? "url(#arrow-down)" : "url(#arrow-up)";

      // Transition Line & Arrow
      html += `
        <line x1="300" y1="${yStart}" x2="300" y2="${yEnd}" stroke="${arrowColor}" stroke-width="3" marker-end="${markerId}" filter="url(#glow)"/>
        <!-- Electron circle at source -->
        <circle cx="300" cy="${yStart}" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5">
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      `;

      // Radiating Wave Packet (Photon)
      const midY = (yStart + yEnd) / 2;
      const waveColor = wavelengthNm < 400 ? "#c084fc" : wavelengthNm <= 700 ? "#38bdf8" : "#f87171";
      html += `
        <g transform="translate(340, ${midY})">
          <path d="M 0 0 Q 15 -10, 30 0 T 60 0 T 90 0" fill="none" stroke="${waveColor}" stroke-width="2.5" stroke-linecap="round">
            <animateTransform attributeName="transform" type="translate" values="340,${midY}; 390,${midY}" dur="1.2s" repeatCount="indefinite"/>
          </path>
          <text x="45" y="-12" fill="${waveColor}" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">
            ${isEmission ? 'hν emitted' : 'hν absorbed'} (${wavelengthNm ? wavelengthNm.toFixed(0) + 'nm' : ''})
          </text>
        </g>
      `;
    }

    svg.innerHTML = html;
  }

  /* 6. Interactive Spectrum Viewer */
  function initSpectrumViewer() {
    const lines = document.querySelectorAll(".spec-line");
    const infoBox = document.getElementById("spectrum-hover-info");

    const lineDetails = {
      "h-alpha": { name: "H-α (Red)", wave: "656.3 nm", trans: "n = 3 → n = 2", energy: "1.89 eV", series: "Balmer" },
      "h-beta": { name: "H-β (Cyan / Blue-Green)", wave: "486.1 nm", trans: "n = 4 → n = 2", energy: "2.55 eV", series: "Balmer" },
      "h-gamma": { name: "H-γ (Blue-Violet)", wave: "434.0 nm", trans: "n = 5 → n = 2", energy: "2.86 eV", series: "Balmer" },
      "h-delta": { name: "H-δ (Violet)", wave: "410.2 nm", trans: "n = 6 → n = 2", energy: "3.02 eV", series: "Balmer" }
    };

    lines.forEach((line) => {
      line.addEventListener("click", () => {
        const key = line.getAttribute("data-line");
        if (key && lineDetails[key] && infoBox) {
          const d = lineDetails[key];
          infoBox.innerHTML = `<strong>${d.name}</strong> • Wavelength: <code>${d.wave}</code> • Transition: <code>${d.trans}</code> • Photon Energy: <code>${d.energy}</code> • Series: <strong>${d.series}</strong>`;
          infoBox.style.display = "block";
        }
      });
    });
  }

  /* 7. Formula Copy Tool */
  function initFormulaCopying() {
    const copyBtns = document.querySelectorAll(".copy-btn");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const formulaText = btn.getAttribute("data-formula") || btn.closest(".formula-card")?.querySelector(".formula-math")?.innerText;
        if (formulaText) {
          navigator.clipboard.writeText(formulaText).then(() => {
            showToast(`Copied formula: "${formulaText}"`);
            const orig = btn.innerHTML;
            btn.innerHTML = `✓ Copied`;
            setTimeout(() => { btn.innerHTML = orig; }, 1800);
          }).catch(() => {
            showToast("Formula ready to copy!");
          });
        }
      });
    });
  }

  function showToast(msg) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notification";
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  /* 8. MCQ Quiz Engine */
  function initQuiz() {
    renderQuizList();

    const restartBtn = document.getElementById("restart-quiz-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        userAnswers = {};
        localStorage.removeItem("mdcat_atomic_quiz_score");
        renderQuizList();
        updateScoreMeter();
        showToast("Quiz has been reset!");
      });
    }

    const filterChips = document.querySelectorAll(".filter-chip");
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentFilter = chip.getAttribute("data-filter") || "all";
        renderQuizList();
      });
    });
  }

  function renderQuizList() {
    const container = document.getElementById("mcq-cards-container");
    if (!container) return;

    const filtered = MCQ_DATA.filter((item) => {
      if (currentFilter === "all") return true;
      return item.category === currentFilter;
    });

    let html = "";
    filtered.forEach((mcq, idx) => {
      const selectedOpt = userAnswers[mcq.id];
      const hasAnswered = selectedOpt !== undefined;

      html += `
        <div class="mcq-card" id="mcq-${mcq.id}" data-id="${mcq.id}">
          <div class="mcq-top-row">
            <span class="mcq-number">Question ${idx + 1} of ${filtered.length}</span>
            <span class="mcq-concept-tag">🎯 Concept: ${mcq.concept}</span>
          </div>
          <div class="mcq-question">${mcq.question}</div>
          <div class="mcq-options-list">
            ${mcq.options
              .map((opt, optIdx) => {
                let optClass = "option-label";
                if (hasAnswered) {
                  if (optIdx === mcq.correct) {
                    optClass += " correct";
                  } else if (selectedOpt === optIdx) {
                    optClass += " incorrect";
                  }
                }
                const letter = String.fromCharCode(65 + optIdx);
                return `
                  <div class="${optClass}" data-opt="${optIdx}">
                    <span class="option-prefix">${letter}</span>
                    <span>${opt}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
          <div class="mcq-explanation ${hasAnswered ? 'show' : ''}">
            <div class="mcq-explanation-title">💡 MDCAT Explanation & Tip</div>
            <p>${mcq.explanation}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach Option Click Listeners
    container.querySelectorAll(".option-label").forEach((optEl) => {
      optEl.addEventListener("click", () => {
        const card = optEl.closest(".mcq-card");
        const qId = parseInt(card.getAttribute("data-id"), 10);
        const optIdx = parseInt(optEl.getAttribute("data-opt"), 10);

        if (userAnswers[qId] !== undefined) return; // already answered

        userAnswers[qId] = optIdx;
        localStorage.setItem("mdcat_atomic_quiz_score", JSON.stringify(userAnswers));
        renderQuizList();
        updateScoreMeter();
      });
    });

    updateScoreMeter();
  }

  function updateScoreMeter() {
    const totalAnswered = Object.keys(userAnswers).length;
    let correctCount = 0;

    for (const qId in userAnswers) {
      const q = MCQ_DATA.find((m) => m.id === parseInt(qId, 10));
      if (q && q.correct === userAnswers[qId]) {
        correctCount++;
      }
    }

    const scoreEl = document.getElementById("quiz-score-display");
    const accuracyEl = document.getElementById("quiz-accuracy-display");

    if (scoreEl) {
      scoreEl.innerText = `${correctCount} / ${MCQ_DATA.length}`;
    }
    if (accuracyEl) {
      const pct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
      accuracyEl.innerText = `${pct}% Accuracy (${totalAnswered} Answered)`;
    }
  }

  /* 9. LocalStorage Chapter Progress & Bookmarks */
  function initStorageProgress() {
    // Load Bookmarks
    let bookmarks = JSON.parse(localStorage.getItem("mdcat_atomic_bookmarks") || "[]");
    const bookmarkBtns = document.querySelectorAll(".bookmark-btn");

    function syncBookmarkUI() {
      bookmarkBtns.forEach((btn) => {
        const targetId = btn.getAttribute("data-target");
        if (bookmarks.includes(targetId)) {
          btn.classList.add("bookmarked");
          btn.innerHTML = `★ Bookmarked`;
        } else {
          btn.classList.remove("bookmarked");
          btn.innerHTML = `☆ Bookmark`;
        }
      });
    }

    bookmarkBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        if (!targetId) return;

        if (bookmarks.includes(targetId)) {
          bookmarks = bookmarks.filter((b) => b !== targetId);
          showToast("Bookmark removed");
        } else {
          bookmarks.push(targetId);
          showToast("Section bookmarked for quick revision!");
        }
        localStorage.setItem("mdcat_atomic_bookmarks", JSON.stringify(bookmarks));
        syncBookmarkUI();
      });
    });

    syncBookmarkUI();

    // Chapter Progress Percentage
    const markCompleteBtn = document.getElementById("mark-chapter-complete-btn");
    const progressFill = document.getElementById("sidebar-progress-fill");
    const progressText = document.getElementById("sidebar-progress-text");

    let isCompleted = localStorage.getItem("mdcat_atomic_completed") === "true";

    function updateProgressUI() {
      const storedAnswers = JSON.parse(localStorage.getItem("mdcat_atomic_quiz_score") || "{}");
      const quizAnsweredCount = Object.keys(storedAnswers).length;
      let pct = Math.min(100, Math.round((quizAnsweredCount / MCQ_DATA.length) * 50 + (isCompleted ? 50 : 25)));

      if (progressFill) progressFill.style.width = pct + "%";
      if (progressText) progressText.innerText = pct + "% Completed";

      if (markCompleteBtn) {
        if (isCompleted) {
          markCompleteBtn.innerHTML = `✓ Chapter Completed`;
          markCompleteBtn.classList.add("completed");
        } else {
          markCompleteBtn.innerHTML = `Mark Chapter as Done`;
        }
      }
    }

    if (markCompleteBtn) {
      markCompleteBtn.addEventListener("click", () => {
        isCompleted = !isCompleted;
        localStorage.setItem("mdcat_atomic_completed", isCompleted.toString());
        showToast(isCompleted ? "Great job! Chapter marked as completed 🎉" : "Status reset.");
        updateProgressUI();
      });
    }

    // Load saved quiz
    const savedScore = localStorage.getItem("mdcat_atomic_quiz_score");
    if (savedScore) {
      try {
        userAnswers = JSON.parse(savedScore);
      } catch (e) {
        userAnswers = {};
      }
    }

    updateProgressUI();
  }

  /* 10. Optional Urdu Concept Bridge Toggle */
  function initUrduToggle() {
    const toggleBtn = document.getElementById("toggle-urdu-hints-btn");
    if (!toggleBtn) return;

    let showUrdu = localStorage.getItem("mdcat_urdu_hints") !== "false";

    function syncUrduUI() {
      const bridges = document.querySelectorAll(".concept-bridge-box");
      bridges.forEach((b) => {
        b.style.display = showUrdu ? "block" : "none";
      });
      toggleBtn.innerText = showUrdu ? "Urdu Notes: ON" : "Urdu Notes: OFF";
    }

    toggleBtn.addEventListener("click", () => {
      showUrdu = !showUrdu;
      localStorage.setItem("mdcat_urdu_hints", showUrdu.toString());
      syncUrduUI();
      showToast(showUrdu ? "Urdu & Hinglish conceptual notes shown" : "Urdu notes hidden");
    });

    syncUrduUI();
  }
})();
