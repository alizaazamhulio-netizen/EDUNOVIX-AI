/* ==========================================================================
   CHEMICAL EQUILIBRIUM — MDCAT PREMIUM CHAPTER JAVASCRIPT
   Interactive Equilibrium Simulator, Rates Graph, MCQ Engine & Utilities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initTOCSpy();
  initSearch();
  initFormulaCopy();
  initNumericalsToggle();
  initConceptualAccordion();
  initEquilibriumRateCanvas();
  initQSimulator();
  initLeChatelierSimulator();
  initMCQQuiz();
  initTopicChecklist();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode) with LocalStorage
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('mdcat_chem_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('mdcat_chem_theme', newTheme);
      updateThemeIcon(newTheme);
      // Redraw canvas with new theme colors
      drawEquilibriumRates();
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

/* ==========================================================================
   2. Scroll Progress Bar & Back to Top Button
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Table of Contents & Intersection Observer Scroll Spy
   ========================================================================== */
function initTOCSpy() {
  const sections = document.querySelectorAll('.topic-section, .chapter-hero');
  const navLinks = document.querySelectorAll('.toc-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   4. Search Functionality
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('chapter-search-input');
  const resultsDropdown = document.getElementById('search-results-dropdown');
  if (!searchInput || !resultsDropdown) return;

  const searchableSections = [];
  document.querySelectorAll('.topic-section').forEach(sec => {
    const heading = sec.querySelector('.topic-heading') ? sec.querySelector('.topic-heading').innerText : '';
    const text = sec.innerText.replace(/\s+/g, ' ');
    const id = sec.getAttribute('id');
    searchableSections.push({ id, heading, text });
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) {
      resultsDropdown.innerHTML = '';
      resultsDropdown.classList.remove('active');
      return;
    }

    const matches = searchableSections.filter(item => 
      item.heading.toLowerCase().includes(query) || item.text.toLowerCase().includes(query)
    ).slice(0, 7);

    if (matches.length === 0) {
      resultsDropdown.innerHTML = `<div style="padding:0.75rem; font-size:0.85rem; color:var(--text-muted); text-align:center;">No matching topics found</div>`;
      resultsDropdown.classList.add('active');
      return;
    }

    resultsDropdown.innerHTML = matches.map(m => {
      // Extract small snippet around match
      let snippetIndex = m.text.toLowerCase().indexOf(query);
      let start = Math.max(0, snippetIndex - 30);
      let end = Math.min(m.text.length, snippetIndex + 70);
      let snippet = m.text.substring(start, end);

      return `
        <div class="search-result-item" data-target="${m.id}">
          <div class="search-result-title">${m.heading}</div>
          <div class="search-result-snippet">...${snippet}...</div>
        </div>
      `;
    }).join('');

    resultsDropdown.classList.add('active');

    resultsDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          resultsDropdown.classList.remove('active');
          searchInput.value = '';
        }
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
      resultsDropdown.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. Formula Copy Buttons
   ========================================================================== */
function initFormulaCopy() {
  document.querySelectorAll('.copy-eq-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const formulaText = btn.getAttribute('data-formula') || btn.closest('.eq-card').querySelector('.eq-display').innerText;
      navigator.clipboard.writeText(formulaText).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.style.backgroundColor = 'var(--c-solved)';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 1800);
      });
    });
  });
}

/* ==========================================================================
   6. Solved Numericals Accordion
   ========================================================================== */
function initNumericalsToggle() {
  document.querySelectorAll('.numerical-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.numerical-card');
      const body = card.querySelector('.numerical-body');
      const btn = card.querySelector('.toggle-solution-btn');
      
      const isActive = body.classList.contains('active');
      if (isActive) {
        body.classList.remove('active');
        btn.innerText = 'Show Solution';
      } else {
        body.classList.add('active');
        btn.innerText = 'Hide Solution';
      }
    });
  });
}

/* ==========================================================================
   7. Conceptual Questions Accordion
   ========================================================================== */
