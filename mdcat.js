/**
 * ==========================================================================
 * EDUNOVIX AI — MDCAT PREPARATION HUB ENGINE (mdcat.js)
 * Production-Ready Interactive Controller
 *
 * Core Modules:
 * - Theme Engine (Dark & Light Mode synchronized with EduNovix system)
 * - Navigation & Responsive Drawer Controller
 * - Live Syllabus Progress Tracker & LocalStorage State
 * - Intelligent "What Should I Study Next?" Recommendation Engine
 * - Animated Counter Observer
 * - Global Instant Search Index (Subjects, Real Topic Files, Universities, Books)
 * - University Directory & Interactive Modal System
 * - 30-Question Timed MDCAT Practice Test (Bio, Chem, Phy, Eng)
 * - Daily Practice Streak & Target Goals Manager
 * - Toast Notifications & Back-to-Top Utility
 * ==========================================================================
 */

// ==========================================================================
// 1. DATA REPOSITORIES
// ==========================================================================

const UNIVERSITIES_DATA = {
  aku: {
    name: "Aga Khan University (AKU)",
    location: "Stadium Road, Karachi, Sindh",
    type: "Autonomous Private Chartered University",
    programs: "MBBS, BSc Nursing, Master of Bioethics, Medical Residencies",
    meritNote: "Admission is determined by AKU's autonomous computerized entrance test, candidate interview panel, and PMDC eligibility compliance.",
    website: "https://www.aku.edu",
    admissionUrl: "https://www.aku.edu/admissions/mbbs",
    highlights: [
      "Internationally recognized JCI-accredited teaching hospital",
      "World-class biomedical research and simulation center",
      "Merit-based financial aid & scholarships available"
    ]
  },
  duhs: {
    name: "Dow University of Health Sciences (DUHS)",
    location: "Mission Road & Ojha Campus, Karachi, Sindh",
    type: "Premier Public Sector Health University",
    programs: "MBBS (Dow Medical College & DIMC), BDS, Pharm-D, DPT, Medical Tech",
    meritNote: "Key provincial admitting university for Sindh MDCAT. Offers district quota and open merit seats for Sindh candidates.",
    website: "https://www.duhs.edu.pk",
    admissionUrl: "https://www.duhs.edu.pk/admissions",
    highlights: [
      "Historic DMC campus founded in 1945",
      "Ojha Institute of Chest Diseases and National Institute of Solid Organ Transplant",
      "Over 400+ public sector medical seats"
    ]
  },
  jsmu: {
    name: "Jinnah Sindh Medical University (JSMU)",
    location: "Rafiqui H.J. Shaheed Road, Karachi, Sindh",
    type: "Public Sector Medical University",
    programs: "MBBS (SMC), BDS (SIOH), Pharm-D, DPT, Public Health",
    meritNote: "Admissions conducted based on aggregate of Matriculation (10%), Intermediate F.Sc (40%), and MDCAT Score (50%).",
    website: "https://www.jsmu.edu.pk",
    admissionUrl: "https://www.jsmu.edu.pk/admissions",
    highlights: [
      "Home to historic Sindh Medical College (SMC)",
      "Affiliated with JPMC and National Institute of Child Health (NICH)",
      "High clinical caseload exposure for medical students"
    ]
  },
  lumhs: {
    name: "Liaquat University of Medical & Health Sciences (LUMHS)",
    location: "Jamshoro / Hyderabad, Sindh",
    type: "Oldest Public Medical University in Sindh",
    programs: "MBBS, BDS, Biomedical Engineering, Nursing, Diagnostic Radiology",
    meritNote: "Central medical institute for Hyderabad, Mirpurkhas, and lower Sindh division candidates with district-wise quotas.",
    website: "https://www.lumhs.edu.pk",
    admissionUrl: "https://www.lumhs.edu.pk/admission",
    highlights: [
      "Established as Medical School in 1881; University in 2001",
      "Extensive tertiary teaching hospital network in Jamshoro and Hyderabad",
      "Largest clinical campus footprint in interior Sindh"
    ]
  },
  cmc: {
    name: "Chandka Medical College (CMC / SMBBMU)",
    location: "Larkana, Sindh",
    type: "Public Medical College & Health University",
    programs: "MBBS, BDS (BDS College Larkana), Allied Health Sciences",
    meritNote: "Constituent college of Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU). Covers Larkana, Sukkur, and upper Sindh districts.",
    website: "https://www.smbbmu.edu.pk",
    admissionUrl: "https://www.smbbmu.edu.pk/admission",
    highlights: [
      "Established in 1973 as premier medical institution for Northern Sindh",
      "Attached to 1,200+ bed Chandka Hospital complex",
      "Offers dedicated post-graduate fellowship training"
    ]
  },
  pumhs: {
    name: "Peoples University of Medical & Health Sciences for Women (PUMHSW)",
    location: "Shaheed Benazirabad (Nawabshah), Sindh",
    type: "Dedicated Public Medical University for Women",
    programs: "MBBS, BDS, Doctor of Pharmacy, DPT, Nursing",
    meritNote: "Exclusively accommodates female candidates from Sindh and national quota seats with modern residential and clinical facilities.",
    website: "https://www.pumhs.edu.pk",
    admissionUrl: "https://www.pumhs.edu.pk/admissions",
    highlights: [
      "First women-exclusive medical university in Sindh",
      "Affiliated with PMCH 1000-bed hospital",
      "High pass rates in PMDC and CPSP examinations"
    ]
  },
  kemu: {
    name: "King Edward Medical University (KEMU)",
    location: "Nila Gumbad, Anarkali, Lahore, Punjab",
    type: "Historic Public Medical University (Established 1860)",
    programs: "MBBS, Allied Health Sciences, MD/MS Specialties",
    meritNote: "Consistently holds the highest MDCAT merit cutoff in Pakistan (~93%+ overall aggregate requirement).",
    website: "https://kemu.edu.pk",
    admissionUrl: "https://kemu.edu.pk/admissions",
    highlights: [
      "Affiliated with prestigious 2,000+ bed Mayo Hospital",
      "Pakistan's oldest medical training institution",
      "Pioneer in clinical and surgical medical research"
    ]
  },
  uhs: {
    name: "University of Health Sciences (UHS)",
    location: "Khayaban-e-Jamia Punjab, Lahore, Punjab",
    type: "Provincial Health Sciences & Examining Body",
    programs: "MBBS, BDS Centralized Provincial Admissions & Postgraduate Sciences",
    meritNote: "Administers central admission processing for all Punjab public sector medical and dental colleges.",
    website: "https://www.uhs.edu.pk",
    admissionUrl: "https://www.uhs.edu.pk/admissions",
    highlights: [
      "Regulates 100+ medical and dental affiliated institutions",
      "Standardizes clinical evaluation protocols and curriculum",
      "State-of-the-art genomics and biomedical research labs"
    ]
  }
};

// 30 Authentic MDCAT Practice Questions (10 Bio, 8 Chem, 8 Phy, 4 Eng)

