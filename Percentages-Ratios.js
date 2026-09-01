/**
 * Percentages, Ratios & Proportions - EduNexa AI Learning Module
 * Complete Interactive Application Logic
 */

(function () {
  'use strict';

  // State Management
  const state = {
    theme: localStorage.getItem('studymate_theme') || 'light',
    notes: JSON.parse(localStorage.getItem('studymate_notes') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('studymate_bookmarks') || '[]'),
    progress: JSON.parse(localStorage.getItem('studymate_progress') || JSON.stringify({
      practiceAnswered: 0,
      practiceCorrect: 0,
      quizAttempts: 0,
      bestQuizScore: 0,
      completedLessons: []
    })),
    currentPractice: null,
    practiceCategory: 'all',
    quiz: {
      currentIndex: 0,
      userAnswers: new Array(10).fill(null),
      isFinished: false,
      questions: [
        {
          category: 'PERCENTAGES',
          question: 'What is 35% of 240?',
          options: ['72', '84', '96', '80'],
          correctIndex: 1,
          explanation: '35% of 240 = (35 / 100) × 240 = 0.35 × 240 = 84.'
        },
        {
          category: 'CONVERSIONS',
          question: 'Convert the fraction 3/8 into a percentage.',
          options: ['37.5%', '38.0%', '33.3%', '42.5%'],
          correctIndex: 0,
          explanation: '3 ÷ 8 = 0.375. Multiplying by 100 gives 37.5%.'
        },
        {
          category: 'PERCENTAGE CHANGE',
          question: 'A jacket price increased from $80 to $100. What is the percentage increase?',
          options: ['20%', '25%', '15%', '30%'],
          correctIndex: 1,
          explanation: 'Difference = $20. (20 / 80) × 100 = 25% increase.'
        },
        {
          category: 'DISCOUNTS',
          question: 'A phone costs $600 and has a 15% discount. What is the final selling price?',
          options: ['$510', '$500', '$490', '$525'],
          correctIndex: 0,
          explanation: 'Discount = 15% of $600 = $90. Final price = $600 − $90 = $510.'
        },
        {
          category: 'PROFIT & LOSS',
          question: 'An item bought for $50 is sold for $65. What is the profit percentage?',
          options: ['25%', '30%', '15%', '35%'],
          correctIndex: 1,
          explanation: 'Profit = $65 − $50 = $15. Profit % = (15 / 50) × 100 = 30%.'
        },
        {
          category: 'RATIOS',
          question: 'Simplify the ratio 42 : 56 to its lowest terms.',
          options: ['3 : 4', '6 : 8', '7 : 9', '4 : 5'],
          correctIndex: 0,
          explanation: 'The greatest common divisor of 42 and 56 is 14. 42÷14 = 3, 56÷14 = 4 &rarr; 3 : 4.'
        },
        {
          category: 'EQUIVALENT RATIOS',
          question: 'Which of the following ratios is NOT equivalent to 4 : 5?',
          options: ['8 : 10', '16 : 20', '24 : 30', '14 : 18'],
          correctIndex: 3,
          explanation: '14 : 18 simplifies to 7 : 9, which is not equal to 4 : 5.'
        },
        {
          category: 'COMPARING RATIOS',
          question: 'Which ratio represents a higher proportional value: 3 : 5 or 5 : 8?',
          options: ['3 : 5', '5 : 8', 'They are equal', 'Cannot be compared'],
          correctIndex: 1,
          explanation: '3/5 = 0.600, while 5/8 = 0.625. Therefore 5 : 8 is larger.'
        },
        {
          category: 'PROPORTIONS',
          question: 'Solve for x in the proportion: 4 / 7 = 16 / x.',
          options: ['24', '28', '32', '35'],
          correctIndex: 1,
          explanation: 'Cross multiply: 4 · x = 7 · 16 = 112. x = 112 / 4 = 28.'
        },
        {
          category: 'REAL WORLD',
          question: 'If 4 cans of paint cover 120 square meters, how many cans are needed for 210 square meters?',
          options: ['6 cans', '7 cans', '8 cans', '9 cans'],
          correctIndex: 1,
          explanation: 'Each can covers 120 / 4 = 30 sq meters. For 210 sq m: 210 / 30 = 7 cans.'
        }
      ]
    }
  };

  // Math Utilities
  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  function round(val, dec = 2) {
    if (isNaN(val) || !isFinite(val)) return 0;
    const factor = Math.pow(10, dec);
    return Math.round(val * factor) / factor;
  }

  function formatNumber(num) {
    if (isNaN(num)) return '0';
    return Number(num).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  // Toast Notification System
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // Theme Management
  function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlEl = document.documentElement;

    function applyTheme(themeName) {
      state.theme = themeName;
      htmlEl.setAttribute('data-theme', themeName);
      localStorage.setItem('studymate_theme', themeName);
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = themeName === 'dark' 
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    }

    applyTheme(state.theme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        showToast(`Switched to ${nextTheme} theme`);
      });
    }
  }

  // Navigation & ScrollSpy
  function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-nav');
    const navItems = document.querySelectorAll('.sidebar-nav-item');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Close on clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 860 && sidebar.classList.contains('open')) {
          if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
          }
        }
      });
    }

    // Smooth Scroll and active links
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth <= 860 && sidebar) {
              sidebar.classList.remove('open');
            }
          }
        }
      });
    });

    // ScrollSpy for Active Section
    const sections = Array.from(document.querySelectorAll('.section-block, .hero-section'));
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          const id = sec.getAttribute('id');
          navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${id}`) {
              navItems.forEach(ni => ni.classList.remove('active'));
              item.classList.add('active');
            }
          });
          break;
        }
      }
    });
  }

  // 3-Way Conversion Tool
  function initializeConverter() {
    const inputPct = document.getElementById('conv-percentage');
    const inputDec = document.getElementById('conv-decimal');
    const inputNum = document.getElementById('conv-frac-num');
    const inputDen = document.getElementById('conv-frac-den');
    const summary = document.getElementById('conv-result-summary');
    const stepBox = document.getElementById('conv-step-box');

    function updateFromPct(val) {
      const p = parseFloat(val);
      if (isNaN(p)) return;
      const dec = round(p / 100, 4);
      inputDec.value = dec;

      // Fraction
      const factor = 10000;
      const numerator = Math.round(p * 100);
      const denominator = 10000;
      const g = gcd(numerator, denominator);
      inputNum.value = numerator / g;
      inputDen.value = denominator / g;

      renderBreakdown(p, `${numerator/g}/${denominator/g}`, dec);
    }

    function updateFromDec(val) {
      const d = parseFloat(val);
      if (isNaN(d)) return;
      const pct = round(d * 100, 2);
      inputPct.value = pct;

      const factor = 10000;
      const num = Math.round(d * factor);
      const g = gcd(num, factor);
      inputNum.value = num / g;
      inputDen.value = factor / g;

      renderBreakdown(pct, `${num/g}/${factor/g}`, d);
    }

    function updateFromFrac() {
      const num = parseFloat(inputNum.value);
      const den = parseFloat(inputDen.value);
      if (isNaN(num) || isNaN(den) || den === 0) return;

      const dec = round(num / den, 4);
      const pct = round((num / den) * 100, 2);
      inputDec.value = dec;
      inputPct.value = pct;

      renderBreakdown(pct, `${num}/${den}`, dec);
    }

    function renderBreakdown(pct, frac, dec) {
      if (summary) summary.innerText = `${pct}% = ${frac} = ${dec}`;
      if (stepBox) {
        stepBox.innerHTML = `
          <div class="step-item"><span class="step-num">1</span><span>Decimal equivalent: <strong>${pct} ÷ 100 = ${dec}</strong></span></div>
          <div class="step-item"><span class="step-num">2</span><span>Fraction in lowest terms: <strong>${frac}</strong></span></div>
          <div class="step-item"><span class="step-num">3</span><span>Percentage representation: <strong>${pct}%</strong></span></div>
        `;
      }
    }

    if (inputPct) inputPct.addEventListener('input', (e) => updateFromPct(e.target.value));
    if (inputDec) inputDec.addEventListener('input', (e) => updateFromDec(e.target.value));
    if (inputNum) inputNum.addEventListener('input', updateFromFrac);
    if (inputDen) inputDen.addEventListener('input', updateFromFrac);
  }

  // Percentage of a Number (What is X% of Y?)
  function percentageCalculator() {
    const btn = document.getElementById('btn-calc-pct-of-num');
    const inputP = document.getElementById('pct-calc-p');
    const inputN = document.getElementById('pct-calc-n');
    const valEl = document.getElementById('res-val-pct-of-num');
    const stepsEl = document.getElementById('res-steps-pct-of-num');

    function calculate() {
      const p = parseFloat(inputP.value);
      const n = parseFloat(inputN.value);
      if (isNaN(p) || isNaN(n)) {
        valEl.innerText = 'Invalid Input';
        return;
      }
      const ans = round((p / 100) * n, 2);
      valEl.innerText = formatNumber(ans);
      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Formula: (Percentage ÷ 100) × Base Number</span></div>
        <div class="step-item"><span class="step-num">2</span><span>(${p} ÷ 100) × ${n} = ${p/100} × ${n}</span></div>
        <div class="step-item"><span class="step-num">3</span><span><strong>= ${formatNumber(ans)}</strong></span></div>
      `;
      showToast('Calculated percentage of number');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', calculate);
  }

  // Percentage Increase / Decrease
  function percentageChangeCalculator() {
    const btn = document.getElementById('btn-calc-pct-increase');
    const inputOrig = document.getElementById('pct-change-orig');
    const inputNew = document.getElementById('pct-change-new');
    const titleEl = document.getElementById('res-title-pct-change');
    const valEl = document.getElementById('res-val-pct-change');
    const stepsEl = document.getElementById('res-steps-pct-change');

    function calculate() {
      const orig = parseFloat(inputOrig.value);
      const newVal = parseFloat(inputNew.value);

      if (isNaN(orig) || isNaN(newVal) || orig === 0) {
        valEl.innerText = 'Invalid Input';
        return;
      }

      const diff = newVal - orig;
      const pctChange = round((diff / orig) * 100, 2);
      const isIncrease = diff >= 0;

      titleEl.innerText = isIncrease ? 'Percentage Increase' : 'Percentage Decrease';
      valEl.innerText = `${isIncrease ? '+' : ''}${pctChange}%`;
      valEl.style.color = isIncrease ? 'var(--success)' : 'var(--danger)';

      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Difference = New − Original = ${newVal} − ${orig} = <strong>${round(diff, 2)}</strong></span></div>
        <div class="step-item"><span class="step-num">2</span><span>Formula: (Difference ÷ Original) × 100</span></div>
        <div class="step-item"><span class="step-num">3</span><span>(${round(diff, 2)} ÷ ${orig}) × 100 = <strong>${pctChange}%</strong> (${isIncrease ? 'Increase' : 'Decrease'})</span></div>
      `;
      showToast('Calculated percentage change');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', calculate);
  }

  // Discount Calculator
  function discountCalculator() {
    const btn = document.getElementById('btn-calc-discount');
    const inputPrice = document.getElementById('disc-orig-price');
    const inputPct = document.getElementById('disc-percent');
    const valEl = document.getElementById('res-val-discount');
    const stepsEl = document.getElementById('res-steps-discount');

    function calculate() {
      const price = parseFloat(inputPrice.value);
      const disc = parseFloat(inputPct.value);

      if (isNaN(price) || isNaN(disc) || price < 0) {
        valEl.innerText = 'Invalid Input';
        return;
      }

      const discAmount = round((disc / 100) * price, 2);
      const finalPrice = round(price - discAmount, 2);

      valEl.innerText = `$${formatNumber(finalPrice)}`;

      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Discount Amount = $${formatNumber(price)} × (${disc} ÷ 100) = <strong>$${formatNumber(discAmount)}</strong></span></div>
        <div class="step-item"><span class="step-num">2</span><span>Final Price = $${formatNumber(price)} − $${formatNumber(discAmount)} = <strong>$${formatNumber(finalPrice)}</strong></span></div>
      `;
      showToast('Calculated final discount price');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', calculate);
  }

  // Profit & Loss Calculator
  function profitLossCalculator() {
    const btn = document.getElementById('btn-calc-profit-loss');
    const inputCP = document.getElementById('pl-cost-price');
    const inputSP = document.getElementById('pl-selling-price');
    const titleEl = document.getElementById('res-title-pl');
    const valEl = document.getElementById('res-val-pl');
    const stepsEl = document.getElementById('res-steps-pl');

    function calculate() {
      const cp = parseFloat(inputCP.value);
      const sp = parseFloat(inputSP.value);

      if (isNaN(cp) || isNaN(sp) || cp <= 0) {
        valEl.innerText = 'Invalid Input';
        return;
      }

      const diff = sp - cp;
      const pct = round((Math.abs(diff) / cp) * 100, 2);

      if (diff > 0) {
        titleEl.innerText = 'Net Profit';
        valEl.innerText = `+$${formatNumber(diff)} (+${pct}%)`;
        valEl.style.color = 'var(--success)';
        stepsEl.innerHTML = `
          <div class="step-item"><span class="step-num">1</span><span>Selling Price ($${sp}) &gt; Cost Price ($${cp}) &rarr; <strong>Profit</strong></span></div>
          <div class="step-item"><span class="step-num">2</span><span>Profit Amount = $${sp} − $${cp} = <strong>$${formatNumber(diff)}</strong></span></div>
          <div class="step-item"><span class="step-num">3</span><span>Profit % = (Profit ÷ CP) × 100 = (${diff} ÷ ${cp}) × 100 = <strong>${pct}%</strong></span></div>
        `;
      } else if (diff < 0) {
        const lossAmt = Math.abs(diff);
        titleEl.innerText = 'Net Loss';
        valEl.innerText = `-$${formatNumber(lossAmt)} (-${pct}%)`;
        valEl.style.color = 'var(--danger)';
        stepsEl.innerHTML = `
          <div class="step-item"><span class="step-num">1</span><span>Selling Price ($${sp}) &lt; Cost Price ($${cp}) &rarr; <strong>Loss</strong></span></div>
          <div class="step-item"><span class="step-num">2</span><span>Loss Amount = $${cp} − $${sp} = <strong>$${formatNumber(lossAmt)}</strong></span></div>
          <div class="step-item"><span class="step-num">3</span><span>Loss % = (Loss ÷ CP) × 100 = (${lossAmt} ÷ ${cp}) × 100 = <strong>${pct}%</strong></span></div>
        `;
      } else {
        titleEl.innerText = 'Break-Even';
        valEl.innerText = '$0.00 (0.00%)';
        valEl.style.color = 'var(--text-primary)';
        stepsEl.innerHTML = `<div class="step-item"><span class="step-num">1</span><span>Selling Price equals Cost Price. No profit, no loss.</span></div>`;
      }
      showToast('Calculated Profit & Loss');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', calculate);
  }

  // Ratio Simplifier (GCD)
  function ratioSimplifier() {
    const btn = document.getElementById('btn-simplify-ratio');
    const inputA = document.getElementById('ratio-simp-a');
    const inputB = document.getElementById('ratio-simp-b');
    const valEl = document.getElementById('res-val-ratio-simp');
    const stepsEl = document.getElementById('res-steps-ratio-simp');

    function calculate() {
      const a = parseInt(inputA.value, 10);
      const b = parseInt(inputB.value, 10);

      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        valEl.innerText = 'Invalid Input';
        return;
      }

      const g = gcd(a, b);
      const simA = a / g;
      const simB = b / g;

      valEl.innerText = `${simA} : ${simB}`;

      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Find Greatest Common Divisor: <strong>GCD(${a}, ${b}) = ${g}</strong></span></div>
        <div class="step-item"><span class="step-num">2</span><span>Divide Term A: ${a} ÷ ${g} = <strong>${simA}</strong></span></div>
        <div class="step-item"><span class="step-num">3</span><span>Divide Term B: ${b} ÷ ${g} = <strong>${simB}</strong></span></div>
      `;
      showToast('Ratio simplified successfully');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', calculate);
  }

  // Equivalent Ratio Generator
  function equivalentRatioGenerator() {
    const btn = document.getElementById('btn-gen-equiv-ratios');
    const inputA = document.getElementById('equiv-ratio-a');
    const inputB = document.getElementById('equiv-ratio-b');
    const container = document.getElementById('equiv-chips-container');

    function generate() {
      const a = parseInt(inputA.value, 10);
      const b = parseInt(inputB.value, 10);

      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

      const multipliers = [2, 3, 4, 5, 10, 15];
      container.innerHTML = multipliers.map(m => {
        return `<span class="equiv-chip">${a * m} : ${b * m} (×${m})</span>`;
      }).join('');
      showToast('Generated equivalent ratios');
    }

    if (btn) btn.addEventListener('click', generate);
  }

  // Ratio Comparison Tool
  function ratioComparison() {
    const btn = document.getElementById('btn-compare-ratios');
    const inA = document.getElementById('comp-a');
    const inB = document.getElementById('comp-b');
    const inC = document.getElementById('comp-c');
    const inD = document.getElementById('comp-d');
    const valEl = document.getElementById('res-val-comp-ratios');
    const stepsEl = document.getElementById('res-steps-comp-ratios');

    function compare() {
      const a = parseFloat(inA.value);
      const b = parseFloat(inB.value);
      const c = parseFloat(inC.value);
      const d = parseFloat(inD.value);

      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || b === 0 || d === 0) {
        valEl.innerText = 'Invalid Input';
        return;
      }

      const dec1 = round(a / b, 4);
      const dec2 = round(c / d, 4);
      const prod1 = a * d;
      const prod2 = b * c;

      let msg = '';
      if (prod1 > prod2) {
        msg = `Ratio 1 (${a} : ${b}) is LARGER`;
      } else if (prod1 < prod2) {
        msg = `Ratio 2 (${c} : ${d}) is LARGER`;
      } else {
        msg = `Both Ratios are EQUAL`;
      }

      valEl.innerText = msg;
      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Decimal of Ratio 1: ${a} ÷ ${b} = <strong>${dec1}</strong></span></div>
        <div class="step-item"><span class="step-num">2</span><span>Decimal of Ratio 2: ${c} ÷ ${d} = <strong>${dec2}</strong></span></div>
        <div class="step-item"><span class="step-num">3</span><span>Cross product comparison: ${a} × ${d} (${prod1}) vs ${b} × ${c} (${prod2})</span></div>
      `;
      showToast('Compared ratios');
    }

    if (btn) btn.addEventListener('click', compare);
  }

  // Proportion Solver (a/b = c/x)
  function proportionCalculator() {
    const btn = document.getElementById('btn-solve-proportion');
    const inA = document.getElementById('prop-a');
    const inB = document.getElementById('prop-b');
    const inC = document.getElementById('prop-c');
    const valEl = document.getElementById('res-val-proportion');
    const stepsEl = document.getElementById('res-steps-proportion');

    function solve() {
      const a = parseFloat(inA.value);
      const b = parseFloat(inB.value);
      const c = parseFloat(inC.value);

      if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
        valEl.innerText = 'Invalid (a cannot be 0)';
        return;
      }

      const x = round((b * c) / a, 2);
      valEl.innerText = `x = ${formatNumber(x)}`;

      stepsEl.innerHTML = `
        <div class="step-item"><span class="step-num">1</span><span>Set up cross multiplication: <strong>${a} · x = ${b} · ${c}</strong></span></div>
        <div class="step-item"><span class="step-num">2</span><span>Compute right side product: <strong>${a}x = ${round(b * c, 2)}</strong></span></div>
        <div class="step-item"><span class="step-num">3</span><span>Divide by ${a}: <strong>x = ${round(b * c, 2)} ÷ ${a} = ${formatNumber(x)}</strong></span></div>
      `;
      showToast('Solved proportion for x');
      recordPracticeActivity();
    }

    if (btn) btn.addEventListener('click', solve);
  }

  // Real-World Scenarios
  function initializeRealWorldScenarios() {
    const select = document.getElementById('scenario-select');
    const titleEl = document.getElementById('scen-title');
    const valEl = document.getElementById('scen-val');
    const stepsEl = document.getElementById('scen-steps');

    const scenarios = {
      recipe: {
        title: 'Flour Needed',
        val: '5 cups',
        steps: [
          'Proportion: 2 cups / 4 people = x cups / 10 people',
          'Cross multiply: 4 · x = 2 · 10 = 20',
          'x = 20 ÷ 4 = 5 cups of flour'
        ]
      },
      shopping: {
        title: 'Notebooks Cost',
        val: '$21.00',
        steps: [
          'Proportion: 3 notebooks / $9 = 7 notebooks / $x',
          'Cross multiply: 3 · x = 9 · 7 = 63',
          'x = 63 ÷ 3 = $21.00'
        ]
      },
      distance: {
        title: 'Distance Traveled',
        val: '225 km',
        steps: [
          'Proportion: 120 km / 8 L = x km / 15 L',
          'Cross multiply: 8 · x = 120 · 15 = 1800',
          'x = 1800 ÷ 8 = 225 km'
        ]
      }
    };

    function update() {
      const key = select.value;
      const data = scenarios[key];
      if (!data) return;

      titleEl.innerText = data.title;
      valEl.innerText = data.val;
      stepsEl.innerHTML = data.steps.map((st, i) => `
        <div class="step-item"><span class="step-num">${i + 1}</span><span>${st}</span></div>
      `).join('');
    }

    if (select) select.addEventListener('change', update);
  }

  // Worked Examples Toggle
  function initializeWorkedExamples() {
    const btns = document.querySelectorAll('.toggle-solution-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const box = document.getElementById(targetId);
        if (box) {
          const isRevealed = box.classList.toggle('revealed');
          btn.innerText = isRevealed ? 'Hide Solution' : 'Show Solution';
        }
      });
    });
  }

  // Practice Questions Generator
  function generatePracticeQuestion() {
    const qText = document.getElementById('practice-q-text');
    const badge = document.getElementById('practice-topic-badge');
    const input = document.getElementById('practice-user-input');
    const feedback = document.getElementById('practice-feedback-box');
    const solBox = document.getElementById('practice-solution-box');
    const solContent = document.getElementById('practice-solution-content');

    if (feedback) feedback.style.display = 'none';
    if (solBox) solBox.style.display = 'none';
    if (input) input.value = '';

    const categories = ['percentages', 'discounts', 'ratios', 'proportions'];
    const chosenCat = state.practiceCategory === 'all' 
      ? categories[Math.floor(Math.random() * categories.length)]
      : state.practiceCategory;

    let questionObj = null;

    if (chosenCat === 'percentages') {
      const p = [10, 15, 20, 25, 30, 40, 50, 75][Math.floor(Math.random() * 8)];
      const n = [50, 80, 120, 150, 200, 240, 300, 400][Math.floor(Math.random() * 8)];
      const ans = (p / 100) * n;
      questionObj = {
        category: 'PERCENTAGES',
        text: `What is ${p}% of ${n}?`,
        answer: ans.toString(),
        steps: `${p}% of ${n} = (${p} / 100) × ${n} = ${ans}`
      };
    } else if (chosenCat === 'discounts') {
      const orig = [100, 150, 200, 250, 400, 500][Math.floor(Math.random() * 6)];
      const disc = [10, 20, 25, 30, 50][Math.floor(Math.random() * 5)];
      const finalPrice = orig - (orig * disc / 100);
      questionObj = {
        category: 'DISCOUNTS & COMMERCE',
        text: `An item costs $${orig} and has a ${disc}% discount. What is the final price?`,
        answer: finalPrice.toString(),
        steps: `Discount amount = $${orig} × ${disc}% = $${orig * disc / 100}. Final price = $${orig} − $${orig * disc / 100} = $${finalPrice}`
      };
    } else if (chosenCat === 'ratios') {
      const mult = [3, 4, 6, 8, 9, 12][Math.floor(Math.random() * 6)];
      const baseA = 2;
      const baseB = 5;
      const a = baseA * mult;
      const b = baseB * mult;
      questionObj = {
        category: 'RATIOS',
        text: `If a ratio is ${a} : ${b}, what is the first term (x) in the simplified ratio x : ${baseB}?`,
        answer: baseA.toString(),
        steps: `Dividing both terms by GCD (${mult}) gives ${baseA} : ${baseB}. Thus x = ${baseA}.`
      };
    } else {
      const a = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const b = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
      const c = a * [2, 3, 4][Math.floor(Math.random() * 3)];
      const x = (b * c) / a;
      questionObj = {
        category: 'PROPORTIONS',
        text: `Solve for x in the proportion: ${a} / ${b} = ${c} / x.`,
        answer: x.toString(),
        steps: `Cross multiplication: ${a} · x = ${b} · ${c} &rarr; ${a}x = ${b * c} &rarr; x = ${b * c} / ${a} = ${x}`
      };
    }

    state.currentPractice = questionObj;
    if (badge) badge.innerText = `TOPIC: ${questionObj.category}`;
    if (qText) qText.innerText = questionObj.text;
    if (solContent) solContent.innerHTML = questionObj.steps;
  }

  function checkPracticeAnswer() {
    const input = document.getElementById('practice-user-input');
    const feedback = document.getElementById('practice-feedback-box');
    const icon = document.getElementById('practice-feedback-icon');
    const msg = document.getElementById('practice-feedback-msg');

    if (!state.currentPractice || !input) return;

    const userVal = parseFloat(input.value.trim().replace('$', ''));
    const correctVal = parseFloat(state.currentPractice.answer);

    feedback.style.display = 'flex';

    if (!isNaN(userVal) && Math.abs(userVal - correctVal) < 0.01) {
      feedback.className = 'practice-feedback correct';
      icon.innerText = '✓';
      msg.innerText = 'Correct! Outstanding work.';
      state.progress.practiceCorrect++;
      state.progress.practiceAnswered++;
      saveProgress();
      showToast('Answer checked: Correct!');
    } else {
      feedback.className = 'practice-feedback incorrect';
      icon.innerText = '✗';
      msg.innerText = 'Not quite. Try again or check the step-by-step solution.';
      state.progress.practiceAnswered++;
      saveProgress();
      showToast('Answer checked: Try again');
    }
  }

  function initializePractice() {
    const btnNext = document.getElementById('btn-next-practice-q');
    const btnCheck = document.getElementById('btn-check-practice');
    const btnReveal = document.getElementById('btn-reveal-practice-sol');
    const pills = document.querySelectorAll('#practice-cat-container .pill-btn');
    const solBox = document.getElementById('practice-solution-box');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.practiceCategory = pill.getAttribute('data-category');
        generatePracticeQuestion();
      });
    });

    if (btnNext) btnNext.addEventListener('click', generatePracticeQuestion);
    if (btnCheck) btnCheck.addEventListener('click', checkPracticeAnswer);
    if (btnReveal && solBox) {
      btnReveal.addEventListener('click', () => {
        solBox.style.display = solBox.style.display === 'none' ? 'block' : 'none';
      });
    }

    generatePracticeQuestion();
  }

  // Quiz Engine (10 Questions)
  function renderQuizQuestion() {
    const qIndex = state.quiz.currentIndex;
    const qData = state.quiz.questions[qIndex];
    const total = state.quiz.questions.length;

    const categoryEl = document.getElementById('quiz-q-category');
    const titleEl = document.getElementById('quiz-q-title');
    const optionsContainer = document.getElementById('quiz-options-container');
    const stepperText = document.getElementById('quiz-stepper-text');
    const dotsBar = document.getElementById('quiz-dots-bar');
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');

    if (!qData) return;

    if (categoryEl) categoryEl.innerText = `QUESTION ${qIndex + 1} OF ${total} • ${qData.category}`;
    if (titleEl) titleEl.innerText = qData.question;
    if (stepperText) stepperText.innerText = `Question ${qIndex + 1} of ${total}`;

    // Render stepper dots
    if (dotsBar) {
      dotsBar.innerHTML = state.quiz.questions.map((_, i) => {
        let cls = 'q-dot';
        if (i === qIndex) cls += ' current';
        if (state.quiz.userAnswers[i] !== null) {
          const isCorrect = state.quiz.userAnswers[i] === state.quiz.questions[i].correctIndex;
          cls += isCorrect ? ' answered-correct' : ' answered-incorrect';
        }
        return `<div class="${cls}"></div>`;
      }).join('');
    }

    // Render Options
    if (optionsContainer) {
      optionsContainer.innerHTML = qData.options.map((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx);
        const isSelected = state.quiz.userAnswers[qIndex] === optIdx;
        const selectedClass = isSelected ? 'selected' : '';
        return `
          <button class="quiz-opt-btn ${selectedClass}" data-opt-index="${optIdx}">
            <span class="opt-letter">${letter}</span>
            <span>${opt}</span>
          </button>
        `;
      }).join('');

      optionsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const optIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
          state.quiz.userAnswers[qIndex] = optIdx;
          renderQuizQuestion();
        });
      });
    }

    // Button states
    if (btnPrev) btnPrev.disabled = qIndex === 0;
    if (btnNext) {
      btnNext.innerText = qIndex === total - 1 ? 'Finish Quiz' : 'Next →';
    }
  }

  function startQuiz() {
    state.quiz.currentIndex = 0;
    state.quiz.userAnswers = new Array(10).fill(null);
    state.quiz.isFinished = false;

    const activeView = document.getElementById('quiz-active-view');
    const resultView = document.getElementById('quiz-result-view');

    if (activeView) activeView.style.display = 'block';
    if (resultView) resultView.style.display = 'none';

    renderQuizQuestion();
  }

  function showQuizResult() {
    state.quiz.isFinished = true;
    const activeView = document.getElementById('quiz-active-view');
    const resultView = document.getElementById('quiz-result-view');

    if (activeView) activeView.style.display = 'none';
    if (resultView) resultView.style.display = 'block';

    let score = 0;
    state.quiz.questions.forEach((q, i) => {
      if (state.quiz.userAnswers[i] === q.correctIndex) {
        score++;
      }
    });

    const pct = Math.round((score / state.quiz.questions.length) * 100);

    // Save stats
    state.progress.quizAttempts++;
    if (pct > state.progress.bestQuizScore) {
      state.progress.bestQuizScore = pct;
    }
    saveProgress();

    const scoreNumber = document.getElementById('quiz-final-score');
    const scorePct = document.getElementById('quiz-final-pct');
    const circle = document.getElementById('quiz-score-circle');
    const msgTitle = document.getElementById('quiz-result-msg-title');
    const msgDesc = document.getElementById('quiz-result-msg-desc');
    const statCorrect = document.getElementById('quiz-stat-correct');
    const statIncorrect = document.getElementById('quiz-stat-incorrect');
    const statBest = document.getElementById('quiz-stat-best');

    if (scoreNumber) scoreNumber.innerText = `${score}/10`;
    if (scorePct) scorePct.innerText = `${pct}%`;
    if (circle) circle.style.setProperty('--score-pct', pct);
    if (statCorrect) statCorrect.innerText = score;
    if (statIncorrect) statIncorrect.innerText = 10 - score;
    if (statBest) statBest.innerText = `${state.progress.bestQuizScore}%`;

    if (pct >= 90) {
      msgTitle.innerText = 'Excellent Mastery!';
      msgDesc.innerText = 'You have mastered Percentages, Ratios & Proportions.';
    } else if (pct >= 70) {
      msgTitle.innerText = 'Great Work!';
      msgDesc.innerText = 'A little more practice will make you even stronger.';
    } else if (pct >= 50) {
      msgTitle.innerText = 'Good Start!';
      msgDesc.innerText = 'Review the concept cards and formulas, then try again.';
    } else {
      msgTitle.innerText = 'Keep Practicing!';
      msgDesc.innerText = 'You are building your understanding step by step.';
    }

    showToast('Quiz completed!');
  }

  function initializeQuiz() {
    const btnPrev = document.getElementById('btn-quiz-prev');
    const btnNext = document.getElementById('btn-quiz-next');
    const btnTryAgain = document.getElementById('btn-quiz-try-again');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (state.quiz.currentIndex > 0) {
          state.quiz.currentIndex--;
          renderQuizQuestion();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
          state.quiz.currentIndex++;
          renderQuizQuestion();
        } else {
          showQuizResult();
        }
      });
    }

    if (btnTryAgain) {
      btnTryAgain.addEventListener('click', startQuiz);
    }

    startQuiz();
  }

  // Progress Tracker
  function saveProgress() {
    localStorage.setItem('studymate_progress', JSON.stringify(state.progress));
    updateProgressUI();
  }

  function loadProgress() {
    updateProgressUI();
  }

  function recordPracticeActivity() {
    state.progress.practiceAnswered++;
    saveProgress();
  }

  function updateProgressUI() {
    const overallBar = document.getElementById('overall-progress-bar');
    const overallText = document.getElementById('overall-progress-text');
    const statsSummary = document.getElementById('progress-stats-summary');

    // Calculate progress: max 100%
    const practiceWeight = Math.min(state.progress.practiceAnswered * 10, 50);
    const quizWeight = state.progress.bestQuizScore * 0.5;
    const totalProgress = Math.min(Math.round(practiceWeight + quizWeight), 100);

    if (overallBar) overallBar.style.width = `${totalProgress}%`;
    if (overallText) overallText.innerText = `${totalProgress}%`;
    if (statsSummary) {
      statsSummary.innerText = `${state.progress.practiceAnswered} calculations logged • Best Quiz: ${state.progress.bestQuizScore}%`;
    }
  }

  // Study Notes System
  function saveNote() {
    const field = document.getElementById('note-input-field');
    if (!field) return;
    const text = field.value.trim();
    if (!text) {
      showToast('Note cannot be empty');
      return;
    }

    const note = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    state.notes.unshift(note);
    localStorage.setItem('studymate_notes', JSON.stringify(state.notes));
    field.value = '';
    renderNotes();
    showToast('Note saved');
  }

  function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    localStorage.setItem('studymate_notes', JSON.stringify(state.notes));
    renderNotes();
    showToast('Note deleted');
  }

  function renderNotes() {
    const container = document.getElementById('saved-notes-container');
    const badge = document.getElementById('notes-count-badge');
    if (!container) return;

    if (badge) badge.innerText = `${state.notes.length} notes`;

    if (state.notes.length === 0) {
      container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 1rem;">No personal notes saved yet. Add a note above!</p>`;
      return;
    }

    container.innerHTML = state.notes.map(note => `
      <div class="note-item">
        <div class="note-content">${note.text}</div>
        <div class="note-footer">
          <span>${note.timestamp}</span>
          <button class="note-del-btn" data-note-id="${note.id}">Delete</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.note-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-note-id'), 10);
        deleteNote(id);
      });
    });
  }

  // Bookmarks System
  function toggleBookmark(targetId, title) {
    const existingIndex = state.bookmarks.findIndex(b => b.targetId === targetId);
    if (existingIndex >= 0) {
      state.bookmarks.splice(existingIndex, 1);
      showToast(`Removed bookmark: ${title}`);
    } else {
      state.bookmarks.push({ targetId, title });
      showToast(`Bookmarked: ${title}`);
    }
    localStorage.setItem('studymate_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
    updateBookmarkButtons();
  }

  function renderBookmarks() {
    const container = document.getElementById('saved-bookmarks-container');
    const badge = document.getElementById('bookmarks-count-badge');
    if (!container) return;

    if (badge) badge.innerText = `${state.bookmarks.length} saved`;

    if (state.bookmarks.length === 0) {
      container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 1rem;">No bookmarks saved. Click 🔖 Bookmark on any lesson header!</p>`;
      return;
    }

    container.innerHTML = state.bookmarks.map(b => `
      <a href="#${b.targetId}" class="bookmark-item">
        <span>🔖 ${b.title}</span>
        <span style="font-size: 0.75rem; color: var(--primary);">Go &rarr;</span>
      </a>
    `).join('');
  }

  function updateBookmarkButtons() {
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      const isBookmarked = state.bookmarks.some(b => b.targetId === targetId);
      btn.innerHTML = isBookmarked ? '★ Bookmarked' : '🔖 Bookmark';
      btn.style.color = isBookmarked ? 'var(--primary)' : 'inherit';
    });
  }

  function initializeBookmarksAndNotes() {
    const btnSaveNote = document.getElementById('btn-save-note');
    if (btnSaveNote) btnSaveNote.addEventListener('click', saveNote);

    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const title = btn.getAttribute('data-title');
        toggleBookmark(targetId, title);
      });
    });

    renderNotes();
    renderBookmarks();
    updateBookmarkButtons();
  }

  // Quick Search System
  function setupSearch() {
    const quickInput = document.getElementById('quick-search-input');
    const modalBackdrop = document.getElementById('search-modal');
    const modalInput = document.getElementById('search-modal-input');
    const resultsList = document.getElementById('search-results-list');

    const searchIndex = [
      { title: 'What is a Percentage?', sub: 'Definition, base 100 concept, fractions', target: 'sec-what-is-percentage' },
      { title: 'Converting Percentages', sub: '3-way converter: percentage, decimal, fraction', target: 'sec-converting-percentages' },
      { title: 'Percentage of a Number', sub: 'What is X% of Y calculator', target: 'sec-finding-percentage' },
      { title: 'Percentage Increase & Decrease', sub: 'Calculate relative growth and change rates', target: 'sec-percentage-change' },
      { title: 'Discounts Calculator', sub: 'Shopping sales and markdown final price', target: 'sec-discounts' },
      { title: 'Profit & Loss', sub: 'Cost Price, Selling Price and Net Margin', target: 'sec-profit-loss' },
      { title: 'Understanding Ratios', sub: 'Comparative magnitude and parts explanation', target: 'sec-understanding-ratios' },
      { title: 'Simplifying Ratios', sub: 'GCD reduction calculator', target: 'sec-simplifying-ratios' },
      { title: 'Equivalent Ratios', sub: 'Continuous multiplier sequence generator', target: 'sec-equivalent-ratios' },
      { title: 'Comparing Ratios', sub: 'Determine which ratio is greater', target: 'sec-comparing-ratios' },
      { title: 'Proportions & Cross Multiplication', sub: 'Solve for x (a/b = c/x)', target: 'sec-what-is-proportion' },
      { title: 'Cross Multiplication Tool', sub: 'Proportion solver with steps', target: 'sec-solving-proportions' },
      { title: 'Real-World Proportions', sub: 'Recipe, shopping, distance problem solver', target: 'sec-real-world-proportions' },
      { title: 'Formula Cheat Sheet', sub: 'Complete quick formula summary cards', target: 'sec-formula-cheat-sheet' },
      { title: 'Worked Examples', sub: 'Step-by-step problem walkthroughs', target: 'sec-worked-examples' },
      { title: 'Practice Questions', sub: 'Interactive randomized math challenges', target: 'sec-interactive-practice' },
      { title: 'Interactive Quiz (10 Questions)', sub: 'Test your understanding and view scores', target: 'sec-quiz-mode' }
    ];

    function openModal() {
      if (modalBackdrop) modalBackdrop.classList.add('open');
      if (modalInput) {
        modalInput.value = '';
        modalInput.focus();
        renderResults('');
      }
    }

    function closeModal() {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
    }

    function renderResults(query) {
      if (!resultsList) return;
      const q = query.toLowerCase().trim();
      const filtered = q === '' 
        ? searchIndex.slice(0, 6) 
        : searchIndex.filter(item => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q));

      if (filtered.length === 0) {
        resultsList.innerHTML = `<p style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem; text-align: center;">No matching topics found.</p>`;
        return;
      }

      resultsList.innerHTML = filtered.map(item => `
        <a href="#${item.target}" class="search-result-item" data-target="${item.target}">
          <span class="search-res-title">${item.title}</span>
          <span class="search-res-sub">${item.sub}</span>
        </a>
      `).join('');

      resultsList.querySelectorAll('.search-result-item').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('data-target');
          closeModal();
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    if (quickInput) {
      quickInput.addEventListener('focus', openModal);
      quickInput.addEventListener('click', openModal);
    }

    if (modalInput) {
      modalInput.addEventListener('input', (e) => renderResults(e.target.value));
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape') closeModal();
    });
  }

  // App Initialization
  function initializeApp() {
    initializeTheme();
    initializeNavigation();
    initializeConverter();
    percentageCalculator();
    percentageChangeCalculator();
    discountCalculator();
    profitLossCalculator();
    ratioSimplifier();
    equivalentRatioGenerator();
    ratioComparison();
    proportionCalculator();
    initializeRealWorldScenarios();
    initializeWorkedExamples();
    initializePractice();
    initializeQuiz();
    initializeBookmarksAndNotes();
    setupSearch();
    loadProgress();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
})();
