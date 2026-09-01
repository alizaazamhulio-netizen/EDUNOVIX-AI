/**
 * EduNexa AI — Mathematics Chapter: Word Problems
 * Core JavaScript Application Architecture
 */

// Application State
const AppState = {
  theme: 'light',
  progress: {
    lessonsViewed: 1,
    activitiesCompleted: 0,
    problemsSolved: 0,
    practiceCorrect: 0,
    practiceTotal: 0,
    streak: 0,
    bestStreak: 0,
    quizBestScore: 0,
    dailyCompleted: false,
    completedStages: [1]
  },
  bookmarks: [],
  notes: [
    { id: 'note-1', text: 'Step 1: Always identify given numbers and what the question is asking.', date: '2026-08-20' },
    { id: 'note-2', text: 'Context warning: "more than" usually implies addition, but in reverse comparisons it can mean subtraction!', date: '2026-08-22' }
  ],
  dailyChallenge: {
    targetTime: 300,
    remainingTime: 300,
    timerActive: false,
    timerId: null,
    answered: false
  },
  quiz: {
    currentQuestion: 0,
    answers: {},
    startTime: null,
    endTime: null
  },
  practice: {
    difficulty: 'easy',
    currentProblem: null
  },
  guidedSolver: {
    problemIndex: 0,
    currentStage: 1
  }
};

/* ==========================================================================
   DATA BANKS
   ========================================================================== */

// 1. Keyword Explorer Data
const KeywordData = {
  addition: [
    { word: 'Total', op: '+', example: 'Find the total cost of 3 books and 2 pens.', warning: 'Reliably means addition when combining separate groups into one whole.' },
    { word: 'Altogether', op: '+', example: 'How many apples did they pick altogether?', warning: 'Combining multiple parts into a single sum.' },
    { word: 'Combined', op: '+', example: 'Their combined score was 150 points.', warning: 'Indicates the union of two or more distinct quantities.' },
    { word: 'Sum', op: '+', example: 'What is the sum of 45 and 65?', warning: 'The direct formal mathematical term for the result of addition.' },
    { word: 'In all', op: '+', example: 'How many stamps does she collect in all?', warning: 'Asks for the cumulative count across all subsets.' }
  ],
  subtraction: [
    { word: 'Difference', op: '−', example: 'What is the difference between their ages?', warning: 'Requires subtracting the smaller value from the larger value.' },
    { word: 'Remaining / Left', op: '−', example: 'How much money is left in the wallet?', warning: 'Indicates taking away spent or removed portions from the initial amount.' },
    { word: 'Fewer than', op: '−', example: 'Liam has 8 fewer marbles than Noah.', warning: 'Caution: Comparative phrase. Set up as: Liam = Noah − 8.' },
    { word: 'How many more', op: '−', example: 'How many more pages did Maria read than John?', warning: 'Asking for a comparison difference, not addition!' }
  ],
  multiplication: [
    { word: 'Each / Every', op: '×', example: 'There are 6 crates with 24 bottles each.', warning: 'Indicates equal-sized groups being scaled up.' },
    { word: 'Times as many', op: '×', example: 'A laptop costs 4 times as much as a tablet.', warning: 'Multiplicative scaling factor comparison.' },
    { word: 'Product', op: '×', example: 'Find the product of 12 and 15.', warning: 'Formal term for the result of multiplication.' },
    { word: 'Rate / Per', op: '×', example: 'Driving at $60 km/h$ for 3 hours.', warning: 'Rate multiplied by time or units yields total quantity.' }
  ],
  division: [
    { word: 'Shared equally', op: '÷', example: '48 candies shared equally among 6 children.', warning: 'Distributing a total into identical portions.' },
    { word: 'Per unit / Rate', op: '÷', example: '$24 for 4 kg. What is the price per kg?', warning: 'Finding unit value: Total Cost ÷ Total Units.' },
    { word: 'Divided into', op: '÷', example: 'A 120cm rope is divided into 5 equal pieces.', warning: 'Partitioning a whole into equal-length segments.' },
    { word: 'Quotient', op: '÷', example: 'What is the quotient of 144 and 12?', warning: 'Formal term for the outcome of division.' }
  ]
};

// 2. Problem Type Explorer Data
const ProblemTypeData = [
  {
    id: 'shopping',
    name: 'Shopping & Money',
    icon: '🛒',
    concept: 'Calculating total costs, multi-item bundles, discounts, sales taxes, and customer change.',
    formula: 'Total Cost = (Qty × Unit Price) − Discounts + Taxes; Change = Paid − Cost',
    example: {
      problem: 'Sara buys 4 spiral notebooks at $3.50 each and 2 geometry sets for $6.00 each. She pays with a $50 bill. How much change does she receive?',
      given: ['4 notebooks @ $3.50', '2 geometry sets @ $6.00', 'Paid = $50.00'],
      find: 'Change received after purchase',
      plan: 'Calculate cost of notebooks, cost of geometry sets, sum total, then subtract from $50.',
      steps: [
        'Notebooks = 4 × $3.50 = $14.00',
        'Geometry sets = 2 × $6.00 = $12.00',
        'Total Cost = $14.00 + $12.00 = $26.00',
        'Change = $50.00 − $26.00 = $24.00'
      ],
      check: '$24.00 change + $26.00 items = $50.00 total paid. Correct!',
      answer: '$24.00'
    },
    practice: {
      q: 'A customer buys 3 shirts for $15 each and pays with a $100 bill. How much change is returned?',
      answer: 55,
      unit: '$'
    }
  },
  {
    id: 'distance',
    name: 'Distance, Speed & Time',
    icon: '🚗',
    concept: 'Understanding uniform motion relationships where motion is constant.',
    formula: 'Distance = Speed × Time  |  Speed = Distance ÷ Time  |  Time = Distance ÷ Speed',
    example: {
      problem: 'An express train travels a distance of 360 km in 4.5 hours. What is its average speed?',
      given: ['Distance = 360 km', 'Time = 4.5 hours'],
      find: 'Average Speed in km/h',
      plan: 'Use Speed = Distance ÷ Time.',
      steps: [
        'Speed = 360 ÷ 4.5',
        '360 ÷ (9/2) = 360 × (2/9)',
        '40 × 2 = 80 km/h'
      ],
      check: '80 km/h × 4.5 h = 360 km. Correct!',
      answer: '80 km/h'
    },
    practice: {
      q: 'A cyclist rides at a constant speed of 18 km/h for 2.5 hours. How many kilometers did she travel?',
      answer: 45,
      unit: 'km'
    }
  },
  {
    id: 'age',
    name: 'Age Problems',
    icon: '⏳',
    concept: 'Relating present ages to future or past ages. Remember: the age difference between two people never changes!',
    formula: 'Future Age = Present Age + Years; Past Age = Present Age − Years',
    example: {
      problem: 'Maya is currently 14 years old and her brother Leo is 8 years old. In how many years will Maya be twice as old as Leo was 3 years ago?',
      given: ['Maya = 14', 'Leo = 8', 'Leo 3 yrs ago = 8 − 3 = 5'],
      find: 'Years until Maya reaches twice Leo\'s age 3 yrs ago (2 × 5 = 10)',
      plan: 'Leo 3 yrs ago was 5. Twice that is 10. Maya is currently 14 (already older than 10). Let us examine future relative age: When will Maya be twice Leo\'s future age? Let x = years: 14 + x = 2(8 + x) → 14 + x = 16 + 2x → x = -2 (was 2 yrs ago!). For future: Maya is 14, sister is 4 yrs older (18). In 5 years sister will be 23.',
      steps: [
        'Maya = 14, Sister = 14 + 4 = 18',
        'In 5 years: Sister = 18 + 5 = 23'
      ],
      check: '18 − 14 = 4 years difference maintained. Correct!',
      answer: '23 years old'
    },
    practice: {
      q: 'Hassan is 10 years old. His father is 4 times Hassan\'s age. How old will the father be in 6 years?',
      answer: 46,
      unit: 'years'
    }
  },
  {
    id: 'work',
    name: 'Work & Productivity',
    icon: '⚙️',
    concept: 'Work rate is the fraction of a job completed per unit time. Combined rates add up.',
    formula: 'Combined Rate = (1/Time A) + (1/Time B); Total Time = 1 ÷ Combined Rate',
    example: {
      problem: 'Pipe A fills a reservoir in 6 hours, and Pipe B fills it in 3 hours. How long will they take working together?',
      given: ['Rate A = 1/6 tank/hr', 'Rate B = 1/3 = 2/6 tank/hr'],
      find: 'Hours needed when both pipes are open',
      plan: 'Add the rates: 1/6 + 2/6 = 3/6 = 1/2 tank per hour. Total Time = 1 ÷ (1/2).',
      steps: [
        'Combined Rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 per hour',
        'Time = 1 / (1/2) = 2 hours'
      ],
      check: 'In 2 hours, Pipe A fills 2/6 (1/3) and Pipe B fills 2/3. 1/3 + 2/3 = 1 whole tank. Correct!',
      answer: '2 hours'
    },
    practice: {
      q: 'Worker A paints a room in 4 hours, and Worker B paints it in 4 hours. How many hours do they take working together?',
      answer: 2,
      unit: 'hours'
    }
  },
  {
    id: 'percentage',
    name: 'Percentage Problems',
    icon: '🏷️',
    concept: 'Percentages represent parts per 100. Useful for sales discounts, markups, and growth.',
    formula: 'Discount = Original × Rate; Sale Price = Original × (1 − Rate)',
    example: {
      problem: 'A gaming headset normally retails for $120. During a weekend sale, it is offered at a 30% discount. What is the sale price?',
      given: ['Original Price = $120', 'Discount Rate = 30% (0.30)'],
      find: 'Sale Price',
      plan: 'Discount Amount = $120 × 0.30 = $36. Sale Price = $120 − $36.',
      steps: [
        'Discount = 120 × 0.30 = $36.00',
        'Sale Price = 120 − 36 = $84.00'
      ],
      check: '$84 + $36 = $120. (84/120) = 70% paid, which matches 100% − 30%. Correct!',
      answer: '$84.00'
    },
    practice: {
      q: 'A jacket costs $80. If there is a 25% discount, what is the final price in dollars?',
      answer: 60,
      unit: '$'
    }
  },
  {
    id: 'ratio',
    name: 'Ratio & Proportion',
    icon: '⚖️',
    concept: 'Comparing quantities multiplicatively. If Ratio is a:b, each part = Total ÷ (a + b).',
    formula: 'Part A = Total × [a / (a + b)]; Missing term in a/b = c/d is found via cross-multiplication.',
    example: {
      problem: 'The ratio of blue marbles to green marbles in a bag is 3:5. If there are 40 marbles in total, how many are green?',
      given: ['Ratio Blue:Green = 3:5', 'Total parts = 3 + 5 = 8', 'Total marbles = 40'],
      find: 'Number of green marbles',
      plan: 'Find value of 1 part (40 ÷ 8 = 5), then multiply by green parts (5 × 5).',
      steps: [
        'Total Parts = 3 + 5 = 8 parts',
        '1 Part = 40 ÷ 8 = 5 marbles',
        'Green Marbles = 5 parts × 5 = 25 marbles'
      ],
      check: 'Blue = 3 × 5 = 15. 15 + 25 = 40. Ratio 15:25 reduces to 3:5. Correct!',
      answer: '25 green marbles'
    },
    practice: {
      q: 'The ratio of cats to dogs at a shelter is 2:3. If there are 12 cats, how many dogs are there?',
      answer: 18,
      unit: 'dogs'
    }
  }
];