const QUIZ_QUESTIONS = [
  // --- BIOLOGY (10 QUESTIONS) ---
  {
    id: 1,
    subject: "Biology",
    question: "According to the Fluid Mosaic Model of plasma membrane, what is the primary role of cholesterol molecules embedded within the phospholipid bilayer?",
    options: [
      "A) Synthesizing membrane proteins",
      "B) Regulating membrane fluidity and stability across varying temperatures",
      "C) Serving as active transport pump for sodium ions",
      "D) Providing mechanical attachment to extracellular collagen fibres"
    ],
    answer: 1,
    explanation: "Cholesterol prevents phospholipid fatty acid chains from packing closely at low temperatures (preventing crystallization) and restricts excessive membrane mobility at high temperatures."
  },
  {
    id: 2,
    subject: "Biology",
    question: "In enzyme kinetics, what is the effect of a competitive inhibitor on the Michaelis-Menten constant (Km) and the maximum velocity (Vmax) of the reaction?",
    options: [
      "A) Vmax decreases, Km remains constant",
      "B) Km decreases, Vmax increases",
      "C) Km increases, Vmax remains unchanged",
      "D) Both Km and Vmax decrease proportionally"
    ],
    answer: 2,
    explanation: "Competitive inhibitors bind reversibly to the active site; increasing substrate concentration overcomes the inhibition, so Vmax remains unchanged while apparent Km increases."
  },
  {
    id: 3,
    subject: "Biology",
    question: "During the light-independent reactions (Calvin cycle) of photosynthesis, how many molecules of NADPH and ATP are consumed to produce one net molecule of Triose Phosphate (G3P)?",
    options: [
      "A) 6 ATP and 6 NADPH",
      "B) 9 ATP and 6 NADPH",
      "C) 18 ATP and 12 NADPH",
      "D) 3 ATP and 2 NADPH"
    ],
    answer: 1,
    explanation: "Fixing 3 CO2 molecules requires 6 ATP and 6 NADPH for reduction, plus 3 ATP for regenerating 3 RuBP molecules from 5 G3P, giving a total of 9 ATP and 6 NADPH per net G3P exported."
  },
  {
    id: 4,
    subject: "Biology",
    question: "During glycolysis in the cellular cytoplasm, what is the net yield of ATP molecules generated per single molecule of glucose via substrate-level phosphorylation?",
    options: [
      "A) 4 ATP molecules",
      "B) 2 ATP molecules",
      "C) 36 ATP molecules",
      "D) 32 ATP molecules"
    ],
    answer: 1,
    explanation: "Glycolysis consumes 2 ATP in the preparatory phase and produces 4 ATP in the payoff phase, resulting in a net yield of 2 ATP and 2 NADH per glucose."
  },
  {
    id: 5,
    subject: "Biology",
    question: "In a standard Mendelian dihybrid cross involving two heterozygous individuals (RrYy × RrYy), what proportion of offspring is expected to exhibit the recombinant phenotypic classes?",
    options: [
      "A) 9/16",
      "B) 1/16",
      "C) 6/16 (3/8)",
      "D) 10/16 (5/8)"
    ],
    answer: 2,
    explanation: "In a 9:3:3:1 ratio, the parental combinations are 9/16 and 1/16 (total 10/16). The two non-parental recombinant classes comprise 3/16 + 3/16 = 6/16 (3/8)."
  },
  {
    id: 6,
    subject: "Biology",
    question: "At a chemical synapse, the influx of which specific ion into the presynaptic terminal triggers exocytosis of synaptic vesicles containing neurotransmitters?",
    options: [
      "A) Potassium (K⁺)",
      "B) Calcium (Ca²⁺)",
      "C) Sodium (Na⁺)",
      "D) Chloride (Cl⁻)"
    ],
    answer: 1,
    explanation: "Depolarization opens voltage-gated Ca²⁺ channels. The sudden influx of calcium ions activates synaptotagmin and SNARE proteins to fuse vesicles with the presynaptic membrane."
  },
  {
    id: 7,
    subject: "Biology",
    question: "Which anatomical structure functions as the primary intrinsic pacemaker of the human heart, generating rhythm at 70-80 impulses per minute?",
    options: [
      "A) Atrioventricular (AV) node",
      "B) Sinoatrial (SA) node",
      "C) Bundle of His",
      "D) Purkinje fibre network"
    ],
    answer: 1,
    explanation: "The SA node, situated in the upper posterior wall of the right atrium, has the highest intrinsic rate of automaticity and acts as the heart's primary pacemaker."
  },
  {
    id: 8,
    subject: "Biology",
    question: "Which antibody isotype is the only immunoglobulin capable of crossing the human placenta to provide passive natural immunity to the developing fetus?",
    options: [
      "A) Immunoglobulin M (IgM)",
      "B) Immunoglobulin A (IgA)",
      "C) Immunoglobulin G (IgG)",
      "D) Immunoglobulin E (IgE)"
    ],
    answer: 2,
    explanation: "IgG is the most abundant serum antibody and possesses specific Fc-receptor affinity (FcRn) allowing transcytosis across the maternal-fetal placental barrier."
  },
  {
    id: 9,
    subject: "Biology",
    question: "In the human female menstrual cycle, the surge in which hormone directly triggers follicular rupture and ovulation around day 14?",
    options: [
      "A) Progesterone",
      "B) Luteinizing Hormone (LH)",
      "C) Human Chorionic Gonadotropin (hCG)",
      "D) Prolactin"
    ],
    answer: 1,
    explanation: "High sustained estrogen levels exert positive feedback on the anterior pituitary, producing a sharp LH surge that causes the mature Graafian follicle to rupture and release the secondary oocyte."
  },
  {
    id: 10,
    subject: "Biology",
    question: "Structures such as the human arm, the wing of a bat, and the flipper of a whale share similar skeletal anatomy but serve different functions. These are known as:",
    options: [
      "A) Analogous organs reflecting convergent evolution",
      "B) Homologous organs reflecting divergent evolution",
      "C) Vestigial organs reflecting neutral mutation",
      "D) Atavistic organs reflecting genetic drift"
    ],
    answer: 1,
    explanation: "Homologous structures share a common embryonic origin and basic anatomical blueprint derived from a common ancestor, diverging to perform specialized functions."
  },

  // --- CHEMISTRY (8 QUESTIONS) ---
  {
    id: 11,
    subject: "Chemistry",
    question: "When 4.0 g of H₂ gas reacts with 32.0 g of O₂ gas according to 2H₂ + O₂ → 2H₂O, what is the maximum mass of water (H₂O) formed, and which is the limiting reactant?",
    options: [
      "A) 36.0 g H₂O, H₂ is limiting",
      "B) 36.0 g H₂O, both reactants react completely without excess",
      "C) 18.0 g H₂O, O₂ is limiting",
      "D) 72.0 g H₂O, H₂ is in excess"
    ],
    answer: 1,
    explanation: "4.0 g H₂ = 2.0 moles H₂. 32.0 g O₂ = 1.0 mole O₂. From stoichiometry, 2 moles H₂ react with 1 mole O₂ to produce 2 moles H₂O (2 × 18 = 36.0 g). Neither reactant is in excess."
  },
  {
    id: 12,
    subject: "Chemistry",
    question: "What is the ground-state electronic configuration of the Ferrous ion (Fe²⁺) with atomic number Z = 26?",
    options: [
      "A) [Ar] 4s² 3d⁴",
      "B) [Ar] 3d⁶",
      "C) [Ar] 4s¹ 3d⁵",
      "D) [Ar] 3d⁵ 4s¹"
    ],
    answer: 1,
    explanation: "Neutral Fe is [Ar] 4s² 3d⁶. Transition metals lose electrons from the outermost 4s orbital first upon ionization, yielding [Ar] 3d⁶ for Fe²⁺."
  },
  {
    id: 13,
    subject: "Chemistry",
    question: "According to VSEPR theory, what is the molecular geometry and hybridization of the central nitrogen atom in ammonia (NH₃)?",
    options: [
      "A) Trigonal planar, sp² hybridization",
      "B) Trigonal pyramidal, sp³ hybridization",
      "C) Tetrahedral, sp³ hybridization",
      "D) T-shaped, dsp² hybridization"
    ],
    answer: 1,
    explanation: "Nitrogen in NH₃ has 3 bond pairs and 1 lone pair (steric number = 4, sp³ hybridization). Due to lone pair-bond pair repulsion, the molecular geometry is trigonal pyramidal with a bond angle of ~107.5°."
  },
  {
    id: 14,
    subject: "Chemistry",
    question: "Under standard conditions, a chemical reaction is thermodynamically spontaneous in the forward direction at all temperatures if:",
    options: [
      "A) ΔH is positive and ΔS is negative",
      "B) ΔH is negative and ΔS is positive",
      "C) ΔH is positive and ΔS is positive",
      "D) ΔH is negative and ΔS is negative"
    ],
    answer: 1,
    explanation: "From ΔG = ΔH - TΔS, when ΔH is negative (exothermic) and ΔS is positive (entropy increase), ΔG is negative at every absolute temperature T."
  },
  {
    id: 15,
    subject: "Chemistry",
    question: "Which of the following alkyl halides undergoes nucleophilic substitution predominantly via a unimolecular SN1 mechanism with carbocation intermediate?",
    options: [
      "A) CH₃-Cl (Chloromethane)",
      "B) CH₃CH₂-Br (Bromoethane)",
      "C) (CH₃)₃C-Br (2-Bromo-2-methylpropane / tert-Butyl bromide)",
      "D) CH₃CH₂CH₂-I (1-Iodopropane)"
    ],
    answer: 2,
    explanation: "Tertiary alkyl halides form exceptionally stable 3° carbocations through hyperconjugation and inductive stabilization, favoring the two-step SN1 pathway."
  },
  {
    id: 16,
    subject: "Chemistry",
    question: "Which of the following carbonyl compounds will undergo Cannizzaro's disproportionation reaction upon treatment with concentrated 50% NaOH?",
    options: [
      "A) Acetaldehyde (Ethanal, CH₃CHO)",
      "B) Formaldehyde (Methanal, HCHO)",
      "C) Acetone (Propanone, CH₃COCH₃)",
      "D) Propionaldehyde (CH₃CH₂CHO)"
    ],
    answer: 1,
    explanation: "Cannizzaro reaction occurs in aldehydes lacking alpha-hydrogen atoms (e.g. Formaldehyde, Benzaldehyde), yielding one molecule of alcohol and one molecule of carboxylate salt."
  },
  {
    id: 17,
    subject: "Chemistry",
    question: "Given standard electrode potentials E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V, what is the standard electromotive force (EMF, E°cell) for the Daniell cell?",
    options: [
      "A) +0.42 V",
      "B) +1.10 V",
      "C) -1.10 V",
      "D) -0.42 V"
    ],
    answer: 1,
    explanation: "E°cell = E°cathode - E°anode = (+0.34 V) - (-0.76 V) = +0.34 V + 0.76 V = +1.10 V."
  },
  {
    id: 18,
    subject: "Chemistry",
    question: "What is the pH of an acidic buffer containing 0.1 M Acetic acid (CH₃COOH, pKa = 4.74) and 0.1 M Sodium acetate (CH₃COONa)?",
    options: [
      "A) 7.00",
      "B) 4.74",
      "C) 5.74",
      "D) 3.74"
    ],
    answer: 1,
    explanation: "Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]). Since [Salt] = [Acid] = 0.1 M, log(1) = 0, so pH = pKa = 4.74."
  },

  // --- PHYSICS (8 QUESTIONS) ---
  {
    id: 19,
    subject: "Physics",
    question: "For a projectile launched on level ground at velocity v₀ and angle θ with the horizontal, at what launch angle is the maximum horizontal range achieved (neglecting air friction)?",
    options: [
      "A) 30°",
      "B) 45°",
      "C) 60°",
      "D) 90°"
    ],
    answer: 1,
    explanation: "Horizontal range R = (v₀² sin 2θ)/g. The term sin 2θ achieves its maximum value of 1 when 2θ = 90°, which means θ = 45°."
  },
  {
    id: 20,
    subject: "Physics",
    question: "A body of mass 2 kg moving at 10 m/s is brought to rest by a constant retarding force over a distance of 5 m. What is the magnitude of the work done by the braking force?",
    options: [
      "A) 50 Joules",
      "B) 100 Joules",
      "C) 200 Joules",
      "D) 500 Joules"
    ],
    answer: 1,
    explanation: "By the Work-Energy Theorem, W = ΔK.E. = 1/2 m (v_f² - v_i²) = 1/2 (2 kg)(0 - 100) = -100 J. The magnitude of work done is 100 Joules."
  },
  {
    id: 21,
    subject: "Physics",
    question: "If the linear speed of an object moving in a uniform circle of radius r is doubled while the radius remains constant, what happens to its centripetal acceleration?",
    options: [
      "A) It is halved",
      "B) It is doubled",
      "C) It quadruples (increases by factor of 4)",
      "D) It remains unchanged"
    ],
    answer: 2,
    explanation: "Centripetal acceleration a_c = v²/r. Since a_c is proportional to v², doubling v makes the acceleration (2v)²/r = 4(v²/r), which is 4 times larger."
  },
  {
    id: 22,
    subject: "Physics",
    question: "In an adiabatic thermodynamic expansion of an ideal gas, no heat enters or leaves the system (Q = 0). What is the relationship between work done (W) and internal energy change (ΔU)?",
    options: [
      "A) ΔU = +W",
      "B) ΔU = -W",
      "C) ΔU = 0",
      "D) W = 0"
    ],
    answer: 1,
    explanation: "From the First Law of Thermodynamics: Q = ΔU + W. Since Q = 0 in an adiabatic process, ΔU = -W. As the gas expands (W > 0), internal energy decreases (temperature drops)."
  },
  {
    id: 23,
    subject: "Physics",
    question: "What is the electric field intensity (E) inside a hollow charged spherical conductor of radius R carrying a net surface charge Q?",
    options: [
      "A) E = kQ / R²",
      "B) E = 0",
      "C) E = kQ / R",
      "D) E = ∞"
    ],
    answer: 1,
    explanation: "By Gauss's Law, because the enclosed charge inside any concentric Gaussian surface inside the hollow conductor is zero, the electric field intensity inside is zero (E = 0)."
  },
  {
    id: 24,
    subject: "Physics",
    question: "A wire of resistance R is stretched uniformly such that its length is doubled while its volume remains constant. What is the new electrical resistance of the wire?",
    options: [
      "A) 2R",
      "B) R / 2",
      "C) 4R",
      "D) R / 4"
    ],
    answer: 2,
    explanation: "Volume V = A × L is constant. When length doubles (L' = 2L), area halves (A' = A/2). Resistance R' = ρ(L'/A') = ρ(2L / (A/2)) = 4(ρL/A) = 4R."
  },
  {
    id: 25,
    subject: "Physics",
    question: "In Young's Double Slit Experiment, the fringe spacing (fringe width β) is given by which equation, where λ is wavelength, L is screen distance, and d is slit separation?",
    options: [
      "A) β = (λ d) / L",
      "B) β = (λ L) / d",
      "C) β = (d L) / λ",
      "D) β = (λ L d)"
    ],
    answer: 1,
    explanation: "The fringe width β for both constructive and destructive interference fringes on screen distance L with slit separation d and monochromatic wavelength λ is β = (λ L) / d."
  },
  {
    id: 26,
    subject: "Physics",
    question: "In Einstein's photoelectric effect, if incident photons have energy hf exceeding the metal work function Φ, what is the maximum kinetic energy (K.E.max) of emitted photoelectrons?",
    options: [
      "A) K.E.max = hf + Φ",
      "B) K.E.max = hf - Φ",
      "C) K.E.max = Φ / hf",
      "D) K.E.max = hf / Φ"
    ],
    answer: 1,
    explanation: "Einstein's photoelectric equation states that total photon energy hf equals the work function Φ (minimum energy to liberate electron) plus maximum kinetic energy: K.E.max = hf - Φ."
  },

  // --- ENGLISH (4 QUESTIONS) ---
  {
    id: 27,
    subject: "English",
    question: "Identify the grammatically correct sentence complying with subject-verb agreement rules:",
    options: [
      "A) Neither the head surgeon nor the attending nurses was available in the trauma ward.",
      "B) Neither the head surgeon nor the attending nurses were available in the trauma ward.",
      "C) Neither the head surgeon nor the attending nurses has been available in the trauma ward.",
      "D) Neither the head surgeon nor the attending nurses is available in the trauma ward."
    ],
    answer: 1,
    explanation: "When subjects are joined by 'neither... nor', the verb must agree in number with the closer subject ('the attending nurses' is plural, so the plural verb 'were' is correct)."
  },
  {
    id: 28,
    subject: "English",
    question: "Choose the word most nearly SYNONYMOUS with the capitalized term: 'The clinical pathologist was METICULOUS in cataloging histological tissue specimens.'",
    options: [
      "A) Hasty and careless",
      "B) Painstakingly precise and thorough",
      "C) Hesitant and doubtful",
      "D) Ambiguous and vague"
    ],
    answer: 1,
    explanation: "'Meticulous' means showing great attention to detail, very careful, and precise."
  },
  {
    id: 29,
    subject: "English",
    question: "Select the correct preposition to complete the sentence: 'Medical professionals are ethically obligated to comply _______ the international patient confidentiality protocol.'",
    options: [
      "A) with",
      "B) to",
      "C) upon",
      "D) for"
    ],
    answer: 0,
    explanation: "The verb 'comply' takes the dependent preposition 'with' (e.g. 'comply with regulations/protocols')."
  },
  {
    id: 30,
    subject: "English",
    question: "Which of the following options eliminates the DANGLING MODIFIER present in: 'Walking into the anatomy laboratory, the preservation aroma was immediately noticed.'?",
    options: [
      "A) Walking into the anatomy laboratory, notice of the preservation aroma was made.",
      "B) As the students walked into the anatomy laboratory, they immediately noticed the preservation aroma.",
      "C) Walking into the anatomy laboratory, the aroma of preservation was noticed by all.",
      "D) The preservation aroma was immediately noticed walking into the anatomy laboratory."
    ],
    answer: 1,
    explanation: "Option B provides the clear agent/subject ('the students') who performed the action of walking into the laboratory, removing the dangling participle."
  }
];

