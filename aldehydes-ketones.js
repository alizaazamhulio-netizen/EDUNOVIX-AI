/**
 * ALDEHYDES & KETONES — MDCAT REACTION LAB ENGINE
 * Pure Vanilla JavaScript implementation with LocalStorage persistence,
 * interactive molecular simulators, 25 Flashcards & 25 MCQs.
 */

// ==========================================================================
// 1. DATASETS & STORAGE
// ==========================================================================

const STORAGE_KEYS = {
  BOOKMARKS: 'mdcat_carbonyl_bookmarks',
  PROGRESS: 'mdcat_carbonyl_progress',
  FLASHCARD_MASTERY: 'mdcat_carbonyl_flashcards_mastered',
  QUIZ_ANSWERS: 'mdcat_carbonyl_quiz_state',
  CHAPTER_COMPLETED: 'mdcat_carbonyl_completed'
};

// 25 Original High-Yield Flashcards for MDCAT
const FLASHCARDS_DATA = [
  {
    id: 1,
    category: "Functional Group",
    question: "What is the general structural formula of an Aldehyde?",
    answer: "R—CHO (or Ar—CHO). The carbonyl carbon (C=O) is bonded to at least one hydrogen atom and one alkyl/aryl group (or two hydrogens in methanal)."
  },
  {
    id: 2,
    category: "Functional Group",
    question: "What is the general structural formula of a Ketone?",
    answer: "R—CO—R' (or Ar—CO—R'). The carbonyl carbon (C=O) is bonded to two alkyl or aryl carbon groups and has NO hydrogen attached directly to it."
  },
  {
    id: 3,
    category: "Bonding & Polarity",
    question: "Why is the Carbonyl carbon electrophilic (electron-deficient)?",
    answer: "Oxygen is significantly more electronegative than carbon (3.44 vs 2.55). It polarizes the C=O double bond (Cδ+=Oδ-), making carbon prone to nucleophilic attack."
  },
  {
    id: 4,
    category: "Preparation",
    question: "Which product is formed upon controlled oxidation of a Primary (1°) Alcohol?",
    answer: "An ALDEHYDE (RCH2OH + [O] → RCHO + H2O). Further oxidation under vigorous conditions yields a Carboxylic Acid (RCOOH)."
  },
  {
    id: 5,
    category: "Preparation",
    question: "Which product is formed upon oxidation of a Secondary (2°) Alcohol?",
    answer: "A KETONE (R2CHOH + [O] → R2CO + H2O). Ketones resist further oxidation under mild acidic conditions."
  },
  {
    id: 6,
    category: "Oxidation",
    question: "Why do Aldehydes oxidize much more easily than Ketones?",
    answer: "Aldehydes possess a readily oxidizable C—H bond attached directly to the carbonyl carbon. Ketones lack this C—H bond and require drastic C—C bond cleavage to oxidize."
  },
  {
    id: 7,
    category: "Diagnostic Tests",
    question: "What visual observation indicates a positive Tollens' Test?",
    answer: "Formation of a shining 'Silver Mirror' (or black Ag precipitate) on the inner wall of the test tube due to reduction of [Ag(NH3)2]+ to metallic Ag0 by aldehydes."
  },
  {
    id: 8,
    category: "Diagnostic Tests",
    question: "What is the composition and positive result of Fehling's Test?",
    answer: "Fehling's A (aqueous CuSO4) + Fehling's B (alkaline sodium potassium tartrate). Aliphatic aldehydes reduce blue Cu2+ complex to a dense BRICK-RED precipitate of Cu2O."
  },
  {
    id: 9,
    category: "Diagnostic Tests",
    question: "What does Brady's reagent (2,4-DNP) test for?",
    answer: "The presence of a CARBONYL group (both Aldehydes AND Ketones give yellow/orange/red crystalline hydrazone precipitates). It does NOT distinguish aldehydes from ketones."
  },
  {
    id: 10,
    category: "Reduction",
    question: "What is the reduction product of an Aldehyde using NaBH4 or LiAlH4?",
    answer: "A PRIMARY (1°) ALCOHOL (RCHO + 2[H] → RCH2OH)."
  },
  {
    id: 11,
    category: "Reduction",
    question: "What is the reduction product of a Ketone using NaBH4 or LiAlH4?",
    answer: "A SECONDARY (2°) ALCOHOL (R2CO + 2[H] → R2CHOH)."
  },
  {
    id: 12,
    category: "Mechanism",
    question: "What is the characteristic reaction type of Carbonyl compounds?",
    answer: "NUCLEOPHILIC ADDITION (AN). A nucleophile attacks the electrophilic carbonyl carbon, breaking the π-bond to form a tetrahedral alkoxide intermediate."
  },
  {
    id: 13,
    category: "Nucleophilic Addition",
    question: "Why is a base catalyst required for the addition of HCN to carbonyls?",
    answer: "HCN is a weak acid and dissociates poorly. A base (e.g. OH-) removes H+ to generate the strong nucleophile cyanide ion (:CN-), which attacks the carbonyl carbon."
  },
  {
    id: 14,
    category: "Cyanohydrin",
    question: "What functional groups are present in a Cyanohydrin?",
    answer: "A hydroxyl group (—OH) and a nitrile group (—C≡N) attached to the EXACT SAME carbon atom [R2C(OH)CN]."
  },
  {
    id: 15,
    category: "Reactivity Order",
    question: "Arrange in decreasing order of reactivity towards nucleophiles: HCHO, CH3CHO, CH3COCH3.",
    answer: "HCHO > CH3CHO > CH3COCH3. Formaldehyde is least sterically hindered and has no electron-donating (+I) alkyl groups reducing the δ+ charge on carbon."
  },
  {
    id: 16,
    category: "Nomenclature",
    question: "What are the IUPAC suffix rules for Aldehydes and Ketones?",
    answer: "Aldehydes: '-al' (carbonyl carbon is always C-1). Ketones: '-one' (the position of the carbonyl carbon must be specified by number, e.g. pentan-2-one)."
  },
  {
    id: 17,
    category: "Physical Properties",
    question: "Why do Aldehydes & Ketones have lower boiling points than comparable Alcohols?",
    answer: "Carbonyl compounds cannot form intermolecular hydrogen bonds with each other (they lack an O—H donor), whereas alcohols exhibit strong intermolecular H-bonding."
  },
  {
    id: 18,
    category: "Physical Properties",
    question: "Why are lower aldehydes and ketones (e.g. methanal, acetone) water-soluble?",
    answer: "The lone pairs on the carbonyl oxygen can form hydrogen bonds with the partially positive hydrogen atoms of water molecules."
  },
  {
    id: 19,
    category: "Nomenclature",
    question: "What is the IUPAC name and formula of Formaldehyde and Acetone?",
    answer: "Formaldehyde = Methanal (HCHO); Acetone = Propanone (CH3COCH3)."
  },
  {
    id: 20,
    category: "Oxidation Agents",
    question: "What reagent is commonly used to oxidize primary alcohols selectively to aldehydes without over-oxidation?",
    answer: "Pyridinium Chlorochromate (PCC) in anhydrous dichloromethane (CH2Cl2), or controlled acidified K2Cr2O7 with immediate distillation."
  },
  {
    id: 21,
    category: "Aromatic Tests",
    question: "Does Benzaldehyde (C6H5CHO) reduce Fehling's solution?",
    answer: "Generally NO. Aromatic aldehydes reduce Tollens' reagent but fail to reduce Fehling's solution due to resonance stabilization of the carbonyl group."
  },
  {
    id: 22,
    category: "Derivatives",
    question: "What derivative is formed when an aldehyde reacts with Hydroxylamine (NH2OH)?",
    answer: "An OXIME (R—CH=N—OH + H2O) via nucleophilic addition followed by elimination of water."
  },
  {
    id: 23,
    category: "Derivatives",
    question: "What derivative is formed when a ketone reacts with Hydrazine (NH2NH2)?",
    answer: "A HYDRAZONE (R2C=N—NH2 + H2O)."
  },
  {
    id: 24,
    category: "Popoff's Rule",
    question: "What is Popoff's Rule in vigorous ketone oxidation?",
    answer: "During vigorous oxidation of unsymmetrical ketones, the carbonyl group predominantly remains with the smaller alkyl group upon C—C cleavage."
  },
  {
    id: 25,
    category: "Cyanohydrin Hydrolysis",
    question: "What is formed upon acidic hydrolysis of a Cyanohydrin [R2C(OH)CN]?",
    answer: "An α-Hydroxy Carboxylic Acid [R2C(OH)COOH] + NH4+. (e.g., Lactic acid from acetaldehyde cyanohydrin)."
  }
];

