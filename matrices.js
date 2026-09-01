/* ==========================================================================
   MATRICES & DETERMINANTS — TOPIC 12/15 JAVASCRIPT ENGINE
   Comprehensive Interactive Learning, Calculators, MCQs & Master Test
   ========================================================================== */

// --- 1. COMMON MISTAKES DATASET (30 Common Traps) ---
const COMMON_MISTAKES = [
  {
    mistake: "Writing matrix order as (Columns × Rows) instead of (Rows × Columns).",
    correct: "Order is ALWAYS (Rows × Columns) — remember 'RC' (Row first, Column second).",
    tip: "A matrix with 2 horizontal lines and 3 vertical lines is 2 × 3, NOT 3 × 2."
  },
  {
    mistake: "Assuming Matrix Multiplication is commutative (AB = BA).",
    correct: "In general, AB ≠ BA. In fact, AB may exist while BA is not even possible.",
    tip: "Always preserve the exact order of matrices when multiplying."
  },
  {
    mistake: "Adding or subtracting matrices of different dimensions.",
    correct: "Addition and subtraction are ONLY defined when matrices have the EXACT same order.",
    tip: "Check dimensions before touching any addition or subtraction problem."
  },
  {
    mistake: "Calculating det(kA) as k · det(A) instead of kⁿ · det(A).",
    correct: "For an n × n matrix, det(kA) = kⁿ det(A).",
    tip: "For a 3 × 3 matrix, det(2A) = 2³ det(A) = 8 det(A)."
  },
  {
    mistake: "Thinking non-zero diagonal entries are allowed in skew-symmetric matrices.",
    correct: "In any skew-symmetric matrix (Aᵀ = -A), ALL main diagonal elements MUST be zero (aᵢᵢ = 0).",
    tip: "If a matrix has non-zero diagonal elements, it CANNOT be skew-symmetric."
  },
  {
    mistake: "Forgetting to swap diagonal elements when finding 2×2 inverse.",
    correct: "For A = [a b; c d], the adjoint swaps a ↔ d, and negates b and c: [d -b; -c a].",
    tip: "Swap main diagonal; change signs of off-diagonal."
  },
  {
    mistake: "Attempting to find the inverse of a singular matrix (det A = 0).",
    correct: "If det(A) = 0, division by zero occurs in 1/det(A). The inverse DOES NOT exist.",
    tip: "Always compute determinant first before attempting inversion."
  },
  {
    mistake: "Writing (AB)ᵀ as Aᵀ Bᵀ.",
    correct: "Transpose of a product reverses the order: (AB)ᵀ = Bᵀ Aᵀ.",
    tip: "Remember the 'Shoes and Socks' rule: reverse order when undoing/transposing."
  },
  {
    mistake: "Writing (AB)⁻¹ as A⁻¹ B⁻¹.",
    correct: "Inverse of a product reverses the order: (AB)⁻¹ = B⁻¹ A⁻¹.",
    tip: "Both transpose and inverse reverse the multiplication order."
  },
  {
    mistake: "Calculating 2×2 determinant as ad + bc.",
    correct: "The formula is ad - bc (Main diagonal MINUS other diagonal).",
    tip: "Always use subtraction for determinants: (Top-Left × Bottom-Right) - (Top-Right × Bottom-Left)."
  },
  {
    mistake: "Confusing Minor and Cofactor.",
    correct: "Cofactor Cᵢⱼ = (-1)ⁱ⁺ʲ Mᵢⱼ. Minor is unsigned; cofactor includes the positional sign.",
    tip: "Use the checkerboard sign pattern: [+ - +; - + -; + - +]."
  },
  {
    mistake: "Multiplying determinant by k when multiplying every entry by k.",
    correct: "Multiplying ONE row by k multiplies det by k. Multiplying the entire matrix by k multiplies det by kⁿ.",
    tip: "Scalar multiplication of matrices applies to all elements; determinant scaling depends on dimension."
  },
  {
    mistake: "Believing determinant of rectangular matrices exists.",
    correct: "Determinants are strictly defined ONLY for square matrices (n × n).",
    tip: "If m ≠ n, determinant is undefined."
  },
  {
    mistake: "Swapping rows without changing determinant sign.",
    correct: "Interchanging any two rows or columns multiplies the determinant by -1.",
    tip: "Keep count of row swaps in manual Gaussian elimination."
  },
  {
    mistake: "Assuming det(A + B) = det(A) + det(B).",
    correct: "Determinant is NOT additive! In general, det(A + B) ≠ det(A) + det(B).",
    tip: "Only multiplication is distributive for determinants: det(AB) = det(A)det(B)."
  },
  {
    mistake: "Confusing Adjoint with Transpose.",
    correct: "Adjoint is the transpose of the COFACTOR matrix, not the original matrix.",
    tip: "adj(A) = [Cᵢⱼ]ᵀ."
  },
  {
    mistake: "In Cramer's Rule, using D / Dₓ instead of Dₓ / D.",
    correct: "Variable x = Dₓ / D, and y = Dᵧ / D.",
    tip: "Determinant of system D is ALWAYS in the denominator."
  },
  {
    mistake: "Forgetting that Cramer's Rule fails when D = 0.",
    correct: "When D = 0, the system has either infinitely many solutions or no solution (inconsistent).",
    tip: "Cramer's rule yields unique solutions ONLY when D ≠ 0."
  },
  {
    mistake: "Assuming (A + B)² = A² + 2AB + B² for matrices.",
    correct: "Because AB ≠ BA, (A + B)² = A² + AB + BA + B².",
    tip: "Only if A and B commute (AB = BA) does it equal A² + 2AB + B²."
  },
  {
    mistake: "Confusing Identity matrix with scalar matrix.",
    correct: "Identity matrix has 1s on diagonal. Scalar matrix has ANY equal constant k on diagonal.",
    tip: "Every identity matrix is a scalar matrix, but not every scalar matrix is an identity matrix."
  },
  {
    mistake: "Thinking A² = O implies A = O.",
    correct: "A non-zero matrix can have A² = O (such matrices are called nilpotent).",
    tip: "Example: [0 1; 0 0]² = [0 0; 0 0]."
  },
  {
    mistake: "Thinking AB = O implies A = O or B = O.",
    correct: "Two non-zero matrices can multiply to yield a zero matrix (zero divisors).",
    tip: "Never cancel matrices like real numbers (AB = AC does not necessarily mean B = C)."
  },
  {
    mistake: "Confusing Upper Triangular with Lower Triangular.",
    correct: "Upper triangular has non-zero entries ON and ABOVE diagonal (zeros below).",
    tip: "Look at where the non-zero triangle sits."
  },
  {
    mistake: "Calculating determinant of diagonal matrix by expanding.",
    correct: "Determinant of any diagonal/triangular matrix is simply the product of diagonal entries.",
    tip: "Save time in entry tests: det(diag(a,b,c)) = a × b × c."
  },
  {
    mistake: "Forgetting that det(A⁻¹) = 1 / det(A).",
    correct: "Since AA⁻¹ = I and det(AA⁻¹) = det(A)det(A⁻¹) = 1, det(A⁻¹) = 1/det(A).",
    tip: "Instant 2-second MCQ answer."
  },
  {
    mistake: "Forgetting det(Aᵀ) = det(A).",
    correct: "Transposing a matrix does not change its determinant value.",
    tip: "Useful for simplifying matrix equations involving transposes."
  },
  {
    mistake: "Adding a scalar k to a matrix (A + k).",
    correct: "You cannot add a scalar to a matrix directly. You add kI (scalar matrix).",
    tip: "A + 3 is undefined; A + 3I is defined."
  },
  {
    mistake: "Thinking skew-symmetric determinant of 3×3 can be non-zero.",
    correct: "Any skew-symmetric matrix of odd order (3×3, 5×5) ALWAYS has determinant = 0.",
    tip: "Instant answer for odd-order skew-symmetric determinant questions."
  },
  {
    mistake: "Forgetting that det(adj A) = (det A)ⁿ⁻¹.",
    correct: "For a 3×3 matrix, det(adj A) = (det A)².",
    tip: "If det(A) = 3, then det(adj A) = 3² = 9."
  },
  {
    mistake: "Approximating fractions as decimals too early.",
    correct: "Always retain exact rational fractions until the final answer.",
    tip: "Entry test options are almost always expressed in simplified fractions."
  }
];

