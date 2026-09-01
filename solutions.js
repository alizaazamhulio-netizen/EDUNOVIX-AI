/**
 * MDCAT Solutions Lab — Master JavaScript Logic
 * Includes:
 * 1. Search & Filter Engine with text highlighting
 * 2. LocalStorage Persistence (Mastery Tracker & Saved Bookmarks)
 * 3. 6 Interactive Real Working Chemistry Calculators
 * 4. 3 HTML5 Canvas Virtual Lab Simulations (Tyndall Effect, Saturation, U-Tube Osmosis)
 * 5. 12-Question High-Yield MDCAT Practice Quiz with Detailed Explanations
 * 6. Interactive Flashcard Revision Suite
 * 7. Theme Switching (Dark/Light) & Print Support
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const STORAGE_KEY_MASTERED = 'mdcat_solutions_mastered';
  const STORAGE_KEY_SAVED = 'mdcat_solutions_saved';
  const STORAGE_KEY_THEME = 'mdcat_solutions_theme';

  let masteredNotes = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_MASTERED) || '[]'));
  let savedNotes = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED) || '[]'));
  let currentCategory = 'all';
  let isSavedOnlyFilter = false;

  // --- DOM ELEMENTS ---
  const topicSearch = document.getElementById('topicSearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryNav = document.getElementById('categoryNav');
  const notesGridContainer = document.getElementById('notesGridContainer');
  const noteCards = Array.from(document.querySelectorAll('.note-card'));
  const noResultsMsg = document.getElementById('noResultsMsg');
  const masteryProgressBar = document.getElementById('masteryProgressBar');
  const masteryProgressText = document.getElementById('masteryProgressText');
  const resetProgressBtn = document.getElementById('resetProgressBtn');
  const bookmarkFilterBtn = document.getElementById('bookmarkFilterBtn');
  const savedCountLabel = document.getElementById('savedCountLabel');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const printNotesBtn = document.getElementById('printNotesBtn');

  // --- INITIALIZE THEME ---
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
  }

  function updateThemeButton(theme) {
    if (theme === 'light') {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Dark';
    } else {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Light';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY_THEME, next);
    updateThemeButton(next);
  });

  printNotesBtn.addEventListener('click', () => {
    window.print();
  });

  // --- PERSISTENCE & MASTERY TRACKER ---
  function updateMasteryUI() {
    const total = noteCards.length;
    const count = masteredNotes.size;
    const pct = Math.round((count / total) * 100);

    masteryProgressBar.style.width = pct + '%';
    masteryProgressText.textContent = `Progress: ${count} / ${total} Mastered (${pct}%)`;

    savedCountLabel.textContent = `Saved (${savedNotes.size})`;

    noteCards.forEach((card) => {
      const id = card.getAttribute('data-note-id');
      const checkBtn = card.querySelector('.check-btn');
      const starBtn = card.querySelector('.star-btn');

      if (masteredNotes.has(id)) {
        card.classList.add('mastered');
        checkBtn.classList.add('active-check');
        checkBtn.textContent = '✓ Mastered';
      } else {
        card.classList.remove('mastered');
        checkBtn.classList.remove('active-check');
        checkBtn.textContent = '✓';
      }

      if (savedNotes.has(id)) {
        card.classList.add('bookmarked');
        starBtn.classList.add('active-star');
      } else {
        card.classList.remove('bookmarked');
        starBtn.classList.remove('active-star');
      }
    });

    localStorage.setItem(STORAGE_KEY_MASTERED, JSON.stringify(Array.from(masteredNotes)));
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(Array.from(savedNotes)));
  }

  // Bind note card actions
  noteCards.forEach((card) => {
    const id = card.getAttribute('data-note-id');
    const checkBtn = card.querySelector('.check-btn');
    const starBtn = card.querySelector('.star-btn');

    checkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (masteredNotes.has(id)) {
        masteredNotes.delete(id);
      } else {
        masteredNotes.add(id);
      }
      updateMasteryUI();
    });

    starBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (savedNotes.has(id)) {
        savedNotes.delete(id);
      } else {
        savedNotes.add(id);
      }
      updateMasteryUI();
      if (isSavedOnlyFilter) applyFilters();
    });
  });

  resetProgressBtn.addEventListener('click', () => {
    if (confirm('Reset your study progress to 0%?')) {
      masteredNotes.clear();
      updateMasteryUI();
    }
  });

  bookmarkFilterBtn.addEventListener('click', () => {
    isSavedOnlyFilter = !isSavedOnlyFilter;
    bookmarkFilterBtn.classList.toggle('active', isSavedOnlyFilter);
    applyFilters();
  });

  // --- SEARCH & FILTER LOGIC ---
  function applyFilters() {
    const query = topicSearch.value.trim().toLowerCase();
    clearSearchBtn.style.display = query ? 'block' : 'none';

    let visibleCount = 0;

    // Show/hide sections based on category
    const sectionTraps = document.getElementById('sectionTraps');
    const sectionSimulations = document.getElementById('sectionSimulations');
    const sectionCalculators = document.getElementById('sectionCalculators');
    const sectionNotes = document.getElementById('sectionNotes');
    const sectionTables = document.getElementById('sectionTables');
    const sectionQuiz = document.getElementById('sectionQuiz');

    if (currentCategory === 'traps') {
      sectionTraps.style.display = 'block';
      sectionSimulations.style.display = 'none';
      sectionCalculators.style.display = 'none';
      sectionNotes.style.display = 'none';
      sectionTables.style.display = 'none';
      sectionQuiz.style.display = 'none';
      return;
    } else if (currentCategory === 'simulations') {
      sectionTraps.style.display = 'none';
      sectionSimulations.style.display = 'block';
      sectionCalculators.style.display = 'none';
      sectionNotes.style.display = 'none';
      sectionTables.style.display = 'none';
      sectionQuiz.style.display = 'none';
      return;
    } else if (currentCategory === 'calculators') {
      sectionTraps.style.display = 'none';
      sectionSimulations.style.display = 'none';
      sectionCalculators.style.display = 'block';
      sectionNotes.style.display = 'none';
      sectionTables.style.display = 'none';
      sectionQuiz.style.display = 'none';
      return;
    } else if (currentCategory === 'quiz') {
      sectionTraps.style.display = 'none';
      sectionSimulations.style.display = 'none';
      sectionCalculators.style.display = 'none';
      sectionNotes.style.display = 'none';
      sectionTables.style.display = 'none';
      sectionQuiz.style.display = 'block';
      return;
    } else {
      // Default: show notes and sections
      sectionTraps.style.display = currentCategory === 'all' && !query ? 'block' : 'none';
      sectionSimulations.style.display = currentCategory === 'all' && !query ? 'block' : 'none';
      sectionCalculators.style.display = currentCategory === 'all' && !query ? 'block' : 'none';
      sectionNotes.style.display = 'block';
      sectionTables.style.display = currentCategory === 'all' && !query ? 'block' : 'none';
      sectionQuiz.style.display = currentCategory === 'all' && !query ? 'block' : 'none';
    }

    noteCards.forEach((card) => {
      const id = card.getAttribute('data-note-id');
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.innerText.toLowerCase();

      const matchesQuery = !query || cardText.includes(query);
      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSaved = !isSavedOnlyFilter || savedNotes.has(id);

      if (matchesQuery && matchesCategory && matchesSaved) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  topicSearch.addEventListener('input', applyFilters);
  clearSearchBtn.addEventListener('click', () => {
    topicSearch.value = '';
    applyFilters();
    topicSearch.focus();
  });

  categoryNav.querySelectorAll('.nav-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryNav.querySelectorAll('.nav-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  // --- CALCULATORS LOGIC ---

  // 1. Molarity Calculator
  function calcMolarity() {
    const soluteVal = parseFloat(document.getElementById('mol_solute').value) || 0;
    const soluteUnit = document.getElementById('mol_solute_unit').value;
    const volumeVal = parseFloat(document.getElementById('mol_volume').value) || 0;
    const volumeUnit = document.getElementById('mol_volume_unit').value;
    const resEl = document.getElementById('mol_result');
    const stepsEl = document.getElementById('mol_steps');

    if (volumeVal <= 0 || soluteVal <= 0) {
      resEl.textContent = 'M = 0.000 M';
      stepsEl.textContent = 'Please enter positive values for solute and volume.';
      return;
    }

    let moles = soluteVal;
    let soluteFormula = '';
    if (soluteUnit === 'grams_nacl') {
      moles = soluteVal / 58.5;
      soluteFormula = `(${soluteVal}g ÷ 58.5 g/mol = ${moles.toFixed(4)} mol NaCl)`;
    } else if (soluteUnit === 'grams_glucose') {
      moles = soluteVal / 180;
      soluteFormula = `(${soluteVal}g ÷ 180 g/mol = ${moles.toFixed(4)} mol Glucose)`;
    } else if (soluteUnit === 'grams_naoh') {
      moles = soluteVal / 40;
      soluteFormula = `(${soluteVal}g ÷ 40 g/mol = ${moles.toFixed(4)} mol NaOH)`;
    }

    let volumeL = volumeVal;
    if (volumeUnit === 'mL') volumeL = volumeVal / 1000;
    else if (volumeUnit === 'dm3') volumeL = volumeVal;

    const M = moles / volumeL;
    resEl.textContent = `M = ${M.toFixed(4)} M (mol/L)`;
    stepsEl.textContent = `${moles.toFixed(3)} moles ÷ ${volumeL.toFixed(3)} L = ${M.toFixed(4)} mol/L ${soluteFormula}`;
  }

  // 2. Molality Calculator
  function calcMolality() {
    const soluteMoles = parseFloat(document.getElementById('moly_solute').value) || 0;
    const solventMass = parseFloat(document.getElementById('moly_solvent').value) || 0;
    const solventUnit = document.getElementById('moly_solvent_unit').value;
    const resEl = document.getElementById('moly_result');
    const stepsEl = document.getElementById('moly_steps');

    if (soluteMoles <= 0 || solventMass <= 0) {
      resEl.textContent = 'm = 0.000 mol/kg';
      stepsEl.textContent = 'Please enter positive values.';
      return;
    }

    const massKg = solventUnit === 'g' ? solventMass / 1000 : solventMass;
    const molality = soluteMoles / massKg;

    resEl.textContent = `m = ${molality.toFixed(4)} mol/kg`;
    stepsEl.textContent = `${soluteMoles.toFixed(3)} mol ÷ ${massKg.toFixed(3)} kg solvent = ${molality.toFixed(4)} m (Temperature Independent!)`;
  }

  // 3. Dilution Calculator (M1V1 = M2V2)
  function calcDilution() {
    const solveFor = document.getElementById('dil_solve_for').value;
    const m1Input = document.getElementById('dil_m1');
    const v1Input = document.getElementById('dil_v1');
    const m2Input = document.getElementById('dil_m2');
    const v2Input = document.getElementById('dil_v2');
    const resEl = document.getElementById('dil_result');
    const stepsEl = document.getElementById('dil_steps');

    m1Input.disabled = solveFor === 'M1';
    v1Input.disabled = solveFor === 'V1';
    m2Input.disabled = solveFor === 'M2';
    v2Input.disabled = solveFor === 'V2';

    const m1 = parseFloat(m1Input.value) || 0;
    const v1 = parseFloat(v1Input.value) || 0;
    const m2 = parseFloat(m2Input.value) || 0;
    const v2 = parseFloat(v2Input.value) || 0;

    let ans = 0;
    if (solveFor === 'M2') {
      if (v2 > 0) {
        ans = (m1 * v1) / v2;
        resEl.textContent = `M₂ = ${ans.toFixed(4)} M`;
        stepsEl.textContent = `(${m1} M × ${v1} mL) ÷ ${v2} mL = ${ans.toFixed(4)} M`;
      }
    } else if (solveFor === 'V2') {
      if (m2 > 0) {
        ans = (m1 * v1) / m2;
        resEl.textContent = `V₂ = ${ans.toFixed(2)} mL`;
        stepsEl.textContent = `(${m1} M × ${v1} mL) ÷ ${m2} M = ${ans.toFixed(2)} mL`;
      }
    } else if (solveFor === 'V1') {
      if (m1 > 0) {
        ans = (m2 * v2) / m1;
        resEl.textContent = `V₁ = ${ans.toFixed(2)} mL`;
        stepsEl.textContent = `(${m2} M × ${v2} mL) ÷ ${m1} M = ${ans.toFixed(2)} mL of stock solution needed`;
      }
    } else if (solveFor === 'M1') {
      if (v1 > 0) {
        ans = (m2 * v2) / v1;
        resEl.textContent = `M₁ = ${ans.toFixed(4)} M`;
        stepsEl.textContent = `(${m2} M × ${v2} mL) ÷ ${v1} mL = ${ans.toFixed(4)} M`;
      }
    }
  }

  // 4. Mole Fraction Calculator
  function calcMoleFraction() {
    const n1 = parseFloat(document.getElementById('mf_n1').value) || 0;
    const n2 = parseFloat(document.getElementById('mf_n2').value) || 0;
    const resEl = document.getElementById('mf_result');
    const stepsEl = document.getElementById('mf_steps');

    const total = n1 + n2;
    if (total <= 0) {
      resEl.textContent = 'X₁ = 0.000 | X₂ = 0.000';
      return;
    }

    const x1 = n1 / total;
    const x2 = n2 / total;

    resEl.textContent = `X₁ = ${x1.toFixed(3)}  |  X₂ = ${x2.toFixed(3)}`;
    stepsEl.textContent = `Total moles = ${total.toFixed(2)}. X₁ = ${n1}/${total.toFixed(2)} = ${x1.toFixed(3)}. X₂ = ${n2}/${total.toFixed(2)} = ${x2.toFixed(3)}. X₁ + X₂ = 1.000.`;
  }

  // 5. Percentage & PPM
  function calcPercent() {
    const solute = parseFloat(document.getElementById('pct_solute').value) || 0;
    const solution = parseFloat(document.getElementById('pct_solution').value) || 0;
    const unit = document.getElementById('pct_unit').value;
    const resEl = document.getElementById('pct_result');
    const stepsEl = document.getElementById('pct_steps');

    if (solution <= 0) return;

    if (unit === 'g') {
      const pct = (solute / solution) * 100;
      resEl.textContent = `${pct.toFixed(3)} % (m/m)`;
      stepsEl.textContent = `(${solute}g ÷ ${solution}g) × 100 = ${pct.toFixed(3)} % by mass`;
    } else if (unit === 'mL') {
      const pct = (solute / solution) * 100;
      resEl.textContent = `${pct.toFixed(3)} % (m/v)`;
      stepsEl.textContent = `(${solute}g ÷ ${solution}mL) × 100 = ${pct.toFixed(3)} % mass/volume`;
    } else if (unit === 'ppm_L') {
      // solute in g converted to mg => g * 1000
      const mg = solute * 1000;
      const ppm = mg / solution;
      resEl.textContent = `${ppm.toFixed(2)} ppm (mg/L)`;
      stepsEl.textContent = `${mg.toFixed(1)} mg ÷ ${solution} L = ${ppm.toFixed(2)} ppm`;
    }
  }

  // 6. Raoult's Law Calculator
  function calcRaoult() {
    const p0 = parseFloat(document.getElementById('raoult_p0').value) || 0;
    const xSolvent = parseFloat(document.getElementById('raoult_x').value) || 0;
    const resEl = document.getElementById('raoult_result');
    const stepsEl = document.getElementById('raoult_steps');

    const pSolution = p0 * xSolvent;
    const deltaP = p0 - pSolution;

    resEl.textContent = `P = ${pSolution.toFixed(3)} mmHg`;
    stepsEl.textContent = `Lowering of Vapor Pressure ΔP = ${deltaP.toFixed(3)} mmHg (P° - P = X_solute × P°). Vapour pressure is reduced.`;
  }

  // Bind Calc Event Listeners
  ['mol_solute', 'mol_solute_unit', 'mol_volume', 'mol_volume_unit'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcMolarity);
    document.getElementById(id)?.addEventListener('change', calcMolarity);
  });

  ['moly_solute', 'moly_solvent', 'moly_solvent_unit'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcMolality);
    document.getElementById(id)?.addEventListener('change', calcMolality);
  });

  ['dil_solve_for', 'dil_m1', 'dil_v1', 'dil_m2', 'dil_v2'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcDilution);
    document.getElementById(id)?.addEventListener('change', calcDilution);
  });

  ['mf_n1', 'mf_n2'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcMoleFraction);
  });

  ['pct_solute', 'pct_solution', 'pct_unit'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcPercent);
    document.getElementById(id)?.addEventListener('change', calcPercent);
  });

  ['raoult_p0', 'raoult_x'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calcRaoult);
  });

  // --- VIRTUAL LAB SIMULATIONS ---

  // Simulation Tabs
  const labTabBtns = document.querySelectorAll('.lab-tab-btn');
  const simPanes = document.querySelectorAll('.sim-pane');

  labTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      labTabBtns.forEach((b) => b.classList.remove('active'));
      simPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // SIM 1: TYNDALL EFFECT & PARTICLE SIZES
  (function initTyndallSim() {
    const canvas = document.getElementById('tyndallCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let currentType = 'solution'; // solution | colloid | suspension
    let laserOn = true;
    let statusText = document.getElementById('tyndallStatusText');

    let particles = [];
    const NUM_PARTICLES = 60;

    function resetParticles() {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        let size = currentType === 'solution' ? 2 : currentType === 'colloid' ? 5 : 9;
        particles.push({
          x: 100 + Math.random() * 300,
          y: 40 + Math.random() * 200,
          vx: (Math.random() - 0.5) * (currentType === 'solution' ? 2.5 : currentType === 'colloid' ? 1.2 : 0.4),
          vy: (Math.random() - 0.5) * (currentType === 'solution' ? 2.5 : currentType === 'colloid' ? 1.2 : 0.4),
          size: size,
          baseY: 40 + Math.random() * 200,
          settling: currentType === 'suspension',
        });
      }
    }
    resetParticles();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Beaker Glassware
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(90, 30, 320, 220);

      // Beaker fluid gradient
      const fluidGrad = ctx.createLinearGradient(90, 30, 90, 250);
      if (currentType === 'solution') {
        fluidGrad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
        fluidGrad.addColorStop(1, 'rgba(56, 189, 248, 0.25)');
      } else if (currentType === 'colloid') {
        fluidGrad.addColorStop(0, 'rgba(241, 245, 249, 0.15)');
        fluidGrad.addColorStop(1, 'rgba(241, 245, 249, 0.35)');
      } else {
        fluidGrad.addColorStop(0, 'rgba(180, 83, 9, 0.15)');
        fluidGrad.addColorStop(1, 'rgba(180, 83, 9, 0.4)');
      }
      ctx.fillStyle = fluidGrad;
      ctx.fillRect(90, 30, 320, 220);

      // Draw Laser Source
      ctx.fillStyle = '#64748b';
      ctx.fillRect(10, 120, 50, 40);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(60, 140, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw Laser Beam
      if (laserOn) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(60, 140);
        ctx.lineTo(90, 140);
        ctx.stroke();

        // Inside the beaker
        if (currentType === 'solution') {
          // Invisible inside pure solution
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(90, 140);
          ctx.lineTo(410, 140);
          ctx.stroke();
        } else if (currentType === 'colloid') {
          // Strong Tyndall scattering cone
          const coneGrad = ctx.createLinearGradient(90, 140, 410, 140);
          coneGrad.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
          coneGrad.addColorStop(1, 'rgba(239, 68, 68, 0.35)');

          ctx.fillStyle = coneGrad;
          ctx.beginPath();
          ctx.moveTo(90, 130);
          ctx.lineTo(410, 115);
          ctx.lineTo(410, 165);
          ctx.lineTo(90, 150);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(90, 140);
          ctx.lineTo(410, 140);
          ctx.stroke();
        } else if (currentType === 'suspension') {
          // Intense scattering / partial block
          ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
          ctx.beginPath();
          ctx.moveTo(90, 120);
          ctx.lineTo(410, 100);
          ctx.lineTo(410, 180);
          ctx.lineTo(90, 160);
          ctx.closePath();
          ctx.fill();
        }

        // Emerging beam
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(410, 140);
        ctx.lineTo(480, 140);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach((p) => {
        if (currentType === 'suspension' && p.settling) {
          if (p.y < 235) {
            p.y += 0.4;
          }
          p.x += p.vx * 0.2;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 100 || p.x > 390) p.vx *= -1;
          if (p.y < 45 || p.y > 235) p.vy *= -1;
        }

        ctx.fillStyle =
          currentType === 'solution'
            ? '#38bdf8'
            : currentType === 'colloid'
            ? '#f8fafc'
            : '#f59e0b';

        // If laser is on and particle is in beam path, make it glow brightly
        if (laserOn && p.y > 120 && p.y < 160 && currentType !== 'solution') {
          ctx.fillStyle = '#ffedd5';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ef4444';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    }
    draw();

    document.getElementById('btnSetSolution')?.addEventListener('click', (e) => {
      document.querySelectorAll('#sim-tyndall .btn-action').forEach((b) => b.classList.remove('btn-primary'));
      e.target.classList.add('btn-primary');
      currentType = 'solution';
      statusText.innerHTML = '<strong>True Solution:</strong> Particle size &lt; 1 nm. Homogeneous. Light passes straight through without scattering (No Tyndall effect).';
      resetParticles();
    });

    document.getElementById('btnSetColloid')?.addEventListener('click', (e) => {
      document.querySelectorAll('#sim-tyndall .btn-action').forEach((b) => b.classList.remove('btn-primary'));
      e.target.classList.add('btn-primary');
      currentType = 'colloid';
      statusText.innerHTML = '<strong>Colloid (Milk/Fog):</strong> Particle size 1–1000 nm. Colloidal micelle particles scatter light beam (Positive Tyndall effect). Do not settle.';
      resetParticles();
    });

    document.getElementById('btnSetSuspension')?.addEventListener('click', (e) => {
      document.querySelectorAll('#sim-tyndall .btn-action').forEach((b) => b.classList.remove('btn-primary'));
      e.target.classList.add('btn-primary');
      currentType = 'suspension';
      statusText.innerHTML = '<strong>Suspension (Muddy Water):</strong> Particle size &gt; 1000 nm. Heavy particles scatter/block light and slowly settle down under gravity.';
      resetParticles();
    });

    document.getElementById('btnToggleLaser')?.addEventListener('click', (e) => {
      laserOn = !laserOn;
      e.target.textContent = laserOn ? '🔴 Toggle Laser: ON' : '⚪ Toggle Laser: OFF';
    });

    document.getElementById('btnStirMixture')?.addEventListener('click', () => {
      resetParticles();
    });
  })();

  // SIM 2: SATURATION & SUPERSATURATION BEAKER
  (function initSaturationSim() {
    const canvas = document.getElementById('saturationCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const tempSlider = document.getElementById('tempSlider');
    const tempDisplay = document.getElementById('tempDisplay');
    const statusText = document.getElementById('saturationStatusText');

    let currentSoluteGrams = 10;
    let isCrystallized = false;

    function getSolubility(temp) {
      // Approximate solubility curve: 35g at 0°C up to 90g at 100°C
      return 35 + temp * 0.55;
    }

    function updateStatus() {
      const temp = parseInt(tempSlider.value, 10);
      tempDisplay.textContent = `${temp}°C`;
      const maxSolubility = getSolubility(temp);

      if (isCrystallized) {
        statusText.innerHTML = `<strong>Crystallized:</strong> Excess solute rapidly precipitated out of the unstable supersaturated state! Undissolved crystals pile up at bottom.`;
      } else if (currentSoluteGrams < maxSolubility) {
        statusText.innerHTML = `<strong>Unsaturated Solution:</strong> ${currentSoluteGrams}g solute present / ${maxSolubility.toFixed(1)}g max solubility at ${temp}°C. More solute can easily dissolve.`;
      } else if (Math.abs(currentSoluteGrams - maxSolubility) <= 5) {
        statusText.innerHTML = `<strong>Saturated Solution:</strong> ${currentSoluteGrams}g dissolved. Reached dynamic equilibrium (~${maxSolubility.toFixed(1)}g max).`;
      } else {
        statusText.innerHTML = `<strong>Supersaturated / Precipitate:</strong> Solute (${currentSoluteGrams}g) exceeds normal solubility (${maxSolubility.toFixed(1)}g). Heating will dissolve excess; seeding will trigger instant crystals!`;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const temp = parseInt(tempSlider.value, 10);
      const maxSol = getSolubility(temp);

      // Beaker
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(120, 40, 260, 200);

      // Fluid color shifts slightly warm with temperature
      const r = Math.min(255, 30 + temp * 1.5);
      const b = Math.max(120, 240 - temp * 1.2);
      ctx.fillStyle = `rgba(${r}, 180, ${b}, 0.25)`;
      ctx.fillRect(120, 70, 260, 170);

      // Liquid level meniscus
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(120, 70);
      ctx.lineTo(380, 70);
      ctx.stroke();

      // Dissolved particles in liquid
      const dissolvedCount = Math.min(currentSoluteGrams, maxSol) * 1.8;
      ctx.fillStyle = '#06b6d4';
      for (let i = 0; i < dissolvedCount; i++) {
        const seed = (i * 9301 + 49297) % 233280;
        const px = 130 + (seed % 240);
        const py = 80 + ((seed * 7) % 140);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Undissolved precipitate crystals at bottom
      const excess = Math.max(0, currentSoluteGrams - maxSol);
      if (excess > 0 || isCrystallized) {
        ctx.fillStyle = '#f59e0b';
        const undissolvedPiles = isCrystallized ? 80 : excess * 1.5;
        for (let i = 0; i < undissolvedPiles; i++) {
          const px = 140 + ((i * 37) % 220);
          const py = 230 - ((i * 13) % 15);
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Thermometer on left
      ctx.fillStyle = '#334155';
      ctx.fillRect(50, 40, 16, 180);
      const mercuryHeight = (temp / 100) * 160;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(52, 200 - mercuryHeight, 12, mercuryHeight + 10);
      ctx.beginPath();
      ctx.arc(58, 215, 14, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#f1f5f9';
      ctx.font = '12px system-ui';
      ctx.fillText(`${temp}°C`, 45, 30);

      requestAnimationFrame(draw);
    }
    draw();

    tempSlider.addEventListener('input', () => {
      isCrystallized = false;
      updateStatus();
    });

    document.getElementById('btnAddSolute')?.addEventListener('click', () => {
      currentSoluteGrams += 10;
      updateStatus();
    });

    document.getElementById('btnSeedCrystal')?.addEventListener('click', () => {
      const temp = parseInt(tempSlider.value, 10);
      const maxSol = getSolubility(temp);
      if (currentSoluteGrams > maxSol) {
        isCrystallized = true;
      }
      updateStatus();
    });

    document.getElementById('btnResetSaturation')?.addEventListener('click', () => {
      currentSoluteGrams = 10;
      tempSlider.value = 25;
      isCrystallized = false;
      updateStatus();
    });

    updateStatus();
  })();

  // SIM 3: U-TUBE OSMOSIS & REVERSE OSMOSIS
  (function initOsmosisSim() {
    const canvas = document.getElementById('osmosisCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let isOsmosisRunning = false;
    let isReverseRunning = false;
    let leftLevel = 140;  // Dilute side height
    let rightLevel = 140; // Concentrated side height
    const statusText = document.getElementById('osmosisStatusText');

    let waterMolecules = [];
    for (let i = 0; i < 40; i++) {
      waterMolecules.push({
        x: 100 + Math.random() * 120,
        y: 150 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate Osmosis Shift
      if (isOsmosisRunning) {
        if (rightLevel > 80) {
          rightLevel -= 0.25; // Water level rises in right arm
          leftLevel += 0.25;  // Water level drops in left arm
        }
      } else if (isReverseRunning) {
        if (rightLevel < 180) {
          rightLevel += 0.4;  // Piston pushes water down on right
          leftLevel -= 0.4;   // Pure water rises on left
        }
      }

      // Draw U-Tube Container
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Left arm outer
      ctx.moveTo(90, 40);
      ctx.lineTo(90, 240);
      ctx.lineTo(410, 240);
      ctx.lineTo(410, 40);
      // Right arm inner
      ctx.moveTo(350, 40);
      ctx.lineTo(350, 200);
      ctx.lineTo(150, 200);
      ctx.lineTo(150, 40);
      ctx.stroke();

      // Fluid in Left Arm (Dilute / Pure water)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(90, leftLevel, 60, 240 - leftLevel);

      // Fluid in Bottom Horizontal Channel
      ctx.fillRect(150, 200, 200, 40);

      // Fluid in Right Arm (Concentrated Solution)
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.fillRect(350, rightLevel, 60, 240 - rightLevel);

      // Semi-Permeable Membrane (Center Barrier at x = 250)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(250, 200);
      ctx.lineTo(250, 240);
      ctx.stroke();
      ctx.setLineDash([]);

      // Piston on right if Reverse Osmosis is active
      if (isReverseRunning) {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(352, rightLevel - 15, 56, 15);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(352, rightLevel - 15, 56, 15);

        // Arrow pushing down
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('⬇ Applied P > π', 320, rightLevel - 25);
      }

      // Solute particles in right arm
      ctx.fillStyle = '#10b981';
      for (let i = 0; i < 25; i++) {
        const px = 360 + ((i * 17) % 40);
        const py = rightLevel + 15 + ((i * 23) % (220 - rightLevel));
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Water molecules moving
      ctx.fillStyle = '#38bdf8';
      waterMolecules.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < 100 || m.x > 390) m.vx *= -1;
        if (m.y < 160 || m.y > 235) m.vy *= -1;

        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Labels
      ctx.fillStyle = '#f1f5f9';
      ctx.font = '12px system-ui';
      ctx.fillText('Dilute (Pure H₂O)', 80, 30);
      ctx.fillText('Concentrated Sol.', 340, 30);
      ctx.fillText('Membrane', 225, 190);

      requestAnimationFrame(draw);
    }
    draw();

    document.getElementById('btnStartOsmosis')?.addEventListener('click', () => {
      isOsmosisRunning = true;
      isReverseRunning = false;
      statusText.innerHTML = '<strong>Osmosis Active:</strong> Water flows spontaneously through the membrane from dilute to concentrated solution. Level rises in right column.';
    });

    document.getElementById('btnApplyReversePressure')?.addEventListener('click', () => {
      isOsmosisRunning = false;
      isReverseRunning = true;
      statusText.innerHTML = '<strong>Reverse Osmosis Active:</strong> Applied external pressure exceeds osmotic pressure (P_ext &gt; π), forcing pure water backward through the membrane.';
    });

    document.getElementById('btnResetOsmosis')?.addEventListener('click', () => {
      isOsmosisRunning = false;
      isReverseRunning = false;
      leftLevel = 140;
      rightLevel = 140;
      statusText.innerHTML = '<strong>U-Tube Reset:</strong> Equal levels on both sides before osmotic migration.';
    });
  })();

  // --- MDCAT PRACTICE QUIZ SUITE ---
  const QUIZ_QUESTIONS = [
    {
      q: "1. Which of the following concentration units is strictly independent of temperature?",
      options: [
        "A) Molarity (M)",
        "B) Molality (m)",
        "C) Mass/Volume Percentage (% w/v)",
        "D) Normality (N)"
      ],
      correct: 1,
      exp: "Molality is based on the mass of solvent (kg). Mass does not change with temperature, whereas volume expands upon heating (affecting Molarity and % w/v)."
    },
    {
      q: "2. In a salt-water solution, what is the solute and what is the solvent?",
      options: [
        "A) Salt is solvent, Water is solute",
        "B) Salt is solute, Water is solvent",
        "C) Both are solvents",
        "D) Both are solutes"
      ],
      correct: 1,
      exp: "The substance that is dissolved (present in smaller quantity) is the solute (Salt). The dissolving medium (water) is the solvent."
    },
    {
      q: "3. What happens to the solubility of a gas in a liquid when temperature is increased at constant pressure?",
      options: [
        "A) Increases exponentially",
        "B) Decreases",
        "C) Remains completely unchanged",
        "D) First increases, then drops to zero"
      ],
      correct: 1,
      exp: "Gas solubility in liquids decreases with increasing temperature because higher kinetic energy causes gas molecules to escape into the vapor phase."
    },
    {
      q: "4. A 0.1 M solution of which substance will exhibit the LARGEST elevation in boiling point?",
      options: [
        "A) Glucose (C₆H₁₂O₆)",
        "B) Sodium Chloride (NaCl)",
        "C) Calcium Chloride (CaCl₂)",
        "D) Aluminium Chloride (AlCl₃)"
      ],
      correct: 3,
      exp: "Colligative properties depend on the total number of dissolved particles. AlCl₃ dissociates into 4 ions (1 Al³⁺ + 3 Cl⁻), producing the greatest colligative elevation."
    },
    {
      q: "5. When a non-volatile solute is dissolved in a solvent, its vapour pressure:",
      options: [
        "A) Increases",
        "B) Decreases",
        "C) Stays constant",
        "D) Reaches infinity"
      ],
      correct: 1,
      exp: "Non-volatile solute particles occupy space at the liquid surface, reducing the escaping tendency of solvent molecules and lowering the vapour pressure."
    },
    {
      q: "6. Tyndall effect is characteristically shown by which of the following?",
      options: [
        "A) True Solution",
        "B) Colloid",
        "C) Pure distilled water",
        "D) Vacuum"
      ],
      correct: 1,
      exp: "Colloidal particles (1 to 1000 nm) are sufficiently large to scatter visible light beams, creating the visible Tyndall cone."
    },
    {
      q: "7. During the dilution of a solution by adding more solvent, which quantity remains constant?",
      options: [
        "A) Molarity",
        "B) Volume",
        "C) Total moles of solute",
        "D) Density"
      ],
      correct: 2,
      exp: "Adding solvent increases the total volume and decreases molarity, but the actual number of solute moles remains unchanged (M₁V₁ = M₂V₂)."
    },
    {
      q: "8. In osmosis, solvent molecules move through a semipermeable membrane from:",
      options: [
        "A) Concentrated to dilute solution",
        "B) Dilute to concentrated solution",
        "C) Saturated to supersaturated solution",
        "D) Solid phase to gas phase"
      ],
      correct: 1,
      exp: "Osmosis is the net movement of solvent molecules from higher solvent potential (dilute) to lower solvent potential (concentrated)."
    },
    {
      q: "9. Brass is an example of which type of solution?",
      options: [
        "A) Solid in Liquid",
        "B) Solid in Solid",
        "C) Liquid in Solid",
        "D) Gas in Solid"
      ],
      correct: 1,
      exp: "Brass is an alloy (solid solution) of Copper (Cu) and Zinc (Zn)."
    },
    {
      q: "10. Which statement about Henry's Law is TRUE?",
      options: [
        "A) Higher gas pressure increases gas solubility in liquid",
        "B) Higher gas pressure decreases gas solubility",
        "C) Temperature has no effect on Henry's constant",
        "D) Only applies to solid solutes"
      ],
      correct: 0,
      exp: "Henry's Law states that at constant temperature, gas solubility is directly proportional to the partial pressure of that gas above the liquid (P ↑ → Solubility ↑)."
    },
    {
      q: "11. 1 ppm is approximately equal to:",
      options: [
        "A) 1 gram per litre",
        "B) 1 milligram per litre",
        "C) 1 kilogram per litre",
        "D) 1 mole per litre"
      ],
      correct: 1,
      exp: "For dilute aqueous solutions, 1 ppm = 1 mg of solute per 1 L of water (1 mg / 10⁶ mg = 10⁻⁶)."
    },
    {
      q: "12. A suspension differs from a colloid primarily because suspension particles:",
      options: [
        "A) Are smaller than 1 nm",
        "B) Settle down when left undisturbed",
        "C) Form transparent homogeneous mixtures",
        "D) Cannot be filtered"
      ],
      correct: 1,
      exp: "Suspension particles are larger than 1000 nm and sediment under gravity upon standing, whereas colloids remain stably dispersed."
    }
  ];

  let currentQuizIdx = 0;
  let quizScore = 0;
  let answeredQuestions = new Array(QUIZ_QUESTIONS.length).fill(null);

  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizExplanationBox = document.getElementById('quizExplanationBox');
  const quizExplanationText = document.getElementById('quizExplanationText');
  const quizProgressBadge = document.getElementById('quizProgressBadge');
  const quizScoreBadge = document.getElementById('quizScoreBadge');
  const quizPrevBtn = document.getElementById('quizPrevBtn');
  const quizNextBtn = document.getElementById('quizNextBtn');

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuizIdx];
    quizProgressBadge.textContent = `Question ${currentQuizIdx + 1} of ${QUIZ_QUESTIONS.length}`;
    quizQuestionText.textContent = q.q;
    quizOptionsContainer.innerHTML = '';

    const prevAnswer = answeredQuestions[currentQuizIdx];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt;

      if (prevAnswer !== null) {
        btn.disabled = true;
        if (idx === q.correct) btn.classList.add('correct');
        if (prevAnswer === idx && idx !== q.correct) btn.classList.add('wrong');
      } else {
        btn.addEventListener('click', () => handleQuizAnswer(idx));
      }

      quizOptionsContainer.appendChild(btn);
    });

    if (prevAnswer !== null) {
      quizExplanationBox.classList.add('visible');
      quizExplanationText.textContent = q.exp;
      quizNextBtn.disabled = currentQuizIdx === QUIZ_QUESTIONS.length - 1;
    } else {
      quizExplanationBox.classList.remove('visible');
      quizNextBtn.disabled = true;
    }

    quizPrevBtn.disabled = currentQuizIdx === 0;
  }

  function handleQuizAnswer(selectedIdx) {
    const q = QUIZ_QUESTIONS[currentQuizIdx];
    answeredQuestions[currentQuizIdx] = selectedIdx;

    if (selectedIdx === q.correct) {
      quizScore++;
    }

    const totalAnswered = answeredQuestions.filter((a) => a !== null).length;
    const pct = Math.round((quizScore / totalAnswered) * 100);
    quizScoreBadge.textContent = `Score: ${quizScore} / ${totalAnswered} (${pct}%)`;

    renderQuizQuestion();
  }

  quizPrevBtn.addEventListener('click', () => {
    if (currentQuizIdx > 0) {
      currentQuizIdx--;
      renderQuizQuestion();
    }
  });

  quizNextBtn.addEventListener('click', () => {
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      currentQuizIdx++;
      renderQuizQuestion();
    }
  });

  // --- FLASHCARDS SUITE ---
  const flashcardModeBtn = document.getElementById('flashcardModeBtn');
  const flashcardsModal = document.getElementById('flashcardsModal');
  const closeFlashcardsBtn = document.getElementById('closeFlashcardsBtn');
  const flashcardScene = document.getElementById('flashcardScene');
  const flashcardInner = document.getElementById('flashcardInner');
  const flashcardCategory = document.getElementById('flashcardCategory');
  const flashcardQuestion = document.getElementById('flashcardQuestion');
  const flashcardAnswer = document.getElementById('flashcardAnswer');
  const flashcardCounter = document.getElementById('flashcardCounter');
  const fcPrevBtn = document.getElementById('fcPrevBtn');
  const fcNextBtn = document.getElementById('fcNextBtn');
  const fcFlipBtn = document.getElementById('fcFlipBtn');

  let currentCardIndex = 0;
  let isCardFlipped = false;

  const FLASHCARD_DATA = [
    { title: "1. Solution", category: "BASICS", answer: "A homogeneous mixture of two or more substances with uniform composition throughout (e.g. Salt in water)." },
    { title: "2. Solute", category: "BASICS", answer: "The substance that dissolves (usually present in lesser quantity)." },
    { title: "3. Solvent", category: "BASICS", answer: "The substance that dissolves the solute (component present in greater quantity)." },
    { title: "4. Types of Solutions", category: "BASICS", answer: "Solid in liquid (salt water), liquid in liquid (alcohol in water), gas in liquid (soda), gas in gas (air), solid in solid (brass)." },
    { title: "5. Solubility", category: "BASICS", answer: "The maximum amount of solute that dissolves in a given amount of solvent at a particular temperature." },
    { title: "6. Unsaturated Solution", category: "BASICS", answer: "Contains less than the maximum solute; more solute can still dissolve." },
    { title: "7. Saturated Solution", category: "BASICS", answer: "Contains maximum dissolved solute at that temp in equilibrium with undissolved solute." },
    { title: "8. Supersaturated Solution", category: "BASICS", answer: "Contains more dissolved solute than normal; metastable and crystalizes rapidly upon seeding." },
    { title: "9. Concentration", category: "CONCENTRATION", answer: "Amount of solute in a given amount of solution or solvent (Dilute vs Concentrated)." },
    { title: "10. Molarity (M)", category: "CONCENTRATION", answer: "Moles of solute per 1 LITRE of solution (mol/L). Temperature dependent!" },
    { title: "11. Molality (m)", category: "CONCENTRATION", answer: "Moles of solute per 1 KILOGRAM of solvent (mol/kg). Temperature independent!" },
    { title: "12. Molarity vs Molality", category: "MDCAT TRAP", answer: "Molarity uses volume of solution (changes with temp). Molality uses mass of solvent (independent of temp)." },
    { title: "13. Mole Fraction (X)", category: "CONCENTRATION", answer: "Moles of component ÷ Total moles. Dimensionless (no units). X₁ + X₂ = 1." },
    { title: "14. Percentage Concentration", category: "CONCENTRATION", answer: "Mass % (m/m), Volume % (v/v), Mass/Volume % (m/v)." },
    { title: "15. Parts Per Million (ppm)", category: "CONCENTRATION", answer: "1 ppm ≈ 1 mg solute / 1 L solution (used for trace pollutants)." },
    { title: "16. Dilution Formula", category: "DILUTION", answer: "M₁V₁ = M₂V₂. Moles of solute remain constant during dilution." },
    { title: "17. Solvation & Hydration", category: "ELECTROLYTES", answer: "Solvent molecules surrounding solute particles. Called hydration when solvent is water." },
    { title: "18. Electrolytes", category: "ELECTROLYTES", answer: "Form ions and conduct electricity (Strong: HCl, NaCl; Weak: CH₃COOH)." },
    { title: "19. Non-Electrolytes", category: "ELECTROLYTES", answer: "Do not produce ions in solution (e.g. Glucose, Sucrose, Urea; i = 1)." },
    { title: "20. Solubility of Gases", category: "GASES", answer: "Pressure ↑ → Gas solubility ↑. Temperature ↑ → Gas solubility ↓." },
    { title: "21. Henry's Law", category: "GASES", answer: "Gas solubility is directly proportional to partial pressure of gas above liquid (C = k·P)." },
    { title: "22. Vapour Pressure", category: "GASES", answer: "Equilibrium pressure of vapour above liquid. Stronger intermolecular forces = lower VP." },
    { title: "23. Non-Volatile Solute", category: "GASES", answer: "Adding a non-volatile solute lowers the vapour pressure of the solvent." },
    { title: "24. Raoult's Law", category: "GASES", answer: "P = X_solvent × P°_pure. Higher mole fraction of solvent = higher vapour pressure." },
    { title: "25. Colligative Properties", category: "COLLIGATIVE", answer: "Depend only on number of dissolved particles (VP lowering, BP elevation, FP depression, Osmotic pressure)." },
    { title: "26. Elevation of Boiling Point", category: "COLLIGATIVE", answer: "Solute lowers VP → solution boiling point is higher than pure solvent (ΔTb = i·Kb·m)." },
    { title: "27. Depression of Freezing Point", category: "COLLIGATIVE", answer: "Solute lowers freezing point of solvent (ΔTf = i·Kf·m; salt on icy roads)." },
    { title: "28. Osmosis", category: "OSMOSIS", answer: "Solvent moves across semipermeable membrane from dilute to concentrated solution." },
    { title: "29. Osmotic Pressure (π)", category: "OSMOSIS", answer: "Pressure required to stop osmosis (π = i·C·R·T). Higher particles = higher π." },
    { title: "30. Reverse Osmosis (RO)", category: "OSMOSIS", answer: "External P > π forces solvent backward across membrane (water desalination)." },
    { title: "31. Colloid", category: "COLLOIDS", answer: "Particle size 1–1000 nm, dispersed without settling (Milk, Fog, Gelatin)." },
    { title: "32. Tyndall Effect", category: "COLLOIDS", answer: "Scattering of light beam by colloidal particles (Colloid/Suspension = Yes, Solution = No)." },
    { title: "33. Suspension", category: "SUSPENSION", answer: "Particles > 1000 nm, settle on standing under gravity (Muddy water, chalk in water)." },
    { title: "34. Solution vs Colloid vs Suspension", category: "SUMMARY", answer: "Size: <1nm vs 1-1000nm vs >1000nm. Settling: No vs No vs Yes. Tyndall: No vs Yes vs Yes." }
  ];

  function renderFlashcard() {
    isCardFlipped = false;
    flashcardInner.classList.remove('flipped');

    const card = FLASHCARD_DATA[currentCardIndex];
    flashcardCounter.textContent = `Card ${currentCardIndex + 1} / ${FLASHCARD_DATA.length}`;
    flashcardCategory.textContent = card.category;
    flashcardQuestion.textContent = card.title;
    flashcardAnswer.textContent = card.answer;
  }

  flashcardModeBtn.addEventListener('click', () => {
    flashcardsModal.classList.add('open');
    renderFlashcard();
  });

  closeFlashcardsBtn.addEventListener('click', () => {
    flashcardsModal.classList.remove('open');
  });

  flashcardScene.addEventListener('click', () => {
    isCardFlipped = !isCardFlipped;
    flashcardInner.classList.toggle('flipped', isCardFlipped);
  });

  fcFlipBtn.addEventListener('click', () => {
    isCardFlipped = !isCardFlipped;
    flashcardInner.classList.toggle('flipped', isCardFlipped);
  });

  fcPrevBtn.addEventListener('click', () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      renderFlashcard();
    }
  });

  fcNextBtn.addEventListener('click', () => {
    if (currentCardIndex < FLASHCARD_DATA.length - 1) {
      currentCardIndex++;
      renderFlashcard();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!flashcardsModal.classList.contains('open')) return;
    if (e.code === 'Space') {
      e.preventDefault();
      isCardFlipped = !isCardFlipped;
      flashcardInner.classList.toggle('flipped', isCardFlipped);
    } else if (e.code === 'ArrowRight' && currentCardIndex < FLASHCARD_DATA.length - 1) {
      currentCardIndex++;
      renderFlashcard();
    } else if (e.code === 'ArrowLeft' && currentCardIndex > 0) {
      currentCardIndex--;
      renderFlashcard();
    } else if (e.code === 'Escape') {
      flashcardsModal.classList.remove('open');
    }
  });

  // --- INITIALIZE ALL ON LOAD ---
  initTheme();
  updateMasteryUI();
  calcMolarity();
  calcMolality();
  calcDilution();
  calcMoleFraction();
  calcPercent();
  calcRaoult();
  renderQuizQuestion();
  applyFilters();

})();