// 25 Original MDCAT Multiple Choice Questions with Explanations
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following functional groups contains a carbonyl carbon bonded to at least one hydrogen atom?",
    options: ["Ketone", "Aldehyde", "Carboxylic acid", "Ester"],
    correct: 1,
    explanation: "Aldehydes have the general formula R—CHO where the carbonyl carbon is directly bonded to at least one hydrogen atom."
  },
  {
    id: 2,
    question: "What is the hybridization and bond angle around the carbonyl carbon in methanal (HCHO)?",
    options: ["sp3, 109.5°", "sp2, ~120°", "sp, 180°", "dsp2, 90°"],
    correct: 1,
    explanation: "The carbonyl carbon is bonded to three atoms via three σ-bonds and one π-bond (trigonal planar geometry, sp2 hybridization, ~120° bond angle)."
  },
  {
    id: 3,
    question: "Oxidation of propan-2-ol with acidified potassium dichromate (K2Cr2O7/H2SO4) yields:",
    options: ["Propanal", "Propanone", "Propanoic acid", "Ethanoic acid"],
    correct: 1,
    explanation: "Propan-2-ol is a secondary (2°) alcohol. Controlled oxidation of secondary alcohols yields ketones (propanone/acetone)."
  },
  {
    id: 4,
    question: "Which of the following compounds gives a positive Tollens' silver mirror test?",
    options: ["CH3COCH3 (Propanone)", "CH3CH2CHO (Propanal)", "CH3CH2OCH2CH3 (Diethyl ether)", "CH3CH2COOH (Propanoic acid)"],
    correct: 1,
    explanation: "Tollens' reagent ([Ag(NH3)2]+) is reduced to metallic silver by aldehydes like propanal. Ketones, ethers, and carboxylic acids give a negative test."
  },
  {
    id: 5,
    question: "The dense precipitate formed in a positive Fehling's test with ethanal is composed of:",
    options: ["CuO (Black)", "Cu2O (Brick-Red)", "Cu(OH)2 (Blue)", "Metallic Cu (Shiny)"],
    correct: 1,
    explanation: "Aliphatic aldehydes reduce Cu2+ ions in alkaline tartrate solution to cuprous oxide (Cu2O), which precipitates as a brick-red solid."
  },
  {
    id: 6,
    question: "Brady's reagent is chemically known as:",
    options: ["2,4-Dinitrophenylhydrazine", "Ammoniacal silver nitrate", "Alkaline copper tartrate", "Acidified potassium permanganate"],
    correct: 0,
    explanation: "Brady's reagent is 2,4-dinitrophenylhydrazine (2,4-DNP), used to detect both aldehydes and ketones by forming orange/yellow hydrazones."
  },
  {
    id: 7,
    question: "When propanone is reduced with sodium borohydride (NaBH4 in ethanol), the organic product is:",
    options: ["Propan-1-ol", "Propan-2-ol", "Propanoic acid", "Propane"],
    correct: 1,
    explanation: "Reduction of a ketone with hydride donors (NaBH4 or LiAlH4) yields a secondary alcohol. Propanone is reduced to propan-2-ol."
  },
  {
    id: 8,
    question: "Which of the following carbonyl compounds is the MOST reactive towards nucleophilic addition?",
    options: ["Methanal (HCHO)", "Ethanal (CH3CHO)", "Propan-2-one (CH3COCH3)", "Pentan-3-one (CH3CH2COCH2CH3)"],
    correct: 0,
    explanation: "Methanal has no electron-donating alkyl (+I) groups and zero steric hindrance around the carbonyl carbon, making it the most reactive."
  },
  {
    id: 9,
    question: "The reaction between ethanal and hydrogen cyanide (HCN) in the presence of base yields:",
    options: ["Acetaldehyde oxime", "Acetaldehyde cyanohydrin", "Acetonitrile", "Ethyl cyanide"],
    correct: 1,
    explanation: "Ethanal undergoes nucleophilic addition with HCN in basic medium to form 2-hydroxypropanenitrile (acetaldehyde cyanohydrin)."
  },
  {
    id: 10,
    question: "Which characteristic determines that aldehydes have lower boiling points than isomeric alcohols of similar molecular weight?",
    options: [
      "Aldehydes cannot act as hydrogen bond donors to each other",
      "Aldehydes are completely non-polar",
      "Alcohols have weaker London dispersion forces",
      "Aldehydes have linear geometries that hinder packing"
    ],
    correct: 0,
    explanation: "Aldehydes lack an O—H bond and therefore cannot form intermolecular hydrogen bonds with themselves, unlike alcohols which strongly H-bond."
  },
  {
    id: 11,
    question: "What is the correct IUPAC name for CH3—CH2—CO—CH2—CH3?",
    options: ["Pentan-2-one", "Pentan-3-one", "Diethyl ketone", "Pentanal"],
    correct: 1,
    explanation: "The 5-carbon continuous chain has the carbonyl group at carbon 3 from either direction, giving the IUPAC name Pentan-3-one."
  },
  {
    id: 12,
    question: "Acidic hydrolysis of ethanal cyanohydrin [CH3CH(OH)CN] produces:",
    options: ["Ethanoic acid", "Lactic acid (2-hydroxypropanoic acid)", "Pyruvic acid", "Alanine"],
    correct: 1,
    explanation: "Hydrolysis of the nitrile group (—CN) in acetaldehyde cyanohydrin converts it into a carboxyl group (—COOH), producing 2-hydroxypropanoic acid (lactic acid)."
  },
  {
    id: 13,
    question: "Which of the following compounds gives a positive 2,4-DNP test but a NEGATIVE Tollens' test?",
    options: ["Methanal", "Ethanal", "Acetone (Propanone)", "Ethanol"],
    correct: 2,
    explanation: "Acetone is a ketone; it gives a positive test with 2,4-DNP (forms 2,4-dinitrophenylhydrazone) but does not reduce Tollens' reagent."
  },
  {
    id: 14,
    question: "The role of base in the addition of HCN to an aldehyde is to:",
    options: [
      "Protonate the carbonyl oxygen",
      "Generate the reactive nucleophile :CN- by deprotonating HCN",
      "Stabilize the cyanohydrin product",
      "Oxidize the aldehyde to a carboxylic acid"
    ],
    correct: 1,
    explanation: "HCN is weakly ionized. Trace base (OH-) pulls a proton from HCN (HCN + OH- → :CN- + H2O), providing the nucleophile :CN- for fast attack."
  },
  {
    id: 15,
    question: "Controlled oxidation of ethanol using Pyridinium Chlorochromate (PCC) produces:",
    options: ["Ethanoic acid", "Ethanal", "Methanol", "Ethyl ethanoate"],
    correct: 1,
    explanation: "PCC in anhydrous CH2Cl2 is a mild oxidizing agent that selectively converts primary alcohols (ethanol) to aldehydes (ethanal) without over-oxidation."
  },
  {
    id: 16,
    question: "Which of the following pairs represents functional group isomers?",
    options: [
      "Ethanal and Propanone",
      "Propanal and Propanone",
      "Propan-1-ol and Propan-2-ol",
      "Methanal and Methanol"
    ],
    correct: 1,
    explanation: "Propanal (CH3CH2CHO) and Propanone (CH3COCH3) both have the same molecular formula (C3H6O) but different functional groups (aldehyde vs ketone)."
  },
  {
    id: 17,
    question: "What is the initial intermediate formed during nucleophilic addition of Nu- to a carbonyl group?",
    options: ["Carbocation", "Tetrahedral alkoxide anion", "Free radical", "Planar enolate"],
    correct: 1,
    explanation: "Attack of Nu- on the sp2 carbonyl carbon converts the planar geometry into an sp3 tetrahedral alkoxide anion intermediate (R2C(Nu)—O-)."
  },
  {
    id: 18,
    question: "Which of the following statements regarding water solubility of aldehydes is TRUE?",
    options: [
      "All aldehydes are completely insoluble in water",
      "Formaldehyde and acetaldehyde are miscible in water due to H-bonding with water",
      "Solubility increases as the hydrophobic alkyl chain length increases",
      "Ketones are ionic compounds in aqueous solution"
    ],
    correct: 1,
    explanation: "Lower aldehydes (HCHO, CH3CHO) form strong intermolecular H-bonds between water hydrogens and carbonyl oxygens, making them highly water-soluble."
  },
  {
    id: 19,
    question: "Reaction of an aldehyde with hydroxylamine (NH2OH) yields a crystalline compound known as:",
    options: ["Hydrazone", "Oxime", "Semicarbazone", "Imine"],
    correct: 1,
    explanation: "Aldehydes and ketones condense with hydroxylamine (NH2OH) with elimination of water to form oximes (R—CH=N—OH)."
  },
  {
    id: 20,
    question: "Why is Tollens' reagent prepared fresh before every laboratory test?",
    options: [
      "It decomposes into explosive silver fulminate/nitride upon prolonged standing",
      "It loses its basicity immediately",
      "Silver ions get reduced by atmospheric nitrogen",
      "It precipitates silver chloride upon contact with glass"
    ],
    correct: 0,
    explanation: "Aged ammoniacal silver nitrate solutions can form dangerous, shock-sensitive silver fulminate and silver nitride precipitates, so it is freshly prepared."
  },
  {
    id: 21,
    question: "Which of the following compounds will NOT react with Fehling's solution under standard test conditions?",
    options: ["Methanal", "Ethanal", "Benzaldehyde", "Propanal"],
    correct: 2,
    explanation: "Benzaldehyde (aromatic aldehyde) does not reduce Fehling's solution due to electron donation from the phenyl ring into the carbonyl system."
  },
  {
    id: 22,
    question: "Vigorous oxidation of butan-2-one with concentrated HNO3 primarily yields a mixture of:",
    options: ["Ethanoic acid and Propanoic acid", "Ethanoic acid only (2 moles)", "Methanoic acid and Butanoic acid", "Carbon dioxide and water only"],
    correct: 1,
    explanation: "According to Popoff's rule, cleavage of butan-2-one (CH3—CO—CH2CH3) occurs such that the carbonyl group stays with the smaller methyl group, yielding mainly ethanoic acid."
  },
  {
    id: 23,
    question: "Reduction of an aldehyde to an alkane using Zn-Hg and concentrated HCl is called:",
    options: ["Wolff-Kishner reduction", "Clemmensen reduction", "Rosenmund reduction", "Birch reduction"],
    correct: 1,
    explanation: "The Clemmensen reduction uses zinc amalgam (Zn-Hg) in concentrated hydrochloric acid to reduce aldehydes and ketones directly to alkanes (—C=O → —CH2—)."
  },
  {
    id: 24,
    question: "The IUPAC name of (CH3)2CH—CHO is:",
    options: ["2-Methylpropanal", "Isobutanal", "Butan-2-al", "2-Methylpropan-1-one"],
    correct: 0,
    explanation: "The longest carbon chain containing the —CHO group has 3 carbons (propanal) with a methyl substituent at carbon 2: 2-Methylpropanal."
  },
  {
    id: 25,
    question: "Which reagent is capable of reducing the carbonyl group in an aldehyde without affecting carbon-carbon double bonds (C=C)?",
    options: ["H2 / Ni (high pressure)", "NaBH4 in ethanol", "KMnO4 / H2SO4", "Zn / HCl"],
    correct: 1,
    explanation: "NaBH4 is a selective nucleophilic hydride donor that reduces carbonyl C=O groups readily without reducing isolated non-conjugated C=C double bonds."
  }
];

