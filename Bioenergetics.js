/**
 * Bioenergetics — MDCAT Biology Master Module JavaScript (EduNexa AI)
 * Author: EduNexa AI Team
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. High-Yield MDCAT MCQ Database (22 Conceptual Questions)
     ========================================================================== */
  const quizData = [
    {
      id: 1,
      topic: "ATP Structure & Energy Transfer",
      question: "Which of the following statements regarding ATP is scientifically accurate for MDCAT?",
      options: [
        "A) ATP serves as the primary long-term chemical energy storage depot in adipose cells.",
        "B) ATP consists of an adenine base, a deoxyribose sugar, and three phosphate groups.",
        "C) ATP is an immediate energy-transfer molecule whose high-energy phosphate bonds couple exergonic to endergonic work.",
        "D) ATP hydrolysis directly yields AMP and inorganic pyrophosphate as standard cellular products."
      ],
      correct: 2,
      explanation: "ATP is the cell's immediate energy-transfer currency (not long-term storage, which is handled by glycogen/fats). It contains ribose (not deoxyribose) and adenine, linked to 3 phosphate groups. Standard cellular hydrolysis produces ADP and Pi (ΔG ≈ -30.5 kJ/mol)."
    },
    {
      id: 2,
      topic: "Metabolism & Thermodynamics",
      question: "Which of the following pairs correctly classifies an anabolic vs. catabolic reaction?",
      options: [
        "A) Anabolic: Cellular Respiration | Catabolic: Protein Synthesis",
        "B) Anabolic: Glycogenesis (Requires Energy) | Catabolic: Glycolysis (Releases Energy)",
        "C) Anabolic: Lipolysis | Catabolic: Photosynthesis",
        "D) Anabolic: Beta-oxidation | Catabolic: DNA Replication"
      ],
      correct: 1,
      explanation: "Anabolism constructs complex macromolecules from simple precursors and requires energy (Endergonic, e.g., Glycogenesis: Glucose ➔ Glycogen). Catabolism breaks large molecules into simpler units, releasing energy (Exergonic, e.g., Glycolysis)."
    },
    {
      id: 3,
      topic: "Energy Coupling",
      question: "In cellular energy coupling, an endergonic reaction with ΔG = +18 kJ/mol is coupled with ATP hydrolysis (ΔG = -30.5 kJ/mol). What is the overall net ΔG for the coupled process?",
      options: [
        "A) +48.5 kJ/mol (Non-spontaneous)",
        "B) -48.5 kJ/mol (Spontaneous)",
        "C) -12.5 kJ/mol (Thermodynamically Favorable)",
        "D) +12.5 kJ/mol (Thermodynamically Unfavorable)"
      ],
      correct: 2,
      explanation: "Net ΔG = (+18 kJ/mol) + (-30.5 kJ/mol) = -12.5 kJ/mol. Because the algebraic sum of free energy change is negative (exergonic), the coupled reaction proceeds spontaneously."
    },
    {
      id: 4,
      topic: "Enzymes & Activation Energy",
      question: "How do biological enzymes accelerate biochemical reactions in living systems?",
      options: [
        "A) By increasing the total amount of free energy (ΔG) released by the reaction.",
        "B) By lowering the activation energy (Ea) required to reach the transition state.",
        "C) By shifting the final chemical equilibrium toward a higher concentration of products.",
        "D) By raising the temperature of the localized active site pocket."
      ],
      correct: 1,
      explanation: "Enzymes lower the activation energy barrier (Ea) without altering the net free energy change (ΔG), equilibrium constant (Keq), or being permanently consumed in the reaction."
    },
    {
      id: 5,
      topic: "Enzyme Inhibition",
      question: "A researcher adds an excess concentration of natural substrate to an enzyme-catalyzed reaction and observes that the inhibition is completely reversed. What type of inhibitor was present?",
      options: [
        "A) Non-competitive (Allosteric) inhibitor",
        "B) Irreversible suicide inhibitor",
        "C) Competitive inhibitor",
        "D) Uncompetitive heavy metal inhibitor"
      ],
      correct: 2,
      explanation: "Competitive inhibitors compete directly with substrate for the active site. Increasing substrate concentration [S] displaces the inhibitor, restoring the normal maximum reaction rate (Vmax)."
    },
    {
      id: 6,
      topic: "Enzyme Kinetics",
      question: "Which of the following kinetic parameter changes is characteristic of non-competitive (allosteric) enzyme inhibition?",
      options: [
        "A) Km increases; Vmax remains unchanged",
        "B) Vmax decreases; Km remains unchanged",
        "C) Both Vmax and Km increase proportionally",
        "D) Vmax increases; Km decreases"
      ],
      correct: 1,
      explanation: "Non-competitive inhibitors bind to an allosteric site, altering enzyme conformation. This reduces the maximum turnover rate (Vmax decreases) but does not alter substrate binding affinity to unaffected active sites (Km remains unchanged)."
    },
    {
      id: 7,
      topic: "Glycolysis Location & Oxygen",
      question: "Where in the eukaryotic cell does glycolysis take place, and what is its direct oxygen requirement?",
      options: [
        "A) Mitochondrial matrix; strictly requires molecular oxygen",
        "B) Inner mitochondrial membrane; requires oxygen as final acceptor",
        "C) Cytoplasm / cytosol; does not directly require molecular oxygen",
        "D) Intermembrane space; strictly anaerobic"
      ],
      correct: 2,
      explanation: "Glycolysis occurs exclusively in the cytosol (cytoplasm) and is anaerobic; none of its 10 enzymatic reactions require molecular oxygen directly."
    },
    {
      id: 8,
      topic: "Glycolysis Net Accounting",
      question: "Starting from ONE molecule of glucose, what is the net yield of products generated by the end of glycolysis?",
      options: [
        "A) 2 Pyruvate + 4 ATP net + 2 FADH₂",
        "B) 2 Pyruvate + 2 ATP net + 2 NADH",
        "C) 1 Pyruvate + 2 ATP net + 1 NADH + 1 CO₂",
        "D) 2 Acetyl-CoA + 2 ATP net + 2 NADH"
      ],
      correct: 1,
      explanation: "During glycolysis: 2 ATP are invested, 4 ATP are formed (gross), giving a NET gain of 2 ATP (via substrate-level phosphorylation), 2 NADH, and 2 molecules of 3-carbon pyruvate."
    },
    {
      id: 9,
      topic: "Committed Step of Glycolysis",
      question: "Which enzyme catalyzes the committed, rate-limiting, highly regulated regulatory step of glycolysis?",
      options: [
        "A) Hexokinase",
        "B) Phosphoglycerate kinase",
        "C) Phosphofructokinase-1 (PFK-1)",
        "D) Pyruvate kinase"
      ],
      correct: 2,
      explanation: "Phosphofructokinase-1 (PFK-1) phosphorylates Fructose-6-phosphate to Fructose-1,6-bisphosphate using 1 ATP. It is the primary allosterically regulated pacemaker step of glycolysis."
    },
    {
      id: 10,
      topic: "Pyruvate Oxidation (Link Step)",
      question: "During the oxidation of pyruvate in the mitochondrial matrix, what products are formed per pyruvate molecule?",
      options: [
        "A) 1 Acetyl-CoA + 1 CO₂ + 1 NADH",
        "B) 2 Acetyl-CoA + 2 CO₂ + 2 ATP",
        "C) 1 Citrate + 1 FADH₂ + 1 CO₂",
        "D) 1 Lactate + 1 NAD⁺"
      ],
      correct: 0,
      explanation: "The pyruvate dehydrogenase complex converts 1 Pyruvate (3C) + CoA-SH + NAD⁺ into 1 Acetyl-CoA (2C) + 1 CO₂ + 1 NADH. (For 1 full glucose = 2 pyruvates = 2 Acetyl-CoA, 2 CO₂, 2 NADH)."
    },
    {
      id: 11,
      topic: "Krebs Cycle Location",
      question: "In eukaryotic cells, the enzymes of the Krebs (Citric Acid / TCA) cycle are located primarily in the:",
      options: [
        "A) Outer mitochondrial membrane",
        "B) Mitochondrial intermembrane space",
        "C) Mitochondrial matrix",
        "D) Cytosolic ribosome complex"
      ],
      correct: 2,
      explanation: "The Krebs cycle takes place in the fluid mitochondrial matrix (with the exception of succinate dehydrogenase, which is bound to the inner mitochondrial membrane as Complex II)."
    },
    {
      id: 12,
      topic: "Krebs Cycle Yield",
      question: "For ONE turn of the Krebs cycle (per 1 Acetyl-CoA molecule entering), what is the exact yield of reduced coenzymes and high-energy phosphates?",
      options: [
        "A) 2 NADH, 2 FADH₂, 2 ATP, 4 CO₂",
        "B) 3 NADH, 1 FADH₂, 1 ATP (or GTP), 2 CO₂",
        "C) 6 NADH, 2 FADH₂, 2 ATP, 4 CO₂",
        "D) 4 NADH, 0 FADH₂, 2 ATP, 1 CO₂"
      ],
      correct: 1,
      explanation: "Per single Acetyl-CoA: 3 NADH, 1 FADH₂, 1 ATP (or GTP via substrate-level phosphorylation), and 2 CO₂. (Multiply by 2 for the complete oxidation of 1 glucose molecule)."
    },
    {
      id: 13,
      topic: "Krebs Cycle Intermediates",
      question: "In the initial entry step of the Krebs cycle, Acetyl-CoA (2C) condenses with which 4-carbon intermediate to form Citrate (6C)?",
      options: [
        "A) Malate",
        "B) Fumarate",
        "C) Succinate",
        "D) Oxaloacetate"
      ],
      correct: 3,
      explanation: "Citrate Synthase catalyzes the condensation of 2-carbon Acetyl-CoA with 4-carbon Oxaloacetate to produce 6-carbon Citric acid (Citrate), releasing Coenzyme A."
    },
    {
      id: 14,
      topic: "Electron Transport Chain Location",
      question: "Where are the multi-protein complexes (Complexes I–IV) of the respiratory electron transport chain located?",
      options: [
        "A) Outer mitochondrial membrane",
        "B) Inner mitochondrial membrane (cristae)",
        "C) Peroxisomal membrane",
        "D) Mitochondrial matrix stroma"
      ],
      correct: 1,
      explanation: "The ETC multi-protein complexes and mobile carriers (CoQ, Cytochrome c) are embedded in the inner mitochondrial membrane (cristae)."
    },
    {
      id: 15,
      topic: "Terminal Electron Acceptor",
      question: "What is the ultimate, final electron acceptor in the aerobic electron transport chain?",
      options: [
        "A) NAD⁺",
        "B) Pyruvate",
        "C) Molecular Oxygen (O₂)",
        "D) Cytochrome c"
      ],
      correct: 2,
      explanation: "Molecular oxygen (O₂) is the terminal electron acceptor. At Complex IV (Cytochrome c oxidase), O₂ accepts 4 electrons and 4 protons to form 2 molecules of metabolic water (H₂O)."
    },
    {
      id: 16,
      topic: "Chemiosmosis & Proton Gradient",
      question: "During oxidative phosphorylation, where do Complexes I, III, and IV pump hydrogen ions (H⁺) to establish the proton motive force?",
      options: [
        "A) From the intermembrane space into the matrix",
        "B) From the mitochondrial matrix into the intermembrane space",
        "C) From the cytoplasm directly into the nucleus",
        "D) From the cristae lumen into the endoplasmic reticulum"
      ],
      correct: 1,
      explanation: "Protons (H⁺) are pumped from the mitochondrial matrix across the inner membrane into the intermembrane space, creating a steep electrochemical concentration gradient (lower pH in intermembrane space)."
    },
    {
      id: 17,
      topic: "ATP Synthase Mechanism",
      question: "How does ATP Synthase harness the stored energy of the proton gradient to synthesize ATP?",
      options: [
        "A) Protons flow down their electrochemical gradient through the F₀ rotor back into the matrix.",
        "B) Protons are actively consumed by molecular oxygen inside the F₁ headpiece.",
        "C) ATP synthase directly hydrolyzes NADH inside the outer membrane.",
        "D) Protons are pumped out of the cell into extracellular fluid."
      ],
      correct: 0,
      explanation: "Protons flow passively down their electrochemical gradient through the F₀ channel of ATP Synthase back into the matrix. This proton motive force rotates the catalytic F₁ head, phosphorylating ADP + Pi ➔ ATP."
    },
    {
      id: 18,
      topic: "Fermentation Purpose",
      question: "Under anaerobic conditions, what is the primary biochemical objective of fermentation?",
      options: [
        "A) To generate additional 30 molecules of ATP in the absence of oxygen.",
        "B) To convert glucose directly into oxygen gas.",
        "C) To re-oxidize NADH back to NAD⁺ so glycolysis can continue producing ATP.",
        "D) To pump protons across the mitochondrial cristae."
      ],
      correct: 2,
      explanation: "Fermentation itself yields no extra ATP. Its vital purpose is to regenerate NAD⁺ from NADH by reducing pyruvate, allowing glycolysis (and its net 2 ATP yield) to continue uninterrupted in the absence of O₂."
    },
    {
      id: 19,
      topic: "Lactic vs. Alcoholic Fermentation",
      question: "Which of the following correctly distinguishes lactic acid fermentation from alcoholic fermentation?",
      options: [
        "A) Lactic fermentation releases CO₂ gas; alcoholic fermentation does not.",
        "B) Lactic fermentation produces lactate with NO CO₂; alcoholic fermentation yields ethanol AND CO₂.",
        "C) Lactic fermentation occurs only in yeast; alcoholic fermentation occurs in human skeletal muscles.",
        "D) Lactic fermentation yields 36 ATP; alcoholic fermentation yields 2 ATP."
      ],
      correct: 1,
      explanation: "Lactic acid fermentation (in muscle cells/Lactobacillus) reduces 3C pyruvate to 3C lactate without releasing CO₂. Alcoholic fermentation (in yeast) decarboxylates pyruvate to acetaldehyde + CO₂, then reduces acetaldehyde to 2C ethanol."
    },
    {
      id: 20,
      topic: "Beta-Oxidation of Fatty Acids",
      question: "Beta-oxidation of fatty acids takes place in the mitochondrial matrix and sequentially cleaves fatty acyl chains into 2-carbon units of:",
      options: [
        "A) Pyruvate",
        "B) Lactate",
        "C) Acetyl-CoA",
        "D) Oxaloacetate"
      ],
      correct: 2,
      explanation: "Beta-oxidation sequentially cleaves fatty acid chains into 2-carbon Acetyl-CoA molecules, while also generating 1 NADH and 1 FADH₂ per 2-carbon cleavage. The Acetyl-CoA then feeds directly into the Krebs cycle."
    },
    {
      id: 21,
      topic: "Energy Density Comparison",
      question: "Why do fats (lipids) release more than twice as much energy per gram (≈9 kcal/g) during catabolism compared to carbohydrates (≈4 kcal/g)?",
      options: [
        "A) Fats contain more oxygen atoms per carbon than carbohydrates.",
        "B) Hydrocarbon tails of fatty acids are in a much more chemically reduced state (rich in C-H bonds).",
        "C) Fats bypass the electron transport chain completely.",
        "D) Fats require fewer enzymes for complete catalytic breakdown."
      ],
      correct: 1,
      explanation: "Fatty acids are predominantly long hydrocarbon chains with high proportions of C-H bonds (highly reduced). They yield far more electrons per gram to NAD⁺ and FAD when oxidized, driving greater ATP synthesis via oxidative phosphorylation."
    },
    {
      id: 22,
      topic: "Cyanide Toxicity Mechanism",
      question: "Cyanide is a potent non-competitive respiratory poison that halts cellular ATP production by directly inhibiting which component?",
      options: [
        "A) Hexokinase in glycolysis",
        "B) Citrate synthase in the Krebs cycle",
        "C) Cytochrome c oxidase (Complex IV) in the ETC",
        "D) The mitochondrial pyruvate carrier"
      ],
      correct: 2,
      explanation: "Cyanide binds tightly to the ferric iron (Fe³⁺) in the heme group of Cytochrome c Oxidase (Complex IV), blocking electron transfer to O₂. This halts the proton pump, collapses the proton gradient, and ceases ATP synthesis."
    }
  ];

  /* ==========================================================================
     2. Quiz Engine State & Implementation
     ========================================================================== */
  let currentQIndex = 0;
  let score = 0;
  let userAnswers = new Array(quizData.length).fill(null);

  const qCurrentNumEl = document.getElementById('current-q-num');
  const qTotalNumEl = document.getElementById('total-q-num');
  const liveScoreEl = document.getElementById('live-score-display');
  const quizTopicTagEl = document.getElementById('quiz-topic-tag');
  const qProgressFillEl = document.getElementById('q-progress-bar-fill');
  const questionTextEl = document.getElementById('quiz-question-text');
  const optionsContainerEl = document.getElementById('quiz-options-container');
  const feedbackBoxEl = document.getElementById('quiz-feedback-box');
  const feedbackBadgeEl = document.getElementById('feedback-badge');
  const feedbackTextEl = document.getElementById('feedback-text');
  const prevBtnEl = document.getElementById('quiz-prev-btn');
  const nextBtnEl = document.getElementById('quiz-next-btn');
  const dotsContainerEl = document.getElementById('question-jump-dots');
  const activeQuizCard = document.getElementById('quiz-active-container');
  const resultCard = document.getElementById('quiz-result-container');
  const restartBtnEl = document.getElementById('quiz-restart-btn');

  // Stats Elements
  const statSectionsReadEl = document.getElementById('stat-sections-read');
  const statMcqsAttemptedEl = document.getElementById('stat-mcqs-attempted');
  const statLatestScoreEl = document.getElementById('stat-latest-score');
  const statChapterCompletionEl = document.getElementById('stat-chapter-completion');
  const btnResetProgress = document.getElementById('btn-reset-progress');

  function initQuiz() {
    if (!questionTextEl) return;
    if (qTotalNumEl) qTotalNumEl.textContent = quizData.length;
    renderJumpDots();
    loadQuestion(0);
    updateProgressDashboard();
  }

  function renderJumpDots() {
    if (!dotsContainerEl) return;
    dotsContainerEl.innerHTML = '';
    quizData.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `q-dot ${i === 0 ? 'active' : ''}`;
      dot.title = `Question ${i + 1}`;
      dot.addEventListener('click', () => {
        loadQuestion(i);
      });
      dotsContainerEl.appendChild(dot);
    });
  }

  function updateJumpDots() {
    if (!dotsContainerEl) return;
    const dots = dotsContainerEl.querySelectorAll('.q-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'correct', 'wrong');
      if (i === currentQIndex) dot.classList.add('active');
      if (userAnswers[i] !== null) {
        if (userAnswers[i] === quizData[i].correct) {
          dot.classList.add('correct');
        } else {
          dot.classList.add('wrong');
        }
      }
    });
  }

  function loadQuestion(index) {
    currentQIndex = index;
    const q = quizData[currentQIndex];

    if (qCurrentNumEl) qCurrentNumEl.textContent = index + 1;
    if (quizTopicTagEl) quizTopicTagEl.textContent = `Topic: ${q.topic}`;
    if (questionTextEl) questionTextEl.textContent = `${index + 1}. ${q.question}`;

    if (qProgressFillEl) {
      const percent = ((index + 1) / quizData.length) * 100;
      qProgressFillEl.style.width = `${percent}%`;
    }

    if (prevBtnEl) prevBtnEl.disabled = (index === 0);
    if (nextBtnEl) {
      nextBtnEl.textContent = (index === quizData.length - 1) ? 'Finish & See Results' : 'Next Question';
      nextBtnEl.disabled = (userAnswers[index] === null);
    }

    // Render Options
    if (optionsContainerEl) {
      optionsContainerEl.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const hasAnswered = (userAnswers[index] !== null);

      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span class="opt-letter">${letters[optIdx]}</span><span>${optText}</span>`;

        if (hasAnswered) {
          btn.disabled = true;
          if (optIdx === q.correct) {
            btn.classList.add('correct');
          } else if (optIdx === userAnswers[index]) {
            btn.classList.add('wrong');
          }
        } else {
          btn.addEventListener('click', () => handleOptionClick(optIdx));
        }

        optionsContainerEl.appendChild(btn);
      });
    }

    // Render Feedback if previously answered
    if (userAnswers[index] !== null) {
      showFeedback(userAnswers[index] === q.correct, q.explanation);
    } else {
      if (feedbackBoxEl) feedbackBoxEl.classList.add('hidden');
    }

    updateJumpDots();
  }

  function handleOptionClick(selectedIdx) {
    const q = quizData[currentQIndex];
    userAnswers[currentQIndex] = selectedIdx;

    const isCorrect = (selectedIdx === q.correct);
    if (isCorrect) {
      score++;
    }

    if (liveScoreEl) liveScoreEl.textContent = score;
    if (nextBtnEl) nextBtnEl.disabled = false;

    // Disable all options and style them
    const allBtns = optionsContainerEl.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    showFeedback(isCorrect, q.explanation);
    updateJumpDots();
    saveQuizProgress();
    updateProgressDashboard();
  }

  function showFeedback(isCorrect, explanation) {
    if (!feedbackBoxEl || !feedbackBadgeEl || !feedbackTextEl) return;
    feedbackBoxEl.classList.remove('hidden');

    if (isCorrect) {
      feedbackBadgeEl.className = 'feedback-badge correct';
      feedbackBadgeEl.textContent = '✔ Correct Answer!';
    } else {
      feedbackBadgeEl.className = 'feedback-badge wrong';
      feedbackBadgeEl.textContent = '✖ Incorrect';
    }

    feedbackTextEl.textContent = explanation;
  }

  if (prevBtnEl) {
    prevBtnEl.addEventListener('click', () => {
      if (currentQIndex > 0) loadQuestion(currentQIndex - 1);
    });
  }

  if (nextBtnEl) {
    nextBtnEl.addEventListener('click', () => {
      if (currentQIndex < quizData.length - 1) {
        loadQuestion(currentQIndex + 1);
      } else {
        finishQuiz();
      }
    });
  }

  function finishQuiz() {
    if (activeQuizCard) activeQuizCard.classList.add('hidden');
    if (resultCard) resultCard.classList.remove('hidden');

    const total = quizData.length;
    const finalScore = userAnswers.reduce((acc, ans, i) => (ans === quizData[i].correct ? acc + 1 : acc), 0);
    const percent = Math.round((finalScore / total) * 100);

    const scoreBigEl = document.getElementById('result-final-score');
    const scorePercentEl = document.getElementById('result-final-percent');
    const rankBadgeEl = document.getElementById('result-rank-badge');
    const resultIconEl = document.getElementById('result-icon');
    const resultTitleEl = document.getElementById('result-title');

    if (scoreBigEl) scoreBigEl.textContent = `${finalScore} / ${total}`;
    if (scorePercentEl) scorePercentEl.textContent = `${percent}% Accuracy`;

    if (rankBadgeEl) {
      if (percent >= 90) {
        rankBadgeEl.textContent = '🌟 MDCAT Topper • High Distinction';
        rankBadgeEl.style.background = '#d1fae5';
        rankBadgeEl.style.color = '#065f46';
        if (resultIconEl) resultIconEl.textContent = '🏆';
        if (resultTitleEl) resultTitleEl.textContent = 'Outstanding Mastery!';
      } else if (percent >= 75) {
        rankBadgeEl.textContent = '⭐ Medical Merit • Excellent Grip';
        rankBadgeEl.style.background = '#e0f2fe';
        rankBadgeEl.style.color = '#075985';
        if (resultIconEl) resultIconEl.textContent = '🎉';
        if (resultTitleEl) resultTitleEl.textContent = 'Great Performance!';
      } else if (percent >= 50) {
        rankBadgeEl.textContent = '📖 Good Effort • Review High-Yield Points';
        rankBadgeEl.style.background = '#fef3c7';
        rankBadgeEl.style.color = '#92400e';
        if (resultIconEl) resultIconEl.textContent = '💡';
        if (resultTitleEl) resultTitleEl.textContent = 'Good Attempt!';
      } else {
        rankBadgeEl.textContent = '⚠️ Revision Recommended';
        rankBadgeEl.style.background = '#fee2e2';
        rankBadgeEl.style.color = '#991b1b';
        if (resultIconEl) resultIconEl.textContent = '📚';
        if (resultTitleEl) resultTitleEl.textContent = 'Keep Practicing!';
      }
    }

    try {
      localStorage.setItem('mdcat_bio_latest_score', `${finalScore}/${total}`);
      localStorage.setItem('mdcat_bio_latest_percent', `${percent}%`);
      localStorage.setItem('mdcat_bio_quiz_completed', 'true');
    } catch (e) {
      console.warn('localStorage access denied:', e);
    }

    updateProgressDashboard();
  }

  if (restartBtnEl) {
    restartBtnEl.addEventListener('click', () => {
      score = 0;
      userAnswers = new Array(quizData.length).fill(null);
      if (liveScoreEl) liveScoreEl.textContent = '0';
      if (resultCard) resultCard.classList.add('hidden');
      if (activeQuizCard) activeQuizCard.classList.remove('hidden');
      renderJumpDots();
      loadQuestion(0);
      updateProgressDashboard();
    });
  }

  function saveQuizProgress() {
    try {
      const attempted = userAnswers.filter(a => a !== null).length;
      localStorage.setItem('mdcat_bio_attempted_count', attempted.toString());
    } catch (e) {
      console.warn('localStorage not writable:', e);
    }
  }

  /* ==========================================================================
     3. Super-Memory Energy Pipeline (9-Step Pathway Detail Viewer)
     ========================================================================== */
  const energyFlowData = {
    1: {
      stepBadge: "Step 1 of 9",
      title: "Glucose (6C)",
      desc: "A stable hexose sugar that serves as the primary respiratory substrate in most living organisms. It enters the cytosol to initiate cellular energy extraction.",
      loc: "Cytosolic Entry",
      atp: "0 ATP (Starting substrate)",
      mdcat: "Phosphorylated by hexokinase/glucokinase to trap it in the cell as G-6-P."
    },
    2: {
      stepBadge: "Step 2 of 9",
      title: "Glycolysis (10-Step Pathway)",
      desc: "Cleaves 1 glucose molecule into 2 triose phosphates and oxidizes them into pyruvate. Consumes 2 ATP in investment phase, produces 4 ATP in payoff phase.",
      loc: "Cytoplasm / Cytosol (Anaerobic)",
      atp: "Net 2 ATP (Substrate-level) + 2 NADH",
      mdcat: "PFK-1 catalyzes the committed rate-limiting step. Does NOT require oxygen."
    },
    3: {
      stepBadge: "Step 3 of 9",
      title: "Pyruvate (2 × 3C)",
      desc: "The critical 3-carbon branching point metabolite. Under aerobic conditions, it is translocated across the inner mitochondrial membrane into the matrix.",
      loc: "Mitochondrial Matrix Entry",
      atp: "2 Pyruvate molecules per glucose",
      mdcat: "In absence of O₂, pyruvate enters fermentation to regenerate NAD⁺."
    },
    4: {
      stepBadge: "Step 4 of 9",
      title: "Acetyl-CoA (2 × 2C)",
      desc: "Produced via oxidative decarboxylation by the Pyruvate Dehydrogenase Complex. Releases the first CO₂ of cellular respiration and produces NADH.",
      loc: "Mitochondrial Matrix",
      atp: "Yields 2 NADH + 2 CO₂ per glucose",
      mdcat: "Coenzyme A carries high-energy acetyl group into the Krebs cycle."
    },
    5: {
      stepBadge: "Step 5 of 9",
      title: "Krebs / Citric Acid Cycle",
      desc: "A cyclic metabolic hub where Acetyl-CoA condenses with Oxaloacetate (4C) to form Citrate (6C), sequentially releasing 2 CO₂ per turn.",
      loc: "Mitochondrial Matrix",
      atp: "2 ATP/GTP + 6 NADH + 2 FADH₂ + 4 CO₂ per glucose",
      mdcat: "Oxaloacetate (4C) is regenerated at the end of each turn."
    },
    6: {
      stepBadge: "Step 6 of 9",
      title: "NADH & FADH₂ Electron Carriers",
      desc: "Reduced high-energy coenzymes carrying pairs of high-potential electrons extracted from glucose oxidation toward the respiratory chain.",
      loc: "Mitochondrial Matrix & Inner Membrane",
      atp: "10 NADH + 2 FADH₂ total per glucose",
      mdcat: "Each NADH yields ~2.5 ATP; each FADH₂ yields ~1.5 ATP via ETC."
    },
    7: {
      stepBadge: "Step 7 of 9",
      title: "Electron Transport Chain (ETC)",
      desc: "Multi-protein Complexes I–IV transfer electrons down a redox potential gradient to molecular Oxygen (O₂), pumping protons into the intermembrane space.",
      loc: "Inner Mitochondrial Membrane (Cristae)",
      atp: "Drives Proton Pumping (No direct ATP)",
      mdcat: "Oxygen is the terminal electron acceptor forming H₂O."
    },
    8: {
      stepBadge: "Step 8 of 9",
      title: "H⁺ Electrochemical Proton Gradient",
      desc: "Accumulation of H⁺ in the narrow intermembrane space creates a steep chemical (pH) and electrical voltage potential known as the Proton Motive Force.",
      loc: "Intermembrane Space",
      atp: "Stores Potential Energy",
      mdcat: "Peter Mitchell's Chemiosmotic Hypothesis (Nobel Prize 1978)."
    },
    9: {
      stepBadge: "Step 9 of 9",
      title: "ATP Synthase (F₀F₁ Complex)",
      desc: "A molecular rotary motor that channels H⁺ back into the matrix, coupling kinetic rotation to the phosphorylation of ADP + Pi into ATP.",
      loc: "Inner Mitochondrial Membrane",
      atp: "26–28 ATP (Oxidative Phosphorylation)",
      mdcat: "F₀ is the transmembrane proton rotor; F₁ is the catalytic head."
    },
    10: {
      stepBadge: "Output Goal",
      title: "ATP (Cellular Energy Currency)",
      desc: "The universal immediate chemical energy carrier that powers active transport, mechanical muscle contraction, biosynthesis, and cell division.",
      loc: "Whole Cell Distribution",
      atp: "Total 30–32 ATP per Glucose",
      mdcat: "ATP is an immediate transfer currency, not long-term storage."
    }
  };

  const flowNodes = document.querySelectorAll('.flow-node');
  const flowBadgeEl = document.getElementById('detail-step-badge');
  const flowTitleEl = document.getElementById('detail-step-title');
  const flowDescEl = document.getElementById('detail-step-desc');
  const flowLocEl = document.getElementById('detail-step-loc');
  const flowAtpEl = document.getElementById('detail-step-atp');
  const flowMdcatEl = document.getElementById('detail-step-mdcat');

  flowNodes.forEach(node => {
    node.addEventListener('click', () => {
      flowNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const flowId = node.getAttribute('data-flow-id');
      const data = energyFlowData[flowId];
      if (data && flowTitleEl) {
        flowBadgeEl.textContent = data.stepBadge;
        flowTitleEl.textContent = data.title;
        flowDescEl.textContent = data.desc;
        flowLocEl.textContent = data.loc;
        flowAtpEl.textContent = data.atp;
        flowMdcatEl.textContent = data.mdcat;
      }
    });
  });

  /* ==========================================================================
     4. Interactive Note Widgets & Animations
     ========================================================================== */

  // (A) ATP Hydrolysis & Regeneration Simulation
  const btnHydrolyze = document.getElementById('btn-hydrolyze-atp');
  const btnSynthesize = document.getElementById('btn-synthesize-atp');
  const gammaP = document.getElementById('gamma-phosphate');
  const atpFeedback = document.getElementById('atp-reaction-feedback');

  if (btnHydrolyze && gammaP && atpFeedback) {
    btnHydrolyze.addEventListener('click', () => {
      gammaP.classList.add('detached');
      gammaP.textContent = 'Pᵢ (Released)';
      atpFeedback.innerHTML = '⚡ <strong>ATP Hydrolysis:</strong> ATP + H₂O ➔ ADP + Pᵢ + <strong>Energy (ΔG ≈ -30.5 kJ/mol)</strong> released to power cellular work (muscle contraction, active transport).';
      atpFeedback.style.borderLeft = '4px solid var(--color-danger)';
    });
  }

  if (btnSynthesize && gammaP && atpFeedback) {
    btnSynthesize.addEventListener('click', () => {
      gammaP.classList.remove('detached');
      gammaP.textContent = 'P_γ (High Energy)';
      atpFeedback.innerHTML = '🔄 <strong>ATP Regeneration:</strong> ADP + Pᵢ + <strong>Energy (from cellular respiration / catabolism)</strong> ➔ ATP + H₂O. Intact energy currency restored!';
      atpFeedback.style.borderLeft = '4px solid var(--emerald-600)';
    });
  }

  // (B) Activation Energy Curve Toggle
  const toggleUncatBtn = document.getElementById('toggle-uncatalyzed-btn');
  const toggleCatBtn = document.getElementById('toggle-catalyzed-btn');
  const uncatCurve = document.getElementById('uncatalyzed-curve');
  const catCurve = document.getElementById('catalyzed-curve');
  const eaExpl = document.getElementById('ea-expl-box');

  if (toggleUncatBtn && uncatCurve) {
    toggleUncatBtn.addEventListener('click', () => {
      const isVisible = uncatCurve.style.display !== 'none';
      uncatCurve.style.display = isVisible ? 'none' : 'block';
      toggleUncatBtn.classList.toggle('active', !isVisible);
      updateEaExpl();
    });
  }

  if (toggleCatBtn && catCurve) {
    toggleCatBtn.addEventListener('click', () => {
      const isVisible = catCurve.style.display !== 'none';
      catCurve.style.display = isVisible ? 'none' : 'block';
      toggleCatBtn.classList.toggle('active', !isVisible);
      updateEaExpl();
    });
  }

  function updateEaExpl() {
    if (!eaExpl) return;
    const catOn = catCurve && catCurve.style.display !== 'none';
    const uncatOn = uncatCurve && uncatCurve.style.display !== 'none';

    if (catOn && uncatOn) {
      eaExpl.innerHTML = 'Comparing curves: Notice how the enzyme <strong>lowers the activation energy barrier (Eₐ)</strong> without altering the energy level of the reactants or products. <strong>ΔG remains completely identical!</strong>';
    } else if (catOn) {
      eaExpl.innerHTML = 'Catalyzed reaction: The enzyme stabilizes the transition state, requiring a much smaller energy input to proceed rapidly.';
    } else if (uncatOn) {
      eaExpl.innerHTML = 'Uncatalyzed reaction: Requires a high activation energy threshold (Eₐ), resulting in a slow spontaneous reaction rate.';
    } else {
      eaExpl.innerHTML = 'Toggle the buttons above to visualize catalyzed and uncatalyzed energy barriers.';
    }
  }

  // (C) Enzyme Inhibition Simulator
  const btnNoInhibit = document.getElementById('sim-no-inhibit');
  const btnCompInhibit = document.getElementById('sim-comp');
  const btnNonCompInhibit = document.getElementById('sim-noncomp');
  const simModeTitle = document.getElementById('sim-mode-title');
  const simVmax = document.getElementById('sim-vmax');
  const simKm = document.getElementById('sim-km');
  const simSEffect = document.getElementById('sim-s-effect');
  const simDesc = document.getElementById('sim-desc');

  const inhibitBtns = [btnNoInhibit, btnCompInhibit, btnNonCompInhibit];

  function setInhibitSim(mode) {
    inhibitBtns.forEach(b => b && b.classList.remove('active'));

    if (mode === 'none') {
      if (btnNoInhibit) btnNoInhibit.classList.add('active');
      if (simModeTitle) simModeTitle.textContent = 'Normal Enzyme Kinetics (No Inhibitor)';
      if (simVmax) simVmax.innerHTML = '<span class="text-emerald">100% (Normal V_max)</span>';
      if (simKm) simKm.textContent = 'Standard K_m (Normal Affinity)';
      if (simSEffect) simSEffect.textContent = 'Reaches V_max as [S] increases';
      if (simDesc) simDesc.textContent = 'Substrate binds freely to the active site. Reaction reaches standard maximum velocity (V_max) when active sites saturate.';
    } else if (mode === 'comp') {
      if (btnCompInhibit) btnCompInhibit.classList.add('active');
      if (simModeTitle) simModeTitle.textContent = 'Competitive Inhibition (Active Site Competition)';
      if (simVmax) simVmax.innerHTML = '<span class="text-emerald">Unchanged (100% reachable)</span>';
      if (simKm) simKm.innerHTML = '<span class="text-danger">Increased (Lower Apparent Affinity)</span>';
      if (simSEffect) simSEffect.innerHTML = '<strong class="text-emerald">High [S] Overcomes Inhibition</strong>';
      if (simDesc) simDesc.textContent = 'Inhibitor mimics substrate structure and binds active site. Adding high substrate concentrations outcompetes the inhibitor, reaching the normal V_max.';
    } else if (mode === 'noncomp') {
      if (btnNonCompInhibit) btnNonCompInhibit.classList.add('active');
      if (simModeTitle) simModeTitle.textContent = 'Non-Competitive Inhibition (Allosteric Binding)';
      if (simVmax) simVmax.innerHTML = '<span class="text-danger">Decreased (V_max reduced)</span>';
      if (simKm) simKm.textContent = 'Unchanged K_m (Binding unchanged)';
      if (simSEffect) simSEffect.innerHTML = '<strong class="text-danger">High [S] CANNOT Overcome</strong>';
      if (simDesc) simDesc.textContent = 'Inhibitor binds to an allosteric site, altering enzyme conformation. Even infinite substrate cannot restore full catalytic velocity; V_max remains depressed.';
    }
  }

  if (btnNoInhibit) btnNoInhibit.addEventListener('click', () => setInhibitSim('none'));
  if (btnCompInhibit) btnCompInhibit.addEventListener('click', () => setInhibitSim('comp'));
  if (btnNonCompInhibit) btnNonCompInhibit.addEventListener('click', () => setInhibitSim('noncomp'));

  // (D) 5-Stage Respiration Navigator
  const stageData = {
    1: {
      name: "1. Glycolysis",
      location: "Cytoplasm / Cytosol",
      inputs: "1 Glucose (6C), 2 ATP, 2 NAD⁺, 4 ADP + 4 Pᵢ",
      outputs: "2 Pyruvate (3C), 2 NADH (+ 2 H⁺), 4 ATP (gross) / 2 ATP (net)",
      atpYield: "Net +2 ATP (Substrate-Level Phosphorylation)",
      keyFact: "Anaerobic process occurring in the cytoplasm. PFK-1 is the primary regulatory pacemaker enzyme."
    },
    2: {
      name: "2. Pyruvate Oxidation (The Link Reaction)",
      location: "Mitochondrial Matrix",
      inputs: "2 Pyruvate (3C), 2 CoA-SH, 2 NAD⁺ (per glucose)",
      outputs: "2 Acetyl-CoA (2C), 2 CO₂, 2 NADH (+ 2 H⁺)",
      atpYield: "0 ATP direct (Produces 2 NADH for ETC)",
      keyFact: "Releases the first 2 molecules of CO₂. Catalyzed by the multienzyme Pyruvate Dehydrogenase Complex."
    },
    3: {
      name: "3. Krebs / Citric Acid Cycle (2 Turns / Glucose)",
      location: "Mitochondrial Matrix",
      inputs: "2 Acetyl-CoA, 6 NAD⁺, 2 FAD, 2 ADP/GDP + 2 Pᵢ, 6 H₂O",
      outputs: "4 CO₂, 6 NADH (+ 6 H⁺), 2 FADH₂, 2 ATP (or GTP)",
      atpYield: "+2 ATP (Substrate-Level Phosphorylation)",
      keyFact: "Acetyl-CoA (2C) joins Oxaloacetate (4C) to form Citrate (6C). Succinate Dehydrogenase is bound to the cristae."
    },
    4: {
      name: "4. Electron Transport Chain (ETC)",
      location: "Inner Mitochondrial Membrane (Cristae)",
      inputs: "10 NADH, 2 FADH₂, 6 O₂, H⁺ ions",
      outputs: "10 NAD⁺, 2 FAD, 6 H₂O, Proton Gradient across cristae",
      atpYield: "Establishes Proton Motive Force",
      keyFact: "Complexes I, III, and IV pump H⁺ into the intermembrane space. Molecular Oxygen (O₂) is the final electron acceptor."
    },
    5: {
      name: "5. Chemiosmosis & Oxidative Phosphorylation",
      location: "Inner Mitochondrial Membrane (ATP Synthase)",
      inputs: "Proton Gradient (H⁺ in Intermembrane Space), ADP + Pᵢ",
      outputs: "26–28 ATP synthesized in the matrix",
      atpYield: "+26 to 28 ATP (Oxidative Phosphorylation)",
      keyFact: "Protons flow down their electrochemical gradient through the F₀ channel, rotating the F₁ head to synthesize ATP."
    }
  };

  const stageTabs = document.querySelectorAll('.stage-tab-btn');
  const stagePanel = document.getElementById('stage-detail-panel');

  function renderStage(stageNum) {
    if (!stagePanel) return;
    const s = stageData[stageNum];
    stagePanel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-navy);">${s.name}</h3>
        <span style="background: var(--emerald-100); color: var(--emerald-800); font-weight: 700; font-size: 0.8rem; padding: 4px 12px; border-radius: 9999px;">Location: ${s.location}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px;">
        <div style="background: var(--bg-secondary); padding: 12px 14px; border-radius: 8px; border: 1px solid var(--border-light);">
          <strong style="display: block; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Starting Inputs</strong>
          <span style="font-size: 0.88rem; color: var(--text-navy); font-weight: 600;">${s.inputs}</span>
        </div>
        <div style="background: var(--bg-secondary); padding: 12px 14px; border-radius: 8px; border: 1px solid var(--border-light);">
          <strong style="display: block; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Final Outputs</strong>
          <span style="font-size: 0.88rem; color: var(--text-navy); font-weight: 600;">${s.outputs}</span>
        </div>
        <div style="background: var(--emerald-50); padding: 12px 14px; border-radius: 8px; border: 1px solid var(--emerald-200);">
          <strong style="display: block; font-size: 0.75rem; color: var(--emerald-700); text-transform: uppercase;">Direct ATP Yield</strong>
          <span style="font-size: 0.88rem; color: var(--emerald-900); font-weight: 800;">${s.atpYield}</span>
        </div>
      </div>
      <div style="background: #f8fafc; border-left: 4px solid var(--emerald-500); padding: 12px 16px; border-radius: 4px; font-size: 0.9rem; color: var(--text-body);">
        <strong>MDCAT Key Rule:</strong> ${s.keyFact}
      </div>
    `;
  }

  stageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stageTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const stageNum = tab.getAttribute('data-stage');
      renderStage(stageNum);
    });
  });

  // Render Initial Stage 1
  renderStage(1);

  // (E) Chemiosmosis & ETC Simulator
  const btnRunEtc = document.getElementById('btn-run-etc');
  const rotor = document.getElementById('synthase-rotor');
  const etcCounter = document.getElementById('sim-etc-counter');
  let producedAtp = 0;

  if (btnRunEtc && rotor && etcCounter) {
    btnRunEtc.addEventListener('click', () => {
      producedAtp += 2;
      etcCounter.textContent = `ATP Produced: ${producedAtp}`;
      rotor.classList.add('spinning');
      btnRunEtc.disabled = true;
      btnRunEtc.textContent = 'Protons Flowing ➔ Generating ATP...';

      setTimeout(() => {
        rotor.classList.remove('spinning');
        btnRunEtc.disabled = false;
        btnRunEtc.textContent = 'Pump More Protons & Synthesize ATP';
      }, 1200);
    });
  }

  /* ==========================================================================
     5. Educational Diagram Fallback Handler
     ========================================================================== */
  window.handleImageError = function(imgElement, wikiUrl, title) {
    if (!imgElement || !imgElement.parentElement) return;
    const parent = imgElement.parentElement;
    parent.innerHTML = `
      <div class="diagram-fallback-box">
        <svg style="width: 48px; height: 48px; margin: 0 auto 12px; color: var(--emerald-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-navy); margin-bottom: 6px;">${title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;">High-resolution scientific educational diagram available on Wikimedia Commons.</p>
        <a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <span>View Diagram on Wikimedia Commons ↗</span>
        </a>
      </div>
    `;
  };

  /* ==========================================================================
     6. Quick Revision Slide-Out Drawer & Navigation
     ========================================================================== */
  const quickRevDrawer = document.getElementById('quick-rev-drawer');
  const quickRevToggleBtn = document.getElementById('quick-rev-toggle-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (quickRevDrawer) {
      quickRevDrawer.classList.add('open');
      quickRevDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (quickRevDrawer) {
      quickRevDrawer.classList.remove('open');
      quickRevDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (quickRevToggleBtn) quickRevToggleBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('[data-close-drawer="true"]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', !isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', (!isOpen).toString());
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     7. Scroll Progress Bar & Floating Back-To-Top
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const headerEl = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (headerEl) {
      headerEl.classList.toggle('scrolled', scrollTop > 20);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 400);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     8. Section Reading Tracker & Analytics Dashboard
     ========================================================================== */
  const viewedSections = new Set();
  const totalSectionsCount = 15;

  // Load viewed sections from localStorage
  try {
    const saved = localStorage.getItem('mdcat_bio_viewed_sections');
    if (saved) {
      JSON.parse(saved).forEach(s => viewedSections.add(s));
    }
  } catch (e) {
    console.warn('Unable to load progress:', e);
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40% 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const secId = entry.target.getAttribute('data-section-id') || entry.target.id;
        if (secId && secId.startsWith('sec-')) {
          viewedSections.add(secId);
          try {
            localStorage.setItem('mdcat_bio_viewed_sections', JSON.stringify(Array.from(viewedSections)));
          } catch (e) {}
          updateProgressDashboard();
        }

        // Update Topic Navigator Active Link
        const activeLink = document.querySelector(`.topic-link[href="#${secId}"]`);
        if (activeLink) {
          document.querySelectorAll('.topic-link').forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.note-card').forEach(card => {
    sectionObserver.observe(card);
  });

  function updateProgressDashboard() {
    const viewedCount = viewedSections.size;
    if (statSectionsReadEl) {
      statSectionsReadEl.textContent = `${viewedCount} / ${totalSectionsCount}`;
    }

    let attemptedCount = 0;
    try {
      const savedAttempted = localStorage.getItem('mdcat_bio_attempted_count');
      if (savedAttempted) attemptedCount = parseInt(savedAttempted, 10);
      else attemptedCount = userAnswers.filter(a => a !== null).length;
    } catch (e) {
      attemptedCount = userAnswers.filter(a => a !== null).length;
    }

    if (statMcqsAttemptedEl) {
      statMcqsAttemptedEl.textContent = `${attemptedCount} / ${quizData.length}`;
    }

    let latestScore = '--';
    try {
      const savedScore = localStorage.getItem('mdcat_bio_latest_score');
      if (savedScore) latestScore = savedScore;
    } catch (e) {}

    if (statLatestScoreEl) {
      statLatestScoreEl.textContent = latestScore;
    }

    // Chapter completion calculation (50% from notes reading + 50% from MCQs completion)
    const notesPercent = Math.min(100, (viewedCount / totalSectionsCount) * 100);
    const mcqPercent = Math.min(100, (attemptedCount / quizData.length) * 100);
    const totalMastery = Math.round((notesPercent * 0.5) + (mcqPercent * 0.5));

    if (statChapterCompletionEl) {
      statChapterCompletionEl.textContent = `${totalMastery}%`;
    }
  }

  // Reset Progress Button
  if (btnResetProgress) {
    btnResetProgress.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your Bioenergetics reading and quiz history?')) {
        try {
          localStorage.removeItem('mdcat_bio_viewed_sections');
          localStorage.removeItem('mdcat_bio_attempted_count');
          localStorage.removeItem('mdcat_bio_latest_score');
          localStorage.removeItem('mdcat_bio_latest_percent');
          localStorage.removeItem('mdcat_bio_quiz_completed');
        } catch (e) {}
        viewedSections.clear();
        score = 0;
        userAnswers = new Array(quizData.length).fill(null);
        if (liveScoreEl) liveScoreEl.textContent = '0';
        loadQuestion(0);
        updateProgressDashboard();
        alert('Chapter progress has been reset.');
      }
    });
  }

  // High Yield Cards Click Animation / Copy
  document.querySelectorAll('.hy-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => { card.style.transform = ''; }, 150);
    });
  });

  // 3D Memory Cards Tap Flip on Touch Screens
  document.querySelectorAll('.mem-card-3d').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // Initialize Quiz Engine on Startup
  initQuiz();
});