// Search index database

const SEARCH_DATABASE = [
  // --- Core Subjects ---
  { type: 'Subject', title: 'Biology MDCAT', desc: '14+ Chapters covering Cell Biology, Genetics, Human Physiology, Reproduction, Bioenergetics', link: 'biologymdcat.html', tags: ['biology', 'cells', 'genetics', 'physiology', 'dna', 'botany', 'zoology', 'biologymdcat'] },
  { type: 'Subject', title: 'Chemistry MDCAT', desc: '14 Chapters covering Physical, Inorganic, and Organic Chemistry, Equilibrium, Bonding', link: 'chemistrymdcat.html', tags: ['chemistry', 'organic', 'stoichiometry', 'equilibrium', 'reactions', 'formulas', 'chemistrymdcat'] },
  { type: 'Subject', title: 'Physics MDCAT', desc: '14 Chapters covering Mechanics, Thermodynamics, Electromagnetism, Waves, Modern Physics', link: 'physicsmdcat.html', tags: ['physics', 'vectors', 'kinematics', 'circuits', 'optics', 'formulas', 'physicsmdcat'] },
  { type: 'Subject', title: 'English MDCAT', desc: '8 Topics covering Grammatical Rules, Medical Vocabulary, Sentence Correction, Comprehension', link: 'englishmdcat.html', tags: ['english', 'grammar', 'vocabulary', 'lexicon', 'verbs', 'synonyms', 'englishmdcat'] },

  // --- Biology Real Topic Files ---
  { type: 'Topic', title: 'Cell Biology', desc: 'Structure, organelles, plasma membrane, transport mechanisms', link: 'Cell-Biology.html', tags: ['cell', 'membrane', 'organelles', 'mitochondria', 'nucleus'] },
  { type: 'Topic', title: 'Bioenergetics', desc: 'Photosynthesis, cellular respiration, glycolysis, ATP synthesis', link: 'Bioenergetics.html', tags: ['bioenergetics', 'atp', 'photosynthesis', 'respiration', 'krebs'] },
  { type: 'Topic', title: 'Biological Molecules', desc: 'Carbohydrates, lipids, proteins, enzymes, nucleic acids', link: 'Biological-Molecules.html', tags: ['molecules', 'proteins', 'lipids', 'dna', 'rna', 'carbohydrates'] },
  { type: 'Topic', title: 'Biotechnology', desc: 'Recombinant DNA technology, PCR, gene sequencing, cloning', link: 'Biotechnology.html', tags: ['biotechnology', 'pcr', 'cloning', 'recombinant', 'dna'] },
  { type: 'Topic', title: 'Genetics & Inheritance', desc: 'Mendelian laws, sex linkage, gene interactions, genetic variations', link: 'Genetics.html', tags: ['genetics', 'inheritance', 'mendel', 'alleles', 'chromosomes'] },
  { type: 'Topic', title: 'Homeostasis & Excretion', desc: 'Osmoregulation, kidney nephron mechanism, thermoregulation', link: 'Homeostasis.html', tags: ['homeostasis', 'kidney', 'nephron', 'osmoregulation', 'urea'] },
  { type: 'Topic', title: 'Human Physiology', desc: 'Cardiovascular, respiratory, digestive, and nervous systems', link: 'Human Physiology.html', tags: ['physiology', 'heart', 'circulation', 'lungs', 'digestion'] },
  { type: 'Topic', title: 'Reproduction', desc: 'Male and female reproductive systems, gametogenesis, menstrual cycle', link: 'reproduction.html', tags: ['reproduction', 'gametes', 'spermatogenesis', 'oogenesis', 'hormones'] },
  { type: 'Topic', title: 'Support & Movement', desc: 'Human skeletal system, joints, sarcomere muscle contraction mechanism', link: 'support-movement.html', tags: ['skeletal', 'bones', 'muscles', 'sarcomere', 'actin', 'myosin'] },
  { type: 'Topic', title: 'Coordination & Control', desc: 'Nervous transmission, action potential, endocrine glands and hormones', link: 'coordination.html', tags: ['nervous', 'action potential', 'synapse', 'hormones', 'endocrine'] },
  { type: 'Topic', title: 'Enzymes', desc: 'Enzyme specificity, Michaelis-Menten kinetics, competitive inhibition', link: 'enzymes.html', tags: ['enzymes', 'catalysis', 'inhibitors', 'active site', 'kinetics'] },
  { type: 'Topic', title: 'Evolution', desc: 'Evidences of organic evolution, Darwinian natural selection, speciation', link: 'Evolution.html', tags: ['evolution', 'natural selection', 'darwin', 'fossils', 'adaptations'] },

  // --- Chemistry Real Topic Files ---
  { type: 'Topic', title: 'Basic Concepts & Stoichiometry', desc: 'Mole calculation, Avogadro number, limiting reactant, percentage yield', link: 'Basic Concepts.html', tags: ['mole', 'stoichiometry', 'avogadro', 'yield', 'reactants'] },
  { type: 'Topic', title: 'Atomic Structure', desc: 'Bohr atomic model, quantum numbers, electronic configuration, orbitals', link: 'atomic-structure.html', tags: ['atomic structure', 'bohr', 'quantum', 'orbitals', 'aufbau'] },
  { type: 'Topic', title: 'Chemical Bonding', desc: 'Ionic, covalent bonding, VSEPR theory, hybridization, dipole moments', link: 'chemical-bonding.html', tags: ['bonding', 'vsepr', 'hybridization', 'dipole', 'electronegativity'] },
  { type: 'Topic', title: 'States of Matter & Gases', desc: 'Ideal gas equation, Dalton law, kinetic theory of gases, deviations', link: 'states-of-matter.html', tags: ['gas laws', 'boyle', 'charles', 'dalton', 'liquids', 'solids'] },
  { type: 'Topic', title: 'Chemical Equilibrium', desc: 'Equilibrium constant Kc, Le Chatelier principle, common ion effect', link: 'chemical-equilibrium.html', tags: ['equilibrium', 'kc', 'kp', 'le chatelier', 'solubility'] },
  { type: 'Topic', title: 'Acids, Bases & Salts', desc: 'Arrhenius, Bronsted-Lowry, Lewis theories, pH, buffers, hydrolysis', link: 'acids-bases-salts.html', tags: ['acids', 'bases', 'ph', 'buffers', 'titration', 'salts'] },
  { type: 'Topic', title: 'Thermochemistry', desc: 'Enthalpy changes, Hess law of constant heat summation, bond energy', link: 'thermochemistry.html', tags: ['thermochemistry', 'enthalpy', 'hess law', 'calorimetry'] },
  { type: 'Topic', title: 'Thermodynamics', desc: 'First and second laws, spontaneous processes, entropy, Gibbs free energy', link: 'thermodynamics.html', tags: ['thermodynamics', 'entropy', 'gibbs', 'spontaneity'] },
  { type: 'Topic', title: 'Periodic Table & Periodicity', desc: 'Periodic trends, ionization energy, electron affinity, electronegativity', link: 'periodic-table.html', tags: ['periodic table', 'ionization', 'electron affinity', 'trends', 'blocks'] },
  { type: 'Topic', title: 'Alcohols, Phenols & Ethers', desc: 'Nomenclature, Lucas test, oxidation, electrophilic aromatic substitution', link: 'alcohols-phenols-ethers.html', tags: ['organic', 'alcohols', 'phenols', 'ethers', 'lucas test'] },
  { type: 'Topic', title: 'Aldehydes & Ketones', desc: 'Carbonyl group, nucleophilic addition, Tollens and Fehling tests', link: 'aldehydes-ketones.html', tags: ['aldehydes', 'ketones', 'carbonyl', 'tollens', 'fehling'] },
  { type: 'Topic', title: 'Carboxylic Acids', desc: 'Acidity comparison, esterification, acid chlorides, amides, decarboxylation', link: 'carboxylic-acids.html', tags: ['carboxylic acids', 'esters', 'acidity', 'esterification'] },

  // --- Physics Real Topic Files ---
  { type: 'Topic', title: 'Vectors & Equilibrium', desc: 'Vector addition, dot and cross products, conditions of equilibrium', link: 'vectors-equilibrium.html', tags: ['vectors', 'equilibrium', 'torque', 'resultant', 'components'] },
  { type: 'Topic', title: 'Force & Motion', desc: 'Newton laws, linear momentum conservation, projectile motion equations', link: 'force-motion.html', tags: ['force', 'motion', 'projectile', 'momentum', 'newton'] },
  { type: 'Topic', title: 'Work & Energy', desc: 'Work-energy principle, kinetic energy, potential energy, escape velocity', link: 'work-energy.html', tags: ['work', 'energy', 'power', 'conservation', 'escape velocity'] },
  { type: 'Topic', title: 'Rotational & Circular Motion', desc: 'Angular displacement, angular velocity, centripetal acceleration, moment of inertia', link: 'rotational-circular-motion.html', tags: ['rotational', 'circular', 'centripetal', 'torque', 'angular momentum'] },
  { type: 'Topic', title: 'Waves & Oscillations', desc: 'Simple harmonic motion, resonance, Doppler effect, stationary waves', link: 'waves.html', tags: ['waves', 'shm', 'doppler', 'resonance', 'interference'] },
  { type: 'Topic', title: 'Electrostatics', desc: 'Coulomb law, electric field intensity, Gauss law, electric potential, capacitors', link: 'electrostatics.html', tags: ['electrostatics', 'coulomb', 'capacitance', 'electric field', 'potential'] },
  { type: 'Topic', title: 'Electromagnetism', desc: 'Magnetic flux density, Ampere law, Lorentz force, Faraday law of induction', link: 'electromagnetism.html', tags: ['electromagnetism', 'faraday', 'lorentz', 'flux', 'induction'] },
  { type: 'Topic', title: 'Electronics', desc: 'Semiconductors, p-n junction diode, half & full wave rectification, transistors', link: 'electronics.html', tags: ['electronics', 'diodes', 'rectification', 'transistors', 'logic gates'] },
  { type: 'Topic', title: 'Modern Physics', desc: 'Special relativity, photoelectric effect, Compton scattering, de Broglie wavelength', link: 'modern-physics.html', tags: ['modern physics', 'photoelectric', 'compton', 'quantum', 'de broglie'] },
  { type: 'Topic', title: 'Atomic Spectra', desc: 'Bohr model of hydrogen, Balmer series, Lyman series, X-ray production', link: 'atomic-spectra.html', tags: ['spectra', 'hydrogen', 'balmer', 'lyman', 'xrays'] },
  { type: 'Topic', title: 'Nuclear Physics', desc: 'Mass defect, nuclear binding energy, radioactive decay laws, half-life', link: 'nuclear-physics.html', tags: ['nuclear', 'radioactivity', 'half life', 'decay', 'fission', 'fusion'] },

  // --- English Real Topic Files ---
  { type: 'Topic', title: 'MDCAT Medical Vocabulary', desc: 'High-frequency academic and medical vocabulary with contextual usage', link: 'vocabulary.html', tags: ['vocabulary', 'words', 'lexicon', 'synonyms', 'antonyms'] },
  { type: 'Topic', title: 'Parts of Speech', desc: 'Nouns, pronouns, subject-verb agreement, modifiers, prepositions', link: 'parts-of-speech.html', tags: ['parts of speech', 'verbs', 'prepositions', 'nouns', 'agreement'] },
  { type: 'Topic', title: 'Punctuation & Capitalization', desc: 'Semicolons, colons, commas, dashes, apostrophes, quotation marks', link: 'punctuation.html', tags: ['punctuation', 'commas', 'semicolons', 'apostrophes'] },
  { type: 'Topic', title: 'Sentence Correction & Errors', desc: 'Parallelism, dangling modifiers, tense consistency, misplaced clauses', link: 'error-detection.html', tags: ['errors', 'correction', 'parallelism', 'modifiers', 'grammar'] },
  { type: 'Topic', title: 'Active & Passive Voice', desc: 'Transitive verb transformations, imperative voice, tense structures', link: 'active-passive-voice.html', tags: ['voice', 'active', 'passive', 'transformation'] },
  { type: 'Topic', title: 'Direct & Indirect Speech', desc: 'Reported speech conversion rules, backshifting tenses, reporting verbs', link: 'direct-indirect-speech.html', tags: ['speech', 'narration', 'direct', 'indirect', 'reported speech'] },
  { type: 'Topic', title: 'Reading Comprehension', desc: 'Medical & scientific passages, main idea, inferences, tone, context clues', link: 'reading-comprehension.html', tags: ['reading', 'comprehension', 'passages', 'inferences'] },

  // --- Medical Universities ---
  { type: 'University', title: 'Aga Khan University (AKU)', desc: 'Karachi, Sindh - Premier chartered medical institution for MBBS', link: '#universities', action: 'modal:aku', tags: ['aku', 'aga khan', 'karachi', 'sindh', 'private', 'mbbs'] },
  { type: 'University', title: 'Dow University of Health Sciences (DUHS)', desc: 'Karachi, Sindh - Key public admitting university (DMC & DIMC)', link: '#universities', action: 'modal:duhs', tags: ['duhs', 'dow', 'dmc', 'karachi', 'sindh', 'public', 'mbbs'] },
  { type: 'University', title: 'Jinnah Sindh Medical University (JSMU)', desc: 'Karachi, Sindh - Home to Sindh Medical College and teaching hospitals', link: '#universities', action: 'modal:jsmu', tags: ['jsmu', 'jinnah', 'smc', 'karachi', 'sindh', 'public', 'mbbs'] },
  { type: 'University', title: 'Liaquat University of Medical & Health Sciences (LUMHS)', desc: 'Jamshoro, Sindh - Pioneer public medical institution in Sindh', link: '#universities', action: 'modal:lumhs', tags: ['lumhs', 'liaquat', 'jamshoro', 'hyderabad', 'sindh', 'mbbs'] },
  { type: 'University', title: 'Chandka Medical College (CMC Larkana)', desc: 'Larkana, Sindh - Premier regional medical college under SMBBMU', link: '#universities', action: 'modal:cmc', tags: ['cmc', 'chandka', 'larkana', 'smbbmu', 'sindh', 'mbbs'] },
  { type: 'University', title: 'Peoples University of Medical & Health Sciences (PUMHSW)', desc: 'Nawabshah, Sindh - Prestigious public medical university for women', link: '#universities', action: 'modal:pumhs', tags: ['pumhs', 'nawabshah', 'women', 'sindh', 'mbbs'] },
  { type: 'University', title: 'King Edward Medical University (KEMU)', desc: 'Lahore, Punjab - Oldest medical university with historic top merit', link: '#universities', action: 'modal:kemu', tags: ['kemu', 'king edward', 'lahore', 'punjab', 'mbbs'] },
  { type: 'University', title: 'University of Health Sciences (UHS)', desc: 'Lahore, Punjab - Regulating body for Punjab public medical admissions', link: '#universities', action: 'modal:uhs', tags: ['uhs', 'lahore', 'punjab', 'mbbs'] },

  // --- Official Curriculum & Resources ---
  { type: 'Resource', title: 'Sindh Textbook Board (STBB) Books', desc: 'Class XI and XII official biology, chemistry, and physics textbooks', link: '#sindh-books', tags: ['sindh', 'textbook', 'stbb', 'books', 'class xi', 'class xii'] },
  { type: 'Resource', title: 'National Book Foundation (NBF) Syllabus', desc: 'Federal intermediate textbooks mapped for MDCAT test specifications', link: '#books', tags: ['nbf', 'federal', 'books', 'textbooks'] },
  { type: 'Pattern', title: 'PMDC MDCAT Exam Pattern & Passing Marks', desc: '200 MCQs, 210 minutes duration, 55% MBBS / 50% BDS criteria', link: '#test-pattern', tags: ['pattern', 'pmdc', 'marks', 'duration', 'negative marking', 'syllabus'] },
  { type: 'Test', title: '30-Question Free Practice Test', desc: 'Interactive timed exam simulation with instant subject analytics', link: '#quiz', tags: ['quiz', 'test', 'practice', 'mcqs', 'biology', 'chemistry', 'physics', 'english'] },
  { type: 'Practice', title: 'Daily Medical Practice Session', desc: 'Daily targeted MCQ workout to maintain study consistency and streak', link: '#daily-practice', tags: ['daily', 'practice', 'streak', 'routine'] },
  { type: 'Strategy', title: 'MDCAT High-Yield Study Strategy', desc: 'Evidence-based preparation methodologies: Active recall, spaced repetition, mock tests', link: '#study-strategy', tags: ['strategy', 'plan', 'study', 'high yield', 'revision'] },
  { type: 'Assistant', title: 'EDUNOVIX AI Study Assistant', desc: 'Interactive AI tutor for instant concept explanations and MCQ solving', link: 'ai-assistant.html', tags: ['ai', 'assistant', 'chat', 'doubt', 'tutor', 'gemini'] }
];