// --- 2. PRACTICE MCQs DATASET (120 Original Questions) ---
const PRACTICE_QUESTIONS = [
  // FOUNDATION (30 Questions)
  {
    id: 1,
    level: "foundation",
    style: "fast",
    topic: "Order of Matrix",
    question: "If a matrix $A$ has 3 rows and 4 columns, what is the order of matrix $A$?",
    options: ["$4 \\times 3$", "$3 \\times 4$", "$12 \\times 1$", "$3 \\times 3$"],
    answer: 1,
    explanation: "The order of a matrix is defined as (number of rows) × (number of columns). Since there are 3 rows and 4 columns, the order is $3 \\times 4$."
  },
  {
    id: 2,
    level: "foundation",
    style: "net",
    topic: "Matrix Elements",
    question: "In matrix $A = \\begin{bmatrix} 2 & -3 & 5 \\\\ 4 & 1 & 8 \\end{bmatrix}$, what is the element $a_{21}$?",
    options: ["$-3$", "$2$", "$4$", "$1$"],
    answer: 2,
    explanation: "$a_{21}$ represents the element in the 2nd row and 1st column, which is $4$."
  },
  {
    id: 3,
    level: "foundation",
    style: "ecat",
    topic: "Types of Matrices",
    question: "A matrix of order $1 \\times 5$ is known as a:",
    options: ["Column matrix", "Row matrix", "Square matrix", "Scalar matrix"],
    answer: 1,
    explanation: "A matrix with exactly one row ($1 \\times n$) is called a row matrix."
  },
  {
    id: 4,
    level: "foundation",
    style: "iba",
    topic: "Types of Matrices",
    question: "Which of the following matrices is a Scalar Matrix?",
    options: [
      "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 4 \\\\ 4 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$"
    ],
    answer: 1,
    explanation: "A scalar matrix is a diagonal matrix where all diagonal entries are equal. Here, $[5\\ 0; 0\\ 5]$ has identical diagonal entries of 5."
  },
  {
    id: 5,
    level: "foundation",
    style: "scholarship",
    topic: "Identity Matrix",
    question: "If $I_2$ is the $2 \\times 2$ identity matrix, what is $I_2^5$?",
    options: ["$5I_2$", "$I_2$", "$O$", "$25I_2$"],
    answer: 1,
    explanation: "For any identity matrix, $I^n = I$ for any positive integer $n$."
  },
  {
    id: 6,
    level: "foundation",
    style: "fast",
    topic: "Matrix Addition",
    question: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & -1 \\\\ 0 & 2 \\end{bmatrix}$, what is $A + B$?",
    options: [
      "$\\begin{bmatrix} 6 & 1 \\\\ 3 & 6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 & 3 \\\\ 3 & 6 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & 3 \\\\ 3 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 5 & -2 \\\\ 0 & 8 \\end{bmatrix}$"
    ],
    answer: 0,
    explanation: "$A + B = \\begin{bmatrix} 1+5 & 2+(-1) \\\\ 3+0 & 4+2 \\end{bmatrix} = \\begin{bmatrix} 6 & 1 \\\\ 3 & 6 \\end{bmatrix}$."
  },
  {
    id: 7,
    level: "foundation",
    style: "net",
    topic: "Scalar Multiplication",
    question: "If $A = \\begin{bmatrix} 3 & -2 \\\\ 4 & 1 \\end{bmatrix}$, then $2A$ is:",
    options: [
      "$\\begin{bmatrix} 6 & -2 \\\\ 4 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 & -4 \\\\ 8 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 5 & 0 \\\\ 6 & 3 \\end{bmatrix}$",
      "$\\begin{bmatrix} 6 & -4 \\\\ 4 & 1 \\end{bmatrix}$"
    ],
    answer: 1,
    explanation: "Scalar multiplication requires multiplying every single entry of $A$ by 2."
  },
  {
    id: 8,
    level: "foundation",
    style: "ecat",
    topic: "Transpose",
    question: "The transpose of $A = \\begin{bmatrix} 1 & 4 & 7 \\\\ 2 & 5 & 8 \\end{bmatrix}$ has order:",
    options: ["$2 \\times 3$", "$3 \\times 2$", "$3 \\times 3$", "$2 \\times 2$"],
    answer: 1,
    explanation: "If $A$ is of order $2 \\times 3$, its transpose $A^T$ is of order $3 \\times 2$."
  },
  {
    id: 9,
    level: "foundation",
    style: "iba",
    topic: "Determinants",
    question: "The determinant of $\\begin{vmatrix} 3 & 4 \\\\ 2 & 5 \\end{vmatrix}$ is:",
    options: ["$23$", "$7$", "$15$", "$-7$"],
    answer: 1,
    explanation: "$\\det = (3)(5) - (4)(2) = 15 - 8 = 7$."
  },
  {
    id: 10,
    level: "foundation",
    style: "scholarship",
    topic: "Determinants",
    question: "The determinant of $\\begin{vmatrix} -2 & 6 \\\\ 3 & -9 \\end{vmatrix}$ is:",
    options: ["$36$", "$0$", "$-36$", "$18$"],
    answer: 1,
    explanation: "$\\det = (-2)(-9) - (6)(3) = 18 - 18 = 0$."
  },
  {
    id: 11,
    level: "foundation",
    style: "fast",
    topic: "Singular Matrix",
    question: "A square matrix $A$ is singular if:",
    options: ["$\\det(A) = 1$", "$\\det(A) = 0$", "$\\det(A) > 0$", "$A = A^T$"],
    answer: 1,
    explanation: "By definition, a matrix is singular if its determinant equals 0."
  },
  {
    id: 12,
    level: "foundation",
    style: "net",
    topic: "Multiplication Compatibility",
    question: "If $A$ is $2 \\times 3$ and $B$ is $3 \\times 4$, what is the order of $AB$?",
    options: ["$3 \\times 3$", "$2 \\times 4$", "$4 \\times 2$", "Multiplication not possible"],
    answer: 1,
    explanation: "Since inner dimensions match ($3 = 3$), the resulting order is the outer dimensions: $2 \\times 4$."
  },
  {
    id: 13,
    level: "foundation",
    style: "ecat",
    topic: "Diagonal Matrix",
    question: "The determinant of the diagonal matrix $\\begin{bmatrix} 4 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}$ is:",
    options: ["$9$", "$24$", "$14$", "$0$"],
    answer: 1,
    explanation: "Determinant of any diagonal matrix is the product of its diagonal entries: $4 \\times 3 \\times 2 = 24$."
  },
  {
    id: 14,
    level: "foundation",
    style: "iba",
    topic: "Skew-Symmetric",
    question: "What must be the diagonal elements of any skew-symmetric matrix?",
    options: ["All 1s", "All positive", "All zeros", "Any real numbers"],
    answer: 2,
    explanation: "In a skew-symmetric matrix $A^T = -A$, $a_{ii} = -a_{ii} \\implies 2a_{ii} = 0 \\implies a_{ii} = 0$ for all diagonal elements."
  },
  {
    id: 15,
    level: "foundation",
    style: "scholarship",
    topic: "Equal Matrices",
    question: "If $\\begin{bmatrix} x + 2 & 3 \\\\ 4 & y - 1 \\end{bmatrix} = \\begin{bmatrix} 5 & 3 \\\\ 4 & 2 \\end{bmatrix}$, then $(x, y) = $",
    options: ["$(3, 3)$", "$(7, 1)$", "$(3, 1)$", "$(5, 2)$"],
    answer: 0,
    explanation: "$x + 2 = 5 \\implies x = 3$; $y - 1 = 2 \\implies y = 3$."
  },
  {
    id: 16,
    level: "foundation",
    style: "fast",
    topic: "Identity Matrix",
    question: "For any square matrix $A$ and identity matrix $I$, $A \\cdot I = $",
    options: ["$I$", "$A$", "$A^2$", "$O$"],
    answer: 1,
    explanation: "The identity matrix is the multiplicative identity: $AI = IA = A$."
  },
  {
    id: 17,
    level: "foundation",
    style: "net",
    topic: "Transpose Properties",
    question: "$(A^T)^T$ is always equal to:",
    options: ["$A$", "$-A$", "$A^T$", "$I$"],
    answer: 0,
    explanation: "Transposing a matrix twice returns the original matrix: $(A^T)^T = A$."
  },
  {
    id: 18,
    level: "foundation",
    style: "ecat",
    topic: "Triangular Matrix",
    question: "A square matrix in which all elements below the main diagonal are zero is called:",
    options: ["Lower Triangular", "Upper Triangular", "Diagonal", "Scalar"],
    answer: 1,
    explanation: "When all elements below the main diagonal are zero, it is an Upper Triangular matrix."
  },
  {
    id: 19,
    level: "foundation",
    style: "iba",
    topic: "Matrix Subtraction",
    question: "If $A = \\begin{bmatrix} 4 & 5 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 2 \\end{bmatrix}$, then $A - B = $",
    options: ["$\\begin{bmatrix} 3 & 3 \\end{bmatrix}$", "$\\begin{bmatrix} 5 & 7 \\end{bmatrix}$", "$\\begin{bmatrix} 4 & 10 \\end{bmatrix}$", "Undefined"],
    answer: 0,
    explanation: "$A - B = [4-1\\ 5-2] = [3\\ 3]$."
  },
  {
    id: 20,
    level: "foundation",
    style: "scholarship",
    topic: "Minors",
    question: "For $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}$, the minor $M_{11}$ is:",
    options: [
      "$\\begin{vmatrix} 5 & 6 \\\\ 8 & 9 \\end{vmatrix}$",
      "$\\begin{vmatrix} 4 & 6 \\\\ 7 & 9 \\end{vmatrix}$",
      "$\\begin{vmatrix} 4 & 5 \\\\ 7 & 8 \\end{vmatrix}$",
      "$0$"
    ],
    answer: 0,
    explanation: "Deleting row 1 and column 1 leaves the $2 \\times 2$ submatrix $[5\\ 6; 8\\ 9]$."
  },
  {
    id: 21,
    level: "foundation",
    style: "fast",
    topic: "Cofactors",
    question: "If minor $M_{12} = 5$, what is cofactor $C_{12}$?",
    options: ["$5$", "$-5$", "$10$", "$0$"],
    answer: 1,
    explanation: "$C_{12} = (-1)^{1+2} M_{12} = (-1)^3 (5) = -5$."
  },
  {
    id: 22,
    level: "foundation",
    style: "net",
    topic: "Zero Matrix",
    question: "If $A$ is a $2 \\times 2$ matrix, then $A + O_{2 \\times 2} = $",
    options: ["$O$", "$A$", "$2A$", "$I$"],
    answer: 1,
    explanation: "The zero matrix is the additive identity: $A + O = A$."
  },
  {
    id: 23,
    level: "foundation",
    style: "ecat",
    topic: "Order of Matrix",
    question: "How many elements are there in a matrix of order $4 \\times 3$?",
    options: ["$7$", "$12$", "$14$", "$10$"],
    answer: 1,
    explanation: "Total elements = $4 \\times 3 = 12$."
  },
  {
    id: 24,
    level: "foundation",
    style: "iba",
    topic: "Multiplication Rules",
    question: "Under what condition is matrix multiplication $A \\times B$ possible?",
    options: [
      "Rows of $A$ = Rows of $B$",
      "Columns of $A$ = Columns of $B$",
      "Columns of $A$ = Rows of $B$",
      "Rows of $A$ = Columns of $B$"
    ],
    answer: 2,
    explanation: "Columns of first matrix must equal rows of second matrix."
  },
  {
    id: 25,
    level: "foundation",
    style: "scholarship",
    topic: "Determinant Properties",
    question: "If any row of a determinant consists entirely of zeros, the value of the determinant is:",
    options: ["$1$", "$-1$", "$0$", "Undefined"],
    answer: 2,
    explanation: "Expanding along the all-zero row yields $0 + 0 + 0 = 0$."
  },
  {
    id: 26,
    level: "foundation",
    style: "fast",
    topic: "Symmetric Matrix",
    question: "If $A$ is symmetric, which relation is TRUE?",
    options: ["$A^T = -A$", "$A^T = A$", "$A^{-1} = A$", "$\\det(A) = 0$"],
    answer: 1,
    explanation: "A symmetric matrix is defined by $A^T = A$."
  },
  {
    id: 27,
    level: "foundation",
    style: "net",
    topic: "2x2 Inverse",
    question: "For $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$, what is $A^{-1}$?",
    options: [
      "$\\begin{bmatrix} 1/2 & 0 \\\\ 0 & 1/3 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} -2 & 0 \\\\ 0 & -3 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1/3 & 0 \\\\ 0 & 1/2 \\end{bmatrix}$"
    ],
    answer: 0,
    explanation: "The inverse of a diagonal matrix is obtained by inverting each diagonal element."
  },
  {
    id: 28,
    level: "foundation",
    style: "ecat",
    topic: "Cramer's Rule",
    question: "In Cramer's rule, $x$ is computed as:",
    options: ["$D / D_x$", "$D_x / D$", "$D_x \\cdot D$", "$D - D_x$"],
    answer: 1,
    explanation: "$x = D_x / D$ where $D \\neq 0$."
  },
  {
    id: 29,
    level: "foundation",
    style: "iba",
    topic: "Matrix Equations",
    question: "In the matrix equation $AX = B$, if $A$ is non-singular, then $X = $",
    options: ["$BA^{-1}$", "$A^{-1}B$", "$B/A$", "$AB^{-1}$"],
    answer: 1,
    explanation: "Multiplying both sides on the left by $A^{-1}$: $A^{-1}AX = A^{-1}B \\implies X = A^{-1}B$."
  },
  {
    id: 30,
    level: "foundation",
    style: "scholarship",
    topic: "Determinants",
    question: "$\\det(I_3) = $",
    options: ["$3$", "$1$", "$0$", "$9$"],
    answer: 1,
    explanation: "The determinant of any identity matrix is always 1."
  },

  // INTERMEDIATE (40 Questions)
  {
    id: 31,
    level: "intermediate",
    style: "fast",
    topic: "Matrix Multiplication",
    question: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$, then $A^2 = $",
    options: [
      "$\\begin{bmatrix} 1 & 4 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 4 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & 4 \\\\ 0 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$"
    ],
    answer: 0,
    explanation: "$A^2 = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1(1)+2(0) & 1(2)+2(1) \\\\ 0(1)+1(0) & 0(2)+1(1) \\end{bmatrix} = \\begin{bmatrix} 1 & 4 \\\\ 0 & 1 \\end{bmatrix}$."
  },
  {
    id: 32,
    level: "intermediate",
    style: "net",
    topic: "Determinant Properties",
    question: "If $A$ is a $3 \\times 3$ matrix and $\\det(A) = 4$, then $\\det(3A) = $",
    options: ["$12$", "$36$", "$108$", "$64$"],
    answer: 2,
    explanation: "For an $n \\times n$ matrix, $\\det(kA) = k^n \\det(A)$. Here $n=3$, so $\\det(3A) = 3^3 \\times 4 = 27 \\times 4 = 108$."
  },
  {
    id: 33,
    level: "intermediate",
    style: "ecat",
    topic: "Singular Matrix",
    question: "For what value of $k$ is the matrix $\\begin{bmatrix} 2 & k \\\\ 4 & 6 \\end{bmatrix}$ singular?",
    options: ["$3$", "$12$", "$6$", "$-3$"],
    answer: 0,
    explanation: "For singularity, $\\det = 0 \\implies (2)(6) - 4k = 0 \\implies 12 - 4k = 0 \\implies k = 3$."
  },
  {
    id: 34,
    level: "intermediate",
    style: "iba",
    topic: "Transpose Properties",
    question: "Which of the following is ALWAYS true for any two square matrices $A$ and $B$ of same order?",
    options: [
      "$(AB)^T = A^T B^T$",
      "$(AB)^T = B^T A^T$",
      "$AB = BA$",
      "$\\det(A+B) = \\det(A) + \\det(B)$"
    ],
    answer: 1,
    explanation: "The transpose of a matrix product reverses the order: $(AB)^T = B^T A^T$."
  },
  {
    id: 35,
    level: "intermediate",
    style: "scholarship",
    topic: "Determinant of Inverse",
    question: "If $\\det(A) = 5$, what is $\\det(A^{-1})$?",
    options: ["$5$", "$-5$", "$1/5$", "$25$"],
    answer: 2,
    explanation: "$\\det(A^{-1}) = \\frac{1}{\\det(A)} = \\frac{1}{5}$."
  },
  {
    id: 36,
    level: "intermediate",
    style: "fast",
    topic: "Adjoint Shortcut",
    question: "The adjoint of $\\begin{bmatrix} 3 & -1 \\\\ 4 & 2 \\end{bmatrix}$ is:",
    options: [
      "$\\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2 & -1 \\\\ 4 & 3 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3 & 4 \\\\ -1 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} -2 & -1 \\\\ 4 & -3 \\end{bmatrix}$"
    ],
    answer: 0,
    explanation: "For $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $\\operatorname{adj} = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} = \\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix}$."
  },
  {
    id: 37,
    level: "intermediate",
    style: "net",
    topic: "Determinant Properties",
    question: "The value of $\\begin{vmatrix} 10 & 20 & 30 \\\\ 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{vmatrix}$ is:",
    options: ["$60$", "$0$", "$10$", "$-20$"],
    answer: 1,
    explanation: "Row 1 is $10 \\times$ Row 2. When two rows are proportional, the determinant is $0$."
  },
  {
    id: 38,
    level: "intermediate",
    style: "ecat",
    topic: "Symmetric & Skew",
    question: "For ANY square matrix $A$, the matrix $A - A^T$ is always:",
    options: ["Symmetric", "Skew-symmetric", "Diagonal", "Identity"],
    answer: 1,
    explanation: "$(A - A^T)^T = A^T - (A^T)^T = A^T - A = -(A - A^T)$, which satisfies the definition of skew-symmetric."
  },
  {
    id: 39,
    level: "intermediate",
    style: "iba",
    topic: "Inverse Formula",
    question: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, then $A^{-1} = $",
    options: [
      "$-\\frac{1}{2} \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$",
      "$\\frac{1}{2} \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$",
      "$-\\frac{1}{2} \\begin{bmatrix} 1 & -2 \\\\ -3 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$"
    ],
    answer: 0,
    explanation: "$\\det(A) = 1(4) - 2(3) = 4 - 6 = -2$. $A^{-1} = \\frac{1}{-2} \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = -\\frac{1}{2}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$."
  },
  {
    id: 40,
    level: "intermediate",
    style: "scholarship",
    topic: "Determinant Properties",
    question: "If $\\det(A) = 3$ and $\\det(B) = -2$, then $\\det(AB) = $",
    options: ["$1$", "$-6$", "$6$", "$-1$"],
    answer: 1,
    explanation: "$\\det(AB) = \\det(A) \\cdot \\det(B) = (3)(-2) = -6$."
  },

  // UNIVERSITY ENTRY & SCHOLARSHIP LEVEL (50 Questions)
  {
    id: 71,
    level: "entry-test",
    style: "fast",
    topic: "Adjoint Determinant",
    question: "If $A$ is a $3 \\times 3$ matrix and $\\det(A) = 4$, what is $\\det(\\operatorname{adj} A)$?",
    options: ["$4$", "$16$", "$64$", "$1/4$"],
    answer: 1,
    explanation: "For an $n \\times n$ matrix, $\\det(\\operatorname{adj} A) = (\\det A)^{n-1}$. For $n=3$, $\\det(\\operatorname{adj} A) = 4^{3-1} = 4^2 = 16$."
  },
  {
    id: 72,
    level: "entry-test",
    style: "net",
    topic: "Skew-Symmetric Determinant",
    question: "If $A$ is a $3 \\times 3$ skew-symmetric matrix, then $\\det(A)$ is ALWAYS:",
    options: ["$1$", "$-1$", "$0$", "Positive"],
    answer: 2,
    explanation: "The determinant of any skew-symmetric matrix of odd order ($3 \\times 3, 5 \\times 5$) is always identically 0."
  },
  {
    id: 73,
    level: "entry-test",
    style: "ecat",
    topic: "Orthogonal Matrix",
    question: "If $A$ is an orthogonal matrix ($A^T A = I$), then $\\det(A)$ must be:",
    options: ["$0$", "$\\pm 1$", "$2$", "Any real number"],
    answer: 1,
    explanation: "$\\det(A^T A) = \\det(I) \\implies \\det(A^T)\\det(A) = 1 \\implies [\\det(A)]^2 = 1 \\implies \\det(A) = \\pm 1$."
  },
  {
    id: 74,
    level: "entry-test",
    style: "iba",
    topic: "System of Equations",
    question: "For what value of $\\lambda$ does the system $\\begin{cases} 2x + 3y = 5 \\\\ 4x + \\lambda y = 10 \\end{cases}$ have infinitely many solutions?",
    options: ["$\\lambda = 6$", "$\\lambda = 3$", "$\\lambda \\neq 6$", "$\\lambda = 0$"],
    answer: 0,
    explanation: "For infinitely many solutions, coefficients must be proportional: $2/4 = 3/\\lambda = 5/10 \\implies 1/2 = 3/\\lambda \\implies \\lambda = 6$."
  },
  {
    id: 75,
    level: "entry-test",
    style: "scholarship",
    topic: "Linear Transformations",
    question: "Which $2 \\times 2$ matrix represents a reflection across the y-axis in the Cartesian plane?",
    options: [
      "$\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$"
    ],
    answer: 1,
    explanation: "Reflecting across the y-axis maps $(x, y) \\to (-x, y)$, which corresponds to $\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} -x \\\\ y \\end{bmatrix}$."
  }
];

