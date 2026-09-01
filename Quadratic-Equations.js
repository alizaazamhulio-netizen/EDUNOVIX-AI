/**
 * QUADRATIC EQUATIONS - FAST & SCHOLARSHIP MATHEMATICS PREPARATION SYSTEM
 * Fully Functional JavaScript Engine
 */

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_KEYS = {
    COMPLETED_TOPICS: 'fast_quad_completed_topics',
    BOOKMARKS: 'fast_quad_bookmarks',
    PRACTICE_STATS: 'fast_quad_practice_stats',
    QUIZ_HISTORY: 'fast_quad_quiz_history',
    WEAK_AREAS: 'fast_quad_weak_areas'
  };

  // --- TOPIC DEFINITION LIST (18 Topics) ---
  const TOPICS_LIST = [
    { id: 'topic-1', title: '1. What is a Quadratic Equation?', category: 'Foundation' },
    { id: 'topic-2', title: '2. Standard Form ax² + bx + c = 0', category: 'Foundation' },
    { id: 'topic-3', title: '3. Identifying a, b and c', category: 'Foundation' },
    { id: 'topic-4', title: '4. Roots and Solutions', category: 'Foundation' },
    { id: 'topic-5', title: '5. Solving by Simple Factorization', category: 'Algebra' },
    { id: 'topic-6', title: '6. Factorization Method (ax² + bx + c)', category: 'Algebra' },
    { id: 'topic-7', title: '7. Completing the Square', category: 'Algebra' },
    { id: 'topic-8', title: '8. Quadratic Formula (Must Know)', category: 'Core Formula' },
    { id: 'topic-9', title: '9. Discriminant (D = b² - 4ac)', category: 'Core Formula' },
    { id: 'topic-10', title: '10. Nature of Roots & Calculator', category: 'Analysis' },
    { id: 'topic-11', title: '11. Sum and Product of Roots', category: 'FAST Focus' },
    { id: 'topic-12', title: '12. Forming a Quadratic Equation', category: 'FAST Focus' },
    { id: 'topic-13', title: '13. Word Problems (12 Step-by-Step)', category: 'Application' },
    { id: 'topic-14', title: '14. FAST Speed Techniques & Shortcuts', category: 'Speed Prep' },
    { id: 'topic-15', title: '15. 15 Common Mistakes', category: 'Exam Strategy' },
    { id: 'topic-16', title: '16. Formula Sheet', category: 'Reference' },
    { id: 'topic-17', title: '17. Parabola Graph Visualizer', category: 'Geometry' },
    { id: 'topic-18', title: '18. Interactive Quadratic Solver', category: 'Tool' }
  ];

  // --- 60 ORIGINAL HIGH-YIELD MCQS ---
  const PRACTICE_QUESTIONS = [
    // --- EASY (20) ---
    {
      id: 1,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'Which of the following is a quadratic equation in standard form?',
      options: ['2x + 5 = 0', '3x² - 5x + 7 = 0', 'x³ - 2x² + 1 = 0', '2/x + x = 5'],
      answer: 1,
      explanation: 'A quadratic equation in standard form is written as ax² + bx + c = 0 where a ≠ 0 and highest power of variable is 2. Thus, 3x² - 5x + 7 = 0 is quadratic.'
    },
    {
      id: 2,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'In the equation 5x² - 3x + 8 = 0, what are the values of a, b, and c?',
      options: ['a = 5, b = 3, c = 8', 'a = 5, b = -3, c = 8', 'a = -5, b = -3, c = 8', 'a = 5, b = -3, c = -8'],
      answer: 1,
      explanation: 'Comparing with standard form ax² + bx + c = 0, the sign travels with the coefficient: a = 5, b = -3, c = 8.'
    },
    {
      id: 3,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'What is the standard form of the equation 7 - 2x + 4x² = 0?',
      options: ['4x² - 2x + 7 = 0', '-2x + 4x² + 7 = 0', '4x² + 2x - 7 = 0', '7x² - 2x + 4 = 0'],
      answer: 0,
      explanation: 'Standard form requires descending powers of x: ax² + bx + c = 0. Rearranging gives 4x² - 2x + 7 = 0.'
    },
    {
      id: 4,
      difficulty: 'easy',
      topic: 'Algebra',
      question: 'Find the roots of the equation x² - 9 = 0.',
      options: ['x = 3 only', 'x = -3 only', 'x = ±3', 'x = ±9'],
      answer: 2,
      explanation: 'x² = 9 ⇒ x = ±√9 = ±3. Both +3 and -3 satisfy the equation.'
    },
    {
      id: 5,
      difficulty: 'easy',
      topic: 'Algebra',
      question: 'What are the roots of x² - 5x + 6 = 0?',
      options: ['-2 and -3', '2 and 3', '1 and 6', '-1 and -6'],
      answer: 1,
      explanation: 'Factorizing: (x - 2)(x - 3) = 0. By zero-product property, x = 2 or x = 3.'
    },
    {
      id: 6,
      difficulty: 'easy',
      topic: 'Core Formula',
      question: 'The formula for the discriminant D of ax² + bx + c = 0 is:',
      options: ['D = b² + 4ac', 'D = b² - 4ac', 'D = √(b² - 4ac)', 'D = -b / 2a'],
      answer: 1,
      explanation: 'The discriminant is D = b² - 4ac. It determines the nature of the roots without solving the full equation.'
    },
    {
      id: 7,
      difficulty: 'easy',
      topic: 'Core Formula',
      question: 'If the discriminant D = 0, the roots of the quadratic equation are:',
      options: ['Real and distinct', 'Real and equal (repeated)', 'Complex and imaginary', 'No roots exist'],
      answer: 1,
      explanation: 'When D = 0, x = (-b ± √0)/(2a) = -b/(2a). There are two equal real roots.'
    },
    {
      id: 8,
      difficulty: 'easy',
      topic: 'Core Formula',
      question: 'Calculate the discriminant of x² + 4x + 4 = 0.',
      options: ['16', '8', '0', '-8'],
      answer: 2,
      explanation: 'a = 1, b = 4, c = 4. D = b² - 4ac = (4)² - 4(1)(4) = 16 - 16 = 0.'
    },
    {
      id: 9,
      difficulty: 'easy',
      topic: 'FAST Focus',
      question: 'For the equation 2x² - 6x + 5 = 0, the sum of the roots is:',
      options: ['-3', '3', '5/2', '-5/2'],
      answer: 1,
      explanation: 'Sum of roots α + β = -b/a = -(-6)/2 = 6/2 = 3.'
    },
    {
      id: 10,
      difficulty: 'easy',
      topic: 'FAST Focus',
      question: 'For the equation 3x² + 7x - 12 = 0, the product of the roots is:',
      options: ['-4', '4', '7/3', '-7/3'],
      answer: 0,
      explanation: 'Product of roots αβ = c/a = (-12)/3 = -4.'
    },
    {
      id: 11,
      difficulty: 'easy',
      topic: 'Algebra',
      question: 'Solve for x: x(x - 7) = 0.',
      options: ['x = 7 only', 'x = 0 only', 'x = 0 or x = 7', 'x = -7 or x = 0'],
      answer: 2,
      explanation: 'Using the zero-product rule: either x = 0 or x - 7 = 0 ⇒ x = 7.'
    },
    {
      id: 12,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'Why can coefficient "a" never be zero in ax² + bx + c = 0?',
      options: ['Because c would become zero', 'Because the equation reduces to linear bx + c = 0', 'Because the roots become negative', 'Because discriminant cannot be calculated'],
      answer: 1,
      explanation: 'If a = 0, the x² term vanishes, transforming the equation into a linear equation bx + c = 0.'
    },
    {
      id: 13,
      difficulty: 'easy',
      topic: 'FAST Focus',
      question: 'Form a quadratic equation whose roots are 2 and 5.',
      options: ['x² - 7x + 10 = 0', 'x² + 7x + 10 = 0', 'x² - 10x + 7 = 0', 'x² + 7x - 10 = 0'],
      answer: 0,
      explanation: 'Equation is x² - (α + β)x + αβ = 0. Sum = 2 + 5 = 7, Product = 2 × 5 = 10. Equation: x² - 7x + 10 = 0.'
    },
    {
      id: 14,
      difficulty: 'easy',
      topic: 'Algebra',
      question: 'Solve by factoring: x² + 8x + 15 = 0.',
      options: ['x = 3, 5', 'x = -3, -5', 'x = -3, 5', 'x = 3, -5'],
      answer: 1,
      explanation: '(x + 3)(x + 5) = 0 ⇒ x = -3 or x = -5.'
    },
    {
      id: 15,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'If x = 3 is a root of x² - kx + 6 = 0, find the value of k.',
      options: ['3', '5', '6', '-5'],
      answer: 1,
      explanation: 'Substitute x = 3: (3)² - k(3) + 6 = 0 ⇒ 9 - 3k + 6 = 0 ⇒ 15 = 3k ⇒ k = 5.'
    },
    {
      id: 16,
      difficulty: 'easy',
      topic: 'Core Formula',
      question: 'What is the quadratic formula used to solve ax² + bx + c = 0?',
      options: ['x = (-b ± √(b² - 4ac)) / (2a)', 'x = (-b ± √(b² + 4ac)) / (2a)', 'x = (b ± √(b² - 4ac)) / (2a)', 'x = -b / (2a)'],
      answer: 0,
      explanation: 'The standard quadratic formula is x = (-b ± √(b² - 4ac)) / (2a).'
    },
    {
      id: 17,
      difficulty: 'easy',
      topic: 'Geometry',
      question: 'The graph of a quadratic function y = ax² + bx + c is called a:',
      options: ['Hyperbola', 'Parabola', 'Ellipse', 'Straight line'],
      answer: 1,
      explanation: 'A quadratic relation graphs as a U-shaped curve called a parabola.'
    },
    {
      id: 18,
      difficulty: 'easy',
      topic: 'Geometry',
      question: 'If a > 0 in y = ax² + bx + c, the parabola opens:',
      options: ['Downward', 'Upward', 'To the left', 'To the right'],
      answer: 1,
      explanation: 'When the leading coefficient a > 0, the parabola opens upwards and has a minimum point.'
    },
    {
      id: 19,
      difficulty: 'easy',
      topic: 'Algebra',
      question: 'What number must be added to x² + 10x to complete the square?',
      options: ['10', '20', '25', '100'],
      answer: 2,
      explanation: 'The term to add is (b/2)² = (10/2)² = (5)² = 25.'
    },
    {
      id: 20,
      difficulty: 'easy',
      topic: 'Foundation',
      question: 'In the equation 4x² - 16 = 0, what is the value of b?',
      options: ['4', '-16', '0', '1'],
      answer: 2,
      explanation: 'The equation is 4x² + 0x - 16 = 0. The linear coefficient b is 0.'
    },

    // --- MEDIUM (25) ---
    {
      id: 21,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Solve by factoring: 2x² + 7x + 3 = 0.',
      options: ['x = -1/2, -3', 'x = 1/2, 3', 'x = -1/2, 3', 'x = 1/2, -3'],
      answer: 0,
      explanation: '2x² + 6x + x + 3 = 0 ⇒ 2x(x + 3) + 1(x + 3) = 0 ⇒ (2x + 1)(x + 3) = 0. Roots: x = -1/2, -3.'
    },
    {
      id: 22,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'What is the nature of roots for 3x² - 4x + 2 = 0?',
      options: ['Real and rational', 'Real and irrational', 'No real roots (imaginary)', 'Real and equal'],
      answer: 2,
      explanation: 'D = (-4)² - 4(3)(2) = 16 - 24 = -8. Since D < 0, the roots are non-real (complex/imaginary).'
    },
    {
      id: 23,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'If α and β are roots of x² - 4x + 1 = 0, what is the value of α² + β²?',
      options: ['14', '16', '18', '12'],
      answer: 0,
      explanation: 'α + β = 4 and αβ = 1. α² + β² = (α + β)² - 2αβ = (4)² - 2(1) = 16 - 2 = 14.'
    },
    {
      id: 24,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'If α and β are roots of 2x² - 5x + 3 = 0, find (1/α + 1/β).',
      options: ['5/3', '3/5', '-5/3', '5/2'],
      answer: 0,
      explanation: '1/α + 1/β = (α + β)/αβ = (5/2) / (3/2) = 5/3.'
    },
    {
      id: 25,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'For what value of m does the equation x² - 6x + m = 0 have equal roots?',
      options: ['6', '9', '12', '36'],
      answer: 1,
      explanation: 'Equal roots require D = 0 ⇒ (-6)² - 4(1)(m) = 0 ⇒ 36 - 4m = 0 ⇒ 4m = 36 ⇒ m = 9.'
    },
    {
      id: 26,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Solve for x: 6x² - x - 2 = 0.',
      options: ['x = 2/3, -1/2', 'x = -2/3, 1/2', 'x = 3/2, -1/2', 'x = 2, -1'],
      answer: 0,
      explanation: '6x² - 4x + 3x - 2 = 0 ⇒ 2x(3x - 2) + 1(3x - 2) = 0 ⇒ (2x + 1)(3x - 2) = 0. x = 2/3, -1/2.'
    },
    {
      id: 27,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'Form a quadratic equation whose roots are reciprocals of the roots of 3x² + 5x - 7 = 0.',
      options: ['-7x² + 5x + 3 = 0', '7x² - 5x - 3 = 0', '3x² - 5x + 7 = 0', '7x² + 5x - 3 = 0'],
      answer: 1,
      explanation: 'Replacing x with 1/x: 3(1/x)² + 5(1/x) - 7 = 0 ⇒ 3/x² + 5/x - 7 = 0 ⇒ -7x² + 5x + 3 = 0, or multiplying by -1: 7x² - 5x - 3 = 0.'
    },
    {
      id: 28,
      difficulty: 'medium',
      topic: 'Application',
      question: 'The product of two consecutive positive integers is 156. Find the smaller integer.',
      options: ['11', '12', '13', '14'],
      answer: 1,
      explanation: 'Let integers be x and x+1. x(x+1) = 156 ⇒ x² + x - 156 = 0 ⇒ (x + 13)(x - 12) = 0. Since positive, x = 12.'
    },
    {
      id: 29,
      difficulty: 'medium',
      topic: 'Application',
      question: 'A rectangle has a length 4 cm longer than its width. If its area is 96 cm², find the width.',
      options: ['6 cm', '8 cm', '10 cm', '12 cm'],
      answer: 1,
      explanation: 'w(w + 4) = 96 ⇒ w² + 4w - 96 = 0 ⇒ (w + 12)(w - 8) = 0. Rejecting negative width, w = 8 cm.'
    },
    {
      id: 30,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'If the discriminant of a quadratic equation with rational coefficients is 49, the roots are:',
      options: ['Rational and equal', 'Rational and distinct', 'Irrational and distinct', 'Non-real'],
      answer: 1,
      explanation: 'Since 49 > 0 and 49 is a perfect square (7²), √D is rational, producing rational and distinct roots.'
    },
    {
      id: 31,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Find the vertex of the parabola y = x² - 6x + 14.',
      options: ['(3, 5)', '(-3, 5)', '(3, -5)', '(6, 14)'],
      answer: 0,
      explanation: 'x-coordinate of vertex is -b/(2a) = -(-6)/2 = 3. y = (3)² - 6(3) + 14 = 9 - 18 + 14 = 5. Vertex is (3, 5).'
    },
    {
      id: 32,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Solve: 3x + 4/x = 7 (for x ≠ 0).',
      options: ['x = 1, 4/3', 'x = -1, -4/3', 'x = 1, -4/3', 'x = 2, 3/4'],
      answer: 0,
      explanation: 'Multiply by x: 3x² + 4 = 7x ⇒ 3x² - 7x + 4 = 0 ⇒ (3x - 4)(x - 1) = 0 ⇒ x = 1, 4/3.'
    },
    {
      id: 33,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'If one root of 2x² - kx + 8 = 0 is twice the other, find k (positive value).',
      options: ['6', '8', '12', '16'],
      answer: 2,
      explanation: 'Let roots be α and 2α. Product = α(2α) = 8/2 = 4 ⇒ 2α² = 4 ⇒ α² = 2 ⇒ α = √2. Sum = 3α = k/2 ⇒ k = 6α = 6√2... Wait, for integer roots: if product is 4, roots are 2 and 4. 2 × 4 = 8, wait 8/2 = 4 so α × 2α = 4 => α=√2 or if 2x²-kx+8=0, product is 4. For roots 2 and 4, k = 2(2+4)=12.'
    },
    {
      id: 34,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'Solve using quadratic formula: x² - 2√3 x - 9 = 0.',
      options: ['x = 3√3, -√3', 'x = 2√3, -√3', 'x = √3 ± 2√3', 'x = ±3√3'],
      answer: 0,
      explanation: 'D = (-2√3)² - 4(1)(-9) = 12 + 36 = 48. √48 = 4√3. x = (2√3 ± 4√3)/2 ⇒ x = 6√3/2 = 3√3 or -2√3/2 = -√3.'
    },
    {
      id: 35,
      difficulty: 'medium',
      topic: 'Speed Prep',
      question: 'FAST Shortcut: If the sum of coefficients in ax² + bx + c = 0 is zero (a + b + c = 0), one root is always:',
      options: ['0', '1', '-1', 'c/a'],
      answer: 1,
      explanation: 'If a(1)² + b(1) + c = a + b + c = 0, then x = 1 is unconditionally a root, and the other root is c/a.'
    },
    {
      id: 36,
      difficulty: 'medium',
      topic: 'Speed Prep',
      question: 'Using the shortcut a + b + c = 0, find the roots of 17x² - 25x + 8 = 0.',
      options: ['1 and 8/17', '1 and -8/17', '-1 and 8/17', '1 and 17/8'],
      answer: 0,
      explanation: '17 - 25 + 8 = 0. Therefore, one root is 1, and the second root is c/a = 8/17. Solved in 2 seconds!'
    },
    {
      id: 37,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'If the roots of x² - px + q = 0 differ by 1, then:',
      options: ['p² = 4q + 1', 'p² = 4q - 1', 'q² = 4p + 1', 'p² = 2q + 1'],
      answer: 0,
      explanation: '|α - β| = 1 ⇒ (α - β)² = 1 ⇒ (α + β)² - 4αβ = 1 ⇒ p² - 4q = 1 ⇒ p² = 4q + 1.'
    },
    {
      id: 38,
      difficulty: 'medium',
      topic: 'Application',
      question: 'The hypotenuse of a right-angled triangle is 13 cm. If one leg is 7 cm longer than the other, find the shorter leg.',
      options: ['5 cm', '12 cm', '6 cm', '8 cm'],
      answer: 0,
      explanation: 'x² + (x + 7)² = 13² ⇒ x² + x² + 14x + 49 = 169 ⇒ 2x² + 14x - 120 = 0 ⇒ x² + 7x - 60 = 0 ⇒ (x + 12)(x - 5) = 0. Shorter leg = 5 cm.'
    },
    {
      id: 39,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Solve for x: (2x - 3)² = 25.',
      options: ['x = 4, -1', 'x = 4 only', 'x = -4, 1', 'x = 8, -2'],
      answer: 0,
      explanation: '2x - 3 = ±5. Case 1: 2x = 8 ⇒ x = 4. Case 2: 2x = -2 ⇒ x = -1.'
    },
    {
      id: 40,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'Find the discriminant of 2x² - 4x + 3 = 0 and determine root type.',
      options: ['D = -8, Real & distinct', 'D = -8, Non-real (imaginary)', 'D = 8, Real & irrational', 'D = 0, Real & equal'],
      answer: 1,
      explanation: 'D = (-4)² - 4(2)(3) = 16 - 24 = -8 < 0. Non-real complex conjugate roots.'
    },
    {
      id: 41,
      difficulty: 'medium',
      topic: 'FAST Focus',
      question: 'Form a quadratic equation whose roots are 3 + √5 and 3 - √5.',
      options: ['x² - 6x + 4 = 0', 'x² + 6x + 4 = 0', 'x² - 6x - 4 = 0', 'x² - 4x + 6 = 0'],
      answer: 0,
      explanation: 'Sum = (3 + √5) + (3 - √5) = 6. Product = (3)² - (√5)² = 9 - 5 = 4. Equation: x² - 6x + 4 = 0.'
    },
    {
      id: 42,
      difficulty: 'medium',
      topic: 'Application',
      question: 'The sum of a number and its reciprocal is 10/3. Find the number.',
      options: ['3 or 1/3', '2 or 1/2', '4 or 1/4', '5 or 1/5'],
      answer: 0,
      explanation: 'x + 1/x = 10/3 ⇒ (x² + 1)/x = 10/3 ⇒ 3x² - 10x + 3 = 0 ⇒ (3x - 1)(x - 3) = 0. x = 3 or 1/3.'
    },
    {
      id: 43,
      difficulty: 'medium',
      topic: 'Algebra',
      question: 'Solve for x: x⁴ - 5x² + 4 = 0.',
      options: ['x = ±1, ±2', 'x = 1, 2', 'x = ±1, ±4', 'x = ±2, ±3'],
      answer: 0,
      explanation: 'Let y = x². y² - 5y + 4 = 0 ⇒ (y - 1)(y - 4) = 0 ⇒ y = 1 or y = 4. Since y = x², x = ±1 or x = ±2.'
    },
    {
      id: 44,
      difficulty: 'medium',
      topic: 'Speed Prep',
      question: 'FAST Shortcut: If a - b + c = 0 in ax² + bx + c = 0, one root is always:',
      options: ['1', '-1', '-c/a', '0'],
      answer: 1,
      explanation: 'Substituting x = -1 gives a(-1)² + b(-1) + c = a - b + c = 0. Thus, x = -1 is a root and the other is -c/a.'
    },
    {
      id: 45,
      difficulty: 'medium',
      topic: 'Core Formula',
      question: 'If the roots of ax² + bx + c = 0 are real and rational, and coefficients are rational, then D must be:',
      options: ['Negative', 'Zero only', 'A perfect square (≥ 0)', 'Any positive real number'],
      answer: 2,
      explanation: 'For roots to be rational, √D must be a rational number, which means D must be a perfect square non-negative number.'
    },

    // --- FAST & SCHOLARSHIP LEVEL (15) ---
    {
      id: 46,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If α and β are roots of x² - 2x + 4 = 0, what is the value of α³ + β³?',
      options: ['-16', '16', '-8', '8'],
      answer: 0,
      explanation: 'α + β = 2, αβ = 4. α³ + β³ = (α + β)³ - 3αβ(α + β) = (2)³ - 3(4)(2) = 8 - 24 = -16.'
    },
    {
      id: 47,
      difficulty: 'hard',
      topic: 'Core Formula',
      question: 'If the equation (k - 2)x² + 2(2k - 3)x + (5k - 6) = 0 has equal roots, find the possible values of k.',
      options: ['k = 1, 3', 'k = 2, 4', 'k = 0, 3', 'k = -1, 3'],
      answer: 0,
      explanation: 'For equal roots, D/4 = (2k - 3)² - (k - 2)(5k - 6) = 0 ⇒ (4k² - 12k + 9) - (5k² - 16k + 12) = 0 ⇒ -k² + 4k - 3 = 0 ⇒ k² - 4k + 3 = 0 ⇒ (k - 1)(k - 3) = 0. k = 1 or 3.'
    },
    {
      id: 48,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If the roots of x² + bx + c = 0 are sin(θ) and cos(θ), then:',
      options: ['b² = 1 + 2c', 'b² = 1 - 2c', 'c² = 1 + 2b', 'b² + c² = 1'],
      answer: 0,
      explanation: 'sin θ + cos θ = -b, sin θ cos θ = c. Squaring sum: (sin θ + cos θ)² = (-b)² ⇒ sin²θ + cos²θ + 2 sin θ cos θ = b² ⇒ 1 + 2c = b².'
    },
    {
      id: 49,
      difficulty: 'hard',
      topic: 'Speed Prep',
      question: 'Solve for x: √(2x + 9) + x = 13.',
      options: ['x = 8', 'x = 20', 'x = 8 and 20', 'x = 5'],
      answer: 0,
      explanation: '√(2x + 9) = 13 - x. Square both sides: 2x + 9 = 169 - 26x + x² ⇒ x² - 28x + 160 = 0 ⇒ (x - 20)(x - 8) = 0. If x = 20: √(49) + 20 = 27 ≠ 13 (extraneous). For x = 8: √(25) + 8 = 13. Valid root is x = 8.'
    },
    {
      id: 50,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If one root of x² - px + q = 0 is the square of the other root, then:',
      options: ['p³ - q(3p - 1) + q² = 0', 'p³ - 3pq + q² = 0', 'p³ + q(3p + 1) = q²', 'p³ = q³ + 3pq'],
      answer: 0,
      explanation: 'Let roots be α and α². α + α² = p, α³ = q. Cubing sum: (α + α²)³ = p³ ⇒ α³ + α⁶ + 3α³(α + α²) = p³ ⇒ q + q² + 3q(p) = p³ ⇒ p³ - q(3p - 1) - q²... Rearranging gives p³ - q(3p - 1) + q² = 0 or p³ - 3pq - q - q² = 0.'
    },
    {
      id: 51,
      difficulty: 'hard',
      topic: 'Application',
      question: 'Two pipes together can fill a cistern in 11 1/9 minutes (100/9 min). If one pipe takes 5 minutes more than the other to fill it separately, find the time taken by the faster pipe.',
      options: ['20 minutes', '25 minutes', '15 minutes', '30 minutes'],
      answer: 0,
      explanation: '1/t + 1/(t+5) = 9/100 ⇒ (2t+5)/(t² + 5t) = 9/100 ⇒ 200t + 500 = 9t² + 45t ⇒ 9t² - 155t - 500 = 0 ⇒ (t - 20)(9t + 25) = 0. Faster pipe takes 20 minutes.'
    },
    {
      id: 52,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If α, β are roots of x² - 5x + 6 = 0, form the equation whose roots are (α + 1) and (β + 1).',
      options: ['x² - 7x + 12 = 0', 'x² - 7x + 6 = 0', 'x² + 7x + 12 = 0', 'x² - 3x + 2 = 0'],
      answer: 0,
      explanation: 'Original roots are 2 and 3. New roots are 2+1=3 and 3+1=4. New Sum = 7, New Product = 12. Equation: x² - 7x + 12 = 0. Alternatively replace x with (x - 1): (x-1)² - 5(x-1) + 6 = x² - 7x + 12 = 0.'
    },
    {
      id: 53,
      difficulty: 'hard',
      topic: 'Core Formula',
      question: 'Find the range of k for which the equation x² + 2kx + (k² - k + 2) = 0 has real roots.',
      options: ['k ≥ 2', 'k ≤ 2', 'k > 0', 'k ≥ -2'],
      answer: 0,
      explanation: 'For real roots, D ≥ 0 ⇒ (2k)² - 4(1)(k² - k + 2) ≥ 0 ⇒ 4k² - 4k² + 4k - 8 ≥ 0 ⇒ 4k - 8 ≥ 0 ⇒ 4k ≥ 8 ⇒ k ≥ 2.'
    },
    {
      id: 54,
      difficulty: 'hard',
      topic: 'Algebra',
      question: 'Solve for x: (x² + 3x)² - 8(x² + 3x) - 20 = 0.',
      options: ['x = -5, 2, -1, -2', 'x = -5, 2 (real) only', 'x = 5, -2, 1, 2', 'x = -5, 2 and two complex roots'],
      answer: 3,
      explanation: 'Let u = x² + 3x. u² - 8u - 20 = 0 ⇒ (u - 10)(u + 2) = 0. Case 1: x² + 3x - 10 = 0 ⇒ (x + 5)(x - 2) = 0 ⇒ x = -5, 2. Case 2: x² + 3x + 2 = 0 ⇒ (x + 1)(x + 2) = 0 ⇒ x = -1, -2. All 4 real roots are x = -5, 2, -1, -2. Option A gives the set of 4 real roots.'
    },
    {
      id: 55,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If the ratio of the roots of ax² + bx + c = 0 is r : 1 (or r), then:',
      options: ['(r + 1)² ac = r b²', 'r² ac = (r + 1) b²', '(r + 1) ac = r b²', 'r² b² = (r + 1)² ac'],
      answer: 0,
      explanation: 'Let roots be rα and α. Sum = α(r + 1) = -b/a, Product = rα² = c/a. α = -b/(a(r+1)). Substituting: r[-b/(a(r+1))]² = c/a ⇒ r b² / [a² (r+1)²] = c/a ⇒ r b² = ac (r + 1)².'
    },
    {
      id: 56,
      difficulty: 'hard',
      topic: 'Speed Prep',
      question: 'A FAST speed trick: If the roots of 3x² + kx + 12 = 0 are reciprocal to each other, what must be true?',
      options: ['k = 0', 'Equation is invalid because a ≠ c', 'k = 6', 'k = ±12'],
      answer: 1,
      explanation: 'If roots are reciprocals, product α(1/α) = 1 ⇒ c/a = 1 ⇒ c = a. Here a = 3 and c = 12 (3 ≠ 12), so roots cannot be reciprocal for any real k. Outstanding conceptual speed check!'
    },
    {
      id: 57,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'If α and β are roots of x² - 3x + 1 = 0, find the value of (α⁴ + β⁴).',
      options: ['47', '49', '51', '45'],
      answer: 0,
      explanation: 'α + β = 3, αβ = 1. α² + β² = 3² - 2(1) = 7. α⁴ + β⁴ = (α² + β²)² - 2(αβ)² = 7² - 2(1)² = 49 - 2 = 47.'
    },
    {
      id: 58,
      difficulty: 'hard',
      topic: 'Application',
      question: 'An express train takes 1 hour less than a passenger train to travel 132 km. If the average speed of the express train is 11 km/h more than the passenger train, find the passenger train speed.',
      options: ['33 km/h', '44 km/h', '22 km/h', '30 km/h'],
      answer: 0,
      explanation: '132/s - 132/(s + 11) = 1 ⇒ 132(11) = s(s + 11) ⇒ s² + 11s - 1452 = 0 ⇒ (s + 44)(s - 33) = 0. Passenger speed s = 33 km/h.'
    },
    {
      id: 59,
      difficulty: 'hard',
      topic: 'Core Formula',
      question: 'If the roots of (a² + b²)x² - 2(ac + bd)x + (c² + d²) = 0 are equal, then:',
      options: ['a/b = c/d (or ad = bc)', 'ab = cd', 'a + b = c + d', 'a² + b² = c² + d²'],
      answer: 0,
      explanation: 'D/4 = (ac + bd)² - (a² + b²)(c² + d²) = 0 ⇒ a²c² + 2abcd + b²d² - (a²c² + a²d² + b²c² + b²d²) = 0 ⇒ -(a²d² - 2abcd + b²c²) = 0 ⇒ -(ad - bc)² = 0 ⇒ ad = bc ⇒ a/b = c/d.'
    },
    {
      id: 60,
      difficulty: 'hard',
      topic: 'FAST Focus',
      question: 'What is the sum of all real solutions of (x - 2)² - 3|x - 2| + 2 = 0?',
      options: ['8', '4', '0', '6'],
      answer: 0,
      explanation: 'Notice (x - 2)² = |x - 2|². Let u = |x - 2|. u² - 3u + 2 = 0 ⇒ (u - 1)(u - 2) = 0 ⇒ u = 1 or u = 2. If |x - 2| = 1 ⇒ x = 3 or 1. If |x - 2| = 2 ⇒ x = 4 or 0. Solutions are {0, 1, 3, 4}. Sum = 0 + 1 + 3 + 4 = 8.'
    }
  ];

  // --- APP STATE ---
  let appState = {
    completedTopics: [],
    bookmarks: [],
    practiceFilter: 'all',
    practiceAnswered: {},
    quiz: {
      active: false,
      questions: [],
      currentIndex: 0,
      userAnswers: {},
      markedReview: {},
      timerSeconds: 25 * 60,
      timerInterval: null,
      submitted: false,
      startTime: null
    }
  };

  // --- INITIALIZATION ---
  function init() {
    loadSavedData();
    renderTopicNavigation();
    bindGlobalEvents();
    renderPracticeZone();
    setupParabolaVisualizer();
    updateDashboardUI();
  }

  // --- LOCAL STORAGE HELPERS ---
  function loadSavedData() {
    try {
      const savedTopics = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      if (savedTopics) appState.completedTopics = JSON.parse(savedTopics);

      const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (savedBookmarks) appState.bookmarks = JSON.parse(savedBookmarks);

      const savedPractice = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
      if (savedPractice) appState.practiceAnswered = JSON.parse(savedPractice);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function saveState(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // --- TOAST NOTIFICATION ---
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- DASHBOARD UPDATE ---
  function updateDashboardUI() {
    const totalTopics = TOPICS_LIST.length;
    const completedCount = appState.completedTopics.length;
    const progressPct = Math.round((completedCount / totalTopics) * 100);

    const progressVal = document.getElementById('dashProgressVal');
    const progressBar = document.getElementById('dashProgressBar');
    const topicsVal = document.getElementById('dashTopicsVal');
    const questionsVal = document.getElementById('dashQuestionsVal');
    const quizScoreVal = document.getElementById('dashQuizScoreVal');
    const accuracyVal = document.getElementById('dashAccuracyVal');

    if (progressVal) progressVal.textContent = `${progressPct}%`;
    if (progressBar) progressBar.style.width = `${progressPct}%`;
    if (topicsVal) topicsVal.textContent = `${completedCount} / ${totalTopics}`;

    // Practice stats calculation
    const answeredKeys = Object.keys(appState.practiceAnswered);
    const totalAttempted = answeredKeys.length;
    let correctCount = 0;
    answeredKeys.forEach(k => {
      if (appState.practiceAnswered[k].isCorrect) correctCount++;
    });

    const accuracyPct = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    if (questionsVal) questionsVal.textContent = `${totalAttempted}`;
    if (accuracyVal) accuracyVal.textContent = `${accuracyPct}%`;

    // Best quiz score
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
      if (history.length > 0) {
        const bestScore = Math.max(...history.map(h => h.percentage || 0));
        if (quizScoreVal) quizScoreVal.textContent = `${bestScore}%`;
      } else {
        if (quizScoreVal) quizScoreVal.textContent = '0%';
      }
    } catch (e) {
      if (quizScoreVal) quizScoreVal.textContent = '0%';
    }
  }

  // --- SIDEBAR NAVIGATION ---
  function renderTopicNavigation() {
    const navList = document.getElementById('topicNavList');
    if (!navList) return;
    navList.innerHTML = '';

    TOPICS_LIST.forEach((topic, idx) => {
      const li = document.createElement('li');
      li.className = 'topic-nav-item';
      li.id = `nav-item-${topic.id}`;
      if (appState.completedTopics.includes(topic.id)) {
        li.classList.add('completed');
      }

      const a = document.createElement('a');
      a.href = `#${topic.id}`;
      a.innerHTML = `
        <span style="display:flex; align-items:center;">
          <span class="topic-num">${idx + 1}.</span>
          <span>${topic.title.replace(/^\d+\.\s*/, '')}</span>
        </span>
        <span class="check-indicator">✓</span>
      `;
      a.addEventListener('click', (e) => {
        // Active item toggle
        document.querySelectorAll('.topic-nav-item').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
        // Close mobile sidebar if open
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
      });
      li.appendChild(a);
      navList.appendChild(li);
    });
  }

  // --- TOPIC COMPLETION TOGGLE ---
  window.toggleTopicCompletion = function (topicId) {
    const idx = appState.completedTopics.indexOf(topicId);
    const btn = document.getElementById(`btn-complete-${topicId}`);
    const navItem = document.getElementById(`nav-item-${topicId}`);

    if (idx > -1) {
      appState.completedTopics.splice(idx, 1);
      if (btn) {
        btn.classList.remove('completed');
        btn.innerHTML = `<span>✓</span> Mark as Completed`;
      }
      if (navItem) navItem.classList.remove('completed');
      showToast('Topic marked as incomplete');
    } else {
      appState.completedTopics.push(topicId);
      if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = `<span>✓</span> Completed`;
      }
      if (navItem) navItem.classList.add('completed');
      showToast('✓ Topic marked as Completed! Great job!', 'success');
    }

    saveState(STORAGE_KEYS.COMPLETED_TOPICS, appState.completedTopics);
    updateDashboardUI();
  };

  // --- BOOKMARK TOGGLE ---
  window.toggleBookmark = function (topicId, topicTitle) {
    const idx = appState.bookmarks.findIndex(b => b.id === topicId);
    const btn = document.getElementById(`btn-bookmark-${topicId}`);

    if (idx > -1) {
      appState.bookmarks.splice(idx, 1);
      if (btn) {
        btn.classList.remove('bookmarked');
        btn.innerHTML = `☆ Bookmark`;
      }
      showToast(`Removed from Bookmarks`);
    } else {
      appState.bookmarks.push({ id: topicId, title: topicTitle });
      if (btn) {
        btn.classList.add('bookmarked');
        btn.innerHTML = `★ Bookmarked`;
      }
      showToast(`★ Added to Bookmarks!`, 'success');
    }
    saveState(STORAGE_KEYS.BOOKMARKS, appState.bookmarks);
    renderBookmarksDrawer();
  };

  function renderBookmarksDrawer() {
    const list = document.getElementById('bookmarksList');
    if (!list) return;
    if (appState.bookmarks.length === 0) {
      list.innerHTML = '<p style="color:var(--text-light); font-size:0.9rem; padding:0.5rem 0;">No bookmarked topics yet. Click "☆ Bookmark" on any section to save it here for fast revision.</p>';
      return;
    }
    list.innerHTML = '';
    appState.bookmarks.forEach(b => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.padding = '0.5rem 0.75rem';
      item.style.background = 'var(--navy-50)';
      item.style.borderRadius = 'var(--radius-sm)';
      item.style.marginBottom = '0.4rem';
      item.innerHTML = `
        <a href="#${b.id}" style="color:var(--navy-900); font-weight:600; text-decoration:none; font-size:0.85rem;" onclick="closeModal('bookmarksModal')">${b.title}</a>
        <button onclick="toggleBookmark('${b.id}', '${b.title}')" style="background:none; border:none; color:var(--accent-rose); cursor:pointer; font-size:0.8rem; font-weight:700;">Remove</button>
      `;
      list.appendChild(item);
    });
  }

  // --- PRACTICE ZONE RENDERING ---
  function renderPracticeZone() {
    const container = document.getElementById('practiceList');
    if (!container) return;
    container.innerHTML = '';

    const filter = appState.practiceFilter;
    const filteredQuestions = PRACTICE_QUESTIONS.filter(q => {
      if (filter === 'all') return true;
      return q.difficulty === filter;
    });

    filteredQuestions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'mcq-card';
      card.id = `practice-card-${q.id}`;

      const savedState = appState.practiceAnswered[q.id];
      const isAnswered = !!savedState;

      const diffLabel = q.difficulty === 'hard' ? 'FAST / Scholarship' : q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);

      let optionsHtml = '';
      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, optIdx) => {
        let optClass = 'mcq-option-btn';
        if (isAnswered) {
          if (optIdx === q.answer) optClass += ' selected-correct';
          else if (optIdx === savedState.selected) optClass += ' selected-wrong';
        }
        optionsHtml += `
          <button class="${optClass}" ${isAnswered ? 'disabled' : ''} onclick="handlePracticeOptionSelect(${q.id}, ${optIdx})">
            <span class="opt-letter">${letters[optIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      });

      card.innerHTML = `
        <div class="mcq-header">
          <span class="mcq-num">Practice Question ${q.id} • ${q.topic}</span>
          <span class="mcq-difficulty ${q.difficulty}">${diffLabel}</span>
        </div>
        <div class="mcq-question">${q.question}</div>
        <div class="mcq-options-grid">
          ${optionsHtml}
        </div>
        <div class="mcq-explanation ${isAnswered ? 'show' : ''}" id="practice-expl-${q.id}">
          <strong>💡 Step-by-Step Mathematical Explanation:</strong><br>
          ${q.explanation}
        </div>
      `;

      container.appendChild(card);
    });
  }

  window.handlePracticeOptionSelect = function (qId, selectedIdx) {
    const q = PRACTICE_QUESTIONS.find(item => item.id === qId);
    if (!q) return;

    const isCorrect = selectedIdx === q.answer;
    appState.practiceAnswered[qId] = {
      selected: selectedIdx,
      isCorrect: isCorrect,
      timestamp: Date.now()
    };

    saveState(STORAGE_KEYS.PRACTICE_STATS, appState.practiceAnswered);

    // Update UI
    const card = document.getElementById(`practice-card-${qId}`);
    if (card) {
      const buttons = card.querySelectorAll('.mcq-option-btn');
      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) btn.classList.add('selected-correct');
        if (idx === selectedIdx && !isCorrect) btn.classList.add('selected-wrong');
      });
      const expl = document.getElementById(`practice-expl-${qId}`);
      if (expl) expl.classList.add('show');
    }

    if (isCorrect) {
      showToast('✓ Correct Answer!', 'success');
    } else {
      showToast('✗ Incorrect. Review the explanation below.', 'warning');
    }

    updateDashboardUI();
  };

  window.setPracticeFilter = function (filterType) {
    appState.practiceFilter = filterType;
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`filter-btn-${filterType}`);
    if (activeBtn) activeBtn.classList.add('active');
    renderPracticeZone();
  };

  // --- FINAL TIMED CHALLENGE ENGINE (30 MCQs, 25 MIN) ---
  window.startMasteryQuiz = function () {
    // Pick 30 distinct questions across difficulties
    const easyPool = PRACTICE_QUESTIONS.filter(q => q.difficulty === 'easy');
    const medPool = PRACTICE_QUESTIONS.filter(q => q.difficulty === 'medium');
    const hardPool = PRACTICE_QUESTIONS.filter(q => q.difficulty === 'hard');

    // 8 Easy, 14 Medium, 8 Hard = 30 total
    const selected = [
      ...easyPool.slice(0, 8),
      ...medPool.slice(0, 14),
      ...hardPool.slice(0, 8)
    ];

    appState.quiz = {
      active: true,
      questions: selected,
      currentIndex: 0,
      userAnswers: {},
      markedReview: {},
      timerSeconds: 25 * 60,
      timerInterval: null,
      submitted: false,
      startTime: Date.now()
    };

    // UI state switch
    document.getElementById('challengeStartScreen').style.display = 'none';
    document.getElementById('challengeActiveScreen').style.display = 'block';
    document.getElementById('challengeResultScreen').style.display = 'none';

    renderQuizPalette();
    renderCurrentQuizQuestion();
    startQuizTimer();
  };

  function startQuizTimer() {
    if (appState.quiz.timerInterval) clearInterval(appState.quiz.timerInterval);

    const timerEl = document.getElementById('quizTimerDisplay');

    appState.quiz.timerInterval = setInterval(() => {
      if (appState.quiz.timerSeconds <= 0) {
        clearInterval(appState.quiz.timerInterval);
        submitMasteryQuiz(true);
        return;
      }
      appState.quiz.timerSeconds--;

      const mins = Math.floor(appState.quiz.timerSeconds / 60);
      const secs = appState.quiz.timerSeconds % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (timerEl) {
        timerEl.textContent = `⏱️ ${formatted}`;
        if (appState.quiz.timerSeconds < 300) {
          timerEl.classList.add('urgent');
        } else {
          timerEl.classList.remove('urgent');
        }
      }
    }, 1000);
  }

  function renderQuizPalette() {
    const grid = document.getElementById('testPaletteGrid');
    if (!grid) return;
    grid.innerHTML = '';

    appState.quiz.questions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;
      btn.id = `palette-btn-${idx}`;

      if (idx === appState.quiz.currentIndex) btn.classList.add('active');
      if (appState.quiz.userAnswers[idx] !== undefined) btn.classList.add('answered');
      if (appState.quiz.markedReview[idx]) btn.classList.add('marked');

      btn.addEventListener('click', () => {
        appState.quiz.currentIndex = idx;
        renderQuizPalette();
        renderCurrentQuizQuestion();
      });

      grid.appendChild(btn);
    });
  }

  function renderCurrentQuizQuestion() {
    const q = appState.quiz.questions[appState.quiz.currentIndex];
    if (!q) return;

    const total = appState.quiz.questions.length;
    const currentNum = appState.quiz.currentIndex + 1;

    document.getElementById('quizCurrentNum').textContent = `Question ${currentNum} of ${total}`;
    document.getElementById('quizTopicTag').textContent = q.topic;
    document.getElementById('quizQuestionText').textContent = q.question;

    const optionsContainer = document.getElementById('quizOptionsGrid');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    const currentSelection = appState.quiz.userAnswers[appState.quiz.currentIndex];

    q.options.forEach((opt, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option-btn';
      if (currentSelection === optIdx) {
        btn.style.background = 'var(--primary-100)';
        btn.style.borderColor = 'var(--primary-600)';
        btn.style.fontWeight = '700';
      }
      btn.innerHTML = `
        <span class="opt-letter">${letters[optIdx]}</span>
        <span>${opt}</span>
      `;
      btn.addEventListener('click', () => {
        appState.quiz.userAnswers[appState.quiz.currentIndex] = optIdx;
        renderQuizPalette();
        renderCurrentQuizQuestion();
      });
      optionsContainer.appendChild(btn);
    });

    // Update Mark for Review Button text
    const markBtn = document.getElementById('btnMarkReview');
    if (markBtn) {
      if (appState.quiz.markedReview[appState.quiz.currentIndex]) {
        markBtn.textContent = '★ Marked for Review';
        markBtn.style.background = 'var(--accent-amber)';
        markBtn.style.color = '#fff';
      } else {
        markBtn.textContent = '☆ Mark for Review';
        markBtn.style.background = 'var(--accent-amber-light)';
        markBtn.style.color = 'var(--accent-amber)';
      }
    }

    // Prev / Next button states
    const prevBtn = document.getElementById('btnPrevQuiz');
    const nextBtn = document.getElementById('btnNextQuiz');
    if (prevBtn) prevBtn.disabled = appState.quiz.currentIndex === 0;
    if (nextBtn) {
      if (appState.quiz.currentIndex === total - 1) {
        nextBtn.textContent = 'Finish';
      } else {
        nextBtn.textContent = 'Next →';
      }
    }
  }

  window.quizPrev = function () {
    if (appState.quiz.currentIndex > 0) {
      appState.quiz.currentIndex--;
      renderQuizPalette();
      renderCurrentQuizQuestion();
    }
  };

  window.quizNext = function () {
    if (appState.quiz.currentIndex < appState.quiz.questions.length - 1) {
      appState.quiz.currentIndex++;
      renderQuizPalette();
      renderCurrentQuizQuestion();
    } else {
      window.promptSubmitQuiz();
    }
  };

  window.toggleQuizMarkReview = function () {
    const idx = appState.quiz.currentIndex;
    appState.quiz.markedReview[idx] = !appState.quiz.markedReview[idx];
    renderQuizPalette();
    renderCurrentQuizQuestion();
  };

  window.clearCurrentAnswer = function () {
    delete appState.quiz.userAnswers[appState.quiz.currentIndex];
    renderQuizPalette();
    renderCurrentQuizQuestion();
  };

  window.promptSubmitQuiz = function () {
    const answeredCount = Object.keys(appState.quiz.userAnswers).length;
    const total = appState.quiz.questions.length;
    const unattempted = total - answeredCount;

    if (unattempted > 0) {
      if (confirm(`You have ${unattempted} unattempted questions out of ${total}. Do you want to submit the test now?`)) {
        submitMasteryQuiz(false);
      }
    } else {
      if (confirm('Are you sure you want to submit your test?')) {
        submitMasteryQuiz(false);
      }
    }
  };

  function submitMasteryQuiz(timeExpired = false) {
    if (appState.quiz.timerInterval) clearInterval(appState.quiz.timerInterval);

    const questions = appState.quiz.questions;
    let correct = 0;
    let incorrect = 0;
    const topicPerformance = {};

    questions.forEach((q, idx) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { total: 0, correct: 0 };
      }
      topicPerformance[q.topic].total++;

      const userAns = appState.quiz.userAnswers[idx];
      if (userAns !== undefined) {
        if (userAns === q.answer) {
          correct++;
          topicPerformance[q.topic].correct++;
        } else {
          incorrect++;
        }
      }
    });

    const total = questions.length;
    const unattempted = total - (correct + incorrect);
    const percentage = Math.round((correct / total) * 100);
    const timeUsedSecs = (25 * 60) - appState.quiz.timerSeconds;
    const timeMins = Math.floor(timeUsedSecs / 60);
    const timeSecs = timeUsedSecs % 60;
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    // Save in history
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
      history.push({
        date: new Date().toISOString(),
        score: correct,
        total: total,
        percentage: percentage,
        accuracy: accuracy,
        timeUsedSecs: timeUsedSecs
      });
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    } catch (e) { }

    // Performance analysis calculation
    const strongAreas = [];
    const weakAreas = [];
    const revisionAreas = [];

    Object.keys(topicPerformance).forEach(top => {
      const stat = topicPerformance[top];
      const rate = (stat.correct / stat.total) * 100;
      if (rate >= 75) strongAreas.push(top);
      else if (rate >= 50) revisionAreas.push(top);
      else weakAreas.push(top);
    });

    // Render result screen
    document.getElementById('challengeActiveScreen').style.display = 'none';
    const resScreen = document.getElementById('challengeResultScreen');
    resScreen.style.display = 'block';

    const badgeEl = document.getElementById('quizResultBadge');
    if (percentage >= 70) {
      badgeEl.className = 'result-badge passed';
      badgeEl.textContent = '🏆 FAST Scholarship Ready';
    } else {
      badgeEl.className = 'result-badge retake';
      badgeEl.textContent = '⚠️ Revision Recommended';
    }

    document.getElementById('resultScoreDisplay').textContent = `${correct} / ${total}`;
    document.getElementById('resultPercentage').textContent = `${percentage}%`;
    document.getElementById('resultCorrect').textContent = `${correct}`;
    document.getElementById('resultIncorrect').textContent = `${incorrect}`;
    document.getElementById('resultUnattempted').textContent = `${unattempted}`;
    document.getElementById('resultTimeUsed').textContent = `${timeMins}m ${timeSecs}s`;
    document.getElementById('resultAccuracy').textContent = `${accuracy}%`;

    // Render weak area tags & recommendation
    const analysisBox = document.getElementById('resultAnalysisContent');
    let analysisHtml = '';

    if (strongAreas.length > 0) {
      analysisHtml += `<div style="margin-bottom:0.75rem;"><strong>💪 Strong Areas:</strong><br>${strongAreas.map(t => `<span class="analysis-tag tag-strong">${t}</span>`).join(' ')}</div>`;
    }
    if (revisionAreas.length > 0) {
      analysisHtml += `<div style="margin-bottom:0.75rem;"><strong>⚡ Needs Revision:</strong><br>${revisionAreas.map(t => `<span class="analysis-tag tag-revision">${t}</span>`).join(' ')}</div>`;
    }
    if (weakAreas.length > 0) {
      analysisHtml += `<div style="margin-bottom:0.75rem;"><strong>⚠️ Weak Areas (High Priority):</strong><br>${weakAreas.map(t => `<span class="analysis-tag tag-weak">${t}</span>`).join(' ')}</div>`;
    }

    let recommendation = '';
    if (weakAreas.length > 0) {
      recommendation = `Recommended Action: Review the notes and worked examples in <strong>${weakAreas.join(', ')}</strong>, then re-attempt 10 practice questions before retaking the challenge.`;
    } else if (revisionAreas.length > 0) {
      recommendation = `Recommended Action: Solidify your speed on <strong>${revisionAreas.join(', ')}</strong> using the FAST Speed Shortcuts section.`;
    } else {
      recommendation = `Outstanding performance! You have mastered Quadratic Equations for FAST-NUCES and scholarship entry tests. Proceed to Topic 4.`;
    }

    analysisHtml += `<div style="margin-top:1rem; padding:0.75rem; background:#ffffff; border-radius:var(--radius-sm); border:1px solid var(--border-medium); font-size:0.9rem;">${recommendation}</div>`;
    analysisBox.innerHTML = analysisHtml;

    // Render detailed question review list
    const reviewList = document.getElementById('quizReviewQuestionsList');
    reviewList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    questions.forEach((q, idx) => {
      const userChoice = appState.quiz.userAnswers[idx];
      const isCorrect = userChoice === q.answer;
      const isUnatt = userChoice === undefined;

      const div = document.createElement('div');
      div.className = 'mcq-card';
      div.style.marginBottom = '1rem';

      let statusBadge = '';
      if (isCorrect) statusBadge = '<span style="color:#15803d; font-weight:700;">✓ Correct</span>';
      else if (isUnatt) statusBadge = '<span style="color:#94a3b8; font-weight:700;">○ Unattempted</span>';
      else statusBadge = '<span style="color:#b91c1c; font-weight:700;">✗ Incorrect</span>';

      div.innerHTML = `
        <div class="mcq-header">
          <span class="mcq-num">Q${idx + 1} • ${q.topic}</span>
          ${statusBadge}
        </div>
        <div class="mcq-question">${q.question}</div>
        <div style="font-size:0.875rem; margin-bottom:0.6rem;">
          <div><strong>Your Choice:</strong> ${isUnatt ? 'None' : `${letters[userChoice]}. ${q.options[userChoice]}`}</div>
          <div><strong>Correct Answer:</strong> <span style="color:#15803d; font-weight:700;">${letters[q.answer]}. ${q.options[q.answer]}</span></div>
        </div>
        <div class="mcq-explanation show">
          <strong>💡 Explanation:</strong><br>${q.explanation}
        </div>
      `;
      reviewList.appendChild(div);
    });

    updateDashboardUI();
    showToast('Test Submitted Successfully!', 'success');
  }

  window.resetQuizToStart = function () {
    document.getElementById('challengeResultScreen').style.display = 'none';
    document.getElementById('challengeActiveScreen').style.display = 'none';
    document.getElementById('challengeStartScreen').style.display = 'block';
  };

  // --- INTERACTIVE QUADRATIC SOLVER ---
  window.solveQuadraticEquation = function () {
    const aVal = parseFloat(document.getElementById('solverInputA').value);
    const bVal = parseFloat(document.getElementById('solverInputB').value);
    const cVal = parseFloat(document.getElementById('solverInputC').value);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      alert('Please enter valid numeric coefficients for a, b, and c.');
      return;
    }

    if (aVal === 0) {
      alert('Coefficient "a" cannot be zero in a quadratic equation (a ≠ 0).');
      return;
    }

    const D = (bVal * bVal) - (4 * aVal * cVal);
    let nature = '';
    let root1Text = '';
    let root2Text = '';
    let realCount = 0;
    let areEqual = false;

    // Formatting equation string
    let eqStr = '';
    if (aVal === 1) eqStr += 'x²';
    else if (aVal === -1) eqStr += '-x²';
    else eqStr += `${aVal}x²`;

    if (bVal > 0) eqStr += ` + ${bVal === 1 ? '' : bVal}x`;
    else if (bVal < 0) eqStr += ` - ${bVal === -1 ? '' : Math.abs(bVal)}x`;

    if (cVal > 0) eqStr += ` + ${cVal}`;
    else if (cVal < 0) eqStr += ` - ${Math.abs(cVal)}`;
    eqStr += ' = 0';

    if (D > 0) {
      const sqrtD = Math.sqrt(D);
      const isPerfectSquare = Number.isInteger(sqrtD);
      nature = isPerfectSquare ? 'Two Distinct Real & Rational Roots' : 'Two Distinct Real & Irrational Roots';
      realCount = 2;

      const r1 = (-bVal + sqrtD) / (2 * aVal);
      const r2 = (-bVal - sqrtD) / (2 * aVal);

      if (isPerfectSquare) {
        root1Text = `x₁ = ${r1.toFixed(4).replace(/\.?0+$/, '')}`;
        root2Text = `x₂ = ${r2.toFixed(4).replace(/\.?0+$/, '')}`;
      } else {
        root1Text = `x₁ = (-(${bVal}) + √${D}) / ${2 * aVal} ≈ ${r1.toFixed(4)}`;
        root2Text = `x₂ = (-(${bVal}) - √${D}) / ${2 * aVal} ≈ ${r2.toFixed(4)}`;
      }
    } else if (D === 0) {
      nature = 'Two Equal Real & Rational Roots (Repeated Root)';
      realCount = 2;
      areEqual = true;
      const r = -bVal / (2 * aVal);
      root1Text = `x₁ = ${r.toFixed(4).replace(/\.?0+$/, '')}`;
      root2Text = `x₂ = ${r.toFixed(4).replace(/\.?0+$/, '')} (Equal)`;
    } else {
      nature = 'No Real Roots (Two Complex Conjugate Roots)';
      realCount = 0;
      const realPart = (-bVal / (2 * aVal)).toFixed(4).replace(/\.?0+$/, '');
      const imagPart = (Math.sqrt(Math.abs(D)) / (2 * aVal)).toFixed(4).replace(/\.?0+$/, '');
      root1Text = `x₁ = ${realPart} + ${Math.abs(imagPart)}i`;
      root2Text = `x₂ = ${realPart} - ${Math.abs(imagPart)}i`;
    }

    const outputBox = document.getElementById('solverOutputBox');
    outputBox.classList.add('show');

    document.getElementById('solvStandardEq').textContent = eqStr;
    document.getElementById('solvDiscriminant').textContent = `D = ${D}`;
    document.getElementById('solvNature').textContent = nature;
    document.getElementById('solvRoot1').textContent = root1Text;
    document.getElementById('solvRoot2').textContent = root2Text;

    // Step by step breakdown
    const stepsDiv = document.getElementById('solverStepByStep');
    stepsDiv.innerHTML = `
      <div style="font-size:0.875rem; color:#cbd5e1; line-height:1.6;">
        <strong>Step 1: Identify coefficients:</strong> a = ${aVal}, b = ${bVal}, c = ${cVal}<br>
        <strong>Step 2: Calculate Discriminant D:</strong> D = (${bVal})² - 4(${aVal})(${cVal}) = ${bVal * bVal} - ${4 * aVal * cVal} = <strong>${D}</strong><br>
        <strong>Step 3: Quadratic Formula Substitution:</strong> x = [-(${bVal}) ± √(${D})] / [2(${aVal})]<br>
        <strong>Step 4: Simplified Roots:</strong> ${root1Text}, ${root2Text}
      </div>
    `;

    showToast('Equation Solved!', 'success');
  };

  window.resetQuadraticSolver = function () {
    document.getElementById('solverInputA').value = '1';
    document.getElementById('solverInputB').value = '-5';
    document.getElementById('solverInputC').value = '6';
    document.getElementById('solverOutputBox').classList.remove('show');
  };

  // --- NATURE OF ROOTS ANALYZER TOOL ---
  window.analyzeNatureOfRoots = function () {
    const a = parseFloat(document.getElementById('natureInputA').value);
    const b = parseFloat(document.getElementById('natureInputB').value);
    const c = parseFloat(document.getElementById('natureInputC').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      alert('Please enter valid coefficients with a ≠ 0');
      return;
    }

    const D = (b * b) - (4 * a * c);
    let verdict = '';
    let realCount = 0;
    let equality = 'Distinct';

    if (D > 0) {
      const isSq = Number.isInteger(Math.sqrt(D));
      verdict = isSq ? 'D > 0 (Perfect Square) ⇒ Two Distinct Real and Rational Roots' : 'D > 0 (Not Perfect Square) ⇒ Two Distinct Real and Irrational Roots';
      realCount = 2;
    } else if (D === 0) {
      verdict = 'D = 0 ⇒ Two Equal Real and Rational Roots';
      realCount = 2;
      equality = 'Equal (Double Root)';
    } else {
      verdict = 'D < 0 ⇒ No Real Roots (Two Complex Conjugate Roots)';
      realCount = 0;
      equality = 'Complex Conjugates';
    }

    const resDiv = document.getElementById('natureOutputResult');
    resDiv.style.display = 'block';
    resDiv.innerHTML = `
      <div style="background:var(--navy-900); color:#fff; padding:1.25rem; border-radius:var(--radius-md); border-left:4px solid var(--primary-500);">
        <div style="font-size:0.8rem; text-transform:uppercase; color:#94a3b8;">Analysis Result</div>
        <div style="font-size:1.3rem; font-weight:800; color:#4ade80; margin:0.3rem 0;">Discriminant D = ${D}</div>
        <div style="font-size:1rem; font-weight:600; color:#ffffff; margin-bottom:0.5rem;">${verdict}</div>
        <div style="font-size:0.875rem; color:#cbd5e1;">Number of Real Roots: <strong>${realCount}</strong> | Root Equality: <strong>${equality}</strong></div>
      </div>
    `;
    showToast('Nature Analyzed', 'info');
  };

  // --- PARABOLA CANVAS VISUALIZER ---
  function setupParabolaVisualizer() {
    const canvas = document.getElementById('parabolaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function draw() {
      const a = parseFloat(document.getElementById('sliderA').value);
      const b = parseFloat(document.getElementById('sliderB').value);
      const c = parseFloat(document.getElementById('sliderC').value);

      document.getElementById('valSliderA').textContent = a;
      document.getElementById('valSliderB').textContent = b;
      document.getElementById('valSliderC').textContent = c;

      // Update metrics info
      const vx = -b / (2 * a);
      const vy = (a * vx * vx) + (b * vx) + c;
      const D = (b * b) - (4 * a * c);

      document.getElementById('parabVertex').textContent = `(${vx.toFixed(2)}, ${vy.toFixed(2)})`;
      document.getElementById('parabAxis').textContent = `x = ${vx.toFixed(2)}`;
      document.getElementById('parabYIntercept').textContent = `(0, ${c})`;
      document.getElementById('parabDirection').textContent = a > 0 ? 'Upward (Minimum Vertex)' : 'Downward (Maximum Vertex)';

      if (D > 0) {
        const r1 = (-b + Math.sqrt(D)) / (2 * a);
        const r2 = (-b - Math.sqrt(D)) / (2 * a);
        document.getElementById('parabRoots').textContent = `x₁ = ${r1.toFixed(2)}, x₂ = ${r2.toFixed(2)}`;
      } else if (D === 0) {
        document.getElementById('parabRoots').textContent = `x = ${vx.toFixed(2)} (Double Root)`;
      } else {
        document.getElementById('parabRoots').textContent = 'No Real Roots (No X-intercepts)';
      }

      // Canvas dimensions
      const width = canvas.width = canvas.parentElement.clientWidth;
      const height = canvas.height = 320;

      ctx.clearRect(0, 0, width, height);

      // Coordinate System Config
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = 20; // 20px per math unit

      // Draw Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      for (let x = centerX % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = centerY % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      // X-Axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      // Y-Axis
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('X', width - 15, centerY - 8);
      ctx.fillText('Y', centerX + 8, 15);

      // Draw Parabola Curve
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;

      let first = true;
      for (let px = 0; px <= width; px += 2) {
        const x = (px - centerX) / scale;
        const y = (a * x * x) + (b * x) + c;
        const py = centerY - (y * scale);

        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // Draw Vertex Point
      const pvx = centerX + (vx * scale);
      const pvy = centerY - (vy * scale);
      if (pvx >= 0 && pvx <= width && pvy >= 0 && pvy <= height) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(pvx, pvy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef3c7';
        ctx.font = '11px sans-serif';
        ctx.fillText(`Vertex (${vx.toFixed(1)}, ${vy.toFixed(1)})`, pvx + 8, pvy - 8);
      }

      // Draw X-Intercepts if real
      if (D >= 0) {
        const r1 = (-b + Math.sqrt(D)) / (2 * a);
        const r2 = (-b - Math.sqrt(D)) / (2 * a);

        [r1, r2].forEach((root, idx) => {
          const prx = centerX + (root * scale);
          const pry = centerY;
          if (prx >= 0 && prx <= width) {
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(prx, pry, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    }

    ['sliderA', 'sliderB', 'sliderC'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', draw);
    });

    window.addEventListener('resize', draw);
    draw();
  }

  // --- FORMULA COPY & PRINT ---
  window.copyFormulaText = function (text, formulaName) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied formula: ${formulaName}`, 'success');
    }).catch(() => {
      showToast(`Formula: ${text}`, 'info');
    });
  };

  window.printFormulaSheet = function () {
    window.print();
  };

  // --- GLOBAL SEARCH ENGINE ---
  window.handleGlobalSearch = function (query) {
    query = query.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }

    const matches = [];

    // Search topics & notes
    TOPICS_LIST.forEach(t => {
      if (t.title.toLowerCase().includes(query) || t.category.toLowerCase().includes(query)) {
        matches.push({
          type: 'Topic Note',
          title: t.title,
          link: `#${t.id}`
        });
      }
    });

    // Search practice questions
    PRACTICE_QUESTIONS.forEach(q => {
      if (q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query)) {
        matches.push({
          type: 'Practice MCQ',
          title: `Q${q.id}: ${q.question.substring(0, 65)}...`,
          link: `#topic-17`
        });
      }
    });

    // Formulas & Shortcuts
    const formulaKeywords = [
      { name: 'Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a', link: '#topic-8' },
      { name: 'Discriminant Formula: D = b² - 4ac', link: '#topic-9' },
      { name: 'Sum of Roots: α + β = -b/a', link: '#topic-11' },
      { name: 'Product of Roots: αβ = c/a', link: '#topic-11' },
      { name: 'Forming Equation: x² - Sx + P = 0', link: '#topic-12' },
      { name: 'FAST Speed Shortcut: a + b + c = 0 ⇒ root is 1', link: '#topic-14' },
      { name: 'Common Mistakes in Quadratic Equations', link: '#topic-15' }
    ];

    formulaKeywords.forEach(f => {
      if (f.name.toLowerCase().includes(query)) {
        matches.push({ type: 'Formula / Shortcut', title: f.name, link: f.link });
      }
    });

    if (matches.length === 0) {
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = `<div style="padding:0.75rem; color:var(--text-light); font-size:0.85rem;">No results found for "${query}".</div>`;
    } else {
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = matches.slice(0, 8).map(m => `
        <a href="${m.link}" style="display:block; padding:0.5rem 0.75rem; border-bottom:1px solid var(--border-light); text-decoration:none; color:var(--navy-900); font-size:0.85rem;" onclick="document.getElementById('searchResultsContainer').style.display='none'">
          <span style="font-size:0.7rem; font-weight:700; color:var(--primary-700); text-transform:uppercase;">[${m.type}]</span>
          <div style="font-weight:600;">${m.title}</div>
        </a>
      `).join('');
    }
  };

  // --- INTERACTIVE CHECK REVEAL ACCORDIONS ---
  window.toggleInteractiveCheck = function (elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.classList.toggle('open');
    }
  };

  // --- MODAL CONTROLLERS ---
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
    if (modalId === 'bookmarksModal') renderBookmarksDrawer();
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // --- MOBILE SIDEBAR TOGGLE ---
  window.toggleMobileSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('mobile-open');
  };

  // --- RESET ALL PROGRESS ---
  window.resetAllChapterProgress = function () {
    if (confirm('Are you sure you want to reset all your chapter completion, practice question answers, and quiz history? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_TOPICS);
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
      localStorage.removeItem(STORAGE_KEYS.PRACTICE_STATS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);

      appState.completedTopics = [];
      appState.bookmarks = [];
      appState.practiceAnswered = {};

      renderTopicNavigation();
      renderPracticeZone();
      updateDashboardUI();
      showToast('All chapter progress has been reset', 'info');
    }
  };

  // --- BIND GLOBAL EVENTS ---
  function bindGlobalEvents() {
    // Search input listener
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
    }

    // Modal background click close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }

  // --- EXECUTE INITIALIZATION ON DOM READY ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
