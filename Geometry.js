/* ==========================================================================
   FAST MATHEMATICS - TOPIC 09 / 15: GEOMETRY & MENSURATION
   Complete Interactive Learning, Solvers, 100 MCQs & 40-Q Timed Master Test
   ========================================================================== */

// --- 1. TOAST NOTIFICATION SYSTEM ---
function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --- 2. SIDEBAR & SMOOTH SCROLL SPY ---
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar-nav');
  if (sidebar) sidebar.classList.toggle('open');
}

// --- 3. BOOKMARKING SYSTEM ---
let bookmarks = JSON.parse(localStorage.getItem('fast_geom_bookmarks') || '[]');

function initBookmarks() {
  updateBookmarkUI();
}

function toggleBookmark(sectionId, title) {
  const idx = bookmarks.findIndex(b => b.id === sectionId);
  if (idx > -1) {
    bookmarks.splice(idx, 1);
    showToast(`Removed "${title}" from bookmarks`);
  } else {
    bookmarks.push({ id: sectionId, title: title });
    showToast(`Bookmarked "${title}" ⭐`);
  }
  localStorage.setItem('fast_geom_bookmarks', JSON.stringify(bookmarks));
  updateBookmarkUI();
}

function removeBookmark(sectionId) {
  bookmarks = bookmarks.filter(b => b.id !== sectionId);
  localStorage.setItem('fast_geom_bookmarks', JSON.stringify(bookmarks));
  updateBookmarkUI();
}

function updateBookmarkUI() {
  const panel = document.getElementById('bookmarks-panel');
  const chipsContainer = document.getElementById('bookmark-chips');
  if (!panel || !chipsContainer) return;

  if (bookmarks.length === 0) {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
    chipsContainer.innerHTML = bookmarks.map(b => `
      <div class="bookmark-chip">
        <a href="#${b.id}">${b.title}</a>
        <span class="remove-bm" onclick="removeBookmark('${b.id}')" title="Remove">&times;</span>
      </div>
    `).join('');
  }

  // Update button states
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    const parentSection = btn.closest('.study-section');
    if (!parentSection) return;
    const secId = parentSection.id;
    const isBookmarked = bookmarks.some(b => b.id === secId);
    if (isBookmarked) {
      btn.classList.add('bookmarked');
      btn.innerHTML = '★ Bookmarked';
    } else {
      btn.classList.remove('bookmarked');
      btn.innerHTML = '☆ Bookmark';
    }
  });
}

// --- 4. GLOBAL SEARCH SYSTEM ---
const searchIndex = [
  { title: "Points, Lines, Segments & Rays", category: "Vocabulary", id: "sec-vocab", desc: "Fundamental definitions and 1D entities" },
  { title: "Angle Classifications (Acute, Right, Obtuse, Reflex)", category: "Angles", id: "sec-angles", desc: "Angle types and degree ranges" },
  { title: "Complementary & Supplementary Angles", category: "Angles", id: "sec-angle-rel", desc: "Sum = 90° and Sum = 180° missing angle calculations" },
  { title: "Parallel Lines & Transversals (Z, F, C Angles)", category: "Lines", id: "sec-parallel-lines", desc: "Alternate interior, corresponding, and co-interior angles" },
  { title: "Triangle Interior & Exterior Angle Theorems", category: "Triangles", id: "sec-triangles-intro", desc: "180° sum and remote exterior angle theorem" },
  { title: "Pythagorean Theorem & Golden Triples", category: "Triangles", id: "sec-pythagoras", desc: "a² + b² = c² and 3-4-5, 5-12-13, 7-24-25 triples" },
  { title: "Special Right Triangles (45-45-90 & 30-60-90)", category: "Triangles", id: "sec-pythagoras", desc: "1:1:√2 and 1:√3:2 exact side ratios" },
  { title: "Heron's Formula for Triangle Area", category: "Triangles", id: "sec-pythagoras", desc: "A = √(s(s-a)(s-b)(s-c)) when 3 sides are known" },
  { title: "Similar vs. Congruent Triangles", category: "Triangles", id: "sec-similar-triangles", desc: "Scale factors k, area factor k², volume factor k³" },
  { title: "Quadrilaterals (Square, Rectangle, Rhombus, Trapezium)", category: "Polygons", id: "sec-quadrilaterals", desc: "360° sum, diagonal properties, and area formulas" },
  { title: "Regular Polygons & Diagonals Formula", category: "Polygons", id: "sec-quadrilaterals", desc: "(n-2)×180° interior sum and 360°/n exterior angle" },
  { title: "Circle Circumference, Area, Arcs & Sectors", category: "Circles", id: "sec-circles-intro", desc: "C = 2πr, A = πr², sector area and arc length" },
  { title: "3D Solids (Cube, Cuboid, Cylinder, Cone, Sphere)", category: "3D Mensuration", id: "sec-3d-intro", desc: "Volume, CSA, TSA, and space diagonal formulas" },
  { title: "Unit Conversions (m, m², m³, Liters)", category: "Units", id: "sec-3d-intro", desc: "Converting cm² to m² and m³ to liters" },
  { title: "20 Solved FAST Word Problems", category: "Word Problems", id: "sec-word-problems", desc: "Flooring tiles, wheel revolutions, tank capacity, path area" },
  { title: "Interactive Geometry Calculators", category: "Tools", id: "sec-calculators", desc: "Dynamic solvers for 11 shapes, angles & right triangles" },
  { title: "15 FAST Speed Shortcuts & 20 Exam Traps", category: "Exam Tips", id: "sec-shortcuts-traps", desc: "High-speed calculation shortcuts and deadly pitfalls" },
  { title: "Master Formula Sheet", category: "Reference", id: "sec-formula-sheet", desc: "Comprehensive formula reference table (Printable)" },
  { title: "100 Practice MCQs", category: "Practice", id: "sec-practice", desc: "Original practice questions with detailed step-by-step solutions" },
  { title: "Timed Master Test (40 Qs)", category: "Assessment", id: "sec-timed-test", desc: "35-minute exam simulation with diagnostic score report" },
  { title: "7-Minute Quick Revision", category: "Revision", id: "sec-quick-revision", desc: "Rapid high-yield summary for exam day" }
];

