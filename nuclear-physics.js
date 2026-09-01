/**
 * ============================================================================
 * NUCLEAR PHYSICS MDCAT INTERACTIVE LAB & REVISION ENGINE
 * Full Pure Vanilla JavaScript Implementation
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATA STRUCTURES: QUIZ & FLASHCARDS
  // --------------------------------------------------------------------------

  const FLASHCARDS_DATA = [
    {
      id: 1,
      q: "What particles constitute the nucleus, and what are they collectively termed?",
      a: "The nucleus contains <strong>protons</strong> (+1e) and <strong>neutrons</strong> (0). Together, they are called <strong>nucleons</strong>. Electrons are never inside the nucleus."
    },
    {
      id: 2,
      q: "What defines the atomic number (Z) vs mass number (A)?",
      a: "<strong>Z = Proton number</strong> (identifies the element).<br><strong>A = Total nucleons (Z + N)</strong>.<br>Neutrons are calculated as: <strong>N = A − Z</strong>."
    },
    {
      id: 3,
      q: "What are isotopes? Give examples from Hydrogen.",
      a: "Isotopes have the <strong>same atomic number Z</strong> but <strong>different mass numbers A</strong> (different neutrons).<br>Hydrogen isotopes: Protium (¹H), Deuterium (²H), Tritium (³H)."
    },
    {
      id: 4,
      q: "Which two main forces compete inside the nucleus?",
      a: "1. <strong>Strong Nuclear Force</strong> (attractive, very short range, holds nucleons together).<br>2. <strong>Electrostatic Repulsion</strong> (repulsive Coulomb force between protons)."
    },
    {
      id: 5,
      q: "What are the charge and composition of an Alpha (α) particle?",
      a: "An alpha particle is a <strong>Helium nucleus (⁴₂He²⁺)</strong>.<br>• 2 protons + 2 neutrons<br>• Charge: <strong>+2e</strong><br>• High ionizing power, low penetrating power."
    },
    {
      id: 6,
      q: "What happens inside the nucleus during Beta-minus (β⁻) decay?",
      a: "A neutron converts into a proton, emitting an electron and an antineutrino:<br><strong>n → p + e⁻ + ν̄</strong>.<br>Rule: <strong>Mass number A stays same, Z increases by 1</strong>."
    },
    {
      id: 7,
      q: "What is Gamma (γ) radiation?",
      a: "Gamma radiation is high-energy <strong>electromagnetic radiation (photons)</strong> emitted from an excited nucleus.<br>• Charge = <strong>0</strong>, Mass = <strong>0</strong>.<br>• A and Z remain unchanged."
    },
    {
      id: 8,
      q: "What is the difference between 'Spontaneous' and 'Random' decay?",
      a: "• <strong>Spontaneous:</strong> Occurs without external trigger; unaffected by temperature or pressure.<br>• <strong>Random:</strong> We cannot predict when an individual nucleus decays, but bulk decay follows statistics."
    },
    {
      id: 9,
      q: "What is Activity (A) and what is its SI unit?",
      a: "Activity is the rate of disintegration: <strong>A = λN</strong>.<br>SI unit: <strong>Becquerel (Bq)</strong>, where <strong>1 Bq = 1 decay per second</strong>.<br>(1 Curie = 3.7 × 10¹⁰ Bq)."
    },
    {
      id: 10,
      q: "What is the relationship between Decay Constant (λ) and Half-Life (T₁/₂)?",
      a: "<strong>λ = 0.693 / T₁/₂</strong> and <strong>T₁/₂ = 0.693 / λ</strong>.<br>⭐ <strong>MDCAT Trap:</strong> Large λ means rapid decay and short half-life; small λ means long half-life."
    },
    {
      id: 11,
      q: "What fraction of a radioactive sample remains after 3 half-lives?",
      a: "Using N = N₀(1/2)ⁿ where n = 3:<br>N = N₀(1/2)³ = <strong>1/8 (12.5%) remaining</strong>.<br>Fraction decayed = 7/8 (87.5%)."
    },
    {
      id: 12,
      q: "What are the daughter nucleus shifts in Alpha, Beta-minus, and Gamma emissions?",
      a: "• <strong>Alpha (α):</strong> A − 4, Z − 2<br>• <strong>Beta-minus (β⁻):</strong> A same, Z + 1<br>• <strong>Gamma (γ):</strong> A same, Z same"
    },
    {
      id: 13,
      q: "Rank α, β, γ in order of (a) Ionizing Power and (b) Penetrating Power.",
      a: "• <strong>Ionizing Power:</strong> α (Highest) > β (Medium) > γ (Lowest)<br>• <strong>Penetrating Power:</strong> γ (Highest) > β (Medium) > α (Lowest)"
    },
    {
      id: 14,
      q: "Name three medical radioisotopes and their applications.",
      a: "1. <strong>Technetium-99m:</strong> Diagnostic imaging scans (T₁/₂ = 6h).<br>2. <strong>Iodine-131:</strong> Thyroid diagnostics & treatment.<br>3. <strong>Cobalt-60:</strong> Radiotherapy (cancer cell destruction)."
    }
  ];

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      topic: "1. Atomic Structure",
      q: "Which of the following particles are collectively known as 'nucleons'?",
      options: [
        "Protons and electrons",
        "Protons and neutrons",
        "Neutrons and electrons",
        "Positrons and neutrons"
      ],
      answer: 1,
      explanation: "Nucleons are the subatomic particles located inside the atomic nucleus, which are strictly protons and neutrons."
    },
    {
      id: 2,
      topic: "1. Atom & Nucleus",
      q: "Which subatomic particle is NOT present inside the atomic nucleus?",
      options: [
        "Proton",
        "Neutron",
        "Electron",
        "Nucleon"
      ],
      answer: 2,
      explanation: "Electrons revolve around the nucleus in orbitals and are never present inside the nucleus under standard conditions."
    },
    {
      id: 3,
      topic: "2 & 3. Mass and Atomic Number",
      q: "In a neutral sodium atom ²³₁₁Na, what are the respective numbers of protons, neutrons, and electrons?",
      options: [
        "11 protons, 23 neutrons, 11 electrons",
        "11 protons, 12 neutrons, 11 electrons",
        "12 protons, 11 neutrons, 12 electrons",
        "11 protons, 12 neutrons, 12 electrons"
      ],
      answer: 1,
      explanation: "Z = 11 gives 11 protons. For a neutral atom, electrons = Z = 11. Neutrons N = A − Z = 23 − 11 = 12 neutrons."
    },
    {
      id: 4,
      topic: "4. Isotopes",
      q: "Isotopes of the same element have:",
      options: [
        "Same mass number A, different atomic number Z",
        "Same number of neutrons, different protons",
        "Same atomic number Z, different mass number A",
        "Different chemical properties but identical physical properties"
      ],
      answer: 2,
      explanation: "Isotopes share the same atomic number Z (same element/protons) but differ in mass number A due to differing neutron counts."
    },
    {
      id: 5,
      topic: "5. Nuclear Forces",
      q: "The force responsible for holding nucleons tightly together against electrostatic repulsion is:",
      options: [
        "Gravitational force",
        "Strong nuclear force",
        "Coulomb force",
        "Weak interaction force"
      ],
      answer: 1,
      explanation: "The strong nuclear force is a short-range, intensely attractive force acting between all nucleons (p-p, n-n, p-n) inside the nucleus."
    },
    {
      id: 6,
      topic: "6. Radioactivity",
      q: "An alpha (α) particle is identical in composition and charge to:",
      options: [
        "A hydrogen atom",
        "A doubly ionized helium nucleus (⁴₂He²⁺)",
        "A high-speed electron",
        "An electromagnetic photon"
      ],
      answer: 1,
      explanation: "An alpha particle consists of 2 protons and 2 neutrons with a net charge of +2e, exactly identical to a helium-4 nucleus."
    },
    {
      id: 7,
      topic: "6. Penetrating Power",
      q: "Which radiation type has the HIGHEST penetrating power and can only be substantially attenuated by thick lead or concrete?",
      options: [
        "Alpha (α) rays",
        "Beta (β⁻) rays",
        "Gamma (γ) rays",
        "Positrons"
      ],
      answer: 2,
      explanation: "Gamma rays are neutral, massless high-energy photons with the highest penetrating ability, whereas alpha particles are stopped by thin paper."
    },
    {
      id: 8,
      topic: "7. Nature of Decay",
      q: "Radioactive decay is described as 'spontaneous' because:",
      options: [
        "It happens uniformly in all atoms at once",
        "It occurs independently of external temperature, pressure, and chemical combinations",
        "It can be speeded up by high electric voltages",
        "It only occurs when triggered by cosmic rays"
      ],
      answer: 1,
      explanation: "'Spontaneous' means radioactive decay is purely governed by internal nuclear instability and cannot be triggered, slowed down, or altered by external factors."
    },
    {
      id: 9,
      topic: "8. Activity Units",
      q: "The SI unit of radioactive activity, the Becquerel (Bq), is defined as:",
      options: [
        "1 decay per minute",
        "1 decay per second",
        "3.7 × 10¹⁰ decays per second",
        "1 joule of energy emitted per second"
      ],
      answer: 1,
      explanation: "1 Becquerel (Bq) is defined as exactly 1 radioactive disintegration (decay) per second."
    },
    {
      id: 10,
      topic: "9. Decay Constant",
      q: "If a radioactive isotope has a very LARGE decay constant (λ), its half-life (T₁/₂) will be:",
      options: [
        "Very long",
        "Very short",
        "Zero",
        "Infinite"
      ],
      answer: 1,
      explanation: "Since T₁/₂ = 0.693 / λ, decay constant and half-life are inversely proportional. A large λ means fast decay and thus a short half-life."
    },
    {
      id: 11,
      topic: "10 & 11. Half-Life Numerical",
      q: "A radioactive sample with initial count N₀ = 800 has a half-life of 4 hours. How many undecayed nuclei remain after 12 hours?",
      options: [
        "400",
        "200",
        "100",
        "50"
      ],
      answer: 2,
      explanation: "Number of half-lives n = t / T₁/₂ = 12 / 4 = 3 half-lives. Remaining N = 800 × (1/2)³ = 800 / 8 = 100 nuclei."
    },
    {
      id: 12,
      topic: "10. Fractional Decay",
      q: "After 4 elapsed half-lives, what percentage of the original sample has DECAYED?",
      options: [
        "6.25%",
        "12.5%",
        "87.5%",
        "93.75%"
      ],
      answer: 3,
      explanation: "Remaining fraction = (1/2)⁴ = 1/16 = 6.25%. Therefore, decayed fraction = 100% − 6.25% = 93.75%."
    },
    {
      id: 13,
      topic: "13. Alpha Decay Equation",
      q: "When a parent nucleus ²³⁸₉₂U undergoes single alpha (α) decay, the resulting daughter nucleus is:",
      options: [
        "²³⁴₉₀Th",
        "²³⁸₉₃Np",
        "²³⁴₉₂U",
        "²³⁶₉₁Pa"
      ],
      answer: 0,
      explanation: "Alpha emission reduces mass number A by 4 (238 − 4 = 234) and atomic number Z by 2 (92 − 2 = 90), yielding Thorium ²³⁴₉₀Th."
    },
    {
      id: 14,
      topic: "13. Beta-Minus Decay",
      q: "During beta-minus (β⁻) emission from a nucleus, what happens to the mass number A and atomic number Z?",
      options: [
        "A decreases by 4, Z decreases by 2",
        "A remains unchanged, Z increases by 1",
        "A increases by 1, Z remains unchanged",
        "Both A and Z remain unchanged"
      ],
      answer: 1,
      explanation: "In β⁻ decay, a neutron converts to a proton (n → p + e⁻ + ν̄). Therefore, mass number A remains constant while atomic number Z increases by 1."
    },
    {
      id: 15,
      topic: "15. Medical Applications",
      q: "Which radioisotope is widely utilized in radiotherapy for targeted destruction of malignant cancer tumors?",
      options: [
        "Carbon-14",
        "Cobalt-60",
        "Lead-206",
        "Uranium-235"
      ],
      answer: 1,
      explanation: "Cobalt-60 is a potent source of high-energy gamma radiation extensively used in radiotherapy to destroy cancerous cells."
    }
  ];

  // --------------------------------------------------------------------------
  // 2. STATE MANAGEMENT & LOCALSTORAGE
  // --------------------------------------------------------------------------

  const STORAGE_KEY = 'MDCAT_NUCLEAR_PHYSICS_PROGRESS_V1';

  let state = {
    masteredTopics: {},   // topicId (1-16): boolean
    flashcardIndex: 0,
    masteredCards: {},    // cardId: boolean
    quizAnswers: {},      // questionId: selectedOptionIndex
    quizScore: 0
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
      }
    } catch (e) {
      console.warn('Could not load localStorage progress:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateGlobalProgress();
    } catch (e) {
      console.warn('Could not save localStorage progress:', e);
    }
  }

  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }

  function updateGlobalProgress() {
    const totalTopics = 16;
    let completedTopics = 0;
    for (let i = 1; i <= totalTopics; i++) {
      if (state.masteredTopics[i]) completedTopics++;
    }

    // Update topic counts & checkboxes
    const countEl = document.getElementById('completed-topics-count');
    if (countEl) {
      countEl.textContent = `${completedTopics} / ${totalTopics} Done`;
    }

    for (let i = 1; i <= totalTopics; i++) {
      const isDone = !!state.masteredTopics[i];
      const chk = document.getElementById(`topic-chk-${i}`);
      if (chk) chk.checked = isDone;
      const icon = document.getElementById(`chk-icon-${i}`);
      if (icon) icon.textContent = isDone ? '✅' : '⚪';
    }

    // Overall Progress: Topics (50%), Flashcards (25%), Quiz (25%)
    const masteredFc = Object.keys(state.masteredCards).filter(k => state.masteredCards[k]).length;
    const totalFc = FLASHCARDS_DATA.length;
    const quizAnswered = Object.keys(state.quizAnswers).length;
    const totalQuiz = QUIZ_QUESTIONS.length;

    const topicPct = (completedTopics / totalTopics) * 50;
    const fcPct = (masteredFc / totalFc) * 25;
    const quizPct = (quizAnswered / totalQuiz) * 25;
    const overall = Math.round(topicPct + fcPct + quizPct);

    const valEl = document.getElementById('progress-val-text');
    const barEl = document.getElementById('global-progress-bar');
    if (valEl) valEl.textContent = `${overall}%`;
    if (barEl) barEl.style.width = `${overall}%`;

    // Flashcard UI update
    const fcMasterCount = document.getElementById('fc-mastered-count');
    if (fcMasterCount) fcMasterCount.textContent = `${masteredFc} Mastered`;
  }

  // --------------------------------------------------------------------------
  // 3. TAB NAVIGATION & TOPIC SEARCH
  // --------------------------------------------------------------------------

  function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');

        // Trigger canvas resize/redraw if switching to labs or calculator
        if (targetId === 'tab-labs') {
          drawAtomSim();
          drawDecaySim();
          drawChamberSim();
        } else if (targetId === 'tab-calculator') {
          drawDecayGraph();
        }
      });
    });
  }

  function initTopicSearch() {
    const input = document.getElementById('topic-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const cards = document.querySelectorAll('.note-card');

    if (!input) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }

      // Switch to notes tab if searching
      const notesTabBtn = document.getElementById('tab-btn-notes');
      if (q.length > 0 && notesTabBtn && !notesTabBtn.classList.contains('active')) {
        notesTabBtn.click();
      }

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (q.length === 0 || text.includes(q)) {
          card.style.display = 'block';
          if (q.length > 1 && text.includes(q)) {
            card.classList.add('highlight-match');
          } else {
            card.classList.remove('highlight-match');
          }
        } else {
          card.style.display = 'none';
          card.classList.remove('highlight-match');
        }
      });
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      cards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('highlight-match');
      });
      input.focus();
    });
  }

  function initChecklistHandlers() {
    const toggles = document.querySelectorAll('.topic-done-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const id = toggle.getAttribute('data-topic-id');
        state.masteredTopics[id] = toggle.checked;
        saveState();
        showToast(toggle.checked ? `Topic ${id} marked as Mastered!` : `Topic ${id} unmarked.`);
      });
    });

    // Reset All Progress Button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your study progress, flashcards, and test scores?')) {
          state = {
            masteredTopics: {},
            flashcardIndex: 0,
            masteredCards: {},
            quizAnswers: {},
            quizScore: 0
          };
          saveState();
          renderFlashcard();
          renderQuiz();
          showToast('All progress has been reset.');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. LAB 1: INTERACTIVE ATOM & NUCLEUS VISUALIZER (CANVAS)
  // --------------------------------------------------------------------------

  let atomCanvas, atomCtx;
  let atomProtons = 1;
  let atomNeutrons = 0;
  let electronAngle = 0;

  const ELEMENTS = [
    { z: 1, sym: 'H', name: 'Hydrogen' },
    { z: 2, sym: 'He', name: 'Helium' },
    { z: 3, sym: 'Li', name: 'Lithium' },
    { z: 4, sym: 'Be', name: 'Beryllium' },
    { z: 5, sym: 'B', name: 'Boron' },
    { z: 6, sym: 'C', name: 'Carbon' },
    { z: 7, sym: 'N', name: 'Nitrogen' },
    { z: 8, sym: 'O', name: 'Oxygen' },
    { z: 9, sym: 'F', name: 'Fluorine' },
    { z: 10, sym: 'Ne', name: 'Neon' },
    { z: 11, sym: 'Na', name: 'Sodium' },
    { z: 12, sym: 'Mg', name: 'Magnesium' },
    { z: 13, sym: 'Al', name: 'Aluminum' },
    { z: 14, sym: 'Si', name: 'Silicon' },
    { z: 15, sym: 'P', name: 'Phosphorus' },
    { z: 16, sym: 'S', name: 'Sulfur' }
  ];

  function getElement(z) {
    const found = ELEMENTS.find(e => e.z === z);
    return found || { z: z, sym: 'X', name: 'Element' };
  }

  function initAtomLab() {
    atomCanvas = document.getElementById('atom-canvas');
    if (!atomCanvas) return;
    atomCtx = atomCanvas.getContext('2d');

    const sliderP = document.getElementById('slider-protons');
    const sliderN = document.getElementById('slider-neutrons');
    const presets = document.querySelectorAll('.preset-btn');

    if (sliderP) {
      sliderP.addEventListener('input', (e) => {
        atomProtons = parseInt(e.target.value, 10);
        updateAtomStats();
        updatePresetActiveState();
      });
    }

    if (sliderN) {
      sliderN.addEventListener('input', (e) => {
        atomNeutrons = parseInt(e.target.value, 10);
        updateAtomStats();
        updatePresetActiveState();
      });
    }

    presets.forEach(btn => {
      btn.addEventListener('click', () => {
        const z = parseInt(btn.getAttribute('data-z'), 10);
        const n = parseInt(btn.getAttribute('data-n'), 10);
        atomProtons = z;
        atomNeutrons = n;
        if (sliderP) sliderP.value = z;
        if (sliderN) sliderN.value = n;
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateAtomStats();
      });
    });

    updateAtomStats();
    requestAnimationFrame(animateAtom);
  }

  function updatePresetActiveState() {
    const presets = document.querySelectorAll('.preset-btn');
    presets.forEach(b => {
      const z = parseInt(b.getAttribute('data-z'), 10);
      const n = parseInt(b.getAttribute('data-n'), 10);
      if (z === atomProtons && n === atomNeutrons) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  function updateAtomStats() {
    const A = atomProtons + atomNeutrons;
    const elem = getElement(atomProtons);

    const valP = document.getElementById('val-protons');
    const valN = document.getElementById('val-neutrons');
    const valCharge = document.getElementById('val-charge');
    const statA = document.getElementById('stat-mass-num');
    const statNot = document.getElementById('stat-notation');
    const statElec = document.getElementById('stat-electrons');
    const statStab = document.getElementById('stat-stability');

    if (valP) valP.textContent = atomProtons;
    if (valN) valN.textContent = atomNeutrons;
    if (valCharge) valCharge.textContent = `+${atomProtons}e`;
    if (statA) statA.textContent = A;
    if (statElec) statElec.textContent = `${atomProtons} e⁻`;

    if (statNot) {
      statNot.innerHTML = `<span class="sub-sup"><span class="sup">${A}</span><span class="sub">${atomProtons}</span></span>${elem.sym} <span style="font-size:0.8rem; color:#94a3b8; margin-left:6px;">(${elem.name})</span>`;
    }

    // Stability heuristic
    const ratio = atomNeutrons / (atomProtons || 1);
    let isStable = true;
    if (atomProtons === 1) {
      isStable = (atomNeutrons <= 1); // 1H, 2H stable; 3H radioactive
    } else {
      isStable = (ratio >= 0.8 && ratio <= 1.4);
    }

    if (statStab) {
      statStab.innerHTML = isStable
        ? `<span class="badge-status stable">Stable (N/Z = ${ratio.toFixed(2)})</span>`
        : `<span class="badge-status unstable">Unstable / Radioactive (N/Z = ${ratio.toFixed(2)})</span>`;
    }
  }

  function animateAtom() {
    electronAngle += 0.025;
    drawAtomSim();
    requestAnimationFrame(animateAtom);
  }

  function drawAtomSim() {
    if (!atomCtx || !atomCanvas) return;
    const width = atomCanvas.width;
    const height = atomCanvas.height;
    const cx = width / 2;
    const cy = height / 2;

    atomCtx.clearRect(0, 0, width, height);

    // Draw background orbital glow
    const bgGrad = atomCtx.createRadialGradient(cx, cy, 10, cx, cy, 180);
    bgGrad.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
    bgGrad.addColorStop(1, 'rgba(11, 15, 25, 0)');
    atomCtx.fillStyle = bgGrad;
    atomCtx.fillRect(0, 0, width, height);

    // Number of electron shells
    const numElectrons = atomProtons;
    const shell1Count = Math.min(numElectrons, 2);
    const shell2Count = Math.min(Math.max(numElectrons - 2, 0), 8);
    const shell3Count = Math.max(numElectrons - 10, 0);

    const shells = [
      { r: 70, count: shell1Count, speed: 1.0 },
      { r: 115, count: shell2Count, speed: 0.65 },
      { r: 155, count: shell3Count, speed: 0.45 }
    ].filter(s => s.count > 0);

    // Draw Orbital Rings & Electrons
    shells.forEach((shell, sIdx) => {
      atomCtx.beginPath();
      atomCtx.arc(cx, cy, shell.r, 0, Math.PI * 2);
      atomCtx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      atomCtx.setLineDash([4, 4]);
      atomCtx.lineWidth = 1.5;
      atomCtx.stroke();
      atomCtx.setLineDash([]);

      for (let i = 0; i < shell.count; i++) {
        const theta = electronAngle * shell.speed + (i * (Math.PI * 2 / shell.count));
        const ex = cx + Math.cos(theta) * shell.r;
        const ey = cy + Math.sin(theta) * shell.r;

        // Electron glow
        atomCtx.beginPath();
        atomCtx.arc(ex, ey, 7, 0, Math.PI * 2);
        atomCtx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        atomCtx.fill();

        atomCtx.beginPath();
        atomCtx.arc(ex, ey, 4.5, 0, Math.PI * 2);
        atomCtx.fillStyle = '#60a5fa';
        atomCtx.fill();

        // Minus sign
        atomCtx.fillStyle = '#ffffff';
        atomCtx.font = 'bold 8px sans-serif';
        atomCtx.textAlign = 'center';
        atomCtx.textBaseline = 'middle';
        atomCtx.fillText('−', ex, ey - 0.5);
      }
    });

    // Draw Central Nucleus Cluster
    const totalNucleons = atomProtons + atomNeutrons;
    const nucleons = [];

    // Deterministic cluster packing
    for (let p = 0; p < atomProtons; p++) nucleons.push({ type: 'p' });
    for (let n = 0; n < atomNeutrons; n++) nucleons.push({ type: 'n' });

    // Seeded distribution in tight sphere
    const nucleonRadius = Math.max(6, 12 - totalNucleons * 0.2);
    const clusterSpread = Math.min(26, 8 + Math.sqrt(totalNucleons) * 4.5);

    nucleons.forEach((nuc, idx) => {
      // Golden spiral distribution
      const phi = idx * 2.399963;
      const r = Math.sqrt(idx / (totalNucleons || 1)) * clusterSpread;
      const jitterX = Math.sin(electronAngle * 2 + idx) * 0.8;
      const jitterY = Math.cos(electronAngle * 2 + idx) * 0.8;

      const nx = cx + Math.cos(phi) * r + jitterX;
      const ny = cy + Math.sin(phi) * r + jitterY;

      atomCtx.beginPath();
      atomCtx.arc(nx, ny, nucleonRadius, 0, Math.PI * 2);

      if (nuc.type === 'p') {
        atomCtx.fillStyle = '#ef4444';
        atomCtx.fill();
        atomCtx.strokeStyle = '#b91c1c';
        atomCtx.lineWidth = 1;
        atomCtx.stroke();

        // Plus symbol
        atomCtx.fillStyle = '#ffffff';
        atomCtx.font = 'bold 8px sans-serif';
        atomCtx.textAlign = 'center';
        atomCtx.textBaseline = 'middle';
        atomCtx.fillText('+', nx, ny);
      } else {
        atomCtx.fillStyle = '#94a3b8';
        atomCtx.fill();
        atomCtx.strokeStyle = '#475569';
        atomCtx.lineWidth = 1;
        atomCtx.stroke();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. LAB 2: RADIOACTIVE DECAY SIMULATOR & EQUATION BALANCER
  // --------------------------------------------------------------------------

  let decayCanvas, decayCtx;
  let decayMode = 'alpha';
  let decayState = {
    animating: false,
    progress: 0,
    particles: []
  };

  const DECAY_PRESETS = {
    alpha: {
      parent: { sym: 'U', z: 92, a: 238, name: 'Uranium-238' },
      daughter: { sym: 'Th', z: 90, a: 234, name: 'Thorium-234' },
      emitted: { sym: 'He', z: 2, a: 4, label: 'Alpha (⁴₂He²⁺)' },
      desc: 'Alpha Rule: Mass number decreases by 4 (238 → 234), Atomic number decreases by 2 (92 → 90).'
    },
    beta: {
      parent: { sym: 'C', z: 6, a: 14, name: 'Carbon-14' },
      daughter: { sym: 'N', z: 7, a: 14, name: 'Nitrogen-14' },
      emitted: { sym: 'e⁻', z: -1, a: 0, label: 'Beta-minus (⁰₋₁e + ν̄)' },
      desc: 'Beta-Minus Rule: Mass number remains unchanged (14 → 14), Atomic number increases by 1 (6 → 7).'
    },
    gamma: {
      parent: { sym: 'Co*', z: 27, a: 60, name: 'Cobalt-60m (Excited)' },
      daughter: { sym: 'Co', z: 27, a: 60, name: 'Cobalt-60 (Ground)' },
      emitted: { sym: 'γ', z: 0, a: 0, label: 'Gamma Photon (γ)' },
      desc: 'Gamma Rule: High-energy electromagnetic photon emitted. A and Z remain completely unchanged.'
    }
  };

  function initDecayLab() {
    decayCanvas = document.getElementById('decay-canvas');
    if (!decayCanvas) return;
    decayCtx = decayCanvas.getContext('2d');

    const modeRadios = document.querySelectorAll('input[name="decay-mode"]');
    const fireBtn = document.getElementById('btn-fire-decay');
    const resetBtn = document.getElementById('btn-reset-decay');

    modeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        decayMode = radio.value;
        document.querySelectorAll('.radio-label').forEach(lbl => lbl.classList.remove('active'));
        const parentLbl = radio.closest('.radio-label');
        if (parentLbl) parentLbl.classList.add('active');
        resetDecaySimulation();
        updateDecayEquationUI();
      });
    });

    if (fireBtn) {
      fireBtn.addEventListener('click', () => {
        triggerDecay();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetDecaySimulation();
      });
    }

    updateDecayEquationUI();
    drawDecaySim();
  }

  function resetDecaySimulation() {
    decayState.animating = false;
    decayState.progress = 0;
    decayState.particles = [];
    drawDecaySim();
  }

  function triggerDecay() {
    if (decayState.animating) return;
    decayState.animating = true;
    decayState.progress = 0;
    decayState.particles = [];

    // Create explosion sparks
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      decayState.particles.push({
        x: 180,
        y: 140,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: decayMode === 'alpha' ? '#ef4444' : decayMode === 'beta' ? '#3b82f6' : '#a855f7'
      });
    }

    animateDecay();
  }

  function animateDecay() {
    if (!decayState.animating) return;
    decayState.progress += 0.018;

    // Update spark particles
    decayState.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.025;
    });
    decayState.particles = decayState.particles.filter(p => p.life > 0);

    drawDecaySim();

    if (decayState.progress < 1.0) {
      requestAnimationFrame(animateDecay);
    } else {
      decayState.animating = false;
      drawDecaySim();
    }
  }

  function updateDecayEquationUI() {
    const config = DECAY_PRESETS[decayMode];
    const eqText = document.getElementById('live-equation-text');
    const eqDelta = document.getElementById('eq-delta-desc');

    if (eqText) {
      if (decayMode === 'alpha') {
        eqText.innerHTML = `
          <span style="color:#f87171;"><span class="sub-sup"><span class="sup">${config.parent.a}</span><span class="sub">${config.parent.z}</span></span>${config.parent.sym}</span>
          <span class="arrow-sym">&rarr;</span>
          <span style="color:#60a5fa;"><span class="sub-sup"><span class="sup">${config.daughter.a}</span><span class="sub">${config.daughter.z}</span></span>${config.daughter.sym}</span>
          <span class="plus-sym">+</span>
          <span style="color:#fbbf24;"><span class="sub-sup"><span class="sup">4</span><span class="sub">2</span></span>He</span>
        `;
      } else if (decayMode === 'beta') {
        eqText.innerHTML = `
          <span style="color:#f87171;"><span class="sub-sup"><span class="sup">${config.parent.a}</span><span class="sub">${config.parent.z}</span></span>${config.parent.sym}</span>
          <span class="arrow-sym">&rarr;</span>
          <span style="color:#60a5fa;"><span class="sub-sup"><span class="sup">${config.daughter.a}</span><span class="sub">${config.daughter.z}</span></span>${config.daughter.sym}</span>
          <span class="plus-sym">+</span>
          <span style="color:#93c5fd;"><span class="sub-sup"><span class="sup">0</span><span class="sub">-1</span></span>e</span>
          <span class="plus-sym">+</span>
          <span style="color:#c084fc;">ν̄</span>
        `;
      } else {
        eqText.innerHTML = `
          <span style="color:#f87171;"><span class="sub-sup"><span class="sup">${config.parent.a}</span><span class="sub">${config.parent.z}</span></span>${config.parent.sym}</span>
          <span class="arrow-sym">&rarr;</span>
          <span style="color:#60a5fa;"><span class="sub-sup"><span class="sup">${config.daughter.a}</span><span class="sub">${config.daughter.z}</span></span>${config.daughter.sym}</span>
          <span class="plus-sym">+</span>
          <span style="color:#c084fc;">γ</span>
        `;
      }
    }

    if (eqDelta) {
      eqDelta.textContent = config.desc;
    }
  }

  function drawDecaySim() {
    if (!decayCtx || !decayCanvas) return;
    const w = decayCanvas.width;
    const h = decayCanvas.height;
    decayCtx.clearRect(0, 0, w, h);

    const config = DECAY_PRESETS[decayMode];
    const p = decayState.progress;

    // Parent / Daughter Center Position
    const parentX = 160 - p * 20;
    const parentY = 140;

    // Emitted particle trajectory
    const emitStartX = 180;
    const emitEndX = 480;
    const emitX = emitStartX + p * (emitEndX - emitStartX);
    const emitY = 140 - Math.sin(p * Math.PI) * 20;

    // Draw reaction arrow in center background
    decayCtx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    decayCtx.lineWidth = 3;
    decayCtx.setLineDash([6, 6]);
    decayCtx.beginPath();
    decayCtx.moveTo(220, 140);
    decayCtx.lineTo(460, 140);
    decayCtx.stroke();
    decayCtx.setLineDash([]);

    // Draw Main Nucleus (Transitions from Parent to Daughter)
    const isTransmuted = p > 0.4;
    const nucRadius = 38;

    decayCtx.beginPath();
    decayCtx.arc(parentX, parentY, nucRadius, 0, Math.PI * 2);
    const nucGrad = decayCtx.createRadialGradient(parentX - 8, parentY - 8, 4, parentX, parentY, nucRadius);
    if (!isTransmuted) {
      nucGrad.addColorStop(0, '#f87171');
      nucGrad.addColorStop(1, '#991b1b');
    } else {
      nucGrad.addColorStop(0, '#60a5fa');
      nucGrad.addColorStop(1, '#1e40af');
    }
    decayCtx.fillStyle = nucGrad;
    decayCtx.fill();
    decayCtx.strokeStyle = isTransmuted ? '#3b82f6' : '#ef4444';
    decayCtx.lineWidth = 2;
    decayCtx.stroke();

    // Nucleus Text
    decayCtx.fillStyle = '#ffffff';
    decayCtx.font = 'bold 15px monospace';
    decayCtx.textAlign = 'center';
    decayCtx.textBaseline = 'middle';
    const curElem = isTransmuted ? config.daughter : config.parent;
    decayCtx.fillText(`${curElem.sym} (${curElem.z})`, parentX, parentY);

    decayCtx.font = '11px sans-serif';
    decayCtx.fillStyle = isTransmuted ? '#93c5fd' : '#fca5a5';
    decayCtx.fillText(isTransmuted ? 'Daughter Nucleus' : 'Parent Nucleus', parentX, parentY + 54);

    // Draw Spark Particles
    decayState.particles.forEach(pt => {
      decayCtx.beginPath();
      decayCtx.arc(pt.x, pt.y, 2.5 * pt.life, 0, Math.PI * 2);
      decayCtx.fillStyle = pt.color;
      decayCtx.fill();
    });

    // Draw Emitted Particle / Photon
    if (p > 0) {
      if (decayMode === 'alpha') {
        // Draw ⁴He cluster (2 protons, 2 neutrons)
        const aRad = 9;
        const offsets = [
          { dx: -7, dy: -7, col: '#ef4444' },
          { dx: 7, dy: -7, col: '#94a3b8' },
          { dx: -7, dy: 7, col: '#94a3b8' },
          { dx: 7, dy: 7, col: '#ef4444' }
        ];
        offsets.forEach(off => {
          decayCtx.beginPath();
          decayCtx.arc(emitX + off.dx, emitY + off.dy, aRad, 0, Math.PI * 2);
          decayCtx.fillStyle = off.col;
          decayCtx.fill();
          decayCtx.strokeStyle = '#000';
          decayCtx.lineWidth = 1;
          decayCtx.stroke();
        });
        decayCtx.fillStyle = '#fbbf24';
        decayCtx.font = 'bold 12px sans-serif';
        decayCtx.fillText('Alpha (⁴₂He²⁺)', emitX, emitY + 28);

      } else if (decayMode === 'beta') {
        // Draw high speed electron
        decayCtx.beginPath();
        decayCtx.arc(emitX, emitY, 7, 0, Math.PI * 2);
        decayCtx.fillStyle = '#38bdf8';
        decayCtx.shadowColor = '#0284c7';
        decayCtx.shadowBlur = 12;
        decayCtx.fill();
        decayCtx.shadowBlur = 0;

        decayCtx.fillStyle = '#ffffff';
        decayCtx.font = 'bold 9px sans-serif';
        decayCtx.fillText('e⁻', emitX, emitY);

        decayCtx.fillStyle = '#93c5fd';
        decayCtx.font = 'bold 11px sans-serif';
        decayCtx.fillText('β⁻ + antineutrino', emitX, emitY + 24);

      } else {
        // Draw gamma wave pulse
        decayCtx.beginPath();
        decayCtx.strokeStyle = '#c084fc';
        decayCtx.lineWidth = 3;
        decayCtx.shadowColor = '#9333ea';
        decayCtx.shadowBlur = 10;
        for (let x = emitX - 30; x <= emitX + 30; x += 2) {
          const y = emitY + Math.sin((x - emitX) * 0.4) * 12;
          if (x === emitX - 30) decayCtx.moveTo(x, y);
          else decayCtx.lineTo(x, y);
        }
        decayCtx.stroke();
        decayCtx.shadowBlur = 0;

        decayCtx.fillStyle = '#d8b4fe';
        decayCtx.font = 'bold 11px sans-serif';
        decayCtx.fillText('High-Energy γ Photon', emitX, emitY + 26);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. LAB 3: PENETRATING POWER & ABSORPTION CHAMBER (CANVAS)
  // --------------------------------------------------------------------------

  let chamberCanvas, chamberCtx;
  let activeRays = { alpha: true, beta: true, gamma: true };
  let chamberTimer = 0;

  function initChamberLab() {
    chamberCanvas = document.getElementById('chamber-canvas');
    if (!chamberCanvas) return;
    chamberCtx = chamberCanvas.getContext('2d');

    const btnA = document.getElementById('btn-ray-alpha');
    const btnB = document.getElementById('btn-ray-beta');
    const btnG = document.getElementById('btn-ray-gamma');
    const btnAll = document.getElementById('btn-toggle-all-rays');

    if (btnA) {
      btnA.addEventListener('click', () => {
        activeRays.alpha = !activeRays.alpha;
        btnA.classList.toggle('active', activeRays.alpha);
      });
    }
    if (btnB) {
      btnB.addEventListener('click', () => {
        activeRays.beta = !activeRays.beta;
        btnB.classList.toggle('active', activeRays.beta);
      });
    }
    if (btnG) {
      btnG.addEventListener('click', () => {
        activeRays.gamma = !activeRays.gamma;
        btnG.classList.toggle('active', activeRays.gamma);
      });
    }
    if (btnAll) {
      btnAll.addEventListener('click', () => {
        const allOn = activeRays.alpha && activeRays.beta && activeRays.gamma;
        activeRays.alpha = !allOn;
        activeRays.beta = !allOn;
        activeRays.gamma = !allOn;
        btnA.classList.toggle('active', activeRays.alpha);
        btnB.classList.toggle('active', activeRays.beta);
        btnG.classList.toggle('active', activeRays.gamma);
      });
    }

    requestAnimationFrame(animateChamber);
  }

  function animateChamber() {
    chamberTimer += 0.05;
    drawChamberSim();
    requestAnimationFrame(animateChamber);
  }

  function drawChamberSim() {
    if (!chamberCtx || !chamberCanvas) return;
    const w = chamberCanvas.width;
    const h = chamberCanvas.height;
    chamberCtx.clearRect(0, 0, w, h);

    // Barriers positions
    const paperX = 220;
    const alX = 390;
    const leadX = 560;

    // Draw Source Box (Left)
    chamberCtx.fillStyle = '#1e293b';
    chamberCtx.fillRect(20, 40, 50, 180);
    chamberCtx.strokeStyle = '#3b82f6';
    chamberCtx.lineWidth = 2;
    chamberCtx.strokeRect(20, 40, 50, 180);

    chamberCtx.fillStyle = '#93c5fd';
    chamberCtx.font = 'bold 10px sans-serif';
    chamberCtx.textAlign = 'center';
    chamberCtx.fillText('SOURCE', 45, 135);

    // Barrier 1: Paper
    chamberCtx.fillStyle = '#f8fafc';
    chamberCtx.fillRect(paperX, 30, 8, 200);
    chamberCtx.fillStyle = '#cbd5e1';
    chamberCtx.font = 'bold 11px sans-serif';
    chamberCtx.fillText('Paper (0.1mm)', paperX + 4, 245);

    // Barrier 2: Aluminum
    chamberCtx.fillStyle = '#94a3b8';
    chamberCtx.fillRect(alX, 30, 18, 200);
    chamberCtx.fillText('Aluminum (3mm)', alX + 9, 245);

    // Barrier 3: Thick Lead Block
    chamberCtx.fillStyle = '#334155';
    chamberCtx.fillRect(leadX, 30, 45, 200);
    chamberCtx.fillText('Lead Block (10cm)', leadX + 22, 245);

    // Alpha Rays (Blocked by Paper)
    if (activeRays.alpha) {
      const y = 80;
      chamberCtx.beginPath();
      chamberCtx.strokeStyle = '#ef4444';
      chamberCtx.lineWidth = 3;
      chamberCtx.moveTo(70, y);
      chamberCtx.lineTo(paperX, y);
      chamberCtx.stroke();

      // Blocked impact splash
      chamberCtx.fillStyle = '#ef4444';
      chamberCtx.beginPath();
      chamberCtx.arc(paperX, y, 5, 0, Math.PI * 2);
      chamberCtx.fill();

      chamberCtx.font = 'bold 10px sans-serif';
      chamberCtx.fillText('Alpha (α) — STOPPED', 140, y - 10);
    }

    // Beta Rays (Passes Paper, Blocked by Aluminum)
    if (activeRays.beta) {
      const y = 130;
      chamberCtx.beginPath();
      chamberCtx.strokeStyle = '#38bdf8';
      chamberCtx.lineWidth = 2.5;
      chamberCtx.moveTo(70, y);
      chamberCtx.lineTo(alX, y);
      chamberCtx.stroke();

      chamberCtx.fillStyle = '#38bdf8';
      chamberCtx.beginPath();
      chamberCtx.arc(alX, y, 5, 0, Math.PI * 2);
      chamberCtx.fill();

      chamberCtx.font = 'bold 10px sans-serif';
      chamberCtx.fillText('Beta (β⁻) — STOPPED BY Al', 280, y - 10);
    }

    // Gamma Rays (Passes Paper & Al, penetrates Lead)
    if (activeRays.gamma) {
      const y = 180;
      chamberCtx.beginPath();
      chamberCtx.strokeStyle = '#c084fc';
      chamberCtx.lineWidth = 2;
      for (let x = 70; x <= leadX + 35; x += 3) {
        const py = y + Math.sin((x - chamberTimer * 40) * 0.2) * 6;
        if (x === 70) chamberCtx.moveTo(x, py);
        else chamberCtx.lineTo(x, py);
      }
      chamberCtx.stroke();

      chamberCtx.fillStyle = '#c084fc';
      chamberCtx.font = 'bold 10px sans-serif';
      chamberCtx.fillText('Gamma (γ) — PENETRATES', 440, y - 12);
    }
  }

  // --------------------------------------------------------------------------
  // 7. HALF-LIFE & DECAY CALCULATOR + REAL-TIME GRAPH
  // --------------------------------------------------------------------------

  let graphCanvas, graphCtx;

  function initCalculator() {
    graphCanvas = document.getElementById('decay-graph-canvas');
    if (graphCanvas) graphCtx = graphCanvas.getContext('2d');

    const modeSelect = document.getElementById('calc-mode-select');
    const btnCalc = document.getElementById('btn-calculate');

    // Preset Example Buttons
    const ex1 = document.getElementById('btn-example-1');
    const ex2 = document.getElementById('btn-example-2');
    const ex3 = document.getElementById('btn-example-3');

    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        handleCalcModeChange(modeSelect.value);
        performCalculation();
      });
    }

    if (btnCalc) {
      btnCalc.addEventListener('click', () => {
        performCalculation();
      });
    }

    if (ex1) {
      ex1.addEventListener('click', () => {
        document.getElementById('input-n0').value = 800;
        document.getElementById('input-thalf').value = 4;
        document.getElementById('input-time').value = 12;
        modeSelect.value = 'remaining';
        handleCalcModeChange('remaining');
        performCalculation();
      });
    }

    if (ex2) {
      ex2.addEventListener('click', () => {
        document.getElementById('input-n0').value = 1000;
        document.getElementById('input-thalf').value = 5730;
        document.getElementById('input-time').value = 17190;
        document.getElementById('select-thalf-unit').value = 'years';
        document.getElementById('select-time-unit').value = 'years';
        modeSelect.value = 'remaining';
        handleCalcModeChange('remaining');
        performCalculation();
      });
    }

    if (ex3) {
      ex3.addEventListener('click', () => {
        document.getElementById('input-n0').value = 500;
        document.getElementById('input-thalf').value = 8;
        document.getElementById('input-time').value = 24;
        document.getElementById('select-thalf-unit').value = 'days';
        document.getElementById('select-time-unit').value = 'days';
        modeSelect.value = 'remaining';
        handleCalcModeChange('remaining');
        performCalculation();
      });
    }

    // Auto calculate on any input change
    ['input-n0', 'input-thalf', 'input-time', 'input-lambda', 'input-target-n'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', performCalculation);
    });

    performCalculation();
  }

  function handleCalcModeChange(mode) {
    const grpN0 = document.getElementById('grp-initial-n');
    const grpThalf = document.getElementById('grp-half-life');
    const grpTime = document.getElementById('grp-time');
    const grpLambda = document.getElementById('grp-lambda');
    const grpTargetN = document.getElementById('grp-final-n');

    grpN0.classList.remove('hidden');
    grpThalf.classList.remove('hidden');
    grpTime.classList.remove('hidden');
    grpLambda.classList.add('hidden');
    grpTargetN.classList.add('hidden');

    if (mode === 'remaining') {
      // standard inputs
    } else if (mode === 'time') {
      grpTargetN.classList.remove('hidden');
    } else if (mode === 'halflife') {
      grpThalf.classList.add('hidden');
      grpTime.classList.add('hidden');
      grpLambda.classList.remove('hidden');
    } else if (mode === 'lambda') {
      grpTime.classList.add('hidden');
      grpLambda.classList.add('hidden');
    }
  }

  function performCalculation() {
    const mode = document.getElementById('calc-mode-select').value;
    const solContainer = document.getElementById('solution-content');
    const statsEl = document.getElementById('graph-quick-stats');
    if (!solContainer) return;

    const N0 = parseFloat(document.getElementById('input-n0').value) || 800;
    const Thalf = parseFloat(document.getElementById('input-thalf').value) || 4;
    const time = parseFloat(document.getElementById('input-time').value) || 12;
    const timeUnit = document.getElementById('select-time-unit').value;
    const lambdaVal = parseFloat(document.getElementById('input-lambda').value) || 0.17325;
    const targetN = parseFloat(document.getElementById('input-target-n').value) || 100;

    let html = '';

    if (mode === 'remaining') {
      const n = time / Thalf;
      const fractionRemaining = Math.pow(0.5, n);
      const remainingN = N0 * fractionRemaining;
      const decayedN = N0 - remainingN;
      const pctRemaining = fractionRemaining * 100;
      const pctDecayed = (1 - fractionRemaining) * 100;
      const lambda = 0.693 / Thalf;

      if (statsEl) {
        statsEl.innerHTML = `<span>n = <strong>${n.toFixed(2)}</strong> half-lives</span> | <span>Remaining = <strong>${pctRemaining.toFixed(2)}%</strong></span>`;
      }

      html = `
        <div class="sol-step-row">
          <div class="sol-step-title">Step 1: Calculate Elapsed Half-Lives (n)</div>
          <div class="sol-step-math">n = t / T₁/₂ = ${time} ${timeUnit} / ${Thalf} ${timeUnit} = <strong>${n.toFixed(3)} half-lives</strong></div>
        </div>
        <div class="sol-step-row">
          <div class="sol-step-title">Step 2: Apply Half-Life Decay Formula</div>
          <div class="sol-step-math">N = N₀ × (1/2)ⁿ = ${N0} × (0.5)^${n.toFixed(3)} = <strong>${remainingN.toFixed(2)}</strong></div>
        </div>
        <div class="sol-step-row">
          <div class="sol-step-title">Step 3: Decay Constant & Activity Relation</div>
          <div class="sol-step-math">λ = 0.693 / T₁/₂ = 0.693 / ${Thalf} = <strong>${lambda.toFixed(5)} ${timeUnit}⁻¹</strong></div>
        </div>
        <div class="sol-final-highlight">
          <div class="sol-final-title">✅ Final Solution Breakdown</div>
          <div class="sol-final-value">Remaining Nuclei (N) = ${remainingN.toFixed(2)} (${pctRemaining.toFixed(2)}%)</div>
          <div style="font-size:0.85rem; color:#cbd5e1; margin-top:4px;">Decayed Nuclei = ${decayedN.toFixed(2)} (${pctDecayed.toFixed(2)}% of original sample)</div>
        </div>
      `;

      drawDecayGraphData({ N0, Thalf, time, n, remainingN });

    } else if (mode === 'time') {
      const fraction = targetN / N0;
      const n = Math.log(fraction) / Math.log(0.5);
      const calculatedTime = n * Thalf;

      html = `
        <div class="sol-step-row">
          <div class="sol-step-title">Step 1: Determine Remaining Ratio (N / N₀)</div>
          <div class="sol-step-math">N / N₀ = ${targetN} / ${N0} = <strong>${fraction.toFixed(4)}</strong> (${(fraction * 100).toFixed(2)}%)</div>
        </div>
        <div class="sol-step-row">
          <div class="sol-step-title">Step 2: Solve for Elapsed Half-Lives (n)</div>
          <div class="sol-step-math">(1/2)ⁿ = ${fraction.toFixed(4)} &implies; n = ln(${fraction.toFixed(4)}) / ln(0.5) = <strong>${n.toFixed(3)} half-lives</strong></div>
        </div>
        <div class="sol-final-highlight">
          <div class="sol-final-title">✅ Total Elapsed Time</div>
          <div class="sol-final-value">t = n × T₁/₂ = ${n.toFixed(3)} × ${Thalf} = ${calculatedTime.toFixed(2)} ${timeUnit}</div>
        </div>
      `;

      drawDecayGraphData({ N0, Thalf, time: calculatedTime, n, remainingN: targetN });

    } else if (mode === 'halflife') {
      const calculatedThalf = 0.693 / lambdaVal;

      html = `
        <div class="sol-step-row">
          <div class="sol-step-title">Formula: T₁/₂ = ln(2) / λ = 0.693 / λ</div>
          <div class="sol-step-math">T₁/₂ = 0.693 / ${lambdaVal} s⁻¹ = <strong>${calculatedThalf.toFixed(4)} seconds</strong></div>
        </div>
        <div class="sol-final-highlight">
          <div class="sol-final-title">✅ Resulting Half-Life</div>
          <div class="sol-final-value">T₁/₂ = ${calculatedThalf.toFixed(4)} s</div>
        </div>
      `;

      drawDecayGraphData({ N0: 100, Thalf: calculatedThalf, time: calculatedThalf * 2, n: 2, remainingN: 25 });

    } else if (mode === 'lambda') {
      const calculatedLambda = 0.693 / Thalf;

      html = `
        <div class="sol-step-row">
          <div class="sol-step-title">Formula: λ = ln(2) / T₁/₂ = 0.693 / T₁/₂</div>
          <div class="sol-step-math">λ = 0.693 / ${Thalf} ${timeUnit} = <strong>${calculatedLambda.toFixed(6)} ${timeUnit}⁻¹</strong></div>
        </div>
        <div class="sol-final-highlight">
          <div class="sol-final-title">✅ Decay Constant (λ)</div>
          <div class="sol-final-value">λ = ${calculatedLambda.toFixed(6)} ${timeUnit}⁻¹</div>
        </div>
      `;

      drawDecayGraphData({ N0: 100, Thalf, time: Thalf * 2, n: 2, remainingN: 25 });
    }

    solContainer.innerHTML = html;
  }

  function drawDecayGraphData(data) {
    if (!graphCtx || !graphCanvas) return;
    const w = graphCanvas.width;
    const h = graphCanvas.height;

    graphCtx.clearRect(0, 0, w, h);

    const padLeft = 60;
    const padRight = 30;
    const padTop = 25;
    const padBottom = 40;

    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // Draw coordinate axes
    graphCtx.strokeStyle = '#334155';
    graphCtx.lineWidth = 1.5;
    graphCtx.beginPath();
    graphCtx.moveTo(padLeft, padTop);
    graphCtx.lineTo(padLeft, padTop + plotH);
    graphCtx.lineTo(padLeft + plotW, padTop + plotH);
    graphCtx.stroke();

    // Axis labels
    graphCtx.fillStyle = '#94a3b8';
    graphCtx.font = '11px sans-serif';
    graphCtx.textAlign = 'center';
    graphCtx.fillText('Elapsed Half-Lives (n)', padLeft + plotW / 2, h - 8);

    graphCtx.save();
    graphCtx.translate(16, padTop + plotH / 2);
    graphCtx.rotate(-Math.PI / 2);
    graphCtx.fillText('Nuclei Remaining (N)', 0, 0);
    graphCtx.restore();

    // Draw grid & half-life markers (0 to 5)
    const maxN = 5;
    for (let i = 0; i <= maxN; i++) {
      const gx = padLeft + (i / maxN) * plotW;
      graphCtx.strokeStyle = '#1e293b';
      graphCtx.beginPath();
      graphCtx.moveTo(gx, padTop);
      graphCtx.lineTo(gx, padTop + plotH);
      graphCtx.stroke();

      graphCtx.fillStyle = '#64748b';
      graphCtx.font = '10px monospace';
      graphCtx.fillText(`${i}T`, gx, padTop + plotH + 16);
    }

    // Y ticks (0%, 25%, 50%, 75%, 100%)
    for (let p = 0; p <= 1; p += 0.25) {
      const gy = padTop + plotH - p * plotH;
      graphCtx.strokeStyle = '#1e293b';
      graphCtx.beginPath();
      graphCtx.moveTo(padLeft, gy);
      graphCtx.lineTo(padLeft + plotW, gy);
      graphCtx.stroke();

      graphCtx.fillStyle = '#64748b';
      graphCtx.textAlign = 'right';
      graphCtx.fillText(`${Math.round(p * data.N0)}`, padLeft - 8, gy + 3);
    }

    // Plot theoretical curve N(t) = N0 * (1/2)^n
    graphCtx.beginPath();
    graphCtx.strokeStyle = '#3b82f6';
    graphCtx.lineWidth = 2.5;

    const steps = 120;
    for (let s = 0; s <= steps; s++) {
      const curN = (s / steps) * maxN;
      const frac = Math.pow(0.5, curN);
      const px = padLeft + (curN / maxN) * plotW;
      const py = padTop + plotH - frac * plotH;

      if (s === 0) graphCtx.moveTo(px, py);
      else graphCtx.lineTo(px, py);
    }
    graphCtx.stroke();

    // Plot Half-Life Points
    for (let i = 0; i <= maxN; i++) {
      const frac = Math.pow(0.5, i);
      const px = padLeft + (i / maxN) * plotW;
      const py = padTop + plotH - frac * plotH;

      graphCtx.beginPath();
      graphCtx.arc(px, py, 4, 0, Math.PI * 2);
      graphCtx.fillStyle = '#60a5fa';
      graphCtx.fill();
    }

    // Highlight user's calculated point
    const userN = Math.min(Math.max(data.n, 0), maxN);
    const userFrac = Math.pow(0.5, userN);
    const userPx = padLeft + (userN / maxN) * plotW;
    const userPy = padTop + plotH - userFrac * plotH;

    // Vertical dashed indicator
    graphCtx.setLineDash([4, 4]);
    graphCtx.strokeStyle = '#10b981';
    graphCtx.lineWidth = 1.5;
    graphCtx.beginPath();
    graphCtx.moveTo(userPx, padTop + plotH);
    graphCtx.lineTo(userPx, userPy);
    graphCtx.stroke();
    graphCtx.setLineDash([]);

    // Dot with outer glow
    graphCtx.beginPath();
    graphCtx.arc(userPx, userPy, 8, 0, Math.PI * 2);
    graphCtx.fillStyle = 'rgba(16, 185, 129, 0.3)';
    graphCtx.fill();

    graphCtx.beginPath();
    graphCtx.arc(userPx, userPy, 5, 0, Math.PI * 2);
    graphCtx.fillStyle = '#10b981';
    graphCtx.fill();

    // Label
    graphCtx.fillStyle = '#34d399';
    graphCtx.font = 'bold 11px monospace';
    graphCtx.textAlign = 'left';
    graphCtx.fillText(`(n=${data.n.toFixed(2)}, N=${data.remainingN.toFixed(1)})`, Math.min(userPx + 10, w - 160), Math.max(userPy - 10, padTop + 14));
  }

  function drawDecayGraph() {
    performCalculation();
  }

  // --------------------------------------------------------------------------
  // 8. TAB 4: RAPID FLASHCARDS
  // --------------------------------------------------------------------------

  function initFlashcards() {
    const cardWrapper = document.getElementById('flashcard-wrapper');
    const btnFlip = document.getElementById('btn-fc-flip');
    const btnPrev = document.getElementById('btn-fc-prev');
    const btnNext = document.getElementById('btn-fc-next');
    const btnMaster = document.getElementById('btn-fc-master');

    if (cardWrapper) {
      cardWrapper.addEventListener('click', toggleFlashcardFlip);
      cardWrapper.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          toggleFlashcardFlip();
        } else if (e.code === 'ArrowRight') {
          nextFlashcard();
        } else if (e.code === 'ArrowLeft') {
          prevFlashcard();
        }
      });
    }

    if (btnFlip) btnFlip.addEventListener('click', toggleFlashcardFlip);
    if (btnPrev) btnPrev.addEventListener('click', prevFlashcard);
    if (btnNext) btnNext.addEventListener('click', nextFlashcard);

    if (btnMaster) {
      btnMaster.addEventListener('click', () => {
        const curCard = FLASHCARDS_DATA[state.flashcardIndex];
        state.masteredCards[curCard.id] = !state.masteredCards[curCard.id];
        saveState();
        renderFlashcard();
        showToast(state.masteredCards[curCard.id] ? 'Card marked as Mastered!' : 'Card unmarked.');
      });
    }

    renderFlashcard();
  }

  function toggleFlashcardFlip() {
    const wrapper = document.getElementById('flashcard-wrapper');
    if (wrapper) wrapper.classList.toggle('flipped');
  }

  function nextFlashcard() {
    const wrapper = document.getElementById('flashcard-wrapper');
    if (wrapper) wrapper.classList.remove('flipped');
    state.flashcardIndex = (state.flashcardIndex + 1) % FLASHCARDS_DATA.length;
    renderFlashcard();
  }

  function prevFlashcard() {
    const wrapper = document.getElementById('flashcard-wrapper');
    if (wrapper) wrapper.classList.remove('flipped');
    state.flashcardIndex = (state.flashcardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
    renderFlashcard();
  }

  function renderFlashcard() {
    const card = FLASHCARDS_DATA[state.flashcardIndex];
    if (!card) return;

    const frontEl = document.getElementById('fc-front-text');
    const backEl = document.getElementById('fc-back-text');
    const counterEl = document.getElementById('fc-counter');
    const masterBtn = document.getElementById('btn-fc-master');

    if (frontEl) frontEl.innerHTML = card.q;
    if (backEl) backEl.innerHTML = card.a;
    if (counterEl) counterEl.textContent = `Card ${state.flashcardIndex + 1} / ${FLASHCARDS_DATA.length}`;

    const isMastered = !!state.masteredCards[card.id];
    if (masterBtn) {
      masterBtn.innerHTML = isMastered ? '⭐ Mastered' : '☆ Mark Mastered';
      masterBtn.style.color = isMastered ? '#6ee7b7' : '#ffffff';
    }

    // Render Quick Jump Dots
    const dotsContainer = document.getElementById('fc-dots-container');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      FLASHCARDS_DATA.forEach((fc, idx) => {
        const dot = document.createElement('div');
        dot.className = `fc-dot ${idx === state.flashcardIndex ? 'active' : ''} ${state.masteredCards[fc.id] ? 'mastered' : ''}`;
        dot.title = `Card ${idx + 1}`;
        dot.addEventListener('click', () => {
          const wrapper = document.getElementById('flashcard-wrapper');
          if (wrapper) wrapper.classList.remove('flipped');
          state.flashcardIndex = idx;
          renderFlashcard();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 9. TAB 5: MDCAT PRACTICE TEST (QUIZ ENGINE)
  // --------------------------------------------------------------------------

  function initQuiz() {
    const resetBtn = document.getElementById('btn-reset-quiz');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Restart quiz and clear current answers?')) {
          state.quizAnswers = {};
          saveState();
          renderQuiz();
          showToast('Practice test restarted.');
        }
      });
    }

    renderQuiz();
  }

  function renderQuiz() {
    const listEl = document.getElementById('quiz-questions-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    let correctCount = 0;
    const answeredCount = Object.keys(state.quizAnswers).length;

    QUIZ_QUESTIONS.forEach((qObj, qIdx) => {
      const isAnswered = state.quizAnswers[qObj.id] !== undefined;
      const userChoice = state.quizAnswers[qObj.id];
      const isCorrect = userChoice === qObj.answer;
      if (isCorrect) correctCount++;

      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.id = `quiz-card-${qObj.id}`;

      // Card Header
      const head = document.createElement('div');
      head.className = 'quiz-card-head';
      head.innerHTML = `
        <span class="q-num-badge">Question ${qIdx + 1} of ${QUIZ_QUESTIONS.length}</span>
        <span class="q-topic-tag">${qObj.topic}</span>
      `;

      // Question Text
      const qText = document.createElement('div');
      qText.className = 'quiz-q-text';
      qText.textContent = qObj.q;

      // Options
      const optionsGrid = document.createElement('div');
      optionsGrid.className = 'quiz-options-grid';

      const letters = ['A', 'B', 'C', 'D'];
      qObj.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-opt-btn';

        if (isAnswered) {
          btn.disabled = true;
          if (optIdx === qObj.answer) {
            btn.classList.add('correct');
          } else if (optIdx === userChoice) {
            btn.classList.add('wrong');
          }
        }

        btn.innerHTML = `
          <span class="opt-letter">${letters[optIdx]}</span>
          <span>${optText}</span>
        `;

        btn.addEventListener('click', () => {
          if (state.quizAnswers[qObj.id] === undefined) {
            state.quizAnswers[qObj.id] = optIdx;
            saveState();
            renderQuiz();
          }
        });

        optionsGrid.appendChild(btn);
      });

      card.appendChild(head);
      card.appendChild(qText);
      card.appendChild(optionsGrid);

      // Show explanation if answered
      if (isAnswered) {
        const expBox = document.createElement('div');
        expBox.className = `quiz-explanation-box ${isCorrect ? 'correct-exp' : 'wrong-exp'}`;
        expBox.innerHTML = `
          <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect.'}</strong> ${qObj.explanation}
        `;
        card.appendChild(expBox);
      }

      listEl.appendChild(card);
    });

    // Update scoreboard
    const scoreDisplay = document.getElementById('quiz-score-display');
    const accuracyDisplay = document.getElementById('quiz-accuracy-display');
    const answeredCountEl = document.getElementById('quiz-answered-count');
    const progressFill = document.getElementById('quiz-progress-fill');

    if (scoreDisplay) scoreDisplay.textContent = `${correctCount} / ${QUIZ_QUESTIONS.length}`;
    const acc = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    if (accuracyDisplay) accuracyDisplay.textContent = `${acc}%`;
    if (answeredCountEl) answeredCountEl.textContent = `${answeredCount} of ${QUIZ_QUESTIONS.length} Answered`;
    if (progressFill) progressFill.style.width = `${(answeredCount / QUIZ_QUESTIONS.length) * 100}%`;
  }

  // --------------------------------------------------------------------------
  // 10. SCROLLSPY FOR NOTES SIDEBAR
  // --------------------------------------------------------------------------

  function initScrollSpy() {
    const cards = document.querySelectorAll('.note-card');
    const navLinks = document.querySelectorAll('.topic-link');

    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 180;

      cards.forEach(card => {
        const top = card.offsetTop;
        const height = card.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = card.id;
        }
      });

      if (currentId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 11. INITIALIZATION ON DOM READY
  // --------------------------------------------------------------------------

  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initTabNavigation();
    initTopicSearch();
    initChecklistHandlers();
    initAtomLab();
    initDecayLab();
    initChamberLab();
    initCalculator();
    initFlashcards();
    initQuiz();
    initScrollSpy();
    updateGlobalProgress();
  });

})();
