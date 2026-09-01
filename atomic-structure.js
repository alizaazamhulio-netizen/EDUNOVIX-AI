/**
 * ATOMIC STRUCTURE — MDCAT CHEMISTRY MASTER SCRIPT
 * Full interactive educational suite for medical entrance examination
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initSearch();
  initBookmarks();
  initChapterCompletion();
  initHeroAtomToggle();
  initParticleExplorer();
  initAtomIdentityCalculator();
  initIsotopeCalculator();
  initIonBuilder();
  initRutherfordSimulation();
  initBohrSimulator();
  initEMWaveCalculator();
  initBalmerSpectrum();
  initOrbitalCards();
  initElectronConfigBuilder();
  initHighYieldFlipCards();
  initFlashcards();
  initQuiz();
  initBackToTop();
  initSmoothScroll();
});

/* ==========================================================================
   1. Reading Progress Bar & Scroll Spy
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('readingProgressBar');
  const progressText = document.getElementById('progressPercentText');
  const navChips = document.querySelectorAll('.nav-chip');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', progress);
    }
    if (progressText) {
      progressText.textContent = `Progress: ${progress}%`;
    }

    // Scroll spy for quick nav
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollTop >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navChips.forEach(chip => {
      chip.classList.remove('active');
      if (chip.getAttribute('href') === `#${currentId}`) {
        chip.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Live Search Functionality
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const searchResultsOverlay = document.getElementById('searchResultsOverlay');
  const searchResultsList = document.getElementById('searchResultsList');
  const searchResultCount = document.getElementById('searchResultCount');
  const closeSearchResultsBtn = document.getElementById('closeSearchResultsBtn');

  const topics = [
    { title: 'Subatomic Particles (Protons, Neutrons, Electrons)', target: '#section-particles', keywords: 'proton neutron electron mass charge location nucleus discovery j.j thomson chadwick rutherford' },
    { title: 'Atomic Number (Z) & Mass Number (A)', target: '#section-z-and-a', keywords: 'atomic number z mass number a nucleons protons neutrons neutral atom calculator' },
    { title: 'Isotopes & Relative Atomic Mass', target: '#section-isotopes', keywords: 'isotopes carbon-12 carbon-14 fractional abundance weighted average relative atomic mass' },
    { title: 'Ions: Cations & Anions', target: '#section-ions', keywords: 'cation anion positive charge negative charge electron loss electron gain ionic radius isoelectronic' },
    { title: 'Evolution of Atomic Models Timeline', target: '#section-history-models', keywords: 'dalton solid sphere thomson plum pudding rutherford nuclear bohr stationary orbits quantum' },
    { title: 'Rutherford Gold Foil Alpha Scattering Simulation', target: '#section-rutherford', keywords: 'rutherford alpha particles scattering gold foil empty space nucleus deflection angle' },
    { title: 'Bohr Hydrogen Model & Quantized Energy Transitions', target: '#section-bohr', keywords: 'bohr energy levels quantization stationary orbits photon absorption emission lyman balmer paschen' },
    { title: 'Electromagnetic Radiation & Photon Energy Equations', target: '#section-em-radiation', keywords: 'c = lambda nu e = h nu wavelength frequency planck constant photon energy speed of light' },
    { title: 'Hydrogen Emission Line Spectrum & Balmer Series', target: '#section-spectrum', keywords: 'emission spectrum visible balmer lines red cyan blue violet quantized energy' },
    { title: 'Modern Quantum Model & Orbitals (s, p, d, f)', target: '#section-quantum', keywords: 'orbit vs orbital 2n2 quantum numbers azimuthal shape nodal planes probability' },
    { title: 'Rules of Electron Configuration (Aufbau, Pauli, Hund)', target: '#section-config', keywords: 'aufbau pauli exclusion hund rule n+l chromium copper exceptions spdf orbital boxes' },
    { title: 'MDCAT High-Yield Revision Comparison Tables', target: '#section-revision-tables', keywords: 'revision tables comparison proton vs neutron isotopes vs ions orbit vs orbital' },
    { title: '25+ MDCAT High-Yield Quick Fact Flip Cards', target: '#section-high-yield', keywords: 'high yield facts flip cards rapid revision quick facts mdcat' },
    { title: '12 Concept Mastery Flashcards Deck', target: '#section-flashcards', keywords: 'flashcards practice memory recall revision cards deck' },
    { title: 'MDCAT Mini Mock Quiz (15 MCQs)', target: '#section-quiz', keywords: 'quiz mcqs practice test exam questions score' }
  ];

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val.length > 0) {
      searchClearBtn.style.display = 'block';
      const matches = topics.filter(t => t.title.toLowerCase().includes(val) || t.keywords.includes(val));
      
      if (matches.length > 0) {
        searchSuggestions.innerHTML = matches.map(m => `
          <div class="search-suggestion-item" data-target="${m.target}">
            <span>${m.title}</span>
            <small style="color: var(--teal-600);">Jump →</small>
          </div>
        `).join('');
        searchSuggestions.style.display = 'block';
      } else {
        searchSuggestions.innerHTML = '<div class="search-suggestion-item"><span>No matching topics found</span></div>';
        searchSuggestions.style.display = 'block';
      }
    } else {
      searchClearBtn.style.display = 'none';
      searchSuggestions.style.display = 'none';
    }
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    searchSuggestions.style.display = 'none';
    searchInput.focus();
  });

  searchSuggestions.addEventListener('click', (e) => {
    const item = e.target.closest('.search-suggestion-item');
    if (item && item.dataset.target) {
      searchSuggestions.style.display = 'none';
      const targetElem = document.querySelector(item.dataset.target);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
        targetElem.style.borderColor = 'var(--teal-600)';
        setTimeout(() => { targetElem.style.borderColor = ''; }, 1800);
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      searchSuggestions.style.display = 'none';
    }
  });

  if (closeSearchResultsBtn && searchResultsOverlay) {
    closeSearchResultsBtn.addEventListener('click', () => {
      searchResultsOverlay.style.display = 'none';
    });
  }
}

/* ==========================================================================
   3. Bookmarks System (with LocalStorage)
   ========================================================================== */
function initBookmarks() {
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  const viewBookmarksBtn = document.getElementById('viewBookmarksBtn');
  const bookmarkCountBadge = document.getElementById('bookmarkCountBadge');
  const bookmarksModal = document.getElementById('bookmarksModal');
  const closeBookmarksModalBtn = document.getElementById('closeBookmarksModalBtn');
  const bookmarksListContainer = document.getElementById('bookmarksListContainer');

  const STORAGE_KEY = 'mdcat_chem_atomic_bookmarks';
  let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function updateBookmarkUI() {
    if (bookmarkCountBadge) {
      bookmarkCountBadge.textContent = bookmarks.length;
    }
    bookmarkButtons.forEach(btn => {
      const sectionId = btn.dataset.section;
      if (bookmarks.includes(sectionId)) {
        btn.classList.add('bookmarked');
        btn.querySelector('.bm-text').textContent = 'Bookmarked ✓';
      } else {
        btn.classList.remove('bookmarked');
        btn.querySelector('.bm-text').textContent = 'Bookmark';
      }
    });
  }

  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      if (bookmarks.includes(sectionId)) {
        bookmarks = bookmarks.filter(id => id !== sectionId);
      } else {
        bookmarks.push(sectionId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      updateBookmarkUI();
    });
  });

  if (viewBookmarksBtn && bookmarksModal) {
    viewBookmarksBtn.addEventListener('click', () => {
      if (bookmarks.length === 0) {
        bookmarksListContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px 0;">No bookmarked sections yet. Click "Bookmark" on any topic to save it for quick revision!</p>';
      } else {
        bookmarksListContainer.innerHTML = bookmarks.map(id => {
          const sec = document.getElementById(id);
          const title = sec ? (sec.querySelector('.section-title')?.textContent || id) : id;
          return `
            <div class="bookmark-item">
              <a href="#${id}" class="bookmark-link">${title}</a>
              <button class="btn btn-outline btn-xs remove-bm-btn" data-id="${id}">Remove</button>
            </div>
          `;
        }).join('');

        bookmarksListContainer.querySelectorAll('.bookmark-link').forEach(link => {
          link.addEventListener('click', () => {
            bookmarksModal.style.display = 'none';
          });
        });

        bookmarksListContainer.querySelectorAll('.remove-bm-btn').forEach(rBtn => {
          rBtn.addEventListener('click', (e) => {
            const rmId = e.target.dataset.id;
            bookmarks = bookmarks.filter(id => id !== rmId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
            updateBookmarkUI();
            viewBookmarksBtn.click();
          });
        });
      }
      bookmarksModal.style.display = 'flex';
    });

    closeBookmarksModalBtn.addEventListener('click', () => {
      bookmarksModal.style.display = 'none';
    });

    bookmarksModal.addEventListener('click', (e) => {
      if (e.target === bookmarksModal) bookmarksModal.style.display = 'none';
    });
  }

  updateBookmarkUI();
}

/* ==========================================================================
   4. Chapter Completion Handler
   ========================================================================== */
