/**
 * EduNexa AI — Grade 3 Digital Classroom Core Engine (grade3.js)
 */

(function () {
  'use strict';

  // 1. STATE & STORAGE MANAGEMENT
  const STORAGE_KEY = 'studymate_g3_state';

  const defaultState = {
    stars: 0,
    lessonsCompleted: [],
    questionsSolved: 0,
    quizHistory: [],
    dailyPlan: {
      date: new Date().toDateString(),
      english: false,
      math: false,
      science: false,
      language: false,
      game_quiz: false
    },
    streak: {
      count: 1,
      lastDate: new Date().toDateString(),
      best: 1
    },
    unlockedBadges: []
  };

  let appState = loadState();

  function loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.dailyPlan && parsed.dailyPlan.date !== new Date().toDateString()) {
          parsed.dailyPlan = {
            date: new Date().toDateString(),
            english: false,
            math: false,
            science: false,
            language: false,
            game_quiz: false
          };
        }
        return { ...defaultState, ...parsed };
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
    return { ...defaultState };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      updateGlobalUI();
    } catch (e) {
      console.error('Save state error:', e);
    }
  }

  // 2. CURRICULUM DATA: SUBJECTS, LESSONS, STORIES, GAMES, QUIZ
  const SUBJECTS = [
    {
      id: 'english',
      name: 'English Language & Literature',
      icon: '📖',
      bannerClass: 'banner-english',
      lessonsCount: 33,
      desc: 'Reading with understanding, parts of speech, grammar rules, vocabulary expansion, and creative paragraph writing.'
    },
    {
      id: 'math',
      name: 'Mathematics Explorer',
      icon: '🔢',
      bannerClass: 'banner-math',
      lessonsCount: 31,
      desc: 'Numbers up to 10,000, place value, 4-digit addition/subtraction, multiplication tables, fractions, and geometry.'
    },
    {
      id: 'science',
      name: 'Science & Discovery',
      icon: '🔬',
      bannerClass: 'banner-science',
      lessonsCount: 22,
      desc: 'Living things, plant & animal life cycles, human sense organs, states of matter, weather, and the solar system.'
    },
    {
      id: 'urdu',
      name: 'Urdu Language (اردو)',
      icon: '🇵🇰',
      bannerClass: 'banner-urdu',
      lessonsCount: 12,
      desc: 'قواعد، اسم، فعل، صفت، واحد جمع، الٹ الفاظ، فقرے بنانا، اور دلچسپ کہانیاں۔'
    },
    {
      id: 'sindhi',
      name: 'Sindhi Language (سنڌي)',
      icon: '🪶',
      bannerClass: 'banner-sindhi',
      lessonsCount: 12,
      desc: 'سنڌي پڙهائي، لفظ ۽ جملا، اسم، فعل، واحد جمع ۽ مختصر اخلاقي ڪهاڻيون.'
    },
    {
      id: 'computer',
      name: 'Digital Skills & Computing',
      icon: '💻',
      bannerClass: 'banner-computer',
      lessonsCount: 10,
      desc: 'Hardware components, mouse & keyboard mastery, file management, cyber safety, and digital manners.'
    },
    {
      id: 'gk',
      name: 'General Knowledge & Pakistan',
      icon: '🌍',
      bannerClass: 'banner-gk',
      lessonsCount: 10,
      desc: 'Pakistan geography, provinces, national heritage, world oceans, continents, safety rules, and inventions.'
    }
  ];

  // Detailed Lesson Database
  const LESSONS_DB = {
    english: [
      {
        id: 'eng_1',
        num: 'Lesson 1',
        module: 'Module 1 — Reading',
        title: 'Reading with Understanding',
        desc: 'Learn how to read fluently, pause at full stops, and understand the message of a paragraph.',
        content: `
          <div class="lesson-illustration-box">📖 👓 💡</div>
          <p><strong>Reading with understanding</strong> means you don't just pronounce the words, but you make a picture in your mind of what is happening!</p>
          <div class="did-you-know-card">
            💡 <strong>Top Tip:</strong> When you read, ask yourself: <em>Who is in this story? What is the main problem? How was it solved?</em>
          </div>
          <h4>Example Reading:</h4>
          <blockquote style="background:#f8fafc; padding:12px; border-left:4px solid #0284c7; border-radius:6px; margin:12px 0;">
            "Ayaan saw a little bird with a wet wing on his veranda. He placed a dry towel nearby and kept a tiny bowl of water. Soon, the bird dried its feathers and flew away happily."
          </blockquote>
          <h4>Quick Comprehension Check:</h4>
          <p>Why did Ayaan help the bird? Because its wing was wet, and he cared for nature!</p>
        `,
        activity: 'Find 3 action words in the reading example above: <em>saw, placed, flew</em>.'
      },
      {
        id: 'eng_2',
        num: 'Lesson 2',
        module: 'Module 1 — Reading',
        title: 'Finding the Main Idea',
        desc: 'Discover the central message or key point that the author wants you to remember.',
        content: `
          <div class="lesson-illustration-box">🎯 📑 ✨</div>
          <p>The <strong>Main Idea</strong> is what the text is mostly about. Supporting details give us more facts about that main idea.</p>
          <div class="did-you-know-card">
            🌟 <strong>Secret Clue:</strong> The main idea is usually found in the first or the last sentence of a paragraph!
          </div>
        `,
        activity: 'Read any paragraph in your book and summarize it in ONE short sentence.'
      },
      {
        id: 'eng_6',
        num: 'Lesson 6',
        module: 'Module 2 — Grammar',
        title: 'Common and Proper Nouns',
        desc: 'Differentiate between general naming words and special names that always start with a capital letter.',
        content: `
          <div class="lesson-illustration-box">🏙️ 👦 🏛️</div>
          <p>A <strong>Noun</strong> is the name of a person, place, animal, or thing.</p>
          <ul>
            <li><strong>Common Noun:</strong> General names (city, boy, river, mountain).</li>
            <li><strong>Proper Noun:</strong> Special names that ALWAYS begin with a Capital letter (Karachi, Ali, Indus River, K2).</li>
          </ul>
          <div class="did-you-know-card">
            💡 <strong>Rule:</strong> Days of the week (Monday) and months (August) are also Proper Nouns!
          </div>
        `,
        activity: 'Underline the proper nouns: <em>"Sara visited Islamabad on Friday."</em>'
      },
      {
        id: 'eng_10',
        num: 'Lesson 10',
        module: 'Module 2 — Grammar',
        title: 'Action Verbs',
        desc: 'Discover doing words and action verbs that describe what people, animals, and machines do.',
        content: `
          <div class="lesson-illustration-box">🏃‍♂️ ⚽ ✈️</div>
          <p><strong>Verbs</strong> are action words. They show what someone or something is doing.</p>
          <p><em>Examples:</em> jump, write, calculate, glow, celebrate, swim.</p>
        `,
        activity: 'Act out 3 action verbs silently (charades) and guess them!'
      },
      {
        id: 'eng_12',
        num: 'Lesson 12',
        module: 'Module 2 — Grammar',
        title: 'Adjectives (Describing Words)',
        desc: 'Use colorful words to describe size, color, texture, shape, and feelings.',
        content: `
          <div class="lesson-illustration-box">🎨 🌈 🐘</div>
          <p><strong>Adjectives</strong> describe nouns. They tell us <em>what kind</em>, <em>which one</em>, or <em>how many</em>.</p>
          <p><em>Examples:</em> The <strong>gigantic</strong> blue whale, three <strong>ripe</strong> mangoes, a <strong>cheerful</strong> student.</p>
        `,
        activity: 'Think of 3 adjectives to describe your classroom.'
      },
      {
        id: 'eng_23',
        num: 'Lesson 23',
        module: 'Module 4 — Vocabulary',
        title: 'Synonyms and Antonyms',
        desc: 'Expand your writing with words having similar meanings and opposite meanings.',
        content: `
          <div class="lesson-illustration-box">↔️ 🔄 📚</div>
          <p><strong>Synonyms:</strong> Words with similar meanings (Huge = Giant, Glad = Happy, Swift = Fast).</p>
          <p><strong>Antonyms:</strong> Words with opposite meanings (Bright × Dark, Brave × Fearful, Heavy × Light).</p>
        `,
        activity: 'What is the synonym of "Tiny"? (Small) What is the antonym of "Early"? (Late).'
      },
      {
        id: 'eng_29',
        num: 'Lesson 29',
        module: 'Module 5 — Writing',
        title: 'Writing Simple Paragraphs',
        desc: 'Combine topic sentences, supporting details, and concluding thoughts into a neat paragraph.',
        content: `
          <div class="lesson-illustration-box">✍️ 📝 📑</div>
          <p>A good paragraph has 3 parts:
            <br>1. <strong>Topic Sentence:</strong> Introduces the main topic.
            <br>2. <strong>Body Sentences:</strong> Give 3-4 interesting details.
            <br>3. <strong>Closing Sentence:</strong> Wraps up your thoughts nicely.
          </p>
        `,
        activity: 'Write 4 sentences about "My Favorite Hobby".'
      }
    ],
    math: [
      {
        id: 'math_1',
        num: 'Lesson 1',
        module: 'Module 1 — Numbers',
        title: 'Numbers up to 10,000',
        desc: 'Understand 4-digit numbers with Thousands, Hundreds, Tens, and Ones.',
        content: `
          <div class="lesson-illustration-box">🔢 🔟 💯 🏆</div>
          <p>A 4-digit number has four place values: <strong>Thousands (Th), Hundreds (H), Tens (T), Ones (O)</strong>.</p>
          <h4>Example: 4,735</h4>
          <p>• 4 Thousands = 4,000<br>• 7 Hundreds = 700<br>• 3 Tens = 30<br>• 5 Ones = 5</p>
          <div class="did-you-know-card">
            💡 The largest 4-digit number is <strong>9,999</strong>! When you add 1, you get <strong>10,000</strong> (Ten Thousand).
          </div>
        `,
        activity: 'Write the number name of 6,204: <em>Six thousand two hundred and four</em>.'
      },
      {
        id: 'math_7',
        num: 'Lesson 7',
        module: 'Module 2 — Addition & Subtraction',
        title: 'Addition with Regrouping (Carrying)',
        desc: 'Master column addition of 3-digit and 4-digit numbers with regrouping.',
        content: `
          <div class="lesson-illustration-box">➕ 🧮 📈</div>
          <p>When the sum of a column is 10 or greater, we carry over to the next left column!</p>
          <pre style="background:#f1f5f9; padding:12px; border-radius:8px; font-family:monospace; font-size:1.1rem;">
    ¹  ¹
    3, 5 6 8
  + 2, 6 7 4
  -----------
    6, 2 4 2
          </pre>
        `,
        activity: 'Try in your head: 450 + 250 = 700.'
      },
      {
        id: 'math_12',
        num: 'Lesson 12',
        module: 'Module 3 — Multiplication',
        title: 'Times Tables Mastery (6x, 7x, 8x, 9x)',
        desc: 'Multiplication is repeated addition. Learn patterns to recall facts instantly.',
        content: `
          <div class="lesson-illustration-box">✖️ ⚡ 🎯</div>
          <p>Multiplication means equal groups! <strong>6 × 4 = 24</strong> (6 groups of 4).</p>
          <p><em>Rule of Zero:</em> Any number × 0 = 0.<br><em>Rule of One:</em> Any number × 1 = itself.</p>
        `,
        activity: 'What is 8 × 7? (56) What is 9 × 6? (54).'
      },
      {
        id: 'math_19',
        num: 'Lesson 19',
        module: 'Module 5 — Fractions',
        title: 'Understanding Fractions (Parts of a Whole)',
        desc: 'Numerators and Denominators: Learn how wholes are split into equal shares.',
        content: `
          <div class="lesson-illustration-box">🍕 🍰 🥧</div>
          <p>A <strong>fraction</strong> represents equal parts of a whole.</p>
          <p>• <strong>Numerator (Top number):</strong> Number of parts you have.<br>• <strong>Denominator (Bottom number):</strong> Total equal parts.</p>
          <p><em>Example:</em> If a pizza is cut into 4 equal slices and you eat 1 slice, you ate <strong>1/4 (one quarter)</strong>.</p>
        `,
        activity: 'If a chocolate bar has 8 blocks and you share 4 with a friend, what fraction did you share? 4/8 or 1/2!'
      },
      {
        id: 'math_27',
        num: 'Lesson 27',
        module: 'Module 7 — Geometry',
        title: '2D and 3D Shapes Explorer',
        desc: 'Identify vertices, edges, faces of Cubes, Cylinders, Spheres, Rectangles, and Triangles.',
        content: `
          <div class="lesson-illustration-box">📐 🔺 📦 ⚽</div>
          <p>• <strong>2D Shapes (Flat):</strong> Square (4 equal sides), Rectangle, Triangle (3 sides), Circle.<br>• <strong>3D Shapes (Solid):</strong> Cube (6 flat square faces, 8 vertices), Sphere (1 curved surface), Cylinder (2 flat circular faces + 1 curved).</p>
        `,
        activity: 'Name a 3D shape found in your kitchen! (A can = Cylinder, an orange = Sphere).'
      }
    ],
    science: [
      {
        id: 'sci_1',
        num: 'Lesson 1',
        module: 'Group 1 — Living Things',
        title: 'Living and Non-Living Things',
        desc: 'Characteristics of life: Nutrition, respiration, movement, growth, and reproduction.',
        content: `
          <div class="lesson-illustration-box">🌱 🐾 🪨 ☀️</div>
          <p><strong>Living Things:</strong> Need food, water, air, grow, move on their own, and reproduce (Humans, Birds, Trees).</p>
          <p><strong>Non-Living Things:</strong> Do not breathe, grow, or need food (Rocks, Chairs, Cars).</p>
          <div class="did-you-know-card">
            🌿 <strong>Did You Know?</strong> Plants are living things! They move towards sunlight and make their own food through photosynthesis.
          </div>
        `,
        activity: 'Classify: Is a river living or non-living? (Non-living, because it does not reproduce or have cells).'
      },
      {
        id: 'sci_3',
        num: 'Lesson 3',
        module: 'Group 1 — Living Things',
        title: 'Parts of a Plant & Their Functions',
        desc: 'Roots, stem, leaves, flowers, and seeds: how each part keeps the plant healthy.',
        content: `
          <div class="lesson-illustration-box">🌻 🌿 💧</div>
          <p>• <strong>Roots:</strong> Anchor the plant and absorb water & minerals from soil.<br>• <strong>Stem:</strong> Transports water up and supports leaves.<br>• <strong>Leaves:</strong> The "food factory" of the plant using sunlight and chlorophyll.<br>• <strong>Flowers:</strong> Help the plant produce fruits and seeds.</p>
        `,
        activity: 'Draw a simple flower and label roots, stem, and leaf.'
      },
      {
        id: 'sci_11',
        num: 'Lesson 11',
        module: 'Group 3 — Matter & Materials',
        title: 'States of Matter: Solids, Liquids & Gases',
        desc: 'Molecules in action: shape, volume, and phase transitions between ice, water, and steam.',
        content: `
          <div class="lesson-illustration-box">🧊 💧 💨</div>
          <p>• <strong>Solids:</strong> Definite shape and volume (wood, ice, book).<br>• <strong>Liquids:</strong> Definite volume, takes the shape of its container (water, milk, oil).<br>• <strong>Gases:</strong> Spreads out to fill any space (air, oxygen, helium).</p>
        `,
        activity: 'When ice melts into water, what change of state happened? (Solid to Liquid).'
      },
      {
        id: 'sci_22',
        num: 'Lesson 22',
        module: 'Group 6 — Space',
        title: 'Our Solar System & The Planets',
        desc: 'Meet the 8 planets orbiting our star, the Sun, in order of distance.',
        content: `
          <div class="lesson-illustration-box">☀️ 🪐 🌍 🚀</div>
          <p>The 8 planets in order from the Sun are: <strong>Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</strong>.</p>
          <div class="did-you-know-card">
            🌟 <strong>Memory Mnemonic:</strong> <em>"My Very Energetic Mother Just Served Us Noodles!"</em>
          </div>
        `,
        activity: 'Which planet is called the "Red Planet"? (Mars).'
      }
    ],
    urdu: [
      {
        id: 'urdu_1',
        num: 'سبق ۱',
        module: 'حصہ اول — پڑھائی و قواعد',
        title: 'اسم کی اقسام (خاص اور عام)',
        desc: 'اسم معرفہ اور اسم نکرہ کی پہچان اور جملوں میں درست استعمال۔',
        content: `
          <div class="lesson-illustration-box" style="font-family:var(--font-urdu); font-size:2.5rem;">🇵🇰 📖 ✒️</div>
          <div style="font-family:var(--font-urdu); font-size:1.3rem; line-height:2; direction:rtl; text-align:right;">
            <p><strong>اسم:</strong> کسی بھی شخص، جگہ یا چیز کے نام کو اسم کہتے ہیں۔</p>
            <p><strong>اسم نکرہ (عام نام):</strong> لڑکا، شہر، کتاب، دریا۔</p>
            <p><strong>اسم معرفہ (خاص نام):</strong> علامہ اقبال، کراچی، دریائے سندھ، قرآن مجید۔</p>
          </div>
        `,
        activity: 'جملے میں سے اسم معرفہ الگ کریں: "احمد لاہور جا رہا ہے۔" (احمد، لاہور)'
      },
      {
        id: 'urdu_5',
        num: 'سبق ۵',
        module: 'حصہ دوم — فقرے اور ذخیرہ الفاظ',
        title: 'واحد اور جمع',
        desc: 'ایک چیز کو واحد اور ایک سے زیادہ چیزوں کو جمع کہتے ہیں۔',
        content: `
          <div class="lesson-illustration-box" style="font-family:var(--font-urdu);">📚 ✏️ 👦</div>
          <div style="font-family:var(--font-urdu); font-size:1.3rem; line-height:2; direction:rtl; text-align:right;">
            <p>• کتاب ← کتب / کتابیں<br>• لڑکا ← لڑکے<br>• چڑیا ← چڑیاں<br>• ستارہ ← ستارے</p>
          </div>
        `,
        activity: 'لفظ "پرندہ" کی جمع کیا ہے؟ (پرندے)'
      }
    ],
    sindhi: [
      {
        id: 'sindhi_1',
        num: 'سبق ۱',
        module: 'حصو اول — سنڌي پڙهائي',
        title: 'اسم ۽ ان جا قسم (خاص ۽ عام اسم)',
        desc: 'سنڌي ٻوليءَ ۾ اسم خاص ۽ اسم عام جي سڃاڻپ ۽ مشق.',
        content: `
          <div class="lesson-illustration-box" style="font-size:2.5rem;">🪶 🕌 🌴</div>
          <div style="font-size:1.25rem; line-height:2; direction:rtl; text-align:right;">
            <p><strong>اسم:</strong> ڪنهن به ماڻهو، جاءِ، جانور يا شيءِ جي نالي کي اسم چئبو آهي.</p>
            <p><strong>اسم عام:</strong> ڇوڪرو، شهر، درياءُ، ڪتاب.</p>
            <p><strong>اسم خاص:</strong> شاهه عبداللطيف ڀٽائي، سکر، سنڌو درياءُ.</p>
          </div>
        `,
        activity: 'هيٺين مان اسم خاص چونڊيو: "سکر سنڌو درياءَ جي ڪناري تي آهي."'
      }
    ],
    computer: [
      {
        id: 'comp_1',
        num: 'Lesson 1',
        module: 'Module 1 — Computer Basics',
        title: 'What is a Computer & Its Main Parts',
        desc: 'Understand Input, Processing, and Output with Monitor, CPU, Keyboard, and Mouse.',
        content: `
          <div class="lesson-illustration-box">🖥️ ⌨️ 🖱️ 🧠</div>
          <p>A <strong>computer</strong> is an electronic machine that takes data (Input), processes it (CPU), and gives useful results (Output).</p>
          <p>• <strong>CPU:</strong> The "Brain" of the computer.<br>• <strong>Keyboard & Mouse:</strong> Input devices.<br>• <strong>Monitor & Printer:</strong> Output devices.</p>
        `,
        activity: 'Which device is used to type letters on screen? (Keyboard).'
      },
      {
        id: 'comp_8',
        num: 'Lesson 8',
        module: 'Module 2 — Digital Citizenship',
        title: 'Internet Safety & Cyber Rules',
        desc: 'Never share personal passwords, ask parents before clicking unknown links, and be kind online.',
        content: `
          <div class="lesson-illustration-box">🔒 🌐 🛡️</div>
          <p>The Internet connects millions of computers worldwide. Always practice safety:
            <br>1. Never share your real name, address, or school with strangers.
            <br>2. Always keep strong passwords secret from everyone except your parents!
          </p>
        `,
        activity: 'Golden Rule: If something on the screen looks strange, immediately tell a parent or teacher!'
      }
    ],
    gk: [
      {
        id: 'gk_1',
        num: 'Lesson 1',
        module: 'Section 1 — Pakistan Heritage',
        title: 'Our Homeland Pakistan & National Symbols',
        desc: 'National flower, animal, bird, founder Quaid-e-Azam, and the five provinces of Pakistan.',
        content: `
          <div class="lesson-illustration-box">🇵🇰 🏔️ 🌾 ⭐</div>
          <p>• <strong>Founder:</strong> Quaid-e-Azam Muhammad Ali Jinnah.<br>• <strong>National Poet:</strong> Allama Muhammad Iqbal.<br>• <strong>National Animal:</strong> Markhor 🐐<br>• <strong>National Bird:</strong> Chukar Partridge 🐦<br>• <strong>National Flower:</strong> Jasmine (چمبیلی) 🌸</p>
        `,
        activity: 'What is the capital city of Pakistan? (Islamabad).'
      }
    ]
  };

  // Original English Reading Stories
  const STORIES_DB = [
    {
      id: 'story_1',
      title: 'The Clever Little Sparrow',
      icon: '🐦',
      snippet: 'Chirpy the sparrow uses quick thinking to solve a big garden problem when the summer heat dries up the fountain.',
      storyText: `
        Once upon a sunny afternoon in Lahore, Chirpy the sparrow was hopping along the mango tree branches. The summer sun was blazing, and the park fountain had stopped running. Chirpy's bird friends were thirsty and tired.
        
        Chirpy noticed a clay pitcher sitting under the shade of the gazebo. Inside, there was a little water at the very bottom, but their tiny beaks could not reach down!
        
        While others gave up, Chirpy remembered a clever science idea. She picked up a small pebble in her beak and dropped it into the pitcher: *Plop!*
        
        She called her friends, and together they dropped fifty smooth pebbles into the jug. Slowly, the water level rose to the top. All the birds drank happily and praised Chirpy for her patience and clever thinking!
      `,
      vocab: ['Blazing: Very hot', 'Gazebo: A small open garden shelter', 'Pebble: A small smooth stone', 'Praised: Spoke highly of someone'],
      moral: 'Patience, teamwork, and clever thinking can solve even the toughest challenges.',
      comprehension: [
        { q: 'Where did the story take place?', a: 'In a park in Lahore' },
        { q: 'What problem did the birds face?', a: 'They were thirsty because the fountain was dry' },
        { q: 'How did Chirpy raise the water level?', a: 'By dropping small pebbles inside the pitcher' },
        { q: 'What is the moral of the story?', a: 'Problem-solving and teamwork bring success' }
      ]
    },
    {
      id: 'story_2',
      title: 'A Day at the Science Fair',
      icon: '🔬',
      snippet: 'Zainab and Bilal build a working solar-powered toy car and learn the true power of clean green energy.',
      storyText: `
        Grade 3 students at Model Primary School were bustling with excitement for the Annual Science Exhibition. Zainab and Bilal wanted to build something that helped our planet Earth.
        
        "Let's make a car that doesn't need smoky petrol," suggested Zainab. They took a lightweight cardboard chassis, four bottle caps for wheels, a tiny electric motor, and a small solar panel borrowed from an old calculator.
        
        When the headmistress walked by, Bilal placed the car under the bright ceiling lamp. The solar cells caught the photons, the miniature motor whirred, and the little eco-car zoomed straight across the table!
        
        The entire auditorium clapped. Zainab and Bilal won the Young Innovator Gold Ribbon for showing how clean sunshine can power our future.
      `,
      vocab: ['Bustling: Full of energetic activity', 'Chassis: The frame of a vehicle', 'Photons: Particles of light energy', 'Innovator: Someone who invents new ideas'],
      moral: 'Science and renewable energy help us protect our environment.',
      comprehension: [
        { q: 'What did Zainab and Bilal build?', a: 'A solar-powered model car' },
        { q: 'Why did they choose solar power?', a: 'To make an eco-friendly vehicle without smoke' },
        { q: 'What award did they win?', a: 'The Young Innovator Gold Ribbon' }
      ]
    },
    {
      id: 'story_3',
      title: 'The Lost School Bag',
      icon: '🎒',
      snippet: 'Hamza discovers a lost bag on the school bus and learns why honesty is always the greatest reward.',
      storyText: `
        At the end of a busy Friday at school, Hamza was the last to get off the bus. On the seat behind him, he spotted a shiny blue backpack with superhero stickers. Inside were brand new colored markers, geometry instruments, and a student ID card.
        
        Hamza could have kept the shiny markers, but he remembered his teacher's words: "Honesty is doing the right thing even when no one is watching."
        
        He ran back to the bus driver and handed over the bag. The next morning at morning assembly, little Daniyal from Grade 1 smiled with tears of joy as he received his bag back. The Principal awarded Hamza the Star of Honesty badge in front of the whole school.
      `,
      vocab: ['Spotted: Noticed or saw', 'Instruments: Tools used for drawing/math', 'Assembly: A gathering of teachers and students'],
      moral: 'Honesty builds trust and true character.',
      comprehension: [
        { q: 'What did Hamza find on the bus?', a: 'A lost backpack with school supplies' },
        { q: 'What did Hamza decide to do?', a: 'He gave it honestly to the school authority' }
      ]
    },
    {
      id: 'story_4',
      title: 'The Helpful Neighbour',
      icon: '🏡',
      snippet: 'A community cleanup day turns into a heartwarming celebration of friendship across generations.',
      storyText: `
        Old Uncle Rehman had a beautiful vegetable garden in Sukkur, but after a windy dust storm, dried leaves and branches covered his lawn.
        
        Ali and his sister Fatima saw Uncle Rehman struggling with a rake. Without being asked, they brought two buckets and spent their Saturday morning clearing the pathways, watering the tomato vines, and stacking the branches neatly.
        
        Uncle Rehman was so touched that he baked fresh warm sweet dates and invited their family over for tea. That day, Ali and Fatima realized that kindness to our neighbours brings the sweetest happiness.
      `,
      vocab: ['Struggling: Having difficulty', 'Pathways: Walking tracks', 'Neighbour: Someone who lives nearby'],
      moral: 'Helping our elders and neighbours creates a caring community.',
      comprehension: [
        { q: 'Why did Uncle Rehman need help?', a: 'A windstorm made a mess in his garden' },
        { q: 'How did the children help?', a: 'They cleaned the lawn and watered the plants' }
      ]
    },
    {
      id: 'story_5',
      title: 'The Garden Adventure',
      icon: '🐞',
      snippet: 'An inquisitive magnifying glass walk reveals the hidden micro-world of busy ants and pollinating honeybees.',
      storyText: `
        Equipped with a wooden magnifying glass, Sami explored his school garden. Beneath a flat pebble, he discovered a bustling colony of black ants carrying crumbs twice their own body weight!
        
        Nearby on a yellow sunflower, a honeybee was busy collecting golden pollen in the tiny baskets on its hind legs. Sami watched respectfully without disturbing them.
        
        Nature was full of hardworking little heroes, all cooperating together to keep the garden alive and blooming.
      `,
      vocab: ['Equipped: Having necessary tools', 'Colony: A group of insects living together', 'Pollen: Fine yellow dust from flowers'],
      moral: 'Every creature, big or small, plays an important part in nature.',
      comprehension: [
        { q: 'What tool did Sami use to explore?', a: 'A magnifying glass' },
        { q: 'What were the ants carrying?', a: 'Crumbs twice their own weight' }
      ]
    }
  ];

  // Practice Question Bank
  const PRACTICE_QUESTIONS = [
    {
      subject: 'english',
      diff: 'easy',
      q: 'Which of the following is a PROPER noun?',
      options: ['mountain', 'Islamabad', 'river', 'school'],
      correct: 1,
      exp: 'Islamabad is the special name of a specific city and begins with a capital letter.'
    },
    {
      subject: 'english',
      diff: 'medium',
      q: 'Choose the correct action verb: "The eagles _______ high above the clouds."',
      options: ['soar', 'soaring', 'soared', 'soars'],
      correct: 0,
      exp: 'For plural subject "eagles", the base present tense verb is "soar".'
    },
    {
      subject: 'english',
      diff: 'challenge',
      q: 'Identify the ADVERB in the sentence: "Sara answered the question intelligently."',
      options: ['Sara', 'answered', 'question', 'intelligently'],
      correct: 3,
      exp: '"Intelligently" describes HOW Sara answered (modifying the verb answered).'
    },
    {
      subject: 'math',
      diff: 'easy',
      q: 'What is the place value of the digit 7 in the number 4,782?',
      options: ['7', '70', '700', '7,000'],
      correct: 2,
      exp: '7 is in the Hundreds column, so its place value is 700.'
    },
    {
      subject: 'math',
      diff: 'medium',
      q: 'Solve: 3,420 + 2,680 = ?',
      options: ['5,100', '6,000', '6,100', '5,900'],
      correct: 2,
      exp: '3,420 + 2,680 = 6,100.'
    },
    {
      subject: 'math',
      diff: 'challenge',
      q: 'If a rope is 48 meters long and cut into 6 equal pieces, how long is each piece?',
      options: ['6 meters', '7 meters', '8 meters', '9 meters'],
      correct: 2,
      exp: '48 ÷ 6 = 8 meters.'
    },
    {
      subject: 'science',
      diff: 'easy',
      q: 'Which part of the plant is responsible for absorbing water and minerals from the soil?',
      options: ['Leaf', 'Stem', 'Flower', 'Roots'],
      correct: 3,
      exp: 'Roots anchor the plant and drink water and nutrients from the soil.'
    },
    {
      subject: 'science',
      diff: 'medium',
      q: 'Which of the following is a state of matter with NO fixed shape but a FIXED volume?',
      options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
      correct: 1,
      exp: 'Liquids take the shape of whatever container they are poured into, but keep the same volume.'
    },
    {
      subject: 'science',
      diff: 'challenge',
      q: 'Which planet in our solar system is known as the "Red Planet"?',
      options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
      correct: 1,
      exp: 'Mars has iron-rich rusty soil which gives it a distinct red appearance.'
    },
    {
      subject: 'urdu',
      diff: 'easy',
      q: 'لفظ "کتاب" کی جمع کیا ہے؟',
      options: ['کتابی', 'کتابیں', 'کتابوں', 'مکتب'],
      correct: 1,
      exp: 'کتاب کی جمع "کتابیں" ہے۔'
    },
    {
      subject: 'sindhi',
      diff: 'easy',
      q: 'سنڌي ٻوليءَ ۾ اسم خاص ڪهڙو آهي؟',
      options: ['شهر', 'سنڌو درياءُ', 'وڻ', 'ڇوڪرو'],
      correct: 1,
      exp: '"سنڌو درياءُ" هڪ خاص درياءَ جو نالو آهي.'
    },
    {
      subject: 'computer',
      diff: 'easy',
      q: 'Which computer component is known as the "Brain of the Computer"?',
      options: ['Monitor', 'Keyboard', 'CPU', 'Mouse'],
      correct: 2,
      exp: 'CPU (Central Processing Unit) handles all processing instructions.'
    },
    {
      subject: 'gk',
      diff: 'easy',
      q: 'What is the national flower of Pakistan?',
      options: ['Rose', 'Jasmine (چمبیلی)', 'Sunflower', 'Tulip'],
      correct: 1,
      exp: 'Jasmine (Chambeli) is the official national flower of Pakistan.'
    }
  ];

  // 40-Question Master Quiz Bank
  const MASTER_QUIZ_DB = [
    { q: '1. What is the plural of "Child"?', opt: ['Childs', 'Children', 'Childrens', 'Childes'], ans: 1, sub: 'English' },
    { q: '2. Which sentence uses correct capitalization?', opt: ['ali lives in karachi.', 'Ali lives in Karachi.', 'ali Lives in Karachi.', 'Ali lives in karachi.'], ans: 1, sub: 'English' },
    { q: '3. Find the adjective: "The brave firefighter rescued the kitten."', opt: ['rescued', 'kitten', 'brave', 'firefighter'], ans: 2, sub: 'English' },
    { q: '4. Choose the synonym for "Swift":', opt: ['Slow', 'Fast', 'Heavy', 'Quiet'], ans: 1, sub: 'English' },
    { q: '5. Which word is a preposition?', opt: ['Under', 'Jump', 'Quickly', 'Because'], ans: 0, sub: 'English' },
    { q: '6. What type of sentence is: "Please pass the salt."?', opt: ['Question', 'Exclamation', 'Command/Request', 'Statement'], ans: 2, sub: 'English' },
    { q: '7. Fill in with the correct article: "Sara saw _____ elephant at the zoo."', opt: ['a', 'an', 'the', 'no article'], ans: 1, sub: 'English' },
    { q: '8. Choose the compound word:', opt: ['Sunshine', 'Happily', 'Running', 'Friend'], ans: 0, sub: 'English' },
    { q: '9. Identify the subject in: "The little brown puppy barked loudly."', opt: ['barked loudly', 'puppy', 'The little brown puppy', 'loudly'], ans: 2, sub: 'English' },
    { q: '10. What is the antonym of "Generous"?', opt: ['Kind', 'Selfish', 'Polite', 'Helpful'], ans: 1, sub: 'English' },
    { q: '11. What is 4,000 + 500 + 60 + 2 in standard form?', opt: ['4,562', '45,602', '4,526', '4,056'], ans: 0, sub: 'Math' },
    { q: '12. What is 7,854 rounded to the nearest Hundred?', opt: ['7,800', '7,900', '8,000', '7,850'], ans: 1, sub: 'Math' },
    { q: '13. What is 8 × 9?', opt: ['64', '72', '81', '76'], ans: 1, sub: 'Math' },
    { q: '14. Calculate: 5,000 - 2,450 = ?', opt: ['2,550', '2,650', '3,550', '2,450'], ans: 0, sub: 'Math' },
    { q: '15. Which fraction is equivalent to 1/2?', opt: ['2/4', '1/3', '3/8', '2/6'], ans: 0, sub: 'Math' },
    { q: '16. A square has a side length of 5 cm. What is its perimeter?', opt: ['10 cm', '15 cm', '20 cm', '25 cm'], ans: 2, sub: 'Math' },
    { q: '17. How many minutes are in 2 hours and 15 minutes?', opt: ['120 min', '135 min', '145 min', '150 min'], ans: 1, sub: 'Math' },
    { q: '18. What 3D shape has 6 square faces and 8 vertices?', opt: ['Sphere', 'Cone', 'Cube', 'Cylinder'], ans: 2, sub: 'Math' },
    { q: '19. Divide 63 by 7:', opt: ['8', '9', '7', '6'], ans: 1, sub: 'Math' },
    { q: '20. If 1 book costs Rs. 85, what is the cost of 4 books?', opt: ['Rs. 320', 'Rs. 340', 'Rs. 360', 'Rs. 380'], ans: 1, sub: 'Math' },
    { q: '21. Which gas do green plants absorb from the air during photosynthesis?', opt: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], ans: 1, sub: 'Science' },
    { q: '22. What sense organ helps us balance and hear sound?', opt: ['Nose', 'Tongue', 'Ear', 'Skin'], ans: 2, sub: 'Science' },
    { q: '23. Water turning into ice when cooled is called:', opt: ['Evaporation', 'Freezing', 'Melting', 'Condensation'], ans: 1, sub: 'Science' },
    { q: '24. Animals that eat only plants are known as:', opt: ['Carnivores', 'Herbivores', 'Omnivores', 'Decomposers'], ans: 1, sub: 'Science' },
    { q: '25. Which natural satellite orbits around planet Earth?', opt: ['The Moon', 'The Sun', 'Mars', 'Jupiter'], ans: 0, sub: 'Science' },
    { q: '26. What protects our brain inside the body?', opt: ['Ribcage', 'Skull (Cranium)', 'Spine', 'Shoulder blade'], ans: 1, sub: 'Science' },
    { q: '27. Which material is a good conductor of heat and electricity?', opt: ['Wood', 'Plastic', 'Copper metal', 'Rubber'], ans: 2, sub: 'Science' },
    { q: '28. The layer of air surrounding the Earth is called the:', opt: ['Hydrosphere', 'Atmosphere', 'Biosphere', 'Lithosphere'], ans: 1, sub: 'Science' },
    { q: '29. اردو قواعد میں "علامہ اقبال" کس قسم کا اسم ہے؟', opt: ['اسم نکرہ', 'اسم معرفہ', 'صفت', 'فعل'], ans: 1, sub: 'Urdu' },
    { q: '30. لفظ "صبح" کا متضاد (الٹ) لفظ کیا ہے؟', opt: ['دن', 'شام', 'رات', 'سحر'], ans: 1, sub: 'Urdu' },
    { q: '31. درست جملہ منتخب کریں:', opt: ['بچے اسکول جا رہا ہے۔', 'بچے اسکول جا رہے ہیں۔', 'بچے اسکول جاتی ہے۔', 'بچے اسکول گیا تھا۔'], ans: 1, sub: 'Urdu' },
    { q: '32. "لکھنا، دوڑنا، پڑھنا" کس کی مثالیں ہیں؟', opt: ['اسم', 'فعل', 'حرف', 'صفت'], ans: 1, sub: 'Urdu' },
    { q: '33. سنڌي زبان ۾ "درخت" کي ڇا چئبو آهي؟', opt: ['وڻ', 'پاڻي', 'پکي', 'گل'], ans: 0, sub: 'Sindhi' },
    { q: '34. لفظ "سچ" جو ضد (الٽ) ڪهڙو آهي؟', opt: ['حق', 'ڪوڙ', 'سٺو', 'پيار'], ans: 1, sub: 'Sindhi' },
    { q: '35. "شاهه جو رسالو" ڪنهن جو ڪتاب آهي؟', opt: ['سچل سرمست', 'شاهه عبداللطيف ڀٽائي', 'سامي', 'مرزا قليچ بيگ'], ans: 1, sub: 'Sindhi' },
    { q: '36. لفظ "ڇوڪرو" جي جمع ڇا ٿيندي؟', opt: ['ڇوڪرا', 'ڇوڪريون', 'ٻار', 'شاگرد'], ans: 0, sub: 'Sindhi' },
    { q: '37. Which of these is an INPUT device for a computer?', opt: ['Speaker', 'Printer', 'Mouse', 'Monitor'], ans: 2, sub: 'Computer/GK' },
    { q: '38. What is the largest province of Pakistan by area?', opt: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa'], ans: 2, sub: 'Computer/GK' },
    { q: '39. Shortcut key to copy highlighted text on a keyboard is:', opt: ['Ctrl + V', 'Ctrl + C', 'Ctrl + Z', 'Ctrl + P'], ans: 1, sub: 'Computer/GK' },
    { q: '40. How many continents are there on planet Earth?', opt: ['5', '6', '7', '8'], ans: 2, sub: 'Computer/GK' }
  ];

  // 8 Educational Games Config
  const GAMES_LIST = [
    { id: 'game_math', title: 'Math Challenge', icon: '🧮', desc: 'Speed mental addition, subtraction, and multiplication speed drills!' },
    { id: 'game_word', title: 'Word Builder', icon: '🔤', desc: 'Unscramble mixed-up letters to build essential Grade 3 vocabulary.' },
    { id: 'game_vocab', title: 'Vocabulary Match', icon: '🃏', desc: 'Pair up synonyms, antonyms, and compound words before time runs out.' },
    { id: 'game_pizza', title: 'Fraction Pizza', icon: '🍕', desc: 'Select equal slices to serve delicious fraction orders to hungry customers.' },
    { id: 'game_tables', title: 'Times Table Sprint', icon: '⚡', desc: 'Fast-paced multiplication tables test from 2x up to 10x.' },
    { id: 'game_science', title: 'Science Detective', icon: '🕵️‍♂️', desc: 'Deduce animal habitats, plant parts, and states of matter clues.' },
    { id: 'game_shapes', title: 'Shape Explorer', icon: '📐', desc: 'Count vertices, edges, and faces of 2D and 3D geometric figures.' },
    { id: 'game_reading', title: 'Reading Detective', icon: '🔍', desc: 'Read mystery paragraphs and make smart inferences to solve riddles.' }
  ];

  // Badges Matrix
  const BADGES_CONFIG = [
    { id: 'first_lesson', icon: '🌟', title: 'First Lesson', desc: 'Completed your very first Grade 3 lesson!' },
    { id: 'first_quiz', icon: '🏆', title: 'Quiz Cadet', desc: 'Completed your first assessment quiz.' },
    { id: 'math_explorer', icon: '🔢', title: 'Math Explorer', desc: 'Solved 10+ Mathematics questions.' },
    { id: 'science_star', icon: '🔬', title: 'Science Whiz', desc: 'Explored habitats and states of matter.' },
    { id: 'reading_star', icon: '📖', title: 'Reading Star', desc: 'Read a full story with audio comprehension.' },
    { id: 'vocab_builder', icon: '✍️', title: 'Vocabulary Builder', desc: 'Mastered synonyms and antonyms.' },
    { id: 'story_reader', icon: '🦅', title: 'Story Detective', desc: 'Completed all comprehension quizzes.' },
    { id: 'ten_lessons', icon: '🎯', title: '10 Lessons Done', desc: 'Achieved double-digit lesson milestones.' },
    { id: 'twentyfive_lessons', icon: '🚀', title: '25 Lessons Scholar', desc: 'Grand achievement of 25 lessons.' },
    { id: 'hundred_questions', icon: '💯', title: 'Century Solver', desc: 'Attempted 100 practice & quiz questions.' },
    { id: 'streak_master', icon: '🔥', title: '7-Day Streak', desc: 'Maintained an active 7-day learning routine.' }
  ];

  // Books and Resources
  const BOOKS_DATA = [
    {
      title: 'Oxford Progressive English — Book 3',
      subject: 'English Language',
      publisher: 'Oxford University Press Pakistan (Reference Framework)',
      desc: 'Grade 3 standard reading comprehension, phonics, grammar, and creative writing exercises.',
      link: '#'
    },
    {
      title: 'New Countdown Book 3 (3rd Edition)',
      subject: 'Mathematics',
      publisher: 'Oxford University Press Pakistan (Reference Framework)',
      desc: 'Comprehensive 4-digit numbers, place value grids, fractions, times tables, and geometry basics.',
      link: '#'
    },
    {
      title: 'Amazing Science — Book 3',
      subject: 'Science',
      publisher: 'Oxford Primary Science Series (Reference Framework)',
      desc: 'Exploration of living organisms, plant cycles, states of matter, weather, and the solar system.',
      link: '#'
    },
    {
      title: 'Sindh Textbook Board — Primary Grade 3',
      subject: 'Sindhi & Regional Curriculum',
      publisher: 'Sindh Textbook Board, Jamshoro',
      desc: 'Authentic provincial foundation readers, vocabulary builders, and moral stories.',
      link: '#'
    },
    {
      title: 'Urdu Ka Guldasta — Grade 3 Reader',
      subject: 'Urdu Language',
      publisher: 'National Primary Urdu Curriculum',
      desc: 'Standard Urdu grammar, comprehension passages, poetries, and moral lessons.',
      link: '#'
    },
    {
      title: 'Digital Literacy for Primary Explorers',
      subject: 'Computer Skills',
      publisher: 'EduNexa AI Digital Framework',
      desc: 'Interactive guide to mouse mastery, keyboards, safe surfing, and digital etiquette.',
      link: '#'
    }
  ];

  // 3. UI RENDERING ENGINES
  function initUI() {
    renderSubjectsGrid();
    renderLessons(document.querySelector('.subj-tab.active')?.dataset.subject || 'english');
    renderStoriesGrid();
    renderPracticeQuestion();
    renderGamesGrid();
    renderBadges();
    renderBooksGrid();
    initDailyPlan();
    updateGlobalUI();
    bindEvents();
    checkBadges();
  }

  function updateGlobalUI() {
    const starCount = appState.stars || 0;
    const lessonsCount = (appState.lessonsCompleted || []).length;
    const qSolved = appState.questionsSolved || 0;

    const elNavStar = document.getElementById('navStarCounter');
    if (elNavStar) elNavStar.textContent = starCount;

    const elHeroLiveStars = document.getElementById('heroLiveStars');
    if (elHeroLiveStars) elHeroLiveStars.textContent = `${starCount} Stars ⭐`;

    const elStreakCount = document.getElementById('streakCount');
    if (elStreakCount) elStreakCount.textContent = appState.streak.count;

    const elCounterLessons = document.getElementById('counterLessons');
    if (elCounterLessons) elCounterLessons.textContent = lessonsCount;

    const elCounterQ = document.getElementById('counterQuestions');
    if (elCounterQ) elCounterQ.textContent = qSolved;

    const elProgLessons = document.getElementById('statProgLessons');
    if (elProgLessons) elProgLessons.style.width = Math.min(100, (lessonsCount / 40) * 100) + '%';

    const elProgQ = document.getElementById('statProgQuestions');
    if (elProgQ) elProgQ.style.width = Math.min(100, (qSolved / 50) * 100) + '%';

    let avgQuiz = 0;
    let bestQuiz = 0;
    if (appState.quizHistory && appState.quizHistory.length > 0) {
      const sum = appState.quizHistory.reduce((acc, curr) => acc + curr.percent, 0);
      avgQuiz = Math.round(sum / appState.quizHistory.length);
      bestQuiz = Math.max(...appState.quizHistory.map(q => q.percent));
    }
    const elCounterQuiz = document.getElementById('counterQuizScore');
    if (elCounterQuiz) elCounterQuiz.textContent = avgQuiz;

    const elProgQuiz = document.getElementById('statProgQuiz');
    if (elProgQuiz) elProgQuiz.style.width = avgQuiz + '%';

    const elCounterStars = document.getElementById('counterStars');
    if (elCounterStars) elCounterStars.textContent = starCount;

    const elProgStars = document.getElementById('statProgStars');
    if (elProgStars) elProgStars.style.width = Math.min(100, (starCount / 200) * 100) + '%';

    updateLevelProgress(starCount);
    updateParentDashboard(lessonsCount, qSolved, avgQuiz, bestQuiz);
  }

  function updateLevelProgress(stars) {
    const levels = [
      { name: 'Level 1 — Curious Apprentice', min: 0, max: 20 },
      { name: 'Level 2 — Keen Reader', min: 20, max: 50 },
      { name: 'Level 3 — Math Adventurer', min: 50, max: 90 },
      { name: 'Level 4 — Science Detective', min: 90, max: 140 },
      { name: 'Level 5 — Language Champion', min: 140, max: 200 },
      { name: 'Level 6 — Master Scholar 🏆', min: 200, max: 300 }
    ];

    let currentLvl = levels[0];
    for (let i = 0; i < levels.length; i++) {
      if (stars >= levels[i].min) {
        currentLvl = levels[i];
      }
    }

    const lvlNameEl = document.getElementById('currentLevelName');
    if (lvlNameEl) lvlNameEl.textContent = currentLvl.name;

    const totalStarsEl = document.getElementById('achieveTotalStars');
    if (totalStarsEl) totalStarsEl.textContent = stars;

    const range = currentLvl.max - currentLvl.min;
    const progressInLvl = Math.max(0, Math.min(range, stars - currentLvl.min));
    const percent = Math.min(100, Math.round((progressInLvl / range) * 100));

    const fillEl = document.getElementById('levelProgressFill');
    if (fillEl) fillEl.style.width = `${percent}%`;

    const hintEl = document.getElementById('levelNextHint');
    if (hintEl) {
      const remaining = Math.max(0, currentLvl.max - stars);
      hintEl.textContent = remaining > 0 
        ? `${remaining} more stars to unlock next rank!` 
        : `Maximum scholar rank achieved! Super work! 🎉`;
    }
  }

  function updateParentDashboard(lessonsCount, qSolved, avgQuiz, bestQuiz) {
    const elTotal = document.getElementById('pTotalCompleted');
    if (elTotal) elTotal.textContent = lessonsCount;

    const elQ = document.getElementById('pQuestionsSolved');
    if (elQ) elQ.textContent = qSolved;

    const elAvg = document.getElementById('pAvgQuizScore');
    if (elAvg) elAvg.textContent = `${avgQuiz}%`;

    const elBest = document.getElementById('pBestQuizScore');
    if (elBest) elBest.textContent = `${bestQuiz}%`;

    const elStreak = document.getElementById('pStreakDays');
    if (elStreak) elStreak.textContent = appState.streak.count;

    const elBadges = document.getElementById('pBadgesUnlocked');
    if (elBadges) elBadges.textContent = `${appState.unlockedBadges.length} / ${BADGES_CONFIG.length}`;

    const matrixContainer = document.getElementById('parentSubjectMatrix');
    if (matrixContainer) {
      matrixContainer.innerHTML = '';
      SUBJECTS.forEach(sub => {
        const completedInSub = (appState.lessonsCompleted || []).filter(l => l.startsWith(sub.id)).length;
        const subLessonsTotal = (LESSONS_DB[sub.id] || []).length || 5;
        const percent = Math.min(100, Math.round((completedInSub / subLessonsTotal) * 100));

        const item = document.createElement('div');
        item.className = 'p-matrix-item';
        item.innerHTML = `
          <div class="p-matrix-head">
            <span>${sub.icon} ${sub.name}</span>
            <span><strong>${completedInSub}/${subLessonsTotal}</strong> (${percent}%)</span>
          </div>
          <div class="stat-prog-bar">
            <div class="stat-prog-fill" style="width: ${percent}%; background: var(--primary-blue)"></div>
          </div>
        `;
        matrixContainer.appendChild(item);
      });
    }

    const strengthEl = document.getElementById('pStrengthText');
    const focusEl = document.getElementById('pFocusText');
    if (strengthEl && focusEl) {
      if (lessonsCount > 3 || qSolved > 5) {
        strengthEl.textContent = 'Excellent consistency in engaging with interactive lessons and quick quizzes!';
        focusEl.textContent = 'Continue practicing 4-digit column subtraction and reading longer English comprehension stories.';
      } else {
        strengthEl.textContent = 'Starting strong! Complete a few more lessons to discover personalized strengths.';
        focusEl.textContent = 'Explore English Nouns, Mathematics Place Value, and Living Things in Science.';
      }
    }
  }

  function renderSubjectsGrid() {
    const grid = document.getElementById('subjectsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    SUBJECTS.forEach(sub => {
      const card = document.createElement('div');
      card.className = 'subject-card';
      const completed = (appState.lessonsCompleted || []).filter(l => l.startsWith(sub.id)).length;
      const percent = Math.min(100, Math.round((completed / sub.lessonsCount) * 100));

      card.innerHTML = `
        <div class="subject-card-banner ${sub.bannerClass}">
          <span class="subject-badge-count">${sub.lessonsCount} Lessons</span>
          <div class="subject-card-icon">${sub.icon}</div>
        </div>
        <div class="subject-card-body">
          <h3 class="subject-card-title">${sub.name}</h3>
          <p class="subject-card-desc">${sub.desc}</p>
          <div class="subject-card-progress">
            <div class="subj-prog-labels">
              <span>Progress</span>
              <span>${percent}%</span>
            </div>
            <div class="stat-prog-bar">
              <div class="stat-prog-fill" style="width: ${percent}%; background: var(--primary-blue)"></div>
            </div>
          </div>
          <div class="subject-card-actions">
            <button class="btn btn-primary btn-sm open-subj-btn" data-subject="${sub.id}">Open Lessons</button>
            <button class="btn btn-secondary btn-sm practice-subj-btn" data-subject="${sub.id}">Practice</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderLessons(subjectId) {
    const container = document.getElementById('modulesContainer');
    const titleEl = document.getElementById('currentSubjectTitle');
    const subtitleEl = document.getElementById('currentSubjectSubtitle');
    if (!container) return;

    const subObj = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];
    if (titleEl) titleEl.textContent = `${subObj.icon} ${subObj.name} Lessons`;
    if (subtitleEl) subtitleEl.textContent = subObj.desc;

    const lessonsList = LESSONS_DB[subjectId] || [];

    const modulesMap = {};
    lessonsList.forEach(l => {
      const mod = l.module || 'Core Curriculum';
      if (!modulesMap[mod]) modulesMap[mod] = [];
      modulesMap[mod].push(l);
    });

    container.innerHTML = '';

    if (lessonsList.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px; color:#64748b;">
          <p style="font-size:1.2rem;">🌟 Additional interactive modules loading for ${subObj.name}!</p>
        </div>
      `;
      return;
    }

    Object.keys(modulesMap).forEach(modName => {
      const modCard = document.createElement('div');
      modCard.className = 'module-card';

      const modHeader = document.createElement('div');
      modHeader.className = 'module-header';
      modHeader.innerHTML = `
        <span class="module-title">${modName}</span>
        <span class="module-badge">${modulesMap[modName].length} Lessons</span>
      `;
      modCard.appendChild(modHeader);

      const grid = document.createElement('div');
      grid.className = 'lessons-grid';

      modulesMap[modName].forEach(lesson => {
        const isDone = (appState.lessonsCompleted || []).includes(lesson.id);
        const lCard = document.createElement('div');
        lCard.className = `lesson-card ${isDone ? 'completed' : ''}`;
        lCard.innerHTML = `
          <div>
            <span class="lesson-num-tag">${lesson.num}</span>
            <h4 class="lesson-title">${lesson.title}</h4>
            <p class="lesson-desc">${lesson.desc}</p>
          </div>
          <button class="lesson-open-btn view-lesson-trigger" data-id="${lesson.id}" data-subject="${subjectId}">
            ${isDone ? 'Review Lesson' : 'Start Lesson 🚀'}
          </button>
        `;
        grid.appendChild(lCard);
      });

      modCard.appendChild(grid);
      container.appendChild(modCard);
    });
  }

  function renderStoriesGrid() {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    STORIES_DB.forEach(story => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        <div class="story-banner">${story.icon}</div>
        <div class="story-body">
          <h3 class="story-title">${story.title}</h3>
          <p class="story-snippet">${story.snippet}</p>
          <div class="story-meta-tags">
            <span class="story-tag-pill">📖 Comprehension</span>
            <span class="story-tag-pill">🔊 Audio Support</span>
          </div>
          <button class="btn btn-primary open-story-btn" data-story-id="${story.id}">
            Read Story &amp; Quiz 🦅
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderGamesGrid() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    GAMES_LIST.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <div class="game-card-icon">${game.icon}</div>
        <h4 class="game-card-title">${game.title}</h4>
        <p class="game-card-desc">${game.desc}</p>
        <button class="btn btn-accent btn-sm launch-game-btn" data-game-id="${game.id}">
          Play Game 🎮
        </button>
      `;
      grid.appendChild(card);
    });
  }

  function renderBooksGrid() {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;
    grid.innerHTML = '';

    BOOKS_DATA.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-card-top">📚</div>
        <div class="book-card-body">
          <span class="book-publisher-tag">${book.publisher}</span>
          <h4 class="book-title">${book.title}</h4>
          <p class="book-desc">${book.desc}</p>
          <button class="btn btn-secondary btn-sm" onclick="alert('Viewing syllabus guide for: ${book.title}')">
            Curriculum Reference Guide 📘
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderBadges() {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    BADGES_CONFIG.forEach(badge => {
      const isUnlocked = (appState.unlockedBadges || []).includes(badge.id);
      const card = document.createElement('div');
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <h4 class="badge-title">${badge.title}</h4>
        <p class="badge-desc">${badge.desc}</p>
        <span class="badge-status-tag">${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}</span>
      `;
      grid.appendChild(card);
    });
  }

  // 4. PRACTICE CENTER LOGIC
  function renderPracticeQuestion() {
    const arena = document.getElementById('practiceQuestionBox');
    if (!arena) return;

    const subjSelect = document.getElementById('practiceSubjectSelect');
    const selectedSubj = subjSelect ? subjSelect.value : 'all';

    const diffActive = document.querySelector('#difficultySelector .diff-btn.active');
    const selectedDiff = diffActive ? diffActive.dataset.diff : 'all';

    let filtered = PRACTICE_QUESTIONS.filter(q => {
      const matchSubj = selectedSubj === 'all' || q.subject === selectedSubj;
      const matchDiff = selectedDiff === 'all' || q.diff === selectedDiff;
      return matchSubj && matchDiff;
    });

    if (filtered.length === 0) filtered = PRACTICE_QUESTIONS;

    const q = filtered[Math.floor(Math.random() * filtered.length)];

    arena.innerHTML = `
      <div class="practice-q-meta">
        <span class="practice-q-subject">${q.subject.toUpperCase()}</span>
        <span class="practice-q-diff">${q.diff.toUpperCase()} LEVEL</span>
      </div>
      <h3 class="practice-q-text">${q.q}</h3>
      <div class="practice-options-grid">
        ${q.options.map((opt, idx) => `
          <button class="practice-opt-btn" data-opt-idx="${idx}">
            ${String.fromCharCode(65 + idx)}) ${opt}
          </button>
        `).join('')}
      </div>
      <div class="practice-explanation-box hidden" id="practiceExplanation">
        <span style="font-size:1.5rem;">💡</span>
        <div>
          <strong>Explanation:</strong>
          <p id="practiceExpText">${q.exp}</p>
        </div>
      </div>
      <div class="practice-footer-actions">
        <button class="btn btn-secondary btn-sm" id="nextPracticeBtn">Next Question →</button>
      </div>
    `;

    arena.querySelectorAll('.practice-opt-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const selectedIdx = parseInt(this.dataset.optIdx, 10);
        const expBox = document.getElementById('practiceExplanation');
        if (expBox) expBox.classList.remove('hidden');

        arena.querySelectorAll('.practice-opt-btn').forEach((b, i) => {
          b.disabled = true;
          if (i === q.correct) b.classList.add('correct');
        });

        if (selectedIdx === q.correct) {
          this.classList.add('correct');
          addStars(5, 'Correct Practice Answer! +5 ⭐');
          appState.questionsSolved = (appState.questionsSolved || 0) + 1;
          saveState();
          triggerConfetti();
        } else {
          this.classList.add('incorrect');
          showToast('Keep trying! Review the explanation.');
        }
      });
    });

    document.getElementById('nextPracticeBtn')?.addEventListener('click', renderPracticeQuestion);
  }

  // 5. 8 INTERACTIVE LEARNING GAMES ENGINE
  let activeGameId = null;
  let gameScore = 0;

  function launchGame(gameId) {
    activeGameId = gameId;
    gameScore = 0;
    const modal = document.getElementById('gameModal');
    const titleEl = document.getElementById('modalGameTitle');
    const descEl = document.getElementById('modalGameDesc');
    const iconEl = document.getElementById('modalGameIcon');
    const scoreEl = document.getElementById('modalGameScore');
    const stage = document.getElementById('gameStage');

    if (!modal || !stage) return;

    const game = GAMES_LIST.find(g => g.id === gameId);
    if (game) {
      if (titleEl) titleEl.textContent = game.title;
      if (descEl) descEl.textContent = game.desc;
      if (iconEl) iconEl.textContent = game.icon;
    }
    if (scoreEl) scoreEl.textContent = '0';

    modal.classList.add('active');

    switch (gameId) {
      case 'game_math': initMathGame(stage); break;
      case 'game_pizza': initPizzaGame(stage); break;
      case 'game_word': initWordGame(stage); break;
      case 'game_tables': initTablesGame(stage); break;
      case 'game_science': initScienceGame(stage); break;
      case 'game_shapes': initShapesGame(stage); break;
      case 'game_vocab': initVocabGame(stage); break;
      case 'game_reading': initReadingGame(stage); break;
      default: initMathGame(stage);
    }
  }

  function updateGameScore(pts) {
    gameScore += pts;
    const scoreEl = document.getElementById('modalGameScore');
    if (scoreEl) scoreEl.textContent = gameScore;
    addStars(pts, `Game Score +${pts} ⭐`);
  }

  function initMathGame(stage) {
    function nextRound() {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 40) + 10;
      const isAdd = Math.random() > 0.4;
      const correctAns = isAdd ? a + b : a + b - a;
      const questionStr = isAdd ? `${a} + ${b}` : `${a + b} - ${a}`;

      const options = [correctAns, correctAns + 2, Math.max(1, correctAns - 3), correctAns + 5].sort(() => Math.random() - 0.5);

      stage.innerHTML = `
        <div style="text-align:center; max-width:400px; width:100%;">
          <div style="font-size:1.1rem; color:#64748b; margin-bottom:8px;">Fast Arithmetic Drill</div>
          <h2 style="font-size:3rem; margin-bottom:20px; font-family:var(--font-display);">${questionStr} = ?</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            ${options.map(opt => `
              <button class="btn btn-secondary math-game-opt" style="font-size:1.4rem; padding:16px;" data-val="${opt}">${opt}</button>
            `).join('')}
          </div>
        </div>
      `;

      stage.querySelectorAll('.math-game-opt').forEach(btn => {
        btn.addEventListener('click', function () {
          const val = parseInt(this.dataset.val, 10);
          if (val === correctAns) {
            this.style.background = '#86efac';
            updateGameScore(2);
            triggerConfetti();
            setTimeout(nextRound, 600);
          } else {
            this.style.background = '#fca5a5';
            showToast('Try again!');
          }
        });
      });
    }
    nextRound();
  }

  function initPizzaGame(stage) {
    const targets = [
      { name: '1/2 (Half)', slices: 2, targetCount: 1 },
      { name: '3/4 (Three Quarters)', slices: 4, targetCount: 3 },
      { name: '2/4 (Two Quarters)', slices: 4, targetCount: 2 },
      { name: '1/4 (One Quarter)', slices: 4, targetCount: 1 }
    ];

    function nextRound() {
      const item = targets[Math.floor(Math.random() * targets.length)];

      stage.innerHTML = `
        <div style="text-align:center; max-width:440px;">
          <h3 style="font-size:1.4rem; margin-bottom:8px;">Customer Order: Slice <strong>${item.name}</strong> of Pizza!</h3>
          <p style="color:#64748b; margin-bottom:16px;">Click the slices to highlight ${item.targetCount} out of ${item.slices} slices.</p>
          <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px;">
            ${Array.from({ length: item.slices }).map((_, idx) => `
              <button class="pizza-slice-btn" data-idx="${idx}" style="font-size:2.5rem; background:#fffbeb; border:3px dashed #f59e0b; border-radius:12px; padding:16px; cursor:pointer;">🍕</button>
            `).join('')}
          </div>
          <button class="btn btn-primary" id="checkPizzaBtn">Serve Pizza 🍽️</button>
        </div>
      `;

      const sliceBtns = stage.querySelectorAll('.pizza-slice-btn');
      sliceBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          this.classList.toggle('selected');
          if (this.classList.contains('selected')) {
            this.style.background = '#fde68a';
            this.style.transform = 'scale(1.1)';
          } else {
            this.style.background = '#fffbeb';
            this.style.transform = 'scale(1)';
          }
        });
      });

      document.getElementById('checkPizzaBtn')?.addEventListener('click', function () {
        const count = stage.querySelectorAll('.pizza-slice-btn.selected').length;
        if (count === item.targetCount) {
          showToast('Delicious! Order fulfilled! 🍕');
          updateGameScore(3);
          triggerConfetti();
          setTimeout(nextRound, 800);
        } else {
          showToast(`Oops! You selected ${count} slices, but the customer asked for ${item.targetCount}.`);
        }
      });
    }
    nextRound();
  }

  function initWordGame(stage) {
    const words = [
      { scrambled: 'LANTEP', word: 'PLANET', hint: 'Orbiting celestial body in space' },
      { scrambled: 'GARDNE', word: 'GARDEN', hint: 'Place where flowers and plants grow' },
      { scrambled: 'PAPRSO', word: 'SPARROW', hint: 'A cheerful small brown bird' },
      { scrambled: 'SHCOLO', word: 'SCHOOL', hint: 'Where students learn and discover' }
    ];

    function nextRound() {
      const w = words[Math.floor(Math.random() * words.length)];
      stage.innerHTML = `
        <div style="text-align:center; max-width:400px;">
          <h3 style="font-size:1.5rem; margin-bottom:6px;">Unscramble the Word:</h3>
          <p style="color:#64748b; margin-bottom:16px;">Hint: <em>"${w.hint}"</em></p>
          <div style="font-size:2.8rem; font-weight:900; letter-spacing:0.2em; color:var(--primary-blue); margin-bottom:20px; font-family:var(--font-display);">${w.scrambled}</div>
          <input type="text" id="wordGuessInput" placeholder="Type answer..." style="width:100%; font-size:1.3rem; padding:12px; border:2px solid #cbd5e1; border-radius:8px; text-transform:uppercase; text-align:center; margin-bottom:16px;">
          <button class="btn btn-primary" id="submitWordBtn" style="width:100%;">Check Word 🔤</button>
        </div>
      `;

      document.getElementById('submitWordBtn')?.addEventListener('click', function () {
        const input = document.getElementById('wordGuessInput');
        if (input && input.value.trim().toUpperCase() === w.word) {
          showToast('Brilliant Spelling! 🎉');
          updateGameScore(3);
          triggerConfetti();
          setTimeout(nextRound, 700);
        } else {
          showToast('Not quite, try again!');
        }
      });
    }
    nextRound();
  }

  function initTablesGame(stage) {
    stage.innerHTML = `
      <div style="text-align:center;">
        <h3>⚡ Times Table Sprint</h3>
        <p style="margin: 16px 0;">What is 7 × 8?</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-secondary" onclick="alert('54 is incorrect!')">54</button>
          <button class="btn btn-secondary" id="correctTableBtn">56</button>
          <button class="btn btn-secondary" onclick="alert('64 is incorrect!')">64</button>
        </div>
      </div>
    `;
    document.getElementById('correctTableBtn')?.addEventListener('click', () => {
      updateGameScore(2);
      showToast('Correct! 7 × 8 = 56');
      triggerConfetti();
    });
  }

  function initScienceGame(stage) {
    stage.innerHTML = `
      <div style="text-align:center;">
        <h3>🕵️‍♂️ Science Detective</h3>
        <p style="margin: 16px 0;">I have gills, fins, and breathe underwater. What am I?</p>
        <button class="btn btn-secondary" onclick="alert('Try again!')">Eagle</button>
        <button class="btn btn-primary" id="fishBtn">Fish 🐟</button>
      </div>
    `;
    document.getElementById('fishBtn')?.addEventListener('click', () => {
      updateGameScore(2);
      showToast('Correct! Fish breathe through gills.');
      triggerConfetti();
    });
  }

  function initShapesGame(stage) {
    stage.innerHTML = `
      <div style="text-align:center;">
        <h3>📐 Shape Explorer</h3>
        <p style="margin: 16px 0;">How many flat faces does a Cube have?</p>
        <button class="btn btn-secondary" onclick="alert('Not 4')">4</button>
        <button class="btn btn-primary" id="cubeFacesBtn">6 Faces</button>
        <button class="btn btn-secondary" onclick="alert('Not 8')">8</button>
      </div>
    `;
    document.getElementById('cubeFacesBtn')?.addEventListener('click', () => {
      updateGameScore(2);
      showToast('Correct! A cube has 6 flat square faces.');
      triggerConfetti();
    });
  }

  function initVocabGame(stage) {
    stage.innerHTML = `
      <div style="text-align:center;">
        <h3>🃏 Vocabulary Match</h3>
        <p style="margin: 16px 0;">Find the SYNONYM for: <strong>Enormous</strong></p>
        <button class="btn btn-secondary" onclick="alert('Incorrect')">Tiny</button>
        <button class="btn btn-primary" id="giganticBtn">Gigantic</button>
      </div>
    `;
    document.getElementById('giganticBtn')?.addEventListener('click', () => {
      updateGameScore(2);
      showToast('Correct! Enormous = Gigantic');
      triggerConfetti();
    });
  }

  function initReadingGame(stage) {
    stage.innerHTML = `
      <div style="text-align:center;">
        <h3>🔍 Reading Detective</h3>
        <p style="margin: 16px 0;"><em>"Dark clouds gathered, thunder roared, and drops began to fall."</em><br>What weather is happening?</p>
        <button class="btn btn-primary" id="rainBtn">Rainy Storm ⛈️</button>
        <button class="btn btn-secondary" onclick="alert('Incorrect')">Sunny Day ☀️</button>
      </div>
    `;
    document.getElementById('rainBtn')?.addEventListener('click', () => {
      updateGameScore(2);
      showToast('Correct Deduction!');
      triggerConfetti();
    });
  }

  // 6. 40-QUESTION MASTER QUIZ ENGINE
  let activeQuizQuestions = [];
  let currentQuizIndex = 0;
  let userAnswers = {};
  let quizTimerInterval = null;
  let quizSecondsLeft = 25 * 60;

  function startQuiz(mode) {
    if (mode === 'sprint') {
      activeQuizQuestions = [...MASTER_QUIZ_DB].sort(() => Math.random() - 0.5).slice(0, 10);
      quizSecondsLeft = 8 * 60;
    } else {
      activeQuizQuestions = [...MASTER_QUIZ_DB];
      quizSecondsLeft = 25 * 60;
    }

    currentQuizIndex = 0;
    userAnswers = {};

    document.getElementById('quizIntro')?.classList.add('hidden');
    document.getElementById('quizResultView')?.classList.add('hidden');
    document.getElementById('quizEngine')?.classList.remove('hidden');

    const totalEl = document.getElementById('quizTotalQNum');
    if (totalEl) totalEl.textContent = activeQuizQuestions.length;

    renderQuizPills();
    renderCurrentQuizQuestion();
    startQuizTimer();
  }

  function startQuizTimer() {
    clearInterval(quizTimerInterval);
    const display = document.getElementById('quizTimerDisplay');

    quizTimerInterval = setInterval(() => {
      if (quizSecondsLeft <= 0) {
        clearInterval(quizTimerInterval);
        submitQuiz();
        return;
      }
      quizSecondsLeft--;
      const m = Math.floor(quizSecondsLeft / 60).toString().padStart(2, '0');
      const s = (quizSecondsLeft % 60).toString().padStart(2, '0');
      if (display) display.textContent = `${m}:${s}`;
    }, 1000);
  }

  function renderQuizPills() {
    const container = document.getElementById('quizPillsContainer');
    if (!container) return;
    container.innerHTML = '';

    activeQuizQuestions.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `quiz-pill-dot ${idx === currentQuizIndex ? 'current' : ''} ${userAnswers[idx] !== undefined ? 'answered' : ''}`;
      dot.addEventListener('click', () => {
        currentQuizIndex = idx;
        renderCurrentQuizQuestion();
      });
      container.appendChild(dot);
    });
  }

  function renderCurrentQuizQuestion() {
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;

    const qNumEl = document.getElementById('quizCurrentQNum');
    if (qNumEl) qNumEl.textContent = currentQuizIndex + 1;

    const subTagEl = document.getElementById('quizSubjectTag');
    if (subTagEl) subTagEl.textContent = q.sub;

    const qTextEl = document.getElementById('quizQuestionText');
    if (qTextEl) qTextEl.textContent = q.q;

    const progressFill = document.getElementById('quizProgressFill');
    if (progressFill) {
      progressFill.style.width = `${((currentQuizIndex + 1) / activeQuizQuestions.length) * 100}%`;
    }

    const optionsList = document.getElementById('quizOptionsList');
    if (optionsList) {
      optionsList.innerHTML = q.opt.map((opt, i) => `
        <button class="quiz-option-btn ${userAnswers[currentQuizIndex] === i ? 'selected' : ''}" data-idx="${i}">
          ${String.fromCharCode(65 + i)}) ${opt}
        </button>
      `).join('');

      optionsList.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const selected = parseInt(this.dataset.idx, 10);
          userAnswers[currentQuizIndex] = selected;
          renderQuizPills();
          renderCurrentQuizQuestion();
        });
      });
    }

    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    const submitBtn = document.getElementById('quizSubmitBtn');

    if (prevBtn) prevBtn.disabled = currentQuizIndex === 0;
    if (currentQuizIndex === activeQuizQuestions.length - 1) {
      if (nextBtn) nextBtn.classList.add('hidden');
      if (submitBtn) submitBtn.classList.remove('hidden');
    } else {
      if (nextBtn) nextBtn.classList.remove('hidden');
      if (submitBtn) submitBtn.classList.add('hidden');
    }
  }

  function submitQuiz() {
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    const subjectScores = {};

    activeQuizQuestions.forEach((q, i) => {
      if (!subjectScores[q.sub]) subjectScores[q.sub] = { correct: 0, total: 0 };
      subjectScores[q.sub].total++;

      if (userAnswers[i] === q.ans) {
        correctCount++;
        subjectScores[q.sub].correct++;
      }
    });

    const percent = Math.round((correctCount / activeQuizQuestions.length) * 100);
    const starsEarned = Math.round(correctCount * 1.5);

    appState.quizHistory.push({
      date: new Date().toLocaleDateString(),
      score: correctCount,
      total: activeQuizQuestions.length,
      percent: percent
    });
    addStars(starsEarned, `Quiz Completed: ${percent}% (+${starsEarned} ⭐)`);
    saveState();

    document.getElementById('quizEngine')?.classList.add('hidden');
    const resView = document.getElementById('quizResultView');
    if (resView) resView.classList.remove('hidden');

    document.getElementById('resScore').textContent = `${correctCount}/${activeQuizQuestions.length}`;
    document.getElementById('resPercent').textContent = `${percent}%`;
    document.getElementById('resStars').textContent = `+${starsEarned} ⭐`;

    const breakdownEl = document.getElementById('resultSubjectsBreakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = Object.keys(subjectScores).map(sub => {
        const item = subjectScores[sub];
        const subPct = Math.round((item.correct / item.total) * 100);
        return `
          <div class="res-subj-bar">
            <div class="res-subj-info">
              <span>${sub}</span>
              <span>${item.correct}/${item.total} (${subPct}%)</span>
            </div>
            <div class="stat-prog-bar">
              <div class="stat-prog-fill" style="width: ${subPct}%; background: var(--primary-blue)"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    triggerConfetti();
  }

  // 7. LESSON VIEWER & AUDIO READ ALOUD
  let activeLesson = null;

  function openLessonModal(lessonId, subjectId) {
    const lessonsList = LESSONS_DB[subjectId] || [];
    const lesson = lessonsList.find(l => l.id === lessonId);
    if (!lesson) return;

    activeLesson = { ...lesson, subjectId };
    const modal = document.getElementById('lessonModal');
    const subjTag = document.getElementById('modalLessonSubject');
    const titleEl = document.getElementById('modalLessonTitle');
    const bodyEl = document.getElementById('lessonModalBody');

    if (!modal || !bodyEl) return;

    if (subjTag) subjTag.textContent = subjectId.toUpperCase();
    if (titleEl) titleEl.textContent = `${lesson.num}: ${lesson.title}`;

    bodyEl.innerHTML = `
      ${lesson.content}
      <div class="lesson-activity-box">
        <h4 style="color:#15803d; margin-bottom:8px;">🎯 Interactive Mini-Activity:</h4>
        <p>${lesson.activity}</p>
      </div>
    `;

    modal.classList.add('active');
  }

  function openStoryModal(storyId) {
    const story = STORIES_DB.find(s => s.id === storyId);
    if (!story) return;

    const modal = document.getElementById('storyModal');
    const titleEl = document.getElementById('modalStoryTitle');
    const bodyEl = document.getElementById('storyModalBody');

    if (!modal || !bodyEl) return;
    if (titleEl) titleEl.textContent = story.title;

    bodyEl.innerHTML = `
      <div style="font-size:4rem; text-align:center; margin-bottom:16px;">${story.icon}</div>
      <div style="font-size:1.1rem; line-height:1.8; color:var(--text-main); margin-bottom:24px; white-space:pre-line;">
        ${story.storyText}
      </div>
      <div style="background:#fef3c7; border:1px solid #fde68a; border-radius:12px; padding:16px; margin-bottom:24px;">
        <h4 style="color:#b45309; margin-bottom:8px;">📚 Key Vocabulary Words:</h4>
        <ul>
          ${story.vocab.map(v => `<li>${v}</li>`).join('')}
        </ul>
      </div>
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:16px; margin-bottom:24px;">
        <h4 style="color:#15803d; margin-bottom:6px;">🌟 Moral Lesson:</h4>
        <p>${story.moral}</p>
      </div>
      <div style="border-top:1px solid #e2e8f0; padding-top:20px;">
        <h4 style="margin-bottom:12px;">Comprehension Check:</h4>
        ${story.comprehension.map((c, i) => `
          <p><strong>Q${i+1}: ${c.q}</strong><br><span style="color:#0369a1;">Answer: ${c.a}</span></p>
        `).join('<br>')}
      </div>
    `;

    modal.classList.add('active');
  }

  function readAloudText(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Audio is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    showToast('🔊 Reading Aloud...');
  }

  // 8. DAILY PLAN & STREAK
  function initDailyPlan() {
    const container = document.getElementById('dailyPlanContainer');
    if (!container) return;

    const checkboxes = container.querySelectorAll('.plan-checkbox');
    checkboxes.forEach(cb => {
      const planItem = cb.closest('.plan-item');
      const planKey = planItem?.dataset.planId;
      if (planKey && appState.dailyPlan[planKey]) {
        cb.checked = true;
        planItem.classList.add('completed');
      }

      cb.addEventListener('change', function () {
        if (planKey) {
          appState.dailyPlan[planKey] = this.checked;
          if (this.checked) {
            planItem.classList.add('completed');
            addStars(10, 'Daily Goal Item Completed! +10 ⭐');
          } else {
            planItem.classList.remove('completed');
          }
          saveState();
          updateDailyPlanPercent();
        }
      });
    });

    updateDailyPlanPercent();
  }

  function updateDailyPlanPercent() {
    const keys = ['english', 'math', 'science', 'language', 'game_quiz'];
    const done = keys.filter(k => appState.dailyPlan[k]).length;
    const pct = Math.round((done / keys.length) * 100);
    const el = document.getElementById('dailyPlanPercent');
    if (el) el.textContent = `${pct}%`;
  }

  // 9. REWARDS & CONFETTI
  function addStars(amount, toastMsg) {
    appState.stars = (appState.stars || 0) + amount;
    saveState();
    if (toastMsg) showToast(toastMsg);
    checkBadges();
  }

  function checkBadges() {
    let newlyUnlocked = false;

    function unlock(badgeId) {
      if (!appState.unlockedBadges.includes(badgeId)) {
        appState.unlockedBadges.push(badgeId);
        newlyUnlocked = true;
        showToast(`🏆 Badge Unlocked: ${BADGES_CONFIG.find(b => b.id === badgeId)?.title || ''}!`);
      }
    }

    if (appState.lessonsCompleted.length >= 1) unlock('first_lesson');
    if (appState.lessonsCompleted.length >= 10) unlock('ten_lessons');
    if (appState.lessonsCompleted.length >= 25) unlock('twentyfive_lessons');
    if (appState.quizHistory.length >= 1) unlock('first_quiz');
    if (appState.questionsSolved >= 100) unlock('hundred_questions');
    if (appState.stars >= 50) unlock('math_explorer');

    if (newlyUnlocked) {
      saveState();
      renderBadges();
    }
  }

  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>✨</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 5 + 3,
      color: ['#0284c7', '#38bdf8', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981'][Math.floor(Math.random() * 6)]
    }));

    let frames = 0;
    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      frames++;
      if (frames < 90) requestAnimationFrame(anim);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    anim();
  }

  // 10. GLOBAL SEARCH & EVENT BINDINGS
  function bindEvents() {
    document.querySelectorAll('.subj-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.subj-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        renderLessons(this.dataset.subject);
      });
    });

    document.addEventListener('click', e => {
      if (e.target.matches('.open-subj-btn')) {
        const sub = e.target.dataset.subject;
        const tab = document.querySelector(`.subj-tab[data-subject="${sub}"]`);
        if (tab) {
          tab.click();
          document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (e.target.matches('.practice-subj-btn')) {
        const sub = e.target.dataset.subject;
        const sel = document.getElementById('practiceSubjectSelect');
        if (sel) sel.value = sub;
        renderPracticeQuestion();
        document.getElementById('practice')?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.target.matches('.view-lesson-trigger')) {
        openLessonModal(e.target.dataset.id, e.target.dataset.subject);
      }
      if (e.target.matches('.open-story-btn')) {
        openStoryModal(e.target.dataset.storyId);
      }
      if (e.target.matches('.launch-game-btn')) {
        launchGame(e.target.dataset.gameId);
      }
      if (e.target.matches('.plan-go-btn')) {
        const target = e.target.dataset.target;
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.getElementById('closeLessonModalBtn')?.addEventListener('click', () => {
      document.getElementById('lessonModal')?.classList.remove('active');
    });
    document.getElementById('closeStoryModalBtn')?.addEventListener('click', () => {
      document.getElementById('storyModal')?.classList.remove('active');
    });
    document.getElementById('closeGameModalBtn')?.addEventListener('click', () => {
      document.getElementById('gameModal')?.classList.remove('active');
    });

    document.getElementById('modalCompleteLessonBtn')?.addEventListener('click', () => {
      if (activeLesson) {
        if (!appState.lessonsCompleted.includes(activeLesson.id)) {
          appState.lessonsCompleted.push(activeLesson.id);
          addStars(10, `Lesson Completed! +10 ⭐`);
          saveState();
          triggerConfetti();
        } else {
          showToast('Lesson already completed previously!');
        }
        document.getElementById('lessonModal')?.classList.remove('active');
        renderLessons(activeLesson.subjectId);
      }
    });

    document.getElementById('modalReadAloudBtn')?.addEventListener('click', () => {
      const text = document.getElementById('lessonModalBody')?.innerText || '';
      readAloudText(text);
    });
    document.getElementById('modalStoryReadAloudBtn')?.addEventListener('click', () => {
      const text = document.getElementById('storyModalBody')?.innerText || '';
      readAloudText(text);
    });

    document.getElementById('heroQuizBtn')?.addEventListener('click', () => {
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('startMasterQuizBtn')?.addEventListener('click', () => startQuiz('full'));
    document.getElementById('startQuickQuizBtn')?.addEventListener('click', () => startQuiz('sprint'));
    document.getElementById('quizNextBtn')?.addEventListener('click', () => {
      if (currentQuizIndex < activeQuizQuestions.length - 1) {
        currentQuizIndex++;
        renderCurrentQuizQuestion();
        renderQuizPills();
      }
    });
    document.getElementById('quizPrevBtn')?.addEventListener('click', () => {
      if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderCurrentQuizQuestion();
        renderQuizPills();
      }
    });
    document.getElementById('quizSubmitBtn')?.addEventListener('click', submitQuiz);
    document.getElementById('retakeQuizBtn')?.addEventListener('click', () => startQuiz('full'));

    document.querySelectorAll('#difficultySelector .diff-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#difficultySelector .diff-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderPracticeQuestion();
      });
    });
    document.getElementById('practiceSubjectSelect')?.addEventListener('change', renderPracticeQuestion);

    const hamburger = document.getElementById('hamburgerBtn');
    const drawer = document.getElementById('mobileDrawer');
    const closeDrawer = document.getElementById('closeDrawerBtn');

    hamburger?.addEventListener('click', () => drawer?.classList.add('open'));
    closeDrawer?.addEventListener('click', () => drawer?.classList.remove('open'));
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => drawer?.classList.remove('open'));
    });

    const searchModal = document.getElementById('searchModal');
    const searchTrigger = document.getElementById('searchTriggerBtn');
    const closeSearch = document.getElementById('closeSearchModalBtn');
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('searchResultsContainer');

    searchTrigger?.addEventListener('click', () => {
      searchModal?.classList.add('active');
      searchInput?.focus();
    });
    closeSearch?.addEventListener('click', () => searchModal?.classList.remove('active'));

    searchInput?.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      if (!q) {
        searchResults.innerHTML = `<div class="search-empty-state">Type keywords like "Fractions", "Nouns", "Plants", or "Games"...</div>`;
        return;
      }
      const results = [];
      Object.keys(LESSONS_DB).forEach(sub => {
        LESSONS_DB[sub].forEach(l => {
          if (l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)) {
            results.push({ type: 'Lesson', title: l.title, sub, id: l.id });
          }
        });
      });
      STORIES_DB.forEach(s => {
        if (s.title.toLowerCase().includes(q) || s.snippet.toLowerCase().includes(q)) {
          results.push({ type: 'Story', title: s.title, id: s.id });
        }
      });
      GAMES_LIST.forEach(g => {
        if (g.title.toLowerCase().includes(q)) {
          results.push({ type: 'Game', title: g.title, id: g.id });
        }
      });

      if (results.length === 0) {
        searchResults.innerHTML = `<div class="search-empty-state">No matching learning content found for "${q}".</div>`;
      } else {
        searchResults.innerHTML = results.map(r => `
          <div class="search-result-item" data-type="${r.type}" data-id="${r.id}" data-sub="${r.sub || ''}">
            <span>${r.type === 'Lesson' ? '📖' : r.type === 'Story' ? '🦅' : '🎮'}</span>
            <div>
              <strong>${r.title}</strong>
              <div style="font-size:0.75rem; color:#64748b;">${r.type}</div>
            </div>
          </div>
        `).join('');

        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', function () {
            searchModal.classList.remove('active');
            const type = this.dataset.type;
            const id = this.dataset.id;
            const sub = this.dataset.sub;
            if (type === 'Lesson') openLessonModal(id, sub);
            if (type === 'Story') openStoryModal(id);
            if (type === 'Game') launchGame(id);
          });
        });
      }
    });

    document.getElementById('resetProgressBtn')?.addEventListener('click', () => {
      if (confirm('Reset your Grade 3 learning progress and stars?')) {
        localStorage.removeItem(STORAGE_KEY);
        appState = { ...defaultState };
        updateGlobalUI();
        location.reload();
      }
    });

    document.getElementById('printReportBtn')?.addEventListener('click', () => {
      window.print();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
  } else {
    initUI();
  }

})();
