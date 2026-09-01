/**
 * MDCAT PREP PRO — BIOCHEMISTRY CHAPTER ENGINE
 * Medical Science Edition • Complete Interactive Suite
 */

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_KEYS = {
    THEME: 'mdcat_bio_theme',
    BOOKMARKS: 'mdcat_bio_bookmarks',
    FONT_SIZE: 'mdcat_bio_fontsize'
  };

  // --- AUTHENTIC MDCAT QUIZ DATA (15 HIGH-YIELD QUESTIONS) ---
  const QUIZ_DATA = [
    {
      id: 1,
      question: "Which of the following carbohydrates is the major storage form in animals and is extensively branched?",
      options: ["Starch", "Glycogen", "Cellulose", "Chitin"],
      correct: 1,
      explanation: "Glycogen is the primary carbohydrate storage form in animals (stored mainly in liver and skeletal muscle). It is a polymer of α-D-glucose with frequent α-1,6-glycosidic branching points every 8-12 residues.",
      trap: "Starch is the storage form in plants; Glycogen is the storage form in animals."
    },
    {
      id: 2,
      question: "Sucrose is a non-reducing disaccharide composed of which two monosaccharide units joined by a glycosidic bond?",
      options: [
        "α-D-Glucose + α-D-Glucose",
        "β-D-Galactose + β-D-Glucose",
        "α-D-Glucose + β-D-Fructose",
        "D-Galactose + D-Fructose"
      ],
      correct: 2,
      explanation: "Sucrose (cane sugar) is formed by condensation of α-D-Glucose and β-D-Fructose via an α-1,2-glycosidic bond. Because both anomeric carbons are linked, it has no free aldehyde or ketone group (non-reducing).",
      trap: "Maltose = Glucose + Glucose; Lactose = Galactose + Glucose; Sucrose = Glucose + Fructose."
    },
    {
      id: 3,
      question: "Why are humans unable to digest cellulose despite having salivary and pancreatic amylases?",
      options: [
        "Cellulose contains toxic cross-linkages",
        "Human digestive enzymes lack cellulase to hydrolyze β-1,4-glycosidic bonds",
        "Cellulose is completely water soluble and bypasses the stomach",
        "Amylase only breaks peptide bonds"
      ],
      correct: 1,
      explanation: "Amylase only hydrolyzes α-1,4-glycosidic bonds. Cellulose is composed of β-D-glucose joined by β-1,4-glycosidic bonds, requiring cellulase (absent in humans). It functions as dietary fiber.",
      trap: "Humans lack cellulase enzyme; cellulose passes undigested as roughage."
    },
    {
      id: 4,
      question: "Which bond is formed between the carboxyl group (-COOH) of one amino acid and the amino group (-NH2) of another?",
      options: ["Phosphodiester bond", "Ester bond", "Peptide bond", "Glycosidic bond"],
      correct: 2,
      explanation: "A peptide bond (-CO-NH-) is formed between two amino acids via a condensation (dehydration) reaction, releasing one molecule of water.",
      trap: "Ester = Lipids, Phosphodiester = Nucleic Acids, Glycosidic = Carbohydrates, Peptide = Proteins."
    },
    {
      id: 5,
      question: "What primary stabilizing interaction maintains the secondary structure of proteins (such as the α-helix)?",
      options: [
        "Disulfide bridges between cysteine side chains",
        "Hydrogen bonding along the polypeptide backbone (-C=O ··· H-N-)",
        "Hydrophobic interactions of non-polar R groups",
        "Ionic attractions between acidic and basic side chains"
      ],
      correct: 1,
      explanation: "Secondary structure (α-helix and β-pleated sheet) is stabilized exclusively by hydrogen bonds between the backbone carbonyl oxygen and amide hydrogen. R-group interactions stabilize tertiary structure.",
      trap: "Secondary structure involves the peptide backbone; Tertiary involves variable R-group interactions."
    },
    {
      id: 6,
      question: "How do biological enzymes increase the rate of biochemical reactions?",
      options: [
        "By supplying external kinetic heat energy",
        "By lowering the activation energy (Ea) barrier",
        "By shifting the chemical equilibrium constant (Keq)",
        "By increasing the net standard free energy change (ΔG)"
      ],
      correct: 1,
      explanation: "Enzymes are catalysts that accelerate reaction rates strictly by lowering the activation energy (Ea) barrier, without altering the equilibrium constant (Keq) or overall ΔG.",
      trap: "Enzymes LOWER activation energy; they never alter ΔG or reaction equilibrium."
    },
    {
      id: 7,
      question: "What happens to human enzymes when heated significantly above their optimum temperature (> 55°C)?",
      options: [
        "Their activation energy permanently drops to zero",
        "They undergo thermal denaturation due to disruption of non-covalent tertiary bonds",
        "They convert irreversibly into monosaccharides",
        "They spontaneously polymerize into DNA"
      ],
      correct: 1,
      explanation: "Excessive thermal energy breaks delicate non-covalent bonds (H-bonds, ionic bonds, hydrophobic forces) holding the 3D tertiary globular structure, causing irreversible denaturation.",
      trap: "Denaturation destroys secondary/tertiary folding, leaving primary covalent peptide bonds intact."
    },
    {
      id: 8,
      question: "Hydrolysis of the terminal phosphoanhydride bond of ATP yields:",
      options: [
        "Adenosine + 3 inorganic phosphates + Oxygen",
        "ADP + Inorganic Phosphate (Pi) + Usable Energy (~7.3 kcal/mol)",
        "AMP + Pyrophosphate + Glucose",
        "Adenine base + Ribose sugar only"
      ],
      correct: 1,
      explanation: "Hydrolysis of ATP: ATP + H2O → ADP + Pi + Energy (~7.3 kcal/mol or ~30.5 kJ/mol). This exergonic reaction is coupled to endergonic cellular work.",
      trap: "ATP → ADP + Pi releases 7.3 kcal/mol; ADP phosphorylation back to ATP requires energy."
    },
    {
      id: 9,
      question: "Which nitrogenous base is present exclusively in RNA and replaces thymine found in DNA?",
      options: ["Guanine", "Cytosine", "Adenine", "Uracil"],
      correct: 3,
      explanation: "RNA contains the pyrimidine base Uracil (U), which base-pairs with Adenine (A). DNA contains Thymine (T) instead of Uracil.",
      trap: "DNA has Thymine (T); RNA has Uracil (U). Both share Adenine, Guanine, and Cytosine."
    },
    {
      id: 10,
      question: "A typical neutral fat (triglyceride) molecule is synthesized from:",
      options: [
        "1 glycerol molecule and 3 fatty acids linked by ester bonds",
        "3 glycerols and 1 fatty acid linked by peptide bonds",
        "1 sphingosine and 2 phosphate groups",
        "1 glucose molecule and 3 amino acids"
      ],
      correct: 0,
      explanation: "Triglycerides are composed of 1 glycerol backbone esterified with 3 fatty acids, forming 3 ester linkages and releasing 3 water molecules.",
      trap: "1 Glycerol + 3 Fatty Acids = 1 Triglyceride + 3 H2O."
    },
    {
      id: 11,
      question: "Which feature distinguishes unsaturated fatty acids from saturated fatty acids?",
      options: [
        "They possess one or more C=C double bonds with kinks and are liquid at room temperature",
        "They contain maximum possible hydrogen atoms and no double bonds",
        "They have much higher melting points and are solid at room temperature",
        "They are completely water-soluble electrolytes"
      ],
      correct: 0,
      explanation: "Unsaturated fatty acids have one or more C=C double bonds. The cis-double bonds cause kinks in the hydrocarbon chains, preventing dense packing and lowering melting points (liquid oils).",
      trap: "Saturated = single C-C bonds (solid fats); Unsaturated = double C=C bonds (liquid oils)."
    },
    {
      id: 12,
      question: "According to Koshland's Induced Fit Model of enzyme catalysis:",
      options: [
        "The active site is a completely rigid, unyielding template",
        "The active site undergoes subtle conformational adjustment upon substrate binding to align catalytic groups",
        "The substrate is permanently destroyed before entering the active site",
        "Enzymes lack active site clefts"
      ],
      correct: 1,
      explanation: "The Induced Fit Model states that the active site is flexible and molds around the substrate during binding (like a hand in a glove) to achieve optimal transition-state alignment.",
      trap: "Lock & Key = Emil Fischer (Rigid); Induced Fit = Daniel Koshland (Flexible/Dynamic)."
    },
    {
      id: 13,
      question: "Which pentose sugar is present in the nucleotides of DNA?",
      options: ["D-Ribose", "2-Deoxy-D-ribose", "D-Fructose", "D-Galactose"],
      correct: 1,
      explanation: "DNA nucleotides contain 2-deoxyribose, which lacks an oxygen atom at the C-2' position compared to ribose in RNA, enhancing chemical stability.",
      trap: "Deoxyribose has -H at C-2'; Ribose has -OH at C-2'."
    },
    {
      id: 14,
      question: "The high specific heat capacity and high heat of vaporization of water primarily serve to:",
      options: [
        "Act as a toxic metabolic waste in tissues",
        "Provide biological temperature buffering and effective evaporative cooling",
        "Prevent biochemical reactions from proceeding",
        "Spontaneously denature all proteins"
      ],
      correct: 1,
      explanation: "Due to extensive hydrogen bonding, water resists drastic temperature swings (thermal buffer) and absorbs large amounts of heat when evaporating (evaporative cooling in sweating).",
      trap: "Hydrogen bonds give water exceptional thermal stability, high cohesion, and solvent versatility."
    },
    {
      id: 15,
      question: "What is the correct hierarchical sequence of protein structural organization?",
      options: [
        "Quaternary → Tertiary → Secondary → Primary",
        "Primary → Secondary → Tertiary → Quaternary",
        "Secondary → Primary → Quaternary → Tertiary",
        "Primary → Tertiary → Secondary → Quaternary"
      ],
      correct: 1,
      explanation: "Proteins organize sequentially: Primary (amino acid sequence) → Secondary (α-helices/β-sheets) → Tertiary (3D single polypeptide fold) → Quaternary (multi-subunit oligomer).",
      trap: "Sequence: Primary (peptide) → Secondary (H-bonds) → Tertiary (R-groups) → Quaternary (subunits)."
    }
  ];

  // --- 3D FLASHCARDS DATA (18 HIGH-YIELD CARDS) ---
  const FLASHCARDS_DATA = [
    {
      category: "Carbohydrates",
      prompt: "What are the monomer units and glycosidic linkage of Sucrose?",
      answer: "α-D-Glucose + β-D-Fructose joined by an α-1,2-glycosidic bond. (Non-reducing disaccharide).",
      hint: "Table sugar condensation product"
    },
    {
      category: "Carbohydrates",
      prompt: "What is the difference between Maltose and Lactose?",
      answer: "• Maltose = Glucose + Glucose (α-1,4-glycosidic bond, reducing).\n• Lactose = Galactose + Glucose (β-1,4-glycosidic bond, reducing).",
      hint: "Malt sugar vs Milk sugar"
    },
    {
      category: "Carbohydrates",
      prompt: "Compare Starch, Glycogen, and Cellulose.",
      answer: "• Starch: Plant storage (Amylose + Amylopectin, Blue with iodine).\n• Glycogen: Animal storage (liver/muscle, highly branched, Red/brown with iodine).\n• Cellulose: Plant cell walls (β-1,4 bonds, unbranched, no color with iodine).",
      hint: "Storage in Plants vs Animals vs Structural Wall"
    },
    {
      category: "Lipids",
      prompt: "What is the chemical stoichiometry of a Triglyceride synthesis?",
      answer: "1 Glycerol + 3 Fatty Acids ➔ 1 Triglyceride + 3 H₂O (joined by 3 Ester bonds).",
      hint: "Neutral fat condensation"
    },
    {
      category: "Lipids",
      prompt: "Saturated vs Unsaturated Fatty Acids: Key differences?",
      answer: "• Saturated: No C=C double bonds, straight chains, solid at room temp (fats e.g. Palmitic acid).\n• Unsaturated: ≥1 C=C double bonds (kinks), lower melting points, liquid at room temp (oils e.g. Oleic acid).",
      hint: "Presence of C=C double bond kinks"
    },
    {
      category: "Proteins",
      prompt: "What four chemical groups are attached to the central α-Carbon of an Amino Acid?",
      answer: "1. Basic Amino group (-NH₂)\n2. Acidic Carboxyl group (-COOH)\n3. Hydrogen atom (-H)\n4. Variable Side Chain (-R group, 20 types).",
      hint: "Tetrahedral anatomy of amino acids"
    },
    {
      category: "Proteins",
      prompt: "Define the four levels of Protein Structure.",
      answer: "• Primary: Linear sequence of amino acids (peptide bonds).\n• Secondary: α-Helix and β-Pleated Sheet (backbone H-bonds).\n• Tertiary: 3D globular fold (R-group interactions & disulfide bridges).\n• Quaternary: Multiple polypeptide subunits (e.g. Hemoglobin 2α+2β).",
      hint: "1° sequence ➔ 2° backbone ➔ 3° 3D ➔ 4° subunits"
    },
    {
      category: "Enzymes",
      prompt: "How do Enzymes affect Activation Energy (Ea), ΔG, and Equilibrium?",
      answer: "Enzymes LOWER activation energy (Ea) to speed up rate. They DO NOT alter the overall free energy change (ΔG) or the equilibrium constant (Keq).",
      hint: "Catalytic kinetics rule"
    },
    {
      category: "Enzymes",
      prompt: "Lock & Key Model vs Induced Fit Model?",
      answer: "• Lock & Key (Emil Fischer): Active site is a rigid, pre-shaped lock.\n• Induced Fit (Daniel Koshland): Active site is flexible and molds around the substrate upon binding (hand-in-glove).",
      hint: "Fischer (Rigid) vs Koshland (Flexible)"
    },
    {
      category: "Enzymes",
      prompt: "What is the difference between Competitive and Non-Competitive Inhibition?",
      answer: "• Competitive: Inhibitor resembles substrate, binds to Active Site (Vmax unchanged, Km increases; reversed by high [S]).\n• Non-Competitive: Inhibitor binds to Allosteric Site, changes active site shape (Vmax decreases, Km unchanged).",
      hint: "Active site competition vs Allosteric binding"
    },
    {
      category: "ATP & Bioenergetics",
      prompt: "What are the structural components of an ATP molecule?",
      answer: "1. Adenine (purine nitrogenous base)\n2. Ribose (5-carbon pentose sugar)\n3. 3 Phosphate groups joined by 2 high-energy phosphoanhydride bonds.",
      hint: "Base + Sugar + 3 Phosphates"
    },
    {
      category: "ATP & Bioenergetics",
      prompt: "What is the exact energy yield of ATP hydrolysis?",
      answer: "ATP + H₂O ➔ ADP + Pi + 7.3 kcal/mol (30.5 kJ/mol).",
      hint: "Terminal phosphate cleavage energy"
    },
    {
      category: "Nucleic Acids",
      prompt: "What are the three chemical parts of a Nucleotide?",
      answer: "1. Nitrogenous Base (Purine: A, G; Pyrimidine: C, T, U)\n2. Pentose Sugar (Ribose or Deoxyribose)\n3. Phosphate Group (PO₄³⁻ attached to C-5').",
      hint: "Monomer of DNA and RNA"
    },
    {
      category: "Nucleic Acids",
      prompt: "State Chargaff's Rule and DNA base pairing rules.",
      answer: "In double-stranded DNA:\n• Adenine (A) = Thymine (T) with 2 Hydrogen bonds.\n• Guanine (G) ≡ Cytosine (C) with 3 Hydrogen bonds.\n• Total Purines (A + G) = Total Pyrimidines (T + C).",
      hint: "A=T, G≡C"
    },
    {
      category: "Nucleic Acids",
      prompt: "Name the three major classes of RNA and their cellular percentages.",
      answer: "• rRNA (Ribosomal RNA): ~80% (most abundant, structural component of ribosomes).\n• tRNA (Transfer RNA): 10-20% (cloverleaf shape, transports amino acids).\n• mRNA (Messenger RNA): 3-5% (transcribes genetic code from DNA).",
      hint: "rRNA > tRNA > mRNA"
    },
    {
      category: "Nucleic Acids",
      prompt: "Compare Deoxyribose vs Ribose sugar chemically.",
      answer: "• Deoxyribose (C₅H₁₀O₄): Has -H at the C-2' position (no oxygen atom).\n• Ribose (C₅H₁₀O₅): Has -OH at the C-2' position (standard pentose).",
      hint: "Difference at C-2' carbon"
    },
    {
      category: "Carbohydrates",
      prompt: "What is the difference between an Aldose and a Ketose sugar?",
      answer: "• Aldose: Contains an aldehyde group (-CHO) at C-1 (e.g. Glucose, Galactose, Ribose).\n• Ketose: Contains a ketone group (-C=O) at C-2 (e.g. Fructose, Ribulose).",
      hint: "Carbonyl at C-1 vs C-2"
    },
    {
      category: "Proteins",
      prompt: "What did Frederick Sanger discover in 1953 regarding protein structure?",
      answer: "Determined the complete primary amino acid sequence of Insulin (51 amino acids across 2 polypeptide chains linked by disulfide bridges).",
      hint: "First sequenced protein"
    }
  ];

  // --- INITIALIZE APPLICATION ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFontSize();
    initReadingProgress();
    initChapterNavigation();
    initEnzymeActionSimulation();
    initKineticsSimulator();
    initAtpHydrolysis();
    initFlashcards();
    initQuizEngine();
    initBookmarks();
    initSearch();
  });

  // ==========================================================================
  // 1. THEME TOGGLER (DARK / LIGHT)
  // ==========================================================================
  function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeBtn(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEYS.THEME, next);
        updateThemeBtn(next);
      });
    }
  }

  function updateThemeBtn(theme) {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('.theme-icon');
    const label = themeBtn.querySelector('.theme-label');
    if (theme === 'dark') {
      if (icon) icon.textContent = '☀️';
      if (label) label.textContent = 'Light';
    } else {
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark';
    }
  }

  // ==========================================================================
  // 2. FONT SIZE SCALER
  // ==========================================================================
  function initFontSize() {
    const incBtn = document.getElementById('fontIncreaseBtn');
    const decBtn = document.getElementById('fontDecreaseBtn');
    let currentSize = parseInt(localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || '16', 10);
    
    document.documentElement.style.setProperty('--text-base-size', `${currentSize}px`);

    if (incBtn) {
      incBtn.addEventListener('click', () => {
        if (currentSize < 22) {
          currentSize += 1;
          document.documentElement.style.setProperty('--text-base-size', `${currentSize}px`);
          localStorage.setItem(STORAGE_KEYS.FONT_SIZE, currentSize);
        }
      });
    }

    if (decBtn) {
      decBtn.addEventListener('click', () => {
        if (currentSize > 13) {
          currentSize -= 1;
          document.documentElement.style.setProperty('--text-base-size', `${currentSize}px`);
          localStorage.setItem(STORAGE_KEYS.FONT_SIZE, currentSize);
        }
      });
    }
  }

  // ==========================================================================
  // 3. READING PROGRESS BAR
  // ==========================================================================
  function initReadingProgress() {
    const bar = document.getElementById('readingProgressBar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      bar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // ==========================================================================
  // 4. CHAPTER QUICK NAVIGATION STRIP & SCROLLSPY
  // ==========================================================================
  function initChapterNavigation() {
    const navPills = document.querySelectorAll('.nav-pill');
    const track = document.getElementById('navStripTrack');

    // Scrollspy setup
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionIds = Array.from(navPills).map(p => p.getAttribute('data-target')).filter(Boolean);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navPills.forEach(pill => {
            if (pill.getAttribute('data-target') === id) {
              pill.classList.add('active');
              // Auto-scroll pill in horizontal track if needed
              if (track) {
                const pillLeft = pill.offsetLeft;
                const trackScroll = track.scrollLeft;
                const trackWidth = track.clientWidth;
                if (pillLeft < trackScroll || pillLeft > trackScroll + trackWidth - 100) {
                  track.scrollTo({ left: pillLeft - 40, behavior: 'smooth' });
                }
              }
            } else {
              pill.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }

  // ==========================================================================
  // 5. ENZYME INTERACTIVE ACTION SIMULATION
  // ==========================================================================
  function initEnzymeActionSimulation() {
    const triggerBtn = document.getElementById('seeEnzymeActionBtn');
    const viewport = document.getElementById('enzymeAnimViewport');
    const statusText = document.getElementById('enzymeStageStatus');

    if (!triggerBtn || !viewport) return;

    let isRunning = false;

    triggerBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      triggerBtn.disabled = true;

      // Stage 1: Substrate enters Active Site Cleft
      viewport.classList.remove('cleaved');
      viewport.classList.add('acting');
      if (statusText) statusText.textContent = "1. Substrate docks into Active Site cleft → Enzyme-Substrate (ES) Complex forms!";

      // Stage 2: Induced fit conformational change & transition state
      setTimeout(() => {
        if (statusText) statusText.textContent = "2. Induced Fit: Catalytic residues strain bonds, dramatically lowering Activation Energy (Ea)...";
      }, 1200);

      // Stage 3: Bond cleavage & Product formation
      setTimeout(() => {
        viewport.classList.remove('acting');
        viewport.classList.add('cleaved');
        if (statusText) statusText.textContent = "3. Catalysis Complete: Products (P₁ + P₂) released! Enzyme returns to active conformation.";
      }, 2500);

      // Stage 4: Reset cycle
      setTimeout(() => {
        viewport.classList.remove('cleaved');
        if (statusText) statusText.textContent = "Status: Ready for next substrate cycle. Click 'See Enzyme Action' to repeat.";
        isRunning = false;
        triggerBtn.disabled = false;
      }, 4800);
    });
  }

  // ==========================================================================
  // 6. ENZYME KINETICS VIRTUAL SIMULATOR
  // ==========================================================================
  function initKineticsSimulator() {
    const tempSlider = document.getElementById('tempSlider');
    const phSlider = document.getElementById('phSlider');
    const subSlider = document.getElementById('substrateSlider');

    const tempVal = document.getElementById('tempValueDisplay');
    const phVal = document.getElementById('phValueDisplay');
    const subVal = document.getElementById('substrateValueDisplay');

    const velOutput = document.getElementById('simVelocityOutput');
    const fbIcon = document.getElementById('simFeedbackIcon');
    const fbTitle = document.getElementById('simFeedbackTitle');
    const fbDesc = document.getElementById('simFeedbackDesc');
    const fbCard = document.getElementById('simFeedbackCard');

    function updateSimulation() {
      const T = parseFloat(tempSlider?.value || 37);
      const pH = parseFloat(phSlider?.value || 7.4);
      const S = parseFloat(subSlider?.value || 50);

      if (tempVal) tempVal.textContent = `${T} °C`;
      if (phVal) phVal.textContent = `${pH}`;
      if (subVal) subVal.textContent = `${S} mM`;

      // Mathematical modeling of enzyme kinetics
      // Temperature factor: optimum at 37°C, sharp drop > 55°C due to denaturation
      let tempFactor = 0;
      if (T <= 37) {
        tempFactor = Math.pow(2, (T - 37) / 10); // Q10 temperature coefficient
      } else if (T < 60) {
        tempFactor = Math.max(0, 1 - Math.pow((T - 37) / 23, 2));
      } else {
        tempFactor = 0; // Irreversible denaturation
      }

      // pH factor: Gaussian bell curve around optimum 7.4
      const phDiff = Math.abs(pH - 7.4);
      const phFactor = Math.max(0, Math.exp(-Math.pow(phDiff / 1.6, 2)));

      // Substrate factor: Michaelis-Menten kinetics V = (Vmax * [S]) / (Km + [S]), Km = 20
      const Km = 20;
      const subFactor = S / (Km + S);

      // Relative Velocity (0 to 100%)
      const velocity = Math.min(100, Math.max(0, tempFactor * phFactor * subFactor * 100 * 1.4));
      const formattedVel = velocity.toFixed(1);

      if (velOutput) velOutput.textContent = `${formattedVel} %`;

      // Clinical/Biological Feedback Interpretation
      if (T >= 55) {
        if (fbIcon) fbIcon.textContent = "🔥";
        if (fbTitle) fbTitle.textContent = "Thermal Denaturation!";
        if (fbDesc) fbDesc.textContent = "High kinetic energy has permanently ruptured tertiary non-covalent bonds (H-bonds, hydrophobic forces). Catalytic active site destroyed.";
        if (fbCard) {
          fbCard.style.background = "rgba(244, 63, 94, 0.15)";
          fbCard.style.borderColor = "rgba(244, 63, 94, 0.4)";
        }
      } else if (T <= 10) {
        if (fbIcon) fbIcon.textContent = "❄️";
        if (fbTitle) fbTitle.textContent = "Low Kinetic Activation";
        if (fbDesc) fbDesc.textContent = "Low thermal energy slows down molecular collisions between substrate and enzyme active site. Enzyme is inactive but NOT denatured.";
        if (fbCard) {
          fbCard.style.background = "rgba(56, 189, 248, 0.15)";
          fbCard.style.borderColor = "rgba(56, 189, 248, 0.4)";
        }
      } else if (pH < 4.5 || pH > 10.5) {
        if (fbIcon) fbIcon.textContent = "⚠️";
        if (fbTitle) fbTitle.textContent = "Extreme pH Inactivation";
        if (fbDesc) fbDesc.textContent = "Excess H+ or OH- ions alter the ionization state of acidic (-COOH) and basic (-NH2) residues at the catalytic cleft, disrupting ionic bonds.";
        if (fbCard) {
          fbCard.style.background = "rgba(245, 158, 11, 0.15)";
          fbCard.style.borderColor = "rgba(245, 158, 11, 0.4)";
        }
      } else if (S >= 80 && velocity > 80) {
        if (fbIcon) fbIcon.textContent = "⚡";
        if (fbTitle) fbTitle.textContent = "Vmax Saturation Plateau";
        if (fbDesc) fbDesc.textContent = "All active site clefts are completely occupied by substrate. Further increase in [S] will not increase reaction velocity (Zero-order kinetics).";
        if (fbCard) {
          fbCard.style.background = "rgba(168, 85, 247, 0.15)";
          fbCard.style.borderColor = "rgba(168, 85, 247, 0.4)";
        }
      } else {
        if (fbIcon) fbIcon.textContent = "✅";
        if (fbTitle) fbTitle.textContent = "Optimal Physiological Kinetics";
        if (fbDesc) fbDesc.textContent = "Operating within human physiological parameters with high turnover rate and active site catalytic efficiency.";
        if (fbCard) {
          fbCard.style.background = "rgba(16, 185, 129, 0.15)";
          fbCard.style.borderColor = "rgba(16, 185, 129, 0.4)";
        }
      }
    }

    [tempSlider, phSlider, subSlider].forEach(slider => {
      slider?.addEventListener('input', updateSimulation);
    });

    updateSimulation();
  }

  // ==========================================================================
  // 7. ATP TERMINAL PHOSPHATE HYDROLYSIS SIMULATION
  // ==========================================================================
  function initAtpHydrolysis() {
    const hydrolyzeBtn = document.getElementById('hydrolyzeAtpBtn');
    const terminalP = document.getElementById('terminalPhosphate');
    const terminalTilde = document.getElementById('terminalTilde');

    if (!hydrolyzeBtn || !terminalP) return;

    let isHydrolyzed = false;

    hydrolyzeBtn.addEventListener('click', () => {
      if (!isHydrolyzed) {
        terminalP.classList.add('hydrolyzed');
        if (terminalTilde) terminalTilde.style.opacity = '0.2';
        hydrolyzeBtn.textContent = "🔄 Phosphorylate ADP + Pi ➔ Re-synthesize ATP";
        hydrolyzeBtn.style.background = "var(--grad-energy)";
        isHydrolyzed = true;
      } else {
        terminalP.classList.remove('hydrolyzed');
        if (terminalTilde) terminalTilde.style.opacity = '1';
        hydrolyzeBtn.textContent = "⚡ Simulate Terminal Phosphate Hydrolysis";
        hydrolyzeBtn.style.background = "var(--grad-fire)";
        isHydrolyzed = false;
      }
    });
  }

  // ==========================================================================
  // 8. 3D FLASHCARDS SYSTEM
  // ==========================================================================
  function initFlashcards() {
    let currentCategory = 'All';
    let filteredCards = [...FLASHCARDS_DATA];
    let currentIndex = 0;

    const card3d = document.getElementById('flashcard3d');
    const promptEl = document.getElementById('fcPrompt');
    const answerEl = document.getElementById('fcAnswer');
    const hintEl = document.getElementById('fcHint');
    const categoryBadge = document.getElementById('fcCategoryBadge');
    const counterEl = document.getElementById('fcCounter');
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');
    const flipBtn = document.getElementById('fcFlipBtn');
    const shuffleBtn = document.getElementById('fcShuffleBtn');
    const categoryPills = document.querySelectorAll('.fc-pill');

    function renderCard() {
      if (filteredCards.length === 0) return;
      const card = filteredCards[currentIndex];

      if (card3d) card3d.classList.remove('flipped');

      if (promptEl) promptEl.textContent = card.prompt;
      if (answerEl) answerEl.textContent = card.answer;
      if (hintEl) hintEl.textContent = `Hint: ${card.hint}`;
      if (categoryBadge) categoryBadge.textContent = card.category;
      if (counterEl) counterEl.textContent = `Card ${currentIndex + 1} / ${filteredCards.length}`;
    }

    function flipCard() {
      if (card3d) card3d.classList.toggle('flipped');
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % filteredCards.length;
      renderCard();
    }

    function prevCard() {
      currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
      renderCard();
    }

    function shuffleCards() {
      for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
      }
      currentIndex = 0;
      renderCard();
    }

    function setCategory(cat) {
      currentCategory = cat;
      if (cat === 'All') {
        filteredCards = [...FLASHCARDS_DATA];
      } else {
        filteredCards = FLASHCARDS_DATA.filter(c => c.category.toLowerCase().includes(cat.toLowerCase()));
      }
      currentIndex = 0;
      renderCard();
    }

    // Event listeners
    if (card3d) card3d.addEventListener('click', flipCard);
    if (flipBtn) flipBtn.addEventListener('click', flipCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleCards);

    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        setCategory(pill.getAttribute('data-category') || 'All');
      });
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      // Avoid triggering when focused in an input
      if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase())) return;

      if (e.code === 'Space') {
        const flashcardSec = document.getElementById('flashcard-section');
        if (flashcardSec && isElementInViewport(flashcardSec)) {
          e.preventDefault();
          flipCard();
        }
      } else if (e.code === 'ArrowRight') {
        const flashcardSec = document.getElementById('flashcard-section');
        if (flashcardSec && isElementInViewport(flashcardSec)) {
          nextCard();
        }
      } else if (e.code === 'ArrowLeft') {
        const flashcardSec = document.getElementById('flashcard-section');
        if (flashcardSec && isElementInViewport(flashcardSec)) {
          prevCard();
        }
      }
    });

    renderCard();
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // ==========================================================================
  // 9. MDCAT PRACTICE QUIZ ENGINE (REDESIGNED EXAM INTERFACE)
  // ==========================================================================
  function initQuizEngine() {
    let currentQIndex = 0;
    let selectedOptionIndex = null;
    let score = 0;
    let userAnswers = [];
    let timerInterval = null;
    let secondsElapsed = 0;

    const qCounterEl = document.getElementById('quizQuestionCounter');
    const qProgressFill = document.getElementById('quizProgressFill');
    const qNumLabel = document.getElementById('qNumLabel');
    const qTextEl = document.getElementById('quizQuestionText');
    const optionsList = document.getElementById('quizOptionsList');
    const submitBtn = document.getElementById('quizSubmitBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    const expCard = document.getElementById('quizExplanationCard');
    const expStatusBadge = document.getElementById('expStatusBadge');
    const expTextEl = document.getElementById('quizExplanationText');
    const expTrapText = document.getElementById('quizTrapText');
    const liveScoreEl = document.getElementById('quizLiveScore');
    const timerDigitsEl = document.getElementById('quizTimerDigits');
    const resultCard = document.getElementById('quizResultCard');
    const qContainer = document.getElementById('quizQuestionContainer');
    const retakeBtn = document.getElementById('retakeQuizBtn');

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      secondsElapsed = 0;
      timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60);
        const secs = secondsElapsed % 60;
        if (timerDigitsEl) {
          timerDigitsEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
      }, 1000);
    }

    function renderQuestion() {
      const q = QUIZ_DATA[currentQIndex];
      selectedOptionIndex = null;

      if (qCounterEl) qCounterEl.textContent = `QUESTION ${(currentQIndex + 1).toString().padStart(2, '0')} / ${QUIZ_DATA.length}`;
      if (qProgressFill) qProgressFill.style.width = `${((currentQIndex + 1) / QUIZ_DATA.length) * 100}%`;
      if (qNumLabel) qNumLabel.textContent = `Q${currentQIndex + 1}.`;
      if (qTextEl) qTextEl.textContent = q.question;

      if (expCard) expCard.style.display = 'none';
      if (submitBtn) {
        submitBtn.style.display = 'inline-flex';
        submitBtn.disabled = true;
      }
      if (nextBtn) nextBtn.style.display = 'none';

      if (optionsList) {
        optionsList.innerHTML = '';
        const prefixes = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, idx) => {
          const optEl = document.createElement('div');
          optEl.className = 'quiz-option-item';
          optEl.innerHTML = `
            <span class="opt-prefix-badge">${prefixes[idx]}</span>
            <span class="opt-text">${opt}</span>
          `;
          optEl.addEventListener('click', () => selectOption(idx));
          optionsList.appendChild(optEl);
        });
      }
    }

    function selectOption(idx) {
      selectedOptionIndex = idx;
      const optionItems = optionsList?.querySelectorAll('.quiz-option-item');
      optionItems?.forEach((item, i) => {
        if (i === idx) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      if (submitBtn) submitBtn.disabled = false;
    }

    function submitAnswer() {
      if (selectedOptionIndex === null) return;
      const q = QUIZ_DATA[currentQIndex];
      const isCorrect = selectedOptionIndex === q.correct;

      if (isCorrect) score++;
      if (liveScoreEl) liveScoreEl.textContent = score;

      userAnswers.push({
        questionId: q.id,
        selected: selectedOptionIndex,
        correct: q.correct,
        isCorrect
      });

      // Highlight options
      const optionItems = optionsList?.querySelectorAll('.quiz-option-item');
      optionItems?.forEach((item, i) => {
        item.style.pointerEvents = 'none';
        if (i === q.correct) {
          item.classList.add('correct');
        } else if (i === selectedOptionIndex && !isCorrect) {
          item.classList.add('incorrect');
        }
      });

      // Show Rationale Card
      if (expCard) {
        expCard.style.display = 'block';
        if (expStatusBadge) {
          expStatusBadge.textContent = isCorrect ? '✓ Correct Answer!' : '✕ Incorrect';
          expStatusBadge.style.background = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)';
          expStatusBadge.style.color = isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)';
        }
        if (expTextEl) expTextEl.textContent = q.explanation;
        if (expTrapText) expTrapText.textContent = q.trap;
      }

      if (submitBtn) submitBtn.style.display = 'none';
      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = currentQIndex === QUIZ_DATA.length - 1 ? 'VIEW FINAL RESULTS 🏆' : 'NEXT QUESTION →';
      }
    }

    function nextQuestion() {
      if (currentQIndex < QUIZ_DATA.length - 1) {
        currentQIndex++;
        renderQuestion();
      } else {
        showResults();
      }
    }

    function showResults() {
      if (timerInterval) clearInterval(timerInterval);
      if (qContainer) qContainer.style.display = 'none';
      if (resultCard) resultCard.style.display = 'block';

      const finalScoreEl = document.getElementById('resultFinalScore');
      const accuracyEl = document.getElementById('resultAccuracy');
      const timeTakenEl = document.getElementById('resultTimeTaken');
      const ratingEl = document.getElementById('resultRating');
      const iconEl = document.getElementById('resultIcon');

      const accuracy = Math.round((score / QUIZ_DATA.length) * 100);
      const mins = Math.floor(secondsElapsed / 60);
      const secs = secondsElapsed % 60;
      const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      if (finalScoreEl) finalScoreEl.textContent = `${score} / ${QUIZ_DATA.length}`;
      if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
      if (timeTakenEl) timeTakenEl.textContent = timeStr;

      if (accuracy >= 85) {
        if (ratingEl) ratingEl.textContent = 'Top Merit Tier (MDCAT Ready)';
        if (iconEl) iconEl.textContent = '🏆';
      } else if (accuracy >= 65) {
        if (ratingEl) ratingEl.textContent = 'Competent (Review Traps)';
        if (iconEl) iconEl.textContent = '🥈';
      } else {
        if (ratingEl) ratingEl.textContent = 'Revision Required';
        if (iconEl) iconEl.textContent = '📚';
      }
    }

    function resetQuiz() {
      currentQIndex = 0;
      score = 0;
      userAnswers = [];
      if (liveScoreEl) liveScoreEl.textContent = '0';
      if (qContainer) qContainer.style.display = 'block';
      if (resultCard) resultCard.style.display = 'none';
      startTimer();
      renderQuestion();
    }

    if (submitBtn) submitBtn.addEventListener('click', submitAnswer);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (retakeBtn) retakeBtn.addEventListener('click', resetQuiz);

    startTimer();
    renderQuestion();
  }

  // ==========================================================================
  // 10. BOOKMARKS SLIDE-OUT DRAWER
  // ==========================================================================
  function initBookmarks() {
    const drawerBtn = document.getElementById('bookmarkDrawerBtn');
    const drawer = document.getElementById('bookmarkDrawer');
    const backdrop = document.getElementById('bookmarkDrawerBackdrop');
    const closeBtn = document.getElementById('closeBookmarkDrawerBtn');
    const bookmarkCountBadge = document.getElementById('bookmarkCountBadge');
    const itemsList = document.getElementById('bookmarkItemsList');
    const emptyMsg = document.getElementById('emptyBookmarksMsg');
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

    let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');

    function saveBookmarks() {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      updateUI();
    }

    function updateUI() {
      if (bookmarkCountBadge) bookmarkCountBadge.textContent = bookmarks.length;

      // Update bookmark buttons state
      bookmarkButtons.forEach(btn => {
        const secId = btn.getAttribute('data-section');
        if (bookmarks.includes(secId)) {
          btn.classList.add('bookmarked');
          btn.textContent = '🔖 Bookmarked';
        } else {
          btn.classList.remove('bookmarked');
          btn.textContent = '🔖 Bookmark';
        }
      });

      // Update drawer list
      if (!itemsList) return;
      itemsList.innerHTML = '';

      if (bookmarks.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
      } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        bookmarks.forEach(secId => {
          const secEl = document.getElementById(secId);
          const title = secEl?.querySelector('.block-title')?.textContent || secId;

          const li = document.createElement('li');
          li.className = 'bm-item';
          li.innerHTML = `
            <a href="#${secId}">📌 ${title}</a>
            <button class="bm-del-btn" title="Remove Bookmark">&times;</button>
          `;

          li.querySelector('a')?.addEventListener('click', () => {
            closeDrawer();
          });

          li.querySelector('.bm-del-btn')?.addEventListener('click', () => {
            bookmarks = bookmarks.filter(id => id !== secId);
            saveBookmarks();
          });

          itemsList.appendChild(li);
        });
      }
    }

    function openDrawer() {
      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
    }

    function closeDrawer() {
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }

    if (drawerBtn) drawerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    bookmarkButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const secId = btn.getAttribute('data-section');
        if (!secId) return;

        if (bookmarks.includes(secId)) {
          bookmarks = bookmarks.filter(id => id !== secId);
        } else {
          bookmarks.push(secId);
        }
        saveBookmarks();
      });
    });

    updateUI();
  }

  // ==========================================================================
  // 11. REAL-TIME SEARCH
  // ==========================================================================
  function initSearch() {
    const searchInput = document.getElementById('chapterSearchInput');
    if (!searchInput) return;

    // Press '/' keyboard shortcut
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      if (!term) return;

      const blocks = document.querySelectorAll('.content-chapter-block');
      for (const block of blocks) {
        if (block.textContent.toLowerCase().includes(term)) {
          block.scrollIntoView({ behavior: 'smooth', block: 'start' });
          block.style.outline = '2px solid var(--accent-cyan)';
          setTimeout(() => {
            block.style.outline = 'none';
          }, 2000);
          break;
        }
      }
    });
  }

})();