function initChapterCompletion() {
  const markCompleteBtn = document.getElementById('markCompleteBtn');
  const markChapterFinishedBtn = document.getElementById('markChapterFinishedBtn');
  const completionBtnText = document.getElementById('completionBtnText');
  const resetAllProgressBtn = document.getElementById('resetAllProgressBtn');
  const STORAGE_KEY = 'mdcat_chem_atomic_completed';

  let isCompleted = localStorage.getItem(STORAGE_KEY) === 'true';

  function updateCompletionUI() {
    if (isCompleted) {
      if (markCompleteBtn) {
        markCompleteBtn.classList.add('completed');
        completionBtnText.textContent = '✓ Chapter Completed';
      }
      if (markChapterFinishedBtn) {
        markChapterFinishedBtn.textContent = '✓ Atomic Structure Completed';
        markChapterFinishedBtn.style.background = 'var(--emerald-600)';
      }
    } else {
      if (markCompleteBtn) {
        markCompleteBtn.classList.remove('completed');
        completionBtnText.textContent = 'Mark Completed';
      }
      if (markChapterFinishedBtn) {
        markChapterFinishedBtn.textContent = '✓ Mark Atomic Structure as Completed';
        markChapterFinishedBtn.style.background = '';
      }
    }
  }

  function toggleCompletion() {
    isCompleted = !isCompleted;
    localStorage.setItem(STORAGE_KEY, isCompleted ? 'true' : 'false');
    updateCompletionUI();
    if (isCompleted) {
      showToast('🎉 Congratulations! Atomic Structure marked as completed!');
    }
  }

  if (markCompleteBtn) markCompleteBtn.addEventListener('click', toggleCompletion);
  if (markChapterFinishedBtn) markChapterFinishedBtn.addEventListener('click', toggleCompletion);

  if (resetAllProgressBtn) {
    resetAllProgressBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your local quiz scores, bookmarks, and completion status?')) {
        localStorage.removeItem('mdcat_chem_atomic_bookmarks');
        localStorage.removeItem('mdcat_chem_atomic_completed');
        localStorage.removeItem('mdcat_chem_atomic_flashcards_mastered');
        localStorage.removeItem('mdcat_chem_atomic_quiz_score');
        location.reload();
      }
    });
  }

  updateCompletionUI();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'completion-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--teal-900);
    color: #ffffff;
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-xl);
    font-size: 0.9rem;
    font-weight: 700;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

/* ==========================================================================
   5. Hero Atom Graphic Toggle
   ========================================================================== */
function initHeroAtomToggle() {
  const viewBohrModelBtn = document.getElementById('viewBohrModelBtn');
  const viewQuantumCloudBtn = document.getElementById('viewQuantumCloudBtn');
  const shellK = document.getElementById('shellK');
  const shellL = document.getElementById('shellL');
  const quantumCloudOverlay = document.getElementById('quantumCloudOverlay');

  if (!viewBohrModelBtn || !viewQuantumCloudBtn) return;

  viewBohrModelBtn.addEventListener('click', () => {
    viewBohrModelBtn.classList.add('active');
    viewQuantumCloudBtn.classList.remove('active');
    viewBohrModelBtn.setAttribute('aria-pressed', 'true');
    viewQuantumCloudBtn.setAttribute('aria-pressed', 'false');

    if (shellK) shellK.style.display = 'flex';
    if (shellL) shellL.style.display = 'flex';
    if (quantumCloudOverlay) quantumCloudOverlay.style.display = 'none';
  });

  viewQuantumCloudBtn.addEventListener('click', () => {
    viewQuantumCloudBtn.classList.add('active');
    viewBohrModelBtn.classList.remove('active');
    viewQuantumCloudBtn.setAttribute('aria-pressed', 'true');
    viewBohrModelBtn.setAttribute('aria-pressed', 'false');

    if (shellK) shellK.style.display = 'none';
    if (shellL) shellL.style.display = 'none';
    if (quantumCloudOverlay) quantumCloudOverlay.style.display = 'flex';
  });
}

/* ==========================================================================
   6. Subatomic Particle Explorer
   ========================================================================== */
function initParticleExplorer() {
  const tabs = document.querySelectorAll('.particle-tab-btn');
  const detailBox = document.getElementById('particleDetailBox');
  if (!detailBox) return;

  const data = {
    proton: {
      title: 'Proton (p⁺)',
      symbol: '¹₁p or p⁺',
      charge: '+1.602 × 10⁻¹⁹ Coulombs (Relative: +1)',
      mass: '1.007276 amu (1.6726 × 10⁻²⁷ kg)',
      location: 'Dense central nucleus (bound by strong nuclear force)',
      discovery: 'Discovered in canal / anode ray discharge experiments by Eugen Goldstein (1886); named and identified as fundamental nuclear unit by Ernest Rutherford (1919).',
      mdcatFact: 'The number of protons in the nucleus defines the atomic number (Z) and establishes the chemical identity and periodic table placement of an element. Protons never change during chemical reactions or ion formation.'
    },
    neutron: {
      title: 'Neutron (n⁰)',
      symbol: '¹₀n or n⁰',
      charge: '0 Coulombs (Electrically neutral)',
      mass: '1.008665 amu (1.6749 × 10⁻²⁷ kg) — Slightly heavier than proton!',
      location: 'Dense central nucleus (acts as nuclear cement reducing p⁺-p⁺ repulsion)',
      discovery: 'Discovered by James Chadwick (1932) by bombarding Beryllium-9 with energetic alpha particles (⁹₄Be + ⁴₂He → ¹²₆C + ¹₀n).',
      mdcatFact: 'Variation in the number of neutrons among atoms of the same element produces ISOTOPES. A free neutron outside a nucleus is unstable and decays via beta decay (t₁/₂ ≈ 10.2 mins) into a proton, electron, and antineutrino.'
    },
    electron: {
      title: 'Electron (e⁻)',
      symbol: '⁰₋₁e or e⁻',
      charge: '-1.602 × 10⁻¹⁹ Coulombs (Relative: -1)',
      mass: '0.0005485 amu (9.109 × 10⁻³¹ kg) ≈ 1/1836th of a proton',
      location: 'Extra-nuclear quantized orbitals / 3D probability clouds (ψ² ≥ 90%)',
      discovery: 'Discovered by J. J. Thomson (1897) using cathode ray discharge tubes, measuring the charge-to-mass ratio (e/m = 1.7588 × 10¹¹ C/kg). Exact charge measured by R. A. Millikan (1909 oil drop experiment).',
      mdcatFact: 'Valence electrons determine all chemical bonding, reactivity, ionization energy, and chemical properties. Because electron mass is negligible, chemical reactions conserve total mass.'
    }
  };

  function render(pKey) {
    const p = data[pKey];
    detailBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--teal-900);">${p.title}</h4>
        <span class="code-badge">${p.symbol}</span>
      </div>
      <div class="table-responsive-wrapper" style="margin: 0 0 14px 0;">
        <table class="mdcat-table">
          <tr><td style="width: 140px;"><strong>Charge:</strong></td><td>${p.charge}</td></tr>
          <tr><td><strong>Mass:</strong></td><td>${p.mass}</td></tr>
          <tr><td><strong>Location:</strong></td><td>${p.location}</td></tr>
          <tr><td><strong>Discovery:</strong></td><td>${p.discovery}</td></tr>
        </table>
      </div>
      <div class="high-yield-callout" style="margin: 0;">
        <span class="star-badge">⭐ MDCAT EXAM ESSENTIAL</span>
        <p style="font-size: 0.88rem;">${p.mdcatFact}</p>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.particle);
    });
  });

  render('proton');
}

/* ==========================================================================
   7. Atomic Number & Mass Number Calculator
   ========================================================================== */
function initAtomIdentityCalculator() {
  const inputZ = document.getElementById('inputZ');
  const inputA = document.getElementById('inputA');
  const resultsPanel = document.getElementById('atomCalcResults');
  const presetChips = document.querySelectorAll('#atomIdentityCalculator .preset-chip');

  const elementsData = {
    1: { name: 'Hydrogen', symbol: 'H', group: 'Non-metal', standardA: 1 },
    2: { name: 'Helium', symbol: 'He', group: 'Noble Gas', standardA: 4 },
    3: { name: 'Lithium', symbol: 'Li', group: 'Alkali Metal', standardA: 7 },
    6: { name: 'Carbon', symbol: 'C', group: 'Non-metal', standardA: 12 },
    7: { name: 'Nitrogen', symbol: 'N', group: 'Pnictogen', standardA: 14 },
    8: { name: 'Oxygen', symbol: 'O', group: 'Chalcogen', standardA: 16 },
    9: { name: 'Fluorine', symbol: 'F', group: 'Halogen', standardA: 19 },
    10: { name: 'Neon', symbol: 'Ne', group: 'Noble Gas', standardA: 20 },
    11: { name: 'Sodium', symbol: 'Na', group: 'Alkali Metal', standardA: 23 },
    12: { name: 'Magnesium', symbol: 'Mg', group: 'Alkaline Earth', standardA: 24 },
    13: { name: 'Aluminium', symbol: 'Al', group: 'Post-transition', standardA: 27 },
    17: { name: 'Chlorine', symbol: 'Cl', group: 'Halogen', standardA: 35 },
    18: { name: 'Argon', symbol: 'Ar', group: 'Noble Gas', standardA: 40 },
    19: { name: 'Potassium', symbol: 'K', group: 'Alkali Metal', standardA: 39 },
    20: { name: 'Calcium', symbol: 'Ca', group: 'Alkaline Earth', standardA: 40 },
    24: { name: 'Chromium', symbol: 'Cr', group: 'Transition Metal', standardA: 52 },
    26: { name: 'Iron', symbol: 'Fe', group: 'Transition Metal', standardA: 56 },
    29: { name: 'Copper', symbol: 'Cu', group: 'Transition Metal', standardA: 63 },
    35: { name: 'Bromine', symbol: 'Br', group: 'Halogen', standardA: 80 },
    92: { name: 'Uranium', symbol: 'U', group: 'Actinide', standardA: 238 }
  };

  function calculate() {
    let Z = parseInt(inputZ.value, 10);
    let A = parseInt(inputA.value, 10);

    if (isNaN(Z) || Z < 1) Z = 1;
    if (isNaN(A) || A < Z) A = Z;

    const protons = Z;
    const neutrons = A - Z;
    const electrons = Z; // Neutral atom

    const elem = elementsData[Z] || { name: `Element Z=${Z}`, symbol: `E`, group: 'Element', standardA: A };

    const isCommonIsotope = elem.standardA === A;

    resultsPanel.innerHTML = `
      <div class="atom-result-grid">
        <div class="symbol-big-box">
          <span class="sym-mass">${A}</span>
          <span class="sym-element">${elem.symbol}</span>
          <span class="sym-atomic">${Z}</span>
        </div>

        <div class="particle-counts-list">
          <div class="p-row"><span>Protons ($Z$):</span> <strong>${protons}</strong></div>
          <div class="p-row"><span>Neutrons ($n = A - Z$):</span> <strong>${neutrons}</strong></div>
          <div class="p-row"><span>Electrons (Neutral):</span> <strong>${electrons}</strong></div>
        </div>

        <div>
          <h4 style="font-size: 1rem; font-weight: 800; color: var(--teal-900); margin-bottom: 4px;">${elem.name}</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px;">
            Classification: <strong>${elem.group}</strong><br>
            Notation: <strong>$^{${A}}_{${Z}}\\text{${elem.symbol}}$</strong>
          </p>
          <span class="badge ${isCommonIsotope ? 'badge-teal' : 'badge-purple'}">
            ${isCommonIsotope ? 'Most Abundant Isotope' : 'Isotopic Nuclide Form'}
          </span>
        </div>
      </div>
    `;
  }

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      inputZ.value = chip.dataset.z;
      inputA.value = chip.dataset.a;
      calculate();
    });
  });

  inputZ.addEventListener('input', calculate);
  inputA.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   8. Isotope Weighted Average Calculator
   ========================================================================== */
