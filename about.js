/**
 * EduNexa AI - About Page Complete Interaction Script
 * Handles FAQ accordion, live search filter, subject switcher, interactive MCQ engine,
 * notes preview generator, study timetable calculator, modal tour, and scroll events.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Data Store for Interactive Sandbox (Subjects, Quizzes, Notes, Plans)
  // --------------------------------------------------------------------------
  const studyData = {
    biology: {
      name: 'AP Biology',
      tag: 'Cellular Signaling & Genetics',
      questions: [
        {
          q: 'During G-protein coupled receptor (GPCR) activation, which nucleotide replaces GDP on the G-alpha subunit?',
          options: [
            { text: 'ATP (Adenosine triphosphate)', correct: false },
            { text: 'GTP (Guanosine triphosphate)', correct: true },
            { text: 'cAMP (Cyclic adenosine monophosphate)', correct: false },
            { text: 'IP3 (Inositol trisphosphate)', correct: false }
          ],
          explanation: 'When a ligand binds to a GPCR, it induces a conformational shift in the receptor that catalyzes the exchange of bound GDP for GTP on the Gα subunit, causing it to dissociate from Gβγ and activate downstream effectors like adenylyl cyclase.'
        },
        {
          q: 'Which enzyme is primarily responsible for relieving supercoiling strain ahead of the DNA replication fork?',
          options: [
            { text: 'DNA Helicase', correct: false },
            { text: 'DNA Ligase', correct: false },
            { text: 'Topoisomerase (DNA Gyrase)', correct: true },
            { text: 'Primase', correct: false }
          ],
          explanation: 'Topoisomerase cuts one or both DNA strands ahead of the replication fork to relieve torsional strain (supercoiling) created by helicase unwinding, then reseals the backbone.'
        },
        {
          q: 'In the light-dependent reactions of photosynthesis, what is the initial electron donor for Photosystem II (P680)?',
          options: [
            { text: 'Water (H₂O)', correct: true },
            { text: 'Carbon Dioxide (CO₂)', correct: false },
            { text: 'NADPH', correct: false },
            { text: 'Plastoquinone', correct: false }
          ],
          explanation: 'Photosystem II splits water molecules (photolysis) via the Oxygen-Evolving Complex: 2H₂O → O₂ + 4H⁺ + 4e⁻. These electrons replace those excited and transferred from P680.'
        }
      ],
      notes: `
        <h4 class="font-bold text-dark mb-2">🧬 Cellular Respiration & Bioenergetics Quick Kit</h4>
        <p class="mb-3 text-muted text-sm">Synthesized from Campbell Biology 12th Ed • High-Yield AP Review</p>
        <div class="mb-3 p-3 bg-alt rounded border">
          <strong>Core Equation:</strong> <code>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~30-32 ATP</code>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-sm text-dark">
          <li><strong>Glycolysis:</strong> Cytoplasm • Anaerobic • Glucose (6C) → 2 Pyruvate (3C) + 2 Net ATP (SLP) + 2 NADH.</li>
          <li><strong>Pyruvate Oxidation:</strong> Matrix • 2 Pyruvate → 2 Acetyl-CoA + 2 CO₂ + 2 NADH.</li>
          <li><strong>Citric Acid (Krebs) Cycle:</strong> Matrix • 2 turns/glucose • 6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂.</li>
          <li><strong>Oxidative Phosphorylation:</strong> Inner Mitochondrial Membrane • Chemiosmosis via proton gradient (ATP Synthase).</li>
        </ul>
      `
    },
    physics: {
      name: 'Physics (Mechanics)',
      tag: 'Newtonian Dynamics & Energy',
      questions: [
        {
          q: 'A satellite orbits Earth in a circular path at constant speed. What is the net work done by gravity on the satellite over one full orbit?',
          options: [
            { text: 'Zero Joules', correct: true },
            { text: 'Equal to Gravitational Potential Energy', correct: false },
            { text: 'Positive and proportional to orbital radius', correct: false },
            { text: 'Dependent on satellite mass only', correct: false }
          ],
          explanation: 'Since the gravitational force is always directed perpendicular to the displacement velocity in a circular orbit (cos 90° = 0), the work done W = ∫ F · dr = 0 Joules.'
        },
        {
          q: 'If the linear momentum of an object is doubled while its mass remains constant, by what factor does its kinetic energy increase?',
          options: [
            { text: '2x', correct: false },
            { text: '4x', correct: true },
            { text: '8x', correct: false },
            { text: 'Square root of 2', correct: false }
          ],
          explanation: 'Kinetic energy in terms of momentum is given by K = p² / (2m). Doubling p results in (2p)² / 2m = 4 · (p² / 2m), a 4-fold increase.'
        },
        {
          q: 'In Simple Harmonic Motion (SHM), at what position is the magnitude of acceleration at its maximum?',
          options: [
            { text: 'At the equilibrium position (x = 0)', correct: false },
            { text: 'At maximum displacement (x = ±A)', correct: true },
            { text: 'At half amplitude (x = A/2)', correct: false },
            { text: 'Acceleration is constant throughout', correct: false }
          ],
          explanation: 'By Hooke’s law, a = -ω²x. Acceleration magnitude is directly proportional to displacement and reaches its maximum when x = ± Amplitude (A).'
        }
      ],
      notes: `
        <h4 class="font-bold text-dark mb-2">⚡ Classical Mechanics Key Formulas & Principles</h4>
        <p class="mb-3 text-muted text-sm">Synthesized from Halliday & Resnick • AP Physics C Cheat Sheet</p>
        <div class="mb-3 p-3 bg-alt rounded border">
          <strong>Conservation of Energy:</strong> <code>E_total = K + U = ½mv² + mgh + ½kx² = constant</code>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-sm text-dark">
          <li><strong>Newton's 2nd Law:</strong> ΣF = dp/dt = m·a (for constant mass).</li>
          <li><strong>Work-Energy Theorem:</strong> W_net = ΔK = K_final - K_initial.</li>
          <li><strong>Rotational Dynamics:</strong> Torque τ = I·α = r × F; Angular Momentum L = I·ω.</li>
          <li><strong>Center of Mass:</strong> x_cm = (Σ m_i x_i) / (Σ m_i).</li>
        </ul>
      `
    },
    calculus: {
      name: 'Calculus & Limits',
      tag: 'Derivatives & Integration Techniques',
      questions: [
        {
          q: 'What is the limit as x approaches 0 of (sin(3x)) / x ?',
          options: [
            { text: '0', correct: false },
            { text: '1', correct: false },
            { text: '3', correct: true },
            { text: 'Undefined / Does not exist', correct: false }
          ],
          explanation: 'Using the fundamental limit lim (sin(u)/u) = 1 as u→0, we rewrite (sin(3x))/x as 3 · [sin(3x)/(3x)]. As x→0, 3x→0, so 3 · (1) = 3. (Also verifiable via L’Hôpital’s Rule: cos(3x)·3 / 1 = 3).'
        },
        {
          q: 'What is the derivative of f(x) = ln(sec(x) + tan(x)) with respect to x?',
          options: [
            { text: 'sec(x)', correct: true },
            { text: 'tan(x)', correct: false },
            { text: 'sec²(x)', correct: false },
            { text: 'sec(x) tan(x)', correct: false }
          ],
          explanation: 'By the chain rule: f’(x) = (sec(x)tan(x) + sec²(x)) / (sec(x) + tan(x)) = sec(x)(tan(x) + sec(x)) / (sec(x) + tan(x)) = sec(x).'
        },
        {
          q: 'Which integration technique is best suited for evaluating ∫ x · e^(2x) dx ?',
          options: [
            { text: 'Integration by Parts (u = x, dv = e^(2x) dx)', correct: true },
            { text: 'Partial Fraction Decomposition', correct: false },
            { text: 'Trigonometric Substitution', correct: false },
            { text: 'Basic Power Rule', correct: false }
          ],
          explanation: 'Integration by parts ∫ u dv = uv - ∫ v du works perfectly with polynomial × exponential. Setting u = x (du = dx) and dv = e^(2x) dx (v = ½ e^(2x)) yields ½ x e^(2x) - ¼ e^(2x) + C.'
        }
      ],
      notes: `
        <h4 class="font-bold text-dark mb-2">📐 Calculus AB/BC Essential Derivatives & Integrals</h4>
        <p class="mb-3 text-muted text-sm">High-Yield Formula & Rule Reference</p>
        <div class="mb-3 p-3 bg-alt rounded border">
          <strong>Fundamental Theorem:</strong> <code>d/dx ∫[a to x] f(t) dt = f(x)</code> and <code>∫[a to b] f'(x) dx = f(b) - f(a)</code>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-sm text-dark">
          <li><strong>Product Rule:</strong> (uv)' = u'v + uv'</li>
          <li><strong>Quotient Rule:</strong> (u/v)' = (u'v - uv') / v²</li>
          <li><strong>Chain Rule:</strong> [f(g(x))]' = f'(g(x)) · g'(x)</li>
          <li><strong>Integration by Parts:</strong> ∫ u dv = uv - ∫ v du (L-I-A-T-E order)</li>
        </ul>
      `
    },
    cs: {
      name: 'Computer Science',
      tag: 'Data Structures & Algorithms',
      questions: [
        {
          q: 'What is the average time complexity of searching for an element in a balanced Binary Search Tree (AVL / Red-Black Tree)?',
          options: [
            { text: 'O(1)', correct: false },
            { text: 'O(log N)', correct: true },
            { text: 'O(N)', correct: false },
            { text: 'O(N log N)', correct: false }
          ],
          explanation: 'In a balanced BST, tree height is strictly bounded by O(log N). Since each comparison halves the remaining search space, lookup time is O(log N).'
        },
        {
          q: 'Which graph traversal algorithm uses a FIFO Queue to find the shortest path in an unweighted graph?',
          options: [
            { text: 'Breadth-First Search (BFS)', correct: true },
            { text: 'Depth-First Search (DFS)', correct: false },
            { text: 'Dijkstra’s Algorithm', correct: false },
            { text: 'Kruskal’s Algorithm', correct: false }
          ],
          explanation: 'BFS explores neighbor nodes level by level using a FIFO queue, ensuring that the first time a node is reached corresponds to the minimum number of edge hops.'
        },
        {
          q: 'In Object-Oriented Programming, what principle states that derived classes must be substitutable for their base classes without altering program correctness?',
          options: [
            { text: 'Single Responsibility Principle', correct: false },
            { text: 'Liskov Substitution Principle (LSP)', correct: true },
            { text: 'Open/Closed Principle', correct: false },
            { text: 'Dependency Inversion Principle', correct: false }
          ],
          explanation: 'The Liskov Substitution Principle (the "L" in SOLID) asserts that subclasses should extend base types without altering their expected behavior or throwing unexpected exceptions.'
        }
      ],
      notes: `
        <h4 class="font-bold text-dark mb-2">💻 CS & Algorithms Master Sheet</h4>
        <p class="mb-3 text-muted text-sm">Data Structures & Big-O Reference</p>
        <div class="mb-3 p-3 bg-alt rounded border">
          <strong>Big-O Hierarchy:</strong> <code>O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ᴺ)</code>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-sm text-dark">
          <li><strong>Hash Map:</strong> O(1) avg insert/lookup/delete via hash bucket hashing.</li>
          <li><strong>Merge Sort / Heap Sort:</strong> O(N log N) guaranteed worst-case sorting.</li>
          <li><strong>Quick Sort:</strong> O(N log N) average, O(N²) worst-case on poor pivot choice.</li>
          <li><strong>Dynamic Programming:</strong> Solves overlapping subproblems + optimal substructure via memoization/tabulation.</li>
        </ul>
      `
    },
    history: {
      name: 'World History',
      tag: 'Modern Civilizations & Revolutions',
      questions: [
        {
          q: 'What 1648 treaty ended the Thirty Years’ War and established the foundational concept of modern state sovereignty in international law?',
          options: [
            { text: 'Treaty of Versailles', correct: false },
            { text: 'Peace of Westphalia', correct: true },
            { text: 'Treaty of Utrecht', correct: false },
            { text: 'Congress of Vienna', correct: false }
          ],
          explanation: 'The Peace of Westphalia (1648) ended European religious wars and recognized sovereign state control over territorial religion and domestic policies (Westphalian Sovereignty).'
        },
        {
          q: 'Which economic development served as a primary catalyst for Britain becoming the birthplace of the First Industrial Revolution?',
          options: [
            { text: 'Agricultural Revolution & Enclosure Acts combined with abundant domestic coal and iron reserves', correct: true },
            { text: 'Sole reliance on silk manufacturing from Eastern Mediterranean trade', correct: false },
            { text: 'The immediate abolition of all international tariffs in 1720', correct: false },
            { text: 'Discovery of deep oil reservoirs in the Scottish Highlands', correct: false }
          ],
          explanation: 'Higher agricultural yields freed labor for factories, while accessible coal/iron deposits, capital accumulation, and strong patent protections drove British mechanization (steam engine, spinning jenny).'
        },
        {
          q: 'The Silk Road primarily facilitated the exchange of which cultural and religious tradition from India to China and East Asia?',
          options: [
            { text: 'Buddhism', correct: true },
            { text: 'Zoroastrianism', correct: false },
            { text: 'Orthodox Christianity', correct: false },
            { text: 'Islam', correct: false }
          ],
          explanation: 'Mahayana Buddhism traveled along Central Asian Silk Road caravan networks from northern India into Han Dynasty China during the 1st and 2nd centuries CE.'
        }
      ],
      notes: `
        <h4 class="font-bold text-dark mb-2">🏛️ World History High-Yield Synthesized Themes</h4>
        <p class="mb-3 text-muted text-sm">AP World History • Key Turning Points & Analysis</p>
        <div class="mb-3 p-3 bg-alt rounded border">
          <strong>Key Era:</strong> <code>1750–1900: Industrialization, Enlightenment, Imperialism & Global Trade</code>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-sm text-dark">
          <li><strong>The Enlightenment:</strong> Locke (Natural Rights), Montesquieu (Separation of Powers), Rousseau (Social Contract).</li>
          <li><strong>Atlantic Revolutions:</strong> American (1776), French (1789), Haitian (1791), Latin American (1810s–1820s).</li>
          <li><strong>Steam & Industrial Tech:</strong> James Watt Steam Engine, Mechanized Cotton Mills, Telegraph, Transcontinental Rail.</li>
        </ul>
      `
    }
  };

  // State
  let currentSubjectKey = 'biology';
  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnsweredCount = 0;

  // --------------------------------------------------------------------------
  // 2. Announcement Bar Dismissal
  // --------------------------------------------------------------------------
  const announcementBar = document.getElementById('announcement-bar');
  const closeAnnouncementBtn = document.getElementById('close-announcement');
  if (closeAnnouncementBtn && announcementBar) {
    closeAnnouncementBtn.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  // --------------------------------------------------------------------------
  // 3. Navbar Sticky Effect & Mobile Drawer
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileClose = document.getElementById('mobile-nav-close');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (siteHeader) {
      if (scrollPos > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpened = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpened ? 'false' : 'true');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  }

  // Close mobile drawer when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Hero Section Preview Tabs Switcher & Hero Mini MCQ
  // --------------------------------------------------------------------------
  const heroTabs = document.querySelectorAll('.preview-tab');
  const heroTabContents = {
    explanation: document.getElementById('tab-content-explanation'),
    notes: document.getElementById('tab-content-notes'),
    mcq: document.getElementById('tab-content-mcq')
  };

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      Object.keys(heroTabContents).forEach(key => {
        if (heroTabContents[key]) {
          if (key === target) {
            heroTabContents[key].classList.add('active');
          } else {
            heroTabContents[key].classList.remove('active');
          }
        }
      });
    });
  });

  // Hero Mini MCQ Options click
  const heroMiniMcq = document.getElementById('hero-mini-mcq');
  const heroMcqFeedback = document.getElementById('hero-mcq-feedback');
  if (heroMiniMcq && heroMcqFeedback) {
    const optButtons = heroMiniMcq.querySelectorAll('.mcq-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        optButtons.forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') {
            b.classList.add('correct');
          }
        });

        if (!isCorrect) {
          btn.classList.add('incorrect');
          heroMcqFeedback.innerHTML = '❌ <strong>Incorrect:</strong> Oxygen (O₂) is the final electron acceptor in aerobic respiration, forming water (H₂O).';
          heroMcqFeedback.style.backgroundColor = '#fff1f2';
          heroMcqFeedback.style.color = '#9f1239';
          heroMcqFeedback.style.border = '1px solid #fecdd3';
        } else {
          heroMcqFeedback.innerHTML = '✅ <strong>Correct!</strong> Oxygen accepts electrons at Complex IV of the ETC and binds with protons to form H₂O.';
          heroMcqFeedback.style.backgroundColor = '#ecfdf5';
          heroMcqFeedback.style.color = '#065f46';
          heroMcqFeedback.style.border = '1px solid #a7f3d0';
        }
        heroMcqFeedback.classList.add('show');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Live Test-Drive Sandbox (Subjects, Quizzes, Notes, Planner)
  // --------------------------------------------------------------------------
  const subjectPills = document.querySelectorAll('.subject-pill');
  const demoModeBtns = document.querySelectorAll('.demo-mode-btn');
  const demoViews = {
    quiz: document.getElementById('demo-view-quiz'),
    notes: document.getElementById('demo-view-notes'),
    planner: document.getElementById('demo-view-planner')
  };

  // Helper text mapping
  const helperTexts = {
    quiz: 'EduNexa generates questions tailored to diagnostic mastery. Selecting an answer immediately reveals the underlying scientific logic.',
    notes: 'Synthesizes 50+ page textbook chapters into crisp, readable summaries, formulas, and high-yield bullet takeaways.',
    planner: 'Calculates an automated spaced repetition schedule based on your target exam date and daily available study hours.'
  };
  const demoHelperText = document.getElementById('demo-helper-text');

  // Switch demo modes (Quiz / Notes / Planner)
  demoModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      Object.keys(demoViews).forEach(key => {
        if (demoViews[key]) {
          if (key === mode) {
            demoViews[key].style.display = 'flex';
            demoViews[key].classList.add('active');
          } else {
            demoViews[key].style.display = 'none';
            demoViews[key].classList.remove('active');
          }
        }
      });

      if (demoHelperText && helperTexts[mode]) {
        demoHelperText.textContent = helperTexts[mode];
      }
    });
  });

  // Switch Subject
  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const subj = pill.getAttribute('data-subject');
      if (studyData[subj]) {
        currentSubjectKey = subj;
        currentQuizIndex = 0;
        renderQuiz();
        renderNotes();
        renderPlanner();
      }
    });
  });

  // Render Quiz Question
  function renderQuiz() {
    const data = studyData[currentSubjectKey];
    if (!data) return;

    const quizSubjLabel = document.getElementById('quiz-subject-label');
    const quizCounter = document.getElementById('quiz-question-counter');
    const quizQuestionTitle = document.getElementById('quiz-question-title');
    const quizOptionsGroup = document.getElementById('quiz-options-group');
    const quizExpBox = document.getElementById('quiz-explanation-box');
    const quizExpText = document.getElementById('quiz-explanation-text');
    const quizScoreBadge = document.getElementById('quiz-live-score');
    const quizPrevBtn = document.getElementById('quiz-prev-btn');
    const quizNextBtn = document.getElementById('quiz-next-btn');

    if (quizSubjLabel) quizSubjLabel.textContent = `${data.name} • ${data.tag}`;
    if (quizCounter) quizCounter.textContent = `Question ${currentQuizIndex + 1} of ${data.questions.length}`;
    if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${quizScore} / ${quizAnsweredCount}`;

    const currentQ = data.questions[currentQuizIndex];
    if (quizQuestionTitle) quizQuestionTitle.textContent = currentQ.q;

    if (quizExpBox) quizExpBox.style.display = 'none';
    if (quizExpText) quizExpText.textContent = '';

    if (quizOptionsGroup) {
      quizOptionsGroup.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      currentQ.options.forEach((opt, idx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-opt';
        optBtn.innerHTML = `
          <span class="quiz-opt-letter">${letters[idx]}</span>
          <span class="quiz-opt-text">${opt.text}</span>
        `;

        optBtn.addEventListener('click', () => {
          // Disable all buttons in group
          const allOpts = quizOptionsGroup.querySelectorAll('.quiz-opt');
          allOpts.forEach((b, i) => {
            b.disabled = true;
            if (currentQ.options[i].correct) {
              b.classList.add('selected-correct');
            }
          });

          quizAnsweredCount++;
          if (opt.correct) {
            optBtn.classList.add('selected-correct');
            quizScore++;
            showToast('🎯 Correct! +10 Points earned.');
          } else {
            optBtn.classList.add('selected-incorrect');
            showToast('💡 Concept breakdown revealed below.');
          }

          if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${quizScore} / ${quizAnsweredCount}`;

          // Show explanation
          if (quizExpBox && quizExpText) {
            quizExpText.textContent = currentQ.explanation;
            quizExpBox.style.display = 'block';
          }
        });

        quizOptionsGroup.appendChild(optBtn);
      });
    }

    if (quizPrevBtn) {
      quizPrevBtn.disabled = currentQuizIndex === 0;
    }
    if (quizNextBtn) {
      quizNextBtn.disabled = currentQuizIndex === data.questions.length - 1;
    }
  }

  // Quiz Next & Prev Listeners
  const quizPrevBtn = document.getElementById('quiz-prev-btn');
  const quizNextBtn = document.getElementById('quiz-next-btn');

  if (quizPrevBtn) {
    quizPrevBtn.addEventListener('click', () => {
      if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderQuiz();
      }
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      const data = studyData[currentSubjectKey];
      if (currentQuizIndex < data.questions.length - 1) {
        currentQuizIndex++;
        renderQuiz();
      }
    });
  }

  // Render Notes Pane
  function renderNotes() {
    const data = studyData[currentSubjectKey];
    if (!data) return;

    const notesSubjLabel = document.getElementById('notes-subject-label');
    const notesDynamicContent = document.getElementById('notes-dynamic-content');

    if (notesSubjLabel) notesSubjLabel.textContent = `${data.name} • Smart Notes`;
    if (notesDynamicContent) notesDynamicContent.innerHTML = data.notes;
  }

  // Copy Notes button
  const btnCopyNotes = document.getElementById('btn-copy-notes');
  if (btnCopyNotes) {
    btnCopyNotes.addEventListener('click', () => {
      const notesDynamicContent = document.getElementById('notes-dynamic-content');
      if (notesDynamicContent) {
        const text = notesDynamicContent.innerText || notesDynamicContent.textContent;
        navigator.clipboard.writeText(text).then(() => {
          showToast('📋 Notes copied to clipboard!');
        }).catch(() => {
          showToast('📋 Notes copied to clipboard!');
        });
      }
    });
  }

  // Render Study Planner
  const plannerDaysSelect = document.getElementById('planner-days-select');
  const plannerHoursSelect = document.getElementById('planner-hours-select');
  const plannerTimelineOutput = document.getElementById('planner-timeline-output');

  function renderPlanner() {
    if (!plannerTimelineOutput) return;

    const days = plannerDaysSelect ? parseInt(plannerDaysSelect.value, 10) : 14;
    const hours = plannerHoursSelect ? parseInt(plannerHoursSelect.value, 10) : 2;
    const subjName = studyData[currentSubjectKey] ? studyData[currentSubjectKey].name : 'Subject';

    let scheduleItems = [];

    if (days === 7) {
      scheduleItems = [
        { day: 'Day 1–2', title: `Core Concepts & Formulas Diagnostic (${subjName})`, time: `${hours}h / day` },
        { day: 'Day 3–4', title: 'High-Yield Chapter Summaries & Active Recall Quizzing', time: `${hours}h / day` },
        { day: 'Day 5–6', title: 'Weak-Spot Drill & Timed MCQ Simulation (50 questions)', time: `${hours}h / day` },
        { day: 'Day 7', title: 'Light Flashcard Review & Exam Readiness Checklist', time: `${Math.max(1, hours - 1)}h buffer` }
      ];
    } else if (days === 14) {
      scheduleItems = [
        { day: 'Day 1–4', title: `Foundational Synthesis & Note Breakdown (${subjName})`, time: `${hours}h / day` },
        { day: 'Day 5–8', title: 'Interactive MCQ Quizzing by Unit with Socratic Explanations', time: `${hours}h / day` },
        { day: 'Day 9–11', title: 'Spaced Repetition Milestone 1: Automated Retention Quiz', time: `${hours}h / day` },
        { day: 'Day 12–13', title: 'Full-Length Timed Mock Exam with Negative Marking Review', time: `${hours}h / day` },
        { day: 'Day 14', title: 'Pre-Exam Executive Summary & Final Formula Sheet', time: '1.5h review' }
      ];
    } else {
      scheduleItems = [
        { day: 'Week 1', title: `Complete Syllabus Decomposition & AI Smart Notes (${subjName})`, time: `${hours}h / day` },
        { day: 'Week 2', title: 'Daily Spaced Repetition Flashcards & Topic MCQs (Level 1–2)', time: `${hours}h / day` },
        { day: 'Week 3', title: 'Advanced Problem Solving, Proofs & Diagnostic Quizzing (Level 3)', time: `${hours}h / day` },
        { day: 'Week 4', title: 'Comprehensive Mock Tests, Heatmap Analysis & Grade Maximizer', time: `${hours}h / day` }
      ];
    }

    plannerTimelineOutput.innerHTML = scheduleItems.map(item => `
      <div class="plan-day-card">
        <div class="plan-day-left">
          <span class="plan-day-badge">${item.day}</span>
          <span class="plan-task-title">${item.title}</span>
        </div>
        <span class="plan-time-tag">${item.time}</span>
      </div>
    `).join('');
  }

  if (plannerDaysSelect) plannerDaysSelect.addEventListener('change', renderPlanner);
  if (plannerHoursSelect) plannerHoursSelect.addEventListener('change', renderPlanner);

  // Initial render of test-drive components
  renderQuiz();
  renderNotes();
  renderPlanner();

  // --------------------------------------------------------------------------
  // 6. Metrics Animated Counter (IntersectionObserver)
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  let hasCounted = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const isPercentage = counter.textContent.includes('%');
          const isM = counter.textContent.includes('M+');
          const isK = counter.textContent.includes('k+') || counter.textContent.includes('000+');

          let start = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }

            if (isPercentage) {
              counter.textContent = `${Math.floor(start)}%`;
            } else if (isM) {
              const millions = (start / 1000000).toFixed(1);
              counter.textContent = `${millions}M+`;
            } else if (isK && target >= 1000) {
              counter.textContent = `${Math.floor(start).toLocaleString()}+`;
            } else {
              counter.textContent = Math.floor(start).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.getElementById('metrics-bar');
  if (metricsSection) {
    countUpObserver.observe(metricsSection);
  }

  // --------------------------------------------------------------------------
  // 7. FAQ Accordion, Live Search & Category Filtering
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearchInput = document.getElementById('faq-search-input');
  const faqClearSearch = document.getElementById('faq-clear-search');
  const faqCategoryPills = document.querySelectorAll('.faq-cat-pill');
  const faqNoResults = document.getElementById('faq-no-results');

  // Accordion Toggle
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close others for clean accordion feel
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Filter FAQ items
  function filterFaqs() {
    const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : '';
    const activeCategoryPill = document.querySelector('.faq-cat-pill.active');
    const selectedCategory = activeCategoryPill ? activeCategoryPill.getAttribute('data-cat') : 'all';

    let visibleCount = 0;

    faqItems.forEach(item => {
      const qText = item.querySelector('.faq-q-text')?.textContent.toLowerCase() || '';
      const aText = item.querySelector('.faq-answer-pane p')?.textContent.toLowerCase() || '';
      const itemCat = item.getAttribute('data-category') || 'general';

      const matchesSearch = !query || qText.includes(query) || aText.includes(query);
      const matchesCategory = selectedCategory === 'all' || itemCat === selectedCategory;

      if (matchesSearch && matchesCategory) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (faqNoResults) {
      faqNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (faqClearSearch) {
      faqClearSearch.style.display = query.length > 0 ? 'block' : 'none';
    }
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', filterFaqs);
  }

  if (faqClearSearch) {
    faqClearSearch.addEventListener('click', () => {
      if (faqSearchInput) faqSearchInput.value = '';
      filterFaqs();
      if (faqSearchInput) faqSearchInput.focus();
    });
  }

  faqCategoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      faqCategoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterFaqs();
    });
  });

  // --------------------------------------------------------------------------
  // 8. 1-Minute Interactive Tour Modal
  // --------------------------------------------------------------------------
  const openVideoTourBtn = document.getElementById('open-video-tour-btn');
  const videoTourModal = document.getElementById('video-tour-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const tourPrevBtn = document.getElementById('tour-prev-btn');
  const tourNextBtn = document.getElementById('tour-next-btn');
  const tourStepIndicator = document.getElementById('tour-step-indicator');
  const tourHeadline = document.getElementById('tour-headline');
  const tourExplanation = document.getElementById('tour-explanation');
  const tourMiniDemoBox = document.getElementById('tour-mini-demo-box');
  const tourDots = document.querySelectorAll('.tour-dot');

  const tourSteps = [
    {
      step: 1,
      headline: 'Step 1: Choose Your Subject or Upload Notes',
      desc: 'Select from 45+ pre-loaded academic subjects or upload lecture slides, PDF chapters, and exam syllabi.',
      chips: ['🧬 AP Biology', '📐 AP Calculus AB', '⚡ AP Physics C', '🧪 Organic Chem I', '🏛️ World History']
    },
    {
      step: 2,
      headline: 'Step 2: AI Synthesizes Chapter Smart Notes',
      desc: 'Get structured bullet summaries, key definitions, equations, and Cornell study templates in seconds.',
      chips: ['✨ Key Takeaways', '📝 Formula Cheat-Sheet', '📇 Anki Flashcards', '🧠 Mind-Map Outline']
    },
    {
      step: 3,
      headline: 'Step 3: Solve Interactive MCQs with Step-by-Step Logic',
      desc: 'Active retrieval practice with instant explanations for every correct and incorrect answer choice.',
      chips: ['🎯 Diagnostic Quizzes', '⏱️ Timed Mock Tests', '🔍 Detailed Reasonings', '📈 Real-time Score']
    },
    {
      step: 4,
      headline: 'Step 4: Track Retention & Follow Spaced Schedule',
      desc: 'Your automated study planner recalculates daily quotas so you peak right on exam day without cramming.',
      chips: ['📅 Spaced Timetable', '📊 Retention Heatmap', '🔥 Streak Badges', '🚀 94% Grade Boost']
    }
  ];

  let currentTourStep = 0;

  function renderTourStep(index) {
    currentTourStep = index;
    const step = tourSteps[currentTourStep];
    if (!step) return;

    if (tourHeadline) tourHeadline.textContent = step.headline;
    if (tourExplanation) tourExplanation.textContent = step.desc;
    if (tourStepIndicator) tourStepIndicator.textContent = `Step ${step.step} of 4`;

    if (tourMiniDemoBox) {
      tourMiniDemoBox.innerHTML = step.chips.map(chip => `<span class="pill-sample">${chip}</span>`).join('');
    }

    tourDots.forEach((dot, idx) => {
      if (idx === currentTourStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (tourPrevBtn) tourPrevBtn.disabled = currentTourStep === 0;
    if (tourNextBtn) {
      tourNextBtn.textContent = currentTourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step →';
    }
  }

  function openTourModal() {
    if (videoTourModal) {
      renderTourStep(0);
      videoTourModal.classList.add('open');
      videoTourModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeTourModal() {
    if (videoTourModal) {
      videoTourModal.classList.remove('open');
      videoTourModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openVideoTourBtn) openVideoTourBtn.addEventListener('click', openTourModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeTourModal);

  if (videoTourModal) {
    videoTourModal.addEventListener('click', (e) => {
      if (e.target === videoTourModal) closeTourModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoTourModal && videoTourModal.classList.contains('open')) {
      closeTourModal();
    }
    // Ctrl + K quick search shortcut
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (faqSearchInput) {
        faqSearchInput.focus();
        faqSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  if (tourPrevBtn) {
    tourPrevBtn.addEventListener('click', () => {
      if (currentTourStep > 0) {
        renderTourStep(currentTourStep - 1);
      }
    });
  }

  if (tourNextBtn) {
    tourNextBtn.addEventListener('click', () => {
      if (currentTourStep < tourSteps.length - 1) {
        renderTourStep(currentTourStep + 1);
      } else {
        closeTourModal();
        showToast('🎉 Tour completed! Start exploring EduNexa AI tools.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Quick Student Signup Form (Start Learning Section)
  // --------------------------------------------------------------------------
  const ctaSignupForm = document.getElementById('cta-quick-signup-form');
  const ctaEmailInput = document.getElementById('cta-email-input');
  const ctaFeedback = document.getElementById('cta-form-feedback');

  if (ctaSignupForm && ctaEmailInput) {
    ctaSignupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = ctaEmailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        if (ctaFeedback) {
          ctaFeedback.textContent = '⚠️ Please enter a valid student or institutional email address.';
          ctaFeedback.className = 'cta-feedback-text error';
          ctaFeedback.style.display = 'block';
        }
        return;
      }

      if (ctaFeedback) {
        ctaFeedback.textContent = '🎉 Welcome to EduNexa AI! Redirecting to your personalized study workspace...';
        ctaFeedback.className = 'cta-feedback-text success';
        ctaFeedback.style.display = 'block';
      }

      showToast(`🚀 Starter workspace created for ${email}!`);
      ctaEmailInput.value = '';

      // Check if project has an auth system or redirect to homepage signup
      setTimeout(() => {
        if (window.location.pathname.endsWith('about.html')) {
          window.location.href = 'index.html#signup';
        }
      }, 1500);
    });
  }

  // Nav Search Button Click
  const navSearchBtn = document.getElementById('nav-search-btn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
      if (faqSearchInput) {
        faqSearchInput.focus();
        faqSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(msg) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${msg}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toastContainer.contains(toast)) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 11. Existing Firebase Authentication Hook Integration (if configured)
  // --------------------------------------------------------------------------
  try {
    if (window.firebase && window.firebase.auth) {
      window.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const navLoginBtn = document.getElementById('nav-login-btn');
          const navCtaBtn = document.getElementById('nav-cta-btn');
          if (navLoginBtn) {
            navLoginBtn.textContent = 'My Dashboard';
            navLoginBtn.href = 'index.html#dashboard';
          }
          if (navCtaBtn) {
            navCtaBtn.innerHTML = '<span>Open Study Space</span>';
            navCtaBtn.href = 'index.html#app';
          }
        }
      });
    }
  } catch (err) {
    // Graceful no-op if firebase is not initialized
  }

  // Update current copyright year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