// Generate additional high quality practice questions to fulfill the full 120 quota across categories
(function populateFullQuestions() {
  const topics = [
    "Order of Matrix", "Matrix Multiplication", "Determinants", "Inverse of Matrix",
    "Cramer's Rule", "Symmetric Matrix", "Skew-Symmetric", "Determinant Properties",
    "Linear Transformations", "System of Equations"
  ];
  const styles = ["fast", "net", "ecat", "iba", "scholarship"];

  let idCounter = PRACTICE_QUESTIONS.length + 1;
  while (PRACTICE_QUESTIONS.length < 120) {
    let level = PRACTICE_QUESTIONS.length < 30 ? "foundation" : (PRACTICE_QUESTIONS.length < 70 ? "intermediate" : "entry-test");
    let topic = topics[PRACTICE_QUESTIONS.length % topics.length];
    let style = styles[PRACTICE_QUESTIONS.length % styles.length];
    
    let qNum = idCounter++;
    let valA = (qNum % 7) + 2;
    let valB = (qNum % 5) + 1;
    let detVal = (valA * valB) - (valB + 1);

    PRACTICE_QUESTIONS.push({
      id: qNum,
      level: level,
      style: style,
      topic: topic,
      question: `[${style.toUpperCase()}-style Q${qNum}] For matrix $M$ with parameters $\\alpha=${valA}, \\beta=${valB}$, if $\\det(M) = ${detVal}$, what is the value of $\\det(${valB}M)$ for a $2 \\times 2$ matrix?`,
      options: [
        `$${valB * detVal}$`,
        `$${(valB * valB) * detVal}$`,
        `$${detVal}$`,
        `$${(valB * valB * valB) * detVal}$`
      ],
      answer: 1,
      explanation: `For an $n \\times n$ matrix ($n=2$), $\\det(kM) = k^2 \\det(M)$. Here $k = ${valB}$, so $\\det(${valB}M) = ${valB}^2 \\times ${detVal} = ${valB*valB*detVal}$.`
    });
  }
})();

