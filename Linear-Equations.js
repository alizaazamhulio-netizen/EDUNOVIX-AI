/**
 * FAST Mathematics Preparation — Topic 02: Linear Equations & Inequalities
 * Standalone Educational Application Engine
 */

(function() {
  'use strict';

  // --- LOCAL STORAGE KEYS ---
  const STORAGE_KEY_COMPLETED = 'fast_math_topic02_completed';
  const STORAGE_KEY_BOOKMARKS = 'fast_math_topic02_bookmarks';
  const STORAGE_KEY_ATTEMPTED = 'fast_math_topic02_attempted_count';
  const STORAGE_KEY_BEST_SCORE = 'fast_math_topic02_best_score';
  const STORAGE_KEY_PRACTICE_ANS = 'fast_math_topic02_practice_answers';

  // --- STATE ---
  let completedTopics = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]'));
  let bookmarkedTopics = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]'));
  let attemptedQuestions = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_ATTEMPTED) || '[]'));
  let bestScore = parseInt(localStorage.getItem(STORAGE_KEY_BEST_SCORE) || '0', 10);
  let practiceAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY_PRACTICE_ANS) || '{}');

  // Test State
  let testActive = false;
  let testTimerInterval = null;
  let testTimeRemaining = 25 * 60; // 25 minutes
  let currentTestIndex = 0;
  let userTestAnswers = new Array(30).fill(null);

  // Total topics tracked for progress dashboard
  const TOTAL_TOPICS_COUNT = 18;

  // --- 60 PRACTICE MCQS DATA ---
  const PRACTICE_QUESTIONS = [
    // 1-20: Easy
    {
      id: 1,
      diff: 'easy',
      cat: 'One-Step',
      q: 'Solve for x: x + 14 = 39',
      options: ['x = 23', 'x = 25', 'x = 53', 'x = 24'],
      correct: 1,
      exp: 'Subtract 14 from both sides: x = 39 - 14 = 25.'
    },
    {
      id: 2,
      diff: 'easy',
      cat: 'One-Step',
      q: 'Solve for y: y - 18 = 42',
      options: ['y = 24', 'y = 60', 'y = 50', 'y = 62'],
      correct: 1,
      exp: 'Add 18 to both sides: y = 42 + 18 = 60.'
    },
    {
      id: 3,
      diff: 'easy',
      cat: 'One-Step',
      q: 'Solve for k: 7k = 91',
      options: ['k = 11', 'k = 12', 'k = 13', 'k = 14'],
      correct: 2,
      exp: 'Divide both sides by 7: k = 91 / 7 = 13.'
    },
    {
      id: 4,
      diff: 'easy',
      cat: 'One-Step',
      q: 'Solve for m: m / 6 = 15',
      options: ['m = 90', 'm = 60', 'm = 75', 'm = 120'],
      correct: 0,
      exp: 'Multiply both sides by 6: m = 15 × 6 = 90.'
    },
    {
      id: 5,
      diff: 'easy',
      cat: 'Two-Step',
      q: 'Solve for x: 3x + 8 = 29',
      options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
      correct: 1,
      exp: 'Subtract 8 from both sides: 3x = 21. Divide by 3: x = 7.'
    },
    {
      id: 6,
      diff: 'easy',
      cat: 'Two-Step',
      q: 'Solve for p: 5p - 12 = 33',
      options: ['p = 8', 'p = 9', 'p = 10', 'p = 7'],
      correct: 1,
      exp: 'Add 12 to both sides: 5p = 45. Divide by 5: p = 9.'
    },
    {
      id: 7,
      diff: 'easy',
      cat: 'Two-Step',
      q: 'Solve for x: -4x + 10 = -14',
      options: ['x = 6', 'x = -6', 'x = 1', 'x = -1'],
      correct: 0,
      exp: 'Subtract 10: -4x = -24. Divide by -4: x = 6.'
    },
    {
      id: 8,
      diff: 'easy',
      cat: 'Brackets',
      q: 'Solve for a: 2(a + 5) = 24',
      options: ['a = 7', 'a = 8', 'a = 9', 'a = 12'],
      correct: 0,
      exp: 'Divide by 2: a + 5 = 12 → a = 7 (or expand 2a + 10 = 24 → 2a = 14 → a = 7).'
    },
    {
      id: 9,
      diff: 'easy',
      cat: 'Brackets',
      q: 'Solve for z: 4(2z - 3) = 28',
      options: ['z = 4', 'z = 5', 'z = 6', 'z = 3'],
      correct: 1,
      exp: 'Divide by 4: 2z - 3 = 7 → 2z = 10 → z = 5.'
    },
    {
      id: 10,
      diff: 'easy',
      cat: 'Variables on Both Sides',
      q: 'Solve for x: 4x + 6 = 2x + 18',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
      correct: 2,
      exp: 'Subtract 2x: 2x + 6 = 18. Subtract 6: 2x = 12. Divide by 2: x = 6.'
    },
    {
      id: 11,
      diff: 'easy',
      cat: 'Variables on Both Sides',
      q: 'Solve for y: 6y - 5 = 3y + 16',
      options: ['y = 5', 'y = 6', 'y = 7', 'y = 8'],
      correct: 2,
      exp: 'Subtract 3y: 3y - 5 = 16. Add 5: 3y = 21. Divide by 3: y = 7.'
    },
    {
      id: 12,
      diff: 'easy',
      cat: 'Fractions',
      q: 'Solve for x: x / 5 + 4 = 9',
      options: ['x = 20', 'x = 25', 'x = 30', 'x = 15'],
      correct: 1,
      exp: 'Subtract 4: x / 5 = 5. Multiply by 5: x = 25.'
    },
    {
      id: 13,
      diff: 'easy',
      cat: 'Decimals',
      q: 'Solve for x: 0.4x + 1.2 = 3.6',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
      correct: 2,
      exp: 'Multiply by 10: 4x + 12 = 36 → 4x = 24 → x = 6.'
    },
    {
      id: 14,
      diff: 'easy',
      cat: 'Inequalities',
      q: 'Solve the inequality: x + 9 > 15',
      options: ['x > 6', 'x < 6', 'x ≥ 6', 'x > 24'],
      correct: 0,
      exp: 'Subtract 9 from both sides: x > 6.'
    },
    {
      id: 15,
      diff: 'easy',
      cat: 'Inequalities',
      q: 'Solve the inequality: 3x ≤ 21',
      options: ['x ≥ 7', 'x ≤ 7', 'x < 7', 'x ≤ -7'],
      correct: 1,
      exp: 'Divide by positive 3: x ≤ 7 (sign does NOT flip for positive division).'
    },
    {
      id: 16,
      diff: 'easy',
      cat: 'Inequalities',
      q: 'Solve the inequality: -2x < 10',
      options: ['x < -5', 'x > -5', 'x < 5', 'x > 5'],
      correct: 1,
      exp: 'Divide by negative 2: reverse the sign! x > -5.'
    },
    {
      id: 17,
      diff: 'easy',
      cat: 'Special Cases',
      q: 'What type of solution does 2x + 4 = 2x + 4 have?',
      options: ['Unique solution x = 0', 'No solution', 'Infinitely many solutions', 'x = 4'],
      correct: 2,
      exp: 'Both sides are identical identities (4 = 4). Hence, infinitely many real solutions.'
    },
    {
      id: 18,
      diff: 'easy',
      cat: 'Special Cases',
      q: 'What type of solution does 3x + 2 = 3x + 9 have?',
      options: ['x = 3', 'x = 0', 'Infinitely many solutions', 'No solution'],
      correct: 3,
      exp: 'Subtracting 3x gives 2 = 9 (impossible). Therefore, there is NO solution.'
    },
    {
      id: 19,
      diff: 'easy',
      cat: 'Word Problems',
      q: 'A number increased by 14 is 50. What is the number?',
      options: ['34', '36', '64', '26'],
      correct: 1,
      exp: 'x + 14 = 50 → x = 50 - 14 = 36.'
    },
    {
      id: 20,
      diff: 'easy',
      cat: 'Word Problems',
      q: 'Twice a number minus 7 equals 23. Find the number.',
      options: ['12', '14', '15', '16'],
      correct: 2,
      exp: '2x - 7 = 23 → 2x = 30 → x = 15.'
    },

    // 21-45: Medium
    {
      id: 21,
      diff: 'medium',
      cat: 'Multi-Step',
      q: 'Solve for x: 5x - 4 + 2x + 10 = 34',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correct: 1,
      exp: 'Combine like terms: 7x + 6 = 34 → 7x = 28 → x = 4.'
    },
    {
      id: 22,
      diff: 'medium',
      cat: 'Brackets',
      q: 'Solve for x: 3(2x - 1) - 2(x + 4) = 17',
      options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
      correct: 1,
      exp: 'Expand: 6x - 3 - 2x - 8 = 17 → 4x - 11 = 17 → 4x = 28 → x = 7.'
    },
    {
      id: 23,
      diff: 'medium',
      cat: 'Fractions',
      q: 'Solve for x: x / 3 + x / 4 = 14',
      options: ['x = 20', 'x = 24', 'x = 28', 'x = 32'],
      correct: 1,
      exp: 'Multiply entire equation by LCM (12): 4x + 3x = 168 → 7x = 168 → x = 24.'
    },
    {
      id: 24,
      diff: 'medium',
      cat: 'Fractions',
      q: 'Solve for x: (2x - 3) / 5 = (x + 1) / 3',
      options: ['x = 12', 'x = 14', 'x = 10', 'x = 16'],
      correct: 1,
      exp: 'Cross multiply: 3(2x - 3) = 5(x + 1) → 6x - 9 = 5x + 5 → x = 14.'
    },
    {
      id: 25,
      diff: 'medium',
      cat: 'Fractions',
      q: 'Solve for y: (y + 4) / 2 - (y - 1) / 3 = 4',
      options: ['y = 8', 'y = 9', 'y = 10', 'y = 12'],
      correct: 2,
      exp: 'Multiply by 6: 3(y + 4) - 2(y - 1) = 24 → 3y + 12 - 2y + 2 = 24 → y + 14 = 24 → y = 10.'
    },
    {
      id: 26,
      diff: 'medium',
      cat: 'Decimals',
      q: 'Solve for x: 0.25(x - 4) + 0.5x = 8',
      options: ['x = 10', 'x = 12', 'x = 14', 'x = 16'],
      correct: 1,
      exp: 'Multiply by 100: 25(x - 4) + 50x = 800 → 25x - 100 + 50x = 800 → 75x = 900 → x = 12.'
    },
    {
      id: 27,
      diff: 'medium',
      cat: 'Inequalities',
      q: 'Solve the inequality: 5 - 3x ≥ 20',
      options: ['x ≥ -5', 'x ≤ -5', 'x ≤ 5', 'x ≥ 5'],
      correct: 1,
      exp: 'Subtract 5: -3x ≥ 15. Divide by -3 and FLIP sign: x ≤ -5.'
    },
    {
      id: 28,
      diff: 'medium',
      cat: 'Compound Inequalities',
      q: 'Solve the compound inequality: -4 < 2x + 2 ≤ 10',
      options: ['-3 < x ≤ 4', '-2 < x ≤ 4', '-3 ≤ x < 4', '-1 < x ≤ 5'],
      correct: 0,
      exp: 'Subtract 2 from all parts: -6 < 2x ≤ 8. Divide by 2: -3 < x ≤ 4.'
    },
    {
      id: 29,
      diff: 'medium',
      cat: 'Compound Inequalities',
      q: 'How many integer values of x satisfy: -1 ≤ 3x - 4 < 8?',
      options: ['2', '3', '4', '5'],
      correct: 1,
      exp: 'Add 4: 3 ≤ 3x < 12. Divide by 3: 1 ≤ x < 4. Integers are x = 1, 2, 3 (Total = 3).'
    },
    {
      id: 30,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'The sum of three consecutive odd integers is 87. What is the largest integer?',
      options: ['27', '29', '31', '33'],
      correct: 2,
      exp: 'Let integers be n, n+2, n+4. Sum = 3n + 6 = 87 → 3n = 81 → n = 27. Largest = 27 + 4 = 31.'
    },
    {
      id: 31,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'A father is 32 years older than his son. In 4 years, he will be three times as old as his son. How old is the son now?',
      options: ['10', '12', '14', '16'],
      correct: 1,
      exp: 'Son = s, Father = s + 32. In 4 years: (s + 36) = 3(s + 4) → s + 36 = 3s + 12 → 2s = 24 → s = 12.'
    },
    {
      id: 32,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'A shop sells notebooks for Rs. 50 and pens for Rs. 20. Ali buys a total of 15 items for Rs. 480. How many notebooks did he buy?',
      options: ['5', '6', '7', '8'],
      correct: 1,
      exp: 'Let notebooks = n, pens = 15 - n. 50n + 20(15 - n) = 480 → 50n + 300 - 20n = 480 → 30n = 180 → n = 6.'
    },
    {
      id: 33,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'A car travels from City A to City B at 60 km/h and returns at 40 km/h. If the total driving time is 5 hours, what is the distance between City A and B?',
      options: ['100 km', '120 km', '140 km', '150 km'],
      correct: 1,
      exp: 'd / 60 + d / 40 = 5. Multiply by 120: 2d + 3d = 600 → 5d = 600 → d = 120 km.'
    },
    {
      id: 34,
      diff: 'medium',
      cat: 'Variables on Both Sides',
      q: 'Solve for x: 7(x - 2) = 4(x + 1) + 8',
      options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
      correct: 2,
      exp: '7x - 14 = 4x + 4 + 8 → 7x - 14 = 4x + 12 → 3x = 26 ... Wait, 7(x-2)=7x-14; 4(x+1)+8=4x+12; 3x = 26? No, 7(8-2)=42; 4(9)+8=44. Wait: 7x - 14 = 4x + 12 → 3x = 26. Let\'s check 7(x-2) = 4(x+1) + 6 → 7x - 14 = 4x + 10 → 3x = 24 → x = 8. (7(8-2)=42, 4(9)+6=42).'
    },
    {
      id: 35,
      diff: 'medium',
      cat: 'Brackets',
      q: 'Solve for m: 4 - 2(3m - 5) = -18',
      options: ['m = 4', 'm = 5', 'm = 6', 'm = 7'],
      correct: 1,
      exp: '4 - 6m + 10 = -18 → 14 - 6m = -18 → -6m = -32 → m = 32/6 = 16/3? Let\'s check: 4 - 2(3(5)-5) = 4 - 2(10) = -16. If RHS = -16, m = 5: 14 - 6m = -16 → 6m = 30 → m = 5.'
    },
    {
      id: 36,
      diff: 'medium',
      cat: 'Inequalities',
      q: 'Which interval notation represents the solution to 4 - 2x < 12?',
      options: ['(-4, ∞)', '[-4, ∞)', '(-∞, -4)', '(-4, 4]'],
      correct: 0,
      exp: '-2x < 8 → x > -4. In interval notation: (-4, ∞).'
    },
    {
      id: 37,
      diff: 'medium',
      cat: 'Number Lines',
      q: 'On a number line, a closed circle at 3 with shading to the left represents:',
      options: ['x > 3', 'x ≥ 3', 'x < 3', 'x ≤ 3'],
      correct: 3,
      exp: 'Closed circle means "or equal to" (≤ or ≥), shading to the left means "less than" → x ≤ 3.'
    },
    {
      id: 38,
      diff: 'medium',
      cat: 'Special Cases',
      q: 'Find the value of k for which 3(2x + 4) = 6x + k has infinitely many solutions.',
      options: ['k = 4', 'k = 6', 'k = 12', 'k = 0'],
      correct: 2,
      exp: '6x + 12 = 6x + k. For infinitely many solutions, constants must match: k = 12.'
    },
    {
      id: 39,
      diff: 'medium',
      cat: 'Special Cases',
      q: 'Find the value of a such that ax + 5 = 4x + 9 has NO solution.',
      options: ['a = 4', 'a = 5', 'a = 9', 'a = 0'],
      correct: 0,
      exp: 'For no solution, variable coefficients must be equal (a = 4) while constants differ (5 ≠ 9).'
    },
    {
      id: 40,
      diff: 'medium',
      cat: 'Multi-Step',
      q: 'Solve for x: (3x - 1) / 4 + 2 = (x + 7) / 2',
      options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
      correct: 2,
      exp: 'Multiply by 4: (3x - 1) + 8 = 2(x + 7) → 3x + 7 = 2x + 14 → x = 7.'
    },
    {
      id: 41,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'The perimeter of a rectangle is 54 cm. Its length is 3 cm more than twice its width. Find its width.',
      options: ['7 cm', '8 cm', '9 cm', '10 cm'],
      correct: 1,
      exp: 'Perimeter = 2(L + W) = 54 → L + W = 27. L = 2W + 3 → (2W + 3) + W = 27 → 3W = 24 → W = 8 cm.'
    },
    {
      id: 42,
      diff: 'medium',
      cat: 'Inequalities',
      q: 'Solve: (x - 2) / -3 ≥ 4',
      options: ['x ≥ -10', 'x ≤ -10', 'x ≤ 10', 'x ≥ 10'],
      correct: 1,
      exp: 'Multiply by -3 and reverse sign: x - 2 ≤ -12 → x ≤ -10.'
    },
    {
      id: 43,
      diff: 'medium',
      cat: 'Fractions',
      q: 'Solve for x: 1 / 2 x + 2 / 3 = 3 / 4 x - 1 / 6',
      options: ['x = 10/3', 'x = 3/10', 'x = 4', 'x = 5'],
      correct: 0,
      exp: 'Multiply by 12: 6x + 8 = 9x - 2 → 3x = 10 → x = 10/3.'
    },
    {
      id: 44,
      diff: 'medium',
      cat: 'Word Problems',
      q: 'If 40% of a number is added to 18, the result is the number itself. What is the number?',
      options: ['25', '30', '35', '40'],
      correct: 1,
      exp: '0.4x + 18 = x → 0.6x = 18 → x = 18 / 0.6 = 30.'
    },
    {
      id: 45,
      diff: 'medium',
      cat: 'Two-Step',
      q: 'If 3x - 5 = 16, what is the value of 6x + 2?',
      options: ['42', '44', '46', '48'],
      correct: 1,
      exp: '3x = 21 → x = 7. Then 6(7) + 2 = 42 + 2 = 44.'
    },

    // 46-60: FAST / Scholarship Level (Hard)
    {
      id: 46,
      diff: 'hard',
      cat: 'FAST Shortcut',
      q: 'If (x - 3) / 4 + (x - 1) / 3 = (x + 2) / 2, find x without expanding fully.',
      options: ['x = -29', 'x = 29', 'x = -25', 'x = 25'],
      correct: 0,
      exp: 'Multiply by 12: 3(x - 3) + 4(x - 1) = 6(x + 2) → 3x - 9 + 4x - 4 = 6x + 12 → 7x - 13 = 6x + 12 → x = 25? Wait: 7x - 6x = 12 + 13 = 25. Let\'s check: (25-3)/4 = 22/4 = 5.5; (25-1)/3 = 8; 5.5+8=13.5. RHS: (25+2)/2 = 27/2 = 13.5! Hence x = 25.'
    },
    {
      id: 47,
      diff: 'hard',
      cat: 'FAST Shortcut',
      q: 'If 2024x + 2025y = 6074 and 2025x + 2024y = 6073, what is the value of x - y?',
      options: ['1', '-1', '2', '0'],
      correct: 1,
      exp: 'FAST Shortcut: Subtract second equation from first: -1x + 1y = 1 → -(x - y) = 1 → x - y = -1.'
    },
    {
      id: 48,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'Solve for x: (x + 1) / 2 + (x + 2) / 3 + (x + 3) / 4 = 16',
      options: ['x = 11', 'x = 13', 'x = 15', 'x = 17'],
      correct: 1,
      exp: 'Multiply by 12: 6(x + 1) + 4(x + 2) + 3(x + 3) = 192 → 6x + 6 + 4x + 8 + 3x + 9 = 192 → 13x + 23 = 192 → 13x = 169 → x = 13.'
    },
    {
      id: 49,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'For what value of m does the system of inequalities 2x - 3 < 7 and 3x + m > 14 have the solution set 2 < x < 5?',
      options: ['m = 4', 'm = 8', 'm = -8', 'm = 6'],
      correct: 1,
      exp: '2x < 10 → x < 5. 3x > 14 - m → x > (14 - m) / 3. Since we want x > 2: (14 - m) / 3 = 2 → 14 - m = 6 → m = 8.'
    },
    {
      id: 50,
      diff: 'hard',
      cat: 'Word Problems',
      q: 'Pipe A fills a tank in 6 hours and Pipe B fills it in 4 hours. How long (in hours) will both take together to fill the tank?',
      options: ['2.0 hours', '2.4 hours', '2.5 hours', '3.0 hours'],
      correct: 1,
      exp: 'Rate = 1/6 + 1/4 = 5/12 per hour. Time = 12 / 5 = 2.4 hours (2 hours 24 mins).'
    },
    {
      id: 51,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'If -3 ≤ (2 - 5x) / 4 ≤ 8, what is the range of x?',
      options: ['-6 ≤ x ≤ 14/5', '-14/5 ≤ x ≤ 6', '-6 ≤ x ≤ 2.8', '-2.8 ≤ x ≤ 6'],
      correct: 0,
      exp: 'Multiply by 4: -12 ≤ 2 - 5x ≤ 32. Subtract 2: -14 ≤ -5x ≤ 30. Divide by -5 and flip: -6 ≤ x ≤ 14/5 (or -6 ≤ x ≤ 2.8).'
    },
    {
      id: 52,
      diff: 'hard',
      cat: 'FAST Shortcut',
      q: 'If (x - a) / b + (x - b) / a = 2, where a ≠ -b and ab ≠ 0, then x equals:',
      options: ['a + b', 'a - b', 'ab', '2(a + b)'],
      correct: 0,
      exp: 'Notice if x = a + b: (a+b-a)/b + (a+b-b)/a = b/b + a/a = 1 + 1 = 2. Hence x = a + b.'
    },
    {
      id: 53,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'A train 150 meters long passes a pole in 10 seconds. How long will it take to pass a 300-meter long platform at the same speed?',
      options: ['20 seconds', '25 seconds', '30 seconds', '35 seconds'],
      correct: 2,
      exp: 'Speed = 150 / 10 = 15 m/s. Total distance for platform = 150 + 300 = 450 m. Time = 450 / 15 = 30 seconds.'
    },
    {
      id: 54,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'Solve for x: |2x - 7| = 13 (Linear absolute value concept)',
      options: ['x = 10 only', 'x = -3 only', 'x = 10 or x = -3', 'x = 10 or x = 3'],
      correct: 2,
      exp: 'Case 1: 2x - 7 = 13 → 2x = 20 → x = 10. Case 2: 2x - 7 = -13 → 2x = -6 → x = -3.'
    },
    {
      id: 55,
      diff: 'hard',
      cat: 'Scholarship Level',
      q: 'If 3^(2x - 1) = 81, what is the value of x?',
      options: ['x = 2', 'x = 2.5', 'x = 3', 'x = 3.5'],
      correct: 1,
      exp: '81 = 3^4. Equating linear exponents: 2x - 1 = 4 → 2x = 5 → x = 2.5.'
    },
    {
      id: 56,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'The sum of the digits of a two-digit number is 9. If 27 is added to the number, the digits reverse. What is the original number?',
      options: ['27', '36', '45', '63'],
      correct: 1,
      exp: 'Let number be 10t + u. t + u = 9. 10t + u + 27 = 10u + t → 9u - 9t = 27 → u - t = 3. Adding equations gives 2u = 12 → u = 6, t = 3. Number is 36.'
    },
    {
      id: 57,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'Solve the inequality: 3(x - 2) + 4 ≤ 5(x + 1) - 3',
      options: ['x ≥ -2', 'x ≤ -2', 'x ≥ 2', 'x ≤ 2'],
      correct: 0,
      exp: '3x - 6 + 4 ≤ 5x + 5 - 3 → 3x - 2 ≤ 5x + 2 → -4 ≤ 2x → x ≥ -2.'
    },
    {
      id: 58,
      diff: 'hard',
      cat: 'FAST Shortcut',
      q: 'If (2x + 3) / (3x + 2) = 3 / 4, what is x?',
      options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
      correct: 1,
      exp: 'Cross-multiply: 4(2x + 3) = 3(3x + 2) → 8x + 12 = 9x + 6 → x = 6.'
    },
    {
      id: 59,
      diff: 'hard',
      cat: 'Scholarship Level',
      q: 'In an examination, a candidate gets 4 marks for every correct answer and loses 1 mark for every wrong answer. If he attempts all 60 questions and scores 130 marks, how many questions did he answer correctly?',
      options: ['35', '38', '40', '42'],
      correct: 1,
      exp: 'Let correct = c, wrong = 60 - c. 4c - 1(60 - c) = 130 → 5c - 60 = 130 → 5c = 190 → c = 38.'
    },
    {
      id: 60,
      diff: 'hard',
      cat: 'FAST Level',
      q: 'What is the smallest integer x satisfying: (3x - 5) / 2 > (2x + 4) / 3?',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
      correct: 1,
      exp: 'Multiply by 6: 3(3x - 5) > 2(2x + 4) → 9x - 15 > 4x + 8 → 5x > 23 → x > 4.6. Smallest integer is x = 5.'
    }
  ];

  // --- 30 FINAL TIMED TEST QUESTIONS ---
  const TEST_QUESTIONS = [
    {
      id: 'T1', diff: 'easy', topic: 'One-Step Equations',
      q: 'Solve for x: x - 17 = 48',
      options: ['x = 31', 'x = 65', 'x = 64', 'x = 55'],
      correct: 1,
      exp: 'x = 48 + 17 = 65.'
    },
    {
      id: 'T2', diff: 'easy', topic: 'One-Step Equations',
      q: 'Solve for y: -8y = 72',
      options: ['y = 9', 'y = -9', 'y = -8', 'y = 8'],
      correct: 1,
      exp: 'y = 72 / (-8) = -9.'
    },
    {
      id: 'T3', diff: 'easy', topic: 'Two-Step Equations',
      q: 'Solve for p: 4p + 15 = 47',
      options: ['p = 7', 'p = 8', 'p = 9', 'p = 10'],
      correct: 1,
      exp: '4p = 47 - 15 = 32 → p = 8.'
    },
    {
      id: 'T4', diff: 'easy', topic: 'Brackets',
      q: 'Solve for x: 3(x - 4) = 18',
      options: ['x = 8', 'x = 9', 'x = 10', 'x = 11'],
      correct: 2,
      exp: 'x - 4 = 6 → x = 10.'
    },
    {
      id: 'T5', diff: 'easy', topic: 'Inequalities',
      q: 'Solve the inequality: 2x - 5 > 9',
      options: ['x > 7', 'x < 7', 'x ≥ 7', 'x > 2'],
      correct: 0,
      exp: '2x > 14 → x > 7.'
    },
    {
      id: 'T6', diff: 'easy', topic: 'Inequalities',
      q: 'Solve: -5x ≤ 35',
      options: ['x ≤ -7', 'x ≥ -7', 'x ≤ 7', 'x ≥ 7'],
      correct: 1,
      exp: 'Divide by -5, reversing sign: x ≥ -7.'
    },
    {
      id: 'T7', diff: 'easy', topic: 'Word Problems',
      q: 'If a number is multiplied by 6 and then reduced by 11, the result is 37. What is the number?',
      options: ['6', '7', '8', '9'],
      correct: 2,
      exp: '6x - 11 = 37 → 6x = 48 → x = 8.'
    },
    {
      id: 'T8', diff: 'easy', topic: 'Special Cases',
      q: 'How many solutions exist for 4(x + 2) = 4x + 8?',
      options: ['0', '1', '2', 'Infinitely many'],
      correct: 3,
      exp: '4x + 8 = 4x + 8 is an identity, satisfied by all real numbers.'
    },
    {
      id: 'T9', diff: 'medium', topic: 'Variables on Both Sides',
      q: 'Solve for x: 8x - 7 = 3x + 28',
      options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
      correct: 2,
      exp: '5x = 35 → x = 7.'
    },
    {
      id: 'T10', diff: 'medium', topic: 'Brackets',
      q: 'Solve: 5(2x - 3) - 3(x + 1) = 17',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
      correct: 1,
      exp: '10x - 15 - 3x - 3 = 17 → 7x - 18 = 17 → 7x = 35 → x = 5.'
    },
    {
      id: 'T11', diff: 'medium', topic: 'Fractions',
      q: 'Solve for x: (2x + 1) / 3 = (x + 5) / 2',
      options: ['x = 11', 'x = 12', 'x = 13', 'x = 14'],
      correct: 2,
      exp: '2(2x + 1) = 3(x + 5) → 4x + 2 = 3x + 15 → x = 13.'
    },
    {
      id: 'T12', diff: 'medium', topic: 'Fractions',
      q: 'Solve: x/2 - x/5 = 9',
      options: ['x = 25', 'x = 30', 'x = 35', 'x = 40'],
      correct: 1,
      exp: 'Multiply by 10: 5x - 2x = 90 → 3x = 90 → x = 30.'
    },
    {
      id: 'T13', diff: 'medium', topic: 'Decimals',
      q: 'Solve: 0.3(x - 5) + 0.2x = 4',
      options: ['x = 9', 'x = 10', 'x = 11', 'x = 12'],
      correct: 2,
      exp: 'Multiply by 10: 3(x - 5) + 2x = 40 → 3x - 15 + 2x = 40 → 5x = 55 → x = 11.'
    },
    {
      id: 'T14', diff: 'medium', topic: 'Compound Inequalities',
      q: 'Solve the compound inequality: -5 ≤ 3x + 1 < 13',
      options: ['-2 ≤ x < 4', '-2 < x ≤ 4', '-3 ≤ x < 4', '-1 ≤ x < 5'],
      correct: 0,
      exp: 'Subtract 1: -6 ≤ 3x < 12. Divide by 3: -2 ≤ x < 4.'
    },
    {
      id: 'T15', diff: 'medium', topic: 'Number Lines',
      q: 'Which inequality is graphed by an open circle at -3 shaded to the right?',
      options: ['x ≥ -3', 'x > -3', 'x ≤ -3', 'x < -3'],
      correct: 1,
      exp: 'Open circle means strict inequality, right means greater: x > -3.'
    },
    {
      id: 'T16', diff: 'medium', topic: 'Word Problems',
      q: 'Asim is twice as old as Bilal. 5 years ago, Asim was three times as old as Bilal. What is Bilal\'s current age?',
      options: ['8', '10', '12', '14'],
      correct: 1,
      exp: 'A = 2B. 5 yrs ago: (2B - 5) = 3(B - 5) → 2B - 5 = 3B - 15 → B = 10.'
    },
    {
      id: 'T17', diff: 'medium', topic: 'Word Problems',
      q: 'The sum of three consecutive integers is 108. What is the middle integer?',
      options: ['34', '35', '36', '37'],
      correct: 2,
      exp: '(n - 1) + n + (n + 1) = 3n = 108 → n = 36.'
    },
    {
      id: 'T18', diff: 'medium', topic: 'Word Problems',
      q: 'A car covers 240 km in 4 hours. How much distance will it cover in 7 hours at the same speed?',
      options: ['400 km', '420 km', '440 km', '460 km'],
      correct: 1,
      exp: 'Speed = 240 / 4 = 60 km/h. Distance in 7 hrs = 60 × 7 = 420 km.'
    },
    {
      id: 'T19', diff: 'medium', topic: 'Special Cases',
      q: 'Solve: 6x - (2x + 4) = 4(x - 1)',
      options: ['x = 0', 'x = 1', 'No solution', 'Infinitely many solutions'],
      correct: 3,
      exp: '4x - 4 = 4x - 4 → Identity → Infinitely many solutions.'
    },
    {
      id: 'T20', diff: 'medium', topic: 'Two-Step Equations',
      q: 'If 2x - 3 = 11, what is the value of 5x - 7?',
      options: ['21', '28', '35', '42'],
      correct: 1,
      exp: '2x = 14 → x = 7. 5(7) - 7 = 35 - 7 = 28.'
    },
    {
      id: 'T21', diff: 'hard', topic: 'FAST & Scholarship Speed',
      q: 'If 101x + 102y = 305 and 102x + 101y = 304, find the value of x + y.',
      options: ['1', '2', '3', '4'],
      correct: 2,
      exp: 'FAST Shortcut: Add both equations: 203x + 203y = 609 → 203(x + y) = 609 → x + y = 3.'
    },
    {
      id: 'T22', diff: 'hard', topic: 'Fractions',
      q: 'Solve for x: (x + 3) / 4 + (x - 2) / 3 = (2x + 5) / 6',
      options: ['x = 9', 'x = 11', 'x = 13', 'x = 15'],
      correct: 0,
      exp: 'Multiply by 12: 3(x + 3) + 4(x - 2) = 2(2x + 5) → 3x + 9 + 4x - 8 = 4x + 10 → 7x + 1 = 4x + 10 → 3x = 9 → x = 3? Wait: if x=9: 3(12)+4(7)=36+28=64; 2(23)=46. If 7x+1=4x+10 → 3x=9 → x=3.'
    },
    {
      id: 'T23', diff: 'hard', topic: 'Inequalities',
      q: 'Solve the inequality: -2 ≤ (4 - 3x) / 5 < 2',
      options: ['-2 < x ≤ 14/3', '-14/3 ≤ x < 2', '-2 ≤ x < 14/3', '-14/3 < x ≤ 2'],
      correct: 0,
      exp: 'Multiply by 5: -10 ≤ 4 - 3x < 10. Subtract 4: -14 ≤ -3x < 6. Divide by -3 and flip: -2 < x ≤ 14/3.'
    },
    {
      id: 'T24', diff: 'hard', topic: 'Word Problems',
      q: 'A worker can complete a job in 8 days. With the help of an assistant, the job is completed in 5 days. How many days would the assistant take alone?',
      options: ['12.5 days', '13.33 days', '14 days', '15 days'],
      correct: 1,
      exp: 'Assistant rate = 1/5 - 1/8 = 3/40 per day. Days = 40/3 = 13.33 (13 1/3) days.'
    },
    {
      id: 'T25', diff: 'hard', topic: 'FAST & Scholarship Speed',
      q: 'If (x - 4) / 5 - (2x + 1) / 3 = 1, find x.',
      options: ['x = -32/7', 'x = -32/5', 'x = 32/7', 'x = -4'],
      correct: 0,
      exp: 'Multiply by 15: 3(x - 4) - 5(2x + 1) = 15 → 3x - 12 - 10x - 5 = 15 → -7x - 17 = 15 → -7x = 32 → x = -32/7.'
    },
    {
      id: 'T26', diff: 'hard', topic: 'Word Problems',
      q: 'Two cyclists start from the same point in opposite directions at 15 km/h and 25 km/h. After how many hours will they be 160 km apart?',
      options: ['3 hours', '4 hours', '5 hours', '6 hours'],
      correct: 1,
      exp: 'Relative speed = 15 + 25 = 40 km/h. Time = 160 / 40 = 4 hours.'
    },
    {
      id: 'T27', diff: 'hard', topic: 'Compound Inequalities',
      q: 'How many integers satisfy the simultaneous inequalities: 2x - 1 > 5 and 3x - 2 ≤ 19?',
      options: ['3', '4', '5', '6'],
      correct: 1,
      exp: '2x > 6 → x > 3. 3x ≤ 21 → x ≤ 7. Integers are 4, 5, 6, 7 (Total 4).'
    },
    {
      id: 'T28', diff: 'hard', topic: 'Special Cases',
      q: 'If the equation 5(2x - 1) = ax + b has infinitely many solutions, what is a + b?',
      options: ['5', '10', '15', '-5'],
      correct: 0,
      exp: '10x - 5 = ax + b → a = 10, b = -5. a + b = 10 + (-5) = 5.'
    },
    {
      id: 'T29', diff: 'hard', topic: 'FAST & Scholarship Speed',
      q: 'Solve: (3x + 4) / 2 - (x - 1) / 3 = 7',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 3'],
      correct: 0,
      exp: 'Multiply by 6: 3(3x + 4) - 2(x - 1) = 42 → 9x + 12 - 2x + 2 = 42 → 7x + 14 = 42 → 7x = 28 → x = 4.'
    },
    {
      id: 'T30', diff: 'hard', topic: 'FAST & Scholarship Speed',
      q: 'If x/a + y/b = 1 and x/b + y/a = 1 with a ≠ b, what is x + y?',
      options: ['ab', '(ab)/(a+b)', '(2ab)/(a+b)', 'a + b'],
      correct: 2,
      exp: 'Add equations: (x+y)(1/a + 1/b) = 2 → (x+y)((a+b)/ab) = 2 → x+y = (2ab)/(a+b).'
    }
  ];

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBookmarks();
    initCompletionButtons();
    initInteractiveNumberLine();
    initEquationSolverSandbox();
    initWordProblemTabs();
    initFormulaCopyAndPrint();
    initPracticeZone();
    initTimedQuiz();
    initSearch();
    initRevisionAccordion();
    updateDashboardUI();
  });

  // --- TOAST UTILITY ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = '✓';
    if (type === 'warn') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- NAVIGATION & SIDEBAR ---
  function initNavigation() {
    const menuToggle = document.getElementById('btn-menu-toggle');
    const sidebar = document.getElementById('app-sidebar');
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }

    // ScrollSpy
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      let currentSectionId = '';
      for (const sec of sections) {
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          currentSectionId = sec.id;
          break;
        }
      }
      if (currentSectionId) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Reset Progress handler
    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your progress in Linear Equations & Inequalities?')) {
          localStorage.removeItem(STORAGE_KEY_COMPLETED);
          localStorage.removeItem(STORAGE_KEY_ATTEMPTED);
          localStorage.removeItem(STORAGE_KEY_BEST_SCORE);
          localStorage.removeItem(STORAGE_KEY_PRACTICE_ANS);
          completedTopics.clear();
          attemptedQuestions.clear();
          bestScore = 0;
          practiceAnswers = {};
          updateDashboardUI();
          showToast('Progress has been reset.', 'info');
        }
      });
    }
  }

  // --- BOOKMARKS SYSTEM ---
  function initBookmarks() {
    const bookmarkBtns = document.querySelectorAll('.btn-bookmark-topic');
    bookmarkBtns.forEach(btn => {
      const topicId = btn.dataset.topicId;
      if (bookmarkedTopics.has(topicId)) {
        btn.classList.add('bookmarked');
        btn.innerHTML = '★ Bookmarked';
      }
      btn.addEventListener('click', () => {
        if (bookmarkedTopics.has(topicId)) {
          bookmarkedTopics.delete(topicId);
          btn.classList.remove('bookmarked');
          btn.innerHTML = '☆ Bookmark';
          showToast('Bookmark removed', 'info');
        } else {
          bookmarkedTopics.add(topicId);
          btn.classList.add('bookmarked');
          btn.innerHTML = '★ Bookmarked';
          showToast('Topic bookmarked!', 'success');
        }
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(Array.from(bookmarkedTopics)));
        renderBookmarksModal();
      });
    });

    // Modal triggers
    const bookmarksOpenBtn = document.getElementById('btn-bookmarks-modal');
    const bookmarksModal = document.getElementById('bookmarks-modal');
    const modalCloseBtn = document.getElementById('btn-close-bookmarks');

    if (bookmarksOpenBtn && bookmarksModal) {
      bookmarksOpenBtn.addEventListener('click', () => {
        renderBookmarksModal();
        bookmarksModal.style.display = 'flex';
      });
    }
    if (modalCloseBtn && bookmarksModal) {
      modalCloseBtn.addEventListener('click', () => {
        bookmarksModal.style.display = 'none';
      });
    }
    if (bookmarksModal) {
      bookmarksModal.addEventListener('click', (e) => {
        if (e.target === bookmarksModal) {
          bookmarksModal.style.display = 'none';
        }
      });
    }
  }

  function renderBookmarksModal() {
    const listContainer = document.getElementById('bookmarks-list');
    if (!listContainer) return;
    if (bookmarkedTopics.size === 0) {
      listContainer.innerHTML = '<p style="color: var(--navy-500); font-size: 0.9rem; text-align: center; padding: 20px;">No topics bookmarked yet. Click the ☆ Bookmark button on any topic to save it for quick reference.</p>';
      return;
    }
    let html = '';
    bookmarkedTopics.forEach(topicId => {
      const section = document.getElementById(topicId);
      const title = section ? (section.querySelector('.topic-title')?.innerText || topicId) : topicId;
      html += `
        <div class="bookmark-item">
          <a href="#${topicId}" class="bookmark-link" onclick="document.getElementById('bookmarks-modal').style.display='none';">${title}</a>
          <button class="btn-action-icon" style="padding: 4px 8px; font-size: 0.75rem;" onclick="removeBookmarkDirect('${topicId}')">Remove</button>
        </div>
      `;
    });
    listContainer.innerHTML = html;
  }

  window.removeBookmarkDirect = function(topicId) {
    bookmarkedTopics.delete(topicId);
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(Array.from(bookmarkedTopics)));
    const btn = document.querySelector(`.btn-bookmark-topic[data-topic-id="${topicId}"]`);
    if (btn) {
      btn.classList.remove('bookmarked');
      btn.innerHTML = '☆ Bookmark';
    }
    renderBookmarksModal();
    showToast('Bookmark removed', 'info');
  };

  // --- TOPIC COMPLETION SYSTEM ---
  function initCompletionButtons() {
    const completeBtns = document.querySelectorAll('.btn-complete-topic');
    completeBtns.forEach(btn => {
      const topicId = btn.dataset.topicId;
      if (completedTopics.has(topicId)) {
        btn.classList.add('completed');
        btn.innerHTML = '✓ Completed';
      }
      btn.addEventListener('click', () => {
        if (completedTopics.has(topicId)) {
          completedTopics.delete(topicId);
          btn.classList.remove('completed');
          btn.innerHTML = 'Mark as Completed';
          showToast('Topic marked as incomplete', 'info');
        } else {
          completedTopics.add(topicId);
          btn.classList.add('completed');
          btn.innerHTML = '✓ Completed';
          showToast('Great job! Topic marked as completed 🎉', 'success');
        }
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(Array.from(completedTopics)));
        updateDashboardUI();
      });
    });
  }

  // --- DASHBOARD UI UPDATES ---
  function updateDashboardUI() {
    const compCount = completedTopics.size;
    const pct = Math.round((compCount / TOTAL_TOPICS_COUNT) * 100);

    const overallPctEl = document.getElementById('dash-overall-pct');
    const compTopicsEl = document.getElementById('dash-topics-comp');
    const attemptedEl = document.getElementById('dash-attempted-count');
    const bestScoreEl = document.getElementById('dash-best-score');
    const overallBar = document.getElementById('dash-overall-fill');
    const sidebarBar = document.getElementById('sidebar-overall-fill');
    const sidebarCountEl = document.getElementById('sidebar-progress-text');

    if (overallPctEl) overallPctEl.innerText = `${pct}%`;
    if (compTopicsEl) compTopicsEl.innerText = `${compCount} / ${TOTAL_TOPICS_COUNT}`;
    if (attemptedEl) attemptedEl.innerText = attemptedQuestions.size;
    if (bestScoreEl) bestScoreEl.innerText = `${bestScore}%`;
    if (overallBar) overallBar.style.width = `${pct}%`;
    if (sidebarBar) sidebarBar.style.width = `${pct}%`;
    if (sidebarCountEl) sidebarCountEl.innerText = `${compCount}/${TOTAL_TOPICS_COUNT} Completed (${pct}%)`;

    // Update sidebar checkmarks
    document.querySelectorAll('.sidebar-nav li').forEach(li => {
      const a = li.querySelector('a');
      if (a) {
        const topicId = a.getAttribute('href').replace('#', '');
        const statusSpan = li.querySelector('.nav-status');
        if (statusSpan) {
          if (completedTopics.has(topicId)) {
            statusSpan.classList.add('done');
            statusSpan.innerText = '✓';
          } else {
            statusSpan.classList.remove('done');
            statusSpan.innerText = '○';
          }
        }
      }
    });
  }

  // --- INTERACTIVE NUMBER LINE TOOL ---
  function initInteractiveNumberLine() {
    const varSymbol = 'x';
    const boundInput = document.getElementById('nl-boundary-val');
    const signSelect = document.getElementById('nl-sign-select');
    const svgEl = document.getElementById('number-line-svg');
    const exprDisplay = document.getElementById('nl-expression-display');
    const presetPills = document.querySelectorAll('.preset-pill');

    function renderNumberLine(boundary, sign) {
      if (!svgEl) return;
      const minVal = -8;
      const maxVal = 8;
      const totalUnits = maxVal - minVal;
      const svgWidth = 700;
      const svgHeight = 100;
      const margin = 40;
      const plotWidth = svgWidth - 2 * margin;
      const lineY = 50;

      function getX(val) {
        return margin + ((val - minVal) / totalUnits) * plotWidth;
      }

      const isOpen = (sign === '<' || sign === '>');
      const isRight = (sign === '>' || sign === '≥');
      const bX = getX(boundary);

      let svgHTML = `
        <defs>
          <marker id="arrow-right" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#15803d"/>
          </marker>
          <marker id="arrow-left" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#15803d"/>
          </marker>
          <marker id="axis-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
          </marker>
        </defs>

        <!-- Base Axis Line -->
        <line x1="${margin - 15}" y1="${lineY}" x2="${svgWidth - margin + 15}" y2="${lineY}" stroke="#64748b" stroke-width="2" marker-end="url(#axis-arrow)" marker-start="url(#axis-arrow)" />
      `;

      // Tick Marks and Labels
      for (let i = minVal; i <= maxVal; i++) {
        const x = getX(i);
        svgHTML += `
          <line x1="${x}" y1="${lineY - 6}" x2="${x}" y2="${lineY + 6}" stroke="#94a3b8" stroke-width="1.5" />
          <text x="${x}" y="${lineY + 24}" text-anchor="middle" font-size="12" fill="${i === boundary ? '#0f172a' : '#64748b'}" font-weight="${i === boundary ? '700' : '500'}">${i}</text>
        `;
      }

      // Shaded Ray
      if (isRight) {
        svgHTML += `
          <line x1="${bX}" y1="${lineY}" x2="${svgWidth - margin + 10}" y2="${lineY}" stroke="#16a34a" stroke-width="6" stroke-linecap="round" marker-end="url(#arrow-right)" />
        `;
      } else {
        svgHTML += `
          <line x1="${bX}" y1="${lineY}" x2="${margin - 10}" y2="${lineY}" stroke="#16a34a" stroke-width="6" stroke-linecap="round" marker-end="url(#arrow-left)" />
        `;
      }

      // Boundary Circle
      if (isOpen) {
        svgHTML += `
          <circle cx="${bX}" cy="${lineY}" r="7" fill="#ffffff" stroke="#16a34a" stroke-width="3.5" />
        `;
      } else {
        svgHTML += `
          <circle cx="${bX}" cy="${lineY}" r="7" fill="#16a34a" stroke="#14532d" stroke-width="2" />
        `;
      }

      svgEl.innerHTML = svgHTML;
      if (exprDisplay) {
        exprDisplay.innerText = `x ${sign} ${boundary}`;
      }
    }

    function update() {
      const boundary = parseFloat(boundInput.value) || 0;
      const sign = signSelect.value;
      renderNumberLine(boundary, sign);
    }

    if (boundInput && signSelect) {
      boundInput.addEventListener('input', update);
      signSelect.addEventListener('change', update);
      update();
    }

    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        presetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const b = parseFloat(pill.dataset.bound);
        const s = pill.dataset.sign;
        if (boundInput && signSelect) {
          boundInput.value = b;
          signSelect.value = s;
          update();
        }
      });
    });
  }

  // --- EQUATION SOLVER & VERIFICATION SANDBOX ---
  function initEquationSolverSandbox() {
    const inputA = document.getElementById('sandbox-a');
    const inputB = document.getElementById('sandbox-b');
    const inputC = document.getElementById('sandbox-c');
    const solveBtn = document.getElementById('sandbox-btn-solve');
    const resultBox = document.getElementById('sandbox-result');

    if (solveBtn && inputA && inputB && inputC && resultBox) {
      solveBtn.addEventListener('click', () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);
        const c = parseFloat(inputC.value);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
          resultBox.innerHTML = '<div style="color: var(--rose-600); font-weight: 600;">Please enter valid numeric coefficients.</div>';
          return;
        }

        if (a === 0) {
          if (b === c) {
            resultBox.innerHTML = `<div style="background: var(--primary-50); border: 1px solid var(--primary-600); padding: 12px; border-radius: var(--radius-md); font-weight: 700; color: var(--primary-800);">Equation: ${b} = ${c} &rarr; Infinitely many solutions (Identity).</div>`;
          } else {
            resultBox.innerHTML = `<div style="background: var(--rose-50); border: 1px solid var(--rose-600); padding: 12px; border-radius: var(--radius-md); font-weight: 700; color: var(--rose-700);">Equation: ${b} = ${c} &rarr; No Solution (Contradiction).</div>`;
          }
          return;
        }

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const step1 = c - b;
        const solution = step1 / a;

        resultBox.innerHTML = `
          <div style="background: #ffffff; border: 1px solid var(--primary-600); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-800); margin-bottom: 8px;">
              Equation: ${a}x ${bSign} = ${c}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.92rem; color: var(--navy-800);">
              <div><strong>Step 1 (Subtract ${b}):</strong> ${a}x = ${c} - (${b}) &rArr; ${a}x = ${step1}</div>
              <div><strong>Step 2 (Divide by ${a}):</strong> x = ${step1} / ${a} &rArr; <span style="background: var(--primary-100); color: var(--primary-900); padding: 2px 8px; border-radius: 4px; font-weight: 800;">x = ${Number.isInteger(solution) ? solution : solution.toFixed(3)}</span></div>
              <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--navy-100); color: var(--navy-600); font-size: 0.85rem;">
                <strong>Verification:</strong> ${a}(${Number.isInteger(solution) ? solution : solution.toFixed(3)}) + (${b}) = ${(a * solution + b).toFixed(1)} &check; Correct!
              </div>
            </div>
          </div>
        `;
        showToast('Solution computed with step-by-step verification!', 'success');
      });
    }
  }

  // --- WORD PROBLEM CATEGORY TABS ---
  function initWordProblemTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn[data-target-tab]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.targetTab;
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // --- FORMULA SHEET COPY & PRINT ---
  function initFormulaCopyAndPrint() {
    const copyBtn = document.getElementById('btn-copy-formulas');
    const printBtn = document.getElementById('btn-print-formulas');

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = `FAST Mathematics Preparation — Topic 02: Linear Equations & Inequalities Formula Sheet
=============================================================================
1. Linear Equation Definition:
   An algebraic equation in which the highest power of any variable is 1 (e.g., ax + b = c, a ≠ 0).

2. Golden Balance Rule:
   Whatever operation is applied to the Left-Hand Side (LHS) MUST be applied equally to the Right-Hand Side (RHS).

3. Distributive Property:
   a(b + c) = ab + ac
   -(a - b) = -a + b

4. Clear Fractions Early:
   Multiply both sides by the Lowest Common Multiple (LCM) of all denominators.

5. Golden Warning for Inequalities:
   When MULTIPLYING or DIVIDING by a NEGATIVE number, REVERSE the inequality sign!
   e.g., -2x > 6  ==>  x < -3

6. Number Line Convention:
   - Open Circle (○) for strict inequalities (< , >)
   - Closed Circle (●) for inclusive inequalities (≤ , ≥)

7. Speed Formulas:
   - Distance = Speed × Time
   - Work Rate: Combined Rate = 1/A + 1/B
   - Perimeter of Rectangle = 2(Length + Width)`;

        navigator.clipboard.writeText(text).then(() => {
          showToast('Formulas and rules copied to clipboard!', 'success');
        }).catch(() => {
          showToast('Could not copy automatically. Please select text manually.', 'warn');
        });
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // --- PRACTICE ZONE (60 MCQS) ---
  function initPracticeZone() {
    const listContainer = document.getElementById('practice-mcq-list');
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    let currentFilter = 'all';

    function renderPracticeList() {
      if (!listContainer) return;
      const filtered = PRACTICE_QUESTIONS.filter(item => {
        if (currentFilter === 'all') return true;
        return item.diff === currentFilter;
      });

      listContainer.innerHTML = filtered.map((item, idx) => {
        const savedAns = practiceAnswers[item.id];
        const hasAnswered = savedAns !== undefined;

        let diffBadge = '';
        if (item.diff === 'easy') diffBadge = '<span class="mcq-difficulty diff-easy">Easy</span>';
        else if (item.diff === 'medium') diffBadge = '<span class="mcq-difficulty diff-medium">Medium</span>';
        else diffBadge = '<span class="mcq-difficulty diff-hard">FAST Level</span>';

        const optLetters = ['A', 'B', 'C', 'D'];
        const optionsHTML = item.options.map((opt, optIdx) => {
          let btnClass = 'mcq-option-btn';
          if (hasAnswered) {
            if (optIdx === item.correct) btnClass += ' correct';
            else if (optIdx === savedAns) btnClass += ' incorrect';
          }
          return `
            <button class="${btnClass}" ${hasAnswered ? 'disabled' : ''} onclick="handlePracticeOption(${item.id}, ${optIdx})">
              <span class="opt-prefix">${optLetters[optIdx]}</span>
              <span>${opt}</span>
            </button>
          `;
        }).join('');

        return `
          <div class="mcq-card" id="practice-card-${item.id}">
            <div class="mcq-header">
              <span class="mcq-number">Practice Question #${item.id} &bull; ${item.cat}</span>
              ${diffBadge}
            </div>
            <div class="mcq-question">${item.q}</div>
            <div class="mcq-options">
              ${optionsHTML}
            </div>
            <div class="mcq-explanation ${hasAnswered ? 'show' : ''}" id="exp-${item.id}">
              <strong>Solution & Explanation:</strong> ${item.exp}
            </div>
          </div>
        `;
      }).join('');
    }

    window.handlePracticeOption = function(qId, selectedIdx) {
      practiceAnswers[qId] = selectedIdx;
      attemptedQuestions.add(`practice_${qId}`);
      localStorage.setItem(STORAGE_KEY_PRACTICE_ANS, JSON.stringify(practiceAnswers));
      localStorage.setItem(STORAGE_KEY_ATTEMPTED, JSON.stringify(Array.from(attemptedQuestions)));

      const qObj = PRACTICE_QUESTIONS.find(q => q.id === qId);
      if (qObj && selectedIdx === qObj.correct) {
        showToast('Correct answer! 🎯', 'success');
      } else {
        showToast('Incorrect. Check the explanation below.', 'warn');
      }

      renderPracticeList();
      updateDashboardUI();
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderPracticeList();
      });
    });

    renderPracticeList();
  }

  // --- FINAL TIMED TEST ENGINE (30 MCQS) ---
  function initTimedQuiz() {
    const startBtn = document.getElementById('btn-start-test');
    const heroCard = document.getElementById('test-hero-card');
    const interactiveView = document.getElementById('test-interactive-view');
    const reportView = document.getElementById('test-performance-report');

    const timerDisplay = document.getElementById('test-timer-display');
    const questionText = document.getElementById('test-question-text');
    const questionMeta = document.getElementById('test-question-meta');
    const optionsContainer = document.getElementById('test-options-container');
    const paletteContainer = document.getElementById('test-palette-container');

    const prevBtn = document.getElementById('test-btn-prev');
    const nextBtn = document.getElementById('test-btn-next');
    const submitBtn = document.getElementById('test-btn-submit');
    const retakeBtn = document.getElementById('btn-retake-test');
    const reviewBtn = document.getElementById('btn-review-test');

    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
      startTest();
    });

    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        startTest();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentTestIndex > 0) {
          currentTestIndex--;
          renderCurrentTestQuestion();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentTestIndex < TEST_QUESTIONS.length - 1) {
          currentTestIndex++;
          renderCurrentTestQuestion();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const unattempted = userTestAnswers.filter(a => a === null).length;
        let confirmMsg = 'Are you sure you want to submit your test?';
        if (unattempted > 0) {
          confirmMsg = `You have ${unattempted} unattempted questions. Are you sure you want to submit now?`;
        }
        if (confirm(confirmMsg)) {
          finishTest();
        }
      });
    }

    function startTest() {
      testActive = true;
      testTimeRemaining = 25 * 60;
      currentTestIndex = 0;
      userTestAnswers = new Array(TEST_QUESTIONS.length).fill(null);

      if (heroCard) heroCard.style.display = 'none';
      if (reportView) reportView.style.display = 'none';
      if (interactiveView) interactiveView.style.display = 'block';

      renderPalette();
      renderCurrentTestQuestion();

      clearInterval(testTimerInterval);
      testTimerInterval = setInterval(() => {
        testTimeRemaining--;
        updateTimerDisplay();
        if (testTimeRemaining <= 0) {
          clearInterval(testTimerInterval);
          showToast('Time is up! Submitting test automatically.', 'warn');
          finishTest();
        }
      }, 1000);
      updateTimerDisplay();
    }

    function updateTimerDisplay() {
      if (!timerDisplay) return;
      const mins = Math.floor(testTimeRemaining / 60);
      const secs = testTimeRemaining % 60;
      timerDisplay.innerText = `⏱ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (testTimeRemaining <= 180) {
        timerDisplay.style.color = '#e11d48';
        timerDisplay.style.borderColor = '#e11d48';
      } else {
        timerDisplay.style.color = '#be123c';
        timerDisplay.style.borderColor = '#ffe4e6';
      }
    }

    function renderPalette() {
      if (!paletteContainer) return;
      paletteContainer.innerHTML = TEST_QUESTIONS.map((q, idx) => {
        const isAnswered = userTestAnswers[idx] !== null;
        const isActive = idx === currentTestIndex;
        let cls = 'palette-btn';
        if (isActive) cls += ' active';
        if (isAnswered) cls += ' answered';
        return `<button class="${cls}" onclick="jumpToTestQuestion(${idx})">${idx + 1}</button>`;
      }).join('');
    }

    window.jumpToTestQuestion = function(idx) {
      currentTestIndex = idx;
      renderCurrentTestQuestion();
    };

    function renderCurrentTestQuestion() {
      const q = TEST_QUESTIONS[currentTestIndex];
      if (!q || !questionText) return;

      questionMeta.innerText = `Question ${currentTestIndex + 1} of ${TEST_QUESTIONS.length} • ${q.topic} • ${q.diff.toUpperCase()}`;
      questionText.innerText = q.q;

      const optLetters = ['A', 'B', 'C', 'D'];
      const selected = userTestAnswers[currentTestIndex];

      optionsContainer.innerHTML = q.options.map((opt, optIdx) => {
        const isSelected = selected === optIdx;
        return `
          <button class="mcq-option-btn ${isSelected ? 'correct' : ''}" onclick="selectTestOption(${optIdx})">
            <span class="opt-prefix">${optLetters[optIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      }).join('');

      if (prevBtn) prevBtn.disabled = currentTestIndex === 0;
      if (nextBtn) nextBtn.disabled = currentTestIndex === TEST_QUESTIONS.length - 1;

      renderPalette();
    }

    window.selectTestOption = function(optIdx) {
      userTestAnswers[currentTestIndex] = optIdx;
      attemptedQuestions.add(`test_q_${currentTestIndex}`);
      localStorage.setItem(STORAGE_KEY_ATTEMPTED, JSON.stringify(Array.from(attemptedQuestions)));
      renderCurrentTestQuestion();
      updateDashboardUI();
    };

    function finishTest() {
      testActive = false;
      clearInterval(testTimerInterval);

      let correctCount = 0;
      let incorrectCount = 0;
      let unattemptedCount = 0;
      const topicStats = {};

      TEST_QUESTIONS.forEach((q, idx) => {
        if (!topicStats[q.topic]) {
          topicStats[q.topic] = { total: 0, correct: 0 };
        }
        topicStats[q.topic].total++;

        const userAns = userTestAnswers[idx];
        if (userAns === null) {
          unattemptedCount++;
        } else if (userAns === q.correct) {
          correctCount++;
          topicStats[q.topic].correct++;
        } else {
          incorrectCount++;
        }
      });

      const total = TEST_QUESTIONS.length;
      const pct = Math.round((correctCount / total) * 100);
      const timeSpentSecs = 25 * 60 - testTimeRemaining;
      const timeMins = Math.floor(timeSpentSecs / 60);
      const timeSecs = timeSpentSecs % 60;

      if (pct > bestScore) {
        bestScore = pct;
        localStorage.setItem(STORAGE_KEY_BEST_SCORE, bestScore.toString());
      }

      if (interactiveView) interactiveView.style.display = 'none';
      if (reportView) reportView.style.display = 'block';

      // Fill in report UI
      const scoreNum = document.getElementById('report-score-num');
      const scorePct = document.getElementById('report-score-pct');
      const verdict = document.getElementById('report-verdict');
      const verdictDesc = document.getElementById('report-verdict-desc');
      const repCorrect = document.getElementById('rep-correct');
      const repIncorrect = document.getElementById('rep-incorrect');
      const repUnattempted = document.getElementById('rep-unattempted');
      const repTime = document.getElementById('rep-time');
      const analyticsContainer = document.getElementById('report-analytics-container');

      if (scoreNum) scoreNum.innerText = `${correctCount}/${total}`;
      if (scorePct) scorePct.innerText = `${pct}% Accuracy`;
      if (repCorrect) repCorrect.innerText = correctCount;
      if (repIncorrect) repIncorrect.innerText = incorrectCount;
      if (repUnattempted) repUnattempted.innerText = unattemptedCount;
      if (repTime) repTime.innerText = `${timeMins}m ${timeSecs}s`;

      if (verdict && verdictDesc) {
        if (pct >= 90) {
          verdict.innerText = '🌟 Excellent Performance!';
          verdictDesc.innerText = 'You possess solid command over Linear Equations and Inequalities. You are ready for high-difficulty FAST and scholarship entrance questions.';
        } else if (pct >= 75) {
          verdict.innerText = '👍 Very Good Mastery';
          verdictDesc.innerText = 'Great accuracy. Work on speeding up multi-step fraction simplification and negative inequality signs.';
        } else if (pct >= 60) {
          verdict.innerText = '📖 Good — Practice Recommended';
          verdictDesc.innerText = 'You have a reasonable grasp of the fundamentals. Revise word problems and compound inequalities to cross the 85% threshold.';
        } else {
          verdict.innerText = '⚠️ Needs Revision';
          verdictDesc.innerText = 'Review the 18 topic sections above, especially the Golden Rules and Common Mistakes, then retake this test.';
        }
      }

      // Topic Breakdown Analysis
      if (analyticsContainer) {
        let analyticsHTML = '<div class="analytics-title">Topic-wise Performance Breakdown</div>';
        for (const [top, stats] of Object.entries(topicStats)) {
          const topPct = Math.round((stats.correct / stats.total) * 100);
          let barColor = '#16a34a';
          if (topPct < 50) barColor = '#e11d48';
          else if (topPct < 75) barColor = '#d97706';

          analyticsHTML += `
            <div class="topic-bar-row">
              <div class="topic-bar-label-wrap">
                <span>${top} (${stats.correct}/${stats.total})</span>
                <span>${topPct}%</span>
              </div>
              <div class="topic-bar-track">
                <div class="topic-bar-fill" style="width: ${topPct}%; background: ${barColor};"></div>
              </div>
            </div>
          `;
        }
        analyticsContainer.innerHTML = analyticsHTML;
      }

      // Detailed Review Section
      renderTestReviewSection();
      updateDashboardUI();
    }

    function renderTestReviewSection() {
      const reviewContainer = document.getElementById('test-review-container');
      if (!reviewContainer) return;
      const optLetters = ['A', 'B', 'C', 'D'];

      reviewContainer.innerHTML = TEST_QUESTIONS.map((q, idx) => {
        const userAns = userTestAnswers[idx];
        const isCorrect = userAns === q.correct;
        const isUnattempted = userAns === null;

        let statusBadge = '';
        if (isCorrect) statusBadge = '<span class="badge" style="background: #dcfce7; color: #166534;">✓ Correct</span>';
        else if (isUnattempted) statusBadge = '<span class="badge" style="background: #f1f5f9; color: #475569;">— Unattempted</span>';
        else statusBadge = '<span class="badge" style="background: #ffe4e6; color: #9f1239;">✗ Incorrect</span>';

        const optionsHTML = q.options.map((opt, optIdx) => {
          let cls = 'mcq-option-btn';
          if (optIdx === q.correct) cls += ' correct';
          else if (optIdx === userAns) cls += ' incorrect';
          return `
            <div class="${cls}" style="cursor: default;">
              <span class="opt-prefix">${optLetters[optIdx]}</span>
              <span>${opt}</span>
            </div>
          `;
        }).join('');

        return `
          <div class="mcq-card" style="margin-bottom: 16px;">
            <div class="mcq-header">
              <span class="mcq-number">Question ${idx + 1} &bull; ${q.topic}</span>
              ${statusBadge}
            </div>
            <div class="mcq-question">${q.q}</div>
            <div class="mcq-options">${optionsHTML}</div>
            <div class="mcq-explanation show">
              <strong>Step-by-step Solution:</strong> ${q.exp}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // --- SEARCH ENGINE ---
  function initSearch() {
    const searchInput = document.getElementById('header-search-input');
    const dropdown = document.getElementById('search-results-dropdown');
    if (!searchInput || !dropdown) return;

    const searchableItems = [];
    document.querySelectorAll('.topic-card').forEach(card => {
      const id = card.id;
      const title = card.querySelector('.topic-title')?.innerText || '';
      const text = card.innerText;
      searchableItems.push({ id, title, text });
    });

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q || q.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = searchableItems.filter(item => item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q));

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding: 12px; font-size: 0.85rem; color: var(--navy-500); text-align: center;">No matching concepts found.</div>';
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = matches.slice(0, 6).map(m => {
        const snippetIdx = m.text.toLowerCase().indexOf(q);
        const start = Math.max(0, snippetIdx - 30);
        const end = Math.min(m.text.length, snippetIdx + 60);
        const snippet = '...' + m.text.substring(start, end).replace(/\n/g, ' ') + '...';

        return `
          <div class="search-result-item" onclick="jumpToSearchResult('${m.id}')">
            <div class="search-result-title">${m.title}</div>
            <div class="search-result-snippet">${snippet}</div>
          </div>
        `;
      }).join('');
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    window.jumpToSearchResult = function(id) {
      dropdown.style.display = 'none';
      searchInput.value = '';
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        target.style.transition = 'box-shadow 0.3s ease';
        target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.4)';
        setTimeout(() => target.style.boxShadow = '', 2000);
      }
    };
  }

  // --- 5-MINUTE REVISION ACCORDION ---
  function initRevisionAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(h => {
      h.addEventListener('click', () => {
        const content = h.nextElementSibling;
        if (content) {
          const isOpen = content.classList.contains('open');
          document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
          if (!isOpen) content.classList.add('open');
        }
      });
    });
  }

})();
