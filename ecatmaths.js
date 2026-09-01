/**
 * MathSecat — Mathematics Learning Hub & Chapter Dashboard Engine
 * Version: 2.0.0 (Academic & SECAT Examination Standard)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Centralized 15 Mathematics Chapters Definition
     ========================================================================== */
  const CHAPTERS_DATA = [
    {
      id: 'algebra',
      number: 1,
      code: 'Ch 01',
      title: 'Algebra & Algebraic Expressions',
      description: 'Polynomial operations, factor theorem, algebraic identities, simplification of rational expressions, and expansion techniques.',
      category: 'Pure Algebra',
      difficulty: 'Beginner',
      glyph: 'x²',
      lessonsTotal: 8,
      questionsTotal: 45,
      estimatedTime: '2.5 hrs',
      topics: ['Polynomials', 'Factorization', 'Special Products', 'Algebraic Identities'],
      existingPage: 'algebra.html',
      defaultProgress: 100,
      defaultSolved: 45,
      defaultCorrect: 42
    },
    {
      id: 'linear-equations',
      number: 2,
      code: 'Ch 02',
      title: 'Linear Equations & Inequalities',
      description: 'Single and multi-variable linear equations, absolute value equations, compound linear inequalities, and graphical solutions.',
      category: 'Pure Algebra',
      difficulty: 'Beginner',
      glyph: 'ax+b',
      lessonsTotal: 7,
      questionsTotal: 40,
      estimatedTime: '2.0 hrs',
      topics: ['Simultaneous Equations', 'Inequalities', 'Absolute Value', 'Interval Notation'],
      existingPage: 'linear-equations.html',
      defaultProgress: 100,
      defaultSolved: 40,
      defaultCorrect: 36
    },
    {
      id: 'quadratic-equations',
      number: 3,
      code: 'Ch 03',
      title: 'Quadratic Equations',
      description: 'Factoring method, completing the square, quadratic formula, discriminant nature of roots, and relations between roots and coefficients.',
      category: 'Pure Algebra',
      difficulty: 'Intermediate',
      glyph: 'Δ=b²',
      lessonsTotal: 9,
      questionsTotal: 50,
      estimatedTime: '3.0 hrs',
      topics: ['Quadratic Formula', 'Discriminant', 'Nature of Roots', 'Equations Reducible to Quadratic'],
      existingPage: 'quadratic-equations.html',
      defaultProgress: 100,
      defaultSolved: 50,
      defaultCorrect: 44
    },
    {
      id: 'functions',
      number: 4,
      code: 'Ch 04',
      title: 'Functions',
      description: 'Domain and range determinations, composite functions, inverse functions, piecewise definitions, and transformation of graphs.',
      category: 'Pure Algebra',
      difficulty: 'Intermediate',
      glyph: 'f(x)',
      lessonsTotal: 8,
      questionsTotal: 42,
      estimatedTime: '2.5 hrs',
      topics: ['Domain & Range', 'Composite Functions', 'Inverse Functions', 'Graph Transformations'],
      existingPage: 'functions.html',
      defaultProgress: 100,
      defaultSolved: 42,
      defaultCorrect: 37
    },
    {
      id: 'sequences-series',
      number: 5,
      code: 'Ch 05',
      title: 'Sequences & Series',
      description: 'Arithmetic Progressions (AP), Geometric Progressions (GP), Harmonic Progressions (HP), infinite series sums, and sigma notation.',
      category: 'Pure Algebra',
      difficulty: 'Intermediate',
      glyph: '∑aₙ',
      lessonsTotal: 8,
      questionsTotal: 48,
      estimatedTime: '2.8 hrs',
      topics: ['Arithmetic Progressions', 'Geometric Series', 'Infinite Sums', 'Means (AM/GM/HM)'],
      existingPage: 'sequences-series.html',
      defaultProgress: 100,
      defaultSolved: 48,
      defaultCorrect: 41
    },
    {
      id: 'percentages-ratios',
      number: 6,
      code: 'Ch 06',
      title: 'Percentages, Ratios & Proportions',
      description: 'Direct and inverse proportions, compound variations, percentage increase/decrease, unitary methods, and partnership shares.',
      category: 'Arithmetic & Commercial',
      difficulty: 'Beginner',
      glyph: 'a:b',
      lessonsTotal: 8,
      questionsTotal: 45,
      estimatedTime: '2.2 hrs',
      topics: ['Direct/Inverse Ratio', 'Percentage Variation', 'Unitary Method', 'Partnership Proportions'],
      existingPage: 'percentages-ratios.html',
      defaultProgress: 45,
      defaultSolved: 20,
      defaultCorrect: 18
    },
    {
      id: 'profit-loss-discount',
      number: 7,
      code: 'Ch 07',
      title: 'Profit, Loss & Discount',
      description: 'Cost price, selling price, marked price, trade discount, successive discounts, markup calculations, and commercial arithmetic.',
      category: 'Arithmetic & Commercial',
      difficulty: 'Beginner',
      glyph: '%±',
      lessonsTotal: 6,
      questionsTotal: 35,
      estimatedTime: '1.8 hrs',
      topics: ['Cost & Selling Price', 'Marked Price', 'Successive Discounts', 'Break-even Analysis'],
      existingPage: 'profit-loss-discount.html',
      defaultProgress: 20,
      defaultSolved: 7,
      defaultCorrect: 6
    },
    {
      id: 'number-system',
      number: 8,
      code: 'Ch 08',
      title: 'Number System',
      description: 'Real & complex numbers, prime factorization, GCD/LCM properties, divisibility rules, remainders, and modular arithmetic.',
      category: 'Discrete & Arithmetic',
      difficulty: 'Beginner',
      glyph: 'ℝ|ℂ',
      lessonsTotal: 7,
      questionsTotal: 38,
      estimatedTime: '2.0 hrs',
      topics: ['Prime Factorization', 'GCD & LCM', 'Divisibility Rules', 'Modular Remainders'],
      existingPage: 'number-system.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'exponents-powers-logarithms',
      number: 9,
      code: 'Ch 09',
      title: 'Exponents, Powers & Logarithms',
      description: 'Laws of indices, scientific notation, logarithmic laws, base changes, exponential equations, and natural logarithms (ln).',
      category: 'Pure Algebra',
      difficulty: 'Intermediate',
      glyph: 'logₐ',
      lessonsTotal: 8,
      questionsTotal: 44,
      estimatedTime: '2.6 hrs',
      topics: ['Laws of Indices', 'Logarithmic Identities', 'Change of Base', 'Exponential Equations'],
      existingPage: 'exponents-powers-logarithms.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'geometry',
      number: 10,
      code: 'Ch 10',
      title: 'Geometry',
      description: 'Triangles, parallel lines, polygons, circle theorems (chords, tangents, cyclic quadrilaterals), perimeter, area, and volume of solids.',
      category: 'Geometry & Trig',
      difficulty: 'Intermediate',
      glyph: '∠θ',
      lessonsTotal: 10,
      questionsTotal: 55,
      estimatedTime: '3.5 hrs',
      topics: ['Circle Theorems', 'Triangle Congruence', 'Similar Figures', 'Mensuration 3D'],
      existingPage: 'geometry.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'coordinate-geometry',
      number: 11,
      code: 'Ch 11',
      title: 'Coordinate Geometry',
      description: 'Distance formula, midpoint, slope of a line, parallel/perpendicular conditions, equations of straight lines, and circle equations.',
      category: 'Geometry & Trig',
      difficulty: 'Intermediate',
      glyph: '(x,y)',
      lessonsTotal: 8,
      questionsTotal: 45,
      estimatedTime: '2.8 hrs',
      topics: ['Line Equations', 'Slope & Intercept', 'Distance & Section Formula', 'Circles in Cartesian Plane'],
      existingPage: 'coordinate-geometry.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'trigonometry',
      number: 12,
      code: 'Ch 12',
      title: 'Trigonometry',
      description: 'Trigonometric ratios, unit circle, standard angles, Pythagorean identities, compound angle formulas, double angle, and heights & distances.',
      category: 'Geometry & Trig',
      difficulty: 'Advanced',
      glyph: 'sin θ',
      lessonsTotal: 10,
      questionsTotal: 60,
      estimatedTime: '3.8 hrs',
      topics: ['Trigonometric Ratios', 'Pythagorean Identities', 'Compound Angles', 'Heights & Distances'],
      existingPage: 'trigonometry.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'permutations-combinations',
      number: 13,
      code: 'Ch 13',
      title: 'Permutations & Combinations',
      description: 'Fundamental counting principle, factorial notation, circular permutations, selection formulas (nCr), and arrangement formulas (nPr).',
      category: 'Discrete & Probability',
      difficulty: 'Advanced',
      glyph: 'ⁿCᵣ',
      lessonsTotal: 8,
      questionsTotal: 50,
      estimatedTime: '3.0 hrs',
      topics: ['Fundamental Counting', 'Arrangements (nPr)', 'Combinations (nCr)', 'Restricted Selections'],
      existingPage: 'permutations-combinations.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'probability',
      number: 14,
      code: 'Ch 14',
      title: 'Probability',
      description: 'Sample space, classical probability, independent vs dependent events, conditional probability, Bayes rule basics, and tree diagrams.',
      category: 'Discrete & Probability',
      difficulty: 'Advanced',
      glyph: 'P(A)',
      lessonsTotal: 8,
      questionsTotal: 46,
      estimatedTime: '2.7 hrs',
      topics: ['Sample Space', 'Addition Rule', 'Conditional Probability', 'Independent Events'],
      existingPage: 'probability.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    },
    {
      id: 'word-problems',
      number: 15,
      code: 'Ch 15',
      title: 'Word Problems & Quantitative Reasoning',
      description: 'Speed-Distance-Time, work-rate problems, age problems, mixture/alligation scenarios, clock problems, and analytical data reasoning.',
      category: 'Quantitative Reasoning',
      difficulty: 'Advanced',
      glyph: 'd=vt',
      lessonsTotal: 9,
      questionsTotal: 55,
      estimatedTime: '3.4 hrs',
      topics: ['Time & Work', 'Speed, Distance & Relative Motion', 'Mixtures & Alligation', 'Age & Rate Problems'],
      existingPage: 'word-problems.html',
      defaultProgress: 0,
      defaultSolved: 0,
      defaultCorrect: 0
    }
  ];

  /* Formula Reference Data for Modal */
  const FORMULA_DATABASE = {
    algebra: [
      { name: 'Quadratic Formula', code: 'x = (-b ± √(b² - 4ac)) / (2a)' },
      { name: 'Discriminant (Nature of Roots)', code: 'Δ = b² - 4ac (Δ > 0: Real & Distinct, Δ = 0: Equal, Δ < 0: Complex)' },
      { name: 'Difference of Squares', code: 'a² - b² = (a - b)(a + b)' },
      { name: 'Sum & Difference of Cubes', code: 'a³ ± b³ = (a ± b)(a² ∓ ab + b²)' },
      { name: 'Arithmetic Progression (nth Term)', code: 'aₙ = a₁ + (n - 1)d' },
      { name: 'Arithmetic Series (Sum of n Terms)', code: 'Sₙ = n/2 · [2a₁ + (n - 1)d] = n/2 · (a₁ + aₙ)' },
      { name: 'Geometric Progression (nth Term)', code: 'aₙ = a₁ · r^(n - 1)' },
      { name: 'Infinite Geometric Series Sum', code: 'S_∞ = a₁ / (1 - r)  for |r| < 1' }
    ],
    geometry: [
      { name: 'Distance Formula (2D)', code: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]' },
      { name: 'Slope of Line', code: 'm = (y₂ - y₁) / (x₂ - x₁)' },
      { name: 'Point-Slope Form', code: 'y - y₁ = m(x - x₁)' },
      { name: 'Perpendicular Lines Condition', code: 'm₁ · m₂ = -1' },
      { name: 'Pythagorean Identity', code: 'sin²θ + cos²θ = 1' },
      { name: 'Secant-Tangent Identity', code: '1 + tan²θ = sec²θ' },
      { name: 'Double Angle Sine', code: 'sin(2θ) = 2 sinθ cosθ' },
      { name: 'Double Angle Cosine', code: 'cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ' }
    ],
    arithmetic: [
      { name: 'Percentage Change', code: '% Change = ((New - Original) / Original) × 100%' },
      { name: 'Profit Percentage', code: 'Profit % = (Profit / Cost Price) × 100%' },
      { name: 'Selling Price with Markup', code: 'SP = CP × (1 + Profit% / 100)' },
      { name: 'Successive Discounts (d₁, d₂)', code: 'Single Equivalent Discount = d₁ + d₂ - (d₁ × d₂) / 100' },
      { name: 'Compound Interest', code: 'A = P(1 + r/n)^(nt)' },
      { name: 'Speed, Distance, Time', code: 'Distance = Speed × Time  |  Average Speed = Total Distance / Total Time' }
    ],
    probability: [
      { name: 'Permutation Formula (Order matters)', code: 'ⁿPᵣ = n! / (n - r)!' },
      { name: 'Combination Formula (Order does not matter)', code: 'ⁿCᵣ = n! / [r! · (n - r)!]' },
      { name: 'Classical Probability', code: 'P(E) = n(E) / n(S)' },
      { name: 'Addition Rule for Probability', code: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)' },
      { name: 'Independent Events Multiplication', code: 'P(A ∩ B) = P(A) · P(B)' },
      { name: 'Conditional Probability', code: 'P(A | B) = P(A ∩ B) / P(B)' }
    ]
  };

  /* Daily Challenge Questions pool */
  const DAILY_CHALLENGES = [
    {
      question: 'If 3^(x+1) - 3^x = 18, what is the exact value of x?',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
      correctIndex: 1, // x = 2 -> 3^3 - 3^2 = 27 - 9 = 18
      explanation: 'Factor out 3^x: 3^x (3 - 1) = 18  =>  2 · 3^x = 18  =>  3^x = 9 = 3^2  =>  x = 2.'
    },
    {
      question: 'The roots of x² - 7x + 12 = 0 are α and β. What is the value of α² + β²?',
      options: ['25', '37', '49', '14'],
      correctIndex: 0, // (7)^2 - 2(12) = 49 - 24 = 25
      explanation: 'α + β = 7, αβ = 12. α² + β² = (α + β)² - 2αβ = 49 - 24 = 25.'
    },
    {
      question: 'In how many different ways can 5 distinct books be arranged on a shelf?',
      options: ['24', '60', '120', '720'],
      correctIndex: 2, // 5! = 120
      explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120 distinct ways.'
    }
  ];

  /* Storage Key Namespace */
  const STORAGE_KEYS = {
    PROGRESS: 'mathsecat_progress',
    STREAK: 'mathsecat_streak',
    ACTIVITY: 'mathsecat_recent_activity',
    CHALLENGE: 'mathsecat_daily_challenge',
    PREFERENCES: 'mathsecat_user_preferences'
  };

  /* Application State */
  const state = {
    chapters: [],
    searchQuery: '',
    statusFilter: 'all',
    difficultyFilter: 'all',
    sortBy: 'number-asc',
    streak: { count: 7, lastActiveDate: new Date().toISOString().split('T')[0] },
    activities: [],
    dailyChallenge: null
  };

  /* ==========================================================================
     2. Storage & State Initialization
     ========================================================================== */
  function loadStorageData() {
    try {
      // 1. Chapter Progress
      const storedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      let progressMap = {};
      if (storedProgress) {
        try {
          progressMap = JSON.parse(storedProgress);
        } catch (e) {
          console.warn('Invalid mathsecat_progress stored, re-seeding default');
        }
      }

      // Initialize chapter state merging with default progression
      state.chapters = CHAPTERS_DATA.map((ch) => {
        const saved = progressMap[ch.id];
        const progress = (saved && typeof saved.progress === 'number') ? saved.progress : ch.defaultProgress;
        const solved = (saved && typeof saved.solvedQuestions === 'number') ? saved.solvedQuestions : ch.defaultSolved;
        const correct = (saved && typeof saved.correctQuestions === 'number') ? saved.correctQuestions : ch.defaultCorrect;
        
        let status = 'not-started';
        if (progress >= 100) {
          status = 'completed';
        } else if (progress > 0) {
          status = 'in-progress';
        }

        return {
          ...ch,
          progress,
          solvedQuestions: solved,
          correctQuestions: correct,
          status
        };
      });

      // 2. Streak
      const storedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (storedStreak) {
        try {
          state.streak = JSON.parse(storedStreak);
        } catch (e) {
          state.streak = { count: 7, lastActiveDate: new Date().toISOString().split('T')[0] };
        }
      } else {
        saveStreak(state.streak);
      }

      // 3. Recent Activity
      const storedActivity = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      if (storedActivity) {
        try {
          state.activities = JSON.parse(storedActivity);
        } catch (e) {
          state.activities = [];
        }
      } else {
        // Seed initial default realistic activity
        state.activities = [
          {
            id: 'act-1',
            chapterId: 'percentages-ratios',
            chapterTitle: 'Percentages, Ratios & Proportions',
            type: 'study',
            desc: 'Completed Lesson 4: Compound Variations & Ratios',
            timestamp: 'Today, 2:15 PM'
          },
          {
            id: 'act-2',
            chapterId: 'sequences-series',
            chapterTitle: 'Sequences & Series',
            type: 'completed',
            desc: 'Mastered 100% of Chapter Curriculum & Practice Test',
            timestamp: 'Yesterday'
          },
          {
            id: 'act-3',
            chapterId: 'quadratic-equations',
            chapterTitle: 'Quadratic Equations',
            type: 'quiz',
            desc: 'Scored 18/20 in Discriminant Nature of Roots Drill',
            timestamp: '2 days ago'
          }
        ];
        saveActivities(state.activities);
      }

      // 4. Daily Challenge State
      const todayStr = new Date().toISOString().split('T')[0];
      const storedChallenge = localStorage.getItem(STORAGE_KEYS.CHALLENGE);
      if (storedChallenge) {
        try {
          const parsed = JSON.parse(storedChallenge);
          if (parsed.date === todayStr) {
            state.dailyChallenge = parsed;
          } else {
            state.dailyChallenge = { date: todayStr, answered: false, selectedOption: null, isCorrect: false };
          }
        } catch (e) {
          state.dailyChallenge = { date: todayStr, answered: false, selectedOption: null, isCorrect: false };
        }
      } else {
        state.dailyChallenge = { date: todayStr, answered: false, selectedOption: null, isCorrect: false };
      }

    } catch (err) {
      console.error('Error initializing MathSecat storage data:', err);
    }
  }

  function saveProgress() {
    try {
      const progressMap = {};
      state.chapters.forEach((ch) => {
        progressMap[ch.id] = {
          progress: ch.progress,
          solvedQuestions: ch.solvedQuestions,
          correctQuestions: ch.correctQuestions,
          status: ch.status
        };
      });
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressMap));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }

  function saveStreak(streakObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streakObj));
    } catch (e) {}
  }

  function saveActivities(actList) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(actList.slice(0, 10)));
    } catch (e) {}
  }

  function saveChallenge(challengeObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGE, JSON.stringify(challengeObj));
    } catch (e) {}
  }

  function logActivity(chapter, desc, type = 'study') {
    const newAct = {
      id: 'act-' + Date.now(),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      type: type,
      desc: desc,
      timestamp: 'Just now'
    };
    state.activities.unshift(newAct);
    if (state.activities.length > 8) {
      state.activities.pop();
    }
    saveActivities(state.activities);
    renderActivityTimeline();
  }

  /* ==========================================================================
     3. Statistics Calculations
     ========================================================================== */
  function calculateMetrics() {
    const totalChapters = state.chapters.length;
    let completedCount = 0;
    let inProgressCount = 0;
    let notStartedCount = 0;
    let totalQuestionsSolved = 0;
    let totalQuestionsCorrect = 0;
    let progressSum = 0;

    state.chapters.forEach((ch) => {
      progressSum += ch.progress;
      totalQuestionsSolved += ch.solvedQuestions;
      totalQuestionsCorrect += ch.correctQuestions;

      if (ch.progress >= 100) {
        completedCount++;
      } else if (ch.progress > 0) {
        inProgressCount++;
      } else {
        notStartedCount++;
      }
    });

    const overallProgress = totalChapters > 0 ? Math.round(progressSum / totalChapters) : 0;
    const accuracyRate = totalQuestionsSolved > 0 ? Math.round((totalQuestionsCorrect / totalQuestionsSolved) * 100) : 85;

    return {
      totalChapters,
      completedCount,
      inProgressCount,
      notStartedCount,
      overallProgress,
      totalQuestionsSolved,
      accuracyRate,
      streakDays: state.streak.count
    };
  }

  /* ==========================================================================
     4. Rendering Functions
     ========================================================================== */

  // Update Dynamic Statistics Bar & Hero Progress
  function renderStatistics() {
    const stats = calculateMetrics();

    // 1. Hero radial progress
    const radialText = document.getElementById('overall-percent-text');
    const radialCircle = document.getElementById('overall-radial-circle');
    const heroDoneText = document.getElementById('hero-chapters-done-text');
    const heroStatusTag = document.getElementById('hero-status-tag');

    if (radialText) radialText.textContent = `${stats.overallProgress}%`;
    if (heroDoneText) heroDoneText.textContent = `${stats.completedCount} of ${stats.totalChapters} Chapters Completed`;
    
    if (radialCircle) {
      // Circumference = 2 * π * 50 ≈ 314.159
      const circumference = 2 * Math.PI * 50;
      const offset = circumference - (stats.overallProgress / 100) * circumference;
      radialCircle.style.strokeDashoffset = offset;
    }

    if (heroStatusTag) {
      if (stats.overallProgress === 100) {
        heroStatusTag.textContent = 'Curriculum Fully Mastered!';
      } else if (stats.overallProgress >= 50) {
        heroStatusTag.textContent = 'Excellent Momentum';
      } else {
        heroStatusTag.textContent = 'On Track for Excellence';
      }
    }

    // 2. Stats bar metrics
    const elTotal = document.getElementById('stat-total-chapters');
    const elCompleted = document.getElementById('stat-completed-chapters');
    const elCompletedSub = document.getElementById('stat-completed-percent');
    const elInProgress = document.getElementById('stat-inprogress-chapters');
    const elQuestions = document.getElementById('stat-questions-solved');
    const elAccuracy = document.getElementById('stat-accuracy-rate');
    const elStreak = document.getElementById('stat-streak-days');
    const elHeaderStreak = document.getElementById('header-streak-count');

    if (elTotal) elTotal.textContent = stats.totalChapters;
    if (elCompleted) elCompleted.textContent = stats.completedCount;
    if (elCompletedSub) elCompletedSub.textContent = `${Math.round((stats.completedCount / stats.totalChapters) * 100)}% of course`;
    if (elInProgress) elInProgress.textContent = stats.inProgressCount;
    if (elQuestions) elQuestions.textContent = stats.totalQuestionsSolved;
    if (elAccuracy) elAccuracy.textContent = `${stats.accuracyRate}%`;
    if (elStreak) elStreak.textContent = `${stats.streakDays} Days`;
    if (elHeaderStreak) elHeaderStreak.textContent = stats.streakDays;
  }

  // Continue Learning Logic: Find the best chapter to recommend
  function getRecommendedContinueChapter() {
    // 1. Check for any in-progress chapter with highest progress < 100%
    const inProgressChapters = state.chapters.filter((ch) => ch.progress > 0 && ch.progress < 100);
    if (inProgressChapters.length > 0) {
      // Return the one with highest progress (closest to completion) or first in line
      return inProgressChapters[0];
    }

    // 2. Check for the first not-started chapter
    const notStartedChapters = state.chapters.filter((ch) => ch.progress === 0);
    if (notStartedChapters.length > 0) {
      return notStartedChapters[0];
    }

    // 3. If all 100% complete, return Chapter 1 for revision
    return state.chapters[0];
  }

  function renderContinueLearningSection() {
    const chapter = getRecommendedContinueChapter();
    if (!chapter) return;

    const elCategory = document.getElementById('continue-chapter-category');
    const elNumber = document.getElementById('continue-chapter-number');
    const elTitle = document.getElementById('continue-chapter-title');
    const elDesc = document.getElementById('continue-chapter-desc');
    const elStatus = document.getElementById('continue-progress-status');
    const elVal = document.getElementById('continue-progress-val');
    const elFill = document.getElementById('continue-progress-fill');
    const elTags = document.getElementById('continue-topics-tags');
    const elLessonsStat = document.getElementById('continue-lessons-stat');
    const elTimeStat = document.getElementById('continue-time-stat');
    const btnOpen = document.getElementById('btn-open-continue-chapter');
    const heroBtnText = document.getElementById('hero-btn-text');

    if (elCategory) elCategory.textContent = chapter.category;
    if (elNumber) elNumber.textContent = chapter.code;
    if (elTitle) elTitle.textContent = chapter.title;
    if (elDesc) elDesc.textContent = chapter.description;
    
    let statusLabel = 'In Progress';
    if (chapter.progress === 0) statusLabel = 'Not Started';
    if (chapter.progress === 100) statusLabel = 'Completed • Ready for Review';
    
    if (elStatus) elStatus.textContent = `${statusLabel} • ${chapter.progress}% Complete`;
    if (elVal) elVal.textContent = `${chapter.progress}%`;
    if (elFill) elFill.style.width = `${chapter.progress}%`;

    if (elTags) {
      elTags.innerHTML = chapter.topics.map((t) => `<span class="topic-tag">${escapeHtml(t)}</span>`).join('');
    }

    const completedLessons = Math.round((chapter.progress / 100) * chapter.lessonsTotal);
    if (elLessonsStat) elLessonsStat.textContent = `${completedLessons}/${chapter.lessonsTotal}`;
    if (elTimeStat) elTimeStat.textContent = chapter.estimatedTime;

    if (heroBtnText) {
      heroBtnText.textContent = `Continue ${chapter.code}: ${chapter.title.split('&')[0].trim()}`;
    }

    // Set button click handler for direct chapter opening
    if (btnOpen) {
      btnOpen.onclick = function () {
        navigateToChapter(chapter);
      };
    }
  }

  // Render All 15 Chapter Cards with active search and filters
  function renderChaptersGrid() {
    const gridContainer = document.getElementById('chapters-grid-container');
    const emptyView = document.getElementById('empty-state-view');
    const countBadge = document.getElementById('visible-count');
    const btnResetFilters = document.getElementById('btn-reset-filters');

    if (!gridContainer) return;

    // Filter by Search Query
    let filtered = state.chapters.filter((ch) => {
      const q = state.searchQuery.trim().toLowerCase();
      if (!q) return true;

      const titleMatch = ch.title.toLowerCase().includes(q);
      const descMatch = ch.description.toLowerCase().includes(q);
      const catMatch = ch.category.toLowerCase().includes(q);
      const topicMatch = ch.topics.some((t) => t.toLowerCase().includes(q));
      const codeMatch = ch.code.toLowerCase().includes(q);

      return titleMatch || descMatch || catMatch || topicMatch || codeMatch;
    });

    // Filter by Status
    if (state.statusFilter !== 'all') {
      filtered = filtered.filter((ch) => ch.status === state.statusFilter);
    }

    // Filter by Difficulty
    if (state.difficultyFilter !== 'all') {
      filtered = filtered.filter((ch) => ch.difficulty.toLowerCase() === state.difficultyFilter.toLowerCase());
    }

    // Sort Results
    filtered.sort((a, b) => {
      if (state.sortBy === 'number-asc') return a.number - b.number;
      if (state.sortBy === 'progress-desc') return b.progress - a.progress;
      if (state.sortBy === 'progress-asc') return a.progress - b.progress;
      if (state.sortBy === 'difficulty-asc') {
        const diffWeight = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return (diffWeight[a.difficulty] || 2) - (diffWeight[b.difficulty] || 2);
      }
      if (state.sortBy === 'questions-desc') return b.questionsTotal - a.questionsTotal;
      return a.number - b.number;
    });

    // Update Counter & Reset Button
    if (countBadge) countBadge.textContent = filtered.length;
    
    const isFiltered = state.searchQuery || state.statusFilter !== 'all' || state.difficultyFilter !== 'all';
    if (btnResetFilters) {
      btnResetFilters.style.display = isFiltered ? 'inline-block' : 'none';
    }

    // Handle Empty State
    if (filtered.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyView) emptyView.style.display = 'flex';
      return;
    } else {
      if (emptyView) emptyView.style.display = 'none';
    }

    // Render HTML Cards
    gridContainer.innerHTML = filtered.map((ch) => {
      let statusClass = 'not-started';
      let statusDot = 'dot-notstarted';
      let fillClass = 'fill-notstarted';
      let statusLabel = 'Not Started';
      let actionBtnClass = 'btn-start-action';
      let actionBtnText = 'Start Chapter';

      if (ch.progress >= 100) {
        statusClass = 'completed';
        statusDot = 'dot-completed';
        fillClass = 'fill-completed';
        statusLabel = 'Completed (100%)';
        actionBtnClass = 'btn-success-action';
        actionBtnText = 'Review & Practice';
      } else if (ch.progress > 0) {
        statusClass = 'in-progress';
        statusDot = 'dot-inprogress';
        fillClass = 'fill-inprogress';
        statusLabel = `In Progress (${ch.progress}%)`;
        actionBtnClass = 'btn-primary-action';
        actionBtnText = 'Continue Learning';
      }

      const diffClass = `diff-${ch.difficulty.toLowerCase()}`;

      return `
        <article class="chapter-card ${statusClass}" id="card-${ch.id}" data-chapter-id="${ch.id}">
          
          <!-- Card Header -->
          <div class="chapter-card-header">
            <div class="chapter-badge-group">
              <span class="chapter-num-badge">${ch.code}</span>
              <span class="difficulty-pill ${diffClass}">${ch.difficulty}</span>
            </div>
            <div class="math-glyph-box" title="${escapeHtml(ch.category)}">${ch.glyph}</div>
          </div>

          <!-- Card Body -->
          <div class="chapter-card-body">
            <h3 class="chapter-card-title">${escapeHtml(ch.title)}</h3>
            <p class="chapter-card-desc">${escapeHtml(ch.description)}</p>
            
            <div class="topics-chips-list">
              ${ch.topics.slice(0, 3).map((t) => `<span class="topic-chip">${escapeHtml(t)}</span>`).join('')}
            </div>

            <!-- Progress Bar & Stats -->
            <div class="chapter-progress-section">
              <div class="chapter-prog-meta">
                <span class="prog-status-label">
                  <span class="status-dot ${statusDot}"></span>
                  <span>${statusLabel}</span>
                </span>
                <span class="prog-percent-text">${ch.progress}%</span>
              </div>
              
              <div class="chapter-prog-bar-track">
                <div class="chapter-prog-bar-fill ${fillClass}" style="width: ${ch.progress}%;"></div>
              </div>

              <div class="chapter-meta-details">
                <span>📚 ${ch.lessonsTotal} Lessons</span>
                <span>✏️ ${ch.questionsTotal} Questions</span>
                <span>⏱️ ${ch.estimatedTime}</span>
              </div>
            </div>
          </div>

          <!-- Card Footer CTA Button -->
          <div class="chapter-card-footer">
            <a 
              href="${escapeHtml(ch.existingPage)}" 
              class="chapter-action-btn ${actionBtnClass}" 
              data-nav-chapter="${ch.id}"
              id="btn-open-${ch.id}"
            >
              <span>${actionBtnText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </article>
      `;
    }).join('');

    // Attach Click Handlers to Chapter Links for analytics & activity tracking
    gridContainer.querySelectorAll('a[data-nav-chapter]').forEach((link) => {
      link.addEventListener('click', function (e) {
        const chId = this.getAttribute('data-nav-chapter');
        const chapter = state.chapters.find((c) => c.id === chId);
        if (chapter) {
          logActivity(chapter, `Opened chapter for study: ${chapter.title}`);
        }
      });
    });
  }

  // Render Activity Timeline
  function renderActivityTimeline() {
    const listEl = document.getElementById('activity-timeline-list');
    if (!listEl) return;

    if (state.activities.length === 0) {
      listEl.innerHTML = `
        <div class="activity-item">
          <div class="activity-item-left">
            <span class="act-dot"></span>
            <span class="act-desc">No recent study activity recorded. Start any chapter above to log progress.</span>
          </div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.activities.map((act) => `
      <div class="activity-item" id="${act.id}">
        <div class="activity-item-left">
          <span class="act-dot"></span>
          <div>
            <span class="act-chapter">${escapeHtml(act.chapterTitle)}</span>
            <span class="act-desc"> — ${escapeHtml(act.desc)}</span>
          </div>
        </div>
        <span class="act-time">${escapeHtml(act.timestamp)}</span>
      </div>
    `).join('');
  }

  // Daily Challenge Interaction
  function initDailyChallenge() {
    const challenge = DAILY_CHALLENGES[0];
    const qText = document.getElementById('challenge-question');
    const optsContainer = document.getElementById('challenge-options-container');
    const feedbackMsg = document.getElementById('challenge-feedback-msg');

    if (!qText || !optsContainer) return;

    qText.textContent = challenge.question;

    optsContainer.innerHTML = challenge.options.map((opt, idx) => `
      <button class="challenge-opt" data-opt-index="${idx}" id="opt-${idx}">${escapeHtml(opt)}</button>
    `).join('');

    // Restore state if answered today
    if (state.dailyChallenge && state.dailyChallenge.answered) {
      const selected = state.dailyChallenge.selectedOption;
      optsContainer.querySelectorAll('.challenge-opt').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === challenge.correctIndex) {
          btn.classList.add('correct');
        } else if (idx === selected) {
          btn.classList.add('incorrect');
        }
      });

      if (feedbackMsg) {
        feedbackMsg.style.display = 'block';
        if (state.dailyChallenge.isCorrect) {
          feedbackMsg.className = 'challenge-feedback success';
          feedbackMsg.innerHTML = `<strong>Correct! +20 XP earned.</strong> ${challenge.explanation}`;
        } else {
          feedbackMsg.className = 'challenge-feedback error';
          feedbackMsg.innerHTML = `<strong>Incorrect.</strong> ${challenge.explanation}`;
        }
      }
      return;
    }

    // Attach click listeners to options
    optsContainer.querySelectorAll('.challenge-opt').forEach((btn) => {
      btn.addEventListener('click', function () {
        const selectedIdx = parseInt(this.getAttribute('data-opt-index'), 10);
        const isCorrect = selectedIdx === challenge.correctIndex;

        state.dailyChallenge = {
          date: new Date().toISOString().split('T')[0],
          answered: true,
          selectedOption: selectedIdx,
          isCorrect: isCorrect
        };
        saveChallenge(state.dailyChallenge);

        optsContainer.querySelectorAll('.challenge-opt').forEach((b, idx) => {
          b.disabled = true;
          if (idx === challenge.correctIndex) {
            b.classList.add('correct');
          } else if (idx === selectedIdx) {
            b.classList.add('incorrect');
          }
        });

        if (feedbackMsg) {
          feedbackMsg.style.display = 'block';
          if (isCorrect) {
            feedbackMsg.className = 'challenge-feedback success';
            feedbackMsg.innerHTML = `<strong>Correct! +20 XP earned.</strong> ${challenge.explanation}`;
            showToast('Daily Challenge Completed! +20 XP', 'success');
          } else {
            feedbackMsg.className = 'challenge-feedback error';
            feedbackMsg.innerHTML = `<strong>Review:</strong> ${challenge.explanation}`;
            showToast('Daily Challenge Answered', 'info');
          }
        }
      });
    });
  }

  /* ==========================================================================
     5. Formula Sheet Modal
     ========================================================================== */
  function initFormulaModal() {
    const modal = document.getElementById('formula-modal-overlay');
    const btnOpen = document.getElementById('btn-quick-formula');
    const btnOpenQa = document.getElementById('qa-formula-sheet');
    const btnClose = document.getElementById('btn-close-formula-modal');
    const btnDismiss = document.getElementById('btn-dismiss-formula');
    const tabs = document.querySelectorAll('.formula-tab');
    const contentArea = document.getElementById('formula-tab-content');

    function renderTabContent(category) {
      const items = FORMULA_DATABASE[category] || FORMULA_DATABASE.algebra;
      contentArea.innerHTML = `
        <div class="formula-grid">
          ${items.map((item) => `
            <div class="formula-item-card">
              <span class="formula-name">${escapeHtml(item.name)}</span>
              <code class="formula-code">${escapeHtml(item.code)}</code>
            </div>
          `).join('')}
        </div>
      `;
    }

    function openModal() {
      if (modal) {
        modal.style.display = 'flex';
        renderTabContent('algebra');
      }
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnOpenQa) btnOpenQa.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        tabs.forEach((t) => t.classList.remove('active'));
        this.classList.add('active');
        const cat = this.getAttribute('data-tab');
        renderTabContent(cat);
      });
    });

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  /* ==========================================================================
     6. Settings & Data Simulation Modal
     ========================================================================== */
  function initSettingsModal() {
    const modal = document.getElementById('settings-modal-overlay');
    const btnOpen = document.getElementById('btn-settings-data');
    const btnClose = document.getElementById('btn-close-settings-modal');
    const btnSave = document.getElementById('btn-save-settings');
    const btnSeed = document.getElementById('btn-seed-progress');
    const btnCompleteAll = document.getElementById('btn-complete-all');
    const btnReset = document.getElementById('btn-reset-storage');

    function openModal() {
      if (modal) modal.style.display = 'flex';
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnSave) btnSave.addEventListener('click', closeModal);

    if (btnSeed) {
      btnSeed.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        loadStorageData();
        renderStatistics();
        renderContinueLearningSection();
        renderChaptersGrid();
        renderActivityTimeline();
        showToast('Loaded realistic progress preset (Ch 1-5 complete, Ch 6 active)', 'info');
        closeModal();
      });
    }

    if (btnCompleteAll) {
      btnCompleteAll.addEventListener('click', () => {
        state.chapters.forEach((ch) => {
          ch.progress = 100;
          ch.status = 'completed';
          ch.solvedQuestions = ch.questionsTotal;
          ch.correctQuestions = Math.round(ch.questionsTotal * 0.92);
        });
        saveProgress();
        renderStatistics();
        renderContinueLearningSection();
        renderChaptersGrid();
        showToast('All 15 chapters marked 100% complete', 'success');
        closeModal();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all MathSecat saved data?')) {
          localStorage.removeItem(STORAGE_KEYS.PROGRESS);
          localStorage.removeItem(STORAGE_KEYS.STREAK);
          localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
          localStorage.removeItem(STORAGE_KEYS.CHALLENGE);
          
          state.chapters.forEach((ch) => {
            ch.progress = 0;
            ch.status = 'not-started';
            ch.solvedQuestions = 0;
            ch.correctQuestions = 0;
          });
          state.streak = { count: 1, lastActiveDate: new Date().toISOString().split('T')[0] };
          state.activities = [];
          state.dailyChallenge = null;

          saveProgress();
          saveStreak(state.streak);
          renderStatistics();
          renderContinueLearningSection();
          renderChaptersGrid();
          renderActivityTimeline();
          initDailyChallenge();
          showToast('All progress reset to 0%', 'info');
          closeModal();
        }
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  /* ==========================================================================
     7. Search & Filter Event Handlers
     ========================================================================== */
  function initSearchAndFilters() {
    const mainSearchInput = document.getElementById('chapter-search-input');
    const headerSearchInput = document.getElementById('header-search-input');
    const mainClearBtn = document.getElementById('clear-search-btn');
    const headerClearBtn = document.getElementById('header-clear-search');
    const sortSelect = document.getElementById('chapter-sort-select');
    const resetFiltersBtn = document.getElementById('btn-reset-filters');
    const emptyResetBtn = document.getElementById('btn-empty-reset');

    function syncSearch(query) {
      state.searchQuery = query;
      if (mainSearchInput && mainSearchInput.value !== query) mainSearchInput.value = query;
      if (headerSearchInput && headerSearchInput.value !== query) headerSearchInput.value = query;

      if (mainClearBtn) mainClearBtn.style.display = query ? 'flex' : 'none';
      if (headerClearBtn) headerClearBtn.style.display = query ? 'flex' : 'none';

      renderChaptersGrid();
    }

    if (mainSearchInput) {
      mainSearchInput.addEventListener('input', (e) => syncSearch(e.target.value));
    }

    if (headerSearchInput) {
      headerSearchInput.addEventListener('input', (e) => syncSearch(e.target.value));
    }

    if (mainClearBtn) {
      mainClearBtn.addEventListener('click', () => syncSearch(''));
    }

    if (headerClearBtn) {
      headerClearBtn.addEventListener('click', () => syncSearch(''));
    }

    // Status Filter Pills
    const statusPills = document.querySelectorAll('#status-filters .filter-pill');
    statusPills.forEach((pill) => {
      pill.addEventListener('click', function () {
        statusPills.forEach((p) => p.classList.remove('active'));
        this.classList.add('active');
        state.statusFilter = this.getAttribute('data-filter-val');
        renderChaptersGrid();
      });
    });

    // Difficulty Filter Pills
    const diffPills = document.querySelectorAll('#difficulty-filters .filter-pill');
    diffPills.forEach((pill) => {
      pill.addEventListener('click', function () {
        diffPills.forEach((p) => p.classList.remove('active'));
        this.classList.add('active');
        state.difficultyFilter = this.getAttribute('data-filter-val');
        renderChaptersGrid();
      });
    });

    // Sort Dropdown
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sortBy = this.value;
        renderChaptersGrid();
      });
    }

    // Reset Filters Actions
    function resetAllFilters() {
      state.searchQuery = '';
      state.statusFilter = 'all';
      state.difficultyFilter = 'all';
      state.sortBy = 'number-asc';

      if (mainSearchInput) mainSearchInput.value = '';
      if (headerSearchInput) headerSearchInput.value = '';
      if (mainClearBtn) mainClearBtn.style.display = 'none';
      if (headerClearBtn) headerClearBtn.style.display = 'none';
      if (sortSelect) sortSelect.value = 'number-asc';

      statusPills.forEach((p) => p.classList.toggle('active', p.getAttribute('data-filter-val') === 'all'));
      diffPills.forEach((p) => p.classList.toggle('active', p.getAttribute('data-filter-val') === 'all'));

      renderChaptersGrid();
    }

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

    // Hero Continue Button
    const heroBtnContinue = document.getElementById('hero-btn-continue');
    if (heroBtnContinue) {
      heroBtnContinue.addEventListener('click', () => {
        const recChapter = getRecommendedContinueChapter();
        if (recChapter) navigateToChapter(recChapter);
      });
    }

    // Quick Actions
    const qaJump = document.getElementById('qa-jump-next');
    if (qaJump) {
      qaJump.addEventListener('click', () => {
        const recChapter = getRecommendedContinueChapter();
        if (recChapter) navigateToChapter(recChapter);
      });
    }

    const qaRevision = document.getElementById('qa-quick-revision');
    if (qaRevision) {
      qaRevision.addEventListener('click', () => {
        showToast('Launching Quick Revision drill...', 'info');
        const completed = state.chapters.filter((c) => c.progress === 100);
        const target = completed.length > 0 ? completed[0] : state.chapters[0];
        navigateToChapter(target);
      });
    }
  }

  /* ==========================================================================
     8. Navigation Helper
     ========================================================================== */
  function navigateToChapter(chapter) {
    logActivity(chapter, `Navigating to ${chapter.code}: ${chapter.title}`);
    if (chapter && chapter.existingPage) {
      window.location.href = chapter.existingPage;
    }
  }

  /* ==========================================================================
     9. UI Utilities (Toast & Escape)
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     10. Initialization Entrypoint
     ========================================================================== */
  function initDashboard() {
    loadStorageData();
    renderStatistics();
    renderContinueLearningSection();
    renderChaptersGrid();
    renderActivityTimeline();
    initDailyChallenge();
    initFormulaModal();
    initSettingsModal();
    initSearchAndFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }

})();