function initConceptualAccordion() {
  document.querySelectorAll('.concept-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.concept-item');
      const answer = item.querySelector('.concept-answer');
      const arrow = btn.querySelector('.concept-arrow');
      
      const isActive = answer.classList.contains('active');
      if (isActive) {
        answer.classList.remove('active');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.add('active');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   8. Dynamic Equilibrium Rate Graph (Canvas 2D)
   ========================================================================== */
let graphProgress = 0;
let graphAnimationId = null;

function initEquilibriumRateCanvas() {
  const canvas = document.getElementById('rate-graph-canvas');
  if (!canvas) return;

  const playBtn = document.getElementById('play-graph-btn');
  const resetBtn = document.getElementById('reset-graph-btn');

  function animate() {
    if (graphProgress < 100) {
      graphProgress += 0.5;
      drawEquilibriumRates();
      graphAnimationId = requestAnimationFrame(animate);
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      cancelAnimationFrame(graphAnimationId);
      if (graphProgress >= 100) graphProgress = 0;
      animate();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      cancelAnimationFrame(graphAnimationId);
      graphProgress = 0;
      drawEquilibriumRates();
    });
  }

  drawEquilibriumRates();
  // Auto-start visual
  animate();
}

function drawEquilibriumRates() {
  const canvas = document.getElementById('rate-graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const w = canvas.width = canvas.parentElement.clientWidth || 650;
  const h = canvas.height = 240;

  ctx.clearRect(0, 0, w, h);

  const paddingLeft = 60;
  const paddingBottom = 40;
  const paddingTop = 30;
  const paddingRight = 40;

  const plotW = w - paddingLeft - paddingRight;
  const plotH = h - paddingTop - paddingBottom;

  // Grid and Axes
  ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
  ctx.lineWidth = 1;

  // Horizontal Grid Lines
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (plotH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(w - paddingRight, y);
    ctx.stroke();
  }

  // Draw Axes
  ctx.strokeStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(paddingLeft, paddingTop);
  ctx.lineTo(paddingLeft, h - paddingBottom);
  ctx.lineTo(w - paddingRight, h - paddingBottom);
  ctx.stroke();

  // Labels
  ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillText('Time →', w - paddingRight - 40, h - paddingBottom + 25);

  ctx.save();
  ctx.translate(18, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Reaction Rate (mol/L·s)', -60, 0);
  ctx.restore();

  // Equilibrium Line Marker
  const eqTimeX = paddingLeft + plotW * 0.55;
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = isDark ? '#64748b' : '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(eqTimeX, paddingTop);
  ctx.lineTo(eqTimeX, h - paddingBottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
  ctx.fillText('Equilibrium Established', eqTimeX - 55, paddingTop - 10);
  ctx.fillText('(Rate_f = Rate_r)', eqTimeX - 40, paddingTop + 6);

  // Plot Curves based on graphProgress (0 to 100)
  const currentMaxX = paddingLeft + (plotW * (graphProgress / 100));

  // 1. Forward Reaction Rate (Starts High -> Decreases to Equilibrium Plateau)
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#0284c7'; // Blue
  ctx.beginPath();
  for (let x = paddingLeft; x <= currentMaxX; x += 2) {
    const t = (x - paddingLeft) / (plotW * 0.55);
    let rate;
    if (t <= 1) {
      rate = 0.9 - 0.45 * (1 - Math.exp(-3 * t)); // drops from 0.9 to 0.45
    } else {
      rate = 0.45; // plateau at equilibrium
    }
    const y = h - paddingBottom - (rate * plotH);
    if (x === paddingLeft) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 2. Reverse Reaction Rate (Starts Zero -> Increases to Equilibrium Plateau)
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#dc2626'; // Red
  ctx.beginPath();
  for (let x = paddingLeft; x <= currentMaxX; x += 2) {
    const t = (x - paddingLeft) / (plotW * 0.55);
    let rate;
    if (t <= 1) {
      rate = 0.0 + 0.45 * (1 - Math.exp(-3 * t)); // rises from 0 to 0.45
    } else {
      rate = 0.45; // plateau at equilibrium
    }
    const y = h - paddingBottom - (rate * plotH);
    if (x === paddingLeft) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Curve Legend
  ctx.fillStyle = '#0284c7';
  ctx.fillText('— Forward Reaction Rate (Rf)', paddingLeft + 10, paddingTop + 20);
  ctx.fillStyle = '#dc2626';
  ctx.fillText('— Reverse Reaction Rate (Rr)', paddingLeft + 10, paddingTop + 38);
}

/* ==========================================================================
   9. Reaction Quotient (Q vs K) Interactive Decision Simulator
   ========================================================================== */
function initQSimulator() {
  const qSlider = document.getElementById('sim-q-val');
  const kSlider = document.getElementById('sim-k-val');
  const qDisplay = document.getElementById('q-display-val');
  const kDisplay = document.getElementById('k-display-val');
  const outputBox = document.getElementById('q-sim-output');
  const beam = document.getElementById('q-balance-beam');

  if (!qSlider || !kSlider) return;

  function updateQSim() {
    const Q = parseFloat(qSlider.value);
    const K = parseFloat(kSlider.value);

    qDisplay.innerText = Q.toFixed(2);
    kDisplay.innerText = K.toFixed(2);

    if (Q < K) {
      outputBox.className = 'sim-output-box';
      outputBox.style.backgroundColor = 'var(--c-def-bg)';
      outputBox.style.borderColor = 'var(--c-def-border)';
      outputBox.innerHTML = `
        <strong>Condition: Q &lt; K (${Q.toFixed(2)} &lt; ${K.toFixed(2)})</strong><br>
        • Reactants are in excess; Products are deficient.<br>
        • <strong>Reaction Direction:</strong> Shifts in the <strong>FORWARD DIRECTION (→)</strong> to form more products.<br>
        • Ratio of [Products]/[Reactants] will increase until Q equals K.
      `;
      if (beam) beam.style.transform = 'rotate(-7deg)';
    } else if (Q > K) {
      outputBox.className = 'sim-output-box';
      outputBox.style.backgroundColor = 'var(--c-danger-bg)';
      outputBox.style.borderColor = 'var(--c-danger-border)';
      outputBox.innerHTML = `
        <strong>Condition: Q &gt; K (${Q.toFixed(2)} &gt; ${K.toFixed(2)})</strong><br>
        • Products are in excess; Reactants are deficient.<br>
        • <strong>Reaction Direction:</strong> Shifts in the <strong>REVERSE DIRECTION (←)</strong> to form more reactants.<br>
        • Ratio of [Products]/[Reactants] will decrease until Q equals K.
      `;
      if (beam) beam.style.transform = 'rotate(7deg)';
    } else {
      outputBox.className = 'sim-output-box';
      outputBox.style.backgroundColor = 'var(--c-solved-bg)';
      outputBox.style.borderColor = 'var(--c-solved-border)';
      outputBox.innerHTML = `
        <strong>Condition: Q = K (${Q.toFixed(2)} = ${K.toFixed(2)})</strong><br>
        • <strong>System is at Dynamic Chemical Equilibrium!</strong><br>
        • Forward rate = Reverse rate. No net shift in either direction.
      `;
      if (beam) beam.style.transform = 'rotate(0deg)';
    }
  }

  qSlider.addEventListener('input', updateQSim);
  kSlider.addEventListener('input', updateQSim);
  updateQSim();
}

/* ==========================================================================
   10. Le Chatelier's Interactive Lab Simulator
   ========================================================================== */
function initLeChatelierSimulator() {
  const reactionSelect = document.getElementById('lc-reaction-select');
  const stressSelect = document.getElementById('lc-stress-select');
  const outputBox = document.getElementById('lc-output-result');

  if (!reactionSelect || !stressSelect || !outputBox) return;

  const reactions = {
    haber: {
      eq: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) &nbsp; (ΔH = −92.4 kJ/mol, Exothermic)',
      reactMoles: 4,
      prodMoles: 2,
      isExo: true,
      name: 'Haber Process'
    },
    contact: {
      eq: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g) &nbsp; (ΔH = −198 kJ/mol, Exothermic)',
      reactMoles: 3,
      prodMoles: 2,
      isExo: true,
      name: 'SO₃ Synthesis'
    },
    no2: {
      eq: 'N₂O₄(g) [Colorless] ⇌ 2NO₂(g) [Brown] &nbsp; (ΔH = +57.2 kJ/mol, Endothermic)',
      reactMoles: 1,
      prodMoles: 2,
      isExo: false,
      name: 'Dinitrogen Tetroxide'
    },
    hi: {
      eq: 'H₂(g) + I₂(g) ⇌ 2HI(g) &nbsp; (ΔH = −9.4 kJ/mol, Δn = 0)',
      reactMoles: 2,
      prodMoles: 2,
      isExo: true,
      name: 'Hydrogen Iodide'
    }
  };

  function updateLeChatelier() {
    const rxnKey = reactionSelect.value;
    const stress = stressSelect.value;
    const rxn = reactions[rxnKey];

    let shift = '';
    let kEffect = 'Kc remains UNCHANGED (only temperature alters Kc).';
    let reason = '';
    let colorClass = 'var(--c-def-bg)';
    let borderClass = 'var(--c-def-border)';

    switch(stress) {
      case 'add_reactant':
        shift = 'SHIFTS FORWARD (→)';
        reason = 'System consumes the added reactant to restore equilibrium.';
        colorClass = 'var(--c-solved-bg)';
        borderClass = 'var(--c-solved-border)';
        break;
      case 'remove_reactant':
        shift = 'SHIFTS REVERSE (←)';
        reason = 'System decomposes products to replace lost reactants.';
        colorClass = 'var(--c-danger-bg)';
        borderClass = 'var(--c-danger-border)';
        break;
      case 'add_product':
        shift = 'SHIFTS REVERSE (←)';
        reason = 'System consumes excess product to restore equilibrium.';
        colorClass = 'var(--c-danger-bg)';
        borderClass = 'var(--c-danger-border)';
        break;
      case 'remove_product':
        shift = 'SHIFTS FORWARD (→)';
        reason = 'System produces more product to replace what was removed.';
        colorClass = 'var(--c-solved-bg)';
        borderClass = 'var(--c-solved-border)';
        break;
      case 'inc_pressure':
        if (rxn.prodMoles < rxn.reactMoles) {
          shift = 'SHIFTS FORWARD (→) toward products';
          reason = `Products have fewer gaseous moles (${rxn.prodMoles} moles vs ${rxn.reactMoles} moles). Increasing pressure shifts to side with fewer moles.`;
          colorClass = 'var(--c-solved-bg)';
          borderClass = 'var(--c-solved-border)';
        } else if (rxn.prodMoles > rxn.reactMoles) {
          shift = 'SHIFTS REVERSE (←) toward reactants';
          reason = `Reactants have fewer gaseous moles (${rxn.reactMoles} moles vs ${rxn.prodMoles} moles).`;
          colorClass = 'var(--c-danger-bg)';
          borderClass = 'var(--c-danger-border)';
        } else {
          shift = 'NO SHIFT (Equilibrium Position Unaffected)';
          reason = `Gaseous moles are equal on both sides (Δn = 0, ${rxn.reactMoles} = ${rxn.prodMoles}). Pressure changes do NOT shift equilibrium.`;
          colorClass = 'var(--c-tip-bg)';
          borderClass = 'var(--c-tip-border)';
        }
        break;
      case 'dec_pressure':
        if (rxn.prodMoles > rxn.reactMoles) {
          shift = 'SHIFTS FORWARD (→) toward products';
          reason = `Decreasing pressure (or expanding volume) shifts toward more gaseous moles (${rxn.prodMoles} moles).`;
          colorClass = 'var(--c-solved-bg)';
          borderClass = 'var(--c-solved-border)';
        } else if (rxn.prodMoles < rxn.reactMoles) {
          shift = 'SHIFTS REVERSE (←) toward reactants';
          reason = `Decreasing pressure shifts toward the side with MORE gaseous moles (${rxn.reactMoles} moles of reactants).`;
          colorClass = 'var(--c-danger-bg)';
          borderClass = 'var(--c-danger-border)';
        } else {
          shift = 'NO SHIFT';
          reason = 'Δn = 0; moles are equal on both sides.';
          colorClass = 'var(--c-tip-bg)';
          borderClass = 'var(--c-tip-border)';
        }
        break;
      case 'inc_temp':
        if (rxn.isExo) {
          shift = 'SHIFTS REVERSE (←)';
          kEffect = '⚠️ <strong>Value of Kc DECREASES!</strong> (For exothermic reactions, heating decreases K)';
          reason = 'Heat is a product in exothermic reactions. Adding heat drives reaction backward.';
          colorClass = 'var(--c-danger-bg)';
          borderClass = 'var(--c-danger-border)';
        } else {
          shift = 'SHIFTS FORWARD (→)';
          kEffect = '🌟 <strong>Value of Kc INCREASES!</strong> (For endothermic reactions, heating increases K)';
          reason = 'Heat is a reactant in endothermic reactions. Adding heat drives reaction forward.';
          colorClass = 'var(--c-solved-bg)';
          borderClass = 'var(--c-solved-border)';
        }
        break;
      case 'dec_temp':
        if (rxn.isExo) {
          shift = 'SHIFTS FORWARD (→)';
          kEffect = '🌟 <strong>Value of Kc INCREASES!</strong> (Cooling exothermic reactions increases K)';
          reason = 'System shifts forward to release heat and compensate for cooling.';
          colorClass = 'var(--c-solved-bg)';
          borderClass = 'var(--c-solved-border)';
        } else {
          shift = 'SHIFTS REVERSE (←)';
          kEffect = '⚠️ <strong>Value of Kc DECREASES!</strong> (Cooling endothermic reactions decreases K)';
          reason = 'System shifts backward to replace lost heat.';
          colorClass = 'var(--c-danger-bg)';
          borderClass = 'var(--c-danger-border)';
        }
        break;
      case 'add_catalyst':
        shift = 'NO SHIFT (No Change in Equilibrium Position)';
        kEffect = '<strong>Value of Kc is UNCHANGED!</strong>';
        reason = 'A catalyst lowers the activation energy equally for both forward and reverse pathways. It speeds up the attainment of equilibrium, but does NOT favor either side.';
        colorClass = 'var(--c-tip-bg)';
        borderClass = 'var(--c-tip-border)';
        break;
      case 'add_inert_gas_v':
        shift = 'NO SHIFT (Constant Volume)';
        reason = 'Adding an inert gas (e.g. He, Ar) at CONSTANT VOLUME increases total pressure, but partial pressures and concentrations of reacting species remain CONSTANT.';
        colorClass = 'var(--c-tip-bg)';
        borderClass = 'var(--c-tip-border)';
        break;
      case 'add_inert_gas_p':
        if (rxn.prodMoles > rxn.reactMoles) {
          shift = 'SHIFTS FORWARD (→)';
          reason = 'At CONSTANT PRESSURE, volume expands. Equilibrium shifts toward side with MORE gaseous moles.';
        } else if (rxn.prodMoles < rxn.reactMoles) {
          shift = 'SHIFTS REVERSE (←)';
          reason = 'At CONSTANT PRESSURE, volume expands. Equilibrium shifts toward side with MORE gaseous moles (reactants).';
        } else {
          shift = 'NO SHIFT (Δn = 0)';
          reason = 'Equal moles on both sides.';
        }
        colorClass = 'var(--c-tip-bg)';
        borderClass = 'var(--c-tip-border)';
        break;
    }

    outputBox.style.backgroundColor = colorClass;
    outputBox.style.borderColor = borderClass;
    outputBox.innerHTML = `
      <div style="font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">
        Reaction: ${rxn.eq}
      </div>
      <div style="margin-bottom:0.35rem;">
        <strong>Equilibrium Shift:</strong> <span style="font-weight:700; color:var(--c-accent);">${shift}</span>
      </div>
      <div style="margin-bottom:0.35rem;">
        <strong>Equilibrium Constant (Kc):</strong> ${kEffect}
      </div>
      <div style="font-size:0.875rem; color:var(--text-secondary);">
        <strong>Scientific Reason:</strong> ${reason}
      </div>
    `;
  }

  reactionSelect.addEventListener('change', updateLeChatelier);
  stressSelect.addEventListener('change', updateLeChatelier);
  updateLeChatelier();
}

/* ==========================================================================
   11. Complete 35+ MDCAT MCQ Interactive Quiz Engine
   ========================================================================== */
const mcqDatabase = [
  {
    q: "For a reversible chemical reaction, dynamic equilibrium is reached when:",
    options: [
      "The concentrations of reactants and products become exactly equal",
      "The rate of the forward reaction equals the rate of the reverse reaction",
      "All reactants are 100% converted into products",
      "The reaction completely stops and no molecules react"
    ],
    answer: 1,
    explanation: "Dynamic equilibrium is defined as the state where the rate of the forward reaction equals the rate of the reverse reaction. Concentrations remain constant, but are not necessarily equal."
  },
  {
    q: "Which of the following conditions is mandatory for establishing chemical equilibrium?",
    options: [
      "Open container exposed to atmospheric air",
      "A closed system preventing loss or gain of matter",
      "Presence of a solid heterogeneous catalyst",
      "High temperature above 500 °C"
    ],
    answer: 1,
    explanation: "Chemical equilibrium can only be achieved in a closed system where no reactant or product molecules can escape into the surroundings."
  },
  {
    q: "Why are pure solids and pure liquids omitted from the equilibrium constant expression (Kc)?",
    options: [
      "They do not take part in the chemical reaction",
      "Their concentrations (density/molar mass) remain effectively constant at constant temperature",
      "Their reaction rates are infinitely fast",
      "They always have a concentration of zero"
    ],
    answer: 1,
    explanation: "The concentration of a pure solid or liquid depends only on its density and molar mass, both of which are constant at constant temperature. Their constant values are incorporated into the equilibrium constant."
  },
  {
    q: "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what is the relationship between Kp and Kc?",
    options: [
      "Kp = Kc",
      "Kp = Kc(RT)⁻²",
      "Kp = Kc(RT)²",
      "Kp = Kc(RT)⁻¹"
    ],
    answer: 1,
    explanation: "Δng = moles of gaseous products (2) − moles of gaseous reactants (1+3 = 4) = −2. Using Kp = Kc(RT)^Δng, we get Kp = Kc(RT)⁻²."
  },
  {
    q: "If Δng = 0 for a gaseous reaction, what is the unit of Kc?",
    options: [
      "mol·dm⁻³",
      "mol⁻¹·dm³",
      "No units (dimensionless)",
      "atm⁻¹"
    ],
    answer: 2,
    explanation: "When the number of moles of gaseous products equals reactants (Δng = 0), all concentration units in the numerator and denominator cancel out, rendering Kc dimensionless."
  },
  {
    q: "A very large value of Kc (e.g. Kc = 10¹⁰) indicates that at equilibrium:",
    options: [
      "The reaction proceeds almost to completion and products are heavily favoured",
      "Only a negligible amount of product has formed",
      "The rate of forward reaction is ten billion times faster than reverse",
      "The reaction requires a catalyst to occur"
    ],
    answer: 0,
    explanation: "A large Kc indicates that the equilibrium mixture is dominated by products, meaning the forward reaction has proceeded almost to completion."
  },
  {
    q: "If the reaction quotient Q is greater than Kc (Q > Kc), what will happen to the system?",
    options: [
      "The system is already at equilibrium",
      "The reaction proceeds in the forward direction to form more products",
      "The reaction proceeds in the reverse direction to form more reactants",
      "The equilibrium constant Kc will increase to match Q"
    ],
    answer: 2,
    explanation: "When Q > Kc, the concentration of products is higher than the equilibrium ratio. To reach equilibrium, the reaction proceeds in the reverse direction."
  },
  {
    q: "What is the only factor that changes the numerical value of the equilibrium constant (Kc)?",
    options: [
      "Adding a positive catalyst",
      "Increasing the total system pressure",
      "Changing the temperature",
      "Increasing reactant concentration"
    ],
    answer: 2,
    explanation: "Temperature is the ONLY factor that alters the numerical value of Kc. Concentration, pressure, volume, and catalysts alter the equilibrium position or rate, but NOT Kc."
  },
  {
    q: "For the exothermic reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat, increasing temperature will:",
    options: [
      "Shift equilibrium to the right and increase Kc",
      "Shift equilibrium to the left and decrease Kc",
      "Shift equilibrium to the right without changing Kc",
      "Have no effect on the equilibrium position"
    ],
    answer: 1,
    explanation: "According to Le Chatelier's principle, adding heat to an exothermic reaction shifts the equilibrium in the reverse direction (left) to absorb heat, thereby decreasing Kc."
  },
  {
    q: "How does the addition of a catalyst affect a reversible system at equilibrium?",
    options: [
      "Increases the yield of products",
      "Shifts the equilibrium toward the endothermic side",
      "Increases Kc",
      "Accelerates both forward and reverse reaction rates equally without shifting the equilibrium position"
    ],
    answer: 3,
    explanation: "A catalyst lowers the activation energy equally for both forward and reverse paths. It shortens the time required to reach equilibrium but does not alter the yield or Kc."
  },
  {
    q: "For the reaction H₂(g) + I₂(g) ⇌ 2HI(g), what happens if the volume of the vessel is reduced by half?",
    options: [
      "Equilibrium shifts to the right",
      "Equilibrium shifts to the left",
      "Equilibrium position remains unaffected because Δng = 0",
      "Kc decreases by a factor of 2"
    ],
    answer: 2,
    explanation: "Here, gaseous moles on left = 2 and on right = 2 (Δng = 0). Since there is no difference in gaseous moles, pressure/volume changes do not shift the equilibrium position."
  },
  {
    q: "What are the optimal industrial conditions for the Haber process (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92.4 kJ/mol)?",
    options: [
      "Low pressure (1 atm), high temperature (1000 °C)",
      "High pressure (200 atm), optimum temperature (400–450 °C), and Fe catalyst",
      "Low pressure (1 atm), low temperature (0 °C), and no catalyst",
      "High pressure (500 atm), room temperature (25 °C)"
    ],
    answer: 1,
    explanation: "High pressure (200 atm) favors ammonia yield (4 moles → 2 moles). A compromise temperature of 400–450 °C with iron catalyst gives an acceptable yield in a reasonable reaction time."
  },
  {
    q: "When an inert gas is added to an equilibrium mixture at CONSTANT VOLUME:",
    options: [
      "Equilibrium shifts toward fewer moles",
      "Equilibrium shifts toward more moles",
      "Equilibrium position and Kc remain completely unchanged",
      "Kc increases significantly"
    ],
    answer: 2,
    explanation: "At constant volume, the partial pressures and molar concentrations of the reacting gases do not change, so the equilibrium position remains completely unaffected."
  },
  {
    q: "For the reaction PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), the unit of Kc is:",
    options: [
      "mol·dm⁻³",
      "mol⁻¹·dm³",
      "mol²·dm⁻⁶",
      "Dimensionless"
    ],
    answer: 0,
    explanation: "Kc = [PCl₃][Cl₂] / [PCl₅] = (mol·dm⁻³)(mol·dm⁻³) / (mol·dm⁻³) = mol·dm⁻³."
  },
  {
    q: "What happens to the equilibrium 2NO₂(g) [Brown] ⇌ N₂O₄(g) [Colorless] (ΔH = −57.2 kJ/mol) when placed in an ice bath?",
    options: [
      "The brown color intensifies because it shifts left",
      "The mixture becomes paler (less colored) because it shifts right",
      "The equilibrium constant decreases",
      "NO₂ gas decomposes into N₂ and O₂"
    ],
    answer: 1,
    explanation: "The forward reaction is exothermic. Lowering the temperature (ice bath) shifts the equilibrium in the forward exothermic direction, forming more colorless N₂O₄ and making the mixture paler."
  },
  {
    q: "In which of the following reactions is Kp equal to Kc?",
    options: [
      "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
      "H₂(g) + Cl₂(g) ⇌ 2HCl(g)",
      "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)"
    ],
    answer: 2,
    explanation: "Kp = Kc(RT)^Δng. For H₂ + Cl₂ ⇌ 2HCl, Δng = 2 − (1+1) = 0. Therefore, (RT)⁰ = 1, so Kp = Kc."
  },
  {
    q: "According to the Law of Mass Action, the rate of a chemical reaction is directly proportional to:",
    options: [
      "The total volume of the reaction container",
      "The product of the active masses (molar concentrations) of reacting substances raised to powers of their coefficients",
      "The molecular weight of the products",
      "The atmospheric pressure outside the vessel"
    ],
    answer: 1,
    explanation: "Formulated by Guldberg and Waage (1864), the Law of Mass Action states that the rate of a reaction is directly proportional to the product of the active masses of the reactants."
  },
  {
    q: "For a heterogeneous equilibrium: CaCO₃(s) ⇌ CaO(s) + CO₂(g), the equilibrium constant Kc is equal to:",
    options: [
      "[CaO][CO₂] / [CaCO₃]",
      "[CO₂]",
      "[CaCO₃] / [CaO]",
      "1 / [CO₂]"
    ],
    answer: 1,
    explanation: "Because CaCO₃(s) and CaO(s) are pure solids, their concentrations are constant and incorporated into Kc. Thus, Kc = [CO₂] and Kp = P_CO₂."
  },
  {
    q: "If the value of Kc for N₂ + 3H₂ ⇌ 2NH₃ is K₁, what is the value of Kc for NH₃ ⇌ 1/2 N₂ + 3/2 H₂?",
    options: [
      "K₁",
      "1 / K₁",
      "1 / √(K₁)",
      "√(K₁)"
    ],
    answer: 2,
    explanation: "Reversing the reaction inverts Kc (1/K₁). Halving the stoichiometric coefficients takes the square root of the equilibrium constant. Thus, K_new = (1/K₁)^(1/2) = 1/√(K₁)."
  },
  {
    q: "When 1 mole of N₂ and 3 moles of H₂ are reacted in a 1 dm³ vessel, at equilibrium 0.5 mole of NH₃ is formed. What are the equilibrium moles of N₂?",
    options: [
      "0.75 mol",
      "0.50 mol",
      "0.25 mol",
      "1.00 mol"
    ],
    answer: 0,
    explanation: "From stoichiometry: N₂ + 3H₂ ⇌ 2NH₃. Formation of 0.5 mol NH₃ requires (0.5 / 2) = 0.25 mol N₂. Remaining N₂ = 1.00 − 0.25 = 0.75 mol."
  },
  {
    q: "The units of Kp for the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) in terms of atmospheres are:",
    options: [
      "atm",
      "atm⁻¹",
      "atm⁻²",
      "atm²"
    ],
    answer: 2,
    explanation: "Kp = (P_NH₃)² / (P_N₂ · P_H₂³) = atm² / (atm · atm³) = atm⁻²."
  },
  {
    q: "If an endothermic reaction has Kc = 1.5 × 10⁻³ at 300 K, what will happen to Kc at 500 K?",
    options: [
      "Kc will decrease",
      "Kc will increase (become greater than 1.5 × 10⁻³)",
      "Kc will remain exactly 1.5 × 10⁻³",
      "Kc will drop to zero"
    ],
    answer: 1,
    explanation: "For an endothermic reaction (heat absorbed), increasing temperature shifts the equilibrium forward, resulting in a higher concentration of products and thus an increased Kc."
  },
  {
    q: "What is the effect of increasing total pressure on the equilibrium: C(s) + CO₂(g) ⇌ 2CO(g)?",
    options: [
      "Shifts to the right",
      "Shifts to the left (toward reactants)",
      "No shift because carbon is a solid",
      "Kc doubles"
    ],
    answer: 1,
    explanation: "Counting gaseous moles only: Reactant side has 1 mole CO₂(g); product side has 2 moles CO(g). Increasing pressure shifts equilibrium to the side with fewer gaseous moles (left)."
  },
  {
    q: "Which of the following statements about equilibrium state is INCORRECT?",
    options: [
      "Equilibrium can be approached from either the reactant side or product side",
      "At equilibrium, macroscopic properties like color, density, and pressure remain constant",
      "Equilibrium can only occur in an open vessel",
      "Free energy change ΔG at equilibrium is equal to zero"
    ],
    answer: 2,
    explanation: "Statement C is false. Equilibrium requires a closed vessel; in an open vessel, gaseous species escape and equilibrium cannot be established."
  },
  {
    q: "The expression Kp = Kc(RT)^Δng applies when partial pressures are in atm and R is:",
    options: [
      "8.314 J·K⁻¹·mol⁻¹",
      "0.0821 dm³·atm·K⁻¹·mol⁻¹",
      "1.987 cal·K⁻¹·mol⁻¹",
      "62.4 dm³·mmHg·K⁻¹·mol⁻¹"
    ],
    answer: 1,
    explanation: "When pressure is measured in atmospheres (atm) and volume in dm³ (liters), the gas constant R = 0.0821 dm³·atm·K⁻¹·mol⁻¹ must be used."
  },
  {
    q: "For the reaction 2A(g) + B(g) ⇌ 3C(g), the value of Δng is:",
    options: [
      "0",
      "+1",
      "−1",
      "+3"
    ],
    answer: 0,
    explanation: "Δng = moles of gaseous products (3) − moles of gaseous reactants (2 + 1 = 3) = 3 − 3 = 0."
  },
  {
    q: "If Kc for a reaction is 4.0, what is the equilibrium constant for the reverse reaction?",
    options: [
      "4.0",
      "0.25",
      "−4.0",
      "2.0"
    ],
    answer: 1,
    explanation: "Kc(reverse) = 1 / Kc(forward) = 1 / 4.0 = 0.25."
  },
  {
    q: "At 1000 K, the value of Kp for reaction 2SO₃(g) ⇌ 2SO₂(g) + O₂(g) is greater than Kc. This is because:",
    options: [
      "Δng is positive (+1)",
      "Δng is negative (−1)",
      "The reaction is exothermic",
      "A catalyst was used"
    ],
    answer: 0,
    explanation: "Δng = (2+1) − 2 = +1. Since Kp = Kc(RT)¹ and at 1000 K the term (RT) = (0.0821 × 1000) = 82.1 > 1, Kp is greater than Kc."
  },
  {
    q: "In the Contact Process, the catalyst used in the conversion of SO₂ to SO₃ is:",
    options: [
      "Finely divided Iron (Fe)",
      "Vanadium pentoxide (V₂O₅)",
      "Nickel (Ni)",
      "Platinum black"
    ],
    answer: 1,
    explanation: "Vanadium pentoxide (V₂O₅) at 450 °C is the modern industrial catalyst used in the Contact Process for converting SO₂ to SO₃."
  },
  {
    q: "If pure water has [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M at 25 °C, what is the value of ionic product Kw?",
    options: [
      "1.0 × 10⁻¹⁴ mol²·dm⁻⁶",
      "1.0 × 10⁻⁷ mol·dm⁻³",
      "1.0 × 10⁷",
      "14"
    ],
    answer: 0,
    explanation: "Kw = [H⁺][OH⁻] = (1.0 × 10⁻⁷)(1.0 × 10⁻⁷) = 1.0 × 10⁻¹⁴ mol²·dm⁻⁶ at 25 °C."
  },
  {
    q: "What is the effect of doubling the concentration of all reactants and products in a system at equilibrium?",
    options: [
      "Kc changes proportionally",
      "The system may shift if the stoichiometric coefficients of reactants and products are unequal",
      "Kc is squared",
      "The reaction stops completely"
    ],
    answer: 1,
    explanation: "Doubling all concentrations corresponds to reducing the container volume by half. If Δng ≠ 0, the system shifts according to Le Chatelier's principle, but Kc remains constant."
  },
  {
    q: "For an endothermic reaction at equilibrium, removing heat causes:",
    options: [
      "A shift in the forward direction",
      "A shift in the reverse direction and a decrease in Kc",
      "An increase in Kc",
      "No change"
    ],
    answer: 1,
    explanation: "Removing heat from an endothermic reaction forces the system to shift backward to replace the lost thermal energy, decreasing the value of Kc."
  },
  {
    q: "Which of the following is true regarding a system at dynamic equilibrium?",
    options: [
      "Matter continuously exchanges with the surroundings",
      "Forward and reverse reactions occur at equal non-zero rates",
      "Concentrations of reactants and products are always equal to 1 M",
      "The reaction has reached a static standstill"
    ],
    answer: 1,
    explanation: "Dynamic equilibrium means both forward and reverse processes continue unceasingly at equal rates; the molecular movement never stops."
  },
  {
    q: "When 0.1 mol of A and 0.1 mol of B are mixed in a 1 dm³ vessel, reaction A + B ⇌ C + D occurs. At equilibrium [C] = 0.06 M. What is Kc?",
    options: [
      "2.25",
      "0.36",
      "1.50",
      "0.16"
    ],
    answer: 0,
    explanation: "At equilibrium: [C] = 0.06, [D] = 0.06. Remaining [A] = 0.1 − 0.06 = 0.04 M, [B] = 0.1 − 0.06 = 0.04 M. Kc = (0.06 × 0.06) / (0.04 × 0.04) = 0.0036 / 0.0016 = 2.25."
  },
  {
    q: "What happens when an inert gas is added at CONSTANT PRESSURE to an equilibrium with Δng > 0 (e.g. PCl₅ ⇌ PCl₃ + Cl₂)?",
    options: [
      "Equilibrium shifts forward (right)",
      "Equilibrium shifts reverse (left)",
      "No shift occurs",
      "Kc increases"
    ],
    answer: 0,
    explanation: "Adding inert gas at constant pressure expands the vessel volume, reducing partial pressures of reactants and products. The system shifts toward the side with more gaseous moles (forward)."
  }
];

let currentMCQIndex = 0;
let userAnswers = new Array(mcqDatabase.length).fill(null);
let score = 0;

function initMCQQuiz() {
  const qText = document.getElementById('mcq-q-text');
  const optionsList = document.getElementById('mcq-options-container');
  const expCard = document.getElementById('mcq-explanation-box');
  const counterText = document.getElementById('mcq-counter-text');
  const progressFill = document.getElementById('quiz-progress-fill');
  const scoreDisplay = document.getElementById('quiz-score-num');
  const prevBtn = document.getElementById('mcq-prev-btn');
  const nextBtn = document.getElementById('mcq-next-btn');
  const restartBtn = document.getElementById('mcq-restart-btn');

  if (!qText || !optionsList) return;

  function renderQuestion(index) {
    const qData = mcqDatabase[index];
    counterText.innerText = `Question ${index + 1} of ${mcqDatabase.length}`;
    qText.innerText = qData.q;
    progressFill.style.width = `${((index + 1) / mcqDatabase.length) * 100}%`;

    const prefixes = ['A', 'B', 'C', 'D'];
    optionsList.innerHTML = qData.options.map((opt, i) => {
      let extraClass = '';
      if (userAnswers[index] !== null) {
        if (i === qData.answer) extraClass = 'correct';
        else if (userAnswers[index] === i) extraClass = 'wrong';
      }
      const disabled = userAnswers[index] !== null ? 'disabled' : '';
      return `
        <button class="mcq-option-btn ${extraClass}" data-idx="${i}" ${disabled}>
          <span class="option-prefix">${prefixes[i]}</span>
          <span>${opt}</span>
        </button>
      `;
    }).join('');

    if (userAnswers[index] !== null) {
      expCard.innerHTML = `
        <div style="font-weight:700; color:${userAnswers[index] === qData.answer ? 'var(--c-solved)' : 'var(--c-danger)'}; margin-bottom:0.35rem;">
          ${userAnswers[index] === qData.answer ? '✓ Correct Answer!' : '✗ Incorrect Choice'}
        </div>
        <div><strong>Correct Option:</strong> ${prefixes[qData.answer]} — ${qData.options[qData.answer]}</div>
        <div style="margin-top:0.4rem;"><strong>Explanation:</strong> ${qData.explanation}</div>
      `;
      expCard.classList.add('active');
    } else {
      expCard.classList.remove('active');
    }

    // Attach option click handlers
    optionsList.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (userAnswers[index] !== null) return;
        const selectedIdx = parseInt(btn.getAttribute('data-idx'));
        userAnswers[index] = selectedIdx;
        if (selectedIdx === qData.answer) {
          score++;
          scoreDisplay.innerText = `${score} / ${mcqDatabase.length}`;
        }
        renderQuestion(index);
      });
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === mcqDatabase.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentMCQIndex > 0) {
      currentMCQIndex--;
      renderQuestion(currentMCQIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentMCQIndex < mcqDatabase.length - 1) {
      currentMCQIndex++;
      renderQuestion(currentMCQIndex);
    }
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentMCQIndex = 0;
      userAnswers = new Array(mcqDatabase.length).fill(null);
      score = 0;
      scoreDisplay.innerText = `0 / ${mcqDatabase.length}`;
      renderQuestion(0);
    });
  }

  renderQuestion(0);
}