// Interactive Molecule Identifier Pool
const IDENTIFIER_MOLECULES = [
  { formula: "CH₃CHO", name: "Ethanal (Acetaldehyde)", type: "aldehyde", reason: "Carbonyl carbon is bonded to 1 methyl group and 1 hydrogen atom (R—CHO)." },
  { formula: "CH₃COCH₃", name: "Propanone (Acetone)", type: "ketone", reason: "Carbonyl carbon is bonded to two methyl groups (R—CO—R')." },
  { formula: "HCHO", name: "Methanal (Formaldehyde)", type: "aldehyde", reason: "Carbonyl carbon is bonded to two hydrogen atoms (H—CHO)." },
  { formula: "CH₃CH₂CHO", name: "Propanal", type: "aldehyde", reason: "Terminal carbonyl carbon is attached to a hydrogen atom (R—CHO)." },
  { formula: "CH₃COCH₂CH₃", name: "Butan-2-one", type: "ketone", reason: "Carbonyl carbon is flanked by a methyl and an ethyl group (R—CO—R')." },
  { formula: "C₆H₅CHO", name: "Benzaldehyde", type: "aldehyde", reason: "Carbonyl carbon is directly attached to a phenyl ring and a hydrogen atom." },
  { formula: "C₆H₅COCH₃", name: "Acetophenone", type: "ketone", reason: "Carbonyl carbon is flanked by a phenyl ring and a methyl group." },
  { formula: "(CH₃)₂CHCHO", name: "2-Methylpropanal", type: "aldehyde", reason: "Contains a terminal —CHO group bonded to an isopropyl group." },
  { formula: "CH₃CH₂COCH₂CH₃", name: "Pentan-3-one", type: "ketone", reason: "Carbonyl carbon is symmetrical and bonded to two ethyl groups." },
  { formula: "CH₃(CH₂)₃CHO", name: "Pentanal", type: "aldehyde", reason: "Terminal —CHO functional group attached to a butyl chain." }
];

// Interactive Nomenclature Quiz Questions
const NOMENCLATURE_QUESTIONS = [
  { formula: "HCHO", options: ["Methanone", "Methanal", "Methanol", "Methanoic acid"], correct: 1, explanation: "One carbon aldehyde receives suffix '-al' → Methanal (Formaldehyde)." },
  { formula: "CH₃CHO", options: ["Ethanone", "Ethanal", "Ethanol", "Ethanoic acid"], correct: 1, explanation: "Two carbon aldehyde receives suffix '-al' → Ethanal (Acetaldehyde)." },
  { formula: "CH₃COCH₃", options: ["Propanal", "Propan-2-one", "Propan-1-one", "Propanol"], correct: 1, explanation: "Three carbon ketone with carbonyl at C-2 receives suffix '-one' → Propanone (Propan-2-one)." },
  { formula: "CH₃CH₂CHO", options: ["Propanal", "Propanone", "Propanoic acid", "Propan-2-al"], correct: 0, explanation: "Three carbon aldehyde is Propanal; aldehyde carbon is automatically carbon-1." },
  { formula: "CH₃COCH₂CH₃", options: ["Butanal", "Butan-2-one", "Butan-1-one", "Butanoic acid"], correct: 1, explanation: "Four carbon ketone with carbonyl at C-2 is Butan-2-one (ethyl methyl ketone)." },
  { formula: "CH₃CH₂CH₂CHO", options: ["Butanal", "Butan-2-one", "Butanol", "Butanoic acid"], correct: 0, explanation: "Four carbon unbranched aldehyde is Butanal (butyraldehyde)." }
];

// Master Reaction Map Nodes & Pathways Data
const REACTION_MAP_DATA = {
  "p-alc-ald": {
    title: "Primary Alcohol → Aldehyde",
    reactants: "RCH2OH (Primary Alcohol) + [O]",
    reagents: "Acidified K2Cr2O7 or PCC in CH2Cl2",
    conditions: "Mild oxidation / Distill immediately to prevent carboxylic acid over-oxidation",
    products: "RCHO (Aldehyde) + H2O",
    type: "Controlled Oxidation",
    tip: "MDCAT Trap: Using strong acidified KMnO4 without distillation over-oxidizes aldehydes to carboxylic acids! PCC stops strictly at the aldehyde stage."
  },
  "ald-acid": {
    title: "Aldehyde → Carboxylic Acid",
    reactants: "RCHO (Aldehyde) + [O]",
    reagents: "Acidified K2Cr2O7 / KMnO4 / Tollens / Fehling",
    conditions: "Warm, aqueous acidic or alkaline oxidizing conditions",
    products: "RCOOH (Carboxylic Acid)",
    type: "Oxidation",
    tip: "Aldehydes oxidize with great ease because of the labile C—H bond attached to the carbonyl carbon."
  },
  "s-alc-ket": {
    title: "Secondary Alcohol → Ketone",
    reactants: "R2CHOH (Secondary Alcohol) + [O]",
    reagents: "Acidified K2Cr2O7 / H2SO4",
    conditions: "Reflux with dichromate (Orange Cr2O7 2- turns Green Cr 3+)",
    products: "R2CO (Ketone) + H2O",
    type: "Oxidation",
    tip: "Ketones resist further oxidation under these standard conditions because they have no C—H bond on the carbonyl carbon."
  },
  "ald-red": {
    title: "Aldehyde Reduction → Primary Alcohol",
    reactants: "RCHO (Aldehyde) + 2[H]",
    reagents: "NaBH4 in ethanol / LiAlH4 in dry ether / H2 with Ni catalyst",
    conditions: "Room temperature hydride transfer followed by aqueous workup",
    products: "RCH2OH (Primary 1° Alcohol)",
    type: "Nucleophilic Hydride Reduction",
    tip: "NaBH4 is milder and selective; it reduces aldehydes and ketones but does NOT reduce esters or carboxylic acids."
  },
  "ket-red": {
    title: "Ketone Reduction → Secondary Alcohol",
    reactants: "R2CO (Ketone) + 2[H]",
    reagents: "NaBH4 in ethanol / LiAlH4 in ether / H2-Ni",
    conditions: "Nucleophilic addition of hydride (H-) to carbonyl carbon",
    products: "R2CHOH (Secondary 2° Alcohol)",
    type: "Nucleophilic Hydride Reduction",
    tip: "Ketones always yield secondary (2°) alcohols upon hydride reduction. Propanone gives propan-2-ol."
  }
};

// ==========================================================================
// 2. APP STATE CONTROLLER
// ==========================================================================

