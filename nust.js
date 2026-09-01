/**
 * EduNexa AI × NUST NET Preparation Hub
 * Core Application Script — Pure Vanilla JavaScript
 * Zero external library dependencies.
 */

(function () {
  'use strict';

  // ==========================================================================
  // Global State & Storage Keys
  // ==========================================================================
  const STORAGE_KEYS = {
    GOALS: 'studymate_nust_daily_goals',
    GOALS_DATE: 'studymate_nust_goals_date',
    TESTS_HISTORY: 'studymate_nust_test_history',
    TOPICS_COMPLETED: 'studymate_nust_topics_done',
    TIMER_STATS: 'studymate_nust_timer_stats'
  };

  // ==========================================================================
  // Comprehensive NUST NET Question Bank
  // ==========================================================================
  const QUESTION_BANK = [
    // MATHEMATICS (Calculus, Conics, Trig, Algebra, Vectors)
    {
      id: 1,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'Evaluate the limit: lim (x → 0) [(sin 5x) / (tan 2x)]',
      options: ['5/2', '2/5', '1', '0'],
      correct: 0,
      explanation: 'Using standard trigonometric limit rules: lim (x→0) sin(ax)/ax = 1. Therefore lim (sin 5x / tan 2x) = lim [(sin 5x / 5x) * 5x] / [(tan 2x / 2x) * 2x] = (1 * 5) / (1 * 2) = 5/2.'
    },
    {
      id: 2,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'The derivative of y = ln(sec x + tan x) with respect to x is:',
      options: ['sec x', 'tan x', 'sec x * tan x', '1 / (sec x + tan x)'],
      correct: 0,
      explanation: 'dy/dx = (1 / (sec x + tan x)) * d/dx(sec x + tan x) = (sec x tan x + sec²x) / (sec x + tan x) = sec x(tan x + sec x) / (sec x + tan x) = sec x.'
    },
    {
      id: 3,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'Evaluate the definite integral: ∫ from 0 to π/2 of [sin x / (sin x + cos x)] dx',
      options: ['π/4', 'π/2', 'π', '1'],
      correct: 0,
      explanation: 'Using the property ∫[0 to a] f(x)dx = ∫[0 to a] f(a - x)dx, adding both forms of I yields 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4.'
    },
    {
      id: 4,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'The eccentricity (e) of the ellipse 9x² + 16y² = 144 is:',
      options: ['√7 / 4', '7 / 16', '3 / 4', '√7 / 3'],
      correct: 0,
      explanation: 'Equation in standard form: x²/16 + y²/9 = 1 => a²=16, b²=9. Since b² = a²(1 - e²), 9 = 16(1 - e²) => 1 - e² = 9/16 => e² = 7/16 => e = √7 / 4.'
    },
    {
      id: 5,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'If vectors a = 2i + 3j - k and b = mi - 2j + 4k are perpendicular, what is the value of m?',
      options: ['5', '-5', '2', '10'],
      correct: 0,
      explanation: 'Two non-zero vectors are perpendicular if and only if their dot product a · b = 0. So (2)(m) + (3)(-2) + (-1)(4) = 0 => 2m - 6 - 4 = 0 => 2m = 10 => m = 5.'
    },
    {
      id: 6,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'If the roots of x² - kx + 9 = 0 are equal, what is the value of k?',
      options: ['±6', '±3', '±9', '18'],
      correct: 0,
      explanation: 'For equal roots, discriminant Δ = b² - 4ac = 0 => (-k)² - 4(1)(9) = 0 => k² = 36 => k = ±6.'
    },
    {
      id: 7,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'The period of the trigonometric function f(x) = 3 sin(4x + π/3) is:',
      options: ['π/2', '2π', 'π', 'π/4'],
      correct: 0,
      explanation: 'The fundamental period of sin(kx) is 2π / |k|. Here k = 4, so period = 2π / 4 = π/2.'
    },
    {
      id: 8,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'How many distinct 4-letter arrangements can be made using the letters of the word "NUST"?',
      options: ['24', '16', '12', '256'],
      correct: 0,
      explanation: 'All 4 letters (N, U, S, T) are distinct. Total permutations = 4! = 4 × 3 × 2 × 1 = 24.'
    },

    // PHYSICS (Mechanics, Waves, Electromagnetism, Modern Physics)
    {
      id: 9,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'A projectile is launched with velocity v at an angle θ with the horizontal. At the highest point of its trajectory, its acceleration is:',
      options: ['g downwards', 'Zero', 'g cos θ', 'g sin θ'],
      correct: 0,
      explanation: 'Throughout the projectile motion (neglecting air resistance), the only acting force is gravity, which produces a constant downward acceleration g at all points including the highest point.'
    },
    {
      id: 10,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'If the radius of a circular wire carrying steady current I is doubled while the current remains unchanged, the magnetic field at the center becomes:',
      options: ['Halved', 'Doubled', 'Quadrupled', 'Unchanged'],
      correct: 0,
      explanation: 'Magnetic field at the center of a circular loop is B = μ₀I / (2R). Since B is inversely proportional to R, doubling R reduces B to B/2 (halved).'
    },
    {
      id: 11,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'In Young\'s Double Slit Experiment, if the distance between slits is halved and screen distance is doubled, the fringe width becomes:',
      options: ['4 times', '2 times', 'Half', 'Unchanged'],
      correct: 0,
      explanation: 'Fringe width β = λL / d. If L becomes 2L and d becomes d/2, new width β\' = λ(2L) / (d/2) = 4(λL / d) = 4β.'
    },
    {
      id: 12,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'The work done by a conservative force along any closed path is always:',
      options: ['Zero', 'Positive', 'Negative', 'Infinite'],
      correct: 0,
      explanation: 'By definition, a force is conservative if the total work done along any closed loop is identically zero: ∮ F · dr = 0.'
    },
    {
      id: 13,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'When the frequency of light incident on a photosensitive metal surface is doubled, the maximum kinetic energy of emitted photoelectrons:',
      options: ['More than doubles', 'Exactly doubles', 'Remains unchanged', 'Decreases'],
      correct: 0,
      explanation: 'Einstein\'s equation: KE_max = hf - Φ. If frequency becomes 2f, KE_new = 2hf - Φ = 2(hf - Φ) + Φ = 2(KE_max) + Φ > 2(KE_max). Thus, it more than doubles.'
    },
    {
      id: 14,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'In an RLC series AC circuit at resonance, the phase difference between applied voltage and circuit current is:',
      options: ['0°', '90°', '180°', '45°'],
      correct: 0,
      explanation: 'At resonance, inductive reactance XL equals capacitive reactance XC, making net reactance zero. The circuit behaves purely resistively, so voltage and current are in phase (phase difference = 0°).'
    },

    // CHEMISTRY & COMPUTER SCIENCE
    {
      id: 15,
      subject: 'cs_chem',
      subjectLabel: 'Chemistry / CS',
      question: 'Which of the following compounds gives a positive Iodoform test upon reaction with I₂/NaOH?',
      options: ['Ethanol (CH₃CH₂OH)', 'Methanol (CH₃OH)', 'Benzaldehyde', 'Diethyl ether'],
      correct: 0,
      explanation: 'The iodoform test is given by compounds containing CH₃-CH(OH)- or CH₃-C=O groups. Ethanol oxidizes to ethanal (acetaldehyde), which contains the methyl carbonyl group and yields yellow CHI₃ precipitate.'
    },
    {
      id: 16,
      subject: 'cs_chem',
      subjectLabel: 'Chemistry / CS',
      question: 'In C++, what will be the output of the expression: `5 + 2 * 3 ^ 2` using standard arithmetic & bitwise XOR?',
      options: ['9', '49', '21', '11'],
      correct: 0,
      explanation: 'Multiplication (*) has higher precedence than bitwise XOR (^). 2 * 3 = 6. 5 + 6 = 11. Then 11 (binary 1011) ^ 2 (binary 0010) = 1001 (decimal 9).'
    },
    {
      id: 17,
      subject: 'cs_chem',
      subjectLabel: 'Chemistry / CS',
      question: 'According to Le Chatelier\'s Principle, an increase in pressure will shift the equilibrium towards:',
      options: ['Fewer moles of gas', 'More moles of gas', 'Endothermic direction', 'No effect on gaseous equilibrium'],
      correct: 0,
      explanation: 'Increasing pressure forces the system to decrease volume, favoring the side with fewer stoichiometric moles of gaseous molecules.'
    },
    {
      id: 18,
      subject: 'cs_chem',
      subjectLabel: 'Chemistry / CS',
      question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
      options: ['Queue', 'Stack', 'Binary Search Tree', 'Max Heap'],
      correct: 0,
      explanation: 'A Queue operates strictly on FIFO (First In First Out), where elements are inserted at the rear and removed from the front.'
    },

    // ENGLISH (Verbal Aptitude, Vocabulary, Grammar)
    {
      id: 19,
      subject: 'english',
      subjectLabel: 'English',
      question: 'Choose the word most nearly SYNONYMOUS to "PRAGMATIC":',
      options: ['Practical', 'Theoretical', 'Idealistic', 'Impulsive'],
      correct: 0,
      explanation: '"Pragmatic" means dealing with things sensibly and realistically based on practical rather than theoretical considerations.'
    },
    {
      id: 20,
      subject: 'english',
      subjectLabel: 'English',
      question: 'Sentence Completion: "Despite the professor\'s _______ explanation, the students remained completely confused."',
      options: ['lucid', 'opaque', 'circuitous', 'pedantic'],
      correct: 0,
      explanation: 'The word "Despite" indicates a contrast. Despite the explanation being clear and easy to understand ("lucid"), the students still were confused.'
    },
    {
      id: 21,
      subject: 'english',
      subjectLabel: 'English',
      question: 'Identify the grammatically correct sentence:',
      options: [
        'Neither the teacher nor the students were present.',
        'Neither the teacher nor the students was present.',
        'Neither the teacher or the students was present.',
        'Neither the teacher nor the students has been present.'
      ],
      correct: 0,
      explanation: 'In "neither... nor" structures, the verb agrees with the subject closest to it ("students", which is plural, requiring "were").'
    },
    {
      id: 22,
      subject: 'english',
      subjectLabel: 'English',
      question: 'Choose the correct preposition: "He is adept _______ solving complex calculus problems."',
      options: ['in / at', 'for', 'with', 'by'],
      correct: 0,
      explanation: 'The adjective "adept" takes the preposition "at" or "in" to denote being skilled in a specific craft.'
    },

    // INTELLIGENCE / IQ
    {
      id: 23,
      subject: 'iq',
      subjectLabel: 'Intelligence',
      question: 'Find the next number in the series: 3, 8, 15, 24, 35, ?',
      options: ['48', '46', '50', '49'],
      correct: 0,
      explanation: 'The sequence follows n² - 1 for n = 2, 3, 4, 5, 6, 7. 7² - 1 = 49 - 1 = 48. Alternatively, differences increase by 2 (+5, +7, +9, +11, +13 => 35 + 13 = 48).'
    },
    {
      id: 24,
      subject: 'iq',
      subjectLabel: 'Intelligence',
      question: 'If "NUST" is coded as "PVUV", how is "FAST" coded under the same pattern?',
      options: ['HCUV', 'GCUV', 'HCVU', 'GBUU'],
      correct: 0,
      explanation: 'Pattern: N(+2)->P, U(+1)->V, S(+2)->U, T(+1)->V. Applying (+2, +1, +2, +1) to FAST: F(+2)=H, A(+1)=B -> wait, F(+2)=H, A(+2)? Here N(+2)=P, U(+1)=V, S(+2)=U, T(+2)=V. FAST -> F(+2)=H, A(+2)=C, S(+2)=U, T(+2)=V => HCUV.'
    },
    {
      id: 25,
      subject: 'iq',
      subjectLabel: 'Intelligence',
      question: 'A man walks 6 km North, turns right and walks 8 km. How far is he from his initial starting point?',
      options: ['10 km', '14 km', '12 km', '2 km'],
      correct: 0,
      explanation: 'Using the Pythagorean Theorem: Distance = √(6² + 8²) = √(36 + 64) = √100 = 10 km.'
    },
    {
      id: 26,
      subject: 'iq',
      subjectLabel: 'Intelligence',
      question: 'Find the odd one out from the following group:',
      options: ['Sphere', 'Circle', 'Triangle', 'Rectangle'],
      correct: 0,
      explanation: 'A Sphere is a 3-dimensional solid shape, whereas Circle, Triangle, and Rectangle are all 2-dimensional planar figures.'
    },
    {
      id: 27,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'The modulus and principal argument of the complex number z = 1 + i√3 are:',
      options: ['|z| = 2, θ = π/3', '|z| = 4, θ = π/3', '|z| = 2, θ = π/6', '|z| = √3, θ = π/4'],
      correct: 0,
      explanation: '|z| = √(1² + (√3)²) = √(1+3) = 2. Principal argument θ = tan⁻¹(√3/1) = 60° = π/3.'
    },
    {
      id: 28,
      subject: 'physics',
      subjectLabel: 'Physics',
      question: 'What is the SI unit of magnetic flux?',
      options: ['Weber (Wb)', 'Tesla (T)', 'Henry (H)', 'Ampere per meter'],
      correct: 0,
      explanation: 'Magnetic flux (Φ = B · A) is measured in Webers (Wb = T · m²). Tesla is the unit of magnetic flux density / field intensity.'
    },
    {
      id: 29,
      subject: 'iq',
      subjectLabel: 'Intelligence',
      question: 'Doctor : Hospital :: Teacher : ?',
      options: ['School', 'Student', 'Classroom', 'Books'],
      correct: 0,
      explanation: 'A Doctor’s primary professional workplace is a Hospital; a Teacher’s primary professional workplace is a School.'
    },
    {
      id: 30,
      subject: 'math',
      subjectLabel: 'Mathematics',
      question: 'The value of the determinant of a 3×3 matrix with two identical rows is always:',
      options: ['0', '1', '-1', 'Undefined'],
      correct: 0,
      explanation: 'By standard matrix determinant properties, if any two rows or columns of a square matrix are identical or proportional, the determinant is identically zero.'
    }
  ];

  // Mini English Quiz Data
  const MINI_ENGLISH_QUESTIONS = [
    {
      q: 'Select the word most nearly OPPOSITE in meaning to "EPHEMERAL":',
      options: ['Transient', 'Fleeting', 'Permanent', 'Fragile'],
      correct: 2,
      exp: 'Ephemeral means lasting for a very short time. The exact opposite is Permanent.'
    },
    {
      q: 'Complete the sentence: "The scientist presented a _______ hypothesis that accounted for all experimental anomalies."',
      options: ['comprehensive', 'tenuous', 'spurious', 'superficial'],
      correct: 0,
      exp: 'Comprehensive means thorough and complete, covering all aspects and anomalies.'
    },
    {
      q: 'Choose the word most nearly SYNONYMOUS to "UBIQUITOUS":',
      options: ['Omnipresent', 'Rare', 'Ambiguous', 'Treacherous'],
      correct: 0,
      exp: 'Ubiquitous means present, appearing, or found everywhere (omnipresent).'
    },
    {
      q: 'Select the sentence with correct subject-verb agreement:',
      options: [
        'The group of engineers is designing the UAV.',
        'The group of engineers are designing the UAV.',
        'The group of engineers were designing the UAV yesterday.',
        'The group of engineers have completed the UAV.'
      ],
      correct: 0,
      exp: 'The subject is the collective singular noun "group", which takes the singular verb "is".'
    },
    {
      q: 'Choose the word closest in meaning to "METICULOUS":',
      options: ['Painstakingly careful', 'Hasty', 'Indifferent', 'Aggressive'],
      correct: 0,
      exp: 'Meticulous means showing great attention to detail; very careful and precise.'
    }
  ];

  // High-Yield Topic Formula Summaries
  const TOPIC_DETAILS = {
    'Algebra': {
      title: 'Algebra & Quadratic Equations',
      badge: 'Mathematics Core',
      content: `
        <h4>Key Formulas &amp; Rules for NUST NET</h4>
        <ul>
          <li><strong>Quadratic Roots:</strong> x = [-b ± √(b² - 4ac)] / 2a</li>
          <li><strong>Sum &amp; Product of Roots:</strong> α + β = -b/a, αβ = c/a</li>
          <li><strong>Nature of Roots:</strong> Δ = b² - 4ac. Δ &gt; 0 (Real &amp; Distinct), Δ = 0 (Real &amp; Equal), Δ &lt; 0 (Complex Conjugate).</li>
          <li><strong>Remainder Theorem:</strong> When P(x) is divided by (x - a), the remainder is P(a).</li>
        </ul>
      `
    },
    'Functions & Limits': {
      title: 'Functions & Limits Shortcuts',
      badge: 'Mathematics Core',
      content: `
        <h4>High-Speed Limit Rules</h4>
        <ul>
          <li><strong>Trig Limit:</strong> lim (x→0) sin(kx)/x = k, lim (x→0) tan(kx)/x = k</li>
          <li><strong>Euler Formula:</strong> lim (n→∞) (1 + 1/n)ⁿ = e</li>
          <li><strong>L\'Hôpital\'s Rule:</strong> If limit yields 0/0 or ∞/∞, differentiate numerator and denominator independently: lim f(x)/g(x) = lim f\'(x)/g\'(x).</li>
        </ul>
      `
    },
    'Trigonometry': {
      title: 'Trigonometric Identities Bank',
      badge: 'Mathematics Core',
      content: `
        <h4>Crucial Identities</h4>
        <ul>
          <li>sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ</li>
          <li><strong>Double Angle:</strong> sin 2θ = 2 sin θ cos θ, cos 2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</li>
          <li><strong>Product to Sum:</strong> 2 sin A cos B = sin(A+B) + sin(A-B)</li>
        </ul>
      `
    },
    'Differentiation': {
      title: 'Calculus: Differentiation Shortcuts',
      badge: 'Highest Yield',
      content: `
        <h4>Rapid Derivative Formulas</h4>
        <ul>
          <li>d/dx(xⁿ) = n xⁿ⁻¹, d/dx(ln x) = 1/x, d/dx(eᵃˣ) = a eᵃˣ</li>
          <li>d/dx(tan x) = sec²x, d/dx(sec x) = sec x tan x</li>
          <li><strong>Chain Rule:</strong> d/dx [f(g(x))] = f\'(g(x)) * g\'(x)</li>
          <li><strong>Stationary Points:</strong> Solve f\'(x) = 0. If f\'\'(x) &gt; 0 (Local Min), f\'\'(x) &lt; 0 (Local Max).</li>
        </ul>
      `
    },
    'Integration': {
      title: 'Calculus: Integration Quick Guide',
      badge: 'Highest Yield',
      content: `
        <h4>Standard Integrals &amp; Substitution</h4>
        <ul>
          <li>∫ [f\'(x) / f(x)] dx = ln |f(x)| + C</li>
          <li>∫ [f(x)]ⁿ f\'(x) dx = [f(x)]ⁿ⁺¹ / (n+1) + C</li>
          <li>∫ 1 / (a² + x²) dx = (1/a) tan⁻¹(x/a) + C</li>
          <li>∫ 1 / √(a² - x²) dx = sin⁻¹(x/a) + C</li>
        </ul>
      `
    },
    'Mechanics': {
      title: 'Physics: Mechanics & Motion Dynamics',
      badge: 'Physics Core',
      content: `
        <h4>Kinematics &amp; Projectile Equations</h4>
        <ul>
          <li><strong>Equations of Motion:</strong> vf = vi + at, S = vit + ½at², 2aS = vf² - vi²</li>
          <li><strong>Projectile Max Height:</strong> H = (vi² sin²θ) / (2g)</li>
          <li><strong>Time of Flight:</strong> T = (2 vi sin θ) / g</li>
          <li><strong>Horizontal Range:</strong> R = (vi² sin 2θ) / g (Maximum at θ = 45°)</li>
        </ul>
      `
    },
    'Electricity': {
      title: 'Physics: Current & Electrostatics',
      badge: 'Physics Core',
      content: `
        <h4>Circuits &amp; Coulomb\'s Law</h4>
        <ul>
          <li><strong>Coulomb\'s Force:</strong> F = (1 / 4πε₀) * (|q₁q₂| / r²)</li>
          <li><strong>Capacitance:</strong> C = Q / V = (ε₀εᵣ A) / d</li>
          <li><strong>Resistors in Parallel:</strong> 1/R_eq = 1/R₁ + 1/R₂</li>
          <li><strong>Energy in Capacitor:</strong> U = ½ CV² = ½ Q²/C</li>
        </ul>
      `
    }
  };

  // ==========================================================================
  // App Controller Initialization
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStatsCounter();
    initDailyGoals();
    initSubjectTabs();
    initTopicModals();
    initMiniEnglishQuiz();
    initPracticeModal();
    initCalculator();
    initPomodoroTimer();
    initProgressTracker();
    initFAQAccordion();
    initBackToTop();
  });

  // ==========================================================================
  // 1. Navigation & Mobile Drawer
  // ==========================================================================
  function initNavigation() {
    const header = document.getElementById('siteHeader');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const quickMockBtn = document.getElementById('btnQuickMock');
    const startPrepBtn = document.getElementById('btnStartPrep');
    const mStartPrepBtn = document.getElementById('mBtnStartPrep');
    const heroPracticeBtn = document.getElementById('btnLaunchHeroPractice');
    const iqLaunchBtn = document.getElementById('btnLaunchIQQuiz');

    // Sticky shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggleBtn.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close drawer on link click
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          toggleBtn.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Quick Test Launchers
    const launchTestHandler = (subject = 'all') => {
      const subjectSelect = document.getElementById('practiceSubjectSelect');
      if (subjectSelect) subjectSelect.value = subject;
      openPracticeModal();
    };

    if (quickMockBtn) quickMockBtn.addEventListener('click', () => launchTestHandler('all'));
    if (startPrepBtn) startPrepBtn.addEventListener('click', () => launchTestHandler('all'));
    if (mStartPrepBtn) mStartPrepBtn.addEventListener('click', () => launchTestHandler('all'));
    if (heroPracticeBtn) heroPracticeBtn.addEventListener('click', () => launchTestHandler('all'));
    if (iqLaunchBtn) iqLaunchBtn.addEventListener('click', () => launchTestHandler('iq'));

    // Subject Direct Practice Buttons
    const mathPracticeBtn = document.getElementById('btnPracticeMathOnly');
    const physicsPracticeBtn = document.getElementById('btnPracticePhysicsOnly');

    if (mathPracticeBtn) mathPracticeBtn.addEventListener('click', () => launchTestHandler('math'));
    if (physicsPracticeBtn) physicsPracticeBtn.addEventListener('click', () => launchTestHandler('physics'));
  }

  // ==========================================================================
  // 2. Animated Stats Counter
  // ==========================================================================
  function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-target'), 10) || 0;
            animateValue(card, 0, target, 1500);
          });
        }
      });
    }, { threshold: 0.2 });

    const statsSection = document.getElementById('quickStats');
    if (statsSection) observer.observe(statsSection);

    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = currentVal >= 1000 ? currentVal.toLocaleString() + '+' : currentVal;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          obj.innerHTML = end >= 1000 ? end.toLocaleString() + '+' : end;
        }
      };
      window.requestAnimationFrame(step);
    }
  }

  // ==========================================================================
  // 3. Daily Study Goals Tracker
  // ==========================================================================
  function initDailyGoals() {
    const checklist = document.getElementById('goalChecklist');
    const countDisplay = document.getElementById('goalCompletedCount');
    const pctDisplay = document.getElementById('goalPercent');
    if (!checklist) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem(STORAGE_KEYS.GOALS_DATE);
    let savedGoals = {};

    if (savedDate === todayStr) {
      try {
        savedGoals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || {};
      } catch (e) {
        savedGoals = {};
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.GOALS_DATE, todayStr);
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify({}));
    }

    const checkboxes = checklist.querySelectorAll('.goal-checkbox');

    // Populate initial checked states
    checkboxes.forEach((cb, idx) => {
      const goalId = 'goal-' + (idx + 1);
      if (savedGoals[goalId]) {
        cb.checked = true;
      }

      cb.addEventListener('change', () => {
        savedGoals[goalId] = cb.checked;
        localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(savedGoals));
        updateGoalCounts();
      });
    });

    function updateGoalCounts() {
      const total = checkboxes.length;
      let completed = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) completed++;
      });

      const pct = Math.round((completed / total) * 100);
      if (countDisplay) countDisplay.textContent = `${completed} / ${total}`;
      if (pctDisplay) pctDisplay.textContent = `${pct}% Done`;

      if (completed === total && total > 0) {
        showToast('🎯 Outstanding! You completed all daily NET goals!', 'success');
      }
    }

    updateGoalCounts();
  }

  // ==========================================================================
  // 4. Subject Tabs (Chemistry vs Computer Science)
  // ==========================================================================
  function initSubjectTabs() {
    const tabChem = document.getElementById('tabBtnChem');
    const tabCS = document.getElementById('tabBtnCS');
    const contentChem = document.getElementById('tabContentChem');
    const contentCS = document.getElementById('tabContentCS');

    if (!tabChem || !tabCS || !contentChem || !contentCS) return;

    tabChem.addEventListener('click', () => {
      tabChem.classList.add('active');
      tabChem.setAttribute('aria-selected', 'true');
      tabCS.classList.remove('active');
      tabCS.setAttribute('aria-selected', 'false');

      contentChem.classList.add('active');
      contentCS.classList.remove('active');
    });

    tabCS.addEventListener('click', () => {
      tabCS.classList.add('active');
      tabCS.setAttribute('aria-selected', 'true');
      tabChem.classList.remove('active');
      tabChem.setAttribute('aria-selected', 'false');

      contentCS.classList.add('active');
      contentChem.classList.remove('active');
    });
  }

  // ==========================================================================
  // 5. Topic Formula / Summary Modal
  // ==========================================================================
  function initTopicModals() {
    const modal = document.getElementById('topicModal');
    const titleEl = document.getElementById('topicModalTitle');
    const badgeEl = document.getElementById('topicModalBadge');
    const bodyEl = document.getElementById('topicModalBody');
    const closeBtn = document.getElementById('btnCloseTopicModal');
    const launchBtn = document.getElementById('btnTopicPracticeLaunch');

    if (!modal) return;

    let currentSubjectKey = 'math';

    document.querySelectorAll('.btn-topic-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const topicName = btn.getAttribute('data-topic-name') || 'Algebra';
        const card = btn.closest('.topic-card');
        currentSubjectKey = card ? card.getAttribute('data-subject') : 'math';

        const data = TOPIC_DETAILS[topicName] || {
          title: topicName + ' High-Yield Review',
          badge: 'NUST NET Core Concept',
          content: `
            <h4>Key Formulas &amp; Examination Notes</h4>
            <p>Review standard FSc textbook definitions, boundary conditions, and typical MCQ traps for ${topicName}.</p>
            <ul>
              <li>Memorize core proportionalities and algebraic shortcuts.</li>
              <li>Eliminate mathematically impossible multiple-choice options first.</li>
            </ul>
          `
        };

        if (titleEl) titleEl.textContent = data.title;
        if (badgeEl) badgeEl.textContent = data.badge;
        if (bodyEl) bodyEl.innerHTML = data.content;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        closeModal();
        const subjectSelect = document.getElementById('practiceSubjectSelect');
        if (subjectSelect) {
          subjectSelect.value = currentSubjectKey === 'chem' || currentSubjectKey === 'cs' ? 'cs_chem' : currentSubjectKey;
        }
        openPracticeModal();
      });
    }
  }

  // ==========================================================================
  // 6. Interactive Mini English Quiz
  // ==========================================================================
  function initMiniEnglishQuiz() {
    const qText = document.getElementById('miniQuizQuestion');
    const optionsContainer = document.getElementById('miniQuizOptions');
    const feedbackBox = document.getElementById('miniQuizFeedback');
    const counterEl = document.getElementById('miniQuizCounter');
    const nextBtn = document.getElementById('btnNextMiniQuestion');

    if (!qText || !optionsContainer || !nextBtn) return;

    let currentIndex = 0;
    let answered = false;

    function renderQuestion(idx) {
      const item = MINI_ENGLISH_QUESTIONS[idx];
      answered = false;
      if (counterEl) counterEl.textContent = `Question ${idx + 1} of ${MINI_ENGLISH_QUESTIONS.length}`;
      qText.innerHTML = item.q;
      feedbackBox.className = 'quiz-feedback-box';
      feedbackBox.innerHTML = '';
      optionsContainer.innerHTML = '';

      item.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.textContent = `${String.fromCharCode(65 + optIdx)}) ${opt}`;
        btn.addEventListener('click', () => handleOptionClick(optIdx, btn));
        optionsContainer.appendChild(btn);
      });
    }

    function handleOptionClick(selectedIdx, btnEl) {
      if (answered) return;
      answered = true;
      const item = MINI_ENGLISH_QUESTIONS[currentIndex];
      const buttons = optionsContainer.querySelectorAll('.quiz-option-btn');

      if (selectedIdx === item.correct) {
        btnEl.classList.add('selected-correct');
        feedbackBox.className = 'quiz-feedback-box show correct';
        feedbackBox.innerHTML = `<strong>Correct!</strong> ${item.exp}`;
      } else {
        btnEl.classList.add('selected-wrong');
        if (buttons[item.correct]) buttons[item.correct].classList.add('selected-correct');
        feedbackBox.className = 'quiz-feedback-box show wrong';
        feedbackBox.innerHTML = `<strong>Incorrect.</strong> ${item.exp}`;
      }
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % MINI_ENGLISH_QUESTIONS.length;
      renderQuestion(currentIndex);
    });

    renderQuestion(0);
  }

  // ==========================================================================
  // 7. Full Practice Test System Modal
  // ==========================================================================
  let currentMockQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let testTimerInterval = null;
  let testSecondsRemaining = 1800; // 30 mins default
  let isReviewMode = false;

  function initPracticeModal() {
    const modal = document.getElementById('practiceModal');
    const startCustomMockBtn = document.getElementById('btnStartCustomMock');
    const closeBtn = document.getElementById('btnCloseModal');
    const prevBtn = document.getElementById('btnPrevQ');
    const nextBtn = document.getElementById('btnNextQ');
    const submitBtn = document.getElementById('btnSubmitTest');
    const reviewBtn = document.getElementById('btnReviewAnswers');
    const restartBtn = document.getElementById('btnRestartTest');

    if (!modal) return;

    if (startCustomMockBtn) {
      startCustomMockBtn.addEventListener('click', () => {
        openPracticeModal();
      });
    }

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      clearInterval(testTimerInterval);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderCurrentQuestion();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < currentMockQuestions.length - 1) {
          currentQuestionIndex++;
          renderCurrentQuestion();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        finishPracticeTest();
      });
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        isReviewMode = true;
        currentQuestionIndex = 0;
        document.getElementById('modalQuizBody').classList.remove('hidden');
        document.getElementById('modalResultBody').classList.add('hidden');
        document.getElementById('modalQuizFooter').classList.remove('hidden');
        document.getElementById('modalResultFooter').classList.add('hidden');
        document.getElementById('btnSubmitTest').classList.add('hidden');
        renderCurrentQuestion();
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        openPracticeModal();
      });
    }
  }

  function openPracticeModal() {
    const modal = document.getElementById('practiceModal');
    const subjectFilter = (document.getElementById('practiceSubjectSelect') || {}).value || 'all';
    const lengthVal = parseInt((document.getElementById('practiceLengthSelect') || {}).value || '30', 10);

    // Filter questions
    let pool = [...QUESTION_BANK];
    if (subjectFilter !== 'all') {
      pool = pool.filter(q => q.subject === subjectFilter);
      if (pool.length === 0) pool = [...QUESTION_BANK];
    }

    // Shuffle
    pool.sort(() => Math.random() - 0.5);
    currentMockQuestions = pool.slice(0, Math.min(lengthVal, pool.length));
    currentQuestionIndex = 0;
    userAnswers = {};
    isReviewMode = false;

    // Reset views
    document.getElementById('modalQuizBody').classList.remove('hidden');
    document.getElementById('modalResultBody').classList.add('hidden');
    document.getElementById('modalQuizFooter').classList.remove('hidden');
    document.getElementById('modalResultFooter').classList.add('hidden');
    document.getElementById('btnSubmitTest').classList.remove('hidden');

    const badgeEl = document.getElementById('modalSubjectBadge');
    if (badgeEl) {
      badgeEl.textContent = subjectFilter === 'all' ? 'Full NET Mock' : `${subjectFilter.toUpperCase()} Practice`;
    }

    // Start Timer (54 seconds per question approx)
    testSecondsRemaining = currentMockQuestions.length * 60;
    startTestTimer();

    renderCurrentQuestion();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function startTestTimer() {
    clearInterval(testTimerInterval);
    const digitsEl = document.getElementById('modalTimerDigits');

    const updateTimerDisplay = () => {
      const mins = Math.floor(testSecondsRemaining / 60);
      const secs = testSecondsRemaining % 60;
      if (digitsEl) {
        digitsEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    };

    updateTimerDisplay();

    testTimerInterval = setInterval(() => {
      if (testSecondsRemaining > 0) {
        testSecondsRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(testTimerInterval);
        showToast('⏰ Time is up! Submitting your test automatically.', 'warning');
        finishPracticeTest();
      }
    }, 1000);
  }

  function renderCurrentQuestion() {
    if (!currentMockQuestions.length) return;
    const q = currentMockQuestions[currentQuestionIndex];
    const total = currentMockQuestions.length;

    // Meta elements
    const numPill = document.getElementById('modalQNum');
    const subjPill = document.getElementById('modalQSubject');
    const textEl = document.getElementById('modalQText');
    const optionsEl = document.getElementById('modalQOptions');
    const progressFill = document.getElementById('modalProgressBar');
    const prevBtn = document.getElementById('btnPrevQ');
    const nextBtn = document.getElementById('btnNextQ');
    const expEl = document.getElementById('modalQExplanation');

    if (numPill) numPill.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
    if (subjPill) subjPill.textContent = q.subjectLabel || 'NUST NET';
    if (textEl) textEl.textContent = q.question;
    if (progressFill) progressFill.style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;

    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    if (nextBtn) nextBtn.disabled = currentQuestionIndex === total - 1;

    // Render options
    if (optionsEl) {
      optionsEl.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const optDiv = document.createElement('div');
        optDiv.className = 'q-option-item';
        const isSelected = userAnswers[currentQuestionIndex] === idx;
        if (isSelected) optDiv.classList.add('selected');

        if (isReviewMode) {
          if (idx === q.correct) optDiv.classList.add('correct');
          if (isSelected && idx !== q.correct) optDiv.classList.add('wrong');
        }

        const indicator = document.createElement('span');
        indicator.className = 'q-opt-indicator';
        indicator.textContent = String.fromCharCode(65 + idx);

        const textSpan = document.createElement('span');
        textSpan.textContent = opt;

        optDiv.appendChild(indicator);
        optDiv.appendChild(textSpan);

        if (!isReviewMode) {
          optDiv.addEventListener('click', () => {
            userAnswers[currentQuestionIndex] = idx;
            renderCurrentQuestion();
          });
        }

        optionsEl.appendChild(optDiv);
      });
    }

    // Explanation in review mode
    if (expEl) {
      if (isReviewMode) {
        expEl.classList.remove('hidden');
        expEl.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
      } else {
        expEl.classList.add('hidden');
      }
    }
  }

  function finishPracticeTest() {
    clearInterval(testTimerInterval);
    const total = currentMockQuestions.length;
    let score = 0;
    const subjectBreakdown = {};

    currentMockQuestions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      const subj = q.subjectLabel || 'General';
      if (!subjectBreakdown[subj]) subjectBreakdown[subj] = { correct: 0, total: 0 };
      subjectBreakdown[subj].total++;

      if (userAns === q.correct) {
        score++;
        subjectBreakdown[subj].correct++;
      }
    });

    const percentage = Math.round((score / total) * 100);

    // Save test result to localStorage
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTS_HISTORY)) || [];
      history.push({
        date: new Date().toISOString(),
        score,
        total,
        percentage
      });
      localStorage.setItem(STORAGE_KEYS.TESTS_HISTORY, JSON.stringify(history));
    } catch (e) {}

    // Update result view
    document.getElementById('modalQuizBody').classList.add('hidden');
    document.getElementById('modalResultBody').classList.remove('hidden');
    document.getElementById('modalQuizFooter').classList.add('hidden');
    document.getElementById('modalResultFooter').classList.remove('hidden');

    const scoreNumEl = document.getElementById('resultScoreNum');
    const scorePctEl = document.getElementById('resultScorePct');
    const feedbackEl = document.getElementById('resultFeedbackText');
    const breakdownGrid = document.getElementById('resultBreakdownGrid');

    if (scoreNumEl) scoreNumEl.textContent = `${score} / ${total}`;
    if (scorePctEl) scorePctEl.textContent = `${percentage}% Accuracy`;

    if (feedbackEl) {
      if (percentage >= 80) {
        feedbackEl.textContent = '🌟 Outstanding! You are performing in the top 5% merit bracket for SEECS / NUST Engineering programs!';
      } else if (percentage >= 60) {
        feedbackEl.textContent = '👍 Good attempt! Target 160+ marks by eliminating minor errors in Calculus and Mechanics formulas.';
      } else {
        feedbackEl.textContent = '📚 Keep practicing! Focus on high-yield topic formulas and speed time management to boost your aggregate.';
      }
    }

    if (breakdownGrid) {
      breakdownGrid.innerHTML = '';
      Object.keys(subjectBreakdown).forEach(subj => {
        const item = subjectBreakdown[subj];
        const chip = document.createElement('div');
        chip.className = 'res-subj-chip';
        chip.innerHTML = `
          <div class="res-subj-name">${subj}</div>
          <div class="res-subj-score">${item.correct} / ${item.total}</div>
        `;
        breakdownGrid.appendChild(chip);
      });
    }

    // Refresh overall analytics tracker
    if (typeof refreshProgressTracker === 'function') {
      refreshProgressTracker();
    }
  }

  // ==========================================================================
  // 8. Smart Scientific Calculator
  // ==========================================================================
  function initCalculator() {
    const calcDisplay = document.getElementById('calcDisplay');
    const calcHistory = document.getElementById('calcHistory');
    const keys = document.querySelectorAll('.calc-btn');

    if (!calcDisplay) return;

    let currentExpression = '0';
    let historyExpression = '';

    keys.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        const action = btn.getAttribute('data-action');

        if (val !== null) {
          handleInput(val);
        } else if (action) {
          handleAction(action);
        }
      });
    });

    function handleInput(val) {
      if (currentExpression === '0' && val !== '.') {
        currentExpression = val;
      } else {
        currentExpression += val;
      }
      updateDisplay();
    }

    function handleAction(action) {
      switch (action) {
        case 'clear':
          currentExpression = '0';
          historyExpression = '';
          break;
        case 'backspace':
          if (currentExpression.length > 1) {
            currentExpression = currentExpression.slice(0, -1);
          } else {
            currentExpression = '0';
          }
          break;
        case 'add':
          appendOperator('+');
          break;
        case 'subtract':
          appendOperator('-');
          break;
        case 'multiply':
          appendOperator('*');
          break;
        case 'divide':
          appendOperator('/');
          break;
        case 'bracket-open':
          if (currentExpression === '0') currentExpression = '(';
          else currentExpression += '(';
          break;
        case 'bracket-close':
          currentExpression += ')';
          break;
        case 'sin':
          applyMathFn('sin');
          break;
        case 'cos':
          applyMathFn('cos');
          break;
        case 'tan':
          applyMathFn('tan');
          break;
        case 'sqrt':
          applyMathFn('sqrt');
          break;
        case 'pow':
          currentExpression += '^';
          break;
        case 'log':
          applyMathFn('log');
          break;
        case 'pi':
          if (currentExpression === '0') currentExpression = Math.PI.toFixed(4);
          else currentExpression += Math.PI.toFixed(4);
          break;
        case 'percent':
          evaluatePercent();
          break;
        case 'equals':
          calculateResult();
          break;
      }
      updateDisplay();
    }

    function appendOperator(op) {
      const lastChar = currentExpression.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1) + op;
      } else {
        currentExpression += op;
      }
    }

    function applyMathFn(fn) {
      try {
        const num = parseFloat(evalSafe(currentExpression));
        if (isNaN(num)) return;
        let res = 0;
        if (fn === 'sin') res = Math.sin((num * Math.PI) / 180);
        if (fn === 'cos') res = Math.cos((num * Math.PI) / 180);
        if (fn === 'tan') res = Math.tan((num * Math.PI) / 180);
        if (fn === 'sqrt') res = Math.sqrt(num);
        if (fn === 'log') res = Math.log10(num);

        historyExpression = `${fn}(${num})`;
        currentExpression = parseFloat(res.toFixed(6)).toString();
      } catch (e) {
        currentExpression = 'Error';
      }
    }

    function evaluatePercent() {
      try {
        const num = parseFloat(evalSafe(currentExpression));
        currentExpression = (num / 100).toString();
      } catch (e) {
        currentExpression = 'Error';
      }
    }

    function calculateResult() {
      try {
        historyExpression = currentExpression + ' =';
        const sanitized = currentExpression.replace(/\^/g, '**');
        const res = evalSafe(sanitized);
        currentExpression = parseFloat(Number(res).toFixed(6)).toString();
      } catch (e) {
        currentExpression = 'Error';
      }
    }

    function evalSafe(expr) {
      // Safe arithmetic evaluator
      const cleanExpr = expr.replace(/[^0-9+\-*/().^eE]/g, '');
      return Function(`'use strict'; return (${cleanExpr})`)();
    }

    function updateDisplay() {
      if (calcDisplay) calcDisplay.textContent = currentExpression;
      if (calcHistory) calcHistory.textContent = historyExpression;
    }
  }

  // ==========================================================================
  // 9. Study Pomodoro Focus Timer
  // ==========================================================================
  function initPomodoroTimer() {
    const displayEl = document.getElementById('timerDisplay');
    const subStatusEl = document.getElementById('timerSubStatus');
    const startBtn = document.getElementById('btnTimerStart');
    const pauseBtn = document.getElementById('btnTimerPause');
    const resetBtn = document.getElementById('btnTimerReset');
    const modeTabs = document.querySelectorAll('.timer-tab');
    const progressRing = document.getElementById('timerProgressRing');
    const modeLabel = document.getElementById('timerModeLabel');
    const sessionCountEl = document.getElementById('timerSessionCount');
    const totalMinutesEl = document.getElementById('timerTotalMinutes');

    if (!displayEl) return;

    let currentDurationMins = 25;
    let secondsLeft = currentDurationMins * 60;
    let timerRunning = false;
    let timerInterval = null;
    const RING_CIRCUMFERENCE = 553; // 2 * π * 88

    // Load saved timer stats
    let stats = { sessions: 0, totalMins: 0 };
    try {
      stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.TIMER_STATS)) || stats;
    } catch (e) {}

    const updateStatsUI = () => {
      if (sessionCountEl) sessionCountEl.textContent = stats.sessions;
      if (totalMinutesEl) totalMinutesEl.textContent = `${stats.totalMins}m`;
    };
    updateStatsUI();

    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (timerRunning) return;
        modeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentDurationMins = parseInt(tab.getAttribute('data-time'), 10) || 25;
        secondsLeft = currentDurationMins * 60;
        const modeName = tab.textContent;
        if (modeLabel) modeLabel.textContent = modeName;
        updateTimerDisplay();
        updateProgressRing();
      });
    });

    function updateTimerDisplay() {
      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      displayEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateProgressRing() {
      if (!progressRing) return;
      const totalSeconds = currentDurationMins * 60;
      const progressFraction = (totalSeconds - secondsLeft) / totalSeconds;
      const offset = RING_CIRCUMFERENCE - (progressFraction * RING_CIRCUMFERENCE);
      progressRing.style.strokeDashoffset = offset;
    }

    function startTimer() {
      if (timerRunning) return;
      timerRunning = true;
      if (subStatusEl) subStatusEl.textContent = 'Focus in progress...';

      timerInterval = setInterval(() => {
        if (secondsLeft > 0) {
          secondsLeft--;
          updateTimerDisplay();
          updateProgressRing();
        } else {
          clearInterval(timerInterval);
          timerRunning = false;
          playCompletionChime();
          showToast('🎉 Focus session completed! Take a short mental break.', 'success');

          stats.sessions++;
          stats.totalMins += currentDurationMins;
          try {
            localStorage.setItem(STORAGE_KEYS.TIMER_STATS, JSON.stringify(stats));
          } catch (e) {}
          updateStatsUI();

          if (subStatusEl) subStatusEl.textContent = 'Session Complete!';
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      if (subStatusEl) subStatusEl.textContent = 'Session Paused';
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      secondsLeft = currentDurationMins * 60;
      updateTimerDisplay();
      updateProgressRing();
      if (subStatusEl) subStatusEl.textContent = 'Ready to Focus';
    }

    function playCompletionChime() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch (e) {}
    }

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    updateTimerDisplay();
    updateProgressRing();
  }

  // ==========================================================================
  // 10. Overall Study Progress Tracker (Readiness Score)
  // ==========================================================================
  function initProgressTracker() {
    window.refreshProgressTracker = function () {
      const readinessEl = document.getElementById('metricReadiness');
      const topicsEl = document.getElementById('metricTopicsDone');
      const testsEl = document.getElementById('metricTestsTaken');
      const avgScoreEl = document.getElementById('metricAvgScore');

      let history = [];
      try {
        history = JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTS_HISTORY)) || [];
      } catch (e) {}

      let goalsCompleted = 0;
      try {
        const goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || {};
        goalsCompleted = Object.values(goals).filter(Boolean).length;
      } catch (e) {}

      const totalTests = history.length;
      let sumPct = 0;
      history.forEach(item => sumPct += item.percentage);
      const avgPct = totalTests > 0 ? Math.round(sumPct / totalTests) : 0;

      // Simulated topics progress based on goals & tests
      const topicsCovered = Math.min(44, (totalTests * 4) + (goalsCompleted * 3));
      const readinessScore = Math.min(100, Math.round((avgPct * 0.6) + ((topicsCovered / 44) * 40)));

      if (readinessEl) readinessEl.textContent = `${readinessScore}%`;
      if (topicsEl) topicsEl.textContent = `${topicsCovered} / 44`;
      if (testsEl) testsEl.textContent = totalTests.toString();
      if (avgScoreEl) avgScoreEl.textContent = `${avgPct}%`;
    };

    window.refreshProgressTracker();

    const resetBtn = document.getElementById('btnResetProgress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your local mock test history and progress stats?')) {
          localStorage.removeItem(STORAGE_KEYS.TESTS_HISTORY);
          localStorage.removeItem(STORAGE_KEYS.TIMER_STATS);
          localStorage.removeItem(STORAGE_KEYS.GOALS);
          window.refreshProgressTracker();
          showToast('History reset successfully.', 'info');
        }
      });
    }
  }

  // ==========================================================================
  // 11. FAQ Accordion
  // ==========================================================================
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for single-open accordion feel
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const btn = otherItem.querySelector('.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  // ==========================================================================
  // 12. Floating Back-to-Top Button
  // ==========================================================================
  function initBackToTop() {
    const btn = document.getElementById('btnBackTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 13. Toast Notification Helper
  // ==========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'success') toast.style.borderLeftColor = 'var(--nust-emerald)';
    if (type === 'warning') toast.style.borderLeftColor = 'var(--nust-gold)';
    if (type === 'error') toast.style.borderLeftColor = 'var(--danger)';

    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3800);
  }

})();
