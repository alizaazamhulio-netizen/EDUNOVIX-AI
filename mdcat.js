/**
 * EduNexa AI - MDCAT PREPARATION HUB JAVASCRIPT (mdcat.js)
 * Clean, modern vanilla JavaScript handling:
 * - Mobile drawer & Sticky header
 * - Count-up statistics with IntersectionObserver
 * - Search & Filter (subjects, universities, books, topics)
 * - 30-Question Interactive Practice Quiz with Timer, Analytics & Explanations
 * - University Details Modal & Admissions Links
 * - Subject Progress Tracker & LocalStorage persistence
 * - Daily Practice Streak Tracker
 * - Profile & Goals Management
 * - Toast Notifications & Smooth UI Utilities
 */

// ==========================================================================
// 1. DATA REPOSITORIES (Universities, Quiz Questions, Search Data)
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
  { type: "Subject", title: "Biology MDCAT", desc: "14+ Chapters covering cell biology, genetics, physiology, reproduction", link: "biologymdcat.html", tags: ["biology", "cells", "genetics", "physiology", "dna", "botany", "zoology"] },
  { type: "Subject", title: "Chemistry MDCAT", desc: "14 Chapters covering physical, inorganic, and organic chemistry", link: "chemistrymdcat.html", tags: ["chemistry", "organic", "stoichiometry", "equilibrium", "reactions", "formulas"] },
  { type: "Subject", title: "Physics MDCAT", desc: "14 Chapters covering mechanics, thermodynamics, electromagnetism, waves", link: "physicsmdcat.html", tags: ["physics", "vectors", "kinematics", "circuits", "optics", "formulas"] },
  { type: "Subject", title: "English MDCAT", desc: "8 Topics covering grammar rules, vocabulary, comprehension, sentence errors", link: "englishmdcat.html", tags: ["english", "grammar", "vocabulary", "lexicon", "verbs", "synonyms"] },
  
  { type: "University", title: "Aga Khan University (AKU)", desc: "Karachi, Sindh - Premier chartered medical institution for MBBS", link: "#universities", action: "modal:aku", tags: ["aku", "aga khan", "karachi", "sindh", "private", "mbbs"] },
  { type: "University", title: "Dow University of Health Sciences (DUHS)", desc: "Karachi, Sindh - Key public admitting university (DMC & DIMC)", link: "#universities", action: "modal:duhs", tags: ["duhs", "dow", "dmc", "karachi", "sindh", "public", "mbbs"] },
  { type: "University", title: "Jinnah Sindh Medical University (JSMU)", desc: "Karachi, Sindh - Home to SMC and teaching hospitals", link: "#universities", action: "modal:jsmu", tags: ["jsmu", "jinnah", "smc", "karachi", "sindh", "public", "mbbs"] },
  { type: "University", title: "Liaquat University of Medical & Health Sciences (LUMHS)", desc: "Jamshoro, Sindh - Pioneer public medical institution", link: "#universities", action: "modal:lumhs", tags: ["lumhs", "liaquat", "jamshoro", "hyderabad", "sindh", "mbbs"] },
  { type: "University", title: "Chandka Medical College (CMC Larkana)", desc: "Larkana, Sindh - Under SMBBMU university", link: "#universities", action: "modal:cmc", tags: ["cmc", "chandka", "larkana", "smbbmu", "sindh", "mbbs"] },
  { type: "University", title: "Peoples University of Medical & Health Sciences (PUMHSW)", desc: "Nawabshah, Sindh - Public medical university for women", link: "#universities", action: "modal:pumhs", tags: ["pumhs", "nawabshah", "women", "sindh", "mbbs"] },
  { type: "University", title: "King Edward Medical University (KEMU)", desc: "Lahore, Punjab - Oldest medical university with highest merit", link: "#universities", action: "modal:kemu", tags: ["kemu", "king edward", "lahore", "punjab", "mbbs"] },
  { type: "University", title: "University of Health Sciences (UHS)", desc: "Lahore, Punjab - Regulating body for Punjab medical admissions", link: "#universities", action: "modal:uhs", tags: ["uhs", "lahore", "punjab", "mbbs"] },

  { type: "Resource", title: "Sindh Board Biology XI & XII", desc: "Official intermediate textbooks for PMDC conceptual base", link: "#sindh-books", tags: ["sindh", "textbook", "stbb", "biology", "class xi", "class xii"] },
  { type: "Resource", title: "Sindh Board Chemistry XI & XII", desc: "Core textbook series covering physical and organic chemistry", link: "#sindh-books", tags: ["sindh", "chemistry", "textbook", "class xi", "class xii"] },
  { type: "Resource", title: "Sindh Board Physics XI & XII", desc: "Numerical guides and mechanics for intermediate students", link: "#sindh-books", tags: ["sindh", "physics", "textbook", "class xi", "class xii"] },

  { type: "Test", title: "30-Question Free Practice Quiz", desc: "Interactive timed exam simulation with instant subject analytics", link: "#quiz", tags: ["quiz", "test", "practice", "mcqs", "biology", "chemistry", "physics", "english"] },
  { type: "Pattern", title: "MDCAT Test Pattern & Passing Marks", desc: "200 MCQs, 210 minutes duration, 55% MBBS / 50% BDS criteria", link: "#test-pattern", tags: ["pattern", "pmdc", "marks", "duration", "negative marking", "syllabus"] }
];

