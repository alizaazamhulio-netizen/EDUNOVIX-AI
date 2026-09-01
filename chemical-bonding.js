/**
 * CHEMICAL BONDING — MDCAT CHEMISTRY INTERACTIVE ENGINE
 * Pure Vanilla JavaScript (No inline scripts, No external framework dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DATA DEFINITIONS (MDCAT Syllabus Compliant)
  // =========================================================================

  // Periodic Table Electronegativity Data
  const elementsData = {
    H: { name: 'Hydrogen', z: 1, en: 2.20, config: '1s¹', period: 1, group: 'IA', val: 1, type: 'Non-metal', role: 'Forms 1 covalent bond or H⁺ ion' },
    Li: { name: 'Lithium', z: 3, en: 0.98, config: '[He] 2s¹', period: 2, group: 'IA', val: 1, type: 'Alkali Metal', role: 'Forms Li⁺ cation in ionic bonds' },
    Be: { name: 'Beryllium', z: 4, en: 1.57, config: '[He] 2s²', period: 2, group: 'IIA', val: 2, type: 'Alkaline Earth', role: 'Forms sp hybrid covalent/ionic compounds' },
    B: { name: 'Boron', z: 5, en: 2.04, config: '[He] 2s² 2p¹', period: 2, group: 'IIIA', val: 3, type: 'Metalloid', role: 'Forms sp² trigonal planar (incomplete octet in BF₃)' },
    C: { name: 'Carbon', z: 6, en: 2.55, config: '[He] 2s² 2p²', period: 2, group: 'IVA', val: 4, type: 'Non-metal', role: 'Forms 4 covalent bonds (sp, sp², sp³)' },
    N: { name: 'Nitrogen', z: 7, en: 3.04, config: '[He] 2s² 2p³', period: 2, group: 'VA', val: 5, type: 'Non-metal', role: 'Forms 3 bonds + 1 lone pair (H-bonding capable)' },
    O: { name: 'Oxygen', z: 8, en: 3.44, config: '[He] 2s² 2p⁴', period: 2, group: 'VIA', val: 6, type: 'Non-metal', role: '2nd highest EN, forms 2 bonds + 2 lone pairs' },
    F: { name: 'Fluorine', z: 9, en: 3.98, config: '[He] 2s² 2p⁵', period: 2, group: 'VIIA', val: 7, type: 'Halogen', role: 'Most electronegative element in periodic table (4.0)' },
    Na: { name: 'Sodium', z: 11, en: 0.93, config: '[Ne] 3s¹', period: 3, group: 'IA', val: 1, type: 'Alkali Metal', role: 'Readily loses 3s¹ electron to form stable Na⁺' },
    Mg: { name: 'Magnesium', z: 12, en: 1.31, config: '[Ne] 3s²', period: 3, group: 'IIA', val: 2, type: 'Alkaline Earth', role: 'Loses 2 electrons to form Mg²⁺ in ionic lattices' },
    Al: { name: 'Aluminium', z: 13, en: 1.61, config: '[Ne] 3s² 3p¹', period: 3, group: 'IIIA', val: 3, type: 'Metal', role: 'Forms Al³⁺ or electron-deficient AlCl₃ dimer' },
    Si: { name: 'Silicon', z: 14, en: 1.90, config: '[Ne] 3s² 3p²', period: 3, group: 'IVA', val: 4, type: 'Metalloid', role: 'Forms giant covalent network structures (SiO₂)' },
    P: { name: 'Phosphorus', z: 15, en: 2.19, config: '[Ne] 3s² 3p³', period: 3, group: 'VA', val: 5, type: 'Non-metal', role: 'Expands octet in PCl₅ utilizing vacant 3d orbitals' },
    S: { name: 'Sulfur', z: 16, en: 2.58, config: '[Ne] 3s² 3p⁴', period: 3, group: 'VIA', val: 6, type: 'Non-metal', role: 'Expands octet in SF₆ with sp³d² hybridization' },
    Cl: { name: 'Chlorine', z: 17, en: 3.16, config: '[Ne] 3s² 3p⁵', period: 3, group: 'VIIA', val: 7, type: 'Halogen', role: 'Strong electron acceptor, forms Cl⁻ or covalent single bonds' },
    K: { name: 'Potassium', z: 19, en: 0.82, config: '[Ar] 4s¹', period: 4, group: 'IA', val: 1, type: 'Alkali Metal', role: 'Very electropositive metal, forms ionic K⁺ salts' },
    Br: { name: 'Bromine', z: 35, en: 2.96, config: '[Ar] 3d¹⁰ 4s² 4p⁵', period: 4, group: 'VIIA', val: 7, type: 'Halogen', role: 'Liquid non-metal held by strong London dispersion forces' },
    I: { name: 'Iodine', z: 53, en: 2.66, config: '[Kr] 4d¹⁰ 5s² 5p⁵', period: 5, group: 'VIIA', val: 7, type: 'Halogen', role: 'Solid halogen with large polarizability and strong LDF' }
  };

  // Lewis Structure Builder Database
  const lewisDatabase = {
    H2: {
      name: 'Hydrogen Molecule (H₂)',
      formula: 'H₂',
      valenceTotal: 2,
      valenceBreakdown: '2 × H (1e⁻) = 2 valence e⁻',
      centralAtom: 'None (Diatomic)',
      bp: 1,
      lp: 0,
      octetStatus: 'Duet rule satisfied for both H atoms (2e⁻ each)',
      geometry: 'Linear',
      svg: `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <circle cx="60" cy="50" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="60" y="56" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="18" fill="#0369a1" text-anchor="middle">H</text>
          <line x1="82" y1="50" x2="118" y2="50" stroke="#0f172a" stroke-width="3" />
          <circle cx="140" cy="50" r="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="140" y="56" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="18" fill="#0369a1" text-anchor="middle">H</text>
        </svg>`,
      steps: [
        'Count total valence electrons: H (1) + H (1) = 2e⁻.',
        'Draw single covalent bond (1 shared electron pair) between the two H atoms.',
        'Total 2 electrons used. Both hydrogen atoms have achieved a stable helium-like duet.'
      ]
    },
    Cl2: {
      name: 'Chlorine Molecule (Cl₂)',
      formula: 'Cl₂',
      valenceTotal: 14,
      valenceBreakdown: '2 × Cl (7e⁻) = 14 valence e⁻',
      centralAtom: 'None (Diatomic)',
      bp: 1,
      lp: 6,
      octetStatus: 'Octet rule satisfied for both Cl atoms (8e⁻ each)',
      geometry: 'Linear',
      svg: `
        <svg viewBox="0 0 220 120" width="220" height="120">
          <!-- Left Cl -->
          <circle cx="65" cy="60" r="24" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
          <text x="65" y="66" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">Cl</text>
          <!-- Lone pairs on left Cl -->
          <circle cx="45" cy="40" r="3" fill="#f59e0b" /><circle cx="55" cy="35" r="3" fill="#f59e0b" />
          <circle cx="35" cy="60" r="3" fill="#f59e0b" /><circle cx="35" cy="70" r="3" fill="#f59e0b" />
          <circle cx="45" cy="85" r="3" fill="#f59e0b" /><circle cx="55" cy="90" r="3" fill="#f59e0b" />
          <!-- Single Bond -->
          <line x1="89" y1="60" x2="131" y2="60" stroke="#0f172a" stroke-width="3" />
          <!-- Right Cl -->
          <circle cx="155" cy="60" r="24" fill="#ecfdf5" stroke="#059669" stroke-width="2" />
          <text x="155" y="66" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#065f46" text-anchor="middle">Cl</text>
          <!-- Lone pairs on right Cl -->
          <circle cx="165" cy="35" r="3" fill="#f59e0b" /><circle cx="175" cy="40" r="3" fill="#f59e0b" />
          <circle cx="185" cy="60" r="3" fill="#f59e0b" /><circle cx="185" cy="70" r="3" fill="#f59e0b" />
          <circle cx="165" cy="90" r="3" fill="#f59e0b" /><circle cx="175" cy="85" r="3" fill="#f59e0b" />
        </svg>`,
      steps: [
        'Count total valence electrons: 2 × Cl (7) = 14e⁻.',
        'Place single bond between Cl atoms: 14 - 2 = 12 electrons remaining.',
        'Distribute 6 non-bonding electrons (3 lone pairs) to each Cl atom to complete octets.'
      ]
    },
    H2O: {
      name: 'Water Molecule (H₂O)',
      formula: 'H₂O',
      valenceTotal: 8,
      valenceBreakdown: 'O (6e⁻) + 2 × H (1e⁻) = 8 valence e⁻',
      centralAtom: 'Oxygen (O)',
      bp: 2,
      lp: 2,
      octetStatus: 'Oxygen: Octet (8e⁻), Hydrogen: Duet (2e⁻)',
      geometry: 'Bent / V-shaped (~104.5°)',
      svg: `
        <svg viewBox="0 0 200 150" width="200" height="150">
          <!-- Central O -->
          <circle cx="100" cy="60" r="26" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.5" />
          <text x="100" y="67" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="18" fill="#0f766e" text-anchor="middle">O</text>
          <!-- Lone Pairs on O -->
          <circle cx="92" cy="28" r="3" fill="#f59e0b" /><circle cx="108" cy="28" r="3" fill="#f59e0b" />
          <circle cx="70" cy="48" r="3" fill="#f59e0b" /><circle cx="66" cy="62" r="3" fill="#f59e0b" />
          <!-- Bonds to H -->
          <line x1="82" y1="78" x2="55" y2="108" stroke="#0f172a" stroke-width="3" />
          <line x1="118" y1="78" x2="145" y2="108" stroke="#0f172a" stroke-width="3" />
          <!-- Hydrogens -->
          <circle cx="45" cy="118" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="45" y="123" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="14" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="155" cy="118" r="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="155" y="123" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="14" fill="#0369a1" text-anchor="middle">H</text>
        </svg>`,
      steps: [
        'Total valence electrons = 6 (from O) + 2(1 from H) = 8e⁻.',
        'Select O as central atom (H can only form single bond).',
        'Connect O to each H with single bond: 2 bonds × 2e⁻ = 4e⁻ used.',
        'Place remaining 4e⁻ as 2 lone pairs on central Oxygen.',
        'Oxygen has 2 bonding pairs + 2 lone pairs = 8e⁻ octet complete.'
      ]
    },
    NH3: {
      name: 'Ammonia Molecule (NH₃)',
      formula: 'NH₃',
      valenceTotal: 8,
      valenceBreakdown: 'N (5e⁻) + 3 × H (1e⁻) = 8 valence e⁻',
      centralAtom: 'Nitrogen (N)',
      bp: 3,
      lp: 1,
      octetStatus: 'Nitrogen: Octet (8e⁻), Hydrogen: Duet (2e⁻)',
      geometry: 'Trigonal Pyramidal (~107°)',
      svg: `
        <svg viewBox="0 0 200 160" width="200" height="160">
          <!-- Central N -->
          <circle cx="100" cy="65" r="26" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" />
          <text x="100" y="72" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="18" fill="#6d28d9" text-anchor="middle">N</text>
          <!-- Lone Pair on Top -->
          <circle cx="94" cy="30" r="3.5" fill="#f59e0b" /><circle cx="106" cy="30" r="3.5" fill="#f59e0b" />
          <!-- Bonds -->
          <line x1="80" y1="80" x2="45" y2="120" stroke="#0f172a" stroke-width="3" />
          <line x1="100" y1="91" x2="100" y2="128" stroke="#0f172a" stroke-width="3" />
          <line x1="120" y1="80" x2="155" y2="120" stroke="#0f172a" stroke-width="3" />
          <!-- Hydrogens -->
          <circle cx="35" cy="130" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="35" y="135" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="100" cy="140" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="100" y="145" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="165" cy="130" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="165" y="135" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
        </svg>`,
      steps: [
        'Total valence electrons = 5 (from N) + 3(1 from H) = 8e⁻.',
        'Nitrogen is central atom, bonded to 3 surrounding H atoms.',
        'Form 3 single N–H bonds = 6e⁻ used. Remaining = 2e⁻.',
        'Place remaining 2 electrons as 1 lone pair on central Nitrogen atom.',
        'Octet complete on N (3 BP + 1 LP = 8e⁻).'
      ]
    },
    CH4: {
      name: 'Methane Molecule (CH₄)',
      formula: 'CH₄',
      valenceTotal: 8,
      valenceBreakdown: 'C (4e⁻) + 4 × H (1e⁻) = 8 valence e⁻',
      centralAtom: 'Carbon (C)',
      bp: 4,
      lp: 0,
      octetStatus: 'Carbon: Octet (8e⁻), Hydrogen: Duet (2e⁻)',
      geometry: 'Tetrahedral (109.5°)',
      svg: `
        <svg viewBox="0 0 200 180" width="200" height="180">
          <!-- Central C -->
          <circle cx="100" cy="90" r="26" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" />
          <text x="100" y="97" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="18" fill="#0f172a" text-anchor="middle">C</text>
          <!-- 4 Bonds -->
          <line x1="100" y1="64" x2="100" y2="35" stroke="#0f172a" stroke-width="3" />
          <line x1="74" y1="90" x2="45" y2="90" stroke="#0f172a" stroke-width="3" />
          <line x1="126" y1="90" x2="155" y2="90" stroke="#0f172a" stroke-width="3" />
          <line x1="100" y1="116" x2="100" y2="145" stroke="#0f172a" stroke-width="3" />
          <!-- 4 Hydrogens -->
          <circle cx="100" cy="22" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="100" y="27" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="30" cy="90" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="30" y="95" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="170" cy="90" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="170" y="95" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="100" cy="158" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
          <text x="100" y="163" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#0369a1" text-anchor="middle">H</text>
        </svg>`,
      steps: [
        'Total valence electrons = 4 (from C) + 4(1 from H) = 8e⁻.',
        'Carbon is central atom, connects to 4 hydrogen atoms.',
        'Form 4 single C–H bonds = 8e⁻ used. Remaining = 0e⁻.',
        'Zero lone pairs on carbon. Octet is fully satisfied with 4 bonding pairs.'
      ]
    },
    CO2: {
      name: 'Carbon Dioxide (CO₂)',
      formula: 'CO₂',
      valenceTotal: 16,
      valenceBreakdown: 'C (4e⁻) + 2 × O (6e⁻) = 16 valence e⁻',
      centralAtom: 'Carbon (C)',
      bp: 4,
      lp: 4,
      octetStatus: 'Carbon: Octet (8e⁻, two double bonds), Oxygens: Octet (8e⁻)',
      geometry: 'Linear (180°)',
      svg: `
        <svg viewBox="0 0 240 100" width="240" height="100">
          <!-- Left O -->
          <circle cx="45" cy="50" r="24" fill="#ccfbf1" stroke="#0d9488" stroke-width="2" />
          <text x="45" y="56" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#0f766e" text-anchor="middle">O</text>
          <circle cx="30" cy="30" r="3" fill="#f59e0b" /><circle cx="40" cy="24" r="3" fill="#f59e0b" />
          <circle cx="30" cy="70" r="3" fill="#f59e0b" /><circle cx="40" cy="76" r="3" fill="#f59e0b" />
          <!-- Double Bond Left -->
          <line x1="69" y1="46" x2="95" y2="46" stroke="#0f172a" stroke-width="3" />
          <line x1="69" y1="54" x2="95" y2="54" stroke="#0f172a" stroke-width="3" />
          <!-- Central C -->
          <circle cx="120" cy="50" r="24" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" />
          <text x="120" y="56" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#0f172a" text-anchor="middle">C</text>
          <!-- Double Bond Right -->
          <line x1="145" y1="46" x2="171" y2="46" stroke="#0f172a" stroke-width="3" />
          <line x1="145" y1="54" x2="171" y2="54" stroke="#0f172a" stroke-width="3" />
          <!-- Right O -->
          <circle cx="195" cy="50" r="24" fill="#ccfbf1" stroke="#0d9488" stroke-width="2" />
          <text x="195" y="56" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#0f766e" text-anchor="middle">O</text>
          <circle cx="200" cy="24" r="3" fill="#f59e0b" /><circle cx="210" cy="30" r="3" fill="#f59e0b" />
          <circle cx="200" cy="76" r="3" fill="#f59e0b" /><circle cx="210" cy="70" r="3" fill="#f59e0b" />
        </svg>`,
      steps: [
        'Total valence electrons = 4 (C) + 2 × 6 (O) = 16e⁻.',
        'Carbon is central atom (least electronegative). Form single bonds: O–C–O (4e⁻ used, 12e⁻ left).',
        'Complete outer Oxygen octets with 6e⁻ each. Central Carbon still only has 4e⁻.',
        'Shift one lone pair from each Oxygen into bonding region to form two double bonds: O=C=O.',
        'All atoms achieve complete octets.'
      ]
    },
    BF3: {
      name: 'Boron Trifluoride (BF₃)',
      formula: 'BF₃',
      valenceTotal: 24,
      valenceBreakdown: 'B (3e⁻) + 3 × F (7e⁻) = 24 valence e⁻',
      centralAtom: 'Boron (B)',
      bp: 3,
      lp: 9,
      octetStatus: 'Incomplete Octet on Boron (6e⁻) — Classic Octet Rule Exception!',
      geometry: 'Trigonal Planar (120°)',
      svg: `
        <svg viewBox="0 0 200 170" width="200" height="170">
          <!-- Central B -->
          <circle cx="100" cy="85" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="2.5" />
          <text x="100" y="91" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#b45309" text-anchor="middle">B</text>
          <!-- Top F -->
          <line x1="100" y1="61" x2="100" y2="35" stroke="#0f172a" stroke-width="3" />
          <circle cx="100" cy="22" r="18" fill="#fdf2f8" stroke="#db2777" stroke-width="2" />
          <text x="100" y="27" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#be185d" text-anchor="middle">F</text>
          <!-- Bottom Left F -->
          <line x1="80" y1="97" x2="52" y2="120" stroke="#0f172a" stroke-width="3" />
          <circle cx="40" cy="130" r="18" fill="#fdf2f8" stroke="#db2777" stroke-width="2" />
          <text x="40" y="135" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#be185d" text-anchor="middle">F</text>
          <!-- Bottom Right F -->
          <line x1="120" y1="97" x2="148" y2="120" stroke="#0f172a" stroke-width="3" />
          <circle cx="160" cy="130" r="18" fill="#fdf2f8" stroke="#db2777" stroke-width="2" />
          <text x="160" y="135" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="#be185d" text-anchor="middle">F</text>
        </svg>`,
      steps: [
        'Total valence electrons = 3 (B) + 3 × 7 (F) = 24e⁻.',
        'Boron is central atom. Form 3 single B–F bonds = 6e⁻ used, 18e⁻ remaining.',
        'Distribute 6e⁻ (3 lone pairs) to each Fluorine atom to complete their octets.',
        'Boron has only 6 valence electrons (sextet) — stable as an electron-deficient Lewis acid.'
      ]
    },
    NH4_pos: {
      name: 'Ammonium Ion (NH₄⁺)',
      formula: 'NH₄⁺',
      valenceTotal: 8,
      valenceBreakdown: 'N (5e⁻) + 4 × H (1e⁻) - 1e⁻ (positive charge) = 8 valence e⁻',
      centralAtom: 'Nitrogen (N)',
      bp: 4,
      lp: 0,
      octetStatus: 'Nitrogen: Octet (8e⁻), Hydrogen: Duet (2e⁻)',
      geometry: 'Tetrahedral (109.5°)',
      svg: `
        <svg viewBox="0 0 200 180" width="200" height="180">
          <text x="175" y="30" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="20" fill="#dc2626">+</text>
          <!-- Bracket Left -->
          <path d="M 20 20 L 10 20 L 10 160 L 20 160" fill="none" stroke="#64748b" stroke-width="2" />
          <!-- Bracket Right -->
          <path d="M 160 20 L 170 20 L 170 160 L 160 160" fill="none" stroke="#64748b" stroke-width="2" />
          <!-- Central N -->
          <circle cx="90" cy="90" r="24" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" />
          <text x="90" y="96" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="16" fill="#6d28d9" text-anchor="middle">N</text>
          <!-- 4 Bonds -->
          <line x1="90" y1="66" x2="90" y2="42" stroke="#0f172a" stroke-width="3" />
          <line x1="66" y1="90" x2="42" y2="90" stroke="#0f172a" stroke-width="3" />
          <line x1="114" y1="90" x2="138" y2="90" stroke="#0f172a" stroke-width="3" />
          <line x1="90" y1="114" x2="90" y2="138" stroke="#0f172a" stroke-width="3" />
          <!-- 4 Hydrogens -->
          <circle cx="90" cy="30" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" /><text x="90" y="35" font-weight="bold" font-size="11" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="30" cy="90" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" /><text x="30" y="95" font-weight="bold" font-size="11" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="150" cy="90" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" /><text x="150" y="95" font-weight="bold" font-size="11" fill="#0369a1" text-anchor="middle">H</text>
          <circle cx="90" cy="150" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" /><text x="90" y="155" font-weight="bold" font-size="11" fill="#0369a1" text-anchor="middle">H</text>
        </svg>`,
      steps: [
        'Total valence electrons = 5 (N) + 4(1 from H) - 1 (positive charge) = 8e⁻.',
        'Nitrogen donates its lone pair to a coordinate covalent dative bond with H⁺.',
        'Form 4 equivalent single bonds: 8e⁻ used.',
        'All 4 N–H bonds in NH₄⁺ are identical in length and strength once formed.'
      ]
    }
  };

  // Bond Polarity Database
  const bondPolarityData = {
    'H-H': { a: 'H', b: 'H', enA: 2.20, enB: 2.20, delta: '0.00', type: 'Nonpolar Covalent', vector: 'None (Equal sharing)', cloud: 'Symmetrical electron cloud' },
    'Cl-Cl': { a: 'Cl', b: 'Cl', enA: 3.16, enB: 3.16, delta: '0.00', type: 'Nonpolar Covalent', vector: 'None (Equal sharing)', cloud: 'Symmetrical electron cloud' },
    'H-Cl': { a: 'H', b: 'Cl', enA: 2.20, enB: 3.16, delta: '0.96', type: 'Polar Covalent', vector: 'H (δ⁺) ───► Cl (δ⁻)', cloud: 'High density shifted strongly toward Cl' },
    'O-H': { a: 'H', b: 'O', enA: 2.20, enB: 3.44, delta: '1.24', type: 'Highly Polar Covalent', vector: 'H (δ⁺) ───► O (δ⁻)', cloud: 'Electron density heavily concentrated around Oxygen' },
    'C-O': { a: 'C', b: 'O', enA: 2.55, enB: 3.44, delta: '0.89', type: 'Polar Covalent', vector: 'C (δ⁺) ───► O (δ⁻)', cloud: 'Electron density shifted toward Oxygen' },
    'N-H': { a: 'H', b: 'N', enA: 2.20, enB: 3.04, delta: '0.84', type: 'Polar Covalent', vector: 'H (δ⁺) ───► N (δ⁻)', cloud: 'Electron density shifted toward Nitrogen' },
    'C-H': { a: 'C', b: 'H', enA: 2.55, enB: 2.20, delta: '0.35', type: 'Essentially Nonpolar Covalent', vector: 'Negligible dipole moment', cloud: 'Near-symmetrical distribution' }
  };

  // Molecular Polarity Database
  const molecularPolarityData = {
    CO2: {
      name: 'Carbon Dioxide (CO₂)',
      shape: 'Linear (180°)',
      bondPolarity: 'C=O bonds are strongly POLAR (ΔEN = 0.89)',
      dipoleVectors: 'Two equal bond dipole vectors point in exact opposite directions (180°)',
      cancellation: 'Vectors cancel out completely (Vector sum = 0)',
      netDipole: 'μ = 0 Debye (NONPOLAR MOLECULE)',
      explanation: 'Although individual C=O bonds are polar, the symmetrical linear geometry ensures total cancellation of bond dipoles.'
    },
    H2O: {
      name: 'Water (H₂O)',
      shape: 'Bent / V-shaped (~104.5°)',
      bondPolarity: 'O–H bonds are strongly POLAR (ΔEN = 1.24)',
      dipoleVectors: 'Two O–H dipoles point towards O, reinforced by 2 lone pairs',
      cancellation: 'Asymmetric bent shape prevents cancellation; dipoles reinforce',
      netDipole: 'μ = 1.85 Debye (HIGHLY POLAR MOLECULE)',
      explanation: 'The asymmetric bent geometry and 2 lone pairs create an intense permanent dipole moment.'
    },
    NH3: {
      name: 'Ammonia (NH₃)',
      shape: 'Trigonal Pyramidal (~107°)',
      bondPolarity: 'N–H bonds are POLAR (ΔEN = 0.84)',
      dipoleVectors: 'Three N–H dipoles point upward toward Nitrogen apex, reinforced by top lone pair',
      cancellation: 'Non-planar pyramid creates strong net upward dipole',
      netDipole: 'μ = 1.47 Debye (POLAR MOLECULE)',
      explanation: 'The lone pair atop the trigonal pyramid reinforces the dipole direction, making ammonia polar and water-soluble.'
    },
    CH4: {
      name: 'Methane (CH₄)',
      shape: 'Tetrahedral (109.5°)',
      bondPolarity: 'C–H bonds are weakly polar (ΔEN = 0.35)',
      dipoleVectors: 'Four identical bond dipoles pull symmetrically toward tetrahedral vertices',
      cancellation: 'Perfect 3D tetrahedral symmetry cancels all dipoles',
      netDipole: 'μ = 0 Debye (NONPOLAR MOLECULE)',
      explanation: 'Symmetrical arrangement of 4 identical bonds results in net dipole moment of zero.'
    },
    BF3: {
      name: 'Boron Trifluoride (BF₃)',
      shape: 'Trigonal Planar (120°)',
      bondPolarity: 'B–F bonds are highly POLAR (ΔEN = 1.94)',
      dipoleVectors: 'Three equal B–F dipoles oriented at 120° in a single plane',
      cancellation: 'Vectors in equilateral plane cancel each other out completely',
      netDipole: 'μ = 0 Debye (NONPOLAR MOLECULE)',
      explanation: 'High symmetry in a 120° plane cancels the intense B–F dipoles, making BF₃ completely nonpolar.'
    }
  };

  // Hybridization Database
  const hybridizationData = {
    sp: {
      title: 'sp Hybridization',
      orbitals: '1 s + 1 p orbital mix → 2 sp hybrid orbitals',
      unhybridized: '2 unhybridized p orbitals remain (capable of forming 2 π bonds)',
      geometry: 'Linear',
      angle: '180°',
      sPercent: '50% s, 50% p character',
      examples: 'BeCl₂, Ethyne (H–C≡C–H), CO₂, HgCl₂',
      description: 'The two sp hybrid orbitals orient in opposite directions along a straight line at 180° to minimize electrostatic repulsion.'
    },
    sp2: {
      title: 'sp² Hybridization',
      orbitals: '1 s + 2 p orbitals mix → 3 sp² hybrid orbitals',
      unhybridized: '1 unhybridized p orbital remains (forms 1 π bond)',
      geometry: 'Trigonal Planar',
      angle: '120°',
      sPercent: '33.3% s, 66.7% p character',
      examples: 'BF₃, Ethene (H₂C=CH₂), SO₃, Graphite, Carbonate ion (CO₃²⁻)',
      description: 'Three sp² hybrid orbitals lie in a single plane directed toward corners of an equilateral triangle at 120° angles.'
    },
    sp3: {
      title: 'sp³ Hybridization',
      orbitals: '1 s + 3 p orbitals mix → 4 sp³ hybrid orbitals',
      unhybridized: '0 unhybridized p orbitals (pure σ bonding & lone pairs)',
      geometry: 'Tetrahedral electron pair arrangement',
      angle: '109.5° (CH₄), 107° (NH₃ with 1 LP), 104.5° (H₂O with 2 LP)',
      sPercent: '25% s, 75% p character',
      examples: 'CH₄, NH₃, H₂O, Ethane (C₂H₆), Diamond, NH₄⁺',
      description: 'Four sp³ hybrid orbitals point toward the vertices of a regular tetrahedron at 109.5° angles.'
    }
  };

  // Sigma and Pi Molecule Counter Database
  const sigmaPiMoleculeData = {
    ethene: { name: 'Ethene (C₂H₄)', formula: 'H₂C=CH₂', sigma: 5, pi: 1, breakdown: '4 × C–H (σ) + 1 × C–C (σ) + 1 × C=C (π) = 5σ + 1π' },
    ethyne: { name: 'Ethyne / Acetylene (C₂H₂)', formula: 'H–C≡C–H', sigma: 3, pi: 2, breakdown: '2 × C–H (σ) + 1 × C–C (σ) + 2 × C≡C (π) = 3σ + 2π' },
    nitrogen: { name: 'Nitrogen Gas (N₂)', formula: 'N≡N', sigma: 1, pi: 2, breakdown: '1 × N–N (σ) + 2 × N≡N (π) = 1σ + 2π' },
    hcn: { name: 'Hydrogen Cyanide (HCN)', formula: 'H–C≡N', sigma: 2, pi: 2, breakdown: '1 × C–H (σ) + 1 × C–N (σ) + 2 × C≡N (π) = 2σ + 2π' },
    methane: { name: 'Methane (CH₄)', formula: 'CH₄', sigma: 4, pi: 0, breakdown: '4 × C–H (σ) single bonds = 4σ + 0π' },
    co2: { name: 'Carbon Dioxide (CO₂)', formula: 'O=C=O', sigma: 2, pi: 2, breakdown: '2 × C=O (σ) + 2 × C=O (π) = 2σ + 2π' }
  };

  // Intermolecular Forces Substances Database
  const imfSubstances = {
    H2O: { name: 'Water (H₂O)', mw: 18, bp: '100.0 °C', force: 'Hydrogen Bonding (Extensive 3D Network)', polar: 'Highly Polar', why: 'Each H₂O can form up to 4 hydrogen bonds; high enthalpy of vaporization' },
    HF: { name: 'Hydrogen Fluoride (HF)', mw: 20, bp: '19.5 °C', force: 'Strong Hydrogen Bonding', polar: 'Highly Polar', why: 'Strongest individual H-bond due to high EN of Fluorine (forms zig-zag chains)' },
    NH3: { name: 'Ammonia (NH₃)', mw: 17, bp: '-33.3 °C', force: 'Hydrogen Bonding', polar: 'Polar', why: 'Weaker H-bonding than H₂O because Nitrogen is less electronegative than Oxygen' },
    HCl: { name: 'Hydrogen Chloride (HCl)', mw: 36.5, bp: '-85.0 °C', force: 'Dipole-Dipole + London Forces', polar: 'Polar', why: 'Permanent dipole attraction, but Cl cannot form classical H-bonds' },
    CH4: { name: 'Methane (CH₄)', mw: 16, bp: '-161.5 °C', force: 'London Dispersion Forces only', polar: 'Nonpolar', why: 'Extremely low boiling point due to weak, temporary induced dipoles' },
    Cl2: { name: 'Chlorine (Cl₂)', mw: 71, bp: '-34.0 °C', force: 'London Dispersion Forces', polar: 'Nonpolar Gas', why: 'Moderate electron cloud polarizability creates gas at room temp' },
    Br2: { name: 'Bromine (Br₂)', mw: 160, bp: '+58.8 °C', force: 'Strong London Dispersion Forces', polar: 'Nonpolar Liquid', why: 'Larger electron cloud (70e⁻) increases polarizability, liquid state' },
    I2: { name: 'Iodine (I₂)', mw: 254, bp: '+184.3 °C', force: 'Very Strong London Forces', polar: 'Nonpolar Solid', why: 'Huge electron cloud (106e⁻) allows intense temporary dipoles, crystalline solid' }
  };

  // 12 Flashcards Database
  const flashcardsData = [
    {
      q: "What is an Ionic Bond and between which types of elements does it typically form?",
      a: "An ionic bond is the strong electrostatic attraction between oppositely charged ions. It typically forms between a metal (which loses valence electrons to form a cation) and a non-metal (which gains electrons to form an anion)."
    },
    {
      q: "Why do solid ionic compounds NOT conduct electricity, but molten or aqueous ones DO?",
      a: "In the solid state, ions are tightly locked in fixed positions within the rigid crystal lattice. When molten or dissolved in water, the lattice breaks down, freeing the ions to move and carry electric charge."
    },
    {
      q: "What is a Coordinate Covalent (Dative) Bond, and how does it behave once formed?",
      a: "A coordinate covalent bond is formed when both shared electrons are donated by a single atom (the donor). Crucially, once formed, it is completely indistinguishable from an ordinary covalent bond in strength, length, and properties."
    },
    {
      q: "Why is CO₂ a NONPOLAR molecule even though its C=O bonds are highly polar?",
      a: "CO₂ has a linear geometry (O=C=O, 180°). The two equal C=O bond dipole vectors point in exact opposite directions and cancel each other out completely (net dipole moment μ = 0)."
    },
    {
      q: "What is the order of electron-pair repulsion according to VSEPR theory?",
      a: "Lone Pair – Lone Pair (LP–LP) > Lone Pair – Bond Pair (LP–BP) > Bond Pair – Bond Pair (BP–BP). Lone pairs are held by only one nucleus and occupy greater angular volume."
    },
    {
      q: "How do bond angles change in CH₄ (109.5°), NH₃ (~107°), and H₂O (~104.5°)?",
      a: "All three have 4 electron domains (sp³). CH₄ has 0 lone pairs (109.5°), NH₃ has 1 lone pair which repels bond pairs downward to ~107°, and H₂O has 2 lone pairs causing even stronger repulsion, compressing the angle to ~104.5°."
    },
    {
      q: "What is the key geometric and structural difference between a Sigma (σ) and a Pi (π) bond?",
      a: "A σ bond is formed by head-on (axial) orbital overlap with maximum electron density along the internuclear axis and allows free rotation. A π bond is formed by sideways (lateral) overlap of parallel p-orbitals, is weaker, and restricts free rotation."
    },
    {
      q: "What is the hybridization and molecular geometry of Boron in BF₃?",
      a: "Boron in BF₃ is sp² hybridized with a Trigonal Planar geometry and 120° bond angles. Boron has an incomplete octet (6 valence electrons), making it a classic Lewis acid."
    },
    {
      q: "Which element has the highest electronegativity in the periodic table, and what is its value?",
      a: "Fluorine (F) has the highest electronegativity on the Pauling scale, with a value of approximately 4.0 (3.98), due to its high effective nuclear charge and small atomic radius."
    },
    {
      q: "What three elements must Hydrogen be covalently bonded to in order to form Hydrogen Bonds?",
      a: "Hydrogen must be bonded to small, highly electronegative atoms: Nitrogen (N), Oxygen (O), or Fluorine (F). These create a strong δ⁺ on Hydrogen that interacts with a lone pair on an adjacent electronegative atom."
    },
    {
      q: "How many Sigma (σ) and Pi (π) bonds are present in an Ethyne (C₂H₂) molecule?",
      a: "Ethyne (H–C≡C–H) contains 3 Sigma (σ) bonds (two C–H bonds and one C–C bond) and 2 Pi (π) bonds in the carbon-carbon triple bond."
    },
    {
      q: "How does the 'Electron Sea Model' explain the malleability and ductility of metals?",
      a: "Metal cations are immersed in a delocalized sea of mobile electrons. When mechanical stress is applied, layers of cations can slide over each other without fracturing because the flexible electron sea instantly adapts to cushion the new positions."
    }
  ];

  // 15 Original MDCAT MCQs Database
  const mcqQuestions = [
    {
      id: 1,
      q: "Which of the following compounds exhibits an incomplete octet on its central atom in its stable monomeric form?",
      options: [
        "CH₄",
        "BF₃",
        "CCl₄",
        "NH₃"
      ],
      correct: 1,
      explanation: "Boron in BF₃ has only 3 valence electron pairs (6 electrons total) around the central atom, representing a classic exception to the octet rule (incomplete octet / electron-deficient)."
    },
    {
      id: 2,
      q: "Which factor primarily explains why solid sodium chloride does not conduct electricity, while molten sodium chloride does?",
      options: [
        "Electrons are localized in covalent bonds in the solid state",
        "Ions are locked in fixed positions in the solid crystal lattice and cannot move",
        "Sodium chloride is nonpolar in the solid state",
        "The electrostatic attraction disappears upon melting"
      ],
      correct: 1,
      explanation: "In solid NaCl, Na⁺ and Cl⁻ ions are held rigidly in crystal lattice positions. When melted, the lattice breaks down and ions become mobile charge carriers capable of conducting electricity."
    },
    {
      id: 3,
      q: "A coordinate covalent (dative) bond is formed in the reaction: NH₃ + H⁺ → NH₄⁺. Once formed, the fourth N–H bond is:",
      options: [
        "Weaker and longer than the other three N–H bonds",
        "Stronger and shorter than the other three N–H bonds",
        "Completely identical in strength and length to the other three N–H bonds",
        "Easily distinguished by spectroscopic bond length measurements"
      ],
      correct: 2,
      explanation: "Once a coordinate covalent bond is formed, the electron pair is shared equally between the two nuclei, making it chemically and physically indistinguishable from an ordinary covalent bond."
    },
    {
      id: 4,
      q: "Which of the following molecules has polar bonds but possesses a net molecular dipole moment of zero (μ = 0 D)?",
      options: [
        "H₂O",
        "NH₃",
        "SO₂",
        "CO₂"
      ],
      correct: 3,
      explanation: "CO₂ contains two polar C=O bonds. However, because it has a linear geometry (180°), the two bond dipoles point in exact opposite directions and cancel completely, resulting in a nonpolar molecule."
    },
    {
      id: 5,
      q: "According to VSEPR theory, the decreasing order of repulsive forces between electron pairs is:",
      options: [
        "BP–BP > LP–BP > LP–LP",
        "LP–LP > LP–BP > BP–BP",
        "LP–BP > LP–LP > BP–BP",
        "LP–LP > BP–BP > LP–BP"
      ],
      correct: 1,
      explanation: "Lone pairs are attracted to only one nucleus and occupy more spatial volume than bonding pairs held between two nuclei. Thus, repulsion is LP–LP > LP–BP > BP–BP."
    },
    {
      id: 6,
      q: "The bond angles in CH₄, NH₃, and H₂O are 109.5°, 107°, and 104.5° respectively. This decrease is caused by:",
      options: [
        "Increasing electronegativity of the central atom",
        "Increasing number of lone pairs exerting greater repulsion on bonding pairs",
        "Decrease in atomic mass of the central atom",
        "Change from sp³ to sp² hybridization"
      ],
      correct: 1,
      explanation: "All three have 4 electron domains (sp³). As the number of lone pairs increases (0 in CH₄ → 1 in NH₃ → 2 in H₂O), greater LP-BP repulsion squeezes the bonding pairs closer together, decreasing the bond angle."
    },
    {
      id: 7,
      q: "How many Sigma (σ) and Pi (π) bonds are present in a molecule of Ethene (C₂H₄)?",
      options: [
        "4 σ and 2 π",
        "5 σ and 1 π",
        "6 σ and 0 π",
        "3 σ and 2 π"
      ],
      correct: 1,
      explanation: "Ethene (H₂C=CH₂) contains four C–H single bonds (4σ) and one C=C double bond (1σ + 1π), giving a total of 5 σ and 1 π bonds."
    },
    {
      id: 8,
      q: "The state of hybridization of carbon atoms in ethyne (acetylene, C₂H₂) is:",
      options: [
        "sp³",
        "sp²",
        "sp",
        "dsp²"
      ],
      correct: 2,
      explanation: "In ethyne (H–C≡C–H), each carbon is bonded to two atoms (one H and one C) with 0 lone pairs, requiring 2 hybrid orbitals → sp hybridization with linear 180° geometry."
    },
    {
      id: 9,
      q: "Which of the following pairs of elements has the highest electronegativity difference?",
      options: [
        "C and H",
        "Na and Cl",
        "N and O",
        "H and Cl"
      ],
      correct: 1,
      explanation: "Na (EN = 0.93) and Cl (EN = 3.16) have a ΔEN of 2.23 (> 1.7), characteristic of a predominantly ionic bond."
    },
    {
      id: 10,
      q: "Hydrogen bonding is strongest in which of the following compounds?",
      options: [
        "H₂S",
        "HCl",
        "HF",
        "PH₃"
      ],
      correct: 2,
      explanation: "HF contains hydrogen bonded to Fluorine, the most electronegative element, resulting in the strongest individual hydrogen bond."
    },
    {
      id: 11,
      q: "Which property of metals is directly explained by the ability of metal cation layers to slide over each other within the delocalized electron sea?",
      options: [
        "High melting points",
        "Malleability and ductility",
        "Metallic lustre",
        "Thermal conductivity"
      ],
      correct: 1,
      explanation: "When deformed by mechanical stress, layers of metal cations glide smoothly without repulsive cleavage because the mobile electron sea continuously shields the positive ions."
    },
    {
      id: 12,
      q: "What is the molecular geometry of the Boron Trifluoride (BF₃) molecule?",
      options: [
        "Trigonal pyramidal",
        "Tetrahedral",
        "Trigonal planar",
        "T-shaped"
      ],
      correct: 2,
      explanation: "BF₃ has 3 bonding pairs and 0 lone pairs on Boron (sp² hybrid), resulting in a symmetrical Trigonal Planar shape with 120° bond angles."
    },
    {
      id: 13,
      q: "A single covalent bond is always formed by:",
      options: [
        "Lateral overlap of two parallel p-orbitals",
        "Head-on (axial) overlap of atomic orbitals resulting in a Sigma (σ) bond",
        "Transfer of two electrons from one atom to another",
        "Overlap of hybrid orbitals with unhybridized d-orbitals only"
      ],
      correct: 1,
      explanation: "Every single covalent bond is a Sigma (σ) bond formed by coaxial/head-on overlap of orbitals along the internuclear axis."
    },
    {
      id: 14,
      q: "Why does water (H₂O) have an unusually high boiling point (100°C) compared to H₂S (-60°C)?",
      options: [
        "H₂O has a higher molecular weight than H₂S",
        "H₂O forms extensive intermolecular hydrogen bonding networks",
        "H₂O contains coordinate covalent bonds",
        "The O–H bond is nonpolar while S–H is ionic"
      ],
      correct: 1,
      explanation: "Oxygen's high electronegativity and small radius allow water molecules to form an extensive 3D network of strong hydrogen bonds, requiring large thermal energy to separate."
    },
    {
      id: 15,
      q: "Which statement correctly describes London Dispersion Forces?",
      options: [
        "They exist only between permanently polar molecules",
        "They are temporary dipoles caused by momentary fluctuations in electron distribution and exist in all molecules",
        "They are stronger than ionic and covalent bonds",
        "They decrease as the size and polarizability of the electron cloud increase"
      ],
      correct: 1,
      explanation: "London dispersion forces arise from instantaneous, temporary dipoles resulting from momentary uneven electron distributions and are present in ALL atoms and molecules."
    }
  ];

  // =========================================================================
  // 2. DOM INITIALIZATION & STATE MANAGEMENT
  // =========================================================================

  // Local Storage Keys
  const STORAGE_BOOKMARKS = 'mdcat_bonding_bookmarks';
  const STORAGE_COMPLETED = 'mdcat_bonding_completed';
  const STORAGE_FLASHCARDS = 'mdcat_bonding_mastered_fc';

  let currentLewisKey = 'H2O';
  let lewisCurrentStep = 0;
  let currentFlashcardIdx = 0;
  let flashcardFlipped = false;
  let quizAnswers = {};
  let quizSubmitted = false;

  // Bookmarks State
  let bookmarkedSections = JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]');
  let masteredFlashcards = JSON.parse(localStorage.getItem(STORAGE_FLASHCARDS) || '[]');
  let isChapterCompleted = localStorage.getItem(STORAGE_COMPLETED) === 'true';

  // =========================================================================
  // 3. TOP HEADER & READING PROGRESS ENGINE
  // =========================================================================

  const progressBar = document.getElementById('reading-progress-fill');
  const progressBadge = document.getElementById('progress-percentage');
  const topHeader = document.querySelector('.top-header');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  function updateScrollProgress() {
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollTop = docElem.scrollTop || docBody.scrollTop;
    const scrollHeight = (docElem.scrollHeight || docBody.scrollHeight) - docElem.clientHeight;
    
    const scrolledPercent = scrollHeight > 0 ? Math.min(100, Math.round((scrollTop / scrollHeight) * 100)) : 0;
    
    if (progressBar) progressBar.style.width = `${scrolledPercent}%`;
    if (progressBadge) progressBadge.textContent = `${scrolledPercent}%`;

    // Header styling on scroll
    if (scrollTop > 20) {
      topHeader?.classList.add('top-header-scrolled');
    } else {
      topHeader?.classList.remove('top-header-scrolled');
    }

    // Back to top button visibility
    if (scrollTop > 350) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 4. STICKY NAV SCROLLSPY & SMOOTH SCROLL
  // =========================================================================

  const navLinks = document.querySelectorAll('.nav-tab-link');
  const sectionElements = document.querySelectorAll('.chapter-section');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = '';

    sectionElements.forEach(section => {
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
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSec = document.querySelector(targetId);
      if (targetSec) {
        const targetOffset = targetSec.offsetTop - 110;
        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 5. SEARCH SYSTEM
  // =========================================================================

  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function handleSearch() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    if (!query) {
      if (searchClearBtn) searchClearBtn.style.display = 'none';
      removeSearchHighlights();
      return;
    }

    if (searchClearBtn) searchClearBtn.style.display = 'block';

    let firstMatchSection = null;

    sectionElements.forEach(sec => {
      const text = sec.innerText.toLowerCase();
      if (text.includes(query)) {
        sec.style.borderColor = 'var(--primary)';
        if (!firstMatchSection) firstMatchSection = sec;
      } else {
        sec.style.borderColor = 'var(--border-subtle)';
      }
    });

    if (firstMatchSection && query.length > 2) {
      const offset = firstMatchSection.offsetTop - 110;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  function removeSearchHighlights() {
    sectionElements.forEach(sec => {
      sec.style.borderColor = 'var(--border-subtle)';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        handleSearch();
      }
    });
  }

  // =========================================================================
  // 6. BOOKMARKS SYSTEM
  // =========================================================================

  const bookmarkBtns = document.querySelectorAll('.bookmark-toggle-btn');
  const bookmarkCounter = document.getElementById('bookmark-count-badge');
  const bookmarksModal = document.getElementById('bookmarks-modal');
  const openBookmarksBtn = document.getElementById('btn-toggle-bookmarks');
  const closeBookmarksBtn = document.getElementById('btn-close-bookmarks');
  const bookmarkListContainer = document.getElementById('bookmark-modal-list');

  function updateBookmarkUI() {
    if (bookmarkCounter) bookmarkCounter.textContent = bookmarkedSections.length;

    bookmarkBtns.forEach(btn => {
      const targetSecId = btn.getAttribute('data-section');
      if (bookmarkedSections.includes(targetSecId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '★ Bookmarked ✓';
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = '☆ Bookmark';
      }
    });

    if (bookmarkListContainer) {
      if (bookmarkedSections.length === 0) {
        bookmarkListContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 1.5rem 0;">No bookmarked sections yet. Click "☆ Bookmark" on any section to save it for quick review.</p>';
      } else {
        bookmarkListContainer.innerHTML = bookmarkedSections.map(secId => {
          const secEl = document.getElementById(secId);
          const title = secEl ? secEl.querySelector('.section-title')?.textContent || secId : secId;
          return `
            <div class="bookmark-list-item">
              <a href="#${secId}" class="bookmark-link" data-target="${secId}">📖 ${title}</a>
              <button class="bookmark-remove-btn" data-remove="${secId}" aria-label="Remove bookmark">✕</button>
            </div>
          `;
        }).join('');

        // Attach jump and delete events inside modal
        bookmarkListContainer.querySelectorAll('.bookmark-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              closeBookmarksModal();
              window.scrollTo({ top: targetEl.offsetTop - 110, behavior: 'smooth' });
            }
          });
        });

        bookmarkListContainer.querySelectorAll('.bookmark-remove-btn').forEach(delBtn => {
          delBtn.addEventListener('click', () => {
            const remId = delBtn.getAttribute('data-remove');
            toggleBookmark(remId);
          });
        });
      }
    }
  }

  function toggleBookmark(secId) {
    if (bookmarkedSections.includes(secId)) {
      bookmarkedSections = bookmarkedSections.filter(id => id !== secId);
    } else {
      bookmarkedSections.push(secId);
    }
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(bookmarkedSections));
    updateBookmarkUI();
  }

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.getAttribute('data-section');
      if (secId) toggleBookmark(secId);
    });
  });

  function openBookmarksModal() {
    if (bookmarksModal) bookmarksModal.classList.add('open');
  }

  function closeBookmarksModal() {
    if (bookmarksModal) bookmarksModal.classList.remove('open');
  }

  if (openBookmarksBtn) openBookmarksBtn.addEventListener('click', openBookmarksModal);
  if (closeBookmarksBtn) closeBookmarksBtn.addEventListener('click', closeBookmarksModal);
  if (bookmarksModal) {
    bookmarksModal.addEventListener('click', (e) => {
      if (e.target === bookmarksModal) closeBookmarksModal();
    });
  }

  updateBookmarkUI();

  // =========================================================================
  // 7. CHAPTER COMPLETION TOGGLE
  // =========================================================================

  const completeBtn = document.getElementById('btn-chapter-complete');

  function updateCompletionUI() {
    if (!completeBtn) return;
    if (isChapterCompleted) {
      completeBtn.classList.add('action-btn-completed');
      completeBtn.innerHTML = '✓ Completed';
    } else {
      completeBtn.classList.remove('action-btn-completed');
      completeBtn.innerHTML = 'Mark Completed';
    }
  }

  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      isChapterCompleted = !isChapterCompleted;
      localStorage.setItem(STORAGE_COMPLETED, isChapterCompleted ? 'true' : 'false');
      updateCompletionUI();
    });
  }

  updateCompletionUI();

  // =========================================================================
  // 8. IONIC BOND TRANSFER SIMULATOR
  // =========================================================================

  const btnTransferElectron = document.getElementById('btn-transfer-electron');
  const btnResetIonic = document.getElementById('btn-reset-ionic');
  const electronParticle = document.getElementById('ionic-electron-particle');
  const naChargeBadge = document.getElementById('na-charge-badge');
  const clChargeBadge = document.getElementById('cl-charge-badge');
  const attractionLightning = document.getElementById('attraction-field');
  const ionicStatusBanner = document.getElementById('ionic-status-banner');

  function performIonicTransfer() {
    if (!electronParticle) return;
    electronParticle.classList.add('transferred');
    setTimeout(() => {
      naChargeBadge?.classList.add('visible');
      clChargeBadge?.classList.add('visible');
      attractionLightning?.classList.add('active');
      if (ionicStatusBanner) {
        ionicStatusBanner.innerHTML = '<strong>Ionic Bond Formed!</strong> Na transferred 1 valence electron (forming Na⁺ cation). Cl gained 1 electron (forming Cl⁻ anion). Strong electrostatic attraction holds them in a stable lattice.';
      }
    }, 600);
  }

  function resetIonicSimulator() {
    if (!electronParticle) return;
    electronParticle.classList.remove('transferred');
    naChargeBadge?.classList.remove('visible');
    clChargeBadge?.classList.remove('visible');
    attractionLightning?.classList.remove('active');
    if (ionicStatusBanner) {
      ionicStatusBanner.innerHTML = 'Sodium (2,8,1) has 1 valence electron; Chlorine (2,8,7) has 7 valence electrons. Click "Transfer Electron" to observe ionic bonding.';
    }
  }

  if (btnTransferElectron) btnTransferElectron.addEventListener('click', performIonicTransfer);
  if (btnResetIonic) btnResetIonic.addEventListener('click', resetIonicSimulator);

  // =========================================================================
  // 9. COVALENT BOND SHARING VISUALIZER
  // =========================================================================

  const covalentPills = document.querySelectorAll('.covalent-pill-btn');
  const covalentStage = document.getElementById('covalent-stage-container');
  const covalentStatusText = document.getElementById('covalent-status-text');

  const covalentMoleculeData = {
    'H2': {
      atomA: 'H', atomB: 'H', pairs: 1, bondType: 'Single Covalent Bond (H–H)',
      desc: 'Each Hydrogen atom contributes 1 electron. Sharing 1 pair (2 electrons) completes the helium-like duet for both.'
    },
    'O2': {
      atomA: 'O', atomB: 'O', pairs: 2, bondType: 'Double Covalent Bond (O=O)',
      desc: 'Each Oxygen atom has 6 valence electrons and contributes 2 electrons. Sharing 2 pairs (4 electrons) satisfies octets for both.'
    },
    'N2': {
      atomA: 'N', atomB: 'N', pairs: 3, bondType: 'Triple Covalent Bond (N≡N)',
      desc: 'Each Nitrogen atom contributes 3 electrons. Sharing 3 pairs (6 electrons) forms an exceptionally strong triple bond (945 kJ/mol).'
    },
    'Cl2': {
      atomA: 'Cl', atomB: 'Cl', pairs: 1, bondType: 'Single Covalent Bond (Cl–Cl)',
      desc: 'Each Chlorine atom has 7 valence electrons and shares 1 pair to achieve stable noble-gas argon configuration.'
    }
  };

  function updateCovalentVisual(molKey) {
    const data = covalentMoleculeData[molKey];
    if (!data || !covalentStage) return;

    let dotsHtml = '';
    for (let i = 0; i < data.pairs; i++) {
      dotsHtml += `
        <div style="display: flex; gap: 6px;">
          <div class="shared-pair-dot"></div>
          <div class="shared-pair-dot"></div>
        </div>
      `;
    }

    covalentStage.innerHTML = `
      <div class="covalent-atom-bubble">${data.atomA}</div>
      <div class="overlap-region">
        ${dotsHtml}
      </div>
      <div class="covalent-atom-bubble">${data.atomB}</div>
    `;

    if (covalentStatusText) {
      covalentStatusText.innerHTML = `<strong>${data.bondType}:</strong> ${data.desc}`;
    }
  }

  covalentPills.forEach(pill => {
    pill.addEventListener('click', () => {
      covalentPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const molKey = pill.getAttribute('data-mol');
      if (molKey) updateCovalentVisual(molKey);
    });
  });

  // =========================================================================
  // 10. COORDINATE (DATIVE) BOND SIMULATOR
  // =========================================================================

  const coordStepPills = document.querySelectorAll('.coord-step-pill');
  const coordVisualContainer = document.getElementById('coord-visual-container');
  const coordExplanation = document.getElementById('coord-explanation-text');

  const coordSteps = [
    {
      title: 'Step 1: Isolated Reactants',
      desc: 'NH₃ has an unshared lone pair of electrons on Nitrogen. H⁺ (proton) has an empty 1s orbital with zero electrons.',
      svg: `
        <svg viewBox="0 0 280 120" width="280" height="120">
          <circle cx="80" cy="60" r="30" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" />
          <text x="80" y="67" font-weight="bold" font-size="16" fill="#6d28d9" text-anchor="middle">NH₃</text>
          <!-- Lone pair on right of NH3 -->
          <circle cx="118" cy="55" r="4" fill="#f59e0b" /><circle cx="118" cy="65" r="4" fill="#f59e0b" />
          <!-- Plus sign -->
          <text x="160" y="66" font-weight="bold" font-size="20" fill="#64748b" text-anchor="middle">+</text>
          <!-- H+ -->
          <circle cx="210" cy="60" r="22" fill="#fee2e2" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3" />
          <text x="210" y="66" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">H⁺</text>
        </svg>`
    },
    {
      title: 'Step 2: Lone Pair Donation',
      desc: 'Nitrogen acts as a Lewis base (electron-pair donor) and donates its entire lone pair into the empty 1s orbital of H⁺ (Lewis acid).',
      svg: `
        <svg viewBox="0 0 280 120" width="280" height="120">
          <circle cx="95" cy="60" r="30" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" />
          <text x="95" y="67" font-weight="bold" font-size="16" fill="#6d28d9" text-anchor="middle">NH₃</text>
          <!-- Coordinate Arrow -->
          <line x1="130" y1="60" x2="175" y2="60" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2" />
          <polygon points="175,55 185,60 175,65" fill="#f59e0b" />
          <circle cx="150" cy="53" r="3.5" fill="#f59e0b" /><circle cx="160" cy="53" r="3.5" fill="#f59e0b" />
          <!-- H+ -->
          <circle cx="210" cy="60" r="22" fill="#fee2e2" stroke="#ef4444" stroke-width="2" />
          <text x="210" y="66" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">H</text>
        </svg>`
    },
    {
      title: 'Step 3: Stable Ammonium Ion (NH₄⁺)',
      desc: 'The coordinate bond is established: [H₃N→H]⁺ or [NH₄]⁺. Crucial MDCAT rule: All 4 N–H bonds in NH₄⁺ are completely equivalent and indistinguishable.',
      svg: `
        <svg viewBox="0 0 280 120" width="280" height="120">
          <path d="M 60 20 L 50 20 L 50 100 L 60 100" fill="none" stroke="#64748b" stroke-width="2" />
          <path d="M 220 20 L 230 20 L 230 100 L 220 100" fill="none" stroke="#64748b" stroke-width="2" />
          <text x="240" y="30" font-weight="bold" font-size="20" fill="#dc2626">+</text>
          <circle cx="140" cy="60" r="32" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" />
          <text x="140" y="67" font-weight="bold" font-size="18" fill="#6d28d9" text-anchor="middle">NH₄⁺</text>
          <text x="140" y="115" font-size="11" fill="#475569" font-weight="600" text-anchor="middle">All 4 N–H bonds equivalent</text>
        </svg>`
    }
  ];

  function updateCoordStep(idx) {
    const step = coordSteps[idx];
    if (!step || !coordVisualContainer) return;
    coordVisualContainer.innerHTML = step.svg;
    if (coordExplanation) {
      coordExplanation.innerHTML = `<strong>${step.title}:</strong> ${step.desc}`;
    }
  }

  coordStepPills.forEach(pill => {
    pill.addEventListener('click', () => {
      coordStepPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const stepIdx = parseInt(pill.getAttribute('data-step') || '0', 10);
      updateCoordStep(stepIdx);
    });
  });

  // =========================================================================
  // 11. INTERACTIVE LEWIS STRUCTURE BUILDER
  // =========================================================================

  const lewisPills = document.querySelectorAll('.lewis-pill-btn');
  const lewisFormulaEl = document.getElementById('lewis-formula-name');
  const lewisValenceTotalEl = document.getElementById('lewis-valence-total');
  const lewisValenceBreakdownEl = document.getElementById('lewis-valence-breakdown');
  const lewisCentralAtomEl = document.getElementById('lewis-central-atom');
  const lewisBpEl = document.getElementById('lewis-bp-count');
  const lewisLpEl = document.getElementById('lewis-lp-count');
  const lewisOctetStatusEl = document.getElementById('lewis-octet-status');
  const lewisGeometryEl = document.getElementById('lewis-geometry');
  const lewisSvgWrapper = document.getElementById('lewis-svg-wrapper');
  const btnLewisStep = document.getElementById('btn-lewis-step');
  const lewisStepNarration = document.getElementById('lewis-step-narration');

  function renderLewisMolecule(key) {
    const data = lewisDatabase[key];
    if (!data) return;
    currentLewisKey = key;
    lewisCurrentStep = 0;

    if (lewisFormulaEl) lewisFormulaEl.textContent = data.name;
    if (lewisValenceTotalEl) lewisValenceTotalEl.textContent = `${data.valenceTotal} e⁻`;
    if (lewisValenceBreakdownEl) lewisValenceBreakdownEl.textContent = data.valenceBreakdown;
    if (lewisCentralAtomEl) lewisCentralAtomEl.textContent = data.centralAtom;
    if (lewisBpEl) lewisBpEl.textContent = `${data.bp} pair(s)`;
    if (lewisLpEl) lewisLpEl.textContent = `${data.lp} pair(s)`;
    if (lewisOctetStatusEl) lewisOctetStatusEl.textContent = data.octetStatus;
    if (lewisGeometryEl) lewisGeometryEl.textContent = data.geometry;
    if (lewisSvgWrapper) lewisSvgWrapper.innerHTML = data.svg;

    if (lewisStepNarration) {
      lewisStepNarration.textContent = `Click "Show Step-by-Step" to construct ${data.formula} from valence electron counting.`;
    }
  }

  lewisPills.forEach(pill => {
    pill.addEventListener('click', () => {
      lewisPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-lewis');
      if (key) renderLewisMolecule(key);
    });
  });

  if (btnLewisStep) {
    btnLewisStep.addEventListener('click', () => {
      const data = lewisDatabase[currentLewisKey];
      if (!data || !data.steps) return;
      lewisCurrentStep = (lewisCurrentStep + 1) % (data.steps.length + 1);

      if (lewisCurrentStep === 0) {
        if (lewisStepNarration) lewisStepNarration.textContent = 'Step 1 / ' + data.steps.length + ': ' + data.steps[0];
        lewisCurrentStep = 1;
      } else {
        const stepText = data.steps[lewisCurrentStep - 1];
        if (lewisStepNarration) {
          lewisStepNarration.innerHTML = `<strong>Step ${lewisCurrentStep} of ${data.steps.length}:</strong> ${stepText}`;
        }
      }
    });
  }

  renderLewisMolecule('H2O');

  // =========================================================================
  // 12. ELECTRONEGATIVITY & PERIODIC TREND EXPLORER
  // =========================================================================

  const ptableTiles = document.querySelectorAll('.element-tile');
  const enDetailSym = document.getElementById('en-detail-sym');
  const enDetailName = document.getElementById('en-detail-name');
  const enDetailValue = document.getElementById('en-detail-value');
  const enDetailConfig = document.getElementById('en-detail-config');
  const enDetailGroup = document.getElementById('en-detail-group');
  const enDetailRole = document.getElementById('en-detail-role');

  function renderElementDetails(sym) {
    const el = elementsData[sym];
    if (!el) return;

    ptableTiles.forEach(t => t.classList.remove('selected'));
    const targetTile = document.querySelector(`.element-tile[data-elem="${sym}"]`);
    if (targetTile) targetTile.classList.add('selected');

    if (enDetailSym) enDetailSym.textContent = sym;
    if (enDetailName) enDetailName.textContent = el.name;
    if (enDetailValue) enDetailValue.textContent = `Pauling EN: ${el.en}`;
    if (enDetailConfig) enDetailConfig.textContent = el.config;
    if (enDetailGroup) enDetailGroup.textContent = `Period ${el.period}, Group ${el.group} (${el.type})`;
    if (enDetailRole) enDetailRole.textContent = el.role;
  }

  ptableTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const sym = tile.getAttribute('data-elem');
      if (sym) renderElementDetails(sym);
    });
  });

  renderElementDetails('F');

  // =========================================================================
  // 13. BOND POLARITY EXPLORER
  // =========================================================================

  const bondPills = document.querySelectorAll('.bond-pill-btn');
  const bondDeltaEnEl = document.getElementById('bond-delta-en');
  const bondTypeEl = document.getElementById('bond-type-classification');
  const bondVectorEl = document.getElementById('bond-vector-display');
  const bondAtomAEl = document.getElementById('bond-atom-a');
  const bondAtomBEl = document.getElementById('bond-atom-b');
  const bondChargeAEl = document.getElementById('bond-charge-a');
  const bondChargeBEl = document.getElementById('bond-charge-b');
  const bondCloudEl = document.getElementById('bond-cloud-container');
  const bondDescEl = document.getElementById('bond-desc-text');

  function updateBondPolarity(bondKey) {
    const data = bondPolarityData[bondKey];
    if (!data) return;

    if (bondDeltaEnEl) bondDeltaEnEl.textContent = `ΔEN = ${data.delta}`;
    if (bondTypeEl) bondTypeEl.textContent = data.type;
    if (bondVectorEl) bondVectorEl.textContent = data.vector;
    if (bondAtomAEl) bondAtomAEl.textContent = data.a;
    if (bondAtomBEl) bondAtomBEl.textContent = data.b;

    if (parseFloat(data.delta) === 0) {
      if (bondChargeAEl) bondChargeAEl.textContent = '0';
      if (bondChargeBEl) bondChargeBEl.textContent = '0';
      if (bondCloudEl) bondCloudEl.style.background = 'linear-gradient(90deg, #38bdf8 0%, #38bdf8 100%)';
    } else {
      if (data.enA < data.enB) {
        if (bondChargeAEl) bondChargeAEl.textContent = 'δ⁺';
        if (bondChargeBEl) bondChargeBEl.textContent = 'δ⁻';
        if (bondCloudEl) bondCloudEl.style.background = 'linear-gradient(90deg, rgba(239, 68, 68, 0.4) 0%, rgba(59, 130, 246, 0.8) 100%)';
      } else {
        if (bondChargeAEl) bondChargeAEl.textContent = 'δ⁻';
        if (bondChargeBEl) bondChargeBEl.textContent = 'δ⁺';
        if (bondCloudEl) bondCloudEl.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(239, 68, 68, 0.4) 100%)';
      }
    }

    if (bondDescEl) {
      bondDescEl.innerHTML = `<strong>Electron Distribution:</strong> ${data.cloud}. ΔEN = ${data.delta} categorizes this bond as <em>${data.type}</em>.`;
    }
  }

  bondPills.forEach(pill => {
    pill.addEventListener('click', () => {
      bondPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-bond');
      if (key) updateBondPolarity(key);
    });
  });

  updateBondPolarity('H-Cl');

  // =========================================================================
  // 14. MOLECULAR POLARITY ANALYZER
  // =========================================================================

  const molPolPills = document.querySelectorAll('.mol-pol-pill-btn');
  const molPolName = document.getElementById('mol-pol-name');
  const molPolShape = document.getElementById('mol-pol-shape');
  const molPolBond = document.getElementById('mol-pol-bond');
  const molPolVectors = document.getElementById('mol-pol-vectors');
  const molPolCancel = document.getElementById('mol-pol-cancel');
  const molPolNetDipole = document.getElementById('mol-pol-net-dipole');
  const molPolExplanation = document.getElementById('mol-pol-explanation');

  function updateMolecularPolarity(key) {
    const data = molecularPolarityData[key];
    if (!data) return;

    if (molPolName) molPolName.textContent = data.name;
    if (molPolShape) molPolShape.textContent = data.shape;
    if (molPolBond) molPolBond.textContent = data.bondPolarity;
    if (molPolVectors) molPolVectors.textContent = data.dipoleVectors;
    if (molPolCancel) molPolCancel.textContent = data.cancellation;
    if (molPolNetDipole) molPolNetDipole.textContent = data.netDipole;
    if (molPolExplanation) molPolExplanation.textContent = data.explanation;
  }

  molPolPills.forEach(pill => {
    pill.addEventListener('click', () => {
      molPolPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-mol-pol');
      if (key) updateMolecularPolarity(key);
    });
  });

  updateMolecularPolarity('CO2');

  // =========================================================================
  // 15. HYBRIDIZATION EXPLORER
  // =========================================================================

  const hybridPills = document.querySelectorAll('.hybrid-pill-btn');
  const hybridTitleEl = document.getElementById('hybrid-title');
  const hybridOrbitalsEl = document.getElementById('hybrid-orbitals');
  const hybridGeometryEl = document.getElementById('hybrid-geometry');
  const hybridAngleEl = document.getElementById('hybrid-angle');
  const hybridPercentEl = document.getElementById('hybrid-percent');
  const hybridExamplesEl = document.getElementById('hybrid-examples');
  const hybridDescEl = document.getElementById('hybrid-desc');

  function updateHybridization(key) {
    const data = hybridizationData[key];
    if (!data) return;

    if (hybridTitleEl) hybridTitleEl.textContent = data.title;
    if (hybridOrbitalsEl) hybridOrbitalsEl.textContent = data.orbitals;
    if (hybridGeometryEl) hybridGeometryEl.textContent = data.geometry;
    if (hybridAngleEl) hybridAngleEl.textContent = data.angle;
    if (hybridPercentEl) hybridPercentEl.textContent = data.sPercent;
    if (hybridExamplesEl) hybridExamplesEl.textContent = data.examples;
    if (hybridDescEl) hybridDescEl.textContent = data.description;
  }

  hybridPills.forEach(pill => {
    pill.addEventListener('click', () => {
      hybridPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-hybrid');
      if (key) updateHybridization(key);
    });
  });

  updateHybridization('sp');

  // =========================================================================
  // 16. SIGMA & PI BOND MOLECULE COUNTER
  // =========================================================================

  const sigmaMolPills = document.querySelectorAll('.sigma-mol-pill');
  const sigmaCountResultEl = document.getElementById('sigma-count-result');

  function updateSigmaPiCounter(key) {
    const data = sigmaPiMoleculeData[key];
    if (!data || !sigmaCountResultEl) return;

    sigmaCountResultEl.innerHTML = `
      <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
        ${data.name} (<span style="font-family: var(--font-mono); color: var(--primary-dark);">${data.formula}</span>)
      </div>
      <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
        <span class="pill-badge pill-emerald">Sigma (σ) Bonds: <strong>${data.sigma}</strong></span>
        <span class="pill-badge pill-violet">Pi (π) Bonds: <strong>${data.pi}</strong></span>
      </div>
      <div style="font-size: 0.875rem; color: var(--text-muted);">
        <strong>Detailed Breakdown:</strong> ${data.breakdown}
      </div>
    `;
  }

  sigmaMolPills.forEach(pill => {
    pill.addEventListener('click', () => {
      sigmaMolPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-sig-mol');
      if (key) updateSigmaPiCounter(key);
    });
  });

  updateSigmaPiCounter('ethene');

  // =========================================================================
  // 17. INTERMOLECULAR FORCES COMPARATOR
  // =========================================================================

  const imfPills = document.querySelectorAll('.imf-sub-pill');
  const imfNameEl = document.getElementById('imf-name');
  const imfBpEl = document.getElementById('imf-bp');
  const imfForceEl = document.getElementById('imf-force');
  const imfPolarEl = document.getElementById('imf-polar');
  const imfWhyEl = document.getElementById('imf-why');

  function updateImfComparator(key) {
    const data = imfSubstances[key];
    if (!data) return;

    if (imfNameEl) imfNameEl.textContent = data.name;
    if (imfBpEl) imfBpEl.textContent = `Boiling Point: ${data.bp}`;
    if (imfForceEl) imfForceEl.textContent = data.force;
    if (imfPolarEl) imfPolarEl.textContent = data.polar;
    if (imfWhyEl) imfWhyEl.textContent = data.why;
  }

  imfPills.forEach(pill => {
    pill.addEventListener('click', () => {
      imfPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const key = pill.getAttribute('data-imf');
      if (key) updateImfComparator(key);
    });
  });

  updateImfComparator('H2O');

  // =========================================================================
  // 18. METALLIC BONDING LATTICE SIMULATOR
  // =========================================================================

  const btnMetallicNormal = document.getElementById('btn-metallic-normal');
  const btnMetallicVoltage = document.getElementById('btn-metallic-voltage');
  const btnMetallicStress = document.getElementById('btn-metallic-stress');
  const metallicStatusText = document.getElementById('metallic-status-text');
  const metalCations = document.querySelectorAll('.metal-cation');
  const delocElectrons = document.querySelectorAll('.delocalized-electron');

  function setMetallicNormal() {
    metalCations.forEach(c => { c.style.transform = 'none'; });
    delocElectrons.forEach((el, i) => {
      el.style.transition = 'all 0.5s ease';
      el.style.transform = 'none';
    });
    if (metallicStatusText) {
      metallicStatusText.innerHTML = '<strong>Resting Lattice:</strong> Positively charged metal cations (M⁺) reside in fixed lattice sites immersed in a random delocalized electron cloud.';
    }
  }

  function setMetallicVoltage() {
    delocElectrons.forEach((el, i) => {
      el.style.transition = 'transform 1.2s linear infinite';
      el.style.transform = 'translateX(90px)';
    });
    if (metallicStatusText) {
      metallicStatusText.innerHTML = '<strong>Electric Current Applied:</strong> Delocalized electrons drift unidirectionally toward the positive anode, explaining why metals are exceptional electrical conductors.';
    }
  }

  function setMetallicStress() {
    metalCations.forEach((c, idx) => {
      if (idx < 6) {
        c.style.transform = 'translateX(25px)';
      }
    });
    if (metallicStatusText) {
      metallicStatusText.innerHTML = '<strong>Mechanical Stress Applied:</strong> Layers of metal cations slide past each other smoothly without brittle fracture because the flexible sea of electrons cushions the ions (Malleability & Ductility).';
    }
  }

  if (btnMetallicNormal) btnMetallicNormal.addEventListener('click', setMetallicNormal);
  if (btnMetallicVoltage) btnMetallicVoltage.addEventListener('click', setMetallicVoltage);
  if (btnMetallicStress) btnMetallicStress.addEventListener('click', setMetallicStress);

  // Position random electrons across the lattice
  const metallicGrid = document.getElementById('metallic-canvas-grid');
  if (metallicGrid) {
    for (let i = 0; i < 24; i++) {
      const eDot = document.createElement('div');
      eDot.className = 'delocalized-electron';
      eDot.style.top = `${Math.random() * 85 + 5}%`;
      eDot.style.left = `${Math.random() * 90 + 5}%`;
      metallicGrid.appendChild(eDot);
    }
  }

  // =========================================================================
  // 19. FLASHCARD SYSTEM ENGINE
  // =========================================================================

  const flashcardCard = document.getElementById('flashcard-element');
  const fcQuestion = document.getElementById('fc-question');
  const fcAnswer = document.getElementById('fc-answer');
  const fcCounter = document.getElementById('fc-counter-text');
  const btnFcPrev = document.getElementById('btn-fc-prev');
  const btnFcNext = document.getElementById('btn-fc-next');
  const btnFcShuffle = document.getElementById('btn-fc-shuffle');
  const btnFcMastered = document.getElementById('btn-fc-mastered');

  function renderFlashcard(idx) {
    currentFlashcardIdx = idx;
    flashcardFlipped = false;
    flashcardCard?.classList.remove('flipped');

    const card = flashcardsData[idx];
    if (!card) return;

    if (fcQuestion) fcQuestion.textContent = card.q;
    if (fcAnswer) fcAnswer.textContent = card.a;
    if (fcCounter) fcCounter.textContent = `Card ${idx + 1} of ${flashcardsData.length}`;

    if (btnFcMastered) {
      if (masteredFlashcards.includes(idx)) {
        btnFcMastered.textContent = '★ Mastered';
        btnFcMastered.classList.add('action-btn-primary');
      } else {
        btnFcMastered.textContent = '☆ Mark as Mastered';
        btnFcMastered.classList.remove('action-btn-primary');
      }
    }
  }

  if (flashcardCard) {
    flashcardCard.addEventListener('click', () => {
      flashcardFlipped = !flashcardFlipped;
      flashcardCard.classList.toggle('flipped', flashcardFlipped);
    });
  }

  if (btnFcPrev) {
    btnFcPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const prevIdx = (currentFlashcardIdx - 1 + flashcardsData.length) % flashcardsData.length;
      renderFlashcard(prevIdx);
    });
  }

  if (btnFcNext) {
    btnFcNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextIdx = (currentFlashcardIdx + 1) % flashcardsData.length;
      renderFlashcard(nextIdx);
    });
  }

  if (btnFcShuffle) {
    btnFcShuffle.addEventListener('click', (e) => {
      e.stopPropagation();
      const randIdx = Math.floor(Math.random() * flashcardsData.length);
      renderFlashcard(randIdx);
    });
  }

  if (btnFcMastered) {
    btnFcMastered.addEventListener('click', (e) => {
      e.stopPropagation();
      if (masteredFlashcards.includes(currentFlashcardIdx)) {
        masteredFlashcards = masteredFlashcards.filter(i => i !== currentFlashcardIdx);
      } else {
        masteredFlashcards.push(currentFlashcardIdx);
      }
      localStorage.setItem(STORAGE_FLASHCARDS, JSON.stringify(masteredFlashcards));
      renderFlashcard(currentFlashcardIdx);
    });
  }

  renderFlashcard(0);

  // =========================================================================
  // 20. MDCAT MINI QUIZ ENGINE (15 Questions)
  // =========================================================================

  const quizContainer = document.getElementById('quiz-questions-container');
  const quizResultsCard = document.getElementById('quiz-results-card');
  const quizScoreDisplay = document.getElementById('quiz-score-number');
  const quizPercentageDisplay = document.getElementById('quiz-percentage-text');
  const quizFeedbackMsg = document.getElementById('quiz-feedback-message');
  const btnRetryQuiz = document.getElementById('btn-retry-quiz');

  function renderQuiz() {
    if (!quizContainer) return;
    quizAnswers = {};
    quizSubmitted = false;

    if (quizResultsCard) quizResultsCard.classList.remove('show');
    quizContainer.style.display = 'block';

    quizContainer.innerHTML = mcqQuestions.map((q, qIndex) => {
      const letters = ['A', 'B', 'C', 'D'];
      const optionsHtml = q.options.map((opt, optIndex) => `
        <button class="mcq-option-btn" data-qid="${q.id}" data-opt="${optIndex}">
          <span class="option-prefix">${letters[optIndex]}</span>
          <span>${opt}</span>
        </button>
      `).join('');

      return `
        <div class="quiz-question-card" id="quiz-q-${q.id}">
          <div class="question-title">
            <span style="color: var(--primary-dark); font-family: var(--font-mono); margin-right: 0.4rem;">Q${qIndex + 1}.</span>
            ${q.q}
          </div>
          <div class="mcq-options-list">
            ${optionsHtml}
          </div>
          <div class="mcq-explanation-box" id="mcq-exp-${q.id}">
            <strong>✓ Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    }).join('');

    // Attach Option Click Listeners
    quizContainer.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = parseInt(btn.getAttribute('data-qid') || '0', 10);
        const selectedOpt = parseInt(btn.getAttribute('data-opt') || '0', 10);
        handleQuizAnswer(qid, selectedOpt);
      });
    });
  }

  function handleQuizAnswer(qid, selectedOpt) {
    if (quizAnswers[qid] !== undefined) return; // Already answered

    const questionObj = mcqQuestions.find(q => q.id === qid);
    if (!questionObj) return;

    quizAnswers[qid] = selectedOpt;

    const qCard = document.getElementById(`quiz-q-${qid}`);
    if (!qCard) return;

    const optionButtons = qCard.querySelectorAll('.mcq-option-btn');
    optionButtons.forEach((b, optIdx) => {
      b.setAttribute('disabled', 'true');
      if (optIdx === questionObj.correct) {
        b.classList.add('correct');
      } else if (optIdx === selectedOpt && selectedOpt !== questionObj.correct) {
        b.classList.add('wrong');
      }
    });

    const expBox = document.getElementById(`mcq-exp-${qid}`);
    if (expBox) expBox.classList.add('show');

    // Check if all 15 answered
    if (Object.keys(quizAnswers).length === mcqQuestions.length) {
      calculateQuizResults();
    }
  }

  function calculateQuizResults() {
    let score = 0;
    mcqQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });

    const percentage = Math.round((score / mcqQuestions.length) * 100);

    if (quizScoreDisplay) quizScoreDisplay.textContent = score;
    if (quizPercentageDisplay) quizPercentageDisplay.textContent = `${percentage}% Mastery Score`;

    let feedback = '';
    if (percentage >= 85) {
      feedback = '🌟 Exceptional! You have an outstanding mastery of Chemical Bonding, VSEPR Theory, and Molecular Polarity for MDCAT!';
    } else if (percentage >= 65) {
      feedback = '👍 Solid performance! Review the flashcards and specific VSEPR/hybridization rules before your final exam.';
    } else {
      feedback = '📖 Keep practicing! Go through the step-by-step Lewis and VSEPR explorers and retake the quiz.';
    }

    if (quizFeedbackMsg) quizFeedbackMsg.textContent = feedback;
    if (quizResultsCard) quizResultsCard.classList.add('show');
  }

  if (btnRetryQuiz) {
    btnRetryQuiz.addEventListener('click', renderQuiz);
  }

  renderQuiz();

});
