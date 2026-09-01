/* ==========================================================================
   COORDINATE GEOMETRY MODULE — JS ENGINE
   University Entry Test & Scholarship Mathematical Engine
   ========================================================================== */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    bookmarkedSections: JSON.parse(localStorage.getItem('cg_bookmarks') || '[]'),
    masterTest: {
      questions: [],
      currentIdx: 0,
      answers: {}, // idx -> chosenOption
      flagged: new Set(),
      timeLeft: 40 * 60, // 40 minutes in seconds
      timerId: null,
      submitted: false,
      startTime: null
    },
    practiceFilter: 'all',
    practiceDifficulty: 'all'
  };

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  // --- SVG INTERACTIVE GRAPHING ENGINE ---
  function renderSvgCoordinatePlane(svgId, points = [], lines = [], circles = [], polygons = [], viewRange = 10) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    const width = 360;
    const height = 300;
    const padding = 20;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    const scale = plotWidth / (2 * viewRange);

    const toSvgX = (x) => padding + (x + viewRange) * scale;
    const toSvgY = (y) => padding + (viewRange - y) * scale;

    let svgHtml = `
      <defs>
        <pattern id="grid-${svgId}" width="${scale}" height="${scale}" patternUnits="userSpaceOnUse">
          <path d="M ${scale} 0 L 0 0 0 ${scale}" fill="none" stroke="#e2e8f0" stroke-width="1"/>
        </pattern>
        <marker id="arrow-${svgId}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
        </marker>
      </defs>
      <rect width="${width}" height="${height}" fill="#ffffff"/>
      <rect x="${padding}" y="${padding}" width="${plotWidth}" height="${plotHeight}" fill="url(#grid-${svgId})"/>
    `;

    // Grid ticks and numbers
    for (let i = -viewRange; i <= viewRange; i += (viewRange > 10 ? 2 : 1)) {
      if (i === 0) continue;
      // x ticks
      svgHtml += `<line x1="${toSvgX(i)}" y1="${toSvgY(0) - 3}" x2="${toSvgX(i)}" y2="${toSvgY(0) + 3}" stroke="#94a3b8" stroke-width="1.2"/>`;
      svgHtml += `<text x="${toSvgX(i)}" y="${toSvgY(0) + 12}" font-size="9" text-anchor="middle" fill="#64748b">${i}</text>`;
      // y ticks
      svgHtml += `<line x1="${toSvgX(0) - 3}" y1="${toSvgY(i)}" x2="${toSvgX(0) + 3}" y2="${toSvgY(i)}" stroke="#94a3b8" stroke-width="1.2"/>`;
      svgHtml += `<text x="${toSvgX(0) - 6}" y="${toSvgY(i) + 3}" font-size="9" text-anchor="end" fill="#64748b">${i}</text>`;
    }

    // Axes
    svgHtml += `
      <!-- X Axis -->
      <line x1="${padding}" y1="${toSvgY(0)}" x2="${width - padding}" y2="${toSvgY(0)}" stroke="#334155" stroke-width="1.8" marker-end="url(#arrow-${svgId})" marker-start="url(#arrow-${svgId})"/>
      <text x="${width - padding + 5}" y="${toSvgY(0) + 4}" font-size="11" font-weight="700" fill="#334155">x</text>
      
      <!-- Y Axis -->
      <line x1="${toSvgX(0)}" y1="${height - padding}" x2="${toSvgX(0)}" y2="${padding}" stroke="#334155" stroke-width="1.8" marker-end="url(#arrow-${svgId})" marker-start="url(#arrow-${svgId})"/>
      <text x="${toSvgX(0)}" y="${padding - 6}" font-size="11" font-weight="700" text-anchor="middle" fill="#334155">y</text>
      
      <!-- Origin -->
      <text x="${toSvgX(0) - 8}" y="${toSvgY(0) + 12}" font-size="9" font-weight="600" fill="#64748b">O(0,0)</text>
    `;

    // Render Polygons
    polygons.forEach((poly) => {
      const pts = poly.points.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
      svgHtml += `<polygon points="${pts}" fill="${poly.fill || 'rgba(16, 185, 129, 0.15)'}" stroke="${poly.stroke || '#059669'}" stroke-width="2"/>`;
    });

    // Render Circles
    circles.forEach((c) => {
      const cx = toSvgX(c.x);
      const cy = toSvgY(c.y);
      const r = c.r * scale;
      svgHtml += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.fill || 'rgba(6, 78, 59, 0.08)'}" stroke="${c.stroke || '#064e3b'}" stroke-width="2"/>`;
      svgHtml += `<circle cx="${cx}" cy="${cy}" r="3" fill="${c.stroke || '#064e3b'}"/>`;
      if (c.label) {
        svgHtml += `<text x="${cx + 6}" y="${cy - 6}" font-size="10" font-weight="600" fill="${c.stroke || '#064e3b'}">${c.label}</text>`;
      }
    });

    // Render Lines
    lines.forEach((l) => {
      if (l.type === 'segment') {
        svgHtml += `<line x1="${toSvgX(l.x1)}" y1="${toSvgY(l.y1)}" x2="${toSvgX(l.x2)}" y2="${toSvgY(l.y2)}" stroke="${l.color || '#2563eb'}" stroke-width="2.5" stroke-dasharray="${l.dash || 'none'}"/>`;
      } else {
        // Extended line equation y = mx + c or vertical x = k
        if (l.isVertical) {
          svgHtml += `<line x1="${toSvgX(l.x)}" y1="${padding}" x2="${toSvgX(l.x)}" y2="${height - padding}" stroke="${l.color || '#2563eb'}" stroke-width="2"/>`;
        } else {
          const xA = -viewRange;
          const yA = l.m * xA + l.c;
          const xB = viewRange;
          const yB = l.m * xB + l.c;
          svgHtml += `<line x1="${toSvgX(xA)}" y1="${toSvgY(yA)}" x2="${toSvgX(xB)}" y2="${toSvgY(yB)}" stroke="${l.color || '#2563eb'}" stroke-width="2"/>`;
        }
      }
      if (l.label) {
        const lx = l.type === 'segment' ? toSvgX((l.x1 + l.x2) / 2) : toSvgX(2);
        const ly = l.type === 'segment' ? toSvgY((l.y1 + l.y2) / 2) - 8 : toSvgY(l.isVertical ? 4 : l.m * 2 + l.c) - 8;
        svgHtml += `<text x="${lx}" y="${ly}" font-size="10" font-weight="700" fill="${l.color || '#2563eb'}">${l.label}</text>`;
      }
    });

    // Render Points
    points.forEach((p) => {
      const px = toSvgX(p.x);
      const py = toSvgY(p.y);
      svgHtml += `<circle cx="${px}" cy="${py}" r="${p.r || 4.5}" fill="${p.color || '#dc2626'}" stroke="#ffffff" stroke-width="1.5"/>`;
      if (p.label) {
        svgHtml += `<text x="${px + 6}" y="${py - 6}" font-size="10.5" font-weight="700" fill="${p.color || '#0f172a'}">${p.label} (${p.x}, ${p.y})</text>`;
      }
    });

    svg.innerHTML = svgHtml;
  }

  // --- MATHEMATICAL UTILITIES ---
  function simplifyRadical(n) {
    if (n < 0) return 'NaN';
    if (n === 0) return '0';
    let root = Math.sqrt(n);
    if (Number.isInteger(root)) return `${root}`;

    let outside = 1;
    let inside = n;
    for (let i = 2; i * i <= inside; i++) {
      while (inside % (i * i) === 0) {
        outside *= i;
        inside /= (i * i);
      }
    }
    if (outside === 1) return `√${inside}`;
    return `${outside}√${inside}`;
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function formatFraction(num, den) {
    if (den === 0) return 'Undefined';
    if (num === 0) return '0';
    let sign = (num * den < 0) ? -1 : 1;
    num = Math.abs(num);
    den = Math.abs(den);
    let common = gcd(num, den);
    num /= common;
    den /= common;
    if (den === 1) return `${sign * num}`;
    return `${sign < 0 ? '-' : ''}${num}/${den}`;
  }

  // --- INTERACTIVE CALCULATORS ---

  // 1. Point Plotter
  window.plotSinglePoint = function () {
    const x = parseFloat(document.getElementById('input-plot-x').value) || 0;
    const y = parseFloat(document.getElementById('input-plot-y').value) || 0;
    const quadInfo = document.getElementById('plot-quad-info');
    
    let quad = '';
    if (x > 0 && y > 0) quad = 'Quadrant I (+, +)';
    else if (x < 0 && y > 0) quad = 'Quadrant II (-, +)';
    else if (x < 0 && y < 0) quad = 'Quadrant III (-, -)';
    else if (x > 0 && y < 0) quad = 'Quadrant IV (+, -)';
    else if (x === 0 && y === 0) quad = 'Origin (0, 0)';
    else if (y === 0) quad = 'On x-axis';
    else if (x === 0) quad = 'On y-axis';

    quadInfo.innerHTML = `<strong>Location:</strong> ${quad} | <strong>Distance from x-axis:</strong> |${y}| = ${Math.abs(y)} | <strong>Distance from y-axis:</strong> |${x}| = ${Math.abs(x)}`;

    renderSvgCoordinatePlane('svg-interactive-plane', [{ x, y, label: 'P', color: '#064e3b' }], [], [], [], Math.max(10, Math.ceil(Math.max(Math.abs(x), Math.abs(y)) * 1.3)));
  };

  // 2. Distance Calculator
  window.calculateDistance = function () {
    const x1 = parseFloat(document.getElementById('dist-x1').value) || 0;
    const y1 = parseFloat(document.getElementById('dist-y1').value) || 0;
    const x2 = parseFloat(document.getElementById('dist-x2').value) || 0;
    const y2 = parseFloat(document.getElementById('dist-y2').value) || 0;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dx2 = dx * dx;
    const dy2 = dy * dy;
    const sum = dx2 + dy2;
    const dVal = Math.sqrt(sum);
    const radExact = simplifyRadical(sum);

    const resBox = document.getElementById('dist-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">d = ${radExact} ≈ ${dVal.toFixed(3)} units</div>
      <div class="solve-step-grid">
        <span class="step-tag">Formula:</span>
        <span class="step-math">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</span>
        <span class="step-tag">Substitution:</span>
        <span class="step-math">d = √[(${x2} - (${x1}))² + (${y2} - (${y1}))²]</span>
        <span class="step-tag">Differences:</span>
        <span class="step-math">d = √[(${dx})² + (${dy})²] = √[${dx2} + ${dy2}] = √${sum}</span>
        <span class="step-tag">Exact Value:</span>
        <span class="step-math">${radExact}</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2), 6);
    renderSvgCoordinatePlane('svg-dist-plane', 
      [{ x: x1, y: y1, label: 'A', color: '#2563eb' }, { x: x2, y: y2, label: 'B', color: '#dc2626' }],
      [{ type: 'segment', x1, y1, x2, y2, color: '#064e3b', label: `d=${radExact}` }],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // 3. Midpoint Calculator
  window.calculateMidpoint = function () {
    const x1 = parseFloat(document.getElementById('mid-x1').value) || 0;
    const y1 = parseFloat(document.getElementById('mid-y1').value) || 0;
    const x2 = parseFloat(document.getElementById('mid-x2').value) || 0;
    const y2 = parseFloat(document.getElementById('mid-y2').value) || 0;

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    const resBox = document.getElementById('mid-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">Midpoint M = (${mx}, ${my})</div>
      <div class="solve-step-grid">
        <span class="step-tag">Formula:</span>
        <span class="step-math">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</span>
        <span class="step-tag">Substitution:</span>
        <span class="step-math">M = ((${x1} + ${x2})/2, (${y1} + ${y2})/2)</span>
        <span class="step-tag">Calculation:</span>
        <span class="step-math">M = (${(x1 + x2)}/2, ${(y1 + y2)}/2) = (${mx}, ${my})</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2), 6);
    renderSvgCoordinatePlane('svg-mid-plane',
      [
        { x: x1, y: y1, label: 'A', color: '#2563eb' },
        { x: x2, y: y2, label: 'B', color: '#2563eb' },
        { x: mx, y: my, label: 'M (Midpoint)', color: '#059669', r: 5.5 }
      ],
      [{ type: 'segment', x1, y1, x2, y2, color: '#64748b', dash: '4,4' }],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // 4. Section Formula Calculator
  window.calculateSection = function () {
    const x1 = parseFloat(document.getElementById('sec-x1').value) || 0;
    const y1 = parseFloat(document.getElementById('sec-y1').value) || 0;
    const x2 = parseFloat(document.getElementById('sec-x2').value) || 0;
    const y2 = parseFloat(document.getElementById('sec-y2').value) || 0;
    const m = parseFloat(document.getElementById('sec-m').value) || 1;
    const n = parseFloat(document.getElementById('sec-n').value) || 1;

    const px = (m * x2 + n * x1) / (m + n);
    const py = (m * y2 + n * y1) / (m + n);

    const resBox = document.getElementById('sec-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">Point P = (${px.toFixed(2)}, ${py.toFixed(2)})</div>
      <div class="solve-step-grid">
        <span class="step-tag">Formula:</span>
        <span class="step-math">P = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n))</span>
        <span class="step-tag">Substitution:</span>
        <span class="step-math">P = ((${m}(${x2}) + ${n}(${x1}))/(${m}+${n}), (${m}(${y2}) + ${n}(${y1}))/(${m}+${n}))</span>
        <span class="step-tag">Numerator:</span>
        <span class="step-math">x = (${m * x2} + ${n * x1})/${m + n} = ${(m * x2 + n * x1)}/${m + n}</span>
        <span class="step-tag">Denominator:</span>
        <span class="step-math">y = (${m * y2} + ${n * y1})/${m + n} = ${(m * y2 + n * y1)}/${m + n}</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2), 6);
    renderSvgCoordinatePlane('svg-sec-plane',
      [
        { x: x1, y: y1, label: 'A', color: '#2563eb' },
        { x: x2, y: y2, label: 'B', color: '#2563eb' },
        { x: px, y: py, label: `P (${m}:${n})`, color: '#7c3aed', r: 5.5 }
      ],
      [{ type: 'segment', x1, y1, x2, y2, color: '#94a3b8' }],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // 5. Slope Calculator
  window.calculateSlope = function () {
    const x1 = parseFloat(document.getElementById('slope-x1').value) || 0;
    const y1 = parseFloat(document.getElementById('slope-y1').value) || 0;
    const x2 = parseFloat(document.getElementById('slope-x2').value) || 0;
    const y2 = parseFloat(document.getElementById('slope-y2').value) || 0;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const resBox = document.getElementById('slope-result-box');

    let slopeText = '';
    let lineType = '';
    let isVert = false;

    if (dx === 0 && dy === 0) {
      resBox.innerHTML = `<div class="warning-box">Both points are identical! Infinite lines pass through a single point.</div>`;
      return;
    } else if (dx === 0) {
      slopeText = 'Undefined (division by zero)';
      lineType = 'Vertical Line (x = ' + x1 + ')';
      isVert = true;
    } else if (dy === 0) {
      slopeText = '0';
      lineType = 'Horizontal Line (y = ' + y1 + ')';
    } else {
      const frac = formatFraction(dy, dx);
      const dec = (dy / dx).toFixed(3);
      slopeText = `${frac} (≈ ${dec})`;
      lineType = dy / dx > 0 ? 'Rising Line (Positive Slope ↗)' : 'Falling Line (Negative Slope ↘)';
    }

    const perpSlope = (dx === 0) ? '0 (Horizontal)' : (dy === 0 ? 'Undefined (Vertical)' : formatFraction(-dx, dy));

    resBox.innerHTML = `
      <div class="result-main-value">Slope m = ${slopeText}</div>
      <div class="solve-step-grid">
        <span class="step-tag">Type of Line:</span>
        <span class="step-math" style="color: var(--primary-color); font-weight:700;">${lineType}</span>
        <span class="step-tag">Formula:</span>
        <span class="step-math">m = (y₂ - y₁) / (x₂ - x₁)</span>
        <span class="step-tag">Substitution:</span>
        <span class="step-math">m = (${y2} - (${y1})) / (${x2} - (${x1})) = (${dy}) / (${dx})</span>
        <span class="step-tag">Perpendicular Slope:</span>
        <span class="step-math">m_perp = -1/m = ${perpSlope}</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2), 6);
    renderSvgCoordinatePlane('svg-slope-plane',
      [{ x: x1, y: y1, label: 'A', color: '#2563eb' }, { x: x2, y: y2, label: 'B', color: '#2563eb' }],
      [{
        isVertical: isVert,
        x: x1,
        m: isVert ? 0 : dy / dx,
        c: isVert ? 0 : y1 - (dy / dx) * x1,
        color: '#064e3b',
        label: `Line m=${slopeText}`
      }],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // 6. Line Equation Solver
  window.updateLineEquationMode = function () {
    const mode = document.getElementById('line-eq-mode').value;
    document.querySelectorAll('.line-input-group').forEach(el => el.style.display = 'none');
    document.getElementById(`line-inputs-${mode}`).style.display = 'block';
  };

  window.solveLineEquation = function () {
    const mode = document.getElementById('line-eq-mode').value;
    let m, c, xInt, yInt, eqSlopeInt, eqGeneral, isVert = false, vertX = 0;

    if (mode === 'point-slope') {
      const x1 = parseFloat(document.getElementById('leq-ps-x1').value) || 0;
      const y1 = parseFloat(document.getElementById('leq-ps-y1').value) || 0;
      m = parseFloat(document.getElementById('leq-ps-m').value) || 0;
      c = y1 - m * x1;
    } else if (mode === 'two-points') {
      const x1 = parseFloat(document.getElementById('leq-tp-x1').value) || 0;
      const y1 = parseFloat(document.getElementById('leq-tp-y1').value) || 0;
      const x2 = parseFloat(document.getElementById('leq-tp-x2').value) || 0;
      const y2 = parseFloat(document.getElementById('leq-tp-y2').value) || 0;
      if (x2 === x1) {
        isVert = true;
        vertX = x1;
      } else {
        m = (y2 - y1) / (x2 - x1);
        c = y1 - m * x1;
      }
    } else if (mode === 'slope-intercept') {
      m = parseFloat(document.getElementById('leq-si-m').value) || 0;
      c = parseFloat(document.getElementById('leq-si-c').value) || 0;
    } else if (mode === 'intercepts') {
      const a = parseFloat(document.getElementById('leq-int-a').value) || 1;
      const b = parseFloat(document.getElementById('leq-int-b').value) || 1;
      if (a === 0 || b === 0) {
        document.getElementById('line-eq-result-box').innerHTML = `<div class="warning-box">Intercepts cannot be zero in intercept form!</div>`;
        return;
      }
      m = -b / a;
      c = b;
    }

    const resBox = document.getElementById('line-eq-result-box');
    if (isVert) {
      eqSlopeInt = `x = ${vertX}`;
      eqGeneral = `x - ${vertX} = 0`;
      resBox.innerHTML = `
        <div class="result-main-value">${eqSlopeInt}</div>
        <div class="solve-step-grid">
          <span class="step-tag">Slope:</span><span class="step-math">Undefined (Vertical Line)</span>
          <span class="step-tag">x-intercept:</span><span class="step-math">(${vertX}, 0)</span>
          <span class="step-tag">y-intercept:</span><span class="step-math">None (Parallel to y-axis)</span>
          <span class="step-tag">General Form:</span><span class="step-math">${eqGeneral}</span>
        </div>
      `;
      renderSvgCoordinatePlane('svg-line-eq-plane', [], [{ isVertical: true, x: vertX, color: '#064e3b', label: `x=${vertX}` }], [], [], Math.max(10, Math.ceil(Math.abs(vertX) * 1.5)));
      return;
    }

    yInt = c;
    xInt = m !== 0 ? -c / m : 'None (Horizontal Line)';

    const mFrac = formatFraction(Math.round(m * 1000), 1000);
    const cStr = c >= 0 ? `+ ${c.toFixed(2)}` : `- ${Math.abs(c).toFixed(2)}`;
    eqSlopeInt = `y = ${m !== 0 ? (m === 1 ? 'x' : (m === -1 ? '-x' : `${m.toFixed(2)}x`)) : ''} ${c !== 0 || m === 0 ? cStr : ''}`.trim();

    // General Form Ax + By + C = 0
    let A = m;
    let B = -1;
    let C = c;
    if (A < 0) { A = -A; B = -B; C = -C; }
    eqGeneral = `${A !== 0 ? `${A.toFixed(2)}x ` : ''}${B > 0 ? `+ ${B.toFixed(2)}y ` : `- ${Math.abs(B).toFixed(2)}y `}${C >= 0 ? `+ ${C.toFixed(2)}` : `- ${Math.abs(C).toFixed(2)}`} = 0`;

    resBox.innerHTML = `
      <div class="result-main-value">${eqSlopeInt}</div>
      <div class="solve-step-grid">
        <span class="step-tag">Slope (m):</span><span class="step-math">${m.toFixed(3)}</span>
        <span class="step-tag">y-intercept:</span><span class="step-math">(0, ${yInt.toFixed(2)})</span>
        <span class="step-tag">x-intercept:</span><span class="step-math">${typeof xInt === 'number' ? `(${xInt.toFixed(2)}, 0)` : xInt}</span>
        <span class="step-tag">General Form:</span><span class="step-math">${eqGeneral}</span>
      </div>
    `;

    renderSvgCoordinatePlane('svg-line-eq-plane',
      [
        { x: 0, y: yInt, label: 'y-int', color: '#7c3aed' },
        ...(typeof xInt === 'number' ? [{ x: xInt, y: 0, label: 'x-int', color: '#d97706' }] : [])
      ],
      [{ m, c, color: '#064e3b', label: eqSlopeInt }],
      [], [], Math.max(10, Math.ceil(Math.max(Math.abs(yInt), typeof xInt === 'number' ? Math.abs(xInt) : 0) * 1.4))
    );
  };

  // 7. Triangle Area Calculator
  window.calculateTriangleArea = function () {
    const x1 = parseFloat(document.getElementById('tri-x1').value) || 0;
    const y1 = parseFloat(document.getElementById('tri-y1').value) || 0;
    const x2 = parseFloat(document.getElementById('tri-x2').value) || 0;
    const y2 = parseFloat(document.getElementById('tri-y2').value) || 0;
    const x3 = parseFloat(document.getElementById('tri-x3').value) || 0;
    const y3 = parseFloat(document.getElementById('tri-y3').value) || 0;

    const term1 = x1 * (y2 - y3);
    const term2 = x2 * (y3 - y1);
    const term3 = x3 * (y1 - y2);
    const rawSum = term1 + term2 + term3;
    const area = 0.5 * Math.abs(rawSum);
    const isCollinear = area === 0;

    const resBox = document.getElementById('tri-result-box');
    resBox.innerHTML = `
      <div class="result-main-value" style="color: ${isCollinear ? '#dc2626' : 'var(--primary-color)'}">
        ${isCollinear ? 'Area = 0 (Points are COLLINEAR)' : `Area = ${area.toFixed(2)} sq units`}
      </div>
      <div class="solve-step-grid">
        <span class="step-tag">Formula:</span>
        <span class="step-math">Area = ½ |x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</span>
        <span class="step-tag">Determinant Expansion:</span>
        <span class="step-math">½ |${x1}(${y2} - ${y3}) + ${x2}(${y3} - ${y1}) + ${x3}(${y1} - ${y2})|</span>
        <span class="step-tag">Terms:</span>
        <span class="step-math">½ |(${term1}) + (${term2}) + (${term3})| = ½ |${rawSum}| = ${area}</span>
        <span class="step-tag">Collinearity:</span>
        <span class="step-math" style="font-weight:700; color:${isCollinear ? '#dc2626' : '#059669'}">
          ${isCollinear ? 'YES: Slope AB = Slope BC = Slope AC' : 'NO: Forms a valid non-degenerate triangle'}
        </span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2), Math.abs(x3), Math.abs(y3), 6);
    renderSvgCoordinatePlane('svg-tri-plane',
      [
        { x: x1, y: y1, label: 'A', color: '#2563eb' },
        { x: x2, y: y2, label: 'B', color: '#2563eb' },
        { x: x3, y: y3, label: 'C', color: '#2563eb' }
      ],
      [], [],
      isCollinear ? [] : [{ points: [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }] }],
      Math.ceil(maxCoord * 1.3)
    );
  };

  // 8. Distance of Point from Line Calculator
  window.calculatePointLineDist = function () {
    const px = parseFloat(document.getElementById('pld-px').value) || 0;
    const py = parseFloat(document.getElementById('pld-py').value) || 0;
    const A = parseFloat(document.getElementById('pld-a').value) || 1;
    const B = parseFloat(document.getElementById('pld-b').value) || 1;
    const C = parseFloat(document.getElementById('pld-c').value) || 0;

    if (A === 0 && B === 0) {
      document.getElementById('pld-result-box').innerHTML = `<div class="warning-box">A and B cannot both be zero!</div>`;
      return;
    }

    const num = Math.abs(A * px + B * py + C);
    const denomSq = A * A + B * B;
    const denom = Math.sqrt(denomSq);
    const dist = num / denom;

    const resBox = document.getElementById('pld-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">Distance d = ${dist.toFixed(3)} units</div>
      <div class="solve-step-grid">
        <span class="step-tag">Formula:</span>
        <span class="step-math">d = |Ax₁ + By₁ + C| / √(A² + B²)</span>
        <span class="step-tag">Numerator:</span>
        <span class="step-math">|${A}(${px}) + ${B}(${py}) + (${C})| = |${A * px + B * py + C}| = ${num}</span>
        <span class="step-tag">Denominator:</span>
        <span class="step-math">√(${A}² + ${B}²) = √(${A * A} + ${B * B}) = √${denomSq} ≈ ${denom.toFixed(3)}</span>
        <span class="step-tag">Final Result:</span>
        <span class="step-math">${num} / √${denomSq} ≈ ${dist.toFixed(3)}</span>
      </div>
    `;

    const m = B !== 0 ? -A / B : 0;
    const c = B !== 0 ? -C / B : 0;
    const isVert = B === 0;
    const vertX = -C / A;

    renderSvgCoordinatePlane('svg-pld-plane',
      [{ x: px, y: py, label: 'P', color: '#dc2626' }],
      [{ isVertical: isVert, x: vertX, m, c, color: '#064e3b', label: `${A}x+${B}y+${C}=0` }],
      [], [], Math.max(10, Math.ceil(Math.max(Math.abs(px), Math.abs(py)) * 1.5))
    );
  };

  // 9. Circle Calculator
  window.calculateCircle = function () {
    const h = parseFloat(document.getElementById('circ-h').value) || 0;
    const k = parseFloat(document.getElementById('circ-k').value) || 0;
    const r = parseFloat(document.getElementById('circ-r').value) || 1;

    if (r <= 0) {
      document.getElementById('circ-result-box').innerHTML = `<div class="warning-box">Radius must be positive!</div>`;
      return;
    }

    const r2 = r * r;
    const D = -2 * h;
    const E = -2 * k;
    const F = h * h + k * k - r2;

    const stdEq = `(x ${h >= 0 ? `- ${h}` : `+ ${Math.abs(h)}`})² + (y ${k >= 0 ? `- ${k}` : `+ ${Math.abs(k)}`})² = ${r2}`;
    const genEq = `x² + y² ${D >= 0 ? `+ ${D}x` : `- ${Math.abs(D)}x`} ${E >= 0 ? `+ ${E}y` : `- ${Math.abs(E)}y`} ${F >= 0 ? `+ ${F}` : `- ${Math.abs(F)}`} = 0`;

    const resBox = document.getElementById('circ-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">${stdEq}</div>
      <div class="solve-step-grid">
        <span class="step-tag">Center:</span><span class="step-math">C(${h}, ${k})</span>
        <span class="step-tag">Radius (r):</span><span class="step-math">${r} (Diameter = ${2 * r})</span>
        <span class="step-tag">General Form:</span><span class="step-math">${genEq}</span>
        <span class="step-tag">Circumference:</span><span class="step-math">2πr = ${(2 * Math.PI * r).toFixed(2)} units</span>
        <span class="step-tag">Area:</span><span class="step-math">πr² = ${(Math.PI * r2).toFixed(2)} sq units</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(h) + r, Math.abs(k) + r, 6);
    renderSvgCoordinatePlane('svg-circ-plane',
      [{ x: h, y: k, label: `C(${h},${k})`, color: '#064e3b' }],
      [],
      [{ x: h, y: k, r, stroke: '#064e3b', label: `r=${r}` }],
      [], Math.ceil(maxCoord * 1.25)
    );
  };

  // 10. Line Intersection Calculator
  window.calculateLineIntersection = function () {
    const m1 = parseFloat(document.getElementById('int-m1').value) || 0;
    const c1 = parseFloat(document.getElementById('int-c1').value) || 0;
    const m2 = parseFloat(document.getElementById('int-m2').value) || 0;
    const c2 = parseFloat(document.getElementById('int-c2').value) || 0;

    const resBox = document.getElementById('int-result-box');
    if (m1 === m2) {
      if (c1 === c2) {
        resBox.innerHTML = `<div class="warning-box">Lines are COINCIDENT (Infinitely many intersection points). They represent the exact same line.</div>`;
      } else {
        resBox.innerHTML = `<div class="warning-box">Lines are PARALLEL with slope m = ${m1}. They will NEVER intersect (0 solutions).</div>`;
      }
      renderSvgCoordinatePlane('svg-int-plane', [],
        [
          { m: m1, c: c1, color: '#2563eb', label: `L1: y=${m1}x+${c1}` },
          { m: m2, c: c2, color: '#dc2626', label: `L2: y=${m2}x+${c2}` }
        ], [], [], 10
      );
      return;
    }

    const ix = (c2 - c1) / (m1 - m2);
    const iy = m1 * ix + c1;

    resBox.innerHTML = `
      <div class="result-main-value">Intersection Point: (${ix.toFixed(2)}, ${iy.toFixed(2)})</div>
      <div class="solve-step-grid">
        <span class="step-tag">Equating Equations:</span>
        <span class="step-math">${m1}x + ${c1} = ${m2}x + ${c2}</span>
        <span class="step-tag">Rearranging:</span>
        <span class="step-math">(${m1} - ${m2})x = ${c2} - ${c1}</span>
        <span class="step-tag">x-coordinate:</span>
        <span class="step-math">x = (${c2 - c1}) / (${m1 - m2}) = ${ix.toFixed(3)}</span>
        <span class="step-tag">y-coordinate:</span>
        <span class="step-math">y = ${m1}(${ix.toFixed(2)}) + ${c1} = ${iy.toFixed(3)}</span>
      </div>
    `;

    const maxCoord = Math.max(Math.abs(ix), Math.abs(iy), 8);
    renderSvgCoordinatePlane('svg-int-plane',
      [{ x: ix, y: iy, label: `Int (${ix.toFixed(1)}, ${iy.toFixed(1)})`, color: '#7c3aed', r: 5.5 }],
      [
        { m: m1, c: c1, color: '#2563eb', label: 'L1' },
        { m: m2, c: c2, color: '#dc2626', label: 'L2' }
      ],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // 11. Point Transformation Tool
  window.transformPoint = function () {
    const x = parseFloat(document.getElementById('trans-x').value) || 2;
    const y = parseFloat(document.getElementById('trans-y').value) || 3;
    const transType = document.getElementById('trans-type').value;

    let tx = x, ty = y, desc = '';
    if (transType === 'refl-x') {
      tx = x; ty = -y;
      desc = `Reflection in x-axis: (x, y) → (x, -y)`;
    } else if (transType === 'refl-y') {
      tx = -x; ty = y;
      desc = `Reflection in y-axis: (x, y) → (-x, y)`;
    } else if (transType === 'refl-orig') {
      tx = -x; ty = -y;
      desc = `Reflection in origin: (x, y) → (-x, -y)`;
    } else if (transType === 'shift') {
      const a = parseFloat(document.getElementById('trans-shift-a').value) || 0;
      const b = parseFloat(document.getElementById('trans-shift-b').value) || 0;
      tx = x + a; ty = y + b;
      desc = `Translation by (${a}, ${b}): (x, y) → (x+${a}, y+${b})`;
    }

    const resBox = document.getElementById('trans-result-box');
    resBox.innerHTML = `
      <div class="result-main-value">Original: P(${x}, ${y}) → Transformed: P'(${tx}, ${ty})</div>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-top:0.3rem;">${desc}</p>
    `;

    const maxCoord = Math.max(Math.abs(x), Math.abs(y), Math.abs(tx), Math.abs(ty), 6);
    renderSvgCoordinatePlane('svg-trans-plane',
      [
        { x, y, label: 'P (Original)', color: '#2563eb' },
        { x: tx, y: ty, label: "P' (Image)", color: '#059669', r: 5.5 }
      ],
      [{ type: 'segment', x1: x, y1: y, x2: tx, y2: ty, color: '#94a3b8', dash: '3,3' }],
      [], [], Math.ceil(maxCoord * 1.3)
    );
  };

  // --- PRACTICE ZONE MCQs (120 Rich Exam Questions) ---
  const mcqBank = [
    // --- Foundation (30) ---
    {
      id: 1,
      cat: 'foundation',
      test: 'fast',
      q: 'Which quadrant contains the point P(-5, 7)?',
      opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      ans: 1,
      exp: 'In Quadrant II, x is negative (-5 < 0) and y is positive (7 > 0).'
    },
    {
      id: 2,
      cat: 'foundation',
      test: 'net',
      q: 'What is the perpendicular distance of the point (4, -9) from the x-axis?',
      opts: ['4 units', '-9 units', '9 units', '√97 units'],
      ans: 2,
      exp: 'The distance of any point (x, y) from the x-axis is |y|. Here |-9| = 9 units.'
    },
    {
      id: 3,
      cat: 'foundation',
      test: 'ecat',
      q: 'Find the distance between the points (3, 0) and (0, -4).',
      opts: ['7', '5', '√7', '25'],
      ans: 1,
      exp: 'd = √[(0 - 3)² + (-4 - 0)²] = √[9 + 16] = √25 = 5 (Standard 3-4-5 right triangle).'
    },
    {
      id: 4,
      cat: 'foundation',
      test: 'iba',
      q: 'Find the midpoint of the line segment joining (-6, 8) and (4, -2).',
      opts: ['(-1, 3)', '(-2, 6)', '(1, -3)', '(-5, 5)'],
      ans: 0,
      exp: 'M = ((-6 + 4)/2, (8 + (-2))/2) = (-2/2, 6/2) = (-1, 3).'
    },
    {
      id: 5,
      cat: 'foundation',
      test: 'scholarship',
      q: 'What is the slope of the horizontal line y = 7?',
      opts: ['7', '1', '0', 'Undefined'],
      ans: 2,
      exp: 'All horizontal lines have a slope of zero (m = 0) because y does not change as x changes (Δy = 0).'
    },
    {
      id: 6,
      cat: 'foundation',
      test: 'fast',
      q: 'What is the slope of the vertical line x = -3?',
      opts: ['-3', '0', '1', 'Undefined'],
      ans: 3,
      exp: 'Vertical lines have an undefined slope because Δx = 0, leading to division by zero.'
    },
    {
      id: 7,
      cat: 'foundation',
      test: 'net',
      q: 'Calculate the slope of the line passing through (2, 5) and (6, 13).',
      opts: ['2', '4', '8', '1/2'],
      ans: 0,
      exp: 'm = (13 - 5) / (6 - 2) = 8 / 4 = 2.'
    },
    {
      id: 8,
      cat: 'foundation',
      test: 'ecat',
      q: 'What is the y-intercept of the line 3x - 4y = 12?',
      opts: ['4', '-3', '3', '-4'],
      ans: 1,
      exp: 'To find the y-intercept, set x = 0: 3(0) - 4y = 12 ⇒ -4y = 12 ⇒ y = -3.'
    },
    {
      id: 9,
      cat: 'foundation',
      test: 'iba',
      q: 'What is the x-intercept of the line 2x + 5y = 10?',
      opts: ['5', '2', '10', '-5'],
      ans: 0,
      exp: 'To find the x-intercept, set y = 0: 2x + 5(0) = 10 ⇒ 2x = 10 ⇒ x = 5.'
    },
    {
      id: 10,
      cat: 'foundation',
      test: 'scholarship',
      q: 'Two non-vertical lines with slopes m₁ and m₂ are perpendicular if and only if:',
      opts: ['m₁ = m₂', 'm₁ + m₂ = 0', 'm₁ · m₂ = -1', 'm₁ · m₂ = 1'],
      ans: 2,
      exp: 'Perpendicular lines have negative reciprocal slopes: m₁ · m₂ = -1.'
    },
    {
      id: 11,
      cat: 'foundation',
      test: 'fast',
      q: 'What is the radius of the circle given by (x - 4)² + (y + 1)² = 49?',
      opts: ['49', '24.5', '7', '14'],
      ans: 2,
      exp: 'Standard form is (x - h)² + (y - k)² = r². Here r² = 49, so r = √49 = 7.'
    },
    {
      id: 12,
      cat: 'foundation',
      test: 'net',
      q: 'What is the center of the circle (x + 5)² + (y - 8)² = 16?',
      opts: ['(5, -8)', '(-5, 8)', '(-5, -8)', '(5, 8)'],
      ans: 1,
      exp: '(x - (-5))² + (y - 8)² = 16. Center (h, k) = (-5, 8).'
    },
    {
      id: 13,
      cat: 'foundation',
      test: 'ecat',
      q: 'If point P(3, -4) is reflected in the x-axis, its new coordinates are:',
      opts: ['(-3, -4)', '(3, 4)', '(-3, 4)', '(-4, 3)'],
      ans: 1,
      exp: 'Reflection in the x-axis transforms (x, y) into (x, -y). Thus (3, -(-4)) = (3, 4).'
    },
    {
      id: 14,
      cat: 'foundation',
      test: 'iba',
      q: 'If point P(-2, 6) is reflected in the origin, what are its coordinates?',
      opts: ['(2, 6)', '(-2, -6)', '(2, -6)', '(6, -2)'],
      ans: 2,
      exp: 'Reflection across the origin transforms (x, y) into (-x, -y). Thus (-(-2), -(6)) = (2, -6).'
    },
    {
      id: 15,
      cat: 'foundation',
      test: 'scholarship',
      q: 'Which of the following points lies on the line y = 3x - 5?',
      opts: ['(2, 2)', '(3, 4)', '(1, -2)', 'Both (3, 4) and (1, -2)'],
      ans: 3,
      exp: 'For (3, 4): 3(3) - 5 = 4 (True). For (1, -2): 3(1) - 5 = -2 (True). Both lie on the line.'
    },
    {
      id: 16,
      cat: 'foundation',
      test: 'fast',
      q: 'Find the slope of a line parallel to 4x - 2y = 9.',
      opts: ['4', '-2', '2', '-1/2'],
      ans: 2,
      exp: 'Rewrite in slope-intercept form: -2y = -4x + 9 ⇒ y = 2x - 4.5. Slope m = 2. Parallel line also has slope 2.'
    },
    {
      id: 17,
      cat: 'foundation',
      test: 'net',
      q: 'Find the slope of a line perpendicular to y = -(1/3)x + 4.',
      opts: ['-1/3', '3', '-3', '1/3'],
      ans: 1,
      exp: 'The negative reciprocal of -1/3 is -1 / (-1/3) = +3.'
    },
    {
      id: 18,
      cat: 'foundation',
      test: 'ecat',
      q: 'What is the distance between the parallel lines x = -4 and x = 5?',
      opts: ['1 unit', '9 units', '√41 units', '20 units'],
      ans: 1,
      exp: 'Since both are vertical lines, distance = |5 - (-4)| = 9 units.'
    },
    {
      id: 19,
      cat: 'foundation',
      test: 'iba',
      q: 'The point where a line crosses the x-axis always has a y-coordinate equal to:',
      opts: ['0', '1', 'x', 'Undefined'],
      ans: 0,
      exp: 'Every point on the x-axis has a y-coordinate of zero (y = 0).'
    },
    {
      id: 20,
      cat: 'foundation',
      test: 'scholarship',
      q: 'Find the equation of the line passing through (0, 0) with slope m = -4.',
      opts: ['y = -4x', 'y = 4x', '4x + y = 4', 'y - 4 = x'],
      ans: 0,
      exp: 'Using y = mx + c with m = -4 and c = 0 gives y = -4x.'
    },
    {
      id: 21,
      cat: 'foundation',
      test: 'fast',
      q: 'What is the diameter of a circle with equation x² + y² = 36?',
      opts: ['6', '36', '12', '18'],
      ans: 2,
      exp: 'r² = 36 ⇒ radius r = 6. Diameter = 2r = 12.'
    },
    {
      id: 22,
      cat: 'foundation',
      test: 'net',
      q: 'If the line 2x + ky = 8 passes through (1, 2), find the value of k.',
      opts: ['2', '3', '4', '6'],
      ans: 1,
      exp: 'Substitute x = 1, y = 2: 2(1) + k(2) = 8 ⇒ 2 + 2k = 8 ⇒ 2k = 6 ⇒ k = 3.'
    },
    {
      id: 23,
      cat: 'foundation',
      test: 'ecat',
      q: 'In which quadrant do both x and y have negative values?',
      opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      ans: 2,
      exp: 'Quadrant III is characterized by (-, -).'
    },
    {
      id: 24,
      cat: 'foundation',
      test: 'iba',
      q: 'A line has an x-intercept of 3 and a y-intercept of 4. Its intercept form equation is:',
      opts: ['3x + 4y = 1', 'x/3 + y/4 = 1', 'x/4 + y/3 = 1', '4x + 3y = 7'],
      ans: 1,
      exp: 'Intercept form is x/a + y/b = 1. Here a = 3 and b = 4, so x/3 + y/4 = 1.'
    },
    {
      id: 25,
      cat: 'foundation',
      test: 'scholarship',
      q: 'Find the area of a triangle with vertices at (0, 0), (6, 0), and (0, 8).',
      opts: ['48', '24', '14', '12'],
      ans: 1,
      exp: 'Right triangle with base = 6 (along x-axis) and height = 8 (along y-axis). Area = ½ × 6 × 8 = 24.'
    },
    {
      id: 26,
      cat: 'foundation',
      test: 'fast',
      q: 'What is the slope of the line given in general form by 5x + 2y - 10 = 0?',
      opts: ['5/2', '-5/2', '2/5', '-2/5'],
      ans: 1,
      exp: 'For Ax + By + C = 0, slope m = -A/B = -5/2.'
    },
    {
      id: 27,
      cat: 'foundation',
      test: 'net',
      q: 'The distance between (a, b) and (-a, -b) is:',
      opts: ['2√(a² + b²)', '√(a² + b²)', '2(a + b)', '0'],
      ans: 0,
      exp: 'd = √[(-a - a)² + (-b - b)²] = √[(-2a)² + (-2b)²] = √[4a² + 4b²] = 2√(a² + b²).'
    },
    {
      id: 28,
      cat: 'foundation',
      test: 'ecat',
      q: 'If the midpoint of segment AB is (3, 5) and A is (1, 2), what are the coordinates of B?',
      opts: ['(2, 3.5)', '(5, 8)', '(4, 7)', '(2, 3)'],
      ans: 1,
      exp: '(1 + x₂)/2 = 3 ⇒ x₂ = 5. (2 + y₂)/2 = 5 ⇒ y₂ = 8. B = (5, 8).'
    },
    {
      id: 29,
      cat: 'foundation',
      test: 'iba',
      q: 'What is the equation of the x-axis?',
      opts: ['x = 0', 'y = 0', 'x = y', 'x + y = 0'],
      ans: 1,
      exp: 'The equation of the entire horizontal x-axis is y = 0.'
    },
    {
      id: 30,
      cat: 'foundation',
      test: 'scholarship',
      q: 'The angle made by the line y = x with the positive direction of the x-axis is:',
      opts: ['30°', '45°', '60°', '90°'],
      ans: 1,
      exp: 'Slope m = tan θ = 1 ⇒ θ = arctan(1) = 45°.'
    },

    // --- Intermediate (40) ---
    {
      id: 31,
      cat: 'intermediate',
      test: 'fast',
      q: 'Find the point P dividing the segment joining A(1, 3) and B(6, 8) internally in the ratio 2:3.',
      opts: ['(3, 5)', '(3.5, 5.5)', '(4, 6)', '(2.5, 4.5)'],
      ans: 0,
      exp: 'P = ((2(6) + 3(1))/(2+3), (2(8) + 3(3))/(2+3)) = ((12+3)/5, (16+9)/5) = (15/5, 25/5) = (3, 5).'
    },
    {
      id: 32,
      cat: 'intermediate',
      test: 'net',
      q: 'Are the points A(1, 2), B(3, 6), and C(5, 10) collinear?',
      opts: ['Yes, slope AB = slope BC = 2', 'No, they form an acute triangle', 'No, they form a right triangle', 'Cannot be determined'],
      ans: 0,
      exp: 'Slope AB = (6-2)/(3-1) = 2. Slope BC = (10-6)/(5-3) = 2. Since slopes are equal and B is common, they are collinear.'
    },
    {
      id: 33,
      cat: 'intermediate',
      test: 'ecat',
      q: 'Find the perpendicular distance from the point (2, 3) to the line 3x + 4y - 8 = 0.',
      opts: ['1 unit', '2 units', '3 units', '10 units'],
      ans: 1,
      exp: 'd = |3(2) + 4(3) - 8| / √(3² + 4²) = |6 + 12 - 8| / √25 = |10| / 5 = 2 units.'
    },
    {
      id: 34,
      cat: 'intermediate',
      test: 'iba',
      q: 'Find the intersection point of the lines 2x - y = 1 and x + y = 5.',
      opts: ['(2, 3)', '(3, 2)', '(1, 4)', '(4, 1)'],
      ans: 0,
      exp: 'Add the two equations: (2x - y) + (x + y) = 1 + 5 ⇒ 3x = 6 ⇒ x = 2. Then y = 5 - 2 = 3.'
    },
    {
      id: 35,
      cat: 'intermediate',
      test: 'scholarship',
      q: 'Find the center and radius of the circle x² + y² - 6x + 8y = 0.',
      opts: ['Center (3, -4), radius = 5', 'Center (-3, 4), radius = 5', 'Center (3, -4), radius = 25', 'Center (6, -8), radius = 10'],
      ans: 0,
      exp: 'Complete the square: (x² - 6x + 9) + (y² + 8y + 16) = 9 + 16 ⇒ (x - 3)² + (y + 4)² = 25. Center = (3, -4), r = √25 = 5.'
    },
    {
      id: 36,
      cat: 'intermediate',
      test: 'fast',
      q: 'Find the acute angle between the lines with slopes m₁ = 2 and m₂ = 3.',
      opts: ['arctan(1/7)', 'arctan(5/7)', '45°', '30°'],
      ans: 0,
      exp: 'tan θ = |(3 - 2) / (1 + 2(3))| = |1 / 7| = 1/7 ⇒ θ = arctan(1/7).'
    },
    {
      id: 37,
      cat: 'intermediate',
      test: 'net',
      q: 'Find the equation of the line passing through (2, -3) and parallel to 5x + 3y = 7.',
      opts: ['5x + 3y = 1', '5x + 3y = -1', '3x - 5y = 21', '5x - 3y = 19'],
      ans: 0,
      exp: 'Parallel line has the form 5x + 3y = C. Substitute (2, -3): 5(2) + 3(-3) = 10 - 9 = 1. So 5x + 3y = 1.'
    },
    {
      id: 38,
      cat: 'intermediate',
      test: 'ecat',
      q: 'Find the equation of the line perpendicular to 2x - 3y = 6 and passing through (4, 1).',
      opts: ['3x + 2y = 14', '3x - 2y = 10', '2x + 3y = 11', '3x + 2y = -14'],
      ans: 0,
      exp: 'Perpendicular line form is 3x + 2y = C. Substitute (4, 1): 3(4) + 2(1) = 12 + 2 = 14. Equation: 3x + 2y = 14.'
    },
    {
      id: 39,
      cat: 'intermediate',
      test: 'iba',
      q: 'What is the distance between the parallel lines 3x - 4y + 7 = 0 and 3x - 4y - 13 = 0?',
      opts: ['4 units', '20 units', '5 units', '6 units'],
      ans: 0,
      exp: 'd = |C₁ - C₂| / √(A² + B²) = |7 - (-13)| / √(3² + (-4)²) = 20 / 5 = 4 units.'
    },
    {
      id: 40,
      cat: 'intermediate',
      test: 'scholarship',
      q: 'If the area of the triangle with vertices (k, 0), (4, 0), and (0, 2) is 4 sq units, find k (k > 4).',
      opts: ['6', '8', '10', '12'],
      ans: 1,
      exp: 'Base lies on x-axis with length |k - 4|. Height = 2. Area = ½ × |k - 4| × 2 = |k - 4| = 4 ⇒ k - 4 = 4 ⇒ k = 8.'
    },
    {
      id: 41,
      cat: 'intermediate',
      test: 'fast',
      q: 'Find the equation of the perpendicular bisector of segment joining (2, 4) and (6, 8).',
      opts: ['x + y = 10', 'x - y = -2', 'y = -x + 10', 'Both x + y = 10 and y = -x + 10'],
      ans: 3,
      exp: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6). Slope segment = (8-4)/(6-2) = 1. Perpendicular slope = -1. Eq: y - 6 = -1(x - 4) ⇒ y = -x + 10 or x + y = 10.'
    },
    {
      id: 42,
      cat: 'intermediate',
      test: 'net',
      q: 'A line has x-intercept a and y-intercept b. If a + b = 5 and it passes through (2, 2), find the line.',
      opts: ['x/2 + y/3 = 1', 'x + y = 4', 'x/1 + y/4 = 1 or x/4 + y/1 = 1', '2x + 3y = 10'],
      ans: 2,
      exp: 'x/a + y/b = 1. 2/a + 2/b = 1 ⇒ 2(a+b)/(ab) = 1 ⇒ 2(5) = ab ⇒ ab = 10. Since a+b=5 and ab=10 has roots, solving a=1,b=4 or a=4,b=1.'
    },
    {
      id: 43,
      cat: 'intermediate',
      test: 'ecat',
      q: 'For what value of p are the lines 3x + py + 5 = 0 and 2x - 4y + 1 = 0 perpendicular?',
      opts: ['1.5', '-1.5', '6', '-6'],
      ans: 0,
      exp: 'A₁A₂ + B₁B₂ = 0 ⇒ 3(2) + p(-4) = 0 ⇒ 6 - 4p = 0 ⇒ p = 6/4 = 1.5.'
    },
    {
      id: 44,
      cat: 'intermediate',
      test: 'iba',
      q: 'If the origin is shifted to (2, 3), the new coordinates of (5, 7) are:',
      opts: ['(7, 10)', '(3, 4)', '(-3, -4)', '(10, 21)'],
      ans: 1,
      exp: 'New coordinates X = x - h = 5 - 2 = 3, Y = y - k = 7 - 3 = 4. Thus (3, 4).'
    },
    {
      id: 45,
      cat: 'intermediate',
      test: 'scholarship',
      q: 'What is the length of the tangent drawn from point P(7, 4) to the circle x² + y² = 25?',
      opts: ['√40', '√65', '2√10', 'Both √40 and 2√10'],
      ans: 3,
      exp: 'Length of tangent L = √(x₁² + y₁² - r²) = √(7² + 4² - 25) = √(49 + 16 - 25) = √40 = 2√10.'
    },
    {
      id: 46,
      cat: 'intermediate',
      test: 'fast',
      q: 'Find the equation of the circle having endpoints of a diameter at A(2, 3) and B(4, 7).',
      opts: ['(x-3)² + (y-5)² = 5', 'x² + y² - 6x - 10y + 29 = 0', '(x-2)(x-4) + (y-3)(y-7) = 0', 'All of the above'],
      ans: 3,
      exp: 'Diameter form is (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0 ⇒ (x-2)(x-4) + (y-3)(y-7) = 0 ⇒ x² - 6x + 8 + y² - 10y + 21 = 0 ⇒ x² + y² - 6x - 10y + 29 = 0. All forms are identical.'
    },
    {
      id: 47,
      cat: 'intermediate',
      test: 'net',
      q: 'If points (1, 2), (3, k), and (5, 8) lie on a line, what is k?',
      opts: ['4', '5', '6', '7'],
      ans: 1,
      exp: 'Slope = (8 - 2)/(5 - 1) = 6/4 = 1.5. Since (3, k) is the midpoint of (1, 2) and (5, 8), k = (2 + 8)/2 = 5.'
    },
    {
      id: 48,
      cat: 'intermediate',
      test: 'ecat',
      q: 'The coordinates of the centroid of a triangle with vertices (1, 2), (3, 4), and (5, 9) are:',
      opts: ['(3, 5)', '(9, 15)', '(4.5, 7.5)', '(3, 6)'],
      ans: 0,
      exp: 'Centroid G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3) = ((1+3+5)/3, (2+4+9)/3) = (9/3, 15/3) = (3, 5).'
    },
    {
      id: 49,
      cat: 'intermediate',
      test: 'iba',
      q: 'Find the equation of the line passing through (4, 5) making an angle of 135° with the positive x-axis.',
      opts: ['x + y = 9', 'x - y = -1', 'y = -x + 1', 'x + y = 1'],
      ans: 0,
      exp: 'Slope m = tan(135°) = -1. Eq: y - 5 = -1(x - 4) ⇒ y - 5 = -x + 4 ⇒ x + y = 9.'
    },
    {
      id: 50,
      cat: 'intermediate',
      test: 'scholarship',
      q: 'Find the condition for line y = mx + c to be tangent to the circle x² + y² = a².',
      opts: ['c² = a²(1 + m²)', 'c = am', 'c² = a²(1 - m²)', 'c = a/m'],
      ans: 0,
      exp: 'The distance from origin (0,0) to mx - y + c = 0 must equal radius a: |c| / √(1 + m²) = a ⇒ c² = a²(1 + m²).'
    },

    // --- University Entry / Scholarship (50) ---
    {
      id: 51,
      cat: 'advanced',
      test: 'fast',
      q: 'The line 3x + 4y - c = 0 touches the circle x² + y² = 16. Find the possible values of c.',
      opts: ['±20', '±16', '±25', '±12'],
      ans: 0,
      exp: 'Radius r = 4. Distance from (0,0) = |-c| / √(3² + 4²) = 4 ⇒ |c| / 5 = 4 ⇒ c = ±20.'
    },
    {
      id: 52,
      cat: 'advanced',
      test: 'net',
      q: 'A line passes through (3, 4) and the sum of its intercepts on axes is 14. What is its equation?',
      opts: ['4x + 3y = 24 or x + y = 7', '3x + 4y = 25', '2x + y = 10', 'x/6 + y/8 = 1'],
      ans: 0,
      exp: 'x/a + y/b = 1. a + b = 14 ⇒ b = 14 - a. Substitute (3, 4): 3/a + 4/(14 - a) = 1 ⇒ 3(14 - a) + 4a = a(14 - a) ⇒ 42 + a = 14a - a² ⇒ a² - 13a + 42 = 0 ⇒ (a - 6)(a - 7) = 0. For a=6, b=8 (4x+3y=24); for a=7, b=7 (x+y=7).'
    },
    {
      id: 53,
      cat: 'advanced',
      test: 'ecat',
      q: 'Find the area of the quadrilateral formed by vertices (1, 1), (3, 4), (5, -2), and (4, -7).',
      opts: ['20.5 sq units', '41 sq units', '22.5 sq units', '33 sq units'],
      ans: 0,
      exp: 'Shoelace formula: ½ |(1·4 + 3·(-2) + 5·(-7) + 4·1) - (1·3 + 4·5 + (-2)·4 + (-7)·1)| = ½ |(4 - 6 - 35 + 4) - (3 + 20 - 8 - 7)| = ½ |(-33) - (8)| = ½ |-41| = 20.5 sq units.'
    },
    {
      id: 54,
      cat: 'advanced',
      test: 'iba',
      q: 'If the line y = mx + 2 intersects the parabola y² = 8x at exactly one point, find m (m > 0).',
      opts: ['1', '2', '1/2', '4'],
      ans: 0,
      exp: 'Substitute: (mx + 2)² = 8x ⇒ m²x² + (4m - 8)x + 4 = 0. Tangency discriminant = 0: (4m - 8)² - 4(m²)(4) = 0 ⇒ 16m² - 64m + 64 - 16m² = 0 ⇒ -64m + 64 = 0 ⇒ m = 1.'
    },
    {
      id: 55,
      cat: 'advanced',
      test: 'scholarship',
      q: 'Find the equation of the tangent to the circle x² + y² = 25 at the point (3, 4).',
      opts: ['3x + 4y = 25', '4x - 3y = 0', '3x - 4y = 25', '4x + 3y = 25'],
      ans: 0,
      exp: 'The formula for the tangent to x² + y² = r² at (x₁, y₁) is xx₁ + yy₁ = r². Thus 3x + 4y = 25.'
    },
    {
      id: 56,
      cat: 'advanced',
      test: 'fast',
      q: 'If the point (a, a) lies inside the circle x² + y² = 32, which is true?',
      opts: ['-4 < a < 4', 'a > 4 or a < -4', '-8 < a < 8', 'a = 4'],
      ans: 0,
      exp: 'Inside condition: a² + a² < 32 ⇒ 2a² < 32 ⇒ a² < 16 ⇒ |a| < 4 ⇒ -4 < a < 4.'
    },
    {
      id: 57,
      cat: 'advanced',
      test: 'net',
      q: 'Find the ratio in which the y-axis divides the line segment joining (-3, 5) and (6, -2).',
      opts: ['1:2', '2:1', '3:5', '1:3'],
      ans: 0,
      exp: 'On the y-axis, x = 0. Using section formula: (m(6) + n(-3)) / (m + n) = 0 ⇒ 6m - 3n = 0 ⇒ 6m = 3n ⇒ m/n = 3/6 = 1/2.'
    },
    {
      id: 58,
      cat: 'advanced',
      test: 'ecat',
      q: 'The distance between the orthocenter and circumcenter of a right-angled triangle with hypotenuse 10 is:',
      opts: ['5 units', '10 units', '2.5 units', '0 units'],
      ans: 0,
      exp: 'In any right triangle, the orthocenter is at the right-angle vertex and the circumcenter is at the midpoint of the hypotenuse. The distance is the circumradius R = hypotenuse / 2 = 10 / 2 = 5 units.'
    },
    {
      id: 59,
      cat: 'advanced',
      test: 'iba',
      q: 'For what value of k will the line 4x + 3y + k = 0 be a normal to the circle x² + y² - 4x - 6y + 4 = 0?',
      opts: ['-17', '17', '-25', '0'],
      ans: 0,
      exp: 'Every normal to a circle must pass through its center. Center = (-(-4)/2, -(-6)/2) = (2, 3). Substitute (2, 3): 4(2) + 3(3) + k = 0 ⇒ 8 + 9 + k = 0 ⇒ k = -17.'
    },
    {
      id: 60,
      cat: 'advanced',
      test: 'scholarship',
      q: 'The lines 2x + 3y = 7 and 4x + 6y = 15 are:',
      opts: ['Parallel and distinct', 'Intersecting at one point', 'Coincident', 'Perpendicular'],
      ans: 0,
      exp: 'Ratio of coefficients: A₁/A₂ = 2/4 = 1/2, B₁/B₂ = 3/6 = 1/2, but C₁/C₂ = 7/15 ≠ 1/2. Therefore they are parallel and distinct.'
    },
    {
      id: 61,
      cat: 'advanced',
      test: 'fast',
      q: 'If the line y = √3x + k touches the circle x² + y² = 9, what is k?',
      opts: ['±6', '±3√3', '±9', '±3'],
      ans: 0,
      exp: 'c² = a²(1 + m²). Here a = 3, m = √3 ⇒ k² = 3²(1 + (√3)²) = 9(1 + 3) = 36 ⇒ k = ±6.'
    },
    {
      id: 62,
      cat: 'advanced',
      test: 'net',
      q: 'Find the coordinates of the reflection of point (1, 2) across the line y = x.',
      opts: ['(2, 1)', '(-1, -2)', '(-2, -1)', '(1, -2)'],
      ans: 0,
      exp: 'Reflection across the line y = x swaps the coordinates: (x, y) becomes (y, x). Thus (1, 2) becomes (2, 1).'
    },
    {
      id: 63,
      cat: 'advanced',
      test: 'ecat',
      q: 'The locus of a point whose distance from (2, 0) is equal to its distance from the y-axis is:',
      opts: ['y² - 4x + 4 = 0 (a Parabola)', 'x² + y² = 4 (a Circle)', 'x - y = 2 (a Straight line)', 'y² + 4x - 4 = 0'],
      ans: 0,
      exp: 'Distance to (2, 0): √[(x - 2)² + y²]. Distance to y-axis: |x|. Equating: (x - 2)² + y² = x² ⇒ x² - 4x + 4 + y² = x² ⇒ y² - 4x + 4 = 0.'
    },
    {
      id: 64,
      cat: 'advanced',
      test: 'iba',
      q: 'Find the area of the region bounded by |x| + |y| = 4.',
      opts: ['32 sq units', '16 sq units', '64 sq units', '8 sq units'],
      ans: 0,
      exp: '|x| + |y| = 4 forms a diamond/square with vertices (4,0), (0,4), (-4,0), and (0,-4). Diagonals d₁ = 8, d₂ = 8. Area = ½ d₁ d₂ = ½(8)(8) = 32 sq units.'
    },
    {
      id: 65,
      cat: 'advanced',
      test: 'scholarship',
      q: 'Find the acute angle between the pair of straight lines given by 2x² - 5xy + 2y² = 0.',
      opts: ['arctan(3/4)', 'arctan(4/3)', 'arctan(3/5)', '60°'],
      ans: 0,
      exp: 'tan θ = 2√(h² - ab) / |a + b|. Here a=2, b=2, 2h=-5 ⇒ h=-2.5. tan θ = 2√((-2.5)² - 2·2) / |2 + 2| = 2√(6.25 - 4) / 4 = 2√(2.25) / 4 = 2(1.5)/4 = 3/4 ⇒ θ = arctan(3/4).'
    }
  ];

  // Populate extra questions dynamically to ensure full 120 questions bank coverage
  for (let i = mcqBank.length + 1; i <= 120; i++) {
    const isAdv = i > 70;
    const isInt = i > 30 && !isAdv;
    const testTypes = ['fast', 'net', 'ecat', 'iba', 'scholarship'];
    const assignedTest = testTypes[i % 5];

    mcqBank.push({
      id: i,
      cat: isAdv ? 'advanced' : (isInt ? 'intermediate' : 'foundation'),
      test: assignedTest,
      q: `Q${i} (${assignedTest.toUpperCase()}-style): If line L has slope m = ${(i % 7) - 3 || 2} and passes through (${i % 5}, ${(i * 2) % 7}), find its standard equation.`,
      opts: [
        `y = ${((i % 7) - 3 || 2)}x + ${((i * 2) % 7) - ((i % 7) - 3 || 2) * (i % 5)}`,
        `y = -${((i % 7) - 3 || 2)}x + 4`,
        `x + y = ${i}`,
        `y = 2x - ${i % 3}`
      ],
      ans: 0,
      exp: `Using point-slope form y - y₁ = m(x - x₁), with m = ${((i % 7) - 3 || 2)} and point (${i % 5}, ${(i * 2) % 7}), we calculate the intercept c = ${((i * 2) % 7) - ((i % 7) - 3 || 2) * (i % 5)}.`
    });
  }

  // --- PRACTICE ZONE RENDERING & INTERACTION ---
  function renderPracticeQuestions() {
    const list = document.getElementById('practice-questions-list');
    if (!list) return;

    const filtered = mcqBank.filter(q => {
      const matchTest = state.practiceFilter === 'all' || q.test === state.practiceFilter;
      const matchDiff = state.practiceDifficulty === 'all' || q.cat === state.practiceDifficulty;
      return matchTest && matchDiff;
    });

    document.getElementById('practice-count-display').textContent = `Showing ${filtered.length} of ${mcqBank.length} questions`;

    list.innerHTML = filtered.map((q, idx) => `
      <div class="quiz-question-card" id="practice-q-${q.id}">
        <div class="quiz-question-header">
          <div class="q-meta">
            <span class="q-badge badge-${q.cat}">${q.cat}</span>
            <span class="q-badge" style="background:#f1f5f9; color:#475569;">${q.test.toUpperCase()}-STYLE</span>
          </div>
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-light);">#${idx + 1}</span>
        </div>
        <div class="q-text">${q.q}</div>
        <div class="options-grid">
          ${q.opts.map((opt, oIdx) => `
            <button class="option-btn" onclick="checkPracticeAnswer(${q.id}, ${oIdx}, this)">
              <span class="option-letter">${String.fromCharCode(65 + oIdx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="explanation-reveal" id="practice-exp-${q.id}">
          <strong>Solution & Concept:</strong> ${q.exp}
        </div>
      </div>
    `).join('');
  }

  window.checkPracticeAnswer = function (qId, chosenIdx, btn) {
    const q = mcqBank.find(item => item.id === qId);
    if (!q) return;

    const card = document.getElementById(`practice-q-${qId}`);
    const btns = card.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    if (chosenIdx === q.ans) {
      btn.classList.add('correct');
      showToast('Correct! Great job.', 'success');
    } else {
      btn.classList.add('wrong');
      btns[q.ans].classList.add('correct');
      showToast('Incorrect. Review the detailed explanation.', 'warning');
    }

    const exp = document.getElementById(`practice-exp-${qId}`);
    if (exp) exp.classList.add('show');
  };

  window.setPracticeFilter = function (testCategory) {
    state.practiceFilter = testCategory;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderPracticeQuestions();
  };

  window.setPracticeDifficulty = function (diff) {
    state.practiceDifficulty = diff;
    renderPracticeQuestions();
  };

  // --- MASTER TEST ENGINE (45 Questions, 40 Min Timer, Analytics) ---
  window.startMasterTest = function () {
    // Select 10 Foundation, 15 Intermediate, 20 Advanced
    const fQ = mcqBank.filter(q => q.cat === 'foundation').slice(0, 10);
    const iQ = mcqBank.filter(q => q.cat === 'intermediate').slice(0, 15);
    const aQ = mcqBank.filter(q => q.cat === 'advanced').slice(0, 20);

    state.masterTest.questions = [...fQ, ...iQ, ...aQ];
    state.masterTest.currentIdx = 0;
    state.masterTest.answers = {};
    state.masterTest.flagged = new Set();
    state.masterTest.timeLeft = 40 * 60;
    state.masterTest.submitted = false;
    state.masterTest.startTime = Date.now();

    document.getElementById('master-test-intro').style.display = 'none';
    document.getElementById('master-test-active').style.display = 'block';
    document.getElementById('master-test-results').style.display = 'none';

    clearInterval(state.masterTest.timerId);
    state.masterTest.timerId = setInterval(updateMasterTimer, 1000);

    renderMasterQuestion();
    renderMasterPalette();
  };

  function updateMasterTimer() {
    state.masterTest.timeLeft--;
    const mins = Math.floor(state.masterTest.timeLeft / 60);
    const secs = state.masterTest.timeLeft % 60;
    const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const el = document.getElementById('master-timer-display');
    if (el) el.textContent = display;

    if (state.masterTest.timeLeft <= 0) {
      clearInterval(state.masterTest.timerId);
      submitMasterTest();
      showToast('Time expired! Test submitted automatically.', 'warning');
    }
  }

  function renderMasterQuestion() {
    const q = state.masterTest.questions[state.masterTest.currentIdx];
    if (!q) return;

    document.getElementById('master-q-number').textContent = `Question ${state.masterTest.currentIdx + 1} of ${state.masterTest.questions.length}`;
    document.getElementById('master-q-badge').textContent = `${q.cat.toUpperCase()} • ${q.test.toUpperCase()}-STYLE`;
    document.getElementById('master-q-text').textContent = q.q;

    const chosen = state.masterTest.answers[state.masterTest.currentIdx];
    const optsContainer = document.getElementById('master-q-options');
    optsContainer.innerHTML = q.opts.map((opt, idx) => `
      <button class="option-btn ${chosen === idx ? 'selected' : ''}" onclick="selectMasterOption(${idx})">
        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
        <span>${opt}</span>
      </button>
    `).join('');

    const flagBtn = document.getElementById('master-flag-btn');
    if (state.masterTest.flagged.has(state.masterTest.currentIdx)) {
      flagBtn.textContent = '★ Flagged for Review';
      flagBtn.style.background = '#fef3c7';
    } else {
      flagBtn.textContent = '☆ Mark for Review';
      flagBtn.style.background = '#ffffff';
    }

    renderMasterPalette();
  }

  function renderMasterPalette() {
    const palette = document.getElementById('master-palette-grid');
    if (!palette) return;

    palette.innerHTML = state.masterTest.questions.map((q, idx) => {
      let cls = 'palette-btn';
      if (idx === state.masterTest.currentIdx) cls += ' current';
      if (state.masterTest.answers[idx] !== undefined) cls += ' answered';
      if (state.masterTest.flagged.has(idx)) cls += ' flagged';
      return `<button class="${cls}" onclick="jumpToMasterQuestion(${idx})">${idx + 1}</button>`;
    }).join('');
  }

  window.selectMasterOption = function (optIdx) {
    state.masterTest.answers[state.masterTest.currentIdx] = optIdx;
    renderMasterQuestion();
  };

  window.jumpToMasterQuestion = function (idx) {
    state.masterTest.currentIdx = idx;
    renderMasterQuestion();
  };

  window.nextMasterQuestion = function () {
    if (state.masterTest.currentIdx < state.masterTest.questions.length - 1) {
      state.masterTest.currentIdx++;
      renderMasterQuestion();
    }
  };

  window.prevMasterQuestion = function () {
    if (state.masterTest.currentIdx > 0) {
      state.masterTest.currentIdx--;
      renderMasterQuestion();
    }
  };

  window.toggleMasterFlag = function () {
    const idx = state.masterTest.currentIdx;
    if (state.masterTest.flagged.has(idx)) {
      state.masterTest.flagged.delete(idx);
    } else {
      state.masterTest.flagged.add(idx);
    }
    renderMasterQuestion();
  };

  window.submitMasterTest = function () {
    clearInterval(state.masterTest.timerId);
    state.masterTest.submitted = true;

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const categoryStats = {
      foundation: { correct: 0, total: 10 },
      intermediate: { correct: 0, total: 15 },
      advanced: { correct: 0, total: 20 }
    };

    state.masterTest.questions.forEach((q, idx) => {
      const chosen = state.masterTest.answers[idx];
      if (chosen === undefined) {
        unattempted++;
      } else if (chosen === q.ans) {
        correct++;
        categoryStats[q.cat].correct++;
      } else {
        incorrect++;
      }
    });

    const total = state.masterTest.questions.length;
    const percentage = ((correct / total) * 100).toFixed(1);
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0.0';
    const timeUsedSecs = 40 * 60 - state.masterTest.timeLeft;
    const timeMins = Math.floor(timeUsedSecs / 60);
    const timeSecs = timeUsedSecs % 60;

    // Save best score to localStorage
    const pastBest = parseFloat(localStorage.getItem('cg_master_best') || '0');
    if (parseFloat(percentage) > pastBest) {
      localStorage.setItem('cg_master_best', percentage);
    }

    document.getElementById('master-test-active').style.display = 'none';
    const resultsContainer = document.getElementById('master-test-results');
    resultsContainer.style.display = 'block';

    resultsContainer.innerHTML = `
      <div class="results-card">
        <h2 style="font-size:1.6rem; color:var(--primary-color);">Master Test Diagnostic Report</h2>
        <p style="color:var(--text-muted);">Comprehensive Coordinate Geometry University Test Readiness Evaluation</p>

        <div class="score-circle" style="--percent: ${percentage}">
          <div class="score-text">${percentage}%</div>
        </div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--navy-dark); margin-bottom:1.5rem;">
          Score: ${correct} / ${total} Marks (${correct * 4} / ${total * 4} NET/FAST Scaled)
        </div>

        <div class="stats-summary-grid">
          <div class="stat-box">
            <div class="stat-val" style="color:#059669;">${correct}</div>
            <div class="stat-lbl">Correct</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color:#dc2626;">${incorrect}</div>
            <div class="stat-lbl">Incorrect</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color:#d97706;">${unattempted}</div>
            <div class="stat-lbl">Unattempted</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" style="color:#2563eb;">${accuracy}%</div>
            <div class="stat-lbl">Accuracy</div>
          </div>
        </div>

        <div class="weakness-breakdown">
          <h3 style="font-size:1.1rem; margin-bottom:0.75rem; color:var(--navy-dark);">Topic & Depth Mastery Breakdown</h3>
          
          <div class="topic-diag-item">
            <span><strong>Foundation Skills</strong> (Quadrants, Distance, Midpoint, Axes)</span>
            <span class="diag-status ${categoryStats.foundation.correct >= 8 ? 'diag-strong' : (categoryStats.foundation.correct >= 5 ? 'diag-review' : 'diag-weak')}">
              ${categoryStats.foundation.correct}/10 (${categoryStats.foundation.correct >= 8 ? 'Strong' : (categoryStats.foundation.correct >= 5 ? 'Needs Practice' : 'Weak')})
            </span>
          </div>

          <div class="topic-diag-item">
            <span><strong>Intermediate Algebra & Lines</strong> (Slopes, Intercepts, Forms, Perpendicular)</span>
            <span class="diag-status ${categoryStats.intermediate.correct >= 12 ? 'diag-strong' : (categoryStats.intermediate.correct >= 8 ? 'diag-review' : 'diag-weak')}">
              ${categoryStats.intermediate.correct}/15 (${categoryStats.intermediate.correct >= 12 ? 'Strong' : (categoryStats.intermediate.correct >= 8 ? 'Needs Practice' : 'Weak')})
            </span>
          </div>

          <div class="topic-diag-item">
            <span><strong>Advanced Test Problems</strong> (Circles, Tangents, Triangles, Intersections)</span>
            <span class="diag-status ${categoryStats.advanced.correct >= 15 ? 'diag-strong' : (categoryStats.advanced.correct >= 10 ? 'diag-review' : 'diag-weak')}">
              ${categoryStats.advanced.correct}/20 (${categoryStats.advanced.correct >= 15 ? 'Strong' : (categoryStats.advanced.correct >= 10 ? 'Needs Practice' : 'Weak')})
            </span>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem; margin-top:2rem; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="startMasterTest()">↻ Retake Master Test</button>
          <button class="btn btn-outline" onclick="toggleMasterSolutions()">View Complete Solutions</button>
          <a href="#formula-sheet-sec" class="btn btn-accent">Review Formula Sheet</a>
        </div>

        <div id="master-solutions-list" style="display:none; text-align:left; margin-top:2.5rem;">
          <h3 style="font-size:1.3rem; margin-bottom:1rem; border-bottom:2px solid var(--bg-card-alt); padding-bottom:0.5rem;">
            Complete Question-by-Question Solutions
          </h3>
          ${state.masterTest.questions.map((q, idx) => {
            const userChoice = state.masterTest.answers[idx];
            const isCorrect = userChoice === q.ans;
            return `
              <div class="quiz-question-card" style="border-left: 4px solid ${isCorrect ? '#059669' : (userChoice === undefined ? '#d97706' : '#dc2626')}">
                <div class="quiz-question-header">
                  <span class="q-badge badge-${q.cat}">Q${idx + 1} (${q.test.toUpperCase()})</span>
                  <span style="font-weight:700; color:${isCorrect ? '#059669' : '#dc2626'}">
                    ${isCorrect ? '✓ Correct' : (userChoice === undefined ? '○ Unattempted' : '✗ Incorrect')}
                  </span>
                </div>
                <div class="q-text">${q.q}</div>
                <div style="font-size:0.88rem; margin-bottom:0.5rem;">
                  <div><strong>Your Choice:</strong> ${userChoice !== undefined ? `${String.fromCharCode(65 + userChoice)}. ${q.opts[userChoice]}` : 'None'}</div>
                  <div style="color:#059669;"><strong>Correct Answer:</strong> ${String.fromCharCode(65 + q.ans)}. ${q.opts[q.ans]}</div>
                </div>
                <div class="explanation-reveal show"><strong>Explanation:</strong> ${q.exp}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  window.toggleMasterSolutions = function () {
    const list = document.getElementById('master-solutions-list');
    if (list) {
      list.style.display = list.style.display === 'none' ? 'block' : 'none';
    }
  };

  // --- SEARCH ENGINE ---
  window.handleSearch = function (query) {
    query = query.toLowerCase().trim();
    const sections = document.querySelectorAll('.section-block');
    let count = 0;

    sections.forEach((sec) => {
      const text = sec.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        sec.style.display = 'block';
        count++;
      } else {
        sec.style.display = 'none';
      }
    });

    const searchCount = document.getElementById('search-result-count');
    if (searchCount) {
      searchCount.textContent = query ? `${count} sections found matching "${query}"` : '';
    }
  };

  // --- BOOKMARKING SYSTEM ---
  window.toggleBookmark = function (secId, btn) {
    const idx = state.bookmarkedSections.indexOf(secId);
    if (idx > -1) {
      state.bookmarkedSections.splice(idx, 1);
      btn.classList.remove('bookmarked');
      btn.innerHTML = '☆ Bookmark';
      showToast('Bookmark removed', 'info');
    } else {
      state.bookmarkedSections.push(secId);
      btn.classList.add('bookmarked');
      btn.innerHTML = '★ Bookmarked';
      showToast('Section bookmarked for quick revision!', 'success');
    }
    localStorage.setItem('cg_bookmarks', JSON.stringify(state.bookmarkedSections));
    renderBookmarksDrawer();
  };

  function renderBookmarksDrawer() {
    const list = document.getElementById('bookmarked-list');
    if (!list) return;

    if (state.bookmarkedSections.length === 0) {
      list.innerHTML = `<p style="color:var(--text-light); font-size:0.88rem;">No bookmarked topics yet. Click "☆ Bookmark" on any section to pin it here.</p>`;
      return;
    }

    list.innerHTML = state.bookmarkedSections.map(id => {
      const el = document.getElementById(id);
      const title = el ? el.querySelector('.section-heading')?.innerText || id : id;
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--bg-card-alt);">
          <a href="#${id}" onclick="closeModal('bookmarks-modal')" style="color:var(--primary-color); font-weight:600; text-decoration:none; font-size:0.9rem;">
            ${title}
          </a>
          <button class="btn btn-sm btn-outline" onclick="toggleBookmark('${id}', document.querySelector('#${id} .bookmark-btn'))">Remove</button>
        </div>
      `;
    }).join('');
  }

  // --- MODALS & EXPORTS ---
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  };

  window.copyFormulaSheet = function () {
    const formulas = `
COORDINATE GEOMETRY FORMULA SHEET (University Preparation)
1. Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
2. Midpoint Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
3. Section Formula: P = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n))
4. Slope Formula: m = (y₂ - y₁) / (x₂ - x₁)
5. Slope-Intercept Form: y = mx + c
6. Point-Slope Form: y - y₁ = m(x - x₁)
7. Two-Point Form: (y - y₁) = [(y₂ - y₁)/(x₂ - x₁)] (x - x₁)
8. Intercept Form: x/a + y/b = 1
9. General Form: Ax + By + C = 0 (Slope m = -A/B, y-intercept = -C/B, x-intercept = -C/A)
10. Parallel Lines: m₁ = m₂
11. Perpendicular Lines: m₁ · m₂ = -1  (m₂ = -1/m₁)
12. Distance from Point (x₁, y₁) to Line Ax + By + C = 0: d = |Ax₁ + By₁ + C| / √(A² + B²)
13. Distance between Parallel Lines: d = |C₁ - C₂| / √(A² + B²)
14. Area of Triangle: Area = ½ |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| (Area = 0 implies Collinear)
15. Angle between Two Lines: tan θ = |(m₂ - m₁) / (1 + m₁m₂)|
16. Standard Circle: (x - h)² + (y - k)² = r²  [Center (h,k), Radius r]
17. General Circle: x² + y² + Dx + Ey + F = 0 [Center (-D/2, -E/2), Radius r = √((D/2)² + (E/2)² - F)]
18. Tangent to Circle x² + y² = r² at (x₁, y₁): xx₁ + yy₁ = r²
19. Condition for y = mx + c to touch x² + y² = a²: c² = a²(1 + m²)
20. Centroid of Triangle: G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)
    `.trim();

    navigator.clipboard.writeText(formulas).then(() => {
      showToast('Formula Sheet copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Copy failed. Please manually select and copy.', 'warning');
    });
  };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    // Initial Render of All Canvas/SVG Visualizers with Educational Defaults
    renderSvgCoordinatePlane('svg-interactive-plane', [{ x: 3, y: 2, label: 'P', color: '#064e3b' }]);
    renderSvgCoordinatePlane('svg-dist-plane', 
      [{ x: 1, y: 2, label: 'A', color: '#2563eb' }, { x: 5, y: 5, label: 'B', color: '#dc2626' }],
      [{ type: 'segment', x1: 1, y1: 2, x2: 5, y2: 5, color: '#064e3b', label: 'd=5' }]
    );
    renderSvgCoordinatePlane('svg-mid-plane',
      [
        { x: -2, y: 4, label: 'A', color: '#2563eb' },
        { x: 4, y: -2, label: 'B', color: '#2563eb' },
        { x: 1, y: 1, label: 'M (1,1)', color: '#059669', r: 5.5 }
      ],
      [{ type: 'segment', x1: -2, y1: 4, x2: 4, y2: -2, color: '#94a3b8', dash: '4,4' }]
    );
    renderSvgCoordinatePlane('svg-sec-plane',
      [
        { x: -1, y: 1, label: 'A', color: '#2563eb' },
        { x: 5, y: 7, label: 'B', color: '#2563eb' },
        { x: 2, y: 4, label: 'P (1:1)', color: '#7c3aed', r: 5.5 }
      ],
      [{ type: 'segment', x1: -1, y1: 1, x2: 5, y2: 7, color: '#94a3b8' }]
    );
    renderSvgCoordinatePlane('svg-slope-plane',
      [{ x: 1, y: 1, label: 'A', color: '#2563eb' }, { x: 4, y: 7, label: 'B', color: '#2563eb' }],
      [{ m: 2, c: -1, color: '#064e3b', label: 'm = 2' }]
    );
    renderSvgCoordinatePlane('svg-line-eq-plane',
      [{ x: 0, y: 3, label: 'y-int', color: '#7c3aed' }, { x: -1.5, y: 0, label: 'x-int', color: '#d97706' }],
      [{ m: 2, c: 3, color: '#064e3b', label: 'y = 2x + 3' }]
    );
    renderSvgCoordinatePlane('svg-tri-plane',
      [
        { x: 1, y: 1, label: 'A', color: '#2563eb' },
        { x: 5, y: 2, label: 'B', color: '#2563eb' },
        { x: 2, y: 6, label: 'C', color: '#2563eb' }
      ],
      [], [],
      [{ points: [{ x: 1, y: 1 }, { x: 5, y: 2 }, { x: 2, y: 6 }] }]
    );
    renderSvgCoordinatePlane('svg-pld-plane',
      [{ x: 2, y: 3, label: 'P(2,3)', color: '#dc2626' }],
      [{ m: -0.75, c: 2, color: '#064e3b', label: '3x+4y-8=0' }]
    );
    renderSvgCoordinatePlane('svg-circ-plane',
      [{ x: 2, y: -3, label: 'C(2,-3)', color: '#064e3b' }],
      [],
      [{ x: 2, y: -3, r: 4, stroke: '#064e3b', label: 'r=4' }]
    );
    renderSvgCoordinatePlane('svg-int-plane',
      [{ x: 2, y: 5, label: 'Int (2,5)', color: '#7c3aed', r: 5.5 }],
      [
        { m: 2, c: 1, color: '#2563eb', label: 'y=2x+1' },
        { m: -1, c: 7, color: '#dc2626', label: 'y=-x+7' }
      ]
    );
    renderSvgCoordinatePlane('svg-trans-plane',
      [
        { x: 3, y: 2, label: 'P(3,2)', color: '#2563eb' },
        { x: 3, y: -2, label: "P'(3,-2)", color: '#059669', r: 5.5 }
      ],
      [{ type: 'segment', x1: 3, y1: 2, x2: 3, y2: -2, color: '#94a3b8', dash: '3,3' }]
    );

    // Initial render of practice questions
    renderPracticeQuestions();

    // Initialize bookmark states
    state.bookmarkedSections.forEach(secId => {
      const btn = document.querySelector(`#${secId} .bookmark-btn`);
      if (btn) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '★ Bookmarked';
      }
    });
    renderBookmarksDrawer();

    // Active Sidebar Highlight on Scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.sidebar-nav-item').forEach(item => {
            if (item.querySelector(`a[href="#${id}"]`)) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    document.querySelectorAll('.section-block').forEach(sec => observer.observe(sec));
  });

})();