// 3. Information Game Bank (Relevant vs Irrelevant Info)
const InfoGameBank = [
  {
    id: 1,
    story: [
      { text: 'Ahmed has 12 red pencils', relevant: true },
      { text: 'and 8 blue pencils.', relevant: true },
      { text: 'His favorite subject in school is mathematics.', relevant: false },
      { text: 'He gives 5 pencils to his friend Bilal.', relevant: true },
      { text: 'Bilal was wearing green sneakers.', relevant: false },
      { text: 'How many total pencils does Ahmed have left?', relevant: true }
    ],
    question: 'How many pencils does Ahmed have left?',
    explanation: 'Colors of clothing and school subject preferences do not affect pencil arithmetic (12 + 8 − 5 = 15).'
  },
  {
    id: 2,
    story: [
      { text: 'A farmer has 4 apple trees.', relevant: true },
      { text: 'The orchard was planted on a Tuesday in April.', relevant: false },
      { text: 'Each tree yields 25 kg of crisp apples.', relevant: true },
      { text: 'The farmer owns a blue tractor that was built in 2018.', relevant: false },
      { text: 'He sells each kilogram of apples for $3.', relevant: true },
      { text: 'What is the total revenue from selling all harvested apples?', relevant: true }
    ],
    question: 'What is the total revenue?',
    explanation: 'The tractor model year and the planting day are distractor details. Calculation: 4 trees × 25 kg × $3/kg = $300.'
  },
  {
    id: 3,
    story: [
      { text: 'Zainab drives 180 km to visit her grandmother.', relevant: true },
      { text: 'She listened to 14 songs on the radio during the drive.', relevant: false },
      { text: 'The car consumed 15 liters of fuel on the trip.', relevant: true },
      { text: 'Her grandmother baked delicious chocolate cookies.', relevant: false },
      { text: 'How many kilometers did the car travel per liter of fuel?', relevant: true }
    ],
    question: 'What is the fuel economy in km per liter?',
    explanation: 'Songs played and cookies baked are background flavor. Essential data: 180 km ÷ 15 L = 12 km/L.'
  },
  {
    id: 4,
    story: [
      { text: 'A library bought 6 boxes of mystery books.', relevant: true },
      { text: 'The delivery truck was painted bright yellow.', relevant: false },
      { text: 'Each box contains 15 hardcover books.', relevant: true },
      { text: 'The librarian has worked at the facility for 12 years.', relevant: false },
      { text: 'If 20 books were immediately put on the display shelf,', relevant: true },
      { text: 'how many books remain in the storage boxes?', relevant: true }
    ],
    question: 'How many books remain in storage?',
    explanation: 'Truck color and librarian tenure have no bearing. Total books = 6 × 15 = 90. Remaining = 90 − 20 = 70.'
  }
];

// 4. Operation Challenge Bank
const OpChallengeBank = [
  {
    q: 'A bakery bakes 240 cookies every morning. They pack them equally into boxes of 12. How many boxes are filled?',
    correct: 'division',
    reason: 'Equal partitioning into fixed-size containers is division (240 ÷ 12 = 20).'
  },
  {
    q: 'A skyscraper has 45 floors, with 18 offices on each floor. How many total offices are in the building?',
    correct: 'multiplication',
    reason: 'Repeated equal groups across 45 units requires multiplication (45 × 18 = 810).'
  },
  {
    q: 'A drone was flying at an altitude of 350 meters. It descended by 125 meters. What is its new altitude?',
    correct: 'subtraction',
    reason: 'Descent represents a reduction from the initial amount (350 − 125 = 225).'
  },
  {
    q: 'Maya earned $45 on Friday, $60 on Saturday, and $35 on Sunday. What were her total weekend earnings?',
    correct: 'addition',
    reason: 'Combining distinct quantities across time into a single sum (45 + 60 + 35 = 140).'
  },
  {
    q: 'A store buys 10 jackets for $40 each and sells them all for $65 each. What is the total profit?',
    correct: 'multi-step',
    reason: 'Requires calculating total cost (10 × 40), total revenue (10 × 65), and taking their difference, or (65 − 40) × 10.'
  },
  {
    q: 'A piece of ribbon measuring 150 cm is cut into 5 equal lengths. What is the length of one piece?',
    correct: 'division',
    reason: 'Splitting a continuous whole into equal segments requires division (150 ÷ 5 = 30).'
  },
  {
    q: 'A warehouse has 500 crates. 185 are shipped out in the morning and 115 in the afternoon. How many crates remain?',
    correct: 'multi-step',
    reason: 'Requires adding total shipments (185 + 115 = 300) and subtracting from the starting inventory (500 − 300 = 200).'
  }
];

// 5. Equation Builder Challenges
const EquationBuilderBank = [
  {
    story: '4 boxes contain 6 pencils each. How many pencils are there altogether?',
    tokens: ['4', '6', '24', '×', '=', '+', '÷', '10'],
    correctEquation: '4 × 6 = 24',
    hint: 'Multiply the number of boxes by the pencils per box.'
  },
  {
    story: 'Sara had $50. She bought a book for $18. How much money does she have left?',
    tokens: ['50', '18', '32', '−', '=', '+', '68', '÷'],
    correctEquation: '50 − 18 = 32',
    hint: 'Subtract the price spent from her initial budget.'
  },
  {
    story: '72 students are split equally into 8 tournament teams. How many students are on each team?',
    tokens: ['72', '8', '9', '÷', '=', '×', '64', '+'],
    correctEquation: '72 ÷ 8 = 9',
    hint: 'Divide total students by number of teams.'
  },
  {
    story: 'A tank had 120 liters of water. 35 liters were added and then 15 liters were drained. What is the final volume?',
    tokens: ['120', '+', '35', '−', '15', '=', '140', '100'],
    correctEquation: '120 + 35 − 15 = 140',
    hint: 'Start with 120, add 35, subtract 15.'
  }
];