function initIsotopeCalculator() {
  const container = document.getElementById('isotopeSlotsContainer');
  const addBtn = document.getElementById('addIsotopeSlotBtn');
  const calcBtn = document.getElementById('calculateIsotopeMassBtn');
  const resultBox = document.getElementById('isotopeCalculationResult');

  let slots = [
    { mass: 34.969, abundance: 75.77, label: 'Isotope 1 (e.g. Cl-35)' },
    { mass: 36.966, abundance: 24.23, label: 'Isotope 2 (e.g. Cl-37)' }
  ];

  function renderSlots() {
    container.innerHTML = slots.map((s, idx) => `
      <div class="isotope-slot-row" data-index="${idx}">
        <div class="input-group">
          <label>Isotope ${idx + 1} Mass (amu):</label>
          <input type="number" step="0.001" class="md-input slot-mass" value="${s.mass}">
        </div>
        <div class="input-group">
          <label>Abundance (%):</label>
          <input type="number" step="0.01" class="md-input slot-abundance" value="${s.abundance}">
        </div>
        ${slots.length > 2 ? `<button class="remove-slot-btn" data-idx="${idx}" title="Remove slot">✕</button>` : '<div></div>'}
      </div>
    `).join('');

    container.querySelectorAll('.remove-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.idx, 10);
        slots.splice(i, 1);
        renderSlots();
      });
    });
  }

  addBtn.addEventListener('click', () => {
    if (slots.length < 4) {
      slots.push({ mass: 25.982, abundance: 11.01, label: `Isotope ${slots.length + 1}` });
      renderSlots();
    }
  });

  calcBtn.addEventListener('click', () => {
    const massInputs = container.querySelectorAll('.slot-mass');
    const abunInputs = container.querySelectorAll('.slot-abundance');

    let totalAbundance = 0;
    let weightedSum = 0;
    let steps = [];

    for (let i = 0; i < massInputs.length; i++) {
      const m = parseFloat(massInputs[i].value);
      const a = parseFloat(abunInputs[i].value);

      if (isNaN(m) || isNaN(a) || m <= 0 || a < 0) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = '<p style="color: var(--rose-600); font-weight: 700;">⚠️ Please enter valid positive numerical values for all isotopic masses and abundances.</p>';
        return;
      }

      totalAbundance += a;
      const contribution = m * (a / 100);
      weightedSum += contribution;
      steps.push(`(${m.toFixed(3)} × ${a.toFixed(2)}%) = ${contribution.toFixed(4)}`);
    }

    const avgMass = weightedSum * (100 / totalAbundance);

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--teal-900);">Calculated Average Relative Atomic Mass:</h4>
        <span class="stat-num" style="font-size: 1.6rem; color: var(--teal-700);">${avgMass.toFixed(3)} amu</span>
      </div>
      <div class="step-math-line"><strong>Step 1:</strong> Formula = $\\sum (\\text{Mass}_i \\times \\text{Abundance}_i) / 100$</div>
      <div class="step-math-line"><strong>Step 2:</strong> Contributions: ${steps.join(' + ')}</div>
      <div class="step-math-line"><strong>Step 3:</strong> Total Abundance Sum = ${totalAbundance.toFixed(2)}% ${Math.abs(totalAbundance - 100) > 0.5 ? '<span style="color: var(--amber-600);">(Normalized to 100%)</span>' : ''}</div>
      <div class="high-yield-callout" style="margin-top: 12px; margin-bottom: 0;">
        ⭐ <strong>MDCAT Takeaway:</strong> Relative atomic mass on the periodic table reflects this exact weighted isotopic proportion.
      </div>
    `;
  });

  // Preset element loaders
  document.getElementById('loadIsoChlorine')?.addEventListener('click', () => {
    slots = [
      { mass: 34.969, abundance: 75.77 },
      { mass: 36.966, abundance: 24.23 }
    ];
    renderSlots();
    calcBtn.click();
  });

  document.getElementById('loadIsoCarbon')?.addEventListener('click', () => {
    slots = [
      { mass: 12.000, abundance: 98.93 },
      { mass: 13.003, abundance: 1.07 }
    ];
    renderSlots();
    calcBtn.click();
  });

  document.getElementById('loadIsoBoron')?.addEventListener('click', () => {
    slots = [
      { mass: 10.013, abundance: 19.90 },
      { mass: 11.009, abundance: 80.10 }
    ];
    renderSlots();
    calcBtn.click();
  });

  document.getElementById('loadIsoMagnesium')?.addEventListener('click', () => {
    slots = [
      { mass: 23.985, abundance: 78.99 },
      { mass: 24.986, abundance: 10.00 },
      { mass: 25.982, abundance: 11.01 }
    ];
    renderSlots();
    calcBtn.click();
  });

  renderSlots();
}

/* ==========================================================================
   9. Ion Builder & Charge Visualizer
   ========================================================================== */
function initIonBuilder() {
  const pInput = document.getElementById('ionProtonInput');
  const eInput = document.getElementById('ionElectronInput');
  const decP = document.getElementById('decProtons');
  const incP = document.getElementById('incProtons');
  const decE = document.getElementById('decElectrons');
  const incE = document.getElementById('incElectrons');
  const board = document.getElementById('ionDisplayBoard');
  const presetChips = document.querySelectorAll('#ionBuilderCard .preset-chip');

  const elementNames = {
    1: 'Hydrogen', 2: 'Helium', 3: 'Lithium', 4: 'Beryllium', 5: 'Boron',
    6: 'Carbon', 7: 'Nitrogen', 8: 'Oxygen', 9: 'Fluorine', 10: 'Neon',
    11: 'Sodium', 12: 'Magnesium', 13: 'Aluminium', 14: 'Silicon', 15: 'Phosphorus',
    16: 'Sulfur', 17: 'Chlorine', 18: 'Argon', 19: 'Potassium', 20: 'Calcium'
  };

  const elementSymbols = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B',
    6: 'C', 7: 'N', 8: 'O', 9: 'F', 10: 'Ne',
    11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
    16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca'
  };

  function update() {
    let p = parseInt(pInput.value, 10);
    let e = parseInt(eInput.value, 10);

    if (isNaN(p) || p < 1) p = 1;
    if (isNaN(e) || e < 0) e = 0;

    const netCharge = p - e;
    const sym = elementSymbols[p] || 'X';
    const name = elementNames[p] || `Element Z=${p}`;

    let chargeStr = '0 (Neutral Atom)';
    let ionSymbol = sym;
    let ionType = 'Neutral Atom';
    let ionBadge = 'badge-teal';
    let radiusNote = 'Reference atomic radius of the neutral parent element.';

    if (netCharge > 0) {
      const val = netCharge === 1 ? '+' : `${netCharge}+`;
      chargeStr = `+${netCharge} (Cation)`;
      ionSymbol = `${sym}<sup>${val}</sup>`;
      ionType = netCharge === 1 ? 'Monovalent Cation' : netCharge === 2 ? 'Divalent Cation' : 'Trivalent Cation';
      ionBadge = 'badge-blue';
      radiusNote = `Ionic radius is smaller than neutral ${name} (${sym}) due to loss of electron(s) and higher Z_eff.`;
    } else if (netCharge < 0) {
      const val = Math.abs(netCharge) === 1 ? '−' : `${Math.abs(netCharge)}−`;
      chargeStr = `${netCharge} (Anion)`;
      ionSymbol = `${sym}<sup>${val}</sup>`;
      ionType = Math.abs(netCharge) === 1 ? 'Monovalent Anion' : Math.abs(netCharge) === 2 ? 'Divalent Anion' : 'Trivalent Anion';
      ionBadge = 'badge-purple';
      radiusNote = `Ionic radius is larger than neutral ${name} (${sym}) due to increased electron-electron repulsion.`;
    }

    // Isoelectronic noble gas counterpart
    let isoelectronic = 'None';
    if (e === 2) isoelectronic = 'Helium (He: 1s²)';
    else if (e === 10) isoelectronic = 'Neon (Ne: 1s² 2s² 2p⁶)';
    else if (e === 18) isoelectronic = 'Argon (Ar: [Ne] 3s² 3p⁶)';

    board.innerHTML = `
      <div style="display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: center;">
        <div style="text-align: center; background: #ffffff; border: 2px solid var(--teal-600); border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 2.2rem; font-weight: 800; color: var(--teal-900); line-height: 1;">${ionSymbol}</div>
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--teal-700); margin-top: 6px; display: block;">${name}</span>
        </div>

        <div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <span class="badge ${ionBadge}">${ionType}</span>
            <span class="badge badge-teal">Net Charge: ${netCharge > 0 ? `+${netCharge}` : netCharge}</span>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <strong>Protons ($Z$):</strong> ${p} · <strong>Electrons ($e^-$):</strong> ${e}<br>
            <strong>Isoelectronic with:</strong> ${isoelectronic}<br>
            <em>${radiusNote}</em>
          </div>
        </div>
      </div>
    `;
  }

  decP.addEventListener('click', () => { if (parseInt(pInput.value, 10) > 1) { pInput.value = parseInt(pInput.value, 10) - 1; update(); } });
  incP.addEventListener('click', () => { if (parseInt(pInput.value, 10) < 20) { pInput.value = parseInt(pInput.value, 10) + 1; update(); } });
  decE.addEventListener('click', () => { if (parseInt(eInput.value, 10) > 0) { eInput.value = parseInt(eInput.value, 10) - 1; update(); } });
  incE.addEventListener('click', () => { if (parseInt(eInput.value, 10) < 22) { eInput.value = parseInt(eInput.value, 10) + 1; update(); } });

  pInput.addEventListener('input', update);
  eInput.addEventListener('input', update);

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      pInput.value = chip.dataset.ionP;
      eInput.value = chip.dataset.ionE;
      update();
    });
  });

  update();
}

/* ==========================================================================
   10. Rutherford Gold Foil Canvas Simulation
   ========================================================================== */
function initRutherfordSimulation() {
  const canvas = document.getElementById('rutherfordCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const fireStreamBtn = document.getElementById('fireAlphaStreamBtn');
  const singleBtn = document.getElementById('singleAlphaBtn');
  const resetBtn = document.getElementById('resetRutherfordBtn');
  const speedSlider = document.getElementById('alphaSpeedSlider');

  const countTotalEl = document.getElementById('countTotal');
  const countStraightEl = document.getElementById('countStraight');
  const countDeflectedEl = document.getElementById('countDeflected');
  const countReboundEl = document.getElementById('countRebound');
  const statusText = document.getElementById('simStatusText');

  let particles = [];
  let isStreaming = false;
  let animId = null;

  let totalCount = 0;
  let straightCount = 0;
  let deflectedCount = 0;
  let reboundCount = 0;

  // Heavy gold nuclei coordinates in foil
  const nuclei = [
    { x: 380, y: 80, r: 8, charge: 79 },
    { x: 380, y: 170, r: 8, charge: 79 },
    { x: 380, y: 260, r: 8, charge: 79 }
  ];

  class AlphaParticle {
    constructor() {
      this.x = 40;
      this.y = 60 + Math.random() * 220;
      this.vx = 2.5 + parseInt(speedSlider.value, 10);
      this.vy = 0;
      this.r = 3.5;
      this.color = '#38bdf8';
      this.history = [];
      this.status = 'active';
    }

    update() {
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 12) this.history.shift();

      // Coulombic repulsion from each gold nucleus
      for (const n of nuclei) {
        const dx = this.x - n.x;
        const dy = this.y - n.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 75) {
          // Repulsive force proportional to 1 / dist^2
          const force = Math.min(18, 120 / (distSq + 20));
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Check boundaries
      if (this.status === 'active') {
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
          this.status = 'finished';
          totalCount++;

          // Classify trajectory
          const angleDeg = Math.abs(Math.atan2(this.vy, this.vx) * (180 / Math.PI));
          if (this.vx < 0) {
            reboundCount++;
          } else if (angleDeg > 15) {
            deflectedCount++;
          } else {
            straightCount++;
          }
          updateCounts();
        }
      }
    }

    draw() {
      // Trail
      ctx.beginPath();
      for (let i = 0; i < this.history.length; i++) {
        const p = this.history[i];
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function updateCounts() {
    countTotalEl.textContent = totalCount;
    countStraightEl.textContent = `${straightCount} (${totalCount > 0 ? ((straightCount / totalCount) * 100).toFixed(1) : 0}%)`;
    countDeflectedEl.textContent = `${deflectedCount} (${totalCount > 0 ? ((deflectedCount / totalCount) * 100).toFixed(1) : 0}%)`;
    countReboundEl.textContent = `${reboundCount} (${totalCount > 0 ? ((reboundCount / totalCount) * 100).toFixed(1) : 0}%)`;
  }

  function drawEnvironment() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Alpha Source emitter
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(10, 130, 30, 80);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText('α Source', 4, 122);

    // Thin Gold Foil lattice column
    ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
    ctx.fillRect(360, 20, 40, 300);
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
    ctx.strokeRect(360, 20, 40, 300);
    ctx.fillStyle = '#eab308';
    ctx.fillText('Gold Foil (Au Z=79)', 330, 16);

    // Gold Nuclei (+79 charge)
    for (const n of nuclei) {
      // Electron cloud ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, 42, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.2)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dense Nucleus
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
      ctx.fillText('+79', n.x - 8, n.y + 3);
    }

    // ZnS Fluorescent Screen Arc
    ctx.beginPath();
    ctx.arc(380, 170, 310, -Math.PI * 0.45, Math.PI * 0.45);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#10b981';
    ctx.fillText('ZnS Fluorescent Detection Screen', 500, 40);
  }

  function loop() {
    drawEnvironment();

    if (isStreaming && Math.random() < 0.35) {
      particles.push(new AlphaParticle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.status === 'finished' && p.history.length === 0) {
        particles.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(loop);
  }

  fireStreamBtn.addEventListener('click', () => {
    isStreaming = !isStreaming;
    if (isStreaming) {
      fireStreamBtn.textContent = '⏸ Pause Beam';
      fireStreamBtn.classList.add('btn-accent');
      statusText.textContent = 'Firing Continuous Alpha Stream...';
    } else {
      fireStreamBtn.textContent = '▶ Fire Alpha Beam';
      fireStreamBtn.classList.remove('btn-accent');
      statusText.textContent = 'Beam Paused';
    }
  });

  singleBtn.addEventListener('click', () => {
    particles.push(new AlphaParticle());
  });

  resetBtn.addEventListener('click', () => {
    particles = [];
    totalCount = 0;
    straightCount = 0;
    deflectedCount = 0;
    reboundCount = 0;
    updateCounts();
    statusText.textContent = 'Simulation Reset';
  });

  loop();
}

/* ==========================================================================
   11. Bohr Hydrogen Model & Transition Simulator
   ========================================================================== */
function initBohrSimulator() {
  const initialSelect = document.getElementById('initialNSelect');
  const finalSelect = document.getElementById('finalNSelect');
  const readoutCard = document.getElementById('bohrReadoutCard');
  const bohrElectron = document.getElementById('bohrElectron');
  const presetButtons = document.querySelectorAll('#bohrSimulatorCard .preset-chip');

  const radiusMap = {
    1: 38,
    2: 70,
    3: 105,
    4: 140,
    5: 175,
    6: 190
  };

  const energyMap = {
    1: -13.60,
    2: -3.40,
    3: -1.51,
    4: -0.85,
    5: -0.54,
    6: -0.38
  };

  function update() {
    const ni = parseInt(initialSelect.value, 10);
    const nf = parseInt(finalSelect.value, 10);

    const Ei = energyMap[ni];
    const Ef = energyMap[nf];
    const deltaE = Ef - Ei; // in eV
    const absDeltaE = Math.abs(deltaE);

    // Wavelength in nm = hc / |deltaE| = 1240 / |deltaE|
    const wavelength = absDeltaE > 0 ? (1240 / absDeltaE).toFixed(1) : 0;
    const frequency = absDeltaE > 0 ? ((absDeltaE * 1.602e-19) / 6.626e-34).toExponential(2) : '0';

    let transType = 'Stationary State (No transition)';
    let badgeClass = 'badge-teal';
    let seriesName = 'None';
    let region = 'N/A';
    let colorPreview = '#64748b';

    if (ni > nf) {
      transType = `Photon Emission (Jump: n=${ni} → n=${nf})`;
      badgeClass = 'badge-purple';
    } else if (ni < nf) {
      transType = `Photon Absorption (Jump: n=${ni} → n=${nf})`;
      badgeClass = 'badge-blue';
    }

    // Determine Spectral Series based on lower level
    const lowerN = Math.min(ni, nf);
    if (lowerN === 1) { seriesName = 'Lyman Series'; region = 'Ultraviolet (UV)'; colorPreview = '#8b5cf6'; }
    else if (lowerN === 2) { seriesName = 'Balmer Series'; region = 'Visible Light'; colorPreview = '#06b6d4'; }
    else if (lowerN === 3) { seriesName = 'Paschen Series'; region = 'Infrared (Near IR)'; colorPreview = '#ef4444'; }
    else if (lowerN === 4) { seriesName = 'Brackett Series'; region = 'Infrared (Mid IR)'; colorPreview = '#b91c1c'; }
    else if (lowerN === 5) { seriesName = 'Pfund Series'; region = 'Far Infrared'; colorPreview = '#7f1d1d'; }

    // Animate SVG electron jump
    if (bohrElectron) {
      const targetR = radiusMap[nf] || 70;
      bohrElectron.setAttribute('cy', 200 - targetR);
      bohrElectron.style.fill = colorPreview;
    }

    readoutCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span class="badge ${badgeClass}">${transType}</span>
        <span style="font-weight: 700; color: var(--teal-800); font-size: 0.85rem;">${seriesName} · ${region}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px;">
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Energy Change (ΔE):</span>
          <strong style="display: block; font-size: 1rem; color: var(--teal-900);">${absDeltaE.toFixed(2)} eV</strong>
        </div>
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Wavelength (λ):</span>
          <strong style="display: block; font-size: 1rem; color: var(--teal-900);">${wavelength} nm</strong>
        </div>
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Frequency (ν):</span>
          <strong style="display: block; font-size: 0.95rem; color: var(--teal-900);">${frequency} Hz</strong>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
        ${ni > nf ? `⚡ <strong>Emission Mechanism:</strong> Electron drops from higher energy level ($E_{${ni}} = ${Ei}\\text{ eV}$) to lower level ($E_{${nf}} = ${Ef}\\text{ eV}$), emitting a single quantized photon of wavelength ${wavelength}\\text{ nm}.` : `💡 <strong>Absorption Mechanism:</strong> Electron absorbs exactly ${absDeltaE.toFixed(2)}\\text{ eV} of energy to jump from ground/lower state to excited level.`}
      </p>
    `;
  }

  initialSelect.addEventListener('change', update);
  finalSelect.addEventListener('change', update);

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      initialSelect.value = btn.dataset.ni;
      finalSelect.value = btn.dataset.nf;
      update();
    });
  });

  update();
}

