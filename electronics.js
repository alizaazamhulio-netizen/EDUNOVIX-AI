/**
 * ==========================================================================
 * MDCAT PHYSICS — ELECTRONICS CHAPTER (electronics.js)
 * Pure Standalone JavaScript Engine for Complete 3-File Architecture
 * Includes: 22 Topics, 4 Interactive Simulators, 30 MCQs, Flashcards, Themes
 * ==========================================================================
 */

// ==========================================================================
// 1. DATASET: 22 COMPLETE SYLLABUS TOPICS
// ==========================================================================
const CHAPTER_DATA = [
  {
    id: 1,
    title: '1. Introduction to Electronics',
    category: 'Fundamentals',
    def: 'Electronics is the specialized branch of physics and engineering dealing with the controlled flow and manipulation of electrons and charge carriers in semiconductor, gas, or vacuum media.',
    keyPoints: [
      'Unlike general electrical engineering which focuses on high-power generation and transmission, electronics focuses on information processing, control, and signal amplification.',
      'Active components (transistors, diodes, operational amplifiers) have the ability to control current flow and provide amplification.',
      'Passive components (resistors, capacitors, inductors) cannot produce power gain.',
      'Modern solid-state electronics relies entirely on semiconductor crystalline lattices.'
    ],
    tips: [
      'MDCAT Trap: Electronic devices control low-power signal flow; electrical devices convert energy to work/heat.',
      'Solid-state semiconductor circuits replaced fragile, power-hungry thermionic vacuum tubes.'
    ],
    svg: `<svg viewBox="0 0 400 120" width="100%" height="120">
      <rect x="20" y="20" width="100" height="70" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="70" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Input Signal</text>
      <text x="70" y="70" text-anchor="middle" font-size="10" fill="#3b82f6">(Low Power AC)</text>
      <path d="M120 55 L160 55" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="160" y="15" width="110" height="80" rx="8" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
      <text x="215" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#065f46">Active Device</text>
      <text x="215" y="68" text-anchor="middle" font-size="10" fill="#047857">(Transistor Amp)</text>
      <path d="M270 55 L310 55" stroke="#059669" stroke-width="2"/>
      <rect x="310" y="20" width="70" height="70" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="345" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Output</text>
      <text x="345" y="70" text-anchor="middle" font-size="10" fill="#b45309">Gain A &gt; 1</text>
    </svg>`
  },
  {
    id: 2,
    title: '2. Conductors, Insulators & Semiconductors',
    category: 'Fundamentals',
    def: 'Materials classified according to their electrical conductivity and the forbidden energy band gap (Eg) between the valence and conduction bands.',
    keyPoints: [
      'Conductors (Metals): Valence and conduction bands overlap (Eg ≈ 0 eV). Resistivity: 10^-8 to 10^-6 Ω·m. Positive temperature coefficient of resistance (PTCR).',
      'Insulators (Diamond, Glass): Extremely large forbidden gap (Eg > 5 eV, Diamond Eg ≈ 6 eV). Full valence band, empty conduction band.',
      'Semiconductors (Si, Ge): Moderate forbidden gap (Si = 1.12 eV, Ge = 0.72 eV at 300K). Resistivity: 10^-4 to 10^2 Ω·m. Negative temperature coefficient of resistance (NTCR).'
    ],
    tips: [
      'Silicon Eg = 1.12 eV; Germanium Eg = 0.72 eV at room temperature (300 K).',
      'As temperature rises, semiconductor resistance DECREASES, while metal resistance INCREASES.'
    ],
    svg: `<svg viewBox="0 0 450 140" width="100%" height="140">
      <!-- Conductor -->
      <rect x="20" y="20" width="110" height="40" fill="#93c5fd" opacity="0.8"/>
      <rect x="20" y="50" width="110" height="40" fill="#fca5a5" opacity="0.8"/>
      <text x="75" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Conductor (Overlap)</text>
      <text x="75" y="125" text-anchor="middle" font-size="10" fill="#64748b">Eg ≈ 0 eV</text>
      <!-- Semiconductor -->
      <rect x="170" y="20" width="110" height="30" fill="#93c5fd"/>
      <rect x="170" y="75" width="110" height="30" fill="#fca5a5"/>
      <text x="225" y="65" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">Eg ≈ 1.1 eV</text>
      <text x="225" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Semiconductor</text>
      <!-- Insulator -->
      <rect x="320" y="15" width="110" height="25" fill="#93c5fd"/>
      <rect x="320" y="85" width="110" height="25" fill="#fca5a5"/>
      <text x="375" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Eg &gt; 5 eV (Large)</text>
      <text x="375" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Insulator (Eg &gt; 5eV)</text>
    </svg>`
  },
  {
    id: 3,
    title: '3. Intrinsic Semiconductor',
    category: 'Semiconductors',
    def: 'A pure, undoped crystalline semiconductor (Group IV: Si, Ge) where thermal energy generates equal numbers of mobile electrons and holes (n = p = ni).',
    keyPoints: [
      'Tetravalent crystalline structure: Each Si atom shares 4 valence electrons with 4 neighboring atoms forming covalent bonds.',
      'At 0 Kelvin, all valence electrons are locked; conduction band is empty (acts as a perfect insulator).',
      'At room temperature (~300 K), thermal excitation breaks covalent bonds, liberating free electrons into conduction band and leaving behind holes in valence band.',
      'Total current is the arithmetic SUM of electron and hole currents: I = Ie + Ih.'
    ],
    tips: [
      'Always remember: In intrinsic semiconductors, n = p strictly.',
      'Holes move in the direction of applied electric field; electrons move opposite.'
    ],
    svg: `<svg viewBox="0 0 360 120" width="100%" height="120">
      <circle cx="80" cy="60" r="22" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="80" y="65" text-anchor="middle" font-weight="bold" fill="#4338ca">Si (+4)</text>
      <circle cx="180" cy="60" r="22" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="180" y="65" text-anchor="middle" font-weight="bold" fill="#4338ca">Si (+4)</text>
      <circle cx="280" cy="60" r="22" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="280" y="65" text-anchor="middle" font-weight="bold" fill="#4338ca">Si (+4)</text>
      <line x1="102" y1="60" x2="158" y2="60" stroke="#6366f1" stroke-width="3" stroke-dasharray="4"/>
      <line x1="202" y1="60" x2="258" y2="60" stroke="#6366f1" stroke-width="3" stroke-dasharray="4"/>
      <text x="180" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">Covalent Bonds (n = p = ni)</text>
    </svg>`
  },
  {
    id: 4,
    title: '4. Extrinsic Semiconductor & Doping',
    category: 'Semiconductors',
    def: 'A semiconductor doped with controlled trace impurities (1 atom per 10^6 to 10^8 host atoms) to vastly increase carrier concentration and conductivity.',
    keyPoints: [
      'Doping alters electrical conductivity by orders of magnitude without disturbing crystal lattice structural integrity.',
      'Trivalent doping (Group III) creates P-Type material (excess holes).',
      'Pentavalent doping (Group V) creates N-Type material (excess free electrons).',
      'Extrinsic semiconductors obey the mass-action law at thermal equilibrium: n · p = ni².'
    ],
    tips: [
      'Doping ratio is tiny (1 in 10^6 to 10^8), yet boosts conductivity by thousands of times.',
      'The overall extrinsic semiconductor piece remains 100% electrically neutral!'
    ],
    svg: `<svg viewBox="0 0 360 100" width="100%" height="100">
      <rect x="30" y="20" width="130" height="60" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="95" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">N-Type Doping</text>
      <text x="95" y="62" text-anchor="middle" font-size="10" fill="#3b82f6">Pentavalent (P, As, Sb)</text>
      <rect x="200" y="20" width="130" height="60" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="2"/>
      <text x="265" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#9f1239">P-Type Doping</text>
      <text x="265" y="62" text-anchor="middle" font-size="10" fill="#e11d48">Trivalent (B, Al, Ga, In)</text>
    </svg>`
  },
  {
    id: 5,
    title: '5. N-Type Semiconductor',
    category: 'Semiconductors',
    def: 'Formed by doping pure silicon with pentavalent donor atoms (Phosphorus, Arsenic, Antimony). Free electrons are majority carriers; holes are minority carriers.',
    keyPoints: [
      'Each pentavalent donor atom donates 1 extra electron to the conduction band without creating a hole.',
      'Donor energy level (Ed) lies just below the conduction band edge (~0.05 eV in Si).',
      'Majority carriers: Free Electrons (n ≈ Nd). Minority carriers: Holes (p ≈ ni²/Nd).',
      'The crystal lattice retains fixed positive donor ions, making the crystal electrically neutral overall.'
    ],
    tips: [
      'MDCAT Question: An N-type crystal is electrically NEUTRAL (not negatively charged).',
      'Majority carrier current dominates, but thermal generation still creates trace minority holes.'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <rect x="20" y="15" width="310" height="80" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <circle cx="70" cy="55" r="14" fill="#3b82f6" opacity="0.2"/>
      <text x="70" y="60" text-anchor="middle" font-weight="bold" fill="#1d4ed8">+D</text>
      <circle cx="110" cy="40" r="5" fill="#2563eb"/><text x="110" y="32" text-anchor="middle" font-size="9" fill="#1e40af">e⁻</text>
      <circle cx="170" cy="55" r="14" fill="#3b82f6" opacity="0.2"/>
      <text x="170" y="60" text-anchor="middle" font-weight="bold" fill="#1d4ed8">+D</text>
      <circle cx="210" cy="65" r="5" fill="#2563eb"/><text x="210" y="57" text-anchor="middle" font-size="9" fill="#1e40af">e⁻</text>
      <circle cx="270" cy="55" r="14" fill="#3b82f6" opacity="0.2"/>
      <text x="270" y="60" text-anchor="middle" font-weight="bold" fill="#1d4ed8">+D</text>
      <circle cx="310" cy="45" r="5" fill="#2563eb"/><text x="310" y="37" text-anchor="middle" font-size="9" fill="#1e40af">e⁻</text>
    </svg>`
  },
  {
    id: 6,
    title: '6. P-Type Semiconductor',
    category: 'Semiconductors',
    def: 'Formed by doping pure silicon with trivalent acceptor atoms (Boron, Aluminium, Gallium, Indium). Holes are majority carriers; electrons are minority carriers.',
    keyPoints: [
      'Each trivalent atom creates a vacant bonding site (hole) in the valence band ready to accept an electron.',
      'Acceptor energy level (Ea) lies just above the valence band edge (~0.05 eV in Si).',
      'Majority carriers: Holes (p ≈ Na). Minority carriers: Electrons (n ≈ ni²/Na).',
      'Acceptor atoms become immobile negative ions, but the overall semiconductor is electrically neutral.'
    ],
    tips: [
      'Holes act as positive charge carriers with effective positive charge (+1.6 × 10^-19 C).',
      'P-type semiconductors have zero net charge despite having majority holes.'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <rect x="20" y="15" width="310" height="80" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
      <circle cx="70" cy="55" r="14" fill="#f43f5e" opacity="0.2"/>
      <text x="70" y="60" text-anchor="middle" font-weight="bold" fill="#be123c">-A</text>
      <circle cx="110" cy="40" r="5" fill="none" stroke="#e11d48" stroke-width="2"/><text x="110" y="30" text-anchor="middle" font-size="9" fill="#be123c">h⁺</text>
      <circle cx="170" cy="55" r="14" fill="#f43f5e" opacity="0.2"/>
      <text x="170" y="60" text-anchor="middle" font-weight="bold" fill="#be123c">-A</text>
      <circle cx="210" cy="65" r="5" fill="none" stroke="#e11d48" stroke-width="2"/><text x="210" y="55" text-anchor="middle" font-size="9" fill="#be123c">h⁺</text>
      <circle cx="270" cy="55" r="14" fill="#f43f5e" opacity="0.2"/>
      <text x="270" y="60" text-anchor="middle" font-weight="bold" fill="#be123c">-A</text>
      <circle cx="310" cy="45" r="5" fill="none" stroke="#e11d48" stroke-width="2"/><text x="310" y="35" text-anchor="middle" font-size="9" fill="#be123c">h⁺</text>
    </svg>`
  },
  {
    id: 7,
    title: '7. PN Junction & Depletion Region',
    category: 'Diodes & Rectification',
    def: 'The interface boundary formed when P-type and N-type semiconductor regions are joined in a single continuous crystal structure.',
    keyPoints: [
      'Carrier Diffusion: Majority electrons in N-side diffuse into P-side; majority holes in P-side diffuse into N-side.',
      'Recombination near interface neutralizes mobile carriers, leaving uncompensated immobile positive ions in N-region and negative ions in P-region.',
      'This region devoid of free mobile charge carriers is called the Depletion Region.',
      'Built-in electric field points from N-side (+ ions) to P-side (- ions), halting further majority carrier diffusion.'
    ],
    tips: [
      'Depletion region contains ONLY immobile donor and acceptor ions, NO free carriers.',
      'Internal electric field points from N to P.'
    ],
    svg: `<svg viewBox="0 0 400 130" width="100%" height="130">
      <rect x="30" y="20" width="150" height="80" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2"/>
      <text x="80" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="#be123c">P - Side (Holes)</text>
      <rect x="220" y="20" width="150" height="80" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="300" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e40af">N - Side (Electrons)</text>
      <!-- Depletion Zone -->
      <rect x="150" y="15" width="100" height="90" fill="#fef3c7" stroke="#d97706" stroke-dasharray="3" opacity="0.85"/>
      <text x="200" y="45" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Depletion Region</text>
      <text x="175" y="75" font-size="12" font-weight="bold" fill="#b91c1c">- -</text>
      <text x="215" y="75" font-size="12" font-weight="bold" fill="#1d4ed8">+ +</text>
      <path d="M225 90 L175 90" stroke="#d97706" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="200" y="102" text-anchor="middle" font-size="9" fill="#92400e">Internal E-Field (N → P)</text>
    </svg>`
  },
  {
    id: 8,
    title: '8. Potential Barrier',
    category: 'Diodes & Rectification',
    def: 'The built-in contact potential (V0) established across the depletion layer by immobile space-charge ions that prevents further diffusion of majority charge carriers.',
    keyPoints: [
      'Silicon PN Junction: Potential barrier V0 ≈ 0.7 V at room temperature (300 K).',
      'Germanium PN Junction: Potential barrier V0 ≈ 0.3 V at room temperature (300 K).',
      'Barrier potential decreases with increasing temperature at approx -2 mV/°C due to increased thermal carrier generation.',
      'Heavier doping produces a narrower depletion region and steeper electric field gradient.'
    ],
    tips: [
      'High-Yield MDCAT Fact: Potential barrier is 0.7 V for Si and 0.3 V for Ge.',
      'Potential barrier DECREASES as temperature increases.'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <rect x="40" y="20" width="120" height="70" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
      <text x="100" y="50" text-anchor="middle" font-weight="bold" fill="#0369a1">Silicon (Si)</text>
      <text x="100" y="70" text-anchor="middle" font-size="14" font-weight="800" fill="#0284c7">V0 = 0.7 V</text>
      <rect x="190" y="20" width="120" height="70" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
      <text x="250" y="50" text-anchor="middle" font-weight="bold" fill="#a16207">Germanium (Ge)</text>
      <text x="250" y="70" text-anchor="middle" font-size="14" font-weight="800" fill="#ca8a04">V0 = 0.3 V</text>
    </svg>`
  },
  {
    id: 9,
    title: '9. Forward Biasing of PN Junction',
    category: 'Diodes & Rectification',
    def: 'Biasing condition where the positive terminal of an external battery is connected to the P-side and the negative terminal to the N-side.',
    keyPoints: [
      'The external electric field opposes the internal barrier electric field.',
      'Depletion region width narrows significantly.',
      'When external voltage exceeds barrier potential (V > 0.7V for Si, V > 0.3V for Ge), majority carriers flood across junction resulting in exponential forward current (mA range).',
      'Forward dynamic resistance rf = ΔVf / ΔIf is very low (typically a few ohms).'
    ],
    tips: [
      'Forward bias: P to (+), N to (-). Depletion layer narrows, large forward current (milliamperes).',
      'Current is zero until applied voltage crosses the knee/cut-in voltage (0.7V for Si).'
    ],
    svg: `<svg viewBox="0 0 380 120" width="100%" height="120">
      <rect x="30" y="15" width="140" height="60" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2"/>
      <text x="100" y="45" text-anchor="middle" font-weight="bold" fill="#be123c">P (+ Battery)</text>
      <rect x="210" y="15" width="140" height="60" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="280" y="45" text-anchor="middle" font-weight="bold" fill="#1e40af">N (- Battery)</text>
      <rect x="165" y="15" width="50" height="60" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
      <text x="190" y="50" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Narrow</text>
      <text x="190" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">Large Forward Current IF &gt; 0 (mA)</text>
    </svg>`
  },
  {
    id: 10,
    title: '10. Reverse Biasing of PN Junction',
    category: 'Diodes & Rectification',
    def: 'Biasing condition where the positive terminal of an external battery is connected to the N-side and the negative terminal to the P-side.',
    keyPoints: [
      'The applied voltage reinforces the internal barrier electric field.',
      'Depletion region widens significantly as majority carriers are pulled away from the junction.',
      'Zero majority carrier current; only a tiny reverse saturation current (Is) flows due to thermally generated minority carriers (nano-amperes in Si, micro-amperes in Ge).',
      'Reverse resistance is extremely high (mega-ohms range).'
    ],
    tips: [
      'Reverse bias: P to (-), N to (+). Depletion layer widens, negligible current (nano-amperes).',
      'Reverse saturation current depends solely on temperature, practically independent of reverse voltage.'
    ],
    svg: `<svg viewBox="0 0 380 120" width="100%" height="120">
      <rect x="30" y="15" width="110" height="60" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2"/>
      <text x="85" y="45" text-anchor="middle" font-weight="bold" fill="#be123c">P (- Battery)</text>
      <rect x="240" y="15" width="110" height="60" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="295" y="45" text-anchor="middle" font-weight="bold" fill="#1e40af">N (+ Battery)</text>
      <rect x="135" y="10" width="110" height="70" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="190" y="45" text-anchor="middle" font-size="10" font-weight="bold" fill="#c2410c">Widened Depletion</text>
      <text x="190" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Reverse Leakage Current Is ≈ 0 (nA)</text>
    </svg>`
  },
  {
    id: 11,
    title: '11. Semiconductor Diode & I-V Characteristics',
    category: 'Diodes & Rectification',
    def: 'A two-terminal electronic device formed by a PN junction that allows current to pass easily in forward bias but blocks it in reverse bias.',
    keyPoints: [
      'Anode (P-terminal) and Cathode (N-terminal).',
      'Forward I-V curve exhibits non-ohmic exponential behavior starting after knee voltage (0.7V for Si).',
      'Reverse I-V curve shows constant micro/nano-amp leakage current until reverse breakdown voltage (Vbr).',
      'Dynamic resistance rd = ΔV / ΔI is reciprocal of slope of I-V characteristic curve.'
    ],
    tips: [
      'Diode is a non-ohmic conductor (Ohm’s law is not obeyed).',
      'Cathode is marked by a physical silver/white band on the diode cylinder package.'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <path d="M60 55 L130 55" stroke="#1e293b" stroke-width="2"/>
      <polygon points="130,30 130,80 180,55" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
      <line x1="180" y1="30" x2="180" y2="80" stroke="#e11d48" stroke-width="4"/>
      <path d="M180 55 L250 55" stroke="#1e293b" stroke-width="2"/>
      <text x="90" y="40" font-weight="bold" fill="#1e40af">Anode (P)</text>
      <text x="210" y="40" font-weight="bold" fill="#9f1239">Cathode (N)</text>
    </svg>`
  },
  {
    id: 12,
    title: '12. Rectification & Rectifiers',
    category: 'Diodes & Rectification',
    def: 'The process of converting bidirectional Alternating Current (AC) into unidirectional Direct Current (DC) using diode non-linear conduction.',
    keyPoints: [
      'Diodes conduct only during forward bias (positive half cycles of AC) and block reverse cycles.',
      'Half-Wave Rectifier: Uses 1 diode; conducts for 1 half-cycle only.',
      'Full-Wave Rectifier: Uses 4 diodes in a bridge (or 2 diodes with center-tapped transformer); conducts for both positive and negative AC half-cycles.',
      'Filter circuits (capacitors/inductors) remove pulsating AC ripples to produce smooth DC.'
    ],
    tips: [
      'Rectification converts bidirectional AC to unidirectional pulsating DC.',
      'A diode acts as an electronic one-way check valve.'
    ],
    svg: `<svg viewBox="0 0 360 100" width="100%" height="100">
      <rect x="20" y="15" width="90" height="70" rx="6" fill="#e0e7ff" stroke="#4338ca"/>
      <text x="65" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#3730a3">AC Input</text>
      <text x="65" y="65" text-anchor="middle" font-size="9" fill="#4f46e5">(Sine wave)</text>
      <path d="M110 50 L160 50" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="160" y="15" width="80" height="70" rx="6" fill="#d1fae5" stroke="#059669"/>
      <text x="200" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Rectifier</text>
      <path d="M240 50 L290 50" stroke="#059669" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="290" y="15" width="60" height="70" rx="6" fill="#fef3c7" stroke="#d97706"/>
      <text x="320" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">DC Output</text>
      <text x="320" y="65" text-anchor="middle" font-size="9" fill="#b45309">(Pulsating)</text>
    </svg>`
  },
  {
    id: 13,
    title: '13. Half-Wave Rectification',
    category: 'Diodes & Rectification',
    def: 'A rectifier circuit containing a single diode that allows only one half-cycle of the input AC supply to reach the load resistor.',
    keyPoints: [
      'During positive half-cycle, diode is forward-biased and delivers current to load.',
      'During negative half-cycle, diode is reverse-biased; current through load is zero.',
      'Maximum theoretical efficiency: η_max = 40.6%.',
      'Output ripple frequency: f_out = f_in (e.g. 50 Hz in -> 50 Hz out).',
      'Peak Inverse Voltage (PIV) across diode: PIV = Vm (peak input voltage).'
    ],
    tips: [
      'Half-wave rectifier efficiency = 40.6%. Output frequency = input frequency (50 Hz = 50 Hz).',
      'Ripple factor is high (γ = 1.21), making it inefficient for precision electronics.'
    ],
    svg: `<svg viewBox="0 0 360 110" width="100%" height="110">
      <path d="M30 60 Q 50 30, 70 60 T 110 60" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="70" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">AC Input (50 Hz)</text>
      <path d="M125 55 L160 55" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
      <polygon points="175,40 175,70 195,55" fill="#059669" stroke="#047857"/>
      <line x1="195" y1="40" x2="195" y2="70" stroke="#059669" stroke-width="2"/>
      <path d="M210 55 L245 55" stroke="#64748b" stroke-width="2"/>
      <path d="M255 60 Q 275 30, 295 60 L 335 60" fill="none" stroke="#d97706" stroke-width="2"/>
      <text x="295" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706">Half-Wave Output (η=40.6%)</text>
    </svg>`
  },
  {
    id: 14,
    title: '14. Full-Wave Bridge Rectification',
    category: 'Diodes & Rectification',
    def: 'A rectifier circuit using four diodes in a bridge arrangement that utilizes both halves of the AC input cycle to produce continuous unidirectional DC.',
    keyPoints: [
      'Diodes conduct in diagonal pairs: D1 & D3 conduct during positive half-cycle; D2 & D4 conduct during negative half-cycle.',
      'Current always flows through the load resistor in the EXACT SAME direction during both half-cycles.',
      'Maximum theoretical efficiency: η_max = 81.2% (exactly twice half-wave).',
      'Output ripple frequency: f_out = 2 · f_in (e.g. 50 Hz in -> 100 Hz out).',
      'Peak Inverse Voltage across each non-conducting diode: PIV = Vm.'
    ],
    tips: [
      'Full-wave efficiency = 81.2%. Output frequency = 2 × fin (50 Hz AC -> 100 Hz output ripple).',
      'Bridge rectifier does NOT require an expensive, bulky center-tapped transformer.'
    ],
    svg: `<svg viewBox="0 0 360 110" width="100%" height="110">
      <path d="M30 60 Q 45 30, 60 60 T 90 60" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="60" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">AC Input (fin)</text>
      <rect x="120" y="20" width="90" height="65" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="165" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#047857">4-Diode Bridge</text>
      <path d="M235 60 Q 250 30, 265 60 Q 280 30, 295 60" fill="none" stroke="#059669" stroke-width="2"/>
      <text x="265" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">fout = 2 × fin (100 Hz, η=81.2%)</text>
    </svg>`
  },
  {
    id: 15,
    title: '15. Specially Doped Diodes (LED & Photodiode)',
    category: 'Diodes & Rectification',
    def: 'Optoelectronic semiconductor PN junctions engineered for light emission (LED) or photon detection (Photodiode).',
    keyPoints: [
      'Light Emitting Diode (LED): Operated in FORWARD BIAS. Direct bandgap materials (GaAs, GaP). When electrons and holes recombine, photon energy is released: E = h·f = h·c/λ = Eg.',
      'Photodiode: Operated in REVERSE BIAS in dark mode. When incident photons of energy h·f ≥ Eg hit depletion layer, electron-hole pairs are created, producing reverse photocurrent proportional to light intensity.',
      'Solar Cell: Unbiased photovoltaic PN junction converting incident solar photons directly to electrical voltage.'
    ],
    tips: [
      'LED = Forward Bias; Photodiode = Reverse Bias.',
      'Wavelength of emitted LED light is inversely proportional to semiconductor bandgap: λ = hc/Eg.'
    ],
    svg: `<svg viewBox="0 0 360 110" width="100%" height="110">
      <rect x="30" y="20" width="130" height="70" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="95" y="48" text-anchor="middle" font-weight="bold" fill="#92400e">LED (Forward Bias)</text>
      <text x="95" y="68" text-anchor="middle" font-size="10" fill="#b45309">Emits Light (hf = Eg)</text>
      <rect x="195" y="20" width="135" height="70" rx="6" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="262" y="48" text-anchor="middle" font-weight="bold" fill="#3730a3">Photodiode (Rev Bias)</text>
      <text x="262" y="68" text-anchor="middle" font-size="10" fill="#4f46e5">Absorbs Light (I ∝ Lux)</text>
    </svg>`
  },
  {
    id: 16,
    title: '16. Junction Transistor (BJT Architecture)',
    category: 'Transistors',
    def: 'A three-terminal, two-junction semiconductor sandwich consisting of two outer regions of one type separated by a very thin middle region of opposite type (NPN or PNP).',
    keyPoints: [
      'Emitter (E): Heavily doped, moderate size. Function: Emits majority charge carriers.',
      'Base (B): Extremely thin (10^-6 m), very lightly doped. Function: Allows >95% carriers to pass through to collector.',
      'Collector (C): Moderately doped, largest physical size. Function: Collects carriers and dissipates heat.',
      'Emitter-Base (EB) junction is forward-biased; Collector-Base (CB) junction is reverse-biased for normal active amplification.'
    ],
    tips: [
      'Emitter = Heavily Doped; Base = Very Thin & Lightly Doped; Collector = Largest Physical Size.',
      'Arrow in transistor circuit symbol is ALWAYS on the Emitter, pointing in the direction of conventional current (from P to N).'
    ],
    svg: `<svg viewBox="0 0 360 120" width="100%" height="120">
      <rect x="30" y="25" width="100" height="70" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="80" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af">Emitter (N)</text>
      <text x="80" y="70" text-anchor="middle" font-size="9" fill="#3b82f6">Heavily Doped</text>
      <rect x="130" y="25" width="30" height="70" fill="#ffe4e6" stroke="#e11d48" stroke-width="2"/>
      <text x="145" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#9f1239">B</text>
      <rect x="160" y="25" width="170" height="70" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
      <text x="245" y="55" text-anchor="middle" font-weight="bold" fill="#1e40af">Collector (N)</text>
      <text x="245" y="70" text-anchor="middle" font-size="9" fill="#3b82f6">Largest Size, Mod Doped</text>
    </svg>`
  },
  {
    id: 17,
    title: '17. Transistor Current Equation & Current Gains',
    category: 'Transistors',
    def: 'Fundamental mathematical relationships governing charge carrier balance and current amplification in bipolar junction transistors.',
    keyPoints: [
      'Transistor Current Law: I_E = I_B + I_C (Emitter current equals base current + collector current).',
      'Common Emitter Current Gain (β or hFE): β = I_C / I_B (typically 20 to 500).',
      'Common Base Current Gain (α): α = I_C / I_E (always < 1, typically 0.95 to 0.998).',
      'Inter-gain conversion formulas: β = α / (1 - α) and α = β / (1 + β).'
    ],
    tips: [
      'IE is always the largest current in the transistor: IE = IB + IC.',
      'Base current IB is only 1% to 5% of IE; Collector current IC is 95% to 99% of IE.'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <rect x="30" y="20" width="290" height="70" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
      <text x="175" y="45" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#0f172a">IE = IB + IC</text>
      <text x="175" y="70" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#059669">β = IC / IB &nbsp;|&nbsp; α = IC / IE &lt; 1</text>
    </svg>`
  },
  {
    id: 18,
    title: '18. Transistor as a Common Emitter Amplifier',
    category: 'Transistors',
    def: 'A circuit configuration where the input AC signal is applied between Base and Emitter, and the amplified output is taken across Collector and Emitter.',
    keyPoints: [
      'Input junction (EB) is forward biased; output junction (CB) is reverse biased.',
      'Small change in base current (ΔIB) produces a large change in collector current (ΔIC = β·ΔIB) across load resistor RC.',
      'Voltage Gain: Av = Vout / Vin = - (β · RC / rin). The negative sign denotes a 180° phase shift.',
      'Output voltage is 180° (π radians) out of phase with input AC signal.'
    ],
    tips: [
      'In Common Emitter amplifier, input and output voltages have a 180° (π radians) phase inversion.',
      'Common Emitter configuration provides BOTH high voltage gain and high current gain (highest power gain).'
    ],
    svg: `<svg viewBox="0 0 360 110" width="100%" height="110">
      <path d="M30 55 Q 45 35, 60 55 T 90 55" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="60" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">Vin (Input)</text>
      <rect x="130" y="20" width="100" height="65" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
      <text x="180" y="55" text-anchor="middle" font-weight="bold" fill="#065f46">CE Amp (Av)</text>
      <path d="M265 55 Q 285 85, 305 55 T 345 55" fill="none" stroke="#e11d48" stroke-width="2.5"/>
      <text x="305" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#e11d48">Vout (180° Inverted)</text>
    </svg>`
  },
  {
    id: 19,
    title: '19. Transistor as an Electronic Switch',
    category: 'Transistors',
    def: 'Operating a BJT in its Cut-off region (OFF state) and Saturation region (ON state) to switch electric currents electronically without mechanical moving parts.',
    keyPoints: [
      'Cut-off Region (OFF State): Vin ≈ 0 V, IB = 0, IC = 0, VCE = VCC. Acts as an OPEN circuit switch.',
      'Saturation Region (ON State): High Vin, large IB drives transistor to saturation, IC reaches maximum (IC(sat) ≈ VCC/RC), VCE ≈ 0.2 V. Acts as a CLOSED circuit switch.',
      'Active Region: Region between Cutoff and Saturation used solely for linear amplification.',
      'Electronic switching speeds reach GHz frequencies with zero mechanical wear.'
    ],
    tips: [
      'Switch OFF = Cut-off region (VCE ≈ VCC, IC = 0).',
      'Switch ON = Saturation region (VCE ≈ 0 V, IC = max).'
    ],
    svg: `<svg viewBox="0 0 360 100" width="100%" height="100">
      <rect x="30" y="15" width="135" height="70" rx="6" fill="#ffe4e6" stroke="#e11d48" stroke-width="2"/>
      <text x="97" y="45" text-anchor="middle" font-weight="bold" fill="#9f1239">Cut-off (OFF)</text>
      <text x="97" y="65" text-anchor="middle" font-size="10" fill="#be123c">IB = 0, VCE = VCC</text>
      <rect x="195" y="15" width="135" height="70" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
      <text x="262" y="45" text-anchor="middle" font-weight="bold" fill="#065f46">Saturation (ON)</text>
      <text x="262" y="65" text-anchor="middle" font-size="10" fill="#047857">VCE ≈ 0.2V, IC = max</text>
    </svg>`
  },
  {
    id: 20,
    title: '20. Operational Amplifier (Op-Amp) Fundamentals',
    category: 'Transistors',
    def: 'A high-gain direct-coupled differential voltage amplifier with differential inputs (Inverting and Non-inverting) and a single-ended output.',
    keyPoints: [
      'Inverting input (-): Output is inverted (180° phase shifted).',
      'Non-inverting input (+): Output is in phase (0° phase shift).',
      'Ideal Op-Amp Parameters: Open-loop gain AOL = ∞, Input impedance Rin = ∞ (draws zero input current: I+ = I- = 0), Output impedance Rout = 0, Bandwidth = ∞.',
      'Virtual Ground Principle in Inverting configuration: Due to infinite gain AOL, V- ≈ V+ = 0 V.'
    ],
    tips: [
      'Ideal Op-Amp: Infinite input impedance (Rin = ∞), Zero output impedance (Rout = 0), Infinite gain (AOL = ∞).',
      'No current enters either input terminal of an ideal op-amp (Iin = 0).'
    ],
    svg: `<svg viewBox="0 0 350 110" width="100%" height="110">
      <polygon points="120,20 120,90 230,55" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
      <line x1="50" y1="38" x2="120" y2="38" stroke="#0f172a" stroke-width="2"/>
      <text x="135" y="43" font-size="14" font-weight="bold" fill="#e11d48">-</text>
      <text x="75" y="30" font-size="10" font-weight="bold" fill="#64748b">Inverting</text>
      <line x1="50" y1="72" x2="120" y2="72" stroke="#0f172a" stroke-width="2"/>
      <text x="135" y="77" font-size="14" font-weight="bold" fill="#059669">+</text>
      <text x="65" y="90" font-size="10" font-weight="bold" fill="#64748b">Non-Inverting</text>
      <line x1="230" y1="55" x2="300" y2="55" stroke="#0f172a" stroke-width="2"/>
      <text x="270" y="48" font-size="11" font-weight="bold" fill="#0284c7">Vout</text>
    </svg>`
  },
  {
    id: 21,
    title: '21. Basic Logic Gates (AND, OR, NOT)',
    category: 'Digital Electronics',
    def: 'Fundamental digital electronic building blocks operating on binary logic levels (HIGH = 1, LOW = 0) with Boolean mathematical operations.',
    keyPoints: [
      'AND Gate: Output Y = A · B is HIGH (1) only when ALL inputs are HIGH (1).',
      'OR Gate: Output Y = A + B is HIGH (1) if ANY input is HIGH (1).',
      'NOT Gate (Inverter): Output Y = Ā inverts single binary input (0 -> 1, 1 -> 0).'
    ],
    tips: [
      'AND = Series switch circuit; OR = Parallel switch circuit.',
      'NOT gate is also called a digital inverter.'
    ],
    svg: `<svg viewBox="0 0 360 100" width="100%" height="100">
      <rect x="20" y="15" width="90" height="70" rx="6" fill="#eff6ff" stroke="#2563eb"/>
      <text x="65" y="45" text-anchor="middle" font-weight="bold" fill="#1e40af">AND</text>
      <text x="65" y="65" text-anchor="middle" font-family="monospace" font-size="10" fill="#2563eb">Y = A · B</text>
      <rect x="135" y="15" width="90" height="70" rx="6" fill="#ecfdf5" stroke="#059669"/>
      <text x="180" y="45" text-anchor="middle" font-weight="bold" fill="#065f46">OR</text>
      <text x="180" y="65" text-anchor="middle" font-family="monospace" font-size="10" fill="#059669">Y = A + B</text>
      <rect x="250" y="15" width="90" height="70" rx="6" fill="#fff1f2" stroke="#e11d48"/>
      <text x="295" y="45" text-anchor="middle" font-weight="bold" fill="#9f1239">NOT</text>
      <text x="295" y="65" text-anchor="middle" font-family="monospace" font-size="10" fill="#e11d48">Y = Ā</text>
    </svg>`
  },
  {
    id: 22,
    title: '22. Universal Gates (NAND, NOR) & De Morgan’s Laws',
    category: 'Digital Electronics',
    def: 'NAND and NOR gates are universal gates because any Boolean function or basic gate (AND, OR, NOT) can be synthesized using ONLY NAND or ONLY NOR gates.',
    keyPoints: [
      'NAND Gate: Y = (A · B)̄. AND followed by NOT bubble.',
      'NOR Gate: Y = (A + B)̄. OR followed by NOT bubble.',
      'XOR Gate: Y = A ⊕ B = ĀB + AB̄ (HIGH when inputs are different).',
      'XNOR Gate: Y = (A ⊕ B)̄ = AB + ĀB̄ (HIGH when inputs are equal).',
      'De Morgan’s First Theorem: (A · B)̄ = Ā + B̄.',
      'De Morgan’s Second Theorem: (A + B)̄ = Ā · B̄.'
    ],
    tips: [
      'NAND and NOR are Universal Gates.',
      'De Morgan: Break the bar and change the sign! (A·B)̄ = Ā + B̄; (A+B)̄ = Ā · B̄.'
    ],
    svg: `<svg viewBox="0 0 360 100" width="100%" height="100">
      <rect x="25" y="15" width="140" height="70" rx="6" fill="#fdf4ff" stroke="#a855f7" stroke-width="2"/>
      <text x="95" y="45" text-anchor="middle" font-weight="bold" fill="#7e22ce">NAND (Univ)</text>
      <text x="95" y="65" text-anchor="middle" font-family="monospace" font-size="11" fill="#9333ea">Y = (A · B)̄</text>
      <rect x="195" y="15" width="140" height="70" rx="6" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
      <text x="265" y="45" text-anchor="middle" font-weight="bold" fill="#c2410c">NOR (Univ)</text>
      <text x="265" y="65" text-anchor="middle" font-family="monospace" font-size="11" fill="#ea580c">Y = (A + B)̄</text>
    </svg>`
  }
];

// ==========================================================================
// 2. DATASET: 30 AUTHENTIC MDCAT MCQS
// ==========================================================================
const MCQS = [
  { q: 'The forbidden energy gap (Eg) of pure Silicon at room temperature (300 K) is approximately:', options: ['0.72 eV', '1.12 eV', '0 eV', '6.0 eV'], ans: 1, exp: 'Silicon has a bandgap Eg ≈ 1.12 eV, while Germanium is 0.72 eV. Conductors have Eg ≈ 0 eV, and insulators Eg > 5 eV.' },
  { q: 'As temperature of an intrinsic semiconductor rises, its electrical resistance:', options: ['Increases exponentially', 'Decreases because more electron-hole pairs are liberated', 'Remains constant', 'First increases then decreases'], ans: 1, exp: 'Semiconductors have a negative temperature coefficient of resistance (NTCR). Thermal energy liberates more charge carriers, decreasing resistance.' },
  { q: 'At absolute zero temperature (0 K), an intrinsic semiconductor behaves as a:', options: ['Superconductor', 'Good conductor', 'Perfect insulator', 'Ferromagnet'], ans: 2, exp: 'At 0 K, thermal energy is zero; valence band is full and conduction band is empty, behaving as a perfect insulator.' },
  { q: 'Which element produces an N-type semiconductor when doped into pure Silicon?', options: ['Boron (B)', 'Aluminium (Al)', 'Gallium (Ga)', 'Phosphorus (P)'], ans: 3, exp: 'Phosphorus is pentavalent (Group V) and provides a free donor electron. B, Al, and Ga are trivalent (P-type).' },
  { q: 'An extrinsic P-type semiconductor crystal as a whole has an electrical charge of:', options: ['Positive charge', 'Negative charge', 'Neutral (zero net charge)', 'Variable'], ans: 2, exp: 'Every mobile hole is balanced by a fixed negative acceptor ion; the bulk crystal is strictly electrically neutral.' },
  { q: 'The potential barrier across a Silicon PN junction and a Germanium PN junction at room temperature are respectively:', options: ['0.3 V and 0.7 V', '0.7 V and 0.3 V', '1.1 V and 0.7 V', '0.7 V and 0.7 V'], ans: 1, exp: 'Silicon has a barrier of 0.7 V, and Germanium has a barrier of 0.3 V.' },
  { q: 'In a forward-biased PN junction diode, the width of the depletion region:', options: ['Increases', 'Decreases', 'Remains unchanged', 'Expands infinitely'], ans: 1, exp: 'External forward voltage opposes built-in potential barrier, pushing carriers toward the junction and narrowing the depletion region.' },
  { q: 'In a reverse-biased PN junction, the tiny reverse saturation current is due to:', options: ['Majority carriers', 'Minority carriers generated thermally', 'Immobile ions', 'Surface leakage only'], ans: 1, exp: 'Reverse current is carried by thermally generated minority carriers (electrons in P-side, holes in N-side).' },
  { q: 'The output frequency of a Full-Wave Bridge Rectifier fed with 50 Hz AC is:', options: ['25 Hz', '50 Hz', '100 Hz', '200 Hz'], ans: 2, exp: 'Full-wave rectifiers produce 2 pulses per input cycle, so fout = 2 × fin = 2 × 50 Hz = 100 Hz.' },
  { q: 'The maximum theoretical efficiency of a Half-Wave Rectifier is:', options: ['40.6%', '50.0%', '81.2%', '100%'], ans: 0, exp: 'Half-wave rectifier efficiency is 40.6%. Full-wave rectifier efficiency is 81.2%.' },
  { q: 'How many diodes are required to construct a Full-Wave Bridge Rectifier?', options: ['1', '2', '4', '6'], ans: 2, exp: 'A bridge rectifier uses 4 diodes arranged in a diamond bridge network.' },
  { q: 'In an NPN Common Emitter amplifier, the phase shift between input and output voltages is:', options: ['0°', '90°', '180° (π rad)', '360°'], ans: 2, exp: 'Common Emitter configuration introduces a 180° phase inversion between input base voltage and output collector voltage.' },
  { q: 'Which region of a BJT transistor is the most heavily doped?', options: ['Base', 'Emitter', 'Collector', 'Collector-base junction'], ans: 1, exp: 'Emitter is heavily doped to inject large numbers of carriers. Base is lightly doped, and Collector is moderately doped.' },
  { q: 'In a transistor, if IE = 10 mA and IB = 0.2 mA, what is the value of IC?', options: ['10.2 mA', '9.8 mA', '50 mA', '0.02 mA'], ans: 1, exp: 'By transistor current law: IC = IE - IB = 10 mA - 0.2 mA = 9.8 mA.' },
  { q: 'The relationship between current amplification factor β and α is given by:', options: ['β = α / (1 - α)', 'β = α / (1 + α)', 'β = (1 - α) / α', 'β = α + 1'], ans: 0, exp: 'β = IC / IB and α = IC / IE yields β = α / (1 - α).' },
  { q: 'When a transistor is used as an electronic switch in the ON state, it operates in the:', options: ['Active region', 'Cut-off region', 'Saturation region', 'Breakdown region'], ans: 2, exp: 'In the ON state (closed switch), the transistor is in Saturation (VCE ≈ 0.2 V, IC = max). OFF state is Cut-off.' },
  { q: 'Which pair of logic gates are called Universal Gates?', options: ['AND & OR', 'NAND & NOR', 'NOT & AND', 'XOR & XNOR'], ans: 1, exp: 'NAND and NOR gates can independently synthesize any Boolean logic function.' },
  { q: 'According to De Morgan’s theorem, the expression (A + B)̄ is equal to:', options: ['Ā + B̄', 'Ā · B̄', 'A · B', '(A · B)̄'], ans: 1, exp: 'De Morgan’s Law: (A + B)̄ = Ā · B̄ (break the bar and change OR to AND).' },
  { q: 'The output of an exclusive OR (XOR) gate is HIGH (1) when:', options: ['Both inputs are 0', 'Both inputs are 1', 'Inputs are different (0,1 or 1,0)', 'Inputs are identical'], ans: 2, exp: 'XOR outputs 1 only when inputs are dissimilar (odd parity detector).' },
  { q: 'A Light Emitting Diode (LED) emits photons during:', options: ['Reverse bias', 'Forward bias', 'Zero bias', 'Avalanche breakdown'], ans: 1, exp: 'LED emits light in forward bias when injected electrons and holes recombine, releasing photon energy hf = Eg.' },
  { q: 'A photodiode is typically operated under:', options: ['Forward bias', 'Reverse bias', 'Zero bias', 'High temperature bias'], ans: 1, exp: 'Photodiodes operate in reverse bias where minority carrier photocurrent is directly proportional to incident light.' },
  { q: 'For an ideal operational amplifier (Op-Amp), the input impedance (Rin) is:', options: ['Zero', '50 Ω', '1 kΩ', 'Infinite (∞)'], ans: 3, exp: 'An ideal op-amp has infinite input impedance (Rin = ∞) and draws zero input current.' },
  { q: 'For an ideal op-amp, the open loop voltage gain (AOL) is:', options: ['1', '100', '100,000', 'Infinite (∞)'], ans: 3, exp: 'Ideal op-amp has infinite open loop gain (AOL = ∞) and zero output impedance.' },
  { q: 'The ripple factor of a Half-Wave Rectifier without filter is:', options: ['0.482', '1.21', '0.00', '1.57'], ans: 1, exp: 'Half-wave rectifier ripple factor is 1.21; Full-wave rectifier ripple factor is 0.482.' },
  { q: 'In an NPN transistor, the majority charge carriers in the emitter are:', options: ['Holes', 'Free Electrons', 'Positive ions', 'Negative ions'], ans: 1, exp: 'In NPN transistors, Emitter is N-type, where free electrons are majority carriers.' },
  { q: 'The base region of a transistor is made physically thin and lightly doped in order to:', options: ['Reduce collector current', 'Prevent most majority carriers from recombining in base', 'Increase base resistance to infinity', 'Increase heat dissipation'], ans: 1, exp: 'Thin and lightly doped base ensures >95% carriers pass into collector rather than recombining in base.' },
  { q: 'In a full-wave bridge rectifier, if peak AC voltage is Vm, the peak inverse voltage (PIV) across each non-conducting diode is:', options: ['Vm / 2', 'Vm', '2 Vm', '4 Vm'], ans: 1, exp: 'In a bridge rectifier, PIV across each diode is Vm (unlike center-tapped full wave which requires 2Vm).' },
  { q: 'Which logic gate gives output 0 only when both inputs A and B are 1?', options: ['AND', 'NAND', 'NOR', 'OR'], ans: 1, exp: 'NAND gives 0 only when A=1 and B=1; in all other cases output is 1.' },
  { q: 'In an intrinsic semiconductor at room temperature, the relation between electron density (n) and hole density (p) is:', options: ['n &gt; p', 'n &lt; p', 'n = p = ni', 'n · p = 0'], ans: 2, exp: 'In pure intrinsic semiconductors, thermal excitation always creates electron-hole pairs in equal numbers: n = p = ni.' },
  { q: 'The wavelength of light emitted by an LED is determined by:', options: ['The applied forward voltage only', 'The band gap energy (Eg) of semiconductor material', 'The thickness of connecting wires', 'The reverse breakdown voltage'], ans: 1, exp: 'Photon energy E = hf = hc/λ = Eg. Hence, wavelength λ = hc/Eg is governed by semiconductor bandgap.' }
];

// ==========================================================================
// 3. APPLICATION INITIALIZATION & TAB ROUTING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initNotesViewer();
  initSimulators();
  initMCQEngine();
  initFlashcards();
});

// Theme Management
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const saved = localStorage.getItem('mdcat_theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    toggleBtn.textContent = '☀️';
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme', !isDark);
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('mdcat_theme', isDark ? 'dark' : 'light');
  });
}

// Navigation Tabs
function initNavTabs() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const panes = document.querySelectorAll('.tab-pane');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.dataset.tab;
      navBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabKey}`);
      if (targetPane) targetPane.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// ==========================================================================
// 4. NOTES VIEWER & 22 TOPICS ENGINE
// ==========================================================================
function initNotesViewer() {
  const listEl = document.getElementById('topics-list-el');
  const readerEl = document.getElementById('topic-reader-el');
  const searchInput = document.getElementById('topic-search-input');
  const catPills = document.querySelectorAll('.cat-pill');

  let activeCat = 'All';
  let activeTopicId = 1;
  let searchTerm = '';

  function renderSidebar() {
    listEl.innerHTML = '';
    const filtered = CHAPTER_DATA.filter(t => {
      const matchCat = activeCat === 'All' || t.category === activeCat;
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.def.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = '<li style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.8rem;">No topics found matching your query.</li>';
      return;
    }

    filtered.forEach(t => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = `topic-item-btn ${t.id === activeTopicId ? 'active' : ''}`;
      btn.innerHTML = `
        <div style="flex:1;">
          <div class="topic-item-title">${t.title}</div>
          <div class="topic-item-cat">${t.category}</div>
        </div>
      `;
      btn.addEventListener('click', () => {
        activeTopicId = t.id;
        renderSidebar();
        renderReader(t);
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  function renderReader(t) {
    readerEl.innerHTML = `
      <div class="topic-reader-header">
        <span class="topic-category-badge">${t.category}</span>
        <h2 class="topic-main-title">${t.title}</h2>
        <div class="topic-summary-box">${t.def}</div>
      </div>

      <div class="diagram-container">
        ${t.svg}
      </div>

      <div class="section-block">
        <h3>📌 Core Physical Principles & Theory</h3>
        <ul class="styled-bullet-list">
          ${t.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
        </ul>
      </div>

      <div class="exam-tip-box">
        <h4>⚡ MDCAT High-Yield Exam Tips & Traps:</h4>
        <ul class="styled-bullet-list" style="margin-top:0.5rem;">
          ${t.tips.map(tp => `<li>${tp}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderSidebar();
  });

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.dataset.cat;
      renderSidebar();
    });
  });

  renderSidebar();
  renderReader(CHAPTER_DATA[0]);
}

// ==========================================================================
// 5. FOUR INTERACTIVE CIRCUIT SIMULATORS
// ==========================================================================
function initSimulators() {
  // Sim Sub-tab switcher
  const simTabs = document.querySelectorAll('.sim-tab');
  const simViews = document.querySelectorAll('.sim-view');

  simTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      simTabs.forEach(t => t.classList.remove('active'));
      simViews.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const simKey = tab.dataset.sim;
      const targetView = document.getElementById(`sim-${simKey}`);
      if (targetView) targetView.classList.add('active');
    });
  });

  // Simulator 1: Logic Gates
  initLogicGateSimulator();

  // Simulator 2: PN Junction Particle Canvas
  initPNJunctionSimulator();

  // Simulator 3: Rectifier Oscilloscope
  initRectifierSimulator();

  // Simulator 4: Transistor Amplifier & Switch
  initTransistorSimulator();
}