// ==========================================================================
// 2. STATE MANAGEMENT (LocalStorage, Quiz State, Progress)
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
  TARGET_SCORE: "studymate_mdcat_target_score"
};

// Quiz active state
let currentQuestionIndex = 0;
let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
let quizTimerInterval = null;
let quizSecondsRemaining = 30 * 60; // 30 minutes = 1800 seconds
let quizStartTime = 0;
let quizEndTime = 0;
let quizSubmitted = false;

// ==========================================================================
// 3. INITIALIZATION & DOM READY
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProgressTracker();
  initCountUpObserver();
  initSearch();
  initUniversitiesFilter();
  initModals();
  initDailyStreak();
  initBackToTop();
  loadSavedProfile();
});

// ==========================================================================
// 4. NAVBAR & MOBILE DRAWER
// ==========================================================================

function initNavbar() {
  const header = document.getElementById("main-header");
  const hamburger = document.getElementById("hamburger-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-item");

  // Sticky header scroll class
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile hamburger toggle
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
}

// ==========================================================================
// 5. PROGRESS TRACKER & DASHBOARD
// ==========================================================================

function initProgressTracker() {
  // Load progress values from localStorage or initialize with defaults
  const bio = parseInt(localStorage.getItem(STORAGE_KEYS.BIO_PROG) || "35", 10);
  const chem = parseInt(localStorage.getItem(STORAGE_KEYS.CHEM_PROG) || "25", 10);
  const phy = parseInt(localStorage.getItem(STORAGE_KEYS.PHY_PROG) || "20", 10);
  const eng = parseInt(localStorage.getItem(STORAGE_KEYS.ENG_PROG) || "40", 10);

  updateProgressUI("biology", bio);
  updateProgressUI("chemistry", chem);
  updateProgressUI("physics", phy);
  updateProgressUI("english", eng);
  calculateOverallProgress();
}

function updateSubjectProgress(subject, increment = 15) {
  let key, totalCount, labelPrefix;
  if (subject === "biology") { key = STORAGE_KEYS.BIO_PROG; totalCount = 14; labelPrefix = "Chapters"; }
  else if (subject === "chemistry") { key = STORAGE_KEYS.CHEM_PROG; totalCount = 14; labelPrefix = "Chapters"; }
  else if (subject === "physics") { key = STORAGE_KEYS.PHY_PROG; totalCount = 14; labelPrefix = "Chapters"; }
  else if (subject === "english") { key = STORAGE_KEYS.ENG_PROG; totalCount = 8; labelPrefix = "Topics"; }

  let current = parseInt(localStorage.getItem(key) || "0", 10);
  let next = Math.min(100, current + increment);
  if (next >= 100 && current >= 100) {
    next = 0; // Reset for demonstration loop
    showToast(`Progress for ${subject.toUpperCase()} reset to 0%`);
  } else {
    showToast(`Updated ${subject.toUpperCase()} progress: ${next}%`);
  }

  localStorage.setItem(key, next.toString());
  updateProgressUI(subject, next);
  calculateOverallProgress();
}

