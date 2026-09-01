/**
 * ==========================================================================
 * THERMODYNAMICS LAB - MDCAT PHYSICS INTERACTIVE ENGINE
 * Pure Vanilla JavaScript (Zero External Libraries)
 * ==========================================================================
 */

(function() {
  'use strict';

  /* ==========================================================================
     1. GLOBAL STATE & PERSISTENCE MANAGEMENT
     ========================================================================== */
  const STATE = {
    theme: localStorage.getItem('thermo_theme') || 'dark',
    completedTopics: JSON.parse(localStorage.getItem('thermo_completed_topics') || '[]'),
    bookmarkedTopics: JSON.parse(localStorage.getItem('thermo_bookmarked_topics') || '[]'),
    quizScore: parseInt(localStorage.getItem('thermo_quiz_score') || '0', 10),
    quizHighScore: parseInt(localStorage.getItem('thermo_quiz_high_score') || '0', 10),
    masteredFormulas: JSON.parse(localStorage.getItem('thermo_mastered_formulas') || '[]'),
    activeAnimations: {}
  };

  const TOTAL_TOPICS = 18;
  const TOTAL_FORMULAS = 11;

  function saveState() {
    localStorage.setItem('thermo_theme', STATE.theme);
    localStorage.setItem('thermo_completed_topics', JSON.stringify(STATE.completedTopics));
    localStorage.setItem('thermo_bookmarked_topics', JSON.stringify(STATE.bookmarkedTopics));
    localStorage.setItem('thermo_quiz_high_score', STATE.quizHighScore.toString());
    localStorage.setItem('thermo_mastered_formulas', JSON.stringify(STATE.masteredFormulas));
    updateMasteryDashboard();
  }

  function showToast(message, icon = '⚡') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  /* ==========================================================================
     2. THEME TOGGLE (DARK / LIGHT)
     ========================================================================== */
  function initTheme() {
    document.documentElement.setAttribute('data-theme', STATE.theme);
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeTag = document.getElementById('currentThemeTag');
    
    if (themeBtn) {
      themeBtn.textContent = STATE.theme === 'dark' ? '🌙' : '☀️';
      themeBtn.addEventListener('click', () => {
        STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', STATE.theme);
        themeBtn.textContent = STATE.theme === 'dark' ? '🌙' : '☀️';
        if (themeTag) themeTag.textContent = STATE.theme === 'dark' ? 'Dark' : 'Light';
        saveState();
        showToast(`Theme switched to ${STATE.theme.toUpperCase()}`, STATE.theme === 'dark' ? '🌙' : '☀️');
      });
    }
    if (themeTag) themeTag.textContent = STATE.theme === 'dark' ? 'Dark' : 'Light';
  }

  /* ==========================================================================
     3. TOPIC COMPLETION & MASTERY PROGRESS
     ========================================================================== */
  function updateMasteryDashboard() {
    const completedCount = STATE.completedTopics.length;
    const percent = Math.min(100, Math.round((completedCount / TOTAL_TOPICS) * 100));

    const masteryPercentEl = document.getElementById('overallMasteryPercent');
    const masteryBarEl = document.getElementById('overallMasteryBar');
    const completedCountEl = document.getElementById('topicsCompletedCount');
    const highScoreEl = document.getElementById('quizHighScore');
    const formulasCountEl = document.getElementById('formulasMasteredCount');

    if (masteryPercentEl) masteryPercentEl.textContent = `${percent}%`;
    if (masteryBarEl) masteryBarEl.style.width = `${percent}%`;
    if (completedCountEl) completedCountEl.textContent = `${completedCount} / ${TOTAL_TOPICS}`;
    if (highScoreEl) highScoreEl.textContent = `${STATE.quizHighScore} / 25`;
    if (formulasCountEl) formulasCountEl.textContent = `${STATE.masteredFormulas.length} / ${TOTAL_FORMULAS}`;

    // Update buttons across page
    document.querySelectorAll('[data-action="toggle-complete"]').forEach(btn => {
      const topic = btn.getAttribute('data-target');
      if (STATE.completedTopics.includes(topic)) {
        btn.classList.add('completed');
        btn.textContent = '✓ Completed';
      } else {
        btn.classList.remove('completed');
        btn.textContent = '✓ Mark Completed';
      }
    });

    document.querySelectorAll('[data-action="toggle-bookmark"]').forEach(btn => {
      const topic = btn.getAttribute('data-target');
      if (STATE.bookmarkedTopics.includes(topic)) {
        btn.classList.add('bookmarked');
        btn.textContent = '🔖 Bookmarked';
      } else {
        btn.classList.remove('bookmarked');
        btn.textContent = '🔖 Bookmark';
      }
    });
  }

  function initTopicActionButtons() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.getAttribute('data-action');
      const topicId = target.getAttribute('data-target');

      if (action === 'toggle-complete') {
        const idx = STATE.completedTopics.indexOf(topicId);
        if (idx === -1) {
          STATE.completedTopics.push(topicId);
          showToast(`Marked "${topicId}" as Completed!`, '🎉');
        } else {
          STATE.completedTopics.splice(idx, 1);
          showToast(`Unmarked "${topicId}"`, 'ℹ️');
        }
        saveState();
      } else if (action === 'toggle-bookmark') {
        const idx = STATE.bookmarkedTopics.indexOf(topicId);
        if (idx === -1) {
          STATE.bookmarkedTopics.push(topicId);
          showToast(`Topic "${topicId}" bookmarked!`, '🔖');
        } else {
          STATE.bookmarkedTopics.splice(idx, 1);
          showToast(`Bookmark removed for "${topicId}"`, 'ℹ️');
        }
        saveState();
      }
    });
  }

  /* ==========================================================================
     4. GLOBAL SEARCH SYSTEM
     ========================================================================== */
  const SEARCH_DATABASE = [
    { title: "Thermodynamic Systems", desc: "Open, Closed, and Isolated systems comparison", sectionId: "section-basics", tags: ["systems", "boundary", "universe"] },
    { title: "Temperature & Scales", desc: "Kinetic interpretation, Celsius to Kelvin conversions", sectionId: "section-temperature", tags: ["celsius", "kelvin", "fahrenheit", "scale"] },
    { title: "Heat & Conduction", desc: "Energy transfer due to temperature gradient and equilibrium", sectionId: "section-heat", tags: ["heat", "joules", "transfer", "gradient"] },
    { title: "Specific Heat Capacity (Q = mcΔT)", desc: "Heat capacity formula, water's high c, calculation tool", sectionId: "section-specific-heat", tags: ["specific heat", "q=mcdeltat", "capacity", "water"] },
    { title: "Latent Heat (Q = mL)", desc: "Phase change constants, Fusion, Vaporization, Delta T = 0", sectionId: "section-latent-heat", tags: ["latent heat", "phase change", "melting", "boiling"] },
    { title: "Zeroth Law of Thermodynamics", desc: "Thermal equilibrium, basis of temperature measurement", sectionId: "section-zeroth-law", tags: ["zeroth law", "equilibrium", "thermometer"] },
    { title: "First Law of Thermodynamics (ΔU = Q - W)", desc: "Conservation of energy, sign conventions, 3-way calculator", sectionId: "section-first-law", tags: ["first law", "conservation", "delta u", "work"] },
    { title: "Internal Energy (U)", desc: "Dependence on temperature, molecular kinetic velocity", sectionId: "section-internal-energy", tags: ["internal energy", "kinetic energy", "velocity"] },
    { title: "Work Done by Gas (W = PΔV)", desc: "Piston cylinder work, area under P-V curve", sectionId: "section-work-done", tags: ["work", "expansion", "compression", "pdelta v"] },
    { title: "P–V Diagrams & Processes", desc: "Multi-curve graph analyzer: Isothermal, Adiabatic, Isobaric, Isochoric", sectionId: "section-pv-diagrams", tags: ["pv diagram", "curves", "processes"] },
    { title: "Isothermal Process (T = const)", desc: "PV = const, Delta U = 0, Q = W, Boyle's law", sectionId: "section-processes", tags: ["isothermal", "constant temperature"] },
    { title: "Adiabatic Process (Q = 0)", desc: "PV^gamma = const, Delta U = -W, rapid expansion cooling", sectionId: "section-processes", tags: ["adiabatic", "poisson", "gamma", "insulation"] },
    { title: "Isobaric Process (P = const)", desc: "Charles's law, W = P Delta V, heat at constant pressure", sectionId: "section-processes", tags: ["isobaric", "constant pressure", "charles"] },
    { title: "Isochoric Process (V = const)", desc: "Delta V = 0, Work = 0, Delta U = Q, Gay-Lussac law", sectionId: "section-processes", tags: ["isochoric", "isovolumetric", "work is zero"] },
    { title: "Cyclic Process", desc: "Enclosed area is net work, Delta U_cycle = 0, clockwise vs counter", sectionId: "section-cyclic", tags: ["cyclic", "closed cycle", "net work"] },
    { title: "Heat Engine & Efficiency", desc: "Q_H = W + Q_C, efficiency formula, Carnot limit", sectionId: "section-heat-engines", tags: ["heat engine", "efficiency", "carnot", "sink", "source"] },
    { title: "Refrigerator & Heat Pump", desc: "Reverse heat engine, Coefficient of Performance (COP = Qc/W)", sectionId: "section-refrigerator", tags: ["refrigerator", "cop", "heat pump"] },
    { title: "Second Law of Thermodynamics", desc: "Kelvin-Planck & Clausius statements, irreversible heat flow", sectionId: "section-second-law", tags: ["second law", "clausius", "kelvin planck"] },
    { title: "Entropy (ΔS = Q/T)", desc: "Disorder, microstate dispersal, second law direction", sectionId: "section-entropy", tags: ["entropy", "disorder", "spontaneity"] },
    { title: "Ideal Gas Equation (PV = nRT)", desc: "Universal gas constant R, 4-variable automated solver", sectionId: "section-ideal-gas", tags: ["ideal gas", "pv=nrt", "gas law"] },
    { title: "MDCAT Formula Wall", desc: "Master reference list of all 11+ formulas with SI units", sectionId: "section-formula-wall", tags: ["formulas", "formula wall", "equations"] },
    { title: "MDCAT Traps & Pitfalls", desc: "10 critical exam misconceptions and question tricks", sectionId: "section-mdcat-traps", tags: ["traps", "pitfalls", "mistakes", "mdcat tricks"] },
    { title: "MDCAT 25-MCQ Practice Quiz", desc: "Comprehensive exam simulation with instant rationales", sectionId: "section-quiz", tags: ["quiz", "mcqs", "practice", "exam"] }
  ];

  function initSearch() {
    const modalBackdrop = document.getElementById('searchModalBackdrop');
    const searchInput = document.getElementById('globalSearchInput');
    const resultsList = document.getElementById('searchResultsList');
    const triggerBtn = document.getElementById('searchTriggerBtn');
    const closeBtn = document.getElementById('closeSearchBtn');

    function openModal() {
      modalBackdrop.classList.add('open');
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(() => searchInput.focus(), 50);
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openModal();
      } else if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });

    document.querySelectorAll('.search-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-search');
        searchInput.value = query;
        renderSearchResults(query);
      });
    });

    function renderSearchResults(query) {
      resultsList.innerHTML = '';
      const filtered = query === '' 
        ? SEARCH_DATABASE.slice(0, 6)
        : SEARCH_DATABASE.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query) ||
            item.tags.some(t => t.toLowerCase().includes(query))
          );

      if (filtered.length === 0) {
        resultsList.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-dim);">No thermodynamic topics matching "<strong>${query}</strong>"</div>`;
        return;
      }

      filtered.forEach(item => {
        const div = document.createElement('a');
        div.className = 'search-result-item';
        div.href = `#${item.sectionId}`;
        div.innerHTML = `
          <div class="search-result-title">
            <span>${item.title}</span>
            <span style="font-size:0.75rem; color:var(--accent-cyan);">Jump ➔</span>
          </div>
          <div class="search-result-desc">${item.desc}</div>
        `;
        div.addEventListener('click', () => {
          closeModal();
          const target = document.getElementById(item.sectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.style.transition = 'outline 0.3s ease';
            target.style.outline = '2px solid var(--accent-cyan)';
            setTimeout(() => { target.style.outline = 'none'; }, 2000);
          }
        });
        resultsList.appendChild(div);
      });
    }
  }

  /* ==========================================================================
     5. HERO HEAT ENGINE CANVAS ANIMATION
     ========================================================================== */
  function initHeroEngineCanvas() {
    const canvas = document.getElementById('heroEngineCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const NUM_PARTICLES = 36;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: 100 + Math.random() * 300,
        y: 20 + Math.random() * 40,
        vy: 1.2 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.8,
        radius: 3 + Math.random() * 2,
        stage: 'hot', // 'hot' -> 'engine' -> ('work' or 'cold')
        branch: Math.random() > 0.5 ? 'work' : 'cold'
      });
    }

    let angle = 0;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      // 1. Hot Reservoir (Top)
      ctx.fillStyle = isLight ? 'rgba(234, 88, 12, 0.15)' : 'rgba(234, 88, 12, 0.25)';
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 10, w - 80, 50, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 13px system-ui';
      ctx.fillText('🔥 HOT RESERVOIR (T_H = 600 K)', 55, 38);
      ctx.font = 'bold 11px SF Mono, monospace';
      ctx.fillText('Q_H = 1000 J', w - 160, 38);

      // 2. Cold Reservoir (Bottom)
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(2, 132, 199, 0.25)';
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(40, h - 60, w - 80, 50, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px system-ui';
      ctx.fillText('❄️ COLD RESERVOIR (T_C = 300 K)', 55, h - 30);
      ctx.font = 'bold 11px SF Mono, monospace';
      ctx.fillText('Q_C = 500 J', w - 160, h - 30);

      // 3. Engine Core (Center)
      const cx = w / 2 - 40;
      const cy = h / 2;
      ctx.fillStyle = isLight ? '#e2e8f0' : '#1e293b';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Rotating turbine blades
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      for (let b = 0; b < 4; b++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(26 * Math.cos((b * Math.PI) / 2), 26 * Math.sin((b * Math.PI) / 2));
        ctx.stroke();
      }
      ctx.restore();
      angle += 0.04;

      ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
      ctx.font = 'bold 10px SF Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ENGINE', cx, cy + 4);
      ctx.textAlign = 'left';

      // 4. Work Output Arrow (Right)
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx + 40, cy);
      ctx.lineTo(cx + 140, cy);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(cx + 140, cy);
      ctx.lineTo(cx + 125, cy - 8);
      ctx.lineTo(cx + 125, cy + 8);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px system-ui';
      ctx.fillText('⚡ WORK (W = 500 J)', cx + 55, cy - 12);
      ctx.font = '10px SF Mono, monospace';
      ctx.fillText('η = 50.0%', cx + 75, cy + 18);

      // 5. Update & Draw Particles
      particles.forEach(p => {
        if (p.stage === 'hot') {
          p.y += p.vy;
          p.x += p.vx;
          ctx.fillStyle = '#f97316';

          // Towards engine
          const dx = cx - p.x;
          p.x += dx * 0.03;

          if (p.y >= cy - 20) {
            p.stage = p.branch;
          }
        } else if (p.stage === 'work') {
          // Travel out horizontally
          p.x += p.vy * 1.5;
          ctx.fillStyle = '#10b981';
          if (p.x > cx + 140) {
            // Reset particle at top
            p.x = 120 + Math.random() * (w - 240);
            p.y = 20 + Math.random() * 20;
            p.stage = 'hot';
            p.branch = Math.random() > 0.5 ? 'work' : 'cold';
          }
        } else if (p.stage === 'cold') {
          // Travel down to cold sink
          p.y += p.vy;
          ctx.fillStyle = '#38bdf8';
          if (p.y >= h - 45) {
            p.x = 120 + Math.random() * (w - 240);
            p.y = 20 + Math.random() * 20;
            p.stage = 'hot';
            p.branch = Math.random() > 0.5 ? 'work' : 'cold';
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  /* ==========================================================================
     6. SECTION 1: SYSTEM VISUALIZER CANVAS
     ========================================================================== */
  function initSystemVisualizer() {
    const canvas = document.getElementById('systemCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let activeSystem = 'open';

    const tabs = document.querySelectorAll('.system-tab-btn');
    const titleEl = document.getElementById('systemTypeTitle');
    const descEl = document.getElementById('systemExplanation');

    const descs = {
      open: `<strong style="color:var(--accent-cyan);">Open System:</strong> Exchanges <strong>both matter and energy</strong> with surroundings (e.g., An open beaker of boiling water, living human cells).`,
      closed: `<strong style="color:var(--accent-cyan);">Closed System:</strong> Exchanges <strong>energy (heat/work)</strong> but <strong>NO matter</strong> with surroundings (e.g., Sealed gas cylinder with a piston, closed pressure cooker).`,
      isolated: `<strong style="color:var(--accent-cyan);">Isolated System:</strong> Exchanges <strong>neither matter nor energy</strong> with surroundings (e.g., Perfect thermos/Dewar flask, the Universe as a whole).`
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeSystem = tab.getAttribute('data-system');
        if (descEl) descEl.innerHTML = descs[activeSystem];
      });
    });

    let frame = 0;
    function drawSystem() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;
      frame++;

      const bx = w / 2 - 90;
      const by = h / 2 - 60;
      const bw = 180;
      const bh = 120;

      // Draw Container
      ctx.lineWidth = 4;
      if (activeSystem === 'isolated') {
        // Thick insulated double walls
        ctx.strokeStyle = '#a855f7';
        ctx.fillStyle = isLight ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)';
        ctx.strokeRect(bx - 12, by - 12, bw + 24, bh + 24);
        ctx.strokeRect(bx, by, bw, bh);
        ctx.fillRect(bx, by, bw, bh);

        // Cross-hatch insulation
        ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('INSULATED BOUNDARY', bx + 16, by - 18);
      } else if (activeSystem === 'closed') {
        ctx.strokeStyle = '#38bdf8';
        ctx.fillStyle = isLight ? 'rgba(56, 189, 248, 0.08)' : 'rgba(56, 189, 248, 0.15)';
        ctx.strokeRect(bx, by, bw, bh);
        ctx.fillRect(bx, by, bw, bh);

        // Sealed Lid
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(bx - 4, by - 8, bw + 8, 10);
      } else {
        // Open Container (top open)
        ctx.strokeStyle = '#06b6d4';
        ctx.fillStyle = isLight ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.15)';
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by);
        ctx.stroke();
        ctx.fillRect(bx, by, bw, bh);
      }

      // Internal Molecules
      ctx.fillStyle = '#f97316';
      for (let i = 0; i < 12; i++) {
        const mx = bx + 20 + ((i * 35 + frame * 0.8) % (bw - 40));
        const my = by + 20 + ((i * 27 + Math.sin(frame * 0.05 + i) * 20) % (bh - 40));
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Heat / Matter Flow Arrows
      if (activeSystem === 'open') {
        // Steam molecules leaving top
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        for (let s = 0; s < 4; s++) {
          const sy = by - 10 - ((frame * 1.5 + s * 25) % 40);
          const sx = bx + 40 + s * 30 + Math.sin(frame * 0.1 + s) * 10;
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('Matter Flow ↑', bx + 50, by - 35);
        ctx.fillText('Heat Flow ➔', bx + bw + 15, by + bh / 2);
      } else if (activeSystem === 'closed') {
        ctx.fillStyle = '#f97316';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('Heat Exchange ⇄', bx + bw + 15, by + bh / 2);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('❌ Matter Sealed', bx + 35, by - 16);
      } else {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('❌ Heat Blocked (Q = 0)', bx + bw + 15, by + bh / 2);
        ctx.fillText('❌ Matter Blocked', bx + 35, by + bh + 24);
      }

      requestAnimationFrame(drawSystem);
    }
    drawSystem();
  }

  /* ==========================================================================
     7. SECTION 2 & 3: TEMPERATURE CONVERTER & HEAT CONDUCTION
     ========================================================================== */
  function initTemperatureConverter() {
    const cInput = document.getElementById('tempCelsiusInput');
    const kInput = document.getElementById('tempKelvinInput');
    const fInput = document.getElementById('tempFahrenheitInput');
    const bulb = document.getElementById('thermoBulb');
    const fluid = document.getElementById('thermoFluid');

    function updateFromC(valC) {
      if (isNaN(valC)) return;
      const k = valC + 273.15;
      const f = (valC * 9/5) + 32;

      kInput.value = k.toFixed(2);
      fInput.value = f.toFixed(1);

      // Update fluid height (range: -50C to 200C)
      const clamped = Math.max(-50, Math.min(200, valC));
      const percent = ((clamped + 50) / 250) * 100;
      if (fluid) fluid.style.height = `${percent}%`;

      // Color shift
      if (valC <= 0) {
        if (bulb) bulb.style.backgroundColor = '#38bdf8';
      } else if (valC >= 100) {
        if (bulb) bulb.style.backgroundColor = '#ef4444';
      } else {
        if (bulb) bulb.style.backgroundColor = '#f97316';
      }
    }

    if (cInput) {
      cInput.addEventListener('input', (e) => updateFromC(parseFloat(e.target.value)));
      updateFromC(25);
    }

    if (kInput) {
      kInput.addEventListener('input', (e) => {
        const k = parseFloat(e.target.value);
        if (!isNaN(k)) {
          const c = k - 273.15;
          cInput.value = c.toFixed(2);
          updateFromC(c);
        }
      });
    }

    if (fInput) {
      fInput.addEventListener('input', (e) => {
        const f = parseFloat(e.target.value);
        if (!isNaN(f)) {
          const c = (f - 32) * 5/9;
          cInput.value = c.toFixed(2);
          updateFromC(c);
        }
      });
    }
  }

  function initHeatTransferCanvas() {
    const canvas = document.getElementById('heatTransferCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const hotRange = document.getElementById('hotBodyRange');
    const coldRange = document.getElementById('coldBodyRange');
    const hotValTag = document.getElementById('hotBodyVal');
    const coldValTag = document.getElementById('coldBodyVal');
    const finalTempTag = document.getElementById('finalEquilibriumTemp');

    const startBtn = document.getElementById('startHeatSimBtn');
    const pauseBtn = document.getElementById('pauseHeatSimBtn');
    const resetBtn = document.getElementById('resetHeatSimBtn');

    let t1 = parseFloat(hotRange?.value || '100');
    let t2 = parseFloat(coldRange?.value || '10');
    let curT1 = t1;
    let curT2 = t2;
    let isRunning = true;

    // Molecular particles for Body 1 and Body 2
    const body1Particles = [];
    const body2Particles = [];

    for (let i = 0; i < 24; i++) {
      body1Particles.push({
        x: 30 + Math.random() * 140,
        y: 40 + Math.random() * 180,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      });
      body2Particles.push({
        x: 330 + Math.random() * 140,
        y: 40 + Math.random() * 180,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }

    function updateLabels() {
      if (hotValTag) hotValTag.textContent = `${curT1.toFixed(1)}°C`;
      if (coldValTag) coldValTag.textContent = `${curT2.toFixed(1)}°C`;
      const teq = (t1 + t2) / 2;
      if (finalTempTag) finalTempTag.textContent = `${teq.toFixed(1)} °C (${(teq + 273.15).toFixed(2)} K)`;
    }

    if (hotRange) {
      hotRange.addEventListener('input', (e) => {
        t1 = parseFloat(e.target.value);
        curT1 = t1;
        updateLabels();
      });
    }
    if (coldRange) {
      coldRange.addEventListener('input', (e) => {
        t2 = parseFloat(e.target.value);
        curT2 = t2;
        updateLabels();
      });
    }

    if (startBtn) startBtn.addEventListener('click', () => { isRunning = true; });
    if (pauseBtn) pauseBtn.addEventListener('click', () => { isRunning = false; });
    if (resetBtn) resetBtn.addEventListener('click', () => {
      curT1 = t1;
      curT2 = t2;
      isRunning = true;
      updateLabels();
    });

    updateLabels();

    function renderHeatSim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      // Transfer heat gradually
      if (isRunning && Math.abs(curT1 - curT2) > 0.1) {
        const rate = (curT1 - curT2) * 0.005;
        curT1 -= rate;
        curT2 += rate;
        updateLabels();
      }

      // Draw Hot Block (Left)
      ctx.fillStyle = isLight ? 'rgba(234, 88, 12, 0.15)' : 'rgba(234, 88, 12, 0.3)';
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(20, 20, 160, 220, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 13px system-ui';
      ctx.fillText(`HOT BODY (${curT1.toFixed(1)}°C)`, 30, 45);

      // Draw Cold Block (Right)
      ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(2, 132, 199, 0.3)';
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(w - 180, 20, 160, 220, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`COLD BODY (${curT2.toFixed(1)}°C)`, w - 170, 45);

      // Thermal Conductor Bridge (Center)
      ctx.fillStyle = isLight ? '#cbd5e1' : '#334155';
      ctx.strokeStyle = '#06b6d4';
      ctx.fillRect(180, 100, w - 360, 60);
      ctx.strokeRect(180, 100, w - 360, 60);

      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('HEAT FLUX Q ➔', w / 2, 135);
      ctx.textAlign = 'left';

      // Molecular velocity scales with sqrt(T)
      const vScale1 = Math.max(0.8, Math.sqrt((curT1 + 273) / 273) * 2.5);
      const vScale2 = Math.max(0.8, Math.sqrt((curT2 + 273) / 273) * 2.5);

      // Draw Left Particles
      ctx.fillStyle = '#f97316';
      body1Particles.forEach(p => {
        p.x += p.vx * vScale1 * 0.3;
        p.y += p.vy * vScale1 * 0.3;
        if (p.x < 30 || p.x > 170) p.vx *= -1;
        if (p.y < 60 || p.y > 230) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Right Particles
      ctx.fillStyle = '#38bdf8';
      body2Particles.forEach(p => {
        p.x += p.vx * vScale2 * 0.3;
        p.y += p.vy * vScale2 * 0.3;
        if (p.x < w - 170 || p.x > w - 30) p.vx *= -1;
        if (p.y < 60 || p.y > 230) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(renderHeatSim);
    }
    renderHeatSim();
  }

  /* ==========================================================================
     8. SECTION 4: SPECIFIC HEAT CALCULATOR
     ========================================================================== */
  function initSpecificHeatCalculator() {
    const massInput = document.getElementById('shMass');
    const capInput = document.getElementById('shCapacity');
    const t1Input = document.getElementById('shT1');
    const t2Input = document.getElementById('shT2');

    const dtVal = document.getElementById('shDeltaTVal');
    const subVal = document.getElementById('shSubVal');
    const qVal = document.getElementById('shFinalQ');

    function calculate() {
      const m = parseFloat(massInput?.value || '2');
      const c = parseFloat(capInput?.value || '4200');
      const t1 = parseFloat(t1Input?.value || '20');
      const t2 = parseFloat(t2Input?.value || '70');

      const dt = t2 - t1;
      const q = m * c * dt;

      if (dtVal) dtVal.textContent = `${dt.toFixed(1)} K (or ${dt.toFixed(1)} °C)`;
      if (subVal) subVal.textContent = `${m.toFixed(2)} kg × ${c} J/kg·K × ${dt.toFixed(1)} K`;
      if (qVal) qVal.textContent = `${q.toLocaleString()} J (${(q / 1000).toFixed(2)} kJ)`;
    }

    [massInput, capInput, t1Input, t2Input].forEach(inp => {
      if (inp) inp.addEventListener('input', calculate);
    });

    document.querySelectorAll('.c-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.c-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (capInput) {
          capInput.value = btn.getAttribute('data-c');
          calculate();
        }
      });
    });

    calculate();
  }

  /* ==========================================================================
     9. SECTION 5: LATENT HEAT & PHASE TRANSITIONS
     ========================================================================== */
  function initPhaseChangeCanvas() {
    const canvas = document.getElementById('phaseChangeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const runBtn = document.getElementById('runPhaseSimBtn');
    const resetBtn = document.getElementById('resetPhaseSimBtn');
    const descText = document.getElementById('phaseDescriptionText');

    let animProgress = 0;
    let isAnimating = false;

    // Heating curve keypoints: (timePercent, tempCelsius, stateName)
    // 0 -> -20C (Ice)
    // 20% -> 0C (Melting begins)
    // 45% -> 0C (Melting ends, Latent Heat of Fusion Lf)
    // 70% -> 100C (Boiling begins)
    // 95% -> 100C (Boiling ends, Latent Heat of Vaporization Lv)
    // 100% -> 120C (Steam)
    function getTempAtProgress(p) {
      if (p <= 0.2) {
        return -20 + (p / 0.2) * 20; // -20 to 0
      } else if (p <= 0.45) {
        return 0; // Melting plateau
      } else if (p <= 0.70) {
        return ((p - 0.45) / 0.25) * 100; // 0 to 100
      } else if (p <= 0.95) {
        return 100; // Boiling plateau
      } else {
        return 100 + ((p - 0.95) / 0.05) * 20; // 100 to 120
      }
    }

    function getStateTextAtProgress(p) {
      if (p <= 0.2) return "Heating Solid Ice (-20°C ➔ 0°C)";
      if (p <= 0.45) return "⭐ Melting Plateau (Ice + Water at 0°C, ΔT = 0, Q = mL_f)";
      if (p <= 0.70) return "Heating Liquid Water (0°C ➔ 100°C)";
      if (p <= 0.95) return "⭐ Boiling Plateau (Water + Steam at 100°C, ΔT = 0, Q = mL_v)";
      return "Superheated Steam (100°C ➔ 120°C)";
    }

    if (runBtn) {
      runBtn.addEventListener('click', () => {
        isAnimating = true;
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        animProgress = 0;
        isAnimating = false;
        if (descText) descText.textContent = getStateTextAtProgress(0);
      });
    }

    function drawHeatingCurve() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      const ox = 60;
      const oy = h - 40;
      const graphW = w - 90;
      const graphH = h - 70;

      // Axes
      ctx.strokeStyle = isLight ? '#94a3b8' : '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox, 20);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + graphW, oy);
      ctx.stroke();

      ctx.fillStyle = isLight ? '#0f172a' : '#94a3b8';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText('Temp (°C)', 10, 25);
      ctx.fillText('Heat Added / Time ➔', ox + graphW - 120, oy + 25);

      // Horizontal Temp Guides: 0C and 100C
      const y0 = oy - (20 / 140) * graphH;
      const y100 = oy - (120 / 140) * graphH;

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.moveTo(ox, y0);
      ctx.lineTo(ox + graphW, y0);
      ctx.moveTo(ox, y100);
      ctx.lineTo(ox + graphW, y100);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText('0°C', ox - 35, y0 + 4);
      ctx.fillText('100°C', ox - 45, y100 + 4);

      // Plot Full Curve
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let step = 0; step <= 100; step++) {
        const p = step / 100;
        const temp = getTempAtProgress(p);
        const gx = ox + p * graphW;
        const gy = oy - ((temp + 20) / 140) * graphH;
        if (step === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.stroke();

      // Highlight Plateaus
      ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
      ctx.fillRect(ox + 0.2 * graphW, y0 - 10, 0.25 * graphW, 20);
      ctx.fillRect(ox + 0.7 * graphW, y100 - 10, 0.25 * graphW, 20);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 10px SF Mono, monospace';
      ctx.fillText('Melting (ΔT=0)', ox + 0.21 * graphW, y0 - 14);
      ctx.fillText('Boiling (ΔT=0)', ox + 0.71 * graphW, y100 - 14);

      // Active Marker Animation
      if (isAnimating) {
        animProgress = Math.min(1.0, animProgress + 0.0035);
        if (descText) descText.textContent = getStateTextAtProgress(animProgress);
        if (animProgress >= 1.0) isAnimating = false;
      }

      const curTemp = getTempAtProgress(animProgress);
      const curX = ox + animProgress * graphW;
      const curY = oy - ((curTemp + 20) / 140) * graphH;

      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      requestAnimationFrame(drawHeatingCurve);
    }

    drawHeatingCurve();
  }

  /* ==========================================================================
     10. SECTION 6: ZEROTH LAW INTERACTION
     ========================================================================== */
  function initZerothLawCanvas() {
    const canvas = document.getElementById('zerothCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const sA = document.getElementById('tempASlider');
    const sB = document.getElementById('tempBSlider');
    const sC = document.getElementById('tempCSlider');

    const vA = document.getElementById('tempAVal');
    const vB = document.getElementById('tempBVal');
    const vC = document.getElementById('tempCVal');
    const badge = document.getElementById('zerothBadgeStatus');
    const equalBtn = document.getElementById('makeEqualZerothBtn');

    function update() {
      const ta = parseFloat(sA?.value || '50');
      const tb = parseFloat(sB?.value || '50');
      const tc = parseFloat(sC?.value || '50');

      if (vA) vA.textContent = `${ta}°C`;
      if (vB) vB.textContent = `${tb}°C`;
      if (vC) vC.textContent = `${tc}°C`;

      const isEq = (ta === tb && tb === tc);
      if (badge) {
        if (isEq) {
          badge.className = 'badge badge-emerald';
          badge.textContent = '✓ Complete Equilibrium (A ↔ B ↔ C)';
        } else {
          badge.className = 'badge badge-hot';
          badge.textContent = '⚡ Heat Flow in Progress';
        }
      }
    }

    [sA, sB, sC].forEach(s => {
      if (s) s.addEventListener('input', update);
    });

    if (equalBtn) {
      equalBtn.addEventListener('click', () => {
        if (sA) sA.value = '50';
        if (sB) sB.value = '50';
        if (sC) sC.value = '50';
        update();
      });
    }

    update();

    function renderZeroth() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      const ta = parseFloat(sA?.value || '50');
      const tb = parseFloat(sB?.value || '50');
      const tc = parseFloat(sC?.value || '50');

      const cx = w / 2;
      const cy = h / 2;

      // Draw Systems A, B, C in triangle
      const posA = { x: cx - 110, y: cy + 40, name: 'System A', temp: ta };
      const posB = { x: cx, y: cy - 60, name: 'System B (Thermometer)', temp: tb };
      const posC = { x: cx + 110, y: cy + 40, name: 'System C', temp: tc };

      // Conduction lines
      ctx.strokeStyle = (ta === tb) ? '#10b981' : '#f97316';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(posA.x, posA.y);
      ctx.lineTo(posB.x, posB.y);
      ctx.stroke();

      ctx.strokeStyle = (tb === tc) ? '#10b981' : '#f97316';
      ctx.beginPath();
      ctx.moveTo(posB.x, posB.y);
      ctx.lineTo(posC.x, posC.y);
      ctx.stroke();

      ctx.strokeStyle = (ta === tc) ? '#10b981' : '#f97316';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(posA.x, posA.y);
      ctx.lineTo(posC.x, posC.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw nodes
      [posA, posB, posC].forEach(node => {
        ctx.fillStyle = isLight ? '#ffffff' : '#0f172a';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(node.name.split(' ')[0], node.x, node.y - 6);
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 12px SF Mono, monospace';
        ctx.fillText(`${node.temp}°C`, node.x, node.y + 12);
      });
      ctx.textAlign = 'left';

      requestAnimationFrame(renderZeroth);
    }
    renderZeroth();
  }

  /* ==========================================================================
     11. SECTION 7: FIRST LAW LINKED SLIDERS
     ========================================================================== */
  function initFirstLawSliders() {
    const qSlider = document.getElementById('firstLawQSlider');
    const wSlider = document.getElementById('firstLawWSlider');
    const uSlider = document.getElementById('firstLawUSlider');

    const qVal = document.getElementById('firstLawQVal');
    const wVal = document.getElementById('firstLawWVal');
    const uVal = document.getElementById('firstLawUVal');

    const barQ = document.getElementById('barQ');
    const barU = document.getElementById('barU');
    const barW = document.getElementById('barW');

    const barQText = document.getElementById('barQText');
    const barUText = document.getElementById('barUText');
    const barWText = document.getElementById('barWText');

    function update() {
      const q = parseFloat(qSlider?.value || '1000');
      const w = parseFloat(wSlider?.value || '400');
      const u = q - w;

      if (uSlider) uSlider.value = u.toString();

      if (qVal) qVal.textContent = `${q >= 0 ? '+' : ''}${q} J`;
      if (wVal) wVal.textContent = `${w >= 0 ? '+' : ''}${w} J`;
      if (uVal) uVal.textContent = `${u >= 0 ? '+' : ''}${u} J`;

      const maxAbs = Math.max(1000, Math.abs(q), Math.abs(w), Math.abs(u));

      if (barQ) barQ.style.width = `${Math.min(100, (Math.abs(q) / maxAbs) * 100)}%`;
      if (barU) barU.style.width = `${Math.min(100, (Math.abs(u) / maxAbs) * 100)}%`;
      if (barW) barW.style.width = `${Math.min(100, (Math.abs(w) / maxAbs) * 100)}%`;

      if (barQText) barQText.textContent = `${q} J`;
      if (barUText) barUText.textContent = `${u} J`;
      if (barWText) barWText.textContent = `${w} J`;
    }

    if (qSlider) qSlider.addEventListener('input', update);
    if (wSlider) wSlider.addEventListener('input', update);

    update();
  }

  /* ==========================================================================
     12. SECTION 8 & 9: INTERNAL ENERGY & PISTON WORK CANVAS
     ========================================================================== */
  function initInternalEnergyCanvas() {
    const canvas = document.getElementById('internalEnergyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('gasTempSlider');
    const valTag = document.getElementById('gasTempSliderVal');

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: 20 + Math.random() * (canvas.width - 40),
        y: 20 + Math.random() * (canvas.height - 40),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        if (valTag) valTag.textContent = `${e.target.value} K`;
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const t = parseFloat(slider?.value || '300');
      const vScale = Math.sqrt(t / 300) * 1.8;

      ctx.strokeStyle = isLight ? '#94a3b8' : '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      ctx.fillStyle = t > 500 ? '#ef4444' : (t > 300 ? '#f97316' : '#38bdf8');
      particles.forEach(p => {
        p.x += p.vx * vScale;
        p.y += p.vy * vScale;

        if (p.x < 16 || p.x > canvas.width - 16) p.vx *= -1;
        if (p.y < 16 || p.y > canvas.height - 16) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    }
    render();
  }

  function initPistonWorkCanvas() {
    const canvas = document.getElementById('pistonWorkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const pSlider = document.getElementById('pistonPSlider');
    const vSlider = document.getElementById('pistonVSlider');
    const pVal = document.getElementById('pistonPVal');
    const vVal = document.getElementById('pistonVVal');
    const workOutput = document.getElementById('pistonWorkOutput');

    function update() {
      const p = parseFloat(pSlider?.value || '2.0');
      const v2 = parseFloat(vSlider?.value || '4.0');
      const v1 = 1.5; // fixed initial volume

      if (pVal) pVal.textContent = `${p.toFixed(1)} atm`;
      if (vVal) vVal.textContent = `${v2.toFixed(1)} L`;

      // 1 L·atm = 101.325 Joules
      const wJoules = p * (v2 - v1) * 101.325;
      if (workOutput) {
        workOutput.textContent = `${wJoules >= 0 ? '+' : ''}${wJoules.toFixed(1)} J (${v2 >= v1 ? 'Expansion' : 'Compression'})`;
      }
    }

    if (pSlider) pSlider.addEventListener('input', update);
    if (vSlider) vSlider.addEventListener('input', update);

    update();

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      const p = parseFloat(pSlider?.value || '2.0');
      const v2 = parseFloat(vSlider?.value || '4.0');

      // Piston Cylinder Layout
      const cx = 30;
      const cy = 40;
      const maxL = w - 80;
      const pistonX = cx + (v2 / 6.0) * maxL;

      // Cylinder outline
      ctx.strokeStyle = isLight ? '#64748b' : '#475569';
      ctx.lineWidth = 4;
      ctx.strokeRect(cx, cy, maxL, h - 80);

      // Gas inside
      ctx.fillStyle = isLight ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.25)';
      ctx.fillRect(cx, cy, pistonX - cx, h - 80);

      // Piston Head
      ctx.fillStyle = '#f97316';
      ctx.fillRect(pistonX - 10, cy - 6, 14, h - 68);

      // Piston Rod
      ctx.fillStyle = isLight ? '#94a3b8' : '#cbd5e1';
      ctx.fillRect(pistonX + 4, cy + (h - 80) / 2 - 8, maxL - (pistonX - cx) + 20, 16);

      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 12px system-ui';
      ctx.fillText(`Gas Pressure: ${p.toFixed(1)} atm`, cx + 15, cy + 30);
      ctx.fillText(`Volume: ${v2.toFixed(1)} L`, cx + 15, cy + 50);

      requestAnimationFrame(render);
    }
    render();
  }

  /* ==========================================================================
     13. SECTION 10 & 11: MASTER P-V DIAGRAM & PROCESS CANVASES
     ========================================================================== */
  function initMasterPVDiagram() {
    const canvas = document.getElementById('masterPVCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const titleEl = document.getElementById('pvActiveProcessTitle');
    const eqEl = document.getElementById('pvGovEquation');
    const lawEl = document.getElementById('pvWorkLawSummary');

    let activeCurve = 'isothermal';

    const info = {
      isothermal: {
        title: 'Isothermal Process (T = const)',
        eq: 'PV = constant  ⟹  P₁V₁ = P₂V₂',
        law: 'ΔU = 0  ⟹  Q = W = nRT ln(V₂/V₁)'
      },
      adiabatic: {
        title: 'Adiabatic Process (Q = 0)',
        eq: 'PV^γ = constant  ⟹  P₁V₁^γ = P₂V₂^γ',
        law: 'Q = 0  ⟹  ΔU = -W (Expansion causes cooling)'
      },
      isobaric: {
        title: 'Isobaric Process (P = const)',
        eq: 'V/T = constant (Charles\'s Law)',
        law: 'W = PΔV = P(V₂ - V₁)  ⟹  Q = ΔU + PΔV'
      },
      isochoric: {
        title: 'Isochoric Process (V = const)',
        eq: 'P/T = constant (Gay-Lussac\'s Law)',
        law: 'ΔV = 0  ⟹  W = 0  ⟹  ΔU = Q'
      }
    };

    document.querySelectorAll('.pv-curve-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pv-curve-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCurve = btn.getAttribute('data-curve');

        if (titleEl) titleEl.textContent = info[activeCurve].title;
        if (eqEl) eqEl.textContent = info[activeCurve].eq;
        if (lawEl) lawEl.textContent = info[activeCurve].law;
      });
    });

    function drawMasterPV() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      const ox = 60;
      const oy = h - 45;
      const gw = w - 90;
      const gh = h - 70;

      // Axes
      ctx.strokeStyle = isLight ? '#94a3b8' : '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox, 20);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + gw, oy);
      ctx.stroke();

      ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
      ctx.font = 'bold 12px system-ui';
      ctx.fillText('Pressure (P) ➔', ox - 50, 20);
      ctx.fillText('Volume (V) ➔', ox + gw - 80, oy + 30);

      // Draw Curve based on active selection
      const v1 = ox + 0.2 * gw;
      const v2 = ox + 0.8 * gw;
      const p1 = oy - 0.8 * gh;

      ctx.beginPath();
      if (activeCurve === 'isobaric') {
        // Horizontal line
        const pIso = oy - 0.6 * gh;
        ctx.moveTo(v1, pIso);
        ctx.lineTo(v2, pIso);

        // Fill Shaded Work Area
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fillRect(v1, pIso, v2 - v1, oy - pIso);

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (activeCurve === 'isochoric') {
        // Vertical line
        const vIso = ox + 0.5 * gw;
        ctx.moveTo(vIso, oy - 0.2 * gh);
        ctx.lineTo(vIso, oy - 0.8 * gh);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Area = 0 (W = 0)', vIso + 15, oy - 0.5 * gh);
      } else if (activeCurve === 'isothermal') {
        // Hyperbola P = k/V
        ctx.moveTo(v1, p1);
        for (let x = v1; x <= v2; x += 2) {
          const v = (x - ox) / gw;
          const p = 0.16 / v;
          const y = oy - p * gh;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Shaded area
        ctx.lineTo(v2, oy);
        ctx.lineTo(v1, oy);
        ctx.closePath();
        ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.fill();
      } else if (activeCurve === 'adiabatic') {
        // Steeper curve P = k/V^gamma (gamma = 1.4)
        ctx.moveTo(v1, p1);
        for (let x = v1; x <= v2; x += 2) {
          const v = (x - ox) / gw;
          const p = 0.08 / Math.pow(v, 1.4);
          const y = Math.min(oy, oy - p * gh);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Shaded area
        ctx.lineTo(v2, oy);
        ctx.lineTo(v1, oy);
        ctx.closePath();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fill();
      }

      requestAnimationFrame(drawMasterPV);
    }
    drawMasterPV();
  }

  /* ==========================================================================
     14. SECTION 12: CYCLIC PROCESS SIMULATOR
     ========================================================================== */
  function initCyclicProcessCanvas() {
    const canvas = document.getElementById('cyclicCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const toggleBtn = document.getElementById('toggleCycleDirBtn');
    const resetBtn = document.getElementById('resetCycleBtn');
    const dirBadge = document.getElementById('cycleDirBadge');

    let isClockwise = true;
    let cycleT = 0;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isClockwise = !isClockwise;
        if (dirBadge) {
          if (isClockwise) {
            dirBadge.className = 'badge badge-primary';
            dirBadge.textContent = 'Clockwise: Heat Engine (W_net > 0)';
          } else {
            dirBadge.className = 'badge badge-hot';
            dirBadge.textContent = 'Counter-Clockwise: Refrigerator (W_net < 0)';
          }
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => { cycleT = 0; });
    }

    function drawCycle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      const p1 = { x: 90, y: 70 };
      const p2 = { x: w - 90, y: 70 };
      const p3 = { x: w - 90, y: h - 60 };
      const p4 = { x: 90, y: h - 60 };

      // Enclosed Area
      ctx.fillStyle = isClockwise ? 'rgba(6, 182, 212, 0.2)' : 'rgba(249, 115, 22, 0.2)';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      // Cycle Outline
      ctx.strokeStyle = isClockwise ? '#06b6d4' : '#f97316';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(isClockwise ? 'NET WORK (W_net > 0)' : 'NET WORK (W_net < 0)', w / 2, h / 2);
      ctx.fillText('ΔU_cycle = 0', w / 2, h / 2 + 18);
      ctx.textAlign = 'left';

      // Animated tracer point
      cycleT = (cycleT + 0.01) % 4;
      let curX, curY;
      const seg = isClockwise ? Math.floor(cycleT) : (3 - Math.floor(cycleT));
      const frac = isClockwise ? (cycleT % 1) : (1 - (cycleT % 1));

      if (seg === 0) {
        curX = p1.x + (p2.x - p1.x) * frac;
        curY = p1.y;
      } else if (seg === 1) {
        curX = p2.x;
        curY = p2.y + (p3.y - p2.y) * frac;
      } else if (seg === 2) {
        curX = p3.x - (p3.x - p4.x) * frac;
        curY = p3.y;
      } else {
        curX = p4.x;
        curY = p4.y - (p4.y - p1.y) * frac;
      }

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(drawCycle);
    }
    drawCycle();
  }

  /* ==========================================================================
     15. SECTION 13 & 14: HEAT ENGINE & EFFICIENCY GAUGE
     ========================================================================== */
  function initHeatEngineSimulator() {
    const qhSlider = document.getElementById('engineQhSlider');
    const qcSlider = document.getElementById('engineQcSlider');
    const qhVal = document.getElementById('engineQhSliderVal');
    const qcVal = document.getElementById('engineQcSliderVal');

    const workTag = document.getElementById('workOutputTag');
    const calcWork = document.getElementById('calcEngineWork');
    const calcEff = document.getElementById('calcEngineEff');
    const gaugeCircle = document.getElementById('engineEfficiencyGauge');
    const gaugeText = document.getElementById('efficiencyPercentText');

    function update() {
      const qh = parseFloat(qhSlider?.value || '1000');
      let qc = parseFloat(qcSlider?.value || '400');

      // Qc cannot exceed Qh
      if (qc >= qh) {
        qc = qh - 50;
        if (qcSlider) qcSlider.value = qc.toString();
      }

      const w = qh - qc;
      const eff = (w / qh) * 100;

      if (qhVal) qhVal.textContent = `${qh} J`;
      if (qcVal) qcVal.textContent = `${qc} J`;
      if (workTag) workTag.textContent = `W = ${w} J`;

      if (calcWork) calcWork.textContent = `${w} J`;
      if (calcEff) calcEff.textContent = `${(eff / 100).toFixed(2)} (${eff.toFixed(1)}%)`;

      if (gaugeCircle) gaugeCircle.style.setProperty('--gauge-fill', `${eff}%`);
      if (gaugeText) gaugeText.textContent = `${eff.toFixed(1)}%`;
    }

    if (qhSlider) qhSlider.addEventListener('input', update);
    if (qcSlider) qcSlider.addEventListener('input', update);

    update();
  }

  /* ==========================================================================
     16. SECTION 15: REFRIGERATOR COP CALCULATOR
     ========================================================================== */
  function initRefrigeratorCalculator() {
    const qcInput = document.getElementById('refQc');
    const workInput = document.getElementById('refWork');
    const qhTag = document.getElementById('refQhVal');
    const copTag = document.getElementById('refCopVal');

    function update() {
      const qc = parseFloat(qcInput?.value || '1200');
      const w = parseFloat(workInput?.value || '300');

      if (w > 0) {
        const qh = qc + w;
        const cop = qc / w;
        if (qhTag) qhTag.textContent = `${qh.toFixed(1)} J`;
        if (copTag) copTag.textContent = cop.toFixed(2);
      }
    }

    if (qcInput) qcInput.addEventListener('input', update);
    if (workInput) workInput.addEventListener('input', update);
    update();
  }

  /* ==========================================================================
     17. SECTION 16 & 17: SECOND LAW & ENTROPY LAB
     ========================================================================== */
  function initSecondLawInteraction() {
    const testSpontaneousBtn = document.getElementById('testSpontaneousBtn');
    const testReverseBtn = document.getElementById('testReverseBtn');
    const display = document.getElementById('spontaneousHeatDisplay');
    const alertBox = document.getElementById('secondLawAlertBox');

    if (testSpontaneousBtn) {
      testSpontaneousBtn.addEventListener('click', () => {
        if (display) {
          display.textContent = '🔥 Hot Body (80°C) ➔ ❄️ Cold Body (20°C) [Spontaneous Flow]';
          display.style.color = 'var(--accent-hot)';
        }
        if (alertBox) {
          alertBox.className = 'highlight-callout emerald';
          alertBox.innerHTML = '✓ <strong>Allowed by 2nd Law:</strong> Heat naturally and spontaneously flows down temperature gradients!';
        }
      });
    }

    if (testReverseBtn) {
      testReverseBtn.addEventListener('click', () => {
        if (display) {
          display.textContent = '❄️ Cold (20°C) ➔ 🔥 Hot (80°C) [BLOCKED WITHOUT WORK]';
          display.style.color = 'var(--accent-red)';
        }
        if (alertBox) {
          alertBox.className = 'highlight-callout';
          alertBox.innerHTML = '🚨 <strong>Second Law Clausius Violation:</strong> Heat CANNOT spontaneously flow from cold to hot without external work (e.g. refrigerator compressor)!';
        }
      });
    }
  }

  function initEntropyCanvas() {
    const canvas = document.getElementById('entropyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const disperseBtn = document.getElementById('disperseEntropyBtn');
    const resetBtn = document.getElementById('resetEntropyBtn');

    let hasPartition = true;
    const particles = [];

    function resetOrdered() {
      particles.length = 0;
      hasPartition = true;
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: 20 + Math.random() * (canvas.width / 2 - 30),
          y: 20 + Math.random() * (canvas.height - 40),
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3
        });
      }
    }

    resetOrdered();

    if (disperseBtn) {
      disperseBtn.addEventListener('click', () => {
        hasPartition = false;
        showToast('Partition removed: System entropy increased!', '🌀');
      });
    }

    if (resetBtn) resetBtn.addEventListener('click', resetOrdered);

    function renderEntropy() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const w = canvas.width;
      const h = canvas.height;

      // Chamber boundary
      ctx.strokeStyle = isLight ? '#94a3b8' : '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Partition
      if (hasPartition) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(w / 2, 10);
        ctx.lineTo(w / 2, h - 10);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('PARTITION (Low Entropy)', 20, 30);
      } else {
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('DISPERSED (High Entropy ΔS > 0)', 20, 30);
      }

      ctx.fillStyle = '#06b6d4';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        const rightBound = hasPartition ? (w / 2 - 8) : (w - 16);
        if (p.x < 16 || p.x > rightBound) p.vx *= -1;
        if (p.y < 16 || p.y > h - 16) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(renderEntropy);
    }
    renderEntropy();
  }

  /* ==========================================================================
     18. SECTION 18: IDEAL GAS EQUATION SOLVER
     ========================================================================== */
  function initIdealGasSolver() {
    const pInput = document.getElementById('gasP');
    const vInput = document.getElementById('gasV');
    const nInput = document.getElementById('gasN');
    const tInput = document.getElementById('gasT');

    const formulaTag = document.getElementById('gasFormulaUsed');
    const subTag = document.getElementById('gasSubUsed');
    const resultTag = document.getElementById('gasFinalResult');

    let solveTarget = 'P';
    const R = 8.314; // J/mol·K

    document.querySelectorAll('.gas-solve-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gas-solve-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        solveTarget = btn.getAttribute('data-solve');

        // Disable selected input
        [pInput, vInput, nInput, tInput].forEach(inp => {
          if (inp) inp.disabled = false;
        });
        if (solveTarget === 'P' && pInput) pInput.disabled = true;
        if (solveTarget === 'V' && vInput) vInput.disabled = true;
        if (solveTarget === 'n' && nInput) nInput.disabled = true;
        if (solveTarget === 'T' && tInput) tInput.disabled = true;

        calculate();
      });
    });

    function calculate() {
      const p = parseFloat(pInput?.value || '101.3') * 1000; // kPa -> Pa
      const v = parseFloat(vInput?.value || '0.024'); // m3
      const n = parseFloat(nInput?.value || '1.0');
      const t = parseFloat(tInput?.value || '298.15');

      if (solveTarget === 'P') {
        const calcP = (n * R * t) / v;
        if (pInput) pInput.value = (calcP / 1000).toFixed(2);
        if (formulaTag) formulaTag.textContent = 'P = (nRT) / V';
        if (subTag) subTag.textContent = `(${n} mol × 8.314 J/mol·K × ${t} K) / ${v} m³`;
        if (resultTag) resultTag.textContent = `P = ${(calcP / 1000).toFixed(2)} kPa (${(calcP / 101325).toFixed(3)} atm)`;
      } else if (solveTarget === 'V') {
        const calcV = (n * R * t) / p;
        if (vInput) vInput.value = calcV.toFixed(4);
        if (formulaTag) formulaTag.textContent = 'V = (nRT) / P';
        if (subTag) subTag.textContent = `(${n} mol × 8.314 J/mol·K × ${t} K) / ${p} Pa`;
        if (resultTag) resultTag.textContent = `V = ${calcV.toFixed(4)} m³ (${(calcV * 1000).toFixed(2)} Liters)`;
      } else if (solveTarget === 'n') {
        const calcN = (p * v) / (R * t);
        if (nInput) nInput.value = calcN.toFixed(3);
        if (formulaTag) formulaTag.textContent = 'n = (PV) / (RT)';
        if (subTag) subTag.textContent = `(${p} Pa × ${v} m³) / (8.314 J/mol·K × ${t} K)`;
        if (resultTag) resultTag.textContent = `n = ${calcN.toFixed(3)} moles`;
      } else if (solveTarget === 'T') {
        const calcT = (p * v) / (n * R);
        if (tInput) tInput.value = calcT.toFixed(2);
        if (formulaTag) formulaTag.textContent = 'T = (PV) / (nR)';
        if (subTag) subTag.textContent = `(${p} Pa × ${v} m³) / (${n} mol × 8.314 J/mol·K)`;
        if (resultTag) resultTag.textContent = `T = ${calcT.toFixed(2)} K (${(calcT - 273.15).toFixed(2)} °C)`;
      }
    }

    [pInput, vInput, nInput, tInput].forEach(inp => {
      if (inp) inp.addEventListener('input', calculate);
    });

    if (pInput) pInput.disabled = true;
    calculate();
  }

  /* ==========================================================================
     19. SECTION 19: VIRTUAL LAB TABS & BENCHES
     ========================================================================== */
  function initVirtualLab() {
    const tabBtns = document.querySelectorAll('.vlab-tab-btn');
    const panels = document.querySelectorAll('.vlab-content-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = `vlab-${btn.getAttribute('data-vlab')}`;
        const panel = document.getElementById(targetId);
        if (panel) panel.classList.add('active');
      });
    });

    // Bench 1: Thermal Gradient
    const c1 = document.getElementById('vlabCanvas1');
    if (c1) {
      const ctx = c1.getContext('2d');
      let heatVal = 0;
      document.getElementById('vlabStart1')?.addEventListener('click', () => { heatVal = 100; });
      document.getElementById('vlabReset1')?.addEventListener('click', () => { heatVal = 0; });

      function drawB1() {
        ctx.clearRect(0, 0, c1.width, c1.height);
        const w = c1.width;
        const h = c1.height;

        const grad = ctx.createLinearGradient(50, 0, w - 50, 0);
        grad.addColorStop(0, `rgb(${150 + heatVal}, 50, 50)`);
        grad.addColorStop(1, '#38bdf8');

        ctx.fillStyle = grad;
        ctx.fillRect(50, h / 2 - 30, w - 100, 60);

        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(50, h / 2 - 30, w - 100, 60);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText(`Left End: ${heatVal + 25}°C`, 60, h / 2 + 5);
        ctx.fillText('Right End: 25°C', w - 160, h / 2 + 5);

        requestAnimationFrame(drawB1);
      }
      drawB1();
    }
  }

  /* ==========================================================================
     20. SECTION 20: MDCAT FORMULA WALL
     ========================================================================== */
  const FORMULA_DB = [
    {
      id: "sh-heat",
      category: "basics",
      categoryName: "Heat & Temp",
      formula: "Q = mcΔT",
      meaning: "Heat required for temperature change without state change",
      variables: "m = mass (kg), c = specific heat capacity (J/kg·K), ΔT = temp change (K or °C)",
      whenToUse: "When substance absorbs/releases heat and changes temperature",
      mdcatTip: "ΔK = Δ°C; specific heat of water is high (~4200 J/kg·K)"
    },
    {
      id: "latent-heat",
      category: "basics",
      categoryName: "Heat & Temp",
      formula: "Q = mL",
      meaning: "Latent heat absorbed or released during phase transition at constant T",
      variables: "m = mass (kg), L = latent heat of fusion/vaporization (J/kg)",
      whenToUse: "During melting, boiling, freezing, condensation where ΔT = 0",
      mdcatTip: "Lv > Lf because vaporization completely breaks molecular bonds against atmosphere"
    },
    {
      id: "first-law",
      category: "first-law",
      categoryName: "1st Law & Work",
      formula: "ΔU = Q - W",
      meaning: "First Law of Thermodynamics (Energy conservation for thermodynamic systems)",
      variables: "ΔU = internal energy change (J), Q = heat added (J), W = work done by system (J)",
      whenToUse: "Relating energy input, internal energy, and mechanical work",
      mdcatTip: "If gas expands: W > 0; if gas compressed: W < 0; heat entering: Q > 0"
    },
    {
      id: "isobaric-work",
      category: "first-law",
      categoryName: "1st Law & Work",
      formula: "W = PΔV = P(V₂ - V₁)",
      meaning: "Mechanical work done by gas at constant pressure",
      variables: "P = pressure (Pa or N/m²), ΔV = volume change (m³)",
      whenToUse: "Isobaric expansion or compression processes",
      mdcatTip: "Work corresponds to area under P-V curve; 1 L·atm = 101.3 Joules"
    },
    {
      id: "ideal-gas",
      category: "first-law",
      categoryName: "1st Law & Work",
      formula: "PV = nRT",
      meaning: "Ideal Gas Equation of State",
      variables: "P = pressure, V = volume, n = moles, R = 8.314 J/mol·K, T = absolute temp (K)",
      whenToUse: "Relating state parameters of ideal gases",
      mdcatTip: "Temperature MUST always be in Kelvin (K) when evaluating PV = nRT"
    },
    {
      id: "isothermal",
      category: "processes",
      categoryName: "Processes",
      formula: "P₁V₁ = P₂V₂",
      meaning: "Isothermal process condition (T = constant, ΔU = 0)",
      variables: "P₁, V₁ = initial pressure/volume; P₂, V₂ = final pressure/volume",
      whenToUse: "Slow process in diathermic (heat-conducting) vessel",
      mdcatTip: "Because ΔU = 0 in isothermal ideal gas, all heat added becomes work: Q = W"
    },
    {
      id: "adiabatic",
      category: "processes",
      categoryName: "Processes",
      formula: "PV^γ = constant",
      meaning: "Adiabatic process equation (Q = 0)",
      variables: "γ = ratio of molar heat capacities (Cp / Cv > 1)",
      whenToUse: "Fast, rapid processes in insulated systems where no heat enters or leaves",
      mdcatTip: "Slope of adiabatic curve is steeper than isothermal by factor γ"
    },
    {
      id: "engine-eff-work",
      category: "engines",
      categoryName: "Engines & 2nd Law",
      formula: "η = W / Q_H",
      meaning: "Thermal efficiency of a heat engine",
      variables: "W = net work output (J), Q_H = heat absorbed from hot reservoir (J)",
      whenToUse: "Finding fractional conversion of heat into mechanical work",
      mdcatTip: "Since W = QH - QC, efficiency is always strictly less than 1.0 (100%)"
    },
    {
      id: "engine-eff-temp",
      category: "engines",
      categoryName: "Engines & 2nd Law",
      formula: "η = 1 - (Q_C / Q_H)",
      meaning: "Heat engine efficiency in terms of heat ratio",
      variables: "Q_C = heat rejected to cold reservoir, Q_H = heat absorbed",
      whenToUse: "When heat input and heat rejected are given",
      mdcatTip: "Carnot max theoretical efficiency is η_carnot = 1 - (T_C / T_H) in Kelvin"
    },
    {
      id: "refrigerator-cop",
      category: "engines",
      categoryName: "Engines & 2nd Law",
      formula: "COP = Q_C / W",
      meaning: "Coefficient of Performance for Refrigerator",
      variables: "Q_C = heat removed from cold space (J), W = work input (J)",
      whenToUse: "Evaluating refrigerator cooling effectiveness",
      mdcatTip: "COP can be greater than 1; leaving fridge open heats up the room because QH = QC + W"
    },
    {
      id: "entropy",
      category: "engines",
      categoryName: "Engines & 2nd Law",
      formula: "ΔS = Q_rev / T",
      meaning: "Change in entropy for a reversible process",
      variables: "ΔS = entropy change (J/K), Q_rev = reversible heat (J), T = temperature (K)",
      whenToUse: "Quantifying energy dispersal and thermodynamic spontaneity",
      mdcatTip: "Total entropy of the universe always increases in irreversible spontaneous processes"
    }
  ];

  function initFormulaWall() {
    const grid = document.getElementById('formulaGrid');
    const filterChips = document.querySelectorAll('.filter-chip');
    if (!grid) return;

    function renderFormulas(cat = 'all') {
      grid.innerHTML = '';
      const filtered = cat === 'all' 
        ? FORMULA_DB 
        : FORMULA_DB.filter(f => f.category === cat);

      filtered.forEach(f => {
        const card = document.createElement('div');
        card.className = 'formula-card';
        card.innerHTML = `
          <div class="formula-header">
            <span class="formula-cat-tag">${f.categoryName}</span>
            <span style="font-size:0.75rem; color:var(--text-dim);">MDCAT # ${f.id}</span>
          </div>
          <div class="formula-display">${f.formula}</div>
          <ul class="formula-meta-list">
            <li><strong>Meaning:</strong> ${f.meaning}</li>
            <li><strong>Variables:</strong> ${f.variables}</li>
            <li><strong>When to Use:</strong> ${f.whenToUse}</li>
          </ul>
          <div class="formula-tip-box">
            ⭐ <strong>MDCAT Tip:</strong> ${f.mdcatTip}
          </div>
          <button class="copy-formula-btn" data-formula="${f.formula}">
            📋 Copy Formula
          </button>
        `;
        grid.appendChild(card);
      });

      // Attach copy handlers
      grid.querySelectorAll('.copy-formula-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const formulaText = btn.getAttribute('data-formula');
          navigator.clipboard.writeText(formulaText).then(() => {
            btn.innerHTML = '✓ Copied!';
            showToast(`Copied "${formulaText}" to clipboard`, '📋');
            if (!STATE.masteredFormulas.includes(formulaText)) {
              STATE.masteredFormulas.push(formulaText);
              saveState();
            }
            setTimeout(() => { btn.innerHTML = '📋 Copy Formula'; }, 2000);
          });
        });
      });
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderFormulas(chip.getAttribute('data-filter'));
      });
    });

    renderFormulas('all');
  }

  /* ==========================================================================
     21. SECTION 21: MDCAT TRAPS & PITFALLS (3D FLIP CARDS)
     ========================================================================== */
  const TRAPS_DB = [
    {
      front: "Trap 1: Is Heat the same as Temperature?",
      tag: "Fundamental Trap",
      clarification: "No! Heat is energy in transit across a boundary due to temperature difference. Temperature measures the average microscopic kinetic energy of particles."
    },
    {
      front: "Trap 2: Does Adiabatic mean Temperature remains constant?",
      tag: "Adiabatic Trap",
      clarification: "No! Adiabatic means Q = 0 (no heat enters or leaves). In adiabatic expansion, gas does work at the expense of its internal energy, causing temperature to DROP!"
    },
    {
      front: "Trap 3: What is Work done in an Isochoric process?",
      tag: "Isochoric Trap",
      clarification: "In an isochoric process, volume is constant (ΔV = 0). Therefore, W = PΔV = 0 strictly! All added heat goes purely into internal energy: ΔU = Q."
    },
    {
      front: "Trap 4: What is ΔU over a complete closed cycle?",
      tag: "Cyclic Trap",
      clarification: "Because internal energy U is a state function depending only on initial and final states, ΔU_cycle is ALWAYS strictly ZERO. From 1st law: Q_net = W_net."
    },
    {
      front: "Trap 5: What does the area under a P-V curve represent?",
      tag: "Graphical Trap",
      clarification: "The area under a single P-V curve represents Work Done by the gas during that process. The area ENCLOSED by a complete cycle represents Net Work."
    },
    {
      front: "Trap 6: Can a Heat Engine ever achieve 100% efficiency?",
      tag: "2nd Law Trap",
      clarification: "No! The Kelvin-Planck statement of the 2nd Law forbids a heat engine from converting 100% of absorbed heat into work. Rejecting heat (Q_C > 0) to a colder sink is mandatory."
    },
    {
      front: "Trap 7: What happens to room temp if an active fridge door is left open?",
      tag: "Refrigerator Trap",
      clarification: "The room temperature will INCREASE! The heat expelled at the back (Q_H = Q_C + W) exceeds heat absorbed inside (Q_C) by the electrical work input W."
    },
    {
      front: "Trap 8: What unit of Temperature must be used in gas equations?",
      tag: "Unit Trap",
      clarification: "Absolute temperature in KELVIN (K) is mandatory for PV = nRT and Carnot efficiency η = 1 - (Tc/Th). Only use Celsius when dealing strictly with temperature differences (ΔT)."
    },
    {
      front: "Trap 9: Does temperature change during a phase transition?",
      tag: "Latent Heat Trap",
      clarification: "No! During melting or boiling, temperature remains strictly constant (ΔT = 0) while latent heat Q = mL is supplied to break intermolecular binding bonds."
    },
    {
      front: "Trap 10: Which curve has a steeper slope on a P-V graph?",
      tag: "Slope Trap",
      clarification: "The Adiabatic curve is STEEPER than the Isothermal curve by a factor of γ (ratio of specific heats, Cp/Cv ≈ 1.4 for air/diatomic gas)."
    }
  ];

  function initMDCATTraps() {
    const grid = document.getElementById('trapsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    TRAPS_DB.forEach(trap => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span class="trap-card-tag">🚨 ${trap.tag}</span>
            <h4>${trap.front}</h4>
            <div class="flip-hint">Click to flip & reveal answer ➔</div>
          </div>
          <div class="flip-card-back">
            <span class="trap-solution-tag">✓ MDCAT Scientific Rationale</span>
            <div class="trap-clarification">${trap.clarification}</div>
            <div style="font-size:0.75rem; color:var(--text-dim); text-align:right;">Click to flip back</div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     22. SECTION 23: 25-MCQ MDCAT PRACTICE QUIZ
     ========================================================================== */
  const QUIZ_QUESTIONS = [
    {
      category: "Basics & Systems",
      question: "Which of the following systems can exchange energy with surroundings but NOT matter?",
      options: ["Open System", "Closed System", "Isolated System", "Adiabatic System"],
      correct: 1,
      explanation: "A closed system allows heat/work (energy) transfer across its boundaries while keeping matter strictly contained."
    },
    {
      category: "Temperature",
      question: "If the temperature of a gas rises by 30°C, the corresponding increase on the Kelvin scale is:",
      options: ["303.15 K", "30 K", "243.15 K", "86 K"],
      correct: 1,
      explanation: "A temperature difference of 1°C equals exactly 1 K. Hence, ΔT = 30°C corresponds to ΔT = 30 K."
    },
    {
      category: "Heat & Energy",
      question: "Heat is best defined in thermodynamics as:",
      options: [
        "The total thermal energy contained in a body",
        "Energy transferred between systems solely due to a temperature difference",
        "The average microscopic kinetic energy of particles",
        "The total internal energy of an ideal gas"
      ],
      correct: 1,
      explanation: "Heat is energy in transition across a boundary caused strictly by a temperature gradient."
    },
    {
      category: "Specific Heat",
      question: "How much heat is required to raise the temperature of 2 kg of water (c = 4200 J/kg·K) from 20°C to 50°C?",
      options: ["84,000 J", "252,000 J", "420,000 J", "126,000 J"],
      correct: 1,
      explanation: "Q = mcΔT = 2 kg × 4200 J/kg·K × (50 - 20) K = 2 × 4200 × 30 = 252,000 J (252 kJ)."
    },
    {
      category: "Latent Heat",
      question: "During the complete melting of 1 kg of ice at 0°C into water at 0°C, the temperature:",
      options: ["Increases steadily", "Remains constant", "Decreases slightly", "Doubles"],
      correct: 1,
      explanation: "Phase change occurs at constant temperature (ΔT = 0) because supplied latent heat is utilized solely to break crystal lattice bonds."
    },
    {
      category: "Zeroth Law",
      question: "The Zeroth Law of Thermodynamics establishes the physical basis for the concept of:",
      options: ["Internal Energy", "Entropy", "Temperature", "Pressure"],
      correct: 2,
      explanation: "The Zeroth Law validates the concept of temperature as the universal state variable governing thermal equilibrium."
    },
    {
      category: "First Law",
      question: "If a gas absorbs 500 J of heat and simultaneously does 200 J of external work, the change in internal energy (ΔU) is:",
      options: ["+700 J", "+300 J", "-300 J", "+2.5 J"],
      correct: 1,
      explanation: "From First Law: ΔU = Q - W = 500 J - 200 J = +300 J."
    },
    {
      category: "Internal Energy",
      question: "For an ideal gas, internal energy depends exclusively on:",
      options: ["Pressure alone", "Volume alone", "Absolute Temperature", "Container shape"],
      correct: 2,
      explanation: "In an ideal gas with zero intermolecular potential forces, internal energy is purely translational kinetic energy: U = (f/2)nRT ∝ T."
    },
    {
      category: "Work Done",
      question: "A gas expands at a constant pressure of 2 × 10⁵ N/m² from 0.01 m³ to 0.04 m³. The work done by the gas is:",
      options: ["6,000 J", "2,000 J", "8,000 J", "60,000 J"],
      correct: 0,
      explanation: "W = PΔV = (2 × 10⁵ N/m²) × (0.04 - 0.01 m³) = 2 × 10⁵ × 0.03 = 6,000 J."
    },
    {
      category: "P-V Curves",
      question: "On a Pressure-Volume (P-V) graph, mechanical work done during a process corresponds to:",
      options: ["The slope of the curve", "The y-intercept", "The area under the curve", "The curvature radius"],
      correct: 2,
      explanation: "Work W = ∫ P dV, which geometrically represents the exact area beneath the curve bounded by the volume axis."
    },
    {
      category: "Isothermal",
      question: "In an isothermal expansion of an ideal gas:",
      options: ["ΔU = 0 and Q = W", "W = 0 and Q = ΔU", "Q = 0 and ΔU = -W", "P remains constant"],
      correct: 0,
      explanation: "Because T is constant, ΔU = 0 for an ideal gas, which implies all absorbed heat is converted to work: Q = W."
    },
    {
      category: "Adiabatic",
      question: "During a rapid adiabatic expansion of a gas:",
      options: [
        "Temperature increases",
        "Temperature decreases because work is done at the expense of internal energy",
        "Heat is absorbed from the surroundings",
        "Pressure stays constant"
      ],
      correct: 1,
      explanation: "In an adiabatic process (Q = 0), ΔU = -W. Expansion (W > 0) causes ΔU < 0, resulting in gas cooling."
    },
    {
      category: "Isobaric",
      question: "In an isobaric process:",
      options: ["Pressure remains constant", "Volume remains constant", "Temperature remains constant", "No heat enters"],
      correct: 0,
      explanation: "Isobaric means constant pressure (P = constant), obeying Charles's law (V ∝ T)."
    },
    {
      category: "Isochoric",
      question: "In an isochoric process involving an ideal gas, the work done by the gas is:",
      options: ["PΔV", "nRT", "Strictly Zero", "Infinite"],
      correct: 2,
      explanation: "Isochoric means volume is constant (ΔV = 0). Since W = PΔV, work done is identically 0."
    },
    {
      category: "Cyclic Process",
      question: "For any complete thermodynamic cycle, the net change in internal energy (ΔU) is:",
      options: ["Equal to Q_H", "Equal to Work Done", "Always Zero", "Dependent on path"],
      correct: 2,
      explanation: "Internal energy is a state property. Returning to the original state implies ΔU_cycle = 0."
    },
    {
      category: "Heat Engine",
      question: "A heat engine absorbs 1000 J of heat from a hot reservoir and expels 600 J to a cold sink. Its thermal efficiency is:",
      options: ["60%", "40%", "166%", "100%"],
      correct: 1,
      explanation: "Work W = Q_H - Q_C = 1000 - 600 = 400 J. Efficiency η = W / Q_H = 400 / 1000 = 0.40 (40%)."
    },
    {
      category: "Carnot Engine",
      question: "A Carnot engine operates between source T_H = 600 K and sink T_C = 300 K. Its maximum theoretical efficiency is:",
      options: ["30%", "50%", "75%", "100%"],
      correct: 1,
      explanation: "η_Carnot = 1 - (T_C / T_H) = 1 - (300 / 600) = 1 - 0.5 = 0.50 (50%)."
    },
    {
      category: "Second Law",
      question: "The Kelvin-Planck statement of the Second Law of Thermodynamics asserts that:",
      options: [
        "Heat flows spontaneously from cold to hot bodies",
        "It is impossible to construct a 100% efficient heat engine operating in a cycle",
        "Total energy in the universe is decreasing",
        "Entropy cannot increase"
      ],
      correct: 1,
      explanation: "Kelvin-Planck states no cyclical engine can convert all absorbed heat into work without rejecting some heat to a colder sink."
    },
    {
      category: "Refrigerator",
      question: "A refrigerator extracts 1500 J of heat from its cold chamber using 500 J of electrical work. Its COP is:",
      options: ["0.33", "3.0", "4.0", "2000"],
      correct: 1,
      explanation: "COP = Q_C / W = 1500 J / 500 J = 3.0."
    },
    {
      category: "Refrigerator Room Temp",
      question: "If a working domestic refrigerator is left running with its door open in a sealed, thermally insulated room, the room temperature will:",
      options: ["Decrease steadily", "Remain perfectly unchanged", "Increase over time", "Drop to absolute zero"],
      correct: 2,
      explanation: "Total heat expelled to the room Q_H = Q_C + W exceeds heat absorbed Q_C by the compressor's electrical work W."
    },
    {
      category: "Entropy",
      question: "For a natural, spontaneous, irreversible process occurring in an isolated system, the entropy of the system:",
      options: ["Always increases", "Always decreases", "Remains zero", "Fluctuates randomly"],
      correct: 0,
      explanation: "According to the Second Law, entropy of an isolated system always increases during spontaneous processes (ΔS_total > 0)."
    },
    {
      category: "Ideal Gas Relation",
      question: "If the absolute temperature of a fixed mass of ideal gas is doubled while volume is halved, its pressure becomes:",
      options: ["Unchanged", "Doubled", "4 times initial pressure", "Halved"],
      correct: 2,
      explanation: "From PV = nRT ⟹ P = nRT/V. If T' = 2T and V' = V/2, then P' = (2T)/(V/2) = 4(T/V) = 4P."
    },
    {
      category: "P-V Slopes",
      question: "The ratio of the slope of an adiabatic curve to the slope of an isothermal curve on a P-V diagram is:",
      options: ["1.0", "γ (ratio of specific heats)", "1 / γ", "Zero"],
      correct: 1,
      explanation: "(dP/dV)_adiabatic = -γ(P/V) whereas (dP/dV)_isothermal = -P/V. The ratio is exactly γ."
    },
    {
      category: "MDCAT Trap",
      question: "Water has an unusually high specific heat capacity. A direct practical consequence of this is:",
      options: [
        "It boils at low temperatures",
        "It serves as an excellent automobile coolant and climate moderator",
        "It freezes into denser ice",
        "It cannot absorb latent heat"
      ],
      correct: 1,
      explanation: "High c (~4200 J/kg·K) allows water to absorb/store massive quantities of heat with minimal temperature change."
    },
    {
      category: "First Law Signs",
      question: "When a gas is compressed adiabatically, the signs of Q, W (work done by gas), and ΔU are respectively:",
      options: [
        "Q = 0, W < 0, ΔU > 0",
        "Q > 0, W > 0, ΔU = 0",
        "Q < 0, W < 0, ΔU < 0",
        "Q = 0, W > 0, ΔU < 0"
      ],
      correct: 0,
      explanation: "Adiabatic means Q = 0. Compression means work done BY gas is negative (W < 0). Hence ΔU = -W > 0 (internal energy and temperature increase)."
    }
  ];

  function initQuizModule() {
    let currentIdx = 0;
    let score = 0;
    const userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

    const activeView = document.getElementById('quizActiveView');
    const resultsView = document.getElementById('quizResultsView');

    const curNumEl = document.getElementById('quizCurrentNum');
    const totalNumEl = document.getElementById('quizTotalNum');
    const liveScoreEl = document.getElementById('quizLiveScore');
    const progressBar = document.getElementById('quizProgressBar');

    const catTag = document.getElementById('questionCategoryTag');
    const qText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsContainer');
    const expBox = document.getElementById('quizExplanationBox');
    const expText = document.getElementById('quizExplanationText');

    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const retryBtn = document.getElementById('retryQuizBtn');

    if (totalNumEl) totalNumEl.textContent = QUIZ_QUESTIONS.length.toString();

    function renderQuestion(idx) {
      const q = QUIZ_QUESTIONS[idx];
      if (!q) return;

      if (curNumEl) curNumEl.textContent = (idx + 1).toString();
      if (catTag) catTag.textContent = `📝 ${q.category}`;
      if (qText) qText.textContent = q.question;
      if (progressBar) progressBar.style.width = `${((idx + 1) / QUIZ_QUESTIONS.length) * 100}%`;

      if (prevBtn) prevBtn.disabled = (idx === 0);
      if (nextBtn) {
        nextBtn.textContent = (idx === QUIZ_QUESTIONS.length - 1) ? 'Finish & See Results 🏆' : 'Next Question ▶';
      }

      optionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, oIdx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
          <div class="option-letter">${letters[oIdx]}</div>
          <div>${opt}</div>
        `;

        if (userAnswers[idx] !== null) {
          btn.disabled = true;
          if (oIdx === q.correct) btn.classList.add('correct');
          if (userAnswers[idx] === oIdx && oIdx !== q.correct) btn.classList.add('wrong');
        }

        btn.addEventListener('click', () => {
          if (userAnswers[idx] !== null) return;
          userAnswers[idx] = oIdx;

          if (oIdx === q.correct) {
            score++;
            if (liveScoreEl) liveScoreEl.textContent = score.toString();
            btn.classList.add('correct');
            showToast('Correct Answer! +1', '✓');
          } else {
            btn.classList.add('wrong');
            const correctBtn = optionsGrid.children[q.correct];
            if (correctBtn) correctBtn.classList.add('correct');
            showToast('Incorrect option selected', '❌');
          }

          // Disable other options
          Array.from(optionsGrid.children).forEach(b => b.disabled = true);

          // Show explanation
          if (expBox && expText) {
            expText.textContent = q.explanation;
            expBox.style.display = 'block';
          }
        });

        optionsGrid.appendChild(btn);
      });

      if (userAnswers[idx] !== null && expBox && expText) {
        expText.textContent = q.explanation;
        expBox.style.display = 'block';
      } else if (expBox) {
        expBox.style.display = 'none';
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIdx > 0) {
          currentIdx--;
          renderQuestion(currentIdx);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIdx < QUIZ_QUESTIONS.length - 1) {
          currentIdx++;
          renderQuestion(currentIdx);
        } else {
          // Finish quiz
          showResults();
        }
      });
    }

    function showResults() {
      if (activeView) activeView.style.display = 'none';
      if (resultsView) resultsView.style.display = 'block';

      if (score > STATE.quizHighScore) {
        STATE.quizHighScore = score;
        saveState();
      }

      const scoreText = document.getElementById('resultsScoreText');
      const feedbackText = document.getElementById('resultsFeedbackText');
      const heading = document.getElementById('resultsHeading');
      const trophy = document.getElementById('resultsTrophy');

      const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
      if (scoreText) scoreText.textContent = `${score} / ${QUIZ_QUESTIONS.length} (${pct}%)`;

      if (pct >= 85) {
        if (trophy) trophy.textContent = '🏆';
        if (heading) heading.textContent = 'Phenomenal MDCAT Mastery!';
        if (feedbackText) feedbackText.textContent = 'Outstanding! You have mastered thermodynamics concepts and are fully prepared for MDCAT Physics exam day.';
      } else if (pct >= 60) {
        if (trophy) trophy.textContent = '🎖️';
        if (heading) heading.textContent = 'Solid Effort! Good Foundation.';
        if (feedbackText) feedbackText.textContent = 'Good understanding! Review the MDCAT Traps and Formula Wall cards below to convert your mistakes into top percentile marks.';
      } else {
        if (trophy) trophy.textContent = '📚';
        if (heading) heading.textContent = 'Further Practice Recommended';
        if (feedbackText) feedbackText.textContent = 'Take some time to explore the interactive simulations and P-V curve labs above, then re-take this quiz.';
      }
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        currentIdx = 0;
        score = 0;
        userAnswers.fill(null);
        if (liveScoreEl) liveScoreEl.textContent = '0';
        if (resultsView) resultsView.style.display = 'none';
        if (activeView) activeView.style.display = 'block';
        renderQuestion(0);
      });
    }

    renderQuestion(0);
  }

  /* ==========================================================================
     23. MOBILE MENU & INITIALIZATION
     ========================================================================== */
  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const isVisible = links.style.display === 'flex';
      links.style.display = isVisible ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = 'var(--navbar-height)';
      links.style.left = '0';
      links.style.width = '100%';
      links.style.background = 'var(--bg-surface)';
      links.style.padding = '1rem';
      links.style.boxShadow = 'var(--shadow-lg)';
    });
  }

  // Master Init Call
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateMasteryDashboard();
    initTopicActionButtons();
    initSearch();
    initHeroEngineCanvas();
    initSystemVisualizer();
    initTemperatureConverter();
    initHeatTransferCanvas();
    initSpecificHeatCalculator();
    initPhaseChangeCanvas();
    initZerothLawCanvas();
    initFirstLawSliders();
    initInternalEnergyCanvas();
    initPistonWorkCanvas();
    initMasterPVDiagram();
    initCyclicProcessCanvas();
    initHeatEngineSimulator();
    initRefrigeratorCalculator();
    initSecondLawInteraction();
    initEntropyCanvas();
    initIdealGasSolver();
    initVirtualLab();
    initFormulaWall();
    initMDCATTraps();
    initQuizModule();
    initMobileMenu();
  });

})();