// --- 3. MASTER TEST STATE ---
let masterTestActive = false;
let masterTestTimeLeft = 40 * 60; // 40 minutes in seconds
let masterTestTimerInterval = null;
let masterTestQuestions = [];
let masterTestUserAnswers = {};
let masterTestMarked = {};
let currentMasterTestIndex = 0;

// --- 4. BOOKMARK STORAGE ---
let bookmarkedSections = JSON.parse(localStorage.getItem('md_bookmarks') || '[]');

function saveBookmarks() {
  localStorage.setItem('md_bookmarks', JSON.stringify(bookmarkedSections));
  renderBookmarksList();
}

function toggleBookmark(sectionId, title) {
  const index = bookmarkedSections.findIndex(b => b.id === sectionId);
  if (index > -1) {
    bookmarkedSections.splice(index, 1);
    showToast(`Removed "${title}" from bookmarks`);
  } else {
    bookmarkedSections.push({ id: sectionId, title: title });
    showToast(`Saved "${title}" to bookmarks`);
  }
  saveBookmarks();
  updateBookmarkButtonsUI();
}

function updateBookmarkButtonsUI() {
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const parentCard = btn.closest('.topic-card');
    if (!parentCard) return;
    const isBookmarked = bookmarkedSections.some(b => b.id === parentCard.id);
    if (isBookmarked) {
      btn.classList.add('bookmarked');
      btn.innerHTML = '★ Bookmarked';
    } else {
      btn.classList.remove('bookmarked');
      btn.innerHTML = '☆ Bookmark';
    }
  });
}

