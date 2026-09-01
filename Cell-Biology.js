/**
 * EduNexa AI — MDCAT Biology: Cell Biology Master JavaScript Engine
 * Handles: Progress Tracking (localStorage), ScrollSpy, Flashcards, Facts Filtering, and Practice Quiz
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. STATE & STORAGE MANAGEMENT
  // ==========================================================================

  const STORAGE_KEYS = {
    COMPLETED_SECTIONS: 'mdcat_cell_bio_completed_sections',
    QUIZ_BEST_SCORE: 'mdcat_cell_bio_quiz_best',
    QUIZ_LAST_SCORE: 'mdcat_cell_bio_quiz_last',
    ACTIVE_RECALL_STATE: 'mdcat_cell_bio_flashcards_revealed'
  };

  // Total major trackable sections
  const TOTAL_SECTIONS = 23;

  function getCompletedSections() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_SECTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('localStorage error:', e);
      return [];
    }
  }

  function saveCompletedSections(sections) {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_SECTIONS, JSON.stringify(sections));
    } catch (e) {
      console.warn('localStorage save error:', e);
    }
  }

  function updateProgressUI() {
    const completed = getCompletedSections();
    const count = completed.length;
    const percentage = Math.round((count / TOTAL_SECTIONS) * 100);

    // Update Banner / Hero Progress Elements
    const heroProgressVal = document.getElementById('stat-progress-val');
    const bannerPct = document.getElementById('banner-progress-pct');
    const bannerFill = document.getElementById('banner-progress-fill');
    const completedCountEl = document.getElementById('completed-sections-count');

    if (heroProgressVal) heroProgressVal.textContent = `${percentage}%`;
    if (bannerPct) bannerPct.textContent = `${percentage}%`;
    if (bannerFill) bannerFill.style.width = `${percentage}%`;
    if (completedCountEl) completedCountEl.textContent = `${count} / ${TOTAL_SECTIONS}`;

    // Update individual section buttons and TOC items
    document.querySelectorAll('.section-card').forEach(card => {
      const secId = card.getAttribute('data-section-id');
      const isDone = completed.includes(secId);
      const btn = card.querySelector('.section-complete-btn');
      const tocLink = document.querySelector(`.toc-link[href="#${card.id}"]`);

      if (isDone) {
        card.classList.add('completed');
        if (btn) {
          btn.classList.add('is-completed');
          btn.innerHTML = '✓ Completed';
          btn.setAttribute('aria-pressed', 'true');
        }
        if (tocLink) tocLink.classList.add('completed');
      } else {
        card.classList.remove('completed');
        if (btn) {
          btn.classList.remove('is-completed');
          btn.innerHTML = 'Mark Complete';
          btn.setAttribute('aria-pressed', 'false');
        }
        if (tocLink) tocLink.classList.remove('completed');
      }
    });
  }

  function toggleSectionComplete(secId) {
    let completed = getCompletedSections();
    if (completed.includes(secId)) {
      completed = completed.filter(id => id !== secId);
    } else {
      completed.push(secId);
    }
    saveCompletedSections(completed);
    updateProgressUI();
  }

  // ==========================================================================
  // 2. QUIZ DATA (15 Authentic MDCAT-Style Questions)
  // ==========================================================================

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      difficulty: 'easy',
      topic: 'Cell Theory',
      question: 'Which scientist formulated the principle "Omnis cellula e cellula", emphasizing that all cells arise from pre-existing cells?',
      options: [
        'Robert Hooke',
        'Matthias Schleiden',
        'Rudolf Virchow',
        'Theodor Schwann'
      ],
      correct: 2, // Index 2: Rudolf Virchow
      explanation: 'Rudolf Virchow in 1855 proposed the generalization that new cells are formed only by division of previously existing living cells ("Omnis cellula e cellula"). Hooke coined the term cell, Schleiden studied plants, and Schwann studied animals.'
    },
    {
      id: 2,
      difficulty: 'medium',
      topic: 'Prokaryotes vs Eukaryotes',
      question: 'Which of the following cellular components is found in BOTH prokaryotic and eukaryotic cells?',
      options: [
        'Endoplasmic reticulum',
        'Nuclear membrane',
        'Mitochondria',
        'Ribosomes'
      ],
      correct: 3, // Index 3: Ribosomes
      explanation: 'Ribosomes are universal non-membrane-bound ribonucleoprotein structures present in both prokaryotes (70S) and eukaryotes (80S in cytoplasm). Endoplasmic reticulum, nuclear membrane, and mitochondria are membrane-bound and strictly eukaryotic.'
    },
    {
      id: 3,
      difficulty: 'easy',
      topic: 'Plant vs Animal Cells',
      question: 'Which organelle or cellular feature is present in animal cells but typically ABSENT in higher plant cells?',
      options: [
        'Centrioles',
        'Golgi apparatus',
        'Mitochondria',
        'Plasma membrane'
      ],
      correct: 0, // Index 0: Centrioles
      explanation: 'Centrioles are barrel-shaped microtubule structures found in animal centrosomes. Higher plant cells organize their mitotic spindle without centrioles. Golgi, mitochondria, and plasma membranes are present in both.'
    },
    {
      id: 4,
      difficulty: 'medium',
      topic: 'Plasma Membrane',
      question: 'According to the Fluid Mosaic Model of Singer and Nicolson, the hydrophobic core of the plasma membrane is primarily composed of:',
      options: [
        'Hydrophilic phosphate heads',
        'Nonpolar fatty acid tails of phospholipids',
        'Peripheral glycoproteins',
        'Surface oligosaccharide chains'
      ],
      correct: 1, // Index 1: Nonpolar fatty acid tails
      explanation: 'The lipid bilayer orientates its hydrophilic phosphate heads toward aqueous cytoplasm and extracellular fluid, while the hydrophobic fatty acid hydrocarbon tails face inward, creating the hydrophobic core.'
    },
    {
      id: 5,
      difficulty: 'hard',
      topic: 'Active Transport',
      question: 'In each cycle of the standard Sodium-Potassium ATPase pump (Na⁺/K⁺ pump), what is the exact stoichiometric transport of ions per hydrolyzed ATP?',
      options: [
        '2 Na⁺ pumped out, 3 K⁺ pumped in',
        '3 Na⁺ pumped out, 2 K⁺ pumped in',
        '3 Na⁺ pumped in, 2 K⁺ pumped out',
        '2 Na⁺ pumped in, 2 K⁺ pumped out'
      ],
      correct: 1, // Index 1: 3 Na+ out, 2 K+ in
      explanation: 'The electrogenic Na⁺/K⁺ ATPase moves 3 Na⁺ ions outward and 2 K⁺ ions inward against their respective electrochemical gradients using energy from 1 ATP molecule.'
    },
    {
      id: 6,
      difficulty: 'medium',
      topic: 'Endomembrane System',
      question: 'Proteins synthesized on bound ribosomes of the Rough Endoplasmic Reticulum (RER) typically proceed directly to which organelle for modification and sorting?',
      options: [
        'Peroxisome',
        'Lysosome directly',
        'Golgi apparatus (cis face)',
        'Nucleolus'
      ],
      correct: 2, // Index 2: Golgi apparatus
      explanation: 'Transport vesicles from the Rough ER bud off and fuse with the cis-face of the Golgi apparatus, where proteins undergo glycosylation, sorting, and packaging into secretory or lysosomal vesicles.'
    },
    {
      id: 7,
      difficulty: 'easy',
      topic: 'Organelles',
      question: 'Which eukaryotic organelle contains acidic hydrolytic enzymes and is responsible for intracellular digestion and autophagy?',
      options: [
        'Ribosome',
        'Lysosome',
        'Centrosome',
        'Smooth ER'
      ],
      correct: 1, // Index 1: Lysosome
      explanation: 'Lysosomes are membrane-bound organelles containing acid hydrolases (pH ~5.0) that digest worn-out organelles (autophagy), foreign phagocytosed particles, and macromolecules.'
    },
    {
      id: 8,
      difficulty: 'medium',
      topic: 'Mitochondria',
      question: 'Mitochondria are regarded as semi-autonomous organelles because they possess their own:',
      options: [
        'Cell wall and cellulose',
        'Circular DNA (mtDNA) and 70S ribosomes',
        'Endoplasmic reticulum and nucleolus',
        'Microfilaments and lysosomes'
      ],
      correct: 1, // Index 1: Circular DNA and 70S ribosomes
      explanation: 'Under the endosymbiotic theory, mitochondria contain their own circular double-stranded DNA, RNA, and 70S ribosomes, allowing self-replication and synthesis of several mitochondrial proteins.'
    },
    {
      id: 9,
      difficulty: 'easy',
      topic: 'Plastids',
      question: 'In a chloroplast, stacks of disc-like thylakoid membranes where light-dependent photosynthetic reactions occur are termed:',
      options: [
        'Stroma',
        'Cristae',
        'Grana (singular: granum)',
        'Cisternae'
      ],
      correct: 2, // Index 2: Grana
      explanation: 'Grana are disc-like stacks of chlorophyll-containing thylakoids suspended within the stroma. Cristae are folds in mitochondria; cisternae are flattened Golgi/ER sacs.'
    },
    {
      id: 10,
      difficulty: 'medium',
      topic: 'Cytoskeleton',
      question: 'Microtubules, which constitute the mitotic spindle fibers, cilia, and flagella, are polymerized from dimers of which protein?',
      options: [
        'Actin',
        'Tubulin (α and β)',
        'Keratin',
        'Myosin'
      ],
      correct: 1, // Index 1: Tubulin
      explanation: 'Microtubules are hollow cylindrical polymers of α-tubulin and β-tubulin heterodimers. Actin forms microfilaments, while keratin forms intermediate filaments.'
    },
    {
      id: 11,
      difficulty: 'hard',
      topic: 'Cell Cycle',
      question: 'During which specific phase of the eukaryotic cell cycle does replication of nuclear DNA and duplication of centrosomes take place?',
      options: [
        'G₁ phase',
        'S (Synthesis) phase',
        'G₂ phase',
        'Metaphase'
      ],
      correct: 1, // Index 1: S phase
      explanation: 'The S phase (Synthesis phase) of interphase is specifically dedicated to semi-conservative DNA replication and duplication of the genetic material, doubling the DNA content from 2C to 4C.'
    },
    {
      id: 12,
      difficulty: 'medium',
      topic: 'Mitosis',
      question: 'During which stage of mitosis do sister chromatids split at the centromere and migrate toward opposite poles of the spindle?',
      options: [
        'Prophase',
        'Metaphase',
        'Anaphase',
        'Telophase'
      ],
      correct: 2, // Index 2: Anaphase
      explanation: 'In mitotic Anaphase, cohesin proteins are cleaved, centromeres divide, and sister chromatids (now individual daughter chromosomes) are pulled toward opposite spindle poles by kinetochore microtubules.'
    },
    {
      id: 13,
      difficulty: 'hard',
      topic: 'Meiosis',
      question: 'Genetic crossing over (recombination between non-sister chromatids of homologous chromosomes) occurs during which sub-stage of Meiosis I?',
      options: [
        'Leptotene',
        'Pachytene of Prophase I',
        'Metaphase I',
        'Anaphase I'
      ],
      correct: 1, // Index 1: Pachytene of Prophase I
      explanation: 'Synapsis occurs in Zygotene, followed by crossing over at chiasmata during Pachytene of Prophase I, creating non-parental allele combinations and high genetic variation.'
    },
    {
      id: 14,
      difficulty: 'hard',
      topic: 'Meiosis Segregation',
      question: 'Which critical event distinguishes Anaphase I of Meiosis from Anaphase of Mitosis?',
      options: [
        'In Anaphase I, sister chromatids separate completely',
        'In Anaphase I, homologous chromosome pairs separate while sister chromatids remain attached',
        'In Anaphase I, DNA is replicated a second time',
        'In Anaphase I, the nuclear envelope immediately reforms'
      ],
      correct: 1, // Index 1: Homologous pairs separate
      explanation: 'A classic MDCAT trap: in Anaphase I, homologous pairs separate (reducing chromosome number from 2n to n). Sister chromatids separate later in Anaphase II and Mitotic Anaphase.'
    },
    {
      id: 15,
      difficulty: 'medium',
      topic: 'Intercellular Junctions',
      question: 'Direct cytoplasmic channels that allow ions, sugars, and small signaling molecules to pass freely between adjacent plant cells are called:',
      options: [
        'Tight junctions',
        'Desmosomes',
        'Gap junctions',
        'Plasmodesmata'
      ],
      correct: 3, // Index 3: Plasmodesmata
      explanation: 'Plasmodesmata are microscopic channels traversing the cell walls of plant cells, facilitating symplastic transport. Gap junctions serve an analogous role in animal cells.'
    }
  ];

  // Quiz Runtime State
  let currentQuestionIndex = 0;
  let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  let quizSubmitted = false;

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    if (!q) return;

    // Elements
    const qIndexEl = document.getElementById('quiz-q-index');
    const qTotalEl = document.getElementById('quiz-q-total');
    const qProgressFill = document.getElementById('quiz-progress-fill');
    const qDiffTag = document.getElementById('quiz-difficulty-tag');
    const qTopicTag = document.getElementById('quiz-topic-tag');
    const qTextEl = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const nextBtn = document.getElementById('quiz-btn-next');
    const prevBtn = document.getElementById('quiz-btn-prev');

    if (qIndexEl) qIndexEl.textContent = currentQuestionIndex + 1;
    if (qTotalEl) qTotalEl.textContent = QUIZ_QUESTIONS.length;
    if (qProgressFill) {
      const pct = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
      qProgressFill.style.width = `${pct}%`;
    }

    if (qDiffTag) {
      qDiffTag.className = `quiz-difficulty-tag ${q.difficulty}`;
      qDiffTag.textContent = q.difficulty.toUpperCase();
    }
    if (qTopicTag) {
      qTopicTag.textContent = q.topic;
    }

    if (qTextEl) qTextEl.textContent = q.question;

    // Render Options
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      const hasAnswered = userAnswers[currentQuestionIndex] !== null;

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-option-idx', idx);

        const letterSpan = document.createElement('span');
        letterSpan.className = 'option-letter';
        letterSpan.textContent = letters[idx];

        const textSpan = document.createElement('span');
        textSpan.className = 'option-text';
        textSpan.textContent = optText;

        btn.appendChild(letterSpan);
        btn.appendChild(textSpan);

        if (hasAnswered) {
          btn.disabled = true;
          const userChoice = userAnswers[currentQuestionIndex];
          if (idx === q.correct) {
            btn.classList.add('correct');
          } else if (idx === userChoice && userChoice !== q.correct) {
            btn.classList.add('incorrect');
          }
        } else {
          btn.addEventListener('click', () => handleSelectOption(idx));
        }

        optionsContainer.appendChild(btn);
      });
    }

    // Feedback state
    if (feedbackBox) {
      const hasAnswered = userAnswers[currentQuestionIndex] !== null;
      if (hasAnswered) {
        const userChoice = userAnswers[currentQuestionIndex];
        const isCorrect = userChoice === q.correct;
        feedbackBox.classList.add('show');
        feedbackBox.innerHTML = `
          <div class="feedback-status ${isCorrect ? 'correct-text' : 'incorrect-text'}">
            ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}
          </div>
          <div class="feedback-explanation">
            <strong>MDCAT Rationale:</strong> ${q.explanation}
          </div>
        `;
      } else {
        feedbackBox.classList.remove('show');
        feedbackBox.innerHTML = '';
      }
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.disabled = currentQuestionIndex === 0;
    }
    if (nextBtn) {
      const isLast = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
      nextBtn.textContent = isLast ? 'Finish Quiz' : 'Next Question →';
    }

    // Update Dots
    updateQuizNavDots();
  }

  function handleSelectOption(optionIndex) {
    if (userAnswers[currentQuestionIndex] !== null) return;
    userAnswers[currentQuestionIndex] = optionIndex;

    // Calculate score
    const currentScore = userAnswers.reduce((acc, ans, i) => {
      return ans === QUIZ_QUESTIONS[i].correct ? acc + 1 : acc;
    }, 0);

    const scoreBadge = document.getElementById('quiz-current-score');
    if (scoreBadge) scoreBadge.textContent = `${currentScore} / ${QUIZ_QUESTIONS.length}`;

    renderQuizQuestion();
  }

  function updateQuizNavDots() {
    const dotsContainer = document.getElementById('quiz-dots-container');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    QUIZ_QUESTIONS.forEach((q, idx) => {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.textContent = idx + 1;
      dot.setAttribute('type', 'button');
      dot.setAttribute('title', `Question ${idx + 1}`);

      if (idx === currentQuestionIndex) {
        dot.classList.add('current');
      }

      if (userAnswers[idx] !== null) {
        if (userAnswers[idx] === q.correct) {
          dot.classList.add('answered-correct');
        } else {
          dot.classList.add('answered-incorrect');
        }
      }

      dot.addEventListener('click', () => {
        currentQuestionIndex = idx;
        renderQuizQuestion();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function showQuizResults() {
    const quizCard = document.getElementById('quiz-active-card');
    const resultCard = document.getElementById('quiz-result-card');

    if (quizCard) quizCard.style.display = 'none';
    if (resultCard) resultCard.classList.add('show');

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    userAnswers.forEach((ans, idx) => {
      if (ans === null) {
        unattemptedCount++;
      } else if (ans === QUIZ_QUESTIONS[idx].correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    // Save best score
    try {
      const best = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST_SCORE) || '0', 10);
      if (correctCount > best) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_BEST_SCORE, correctCount.toString());
      }
      localStorage.setItem(STORAGE_KEYS.QUIZ_LAST_SCORE, correctCount.toString());
    } catch (e) {
      console.warn('Storage save failed:', e);
    }

    // Populate result fields
    const scoreBig = document.getElementById('res-score-big');
    const pctVal = document.getElementById('res-pct-val');
    const correctVal = document.getElementById('res-correct-val');
    const wrongVal = document.getElementById('res-wrong-val');
    const unattemptedVal = document.getElementById('res-unattempted-val');
    const badgeMsg = document.getElementById('res-badge-msg');

    if (scoreBig) scoreBig.innerHTML = `${correctCount} <span>/ ${QUIZ_QUESTIONS.length}</span>`;
    if (pctVal) pctVal.textContent = `${percentage}%`;
    if (correctVal) correctVal.textContent = correctCount;
    if (wrongVal) wrongVal.textContent = incorrectCount;
    if (unattemptedVal) unattemptedVal.textContent = unattemptedCount;

    if (badgeMsg) {
      if (percentage >= 85) {
        badgeMsg.textContent = '🌟 Medical Excellence! High MDCAT Cell Biology Mastery.';
      } else if (percentage >= 70) {
        badgeMsg.textContent = '👍 Strong Foundation! Review the high-yield traps to reach 90%+.';
      } else {
        badgeMsg.textContent = '📚 Revision Recommended. Study the quick revision notes and retry.';
      }
    }
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    quizSubmitted = false;

    const quizCard = document.getElementById('quiz-active-card');
    const resultCard = document.getElementById('quiz-result-card');

    if (resultCard) resultCard.classList.remove('show');
    if (quizCard) quizCard.style.display = 'block';

    const scoreBadge = document.getElementById('quiz-current-score');
    if (scoreBadge) scoreBadge.textContent = `0 / ${QUIZ_QUESTIONS.length}`;

    renderQuizQuestion();
  }

  // ==========================================================================
  // 3. FLASHCARDS (ACTIVE RECALL) ENGINE
  // ==========================================================================

  function initFlashcards() {
    document.querySelectorAll('.flashcard-item').forEach(card => {
      const btn = card.querySelector('.btn-reveal-answer');
      const answerBox = card.querySelector('.flashcard-answer-box');
      if (btn && answerBox) {
        btn.addEventListener('click', () => {
          const isShown = answerBox.classList.contains('revealed');
          if (isShown) {
            answerBox.classList.remove('revealed');
            btn.textContent = 'Reveal Answer';
          } else {
            answerBox.classList.add('revealed');
            btn.textContent = 'Hide Answer';
          }
        });
      }
    });

    const revealAllBtn = document.getElementById('btn-reveal-all-cards');
    if (revealAllBtn) {
      revealAllBtn.addEventListener('click', () => {
        const anyHidden = Array.from(document.querySelectorAll('.flashcard-answer-box')).some(box => !box.classList.contains('revealed'));
        document.querySelectorAll('.flashcard-item').forEach(card => {
          const btn = card.querySelector('.btn-reveal-answer');
          const answerBox = card.querySelector('.flashcard-answer-box');
          if (anyHidden) {
            answerBox.classList.add('revealed');
            if (btn) btn.textContent = 'Hide Answer';
          } else {
            answerBox.classList.remove('revealed');
            if (btn) btn.textContent = 'Reveal Answer';
          }
        });
        revealAllBtn.textContent = anyHidden ? 'Hide All Answers' : 'Reveal All Answers';
      });
    }
  }

  // ==========================================================================
  // 4. FACTS FILTER ENGINE
  // ==========================================================================

  function initFactsFilter() {
    const filterBtns = document.querySelectorAll('.facts-filter-bar .filter-btn');
    const factCards = document.querySelectorAll('.facts-grid .fact-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        factCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 5. GLOBAL SCROLL PROGRESS & SCROLLSPY
  // ==========================================================================

  function initScrollTracking() {
    const progressBar = document.getElementById('global-progress-bar');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      if (progressBar) progressBar.style.width = `${scrolled}%`;

      if (header) {
        if (winScroll > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // ScrollSpy for Sidebar TOC Links
    const sections = document.querySelectorAll('.section-card[id]');
    const tocLinks = document.querySelectorAll('.toc-link');

    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      });

      sections.forEach(sec => observer.observe(sec));
    }
  }

  // ==========================================================================
  // 6. INITIALIZATION & EVENT BINDINGS
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Progress
    updateProgressUI();

    // Section complete buttons
    document.querySelectorAll('.section-complete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.section-card');
        if (card) {
          const secId = card.getAttribute('data-section-id');
          toggleSectionComplete(secId);
        }
      });
    });

    // Reset progress button
    const resetBtn = document.getElementById('btn-reset-chapter-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all tracked progress for this chapter?')) {
          saveCompletedSections([]);
          updateProgressUI();
        }
      });
    }

    // Mark all as complete
    const markAllBtn = document.getElementById('btn-mark-all-mastered');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        const allIds = Array.from(document.querySelectorAll('.section-card')).map(c => c.getAttribute('data-section-id'));
        saveCompletedSections(allIds);
        updateProgressUI();
        alert('🎉 Congratulations! All 23 Cell Biology sections marked as Mastered!');
      });
    }

    // 2. Initialize Quiz
    renderQuizQuestion();

    const nextBtn = document.getElementById('quiz-btn-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuestionIndex++;
          renderQuizQuestion();
        } else {
          showQuizResults();
        }
      });
    }

    const prevBtn = document.getElementById('quiz-btn-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderQuizQuestion();
        }
      });
    }

    const retakeBtn = document.getElementById('btn-retake-quiz');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', resetQuiz);
    }

    // 3. Initialize Flashcards
    initFlashcards();

    // 4. Initialize Facts Filter
    initFactsFilter();

    // 5. Initialize Scroll Tracking & Spy
    initScrollTracking();
  });

})();