/* ==========================================================================
   12. Topic Completion Checklist (LocalStorage)
   ========================================================================== */
function initTopicChecklist() {
  const savedCompleted = JSON.parse(localStorage.getItem('mdcat_chem_completed') || '[]');
  const completedCountEl = document.getElementById('completed-topics-count');

  function updateCount() {
    const checks = document.querySelectorAll('.toc-check.completed');
    if (completedCountEl) {
      completedCountEl.innerText = `${checks.length}/44 Completed`;
    }
  }

  document.querySelectorAll('.toc-check').forEach(check => {
    const topicId = check.getAttribute('data-topic');
    if (savedCompleted.includes(topicId)) {
      check.classList.add('completed');
      check.innerText = '✓';
    } else {
      check.innerText = '○';
    }

    check.addEventListener('click', (e) => {
      e.stopPropagation();
      check.classList.toggle('completed');
      const isDone = check.classList.contains('completed');
      check.innerText = isDone ? '✓' : '○';

      let currentList = JSON.parse(localStorage.getItem('mdcat_chem_completed') || '[]');
      if (isDone) {
        if (!currentList.includes(topicId)) currentList.push(topicId);
      } else {
        currentList = currentList.filter(id => id !== topicId);
      }
      localStorage.setItem('mdcat_chem_completed', JSON.stringify(currentList));
      updateCount();
    });
  });

  updateCount();
}