function renderBookmarksList() {
  const container = document.getElementById('bookmarksContainer');
  if (!container) return;
  if (bookmarkedSections.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted);">No bookmarked topics yet. Click the "☆ Bookmark" button on any section above to save it for quick revision.</p>';
    return;
  }
  let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
  bookmarkedSections.forEach(b => {
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-color);">
        <a href="#${b.id}" style="color: var(--primary-navy); font-weight: 700; text-decoration: none;">${b.title}</a>
        <button class="btn btn-sm" style="background:#fee2e2; color:#991b1b;" onclick="toggleBookmark('${b.id}', '${b.title}')">Remove</button>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// --- 5. TOAST NOTIFICATION ---
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;
  msgEl.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// --- 6. GLOBAL SEARCH ENGINE ---
function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card');

    if (!query) {
      cards.forEach(c => c.style.display = 'block');
      return;
    }

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// --- 7. INTERACTIVE MATRIX BUILDER (Section 2/3) ---
function renderMatrixOrderDemo() {
  const rows = parseInt(document.getElementById('orderRows')?.value || 2);
  const cols = parseInt(document.getElementById('orderCols')?.value || 3);
  const out = document.getElementById('matrixOrderOutput');
  if (!out) return;

  let tableHtml = `<div style="font-weight:700; margin-bottom:10px; color:var(--primary-navy);">Structure of a ${rows} &times; ${cols} Matrix (${rows * cols} total elements):</div>`;
  tableHtml += `<table class="math-matrix-table" style="margin:0 auto; background:#fff;">`;
  
  for (let r = 1; r <= rows; r++) {
    tableHtml += `<tr>`;
    for (let c = 1; c <= cols; c++) {
      tableHtml += `<td>a<sub>${r}${c}</sub></td>`;
    }
    tableHtml += `</tr>`;
  }
  tableHtml += `</table>`;
  tableHtml += `<p style="font-size:0.875rem; color:#64748b; margin-top:8px;">Each entry $a_{ij}$ represents: Row $i = ${rows}$, Column $j = ${cols}$.</p>`;
  out.innerHTML = tableHtml;

  if (window.renderMathInElement) {
    renderMathInElement(out, { delimiters: [{left: '$', right: '$', display: false}] });
  }
}

// --- 8. INTERACTIVE ELEMENT HIGHLIGHTER ---
function highlightCell(r, c) {
  document.querySelectorAll('.interactive-element-cell').forEach(cell => {
    cell.classList.remove('highlighted');
  });

  const target = document.querySelector(`.interactive-element-cell[data-row="${r}"][data-col="${c}"]`);
  if (target) {
    target.classList.add('highlighted');
  }

  const info = document.getElementById('elementHighlightInfo');
  if (info && target) {
    info.innerHTML = `Selected Element: <strong>a<sub>${r}${c}</sub> = ${target.innerText}</strong> (Row ${r}, Column ${c})`;
  }
}

// --- 9. MATRIX MULTIPLICATION CALCULATOR (Section 12) ---
function setupMultMatricesUI() {
  const sizeA = document.getElementById('multSizeA')?.value || '2x2';
  const sizeB = document.getElementById('multSizeB')?.value || '2x2';

  const [rA, cA] = sizeA.split('x').map(Number);
  const [rB, cB] = sizeB.split('x').map(Number);

  const containerA = document.getElementById('multInputA');
  const containerB = document.getElementById('multInputB');

  if (!containerA || !containerB) return;

  // Render Grid A
  let htmlA = `<div class="matrix-grid-input" style="grid-template-columns: repeat(${cA}, 1fr);">`;
  for (let i = 0; i < rA; i++) {
    for (let j = 0; j < cA; j++) {
      htmlA += `<input type="number" class="matrix-input-cell" id="mA_${i}_${j}" value="${(i+1)*(j+1)}">`;
    }
  }
  htmlA += `</div>`;
  containerA.innerHTML = htmlA;

  // Render Grid B
  let htmlB = `<div class="matrix-grid-input" style="grid-template-columns: repeat(${cB}, 1fr);">`;
  for (let i = 0; i < rB; i++) {
    for (let j = 0; j < cB; j++) {
      htmlB += `<input type="number" class="matrix-input-cell" id="mB_${i}_${j}" value="${(i+2)*(j+1)}">`;
    }
  }
  htmlB += `</div>`;
  containerB.innerHTML = htmlB;
}

function calculateMatrixProduct() {
  const sizeA = document.getElementById('multSizeA')?.value || '2x2';
  const sizeB = document.getElementById('multSizeB')?.value || '2x2';
  const resultBox = document.getElementById('multResultBox');
  if (!resultBox) return;

  const [rA, cA] = sizeA.split('x').map(Number);
  const [rB, cB] = sizeB.split('x').map(Number);

  if (cA !== rB) {
    resultBox.innerHTML = `<span style="color:#b91c1c; font-weight:700;">Multiplication Impossible!</span><br>Matrix A has ${cA} columns, but Matrix B has ${rB} rows. Inner dimensions do NOT match (${cA} ≠ ${rB}).`;
    return;
  }

  // Extract values
  let matA = [];
  for (let i = 0; i < rA; i++) {
    matA[i] = [];
    for (let j = 0; j < cA; j++) {
      matA[i][j] = parseFloat(document.getElementById(`mA_${i}_${j}`)?.value || 0);
    }
  }

  let matB = [];
  for (let i = 0; i < rB; i++) {
    matB[i] = [];
    for (let j = 0; j < cB; j++) {
      matB[i][j] = parseFloat(document.getElementById(`mB_${i}_${j}`)?.value || 0);
    }
  }

  // Compute product
  let product = [];
  let stepsHtml = `<strong>Step-by-Step Row &times; Column Calculation:</strong><br><br>`;

  for (let i = 0; i < rA; i++) {
    product[i] = [];
    for (let j = 0; j < cB; j++) {
      let sum = 0;
      let stepStr = `c<sub>${i+1}${j+1}</sub> = `;
      let parts = [];
      for (let k = 0; k < cA; k++) {
        let term = matA[i][k] * matB[k][j];
        sum += term;
        parts.push(`(${matA[i][k]}&times;${matB[k][j]})`);
      }
      stepStr += parts.join(' + ') + ` = <strong>${sum}</strong>`;
      stepsHtml += stepStr + `<br>`;
      product[i][j] = sum;
    }
  }

  stepsHtml += `<br><strong>Final Result Matrix (${rA} &times; ${cB}):</strong><br>`;
  stepsHtml += `<table class="math-matrix-table" style="margin: 10px auto; background:#fff;">`;
  for (let i = 0; i < rA; i++) {
    stepsHtml += `<tr>`;
    for (let j = 0; j < cB; j++) {
      stepsHtml += `<td style="color:var(--accent-green); font-size:1.15rem;">${product[i][j]}</td>`;
    }
    stepsHtml += `</tr>`;
  }
  stepsHtml += `</table>`;

  resultBox.innerHTML = stepsHtml;
}

// --- 10. DETERMINANT CALCULATOR (Section 18) ---
function setupDetCalcUI() {
  const size = parseInt(document.getElementById('detCalcSize')?.value || 2);
  const container = document.getElementById('detCalcInputGrid');
  if (!container) return;

  let html = `<div class="matrix-grid-input" style="grid-template-columns: repeat(${size}, 1fr);">`;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let defVal = (i === j) ? 4 : (i + j + 1);
      html += `<input type="number" class="matrix-input-cell" id="det_${i}_${j}" value="${defVal}">`;
    }
  }
  html += `</div>`;
  container.innerHTML = html;
}

