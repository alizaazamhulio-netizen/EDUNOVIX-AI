/**
 * MDCAT Waves Master - Educational Physics Module
 * Complete Interactive Logic & Canvas Physics Engines
 */

(function () {
  'use strict';

  // --- STATE & PERSISTENCE ---
  const STORAGE_KEY_THEME = 'mdcat_waves_theme';
  const STORAGE_KEY_PROGRESS = 'mdcat_waves_progress';
  const STORAGE_KEY_BOOKMARKS = 'mdcat_waves_bookmarks';
  const STORAGE_KEY_QUIZ = 'mdcat_waves_quiz_state';

  let completedSections = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || '[]');
  let bookmarkedSections = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]');

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEY_THEME, newTheme);
        updateThemeIcon(newTheme);
        showToast(`Theme switched to ${newTheme} mode`);
      });
    }
  }

  function updateThemeIcon(theme) {
    const iconEl = document.getElementById('theme-icon');
    if (iconEl) {
      iconEl.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-400)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  // --- PROGRESS & STUDY CONTROLS ---
  function updateProgressUI() {
    const sections = document.querySelectorAll('.section-block');
    const total = sections.length || 18;
    const count = completedSections.length;
    const percentage = Math.min(100, Math.round((count / total) * 100));

    const progressFill = document.getElementById('overall-progress-fill');
    const progressText = document.getElementById('overall-progress-text');
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.innerText = `${count} / ${total} completed (${percentage}%)`;

    sections.forEach((sec) => {
      const id = sec.id;
      const completeBtn = sec.querySelector('.btn-mark-complete');
      if (completeBtn) {
        if (completedSections.includes(id)) {
          completeBtn.classList.add('btn-primary');
          completeBtn.classList.remove('btn-secondary');
          completeBtn.innerHTML = `✓ Completed`;
        } else {
          completeBtn.classList.remove('btn-primary');
          completeBtn.classList.add('btn-secondary');
          completeBtn.innerHTML = `✓ Mark Done`;
        }
      }

      const bookmarkBtn = sec.querySelector('.btn-bookmark');
      if (bookmarkBtn) {
        if (bookmarkedSections.includes(id)) {
          bookmarkBtn.innerHTML = `⭐ Saved`;
          bookmarkBtn.style.borderColor = 'var(--amber-400)';
          bookmarkBtn.style.color = 'var(--amber-400)';
        } else {
          bookmarkBtn.innerHTML = `⭐ Bookmark`;
          bookmarkBtn.style.borderColor = '';
          bookmarkBtn.style.color = '';
        }
      }
    });
  }

  function initSectionControls() {
    document.querySelectorAll('.section-block').forEach((section) => {
      const id = section.id;
      if (!id) return;

      const completeBtn = section.querySelector('.btn-mark-complete');
      if (completeBtn) {
        completeBtn.addEventListener('click', () => {
          if (completedSections.includes(id)) {
            completedSections = completedSections.filter((item) => item !== id);
            showToast(`Marked "${id}" as incomplete`);
          } else {
            completedSections.push(id);
            showToast(`Section completed! Keep going!`);
          }
          localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(completedSections));
          updateProgressUI();
        });
      }

      const bookmarkBtn = section.querySelector('.btn-bookmark');
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
          if (bookmarkedSections.includes(id)) {
            bookmarkedSections = bookmarkedSections.filter((item) => item !== id);
            showToast(`Bookmark removed`);
          } else {
            bookmarkedSections.push(id);
            showToast(`Saved to bookmarks!`);
          }
          localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedSections));
          updateProgressUI();
        });
      }
    });
    updateProgressUI();
  }

  // --- STICKY NAVIGATION ACTIVE HIGHLIGHT ---
  function initNavObserver() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-block, .hero-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
                link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // --- SEARCH FILTER FUNCTIONALITY ---
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll('.section-block');

      if (!query) {
        sections.forEach((s) => (s.style.display = ''));
        return;
      }

      let matches = 0;
      sections.forEach((sec) => {
        const text = sec.innerText.toLowerCase();
        if (text.includes(query)) {
          sec.style.display = '';
          matches++;
        } else {
          sec.style.display = 'none';
        }
      });
    });
  }

  // --- CLIPBOARD COPY FORMULA ---
  function initCopyButtons() {
    document.querySelectorAll('.copy-formula-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const formula = btn.getAttribute('data-formula') || btn.innerText;
        navigator.clipboard.writeText(formula).then(() => {
          showToast(`Copied formula: ${formula}`);
        }).catch(() => {
          showToast(`Formula: ${formula}`);
        });
      });
    });
  }

  // =========================================================================
  // CANVAS PHYSICS ENGINES & ANIMATIONS
  // =========================================================================

  // 1. HERO SINE WAVE VISUALIZER
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    let amplitude = 40;
    let frequency = 0.015;
    let speed = 0.04;

    const ampInput = document.getElementById('hero-amplitude-slider');
    const freqInput = document.getElementById('hero-frequency-slider');
    const speedInput = document.getElementById('hero-speed-slider');

    if (ampInput) ampInput.addEventListener('input', (e) => amplitude = parseFloat(e.target.value));
    if (freqInput) freqInput.addEventListener('input', (e) => frequency = parseFloat(e.target.value));
    if (speedInput) speedInput.addEventListener('input', (e) => speed = parseFloat(e.target.value));

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 800;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio || 220;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += speed;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw Grid / Center Equilibrium line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1 * scale;
      ctx.setLineDash([6 * scale, 6 * scale]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Wave 2 (Harmonic background glow)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.lineWidth = 2 * scale;
      for (let x = 0; x < w; x += 3) {
        const y = centerY + Math.sin(x * (frequency * 0.75) - time * 0.8) * (amplitude * scale * 0.7);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Main Primary Wave
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5 * scale;
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 12 * scale;

      let crestX = -1;
      let troughX = -1;
      let crestY = centerY;
      let troughY = centerY;

      for (let x = 0; x < w; x += 2) {
        const y = centerY + Math.sin(x * frequency - time) * (amplitude * scale);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // Find key points for markers near center
        if (x > w * 0.25 && x < w * 0.45 && crestX === -1 && y < centerY - amplitude * scale * 0.95) {
          crestX = x;
          crestY = y;
        }
        if (x > w * 0.55 && x < w * 0.75 && troughX === -1 && y > centerY + amplitude * scale * 0.95) {
          troughX = x;
          troughY = y;
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw Key Educational Markers (Crest, Trough, Amplitude, Wavelength)
      if (crestX !== -1) {
        // Crest Marker
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(crestX, crestY, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('CREST (Max + Displacement)', crestX - 60 * scale, crestY - 10 * scale);

        // Amplitude Guide
        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5 * scale;
        ctx.moveTo(crestX + 40 * scale, centerY);
        ctx.lineTo(crestX + 40 * scale, crestY);
        ctx.stroke();
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Amplitude (A)', crestX + 46 * scale, centerY - (amplitude * scale) / 2);
      }

      if (troughX !== -1) {
        // Trough Marker
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(troughX, troughY, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('TROUGH (Max - Displacement)', troughX - 60 * scale, troughY + 20 * scale);
      }

      // Wavelength Guide line if wavelength fits
      const wavelengthPx = (2 * Math.PI) / frequency;
      if (crestX !== -1 && crestX + wavelengthPx < w) {
        const nextCrestX = crestX + wavelengthPx;
        ctx.beginPath();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5 * scale;
        ctx.setLineDash([4 * scale, 3 * scale]);
        ctx.moveTo(crestX, crestY - 24 * scale);
        ctx.lineTo(nextCrestX, crestY - 24 * scale);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#34d399';
        ctx.fillText(`Wavelength (λ)`, (crestX + nextCrestX) / 2 - 35 * scale, crestY - 30 * scale);
      }

      animationFrameId = requestAnimationFrame(render);
    }
    render();
  }

  // 2. TRANSVERSE VS LONGITUDINAL INTERACTIVE TOGGLE
  function initWaveTypeInteractive() {
    const canvas = document.getElementById('wave-type-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let currentMode = 'transverse';
    let time = 0;

    const btnTransverse = document.getElementById('btn-type-transverse');
    const btnLongitudinal = document.getElementById('btn-type-longitudinal');
    const labelExplanation = document.getElementById('wave-type-explanation');

    if (btnTransverse && btnLongitudinal) {
      btnTransverse.addEventListener('click', () => {
        currentMode = 'transverse';
        btnTransverse.classList.add('active');
        btnLongitudinal.classList.remove('active');
        if (labelExplanation) {
          labelExplanation.innerHTML = `<strong>Transverse Wave:</strong> Particles oscillate <strong>perpendicular (90°)</strong> to wave propagation. Features: <em>Crest, Trough, Amplitude, Wavelength</em>. Examples: Light, EM Waves, Wave on String.`;
        }
      });
      btnLongitudinal.addEventListener('click', () => {
        currentMode = 'longitudinal';
        btnLongitudinal.classList.add('active');
        btnTransverse.classList.remove('active');
        if (labelExplanation) {
          labelExplanation.innerHTML = `<strong>Longitudinal Wave:</strong> Particles oscillate <strong>parallel (0°/180°)</strong> to wave propagation. Features: <em>Compressions (High Density/Pressure), Rarefactions (Low Density/Pressure)</em>. Example: Sound waves in air.`;
        }
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 180 * window.devicePixelRatio || 180;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, w, h);

      if (currentMode === 'transverse') {
        const centerY = h / 2;
        const numParticles = Math.floor(w / (18 * scale));
        const spacing = w / numParticles;

        // Draw connecting string line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2 * scale;
        for (let i = 0; i <= numParticles; i++) {
          const x = i * spacing;
          const y = centerY + Math.sin(i * 0.35 - time) * (38 * scale);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw individual oscillating particles
        for (let i = 0; i <= numParticles; i++) {
          const x = i * spacing;
          const y = centerY + Math.sin(i * 0.35 - time) * (38 * scale);

          ctx.beginPath();
          // Highlight test particle
          if (i === Math.floor(numParticles / 2)) {
            ctx.fillStyle = '#f59e0b';
            ctx.arc(x, y, 7 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Vibration Arrow
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2 * scale;
            ctx.beginPath();
            ctx.moveTo(x, y - 20 * scale);
            ctx.lineTo(x, y + 20 * scale);
            ctx.stroke();
          } else {
            ctx.fillStyle = '#38bdf8';
            ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Overlay labels
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Direction of Wave Energy  ➔', w * 0.05, 24 * scale);
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('↕ Particle Vibration (Perpendicular)', w * 0.4, h - 14 * scale);

      } else {
        // LONGITUDINAL SIMULATION (Particles forming compressions and rarefactions)
        const centerY = h / 2;
        const rows = 5;
        const cols = 50;

        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Direction of Wave Energy  ➔', w * 0.05, 22 * scale);

        for (let r = 0; r < rows; r++) {
          const y = centerY + (r - (rows - 1) / 2) * (18 * scale);
          for (let c = 0; c < cols; c++) {
            const baseX = (c / cols) * w;
            const displacement = Math.sin((c / cols) * Math.PI * 4 - time) * (20 * scale);
            const x = baseX + displacement;

            ctx.beginPath();
            if (r === 2 && c === 25) {
              ctx.fillStyle = '#f59e0b';
              ctx.arc(x, y, 5 * scale, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
              ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Labels for compression and rarefaction
        ctx.fillStyle = '#34d399';
        ctx.fillText('COMPRESSION (High Density)', w * 0.12, h - 14 * scale);
        ctx.fillStyle = '#fb7185';
        ctx.fillText('RAREFACTION (Low Density)', w * 0.58, h - 14 * scale);
      }

      requestAnimationFrame(render);
    }
    render();
  }

  // 3. WAVE EQUATION CALCULATOR (v = f * lambda)
  function initWaveCalculator() {
    const inputF = document.getElementById('calc-f');
    const inputLambda = document.getElementById('calc-lambda');
    const inputV = document.getElementById('calc-v');
    const resultBox = document.getElementById('calc-result-box');
    const btnCalculate = document.getElementById('calc-btn-compute');
    const btnReset = document.getElementById('calc-btn-reset');
    const presetBtns = document.querySelectorAll('.calc-preset-btn');

    function compute() {
      const f = parseFloat(inputF.value);
      const lambda = parseFloat(inputLambda.value);
      const v = parseFloat(inputV.value);

      let formulaUsed = '';
      let steps = '';
      let answer = '';

      if (!isNaN(f) && !isNaN(lambda) && isNaN(v)) {
        // Calculate velocity
        const computedV = f * lambda;
        formulaUsed = 'v = f × λ';
        steps = `v = (${f} Hz) × (${lambda} m)<br>v = ${computedV.toFixed(2)} m/s`;
        answer = `Wave Speed (v) = <strong>${computedV.toFixed(2)} m/s</strong>`;
        inputV.value = computedV.toFixed(2);
      } else if (!isNaN(v) && !isNaN(f) && isNaN(lambda)) {
        // Calculate wavelength
        if (f === 0) {
          showToast('Frequency cannot be zero!');
          return;
        }
        const computedLambda = v / f;
        formulaUsed = 'λ = v / f';
        steps = `λ = (${v} m/s) / (${f} Hz)<br>λ = ${computedLambda.toFixed(4)} m`;
        answer = `Wavelength (λ) = <strong>${computedLambda.toFixed(4)} m</strong>`;
        inputLambda.value = computedLambda.toFixed(4);
      } else if (!isNaN(v) && !isNaN(lambda) && isNaN(f)) {
        // Calculate frequency
        if (lambda === 0) {
          showToast('Wavelength cannot be zero!');
          return;
        }
        const computedF = v / lambda;
        formulaUsed = 'f = v / λ';
        steps = `f = (${v} m/s) / (${lambda} m)<br>f = ${computedF.toFixed(2)} Hz`;
        answer = `Frequency (f) = <strong>${computedF.toFixed(2)} Hz</strong>`;
        inputF.value = computedF.toFixed(2);
      } else if (!isNaN(f) && !isNaN(lambda) && !isNaN(v)) {
        // All filled -> verify or recalculate speed
        const computedV = f * lambda;
        formulaUsed = 'v = f × λ (Verification)';
        steps = `Expected v = ${f} × ${lambda} = ${computedV.toFixed(2)} m/s<br>Your entered v = ${v} m/s`;
        answer = Math.abs(computedV - v) < 0.01
          ? `✓ Values match correctly! Speed = <strong>${v} m/s</strong>`
          : `⚠️ Recalculated: Speed should be <strong>${computedV.toFixed(2)} m/s</strong>`;
      } else {
        showToast('Please enter any 2 values to calculate the 3rd!');
        return;
      }

      if (resultBox) {
        resultBox.innerHTML = `
          <div class="solution-title">Calculation Result & Steps</div>
          <div style="font-size:1.1rem; color:var(--cyan-400); margin-bottom:8px;">${answer}</div>
          <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:4px;"><strong>Formula:</strong> ${formulaUsed}</div>
          <div class="solution-math">${steps}</div>
        `;
      }
    }

    if (btnCalculate) btnCalculate.addEventListener('click', compute);

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        inputF.value = '';
        inputLambda.value = '';
        inputV.value = '';
        if (resultBox) {
          resultBox.innerHTML = `
            <div class="solution-title">Status</div>
            <div style="color:var(--text-secondary);">Enter any two parameters and click Calculate.</div>
          `;
        }
        showToast('Calculator reset.');
      });
    }

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pf = btn.getAttribute('data-f');
        const pl = btn.getAttribute('data-l');
        const pv = btn.getAttribute('data-v');
        inputF.value = pf || '';
        inputLambda.value = pl || '';
        inputV.value = pv || '';
        compute();
      });
    });
  }

  // 4. SUPERPOSITION & INTERFERENCE SIMULATOR
  function initSuperpositionCanvas() {
    const canvas = document.getElementById('superposition-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;
    let phaseShift = 0; // in radians

    const phaseSlider = document.getElementById('superposition-phase-slider');
    const phaseLabel = document.getElementById('superposition-phase-label');

    if (phaseSlider) {
      phaseSlider.addEventListener('input', (e) => {
        phaseShift = parseFloat(e.target.value);
        if (phaseLabel) {
          const deg = Math.round((phaseShift * 180) / Math.PI);
          phaseLabel.innerText = `${deg}° (${deg === 0 ? 'Constructive (In-Phase)' : deg === 180 ? 'Destructive (Out-of-Phase)' : 'Partial'})`;
        }
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 200 * window.devicePixelRatio || 200;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Baseline
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      const k = 0.02;
      const amp = 24 * scale;

      // Wave 1 (Blue)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5 * scale;
      for (let x = 0; x < w; x += 3) {
        const y = centerY + Math.sin(x * k - time) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2 (Purple with Phase Shift)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
      ctx.lineWidth = 1.5 * scale;
      for (let x = 0; x < w; x += 3) {
        const y = centerY + Math.sin(x * k - time + phaseShift) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Resultant Superposition Wave (Cyan Glowing)
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3 * scale;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10 * scale;
      for (let x = 0; x < w; x += 3) {
        const y1 = Math.sin(x * k - time) * amp;
        const y2 = Math.sin(x * k - time + phaseShift) * amp;
        const y = centerY + (y1 + y2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Legend
      ctx.font = `bold ${10 * scale}px sans-serif`;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText('━ Wave 1 (y₁)', 16 * scale, 22 * scale);
      ctx.fillStyle = 'rgba(192, 132, 252, 0.9)';
      ctx.fillText('━ Wave 2 (y₂)', 110 * scale, 22 * scale);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('━ Resultant: y = y₁ + y₂', 210 * scale, 22 * scale);

      requestAnimationFrame(render);
    }
    render();
  }

  // 5. STANDING WAVES SIMULATOR
  function initStandingWaveCanvas() {
    const canvas = document.getElementById('standing-wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;
    let harmonic = 3; // 3 loops = 4 nodes

    const harmonicSlider = document.getElementById('standing-harmonic-slider');
    const harmonicLabel = document.getElementById('standing-harmonic-label');

    if (harmonicSlider) {
      harmonicSlider.addEventListener('input', (e) => {
        harmonic = parseInt(e.target.value, 10);
        if (harmonicLabel) harmonicLabel.innerText = `Harmonic n = ${harmonic} (${harmonic} loops, ${harmonic + 1} nodes, ${harmonic} antinodes)`;
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 180 * window.devicePixelRatio || 180;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Equilibrium Axis
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.setLineDash([4 * scale, 4 * scale]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      const maxAmp = 45 * scale;
      const envelopeAmp = Math.cos(time) * maxAmp;

      // Draw Standing Wave envelope bounds
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1 * scale;
      for (let x = 0; x <= w; x += 3) {
        const spatial = Math.sin((x / w) * harmonic * Math.PI);
        const y = centerY + spatial * maxAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      for (let x = 0; x <= w; x += 3) {
        const spatial = Math.sin((x / w) * harmonic * Math.PI);
        const y = centerY - spatial * maxAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Main Standing Wave
      ctx.beginPath();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3 * scale;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8 * scale;
      for (let x = 0; x <= w; x += 2) {
        const spatial = Math.sin((x / w) * harmonic * Math.PI);
        const y = centerY + spatial * envelopeAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Mark Nodes (N) and Antinodes (A)
      ctx.font = `bold ${11 * scale}px sans-serif`;
      for (let i = 0; i <= harmonic; i++) {
        const nodeX = (i / harmonic) * w;
        // Node circle
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(nodeX, centerY, 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        ctx.fillText('NODE', nodeX - 14 * scale, centerY - 14 * scale);

        // Antinodes between consecutive nodes
        if (i < harmonic) {
          const antinodeX = ((i + 0.5) / harmonic) * w;
          ctx.fillStyle = '#34d399';
          ctx.fillText('ANTINODE', antinodeX - 28 * scale, centerY + 30 * scale);
        }
      }

      requestAnimationFrame(render);
    }
    render();
  }

  // 6. BEATS CALCULATOR & VISUALIZER
  function initBeatsCalculator() {
    const f1Input = document.getElementById('beat-f1');
    const f2Input = document.getElementById('beat-f2');
    const beatOutput = document.getElementById('beat-output');
    const canvas = document.getElementById('beat-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 140 * window.devicePixelRatio || 140;
    }
    window.addEventListener('resize', resize);
    resize();

    function updateBeat() {
      const f1 = parseFloat(f1Input.value) || 256;
      const f2 = parseFloat(f2Input.value) || 260;
      const fb = Math.abs(f1 - f2);
      if (beatOutput) {
        beatOutput.innerHTML = `Beat Frequency (f<sub>b</sub>) = |${f1} − ${f2}| = <strong>${fb.toFixed(1)} Hz</strong> (${fb.toFixed(1)} beats/sec)`;
      }
    }

    if (f1Input) f1Input.addEventListener('input', updateBeat);
    if (f2Input) f2Input.addEventListener('input', updateBeat);
    updateBeat();

    function render() {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      const f1 = parseFloat(f1Input.value) || 256;
      const f2 = parseFloat(f2Input.value) || 260;
      const fAvg = 0.05; // visual carrier
      const fMod = Math.abs(f1 - f2) * 0.003 + 0.005; // envelope modulation

      // Draw Envelope
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.setLineDash([3 * scale, 3 * scale]);
      for (let x = 0; x < w; x += 3) {
        const env = Math.cos(x * fMod - time * 0.5) * (40 * scale);
        const y = centerY + env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Resultant Beat Wave
      ctx.beginPath();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5 * scale;
      for (let x = 0; x < w; x += 2) {
        const env = Math.cos(x * fMod - time * 0.5);
        const carrier = Math.sin(x * fAvg - time * 2);
        const y = centerY + env * carrier * (40 * scale);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(render);
    }
    render();
  }

  // 7. DOPPLER EFFECT SIMULATOR
  function initDopplerCanvas() {
    const canvas = document.getElementById('doppler-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let sourceX = 150;
    let sourceSpeed = 1.8;
    let rings = [];
    let frame = 0;

    const speedSlider = document.getElementById('doppler-speed-slider');
    const dirToggle = document.getElementById('doppler-dir-btn');
    let movingRight = true;

    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => sourceSpeed = parseFloat(e.target.value));
    }
    if (dirToggle) {
      dirToggle.addEventListener('click', () => {
        movingRight = !movingRight;
        dirToggle.innerText = movingRight ? 'Moving Right ➔' : 'Moving Left ⬅';
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 200 * window.devicePixelRatio || 200;
      sourceX = canvas.width / 2;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Move source
      if (movingRight) {
        sourceX += sourceSpeed * scale;
        if (sourceX > w * 0.85) sourceX = w * 0.15;
      } else {
        sourceX -= sourceSpeed * scale;
        if (sourceX < w * 0.15) sourceX = w * 0.85;
      }

      // Emit new wavefront ring every N frames
      if (frame % 14 === 0) {
        rings.push({ x: sourceX, y: centerY, r: 2 });
      }

      // Draw wavefront rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += 2.5 * scale;

        const opacity = Math.max(0, 1 - ring.r / (w * 0.65));
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
        ctx.lineWidth = 1.5 * scale;
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();

        if (opacity <= 0) rings.splice(i, 1);
      }

      // Observers (Left & Right)
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(40 * scale, centerY, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `bold ${10 * scale}px sans-serif`;
      ctx.fillText('Observer A (Behind)', 10 * scale, centerY + 24 * scale);
      ctx.fillText('f_obs < f_source (Lower Pitch)', 10 * scale, centerY + 38 * scale);

      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(w - 40 * scale, centerY, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Observer B (Ahead)', w - 120 * scale, centerY + 24 * scale);
      ctx.fillText('f_obs > f_source (Higher Pitch)', w - 150 * scale, centerY + 38 * scale);

      // Sound Source (Ambulance / Siren)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(sourceX, centerY, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SOURCE 🚨', sourceX - 25 * scale, centerY - 16 * scale);

      requestAnimationFrame(render);
    }
    render();
  }

  // 8. INTENSITY INVERSE SQUARE LAW SLIDER
  function initIntensitySlider() {
    const slider = document.getElementById('intensity-distance-slider');
    const distVal = document.getElementById('intensity-dist-val');
    const intensityVal = document.getElementById('intensity-calc-val');
    const visualBox = document.getElementById('intensity-visual-canvas');
    if (!slider || !visualBox) return;

    const ctx = visualBox.getContext('2d');

    function update() {
      const r = parseFloat(slider.value) || 1;
      const intensity = 1 / (r * r);
      if (distVal) distVal.innerText = `${r}x`;
      if (intensityVal) intensityVal.innerText = `I = 1 / (${r})² = ${(intensity).toFixed(3)} I₀ (${(intensity * 100).toFixed(1)}%)`;

      const w = visualBox.width = visualBox.parentElement.clientWidth * window.devicePixelRatio || 400;
      const h = visualBox.height = 140 * window.devicePixelRatio || 140;
      const scale = window.devicePixelRatio || 1;

      ctx.clearRect(0, 0, w, h);

      // Light source on left
      const srcX = 40 * scale;
      const srcY = h / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(srcX, srcY, 8 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Rays spreading
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.lineWidth = 1 * scale;
      const targetX = srcX + (r / 4) * (w - 100 * scale);
      const spreadY = (r * 18) * scale;

      ctx.beginPath();
      ctx.moveTo(srcX, srcY);
      ctx.lineTo(targetX, srcY - spreadY);
      ctx.moveTo(srcX, srcY);
      ctx.lineTo(targetX, srcY + spreadY);
      ctx.stroke();

      // Detector target plate
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.15, intensity)})`;
      ctx.fillRect(targetX, srcY - spreadY, 8 * scale, spreadY * 2);

      // Text annotation
      ctx.font = `bold ${10 * scale}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Detector at r = ${r}`, targetX - 30 * scale, srcY - spreadY - 8 * scale);
    }

    slider.addEventListener('input', update);
    window.addEventListener('resize', update);
    update();
  }

  // 9. DIFFRACTION SLIT APERTURE SLIDER
  function initDiffractionCanvas() {
    const canvas = document.getElementById('diffraction-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const slitSlider = document.getElementById('diffraction-slit-slider');
    const slitLabel = document.getElementById('diffraction-slit-label');

    let slitSize = 25; // in px
    let time = 0;

    if (slitSlider) {
      slitSlider.addEventListener('input', (e) => {
        slitSize = parseFloat(e.target.value);
        if (slitLabel) {
          slitLabel.innerText = slitSize <= 25
            ? `Slit ≈ λ (Maximum Spreading / Strong Diffraction)`
            : `Slit >> λ (Sharp Beams / Negligible Diffraction)`;
        }
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 180 * window.devicePixelRatio || 180;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const barrierX = w * 0.4;
      const centerY = h / 2;
      const halfSlit = (slitSize / 2) * scale;

      ctx.clearRect(0, 0, w, h);

      // Draw Incident Plane Waves (Left)
      const wavelength = 24 * scale;
      for (let x = (time * 20 * scale) % wavelength; x < barrierX; x += wavelength) {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2 * scale;
        ctx.moveTo(x, 10 * scale);
        ctx.lineTo(x, h - 10 * scale);
        ctx.stroke();
      }

      // Barrier walls
      ctx.fillStyle = '#475569';
      ctx.fillRect(barrierX, 0, 8 * scale, centerY - halfSlit);
      ctx.fillRect(barrierX, centerY + halfSlit, 8 * scale, h - (centerY + halfSlit));

      // Diffracted Wavefronts (Right of barrier)
      // If slit is narrow -> circular ripples. If wide -> flat plane wave with small edge curves
      const isNarrow = slitSize <= 35;
      const waveSpeed = 20 * scale;

      for (let r = (time * waveSpeed) % wavelength; r < w - barrierX; r += wavelength) {
        if (r <= 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2 * scale;

        if (isNarrow) {
          // Circular ripples
          ctx.arc(barrierX, centerY, r, -Math.PI / 2.2, Math.PI / 2.2);
        } else {
          // Flattened wavefronts with slight curved edges
          const flatHalf = Math.max(0, halfSlit - 4 * scale);
          ctx.moveTo(barrierX + r, centerY - flatHalf);
          ctx.lineTo(barrierX + r, centerY + flatHalf);
          // Curved ends
          ctx.arc(barrierX, centerY - flatHalf, r, 0, -Math.PI / 3, true);
          ctx.arc(barrierX, centerY + flatHalf, r, 0, Math.PI / 3, false);
        }
        ctx.stroke();
      }

      ctx.font = `bold ${10 * scale}px sans-serif`;
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('Slit (d)', barrierX - 25 * scale, centerY - halfSlit - 6 * scale);

      requestAnimationFrame(render);
    }
    render();
  }

  // 10. REFRACTION WAVE SPEED & WAVELENGTH VISUALIZER
  function initRefractionCanvas() {
    const canvas = document.getElementById('refraction-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 180 * window.devicePixelRatio || 180;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const boundaryX = w * 0.5;

      ctx.clearRect(0, 0, w, h);

      // Medium 1 (Left - Rare medium: Higher Speed v1, Longer Lambda λ1)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.05)';
      ctx.fillRect(0, 0, boundaryX, h);

      // Medium 2 (Right - Denser medium: Slower Speed v2, Shorter Lambda λ2)
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.fillRect(boundaryX, 0, w - boundaryX, h);

      // Boundary Line
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.setLineDash([4 * scale, 4 * scale]);
      ctx.beginPath();
      ctx.moveTo(boundaryX, 0);
      ctx.lineTo(boundaryX, h);
      ctx.stroke();
      ctx.setLineDash([]);

      const lambda1 = 36 * scale;
      const lambda2 = 20 * scale; // shorter in denser medium
      const speed1 = 1.2;
      const speed2 = (lambda2 / lambda1) * speed1; // frequency stays constant!

      // Draw wavefronts in medium 1
      for (let x = (time * speed1 * 25 * scale) % lambda1; x < boundaryX; x += lambda1) {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2 * scale;
        ctx.moveTo(x, 15 * scale);
        ctx.lineTo(x, h - 15 * scale);
        ctx.stroke();
      }

      // Draw wavefronts in medium 2
      for (let x = boundaryX + ((time * speed2 * 25 * scale) % lambda2); x < w; x += lambda2) {
        ctx.beginPath();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2 * scale;
        ctx.moveTo(x, 15 * scale);
        ctx.lineTo(x, h - 15 * scale);
        ctx.stroke();
      }

      // Annotations
      ctx.font = `bold ${11 * scale}px sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Medium 1: Speed v₁, Wavelength λ₁ (Longer)', 16 * scale, 26 * scale);
      ctx.fillStyle = '#c084fc';
      ctx.fillText('Medium 2: Speed v₂ < v₁, Wavelength λ₂ < λ₁', boundaryX + 16 * scale, 26 * scale);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('⭐ FREQUENCY REMAINS CONSTANT (f₁ = f₂)', w * 0.3, h - 14 * scale);

      requestAnimationFrame(render);
    }
    render();
  }

  // 11. POLARIZATION INTERACTIVE DEMO
  function initPolarizationDemo() {
    const canvas = document.getElementById('polarization-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0; // 0 = aligned, 90 = crossed
    let time = 0;

    const angleSlider = document.getElementById('polarizer-angle-slider');
    const angleLabel = document.getElementById('polarizer-angle-label');

    if (angleSlider) {
      angleSlider.addEventListener('input', (e) => {
        angle = parseFloat(e.target.value);
        if (angleLabel) {
          angleLabel.innerText = `${angle}° (${angle === 0 ? 'Parallel - Max Transmission' : angle === 90 ? 'Crossed - Total Extinction / 0 Transmission' : 'Partial Transmission (Malus Law)'})`;
        }
      });
    }

    function resize() {
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio || 600;
      canvas.height = 180 * window.devicePixelRatio || 180;
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      time += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio || 1;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      const p1X = w * 0.35;
      const p2X = w * 0.7;

      // Section 1: Unpolarized Wave (Vibrations in all transverse planes)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5 * scale;
      for (let x = 0; x < p1X; x += 4) {
        const yVert = centerY + Math.sin(x * 0.04 - time) * (26 * scale);
        const yHoriz = centerY + Math.cos(x * 0.04 - time) * (18 * scale);
        ctx.beginPath();
        ctx.moveTo(x, yVert);
        ctx.lineTo(x + 2, yVert);
        ctx.moveTo(x, yHoriz);
        ctx.lineTo(x + 2, yHoriz);
        ctx.stroke();
      }

      // Polarizer 1 (Vertical Slit)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(p1X - 8 * scale, 20 * scale, 16 * scale, h - 40 * scale);
      ctx.beginPath();
      ctx.moveTo(p1X, 24 * scale);
      ctx.lineTo(p1X, h - 24 * scale);
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Section 2: Linearly Polarized Wave (strictly vertical)
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5 * scale;
      for (let x = p1X; x < p2X; x += 3) {
        const y = centerY + Math.sin(x * 0.04 - time) * (26 * scale);
        if (x === p1X) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Polarizer 2 / Analyzer (Rotatable by angle)
      ctx.save();
      ctx.translate(p2X, centerY);
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(-8 * scale, -((h - 40 * scale) / 2), 16 * scale, h - 40 * scale);

      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, -((h - 48 * scale) / 2));
      ctx.lineTo(0, (h - 48 * scale) / 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();
      ctx.restore();

      // Section 3: Transmitted Wave (Amplitude = A * cos(theta))
      const transmissionAmp = Math.max(0, Math.cos((angle * Math.PI) / 180)) * 26 * scale;
      if (transmissionAmp > 1) {
        ctx.beginPath();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5 * scale;
        for (let x = p2X; x < w; x += 3) {
          const y = centerY + Math.sin(x * 0.04 - time) * transmissionAmp;
          if (x === p2X) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.font = `bold ${10 * scale}px sans-serif`;
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Unpolarized', 10 * scale, h - 10 * scale);
      ctx.fillText('Polarized (Vertical)', p1X + 10 * scale, h - 10 * scale);
      ctx.fillText(`Transmitted (I = I₀cos²θ)`, p2X + 10 * scale, h - 10 * scale);

      requestAnimationFrame(render);
    }
    render();
  }

  // =========================================================================
  // 12. MDCAT 20+ PRACTICE MCQS ENGINE
  // =========================================================================
  const quizData = [
    {
      id: 1,
      question: "Which of the following properties is transported by a wave without the permanent transfer of matter?",
      options: [
        "Energy and Momentum",
        "Mass and Volume",
        "Atoms and Molecules",
        "Static Electric Charge"
      ],
      correct: 0,
      explanation: "A wave is a disturbance that transfers energy and momentum from one location to another without transporting matter."
    },
    {
      id: 2,
      question: "In a transverse wave, the particles of the medium vibrate:",
      options: [
        "Parallel to the direction of wave propagation",
        "Perpendicular to the direction of wave propagation",
        "In random elliptical orbits",
        "Along the wave velocity vector"
      ],
      correct: 1,
      explanation: "Transverse waves feature particle oscillations perpendicular (at 90°) to the direction in which the wave travels."
    },
    {
      id: 3,
      question: "If the frequency of a wave is 500 Hz and its wavelength is 0.68 m, what is the wave speed in the medium?",
      options: [
        "170 m/s",
        "340 m/s",
        "735 m/s",
        "680 m/s"
      ],
      correct: 1,
      explanation: "Using v = fλ: v = 500 Hz × 0.68 m = 340 m/s (standard speed of sound in air at room temperature)."
    },
    {
      id: 4,
      question: "When a sound wave enters from air into water, which of its properties remains completely UNCHANGED?",
      options: [
        "Speed",
        "Wavelength",
        "Frequency",
        "Intensity"
      ],
      correct: 2,
      explanation: "⭐ MDCAT Trap: Frequency is a characteristic of the vibrating source and remains constant during refraction between media."
    },
    {
      id: 5,
      question: "In a stationary (standing) wave, the distance between two consecutive nodes is equal to:",
      options: [
        "λ",
        "λ / 2",
        "λ / 4",
        "2λ"
      ],
      correct: 1,
      explanation: "The distance between consecutive nodes (or consecutive antinodes) is λ/2. The distance between a node and adjacent antinode is λ/4."
    },
    {
      id: 6,
      question: "Two tuning forks of frequencies 256 Hz and 260 Hz are sounded together. The number of beats heard per second is:",
      options: [
        "2",
        "4",
        "8",
        "516"
      ],
      correct: 1,
      explanation: "Beat frequency fb = |f1 - f2| = |260 - 256| = 4 Hz, meaning 4 beats are heard every second."
    },
    {
      id: 7,
      question: "Which of the following wave phenomena definitively demonstrates the TRANSVERSE nature of light waves?",
      options: [
        "Interference",
        "Diffraction",
        "Refraction",
        "Polarization"
      ],
      correct: 3,
      explanation: "Only transverse waves can be polarized. Longitudinal waves (like sound) cannot be polarized."
    },
    {
      id: 8,
      question: "An ambulance with a siren emitting frequency f approaches a stationary observer. The observed frequency f' is:",
      options: [
        "Equal to f",
        "Greater than f",
        "Less than f",
        "Zero"
      ],
      correct: 1,
      explanation: "According to the Doppler effect, when source and observer approach each other, the wavefronts compress, increasing the observed frequency (f' > f)."
    },
    {
      id: 9,
      question: "If the distance from a point sound source is doubled from r to 2r, the intensity of sound becomes:",
      options: [
        "Double (2x)",
        "Half (1/2)",
        "One-fourth (1/4)",
        "Four times (4x)"
      ],
      correct: 2,
      explanation: "By the Inverse Square Law: I ∝ 1/r². When r doubles (2r), intensity becomes 1/(2)² = 1/4th of the initial intensity."
    },
    {
      id: 10,
      question: "Condition for maximum constructive interference between two coherent waves of wavelength λ is path difference Δx = :",
      options: [
        "nλ  (where n = 0, 1, 2...)",
        "(2n + 1) λ / 2",
        "(n + 1/2) λ / 4",
        "λ / (2n)"
      ],
      correct: 0,
      explanation: "Constructive interference occurs when path difference is an integral multiple of wavelength: Δx = nλ."
    },
    {
      id: 11,
      question: "Sound waves CANNOT travel through:",
      options: [
        "Solid steel",
        "Liquid water",
        "Pure vacuum",
        "Dense gaseous air"
      ],
      correct: 2,
      explanation: "Sound is a mechanical wave requiring a material medium for propagation. It cannot propagate through a vacuum."
    },
    {
      id: 12,
      question: "The speed of sound is highest in which of the following media?",
      options: [
        "Solids (e.g., Steel)",
        "Liquids (e.g., Water)",
        "Gases (e.g., Air)",
        "Vacuum"
      ],
      correct: 0,
      explanation: "Due to higher elasticity and bulk modulus, speed of sound is: v(solids) > v(liquids) > v(gases)."
    },
    {
      id: 13,
      question: "The loudness of a sound note primarily depends on its:",
      options: [
        "Frequency",
        "Amplitude",
        "Wave speed",
        "Wavelength"
      ],
      correct: 1,
      explanation: "Loudness depends on amplitude (and intensity), while pitch depends on frequency."
    },
    {
      id: 14,
      question: "Diffraction of a wave is most prominent and noticeable when the width of the opening (slit) is:",
      options: [
        "Much larger than the wavelength (d >> λ)",
        "Comparable to the wavelength (d ≈ λ)",
        "Exactly zero",
        "Independent of wavelength"
      ],
      correct: 1,
      explanation: "Diffraction spreading is greatest when the obstacle or aperture size is comparable to the wavelength (d ≈ λ)."
    },
    {
      id: 15,
      question: "Two points in a progressive wave separated by distance λ/2 will have a phase difference of:",
      options: [
        "0 rad (0°)",
        "π/2 rad (90°)",
        "π rad (180° / Opposite phase)",
        "2π rad (360°)"
      ],
      correct: 2,
      explanation: "Phase difference Δφ = (2π/λ) × Δx. For Δx = λ/2, Δφ = (2π/λ)(λ/2) = π radians (180° out of phase)."
    },
    {
      id: 16,
      question: "At the node of a standing wave on a string, which quantity is ALWAYS zero?",
      options: [
        "Displacement",
        "Pressure variation",
        "Strain",
        "Frequency"
      ],
      correct: 0,
      explanation: "A node is a point of permanent zero displacement and zero velocity in a standing wave."
    },
    {
      id: 17,
      question: "When a wave reflects from a denser/fixed boundary, it undergoes a phase shift of:",
      options: [
        "0° (0 rad)",
        "90° (π/2 rad)",
        "180° (π rad)",
        "360° (2π rad)"
      ],
      correct: 2,
      explanation: "Reflection from a rigid/denser boundary inverts the wave, causing a phase shift of 180° (π radians)."
    },
    {
      id: 18,
      question: "If a wave's speed remains constant while its frequency is doubled (2f), its wavelength will:",
      options: [
        "Double (2λ)",
        "Halve (λ/2)",
        "Quadruple (4λ)",
        "Remain the same"
      ],
      correct: 1,
      explanation: "Since v = fλ is constant, λ = v/f. Doubling frequency halves the wavelength."
    },
    {
      id: 19,
      question: "The principle which states that resultant displacement is the vector sum of individual displacements is:",
      options: [
        "Huygens' Principle",
        "Superposition Principle",
        "Doppler Principle",
        "Bernoulli's Principle"
      ],
      correct: 1,
      explanation: "The Superposition Principle states y = y1 + y2 + ... yn when multiple waves overlap in a medium."
    },
    {
      id: 20,
      question: "In a longitudinal wave, the regions of maximum density and pressure are called:",
      options: [
        "Crests",
        "Troughs",
        "Compressions",
        "Rarefactions"
      ],
      correct: 2,
      explanation: "Compressions are regions of high pressure and density; rarefactions are regions of low pressure and density."
    }
  ];

  let currentQuestionIndex = 0;
  let userAnswers = {};
  let quizSubmitted = false;

  function initQuiz() {
    renderQuestion(currentQuestionIndex);

    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');
    const retryBtn = document.getElementById('quiz-retry-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderQuestion(currentQuestionIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
          currentQuestionIndex++;
          renderQuestion(currentQuestionIndex);
        } else {
          showQuizSummary();
        }
      });
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        userAnswers = {};
        currentQuestionIndex = 0;
        quizSubmitted = false;
        document.getElementById('quiz-active-area').style.display = 'block';
        document.getElementById('quiz-score-summary').style.display = 'none';
        renderQuestion(0);
        showToast('Quiz reset. Good luck!');
      });
    }
  }

  function renderQuestion(index) {
    const q = quizData[index];
    if (!q) return;

    const qNumEl = document.getElementById('quiz-q-num');
    const qTotalEl = document.getElementById('quiz-q-total');
    const qTextEl = document.getElementById('quiz-question-text');
    const qOptionsEl = document.getElementById('quiz-options-container');
    const qExplanationEl = document.getElementById('quiz-explanation-box');
    const nextBtn = document.getElementById('quiz-next-btn');
    const prevBtn = document.getElementById('quiz-prev-btn');

    if (qNumEl) qNumEl.innerText = `Question ${index + 1}`;
    if (qTotalEl) qTotalEl.innerText = `of ${quizData.length}`;
    if (qTextEl) qTextEl.innerText = q.question;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.innerText = index === quizData.length - 1 ? 'Finish & See Score ➔' : 'Next Question ➔';

    if (!qOptionsEl) return;
    qOptionsEl.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    const hasAnswered = userAnswers[index] !== undefined;

    q.options.forEach((opt, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.id = `q-${index}-opt-${optIdx}`;

      if (hasAnswered) {
        btn.disabled = true;
        if (optIdx === q.correct) {
          btn.classList.add('correct');
        } else if (userAnswers[index] === optIdx) {
          btn.classList.add('wrong');
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span>${opt}</span>
      `;

      btn.addEventListener('click', () => {
        if (userAnswers[index] !== undefined) return;
        userAnswers[index] = optIdx;
        renderQuestion(index);
      });

      qOptionsEl.appendChild(btn);
    });

    if (qExplanationEl) {
      if (hasAnswered) {
        const isCorrect = userAnswers[index] === q.correct;
        qExplanationEl.className = 'quiz-explanation show';
        qExplanationEl.innerHTML = `
          <div style="font-weight:700; color:${isCorrect ? 'var(--emerald-400)' : 'var(--rose-400)'}; margin-bottom:4px;">
            ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect!'}
          </div>
          <div>${q.explanation}</div>
        `;
      } else {
        qExplanationEl.className = 'quiz-explanation';
        qExplanationEl.innerHTML = '';
      }
    }
  }

  function showQuizSummary() {
    let score = 0;
    quizData.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) score++;
    });

    const percent = Math.round((score / quizData.length) * 100);
    const activeArea = document.getElementById('quiz-active-area');
    const summaryArea = document.getElementById('quiz-score-summary');
    const scoreNum = document.getElementById('quiz-final-score');
    const scorePct = document.getElementById('quiz-final-pct');
    const scoreMsg = document.getElementById('quiz-final-msg');

    if (activeArea) activeArea.style.display = 'none';
    if (summaryArea) summaryArea.style.display = 'block';

    if (scoreNum) scoreNum.innerText = `${score} / ${quizData.length}`;
    if (scorePct) scorePct.innerText = `${percent}% Accuracy`;
    if (scoreMsg) {
      if (percent >= 90) {
        scoreMsg.innerHTML = `🌟 <strong>Outstanding!</strong> You have exceptional mastery over Waves for MDCAT Physics!`;
      } else if (percent >= 70) {
        scoreMsg.innerHTML = `👍 <strong>Great Job!</strong> Review the few missed concepts and trap cards to hit 100%.`;
      } else {
        scoreMsg.innerHTML = `📚 <strong>Keep Practicing!</strong> Go through the Formula Wall, Standing Waves, and Trap Cards before retesting.`;
      }
    }
  }

  // --- INITIALIZE ALL ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSectionControls();
    initNavObserver();
    initSearch();
    initCopyButtons();

    // Physics Canvases
    initHeroCanvas();
    initWaveTypeInteractive();
    initWaveCalculator();
    initSuperpositionCanvas();
    initStandingWaveCanvas();
    initBeatsCalculator();
    initDopplerCanvas();
    initIntensitySlider();
    initDiffractionCanvas();
    initRefractionCanvas();
    initPolarizationDemo();

    // Quiz
    initQuiz();
  });

})();