// 6. Guided Problem Solver Bank
const GuidedSolverBank = [
  {
    title: 'The School Fundraiser Concert',
    story: 'The music club sold 150 student tickets for $6 each and 80 adult tickets for $10 each. The hall rental cost was $400. How much net profit did the music club earn?',
    stages: [
      {
        question: 'Identify the Given Quantities:',
        options: [
          { text: '150 student tickets @ $6, 80 adult tickets @ $10, Hall rental = $400', correct: true },
          { text: '150 tickets total, each costing $16, rental = $400', correct: false },
          { text: '230 total tickets, all sold for $400', correct: false }
        ]
      },
      {
        question: 'Identify What We Need to Find:',
        options: [
          { text: 'Total Net Profit (Total Revenue − Hall Rental Cost)', correct: true },
          { text: 'Only the revenue from student tickets', correct: false },
          { text: 'The average ticket price', correct: false }
        ]
      },
      {
        question: 'Select the Best Operational Plan:',
        options: [
          { text: 'Multi-Step: (150 × 6) + (80 × 10) − 400', correct: true },
          { text: 'Single Step: (150 + 80) × (10 − 6)', correct: false },
          { text: 'Division: 400 ÷ (150 + 80)', correct: false }
        ]
      },
      {
        question: 'Calculate Student and Adult Revenue:',
        options: [
          { text: 'Student = $900, Adult = $800 → Total Revenue = $1,700', correct: true },
          { text: 'Student = $600, Adult = $800 → Total Revenue = $1,400', correct: false },
          { text: 'Student = $150, Adult = $80 → Total Revenue = $230', correct: false }
        ]
      },
      {
        question: 'Compute the Final Net Profit:',
        options: [
          { text: '$1,700 − $400 = $1,300', correct: true },
          { text: '$1,700 + $400 = $2,100', correct: false },
          { text: '$1,300 − $150 = $1,150', correct: false }
        ]
      },
      {
        question: 'Sanity Check & Units Verification:',
        options: [
          { text: 'Net profit must be less than gross revenue ($1,300 < $1,700) and currency units ($) match.', correct: true },
          { text: 'No verification is needed because multiplication was used.', correct: false }
        ]
      }
    ]
  }
];

// 7. Practice Arena Question Generator Bank
const PracticeBank = {
  easy: [
    {
      q: 'A box holds 36 crayons. A teacher buys 4 identical boxes for her art class. How many crayons does she have in total?',
      ans: 144,
      unit: 'crayons',
      hint: 'Multiply total boxes by crayons per box: 4 × 36.',
      steps: ['Crayons = 4 × 36', '4 × 30 = 120', '4 × 6 = 24', '120 + 24 = 144 crayons']
    },
    {
      q: 'A marathon is 42 kilometers long. A runner has completed 27 kilometers. How many kilometers are left to run?',
      ans: 15,
      unit: 'km',
      hint: 'Subtract completed distance from total marathon length: 42 − 27.',
      steps: ['Remaining = 42 − 27', '42 − 20 = 22', '22 − 7 = 15 km']
    },
    {
      q: '54 chocolates are distributed equally among 9 gift bags. How many chocolates are in each bag?',
      ans: 6,
      unit: 'chocolates',
      hint: 'Divide total chocolates by number of bags: 54 ÷ 9.',
      steps: ['Chocolates per bag = 54 ÷ 9 = 6']
    },
    {
      q: 'Liam had $85 saved. His grandmother gave him $35 for his birthday. How much money does Liam have now?',
      ans: 120,
      unit: '$',
      hint: 'Add the birthday gift to his savings: 85 + 35.',
      steps: ['Total = 85 + 35 = $120']
    }
  ],
  medium: [
    {
      q: 'A rectangular garden has a length of 18 meters and a width of 12 meters. Fencing costs $5 per meter. What is the total cost to fence the entire perimeter?',
      ans: 300,
      unit: '$',
      hint: 'Perimeter = 2 × (Length + Width). Then multiply perimeter by $5.',
      steps: [
        'Perimeter = 2 × (18 + 12) = 2 × 30 = 60 meters',
        'Total Cost = 60 m × $5/m = $300'
      ]
    },
    {
      q: 'A shop sells notebooks for $4 each and pens for $1.50 each. Taha buys 5 notebooks and 6 pens. How much did he spend in total?',
      ans: 29,
      unit: '$',
      hint: 'Calculate (5 × 4) + (6 × 1.50).',
      steps: [
        'Notebooks = 5 × $4 = $20',
        'Pens = 6 × $1.50 = $9',
        'Total = $20 + $9 = $29'
      ]
    },
    {
      q: 'A train travels at 75 km/h for 3 hours, then increases its speed to 90 km/h for 2 hours. What is the total distance traveled?',
      ans: 405,
      unit: 'km',
      hint: 'Total Distance = (75 × 3) + (90 × 2).',
      steps: [
        'Leg 1 = 75 × 3 = 225 km',
        'Leg 2 = 90 × 2 = 180 km',
        'Total Distance = 225 + 180 = 405 km'
      ]
    }
  ],
  hard: [
    {
      q: 'A boutique bought 50 dresses for $30 each. They sold 35 dresses at $50 each and the remaining 15 dresses at a discounted price of $35 each. What was the store\'s net profit?',
      ans: 775,
      unit: '$',
      hint: 'Profit = (Total Revenue from both batches) − (Total Purchase Cost).',
      steps: [
        'Total Cost = 50 × $30 = $1,500',
        'Batch 1 Revenue = 35 × $50 = $1,750',
        'Batch 2 Revenue = 15 × $35 = $525',
        'Total Revenue = $1,750 + $525 = $2,275',
        'Net Profit = $2,275 − $1,500 = $775'
      ]
    },
    {
      q: 'Two water taps can fill an empty swimming pool. Tap A fills it alone in 10 hours, and Tap B fills it alone in 15 hours. If both taps are opened together, how many hours will it take to fill the pool?',
      ans: 6,
      unit: 'hours',
      hint: 'Combined Rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6 pool per hour.',
      steps: [
        'Rate A = 1/10 per hour, Rate B = 1/15 per hour',
        'Combined Rate = 1/10 + 1/15 = (3 + 2)/30 = 5/30 = 1/6 per hour',
        'Time = 1 ÷ (1/6) = 6 hours'
      ]
    }
  ]
};

// 8. Final Chapter Quiz Questions (10 Comprehensive Questions)
const QuizQuestions = [
  {
    id: 1,
    type: 'mcq',
    question: 'Which of the following phrases is most likely to indicate a COMPARISON requiring subtraction rather than addition?',
    options: [
      'Combined total',
      'How many more than',
      'Sum of both',
      'Altogether in all'
    ],
    correctIndex: 1,
    explanation: '"How many more than" compares two quantities by computing their numerical difference.'
  },
  {
    id: 2,
    type: 'op',
    question: 'A fruit merchant has 480 oranges. He packs them into boxes that hold 24 oranges each. Which single mathematical operation finds the number of boxes?',
    options: ['Addition (+)', 'Subtraction (−)', 'Multiplication (×)', 'Division (÷)'],
    correctIndex: 3,
    explanation: 'Distributing a total amount into equal-capacity groups requires division (480 ÷ 24 = 20).'
  },
  {
    id: 3,
    type: 'num',
    question: 'A cyclist rides at a constant speed of 22 km/h for 3.5 hours. How many kilometers did she travel?',
    correctAnswer: 77,
    unit: 'km',
    explanation: 'Distance = Speed × Time = 22 × 3.5 = 77 km.'
  },
  {
    id: 4,
    type: 'mcq',
    question: 'In the 5-step problem solving framework, what is the primary goal of Step 2 (ANALYZE)?',
    options: [
      'Immediately write numbers into a calculator',
      'Separate the Given Facts from the Target Unknown to Find',
      'Guess which answer choice looks reasonable',
      'Change all units into kilograms'
    ],
    correctIndex: 1,
    explanation: 'Step 2 (Analyze) organizes given information and pinpoints the exact unknown to calculate.'
  },
  {
    id: 5,
    type: 'num',
    question: 'A jacket originally priced at $120 is discounted by 25%. What is the final selling price?',
    correctAnswer: 90,
    unit: '$',
    explanation: 'Discount = 120 × 0.25 = $30. Final Price = 120 − 30 = $90.'
  },
  {
    id: 6,
    type: 'mcq',
    question: 'A student reads this sentence in a word problem: "The farmer, who has 3 dogs, harvested 45 sacks of corn." To calculate total corn weight, the number of dogs is:',
    options: [
      'Essential given information',
      'An irrelevant distractor number',
      'The divisor for the equation',
      'A unit conversion factor'
    ],
    correctIndex: 1,
    explanation: 'The number of pet dogs has zero mathematical influence on crop harvest mass.'
  },
  {
    id: 7,
    type: 'num',
    question: 'The ratio of cats to dogs at an animal sanctuary is 3:7. If there are 21 cats, how many dogs are there?',
    correctAnswer: 49,
    unit: 'dogs',
    explanation: '1 ratio part = 21 ÷ 3 = 7. Total dogs = 7 × 7 = 49.'
  },
  {
    id: 8,
    type: 'num',
    question: 'Zain is 14 years old. His elder sister is 6 years older. How old will his sister be in 8 years?',
    correctAnswer: 28,
    unit: 'years',
    explanation: 'Sister currently = 14 + 6 = 20. In 8 years: 20 + 8 = 28 years old.'
  },
  {
    id: 9,
    type: 'mcq',
    question: 'Why should you always perform Step 5 (CHECK) before submitting an answer?',
    options: [
      'To verify that the magnitude makes sense, units are included, and the question was truly answered',
      'To change the method to a different operation',
      'To erase all previous notes',
      'To convert everything into percentages'
    ],
    correctIndex: 0,
    explanation: 'Step 5 sanity-checks the logical plausibility and dimensional unit correctness.'
  },
  {
    id: 10,
    type: 'num',
    question: 'A school orders 8 boxes of notebooks with 25 notebooks each. 45 notebooks are handed out on day 1 and 35 on day 2. How many notebooks remain?',
    correctAnswer: 120,
    unit: 'notebooks',
    explanation: 'Total = 8 × 25 = 200. Distributed = 45 + 35 = 80. Remaining = 200 − 80 = 120.'
  }
];