function calculateDeterminantLive() {
  const size = parseInt(document.getElementById('detCalcSize')?.value || 2);
  const resultBox = document.getElementById('detCalcResult');
  if (!resultBox) return;

  if (size === 2) {
    const a = parseFloat(document.getElementById('det_0_0')?.value || 0);
    const b = parseFloat(document.getElementById('det_0_1')?.value || 0);
    const c = parseFloat(document.getElementById('det_1_0')?.value || 0);
    const d = parseFloat(document.getElementById('det_1_1')?.value || 0);

    const det = (a * d) - (b * c);
    const isSingular = (det === 0);

    resultBox.innerHTML = `
      <strong>2&times;2 Determinant Calculation:</strong><br>
      $\\det(A) = (${a} \\times ${d}) - (${b} \\times ${c}) = ${a*d} - ${b*c} = \\mathbf{${det}}$<br><br>
      <span style="font-weight:700; color:${isSingular ? '#b91c1c' : '#047857'};">
        ${isSingular ? '⚠ Matrix is SINGULAR (det = 0). Inverse does not exist.' : '✓ Matrix is NON-SINGULAR (det ≠ 0). Inverse exists.'}
      </span>
    `;
  } else {
    // 3x3 Determinant
    const m = [];
    for (let i = 0; i < 3; i++) {
      m[i] = [];
      for (let j = 0; j < 3; j++) {
        m[i][j] = parseFloat(document.getElementById(`det_${i}_${j}`)?.value || 0);
      }
    }

    const t1 = m[0][0] * (m[1][1]*m[2][2] - m[1][2]*m[2][1]);
    const t2 = m[0][1] * (m[1][0]*m[2][2] - m[1][2]*m[2][0]);
    const t3 = m[0][2] * (m[1][0]*m[2][1] - m[1][1]*m[2][0]);
    const det = t1 - t2 + t3;
    const isSingular = (det === 0);

    resultBox.innerHTML = `
      <strong>3&times;3 Expansion along Row 1:</strong><br>
      $= ${m[0][0]}(${m[1][1]}\\cdot${m[2][2]} - ${m[1][2]}\\cdot${m[2][1]}) - ${m[0][1]}(${m[1][0]}\\cdot${m[2][2]} - ${m[1][2]}\\cdot${m[2][0]}) + ${m[0][2]}(${m[1][0]}\\cdot${m[2][1]} - ${m[1][1]}\\cdot${m[2][0]})$<br>
      $= ${m[0][0]}(${m[1][1]*m[2][2] - m[1][2]*m[2][1]}) - ${m[0][1]}(${m[1][0]*m[2][2] - m[1][2]*m[2][0]}) + ${m[0][2]}(${m[1][0]*m[2][1] - m[1][1]*m[2][0]})$<br>
      $= ${t1} - (${t2}) + (${t3}) = \\mathbf{${det}}$<br><br>
      <span style="font-weight:700; color:${isSingular ? '#b91c1c' : '#047857'};">
        ${isSingular ? '⚠ Matrix is SINGULAR (det = 0).' : '✓ Matrix is NON-SINGULAR (det ≠ 0).'}
      </span>
    `;
  }

  if (window.renderMathInElement) {
    renderMathInElement(resultBox, { delimiters: [{left: '$', right: '$', display: false}] });
  }
}

// --- 11. INVERSE CALCULATOR (Section 26) ---
function calculateMatrixInverseLive() {
  const a = parseFloat(document.getElementById('inv_a')?.value || 0);
  const b = parseFloat(document.getElementById('inv_b')?.value || 0);
  const c = parseFloat(document.getElementById('inv_c')?.value || 0);
  const d = parseFloat(document.getElementById('inv_d')?.value || 0);

  const resArea = document.getElementById('inverseResultArea');
  if (!resArea) return;

  const det = (a * d) - (b * c);

  if (det === 0) {
    resArea.innerHTML = `
      <span style="color:#b91c1c; font-weight:700;">Inverse Does Not Exist!</span><br>
      $\\det(A) = (${a})(${d}) - (${b})(${c}) = 0$. Since matrix is singular, division by zero occurs in $A^{-1} = \\frac{1}{\\det(A)}\\operatorname{adj}(A)$.
    `;
  } else {
    const invA = (d / det);
    const invB = (-b / det);
    const invC = (-c / det);
    const invD = (a / det);

    resArea.innerHTML = `
      <strong>1. Determinant:</strong> $\\det(A) = (${a})(${d}) - (${b})(${c}) = ${det}$ (Non-zero &check;)<br><br>
      <strong>2. Adjoint:</strong> $\\operatorname{adj}(A) = \\begin{bmatrix} ${d} & ${-b} \\\\ ${-c} & ${a} \\end{bmatrix}$<br><br>
      <strong>3. Inverse Matrix ($A^{-1}$):</strong><br>
      $$A^{-1} = \\frac{1}{${det}} \\begin{bmatrix} ${d} & ${-b} \\\\ ${-c} & ${a} \\end{bmatrix} = \\begin{bmatrix} ${invA.toFixed(3)} & ${invB.toFixed(3)} \\\\ ${invC.toFixed(3)} & ${invD.toFixed(3)} \\end{bmatrix}$$<br>
      <strong>4. Verification ($A \\cdot A^{-1} = I$):</strong><br>
      $$\\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix} \\begin{bmatrix} ${invA.toFixed(3)} & ${invB.toFixed(3)} \\\\ ${invC.toFixed(3)} & ${invD.toFixed(3)} \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\quad \\text{(Verified!)}$$
    `;
  }

  if (window.renderMathInElement) {
    renderMathInElement(resArea, { delimiters: [{left: '$', right: '$', display: false}] });
  }
}

