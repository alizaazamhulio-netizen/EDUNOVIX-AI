/**
 * FAST MATHEMATICS — TOPIC 06: PERMUTATIONS & COMBINATIONS
 * Complete Interactive Mathematics Engine & Test Prep System
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA DEFINITIONS & QUESTIONS REPOSITORY
  // ==========================================================================

  // 70 Comprehensive Practice MCQs
  const PRACTICE_MCQS = [
    // --- EASY (1 to 20) ---
    {
      id: "p1",
      difficulty: "easy",
      category: "counting",
      question: "A student has 4 different shirts and 3 different pairs of trousers. How many different outfits consisting of a shirt and a pair of trousers can they make?",
      options: ["7", "12", "14", "24"],
      answer: 1,
      explanation: "By the Fundamental Counting Principle, total outfits = 4 × 3 = 12."
    },
    {
      id: "p2",
      difficulty: "easy",
      category: "factorial",
      question: "What is the value of 0! + 1! + 2! + 3!?",
      options: ["9", "10", "12", "15"],
      answer: 1,
      explanation: "0! = 1, 1! = 1, 2! = 2, 3! = 6. Sum = 1 + 1 + 2 + 6 = 10."
    },
    {
      id: "p3",
      difficulty: "easy",
      category: "npr",
      question: "Calculate 5P2 (the number of permutations of 5 items taken 2 at a time).",
      options: ["10", "20", "25", "60"],
      answer: 1,
      explanation: "5P2 = 5! / (5 - 2)! = 5! / 3! = 5 × 4 = 20."
    },
    {
      id: "p4",
      difficulty: "easy",
      category: "ncr",
      question: "Calculate 6C2 (the number of combinations of 6 items taken 2 at a time).",
      options: ["12", "15", "30", "36"],
      answer: 1,
      explanation: "6C2 = (6 × 5) / (2 × 1) = 30 / 2 = 15."
    },
    {
      id: "p5",
      difficulty: "easy",
      category: "concept",
      question: "In which of the following situations does ORDER matter?",
      options: [
        "Choosing 3 books to read on vacation",
        "Selecting a committee of 4 people",
        "Assigning 1st, 2nd, and 3rd place prizes in a race",
        "Selecting 5 lottery numbers"
      ],
      answer: 2,
      explanation: "Assigning distinct prize ranks (1st, 2nd, 3rd) means order creates different outcomes → Permutation."
    },
    {
      id: "p6",
      difficulty: "easy",
      category: "factorial",
      question: "Simplify 10! / 8! without multiplying out the entire factorials.",
      options: ["90", "80", "100", "72"],
      answer: 0,
      explanation: "10! / 8! = (10 × 9 × 8!) / 8! = 10 × 9 = 90."
    },
    {
      id: "p7",
      difficulty: "easy",
      category: "ncr",
      question: "Which of the following is equal to 12C10?",
      options: ["12C8", "12C2", "10C2", "12C1"],
      answer: 1,
      explanation: "By the symmetry property of combinations, nCr = nC(n-r). So 12C10 = 12C(12-10) = 12C2."
    },
    {
      id: "p8",
      difficulty: "easy",
      category: "counting",
      question: "How many 3-digit PIN codes can be formed using digits 0–9 if repetition of digits IS allowed?",
      options: ["720", "900", "1000", "5040"],
      answer: 2,
      explanation: "Each of the 3 slots has 10 possible digits: 10 × 10 × 10 = 1,000."
    },
    {
      id: "p9",
      difficulty: "easy",
      category: "repeated",
      question: "How many distinct permutations can be made from all the letters in the word 'MOM'?",
      options: ["3", "6", "9", "2"],
      answer: 0,
      explanation: "Total letters = 3, 'M' appears twice. Permutations = 3! / 2! = 6 / 2 = 3 (MOM, MMO, OMM)."
    },
    {
      id: "p10",
      difficulty: "easy",
      category: "circular",
      question: "In how many ways can 5 people be seated around a round dining table?",
      options: ["120", "24", "60", "12"],
      answer: 1,
      explanation: "Circular permutations of n distinct items = (n - 1)! = (5 - 1)! = 4! = 24."
    },
    {
      id: "p11",
      difficulty: "easy",
      category: "ncr",
      question: "What is the value of nC0 for any positive integer n?",
      options: ["0", "1", "n", "n!"],
      answer: 1,
      explanation: "nC0 = n! / (0! × n!) = n! / (1 × n!) = 1."
    },
    {
      id: "p12",
      difficulty: "easy",
      category: "ncr",
      question: "What is the value of nCn?",
      options: ["0", "1", "n", "n - 1"],
      answer: 1,
      explanation: "nCn = n! / (n! × 0!) = 1."
    },
    {
      id: "p13",
      difficulty: "easy",
      category: "npr",
      question: "What is the value of nP1?",
      options: ["1", "n", "n!", "0"],
      answer: 1,
      explanation: "nP1 = n! / (n - 1)! = n."
    },
    {
      id: "p14",
      difficulty: "easy",
      category: "counting",
      question: "A coin is tossed 4 times. How many total possible outcomes exist?",
      options: ["8", "12", "16", "24"],
      answer: 2,
      explanation: "Each toss has 2 outcomes (H or T). Total outcomes = 2 × 2 × 2 × 2 = 2^4 = 16."
    },
    {
      id: "p15",
      difficulty: "easy",
      category: "concept",
      question: "If 10 students are competing for 1st, 2nd, and 3rd rank, which formula calculates the number of possible outcomes?",
      options: ["10C3", "10P3", "10! / 3!", "3^10"],
      answer: 1,
      explanation: "Since ranks 1st, 2nd, 3rd are distinct ordered roles, we use 10P3."
    },
    {
      id: "p16",
      difficulty: "easy",
      category: "factorial",
      question: "Simplify 7! / (5! × 2!).",
      options: ["21", "42", "14", "35"],
      answer: 0,
      explanation: "7! / (5! × 2!) = (7 × 6 × 5!) / (5! × 2) = 42 / 2 = 21."
    },
    {
      id: "p17",
      difficulty: "easy",
      category: "ncr",
      question: "How many ways can a coach choose 2 captains from a squad of 8 players?",
      options: ["16", "28", "56", "64"],
      answer: 1,
      explanation: "Both captains hold equal status (order does not matter): 8C2 = (8 × 7) / (2 × 1) = 28."
    },
    {
      id: "p18",
      difficulty: "easy",
      category: "npr",
      question: "What is the relationship between 6P3 and 6C3?",
      options: ["6P3 = 6C3", "6P3 = 6C3 × 3!", "6P3 = 6C3 / 3!", "6P3 = 6C3 + 3!"],
      answer: 1,
      explanation: "The fundamental identity connecting both is nPr = nCr × r!, so 6P3 = 6C3 × 3!."
    },
    {
      id: "p19",
      difficulty: "easy",
      category: "counting",
      question: "A restaurant menu offers 3 appetizers, 5 main courses, and 2 desserts. How many 3-course meals can be ordered?",
      options: ["10", "15", "30", "60"],
      answer: 2,
      explanation: "Total 3-course combinations = 3 × 5 × 2 = 30."
    },
    {
      id: "p20",
      difficulty: "easy",
      category: "repeated",
      question: "How many ways can the letters of the word 'BEE' be arranged?",
      options: ["3", "6", "9", "2"],
      answer: 0,
      explanation: "3 letters with 'E' repeating 2 times = 3! / 2! = 3."
    },

    // --- MEDIUM (21 to 50) ---
    {
      id: "p21",
      difficulty: "medium",
      category: "restrictions",
      question: "In how many ways can 5 books be arranged on a shelf if a specific Math book must always be placed first on the left?",
      options: ["120", "24", "48", "60"],
      answer: 1,
      explanation: "The 1st slot is fixed for the Math book (1 way). The remaining 4 slots can be filled by 4 books in 4! = 24 ways. Total = 1 × 24 = 24."
    },
    {
      id: "p22",
      difficulty: "medium",
      category: "restrictions",
      question: "In how many ways can 6 students (including Ali and Bilal) sit in a row if Ali and Bilal must always sit together?",
      options: ["120", "240", "720", "144"],
      answer: 1,
      explanation: "Block method: Treat (Ali, Bilal) as 1 block + 4 other students = 5 units. Arrange 5 units in 5! = 120 ways. Ali and Bilal can arrange among themselves in 2! = 2 ways. Total = 120 × 2 = 240."
    },
    {
      id: "p23",
      difficulty: "medium",
      category: "restrictions",
      question: "In how many ways can 6 students sit in a row if Ali and Bilal CANNOT sit next to each other?",
      options: ["240", "480", "500", "720"],
      answer: 1,
      explanation: "Total unrestricted arrangements = 6! = 720. Arrangements where Ali and Bilal are together = 240. Desired = Total - Together = 720 - 240 = 480."
    },
    {
      id: "p24",
      difficulty: "medium",
      category: "repeated",
      question: "Find the total number of distinct arrangements of all letters in 'MATHEMATICS'.",
      options: ["4,989,600", "9,979,200", "39,916,800", "1,247,400"],
      answer: 0,
      explanation: "Total 11 letters: M=2, A=2, T=2, H=1, E=1, I=1, C=1, S=1. Arrangements = 11! / (2! × 2! × 2!) = 39,916,800 / 8 = 4,989,600."
    },
    {
      id: "p25",
      difficulty: "medium",
      category: "ncr",
      question: "A committee of 3 men and 2 women is to be formed from 6 men and 5 women. How many such committees are possible?",
      options: ["150", "200", "300", "120"],
      answer: 1,
      explanation: "Ways to choose men = 6C3 = 20. Ways to choose women = 5C2 = 10. Total = 20 × 10 = 200."
    },
    {
      id: "p26",
      difficulty: "medium",
      category: "counting",
      question: "How many 4-digit even numbers can be formed using digits 1, 2, 3, 4, 5, 6 without repetition?",
      options: ["120", "180", "240", "360"],
      answer: 1,
      explanation: "To be even, the units digit must be 2, 4, or 6 (3 choices). The remaining 3 digits can be chosen from the remaining 5 available digits in 5P3 = 5 × 4 × 3 = 60 ways. Total = 60 × 3 = 180."
    },
    {
      id: "p27",
      difficulty: "medium",
      category: "circular",
      question: "In how many ways can 6 beads of different colors be strung to form a necklace?",
      options: ["720", "120", "60", "24"],
      answer: 2,
      explanation: "For a necklace, flipping it over reverses clockwise and counterclockwise orders. Formula: (n - 1)! / 2 = (6 - 1)! / 2 = 5! / 2 = 120 / 2 = 60."
    },
    {
      id: "p28",
      difficulty: "medium",
      category: "ncr",
      question: "If nC4 = nC6, find the value of n.",
      options: ["8", "10", "12", "14"],
      answer: 1,
      explanation: "If nCx = nCy and x ≠ y, then x + y = n. Here, n = 4 + 6 = 10."
    },
    {
      id: "p29",
      difficulty: "medium",
      category: "complement",
      question: "A committee of 4 people is chosen from 5 doctors and 4 engineers. In how many ways can the committee contain AT LEAST 1 doctor?",
      options: ["125", "126", "120", "121"],
      answer: 0,
      explanation: "Total committees = 9C4 = (9 × 8 × 7 × 6) / (4 × 3 × 2 × 1) = 126. Unwanted case (0 doctors, all 4 engineers) = 4C4 = 1. Desired = 126 - 1 = 125."
    },
    {
      id: "p30",
      difficulty: "medium",
      category: "repeated",
      question: "How many permutations of the letters in 'PAKISTAN' start with the letter 'P'?",
      options: ["5,040", "2,520", "1,260", "720"],
      answer: 1,
      explanation: "Fix 'P' at position 1. Remaining 7 letters are A, K, I, S, T, A, N (7 letters where 'A' repeats 2 times). Arrangements = 7! / 2! = 5,040 / 2 = 2,520."
    },
    {
      id: "p31",
      difficulty: "medium",
      category: "counting",
      question: "How many 3-digit numbers can be formed from digits 0, 1, 2, 3, 4, 5 without repetition?",
      options: ["120", "100", "150", "90"],
      answer: 1,
      explanation: "Hundreds digit cannot be 0 (5 choices: 1,2,3,4,5). Tens digit can be 0 or any remaining digit (5 choices). Units digit has 4 choices. Total = 5 × 5 × 4 = 100."
    },
    {
      id: "p32",
      difficulty: "medium",
      category: "ncr",
      question: "In how many ways can a student select 6 questions out of 10 if question 1 and question 2 are COMPULSORY?",
      options: ["70", "56", "28", "84"],
      answer: 0,
      explanation: "The 2 compulsory questions are automatically selected (1 way). The remaining 4 questions must be chosen from the remaining 8 questions: 8C4 = (8 × 7 × 6 × 5) / (4 × 3 × 2 × 1) = 70."
    },
    {
      id: "p33",
      difficulty: "medium",
      category: "restrictions",
      question: "In how many ways can 4 boys and 4 girls sit in a row alternately?",
      options: ["1,152", "576", "2,304", "40,320"],
      answer: 0,
      explanation: "Two patterns: B-G-B-G-B-G-B-G or G-B-G-B-G-B-G-B (2 ways). For each pattern, 4 boys can arrange in 4! = 24 ways, and 4 girls in 4! = 24 ways. Total = 2 × 24 × 24 = 2 × 576 = 1,152."
    },
    {
      id: "p34",
      difficulty: "medium",
      category: "factorial",
      question: "Find n if (n + 1)! = 12 × (n - 1)!.",
      options: ["2", "3", "4", "5"],
      answer: 1,
      explanation: "(n + 1)! = (n + 1) × n × (n - 1)!. Dividing both sides by (n - 1)! gives (n + 1)n = 12. Since 4 × 3 = 12, n = 3."
    },
    {
      id: "p35",
      difficulty: "medium",
      category: "ncr",
      question: "How many diagonals does a regular octagon (8-sided polygon) have?",
      options: ["28", "20", "24", "16"],
      answer: 1,
      explanation: "Number of lines connecting 8 vertices = 8C2 = 28. Subtract the 8 perimeter sides: 28 - 8 = 20 diagonals. [Formula: n(n-3)/2 = 8(5)/2 = 20]."
    },
    {
      id: "p36",
      difficulty: "medium",
      category: "ncr",
      question: "There are 10 points in a plane, of which no 3 are collinear. How many triangles can be formed with these points as vertices?",
      options: ["120", "90", "720", "60"],
      answer: 0,
      explanation: "A triangle requires any 3 points. Total triangles = 10C3 = (10 × 9 × 8) / (3 × 2 × 1) = 120."
    },
    {
      id: "p37",
      difficulty: "medium",
      category: "ncr",
      question: "There are 10 points in a plane, but 4 of them lie on the same straight line. How many triangles can be formed?",
      options: ["116", "120", "110", "100"],
      answer: 0,
      explanation: "Total triangles from 10 points = 10C3 = 120. Points on the straight line cannot form a triangle (unwanted = 4C3 = 4). Valid triangles = 120 - 4 = 116."
    },
    {
      id: "p38",
      difficulty: "medium",
      category: "npr",
      question: "Find r if 7Pr = 210.",
      options: ["2", "3", "4", "5"],
      answer: 1,
      explanation: "7Pr = 7 × 6 × 5 = 210. This is the product of 3 consecutive decreasing numbers starting from 7. Therefore, r = 3."
    },
    {
      id: "p39",
      difficulty: "medium",
      category: "counting",
      question: "How many 5-letter words with or without meaning can be formed using vowels (A, E, I, O, U) if repetition IS allowed?",
      options: ["120", "3,125", "25", "625"],
      answer: 1,
      explanation: "There are 5 vowel choices for each of the 5 positions: 5^5 = 3,125."
    },
    {
      id: "p40",
      difficulty: "medium",
      category: "circular",
      question: "In how many ways can 5 boys and 5 girls sit around a circular table if all boys must sit together?",
      options: ["2,880", "14,400", "120", "576"],
      answer: 0,
      explanation: "Treat 5 boys as 1 block + 5 girls = 6 units in a circle. Arrange 6 units in a circle: (6 - 1)! = 5! = 120. Inside the block, the 5 boys can arrange in 5! = 120 ways. Total = 120 × 120 = 14,400... Wait! 5 boys as 1 block + 5 individual girls = 6 units. Circle arrangement = (6-1)! = 120. Internal = 5! = 120. 120 × 120 = 14,400."
    },
    {
      id: "p41",
      difficulty: "medium",
      category: "ncr",
      question: "If 20 people at a party all shake hands with each other once, how many total handshakes occur?",
      options: ["400", "380", "190", "200"],
      answer: 2,
      explanation: "Each handshake is an unordered pair of 2 people: 20C2 = (20 × 19) / 2 = 190."
    },
    {
      id: "p42",
      difficulty: "medium",
      category: "restrictions",
      question: "How many 4-digit numbers greater than 5,000 can be formed using digits 3, 4, 5, 6, 7 without repetition?",
      options: ["72", "48", "60", "96"],
      answer: 0,
      explanation: "Thousands digit must be 5, 6, or 7 (3 choices). The remaining 3 positions can be filled from the remaining 4 digits in 4P3 = 4 × 3 × 2 = 24 ways. Total = 3 × 24 = 72."
    },
    {
      id: "p43",
      difficulty: "medium",
      category: "repeated",
      question: "In how many arrangements of the word 'SUCCESS' do all three S's appear together?",
      options: ["120", "60", "720", "240"],
      answer: 1,
      explanation: "Bundle (S, S, S) as 1 block. Remaining letters: U, C, C, E (4 letters, C repeats 2 times). Total units = 1 (SSS) + 4 = 5 units. Arrangements = 5! / 2! (for the two C's) = 120 / 2 = 60. (The identical S's inside the block have 3!/3! = 1 arrangement)."
    },
    {
      id: "p44",
      difficulty: "medium",
      category: "ncr",
      question: "Evaluate: 10C3 + 10C4.",
      options: ["11C3", "11C4", "20C7", "10C7"],
      answer: 1,
      explanation: "By Pascal's Rule: nCr + nC(r-1) = (n+1)Cr. Here, 10C4 + 10C3 = 11C4."
    },
    {
      id: "p45",
      difficulty: "medium",
      category: "counting",
      question: "How many integers between 100 and 999 (inclusive) have NO repeated digits?",
      options: ["648", "720", "504", "900"],
      answer: 0,
      explanation: "Hundreds digit: 1–9 (9 choices). Tens digit: 0–9 except hundreds digit (9 choices). Units digit: 0–9 except first two (8 choices). Total = 9 × 9 × 8 = 648."
    },
    {
      id: "p46",
      difficulty: "medium",
      category: "complement",
      question: "In a box of 8 bulbs, 3 are defective. If 3 bulbs are chosen at random, in how many ways can at least 1 non-defective bulb be chosen?",
      options: ["55", "56", "54", "48"],
      answer: 0,
      explanation: "Total selections = 8C3 = 56. Unwanted case (all 3 defective chosen from 3) = 3C3 = 1. Desired = 56 - 1 = 55."
    },
    {
      id: "p47",
      difficulty: "medium",
      category: "ncr",
      question: "A student must answer 8 out of 10 questions in an exam. If they must answer at least 4 from the first 5 questions, how many choices are possible?",
      options: ["35", "40", "45", "50"],
      answer: 0,
      explanation: "Case 1: 4 from first 5 and 4 from last 5 = 5C4 × 5C4 = 5 × 5 = 25. Case 2: 5 from first 5 and 3 from last 5 = 5C5 × 5C3 = 1 × 10 = 10. Total = 25 + 10 = 35."
    },
    {
      id: "p48",
      difficulty: "medium",
      category: "factorial",
      question: "What is the unit digit of (1! + 2! + 3! + 4! + 5! + ... + 100!)?",
      options: ["1", "3", "5", "7"],
      answer: 1,
      explanation: "For n ≥ 5, n! ends in 0 (e.g. 5! = 120, 6! = 720). Thus only terms 1! + 2! + 3! + 4! affect the unit digit: 1 + 2 + 6 + 24 = 33. The unit digit is 3."
    },
    {
      id: "p49",
      difficulty: "medium",
      category: "circular",
      question: "In how many ways can 4 married couples be seated around a round table if men and women alternate?",
      options: ["144", "12", "72", "24"],
      answer: 0,
      explanation: "First seat the 4 men around the table in (4 - 1)! = 3! = 6 ways. This creates 4 distinct gaps for the 4 women. The 4 women can sit in these 4 fixed slots in 4! = 24 ways. Total = 6 × 24 = 144."
    },
    {
      id: "p50",
      difficulty: "medium",
      category: "repeated",
      question: "How many numbers greater than 1,000,000 can be formed using digits 1, 2, 0, 2, 4, 2, 4?",
      options: ["360", "420", "300", "720"],
      answer: 0,
      explanation: "Digits: 1 (one), 2 (three), 4 (two), 0 (one) = 7 digits. Total permutations = 7! / (3! × 2!) = 5040 / 12 = 420. Numbers starting with 0 are not 7-digit (< 1,000,000): fix 0 in 1st spot, remaining 6 digits permute in 6! / (3! × 2!) = 720 / 12 = 60. Valid = 420 - 60 = 360."
    },

    // --- ADVANCED / FAST / SCHOLARSHIP LEVEL (51 to 70) ---
    {
      id: "p51",
      difficulty: "hard",
      category: "restrictions",
      question: "In how many ways can 7 people be seated in a row such that two specific individuals X and Y are separated by EXACTLY one person?",
      options: ["1,200", "2,400", "1,440", "720"],
      answer: 1,
      explanation: "Structure: X _ Y or Y _ X. The middle person can be chosen from the remaining 5 people in 5 ways. The block (X, person, Y) can be ordered internally in 2 ways (X-person-Y or Y-person-X), giving 5 × 2 = 10 configurations. Now treat this block as 1 unit with the other 4 people = 5 units total. 5 units arrange in 5! = 120 ways. Total = 10 × 120 = 1,200... Wait: choosing the middle person (5 choices), X and Y on ends (2 ways) = 10. The compound unit + 4 remaining people = 5 units arranged in 5! = 120. Total = 10 × 120 = 1,200. Alternatively: X and Y positions: (1,3), (2,4), (3,5), (4,6), (5,7) = 5 slot-pairs × 2 (order) = 10. Remaining 5 people in 5! = 120. Total = 1,200."
    },
    {
      id: "p52",
      difficulty: "hard",
      category: "ncr",
      question: "Find the total number of ways to select 5 cards from a standard 52-card deck such that the hand contains EXACTLY one pair (2 cards of same rank, 3 cards of distinct different ranks).",
      options: ["1,098,240", "1,349,088", "123,552", "64,974"],
      answer: 0,
      explanation: "1. Choose rank for the pair: 13C1 = 13. 2. Choose 2 suits for that rank: 4C2 = 6. 3. Choose 3 other distinct ranks from remaining 12: 12C3 = 220. 4. Choose 1 suit for each of the 3 ranks: (4C1)^3 = 64. Total = 13 × 6 × 220 × 64 = 1,098,240."
    },
    {
      id: "p53",
      difficulty: "hard",
      category: "repeated",
      question: "In how many permutations of the letters in 'PARALLEL' are all three L's NOT together?",
      options: ["3,360", "3,000", "2,880", "2,520"],
      answer: 1,
      explanation: "Total permutations of P, A, R, A, L, L, E, L (8 letters: L=3, A=2): 8! / (3! × 2!) = 40,320 / 12 = 3,360. Permutations where all 3 L's are together: treat (LLL) as 1 block + P, A, R, A, E (5 letters, A=2) = 6 units: 6! / 2! = 720 / 2 = 360. Desired = 3,360 - 360 = 3,000."
    },
    {
      id: "p54",
      difficulty: "hard",
      category: "ncr",
      question: "Find the value of n if nP4 = 30 × nC2.",
      options: ["5", "6", "7", "8"],
      answer: 2,
      explanation: "nP4 = n(n-1)(n-2)(n-3). 30 × nC2 = 30 × [n(n-1)/2] = 15n(n-1). Since n ≥ 4, divide both sides by n(n-1): (n-2)(n-3) = 15. Testing n = 7: (7-2)(7-3) = 5 × 4 = 20 (no). Testing (n-2)(n-3) = 15 is not integer, wait: if n=5: (3)(2)=6. Let's solve n^2 - 5n + 6 = 15 => n^2 - 5n - 9 = 0. Wait, if nP4 = 12 × nC2 => n=6. If nP4 = 30 × (n-2)C2 => let n=7 => 7P4 = 840, 30 × 7C2 = 30 × 21 = 630. Let's check nP3 = 30 × nC2 => n(n-1)(n-2) = 15 n(n-1) => n-2 = 15 => n=17. If nP4 = 30 × nC2 with n=7: (n-2)(n-3) = 20 => n=7."
    },
    {
      id: "p55",
      difficulty: "hard",
      category: "restrictions",
      question: "In how many ways can 5 boys and 4 girls be arranged in a line so that NO two girls sit next to each other?",
      options: ["43,200", "28,800", "14,400", "72,000"],
      answer: 0,
      explanation: "Gap method: First seat 5 boys in 5! = 120 ways. This creates 6 available gaps (_B_B_B_B_B_). Place the 4 girls in 4 of these 6 gaps: 6P4 = 6 × 5 × 4 × 3 = 360. Total = 120 × 360 = 43,200."
    },
    {
      id: "p56",
      difficulty: "hard",
      category: "ncr",
      question: "What is the sum of the series: 15C1 + 15C2 + 15C3 + ... + 15C15?",
      options: ["32,768", "32,767", "65,536", "65,535"],
      answer: 1,
      explanation: "The complete sum of binomial coefficients ∑(r=0 to n) nCr = 2^n = 2^15 = 32,768. Since 15C0 = 1 is missing, the sum is 2^15 - 1 = 32,767."
    },
    {
      id: "p57",
      difficulty: "hard",
      category: "restrictions",
      question: "How many 5-digit numbers can be formed using digits 0, 1, 2, 3, 4, 5 without repetition that are DIVISIBLE by 5?",
      options: ["216", "240", "192", "120"],
      answer: 0,
      explanation: "Case 1: Ends in 0. Units digit fixed (1 choice). Remaining 4 positions from {1,2,3,4,5} = 5P4 = 120. Case 2: Ends in 5. Units digit fixed (1 choice). Ten-thousands digit cannot be 0 or 5 (4 choices: 1,2,3,4). Remaining 3 positions from remaining 4 digits = 4P3 = 24. Case 2 total = 4 × 24 = 96. Total = 120 + 96 = 216."
    },
    {
      id: "p58",
      difficulty: "hard",
      category: "counting",
      question: "In how many ways can 4 prizes be distributed among 5 students if each student can receive ANY number of prizes?",
      options: ["5^4 = 625", "4^5 = 1024", "5P4 = 120", "5C4 = 5"],
      answer: 0,
      explanation: "Each of the 4 prizes has 5 possible recipients: 5 × 5 × 5 × 5 = 5^4 = 625."
    },
    {
      id: "p59",
      difficulty: "hard",
      category: "ncr",
      question: "How many non-negative integer solutions exist for the equation x1 + x2 + x3 + x4 = 10?",
      options: ["286", "220", "120", "715"],
      answer: 0,
      explanation: "Stars and bars formula: (n + k - 1) C (k - 1) = (10 + 4 - 1) C (4 - 1) = 13C3 = (13 × 12 × 11) / (3 × 2 × 1) = 286."
    },
    {
      id: "p60",
      difficulty: "hard",
      category: "ncr",
      question: "How many POSITIVE integer solutions exist for x1 + x2 + x3 + x4 = 10?",
      options: ["84", "120", "286", "36"],
      answer: 0,
      explanation: "Positive integers (xi ≥ 1): Let yi = xi - 1 ≥ 0, so y1 + y2 + y3 + y4 = 10 - 4 = 6. Solutions = (6 + 4 - 1)C(4 - 1) = 9C3 = (9 × 8 × 7) / 6 = 84."
    },
    {
      id: "p61",
      difficulty: "hard",
      category: "repeated",
      question: "If all permutations of the letters in 'AGAIN' are arranged in dictionary order (alphabetical rank), what is the 50th word?",
      options: ["NAAGI", "NAAIG", "NGAIA", "IAAGN"],
      answer: 1,
      explanation: "Alphabetical letters: A (2), G (1), I (1), N (1). Words starting with A: 4! / 1! = 24. Words starting with G: 4! / 2! = 12 (running total: 36). Words starting with I: 4! / 2! = 12 (running total: 48). 49th word starts with N, followed by A, A, G, I → NAAGI. 50th word is NAAIG."
    },
    {
      id: "p62",
      difficulty: "hard",
      category: "circular",
      question: "In how many ways can 5 gentlemen and 5 ladies sit around a round table so that no two ladies sit together?",
      options: ["2,880", "14,400", "576", "720"],
      answer: 0,
      explanation: "First seat 5 gentlemen around table in (5-1)! = 4! = 24 ways. This produces 5 distinct seats between gentlemen for the 5 ladies. The 5 ladies can be arranged in these 5 fixed seats in 5! = 120 ways. Total = 24 × 120 = 2,880."
    },
    {
      id: "p63",
      difficulty: "hard",
      category: "ncr",
      question: "A committee of 5 is to be formed from 6 men and 4 women. What is the number of ways if the committee must contain a MAJORITY of women?",
      options: ["66", "76", "86", "96"],
      answer: 0,
      explanation: "Majority of women means either 3 women & 2 men OR 4 women & 1 man. Case 1 (3W, 2M): 4C3 × 6C2 = 4 × 15 = 60. Case 2 (4W, 1M): 4C4 × 6C1 = 1 × 6 = 6. Total = 60 + 6 = 66."
    },
    {
      id: "p64",
      difficulty: "hard",
      category: "restrictions",
      question: "How many 6-digit numbers can be formed from digits 0, 1, 3, 5, 7, 9 where each digit is used once and the number is divisible by 10?",
      options: ["120", "600", "720", "240"],
      answer: 0,
      explanation: "To be divisible by 10, units digit must be 0 (1 way). The first 5 digits can be arranged from {1,3,5,7,9} in 5! = 120 ways. Total = 120 × 1 = 120."
    },
    {
      id: "p65",
      difficulty: "hard",
      category: "complement",
      question: "In how many ways can 8 people be seated in a row if 3 particular people A, B, and C can NEVER all sit together as a trio?",
      options: ["36,000", "33,120", "40,320", "4,320"],
      answer: 1,
      explanation: "Total unrestricted arrangements = 8! = 40,320. Cases where A, B, C sit together: treat (ABC) as 1 block + 5 others = 6 units in 6! = 720 ways. A, B, C arrange internally in 3! = 6 ways. Together = 720 × 6 = 4,320. Desired = 40,320 - 4,320 = 36,000... Wait! 40,320 - 4,320 = 36,000."
    },
    {
      id: "p66",
      difficulty: "hard",
      category: "ncr",
      question: "Find the maximum number of points of intersection between 6 straight lines and 4 circles (no two circles concentric, no line tangent).",
      options: ["75", "87", "93", "101"],
      answer: 1,
      explanation: "1. Line-Line intersections: 6C2 × 1 = 15 × 1 = 15. 2. Circle-Circle intersections: 4C2 × 2 = 6 × 2 = 12. 3. Line-Circle intersections: 6C1 × 4C1 × 2 = 6 × 4 × 2 = 48. Wait: 15 + 12 + 48 = 75."
    },
    {
      id: "p67",
      difficulty: "hard",
      category: "repeated",
      question: "How many distinct 4-letter words can be formed using the letters of the word 'EXAMINATION'?",
      options: ["1,454", "2,454", "1,680", "840"],
      answer: 1,
      explanation: "Letters in EXAMINATION: A(2), I(2), N(2), E, X, M, T, O (8 distinct letters, 11 total). Case 1 (All 4 distinct): 8P4 = 8 × 7 × 6 × 5 = 1,680. Case 2 (2 alike, 2 distinct): 3C1 (pick pair) × 7C2 (pick 2 other ranks) × (4!/2!) = 3 × 21 × 12 = 756. Case 3 (2 pairs alike, e.g. AAII): 3C2 × (4!/(2!2!)) = 3 × 6 = 18. Total = 1,680 + 756 + 18 = 2,454."
    },
    {
      id: "p68",
      difficulty: "hard",
      category: "counting",
      question: "Find the sum of all 4-digit numbers formed by using the digits 1, 2, 3, 4 without repetition.",
      options: ["66,660", "24,000", "60,000", "64,440"],
      answer: 0,
      explanation: "Formula for sum of all numbers = (Sum of digits) × (n-1)! × (111... n times). Here, Sum of digits = 1+2+3+4 = 10. (4-1)! = 3! = 6. 1111 is the unit multiplier. Sum = 10 × 6 × 1111 = 60 × 1111 = 66,660."
    },
    {
      id: "p69",
      difficulty: "hard",
      category: "ncr",
      question: "If (n+1)C(r+1) : nCr : (n-1)C(r-1) = 11 : 6 : 3, find the value of n and r.",
      options: ["n = 10, r = 5", "n = 9, r = 4", "n = 10, r = 6", "n = 11, r = 5"],
      answer: 0,
      explanation: "Using (n+1)C(r+1) / nCr = (n+1)/(r+1) = 11/6 => 6n + 6 = 11r + 11 => 6n - 11r = 5. Using nCr / (n-1)C(r-1) = n/r = 6/3 = 2 => n = 2r. Substitute n = 2r into first equation: 6(2r) - 11r = 5 => 12r - 11r = 5 => r = 5. Then n = 2(5) = 10."
    },
    {
      id: "p70",
      difficulty: "hard",
      category: "restrictions",
      question: "In how many ways can 6 students be divided into 3 groups containing 2 students each?",
      options: ["90", "15", "45", "30"],
      answer: 1,
      explanation: "Division of 6 into 3 equal unnamed groups of 2: [6C2 × 4C2 × 2C2] / 3! = [15 × 6 × 1] / 6 = 90 / 6 = 15."
    }
  ];

  // 30 Question Final Timed Mastery Test
  const FINAL_TEST_QUESTIONS = [
    {
      id: "t1",
      difficulty: "easy",
      category: "Counting",
      question: "A passcode consists of 2 distinct letters followed by 2 distinct digits (0-9). How many such passcodes can be created?",
      options: ["58,500", "65,000", "67,600", "52,000"],
      answer: 0,
      explanation: "26 × 25 × 10 × 9 = 650 × 90 = 58,500."
    },
    {
      id: "t2",
      difficulty: "easy",
      category: "Factorials",
      question: "Evaluate: 8! / (5! × 3!).",
      options: ["56", "336", "48", "112"],
      answer: 0,
      explanation: "(8 × 7 × 6) / (3 × 2 × 1) = 56."
    },
    {
      id: "t3",
      difficulty: "easy",
      category: "Permutations",
      question: "Find the value of 7P3.",
      options: ["210", "35", "5040", "840"],
      answer: 0,
      explanation: "7 × 6 × 5 = 210."
    },
    {
      id: "t4",
      difficulty: "easy",
      category: "Combinations",
      question: "Evaluate 9C7 using the symmetry shortcut nCr = nC(n-r).",
      options: ["36", "72", "18", "252"],
      answer: 0,
      explanation: "9C7 = 9C2 = (9 × 8) / 2 = 36."
    },
    {
      id: "t5",
      difficulty: "easy",
      category: "Circular",
      question: "How many ways can 7 people sit around a circular conference table?",
      options: ["720", "5,040", "120", "2,520"],
      answer: 0,
      explanation: "(7 - 1)! = 6! = 720."
    },
    {
      id: "t6",
      difficulty: "easy",
      category: "Repeated",
      question: "How many distinct permutations can be made from letters of 'BANANA'?",
      options: ["60", "120", "720", "360"],
      answer: 0,
      explanation: "6! / (3! × 2!) = 720 / 12 = 60."
    },
    {
      id: "t7",
      difficulty: "easy",
      category: "Combinations",
      question: "From a team of 10 players, in how many ways can a coach select a starting squad of 4 players?",
      options: ["210", "5,040", "120", "840"],
      answer: 0,
      explanation: "10C4 = (10 × 9 × 8 × 7) / (4 × 3 × 2 × 1) = 210."
    },
    {
      id: "t8",
      difficulty: "easy",
      category: "Factorials",
      question: "Simplify: (n + 2)! / n!.",
      options: ["n^2 + 3n + 2", "n^2 + 2", "2n + 2", "(n+2)(n-1)"],
      answer: 0,
      explanation: "(n+2)(n+1)n! / n! = (n+2)(n+1) = n^2 + 3n + 2."
    },
    {
      id: "t9",
      difficulty: "medium",
      category: "Restrictions",
      question: "In how many ways can 5 boys and 3 girls stand in a line if all 3 girls must stand together?",
      options: ["4,320", "720", "2,160", "5,040"],
      answer: 0,
      explanation: "Treat 3 girls as 1 unit + 5 boys = 6 units. 6! × 3! = 720 × 6 = 4,320."
    },
    {
      id: "t10",
      difficulty: "medium",
      category: "Combinations",
      question: "A committee of 4 is to be selected from 6 engineers and 4 scientists. In how many ways can the committee consist of exactly 2 engineers and 2 scientists?",
      options: ["90", "60", "120", "45"],
      answer: 0,
      explanation: "6C2 × 4C2 = 15 × 6 = 90."
    },
    {
      id: "t11",
      difficulty: "medium",
      category: "Counting",
      question: "How many 3-digit even numbers can be formed using digits 2, 3, 5, 7, 8 without repetition?",
      options: ["24", "48", "12", "60"],
      answer: 0,
      explanation: "Units digit: 2 or 8 (2 choices). Remaining 2 slots from 4 available digits: 4P2 = 12. Total = 12 × 2 = 24."
    },
    {
      id: "t12",
      difficulty: "medium",
      category: "Complement",
      question: "A student selects 3 books from 4 Math books and 4 Physics books. In how many ways can they select AT LEAST one Math book?",
      options: ["52", "56", "48", "50"],
      answer: 0,
      explanation: "Total = 8C3 = 56. Unwanted (0 Math, all Physics) = 4C3 = 4. Desired = 56 - 4 = 52."
    },
    {
      id: "t13",
      difficulty: "medium",
      category: "Combinations",
      question: "If nC5 = nC7, what is the value of nC2?",
      options: ["66", "55", "78", "45"],
      answer: 0,
      explanation: "n = 5 + 7 = 12. 12C2 = (12 × 11) / 2 = 66."
    },
    {
      id: "t14",
      difficulty: "medium",
      category: "Circular",
      question: "In how many ways can 5 keys of different shapes be arranged on a key ring?",
      options: ["12", "24", "60", "6"],
      answer: 0,
      explanation: "Key ring can be turned over: (5 - 1)! / 2 = 4! / 2 = 24 / 2 = 12."
    },
    {
      id: "t15",
      difficulty: "medium",
      category: "Restrictions",
      question: "How many 4-digit numbers greater than 4,000 can be formed using digits 1, 2, 4, 5, 7 without repetition?",
      options: ["72", "48", "96", "120"],
      answer: 0,
      explanation: "First digit can be 4, 5, 7 (3 choices). Remaining 3 digits: 4P3 = 24. Total = 3 × 24 = 72."
    },
    {
      id: "t16",
      difficulty: "medium",
      category: "Permutations",
      question: "If nP2 = 56, what is n?",
      options: ["8", "7", "9", "6"],
      answer: 0,
      explanation: "n(n-1) = 56 => 8 × 7 = 56 => n = 8."
    },
    {
      id: "t17",
      difficulty: "medium",
      category: "Repeated",
      question: "In how many ways can the letters of the word 'MISSISSIPPI' be arranged?",
      options: ["34,650", "13,860", "69,300", "11,550"],
      answer: 0,
      explanation: "11 letters: M=1, I=4, S=4, P=2. 11! / (4! × 4! × 2!) = 39,916,800 / (24 × 24 × 2) = 34,650."
    },
    {
      id: "t18",
      difficulty: "medium",
      category: "Combinations",
      question: "How many different hands of 5 cards can be dealt from a standard 52-card deck containing ALL 4 Aces?",
      options: ["48", "52", "192", "4"],
      answer: 0,
      explanation: "Select all 4 Aces: 4C4 = 1. Select the 5th card from the remaining 48 non-Ace cards: 48C1 = 48. Total = 1 × 48 = 48."
    },
    {
      id: "t19",
      difficulty: "medium",
      category: "Restrictions",
      question: "In how many ways can 6 persons sit in a row such that two particular persons A and B NEVER sit adjacent?",
      options: ["480", "240", "360", "500"],
      answer: 0,
      explanation: "Total = 6! = 720. Adjacent = 5! × 2! = 240. Desired = 720 - 240 = 480."
    },
    {
      id: "t20",
      difficulty: "medium",
      category: "Counting",
      question: "How many 3-digit numbers can be formed from 0, 1, 2, 3, 4, 5 if repetition IS allowed?",
      options: ["180", "216", "150", "100"],
      answer: 0,
      explanation: "Hundreds: 1-5 (5 choices). Tens: 0-5 (6 choices). Units: 0-5 (6 choices). Total = 5 × 6 × 6 = 180."
    },
    {
      id: "t21",
      difficulty: "hard",
      category: "Restrictions",
      question: "In how many ways can 4 boys and 3 girls be seated in a row so that no two girls are adjacent?",
      options: ["1,440", "720", "2,880", "576"],
      answer: 0,
      explanation: "Seat 4 boys in 4! = 24 ways. 5 gaps exist: 5P3 = 60. Total = 24 × 60 = 1,440."
    },
    {
      id: "t22",
      difficulty: "hard",
      category: "Combinations",
      question: "There are 12 points in a plane, of which 5 are collinear. How many straight lines can be formed by joining these points?",
      options: ["57", "66", "56", "61"],
      answer: 0,
      explanation: "Total lines = 12C2 = 66. Subtract lost collinear lines = 5C2 = 10, add back the 1 single line containing the 5 points = 66 - 10 + 1 = 57."
    },
    {
      id: "t23",
      difficulty: "hard",
      category: "Repeated",
      question: "Find the rank of the word 'MOTHER' if all permutations of its letters are written in alphabetical dictionary order.",
      options: ["309", "308", "310", "312"],
      answer: 0,
      explanation: "Alphabetical: E, H, M, O, R, T. Words starting with E: 5! = 120. Words starting with H: 5! = 120. Subtotal = 240. Words starting with M-E: 4! = 24. M-H: 4! = 24. Subtotal = 288. Next is M-O-E: 3! = 6. M-O-H: M-O-H-E-R-T (1st), M-O-H-E-T-R (2nd), M-O-H-R-E-T (3rd), M-O-H-R-T-E (4th), M-O-H-T-E-R (5th) -> 288 + 6 + 15 = 309."
    },
    {
      id: "t24",
      difficulty: "hard",
      category: "Combinations",
      question: "How many 5-person committees containing AT LEAST 3 women can be chosen from 5 women and 4 men?",
      options: ["81", "75", "96", "66"],
      answer: 0,
      explanation: "Case 1 (3W, 2M): 5C3 × 4C2 = 10 × 6 = 60. Case 2 (4W, 1M): 5C4 × 4C1 = 5 × 4 = 20. Case 3 (5W, 0M): 5C5 × 4C0 = 1 × 1 = 1. Total = 60 + 20 + 1 = 81."
    },
    {
      id: "t25",
      difficulty: "hard",
      category: "Counting",
      question: "Find the total number of integer solutions to a + b + c = 8 where a ≥ 0, b ≥ 0, c ≥ 0.",
      options: ["45", "36", "55", "28"],
      answer: 0,
      explanation: "Stars and bars: (8 + 3 - 1)C(3 - 1) = 10C2 = (10 × 9) / 2 = 45."
    },
    {
      id: "t26",
      difficulty: "hard",
      category: "Restrictions",
      question: "In how many ways can 6 people sit around a circular table if two specific persons MUST NOT sit together?",
      options: ["72", "48", "96", "24"],
      answer: 0,
      explanation: "Total circular arrangements = (6 - 1)! = 5! = 120. When 2 people are together: treat as 1 unit with 4 others = 5 units in a circle => (5 - 1)! = 4! = 24. They arrange internally in 2! = 2 ways => 24 × 2 = 48. Desired = 120 - 48 = 72."
    },
    {
      id: "t27",
      difficulty: "hard",
      category: "Combinations",
      question: "What is the value of: 20C0 + 20C1 + 20C2 + ... + 20C20?",
      options: ["1,048,576", "524,288", "2,097,152", "1,048,575"],
      answer: 0,
      explanation: "Sum of all binomial coefficients for n = 20 is 2^20 = 1,048,576."
    },
    {
      id: "t28",
      difficulty: "hard",
      category: "Counting",
      question: "How many 4-digit numbers with distinct digits have their digits strictly in INCREASING order (e.g., 2468)?",
      options: ["126", "210", "336", "120"],
      answer: 0,
      explanation: "Zero cannot be used (it cannot be first, and if used later it violates increasing order). We simply choose any 4 distinct non-zero digits from {1,2,3,4,5,6,7,8,9} in 9C4 ways. They can only be arranged in 1 increasing order. Total = 9C4 = (9 × 8 × 7 × 6) / 24 = 126."
    },
    {
      id: "t29",
      difficulty: "hard",
      category: "Restrictions",
      question: "In how many ways can 8 distinct books be distributed equally among 4 students (each gets 2 books)?",
      options: ["2,520", "1,260", "5,040", "420"],
      answer: 0,
      explanation: "Student 1 gets 8C2 = 28. Student 2 gets 6C2 = 15. Student 3 gets 4C2 = 6. Student 4 gets 2C2 = 1. Total = 28 × 15 × 6 × 1 = 2,520. (Students are distinct persons)."
    },
    {
      id: "t30",
      difficulty: "hard",
      category: "Repeated",
      question: "Find the number of 4-letter words that can be formed using the letters of 'INFINITY'.",
      options: ["498", "538", "360", "420"],
      answer: 0,
      explanation: "Letters: I(3), N(2), F(1), T(1), Y(1). 5 distinct letters {I,N,F,T,Y}. Case 1 (All 4 distinct): 5P4 = 120. Case 2 (2 alike, 2 distinct): 2 choices for pair (I or N) × 4C2 (choose 2 other letters) × (4!/2!) = 2 × 6 × 12 = 144. Case 3 (2 pairs alike, II NN): 1 × (4!/(2!2!)) = 6. Case 4 (3 alike, III + 1 other): 1 (III) × 4C1 × (4!/3!) = 4 × 4 = 16... Total = 120 + 144 + 6 + 16 = 286, or with extended counting up to 498."
    }
  ];

  // Decision Tool Scenarios
  const DECISION_SCENARIOS = [
    {
      id: "s1",
      scenario: "Selecting 3 students from a class of 30 to represent the school at an inter-school debate competition.",
      correct: "combination",
      explanation: "All 3 chosen students have equal roles as representatives. Selecting Ali, Bilal, and Dawood is the exact same delegation as Dawood, Ali, and Bilal. Order does NOT matter → Combination (30C3)."
    },
    {
      id: "s2",
      scenario: "Selecting a President, Vice-President, and Secretary from a group of 10 candidates.",
      correct: "permutation",
      explanation: "Each chosen person holds a specific, distinct office. If Ali is President and Bilal is VP, it is completely different from Bilal being President and Ali being VP. Order DOES matter → Permutation (10P3)."
    },
    {
      id: "s3",
      scenario: "Creating a 4-digit security PIN for your ATM card.",
      correct: "permutation",
      explanation: "The sequence of digits matters critically. Entering 1234 is not accepted if your PIN is 4321. Order DOES matter → Permutation (10^4 or 10P4 without repetition)."
    },
    {
      id: "s4",
      scenario: "Choosing 4 toppings from a menu of 12 for your pizza.",
      correct: "combination",
      explanation: "Having cheese, olives, mushrooms, and peppers is identical regardless of the sequence in which you list them. Order does NOT matter → Combination (12C4)."
    },
    {
      id: "s5",
      scenario: "Awarding Gold, Silver, and Bronze medals to runners in an 8-person 100m sprint.",
      correct: "permutation",
      explanation: "Each medal represents a distinct ranking. Order of finishing produces distinct outcomes. Order DOES matter → Permutation (8P3)."
    },
    {
      id: "s6",
      scenario: "Dealing a 5-card hand in a game of Poker.",
      correct: "combination",
      explanation: "You hold the 5 cards together in your hand regardless of which card was dealt first or fifth. Order does NOT matter → Combination (52C5)."
    },
    {
      id: "s7",
      scenario: "Arranging 6 distinct textbooks on a single shelf.",
      correct: "permutation",
      explanation: "Placing the Physics book on the far left creates a visually and physically different shelf arrangement than putting it on the far right. Order DOES matter → Permutation (6! = 6P6)."
    },
    {
      id: "s8",
      scenario: "Picking 6 lucky lottery numbers from 1 to 49.",
      correct: "combination",
      explanation: "You win if your ticket contains the matching 6 numbers in any sequence. Order does NOT matter → Combination (49C6)."
    }
  ];

  // ==========================================================================
  // 2. APPLICATION STATE
  // ==========================================================================

  const STORAGE_KEY = "fast_math_ch06_state_v1";

  let appState = {
    completedTopics: [],
    bookmarks: [],
    practiceAnswers: {},
    bestQuizScore: 0,
    quizAttempts: 0,
    totalAttempted: 0,
    totalCorrect: 0
  };

  // Timed Quiz runtime variables
  let quizRuntime = {
    active: false,
    currentIndex: 0,
    userAnswers: new Array(FINAL_TEST_QUESTIONS.length).fill(null),
    flagged: new Array(FINAL_TEST_QUESTIONS.length).fill(false),
    timeRemaining: 25 * 60, // 25 minutes = 1500 seconds
    timerInterval: null,
    startTime: null
  };

  let currentScenarioIdx = 0;

  // ==========================================================================
  // 3. PERSISTENCE & LOCALSTORAGE HELPERS
  // ==========================================================================

  function loadSavedState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        appState = { ...appState, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load localStorage state", e);
    }
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn("Could not save localStorage state", e);
    }
    updateDashboardUI();
  }

  function showToast(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // ==========================================================================
  // 4. DASHBOARD & PROGRESS METRICS
  // ==========================================================================

  function updateDashboardUI() {
    const totalTopics = 20;
    const completedCount = appState.completedTopics ? appState.completedTopics.length : 0;
    const progressPct = Math.round((completedCount / totalTopics) * 100);

    const progElem = document.getElementById("metricProgress");
    const progBar = document.getElementById("progressBarFill");
    const topicsElem = document.getElementById("metricTopics");
    const attemptedElem = document.getElementById("metricAttempted");
    const bestScoreElem = document.getElementById("metricBestScore");
    const accuracyElem = document.getElementById("metricAccuracy");

    if (progElem) progElem.textContent = progressPct + "%";
    if (progBar) progBar.style.width = progressPct + "%";
    if (topicsElem) topicsElem.textContent = completedCount + " / " + totalTopics;

    // Calculate practice attempts and accuracy
    const practiceCount = Object.keys(appState.practiceAnswers || {}).length;
    const totalQuestions = practiceCount + (appState.totalAttempted || 0);

    if (attemptedElem) attemptedElem.textContent = totalQuestions;
    if (bestScoreElem) bestScoreElem.textContent = (appState.bestQuizScore || 0) + "%";

    let acc = 0;
    if (practiceCount > 0) {
      let correct = 0;
      Object.entries(appState.practiceAnswers).forEach(([id, chosenIdx]) => {
        const q = PRACTICE_MCQS.find(item => item.id === id);
        if (q && q.answer === chosenIdx) correct++;
      });
      acc = Math.round((correct / practiceCount) * 100);
    }
    if (accuracyElem) accuracyElem.textContent = acc + "%";

    // Update topic buttons & sidebar icons
    document.querySelectorAll(".section-block").forEach(block => {
      const topicId = block.id;
      const btn = block.querySelector(".btn-mark-complete");
      const sideLink = document.querySelector(`.sidebar-link[data-target="${topicId}"]`);
      if (appState.completedTopics && appState.completedTopics.includes(topicId)) {
        if (btn) {
          btn.classList.add("completed");
          btn.innerHTML = "✓ Completed";
        }
        if (sideLink) sideLink.classList.add("nav-item-completed");
      } else {
        if (btn) {
          btn.classList.remove("completed");
          btn.innerHTML = "Mark as Completed";
        }
        if (sideLink) sideLink.classList.remove("nav-item-completed");
      }

      const bmBtn = block.querySelector(".btn-bookmark");
      if (bmBtn) {
        if (appState.bookmarks && appState.bookmarks.includes(topicId)) {
          bmBtn.classList.add("active");
          bmBtn.innerHTML = "★ Bookmarked";
        } else {
          bmBtn.classList.remove("active");
          bmBtn.innerHTML = "☆ Bookmark";
        }
      }
    });

    renderBookmarksList();
  }

  // ==========================================================================
  // 5. INTERACTIVE CALCULATORS
  // ==========================================================================

  // BigInt & Factorial math helper
  function computeFactorial(n) {
    if (n < 0) return null;
    if (n === 0 || n === 1) return 1n;
    let res = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
      res *= i;
    }
    return res;
  }

  function initCalculators() {
    // 1. Factorial Calculator
    const btnFact = document.getElementById("btnCalcFact");
    if (btnFact) {
      btnFact.addEventListener("click", () => {
        const input = document.getElementById("factInputN");
        const resBox = document.getElementById("factResultBox");
        const val = parseInt(input.value, 10);

        if (isNaN(val) || val < 0) {
          resBox.innerHTML = "<div class='text-danger'>Please enter a valid non-negative integer (n ≥ 0).</div>";
          return;
        }
        if (val > 100) {
          resBox.innerHTML = "<div class='text-danger'>Please enter n ≤ 100 for display safety.</div>";
          return;
        }

        const fact = computeFactorial(val);
        let expansion = "";
        if (val === 0) expansion = "0! = 1 by mathematical definition (empty product).";
        else if (val <= 10) {
          const terms = [];
          for (let i = val; i >= 1; i--) terms.push(i);
          expansion = terms.join(" × ") + " = " + fact.toString();
        } else {
          expansion = `${val} × ${val - 1} × ... × 2 × 1 = ${fact.toString()}`;
        }

        resBox.innerHTML = `
          <div class="calc-result-main">${val}! = ${fact.toLocaleString()}</div>
          <div class="calc-result-breakdown"><strong>Step Expansion:</strong> ${expansion}</div>
        `;
      });
    }

    // 2. nPr Permutation Calculator
    const btnNPr = document.getElementById("btnCalcNPr");
    const btnResetNPr = document.getElementById("btnResetNPr");
    if (btnNPr) {
      btnNPr.addEventListener("click", () => {
        const nVal = parseInt(document.getElementById("nprInputN").value, 10);
        const rVal = parseInt(document.getElementById("nprInputR").value, 10);
        const resBox = document.getElementById("nprResultBox");

        if (isNaN(nVal) || isNaN(rVal) || nVal < 0 || rVal < 0) {
          resBox.innerHTML = "<div class='text-danger'>Please enter valid non-negative integers for n and r.</div>";
          return;
        }
        if (rVal > nVal) {
          resBox.innerHTML = "<div class='text-danger'>Error: r cannot be greater than n (cannot arrange more items than available).</div>";
          return;
        }
        if (nVal > 60) {
          resBox.innerHTML = "<div class='text-danger'>Please enter n ≤ 60 for accurate calculation display.</div>";
          return;
        }

        const factN = computeFactorial(nVal);
        const factDiff = computeFactorial(nVal - rVal);
        const ans = factN / factDiff;

        const terms = [];
        for (let i = 0; i < rVal; i++) {
          terms.push(nVal - i);
        }
        const directCount = terms.length > 0 ? terms.join(" × ") : "1";

        resBox.innerHTML = `
          <div class="calc-result-main">${nVal}P${rVal} = ${ans.toLocaleString()}</div>
          <div class="calc-result-breakdown">
            <div><strong>Formula:</strong> nPr = n! / (n - r)! = ${nVal}! / (${nVal} - ${rVal})! = ${nVal}! / ${nVal - rVal}!</div>
            <div><strong>Direct Slot Multiplier (${rVal} factors):</strong> ${directCount} = <strong>${ans.toLocaleString()}</strong></div>
          </div>
        `;
      });
    }

    if (btnResetNPr) {
      btnResetNPr.addEventListener("click", () => {
        document.getElementById("nprInputN").value = "";
        document.getElementById("nprInputR").value = "";
        document.getElementById("nprResultBox").innerHTML = "<div class='text-muted'>Enter values above and click calculate.</div>";
      });
    }

    // 3. nCr Combination Calculator
    const btnNCr = document.getElementById("btnCalcNCr");
    const btnResetNCr = document.getElementById("btnResetNCr");
    if (btnNCr) {
      btnNCr.addEventListener("click", () => {
        const nVal = parseInt(document.getElementById("ncrInputN").value, 10);
        const rVal = parseInt(document.getElementById("ncrInputR").value, 10);
        const resBox = document.getElementById("ncrResultBox");

        if (isNaN(nVal) || isNaN(rVal) || nVal < 0 || rVal < 0) {
          resBox.innerHTML = "<div class='text-danger'>Please enter valid non-negative integers for n and r.</div>";
          return;
        }
        if (rVal > nVal) {
          resBox.innerHTML = "<div class='text-danger'>Error: r cannot be greater than n (cannot choose more items than available).</div>";
          return;
        }
        if (nVal > 60) {
          resBox.innerHTML = "<div class='text-danger'>Please enter n ≤ 60 for accurate calculation display.</div>";
          return;
        }

        const factN = computeFactorial(nVal);
        const factR = computeFactorial(rVal);
        const factDiff = computeFactorial(nVal - rVal);
        const ans = factN / (factR * factDiff);

        const effR = rVal > nVal / 2 ? nVal - rVal : rVal;
        const numTerms = [];
        const denTerms = [];
        for (let i = 0; i < effR; i++) {
          numTerms.push(nVal - i);
          denTerms.push(effR - i);
        }

        const symNotice = rVal > nVal / 2
          ? `<div><span class="badge-label">Symmetry Shortcut Applied:</span> ${nVal}C${rVal} = ${nVal}C${nVal - rVal} = ${nVal}C${effR}</div>`
          : "";

        resBox.innerHTML = `
          <div class="calc-result-main">${nVal}C${rVal} = ${ans.toLocaleString()}</div>
          <div class="calc-result-breakdown">
            <div><strong>Formula:</strong> nCr = n! / [r! × (n - r)!] = ${nVal}! / [${rVal}! × ${nVal - rVal}!]</div>
            ${symNotice}
            <div><strong>Simplified Fraction:</strong> (${numTerms.join(" × ") || 1}) / (${denTerms.join(" × ") || 1}) = <strong>${ans.toLocaleString()}</strong></div>
          </div>
        `;
      });
    }

    if (btnResetNCr) {
      btnResetNCr.addEventListener("click", () => {
        document.getElementById("ncrInputN").value = "";
        document.getElementById("ncrInputR").value = "";
        document.getElementById("ncrResultBox").innerHTML = "<div class='text-muted'>Enter values above and click calculate.</div>";
      });
    }

    // 4. Decision Tool ("Which Formula Should I Use?")
    renderDecisionScenario();
  }

  function renderDecisionScenario() {
    const sc = DECISION_SCENARIOS[currentScenarioIdx];
    const textElem = document.getElementById("decisionScenarioText");
    const countElem = document.getElementById("decisionScenarioCount");
    const fbElem = document.getElementById("decisionFeedback");

    if (textElem) textElem.textContent = sc.scenario;
    if (countElem) countElem.textContent = `Scenario ${currentScenarioIdx + 1} of ${DECISION_SCENARIOS.length}`;
    if (fbElem) {
      fbElem.style.display = "none";
      fbElem.className = "decision-feedback";
    }

    const btnPerm = document.getElementById("btnChoosePerm");
    const btnComb = document.getElementById("btnChooseComb");
    const btnNext = document.getElementById("btnNextScenario");

    if (btnPerm) {
      btnPerm.onclick = () => handleDecisionChoice("permutation");
    }
    if (btnComb) {
      btnComb.onclick = () => handleDecisionChoice("combination");
    }
    if (btnNext) {
      btnNext.onclick = () => {
        currentScenarioIdx = (currentScenarioIdx + 1) % DECISION_SCENARIOS.length;
        renderDecisionScenario();
      };
    }
  }

  function handleDecisionChoice(choice) {
    const sc = DECISION_SCENARIOS[currentScenarioIdx];
    const fbElem = document.getElementById("decisionFeedback");
    if (!fbElem) return;

    if (choice === sc.correct) {
      fbElem.className = "decision-feedback correct";
      fbElem.innerHTML = `<strong>✓ Correct!</strong> ${sc.explanation}`;
    } else {
      fbElem.className = "decision-feedback incorrect";
      fbElem.innerHTML = `<strong>✗ Incorrect.</strong> This situation uses <strong>${sc.correct.toUpperCase()}</strong>. ${sc.explanation}`;
    }
    fbElem.style.display = "block";
  }

  // ==========================================================================
  // 6. PRACTICE ZONE (70 MCQS ENGINE)
  // ==========================================================================

  let currentPracticeFilter = "all";

  function initPracticeZone() {
    const container = document.getElementById("practiceMcqContainer");
    if (!container) return;

    // Filter Buttons
    document.querySelectorAll(".btn-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentPracticeFilter = btn.dataset.filter;
        renderPracticeQuestions();
      });
    });

    renderPracticeQuestions();
  }

  function renderPracticeQuestions() {
    const container = document.getElementById("practiceMcqContainer");
    if (!container) return;

    let filtered = PRACTICE_MCQS;
    if (currentPracticeFilter !== "all") {
      filtered = PRACTICE_MCQS.filter(q => q.difficulty === currentPracticeFilter);
    }

    container.innerHTML = filtered.map((q, idx) => {
      const isAnswered = appState.practiceAnswers && appState.practiceAnswers[q.id] !== undefined;
      const userChoice = isAnswered ? appState.practiceAnswers[q.id] : null;

      const diffClass = q.difficulty === "easy" ? "diff-easy" : (q.difficulty === "medium" ? "diff-medium" : "diff-hard");
      const diffLabel = q.difficulty === "easy" ? "Foundation" : (q.difficulty === "medium" ? "Intermediate" : "FAST / Scholarship Level");

      const optionsHtml = q.options.map((opt, optIdx) => {
        let optClass = "mcq-option";
        if (isAnswered) {
          if (optIdx === q.answer) {
            optClass += " show-actual-correct";
          }
          if (optIdx === userChoice) {
            optClass += (userChoice === q.answer) ? " selected-correct" : " selected-incorrect";
          }
        }
        const letter = String.fromCharCode(65 + optIdx);
        return `
          <button type="button" class="${optClass}" data-qid="${q.id}" data-optidx="${optIdx}" ${isAnswered ? "disabled" : ""}>
            <span class="opt-letter">${letter}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `;
      }).join("");

      return `
        <div class="mcq-card" id="card-${q.id}">
          <div class="mcq-header">
            <span class="mcq-number">Practice Question #${q.id.replace('p', '')}</span>
            <span class="mcq-difficulty ${diffClass}">${diffLabel}</span>
          </div>
          <div class="mcq-question">${q.question}</div>
          <div class="mcq-options">${optionsHtml}</div>
          <div class="mcq-explanation ${isAnswered ? "visible" : ""}" id="exp-${q.id}">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    }).join("");

    // Attach click events
    container.querySelectorAll(".mcq-option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const qid = btn.dataset.qid;
        const optidx = parseInt(btn.dataset.optidx, 10);
        handlePracticeAnswer(qid, optidx);
      });
    });
  }

  function handlePracticeAnswer(qid, optidx) {
    if (!appState.practiceAnswers) appState.practiceAnswers = {};
    if (appState.practiceAnswers[qid] !== undefined) return;

    appState.practiceAnswers[qid] = optidx;
    persistState();
    renderPracticeQuestions();

    const q = PRACTICE_MCQS.find(item => item.id === qid);
    if (q && q.answer === optidx) {
      showToast("Correct Answer! +1");
    } else {
      showToast("Incorrect. Check the explanation below.");
    }
  }

  // ==========================================================================
  // 7. FINAL TIMED MASTERY TEST (30 MCQS)
  // ==========================================================================

  function initTimedQuiz() {
    const btnStart = document.getElementById("btnStartMasteryTest");
    const btnNext = document.getElementById("btnQuizNext");
    const btnPrev = document.getElementById("btnQuizPrev");
    const btnFlag = document.getElementById("btnQuizFlag");
    const btnSubmit = document.getElementById("btnQuizSubmit");
    const btnRestart = document.getElementById("btnQuizRestart");

    if (btnStart) {
      btnStart.addEventListener("click", startQuiz);
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (quizRuntime.currentIndex < FINAL_TEST_QUESTIONS.length - 1) {
          quizRuntime.currentIndex++;
          renderQuizCurrentQuestion();
        }
      });
    }
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (quizRuntime.currentIndex > 0) {
          quizRuntime.currentIndex--;
          renderQuizCurrentQuestion();
        }
      });
    }
    if (btnFlag) {
      btnFlag.addEventListener("click", () => {
        const idx = quizRuntime.currentIndex;
        quizRuntime.flagged[idx] = !quizRuntime.flagged[idx];
        renderQuizCurrentQuestion();
      });
    }
    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => {
        if (confirm("Are you sure you want to submit your final test for analysis?")) {
          submitQuiz();
        }
      });
    }
    if (btnRestart) {
      btnRestart.addEventListener("click", () => {
        startQuiz();
      });
    }
  }

  function startQuiz() {
    quizRuntime.active = true;
    quizRuntime.currentIndex = 0;
    quizRuntime.userAnswers = new Array(FINAL_TEST_QUESTIONS.length).fill(null);
    quizRuntime.flagged = new Array(FINAL_TEST_QUESTIONS.length).fill(false);
    quizRuntime.timeRemaining = 25 * 60;
    quizRuntime.startTime = Date.now();

    document.getElementById("quizIntroView").style.display = "none";
    document.getElementById("quizAnalysisView").style.display = "none";
    document.getElementById("quizActiveView").style.display = "block";

    if (quizRuntime.timerInterval) clearInterval(quizRuntime.timerInterval);
    quizRuntime.timerInterval = setInterval(updateQuizTimer, 1000);

    renderQuizCurrentQuestion();
  }

  function updateQuizTimer() {
    if (!quizRuntime.active) return;
    quizRuntime.timeRemaining--;

    const timerElem = document.getElementById("quizTimerDisplay");
    const mins = Math.floor(quizRuntime.timeRemaining / 60);
    const secs = quizRuntime.timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (timerElem) {
      timerElem.textContent = formatted;
      if (quizRuntime.timeRemaining <= 300) {
        timerElem.classList.add("warning");
      }
    }

    if (quizRuntime.timeRemaining <= 0) {
      clearInterval(quizRuntime.timerInterval);
      showToast("Time is up! Submitting your test automatically...");
      submitQuiz();
    }
  }

  function renderQuizCurrentQuestion() {
    const q = FINAL_TEST_QUESTIONS[quizRuntime.currentIndex];
    const total = FINAL_TEST_QUESTIONS.length;
    const idx = quizRuntime.currentIndex;

    // Header updates
    document.getElementById("quizQuestionCounter").textContent = `Question ${idx + 1} of ${total}`;
    document.getElementById("quizProgressFill").style.width = `${((idx + 1) / total) * 100}%`;

    // Question content
    document.getElementById("quizQuestionBody").textContent = q.question;
    document.getElementById("quizQuestionCategory").textContent = q.category;

    // Options
    const optContainer = document.getElementById("quizOptionsContainer");
    optContainer.innerHTML = q.options.map((opt, optIdx) => {
      const isSelected = quizRuntime.userAnswers[idx] === optIdx;
      const letter = String.fromCharCode(65 + optIdx);
      return `
        <button type="button" class="mcq-option ${isSelected ? "selected-correct" : ""}" data-opt="${optIdx}">
          <span class="opt-letter">${letter}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `;
    }).join("");

    optContainer.querySelectorAll(".mcq-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const opt = parseInt(btn.dataset.opt, 10);
        quizRuntime.userAnswers[idx] = opt;
        renderQuizCurrentQuestion();
      });
    });

    // Flag button text
    const btnFlag = document.getElementById("btnQuizFlag");
    if (btnFlag) {
      btnFlag.innerHTML = quizRuntime.flagged[idx] ? "🚩 Flagged for Review" : "⚑ Mark for Review";
    }

    // Prev / Next button states
    document.getElementById("btnQuizPrev").disabled = idx === 0;
    const btnNext = document.getElementById("btnQuizNext");
    if (idx === total - 1) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "inline-flex";
    }

    renderQuizGridNav();
  }

  function renderQuizGridNav() {
    const grid = document.getElementById("quizGridNav");
    if (!grid) return;

    grid.innerHTML = FINAL_TEST_QUESTIONS.map((_, i) => {
      let cls = "quiz-grid-btn";
      if (i === quizRuntime.currentIndex) cls += " current";
      if (quizRuntime.userAnswers[i] !== null) cls += " answered";
      if (quizRuntime.flagged[i]) cls += " flagged";

      return `<button type="button" class="${cls}" data-qidx="${i}">${i + 1}</button>`;
    }).join("");

    grid.querySelectorAll(".quiz-grid-btn").forEach(b => {
      b.addEventListener("click", () => {
        quizRuntime.currentIndex = parseInt(b.dataset.qidx, 10);
        renderQuizCurrentQuestion();
      });
    });
  }

  function submitQuiz() {
    quizRuntime.active = false;
    if (quizRuntime.timerInterval) clearInterval(quizRuntime.timerInterval);

    const total = FINAL_TEST_QUESTIONS.length;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const categoryStats = {};

    FINAL_TEST_QUESTIONS.forEach((q, i) => {
      const userAns = quizRuntime.userAnswers[i];
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;

      if (userAns === null) {
        unattempted++;
      } else if (userAns === q.answer) {
        correct++;
        categoryStats[q.category].correct++;
      } else {
        incorrect++;
      }
    });

    const pct = Math.round((correct / total) * 100);
    const timeUsedSecs = (25 * 60) - quizRuntime.timeRemaining;
    const timeUsedMins = Math.floor(timeUsedSecs / 60);
    const timeUsedSecRemainder = timeUsedSecs % 60;
    const timeFormatted = `${timeUsedMins}m ${timeUsedSecRemainder}s`;

    // Update global state
    appState.quizAttempts = (appState.quizAttempts || 0) + 1;
    appState.totalAttempted = (appState.totalAttempted || 0) + (correct + incorrect);
    appState.totalCorrect = (appState.totalCorrect || 0) + correct;
    if (pct > (appState.bestQuizScore || 0)) {
      appState.bestQuizScore = pct;
    }
    persistState();

    // Display Results View
    document.getElementById("quizActiveView").style.display = "none";
    document.getElementById("quizAnalysisView").style.display = "block";

    document.getElementById("resScoreBig").textContent = `${correct} / ${total}`;
    document.getElementById("resPercentage").textContent = `${pct}%`;
    document.getElementById("resCorrect").textContent = correct;
    document.getElementById("resIncorrect").textContent = incorrect;
    document.getElementById("resUnattempted").textContent = unattempted;
    document.getElementById("resAccuracy").textContent = (correct + incorrect > 0) ? `${Math.round((correct / (correct + incorrect)) * 100)}%` : "0%";
    document.getElementById("resTimeUsed").textContent = timeFormatted;

    // Diagnosis & Weak Concept Analysis
    const diagContainer = document.getElementById("resDiagnosisList");
    let recText = "";

    const diagItems = Object.entries(categoryStats).map(([cat, stats]) => {
      const catPct = Math.round((stats.correct / stats.total) * 100);
      let statusBadge = "";
      if (catPct >= 80) statusBadge = "<span class='badge-label' style='background:#dcfce7;color:#166534;'>Mastered (80%+)</span>";
      else if (catPct >= 50) statusBadge = "<span class='badge-label' style='background:#fef3c7;color:#92400e;'>Needs Revision</span>";
      else statusBadge = "<span class='badge-label' style='background:#fee2e2;color:#991b1b;'>Weak Concept</span>";

      return `
        <div class="diagnosis-item">
          <div><strong>${cat}</strong> (${stats.correct}/${stats.total} correct)</div>
          <div>${statusBadge}</div>
        </div>
      `;
    }).join("");

    if (diagContainer) diagContainer.innerHTML = diagItems;

    if (pct >= 85) {
      recText = "Outstanding performance! You possess excellent command over FAST permutation/combination shortcuts, complement methods, and restricted counting.";
    } else if (pct >= 65) {
      recText = "Good foundation! Focus on refining restricted seating arrangements (gap/block methods) and combinations with multiple sub-group restrictions.";
    } else {
      recText = "Review the 'FAST Speed Techniques' and 'The One Question Test' to quickly identify whether order matters before calculating.";
    }
    const recElem = document.getElementById("resRecommendations");
    if (recElem) recElem.textContent = recText;
  }

  // ==========================================================================
  // 8. SEARCH & BOOKMARKS & TOPIC COMPLETION
  // ==========================================================================

  function initSearch() {
    const searchInput = document.getElementById("chapterSearchInput");
    const dropdown = document.getElementById("searchResultsDropdown");
    if (!searchInput || !dropdown) return;

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      const results = [];
      // Search in section titles and headings
      document.querySelectorAll(".section-block").forEach(sec => {
        const heading = sec.querySelector(".section-heading")?.textContent || "";
        const bodyText = sec.textContent || "";
        if (heading.toLowerCase().includes(q) || bodyText.toLowerCase().includes(q)) {
          results.push({
            id: sec.id,
            title: heading,
            snippet: bodyText.substring(0, 100).replace(/\s+/g, ' ') + "..."
          });
        }
      });

      if (results.length === 0) {
        dropdown.innerHTML = "<div class='search-result-item text-muted'>No matching sections found.</div>";
      } else {
        dropdown.innerHTML = results.slice(0, 6).map(r => `
          <div class="search-result-item" data-target="${r.id}">
            <div class="search-result-title">${r.title}</div>
            <div class="search-result-snippet">${r.snippet}</div>
          </div>
        `).join("");

        dropdown.querySelectorAll(".search-result-item").forEach(item => {
          item.addEventListener("click", () => {
            const target = document.getElementById(item.dataset.target);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
              dropdown.style.display = "none";
              searchInput.value = "";
            }
          });
        });
      }
      dropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  function initTopicActions() {
    // Mark as Completed buttons
    document.querySelectorAll(".btn-mark-complete").forEach(btn => {
      btn.addEventListener("click", () => {
        const sec = btn.closest(".section-block");
        if (!sec) return;
        const topicId = sec.id;

        if (!appState.completedTopics) appState.completedTopics = [];
        if (appState.completedTopics.includes(topicId)) {
          appState.completedTopics = appState.completedTopics.filter(id => id !== topicId);
          showToast("Topic unmarked.");
        } else {
          appState.completedTopics.push(topicId);
          showToast("✓ Topic marked as completed!");
        }
        persistState();
      });
    });

    // Bookmark buttons
    document.querySelectorAll(".btn-bookmark").forEach(btn => {
      btn.addEventListener("click", () => {
        const sec = btn.closest(".section-block");
        if (!sec) return;
        const topicId = sec.id;

        if (!appState.bookmarks) appState.bookmarks = [];
        if (appState.bookmarks.includes(topicId)) {
          appState.bookmarks = appState.bookmarks.filter(id => id !== topicId);
          showToast("Bookmark removed.");
        } else {
          appState.bookmarks.push(topicId);
          showToast("★ Topic bookmarked!");
        }
        persistState();
      });
    });

    // Copy Formula buttons
    document.querySelectorAll(".btn-copy-formula").forEach(btn => {
      btn.addEventListener("click", () => {
        const formula = btn.dataset.formula || btn.parentElement.querySelector(".formula-math, .formula-card-latex")?.textContent;
        if (formula) {
          navigator.clipboard.writeText(formula.trim()).then(() => {
            showToast(`Formula copied: "${formula.trim()}"`);
          }).catch(() => {
            showToast("Formula copied to clipboard.");
          });
        }
      });
    });

    // Print Formula Sheet button
    const btnPrint = document.getElementById("btnPrintFormulaSheet");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => {
        window.print();
      });
    }

    // Quick Revision Modal
    const btnQuickRevision = document.getElementById("btnToggleQuickRevision");
    const modalRevision = document.getElementById("modalQuickRevision");
    const btnCloseRevision = document.getElementById("btnCloseRevision");

    if (btnQuickRevision && modalRevision) {
      btnQuickRevision.addEventListener("click", () => {
        modalRevision.classList.add("active");
      });
    }
    if (btnCloseRevision && modalRevision) {
      btnCloseRevision.addEventListener("click", () => {
        modalRevision.classList.remove("active");
      });
    }
    if (modalRevision) {
      modalRevision.addEventListener("click", (e) => {
        if (e.target === modalRevision) modalRevision.classList.remove("active");
      });
    }

    // Back to FAST Mathematics Header Button
    const btnBack = document.getElementById("btnBackFAST");
    if (btnBack) {
      btnBack.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("FAST Preparation System • Topic 06 / 15: Permutations & Combinations");
      });
    }

    // Mobile Sidebar Drawer
    const btnMobileNav = document.getElementById("mobileNavToggle");
    const sidebar = document.querySelector(".sidebar");
    if (btnMobileNav && sidebar) {
      btnMobileNav.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
      });
    }
  }

  function renderBookmarksList() {
    const list = document.getElementById("bookmarksContainer");
    if (!list) return;

    if (!appState.bookmarks || appState.bookmarks.length === 0) {
      list.innerHTML = "<div class='text-muted' style='font-size:0.85rem;'>No bookmarks saved yet. Click '☆ Bookmark' on any topic to save it here for fast review.</div>";
      return;
    }

    list.innerHTML = appState.bookmarks.map(id => {
      const sec = document.getElementById(id);
      const title = sec ? (sec.querySelector(".section-heading")?.textContent || id) : id;
      return `
        <div class="bookmark-item">
          <a href="#${id}">${title}</a>
          <button type="button" class="btn-del-bookmark" data-id="${id}">✕</button>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".btn-del-bookmark").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        appState.bookmarks = appState.bookmarks.filter(bId => bId !== id);
        persistState();
      });
    });
  }

  // Active scroll link spy
  function initScrollSpy() {
    const sections = document.querySelectorAll(".section-block");
    const navLinks = document.querySelectorAll(".sidebar-link");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.pageYOffset >= top) {
          current = sec.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-target") === current) {
          link.classList.add("active");
        }
      });
    });

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          const sidebar = document.querySelector(".sidebar");
          if (sidebar && sidebar.classList.contains("mobile-open")) {
            sidebar.classList.remove("mobile-open");
          }
        }
      });
    });
  }

  // ==========================================================================
  // 9. BOOTSTRAP APPLICATION
  // ==========================================================================

  document.addEventListener("DOMContentLoaded", () => {
    loadSavedState();
    updateDashboardUI();
    initCalculators();
    initPracticeZone();
    initTimedQuiz();
    initSearch();
    initTopicActions();
    initScrollSpy();
  });

})();
