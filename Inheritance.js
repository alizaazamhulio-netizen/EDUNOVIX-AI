/**
 * EduNexa AI - Inheritance Biology Chapter Script
 * Vanilla JavaScript implementation for interactivity, practice quiz, and revision features.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Reading Progress Bar & Header Scroll Effect ---
  const progressBar = document.getElementById('readingProgressBar');
  const mainHeader = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    if (mainHeader) {
      if (scrollTop > 20) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // --- Smooth Scrolling for Action Buttons ---
  const btnStartLearning = document.getElementById('btnStartLearning');
  const btnTakeQuiz = document.getElementById('btnTakeQuiz');

  if (btnStartLearning) {
    btnStartLearning.addEventListener('click', (e) => {
      e.preventDefault();
      const introSection = document.getElementById('intro');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (btnTakeQuiz) {
    btnTakeQuiz.addEventListener('click', (e) => {
      e.preventDefault();
      const quizSection = document.getElementById('quiz');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- Interactive Revision Accordion ---
  const revisionTriggers = document.querySelectorAll('.revision-trigger');
  
  revisionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.revision-item');
      const content = item.querySelector('.revision-content');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Toggle current item
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('open');
        content.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- MDCAT Biology Practice Quiz Data (10 Authentic MCQs) ---
  const quizData = [
    {
      id: 1,
      tag: "Mendel's Methodology",
      question: "Gregor Mendel conducted his hybridization experiments on garden pea (Pisum sativum). Which of the following is NOT one of the reasons for selecting pea plants?",
      options: [
        "A) Presence of distinct, well-defined contrasting traits",
        "B) Long generation time allowing prolonged observation over decades",
        "C) Naturally self-pollinating flowers that can be easily cross-pollinated",
        "D) Production of a large number of offspring seeds in a single cross"
      ],
      correctIndex: 1,
      explanation: "Pea plants (Pisum sativum) possess a SHORT life cycle (annual plant) that allowed Mendel to analyze several generations in a few years, NOT a long generation time."
    },
    {
      id: 2,
      tag: "Monohybrid Cross",
      question: "In a classical Mendelian monohybrid cross between homozygous tall (TT) and dwarf (tt) plants, the phenotypic and genotypic ratios in the F₂ generation are respectively:",
      options: [
        "A) 1:2:1 and 3:1",
        "B) 3:1 and 1:2:1",
        "C) 9:3:3:1 and 1:1:1:1",
        "D) 1:1 and 1:2:1"
      ],
      correctIndex: 1,
      explanation: "In F₂ of a monohybrid cross (Tt ✕ Tt), the phenotypic ratio is 3 Tall : 1 Dwarf (3:1), whereas the genotypic ratio is 1 TT : 2 Tt : 1 tt (1:2:1)."
    },
    {
      id: 3,
      tag: "Law of Segregation",
      question: "Mendel's Law of Segregation (Purity of Gametes) is biologically based on the separation of homologous chromosome pairs during which cell division stage?",
      options: [
        "A) Anaphase of Mitosis",
        "B) Metaphase II of Meiosis",
        "C) Anaphase I of Meiosis",
        "D) Telophase II of Meiosis"
      ],
      correctIndex: 2,
      explanation: "Alleles segregate during Anaphase I of Meiosis when homologous chromosomes separate and move toward opposite poles. Hence, gametes receive only one allele of each gene."
    },
    {
      id: 4,
      tag: "Diagnostic Cross",
      question: "A pea plant with round seeds (dominant phenotype) is test crossed to determine its genotype. The resulting offspring exhibit a 1:1 phenotypic ratio (50% round : 50% wrinkled). What was the genotype of the parent?",
      options: [
        "A) Homozygous dominant (RR)",
        "B) Heterozygous (Rr)",
        "C) Homozygous recessive (rr)",
        "D) Incomplete dominant (R_)"
      ],
      correctIndex: 1,
      explanation: "In a test cross (Parent ✕ rr): A homozygous parent (RR ✕ rr) yields 100% round progeny, whereas a heterozygous parent (Rr ✕ rr) yields 50% round (Rr) and 50% wrinkled (rr) in a 1:1 ratio."
    },
    {
      id: 5,
      tag: "Gene Linkage",
      question: "Which of the following Mendelian principles is directly violated by closely linked genes located on the same chromosome?",
      options: [
        "A) Law of Dominance",
        "B) Law of Segregation",
        "C) Law of Independent Assortment",
        "D) Law of Unit Factors"
      ],
      correctIndex: 2,
      explanation: "Gene Linkage is the universal exception to Mendel's Law of Independent Assortment because linked genes reside on the same chromosome and tend to be inherited together as a unit."
    },
    {
      id: 6,
      tag: "Meiotic Recombination",
      question: "Crossing over between non-sister chromatids of homologous chromosomes occurs during which specific stage of Prophase I?",
      options: [
        "A) Leptotene",
        "B) Zygotene",
        "C) Pachytene",
        "D) Diplotene"
      ],
      correctIndex: 2,
      explanation: "Crossing over (recombination) takes place during the Pachytene stage of Prophase I. In contrast, chiasmata become microscopically visible during the subsequent Diplotene stage."
    },
    {
      id: 7,
      tag: "Sex Linkage",
      question: "Why are X-linked recessive disorders such as Hemophilia and Red-Green Color Blindness far more commonly expressed in human males than in females?",
      options: [
        "A) Males produce male hormones that activate the recessive allele",
        "B) Males are hemizygous (XY) with only one X chromosome, so a single recessive allele is directly expressed",
        "C) The Y chromosome carries a dominant inhibitor against normal clotting factors",
        "D) Females have an extra Y chromosome that provides protective immunity"
      ],
      correctIndex: 1,
      explanation: "Human males are hemizygous (XY) and possess only one X chromosome. If they inherit a single mutant recessive allele (XʰY), there is no second X chromosome to mask it, leading to 100% phenotypic expression."
    },
    {
      id: 8,
      tag: "Hemophilia Inheritance",
      question: "A hemophilic man (XʰY) marries a normal homozygous woman (XᴴXᴴ). What is the probability of their sons and daughters having hemophilia?",
      options: [
        "A) 100% of sons will be hemophilic; 0% of daughters",
        "B) 50% of sons and 50% of daughters will be hemophilic",
        "C) 0% of sons will have hemophilia; 100% of daughters will be carriers (XᴴXʰ)",
        "D) 100% of both sons and daughters will have hemophilia"
      ],
      correctIndex: 2,
      explanation: "The father contributes his Y chromosome to all sons (who receive a normal Xᴴ from the mother), making 100% of sons healthy (XᴴY, 0% hemophilia). The father passes his Xʰ to all daughters, making 100% of daughters carriers (XᴴXʰ)."
    },
    {
      id: 9,
      tag: "Gene Mapping",
      question: "If two linked genes show a recombination frequency of 1%, what does this represent on a genetic linkage map?",
      options: [
        "A) The genes are located on two different non-homologous chromosomes",
        "B) The genes are separated by a map distance of 1 centimorgan (1 cM)",
        "C) 99% of gametes will undergo crossing over",
        "D) The genes assort completely independently"
      ],
      correctIndex: 1,
      explanation: "By definition, 1% recombination frequency is equal to 1 map unit or 1 centimorgan (cM) of distance between two linked genes on a chromosome."
    },
    {
      id: 10,
      tag: "Dihybrid Cross",
      question: "In a dihybrid heterozygous cross (RrYy ✕ RrYy), how many distinct phenotypes and genotypes are generated in the F₂ generation?",
      options: [
        "A) 4 phenotypes and 9 genotypes",
        "B) 9 phenotypes and 4 genotypes",
        "C) 16 phenotypes and 16 genotypes",
        "D) 3 phenotypes and 6 genotypes"
      ],
      correctIndex: 0,
      explanation: "A dihybrid cross produces 4 distinct phenotypic classes in a 9:3:3:1 ratio (2² = 4) and 9 distinct genotypic classes (3² = 9) distributed across 16 total zygotic combinations (4² = 16)."
    }
  ];

  // --- Quiz State & Elements ---
  let userAnswers = {}; // { questionId: selectedIndex }
  let quizScore = 0;

  const quizListContainer = document.getElementById('quizQuestionsList');
  const quizProgressText = document.getElementById('quizProgressText');
  const quizScoreBadge = document.getElementById('quizScoreBadge');
  const quizResultCard = document.getElementById('quizResultCard');
  const btnResetTop = document.getElementById('btnResetQuizTop');
  const btnRetake = document.getElementById('btnRetakeQuiz');

  // Render Quiz Questions
  function renderQuiz() {
    if (!quizListContainer) return;
    quizListContainer.innerHTML = '';
    userAnswers = {};
    quizScore = 0;
    updateQuizHeader();

    if (quizResultCard) {
      quizResultCard.style.display = 'none';
    }

    quizData.forEach((q, index) => {
      const qCard = document.createElement('div');
      qCard.className = 'mcq-card';
      qCard.id = `mcqCard_${q.id}`;

      qCard.innerHTML = `
        <div class="mcq-header">
          <span class="mcq-number">Question ${index + 1} of ${quizData.length}</span>
          <span class="mcq-tag">${q.tag}</span>
        </div>
        <h3 class="mcq-question-text">${q.question}</h3>
        <div class="mcq-options-grid" id="optionsGrid_${q.id}">
          ${q.options.map((opt, optIdx) => `
            <button type="button" class="mcq-option-btn" data-qid="${q.id}" data-idx="${optIdx}" id="optBtn_${q.id}_${optIdx}">
              <span class="option-prefix">${String.fromCharCode(65 + optIdx)}</span>
              <span class="option-text">${opt.substring(3)}</span>
            </button>
          `).join('')}
        </div>
        <div class="mcq-explanation-box" id="explBox_${q.id}"></div>
      `;

      quizListContainer.appendChild(qCard);
    });

    // Attach Event Listeners to option buttons
    document.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', handleOptionSelect);
    });
  }

  // Handle Option Click
  function handleOptionSelect(e) {
    const btn = e.currentTarget;
    const qid = parseInt(btn.getAttribute('data-qid'), 10);
    const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);

    // If already answered, do nothing
    if (userAnswers.hasOwnProperty(qid)) return;

    const question = quizData.find(item => item.id === qid);
    if (!question) return;

    userAnswers[qid] = selectedIdx;
    const isCorrect = selectedIdx === question.correctIndex;
    if (isCorrect) {
      quizScore++;
    }

    const qCard = document.getElementById(`mcqCard_${qid}`);
    const explBox = document.getElementById(`explBox_${qid}`);
    const optionsGrid = document.getElementById(`optionsGrid_${qid}`);
    const allBtns = optionsGrid.querySelectorAll('.mcq-option-btn');

    // Disable all options for this question
    allBtns.forEach(b => {
      b.disabled = true;
      b.style.cursor = 'default';
    });

    if (isCorrect) {
      btn.classList.add('selected-correct');
      if (qCard) qCard.classList.add('answered-correct');
      if (explBox) {
        explBox.className = 'mcq-explanation-box show correct';
        explBox.innerHTML = `
          <span class="expl-badge">✓ Correct! Excellent work.</span>
          ${question.explanation}
        `;
      }
    } else {
      btn.classList.add('selected-wrong');
      if (qCard) qCard.classList.add('answered-wrong');
      
      // Reveal the correct option
      const correctBtn = document.getElementById(`optBtn_${qid}_${question.correctIndex}`);
      if (correctBtn) {
        correctBtn.classList.add('revealed-correct');
      }

      if (explBox) {
        explBox.className = 'mcq-explanation-box show wrong';
        explBox.innerHTML = `
          <span class="expl-badge">✕ Incorrect. Correct Answer: ${String.fromCharCode(65 + question.correctIndex)}</span>
          ${question.explanation}
        `;
      }
    }

    updateQuizHeader();

    // Check if all questions are completed
    if (Object.keys(userAnswers).length === quizData.length) {
      showFinalResults();
    }
  }

  // Update Quiz Top Status
  function updateQuizHeader() {
    const answeredCount = Object.keys(userAnswers).length;
    if (quizProgressText) {
      quizProgressText.textContent = `Attempted: ${answeredCount} / ${quizData.length}`;
    }
    if (quizScoreBadge) {
      quizScoreBadge.textContent = `Score: ${quizScore} / ${answeredCount}`;
    }
  }

  // Display Final Result Card
  function showFinalResults() {
    if (!quizResultCard) return;

    const percentage = Math.round((quizScore / quizData.length) * 100);
    const resultScore = document.getElementById('resultScore');
    const resultPercentage = document.getElementById('resultPercentage');
    const resultRank = document.getElementById('resultRank');
    const resultTitle = document.getElementById('resultTitle');
    const resultFeedback = document.getElementById('resultFeedback');
    const celebrationEmoji = document.getElementById('resultCelebrationEmoji');

    if (resultScore) resultScore.textContent = `${quizScore} / ${quizData.length}`;
    if (resultPercentage) resultPercentage.textContent = `${percentage}%`;

    let rank = 'Needs Review';
    let title = 'Good Effort!';
    let emoji = '📚';
    let feedback = 'Review the High-Yield Points and Genetics rules to strengthen your concepts.';

    if (percentage >= 90) {
      rank = 'MDCAT Topper 🌟';
      title = 'Phenomenal Score!';
      emoji = '🏆';
      feedback = 'Outstanding mastery of Mendelian genetics, linkage, crossing over, and sex-linked traits!';
    } else if (percentage >= 70) {
      rank = 'High Proficiency 🎯';
      title = 'Great Job!';
      emoji = '🎉';
      feedback = 'You have a solid command of core inheritance principles with a few edge-cases to polish.';
    } else if (percentage >= 50) {
      rank = 'Satisfactory 📈';
      title = 'Getting There!';
      emoji = '💡';
      feedback = 'Revise Mendel’s laws, test cross ratios, and hemophilia inheritance patterns.';
    }

    if (resultRank) resultRank.textContent = rank;
    if (resultTitle) resultTitle.textContent = title;
    if (resultFeedback) resultFeedback.textContent = feedback;
    if (celebrationEmoji) celebrationEmoji.textContent = emoji;

    quizResultCard.style.display = 'block';
    quizResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Reset Quiz
  if (btnResetTop) {
    btnResetTop.addEventListener('click', renderQuiz);
  }

  if (btnRetake) {
    btnRetake.addEventListener('click', () => {
      renderQuiz();
      const quizContainer = document.getElementById('quiz');
      if (quizContainer) {
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Mark Chapter Complete & Modal ---
  const btnMarkComplete = document.getElementById('btnMarkComplete');
  const completionModal = document.getElementById('completionModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const headerStatusPill = document.getElementById('headerStatusPill');
  const modalQuizScore = document.getElementById('modalQuizScore');

  if (btnMarkComplete) {
    btnMarkComplete.addEventListener('click', () => {
      if (headerStatusPill) {
        headerStatusPill.classList.add('completed');
        const textSpan = headerStatusPill.querySelector('.status-text');
        if (textSpan) textSpan.textContent = 'Completed ✓';
      }

      if (modalQuizScore) {
        modalQuizScore.textContent = `${quizScore} / ${quizData.length}`;
      }

      if (completionModal) {
        completionModal.style.display = 'flex';
      }
    });
  }

  if (btnCloseModal && completionModal) {
    btnCloseModal.addEventListener('click', () => {
      completionModal.style.display = 'none';
    });

    completionModal.addEventListener('click', (e) => {
      if (e.target === completionModal) {
        completionModal.style.display = 'none';
      }
    });
  }

  // Initial Quiz Render
  renderQuiz();
});