/* ==========================================================================
   12. Electromagnetic Radiation & Photon Energy Slider
   ========================================================================== */
function initEMWaveCalculator() {
  const slider = document.getElementById('wavelengthSlider');
  const dispWave = document.getElementById('dispWavelength');
  const dispFreq = document.getElementById('freqInputDisplay');
  const dispEnergy = document.getElementById('energyInputDisplay');

  if (!slider) return;

  function calculate() {
    const lambdaNm = parseFloat(slider.value);
    const lambdaM = lambdaNm * 1e-9;
    const c = 3.0e8;
    const h = 6.626e-34;

    const freqHz = c / lambdaM;
    const energyJ = h * freqHz;
    const energyEV = energyJ / 1.602e-19;

    let colorName = '';
    if (lambdaNm < 380) colorName = 'Ultraviolet (UV)';
    else if (lambdaNm < 440) colorName = 'Violet';
    else if (lambdaNm < 490) colorName = 'Blue / Cyan';
    else if (lambdaNm < 560) colorName = 'Green';
    else if (lambdaNm < 590) colorName = 'Yellow';
    else if (lambdaNm < 635) colorName = 'Orange';
    else if (lambdaNm <= 750) colorName = 'Red';
    else colorName = 'Infrared (IR)';

    dispWave.textContent = `${lambdaNm} nm (${colorName})`;
    dispFreq.value = `${freqHz.toExponential(3)} Hz`;
    dispEnergy.value = `${energyEV.toFixed(2)} eV (${energyJ.toExponential(2)} J)`;
  }

  slider.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   13. Visible Hydrogen Balmer Line Spectrogram
   ========================================================================== */
function initBalmerSpectrum() {
  const lines = document.querySelectorAll('.spec-line');
  const detailBox = document.getElementById('balmerLineDetails');
  if (!detailBox) return;

  const lineData = {
    'H-alpha': {
      transition: 'n = 3 → n = 2',
      name: 'H-alpha (H-α)',
      color: 'Crimson Red',
      wavelength: '656.3 nm',
      frequency: '4.57 × 10¹⁴ Hz',
      energy: '1.89 eV (3.03 × 10⁻¹⁹ J)',
      fact: 'Smallest energy drop in visible Balmer series; therefore possesses the longest wavelength and lowest frequency of all visible lines.'
    },
    'H-beta': {
      transition: 'n = 4 → n = 2',
      name: 'H-beta (H-β)',
      color: 'Cyan / Blue-Green',
      wavelength: '486.1 nm',
      frequency: '6.17 × 10¹⁴ Hz',
      energy: '2.55 eV (4.09 × 10⁻¹⁹ J)',
      fact: 'Characteristic bright blue-green emission observed in stellar spectroscopy and interstellar hydrogen nebulae.'
    },
    'H-gamma': {
      transition: 'n = 5 → n = 2',
      name: 'H-gamma (H-γ)',
      color: 'Blue-Violet',
      wavelength: '434.0 nm',
      frequency: '6.91 × 10¹⁴ Hz',
      energy: '2.86 eV (4.58 × 10⁻¹⁹ J)',
      fact: 'Higher photon energy than H-alpha and H-beta, entering the indigo/violet range.'
    },
    'H-delta': {
      transition: 'n = 6 → n = 2',
      name: 'H-delta (H-δ)',
      color: 'Deep Violet',
      wavelength: '410.2 nm',
      frequency: '7.31 × 10¹⁴ Hz',
      energy: '3.02 eV (4.84 × 10⁻¹⁹ J)',
      fact: 'Shortest visible wavelength and highest frequency of the four classic Balmer lines before reaching the series limit in the near UV.'
    }
  };

  function showDetails(key) {
    const d = lineData[key];
    detailBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--teal-900);">${d.name} Line · ${d.color}</h4>
        <span class="badge badge-teal">${d.transition}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Exact Wavelength (λ):</span>
          <strong style="display: block; font-size: 1rem; color: var(--teal-900);">${d.wavelength}</strong>
        </div>
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Frequency (ν):</span>
          <strong style="display: block; font-size: 1rem; color: var(--teal-900);">${d.frequency}</strong>
        </div>
        <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <span style="font-size: 0.72rem; color: var(--text-muted);">Photon Energy (ΔE):</span>
          <strong style="display: block; font-size: 1rem; color: var(--teal-900);">${d.energy}</strong>
        </div>
      </div>
      <div class="high-yield-callout" style="margin: 0;">
        ⭐ <strong>MDCAT Key Rule:</strong> ${d.fact}
      </div>
    `;
  }

  lines.forEach(line => {
    line.addEventListener('click', () => {
      showDetails(line.dataset.name);
    });
  });

  showDetails('H-alpha');
}

/* ==========================================================================
   14. Modern Orbital Cards Explorer
   ========================================================================== */
function initOrbitalCards() {
  const cards = document.querySelectorAll('.orbital-card');
  const panel = document.getElementById('orbitalInfoPanel');
  if (!panel) return;

  const data = {
    s: {
      title: 's Subshell & Orbitals (l = 0)',
      shape: 'Spherical and non-directional',
      orbitals: '1 orbital (m_l = 0)',
      capacity: 'Maximum 2 electrons with opposite spins (↑↓)',
      nodes: 'Radial nodes = n - l - 1 = n - 1; Angular nodes = 0',
      description: 'The electron probability density is spherically symmetric around the nucleus. It has maximum penetration and shielding ability closest to the nucleus.'
    },
    p: {
      title: 'p Subshell & Orbitals (l = 1)',
      shape: 'Dumb-bell shaped with two lobes separated by a nodal plane',
      orbitals: '3 degenerate orbitals: p_x, p_y, p_z (m_l = -1, 0, +1)',
      capacity: 'Maximum 6 electrons (2 per orbital)',
      nodes: 'Each p orbital has exactly 1 angular nodal plane passing through the nucleus',
      description: 'Directional orbitals oriented mutually perpendicular along the x, y, and z Cartesian axes. Forms sigma (head-on) and pi (lateral) covalent bonds.'
    },
    d: {
      title: 'd Subshell & Orbitals (l = 2)',
      shape: 'Double dumb-bell / Cloverleaf (except d_z² which has a donut torus ring)',
      orbitals: '5 degenerate orbitals: d_xy, d_yz, d_xz, d_x²-y², d_z² (m_l = -2, -1, 0, +1, +2)',
      capacity: 'Maximum 10 electrons (2 per orbital)',
      nodes: '2 angular nodal cones/planes',
      description: 'Crucial for transition metal chemistry, variable oxidation states, coloured complex ions, and catalytic behavior due to partially filled d-orbitals.'
    },
    f: {
      title: 'f Subshell & Orbitals (l = 3)',
      shape: 'Complex multi-lobed structures (up to 8 lobes)',
      orbitals: '7 degenerate orbitals (m_l = -3, -2, -1, 0, +1, +2, +3)',
      capacity: 'Maximum 14 electrons',
      nodes: '3 angular nodes',
      description: 'Found in Lanthanides (4f) and Actinides (5f). Deeply buried within outer shells, resulting in lanthanide contraction.'
    }
  };

  function render(orbKey) {
    const o = data[orbKey];
    panel.innerHTML = `
      <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--teal-900); margin-bottom: 8px;">${o.title}</h4>
      <div class="table-responsive-wrapper" style="margin: 0 0 12px 0;">
        <table class="mdcat-table">
          <tr><td style="width: 160px;"><strong>Shape & Geometry:</strong></td><td>${o.shape}</td></tr>
          <tr><td><strong>Degeneracy:</strong></td><td>${o.orbitals}</td></tr>
          <tr><td><strong>Max Electron Limit:</strong></td><td><strong style="color: var(--teal-700);">${o.capacity}</strong></td></tr>
          <tr><td><strong>Nodal Planes:</strong></td><td>${o.nodes}</td></tr>
        </table>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">${o.description}</p>
    `;
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      render(card.dataset.orb);
    });
  });

  render('s');
}

/* ==========================================================================
   15. spdf Electron Configuration Generator (Z = 1 to 36)
   ========================================================================== */
function initElectronConfigBuilder() {
  const inputZ = document.getElementById('inputConfigZ');
  const genBtn = document.getElementById('generateConfigBtn');
  const outputBoard = document.getElementById('configOutputBoard');
  const elemChips = document.querySelectorAll('.element-picker-bar .elem-chip');

  const elements36 = [
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
    { z: 13, sym: 'Al', name: 'Aluminium' },
    { z: 14, sym: 'Si', name: 'Silicon' },
    { z: 15, sym: 'P', name: 'Phosphorus' },
    { z: 16, sym: 'S', name: 'Sulfur' },
    { z: 17, sym: 'Cl', name: 'Chlorine' },
    { z: 18, sym: 'Ar', name: 'Argon' },
    { z: 19, sym: 'K', name: 'Potassium' },
    { z: 20, sym: 'Ca', name: 'Calcium' },
    { z: 21, sym: 'Sc', name: 'Scandium' },
    { z: 22, sym: 'Ti', name: 'Titanium' },
    { z: 23, sym: 'V', name: 'Vanadium' },
    { z: 24, sym: 'Cr', name: 'Chromium' }, // Exception
    { z: 25, sym: 'Mn', name: 'Manganese' },
    { z: 26, sym: 'Fe', name: 'Iron' },
    { z: 27, sym: 'Co', name: 'Cobalt' },
    { z: 28, sym: 'Ni', name: 'Nickel' },
    { z: 29, sym: 'Cu', name: 'Copper' }, // Exception
    { z: 30, sym: 'Zn', name: 'Zinc' },
    { z: 31, sym: 'Ga', name: 'Gallium' },
    { z: 32, sym: 'Ge', name: 'Germanium' },
    { z: 33, sym: 'As', name: 'Arsenic' },
    { z: 34, sym: 'Se', name: 'Selenium' },
    { z: 35, sym: 'Br', name: 'Bromine' },
    { z: 36, sym: 'Kr', name: 'Krypton' }
  ];

  // Subshells definitions in Aufbau order (for Z=1..36)
  // format: { name: '1s', n: 1, l: 0, capacity: 2, orbitals: 1 }
  const subshellsOrder = [
    { name: '1s', n: 1, capacity: 2, numBoxes: 1 },
    { name: '2s', n: 2, capacity: 2, numBoxes: 1 },
    { name: '2p', n: 2, capacity: 6, numBoxes: 3 },
    { name: '3s', n: 3, capacity: 2, numBoxes: 1 },
    { name: '3p', n: 3, capacity: 6, numBoxes: 3 },
    { name: '4s', n: 4, capacity: 2, numBoxes: 1 },
    { name: '3d', n: 3, capacity: 10, numBoxes: 5 },
    { name: '4p', n: 4, capacity: 6, numBoxes: 3 }
  ];

  function getConfiguration(Z) {
    // Check for Chromium (Z=24) and Copper (Z=29) exceptions
    let subCounts = { '1s': 0, '2s': 0, '2p': 0, '3s': 0, '3p': 0, '4s': 0, '3d': 0, '4p': 0 };

    if (Z === 24) {
      subCounts = { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '4s': 1, '3d': 5, '4p': 0 };
    } else if (Z === 29) {
      subCounts = { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '4s': 1, '3d': 10, '4p': 0 };
    } else {
      let rem = Z;
      for (const sub of subshellsOrder) {
        if (rem <= 0) break;
        const take = Math.min(rem, sub.capacity);
        subCounts[sub.name] = take;
        rem -= take;
      }
    }

    return subCounts;
  }

  function renderOrbitalBoxes(subCounts) {
    return subshellsOrder.map(sub => {
      const count = subCounts[sub.name];
      if (count === 0) return '';

      // Distribute electrons into boxes according to Hund's Rule
      // First pass: put 1 electron up in each box up to count
      // Second pass: put 1 electron down in each box
      const boxes = [];
      const nBoxes = sub.numBoxes;
      const electronsPerBox = new Array(nBoxes).fill(0);

      for (let i = 0; i < count; i++) {
        const boxIdx = i % nBoxes;
        electronsPerBox[boxIdx]++;
      }

      for (let b = 0; b < nBoxes; b++) {
        const c = electronsPerBox[b];
        let arrow = '&nbsp;';
        if (c === 1) arrow = '↑';
        else if (c === 2) arrow = '↑↓';
        boxes.push(`<div class="spin-box-cell" title="Orbital ${b+1}">${arrow}</div>`);
      }

      return `
        <div class="subshell-box-group">
          <span class="box-group-label">${sub.name}<sup>${count}</sup></span>
          <div class="individual-boxes">${boxes.join('')}</div>
        </div>
      `;
    }).join('');
  }

  function generate() {
    let Z = parseInt(inputZ.value, 10);
    if (isNaN(Z) || Z < 1) Z = 1;
    if (Z > 36) Z = 36;
    inputZ.value = Z;

    const elem = elements36[Z - 1] || { z: Z, sym: 'X', name: `Element ${Z}` };
    const subCounts = getConfiguration(Z);

    // Build spdf string
    const spdfParts = [];
    for (const sub of subshellsOrder) {
      if (subCounts[sub.name] > 0) {
        spdfParts.push(`${sub.name}<sup>${subCounts[sub.name]}</sup>`);
      }
    }
    const fullSpdf = spdfParts.join(' ');

    // Noble gas shorthand
    let nobleShorthand = fullSpdf;
    if (Z > 18) {
      const rest = [];
      if (subCounts['4s'] > 0) rest.push(`4s<sup>${subCounts['4s']}</sup>`);
      if (subCounts['3d'] > 0) rest.push(`3d<sup>${subCounts['3d']}</sup>`);
      if (subCounts['4p'] > 0) rest.push(`4p<sup>${subCounts['4p']}</sup>`);
      nobleShorthand = `[Ar] ${rest.join(' ')}`;
    } else if (Z > 10) {
      const rest = [];
      if (subCounts['3s'] > 0) rest.push(`3s<sup>${subCounts['3s']}</sup>`);
      if (subCounts['3p'] > 0) rest.push(`3p<sup>${subCounts['3p']}</sup>`);
      nobleShorthand = `[Ne] ${rest.join(' ')}`;
    } else if (Z > 2) {
      const rest = [];
      if (subCounts['2s'] > 0) rest.push(`2s<sup>${subCounts['2s']}</sup>`);
      if (subCounts['2p'] > 0) rest.push(`2p<sup>${subCounts['2p']}</sup>`);
      nobleShorthand = `[He] ${rest.join(' ')}`;
    }

    // Shell distribution (K, L, M, N)
    const shellK = subCounts['1s'];
    const shellL = subCounts['2s'] + subCounts['2p'];
    const shellM = subCounts['3s'] + subCounts['3p'] + subCounts['3d'];
    const shellN = subCounts['4s'] + subCounts['4p'];

    const shellCounts = [shellK, shellL, shellM, shellN].filter(c => c > 0).join(', ');

    // Valence electrons
    let valence = 0;
    if (Z <= 2) valence = Z;
    else if (Z <= 10) valence = subCounts['2s'] + subCounts['2p'];
    else if (Z <= 18) valence = subCounts['3s'] + subCounts['3p'];
    else if (Z <= 30) valence = subCounts['4s'] + (Z === 24 || Z === 29 ? subCounts['3d'] : 0);
    else valence = subCounts['4s'] + subCounts['4p'];

    const isException = Z === 24 || Z === 29;

    outputBoard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--teal-900);">${elem.name} (${elem.sym}) · Atomic Number Z = ${Z}</h4>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Ground State Electronic Structure</span>
        </div>
        ${isException ? '<span class="badge badge-purple">⭐ High-Yield Stability Exception!</span>' : ''}
      </div>

      <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">Full spdf Configuration:</div>
        <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--teal-800); margin-bottom: 10px;">${fullSpdf}</div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 0.85rem;">
          <div><strong>Noble Gas:</strong> <span style="font-family: var(--font-mono);">${nobleShorthand}</span></div>
          <div><strong>Shell Distribution (K,L,M,N):</strong> <span>${shellCounts}</span></div>
          <div><strong>Valence Electrons:</strong> <strong>${valence}</strong></div>
        </div>
      </div>

      <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--teal-900); margin-bottom: 10px;">Hund's Rule Orbital Spin Box Visualizer:</h5>
      <div class="orbital-boxes-row">${renderOrbitalBoxes(subCounts)}</div>

      ${isException ? `
        <div class="high-yield-callout" style="margin: 12px 0 0 0;">
          ⭐ <strong>Why does ${elem.name} deviate?</strong><br>
          ${Z === 24 ? 'Promoting one 4s electron to 3d yields [Ar] 4s¹ 3d⁵. The exactly half-filled d⁵ subshell possesses symmetrical charge distribution and maximum quantum exchange energy.' : 'Promoting one 4s electron to 3d yields [Ar] 4s¹ 3d¹⁰. The completely filled d¹⁰ subshell exhibits maximum symmetry and thermodynamic stability.'}
        </div>
      ` : ''}
    `;

    // Highlight chip
    elemChips.forEach(chip => {
      chip.classList.remove('active');
      if (parseInt(chip.dataset.z, 10) === Z) {
        chip.classList.add('active');
      }
    });
  }

  elemChips.forEach(chip => {
    chip.addEventListener('click', () => {
      inputZ.value = chip.dataset.z;
      generate();
    });
  });

  genBtn.addEventListener('click', generate);
  inputZ.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generate();
  });

  generate();
}