/* ==========================================================================
   INITIALIZATION & EVENT BINDINGS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  loadProgress();
  initializeTheme();
  initializeNavigation();
  initializeStepper();
  initializeKeywordExplorer();
  initializeProblemTypeExplorer();
  initializeEquationBuilder();
  initializeInformationGame();
  initializeOperationChallenge();
  initializeGuidedSolver();
  initializePracticeArena();
  initializeDailyChallenge();
  initializeQuiz();
  initializeNotes();
  initializeBookmarks();
  updateProgressUI();
}

/* ==========================================================================
   THEME & NAVIGATION
   ========================================================================== */

function initializeTheme() {
  const savedTheme = localStorage.getItem('studymate_theme') || 'light';
  AppState.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleIcon();

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('studymate_theme', AppState.theme);
      updateThemeToggleIcon();
      showToast(`Switched to ${AppState.theme} mode`, 'info');
    });
  }
}

function updateThemeToggleIcon() {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.innerHTML = AppState.theme === 'light'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  }
}

function initializeNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const notesModalBtn = document.getElementById('notesModalBtn');
  if (notesModalBtn) {
    notesModalBtn.addEventListener('click', () => openModal('notesModal'));
  }

  const bookmarksModalBtn = document.getElementById('bookmarksModalBtn');
  if (bookmarksModalBtn) {
    bookmarksModalBtn.addEventListener('click', () => {
      renderBookmarksList();
      openModal('bookmarksModal');
    });
  }

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => closeModal());
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}

/* ==========================================================================
   PROGRESS & PERSISTENCE
   ========================================================================== */

function loadProgress() {
  const saved = localStorage.getItem('studymate_wordproblems_progress');
  if (saved) {
    try {
      AppState.progress = Object.assign(AppState.progress, JSON.parse(saved));
    } catch (e) {
      console.warn('Could not parse saved progress');
    }
  }

  const savedBookmarks = localStorage.getItem('studymate_bookmarks');
  if (savedBookmarks) {
    try {
      AppState.bookmarks = JSON.parse(savedBookmarks);
    } catch (e) {}
  }

  const savedNotes = localStorage.getItem('studymate_notes');
  if (savedNotes) {
    try {
      AppState.notes = JSON.parse(savedNotes);
    } catch (e) {}
  }
}

function saveProgress() {
  localStorage.setItem('studymate_wordproblems_progress', JSON.stringify(AppState.progress));
  updateProgressUI();
}

function updateProgressUI() {
  // Weighted chapter completion calculation
  const lessonPct = Math.min(100, (AppState.progress.lessonsViewed / 7) * 30);
  const practicePct = Math.min(100, (AppState.progress.practiceCorrect / 10) * 30);
  const quizPct = (AppState.progress.quizBestScore / 100) * 30;
  const dailyPct = AppState.progress.dailyCompleted ? 10 : 0;
  
  const overall = Math.min(100, Math.round(lessonPct + practicePct + quizPct + dailyPct));
  
  const navPct = document.getElementById('navProgressPct');
  if (navPct) navPct.textContent = `${overall}%`;

  const navFill = document.getElementById('navProgressFill');
  if (navFill) navFill.style.width = `${overall}%`;

  const heroPct = document.getElementById('heroCompletionPct');
  if (heroPct) heroPct.textContent = `${overall}%`;

  const heroPractice = document.getElementById('heroPracticeScore');
  if (heroPractice) heroPractice.textContent = `${AppState.progress.practiceCorrect} solved`;

  const heroStreak = document.getElementById('heroStreak');
  if (heroStreak) heroStreak.textContent = `${AppState.progress.streak} streak`;

  const bmCount = document.getElementById('bookmarkCountBadge');
  if (bmCount) bmCount.textContent = AppState.bookmarks.length;

  if (overall >= 100) {
    const banner = document.getElementById('chapterCompletionBanner');
    if (banner) banner.style.display = 'block';
  }
}

/* ==========================================================================
   SECTION 1: THE 5-STEP PROBLEM SOLVER
   ========================================================================== */

function initializeStepper() {
  const tabs = document.querySelectorAll('.step-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.dataset.step, 10);
      switchStepperStage(step);
    });
  });

  // Step 1: Interactive Highlighter
  let currentHighlighterMode = 'given';
  document.querySelectorAll('.highlighter-tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.highlighter-tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHighlighterMode = btn.dataset.mode;
    });
  });

  document.querySelectorAll('.interactive-word').forEach(wordEl => {
    wordEl.addEventListener('click', () => {
      wordEl.className = 'interactive-word';
      if (currentHighlighterMode !== 'clear') {
        wordEl.classList.add(`highlight-${currentHighlighterMode}`);
      }
      checkHighlightAnalysis();
    });
  });

  // Step 3: Operation Matrix Selector
  document.querySelectorAll('.op-choice-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.op-choice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const feedback = document.getElementById('opSelectionFeedback');
      if (feedback) {
        if (card.dataset.op === 'multistep') {
          feedback.innerHTML = '<div class="fact-item" style="color: var(--accent-emerald);"><strong>Correct Strategy!</strong> This problem requires multiplication (finding item costs) followed by subtraction (calculating remaining balance).</div>';
        } else {
          feedback.innerHTML = '<div class="fact-item" style="color: var(--accent-amber);"><strong>Think again:</strong> A single operation is not enough because we have multiple items and a remaining balance to calculate.</div>';
        }
      }
    });
  });

  // Step 4: Step-by-Step Solve Reveal
  let currentSolveStep = 1;
  const nextSolveBtn = document.getElementById('nextSolveStepBtn');
  if (nextSolveBtn) {
    nextSolveBtn.addEventListener('click', () => {
      currentSolveStep++;
      const stepItem = document.getElementById(`solveStepItem${currentSolveStep}`);
      if (stepItem) {
        stepItem.classList.add('unlocked');
      }
      if (currentSolveStep >= 3) {
        nextSolveBtn.style.display = 'none';
        showToast('Solution fully revealed!', 'success');
      }
    });
  }

  // Step 5: Checklist
  document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const allChecked = document.querySelectorAll('.check-item.checked').length === document.querySelectorAll('.check-item').length;
      const verifyBanner = document.getElementById('checkCompleteBanner');
      if (verifyBanner) {
        verifyBanner.style.display = allChecked ? 'block' : 'none';
      }
      if (allChecked) {
        showToast('Problem verification complete!', 'success');
        recordActivity();
      }
    });
  });
}

function switchStepperStage(step) {
  document.querySelectorAll('.step-tab-btn').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.stepper-stage-content').forEach(s => s.classList.remove('active'));
  
  const tab = document.querySelector(`.step-tab-btn[data-step="${step}"]`);
  const content = document.getElementById(`stepperStage${step}`);
  if (tab) tab.classList.add('active');
  if (content) content.classList.add('active');
}