// ==========================================================================
// 2. STATE MANAGEMENT & STORAGE KEYS
// ==========================================================================
const STORAGE_KEYS = {
  BIO_PROG: "studymate_mdcat_bio_prog",
  CHEM_PROG: "studymate_mdcat_chem_prog",
  PHY_PROG: "studymate_mdcat_phy_prog",
  ENG_PROG: "studymate_mdcat_eng_prog",
  STREAK_COUNT: "studymate_mdcat_streak",
  LAST_ACTIVE_DATE: "studymate_mdcat_last_date",
  QUIZ_ATTEMPTS: "studymate_mdcat_quiz_attempts",
  QUIZ_BEST_SCORE: "studymate_mdcat_quiz_best",
  TARGET_UNI: "studymate_mdcat_target_uni",
  TARGET_SCORE: "studymate_mdcat_target_score",
  THEME: "theme",
  FALLBACK_THEME: "studymate_theme"
};

// Quiz runtime state
let currentQuestionIndex = 0;
let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
let quizTimerInterval = null;
let quizSecondsRemaining = 30 * 60; // 30 minutes = 1800 seconds
let quizStartTime = 0;
let quizEndTime = 0;
let quizSubmitted = false;

// ==========================================================================
// 3. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initProgressTracker();
  initCountUpObserver();
  initSearch();
  initUniversitiesFilter();
  initModals();
  initDailyStreak();
  loadSavedProfile();
  initBackToTop();
  updateStudyRecommendation();
});