function updateProgressUI(subject, pct) {
  const short = subject.substring(0, 4); // 'biol' -> 'bio', etc
  const prefix = subject === "biology" ? "bio" : subject === "chemistry" ? "chem" : subject === "physics" ? "phy" : "eng";
  const total = subject === "english" ? 8 : 14;
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
    const unit = subject === "english" ? "Topics" : "Chapters";
    completedTxt.textContent = `${completed} / ${total} ${unit} Completed`;
  }
}

function calculateOverallProgress() {
  const bio = parseInt(localStorage.getItem(STORAGE_KEYS.BIO_PROG) || "35", 10);
  const chem = parseInt(localStorage.getItem(STORAGE_KEYS.CHEM_PROG) || "25", 10);
  const phy = parseInt(localStorage.getItem(STORAGE_KEYS.PHY_PROG) || "20", 10);
  const eng = parseInt(localStorage.getItem(STORAGE_KEYS.ENG_PROG) || "40", 10);

  const overall = Math.round((bio + chem + phy + eng) / 4);
  const overallEl = document.getElementById("overall-progress-pct");
  if (overallEl) overallEl.textContent = `${overall}%`;
}

// ==========================================================================
// 6. ANIMATED COUNT-UP OBSERVER
// ==========================================================================

function initCountUpObserver() {
  const countElements = document.querySelectorAll(".count-up");
  if (!countElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
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
    // EaseOutQuad
    const easedProgress = progress * (2 - progress);
    const currentValue = Math.floor(easedProgress * (target - startValue) + startValue);
    element.textContent = currentValue.toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target.toString();
    }
  }
  
  window.requestAnimationFrame(step);
}

// ==========================================================================
// 7. GLOBAL SEARCH & FILTER
// ==========================================================================

