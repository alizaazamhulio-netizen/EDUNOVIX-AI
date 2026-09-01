/**
 * Grade 9 Learning Hub - Complete Curriculum Engine
 * Built strictly according to Pakistani & Sindh Board Secondary Curriculum.
 */

// =================== 1. CORE APPLICATION STATE ===================
const APP_STATE = {
  currentView: 'home',
  currentSubjectId: null,
  currentChapterId: null,
  currentTopicId: null,
  theme: localStorage.getItem('grade9_theme') || 'light',
  profile: JSON.parse(localStorage.getItem('grade9_profile') || '{"name":"Grade 9 Scholar","board":"sindh","goal":"A1"}'),
  completedTopics: JSON.parse(localStorage.getItem('grade9_completed_topics') || '[]'),
  bookmarks: JSON.parse(localStorage.getItem('grade9_bookmarks') || '[]'),
  notes: JSON.parse(localStorage.getItem('grade9_notes') || '{}'),
  quizHistory: JSON.parse(localStorage.getItem('grade9_quiz_history') || '[]'),
  streak: parseInt(localStorage.getItem('grade9_streak') || '1', 10),
  lastActiveDate: localStorage.getItem('grade9_last_date') || new Date().toISOString().split('T')[0]
};

// =================== 2. SUBJECTS & CURRICULUM DATABASE ===================
const SUBJECTS_DATA = {
  math: {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    desc: 'Master real numbers, logarithms, algebraic formulas, matrices, determinants, and trigonometry with step-by-step solved examples.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'math-ch1',
        number: 1,
        title: 'Real and Complex Numbers',
        desc: 'Properties of real numbers, radicals, radicals laws, imaginary numbers, and complex arithmetic operations.',
        topics: [
          {
            id: 'math-ch1-t1',
            title: 'Real Numbers and Their Properties',
            time: '25 mins',
            difficulty: 'Medium',
            intro: 'Real numbers form the foundational bedrock of arithmetic and algebra in Grade 9 mathematics. A real number is any number that can be placed on a continuous number line.',
            objectives: [
              'Distinguish between rational numbers (Q) and irrational numbers (Q\').',
              'Understand terminating and non-terminating recurring/non-recurring decimals.',
              'Apply closure, commutative, associative, distributive, and identity properties of real numbers under addition and multiplication.'
            ],
            detailedExplanation: `
              <h4>1. Classification of Real Numbers (ℝ)</h4>
              <p>The set of real numbers ℝ is the union of Rational numbers (ℚ) and Irrational numbers (ℚ'): <code>ℝ = ℚ ∪ ℚ'</code> where <code>ℚ ∩ ℚ' = ∅</code>.</p>
              <ul>
                <li><strong>Natural Numbers (ℕ):</strong> {1, 2, 3, 4, ...}</li>
                <li><strong>Whole Numbers (𝕎):</strong> {0, 1, 2, 3, ...}</li>
                <li><strong>Integers (ℤ):</strong> {..., -3, -2, -1, 0, 1, 2, 3, ...}</li>
                <li><strong>Rational Numbers (ℚ):</strong> Numbers of the form <code>p/q</code> where p, q ∈ ℤ and q ≠ 0. Their decimal forms are either terminating (e.g., 1/4 = 0.25) or repeating/periodic (e.g., 1/3 = 0.333...).</li>
                <li><strong>Irrational Numbers (ℚ'):</strong> Numbers that cannot be expressed as p/q. Their decimals are non-terminating and non-repeating (e.g., √2 = 1.414213..., π = 3.14159...).</li>
              </ul>
              <h4>2. Fundamental Field Properties of ℝ</h4>
              <p>For all real numbers a, b, c ∈ ℝ:</p>
              <ul>
                <li><strong>Closure Property:</strong> a + b ∈ ℝ and a · b ∈ ℝ</li>
                <li><strong>Commutative Property:</strong> a + b = b + a and a · b = b · a</li>
                <li><strong>Associative Property:</strong> (a + b) + c = a + (b + c) and (a · b) · c = a · (b · c)</li>
                <li><strong>Distributive Property:</strong> a · (b + c) = a·b + a·c</li>
                <li><strong>Additive Identity:</strong> a + 0 = a (0 is additive identity)</li>
                <li><strong>Multiplicative Identity:</strong> a · 1 = a (1 is multiplicative identity)</li>
                <li><strong>Additive Inverse:</strong> a + (-a) = 0</li>
                <li><strong>Multiplicative Inverse:</strong> a · (1/a) = 1 (for a ≠ 0)</li>
              </ul>
            `,
            definitions: [
              { term: 'Rational Number (ℚ)', meaning: 'A number that can be expressed in the form p/q, where p and q are integers and q ≠ 0.' },
              { term: 'Irrational Number (ℚ\')', meaning: 'A real number that cannot be expressed as a quotient of integers, having non-terminating non-repeating decimals.' }
            ],
            formula: 'ℝ = ℚ ∪ ℚ\' | a(b + c) = ab + ac | a · (1/a) = 1 (a ≠ 0)',
            workedExample: {
              title: 'Converting a Recurring Decimal to Rational Form p/q',
              given: 'Recurring decimal x = 0.6̄ = 0.6666...',
              required: 'Express in the form p/q where p, q ∈ ℤ.',
              formula: 'Multiply by 10 (since 1 digit repeats) and subtract.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Assign variable</div> Let x = 0.6666... (Equation 1)</div>
                <div class="step-row"><div class="step-label">Step 2: Multiply by 10</div> 10x = 6.6666... (Equation 2)</div>
                <div class="step-row"><div class="step-label">Step 3: Subtract Eq (1) from Eq (2)</div> 10x - x = (6.6666...) - (0.6666...) → 9x = 6</div>
                <div class="step-row"><div class="step-label">Step 4: Solve for x</div> x = 6/9 = 2/3</div>
              `,
              finalAnswer: 'x = 2/3 (which is in rational form p/q with p=2, q=3).'
            },
            diagramSvg: `<svg width="340" height="120" viewBox="0 0 340 120" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <line x1="20" y1="60" x2="320" y2="60" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow)" />
              <circle cx="170" cy="60" r="5" fill="#0f172a" /><text x="166" y="85" font-size="12" font-weight="bold">0</text>
              <circle cx="110" cy="60" r="4" fill="#0f172a" /><text x="105" y="85" font-size="12">-1</text>
              <circle cx="50" cy="60" r="4" fill="#0f172a" /><text x="45" y="85" font-size="12">-2</text>
              <circle cx="230" cy="60" r="4" fill="#0f172a" /><text x="226" y="85" font-size="12">1</text>
              <circle cx="290" cy="60" r="4" fill="#0f172a" /><text x="286" y="85" font-size="12">2</text>
              <circle cx="255" cy="60" r="4" fill="#ef4444" /><text x="245" y="45" font-size="11" fill="#ef4444" font-weight="bold">√2 ≈ 1.414</text>
            </svg>`,
            diagramCaption: 'Real Number Line showing positioning of Rational Integers and Irrational √2',
            applications: 'Real numbers are used in every engineering measurement, computer graphics rendering, physics velocity models, and financial calculation worldwide.',
            commonMistakes: 'Assuming all square roots are irrational. (√4 = 2, which is rational! Only roots of non-perfect squares like √2, √3, √5 are irrational).',
            examTips: 'In board exams, frequently asked questions include proving √2 is irrational or expressing recurring decimals (e.g. 0.3̄ or 0.18̄) as p/q.',
            quickRevision: [
              'ℚ = p/q (q≠0). Terminating or recurring decimals.',
              'ℚ\' = Non-terminating, non-recurring decimals (√2, √3, π, e).',
              'Additive Identity is 0; Multiplicative Identity is 1.',
              'Additive Inverse of a is -a; Multiplicative inverse is 1/a.'
            ],
            miniMcq: {
              q: 'Which of the following is an irrational number?',
              options: ['3.14', '22/7', '√9', '√5'],
              correct: 3,
              explanation: '√5 is the square root of a non-perfect square, making its decimal expansion non-terminating and non-repeating (irrational). 22/7 and 3.14 are rational approximations.'
            },
            questions: [
              { q: 'Short: Prove that the additive inverse of -5/7 is 5/7.', a: 'By definition, a + (-a) = 0. Here, (-5/7) + (5/7) = (-5 + 5)/7 = 0/7 = 0. Hence 5/7 is the additive inverse.' },
              { q: 'Short: State whether π is rational or irrational and why.', a: 'π is an irrational number because its exact value cannot be written as a fraction p/q of integers; its decimal continues infinitely without repeating pattern.' },
              { q: 'Long: State and explain all 5 properties of Real Numbers under addition with mathematical examples.', a: '1. Closure: a+b ∈ ℝ (e.g. 2+3=5 ∈ ℝ). 2. Commutative: a+b=b+a (3+4=4+3=7). 3. Associative: (a+b)+c=a+(b+c) ((1+2)+3=1+(2+3)=6). 4. Identity: a+0=a (7+0=7). 5. Inverse: a+(-a)=0 (4+(-4)=0).' }
            ]
          },
          {
            id: 'math-ch1-t2',
            title: 'Complex Numbers and Operations',
            time: '30 mins',
            difficulty: 'Hard',
            intro: 'Complex numbers extend the real number system to solve equations with no real roots, such as x² + 1 = 0. The unit imaginary number is defined as i = √(-1).',
            objectives: [
              'Define the imaginary unit i where i² = -1.',
              'Express complex numbers in standard form z = a + bi where a, b ∈ ℝ.',
              'Perform addition, subtraction, multiplication, and division with complex conjugates.'
            ],
            detailedExplanation: `
              <h4>1. Definition of Imaginary Unit and Powers of i</h4>
              <p>The symbol <code>i</code> (iota) is defined such that <code>i = √(-1)</code> and <code>i² = -1</code>.</p>
              <ul>
                <li><code>i¹ = i</code></li>
                <li><code>i² = -1</code></li>
                <li><code>i³ = i² · i = (-1) · i = -i</code></li>
                <li><code>i⁴ = (i²)² = (-1)² = 1</code></li>
              </ul>
              <h4>2. Standard Form of Complex Numbers</h4>
              <p>A complex number <code>z</code> is written as <code>z = a + bi</code>, where <code>a = Re(z)</code> (Real Part) and <code>b = Im(z)</code> (Imaginary Part).</p>
              <h4>3. Complex Conjugate</h4>
              <p>The conjugate of <code>z = a + bi</code> is denoted by <code>z̄ = a - bi</code>. The product <code>z · z̄ = (a + bi)(a - bi) = a² + b²</code>, which is always a non-negative real number.</p>
              <h4>4. Arithmetic Operations</h4>
              <ul>
                <li><strong>Addition:</strong> (a + bi) + (c + di) = (a + c) + (b + d)i</li>
                <li><strong>Multiplication:</strong> (a + bi)(c + di) = (ac - bd) + (ad + bc)i (using i² = -1)</li>
                <li><strong>Division:</strong> Multiply numerator and denominator by the conjugate of the denominator.</li>
              </ul>
            `,
            definitions: [
              { term: 'Complex Number', meaning: 'A number of the form z = a + bi where a and b are real numbers and i = √(-1).' },
              { term: 'Complex Conjugate', meaning: 'For z = a + bi, the conjugate z̄ = a - bi changes the sign of the imaginary part only.' }
            ],
            formula: 'z = a + bi | z̄ = a - bi | i² = -1 | z · z̄ = a² + b²',
            workedExample: {
              title: 'Dividing Complex Numbers',
              given: 'Evaluate (3 + 2i) / (1 - i)',
              required: 'Express in standard form a + bi.',
              formula: 'Multiply numerator and denominator by the conjugate of (1 - i), which is (1 + i).',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Set up conjugate multiplication</div> [(3 + 2i)(1 + i)] / [(1 - i)(1 + i)]</div>
                <div class="step-row"><div class="step-label">Step 2: Expand numerator</div> 3(1) + 3(i) + 2i(1) + 2i² = 3 + 3i + 2i + 2(-1) = (3 - 2) + 5i = 1 + 5i</div>
                <div class="step-row"><div class="step-label">Step 3: Expand denominator</div> 1² - i² = 1 - (-1) = 1 + 1 = 2</div>
                <div class="step-row"><div class="step-label">Step 4: Write in a + bi form</div> (1 + 5i)/2 = 1/2 + (5/2)i</div>
              `,
              finalAnswer: '1/2 + 5/2 i (where Real part = 1/2 and Imaginary part = 5/2).'
            },
            diagramSvg: `<svg width="340" height="140" viewBox="0 0 340 140" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <line x1="20" y1="70" x2="320" y2="70" stroke="#64748b" stroke-width="2" />
              <line x1="170" y1="10" x2="170" y2="130" stroke="#64748b" stroke-width="2" />
              <text x="300" y="65" font-size="11" fill="#475569" font-weight="bold">Re(z)</text>
              <text x="175" y="20" font-size="11" fill="#475569" font-weight="bold">Im(z)</text>
              <circle cx="230" cy="30" r="5" fill="#2563eb" />
              <text x="240" y="30" font-size="12" fill="#2563eb" font-weight="bold">z = 3 + 2i</text>
              <circle cx="230" cy="110" r="5" fill="#ef4444" />
              <text x="240" y="115" font-size="12" fill="#ef4444" font-weight="bold">z̄ = 3 - 2i</text>
              <line x1="230" y1="30" x2="230" y2="110" stroke="#94a3b8" stroke-dasharray="4" />
            </svg>`,
            diagramCaption: 'Argand Diagram plotting Complex Number z and its Conjugate z̄',
            applications: 'Complex numbers are heavily utilized in electrical AC circuits, signal processing, electromagnetic wave equations, and quantum physics.',
            commonMistakes: 'Forgetting that (i)² = -1 when multiplying terms like (2i)(-3i) = -6i² = -6(-1) = +6.',
            examTips: 'Always simplify powers of i by dividing the exponent by 4: i^n = i^(4k + r) = i^r.',
            quickRevision: [
              'i = √(-1), i² = -1, i³ = -i, i⁴ = 1.',
              'Standard form: z = a + bi (a is real, b is imaginary).',
              'Conjugate: z̄ = a - bi.',
              'Division requires multiplying top & bottom by denominator\'s conjugate.'
            ],
            miniMcq: {
              q: 'What is the simplified value of i¹⁹?',
              options: ['1', '-1', 'i', '-i'],
              correct: 3,
              explanation: '19 ÷ 4 leaves a remainder of 3. Therefore, i¹⁹ = (i⁴)⁴ · i³ = (1)⁴ · (-i) = -i.'
            },
            questions: [
              { q: 'Short: Find the real and imaginary parts of z = (4 - 7i)/(2).', a: 'Real part Re(z) = 4/2 = 2. Imaginary part Im(z) = -7/2.' },
              { q: 'Short: Evaluate i¹⁰².', a: '102 = 4(25) + 2. Thus i¹⁰² = (i⁴)²⁵ · i² = 1²⁵ · (-1) = -1.' },
              { q: 'Long: If z1 = 2 + 3i and z2 = 1 - 2i, calculate z1 · z2 and z1 / z2.', a: 'Multiplication: (2+3i)(1-2i) = 2 - 4i + 3i - 6i² = 2 - i - 6(-1) = 8 - i. Division: (2+3i)(1+2i)/((1-2i)(1+2i)) = (2+4i+3i+6i²)/(1+4) = (2+7i-6)/5 = -4/5 + 7/5 i.' }
            ]
          }
        ]
      },
      {
        id: 'math-ch2',
        number: 2,
        title: 'Logarithms',
        desc: 'Scientific notation, characteristic, mantissa, laws of logarithms, and numerical calculations.',
        topics: [
          {
            id: 'math-ch2-t1',
            title: 'Laws of Logarithms and Applications',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Logarithms are the mathematical inverse of exponentiation. They allow huge multiplication and division operations to be converted into simpler additions and subtractions.',
            objectives: [
              'Convert between exponential form (a^y = x) and logarithmic form (log_a(x) = y).',
              'State and prove the four fundamental laws of logarithms.',
              'Determine characteristic and mantissa to solve real calculation problems.'
            ],
            detailedExplanation: `
              <h4>1. Definition of Logarithm</h4>
              <p>If <code>a^y = x</code> (where a > 0, a ≠ 1 and x > 0), then <code>y</code> is called the logarithm of <code>x</code> to the base <code>a</code>, written as: <code>log_a(x) = y</code>.</p>
              <h4>2. The Four Fundamental Laws of Logarithms</h4>
              <ol>
                <li><strong>First Law (Product Law):</strong> <code>log_a(m · n) = log_a(m) + log_a(n)</code></li>
                <li><strong>Second Law (Quotient Law):</strong> <code>log_a(m / n) = log_a(m) - log_a(n)</code></li>
                <li><strong>Third Law (Power Law):</strong> <code>log_a(m^n) = n · log_a(m)</code></li>
                <li><strong>Fourth Law (Change of Base Law):</strong> <code>log_a(m) = (log_b(m)) / (log_b(a))</code> or <code>log_a(m) · log_b(a) = log_b(m)</code></li>
              </ol>
              <h4>3. Common Logarithm (Base 10)</h4>
              <p>Logarithms with base 10 are called common logarithms. A logarithm consists of two parts:</p>
              <ul>
                <li><strong>Characteristic:</strong> The integral part (can be positive, zero, or negative e.g. 1̄, 2̄).</li>
                <li><strong>Mantissa:</strong> The fractional decimal part, obtained from log tables (always positive).</li>
              </ul>
            `,
            definitions: [
              { term: 'Logarithm', meaning: 'The power to which a base must be raised to produce a given number: log_a(x) = y ⇔ a^y = x.' },
              { term: 'Characteristic', meaning: 'The integer part of a common logarithm representing the order of magnitude.' },
              { term: 'Mantissa', meaning: 'The non-negative fractional decimal part of a common logarithm.' }
            ],
            formula: 'log_a(mn) = log_a m + log_a n | log_a(m/n) = log_a m - log_a n | log_a(m^n) = n log_a m',
            workedExample: {
              title: 'Solving Logarithmic Equation',
              given: 'Solve for x: log₂(x) + log₂(x - 2) = 3',
              required: 'Find the real value of x.',
              formula: 'Use product law: log_a(m) + log_a(n) = log_a(mn) then convert to exponential form.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Combine using Product Law</div> log₂[x(x - 2)] = 3</div>
                <div class="step-row"><div class="step-label">Step 2: Convert to Exponential Form</div> x(x - 2) = 2³ → x² - 2x = 8</div>
                <div class="step-row"><div class="step-label">Step 3: Factorize quadratic equation</div> x² - 2x - 8 = 0 → (x - 4)(x + 2) = 0</div>
                <div class="step-row"><div class="step-label">Step 4: Check validity (x > 0)</div> x = 4 (Valid) or x = -2 (Extraneous root, since log of negative number is undefined).</div>
              `,
              finalAnswer: 'x = 4.'
            },
            diagramSvg: `<svg width="340" height="130" viewBox="0 0 340 130" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <line x1="30" y1="100" x2="310" y2="100" stroke="#64748b" stroke-width="2" />
              <line x1="60" y1="10" x2="60" y2="120" stroke="#64748b" stroke-width="2" />
              <path d="M 65 118 Q 80 100 130 60 T 300 20" fill="none" stroke="#2563eb" stroke-width="3" />
              <circle cx="100" cy="100" r="4" fill="#ef4444" /><text x="95" y="115" font-size="11" fill="#ef4444" font-weight="bold">(1,0)</text>
              <text x="220" y="35" font-size="12" fill="#2563eb" font-weight="bold">y = log_a(x)</text>
            </svg>`,
            diagramCaption: 'Logarithmic Curve showing intercept at (1, 0) and vertical asymptote x = 0',
            applications: 'Earthquake Richter scale, sound decibel scale, and pH chemistry measurements are all logarithmic scales.',
            commonMistakes: 'Writing log(a + b) = log(a) + log(b). This is completely FALSE. Only log(a · b) = log(a) + log(b).',
            examTips: 'The proof of the Product Law log_a(mn) = log_a m + log_a n is a regular 5-mark question in board papers.',
            quickRevision: [
              'log_a(x) = y ⇔ a^y = x (a>0, a≠1, x>0).',
              'log_a(1) = 0 and log_a(a) = 1.',
              'Product becomes sum; quotient becomes difference; power becomes multiplier.',
              'Characteristic of number ≥ 1 is (digits before decimal - 1).'
            ],
            miniMcq: {
              q: 'What is the value of log₃(81)?',
              options: ['2', '3', '4', '27'],
              correct: 2,
              explanation: 'Since 3⁴ = 81, log₃(81) = 4.'
            },
            questions: [
              { q: 'Short: Prove that log_a(1) = 0.', a: 'Since a⁰ = 1 for any base a ≠ 0, converting to logarithmic form gives log_a(1) = 0.' },
              { q: 'Short: Find the characteristic of 0.00345.', a: 'Count zeros after decimal point before first non-zero digit = 2. Characteristic is -(2 + 1) = 3̄ (bar 3).' },
              { q: 'Long: Prove the Quotient Law of Logarithms: log_a(m/n) = log_a(m) - log_a(n).', a: 'Let log_a(m) = x ⇒ a^x = m and log_a(n) = y ⇒ a^y = n. Dividing: m/n = a^x / a^y = a^(x - y). By definition of logarithm: log_a(m/n) = x - y = log_a(m) - log_a(n). Hence proved.' }
            ]
          }
        ]
      },
      {
        id: 'math-ch3',
        number: 3,
        title: 'Algebraic Expressions, Formulas and Factorization',
        desc: 'Standard algebraic identities, factor theorem, remainder theorem, and factorization methods.',
        topics: [
          {
            id: 'math-ch3-t1',
            title: 'Algebraic Formulas and Factorization Techniques',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Algebraic formulas provide powerful shortcuts to expand polynomial products and decompose polynomials into prime linear/quadratic factors.',
            objectives: [
              'Memorize and apply fundamental algebraic identities ((a±b)², a²-b², (a±b)³, a³±b³).',
              'Master 5 key factorization types: common terms, grouping, difference of squares, trinomial middle-term breaking, and cubes.',
              'Apply Remainder and Factor theorems to polynomials.'
            ],
            detailedExplanation: `
              <h4>1. Core Algebraic Identities</h4>
              <ul>
                <li><code>(a + b)² = a² + 2ab + b²</code></li>
                <li><code>(a - b)² = a² - 2ab + b²</code></li>
                <li><code>(a + b)² + (a - b)² = 2(a² + b²)</code></li>
                <li><code>(a + b)² - (a - b)² = 4ab</code></li>
                <li><code>a² - b² = (a - b)(a + b)</code></li>
                <li><code>(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)</code></li>
                <li><code>(a + b)³ = a³ + 3ab(a + b) + b³ = a³ + 3a²b + 3ab² + b³</code></li>
                <li><code>(a - b)³ = a³ - 3ab(a - b) - b³ = a³ - 3a²b + 3ab² - b³</code></li>
                <li><code>a³ + b³ = (a + b)(a² - ab + b²)</code></li>
                <li><code>a³ - b³ = (a - b)(a² + ab + b²)</code></li>
              </ul>
              <h4>2. Middle Term Breaking Method</h4>
              <p>For quadratic trinomial <code>ax² + bx + c</code>, find two numbers p and q such that <code>p + q = b</code> and <code>p · q = a · c</code>.</p>
            `,
            definitions: [
              { term: 'Polynomial', meaning: 'An algebraic expression consisting of variables and coefficients, with non-negative integer exponents.' },
              { term: 'Factorization', meaning: 'The process of writing an algebraic expression as the product of its simpler factors.' }
            ],
            formula: '(a±b)² = a²±2ab+b² | a³±b³ = (a±b)(a²∓ab+b²) | 4ab = (a+b)² - (a-b)²',
            workedExample: {
              title: 'Finding a² + b² and ab',
              given: 'If a + b = 7 and a - b = 3',
              required: 'Find the values of: (i) a² + b² and (ii) ab',
              formula: '2(a² + b²) = (a + b)² + (a - b)² and 4ab = (a + b)² - (a - b)²',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Calculate a² + b²</div> 2(a² + b²) = 7² + 3² = 49 + 9 = 58 → a² + b² = 58/2 = 29</div>
                <div class="step-row"><div class="step-label">Step 2: Calculate ab</div> 4ab = 7² - 3² = 49 - 9 = 40 → ab = 40/4 = 10</div>
              `,
              finalAnswer: 'a² + b² = 29 and ab = 10.'
            },
            diagramSvg: `<svg width="340" height="130" viewBox="0 0 340 130" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="50" y="20" width="90" height="90" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2" />
              <rect x="140" y="20" width="40" height="90" fill="#fde68a" stroke="#d97706" stroke-width="2" />
              <rect x="50" y="110" width="90" height="0" />
              <text x="85" y="70" font-size="14" font-weight="bold" fill="#1e3a8a">a²</text>
              <text x="150" y="70" font-size="12" font-weight="bold" fill="#92400e">ab</text>
              <text x="85" y="15" font-size="12" font-weight="bold">a</text>
              <text x="155" y="15" font-size="12" font-weight="bold">b</text>
            </svg>`,
            diagramCaption: 'Geometric Proof of Area (a + b)² = a² + 2ab + b²',
            applications: 'Algebraic equations are used in computer coding logic, trajectory calculations, profit optimization, and architecture structural loads.',
            commonMistakes: 'Writing (a + b)² = a² + b² (forgetting the middle term +2ab!).',
            examTips: 'Always check if a common factor exists before attempting middle-term breaking.',
            quickRevision: [
              '2(a² + b²) = (a+b)² + (a-b)²',
              '4ab = (a+b)² - (a-b)²',
              'a³ + b³ = (a + b)(a² - ab + b²)',
              'Middle-term breaking requires p+q = b and p*q = ac.'
            ],
            miniMcq: {
              q: 'If a + b = 5 and a - b = 1, then the value of 4ab is:',
              options: ['24', '26', '12', '10'],
              correct: 0,
              explanation: '4ab = (a + b)² - (a - b)² = 5² - 1² = 25 - 1 = 24.'
            },
            questions: [
              { q: 'Short: Factorize: 4x² - 12xy + 9y².', a: '(2x)² - 2(2x)(3y) + (3y)² = (2x - 3y)².' },
              { q: 'Short: If x + 1/x = 3, find x² + 1/x².', a: '(x + 1/x)² = 3² → x² + 2(x)(1/x) + 1/x² = 9 → x² + 1/x² = 9 - 2 = 7.' },
              { q: 'Long: Factorize completely: x³ - 8y³ and x⁴ - y⁴.', a: '1. x³ - (2y)³ = (x - 2y)(x² + 2xy + 4y²). 2. x⁴ - y⁴ = (x²)² - (y²)² = (x² - y²)(x² + y²) = (x - y)(x + y)(x² + y²).' }
            ]
          }
        ]
      },
      {
        id: 'math-ch4',
        number: 4,
        title: 'Matrices and Determinants',
        desc: 'Types of matrices, matrix addition & multiplication, adjoint, inverse, and Cramer\'s Rule.',
        topics: [
          {
            id: 'math-ch4-t1',
            title: 'Matrix Inversion Method and Cramer\'s Rule',
            time: '40 mins',
            difficulty: 'Hard',
            intro: 'Matrices provide a structured rectangular array of numbers that enables compact representation and simultaneous solution of linear systems in physics and computer science.',
            objectives: [
              'Calculate determinant of a 2x2 matrix and test for singularity (|A| = 0).',
              'Find the adjoint and multiplicative inverse A⁻¹ = Adj(A) / |A|.',
              'Solve simultaneous linear equations using Matrix Inversion Method and Cramer\'s Rule.'
            ],
            detailedExplanation: `
              <h4>1. Determinant and Adjoint of a 2x2 Matrix</h4>
              <p>Let matrix <code>A = [[a, b], [c, d]]</code>.</p>
              <ul>
                <li><strong>Determinant:</strong> <code>|A| = det(A) = ad - bc</code>. If |A| = 0, A is <em>Singular</em> (Inverse does not exist). If |A| ≠ 0, A is <em>Non-Singular</em>.</li>
                <li><strong>Adjoint:</strong> <code>Adj(A) = [[d, -b], [-c, a]]</code> (Swap main diagonal, negate secondary diagonal).</li>
                <li><strong>Multiplicative Inverse:</strong> <code>A⁻¹ = (1 / |A|) · Adj(A)</code></li>
              </ul>
              <h4>2. Solving Linear System: ax + by = m and cx + dy = n</h4>
              <p>In matrix form: <code>A · X = B</code> where <code>A = [[a, b], [c, d]]</code>, <code>X = [[x], [y]]</code>, and <code>B = [[m], [n]]</code>.</p>
              <ul>
                <li><strong>Matrix Inversion Method:</strong> <code>X = A⁻¹ · B = (1 / |A|) · Adj(A) · B</code></li>
                <li><strong>Cramer's Rule:</strong> <code>x = |A_x| / |A|</code> and <code>y = |A_y| / |A|</code> where <code>A_x = [[m, b], [n, d]]</code> and <code>A_y = [[a, m], [c, n]]</code>.</li>
              </ul>
            `,
            definitions: [
              { term: 'Singular Matrix', meaning: 'A square matrix whose determinant is equal to zero (|A| = 0), having no inverse.' },
              { term: 'Cramer\'s Rule', meaning: 'An explicit algebraic formula for solving systems of linear equations using determinants.' }
            ],
            formula: '|A| = ad - bc | A⁻¹ = (1/|A|) · Adj(A) | x = |Ax|/|A|, y = |Ay|/|A|',
            workedExample: {
              title: 'Solving Linear System using Cramer\'s Rule',
              given: '2x - 2y = 4  and  3x + 2y = 6',
              required: 'Find the solution set (x, y).',
              formula: 'x = |Ax| / |A|, y = |Ay| / |A|',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Coefficient Matrix A</div> A = [[2, -2], [3, 2]] → |A| = (2)(2) - (-2)(3) = 4 - (-6) = 10 ≠ 0 (Non-singular).</div>
                <div class="step-row"><div class="step-label">Step 2: Matrix Ax and |Ax|</div> Ax = [[4, -2], [6, 2]] → |Ax| = (4)(2) - (-2)(6) = 8 + 12 = 20.</div>
                <div class="step-row"><div class="step-label">Step 3: Matrix Ay and |Ay|</div> Ay = [[2, 4], [3, 6]] → |Ay| = (2)(6) - (4)(3) = 12 - 12 = 0.</div>
                <div class="step-row"><div class="step-label">Step 4: Compute x and y</div> x = 20 / 10 = 2, and y = 0 / 10 = 0.</div>
              `,
              finalAnswer: 'Solution set: (x, y) = (2, 0).'
            },
            diagramSvg: `<svg width="340" height="110" viewBox="0 0 340 110" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <text x="40" y="55" font-size="14" font-weight="bold">A =</text>
              <rect x="70" y="25" width="80" height="60" rx="4" fill="none" stroke="#2563eb" stroke-width="2" />
              <text x="85" y="48" font-size="13">a</text><text x="125" y="48" font-size="13">b</text>
              <text x="85" y="73" font-size="13">c</text><text x="125" y="73" font-size="13">d</text>
              <text x="170" y="55" font-size="14" font-weight="bold">Adj(A) =</text>
              <rect x="235" y="25" width="85" height="60" rx="4" fill="none" stroke="#10b981" stroke-width="2" />
              <text x="248" y="48" font-size="13">d</text><text x="285" y="48" font-size="13">-b</text>
              <text x="245" y="73" font-size="13">-c</text><text x="290" y="73" font-size="13">a</text>
            </svg>`,
            diagramCaption: 'Adjoint Matrix Transformation: Swapping Main Diagonal & Negating Secondary Diagonal',
            applications: 'Matrices power 3D game engines, neural network weight tensors, Google PageRank algorithm, and structural engineering finite elements.',
            commonMistakes: 'Forgetting that matrix multiplication is NOT commutative (A · B ≠ B · A in general).',
            examTips: 'Cramer\'s Rule and Matrix Inversion Method are guaranteed 8-mark Section C long questions in Board exams.',
            quickRevision: [
              '|A| = ad - bc. If |A|=0, system has no unique solution.',
              'Adj(A): Swap diagonal elements (a ↔ d), switch signs of off-diagonal (b → -b, c → -c).',
              'Matrix Inversion: X = A⁻¹B = (1/|A|) · Adj(A) · B.',
              'Cramer\'s Rule: x = |Ax|/|A|, y = |Ay|/|A|.'
            ],
            miniMcq: {
              q: 'If A = [[2, 3], [4, 6]], then determinant |A| is:',
              options: ['0', '12', '24', '-12'],
              correct: 0,
              explanation: '|A| = (2)(6) - (3)(4) = 12 - 12 = 0. Therefore A is a singular matrix.'
            },
            questions: [
              { q: 'Short: Define a diagonal matrix with an example.', a: 'A square matrix in which all non-diagonal elements are zero and at least one diagonal element is non-zero. Example: [[3, 0], [0, 5]].' },
              { q: 'Short: State the condition for two matrices A and B to be conformable for multiplication.', a: 'The number of columns in the first matrix A must be equal to the number of rows in the second matrix B.' },
              { q: 'Long: Solve by Matrix Inversion Method: 4x + y = 9 and -3x - y = -5.', a: 'A=[[4,1],[-3,-1]], X=[[x],[y]], B=[[9],[-5]]. |A| = 4(-1) - 1(-3) = -4 + 3 = -1 ≠ 0. Adj(A) = [[-1,-1],[3,4]]. A⁻¹ = (1/-1)[[-1,-1],[3,4]] = [[1,1],[-3,-4]]. X = A⁻¹B = [[1(9)+1(-5)],[-3(9)+(-4)(-5)]] = [[4],[-7]]. Thus x = 4, y = -7.' }
            ]
          }
        ]
      }
    ]
  },

  physics: {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    desc: 'Explore physical quantities, kinematics, dynamics, Newton\'s laws, gravitation, work & energy with numericals and SI units.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'phy-ch1',
        number: 1,
        title: 'Physical Quantities and Measurement',
        desc: 'SI Base and Derived units, Vernier Caliper, Micrometer Screw Gauge, and significant figures.',
        topics: [
          {
            id: 'phy-ch1-t1',
            title: 'Physical Quantities, SI Units and Measuring Instruments',
            time: '30 mins',
            difficulty: 'Easy',
            intro: 'Physics is the science of measurement and understanding the physical universe. Every physical quantity consists of a numerical magnitude and an appropriate unit.',
            objectives: [
              'Differentiate between base physical quantities and derived physical quantities.',
              'Memorize the 7 SI base units (Length, Mass, Time, Temperature, Electric Current, Luminous Intensity, Amount of Substance).',
              'Understand least count and zero error of Vernier Caliper (0.01 cm) and Screw Gauge (0.01 mm).'
            ],
            detailedExplanation: `
              <h4>1. Base vs Derived Physical Quantities</h4>
              <ul>
                <li><strong>Base Quantities:</strong> The fundamental minimum quantities on the basis of which other quantities are defined. There are 7 base quantities in SI: Length (meter, m), Mass (kilogram, kg), Time (second, s), Electric Current (ampere, A), Thermodynamic Temperature (kelvin, K), Amount of Substance (mole, mol), and Luminous Intensity (candela, cd).</li>
                <li><strong>Derived Quantities:</strong> Quantities expressed in terms of base quantities (e.g. Velocity = m/s, Force = kg·m/s² = Newton (N), Pressure = N/m² = Pascal (Pa), Work = N·m = Joule (J)).</li>
              </ul>
              <h4>2. Precision Measuring Instruments</h4>
              <ul>
                <li><strong>Vernier Caliper:</strong> Used to measure internal/external diameter and depth. Least Count (LC) = Smallest Main Scale Div / Total Vernier Divs = 1 mm / 10 = 0.1 mm = 0.01 cm.</li>
                <li><strong>Micrometer Screw Gauge:</strong> Used to measure wire diameter and sheet thickness. LC = Pitch / Total Circular Divs = 0.5 mm / 50 = 0.01 mm = 0.001 cm.</li>
                <li><strong>Zero Error:</strong> If zero line of moving scale does not coincide with zero of main scale when jaws are closed. Zero Error is positive if Vernier zero is to right, negative if to left. Correct Reading = Observed Reading - (Zero Error).</li>
              </ul>
            `,
            definitions: [
              { term: 'Least Count', meaning: 'The smallest value that can be measured accurately with a given measuring instrument.' },
              { term: 'Zero Error', meaning: 'A systematic error occurring when a measuring instrument displays a non-zero reading with zero input.' }
            ],
            formula: 'LC (Vernier) = 0.01 cm | LC (Screw Gauge) = 0.01 mm | Correct Value = Observed - (± Zero Error)',
            workedExample: {
              title: 'Calculating Diameter with Screw Gauge with Zero Error',
              given: 'Main scale reading = 3.5 mm, Circular scale division = 28, Pitch = 0.5 mm, Total Circular divs = 50, Positive Zero Error = +0.04 mm',
              required: 'Calculate true diameter of the metallic cylinder.',
              formula: 'Least Count = Pitch / Circular Divs = 0.01 mm. Observed = Main + (Div × LC). Correct = Observed - Zero Error.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Calculate Observed Reading</div> Observed = 3.5 mm + (28 × 0.01 mm) = 3.5 mm + 0.28 mm = 3.78 mm</div>
                <div class="step-row"><div class="step-label">Step 2: Correct for Zero Error</div> True Diameter = 3.78 mm - (+0.04 mm) = 3.74 mm</div>
              `,
              finalAnswer: 'Correct Diameter = 3.74 mm.'
            },
            diagramSvg: `<svg width="340" height="110" viewBox="0 0 340 110" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="20" y="40" width="220" height="25" fill="#e2e8f0" stroke="#475569" />
              <rect x="80" y="30" width="80" height="45" fill="#93c5fd" stroke="#1e40af" stroke-width="2" opacity="0.8" />
              <text x="30" y="30" font-size="11" font-weight="bold">Main Scale (mm)</text>
              <text x="95" y="22" font-size="11" font-weight="bold" fill="#1e40af">Vernier Scale</text>
              <line x1="120" y1="30" x2="120" y2="75" stroke="#ef4444" stroke-width="2" />
              <text x="180" y="95" font-size="11" fill="#ef4444">Coinciding division</text>
            </svg>`,
            diagramCaption: 'Vernier Caliper Scale reading principle with main and sliding vernier divisions',
            applications: 'High-precision engineering machining, cylinder bore measurements, aerospace parts manufacturing, and medical syringe calibrations.',
            commonMistakes: 'Adding a positive zero error instead of subtracting it. Always remember: Correct = Observed - (Zero Error).',
            examTips: 'Know the 7 base SI units and be able to derive units for Force, Work, Power, and Pressure.',
            quickRevision: [
              '7 SI base units: m, kg, s, A, K, mol, cd.',
              'Vernier Caliper LC = 0.1 mm (0.01 cm).',
              'Screw Gauge LC = 0.01 mm (0.001 cm).',
              'Significant figures rules: Non-zero digits are always significant; leading zeros are never significant.'
            ],
            miniMcq: {
              q: 'The least count of a standard Vernier Caliper having 10 vernier divisions on 9 mm is:',
              options: ['0.1 cm', '0.01 cm', '0.001 cm', '1.0 mm'],
              correct: 1,
              explanation: 'LC = 1 mm / 10 = 0.1 mm = 0.01 cm.'
            },
            questions: [
              { q: 'Short: Why is a screw gauge more precise than a vernier caliper?', a: 'A screw gauge has a smaller least count (0.01 mm) compared to a vernier caliper (0.1 mm), allowing it to measure tenfold finer differences.' },
              { q: 'Short: How many significant figures are in 0.00450 kg?', a: '3 significant figures (4, 5, and the trailing 0). The leading zeros are merely place holders.' },
              { q: 'Long: Explain base and derived units with 3 examples each, and show how the unit of Force (Newton) is derived from base units.', a: 'Base units are fundamental independent units (meter m, kilogram kg, second s). Derived units are combinations of base units. Force F = m · a = kg · (m/s²) = kg·m/s². This combined unit is defined as 1 Newton (N).' }
            ]
          }
        ]
      },
      {
        id: 'phy-ch2',
        number: 2,
        title: 'Kinematics',
        desc: 'Distance, displacement, speed, velocity, acceleration, and 3 Equations of Motion with numericals.',
        topics: [
          {
            id: 'phy-ch2-t1',
            title: 'Equations of Motion and Numerical Problems',
            time: '40 mins',
            difficulty: 'Hard',
            intro: 'Kinematics deals with the motion of objects without considering the forces causing it. Uniformly accelerated motion is governed by three fundamental kinematic equations.',
            objectives: [
              'Differentiate between scalar and vector quantities (Distance vs Displacement, Speed vs Velocity).',
              'Derive the Three Equations of Motion using speed-time graph.',
              'Solve step-by-step numerical problems with Given, Formula, Solution, and SI Units.'
            ],
            detailedExplanation: `
              <h4>1. Kinematic Quantities</h4>
              <ul>
                <li><strong>Displacement (s):</strong> Shortest straight-line distance from initial to final position (Vector, unit: m).</li>
                <li><strong>Velocity (v):</strong> Rate of displacement with time <code>v = s / t</code> (Vector, unit: m/s).</li>
                <li><strong>Acceleration (a):</strong> Rate of change of velocity <code>a = (v_f - v_i) / t</code> (Vector, unit: m/s²).</li>
              </ul>
              <h4>2. The Three Equations of Motion (for Uniform Acceleration)</h4>
              <ol>
                <li><strong>First Equation:</strong> <code>v_f = v_i + at</code></li>
                <li><strong>Second Equation:</strong> <code>s = v_i · t + 1/2 a · t²</code></li>
                <li><strong>Third Equation:</strong> <code>2as = v_f² - v_i²</code></li>
              </ol>
              <p>For motion under gravity (free fall), replace <code>a</code> with <code>g</code> (g = 9.8 m/s² or 10 m/s²) and <code>s</code> with height <code>h</code>.</p>
            `,
            definitions: [
              { term: 'Uniform Acceleration', meaning: 'Acceleration of an object is uniform if its velocity changes by equal amounts in equal intervals of time.' },
              { term: 'Free Fall', meaning: 'Motion of an object under the sole influence of Earth\'s gravity, with constant acceleration g ≈ 9.8 m/s².' }
            ],
            formula: 'v_f = v_i + at | s = v_i·t + 0.5·a·t² | 2as = v_f² - v_i²',
            workedExample: {
              title: 'Car Braking Distance Numerical',
              given: 'Initial velocity v_i = 72 km/h, Final velocity v_f = 0 (comes to rest), Time taken t = 5 s',
              required: 'Find (a) Retardation (deceleration) and (b) Distance travelled s before stopping.',
              formula: 'Convert v_i to m/s: 72 × (1000/3600) = 20 m/s. Use v_f = v_i + at and s = v_i t + 1/2 at².',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Unit Conversion</div> v_i = 72 km/h = 72 × 5/18 = 20 m/s</div>
                <div class="step-row"><div class="step-label">Step 2: Find acceleration a</div> 0 = 20 + a(5) → 5a = -20 → a = -4 m/s² (Retardation = 4 m/s²)</div>
                <div class="step-row"><div class="step-label">Step 3: Find distance s</div> s = (20)(5) + 0.5(-4)(5)² = 100 - 0.5(4)(25) = 100 - 50 = 50 m</div>
              `,
              finalAnswer: 'Deceleration = 4 m/s² and Stopping distance s = 50 meters.'
            },
            diagramSvg: `<svg width="340" height="130" viewBox="0 0 340 130" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <line x1="40" y1="100" x2="310" y2="100" stroke="#64748b" stroke-width="2" />
              <line x1="40" y1="20" x2="40" y2="100" stroke="#64748b" stroke-width="2" />
              <line x1="40" y1="70" x2="250" y2="30" stroke="#2563eb" stroke-width="3" />
              <line x1="250" y1="30" x2="250" y2="100" stroke="#94a3b8" stroke-dasharray="4" />
              <text x="15" y="70" font-size="11" font-weight="bold">v_i</text>
              <text x="15" y="30" font-size="11" font-weight="bold">v_f</text>
              <text x="245" y="115" font-size="11" font-weight="bold">t</text>
              <text x="130" y="85" font-size="12" fill="#2563eb" font-weight="bold">Area under v-t graph = Distance (s)</text>
            </svg>`,
            diagramCaption: 'Speed-Time Graph for uniformly accelerated motion where Area = Distance Travelled',
            applications: 'Automobile safety crash tests, aircraft runway design, train braking schedules, and satellite launch trajectories.',
            commonMistakes: 'Plugging in km/h directly into equations without converting to SI units (m/s). Always multiply km/h by 5/18 (or 1000/3600) first!',
            examTips: 'Derivation of 2nd or 3rd equation of motion from speed-time graph is a favorite Section C question.',
            quickRevision: [
              'v_f = v_i + at',
              's = v_i t + 1/2 at²',
              '2as = v_f² - v_i²',
              'km/h to m/s: multiply by 5/18.',
              'Under gravity going up: a = -g; at maximum height: v_f = 0.'
            ],
            miniMcq: {
              q: 'A ball dropped freely from a height reaches ground in 3 seconds (g = 10 m/s²). The height is:',
              options: ['15 m', '30 m', '45 m', '90 m'],
              correct: 2,
              explanation: 'h = v_i t + 1/2 g t² = 0(3) + 1/2(10)(3²) = 5 × 9 = 45 meters.'
            },
            questions: [
              { q: 'Short: Distinguish between scalar and vector quantities with two examples each.', a: 'Scalars have magnitude only (e.g., Mass, Speed, Distance). Vectors have both magnitude and specific direction (e.g., Velocity, Acceleration, Force).' },
              { q: 'Short: What is the velocity of a body thrown vertically upwards when it reaches the peak height?', a: 'Its velocity at the peak height is momentarily zero (v_f = 0 m/s).' },
              { q: 'Long: A train starts from rest with an acceleration of 0.5 m/s². Find its speed in km/h when it has travelled 100 m.', a: 'Given: v_i = 0, a = 0.5 m/s², s = 100 m. Using 3rd equation: 2as = v_f² - v_i² → 2(0.5)(100) = v_f² - 0 → 100 = v_f² → v_f = 10 m/s. In km/h = 10 × (18/5) = 36 km/h.' }
            ]
          }
        ]
      },
      {
        id: 'phy-ch3',
        number: 3,
        title: 'Dynamics and Newton\'s Laws',
        desc: 'Force, inertia, Newton\'s three laws of motion, momentum, and friction.',
        topics: [
          {
            id: 'phy-ch3-t1',
            title: 'Newton\'s Laws of Motion, Momentum and Friction',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Dynamics studies motion by analyzing the forces causing that motion. Sir Isaac Newton established the three laws of motion that govern everyday mechanics.',
            objectives: [
              'State Newton\'s First, Second, and Third Laws of Motion with real-world examples.',
              'Derive F = ma and Law of Conservation of Momentum (m1u1 + m2u2 = m1v1 + m2v2).',
              'Explain the nature, advantages, disadvantages, and methods of reducing friction.'
            ],
            detailedExplanation: `
              <h4>1. Newton's Three Laws of Motion</h4>
              <ul>
                <li><strong>First Law (Law of Inertia):</strong> A body continues in its state of rest or uniform motion in a straight line unless acted upon by an external net force.</li>
                <li><strong>Second Law:</strong> When a net force acts on a body, it produces acceleration in the direction of the force proportional to force and inversely proportional to mass: <code>F = ma</code>. (Also: Rate of change of momentum is equal to applied force: <code>F = (p_f - p_i) / t = Δp / t</code>).</li>
                <li><strong>Third Law:</strong> To every action there is always an equal and opposite reaction (Action = -Reaction).</li>
              </ul>
              <h4>2. Momentum and Conservation</h4>
              <p>Linear momentum is the quantity of motion: <code>p = m · v</code> (unit: kg·m/s or N·s). In an isolated system, the total momentum remains constant: <code>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</code>.</p>
              <h4>3. Friction</h4>
              <p>Friction opposes relative motion between surfaces in contact: <code>F_s = μ_s · R = μ_s · mg</code>. Methods to reduce friction include lubrication, ball bearings, polishing surfaces, and streamlining vehicle bodies.</p>
            `,
            definitions: [
              { term: 'Inertia', meaning: 'The property of a body due to which it resists any change in its state of rest or uniform motion.' },
              { term: 'Momentum', meaning: 'The product of mass and velocity of a body: p = mv.' },
              { term: 'Limiting Friction', meaning: 'The maximum value of static friction just before an object starts sliding.' }
            ],
            formula: 'F = ma | p = mv | F = Δp/t | m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ | F_s = μ_s R',
            workedExample: {
              title: 'Recoil Velocity of a Gun Numerical',
              given: 'Mass of bullet m₁ = 20 g = 0.02 kg, Velocity of bullet v₁ = 100 m/s, Mass of gun m₂ = 5 kg, Initial velocities u₁ = u₂ = 0',
              required: 'Calculate the recoil velocity of the gun v₂.',
              formula: 'Total Initial Momentum = Total Final Momentum → 0 = m₁v₁ + m₂v₂ → v₂ = -(m₁v₁) / m₂.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Set up Momentum Conservation</div> (0.02 kg)(100 m/s) + (5 kg)(v₂) = 0</div>
                <div class="step-row"><div class="step-label">Step 2: Solve for v₂</div> 2 + 5v₂ = 0 → 5v₂ = -2 → v₂ = -0.4 m/s</div>
              `,
              finalAnswer: 'Recoil velocity v₂ = -0.4 m/s (negative sign indicates backwards recoil direction).'
            },
            diagramSvg: `<svg width="340" height="120" viewBox="0 0 340 120" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="110" y="50" width="100" height="40" fill="#93c5fd" stroke="#1e40af" stroke-width="2" />
              <text x="145" y="75" font-size="13" font-weight="bold">Mass m</text>
              <line x1="210" y1="70" x2="280" y2="70" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow)" />
              <text x="235" y="60" font-size="11" font-weight="bold" fill="#16a34a">Force F</text>
              <line x1="110" y1="70" x2="50" y2="70" stroke="#dc2626" stroke-width="3" />
              <text x="55" y="60" font-size="11" font-weight="bold" fill="#dc2626">Friction f</text>
              <line x1="20" y1="90" x2="320" y2="90" stroke="#475569" stroke-width="2" />
            </svg>`,
            diagramCaption: 'Free Body Diagram of applied Force F vs Opposing Friction f',
            applications: 'Seatbelts utilize inertia; rocket propulsion operates via Newton\'s 3rd Law and conservation of momentum.',
            commonMistakes: 'Confusing mass and weight. Mass (kg) is constant scalar; Weight (W = mg, in N) is vector force depending on gravitational field g.',
            examTips: 'Prove F = ma using 2nd law or prove Law of Conservation of Momentum for full marks in subjective paper.',
            quickRevision: [
              '1st Law defines force qualitatively (Inertia).',
              '2nd Law measures force quantitatively: F = ma = Δp/t.',
              '3rd Law explains action-reaction pairs.',
              'Friction reduces by ball bearings, lubricants, polishing.'
            ],
            miniMcq: {
              q: 'A 5 kg block experiences a net force of 20 N. The acceleration produced is:',
              options: ['4 m/s²', '100 m/s²', '0.25 m/s²', '15 m/s²'],
              correct: 0,
              explanation: 'a = F / m = 20 N / 5 kg = 4 m/s².'
            },
            questions: [
              { q: 'Short: Why is rolling friction much less than sliding friction?', a: 'Because the point of contact between rolling surfaces is minuscule and there is no relative slipping or interlocking of surface irregularities.' },
              { q: 'Short: State the law of conservation of momentum.', a: 'In an isolated system (with no external force), the total linear momentum of interacting bodies before collision is equal to total linear momentum after collision.' },
              { q: 'Long: State Newton\'s second law of motion and derive the mathematical expression F = ma.', a: 'Statement: When force acts on a body, it produces acceleration proportional to force (a ∝ F) and inversely proportional to mass (a ∝ 1/m). Combining: a ∝ F/m → F ∝ ma → F = k·ma. In SI units k = 1, hence F = ma.' }
            ]
          }
        ]
      }
    ]
  },

  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    desc: 'Explore fundamental atomic structure, periodic table trends, chemical bonds, molarity, states of matter, and electrochemistry.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'chem-ch1',
        number: 1,
        title: 'Fundamentals of Chemistry',
        desc: 'Atomic number, mass number, mole concept, Avogadro\'s number, and empirical formulas.',
        topics: [
          {
            id: 'chem-ch1-t1',
            title: 'Mole Concept, Avogadro\'s Number and Molar Mass',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Because atoms and molecules are unimaginably small, chemists use the concept of the "Mole" to count particles by weighing substances.',
            objectives: [
              'Define mole, Avogadro\'s number (6.022 × 10²³), and molar mass.',
              'Interconvert between mass (grams), moles, and number of particles (atoms/molecules/ions).',
              'Calculate molar masses of ionic and covalent compounds.'
            ],
            detailedExplanation: `
              <h4>1. Definition of Mole and Avogadro's Constant</h4>
              <p>A <strong>Mole</strong> is defined as the amount of a substance that contains exactly <code>6.022 × 10²³</code> representative particles (atoms, molecules, or formula units). This constant is named <strong>Avogadro's Number (N_A)</strong>.</p>
              <h4>2. Molar Mass</h4>
              <p>The mass of one mole of a substance expressed in grams is called its <strong>Molar Mass</strong> (unit: g/mol). Numerically it equals the atomic mass, molecular mass, or formula mass in a.m.u.</p>
              <ul>
                <li>Atomic mass of Carbon = 12 amu → Molar mass = 12 g/mol</li>
                <li>Molecular mass of H₂O = (2 × 1) + 16 = 18 amu → Molar mass = 18 g/mol</li>
                <li>Formula mass of NaCl = 23 + 35.5 = 58.5 amu → Molar mass = 58.5 g/mol</li>
              </ul>
              <h4>3. Core Mole Formulas</h4>
              <ul>
                <li><code>Number of Moles (n) = Known Mass (g) / Molar Mass (g/mol)</code></li>
                <li><code>Number of Particles (N) = Number of Moles (n) × N_A</code></li>
                <li><code>Mass (m) = Moles (n) × Molar Mass (M)</code></li>
              </ul>
            `,
            definitions: [
              { term: 'Mole', meaning: 'The SI unit for amount of substance containing 6.022 × 10²³ elementary entities.' },
              { term: 'Avogadro\'s Number (N_A)', meaning: 'The constant 6.022 × 10²³ representing particles per mole of substance.' },
              { term: 'Molar Mass', meaning: 'The mass in grams of one mole of any pure chemical substance.' }
            ],
            formula: 'n = m / M | N = n × N_A | m = n × M',
            workedExample: {
              title: 'Calculating Number of Molecules in 36 grams of Water',
              given: 'Mass of water (H₂O) = 36 g, Atomic masses: H = 1 g/mol, O = 16 g/mol, N_A = 6.022 × 10²³',
              required: 'Find: (a) Number of moles and (b) Total number of water molecules.',
              formula: 'Molar Mass of H₂O = 2(1) + 16 = 18 g/mol. Moles n = m / M, Molecules N = n × N_A.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Calculate Moles</div> n = 36 g / 18 g/mol = 2.0 moles of H₂O</div>
                <div class="step-row"><div class="step-label">Step 2: Calculate Number of Molecules</div> N = 2.0 × (6.022 × 10²³) = 1.2044 × 10²⁴ molecules</div>
              `,
              finalAnswer: 'Contains 2 moles and 1.2044 × 10²⁴ molecules of H₂O.'
            },
            diagramSvg: `<svg width="340" height="120" viewBox="0 0 340 120" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="20" y="40" width="80" height="40" rx="6" fill="#93c5fd" stroke="#1d4ed8" />
              <text x="35" y="65" font-size="12" font-weight="bold">Mass (g)</text>
              <rect x="130" y="40" width="80" height="40" rx="6" fill="#86efac" stroke="#15803d" />
              <text x="145" y="65" font-size="12" font-weight="bold">Moles (n)</text>
              <rect x="240" y="40" width="80" height="40" rx="6" fill="#fde68a" stroke="#b45309" />
              <text x="250" y="65" font-size="12" font-weight="bold">Particles</text>
              <line x1="100" y1="50" x2="130" y2="50" stroke="#475569" stroke-width="2" />
              <text x="105" y="42" font-size="9">÷ M</text>
              <line x1="210" y1="50" x2="240" y2="50" stroke="#475569" stroke-width="2" />
              <text x="215" y="42" font-size="9">× N_A</text>
            </svg>`,
            diagramCaption: 'The Chemist\'s Mole Roadmap: Converting Mass ↔ Moles ↔ Particles',
            applications: 'Pharmaceutical drug dosages, chemical manufacturing stoichiometry, industrial fertilizer formulation, and battery chemistry.',
            commonMistakes: 'Confusing atomic mass (grams for 1 mole of atoms) with molecular mass for diatomic gases (e.g. Oxygen gas is O₂ = 32 g/mol, not 16 g/mol).',
            examTips: 'Always write atomic masses and balanced calculation steps with units for full marks.',
            quickRevision: [
              '1 mole = 6.022 × 10²³ particles.',
              'Molar mass = Atomic/molecular weight in grams.',
              'n = mass (g) / molar mass (g/mol).',
              'Particles N = n × 6.022 × 10²³.'
            ],
            miniMcq: {
              q: 'How many moles are present in 44 grams of Carbon Dioxide (CO₂)? [C=12, O=16]',
              options: ['0.5 mol', '1.0 mol', '2.0 mol', '4.4 mol'],
              correct: 1,
              explanation: 'Molar mass of CO₂ = 12 + 2(16) = 44 g/mol. Moles = 44 g / 44 g/mol = 1.0 mole.'
            },
            questions: [
              { q: 'Short: What is the mass in grams of 0.5 moles of NaCl?', a: 'Molar mass of NaCl = 23 + 35.5 = 58.5 g/mol. Mass = n × M = 0.5 × 58.5 = 29.25 grams.' },
              { q: 'Short: Define empirical formula and molecular formula.', a: 'Empirical formula gives the simplest whole-number ratio of atoms in a compound (e.g., CH₂O). Molecular formula gives the actual number of atoms of each element in a molecule (e.g., Glucose C₆H₁₂O₆).' },
              { q: 'Long: Calculate the number of atoms of hydrogen in 90 g of glucose (C₆H₁₂O₆). [C=12, H=1, O=16]', a: 'Molar mass of C₆H₁₂O₆ = 6(12) + 12(1) + 6(16) = 180 g/mol. Moles of glucose = 90 / 180 = 0.5 mol. Molecules of glucose = 0.5 × 6.022×10²³ = 3.011×10²³ molecules. Each molecule contains 12 H atoms. Total H atoms = 12 × 3.011×10²³ = 3.613 × 10²⁴ atoms.' }
            ]
          }
        ]
      },
      {
        id: 'chem-ch2',
        number: 2,
        title: 'Structure of Atoms & Periodic Table',
        desc: 'Rutherford & Bohr atomic models, electronic configuration, periodic trends (atomic radius, electronegativity).',
        topics: [
          {
            id: 'chem-ch2-t1',
            title: 'Bohr\'s Atomic Model and Electronic Configuration',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Neil Bohr proposed that electrons revolve around the atomic nucleus only in discrete orbits of fixed energy called shells or energy levels (K, L, M, N).',
            objectives: [
              'State Bohr\'s atomic postulates and how they resolved Rutherford\'s model defects.',
              'Apply the 2n² formula to determine maximum electron capacities of shells.',
              'Write electronic configuration of first 20 elements (H to Ca) in subshells s, p, d.'
            ],
            detailedExplanation: `
              <h4>1. Postulates of Bohr's Atomic Theory</h4>
              <ol>
                <li>Electrons revolve around nucleus in fixed circular paths called orbits or stationary energy levels.</li>
                <li>As long as an electron remains in a particular orbit, it neither absorbs nor radiates energy.</li>
                <li>Energy is emitted (ΔE = E₂ - E₁ = hν) when an electron jumps from a higher to lower orbit, and absorbed when jumping from lower to higher orbit.</li>
                <li>An electron can only revolve in orbits having quantized angular momentum: <code>mvr = n(h / 2π)</code>.</li>
              </ol>
              <h4>2. Shells and Subshells Capacity</h4>
              <ul>
                <li><strong>K shell (n = 1):</strong> max 2(1)² = 2 electrons (1s)</li>
                <li><strong>L shell (n = 2):</strong> max 2(2)² = 8 electrons (2s, 2p)</li>
                <li><strong>M shell (n = 3):</strong> max 2(3)² = 18 electrons (3s, 3p, 3d)</li>
                <li><strong>N shell (n = 4):</strong> max 2(4)² = 32 electrons</li>
                <li>Subshell capacities: <code>s = 2, p = 6, d = 10, f = 14</code></li>
              </ul>
              <h4>3. Aufbau Principle Order of Filling</h4>
              <p><code>1s → 2s → 2p → 3s → 3p → 4s → 3d</code></p>
            `,
            definitions: [
              { term: 'Electronic Configuration', meaning: 'The distribution of electrons among the various orbitals and energy levels of an atom.' },
              { term: 'Isotopes', meaning: 'Atoms of the same element having same atomic number (Z) but different mass numbers (A) due to different neutron counts.' }
            ],
            formula: 'Max electrons in shell = 2n² | ΔE = E₂ - E₁ = hν | mvr = nh / 2π',
            workedExample: {
              title: 'Electronic Configuration of Sodium (Na, Z=11) and Chlorine (Cl, Z=17)',
              given: 'Sodium (Z = 11), Chlorine (Z = 17)',
              required: 'Write shell (K, L, M) and subshell (s, p) electronic configurations.',
              formula: 'Fill lowest energy subshells first: 1s² 2s² 2p⁶ 3s² 3p⁶',
              solution: `
                <div class="step-row"><div class="step-label">Sodium (Na, 11 e⁻)</div> Subshell: 1s² 2s² 2p⁶ 3s¹ | Shells: K = 2, L = 8, M = 1 (Valence e⁻ = 1)</div>
                <div class="step-row"><div class="step-label">Chlorine (Cl, 17 e⁻)</div> Subshell: 1s² 2s² 2p⁶ 3s² 3p⁵ | Shells: K = 2, L = 8, M = 7 (Valence e⁻ = 7)</div>
              `,
              finalAnswer: 'Na: 1s² 2s² 2p⁶ 3s¹ ; Cl: 1s² 2s² 2p⁶ 3s² 3p⁵.'
            },
            diagramSvg: `<svg width="340" height="130" viewBox="0 0 340 130" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <circle cx="170" cy="65" r="12" fill="#ef4444" /><text x="165" y="69" font-size="10" fill="#fff" font-weight="bold">+N</text>
              <circle cx="170" cy="65" r="30" fill="none" stroke="#2563eb" stroke-dasharray="3" />
              <circle cx="170" cy="65" r="50" fill="none" stroke="#2563eb" stroke-dasharray="3" />
              <circle cx="140" cy="65" r="4" fill="#1e40af" /><circle cx="200" cy="65" r="4" fill="#1e40af" />
              <text x="205" y="30" font-size="10" fill="#2563eb">L shell (8e⁻)</text>
              <text x="180" y="45" font-size="10" fill="#2563eb">K shell (2e⁻)</text>
            </svg>`,
            diagramCaption: 'Bohr Planetary Model of Atom showing quantized concentric orbits',
            applications: 'Fireworks color emission, semiconductor doping in microchips, laser spectroscopy, and MRI imaging.',
            commonMistakes: 'Filling 3d before 4s. According to Aufbau principle, 4s has lower energy than 3d and fills first (e.g. Potassium: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹).',
            examTips: 'Know the isotopes of Hydrogen (Protium ¹H, Deuterium ²H, Tritium ³H) and Carbon (¹²C, ¹³C, ¹⁴C used in radiocarbon dating).',
            quickRevision: [
              'Bohr: Orbits are quantized; no energy loss in stationary state.',
              'Shell capacity: 2n² (K=2, L=8, M=18, N=32).',
              'Subshell order: 1s 2s 2p 3s 3p 4s 3d.',
              'Valence electrons determine chemical reactivity.'
            ],
            miniMcq: {
              q: 'The maximum number of electrons that can be accommodated in the M shell (n=3) is:',
              options: ['8', '18', '32', '2'],
              correct: 1,
              explanation: 'Using formula 2n² = 2(3)² = 2(9) = 18 electrons.'
            },
            questions: [
              { q: 'Short: State two defects of Rutherford\'s atomic model.', a: '1. According to classical electromagnetic theory, revolving electrons should radiate energy continuously and collapse into the nucleus. 2. It predicted a continuous spectrum, whereas atoms produce a line spectrum.' },
              { q: 'Short: What are isotopes? Mention one medical use of isotopes.', a: 'Isotopes are atoms of the same element with same atomic number but different mass numbers. Cobalt-60 is used in cancer radiotherapy.' },
              { q: 'Long: Compare Ionic and Covalent bonds in terms of formation, melting points, and electrical conductivity.', a: 'Ionic bonds form by complete transfer of electrons between metal and non-metal (e.g. NaCl), having high melting points and conducting electricity in molten/aqueous state. Covalent bonds form by mutual sharing of electrons between non-metals (e.g. H₂O), having lower melting points and non-conducting.' }
            ]
          }
        ]
      }
    ]
  },

  biology: {
    id: 'biology',
    name: 'Biology',
    icon: '🔬',
    desc: 'Master the science of life: cells & organelles, mitosis vs meiosis, bioenergetics (photosynthesis & respiration), enzymes, and transport.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'bio-ch1',
        number: 1,
        title: 'Introduction to Biology and Cell Biology',
        desc: 'Major branches of biology, levels of organization, cell theory, and cellular organelles.',
        topics: [
          {
            id: 'bio-ch1-t1',
            title: 'Cell Structure, Organelles and Cell Theory',
            time: '40 mins',
            difficulty: 'Medium',
            intro: 'The cell is the basic structural, functional, and biological unit of all known living organisms. Cell biology unveils the intricate microscopic machinery of life.',
            objectives: [
              'State the three principles of the Classical Cell Theory (Schleiden, Schwann, Virchow).',
              'Compare prokaryotic and eukaryotic cells.',
              'Explain structure and functions of nucleus, mitochondria, ribosomes, endoplasmic reticulum, and chloroplasts.'
            ],
            detailedExplanation: `
              <h4>1. The Classical Cell Theory</h4>
              <ol>
                <li>All living organisms are composed of one or more cells.</li>
                <li>The cell is the most basic structural and functional unit of life.</li>
                <li>All cells arise from pre-existing cells through division (<em>"Omnis cellula e cellula"</em> - Rudolf Virchow).</li>
              </ol>
              <h4>2. Prokaryotic vs Eukaryotic Cells</h4>
              <ul>
                <li><strong>Prokaryotes (Bacteria):</strong> Lack membrane-bound nucleus and membrane-bound organelles. Circular DNA floats in nucleoid region; 70S ribosomes.</li>
                <li><strong>Eukaryotes (Plants, Animals, Fungi):</strong> True nucleus with nuclear membrane; membrane-bound organelles (mitochondria, chloroplasts, Golgi apparatus); 80S ribosomes.</li>
              </ul>
              <h4>3. Key Cell Organelles and Functions</h4>
              <ul>
                <li><strong>Nucleus:</strong> The control center of the cell containing genetic material (chromatin/DNA) and nucleolus.</li>
                <li><strong>Mitochondria ("Powerhouse of the Cell"):</strong> Site of aerobic cellular respiration, generating chemical energy in the form of ATP. Has double membrane with inner folded cristae.</li>
                <li><strong>Chloroplasts:</strong> Found in photosynthetic plant cells; contain green pigment chlorophyll to capture sunlight for photosynthesis.</li>
                <li><strong>Ribosomes:</strong> Non-membranous granules composed of RNA and proteins; sites of protein synthesis.</li>
                <li><strong>Endoplasmic Reticulum (ER):</strong> Rough ER (with ribosomes) synthesizes proteins; Smooth ER synthesizes lipids and detoxifies chemicals.</li>
              </ul>
            `,
            definitions: [
              { term: 'Cell', meaning: 'The fundamental structural and functional unit of all living organisms.' },
              { term: 'Mitochondria', meaning: 'Double-membrane bound organelle responsible for ATP cellular energy production through respiration.' },
              { term: 'Chloroplast', meaning: 'Plastid containing chlorophyll responsible for photosynthetic sugar production in plant cells.' }
            ],
            formula: 'Cell Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36 ATP',
            workedExample: {
              title: 'Comparison: Plant Cell vs Animal Cell',
              given: 'Structural features of plant and animal cells',
              required: 'Tabulate 4 major differences between plant and animal cells.',
              formula: 'Compare: Cell wall, plastids, vacuoles, centrioles.',
              solution: `
                <div class="step-row"><div class="step-label">1. Cell Wall</div> Plant cell has a rigid cellulose cell wall outside plasma membrane; Animal cell has no cell wall.</div>
                <div class="step-row"><div class="step-label">2. Chloroplasts</div> Plant cells have chloroplasts for photosynthesis; Animal cells lack chloroplasts.</div>
                <div class="step-row"><div class="step-label">3. Vacuole</div> Plant cells have one large central permanent vacuole; Animal cells have multiple small temporary vacuoles.</div>
                <div class="step-row"><div class="step-label">4. Centrioles</div> Animal cells possess centrioles (for spindle fibers); Higher plant cells lack centrioles.</div>
              `,
              finalAnswer: 'Tabulated contrast confirms key differences in cell wall, chloroplasts, vacuole size, and centrioles.'
            },
            diagramSvg: `<svg width="340" height="140" viewBox="0 0 340 140" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="40" y="20" width="260" height="100" rx="15" fill="#dcfce7" stroke="#16a34a" stroke-width="3" />
              <circle cx="170" cy="70" r="25" fill="#bae6fd" stroke="#0284c7" stroke-width="2" />
              <circle cx="170" cy="70" r="8" fill="#0369a1" />
              <ellipse cx="90" cy="50" rx="16" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
              <text x="80" y="54" font-size="9" font-weight="bold">Mito</text>
              <ellipse cx="250" cy="50" rx="16" ry="10" fill="#86efac" stroke="#15803d" stroke-width="2" />
              <text x="240" y="54" font-size="9" font-weight="bold">Chloro</text>
              <text x="155" y="74" font-size="10" fill="#fff" font-weight="bold">Nucleus</text>
              <text x="50" y="115" font-size="10" fill="#15803d" font-weight="bold">Plant Cell: Cell Wall + Chloroplast + Central Vacuole</text>
            </svg>`,
            diagramCaption: 'Diagrammatic representation of Plant Cell structure and internal organelles',
            applications: 'Stem cell therapy in regenerative medicine, genetic engineering of disease-resistant crops, and cancer chemotherapy targeting mitosis.',
            commonMistakes: 'Believing that plant cells only carry out photosynthesis and not respiration. Plants respire 24/7 using mitochondria!',
            examTips: 'Draw neat, labelled diagrams of animal vs plant cells or mitochondria for subjective questions.',
            quickRevision: [
              'Cell Theory: All life is made of cells; cells are basic unit; all cells come from pre-existing cells.',
              'Prokaryotes lack true nucleus; Eukaryotes have membrane-bound nucleus.',
              'Mitochondria = Powerhouse (ATP); Ribosomes = Protein factory; Chloroplast = Photosynthesis.',
              'Plant cells have rigid cellulose wall and large central vacuole.'
            ],
            miniMcq: {
              q: 'Which organelle is known as the "Powerhouse of the Cell"?',
              options: ['Ribosome', 'Golgi Apparatus', 'Mitochondria', 'Lysosome'],
              correct: 2,
              explanation: 'Mitochondria produce cellular ATP energy through aerobic respiration.'
            },
            questions: [
              { q: 'Short: Who proposed the Cell Theory and who added that cells arise from pre-existing cells?', a: 'Theodor Schwann and Matthias Schleiden (1839) proposed the cell theory; Rudolf Virchow (1855) added that all cells arise from pre-existing cells.' },
              { q: 'Short: What is the primary function of ribosomes and Golgi apparatus?', a: 'Ribosomes synthesize proteins; Golgi apparatus modifies, sorts, and packages proteins and lipids for secretion.' },
              { q: 'Long: Describe the structure and biological significance of Mitosis, detailing Prophase, Metaphase, Anaphase, and Telophase.', a: 'Mitosis produces two genetically identical daughter cells with the same chromosome number as parent cell (2n). Phases: 1. Prophase: Chromatin condenses into chromosomes, nuclear envelope disappears. 2. Metaphase: Chromosomes align at equatorial plate. 3. Anaphase: Sister chromatids separate to opposite poles. 4. Telophase: Nuclear envelope reforms, followed by cytokinesis. Significance: Growth, tissue repair, asexual reproduction.' }
            ]
          }
        ]
      }
    ]
  },

  computer: {
    id: 'computer',
    name: 'Computer Science',
    icon: '💻',
    desc: 'Understand computer architecture, algorithms, flowcharts, networks, C/Python programming basics, and cyber safety.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'cs-ch1',
        number: 1,
        title: 'Fundamentals of Computer and Problem Solving',
        desc: 'Computer generations, hardware components, flowcharts, and algorithm development.',
        topics: [
          {
            id: 'cs-ch1-t1',
            title: 'Algorithms, Flowcharts and Computer Generations',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Computer science is the study of computation, algorithms, hardware, and information systems. Solving problems methodically requires well-defined algorithms and visual flowcharts.',
            objectives: [
              'Distinguish the 5 computer generations by their core switching technology.',
              'Design step-by-step finite algorithms for mathematical and computational tasks.',
              'Use standard flowchart symbols (Terminal, Process, Input/Output, Decision, Connector) correctly.'
            ],
            detailedExplanation: `
              <h4>1. The 5 Generations of Computers</h4>
              <ul>
                <li><strong>1st Generation (1940–1956):</strong> Vacuum Tubes. Programmed in machine language; bulky and generated extreme heat (e.g. ENIAC, UNIVAC).</li>
                <li><strong>2nd Generation (1956–1963):</strong> Transistors. Faster, smaller, used assembly language and early high-level languages (FORTRAN, COBOL).</li>
                <li><strong>3rd Generation (1964–1971):</strong> Integrated Circuits (ICs). Multiple transistors fabricated on silicon chips (e.g. IBM 360).</li>
                <li><strong>4th Generation (1971–Present):</strong> Microprocessors / VLSI & VLSIC. Entire CPU on a single chip (Intel 4004 to modern multi-core processors).</li>
                <li><strong>5th Generation (Present & Future):</strong> Artificial Intelligence, parallel processing, and quantum computing.</li>
              </ul>
              <h4>2. Standard Flowchart Symbols</h4>
              <ul>
                <li><strong>Oval (Terminal):</strong> Start and End of the program.</li>
                <li><strong>Parallelogram (Input/Output):</strong> Reading input or printing output.</li>
                <li><strong>Rectangle (Process):</strong> Arithmetic calculations, variable assignments (e.g., Sum = A + B).</li>
                <li><strong>Diamond (Decision):</strong> Conditional branching with True/False or Yes/No paths (e.g., Is N > 0?).</li>
                <li><strong>Flowlines (Arrows):</strong> Indicate direction of program logic execution.</li>
              </ul>
            `,
            definitions: [
              { term: 'Algorithm', meaning: 'A finite, step-by-step sequence of unambiguous instructions to solve a specific problem.' },
              { term: 'Flowchart', meaning: 'A graphical or pictorial representation of an algorithm using standardized geometric symbols.' }
            ],
            formula: 'CPU = ALU (Arithmetic Logic Unit) + CU (Control Unit) + Registers',
            workedExample: {
              title: 'Algorithm & Flowchart to Find Largest of Two Numbers A and B',
              given: 'Two input numbers A and B',
              required: 'Step-by-step algorithm and decision logic.',
              formula: 'Compare A > B using conditional check.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Start</div> Start the program.</div>
                <div class="step-row"><div class="step-label">Step 2: Input</div> Input two numbers A and B.</div>
                <div class="step-row"><div class="step-label">Step 3: Decision</div> If A > B Then Print "A is larger" Else Print "B is larger".</div>
                <div class="step-row"><div class="step-label">Step 4: End</div> Stop the execution.</div>
              `,
              finalAnswer: 'Finite algorithm successfully determines maximum in O(1) time.'
            },
            diagramSvg: `<svg width="340" height="150" viewBox="0 0 340 150" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="120" y="10" width="100" height="25" rx="12" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2" />
              <text x="155" y="27" font-size="11" font-weight="bold">START</text>
              <line x1="170" y1="35" x2="170" y2="50" stroke="#475569" stroke-width="2" />
              <polygon points="120,70 140,50 220,50 200,70" fill="#fde68a" stroke="#d97706" stroke-width="2" />
              <text x="135" y="64" font-size="10" font-weight="bold">Input N</text>
              <line x1="170" y1="70" x2="170" y2="85" stroke="#475569" stroke-width="2" />
              <polygon points="170,85 210,105 170,125 130,105" fill="#86efac" stroke="#15803d" stroke-width="2" />
              <text x="145" y="109" font-size="10" font-weight="bold">Is N > 0?</text>
              <line x1="210" y1="105" x2="270" y2="105" stroke="#475569" stroke-width="2" />
              <text x="225" y="98" font-size="9" fill="#15803d">YES</text>
              <rect x="270" y="90" width="60" height="30" fill="#cbd5e1" />
              <text x="278" y="110" font-size="9">Positive</text>
            </svg>`,
            diagramCaption: 'Flowchart Decision Structure demonstrating Conditional Branching',
            applications: 'Software development, automated manufacturing logic, search engines, and self-driving car algorithms.',
            commonMistakes: 'Using a rectangle instead of a parallelogram for input/output, or creating an infinite loop without an exit condition.',
            examTips: 'Know all 5 generations\' switching devices and practice drawing standard flowcharts for prime numbers or factorial.',
            quickRevision: [
              '1st: Vacuum tubes, 2nd: Transistors, 3rd: ICs, 4th: Microprocessors, 5th: AI.',
              'Oval = Start/Stop; Parallelogram = Input/Output; Rectangle = Process; Diamond = Decision.',
              'An algorithm must be finite, clear, and produce correct output.'
            ],
            miniMcq: {
              q: 'Which geometric symbol is used in flowcharts to represent a Decision / Condition?',
              options: ['Rectangle', 'Diamond', 'Parallelogram', 'Circle'],
              correct: 1,
              explanation: 'A diamond shape represents a condition or decision with multiple branching paths (True/False).'
            },
            questions: [
              { q: 'Short: Distinguish between RAM and ROM.', a: 'RAM (Random Access Memory) is volatile primary memory that loses data when power is turned off. ROM (Read Only Memory) is non-volatile permanent memory containing boot instructions (BIOS).' },
              { q: 'Short: Define compiler and interpreter.', a: 'A compiler translates entire high-level source code into machine code in one go. An interpreter translates code line-by-line during execution.' },
              { q: 'Long: Write an algorithm and describe the flowchart to calculate the average of 3 numbers.', a: 'Step 1: Start. Step 2: Read values of A, B, and C. Step 3: Compute Sum = A + B + C. Step 4: Compute Average = Sum / 3. Step 5: Output Average. Step 6: End.' }
            ]
          }
        ]
      }
    ]
  },

  english: {
    id: 'english',
    name: 'English',
    icon: '📖',
    desc: 'Master English grammar, 12 tenses, active & passive voice, direct & indirect speech, formal letter/application writing, and comprehension.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'eng-ch1',
        number: 1,
        title: 'Grammar and Sentence Structure',
        desc: 'Parts of speech, tense mastery, voice transformation, and punctuation.',
        topics: [
          {
            id: 'eng-ch1-t1',
            title: 'Tenses and Active vs Passive Voice Transformation',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'Mastering English tenses and voice transformations is essential for clear writing, accurate essay composition, and board examination excellence.',
            objectives: [
              'Master all 12 English tenses (Present, Past, Future - Simple, Continuous, Perfect, Perfect Continuous).',
              'Convert sentences from Active Voice to Passive Voice following standard grammatical rules.',
              'Identify changes in auxiliary verbs and pronouns during voice transformations.'
            ],
            detailedExplanation: `
              <h4>1. Core Rules for Active to Passive Voice</h4>
              <ol>
                <li>The object of the active sentence becomes the subject of the passive sentence.</li>
                <li>Use an appropriate form of the auxiliary verb <code>to be</code> (is/am/are, was/were, being, been) according to the tense.</li>
                <li>The main verb is ALWAYS converted to its <strong>Past Participle (3rd Form of Verb - V3)</strong>.</li>
                <li>The preposition <code>by</code> is placed before the agent (the original subject).</li>
                <li><em>Note:</em> Intransitive verbs and sentences in Present/Past/Future Perfect Continuous or Future Continuous cannot be changed to passive.</li>
              </ol>
              <h4>2. Tense-Wise Voice Conversion Table</h4>
              <ul>
                <li><strong>Present Simple:</strong> Active: S + V1/V5 + O → Passive: O + is/am/are + V3 + by + S (e.g. "He writes a letter" → "A letter is written by him").</li>
                <li><strong>Present Continuous:</strong> Active: S + is/am/are + V-ing + O → Passive: O + is/am/are + <em>being</em> + V3 + by + S.</li>
                <li><strong>Present Perfect:</strong> Active: S + has/have + V3 + O → Passive: O + has/have + <em>been</em> + V3 + by + S.</li>
                <li><strong>Past Simple:</strong> Active: S + V2 + O → Passive: O + was/were + V3 + by + S (e.g. "She baked a cake" → "A cake was baked by her").</li>
                <li><strong>Past Continuous:</strong> Active: S + was/were + V-ing + O → Passive: O + was/were + <em>being</em> + V3 + by + S.</li>
                <li><strong>Past Perfect:</strong> Active: S + had + V3 + O → Passive: O + had + <em>been</em> + V3 + by + S.</li>
                <li><strong>Future Simple:</strong> Active: S + will/shall + V1 + O → Passive: O + will be + V3 + by + S.</li>
              </ul>
            `,
            definitions: [
              { term: 'Active Voice', meaning: 'The sentence structure where the subject performs the action (e.g., "The teacher praised Ali").' },
              { term: 'Passive Voice', meaning: 'The sentence structure where the subject receives the action (e.g., "Ali was praised by the teacher").' }
            ],
            formula: 'Active: Subject + Verb + Object → Passive: Object + [be verb] + V3 + by + Subject',
            workedExample: {
              title: 'Voice Transformation Exercise',
              given: 'Sentence: "The students have completed the science project."',
              required: 'Convert into Passive Voice.',
              formula: 'Present Perfect: Object + has/have + been + V3 + by + Subject.',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Identify Components</div> Subject = "The students", Verb = "have completed", Object = "the science project"</div>
                <div class="step-row"><div class="step-label">Step 2: Move Object to front</div> "The science project" (singular)</div>
                <div class="step-row"><div class="step-label">Step 3: Add auxiliary + been + V3</div> "has been completed"</div>
                <div class="step-row"><div class="step-label">Step 4: Add by + agent</div> "by the students"</div>
              `,
              finalAnswer: '"The science project has been completed by the students."'
            },
            diagramSvg: `<svg width="340" height="110" viewBox="0 0 340 110" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <text x="30" y="35" font-size="12" font-weight="bold" fill="#2563eb">Active:</text>
              <rect x="80" y="20" width="60" height="25" rx="4" fill="#dbeafe" /><text x="90" y="37" font-size="11">Subject</text>
              <text x="150" y="37" font-size="11">→</text>
              <rect x="170" y="20" width="50" height="25" rx="4" fill="#fef3c7" /><text x="180" y="37" font-size="11">Verb</text>
              <text x="230" y="37" font-size="11">→</text>
              <rect x="250" y="20" width="60" height="25" rx="4" fill="#dcfce7" /><text x="260" y="37" font-size="11">Object</text>
              
              <text x="30" y="85" font-size="12" font-weight="bold" fill="#16a34a">Passive:</text>
              <rect x="80" y="70" width="60" height="25" rx="4" fill="#dcfce7" /><text x="90" y="87" font-size="11">Object</text>
              <text x="150" y="87" font-size="11">→</text>
              <rect x="170" y="70" width="65" height="25" rx="4" fill="#fef3c7" /><text x="175" y="87" font-size="10">be + V3</text>
              <text x="245" y="87" font-size="11">→</text>
              <rect x="260" y="70" width="70" height="25" rx="4" fill="#dbeafe" /><text x="265" y="87" font-size="10">by Subject</text>
            </svg>`,
            diagramCaption: 'Inversion of Subject and Object Roles between Active and Passive Voice',
            applications: 'Formal academic writing, scientific experiment reporting (where action is more important than person), and official journalism.',
            commonMistakes: 'Using 1st or 2nd form of verb in passive voice. Passive voice ALWAYS requires the 3rd form (Past Participle V3).',
            examTips: 'In Board grammar sections, 5 marks are dedicated to Voice change and 5 marks to Direct/Indirect Speech.',
            quickRevision: [
              'Passive Voice always uses V3 (Past Participle).',
              'Continuous tenses insert "being" (is being, was being).',
              'Perfect tenses insert "been" (has been, had been, will have been).',
              'Modal verbs: Modal + be + V3 (e.g. can be done, must be obeyed).'
            ],
            miniMcq: {
              q: 'Change into passive: "She cleans the room every day."',
              options: ['The room is cleaned by her every day.', 'The room was cleaned by her every day.', 'The room has been cleaned by her.', 'The room is being cleaned by her.'],
              correct: 0,
              explanation: 'Present simple uses "is/are + V3". The room is singular, hence "The room is cleaned by her every day."'
            },
            questions: [
              { q: 'Short: Change to passive: "They are playing cricket."', a: '"Cricket is being played by them."' },
              { q: 'Short: Change to passive: "Who wrote this letter?"', a: '"By whom was this letter written?"' },
              { q: 'Long: Explain the rules of changing an imperative sentence (command or request) into passive voice with two examples.', a: 'For imperative sentences expressing orders: "Let + Object + be + V3". Example: "Shut the door" → "Let the door be shut." For advice/request: "You are requested/advised to + V1 + Object". Example: "Please help me" → "You are requested to help me."' }
            ]
          }
        ]
      }
    ]
  },

  pakstudy: {
    id: 'pakstudy',
    name: 'Pakistan Studies',
    icon: '🇵🇰',
    desc: 'Historical evolution of the Two-Nation Theory, Pakistan Movement (1940-1947), Quaid-e-Azam\'s leadership, and geography of Pakistan.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'pak-ch1',
        number: 1,
        title: 'Ideological Basis of Pakistan & Pakistan Movement',
        desc: 'Meaning of ideology, Two-Nation Theory, Lahore Resolution 1940, and emergence of Pakistan 1947.',
        topics: [
          {
            id: 'pak-ch1-t1',
            title: 'Ideology of Pakistan and The Two-Nation Theory',
            time: '35 mins',
            difficulty: 'Medium',
            intro: 'The creation of Pakistan was based on an ideology rooted in Islamic teachings and the Two-Nation Theory, demanding a separate homeland for Muslims of the subcontinent.',
            objectives: [
              'Define the concept and sources of Ideology (Nazaria-e-Pakistan).',
              'Explain the Two-Nation Theory in the light of Quaid-e-Azam Muhammad Ali Jinnah and Allama Muhammad Iqbal\'s statements.',
              'Analyze the historical significance of the historic Lahore Resolution passed on 23rd March 1940.'
            ],
            detailedExplanation: `
              <h4>1. Meaning and Sources of Ideology</h4>
              <p>An <strong>Ideology</strong> is a comprehensive set of shared beliefs, values, and objectives that guides the social, cultural, and political life of a nation. The Ideology of Pakistan is based on Islamic principles of social justice, equality, and brotherhood.</p>
              <h4>2. The Two-Nation Theory (Do-Qaumi Nazaria)</h4>
              <p>The Two-Nation Theory stated that Muslims and Hindus in the Indian subcontinent are two distinct nations with totally different religions, customs, historical traditions, and social philosophies. Sir Syed Ahmed Khan was the first pioneer of this concept after the Urdu-Hindi controversy in 1867.</p>
              <h4>3. Pronouncements of National Leaders</h4>
              <ul>
                <li><strong>Allama Muhammad Iqbal (Allahabad Address, 1930):</strong> <em>"I would like to see the Punjab, North-West Frontier Province, Sindh and Baluchistan amalgamated into a single State. Self-government within the British Empire or without the British Empire, the formation of a consolidated North-West Indian Muslim State appears to me to be the final destiny of the Muslims."</em></li>
                <li><strong>Quaid-e-Azam Muhammad Ali Jinnah (March 1940, Lahore):</strong> <em>"Hindus and Muslims belong to two different religious philosophies, social customs, and literatures. They neither intermarry nor interdine together... To yoke together two such nations under a single state must lead to growing discontent and final destruction."</em></li>
              </ul>
              <h4>4. Lahore Resolution (23rd March 1940)</h4>
              <p>Presented by A.K. Fazlul Haq (Sher-e-Bengal) at Minto Park (now Minar-e-Pakistan), Lahore, under the presidency of Quaid-e-Azam, demanding that geographically contiguous Muslim-majority areas in the North-Western and Eastern zones of India be grouped to constitute independent states.</p>
            `,
            definitions: [
              { term: 'Two-Nation Theory', meaning: 'The foundational concept that Muslims and Hindus of the Subcontinent are two distinct nations with divergent cultures and civilizations.' },
              { term: 'Lahore Resolution 1940', meaning: 'Historic resolution passed on March 23, 1940 demanding sovereign separate territories for the Muslims of India.' }
            ],
            formula: 'Foundations of Pakistan Ideology: Islamic Faith + Distinct Culture + Economic Self-Determination',
            workedExample: {
              title: 'Key Milestones of Pakistan Movement Timeline',
              given: 'Major historical dates (1867, 1906, 1930, 1940, 1947)',
              required: 'Arrange and describe the historical significance of each milestone.',
              formula: 'Chronological historical sequence.',
              solution: `
                <div class="step-row"><div class="step-label">1867</div> Urdu-Hindi Controversy (Sir Syed initiates Two-Nation Theory).</div>
                <div class="step-row"><div class="step-label">1906</div> Establishment of All-India Muslim League in Dhaka.</div>
                <div class="step-row"><div class="step-label">1930</div> Allama Iqbal\'s historic Allahabad Address presenting the vision of a Muslim State.</div>
                <div class="step-row"><div class="step-label">1940</div> Lahore (Pakistan) Resolution passed on 23rd March.</div>
                <div class="step-row"><div class="step-label">1947</div> 14th August 1947 (27th Ramadan) - Emergence of Pakistan as an independent sovereign state.</div>
              `,
              finalAnswer: 'Chronological timeline established from 1867 ideological origin to 1947 independence.'
            },
            diagramSvg: `<svg width="340" height="120" viewBox="0 0 340 120" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <line x1="30" y1="60" x2="310" y2="60" stroke="#16a34a" stroke-width="3" />
              <circle cx="50" cy="60" r="6" fill="#16a34a" /><text x="35" y="45" font-size="10" font-weight="bold">1867</text><text x="30" y="85" font-size="9">Sir Syed</text>
              <circle cx="120" cy="60" r="6" fill="#16a34a" /><text x="105" y="45" font-size="10" font-weight="bold">1906</text><text x="100" y="85" font-size="9">ML Formed</text>
              <circle cx="190" cy="60" r="6" fill="#16a34a" /><text x="175" y="45" font-size="10" font-weight="bold">1930</text><text x="170" y="85" font-size="9">Allahabad</text>
              <circle cx="250" cy="60" r="6" fill="#16a34a" /><text x="235" y="45" font-size="10" font-weight="bold">1940</text><text x="230" y="85" font-size="9">Resolution</text>
              <circle cx="300" cy="60" r="6" fill="#ef4444" /><text x="285" y="45" font-size="10" font-weight="bold" fill="#ef4444">1947</text><text x="275" y="85" font-size="9" fill="#ef4444">Pakistan</text>
            </svg>`,
            diagramCaption: 'Chronological Roadmap of the Pakistan Movement (1867 - 1947)',
            applications: 'National constitution preamble, foreign policy orientation, minority rights framework, and civic unity.',
            commonMistakes: 'Writing that Allama Iqbal was the President of the 1940 Lahore Session (Quaid-e-Azam presided over the 1940 session; Iqbal delivered his address in 1930).',
            examTips: 'Memorize exact quotes of Quaid-e-Azam and Allama Iqbal for high-scoring long answers.',
            quickRevision: [
              'Ideology of Pakistan is based on Islam and Two-Nation Theory.',
              'Sir Syed Ahmed Khan first termed Muslims and Hindus as two separate nations in 1867.',
              'Allama Iqbal proposed a consolidated North-West Muslim state at Allahabad in 1930.',
              'Pakistan Resolution was passed on 23rd March 1940; moved by A.K. Fazlul Haq.'
            ],
            miniMcq: {
              q: 'Who presented the historic Lahore Resolution on 23rd March 1940?',
              options: ['Quaid-e-Azam Muhammad Ali Jinnah', 'A.K. Fazlul Haq', 'Allama Muhammad Iqbal', 'Liaquat Ali Khan'],
              correct: 1,
              explanation: 'A.K. Fazlul Haq (the Prime Minister of Bengal) moved the historic Lahore Resolution, while Quaid-e-Azam presided over the session.'
            },
            questions: [
              { q: 'Short: State two major points of Allama Iqbal\'s Presidential Address at Allahabad in 1930.', a: '1. Islam is not just a private religion but a complete social and legal order. 2. Formation of a consolidated Muslim state in the North-West of India is the ultimate destiny of Muslims.' },
              { q: 'Short: When and where was the All-India Muslim League founded?', a: 'The All-India Muslim League was founded on 30th December 1906 at Dhaka (under the chairmanship of Nawab Waqar-ul-Mulk).' },
              { q: 'Long: Explain the Ideology of Pakistan in the light of Quaid-e-Azam Muhammad Ali Jinnah\'s speeches and statements.', a: 'Quaid-e-Azam consistently emphasized that Pakistan was demanded because Muslims needed a territory where they could live in accordance with their religious, cultural, and spiritual ideals. In his 1944 correspondence with Gandhi, he stated: "We are a nation with our own distinctive culture and civilization, language and literature, art and architecture, names and nomenclature, sense of values and proportion, legal laws and moral codes, customs and calendar, history and traditions."' }
            ]
          }
        ]
      }
    ]
  },

  islamiat: {
    id: 'islamiat',
    name: 'Islamiat',
    icon: '🕌',
    desc: 'Fundamental beliefs (Tauheed, Risalat, Akhirah), pillars of Islam (Namaz, Roza, Zakat, Hajj), Seerat-un-Nabi (PBUH), and Islamic ethics.',
    badge: 'Sindh & National Board',
    chapters: [
      {
        id: 'isl-ch1',
        number: 1,
        title: 'Fundamentals of Faith (Aqaaid) & Pillars of Islam (Ibaadat)',
        desc: 'Tauheed, Finality of Prophethood (Khatam-un-Nabiyyin), Namaz, Zakat, Roza, and Hajj.',
        topics: [
          {
            id: 'isl-ch1-t1',
            title: 'Tauheed, Khatam-un-Nabiyyin and The Pillars of Islam',
            time: '35 mins',
            difficulty: 'Easy',
            intro: 'Islamic faith is founded on the pure bedrock of Tauheed (Monotheism), belief in the Finality of the Holy Prophet Muhammad (PBUH), and practical devotion through the 5 pillars of Islam.',
            objectives: [
              'Explain the concept of Tauheed (Oneness of Allah) and its transformative effects on human character.',
              'Explain the doctrine of Khatam-un-Nabiyyin (Finality of Prophethood of Hazrat Muhammad PBUH).',
              'Understand the spiritual, individual, and collective benefits of Namaz (Salah), Roza (Fasting), and Zakat.'
            ],
            detailedExplanation: `
              <h4>1. Tauheed (The Oneness of Allah)</h4>
              <p>Tauheed is the fundamental article of faith in Islam, summarized in Surah Al-Ikhlas: <em>"Say: He is Allah, the One and Only; Allah, the Eternal, Absolute; He begets not, nor is He begotten; and there is none like unto Him."</em></p>
              <p><strong>Effects of Tauheed on Human Life:</strong></p>
              <ul>
                <li>Self-respect and dignity (a believer bows before no one except Allah).</li>
                <li>Modesty and humility (removes pride and arrogance).</li>
                <li>Courage and bravery (the conviction that life and death are solely in Allah\'s hands).</li>
                <li>Peace of mind, hope, and freedom from superstition.</li>
              </ul>
              <h4>2. Risalat and Khatam-un-Nabiyyin (PBUH)</h4>
              <p>Belief in Prophethood (Risalat) means believing that Allah sent prophets to guide humanity, culminating with the Holy Prophet Hazrat Muhammad ﷺ as the Last and Final Messenger (<em>Khatam-un-Nabiyyin</em> - Surah Al-Ahzab: 40). No new prophet will ever come after him.</p>
              <h4>3. The Pillars of Islam (Arkaan-e-Islam)</h4>
              <ul>
                <li><strong>Shahadah (Faith):</strong> Bearing witness that none has the right to be worshipped except Allah, and Muhammad ﷺ is His servant and messenger.</li>
                <li><strong>Salah (Namaz):</strong> Five daily obligatory prayers establishing direct spiritual communion with Allah and fostering punctual discipline and collective equality.</li>
                <li><strong>Zakat:</strong> Annual purification of wealth (2.5% on qualifying surplus wealth/Nisab) to eliminate poverty and establish social security.</li>
                <li><strong>Sawm (Roza):</strong> Fasting during the month of Ramadan to attain Taqwa (God-consciousness), self-control, and sympathy for the needy.</li>
                <li><strong>Hajj:</strong> Pilgrimage to Makkah once in a lifetime for those physically and financially able, symbolizing universal human brotherhood.</li>
              </ul>
            `,
            definitions: [
              { term: 'Tauheed', meaning: 'The foundational Islamic belief in the absolute Oneness, uniqueness, and supremacy of Allah.' },
              { term: 'Khatam-un-Nabiyyin ﷺ', meaning: 'The divine status of the Holy Prophet Muhammad ﷺ as the Seal and Finality of all Prophets.' },
              { term: 'Zakat', meaning: 'Obligatory financial worship of giving 2.5% of surplus wealth to designated categories of recipients.' }
            ],
            formula: 'Arkaan-e-Islam: Shahadah → Salah → Zakat → Sawm → Hajj',
            workedExample: {
              title: 'Calculating Zakat on Savings',
              given: 'Total surplus savings above Nisab for one full lunar year = Rs. 200,000',
              required: 'Calculate the obligatory Zakat payable.',
              formula: 'Zakat Rate = 2.5% (1/40th of total eligible wealth).',
              solution: `
                <div class="step-row"><div class="step-label">Step 1: Formula</div> Zakat = (Total Wealth × 2.5) / 100 = Total Wealth / 40</div>
                <div class="step-row"><div class="step-label">Step 2: Calculation</div> Zakat = (200,000 × 2.5) / 100 = 200,000 / 40 = Rs. 5,000</div>
              `,
              finalAnswer: 'Obligatory Zakat payable is Rs. 5,000.'
            },
            diagramSvg: `<svg width="340" height="130" viewBox="0 0 340 130" style="background:#f8fafc; border-radius:8px; border:1px solid #cbd5e1;">
              <rect x="20" y="30" width="55" height="70" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
              <text x="24" y="65" font-size="10" font-weight="bold" fill="#1e40af">Shahadah</text>
              <rect x="83" y="30" width="55" height="70" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
              <text x="94" y="65" font-size="10" font-weight="bold" fill="#15803d">Salah</text>
              <rect x="146" y="30" width="55" height="70" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
              <text x="156" y="65" font-size="10" font-weight="bold" fill="#92400e">Zakat</text>
              <rect x="209" y="30" width="55" height="70" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="2" />
              <text x="219" y="65" font-size="10" font-weight="bold" fill="#5b21b6">Sawm</text>
              <rect x="272" y="30" width="55" height="70" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
              <text x="284" y="65" font-size="10" font-weight="bold" fill="#991b1b">Hajj</text>
            </svg>`,
            diagramCaption: 'The Five Pillars of Islam (Arkaan-e-Islam)',
            applications: 'Social welfare funds, community cohesion, personal moral integrity, ethical business dealings, and charity.',
            commonMistakes: 'Confusing voluntary charity (Sadaqah) with obligatory Zakat (which has specific Nisab and rate of 2.5%).',
            examTips: 'Quote Quranic verses (Surah Al-Ikhlas, Surah Al-Baqarah) and authentic Hadith in Arabic/English translation for maximum marks.',
            quickRevision: [
              'Tauheed: Allah is One, Absolute, without partners or children.',
              'Hazrat Muhammad ﷺ is Khatam-un-Nabiyyin (Last of the Prophets).',
              '5 Pillars: Shahadah, Salah, Zakat, Sawm (Fasting), Hajj.',
              'Zakat rate is 2.5% on savings held for one lunar year.'
            ],
            miniMcq: {
              q: 'What is the prescribed annual rate of Zakat on eligible cash savings and commercial merchandise?',
              options: ['1.5%', '2.5%', '5.0%', '10.0%'],
              correct: 1,
              explanation: 'The mandatory rate of Zakat in Islam is 2.5% (or one-fortieth) of the surplus wealth held for one full lunar year.'
            },
            questions: [
              { q: 'Short: State the meaning of the title "Khatam-un-Nabiyyin" given to the Holy Prophet ﷺ.', a: 'It means the Seal and the Finality of all Prophets; no prophet will ever come after Prophet Muhammad ﷺ, and his message is universal for all times.' },
              { q: 'Short: Name four individual and collective benefits of congregational prayer (Ba-Jamaat Namaz).', a: '1. Fosters equality and eliminates racial/social discrimination. 2. Promotes punctuality and discipline. 3. Builds mutual brotherhood and unity. 4. Strengthens spiritual closeness to Allah.' },
              { q: 'Long: Explain the spiritual, moral, and economic importance of Zakat in an Islamic society.', a: '1. Spiritual: Purifies the wealth and soul of the giver from greed. 2. Moral: Inculcates compassion, empathy, and social responsibility for less fortunate citizens. 3. Economic: Prevents concentration of wealth in few hands, stimulates economic circulation, and provides systematic financial assistance to orphans, widows, and the poor.' }
            ]
          }
        ]
      }
    ]
  }
};

// =================== 3. EXAM PREPARATION DATA ===================
const EXAM_PREP_DATA = [
  {
    subject: 'Mathematics',
    icon: '📐',
    highYieldTopics: ['Logarithm Laws Proofs (Ch 2)', 'Cramer\'s Rule & Matrix Inversion (Ch 4)', 'Algebraic Formulas 4ab and a³±b³ (Ch 3)', 'Rational vs Irrational Proofs (Ch 1)'],
    topTips: 'Always write down the formula first. In Cramer\'s rule, double check the determinant |A| before proceeding. If |A|=0, state that the solution is not possible.',
    commonPitfalls: 'Sign errors when finding Adjoint of matrix; forgetting 2ab when expanding (a+b)².'
  },
  {
    subject: 'Physics',
    icon: '⚡',
    highYieldTopics: ['Three Equations of Motion Derivations (Ch 2)', 'Newton\'s 2nd Law F = ma (Ch 3)', 'Law of Conservation of Momentum (Ch 3)', 'Vernier Caliper & Screw Gauge Least Count & Zero Error (Ch 1)'],
    topTips: 'For every numerical problem, format with 4 headers: Given Data, Required, Formula, and Step-by-Step Solution with final SI units boxed.',
    commonPitfalls: 'Not converting km/h to m/s (multiply by 5/18); adding positive zero error instead of subtracting it.'
  },
  {
    subject: 'Chemistry',
    icon: '🧪',
    highYieldTopics: ['Mole Calculations & Avogadro\'s Number (Ch 1)', 'Bohr\'s Atomic Model & Electronic Configuration (Ch 2)', 'Periodic Trends (Atomic Radius, Electronegativity)', 'Ionic vs Covalent Bonding Differences'],
    topTips: 'Master the electronic configuration for atomic numbers 1 to 20. When defining isotopes, always mention same atomic number but different mass number with examples (¹H, ²H, ³H).',
    commonPitfalls: 'Forgetting to double atomic weight for diatomic gases like O₂ (32 g/mol) vs O (16 g/mol).'
  },
  {
    subject: 'Biology',
    icon: '🔬',
    highYieldTopics: ['Cell Organelles Structure & Functions (Mitochondria, Chloroplast)', 'Plant Cell vs Animal Cell Differences', 'Mitosis Phases & Significance', 'Cell Theory Principles'],
    topTips: 'Draw large, neat, pencil-labeled diagrams for cell organelles, mitosis stages, and heart structure. Label lines should be horizontal without crossing.',
    commonPitfalls: 'Confusing Mitosis (produces 2 identical diploid cells) with Meiosis (produces 4 haploid gametes).'
  },
  {
    subject: 'Computer Science',
    icon: '💻',
    highYieldTopics: ['5 Computer Generations & Switching Devices', 'Flowchart Symbols & Algorithm Design', 'RAM vs ROM Differences', 'Compiler vs Interpreter'],
    topTips: 'Use correct geometric shapes for flowcharts (Parallelogram for Input/Output, Rectangle for Process, Diamond for Decision).',
    commonPitfalls: 'Omitting arrowheads on flowchart connectors.'
  },
  {
    subject: 'English',
    icon: '📖',
    highYieldTopics: ['Active and Passive Voice Transformations', 'Direct and Indirect Speech', 'Tense Structures (Present, Past, Future)', 'Formal Letter / Application Writing Layout'],
    topTips: 'Passive voice ALWAYS uses the 3rd form of the verb (V3). Ensure subject-verb agreement in continuous and perfect tenses.',
    commonPitfalls: 'Forgetting to insert "being" for continuous passive voice or "been" for perfect passive voice.'
  },
  {
    subject: 'Pakistan Studies',
    icon: '🇵🇰',
    highYieldTopics: ['Ideology of Pakistan & Two-Nation Theory', 'Allama Iqbal\'s 1930 Allahabad Address', 'Lahore Resolution 23rd March 1940', 'Initial Difficulties of Pakistan in 1947'],
    topTips: 'Support historical answers with exact dates and authentic quotes of Quaid-e-Azam and Allama Iqbal.',
    commonPitfalls: 'Confusing 1930 Allahabad Address with 1940 Lahore Resolution.'
  },
  {
    subject: 'Islamiat',
    icon: '🕌',
    highYieldTopics: ['Tauheed & Its Effects on Human Character', 'Khatam-un-Nabiyyin ﷺ Doctrine', 'Spiritual and Social Importance of Salah and Zakat', 'Charter of Madinah & Seerat-un-Nabi ﷺ'],
    topTips: 'Quote relevant Quranic Ayat and authentic Hadith in Arabic script or clear English translation with reference to Surah.',
    commonPitfalls: 'Confusing mandatory Zakat (2.5%) with general voluntary Sadaqah.'
  }
];

// =================== 4. GLOBAL QUIZ QUESTION BANK ===================
const QUIZ_QUESTIONS = [
  // Mathematics
  { id: 'q1', subject: 'math', chapter: 'Real and Complex Numbers', difficulty: 'easy', q: 'Which of the following numbers is an irrational number?', options: ['3.14', '22/7', '√9', '√7'], correct: 3, exp: '√7 cannot be written as a fraction of integers p/q; its decimal expansion is non-terminating and non-recurring.' },
  { id: 'q2', subject: 'math', chapter: 'Real and Complex Numbers', difficulty: 'medium', q: 'What is the value of the imaginary power i¹³?', options: ['1', '-1', 'i', '-i'], correct: 2, exp: 'i¹³ = (i⁴)³ · i¹ = (1)³ · i = i.' },
  { id: 'q3', subject: 'math', chapter: 'Logarithms', difficulty: 'medium', q: 'If log₂(x) = 5, what is the value of x?', options: ['10', '25', '32', '64'], correct: 2, exp: 'Converting to exponential form: x = 2⁵ = 32.' },
  { id: 'q4', subject: 'math', chapter: 'Logarithms', difficulty: 'hard', q: 'According to the second law of logarithms, log_a(m / n) is equal to:', options: ['log_a(m) / log_a(n)', 'log_a(m) - log_a(n)', 'log_a(m) + log_a(n)', 'log_a(m - n)'], correct: 1, exp: 'Quotient law states that logarithm of a quotient equals difference of logarithms: log_a(m/n) = log_a(m) - log_a(n).' },
  { id: 'q5', subject: 'math', chapter: 'Algebraic Expressions', difficulty: 'medium', q: 'If a + b = 6 and a - b = 2, what is the value of 4ab?', options: ['32', '36', '40', '16'], correct: 0, exp: '4ab = (a + b)² - (a - b)² = 6² - 2² = 36 - 4 = 32.' },
  { id: 'q6', subject: 'math', chapter: 'Matrices', difficulty: 'easy', q: 'A square matrix A is called singular if its determinant |A| is equal to:', options: ['1', '0', '-1', 'Infinity'], correct: 1, exp: 'By definition, a singular matrix has a determinant equal to 0, which means its inverse does not exist.' },
  
  // Physics
  { id: 'q7', subject: 'physics', chapter: 'Physical Quantities', difficulty: 'easy', q: 'The least count of a standard Vernier Caliper with 10 vernier divisions is:', options: ['0.1 cm', '0.01 cm', '0.001 cm', '1.0 mm'], correct: 1, exp: 'LC = 1 mm / 10 = 0.1 mm = 0.01 cm.' },
  { id: 'q8', subject: 'physics', chapter: 'Kinematics', difficulty: 'medium', q: 'A car starting from rest moves with uniform acceleration of 2 m/s² for 5 seconds. The distance covered is:', options: ['10 m', '25 m', '50 m', '100 m'], correct: 1, exp: 's = v_i · t + 1/2 a · t² = 0 + 1/2(2)(5²) = 25 meters.' },
  { id: 'q9', subject: 'physics', chapter: 'Dynamics', difficulty: 'medium', q: 'Which law of motion mathematically defines Force as F = ma?', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'], correct: 1, exp: 'Newton\'s Second Law of Motion states that net force is proportional to acceleration: F = ma.' },
  { id: 'q10', subject: 'physics', chapter: 'Dynamics', difficulty: 'hard', q: 'A bullet of mass 0.01 kg is fired with velocity 200 m/s from a 2 kg gun. The recoil velocity of the gun is:', options: ['-1 m/s', '-2 m/s', '-0.5 m/s', '+1 m/s'], correct: 0, exp: 'By conservation of momentum: m₁v₁ + m₂v₂ = 0 → (0.01)(200) + 2(v₂) = 0 → 2 + 2v₂ = 0 → v₂ = -1 m/s.' },

  // Chemistry
  { id: 'q11', subject: 'chemistry', chapter: 'Fundamentals of Chemistry', difficulty: 'easy', q: 'How many particles are present in exactly one mole of any pure substance?', options: ['6.022 × 10²³', '3.011 × 10²³', '1.602 × 10⁻¹⁹', '9.8 × 10⁸'], correct: 0, exp: 'Avogadro\'s constant is exactly 6.022 × 10²³ particles per mole.' },
  { id: 'q12', subject: 'chemistry', chapter: 'Fundamentals of Chemistry', difficulty: 'medium', q: 'The molar mass of water (H₂O) is [H=1, O=16]:', options: ['17 g/mol', '18 g/mol', '32 g/mol', '34 g/mol'], correct: 1, exp: 'Molar mass of H₂O = 2(1) + 16 = 18 g/mol.' },
  { id: 'q13', subject: 'chemistry', chapter: 'Structure of Atoms', difficulty: 'medium', q: 'The maximum number of electrons that can be held in the M shell (n=3) is:', options: ['8', '18', '32', '2'], correct: 1, exp: 'Formula 2n² = 2(3)² = 2(9) = 18 electrons.' },

  // Biology
  { id: 'q14', subject: 'biology', chapter: 'Cell Biology', difficulty: 'easy', q: 'Which cellular organelle is known as the "Powerhouse of the Cell"?', options: ['Ribosome', 'Golgi Body', 'Mitochondria', 'Lysosome'], correct: 2, exp: 'Mitochondria generate cellular energy in the form of ATP via aerobic respiration.' },
  { id: 'q15', subject: 'biology', chapter: 'Cell Biology', difficulty: 'medium', q: 'Which of the following is present in plant cells but absent in animal cells?', options: ['Cellulose Cell Wall', 'Mitochondria', 'Ribosomes', 'Plasma Membrane'], correct: 0, exp: 'Plant cells have a rigid cellulose cell wall outside their plasma membrane, whereas animal cells do not.' },

  // Computer Science
  { id: 'q16', subject: 'computer', chapter: 'Fundamentals', difficulty: 'easy', q: 'Which primary electronic component characterized the 1st Generation of computers?', options: ['Transistors', 'Vacuum Tubes', 'Integrated Circuits', 'Microprocessors'], correct: 1, exp: 'First generation computers (1940-1956) utilized vacuum tubes for circuitry.' },
  { id: 'q17', subject: 'computer', chapter: 'Flowcharts', difficulty: 'easy', q: 'In a flowchart, what does a Diamond shape indicate?', options: ['Process', 'Input/Output', 'Decision / Branching', 'Start/Stop'], correct: 2, exp: 'Diamond represents a conditional decision with multiple branching outcomes (Yes/No).' },

  // English
  { id: 'q18', subject: 'english', chapter: 'Voice Transformation', difficulty: 'medium', q: 'Identify the correct passive voice: "He wrote an essay."', options: ['An essay was written by him.', 'An essay is written by him.', 'An essay has been written by him.', 'An essay was being written by him.'], correct: 0, exp: 'Past simple active (V2) converts to "was/were + V3". Thus "An essay was written by him."' },

  // Pakistan Studies
  { id: 'q19', subject: 'pakstudy', chapter: 'Pakistan Movement', difficulty: 'easy', q: 'On which date was the historic Lahore Resolution passed?', options: ['14th August 1947', '23rd March 1940', '25th December 1876', '30th December 1906'], correct: 1, exp: 'The historic Lahore Resolution was passed on 23rd March 1940 at Minto Park, Lahore.' },

  // Islamiat
  { id: 'q20', subject: 'islamiat', chapter: 'Pillars of Islam', difficulty: 'easy', q: 'What is the mandatory rate of Zakat on qualifying wealth held for one full year?', options: ['1.5%', '2.5%', '5.0%', '10.0%'], correct: 1, exp: 'Zakat is fixed at 2.5% (one fortieth) of eligible surplus wealth.' }
];

// =================== 5. UI INITIALIZATION & EVENT DISPATCH ===================
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  applyTheme(APP_STATE.theme);
  updateStreak();
  renderDashboardStats();
  renderSubjectCards();
  renderExamPrepGrid();
  loadProfileData();
  
  // Set up search filter
  window.currentSearchFilter = 'all';
}

// Switch between SPA views
function switchView(viewId) {
  APP_STATE.currentView = viewId;
  
  // Update view containers
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.classList.add('active');

  // Update navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${viewId}`);
  if (activeNav) activeNav.classList.add('active');

  // Context-specific updates
  if (viewId === 'bookmarks') renderBookmarksView();
  if (viewId === 'progress') renderProgressView();
  if (viewId === 'subjects') renderSubjectsListView();
  if (viewId === 'home') renderDashboardStats();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme Switcher
function toggleTheme() {
  const newTheme = APP_STATE.theme === 'light' ? 'dark' : 'light';
  APP_STATE.theme = newTheme;
  localStorage.setItem('grade9_theme', newTheme);
  applyTheme(newTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Streak Tracking
function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  if (APP_STATE.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (APP_STATE.lastActiveDate === yesterday) {
      APP_STATE.streak += 1;
    } else {
      APP_STATE.streak = 1;
    }
    APP_STATE.lastActiveDate = today;
    localStorage.setItem('grade9_streak', APP_STATE.streak.toString());
    localStorage.setItem('grade9_last_date', today);
  }
}

// Render Dashboard Statistics
function renderDashboardStats() {
  const totalTopics = getTotalTopicCount();
  const completedCount = APP_STATE.completedTopics.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  
  const progEl = document.getElementById('stat-overall-progress');
  const compEl = document.getElementById('stat-completed-topics');
  const streakEl = document.getElementById('stat-study-streak');
  const quizEl = document.getElementById('stat-quiz-score');

  if (progEl) progEl.textContent = `${progressPercent}%`;
  if (compEl) compEl.textContent = `${completedCount} / ${totalTopics}`;
  if (streakEl) streakEl.textContent = `${APP_STATE.streak} Day${APP_STATE.streak > 1 ? 's' : ''}`;
  
  // Calculate Average Quiz Score
  if (APP_STATE.quizHistory.length > 0) {
    const totalAccuracy = APP_STATE.quizHistory.reduce((acc, curr) => acc + curr.scorePercent, 0);
    const avgScore = Math.round(totalAccuracy / APP_STATE.quizHistory.length);
    if (quizEl) quizEl.textContent = `${avgScore}%`;
  } else {
    if (quizEl) quizEl.textContent = `0%`;
  }
}

function getTotalTopicCount() {
  let count = 0;
  Object.values(SUBJECTS_DATA).forEach(sub => {
    sub.chapters.forEach(ch => {
      count += ch.topics.length;
    });
  });
  return count;
}

// Render Subject Cards on Home
function renderSubjectCards() {
  const homeGrid = document.getElementById('homeSubjectsGrid');
  const allGrid = document.getElementById('allSubjectsGrid');
  if (!homeGrid && !allGrid) return;

  const htmlContent = Object.values(SUBJECTS_DATA).map(sub => {
    let subTopics = 0;
    let subCompleted = 0;
    sub.chapters.forEach(ch => {
      subTopics += ch.topics.length;
      ch.topics.forEach(top => {
        if (APP_STATE.completedTopics.includes(top.id)) subCompleted++;
      });
    });
    const subPercent = subTopics > 0 ? Math.round((subCompleted / subTopics) * 100) : 0;

    return `
      <div class="subject-card" onclick="openSubject('${sub.id}')">
        <div class="subject-card-top">
          <div class="subject-avatar">${sub.icon}</div>
          <span class="subject-badge">${sub.badge}</span>
        </div>
        <h3 class="subject-name">${sub.name}</h3>
        <p class="subject-desc">${sub.desc}</p>
        <div class="subject-meta">
          <span>📑 ${sub.chapters.length} Chapters</span>
          <span>🎯 ${subTopics} Topics</span>
          <span>✅ ${subPercent}% Done</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${subPercent}%;"></div>
        </div>
        <button class="btn btn-primary btn-sm" style="width: 100%;">Explore Subject →</button>
      </div>
    `;
  }).join('');

  if (homeGrid) homeGrid.innerHTML = htmlContent;
  if (allGrid) allGrid.innerHTML = htmlContent;
}

function renderSubjectsListView() {
  renderSubjectCards();
}

// Open Complete Subject Structure View
function openSubject(subjectId) {
  const subject = SUBJECTS_DATA[subjectId];
  if (!subject) return;
  
  APP_STATE.currentSubjectId = subjectId;

  // Breadcrumbs & Banner
  const breadcrumbEl = document.getElementById('subjectDetailBreadcrumb');
  if (breadcrumbEl) breadcrumbEl.textContent = subject.name;

  const countEl = document.getElementById('subjectDetailChapterCount');
  if (countEl) countEl.textContent = `${subject.chapters.length} Curriculum Chapters`;

  const bannerEl = document.getElementById('subjectDetailBanner');
  if (bannerEl) {
    bannerEl.innerHTML = `
      <div class="subject-banner-info">
        <h1 class="subject-banner-title">${subject.icon} ${subject.name}</h1>
        <p class="subject-banner-desc">${subject.desc}</p>
      </div>
      <div>
        <button class="btn btn-accent" onclick="startSubjectQuiz('${subject.id}')">✍️ Practice ${subject.name} Quiz</button>
      </div>
    `;
  }

  // Render Chapters and Topics
  const chaptersContainer = document.getElementById('chaptersContainer');
  if (chaptersContainer) {
    chaptersContainer.innerHTML = subject.chapters.map(ch => {
      const topicsHtml = ch.topics.map(topic => {
        const isDone = APP_STATE.completedTopics.includes(topic.id);
        const isBookmarked = APP_STATE.bookmarks.includes(topic.id);

        return `
          <div class="topic-card-item">
            <div class="topic-card-header">
              <span class="topic-item-title">${topic.title}</span>
              <span class="topic-status-badge ${isDone ? 'status-completed' : 'status-pending'}">
                ${isDone ? '✓ Completed' : '⏱ ' + topic.time}
              </span>
            </div>
            <p class="topic-item-desc">${topic.intro.substring(0, 95)}...</p>
            <div class="topic-item-footer">
              <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-subtle);">${isBookmarked ? '🔖 Saved' : '⚡ ' + topic.difficulty}</span>
              <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openTopic('${subject.id}', '${ch.id}', '${topic.id}')">Open Topic →</button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="chapter-box">
          <div class="chapter-header">
            <div>
              <span class="chapter-number-pill">Chapter 0${ch.number}</span>
              <h3 class="chapter-title">${ch.title}</h3>
              <p class="chapter-desc">${ch.desc}</p>
            </div>
            <span class="subject-badge">${ch.topics.length} Topics</span>
          </div>
          <div class="topics-grid">
            ${topicsHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  switchView('subject-detail');
}

// Open Complete Full Topic Learning Material Page
function openTopic(subjectId, chapterId, topicId) {
  const subject = SUBJECTS_DATA[subjectId];
  if (!subject) return;
  const chapter = subject.chapters.find(c => c.id === chapterId);
  if (!chapter) return;
  const topic = chapter.topics.find(t => t.id === topicId);
  if (!topic) return;

  APP_STATE.currentSubjectId = subjectId;
  APP_STATE.currentChapterId = chapterId;
  APP_STATE.currentTopicId = topicId;

  // Breadcrumbs
  const bSub = document.getElementById('topicBreadcrumbSubject');
  const bCh = document.getElementById('topicBreadcrumbChapter');
  const bTitle = document.getElementById('topicBreadcrumbTitle');
  if (bSub) bSub.textContent = subject.name;
  if (bCh) bCh.textContent = `Chapter ${chapter.number}`;
  if (bTitle) bTitle.textContent = topic.title;

  // Find Next & Prev topics for bottom navigation
  let prevTopic = null;
  let nextTopic = null;
  const allTopics = [];
  subject.chapters.forEach(c => {
    c.topics.forEach(t => allTopics.push({ subId: subject.id, chId: c.id, topic: t }));
  });
  const currentIndex = allTopics.findIndex(item => item.topic.id === topic.id);
  if (currentIndex > 0) prevTopic = allTopics[currentIndex - 1];
  if (currentIndex < allTopics.length - 1) nextTopic = allTopics[currentIndex + 1];

  // Render Main Document
  const docContainer = document.getElementById('topicDocContainer');
  if (docContainer) {
    const isCompleted = APP_STATE.completedTopics.includes(topic.id);
    const isBookmarked = APP_STATE.bookmarks.includes(topic.id);

    // Definitions HTML
    const definitionsHtml = topic.definitions && topic.definitions.length > 0 ? `
      <div class="content-block">
        <h3 class="content-block-title">📖 Important Definitions</h3>
        ${topic.definitions.map(d => `
          <div class="definition-box">
            <div class="definition-term">${d.term}</div>
            <p style="margin: 0; font-size: 0.95rem;">${d.meaning}</p>
          </div>
        `).join('')}
      </div>
    ` : '';

    // Objectives HTML
    const objectivesHtml = topic.objectives && topic.objectives.length > 0 ? `
      <div class="objectives-box">
        <div class="objectives-title">🎯 Learning Objectives</div>
        <ul class="objectives-list">
          ${topic.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    // Formula HTML
    const formulaHtml = topic.formula ? `
      <div class="formula-box">
        <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase;">Key Mathematical / Scientific Formula</div>
        <div class="formula-display">${topic.formula}</div>
      </div>
    ` : '';

    // Worked Example HTML
    const workedExampleHtml = topic.workedExample ? `
      <div class="content-block">
        <h3 class="content-block-title">💡 Worked Step-by-Step Problem</h3>
        <div class="worked-example-box">
          <span class="example-badge">${topic.workedExample.title}</span>
          <p><strong>Given:</strong> ${topic.workedExample.given}</p>
          <p><strong>Required:</strong> ${topic.workedExample.required}</p>
          <p><strong>Formula / Approach:</strong> <code>${topic.workedExample.formula}</code></p>
          <div style="margin: 1rem 0;">
            ${topic.workedExample.solution}
          </div>
          <div style="background: var(--primary-light); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-weight: 700; color: var(--primary);">
            🎯 Final Answer: ${topic.workedExample.finalAnswer}
          </div>
        </div>
      </div>
    ` : '';

    // Diagram HTML
    const diagramHtml = topic.diagramSvg ? `
      <div class="diagram-container">
        <div class="diagram-svg-wrapper">
          ${topic.diagramSvg}
        </div>
        <div class="diagram-caption">${topic.diagramCaption}</div>
      </div>
    ` : '';

    // Questions Accordion
    const questionsHtml = topic.questions && topic.questions.length > 0 ? `
      <div class="content-block questions-container">
        <h3 class="content-block-title">❓ Important Board Examination Questions</h3>
        ${topic.questions.map((q, idx) => `
          <div class="question-accordion">
            <button class="question-toggle" onclick="toggleQuestionAccordion('q-acc-${idx}')">
              <span>${q.q}</span>
              <span>▼</span>
            </button>
            <div class="question-answer-body" id="q-acc-${idx}" style="display: none;">
              <strong>Answer / Solution:</strong> ${q.a}
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    // Quick Revision Summary
    const revisionHtml = topic.quickRevision && topic.quickRevision.length > 0 ? `
      <div class="quick-revision-box">
        <div class="revision-title">⚡ Quick Revision Notes & Key Points</div>
        <ul class="revision-list">
          ${topic.quickRevision.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    // Mini In-Topic Practice MCQ
    const miniMcqHtml = topic.miniMcq ? `
      <div class="content-block">
        <h3 class="content-block-title">🧠 In-Topic Self Assessment Check</h3>
        <div class="mini-mcq-box">
          <div class="mini-mcq-q">${topic.miniMcq.q}</div>
          <div class="mini-mcq-options" id="miniMcqOptions">
            ${topic.miniMcq.options.map((opt, i) => `
              <button class="option-choice-btn" onclick="checkMiniMcq(${i}, ${topic.miniMcq.correct})">${opt}</button>
            `).join('')}
          </div>
          <div class="mcq-explanation" id="miniMcqExp">${topic.miniMcq.explanation}</div>
        </div>
      </div>
    ` : '';

    docContainer.innerHTML = `
      <div class="topic-doc-header">
        <div class="topic-meta-tags">
          <span class="tag-badge subject-tag">${subject.name}</span>
          <span class="tag-badge">Chapter ${chapter.number}: ${chapter.title}</span>
          <span class="tag-badge">⏱ ${topic.time}</span>
          <span class="tag-badge">⚡ ${topic.difficulty}</span>
        </div>
        <h1 class="topic-doc-title">${topic.title}</h1>
        <p class="lead-text">${topic.intro}</p>
        <div class="topic-action-toolbar">
          <div>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">
              Status: <strong style="color: ${isCompleted ? 'var(--success)' : 'var(--accent)'}">${isCompleted ? 'Completed' : 'In Progress'}</strong>
            </span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="toggleCurrentBookmark()">${isBookmarked ? '🔖 Remove Bookmark' : '🔖 Bookmark Topic'}</button>
            <button class="btn btn-accent btn-sm" onclick="toggleCurrentComplete()">${isCompleted ? '✓ Completed' : '✅ Mark Complete'}</button>
          </div>
        </div>
      </div>

      ${objectivesHtml}

      <div class="content-block">
        <h3 class="content-block-title">📚 Detailed Educational Explanation</h3>
        <div class="doc-paragraph">
          ${topic.detailedExplanation}
        </div>
      </div>

      ${diagramHtml}
      ${formulaHtml}
      ${definitionsHtml}
      ${workedExampleHtml}

      <div class="tips-grid">
        <div class="tip-card mistake">
          <h4>⚠️ Common Pitfalls & Mistakes</h4>
          <p>${topic.commonMistakes}</p>
        </div>
        <div class="tip-card exam">
          <h4>🎯 High-Yield Board Exam Tips</h4>
          <p>${topic.examTips}</p>
        </div>
      </div>

      ${topic.applications ? `
        <div class="content-block">
          <h3 class="content-block-title">🌍 Real-World & Industrial Applications</h3>
          <p class="doc-paragraph">${topic.applications}</p>
        </div>
      ` : ''}

      ${miniMcqHtml}
      ${revisionHtml}
      ${questionsHtml}

      <div class="topic-nav-footer">
        ${prevTopic ? `
          <button class="btn btn-outline" onclick="openTopic('${prevTopic.subId}', '${prevTopic.chId}', '${prevTopic.topic.id}')">
            ← Previous: ${prevTopic.topic.title}
          </button>
        ` : '<div></div>'}

        ${nextTopic ? `
          <button class="btn btn-primary" onclick="openTopic('${nextTopic.subId}', '${nextTopic.chId}', '${nextTopic.topic.id}')">
            Next: ${nextTopic.topic.title} →
          </button>
        ` : '<div></div>'}
      </div>
    `;
  }

  // Update Sidebar Controls
  updateTopicSidebarState(topicId, chapter);

  switchView('topic-material');
}

function updateTopicSidebarState(topicId, chapter) {
  // Bookmark button
  const isBookmarked = APP_STATE.bookmarks.includes(topicId);
  const bmIcon = document.getElementById('topicBookmarkIcon');
  const bmText = document.getElementById('topicBookmarkText');
  if (bmIcon && bmText) {
    bmIcon.textContent = isBookmarked ? '★' : '🔖';
    bmText.textContent = isBookmarked ? 'Bookmarked' : 'Bookmark Topic';
  }

  // Complete button
  const isCompleted = APP_STATE.completedTopics.includes(topicId);
  const compIcon = document.getElementById('topicCompleteIcon');
  const compText = document.getElementById('topicCompleteText');
  if (compIcon && compText) {
    compIcon.textContent = isCompleted ? '✓' : '✅';
    compText.textContent = isCompleted ? 'Completed' : 'Mark as Completed';
  }

  // Load Notes
  const notesInput = document.getElementById('topicNotesInput');
  if (notesInput) {
    notesInput.value = APP_STATE.notes[topicId] || '';
  }

  // Outline of chapter
  const outlineContainer = document.getElementById('topicSidebarOutline');
  if (outlineContainer && chapter) {
    outlineContainer.innerHTML = chapter.topics.map(t => {
      const isCurrent = t.id === topicId;
      const isDone = APP_STATE.completedTopics.includes(t.id);
      return `
        <div style="padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); background: ${isCurrent ? 'var(--primary-light)' : 'transparent'}; cursor: pointer; display: flex; align-items: center; justify-content: space-between;" onclick="openTopic('${APP_STATE.currentSubjectId}', '${chapter.id}', '${t.id}')">
          <span style="font-weight: ${isCurrent ? '700' : '500'}; color: ${isCurrent ? 'var(--primary)' : 'var(--text-main)'}; font-size: 0.825rem;">${t.title}</span>
          <span>${isDone ? '✓' : ''}</span>
        </div>
      `;
    }).join('');
  }
}

// Toggle Bookmark for current topic
function toggleCurrentBookmark() {
  const topicId = APP_STATE.currentTopicId;
  if (!topicId) return;

  const idx = APP_STATE.bookmarks.indexOf(topicId);
  if (idx > -1) {
    APP_STATE.bookmarks.splice(idx, 1);
  } else {
    APP_STATE.bookmarks.push(topicId);
  }
  localStorage.setItem('grade9_bookmarks', JSON.stringify(APP_STATE.bookmarks));
  
  // Refresh UI
  if (APP_STATE.currentSubjectId && APP_STATE.currentChapterId) {
    const subject = SUBJECTS_DATA[APP_STATE.currentSubjectId];
    const chapter = subject ? subject.chapters.find(c => c.id === APP_STATE.currentChapterId) : null;
    updateTopicSidebarState(topicId, chapter);
  }
}

// Toggle Complete for current topic
function toggleCurrentComplete() {
  const topicId = APP_STATE.currentTopicId;
  if (!topicId) return;

  const idx = APP_STATE.completedTopics.indexOf(topicId);
  if (idx > -1) {
    APP_STATE.completedTopics.splice(idx, 1);
  } else {
    APP_STATE.completedTopics.push(topicId);
  }
  localStorage.setItem('grade9_completed_topics', JSON.stringify(APP_STATE.completedTopics));
  
  renderDashboardStats();
  if (APP_STATE.currentSubjectId && APP_STATE.currentChapterId) {
    const subject = SUBJECTS_DATA[APP_STATE.currentSubjectId];
    const chapter = subject ? subject.chapters.find(c => c.id === APP_STATE.currentChapterId) : null;
    updateTopicSidebarState(topicId, chapter);
  }
}

// Student Notes Management
function saveCurrentNotes() {
  const topicId = APP_STATE.currentTopicId;
  const input = document.getElementById('topicNotesInput');
  const notice = document.getElementById('notesSaveNotice');
  if (!topicId || !input) return;

  APP_STATE.notes[topicId] = input.value.trim();
  localStorage.setItem('grade9_notes', JSON.stringify(APP_STATE.notes));

  if (notice) {
    notice.style.display = 'block';
    setTimeout(() => { notice.style.display = 'none'; }, 2000);
  }
}

function clearCurrentNotes() {
  const topicId = APP_STATE.currentTopicId;
  const input = document.getElementById('topicNotesInput');
  if (!topicId || !input) return;

  delete APP_STATE.notes[topicId];
  input.value = '';
  localStorage.setItem('grade9_notes', JSON.stringify(APP_STATE.notes));
}

// Mini In-Topic MCQ check
function checkMiniMcq(selectedIndex, correctIndex) {
  const buttons = document.querySelectorAll('#miniMcqOptions .option-choice-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add('correct');
    if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add('incorrect');
  });
  const exp = document.getElementById('miniMcqExp');
  if (exp) exp.style.display = 'block';
}

// Toggle Question Accordions
function toggleQuestionAccordion(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

function openSubjectFromTopic() {
  if (APP_STATE.currentSubjectId) openSubject(APP_STATE.currentSubjectId);
}

function openContinueLearning() {
  // Find first uncompleted topic or open first math topic
  for (const sub of Object.values(SUBJECTS_DATA)) {
    for (const ch of sub.chapters) {
      for (const top of ch.topics) {
        if (!APP_STATE.completedTopics.includes(top.id)) {
          openTopic(sub.id, ch.id, top.id);
          return;
        }
      }
    }
  }
  openTopic('math', 'math-ch1', 'math-ch1-t1');
}

// =================== 6. SEARCH ENGINE ===================
function setSearchFilter(filter, btn) {
  window.currentSearchFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  handleSearch();
}

function handleSearch() {
  const input = document.getElementById('globalSearchInput');
  const resultsContainer = document.getElementById('searchResultsList');
  const countEl = document.getElementById('searchResultsCount');
  if (!input || !resultsContainer) return;

  const query = input.value.trim().toLowerCase();
  if (query.length === 0) {
    resultsContainer.innerHTML = '';
    if (countEl) countEl.textContent = 'Type a search term above to find matching lessons.';
    return;
  }

  const results = [];
  const selectedFilter = window.currentSearchFilter || 'all';

  Object.values(SUBJECTS_DATA).forEach(sub => {
    if (selectedFilter !== 'all' && sub.id !== selectedFilter) return;

    sub.chapters.forEach(ch => {
      ch.topics.forEach(top => {
        let score = 0;
        const inTitle = top.title.toLowerCase().includes(query);
        const inIntro = top.intro.toLowerCase().includes(query);
        const inFormula = top.formula ? top.formula.toLowerCase().includes(query) : false;
        const inDefs = top.definitions ? top.definitions.some(d => d.term.toLowerCase().includes(query) || d.meaning.toLowerCase().includes(query)) : false;

        if (inTitle) score += 10;
        if (inDefs) score += 6;
        if (inFormula) score += 5;
        if (inIntro) score += 3;

        if (score > 0) {
          results.push({
            subject: sub,
            chapter: ch,
            topic: top,
            score: score
          });
        }
      });
    });
  });

  results.sort((a, b) => b.score - a.score);

  if (countEl) countEl.textContent = `Found ${results.length} educational topic${results.length === 1 ? '' : 's'} matching "${query}".`;

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matching topics found</h3>
        <p>Try searching for "Logarithm", "Newton", "Cell", "Cramer", "Molarity", or "Voice".</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = results.map(r => `
    <div class="search-result-card" onclick="openTopic('${r.subject.id}', '${r.chapter.id}', '${r.topic.id}')">
      <div class="flex-between" style="margin-bottom: 0.35rem;">
        <span class="tag-badge subject-tag">${r.subject.name} • Chapter ${r.chapter.number}</span>
        <span class="tag-badge">⏱ ${r.topic.time}</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">${r.topic.title}</h3>
      <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${r.topic.intro}</p>
      ${r.topic.formula ? `<div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--primary); margin-top: 0.5rem;">Formula: ${r.topic.formula}</div>` : ''}
    </div>
  `).join('');
}

// =================== 7. PRACTICE QUIZ ENGINE ===================
let CURRENT_QUIZ = {
  questions: [],
  currentIndex: 0,
  selectedAnswers: {},
  score: 0,
  active: false
};

function populateQuizChapterOptions() {
  // Can be extended if chapter granularity is selected
}

function startSubjectQuiz(subjectId) {
  switchView('quiz');
  const subSelect = document.getElementById('quizSubjectSelect');
  if (subSelect) subSelect.value = subjectId;
  startQuiz();
}

function startQuiz() {
  const subSelect = document.getElementById('quizSubjectSelect');
  const diffSelect = document.getElementById('quizDifficultySelect');
  const countSelect = document.getElementById('quizQuestionCount');

  const selectedSub = subSelect ? subSelect.value : 'all';
  const selectedDiff = diffSelect ? diffSelect.value : 'all';
  const requestedCount = countSelect ? parseInt(countSelect.value, 10) : 10;

  // Filter questions
  let pool = QUIZ_QUESTIONS.filter(q => {
    const matchSub = (selectedSub === 'all' || q.subject === selectedSub);
    const matchDiff = (selectedDiff === 'all' || q.difficulty === selectedDiff);
    return matchSub && matchDiff;
  });

  if (pool.length === 0) {
    pool = QUIZ_QUESTIONS; // Fallback to full pool
  }

  // Shuffle pool
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, Math.min(requestedCount, shuffled.length));

  CURRENT_QUIZ = {
    questions: selectedQuestions,
    currentIndex: 0,
    selectedAnswers: {},
    score: 0,
    active: true
  };

  // Toggle UI boxes
  document.getElementById('quizSetupCard').style.display = 'none';
  document.getElementById('quizResultCard').style.display = 'none';
  document.getElementById('quizLiveCard').style.display = 'block';

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = CURRENT_QUIZ.questions[CURRENT_QUIZ.currentIndex];
  if (!q) return;

  const total = CURRENT_QUIZ.questions.length;
  const currNum = CURRENT_QUIZ.currentIndex + 1;

  // Update header and progress
  const activeSubEl = document.getElementById('quizActiveSubject');
  const activeDiffEl = document.getElementById('quizActiveDifficulty');
  const counterEl = document.getElementById('quizCounterText');
  const progBar = document.getElementById('quizProgressBar');

  if (activeSubEl) activeSubEl.textContent = q.chapter || q.subject.toUpperCase();
  if (activeDiffEl) activeDiffEl.textContent = q.difficulty.toUpperCase();
  if (counterEl) counterEl.textContent = `Question ${currNum} / ${total}`;
  if (progBar) progBar.style.width = `${(currNum / total) * 100}%`;

  // Question Prompt
  const promptEl = document.getElementById('quizQuestionPrompt');
  if (promptEl) promptEl.textContent = q.q;

  // Options
  const optionsContainer = document.getElementById('quizOptionsList');
  const feedbackBox = document.getElementById('quizInstantFeedback');
  if (feedbackBox) feedbackBox.style.display = 'none';

  if (optionsContainer) {
    optionsContainer.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option-btn" id="quiz-opt-${i}" onclick="selectQuizOption(${i})">
        <span style="font-weight: 700; width: 24px;">${String.fromCharCode(65 + i)}.</span>
        <span>${opt}</span>
      </button>
    `).join('');
  }

  // Update Next Button label
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.textContent = (currNum === total) ? 'Finish Quiz 🏁' : 'Next Question →';
  }
}

function selectQuizOption(index) {
  const q = CURRENT_QUIZ.questions[CURRENT_QUIZ.currentIndex];
  if (!q) return;

  CURRENT_QUIZ.selectedAnswers[CURRENT_QUIZ.currentIndex] = index;

  // Highlight selection & instant feedback
  const buttons = document.querySelectorAll('.quiz-option-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.style.borderColor = 'var(--success)';
      btn.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
    }
    if (i === index && index !== q.correct) {
      btn.style.borderColor = 'var(--danger)';
      btn.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
    }
  });

  const feedbackBox = document.getElementById('quizInstantFeedback');
  if (feedbackBox) {
    const isCorrect = (index === q.correct);
    feedbackBox.style.display = 'block';
    feedbackBox.style.backgroundColor = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    feedbackBox.style.border = `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`;
    feedbackBox.innerHTML = `
      <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect.'}</strong>
      <p style="margin-top: 0.35rem;">${q.exp}</p>
    `;
  }
}

function handleQuizNext() {
  const currQ = CURRENT_QUIZ.questions[CURRENT_QUIZ.currentIndex];
  const userAns = CURRENT_QUIZ.selectedAnswers[CURRENT_QUIZ.currentIndex];
  
  if (userAns !== undefined && userAns === currQ.correct) {
    CURRENT_QUIZ.score++;
  }

  if (CURRENT_QUIZ.currentIndex < CURRENT_QUIZ.questions.length - 1) {
    CURRENT_QUIZ.currentIndex++;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  CURRENT_QUIZ.active = false;
  const total = CURRENT_QUIZ.questions.length;
  const score = CURRENT_QUIZ.score;
  const percent = Math.round((score / total) * 100);

  // Save to history
  const historyRecord = {
    date: new Date().toLocaleDateString(),
    score: score,
    total: total,
    scorePercent: percent
  };
  APP_STATE.quizHistory.unshift(historyRecord);
  if (APP_STATE.quizHistory.length > 10) APP_STATE.quizHistory.pop();
  localStorage.setItem('grade9_quiz_history', JSON.stringify(APP_STATE.quizHistory));

  renderDashboardStats();

  // Show Result Card
  document.getElementById('quizLiveCard').style.display = 'none';
  const resultCard = document.getElementById('quizResultCard');
  if (resultCard) {
    resultCard.style.display = 'block';
    document.getElementById('quizResultSummary').textContent = `You scored ${score} out of ${total} questions correctly (${percent}%).`;
    document.getElementById('quizFinalAccuracy').textContent = `${percent}%`;
    document.getElementById('quizFinalAnswered').textContent = `${total}/${total}`;
    document.getElementById('quizResultIcon').textContent = percent >= 80 ? '🏆' : (percent >= 50 ? '👏' : '📚');
  }
}

function quitQuiz() {
  document.getElementById('quizLiveCard').style.display = 'none';
  document.getElementById('quizSetupCard').style.display = 'block';
}

function resetQuiz() {
  document.getElementById('quizResultCard').style.display = 'none';
  document.getElementById('quizSetupCard').style.display = 'block';
}

// =================== 8. EXAM PREPARATION HUB ===================
function renderExamPrepGrid() {
  const container = document.getElementById('examPrepGrid');
  if (!container) return;

  container.innerHTML = EXAM_PREP_DATA.map(item => `
    <div class="exam-subject-card">
      <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>${item.icon}</span> <span>${item.subject}</span>
      </div>
      <div style="margin-bottom: 0.75rem;">
        <strong style="font-size: 0.85rem; color: var(--primary);">🔥 High-Yield Board Topics:</strong>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; margin-top: 0.35rem;">
          ${item.highYieldTopics.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
      <div style="margin-bottom: 0.75rem; background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
        <strong style="color: var(--secondary);">💡 Examiner Tip:</strong> ${item.topTips}
      </div>
      <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--danger); padding: 0.6rem 0.75rem; font-size: 0.825rem;">
        <strong style="color: var(--danger);">⚠️ Avoid Trap:</strong> ${item.commonPitfalls}
      </div>
    </div>
  `).join('');
}

// =================== 9. BOOKMARKS VIEW ===================
function renderBookmarksView() {
  const container = document.getElementById('bookmarksContainer');
  if (!container) return;

  if (APP_STATE.bookmarks.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔖</div>
        <h3>No bookmarked topics yet</h3>
        <p>Click the "Bookmark Topic" button inside any topic to save it here for fast pre-exam revision.</p>
      </div>
    `;
    return;
  }

  const bookmarkedItems = [];
  Object.values(SUBJECTS_DATA).forEach(sub => {
    sub.chapters.forEach(ch => {
      ch.topics.forEach(top => {
        if (APP_STATE.bookmarks.includes(top.id)) {
          bookmarkedItems.push({ sub, ch, top });
        }
      });
    });
  });

  container.innerHTML = bookmarkedItems.map(item => `
    <div class="search-result-card" onclick="openTopic('${item.sub.id}', '${item.ch.id}', '${item.top.id}')">
      <div class="flex-between" style="margin-bottom: 0.35rem;">
        <span class="tag-badge subject-tag">${item.sub.name}</span>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); removeBookmark('${item.top.id}')">Remove ✕</button>
      </div>
      <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">${item.top.title}</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted);">${item.top.intro.substring(0, 80)}...</p>
    </div>
  `).join('');
}

function removeBookmark(topicId) {
  const idx = APP_STATE.bookmarks.indexOf(topicId);
  if (idx > -1) {
    APP_STATE.bookmarks.splice(idx, 1);
    localStorage.setItem('grade9_bookmarks', JSON.stringify(APP_STATE.bookmarks));
    renderBookmarksView();
  }
}

function clearAllBookmarks() {
  APP_STATE.bookmarks = [];
  localStorage.setItem('grade9_bookmarks', JSON.stringify(APP_STATE.bookmarks));
  renderBookmarksView();
}

// =================== 10. PROGRESS & PROFILE VIEW ===================
function renderProgressView() {
  const container = document.getElementById('subjectProgressBars');
  if (container) {
    container.innerHTML = Object.values(SUBJECTS_DATA).map(sub => {
      let subTopics = 0;
      let subCompleted = 0;
      sub.chapters.forEach(ch => {
        subTopics += ch.topics.length;
        ch.topics.forEach(top => {
          if (APP_STATE.completedTopics.includes(top.id)) subCompleted++;
        });
      });
      const percent = subTopics > 0 ? Math.round((subCompleted / subTopics) * 100) : 0;

      return `
        <div>
          <div class="flex-between" style="margin-bottom: 0.35rem; font-weight: 600; font-size: 0.95rem;">
            <span>${sub.icon} ${sub.name}</span>
            <span>${subCompleted}/${subTopics} (${percent}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Quiz history list
  const histContainer = document.getElementById('quizHistoryList');
  if (histContainer) {
    if (APP_STATE.quizHistory.length === 0) {
      histContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No quiz attempts recorded yet.</p>';
    } else {
      histContainer.innerHTML = APP_STATE.quizHistory.map(h => `
        <div class="flex-between" style="padding: 0.6rem 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-sm); margin-bottom: 0.5rem; font-size: 0.9rem;">
          <span>📅 ${h.date}</span>
          <span>Score: <strong>${h.score}/${h.total}</strong> (${h.scorePercent}%)</span>
        </div>
      `).join('');
    }
  }
}

function loadProfileData() {
  const nameInput = document.getElementById('profileNameInput');
  const boardSelect = document.getElementById('profileBoardSelect');
  const goalSelect = document.getElementById('profileGoalInput');
  const profBadge = document.getElementById('profileStudentName');

  if (nameInput) nameInput.value = APP_STATE.profile.name || 'Grade 9 Scholar';
  if (boardSelect) boardSelect.value = APP_STATE.profile.board || 'sindh';
  if (goalSelect) goalSelect.value = APP_STATE.profile.goal || 'A1';
  if (profBadge) profBadge.textContent = APP_STATE.profile.name || 'Student Profile';
}

function saveProfile() {
  const nameInput = document.getElementById('profileNameInput');
  const boardSelect = document.getElementById('profileBoardSelect');
  const goalSelect = document.getElementById('profileGoalInput');
  const profBadge = document.getElementById('profileStudentName');

  APP_STATE.profile = {
    name: nameInput ? nameInput.value.trim() : 'Grade 9 Scholar',
    board: boardSelect ? boardSelect.value : 'sindh',
    goal: goalSelect ? goalSelect.value : 'A1'
  };

  localStorage.setItem('grade9_profile', JSON.stringify(APP_STATE.profile));
  if (profBadge) profBadge.textContent = APP_STATE.profile.name;
}

function resetAllProgress() {
  if (confirm('Are you sure you want to reset all topic progress, personal notes, bookmarks, and quiz statistics?')) {
    localStorage.removeItem('grade9_completed_topics');
    localStorage.removeItem('grade9_bookmarks');
    localStorage.removeItem('grade9_notes');
    localStorage.removeItem('grade9_quiz_history');
    
    APP_STATE.completedTopics = [];
    APP_STATE.bookmarks = [];
    APP_STATE.notes = {};
    APP_STATE.quizHistory = [];
    
    renderDashboardStats();
    renderProgressView();
    alert('All progress has been reset successfully.');
  }
}