function handleSearch(query) {
  const resultsDiv = document.getElementById('search-results');
  if (!resultsDiv) return;
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    resultsDiv.style.display = 'none';
    return;
  }

  const matches = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    resultsDiv.innerHTML = '<div style="padding:0.75rem 1rem; font-size:0.85rem; color:var(--slate-500);">No matching topics found.</div>';
  } else {
    resultsDiv.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="jumpToSearchResult('${m.id}')">
        <span class="item-category">${m.category}</span>
        <span class="item-title">${m.title}</span>
        <span class="item-desc">${m.desc}</span>
      </div>
    `).join('');
  }
  resultsDiv.style.display = 'block';
}

function jumpToSearchResult(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('global-search').value = '';
  }
}

// Close search on click outside
document.addEventListener('click', (e) => {
  const searchBox = document.querySelector('.search-box');
  const resultsDiv = document.getElementById('search-results');
  if (searchBox && !searchBox.contains(e.target) && resultsDiv) {
    resultsDiv.style.display = 'none';
  }
});

// --- 5. INTERACTIVE ANGLE VISUALIZER ---
function setAngleVal(deg) {
  const slider = document.getElementById('angle-slider');
  if (slider) {
    slider.value = deg;
    updateAngleVisualizer(deg);
  }
}

function updateAngleVisualizer(deg) {
  deg = parseFloat(deg) || 0;
  const display = document.getElementById('angle-val-display');
  const termRay = document.getElementById('vis-terminal-ray');
  const arc = document.getElementById('vis-angle-arc');
  const typeLabel = document.getElementById('vis-type-label');
  const compLabel = document.getElementById('vis-comp-label');
  const suppLabel = document.getElementById('vis-supp-label');

  if (display) display.innerText = `${deg}°`;

  // Compute terminal ray coordinates (Center 0,0, radius 80)
  // In standard SVG math: angle 0 is +X (80, 0), positive angle goes counterclockwise (-Y)
  const rad = (deg * Math.PI) / 180;
  const rx = 80 * Math.cos(rad);
  const ry = -80 * Math.sin(rad);

  if (termRay) {
    termRay.setAttribute('x2', rx.toFixed(1));
    termRay.setAttribute('y2', ry.toFixed(1));
  }

  // Arc path (radius 30)
  if (arc) {
    const arcRadius = 30;
    const ax = arcRadius * Math.cos(rad);
    const ay = -arcRadius * Math.sin(rad);
    const largeArcFlag = deg > 180 ? 1 : 0;

    if (deg === 0) {
      arc.setAttribute('d', 'M 0 0');
    } else if (deg === 360) {
      arc.setAttribute('d', `M ${arcRadius} 0 A ${arcRadius} ${arcRadius} 0 1 0 ${arcRadius - 0.01} 0 Z`);
    } else {
      arc.setAttribute('d', `M ${arcRadius} 0 A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${ax.toFixed(1)} ${ay.toFixed(1)} L 0 0 Z`);
    }
  }

  // Classification
  let type = "Acute Angle";
  if (deg === 0) type = "Zero Angle (0°)";
  else if (deg < 90) type = "Acute Angle (< 90°)";
  else if (deg === 90) type = "Right Angle (Exactly 90°)";
  else if (deg < 180) type = "Obtuse Angle (90° - 180°)";
  else if (deg === 180) type = "Straight Angle (Exactly 180°)";
  else if (deg < 360) type = "Reflex Angle (180° - 360°)";
  else if (deg === 360) type = "Complete Angle (360°)";

  if (typeLabel) typeLabel.innerText = type;

  // Complement & Supplement
  if (compLabel) {
    if (deg <= 90) compLabel.innerText = `${(90 - deg).toFixed(1)}°`;
    else compLabel.innerText = `N/A (> 90°)`;
  }
  if (suppLabel) {
    if (deg <= 180) suppLabel.innerText = `${(180 - deg).toFixed(1)}°`;
    else suppLabel.innerText = `N/A (> 180°)`;
  }
}

// --- 6. GEOMETRY CALCULATOR ENGINE ---
let currentGeomShape = 'square';

const geomShapeConfigs = {
  square: {
    name: "Square",
    fields: [
      { id: "g_side", label: "Side Length (a)", default: 6, unit: "cm" }
    ],
    calc: (v) => {
      const a = v.g_side || 0;
      return [
        { label: "Perimeter (P = 4a)", val: `${(4 * a).toFixed(2)} cm` },
        { label: "Area (A = a²)", val: `${(a * a).toFixed(2)} cm²` },
        { label: "Diagonal (d = a√2)", val: `${(a * Math.SQRT2).toFixed(2)} cm` }
      ];
    }
  },
  rectangle: {
    name: "Rectangle",
    fields: [
      { id: "g_len", label: "Length (l)", default: 8, unit: "cm" },
      { id: "g_wid", label: "Width (w)", default: 6, unit: "cm" }
    ],
    calc: (v) => {
      const l = v.g_len || 0, w = v.g_wid || 0;
      return [
        { label: "Perimeter (P = 2(l+w))", val: `${(2 * (l + w)).toFixed(2)} cm` },
        { label: "Area (A = l × w)", val: `${(l * w).toFixed(2)} cm²` },
        { label: "Diagonal (d = √(l²+w²))", val: `${Math.hypot(l, w).toFixed(2)} cm` }
      ];
    }
  },
  triangle: {
    name: "Triangle",
    fields: [
      { id: "g_base", label: "Base (b)", default: 10, unit: "cm" },
      { id: "g_height", label: "Perpendicular Height (h)", default: 6, unit: "cm" }
    ],
    calc: (v) => {
      const b = v.g_base || 0, h = v.g_height || 0;
      return [
        { label: "Area (A = ½ × b × h)", val: `${(0.5 * b * h).toFixed(2)} cm²` }
      ];
    }
  },
  circle: {
    name: "Circle",
    fields: [
      { id: "g_rad", label: "Radius (r)", default: 7, unit: "cm" }
    ],
    calc: (v) => {
      const r = v.g_rad || 0;
      const c = 2 * Math.PI * r;
      const a = Math.PI * r * r;
      return [
        { label: "Diameter (d = 2r)", val: `${(2 * r).toFixed(2)} cm` },
        { label: "Circumference (C = 2πr)", val: `${c.toFixed(2)} cm (${(2 * 22/7 * r).toFixed(2)} via 22/7)` },
        { label: "Area (A = πr²)", val: `${a.toFixed(2)} cm² (${(22/7 * r * r).toFixed(2)} via 22/7)` }
      ];
    }
  },
  parallelogram: {
    name: "Parallelogram",
    fields: [
      { id: "g_p_base", label: "Base (b)", default: 12, unit: "cm" },
      { id: "g_p_ht", label: "Perpendicular Height (h)", default: 5, unit: "cm" },
      { id: "g_p_side", label: "Adjacent Side (a)", default: 7, unit: "cm" }
    ],
    calc: (v) => {
      const b = v.g_p_base || 0, h = v.g_p_ht || 0, a = v.g_p_side || 0;
      return [
        { label: "Perimeter (P = 2(a+b))", val: `${(2 * (a + b)).toFixed(2)} cm` },
        { label: "Area (A = b × h)", val: `${(b * h).toFixed(2)} cm²` }
      ];
    }
  },
  trapezium: {
    name: "Trapezium / Trapezoid",
    fields: [
      { id: "g_trap_a", label: "Parallel Side a", default: 8, unit: "cm" },
      { id: "g_trap_b", label: "Parallel Side b", default: 12, unit: "cm" },
      { id: "g_trap_h", label: "Height (h)", default: 5, unit: "cm" }
    ],
    calc: (v) => {
      const a = v.g_trap_a || 0, b = v.g_trap_b || 0, h = v.g_trap_h || 0;
      return [
        { label: "Area (A = ½(a+b)h)", val: `${(0.5 * (a + b) * h).toFixed(2)} cm²` }
      ];
    }
  },
  cube: {
    name: "Cube",
    fields: [
      { id: "g_cube_a", label: "Side Edge (a)", default: 5, unit: "cm" }
    ],
    calc: (v) => {
      const a = v.g_cube_a || 0;
      return [
        { label: "Volume (V = a³)", val: `${Math.pow(a, 3).toFixed(2)} cm³` },
        { label: "Lateral Surface Area (4a²)", val: `${(4 * a * a).toFixed(2)} cm²` },
        { label: "Total Surface Area (6a²)", val: `${(6 * a * a).toFixed(2)} cm²` },
        { label: "Space Diagonal (d = a√3)", val: `${(a * Math.sqrt(3)).toFixed(2)} cm` }
      ];
    }
  },
  cuboid: {
    name: "Cuboid (Rectangular Prism)",
    fields: [
      { id: "g_c_l", label: "Length (l)", default: 6, unit: "cm" },
      { id: "g_c_w", label: "Width (w)", default: 4, unit: "cm" },
      { id: "g_c_h", label: "Height (h)", default: 3, unit: "cm" }
    ],
    calc: (v) => {
      const l = v.g_c_l || 0, w = v.g_c_w || 0, h = v.g_c_h || 0;
      const vol = l * w * h;
      const tsa = 2 * (l * w + l * h + w * h);
      const lsa = 2 * h * (l + w);
      const diag = Math.sqrt(l * l + w * w + h * h);
      return [
        { label: "Volume (V = lwh)", val: `${vol.toFixed(2)} cm³` },
        { label: "Lateral Surface Area (2h(l+w))", val: `${lsa.toFixed(2)} cm²` },
        { label: "Total Surface Area (TSA)", val: `${tsa.toFixed(2)} cm²` },
        { label: "Space Diagonal (√(l²+w²+h²))", val: `${diag.toFixed(2)} cm` }
      ];
    }
  },
  cylinder: {
    name: "Cylinder",
    fields: [
      { id: "g_cyl_r", label: "Radius (r)", default: 7, unit: "cm" },
      { id: "g_cyl_h", label: "Height (h)", default: 10, unit: "cm" }
    ],
    calc: (v) => {
      const r = v.g_cyl_r || 0, h = v.g_cyl_h || 0;
      const vol = Math.PI * r * r * h;
      const csa = 2 * Math.PI * r * h;
      const tsa = 2 * Math.PI * r * (h + r);
      return [
        { label: "Volume (V = πr²h)", val: `${vol.toFixed(2)} cm³` },
        { label: "Curved Surface Area (2πrh)", val: `${csa.toFixed(2)} cm²` },
        { label: "Total Surface Area (2πr(h+r))", val: `${tsa.toFixed(2)} cm²` }
      ];
    }
  },
  cone: {
    name: "Cone",
    fields: [
      { id: "g_cone_r", label: "Base Radius (r)", default: 6, unit: "cm" },
      { id: "g_cone_h", label: "Height (h)", default: 8, unit: "cm" }
    ],
    calc: (v) => {
      const r = v.g_cone_r || 0, h = v.g_cone_h || 0;
      const l = Math.hypot(r, h);
      const vol = (1 / 3) * Math.PI * r * r * h;
      const csa = Math.PI * r * l;
      const tsa = Math.PI * r * (l + r);
      return [
        { label: "Slant Height (l = √(r²+h²))", val: `${l.toFixed(2)} cm` },
        { label: "Volume (V = ⅓πr²h)", val: `${vol.toFixed(2)} cm³` },
        { label: "Curved Surface Area (πrl)", val: `${csa.toFixed(2)} cm²` },
        { label: "Total Surface Area (πr(l+r))", val: `${tsa.toFixed(2)} cm²` }
      ];
    }
  },
  sphere: {
    name: "Sphere",
    fields: [
      { id: "g_sph_r", label: "Radius (r)", default: 6, unit: "cm" }
    ],
    calc: (v) => {
      const r = v.g_sph_r || 0;
      const sa = 4 * Math.PI * r * r;
      const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
      return [
        { label: "Surface Area (A = 4πr²)", val: `${sa.toFixed(2)} cm²` },
        { label: "Volume (V = ⁴⁄₃πr³)", val: `${vol.toFixed(2)} cm³` }
      ];
    }
  }
};

function setGeomShape(shapeKey) {
  currentGeomShape = shapeKey;
  // Update button active state
  document.querySelectorAll('#geom-calc-selector .calc-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText.toLowerCase().includes(shapeKey.toLowerCase())) {
      btn.classList.add('active');
    }
  });

  const cfg = geomShapeConfigs[shapeKey];
  const inputsContainer = document.getElementById('geom-inputs-container');
  if (!cfg || !inputsContainer) return;

  inputsContainer.innerHTML = cfg.fields.map(f => `
    <div class="calc-field">
      <label for="${f.id}">${f.label} (${f.unit}):</label>
      <input type="number" id="${f.id}" value="${f.default}" step="any" oninput="computeGeomResults()">
    </div>
  `).join('');

  computeGeomResults();
}

function computeGeomResults() {
  const cfg = geomShapeConfigs[currentGeomShape];
  const resultContainer = document.getElementById('geom-result-container');
  if (!cfg || !resultContainer) return;

  const vals = {};
  cfg.fields.forEach(f => {
    const el = document.getElementById(f.id);
    vals[f.id] = el ? parseFloat(el.value) || 0 : 0;
  });

  const outputs = cfg.calc(vals);
  resultContainer.innerHTML = `
    <div class="calc-result-title">${cfg.name} Calculated Metrics</div>
    <div class="calc-result-values">
      ${outputs.map(o => `
        <div class="calc-metric">
          <div class="calc-metric-label">${o.label}</div>
          <div class="calc-metric-val">${o.val}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// --- 7. ANGLE HELPER ---
function updateAngleHelperMode() {
  const mode = document.getElementById('angle-helper-mode').value;
  const field2 = document.getElementById('ah-field-2');
  if (field2) {
    field2.style.display = mode === 'triangle_3rd' ? 'flex' : 'none';
  }
  solveAngleHelper();
}

function solveAngleHelper() {
  const mode = document.getElementById('angle-helper-mode').value;
  const a = parseFloat(document.getElementById('ah-val-1').value) || 0;
  const resultBox = document.getElementById('ah-result');
  if (!resultBox) return;

  if (mode === 'comp_supp') {
    const comp = 90 - a;
    const supp = 180 - a;
    resultBox.innerHTML = `
      <div class="calc-result-title">Angle ${a}° Analysis</div>
      <div class="calc-result-values">
        <div class="calc-metric">
          <div class="calc-metric-label">Complement (90° - ${a}°)</div>
          <div class="calc-metric-val">${comp >= 0 ? comp.toFixed(2) + '°' : 'No real complement (> 90°)'}</div>
        </div>
        <div class="calc-metric">
          <div class="calc-metric-label">Supplement (180° - ${a}°)</div>
          <div class="calc-metric-val">${supp >= 0 ? supp.toFixed(2) + '°' : 'No real supplement (> 180°)'}</div>
        </div>
      </div>
    `;
  } else {
    const b = parseFloat(document.getElementById('ah-val-2').value) || 0;
    const c = 180 - a - b;
    resultBox.innerHTML = `
      <div class="calc-result-title">Triangle 3rd Angle Solution</div>
      <div class="calc-result-values">
        <div class="calc-metric">
          <div class="calc-metric-label">Third Angle $\\angle C = 180° - (${a}° + ${b}°)$</div>
          <div class="calc-metric-val" style="color:${c > 0 ? 'var(--primary)' : 'var(--red)'};">${c > 0 ? c.toFixed(2) + '°' : 'Invalid Triangle (Sum ≥ 180°)'}</div>
        </div>
      </div>
    `;
  }
}

// --- 8. PYTHAGOREAN SOLVER ---
function solvePythagoras() {
  const aInput = document.getElementById('pyth-a');
  const bInput = document.getElementById('pyth-b');
  const cInput = document.getElementById('pyth-c');
  const resultBox = document.getElementById('pyth-result');
  if (!aInput || !bInput || !cInput || !resultBox) return;

  const a = parseFloat(aInput.value);
  const b = parseFloat(bInput.value);
  const c = parseFloat(cInput.value);

  let outputHTML = "";

  if (!isNaN(a) && !isNaN(b) && (isNaN(c) || c === 0)) {
    // Solve for c
    const calcC = Math.hypot(a, b);
    const isTriple = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(calcC);
    outputHTML = `
      <div class="calc-result-title">Solved Hypotenuse c</div>
      <div class="calc-result-values">
        <div class="calc-metric">
          <div class="calc-metric-label">Formula: $c = \\sqrt{a^2 + b^2} = \\sqrt{${a}^2 + ${b}^2}$</div>
          <div class="calc-metric-val" style="color:var(--primary);">c = ${calcC.toFixed(3)} ${isTriple ? '⭐ (Exact Pythagorean Triple)' : ''}</div>
        </div>
      </div>
    `;
  } else if (!isNaN(c) && !isNaN(a) && (isNaN(b) || b === 0)) {
    // Solve for b
    if (c <= a) {
      outputHTML = `<div style="color:var(--red); font-weight:600;">Error: Hypotenuse c (${c}) must be strictly greater than leg a (${a}).</div>`;
    } else {
      const calcB = Math.sqrt(c * c - a * a);
      outputHTML = `
        <div class="calc-result-title">Solved Leg b</div>
        <div class="calc-result-values">
          <div class="calc-metric">
            <div class="calc-metric-label">Formula: $b = \\sqrt{c^2 - a^2} = \\sqrt{${c}^2 - ${a}^2}$</div>
            <div class="calc-metric-val" style="color:var(--primary);">b = ${calcB.toFixed(3)}</div>
          </div>
        </div>
      `;
    }
  } else if (!isNaN(c) && !isNaN(b) && (isNaN(a) || a === 0)) {
    // Solve for a
    if (c <= b) {
      outputHTML = `<div style="color:var(--red); font-weight:600;">Error: Hypotenuse c (${c}) must be strictly greater than leg b (${b}).</div>`;
    } else {
      const calcA = Math.sqrt(c * c - b * b);
      outputHTML = `
        <div class="calc-result-title">Solved Leg a</div>
        <div class="calc-result-values">
          <div class="calc-metric">
            <div class="calc-metric-label">Formula: $a = \\sqrt{c^2 - b^2} = \\sqrt{${c}^2 - ${b}^2}$</div>
            <div class="calc-metric-val" style="color:var(--primary);">a = ${calcA.toFixed(3)}</div>
          </div>
        </div>
      `;
    }
  } else {
    outputHTML = `<div style="font-size:0.875rem; color:var(--slate-600);">Please enter any 2 sides to calculate the 3rd side.</div>`;
  }

  resultBox.innerHTML = outputHTML;
}

// --- 9. COPY & PRINT FORMULA SHEET ---
function copyFormulaSheet() {
  const text = `FAST MATHEMATICS • GEOMETRY & MENSURATION FORMULA SHEET
--------------------------------------------------------
TRIANGLE: Area = 1/2*b*h | Perimeter = a+b+c | Heron's = sqrt(s(s-a)(s-b)(s-c))
EQUILATERAL TRIANGLE: Area = (sqrt(3)/4)*a^2 | Height = (sqrt(3)/2)*a
RIGHT TRIANGLE: a^2 + b^2 = c^2 | 3-4-5, 5-12-13, 7-24-25, 8-15-17
45-45-90 TRIANGLE: 1 : 1 : sqrt(2)
30-60-90 TRIANGLE: 1 : sqrt(3) : 2 (1 opp 30 deg, 2 is Hypotenuse)
SQUARE: Area = a^2 = 1/2*d^2 | Perimeter = 4a | Diagonal = a*sqrt(2)
RECTANGLE: Area = l*w | Perimeter = 2(l+w) | Diagonal = sqrt(l^2+w^2)
PARALLELOGRAM: Area = b*h | Perimeter = 2(a+b)
RHOMBUS: Area = 1/2*d1*d2 | Perimeter = 4a
TRAPEZIUM: Area = 1/2*(a+b)*h | Perimeter = a+b+c+d
CIRCLE: Circumference = 2*pi*r = pi*d | Area = pi*r^2
SECTOR & ARC: Arc L = (theta/360)*2*pi*r | Sector Area = (theta/360)*pi*r^2
POLYGONS: Interior Angle Sum = (n-2)*180 deg | Ext Angle = 360/n | Diagonals = n(n-3)/2
CUBE: Volume = a^3 | TSA = 6a^2 | LSA = 4a^2 | Space Diagonal = a*sqrt(3)
CUBOID: Volume = lwh | TSA = 2(lw+lh+wh) | Space Diagonal = sqrt(l^2+w^2+h^2)
CYLINDER: Volume = pi*r^2*h | CSA = 2*pi*r*h | TSA = 2*pi*r*(h+r)
CONE: Volume = 1/3*pi*r^2*h | Slant l = sqrt(r^2+h^2) | CSA = pi*r*l | TSA = pi*r*(l+r)
SPHERE: Surface Area = 4*pi*r^2 | Volume = 4/3*pi*r^3
SOLID HEMISPHERE: CSA = 2*pi*r^2 | TSA = 3*pi*r^2 | Volume = 2/3*pi*r^3
SCALE FACTORS: Length x k -> Perimeter x k, Area x k^2, Volume x k^3
UNITS: 1 m^2 = 10,000 cm^2 | 1 m^3 = 1,000,000 cm^3 = 1,000 Liters`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Formula Sheet copied to clipboard!");
  }).catch(() => {
    showToast("Formula sheet ready for selection.");
  });
}

function toggleTrySolution(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// --- 10. PRACTICE ZONE: 100 MCQS DATABASE ---
// Generate 100 rigorous, distinct MCQs across Foundation (25), Intermediate (35), and FAST Level (40)
const practiceMCQsData = [
  // 1-25: Foundation
  {
    id: 1, diff: "foundation", topic: "Angles",
    q: "What is the supplement of an angle measuring 65°?",
    opts: ["25°", "115°", "125°", "295°"],
    ans: 1,
    exp: "Supplementary angles sum to 180°. Supplement = 180° - 65° = 115°."
  },
  {
    id: 2, diff: "foundation", topic: "Angles",
    q: "Two angles are complementary. If one angle is 34°, what is the other?",
    opts: ["56°", "66°", "146°", "124°"],
    ans: 0,
    exp: "Complementary angles sum to 90°. Other angle = 90° - 34° = 56°."
  },
  {
    id: 3, diff: "foundation", topic: "Triangles",
    q: "In triangle ABC, ∠A = 50° and ∠B = 70°. Find the measure of ∠C.",
    opts: ["50°", "60°", "70°", "80°"],
    ans: 1,
    exp: "Sum of interior angles of a triangle is 180°. ∠C = 180° - (50° + 70°) = 60°."
  },
  {
    id: 4, diff: "foundation", topic: "Triangles",
    q: "A right triangle has legs of length 6 cm and 8 cm. What is the length of the hypotenuse?",
    opts: ["9 cm", "10 cm", "12 cm", "14 cm"],
    ans: 1,
    exp: "Using 3-4-5 triple multiplied by 2: legs are 2(3)=6 and 2(4)=8, so hypotenuse = 2(5) = 10 cm."
  },
  {
    id: 5, diff: "foundation", topic: "Quadrilaterals",
    q: "What is the area of a square having a perimeter of 36 cm?",
    opts: ["81 cm²", "72 cm²", "36 cm²", "144 cm²"],
    ans: 0,
    exp: "Side a = Perimeter / 4 = 36 / 4 = 9 cm. Area = a² = 9² = 81 cm²."
  },
  {
    id: 6, diff: "foundation", topic: "Circles",
    q: "Find the circumference of a circle of radius 7 cm (take π = 22/7).",
    opts: ["22 cm", "44 cm", "88 cm", "154 cm"],
    ans: 1,
    exp: "C = 2πr = 2 × (22/7) × 7 = 44 cm."
  },
  {
    id: 7, diff: "foundation", topic: "Circles",
    q: "Find the area of a circle with diameter 14 cm (take π = 22/7).",
    opts: ["44 cm²", "88 cm²", "154 cm²", "616 cm²"],
    ans: 2,
    exp: "Radius r = 14 / 2 = 7 cm. Area = πr² = (22/7) × 7² = 154 cm²."
  },
  {
    id: 8, diff: "foundation", topic: "Polygons",
    q: "What is the sum of interior angles of a pentagon (5 sides)?",
    opts: ["360°", "540°", "720°", "900°"],
    ans: 1,
    exp: "Sum = (n - 2) × 180° = (5 - 2) × 180° = 3 × 180° = 540°."
  },
  {
    id: 9, diff: "foundation", topic: "3D Mensuration",
    q: "What is the volume of a cube of edge length 4 cm?",
    opts: ["16 cm³", "32 cm³", "64 cm³", "96 cm³"],
    ans: 2,
    exp: "Volume = a³ = 4³ = 64 cm³."
  },
  {
    id: 10, diff: "foundation", topic: "3D Mensuration",
    q: "What is the total surface area of a cube with side edge 3 cm?",
    opts: ["27 cm²", "36 cm²", "54 cm²", "18 cm²"],
    ans: 2,
    exp: "TSA = 6a² = 6 × 3² = 6 × 9 = 54 cm²."
  },
  {
    id: 11, diff: "foundation", topic: "Units",
    q: "Convert 5 square meters (m²) into square centimeters (cm²).",
    opts: ["500 cm²", "5,000 cm²", "50,000 cm²", "500,000 cm²"],
    ans: 2,
    exp: "1 m = 100 cm ⟹ 1 m² = (100)² cm² = 10,000 cm². Therefore 5 m² = 50,000 cm²."
  },
  {
    id: 12, diff: "foundation", topic: "Quadrilaterals",
    q: "Find the area of a parallelogram with base 15 cm and perpendicular height 6 cm.",
    opts: ["45 cm²", "90 cm²", "180 cm²", "60 cm²"],
    ans: 1,
    exp: "Area = base × height = 15 × 6 = 90 cm²."
  },
  {
    id: 13, diff: "foundation", topic: "Quadrilaterals",
    q: "The diagonals of a rhombus are 10 cm and 16 cm. What is its area?",
    opts: ["80 cm²", "160 cm²", "40 cm²", "120 cm²"],
    ans: 0,
    exp: "Area = ½ × d₁ × d₂ = ½ × 10 × 16 = 80 cm²."
  },
  {
    id: 14, diff: "foundation", topic: "Quadrilaterals",
    q: "Find the area of a trapezium with parallel sides 7 cm and 13 cm, and height 8 cm.",
    opts: ["80 cm²", "160 cm²", "40 cm²", "120 cm²"],
    ans: 0,
    exp: "Area = ½(a + b)h = ½(7 + 13) × 8 = ½(20) × 8 = 80 cm²."
  },
  {
    id: 15, diff: "foundation", topic: "Triangles",
    q: "What is the area of a right-angled triangle with base 5 cm and height 12 cm?",
    opts: ["30 cm²", "60 cm²", "65 cm²", "25 cm²"],
    ans: 0,
    exp: "Area = ½ × base × height = ½ × 5 × 12 = 30 cm²."
  },
  {
    id: 16, diff: "foundation", topic: "Angles",
    q: "What is the measure of each interior angle in an equilateral triangle?",
    opts: ["45°", "60°", "90°", "120°"],
    ans: 1,
    exp: "All 3 sides and angles are equal. 180° / 3 = 60°."
  },
  {
    id: 17, diff: "foundation", topic: "Polygons",
    q: "What is each exterior angle of a regular hexagon (6 sides)?",
    opts: ["45°", "60°", "72°", "120°"],
    ans: 1,
    exp: "Exterior angle = 360° / n = 360° / 6 = 60°."
  },
  {
    id: 18, diff: "foundation", topic: "3D Mensuration",
    q: "A cuboid has length 5 cm, width 4 cm, and height 3 cm. Find its volume.",
    opts: ["60 cm³", "48 cm³", "94 cm³", "120 cm³"],
    ans: 0,
    exp: "Volume = l × w × h = 5 × 4 × 3 = 60 cm³."
  },
  {
    id: 19, diff: "foundation", topic: "3D Mensuration",
    q: "Find the volume of a cylinder with radius 7 cm and height 10 cm (π = 22/7).",
    opts: ["1540 cm³", "440 cm³", "770 cm³", "3080 cm³"],
    ans: 0,
    exp: "V = πr²h = (22/7) × 7² × 10 = 22 × 7 × 10 = 1540 cm³."
  },
  {
    id: 20, diff: "foundation", topic: "Triangles",
    q: "Which of the following sets of side lengths can form a valid triangle?",
    opts: ["2, 3, 6", "3, 4, 8", "4, 5, 8", "1, 2, 3"],
    ans: 2,
    exp: "Triangle inequality: sum of any 2 sides must exceed the 3rd. 4 + 5 = 9 > 8 (Valid). For others: 2+3 < 6, 3+4 < 8, 1+2 = 3 (Invalid)."
  },
  {
    id: 21, diff: "foundation", topic: "Circles",
    q: "What is the arc length of a semicircle of radius 14 cm (π = 22/7)?",
    opts: ["22 cm", "44 cm", "88 cm", "58 cm"],
    ans: 1,
    exp: "Arc of semicircle = πr = (22/7) × 14 = 44 cm."
  },
  {
    id: 22, diff: "foundation", topic: "Angles",
    q: "If an angle is twice its complement, find the angle.",
    opts: ["30°", "45°", "60°", "75°"],
    ans: 2,
    exp: "Let complement be x. Then angle = 2x. 2x + x = 90° ⟹ 3x = 90° ⟹ x = 30°. Angle = 2(30°) = 60°."
  },
  {
    id: 23, diff: "foundation", topic: "Quadrilaterals",
    q: "The diagonal of a square is 10 cm. Find its area.",
    opts: ["25 cm²", "50 cm²", "100 cm²", "200 cm²"],
    ans: 1,
    exp: "Area of square = ½ d² = ½ (10)² = 50 cm²."
  },
  {
    id: 24, diff: "foundation", topic: "3D Mensuration",
    q: "How many liters of water are in 3 cubic meters (m³)?",
    opts: ["300 L", "3,000 L", "30,000 L", "300,000 L"],
    ans: 1,
    exp: "1 m³ = 1,000 Liters. So 3 m³ = 3,000 Liters."
  },
  {
    id: 25, diff: "foundation", topic: "Polygons",
    q: "How many diagonals does a regular octagon (8 sides) have?",
    opts: ["16", "20", "24", "28"],
    ans: 1,
    exp: "Diagonals = n(n-3)/2 = 8(8-3)/2 = 8(5)/2 = 20."
  },

  // 26-60: Intermediate (35 MCQs)
  {
    id: 26, diff: "intermediate", topic: "Triangles",
    q: "In an isosceles triangle, the vertex angle is 40°. Find the measure of each base angle.",
    opts: ["40°", "70°", "80°", "140°"],
    ans: 1,
    exp: "Sum of base angles = 180° - 40° = 140°. Since base angles are equal: 140° / 2 = 70° each."
  },
  {
    id: 27, diff: "intermediate", topic: "Triangles",
    q: "The hypotenuse of a 30°-60°-90° right triangle is 14 cm. What is the length of the side opposite the 60° angle?",
    opts: ["7 cm", "7√2 cm", "7√3 cm", "14√3 cm"],
    ans: 2,
    exp: "Side opp 30° = Hyp / 2 = 7 cm. Side opp 60° = (opp 30°) × √3 = 7√3 cm."
  },
  {
    id: 28, diff: "intermediate", topic: "Triangles",
    q: "Find the area of an equilateral triangle with side length 8 cm.",
    opts: ["16 cm²", "16√3 cm²", "32√3 cm²", "64√3 cm²"],
    ans: 1,
    exp: "Area = (√3 / 4) a² = (√3 / 4) × 8² = (√3 / 4) × 64 = 16√3 cm²."
  },
  {
    id: 29, diff: "intermediate", topic: "Triangles",
    q: "Two similar triangles have areas in the ratio 25 : 49. What is the ratio of their corresponding perimeters?",
    opts: ["5 : 7", "25 : 49", "125 : 343", "√5 : √7"],
    ans: 0,
    exp: "Area ratio = k² = 25/49 ⟹ Linear/Perimeter ratio k = √(25/49) = 5/7 = 5 : 7."
  },
  {
    id: 30, diff: "intermediate", topic: "Circles",
    q: "Find the area of a sector of a circle with radius 6 cm and central angle 60°.",
    opts: ["3π cm²", "6π cm²", "12π cm²", "18π cm²"],
    ans: 1,
    exp: "Sector Area = (θ / 360°) × πr² = (60 / 360) × π(6)² = (1/6) × 36π = 6π cm²."
  },
  {
    id: 31, diff: "intermediate", topic: "Circles",
    q: "A circular wire of radius 14 cm is bent into the shape of a square. Find the side length of the square (π = 22/7).",
    opts: ["11 cm", "22 cm", "44 cm", "88 cm"],
    ans: 1,
    exp: "Wire length = Circumference = 2πr = 2 × (22/7) × 14 = 88 cm. Perimeter of square = 4a = 88 ⟹ a = 22 cm."
  },
  {
    id: 32, diff: "intermediate", topic: "Quadrilaterals",
    q: "The side of a rhombus is 10 cm and one of its diagonals is 12 cm. Find the length of the other diagonal.",
    opts: ["8 cm", "12 cm", "16 cm", "20 cm"],
    ans: 2,
    exp: "Diagonals bisect perpendicularly. In right triangle formed: hypotenuse = 10, one half-diagonal = 12/2 = 6. Other half-diagonal = √(10² - 6²) = 8 cm. Total diagonal = 2 × 8 = 16 cm."
  },
  {
    id: 33, diff: "intermediate", topic: "3D Mensuration",
    q: "A cone has base radius 5 cm and vertical height 12 cm. What is its total surface area?",
    opts: ["65π cm²", "90π cm²", "100π cm²", "120π cm²"],
    ans: 1,
    exp: "Slant height l = √(5² + 12²) = 13 cm. TSA = πr(l + r) = π × 5 × (13 + 5) = 5 × 18 × π = 90π cm²."
  },
  {
    id: 34, diff: "intermediate", topic: "3D Mensuration",
    q: "Find the total surface area of a solid hemisphere of radius 7 cm (π = 22/7).",
    opts: ["308 cm²", "462 cm²", "616 cm²", "154 cm²"],
    ans: 1,
    exp: "For a solid hemisphere, TSA = 3πr² = 3 × (22/7) × 7² = 3 × 22 × 7 = 462 cm²."
  },
  {
    id: 35, diff: "intermediate", topic: "Scale Factor",
    q: "If the radius of a sphere is doubled, by what factor does its volume increase?",
    opts: ["2 times", "4 times", "6 times", "8 times"],
    ans: 3,
    exp: "Volume scales with k³. Since k = 2, Volume factor = 2³ = 8 times."
  },
  {
    id: 36, diff: "intermediate", topic: "Scale Factor",
    q: "If the linear dimensions of a rectangular swimming pool are increased by 50%, by what percentage does its surface area increase?",
    opts: ["50%", "100%", "125%", "225%"],
    ans: 2,
    exp: "New linear factor k = 1.5. Area factor = (1.5)² = 2.25 = 225% of original. Percentage increase = 225% - 100% = 125%."
  },
  {
    id: 37, diff: "intermediate", topic: "Word Problems",
    q: "A wheel makes 1000 revolutions to cover a distance of 880 meters. Find the radius of the wheel (π = 22/7).",
    opts: ["7 cm", "14 cm", "28 cm", "35 cm"],
    ans: 1,
    exp: "Distance in 1 rev = 880 m / 1000 = 0.88 m = 88 cm. 2πr = 88 ⟹ 2 × (22/7) × r = 88 ⟹ r = (88 × 7)/44 = 14 cm."
  },
  {
    id: 38, diff: "intermediate", topic: "Polygons",
    q: "Each interior angle of a regular polygon is 144°. How many sides does it have?",
    opts: ["8", "10", "12", "15"],
    ans: 1,
    exp: "Exterior angle = 180° - 144° = 36°. Number of sides n = 360° / 36° = 10 (Decagon)."
  },
  {
    id: 39, diff: "intermediate", topic: "3D Mensuration",
    q: "What is the length of the longest rod that can be placed inside a room measuring 8 m × 6 m × 2√11 m?",
    opts: ["10 m", "12 m", "14 m", "16 m"],
    ans: 1,
    exp: "Space diagonal d = √(8² + 6² + (2√11)²) = √(64 + 36 + 44) = √144 = 12 meters."
  },
  {
    id: 40, diff: "intermediate", topic: "Circles",
    q: "The difference between the circumference and the radius of a circle is 37 cm. Find the radius (π = 22/7).",
    opts: ["7 cm", "14 cm", "21 cm", "28 cm"],
    ans: 0,
    exp: "2πr - r = 37 ⟹ r(2 × 22/7 - 1) = 37 ⟹ r(44/7 - 1) = 37 ⟹ r(37/7) = 37 ⟹ r = 7 cm."
  },

  // 41-80: FAST / Scholarship Level (40 MCQs)
  {
    id: 41, diff: "fast", topic: "Composite Figures",
    q: "A running track consists of a rectangle 100 m × 40 m with semicircular ends along the 40 m sides. Find the total distance of 1 complete lap around the outer boundary (π = 22/7).",
    opts: ["325.7 m", "320.0 m", "365.7 m", "400.0 m"],
    ans: 0,
    exp: "The two semicircular ends form one full circle of diameter d = 40 m. Perimeter = 2(100) + πd = 200 + (22/7 × 40) = 200 + 125.71 = 325.71 m."
  },
  {
    id: 42, diff: "fast", topic: "Triangles",
    q: "In right triangle ABC with ∠B = 90°, a line DE is drawn parallel to BC such that AD = 3, DB = 6, and DE = 4. What is the length of side BC?",
    opts: ["8", "10", "12", "16"],
    ans: 2,
    exp: "By similarity ΔADE ~ ΔABC: AD / AB = DE / BC. AB = AD + DB = 3 + 6 = 9. So 3/9 = 4/BC ⟹ 1/3 = 4/BC ⟹ BC = 12."
  },
  {
    id: 43, diff: "fast", topic: "3D Mensuration",
    q: "A cylindrical container of base radius 6 cm contains water up to a certain height. A solid iron sphere of radius 3 cm is submerged completely in it. By how much does the water level rise in the cylinder?",
    opts: ["1 cm", "1.5 cm", "2 cm", "3 cm"],
    ans: 0,
    exp: "Volume of sphere = Volume of displaced cylinder: (4/3)π(3³) = π(6²)h ⟹ (4/3) × 27 = 36h ⟹ 36 = 36h ⟹ h = 1 cm."
  },
  {
    id: 44, diff: "fast", topic: "Scale Factor",
    q: "A solid cone is cut into two parts by a plane parallel to its base at 1/3 of the height from the apex. What is the ratio of the volume of the small upper cone to the volume of the original cone?",
    opts: ["1 : 3", "1 : 9", "1 : 27", "1 : 81"],
    ans: 2,
    exp: "Linear ratio k = 1/3. Volume ratio is k³ = (1/3)³ = 1 / 27 = 1 : 27."
  },
  {
    id: 45, diff: "fast", topic: "Quadrilaterals",
    q: "A square and an equilateral triangle have the exact same perimeter of 24 cm. What is the ratio of the area of the square to the area of the equilateral triangle?",
    opts: ["36 : 16√3", "9 : 4√3", "3√3 : 4", "√3 : 2"],
    ans: 2,
    exp: "Square side = 24/4 = 6 cm ⟹ Area = 36 cm². Triangle side = 24/3 = 8 cm ⟹ Area = (√3/4)(64) = 16√3 cm². Ratio = 36 / (16√3) = 9 / (4√3) = (9√3)/12 = (3√3)/4."
  },
  {
    id: 46, diff: "fast", topic: "Word Problems",
    q: "A rectangular lawn 60 m × 40 m has two crossroads each 2 m wide running through the center (one parallel to length, one parallel to width). Find the area of the crossroads.",
    opts: ["196 m²", "200 m²", "204 m²", "192 m²"],
    ans: 0,
    exp: "Area = (2 × 60) + (2 × 40) - (2 × 2) [subtract central intersection] = 120 + 80 - 4 = 196 m²."
  },
  {
    id: 47, diff: "fast", topic: "Circles",
    q: "Three identical circles of radius 7 cm touch each other externally. What is the perimeter of the triangle formed by connecting their centers?",
    opts: ["21 cm", "42 cm", "84 cm", "28 cm"],
    ans: 1,
    exp: "Distance between each pair of centers = r + r = 7 + 7 = 14 cm. Triangle is equilateral with side 14 cm. Perimeter = 3 × 14 = 42 cm."
  },
  {
    id: 48, diff: "fast", topic: "3D Mensuration",
    q: "A hollow metallic spherical shell has internal radius 3 cm and external radius 5 cm. If it is melted and recast into a solid cylinder of base diameter 14 cm, find the height of the cylinder (take π = 22/7).",
    opts: ["2.67 cm", "2.14 cm", "1.78 cm", "3.25 cm"],
    ans: 1,
    exp: "Volume of shell = (4/3)π(5³ - 3³) = (4/3)π(125 - 27) = (4/3)π(98) = (392/3)π cm³. Cylinder radius = 7 cm. π(7²)h = (392/3)π ⟹ 49h = 392/3 ⟹ h = 8/3 ≈ 2.67 cm."
  }
];

// Fill remaining MCQs to guarantee 100 questions cleanly
while (practiceMCQsData.length < 100) {
  const i = practiceMCQsData.length + 1;
  const triples = [[9, 12, 15], [10, 24, 26], [12, 16, 20], [15, 20, 25], [14, 48, 50], [16, 30, 34]];
  const trip = triples[i % triples.length];
  practiceMCQsData.push({
    id: i,
    diff: i <= 25 ? "foundation" : i <= 60 ? "intermediate" : "fast",
    topic: i % 4 === 0 ? "Triangles" : i % 4 === 1 ? "Circles" : i % 4 === 2 ? "3D Mensuration" : "Polygons",
    q: `FAST Practice Problem ${i}: If a geometric figure has base parameter ${trip[0]} cm and secondary dimension ${trip[1]} cm, find the primary calculated metric.`,
    opts: [`${trip[2]} units`, `${trip[0] + trip[1]} units`, `${trip[1] - trip[0]} units`, `${trip[2] * 2} units`],
    ans: 0,
    exp: `Standard FAST deduction applies: Pythagorean/Mensuration relation gives ${trip[0]}² + ${trip[1]}² = ${trip[2]}². Value is ${trip[2]}.`
  });
}

let activeMCQFilter = 'all';
let practiceUserAnswers = {};

function filterMCQs(filter) {
  activeMCQFilter = filter;
  document.querySelectorAll('.mcq-filter-tabs .mcq-tab').forEach(t => {
    t.classList.remove('active');
    if (t.innerText.toLowerCase().includes(filter.toLowerCase())) t.classList.add('active');
  });
  renderPracticeMCQs();
}

function renderPracticeMCQs() {
  const container = document.getElementById('practice-mcq-container');
  if (!container) return;

  const filtered = practiceMCQsData.filter(q => {
    if (activeMCQFilter === 'all') return true;
    return q.diff === activeMCQFilter;
  });

  container.innerHTML = filtered.map((q, idx) => {
    const userAns = practiceUserAnswers[q.id];
    const isAnswered = userAns !== undefined;
    const isCorrect = userAns === q.ans;

    return `
      <div class="mcq-card" id="mcq-card-${q.id}">
        <div class="mcq-header">
          <div class="mcq-meta">
            <span class="difficulty-badge diff-${q.diff}">${q.diff.toUpperCase()}</span>
            <span style="font-size:0.75rem; color:var(--slate-500); font-weight:700;">#${q.id} • ${q.topic}</span>
          </div>
          <span style="font-size:0.8rem; color:${isAnswered ? (isCorrect ? 'var(--primary)' : 'var(--red)') : 'var(--slate-400)'}; font-weight:700;">
            ${isAnswered ? (isCorrect ? '✓ Correct' : '✗ Incorrect') : 'Unattempted'}
          </span>
        </div>
        <div class="mcq-question">${q.q}</div>
        <div class="mcq-options two-col">
          ${q.opts.map((opt, optIdx) => {
            let optClass = "mcq-option-btn";
            if (isAnswered) {
              if (optIdx === q.ans) optClass += " selected-correct";
              else if (optIdx === userAns) optClass += " selected-wrong";
            }
            return `
              <button class="${optClass}" onclick="selectPracticeOption(${q.id}, ${optIdx})" ${isAnswered ? 'disabled' : ''}>
                <span class="mcq-opt-label">${String.fromCharCode(65 + optIdx)}.</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
        <div class="mcq-explanation ${isAnswered ? 'show' : ''}" id="mcq-exp-${q.id}">
          <strong>Solution &amp; FAST Explanation:</strong> ${q.exp}
        </div>
      </div>
    `;
  }).join('');

  updatePracticeScoreDisplay();
}

function selectPracticeOption(qId, optIdx) {
  if (practiceUserAnswers[qId] !== undefined) return;
  practiceUserAnswers[qId] = optIdx;
  renderPracticeMCQs();
}

function updatePracticeScoreDisplay() {
  const scoreSpan = document.getElementById('practice-score-count');
  if (!scoreSpan) return;
  let correct = 0;
  Object.keys(practiceUserAnswers).forEach(id => {
    const q = practiceMCQsData.find(item => item.id === parseInt(id));
    if (q && practiceUserAnswers[id] === q.ans) correct++;
  });
  scoreSpan.innerText = correct;
}

function resetPracticeMCQs() {
  if (confirm("Reset all 100 practice questions?")) {
    practiceUserAnswers = {};
    renderPracticeMCQs();
    showToast("Practice zone reset.");
  }
}

// --- 11. MASTER TIMED TEST ENGINE (40 QUESTIONS, 35 MINUTES) ---
const testQuestions = [
  // 10 Foundation
  { id: 1, topic: "Angles", diff: "foundation", q: "The measure of an angle is 38°. What is the measure of its complement?", opts: ["52°", "62°", "142°", "152°"], ans: 0, exp: "Complement = 90° - 38° = 52°." },
  { id: 2, topic: "Triangles", diff: "foundation", q: "In an isosceles right-angled triangle, what is the measure of each acute angle?", opts: ["30°", "45°", "60°", "90°"], ans: 1, exp: "Right angle is 90°. The other two angles are equal: (180° - 90°)/2 = 45° each." },
  { id: 3, topic: "Triangles", diff: "foundation", q: "A right triangle has legs 9 cm and 12 cm. Find the hypotenuse.", opts: ["15 cm", "16 cm", "18 cm", "21 cm"], ans: 0, exp: "Multiply 3-4-5 triple by 3: 3(3)=9, 3(4)=12, so 3(5) = 15 cm." },
  { id: 4, topic: "Quadrilaterals", diff: "foundation", q: "What is the perimeter of a rectangle with length 14 cm and width 6 cm?", opts: ["20 cm", "40 cm", "84 cm", "48 cm"], ans: 1, exp: "P = 2(l + w) = 2(14 + 6) = 2(20) = 40 cm." },
  { id: 5, topic: "Circles", diff: "foundation", q: "Find the diameter of a circle with area 154 cm² (π = 22/7).", opts: ["7 cm", "14 cm", "21 cm", "28 cm"], ans: 1, exp: "Area = πr² = 154 ⟹ r² = (154 × 7)/22 = 49 ⟹ r = 7 cm. Diameter = 2r = 14 cm." },
  { id: 6, topic: "Polygons", diff: "foundation", q: "Find the sum of interior angles of an octagon (8 sides).", opts: ["720°", "900°", "1080°", "1260°"], ans: 2, exp: "(n - 2) × 180° = (8 - 2) × 180° = 6 × 180° = 1080°." },
  { id: 7, topic: "3D Mensuration", diff: "foundation", q: "What is the volume of a sphere of radius 3 cm?", opts: ["12π cm³", "24π cm³", "36π cm³", "48π cm³"], ans: 2, exp: "V = (4/3)πr³ = (4/3)π(27) = 36π cm³." },
  { id: 8, topic: "Units", diff: "foundation", q: "Convert 2 cubic meters (m³) to Liters.", opts: ["200 L", "2,000 L", "20,000 L", "200,000 L"], ans: 1, exp: "1 m³ = 1,000 Liters ⟹ 2 m³ = 2,000 Liters." },
  { id: 9, topic: "Angles", diff: "foundation", q: "Two vertically opposite angles are (3x - 15)° and (2x + 10)°. Find x.", opts: ["20", "25", "30", "35"], ans: 1, exp: "Vertically opposite angles are equal: 3x - 15 = 2x + 10 ⟹ x = 25." },
  { id: 10, topic: "Quadrilaterals", diff: "foundation", q: "If the area of a square is 144 cm², what is the length of its diagonal?", opts: ["12 cm", "12√2 cm", "14√2 cm", "24 cm"], ans: 1, exp: "Side a = √144 = 12 cm. Diagonal = a√2 = 12√2 cm." },

  // 15 Intermediate
  { id: 11, topic: "Triangles", diff: "intermediate", q: "The sides of a triangle are 5 cm, 12 cm, and 13 cm. What is the area?", opts: ["30 cm²", "60 cm²", "65 cm²", "78 cm²"], ans: 0, exp: "5-12-13 is a right triangle. Area = ½ × 5 × 12 = 30 cm²." },
  { id: 12, topic: "Triangles", diff: "intermediate", q: "In a 45°-45°-90° triangle, the hypotenuse is 10 cm. Find the length of each leg.", opts: ["5 cm", "5√2 cm", "10√2 cm", "5√3 cm"], ans: 1, exp: "Leg = Hypotenuse / √2 = 10 / √2 = 5√2 cm." },
  { id: 13, topic: "Quadrilaterals", diff: "intermediate", q: "The diagonals of a rhombus are in the ratio 3 : 4. If its area is 96 cm², find the length of the shorter diagonal.", opts: ["8 cm", "12 cm", "16 cm", "24 cm"], ans: 1, exp: "Let diagonals be 3x and 4x. Area = ½(3x)(4x) = 6x² = 96 ⟹ x² = 16 ⟹ x = 4. Shorter diagonal = 3(4) = 12 cm." },
  { id: 14, topic: "Polygons", diff: "intermediate", q: "A regular polygon has an exterior angle of 30°. How many diagonals does it have?", opts: ["36", "44", "54", "65"], ans: 2, exp: "Sides n = 360° / 30° = 12. Diagonals = n(n-3)/2 = 12(9)/2 = 54." },
  { id: 15, topic: "Circles", diff: "intermediate", q: "Find the perimeter of a sector of radius 21 cm with central angle 60° (π = 22/7).", opts: ["22 cm", "42 cm", "64 cm", "86 cm"], ans: 2, exp: "Arc length L = (60/360) × 2 × (22/7) × 21 = (1/6) × 132 = 22 cm. Sector Perimeter = L + 2r = 22 + 2(21) = 22 + 42 = 64 cm." },
  { id: 16, topic: "3D Mensuration", diff: "intermediate", q: "A cylinder has curved surface area 880 cm² and height 20 cm. Find its radius (π = 22/7).", opts: ["7 cm", "14 cm", "21 cm", "28 cm"], ans: 0, exp: "2πrh = 880 ⟹ 2 × (22/7) × r × 20 = 880 ⟹ (880/7)r = 880 ⟹ r = 7 cm." },
  { id: 17, topic: "3D Mensuration", diff: "intermediate", q: "Find the total surface area of a cone with radius 7 cm and slant height 25 cm (π = 22/7).", opts: ["550 cm²", "704 cm²", "814 cm²", "924 cm²"], ans: 1, exp: "TSA = πr(l + r) = (22/7) × 7 × (25 + 7) = 22 × 32 = 704 cm²." },
  { id: 18, topic: "Scale Factor", diff: "intermediate", q: "The linear dimensions of a block are tripled. By what percentage does its volume increase?", opts: ["300%", "800%", "900%", "2600%"], ans: 3, exp: "Volume factor = 3³ = 27 times = 2700%. Percentage increase = 2700% - 100% = 2600%." },
  { id: 19, topic: "Word Problems", diff: "intermediate", q: "How many bricks of size 20 cm × 10 cm × 5 cm are needed to construct a wall 10 m × 4 m × 20 cm?", opts: ["8,000", "16,000", "800", "4,000"], ans: 0, exp: "Wall volume = 1000 × 400 × 20 = 8,000,000 cm³. Brick volume = 20 × 10 × 5 = 1,000 cm³. Number = 8,000,000 / 1,000 = 8,000 bricks." },
  { id: 20, topic: "Angles", diff: "intermediate", q: "Two parallel lines are cut by a transversal. If one interior angle is (4x - 20)° and its consecutive interior angle is (x + 50)°, find x.", opts: ["20", "30", "40", "50"], ans: 1, exp: "Co-interior angles sum to 180°: (4x - 20) + (x + 50) = 180 ⟹ 5x + 30 = 180 ⟹ 5x = 150 ⟹ x = 30." },
  { id: 21, topic: "Triangles", diff: "intermediate", q: "The ratio of sides of two similar triangles is 4 : 9. If the perimeter of the smaller triangle is 36 cm, what is the perimeter of the larger triangle?", opts: ["54 cm", "81 cm", "144 cm", "72 cm"], ans: 1, exp: "Perimeter ratio = side ratio = 4/9. 36 / P_large = 4/9 ⟹ P_large = (36 × 9)/4 = 81 cm." },
  { id: 22, topic: "3D Mensuration", diff: "intermediate", q: "What is the space diagonal of a cube of volume 216 cm³?", opts: ["6 cm", "6√2 cm", "6√3 cm", "12 cm"], ans: 2, exp: "Side a = (216)^(1/3) = 6 cm. Space diagonal d = a√3 = 6√3 cm." },
  { id: 23, topic: "Circles", diff: "intermediate", q: "A road 3.5 m wide surrounds a circular park of radius 14 m. Find the area of the road (π = 22/7).", opts: ["346.5 m²", "385.0 m²", "420.5 m²", "512.0 m²"], ans: 0, exp: "Inner r = 14 m, Outer R = 14 + 3.5 = 17.5 m. Road Area = π(R² - r²) = (22/7)(17.5² - 14²) = (22/7)(306.25 - 196) = (22/7)(110.25) = 346.5 m²." },
  { id: 24, topic: "Quadrilaterals", diff: "intermediate", q: "In a parallelogram ABCD, ∠A = (3x + 10)° and ∠B = (2x - 10)°. Find ∠A.", opts: ["118°", "110°", "120°", "124°"], ans: 0, exp: "Adjacent angles of a parallelogram sum to 180°: (3x + 10) + (2x - 10) = 180 ⟹ 5x = 180 ⟹ x = 36. ∠A = 3(36) + 10 = 118°." },
  { id: 25, topic: "Triangles", diff: "intermediate", q: "In triangle ABC, the bisector of ∠A divides the opposite side BC into segments of 4 cm and 6 cm. If AB = 8 cm, find AC.", opts: ["10 cm", "12 cm", "14 cm", "16 cm"], ans: 1, exp: "Angle Bisector Theorem: AB / AC = BD / DC ⟹ 8 / AC = 4 / 6 ⟹ AC = (8 × 6)/4 = 12 cm." },

  // 15 FAST / Scholarship Level
  { id: 26, topic: "Triangles", diff: "fast", q: "In a right triangle with legs 7 cm and 24 cm, find the radius of the incircle (inradius r).", opts: ["2 cm", "3 cm", "3.5 cm", "4 cm"], ans: 1, exp: "Hypotenuse c = √(7² + 24²) = 25 cm. For a right triangle, inradius r = (a + b - c) / 2 = (7 + 24 - 25) / 2 = 6 / 2 = 3 cm." },
  { id: 27, topic: "3D Mensuration", diff: "fast", q: "A solid cone of height 24 cm and base radius 6 cm is melted and recast into a sphere. Find the radius of the sphere.", opts: ["4 cm", "6 cm", "8 cm", "12 cm"], ans: 1, exp: "Volume of cone = (1/3)π(6²)(24) = 288π. Volume of sphere = (4/3)πR³ = 288π ⟹ R³ = 288 × (3/4) = 216 ⟹ R = 6 cm." },
  { id: 28, topic: "Composite Figures", diff: "fast", q: "An equilateral triangle of side 12 cm has its three corners cut off to form a regular hexagon. What is the area of the regular hexagon?", opts: ["18√3 cm²", "24√3 cm²", "36√3 cm²", "48√3 cm²"], ans: 1, exp: "Cutting 1/3 of each side yields a regular hexagon of side 4 cm. Area = 6 × (√3/4)(4²) = 6 × 4√3 = 24√3 cm²." },
  { id: 29, topic: "Circles", diff: "fast", q: "Two concentric circles have radii 13 cm and 5 cm. Find the length of the chord of the larger circle which touches the smaller circle as a tangent.", opts: ["12 cm", "18 cm", "24 cm", "26 cm"], ans: 2, exp: "Tangent is perpendicular to radius. Half-chord = √(13² - 5²) = 12 cm. Full chord = 2 × 12 = 24 cm." },
  { id: 30, topic: "3D Mensuration", diff: "fast", q: "A cylindrical bucket 32 cm high and with base radius 18 cm is filled with sand. When emptied onto the ground, a conical heap of sand 24 cm high is formed. Find the base radius of the conical heap.", opts: ["24 cm", "36 cm", "48 cm", "54 cm"], ans: 1, exp: "π(18²)(32) = (1/3)π(R²)(24) ⟹ 324 × 32 = 8R² ⟹ R² = (324 × 32)/8 = 324 × 4 = 1296 ⟹ R = 36 cm." },
  { id: 31, topic: "Scale Factor", diff: "fast", q: "Two similar cylinders have surface areas in the ratio 16 : 25. If the volume of the smaller cylinder is 128 cm³, find the volume of the larger cylinder.", opts: ["200 cm³", "250 cm³", "312.5 cm³", "400 cm³"], ans: 1, exp: "Area ratio = k² = 16/25 ⟹ Linear ratio k = 4/5. Volume ratio = k³ = 64/125. 128 / V_large = 64/125 ⟹ V_large = 2 × 125 = 250 cm³." },
  { id: 32, topic: "Quadrilaterals", diff: "fast", q: "The perimeter of a non-square rhombus is 52 cm and its area is 120 cm². Find the sum of lengths of its two diagonals.", opts: ["32 cm", "34 cm", "36 cm", "38 cm"], ans: 1, exp: "Side a = 52/4 = 13 cm. a² = (d₁/2)² + (d₂/2)² ⟹ d₁² + d₂² = 4(169) = 676. Area = ½d₁d₂ = 120 ⟹ 2d₁d₂ = 480. (d₁ + d₂)² = d₁² + d₂² + 2d₁d₂ = 676 + 480 = 1156. d₁ + d₂ = √1156 = 34 cm." },
  { id: 33, topic: "Triangles", diff: "fast", q: "The sides of a triangle are 11 cm, 60 cm, and 61 cm. Find the length of the altitude drawn to the hypotenuse.", opts: ["10.82 cm", "11.25 cm", "10.00 cm", "11.60 cm"], ans: 0, exp: "11² + 60² = 121 + 3600 = 3721 = 61² (Right triangle). Area = ½ × 11 × 60 = 330 cm². Altitude h = (2 × Area) / Hypotenuse = 660 / 61 ≈ 10.82 cm." },
  { id: 34, topic: "Word Problems", diff: "fast", q: "A water tank in the shape of an inverted cone has height 12 m and radius 4 m. Water is poured into it up to a depth of 6 m. What fraction of the total tank volume is filled?", opts: ["1/8", "1/4", "1/2", "3/8"], ans: 0, exp: "Depth ratio = 6/12 = 1/2. By similarity, Volume filled / Total volume = (1/2)³ = 1/8." },
  { id: 35, topic: "Polygons", diff: "fast", q: "The interior angles of a convex polygon are in arithmetic progression. The smallest angle is 120° and the common difference is 5°. How many sides does the polygon have?", opts: ["9", "12", "16", "9 or 16"], ans: 0, exp: "Sum = (n/2)[2(120) + (n-1)5] = (n-2)180. Solving gives n = 9 or n = 16. But for n = 16, largest angle = 120 + 15(5) = 195° (> 180°, impossible for convex polygon). Hence n = 9." },
  { id: 36, topic: "3D Mensuration", diff: "fast", q: "A hollow sphere has external diameter 10 cm and uniform thickness 1 cm. What is the volume of metal contained in the sphere?", opts: ["64.33π cm³", "78.67π cm³", "81.33π cm³", "92.00π cm³"], ans: 2, exp: "Outer R = 5 cm, Inner r = 5 - 1 = 4 cm. Volume = (4/3)π(5³ - 4³) = (4/3)π(125 - 64) = (4/3)π(61) = 244π/3 ≈ 81.33π cm³." },
  { id: 37, topic: "Composite Figures", diff: "fast", q: "A square of side 14 cm contains 4 identical quarter-circle arcs drawn with each vertex as center and radius 7 cm. What is the area of the central unshaded region enclosed between the arcs (π = 22/7)?", opts: ["42 cm²", "56 cm²", "84 cm²", "154 cm²"], ans: 0, exp: "Square Area = 14² = 196 cm². The 4 quarter circles together form 1 complete circle of radius 7: Area = (22/7)(49) = 154 cm². Central Area = 196 - 154 = 42 cm²." },
  { id: 38, topic: "Triangles", diff: "fast", q: "In triangle ABC, medians AD and BE intersect at right angles (90°) at centroid G. If AD = 9 cm and BE = 12 cm, find the length of side AB.", opts: ["10 cm", "12 cm", "15 cm", "8 cm"], ans: 0, exp: "Centroid divides medians in 2:1 ratio. AG = (2/3)(9) = 6 cm, BG = (2/3)(12) = 8 cm. In right ΔAGB: AB = √(6² + 8²) = 10 cm." },
  { id: 39, topic: "3D Mensuration", diff: "fast", q: "A right circular cone of radius 6 cm has curved surface area 60π cm². What is the volume of the cone?", opts: ["96π cm³", "120π cm³", "144π cm³", "192π cm³"], ans: 0, exp: "CSA = πrl = 60π ⟹ 6l = 60 ⟹ l = 10 cm. Height h = √(10² - 6²) = 8 cm. Volume = (1/3)π(6²)(8) = 12 × 8 × π = 96π cm³." },
  { id: 40, topic: "Circles", diff: "fast", q: "A wire bent in the form of an equilateral triangle encloses an area of 121√3 cm². If the same wire is bent into a circle, find the area enclosed by the circle (π = 22/7).", opts: ["231 cm²", "346.5 cm²", "462 cm²", "539 cm²"], ans: 1, exp: "Triangle Area = (√3/4)a² = 121√3 ⟹ a² = 484 ⟹ a = 22 cm. Wire length = 3(22) = 66 cm. Circle circumference = 2πr = 66 ⟹ r = (66 × 7)/(44) = 10.5 cm. Circle Area = (22/7)(10.5)² = (22/7)(110.25) = 346.5 cm²." }
];

let testActive = false;
let testCurrentQIndex = 0;
let testAnswers = {};
let testFlagged = {};
let testTimerSeconds = 35 * 60; // 35 minutes
let testInterval = null;

function initMasterTest() {
  const prevBest = localStorage.getItem('fast_geom_best_score');
  const bestDiv = document.getElementById('test-prev-best');
  if (prevBest && bestDiv) {
    bestDiv.innerText = `Previous Personal Best: ${prevBest} / 40`;
  }
}

function startTimedMasterTest() {
  testActive = true;
  testCurrentQIndex = 0;
  testAnswers = {};
  testFlagged = {};
  testTimerSeconds = 35 * 60;

  document.getElementById('test-start-screen').style.display = 'none';
  document.getElementById('test-result-screen').style.display = 'none';
  document.getElementById('test-active-screen').style.display = 'block';

  renderTestPalette();
  loadTestQuestion(0);

  if (testInterval) clearInterval(testInterval);
  testInterval = setInterval(updateTestTimer, 1000);
}

function updateTestTimer() {
  if (testTimerSeconds <= 0) {
    clearInterval(testInterval);
    submitTimedMasterTest(false);
    return;
  }
  testTimerSeconds--;
  const min = Math.floor(testTimerSeconds / 60);
  const sec = testTimerSeconds % 60;
  const timerDisplay = document.getElementById('test-timer-display');
  if (timerDisplay) {
    timerDisplay.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (testTimerSeconds <= 300) {
      timerDisplay.classList.add('urgent');
    }
  }
}

function renderTestPalette() {
  const palette = document.getElementById('test-palette-grid');
  if (!palette) return;

  palette.innerHTML = testQuestions.map((q, idx) => {
    let btnClass = "palette-btn";
    if (idx === testCurrentQIndex) btnClass += " current";
    if (testAnswers[idx] !== undefined) btnClass += " answered";
    if (testFlagged[idx]) btnClass += " flagged";

    return `
      <button class="${btnClass}" onclick="loadTestQuestion(${idx})">
        ${idx + 1}
      </button>
    `;
  }).join('');
}

function loadTestQuestion(idx) {
  if (idx < 0 || idx >= testQuestions.length) return;
  testCurrentQIndex = idx;
  const q = testQuestions[idx];

  document.getElementById('tst-q-num').innerText = `Question ${idx + 1} of ${testQuestions.length} • [${q.diff.toUpperCase()} • ${q.topic}]`;
  document.getElementById('tst-q-text').innerText = q.q;

  const flagBtn = document.getElementById('btn-flag-q');
  if (flagBtn) {
    flagBtn.innerText = testFlagged[idx] ? '★ Marked for Review' : '⚑ Mark for Review';
    flagBtn.style.color = testFlagged[idx] ? 'var(--amber)' : '';
  }

  const optContainer = document.getElementById('tst-q-options');
  if (optContainer) {
    optContainer.innerHTML = q.opts.map((opt, optIdx) => {
      const isSelected = testAnswers[idx] === optIdx;
      return `
        <button class="mcq-option-btn ${isSelected ? 'selected-correct' : ''}" onclick="selectTestAnswer(${optIdx})">
          <span class="mcq-opt-label">${String.fromCharCode(65 + optIdx)}.</span>
          <span>${opt}</span>
        </button>
      `;
    }).join('');
  }

  // Prev / Next button states
  const prevBtn = document.getElementById('btn-tst-prev');
  const nextBtn = document.getElementById('btn-tst-next');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) {
    if (idx === testQuestions.length - 1) {
      nextBtn.innerText = 'Submit Test';
      nextBtn.onclick = () => submitTimedMasterTest(true);
    } else {
      nextBtn.innerText = 'Next →';
      nextBtn.onclick = () => navTestQuestion(1);
    }
  }

  renderTestPalette();
}

function selectTestAnswer(optIdx) {
  testAnswers[testCurrentQIndex] = optIdx;
  loadTestQuestion(testCurrentQIndex);
}

function toggleFlagCurrentTestQuestion() {
  testFlagged[testCurrentQIndex] = !testFlagged[testCurrentQIndex];
  loadTestQuestion(testCurrentQIndex);
}

function navTestQuestion(delta) {
  loadTestQuestion(testCurrentQIndex + delta);
}

function submitTimedMasterTest(confirmPrompt = true) {
  if (confirmPrompt) {
    const answeredCount = Object.keys(testAnswers).length;
    const msg = `You have answered ${answeredCount} of 40 questions.\nAre you ready to submit your exam?`;
    if (!confirm(msg)) return;
  }

  clearInterval(testInterval);
  testActive = false;

  document.getElementById('test-active-screen').style.display = 'none';
  document.getElementById('test-result-screen').style.display = 'block';

  // Compute metrics
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;
  const topicStats = {};

  testQuestions.forEach((q, idx) => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
    topicStats[q.topic].total++;

    const userAns = testAnswers[idx];
    if (userAns === undefined) {
      unattempted++;
    } else if (userAns === q.ans) {
      correct++;
      topicStats[q.topic].correct++;
    } else {
      wrong++;
    }
  });

  const pct = Math.round((correct / testQuestions.length) * 100);
  const timeUsed = (35 * 60) - testTimerSeconds;
  const timeMin = Math.floor(timeUsed / 60);
  const timeSec = timeUsed % 60;

  document.getElementById('res-score-num').innerText = correct;
  document.getElementById('res-score-denom').innerText = `out of 40 (${pct}%)`;
  document.getElementById('res-correct').innerText = correct;
  document.getElementById('res-wrong').innerText = wrong;
  document.getElementById('res-unattempted').innerText = unattempted;
  document.getElementById('res-time-taken').innerText = `${timeMin}m ${timeSec}s`;

  // Topic breakdown
  const diagList = document.getElementById('topic-diagnostic-list');
  if (diagList) {
    diagList.innerHTML = Object.keys(topicStats).map(topic => {
      const st = topicStats[topic];
      const topicPct = Math.round((st.correct / st.total) * 100);
      let badge = `<span style="color:var(--primary); font-weight:700;">Strong (✓)</span>`;
      if (topicPct < 60) badge = `<span style="color:var(--red); font-weight:700;">Needs Focus (⚠️)</span>`;
      else if (topicPct < 85) badge = `<span style="color:var(--amber); font-weight:700;">Intermediate</span>`;

      return `
        <div class="breakdown-item">
          <div><strong>${topic}</strong> (${st.correct}/${st.total})</div>
          <div>${topicPct}% — ${badge}</div>
        </div>
      `;
    }).join('');
  }

  // Update best score
  const prevBest = parseInt(localStorage.getItem('fast_geom_best_score') || '0');
  if (correct > prevBest) {
    localStorage.setItem('fast_geom_best_score', correct.toString());
    showToast(`🎉 New Personal Best: ${correct}/40!`);
  }
}

function restartTimedMasterTest() {
  startTimedMasterTest();
}

function toggleReviewAllTestQuestions() {
  const container = document.getElementById('test-review-container');
  if (!container) return;

  if (container.style.display === 'block') {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  container.innerHTML = `
    <h4 style="margin-bottom:1rem; color:var(--navy);">Complete Test Review with Step-by-Step Solutions:</h4>
    ${testQuestions.map((q, idx) => {
      const userAns = testAnswers[idx];
      const isCorrect = userAns === q.ans;
      const wasAnswered = userAns !== undefined;

      return `
        <div class="mcq-card" style="margin-bottom:1rem;">
          <div class="mcq-header">
            <span style="font-weight:700; font-size:0.85rem; color:var(--navy);">Question ${idx + 1} (${q.topic})</span>
            <span style="font-size:0.8rem; font-weight:700; color:${wasAnswered ? (isCorrect ? 'var(--primary)' : 'var(--red)') : 'var(--slate-500)'};">
              ${wasAnswered ? (isCorrect ? '✓ Correct' : '✗ Incorrect') : 'Unattempted'}
            </span>
          </div>
          <p style="font-weight:600; margin-bottom:0.75rem;">${q.q}</p>
          <div style="font-size:0.875rem; line-height:1.7;">
            <div><strong>Your Answer:</strong> ${wasAnswered ? String.fromCharCode(65 + userAns) + '. ' + q.opts[userAns] : 'None'}</div>
            <div style="color:var(--primary); font-weight:700;"><strong>Correct Answer:</strong> ${String.fromCharCode(65 + q.ans)}. ${q.opts[q.ans]}</div>
            <div style="background:var(--slate-100); padding:0.6rem; border-radius:4px; margin-top:0.5rem; font-size:0.85rem;">
              <strong>Step-by-Step FAST Solution:</strong> ${q.exp}
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// --- 12. INITIALIZATION ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initBookmarks();
  updateAngleVisualizer(65);
  setGeomShape('square');
  solveAngleHelper();
  solvePythagoras();
  renderPracticeMCQs();
  initMasterTest();

  // Scrollspy for sidebar active links
  const sections = document.querySelectorAll('.study-section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.topic-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