function checkHighlightAnalysis() {
  const givenCount = document.querySelectorAll('.interactive-word.highlight-given').length;
  const findCount = document.querySelectorAll('.interactive-word.highlight-find').length;
  const feedback = document.getElementById('highlighterFeedback');
  if (feedback) {
    if (givenCount >= 2 && findCount >= 1) {
      feedback.innerHTML = '<strong style="color: var(--accent-emerald);">Great Analysis!</strong> You identified the given quantities and what the problem is asking for.';
    } else {
      feedback.innerHTML = '<span>Highlight the numbers/units as <strong>Given</strong> and the final question as <strong>Find</strong>.</span>';
    }
  }
}

/* ==========================================================================
   SECTION 2: KEYWORD STRATEGY LAB
   ========================================================================== */

function initializeKeywordExplorer() {
  const categoryBtns = document.querySelectorAll('.kw-tab-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderKeywordChips(btn.dataset.category);
    });
  });
  renderKeywordChips('addition');
}

function renderKeywordChips(category) {
  const chipsContainer = document.getElementById('keywordChipsContainer');
  if (!chipsContainer) return;
  chipsContainer.innerHTML = '';

  const keywords = KeywordData[category] || [];
  keywords.forEach((item, idx) => {
    const chip = document.createElement('button');
    chip.className = `keyword-chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `<span>${item.word}</span> <small style="opacity:0.75;">(${item.op})</small>`;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.keyword-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      displayKeywordDetails(item);
    });
    chipsContainer.appendChild(chip);
  });

  if (keywords.length > 0) {
    displayKeywordDetails(keywords[0]);
  }
}

function displayKeywordDetails(item) {
  const detailCard = document.getElementById('keywordDetailCard');
  if (!detailCard) return;
  detailCard.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
      <h3 style="font-size:1.4rem;">Keyword: "${item.word}"</h3>
      <span class="section-badge" style="margin-bottom:0;">Clue: Operation ${item.op}</span>
    </div>
    <div style="margin-bottom:1rem;">
      <div style="font-weight:700; font-size:0.9rem; color:var(--text-muted); margin-bottom:0.35rem;">REALISTIC EXAMPLE:</div>
      <p style="font-weight:600; color:var(--text-primary); font-size:1.05rem;">"${item.example}"</p>
    </div>
    <div class="warning-callout">
      <div class="warning-icon">⚠️</div>
      <div>
        <strong style="color:var(--accent-amber); display:block; margin-bottom:0.25rem;">Critical Context Rule:</strong>
        <p style="font-size:0.925rem; color:var(--text-secondary); margin:0;">${item.warning}</p>
      </div>
    </div>
  `;
}

/* ==========================================================================
   SECTION 3: PROBLEM TYPE EXPLORER
   ========================================================================== */

function initializeProblemTypeExplorer() {
  const menuContainer = document.getElementById('problemTypeMenuList');
  if (!menuContainer) return;
  menuContainer.innerHTML = '';

  ProblemTypeData.forEach((type, idx) => {
    const btn = document.createElement('button');
    btn.className = `type-menu-item ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `<span>${type.icon}</span> <span>${type.name}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-menu-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblemTypeDetails(type);
      AppState.progress.lessonsViewed = Math.max(AppState.progress.lessonsViewed, idx + 1);
      saveProgress();
    });
    menuContainer.appendChild(btn);
  });

  renderProblemTypeDetails(ProblemTypeData[0]);
}