// SIMULATOR 1: LOGIC GATES
function initLogicGateSimulator() {
  let gate = 'AND';
  let inA = 1;
  let inB = 0;

  const gateBtns = document.querySelectorAll('.gate-btn');
  const switchA = document.getElementById('switch-a');
  const switchB = document.getElementById('switch-b');
  const switchAVal = document.getElementById('switch-a-val');
  const switchBVal = document.getElementById('switch-b-val');
  const gateTitle = document.getElementById('current-gate-title');
  const gateExpr = document.getElementById('current-gate-expr');
  const outVal = document.getElementById('output-val');
  const led = document.getElementById('output-led');
  const outStatus = document.getElementById('output-status');
  const tableEl = document.getElementById('live-truth-table');
  const univText = document.getElementById('universal-gate-text');

  gateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gate = btn.dataset.gate;
      if (gate === 'NOT') {
        switchB.style.display = 'none';
      } else {
        switchB.style.display = 'flex';
      }
      updateGate();
    });
  });

  switchA.addEventListener('click', () => {
    inA = inA === 1 ? 0 : 1;
    switchAVal.textContent = inA;
    switchA.classList.toggle('on', inA === 1);
    updateGate();
  });

  switchB.addEventListener('click', () => {
    inB = inB === 1 ? 0 : 1;
    switchBVal.textContent = inB;
    switchB.classList.toggle('on', inB === 1);
    updateGate();
  });

  function evalLogic(g, a, b) {
    if (g === 'AND') return a && b ? 1 : 0;
    if (g === 'OR') return a || b ? 1 : 0;
    if (g === 'NOT') return a ? 0 : 1;
    if (g === 'NAND') return !(a && b) ? 1 : 0;
    if (g === 'NOR') return !(a || b) ? 1 : 0;
    if (g === 'XOR') return a !== b ? 1 : 0;
    if (g === 'XNOR') return a === b ? 1 : 0;
    return 0;
  }

  function updateGate() {
    const out = evalLogic(gate, inA, inB);
    let expr = 'Y = A · B';
    if (gate === 'OR') expr = 'Y = A + B';
    if (gate === 'NOT') expr = 'Y = Ā';
    if (gate === 'NAND') expr = 'Y = (A · B)̄';
    if (gate === 'NOR') expr = 'Y = (A + B)̄';
    if (gate === 'XOR') expr = 'Y = A ⊕ B';
    if (gate === 'XNOR') expr = 'Y = (A ⊕ B)̄';

    gateTitle.textContent = `${gate} GATE`;
    gateExpr.textContent = expr;
    outVal.textContent = out;
    led.classList.toggle('lit', out === 1);
    outStatus.textContent = out === 1 ? 'LED ON (HIGH)' : 'LED OFF (LOW)';

    if (gate === 'NAND') {
      univText.textContent = 'NAND gate is Universal: Hooking both inputs together creates a NOT gate. Connecting output of NAND to an inverter creates an AND gate!';
    } else if (gate === 'NOR') {
      univText.textContent = 'NOR gate is Universal: Connecting both inputs builds a NOT gate. De Morgan laws show NOR gates can build OR, AND, and XOR circuits!';
    } else {
      univText.textContent = `${gate} Gate is active. Toggle Input A and B above to see the active truth table row update in real-time.`;
    }

    // Render Truth Table
    if (gate === 'NOT') {
      tableEl.innerHTML = `
        <thead><tr><th>Input A</th><th>Output Y</th></tr></thead>
        <tbody>
          <tr class="${inA === 0 ? 'active-row' : ''}"><td>0</td><td>1</td></tr>
          <tr class="${inA === 1 ? 'active-row' : ''}"><td>1</td><td>0</td></tr>
        </tbody>
      `;
    } else {
      tableEl.innerHTML = `
        <thead><tr><th>Input A</th><th>Input B</th><th>Output Y</th></tr></thead>
        <tbody>
          <tr class="${inA === 0 && inB === 0 ? 'active-row' : ''}"><td>0</td><td>0</td><td>${evalLogic(gate, 0, 0)}</td></tr>
          <tr class="${inA === 0 && inB === 1 ? 'active-row' : ''}"><td>0</td><td>1</td><td>${evalLogic(gate, 0, 1)}</td></tr>
          <tr class="${inA === 1 && inB === 0 ? 'active-row' : ''}"><td>1</td><td>0</td><td>${evalLogic(gate, 1, 0)}</td></tr>
          <tr class="${inA === 1 && inB === 1 ? 'active-row' : ''}"><td>1</td><td>1</td><td>${evalLogic(gate, 1, 1)}</td></tr>
        </tbody>
      `;
    }
  }

  updateGate();
}

