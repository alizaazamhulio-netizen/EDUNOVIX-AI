/**
 * ============================================================================
 * EduNexa AI - MDCAT Biology Core Architecture
 * Production JavaScript Engine (v2.0)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CHAPTER REGISTRY (Full PMDC Syllabus & Real GitHub Repository Files)
  // Preserves 100% of old chapters (OLD CHAPTERS ⊆ NEW CHAPTERS) + exposes real files
  // --------------------------------------------------------------------------
  const BIOLOGY_CHAPTERS = [
    {
      id: 'cell-biology',
      number: '01',
      title: 'Cell Biology',
      category: 'Cell Biology',
      filename: 'Cell-Biology.html',
      icon: 'fa-dna',
      description: 'Ultra-structure of eukaryotic & prokaryotic cells, fluid mosaic membrane model, organelle functions, and transport.',
      tags: ['Organelles', 'Cell Membrane', 'Endomembrane', 'Cytoskeleton']
    },
    {
      id: 'biological-molecules',
      number: '02',
      title: 'Biological Molecules',
      category: 'Cell Biology',
      filename: 'Biological-Molecules.html',
      icon: 'fa-cubes-stacked',
      description: 'Chemical foundations of life: carbohydrates, lipids, proteins (primary to quaternary), nucleic acids, and water.',
      tags: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids']
    },
    {
      id: 'enzymes',
      number: '03',
      title: 'Enzymes & Catalysis',
      category: 'Cell Biology',
      filename: 'enzymes.html',
      icon: 'fa-bolt',
      description: 'Enzyme kinetics, activation energy, induced-fit mechanism, cofactors, prosthetic groups, and competitive/allosteric inhibition.',
      tags: ['Active Site', 'Inhibition', 'Kinetics', 'Cofactors']
    },
    {
      id: 'bioenergetics',
      number: '04',
      title: 'Bioenergetics',
      category: 'Cell Biology',
      filename: 'Bioenergetics.html',
      icon: 'fa-sun-plant-wilt',
      description: 'Photosynthesis (photophosphorylation, Calvin cycle) and cellular respiration (glycolysis, Krebs cycle, chemiosmosis).',
      tags: ['Photosynthesis', 'Glycolysis', 'Krebs Cycle', 'ATP Synthase']
    },
    {
      id: 'biodiversity-acellular',
      number: '05',
      title: 'Biodiversity & Acellular Life',
      category: 'Ecology & Biotech',
      filename: 'biodiversity.html',
      icon: 'fa-virus-covid',
      description: 'Viral morphology, lytic vs lysogenic cycles, retroviruses (HIV), hepatitis, prions, and bacterial classification.',
      tags: ['Viruses', 'Bacteria', 'Lytic Cycle', 'Bacteriophage']
    },
    {
      id: 'coordination-and-control',
      number: '06',
      title: 'Coordination and Control',
      category: 'Human Physiology',
      filename: 'coordination.html',
      icon: 'fa-brain',
      description: 'Nervous system, resting membrane potential, action potential propagation, synaptic transmission, and endocrine glands.',
      tags: ['Neurons', 'Action Potential', 'Synapse', 'Hormones']
    },
    {
      id: 'reproduction',
      number: '07',
      title: 'Human Reproduction & Development',
      category: 'Human Physiology',
      filename: 'reproduction.html',
      icon: 'fa-person-half-dress',
      description: 'Male & female reproductive systems, spermatogenesis, oogenesis, hormonal control of menstrual cycle, and embryogenesis.',
      tags: ['Gametogenesis', 'Menstrual Cycle', 'Fertilization', 'Placenta']
    },
    {
      id: 'support-and-movement',
      number: '08',
      title: 'Support and Movement',
      category: 'Human Physiology',
      filename: 'support-movement.html',
      icon: 'fa-bone',
      description: 'Human skeletal anatomy, joints, cartilage, microscopic muscle architecture, sliding filament model, and troponin regulation.',
      tags: ['Sarcomere', 'Actin & Myosin', 'Joints', 'Skeletal System']
    },
    {
      id: 'inheritance',
      number: '09',
      title: 'Variation and Genetics',
      category: 'Genetics & Evolution',
      filename: 'Inheritance.html',
      icon: 'fa-code-branch',
      description: 'Mendelian laws, monohybrid & dihybrid crosses, codominance, incomplete dominance, multiple alleles, and sex linkage.',
      tags: ['Mendelian Ratios', 'Sex Linkage', 'Codominance', 'Pedigrees']
    },
    {
      id: 'evolution',
      number: '10',
      title: 'Evolution & Population Genetics',
      category: 'Genetics & Evolution',
      filename: 'Evolution.html',
      icon: 'fa-timeline',
      description: 'Darwinian natural selection, evidence of evolution, homology vs analogy, Hardy-Weinberg equilibrium, and speciation.',
      tags: ['Natural Selection', 'Hardy-Weinberg', 'Homology', 'Speciation']
    },
    {
      id: 'homeostasis',
      number: '11',
      title: 'Homeostasis & Excretion',
      category: 'Human Physiology',
      filename: 'Homeostasis.html',
      icon: 'fa-temperature-half',
      description: 'Thermoregulation, osmoregulation, nephron functional anatomy, glomerular ultrafiltration, and countercurrent multiplication.',
      tags: ['Nephron', 'Kidneys', 'Osmoregulation', 'ADH & Aldosterone']
    },
    {
      id: 'biotechnology',
      number: '12',
      title: 'Biotechnology & Genetic Engineering',
      category: 'Ecology & Biotech',
      filename: 'Biotechnology.html',
      icon: 'fa-flask-vial',
      description: 'Recombinant DNA technology, restriction enzymes, cloning vectors, PCR thermal cycles, and gel electrophoresis.',
      tags: ['PCR', 'Gel Electrophoresis', 'Plasmids', 'Restriction Enzymes']
    },
    {
      id: 'immunity',
      number: '13',
      title: 'Immunity & Host Defense',
      category: 'Human Physiology',
      filename: 'Human Physiology.html',
      icon: 'fa-shield-halved',
      description: 'Innate vs adaptive immunity, humoral vs cell-mediated pathways, B/T lymphocyte maturation, and immunoglobulins.',
      tags: ['Antibodies', 'T-Lymphocytes', 'B-Cells', 'Vaccines']
    },
    {
      id: 'circulation',
      number: '14',
      title: 'Circulation & Gas Exchange',
      category: 'Human Physiology',
      filename: 'Human Physiology.html',
      icon: 'fa-heart-pulse',
      description: 'Cardiac cycle, conductive system of heart, blood pressure regulation, capillary dynamics, and hemoglobin dissociation.',
      tags: ['Cardiac Cycle', 'ECG', 'Hemoglobin', 'Blood Vessels']
    },
    {
      id: 'human-physiology',
      number: '15',
      title: 'Human Physiology (Master Module)',
      category: 'Human Physiology',
      filename: 'Human Physiology.html',
      icon: 'fa-stethoscope',
      description: 'Comprehensive overview of all 9 major human physiological systems: nervous, circulatory, respiratory, digestive, and endocrine.',
      tags: ['Organ Systems', 'Physiology Overview', 'Cardiovascular', 'Homeostasis']
    },
    {
      id: 'genetics',
      number: '16',
      title: 'Genetics Laboratory',
      category: 'Genetics & Evolution',
      filename: 'Genetics.html',
      icon: 'fa-dna',
      description: 'Chromosomal basis of inheritance, DNA structure & replication, gene expression, transcription, translation, and mutations.',
      tags: ['DNA Replication', 'Transcription', 'Translation', 'Mutations']
    },
    {
      id: 'biochemistry',
      number: '17',
      title: 'Biochemistry & Metabolic Pathways',
      category: 'Cell Biology',
      filename: 'biochemistry.html',
      icon: 'fa-flask',
      description: 'Cellular thermodynamics, metabolic pathway integration, coenzyme functions, and regulation of metabolic equilibrium.',
      tags: ['Metabolism', 'Pathways', 'Coenzymes', 'Regulation']
    }
  ];

  // --------------------------------------------------------------------------
  // 2. BIOLOGY QUESTION BANK (25 High-Yield PMDC-Standard MCQs)
  // --------------------------------------------------------------------------
  const BIOLOGY_QUESTION_BANK = [
    {
      id: 1,
      topic: 'Cell Biology',
      difficulty: 'Medium',
      question: 'Which organelle is directly responsible for organizing microtubule spindle fibers during eukaryotic mitosis in animal cells?',
      options: ['Centrosome / Centrioles', 'Golgi Apparatus', 'Peroxisome', 'Nucleolus'],
      correctIndex: 0,
      explanation: 'Centrioles within the centrosome serve as the primary microtubule organizing centers (MTOCs) that generate spindle apparatus during mitotic division in animal cells.'
    },
    {
      id: 2,
      topic: 'Biological Molecules',
      difficulty: 'Easy',
      question: 'Which bond stabilizes the secondary alpha-helix structure of globular proteins?',
      options: ['Disulfide linkages', 'Hydrogen bonds between peptide backbones', 'Hydrophobic interactions', 'Phosphodiester bonds'],
      correctIndex: 1,
      explanation: 'Alpha-helices and beta-pleated sheets (secondary structure) are stabilized strictly by regular hydrogen bonding between the carbonyl oxygen (C=O) and amide hydrogen (N-H) of the polypeptide backbone.'
    },
    {
      id: 3,
      topic: 'Enzymes & Catalysis',
      difficulty: 'Hard',
      question: 'In competitive enzyme inhibition, how are the kinetic parameters Km (Michaelis constant) and Vmax affected?',
      options: [
        'Km increases, Vmax remains unchanged',
        'Km decreases, Vmax decreases',
        'Km remains unchanged, Vmax decreases',
        'Both Km and Vmax increase'
      ],
      correctIndex: 0,
      explanation: 'Competitive inhibitors bind reversibly to the catalytic active site. High substrate concentration overcomes the inhibitor, leaving Vmax unchanged, but shifting the apparent affinity (Km increases).'
    },
    {
      id: 4,
      topic: 'Bioenergetics',
      difficulty: 'Medium',
      question: 'During non-cyclic photophosphorylation in chloroplast thylakoids, what is the immediate terminal electron acceptor?',
      options: ['NADP+ reductase forming NADPH', 'Cytochrome b6f complex', 'Plastocyanin', 'Molecular Oxygen'],
      correctIndex: 0,
      explanation: 'Electrons energized from Photosystem I travel through ferredoxin to NADP+ reductase, reducing NADP+ + H+ into NADPH in the stroma.'
    },
    {
      id: 5,
      topic: 'Bioenergetics',
      difficulty: 'Hard',
      question: 'How many net ATP molecules are produced via substrate-level phosphorylation during one complete turn of the Krebs (TCA) cycle per acetyl-CoA?',
      options: ['1 ATP (or GTP)', '2 ATP', '3 ATP', '12 ATP'],
      correctIndex: 0,
      explanation: 'Per turn of the citric acid cycle (one acetyl-CoA), exactly 1 molecule of GTP (converted to ATP) is generated at the succinyl-CoA to succinate conversion step via substrate-level phosphorylation.'
    },
    {
      id: 6,
      topic: 'Biodiversity & Acellular Life',
      difficulty: 'Medium',
      question: 'The genome of the Human Immunodeficiency Virus (HIV) consists of:',
      options: [
        'Two identical single-stranded positive-sense RNA molecules',
        'One circular double-stranded DNA molecule',
        'Segmented negative-sense double-stranded RNA',
        'Linear single-stranded DNA'
      ],
      correctIndex: 0,
      explanation: 'HIV is an enveloped retrovirus possessing a diploid genome composed of two identical copies of single-stranded positive-sense RNA along with reverse transcriptase enzymes.'
    },
    {
      id: 7,
      topic: 'Human Physiology',
      difficulty: 'Medium',
      question: 'During nerve impulse conduction, what triggers rapid repolarization of the axonal membrane?',
      options: [
        'Outflow of K+ ions through voltage-gated potassium channels',
        'Inflow of Na+ ions through sodium channels',
        'Active transport of Ca2+ into the synaptic cleft',
        'Opening of chloride ion channels'
      ],
      correctIndex: 0,
      explanation: 'Repolarization is achieved when voltage-gated Na+ channels inactivate and voltage-gated K+ channels open, allowing massive efflux of potassium cations down their electrochemical gradient.'
    },
    {
      id: 8,
      topic: 'Human Physiology',
      difficulty: 'Easy',
      question: 'Which hormone triggers ovulation by causing the mature Graafian follicle to rupture?',
      options: ['Luteinizing Hormone (LH surge)', 'Progesterone', 'Follicle-Stimulating Hormone (FSH)', 'Prolactin'],
      correctIndex: 0,
      explanation: 'The mid-cycle LH surge (triggered by high estrogen feedback) causes enzymatic degradation of the follicular wall, inducing ovulation around day 14.'
    },
    {
      id: 9,
      topic: 'Human Physiology',
      difficulty: 'Hard',
      question: 'In the sliding filament model of skeletal muscle contraction, binding of ATP to the myosin head causes:',
      options: [
        'Detachment of the myosin head from the actin binding site',
        'Execution of the power stroke',
        'Exposure of myosin-binding sites on actin',
        'Release of calcium from the sarcoplasmic reticulum'
      ],
      correctIndex: 0,
      explanation: 'Binding of a new ATP molecule to the nucleotide-binding pocket of myosin causes allosteric dissociation of the rigor cross-bridge from actin. Hydrolysis of that ATP then recocks the head.'
    },
    {
      id: 10,
      topic: 'Genetics & Evolution',
      difficulty: 'Medium',
      question: 'What is the expected phenotypic ratio in a Mendelian dihybrid cross involving two heterozygous individuals (AaBb x AaBb) with complete dominance?',
      options: ['9:3:3:1', '1:2:1', '3:1', '9:7'],
      correctIndex: 0,
      explanation: 'According to Mendel\'s Law of Independent Assortment, two heterozygous genes on non-homologous chromosomes produce a 9:3:3:1 phenotypic distribution in the F2 generation.'
    },
    {
      id: 11,
      topic: 'Genetics & Evolution',
      difficulty: 'Hard',
      question: 'In a population adhering to Hardy-Weinberg equilibrium, the frequency of a recessive allele (q) is 0.3. What percentage of the population is heterozygous carriers (2pq)?',
      options: ['42%', '49%', '9%', '21%'],
      correctIndex: 0,
      explanation: 'If q = 0.3, then p = 1 - 0.3 = 0.7. The heterozygous genotype frequency is 2pq = 2 * (0.7) * (0.3) = 0.42 (42%).'
    },
    {
      id: 12,
      topic: 'Human Physiology',
      difficulty: 'Medium',
      question: 'Which segment of the nephron is impermeable to water regardless of ADH concentration?',
      options: [
        'Thick ascending limb of the Loop of Henle',
        'Descending limb of the Loop of Henle',
        'Proximal convoluted tubule',
        'Medullary collecting duct'
      ],
      correctIndex: 0,
      explanation: 'The ascending limb of the Loop of Henle actively transports sodium, potassium, and chloride ions (Na+/K+/2Cl- symporter) but is strictly impermeable to water, allowing tubular fluid dilution.'
    },
    {
      id: 13,
      topic: 'Ecology & Biotech',
      difficulty: 'Medium',
      question: 'What is the biological function of restriction endonucleases in bacteria?',
      options: [
        'To cleave foreign bacteriophage viral DNA at specific palindromic sequences',
        'To synthesize bacterial mRNA',
        'To ligate Okazaki fragments during replication',
        'To repair thymine dimers induced by UV light'
      ],
      correctIndex: 0,
      explanation: 'Restriction endonucleases function as molecular immune defenses in prokaryotes, cleaving foreign invading viral DNA at sequence-specific recognition palindromes.'
    },
    {
      id: 14,
      topic: 'Human Physiology',
      difficulty: 'Medium',
      question: 'Which class of immunoglobulins is the only one capable of crossing the maternal placenta to confer passive immunity to the fetus?',
      options: ['IgG', 'IgA', 'IgM', 'IgE'],
      correctIndex: 0,
      explanation: 'IgG is the predominant circulating monomeric antibody and uniquely possesses Fc-receptor-mediated transport mechanisms across the human syncytiotrophoblast of the placenta.'
    },
    {
      id: 15,
      topic: 'Human Physiology',
      difficulty: 'Hard',
      question: 'A rightward shift in the oxygen-hemoglobin dissociation curve (Bohr effect) is caused by:',
      options: [
        'Increased pCO2, decreased pH (higher acidity), and increased temperature',
        'Decreased pCO2 and elevated pH',
        'Decreased 2,3-BPG concentration',
        'Hypothermia and alkalosis'
      ],
      correctIndex: 0,
      explanation: 'The Bohr effect decreases hemoglobin affinity for oxygen (facilitating O2 unloading at metabolically active tissues) in response to increased CO2, lower pH, and elevated body temperature.'
    },
    {
      id: 16,
      topic: 'Cell Biology',
      difficulty: 'Easy',
      question: 'Ribosomal RNA (rRNA) transcription and ribosomal subunit assembly occur primarily in which sub-nuclear structure?',
      options: ['Nucleolus', 'Nuclear pore complex', 'Heterochromatin', 'Endoplasmic reticulum'],
      correctIndex: 0,
      explanation: 'The nucleolus is the dense non-membrane-bound subnuclear compartment dedicated to transcribing precursor rRNA and assembling pre-ribosomal subunits.'
    },
    {
      id: 17,
      topic: 'Cell Biology',
      difficulty: 'Medium',
      question: 'Which lipid component prevents biological membranes from becoming overly rigid at low temperatures and excessively fluid at high temperatures?',
      options: ['Cholesterol', 'Phosphatidylcholine', 'Sphingomyelin', 'Triacylglycerol'],
      correctIndex: 0,
      explanation: 'Cholesterol acts as a bidirectional membrane fluidity buffer: its rigid steroid ring disrupts fatty acid packing at low temps and impedes excessive phospholipid movement at warm temps.'
    },
    {
      id: 18,
      topic: 'Biological Molecules',
      difficulty: 'Medium',
      question: 'The covalent linkage formed between adjacent nucleotides in a single strand of DNA is called a:',
      options: ['3\'-5\' Phosphodiester bond', 'Glycosidic bond', 'Peptide bond', 'Disulfide bridge'],
      correctIndex: 0,
      explanation: 'DNA polymerases catalyze the ester bond between the 3\'-hydroxyl (-OH) group of the preceding deoxyribose and the 5\'-phosphate group of the incoming nucleotide.'
    },
    {
      id: 19,
      topic: 'Human Physiology',
      difficulty: 'Hard',
      question: 'Which pancreatic islet cells secrete glucagon, and what is its immediate metabolic action?',
      options: [
        'Alpha cells; stimulates hepatic glycogenolysis and gluconeogenesis',
        'Beta cells; stimulates peripheral glucose uptake',
        'Delta cells; inhibits gastric motility',
        'F cells; stimulates pancreatic polypeptide secretion'
      ],
      correctIndex: 0,
      explanation: 'Alpha cells of the Islets of Langerhans synthesize glucagon in response to hypoglycemia, triggering glycogen breakdown and de novo glucose synthesis in the liver.'
    },
    {
      id: 20,
      topic: 'Genetics & Evolution',
      difficulty: 'Hard',
      question: 'Hemophilia A is inherited as an X-linked recessive disorder. If a carrier female (XHXh) marries a normal male (XHY), what is the probability that their son will have hemophilia?',
      options: ['50%', '25%', '100%', '0%'],
      correctIndex: 0,
      explanation: 'A male child receives the Y chromosome from the father and has an equal (50%) probability of inheriting either the normal XH or mutant Xh chromosome from the carrier mother.'
    },
    {
      id: 21,
      topic: 'Human Physiology',
      difficulty: 'Medium',
      question: 'The sound "Lub" (first heart sound, S1) heard during cardiac auscultation corresponds to:',
      options: [
        'Closure of the atrioventricular (Tricuspid and Mitral) valves at onset of ventricular systole',
        'Closure of the aortic and pulmonary semilunar valves',
        'Rapid ventricular filling during early diastole',
        'Atrial contraction against stiffened ventricles'
      ],
      correctIndex: 0,
      explanation: 'S1 marks the beginning of ventricular systole when rising intraventricular pressure forces both AV valves (mitral and tricuspid) shut to prevent retrograde blood flow.'
    },
    {
      id: 22,
      topic: 'Ecology & Biotech',
      difficulty: 'Medium',
      question: 'In the Polymerase Chain Reaction (PCR), what occurs during the annealing step (typically 50–65°C)?',
      options: [
        'Sequence-specific oligonucleotide primers hybridize to complementary single-stranded DNA templates',
        'Taq DNA polymerase synthesizes new DNA strands',
        'Double-stranded DNA denatures into single strands',
        'Restriction endonucleases digest non-specific fragments'
      ],
      correctIndex: 0,
      explanation: 'Lowering the thermal cycler temperature to annealing range allows forward and reverse oligonucleotide primers to bind specifically to their flanking target regions.'
    },
    {
      id: 23,
      topic: 'Human Physiology',
      difficulty: 'Easy',
      question: 'Which cranial nerve carries parasympathetic motor fibers to regulate heart rate, respiratory rate, and gastrointestinal peristalsis?',
      options: ['Vagus Nerve (Cranial Nerve X)', 'Trigeminal Nerve (CN V)', 'Facial Nerve (CN VII)', 'Hypoglossal Nerve (CN XII)'],
      correctIndex: 0,
      explanation: 'Cranial Nerve X (Vagus) provides extensive parasympathetic autonomic innervation to thoracic viscera (slowing heart rate) and abdominal organs (stimulating digestive motility).'
    },
    {
      id: 24,
      topic: 'Genetics & Evolution',
      difficulty: 'Medium',
      question: 'Structures with similar basic anatomical plans and embryological origins that serve different functions in different species are called:',
      options: ['Homologous organs (e.g., human arm and bat wing)', 'Analogous organs', 'Vestigial structures', 'Atavisms'],
      correctIndex: 0,
      explanation: 'Homologous structures share common ancestral origin and structural anatomy despite diverging for distinct functions, demonstrating divergent evolution.'
    },
    {
      id: 25,
      topic: 'Cell Biology',
      difficulty: 'Medium',
      question: 'Lysosomal degradation of a cell\'s own dysfunctional organelles and cellular components is termed:',
      options: ['Autophagy', 'Heterophagy', 'Pinocytosis', 'Exocytosis'],
      correctIndex: 0,
      explanation: 'Autophagy is the catabolic process whereby double-membrane autophagosomes engulf damaged organelles (such as senescent mitochondria) and fuse with lysosomes for enzymatic degradation.'
    }
  ];

  // --------------------------------------------------------------------------
  // 3. STORAGE KEYS & PERSISTENCE
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    CHAPTER_PROGRESS: 'studymate_biology_chapters_v1',
    LAST_STUDIED_CHAPTER: 'studymate_biology_last_studied_v1',
    QUIZ_STATS: 'studymate_biology_quiz_stats_v1',
    QUIZ_HISTORY: 'studymate_biology_quiz_history_v1',
    MDCAT_SYNC: 'studymate_mdcat_bio_prog',
    THEME: 'theme'
  };

  // --------------------------------------------------------------------------
  // 4. APPLICATION STATE
  // --------------------------------------------------------------------------
  const state = {
    searchQuery: '',
    selectedCategory: 'All',
    chapterProgress: {}, // { [chapterId]: 'completed' | 'in-progress' }
    lastStudiedChapterId: 'cell-biology',
    quizStats: {
      attempts: 0,
      bestScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0
    },
    quizConfig: {
      questionCount: 20,
      difficulty: 'Mixed',
      topic: 'All'
    },
    activeQuiz: {
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // { [questionIndex]: selectedOptionIndex }
      score: 0,
      timerSeconds: 0,
      timerInterval: null,
      isAnswerChecked: false
    }
  };

  // --------------------------------------------------------------------------
  // 5. DOM ELEMENT CACHE
  // --------------------------------------------------------------------------
  const DOM = {};

  function cacheDOMElements() {
    DOM.themeToggleBtn = document.getElementById('themeToggleBtn');
    DOM.themeIcon = document.getElementById('themeIcon');
    DOM.mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
    DOM.mobileThemeIcon = document.getElementById('mobileThemeIcon');
    DOM.mobileToggleBtn = document.getElementById('mobileToggleBtn');
    DOM.mobileDrawer = document.getElementById('mobileDrawer');

    // Hero Stats
    DOM.statTotalChapters = document.getElementById('statTotalChapters');
    DOM.statPracticeQuestions = document.getElementById('statPracticeQuestions');
    DOM.statCompletedChapters = document.getElementById('statCompletedChapters');
    DOM.statBestQuizScore = document.getElementById('statBestQuizScore');

    // Continue Studying Card
    DOM.continueChapterTitle = document.getElementById('continueChapterTitle');
    DOM.continueChapterProgressFill = document.getElementById('continueChapterProgressFill');
    DOM.continueChapterPercentText = document.getElementById('continueChapterPercentText');
    DOM.continueChapterBtn = document.getElementById('continueChapterBtn');
    DOM.dailyPracticeBtn = document.getElementById('dailyPracticeBtn');

    // Chapters Toolbar & Grid
    DOM.chapterSearchInput = document.getElementById('chapterSearchInput');
    DOM.chapterSearchClear = document.getElementById('chapterSearchClear');
    DOM.filterTabsRow = document.getElementById('filterTabsRow');
    DOM.chaptersGrid = document.getElementById('chaptersGrid');

    // Quiz Views & Box
    DOM.quizContainerBox = document.getElementById('quizContainerBox');
    DOM.quizIntroView = document.getElementById('quizIntroView');
    DOM.quizActiveView = document.getElementById('quizActiveView');
    DOM.quizResultView = document.getElementById('quizResultView');
    DOM.quizReviewView = document.getElementById('quizReviewView');

    // Quiz Controls
    DOM.startQuizBtn = document.getElementById('startQuizBtn');
    DOM.quizTopicSelect = document.getElementById('quizTopicSelect');
    DOM.quizCurrentNum = document.getElementById('quizCurrentNum');
    DOM.quizTotalNum = document.getElementById('quizTotalNum');
    DOM.quizTopicBadge = document.getElementById('quizTopicBadge');
    DOM.quizTimerDisplay = document.getElementById('quizTimerDisplay');
    DOM.quizTimerText = document.getElementById('quizTimerText');
    DOM.quizLiveScore = document.getElementById('quizLiveScore');
    DOM.quizProgressBar = document.getElementById('quizProgressBar');
    DOM.quizQuestionText = document.getElementById('quizQuestionText');
    DOM.quizAnswersContainer = document.getElementById('quizAnswersContainer');
    DOM.quizExplanationPanel = document.getElementById('quizExplanationPanel');
    DOM.quizExplanationText = document.getElementById('quizExplanationText');
    DOM.quizPrevBtn = document.getElementById('quizPrevBtn');
    DOM.quizNextBtn = document.getElementById('quizNextBtn');

    // Result Elements
    DOM.resultScoreCircleBar = document.getElementById('resultScoreCircleBar');
    DOM.resultScorePercent = document.getElementById('resultScorePercent');
    DOM.resStatCorrect = document.getElementById('resStatCorrect');
    DOM.resStatWrong = document.getElementById('resStatWrong');
    DOM.resStatAccuracy = document.getElementById('resStatAccuracy');
    DOM.resStatAttempted = document.getElementById('resStatAttempted');
    DOM.reviewAnswersBtn = document.getElementById('reviewAnswersBtn');
    DOM.retakeQuizBtn = document.getElementById('retakeQuizBtn');
    DOM.backToDashboardBtn = document.getElementById('backToDashboardBtn');

    // Review Elements
    DOM.backToResultsBtn = document.getElementById('backToResultsBtn');
    DOM.reviewAnswersList = document.getElementById('reviewAnswersList');

    // Analytics Dashboard
    DOM.analyticsTotalChapters = document.getElementById('analyticsTotalChapters');
    DOM.analyticsCompleted = document.getElementById('analyticsCompleted');
    DOM.analyticsInProgress = document.getElementById('analyticsInProgress');
    DOM.analyticsBestScore = document.getElementById('analyticsBestScore');
    DOM.resetProgressBtn = document.getElementById('resetProgressBtn');

    // Reset Modal
    DOM.resetModalBackdrop = document.getElementById('resetModalBackdrop');
    DOM.cancelResetBtn = document.getElementById('cancelResetBtn');
    DOM.confirmResetBtn = document.getElementById('confirmResetBtn');
  }

  // --------------------------------------------------------------------------
  // 6. STORAGE UTILITIES (No localStorage.clear())
  // --------------------------------------------------------------------------
  function loadStoredData() {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEYS.CHAPTER_PROGRESS);
      if (storedProgress) {
        state.chapterProgress = JSON.parse(storedProgress) || {};
      }

      const storedLastStudied = localStorage.getItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER);
      if (storedLastStudied && BIOLOGY_CHAPTERS.some(ch => ch.id === storedLastStudied)) {
        state.lastStudiedChapterId = storedLastStudied;
      }

      const storedStats = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
      if (storedStats) {
        state.quizStats = Object.assign(state.quizStats, JSON.parse(storedStats));
      }
    } catch (e) {
      console.warn('[EduNexa Biology] Storage read error:', e);
    }
  }

  function saveChapterProgress() {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAPTER_PROGRESS, JSON.stringify(state.chapterProgress));
      localStorage.setItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER, state.lastStudiedChapterId);

      // Synchronize with general MDCAT percentage
      const total = BIOLOGY_CHAPTERS.length;
      const completed = Object.values(state.chapterProgress).filter(s => s === 'completed').length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      localStorage.setItem(STORAGE_KEYS.MDCAT_SYNC, String(percent));
    } catch (e) {
      console.warn('[EduNexa Biology] Storage save error:', e);
    }
  }

  function saveQuizStats() {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(state.quizStats));
    } catch (e) {
      console.warn('[EduNexa Biology] Storage stats error:', e);
    }
  }

  function resetAllBiologyProgress() {
    state.chapterProgress = {};
    state.lastStudiedChapterId = 'cell-biology';
    state.quizStats = {
      attempts: 0,
      bestScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0
    };

    try {
      localStorage.removeItem(STORAGE_KEYS.CHAPTER_PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_STATS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
      localStorage.setItem(STORAGE_KEYS.MDCAT_SYNC, '0');
    } catch (e) {
      console.warn('[EduNexa Biology] Storage reset error:', e);
    }

    renderDashboardStats();
    renderChaptersGrid();
    updateContinueStudyCard();
    closeResetModal();
  }

  // --------------------------------------------------------------------------
  // 7. THEME MANAGER (Dark / Light Mode)
  // --------------------------------------------------------------------------
  function initTheme() {
    let savedTheme = 'dark';
    try {
      savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    } catch (e) {
      savedTheme = 'dark';
    }

    applyTheme(savedTheme);

    const toggleHandler = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
      } catch (e) {}
    };

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleHandler);
    }
    if (DOM.mobileThemeToggleBtn) {
      DOM.mobileThemeToggleBtn.addEventListener('click', toggleHandler);
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    const iconClass = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (DOM.themeIcon) DOM.themeIcon.className = iconClass;
    if (DOM.mobileThemeIcon) DOM.mobileThemeIcon.className = iconClass;
  }

  // --------------------------------------------------------------------------
  // 8. DASHBOARD & STATS RENDERING
  // --------------------------------------------------------------------------
  function renderDashboardStats() {
    const totalChapters = BIOLOGY_CHAPTERS.length;
    let completedCount = 0;
    let inProgressCount = 0;

    Object.values(state.chapterProgress).forEach(status => {
      if (status === 'completed') completedCount++;
      else if (status === 'in-progress') inProgressCount++;
    });

    const bestScoreText = state.quizStats.bestScore > 0 ? `${state.quizStats.bestScore}%` : '0%';

    // Hero stats
    if (DOM.statTotalChapters) DOM.statTotalChapters.textContent = String(totalChapters);
    if (DOM.statPracticeQuestions) DOM.statPracticeQuestions.textContent = `${BIOLOGY_QUESTION_BANK.length}+`;
    if (DOM.statCompletedChapters) DOM.statCompletedChapters.textContent = String(completedCount);
    if (DOM.statBestQuizScore) DOM.statBestQuizScore.textContent = bestScoreText;

    // Analytics section
    if (DOM.analyticsTotalChapters) DOM.analyticsTotalChapters.textContent = String(totalChapters);
    if (DOM.analyticsCompleted) DOM.analyticsCompleted.textContent = String(completedCount);
    if (DOM.analyticsInProgress) DOM.analyticsInProgress.textContent = String(inProgressCount);
    if (DOM.analyticsBestScore) DOM.analyticsBestScore.textContent = bestScoreText;
  }

  function updateContinueStudyCard() {
    const chapter = BIOLOGY_CHAPTERS.find(ch => ch.id === state.lastStudiedChapterId) || BIOLOGY_CHAPTERS[0];
    if (!chapter) return;

    const status = state.chapterProgress[chapter.id] || 'not-started';
    let percent = 0;
    if (status === 'completed') percent = 100;
    else if (status === 'in-progress') percent = 50;

    if (DOM.continueChapterTitle) {
      DOM.continueChapterTitle.textContent = chapter.title;
    }
    if (DOM.continueChapterProgressFill) {
      DOM.continueChapterProgressFill.style.width = `${percent}%`;
    }
    if (DOM.continueChapterPercentText) {
      DOM.continueChapterPercentText.textContent = `${percent}%`;
    }
    if (DOM.continueChapterBtn) {
      DOM.continueChapterBtn.href = chapter.filename;
      DOM.continueChapterBtn.innerHTML = status === 'completed' 
        ? `Review Chapter <i class="fa-solid fa-chevron-right"></i>`
        : `Continue Studying <i class="fa-solid fa-chevron-right"></i>`;
    }
  }

  // --------------------------------------------------------------------------
  // 9. CHAPTERS RENDERING & INTERACTIONS
  // --------------------------------------------------------------------------
  function getFilteredChapters() {
    const query = state.searchQuery.trim().toLowerCase();
    const category = state.selectedCategory;

    return BIOLOGY_CHAPTERS.filter(ch => {
      // Category check
      if (category !== 'All' && ch.category !== category) {
        return false;
      }

      // Search query check
      if (!query) return true;

      const titleMatch = ch.title.toLowerCase().includes(query);
      const descMatch = ch.description.toLowerCase().includes(query);
      const catMatch = ch.category.toLowerCase().includes(query);
      const tagsMatch = ch.tags.some(tag => tag.toLowerCase().includes(query));

      return titleMatch || descMatch || catMatch || tagsMatch;
    });
  }

  function renderChaptersGrid() {
    if (!DOM.chaptersGrid) return;

    const chapters = getFilteredChapters();

    if (chapters.length === 0) {
      DOM.chaptersGrid.innerHTML = `
        <div class="chapters-empty-state">
          <div class="empty-state-icon"><i class="fa-solid fa-microscope"></i></div>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">No Matching Chapters Found</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button class="btn btn-secondary btn-sm" id="resetFiltersBtn">
            <i class="fa-solid fa-rotate-left"></i> Reset Search Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.searchQuery = '';
          state.selectedCategory = 'All';
          if (DOM.chapterSearchInput) DOM.chapterSearchInput.value = '';
          if (DOM.chapterSearchClear) DOM.chapterSearchClear.style.display = 'none';

          if (DOM.filterTabsRow) {
            DOM.filterTabsRow.querySelectorAll('.filter-tab').forEach(tab => {
              tab.classList.toggle('active', tab.getAttribute('data-category') === 'All');
              tab.setAttribute('aria-selected', tab.getAttribute('data-category') === 'All');
            });
          }
          renderChaptersGrid();
        });
      }
      return;
    }

    DOM.chaptersGrid.innerHTML = chapters.map(ch => {
      const status = state.chapterProgress[ch.id] || 'not-started';
      let statusClass = 'not-started';
      let statusText = 'Not Started';

      if (status === 'completed') {
        statusClass = 'completed';
        statusText = 'Completed';
      } else if (status === 'in-progress') {
        statusClass = 'in-progress';
        statusText = 'In Progress';
      }

      const tagsHtml = ch.tags.map(t => `<span class="chapter-tag">${escapeHtml(t)}</span>`).join('');

      return `
        <article class="chapter-card" id="card-${ch.id}">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-num">CH ${ch.number}</span>
              <span class="status-badge ${statusClass}">
                <i class="fa-solid ${status === 'completed' ? 'fa-circle-check' : 'fa-circle-dot'}"></i>
                ${statusText}
              </span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div class="chapter-icon-wrap">
                <i class="fa-solid ${ch.icon}"></i>
              </div>
              <h3 class="chapter-title">${escapeHtml(ch.title)}</h3>
            </div>

            <p class="chapter-desc">${escapeHtml(ch.description)}</p>

            <div class="chapter-tags">
              ${tagsHtml}
            </div>
          </div>

          <div class="chapter-card-footer">
            <div class="chapter-actions-row">
              <a 
                href="${ch.filename}" 
                class="btn btn-primary btn-sm chapter-study-btn" 
                data-chapter-id="${ch.id}"
              >
                Study Chapter <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
              <button 
                class="chapter-toggle-btn ${status === 'completed' ? 'is-completed' : ''}" 
                data-chapter-id="${ch.id}" 
                title="${status === 'completed' ? 'Mark as In Progress' : 'Mark as Completed'}"
                aria-label="Toggle completion for ${escapeHtml(ch.title)}"
              >
                <i class="fa-solid ${status === 'completed' ? 'fa-circle-check' : 'fa-check'}"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    attachChapterCardEvents();
  }

  function attachChapterCardEvents() {
    if (!DOM.chaptersGrid) return;

    // Study Chapter Links
    DOM.chaptersGrid.querySelectorAll('.chapter-study-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.getAttribute('data-chapter-id');
        if (id) {
          state.lastStudiedChapterId = id;
          if (!state.chapterProgress[id] || state.chapterProgress[id] === 'not-started') {
            state.chapterProgress[id] = 'in-progress';
          }
          saveChapterProgress();
          renderDashboardStats();
          updateContinueStudyCard();
        }
      });
    });

    // Toggle Completion Button
    DOM.chaptersGrid.querySelectorAll('.chapter-toggle-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.getAttribute('data-chapter-id');
        if (!id) return;

        const current = state.chapterProgress[id] || 'not-started';
        const next = current === 'completed' ? 'in-progress' : 'completed';
        state.chapterProgress[id] = next;
        state.lastStudiedChapterId = id;

        saveChapterProgress();
        renderDashboardStats();
        renderChaptersGrid();
        updateContinueStudyCard();
      });
    });
  }

  function populateQuizTopicsDropdown() {
    if (!DOM.quizTopicSelect) return;

    const categories = Array.from(new Set(BIOLOGY_QUESTION_BANK.map(q => q.topic)));
    DOM.quizTopicSelect.innerHTML = `
      <option value="All">All Topics (Full MDCAT Syllabus)</option>
      ${categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('')}
    `;
  }

  // --------------------------------------------------------------------------
  // 10. QUIZ ENGINE & TIMER (Production Standard)
  // --------------------------------------------------------------------------
  function startQuiz() {
    // 1. Prepare quiz questions based on configuration
    let pool = [...BIOLOGY_QUESTION_BANK];

    // Filter by topic
    if (state.quizConfig.topic !== 'All') {
      pool = pool.filter(q => q.topic === state.quizConfig.topic);
    }

    // Filter by difficulty
    if (state.quizConfig.difficulty !== 'Mixed') {
      pool = pool.filter(q => q.difficulty === state.quizConfig.difficulty);
    }

    // Fallback if pool is empty
    if (pool.length === 0) {
      pool = [...BIOLOGY_QUESTION_BANK];
    }

    // Shuffle
    shuffleArray(pool);

    // Limit count
    const count = Math.min(state.quizConfig.questionCount, pool.length);
    const selected = pool.slice(0, count);

    // 2. Initialize active quiz state
    state.activeQuiz.questions = selected;
    state.activeQuiz.currentIndex = 0;
    state.activeQuiz.userAnswers = {};
    state.activeQuiz.score = 0;
    state.activeQuiz.timerSeconds = 0;
    state.activeQuiz.isAnswerChecked = false;

    // 3. Clear any existing timer interval
    stopQuizTimer();

    // 4. Start single timer interval
    startQuizTimer();

    // 5. Switch to Active Quiz View
    showQuizView('active');

    // 6. Render first question
    renderCurrentQuestion();
  }

  function startQuizTimer() {
    stopQuizTimer(); // Guard against multiple intervals

    state.activeQuiz.timerSeconds = 0;
    updateTimerDisplay();

    state.activeQuiz.timerInterval = setInterval(() => {
      state.activeQuiz.timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopQuizTimer() {
    if (state.activeQuiz.timerInterval) {
      clearInterval(state.activeQuiz.timerInterval);
      state.activeQuiz.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    if (!DOM.quizTimerText) return;
    const mins = Math.floor(state.activeQuiz.timerSeconds / 60);
    const secs = state.activeQuiz.timerSeconds % 60;
    DOM.quizTimerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function renderCurrentQuestion() {
    const qIndex = state.activeQuiz.currentIndex;
    const total = state.activeQuiz.questions.length;
    const question = state.activeQuiz.questions[qIndex];
    if (!question) return;

    // Header counter and topic
    if (DOM.quizCurrentNum) DOM.quizCurrentNum.textContent = String(qIndex + 1);
    if (DOM.quizTotalNum) DOM.quizTotalNum.textContent = String(total);
    if (DOM.quizTopicBadge) DOM.quizTopicBadge.textContent = question.topic;
    if (DOM.quizLiveScore) DOM.quizLiveScore.textContent = `Score: ${state.activeQuiz.score}`;

    // Progress bar
    if (DOM.quizProgressBar) {
      const progressPercent = Math.round(((qIndex) / total) * 100);
      DOM.quizProgressBar.style.width = `${progressPercent}%`;
    }

    // Question text
    if (DOM.quizQuestionText) {
      DOM.quizQuestionText.textContent = `${qIndex + 1}. ${question.question}`;
    }

    // Previous button state
    if (DOM.quizPrevBtn) {
      DOM.quizPrevBtn.disabled = qIndex === 0;
    }

    // Next button label & state
    const hasAnswered = state.activeQuiz.userAnswers[qIndex] !== undefined;
    if (DOM.quizNextBtn) {
      DOM.quizNextBtn.disabled = !hasAnswered;
      DOM.quizNextBtn.innerHTML = qIndex === total - 1 
        ? `Finish Quiz <i class="fa-solid fa-flag-checkered"></i>`
        : `Next Question <i class="fa-solid fa-arrow-right"></i>`;
    }

    // Render Answer Options
    if (DOM.quizAnswersContainer) {
      const alphabet = ['A', 'B', 'C', 'D'];
      const selectedIndex = state.activeQuiz.userAnswers[qIndex];

      DOM.quizAnswersContainer.innerHTML = question.options.map((optText, optIdx) => {
        let classes = 'quiz-answer-opt';
        const isSelected = selectedIndex === optIdx;

        if (hasAnswered) {
          if (optIdx === question.correctIndex) {
            classes += ' correct';
          } else if (isSelected && optIdx !== question.correctIndex) {
            classes += ' wrong';
          }
        }

        return `
          <button 
            class="${classes}" 
            data-opt-index="${optIdx}"
            ${hasAnswered ? 'disabled' : ''}
          >
            <span class="opt-prefix">${alphabet[optIdx]}</span>
            <span>${escapeHtml(optText)}</span>
          </button>
        `;
      }).join('');

      // Attach option select events
      DOM.quizAnswersContainer.querySelectorAll('.quiz-answer-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosenIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
          handleAnswerSelect(chosenIdx);
        });
      });
    }

    // Explanation panel
    if (DOM.quizExplanationPanel) {
      if (hasAnswered) {
        DOM.quizExplanationPanel.style.display = 'block';
        if (DOM.quizExplanationText) {
          DOM.quizExplanationText.textContent = question.explanation;
        }
      } else {
        DOM.quizExplanationPanel.style.display = 'none';
      }
    }
  }

  function handleAnswerSelect(optIndex) {
    const qIndex = state.activeQuiz.currentIndex;
    if (state.activeQuiz.userAnswers[qIndex] !== undefined) return; // already answered

    const question = state.activeQuiz.questions[qIndex];
    state.activeQuiz.userAnswers[qIndex] = optIndex;

    const isCorrect = optIndex === question.correctIndex;
    if (isCorrect) {
      state.activeQuiz.score++;
    }

    // Re-render current question to reveal correct/wrong and explanation
    renderCurrentQuestion();
  }

  function nextQuizQuestion() {
    const total = state.activeQuiz.questions.length;
    if (state.activeQuiz.currentIndex < total - 1) {
      state.activeQuiz.currentIndex++;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function prevQuizQuestion() {
    if (state.activeQuiz.currentIndex > 0) {
      state.activeQuiz.currentIndex--;
      renderCurrentQuestion();
    }
  }

  function finishQuiz() {
    stopQuizTimer();

    const total = state.activeQuiz.questions.length;
    const correct = state.activeQuiz.score;
    const wrong = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Update state stats
    state.quizStats.attempts++;
    state.quizStats.totalQuestionsAnswered += total;
    state.quizStats.totalCorrect += correct;
    if (accuracy > state.quizStats.bestScore) {
      state.quizStats.bestScore = accuracy;
    }
    saveQuizStats();
    renderDashboardStats();

    // Render result view
    if (DOM.resultScorePercent) {
      DOM.resultScorePercent.textContent = `${accuracy}%`;
    }
    if (DOM.resStatCorrect) DOM.resStatCorrect.textContent = String(correct);
    if (DOM.resStatWrong) DOM.resStatWrong.textContent = String(wrong);
    if (DOM.resStatAccuracy) DOM.resStatAccuracy.textContent = `${accuracy}%`;
    if (DOM.resStatAttempted) DOM.resStatAttempted.textContent = `${total}/${total}`;

    // Animate circular progress bar
    if (DOM.resultScoreCircleBar) {
      const radius = 70;
      const circumference = 2 * Math.PI * radius; // ~440
      const offset = circumference - (accuracy / 100) * circumference;
      DOM.resultScoreCircleBar.style.strokeDashoffset = String(offset);
    }

    showQuizView('result');
  }

  function renderReviewView() {
    if (!DOM.reviewAnswersList) return;

    const alphabet = ['A', 'B', 'C', 'D'];
    DOM.reviewAnswersList.innerHTML = state.activeQuiz.questions.map((q, idx) => {
      const userChosen = state.activeQuiz.userAnswers[idx];
      const isCorrect = userChosen === q.correctIndex;

      const optionsSummary = q.options.map((optText, optIdx) => {
        let optClass = 'review-opt-line';
        let badge = '';

        if (optIdx === q.correctIndex) {
          optClass += ' is-correct';
          badge = '<span style="color: var(--emerald-primary);"><i class="fa-solid fa-check"></i> Correct</span>';
        } else if (optIdx === userChosen) {
          optClass += ' is-user';
          badge = '<span style="color: var(--coral-danger);"><i class="fa-solid fa-xmark"></i> Your Pick</span>';
        }

        return `
          <div class="${optClass}">
            <span><strong>${alphabet[optIdx]}.</strong> ${escapeHtml(optText)}</span>
            <span>${badge}</span>
          </div>
        `;
      }).join('');

      return `
        <div class="review-card ${isCorrect ? 'correct' : 'wrong'}">
          <div class="review-card-top">
            <span class="review-q-num">Question ${idx + 1} • ${escapeHtml(q.topic)}</span>
            <span class="review-status-pill ${isCorrect ? 'correct' : 'wrong'}">
              <i class="fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}"></i>
              ${isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
            </span>
          </div>

          <div class="review-q-text">${escapeHtml(q.question)}</div>
          <div class="review-options-summary">${optionsSummary}</div>

          <div class="review-explanation">
            <strong style="color: var(--emerald-primary); display: block; margin-bottom: 0.25rem;">
              <i class="fa-solid fa-book-medical"></i> Scientific Rationale:
            </strong>
            ${escapeHtml(q.explanation)}
          </div>
        </div>
      `;
    }).join('');

    showQuizView('review');
  }

  function showQuizView(viewName) {
    if (DOM.quizIntroView) DOM.quizIntroView.style.display = viewName === 'intro' ? 'grid' : 'none';
    if (DOM.quizActiveView) DOM.quizActiveView.style.display = viewName === 'active' ? 'flex' : 'none';
    if (DOM.quizResultView) DOM.quizResultView.style.display = viewName === 'result' ? 'block' : 'none';
    if (DOM.quizReviewView) DOM.quizReviewView.style.display = viewName === 'review' ? 'flex' : 'none';
  }

  // --------------------------------------------------------------------------
  // 11. MODAL & DRAWER HELPERS
  // --------------------------------------------------------------------------
  function openResetModal() {
    if (DOM.resetModalBackdrop) {
      DOM.resetModalBackdrop.classList.add('open');
    }
  }

  function closeResetModal() {
    if (DOM.resetModalBackdrop) {
      DOM.resetModalBackdrop.classList.remove('open');
    }
  }

  function toggleMobileDrawer() {
    if (!DOM.mobileDrawer) return;
    const isOpen = DOM.mobileDrawer.classList.toggle('open');
    if (DOM.mobileToggleBtn) {
      DOM.mobileToggleBtn.setAttribute('aria-expanded', String(isOpen));
    }
  }

  function closeMobileDrawer() {
    if (DOM.mobileDrawer) {
      DOM.mobileDrawer.classList.remove('open');
    }
    if (DOM.mobileToggleBtn) {
      DOM.mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // --------------------------------------------------------------------------
  // 12. UTILITY FUNCTIONS
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // --------------------------------------------------------------------------
  // 13. EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Mobile Drawer
    if (DOM.mobileToggleBtn) {
      DOM.mobileToggleBtn.addEventListener('click', toggleMobileDrawer);
    }
    if (DOM.mobileDrawer) {
      DOM.mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
      });
    }

    // Chapters Search & Clear
    if (DOM.chapterSearchInput) {
      DOM.chapterSearchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        if (DOM.chapterSearchClear) {
          DOM.chapterSearchClear.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderChaptersGrid();
      });
    }

    if (DOM.chapterSearchClear) {
      DOM.chapterSearchClear.addEventListener('click', () => {
        state.searchQuery = '';
        if (DOM.chapterSearchInput) {
          DOM.chapterSearchInput.value = '';
          DOM.chapterSearchInput.focus();
        }
        DOM.chapterSearchClear.style.display = 'none';
        renderChaptersGrid();
      });
    }

    // Filter Tabs
    if (DOM.filterTabsRow) {
      DOM.filterTabsRow.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.filterTabsRow.querySelectorAll('.filter-tab').forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');

          state.selectedCategory = tab.getAttribute('data-category') || 'All';
          renderChaptersGrid();
        });
      });
    }

    // Daily Practice Card Button
    if (DOM.dailyPracticeBtn) {
      DOM.dailyPracticeBtn.addEventListener('click', () => {
        const quizSec = document.getElementById('quiz-section');
        if (quizSec) quizSec.scrollIntoView({ behavior: 'smooth' });
        startQuiz();
      });
    }

    // Quiz Configuration Buttons
    const countBtns = document.querySelectorAll('[data-quiz-count]');
    countBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.quizConfig.questionCount = parseInt(btn.getAttribute('data-quiz-count'), 10);
      });
    });

    const diffBtns = document.querySelectorAll('[data-quiz-diff]');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.quizConfig.difficulty = btn.getAttribute('data-quiz-diff');
      });
    });

    if (DOM.quizTopicSelect) {
      DOM.quizTopicSelect.addEventListener('change', e => {
        state.quizConfig.topic = e.target.value;
      });
    }

    // Quiz Actions
    if (DOM.startQuizBtn) {
      DOM.startQuizBtn.addEventListener('click', startQuiz);
    }
    if (DOM.quizNextBtn) {
      DOM.quizNextBtn.addEventListener('click', nextQuizQuestion);
    }
    if (DOM.quizPrevBtn) {
      DOM.quizPrevBtn.addEventListener('click', prevQuizQuestion);
    }

    // Result Actions
    if (DOM.reviewAnswersBtn) {
      DOM.reviewAnswersBtn.addEventListener('click', renderReviewView);
    }
    if (DOM.retakeQuizBtn) {
      DOM.retakeQuizBtn.addEventListener('click', startQuiz);
    }
    if (DOM.backToDashboardBtn) {
      DOM.backToDashboardBtn.addEventListener('click', () => {
        showQuizView('intro');
        const chapSec = document.getElementById('chapters-section');
        if (chapSec) chapSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (DOM.backToResultsBtn) {
      DOM.backToResultsBtn.addEventListener('click', () => {
        showQuizView('result');
      });
    }

    // Reset Progress Modal
    if (DOM.resetProgressBtn) {
      DOM.resetProgressBtn.addEventListener('click', openResetModal);
    }
    if (DOM.cancelResetBtn) {
      DOM.cancelResetBtn.addEventListener('click', closeResetModal);
    }
    if (DOM.confirmResetBtn) {
      DOM.confirmResetBtn.addEventListener('click', resetAllBiologyProgress);
    }
    if (DOM.resetModalBackdrop) {
      DOM.resetModalBackdrop.addEventListener('click', e => {
        if (e.target === DOM.resetModalBackdrop) {
          closeResetModal();
        }
      });
    }

    // Escape key modal/drawer closer
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeResetModal();
        closeMobileDrawer();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 14. BOOTSTRAP INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    cacheDOMElements();
    loadStoredData();
    initTheme();
    renderDashboardStats();
    updateContinueStudyCard();
    populateQuizTopicsDropdown();
    renderChaptersGrid();
    setupEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