// ==========================================================================
// 4. THEME ENGINE (Dark / Light Mode Sync)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 
                     localStorage.getItem(STORAGE_KEYS.FALLBACK_THEME) || 
                     (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(savedTheme);

  // Listen for system theme changes if user hasn't explicitly set one
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

function applyTheme(theme) {
  const htmlEl = document.documentElement;
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  localStorage.setItem(STORAGE_KEYS.FALLBACK_THEME, theme);

  // Update theme toggle icons across desktop & drawer
  const themeIcons = document.querySelectorAll('.theme-icon-toggle');
  const themeText = document.querySelectorAll('.theme-text-toggle');

  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    } else {
      icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
    }
  });

  themeText.forEach(text => {
    text.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  });
}

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
};

// ==========================================================================
// 5. NAVBAR & MOBILE DRAWER
// ==========================================================================
function initNavbar() {
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const dropdownBtn = document.getElementById('subjects-dropdown-btn');
  const dropdown = dropdownBtn ? dropdownBtn.closest('.nav-dropdown') : null;

  // Header elevation shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Subjects dropdown toggle
  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // Hamburger drawer toggle
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close drawer when clicking any nav link inside it
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }
}

// ==========================================================================
// 6. SUBJECT PROGRESS TRACKER & DASHBOARD
// ==========================================================================
function initProgressTracker() {
  const bio = parseInt(localStorage.getItem(STORAGE_KEYS.BIO_PROG) || "35", 10);
  const chem = parseInt(localStorage.getItem(STORAGE_KEYS.CHEM_PROG) || "25", 10);
  const phy = parseInt(localStorage.getItem(STORAGE_KEYS.PHY_PROG) || "20", 10);
  const eng = parseInt(localStorage.getItem(STORAGE_KEYS.ENG_PROG) || "40", 10);

  updateProgressUI('biology', bio);
  updateProgressUI('chemistry', chem);
  updateProgressUI('physics', phy);
  updateProgressUI('english', eng);

  calculateOverallProgress();
}

window.updateSubjectProgress = function(subject, increment = 15) {
  let key = STORAGE_KEYS.BIO_PROG;
  if (subject === 'biology') key = STORAGE_KEYS.BIO_PROG;
  else if (subject === 'chemistry') key = STORAGE_KEYS.CHEM_PROG;
  else if (subject === 'physics') key = STORAGE_KEYS.PHY_PROG;
  else if (subject === 'english') key = STORAGE_KEYS.ENG_PROG;

  let current = parseInt(localStorage.getItem(key) || '0', 10);
  let next = current + increment;
  if (next > 100) next = 100;

  localStorage.setItem(key, next.toString());
  updateProgressUI(subject, next);
  calculateOverallProgress();
  updateStudyRecommendation();

  const formattedName = subject.charAt(0).toUpperCase() + subject.slice(1);
  showToast(`${formattedName} progress updated to ${next}%!`);
};