function renderProblemTypeDetails(type) {
  const viewer = document.getElementById('problemTypeViewer');
  if (!viewer) return;

  viewer.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
      <h3 style="font-size:1.5rem; display:flex; align-items:center; gap:0.5rem;">${type.icon} ${type.name}</h3>
      <button class="btn btn-outline btn-sm bookmark-btn" data-type="lesson" data-id="${type.id}" data-title="${type.name}">
        🔖 Bookmark
      </button>
    </div>
    <p style="margin-bottom:1rem;">${type.concept}</p>
    <div class="formula-tag">${type.formula}</div>

    <div class="card" style="background-color:var(--bg-surface-elevated); margin: 1.5rem 0;">
      <div style="font-weight:700; color:var(--accent-blue); margin-bottom:0.5rem;">WORKED PROBLEM EXAMPLE</div>
      <p style="font-weight:600; font-size:1.05rem; margin-bottom:1rem;">${type.example.problem}</p>
      
      <div class="analyze-grid" style="margin-top:0;">
        <div class="fact-card">
          <div class="fact-header">📋 Given</div>
          <ul class="fact-list">
            ${type.example.given.map(g => `<li class="fact-item">${g}</li>`).join('')}
          </ul>
        </div>
        <div class="fact-card">
          <div class="fact-header">🎯 Target to Find</div>
          <div class="fact-item">${type.example.find}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem;">
        <strong>Step-by-Step Calculation:</strong>
        <div style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.5rem;">
          ${type.example.steps.map(s => `<div class="fact-item" style="font-family:var(--font-mono);">${s}</div>`).join('')}
        </div>
        <div style="margin-top:1rem; padding:0.75rem; background-color:var(--accent-emerald-subtle); border-radius:var(--radius-md); color:var(--accent-emerald); font-weight:700;">
          Final Result: ${type.example.answer} (${type.example.check})
        </div>
      </div>
    </div>

    <!-- Quick Check Practice -->
    <div style="border-top:1px solid var(--border-color); padding-top:1.5rem;">
      <h4 style="font-size:1.1rem; margin-bottom:0.75rem;">Interactive Quick Check</h4>
      <p style="margin-bottom:1rem;">${type.practice.q}</p>
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <input type="number" id="typePracticeInput" class="math-input" placeholder="Your Answer">
        <span style="font-weight:700;">${type.practice.unit}</span>
        <button id="checkTypePracticeBtn" class="btn btn-primary btn-sm">Check Answer</button>
      </div>
      <div id="typePracticeFeedback" style="margin-top:0.75rem; font-weight:600;"></div>
    </div>
  `;

  // Attach quick check handler
  const checkBtn = document.getElementById('checkTypePracticeBtn');
  const inputEl = document.getElementById('typePracticeInput');
  const feedbackEl = document.getElementById('typePracticeFeedback');
  if (checkBtn && inputEl && feedbackEl) {
    checkBtn.addEventListener('click', () => {
      const val = parseFloat(inputEl.value);
      if (val === type.practice.ans) {
        feedbackEl.innerHTML = '<span style="color:var(--accent-emerald);">✓ Correct! Outstanding work.</span>';
        showToast('Lesson check correct!', 'success');
        recordActivity();
      } else {
        feedbackEl.innerHTML = `<span style="color:var(--accent-rose);">Incorrect. Think about using the formula above.</span>`;
      }
    });
  }

  // Attach bookmark handler
  const bmBtn = viewer.querySelector('.bookmark-btn');
  if (bmBtn) {
    bmBtn.addEventListener('click', () => {
      toggleBookmark(type.id, type.name, 'Lesson');
    });
  }
}

/* ==========================================================================
   SECTION 4: WORKED EXAMPLES EXPERIENCE (8 HIGH-QUALITY EXAMPLES)
   ========================================================================== */

function toggleExampleAccordion(exampleId) {
  const body = document.getElementById(`exampleBody${exampleId}`);
  const btn = document.getElementById(`exampleBtn${exampleId}`);
  if (body && btn) {
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open');
    btn.innerHTML = isOpen
      ? '<span>Show Step-by-Step Solution</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>'
      : '<span>Hide Solution</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    if (!isOpen) {
      recordActivity();
    }
  }
}

/* ==========================================================================
   SECTION 5: INTERACTIVE EQUATION BUILDER
   ========================================================================== */

let currentEqProblemIdx = 0;
let activeEquationTokens = [];

function initializeEquationBuilder() {
  loadEquationChallenge(0);

  const resetBtn = document.getElementById('resetEquationBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeEquationTokens = [];
      renderActiveTokens();
      const feedback = document.getElementById('equationFeedback');
      if (feedback) feedback.innerHTML = '';
    });
  }

  const checkBtn = document.getElementById('checkEquationBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', checkEquationAnswer);
  }

  const nextBtn = document.getElementById('nextEquationProblemBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentEqProblemIdx = (currentEqProblemIdx + 1) % EquationBuilderBank.length;
      loadEquationChallenge(currentEqProblemIdx);
    });
  }

  const hintBtn = document.getElementById('hintEquationBtn');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      const p = EquationBuilderBank[currentEqProblemIdx];
      showToast(`Hint: ${p.hint}`, 'info');
    });
  }
}

function loadEquationChallenge(idx) {
  const p = EquationBuilderBank[idx];
  activeEquationTokens = [];
  
  const storyEl = document.getElementById('equationStoryText');
  if (storyEl) storyEl.textContent = p.story;

  const bankEl = document.getElementById('equationTokenBank');
  if (bankEl) {
    bankEl.innerHTML = '';
    p.tokens.forEach(tok => {
      const btn = document.createElement('button');
      btn.className = 'builder-token';
      btn.textContent = tok;
      btn.addEventListener('click', () => {
        activeEquationTokens.push(tok);
        renderActiveTokens();
      });
      bankEl.appendChild(btn);
    });
  }

  renderActiveTokens();
  const feedback = document.getElementById('equationFeedback');
  if (feedback) feedback.innerHTML = '';
}

function renderActiveTokens() {
  const slot = document.getElementById('equationTargetSlot');
  if (!slot) return;
  slot.innerHTML = '';

  if (activeEquationTokens.length === 0) {
    slot.innerHTML = '<span style="color:var(--text-muted); font-size:0.95rem;">Click tokens below to build the mathematical statement...</span>';
    return;
  }

  activeEquationTokens.forEach((tok, idx) => {
    const el = document.createElement('div');
    el.className = 'builder-token';
    el.style.backgroundColor = 'var(--accent-blue-subtle)';
    el.style.borderColor = 'var(--accent-blue)';
    el.innerHTML = `${tok} <span style="font-size:0.75rem; margin-left:4px; opacity:0.6;">×</span>`;
    el.title = 'Click to remove';
    el.addEventListener('click', () => {
      activeEquationTokens.splice(idx, 1);
      renderActiveTokens();
    });
    slot.appendChild(el);
  });
}

function checkEquationAnswer() {
  const constructed = activeEquationTokens.join(' ');
  const target = EquationBuilderBank[currentEqProblemIdx].correctEquation;
  const feedback = document.getElementById('equationFeedback');
  if (!feedback) return;

  if (constructed === target) {
    feedback.innerHTML = '<div style="color:var(--accent-emerald); font-weight:700;">✓ Correct Equation! You framed and solved the model properly.</div>';
    showToast('Equation validated!', 'success');
    recordActivity();
  } else {
    feedback.innerHTML = `<div style="color:var(--accent-rose); font-weight:600;">Incorrect. Current equation: "${constructed || 'empty'}". Target structure: [Value] [Operator] [Value] = [Result].</div>`;
  }
}

/* ==========================================================================
   SECTION 6: FIND THE IMPORTANT INFORMATION GAME
   ========================================================================== */

let currentInfoGameIdx = 0;
let infoSelections = {};

function initializeInformationGame() {
  loadInfoGameProblem(0);

  const nextBtn = document.getElementById('nextInfoGameBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentInfoGameIdx = (currentInfoGameIdx + 1) % InfoGameBank.length;
      loadInfoGameProblem(currentInfoGameIdx);
    });
  }

  const checkBtn = document.getElementById('checkInfoGameBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', checkInformationSelection);
  }
}

function loadInfoGameProblem(idx) {
  const item = InfoGameBank[idx];
  infoSelections = {};

  const qEl = document.getElementById('infoGameQuestion');
  if (qEl) qEl.textContent = `Target: ${item.question}`;

  const container = document.getElementById('infoGameStoryContainer');
  if (container) {
    container.innerHTML = '';
    item.story.forEach((part, pIdx) => {
      const p = document.createElement('div');
      p.className = 'game-clickable-sentence';
      p.id = `infoPart_${pIdx}`;
      p.textContent = part.text;
      p.addEventListener('click', () => {
        // Toggle between none -> essential -> distractor
        if (!infoSelections[pIdx]) {
          infoSelections[pIdx] = 'essential';
          p.className = 'game-clickable-sentence selected-essential';
        } else if (infoSelections[pIdx] === 'essential') {
          infoSelections[pIdx] = 'distractor';
          p.className = 'game-clickable-sentence selected-distractor';
        } else {
          delete infoSelections[pIdx];
          p.className = 'game-clickable-sentence';
        }
      });
      container.appendChild(p);
    });
  }

  const feedback = document.getElementById('infoGameFeedback');
  if (feedback) feedback.innerHTML = '';
}

function checkInformationSelection() {
  const item = InfoGameBank[currentInfoGameIdx];
  let correctCount = 0;
  let totalParts = item.story.length;

  item.story.forEach((part, idx) => {
    const userChoice = infoSelections[idx];
    const isActuallyRelevant = part.relevant;
    if ((isActuallyRelevant && userChoice === 'essential') || (!isActuallyRelevant && userChoice === 'distractor')) {
      correctCount++;
    }
  });

  const feedback = document.getElementById('infoGameFeedback');
  if (feedback) {
    if (correctCount >= totalParts - 1) {
      feedback.innerHTML = `<div style="color:var(--accent-emerald); font-weight:700;">
        ✓ Outstanding Analysis (${correctCount}/${totalParts} correct)!<br>
        <span style="font-size:0.9rem; font-weight:normal; color:var(--text-secondary);">${item.explanation}</span>
      </div>`;
      showToast('Great information analysis!', 'success');
      recordActivity();
    } else {
      feedback.innerHTML = `<div style="color:var(--accent-amber); font-weight:600;">
        You got ${correctCount} of ${totalParts} classified correctly. Tip: Blue highlight = Essential Data, Red line-through = Distractor detail.
      </div>`;
    }
  }
}

/* ==========================================================================
   SECTION 7: CHOOSE THE OPERATION CHALLENGE
   ========================================================================== */

let currentOpChallengeIdx = 0;

function initializeOperationChallenge() {
  loadOperationQuestion(0);

  const nextBtn = document.getElementById('nextOpChallengeBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentOpChallengeIdx = (currentOpChallengeIdx + 1) % OpChallengeBank.length;
      loadOperationQuestion(currentOpChallengeIdx);
    });
  }
}

function loadOperationQuestion(idx) {
  const item = OpChallengeBank[idx];
  const qEl = document.getElementById('opChallengeQuestionText');
  if (qEl) qEl.textContent = item.q;

  const stack = document.getElementById('opOptionsStack');
  if (stack) {
    stack.innerHTML = '';
    const operations = [
      { id: 'addition', name: 'Addition (+)' },
      { id: 'subtraction', name: 'Subtraction (−)' },
      { id: 'multiplication', name: 'Multiplication (×)' },
      { id: 'division', name: 'Division (÷)' },
      { id: 'multi-step', name: 'Multi-Step Strategy' }
    ];

    operations.forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'op-option-btn';
      btn.textContent = op.name;
      btn.addEventListener('click', () => checkOperationAnswer(op.id, btn, item));
      stack.appendChild(btn);
    });
  }

  const feedback = document.getElementById('opChallengeFeedback');
  if (feedback) feedback.innerHTML = '';
}

function checkOperationAnswer(selectedOp, btn, item) {
  const feedback = document.getElementById('opChallengeFeedback');
  if (!feedback) return;

  document.querySelectorAll('.op-option-btn').forEach(b => {
    b.disabled = true;
  });

  if (selectedOp === item.correct) {
    btn.classList.add('correct');
    feedback.innerHTML = `<div style="color:var(--accent-emerald); font-weight:700;">
      ✓ Excellent! ${item.reason}
    </div>`;
    showToast('Correct operation selected!', 'success');
    recordActivity();
  } else {
    btn.classList.add('incorrect');
    feedback.innerHTML = `<div style="color:var(--accent-rose); font-weight:600;">
      Not quite. ${item.reason}
    </div>`;
  }
}

/* ==========================================================================
   SECTION 8: GUIDED PROBLEM SOLVER (6 STAGES)
   ========================================================================== */

function initializeGuidedSolver() {
  renderGuidedStage();

  const resetBtn = document.getElementById('resetGuidedSolverBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AppState.guidedSolver.currentStage = 1;
      renderGuidedStage();
      showToast('Problem reset to Stage 1', 'info');
    });
  }
}

function renderGuidedStage() {
  const problem = GuidedSolverBank[AppState.guidedSolver.problemIndex];
  const stageNum = AppState.guidedSolver.currentStage;
  const stageData = problem.stages[stageNum - 1];

  const titleEl = document.getElementById('guidedProblemTitle');
  if (titleEl) titleEl.textContent = problem.title;

  const storyEl = document.getElementById('guidedProblemStory');
  if (storyEl) storyEl.textContent = problem.story;

  const badgeEl = document.getElementById('guidedStageBadge');
  if (badgeEl) badgeEl.textContent = `Stage ${stageNum} of 6`;

  // Update dots
  for (let i = 1; i <= 6; i++) {
    const dot = document.getElementById(`stageDot${i}`);
    if (dot) {
      dot.className = 'stage-dot';
      if (i < stageNum) dot.classList.add('completed');
      if (i === stageNum) dot.classList.add('active');
    }
  }

  const container = document.getElementById('guidedStageBody');
  if (container && stageData) {
    container.innerHTML = `
      <h4 style="font-size:1.15rem; margin-bottom:1rem;">${stageData.question}</h4>
      <div class="quiz-options-list">
        ${stageData.options.map((opt, oIdx) => `
          <div class="quiz-option-label" data-correct="${opt.correct}" id="guidedOpt_${oIdx}">
            <span style="font-weight:700; width:24px;">${String.fromCharCode(65 + oIdx)}.</span>
            <span>${opt.text}</span>
          </div>
        `).join('')}
      </div>
      <div id="guidedFeedback" style="margin-top:1rem; font-weight:600;"></div>
    `;

    container.querySelectorAll('.quiz-option-label').forEach(optEl => {
      optEl.addEventListener('click', () => {
        const isCorrect = optEl.dataset.correct === 'true';
        container.querySelectorAll('.quiz-option-label').forEach(o => o.style.pointerEvents = 'none');
        
        const feedback = document.getElementById('guidedFeedback');
        if (isCorrect) {
          optEl.style.borderColor = 'var(--accent-emerald)';
          optEl.style.backgroundColor = 'var(--accent-emerald-subtle)';
          if (stageNum < 6) {
            feedback.innerHTML = `
              <span style="color:var(--accent-emerald);">✓ Correct! Stage ${stageNum} validated.</span>
              <button class="btn btn-primary btn-sm" style="margin-left:1rem;" id="nextGuidedStageBtn">Proceed to Stage ${stageNum + 1} →</button>
            `;
            document.getElementById('nextGuidedStageBtn').addEventListener('click', () => {
              AppState.guidedSolver.currentStage++;
              renderGuidedStage();
            });
          } else {
            feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:800;">🎉 Full Guided Problem Solved and Verified!</span>`;
            showToast('Guided problem complete!', 'success');
            recordActivity();
          }
        } else {
          optEl.style.borderColor = 'var(--accent-rose)';
          optEl.style.backgroundColor = 'var(--accent-rose-subtle)';
          feedback.innerHTML = `
            <span style="color:var(--accent-rose);">Try again. Review the problem statement above carefully.</span>
            <button class="btn btn-secondary btn-sm" style="margin-left:1rem;" id="retryStageBtn">Retry</button>
          `;
          document.getElementById('retryStageBtn').addEventListener('click', () => {
            renderGuidedStage();
          });
        }
      });
    });
  }
}

