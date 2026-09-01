/**
 * EduNexa AI - MDCAT Biology Platform Core Engine
 * Manages Chapter Library, Search/Filter, LocalStorage Progress & Interactive Biology Quiz
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. BIOLOGY CHAPTERS REGISTRY (MDCAT Curriculum)
  // =========================================================================
  const BIOLOGY_CHAPTERS = [
    {
      id: 'cell-biology',
      number: '01',
      title: 'Cell Biology',
      category: 'Cell Biology',
      filename: 'cell-biology.html',
      icon: 'fa-dna',
      description: 'Ultra-structure of eukaryotic & prokaryotic cells, fluid mosaic membrane model, organelle functions, and cytoplasmic streaming.',
      tags: ['Organelles', 'Membranes', 'Cytoskeleton', 'Transport']
    },
    {
      id: 'biological-molecules',
      number: '02',
      title: 'Biological Molecules',
      category: 'Cell Biology',
      filename: 'biological-molecules.html',
      icon: 'fa-cubes-stacked',
      description: 'Chemical basis of life: carbohydrates, lipids, proteins (primary to quaternary structure), nucleic acids, and water properties.',
      tags: ['Proteins', 'Carbohydrates', 'Lipids', 'Nucleic Acids']
    },
    {
      id: 'enzymes',
      number: '03',
      title: 'Enzymes & Catalysis',
      category: 'Cell Biology',
      filename: 'enzymes.html',
      icon: 'fa-bolt',
      description: 'Enzyme kinetics, activation energy, induced-fit mechanism, cofactors, prosthetic groups, and competitive/non-competitive inhibitors.',
      tags: ['Active Site', 'Inhibition', 'Kinetics', 'Cofactors']
    },
    {
      id: 'bioenergetics',
      number: '04',
      title: 'Bioenergetics',
      category: 'Cell Biology',
      filename: 'bioenergetics.html',
      icon: 'fa-sun-plant-wilt',
      description: 'Photosynthesis (light reactions, cyclic/non-cyclic photophosphorylation, Calvin cycle) and cellular respiration (glycolysis, Krebs, ETC).',
      tags: ['Photosynthesis', 'Glycolysis', 'Krebs Cycle', 'ATP Synthase']
    },
    {
      id: 'biodiversity-acellular',
      number: '05',
      title: 'Biodiversity & Acellular Life',
      category: 'Ecology & Biotech',
      filename: 'biodiversity.html',
      icon: 'fa-virus-covid',
      description: 'Viral structures, lytic vs lysogenic cycles, retroviruses (HIV), hepatitis viruses, prions, viroids, and bacterial classification.',
      tags: ['Viruses', 'Bacteria', 'Lytic Cycle', 'Bacteriophages']
    },
    {
      id: 'coordination-and-control',
      number: '06',
      title: 'Coordination and Control',
      category: 'Human Physiology',
      filename: 'coordination-and-control.html',
      icon: 'fa-brain',
      description: 'Nervous system, resting membrane potential, action potential, synaptic transmission, sensory receptors, reflex arcs, and endocrine glands.',
      tags: ['Neurons', 'Action Potential', 'Synapse', 'Hormones']
    },
    {
      id: 'reproduction',
      number: '07',
      title: 'Human Reproduction & Development',
      category: 'Human Physiology',
      filename: 'reproduction.html',
      icon: 'fa-person-half-dress',
      description: 'Male & female reproductive systems, spermatogenesis, oogenesis, hormonal control of menstrual cycle, fertilization, and embryogenesis.',
      tags: ['Gametogenesis', 'Menstrual Cycle', 'Fertilization', 'Placenta']
    },
    {
      id: 'support-and-movement',
      number: '08',
      title: 'Support and Movement',
      category: 'Human Physiology',
      filename: 'support-and-movement.html',
      icon: 'fa-bone',
      description: 'Human skeletal anatomy, joints, cartilage, microscopic muscle architecture, sliding filament model, and excitation-contraction coupling.',
      tags: ['Sarcomere', 'Actin & Myosin', 'Joints', 'Skeletal System']
    },
    {
      id: 'inheritance',
      number: '09',
      title: 'Variation and Genetics',
      category: 'Genetics & Evolution',
      filename: 'inheritance.html',
      icon: 'fa-code-branch',
      description: 'Mendelian genetics, monohybrid/dihybrid crosses, incomplete dominance, codominance, multiple alleles, sex linkage, and epistasis.',
      tags: ['Mendel Ratios', 'Sex Linkage', 'Codominance', 'Pedigree']
    },
    {
      id: 'evolution',
      number: '10',
      title: 'Evolution & Population Genetics',
      category: 'Genetics & Evolution',
      filename: 'evolution.html',
      icon: 'fa-timeline',
      description: 'Darwinian natural selection, evidence of evolution (homology/analogy), Hardy-Weinberg equilibrium principle, and speciation.',
      tags: ['Natural Selection', 'Hardy-Weinberg', 'Homology', 'Speciation']
    },
    {
      id: 'homeostasis',
      number: '11',
      title: 'Homeostasis & Excretion',
      category: 'Human Physiology',
      filename: 'homeostasis.html',
      icon: 'fa-temperature-half',
      description: 'Thermoregulation, osmoregulation, nephron microanatomy, glomerular filtration, tubular reabsorption, and countercurrent multiplier.',
      tags: ['Nephron', 'Kidneys', 'Osmoregulation', 'ADH & Aldosterone']
    },
    {
      id: 'biotechnology',
      number: '12',
      title: 'Biotechnology & Genetic Engineering',
      category: 'Ecology & Biotech',
      filename: 'biotechnology.html',
      icon: 'fa-flask-vial',
      description: 'Recombinant DNA technology, restriction endonucleases, molecular cloning vectors, PCR thermal cycles, and gel electrophoresis.',
      tags: ['PCR', 'Gel Electrophoresis', 'Plasmids', 'Restriction Enzymes']
    },
    {
      id: 'immunity',
      number: '13',
      title: 'Immunity & Host Defense',
      category: 'Human Physiology',
      filename: 'immunity.html',
      icon: 'fa-shield-halved',
      description: 'Innate vs adaptive immunity, humoral vs cell-mediated response, B/T lymphocyte maturation, antibodies (immunoglobulins), and vaccination.',
      tags: ['Antibodies', 'T-Cells', 'B-Cells', 'Vaccination']
    },
    {
      id: 'circulation',
      number: '14',
      title: 'Circulation & Gas Exchange',
      category: 'Human Physiology',
      filename: 'circulation.html',
      icon: 'fa-heart-pulse',
      description: 'Cardiac cycle, conductive system of heart, blood pressure regulation, capillary fluid dynamics, and hemoglobin dissociation kinetics.',
      tags: ['Cardiac Cycle', 'ECG', 'Hemoglobin', 'Blood Vessels']
    }
  ];

  // =========================================================================
  // 2. BIOLOGY MCQ QUESTION BANK (Comprehensive MDCAT Standard)
  // =========================================================================
  const BIOLOGY_QUESTION_BANK = [
    {
      id: 1,
      chapter: 'Cell Biology',
      difficulty: 'Easy',
      question: 'Which of the following cellular organelles is primarily responsible for the synthesis of lipids and detoxification of drugs?',
      options: [
        'Rough Endoplasmic Reticulum',
        'Smooth Endoplasmic Reticulum',
        'Golgi Apparatus',
        'Lysosomes'
      ],
      answer: 1,
      explanation: 'The Smooth Endoplasmic Reticulum (SER) is the primary site for lipid and steroid synthesis, carbohydrate metabolism, and drug/toxin detoxification in liver hepatocytes.'
    },
    {
      id: 2,
      chapter: 'Cell Biology',
      difficulty: 'Medium',
      question: 'According to the Singer-Nicolson Fluid Mosaic Model, what gives the cell membrane its quasi-fluid structure?',
      options: [
        'Peripheral proteins arranged in rigid continuous layers',
        'Phospholipid bilayer with lateral mobility of lipids and proteins',
        'High concentration of cellulose fibers in the hydrophobic core',
        'Cross-linked carbohydrates on the cytoplasmic surface'
      ],
      answer: 1,
      explanation: 'The Fluid Mosaic Model describes the plasma membrane as a dynamic phospholipid bilayer in which lipids and integral proteins can move laterally, conferring fluidity.'
    },
    {
      id: 3,
      chapter: 'Biological Molecules',
      difficulty: 'Easy',
      question: 'Which type of covalent linkage joins two amino acids together in a primary polypeptide chain?',
      options: [
        'Phosphodiester bond',
        'Glycosidic bond',
        'Peptide bond',
        'Ester linkage'
      ],
      answer: 2,
      explanation: 'A peptide bond (-CO-NH-) is formed between the alpha-carboxyl group of one amino acid and the alpha-amino group of an adjacent amino acid via a condensation reaction.'
    },
    {
      id: 4,
      chapter: 'Biological Molecules',
      difficulty: 'Hard',
      question: 'Which secondary protein structure is primarily stabilized by regular hydrogen bonds formed between carbonyl oxygens and amide hydrogens spaced four residues apart?',
      options: [
        'Beta-pleated sheet',
        'Alpha-helix',
        'Disulfide bridges',
        'Triple collagen helix'
      ],
      answer: 1,
      explanation: 'An alpha-helix is a right-handed coiled conformation stabilized by hydrogen bonds between the C=O of residue (n) and the N-H of residue (n+4) along the peptide backbone.'
    },
    {
      id: 5,
      chapter: 'Enzymes & Catalysis',
      difficulty: 'Medium',
      question: 'How does a competitive enzyme inhibitor alter the kinetic parameters of an enzymatic reaction?',
      options: [
        'Decreases Vmax while keeping Km constant',
        'Increases Km while Vmax remains unchanged at saturating substrate levels',
        'Decreases both Km and Vmax equally',
        'Increases both Km and Vmax proportionally'
      ],
      answer: 1,
      explanation: 'Competitive inhibitors bind reversibly to the catalytic active site. They increase the apparent Km (reducing enzyme affinity) without altering Vmax because high substrate concentrations overcome the inhibitor.'
    },
    {
      id: 6,
      chapter: 'Enzymes & Catalysis',
      difficulty: 'Easy',
      question: 'The non-protein organic component that is tightly or permanently bound to an enzyme is termed a:',
      options: [
        'Coenzyme',
        'Apoenzyme',
        'Prosthetic group',
        'Inorganic activator'
      ],
      answer: 2,
      explanation: 'A prosthetic group is a firmly attached, non-protein organic cofactor (such as heme in catalase or FAD in succinate dehydrogenase).'
    },
    {
      id: 7,
      chapter: 'Bioenergetics',
      difficulty: 'Medium',
      question: 'In aerobic cellular respiration, where does the conversion of Pyruvate into Acetyl-CoA (Link Reaction) occur?',
      options: [
        'Cytosol',
        'Mitochondrial Matrix',
        'Inner Mitochondrial Membrane',
        'Intermembrane Space'
      ],
      answer: 1,
      explanation: 'Pyruvate is transported from the cytosol across mitochondrial membranes into the mitochondrial matrix, where the pyruvate dehydrogenase complex oxidizes it to Acetyl-CoA and CO2.'
    },
    {
      id: 8,
      chapter: 'Bioenergetics',
      difficulty: 'Hard',
      question: 'During the light-dependent reactions of photosynthesis, what provides the electrons to replace those lost by Photo-system II (P680)?',
      options: [
        'Photolysis of water molecules (H2O)',
        'Oxidation of NADPH',
        'Plastocyanin electron shuttle',
        'Carbon dioxide fixation'
      ],
      answer: 0,
      explanation: 'The oxygen-evolving complex of Photosystem II catalyzes the photolysis of water (2H2O -> 4H+ + 4e- + O2), supplying replacement electrons to oxidized P680+ reaction centers.'
    },
    {
      id: 9,
      chapter: 'Biodiversity & Acellular Life',
      difficulty: 'Medium',
      question: 'Which enzyme is unique to Retroviruses (such as HIV) for converting single-stranded RNA into double-stranded proviral DNA?',
      options: [
        'DNA Polymerase III',
        'RNA-dependent DNA Polymerase (Reverse Transcriptase)',
        'Topoisomerase',
        'DNA Ligase'
      ],
      answer: 1,
      explanation: 'Reverse transcriptase is an RNA-dependent DNA polymerase carried by retroviruses that transcribes viral genomic RNA into cDNA for integration into host chromosomal DNA.'
    },
    {
      id: 10,
      chapter: 'Coordination and Control',
      difficulty: 'Medium',
      question: 'What event triggers the rapid depolarization phase of a neuronal action potential?',
      options: [
        'Opening of voltage-gated Potassium (K+) channels',
        'Rapid influx of Sodium (Na+) ions through voltage-gated channels',
        'Active extrusion of Sodium ions by Na+/K+ ATPase',
        'Inhibition of Calcium (Ca2+) channels'
      ],
      answer: 1,
      explanation: 'When threshold potential (~ -55 mV) is reached, voltage-gated Na+ channels rapidly open, causing a massive influx of Na+ down its electrochemical gradient, depolarizing the membrane to ~ +30 mV.'
    },
    {
      id: 11,
      chapter: 'Coordination and Control',
      difficulty: 'Hard',
      question: 'Which anterior pituitary hormone directly stimulates Leydig (interstitial) cells of the testes to synthesize testosterone?',
      options: [
        'Follicle Stimulating Hormone (FSH)',
        'Luteinizing Hormone (LH / ICSH)',
        'Prolactin (PRL)',
        'Adrenocorticotropic Hormone (ACTH)'
      ],
      answer: 1,
      explanation: 'Luteinizing Hormone (LH, formerly Interstitial Cell Stimulating Hormone or ICSH) stimulates interstitial Leydig cells in male testes to synthesize and secrete androgens (testosterone).'
    },
    {
      id: 12,
      chapter: 'Human Reproduction & Development',
      difficulty: 'Medium',
      question: 'The surge of which hormone from the anterior pituitary directly induces ovulation around day 14 of the human menstrual cycle?',
      options: [
        'Progesterone',
        'Estrogen (Estradiol)',
        'Luteinizing Hormone (LH)',
        'Human Chorionic Gonadotropin (hCG)'
      ],
      answer: 2,
      explanation: 'High estrogen levels from the mature Graafian follicle exert positive feedback on the pituitary, causing a pre-ovulatory LH surge that triggers follicle rupture and secondary oocyte release.'
    },
    {
      id: 13,
      chapter: 'Support and Movement',
      difficulty: 'Medium',
      question: 'According to the Sliding Filament Model of muscle contraction, Calcium ions bind to which protein to expose the active myosin-binding sites on actin?',
      options: [
        'Tropomyosin',
        'Troponin C',
        'Myosin light chain',
        'Creatine kinase'
      ],
      answer: 1,
      explanation: 'Ca2+ released from the sarcoplasmic reticulum binds to Troponin C. This induces a conformational shift that pulls Tropomyosin away from actin active sites, allowing myosin cross-bridge binding.'
    },
    {
      id: 14,
      chapter: 'Support and Movement',
      difficulty: 'Easy',
      question: 'The functional microscopic contractile unit situated between two consecutive Z-lines in skeletal muscle myofibrils is called a:',
      options: [
        'Sarcomere',
        'Sarcolemma',
        'Sarcoplasm',
        'Sarcoplasmic reticulum'
      ],
      answer: 0,
      explanation: 'A sarcomere is the repeating structural and functional contractile unit of striated muscle tissue bounded between two adjacent Z-discs.'
    },
    {
      id: 15,
      chapter: 'Variation and Genetics',
      difficulty: 'Medium',
      question: 'In a standard Mendelian dihybrid cross (AaBb x AaBb) involving independent assortment, what is the expected phenotypic ratio in the F2 generation?',
      options: [
        '3 : 1',
        '9 : 3 : 3 : 1',
        '1 : 2 : 1',
        '9 : 7'
      ],
      answer: 1,
      explanation: 'Mendel\'s Law of Independent Assortment predicts a 9:3:3:1 phenotypic ratio (9 dominant-dominant, 3 dominant-recessive, 3 recessive-dominant, 1 recessive-recessive).'
    },
    {
      id: 16,
      chapter: 'Variation and Genetics',
      difficulty: 'Hard',
      question: 'Red-Green color blindness is an X-linked recessive trait. If a color-blind father and a homozygous normal mother have children, what percentage of their daughters will be carriers?',
      options: [
        '0%',
        '50%',
        '100%',
        '25%'
      ],
      answer: 2,
      explanation: 'The father provides an X chromosome with the recessive mutation (X^c) to all his daughters, while the mother donates a normal X (X^C). Thus, 100% of daughters are heterozygous carriers (X^C X^c).'
    },
    {
      id: 17,
      chapter: 'Evolution & Population Genetics',
      difficulty: 'Hard',
      question: 'In a population at Hardy-Weinberg equilibrium, if the frequency of homozygous recessive individuals (q^2) is 0.09, what is the frequency of heterozygous carriers (2pq)?',
      options: [
        '0.42',
        '0.70',
        '0.21',
        '0.49'
      ],
      answer: 0,
      explanation: 'q^2 = 0.09 -> q = 0.3. Since p + q = 1, p = 0.7. The carrier frequency 2pq = 2 * (0.7) * (0.3) = 0.42 (42%).'
    },
    {
      id: 18,
      chapter: 'Homeostasis & Excretion',
      difficulty: 'Medium',
      question: 'Antidiuretic Hormone (ADH / Vasopressin) increases water reabsorption in the kidney primarily by inserting which water channels into collecting duct cells?',
      options: [
        'Aquaporin-2',
        'Voltage-gated chloride channels',
        'Sodium-glucose cotransporter 2 (SGLT2)',
        'Sodium-potassium-2chloride symporter'
      ],
      answer: 0,
      explanation: 'ADH binds V2 basolateral receptors, stimulating cAMP signaling that translocates Aquaporin-2 water channels to the apical membrane of renal collecting duct principal cells.'
    },
    {
      id: 19,
      chapter: 'Biotechnology & Genetic Engineering',
      difficulty: 'Medium',
      question: 'During the Polymerase Chain Reaction (PCR), what is the primary purpose of heating the reaction mixture to approximately 94°C-96°C?',
      options: [
        'Extension of primers by Taq polymerase',
        'Denaturation of double-stranded DNA into single strands',
        'Annealing of oligonucleotide primers',
        'Inactivation of dNTP precursors'
      ],
      answer: 1,
      explanation: 'The initial PCR thermal step (~94-96°C) breaks the hydrogen bonds between complementary base pairs, denaturing double-stranded template DNA into single strands.'
    },
    {
      id: 20,
      chapter: 'Immunity & Host Defense',
      difficulty: 'Easy',
      question: 'Which class of immunoglobulins is the only antibody capable of crossing the human placenta to provide passive natural immunity to the fetus?',
      options: [
        'IgA',
        'IgM',
        'IgG',
        'IgE'
      ],
      answer: 2,
      explanation: 'Immunoglobulin G (IgG) is the predominant circulating antibody monomer in blood and is the only immunoglobulin capable of placental transfer via FcRn receptors.'
    },
    {
      id: 21,
      chapter: 'Circulation & Gas Exchange',
      difficulty: 'Medium',
      question: 'Which intrinsic pacemaker region exhibits the highest rate of spontaneous rhythmic electrical depolarization in a healthy human heart?',
      options: [
        'Sinoatrial (SA) Node',
        'Atrioventricular (AV) Node',
        'Bundle of His',
        'Purkinje Fibers'
      ],
      answer: 0,
      explanation: 'The SA Node (located in the right atrium wall near the superior vena cava) is the primary natural pacemaker because it possesses the fastest spontaneous intrinsic rhythm (60-100 bpm).'
    },
    {
      id: 22,
      chapter: 'Cell Biology',
      difficulty: 'Medium',
      question: 'Which organelle contains hydrolytic acid hydrolases with an optimum pH of around 4.5 to 5.0 for intracellular digestion?',
      options: [
        'Peroxisomes',
        'Lysosomes',
        'Glyoxysomes',
        'Vacuoles'
      ],
      answer: 1,
      explanation: 'Lysosomes contain over 40 acid hydrolases maintained at acidic pH (4.5-5.0) via vacuolar H+-ATPases for digesting phagocytosed pathogens and cellular organelles (autophagy).'
    },
    {
      id: 23,
      chapter: 'Biological Molecules',
      difficulty: 'Medium',
      question: 'Which nitrogenous base is found exclusively in RNA molecules and is replaced by Thymine in DNA?',
      options: [
        'Uracil',
        'Cytosine',
        'Adenine',
        'Guanine'
      ],
      answer: 0,
      explanation: 'Uracil (a pyrimidine base) pairs with Adenine in RNA transcripts. DNA utilizes methylated Thymine (5-methyluracil) instead.'
    },
    {
      id: 24,
      chapter: 'Enzymes & Catalysis',
      difficulty: 'Hard',
      question: 'The Michaelis constant (Km) of an enzyme represents:',
      options: [
        'The substrate concentration at which reaction rate is equal to half of Vmax',
        'The maximum initial velocity achieved at enzyme saturation',
        'The total turnover number of active sites per second',
        'The activation energy barrier in calories per mole'
      ],
      answer: 0,
      explanation: 'Km is the substrate concentration [S] at which the catalytic reaction velocity reaches exactly half of maximum velocity (Vmax / 2). Lower Km indicates higher substrate affinity.'
    },
    {
      id: 25,
      chapter: 'Bioenergetics',
      difficulty: 'Medium',
      question: 'During non-cyclic photophosphorylation, what is the ultimate terminal electron acceptor in the thylakoid membrane electron transport chain?',
      options: [
        'Oxygen (O2)',
        'NADP+ (forming NADPH)',
        'Plastoquinone',
        'Cytochrome b6f'
      ],
      answer: 1,
      explanation: 'Electrons excited in PSI are transferred via ferredoxin to NADP+ reductase, reducing NADP+ and H+ into NADPH in the stroma.'
    }
  ];

  // =========================================================================
  // 3. STORAGE KEYS & STATE MANAGEMENT
  // =========================================================================
  const STORAGE_KEYS = {
    CHAPTER_PROGRESS: 'studymate_biology_chapters_v1',
    LAST_STUDIED_CHAPTER: 'studymate_biology_last_studied_v1',
    QUIZ_STATS: 'studymate_biology_quiz_stats_v1',
    QUIZ_HISTORY: 'studymate_biology_quiz_history_v1'
  };

  // State object
  const state = {
    searchQuery: '',
    selectedCategory: 'All',
    chapterProgress: {}, // { [chapterId]: 'not-started' | 'in-progress' | 'completed' }
    lastStudiedChapterId: null,
    quizStats: {
      quizzesCompleted: 0,
      bestScorePercent: 0,
      lastScorePercent: 0,
      totalQuestionsAttempted: 0
    },
    activeQuiz: {
      questions: [],
      currentIndex: 0,
      userAnswers: [], // [{ questionId, selectedIndex, isCorrect }]
      score: 0,
      isFinished: false,
      timerSeconds: 0,
      timerInterval: null
    }
  };

  // =========================================================================
  // 4. INITIALIZATION & DATA PERSISTENCE
  // =========================================================================
  function loadPersistedData() {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEYS.CHAPTER_PROGRESS);
      if (storedProgress) {
        state.chapterProgress = JSON.parse(storedProgress);
      } else {
        state.chapterProgress = {};
      }

      state.lastStudiedChapterId = localStorage.getItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER) || null;

      const storedStats = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
      if (storedStats) {
        state.quizStats = JSON.parse(storedStats);
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults:', e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAPTER_PROGRESS, JSON.stringify(state.chapterProgress));
      if (state.lastStudiedChapterId) {
        localStorage.setItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER, state.lastStudiedChapterId);
      }
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(state.quizStats));
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
    }
  }

  // =========================================================================
  // 5. DOM ELEMENTS & CACHING
  // =========================================================================
  const DOM = {
    // Header & Mobile Nav
    mobileToggleBtn: document.getElementById('mobileToggleBtn'),
    mobileDrawer: document.getElementById('mobileDrawer'),

    // Hero Stats
    statTotalChapters: document.getElementById('statTotalChapters'),
    statPracticeQuestions: document.getElementById('statPracticeQuestions'),
    statCompletedChapters: document.getElementById('statCompletedChapters'),
    statBestQuizScore: document.getElementById('statBestQuizScore'),

    // Continue / Action Cards
    continueChapterTitle: document.getElementById('continueChapterTitle'),
    continueChapterBtn: document.getElementById('continueChapterBtn'),
    continueChapterProgressFill: document.getElementById('continueChapterProgressFill'),
    continueChapterPercentText: document.getElementById('continueChapterPercentText'),
    dailyPracticeBtn: document.getElementById('dailyPracticeBtn'),

    // Chapters Toolbar & Grid
    chapterSearchInput: document.getElementById('chapterSearchInput'),
    chapterSearchClear: document.getElementById('chapterSearchClear'),
    categoryFilterTabs: document.querySelectorAll('.filter-tab'),
    chaptersGrid: document.getElementById('chaptersGrid'),

    // Analytics Section
    analyticsTotalChapters: document.getElementById('analyticsTotalChapters'),
    analyticsCompleted: document.getElementById('analyticsCompleted'),
    analyticsInProgress: document.getElementById('analyticsInProgress'),
    analyticsBestScore: document.getElementById('analyticsBestScore'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    resetModalBackdrop: document.getElementById('resetModalBackdrop'),
    cancelResetBtn: document.getElementById('cancelResetBtn'),
    confirmResetBtn: document.getElementById('confirmResetBtn'),

    // Quiz Elements
    quizIntroView: document.getElementById('quizIntroView'),
    quizActiveView: document.getElementById('quizActiveView'),
    quizResultView: document.getElementById('quizResultView'),
    quizReviewView: document.getElementById('quizReviewView'),

    // Quiz Setup Controls
    startQuizBtn: document.getElementById('startQuizBtn'),
    quizCountBtns: document.querySelectorAll('[data-quiz-count]'),
    quizDiffBtns: document.querySelectorAll('[data-quiz-diff]'),
    quizTopicSelect: document.getElementById('quizTopicSelect'),

    // Active Quiz
    quizCurrentNum: document.getElementById('quizCurrentNum'),
    quizTotalNum: document.getElementById('quizTotalNum'),
    quizTopicBadge: document.getElementById('quizTopicBadge'),
    quizLiveScore: document.getElementById('quizLiveScore'),
    quizProgressBar: document.getElementById('quizProgressBar'),
    quizQuestionText: document.getElementById('quizQuestionText'),
    quizAnswersContainer: document.getElementById('quizAnswersContainer'),
    quizExplanationPanel: document.getElementById('quizExplanationPanel'),
    quizExplanationText: document.getElementById('quizExplanationText'),
    quizPrevBtn: document.getElementById('quizPrevBtn'),
    quizNextBtn: document.getElementById('quizNextBtn'),

    // Quiz Results
    resultScorePercent: document.getElementById('resultScorePercent'),
    resultScoreCircleBar: document.getElementById('resultScoreCircleBar'),
    resStatCorrect: document.getElementById('resStatCorrect'),
    resStatWrong: document.getElementById('resStatWrong'),
    resStatAccuracy: document.getElementById('resStatAccuracy'),
    resStatAttempted: document.getElementById('resStatAttempted'),
    retakeQuizBtn: document.getElementById('retakeQuizBtn'),
    reviewAnswersBtn: document.getElementById('reviewAnswersBtn'),
    backToDashboardBtn: document.getElementById('backToDashboardBtn'),

    // Review View
    reviewAnswersList: document.getElementById('reviewAnswersList'),
    backToResultsBtn: document.getElementById('backToResultsBtn')
  };

  // =========================================================================
  // 6. CHAPTER RENDERING & FILTERING
  // =========================================================================
  function renderChapters() {
    if (!DOM.chaptersGrid) return;

    const filtered = BIOLOGY_CHAPTERS.filter(ch => {
      const matchCategory = state.selectedCategory === 'All' || ch.category === state.selectedCategory;
      const query = state.searchQuery.toLowerCase().trim();
      const matchQuery = !query ||
        ch.title.toLowerCase().includes(query) ||
        ch.description.toLowerCase().includes(query) ||
        ch.number.includes(query) ||
        ch.tags.some(t => t.toLowerCase().includes(query));

      return matchCategory && matchQuery;
    });

    if (filtered.length === 0) {
      DOM.chaptersGrid.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon"><i class="fa-solid fa-microscope"></i></div>
          <h3 class="empty-state-title">No matching chapters found</h3>
          <p class="empty-state-desc">Try clearing your search query or selecting a different subject category filter.</p>
          <button class="btn btn-secondary btn-sm" id="emptyResetSearchBtn">
            <i class="fa-solid fa-rotate-left"></i> Reset Filters
          </button>
        </div>
      `;
      const emptyBtn = document.getElementById('emptyResetSearchBtn');
      if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
          if (DOM.chapterSearchInput) DOM.chapterSearchInput.value = '';
          state.searchQuery = '';
          state.selectedCategory = 'All';
          updateFilterTabsUI();
          renderChapters();
        });
      }
      return;
    }

    DOM.chaptersGrid.innerHTML = filtered.map(ch => {
      const status = state.chapterProgress[ch.id] || 'not-started';
      let statusBadge = '';
      let progressPercent = 0;

      if (status === 'completed') {
        statusBadge = '<span class="status-badge completed"><i class="fa-solid fa-check"></i> Completed</span>';
        progressPercent = 100;
      } else if (status === 'in-progress') {
        statusBadge = '<span class="status-badge in-progress"><i class="fa-solid fa-spinner"></i> In Progress</span>';
        progressPercent = 50;
      } else {
        statusBadge = '<span class="status-badge not-started">Not Started</span>';
        progressPercent = 0;
      }

      const isCompleted = status === 'completed';

      return `
        <div class="chapter-card" id="card-${ch.id}">
          <div>
            <div class="chapter-card-top">
              <div class="chapter-icon-wrap">
                <i class="fa-solid ${ch.icon}"></i>
              </div>
              <span class="chapter-num-badge">Ch ${ch.number}</span>
            </div>
            
            <div class="chapter-card-content">
              <h3 class="chapter-title">${ch.title}</h3>
              <p class="chapter-desc">${ch.description}</p>
              
              <div class="chapter-tags-row">
                ${ch.tags.map(t => `<span class="chapter-tag">${t}</span>`).join('')}
              </div>
            </div>
          </div>

          <div>
            <div class="chapter-progress-section">
              <div class="chapter-progress-header">
                <span>Progress</span>
                ${statusBadge}
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
              </div>
            </div>

            <div class="chapter-actions-row">
              <a href="${ch.filename}" class="btn btn-primary btn-sm btn-study" data-chapter-id="${ch.id}" data-filename="${ch.filename}">
                <i class="fa-solid fa-book-open-reader"></i> Study Chapter
              </a>
              <button class="btn-mark-status ${isCompleted ? 'is-completed' : ''}" data-toggle-complete="${ch.id}" title="${isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}" aria-label="Mark chapter completed">
                <i class="fa-solid ${isCompleted ? 'fa-check-double' : 'fa-check'}"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach event listeners to chapter action buttons
    DOM.chaptersGrid.querySelectorAll('[data-chapter-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chId = btn.getAttribute('data-chapter-id');
        handleChapterStudyClick(chId);
      });
    });

    DOM.chaptersGrid.querySelectorAll('[data-toggle-complete]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const chId = btn.getAttribute('data-toggle-complete');
        toggleChapterCompletion(chId);
      });
    });
  }

  function handleChapterStudyClick(chapterId) {
    if (state.chapterProgress[chapterId] !== 'completed') {
      state.chapterProgress[chapterId] = 'in-progress';
    }
    state.lastStudiedChapterId = chapterId;
    saveProgress();
    updateDashboardStats();
  }

  function toggleChapterCompletion(chapterId) {
    const current = state.chapterProgress[chapterId];
    if (current === 'completed') {
      state.chapterProgress[chapterId] = 'in-progress';
    } else {
      state.chapterProgress[chapterId] = 'completed';
    }
    state.lastStudiedChapterId = chapterId;
    saveProgress();
    renderChapters();
    updateDashboardStats();
  }

  function updateFilterTabsUI() {
    DOM.categoryFilterTabs.forEach(tab => {
      const cat = tab.getAttribute('data-category');
      if (cat === state.selectedCategory) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 7. DASHBOARD STATISTICS & ACTION CARDS
  // =========================================================================
  function updateDashboardStats() {
    const totalChapters = BIOLOGY_CHAPTERS.length;
    let completedCount = 0;
    let inProgressCount = 0;

    Object.values(state.chapterProgress).forEach(st => {
      if (st === 'completed') completedCount++;
      else if (st === 'in-progress') inProgressCount++;
    });

    // Update Hero Stats
    if (DOM.statTotalChapters) DOM.statTotalChapters.textContent = totalChapters;
    if (DOM.statPracticeQuestions) DOM.statPracticeQuestions.textContent = BIOLOGY_QUESTION_BANK.length + '+';
    if (DOM.statCompletedChapters) DOM.statCompletedChapters.textContent = completedCount;
    if (DOM.statBestQuizScore) DOM.statBestQuizScore.textContent = `${state.quizStats.bestScorePercent}%`;

    // Update Analytics Section
    if (DOM.analyticsTotalChapters) DOM.analyticsTotalChapters.textContent = totalChapters;
    if (DOM.analyticsCompleted) DOM.analyticsCompleted.textContent = completedCount;
    if (DOM.analyticsInProgress) DOM.analyticsInProgress.textContent = inProgressCount;
    if (DOM.analyticsBestScore) DOM.analyticsBestScore.textContent = `${state.quizStats.bestScorePercent}%`;

    // Update "Continue Your Preparation" Card
    let targetChapter = null;
    if (state.lastStudiedChapterId) {
      targetChapter = BIOLOGY_CHAPTERS.find(c => c.id === state.lastStudiedChapterId);
    }
    if (!targetChapter) {
      targetChapter = BIOLOGY_CHAPTERS[0];
    }

    if (DOM.continueChapterTitle && targetChapter) {
      const isStarted = state.chapterProgress[targetChapter.id];
      if (isStarted === 'completed') {
        DOM.continueChapterTitle.innerHTML = `Completed: <span class="continue-chapter-name">${targetChapter.title}</span>`;
        DOM.continueChapterProgressFill.style.width = '100%';
        DOM.continueChapterPercentText.textContent = '100%';
      } else if (isStarted === 'in-progress') {
        DOM.continueChapterTitle.innerHTML = `Continue: <span class="continue-chapter-name">${targetChapter.title}</span>`;
        DOM.continueChapterProgressFill.style.width = '50%';
        DOM.continueChapterPercentText.textContent = '50%';
      } else {
        DOM.continueChapterTitle.innerHTML = `Start: <span class="continue-chapter-name">${targetChapter.title}</span>`;
        DOM.continueChapterProgressFill.style.width = '0%';
        DOM.continueChapterPercentText.textContent = '0%';
      }

      if (DOM.continueChapterBtn) {
        DOM.continueChapterBtn.href = targetChapter.filename;
        DOM.continueChapterBtn.onclick = () => handleChapterStudyClick(targetChapter.id);
      }
    }
  }

  // =========================================================================
  // 8. BIOLOGY QUIZ ENGINE
  // =========================================================================
  let quizConfig = {
    count: 20,
    difficulty: 'Mixed',
    topic: 'All'
  };

  function setupQuizTopicDropdown() {
    if (!DOM.quizTopicSelect) return;
    const categories = ['All Chapters', ...new Set(BIOLOGY_QUESTION_BANK.map(q => q.chapter))];
    DOM.quizTopicSelect.innerHTML = categories.map(cat => {
      const val = cat === 'All Chapters' ? 'All' : cat;
      return `<option value="${val}">${cat}</option>`;
    }).join('');
  }

  function startQuiz() {
    // 1. Filter questions by topic and difficulty
    let pool = [...BIOLOGY_QUESTION_BANK];

    if (quizConfig.topic !== 'All') {
      pool = pool.filter(q => q.chapter === quizConfig.topic);
    }

    if (quizConfig.difficulty !== 'Mixed') {
      pool = pool.filter(q => q.difficulty === quizConfig.difficulty);
    }

    // Fallback if filter returned too few
    if (pool.length === 0) {
      pool = [...BIOLOGY_QUESTION_BANK];
    }

    // Shuffle pool using Fisher-Yates
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Select subset based on chosen count
    const actualCount = Math.min(quizConfig.count, pool.length);
    const selectedQuestions = pool.slice(0, actualCount);

    // Initialize Quiz state
    state.activeQuiz = {
      questions: selectedQuestions,
      currentIndex: 0,
      userAnswers: new Array(selectedQuestions.length).fill(null),
      score: 0,
      isFinished: false,
      timerSeconds: 0,
      timerInterval: null
    };

    // Transition Views
    if (DOM.quizIntroView) DOM.quizIntroView.style.display = 'none';
    if (DOM.quizResultView) DOM.quizResultView.style.display = 'none';
    if (DOM.quizReviewView) DOM.quizReviewView.style.display = 'none';
    if (DOM.quizActiveView) DOM.quizActiveView.style.display = 'block';

    renderCurrentQuestion();
    DOM.quizActiveView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderCurrentQuestion() {
    const qState = state.activeQuiz;
    const currentQ = qState.questions[qState.currentIndex];
    if (!currentQ) return;

    // Update Header
    if (DOM.quizCurrentNum) DOM.quizCurrentNum.textContent = qState.currentIndex + 1;
    if (DOM.quizTotalNum) DOM.quizTotalNum.textContent = qState.questions.length;
    if (DOM.quizTopicBadge) DOM.quizTopicBadge.textContent = currentQ.chapter;
    if (DOM.quizLiveScore) DOM.quizLiveScore.textContent = `Score: ${qState.score}`;

    // Progress Bar
    const progressPercent = ((qState.currentIndex) / qState.questions.length) * 100;
    if (DOM.quizProgressBar) DOM.quizProgressBar.style.width = `${progressPercent}%`;

    // Question Text
    if (DOM.quizQuestionText) DOM.quizQuestionText.textContent = currentQ.question;

    // Previous answer state for this question
    const existingAnswer = qState.userAnswers[qState.currentIndex];
    const isAnswered = existingAnswer !== null;

    // Render Options
    const letters = ['A', 'B', 'C', 'D'];
    if (DOM.quizAnswersContainer) {
      DOM.quizAnswersContainer.innerHTML = currentQ.options.map((opt, idx) => {
        let btnClass = 'answer-option-btn';
        let statusIcon = '';

        if (isAnswered) {
          if (idx === currentQ.answer) {
            btnClass += ' correct-choice';
            statusIcon = '<i class="fa-solid fa-circle-check opt-status-icon"></i>';
          } else if (idx === existingAnswer.selectedIndex) {
            btnClass += ' wrong-choice';
            statusIcon = '<i class="fa-solid fa-circle-xmark opt-status-icon"></i>';
          }
        }

        return `
          <button class="${btnClass}" data-opt-index="${idx}" ${isAnswered ? 'disabled' : ''}>
            <span class="opt-prefix">${letters[idx]}</span>
            <span class="opt-text">${opt}</span>
            ${statusIcon}
          </button>
        `;
      }).join('');

      // Add click handlers if not answered
      if (!isAnswered) {
        DOM.quizAnswersContainer.querySelectorAll('.answer-option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const chosenIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
            handleAnswerSelection(chosenIdx);
          });
        });
      }
    }

    // Explanation panel
    if (DOM.quizExplanationPanel && DOM.quizExplanationText) {
      if (isAnswered) {
        DOM.quizExplanationPanel.style.display = 'block';
        DOM.quizExplanationText.textContent = currentQ.explanation;
      } else {
        DOM.quizExplanationPanel.style.display = 'none';
      }
    }

    // Navigation Buttons
    if (DOM.quizPrevBtn) {
      DOM.quizPrevBtn.disabled = qState.currentIndex === 0;
    }
    if (DOM.quizNextBtn) {
      if (qState.currentIndex === qState.questions.length - 1) {
        DOM.quizNextBtn.innerHTML = `Finish Quiz <i class="fa-solid fa-flag-checkered"></i>`;
      } else {
        DOM.quizNextBtn.innerHTML = `Next Question <i class="fa-solid fa-arrow-right"></i>`;
      }
      DOM.quizNextBtn.disabled = !isAnswered; // Must answer to proceed
    }
  }

  function handleAnswerSelection(selectedIndex) {
    const qState = state.activeQuiz;
    const currentQ = qState.questions[qState.currentIndex];
    const isCorrect = selectedIndex === currentQ.answer;

    if (isCorrect) {
      qState.score += 1;
    }

    qState.userAnswers[qState.currentIndex] = {
      questionId: currentQ.id,
      selectedIndex: selectedIndex,
      isCorrect: isCorrect
    };

    renderCurrentQuestion();
  }

  function handleQuizNext() {
    const qState = state.activeQuiz;
    if (qState.currentIndex < qState.questions.length - 1) {
      qState.currentIndex += 1;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function handleQuizPrev() {
    const qState = state.activeQuiz;
    if (qState.currentIndex > 0) {
      qState.currentIndex -= 1;
      renderCurrentQuestion();
    }
  }

  function finishQuiz() {
    const qState = state.activeQuiz;
    qState.isFinished = true;

    const totalQuestions = qState.questions.length;
    const correctCount = qState.score;
    const wrongCount = totalQuestions - correctCount;
    const percent = Math.round((correctCount / totalQuestions) * 100);

    // Update global persistent stats
    state.quizStats.quizzesCompleted += 1;
    state.quizStats.lastScorePercent = percent;
    state.quizStats.totalQuestionsAttempted += totalQuestions;
    if (percent > state.quizStats.bestScorePercent) {
      state.quizStats.bestScorePercent = percent;
    }
    saveProgress();
    updateDashboardStats();

    // Render Result View
    if (DOM.resultScorePercent) DOM.resultScorePercent.textContent = `${percent}%`;
    if (DOM.resStatCorrect) DOM.resStatCorrect.textContent = correctCount;
    if (DOM.resStatWrong) DOM.resStatWrong.textContent = wrongCount;
    if (DOM.resStatAccuracy) DOM.resStatAccuracy.textContent = `${percent}%`;
    if (DOM.resStatAttempted) DOM.resStatAttempted.textContent = `${totalQuestions}/${totalQuestions}`;

    // Animate circular score SVG
    if (DOM.resultScoreCircleBar) {
      const circumference = 440; // 2 * PI * r (r=70)
      const offset = circumference - (percent / 100) * circumference;
      DOM.resultScoreCircleBar.style.strokeDashoffset = offset;
    }

    // Switch Views
    if (DOM.quizActiveView) DOM.quizActiveView.style.display = 'none';
    if (DOM.quizResultView) DOM.quizResultView.style.display = 'block';
    DOM.quizResultView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderReviewView() {
    const qState = state.activeQuiz;
    if (!DOM.reviewAnswersList) return;

    DOM.reviewAnswersList.innerHTML = qState.questions.map((q, idx) => {
      const userAns = qState.userAnswers[idx];
      const isCorrect = userAns && userAns.isCorrect;
      const selectedIndex = userAns ? userAns.selectedIndex : -1;
      const letters = ['A', 'B', 'C', 'D'];

      return `
        <div class="review-item-card ${isCorrect ? 'is-correct' : 'is-wrong'}">
          <div class="review-card-top">
            <span class="q-topic-badge">${q.chapter}</span>
            <span class="review-status-pill ${isCorrect ? 'correct' : 'wrong'}">
              ${isCorrect ? '<i class="fa-solid fa-check"></i> Correct' : '<i class="fa-solid fa-xmark"></i> Incorrect'}
            </span>
          </div>

          <h4 class="review-q-text">Q${idx + 1}. ${q.question}</h4>

          <div class="review-answers-compare">
            ${!isCorrect && selectedIndex >= 0 ? `
              <div class="review-ans-line user-selected">
                <i class="fa-solid fa-xmark"></i> <strong>Your Answer:</strong> ${letters[selectedIndex]}. ${q.options[selectedIndex]}
              </div>
            ` : ''}
            <div class="review-ans-line correct-key">
              <i class="fa-solid fa-check"></i> <strong>Correct Answer:</strong> ${letters[q.answer]}. ${q.options[q.answer]}
            </div>
          </div>

          <div class="review-explanation-box">
            <strong><i class="fa-solid fa-circle-info"></i> Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    }).join('');

    if (DOM.quizResultView) DOM.quizResultView.style.display = 'none';
    if (DOM.quizReviewView) DOM.quizReviewView.style.display = 'block';
    DOM.quizReviewView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =========================================================================
  // 9. EVENT LISTENERS & BINDINGS
  // =========================================================================
  function initEventListeners() {
    // Mobile navigation drawer toggle
    if (DOM.mobileToggleBtn && DOM.mobileDrawer) {
      DOM.mobileToggleBtn.addEventListener('click', () => {
        DOM.mobileDrawer.classList.toggle('open');
      });
      DOM.mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => DOM.mobileDrawer.classList.remove('open'));
      });
    }

    // Search bar functionality
    if (DOM.chapterSearchInput) {
      DOM.chapterSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.chapterSearchClear) {
          DOM.chapterSearchClear.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderChapters();
      });
    }

    if (DOM.chapterSearchClear) {
      DOM.chapterSearchClear.addEventListener('click', () => {
        if (DOM.chapterSearchInput) {
          DOM.chapterSearchInput.value = '';
          DOM.chapterSearchInput.focus();
        }
        state.searchQuery = '';
        DOM.chapterSearchClear.style.display = 'none';
        renderChapters();
      });
    }

    // Category filter tabs
    DOM.categoryFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        state.selectedCategory = tab.getAttribute('data-category');
        updateFilterTabsUI();
        renderChapters();
      });
    });

    // Daily practice action button -> scroll & start quiz
    if (DOM.dailyPracticeBtn) {
      DOM.dailyPracticeBtn.addEventListener('click', () => {
        const quizSec = document.getElementById('quiz-section');
        if (quizSec) {
          quizSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Quiz count options
    DOM.quizCountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.quizCountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        quizConfig.count = parseInt(btn.getAttribute('data-quiz-count'), 10);
      });
    });

    // Quiz difficulty options
    DOM.quizDiffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.quizDiffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        quizConfig.difficulty = btn.getAttribute('data-quiz-diff');
      });
    });

    // Quiz topic select
    if (DOM.quizTopicSelect) {
      DOM.quizTopicSelect.addEventListener('change', (e) => {
        quizConfig.topic = e.target.value;
      });
    }

    // Quiz start button
    if (DOM.startQuizBtn) {
      DOM.startQuizBtn.addEventListener('click', startQuiz);
    }

    // Active quiz navigation
    if (DOM.quizNextBtn) {
      DOM.quizNextBtn.addEventListener('click', handleQuizNext);
    }
    if (DOM.quizPrevBtn) {
      DOM.quizPrevBtn.addEventListener('click', handleQuizPrev);
    }

    // Results screen buttons
    if (DOM.retakeQuizBtn) {
      DOM.retakeQuizBtn.addEventListener('click', () => {
        if (DOM.quizResultView) DOM.quizResultView.style.display = 'none';
        if (DOM.quizIntroView) DOM.quizIntroView.style.display = 'grid';
        DOM.quizIntroView.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (DOM.reviewAnswersBtn) {
      DOM.reviewAnswersBtn.addEventListener('click', renderReviewView);
    }

    if (DOM.backToResultsBtn) {
      DOM.backToResultsBtn.addEventListener('click', () => {
        if (DOM.quizReviewView) DOM.quizReviewView.style.display = 'none';
        if (DOM.quizResultView) DOM.quizResultView.style.display = 'block';
        DOM.quizResultView.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (DOM.backToDashboardBtn) {
      DOM.backToDashboardBtn.addEventListener('click', () => {
        if (DOM.quizResultView) DOM.quizResultView.style.display = 'none';
        if (DOM.quizIntroView) DOM.quizIntroView.style.display = 'grid';
        const chaptersSec = document.getElementById('chapters-section');
        if (chaptersSec) chaptersSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Reset Progress Modal
    if (DOM.resetProgressBtn && DOM.resetModalBackdrop) {
      DOM.resetProgressBtn.addEventListener('click', () => {
        DOM.resetModalBackdrop.classList.add('active');
      });
    }

    if (DOM.cancelResetBtn && DOM.resetModalBackdrop) {
      DOM.cancelResetBtn.addEventListener('click', () => {
        DOM.resetModalBackdrop.classList.remove('active');
      });
    }

    if (DOM.confirmResetBtn && DOM.resetModalBackdrop) {
      DOM.confirmResetBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.CHAPTER_PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.LAST_STUDIED_CHAPTER);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_STATS);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);

        state.chapterProgress = {};
        state.lastStudiedChapterId = null;
        state.quizStats = {
          quizzesCompleted: 0,
          bestScorePercent: 0,
          lastScorePercent: 0,
          totalQuestionsAttempted: 0
        };

        DOM.resetModalBackdrop.classList.remove('active');
        renderChapters();
        updateDashboardStats();
      });
    }
  }

  // =========================================================================
  // 10. SYSTEM BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    loadPersistedData();
    setupQuizTopicDropdown();
    renderChapters();
    updateDashboardStats();
    initEventListeners();
  });

})();