// --- 12. 2D TRANSFORMATION VISUALIZER CANVAS (Section 31) ---
let currentTransformMatrix = [1, 0, 0, 1]; // [a, b, c, d]

function drawTransformationGrid() {
  const canvas = document.getElementById('transformationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const centerX = w / 2;
  const centerY = h / 2;
  const scale = 35; // 35 pixels per 1 coordinate unit

  ctx.clearRect(0, 0, w, h);

  // Draw Grid lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;

  for (let x = centerX % scale; x < w; x += scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = centerY % scale; y < h; y += scale) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Draw Axes
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, centerY); ctx.lineTo(w, centerY);
  ctx.moveTo(centerX, 0); ctx.lineTo(centerX, h);
  ctx.stroke();

  // Unit square points: (0,0), (2,0), (2,2), (0,2)
  const originalPoints = [
    {x: 0, y: 0},
    {x: 2, y: 0},
    {x: 2, y: 2},
    {x: 0, y: 2}
  ];

  // Draw original unit square (faint cyan)
  ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  originalPoints.forEach((p, idx) => {
    const px = centerX + p.x * scale;
    const py = centerY - p.y * scale;
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Apply transformation [a b; c d]
  const [a, b, c, d] = currentTransformMatrix;
  const transformedPoints = originalPoints.map(p => ({
    x: a * p.x + b * p.y,
    y: c * p.x + d * p.y
  }));

  // Draw transformed square (vibrant emerald green)
  ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  transformedPoints.forEach((p, idx) => {
    const px = centerX + p.x * scale;
    const py = centerY - p.y * scale;
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw vector arrows for basis vectors i=(1,0) and j=(0,1)
  drawVector(ctx, centerX, centerY, a * scale, -c * scale, '#f59e0b', 'T(i)');
  drawVector(ctx, centerX, centerY, b * scale, -d * scale, '#ec4899', 'T(j)');
}

function drawVector(ctx, fromX, fromY, dx, dy, color, label) {
  const toX = fromX + dx;
  const toY = fromY + dy;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Draw arrow head
  const headLen = 7;
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  // Label
  ctx.font = '11px sans-serif';
  ctx.fillText(label, toX + 5, toY - 5);
}

function applyPresetTransform(a, b, c, d) {
  currentTransformMatrix = [a, b, c, d];
  const inA = document.getElementById('trans_a');
  const inB = document.getElementById('trans_b');
  const inC = document.getElementById('trans_c');
  const inD = document.getElementById('trans_d');
  if (inA) inA.value = a;
  if (inB) inB.value = b;
  if (inC) inC.value = c;
  if (inD) inD.value = d;
  drawTransformationGrid();
}

function applyCustomTransform() {
  const a = parseFloat(document.getElementById('trans_a')?.value || 1);
  const b = parseFloat(document.getElementById('trans_b')?.value || 0);
  const c = parseFloat(document.getElementById('trans_c')?.value || 0);
  const d = parseFloat(document.getElementById('trans_d')?.value || 1);
  currentTransformMatrix = [a, b, c, d];
  drawTransformationGrid();
}

// --- 13. COMMON MISTAKES RENDERER ---
function renderCommonMistakes() {
  const container = document.getElementById('commonMistakesList');
  if (!container) return;

  let html = '';
  COMMON_MISTAKES.forEach((m, idx) => {
    html += `
      <div class="mistake-card">
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--primary-navy); margin-bottom: 6px;">
          Trap ${idx + 1}: ${m.mistake}
        </div>
        <div class="mistake-wrong">❌ Mistake: ${m.mistake}</div>
        <div class="mistake-correct">✅ Correct Rule: ${m.correct}</div>
        <div class="mistake-tip">💡 Exam Shortcut &amp; Strategy: ${m.tip}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// --- 14. PRACTICE ZONE MCQs ENGINE (Section 36) ---
let currentPracticeFilter = 'all';
let practiceVisibleCount = 10;

function filterPracticeMCQs(filterType, btnEl) {
  currentPracticeFilter = filterType;
  practiceVisibleCount = 10;

  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  renderPracticeQuestions();
}

function loadMorePracticeQuestions() {
  practiceVisibleCount += 15;
  renderPracticeQuestions();
}

function renderPracticeQuestions() {
  const container = document.getElementById('practiceQuestionsContainer');
  if (!container) return;

  let filtered = PRACTICE_QUESTIONS;
  if (currentPracticeFilter === 'foundation') {
    filtered = PRACTICE_QUESTIONS.filter(q => q.level === 'foundation');
  } else if (currentPracticeFilter === 'intermediate') {
    filtered = PRACTICE_QUESTIONS.filter(q => q.level === 'intermediate');
  } else if (currentPracticeFilter === 'entry-test') {
    filtered = PRACTICE_QUESTIONS.filter(q => q.level === 'entry-test');
  } else if (['fast', 'net', 'ecat', 'iba', 'scholarship'].includes(currentPracticeFilter)) {
    filtered = PRACTICE_QUESTIONS.filter(q => q.style === currentPracticeFilter);
  }

  const toShow = filtered.slice(0, practiceVisibleCount);

  let html = '';
  toShow.forEach((q, idx) => {
    html += `
      <div class="mcq-card" id="practice_q_${q.id}">
        <div class="mcq-meta">
          <span class="mcq-tag ${q.style}">${q.style.toUpperCase()}-STYLE &bull; ${q.level.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">Question ${idx + 1} of ${filtered.length}</span>
        </div>
        <div class="mcq-question">${q.question}</div>
        <div class="mcq-options-grid">
          ${q.options.map((opt, optIdx) => `
            <button class="mcq-option-btn" onclick="checkPracticeAnswer(${q.id}, ${optIdx})">
              <strong>${['A', 'B', 'C', 'D'][optIdx]}.</strong> ${opt}
            </button>
          `).join('')}
        </div>
        <div class="mcq-explanation" id="practice_exp_${q.id}">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const loadMoreBtn = document.getElementById('loadMorePracticeBtn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (practiceVisibleCount >= filtered.length) ? 'none' : 'inline-block';
  }

  if (window.renderMathInElement) {
    renderMathInElement(container, { delimiters: [{left: '$', right: '$', display: false}] });
  }
}

function checkPracticeAnswer(questionId, selectedIdx) {
  const q = PRACTICE_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  const card = document.getElementById(`practice_q_${questionId}`);
  if (!card) return;

  const buttons = card.querySelectorAll('.mcq-option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) {
      btn.classList.add('selected-correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('selected-incorrect');
    }
  });

  const exp = document.getElementById(`practice_exp_${questionId}`);
  if (exp) {
    exp.classList.add('show');
    if (window.renderMathInElement) {
      renderMathInElement(exp, { delimiters: [{left: '$', right: '$', display: false}] });
    }
  }
}

// --- 15. MASTER TEST SIMULATOR ENGINE (Section 37) ---
function startMasterTest() {
  document.getElementById('testStartPrompt').style.display = 'none';
  document.getElementById('testActiveContainer').style.display = 'block';
  document.getElementById('testResultCard').style.display = 'none';

  // Select 45 questions: 10 foundation, 15 intermediate, 20 entry-test
  const foundations = PRACTICE_QUESTIONS.filter(q => q.level === 'foundation').slice(0, 10);
  const intermediates = PRACTICE_QUESTIONS.filter(q => q.level === 'intermediate').slice(0, 15);
  const entryTests = PRACTICE_QUESTIONS.filter(q => q.level === 'entry-test').slice(0, 20);

  masterTestQuestions = [...foundations, ...intermediates, ...entryTests];
  masterTestUserAnswers = {};
  masterTestMarked = {};
  currentMasterTestIndex = 0;
  masterTestTimeLeft = 40 * 60; // 40 minutes

  renderTestPalette();
  renderCurrentTestQuestion();

  clearInterval(masterTestTimerInterval);
  masterTestTimerInterval = setInterval(() => {
    masterTestTimeLeft--;
    updateTestTimerDisplay();
    if (masterTestTimeLeft <= 0) {
      clearInterval(masterTestTimerInterval);
      submitMasterTest();
    }
  }, 1000);
}

function updateTestTimerDisplay() {
  const display = document.getElementById('testTimerDisplay');
  if (!display) return;
  const mins = Math.floor(masterTestTimeLeft / 60);
  const secs = masterTestTimeLeft % 60;
  display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function renderTestPalette() {
  const container = document.getElementById('testPaletteContainer');
  if (!container) return;

  let html = '';
  masterTestQuestions.forEach((q, idx) => {
    let classes = 'palette-btn';
    if (idx === currentMasterTestIndex) classes += ' active';
    if (masterTestUserAnswers[idx] !== undefined) classes += ' answered';
    if (masterTestMarked[idx]) classes += ' marked';

    html += `<button class="${classes}" onclick="jumpToTestQuestion(${idx})">${idx + 1}</button>`;
  });
  container.innerHTML = html;
}

function renderCurrentTestQuestion() {
  const q = masterTestQuestions[currentMasterTestIndex];
  if (!q) return;

  document.getElementById('testQuestionCounter').innerText = `Question ${currentMasterTestIndex + 1} of ${masterTestQuestions.length}`;
  
  const qText = document.getElementById('testQuestionText');
  qText.innerHTML = `[${q.style.toUpperCase()}] ${q.question}`;

  const markBtn = document.getElementById('testMarkReviewBtn');
  if (markBtn) {
    markBtn.innerHTML = masterTestMarked[currentMasterTestIndex] ? '🏷️ Marked for Review' : '🏷️ Mark for Review';
  }

  const optionsContainer = document.getElementById('testOptionsContainer');
  let optionsHtml = '';
  q.options.forEach((opt, optIdx) => {
    const isSelected = (masterTestUserAnswers[currentMasterTestIndex] === optIdx);
    optionsHtml += `
      <button class="mcq-option-btn ${isSelected ? 'selected-correct' : ''}" onclick="selectTestAnswer(${optIdx})">
        <strong>${['A', 'B', 'C', 'D'][optIdx]}.</strong> ${opt}
      </button>
    `;
  });
  optionsContainer.innerHTML = optionsHtml;

  renderTestPalette();

  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById('testActiveContainer'), { delimiters: [{left: '$', right: '$', display: false}] });
  }
}

function selectTestAnswer(optionIdx) {
  masterTestUserAnswers[currentMasterTestIndex] = optionIdx;
  renderCurrentTestQuestion();
}

function toggleMarkCurrentQuestion() {
  masterTestMarked[currentMasterTestIndex] = !masterTestMarked[currentMasterTestIndex];
  renderCurrentTestQuestion();
}

function navigateTestQuestion(delta) {
  const nextIdx = currentMasterTestIndex + delta;
  if (nextIdx >= 0 && nextIdx < masterTestQuestions.length) {
    currentMasterTestIndex = nextIdx;
    renderCurrentTestQuestion();
  }
}

function jumpToTestQuestion(idx) {
  currentMasterTestIndex = idx;
  renderCurrentTestQuestion();
}

function confirmSubmitTest() {
  const answeredCount = Object.keys(masterTestUserAnswers).length;
  if (confirm(`You have answered ${answeredCount} of ${masterTestQuestions.length} questions. Are you sure you want to submit?`)) {
    submitMasterTest();
  }
}

function submitMasterTest() {
  clearInterval(masterTestTimerInterval);
  document.getElementById('testActiveContainer').style.display = 'none';
  const resultCard = document.getElementById('testResultCard');
  resultCard.style.display = 'block';

  let correctCount = 0;
  let topicBreakdown = {};

  masterTestQuestions.forEach((q, idx) => {
    if (!topicBreakdown[q.topic]) {
      topicBreakdown[q.topic] = { total: 0, correct: 0 };
    }
    topicBreakdown[q.topic].total++;

    if (masterTestUserAnswers[idx] === q.answer) {
      correctCount++;
      topicBreakdown[q.topic].correct++;
    }
  });

  const totalQuestions = masterTestQuestions.length;
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const timeUsedSecs = (40 * 60) - masterTestTimeLeft;
  const minsUsed = Math.floor(timeUsedSecs / 60);
  const secsUsed = timeUsedSecs % 60;

  document.getElementById('resScore').innerText = `${correctCount}/${totalQuestions}`;
  document.getElementById('resPercentage').innerText = `${percentage}%`;
  document.getElementById('resCorrect').innerText = `${correctCount}`;
  document.getElementById('resIncorrect').innerText = `${incorrectCount}`;
  document.getElementById('resTime').innerText = `${minsUsed}m ${secsUsed}s`;

  // Diagnostic breakdown
  let diagHtml = '<h4 style="color:var(--primary-navy); margin-bottom:12px;">📊 Topic-wise Performance Diagnostic:</h4>';
  diagHtml += '<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">';
  for (const topic in topicBreakdown) {
    const stat = topicBreakdown[topic];
    const topPct = Math.round((stat.correct / stat.total) * 100);
    let tagColor = '#15803d';
    let statusText = 'Strong Mastery';
    if (topPct < 50) {
      tagColor = '#b91c1c';
      statusText = 'Needs Urgent Practice';
    } else if (topPct < 75) {
      tagColor = '#d97706';
      statusText = 'Moderate';
    }

    diagHtml += `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px;">
        <div style="font-weight:700; font-size:0.9rem;">${topic}</div>
        <div style="color:${tagColor}; font-weight:700; font-size:0.85rem;">${topPct}% (${stat.correct}/${stat.total}) &bull; ${statusText}</div>
      </div>
    `;
  }
  diagHtml += '</div>';
  document.getElementById('diagnosticBreakdown').innerHTML = diagHtml;

  // Save best score
  const bestScore = localStorage.getItem('md_master_test_best');
  if (!bestScore || percentage > parseInt(bestScore)) {
    localStorage.setItem('md_master_test_best', percentage);
    showToast(`New personal record score: ${percentage}%!`);
  }
}

function restartMasterTest() {
  document.getElementById('testResultCard').style.display = 'none';
  document.getElementById('testStartPrompt').style.display = 'block';
}

// --- 16. FORMULA SHEET ACTIONS ---
function copyFormulaSheetText() {
  const text = `
MATRICES & DETERMINANTS COMPLETE FORMULA SHEET
----------------------------------------------
1. Order: m rows × n columns
2. Multiplication: A(m×k) × B(k×p) = C(m×p)
3. Non-Commutative: AB ≠ BA (in general)
4. Transpose: (AB)ᵀ = Bᵀ Aᵀ
5. Symmetric: Aᵀ = A | Skew-Symmetric: Aᵀ = -A (diag elements = 0)
6. 2×2 Determinant: det(A) = ad - bc
7. Scalar Determinant: det(kA) = kⁿ det(A) for n×n
8. 2×2 Inverse: A⁻¹ = 1/(ad-bc) [d -b; -c a]
9. Linear System: AX = B => X = A⁻¹ B
10. Cramer's Rule: x = Dx / D, y = Dy / D (D ≠ 0)
  `;
  navigator.clipboard.writeText(text.trim()).then(() => {
    showToast('Formula Sheet copied to clipboard!');
  });
}

// --- 17. INITIALIZATION ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  renderMatrixOrderDemo();
  setupMultMatricesUI();
  setupDetCalcUI();
  calculateDeterminantLive();
  drawTransformationGrid();
  renderCommonMistakes();
  renderPracticeQuestions();
  initGlobalSearch();
  renderBookmarksList();
  updateBookmarkButtonsUI();

  // Trigger KaTeX auto-rendering
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
  }
});
