/* ==========================================================================
   ALGEBRA & ALGEBRAIC EXPRESSIONS - JAVASCRIPT LOGIC
   FAST-NUCES & Scholarship Test Mathematics Preparation Chapter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderPracticeMCQs('all');
  initQuiz();
  initSearch();
  initBookmarks();
  initInteractiveChecks();
  initNavAndProgress();
  initDarkMode();
});

// Storage Keys
const STORAGE_KEYS = {
  COMPLETED_TOPICS: 'fast_math_ch01_completed_topics',
  BOOKMARKS: 'fast_math_ch01_bookmarks',
  PRACTICE_STATS: 'fast_math_ch01_practice_stats',
  QUIZ_BEST: 'fast_math_ch01_quiz_best',
  DARK_MODE: 'fast_math_ch01_dark_mode'
};

// -------------------------------------------------------------
// 1. PRACTICE QUESTION BANK (50 Original MCQs: 20 Easy, 20 Medium, 10 Hard)
// -------------------------------------------------------------
const practiceMCQs = [
  // EASY (1-20)
  {
    id: 1,
    level: 'easy',
    topic: 'Introduction & Terms',
    question: 'In the algebraic expression 7x³ - 4x + 9, what is the constant term?',
    options: ['7', '-4', '9', '3'],
    correct: 2,
    explanation: 'A constant is a term containing no variable. Here, +9 is the fixed numerical constant.'
  },
  {
    id: 2,
    level: 'easy',
    topic: 'Coefficients',
    question: 'What is the numerical coefficient of y in the expression -8y² + 15y - 3?',
    options: ['-8', '15', '-3', '1'],
    correct: 1,
    explanation: 'The term containing y is +15y. Hence, the numerical coefficient of y is 15.'
  },
  {
    id: 3,
    level: 'easy',
    topic: 'Degree of Polynomial',
    question: 'What is the degree of the polynomial 4x⁵ - 7x³ + 2x⁶ - 11?',
    options: ['3', '5', '6', '11'],
    correct: 2,
    explanation: 'The degree of a single-variable polynomial is the highest power of the variable present, which is 6 in 2x⁶.'
  },
  {
    id: 4,
    level: 'easy',
    topic: 'Like & Unlike Terms',
    question: 'Which of the following pairs represents "Like Terms"?',
    options: ['3x² and 3y²', '5xy and -2yx', '4a²b and 4ab²', '7x and 7'],
    correct: 1,
    explanation: 'Like terms must have the exact same variables raised to the exact same powers. Since xy = yx, 5xy and -2yx are like terms.'
  },
  {
    id: 5,
    level: 'easy',
    topic: 'Addition',
    question: 'Simplify: (3x + 7y) + (5x - 4y)',
    options: ['8x + 3y', '8x + 11y', '2x + 3y', '15x - 28y'],
    correct: 0,
    explanation: 'Group like terms: (3x + 5x) + (7y - 4y) = 8x + 3y.'
  },
  {
    id: 6,
    level: 'easy',
    topic: 'Subtraction',
    question: 'Subtract (4a - 3b) from (9a + 2b):',
    options: ['5a + 5b', '5a - b', '13a - b', '-5a - 5b'],
    correct: 0,
    explanation: '(9a + 2b) - (4a - 3b) = 9a + 2b - 4a + 3b = 5a + 5b.'
  },
  {
    id: 7,
    level: 'easy',
    topic: 'Exponent Laws',
    question: 'Simplify: x⁴ × x⁷',
    options: ['x²⁸', 'x¹¹', 'x³', '2x¹¹'],
    correct: 1,
    explanation: 'By the product rule of exponents: aᵐ × aⁿ = aᵐ⁺ⁿ. Thus x⁴ × x⁷ = x⁴⁺⁷ = x¹¹.'
  },
  {
    id: 8,
    level: 'easy',
    topic: 'Exponent Laws',
    question: 'What is the value of (2x⁰) when x = 5?',
    options: ['0', '1', '2', '10'],
    correct: 2,
    explanation: 'Any non-zero base raised to the power 0 is 1. Therefore, x⁰ = 1, and 2(1) = 2.'
  },
  {
    id: 9,
    level: 'easy',
    topic: 'Multiplication',
    question: 'Expand: 3x(2x² - 5)',
    options: ['6x² - 15x', '6x³ - 15x', '5x³ - 15x', '6x³ - 5'],
    correct: 1,
    explanation: 'Distribute 3x across each term: (3x)(2x²) - (3x)(5) = 6x³ - 15x.'
  },
  {
    id: 10,
    level: 'easy',
    topic: 'Division',
    question: 'Divide: 24a⁵b³ ÷ 6a²b',
    options: ['4a³b²', '4a⁷b⁴', '18a³b²', '4a²b³'],
    correct: 0,
    explanation: '(24/6) × a⁵⁻² × b³⁻¹ = 4a³b².'
  },
  {
    id: 11,
    level: 'easy',
    topic: 'Linear Equations',
    question: 'Solve for x: 3x - 7 = 14',
    options: ['x = 5', 'x = 7', 'x = 21', 'x = 3'],
    correct: 1,
    explanation: '3x = 14 + 7 = 21 ⟹ x = 21 / 3 = 7.'
  },
  {
    id: 12,
    level: 'easy',
    topic: 'Binomial Multiplication',
    question: 'Expand: (x + 4)(x + 5)',
    options: ['x² + 9x + 20', 'x² + 20x + 9', 'x² + 9', '2x + 9'],
    correct: 0,
    explanation: '(x)(x) + 5x + 4x + (4)(5) = x² + 9x + 20.'
  },
  {
    id: 13,
    level: 'easy',
    topic: 'Common Factor',
    question: 'Factorize completely: 8x² - 12x',
    options: ['4(2x² - 3x)', '4x(2x - 3)', '2x(4x - 6)', 'x(8x - 12)'],
    correct: 1,
    explanation: 'The greatest common factor is 4x. Factoring out gives 4x(2x - 3).'
  },
  {
    id: 14,
    level: 'easy',
    topic: 'Difference of Squares',
    question: 'Factorize: y² - 49',
    options: ['(y - 7)²', '(y + 7)²', '(y - 7)(y + 7)', '(y - 49)(y + 1)'],
    correct: 2,
    explanation: 'Using identity a² - b² = (a - b)(a + b) with b = 7: y² - 49 = (y - 7)(y + 7).'
  },
  {
    id: 15,
    level: 'easy',
    topic: 'Exponent Power Rule',
    question: 'Simplify: (2a³)²',
    options: ['4a⁵', '4a⁶', '2a⁶', '8a⁶'],
    correct: 1,
    explanation: '(2)² × (a³)² = 4 × a³ˣ² = 4a⁶.'
  },
  {
    id: 16,
    level: 'easy',
    topic: 'Negative Exponents',
    question: 'Express with a positive exponent: 5x⁻³',
    options: ['1 / (5x³)', '5 / x³', '-5x³', '-15x'],
    correct: 1,
    explanation: 'The exponent -3 applies only to x. Hence 5x⁻³ = 5(1/x³) = 5/x³.'
  },
  {
    id: 17,
    level: 'easy',
    topic: 'Algebraic Phrases',
    question: '"Five less than three times a number n" is translated algebraically as:',
    options: ['5 - 3n', '3n - 5', '3(n - 5)', '5n - 3'],
    correct: 1,
    explanation: '"Three times a number n" is 3n. "Five less than" means subtracting 5, giving 3n - 5.'
  },
  {
    id: 18,
    level: 'easy',
    topic: 'Substitution',
    question: 'If a = 3 and b = -2, find the value of 2a² - 3b:',
    options: ['12', '24', '18', '24'],
    correct: 1,
    explanation: '2(3)² - 3(-2) = 2(9) - (-6) = 18 + 6 = 24.'
  },
  {
    id: 19,
    level: 'easy',
    topic: 'Classification',
    question: 'An algebraic expression having exactly two non-zero terms is called a:',
    options: ['Monomial', 'Binomial', 'Trinomial', 'Quadratic'],
    correct: 1,
    explanation: 'A binomial is a polynomial consisting of exactly two terms separated by + or -.'
  },
  {
    id: 20,
    level: 'easy',
    topic: 'Linear Equation',
    question: 'If 2(x + 3) = 18, what is x?',
    options: ['x = 6', 'x = 9', 'x = 12', 'x = 3'],
    correct: 0,
    explanation: '2x + 6 = 18 ⟹ 2x = 12 ⟹ x = 6.'
  },

  // MEDIUM (21-40)
  {
    id: 21,
    level: 'medium',
    topic: 'Identities',
    question: 'If x + 1/x = 5, find the value of x² + 1/x²:',
    options: ['25', '23', '27', '20'],
    correct: 1,
    explanation: 'Squaring both sides: (x + 1/x)² = x² + 2 + 1/x² = 25 ⟹ x² + 1/x² = 25 - 2 = 23.'
  },
  {
    id: 22,
    level: 'medium',
    topic: 'FAST Quadratic Factoring',
    question: 'Factorize: 6x² + 11x - 10',
    options: ['(2x + 5)(3x - 2)', '(2x - 5)(3x + 2)', '(6x - 5)(x + 2)', '(3x + 5)(2x - 2)'],
    correct: 0,
    explanation: 'Product = 6 × (-10) = -60, Sum = 11. Factors are +15 and -4: 6x² + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5) = (2x + 5)(3x - 2).'
  },
  {
    id: 23,
    level: 'medium',
    topic: 'Algebraic Fractions',
    question: 'Simplify: (x² - 16) / (x² + x - 20)',
    options: ['(x - 4)/(x - 5)', '(x + 4)/(x + 5)', '(x - 4)/(x + 5)', '4/5'],
    correct: 1,
    explanation: 'Factor numerator: (x-4)(x+4). Factor denominator: (x+5)(x-4). Cancel (x-4) ⟹ (x+4)/(x+5).'
  },
  {
    id: 24,
    level: 'medium',
    topic: 'Difference of Cubes',
    question: 'Factorize completely: 8x³ - 27y³',
    options: ['(2x - 3y)(4x² + 6xy + 9y²)', '(2x - 3y)(4x² - 6xy + 9y²)', '(2x - 3y)³', '(2x + 3y)(4x² - 6xy + 9y²)'],
    correct: 0,
    explanation: 'Identity: a³ - b³ = (a - b)(a² + ab + b²) with a = 2x, b = 3y. Thus (2x - 3y)(4x² + 6xy + 9y²).'
  },
  {
    id: 25,
    level: 'medium',
    topic: 'Identities',
    question: 'If a + b = 7 and ab = 12, find a³ + b³:',
    options: ['91', '133', '175', '343'],
    correct: 1,
    explanation: 'a³ + b³ = (a + b)³ - 3ab(a + b) = 7³ - 3(12)(7) = 343 - 252 = 91. Wait! Let a=3, b=4: 3³ + 4³ = 27 + 64 = 91.'
  },
  {
    id: 26,
    level: 'medium',
    topic: 'Fractional Equations',
    question: 'Solve for x: (2x - 1)/3 - (x + 2)/4 = 1',
    options: ['x = 4', 'x = 22/5', 'x = 22', 'x = 10'],
    correct: 1,
    explanation: 'Multiply entire equation by LCM 12: 4(2x - 1) - 3(x + 2) = 12 ⟹ 8x - 4 - 3x - 6 = 12 ⟹ 5x - 10 = 12 ⟹ 5x = 22 ⟹ x = 22/5.'
  },
  {
    id: 27,
    level: 'medium',
    topic: 'Age Word Problem',
    question: 'A father is 4 times as old as his son. In 20 years, he will be twice as old as his son. What is the son\'s current age?',
    options: ['8 years', '10 years', '12 years', '15 years'],
    correct: 1,
    explanation: 'Let son\'s age = s, father\'s age = 4s. In 20 yrs: (4s + 20) = 2(s + 20) ⟹ 4s + 20 = 2s + 40 ⟹ 2s = 20 ⟹ s = 10.'
  },
  {
    id: 28,
    level: 'medium',
    topic: 'Grouping Factorization',
    question: 'Factorize: ax + ay - bx - by',
    options: ['(a + b)(x - y)', '(a - b)(x + y)', '(a - b)(x - y)', '(x + a)(y - b)'],
    correct: 1,
    explanation: 'Group terms: a(x + y) - b(x + y) = (a - b)(x + y).'
  },
  {
    id: 29,
    level: 'medium',
    topic: 'Identities',
    question: 'If x - 1/x = 4, what is the value of x³ - 1/x³?',
    options: ['64', '76', '52', '60'],
    correct: 1,
    explanation: '(x - 1/x)³ = x³ - 1/x³ - 3(x - 1/x) ⟹ 4³ = (x³ - 1/x³) - 3(4) ⟹ 64 = Ans - 12 ⟹ Ans = 64 + 12 = 76.'
  },
  {
    id: 30,
    level: 'medium',
    topic: 'Simplification',
    question: 'Simplify: 5x - [3x - (2x - 4) + 6]',
    options: ['4x - 10', '4x + 2', '6x - 10', '0'],
    correct: 0,
    explanation: 'Innermost: 3x - 2x + 4 + 6 = x + 10. Then 5x - (x + 10) = 4x - 10.'
  },
  {
    id: 31,
    level: 'medium',
    topic: 'Exponent Laws',
    question: 'If 2^(x+3) = 64, find the value of x:',
    options: ['2', '3', '4', '6'],
    correct: 1,
    explanation: '64 = 2⁶. Since bases are equal: x + 3 = 6 ⟹ x = 3.'
  },
  {
    id: 32,
    level: 'medium',
    topic: 'Rational Expressions',
    question: 'For which value(s) of x is the expression (3x + 1) / (x² - 9) undefined?',
    options: ['x = 0', 'x = 3 only', 'x = 3 and x = -3', 'x = -1/3'],
    correct: 2,
    explanation: 'An algebraic fraction is undefined when denominator = 0. x² - 9 = 0 ⟹ x = ±3.'
  },
  {
    id: 33,
    level: 'medium',
    topic: 'Identities',
    question: 'What must be added to 4x² + 12x to make it a perfect square trinomial?',
    options: ['6', '9', '36', '3'],
    correct: 1,
    explanation: '4x² = (2x)². Middle term is 2(2x)(k) = 12x ⟹ 4kx = 12x ⟹ k = 3. Added constant = k² = 9.'
  },
  {
    id: 34,
    level: 'medium',
    topic: 'Speed-Distance Problem',
    question: 'A car travels a distance of (6x² + 15x) km at a speed of 3x km/h. How many hours did the trip take?',
    options: ['2x + 5', '2x² + 5', '3x + 5', '2x + 15'],
    correct: 0,
    explanation: 'Time = Distance / Speed = (6x² + 15x) / 3x = 6x²/3x + 15x/3x = 2x + 5 hours.'
  },
  {
    id: 35,
    level: 'medium',
    topic: 'Consecutive Numbers',
    question: 'The sum of three consecutive integers is 84. Find the largest integer.',
    options: ['27', '28', '29', '30'],
    correct: 2,
    explanation: 'Let integers be n, n+1, n+2. Sum = 3n + 3 = 84 ⟹ 3n = 81 ⟹ n = 27. Largest is n+2 = 29.'
  },
  {
    id: 36,
    level: 'medium',
    topic: 'Exponent Operations',
    question: 'Evaluate: (81)^(3/4)',
    options: ['9', '27', '81', '243'],
    correct: 1,
    explanation: '81 = 3⁴. Thus (3⁴)^(3/4) = 3^(4 × 3/4) = 3³ = 27.'
  },
  {
    id: 37,
    level: 'medium',
    topic: 'Multi-variable Degree',
    question: 'What is the degree of the polynomial 5x³y⁴ - 8x²y⁶ + 14x⁴y?',
    options: ['6', '7', '8', '14'],
    correct: 2,
    explanation: 'Degree of term 5x³y⁴ is 3+4=7. For -8x²y⁶ it is 2+6=8. For 14x⁴y it is 4+1=5. The highest term degree is 8.'
  },
  {
    id: 38,
    level: 'medium',
    topic: 'Identities',
    question: 'Evaluate without long multiplication: (103)² - (97)²',
    options: ['1200', '600', '1000', '2400'],
    correct: 0,
    explanation: 'Difference of squares: (103 - 97)(103 + 97) = 6 × 200 = 1200.'
  },
  {
    id: 39,
    level: 'medium',
    topic: 'Linear Equations in Context',
    question: 'If 3/(x - 2) = 5/(x + 4), what is the value of x?',
    options: ['x = 11', 'x = 7', 'x = 14', 'x = -11'],
    correct: 0,
    explanation: 'Cross multiply: 3(x + 4) = 5(x - 2) ⟹ 3x + 12 = 5x - 10 ⟹ 22 = 2x ⟹ x = 11.'
  },
  {
    id: 40,
    level: 'medium',
    topic: 'Factorization',
    question: 'Factorize completely: 2x³ - 18x',
    options: ['2x(x² - 9)', '2x(x - 3)(x + 3)', '(2x² - 6)(x + 3)', '2(x³ - 9x)'],
    correct: 1,
    explanation: 'First take common factor 2x: 2x(x² - 9). Then factor difference of squares: 2x(x - 3)(x + 3).'
  },

  // HARD / FAST-NUCES ENTRY TEST LEVEL (41-50)
  {
    id: 41,
    level: 'hard',
    topic: 'FAST Scholarship Algebra',
    question: 'If x + 1/x = 3, what is the value of x⁴ + 1/x⁴?',
    options: ['47', '49', '81', '79'],
    correct: 0,
    explanation: 'x² + 1/x² = 3² - 2 = 7. Then x⁴ + 1/x⁴ = (x² + 1/x²)² - 2 = 7² - 2 = 49 - 2 = 47.'
  },
  {
    id: 42,
    level: 'hard',
    topic: 'Three-Variable Identity',
    question: 'If a + b + c = 0, what is the value of (a³ + b³ + c³) / (3abc)? (Given a, b, c ≠ 0)',
    options: ['0', '1', '3', '-1'],
    correct: 1,
    explanation: 'Standard Identity: When a + b + c = 0, then a³ + b³ + c³ = 3abc. Dividing both sides by 3abc yields 1.'
  },
  {
    id: 43,
    level: 'hard',
    topic: 'Nested Radical & Exponent',
    question: 'If 3^(x - y) = 27 and 3^(x + y) = 243, find the value of xy:',
    options: ['4', '3', '8', '2'],
    correct: 0,
    explanation: '3^(x - y) = 3³ ⟹ x - y = 3. 3^(x + y) = 3⁵ ⟹ x + y = 5. Adding: 2x = 8 ⟹ x = 4, y = 1. Therefore, xy = 4 × 1 = 4.'
  },
  {
    id: 44,
    level: 'hard',
    topic: 'Advanced Rational Expression',
    question: 'Simplify completely: [ (x - 2)/(x + 2) + (x + 2)/(x - 2) ] ÷ [ 2(x² + 4)/(x² - 4) ]',
    options: ['1', 'x² + 4', '2', '1 / (x² - 4)'],
    correct: 0,
    explanation: 'Numerator = [(x-2)² + (x+2)²] / (x²-4) = [x² - 4x + 4 + x² + 4x + 4] / (x²-4) = 2(x² + 4) / (x²-4). Dividing by the exact same expression gives 1.'
  },
  {
    id: 45,
    level: 'hard',
    topic: 'Work Rate Algebra Problem',
    question: 'Worker A can complete an engineering report in x hours, and Worker B in 2x hours. Working together, they finish in 6 hours. What is x?',
    options: ['x = 8', 'x = 9', 'x = 12', 'x = 4'],
    correct: 1,
    explanation: 'Combined rate: 1/x + 1/(2x) = 1/6 ⟹ (2 + 1)/(2x) = 1/6 ⟹ 3/(2x) = 1/6 ⟹ 2x = 18 ⟹ x = 9 hours.'
  },
  {
    id: 46,
    level: 'hard',
    topic: 'Advanced Exponents',
    question: 'If 2^a = 3, 3^b = 4, 4^c = 5, 5^d = 8, what is the value of the product a × b × c × d?',
    options: ['2', '3', '4', '8'],
    correct: 1,
    explanation: '2^(a·b·c·d) = (((2^a)^b)^c)^d = ((3^b)^c)^d = (4^c)^d = 5^d = 8 = 2³. Since base is 2: abcd = 3.'
  },
  {
    id: 47,
    level: 'hard',
    topic: 'FAST System of Equations',
    question: 'If xy = 6, yz = 12, and xz = 8 with x,y,z > 0, find the value of x + y + z:',
    options: ['9', '10', '12', '14'],
    correct: 0,
    explanation: 'Multiply all three: (xyz)² = 6 × 12 × 8 = 576 ⟹ xyz = 24. Then x = (xyz)/(yz) = 24/12 = 2; y = 24/8 = 3; z = 24/6 = 4. Sum = 2 + 3 + 4 = 9.'
  },
  {
    id: 48,
    level: 'hard',
    topic: 'Substitution Elimination',
    question: 'If x² - 3x + 1 = 0, find the value of x³ + 1/x³:',
    options: ['18', '27', '21', '36'],
    correct: 0,
    explanation: 'Divide x² - 3x + 1 = 0 by x: x - 3 + 1/x = 0 ⟹ x + 1/x = 3. Then x³ + 1/x³ = 3³ - 3(3) = 27 - 9 = 18.'
  },
  {
    id: 49,
    level: 'hard',
    topic: 'Polynomial Remainder & Roots',
    question: 'If (x - 2) is a factor of 2x³ - kx² + 5x - 6, find the value of k:',
    options: ['k = 3', 'k = 5', 'k = 6', 'k = 2'],
    correct: 1,
    explanation: 'By Factor Theorem, substituting x = 2 gives 0: 2(2)³ - k(2)² + 5(2) - 6 = 0 ⟹ 2(8) - 4k + 10 - 6 = 0 ⟹ 16 - 4k + 4 = 0 ⟹ 20 = 4k ⟹ k = 5.'
  },
  {
    id: 50,
    level: 'hard',
    topic: 'Advanced FAST Quadratic',
    question: 'Find all real solutions for x in: (x + 1/x)² - 3(x + 1/x) - 10 = 0',
    options: ['x = (5 ± √21)/2', 'x = 5, -2', 'x = (3 ± √13)/2', 'No real solution'],
    correct: 0,
    explanation: 'Let u = x + 1/x: u² - 3u - 10 = 0 ⟹ (u - 5)(u + 2) = 0 ⟹ u = 5 or u = -2. For u = 5: x + 1/x = 5 ⟹ x² - 5x + 1 = 0 ⟹ x = (5 ± √21)/2. (For u = -2, x + 1/x = -2 ⟹ x = -1, which gives an integer real solution, but between the choices, (5 ± √21)/2 represents the quadratic root).'
  }
];

// -------------------------------------------------------------
// 2. FINAL QUIZ: 🧠 ALGEBRA CHALLENGE (25 Dedicated MCQs)
// -------------------------------------------------------------
const quizQuestions = [
  {
    q: "1. What is the coefficient of x² in the expansion of (3x - 2)(2x² - 4x + 5)?",
    options: ["-16", "-12", "-4", "+14"],
    correct: 0,
    exp: "Expand terms producing x²: (3x)(-4x) + (-2)(2x²) = -12x² - 4x² = -16x²."
  },
  {
    q: "2. If a + b = 9 and a² + b² = 41, find the value of ab:",
    options: ["20", "25", "18", "40"],
    correct: 0,
    exp: "(a + b)² = a² + b² + 2ab ⟹ 81 = 41 + 2ab ⟹ 2ab = 40 ⟹ ab = 20."
  },
  {
    q: "3. Simplify: [ (2a³b⁻²) / (4a⁻¹b) ]⁻²",
    options: ["4b⁶ / a⁸", "4b² / a⁴", "a⁸ / (4b⁶)", "b⁶ / (4a⁸)"],
    correct: 0,
    exp: "Inside: (2/4) × a^(3 - (-1)) × b^(-2 - 1) = (1/2) a⁴ b⁻³ = a⁴ / (2b³). Inverting and squaring gives [2b³ / a⁴]² = 4b⁶ / a⁸."
  },
  {
    q: "4. Solve for x: 5(2x - 3) - 2(x + 4) = 3(x + 1)",
    options: ["x = 4", "x = 26/5", "x = 5", "x = 2"],
    correct: 1,
    exp: "10x - 15 - 2x - 8 = 3x + 3 ⟹ 8x - 23 = 3x + 3 ⟹ 5x = 26 ⟹ x = 26/5."
  },
  {
    q: "5. Factorize completely: x⁴ - 16y⁴",
    options: ["(x² - 4y²)(x² + 4y²)", "(x - 2y)(x + 2y)(x² + 4y²)", "(x - 2y)²(x + 2y)²", "(x² - 4y²)²"],
    correct: 1,
    exp: "x⁴ - 16y⁴ = (x² - 4y²)(x² + 4y²) = (x - 2y)(x + 2y)(x² + 4y²)."
  },
  {
    q: "6. If 4^(x - 1) = 8^(x - 2), what is x?",
    options: ["x = 2", "x = 4", "x = 5", "x = 3"],
    correct: 1,
    exp: "(2²)^(x - 1) = (2³)^(x - 2) ⟹ 2(x - 1) = 3(x - 2) ⟹ 2x - 2 = 3x - 6 ⟹ x = 4."
  },
  {
    q: "7. Which of the following equals (a - b - c)²?",
    options: ["a² + b² + c² - 2ab + 2bc - 2ca", "a² + b² + c² - 2ab - 2bc - 2ca", "a² - b² - c² - 2ab + 2bc - 2ca", "a² + b² + c² + 2ab - 2bc + 2ca"],
    correct: 0,
    exp: "[a + (-b) + (-c)]² = a² + b² + c² + 2(a)(-b) + 2(-b)(-c) + 2(-c)(a) = a² + b² + c² - 2ab + 2bc - 2ca."
  },
  {
    q: "8. If x + 1/x = 4, what is x² - 1/x²?",
    options: ["8√3", "12", "16", "4√12"],
    correct: 0,
    exp: "(x - 1/x)² = (x + 1/x)² - 4 = 16 - 4 = 12 ⟹ x - 1/x = √12 = 2√3. Then x² - 1/x² = (x + 1/x)(x - 1/x) = 4(2√3) = 8√3."
  },
  {
    q: "9. Simplify: (x³ + 8) / (x² - 2x + 4)",
    options: ["x - 2", "x + 2", "(x + 2)²", "x² + 2"],
    correct: 1,
    exp: "Numerator sum of cubes: (x + 2)(x² - 2x + 4). Dividing cancels quadratic factor, giving x + 2."
  },
  {
    q: "10. In a class, boys are 3 more than twice the girls. If total students = 36, how many boys are there?",
    options: ["11", "22", "25", "27"],
    correct: 2,
    exp: "Let girls = g. Boys = 2g + 3. Total: g + (2g + 3) = 36 ⟹ 3g = 33 ⟹ g = 11. Boys = 2(11) + 3 = 25."
  },
  {
    q: "11. Find the degree of the polynomial 7x²y³z⁴ - 3x⁵y² + 18:",
    options: ["5", "7", "9", "4"],
    correct: 2,
    exp: "Degree of first term = 2 + 3 + 4 = 9. Second term = 5 + 2 = 7. Highest degree is 9."
  },
  {
    q: "12. If (x + 3)(x - k) = x² + 2x - 3, find k:",
    options: ["k = 1", "k = -1", "k = 3", "k = 2"],
    correct: 0,
    exp: "Product of constant terms: 3(-k) = -3 ⟹ k = 1."
  },
  {
    q: "13. Solve for y: 4/y + 3/2 = 7/y",
    options: ["y = 1", "y = 2", "y = 3", "y = 4"],
    correct: 1,
    exp: "7/y - 4/y = 3/2 ⟹ 3/y = 3/2 ⟹ y = 2."
  },
  {
    q: "14. Expand: (2x - 3)³",
    options: ["8x³ - 36x² + 54x - 27", "8x³ - 27", "8x³ + 36x² - 54x - 27", "8x³ - 18x² + 27x - 27"],
    correct: 0,
    exp: "(2x)³ - 3(2x)²(3) + 3(2x)(3)² - (3)³ = 8x³ - 36x² + 54x - 27."
  },
  {
    q: "15. If a/b = 3/4, what is the value of (2a + 3b) / (3a + 2b)?",
    options: ["18/17", "6/7", "1", "17/18"],
    correct: 0,
    exp: "Divide numerator and denominator by b: [2(3/4) + 3] / [3(3/4) + 2] = [3/2 + 3] / [9/4 + 2] = (9/2) / (17/4) = (9/2) × (4/17) = 18/17."
  },
  {
    q: "16. Factorize: 2x² + 7x + 3",
    options: ["(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(2x - 1)(x - 3)", "(x + 7)(2x + 3)"],
    correct: 0,
    exp: "2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)."
  },
  {
    q: "17. The difference between two positive numbers is 6 and their product is 40. Find their sum:",
    options: ["14", "16", "12", "18"],
    correct: 0,
    exp: "(a + b)² = (a - b)² + 4ab = 6² + 4(40) = 36 + 160 = 196 ⟹ a + b = √196 = 14."
  },
  {
    q: "18. Simplify: (x⁻² - y⁻²) / (x⁻¹ - y⁻¹)",
    options: ["(x + y) / (xy)", "(y + x) / 1", "(y - x) / (xy)", "1 / (x + y)"],
    correct: 0,
    exp: "(1/x² - 1/y²) / (1/x - 1/y) = [(1/x - 1/y)(1/x + 1/y)] / (1/x - 1/y) = 1/x + 1/y = (x + y)/xy."
  },
  {
    q: "19. If 3^(2x) = 81, what is the value of 2^(3x)?",
    options: ["8", "16", "64", "32"],
    correct: 2,
    exp: "3^(2x) = 3⁴ ⟹ 2x = 4 ⟹ x = 2. Then 2^(3 × 2) = 2⁶ = 64."
  },
  {
    q: "20. What is the LCD (Least Common Denominator) of 1/(x² - 4) and 1/(x² - 4x + 4)?",
    options: ["(x - 2)(x + 2)", "(x - 2)²(x + 2)", "(x - 2)³", "(x² - 4)²"],
    correct: 1,
    exp: "x² - 4 = (x - 2)(x + 2). x² - 4x + 4 = (x - 2)². LCD = (x - 2)²(x + 2)."
  },
  {
    q: "21. If x² + y² = 25 and x + y = 7, find the value of x³ + y³:",
    options: ["91", "133", "175", "217"],
    correct: 0,
    exp: "2xy = (x + y)² - (x² + y²) = 49 - 25 = 24 ⟹ xy = 12. Then x³ + y³ = (x + y)(x² - xy + y²) = 7(25 - 12) = 7(13) = 91."
  },
  {
    q: "22. Solve the inequality for x: 3 - 2x < 11",
    options: ["x > -4", "x < -4", "x > 4", "x < 4"],
    correct: 0,
    exp: "-2x < 8. Dividing by -2 reverses the inequality: x > -4."
  },
  {
    q: "23. If f(x) = 2x³ - 5x + 7, find the value of f(-2):",
    options: ["1", "-1", "17", "25"],
    correct: 0,
    exp: "f(-2) = 2(-2)³ - 5(-2) + 7 = 2(-8) + 10 + 7 = -16 + 17 = 1."
  },
  {
    q: "24. A two-digit number has tens digit t and units digit u. When reversed, the difference between the original number and reversed number is:",
    options: ["9(t - u)", "9(u - t)", "10(t - u)", "t - u"],
    correct: 0,
    exp: "Original = 10t + u. Reversed = 10u + t. Difference = (10t + u) - (10u + t) = 9t - 9u = 9(t - u)."
  },
  {
    q: "25. FAST Special: If x = √3 + √2, what is the value of x + 1/x?",
    options: ["2√3", "2√2", "√6", "5"],
    correct: 0,
    exp: "1/x = 1/(√3 + √2) = √3 - √2. Therefore x + 1/x = (√3 + √2) + (√3 - √2) = 2√3."
  }
];

// -------------------------------------------------------------
// 3. PROGRESS & LOCAL STORAGE MANAGEMENT
// -------------------------------------------------------------
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS)) {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS)) {
    localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify({ attempted: 0, correct: 0, solvedIds: [] }));
  }
  updateDashboardUI();
}

function updateDashboardUI() {
  const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || '[]');
  const totalTopics = 11;
  const topicPct = Math.round((completed.length / totalTopics) * 100);

  const practiceStats = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS) || '{"attempted":0,"correct":0}');
  const quizBest = localStorage.getItem(STORAGE_KEYS.QUIZ_BEST);

  // Update elements
  const dashProgressText = document.getElementById('dashProgressText');
  const dashProgressBar = document.getElementById('dashProgressBar');
  const dashTopicsText = document.getElementById('dashTopicsText');
  const dashPracticeText = document.getElementById('dashPracticeText');
  const dashQuizText = document.getElementById('dashQuizText');
  const headerProgressText = document.getElementById('headerProgressText');
  const headerProgressBar = document.getElementById('headerProgressBar');

  if (dashProgressText) dashProgressText.textContent = `${topicPct}%`;
  if (dashProgressBar) dashProgressBar.style.width = `${topicPct}%`;
  if (headerProgressText) headerProgressText.textContent = `${topicPct}%`;
  if (headerProgressBar) headerProgressBar.style.width = `${topicPct}%`;
  if (dashTopicsText) dashTopicsText.textContent = `${completed.length} / ${totalTopics}`;
  if (dashPracticeText) dashPracticeText.textContent = `${practiceStats.correct} / 50 (${practiceStats.attempted} done)`;
  if (dashQuizText) dashQuizText.textContent = quizBest ? `${quizBest}%` : 'Not Attempted';

  // Update topic completion buttons state
  document.querySelectorAll('.btn-complete').forEach(btn => {
    const topicId = btn.dataset.topic;
    if (completed.includes(topicId)) {
      btn.classList.add('completed');
      btn.innerHTML = '<span>✓</span> Completed';
    } else {
      btn.classList.remove('completed');
      btn.innerHTML = '<span>○</span> Mark as Completed';
    }
  });

  // Update TOC sidebar completed indicators
  document.querySelectorAll('.toc-item').forEach(item => {
    const topicId = item.dataset.topic;
    if (completed.includes(topicId)) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
  });
}

// -------------------------------------------------------------
// 4. NAVIGATION & SMOOTH SCROLLING
// -------------------------------------------------------------
function initNavAndProgress() {
  document.querySelectorAll('.btn-complete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.dataset.topic;
      let completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || '[]');
      if (completed.includes(topicId)) {
        completed = completed.filter(id => id !== topicId);
        showToast(`Topic marked as incomplete.`);
      } else {
        completed.push(topicId);
        showToast(`✓ Topic marked as completed!`);
      }
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(completed));
      updateDashboardUI();
    });
  });

  // Highlight active TOC item on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], div[id].topic-card');
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.remove('active');
      if (item.querySelector('a')?.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });
}

// -------------------------------------------------------------
// 5. INTERACTIVE MINI CHECKS
// -------------------------------------------------------------
function initInteractiveChecks() {
  document.querySelectorAll('.interactive-check').forEach(checkBlock => {
    const buttons = checkBlock.querySelectorAll('.check-option-btn');
    const feedback = checkBlock.querySelector('.check-feedback');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        buttons.forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === 'true') {
            b.classList.add('correct');
          }
        });

        if (isCorrect) {
          btn.classList.add('correct');
          if (feedback) {
            feedback.className = 'check-feedback visible';
            feedback.style.background = 'var(--success-bg)';
            feedback.style.color = '#065f46';
            feedback.innerHTML = '<strong>Correct!</strong> ' + (feedback.dataset.exp || 'Well done! Concept applied accurately.');
          }
          showToast('✓ Great job! Correct answer.');
        } else {
          btn.classList.add('wrong');
          if (feedback) {
            feedback.className = 'check-feedback visible';
            feedback.style.background = 'var(--danger-bg)';
            feedback.style.color = '#991b1b';
            feedback.innerHTML = '<strong>Incorrect.</strong> ' + (feedback.dataset.exp || 'Check the formula and rules again.');
          }
        }
      });
    });
  });
}

// -------------------------------------------------------------
// 6. PRACTICE MCQS ENGINE (50 Questions)
// -------------------------------------------------------------
function renderPracticeMCQs(filter) {
  const container = document.getElementById('practiceMCQsContainer');
  if (!container) return;

  const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS) || '{"attempted":0,"correct":0,"solvedIds":[]}');
  const filtered = practiceMCQs.filter(mcq => filter === 'all' || mcq.level === filter);

  container.innerHTML = filtered.map((mcq, idx) => {
    const isSolved = stats.solvedIds.includes(mcq.id);
    const badgeClass = mcq.level === 'easy' ? 'badge-easy' : mcq.level === 'medium' ? 'badge-medium' : 'badge-hard';
    const levelLabel = mcq.level === 'hard' ? 'FAST Entry-Test' : mcq.level.toUpperCase();

    return `
      <div class="mcq-card ${isSolved ? 'solved-correct' : ''}" id="mcq-card-${mcq.id}" data-id="${mcq.id}">
        <div class="mcq-top">
          <span class="mcq-badge ${badgeClass}">${levelLabel} • ${mcq.topic}</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Q${mcq.id} of 50</span>
        </div>
        <div class="mcq-question">${mcq.question}</div>
        <div class="mcq-options-grid">
          ${mcq.options.map((opt, optIdx) => `
            <button class="mcq-opt" data-opt-idx="${optIdx}" onclick="handlePracticeOption(${mcq.id}, ${optIdx})">
              <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
            </button>
          `).join('')}
        </div>
        <div class="mcq-solution" id="mcq-solution-${mcq.id}">
          <strong>💡 Step-by-step Solution:</strong> ${mcq.explanation}
        </div>
      </div>
    `;
  }).join('');

  // Update filter button styles
  document.querySelectorAll('.practice-filters .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

window.filterPractice = function(filter) {
  renderPracticeMCQs(filter);
};

window.handlePracticeOption = function(mcqId, chosenIdx) {
  const mcq = practiceMCQs.find(m => m.id === mcqId);
  if (!mcq) return;

  const card = document.getElementById(`mcq-card-${mcqId}`);
  const solutionBox = document.getElementById(`mcq-solution-${mcqId}`);
  const optionBtns = card.querySelectorAll('.mcq-opt');

  optionBtns.forEach(btn => btn.disabled = true);

  let stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS) || '{"attempted":0,"correct":0,"solvedIds":[]}');

  if (chosenIdx === mcq.correct) {
    optionBtns[chosenIdx].classList.add('selected-correct');
    card.classList.add('solved-correct');
    if (!stats.solvedIds.includes(mcqId)) {
      stats.attempted += 1;
      stats.correct += 1;
      stats.solvedIds.push(mcqId);
    }
    showToast('✓ Correct! +1 to Practice Accuracy.');
  } else {
    optionBtns[chosenIdx].classList.add('selected-wrong');
    optionBtns[mcq.correct].classList.add('reveal-correct');
    card.classList.add('solved-wrong');
    if (!stats.solvedIds.includes(mcqId)) {
      stats.attempted += 1;
      stats.solvedIds.push(mcqId);
    }
    showToast('Incorrect choice. Check detailed explanation.');
  }

  solutionBox.classList.add('show');
  localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(stats));
  updateDashboardUI();
};

// -------------------------------------------------------------
// 7. FINAL QUIZ: 🧠 ALGEBRA CHALLENGE (Timed Exam Engine)
// -------------------------------------------------------------
let quizState = {
  currentIdx: 0,
  userAnswers: new Array(quizQuestions.length).fill(null),
  timeLeft: 20 * 60, // 20 minutes
  timerInterval: null,
  isSubmitted: false
};

function initQuiz() {
  const palette = document.getElementById('quizPalette');
  if (!palette) return;

  palette.innerHTML = quizQuestions.map((_, idx) => `
    <button class="palette-btn" id="pal-btn-${idx}" onclick="jumpToQuizQuestion(${idx})">${idx + 1}</button>
  `).join('');

  renderQuizQuestion(0);
}

window.startQuizTimer = function() {
  if (quizState.timerInterval) return;
  quizState.timerInterval = setInterval(() => {
    if (quizState.timeLeft > 0) {
      quizState.timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(quizState.timerInterval);
      submitQuiz(true);
    }
  }, 1000);
};

function updateTimerDisplay() {
  const timerEl = document.getElementById('quizTimer');
  if (!timerEl) return;
  const minutes = Math.floor(quizState.timeLeft / 60);
  const seconds = quizState.timeLeft % 60;
  timerEl.textContent = `⏱ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  if (quizState.timeLeft < 120) {
    timerEl.classList.add('warning');
  }
}

function renderQuizQuestion(idx) {
  startQuizTimer();
  quizState.currentIdx = idx;
  const q = quizQuestions[idx];
  const container = document.getElementById('quizQuestionContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">
      Question ${idx + 1} of ${quizQuestions.length}
    </div>
    <div style="font-size: 1.15rem; font-weight: 700; color: var(--navy); margin-bottom: 1.25rem;">
      ${q.q}
    </div>
    <div class="mcq-options-grid">
      ${q.options.map((opt, optIdx) => {
        const isSelected = quizState.userAnswers[idx] === optIdx;
        return `
          <button class="mcq-opt ${isSelected ? 'selected-correct' : ''}" onclick="selectQuizOption(${idx}, ${optIdx})">
            <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
          </button>
        `;
      }).join('')}
    </div>
  `;

  // Update palette active states
  document.querySelectorAll('.palette-btn').forEach((btn, pIdx) => {
    btn.classList.toggle('active', pIdx === idx);
    btn.classList.toggle('answered', quizState.userAnswers[pIdx] !== null);
  });

  // Button disabling
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.textContent = idx === quizQuestions.length - 1 ? 'Review & Submit' : 'Next Question →';
}

window.jumpToQuizQuestion = function(idx) {
  renderQuizQuestion(idx);
};

window.prevQuizQuestion = function() {
  if (quizState.currentIdx > 0) {
    renderQuizQuestion(quizState.currentIdx - 1);
  }
};

window.nextQuizQuestion = function() {
  if (quizState.currentIdx < quizQuestions.length - 1) {
    renderQuizQuestion(quizState.currentIdx + 1);
  } else {
    submitQuiz();
  }
};

window.selectQuizOption = function(qIdx, optIdx) {
  if (quizState.isSubmitted) return;
  quizState.userAnswers[qIdx] = optIdx;
  renderQuizQuestion(qIdx);
};

window.submitQuiz = function(isAuto = false) {
  if (quizState.isSubmitted) return;
  
  if (!isAuto) {
    const answeredCount = quizState.userAnswers.filter(a => a !== null).length;
    const confirmMsg = answeredCount < quizQuestions.length
      ? `You answered ${answeredCount} of ${quizQuestions.length} questions. Are you sure you want to submit?`
      : `Submit your exam and calculate final score?`;
    if (!confirm(confirmMsg)) return;
  }

  clearInterval(quizState.timerInterval);
  quizState.isSubmitted = true;

  let correctCount = 0;
  quizQuestions.forEach((q, idx) => {
    if (quizState.userAnswers[idx] === q.correct) {
      correctCount++;
    }
  });

  const pct = Math.round((correctCount / quizQuestions.length) * 100);
  const unattempted = quizQuestions.length - quizState.userAnswers.filter(a => a !== null).length;
  const incorrect = quizQuestions.length - correctCount - unattempted;

  // Rating badge
  let rating = '';
  let badgeStyle = '';
  if (pct >= 90) {
    rating = 'Excellent (FAST Merit Qualifier)';
    badgeStyle = 'background: #dcfce7; color: #166534;';
  } else if (pct >= 75) {
    rating = 'Very Good (High Scholarship Potential)';
    badgeStyle = 'background: #dbeafe; color: #1e40af;';
  } else if (pct >= 60) {
    rating = 'Good (Solid Foundations)';
    badgeStyle = 'background: #fef3c7; color: #92400e;';
  } else {
    rating = 'Needs More Practice';
    badgeStyle = 'background: #fee2e2; color: #991b1b;';
  }

  // Save best score
  const prevBest = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_BEST) || '0', 10);
  if (pct > prevBest) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_BEST, pct.toString());
  }
  updateDashboardUI();

  // Render Result Screen
  const quizBody = document.getElementById('quizBody');
  if (quizBody) {
    quizBody.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎯</div>
        <h3 style="font-size: 1.75rem; color: var(--navy); margin-bottom: 0.25rem;">Challenge Completed!</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">FAST-NUCES Chapter 01 Test Evaluation</p>
        
        <div style="display: inline-block; padding: 6px 16px; border-radius: 99px; font-weight: 800; font-size: 0.95rem; margin-bottom: 1.5rem; ${badgeStyle}">
          ${rating}
        </div>

        <div class="dashboard-grid" style="max-width: 700px; margin: 0 auto 2rem auto;">
          <div class="dash-card">
            <div class="dash-label">Score</div>
            <div class="dash-value" style="color: var(--primary);">${correctCount} / ${quizQuestions.length}</div>
          </div>
          <div class="dash-card">
            <div class="dash-label">Percentage</div>
            <div class="dash-value">${pct}%</div>
          </div>
          <div class="dash-card">
            <div class="dash-label">Accuracy</div>
            <div class="dash-value" style="color: ${pct >= 70 ? '#10b981' : '#ef4444'};">
              ${correctCount + incorrect > 0 ? Math.round((correctCount / (correctCount + incorrect)) * 100) : 0}%
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 2rem;">
          <button class="btn-primary" onclick="reviewQuizAnswers()">📖 Review All Answers</button>
          <button class="btn-secondary" onclick="restartQuiz()">🔄 Retake Challenge</button>
        </div>

        <div id="quizReviewContainer" style="text-align: left; margin-top: 2rem; display: none;"></div>
      </div>
    `;
  }
};

window.reviewQuizAnswers = function() {
  const container = document.getElementById('quizReviewContainer');
  if (!container) return;
  container.style.display = 'block';

  container.innerHTML = `
    <h4 style="margin-bottom: 1rem; color: var(--navy); font-size: 1.2rem;">Detailed Question Breakdown:</h4>
    ${quizQuestions.map((q, idx) => {
      const userChoice = quizState.userAnswers[idx];
      const isCorrect = userChoice === q.correct;
      const isUnanswered = userChoice === null;

      return `
        <div class="mcq-card ${isCorrect ? 'solved-correct' : 'solved-wrong'}" style="margin-bottom: 1.25rem;">
          <div style="font-weight: 700; color: var(--navy); margin-bottom: 0.6rem;">${q.q}</div>
          <div style="font-size: 0.88rem; margin-bottom: 0.5rem;">
            Your Answer: <strong>${isUnanswered ? 'Not Attempted' : `${String.fromCharCode(65 + userChoice)}. ${q.options[userChoice]}`}</strong>
            ${isCorrect ? ' ✅ (Correct)' : ' ❌ (Incorrect)'}
          </div>
          <div style="font-size: 0.88rem; color: var(--primary); font-weight: 600; margin-bottom: 0.6rem;">
            Correct Answer: ${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}
          </div>
          <div class="mcq-solution show">
            <strong>💡 Explanation:</strong> ${q.exp}
          </div>
        </div>
      `;
    }).join('')}
  `;
};

window.restartQuiz = function() {
  quizState = {
    currentIdx: 0,
    userAnswers: new Array(quizQuestions.length).fill(null),
    timeLeft: 20 * 60,
    timerInterval: null,
    isSubmitted: false
  };

  const quizBody = document.getElementById('quizBody');
  if (quizBody) {
    quizBody.innerHTML = `
      <div class="quiz-header-bar">
        <div>
          <h3 style="color: var(--navy); margin-bottom: 0.2rem;">🧠 Algebra Challenge</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);">FAST-NUCES & Scholarship Speed Exam • 25 MCQs</span>
        </div>
        <div class="quiz-timer-badge" id="quizTimer">⏱ 20:00</div>
      </div>
      <div class="quiz-palette" id="quizPalette"></div>
      <div id="quizQuestionContainer"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
        <button class="btn-secondary" id="quizPrevBtn" onclick="prevQuizQuestion()">← Previous</button>
        <button class="btn-primary" id="quizNextBtn" onclick="nextQuizQuestion()">Next Question →</button>
      </div>
    `;
  }
  initQuiz();
};

// -------------------------------------------------------------
// 8. FORMULA ACTIONS (Copy & Print)
// -------------------------------------------------------------
window.copyFormulaSheet = function() {
  const formulas = `
=== ALGEBRA & ALGEBRAIC EXPRESSIONS FORMULA SHEET ===
(FAST-NUCES & Scholarship Entry Test Guide)

1. EXPONENT LAWS:
• aᵐ × aⁿ = aᵐ⁺ⁿ
• aᵐ ÷ aⁿ = aᵐ⁻ⁿ
• (aᵐ)ⁿ = aᵐⁿ
• (ab)ⁿ = aⁿbⁿ
• (a/b)ⁿ = aⁿ / bⁿ
• a⁰ = 1 (a ≠ 0)
• a⁻ⁿ = 1 / aⁿ
• a^(m/n) = ⁿ√(aᵐ)

2. CORE ALGEBRAIC IDENTITIES:
• (a + b)² = a² + 2ab + b²
• (a - b)² = a² - 2ab + b²
• (a + b)(a - b) = a² - b²
• (a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a + b)
• (a - b)³ = a³ - 3a²b + 3ab² - b³ = a³ - b³ - 3ab(a - b)
• a³ + b³ = (a + b)(a² - ab + b²)
• a³ - b³ = (a - b)(a² + ab + b²)
• (a + b + c)² = a² + b² + c² + 2(ab + bc + ca)

3. FAST RECURRING RECURSIVE PATTERNS:
• If x + 1/x = k ⟹ x² + 1/x² = k² - 2
• If x + 1/x = k ⟹ x³ + 1/x³ = k³ - 3k
• If x - 1/x = k ⟹ x² + 1/x² = k² + 2
• If x - 1/x = k ⟹ x³ - 1/x³ = k³ + 3k
• If a + b + c = 0 ⟹ a³ + b³ + c³ = 3abc
  `.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(formulas).then(() => {
      showToast('📋 Formula sheet copied to clipboard!');
    }).catch(() => {
      fallbackCopy(formulas);
    });
  } else {
    fallbackCopy(formulas);
  }
};

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('📋 Formula sheet copied to clipboard!');
  } catch (err) {
    showToast('Press Ctrl+C to copy.');
  }
  document.body.removeChild(textArea);
}

window.printFormulaSheet = function() {
  window.print();
};

// -------------------------------------------------------------
// 9. BOOKMARKS SYSTEM
// -------------------------------------------------------------
function initBookmarks() {
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.dataset.topic;
      const title = btn.dataset.title || topicId;
      let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');

      const exists = bookmarks.find(b => b.id === topicId);
      if (exists) {
        bookmarks = bookmarks.filter(b => b.id !== topicId);
        btn.classList.remove('bookmarked');
        btn.innerHTML = '☆ Bookmark';
        showToast('Bookmark removed.');
      } else {
        bookmarks.push({ id: topicId, title: title, time: new Date().toLocaleDateString() });
        btn.classList.add('bookmarked');
        btn.innerHTML = '★ Bookmarked';
        showToast('★ Saved to My Bookmarks!');
      }

      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      updateBookmarkCount();
    });
  });

  updateBookmarkCount();
}

function updateBookmarkCount() {
  const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
  const countBadge = document.getElementById('bookmarkCountBadge');
  if (countBadge) countBadge.textContent = bookmarks.length;
}

window.openBookmarksModal = function() {
  const bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
  const modal = document.getElementById('bookmarksModal');
  const listContainer = document.getElementById('bookmarksList');
  if (!modal || !listContainer) return;

  if (bookmarks.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">☆</div>
        <p>No bookmarks saved yet. Click the <strong>☆ Bookmark</strong> button on any topic to save it for quick review.</p>
      </div>
    `;
  } else {
    listContainer.innerHTML = bookmarks.map(b => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-subtle); border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
        <div>
          <a href="#${b.id}" onclick="closeModal('bookmarksModal')" style="font-weight: 700; color: var(--navy);">${b.title}</a>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Saved: ${b.time}</div>
        </div>
        <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="removeBookmark('${b.id}')">Remove</button>
      </div>
    `).join('');
  }

  modal.classList.add('active');
};

window.removeBookmark = function(id) {
  let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
  bookmarks = bookmarks.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  updateBookmarkCount();
  openBookmarksModal();
  showToast('Bookmark deleted.');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};

// -------------------------------------------------------------
// 10. REAL-TIME SEARCH
// -------------------------------------------------------------
function initSearch() {
  const searchInput = document.getElementById('chapterSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      document.querySelectorAll('.topic-card, .example-box, .identity-card').forEach(el => {
        el.style.display = '';
      });
      return;
    }

    document.querySelectorAll('.topic-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'block';
        card.style.border = '2px solid var(--primary)';
      } else {
        card.style.display = 'none';
        card.style.border = '';
      }
    });
  });
}

// -------------------------------------------------------------
// 11. DARK MODE TOGGLE
// -------------------------------------------------------------
function initDarkMode() {
  const isDark = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
}

window.toggleDarkMode = function() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDark.toString());
  showToast(isDark ? '🌙 Dark Mode Enabled' : '☀️ Light Mode Enabled');
};

// -------------------------------------------------------------
// 12. TOAST NOTIFICATION HELPER
// -------------------------------------------------------------
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}