/* ==========================================================================
   SECTION 9: PRACTICE ARENA
   ========================================================================== */

function initializePracticeArena() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.practice.difficulty = btn.dataset.diff;
      generatePracticeProblem();
    });
  });

  const checkBtn = document.getElementById('checkPracticeBtn');
  if (checkBtn) checkBtn.addEventListener('click', checkPracticeAnswer);

  const nextBtn = document.getElementById('nextPracticeBtn');
  if (nextBtn) nextBtn.addEventListener('click', generatePracticeProblem);

  const hintBtn = document.getElementById('hintPracticeBtn');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      if (AppState.practice.currentProblem) {
        showToast(`Hint: ${AppState.practice.currentProblem.hint}`, 'info');
      }
    });
  }

  const solutionBtn = document.getElementById('solutionPracticeBtn');
  if (solutionBtn) {
    solutionBtn.addEventListener('click', showPracticeSolution);
  }

  generatePracticeProblem();
}

function generatePracticeProblem() {
  const bank = PracticeBank[AppState.practice.difficulty] || PracticeBank.easy;
  const p = bank[Math.floor(Math.random() * bank.length)];
  AppState.practice.currentProblem = p;

  const qEl = document.getElementById('practiceQuestionText');
  if (qEl) qEl.textContent = p.q;

  const inputEl = document.getElementById('practiceAnswerInput');
  if (inputEl) {
    inputEl.value = '';
    inputEl.focus();
  }

  const unitEl = document.getElementById('practiceUnitLabel');
  if (unitEl) unitEl.textContent = p.unit;

  const feedback = document.getElementById('practiceFeedback');
  if (feedback) feedback.innerHTML = '';

  const solBox = document.getElementById('practiceSolutionBox');
  if (solBox) {
    solBox.style.display = 'none';
    solBox.innerHTML = '';
  }
}