function updateProgressUI(subject, pct) {
  const prefix = subject === 'biology' ? 'bio' : subject === 'chemistry' ? 'chem' : subject === 'physics' ? 'phy' : 'eng';
  const total = subject === 'english' ? 8 : 14;
  const completed = Math.round((pct / 100) * total);

  // Subject Card UI
  const cardPct = document.getElementById(`${prefix}-card-pct`);
  const cardBar = document.getElementById(`${prefix}-card-bar`);
  if (cardPct) cardPct.textContent = `${pct}%`;
  if (cardBar) cardBar.style.width = `${pct}%`;

  // Dashboard UI
  const dashPct = document.getElementById(`${prefix}-dash-pct`);
  const dashBar = document.getElementById(`${prefix}-dash-bar`);
  const completedTxt = document.getElementById(`${prefix}-completed-txt`);

  if (dashPct) dashPct.textContent = `${pct}%`;
  if (dashBar) dashBar.style.width = `${pct}%`;
  if (completedTxt) {
    const unit = subject === 'english' ? 'Topics' : 'Chapters';
    completedTxt.textContent = `${completed} / ${total} ${unit} Completed`;
  }
}

function calculateOverallProgress() {
  const bio = parseInt(localStorage.getItem(STORAGE_KEYS.BIO_PROG) || "35", 10);
  const chem = parseInt(localStorage.getItem(STORAGE_KEYS.CHEM_PROG) || "25", 10);
  const phy = parseInt(localStorage.getItem(STORAGE_KEYS.PHY_PROG) || "20", 10);
  const eng = parseInt(localStorage.getItem(STORAGE_KEYS.ENG_PROG) || "40", 10);

  const overall = Math.round((bio + chem + phy + eng) / 4);

  const overallEl = document.getElementById('overall-progress-pct');
  if (overallEl) overallEl.textContent = `${overall}%`;

  const circleEl = document.getElementById('overall-progress-circle');
  if (circleEl) {
    const circumference = 263.89;
    const offset = circumference - (overall / 100) * circumference;
    circleEl.style.strokeDashoffset = offset.toString();
  }
}

// ==========================================================================
// 7. INTELLIGENT STUDY RECOMMENDATION ENGINE ("What Should I Study Next?")
// ==========================================================================
function updateStudyRecommendation() {
  const bio = parseInt(localStorage.getItem(STORAGE_KEYS.BIO_PROG) || "35", 10);
  const chem = parseInt(localStorage.getItem(STORAGE_KEYS.CHEM_PROG) || "25", 10);
  const phy = parseInt(localStorage.getItem(STORAGE_KEYS.PHY_PROG) || "20", 10);
  const eng = parseInt(localStorage.getItem(STORAGE_KEYS.ENG_PROG) || "40", 10);

  const subjects = [
    { name: 'Biology', pct: bio, file: 'biologymdcat.html', icon: '🧬', focus: 'Cell Biology, Genetics & Human Physiology (68 MCQs weightage)' },
    { name: 'Chemistry', pct: chem, file: 'chemistrymdcat.html', icon: '⚗️', focus: 'Organic reaction mechanisms, Stoichiometry & Equilibrium' },
    { name: 'Physics', pct: phy, file: 'physicsmdcat.html', icon: '⚡', focus: 'Mechanics formulas, Electromagnetism & Modern Physics problem solving' },
    { name: 'English', pct: eng, file: 'englishmdcat.html', icon: '📖', focus: 'Medical vocabulary, Sentence correction & Grammatical rules' }
  ];

  subjects.sort((a, b) => a.pct - b.pct);
  const lowest = subjects[0];
  const allHigh = bio >= 80 && chem >= 80 && phy >= 80 && eng >= 80;

  const badgeEl = document.getElementById('rec-subject-badge');
  const titleEl = document.getElementById('rec-subject-title');
  const descEl = document.getElementById('rec-subject-desc');
  const btnEl = document.getElementById('rec-subject-btn');

  if (badgeEl && titleEl && descEl && btnEl) {
    if (allHigh) {
      badgeEl.innerHTML = '<span>🏆</span> Full Syllabus Mastery';
      titleEl.textContent = 'Balanced Mock Exam Revision';
      descEl.textContent = 'You have achieved 80%+ across all 4 subjects! Consolidate your high merit rank with full-length 200 MCQ simulated exams and time management drill.';
      btnEl.textContent = 'Start 30-Question Timed Quiz';
      btnEl.href = '#quiz';
      btnEl.onclick = () => { window.startQuiz(); return false; };
    } else {
      badgeEl.innerHTML = `<span>${lowest.icon}</span> High-Yield Recommended Target`;
      titleEl.textContent = `Focus on ${lowest.name} (${lowest.pct}% Completion)`;
      descEl.textContent = `${lowest.name} has the lowest completion among your subjects. Master key concepts: ${lowest.focus} to balance your overall merit score.`;
      btnEl.textContent = `Continue ${lowest.name} Preparation →`;
      btnEl.href = lowest.file;
      btnEl.onclick = null;
    }
  }
}

// ==========================================================================
// 8. ANIMATED COUNT-UP OBSERVER
// ==========================================================================
function initCountUpObserver() {
  const countElements = document.querySelectorAll('.count-up');
  if (!countElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        animateCounter(el, target, 1500);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  countElements.forEach(el => observer.observe(el));
}

function animateCounter(element, target, duration) {
  let startTimestamp = null;
  const startValue = 0;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentValue = Math.floor(easedProgress * (target - startValue) + startValue);
    element.textContent = currentValue.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  window.requestAnimationFrame(step);
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

// ==========================================================================
// 9. SEARCH SYSTEM
// ==========================================================================
function initSearch() {
  const searchModalBtn = document.getElementById('search-modal-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('global-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const quickTags = document.querySelectorAll('.quick-tag');

  if (searchModalBtn && searchOverlay) {
    searchModalBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      searchOverlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => searchInput?.focus(), 100);
    });
  }

  if (searchClearBtn && searchInput) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      performSearch('');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchOverlay();
      }
      if (e.key === 'Enter') {
        const firstResult = document.querySelector('.search-result-item');
        if (firstResult) {
          firstResult.click();
        }
      }
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const val = tag.getAttribute('data-search') || '';
      if (searchInput) {
        searchInput.value = val;
        performSearch(val);
      }
    });
  });

  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearchOverlay();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchOverlay?.classList.add('open');
      searchOverlay?.setAttribute('aria-hidden', 'false');
      setTimeout(() => searchInput?.focus(), 100);
    }
  });
}

function performSearch(query) {
  const resultsContainer = document.getElementById('search-results-list');
  if (!resultsContainer) return;

  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    resultsContainer.innerHTML = `
      <div class="search-placeholder-hint">
        <p>Type to search across subjects, real topic pages, medical universities, books, and practice tests.</p>
        <div class="quick-tags">
          <span class="quick-tag" onclick="quickSearch('Biology')">🧬 Biology</span>
          <span class="quick-tag" onclick="quickSearch('Chemistry')">⚗️ Chemistry</span>
          <span class="quick-tag" onclick="quickSearch('Physics')">⚡ Physics</span>
          <span class="quick-tag" onclick="quickSearch('English')">📖 English</span>
          <span class="quick-tag" onclick="quickSearch('AKU')">🏥 AKU</span>
          <span class="quick-tag" onclick="quickSearch('DUHS')">🩺 DUHS</span>
          <span class="quick-tag" onclick="quickSearch('Quiz')">📝 Quiz</span>
        </div>
      </div>
    `;
    return;
  }

  const matches = SEARCH_DATABASE.filter(item => {
    return item.title.toLowerCase().includes(trimmed) ||
           item.desc.toLowerCase().includes(trimmed) ||
           item.type.toLowerCase().includes(trimmed) ||
           item.tags.some(tag => tag.toLowerCase().includes(trimmed));
  });

  if (!matches.length) {
    resultsContainer.innerHTML = `
      <div class="search-empty-state">
        <div class="empty-icon">🔍</div>
        <h4>No matching MDCAT resources found</h4>
        <p>Try searching for "Cell", "Genetics", "Bonding", "Mechanics", "DUHS", "Books", or ask the AI Assistant.</p>
        <a href="ai-assistant.html" class="btn btn-secondary btn-sm" style="margin-top: 12px;">Ask AI Assistant about "${escapeHtml(query)}" ↗</a>
      </div>
    `;
    return;
  }

  let html = '';
  matches.forEach(item => {
    const badgeClass = item.type.toLowerCase();
    const actionAttr = item.action ? `onclick="handleSearchModalClick('${item.action}')"` : '';
    const hrefAttr = item.action ? 'href="javascript:void(0)"' : `href="${item.link}"`;

    html += `
      <a ${hrefAttr} ${actionAttr} class="search-result-item">
        <div class="search-item-info">
          <div class="search-item-header">
            <span class="search-item-title">${escapeHtml(item.title)}</span>
            <span class="search-badge-pill badge-${badgeClass}">${escapeHtml(item.type)}</span>
          </div>
          <p class="search-item-desc">${escapeHtml(item.desc)}</p>
        </div>
        <span class="search-arrow">→</span>
      </a>
    `;
  });

  resultsContainer.innerHTML = html;
}