// SIMULATOR 2: PN JUNCTION & CARRIER PARTICLES
function initPNJunctionSimulator() {
  const canvas = document.getElementById('pnCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let biasMode = 'forward'; // 'unbiased', 'forward', 'reverse'
  let voltage = 0.80;
  let material = 'Si'; // 0.7V barrier

  const btnUnbiased = document.getElementById('btn-unbiased');
  const btnForward = document.getElementById('btn-forward');
  const btnReverse = document.getElementById('btn-reverse');
  const voltSlider = document.getElementById('pn-voltage-slider');
  const voltVal = document.getElementById('pn-volt-val');
  const currentVal = document.getElementById('pn-current-val');
  const depletionVal = document.getElementById('pn-depletion-val');
  const barrierVal = document.getElementById('pn-barrier-val');
  const matSi = document.getElementById('mat-si');
  const matGe = document.getElementById('mat-ge');

  const biasBtns = [btnUnbiased, btnForward, btnReverse];

  btnUnbiased.addEventListener('click', () => {
    biasMode = 'unbiased';
    biasBtns.forEach(b => b.classList.remove('active'));
    btnUnbiased.classList.add('active');
    voltSlider.value = 0;
    voltage = 0;
    updateTelemetry();
  });

  btnForward.addEventListener('click', () => {
    biasMode = 'forward';
    biasBtns.forEach(b => b.classList.remove('active'));
    btnForward.classList.add('active');
    voltSlider.value = 0.80;
    voltage = 0.80;
    updateTelemetry();
  });

  btnReverse.addEventListener('click', () => {
    biasMode = 'reverse';
    biasBtns.forEach(b => b.classList.remove('active'));
    btnReverse.classList.add('active');
    voltSlider.value = 1.50;
    voltage = 1.50;
    updateTelemetry();
  });

  voltSlider.addEventListener('input', (e) => {
    voltage = parseFloat(e.target.value);
    updateTelemetry();
  });

  if (matSi) matSi.addEventListener('change', () => { material = 'Si'; updateTelemetry(); });
  if (matGe) matGe.addEventListener('change', () => { material = 'Ge'; updateTelemetry(); });

  function updateTelemetry() {
    voltVal.textContent = `${voltage.toFixed(2)} V`;
    const v0 = material === 'Si' ? 0.7 : 0.3;

    if (biasMode === 'unbiased') {
      currentVal.textContent = '0.00 mA';
      depletionVal.textContent = 'Standard (~80 px)';
      barrierVal.textContent = `${v0.toFixed(2)} V (Equilibrium)`;
    } else if (biasMode === 'forward') {
      const net = Math.max(0, voltage - v0);
      const curr = voltage > v0 ? (Math.exp(net * 3.5) * 1.5).toFixed(1) : '0.00';
      currentVal.textContent = `${curr} mA (Forward)`;
      const depW = Math.max(15, Math.round(80 - (voltage / 2) * 60));
      depletionVal.textContent = `Narrowed (~${depW} px)`;
      barrierVal.textContent = net > 0 ? '0.00 V (Overcome)' : `${(v0 - voltage).toFixed(2)} V`;
    } else {
      currentVal.textContent = material === 'Si' ? '12.4 nA (Leakage)' : '4.2 µA (Leakage)';
      const depW = Math.min(150, Math.round(80 + (voltage / 2) * 50));
      depletionVal.textContent = `Widened (~${depW} px)`;
      barrierVal.textContent = `${(v0 + voltage).toFixed(2)} V (Reinforced)`;
    }
  }

  // Particle System
  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: i < 30 ? Math.random() * 220 + 20 : Math.random() * 220 + 440,
      y: Math.random() * 140 + 20,
      type: i < 30 ? 'hole' : 'electron',
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midX = canvas.width / 2;
    const v0 = material === 'Si' ? 0.7 : 0.3;

    let depHalf = 40;
    if (biasMode === 'forward') depHalf = Math.max(10, 40 - (voltage / 2) * 30);
    else if (biasMode === 'reverse') depHalf = Math.min(85, 40 + (voltage / 2) * 30);

    // Draw P-Region Background
    ctx.fillStyle = '#2a1215';
    ctx.fillRect(0, 0, midX, canvas.height);
    ctx.fillStyle = '#ff6b81';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('P-TYPE (Majority Holes ⊕)', 30, 25);

    // Draw N-Region Background
    ctx.fillStyle = '#0f1f38';
    ctx.fillRect(midX, 0, midX, canvas.height);
    ctx.fillStyle = '#70a1ff';
    ctx.fillText('N-TYPE (Majority Electrons ⊖)', midX + 30, 25);

    // Draw Depletion Layer
    ctx.fillStyle = 'rgba(255, 215, 0, 0.18)';
    ctx.fillRect(midX - depHalf, 0, depHalf * 2, canvas.height);
    ctx.strokeStyle = '#e67e22';
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(midX - depHalf, 0, depHalf * 2, canvas.height);
    ctx.setLineDash([]);

    // Immobile space charge labels
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Negative Ions (-A)', midX - depHalf + 4, 90);
    ctx.fillStyle = '#2980b9';
    ctx.fillText('Positive Ions (+D)', midX + 6, 90);

    // Draw & Update Carriers
    particles.forEach(p => {
      // Physics drift based on bias
      if (biasMode === 'forward' && voltage > v0) {
        if (p.type === 'hole') p.x += 1.8;
        if (p.type === 'electron') p.x -= 1.8;
      } else if (biasMode === 'reverse') {
        if (p.type === 'hole' && p.x > midX - depHalf - 10) p.x -= 1.5;
        if (p.type === 'electron' && p.x < midX + depHalf + 10) p.x += 1.5;
      } else {
        // Bounce off depletion boundary
        if (p.type === 'hole' && p.x > midX - depHalf) p.x = midX - depHalf - 2;
        if (p.type === 'electron' && p.x < midX + depHalf) p.x = midX + depHalf + 2;
      }

      // Wrap around
      if (p.x < 10) p.x = canvas.width - 15;
      if (p.x > canvas.width - 10) p.x = 15;
      if (p.y < 35) p.y = canvas.height - 15;
      if (p.y > canvas.height - 10) p.y = 35;

      p.x += p.vx;
      p.y += p.vy;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      if (p.type === 'hole') {
        ctx.fillStyle = '#ff4757';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      } else {
        ctx.fillStyle = '#1e90ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }
    });

    requestAnimationFrame(draw);
  }

  updateTelemetry();
  draw();
}

// SIMULATOR 3: RECTIFIER & OSCILLOSCOPE
function initRectifierSimulator() {
  const canvas = document.getElementById('scopeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let mode = 'bridge'; // 'half' or 'bridge'
  let filterOn = false;
  let tOffset = 0;

  const btnHalf = document.getElementById('btn-rect-half');
  const btnBridge = document.getElementById('btn-rect-bridge');
  const filterToggle = document.getElementById('rect-filter-toggle');
  const effEl = document.getElementById('rect-eff');
  const freqEl = document.getElementById('rect-freq');
  const rippleEl = document.getElementById('rect-ripple');

  btnHalf.addEventListener('click', () => {
    mode = 'half';
    btnHalf.classList.add('active');
    btnBridge.classList.remove('active');
    effEl.textContent = '40.6% (Max)';
    freqEl.textContent = '50 Hz (1×fin)';
    rippleEl.textContent = filterOn ? '0.12 (Smoothed)' : '1.21';
  });

  btnBridge.addEventListener('click', () => {
    mode = 'bridge';
    btnBridge.classList.add('active');
    btnHalf.classList.remove('active');
    effEl.textContent = '81.2% (Max)';
    freqEl.textContent = '100 Hz (2×fin)';
    rippleEl.textContent = filterOn ? '0.04 (Very Smooth)' : '0.482';
  });

  filterToggle.addEventListener('change', (e) => {
    filterOn = e.target.checked;
    if (mode === 'bridge') {
      rippleEl.textContent = filterOn ? '0.04 (Very Smooth)' : '0.482';
    } else {
      rippleEl.textContent = filterOn ? '0.12 (Smoothed)' : '1.21';
    }
  });

  function drawScope() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Oscilloscope Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 35) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Midlines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(canvas.width, 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(canvas.width, 160); ctx.stroke();

    // Wave 1: Input AC Sine (Blue Trace)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const angle = ((x + tOffset) * 0.04);
      const y = 60 - Math.sin(angle) * 40;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Wave 2: Rectified DC Output (Emerald Trace)
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const angle = ((x + tOffset) * 0.04);
      let sinVal = Math.sin(angle);

      if (mode === 'half') {
        sinVal = sinVal > 0 ? sinVal : 0;
      } else {
        sinVal = Math.abs(sinVal);
      }

      let y = 160 - sinVal * 40;

      // Apply Capacitor Filter smoothing
      if (filterOn) {
        y = 160 - 38 + Math.sin(angle * 2) * 3;
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Trace Legend
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Channel 1: AC Input (50 Hz Sine Wave)', 15, 20);

    ctx.fillStyle = '#34d399';
    ctx.fillText(`Channel 2: ${mode === 'bridge' ? 'Full-Wave Bridge DC (100 Hz)' : 'Half-Wave Rectified DC (50 Hz)'} ${filterOn ? '+ C Filter' : ''}`, 15, 125);

    tOffset += 2;
    requestAnimationFrame(drawScope);
  }

  drawScope();
}

// SIMULATOR 4: BJT TRANSISTOR AMPLIFIER & SWITCH
function initTransistorSimulator() {
  const ibSlider = document.getElementById('bjt-ib-slider');
  const betaSlider = document.getElementById('bjt-beta-slider');
  const ibVal = document.getElementById('bjt-ib-val');
  const betaVal = document.getElementById('bjt-beta-val');
  const icVal = document.getElementById('bjt-ic-val');
  const ieVal = document.getElementById('bjt-ie-val');
  const vceVal = document.getElementById('bjt-vce-val');
  const regionBadge = document.getElementById('bjt-region-badge');

  if (!ibSlider || !betaSlider) return;

  function calculateBJT() {
    const ibMicro = parseFloat(ibSlider.value);
    const beta = parseFloat(betaSlider.value);

    ibVal.textContent = `${ibMicro} µA`;
    betaVal.textContent = `${beta}`;

    const ibMilli = ibMicro / 1000;
    const vcc = 10.0;
    const rc = 2.0; // kOhms

    // Max saturation current
    const icSat = vcc / rc; // 5.0 mA

    let ic = ibMilli * beta;
    let region = 'ACTIVE REGION (Linear Amplifier)';

    if (ibMicro === 0) {
      ic = 0;
      region = 'CUT-OFF REGION (Switch OFF)';
    } else if (ic >= icSat) {
      ic = icSat;
      region = 'SATURATION REGION (Switch ON)';
    }

    const ie = ic + ibMilli;
    const vce = Math.max(0.2, vcc - ic * rc);

    icVal.textContent = `${ic.toFixed(2)} mA`;
    ieVal.textContent = `${ie.toFixed(2)} mA`;
    vceVal.textContent = `${vce.toFixed(2)} V`;
    regionBadge.textContent = region;
  }

  ibSlider.addEventListener('input', calculateBJT);
  betaSlider.addEventListener('input', calculateBJT);
  calculateBJT();
}

// ==========================================================================
// 6. 30 MDCAT MCQS EXAM ENGINE
// ==========================================================================
function initMCQEngine() {
  let idx = 0;
  let score = 0;
  let answered = 0;

  const area = document.getElementById('mcq-question-area');
  const prog = document.getElementById('mcq-progress');
  const scoreBadge = document.getElementById('mcq-score-badge');
  const nextBtn = document.getElementById('mcq-next-btn');
  const prevBtn = document.getElementById('mcq-prev-btn');

  if (!area) return;

  function renderQuestion() {
    const item = MCQS[idx];
    prog.textContent = `Question ${idx + 1} of ${MCQS.length}`;
    scoreBadge.textContent = `Score: ${score} / ${answered}`;

    area.innerHTML = `
      <h3>${idx + 1}. ${item.q}</h3>
      <div class="mcq-options">
        ${item.options.map((opt, i) => `
          <button class="mcq-option-btn" data-opt="${i}">
            <strong>${String.fromCharCode(65 + i)})</strong> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="mcq-exp-box" class="explanation-box" style="display:none;"></div>
    `;

    const optBtns = area.querySelectorAll('.mcq-option-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.dataset.opt);
        optBtns.forEach(b => b.disabled = true);
        answered++;

        if (selected === item.ans) {
          btn.classList.add('correct');
          score++;
        } else {
          btn.classList.add('wrong');
          optBtns[item.ans].classList.add('correct');
        }

        scoreBadge.textContent = `Score: ${score} / ${answered}`;
        const expBox = document.getElementById('mcq-exp-box');
        expBox.style.display = 'block';
        expBox.innerHTML = `<strong>💡 MDCAT Concept Explanation:</strong> ${item.exp}`;
      });
    });
  }

  nextBtn.addEventListener('click', () => {
    if (idx < MCQS.length - 1) {
      idx++;
      renderQuestion();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (idx > 0) {
      idx--;
      renderQuestion();
    }
  });

  renderQuestion();
}

// ==========================================================================
// 7. FLASHCARD ACTIVE RECALL DECK
// ==========================================================================
function initFlashcards() {
  const deck = document.getElementById('flashcard-deck');
  if (!deck) return;

  CHAPTER_DATA.slice(0, 12).forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.innerHTML = `
      <span class="fc-badge">${item.category}</span>
      <h4>${item.title}</h4>
      <p id="fc-text-${index}">Click card to flip and test active recall.</p>
    `;

    let flipped = false;
    card.addEventListener('click', () => {
      flipped = !flipped;
      const textEl = document.getElementById(`fc-text-${index}`);
      if (flipped) {
        textEl.innerHTML = `<strong>Definition & Key Law:</strong> ${item.def}`;
        card.style.borderColor = 'var(--accent-emerald)';
      } else {
        textEl.textContent = 'Click card to flip and test active recall.';
        card.style.borderColor = 'var(--border-color)';
      }
    });

    deck.appendChild(card);
  });
}