function checkPracticeAnswer() {
  const p = AppState.practice.currentProblem;
  if (!p) return;

  const inputEl = document.getElementById('practiceAnswerInput');
  const userVal = parseFloat(inputEl.value);
  const feedback = document.getElementById('practiceFeedback');
  if (!feedback) return;

  AppState.progress.practiceTotal++;

  if (userVal === p.ans) {
    AppState.progress.practiceCorrect++;
    AppState.progress.problemsSolved++;
    AppState.progress.streak++;
    if (AppState.progress.streak > AppState.progress.bestStreak) {
      AppState.progress.bestStreak = AppState.progress.streak;
    }
    feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✓ Correct! Excellent mathematical reasoning.</span>`;
    showToast('Correct answer! Streak +1', 'success');
  } else {
    AppState.progress.streak = 0;
    feedback.innerHTML = `<span style="color:var(--accent-rose); font-weight:600;">Not quite. Double-check your arithmetic or click "Show Solution".</span>`;
  }

  saveProgress();
  updateArenaStats();
}

function showPracticeSolution() {
  const p = AppState.practice.currentProblem;
  const solBox = document.getElementById('practiceSolutionBox');
  if (p && solBox) {
    solBox.style.display = 'block';
    solBox.innerHTML = `
      <div style="font-weight:700; color:var(--accent-blue); margin-bottom:0.5rem;">STEP-BY-STEP SOLUTION:</div>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:0.35rem;">
        ${p.steps.map(s => `<li class="fact-item" style="font-family:var(--font-mono);">${s}</li>`).join('')}
      </ul>
      <div style="margin-top:0.5rem; font-weight:700;">Final Answer: ${p.ans} ${p.unit}</div>
    `;
  }
}

function updateArenaStats() {
  const corr = document.getElementById('arenaCorrectCount');
  if (corr) corr.textContent = AppState.progress.practiceCorrect;

  const streak = document.getElementById('arenaStreak');
  if (streak) streak.textContent = AppState.progress.streak;

  const acc = document.getElementById('arenaAccuracy');
  if (acc) {
    const rate = AppState.progress.practiceTotal > 0
      ? Math.round((AppState.progress.practiceCorrect / AppState.progress.practiceTotal) * 100)
      : 100;
    acc.textContent = `${rate}%`;
  }
}

/* ==========================================================================
   SECTION 10: DAILY CHALLENGE
   ========================================================================== */

function initializeDailyChallenge() {
  startChallengeTimer();

  const submitBtn = document.getElementById('submitDailyBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitDailyChallenge);
  }

  const hintBtn = document.getElementById('hintDailyBtn');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      showToast('Hint: First calculate combined work rate (1/4 + 1/6), then invert.', 'info');
    });
  }
}

function startChallengeTimer() {
  if (AppState.dailyChallenge.timerId) clearInterval(AppState.dailyChallenge.timerId);

  AppState.dailyChallenge.timerId = setInterval(() => {
    if (AppState.dailyChallenge.remainingTime > 0 && !AppState.dailyChallenge.answered) {
      AppState.dailyChallenge.remainingTime--;
      const m = Math.floor(AppState.dailyChallenge.remainingTime / 60);
      const s = AppState.dailyChallenge.remainingTime % 60;
      const el = document.getElementById('challengeTimerDisplay');
      if (el) el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function submitDailyChallenge() {
  const inputEl = document.getElementById('dailyAnswerInput');
  const userVal = parseFloat(inputEl.value);
  const feedback = document.getElementById('dailyFeedback');
  const solutionEl = document.getElementById('dailySolutionBox');

  // Daily problem: 1/4 + 1/6 = 5/12 → 12/5 = 2.4 hours
  if (Math.abs(userVal - 2.4) < 0.05) {
    AppState.dailyChallenge.answered = true;
    AppState.progress.dailyCompleted = true;
    saveProgress();
    if (feedback) {
      feedback.innerHTML = `<span style="color:var(--accent-emerald); font-weight:800;">🎉 Outstanding! Daily Challenge Completed with Precision.</span>`;
    }
    if (solutionEl) {
      solutionEl.style.display = 'block';
      solutionEl.innerHTML = `
        <strong>Detailed Solution:</strong> Rate A = 1/4, Rate B = 1/6. Combined Rate = 3/12 + 2/12 = 5/12 pool/hr. Total Time = 12/5 = <strong>2.4 hours</strong> (or 2 hours 24 minutes).
      `;
    }
    showToast('Daily Challenge conquered!', 'success');
  } else {
    if (feedback) {
      feedback.innerHTML = `<span style="color:var(--accent-rose); font-weight:600;">Incorrect. Check your combined rate calculation.</span>`;
    }
  }
}

/* ==========================================================================
   SECTION 11: FINAL CHAPTER QUIZ
   ========================================================================== */

function initializeQuiz() {
  const startBtn = document.getElementById('startQuizBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startQuiz);
  }

  const prevBtn = document.getElementById('quizPrevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (AppState.quiz.currentQuestion > 0) {
        AppState.quiz.currentQuestion--;
        renderQuizQuestion();
      }
    });
  }

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (AppState.quiz.currentQuestion < QuizQuestions.length - 1) {
        AppState.quiz.currentQuestion++;
        renderQuizQuestion();
      } else {
        submitQuiz();
      }
    });
  }

  const retryBtn = document.getElementById('quizRetryBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', startQuiz);
  }
}

function startQuiz() {
  AppState.quiz.currentQuestion = 0;
  AppState.quiz.answers = {};
  AppState.quiz.startTime = Date.now();

  const welcomeView = document.getElementById('quizWelcomeView');
  const activeView = document.getElementById('quizActiveView');
  const resultsView = document.getElementById('quizResultsView');

  if (welcomeView) welcomeView.style.display = 'none';
  if (resultsView) resultsView.style.display = 'none';
  if (activeView) activeView.style.display = 'block';

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const idx = AppState.quiz.currentQuestion;
  const q = QuizQuestions[idx];

  const qNum = document.getElementById('quizQuestionNumber');
  if (qNum) qNum.textContent = `Question ${idx + 1} of ${QuizQuestions.length}`;

  const bar = document.getElementById('quizProgressBar');
  if (bar) bar.style.width = `${((idx + 1) / QuizQuestions.length) * 100}%`;

  const textEl = document.getElementById('quizQuestionText');
  if (textEl) textEl.textContent = q.question;

  const container = document.getElementById('quizQuestionInteractive');
  if (!container) return;
  container.innerHTML = '';

  if (q.type === 'mcq' || q.type === 'op') {
    const list = document.createElement('div');
    list.className = 'quiz-options-list';
    q.options.forEach((opt, oIdx) => {
      const label = document.createElement('div');
      label.className = `quiz-option-label ${AppState.quiz.answers[idx] === oIdx ? 'selected' : ''}`;
      label.innerHTML = `<strong>${String.fromCharCode(65 + oIdx)}.</strong> <span>${opt}</span>`;
      label.addEventListener('click', () => {
        AppState.quiz.answers[idx] = oIdx;
        renderQuizQuestion();
      });
      list.appendChild(label);
    });
    container.appendChild(list);
  } else if (q.type === 'num') {
    const row = document.createElement('div');
    row.className = 'input-answer-row';
    row.innerHTML = `
      <input type="number" id="quizNumInput" class="math-input" placeholder="Enter number..." value="${AppState.quiz.answers[idx] !== undefined ? AppState.quiz.answers[idx] : ''}">
      <span style="font-weight:700;">${q.unit || ''}</span>
    `;
    container.appendChild(row);
    const input = row.querySelector('#quizNumInput');
    input.addEventListener('input', (e) => {
      AppState.quiz.answers[idx] = parseFloat(e.target.value);
    });
  }

  const prevBtn = document.getElementById('quizPrevBtn');
  if (prevBtn) prevBtn.disabled = idx === 0;

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.textContent = idx === QuizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question →';
  }
}

function submitQuiz() {
  AppState.quiz.endTime = Date.now();
  let correct = 0;

  QuizQuestions.forEach((q, idx) => {
    const ans = AppState.quiz.answers[idx];
    if (q.type === 'mcq' || q.type === 'op') {
      if (ans === q.correctIndex) correct++;
    } else if (q.type === 'num') {
      if (ans === q.correctAnswer) correct++;
    }
  });

  const scorePct = Math.round((correct / QuizQuestions.length) * 100);
  if (scorePct > AppState.progress.quizBestScore) {
    AppState.progress.quizBestScore = scorePct;
    saveProgress();
  }

  const activeView = document.getElementById('quizActiveView');
  const resultsView = document.getElementById('quizResultsView');
  if (activeView) activeView.style.display = 'none';
  if (resultsView) resultsView.style.display = 'block';

  const scoreNum = document.getElementById('quizScoreNumber');
  if (scoreNum) scoreNum.textContent = `${scorePct}%`;

  const circle = document.getElementById('quizScoreCircle');
  if (circle) circle.style.setProperty('--score-pct', scorePct);

  const breakdown = document.getElementById('quizBreakdownText');
  if (breakdown) breakdown.textContent = `${correct} of ${QuizQuestions.length} Questions Correct`;

  const feedbackMsg = document.getElementById('quizFeedbackMessage');
  if (feedbackMsg) {
    if (scorePct >= 90) {
      feedbackMsg.textContent = 'Outstanding! You can confidently analyze and solve mathematical word problems.';
    } else if (scorePct >= 70) {
      feedbackMsg.textContent = 'Excellent progress! Review the trickiest problem types and try again.';
    } else if (scorePct >= 50) {
      feedbackMsg.textContent = 'Good effort! Strengthen your problem-analysis skills with more practice.';
    } else {
      feedbackMsg.textContent = 'Keep going! Start with the 5-step method and build your confidence one problem at a time.';
    }
  }

  showToast('Quiz evaluated!', 'success');
}

/* ==========================================================================
   SECTION 12 & 13: NOTES & BOOKMARKS
   ========================================================================== */

function initializeNotes() {
  renderNotesList();

  const saveBtn = document.getElementById('saveNoteBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const textarea = document.getElementById('newNoteTextarea');
      const text = textarea.value.trim();
      if (!text) return;

      const newNote = {
        id: `note-${Date.now()}`,
        text: text,
        date: new Date().toISOString().split('T')[0]
      };
      AppState.notes.unshift(newNote);
      localStorage.setItem('studymate_notes', JSON.stringify(AppState.notes));
      textarea.value = '';
      renderNotesList();
      showToast('Note saved!', 'success');
    });
  }
}

function renderNotesList() {
  const list = document.getElementById('studentNotesList');
  if (!list) return;
  list.innerHTML = '';

  if (AppState.notes.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">No personal notes yet. Add your key problem-solving takeaways above!</p>';
    return;
  }

  AppState.notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-item-card';
    card.innerHTML = `
      <div style="flex:1;">
        <p style="font-size:0.95rem; color:var(--text-primary); margin-bottom:0.25rem;">${note.text}</p>
        <small style="color:var(--text-muted); font-size:0.75rem;">${note.date}</small>
      </div>
      <button class="action-btn" style="width:28px; height:28px;" title="Delete note">✕</button>
    `;
    card.querySelector('button').addEventListener('click', () => {
      AppState.notes = AppState.notes.filter(n => n.id !== note.id);
      localStorage.setItem('studymate_notes', JSON.stringify(AppState.notes));
      renderNotesList();
      showToast('Note removed', 'info');
    });
    list.appendChild(card);
  });
}

function initializeBookmarks() {
  document.querySelectorAll('.bookmark-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBookmark(btn.dataset.id, btn.dataset.title, btn.dataset.category);
    });
  });
}

function toggleBookmark(id, title, category) {
  const existingIdx = AppState.bookmarks.findIndex(b => b.id === id);
  if (existingIdx >= 0) {
    AppState.bookmarks.splice(existingIdx, 1);
    showToast('Bookmark removed', 'info');
  } else {
    AppState.bookmarks.push({ id, title, category, date: new Date().toISOString().split('T')[0] });
    showToast('Bookmark added!', 'success');
  }
  localStorage.setItem('studymate_bookmarks', JSON.stringify(AppState.bookmarks));
  updateProgressUI();
}

function renderBookmarksList() {
  const container = document.getElementById('bookmarksListModalContainer');
  if (!container) return;
  container.innerHTML = '';

  if (AppState.bookmarks.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:2rem 0;">No bookmarks saved yet. Click bookmark buttons across lessons and formulas to save them here!</p>';
    return;
  }

  AppState.bookmarks.forEach(bm => {
    const item = document.createElement('div');
    item.className = 'note-item-card';
    item.innerHTML = `
      <div>
        <span class="example-category-badge" style="margin-bottom:0.25rem; display:inline-block;">${bm.category}</span>
        <h4 style="font-size:1rem;">${bm.title}</h4>
      </div>
      <button class="btn btn-outline btn-sm">Remove</button>
    `;
    item.querySelector('button').addEventListener('click', () => {
      toggleBookmark(bm.id, bm.title, bm.category);
      renderBookmarksList();
    });
    container.appendChild(item);
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function recordActivity() {
  AppState.progress.activitiesCompleted++;
  saveProgress();
}
