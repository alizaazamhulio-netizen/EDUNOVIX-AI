/**
 * ==========================================================================
 * ACIDS, BASES & SALTS — MDCAT MASTER JAVASCRIPT ENGINE
 * Fully functional, accessible vanilla JavaScript interactive platform
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. GLOBAL STATE & LOCAL STORAGE INITIALIZATION
  // ==========================================================================
  const state = {
    bookmarkedSections: JSON.parse(localStorage.getItem('mdcat_abs_bookmarks') || '[]'),
    chapterCompleted: localStorage.getItem('mdcat_abs_completed') === 'true',
    masteredFlashcards: JSON.parse(localStorage.getItem('mdcat_abs_fc_mastered') || '[]'),
    currentFlashcardIndex: 0,
    quizScore: 0,
    quizAnsweredCount: 0,
    userAnswers: {},
    titration: {
      volAdded: 0,
      initialAcidM: 0.1,
      initialAcidVol: 25.0,
      baseM: 0.1,
      type: 'SA_SB'
    }
  };

  // ==========================================================================
  // 2. HERO PARTICLE CANVAS
  // ==========================================================================
  const canvas = document.getElementById('hero-particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleSymbols = ['H⁺', 'OH⁻', 'H₂O', 'H₃O⁺', 'Ka', 'Kb', 'Kw', 'pH', 'pOH', 'Cl⁻', 'Na⁺', 'CH₃COO⁻'];

    function resizeCanvas() {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class ChemicalParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.symbol = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.floor(Math.random() * 6) + 12;
        this.alpha = Math.random() * 0.4 + 0.2;
        this.color = this.symbol.includes('H') ? '#0d9488' : (this.symbol.includes('OH') ? '#0284c7' : '#7c3aed');
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.font = `600 ${this.size}px ui-monospace, monospace`;
        ctx.fillText(this.symbol, this.x, this.y);
        ctx.restore();
      }
    }

    for (let i = 0; i < 28; i++) {
      particles.push(new ChemicalParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ==========================================================================
  // 3. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  const toast = document.getElementById('toast-msg');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // ==========================================================================
  // 4. SMART SEARCH SYSTEM
  // ==========================================================================
  const searchInput = document.getElementById('global-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchResultsDropdown = document.getElementById('search-results-dropdown');

  const searchableSections = [
    { id: 'theories', title: 'Acid-Base Theories', keywords: 'arrhenius bronsted lowry lewis acid base proton donor acceptor electron pair adduct coordinate' },
    { id: 'theories', title: 'Arrhenius Theory', keywords: 'arrhenius h+ oh- aqueous limitation water' },
    { id: 'theories', title: 'Brønsted–Lowry Theory', keywords: 'bronsted lowry proton donor proton acceptor transfer' },
    { id: 'theories', title: 'Lewis Acid–Base Theory', keywords: 'lewis electron pair donor acceptor bf3 nh3 coordinate covalent dative' },
    { id: 'conjugate-pairs', title: 'Conjugate Acid–Base Pairs', keywords: 'conjugate acid conjugate base proton difference hcl cl- nh3 nh4+' },
    { id: 'conjugate-pairs', title: 'Amphiprotic Substances', keywords: 'amphiprotic amphoteric water hco3- h2po4- zwitterion' },
    { id: 'strength-concentration', title: 'Strong vs Weak Acids & Bases', keywords: 'strong acid weak acid ionization complete partial hcl ch3cooh naoh nh3' },
    { id: 'strength-concentration', title: 'Strength vs Concentration', keywords: 'strength vs concentration dilute concentrated molarity degree of ionization' },
    { id: 'strength-concentration', title: 'Ka & pKa Calculator', keywords: 'ka pka acid dissociation constant equilibrium calculation' },
    { id: 'strength-concentration', title: 'Kb & pKb Calculator', keywords: 'kb pkb base dissociation constant' },
    { id: 'water-kw', title: 'Water Auto-Ionization & Kw', keywords: 'water auto ionization kw 1e-14 25C temperature endothermic' },
    { id: 'water-kw', title: 'Ka × Kb = Kw Relationship', keywords: 'ka kb kw pka pkb 14 conjugate pair' },
    { id: 'ph-poh', title: 'pH and pOH Scale', keywords: 'ph poh -log[h+] -log[oh-] acidic neutral basic logarithmic scale' },
    { id: 'ph-poh', title: 'Interactive pH Scale', keywords: 'ph scale 0 to 14 lemon juice vinegar blood bleach battery acid' },
    { id: 'salts-hydrolysis', title: 'Salts & Salt Hydrolysis', keywords: 'salt hydrolysis nacl nh4cl ch3coona normal acid basic salt' },
    { id: 'buffers', title: 'Buffer Solutions', keywords: 'buffer acidic buffer basic buffer resists ph change common ion effect' },
    { id: 'buffers', title: 'Henderson–Hasselbalch Equation', keywords: 'henderson hasselbalch ph = pka + log([a-]/[ha]) buffer capacity' },
    { id: 'titration', title: 'Acid–Base Indicators', keywords: 'indicator phenolphthalein methyl orange litmus bromothymol blue color transition' },
    { id: 'titration', title: 'Titration Curve Simulator', keywords: 'titration burette flask equivalence point endpoint curve stoichiometry' },
    { id: 'formulas-high-yield', title: 'High-Yield Formula Sheet', keywords: 'formula sheet high yield mdcat equations facts 30 facts' },
    { id: 'flashcards', title: '30D Flip Flashcards', keywords: 'flashcards active recall 20 cards questions answers' },
    { id: 'mcq-quiz', title: '20 MDCAT Practice MCQs', keywords: 'mcq quiz test practice questions self assessment score' },
    { id: 'revision-tables', title: 'Revision & Comparison Tables', keywords: 'tables summary comparison quick reference' }
  ];

  if (searchInput && searchResultsDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = query ? 'block' : 'none';
      }

      if (!query) {
        searchResultsDropdown.style.display = 'none';
        searchResultsDropdown.innerHTML = '';
        return;
      }

      const results = searchableSections.filter(item => 
        item.title.toLowerCase().includes(query) || item.keywords.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        searchResultsDropdown.innerHTML = `<div style="padding: 1rem; color: var(--text-light); text-align: center; font-size: 0.88rem;">No matching topics found for "${query}".</div>`;
        searchResultsDropdown.style.display = 'block';
        return;
      }

      searchResultsDropdown.innerHTML = results.map(item => `
        <div class="search-result-item" data-target="${item.id}" role="option">
          <div class="search-result-title">🔍 ${item.title}</div>
          <div class="search-result-snippet">Matches: ${item.keywords.split(' ').slice(0, 5).join(', ')}...</div>
        </div>
      `).join('');
      searchResultsDropdown.style.display = 'block';
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        searchResultsDropdown.style.display = 'none';
        searchInput.focus();
      });
    }

    searchResultsDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (!item) return;
      const targetId = item.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        targetEl.style.transition = 'box-shadow 0.4s ease';
        targetEl.style.boxShadow = '0 0 0 3px var(--primary)';
        setTimeout(() => { targetEl.style.boxShadow = ''; }, 1600);
      }
      searchResultsDropdown.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 5. CHAPTER SCROLLSPY, PROGRESS BAR & BACK TO TOP
  // ==========================================================================
  const subNavLinks = document.querySelectorAll('.sub-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.getElementById('chapter-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function updateScrollState() {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? Math.min(100, Math.round((scrollPos / docHeight) * 100)) : 0;

    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
      progressBar.setAttribute('aria-valuenow', progressPercent);
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scrollspy section highlight
    let currentActive = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActive = sec.getAttribute('id');
      }
    });

    if (currentActive) {
      subNavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentActive}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 6. BOOKMARKS & DRAWER MANAGEMENT
  // ==========================================================================
  const toggleBookmarksBtn = document.getElementById('toggle-bookmarks-btn');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerPanel = document.getElementById('drawer-panel');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const bookmarksListContainer = document.getElementById('bookmarks-list-container');
  const bookmarkCountBadge = document.getElementById('bookmark-count-badge');
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

  function updateBookmarkUI() {
    if (bookmarkCountBadge) {
      bookmarkCountBadge.textContent = state.bookmarkedSections.length;
    }

    bookmarkBtns.forEach(btn => {
      const secId = btn.getAttribute('data-section');
      if (state.bookmarkedSections.includes(secId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '<span>★</span> Saved';
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = '<span>🔖</span> Bookmark';
      }
    });

    if (bookmarksListContainer) {
      if (state.bookmarkedSections.length === 0) {
        bookmarksListContainer.innerHTML = '<p style="color: var(--text-light); font-size: 0.9rem;">No sections bookmarked yet. Click the "Bookmark" button on any section to save it here for fast access!</p>';
      } else {
        bookmarksListContainer.innerHTML = state.bookmarkedSections.map(secId => {
          const sec = document.getElementById(secId);
          const title = sec ? (sec.querySelector('.section-title')?.textContent || secId) : secId;
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface-subtle); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <a href="#${secId}" class="bookmark-jump-link" style="font-weight: 600; font-size: 0.9rem; color: var(--primary-dark);">${title}</a>
              <button class="remove-bookmark-btn" data-remove="${secId}" style="background: none; border: none; color: var(--acid-rose); cursor: pointer; font-size: 0.9rem;" title="Remove">✕</button>
            </div>
          `;
        }).join('');
      }
    }
  }

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.getAttribute('data-section');
      if (!secId) return;

      if (state.bookmarkedSections.includes(secId)) {
        state.bookmarkedSections = state.bookmarkedSections.filter(id => id !== secId);
        showToast('Bookmark removed');
      } else {
        state.bookmarkedSections.push(secId);
        showToast('Bookmark saved!');
      }
      localStorage.setItem('mdcat_abs_bookmarks', JSON.stringify(state.bookmarkedSections));
      updateBookmarkUI();
    });
  });

  if (toggleBookmarksBtn && drawerOverlay && drawerPanel) {
    toggleBookmarksBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
      drawerPanel.classList.add('active');
    });

    const closeDrawer = () => {
      drawerOverlay.classList.remove('active');
      drawerPanel.classList.remove('active');
    };

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    if (bookmarksListContainer) {
      bookmarksListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-bookmark-btn')) {
          const toRemove = e.target.getAttribute('data-remove');
          state.bookmarkedSections = state.bookmarkedSections.filter(id => id !== toRemove);
          localStorage.setItem('mdcat_abs_bookmarks', JSON.stringify(state.bookmarkedSections));
          updateBookmarkUI();
          showToast('Bookmark removed');
        } else if (e.target.classList.contains('bookmark-jump-link')) {
          closeDrawer();
        }
      });
    }
  }

  updateBookmarkUI();

  // ==========================================================================
  // 7. MARK AS COMPLETED FUNCTIONALITY
  // ==========================================================================
  const markCompletedBtn = document.getElementById('mark-completed-btn');
  const completeIcon = document.getElementById('complete-icon');
  const completeText = document.getElementById('complete-text');

  function updateCompletionUI() {
    if (state.chapterCompleted) {
      if (completeIcon) completeIcon.textContent = '✅';
      if (completeText) completeText.textContent = 'Chapter Completed';
      if (markCompletedBtn) markCompletedBtn.classList.add('active');
    } else {
      if (completeIcon) completeIcon.textContent = '⭕';
      if (completeText) completeText.textContent = 'Mark Complete';
      if (markCompletedBtn) markCompletedBtn.classList.remove('active');
    }
  }

  if (markCompletedBtn) {
    markCompletedBtn.addEventListener('click', () => {
      state.chapterCompleted = !state.chapterCompleted;
      localStorage.setItem('mdcat_abs_completed', state.chapterCompleted);
      updateCompletionUI();
      if (state.chapterCompleted) {
        showToast('🎉 Congratulations! Acids, Bases & Salts chapter marked as completed!');
      } else {
        showToast('Chapter marked as incomplete');
      }
    });
  }
  updateCompletionUI();

  // ==========================================================================
  // 8. TABS COMPONENT (THEORY COMPARISON)
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.tabs-nav .tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentContainer = btn.closest('.simulator-container');
      if (!parentContainer) return;

      parentContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parentContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanelId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ==========================================================================
  // 9. PROTON TRANSFER SIMULATOR (BRØNSTED-LOWRY)
  // ==========================================================================
  const simHclBtn = document.getElementById('sim-example-hcl');
  const simNh3Btn = document.getElementById('sim-example-nh3');
  const simAnimateBtn = document.getElementById('sim-trigger-transfer');
  const protonEl = document.getElementById('animated-proton');
  const statusText = document.getElementById('transfer-status-text');

  let currentReactionMode = 'hcl'; // 'hcl' or 'nh3'

  function setReactionExample(mode) {
    currentReactionMode = mode;
    if (mode === 'hcl') {
      simHclBtn?.classList.replace('btn-outline', 'btn-primary');
      simNh3Btn?.classList.replace('btn-primary', 'btn-outline');

      document.getElementById('formula-left-1').textContent = 'HCl';
      document.getElementById('role-left-1').textContent = 'Brønsted Acid (Donor)';
      document.getElementById('role-left-1').className = 'molecule-role role-acid';

      document.getElementById('formula-left-2').textContent = 'H₂O';
      document.getElementById('role-left-2').textContent = 'Brønsted Base (Acceptor)';
      document.getElementById('role-left-2').className = 'molecule-role role-base';

      document.getElementById('formula-right-1').textContent = 'H₃O⁺';
      document.getElementById('role-right-1').textContent = 'Conjugate Acid';

      document.getElementById('formula-right-2').textContent = 'Cl⁻';
      document.getElementById('role-right-2').textContent = 'Conjugate Base';

      if (protonEl) {
        protonEl.style.left = '32%';
        protonEl.style.top = '30px';
      }
      if (statusText) statusText.textContent = 'Reaction: HCl donates a proton (H⁺) to H₂O, producing hydronium H₃O⁺ and chloride Cl⁻.';
    } else {
      simNh3Btn?.classList.replace('btn-outline', 'btn-primary');
      simHclBtn?.classList.replace('btn-primary', 'btn-outline');

      document.getElementById('formula-left-1').textContent = 'NH₃';
      document.getElementById('role-left-1').textContent = 'Brønsted Base (Acceptor)';
      document.getElementById('role-left-1').className = 'molecule-role role-base';

      document.getElementById('formula-left-2').textContent = 'H₂O';
      document.getElementById('role-left-2').textContent = 'Brønsted Acid (Donor)';
      document.getElementById('role-left-2').className = 'molecule-role role-acid';

      document.getElementById('formula-right-1').textContent = 'NH₄⁺';
      document.getElementById('role-right-1').textContent = 'Conjugate Acid';

      document.getElementById('formula-right-2').textContent = 'OH⁻';
      document.getElementById('role-right-2').textContent = 'Conjugate Base';

      if (protonEl) {
        protonEl.style.left = '48%';
        protonEl.style.top = '30px';
      }
      if (statusText) statusText.textContent = 'Reaction: H₂O acts as an acid (donates H⁺) to NH₃, forming ammonium NH₄⁺ and hydroxide OH⁻.';
    }
  }

  if (simHclBtn) simHclBtn.addEventListener('click', () => setReactionExample('hcl'));
  if (simNh3Btn) simNh3Btn.addEventListener('click', () => setReactionExample('nh3'));

  if (simAnimateBtn && protonEl) {
    simAnimateBtn.addEventListener('click', () => {
      if (currentReactionMode === 'hcl') {
        protonEl.style.left = '64%';
        protonEl.style.top = '25px';
        if (statusText) statusText.textContent = '⚡ H⁺ transferred from HCl to H₂O! Hydronium (H₃O⁺) formed.';
        setTimeout(() => {
          protonEl.style.left = '32%';
          protonEl.style.top = '30px';
        }, 2200);
      } else {
        protonEl.style.left = '64%';
        protonEl.style.top = '25px';
        if (statusText) statusText.textContent = '⚡ H⁺ transferred from H₂O to NH₃! Ammonium (NH₄⁺) and OH⁻ formed.';
        setTimeout(() => {
          protonEl.style.left = '48%';
          protonEl.style.top = '30px';
        }, 2200);
      }
    });
  }

  // ==========================================================================
  // 10. LEWIS ADDUCT FORMATION VISUALIZER
  // ==========================================================================
  const lewisAnimateBtn = document.getElementById('lewis-animate-btn');
  const lewisLonePair = document.getElementById('lewis-lone-pair');
  const lewisDesc = document.getElementById('lewis-desc');

  if (lewisAnimateBtn && lewisLonePair) {
    let lewisFormed = false;
    lewisAnimateBtn.addEventListener('click', () => {
      lewisFormed = !lewisFormed;
      if (lewisFormed) {
        lewisLonePair.style.transform = 'translateX(-75px)';
        lewisLonePair.style.background = '#818cf8';
        lewisAnimateBtn.textContent = 'Reset Lewis Adduct';
        if (lewisDesc) lewisDesc.innerHTML = '✨ <strong>Dative Coordinate Covalent Bond Formed!</strong> NH₃ shared both electrons of its lone pair with the vacant p-orbital of Boron in BF₃.';
      } else {
        lewisLonePair.style.transform = 'translateX(0)';
        lewisLonePair.style.background = '#38bdf8';
        lewisAnimateBtn.textContent = 'Form Dative Bond';
        if (lewisDesc) lewisDesc.innerHTML = 'BF₃ has an empty 2p orbital on Boron. Ammonia (:NH₃) donates its unshared non-bonding electron pair, forming a <strong>coordinate covalent (dative) bond</strong>: F₃B ← NH₃.';
      }
    });
  }

  // ==========================================================================
  // 11. MICROSCOPIC FLASK VISUALIZER: STRONG VS WEAK ACID
  // ==========================================================================
  const toggleStrengthBtn = document.getElementById('toggle-strength-btn');
  const toggleConcBtn = document.getElementById('toggle-conc-btn');
  const flaskBox = document.getElementById('flask-animation-box');
  const flaskTitle = document.getElementById('flask-view-title');
  const flaskDesc = document.getElementById('flask-view-desc');

  let isStrongAcid = true;
  let isConcentrated = false;

  function renderFlaskParticles() {
    if (!flaskBox) return;
    flaskBox.innerHTML = '';

    const count = isConcentrated ? 28 : 10;
    const particles = [];

    if (isStrongAcid) {
      for (let i = 0; i < count / 2; i++) {
        particles.push({ text: 'H₃O⁺', bg: '#fee2e2', color: '#b91c1c', border: '#f87171' });
        particles.push({ text: 'Cl⁻', bg: '#e0f2fe', color: '#0369a1', border: '#38bdf8' });
      }
    } else {
      // Weak acid: only ~5% ionized
      const ionizedCount = Math.max(2, Math.floor(count * 0.1));
      for (let i = 0; i < ionizedCount / 2; i++) {
        particles.push({ text: 'H₃O⁺', bg: '#fee2e2', color: '#b91c1c', border: '#f87171' });
        particles.push({ text: 'CH₃COO⁻', bg: '#e0f2fe', color: '#0369a1', border: '#38bdf8' });
      }
      for (let i = 0; i < count - ionizedCount; i++) {
        particles.push({ text: 'CH₃COOH', bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' });
      }
    }

    particles.forEach(p => {
      const span = document.createElement('span');
      span.textContent = p.text;
      span.style.cssText = `
        background: ${p.bg};
        color: ${p.color};
        border: 1px solid ${p.border};
        padding: 4px 8px;
        border-radius: 9999px;
        font-size: 0.78rem;
        font-weight: 700;
        font-family: monospace;
        display: inline-block;
        animation: fadeIn 0.3s ease;
      `;
      flaskBox.appendChild(span);
    });

    const concLabel = isConcentrated ? 'Concentrated' : 'Dilute';
    const acidType = isStrongAcid ? 'Strong Acid (HCl)' : 'Weak Acid (CH₃COOH)';
    if (flaskTitle) flaskTitle.textContent = `${concLabel} ${acidType}`;

    if (flaskDesc) {
      if (isStrongAcid) {
        flaskDesc.innerHTML = `<strong>100% Ionized:</strong> Every single molecule dissociates into free H₃O⁺ and Cl⁻ ions. ${isConcentrated ? 'High molarity (many ions).' : 'Low molarity (few ions).'}`;
      } else {
        flaskDesc.innerHTML = `<strong>~1.3% Ionized:</strong> Vast majority exists as unionized <strong>CH₃COOH</strong> molecules in equilibrium with only a few H₃O⁺ and CH₃COO⁻ ions.`;
      }
    }
  }

  if (toggleStrengthBtn) {
    toggleStrengthBtn.addEventListener('click', () => {
      isStrongAcid = !isStrongAcid;
      toggleStrengthBtn.textContent = isStrongAcid ? 'Mode: Strong Acid (100% Ionized)' : 'Mode: Weak Acid (Partial Equilibrium)';
      toggleStrengthBtn.className = isStrongAcid ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      renderFlaskParticles();
    });
  }

  if (toggleConcBtn) {
    toggleConcBtn.addEventListener('click', () => {
      isConcentrated = !isConcentrated;
      toggleConcBtn.textContent = isConcentrated ? 'Concentration: High (Concentrated)' : 'Concentration: Low (Dilute)';
      renderFlaskParticles();
    });
  }

  renderFlaskParticles();

  // ==========================================================================
  // 12. Ka & Kb CALCULATORS
  // ==========================================================================
  const calcKaBtn = document.getElementById('calc-ka-btn');
  if (calcKaBtn) {
    calcKaBtn.addEventListener('click', () => {
      const hVal = parseFloat(document.getElementById('ka-h-input')?.value || '0');
      const aVal = parseFloat(document.getElementById('ka-a-input')?.value || '0');
      const haVal = parseFloat(document.getElementById('ka-ha-input')?.value || '0');
      const stepsBox = document.getElementById('ka-steps-output');
      const resultBadge = document.getElementById('ka-result-badge');

      if (hVal <= 0 || aVal <= 0 || haVal <= 0) {
        showToast('Please enter positive numerical values for all concentrations.');
        return;
      }

      const ka = (hVal * aVal) / haVal;
      const pka = -Math.log10(ka);

      if (stepsBox) {
        stepsBox.innerHTML = `
          <div class="calc-step-item">Formula: Ka = ([H⁺] × [A⁻]) / [HA]</div>
          <div class="calc-step-item">Substitution: Ka = (${hVal.toExponential(3)} × ${aVal.toExponential(3)}) / ${haVal.toExponential(3)}</div>
          <div class="calc-step-item">Ka = ${ka.toExponential(3)}</div>
          <div class="calc-step-item">pKa = −log₁₀(${ka.toExponential(3)}) = ${pka.toFixed(2)}</div>
        `;
      }

      if (resultBadge) {
        resultBadge.textContent = `Ka = ${ka.toExponential(3)} | pKa = ${pka.toFixed(2)}`;
      }
    });
  }

  const calcKbBtn = document.getElementById('calc-kb-btn');
  if (calcKbBtn) {
    calcKbBtn.addEventListener('click', () => {
      const ohVal = parseFloat(document.getElementById('kb-oh-input')?.value || '0');
      const bhVal = parseFloat(document.getElementById('kb-bh-input')?.value || '0');
      const bVal = parseFloat(document.getElementById('kb-b-input')?.value || '0');
      const stepsBox = document.getElementById('kb-steps-output');
      const resultBadge = document.getElementById('kb-result-badge');

      if (ohVal <= 0 || bhVal <= 0 || bVal <= 0) {
        showToast('Please enter positive numerical values for all concentrations.');
        return;
      }

      const kb = (bhVal * ohVal) / bVal;
      const pkb = -Math.log10(kb);

      if (stepsBox) {
        stepsBox.innerHTML = `
          <div class="calc-step-item">Formula: Kb = ([BH⁺] × [OH⁻]) / [B]</div>
          <div class="calc-step-item">Substitution: Kb = (${bhVal.toExponential(3)} × ${ohVal.toExponential(3)}) / ${bVal.toExponential(3)}</div>
          <div class="calc-step-item">Kb = ${kb.toExponential(3)}</div>
          <div class="calc-step-item">pKb = −log₁₀(${kb.toExponential(3)}) = ${pkb.toFixed(2)}</div>
        `;
      }

      if (resultBadge) {
        resultBadge.textContent = `Kb = ${kb.toExponential(3)} | pKb = ${pkb.toFixed(2)}`;
      }
    });
  }

  // Rapid Ka <-> pKa Converter
  const convertKaBtn = document.getElementById('convert-ka-btn');
  if (convertKaBtn) {
    convertKaBtn.addEventListener('click', () => {
      const rawVal = document.getElementById('quick-ka-val')?.value.trim() || '';
      const ka = parseFloat(rawVal);
      const resEl = document.getElementById('quick-pka-res');
      if (isNaN(ka) || ka <= 0) {
        if (resEl) resEl.textContent = 'Invalid Ka input';
        return;
      }
      const pka = -Math.log10(ka);
      if (resEl) resEl.textContent = `pKa = ${pka.toFixed(3)}`;
    });
  }

  const convertPkaBtn = document.getElementById('convert-pka-btn');
  if (convertPkaBtn) {
    convertPkaBtn.addEventListener('click', () => {
      const pka = parseFloat(document.getElementById('quick-pka-val')?.value || '0');
      const resEl = document.getElementById('quick-ka-res');
      if (isNaN(pka)) {
        if (resEl) resEl.textContent = 'Invalid pKa input';
        return;
      }
      const ka = Math.pow(10, -pka);
      if (resEl) resEl.textContent = `Ka = ${ka.toExponential(3)} M`;
    });
  }

  // Kw Solver
  const kwCalcBtn = document.getElementById('kw-calc-btn');
  if (kwCalcBtn) {
    kwCalcBtn.addEventListener('click', () => {
      const rawVal = document.getElementById('kw-input-val')?.value.trim() || '';
      const mode = document.getElementById('kw-mode-select')?.value;
      const resEl = document.getElementById('kw-result-text');
      const val = parseFloat(rawVal);
      const Kw = 1.0e-14;

      if (isNaN(val) || val <= 0) {
        showToast('Please enter a valid positive concentration.');
        return;
      }

      if (mode === 'HtoOH') {
        const oh = Kw / val;
        const ph = -Math.log10(val);
        const poh = 14 - ph;
        if (resEl) resEl.textContent = `[OH⁻] = ${oh.toExponential(2)} M | pH = ${ph.toFixed(2)} | pOH = ${poh.toFixed(2)}`;
      } else {
        const h = Kw / val;
        const poh = -Math.log10(val);
        const ph = 14 - poh;
        if (resEl) resEl.textContent = `[H⁺] = ${h.toExponential(2)} M | pH = ${ph.toFixed(2)} | pOH = ${poh.toFixed(2)}`;
      }
    });
  }

  // ==========================================================================
  // 13. INTERACTIVE 0-14 pH & SUBSTANCE SCALE
  // ==========================================================================
  const phSlider = document.getElementById('ph-slider');
  const phIndicator = document.getElementById('ph-gauge-indicator');
  const phDispVal = document.getElementById('ph-disp-val');
  const pohDispVal = document.getElementById('poh-disp-val');
  const hDispVal = document.getElementById('h-disp-val');
  const ohDispVal = document.getElementById('oh-disp-val');
  const classDispVal = document.getElementById('class-disp-val');
  const substancePillsRow = document.getElementById('substance-pills-row');

  const commonSubstances = [
    { name: '1 M HCl', ph: 0.0 },
    { name: 'Gastric Acid', ph: 1.5 },
    { name: 'Lemon Juice', ph: 2.3 },
    { name: 'Vinegar', ph: 2.9 },
    { name: 'Black Coffee', ph: 5.0 },
    { name: 'Cow Milk', ph: 6.6 },
    { name: 'Pure Water', ph: 7.0 },
    { name: 'Human Blood', ph: 7.4 },
    { name: 'Baking Soda', ph: 8.4 },
    { name: 'Milk of Magnesia', ph: 10.5 },
    { name: 'Household Ammonia', ph: 11.5 },
    { name: 'Bleach', ph: 12.5 },
    { name: '1 M NaOH', ph: 14.0 }
  ];

  if (substancePillsRow) {
    substancePillsRow.innerHTML = commonSubstances.map(sub => `
      <button class="substance-pill" data-ph="${sub.ph}">${sub.name} (pH ${sub.ph})</button>
    `).join('');

    substancePillsRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.substance-pill');
      if (!pill) return;
      const targetPh = parseFloat(pill.getAttribute('data-ph'));
      if (phSlider) {
        phSlider.value = targetPh;
        updatePhScale(targetPh);
      }
      substancePillsRow.querySelectorAll('.substance-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  }

  function updatePhScale(ph) {
    const poh = 14.0 - ph;
    const hConc = Math.pow(10, -ph);
    const ohConc = Math.pow(10, -poh);

    const percent = (ph / 14.0) * 100;
    if (phIndicator) phIndicator.style.left = `${percent}%`;

    if (phDispVal) phDispVal.textContent = ph.toFixed(2);
    if (pohDispVal) pohDispVal.textContent = poh.toFixed(2);
    if (hDispVal) hDispVal.textContent = `${hConc.toExponential(2)} M`;
    if (ohDispVal) ohDispVal.textContent = `${ohConc.toExponential(2)} M`;

    if (classDispVal) {
      if (ph < 3.0) {
        classDispVal.textContent = 'Strongly Acidic';
        classDispVal.style.color = '#ef4444';
      } else if (ph < 6.8) {
        classDispVal.textContent = 'Moderately Acidic';
        classDispVal.style.color = '#f97316';
      } else if (ph >= 6.8 && ph <= 7.2) {
        classDispVal.textContent = 'Neutral Solution';
        classDispVal.style.color = '#16a34a';
      } else if (ph <= 11.0) {
        classDispVal.textContent = 'Moderately Basic';
        classDispVal.style.color = '#0284c7';
      } else {
        classDispVal.textContent = 'Strongly Basic';
        classDispVal.style.color = '#7c3aed';
      }
    }
  }

  if (phSlider) {
    phSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      updatePhScale(val);
    });
    updatePhScale(7.0);
  }

  // ==========================================================================
  // 14. UNIVERSAL MULTI-MODE pH / pOH CALCULATOR
  // ==========================================================================
  const phModeSelect = document.getElementById('ph-calc-mode');
  const phInputLabel = document.getElementById('ph-input-label');
  const phMainInput = document.getElementById('ph-main-input');
  const runPhCalcBtn = document.getElementById('run-ph-calc-btn');
  const phStepsContainer = document.getElementById('ph-steps-container');
  const phFinalBadge = document.getElementById('ph-final-badge');

  if (phModeSelect && phInputLabel && phMainInput) {
    phModeSelect.addEventListener('change', () => {
      const mode = phModeSelect.value;
      if (mode === 'H_to_ALL') {
        phInputLabel.textContent = 'Enter [H⁺] Concentration (M):';
        phMainInput.placeholder = 'e.g. 0.001 or 1e-3';
      } else if (mode === 'OH_to_ALL') {
        phInputLabel.textContent = 'Enter [OH⁻] Concentration (M):';
        phMainInput.placeholder = 'e.g. 0.0001 or 1e-4';
      } else if (mode === 'pH_to_ALL') {
        phInputLabel.textContent = 'Enter pH Value (0 to 14):';
        phMainInput.placeholder = 'e.g. 3.45';
      } else if (mode === 'pOH_to_ALL') {
        phInputLabel.textContent = 'Enter pOH Value (0 to 14):';
        phMainInput.placeholder = 'e.g. 10.55';
      }
    });
  }

  if (runPhCalcBtn && phMainInput) {
    runPhCalcBtn.addEventListener('click', () => {
      const mode = phModeSelect?.value || 'H_to_ALL';
      const rawVal = phMainInput.value.trim();
      const val = parseFloat(rawVal);

      if (isNaN(val) || val < 0) {
        showToast('Please enter a valid positive number.');
        return;
      }

      let ph = 7, poh = 7, h = 1e-7, oh = 1e-7;
      let steps = [];

      if (mode === 'H_to_ALL') {
        if (val <= 0) return showToast('Concentration must be > 0');
        h = val;
        ph = -Math.log10(h);
        poh = 14.0 - ph;
        oh = Math.pow(10, -poh);
        steps = [
          `Given: [H⁺] = ${h.toExponential(3)} M`,
          `Formula 1: pH = −log₁₀[H⁺] = −log₁₀(${h.toExponential(3)}) = ${ph.toFixed(3)}`,
          `Formula 2: pOH = 14.00 − pH = 14.00 − ${ph.toFixed(3)} = ${poh.toFixed(3)}`,
          `Formula 3: [OH⁻] = 10⁻ᵖᴼᴴ = 10⁻(${poh.toFixed(3)}) = ${oh.toExponential(3)} M`
        ];
      } else if (mode === 'OH_to_ALL') {
        if (val <= 0) return showToast('Concentration must be > 0');
        oh = val;
        poh = -Math.log10(oh);
        ph = 14.0 - poh;
        h = Math.pow(10, -ph);
        steps = [
          `Given: [OH⁻] = ${oh.toExponential(3)} M`,
          `Formula 1: pOH = −log₁₀[OH⁻] = −log₁₀(${oh.toExponential(3)}) = ${poh.toFixed(3)}`,
          `Formula 2: pH = 14.00 − pOH = 14.00 − ${poh.toFixed(3)} = ${ph.toFixed(3)}`,
          `Formula 3: [H⁺] = 10⁻ᵖᴴ = 10⁻(${ph.toFixed(3)}) = ${h.toExponential(3)} M`
        ];
      } else if (mode === 'pH_to_ALL') {
        ph = val;
        poh = 14.0 - ph;
        h = Math.pow(10, -ph);
        oh = Math.pow(10, -poh);
        steps = [
          `Given: pH = ${ph.toFixed(2)}`,
          `Formula 1: [H⁺] = 10⁻ᵖᴴ = 10⁻(${ph.toFixed(2)}) = ${h.toExponential(3)} M`,
          `Formula 2: pOH = 14.00 − pH = 14.00 − ${ph.toFixed(2)} = ${poh.toFixed(2)}`,
          `Formula 3: [OH⁻] = 10⁻ᵖᴼᴴ = 10⁻(${poh.toFixed(2)}) = ${oh.toExponential(3)} M`
        ];
      } else if (mode === 'pOH_to_ALL') {
        poh = val;
        ph = 14.0 - poh;
        oh = Math.pow(10, -poh);
        h = Math.pow(10, -ph);
        steps = [
          `Given: pOH = ${poh.toFixed(2)}`,
          `Formula 1: [OH⁻] = 10⁻ᵖᴼᴴ = 10⁻(${poh.toFixed(2)}) = ${oh.toExponential(3)} M`,
          `Formula 2: pH = 14.00 − pOH = 14.00 − ${poh.toFixed(2)} = ${ph.toFixed(2)}`,
          `Formula 3: [H⁺] = 10⁻ᵖᴴ = 10⁻(${ph.toFixed(2)}) = ${h.toExponential(3)} M`
        ];
      }

      if (phStepsContainer) {
        phStepsContainer.innerHTML = steps.map(s => `<div class="calc-step-item">${s}</div>`).join('');
      }

      const classification = ph < 7.0 ? 'Acidic Solution' : (ph === 7.0 ? 'Neutral Solution' : 'Basic Solution');
      if (phFinalBadge) {
        phFinalBadge.textContent = `pH = ${ph.toFixed(2)} | pOH = ${poh.toFixed(2)} (${classification})`;
      }
    });
  }

  // ==========================================================================
  // 15. SALT HYDROLYSIS DIAGNOSTIC EXPLORER
  // ==========================================================================
  const saltSelector = document.getElementById('salt-selector');
  const saltData = {
    NaCl: {
      acid: 'HCl (Strong Acid)',
      base: 'NaOH (Strong Base)',
      behavior: 'Neither cation (Na⁺) nor anion (Cl⁻) hydrolyzes in water.',
      equation: 'Na⁺ + Cl⁻ + H₂O → No Hydrolysis',
      net: '[H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M',
      explanation: 'Both ions originate from strong parents and form completely dissociated strong electrolytes. The solution remains neutral (pH ≈ 7.0).',
      result: 'pH ≈ 7.00 (Neutral Solution)'
    },
    NH4Cl: {
      acid: 'HCl (Strong Acid)',
      base: 'NH₃ (Weak Base)',
      behavior: 'Cation Hydrolysis (NH₄⁺ reacts with H₂O to generate H₃O⁺).',
      equation: 'NH₄⁺(aq) + H₂O(l) ⇌ NH₃(aq) + H₃O⁺(aq)',
      net: '[H₃O⁺] > [OH⁻]',
      explanation: 'Ammonium cation (NH₄⁺) is the conjugate acid of a weak base. It donates a proton to water, producing extra hydronium ions. Solution turns blue litmus red.',
      result: 'pH < 7.00 (Acidic Solution)'
    },
    CH3COONa: {
      acid: 'CH₃COOH (Weak Acid)',
      base: 'NaOH (Strong Base)',
      behavior: 'Anion Hydrolysis (CH₃COO⁻ reacts with H₂O to generate OH⁻).',
      equation: 'CH₃COO⁻(aq) + H₂O(l) ⇌ CH₃COOH(aq) + OH⁻(aq)',
      net: '[OH⁻] > [H₃O⁺]',
      explanation: 'Acetate anion (CH₃COO⁻) is the conjugate base of a weak acid. It abstracts a proton from water, releasing hydroxide (OH⁻) ions. Solution turns red litmus blue.',
      result: 'pH > 7.00 (Basic Solution)'
    },
    Na2CO3: {
      acid: 'H₂CO₃ (Weak Acid)',
      base: 'NaOH (Strong Base)',
      behavior: 'Anion Hydrolysis (CO₃²⁻ generates OH⁻).',
      equation: 'CO₃²⁻(aq) + H₂O(l) ⇌ HCO₃⁻(aq) + OH⁻(aq)',
      net: '[OH⁻] >> [H₃O⁺]',
      explanation: 'Carbonate ion hydrolyzes strongly in water, making the solution distinctly alkaline (pH ~ 11.6).',
      result: 'pH ~ 11.60 (Strongly Alkaline)'
    },
    CH3COONH4: {
      acid: 'CH₃COOH (Weak Acid, Ka = 1.8e-5)',
      base: 'NH₃ (Weak Base, Kb = 1.8e-5)',
      behavior: 'Both Cation & Anion Hydrolyze simultaneously.',
      equation: 'NH₄⁺ + CH₃COO⁻ + H₂O ⇌ NH₃ + CH₃COOH',
      net: 'Ka ≈ Kb → [H⁺] ≈ [OH⁻]',
      explanation: 'Because the Ka of acetic acid almost exactly equals the Kb of ammonia at 25°C, the two hydrolysis effects neutralize each other, producing a nearly neutral pH.',
      result: 'pH ≈ 7.00 (Nearly Neutral)'
    },
    FeCl3: {
      acid: 'HCl (Strong Acid)',
      base: 'Fe(OH)₃ (Weak Base)',
      behavior: 'Cation Hydrolysis: Hydrated Fe³⁺ acts as a Brønsted acid.',
      equation: '[Fe(H₂O)₆]³⁺ + H₂O ⇌ [Fe(H₂O)₅(OH)]²⁺ + H₃O⁺',
      net: '[H₃O⁺] >> [OH⁻]',
      explanation: 'High charge density on Fe³⁺ polarizes coordinated water molecules, liberating protons into solution and creating an acidic medium (pH ~ 2–3).',
      result: 'pH ~ 2.50 (Distinctly Acidic)'
    }
  };

  if (saltSelector) {
    saltSelector.addEventListener('change', () => {
      const selected = saltSelector.value;
      const info = saltData[selected];
      if (!info) return;

      document.getElementById('hydro-acid-name').textContent = info.acid;
      document.getElementById('hydro-base-name').textContent = info.base;
      document.getElementById('hydro-behavior').textContent = info.behavior;
      document.getElementById('hydro-equation').textContent = info.equation;
      document.getElementById('hydro-net-ion').textContent = info.net;
      document.getElementById('hydro-explanation').textContent = info.explanation;
      document.getElementById('hydro-result-badge').textContent = info.result;
    });
  }

  // ==========================================================================
  // 16. DYNAMIC BUFFER VS WATER SIMULATOR
  // ==========================================================================
  const bufAddAcidBtn = document.getElementById('buf-add-acid');
  const bufAddBaseBtn = document.getElementById('buf-add-base');
  const bufResetBtn = document.getElementById('buf-reset-btn');

  let bufferPh = 4.74;
  let waterPh = 7.00;

  function updateBufferSimUI() {
    const bufBadge = document.getElementById('buffer-ph-badge');
    const waterBadge = document.getElementById('water-ph-badge');
    const waterLiquid = document.getElementById('water-liquid-fill');

    if (bufBadge) bufBadge.textContent = `pH ${bufferPh.toFixed(2)}`;
    if (waterBadge) waterBadge.textContent = `pH ${waterPh.toFixed(2)}`;

    if (waterLiquid) {
      if (waterPh < 4.0) {
        waterLiquid.style.backgroundColor = 'rgba(239, 68, 68, 0.45)';
      } else if (waterPh > 10.0) {
        waterLiquid.style.backgroundColor = 'rgba(59, 130, 246, 0.45)';
      } else {
        waterLiquid.style.backgroundColor = 'rgba(34, 197, 94, 0.25)';
      }
    }
  }

  if (bufAddAcidBtn) {
    bufAddAcidBtn.addEventListener('click', () => {
      bufferPh = Math.max(3.8, bufferPh - 0.08); // buffered resistance
      waterPh = Math.max(1.8, waterPh - 3.2);  // unbuffered rapid plunge
      updateBufferSimUI();
    });
  }

  if (bufAddBaseBtn) {
    bufAddBaseBtn.addEventListener('click', () => {
      bufferPh = Math.min(5.6, bufferPh + 0.08); // buffered resistance
      waterPh = Math.min(12.2, waterPh + 3.2);  // unbuffered rapid surge
      updateBufferSimUI();
    });
  }

  if (bufResetBtn) {
    bufResetBtn.addEventListener('click', () => {
      bufferPh = 4.74;
      waterPh = 7.00;
      updateBufferSimUI();
      showToast('Beakers reset to initial pH.');
    });
  }

  // ==========================================================================
  // 17. HENDERSON-HASSELBALCH BUFFER CALCULATOR
  // ==========================================================================
  const hhPresetSelect = document.getElementById('hh-preset-select');
  const hhPkaInput = document.getElementById('hh-pka-input');
  const hhSaltInput = document.getElementById('hh-salt-input');
  const hhAcidInput = document.getElementById('hh-acid-input');
  const calcHhBtn = document.getElementById('calc-hh-btn');
  const hhStepsBox = document.getElementById('hh-steps-box');
  const hhFinalBadge = document.getElementById('hh-final-badge');

  if (hhPresetSelect && hhPkaInput) {
    hhPresetSelect.addEventListener('change', () => {
      const p = hhPresetSelect.value;
      if (p === 'acetic') hhPkaInput.value = '4.76';
      else if (p === 'formic') hhPkaInput.value = '3.75';
      else if (p === 'carbonic') hhPkaInput.value = '6.10';
      else if (p === 'phosphate') hhPkaInput.value = '7.20';
    });
  }

  if (calcHhBtn) {
    calcHhBtn.addEventListener('click', () => {
      const pka = parseFloat(hhPkaInput?.value || '0');
      const salt = parseFloat(hhSaltInput?.value || '0');
      const acid = parseFloat(hhAcidInput?.value || '0');

      if (salt <= 0 || acid <= 0) {
        showToast('Salt and Acid concentrations must be greater than 0.');
        return;
      }

      const ratio = salt / acid;
      const logRatio = Math.log10(ratio);
      const ph = pka + logRatio;

      if (hhStepsBox) {
        hhStepsBox.innerHTML = `
          <div class="calc-step-item">Formula: pH = pKa + log₁₀([Salt] / [Acid])</div>
          <div class="calc-step-item">Ratio [Salt]/[Acid] = ${salt.toFixed(3)} / ${acid.toFixed(3)} = ${ratio.toFixed(3)}</div>
          <div class="calc-step-item">log₁₀(${ratio.toFixed(3)}) = ${logRatio >= 0 ? '+' : ''}${logRatio.toFixed(3)}</div>
          <div class="calc-step-item">pH = ${pka.toFixed(2)} + (${logRatio.toFixed(3)}) = ${ph.toFixed(2)}</div>
        `;
      }

      if (hhFinalBadge) {
        hhFinalBadge.textContent = `Calculated Buffer pH = ${ph.toFixed(2)}`;
      }
    });
  }

  // ==========================================================================
  // 18. ACID-BASE TITRATION CURVE SIMULATOR
  // ==========================================================================
  const titrTypeSelect = document.getElementById('titration-type');
  const titrAdd1Btn = document.getElementById('titr-add-1ml');
  const titrAdd5Btn = document.getElementById('titr-add-5ml');
  const titrResetBtn = document.getElementById('titr-reset');
  const buretteFill = document.getElementById('burette-fill');
  const flaskFill = document.getElementById('flask-fill');
  const volAddedDisp = document.getElementById('vol-added-disp');
  const flaskPhDisp = document.getElementById('flask-ph-disp');
  const titrIndicatorStatus = document.getElementById('titr-indicator-status');

  let titrVol = 0.0;
  const eqVol = 25.0; // equivalence volume

  function calcTitrationPh(vol, type) {
    if (type === 'SA_SB') {
      if (vol < eqVol) {
        const remainingAcidMoles = (25.0 * 0.1 - vol * 0.1) / (25.0 + vol);
        return Math.max(1.0, -Math.log10(remainingAcidMoles));
      } else if (Math.abs(vol - eqVol) < 0.01) {
        return 7.00;
      } else {
        const excessBaseMoles = (vol * 0.1 - 25.0 * 0.1) / (25.0 + vol);
        const poh = -Math.log10(excessBaseMoles);
        return Math.min(13.0, 14.0 - poh);
      }
    } else if (type === 'WA_SB') {
      if (vol === 0) return 2.87;
      if (vol < eqVol) {
        const ratio = vol / (eqVol - vol);
        return 4.76 + Math.log10(ratio);
      } else if (Math.abs(vol - eqVol) < 0.01) {
        return 8.72; // basic hydrolysis at equivalence point
      } else {
        const excessBaseMoles = (vol * 0.1 - 25.0 * 0.1) / (25.0 + vol);
        const poh = -Math.log10(excessBaseMoles);
        return Math.min(13.0, 14.0 - poh);
      }
    } else {
      // SA_WB
      if (vol < eqVol) {
        const remainingAcidMoles = (25.0 * 0.1 - vol * 0.1) / (25.0 + vol);
        return Math.max(1.0, -Math.log10(remainingAcidMoles));
      } else if (Math.abs(vol - eqVol) < 0.01) {
        return 5.28; // acidic hydrolysis at equivalence point
      } else {
        const ratio = (vol - eqVol) / eqVol;
        return 9.25 + Math.log10(ratio || 0.1);
      }
    }
  }

  function updateTitrationUI() {
    const type = titrTypeSelect?.value || 'SA_SB';
    const ph = calcTitrationPh(titrVol, type);

    if (volAddedDisp) volAddedDisp.textContent = `${titrVol.toFixed(1)} mL`;
    if (flaskPhDisp) flaskPhDisp.textContent = ph.toFixed(2);

    if (buretteFill) {
      const remainingHeight = Math.max(10, 80 - (titrVol / 50.0) * 70);
      buretteFill.style.height = `${remainingHeight}%`;
    }

    if (flaskFill) {
      if (ph < 8.3) {
        flaskFill.style.backgroundColor = 'rgba(241, 245, 249, 0.9)';
        if (titrIndicatorStatus) titrIndicatorStatus.innerHTML = 'Phenolphthalein: <strong style="color: var(--text-muted);">Colorless</strong> (Acidic / Neutral Flask)';
      } else {
        flaskFill.style.backgroundColor = 'rgba(244, 63, 94, 0.55)';
        if (titrIndicatorStatus) titrIndicatorStatus.innerHTML = 'Phenolphthalein: <strong style="color: #f43f5e;">Vivid Pink / Magenta</strong> (Equivalence Passed / Alkaline)';
      }
    }
  }

  if (titrAdd1Btn) {
    titrAdd1Btn.addEventListener('click', () => {
      titrVol = Math.min(50.0, titrVol + 1.0);
      updateTitrationUI();
    });
  }

  if (titrAdd5Btn) {
    titrAdd5Btn.addEventListener('click', () => {
      titrVol = Math.min(50.0, titrVol + 5.0);
      updateTitrationUI();
    });
  }

  if (titrResetBtn) {
    titrResetBtn.addEventListener('click', () => {
      titrVol = 0.0;
      updateTitrationUI();
      showToast('Titration apparatus reset.');
    });
  }

  if (titrTypeSelect) {
    titrTypeSelect.addEventListener('change', () => {
      titrVol = 0.0;
      updateTitrationUI();
    });
  }

  updateTitrationUI();

  // ==========================================================================
  // 19. NEUTRALIZATION STOICHIOMETRY CALCULATOR
  // ==========================================================================
  const calcNeutBtn = document.getElementById('calc-neut-btn');
  if (calcNeutBtn) {
    calcNeutBtn.addEventListener('click', () => {
      const m1 = parseFloat(document.getElementById('neut-m1')?.value || '0');
      const v1 = parseFloat(document.getElementById('neut-v1')?.value || '0');
      const n1 = parseFloat(document.getElementById('neut-n1')?.value || '1');
      const m2 = parseFloat(document.getElementById('neut-m2')?.value || '0');
      const n2 = parseFloat(document.getElementById('neut-n2')?.value || '1');

      if (m1 <= 0 || v1 <= 0 || m2 <= 0 || n1 <= 0 || n2 <= 0) {
        showToast('Please enter positive values for all fields.');
        return;
      }

      // n1 * M1 * V1 = n2 * M2 * V2  =>  V2 = (n1 * M1 * V1) / (n2 * M2)
      const v2 = (n1 * m1 * v1) / (n2 * m2);

      const stepsBox = document.getElementById('neut-steps-box');
      const resultBadge = document.getElementById('neut-final-badge');

      if (stepsBox) {
        stepsBox.innerHTML = `
          <div class="calc-step-item">Formula: (n₁ × M₁ × V₁) = (n₂ × M₂ × V₂)</div>
          <div class="calc-step-item">(${n1} × ${m1.toFixed(2)} M × ${v1.toFixed(1)} mL) = (${n2} × ${m2.toFixed(2)} M × V₂)</div>
          <div class="calc-step-item">V₂ = (${(n1 * m1 * v1).toFixed(2)}) / (${(n2 * m2).toFixed(2)}) = ${v2.toFixed(2)} mL</div>
        `;
      }

      if (resultBadge) {
        resultBadge.textContent = `Required Base Volume (V₂) = ${v2.toFixed(2)} mL`;
      }
    });
  }

  // ==========================================================================
  // 20. 30+ HIGH-YIELD FACT CARDS
  // ==========================================================================
  const highYieldData = [
    { badge: 'Theories', term: 'Arrhenius Acid', def: 'Produces H⁺/H₃O⁺ in aqueous solution (e.g. HCl in water).' },
    { badge: 'Theories', term: 'Arrhenius Base', def: 'Produces OH⁻ in aqueous solution (e.g. NaOH in water).' },
    { badge: 'Theories', term: 'Brønsted Acid', def: 'Proton (H⁺) donor in any reaction medium.' },
    { badge: 'Theories', term: 'Brønsted Base', def: 'Proton (H⁺) acceptor in any reaction medium.' },
    { badge: 'Theories', term: 'Lewis Acid', def: 'Electron-pair acceptor (electrophile, e.g. BF₃, AlCl₃, H⁺).' },
    { badge: 'Theories', term: 'Lewis Base', def: 'Electron-pair donor (nucleophile, e.g. NH₃, H₂O, OH⁻).' },
    { badge: 'Conjugates', term: 'Conjugate Base Rule', def: 'Conjugate base = Acid minus H⁺ (e.g. HSO₄⁻ → SO₄²⁻).' },
    { badge: 'Conjugates', term: 'Conjugate Acid Rule', def: 'Conjugate acid = Base plus H⁺ (e.g. NH₃ → NH₄⁺).' },
    { badge: 'Conjugates', term: 'Amphiprotic Species', def: 'Can act as both proton donor and acceptor (H₂O, HCO₃⁻, H₂PO₄⁻).' },
    { badge: 'Strength', term: 'Strong Acid', def: 'Ionizes ~100% in water (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄).' },
    { badge: 'Strength', term: 'Weak Acid', def: 'Ionizes only partially in equilibrium (CH₃COOH, HF, HCN).' },
    { badge: 'Strength', term: 'Ka Magnitude', def: 'Larger Ka = stronger acid = lower pKa (pKa = −log Ka).' },
    { badge: 'Strength', term: 'Kb Magnitude', def: 'Larger Kb = stronger base = lower pKb (pKb = −log Kb).' },
    { badge: 'Equilibrium', term: 'Water Kw at 25°C', def: 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (pKw = 14.00).' },
    { badge: 'Equilibrium', term: 'Kw vs Temperature', def: 'Water ionization is endothermic; Kw increases as temperature rises.' },
    { badge: 'Equilibrium', term: 'Pure Water at 100°C', def: 'pH ≈ 6.14 at 100°C, yet remains 100% neutral because [H⁺] = [OH⁻].' },
    { badge: 'Calculations', term: 'pH Definition', def: 'pH = −log₁₀[H⁺]. Logarithmic scale (1 pH unit = 10× [H⁺] shift).' },
    { badge: 'Calculations', term: 'pOH Definition', def: 'pOH = −log₁₀[OH⁻]; pH + pOH = 14 at 25°C.' },
    { badge: 'Calculations', term: 'Ka × Kb Relation', def: 'Ka × Kb = Kw = 10⁻¹⁴ for any conjugate acid-base pair at 25°C.' },
    { badge: 'Calculations', term: 'pKa + pKb Relation', def: 'pKa + pKb = 14.00 for conjugate partners at 25°C.' },
    { badge: 'Salts', term: 'Normal Salt', def: 'All replaceable acidic H replaced by metal cation (NaCl, KNO₃).' },
    { badge: 'Salts', term: 'Acid Salt', def: 'Contains replaceable H from polyprotic acid (NaHCO₃, NaHSO₄).' },
    { badge: 'Salts', term: 'Basic Salt', def: 'Contains unneutralized OH⁻ group (Bi(OH)₂Cl, Pb(OH)NO₃).' },
    { badge: 'Hydrolysis', term: 'Strong Acid + Strong Base', def: 'Spectator ions only → Solution is neutral (pH = 7.00, e.g. NaCl).' },
    { badge: 'Hydrolysis', term: 'Strong Acid + Weak Base', def: 'Cation hydrolyzes → Solution is acidic (pH < 7, e.g. NH₄Cl).' },
    { badge: 'Hydrolysis', term: 'Weak Acid + Strong Base', def: 'Anion hydrolyzes → Solution is basic (pH > 7, e.g. CH₃COONa).' },
    { badge: 'Buffers', term: 'Acidic Buffer', def: 'Weak acid + its conjugate salt (CH₃COOH + CH₃COONa).' },
    { badge: 'Buffers', term: 'Basic Buffer', def: 'Weak base + its conjugate salt (NH₃ + NH₄Cl).' },
    { badge: 'Buffers', term: 'Henderson Equation', def: 'pH = pKa + log([Conjugate Base] / [Weak Acid]).' },
    { badge: 'Indicators', term: 'Phenolphthalein', def: 'Colorless in acid; vivid pink in base (transition pH 8.3–10.0).' },
    { badge: 'Indicators', term: 'Methyl Orange', def: 'Red in acid; yellow in base (transition pH 3.1–4.4).' },
    { badge: 'Titration', term: 'Equivalence vs Endpoint', def: 'Equivalence = stoichiometric equality; Endpoint = indicator color change.' }
  ];

  const highYieldGrid = document.getElementById('high-yield-cards-grid');
  if (highYieldGrid) {
    highYieldGrid.innerHTML = highYieldData.map(item => `
      <div class="hy-card">
        <div>
          <span class="hy-badge">${item.badge}</span>
          <div class="hy-term">${item.term}</div>
        </div>
        <div class="hy-def">${item.def}</div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // 21. 20 3D FLIP FLASHCARDS DECK
  // ==========================================================================
  const flashcardDeck = [
    { category: 'Theories', q: 'What is a Brønsted–Lowry acid?', a: 'A chemical substance that donates a proton (H⁺) to another species in a reaction.' },
    { category: 'Theories', q: 'What is a Lewis base?', a: 'An electron-pair donor that can donate a non-bonding lone pair to form a coordinate covalent bond.' },
    { category: 'Theories', q: 'Why is Arrhenius theory limited?', a: 'It is strictly limited to aqueous media and fails to explain the basicity of NH₃ or gas-phase reactions.' },
    { category: 'Conjugates', q: 'What is the conjugate base of HSO₄⁻?', a: 'SO₄²⁻ (Sulfate ion). Obtained by removing exactly one H⁺ from HSO₄⁻.' },
    { category: 'Conjugates', q: 'What is an amphiprotic substance?', a: 'A substance capable of acting as both a proton donor (acid) and a proton acceptor (base), e.g., H₂O and HCO₃⁻.' },
    { category: 'Strength', q: 'What is the difference between strong and concentrated acid?', a: 'Strength describes the degree of ionization (100% vs partial), while concentration describes molarity (moles solute/L).' },
    { category: 'Equilibrium', q: 'What is the mathematical definition of pH?', a: 'pH = −log₁₀[H⁺] (or −log₁₀[H₃O⁺]). It is a base-10 logarithmic scale.' },
    { category: 'Equilibrium', q: 'What is the value of Kw at 25°C?', a: 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol²·dm⁻⁶ (or M²).' },
    { category: 'Equilibrium', q: 'Why does Kw increase when water is heated?', a: 'Because the auto-ionization of water is an endothermic process (ΔH > 0), shifting right at higher temperatures.' },
    { category: 'Strength', q: 'What does a lower pKa value signify?', a: 'A lower pKa indicates a larger Ka, which means a stronger acid with higher degree of ionization.' },
    { category: 'Conjugates', q: 'State the relationship between Ka, Kb, and Kw for conjugate pairs.', a: 'Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 25°C, and pKa + pKb = 14.00.' },
    { category: 'Salts', q: 'What type of salt is NaHCO₃?', a: 'An acid salt, because it contains a replaceable hydrogen atom from the dibasic parent acid H₂CO₃.' },
    { category: 'Hydrolysis', q: 'Why does an aqueous solution of NH₄Cl turn blue litmus red?', a: 'Because NH₄⁺ hydrolyzes in water to release extra H₃O⁺ ions (cation hydrolysis), making the solution acidic.' },
    { category: 'Hydrolysis', q: 'What is the aqueous pH of CH₃COONa solution at 25°C?', a: 'pH > 7 (Basic), because acetate anion (CH₃COO⁻) abstracts a proton from water, releasing OH⁻ ions.' },
    { category: 'Buffers', q: 'What constitutes an acidic buffer?', a: 'A mixture of a weak acid and its salt with a strong base (e.g. CH₃COOH + CH₃COONa).' },
    { category: 'Buffers', q: 'State the Henderson–Hasselbalch equation for an acidic buffer.', a: 'pH = pKa + log₁₀([Conjugate Base / Salt] / [Weak Acid]).' },
    { category: 'Buffers', q: 'Under what condition is a buffer solution at maximum capacity?', a: 'When [Salt] = [Acid], which makes log(1) = 0, so pH = pKa. Optimal buffer range is pKa ± 1.' },
    { category: 'Indicators', q: 'What is the color transition of phenolphthalein?', a: 'Colorless in acidic and neutral solutions; turns vivid pink/red at pH 8.3–10.0 in basic media.' },
    { category: 'Titration', q: 'What is the difference between equivalence point and endpoint?', a: 'Equivalence point is the theoretical stoichiometric equality (moles H⁺ = moles OH⁻); endpoint is the observed color change.' },
    { category: 'Neutralization', q: 'What is the net ionic equation for strong acid-strong base neutralization?', a: 'H⁺(aq) + OH⁻(aq) → H₂O(l), with standard enthalpy of neutralization ΔH ≈ −57.3 kJ/mol.' }
  ];

  const fcTarget = document.getElementById('flashcard-click-target');
  const fcInner = document.getElementById('flashcard-inner-card');
  const fcCategoryDisp = document.getElementById('flashcard-category-disp');
  const fcQText = document.getElementById('flashcard-q-text');
  const fcAText = document.getElementById('flashcard-a-text');
  const fcPrevBtn = document.getElementById('fc-prev-btn');
  const fcNextBtn = document.getElementById('fc-next-btn');
  const fcShuffleBtn = document.getElementById('fc-shuffle-btn');
  const fcMasterBtn = document.getElementById('fc-master-btn');
  const fcCounterDisp = document.getElementById('fc-counter-disp');
  const fcMasteryScore = document.getElementById('fc-mastery-score');

  function renderFlashcard(index) {
    if (fcInner) fcInner.classList.remove('is-flipped');
    const card = flashcardDeck[index];
    if (!card) return;

    if (fcCategoryDisp) fcCategoryDisp.textContent = `MDCAT Topic: ${card.category}`;
    if (fcQText) fcQText.textContent = card.q;
    if (fcAText) fcAText.textContent = card.a;
    if (fcCounterDisp) fcCounterDisp.textContent = `Card ${index + 1} / ${flashcardDeck.length}`;

    if (fcMasterBtn) {
      if (state.masteredFlashcards.includes(index)) {
        fcMasterBtn.textContent = '✓ Mastered';
        fcMasterBtn.classList.replace('btn-secondary', 'btn-primary');
      } else {
        fcMasterBtn.textContent = 'Mark Mastered';
        fcMasterBtn.classList.replace('btn-primary', 'btn-secondary');
      }
    }

    if (fcMasteryScore) {
      fcMasteryScore.textContent = `${state.masteredFlashcards.length} / ${flashcardDeck.length} Mastered`;
    }
  }

  if (fcTarget && fcInner) {
    fcTarget.addEventListener('click', () => {
      fcInner.classList.toggle('is-flipped');
    });
  }

  if (fcNextBtn) {
    fcNextBtn.addEventListener('click', () => {
      state.currentFlashcardIndex = (state.currentFlashcardIndex + 1) % flashcardDeck.length;
      renderFlashcard(state.currentFlashcardIndex);
    });
  }

  if (fcPrevBtn) {
    fcPrevBtn.addEventListener('click', () => {
      state.currentFlashcardIndex = (state.currentFlashcardIndex - 1 + flashcardDeck.length) % flashcardDeck.length;
      renderFlashcard(state.currentFlashcardIndex);
    });
  }

  if (fcShuffleBtn) {
    fcShuffleBtn.addEventListener('click', () => {
      state.currentFlashcardIndex = Math.floor(Math.random() * flashcardDeck.length);
      renderFlashcard(state.currentFlashcardIndex);
      showToast('Deck shuffled!');
    });
  }

  if (fcMasterBtn) {
    fcMasterBtn.addEventListener('click', () => {
      const idx = state.currentFlashcardIndex;
      if (state.masteredFlashcards.includes(idx)) {
        state.masteredFlashcards = state.masteredFlashcards.filter(i => i !== idx);
      } else {
        state.masteredFlashcards.push(idx);
      }
      localStorage.setItem('mdcat_abs_fc_mastered', JSON.stringify(state.masteredFlashcards));
      renderFlashcard(idx);
    });
  }

  renderFlashcard(0);

  // ==========================================================================
  // 22. 20 ORIGINAL MDCAT PRACTICE MCQS ENGINE
  // ==========================================================================
  const quizQuestions = [
    {
      id: 1,
      q: 'According to the Brønsted–Lowry concept, a base is defined as a:',
      options: ['Proton donor', 'Proton acceptor', 'Electron-pair donor', 'Hydroxide ion producer'],
      correct: 1,
      exp: 'Brønsted–Lowry defines an acid as a proton (H⁺) donor and a base as a proton (H⁺) acceptor.'
    },
    {
      id: 2,
      q: 'Which of the following species acts as a Lewis acid in chemical reactions?',
      options: ['NH₃', 'H₂O', 'BF₃', 'OH⁻'],
      correct: 2,
      exp: 'Boron in BF₃ has an incomplete octet (6 valence electrons) with an empty 2p orbital, making it an electron-pair acceptor (Lewis acid).'
    },
    {
      id: 3,
      q: 'What is the conjugate base of the bisulfate ion (HSO₄⁻)?',
      options: ['H₂SO₄', 'SO₄²⁻', 'HSO₃⁻', 'SO₃²⁻'],
      correct: 1,
      exp: 'To find a conjugate base, remove one proton (H⁺): HSO₄⁻ − H⁺ = SO₄²⁻ (Sulfate ion).'
    },
    {
      id: 4,
      q: 'Which of the following substances is amphiprotic in aqueous solution?',
      options: ['HCl', 'NaOH', 'HCO₃⁻', 'CH₄'],
      correct: 2,
      exp: 'HCO₃⁻ can donate a proton to form CO₃²⁻ (acting as an acid) or accept a proton to form H₂CO₃ (acting as a base).'
    },
    {
      id: 5,
      q: 'A 0.001 M solution of HCl is prepared. What is its pH at 25°C?',
      options: ['1.0', '2.0', '3.0', '11.0'],
      correct: 2,
      exp: 'HCl is a strong monoprotic acid (100% ionized). [H⁺] = 0.001 M = 1.0 × 10⁻³ M. pH = −log₁₀(10⁻³) = 3.0.'
    },
    {
      id: 6,
      q: 'If the hydroxide ion concentration [OH⁻] of a solution is 1.0 × 10⁻⁴ M, what is its pH at 25°C?',
      options: ['4.0', '7.0', '10.0', '14.0'],
      correct: 2,
      exp: 'pOH = −log₁₀(10⁻⁴) = 4.0. At 25°C, pH = 14.0 − pOH = 14.0 − 4.0 = 10.0 (Basic solution).'
    },
    {
      id: 7,
      q: 'When pure water is heated from 25°C to 60°C, which of the following statements is TRUE?',
      options: [
        'Kw decreases and water becomes basic',
        'Kw increases, pH decreases, but water remains neutral',
        'pH remains exactly 7.00',
        'Kw remains constant at 1.0 × 10⁻¹⁴'
      ],
      correct: 1,
      exp: 'Water auto-ionization is endothermic. Heating shifts equilibrium forward, increasing Kw and [H⁺]. pH drops below 7, but because [H⁺] strictly equals [OH⁻], water remains neutral.'
    },
    {
      id: 8,
      q: 'For a weak acid HA with Ka = 1.0 × 10⁻⁵, what is its pKa value?',
      options: ['1.0', '5.0', '9.0', '14.0'],
      correct: 1,
      exp: 'pKa = −log₁₀(Ka) = −log₁₀(1.0 × 10⁻⁵) = 5.0.'
    },
    {
      id: 9,
      q: 'For a conjugate acid-base pair at 25°C, the product of Ka and Kb equals:',
      options: ['Zero', '1.0 × 10⁻⁷', '1.0 × 10⁻¹⁴', '14.0'],
      correct: 2,
      exp: 'Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 25°C for any conjugate acid-base pair.'
    },
    {
      id: 10,
      q: 'Which of the following salts produces an acidic aqueous solution upon hydrolysis?',
      options: ['NaCl', 'CH₃COONa', 'NH₄Cl', 'K₂SO₄'],
      correct: 2,
      exp: 'NH₄Cl is formed from a strong acid (HCl) and a weak base (NH₃). The ammonium ion (NH₄⁺) hydrolyzes to release H₃O⁺, making the solution acidic (pH < 7).'
    },
    {
      id: 11,
      q: 'Which pair of substances can be used to prepare an acidic buffer solution?',
      options: [
        'HCl + NaCl',
        'CH₃COOH + CH₃COONa',
        'NaOH + NaCl',
        'NH₃ + NH₄Cl'
      ],
      correct: 1,
      exp: 'An acidic buffer requires a weak acid and its salt with a strong base (e.g. Acetic acid + Sodium acetate).'
    },
    {
      id: 12,
      q: 'In the Henderson–Hasselbalch equation pH = pKa + log([Salt]/[Acid]), what is the pH when [Salt] = [Acid]?',
      options: ['pH = 0', 'pH = 7', 'pH = pKa', 'pH = 14'],
      correct: 2,
      exp: 'When [Salt] = [Acid], the ratio is 1. Since log₁₀(1) = 0, the equation simplifies to pH = pKa (maximum buffer capacity).'
    },
    {
      id: 13,
      q: 'What is the color of phenolphthalein indicator in 0.1 M NaOH solution?',
      options: ['Colorless', 'Yellow', 'Vivid Pink / Red', 'Blue'],
      correct: 2,
      exp: 'Phenolphthalein is colorless in acidic and neutral solutions (pH < 8.3) and turns vivid pink/magenta in alkaline solutions (pH 8.3–10.0).'
    },
    {
      id: 14,
      q: 'What is the equivalence point pH for the titration of acetic acid (CH₃COOH) with sodium hydroxide (NaOH)?',
      options: ['pH < 7', 'pH = 7.00', 'pH > 7', 'pH = 0'],
      correct: 2,
      exp: 'At equivalence point, the salt formed is CH₃COONa. Acetate ion undergoes anion hydrolysis releasing OH⁻, resulting in a basic equivalence pH (> 7, typically ~8.7).'
    },
    {
      id: 15,
      q: 'What volume of 0.20 M NaOH is required to completely neutralize 25.0 mL of 0.10 M H₂SO₄?',
      options: ['12.5 mL', '25.0 mL', '50.0 mL', '100.0 mL'],
      correct: 1,
      exp: 'H₂SO₄ is diprotic (n₁ = 2) and NaOH is monohydroxy (n₂ = 1). Equation: n₁M₁V₁ = n₂M₂V₂  =>  (2 × 0.10 × 25.0) = (1 × 0.20 × V₂)  =>  5.0 = 0.20 V₂  =>  V₂ = 25.0 mL.'
    },
    {
      id: 16,
      q: 'Which of the following is classified as an ACID SALT?',
      options: ['NaCl', 'NaHCO₃', 'Bi(OH)₂Cl', 'K₂SO₄'],
      correct: 1,
      exp: 'NaHCO₃ (Sodium bicarbonate) contains replaceable hydrogen from the partial neutralization of carbonic acid (H₂CO₃), making it an acid salt.'
    },
    {
      id: 17,
      q: 'If an acid has a very large Ka value (e.g. Ka > 10³), its conjugate base must be:',
      options: ['Extremely strong', 'Extremely weak (negligible basicity)', 'Amphoteric', 'A buffer'],
      correct: 1,
      exp: 'Conjugate reciprocal law: The stronger an acid, the weaker its conjugate base. Very strong acids like HCl produce spectator conjugate bases (Cl⁻) of negligible basicity.'
    },
    {
      id: 18,
      q: 'Which indicator is most suitable for titrating a strong acid (HCl) with a weak base (NH₃)?',
      options: ['Phenolphthalein (pH 8.3–10)', 'Methyl Orange (pH 3.1–4.4)', 'Universal Indicator', 'Litmus paper'],
      correct: 1,
      exp: 'The equivalence point for Strong Acid + Weak Base lies in the acidic range (pH ~ 5.3). Methyl orange transitions at pH 3.1–4.4, coinciding with the steep curve inflection.'
    },
    {
      id: 19,
      q: 'A solution has [H⁺] = 2.0 × 10⁻⁵ M. Given log₁₀(2) = 0.301, what is its pH?',
      options: ['4.699', '5.301', '5.000', '9.301'],
      correct: 0,
      exp: 'pH = −log₁₀(2.0 × 10⁻⁵) = 5 − log₁₀(2) = 5 − 0.301 = 4.699.'
    },
    {
      id: 20,
      q: 'What is the standard heat of neutralization (ΔH) for the reaction of 1 mole of a strong monoprotic acid with 1 mole of a strong base in dilute aqueous solution?',
      options: ['−13.7 kJ/mol', '−57.3 kJ/mol', '+57.3 kJ/mol', '−100 kJ/mol'],
      correct: 1,
      exp: 'For any strong acid and strong base, the essential net reaction is H⁺(aq) + OH⁻(aq) → H₂O(l), which consistently releases −57.3 kJ/mol (or −13.7 kcal/mol) of heat.'
    }
  ];

  const quizListContainer = document.getElementById('quiz-questions-list');
  const quizLiveScore = document.getElementById('quiz-live-score');
  const quizSummaryCard = document.getElementById('quiz-summary-card');
  const quizRetryBtn = document.getElementById('quiz-retry-btn');

  function renderQuiz() {
    if (!quizListContainer) return;
    quizListContainer.innerHTML = '';
    state.quizScore = 0;
    state.quizAnsweredCount = 0;
    state.userAnswers = {};

    if (quizLiveScore) quizLiveScore.textContent = 'Score: 0 / 20 (0%)';
    if (quizSummaryCard) quizSummaryCard.style.display = 'none';

    quizQuestions.forEach((qObj, index) => {
      const card = document.createElement('div');
      card.className = 'question-card';
      card.id = `mcq-card-${qObj.id}`;

      card.innerHTML = `
        <div class="question-text">${index + 1}. ${qObj.q}</div>
        <div class="options-grid">
          ${qObj.options.map((opt, optIdx) => `
            <button class="option-btn" data-qid="${qObj.id}" data-oidx="${optIdx}">
              <span class="option-prefix">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="explanation-box" id="exp-${qObj.id}">
          <strong>💡 Conceptual Explanation:</strong> ${qObj.exp}
        </div>
      `;

      quizListContainer.appendChild(card);
    });
  }

  if (quizListContainer) {
    quizListContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.option-btn');
      if (!btn) return;
      const qId = parseInt(btn.getAttribute('data-qid'));
      const chosenIdx = parseInt(btn.getAttribute('data-oidx'));

      if (state.userAnswers[qId] !== undefined) return; // Prevent double scoring

      state.userAnswers[qId] = chosenIdx;
      state.quizAnsweredCount++;

      const qObj = quizQuestions.find(q => q.id === qId);
      const card = document.getElementById(`mcq-card-${qId}`);
      const buttons = card.querySelectorAll('.option-btn');
      const expBox = document.getElementById(`exp-${qId}`);

      buttons.forEach((b, bIdx) => {
        b.disabled = true;
        if (bIdx === qObj.correct) {
          b.classList.add('correct');
        }
      });

      if (chosenIdx === qObj.correct) {
        state.quizScore++;
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }

      if (expBox) expBox.style.display = 'block';

      const percent = Math.round((state.quizScore / state.quizAnsweredCount) * 100);
      if (quizLiveScore) {
        quizLiveScore.textContent = `Score: ${state.quizScore} / ${quizQuestions.length} (${percent}%)`;
      }

      if (state.quizAnsweredCount === quizQuestions.length) {
        showQuizSummary();
      }
    });
  }

  function showQuizSummary() {
    if (!quizSummaryCard) return;
    const percent = Math.round((state.quizScore / quizQuestions.length) * 100);
    const summaryStats = document.getElementById('quiz-summary-stats');
    const summaryMsg = document.getElementById('quiz-summary-msg');
    const badgeIcon = document.getElementById('quiz-badge-icon');

    if (summaryStats) {
      summaryStats.textContent = `You scored ${state.quizScore} out of ${quizQuestions.length} (${percent}%)`;
    }

    if (summaryMsg && badgeIcon) {
      if (percent >= 85) {
        badgeIcon.textContent = '🏆';
        summaryMsg.textContent = 'Exceptional performance! You have mastered the equilibrium, pH, buffer, and salt concepts required for top MDCAT chemistry scores.';
      } else if (percent >= 65) {
        badgeIcon.textContent = '🌟';
        summaryMsg.textContent = 'Good work! Review the questions you missed using the flashcards and high-yield formula sheet to reach 90%+.';
      } else {
        badgeIcon.textContent = '📖';
        summaryMsg.textContent = 'Keep practicing! Review the theory sections, recalculate worked examples, and retake the quiz to build speed and accuracy.';
      }
    }

    quizSummaryCard.style.display = 'block';
    quizSummaryCard.scrollIntoView({ behavior: 'smooth' });
  }

  if (quizRetryBtn) {
    quizRetryBtn.addEventListener('click', () => {
      renderQuiz();
      showToast('Quiz reset. Good luck!');
    });
  }

  renderQuiz();

  console.log('✅ Acids, Bases & Salts MDCAT module loaded successfully with all interactive tools active.');
});
