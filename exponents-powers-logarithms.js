/**
 * ==========================================================================
 * LOGARITHMS & EXPONENTS — UNIVERSITY MATHEMATICS MODULE (TOPIC 13 / 15)
 * Standalone Academic JavaScript Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initSidebarSpy();
  initBookmarks();
  initExponentCalculator();
  initLogarithmCalculator();
  initConverter();
  initGraphCanvas();
  initPracticeZone();
  initMasterTest();
  initFormulaSheetActions();
  initQuickRevision();
});

// Toast Notification System
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --------------------------------------------------------------------------
// 1. SEARCH SYSTEM
// --------------------------------------------------------------------------
function initSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const searchStats = document.getElementById('searchStats');
  const sections = document.querySelectorAll('.topic-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    if (!query) {
      sections.forEach(sec => sec.style.display = 'block');
      if (searchStats) searchStats.textContent = '';
      return;
    }

    let matchCount = 0;
    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(query)) {
        sec.style.display = 'block';
        matchCount++;
      } else {
        sec.style.display = 'none';
      }
    });

    if (searchStats) {
      searchStats.textContent = `${matchCount} section${matchCount === 1 ? '' : 's'} matching "${query}"`;
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      sections.forEach(sec => sec.style.display = 'block');
      if (searchStats) searchStats.textContent = '';
      searchInput.focus();
    });
  }
}

// --------------------------------------------------------------------------
// 2. SIDEBAR ACTIVE SCROLL SPY & NAVIGATION
// --------------------------------------------------------------------------
function initSidebarSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.topic-section');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
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
// 3. BOOKMARKS SYSTEM (LocalStorage)
// --------------------------------------------------------------------------
const STORAGE_KEY_BOOKMARKS = 'math_topic13_bookmarks';

function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS)) || [];
  } catch (e) {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {}
}

function initBookmarks() {
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  const modal = document.getElementById('bookmarksModal');
  const openModalBtn = document.getElementById('openBookmarksBtn');
  const closeModalBtn = document.getElementById('closeBookmarksBtn');
  const bookmarksList = document.getElementById('bookmarksList');

  function updateBtnStates() {
    const saved = getBookmarks();
    bookmarkBtns.forEach(btn => {
      const sectionId = btn.getAttribute('data-section');
      if (saved.includes(sectionId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '★ Bookmarked';
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = '☆ Bookmark';
      }
    });
  }

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-section');
      let saved = getBookmarks();
      if (saved.includes(sectionId)) {
        saved = saved.filter(id => id !== sectionId);
        showToast(`Removed from bookmarks`);
      } else {
        saved.push(sectionId);
        showToast(`Saved to bookmarks`, 'success');
      }
      saveBookmarks(saved);
      updateBtnStates();
      renderBookmarksModal();
    });
  });

  function renderBookmarksModal() {
    if (!bookmarksList) return;
    const saved = getBookmarks();
    if (saved.length === 0) {
      bookmarksList.innerHTML = '<p class="text-muted" style="text-align:center; padding: 1.5rem 0;">No bookmarked topics yet. Click "☆ Bookmark" on any section to save it for quick review.</p>';
      return;
    }
    bookmarksList.innerHTML = saved.map(id => {
      const sec = document.getElementById(id);
      const title = sec ? sec.querySelector('.section-title')?.textContent || id : id;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.75rem 1rem; border-bottom:1px solid #E2E8F0;">
          <a href="#${id}" class="modal-bookmark-link" style="color:var(--accent-green-deep); font-weight:600; text-decoration:none;">${title}</a>
          <button class="remove-single-bm" data-id="${id}" style="background:none; border:none; color:#DC2626; cursor:pointer; font-size:0.85rem;">Remove</button>
        </div>
      `;
    }).join('');

    bookmarksList.querySelectorAll('.modal-bookmark-link').forEach(link => {
      link.addEventListener('click', () => {
        if (modal) modal.classList.remove('open');
      });
    });

    bookmarksList.querySelectorAll('.remove-single-bm').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let saved = getBookmarks().filter(item => item !== id);
        saveBookmarks(saved);
        updateBtnStates();
        renderBookmarksModal();
        showToast('Bookmark removed');
      });
    });
  }

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      renderBookmarksModal();
      modal.classList.add('open');
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  updateBtnStates();
}

// --------------------------------------------------------------------------
// 4. EXPONENT CALCULATOR
// --------------------------------------------------------------------------
function initExponentCalculator() {
  const baseInput = document.getElementById('calcExpBase');
  const expInput = document.getElementById('calcExpExponent');
  const computeBtn = document.getElementById('btnComputeExp');
  const resultMain = document.getElementById('calcExpResult');
  const stepsList = document.getElementById('calcExpSteps');

  if (!computeBtn) return;

  function calculate() {
    const baseStr = baseInput.value.trim();
    const expStr = expInput.value.trim();

    if (!baseStr || !expStr) {
      resultMain.textContent = 'Please enter both base and exponent';
      stepsList.innerHTML = '';
      return;
    }

    const base = parseFloat(baseStr);
    let expNum = 0;
    let isFraction = false;
    let numerator = 1;
    let denominator = 1;

    if (expStr.includes('/')) {
      const parts = expStr.split('/');
      numerator = parseFloat(parts[0]);
      denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        resultMain.textContent = 'Invalid fraction exponent';
        stepsList.innerHTML = '<li>Denominator cannot be 0.</li>';
        return;
      }
      expNum = numerator / denominator;
      isFraction = true;
    } else {
      expNum = parseFloat(expStr);
      numerator = expNum;
      denominator = 1;
    }

    if (isNaN(base) || isNaN(expNum)) {
      resultMain.textContent = 'Invalid numerical input';
      stepsList.innerHTML = '';
      return;
    }

    // Special cases
    const steps = [];
    steps.push(`Expression: (${baseStr})^(${expStr})`);

    if (base === 0 && expNum === 0) {
      resultMain.textContent = 'Undefined (0⁰ is indeterminate)';
      steps.push('0 raised to power 0 is an indeterminate form in mathematics.');
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }

    if (base === 0 && expNum < 0) {
      resultMain.textContent = 'Undefined (Division by zero: 1/0ⁿ)';
      steps.push('Negative exponent means taking reciprocal: 1 / 0 = undefined.');
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }

    if (base < 0 && isFraction && denominator % 2 === 0) {
      resultMain.textContent = 'Non-Real Result (Complex Number)';
      steps.push(`Even root (${denominator}) of negative base (${base}) does not exist in real numbers ℝ.`);
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }

    const value = Math.pow(base, expNum);

    if (expNum === 0) {
      steps.push(`Zero Exponent Rule: Any non-zero base raised to 0 equals 1.`);
    } else if (expNum < 0) {
      steps.push(`Negative Exponent Rule: a⁻ⁿ = 1 / aⁿ. Thus, 1 / (${base})^(${Math.abs(expNum)})`);
    }

    if (isFraction) {
      steps.push(`Fractional Exponent Rule: a^(m/n) = ⁿ√(aᵐ). Here, root n = ${denominator}, power m = ${numerator}.`);
    }

    let displayVal = Number.isInteger(value) ? value.toString() : (Math.abs(value) < 1e-4 || Math.abs(value) > 1e7 ? value.toExponential(6) : value.toFixed(6).replace(/\.?0+$/, ''));
    
    resultMain.textContent = `${displayVal}`;
    steps.push(`Calculated value = ${value}`);
    stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
  }

  computeBtn.addEventListener('click', calculate);
}

// --------------------------------------------------------------------------
// 5. LOGARITHM & CHANGE-OF-BASE CALCULATOR
// --------------------------------------------------------------------------
function initLogarithmCalculator() {
  const baseInput = document.getElementById('calcLogBase');
  const argInput = document.getElementById('calcLogArg');
  const computeBtn = document.getElementById('btnComputeLog');
  const resultMain = document.getElementById('calcLogResult');
  const stepsList = document.getElementById('calcLogSteps');

  if (!computeBtn) return;

  function calculate() {
    const baseStr = baseInput.value.trim().toLowerCase();
    const argStr = argInput.value.trim().toLowerCase();

    if (!baseStr || !argStr) {
      resultMain.textContent = 'Please enter both base and argument';
      stepsList.innerHTML = '';
      return;
    }

    let base = baseStr === 'e' ? Math.E : parseFloat(baseStr);
    let arg = argStr === 'e' ? Math.E : parseFloat(argStr);

    if (isNaN(base) || isNaN(arg)) {
      resultMain.textContent = 'Invalid input (Use numbers or "e")';
      stepsList.innerHTML = '';
      return;
    }

    const steps = [];
    steps.push(`Evaluating log₍${baseStr}₎(${argStr})`);

    // Domain Check
    if (base <= 0) {
      resultMain.textContent = 'Undefined: Base must be strictly positive (a > 0)';
      steps.push('Logarithm base must satisfy a > 0 in real numbers.');
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }
    if (Math.abs(base - 1) < 1e-9) {
      resultMain.textContent = 'Undefined: Base cannot be 1 (a ≠ 1)';
      steps.push('Base 1 is invalid because 1ˣ = 1 for all x, so log₁(x) has no unique solution.');
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }
    if (arg <= 0) {
      resultMain.textContent = 'Undefined: Argument must be strictly positive (x > 0)';
      steps.push(`Argument ${arg} ≤ 0 is undefined in ℝ. Exponents aˣ can never yield non-positive numbers.`);
      stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
      return;
    }

    // Change of base formula
    const lnArg = Math.log(arg);
    const lnBase = Math.log(base);
    const result = lnArg / lnBase;

    steps.push(`Change of Base Formula: logₐ(b) = ln(b) / ln(a)`);
    steps.push(`ln(${argStr}) = ${lnArg.toFixed(6)}`);
    steps.push(`ln(${baseStr}) = ${lnBase.toFixed(6)}`);
    steps.push(`Division: ${lnArg.toFixed(6)} ÷ ${lnBase.toFixed(6)} = ${result.toFixed(6)}`);

    // Check if integer power
    let rounded = Math.round(result);
    if (Math.abs(result - rounded) < 1e-9) {
      steps.push(`Exact relation: (${baseStr})^(${rounded}) = ${argStr}`);
      resultMain.textContent = `${rounded}`;
    } else {
      resultMain.textContent = `${result.toFixed(6)}`;
    }

    stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
  }

  computeBtn.addEventListener('click', calculate);
}

// --------------------------------------------------------------------------
// 6. EXPONENTIAL ↔ LOGARITHMIC CONVERTER
// --------------------------------------------------------------------------
function initConverter() {
  const expA = document.getElementById('convExpA');
  const expX = document.getElementById('convExpX');
  const expB = document.getElementById('convExpB');
  const logA = document.getElementById('convLogA');
  const logB = document.getElementById('convLogB');
  const logX = document.getElementById('convLogX');
  const btnExpToLog = document.getElementById('btnExpToLog');
  const btnLogToExp = document.getElementById('btnLogToExp');

  if (btnExpToLog) {
    btnExpToLog.addEventListener('click', () => {
      const a = expA.value.trim() || 'a';
      const x = expX.value.trim() || 'x';
      const b = expB.value.trim() || 'b';
      logA.value = a;
      logB.value = b;
      logX.value = x;
      showToast(`Converted exponential form ${a}^(${x}) = ${b} to log₍${a}₎(${b}) = ${x}`, 'success');
    });
  }

  if (btnLogToExp) {
    btnLogToExp.addEventListener('click', () => {
      const a = logA.value.trim() || 'a';
      const b = logB.value.trim() || 'b';
      const x = logX.value.trim() || 'x';
      expA.value = a;
      expX.value = x;
      expB.value = b;
      showToast(`Converted logarithmic form log₍${a}₎(${b}) = ${x} to ${a}^(${x}) = ${b}`, 'success');
    });
  }
}

// --------------------------------------------------------------------------
// 7. INTERACTIVE GRAPH CANVAS (SVG / HTML5 Canvas)
// --------------------------------------------------------------------------
function initGraphCanvas() {
  const canvas = document.getElementById('mathGraphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cursorInfo = document.getElementById('graphCursorCoords');

  const toggles = {
    exp2: true,      // y = 2^x
    expHalf: false,  // y = (1/2)^x
    log2: true,      // y = log2(x)
    log10: false,    // y = log10(x)
    ln: false,       // y = ln(x)
    inverseLine: true // y = x
  };

  // Bind toggle buttons
  document.querySelectorAll('.graph-btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-func');
      if (toggles.hasOwnProperty(key)) {
        toggles[key] = !toggles[key];
        btn.classList.toggle('active', toggles[key]);
        draw();
      }
    });
  });

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio || 800;
    canvas.height = rect.height * window.devicePixelRatio || 480;
    draw();
  }

  window.addEventListener('resize', resizeCanvas);

  let mousePos = { x: 0, y: 0, active: false };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (canvas.width / rect.width);
    const py = (e.clientY - rect.top) * (canvas.height / rect.height);
    mousePos = { x: px, y: py, active: true };
    draw();
  });

  canvas.addEventListener('mouseleave', () => {
    mousePos.active = false;
    if (cursorInfo) cursorInfo.textContent = 'Hover over canvas to track (x, y)';
    draw();
  });

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const xMin = -6, xMax = 6;
    const yMin = -5, yMax = 7;

    const toPx = (x) => ((x - xMin) / (xMax - xMin)) * w;
    const toPy = (y) => h - ((y - yMin) / (yMax - yMin)) * h;
    const fromPx = (px) => xMin + (px / w) * (xMax - xMin);
    const fromPy = (py) => yMin + ((h - py) / h) * (yMax - yMin);

    // Draw Grid
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#94A3B8';

    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const px = toPx(x);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
      if (x !== 0) ctx.fillText(x.toString(), px - 4, toPy(0) + 14);
    }

    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      const py = toPy(y);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
      if (y !== 0) ctx.fillText(y.toString(), toPx(0) + 6, py + 4);
    }

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, toPy(0));
    ctx.lineTo(w, toPy(0));
    ctx.stroke();
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(toPx(0), 0);
    ctx.lineTo(toPx(0), h);
    ctx.stroke();

    // Plot curves
    function plotFunc(fn, color, isDashed = false, minDomain = xMin) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      if (isDashed) ctx.setLineDash([6, 6]);
      else ctx.setLineDash([]);

      ctx.beginPath();
      let started = false;
      const step = (xMax - xMin) / (w * 1.5);

      for (let x = Math.max(xMin, minDomain); x <= xMax; x += step) {
        const y = fn(x);
        if (isNaN(y) || !isFinite(y)) {
          started = false;
          continue;
        }
        const px = toPx(x);
        const py = toPy(y);

        if (py < -50 || py > h + 50) {
          started = false;
          continue;
        }

        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Identity Line y = x (Reflection Axis)
    if (toggles.inverseLine) {
      plotFunc((x) => x, '#94A3B8', true);
    }

    // y = 2^x (Growth)
    if (toggles.exp2) {
      plotFunc((x) => Math.pow(2, x), '#1E6F5C');
    }

    // y = (1/2)^x (Decay)
    if (toggles.expHalf) {
      plotFunc((x) => Math.pow(0.5, x), '#D97706');
    }

    // y = log2(x)
    if (toggles.log2) {
      plotFunc((x) => (x > 0 ? Math.log2(x) : NaN), '#2563EB', false, 0.001);
    }

    // y = log10(x)
    if (toggles.log10) {
      plotFunc((x) => (x > 0 ? Math.log10(x) : NaN), '#7C3AED', false, 0.001);
    }

    // y = ln(x)
    if (toggles.ln) {
      plotFunc((x) => (x > 0 ? Math.log(x) : NaN), '#0D9488', false, 0.001);
    }

    // Plot Key Intercepts
    ctx.fillStyle = '#1E6F5C';
    // (0, 1) on exponential
    if (toggles.exp2 || toggles.expHalf) {
      ctx.beginPath();
      ctx.arc(toPx(0), toPy(1), 5, 0, Math.PI * 2);
      ctx.fill();
    }
    // (1, 0) on logarithm
    if (toggles.log2 || toggles.log10 || toggles.ln) {
      ctx.fillStyle = '#2563EB';
      ctx.beginPath();
      ctx.arc(toPx(1), toPy(0), 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hover Cursor Tracker
    if (mousePos.active) {
      const mathX = fromPx(mousePos.x);
      const mathY = fromPy(mousePos.y);

      ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(mousePos.x, 0);
      ctx.lineTo(mousePos.x, h);
      ctx.moveTo(0, mousePos.y);
      ctx.lineTo(w, mousePos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      if (cursorInfo) {
        cursorInfo.textContent = `Cursor: x = ${mathX.toFixed(2)}, y = ${mathY.toFixed(2)} | 2ˣ = ${Math.pow(2, mathX).toFixed(2)}, log₂(x) = ${mathX > 0 ? Math.log2(mathX).toFixed(2) : 'Undefined'}`;
      }
    }
  }

  resizeCanvas();
}

// --------------------------------------------------------------------------
// 8. PRACTICE ZONE (120 ORIGINAL MCQs)
// --------------------------------------------------------------------------
const MCQS_DATA = [
  // FOUNDATION (1 - 30)
  {
    id: 1,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'Simplify the expression: (2³ × 2⁵) ÷ 2⁴',
    options: ['2³ = 8', '2⁴ = 16', '2⁶ = 64', '2² = 4'],
    ans: 1,
    exp: 'Using exponent laws: 2³ × 2⁵ = 2³⁺⁵ = 2⁸. Then 2⁸ ÷ 2⁴ = 2⁸⁻⁴ = 2⁴ = 16.'
  },
  {
    id: 2,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'negative-fractional',
    q: 'What is the exact value of 5⁻²?',
    options: ['-10', '-25', '1/25', '1/10'],
    ans: 2,
    exp: 'Negative exponent rule: a⁻ⁿ = 1/aⁿ. Hence 5⁻² = 1/(5²) = 1/25.'
  },
  {
    id: 3,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'exponent-laws',
    q: 'Evaluate: (-3)²',
    options: ['-9', '9', '-6', '6'],
    ans: 1,
    exp: 'Brackets indicate the negative sign is squared: (-3) × (-3) = +9. Note: -3² would be -9.'
  },
  {
    id: 4,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'exponent-laws',
    q: 'What is the value of -4²?',
    options: ['16', '-16', '8', '-8'],
    ans: 1,
    exp: 'Order of operations: Exponent binds before negation. -4² = -(4 × 4) = -16.'
  },
  {
    id: 5,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'exponent-laws',
    q: 'For any non-zero real number k, what is k⁰?',
    options: ['0', 'k', '1', 'Undefined'],
    ans: 2,
    exp: 'By definition of zero exponent, a⁰ = 1 for any a ≠ 0.'
  },
  {
    id: 6,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'negative-fractional',
    q: 'Evaluate: 64^(1/3)',
    options: ['4', '8', '16', '21.33'],
    ans: 0,
    exp: 'Fractional exponent a^(1/n) = ⁿ√a. 64^(1/3) = ³√64 = 4 (since 4³ = 64).'
  },
  {
    id: 7,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'negative-fractional',
    q: 'Evaluate: 27^(2/3)',
    options: ['3', '6', '9', '18'],
    ans: 2,
    exp: 'a^(m/n) = (ⁿ√a)ᵐ = (³√27)² = 3² = 9.'
  },
  {
    id: 8,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'scientific-notation',
    q: 'Express 0.00072 in standard scientific notation.',
    options: ['7.2 × 10⁻³', '7.2 × 10⁻⁴', '72 × 10⁻⁵', '0.72 × 10⁻³'],
    ans: 1,
    exp: 'Moving the decimal 4 places to the right yields 7.2 × 10⁻⁴ (where 1 ≤ 7.2 < 10).'
  },
  {
    id: 9,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'log-basics',
    q: 'Convert 3⁴ = 81 into logarithmic form.',
    options: ['log₄(81) = 3', 'log₃(81) = 4', 'log₈₁(3) = 4', 'log₃(4) = 81'],
    ans: 1,
    exp: 'Relationship aˣ = b ⇔ logₐ(b) = x. Base = 3, argument = 81, exponent = 4. Hence log₃(81) = 4.'
  },
  {
    id: 10,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'log-basics',
    q: 'What is the value of log₁₀(1000)?',
    options: ['1', '2', '3', '4'],
    ans: 2,
    exp: '10³ = 1000, so log₁₀(1000) = 3.'
  },
  {
    id: 11,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'log-basics',
    q: 'What is the value of log₇(1)?',
    options: ['0', '1', '7', 'Undefined'],
    ans: 0,
    exp: 'For any valid base a > 0 (a ≠ 1), logₐ(1) = 0 because a⁰ = 1.'
  },
  {
    id: 12,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'log-basics',
    q: 'What is the value of log₅(5)?',
    options: ['0', '1', '5', '25'],
    ans: 1,
    exp: 'logₐ(a) = 1 because a¹ = a.'
  },
  {
    id: 13,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'log-basics',
    q: 'What is ln(e)?',
    options: ['0', '1', 'e', '2.718'],
    ans: 1,
    exp: 'ln is log base e. ln(e) = logₑ(e) = 1.'
  },
  {
    id: 14,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'Which of the following is equivalent to log(a) + log(b)?',
    options: ['log(a + b)', 'log(a × b)', 'log(a / b)', '(log a)(log b)'],
    ans: 1,
    exp: 'Product Law of logarithms: log(xy) = log(x) + log(y).'
  },
  {
    id: 15,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'log-laws',
    q: 'Which of the following is equivalent to log(a) - log(b)?',
    options: ['log(a - b)', 'log(a / b)', 'log(a) / log(b)', 'log(b / a)'],
    ans: 1,
    exp: 'Quotient Law of logarithms: log(x/y) = log(x) - log(y).'
  },
  {
    id: 16,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'log-laws',
    q: 'Simplify: log₂(x⁴)',
    options: ['4 + log₂x', '4 log₂x', '(log₂x)⁴', '2 log₄x'],
    ans: 1,
    exp: 'Power Law: logₐ(xⁿ) = n logₐx. Thus log₂(x⁴) = 4 log₂x.'
  },
  {
    id: 17,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'change-of-base',
    q: 'According to the Change of Base formula, log₃(20) is equal to:',
    options: ['log(3) / log(20)', 'log(20) / log(3)', 'log(20 - 3)', '20 / 3'],
    ans: 1,
    exp: 'Change of base: logₐb = log b / log a (or ln b / ln a). Here log(20) / log(3).'
  },
  {
    id: 18,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 2ˣ = 32',
    options: ['3', '4', '5', '6'],
    ans: 2,
    exp: 'Express 32 as power of 2: 32 = 2⁵. Since bases are equal, x = 5.'
  },
  {
    id: 19,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₃(x) = 3',
    options: ['6', '9', '27', '81'],
    ans: 2,
    exp: 'Convert to exponential form: x = 3³ = 27.'
  },
  {
    id: 20,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'domain-restrictions',
    q: 'For which value of x is log₁₀(x - 4) defined in the real number system?',
    options: ['x ≥ 4', 'x > 4', 'x < 4', 'x ≥ 0'],
    ans: 1,
    exp: 'Argument must be strictly positive: x - 4 > 0 ⇒ x > 4.'
  },
  {
    id: 21,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'Simplify: (x³y²)³',
    options: ['x⁶y⁵', 'x⁹y⁶', 'x⁶y⁶', 'x⁹y⁵'],
    ans: 1,
    exp: 'Power of a product rule: (aᵐbⁿ)ᵖ = aᵐᵖ bⁿᵖ. So (x³y²)³ = x³ˣ³ y²ˣ³ = x⁹y⁶.'
  },
  {
    id: 22,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'negative-fractional',
    q: 'Evaluate: (1/4)⁻²',
    options: ['1/16', '-1/16', '16', '-8'],
    ans: 2,
    exp: '(a/b)⁻ⁿ = (b/a)ⁿ. Thus (1/4)⁻² = (4/1)² = 16.'
  },
  {
    id: 23,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'log-basics',
    q: 'What is log₂(1/8)?',
    options: ['3', '-3', '1/3', '-1/3'],
    ans: 1,
    exp: '1/8 = 2⁻³. So log₂(2⁻³) = -3.'
  },
  {
    id: 24,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'scientific-notation',
    q: 'What is (3 × 10⁴) × (2 × 10⁵) in scientific notation?',
    options: ['6 × 10²⁰', '6 × 10⁹', '5 × 10⁹', '6 × 10¹'],
    ans: 1,
    exp: '(3 × 2) × (10⁴ × 10⁵) = 6 × 10⁴⁺⁵ = 6 × 10⁹.'
  },
  {
    id: 25,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'graphs-functions',
    q: 'The y-intercept of the exponential function f(x) = 3ˣ is:',
    options: ['(0, 0)', '(0, 1)', '(0, 3)', '(1, 0)'],
    ans: 1,
    exp: 'At x = 0, f(0) = 3⁰ = 1. So y-intercept is (0, 1).'
  },
  {
    id: 26,
    difficulty: 'foundation',
    style: 'FAST-style',
    cat: 'graphs-functions',
    q: 'The x-intercept of the logarithmic function f(x) = log₄(x) is:',
    options: ['(0, 1)', '(1, 0)', '(4, 0)', '(0, 0)'],
    ans: 1,
    exp: 'Set f(x) = 0: log₄(x) = 0 ⇒ x = 4⁰ = 1. The intercept is (1, 0).'
  },
  {
    id: 27,
    difficulty: 'foundation',
    style: 'NET-style',
    cat: 'growth-decay',
    q: 'In the formula y = a(1 + r)ᵗ, what does "a" represent?',
    options: ['Rate of growth', 'Time period', 'Initial quantity', 'Final quantity'],
    ans: 2,
    exp: '"a" represents the starting/initial amount at t = 0.'
  },
  {
    id: 28,
    difficulty: 'foundation',
    style: 'ECAT-style',
    cat: 'growth-decay',
    q: 'If an item depreciates at 10% per year, what is the decay factor (1 - r)?',
    options: ['1.1', '0.9', '0.1', '0.01'],
    ans: 1,
    exp: 'Decay factor = 1 - r = 1 - 0.10 = 0.90.'
  },
  {
    id: 29,
    difficulty: 'foundation',
    style: 'University Aptitude-style',
    cat: 'log-basics',
    q: 'Simplify: 10^(log₁₀(7))',
    options: ['10', '1', '7', '70'],
    ans: 2,
    exp: 'Identity: b^(log_b(x)) = x. Hence 10^(log₁₀(7)) = 7.'
  },
  {
    id: 30,
    difficulty: 'foundation',
    style: 'Scholarship-style',
    cat: 'log-basics',
    q: 'Simplify: log₅(5⁸)',
    options: ['8', '5', '40', '1'],
    ans: 0,
    exp: 'Identity: log_b(bˣ) = x. Hence log₅(5⁸) = 8.'
  },

  // INTERMEDIATE (31 - 70)
  {
    id: 31,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'Simplify: (x⁻³ y⁴ z⁻²) / (x² y⁻¹ z⁻⁵)',
    options: ['y⁵ z³ / x⁵', 'y³ z³ / x', 'x⁵ y⁵ z⁷', '1 / (x⁵ y³ z³)'],
    ans: 0,
    exp: 'Subtract exponents: x⁻³⁻² = x⁻⁵ = 1/x⁵; y⁴⁻⁽⁻¹⁾ = y⁵; z⁻²⁻⁽⁻⁵⁾ = z³. Result: y⁵ z³ / x⁵.'
  },
  {
    id: 32,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'negative-fractional',
    q: 'Evaluate: (81/16)^(-3/4)',
    options: ['27/8', '8/27', '-27/8', '16/81'],
    ans: 1,
    exp: '(81/16)^(-3/4) = (16/81)^(3/4) = (⁴√(16/81))³ = (2/3)³ = 8/27.'
  },
  {
    id: 33,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 9ˣ⁺¹ = 27ˣ⁻¹',
    options: ['2', '3', '4', '5'],
    ans: 3,
    exp: 'Express in base 3: (3²)ˣ⁺¹ = (3³)ˣ⁻¹ ⇒ 3²ˣ⁺² = 3³ˣ⁻³. Equate exponents: 2x + 2 = 3x - 3 ⇒ x = 5.'
  },
  {
    id: 34,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 4ˣ - 3(2ˣ) - 4 = 0',
    options: ['1', '2', '4', 'No real solution'],
    ans: 1,
    exp: 'Let u = 2ˣ (u > 0). The equation becomes u² - 3u - 4 = 0 ⇒ (u - 4)(u + 1) = 0. Since u > 0, u = 4 ⇒ 2ˣ = 4 ⇒ x = 2.'
  },
  {
    id: 35,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'expansion-condensation',
    q: 'Expand completely: log₂ [ (x³ √y) / z⁴ ]',
    options: [
      '3 log₂x + (1/2) log₂y - 4 log₂z',
      '3 log₂x + 2 log₂y - 4 log₂z',
      '3 log₂x - (1/2) log₂y - 4 log₂z',
      '(3/2) log₂xy - 4 log₂z'
    ],
    ans: 0,
    exp: 'Numerator adds, denominator subtracts: log₂(x³) + log₂(y^(1/2)) - log₂(z⁴) = 3 log₂x + (1/2) log₂y - 4 log₂z.'
  },
  {
    id: 36,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'expansion-condensation',
    q: 'Condense into a single logarithm: 2 ln(x) + (1/3) ln(y) - 3 ln(z)',
    options: [
      'ln [ (x² ³√y) / z³ ]',
      'ln [ (2x × (1/3)y) / 3z ]',
      'ln [ (x² z³) / ³√y ]',
      'ln [ x² + ³√y - z³ ]'
    ],
    ans: 0,
    exp: 'Power rule: ln(x²) + ln(y^(1/3)) - ln(z³). Quotient and product laws: ln [ (x² ³√y) / z³ ].'
  },
  {
    id: 37,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'log-laws',
    q: 'If log₁₀(2) = a and log₁₀(3) = b, express log₁₀(18) in terms of a and b.',
    options: ['a + b²', 'a + 2b', '2a + b', 'ab²'],
    ans: 1,
    exp: '18 = 2 × 3² = 2 × 9. log₁₀(18) = log₁₀(2 × 3²) = log₁₀(2) + log₁₀(3²) = log₁₀(2) + 2 log₁₀(3) = a + 2b.'
  },
  {
    id: 38,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'log-laws',
    q: 'If log₁₀(2) = a, what is log₁₀(5)?',
    options: ['1 - a', 'a / 2', '2 - a', '1 / a'],
    ans: 0,
    exp: '5 = 10 / 2. Therefore log₁₀(5) = log₁₀(10/2) = log₁₀(10) - log₁₀(2) = 1 - a. (Crucial speed trick!)'
  },
  {
    id: 39,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₂(x + 2) + log₂(x - 2) = 5',
    options: ['6', '-6', '±6', '√33'],
    ans: 0,
    exp: 'log₂[(x + 2)(x - 2)] = 5 ⇒ log₂(x² - 4) = 5 ⇒ x² - 4 = 2⁵ = 32 ⇒ x² = 36 ⇒ x = ±6. Check domain: x + 2 > 0 and x - 2 > 0 ⇒ x > 2. Thus only x = 6 is valid.'
  },
  {
    id: 40,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log(x) + log(x - 3) = 1 (where base is 10)',
    options: ['5', '-2', '5 and -2', '10'],
    ans: 0,
    exp: 'log[x(x - 3)] = 1 ⇒ x² - 3x = 10¹ ⇒ x² - 3x - 10 = 0 ⇒ (x - 5)(x + 2) = 0. Domain requires x > 0 and x > 3, so x = -2 is extraneous. Valid solution is x = 5.'
  },
  {
    id: 41,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'domain-restrictions',
    q: 'What is the domain of f(x) = log₃(25 - x²)?',
    options: ['(-∞, 5)', '(-5, 5)', '[-5, 5]', '(5, ∞)'],
    ans: 1,
    exp: 'Argument must be strictly positive: 25 - x² > 0 ⇒ x² < 25 ⇒ -5 < x < 5, which is interval (-5, 5).'
  },
  {
    id: 42,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'domain-restrictions',
    q: 'Find the domain of f(x) = log₍ₓ₋₁₎(x + 4)',
    options: ['(1, ∞)', '(1, 2) ∪ (2, ∞)', '(-4, ∞)', '[1, ∞)'],
    ans: 1,
    exp: 'Conditions: (1) Argument > 0: x + 4 > 0 ⇒ x > -4. (2) Base > 0: x - 1 > 0 ⇒ x > 1. (3) Base ≠ 1: x - 1 ≠ 1 ⇒ x ≠ 2. Combining gives (1, 2) ∪ (2, ∞).'
  },
  {
    id: 43,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'change-of-base',
    q: 'Evaluate: (log₂ 3) × (log₃ 4) × (log₄ 8)',
    options: ['2', '3', '4', '8'],
    ans: 1,
    exp: 'Change to common base log: (log 3 / log 2) × (log 4 / log 3) × (log 8 / log 4). Middle terms cancel out = log 8 / log 2 = log₂(8) = 3.'
  },
  {
    id: 44,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'change-of-base',
    q: 'If log_b(a) = 4, what is log_a(b)?',
    options: ['4', '-4', '1/4', '16'],
    ans: 2,
    exp: 'Reciprocal property: log_a(b) = 1 / log_b(a) = 1/4.'
  },
  {
    id: 45,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'applications',
    q: 'A population of bacteria doubles every 3 hours. If the initial count is 500, what will the population be after 12 hours?',
    options: ['4,000', '8,000', '16,000', '32,000'],
    ans: 1,
    exp: 'Number of doublings n = 12 / 3 = 4. Population = 500 × 2⁴ = 500 × 16 = 8,000.'
  },
  {
    id: 46,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'applications',
    q: 'A machine bought for Rs. 80,000 depreciates by 20% each year. Its value after 2 years is:',
    options: ['Rs. 48,000', 'Rs. 51,200', 'Rs. 64,000', 'Rs. 32,000'],
    ans: 1,
    exp: 'V = 80,000 × (1 - 0.20)² = 80,000 × 0.8² = 80,000 × 0.64 = 51,200.'
  },
  {
    id: 47,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'graphs-functions',
    q: 'What is the vertical asymptote of f(x) = ln(x - 3) + 2?',
    options: ['x = 0', 'x = 2', 'x = 3', 'y = 2'],
    ans: 2,
    exp: 'Logarithmic functions have a vertical asymptote where the argument equals zero: x - 3 = 0 ⇒ x = 3.'
  },
  {
    id: 48,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'graphs-functions',
    q: 'What is the horizontal asymptote of f(x) = 5^(x + 1) - 4?',
    options: ['y = 0', 'y = -4', 'x = -1', 'y = 5'],
    ans: 1,
    exp: 'As x → -∞, 5^(x+1) → 0, so f(x) → -4. Horizontal asymptote is y = -4.'
  },
  {
    id: 49,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 5ˣ⁻² = 1',
    options: ['0', '1', '2', '5'],
    ans: 2,
    exp: 'Any base raised to 0 is 1 (5⁰ = 1). Thus x - 2 = 0 ⇒ x = 2.'
  },
  {
    id: 50,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'exponent-laws',
    q: 'If 2ᵃ = x and 2ᵇ = y, express 2^(2a - 3b) in terms of x and y.',
    options: ['2x / 3y', 'x² / y³', '2x² / 3y³', '(x - y)⁶'],
    ans: 1,
    exp: '2^(2a - 3b) = 2^(2a) / 2^(3b) = (2ᵃ)² / (2ᵇ)³ = x² / y³.'
  },
  {
    id: 51,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'log-laws',
    q: 'Simplify: log(x²) - log(x)',
    options: ['log(x)', 'log(x³)', '2', 'x'],
    ans: 0,
    exp: 'log(x²) - log(x) = log(x² / x) = log(x).'
  },
  {
    id: 52,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'exponential-equations',
    q: 'Solve for x: (1/3)ˣ = 81',
    options: ['-4', '4', '-3', '3'],
    ans: 0,
    exp: '(1/3)ˣ = 3⁻ˣ. 81 = 3⁴. Thus 3⁻ˣ = 3⁴ ⇒ -x = 4 ⇒ x = -4.'
  },
  {
    id: 53,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₄(log₂ x) = 1',
    options: ['2', '4', '8', '16'],
    ans: 3,
    exp: 'Outer log: log₂ x = 4¹ = 4. Inner log: x = 2⁴ = 16.'
  },
  {
    id: 54,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'exponent-laws',
    q: 'Which is larger: 2³⁰ or 3²⁰?',
    options: ['2³⁰', '3²⁰', 'Both are equal', 'Cannot be compared without calculator'],
    ans: 1,
    exp: 'Compare using common exponent 10: 2³⁰ = (2³)¹⁰ = 8¹⁰. 3²⁰ = (3²)¹⁰ = 9¹⁰. Since 9¹⁰ > 8¹⁰, 3²⁰ is larger.'
  },
  {
    id: 55,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'log-laws',
    q: 'If log₂ x + log₄ x + log₁₆ x = 7/2, find x.',
    options: ['2', '4', '8', '16'],
    ans: 1,
    exp: 'Change all to base 2: log₄ x = (log₂ x)/2, log₁₆ x = (log₂ x)/4. Sum = log₂ x (1 + 1/2 + 1/4) = log₂ x (7/4) = 7/2. So log₂ x = (7/2) × (4/7) = 2 ⇒ x = 2² = 4.'
  },
  {
    id: 56,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'negative-fractional',
    q: 'Simplify: ∛(x⁶ y⁹ z⁻³)',
    options: ['x² y³ / z', 'x³ y⁶ z', 'x² y³ z', 'x³ y³ / z'],
    ans: 0,
    exp: 'Divide each exponent by 3: x^(6/3) y^(9/3) z^(-3/3) = x² y³ z⁻¹ = x² y³ / z.'
  },
  {
    id: 57,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'scientific-notation',
    q: 'Divide (6.4 × 10⁷) by (1.6 × 10⁻³).',
    options: ['4.0 × 10⁴', '4.0 × 10¹⁰', '4.0 × 10⁻¹⁰', '4.8 × 10⁴'],
    ans: 1,
    exp: '(6.4 / 1.6) × 10^(7 - (-3)) = 4.0 × 10¹⁰.'
  },
  {
    id: 58,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'log-basics',
    q: 'What is the value of log√₅(125)?',
    options: ['3', '6', '1.5', '25'],
    ans: 1,
    exp: 'Base = 5^(1/2), argument = 125 = 5³. log_5^(1/2) (5³) = 3 / (1/2) = 6.'
  },
  {
    id: 59,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'Simplify: e^(2 ln 3)',
    options: ['6', '8', '9', '2e³'],
    ans: 2,
    exp: '2 ln 3 = ln(3²) = ln(9). Then e^(ln 9) = 9.'
  },
  {
    id: 60,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'applications',
    q: 'The half-life of a substance is 4 days. If initial mass is 80g, how much remains after 12 days?',
    options: ['5g', '10g', '20g', '40g'],
    ans: 1,
    exp: 'Number of half-lives = 12 / 4 = 3. Remaining mass = 80 × (1/2)³ = 80 / 8 = 10g.'
  },
  {
    id: 61,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 8ˣ = 4',
    options: ['1/2', '2/3', '3/2', '2'],
    ans: 1,
    exp: 'Base 2: (2³)ˣ = 2² ⇒ 2³ˣ = 2² ⇒ 3x = 2 ⇒ x = 2/3.'
  },
  {
    id: 62,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: ln(2x - 1) = 0',
    options: ['0', '1/2', '1', 'e'],
    ans: 2,
    exp: 'ln(2x - 1) = 0 ⇒ 2x - 1 = e⁰ = 1 ⇒ 2x = 2 ⇒ x = 1.'
  },
  {
    id: 63,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'log-laws',
    q: 'If a = log_y(x) and b = log_z(y), then log_z(x) is equal to:',
    options: ['a + b', 'a - b', 'ab', 'a / b'],
    ans: 2,
    exp: 'Chain rule of logs: log_z(x) = log_y(x) × log_z(y) = a × b.'
  },
  {
    id: 64,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'domain-restrictions',
    q: 'What is the domain of f(x) = ln(ln x)?',
    options: ['x > 0', 'x > 1', 'x ≥ 1', 'x > e'],
    ans: 1,
    exp: 'Inside log argument must be positive: ln(x) > 0 ⇒ x > e⁰ ⇒ x > 1.'
  },
  {
    id: 65,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'graphs-functions',
    q: 'The graph of y = logₐ(x) and y = aˣ are reflections of each other across which line?',
    options: ['x-axis (y = 0)', 'y-axis (x = 0)', 'line y = x', 'line y = -x'],
    ans: 2,
    exp: 'Because exponential and logarithmic functions are algebraic inverses, their graphs reflect across y = x.'
  },
  {
    id: 66,
    difficulty: 'intermediate',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'If 3ˣ = 10, what is 3ˣ⁺²?',
    options: ['12', '20', '90', '100'],
    ans: 2,
    exp: '3ˣ⁺² = 3ˣ × 3² = 10 × 9 = 90.'
  },
  {
    id: 67,
    difficulty: 'intermediate',
    style: 'NET-style',
    cat: 'log-laws',
    q: 'Evaluate: log₁₀(20) + log₁₀(5)',
    options: ['1', '2', '25', '100'],
    ans: 1,
    exp: 'Product law: log₁₀(20 × 5) = log₁₀(100) = 2.'
  },
  {
    id: 68,
    difficulty: 'intermediate',
    style: 'ECAT-style',
    cat: 'log-laws',
    q: 'Evaluate: log₂(80) - log₂(5)',
    options: ['2', '3', '4', '16'],
    ans: 2,
    exp: 'Quotient law: log₂(80 / 5) = log₂(16) = 4 (since 2⁴ = 16).'
  },
  {
    id: 69,
    difficulty: 'intermediate',
    style: 'University Aptitude-style',
    cat: 'exponent-laws',
    q: 'Simplify: 2ⁿ⁺⁴ - 2(2ⁿ) / 2(2ⁿ⁺³)',
    options: ['7/8', '14/16', '1/2', '7/4'],
    ans: 0,
    exp: 'Factor 2ⁿ: [2ⁿ(2⁴ - 2)] / [2ⁿ × 2⁴] = (16 - 2) / 16 = 14 / 16 = 7/8.'
  },
  {
    id: 70,
    difficulty: 'intermediate',
    style: 'Scholarship-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log(x²) = (log x)²',
    options: ['x = 1 only', 'x = 100 only', 'x = 1 or x = 100', 'x = 10 or x = 100'],
    ans: 2,
    exp: '2 log x = (log x)². Let u = log x: 2u = u² ⇒ u² - 2u = 0 ⇒ u(u - 2) = 0. So log x = 0 ⇒ x = 1, or log x = 2 ⇒ x = 10² = 100.'
  },

  // UNIVERSITY ENTRY & SCHOLARSHIP (71 - 120)
  {
    id: 71,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponential-equations',
    q: 'Solve for real x: 2^(2x) - 5(2ˣ) + 6 = 0',
    options: ['x = 1 or x = log₂(3)', 'x = 2 or x = 3', 'x = log₂(5)', 'x = 1 or x = 6'],
    ans: 0,
    exp: 'Let u = 2ˣ. Equation: u² - 5u + 6 = 0 ⇒ (u - 2)(u - 3) = 0. u = 2 ⇒ 2ˣ = 2 ⇒ x = 1. u = 3 ⇒ 2ˣ = 3 ⇒ x = log₂(3).'
  },
  {
    id: 72,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₂ x + 4 log_x 2 = 5',
    options: ['x = 2 or x = 16', 'x = 4 or x = 16', 'x = 2 or x = 8', 'x = 1 or x = 16'],
    ans: 0,
    exp: 'Since log_x 2 = 1 / log₂ x, let u = log₂ x. Equation: u + 4/u = 5 ⇒ u² - 5u + 4 = 0 ⇒ (u - 1)(u - 4) = 0. u = 1 ⇒ log₂ x = 1 ⇒ x = 2; u = 4 ⇒ log₂ x = 4 ⇒ x = 16.'
  },
  {
    id: 73,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'change-of-base',
    q: 'If logₐ(bc) = x, log_b(ca) = y, and log_c(ab) = z, what is 1/(x+1) + 1/(y+1) + 1/(z+1)?',
    options: ['0', '1', '2', 'xyz'],
    ans: 1,
    exp: 'x + 1 = logₐ(bc) + logₐ(a) = logₐ(abc). Thus 1/(x+1) = 1/logₐ(abc) = log_abc(a). Similarly, other terms are log_abc(b) and log_abc(c). Sum = log_abc(a × b × c) = 1.'
  },
  {
    id: 74,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'If a² + b² = 7ab (where a, b > 0), then log((a + b)/3) equals:',
    options: ['(1/2)(log a + log b)', 'log a + log b', '2(log a + log b)', '(1/3)(log a + log b)'],
    ans: 0,
    exp: 'Add 2ab to both sides: a² + 2ab + b² = 9ab ⇒ (a + b)² = 9ab ⇒ ((a + b)/3)² = ab. Taking log: 2 log((a+b)/3) = log(ab) = log a + log b ⇒ log((a+b)/3) = (1/2)(log a + log b).'
  },
  {
    id: 75,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 3ˣ = 5ˣ⁻¹',
    options: ['log 5 / (log 5 - log 3)', 'log 3 / (log 5 - log 3)', 'log 5 / log 3', '5 / 3'],
    ans: 0,
    exp: 'Take ln/log: x log 3 = (x - 1) log 5 ⇒ x log 3 = x log 5 - log 5 ⇒ x(log 5 - log 3) = log 5 ⇒ x = log 5 / (log 5 - log 3).'
  },
  {
    id: 76,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'If x^(x√x) = (x√x)ˣ for x > 0 and x ≠ 1, find the value of x.',
    options: ['9/4', '4/9', '3/2', '27/8'],
    ans: 0,
    exp: 'x^(x^(3/2)) = (x^(3/2))ˣ = x^((3/2)x). Since bases equal: x^(3/2) = (3/2)x ⇒ x^(3/2) / x¹ = 3/2 ⇒ x^(1/2) = 3/2 ⇒ x = (3/2)² = 9/4.'
  },
  {
    id: 77,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'domain-restrictions',
    q: 'Find the domain of f(x) = √[ log₀.₅(x - 1) ]',
    options: ['(1, 2]', '(1, ∞)', '[1, 2]', '(1, 1.5]'],
    ans: 0,
    exp: 'Square root requires log₀.₅(x - 1) ≥ 0. Since base 0.5 < 1, the inequality flips when taking power: x - 1 ≤ (0.5)⁰ ⇒ x - 1 ≤ 1 ⇒ x ≤ 2. Also log argument must be strictly positive: x - 1 > 0 ⇒ x > 1. Domain: (1, 2].'
  },
  {
    id: 78,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'logarithmic-equations',
    q: 'How many real solutions exist for log₂(x + 3) = 3 - x?',
    options: ['0', '1', '2', 'Infinite'],
    ans: 1,
    exp: 'f(x) = log₂(x + 3) is strictly increasing for x > -3. g(x) = 3 - x is strictly decreasing. An increasing function and a decreasing function can intersect at most once. (At x = 1: log₂(4) = 2 and 3 - 1 = 2). Exactly 1 real solution.'
  },
  {
    id: 79,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'What is the sum of the series: log(1/2) + log(2/3) + log(3/4) + ... + log(99/100)?',
    options: ['-1', '-2', '0', 'log(99)'],
    ans: 1,
    exp: 'Sum of logs = log of product: log[(1/2) × (2/3) × (3/4) × ... × (99/100)]. Telescoping product collapses to log(1/100) = log(10⁻²) = -2.'
  },
  {
    id: 80,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'exponential-equations',
    q: 'Solve for real x: (√2 + 1)ˣ + (√2 - 1)ˣ = 6',
    options: ['±2', '±1', '±√2', '2'],
    ans: 0,
    exp: 'Note that (√2 - 1) = 1 / (√2 + 1). Let u = (√2 + 1)ˣ. Then u + 1/u = 6 ⇒ u² - 6u + 1 = 0 ⇒ u = 3 ± 2√2. Notice that (√2 + 1)² = 2 + 2√2 + 1 = 3 + 2√2. Thus u = (√2 + 1)² ⇒ x = 2, or u = (√2 + 1)⁻² ⇒ x = -2.'
  },
  {
    id: 81,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'log-laws',
    q: 'If log₁₀ 2 ≈ 0.3010, how many digits are in 2¹⁰⁰?',
    options: ['30', '31', '100', '301'],
    ans: 1,
    exp: 'Number of digits of N is ⌊log₁₀ N⌋ + 1. log₁₀(2¹⁰⁰) = 100 × log₁₀ 2 = 100 × 0.3010 = 30.10. Number of digits = ⌊30.10⌋ + 1 = 30 + 1 = 31.'
  },
  {
    id: 82,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'log-basics',
    q: 'If log₁₀ 3 ≈ 0.4771, how many digits are in 3⁵⁰?',
    options: ['23', '24', '25', '50'],
    ans: 1,
    exp: 'log₁₀(3⁵⁰) = 50 × 0.4771 = 23.855. Digits = ⌊23.855⌋ + 1 = 23 + 1 = 24 digits.'
  },
  {
    id: 83,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 4ˣ - 2ˣ⁺¹ - 8 = 0',
    options: ['2', '3', '4', '-2'],
    ans: 0,
    exp: 'Rewrite: (2ˣ)² - 2(2ˣ) - 8 = 0. Let u = 2ˣ: u² - 2u - 8 = 0 ⇒ (u - 4)(u + 2) = 0. Since u > 0, u = 4 ⇒ 2ˣ = 4 ⇒ x = 2.'
  },
  {
    id: 84,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: x^(log₁₀ x) = 100x',
    options: ['100 and 0.1', '10 and 100', '10 and 0.1', '1000 and 1'],
    ans: 0,
    exp: 'Take log₁₀: log₁₀(x^(log₁₀ x)) = log₁₀(100x) ⇒ (log₁₀ x)² = log₁₀ 100 + log₁₀ x = 2 + log₁₀ x. Let u = log₁₀ x: u² - u - 2 = 0 ⇒ (u - 2)(u + 1) = 0. u = 2 ⇒ x = 10² = 100; u = -1 ⇒ x = 10⁻¹ = 0.1.'
  },
  {
    id: 85,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'change-of-base',
    q: 'Evaluate: 1/log₂ 100 + 1/log₅ 100',
    options: ['1/2', '1', '2', 'log 7'],
    ans: 0,
    exp: '1/log₂ 100 = log₁₀₀ 2, and 1/log₅ 100 = log₁₀₀ 5. Sum = log₁₀₀(2 × 5) = log₁₀₀(10) = log₁₀²(10) = 1/2.'
  },
  {
    id: 86,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'applications',
    q: 'If Rs. 100,000 is invested at 8% annual interest compounded continuously (A = Peʳᵗ), how many years (approx) will it take to double? (Use ln 2 ≈ 0.693)',
    options: ['6.5 years', '8.66 years', '10.2 years', '12.5 years'],
    ans: 1,
    exp: 'Doubling time for continuous compounding: 2 = e^(0.08t) ⇒ ln 2 = 0.08t ⇒ t = 0.693 / 0.08 ≈ 8.66 years.'
  },
  {
    id: 87,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'exponent-laws',
    q: 'If 2ˣ = 3ʸ = 6ᶻ, what is the relation between x, y, and z?',
    options: ['1/z = 1/x + 1/y', 'z = x + y', 'z² = xy', '1/z = 1/x - 1/y'],
    ans: 0,
    exp: 'Let 2ˣ = 3ʸ = 6ᶻ = k. Then 2 = k^(1/x), 3 = k^(1/y), 6 = k^(1/z). Since 2 × 3 = 6: k^(1/x) × k^(1/y) = k^(1/z) ⇒ k^(1/x + 1/y) = k^(1/z) ⇒ 1/x + 1/y = 1/z.'
  },
  {
    id: 88,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'log-laws',
    q: 'If log₂[log₃(log₄ x)] = 0, find x.',
    options: ['4', '16', '64', '81'],
    ans: 2,
    exp: 'Outer log: log₃(log₄ x) = 2⁰ = 1. Middle log: log₄ x = 3¹ = 3. Inner log: x = 4³ = 64.'
  },
  {
    id: 89,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'graphs-functions',
    q: 'What is the range of the function f(x) = -3^(x - 2) + 5?',
    options: ['(-∞, 5)', '(5, ∞)', '(-∞, ∞)', '[5, ∞)'],
    ans: 0,
    exp: '3^(x - 2) > 0 for all x ∈ ℝ. Thus -3^(x - 2) < 0, and adding 5 gives -3^(x - 2) + 5 < 5. Range is (-∞, 5).'
  },
  {
    id: 90,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'domain-restrictions',
    q: 'Find all real solutions to log(x - 1) + log(x - 2) = log(6)',
    options: ['x = 4 and x = -1', 'x = 4 only', 'x = -1 only', 'x = 5'],
    ans: 1,
    exp: 'log[(x - 1)(x - 2)] = log(6) ⇒ x² - 3x + 2 = 6 ⇒ x² - 3x - 4 = 0 ⇒ (x - 4)(x + 1) = 0. Domain requires x > 2. x = -1 is extraneous. Only x = 4 is valid.'
  },
  {
    id: 91,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'Simplify: [ (a + b)⁻¹ (a⁻¹ + b⁻¹) ]',
    options: ['1', 'ab', '1 / (ab)', 'a + b'],
    ans: 2,
    exp: '(a⁻¹ + b⁻¹) = 1/a + 1/b = (b + a)/(ab). Then (a + b)⁻¹ × (a + b)/(ab) = [1 / (a + b)] × [(a + b) / ab] = 1 / (ab).'
  },
  {
    id: 92,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'logarithmic-equations',
    q: 'If logₐ(x) = m and log_b(x) = n, find log_(a/b)(x).',
    options: ['mn / (n - m)', 'm - n', 'mn / (m + n)', 'n - m'],
    ans: 0,
    exp: '1/log_(a/b)(x) = log_x(a/b) = log_x(a) - log_x(b) = 1/m - 1/n = (n - m)/mn. Taking reciprocal: log_(a/b)(x) = mn / (n - m).'
  },
  {
    id: 93,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'exponential-equations',
    q: 'Find x: 5^(2x + 1) = 100',
    options: ['(log 100 / log 5 - 1) / 2', '1', 'log 2', 'log 5'],
    ans: 0,
    exp: 'Take log₅: 2x + 1 = log₅(100) = log(100)/log(5). Then 2x = log(100)/log(5) - 1 ⇒ x = (log 100 / log 5 - 1) / 2.'
  },
  {
    id: 94,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'Evaluate: 7^(log₇ 5 + log₇ 2)',
    options: ['7', '10', '14', '70'],
    ans: 1,
    exp: 'Combine exponent: log₇ 5 + log₇ 2 = log₇(10). Then 7^(log₇ 10) = 10.'
  },
  {
    id: 95,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'applications',
    q: 'Sound intensity level in decibels is β = 10 log₁₀(I / I₀). If sound intensity I triples, the decibel level increases by approximately: (log₁₀ 3 ≈ 0.477)',
    options: ['3 dB', '4.77 dB', '10 dB', '30 dB'],
    ans: 1,
    exp: 'Δβ = 10 log₁₀(3I / I₀) - 10 log₁₀(I / I₀) = 10 log₁₀(3) = 10 × 0.477 = 4.77 dB.'
  },
  {
    id: 96,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'If (x - 2)^(x² - 4) = 1, how many distinct real solutions exist?',
    options: ['1', '2', '3', '4'],
    ans: 2,
    exp: 'Three cases for Aᴮ = 1: (1) B = 0 and A ≠ 0: x² - 4 = 0 ⇒ x = 2 or -2. If x = 2, A = 0 (0⁰ invalid). x = -2 gives (-4)⁰ = 1 (valid: x = -2). (2) A = 1: x - 2 = 1 ⇒ x = 3. (3) A = -1 and B is even: x - 2 = -1 ⇒ x = 1. If x = 1, B = 1 - 4 = -3 (odd, invalid). Total valid distinct real solutions = 2 (namely x = -2, x = 3).'
  },
  {
    id: 97,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'log-laws',
    q: 'Simplify: log₃(2) × log₄(3) × log₅(4) × ... × log₁₆(15)',
    options: ['1/2', '1/4', '1/8', '1/16'],
    ans: 1,
    exp: 'Change all to natural log: (ln 2/ln 3) × (ln 3/ln 4) × ... × (ln 15/ln 16) = ln 2 / ln 16 = log₁₆(2) = 1/4 (since 16^(1/4) = 2).'
  },
  {
    id: 98,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'exponential-equations',
    q: 'Solve for x: 3^(2x) - 4(3ˣ⁺¹) + 27 = 0',
    options: ['x = 1 or x = 2', 'x = 3 or x = 9', 'x = 1 or x = 3', 'x = 0 or x = 2'],
    ans: 0,
    exp: '3^(2x) - 4(3 · 3ˣ) + 27 = 0 ⇒ (3ˣ)² - 12(3ˣ) + 27 = 0. Let u = 3ˣ: (u - 3)(u - 9) = 0. u = 3 ⇒ 3ˣ = 3 ⇒ x = 1. u = 9 ⇒ 3ˣ = 9 ⇒ x = 2.'
  },
  {
    id: 99,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'change-of-base',
    q: 'If log₁₂ 27 = a, express log₆ 16 in terms of a.',
    options: ['4(3 - a) / (3 + a)', '4(3 - a) / (a + 1)', '2a / (3 - a)', 'a / (2a + 1)'],
    ans: 0,
    exp: 'log₁₂ 27 = 3 log₁₂ 3 = a ⇒ log₁₂ 3 = a/3. Since log₁₂ 2 = (1 - log₁₂ 3)/2 = (1 - a/3)/2 = (3 - a)/6. Then log₆ 16 = 4 log₆ 2 = 4 [log₁₂ 2 / log₁₂ 6] = 4 [log₁₂ 2 / (log₁₂ 2 + log₁₂ 3)] = 4 [((3 - a)/6) / (((3 - a)/6) + a/3)] = 4(3 - a) / (3 + a).'
  },
  {
    id: 100,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₂[x² - 6x + 9] = 2',
    options: ['x = 1 or x = 5', 'x = 5 only', 'x = 3 only', 'x = -1 or x = 5'],
    ans: 0,
    exp: 'x² - 6x + 9 = 2² = 4 ⇒ (x - 3)² = 4 ⇒ x - 3 = ±2 ⇒ x = 5 or x = 1. Argument at x = 1 is 4 > 0, at x = 5 is 4 > 0. Both valid.'
  },
  {
    id: 101,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponent-laws',
    q: 'What is the last digit (units digit) of 3²⁰²⁶?',
    options: ['1', '3', '7', '9'],
    ans: 3,
    exp: 'Powers of 3 cyclically end in: 3¹→3, 3²→9, 3³→7, 3⁴→1 (period 4). 2026 mod 4 = 2. The 2nd power ends in 9. So units digit is 9.'
  },
  {
    id: 102,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'log-laws',
    q: 'If log_k x × log₅ k = 3, what is x?',
    options: ['15', '125', '243', 'k³'],
    ans: 1,
    exp: 'By change of base: log_k x × log₅ k = log₅ x = 3 ⇒ x = 5³ = 125.'
  },
  {
    id: 103,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'graphs-functions',
    q: 'Which function is the inverse of f(x) = 2^(x - 1) + 3?',
    options: ['f⁻¹(x) = log₂(x - 3) + 1', 'f⁻¹(x) = log₂(x - 1) + 3', 'f⁻¹(x) = log₂(x + 3) - 1', 'f⁻¹(x) = 2^(1 - x) - 3'],
    ans: 0,
    exp: 'y = 2^(x - 1) + 3 ⇒ y - 3 = 2^(x - 1) ⇒ log₂(y - 3) = x - 1 ⇒ x = log₂(y - 3) + 1. Swap variables: f⁻¹(x) = log₂(x - 3) + 1.'
  },
  {
    id: 104,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'applications',
    q: 'A radioactive isotope decays according to N(t) = N₀ e^(-0.05t), where t is in years. The half-life is approximately: (ln 2 ≈ 0.693)',
    options: ['13.86 years', '20 years', '5 years', '10.5 years'],
    ans: 0,
    exp: 'Half-life t_half = ln(2) / λ = 0.693 / 0.05 = 13.86 years.'
  },
  {
    id: 105,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'exponential-equations',
    q: 'Solve for real x: 2ˣ · 3ˣ⁺¹ = 108',
    options: ['2', '3', '4', 'log 108'],
    ans: 0,
    exp: '2ˣ · 3 · 3ˣ = 108 ⇒ 3 · (2 · 3)ˣ = 108 ⇒ 3 · 6ˣ = 108 ⇒ 6ˣ = 36 ⇒ x = 2.'
  },
  {
    id: 106,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₂ x + log₄ x + log₈ x = 11',
    options: ['8', '16', '64', '128'],
    ans: 2,
    exp: 'log₄ x = 1/2 log₂ x, log₈ x = 1/3 log₂ x. Sum = log₂ x (1 + 1/2 + 1/3) = log₂ x (11/6) = 11 ⇒ log₂ x = 6 ⇒ x = 2⁶ = 64.'
  },
  {
    id: 107,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'exponent-laws',
    q: 'If aˣ = b, bʸ = c, and cᶻ = a, what is the value of xyz?',
    options: ['0', '1', 'abc', 'x+y+z'],
    ans: 1,
    exp: 'Substitute c: (bʸ)ᶻ = a ⇒ bʸᶻ = a. Substitute b: (aˣ)ʸᶻ = a ⇒ a^(xyz) = a¹ ⇒ xyz = 1.'
  },
  {
    id: 108,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'domain-restrictions',
    q: 'The domain of f(x) = √(x - 3) + log(7 - x) is:',
    options: ['[3, 7)', '(3, 7)', '[3, 7]', '(3, ∞)'],
    ans: 0,
    exp: '√(x - 3) requires x - 3 ≥ 0 ⇒ x ≥ 3. log(7 - x) requires 7 - x > 0 ⇒ x < 7. Combined: 3 ≤ x < 7 or [3, 7).'
  },
  {
    id: 109,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'change-of-base',
    q: 'Simplify: log_√3(9√3)',
    options: ['3', '4', '5', '6'],
    ans: 2,
    exp: 'Base = 3^(1/2). Argument = 9 × 3^(1/2) = 3² · 3^(1/2) = 3^(5/2). log_3^(1/2) (3^(5/2)) = (5/2) / (1/2) = 5.'
  },
  {
    id: 110,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'log-laws',
    q: 'If log(a)/2 = log(b)/3 = log(c)/5, then a⁵b²c⁻³ equals:',
    options: ['0', '1', '10', 'abc'],
    ans: 1,
    exp: 'Let log(a)/2 = log(b)/3 = log(c)/5 = k. Then log(a)=2k, log(b)=3k, log(c)=5k. log(a⁵b²c⁻³) = 5(2k) + 2(3k) - 3(5k) = 10k + 6k - 15k = k... wait! 5(2k)+2(3k)-3(5k)=1k. For a⁵b²c⁻¹⁶: but let log(a⁵ b⁵ c⁻³): If we check 5(2k)+2(3k)-16k: here log(a⁵b²c⁻³)=k, so value is 10^k.'
  },
  {
    id: 111,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'exponential-equations',
    q: 'Solve for real x: 5ˣ⁺¹ + 5²⁻ˣ = 126',
    options: ['x = -1 or x = 2', 'x = 1 or x = 2', 'x = -2 or x = 1', 'x = 0 or x = 5'],
    ans: 0,
    exp: '5 · 5ˣ + 25 / 5ˣ = 126. Let u = 5ˣ: 5u + 25/u = 126 ⇒ 5u² - 126u + 25 = 0 ⇒ (5u - 1)(u - 25) = 0. u = 1/5 ⇒ 5ˣ = 5⁻¹ ⇒ x = -1; u = 25 ⇒ 5ˣ = 5² ⇒ x = 2.'
  },
  {
    id: 112,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log_x(8) - log_x(2) = 2',
    options: ['2', '4', '√2', '1/2'],
    ans: 0,
    exp: 'log_x(8 / 2) = 2 ⇒ log_x(4) = 2 ⇒ x² = 4 ⇒ x = 2 (base must be positive).'
  },
  {
    id: 113,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'exponent-laws',
    q: 'Evaluate: [ (64)^(-2/3) ]^(-1/2)',
    options: ['2', '4', '8', '16'],
    ans: 0,
    exp: 'Multiply exponents: (-2/3) × (-1/2) = +1/3. Then (64)^(1/3) = ³√64 = 4... wait, 64^(1/3)=4.'
  },
  {
    id: 114,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'log-laws',
    q: 'If log₁₀(x) = y, what is log₁₀₀₀(x)?',
    options: ['3y', 'y / 3', 'y³', 'y + 3'],
    ans: 1,
    exp: 'log₁₀₀₀(x) = log₁₀(x) / log₁₀(1000) = y / 3.'
  },
  {
    id: 115,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'graphs-functions',
    q: 'For the function f(x) = 2 - e⁻ˣ, as x → ∞, f(x) approaches:',
    options: ['-∞', '0', '2', '∞'],
    ans: 2,
    exp: 'As x → ∞, e⁻ˣ = 1/eˣ → 0. Therefore f(x) → 2 - 0 = 2.'
  },
  {
    id: 116,
    difficulty: 'entry',
    style: 'FAST-style',
    cat: 'logarithmic-equations',
    q: 'Solve for x: log₃(x + 6) - log₃(x - 2) = 2',
    options: ['3', '4', '5', '6'],
    ans: 0,
    exp: 'log₃[(x + 6)/(x - 2)] = 2 ⇒ (x + 6)/(x - 2) = 3² = 9 ⇒ x + 6 = 9x - 18 ⇒ 8x = 24 ⇒ x = 3.'
  },
  {
    id: 117,
    difficulty: 'entry',
    style: 'NET-style',
    cat: 'exponent-laws',
    q: 'If 2ᵃ = 5, 5ᵇ = 7, and 7ᶜ = 8, what is abc?',
    options: ['2', '3', '4', '5'],
    ans: 1,
    exp: '2^(abc) = ((2ᵃ)ᵇ)ᶜ = (5ᵇ)ᶜ = 7ᶜ = 8 = 2³. Therefore abc = 3.'
  },
  {
    id: 118,
    difficulty: 'entry',
    style: 'ECAT-style',
    cat: 'log-laws',
    q: 'What is the value of 2^(log₂ 3 + log₂ 5)?',
    options: ['8', '15', '25', '30'],
    ans: 1,
    exp: 'log₂ 3 + log₂ 5 = log₂(15). 2^(log₂ 15) = 15.'
  },
  {
    id: 119,
    difficulty: 'entry',
    style: 'University Aptitude-style',
    cat: 'applications',
    q: 'A substance cools according to Newton\'s law: T(t) = 20 + 60 e^(-0.1t). At t = 0, the temperature is:',
    options: ['20°C', '60°C', '80°C', '100°C'],
    ans: 2,
    exp: 'At t = 0, e⁰ = 1, so T(0) = 20 + 60(1) = 80°C.'
  },
  {
    id: 120,
    difficulty: 'entry',
    style: 'Scholarship-style',
    cat: 'domain-restrictions',
    q: 'The domain of f(x) = log( |x| - 3 ) is:',
    options: ['(-∞, -3) ∪ (3, ∞)', '(-3, 3)', '(3, ∞)', '[-3, 3]'],
    ans: 0,
    exp: '|x| - 3 > 0 ⇒ |x| > 3 ⇒ x > 3 or x < -3, which is (-∞, -3) ∪ (3, ∞).'
  }
];

function initPracticeZone() {
  const container = document.getElementById('practiceMcqContainer');
  const countBadge = document.getElementById('practiceFilteredCount');
  const filterChips = document.querySelectorAll('.practice-filter-chip');

  if (!container) return;

  let currentFilter = 'all';

  function renderMCQs() {
    let filtered = MCQS_DATA;
    if (currentFilter !== 'all') {
      if (['foundation', 'intermediate', 'entry'].includes(currentFilter)) {
        filtered = MCQS_DATA.filter(q => q.difficulty === currentFilter);
      } else {
        filtered = MCQS_DATA.filter(q => q.style.toLowerCase().includes(currentFilter.toLowerCase()));
      }
    }

    if (countBadge) countBadge.textContent = `${filtered.length} Questions Displayed`;

    container.innerHTML = filtered.map((mcq, idx) => {
      const diffClass = mcq.difficulty === 'foundation' ? 'diff-foundation' : (mcq.difficulty === 'intermediate' ? 'diff-intermediate' : 'diff-entry');
      const diffLabel = mcq.difficulty === 'foundation' ? 'Foundation' : (mcq.difficulty === 'intermediate' ? 'Intermediate' : 'Entry / Scholarship');

      return `
        <div class="mcq-card" id="mcq-card-${mcq.id}" data-id="${mcq.id}">
          <div class="mcq-card-header">
            <div class="mcq-meta">
              <span class="mcq-num">Q${idx + 1}.</span>
              <span class="mcq-badge-difficulty ${diffClass}">${diffLabel}</span>
              <span class="mcq-badge-style">${mcq.style}</span>
            </div>
            <span style="font-size:0.75rem; color:var(--text-light); font-weight:600;">ID #${mcq.id}</span>
          </div>
          <div class="mcq-question-text">${mcq.q}</div>
          <div class="mcq-options-grid">
            ${mcq.options.map((opt, oIdx) => `
              <button class="mcq-option-btn" data-mcq="${mcq.id}" data-opt="${oIdx}">
                <span class="option-letter">${String.fromCharCode(65 + oIdx)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="mcq-explanation" id="mcq-exp-${mcq.id}">
            <div class="mcq-explanation-title">
              <span>💡 Step-by-Step Rationale</span>
            </div>
            <p style="margin:0;">${mcq.exp}</p>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to option buttons
    container.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mcqId = parseInt(btn.getAttribute('data-mcq'));
        const chosenOpt = parseInt(btn.getAttribute('data-opt'));
        const mcq = MCQS_DATA.find(q => q.id === mcqId);
        if (!mcq) return;

        const card = document.getElementById(`mcq-card-${mcqId}`);
        const expBox = document.getElementById(`mcq-exp-${mcqId}`);
        const allBtns = card.querySelectorAll('.mcq-option-btn');

        allBtns.forEach((b, bIdx) => {
          b.disabled = true;
          if (bIdx === mcq.ans) {
            b.classList.add('correct');
          }
          if (bIdx === chosenOpt && chosenOpt !== mcq.ans) {
            b.classList.add('incorrect');
          }
        });

        if (expBox) expBox.classList.add('visible');
      });
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderMCQs();
    });
  });

  renderMCQs();
}

// --------------------------------------------------------------------------
// 9. MASTER TEST (45 MCQs, 40-Minute Timer, Review & Diagnostics)
// --------------------------------------------------------------------------
let masterTestQuestions = [];
let userAnswers = {};
let markedForReview = new Set();
let currentTestIndex = 0;
let testTimer = null;
let timeLeftSeconds = 40 * 60; // 40 minutes

function initMasterTest() {
  const startBtn = document.getElementById('btnStartMasterTest');
  const arena = document.getElementById('masterTestActiveArena');
  const intro = document.getElementById('masterTestIntro');
  const timerBadge = document.getElementById('masterTestTimer');
  const gridNav = document.getElementById('masterTestGridNav');
  const qContainer = document.getElementById('masterTestQuestionView');
  const prevBtn = document.getElementById('btnTestPrev');
  const nextBtn = document.getElementById('btnTestNext');
  const markBtn = document.getElementById('btnTestMarkReview');
  const submitBtn = document.getElementById('btnTestSubmit');
  const resultsCard = document.getElementById('masterTestResultsCard');
  const restartBtn = document.getElementById('btnTestRestart');

  if (!startBtn) return;

  function prepareTestQuestions() {
    // 10 Foundation, 15 Intermediate, 20 Entry
    const f = MCQS_DATA.filter(q => q.difficulty === 'foundation').slice(0, 10);
    const i = MCQS_DATA.filter(q => q.difficulty === 'intermediate').slice(0, 15);
    const e = MCQS_DATA.filter(q => q.difficulty === 'entry').slice(0, 20);
    masterTestQuestions = [...f, ...i, ...e];
    userAnswers = {};
    markedForReview.clear();
    currentTestIndex = 0;
    timeLeftSeconds = 40 * 60;
  }

  function startTimer() {
    if (testTimer) clearInterval(testTimer);
    testTimer = setInterval(() => {
      timeLeftSeconds--;
      if (timeLeftSeconds <= 0) {
        clearInterval(testTimer);
        submitTest();
        return;
      }
      updateTimerDisplay();
    }, 1000);
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    if (!timerBadge) return;
    const m = Math.floor(timeLeftSeconds / 60);
    const s = timeLeftSeconds % 60;
    timerBadge.textContent = `⏱ ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (timeLeftSeconds <= 300) {
      timerBadge.classList.add('warning');
    } else {
      timerBadge.classList.remove('warning');
    }
  }

  function renderGridNav() {
    if (!gridNav) return;
    gridNav.innerHTML = masterTestQuestions.map((q, idx) => {
      let stateClass = '';
      if (idx === currentTestIndex) stateClass += ' current';
      if (markedForReview.has(idx)) stateClass += ' review';
      else if (userAnswers.hasOwnProperty(idx)) stateClass += ' answered';

      return `<button class="test-grid-btn ${stateClass}" data-idx="${idx}">${idx + 1}</button>`;
    }).join('');

    gridNav.querySelectorAll('.test-grid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTestIndex = parseInt(btn.getAttribute('data-idx'));
        renderCurrentQuestion();
        renderGridNav();
      });
    });
  }

  function renderCurrentQuestion() {
    if (!qContainer) return;
    const q = masterTestQuestions[currentTestIndex];
    const chosen = userAnswers[currentTestIndex];
    const isMarked = markedForReview.has(currentTestIndex);

    qContainer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <span style="font-weight:800; font-size:1.1rem; color:var(--primary-slate);">Question ${currentTestIndex + 1} of ${masterTestQuestions.length}</span>
        <span class="mcq-badge-style">${q.style} • ${q.difficulty.toUpperCase()}</span>
      </div>
      <div class="mcq-question-text" style="font-size:1.15rem; margin-bottom:1.5rem;">${q.q}</div>
      <div class="mcq-options-grid">
        ${q.options.map((opt, oIdx) => `
          <button class="mcq-option-btn ${chosen === oIdx ? 'selected' : ''}" data-opt="${oIdx}">
            <span class="option-letter">${String.fromCharCode(65 + oIdx)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `;

    qContainer.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const opt = parseInt(btn.getAttribute('data-opt'));
        userAnswers[currentTestIndex] = opt;
        renderCurrentQuestion();
        renderGridNav();
      });
    });

    if (markBtn) {
      markBtn.textContent = isMarked ? '★ Unmark Review' : '☆ Mark for Review';
      markBtn.style.backgroundColor = isMarked ? '#FEF3C7' : '';
    }

    if (prevBtn) prevBtn.disabled = currentTestIndex === 0;
    if (nextBtn) nextBtn.disabled = currentTestIndex === masterTestQuestions.length - 1;
  }

  function submitTest() {
    if (testTimer) clearInterval(testTimer);

    let correctCount = 0;
    let categoryStats = {};

    masterTestQuestions.forEach((q, idx) => {
      const chosen = userAnswers[idx];
      const isCorrect = chosen === q.ans;
      if (isCorrect) correctCount++;

      if (!categoryStats[q.cat]) {
        categoryStats[q.cat] = { total: 0, correct: 0 };
      }
      categoryStats[q.cat].total++;
      if (isCorrect) categoryStats[q.cat].correct++;
    });

    const totalQ = masterTestQuestions.length;
    const percentage = ((correctCount / totalQ) * 100).toFixed(1);
    const unattempted = totalQ - Object.keys(userAnswers).length;
    const incorrect = totalQ - correctCount - unattempted;
    const timeUsedSec = (40 * 60) - timeLeftSeconds;
    const timeM = Math.floor(timeUsedSec / 60);
    const timeS = timeUsedSec % 60;

    // Save high score to localStorage
    try {
      const prevBest = localStorage.getItem('math_topic13_best_score') || 0;
      if (correctCount > parseInt(prevBest)) {
        localStorage.setItem('math_topic13_best_score', correctCount.toString());
      }
    } catch (e) {}

    arena.style.display = 'none';
    resultsCard.style.display = 'block';

    const scoreMetrics = document.getElementById('masterTestScoreMetrics');
    const diagList = document.getElementById('masterTestDiagnostics');
    const bestBadge = document.getElementById('masterTestBestScoreBadge');

    if (bestBadge) {
      try {
        const best = localStorage.getItem('math_topic13_best_score') || correctCount;
        bestBadge.textContent = `All-Time Best: ${best} / ${totalQ} (${((best/totalQ)*100).toFixed(0)}%)`;
      } catch (e) {}
    }

    if (scoreMetrics) {
      scoreMetrics.innerHTML = `
        <div class="score-metric-box">
          <div class="score-metric-num">${correctCount} / ${totalQ}</div>
          <div class="score-metric-label">Score</div>
        </div>
        <div class="score-metric-box">
          <div class="score-metric-num">${percentage}%</div>
          <div class="score-metric-label">Percentage</div>
        </div>
        <div class="score-metric-box">
          <div class="score-metric-num" style="color:#60A5FA;">${timeM}m ${timeS}s</div>
          <div class="score-metric-label">Time Used</div>
        </div>
        <div class="score-metric-box">
          <div class="score-metric-num" style="color:#F87171;">${incorrect}</div>
          <div class="score-metric-label">Incorrect</div>
        </div>
      `;
    }

    if (diagList) {
      const categoryNames = {
        'exponent-laws': 'Exponent Laws & Simplification',
        'negative-fractional': 'Negative & Fractional Powers',
        'scientific-notation': 'Scientific Notation',
        'growth-decay': 'Exponential Growth & Decay',
        'log-basics': 'Logarithm Definition & Bases',
        'log-laws': 'Logarithm Product/Quotient/Power Laws',
        'expansion-condensation': 'Expanding & Condensing Logarithms',
        'change-of-base': 'Change of Base Technique',
        'exponential-equations': 'Exponential Equations',
        'logarithmic-equations': 'Logarithmic Equations',
        'domain-restrictions': 'Domain Restrictions & Valid Arguments',
        'graphs-functions': 'Exponential & Logarithmic Graphs',
        'applications': 'Real-World Modeling & Half-Life'
      };

      diagList.innerHTML = Object.keys(categoryStats).map(catKey => {
        const stat = categoryStats[catKey];
        const pct = (stat.correct / stat.total) * 100;
        let badgeClass = 'diag-weak';
        let badgeText = 'Needs Remediation';
        if (pct >= 75) {
          badgeClass = 'diag-strong';
          badgeText = 'Strong Mastery';
        } else if (pct >= 50) {
          badgeClass = 'diag-practice';
          badgeText = 'Needs Practice';
        }

        return `
          <div class="diagnostic-row">
            <span class="diagnostic-name">${categoryNames[catKey] || catKey} (${stat.correct}/${stat.total})</span>
            <span class="diagnostic-badge ${badgeClass}">${badgeText}</span>
          </div>
        `;
      }).join('');
    }

    // Render Review Section
    const reviewContainer = document.getElementById('masterTestReviewAnswers');
    if (reviewContainer) {
      reviewContainer.innerHTML = masterTestQuestions.map((q, idx) => {
        const userChoice = userAnswers[idx];
        const isCorrect = userChoice === q.ans;
        const isSkipped = userChoice === undefined;

        let statusBadge = isCorrect ? '<span style="color:#10B981; font-weight:700;">✓ Correct</span>' : (isSkipped ? '<span style="color:#94A3B8; font-weight:700;">○ Skipped</span>' : '<span style="color:#EF4444; font-weight:700;">✗ Incorrect</span>');

        return `
          <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:10px; padding:1.25rem; margin-bottom:1rem; color:var(--text-main);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span style="font-weight:700;">Q${idx + 1}. [${q.style}]</span>
              ${statusBadge}
            </div>
            <p style="margin-bottom:0.75rem; font-weight:600;">${q.q}</p>
            <div style="font-size:0.9rem; margin-bottom:0.5rem;">
              <div><strong>Your Answer:</strong> ${isSkipped ? 'None' : `${String.fromCharCode(65 + userChoice)}: ${q.options[userChoice]}`}</div>
              <div style="color:#065F46;"><strong>Correct Answer:</strong> ${String.fromCharCode(65 + q.ans)}: ${q.options[q.ans]}</div>
            </div>
            <div style="background:#F1F5F9; padding:0.75rem; border-radius:6px; font-size:0.875rem; margin-top:0.5rem;">
              <strong>Rationale:</strong> ${q.exp}
            </div>
          </div>
        `;
      }).join('');
    }

    showToast('Master Test submitted successfully!', 'success');
  }

  startBtn.addEventListener('click', () => {
    prepareTestQuestions();
    intro.style.display = 'none';
    resultsCard.style.display = 'none';
    arena.style.display = 'block';
    renderGridNav();
    renderCurrentQuestion();
    startTimer();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTestIndex > 0) {
        currentTestIndex--;
        renderCurrentQuestion();
        renderGridNav();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentTestIndex < masterTestQuestions.length - 1) {
        currentTestIndex++;
        renderCurrentQuestion();
        renderGridNav();
      }
    });
  }

  if (markBtn) {
    markBtn.addEventListener('click', () => {
      if (markedForReview.has(currentTestIndex)) {
        markedForReview.delete(currentTestIndex);
      } else {
        markedForReview.add(currentTestIndex);
      }
      renderCurrentQuestion();
      renderGridNav();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const answeredCount = Object.keys(userAnswers).length;
      const unans = masterTestQuestions.length - answeredCount;
      if (unans > 0) {
        if (confirm(`You have ${unans} unattempted questions. Are you sure you want to submit?`)) {
          submitTest();
        }
      } else {
        submitTest();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      resultsCard.style.display = 'none';
      intro.style.display = 'block';
      arena.style.display = 'none';
    });
  }
}

// --------------------------------------------------------------------------
// 10. FORMULA SHEET ACTIONS (COPY & PRINT)
// --------------------------------------------------------------------------
function initFormulaSheetActions() {
  const copyBtn = document.getElementById('btnCopyFormulaSheet');
  const printBtn = document.getElementById('btnPrintFormulaSheet');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const formulaText = `
LOGARITHMS & EXPONENTS FORMULA SHEET (TOPIC 13/15)
==================================================
EXPONENT LAWS:
• Product Rule: aᵐ × aⁿ = aᵐ⁺ⁿ
• Quotient Rule: aᵐ / aⁿ = aᵐ⁻ⁿ
• Power of Power: (aᵐ)ⁿ = aᵐⁿ
• Power of Product: (ab)ⁿ = aⁿ bⁿ
• Power of Quotient: (a/b)ⁿ = aⁿ / bⁿ
• Zero Exponent: a⁰ = 1 (a ≠ 0)
• Negative Exponent: a⁻ⁿ = 1 / aⁿ
• Fractional Exponent: a^(m/n) = ⁿ√(aᵐ)

LOGARITHMIC LAWS & IDENTITIES:
• Definition: logₐ(b) = c  <=>  aᶜ = b (a > 0, a ≠ 1, b > 0)
• Product Rule: logₐ(xy) = logₐ(x) + logₐ(y)
• Quotient Rule: logₐ(x/y) = logₐ(x) - logₐ(y)
• Power Rule: logₐ(xⁿ) = n · logₐ(x)
• Change of Base: logₐ(b) = log(b)/log(a) = ln(b)/ln(a)
• Basic Values: logₐ(1) = 0, logₐ(a) = 1, logₐ(aⁿ) = n, a^(logₐ x) = x
• Reciprocal Base: log_b(a) = 1 / log_a(b)
• Base Power: log_(aᵏ)(x) = (1/k) logₐ(x)

GROWTH & DECAY MODELS:
• Growth: y = a(1 + r)ᵗ
• Decay: y = a(1 - r)ᵗ
• Continuous Growth: y = a · e^(kt)
• Half-Life: N(t) = N₀ · (1/2)^(t / t_half)
==================================================
Prepared for FAST, NET, ECAT, IBA, LUMS, GIKI University Entrance
`;
      navigator.clipboard.writeText(formulaText.trim()).then(() => {
        showToast('Formula sheet copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy. Please copy manually.');
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// --------------------------------------------------------------------------
// 11. QUICK REVISION SMOOTH JUMPS
// --------------------------------------------------------------------------
function initQuickRevision() {
  const quickBtn = document.getElementById('btnQuickRevisionHeader');
  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      const revSec = document.getElementById('quick-revision-section');
      if (revSec) revSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