function initSearch() {
  const searchBtn = document.getElementById("search-modal-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("global-search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const resultsContainer = document.getElementById("search-results-list");
  const quickTags = document.querySelectorAll(".quick-tag");

  if (!searchBtn || !searchOverlay || !searchInput) return;

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("open");
    searchOverlay.setAttribute("aria-hidden", "false");
    setTimeout(() => searchInput.focus(), 50);
  });

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("open");
      searchOverlay.setAttribute("aria-hidden", "true");
    }
  });

  // Escape key to close search
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("open")) {
      searchOverlay.classList.remove("open");
      searchOverlay.setAttribute("aria-hidden", "true");
    }
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    performSearch(query);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      performSearch("");
      searchInput.focus();
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener("click", () => {
      const query = tag.getAttribute("data-search");
      if (query) {
        searchInput.value = query;
        performSearch(query.toLowerCase());
      }
    });
  });

  function performSearch(query) {
    if (!resultsContainer) return;
    if (!query) {
      resultsContainer.innerHTML = `
        <div class="search-placeholder-hint">
          <p>Type to search across subjects, medical universities, books, and practice tests.</p>
          <div class="quick-tags">
            <span class="quick-tag" onclick="quickSearch('Biology')">🧬 Biology</span>
            <span class="quick-tag" onclick="quickSearch('Dow University')">🏫 DUHS Karachi</span>
            <span class="quick-tag" onclick="quickSearch('Aga Khan')">🏥 AKU</span>
            <span class="quick-tag" onclick="quickSearch('Sindh Board')">📘 Sindh Board</span>
            <span class="quick-tag" onclick="quickSearch('Quiz')">🧠 Quiz</span>
            <span class="quick-tag" onclick="quickSearch('Test Pattern')">📝 Exam Pattern</span>
          </div>
        </div>
      `;
      return;
    }

    const matches = SEARCH_DATABASE.filter(item => {
      const inTitle = item.title.toLowerCase().includes(query);
      const inDesc = item.desc.toLowerCase().includes(query);
      const inTags = item.tags.some(t => t.includes(query));
      return inTitle || inDesc || inTags;
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-placeholder-hint">
          <p>No MDCAT resources found matching "<strong>${escapeHtml(query)}</strong>".</p>
          <small>Try searching for Biology, Chemistry, Physics, DUHS, AKU, or Sindh Board.</small>
        </div>
      `;
      return;
    }

    let html = '';
    matches.forEach(item => {
      let clickAttr = '';
      if (item.action && item.action.startsWith("modal:")) {
        const uniKey = item.action.split(":")[1];
        clickAttr = `onclick="handleSearchModalClick('${uniKey}')"`;
      } else {
        clickAttr = `onclick="closeSearchOverlay()"`;
      }

      html += `
        <a href="${item.link}" class="search-res-item" ${clickAttr}>
          <div class="search-res-type">${item.type}</div>
          <div class="search-res-title">${item.title}</div>
          <div class="search-res-desc">${item.desc}</div>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
  }
}

window.quickSearch = function(text) {
  const searchInput = document.getElementById("global-search-input");
  if (searchInput) {
    searchInput.value = text;
    searchInput.dispatchEvent(new Event("input"));
  }
};

window.handleSearchModalClick = function(uniKey) {
  closeSearchOverlay();
  setTimeout(() => openUniModal(uniKey), 200);
};

window.closeSearchOverlay = function() {
  const searchOverlay = document.getElementById("search-overlay");
  if (searchOverlay) {
    searchOverlay.classList.remove("open");
    searchOverlay.setAttribute("aria-hidden", "true");
  }
};

// ==========================================================================
// 8. UNIVERSITIES FILTER & MODAL
// ==========================================================================

function initUniversitiesFilter() {
  const filterBtns = document.querySelectorAll(".uni-filter-btn");
  const uniCards = document.querySelectorAll(".uni-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      uniCards.forEach(card => {
        const region = card.getAttribute("data-region") || "";
        if (filter === "all" || region.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

window.openUniModal = function(uniId) {
  const data = UNIVERSITIES_DATA[uniId];
  if (!data) return;

  const modalBackdrop = document.getElementById("uni-modal-backdrop");
  const modalContent = document.getElementById("uni-modal-content");
  if (!modalBackdrop || !modalContent) return;

  let highlightsHtml = '';
  if (data.highlights) {
    highlightsHtml = `
      <div style="margin-bottom: 1.25rem;">
        <strong style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">Key Highlights</strong>
        <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-light); line-height: 1.5;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <h3>${data.name}</h3>
    <div class="uni-modal-location">${data.location}</div>
    <p class="uni-modal-body-desc">${data.meritNote}</p>

    <div class="uni-modal-details-grid">
      <div class="modal-detail-item">
        <strong>Institution Type</strong>
        <span>${data.type}</span>
      </div>
      <div class="modal-detail-item">
        <strong>Major Programs</strong>
        <span>${data.programs}</span>
      </div>
    </div>

    ${highlightsHtml}

    <div class="uni-modal-actions">
      <a href="${data.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>Official Website ↗</span>
      </a>
      <a href="${data.admissionUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <span>Admissions Page ↗</span>
      </a>
    </div>
  `;

  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");
};

function initModals() {
  const uniBackdrop = document.getElementById("uni-modal-backdrop");
  const uniClose = document.getElementById("uni-modal-close");

  const profileBackdrop = document.getElementById("profile-modal-backdrop");
  const profileBtn = document.getElementById("profile-modal-btn");
  const profileClose = document.getElementById("profile-modal-close");

  if (uniClose && uniBackdrop) {
    uniClose.addEventListener("click", () => {
      uniBackdrop.classList.remove("open");
      uniBackdrop.setAttribute("aria-hidden", "true");
    });
    uniBackdrop.addEventListener("click", (e) => {
      if (e.target === uniBackdrop) {
        uniBackdrop.classList.remove("open");
        uniBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (profileBtn && profileBackdrop && profileClose) {
    profileBtn.addEventListener("click", () => {
      profileBackdrop.classList.add("open");
      profileBackdrop.setAttribute("aria-hidden", "false");
      loadSavedProfile();
    });

    profileClose.addEventListener("click", () => {
      profileBackdrop.classList.remove("open");
      profileBackdrop.setAttribute("aria-hidden", "true");
    });

    profileBackdrop.addEventListener("click", (e) => {
      if (e.target === profileBackdrop) {
        profileBackdrop.classList.remove("open");
        profileBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }
}

// ==========================================================================
// 9. FREE MDCAT 30-QUESTION PRACTICE QUIZ
// ==========================================================================

window.startQuiz = function() {
  currentQuestionIndex = 0;
  userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  quizSecondsRemaining = 30 * 60; // 30 mins
  quizStartTime = Date.now();
  quizSubmitted = false;

  document.getElementById("quiz-start-screen").classList.add("hidden");
  document.getElementById("quiz-result-screen").classList.add("hidden");
  document.getElementById("quiz-active-screen").classList.remove("hidden");

  // Start Countdown Timer
  clearInterval(quizTimerInterval);
  updateTimerDisplay();
  quizTimerInterval = setInterval(() => {
    quizSecondsRemaining--;
    updateTimerDisplay();
    if (quizSecondsRemaining <= 0) {
      clearInterval(quizTimerInterval);
      showToast("Time's up! Submitting your exam.");
      submitQuizFinal();
    }
  }, 1000);

  renderCurrentQuestion();
};

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("quiz-timer-display");
  const timerBox = document.getElementById("quiz-timer-box");
  if (!timerDisplay || !timerBox) return;

  const minutes = Math.floor(quizSecondsRemaining / 60);
  const seconds = quizSecondsRemaining % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (quizSecondsRemaining < 120) { // < 2 min
    timerBox.className = "quiz-timer-box quiz-timer-danger";
  } else if (quizSecondsRemaining < 300) { // < 5 min
    timerBox.className = "quiz-timer-box quiz-timer-warning";
  } else {
    timerBox.className = "quiz-timer-box";
  }
}

function renderCurrentQuestion() {
  const q = QUIZ_QUESTIONS[currentQuestionIndex];
  if (!q) return;

  // Header indicators
  const qIndexText = document.getElementById("quiz-q-index-text");
  const qSubjIndicator = document.getElementById("quiz-subject-indicator");
  const qText = document.getElementById("quiz-question-text");
  const optionsBox = document.getElementById("quiz-options-container");
  const progFill = document.getElementById("quiz-progress-fill");
  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");

  if (qIndexText) qIndexText.textContent = `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}`;
  if (qSubjIndicator) {
    qSubjIndicator.textContent = q.subject;
    // Set color badge class
    if (q.subject === "Biology") qSubjIndicator.className = "quiz-subject-indicator bio-bg";
    else if (q.subject === "Chemistry") qSubjIndicator.className = "quiz-subject-indicator chem-bg";
    else if (q.subject === "Physics") qSubjIndicator.className = "quiz-subject-indicator phy-bg";
    else qSubjIndicator.className = "quiz-subject-indicator eng-bg";
  }

  if (qText) qText.textContent = q.question;

  // Render 4 Options
  if (optionsBox) {
    let optionsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const isSelected = userAnswers[currentQuestionIndex] === idx;
      optionsHtml += `
        <div class="option-item ${isSelected ? 'selected' : ''}" onclick="selectOption(${idx})">
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-text">${opt}</div>
        </div>
      `;
    });
    optionsBox.innerHTML = optionsHtml;
  }

  // Progress bar
  if (progFill) {
    const pct = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    progFill.style.width = `${pct}%`;
  }

  // Nav buttons
  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
  if (nextBtn) {
    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
      nextBtn.textContent = "Finish & Review";
    } else {
      nextBtn.textContent = "Next →";
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
  
  let msg = `You have answered ${answeredCount} of 30 questions.`;
  if (unanswered > 0) {
    msg += ` (${unanswered} questions are unanswered).`;
  }
  msg += ` Do you want to submit your MDCAT test now?`;

  if (confirm(msg)) {
    submitQuizFinal();
  }
};

function submitQuizFinal() {
  clearInterval(quizTimerInterval);
  quizEndTime = Date.now();
  quizSubmitted = true;

  // Calculate results
  let totalCorrect = 0;
  let bioScore = 0, bioTotal = 0;
  let chemScore = 0, chemTotal = 0;
  let phyScore = 0, phyTotal = 0;
  let engScore = 0, engTotal = 0;

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.answer;

    if (q.subject === "Biology") { bioTotal++; if (isCorrect) bioScore++; }
    else if (q.subject === "Chemistry") { chemTotal++; if (isCorrect) chemScore++; }
    else if (q.subject === "Physics") { phyTotal++; if (isCorrect) phyScore++; }
    else if (q.subject === "English") { engTotal++; if (isCorrect) engScore++; }

    if (isCorrect) totalCorrect++;
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);
  const timeUsedSeconds = Math.min(1800, Math.floor((quizEndTime - quizStartTime) / 1000));
  const timeMin = Math.floor(timeUsedSeconds / 60);
  const timeSec = timeUsedSeconds % 60;

  // Switch screens
  document.getElementById("quiz-active-screen").classList.add("hidden");
  document.getElementById("quiz-result-screen").classList.remove("hidden");

  // Populate Result elements
  document.getElementById("result-score-val").textContent = totalCorrect.toString();
  document.getElementById("result-pct-tag").textContent = `${percentage}%`;
  document.getElementById("result-accuracy-val").textContent = `${percentage}%`;
  document.getElementById("result-breakdown-sub").textContent = `${totalCorrect} Correct, ${totalQuestions - totalCorrect} Incorrect`;
  document.getElementById("result-time-val").textContent = `${timeMin}m ${timeSec}s`;

  // Motivational message
  const motText = document.getElementById("result-motivation-text");
  if (motText) {
    if (percentage >= 85) {
      motText.textContent = "🏆 Outstanding Performance! You are tracking in the top medical merit tier. Keep this consistency!";
    } else if (percentage >= 70) {
      motText.textContent = "⭐ Strong Foundation! Review missed concepts in the detailed review below to reach 90%+.";
    } else if (percentage >= 50) {
      motText.textContent = "📈 Good Practice Attempt! Focus on formulas and high-yield chapters to boost your accuracy.";
    } else {
      motText.textContent = "💪 Keep Going! Review the textbook concepts and retake the test to master these key questions.";
    }
  }

  // Subject Bars
  document.getElementById("res-bio-score").textContent = `${bioScore} / ${bioTotal}`;
  document.getElementById("res-bio-bar").style.width = `${(bioScore / bioTotal) * 100}%`;

  document.getElementById("res-chem-score").textContent = `${chemScore} / ${chemTotal}`;
  document.getElementById("res-chem-bar").style.width = `${(chemScore / chemTotal) * 100}%`;

  document.getElementById("res-phy-score").textContent = `${phyScore} / ${phyTotal}`;
  document.getElementById("res-phy-bar").style.width = `${(phyScore / phyTotal) * 100}%`;

  document.getElementById("res-eng-score").textContent = `${engScore} / ${engTotal}`;
  document.getElementById("res-eng-bar").style.width = `${(engScore / engTotal) * 100}%`;

  // Render Detailed Review List
  renderDetailedReview();

  // Save best score to localStorage
  const prevBest = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || "0", 10);
  if (totalCorrect > prevBest) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_BEST_SCORE, totalCorrect.toString());
  }
  const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS) || "0", 10) + 1;
  localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts.toString());

  showToast(`Test completed! Scored ${totalCorrect}/30 (${percentage}%)`);
}

function renderDetailedReview() {
  const reviewList = document.getElementById("review-items-list");
  if (!reviewList) return;

  let html = '';
  const letters = ['A', 'B', 'C', 'D'];

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.answer;
    const isUnanswered = userChoice === null;

    let itemClass = isCorrect ? 'correct-item' : (isUnanswered ? 'unanswered-item' : 'incorrect-item');
    let statusBadge = isCorrect ? 
      `<span class="rev-status-tag rev-correct">✓ Correct</span>` : 
      (isUnanswered ? `<span class="rev-status-tag rev-skipped">⚠️ Unanswered</span>` : `<span class="rev-status-tag rev-wrong">✕ Incorrect</span>`);

    let userText = isUnanswered ? 'None Selected' : `${letters[userChoice]}) ${q.options[userChoice]}`;
    let correctText = `${letters[q.answer]}) ${q.options[q.answer]}`;

    html += `
      <div class="review-q-item ${itemClass}">
        <div class="rev-q-top">
          <span class="rev-q-num">Q${idx + 1} • ${q.subject}</span>
          ${statusBadge}
        </div>
        <div class="rev-question-text">${q.question}</div>
        <div class="rev-answers-box">
          <div class="rev-user-ans"><strong>Your Choice:</strong> ${escapeHtml(userText)}</div>
          <div class="rev-correct-ans"><strong>Correct Answer:</strong> ${escapeHtml(correctText)}</div>
        </div>
        <div class="rev-explanation">
          <strong>Key Concept:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  reviewList.innerHTML = html;
}

window.toggleDetailedReview = function() {
  const reviewSection = document.getElementById("detailed-review-section");
  const reviewBtnText = document.getElementById("review-btn-text");
  if (!reviewSection) return;

  const isHidden = reviewSection.classList.toggle("hidden");
  if (reviewBtnText) {
    reviewBtnText.textContent = isHidden ? "📋 View Detailed Question Review" : "▲ Hide Detailed Question Review";
  }
};

window.retryQuiz = function() {
  document.getElementById("quiz-result-screen").classList.add("hidden");
  document.getElementById("quiz-start-screen").classList.remove("hidden");
};

// ==========================================================================
// 10. DAILY PRACTICE & STREAK
// ==========================================================================

function initDailyStreak() {
  const todayStr = new Date().toISOString().split('T')[0];
  const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || "1", 10);

  if (lastActive !== todayStr) {
    // Check if consecutive day
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

  // Update UI badges
  const navStreak = document.getElementById("nav-streak-count");
  const dailyStreak = document.getElementById("daily-streak-badge");
  const dateDisplay = document.getElementById("daily-date-display");

  if (navStreak) navStreak.textContent = `🔥 ${streak} Day Streak`;
  if (dailyStreak) dailyStreak.textContent = `${streak} Day Streak Active`;
  if (dateDisplay) {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString("en-US", options);
  }
}

window.startDailySession = function() {
  showToast("Starting 10-question daily practice session...");
  // Smooth scroll to quiz
  const quizSection = document.getElementById("quiz");
  if (quizSection) {
    quizSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      startQuiz();
    }, 600);
  }
};

// ==========================================================================
// 11. PROFILE & TARGET GOALS MANAGEMENT
// ==========================================================================

function loadSavedProfile() {
  const targetUni = localStorage.getItem(STORAGE_KEYS.TARGET_UNI) || "duhs";
  const targetScore = localStorage.getItem(STORAGE_KEYS.TARGET_SCORE) || "185";
  const attempts = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS) || "0";
  const bestScore = localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || "0";
  const streak = localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || "1";

  const uniSelect = document.getElementById("target-uni-select");
  const scoreInput = document.getElementById("target-score-input");
  const pQuizTaken = document.getElementById("p-quiz-taken");
  const pBestScore = document.getElementById("p-best-score");
  const pStreakNum = document.getElementById("p-streak-num");

  if (uniSelect) uniSelect.value = targetUni;
  if (scoreInput) scoreInput.value = targetScore;
  if (pQuizTaken) pQuizTaken.textContent = attempts;
  if (pBestScore) pBestScore.textContent = `${bestScore} / 30`;
  if (pStreakNum) pStreakNum.textContent = streak;
}

window.saveProfileGoals = function() {
  const uniSelect = document.getElementById("target-uni-select");
  const scoreInput = document.getElementById("target-score-input");

  if (uniSelect) localStorage.setItem(STORAGE_KEYS.TARGET_UNI, uniSelect.value);
  if (scoreInput) localStorage.setItem(STORAGE_KEYS.TARGET_SCORE, scoreInput.value);

  showToast("Study target goals successfully saved!");

  const profileBackdrop = document.getElementById("profile-modal-backdrop");
  if (profileBackdrop) {
    profileBackdrop.classList.remove("open");
    profileBackdrop.setAttribute("aria-hidden", "true");
  }
};

// ==========================================================================
// 12. BACK TO TOP BUTTON & UTILITIES
// ==========================================================================

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `<span>✨</span> <div>${escapeHtml(message)}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