/* ==========================================================================
   16. 25+ High-Yield Quick Fact Flip Cards
   ========================================================================== */
function initHighYieldFlipCards() {
  const grid = document.getElementById('flipCardsGrid');
  const filterBtns = document.querySelectorAll('.flip-filter-bar .filter-btn');
  if (!grid) return;

  const cardsData = [
    { cat: 'subatomic', q: 'Where is 99.98% of atomic mass concentrated?', a: 'Inside the tiny, dense central nucleus.' },
    { cat: 'subatomic', q: 'How do you calculate number of neutrons?', a: 'Neutrons = Mass Number (A) − Atomic Number (Z).' },
    { cat: 'subatomic', q: 'What is the relative mass of an electron?', a: '≈ 1/1836 u (0.0005485 amu) — negligible in atomic mass.' },
    { cat: 'subatomic', q: 'Why do isotopes have identical chemical properties?', a: 'Because they have the same electronic configuration and valence electrons.' },
    { cat: 'subatomic', q: 'Which isotope is used as the universal atomic mass standard?', a: 'Carbon-12 (¹²₆C), where 1 amu = 1/12th the mass of one ¹²C atom.' },
    { cat: 'subatomic', q: 'What happens to protons during ion formation?', a: 'Protons never change! Only electrons are lost (cation) or gained (anion).' },
    { cat: 'subatomic', q: 'Why is cation radius smaller than its parent atom?', a: 'Loss of valence electrons increases effective nuclear charge (Z_eff) pulling remaining electrons closer.' },
    { cat: 'models', q: 'Who discovered the electron and measured e/m ratio?', a: 'J. J. Thomson (1897) using cathode rays (e/m = 1.7588 × 10¹¹ C/kg).' },
    { cat: 'models', q: 'Who discovered the neutron?', a: 'James Chadwick (1932) by bombarding Beryllium with alpha particles.' },
    { cat: 'models', q: 'What did Rutherford’s gold foil experiment prove?', a: 'The atom is mostly empty space with a tiny, dense, positively charged nucleus.' },
    { cat: 'models', q: 'What was the fatal flaw in Rutherford’s model?', a: 'Classical physics predicted accelerating electrons should continuously radiate energy and spiral into the nucleus in 10⁻⁸ s.' },
    { cat: 'models', q: 'What is Bohr’s angular momentum quantization condition?', a: 'mvr = nh / 2π (where n = 1, 2, 3...).' },
    { cat: 'quantum', q: 'What is the fundamental difference between Orbit and Orbital?', a: 'Orbit is a 2D fixed circular path; Orbital is a 3D probability region (ψ² ≥ 90%).' },
    { cat: 'quantum', q: 'What is the maximum number of electrons in shell n?', a: '2n² electrons (e.g. for n=3, max electrons = 2(3²) = 18).' },
    { cat: 'quantum', q: 'How many degenerate orbitals exist in a d subshell?', a: '5 degenerate orbitals (2l + 1 = 2(2) + 1 = 5), holding a maximum of 10 electrons.' },
    { cat: 'quantum', q: 'Which hydrogen spectral series falls in the Visible region?', a: 'Balmer Series (transitions dropping down to n = 2).' },
    { cat: 'quantum', q: 'Which hydrogen series falls in the Ultraviolet (UV) region?', a: 'Lyman Series (transitions dropping down to n = 1).' },
    { cat: 'quantum', q: 'What is the relationship between wavelength and photon energy?', a: 'Inversely proportional: E = hc / λ (Shorter wavelength = Higher energy).' },
    { cat: 'config', q: 'What does the Aufbau principle dictate?', a: 'Electrons fill the lowest available energy orbitals first according to the (n + l) rule.' },
    { cat: 'config', q: 'Why does 4s fill before 3d in Aufbau order?', a: 'For 4s: n+l = 4+0 = 4; for 3d: n+l = 3+2 = 5. Lower (n+l) has lower energy.' },
    { cat: 'config', q: 'What does the Pauli Exclusion Principle state?', a: 'An orbital can hold at most 2 electrons, and they must possess opposite spins (↑↓).' },
    { cat: 'config', q: 'What does Hund’s Rule of Multiplicity state?', a: 'Degenerate orbitals are occupied singly with parallel spins before pairing begins.' },
    { cat: 'config', q: 'What is the ground state configuration of Chromium (Z=24)?', a: '[Ar] 4s¹ 3d⁵ (due to extra stability of half-filled d⁵ subshell).' },
    { cat: 'config', q: 'What is the ground state configuration of Copper (Z=29)?', a: '[Ar] 4s¹ 3d¹⁰ (due to extra stability of fully-filled d¹⁰ subshell).' },
    { cat: 'config', q: 'What is the wave number formula?', a: 'ν̄ = 1 / λ = ν / c (Directly proportional to photon energy: E = hcν̄).' }
  ];

  function renderCards(filter) {
    const filtered = filter === 'all' ? cardsData : cardsData.filter(c => c.cat === filter);
    grid.innerHTML = filtered.map((c, i) => `
      <div class="flip-card" data-idx="${i}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span class="fc-category">${c.cat}</span>
            <p class="fc-text">${c.q}</p>
            <span class="fc-hint">👆 Click to reveal</span>
          </div>
          <div class="flip-card-back">
            <span class="fc-category">MDCAT Answer</span>
            <p class="fc-text">${c.a}</p>
            <span class="fc-hint">👆 Click to flip back</span>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  renderCards('all');
}

/* ==========================================================================
   17. 12 Concept Mastery Flashcards Deck
   ========================================================================== */
function initFlashcards() {
  const mainCard = document.getElementById('mainFlashcard');
  const qText = document.getElementById('cardQuestionText');
  const aText = document.getElementById('cardAnswerText');
  const currIdxEl = document.getElementById('currentCardIndex');
  const totalCountEl = document.getElementById('totalCardsCount');
  const masteredCountEl = document.getElementById('masteredCount');
  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');
  const shuffleBtn = document.getElementById('shuffleCardsBtn');
  const markMasteredBtn = document.getElementById('markMasteredBtn');

  if (!mainCard) return;

  const deck = [
    { q: 'What fundamentally determines the chemical identity of an element?', a: 'The number of protons in the nucleus (Atomic Number, Z).' },
    { q: 'What is the maximum number of electrons that can occupy a p subshell?', a: '6 electrons (3 degenerate orbitals × 2 electrons/orbital).' },
    { q: 'What does the Aufbau Principle describe?', a: 'The progressive filling order of atomic subshells from lowest to highest energy.' },
    { q: 'What is an isotope?', a: 'Atoms of the same element having identical atomic number (Z) but different mass numbers (A) due to different neutrons.' },
    { q: 'Why is the ionic radius of Na⁺ smaller than the atomic radius of neutral Na?', a: 'Because Na⁺ loses its outermost 3s valence electron and experiences greater effective nuclear charge.' },
    { q: 'What was J. J. Thomson’s atomic model termed?', a: 'The Plum Pudding / Watermelon Model (electrons embedded in a diffuse positive sphere).' },
    { q: 'What is the energy of the ground state (n = 1) in a Hydrogen atom according to Bohr?', a: '-13.60 eV (or -2.18 × 10⁻¹⁸ Joules).' },
    { q: 'Which transition in the Hydrogen spectrum produces the famous Red H-alpha line?', a: 'The electronic jump from n = 3 to n = 2 (λ = 656.3 nm, Balmer series).' },
    { q: 'How many angular nodal planes does a p orbital possess?', a: 'Exactly 1 angular nodal plane passing through the nucleus.' },
    { q: 'Why does Chromium have the configuration [Ar] 4s¹ 3d⁵ instead of [Ar] 4s² 3d⁴?', a: 'Because a half-filled d⁵ subshell possesses symmetrical charge distribution and maximum quantum exchange energy.' },
    { q: 'What is the formula for the speed of electromagnetic radiation?', a: 'c = λ × ν (Speed of light = Wavelength × Frequency).' },
    { q: 'What is Pauli’s Exclusion Principle?', a: 'No two electrons in an atom can share all four quantum numbers; an orbital holds max 2 electrons with opposite spins.' }
  ];

  let currentIndex = 0;
  let masteredCards = JSON.parse(localStorage.getItem('mdcat_chem_atomic_flashcards_mastered') || '[]');

  totalCountEl.textContent = deck.length;

  function updateCard() {
    mainCard.classList.remove('flipped');
    setTimeout(() => {
      const card = deck[currentIndex];
      qText.textContent = card.q;
      aText.textContent = card.a;
      currIdxEl.textContent = currentIndex + 1;
      masteredCountEl.textContent = masteredCards.length;

      if (masteredCards.includes(currentIndex)) {
        markMasteredBtn.textContent = '★ Mastered ✓';
        markMasteredBtn.style.background = 'var(--teal-50)';
        markMasteredBtn.style.borderColor = 'var(--teal-600)';
      } else {
        markMasteredBtn.textContent = '☆ Mark as Mastered';
        markMasteredBtn.style.background = '';
        markMasteredBtn.style.borderColor = '';
      }
    }, 150);
  }

  mainCard.addEventListener('click', () => {
    mainCard.classList.toggle('flipped');
  });

  mainCard.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      mainCard.classList.toggle('flipped');
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    updateCard();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % deck.length;
    updateCard();
  });

  shuffleBtn.addEventListener('click', () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    currentIndex = 0;
    updateCard();
  });

  markMasteredBtn.addEventListener('click', () => {
    if (masteredCards.includes(currentIndex)) {
      masteredCards = masteredCards.filter(i => i !== currentIndex);
    } else {
      masteredCards.push(currentIndex);
    }
    localStorage.setItem('mdcat_chem_atomic_flashcards_mastered', JSON.stringify(masteredCards));
    updateCard();
  });

  updateCard();
}

/* ==========================================================================
   18. MDCAT Mini Mock Quiz (15 Comprehensive MCQs)
   ========================================================================== */
function initQuiz() {
  const qCurrentEl = document.getElementById('quizCurrentQ');
  const scoreCountEl = document.getElementById('quizScoreCount');
  const progressBar = document.getElementById('quizProgressBar');
  const catBadge = document.getElementById('quizCategoryBadge');
  const qTitle = document.getElementById('quizQuestionTitle');
  const optionsGrid = document.getElementById('quizOptionsGrid');
  const explBox = document.getElementById('quizExplanationBox');
  const nextBtn = document.getElementById('quizNextBtn');
  const quizCard = document.getElementById('quizCard');
  const resultsScreen = document.getElementById('quizResultsScreen');

  const finalScoreEl = document.getElementById('finalScoreDisplay');
  const finalPercentageEl = document.getElementById('finalPercentageDisplay');
  const finalCorrectEl = document.getElementById('finalCorrectCount');
  const finalWrongEl = document.getElementById('finalWrongCount');
  const feedbackBox = document.getElementById('performanceFeedbackBox');
  const retryBtn = document.getElementById('retryQuizBtn');
  const reviewBtn = document.getElementById('reviewAllQuizBtn');

  if (!quizCard) return;

  const quizData = [
    {
      q: 'Where is almost all the mass of an atom concentrated?',
      options: ['In the electron cloud', 'Uniformly distributed throughout the atom', 'In the nucleus', 'In the outermost valence shell'],
      correct: 2,
      cat: 'Subatomic Particles',
      explanation: 'More than 99.98% of atomic mass is concentrated in the nucleus because protons (≈ 1 u) and neutrons (≈ 1 u) reside there, while electrons have negligible mass (≈ 1/1836 u).'
    },
    {
      q: 'How many neutrons are present in the nucleus of a ²³₁₁Na atom?',
      options: ['11', '12', '23', '34'],
      correct: 1,
      cat: 'Z and A Calculations',
      explanation: 'Neutrons (n) = Mass Number (A) − Atomic Number (Z) = 23 − 11 = 12 neutrons.'
    },
    {
      q: 'Isotopes of the same chemical element have the same:',
      options: ['Mass number (A)', 'Number of neutrons', 'Electronic configuration in neutral atoms', 'Physical density and boiling points'],
      correct: 2,
      cat: 'Isotopes',
      explanation: 'Isotopes possess the exact same atomic number (Z) and identical number of valence electrons in neutral state, resulting in essentially identical chemical behavior.'
    },
    {
      q: 'In Rutherford’s gold foil experiment, why did a very small fraction (1 in ~8,000) of alpha particles rebound backwards (> 90°)?',
      options: ['Electrons in orbits strongly absorbed them', 'They suffered direct head-on collision with a tiny, ultra-dense positive nucleus', 'The gold atoms disintegrated into sub-particles', 'The ZnS screen reflected them'],
      correct: 1,
      cat: 'Atomic Models',
      explanation: 'Large-angle deflections and rebounds proved that positive charge and atomic mass are concentrated in an extraordinarily small, ultra-dense central core (nucleus).'
    },
    {
      q: 'Which of the following electronic transitions in the Hydrogen atom emits light in the visible region?',
      options: ['n = 2 → n = 1', 'n = 3 → n = 2', 'n = 4 → n = 3', 'n = 5 → n = 4'],
      correct: 1,
      cat: 'Bohr Model & Spectra',
      explanation: 'The Balmer series corresponds to transitions ending at n = 2 and produces visible light. The transition n = 3 → n = 2 yields the visible red H-alpha line (656.3 nm).'
    },
    {
      q: 'According to Planck’s Quantum Theory, how does photon energy relate to wavelength?',
      options: ['Directly proportional (E ∝ λ)', 'Inversely proportional (E = hc / λ)', 'Independent of wavelength', 'Proportional to square of wavelength'],
      correct: 1,
      cat: 'Electromagnetic Radiation',
      explanation: 'E = hν = hc / λ. Therefore, shorter wavelengths carry higher frequency and higher photon energy.'
    },
    {
      q: 'What is the maximum number of electrons that can be accommodated in the 3rd principal energy level (M-shell, n = 3)?',
      options: ['8', '18', '32', '9'],
      correct: 1,
      cat: 'Quantum Mechanics',
      explanation: 'The maximum electron capacity of shell n is given by 2n². For n = 3: 2(3²) = 2(9) = 18 electrons (2 in 3s, 6 in 3p, 10 in 3d).'
    },
    {
      q: 'Which subshell has 5 degenerate orbitals and can hold a maximum of 10 electrons?',
      options: ['s subshell (l = 0)', 'p subshell (l = 1)', 'd subshell (l = 2)', 'f subshell (l = 3)'],
      correct: 2,
      cat: 'Orbitals',
      explanation: 'For the d subshell (l = 2), the number of orbitals is 2l + 1 = 5 (d_xy, d_yz, d_xz, d_x²-y², d_z²), holding a maximum of 10 electrons.'
    },
    {
      q: 'What is the correct ground-state electronic configuration of Chromium (Z = 24)?',
      options: ['[Ar] 4s² 3d⁴', '[Ar] 4s¹ 3d⁵', '[Ar] 4s⁰ 3d⁶', '[Ne] 3s² 3p⁶ 4s² 3d⁴'],
      correct: 1,
      cat: 'Electronic Configuration',
      explanation: 'Chromium has [Ar] 4s¹ 3d⁵ because a half-filled d⁵ subshell has exceptional stability due to symmetrical distribution and maximum exchange energy.'
    },
    {
      q: 'Which rule states that no two electrons in an atom can have the exact same set of all 4 quantum numbers?',
      options: ['Aufbau Principle', 'Hund’s Rule', 'Pauli Exclusion Principle', 'Heisenberg Uncertainty Principle'],
      correct: 2,
      cat: 'Configuration Rules',
      explanation: 'The Pauli Exclusion Principle dictates that each individual orbital can hold at most two electrons, and they must have opposite intrinsic spins (↑↓).'
    },
    {
      q: 'How are electrons distributed among the 2p orbitals for a Nitrogen atom (Z = 7, 2p³)?',
      options: ['[↑↓] [↑] [ ]', '[↑] [↑] [↑]', '[↑↓] [ ] [↑]', '[↑] [↓] [↑]'],
      correct: 1,
      cat: 'Hund’s Rule',
      explanation: 'By Hund’s Rule of Multiplicity, degenerate orbitals (2p_x, 2p_y, 2p_z) are occupied singly with parallel spins [↑] [↑] [↑] before electron pairing occurs.'
    },
    {
      q: 'An aluminium ion has 13 protons and 10 electrons. What is its standard formula and charge?',
      options: ['Al³⁻', 'Al³⁺', 'Al⁺', 'Al²⁺'],
      correct: 1,
      cat: 'Ions',
      explanation: 'Net charge = Protons − Electrons = 13 − 10 = +3. Hence it forms the trivalent cation Al³⁺.'
    },
    {
      q: 'Chlorine has two isotopes: ³⁵Cl (75.77%, mass ≈ 35 u) and ³⁷Cl (24.23%, mass ≈ 37 u). What is its average atomic mass?',
      options: ['36.00 amu', '35.45 amu', '37.00 amu', '35.00 amu'],
      correct: 1,
      cat: 'Isotope Math',
      explanation: 'Average Mass = (35 × 0.7577) + (37 × 0.2423) = 26.52 + 8.96 = 35.48 ≈ 35.45 amu.'
    },
    {
      q: 'According to the (n + l) rule of Aufbau principle, which orbital fills first between 4s and 3d?',
      options: ['3d fills first because it has higher n', '4s fills first because its (n + l) is lower (4 < 5)', 'Both fill simultaneously', '4s fills first because it has higher l'],
      correct: 1,
      cat: 'Aufbau & (n+l) Rule',
      explanation: 'For 4s: n+l = 4+0 = 4. For 3d: n+l = 3+2 = 5. Lower (n+l) value orbital has lower energy and is filled first.'
    },
    {
      q: 'Which spectral series in the Hydrogen emission spectrum is produced when excited electrons drop to n_f = 1?',
      options: ['Balmer Series', 'Paschen Series', 'Lyman Series', 'Pfund Series'],
      correct: 2,
      cat: 'Spectral Series',
      explanation: 'The Lyman series consists of transitions dropping down to ground state n = 1 and resides entirely in the Ultraviolet (UV) region.'
    }
  ];

  let currentQ = 0;
  let score = 0;
  let userAnswers = new Array(quizData.length).fill(null);
  let isAnswered = false;

  function loadQuestion(idx) {
    isAnswered = false;
    const q = quizData[idx];
    qCurrentEl.textContent = idx + 1;
    scoreCountEl.textContent = score;
    progressBar.style.width = `${((idx + 1) / quizData.length) * 100}%`;

    catBadge.textContent = q.cat;
    qTitle.textContent = q.q;
    explBox.style.display = 'none';
    nextBtn.style.display = 'none';

    optionsGrid.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option-btn" data-index="${i}">
        <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
        <span>${opt}</span>
      </button>
    `).join('');

    optionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isAnswered) return;
        isAnswered = true;
        const chosen = parseInt(btn.dataset.index, 10);
        userAnswers[idx] = chosen;

        const allButtons = optionsGrid.querySelectorAll('.quiz-option-btn');
        allButtons.forEach(b => b.disabled = true);

        if (chosen === q.correct) {
          btn.classList.add('correct');
          score++;
          scoreCountEl.textContent = score;
        } else {
          btn.classList.add('wrong');
          allButtons[q.correct].classList.add('correct');
        }

        explBox.style.display = 'block';
        explBox.innerHTML = `
          <h4>${chosen === q.correct ? '✅ Correct Answer!' : '❌ Incorrect!'}</h4>
          <p>${q.explanation}</p>
        `;

        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = idx === quizData.length - 1 ? 'View Quiz Results 🏆' : 'Next Question →';
      });
    });
  }

  nextBtn.addEventListener('click', () => {
    if (currentQ < quizData.length - 1) {
      currentQ++;
      loadQuestion(currentQ);
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.style.display = 'none';
    resultsScreen.style.display = 'block';

    const percentage = Math.round((score / quizData.length) * 100);
    finalScoreEl.textContent = `${score} / ${quizData.length}`;
    finalPercentageEl.textContent = `${percentage}%`;
    finalCorrectEl.textContent = score;
    finalWrongEl.textContent = quizData.length - 0 - score;

    let tierMsg = '';
    if (percentage >= 90) {
      tierMsg = '🌟 <strong>Outstanding MDCAT Merit Score!</strong> You have exceptional command over Atomic Structure, quantum numbers, electron configuration rules, and spectra!';
    } else if (percentage >= 70) {
      tierMsg = '👍 <strong>Strong Foundation!</strong> Good work. Review the missed concept explanations and flashcards to lock in a 100% score on your entrance exam.';
    } else {
      tierMsg = '📚 <strong>Concept Revision Recommended:</strong> Review topics like Aufbau rule, Hund’s multiplicity, Bohr energy transitions, and isotope calculations before retesting.';
    }

    feedbackBox.innerHTML = tierMsg;
    localStorage.setItem('mdcat_chem_atomic_quiz_score', JSON.stringify({ score, percentage, date: new Date().toISOString() }));
  }

  retryBtn.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    userAnswers = new Array(quizData.length).fill(null);
    resultsScreen.style.display = 'none';
    quizCard.style.display = 'block';
    loadQuestion(0);
  });

  reviewBtn.addEventListener('click', () => {
    resultsScreen.style.display = 'none';
    quizCard.style.display = 'block';

    optionsGrid.innerHTML = quizData.map((q, idx) => `
      <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px; text-align: left;">
        <span class="badge badge-teal" style="margin-bottom: 6px;">Q${idx + 1} · ${q.cat}</span>
        <h4 style="font-size: 1rem; color: var(--teal-900); margin-bottom: 8px;">${q.q}</h4>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 6px;">
          <strong>Correct Option:</strong> <span style="color: var(--emerald-600); font-weight: 700;">${String.fromCharCode(65 + q.correct)}) ${q.options[q.correct]}</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">💡 ${q.explanation}</p>
      </div>
    `).join('');

    qTitle.textContent = 'All 15 Practice Questions & Detailed Explanations:';
    catBadge.textContent = 'Review Mode';
    explBox.style.display = 'none';
    nextBtn.style.display = 'none';
  });

  loadQuestion(0);
}

/* ==========================================================================
   19. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   20. Smooth Scroll & Mobile Nav
   ========================================================================== */
function initSmoothScroll() {
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const quickNav = document.getElementById('quickNav');

  if (mobileNavToggle && quickNav) {
    mobileNavToggle.addEventListener('click', () => {
      quickNav.style.display = quickNav.style.display === 'block' ? '' : 'block';
    });
  }
}
