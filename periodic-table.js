/**
 * PERIODIC TABLE — MDCAT CHEMISTRY JAVASCRIPT ENGINE (periodic-table.js)
 * Standalone, robust interactive logic with localStorage mastery, trend simulators,
 * 3D flip flashcards, modal Bohr-model canvas, and comprehensive MDCAT test engine.
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATASETS
  // ==========================================

  const ELEMENTS = [
    // Period 1
    { z: 1, s: 'H', n: 'Hydrogen', m: 1.008, p: 1, g: 1, b: 's', c: 'nonmetal', ec: '1s¹', val: 1, ox: '+1, -1', r: 53, ie: 1312, en: 2.20, ea: 73, state: 'gas', tip: 'Unique position; shares properties with alkali metals, halogens, and carbon.' },
    { z: 2, s: 'He', n: 'Helium', m: 4.003, p: 1, g: 18, b: 's', c: 'noble-gas', ec: '1s²', val: 2, ox: '0', r: 31, ie: 2372, en: null, ea: 0, state: 'gas', tip: '⭐ MDCAT Trap: Helium has ONLY 2 valence electrons (duplet), NOT 8! Highest 1st Ionization Energy of all elements (2372 kJ/mol).' },

    // Period 2
    { z: 3, s: 'Li', n: 'Lithium', m: 6.94, p: 2, g: 1, b: 's', c: 'alkali-metal', ec: '[He] 2s¹', val: 1, ox: '+1', r: 152, ie: 520, en: 0.98, ea: 60, state: 'solid', diag: 'Mg', tip: '⭐ Diagonal Relationship with Magnesium (Mg): Forms normal oxide (Li₂O), carbonate decomposes on heating.' },
    { z: 4, s: 'Be', n: 'Beryllium', m: 9.012, p: 2, g: 2, b: 's', c: 'alkaline-earth', ec: '[He] 2s²', val: 2, ox: '+2', r: 112, ie: 899, en: 1.57, ea: 0, state: 'solid', diag: 'Al', tip: '⭐ Diagonal Relationship with Aluminium (Al): Both form amphoteric oxides (BeO & Al₂O₃) and covalent halides.' },
    { z: 5, s: 'B', n: 'Boron', m: 10.81, p: 2, g: 13, b: 'p', c: 'metalloid', ec: '[He] 2s² 2p¹', val: 3, ox: '+3', r: 85, ie: 801, en: 2.04, ea: 27, state: 'solid', diag: 'Si', tip: '⭐ Diagonal Relationship with Silicon (Si): Both are metalloids/semiconductors forming weakly acidic oxides.' },
    { z: 6, s: 'C', n: 'Carbon', m: 12.011, p: 2, g: 14, b: 'p', c: 'nonmetal', ec: '[He] 2s² 2p²', val: 4, ox: '-4, +2, +4', r: 77, ie: 1086, en: 2.55, ea: 122, state: 'solid', tip: 'Forms basis of organic chemistry; maximum catenation due to strong C-C bond energy (348 kJ/mol).' },
    { z: 7, n: 'Nitrogen', s: 'N', m: 14.007, p: 2, g: 15, b: 'p', c: 'nonmetal', ec: '[He] 2s² 2p³', val: 5, ox: '-3, +3, +5', r: 75, ie: 1402, en: 3.04, ea: 7, state: 'gas', tip: '⭐ MDCAT Exception: Nitrogen has higher 1st IE than Oxygen because 2p³ is stable half-filled.' },
    { z: 8, s: 'O', n: 'Oxygen', m: 15.999, p: 2, g: 16, b: 'p', c: 'nonmetal', ec: '[He] 2s² 2p⁴', val: 6, ox: '-2, -1, +2', r: 73, ie: 1314, en: 3.44, ea: 141, state: 'gas', tip: '2nd most electronegative element (3.44). Forms O²⁻ (oxide), O₂²⁻ (peroxide), O₂⁻ (superoxide).' },
    { z: 9, s: 'F', n: 'Fluorine', m: 18.998, p: 2, g: 17, b: 'p', c: 'halogen', ec: '[He] 2s² 2p⁵', val: 7, ox: '-1', r: 71, ie: 1681, en: 3.98, ea: 328, state: 'gas', tip: '⭐ MDCAT Tip: Fluorine is the MOST electronegative element (4.0 Pauling). Most reactive halogen.' },
    { z: 10, s: 'Ne', n: 'Neon', m: 20.180, p: 2, g: 18, b: 'p', c: 'noble-gas', ec: '[He] 2s² 2p⁶', val: 8, ox: '0', r: 69, ie: 2080, en: null, ea: 0, state: 'gas', tip: 'Complete octet, chemically inert monatomic noble gas.' },

    // Period 3
    { z: 11, s: 'Na', n: 'Sodium', m: 22.990, p: 3, g: 1, b: 's', c: 'alkali-metal', ec: '[Ne] 3s¹', val: 1, ox: '+1', r: 186, ie: 496, en: 0.93, ea: 53, state: 'solid', tip: '⭐ MDCAT: Atomic number 11 → 11 protons, 11 electrons. Period 3, Group 1 (+1 ion).' },
    { z: 12, s: 'Mg', n: 'Magnesium', m: 24.305, p: 3, g: 2, b: 's', c: 'alkaline-earth', ec: '[Ne] 3s²', val: 2, ox: '+2', r: 160, ie: 738, en: 1.31, ea: 0, state: 'solid', diag: 'Li', tip: 'Forms Mg²⁺. Higher IE than Al because 3s² is completely filled.' },
    { z: 13, s: 'Al', n: 'Aluminium', m: 26.982, p: 3, g: 13, b: 'p', c: 'post-transition-metal', ec: '[Ne] 3s² 3p¹', val: 3, ox: '+3', r: 143, ie: 578, en: 1.61, ea: 43, state: 'solid', diag: 'Be', tip: '⭐ Forms Al³⁺. Oxide Al₂O₃ and Al(OH)₃ are amphoteric.' },
    { z: 14, s: 'Si', n: 'Silicon', m: 28.085, p: 3, g: 14, b: 'p', c: 'metalloid', ec: '[Ne] 3s² 3p²', val: 4, ox: '-4, +2, +4', r: 118, ie: 786, en: 1.90, ea: 134, state: 'solid', diag: 'B', tip: 'Key semiconductor; giant covalent lattice like diamond.' },
    { z: 15, s: 'P', n: 'Phosphorus', m: 30.974, p: 3, g: 15, b: 'p', c: 'nonmetal', ec: '[Ne] 3s² 3p³', val: 5, ox: '-3, +3, +5', r: 110, ie: 1012, en: 2.19, ea: 72, state: 'solid', tip: 'Expands octet using vacant 3d orbitals (forms PCl₅).' },
    { z: 16, s: 'S', n: 'Sulfur', m: 32.06, p: 3, g: 16, b: 'p', c: 'nonmetal', ec: '[Ne] 3s² 3p⁴', val: 6, ox: '-2, +4, +6', r: 102, ie: 1000, en: 2.58, ea: 200, state: 'solid', tip: 'Forms S₈ puckered crown ring; max oxidation state +6 (H₂SO₄, SF₆).' },
    { z: 17, s: 'Cl', n: 'Chlorine', m: 35.45, p: 3, g: 17, b: 'p', c: 'halogen', ec: '[Ne] 3s² 3p⁵', val: 7, ox: '-1, +1, +3, +5, +7', r: 99, ie: 1251, en: 3.16, ea: 349, state: 'gas', tip: '⭐ MDCAT Trap: Chlorine has the HIGHEST Electron Affinity (-349 kJ/mol) of all elements, exceeding Fluorine!' },
    { z: 18, s: 'Ar', n: 'Argon', m: 39.948, p: 3, g: 18, b: 'p', c: 'noble-gas', ec: '[Ne] 3s² 3p⁶', val: 8, ox: '0', r: 97, ie: 1520, en: null, ea: 0, state: 'gas', tip: 'Most abundant noble gas in atmosphere (~0.93%).' },

    // Period 4
    { z: 19, s: 'K', n: 'Potassium', m: 39.098, p: 4, g: 1, b: 's', c: 'alkali-metal', ec: '[Ar] 4s¹', val: 1, ox: '+1', r: 227, ie: 419, en: 0.82, ea: 48, state: 'solid', tip: 'Group 1 → K⁺. Lilac flame test. Forms superoxide KO₂.' },
    { z: 20, s: 'Ca', n: 'Calcium', m: 40.078, p: 4, g: 2, b: 's', c: 'alkaline-earth', ec: '[Ar] 4s²', val: 2, ox: '+2', r: 197, ie: 590, en: 1.00, ea: 2, state: 'solid', tip: 'Group 2 → Ca²⁺. Brick-red flame test.' },
    { z: 21, s: 'Sc', n: 'Scandium', m: 44.956, p: 4, g: 3, b: 'd', c: 'transition-metal', ec: '[Ar] 3d¹ 4s²', val: 3, ox: '+3', r: 162, ie: 633, en: 1.36, ea: 18, state: 'solid', tip: 'Sc³⁺ has empty 3d orbitals → colorless and diamagnetic.' },
    { z: 22, s: 'Ti', n: 'Titanium', m: 47.867, p: 4, g: 4, b: 'd', c: 'transition-metal', ec: '[Ar] 3d² 4s²', val: 4, ox: '+2, +3, +4', r: 147, ie: 658, en: 1.54, ea: 8, state: 'solid', tip: 'High strength-to-weight ratio; TiO₂ is white pigment.' },
    { z: 23, s: 'V', n: 'Vanadium', m: 50.942, p: 4, g: 5, b: 'd', c: 'transition-metal', ec: '[Ar] 3d³ 4s²', val: 5, ox: '+2, +3, +4, +5', r: 134, ie: 650, en: 1.63, ea: 51, state: 'solid', tip: '⭐ V₂O₅ is industrial catalyst in Contact Process for H₂SO₄.' },
    { z: 24, s: 'Cr', n: 'Chromium', m: 51.996, p: 4, g: 6, b: 'd', c: 'transition-metal', ec: '[Ar] 3d⁵ 4s¹', val: 6, ox: '+2, +3, +6', r: 128, ie: 653, en: 1.66, ea: 64, state: 'solid', tip: '⭐ MDCAT Trap: Anomalous configuration [Ar] 3d⁵ 4s¹ due to stable half-filled 3d.' },
    { z: 25, s: 'Mn', n: 'Manganese', m: 54.938, p: 4, g: 7, b: 'd', c: 'transition-metal', ec: '[Ar] 3d⁵ 4s²', val: 7, ox: '+2, +3, +4, +6, +7', r: 127, ie: 717, en: 1.55, ea: 0, state: 'solid', tip: '⭐ Highest oxidation state (+7 in KMnO₄) among 3d transition series.' },
    { z: 26, s: 'Fe', n: 'Iron', m: 55.845, p: 4, g: 8, b: 'd', c: 'transition-metal', ec: '[Ar] 3d⁶ 4s²', val: 8, ox: '+2, +3', r: 126, ie: 762, en: 1.83, ea: 16, state: 'solid', tip: '⭐ Variable states Fe²⁺/Fe³⁺; catalyst in Haber Process.' },
    { z: 27, s: 'Co', n: 'Cobalt', m: 58.933, p: 4, g: 9, b: 'd', c: 'transition-metal', ec: '[Ar] 3d⁷ 4s²', val: 9, ox: '+2, +3', r: 125, ie: 760, en: 1.88, ea: 64, state: 'solid', tip: 'Cobalt-60 used in radiation oncology; part of Vitamin B12.' },
    { z: 28, s: 'Ni', n: 'Nickel', m: 58.693, p: 4, g: 10, b: 'd', c: 'transition-metal', ec: '[Ar] 3d⁸ 4s²', val: 10, ox: '+2, +3', r: 124, ie: 737, en: 1.91, ea: 112, state: 'solid', tip: 'Raney nickel is hydrogenation catalyst for fats to ghee.' },
    { z: 29, s: 'Cu', n: 'Copper', m: 63.546, p: 4, g: 11, b: 'd', c: 'transition-metal', ec: '[Ar] 3d¹⁰ 4s¹', val: 11, ox: '+1, +2', r: 128, ie: 745, en: 1.90, ea: 118, state: 'solid', tip: '⭐ MDCAT Trap: Anomalous configuration [Ar] 3d¹⁰ 4s¹ due to fully filled 3d subshell.' },
    { z: 30, s: 'Zn', n: 'Zinc', m: 65.38, p: 4, g: 12, b: 'd', c: 'transition-metal', ec: '[Ar] 3d¹⁰ 4s²', val: 12, ox: '+2', r: 134, ie: 906, en: 1.65, ea: 0, state: 'solid', tip: '⭐ Zn²⁺ has completely filled 3d¹⁰ → non-typical transition element (colorless compounds).' },
    { z: 31, s: 'Ga', n: 'Gallium', m: 69.723, p: 4, g: 13, b: 'p', c: 'post-transition-metal', ec: '[Ar] 3d¹⁰ 4s² 4p¹', val: 3, ox: '+3', r: 135, ie: 579, en: 1.81, ea: 29, state: 'solid', tip: 'Low melting metal (~29.8 °C); shows d-block contraction.' },
    { z: 32, s: 'Ge', n: 'Germanium', m: 72.630, p: 4, g: 14, b: 'p', c: 'metalloid', ec: '[Ar] 3d¹⁰ 4s² 4p²', val: 4, ox: '+2, +4', r: 122, ie: 762, en: 2.01, ea: 119, state: 'solid', tip: 'Important semiconductor used in fiber optics and transistors.' },
    { z: 33, s: 'As', n: 'Arsenic', m: 74.922, p: 4, g: 15, b: 'p', c: 'metalloid', ec: '[Ar] 3d¹⁰ 4s² 4p³', val: 5, ox: '-3, +3, +5', r: 120, ie: 947, en: 2.18, ea: 78, state: 'solid', tip: 'Toxic metalloid in nitrogen family; forms As₂O₃.' },
    { z: 34, s: 'Se', n: 'Selenium', m: 78.971, p: 4, g: 16, b: 'p', c: 'nonmetal', ec: '[Ar] 3d¹⁰ 4s² 4p⁴', val: 6, ox: '-2, +4, +6', r: 117, ie: 941, en: 2.55, ea: 195, state: 'solid', tip: 'Photoconductive nonmetal whose electrical conductivity increases with light.' },
    { z: 35, s: 'Br', n: 'Bromine', m: 79.904, p: 4, g: 17, b: 'p', c: 'halogen', ec: '[Ar] 3d¹⁰ 4s² 4p⁵', val: 7, ox: '-1, +1, +5', r: 114, ie: 1140, en: 2.96, ea: 325, state: 'liquid', tip: '⭐ ONLY non-metal that is liquid at room temperature (reddish-brown fuming liquid).' },
    { z: 36, s: 'Kr', n: 'Krypton', m: 83.798, p: 4, g: 18, b: 'p', c: 'noble-gas', ec: '[Ar] 3d¹⁰ 4s² 4p⁶', val: 8, ox: '0, +2', r: 110, ie: 1351, en: 3.00, ea: 0, state: 'gas', tip: 'Forms KrF₂ at cryogenic temperatures.' },

    // Key Period 5
    { z: 37, s: 'Rb', n: 'Rubidium', m: 85.468, p: 5, g: 1, b: 's', c: 'alkali-metal', ec: '[Kr] 5s¹', val: 1, ox: '+1', r: 248, ie: 403, en: 0.82, ea: 47, state: 'solid', tip: 'Violently reactive alkali metal.' },
    { z: 38, s: 'Sr', n: 'Strontium', m: 87.62, p: 5, g: 2, b: 's', c: 'alkaline-earth', ec: '[Kr] 5s²', val: 2, ox: '+2', r: 215, ie: 549, en: 0.95, ea: 5, state: 'solid', tip: 'Crimson-red flame test.' },
    { z: 47, s: 'Ag', n: 'Silver', m: 107.87, p: 5, g: 11, b: 'd', c: 'transition-metal', ec: '[Kr] 4d¹⁰ 5s¹', val: 11, ox: '+1', r: 144, ie: 731, en: 1.93, ea: 126, state: 'solid', tip: 'Highest electrical and thermal conductivity of all metals.' },
    { z: 50, s: 'Sn', n: 'Tin', m: 118.71, p: 5, g: 14, b: 'p', c: 'post-transition-metal', ec: '[Kr] 4d¹⁰ 5s² 5p²', val: 4, ox: '+2, +4', r: 140, ie: 709, en: 1.96, ea: 107, state: 'solid', tip: 'Shows inert pair effect (+2 and +4 oxidation states).' },
    { z: 53, s: 'I', n: 'Iodine', m: 126.90, p: 5, g: 17, b: 'p', c: 'halogen', ec: '[Kr] 4d¹⁰ 5s² 5p⁵', val: 7, ox: '-1, +1, +5, +7', r: 133, ie: 1008, en: 2.66, ea: 295, state: 'solid', tip: '⭐ Solid purple-black halogen with metallic luster; sublimes readily into purple vapor.' },
    { z: 54, s: 'Xe', n: 'Xenon', m: 131.29, p: 5, g: 18, b: 'p', c: 'noble-gas', ec: '[Kr] 4d¹⁰ 5s² 5p⁶', val: 8, ox: '+2, +4, +6', r: 130, ie: 1170, en: 2.60, ea: 0, state: 'gas', tip: 'First noble gas proven to form compounds (XeF₂, XeF₄, XeF₆).' },

    // Key Period 6 & 7
    { z: 55, s: 'Cs', n: 'Caesium', m: 132.91, p: 6, g: 1, b: 's', c: 'alkali-metal', ec: '[Xe] 6s¹', val: 1, ox: '+1', r: 265, ie: 376, en: 0.79, ea: 46, state: 'solid', tip: '⭐ Most electropositive stable metal; lowest electronegativity (0.79) and lowest ionization energy.' },
    { z: 56, s: 'Ba', n: 'Barium', m: 137.33, p: 6, g: 2, b: 's', c: 'alkaline-earth', ec: '[Xe] 6s²', val: 2, ox: '+2', r: 222, ie: 503, en: 0.89, ea: 14, state: 'solid', tip: 'Apple-green flame test; BaSO₄ is radiopaque barium meal.' },
    { z: 57, s: 'La', n: 'Lanthanum', m: 138.91, p: 6, g: 3, b: 'd', c: 'lanthanide', ec: '[Xe] 5d¹ 6s²', val: 3, ox: '+3', r: 187, ie: 538, en: 1.10, ea: 48, state: 'solid', tip: '⭐ Prototype of Lanthanides (4f subshell series). Lanthanide contraction makes 4d & 5d sizes identical.' },
    { z: 79, s: 'Au', n: 'Gold', m: 196.97, p: 6, g: 11, b: 'd', c: 'transition-metal', ec: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', val: 11, ox: '+1, +3', r: 144, ie: 890, en: 2.54, ea: 223, state: 'solid', tip: 'Most malleable and ductile metal; dissolves in Aqua Regia (3:1 HCl:HNO₃).' },
    { z: 80, s: 'Hg', n: 'Mercury', m: 200.59, p: 6, g: 12, b: 'd', c: 'transition-metal', ec: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', val: 12, ox: '+1, +2', r: 151, ie: 1007, en: 2.00, ea: 0, state: 'liquid', tip: '⭐ MDCAT Exception: Mercury is the ONLY metal that is liquid at standard room temperature.' },
    { z: 82, s: 'Pb', n: 'Lead', m: 207.2, p: 6, g: 14, b: 'p', c: 'post-transition-metal', ec: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', val: 4, ox: '+2, +4', r: 147, ie: 716, en: 2.33, ea: 35, state: 'solid', tip: '⭐ Inert pair effect: Pb²⁺ is much more stable than Pb⁴⁺.' },
    { z: 86, s: 'Rn', n: 'Radon', m: 222, p: 6, g: 18, b: 'p', c: 'noble-gas', ec: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', val: 8, ox: '0', r: 140, ie: 1037, en: null, ea: 0, state: 'gas', tip: 'Radioactive noble gas decay product of Radium.' },
    { z: 87, s: 'Fr', n: 'Francium', m: 223, p: 7, g: 1, b: 's', c: 'alkali-metal', ec: '[Rn] 7s¹', val: 1, ox: '+1', r: 280, ie: 380, en: 0.70, ea: 44, state: 'solid', tip: 'Heaviest and most unstable radioactive alkali metal.' },
    { z: 88, s: 'Ra', n: 'Radium', m: 226, p: 7, g: 2, b: 's', c: 'alkaline-earth', ec: '[Rn] 7s²', val: 2, ox: '+2', r: 235, ie: 509, en: 0.90, ea: 10, state: 'solid', tip: 'Intensely radioactive alkaline earth metal discovered by the Curies.' },
    { z: 89, s: 'Ac', n: 'Actinium', m: 227, p: 7, g: 3, b: 'd', c: 'actinide', ec: '[Rn] 6d¹ 7s²', val: 3, ox: '+3', r: 195, ie: 499, en: 1.10, ea: 34, state: 'solid', tip: '⭐ Prototype of Actinides (5f series). All actinides are radioactive.' },
    { z: 92, s: 'U', n: 'Uranium', m: 238.03, p: 7, g: 3, b: 'f', c: 'actinide', ec: '[Rn] 5f³ 6d¹ 7s²', val: 6, ox: '+3, +4, +6', r: 175, ie: 597, en: 1.38, ea: 12, state: 'solid', tip: '⭐ MDCAT: Associated with 5f subshell; nuclear fission fuel (U-235).' },
    { z: 118, s: 'Og', n: 'Oganesson', m: 294, p: 7, g: 18, b: 'p', c: 'noble-gas', ec: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', val: 8, ox: '0', r: 152, ie: 860, en: null, ea: 5, state: 'solid', tip: '⭐ Highest atomic number (118) in the modern periodic table.' }
  ];

  // Helper to get element by Z
  function getElementByZ(z) {
    return ELEMENTS.find(el => el.z === z) || null;
  }

  // 12 Flashcards Data
  const FLASHCARDS = [
    {
      id: 'card-1',
      title: 'Group 1: Alkali Metals',
      category: 'group',
      concept: 'Group 1 — Alkali Metals (IA)',
      subtext: 'ns¹ Outer Electronic Configuration',
      elements: 'Li, Na, K, Rb, Cs, Fr',
      badge: 'Group 1',
      definition: 'Soft, highly reactive, silvery metals with 1 valence electron in outer s-orbital. Readily lose 1 electron to form M⁺ cations.',
      mdcatTip: '⭐ MDCAT Tip: Group 1 strictly forms +1 oxidation state (M⁺). Reactivity increases down the group (Cs is most reactive stable metal). Stored under oil/kerosene.',
      keyPoints: ['Valence e⁻: 1 (ns¹)', 'Form +1 ions (Na → Na⁺ + e⁻)', 'Flame tests: Li (crimson), Na (yellow), K (lilac)', 'Reactivity: Li < Na < K < Rb < Cs']
    },
    {
      id: 'card-2',
      title: 'Group 2: Alkaline Earth Metals',
      category: 'group',
      concept: 'Group 2 — Alkaline Earth Metals (IIA)',
      subtext: 'ns² Outer Electronic Configuration',
      elements: 'Be, Mg, Ca, Sr, Ba, Ra',
      badge: 'Group 2',
      definition: 'Reactive metallic elements with 2 outer electrons. Form basic oxides and hydroxides; harder than alkali metals.',
      mdcatTip: '⭐ MDCAT Tip: Form +2 oxidation state (M²⁺). BeO is amphoteric (diagonal with Al₂O₃), while other group oxides are basic.',
      keyPoints: ['Valence e⁻: 2 (ns²)', 'Form +2 ions (Mg → Mg²⁺ + 2e⁻)', 'Reactivity increases down the group', 'Flame tests: Ca (brick red), Sr (crimson), Ba (apple green)']
    },
    {
      id: 'card-3',
      title: 'Group 17: Halogens',
      category: 'group',
      concept: 'Group 17 — Halogens (VIIA)',
      subtext: 'ns² np⁵ Valence Configuration (Salt-Formers)',
      elements: 'F, Cl, Br, I, At, Ts',
      badge: 'Group 17',
      definition: 'Highly electronegative non-metals needing 1 electron for octet. Exist as diatomic molecules (F₂, Cl₂, Br₂, I₂).',
      mdcatTip: '⭐ MDCAT Tip: Fluorine is the most reactive halogen and most electronegative element (4.0). Halogen reactivity DECREASES down the group. Chlorine has the HIGHEST electron affinity.',
      keyPoints: ['Valence e⁻: 7 (ns² np⁵)', 'Form -1 halide ions (F⁻, Cl⁻, Br⁻, I⁻)', 'Br₂ is the ONLY liquid non-metal at STP', 'Oxidizing power: F₂ > Cl₂ > Br₂ > I₂']
    },
    {
      id: 'card-4',
      title: 'Group 18: Noble Gases',
      category: 'group',
      concept: 'Group 18 — Noble Gases (VIIIA / 0)',
      subtext: 'ns² np⁶ Full Octet (He: 1s² Duplet)',
      elements: 'He, Ne, Ar, Kr, Xe, Rn, Og',
      badge: 'Group 18',
      definition: 'Monatomic, colorless, odorless gases with completely filled valence shells confering extreme chemical inertness.',
      mdcatTip: '⭐ MDCAT Trap: Helium has ONLY 2 valence electrons (duplet rule), NOT 8! Helium has the HIGHEST 1st Ionization Energy of all elements (2372 kJ/mol).',
      keyPoints: ['Full valence shells (zero valency)', 'Monatomic with very low boiling points', 'Electron affinity ≈ 0 (endothermic)', 'He has 2 electrons, Ne-Rn have 8']
    },
    {
      id: 'card-5',
      title: 's-Block Elements',
      category: 'block',
      concept: 's-Block Elements',
      subtext: 'Last electron enters ns orbital (Groups 1 & 2 + He)',
      elements: 'Groups 1 & 2, H, He',
      badge: 's-Block',
      definition: 'Elements where the differentiating electron enters the outermost s subshell. Consists of alkali and alkaline earth metals.',
      mdcatTip: '⭐ MDCAT Tip: s-block metals are strong reducing agents with low ionization energies, highly electropositive, forming ionic compounds.',
      keyPoints: ['General config: ns¹⁻²', 'Largest atomic radii in respective periods', 'Low densities and low melting points', 'Characteristic flame colors']
    },
    {
      id: 'card-6',
      title: 'p-Block Elements',
      category: 'block',
      concept: 'p-Block Elements',
      subtext: 'Last electron enters np orbital (Groups 13–18)',
      elements: 'B, C, N, O, F, Ne families',
      badge: 'p-Block',
      definition: 'Elements located on the right side of the periodic table where electrons fill np orbitals. Contains metals, nonmetals, metalloids, and noble gases.',
      mdcatTip: '⭐ MDCAT Tip: The only block containing all 3 types of elements (metals, nonmetals, metalloids). Shows "Inert Pair Effect" in heavier members (e.g. Pb²⁺ > Pb⁴⁺).',
      keyPoints: ['General config: ns² np¹⁻⁶', 'Groups 13 to 18', 'Widest range of oxidation states (-3 to +7)', 'Highest electronegativities and electron affinities']
    },
    {
      id: 'card-7',
      title: 'd-Block: Transition Metals',
      category: 'block',
      concept: 'd-Block — Transition Elements',
      subtext: 'Filling (n-1)d subshell (Groups 3–12)',
      elements: 'Sc to Zn, Fe, Cu, Cr, Mn, etc.',
      badge: 'd-Block',
      definition: 'Metallic elements bridging s and p blocks where electrons enter penultimate (n-1)d subshell.',
      mdcatTip: '⭐ MDCAT Tip: Hallmarks: 1) Variable oxidation states, 2) Colored ions (d-d transitions), 3) Paramagnetism from unpaired d electrons, 4) Industrial catalysts.',
      keyPoints: ['General config: (n-1)d¹⁻¹⁰ ns¹⁻²', 'Exceptions: Cr ([Ar] 3d⁵ 4s¹) & Cu ([Ar] 3d¹⁰ 4s¹)', 'Zn, Cd, Hg are non-typical transition metals (d¹⁰ full)', 'Sc³⁺ and Zn²⁺ form colorless, diamagnetic ions']
    },
    {
      id: 'card-8',
      title: 'f-Block: Lanthanides & Actinides',
      category: 'block',
      concept: 'f-Block — Inner Transition Elements',
      subtext: 'Filling (n-2)f subshell (4f & 5f series)',
      elements: 'Lanthanides (4f) & Actinides (5f)',
      badge: 'f-Block',
      definition: 'Two rows at table base where electrons fill (n-2)f orbitals. 4f = Lanthanides (Rare Earths); 5f = Actinides (All radioactive).',
      mdcatTip: '⭐ MDCAT Tip: Lanthanide Contraction: Steady size decrease from La to Lu due to poor 4f shielding, causing 4d and 5d metals (Zr & Hf) to have nearly identical sizes!',
      keyPoints: ['General config: (n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns²', '4f = Lanthanides (stable +3 oxidation state)', '5f = Actinides (Thorium, Uranium, Plutonium - all radioactive)', '14 elements in each series (28 total)']
    },
    {
      id: 'card-9',
      title: 'Atomic Radius Trend',
      category: 'trend',
      concept: 'Atomic Radius Trend',
      subtext: 'Distance from nucleus to outermost electron boundary',
      elements: 'Across: Decreases (→) | Down: Increases (↓)',
      badge: 'Trend: Radius',
      definition: 'Half the internuclear distance between two identical bonded atoms. Governed by nuclear charge (Z) and shell count (n).',
      mdcatTip: '⭐ MDCAT Tip: Across a Period (→) DECREASES (higher Zeff pulls shells tighter). Down a Group (↓) INCREASES (new shells added + increased shielding).',
      keyPoints: ['Across period (→): Decreases', 'Down group (↓): Increases', 'Cation is smaller than parent atom (Na⁺ < Na)', 'Anion is larger than parent atom (Cl⁻ > Cl)']
    },
    {
      id: 'card-10',
      title: 'Ionization Energy Trend',
      category: 'trend',
      concept: 'Ionization Energy (IE) Trend',
      subtext: 'Energy required to remove outermost electron from gaseous atom',
      elements: 'Across: Increases (→) | Down: Decreases (↓)',
      badge: 'Trend: IE',
      definition: 'Minimum energy needed to remove the most loosely held electron: X(g) + IE → X⁺(g) + e⁻. Always endothermic.',
      mdcatTip: '⭐ MDCAT Tip: Helium has HIGHEST 1st IE (2372 kJ/mol). Exceptions: Be > B (full 2s²) and N > O (stable half-filled 2p³).',
      keyPoints: ['Across period (→): Generally Increases', 'Down group (↓): Generally Decreases', 'Successive IEs: IE₁ < IE₂ < IE₃ << IE₄', 'Big jump indicates removal from inner noble-gas core']
    },
    {
      id: 'card-11',
      title: 'Electronegativity Trend',
      category: 'trend',
      concept: 'Electronegativity (EN) Trend',
      subtext: 'Ability of an atom in a covalent bond to attract shared electron pair',
      elements: 'Most EN: Fluorine (4.0) | Least: Caesium/Francium (0.7)',
      badge: 'Trend: EN',
      definition: 'Relative power of a bonded atom to attract shared electrons towards itself (Pauling Scale).',
      mdcatTip: '⭐ MDCAT Tip: Fluorine is the MOST electronegative element (4.0). Order: F (4.0) > O (3.44) > Cl (3.16) ≈ N (3.04) > Br (2.96) > I (2.66) > C (2.55) > H (2.20).',
      keyPoints: ['Across period (→): Increases', 'Down group (↓): Decreases', 'Noble gases have undefined EN on Pauling scale', 'ΔEN > 1.7 typically indicates predominant ionic character']
    },
    {
      id: 'card-12',
      title: 'Metallic Character Trend',
      category: 'trend',
      concept: 'Metallic vs. Non-Metallic Character',
      subtext: 'Electropositivity (tendency to lose electrons)',
      elements: 'Most Metallic: Cs/Fr | Most Non-Metallic: F',
      badge: 'Trend: Metallic',
      definition: 'Metallic character is the ease of losing electrons (forming cations). Non-metallic is the tendency to gain electrons (forming anions).',
      mdcatTip: '⭐ MDCAT Tip: Across period (→) Metallic character DECREASES (Non-metallic increases). Down group (↓) Metallic character INCREASES.',
      keyPoints: ['Across period: Metallic ↓, Non-metallic ↑', 'Down group: Metallic ↑, Non-metallic ↓', 'Metal oxides are basic (Na₂O, CaO)', 'Non-metal oxides are acidic (SO₃, CO₂, P₂O₅)']
    }
  ];

  // 40 MDCAT Detailed Notes
  const NOTES_TOPICS = [
    {
      id: 1,
      title: '1. What is the Periodic Table?',
      section: 'Fundamentals',
      content: [
        'The periodic table is a systematic arrangement of elements according to their atomic numbers (Z) and electronic configurations.',
        'Elements with similar chemical properties are placed in the same vertical column (group).',
        'The modern periodic table contains 7 horizontal periods, 18 vertical groups, and 118 known elements.',
        'Main idea: The properties of elements show a regular periodic pattern when elements are arranged in order of increasing atomic numbers.'
      ],
      mdcatTip: '⭐ Modern periodic law is strictly based on atomic number (Z), NOT atomic mass (Mendeleev error).'
    },
    {
      id: 2,
      title: '2. Modern Periodic Law',
      section: 'Fundamentals',
      content: [
        'Statement: "The physical and chemical properties of elements are periodic functions of their atomic numbers."',
        'Discovered by Henry Moseley (1913) using X-ray characteristic spectra (√v = a(Z - b)).',
        'When elements are arranged according to increasing atomic number, their electronic configurations recur periodically, causing their physical and chemical properties to repeat in a regular pattern.'
      ],
      mdcatTip: '⭐ Henry Moseley proved that atomic number is the fundamental property of an element.'
    },
    {
      id: 3,
      title: '3. Atomic Number (Z)',
      section: 'Fundamentals',
      content: [
        'Atomic number is the total number of protons present inside the nucleus of an atom.',
        'Symbol: Z',
        'For any neutral atom: Number of protons = Number of electrons.',
        'Example: Sodium has atomic number 11 → Protons = 11, Electrons = 11.'
      ],
      mdcatTip: '⭐ Atomic number determines the identity and chemical properties of an element.'
    },
    {
      id: 4,
      title: '4. Mass Number (A)',
      section: 'Fundamentals',
      content: [
        'Mass number is the total number of nucleons (protons + neutrons) in the nucleus.',
        'Symbol: A',
        'Formula: Mass number (A) = Protons (Z) + Neutrons (N)',
        'Therefore: Neutrons (N) = Mass Number (A) − Atomic Number (Z)'
      ],
      mdcatTrap: '⭐ MDCAT Trap: Atomic number tells you an element\'s chemical identity; mass number can vary among isotopes without altering chemical behavior.'
    },
    {
      id: 5,
      title: '5. Periods of the Periodic Table',
      section: 'Structure',
      content: [
        'The horizontal rows of the periodic table are called periods. There are 7 periods.',
        '• Period 1: Contains 2 elements (Hydrogen, Helium) - Shortest period.',
        '• Period 2: Contains 8 elements (Li to Ne) - Short period.',
        '• Period 3: Contains 8 elements (Na to Ar) - Short period.',
        '• Period 4: Contains 18 elements (K to Kr) - Long period.',
        '• Period 5: Contains 18 elements (Rb to Xe) - Long period.',
        '• Period 6: Contains 32 elements (Cs to Rn, includes Lanthanides) - Very long period.',
        '• Period 7: Contains 32 positions (Fr to Og, includes Actinides) - Complete period.'
      ],
      mdcatTip: '⭐ Period 1 has 2 elements; Periods 2 & 3 have 8; Periods 4 & 5 have 18; Periods 6 & 7 have 32 elements.'
    },
    {
      id: 6,
      title: '6. What Does the Period Number Tell Us?',
      section: 'Structure',
      content: [
        'For main-group elements, the period number indicates the highest occupied principal energy level (n) or total number of electron shells.',
        'Example: Sodium (Na: 1s² 2s² 2p⁶ 3s¹) is in Period 3 because its outermost electron resides in the 3rd principal energy level (n=3).'
      ],
      mdcatTip: '⭐ Period number = Principal Quantum Number (n) of the outermost valence shell.'
    },
    {
      id: 7,
      title: '7. Groups of the Periodic Table',
      section: 'Structure',
      content: [
        'The vertical columns of the periodic table are called groups or families.',
        'There are 18 groups in the IUPAC modern periodic table.',
        'Elements in the same group possess similar chemical properties because they have identical outer valence-electron configurations.'
      ],
      mdcatTip: '⭐ Same group = Same valence electron count = Similar chemical reactivity.'
    },
    {
      id: 8,
      title: '8. Group 1 — Alkali Metals',
      section: 'Groups & Families',
      content: [
        'Elements: Li, Na, K, Rb, Cs, Fr (Group IA).',
        'Outer electronic configuration: ns¹ (1 valence electron).',
        'Readily lose 1 electron to form +1 cations (M⁺, e.g., Na → Na⁺ + e⁻, K → K⁺ + e⁻).',
        'Properties: Soft metals, highly reactive, tarnished rapidly in air, low density (Li, Na, K float on water or kerosene), low melting points.',
        'Reactivity trend: Reactivity increases down the group (Li < Na < K < Rb < Cs).'
      ],
      mdcatTip: '⭐ Group 1 metals strictly form +1 ions and basic alkaline oxides/hydroxides.'
    },
    {
      id: 9,
      title: '9. Group 2 — Alkaline Earth Metals',
      section: 'Groups & Families',
      content: [
        'Elements: Be, Mg, Ca, Sr, Ba, Ra (Group IIA).',
        'Outer electronic configuration: ns² (2 valence electrons).',
        'Form +2 cations (M²⁺, e.g., Mg → Mg²⁺ + 2e⁻, Ca → Ca²⁺ + 2e⁻).',
        'Properties: Harder and denser than Group 1 metals with higher melting points.',
        'Trend: Reactivity increases down the group.'
      ],
      mdcatTip: '⭐ Group 2 elements form +2 ions; BeO is amphoteric while Mg to Ba oxides are basic.'
    },
    {
      id: 10,
      title: '10. Groups 3–12 — Transition Elements',
      section: 'Groups & Families',
      content: [
        'Also known as d-block transition metals (e.g., Fe, Cu, Zn, Cr, Mn, Ni, Co, Ti).',
        'Key characteristics for MDCAT:',
        '1. Variable oxidation states (e.g., Fe²⁺/Fe³⁺, Mn⁺² to Mn⁺⁷).',
        '2. Formation of colored compounds/ions due to d-d electronic transitions.',
        '3. Complex ion formation with ligands (e.g. [Cu(NH₃)₄]²⁺).',
        '4. High electrical and thermal conductivity; high melting points.',
        '5. Act as industrial catalysts (Fe in Haber process, V₂O₅ in Contact process, Ni in hydrogenation).'
      ],
      mdcatTip: '⭐ Transition elements show variable oxidation states because (n-1)d and ns electrons are close in energy.'
    },
    {
      id: 11,
      title: '11. Group 13 — Boron Family',
      section: 'Groups & Families',
      content: [
        'Elements: B, Al, Ga, In, Tl, Nh (Group IIIA).',
        'Outer configuration: ns² np¹ (3 valence electrons).',
        'Aluminium commonly forms Al³⁺ ions.',
        'B is a metalloid with network covalent bonding; Al, Ga, In, Tl are metals.',
        'Al₂O₃ is amphoteric (reacts with both HCl and NaOH).'
      ],
      mdcatTip: '⭐ Al forms Al³⁺; Al₂O₃ oxide and Al(OH)₃ are amphoteric.'
    },
    {
      id: 12,
      title: '12. Group 14 — Carbon Family',
      section: 'Groups & Families',
      content: [
        'Elements: C, Si, Ge, Sn, Pb, Fl (Group IVA).',
        'Outer configuration: ns² np² (4 valence electrons).',
        'Carbon is the cornerstone of organic chemistry, exhibiting exceptional catenation (chain-forming ability).',
        'Shows inert pair effect down the group: for Pb, the +2 oxidation state is more stable than +4.'
      ],
      mdcatTip: '⭐ Carbon exhibits catenation; Pb²⁺ is more stable than Pb⁴⁺ due to inert pair effect.'
    },
    {
      id: 13,
      title: '13. Group 15 — Nitrogen Family (Pnictogens)',
      section: 'Groups & Families',
      content: [
        'Elements: N, P, As, Sb, Bi, Mc (Group VA).',
        'Outer configuration: ns² np³ (5 valence electrons).',
        'Important oxidation states: -3, +3, +5.',
        'Nitrogen exists as a triple-bonded diatomic molecule (N≡N) with very high bond dissociation energy (945 kJ/mol).'
      ],
      mdcatTip: '⭐ Half-filled 2p³ subshell gives Nitrogen an unusually high 1st ionization energy, higher than Oxygen!'
    },
    {
      id: 14,
      title: '14. Group 16 — Oxygen Family (Chalcogens)',
      section: 'Groups & Families',
      content: [
        'Elements: O, S, Se, Te, Po, Lv (Group VIA).',
        'Outer configuration: ns² np⁴ (6 valence electrons).',
        'Oxygen commonly gains 2 electrons to form oxide ion (O²⁻).',
        'Oxygen is the 2nd most electronegative element (3.44).'
      ],
      mdcatTip: '⭐ Oxygen forms O²⁻ (oxide), O₂²⁻ (peroxide), O₂⁻ (superoxide), and +2 in OF₂.'
    },
    {
      id: 15,
      title: '15. Group 17 — Halogens',
      section: 'Groups & Families',
      content: [
        'Elements: F, Cl, Br, I, At, Ts (Group VIIA).',
        'Outer configuration: ns² np⁵ (7 valence electrons).',
        'Commonly gain 1 electron to form -1 halide ions (F⁻, Cl⁻, Br⁻, I⁻).',
        'Reactivity decreases down the group (F₂ > Cl₂ > Br₂ > I₂).',
        'Physical states at room temperature: F₂ (gas), Cl₂ (gas), Br₂ (liquid - only liquid non-metal), I₂ (solid).'
      ],
      mdcatTip: '⭐ Fluorine is the most reactive halogen and most electronegative element. Chlorine has highest electron affinity.'
    },
    {
      id: 16,
      title: '16. Group 18 — Noble Gases',
      section: 'Groups & Families',
      content: [
        'Elements: He, Ne, Ar, Kr, Xe, Rn, Og (Group VIIIA / 0).',
        'Possess completely filled outer valence shells (ns² np⁶), conferring extreme chemical inertness.',
        'Exist as monatomic, colorless, odorless gases under STP.',
        '⭐ Exception: Helium has 2 valence electrons (1s² duplet). Other noble gases have 8 valence electrons (octet).'
      ],
      mdcatTrap: '⭐ MDCAT Trap: Do NOT say Helium has 8 valence electrons! It has 2 electrons in its outer shell (duplet).'
    },
    {
      id: 17,
      title: '17. Metals',
      section: 'Classification',
      content: [
        'Most elements in the periodic table (>75%) are metals, located on the left and center.',
        'Properties: High electrical and thermal conductivity, lustrous, malleable, ductile, high density.',
        'Usually solids at room temperature.',
        '⭐ Exception: Mercury (Hg) is the only metal that is liquid at standard room temperature.'
      ],
      mdcatTip: '⭐ Mercury (Hg) is liquid metal at room temperature (solidifies at -38.8 °C).'
    },
    {
      id: 18,
      title: '18. Non-Metals',
      section: 'Classification',
      content: [
        'Located mainly on the upper-right side of the periodic table (plus Hydrogen on top left).',
        'Examples: C, N, O, F, P, S, Cl, Br, I, noble gases.',
        'Poor conductors of heat and electricity (except graphite allotrope of carbon).',
        'Form acidic oxides (CO₂, SO₂, NO₂, P₂O₅).'
      ],
      mdcatTip: '⭐ Bromine (Br₂) is the ONLY non-metal that is liquid at room temperature.'
    },
    {
      id: 19,
      title: '19. Metalloids (Semimetals)',
      section: 'Classification',
      content: [
        'Elements with properties intermediate between metals and non-metals.',
        'Located along the diagonal staircase boundary.',
        'Important examples: B (Boron), Si (Silicon), Ge (Germanium), As (Arsenic), Sb (Antimony), Te (Tellurium).',
        'Silicon and Germanium are foundational semiconductor materials in modern electronics.'
      ],
      mdcatTip: '⭐ Metalloids possess intermediate electronegativities and behave as semiconductors whose conductivity increases with temperature.'
    },
    {
      id: 20,
      title: '20. Periodic Table Blocks',
      section: 'Orbital Blocks',
      content: [
        'The periodic table is divided into four distinct blocks based on the subshell being filled by the last (differentiating) electron:',
        '1. s-block (Groups 1 & 2 + He)',
        '2. p-block (Groups 13–18)',
        '3. d-block (Groups 3–12)',
        '4. f-block (Lanthanides & Actinides)'
      ],
      mdcatTip: '⭐ Block assignment is determined by which subshell (s, p, d, or f) receives the differentiating electron.'
    },
    {
      id: 21,
      title: '21. s-Block',
      section: 'Orbital Blocks',
      content: [
        'Contains Groups 1 and 2 (plus Hydrogen and Helium).',
        'The last electron enters an s-orbital.',
        'Maximum capacity of s-subshell is 2 electrons (ns¹ for Group 1, ns² for Group 2).',
        'Strong reducing agents with low ionization energies.'
      ],
      mdcatTip: '⭐ s-block metals form ionic compounds with low lattice energies compared to d-block.'
    },
    {
      id: 22,
      title: '22. p-Block',
      section: 'Orbital Blocks',
      content: [
        'Contains Groups 13 to 18 (IIIA to VIIIA).',
        'The last electron enters a p-orbital (holding up to 6 electrons, np¹ to np⁶).',
        'Only block containing metals, nonmetals, metalloids, and noble gases.'
      ],
      mdcatTip: '⭐ p-block elements show the widest range of oxidation states from -3 to +7.'
    },
    {
      id: 23,
      title: '23. d-Block',
      section: 'Orbital Blocks',
      content: [
        'Contains Groups 3 to 12 (IB to VIIIB).',
        'Transition elements where the last electron enters the penultimate (n-1)d subshell.',
        'Holds up to 10 electrons in 5 d-orbitals.'
      ],
      mdcatTip: '⭐ d-block contains 4 series: 3d (Sc to Zn), 4d (Y to Cd), 5d (La to Hg), 6d (Ac to Cn).'
    },
    {
      id: 24,
      title: '24. f-Block',
      section: 'Orbital Blocks',
      content: [
        'Contains 28 elements grouped into Lanthanides (4f) and Actinides (5f).',
        'Shown separately at the bottom of the table to preserve the standard compact 18-column width.',
        'Holds up to 14 electrons in 7 f-orbitals.'
      ],
      mdcatTip: '⭐ Also called Inner Transition Elements because they fill an ante-penultimate (n-2)f energy level.'
    },
    {
      id: 25,
      title: '25. Lanthanides (4f Series)',
      section: 'Orbital Blocks',
      content: [
        'Associated with filling of the 4f subshell (atomic numbers 57/58 to 71).',
        'Also known as Rare Earth Elements.',
        'Silvery-white metals with remarkably similar chemical properties; standard oxidation state is +3.',
        'Lanthanide Contraction: Steady decrease in atomic and ionic radii from La to Lu due to poor shielding by 4f electrons.'
      ],
      mdcatTip: '⭐ Lanthanide contraction makes 4d and 5d transition elements (like Zr and Hf) almost identical in atomic size!'
    },
    {
      id: 26,
      title: '26. Actinides (5f Series)',
      section: 'Orbital Blocks',
      content: [
        'Associated with filling of the 5f subshell (atomic numbers 89/90 to 103).',
        'All actinides are radioactive.',
        'Examples: Thorium (Th), Uranium (U), Plutonium (Pu).',
        'Elements after Uranium (Z > 92) are synthetic transuranic elements.'
      ],
      mdcatTip: '⭐ All actinides are radioactive; Uranium (Z=92) is the heaviest naturally occurring element.'
    },
    {
      id: 27,
      title: '27. Electronic Configuration & Periodic Position',
      section: 'Electronic Structure',
      content: [
        'The position of an element is directly derived from its ground state electron configuration:',
        '• Period = Value of highest principal quantum number (n).',
        '• Block = Type of subshell receiving the last electron.',
        '• Group = Number of valence electrons for s and p blocks.',
        'Example: Sodium (Na: 1s² 2s² 2p⁶ 3s¹) → n=3 (Period 3), s-subshell (s-block), 1 electron (Group 1).'
      ],
      mdcatTip: '⭐ Always write the full electronic configuration to deduce period, group, and block instantly.'
    },
    {
      id: 28,
      title: '28. Valence Electrons',
      section: 'Electronic Structure',
      content: [
        'Valence electrons are the electrons residing in the outermost principal energy shell for main-group elements.',
        'Group 1 → 1 valence e⁻ (ns¹)',
        'Group 2 → 2 valence e⁻ (ns²)',
        'Group 13 → 3 valence e⁻ (ns² np¹)',
        'Group 14 → 4 valence e⁻ (ns² np²)',
        'Group 15 → 5 valence e⁻ (ns² np³)',
        'Group 16 → 6 valence e⁻ (ns² np⁴)',
        'Group 17 → 7 valence e⁻ (ns² np⁵)',
        'Group 18 → 8 valence e⁻ (ns² np⁶), EXCEPT Helium which has 2 valence electrons (1s²).'
      ],
      mdcatTrap: '⭐ MDCAT Trap: Helium has only 2 valence electrons; never say 8.'
    },
    {
      id: 29,
      title: '29. Atomic Radius',
      section: 'Periodic Trends',
      content: [
        'Atomic radius is half the inter-nuclear distance between two bonded identical atoms.',
        '• Across a Period (→): Generally DECREASES.',
        '  Why? Nuclear charge (Z) increases while electrons enter the same main shell; effective nuclear charge (Zeff) increases, pulling the electron cloud closer to the nucleus.',
        '• Down a Group (↓): Generally INCREASES.',
        '  Why? New electron shells are added (increasing n), increasing atomic size and shielding effect.'
      ],
      mdcatTip: '⭐ Atomic Radius: Across period → Decreases; Down group → Increases.'
    },
    {
      id: 30,
      title: '30. Ionization Energy (IE)',
      section: 'Periodic Trends',
      content: [
        'Ionization energy is the minimum energy required to remove an electron from an isolated gaseous atom in its ground state: X(g) + IE → X⁺(g) + e⁻.',
        '• Across a Period (→): Generally INCREASES (due to increasing Zeff and smaller radius).',
        '• Down a Group (↓): Generally DECREASES (due to larger atomic radius and greater shielding effect).',
        '⭐ MDCAT Exceptions:',
        '1. Be > B (Be has stable filled 2s² orbital).',
        '2. N > O (N has stable half-filled 2p³ orbital).'
      ],
      mdcatTip: '⭐ Helium has the highest 1st Ionization Energy (2372 kJ/mol) of all elements.'
    },
    {
      id: 31,
      title: '31. Electron Affinity (EA)',
      section: 'Periodic Trends',
      content: [
        'Electron affinity is the energy released (or absorbed) when an electron is added to an isolated gaseous atom to form an anion: X(g) + e⁻ → X⁻(g).',
        '• Across a Period (→): Generally INCREASES (more exothermic).',
        '• Down a Group (↓): Generally DECREASES.',
        '⭐ High-Yield Exception: Chlorine (Cl) has a HIGHER electron affinity (-349 kJ/mol) than Fluorine (F, -328 kJ/mol) because the small, dense 2p electron cloud of Fluorine causes strong electron-electron repulsion.'
      ],
      mdcatTrap: '⭐ MDCAT Trap: Chlorine has HIGHER Electron Affinity than Fluorine!'
    },
    {
      id: 32,
      title: '32. Electronegativity (EN)',
      section: 'Periodic Trends',
      content: [
        'Electronegativity is the relative tendency of an atom in a chemical bond to attract shared electron pairs toward itself.',
        '• Across a Period (→): Generally INCREASES.',
        '• Down a Group (↓): Generally DECREASES.',
        'Scale: Pauling Scale (Fluorine = 4.0, highest of all elements; Cesium/Francium = ~0.7-0.8, lowest).'
      ],
      mdcatTip: '⭐ Most electronegative element is Fluorine (4.0). Order: F > O > Cl ≈ N > Br > I > C > H.'
    },
    {
      id: 33,
      title: '33. Metallic Character',
      section: 'Periodic Trends',
      content: [
        'Metallic character represents how easily an element loses electrons (electropositive nature).',
        '• Across a Period (→): DECREASES (atoms hold electrons more tightly).',
        '• Down a Group (↓): INCREASES (outer electrons are further from nucleus and easier to remove).',
        'Most metallic stable element: Caesium (Cs).'
      ],
      mdcatTip: '⭐ Metallic character: Across period → Decreases; Down group → Increases.'
    },
    {
      id: 34,
      title: '34. Non-Metallic Character',
      section: 'Periodic Trends',
      content: [
        'Non-metallic character is the tendency to accept electrons (electronegative nature).',
        'Behaves in exact opposite direction to metallic character:',
        '• Across a Period (→): INCREASES.',
        '• Down a Group (↓): DECREASES.',
        'Most non-metallic element: Fluorine (F).'
      ],
      mdcatTip: '⭐ Non-metallic character: Across period → Increases; Down group → Decreases.'
    },
    {
      id: 35,
      title: '35. Reactivity Trends',
      section: 'Periodic Trends',
      content: [
        '• For Metals (e.g. Group 1 alkali metals): Reactivity INCREASES down the group because ionization energy decreases and electrons are lost more easily (Li < Na < K < Rb < Cs).',
        '• For Non-Metals (e.g. Group 17 halogens): Reactivity DECREASES down the group because gaining electrons becomes less favorable as atomic radius expands and nuclear pull weakens (F₂ > Cl₂ > Br₂ > I₂).'
      ],
      mdcatTip: '⭐ Metal reactivity increases down a group; Non-metal halogen reactivity decreases down a group.'
    },
    {
      id: 36,
      title: '36. Shielding Effect (Screening Effect)',
      section: 'Nuclear Forces',
      content: [
        'Inner shell electrons partially shield or block the nuclear positive attraction experienced by outermost valence electrons.',
        '• Across a Period (→): Remains nearly constant / similar because electrons are added into the same valence shell without adding new inner shielding shells.',
        '• Down a Group (↓): INCREASES sharply as successive complete inner shells are added.',
        'This explains why atomic radius increases and ionization energy decreases down a group.'
      ],
      mdcatTip: '⭐ Shielding effect: Constant across period; Increases down group.'
    },
    {
      id: 37,
      title: '37. Effective Nuclear Charge (Zeff)',
      section: 'Nuclear Forces',
      content: [
        'Effective nuclear charge is the net positive charge experienced by an electron in a multi-electron atom after subtracting electron shielding: Zeff = Z − S (where S is the shielding constant).',
        '• Across a Period (→): Zeff INCREASES significantly because nuclear charge Z rises by +1 at each step while shielding S remains roughly constant.',
        'Effects of rising Zeff across period: Smaller atomic radius, higher ionization energy, higher electronegativity.'
      ],
      mdcatTip: '⭐ High Zeff across a period pulls valence electrons tighter, explaining contraction in atomic size.'
    },
    {
      id: 38,
      title: '38. Oxidation States',
      section: 'Chemical Behavior',
      content: [
        'Oxidation state represents the apparent charge on an atom in a chemical compound.',
        '• Main-group elements usually show fixed oxidation states based on valence electrons (+1 for Grp 1, +2 for Grp 2, -1 for Halogens).',
        '• Transition elements show variable oxidation states because both ns and (n-1)d electrons participate in bonding.',
        'Examples: Iron forms Fe²⁺ (ferrous) and Fe³⁺ (ferric); Manganese shows +2, +3, +4, +6, +7 (in KMnO₄).'
      ],
      mdcatTip: '⭐ Variable oxidation states are a hallmark characteristic of d-block transition elements.'
    },
    {
      id: 39,
      title: '39. Diagonal Relationship',
      section: 'Chemical Behavior',
      content: [
        'Certain elements in Period 2 exhibit striking similarities in chemical properties with elements situated diagonally below them in Period 3.',
        'Reason: Similar ionic charge-to-size ratio (polarizing power = charge / radius).',
        'Key High-Yield Pairs for MDCAT:',
        '1. Lithium (Li) ↔ Magnesium (Mg): Both form normal oxides (Li₂O, MgO); carbonates decompose on gentle heating; nitrates give NO₂.',
        '2. Beryllium (Be) ↔ Aluminium (Al): Both form covalent chlorides; both form amphoteric oxides (BeO, Al₂O₃); passivated by conc. HNO₃.',
        '3. Boron (B) ↔ Silicon (Si): Both are semiconductors; form weakly acidic oxides (B₂O₃, SiO₂); form volatile hydrides.'
      ],
      mdcatTip: '⭐ High-Yield MDCAT Pairs: Li↔Mg, Be↔Al, B↔Si (Due to similar charge density/polarizing power).'
    },
    {
      id: 40,
      title: '40. Master Periodic Trends Summary Table',
      section: 'Master Summary',
      content: [
        'Complete comparison of periodic properties across periods and down groups:',
        '• Atomic Radius: Across (→) Decreases | Down (↓) Increases',
        '• Ionization Energy: Across (→) Increases | Down (↓) Decreases',
        '• Electronegativity: Across (→) Increases | Down (↓) Decreases',
        '• Electron Affinity: Across (→) Increases | Down (↓) Decreases (Cl > F)',
        '• Metallic Character: Across (→) Decreases | Down (↓) Increases',
        '• Non-Metallic Character: Across (→) Increases | Down (↓) Decreases',
        '• Shielding Effect: Across (→) Constant | Down (↓) Increases',
        '• Nuclear Charge (Z): Across (→) Increases | Down (↓) Increases'
      ],
      mdcatTip: '⭐ Quick Memory Map: Across (Radius ↓, IE ↑, EN ↑, Metallic ↓) | Down (Radius ↑, IE ↓, EN ↓, Metallic ↑).'
    }
  ];

  // 12 High-Yield MDCAT Traps List
  const MDCAT_TRAPS_LIST = [
    { title: 'Trap 1: Modern Periodic Law Basis', text: 'Modern periodic table is arranged by ATOMIC NUMBER (Z), NOT atomic mass (Mendeleev error).' },
    { title: 'Trap 2: Group 17 Name', text: 'Group 17 elements are Halogens ("salt-formers"). Group 16 are Chalcogens.' },
    { title: 'Trap 3: Group 18 Name', text: 'Group 18 elements are Noble Gases / Inert Gases.' },
    { title: 'Trap 4: Group 1 Name', text: 'Group 1 elements are Alkali Metals (form strongly basic alkaline solutions).' },
    { title: 'Trap 5: Group 2 Name', text: 'Group 2 elements are Alkaline Earth Metals.' },
    { title: 'Trap 6: Groups 3–12 Name', text: 'Groups 3–12 are Transition Elements (d-block).' },
    { title: 'Trap 7: Period Radius Trend', text: 'Across a period, atomic radius DECREASES (higher Zeff pulls electron cloud tighter).' },
    { title: 'Trap 8: Group Radius Trend', text: 'Down a group, atomic radius INCREASES (new electron shells added).' },
    { title: 'Trap 9: Period Ionization Energy', text: 'Across a period, ionization energy GENERALLY INCREASES (Exceptions: Be > B, N > O).' },
    { title: 'Trap 10: Group Ionization Energy', text: 'Down a group, ionization energy GENERALLY DECREASES.' },
    { title: 'Trap 11: Most Electronegative Element', text: 'Fluorine (F) is the MOST electronegative element (4.0 Pauling). Chlorine has higher electron affinity, but F has higher EN.' },
    { title: 'Trap 12: Helium Valence Electrons', text: 'Helium has ONLY 2 valence electrons (duplet: 1s²), NOT 8! Never assume all noble gases have 8.' }
  ];

  // 15 Challenging MDCAT MCQs
  const MCQ_QUESTIONS = [
    {
      id: 1,
      q: 'The modern periodic law states that physical and chemical properties of elements are periodic functions of their:',
      options: ['Atomic mass', 'Atomic number', 'Mass number', 'Neutron-to-proton ratio'],
      ans: 1,
      exp: '⭐ Modern periodic law (Moseley) is based on atomic number (Z), which represents the number of protons and determines electronic configuration.',
      trap: 'MDCAT Trap 1: Mendeleev used atomic mass; modern table uses atomic number.'
    },
    {
      id: 2,
      q: 'How many valence electrons does Helium (He, Z=2) have in its outermost energy shell?',
      options: ['8', '2', '0', '18'],
      ans: 1,
      exp: '⭐ MDCAT Trap: Helium has only 2 electrons in its 1s shell (1s² duplet rule). Although placed in Group 18 with noble gases, its valence electron count is strictly 2, not 8.',
      trap: 'Do not confuse octet rule with Helium duplet!'
    },
    {
      id: 3,
      q: 'Which element in the periodic table possesses the HIGHEST Electron Affinity?',
      options: ['Fluorine (F)', 'Chlorine (Cl)', 'Oxygen (O)', 'Bromine (Br)'],
      ans: 1,
      exp: '⭐ Chlorine has the highest electron affinity (-349 kJ/mol). Fluorine (-328 kJ/mol) has high electron-electron repulsion in its compact 2p orbital which reduces energy released.',
      trap: 'Fluorine has highest Electronegativity (4.0), but Chlorine has highest Electron Affinity!'
    },
    {
      id: 4,
      q: 'Which pair of elements demonstrates a classic "Diagonal Relationship"?',
      options: ['Na and Mg', 'Li and Mg', 'Be and B', 'C and N'],
      ans: 1,
      exp: '⭐ Key diagonal pairs: Li ↔ Mg, Be ↔ Al, and B ↔ Si. Li and Mg share similar polarizing power (charge/size ratio).',
      trap: 'Remember the mnemonic: Li-Mg, Be-Al, B-Si.'
    },
    {
      id: 5,
      q: 'Why is the 1st Ionization Energy of Nitrogen (Z=7) higher than that of Oxygen (Z=8)?',
      options: ['Oxygen has larger atomic radius than Nitrogen', 'Nitrogen has a stable half-filled 2p³ subshell', 'Nitrogen has higher nuclear charge', 'Oxygen has greater shielding effect'],
      ans: 1,
      exp: '⭐ Nitrogen has the electronic configuration 1s² 2s² 2p³ with a half-filled 2p subshell, conferring extra quantum mechanical stability and higher ionization energy.',
      trap: 'MDCAT Exception to the general period trend.'
    },
    {
      id: 6,
      q: 'The only non-metallic element that exists as a liquid at room temperature and pressure is:',
      options: ['Mercury', 'Bromine', 'Gallium', 'Chlorine'],
      ans: 1,
      exp: '⭐ Bromine (Br₂) is the ONLY non-metal liquid at standard temperature and pressure. Mercury is a metal liquid.',
      trap: 'Mercury = Liquid metal; Bromine = Liquid non-metal.'
    },
    {
      id: 7,
      q: 'Across Period 3 from Sodium (Na) to Argon (Ar), the shielding effect of inner electrons:',
      options: ['Increases sharply', 'Decreases steadily', 'Remains nearly constant', 'Fluctuates unpredictably'],
      ans: 2,
      exp: '⭐ Across a period, electrons enter the same principal energy shell while inner shielding shells remain identical, keeping shielding effect constant while Zeff rises.',
      trap: 'Shielding effect only increases down a group, not across a period.'
    },
    {
      id: 8,
      q: 'What is the electronic configuration of Chromium (Cr, Z=24)?',
      options: ['[Ar] 3d⁴ 4s²', '[Ar] 3d⁵ 4s¹', '[Ar] 3d⁶ 4s⁰', '[Ar] 3d³ 4s² 4p¹'],
      ans: 1,
      exp: '⭐ Chromium is an exception: [Ar] 3d⁵ 4s¹ because half-filled 3d⁵ configuration has greater exchange energy and symmetry stability.',
      trap: 'Never write 3d⁴ 4s² for Chromium!'
    },
    {
      id: 9,
      q: 'Which element has the HIGHEST first ionization energy in the entire periodic table?',
      options: ['Fluorine (F)', 'Helium (He)', 'Neon (Ne)', 'Hydrogen (H)'],
      ans: 1,
      exp: '⭐ Helium (He) has the highest 1st ionization energy (2372 kJ/mol) because its 2 electrons are very close to the nucleus in the 1s shell with no inner electron shielding.',
      trap: 'Helium IE > Fluorine IE > Neon IE.'
    },
    {
      id: 10,
      q: 'Which group of elements shows variable oxidation states, forms colored ions, and acts as catalysts?',
      options: ['Group 1 Alkali metals', 'Group 2 Alkaline earth metals', 'Groups 3–12 Transition metals', 'Group 18 Noble gases'],
      ans: 2,
      exp: '⭐ d-Block transition elements (Groups 3-12) exhibit variable oxidation states, colored compounds due to d-d electron transitions, and catalytic activity.',
      trap: 'Representative elements (s & p blocks) show fixed valencies.'
    },
    {
      id: 11,
      q: 'Which oxide is strictly AMPHOTERIC in nature?',
      options: ['Na₂O', 'SO₃', 'Al₂O₃', 'CaO'],
      ans: 2,
      exp: '⭐ Al₂O₃ and BeO are amphoteric, reacting with both acids (forming Al³⁺ salts) and strong bases (forming aluminate [Al(OH)₄]⁻). Na₂O and CaO are basic; SO₃ is acidic.',
      trap: 'Al₂O₃ reacts with both HCl and NaOH.'
    },
    {
      id: 12,
      q: 'In the Lanthanide series, the phenomenon responsible for the nearly identical atomic radii of Zr (4d) and Hf (5d) is called:',
      options: ['Inert pair effect', 'Lanthanide contraction', 'Diagonal relationship', 'Jahn-Teller distortion'],
      ans: 1,
      exp: '⭐ Lanthanide contraction (poor shielding by 4f electrons) causes a steady size reduction, making Period 5 (4d) and Period 6 (5d) elements almost identical in atomic radius.',
      trap: 'Lanthanide contraction explains why Zr ≈ Hf and Nb ≈ Ta.'
    }
  ];

  // ==========================================
  // 2. MASTERY SYSTEM (LOCALSTORAGE ENGINE)
  // ==========================================

  const STORAGE_KEY = 'MDCAT_PERIODIC_TABLE_MASTERY_V2';

  function getStoredMastery() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return {
      viewedTopics: [1, 2], // default start
      completedLabs: [],
      masteredCards: [],
      quizScores: { attempted: 0, score: 0, total: 12 },
      percentage: 15
    };
  }

  function saveMastery(mastery) {
    try {
      // Calculate mastery percentage dynamically
      // Formula: (Topics / 40 * 30%) + (Labs / 3 * 25%) + (Cards / 12 * 25%) + (QuizScore / Total * 20%)
      const topicWeight = (mastery.viewedTopics.length / 40) * 30;
      const labWeight = (mastery.completedLabs.length / 3) * 25;
      const cardWeight = (mastery.masteredCards.length / 12) * 25;
      const quizRatio = mastery.quizScores.attempted > 0 ? (mastery.quizScores.score / (mastery.quizScores.attempted || 1)) : 0;
      const quizWeight = Math.min(20, quizRatio * 20);

      mastery.percentage = Math.min(100, Math.round(topicWeight + labWeight + cardWeight + quizWeight));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mastery));
    } catch (e) {
      console.warn('Storage save error', e);
    }
    updateMasteryUI();
  }

  let currentMastery = getStoredMastery();

  function markTopicViewed(topicId) {
    if (!currentMastery.viewedTopics.includes(topicId)) {
      currentMastery.viewedTopics.push(topicId);
      saveMastery(currentMastery);
    }
  }

  function markLabCompleted(labId) {
    if (!currentMastery.completedLabs.includes(labId)) {
      currentMastery.completedLabs.push(labId);
      saveMastery(currentMastery);
    }
  }

  function toggleCardMastery(cardId) {
    const idx = currentMastery.masteredCards.indexOf(cardId);
    if (idx >= 0) {
      currentMastery.masteredCards.splice(idx, 1);
    } else {
      currentMastery.masteredCards.push(cardId);
    }
    saveMastery(currentMastery);
  }

  function recordQuizScore(score, total) {
    currentMastery.quizScores.attempted += total;
    currentMastery.quizScores.score += score;
    currentMastery.quizScores.lastScore = score;
    currentMastery.quizScores.total = total;
    saveMastery(currentMastery);
  }

  function updateMasteryUI() {
    const pctVal = currentMastery.percentage || 0;
    const pillText = document.getElementById('masteryPillText');
    const pillBar = document.getElementById('masteryPillBar');
    const dashboardPct = document.getElementById('dashMasteryPct');
    const dashTopics = document.getElementById('dashTopicsCount');
    const dashLabs = document.getElementById('dashLabsCount');
    const dashCards = document.getElementById('dashCardsCount');
    const dashQuiz = document.getElementById('dashQuizScore');

    if (pillText) pillText.textContent = `${pctVal}% Mastery`;
    if (pillBar) pillBar.style.width = `${pctVal}%`;
    if (dashboardPct) dashboardPct.textContent = `${pctVal}%`;
    if (dashTopics) dashTopics.textContent = `${currentMastery.viewedTopics.length} / 40`;
    if (dashLabs) dashLabs.textContent = `${currentMastery.completedLabs.length} / 3`;
    if (dashCards) dashCards.textContent = `${currentMastery.masteredCards.length} / 12`;
    if (dashQuiz) dashQuiz.textContent = `${currentMastery.quizScores.score} / ${currentMastery.quizScores.attempted || 12}`;
  }

  // ==========================================
  // 3. THEME SYSTEM
  // ==========================================

  function initTheme() {
    const savedTheme = localStorage.getItem('MDCAT_THEME') || 'light';
    setTheme(savedTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('MDCAT_THEME', theme);
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    if (themeIcon && themeLabel) {
      if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'Light Mode';
      } else {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'Dark Mode';
      }
    }
  }

  // ==========================================
  // 4. PERIODIC TABLE GRID RENDERING
  // ==========================================

  let currentTrend = 'none'; // 'none', 'radius', 'ie', 'en', 'metallic'
  let currentBlockFilter = 'all';

  function renderPeriodicTable() {
    const grid = document.getElementById('periodicGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Standard 1-118 element coordinates map for 18-column IUPAC table
    // Row 1 to 7 + Lanthanides (Row 8) + Actinides (Row 9)
    const elementsMap = new Map();
    ELEMENTS.forEach(el => elementsMap.set(el.z, el));

    // Full 118 element layout coordinate calculator
    for (let z = 1; z <= 118; z++) {
      let el = elementsMap.get(z);
      if (!el) {
        // Synthesize standard info for any superheavy element
        const p = z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : z <= 36 ? 4 : z <= 54 ? 5 : z <= 86 ? 6 : 7;
        el = {
          z: z,
          s: 'E' + z,
          n: 'Element ' + z,
          m: z * 2.1,
          p: p,
          g: (z % 18) + 1,
          b: 'd',
          c: 'transition-metal',
          ec: '[Core]',
          val: 2,
          ox: '+2',
          r: 140,
          ie: 650,
          en: 1.5,
          state: 'solid',
          tip: 'Heavy synthetic element.'
        };
      }

      // Calculate Grid Row and Column
      let row = el.p;
      let col = el.g;

      // Handle Lanthanides (57-71) and Actinides (89-103)
      let isLanthanideSeries = z >= 57 && z <= 71;
      let isActinideSeries = z >= 89 && z <= 103;

      if (isLanthanideSeries) {
        row = 9; // Lanthanide row below main table
        col = (z - 57) + 3;
      } else if (isActinideSeries) {
        row = 10; // Actinide row below main table
        col = (z - 89) + 3;
      }

      const cell = document.createElement('div');
      cell.className = `element-cell cat-${el.c}`;
      cell.style.gridRow = `${row}`;
      cell.style.gridColumn = `${col}`;
      cell.id = `el-cell-${el.z}`;

      // Trend heat coloration calculation
      let trendBadgeHTML = '';
      if (currentTrend === 'radius' && el.r) {
        trendBadgeHTML = `<div class="el-trend-val" style="background: rgba(14, 165, 233, 0.95);">${el.r} pm</div>`;
      } else if (currentTrend === 'ie' && el.ie) {
        trendBadgeHTML = `<div class="el-trend-val" style="background: rgba(220, 38, 38, 0.95);">${el.ie} kJ</div>`;
      } else if (currentTrend === 'en') {
        trendBadgeHTML = `<div class="el-trend-val" style="background: rgba(16, 185, 129, 0.95);">${el.en !== null && el.en !== undefined ? el.en : '—'}</div>`;
      } else if (currentTrend === 'metallic') {
        const isMet = el.c.includes('metal') && !el.c.includes('non');
        trendBadgeHTML = `<div class="el-trend-val" style="background: ${isMet ? '#0284c7' : '#e11d48'};">${isMet ? 'Metal' : 'Non-M'}</div>`;
      }

      cell.innerHTML = `
        <div class="el-header">
          <span>${el.z}</span>
          <span>${el.b}-blk</span>
        </div>
        <div class="el-symbol">${el.s}</div>
        <div class="el-name">${el.n}</div>
        ${trendBadgeHTML ? trendBadgeHTML : `<div class="el-mass">${typeof el.m === 'number' ? el.m.toFixed(1) : el.m}</div>`}
      `;

      cell.addEventListener('click', () => openElementModal(el));
      grid.appendChild(cell);
    }

    // Insert Lanthanides & Actinides Header Labels
    const laLabel = document.createElement('div');
    laLabel.className = 'f-block-label';
    laLabel.style.gridRow = '9';
    laLabel.style.gridColumn = '1 / 3';
    laLabel.innerHTML = 'Lanthanides 4f →';
    grid.appendChild(laLabel);

    const acLabel = document.createElement('div');
    acLabel.className = 'f-block-label';
    acLabel.style.gridRow = '10';
    acLabel.style.gridColumn = '1 / 3';
    acLabel.innerHTML = 'Actinides 5f →';
    grid.appendChild(acLabel);

    applyFilters();
  }

  function applyFilters() {
    const searchVal = (document.getElementById('elementSearchInput')?.value || '').toLowerCase().trim();

    ELEMENTS.forEach(el => {
      const cell = document.getElementById(`el-cell-${el.z}`);
      if (!cell) return;

      let matchesBlock = currentBlockFilter === 'all' ||
        (currentBlockFilter === 's' && el.b === 's') ||
        (currentBlockFilter === 'p' && el.b === 'p') ||
        (currentBlockFilter === 'd' && el.b === 'd') ||
        (currentBlockFilter === 'f' && el.b === 'f') ||
        (currentBlockFilter === 'grp1' && el.g === 1) ||
        (currentBlockFilter === 'grp2' && el.g === 2) ||
        (currentBlockFilter === 'grp17' && el.g === 17) ||
        (currentBlockFilter === 'grp18' && el.g === 18) ||
        (currentBlockFilter === 'metals' && el.c.includes('metal') && !el.c.includes('non')) ||
        (currentBlockFilter === 'nonmetals' && (el.c === 'nonmetal' || el.c === 'halogen' || el.c === 'noble-gas'));

      let matchesSearch = true;
      if (searchVal) {
        matchesSearch = el.n.toLowerCase().includes(searchVal) ||
          el.s.toLowerCase().includes(searchVal) ||
          el.z.toString() === searchVal;
      }

      if (matchesBlock && matchesSearch) {
        cell.classList.remove('dimmed');
        if (searchVal) cell.classList.add('highlighted');
        else cell.classList.remove('highlighted');
      } else {
        cell.classList.add('dimmed');
        cell.classList.remove('highlighted');
      }
    });
  }

  // ==========================================
  // 5. ATOM VISUALIZER CANVAS (BOHR MODEL)
  // ==========================================

  let atomAnimReqId = null;

  function renderAtomCanvas(element) {
    const canvas = document.getElementById('atomModalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 180;
    canvas.height = 180;

    // Determine electron shells from element period
    const shells = element.p || 2;
    const electrons = element.z;

    let angle = 0;
    if (atomAnimReqId) cancelAnimationFrame(atomAnimReqId);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Nucleus
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Nucleus Symbol & Charge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${element.s}+${element.z}`, cx, cy);

      // Draw Orbitals
      for (let s = 1; s <= shells; s++) {
        const radius = 28 + s * 16;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbiting Electrons (2 per shell for visualization)
        const eCount = s === 1 ? Math.min(electrons, 2) : Math.min(Math.max(0, electrons - 2), 4);
        for (let i = 0; i < eCount; i++) {
          const eAngle = angle * (s % 2 === 0 ? 1 : -1) * (1 / s) + (i * (Math.PI * 2 / eCount));
          const ex = cx + radius * Math.cos(eAngle);
          const ey = cy + radius * Math.sin(eAngle);

          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#0284c7';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      angle += 0.025;
      atomAnimReqId = requestAnimationFrame(draw);
    }
    draw();
  }

  // ==========================================
  // 6. ELEMENT DETAIL MODAL
  // ==========================================

  function openElementModal(el) {
    const modal = document.getElementById('elementModal');
    if (!modal) return;

    document.getElementById('modalElSymbol').textContent = el.s;
    document.getElementById('modalElName').textContent = `${el.n} (Z = ${el.z})`;
    document.getElementById('modalElConfig').textContent = el.ec || 'N/A';
    document.getElementById('modalElPeriod').textContent = el.p;
    document.getElementById('modalElGroup').textContent = el.g;
    document.getElementById('modalElBlock').textContent = `${el.b.toUpperCase()}-Block`;
    document.getElementById('modalElCategory').textContent = el.c.replace(/-/g, ' ').toUpperCase();
    document.getElementById('modalElValence').textContent = el.val;
    document.getElementById('modalElOxidation').textContent = el.ox || 'N/A';
    document.getElementById('modalElRadius').textContent = el.r ? `${el.r} pm` : 'N/A';
    document.getElementById('modalElIE').textContent = el.ie ? `${el.ie} kJ/mol` : 'N/A';
    document.getElementById('modalElEN').textContent = el.en !== null && el.en !== undefined ? el.en : 'N/A (Noble gas / Non-polar)';
    document.getElementById('modalElEA').textContent = el.ea !== undefined ? `${el.ea} kJ/mol` : 'N/A';
    document.getElementById('modalElTip').textContent = el.tip || 'Standard periodic properties apply.';

    const diagBox = document.getElementById('modalDiagonalWrap');
    if (el.diag) {
      diagBox.style.display = 'block';
      document.getElementById('modalDiagonalText').textContent = `⭐ Diagonal Relationship with ${el.diag}: Identical polarizing power (charge/size ratio).`;
    } else {
      diagBox.style.display = 'none';
    }

    modal.classList.add('active');
    renderAtomCanvas(el);
  }

  function closeElementModal() {
    const modal = document.getElementById('elementModal');
    if (modal) modal.classList.remove('active');
    if (atomAnimReqId) cancelAnimationFrame(atomAnimReqId);
  }

  // ==========================================
  // 7. MEMORY CARDS (FLASHCARDS)
  // ==========================================

  let currentCardFilter = 'all';

  function renderFlashcards() {
    const container = document.getElementById('flashcardsGrid');
    if (!container) return;
    container.innerHTML = '';

    const filtered = FLASHCARDS.filter(c => currentCardFilter === 'all' || c.category === currentCardFilter);

    filtered.forEach(card => {
      const isMastered = currentMastery.masteredCards.includes(card.id);
      const cardEl = document.createElement('div');
      cardEl.className = 'flip-card';
      cardEl.id = `card-wrap-${card.id}`;

      cardEl.innerHTML = `
        <div class="flip-card-inner">
          <!-- FRONT -->
          <div class="flip-card-front">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-tag">${card.badge}</span>
                <span style="font-size: 1rem; color: ${isMastered ? '#16a34a' : '#94a3b8'};">
                  ${isMastered ? '✓ Mastered' : '○ Unmastered'}
                </span>
              </div>
              <div class="card-concept-title">${card.concept}</div>
              <div class="card-subtext">${card.subtext}</div>
            </div>

            <div class="card-examples-pill">
              💡 Elements: ${card.elements}
            </div>

            <div class="card-hint-click">
              <span>👆 Click card to flip definition & MDCAT tip</span>
              <span>🔄</span>
            </div>
          </div>

          <!-- BACK -->
          <div class="flip-card-back">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="card-tag" style="background: rgba(22, 163, 74, 0.15); color: #16a34a;">MDCAT BACK</span>
                <button class="action-btn card-mastery-btn" style="padding: 3px 8px; font-size: 0.75rem;" data-cardid="${card.id}">
                  ${isMastered ? 'Mark Incomplete' : '⭐ Mark Mastered'}
                </button>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-primary); margin-top: 8px; line-height: 1.45;">
                ${card.definition}
              </p>
              <div class="card-tip-box">${card.mdcatTip}</div>
            </div>

            <div>
              <ul class="card-points-list">
                ${card.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;

      // Flip toggle
      cardEl.addEventListener('click', (e) => {
        if (e.target.closest('.card-mastery-btn')) return; // ignore button
        cardEl.classList.toggle('is-flipped');
      });

      // Mastery button event
      const masteryBtn = cardEl.querySelector('.card-mastery-btn');
      if (masteryBtn) {
        masteryBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleCardMastery(card.id);
          renderFlashcards();
          triggerMiniConfetti();
        });
      }

      container.appendChild(cardEl);
    });
  }

  // ==========================================
  // 8. INTERACTIVE TREND LABS & ANIMATIONS
  // ==========================================

  let labAnimId = null;

  function initTrendLabs() {
    const periodSlider = document.getElementById('periodSlider');
    const groupSlider = document.getElementById('groupSlider');

    if (periodSlider) {
      periodSlider.addEventListener('input', () => {
        drawPeriodTrendLab(parseInt(periodSlider.value, 10));
        markLabCompleted('lab-period-radius');
      });
    }

    if (groupSlider) {
      groupSlider.addEventListener('input', () => {
        drawGroupTrendLab(parseInt(groupSlider.value, 10));
        markLabCompleted('lab-group-ie');
      });
    }

    drawPeriodTrendLab(3); // default Period 3
    drawGroupTrendLab(1);  // default Group 1
  }

  function drawPeriodTrendLab(periodNum) {
    const canvas = document.getElementById('periodLabCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 240;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Period 2: Li, Be, B, C, N, O, F, Ne
    // Period 3: Na, Mg, Al, Si, P, S, Cl, Ar
    const elementsList = periodNum === 2 ?
      [
        { s: 'Li', z: 3, r: 152, ie: 520, zeff: 1.3 },
        { s: 'Be', z: 4, r: 112, ie: 899, zeff: 1.9 },
        { s: 'B',  z: 5, r: 85,  ie: 801, zeff: 2.6 },
        { s: 'C',  z: 6, r: 77,  ie: 1086, zeff: 3.25 },
        { s: 'N',  z: 7, r: 75,  ie: 1402, zeff: 3.9 },
        { s: 'O',  z: 8, r: 73,  ie: 1314, zeff: 4.55 },
        { s: 'F',  z: 9, r: 71,  ie: 1681, zeff: 5.2 },
        { s: 'Ne', z: 10, r: 69, ie: 2080, zeff: 5.85 }
      ] :
      [
        { s: 'Na', z: 11, r: 186, ie: 496, zeff: 2.2 },
        { s: 'Mg', z: 12, r: 160, ie: 738, zeff: 2.85 },
        { s: 'Al', z: 13, r: 143, ie: 578, zeff: 3.5 },
        { s: 'Si', z: 14, r: 118, ie: 786, zeff: 4.15 },
        { s: 'P',  z: 15, r: 110, ie: 1012, zeff: 4.8 },
        { s: 'S',  z: 16, r: 102, ie: 1000, zeff: 5.45 },
        { s: 'Cl', z: 17, r: 99,  ie: 1251, zeff: 6.1 },
        { s: 'Ar', z: 18, r: 97,  ie: 1520, zeff: 6.75 }
      ];

    const step = canvas.width / (elementsList.length + 1);

    // Title banner
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`Period ${periodNum} Atomic Radius Shrinking vs Nuclear Charge (Zeff Increasing)`, canvas.width / 2, 20);

    elementsList.forEach((el, idx) => {
      const cx = (idx + 1) * step;
      const cy = 110;
      const radiusPixel = Math.max(14, el.r * 0.28);

      // Outer electron cloud circle
      ctx.beginPath();
      ctx.arc(cx, cy, radiusPixel, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(2, 132, 199, 0.15)';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Element Symbol
      ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(el.s, cx, cy - radiusPixel - 8);

      // Radius in pm
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText(`${el.r} pm`, cx, cy + radiusPixel + 16);

      // Zeff Value
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px monospace';
      ctx.fillText(`Z=${el.z}`, cx, cy + radiusPixel + 28);
    });

    // Trend summary indicator
    const sliderLabel = document.getElementById('periodSliderLabel');
    if (sliderLabel) {
      sliderLabel.textContent = `Period ${periodNum}: ${elementsList[0].s} (${elementsList[0].r}pm) ➔ ${elementsList[elementsList.length - 1].s} (${elementsList[elementsList.length - 1].r}pm) — Radius DECREASES by ${elementsList[0].r - elementsList[elementsList.length - 1].r} pm`;
    }
  }

  function drawGroupTrendLab(groupNum) {
    const canvas = document.getElementById('groupLabCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 240;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Group 1: Li, Na, K, Rb, Cs
    // Group 17: F, Cl, Br, I
    const elementsList = groupNum === 1 ?
      [
        { s: 'Li', p: 2, r: 152, ie: 520, shells: 2 },
        { s: 'Na', p: 3, r: 186, ie: 496, shells: 3 },
        { s: 'K',  p: 4, r: 227, ie: 419, shells: 4 },
        { s: 'Rb', p: 5, r: 248, ie: 403, shells: 5 },
        { s: 'Cs', p: 6, r: 265, ie: 376, shells: 6 }
      ] :
      [
        { s: 'F',  p: 2, r: 71,  ie: 1681, shells: 2 },
        { s: 'Cl', p: 3, r: 99,  ie: 1251, shells: 3 },
        { s: 'Br', p: 4, r: 114, ie: 1140, shells: 4 },
        { s: 'I',  p: 5, r: 133, ie: 1008, shells: 5 }
      ];

    const step = canvas.width / (elementsList.length + 1);

    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`Group ${groupNum === 1 ? '1 (Alkali Metals)' : '17 (Halogens)'}: Shell Addition & Shielding Expansion Down the Group`, canvas.width / 2, 20);

    elementsList.forEach((el, idx) => {
      const cx = (idx + 1) * step;
      const cy = 110;
      const radiusPixel = Math.max(14, el.r * 0.22);

      // Draw concentric shells for shielding effect visual
      for (let s = 1; s <= el.shells; s++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radiusPixel / el.shells) * s, 0, Math.PI * 2);
        ctx.strokeStyle = s === el.shells ? '#10b981' : isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.25)';
        ctx.stroke();
      }

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Symbol
      ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      ctx.font = 'bold 13px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(el.s, cx, cy - radiusPixel - 8);

      // IE value
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText(`IE: ${el.ie} kJ`, cx, cy + radiusPixel + 16);

      // Shells count
      ctx.fillStyle = '#10b981';
      ctx.font = '10px system-ui';
      ctx.fillText(`${el.shells} Shells (n=${el.p})`, cx, cy + radiusPixel + 28);
    });

    const sliderLabel = document.getElementById('groupSliderLabel');
    if (sliderLabel) {
      sliderLabel.textContent = `Group ${groupNum === 1 ? '1' : '17'}: Top (${elementsList[0].s}, IE=${elementsList[0].ie}kJ) ➔ Bottom (${elementsList[elementsList.length - 1].s}, IE=${elementsList[elementsList.length - 1].ie}kJ) — Ionization Energy DECREASES by ${elementsList[0].ie - elementsList[elementsList.length - 1].ie} kJ`;
    }
  }

  // ==========================================
  // 9. 40 MDCAT DETAILED NOTES & TRAPS
  // ==========================================

  let currentTopicId = 1;

  function renderNotesNav() {
    const list = document.getElementById('notesNavList');
    if (!list) return;
    list.innerHTML = '';

    NOTES_TOPICS.forEach(topic => {
      const isViewed = currentMastery.viewedTopics.includes(topic.id);
      const li = document.createElement('li');
      li.className = `notes-nav-item ${topic.id === currentTopicId ? 'active' : ''}`;
      li.innerHTML = `
        <span>${topic.title}</span>
        <span style="font-size: 0.7rem; color: ${isViewed ? '#16a34a' : 'var(--text-muted)'};">${isViewed ? '✓' : '○'}</span>
      `;
      li.addEventListener('click', () => {
        currentTopicId = topic.id;
        markTopicViewed(topic.id);
        renderNotesNav();
        renderActiveNote();
      });
      list.appendChild(li);
    });
  }

  function renderActiveNote() {
    const note = NOTES_TOPICS.find(t => t.id === currentTopicId) || NOTES_TOPICS[0];
    const container = document.getElementById('activeNoteContent');
    if (!container) return;

    let trapHTML = '';
    if (note.mdcatTrap) {
      trapHTML = `
        <div class="note-trap-alert">
          <div style="font-weight: 700; color: #dc2626; margin-bottom: 4px;">🚨 MDCAT HIGH-YIELD TRAP</div>
          <div>${note.mdcatTrap}</div>
        </div>
      `;
    }

    let tipHTML = '';
    if (note.mdcatTip) {
      tipHTML = `
        <div class="note-tip-highlight">
          <div style="font-weight: 700; color: #d97706; margin-bottom: 4px;">💡 MDCAT EXAM TIP</div>
          <div>${note.mdcatTip}</div>
        </div>
      `;
    }

    let formulaHTML = '';
    if (note.keyFormula) {
      formulaHTML = `
        <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); padding: 10px 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-weight: 700; margin: 12px 0;">
          📐 Key Formula: ${note.keyFormula}
        </div>
      `;
    }

    let masterTableHTML = '';
    if (note.id === 40) {
      masterTableHTML = `
        <table class="master-trend-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Across a Period (→)</th>
              <th>Down a Group (↓)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Atomic radius</strong></td><td style="color:#ef4444;">Decreases ↓</td><td style="color:#10b981;">Increases ↑</td></tr>
            <tr><td><strong>Ionization energy</strong></td><td style="color:#10b981;">Increases ↑</td><td style="color:#ef4444;">Decreases ↓</td></tr>
            <tr><td><strong>Electronegativity</strong></td><td style="color:#10b981;">Increases ↑</td><td style="color:#ef4444;">Decreases ↓</td></tr>
            <tr><td><strong>Electron Affinity</strong></td><td style="color:#10b981;">Increases ↑ (Cl > F)</td><td style="color:#ef4444;">Decreases ↓</td></tr>
            <tr><td><strong>Metallic character</strong></td><td style="color:#ef4444;">Decreases ↓</td><td style="color:#10b981;">Increases ↑</td></tr>
            <tr><td><strong>Non-metallic character</strong></td><td style="color:#10b981;">Increases ↑</td><td style="color:#ef4444;">Decreases ↓</td></tr>
            <tr><td><strong>Shielding effect</strong></td><td>Nearly similar / Constant</td><td style="color:#10b981;">Increases ↑</td></tr>
            <tr><td><strong>Nuclear charge (Z)</strong></td><td style="color:#10b981;">Increases ↑</td><td style="color:#10b981;">Increases ↑</td></tr>
          </tbody>
        </table>
      `;
    }

    container.innerHTML = `
      <span class="note-section-badge">${note.section}</span>
      <h2 class="note-main-title">${note.title}</h2>
      ${note.content.map(p => `<p class="note-body-paragraph">${p}</p>`).join('')}
      ${formulaHTML}
      ${masterTableHTML}
      ${tipHTML}
      ${trapHTML}
      <div style="display: flex; justify-content: space-between; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
        <button class="action-btn" id="prevNoteBtn" ${note.id === 1 ? 'disabled' : ''}>← Previous Topic</button>
        <button class="btn-primary" id="nextNoteBtn" ${note.id === 40 ? 'disabled' : ''}>Next Topic →</button>
      </div>
    `;

    document.getElementById('prevNoteBtn')?.addEventListener('click', () => {
      if (currentTopicId > 1) {
        currentTopicId--;
        markTopicViewed(currentTopicId);
        renderNotesNav();
        renderActiveNote();
      }
    });

    document.getElementById('nextNoteBtn')?.addEventListener('click', () => {
      if (currentTopicId < 40) {
        currentTopicId++;
        markTopicViewed(currentTopicId);
        renderNotesNav();
        renderActiveNote();
      }
    });
  }

  // ==========================================
  // 10. PRACTICE MCQS & TEST ENGINE
  // ==========================================

  let currentQuizIndex = 0;
  let currentQuizScore = 0;
  let quizAnswered = false;

  function renderMCQQuiz() {
    const q = MCQ_QUESTIONS[currentQuizIndex];
    const container = document.getElementById('mcqQuizContainer');
    if (!container || !q) return;

    const progressPct = ((currentQuizIndex) / MCQ_QUESTIONS.length) * 100;
    const progressBar = document.getElementById('quizProgressBar');
    if (progressBar) progressBar.style.width = `${progressPct}%`;

    const qNum = document.getElementById('quizQuestionNumber');
    if (qNum) qNum.textContent = `Question ${currentQuizIndex + 1} of ${MCQ_QUESTIONS.length}`;

    const scoreDisplay = document.getElementById('quizLiveScore');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${currentQuizScore} / ${currentQuizIndex}`;

    document.getElementById('quizQuestionText').textContent = q.q;

    const optionsList = document.getElementById('quizOptionsList');
    optionsList.innerHTML = '';
    quizAnswered = false;

    const expBox = document.getElementById('quizExplanationBox');
    expBox.style.display = 'none';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option-btn';
      btn.innerHTML = `<strong>${String.fromCharCode(65 + idx)}.</strong> <span>${opt}</span>`;

      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        quizAnswered = true;

        const isCorrect = idx === q.ans;
        if (isCorrect) {
          btn.classList.add('correct');
          currentQuizScore++;
          triggerMiniConfetti();
        } else {
          btn.classList.add('wrong');
          // Highlight correct answer
          optionsList.children[q.ans]?.classList.add('correct');
        }

        // Show explanation
        expBox.style.display = 'block';
        expBox.innerHTML = `
          <div style="font-weight: 700; color: ${isCorrect ? '#16a34a' : '#dc2626'}; margin-bottom: 6px;">
            ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Choice'}
          </div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${q.exp}</div>
          ${q.trap ? `<div style="margin-top: 8px; font-size: 0.82rem; color: #d97706; font-weight: 600;">🚨 ${q.trap}</div>` : ''}
          <div style="margin-top: 14px; text-align: right;">
            <button class="btn-primary" id="nextQuestionBtn">
              ${currentQuizIndex < MCQ_QUESTIONS.length - 1 ? 'Next Question →' : 'View Final Summary 🏆'}
            </button>
          </div>
        `;

        document.getElementById('nextQuestionBtn')?.addEventListener('click', () => {
          if (currentQuizIndex < MCQ_QUESTIONS.length - 1) {
            currentQuizIndex++;
            renderMCQQuiz();
          } else {
            showQuizCompleted();
          }
        });
      });

      optionsList.appendChild(btn);
    });
  }

  function showQuizCompleted() {
    const container = document.getElementById('mcqQuizContainer');
    if (!container) return;

    recordQuizScore(currentQuizScore, MCQ_QUESTIONS.length);
    triggerFullConfetti();

    const percentage = Math.round((currentQuizScore / MCQ_QUESTIONS.length) * 100);

    container.innerHTML = `
      <div style="text-align: center; padding: 24px 0;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🎓</div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">MDCAT Quiz Completed!</h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin: 8px 0 16px;">
          You scored <strong>${currentQuizScore}</strong> out of <strong>${MCQ_QUESTIONS.length}</strong> (${percentage}%)
        </p>

        <div style="display: inline-block; padding: 8px 18px; border-radius: var(--radius-full); background: ${percentage >= 80 ? 'rgba(22, 163, 74, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; color: ${percentage >= 80 ? '#16a34a' : '#d97706'}; font-weight: 700; margin-bottom: 20px;">
          ${percentage >= 80 ? '⭐ Excellent! MDCAT Periodic Chemistry Ready' : '📚 Good Effort! Review High-Yield Traps & Retry'}
        </div>

        <div style="display: flex; justify-content: center; gap: 12px;">
          <button class="btn-primary" id="restartQuizBtn">Retake Quiz</button>
          <button class="btn-secondary" id="quizGoTrapsBtn">Study Traps</button>
        </div>
      </div>
    `;

    document.getElementById('restartQuizBtn')?.addEventListener('click', () => {
      currentQuizIndex = 0;
      currentQuizScore = 0;
      renderMCQQuiz();
    });

    document.getElementById('quizGoTrapsBtn')?.addEventListener('click', () => {
      switchTab('traps');
    });
  }

  // ==========================================
  // 11. HIGH-YIELD TRAPS & MEMORY MAP VIEW
  // ==========================================

  function renderTrapsView() {
    const list = document.getElementById('trapsListGrid');
    if (!list) return;
    list.innerHTML = '';

    MDCAT_TRAPS_LIST.forEach((trap, idx) => {
      const card = document.createElement('div');
      card.className = 'stat-box';
      card.style.padding = '14px 16px';
      card.innerHTML = `
        <div style="font-weight: 700; color: #dc2626; font-size: 0.875rem; margin-bottom: 4px;">
          🚨 ${trap.title}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
          ${trap.text}
        </div>
      `;
      list.appendChild(card);
    });
  }

  // ==========================================
  // 12. TAB SWITCHING SYSTEM
  // ==========================================

  function switchTab(targetViewId) {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === targetViewId);
    });

    document.querySelectorAll('.view-container').forEach(view => {
      view.classList.toggle('active', view.id === `view-${targetViewId}`);
    });

    if (targetViewId === 'labs') {
      setTimeout(initTrendLabs, 50);
    }
  }

  // ==========================================
  // 13. CONFETTI EFFECT
  // ==========================================

  function triggerMiniConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  }

  function triggerFullConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  }

  // ==========================================
  // 14. EVENT LISTENERS & INITIALIZATION
  // ==========================================

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateMasteryUI();
    renderPeriodicTable();
    renderFlashcards();
    renderNotesNav();
    renderActiveNote();
    renderMCQQuiz();
    renderTrapsView();

    // Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        if (viewId) switchTab(viewId);
      });
    });

    // Block Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBlockFilter = btn.getAttribute('data-block') || 'all';
        applyFilters();
      });
    });

    // Element Search Input
    const searchInput = document.getElementById('elementSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        applyFilters();
      });
    }

    // Trend Heatmap Buttons
    document.querySelectorAll('.trend-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.trend-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTrend = btn.getAttribute('data-trend') || 'none';
        renderPeriodicTable();
      });
    });

    // Flashcard Category Filter Buttons
    document.querySelectorAll('.card-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.card-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCardFilter = btn.getAttribute('data-cat') || 'all';
        renderFlashcards();
      });
    });

    // Modal Close
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeElementModal);
    document.getElementById('elementModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'elementModal') closeElementModal();
    });

    // Reset Progress Button
    document.getElementById('resetMasteryBtn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all your MDCAT study progress and test scores?')) {
        currentMastery = {
          viewedTopics: [1],
          completedLabs: [],
          masteredCards: [],
          quizScores: { attempted: 0, score: 0, total: 12 },
          percentage: 0
        };
        saveMastery(currentMastery);
        renderFlashcards();
        renderNotesNav();
        renderActiveNote();
        alert('Mastery progress reset.');
      }
    });

    // Window Resize handler for canvas
    window.addEventListener('resize', () => {
      const activeView = document.querySelector('.view-container.active');
      if (activeView && activeView.id === 'view-labs') {
        const periodSlider = document.getElementById('periodSlider');
        const groupSlider = document.getElementById('groupSlider');
        if (periodSlider) drawPeriodTrendLab(parseInt(periodSlider.value, 10));
        if (groupSlider) drawGroupTrendLab(parseInt(groupSlider.value, 10));
      }
    });
  });

})();