window.quickSearch = function(term) {
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.value = term;
    performSearch(term);
  }
};

window.handleSearchModalClick = function(action) {
  closeSearchOverlay();
  if (action && action.startsWith('modal:')) {
    const uniId = action.split(':')[1];
    setTimeout(() => {
      openUniModal(uniId);
    }, 200);
  }
};

window.closeSearchOverlay = function() {
  const searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay) {
    searchOverlay.classList.remove('open');
    searchOverlay.setAttribute('aria-hidden', 'true');
  }
};

// ==========================================================================
// 10. UNIVERSITIES DIRECTORY & MODAL
// ==========================================================================
function initUniversitiesFilter() {
  const filterBtns = document.querySelectorAll('.uni-filter-btn');
  const uniCards = document.querySelectorAll('.uni-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      uniCards.forEach(card => {
        const region = card.getAttribute('data-region') || '';
        if (filter === 'all' || region.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.openUniModal = function(uniId) {
  const data = UNIVERSITIES_DATA[uniId];
  if (!data) return;

  const modalBackdrop = document.getElementById('uni-modal-backdrop');
  const modalContent = document.getElementById('uni-modal-content');

  if (!modalBackdrop || !modalContent) return;

  let highlightsHtml = '';
  if (data.highlights && data.highlights.length) {
    highlightsHtml = `
      <div class="uni-modal-highlights">
        <strong class="uni-modal-subheading">Key Institutional Highlights</strong>
        <ul class="uni-modal-list">
          ${data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="uni-modal-header">
      <div class="uni-modal-badge">Medical Institution Profile</div>
      <h3 class="uni-modal-title">${escapeHtml(data.name)}</h3>
      <div class="uni-modal-location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${escapeHtml(data.location)}</span>
      </div>
    </div>
    
    <div class="uni-modal-notice-box">
      <strong>Admissions & Merit Framework:</strong>
      <p>${escapeHtml(data.meritNote)}</p>
    </div>

    <div class="uni-modal-details-grid">
      <div class="modal-detail-item">
        <span class="modal-detail-label">Institution Type</span>
        <span class="modal-detail-val">${escapeHtml(data.type)}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Offered Programs</span>
        <span class="modal-detail-val">${escapeHtml(data.programs)}</span>
      </div>
    </div>

    ${highlightsHtml}

    <div class="uni-modal-actions">
      <a href="${data.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>Official Website ↗</span>
      </a>
      <a href="${data.admissionUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <span>Admissions Portal ↗</span>
      </a>
    </div>
  `;

  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function initModals() {
  const uniBackdrop = document.getElementById('uni-modal-backdrop');
  const uniClose = document.getElementById('uni-modal-close');
  const profileBackdrop = document.getElementById('profile-modal-backdrop');
  const profileBtn = document.getElementById('profile-modal-btn');
  const profileClose = document.getElementById('profile-modal-close');

  if (uniClose && uniBackdrop) {
    uniClose.addEventListener('click', () => {
      uniBackdrop.classList.remove('open');
      uniBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    uniBackdrop.addEventListener('click', (e) => {
      if (e.target === uniBackdrop) {
        uniBackdrop.classList.remove('open');
        uniBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  if (profileBtn && profileBackdrop && profileClose) {
    profileBtn.addEventListener('click', () => {
      profileBackdrop.classList.add('open');
      profileBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      loadSavedProfile();
    });

    profileClose.addEventListener('click', () => {
      profileBackdrop.classList.remove('open');
      profileBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    profileBackdrop.addEventListener('click', (e) => {
      if (e.target === profileBackdrop) {
        profileBackdrop.classList.remove('open');
        profileBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (uniBackdrop?.classList.contains('open')) {
        uniBackdrop.classList.remove('open');
        uniBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      if (profileBackdrop?.classList.contains('open')) {
        profileBackdrop.classList.remove('open');
        profileBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      closeSearchOverlay();
    }
  });
}

// ==========================================================================
// 11. 30-QUESTION TIMED PRACTICE QUIZ ENGINE
// ==========================================================================
window.startQuiz = function() {
  currentQuestionIndex = 0;
  userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  quizSecondsRemaining = 30 * 60; // 30 minutes
  quizStartTime = Date.now();
  quizSubmitted = false;

  const startScreen = document.getElementById('quiz-start-screen');
  const activeScreen = document.getElementById('quiz-active-screen');
  const resultScreen = document.getElementById('quiz-result-screen');

  if (startScreen) startScreen.classList.add('hidden');
  if (resultScreen) resultScreen.classList.add('hidden');
  if (activeScreen) activeScreen.classList.remove('hidden');

  clearInterval(quizTimerInterval);
  updateTimerDisplay();
  quizTimerInterval = setInterval(() => {
    quizSecondsRemaining--;
    updateTimerDisplay();

    if (quizSecondsRemaining <= 0) {
      clearInterval(quizTimerInterval);
      showToast('Time expired! Submitting MDCAT practice test...');
      submitQuizFinal();
    }
  }, 1000);

  renderCurrentQuestion();

  const quizSection = document.getElementById('quiz');
  if (quizSection) {
    quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function updateTimerDisplay() {
  const timerDisplay = document.getElementById('quiz-timer-display');
  const timerBox = document.getElementById('quiz-timer-box');

  const minutes = Math.floor(quizSecondsRemaining / 60);
  const seconds = quizSecondsRemaining % 60;
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (timerDisplay) timerDisplay.textContent = formatted;

  if (timerBox) {
    if (quizSecondsRemaining <= 300) {
      timerBox.classList.add('timer-warning');
    } else {
      timerBox.classList.remove('timer-warning');
    }
  }
}

function renderCurrentQuestion() {
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  if (!q) return;

  const qIndexText = document.getElementById('quiz-q-index-text');
  const qSubjIndicator = document.getElementById('quiz-subject-indicator');
  const qText = document.getElementById('quiz-question-text');
  const optionsBox = document.getElementById('quiz-options-container');
  const progFill = document.getElementById('quiz-progress-fill');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (qIndexText) qIndexText.textContent = `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`;

  if (qSubjIndicator) {
    qSubjIndicator.textContent = q.subject;
    if (q.subject === 'Biology') qSubjIndicator.className = 'quiz-subject-indicator bio-bg';
    else if (q.subject === 'Chemistry') qSubjIndicator.className = 'quiz-subject-indicator chem-bg';
    else if (q.subject === 'Physics') qSubjIndicator.className = 'quiz-subject-indicator phy-bg';
    else qSubjIndicator.className = 'quiz-subject-indicator eng-bg';
  }

  if (qText) qText.textContent = q.question;

  if (optionsBox) {
    let optionsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const isSelected = userAnswers[currentQuestionIndex] === idx;
      optionsHtml += `
        <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${idx})" role="button" tabindex="0">
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-text">${escapeHtml(opt)}</div>
        </div>
      `;
    });
    optionsBox.innerHTML = optionsHtml;
  }

  if (progFill) {
    const pct = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    progFill.style.width = `${pct}%`;
  }

  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) {
    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
      nextBtn.textContent = 'Finish & Review';
    } else {
      nextBtn.textContent = 'Next →';
    }
  }
}

window.selectOption = function(optionIndex) {
  if (quizSubmitted) return;
  userAnswers[currentQuestionIndex] = optionIndex;
  renderCurrentQuestion();
};

window.clearCurrentSelection = function() {
  if (quizSubmitted) return;
  userAnswers[currentQuestionIndex] = null;
  renderCurrentQuestion();
};

window.navigateQuiz = function(direction) {
  const newIndex = currentQuestionIndex + direction;
  if (newIndex >= 0 && newIndex < QUIZ_QUESTIONS.length) {
    currentQuestionIndex = newIndex;
    renderCurrentQuestion();
  } else if (newIndex >= QUIZ_QUESTIONS.length) {
    confirmSubmitQuiz();
  }
};

window.confirmSubmitQuiz = function() {
  const answeredCount = userAnswers.filter(a => a !== null).length;
  const unanswered = QUIZ_QUESTIONS.length - answeredCount;

  let msg = `You have answered ${answeredCount} of ${QUIZ_QUESTIONS.length} questions.`;
  if (unanswered > 0) {
    msg += ` (${unanswered} questions remain unanswered).`;
  }
  msg += ` Do you want to submit your MDCAT test now?`;

  if (window.confirm(msg)) {
    submitQuizFinal();
  }
};

function submitQuizFinal() {
  clearInterval(quizTimerInterval);
  quizEndTime = Date.now();
  quizSubmitted = true;

  let totalCorrect = 0;
  let bioScore = 0, bioTotal = 0;
  let chemScore = 0, chemTotal = 0;
  let phyScore = 0, phyTotal = 0;
  let engScore = 0, engTotal = 0;

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.answer;

    if (q.subject === 'Biology') { bioTotal++; if (isCorrect) bioScore++; }
    else if (q.subject === 'Chemistry') { chemTotal++; if (isCorrect) chemScore++; }
    else if (q.subject === 'Physics') { phyTotal++; if (isCorrect) phyScore++; }
    else if (q.subject === 'English') { engTotal++; if (isCorrect) engScore++; }

    if (isCorrect) totalCorrect++;
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);
  const timeUsedSeconds = Math.min(1800, Math.floor((quizEndTime - quizStartTime) / 1000));
  const timeMin = Math.floor(timeUsedSeconds / 60);
  const timeSec = timeUsedSeconds % 60;

  const activeScreen = document.getElementById('quiz-active-screen');
  const resultScreen = document.getElementById('quiz-result-screen');

  if (activeScreen) activeScreen.classList.add('hidden');
  if (resultScreen) resultScreen.classList.remove('hidden');

  const scoreVal = document.getElementById('result-score-val');
  const pctTag = document.getElementById('result-pct-tag');
  const accuracyVal = document.getElementById('result-accuracy-val');
  const breakdownSub = document.getElementById('result-breakdown-sub');
  const timeVal = document.getElementById('result-time-val');

  if (scoreVal) scoreVal.textContent = totalCorrect.toString();
  if (pctTag) pctTag.textContent = `${percentage}%`;
  if (accuracyVal) accuracyVal.textContent = `${percentage}%`;
  if (breakdownSub) breakdownSub.textContent = `${totalCorrect} Correct, ${totalQuestions - totalCorrect} Incorrect`;
  if (timeVal) timeVal.textContent = `${timeMin}m ${timeSec}s`;

  const motText = document.getElementById('result-motivation-text');
  if (motText) {
    if (percentage >= 85) {
      motText.textContent = '🏆 Outstanding Performance! You are tracking in the top medical merit tier. Keep this consistency!';
    } else if (percentage >= 70) {
      motText.textContent = '⭐ Strong Foundation! Review missed concepts in the detailed review below to push toward 90%+.';
    } else if (percentage >= 50) {
      motText.textContent = '📈 Good Practice Attempt! Focus on high-yield formulas and definitions to boost your accuracy.';
    } else {
      motText.textContent = '💪 Keep Going! Systematic textbook revision and regular practice will build your confidence.';
    }
  }

  const resBioScore = document.getElementById('res-bio-score');
  const resBioBar = document.getElementById('res-bio-bar');
  const resChemScore = document.getElementById('res-chem-score');
  const resChemBar = document.getElementById('res-chem-bar');
  const resPhyScore = document.getElementById('res-phy-score');
  const resPhyBar = document.getElementById('res-phy-bar');
  const resEngScore = document.getElementById('res-eng-score');
  const resEngBar = document.getElementById('res-eng-bar');

  if (resBioScore) resBioScore.textContent = `${bioScore} / ${bioTotal}`;
  if (resBioBar) resBioBar.style.width = `${bioTotal > 0 ? (bioScore / bioTotal) * 100 : 0}%`;
  if (resChemScore) resChemScore.textContent = `${chemScore} / ${chemTotal}`;
  if (resChemBar) resChemBar.style.width = `${chemTotal > 0 ? (chemScore / chemTotal) * 100 : 0}%`;
  if (resPhyScore) resPhyScore.textContent = `${phyScore} / ${phyTotal}`;
  if (resPhyBar) resPhyBar.style.width = `${phyTotal > 0 ? (phyScore / phyTotal) * 100 : 0}%`;
  if (resEngScore) resEngScore.textContent = `${engScore} / ${engTotal}`;
  if (resEngBar) resEngBar.style.width = `${engTotal > 0 ? (engScore / engTotal) * 100 : 0}%`;

  renderDetailedReview();

  const prevBest = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || '0', 10);
  if (totalCorrect > prevBest) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_BEST_SCORE, totalCorrect.toString());
  }

  const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts.toString());

  showToast(`Test completed! Scored ${totalCorrect}/30 (${percentage}%)`);
  resultScreen?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderDetailedReview() {
  const reviewList = document.getElementById('review-items-list');
  if (!reviewList) return;

  let html = '';
  const letters = ['A', 'B', 'C', 'D'];

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.answer;
    const isUnanswered = userChoice === null;

    let itemClass = isCorrect ? 'correct-item' : (isUnanswered ? 'unanswered-item' : 'incorrect-item');
    let statusBadge = isCorrect ? 
      '<span class="rev-status-tag rev-correct">✓ Correct</span>' : 
      (isUnanswered ? '<span class="rev-status-tag rev-skipped">⚠️ Unanswered</span>' : '<span class="rev-status-tag rev-wrong">✕ Incorrect</span>');

    let userText = isUnanswered ? 'None Selected' : `${letters[userChoice]}) ${q.options[userChoice]}`;
    let correctText = `${letters[q.answer]}) ${q.options[q.answer]}`;

    html += `
      <div class="review-q-item ${itemClass}">
        <div class="rev-q-top">
          <span class="rev-q-num">Q${idx + 1} • ${escapeHtml(q.subject)}</span>
          ${statusBadge}
        </div>
        <div class="rev-question-text">${escapeHtml(q.question)}</div>
        <div class="rev-answers-box">
          <div class="rev-user-ans"><strong>Your Choice:</strong> ${escapeHtml(userText)}</div>
          <div class="rev-correct-ans"><strong>Correct Answer:</strong> ${escapeHtml(correctText)}</div>
        </div>
        <div class="rev-explanation">
          <strong>Key Concept:</strong> ${escapeHtml(q.explanation)}
        </div>
        <div class="rev-ai-link">
          <a href="ai-assistant.html" class="rev-ask-ai">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Ask AI Assistant to explain this question in detail ↗</span>
          </a>
        </div>
      </div>
    `;
  });

  reviewList.innerHTML = html;
}

window.toggleDetailedReview = function() {
  const reviewSection = document.getElementById('detailed-review-section');
  const reviewBtnText = document.getElementById('review-btn-text');
  if (!reviewSection) return;

  const isHidden = reviewSection.classList.toggle('hidden');
  if (reviewBtnText) {
    reviewBtnText.textContent = isHidden ? '📋 View Detailed Question Review' : '▲ Hide Detailed Question Review';
  }
};

window.retryQuiz = function() {
  const resultScreen = document.getElementById('quiz-result-screen');
  const startScreen = document.getElementById('quiz-start-screen');
  const activeScreen = document.getElementById('quiz-active-screen');

  if (resultScreen) resultScreen.classList.add('hidden');
  if (activeScreen) activeScreen.classList.add('hidden');
  if (startScreen) startScreen.classList.remove('hidden');

  startScreen?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ==========================================================================
// 12. DAILY PRACTICE & STREAK
// ==========================================================================
function initDailyStreak() {
  const todayStr = new Date().toISOString().split('T')[0];
  const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || '1', 10);

  if (lastActive !== todayStr) {
    if (lastActive) {
      const prevDate = new Date(lastActive);
      const today = new Date(todayStr);
      const diffDays = Math.round((today - prevDate) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, todayStr);
    localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, streak.toString());
  }

  const navStreak = document.getElementById('nav-streak-count');
  const dailyStreak = document.getElementById('daily-streak-badge');
  const dateDisplay = document.getElementById('daily-date-display');

  if (navStreak) navStreak.textContent = `🔥 ${streak} Day Streak`;
  if (dailyStreak) dailyStreak.textContent = `${streak} Day Streak Active`;
  if (dateDisplay) {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
  }
}

window.startDailySession = function() {
  showToast('Starting 10-question daily practice session...');
  const quizSection = document.getElementById('quiz');
  if (quizSection) {
    quizSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      startQuiz();
    }, 600);
  }
};

// ==========================================================================
// 13. PROFILE & TARGET GOALS MANAGEMENT
// ==========================================================================
function loadSavedProfile() {
  const targetUni = localStorage.getItem(STORAGE_KEYS.TARGET_UNI) || 'duhs';
  const targetScore = localStorage.getItem(STORAGE_KEYS.TARGET_SCORE) || '185';
  const attempts = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS) || '0';
  const bestScore = localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || '0';
  const streak = localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || '1';

  const uniSelect = document.getElementById('target-uni-select');
  const scoreInput = document.getElementById('target-score-input');
  const pQuizTaken = document.getElementById('p-quiz-taken');
  const pBestScore = document.getElementById('p-best-score');
  const pStreakNum = document.getElementById('p-streak-num');

  if (uniSelect) uniSelect.value = targetUni;
  if (scoreInput) scoreInput.value = targetScore;
  if (pQuizTaken) pQuizTaken.textContent = attempts;
  if (pBestScore) pBestScore.textContent = `${bestScore} / 30`;
  if (pStreakNum) pStreakNum.textContent = streak;
}

window.saveProfileGoals = function() {
  const uniSelect = document.getElementById('target-uni-select');
  const scoreInput = document.getElementById('target-score-input');

  if (uniSelect) localStorage.setItem(STORAGE_KEYS.TARGET_UNI, uniSelect.value);
  if (scoreInput) localStorage.setItem(STORAGE_KEYS.TARGET_SCORE, scoreInput.value);

  showToast('Study target goals successfully saved!');

  const profileBackdrop = document.getElementById('profile-modal-backdrop');
  if (profileBackdrop) {
    profileBackdrop.classList.remove('open');
    profileBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

// ==========================================================================
// 14. BACK TO TOP & UTILITIES
// ==========================================================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>✨</span> <div>${escapeHtml(message)}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(string) {
  if (string === null || string === undefined) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
