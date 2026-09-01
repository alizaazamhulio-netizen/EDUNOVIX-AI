/**
 * BASIC CONCEPTS — MDCAT CHEMISTRY NOTES & INTERACTIVE LEARNING ENGINE
 * Script: basic concepts.js
 * Vanilla JavaScript implementation with zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. CONSTANTS & ATOMIC WEIGHTS DATABASE
  // ==========================================================================
  const AVOGADRO_CONSTANT = 6.02214076e23;
  const STP_MOLAR_VOLUME = 22.414; // dm^3 / mol

  const ATOMIC_WEIGHTS = {
    H: 1.008,
    He: 4.0026,
    Li: 6.94,
    Be: 9.0122,
    B: 10.81,
    C: 12.011,
    N: 14.007,
    O: 15.999,
    F: 18.998,
    Ne: 20.18,
    Na: 22.99,
    Mg: 24.305,
    Al: 26.982,
    Si: 28.085,
    P: 30.974,
    S: 32.06,
    Cl: 35.45,
    Ar: 39.948,
    K: 39.098,
    Ca: 40.078,
    Cr: 51.996,
    Mn: 54.938,
    Fe: 55.845,
    Co: 58.933,
    Ni: 58.693,
    Cu: 63.546,
    Zn: 65.38,
    Br: 79.904,
    Ag: 107.868,
    I: 126.904,
    Ba: 137.327,
    Pb: 207.2,
  };

  // Safe localStorage helper
  const Storage = {
    get(key, defaultVal) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultVal;
      } catch (e) {
        console.warn('LocalStorage error:', e);
        return defaultVal;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
  };

  // ==========================================================================
  // 2. HERO ANIMATED MOLECULE CANVAS
  // ==========================================================================
  const initHeroCanvas = () => {
    const canvas = document.getElementById('hero-molecule-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || 320;
      canvas.height = canvas.parentElement.clientHeight || 240;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Atom species definition
    const atomColors = {
      H: '#38bdf8', // sky blue
      O: '#f43f5e', // rose
      C: '#334155', // dark slate
      Na: '#10b981' // emerald
    };

    const atoms = [
      { x: 50, y: 70, vx: 0.6, vy: 0.4, r: 14, type: 'O', label: 'O' },
      { x: 90, y: 50, vx: 0.6, vy: 0.4, r: 9, type: 'H', label: 'H' },
      { x: 40, y: 110, vx: 0.6, vy: 0.4, r: 9, type: 'H', label: 'H' },

      { x: 180, y: 150, vx: -0.5, vy: 0.3, r: 15, type: 'C', label: 'C' },
      { x: 220, y: 140, vx: -0.5, vy: 0.3, r: 14, type: 'O', label: 'O' },
      { x: 140, y: 160, vx: -0.5, vy: 0.3, r: 14, type: 'O', label: 'O' },

      { x: 120, y: 180, vx: 0.4, vy: -0.5, r: 13, type: 'Na', label: 'Na+' },
      { x: 230, y: 60, vx: -0.3, vy: -0.4, r: 15, type: 'Cl', label: 'Cl-' },
    ];

    const bonds = [
      [0, 1], [0, 2], // H2O
      [3, 4], [3, 5], // CO2
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      atoms.forEach(atom => {
        atom.x += atom.vx;
        atom.y += atom.vy;

        if (atom.x - atom.r < 0 || atom.x + atom.r > canvas.width) atom.vx *= -1;
        if (atom.y - atom.r < 0 || atom.y + atom.r > canvas.height) atom.vy *= -1;
      });

      // Draw Bonds
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#cbd5e1';
      bonds.forEach(([i, j]) => {
        const a1 = atoms[i];
        const a2 = atoms[j];
        ctx.beginPath();
        ctx.moveTo(a1.x, a1.y);
        ctx.lineTo(a2.x, a2.y);
        ctx.stroke();
      });

      // Draw Atoms
      atoms.forEach(atom => {
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.r, 0, Math.PI * 2);
        ctx.fillStyle = atomColors[atom.type] || '#10b981';
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.label, atom.x, atom.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
  };
  initHeroCanvas();

  // ==========================================================================
  // 3. SCROLL PROGRESS & TOC ACTIVE HIGHLIGHTING & BACK TO TOP
  // ==========================================================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const progressText = document.getElementById('header-progress-text');
  const backToTopBtn = document.getElementById('btn-back-to-top');
  const tocItems = document.querySelectorAll('.toc-item');
  const noteSections = document.querySelectorAll('.note-section-card, .interactive-tool-card');

  const updateScrollStatus = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `Progress: ${Math.round(progress)}%`;

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active TOC link
    let currentId = '';
    noteSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentId = section.id;
      }
    });

    if (currentId) {
      tocItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateScrollStatus, { passive: true });
  updateScrollStatus();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 4. BOOKMARKS SYSTEM
  // ==========================================================================
  let bookmarkedSections = Storage.get('mdcat_chem_bookmarks', []);

  const updateBookmarkUI = () => {
    document.querySelectorAll('.btn-bookmark').forEach(btn => {
      const sectionId = btn.dataset.sectionId;
      if (bookmarkedSections.includes(sectionId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = `<span>★</span> Bookmarked`;
        btn.setAttribute('aria-label', `Remove bookmark for section ${sectionId}`);
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = `<span>🔖</span> Bookmark`;
        btn.setAttribute('aria-label', `Bookmark section ${sectionId}`);
      }
    });

    const bmCountBadge = document.getElementById('header-bookmarks-count');
    if (bmCountBadge) {
      bmCountBadge.textContent = `${bookmarkedSections.length} Saved`;
    }
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-bookmark');
    if (btn) {
      const sectionId = btn.dataset.sectionId;
      if (bookmarkedSections.includes(sectionId)) {
        bookmarkedSections = bookmarkedSections.filter(id => id !== sectionId);
      } else {
        bookmarkedSections.push(sectionId);
      }
      Storage.set('mdcat_chem_bookmarks', bookmarkedSections);
      updateBookmarkUI();
    }
  });

  updateBookmarkUI();

  // ==========================================================================
  // 5. CHAPTER COMPLETION
  // ==========================================================================
  const completionBtn = document.getElementById('btn-mark-completed');
  let isChapterCompleted = Storage.get('mdcat_chem_completed', false);

  const updateCompletionUI = () => {
    if (!completionBtn) return;
    if (isChapterCompleted) {
      completionBtn.classList.add('is-completed');
      completionBtn.innerHTML = `✓ Basic Concepts Completed!`;
    } else {
      completionBtn.classList.remove('is-completed');
      completionBtn.innerHTML = `Mark Chapter as Completed`;
    }
  };

  if (completionBtn) {
    completionBtn.addEventListener('click', () => {
      isChapterCompleted = !isChapterCompleted;
      Storage.set('mdcat_chem_completed', isChapterCompleted);
      updateCompletionUI();
      if (isChapterCompleted) {
        alert('🎉 Congratulations! You have marked MDCAT Chemistry: Basic Concepts as completed!');
      }
    });
  }
  updateCompletionUI();

  // ==========================================================================
  // 6. SEARCH FUNCTIONALITY
  // ==========================================================================
  const searchInput = document.getElementById('notes-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchFeedback = document.getElementById('search-feedback');
  const searchableCards = document.querySelectorAll('.note-section-card');

  const executeSearch = (term) => {
    const query = term.trim().toLowerCase();

    // Reset marks
    document.querySelectorAll('mark.search-highlight').forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });

    if (!query) {
      searchableCards.forEach(card => (card.style.display = 'block'));
      if (searchFeedback) searchFeedback.style.display = 'none';
      return;
    }

    let matchCount = 0;
    searchableCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'block';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (searchFeedback) {
      searchFeedback.style.display = 'block';
      searchFeedback.textContent = `Found ${matchCount} matching section${matchCount === 1 ? '' : 's'} for "${query}"`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', e => executeSearch(e.target.value));
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        executeSearch('');
        searchInput.focus();
      }
    });
  }

  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const term = tag.dataset.term;
      if (searchInput) {
        searchInput.value = term;
        executeSearch(term);
        const firstVisible = document.querySelector('.note-section-card[style*="display: block"]');
        if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================================================
  // 7. INTERACTIVE TOOL: MOLE CALCULATOR (3 TABS)
  // ==========================================================================
  // Tab Switching
  const moleTabs = document.querySelectorAll('#mole-calc-card .tab-btn');
  const molePanels = document.querySelectorAll('#mole-calc-card .tab-panel');

  moleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      moleTabs.forEach(t => t.classList.remove('active'));
      molePanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.dataset.target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Tab 1: Mass -> Moles
  const massInput = document.getElementById('calc-mass-val');
  const molarMassInput1 = document.getElementById('calc-molarmass-val1');
  const btnCalcTab1 = document.getElementById('btn-calc-tab1');
  const resultBoxTab1 = document.getElementById('calc-res-tab1');

  if (btnCalcTab1) {
    btnCalcTab1.addEventListener('click', () => {
      const mass = parseFloat(massInput.value);
      const mm = parseFloat(molarMassInput1.value);

      if (isNaN(mass) || mass <= 0 || isNaN(mm) || mm <= 0) {
        alert('Please enter valid positive numbers for both Mass (g) and Molar Mass (g/mol).');
        return;
      }

      const moles = mass / mm;
      const particles = moles * AVOGADRO_CONSTANT;

      resultBoxTab1.innerHTML = `
        <div class="result-header">
          <span class="result-title">Calculation Result</span>
          <span class="brand-badge">n = m / M</span>
        </div>
        <div class="result-value-hero">${moles.toFixed(4).replace(/\.?0+$/, '')} mol</div>
        <div class="result-breakdown">
          <div class="result-step">
            <span class="result-step-label">Formula:</span>
            <span class="result-step-val">Moles (n) = Mass (m) / Molar Mass (M)</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Substitution:</span>
            <span class="result-step-val">${mass} g ÷ ${mm} g·mol⁻¹</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Moles (n):</span>
            <span class="result-step-val">${moles.toFixed(5)} mol</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Total Particles (N = n × N_A):</span>
            <span class="result-step-val">${particles.toExponential(4)} particles</span>
          </div>
        </div>
      `;
    });
  }

  // Presets for Tab 1
  document.querySelectorAll('.preset-mm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mm = btn.dataset.mm;
      if (molarMassInput1) molarMassInput1.value = mm;
    });
  });

  // Tab 2: Moles -> Particles
  const molesInput2 = document.getElementById('calc-moles-val2');
  const particleTypeSelect = document.getElementById('calc-particle-type2');
  const btnCalcTab2 = document.getElementById('btn-calc-tab2');
  const resultBoxTab2 = document.getElementById('calc-res-tab2');

  if (btnCalcTab2) {
    btnCalcTab2.addEventListener('click', () => {
      const n = parseFloat(molesInput2.value);
      const pType = particleTypeSelect.value;

      if (isNaN(n) || n <= 0) {
        alert('Please enter a valid positive number of moles.');
        return;
      }

      const totalParticles = n * AVOGADRO_CONSTANT;

      resultBoxTab2.innerHTML = `
        <div class="result-header">
          <span class="result-title">Particle Count Result</span>
          <span class="brand-badge">N = n × N_A</span>
        </div>
        <div class="result-value-hero">${totalParticles.toExponential(4)} ${pType}</div>
        <div class="result-breakdown">
          <div class="result-step">
            <span class="result-step-label">Formula:</span>
            <span class="result-step-val">N = n × 6.022 × 10²³</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Substitution:</span>
            <span class="result-step-val">${n} mol × 6.02214 × 10²³ mol⁻¹</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Standard Decimal:</span>
            <span class="result-step-val">${(n * 6.02214).toFixed(3)} × 10²³ ${pType}</span>
          </div>
        </div>
      `;
    });
  }

  // Tab 3: Particles -> Moles & Mass
  const coeffInput = document.getElementById('calc-particle-coeff');
  const expInput = document.getElementById('calc-particle-exp');
  const molarMassInput3 = document.getElementById('calc-molarmass-val3');
  const btnCalcTab3 = document.getElementById('btn-calc-tab3');
  const resultBoxTab3 = document.getElementById('calc-res-tab3');

  if (btnCalcTab3) {
    btnCalcTab3.addEventListener('click', () => {
      const coeff = parseFloat(coeffInput.value);
      const exp = parseFloat(expInput.value);
      const mm = parseFloat(molarMassInput3.value) || 18.0;

      if (isNaN(coeff) || coeff <= 0 || isNaN(exp)) {
        alert('Please enter valid coefficient and exponent values for particle count.');
        return;
      }

      const totalParticles = coeff * Math.pow(10, exp);
      const moles = totalParticles / AVOGADRO_CONSTANT;
      const mass = moles * mm;

      resultBoxTab3.innerHTML = `
        <div class="result-header">
          <span class="result-title">Moles & Mass Result</span>
          <span class="brand-badge">n = N / N_A</span>
        </div>
        <div class="result-value-hero">${moles.toFixed(4).replace(/\.?0+$/, '')} mol</div>
        <div class="result-breakdown">
          <div class="result-step">
            <span class="result-step-label">Given Particles (N):</span>
            <span class="result-step-val">${totalParticles.toExponential(4)}</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Calculated Moles (n):</span>
            <span class="result-step-val">${moles.toFixed(5)} mol</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Mass (m = n × M) with M = ${mm} g/mol:</span>
            <span class="result-step-val">${mass.toFixed(3)} grams</span>
          </div>
        </div>
      `;
    });
  }

  // ==========================================================================
  // 8. INTERACTIVE TOOL: MOLE CONCEPT VISUALIZER & PARTICLE SWARM
  // ==========================================================================
  const moleSlider = document.getElementById('vis-mole-slider');
  const moleBadge = document.getElementById('vis-mole-badge');
  const visParticlesVal = document.getElementById('vis-particles-val');
  const visMassVal = document.getElementById('vis-mass-val');
  const visVolumeVal = document.getElementById('vis-volume-val');
  const visSubstanceSelect = document.getElementById('vis-substance-select');
  const moleCanvas = document.getElementById('mole-particle-canvas');

  let moleCanvasCtx = moleCanvas ? moleCanvas.getContext('2d') : null;
  let swarmParticles = [];

  const substanceMolarMasses = {
    H2O: { name: 'Water (H₂O)', mm: 18.015 },
    C: { name: 'Carbon (C)', mm: 12.011 },
    Fe: { name: 'Iron (Fe)', mm: 55.845 },
    NaCl: { name: 'Table Salt (NaCl)', mm: 58.44 },
    O2: { name: 'Oxygen Gas (O₂)', mm: 31.998 }
  };

  const initMoleSwarm = () => {
    if (!moleCanvas) return;
    moleCanvas.width = moleCanvas.parentElement.clientWidth || 600;
    moleCanvas.height = moleCanvas.parentElement.clientHeight || 180;

    swarmParticles = [];
    const count = 70; // Representative visual swarm
    for (let i = 0; i < count; i++) {
      swarmParticles.push({
        x: Math.random() * moleCanvas.width,
        y: Math.random() * moleCanvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.5 + 2,
        color: i % 2 === 0 ? '#38bdf8' : '#34d399'
      });
    }
  };

  const animateMoleSwarm = () => {
    if (!moleCanvasCtx || !moleCanvas) return;
    moleCanvasCtx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    moleCanvasCtx.fillRect(0, 0, moleCanvas.width, moleCanvas.height);

    const speedMultiplier = moleSlider ? parseFloat(moleSlider.value) : 1;

    swarmParticles.forEach(p => {
      p.x += p.vx * speedMultiplier;
      p.y += p.vy * speedMultiplier;

      if (p.x < 0 || p.x > moleCanvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > moleCanvas.height) p.vy *= -1;

      moleCanvasCtx.beginPath();
      moleCanvasCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      moleCanvasCtx.fillStyle = p.color;
      moleCanvasCtx.shadowColor = p.color;
      moleCanvasCtx.shadowBlur = 4;
      moleCanvasCtx.fill();
    });

    requestAnimationFrame(animateMoleSwarm);
  };

  const updateMoleVisualizer = () => {
    if (!moleSlider) return;
    const n = parseFloat(moleSlider.value);
    if (moleBadge) moleBadge.textContent = `${n.toFixed(1)} mol`;

    const totalParticles = n * AVOGADRO_CONSTANT;
    if (visParticlesVal) visParticlesVal.textContent = `${totalParticles.toExponential(3)}`;

    const subKey = visSubstanceSelect ? visSubstanceSelect.value : 'H2O';
    const mm = substanceMolarMasses[subKey]?.mm || 18.0;
    const totalMass = n * mm;
    if (visMassVal) visMassVal.textContent = `${totalMass.toFixed(2)} g`;

    const totalVol = n * STP_MOLAR_VOLUME;
    if (visVolumeVal) visVolumeVal.textContent = `${totalVol.toFixed(2)} dm³`;
  };

  if (moleSlider) {
    moleSlider.addEventListener('input', updateMoleVisualizer);
  }
  if (visSubstanceSelect) {
    visSubstanceSelect.addEventListener('change', updateMoleVisualizer);
  }

  initMoleSwarm();
  animateMoleSwarm();
  updateMoleVisualizer();

  // ==========================================================================
  // 9. INTERACTIVE TOOL: MATTER CLASSIFIER
  // ==========================================================================
  const matterSamples = [
    { formula: 'O₂', name: 'Oxygen Gas', hint: 'Made of one kind of atom bonded together (diatomic)', type: 'element', why: 'O₂ consists strictly of oxygen atoms chemically bonded in pairs. Because it contains only one element, it is an element.' },
    { formula: 'H₂O', name: 'Pure Water', hint: 'Hydrogen and oxygen combined in a fixed 2:1 ratio', type: 'compound', why: 'Water is formed by hydrogen and oxygen chemically joined in a fixed 2:1 atomic ratio with distinct chemical properties.' },
    { formula: 'NaCl', name: 'Sodium Chloride (Table Salt)', hint: 'Na⁺ and Cl⁻ ions in a fixed 1:1 ionic lattice', type: 'compound', why: 'Table salt is an ionic compound formed from two elements chemically bonded in a fixed ratio.' },
    { formula: 'Air', name: 'Atmospheric Air', hint: 'A uniform physical blend of N₂, O₂, Ar, CO₂, etc.', type: 'homogeneous', why: 'Air is a homogeneous mixture (solution of gases) that has uniform composition throughout without chemical bonds between gas species.' },
    { formula: 'Salt Water', name: 'Saline Solution', hint: 'NaCl completely dissolved in liquid H₂O', type: 'homogeneous', why: 'Dissolved salt forms a single uniform aqueous phase throughout the liquid without settling.' },
    { formula: 'Sand + Water', name: 'Sand in Water', hint: 'Two distinct visible phases that settle out', type: 'heterogeneous', why: 'Sand does not dissolve in water; it forms a suspension with clear boundary interfaces (non-uniform).' },
    { formula: 'Fe', name: 'Pure Metallic Iron', hint: 'Solid metal containing only iron atoms', type: 'element', why: 'Iron (Fe) cannot be chemically broken down into simpler substances because it contains only iron atoms.' },
    { formula: 'Brass', name: 'Copper-Zinc Alloy', hint: 'Solid solution of Cu and Zn', type: 'homogeneous', why: 'Brass is a solid solution (alloy) where metal atoms are uniformly dispersed without fixed stoichiometric proportions.' },
    { formula: 'Fog / Smoke', name: 'Aerosol / Colloid', hint: 'Liquid droplets or solid particles suspended in gas', type: 'heterogeneous', why: 'Colloids and suspensions feature microscopic particles dispersed in a medium, showing the Tyndall effect (heterogeneous).' },
    { formula: 'C₆H₁₂O₆', name: 'Pure Glucose', hint: 'Carbon, hydrogen, and oxygen chemically bonded in 1:2:1 ratio', type: 'compound', why: 'Glucose is a pure chemical compound with a constant fixed chemical composition and unique properties.' },
    { formula: 'Oil + Water', name: 'Immiscible Liquids', hint: 'Separate layers with distinct phase boundary', type: 'heterogeneous', why: 'Non-polar oil and polar water do not mix, creating separate phases with non-uniform distribution.' },
    { formula: 'Diamond (C)', name: 'Allotrope of Carbon', hint: 'Giant covalent network of pure carbon', type: 'element', why: 'Diamond is an allotropic form of pure elemental carbon.' },
    { formula: 'NaHCO₃', name: 'Baking Soda', hint: 'Sodium hydrogen carbonate', type: 'compound', why: 'Contains sodium, hydrogen, carbon, and oxygen chemically bonded in fixed proportions.' },
    { formula: 'CO', name: 'Carbon Monoxide', hint: 'Toxic gas with 1:1 C:O chemical combination', type: 'compound', why: 'A chemical compound formed from carbon and oxygen combined in a fixed 1:1 atomic ratio.' },
    { formula: 'Soil', name: 'Garden Soil', hint: 'Complex mix of minerals, organic humus, and air', type: 'heterogeneous', why: 'Soil contains visibly distinct particles of rock, clay, humus, and water (heterogeneous mixture).' },
    { formula: 'He', name: 'Helium Gas', hint: 'Monatomic noble gas', type: 'element', why: 'Helium exists as individual unbonded helium atoms, making it a pure monatomic element.' }
  ];

  let currentSampleIdx = 0;
  let classifierScore = { correct: 0, total: 0 };

  const formulaEl = document.getElementById('classifier-sample-formula');
  const nameEl = document.getElementById('classifier-sample-name');
  const hintEl = document.getElementById('classifier-sample-hint');
  const feedbackBox = document.getElementById('classifier-feedback');
  const nextSampleBtn = document.getElementById('btn-next-sample');
  const scoreTracker = document.getElementById('classifier-score-text');

  const renderSample = () => {
    const sample = matterSamples[currentSampleIdx];
    if (formulaEl) formulaEl.innerHTML = sample.formula;
    if (nameEl) nameEl.textContent = sample.name;
    if (hintEl) hintEl.textContent = `Hint: ${sample.hint}`;

    if (feedbackBox) {
      feedbackBox.className = 'classifier-feedback-box';
      feedbackBox.style.display = 'none';
    }

    document.querySelectorAll('.btn-classify-option').forEach(btn => {
      btn.disabled = false;
      btn.className = 'btn-classify-option';
    });

    if (nextSampleBtn) nextSampleBtn.style.display = 'none';
  };

  document.querySelectorAll('.btn-classify-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedType = btn.dataset.type;
      const sample = matterSamples[currentSampleIdx];
      const isCorrect = selectedType === sample.type;

      classifierScore.total++;
      if (isCorrect) classifierScore.correct++;

      document.querySelectorAll('.btn-classify-option').forEach(b => {
        b.disabled = true;
        if (b.dataset.type === sample.type) {
          b.classList.add('correct');
        } else if (b === btn && !isCorrect) {
          b.classList.add('incorrect');
        }
      });

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        if (isCorrect) {
          feedbackBox.className = 'classifier-feedback-box show-correct';
          feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${sample.why}`;
        } else {
          feedbackBox.className = 'classifier-feedback-box show-incorrect';
          feedbackBox.innerHTML = `<strong>✕ Incorrect.</strong> ${sample.name} is a <strong>${sample.type.replace('-', ' ')}</strong>. ${sample.why}`;
        }
      }

      if (scoreTracker) {
        const pct = Math.round((classifierScore.correct / classifierScore.total) * 100);
        scoreTracker.textContent = `Score: ${classifierScore.correct}/${classifierScore.total} (${pct}%)`;
      }

      if (nextSampleBtn) nextSampleBtn.style.display = 'inline-flex';
    });
  });

  if (nextSampleBtn) {
    nextSampleBtn.addEventListener('click', () => {
      currentSampleIdx = (currentSampleIdx + 1) % matterSamples.length;
      renderSample();
    });
  }

  renderSample();

  // ==========================================================================
  // 10. INTERACTIVE TOOL: EMPIRICAL FORMULA SOLVER
  // ==========================================================================
  const empiricalTableBody = document.getElementById('empirical-table-body');
  const btnAddRow = document.getElementById('btn-add-empirical-row');
  const btnSolveEmpirical = document.getElementById('btn-solve-empirical');
  const empiricalResultBox = document.getElementById('empirical-result-box');
  const molarMassInputMF = document.getElementById('empirical-molarmass-input');

  const addEmpiricalRow = (elem = 'C', val = '40.0', ar = '12.01') => {
    if (!empiricalTableBody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="emp-elem" value="${elem}" maxlength="3" style="width: 50px;"></td>
      <td><input type="number" class="emp-val" value="${val}" step="any" style="width: 90px;"></td>
      <td><input type="number" class="emp-ar" value="${ar}" step="any" style="width: 80px;"></td>
      <td><button type="button" class="btn-remove-row" title="Remove element">✕</button></td>
    `;
    empiricalTableBody.appendChild(tr);

    tr.querySelector('.btn-remove-row').addEventListener('click', () => {
      if (empiricalTableBody.children.length > 2) {
        tr.remove();
      } else {
        alert('An empirical formula requires at least two elements.');
      }
    });

    const elemInput = tr.querySelector('.emp-elem');
    const arInput = tr.querySelector('.emp-ar');
    elemInput.addEventListener('change', () => {
      const sym = elemInput.value.trim();
      if (ATOMIC_WEIGHTS[sym]) {
        arInput.value = ATOMIC_WEIGHTS[sym];
      }
    });
  };

  if (btnAddRow) {
    btnAddRow.addEventListener('click', () => addEmpiricalRow('O', '53.3', '16.00'));
  }

  // Pre-fill default Glucose values
  if (empiricalTableBody) {
    empiricalTableBody.innerHTML = '';
    addEmpiricalRow('C', '40.0', '12.01');
    addEmpiricalRow('H', '6.7', '1.008');
    addEmpiricalRow('O', '53.3', '16.00');
  }

  // Empirical Presets
  document.querySelectorAll('.preset-emp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      if (!empiricalTableBody) return;
      empiricalTableBody.innerHTML = '';
      if (preset === 'glucose') {
        addEmpiricalRow('C', '40.0', '12.011');
        addEmpiricalRow('H', '6.7', '1.008');
        addEmpiricalRow('O', '53.3', '15.999');
        if (molarMassInputMF) molarMassInputMF.value = '180.16';
      } else if (preset === 'ethanol') {
        addEmpiricalRow('C', '52.2', '12.011');
        addEmpiricalRow('H', '13.0', '1.008');
        addEmpiricalRow('O', '34.8', '15.999');
        if (molarMassInputMF) molarMassInputMF.value = '46.07';
      } else if (preset === 'iron_oxide') {
        addEmpiricalRow('Fe', '69.94', '55.845');
        addEmpiricalRow('O', '30.06', '15.999');
        if (molarMassInputMF) molarMassInputMF.value = '159.69';
      } else if (preset === 'acetic_acid') {
        addEmpiricalRow('C', '40.0', '12.011');
        addEmpiricalRow('H', '6.71', '1.008');
        addEmpiricalRow('O', '53.29', '15.999');
        if (molarMassInputMF) molarMassInputMF.value = '60.05';
      }
      if (btnSolveEmpirical) btnSolveEmpirical.click();
    });
  });

  if (btnSolveEmpirical) {
    btnSolveEmpirical.addEventListener('click', () => {
      const rows = empiricalTableBody.querySelectorAll('tr');
      const data = [];

      rows.forEach(tr => {
        const elem = tr.querySelector('.emp-elem').value.trim().toUpperCase();
        const val = parseFloat(tr.querySelector('.emp-val').value);
        const ar = parseFloat(tr.querySelector('.emp-ar').value);
        if (elem && !isNaN(val) && val > 0 && !isNaN(ar) && ar > 0) {
          data.push({ elem, mass: val, ar, moles: val / ar });
        }
      });

      if (data.length < 2) {
        alert('Please enter valid data for at least 2 elements.');
        return;
      }

      // Step 3: Divide by smallest moles
      const minMoles = Math.min(...data.map(d => d.moles));
      data.forEach(d => {
        d.ratio = d.moles / minMoles;
      });

      // Step 4: Convert ratios to simplest whole numbers
      // Test common multipliers: 1, 2, 3, 4, 5, 6
      let bestMultiplier = 1;
      for (let m = 1; m <= 6; m++) {
        const allClose = data.every(d => {
          const product = d.ratio * m;
          const diff = Math.abs(product - Math.round(product));
          return diff < 0.08;
        });
        if (allClose) {
          bestMultiplier = m;
          break;
        }
      }

      let empiricalMass = 0;
      let formulaHtml = '';
      data.forEach(d => {
        d.intRatio = Math.round(d.ratio * bestMultiplier);
        empiricalMass += d.intRatio * d.ar;
        formulaHtml += `${d.elem}${d.intRatio > 1 ? `<sub>${d.intRatio}</sub>` : ''}`;
      });

      // Molecular formula calculation if molar mass is provided
      const userMM = parseFloat(molarMassInputMF.value);
      let molecularHtml = '';
      if (!isNaN(userMM) && userMM > 0) {
        const nFactor = Math.round(userMM / empiricalMass);
        let mfStr = '';
        data.forEach(d => {
          const totalAtoms = d.intRatio * (nFactor || 1);
          mfStr += `${d.elem}${totalAtoms > 1 ? `<sub>${totalAtoms}</sub>` : ''}`;
        });
        molecularHtml = `
          <div class="result-step" style="border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem; margin-top: 0.5rem;">
            <span class="result-step-label">Molar Mass given:</span>
            <span class="result-step-val">${userMM.toFixed(2)} g/mol</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Multiplier (n = M / EF Mass):</span>
            <span class="result-step-val">${userMM.toFixed(2)} ÷ ${empiricalMass.toFixed(2)} ≈ <strong>${nFactor}</strong></span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Molecular Formula:</span>
            <span class="result-step-val" style="font-size: 1.2rem; color: var(--primary-teal);">${mfStr}</span>
          </div>
        `;
      }

      // Step rows table
      let stepRowsHtml = data.map(d => `
        <div class="result-step">
          <span class="result-step-label">${d.elem} (Ar = ${d.ar}):</span>
          <span class="result-step-val">${d.mass}g ÷ ${d.ar} = ${d.moles.toFixed(4)} mol ➔ Ratio: ${d.ratio.toFixed(2)} ➔ <strong>${d.intRatio}</strong></span>
        </div>
      `).join('');

      empiricalResultBox.innerHTML = `
        <div class="result-header">
          <span class="result-title">Empirical Formula Result</span>
          <span class="brand-badge">EF Mass = ${empiricalMass.toFixed(2)} g/mol</span>
        </div>
        <div class="result-value-hero">${formulaHtml}</div>
        <div class="result-breakdown">
          ${stepRowsHtml}
          ${molecularHtml}
        </div>
      `;
    });
  }

  // ==========================================================================
  // 11. INTERACTIVE TOOL: STOICHIOMETRY & LIMITING REACTANT VISUALIZER
  // ==========================================================================
  const reactionsDB = {
    water: {
      equation: '2H₂ + O₂ ➔ 2H₂O',
      rA: { name: 'Hydrogen (H₂)', mm: 2.016, coef: 2 },
      rB: { name: 'Oxygen (O₂)', mm: 31.998, coef: 1 },
      pC: { name: 'Water (H₂O)', mm: 18.015, coef: 2 }
    },
    ammonia: {
      equation: 'N₂ + 3H₂ ➔ 2NH₃',
      rA: { name: 'Nitrogen (N₂)', mm: 28.014, coef: 1 },
      rB: { name: 'Hydrogen (H₂)', mm: 2.016, coef: 3 },
      pC: { name: 'Ammonia (NH₃)', mm: 17.031, coef: 2 }
    },
    methane: {
      equation: 'CH₄ + 2O₂ ➔ CO₂ + 2H₂O',
      rA: { name: 'Methane (CH₄)', mm: 16.043, coef: 1 },
      rB: { name: 'Oxygen (O₂)', mm: 31.998, coef: 2 },
      pC: { name: 'Carbon Dioxide (CO₂)', mm: 44.009, coef: 1 }
    }
  };

  const reactionSelect = document.getElementById('stoich-reaction-select');
  const stoichAmountA = document.getElementById('stoich-amount-a');
  const stoichAmountB = document.getElementById('stoich-amount-b');
  const labelReactantA = document.getElementById('label-reactant-a');
  const labelReactantB = document.getElementById('label-reactant-b');
  const cardReactantA = document.getElementById('card-reactant-a');
  const cardReactantB = document.getElementById('card-reactant-b');
  const pillReactantA = document.getElementById('pill-reactant-a');
  const pillReactantB = document.getElementById('pill-reactant-b');
  const stoichEquationDisplay = document.getElementById('stoich-equation-display');
  const stoichOutputResult = document.getElementById('stoich-output-result');

  const updateStoichiometry = () => {
    const rxKey = reactionSelect ? reactionSelect.value : 'water';
    const rx = reactionsDB[rxKey] || reactionsDB.water;

    if (stoichEquationDisplay) stoichEquationDisplay.textContent = rx.equation;
    if (labelReactantA) labelReactantA.textContent = rx.rA.name;
    if (labelReactantB) labelReactantB.textContent = rx.rB.name;

    const molesA = parseFloat(stoichAmountA.value) || 0;
    const molesB = parseFloat(stoichAmountB.value) || 0;

    // Determine limiting reactant
    // Reaction proceeds by extent xi = moles / coefficient
    const extentA = molesA / rx.rA.coef;
    const extentB = molesB / rx.rB.coef;

    let limitingKey = 'A';
    let maxExtent = 0;
    let excessKey = 'B';
    let excessMolesLeft = 0;

    if (extentA <= extentB) {
      limitingKey = 'A';
      maxExtent = extentA;
      excessKey = 'B';
      const molesBUsed = maxExtent * rx.rB.coef;
      excessMolesLeft = Math.max(0, molesB - molesBUsed);
    } else {
      limitingKey = 'B';
      maxExtent = extentB;
      excessKey = 'A';
      const molesAUsed = maxExtent * rx.rA.coef;
      excessMolesLeft = Math.max(0, molesA - molesAUsed);
    }

    // Update UI Cards
    if (limitingKey === 'A') {
      cardReactantA.className = 'stoich-reactant-card is-limiting';
      pillReactantA.className = 'reactant-status-pill pill-limiting';
      pillReactantA.textContent = 'LIMITING REACTANT';

      cardReactantB.className = 'stoich-reactant-card is-excess';
      pillReactantB.className = 'reactant-status-pill pill-excess';
      pillReactantB.textContent = 'EXCESS REACTANT';
    } else {
      cardReactantB.className = 'stoich-reactant-card is-limiting';
      pillReactantB.className = 'reactant-status-pill pill-limiting';
      pillReactantB.textContent = 'LIMITING REACTANT';

      cardReactantA.className = 'stoich-reactant-card is-excess';
      pillReactantA.className = 'reactant-status-pill pill-excess';
      pillReactantA.textContent = 'EXCESS REACTANT';
    }

    const theoreticalMolesProduct = maxExtent * rx.pC.coef;
    const theoreticalGramsProduct = theoreticalMolesProduct * rx.pC.mm;

    const limitingName = limitingKey === 'A' ? rx.rA.name : rx.rB.name;
    const excessName = excessKey === 'A' ? rx.rA.name : rx.rB.name;

    if (stoichOutputResult) {
      stoichOutputResult.innerHTML = `
        <div class="result-header">
          <span class="result-title">Stoichiometric Analysis</span>
          <span class="brand-badge">Ratio ${rx.rA.coef} : ${rx.rB.coef} ➔ ${rx.pC.coef}</span>
        </div>
        <div class="result-value-hero">${theoreticalMolesProduct.toFixed(2)} mol ${rx.pC.name.split(' ')[0]}</div>
        <div class="result-breakdown">
          <div class="result-step">
            <span class="result-step-label">Limiting Reactant (Fully Consumed):</span>
            <span class="result-step-val" style="color: var(--rose-600);">${limitingName}</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Excess Reactant (Leftover):</span>
            <span class="result-step-val" style="color: var(--sky-600);">${excessName} (${excessMolesLeft.toFixed(2)} mol unreacted)</span>
          </div>
          <div class="result-step">
            <span class="result-step-label">Theoretical Product Mass Yield:</span>
            <span class="result-step-val" style="color: var(--primary-teal);">${theoreticalGramsProduct.toFixed(2)} grams</span>
          </div>
        </div>
      `;
    }
  };

  if (reactionSelect) reactionSelect.addEventListener('change', updateStoichiometry);
  if (stoichAmountA) stoichAmountA.addEventListener('input', updateStoichiometry);
  if (stoichAmountB) stoichAmountB.addEventListener('input', updateStoichiometry);
  updateStoichiometry();

  // ==========================================================================
  // 12. INTERACTIVE TOOL: PERCENTAGE COMPOSITION CALCULATOR
  // ==========================================================================
  const pctFormulaInput = document.getElementById('pct-formula-input');
  const btnCalcPct = document.getElementById('btn-calc-pct');
  const pctResultBox = document.getElementById('pct-result-box');

  const parseChemicalFormula = (formula) => {
    const counts = {};
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    let cleanFormula = formula.replace(/\s+/g, '');

    // Handle single level parentheses e.g. Ca(OH)2
    const parenRegex = /\(([^)]+)\)(\d+)/g;
    cleanFormula = cleanFormula.replace(parenRegex, (_, inner, mult) => {
      const multiplier = parseInt(mult, 10) || 1;
      let expanded = '';
      let subMatch;
      while ((subMatch = regex.exec(inner)) !== null) {
        const el = subMatch[1];
        const num = (parseInt(subMatch[2], 10) || 1) * multiplier;
        expanded += `${el}${num}`;
      }
      return expanded;
    });

    regex.lastIndex = 0;
    while ((match = regex.exec(cleanFormula)) !== null) {
      const el = match[1];
      const count = parseInt(match[2], 10) || 1;
      counts[el] = (counts[el] || 0) + count;
    }

    return counts;
  };

  if (btnCalcPct) {
    btnCalcPct.addEventListener('click', () => {
      const formula = pctFormulaInput.value.trim();
      if (!formula) {
        alert('Please enter a chemical formula (e.g. H2O, C6H12O6, NaCl, H2SO4).');
        return;
      }

      const counts = parseChemicalFormula(formula);
      const elements = Object.keys(counts);

      if (elements.length === 0) {
        alert('Unable to parse formula. Please check formatting (e.g. CaCO3).');
        return;
      }

      let totalMolarMass = 0;
      const breakdown = [];

      for (const el of elements) {
        const ar = ATOMIC_WEIGHTS[el] || 1.0;
        const count = counts[el];
        const mass = count * ar;
        totalMolarMass += mass;
        breakdown.push({ el, count, ar, mass });
      }

      const colors = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#f43f5e', '#64748b'];

      let barSegmentsHtml = '';
      let listRowsHtml = '';

      breakdown.forEach((item, idx) => {
        const pct = (item.mass / totalMolarMass) * 100;
        const color = colors[idx % colors.length];

        barSegmentsHtml += `
          <div style="width: ${pct}%; background-color: ${color}; height: 14px;" title="${item.el}: ${pct.toFixed(1)}%"></div>
        `;

        listRowsHtml += `
          <div class="result-step">
            <span class="result-step-label">
              <span style="display:inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${color}; margin-right: 6px;"></span>
              <strong>${item.el}</strong> (${item.count} × ${item.ar.toFixed(2)} g/mol):
            </span>
            <span class="result-step-val">${item.mass.toFixed(2)} g/mol (<strong>${pct.toFixed(2)}%</strong>)</span>
          </div>
        `;
      });

      pctResultBox.innerHTML = `
        <div class="result-header">
          <span class="result-title">Composition of ${formula}</span>
          <span class="brand-badge">Total Molar Mass = ${totalMolarMass.toFixed(2)} g/mol</span>
        </div>
        <div style="display: flex; border-radius: 8px; overflow: hidden; margin: 0.5rem 0; border: 1px solid var(--border-subtle);">
          ${barSegmentsHtml}
        </div>
        <div class="result-breakdown">
          ${listRowsHtml}
        </div>
      `;
    });
  }

  // Quick preset chips for percentage
  document.querySelectorAll('.preset-formula-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (pctFormulaInput) {
        pctFormulaInput.value = chip.dataset.formula;
        if (btnCalcPct) btnCalcPct.click();
      }
    });
  });

  // ==========================================================================
  // 13. HIGH-YIELD FLASHCARDS (20 FLIP CARDS)
  // ==========================================================================
  const flashcardsData = [
    {
      id: 'fc1',
      category: 'mole',
      tag: 'Mole Concept',
      front: "What is Avogadro's Constant (NA) and its numerical value?",
      back: 'The number of constituent particles (atoms, molecules, ions) in exactly 1 mole of any pure substance. NA = 6.022 × 10²³ mol⁻¹.'
    },
    {
      id: 'fc2',
      category: 'mole',
      tag: 'Definition',
      front: 'What is the definition of a Mole?',
      back: 'The amount of substance that contains 6.022 × 10²³ elementary entities (same as atoms in exactly 12g of pure Carbon-12).'
    },
    {
      id: 'fc3',
      category: 'formulas',
      tag: 'Formula',
      front: 'What is the master formula relating Mass, Moles, and Molar Mass?',
      back: 'n = m / M (where n = number of moles, m = mass in grams, M = molar mass in g·mol⁻¹).'
    },
    {
      id: 'fc4',
      category: 'formulas',
      tag: 'Formula',
      front: 'How do you find the total number of particles (N) from moles (n)?',
      back: 'N = n × NA (Number of particles = moles × 6.022 × 10²³).'
    },
    {
      id: 'fc5',
      category: 'mass',
      tag: 'Ionic Lattice',
      front: 'Why do we use "Formula Mass" instead of "Molecular Mass" for NaCl?',
      back: 'Ionic compounds form continuous 3D crystalline lattices of ions without discrete isolated molecules, so formula unit mass (NaCl = 58.5) is used.'
    },
    {
      id: 'fc6',
      category: 'laws',
      tag: 'Combination Law',
      front: 'State the Law of Conservation of Mass.',
      back: 'Mass is neither created nor destroyed during a chemical reaction. Total mass of reactants = Total mass of products.'
    },
    {
      id: 'fc7',
      category: 'laws',
      tag: 'Combination Law',
      front: 'State the Law of Definite Proportions (Proust).',
      back: 'A pure chemical compound always contains the exact same elements combined together in the same fixed proportion by mass (e.g. H:O in water is always 1:8 by mass).'
    },
    {
      id: 'fc8',
      category: 'laws',
      tag: 'Combination Law',
      front: 'State the Law of Multiple Proportions (Dalton).',
      back: 'When two elements form >1 compound, the masses of one element that combine with a fixed mass of the other are in simple whole-number ratios (e.g. CO and CO₂).'
    },
    {
      id: 'fc9',
      category: 'formulas',
      tag: 'Formula',
      front: 'What is an Empirical Formula?',
      back: 'The chemical formula showing the simplest whole-number ratio of atoms of each element present in a compound (e.g. CH₂O for glucose).'
    },
    {
      id: 'fc10',
      category: 'formulas',
      tag: 'Formula',
      front: 'What is the mathematical relationship between Molecular & Empirical Formula?',
      back: 'Molecular Formula = (Empirical Formula) × n, where n = (Molar Mass) / (Empirical Formula Mass).'
    },
    {
      id: 'fc11',
      category: 'stoich',
      tag: 'Stoichiometry',
      front: 'What is a Limiting Reactant?',
      back: 'The reactant that is completely consumed first in a chemical reaction, thereby limiting and determining the maximum theoretical yield of product.'
    },
    {
      id: 'fc12',
      category: 'stoich',
      tag: 'Stoichiometry',
      front: 'What is an Excess Reactant?',
      back: 'The reactant that remains unreacted/leftover after the limiting reactant is completely consumed.'
    },
    {
      id: 'fc13',
      category: 'stoich',
      tag: 'Yield',
      front: 'What is the difference between Theoretical Yield and Actual Yield?',
      back: 'Theoretical Yield is the maximum calculated stoichiometric product. Actual Yield is the real amount experimentally collected in the laboratory (Actual ≤ Theoretical).'
    },
    {
      id: 'fc14',
      category: 'formulas',
      tag: 'Yield Formula',
      front: 'What is the formula for Percentage Yield?',
      back: '% Yield = (Actual Yield / Theoretical Yield) × 100.'
    },
    {
      id: 'fc15',
      category: 'mole',
      tag: 'STP Gas Law',
      front: 'What is the molar volume of any ideal gas at STP?',
      back: '22.414 dm³ (or liters) per mole at standard temperature (0°C / 273.15 K) and standard pressure (1 atm).'
    },
    {
      id: 'fc16',
      category: 'matter',
      tag: 'Matter',
      front: 'What is the difference between a Homogeneous and Heterogeneous mixture?',
      back: 'Homogeneous mixture is uniform throughout with a single phase (e.g. saline, air). Heterogeneous has non-uniform composition with visible phase boundaries (e.g. sand+water).'
    },
    {
      id: 'fc17',
      category: 'matter',
      tag: 'Changes',
      front: 'How does a Physical Change differ from a Chemical Change?',
      back: 'Physical change alters state/form without forming new chemical bonds (e.g. melting ice). Chemical change breaks and forms bonds, creating new substances with new properties.'
    },
    {
      id: 'fc18',
      category: 'mass',
      tag: 'Standard Reference',
      front: 'What is the international reference standard for Relative Atomic Mass (Ar)?',
      back: '1/12th the mass of one atom of Carbon-12 (¹²C isotope), which equals 1 unified atomic mass unit (1 amu ≈ 1.66054 × 10⁻²⁴ g).'
    },
    {
      id: 'fc19',
      category: 'formulas',
      tag: 'Percentage',
      front: 'How is the percentage composition of an element calculated?',
      back: '% of Element = [(Mass of element in 1 mol compound) / (Molar mass of compound)] × 100.'
    },
    {
      id: 'fc20',
      category: 'stoich',
      tag: 'MDCAT Strategy',
      front: 'What is the Golden Rule of Stoichiometric Calculations?',
      back: 'ALWAYS balance the chemical equation first and convert all given masses/volumes into MOLES before applying stoichiometric ratios!'
    }
  ];

  const flashcardsGrid = document.getElementById('flashcards-grid');

  const renderFlashcards = (filter = 'all') => {
    if (!flashcardsGrid) return;
    flashcardsGrid.innerHTML = '';

    const filtered = filter === 'all'
      ? flashcardsData
      : flashcardsData.filter(fc => fc.category === filter);

    filtered.forEach(fc => {
      const card = document.createElement('div');
      card.className = 'flashcard-wrapper';
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <span class="card-top-tag">${fc.tag}</span>
            <div class="card-main-text">${fc.front}</div>
            <div class="card-footer-prompt"><span>🔄 Click to flip</span></div>
          </div>
          <div class="flashcard-back">
            <span class="card-top-tag">High-Yield Answer</span>
            <div class="card-main-text">${fc.back}</div>
            <div class="card-footer-prompt"><span>✓ Mastered Concept</span></div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });

      flashcardsGrid.appendChild(card);
    });
  };

  document.querySelectorAll('.btn-filter-fc').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter-fc').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFlashcards(btn.dataset.filter);
    });
  });

  renderFlashcards('all');

  // ==========================================================================
  // 14. MDCAT MINI QUIZ (15 ORIGINAL MCQS)
  // ==========================================================================
  const quizQuestions = [
    {
      id: 1,
      q: 'Which of the following is a homogeneous mixture?',
      options: ['Milk', 'Brass alloy', 'Sand in water', 'Smoke'],
      answer: 1,
      explanation: 'Brass is a solid solution (alloy of Cu and Zn) with a uniform composition throughout, making it a homogeneous mixture.'
    },
    {
      id: 2,
      q: 'One mole of any substance contains how many representative particles?',
      options: ['6.022 × 10²³', '3.011 × 10²³', '1.66 × 10⁻²⁴', '22.414 × 10²³'],
      answer: 0,
      explanation: 'The Avogadro constant NA = 6.022 × 10²³ mol⁻¹ represents the number of particles in one mole of substance.'
    },
    {
      id: 3,
      q: 'How many moles of water molecules are present in 36 grams of pure H₂O? (Molar mass of H₂O = 18 g/mol)',
      options: ['0.5 mol', '1.0 mol', '2.0 mol', '4.0 mol'],
      answer: 2,
      explanation: 'n = m / M = 36 g / 18 g·mol⁻¹ = 2.0 moles.'
    },
    {
      id: 4,
      q: 'The mass of 1 molecule of oxygen gas (O₂) is approximately:',
      options: ['32 grams', '5.31 × 10⁻²³ grams', '6.022 × 10²³ grams', '16 grams'],
      answer: 1,
      explanation: 'Mass of 1 mole O₂ = 32 g. Mass of 1 molecule = 32 / (6.022 × 10²³) ≈ 5.31 × 10⁻²³ g.'
    },
    {
      id: 5,
      q: 'Which term is used instead of "molecular mass" for ionic compounds like NaCl and CaCO₃?',
      options: ['Atomic mass', 'Formula mass', 'Molar volume', 'Equivalent weight'],
      answer: 1,
      explanation: 'Ionic compounds do not exist as discrete isolated molecules; they exist as crystalline lattices, hence Formula Mass is used.'
    },
    {
      id: 6,
      q: 'The percentage of oxygen by mass in pure water (H₂O) is approximately:',
      options: ['11.1%', '50.0%', '88.9%', '94.2%'],
      answer: 2,
      explanation: '%O = (16 / 18) × 100 = 88.89% ≈ 88.9%.'
    },
    {
      id: 7,
      q: 'The empirical formula of glucose (molecular formula C₆H₁₂O₆) is:',
      options: ['CHO', 'CH₂O', 'C₂H₄O₂', 'C₆H₁₂O₆'],
      answer: 1,
      explanation: 'Dividing all atomic subscripts (6, 12, 6) by the common factor 6 gives the simplest whole-number ratio: CH₂O.'
    },
    {
      id: 8,
      q: 'In the reaction: 2H₂ + O₂ ➔ 2H₂O, if 4 moles of H₂ react with 1 mole of O₂, which is the limiting reactant?',
      options: ['H₂', 'O₂', 'H₂O', 'Neither reactant'],
      answer: 1,
      explanation: 'According to stoichiometry, 1 mole of O₂ requires only 2 moles of H₂. Since 4 moles of H₂ are available, H₂ is in excess and O₂ is the limiting reactant.'
    },
    {
      id: 9,
      q: 'If the theoretical yield of a reaction is 50.0 g and the experimental actual yield obtained is 40.0 g, the percentage yield is:',
      options: ['75.0%', '80.0%', '85.0%', '125.0%'],
      answer: 1,
      explanation: '% Yield = (Actual / Theoretical) × 100 = (40.0 / 50.0) × 100 = 80.0%.'
    },
    {
      id: 10,
      q: 'The Law of Definite Proportions was stated by:',
      options: ['John Dalton', 'Joseph Proust', 'Antoine Lavoisier', 'Amedeo Avogadro'],
      answer: 1,
      explanation: 'Joseph Proust formulated the Law of Definite Proportions (Constant Composition) in 1799.'
    },
    {
      id: 11,
      q: 'The standard reference isotope chosen for relative atomic mass determination is:',
      options: ['¹H', '¹²C', '¹⁶O', '¹⁴N'],
      answer: 1,
      explanation: 'Carbon-12 (¹²C) with an assigned mass of exactly 12.000 amu is the standard reference.'
    },
    {
      id: 12,
      q: 'Which of the following represents a chemical change?',
      options: ['Melting of ice', 'Rusting of iron nail', 'Boiling of ethanol', 'Dissolution of table sugar in water'],
      answer: 1,
      explanation: 'Rusting of iron produces a chemically new substance (Fe₂O₃·xH₂O) via oxidation, representing a chemical change.'
    },
    {
      id: 13,
      q: 'What is the volume occupied by 0.5 moles of N₂ gas at STP?',
      options: ['11.207 dm³', '22.414 dm³', '44.828 dm³', '5.603 dm³'],
      answer: 0,
      explanation: 'Volume = n × 22.414 dm³ = 0.5 × 22.414 = 11.207 dm³.'
    },
    {
      id: 14,
      q: 'A compound has an empirical formula of CH₂ and a molar mass of 56 g/mol. Its molecular formula is: (C=12, H=1)',
      options: ['C₂H₄', 'C₃H₆', 'C₄H₈', 'C₅H₁₀'],
      answer: 2,
      explanation: 'Empirical formula mass = 12 + 2(1) = 14 g/mol. Multiplier n = 56 / 14 = 4. Molecular formula = (CH₂)₄ = C₄H₈.'
    },
    {
      id: 15,
      q: 'Why is the actual yield in laboratory experiments almost always less than the theoretical yield?',
      options: [
        'Chemical reactions are 100% efficient',
        'Side reactions, reversible equilibrium, and mechanical handling losses occur',
        'Avogadro constant changes with temperature',
        'Conservation of mass is violated'
      ],
      answer: 1,
      explanation: 'Incomplete reactions, reversible reactions reaching dynamic equilibrium, unwanted side products, and loss during filtration/transfer lower actual yield.'
    }
  ];

  let currentQuizIdx = 0;
  let userQuizAnswers = new Array(quizQuestions.length).fill(null);

  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizExplanationBox = document.getElementById('quiz-explanation-box');
  const quizProgressBadge = document.getElementById('quiz-progress-badge');
  const quizScoreBadge = document.getElementById('quiz-score-badge');
  const btnPrevQuestion = document.getElementById('btn-quiz-prev');
  const btnNextQuestion = document.getElementById('btn-quiz-next');
  const quizActiveArea = document.getElementById('quiz-active-area');
  const quizResultsArea = document.getElementById('quiz-results-area');

  const renderQuizQuestion = () => {
    if (!quizQuestionText) return;
    const q = quizQuestions[currentQuizIdx];
    quizQuestionText.textContent = `${q.id}. ${q.q}`;
    if (quizProgressBadge) quizProgressBadge.textContent = `Question ${currentQuizIdx + 1} of ${quizQuestions.length}`;

    // Options
    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="quiz-option-letter">${letters[optIdx]}</span>
          <span>${optText}</span>
        `;

        const recordedAnswer = userQuizAnswers[currentQuizIdx];

        if (recordedAnswer !== null) {
          btn.disabled = true;
          if (optIdx === q.answer) {
            btn.classList.add('correct');
          } else if (optIdx === recordedAnswer) {
            btn.classList.add('incorrect');
          }
        } else {
          btn.addEventListener('click', () => handleQuizOptionSelect(optIdx));
        }

        quizOptionsContainer.appendChild(btn);
      });
    }

    // Explanation
    if (quizExplanationBox) {
      if (userQuizAnswers[currentQuizIdx] !== null) {
        quizExplanationBox.className = 'quiz-explanation-box show';
        quizExplanationBox.innerHTML = `<strong>MDCAT Concept:</strong> ${q.explanation}`;
      } else {
        quizExplanationBox.className = 'quiz-explanation-box';
        quizExplanationBox.innerHTML = '';
      }
    }

    // Nav Buttons
    if (btnPrevQuestion) btnPrevQuestion.disabled = currentQuizIdx === 0;
    if (btnNextQuestion) {
      if (currentQuizIdx === quizQuestions.length - 1) {
        btnNextQuestion.textContent = 'View Results';
      } else {
        btnNextQuestion.textContent = 'Next Question →';
      }
    }

    // Score
    const answeredCount = userQuizAnswers.filter(a => a !== null).length;
    const correctCount = userQuizAnswers.filter((a, idx) => a === quizQuestions[idx].answer).length;
    if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${correctCount}/${answeredCount}`;
  };

  const handleQuizOptionSelect = (selectedOptIdx) => {
    userQuizAnswers[currentQuizIdx] = selectedOptIdx;
    renderQuizQuestion();
  };

  if (btnPrevQuestion) {
    btnPrevQuestion.addEventListener('click', () => {
      if (currentQuizIdx > 0) {
        currentQuizIdx--;
        renderQuizQuestion();
      }
    });
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      if (currentQuizIdx < quizQuestions.length - 1) {
        currentQuizIdx++;
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    });
  }

  const showQuizResults = () => {
    if (!quizActiveArea || !quizResultsArea) return;
    quizActiveArea.style.display = 'none';
    quizResultsArea.style.display = 'block';

    const total = quizQuestions.length;
    const correct = userQuizAnswers.filter((a, idx) => a === quizQuestions[idx].answer).length;
    const wrong = userQuizAnswers.filter((a, idx) => a !== null && a !== quizQuestions[idx].answer).length;
    const unanswered = userQuizAnswers.filter(a => a === null).length;
    const pct = Math.round((correct / total) * 100);

    let feedbackMsg = '';
    if (pct >= 85) {
      feedbackMsg = '🏆 Outstanding Performance! You have a rock-solid mastery of MDCAT Chemistry Basic Concepts!';
    } else if (pct >= 65) {
      feedbackMsg = '👍 Great job! You have strong conceptual foundation. Review the Limiting Reactant and Stoichiometry sections to achieve 100%.';
    } else {
      feedbackMsg = '📚 Keep practicing! Re-read the conversion triangles and flashcards to build high-yield intuition.';
    }

    quizResultsArea.innerHTML = `
      <div class="quiz-results-screen">
        <div class="results-trophy-icon">🏆</div>
        <div class="results-score-heading">${correct} / ${total} Correct</div>
        <div class="results-feedback-text">${feedbackMsg}</div>
        <div class="results-stats-row">
          <div class="result-chip">
            <span class="result-chip-val chip-val-correct">${correct}</span>
            <span class="stat-label">Correct</span>
          </div>
          <div class="result-chip">
            <span class="result-chip-val chip-val-wrong">${wrong}</span>
            <span class="stat-label">Wrong</span>
          </div>
          <div class="result-chip">
            <span class="result-chip-val chip-val-pct">${pct}%</span>
            <span class="stat-label">Accuracy</span>
          </div>
        </div>
        <button type="button" id="btn-retry-quiz" class="btn-calculate" style="max-width: 240px; margin-top: 1rem;">
          🔄 Retry Quiz
        </button>
      </div>
    `;

    document.getElementById('btn-retry-quiz')?.addEventListener('click', () => {
      userQuizAnswers = new Array(quizQuestions.length).fill(null);
      currentQuizIdx = 0;
      quizActiveArea.style.display = 'block';
      quizResultsArea.style.display = 'none';
      renderQuizQuestion();
    });
  };

  renderQuizQuestion();
});