const AppState = {
  identifierIndex: 0,
  identifierScore: 0,
  identifierAnswered: 0,
  nomenIndex: 0,
  nomenScore: 0,
  currentFlashcardIndex: 0,
  flashcardFlipped: false,
  flashcardFilter: 'all', // 'all', 'mastered', 'unmastered'
  masteredFlashcards: new Set(),
  currentQuizIndex: 0,
  quizAnswers: {}, // { [questionId]: optionIndex }
  quizSubmitted: false,
  bookmarks: new Set(),
  mechanismStep: 1,
  
  init() {
    this.loadStorage();
    this.bindDOM();
    this.renderAll();
    this.setupIntersectionObserver();
    this.setupBackToTop();
  },

  loadStorage() {
    try {
      const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (savedBookmarks) this.bookmarks = new Set(JSON.parse(savedBookmarks));

      const savedMastery = localStorage.getItem(STORAGE_KEYS.FLASHCARD_MASTERY);
      if (savedMastery) this.masteredFlashcards = new Set(JSON.parse(savedMastery));

      const savedQuiz = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      if (savedQuiz) this.quizAnswers = JSON.parse(savedQuiz);

      const isCompleted = localStorage.getItem(STORAGE_KEYS.CHAPTER_COMPLETED);
      if (isCompleted === 'true') {
        const compBtn = document.getElementById('btn-complete-chapter');
        if (compBtn) {
          compBtn.innerHTML = '<span>✓</span> Chapter Completed';
          compBtn.classList.add('btn-accent');
        }
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(this.bookmarks)));
      localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY, JSON.stringify(Array.from(this.masteredFlashcards)));
      localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(this.quizAnswers));
      this.updateProgressMetric();
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  },

  updateProgressMetric() {
    // Metric calculated from flashcards mastered (25), quiz questions answered (25), bookmarks (variable)
    const flashcardPoints = Math.min(this.masteredFlashcards.size * 2, 50);
    const quizPoints = Math.min(Object.keys(this.quizAnswers).length * 2, 50);
    const totalPercentage = Math.round(flashcardPoints + quizPoints);

    const bar = document.getElementById('top-progress-bar');
    const label = document.getElementById('top-progress-percent');
    if (bar) bar.style.width = `${totalPercentage}%`;
    if (label) label.textContent = `${totalPercentage}%`;

    const flashcardsCountEl = document.getElementById('stat-flashcards-mastered');
    if (flashcardsCountEl) flashcardsCountEl.textContent = `${this.masteredFlashcards.size}/25`;

    const quizScoreEl = document.getElementById('stat-quiz-answered');
    if (quizScoreEl) quizScoreEl.textContent = `${Object.keys(this.quizAnswers).length}/25`;
  },

  bindDOM() {
    // Search listener
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Bookmark Modal buttons
    const btnSavedTopics = document.getElementById('btn-saved-topics');
    if (btnSavedTopics) {
      btnSavedTopics.addEventListener('click', () => this.openBookmarksModal());
    }

    const btnCloseModal = document.getElementById('btn-close-modal');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => this.closeBookmarksModal());
    }

    const modalOverlay = document.getElementById('bookmarks-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.closeBookmarksModal();
      });
    }

    // Complete chapter button
    const compBtn = document.getElementById('btn-complete-chapter');
    if (compBtn) {
      compBtn.addEventListener('click', () => {
        const isComp = localStorage.getItem(STORAGE_KEYS.CHAPTER_COMPLETED) === 'true';
        if (!isComp) {
          localStorage.setItem(STORAGE_KEYS.CHAPTER_COMPLETED, 'true');
          compBtn.innerHTML = '<span>✓</span> Chapter Completed';
          compBtn.classList.add('btn-accent');
          alert('🎉 Congratulations! You have completed Aldehydes & Ketones MDCAT Reaction Lab!');
        } else {
          localStorage.removeItem(STORAGE_KEYS.CHAPTER_COMPLETED);
          compBtn.innerHTML = '<span>⭐</span> Complete Chapter';
          compBtn.classList.remove('btn-accent');
        }
        this.updateProgressMetric();
      });
    }

    // Hero Visualizer Tabs
    const heroTabs = document.querySelectorAll('.hero-tab-btn');
    heroTabs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        heroTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.getAttribute('data-type');
        this.updateHeroVisual(type);
      });
    });

    // Section 1 Carbonyl Switcher
    const stageBtns = document.querySelectorAll('.stage-switch-btn');
    stageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        stageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.getAttribute('data-type');
        this.updateCarbonylStage(type);
      });
    });

    // Identifier Choice Buttons
    const btnIdAldehyde = document.getElementById('btn-id-aldehyde');
    const btnIdKetone = document.getElementById('btn-id-ketone');
    if (btnIdAldehyde && btnIdKetone) {
      btnIdAldehyde.addEventListener('click', () => this.checkIdentifierAnswer('aldehyde'));
      btnIdKetone.addEventListener('click', () => this.checkIdentifierAnswer('ketone'));
    }

    const btnNextIdentifier = document.getElementById('btn-next-identifier');
    if (btnNextIdentifier) {
      btnNextIdentifier.addEventListener('click', () => this.nextIdentifierQuestion());
    }

    // Reaction Map Filter buttons
    const mapFilters = document.querySelectorAll('.map-filter-btn');
    mapFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        mapFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.filterReactionMap(filter);
      });
    });

    // Reaction Map Connectors
    const reactionFlows = document.querySelectorAll('.reaction-flow-connector');
    reactionFlows.forEach(connector => {
      connector.addEventListener('click', () => {
        reactionFlows.forEach(c => c.classList.remove('active'));
        connector.classList.add('active');
        const key = connector.getAttribute('data-reaction');
        this.showReactionDetails(key);
      });
    });

    // Laboratory Tests (Tollens, Fehling, 2,4-DNP)
    this.bindLabTestControllers();

    // Nucleophilic Addition Mechanism Stepper
    const stepPills = document.querySelectorAll('.step-pill');
    stepPills.forEach(pill => {
      pill.addEventListener('click', () => {
        stepPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const step = parseInt(pill.getAttribute('data-step'), 10);
        this.setMechanismStep(step);
      });
    });

    // Flashcards Navigation & Flip
    const flashcardInner = document.getElementById('flashcard-3d');
    if (flashcardInner) {
      flashcardInner.addEventListener('click', () => this.toggleFlashcardFlip());
    }

    const btnCardPrev = document.getElementById('btn-card-prev');
    const btnCardNext = document.getElementById('btn-card-next');
    const btnCardMaster = document.getElementById('btn-card-master');
    if (btnCardPrev) btnCardPrev.addEventListener('click', () => this.navFlashcard(-1));
    if (btnCardNext) btnCardNext.addEventListener('click', () => this.navFlashcard(1));
    if (btnCardMaster) btnCardMaster.addEventListener('click', () => this.toggleCardMastery());

    const filterBtns = document.querySelectorAll('.card-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.flashcardFilter = btn.getAttribute('data-filter');
        this.currentFlashcardIndex = 0;
        this.renderFlashcard();
      });
    });

    // Quiz Navigation & Submit
    const btnQuizPrev = document.getElementById('btn-quiz-prev');
    const btnQuizNext = document.getElementById('btn-quiz-next');
    const btnQuizRestart = document.getElementById('btn-quiz-restart');
    if (btnQuizPrev) btnQuizPrev.addEventListener('click', () => this.navQuiz(-1));
    if (btnQuizNext) btnQuizNext.addEventListener('click', () => this.navQuiz(1));
    if (btnQuizRestart) btnQuizRestart.addEventListener('click', () => this.restartQuiz());

    // Section bookmark stars
    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    bookmarkButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.getAttribute('data-topic');
        const topicTitle = btn.getAttribute('data-title') || topicId;
        this.toggleBookmark(topicId, topicTitle, btn);
      });
    });
  },

  renderAll() {
    this.renderIdentifierQuestion();
    this.renderNomenclatureQuestion();
    this.renderFlashcard();
    this.renderQuizQuestion();
    this.renderQuizPalette();
    this.updateBookmarkButtonStates();
    this.updateProgressMetric();
    this.showReactionDetails('p-alc-ald');
  },

  // ==========================================================================
  // 3. SEARCH & BOOKMARKS
  // ==========================================================================

  handleSearch(query) {
    const term = query.trim().toLowerCase();
    const searchResultsDropdown = document.getElementById('search-dropdown');
    if (!term) {
      if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
      return;
    }

    const sections = document.querySelectorAll('.lab-section');
    const matches = [];

    sections.forEach(sec => {
      const text = sec.innerText.toLowerCase();
      const title = sec.querySelector('.section-title')?.innerText || sec.id;
      if (text.includes(term)) {
        matches.push({ id: sec.id, title });
      }
    });

    if (searchResultsDropdown) {
      if (matches.length === 0) {
        searchResultsDropdown.innerHTML = `<div style="padding: 0.75rem; font-size: 0.85rem; color: #64748b;">No matching topics found for "${term}"</div>`;
      } else {
        searchResultsDropdown.innerHTML = matches.slice(0, 6).map(m => `
          <a href="#${m.id}" class="search-result-item" style="display: block; padding: 0.6rem 0.85rem; font-size: 0.85rem; color: #0f172a; text-decoration: none; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #047857;">#</strong> ${m.title}
          </a>
        `).join('');
      }
      searchResultsDropdown.style.display = 'block';
    }
  },

  toggleBookmark(topicId, topicTitle, buttonEl) {
    if (this.bookmarks.has(topicId)) {
      this.bookmarks.delete(topicId);
      buttonEl.classList.remove('bookmarked');
      buttonEl.innerHTML = '☆';
    } else {
      this.bookmarks.add(topicId);
      buttonEl.classList.add('bookmarked');
      buttonEl.innerHTML = '★';
    }
    this.saveStorage();
  },

  updateBookmarkButtonStates() {
    const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
    bookmarkButtons.forEach(btn => {
      const topicId = btn.getAttribute('data-topic');
      if (this.bookmarks.has(topicId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '★';
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = '☆';
      }
    });
  },

  openBookmarksModal() {
    const modal = document.getElementById('bookmarks-modal');
    const listContainer = document.getElementById('bookmarks-list');
    if (!modal || !listContainer) return;

    if (this.bookmarks.size === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #64748b;">
          <p style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔖</p>
          <p>You have not bookmarked any topics yet.</p>
          <p style="font-size: 0.8rem; margin-top: 0.4rem;">Click the star icon (☆) on any reaction or section header to save it here for fast revision.</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = Array.from(this.bookmarks).map(id => {
        const section = document.getElementById(id);
        const title = section ? (section.querySelector('.section-title')?.innerText || id) : id;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 0.5rem;">
            <a href="#${id}" onclick="AppState.closeBookmarksModal()" style="font-weight: 700; color: #047857; text-decoration: none; font-size: 0.92rem;">
              📌 ${title}
            </a>
            <button onclick="AppState.removeBookmarkItem('${id}')" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem; font-weight: 700;">Remove</button>
          </div>
        `;
      }).join('');
    }
    modal.classList.add('active');
  },

  closeBookmarksModal() {
    const modal = document.getElementById('bookmarks-modal');
    if (modal) modal.classList.remove('active');
  },

  removeBookmarkItem(id) {
    this.bookmarks.delete(id);
    this.updateBookmarkButtonStates();
    this.saveStorage();
    this.openBookmarksModal();
  },

  // ==========================================================================
  // 4. HERO & CARBONYL VISUALIZERS
  // ==========================================================================

  updateHeroVisual(type) {
    const svgBox = document.getElementById('hero-molecule-svg');
    const caption = document.getElementById('hero-visual-caption');
    if (!svgBox || !caption) return;

    if (type === 'aldehyde') {
      svgBox.innerHTML = `
        <svg viewBox="0 0 300 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- R group -->
          <text x="35" y="80" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#047857">R</text>
          <!-- Single bond to C -->
          <line x1="55" y1="72" x2="115" y2="72" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Carbonyl C -->
          <circle cx="140" cy="72" r="22" fill="#ecfdf5" stroke="#059669" stroke-width="3"/>
          <text x="134" y="80" font-family="monospace" font-weight="900" font-size="24" fill="#065f46">C</text>
          <text x="148" y="55" font-family="sans-serif" font-weight="700" font-size="12" fill="#2563eb">δ+</text>
          
          <!-- Double bond to O -->
          <line x1="135" y1="50" x2="135" y2="15" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="145" y1="50" x2="145" y2="15" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
          
          <!-- Carbonyl Oxygen -->
          <circle cx="140" cy="12" r="16" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5"/>
          <text x="134" y="19" font-family="monospace" font-weight="900" font-size="20" fill="#dc2626">O</text>
          <text x="156" y="10" font-family="sans-serif" font-weight="700" font-size="12" fill="#dc2626">δ-</text>
          
          <!-- Bond to H -->
          <line x1="165" y1="72" x2="225" y2="72" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
          <!-- Hydrogen Atom Highlighted -->
          <circle cx="245" cy="72" r="20" fill="#d1fae5" stroke="#10b981" stroke-width="3"/>
          <text x="238" y="80" font-family="monospace" font-weight="900" font-size="24" fill="#047857">H</text>
        </svg>
      `;
      caption.innerHTML = `<strong>ALDEHYDE (R—CHO):</strong> Carbonyl carbon bonded to at least <strong>ONE Hydrogen (H)</strong>. Easily oxidized to carboxylic acid.`;
    } else {
      svgBox.innerHTML = `
        <svg viewBox="0 0 300 140" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Left R group -->
          <text x="35" y="80" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#2563eb">R</text>
          <line x1="55" y1="72" x2="115" y2="72" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Carbonyl C -->
          <circle cx="140" cy="72" r="22" fill="#eff6ff" stroke="#3b82f6" stroke-width="3"/>
          <text x="134" y="80" font-family="monospace" font-weight="900" font-size="24" fill="#1e40af">C</text>
          <text x="148" y="55" font-family="sans-serif" font-weight="700" font-size="12" fill="#2563eb">δ+</text>
          
          <!-- Double bond to O -->
          <line x1="135" y1="50" x2="135" y2="15" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="145" y1="50" x2="145" y2="15" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
          
          <!-- Oxygen -->
          <circle cx="140" cy="12" r="16" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5"/>
          <text x="134" y="19" font-family="monospace" font-weight="900" font-size="20" fill="#dc2626">O</text>
          <text x="156" y="10" font-family="sans-serif" font-weight="700" font-size="12" fill="#dc2626">δ-</text>
          
          <!-- Right R' group -->
          <line x1="165" y1="72" x2="225" y2="72" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
          <text x="235" y="80" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#2563eb">R'</text>
        </svg>
      `;
      caption.innerHTML = `<strong>KETONE (R—CO—R'):</strong> Carbonyl carbon flanked by <strong>TWO carbon groups</strong> (R and R'). Lacks H on carbonyl carbon; resists mild oxidation.`;
    }
  },

  updateCarbonylStage(type) {
    const svgStage = document.getElementById('carbonyl-stage-svg');
    const infoText = document.getElementById('carbonyl-stage-explanation');
    if (!svgStage || !infoText) return;

    if (type === 'aldehyde') {
      svgStage.innerHTML = `
        <svg viewBox="0 0 320 160" width="100%" height="100%">
          <!-- Electron Cloud Gradient -->
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0.4"/>
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="65" rx="60" ry="50" fill="url(#cloudGrad)"/>
          
          <line x1="70" y1="120" x2="135" y2="85" stroke="#475569" stroke-width="4"/>
          <text x="45" y="130" font-family="sans-serif" font-weight="800" font-size="22" fill="#7c3aed">R</text>

          <line x1="250" y1="120" x2="185" y2="85" stroke="#10b981" stroke-width="5"/>
          <circle cx="265" cy="125" r="16" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
          <text x="259" y="132" font-family="sans-serif" font-weight="900" font-size="20" fill="#047857">H</text>

          <!-- Double bond to O -->
          <line x1="155" y1="65" x2="155" y2="25" stroke="#dc2626" stroke-width="4"/>
          <line x1="165" y1="65" x2="165" y2="25" stroke="#dc2626" stroke-width="4"/>

          <!-- Carbon -->
          <circle cx="160" cy="80" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
          <text x="154" y="87" font-family="monospace" font-weight="900" font-size="20" fill="#1e40af">C</text>
          <text x="180" y="85" font-family="sans-serif" font-weight="800" font-size="14" fill="#2563eb">δ+</text>

          <!-- Oxygen -->
          <circle cx="160" cy="20" r="16" fill="#fef2f2" stroke="#dc2626" stroke-width="3"/>
          <text x="154" y="27" font-family="monospace" font-weight="900" font-size="18" fill="#991b1b">O</text>
          <text x="180" y="22" font-family="sans-serif" font-weight="800" font-size="14" fill="#dc2626">δ-</text>
        </svg>
      `;
      infoText.innerHTML = `In an <strong>Aldehyde</strong>, the green highlighted <strong>Hydrogen atom (H)</strong> is directly attached to the electrophilic Cδ+. This C—H bond has relatively low dissociation energy during oxidation.`;
    } else {
      svgStage.innerHTML = `
        <svg viewBox="0 0 320 160" width="100%" height="100%">
          <defs>
            <linearGradient id="cloudGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0.4"/>
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="65" rx="60" ry="50" fill="url(#cloudGrad2)"/>
          
          <line x1="70" y1="120" x2="135" y2="85" stroke="#7c3aed" stroke-width="4"/>
          <text x="45" y="130" font-family="sans-serif" font-weight="800" font-size="22" fill="#7c3aed">R</text>

          <line x1="250" y1="120" x2="185" y2="85" stroke="#7c3aed" stroke-width="4"/>
          <text x="255" y="130" font-family="sans-serif" font-weight="800" font-size="22" fill="#7c3aed">R'</text>

          <line x1="155" y1="65" x2="155" y2="25" stroke="#dc2626" stroke-width="4"/>
          <line x1="165" y1="65" x2="165" y2="25" stroke="#dc2626" stroke-width="4"/>

          <!-- Carbon -->
          <circle cx="160" cy="80" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
          <text x="154" y="87" font-family="monospace" font-weight="900" font-size="20" fill="#1e40af">C</text>
          <text x="180" y="85" font-family="sans-serif" font-weight="800" font-size="14" fill="#2563eb">δ+</text>

          <!-- Oxygen -->
          <circle cx="160" cy="20" r="16" fill="#fef2f2" stroke="#dc2626" stroke-width="3"/>
          <text x="154" y="27" font-family="monospace" font-weight="900" font-size="18" fill="#991b1b">O</text>
          <text x="180" y="22" font-family="sans-serif" font-weight="800" font-size="14" fill="#dc2626">δ-</text>
        </svg>
      `;
      infoText.innerHTML = `In a <strong>Ketone</strong>, the carbonyl carbon is flanked by <strong>two alkyl/aryl groups (R and R')</strong>. Both donate electron density via inductive (+I) effect, slightly stabilizing Cδ+ and sterically crowding the center.`;
    }
  },

  // ==========================================================================
  // 5. MOLECULE IDENTIFIER & NOMENCLATURE
  // ==========================================================================

  renderIdentifierQuestion() {
    const mol = IDENTIFIER_MOLECULES[this.identifierIndex];
    const formulaEl = document.getElementById('identifier-formula');
    const nameEl = document.getElementById('identifier-common-name');
    const feedbackBox = document.getElementById('identifier-feedback');
    const btnAld = document.getElementById('btn-id-aldehyde');
    const btnKet = document.getElementById('btn-id-ketone');
    const nextBtn = document.getElementById('btn-next-identifier');
    const scoreBadge = document.getElementById('identifier-score');

    if (!mol || !formulaEl) return;

    formulaEl.textContent = mol.formula;
    if (nameEl) nameEl.textContent = mol.name;
    if (feedbackBox) feedbackBox.style.display = 'none';
    if (btnAld) btnAld.disabled = false;
    if (btnKet) btnKet.disabled = false;
    if (nextBtn) nextBtn.style.display = 'none';
    if (scoreBadge) scoreBadge.textContent = `Score: ${this.identifierScore} / ${this.identifierAnswered}`;
  },

  checkIdentifierAnswer(choice) {
    const mol = IDENTIFIER_MOLECULES[this.identifierIndex];
    const feedbackBox = document.getElementById('identifier-feedback');
    const btnAld = document.getElementById('btn-id-aldehyde');
    const btnKet = document.getElementById('btn-id-ketone');
    const nextBtn = document.getElementById('btn-next-identifier');

    if (btnAld) btnAld.disabled = true;
    if (btnKet) btnKet.disabled = true;

    this.identifierAnswered++;
    const isCorrect = (choice === mol.type);
    if (isCorrect) this.identifierScore++;

    if (feedbackBox) {
      feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✓ Correct!' : '✕ Incorrect'} (${mol.type.toUpperCase()})</div>
        <div class="feedback-reason">${mol.reason}</div>
      `;
      feedbackBox.style.display = 'block';
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';
    const scoreBadge = document.getElementById('identifier-score');
    if (scoreBadge) scoreBadge.textContent = `Score: ${this.identifierScore} / ${this.identifierAnswered}`;
  },

  nextIdentifierQuestion() {
    this.identifierIndex = (this.identifierIndex + 1) % IDENTIFIER_MOLECULES.length;
    this.renderIdentifierQuestion();
  },

  renderNomenclatureQuestion() {
    const q = NOMENCLATURE_QUESTIONS[this.nomenIndex];
    const formulaEl = document.getElementById('nomen-formula');
    const optionsGrid = document.getElementById('nomen-options-grid');
    const feedbackBox = document.getElementById('nomen-feedback');
    const countEl = document.getElementById('nomen-count');

    if (!q || !formulaEl || !optionsGrid) return;

    if (countEl) countEl.textContent = `Question ${this.nomenIndex + 1} of ${NOMENCLATURE_QUESTIONS.length}`;
    formulaEl.textContent = q.formula;
    if (feedbackBox) feedbackBox.style.display = 'none';

    optionsGrid.innerHTML = q.options.map((opt, idx) => `
      <button class="btn-nomen-option" onclick="AppState.checkNomenAnswer(${idx})">
        <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
      </button>
    `).join('');
  },

  checkNomenAnswer(selectedIdx) {
    const q = NOMENCLATURE_QUESTIONS[this.nomenIndex];
    const options = document.querySelectorAll('.btn-nomen-option');
    const feedbackBox = document.getElementById('nomen-feedback');

    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === selectedIdx && idx !== q.correct) btn.classList.add('incorrect');
    });

    if (feedbackBox) {
      const isCorrect = (selectedIdx === q.correct);
      feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✓ Correct Name!' : '✕ Incorrect'}</div>
        <div class="feedback-reason">${q.explanation}</div>
        <button onclick="AppState.nextNomenQuestion()" style="margin-top: 0.75rem; padding: 0.4rem 0.9rem; background: #047857; color: #fff; border: none; border-radius: 9999px; font-weight: 700; cursor: pointer;">Next Molecule →</button>
      `;
      feedbackBox.style.display = 'block';
    }
  },

  nextNomenQuestion() {
    this.nomenIndex = (this.nomenIndex + 1) % NOMENCLATURE_QUESTIONS.length;
    this.renderNomenclatureQuestion();
  },

  // ==========================================================================
  // 6. MASTER REACTION MAP & DRAWER
  // ==========================================================================

  showReactionDetails(key) {
    const data = REACTION_MAP_DATA[key];
    const drawer = document.getElementById('reaction-details-drawer');
    if (!data || !drawer) return;

    drawer.innerHTML = `
      <div class="drawer-header">
        <h4>🧪 ${data.title}</h4>
        <span class="badge-tag badge-emerald">${data.type}</span>
      </div>
      <div class="drawer-grid">
        <div class="drawer-info-block">
          <span>Reactants</span>
          <strong>${data.reactants}</strong>
        </div>
        <div class="drawer-info-block">
          <span>Reagents & Catalyst</span>
          <strong>${data.reagents}</strong>
        </div>
        <div class="drawer-info-block">
          <span>Reaction Conditions</span>
          <strong>${data.conditions}</strong>
        </div>
        <div class="drawer-info-block">
          <span>Products</span>
          <strong>${data.products}</strong>
        </div>
      </div>
      <div class="callout-mdcat" style="margin-top: 1rem;">
        <strong>⭐ High-Yield MDCAT Note:</strong> ${data.tip}
      </div>
    `;
    drawer.style.display = 'block';
  },

  filterReactionMap(filter) {
    const flows = document.querySelectorAll('.reaction-flow-connector');
    flows.forEach(flow => {
      const type = flow.getAttribute('data-type');
      if (filter === 'all' || type === filter) {
        flow.style.opacity = '1';
        flow.style.pointerEvents = 'auto';
      } else {
        flow.style.opacity = '0.3';
        flow.style.pointerEvents = 'none';
      }
    });
  },

  // ==========================================================================
  // 7. LAB EXPERIMENTS SIMULATION (Tollens, Fehling, 2,4-DNP)
  // ==========================================================================

  bindLabTestControllers() {
    // Tollens buttons
    const btnTollensAld = document.getElementById('btn-tollens-aldehyde');
    const btnTollensKet = document.getElementById('btn-tollens-ketone');
    if (btnTollensAld && btnTollensKet) {
      btnTollensAld.addEventListener('click', () => this.runTollensTest(true));
      btnTollensKet.addEventListener('click', () => this.runTollensTest(false));
    }

    // Fehling buttons
    const btnFehlingAld = document.getElementById('btn-fehling-aldehyde');
    const btnFehlingKet = document.getElementById('btn-fehling-ketone');
    if (btnFehlingAld && btnFehlingKet) {
      btnFehlingAld.addEventListener('click', () => this.runFehlingTest(true));
      btnFehlingKet.addEventListener('click', () => this.runFehlingTest(false));
    }

    // 2,4-DNP buttons
    const btnDnpCarbonyl = document.getElementById('btn-dnp-carbonyl');
    const btnDnpAlcohol = document.getElementById('btn-dnp-alcohol');
    if (btnDnpCarbonyl && btnDnpAlcohol) {
      btnDnpCarbonyl.addEventListener('click', () => this.runDnpTest(true));
      btnDnpAlcohol.addEventListener('click', () => this.runDnpTest(false));
    }
  },

  runTollensTest(isAldehyde) {
    const liquid = document.getElementById('tollens-tube-liquid');
    const observation = document.getElementById('tollens-observation');
    if (!liquid || !observation) return;

    liquid.className = 'tube-liquid tollens-clear';
    observation.innerHTML = `<em>Adding ammoniacal AgNO3 & warming in water bath...</em>`;

    setTimeout(() => {
      if (isAldehyde) {
        liquid.className = 'tube-liquid tollens-mirror';
        observation.innerHTML = `
          <strong style="color: #065f46;">✨ POSITIVE: Specular Silver Mirror Formed!</strong>
          <span>[Ag(NH3)2]+ is reduced to metallic Ag0. Ethanal oxidizes to acetate: RCHO + 2[Ag(NH3)2]+ + 3OH- → RCOO- + 2Ag↓ + 4NH3 + 2H2O</span>
        `;
      } else {
        liquid.className = 'tube-liquid tollens-clear';
        observation.innerHTML = `
          <strong style="color: #64748b;">✕ NEGATIVE: Solution Remains Clear</strong>
          <span>Ketones (e.g. Propanone) lack a labile C—H bond on the carbonyl carbon and fail to reduce Tollens' reagent.</span>
        `;
      }
    }, 600);
  },

  runFehlingTest(isAldehyde) {
    const liquid = document.getElementById('fehling-tube-liquid');
    const observation = document.getElementById('fehling-observation');
    if (!liquid || !observation) return;

    liquid.className = 'tube-liquid fehling-blue';
    observation.innerHTML = `<em>Heating with Fehling's A (CuSO4) & Fehling's B (alkaline tartrate)...</em>`;

    setTimeout(() => {
      if (isAldehyde) {
        liquid.className = 'tube-liquid fehling-brick-red';
        observation.innerHTML = `
          <strong style="color: #b91c1c;">🔴 POSITIVE: Dense Brick-Red Precipitate of Cu2O!</strong>
          <span>Aliphatic aldehydes reduce blue Cu2+ complex to cuprous oxide: RCHO + 2Cu2+ + 5OH- → RCOO- + Cu2O↓ (brick-red) + 3H2O</span>
        `;
      } else {
        liquid.className = 'tube-liquid fehling-blue';
        observation.innerHTML = `
          <strong style="color: #1e40af;">✕ NEGATIVE: Solution Stays Deep Blue</strong>
          <span>Simple ketones do not reduce Fehling's solution. Note: Aromatic aldehydes like Benzaldehyde also fail to reduce Fehling's.</span>
        `;
      }
    }, 600);
  },

  runDnpTest(isCarbonyl) {
    const liquid = document.getElementById('dnp-tube-liquid');
    const observation = document.getElementById('dnp-observation');
    if (!liquid || !observation) return;

    liquid.className = 'tube-liquid tollens-clear';
    observation.innerHTML = `<em>Adding 2,4-Dinitrophenylhydrazine reagent...</em>`;

    setTimeout(() => {
      if (isCarbonyl) {
        liquid.className = 'tube-liquid dnp-orange';
        observation.innerHTML = `
          <strong style="color: #d97706;">🔶 POSITIVE: Yellow/Orange Hydrazone Precipitate!</strong>
          <span>Both ALDEHYDES AND KETONES give this reaction by condensing with 2,4-DNP: >C=O + H2N—NH—Ar → >C=N—NH—Ar↓ + H2O</span>
        `;
      } else {
        liquid.className = 'tube-liquid tollens-clear';
        observation.innerHTML = `
          <strong style="color: #64748b;">✕ NEGATIVE: No Precipitate (Alcohols / Acids)</strong>
          <span>2,4-DNP specifically identifies the >C=O carbonyl group; non-carbonyl compounds (e.g. ethanol) do not form hydrazones.</span>
        `;
      }
    }, 600);
  },

  // ==========================================================================
  // 8. MECHANISM STEPPER (NUCLEOPHILIC ADDITION)
  // ==========================================================================

  setMechanismStep(step) {
    this.mechanismStep = step;
    const animBox = document.getElementById('mechanism-svg-canvas');
    const explBox = document.getElementById('mechanism-step-explanation');
    if (!animBox || !explBox) return;

    if (step === 1) {
      animBox.innerHTML = `
        <svg viewBox="0 0 360 160" width="100%" height="100%">
          <!-- Nucleophile approaching -->
          <circle cx="50" cy="110" r="22" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
          <text x="35" y="117" font-family="monospace" font-weight="900" font-size="20" fill="#92400e">:Nu⁻</text>
          
          <!-- Curly attack arrow -->
          <path d="M 75 105 Q 120 100 155 75" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-dasharray="4" marker-end="url(#redArrow)"/>

          <!-- Carbonyl Target -->
          <text x="135" y="130" font-family="sans-serif" font-weight="800" font-size="18" fill="#475569">R</text>
          <line x1="145" y1="110" x2="170" y2="75" stroke="#475569" stroke-width="3"/>
          
          <text x="210" y="130" font-family="sans-serif" font-weight="800" font-size="18" fill="#475569">R'</text>
          <line x1="205" y1="110" x2="180" y2="75" stroke="#475569" stroke-width="3"/>

          <!-- Carbon -->
          <circle cx="175" cy="70" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
          <text x="169" y="77" font-family="monospace" font-weight="900" font-size="18" fill="#1e40af">C</text>
          <text x="195" y="72" font-family="sans-serif" font-weight="800" font-size="12" fill="#2563eb">δ+</text>

          <!-- O double bond -->
          <line x1="170" y1="52" x2="170" y2="20" stroke="#dc2626" stroke-width="3.5"/>
          <line x1="180" y1="52" x2="180" y2="20" stroke="#dc2626" stroke-width="3.5"/>
          
          <circle cx="175" cy="15" r="14" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
          <text x="169" y="21" font-family="monospace" font-weight="900" font-size="16" fill="#991b1b">O</text>
          <text x="195" y="15" font-family="sans-serif" font-weight="800" font-size="12" fill="#dc2626">δ-</text>
        </svg>
      `;
      explBox.innerHTML = `<strong>Step 1: Nucleophilic Attack on Electrophilic Carbon (Slow / Rate Determining Step)</strong><br>The nucleophile (:Nu⁻ such as :CN⁻, :H⁻, :OH⁻) donates an electron pair to the partially positive carbonyl carbon atom (Cδ+).`;
    } else if (step === 2) {
      animBox.innerHTML = `
        <svg viewBox="0 0 360 160" width="100%" height="100%">
          <!-- Tetrahedral Intermediate -->
          <circle cx="180" cy="80" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
          <text x="174" y="87" font-family="monospace" font-weight="900" font-size="18" fill="#1e40af">C</text>

          <!-- Attached Nu -->
          <line x1="110" y1="80" x2="162" y2="80" stroke="#d97706" stroke-width="4"/>
          <circle cx="95" cy="80" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
          <text x="82" y="86" font-family="monospace" font-weight="800" font-size="16" fill="#92400e">Nu</text>

          <!-- R & R' groups -->
          <line x1="170" y1="95" x2="140" y2="135" stroke="#475569" stroke-width="3"/>
          <text x="125" y="145" font-family="sans-serif" font-weight="800" font-size="16" fill="#475569">R</text>

          <line x1="190" y1="95" x2="220" y2="135" stroke="#475569" stroke-width="3"/>
          <text x="225" y="145" font-family="sans-serif" font-weight="800" font-size="16" fill="#475569">R'</text>

          <!-- Single bond to Alkoxide O- -->
          <line x1="180" y1="62" x2="180" y2="28" stroke="#dc2626" stroke-width="4"/>
          <circle cx="180" cy="20" r="16" fill="#fef2f2" stroke="#dc2626" stroke-width="3"/>
          <text x="174" y="26" font-family="monospace" font-weight="900" font-size="18" fill="#991b1b">O⁻</text>
        </svg>
      `;
      explBox.innerHTML = `<strong>Step 2: Formation of Tetrahedral Alkoxide Intermediate</strong><br>The C=O π-bond breaks, and both π-electrons shift entirely onto the electronegative oxygen atom. Geometry changes from planar sp2 to tetrahedral sp3.`;
    } else {
      animBox.innerHTML = `
        <svg viewBox="0 0 360 160" width="100%" height="100%">
          <!-- Neutral Addition Product -->
          <circle cx="180" cy="80" r="18" fill="#ecfdf5" stroke="#059669" stroke-width="3"/>
          <text x="174" y="87" font-family="monospace" font-weight="900" font-size="18" fill="#065f46">C</text>

          <!-- Attached Nu -->
          <line x1="110" y1="80" x2="162" y2="80" stroke="#059669" stroke-width="4"/>
          <circle cx="95" cy="80" r="18" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
          <text x="82" y="86" font-family="monospace" font-weight="800" font-size="16" fill="#047857">Nu</text>

          <!-- R & R' groups -->
          <line x1="170" y1="95" x2="140" y2="135" stroke="#475569" stroke-width="3"/>
          <text x="125" y="145" font-family="sans-serif" font-weight="800" font-size="16" fill="#475569">R</text>

          <line x1="190" y1="95" x2="220" y2="135" stroke="#475569" stroke-width="3"/>
          <text x="225" y="145" font-family="sans-serif" font-weight="800" font-size="16" fill="#475569">R'</text>

          <!-- Protonated OH group -->
          <line x1="180" y1="62" x2="180" y2="28" stroke="#059669" stroke-width="4"/>
          <circle cx="180" cy="20" r="18" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
          <text x="168" y="26" font-family="monospace" font-weight="900" font-size="16" fill="#047857">OH</text>
        </svg>
      `;
      explBox.innerHTML = `<strong>Step 3: Protonation to Yield the Stable Addition Product</strong><br>The alkoxide oxygen captures a proton (H+) from the solvent (H2O / acid) to form the neutral addition product (e.g. Cyanohydrin with :CN⁻, Alcohol with :H⁻).`;
    }
  },

  // ==========================================================================
  // 9. FLASHCARDS DECK ENGINE
  // ==========================================================================

  getFilteredCards() {
    if (this.flashcardFilter === 'mastered') {
      return FLASHCARDS_DATA.filter(c => this.masteredFlashcards.has(c.id));
    }
    if (this.flashcardFilter === 'unmastered') {
      return FLASHCARDS_DATA.filter(c => !this.masteredFlashcards.has(c.id));
    }
    return FLASHCARDS_DATA;
  },

  renderFlashcard() {
    const cards = this.getFilteredCards();
    const frontText = document.getElementById('card-front-text');
    const backText = document.getElementById('card-back-text');
    const categoryTag = document.getElementById('card-category-tag');
    const cardCounter = document.getElementById('card-counter-label');
    const masterBtn = document.getElementById('btn-card-master');
    const flashcardInner = document.getElementById('flashcard-3d');

    if (!cards || cards.length === 0) {
      if (frontText) frontText.textContent = "No flashcards in this filter view.";
      if (backText) backText.textContent = "Switch back to 'All' to review all 25 cards.";
      if (cardCounter) cardCounter.textContent = `0 / 0`;
      return;
    }

    if (this.currentFlashcardIndex >= cards.length) {
      this.currentFlashcardIndex = 0;
    }

    const card = cards[this.currentFlashcardIndex];
    if (frontText) frontText.textContent = card.question;
    if (backText) backText.textContent = card.answer;
    if (categoryTag) categoryTag.textContent = card.category;
    if (cardCounter) cardCounter.textContent = `${this.currentFlashcardIndex + 1} / ${cards.length}`;

    if (flashcardInner) {
      flashcardInner.classList.remove('is-flipped');
      this.flashcardFlipped = false;
    }

    if (masterBtn) {
      const isMastered = this.masteredFlashcards.has(card.id);
      masterBtn.className = `btn-mastery-toggle ${isMastered ? 'mastered' : ''}`;
      masterBtn.innerHTML = isMastered ? '✓ Mastered' : 'Mark as Mastered';
    }
  },

  toggleFlashcardFlip() {
    const inner = document.getElementById('flashcard-3d');
    if (!inner) return;
    this.flashcardFlipped = !this.flashcardFlipped;
    inner.classList.toggle('is-flipped', this.flashcardFlipped);
  },

  navFlashcard(direction) {
    const cards = this.getFilteredCards();
    if (cards.length === 0) return;
    this.currentFlashcardIndex = (this.currentFlashcardIndex + direction + cards.length) % cards.length;
    this.renderFlashcard();
  },

  toggleCardMastery() {
    const cards = this.getFilteredCards();
    if (cards.length === 0) return;
    const card = cards[this.currentFlashcardIndex];
    if (this.masteredFlashcards.has(card.id)) {
      this.masteredFlashcards.delete(card.id);
    } else {
      this.masteredFlashcards.add(card.id);
    }
    this.saveStorage();
    this.renderFlashcard();
  },

  // ==========================================================================
  // 10. MDCAT MCQS QUIZ ENGINE
  // ==========================================================================

  renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[this.currentQuizIndex];
    const qText = document.getElementById('quiz-question-text');
    const optionsBox = document.getElementById('quiz-options-container');
    const explBox = document.getElementById('quiz-explanation');
    const counterLabel = document.getElementById('quiz-counter');
    const prevBtn = document.getElementById('btn-quiz-prev');
    const nextBtn = document.getElementById('btn-quiz-next');

    if (!q || !qText || !optionsBox) return;

    if (counterLabel) counterLabel.textContent = `Question ${this.currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`;
    qText.textContent = q.question;

    const userAnswer = this.quizAnswers[q.id];
    const isAnswered = userAnswer !== undefined;

    optionsBox.innerHTML = q.options.map((opt, idx) => {
      let extraClass = '';
      if (isAnswered) {
        if (idx === q.correct) extraClass = 'correct';
        if (idx === userAnswer && idx !== q.correct) extraClass = 'incorrect';
      }
      return `
        <button class="option-btn ${extraClass}" onclick="AppState.handleQuizSelect(${idx})" ${isAnswered ? 'disabled' : ''}>
          <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
          <span>${opt}</span>
        </button>
      `;
    }).join('');

    if (isAnswered && explBox) {
      const isCorrect = (userAnswer === q.correct);
      explBox.className = `quiz-explanation-box feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
      explBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✓ Correct Answer!' : '✕ Incorrect'}</div>
        <div class="feedback-reason">${q.explanation}</div>
      `;
      explBox.style.display = 'block';
    } else if (explBox) {
      explBox.style.display = 'none';
    }

    if (prevBtn) prevBtn.disabled = (this.currentQuizIndex === 0);
    if (nextBtn) {
      nextBtn.textContent = (this.currentQuizIndex === QUIZ_QUESTIONS.length - 1) ? 'View Results 🏆' : 'Next Question →';
    }

    this.renderQuizPalette();
  },

  handleQuizSelect(optionIdx) {
    const q = QUIZ_QUESTIONS[this.currentQuizIndex];
    this.quizAnswers[q.id] = optionIdx;
    this.saveStorage();
    this.renderQuizQuestion();
  },

  navQuiz(direction) {
    if (direction === 1 && this.currentQuizIndex === QUIZ_QUESTIONS.length - 1) {
      this.showQuizResults();
      return;
    }
    this.currentQuizIndex = Math.max(0, Math.min(QUIZ_QUESTIONS.length - 1, this.currentQuizIndex + direction));
    this.renderQuizQuestion();
  },

  renderQuizPalette() {
    const paletteGrid = document.getElementById('quiz-palette-grid');
    if (!paletteGrid) return;

    paletteGrid.innerHTML = QUIZ_QUESTIONS.map((q, idx) => {
      const userAnswer = this.quizAnswers[q.id];
      let statusClass = '';
      if (idx === this.currentQuizIndex) statusClass += ' current';
      if (userAnswer !== undefined) {
        statusClass += (userAnswer === q.correct) ? ' answered-correct' : ' answered-wrong';
      }
      return `
        <button class="palette-btn ${statusClass}" onclick="AppState.jumpToQuiz(${idx})">
          ${idx + 1}
        </button>
      `;
    }).join('');
  },

  jumpToQuiz(idx) {
    this.currentQuizIndex = idx;
    const resultsCard = document.getElementById('quiz-results-card');
    const quizCard = document.getElementById('quiz-question-card');
    if (resultsCard) resultsCard.style.display = 'none';
    if (quizCard) quizCard.style.display = 'block';
    this.renderQuizQuestion();
  },

  showQuizResults() {
    const quizCard = document.getElementById('quiz-question-card');
    const resultsCard = document.getElementById('quiz-results-card');
    const scoreNum = document.getElementById('results-score-num');
    const categoryBadge = document.getElementById('results-category-badge');
    const summaryText = document.getElementById('results-summary-text');

    if (!resultsCard) return;

    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (this.quizAnswers[q.id] === q.correct) correctCount++;
    });

    const percent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    if (quizCard) quizCard.style.display = 'none';
    resultsCard.style.display = 'block';

    if (scoreNum) scoreNum.textContent = `${correctCount}`;
    if (categoryBadge) {
      if (percent >= 90) {
        categoryBadge.className = 'badge-tag badge-emerald';
        categoryBadge.textContent = 'MDCAT TOP SCORER (90%+)';
      } else if (percent >= 75) {
        categoryBadge.className = 'badge-tag badge-teal';
        categoryBadge.textContent = 'MDCAT PROFICIENT (75%+)';
      } else {
        categoryBadge.className = 'badge-tag badge-amber';
        categoryBadge.textContent = 'NEEDS REVISION (<75%)';
      }
    }

    if (summaryText) {
      summaryText.textContent = `You answered ${correctCount} out of 25 questions correctly (${percent}%). Review the questions above using the question palette.`;
    }
  },

  restartQuiz() {
    this.quizAnswers = {};
    this.currentQuizIndex = 0;
    this.saveStorage();
    const resultsCard = document.getElementById('quiz-results-card');
    const quizCard = document.getElementById('quiz-question-card');
    if (resultsCard) resultsCard.style.display = 'none';
    if (quizCard) quizCard.style.display = 'block';
    this.renderQuizQuestion();
  },

  // ==========================================================================
  // 11. NAVIGATION & SCROLL OBSERVERS
  // ==========================================================================

  setupIntersectionObserver() {
    const sections = document.querySelectorAll('.lab-section');
    const navLinks = document.querySelectorAll('.nav-link-btn');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(sec => observer.observe(sec));
  },

  setupBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// Initialize Application once DOM loads
document.addEventListener('DOMContentLoaded', () => {
  AppState.init();
});

// Export globally for HTML inline handlers
window.AppState = AppState;
