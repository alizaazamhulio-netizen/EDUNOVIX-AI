/**
 * EduNexa AI — GRADE 6 DIGITAL LEARNING PLATFORM
 * File: grade6.js
 * Complete interactive logic, curriculums, labs, games, quiz, revision & state.
 */

// Global State Management with LocalStorage
const STORAGE_KEY = 'studymate_grade6_data_v1';

const defaultState = {
  xp: 120,
  level: 1,
  streak: 3,
  lastActive: new Date().toISOString().slice(0, 10),
  completedLessons: ['eng_1', 'math_1', 'sci_1'],
  studiedMaterials: ['mat_1', 'mat_2'],
  questionsSolved: 24,
  correctQuestions: 21,
  quizAttempts: 2,
  quizScores: [85, 92],
  unlockedBadges: ['badge_first_lesson', 'badge_math_explorer'],
  dailyPlan: {
    eng: true,
    math: true,
    sci: false,
    urdu_sindhi: false,
    comp_ss: false,
    revision: false,
    challenge: false
  },
  favorites: [],
  notes: {}
};

let AppState = { ...defaultState };

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      AppState = { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
    updateOverviewCounters();
    updateBadgesUI();
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

// -------------------------------------------------------------
// SUBJECTS & CURRICULUM DATA
// -------------------------------------------------------------
const SUBJECTS = [
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'var(--primary-600)',
    badgeColor: 'badge-blue',
    chaptersCount: 6,
    lessonsCount: 48,
    desc: 'Reading Comprehension, Grammar Mastery, Tenses, Sentence Structure, Vocabulary & Writing Skills.',
    chapters: [
      {
        id: 'eng_u1',
        title: 'Unit 1 — Reading Skills',
        lessons: [
          { id: 'eng_1', title: 'Reading for Meaning', obj: 'Identify central concepts and decode textual context accurately.', content: 'Reading for meaning involves looking beyond individual words to comprehend the author\'s main intent. Grade 6 students should read actively by visualizing descriptions, asking questions, and summarizing paragraphs as they read.', example: 'Context: "The arid land yielded no crops without rainfall." Arid means dry.', terms: [{ name: 'Comprehension', def: 'The ability to understand what is read.' }, { name: 'Active Reading', def: 'Engaging with text through questioning and annotating.' }], quiz: { q: 'What is the key to reading for meaning?', options: ['Skipping difficult words', 'Active comprehension & visualization', 'Reading as fast as possible', 'Memorizing every sentence'], correct: 1, exp: 'Active reading connects textual clues with existing knowledge.' } },
          { id: 'eng_2', title: 'Main Idea & Details', obj: 'Distinguish between the primary assertion and supporting evidence.', content: 'The main idea is the primary point an author makes. Supporting details provide specific facts, reasons, or statistics to back it up.', example: 'Paragraph: "Honeybees are crucial for ecosystems. They pollinate 80% of flowering plants." Main idea: Honeybees are crucial.', terms: [{ name: 'Main Idea', def: 'Central argument of a paragraph.' }], quiz: { q: 'Which sentence usually contains the main idea?', options: ['The topic sentence', 'The last quotation', 'Any random sentence', 'The title only'], correct: 0, exp: 'The topic sentence commonly introduces the main point.' } },
          { id: 'eng_3', title: 'Inference & Deduction', obj: 'Draw logical conclusions from textual evidence.', content: 'An inference is an educated guess based on clues in the text combined with prior knowledge.', example: 'Clue: "Clouds darkened and people opened umbrellas." Inference: It started raining.', terms: [{ name: 'Inference', def: 'A conclusion drawn from indirect clues.' }], quiz: { q: 'Inference requires:', options: ['Only your imagination', 'Text evidence + Prior knowledge', 'Direct dictionary lookup', 'Asking the author'], correct: 1, exp: 'Inference combines clues with background understanding.' } },
          { id: 'eng_4', title: 'Cause and Effect', obj: 'Identify why events happen and their direct results.', content: 'Cause explains why something happens; effect is what happens as a result.', example: 'Cause: Deforestation occurs. Effect: Soil erosion increases.', terms: [{ name: 'Cause', def: 'The reason why an event occurs.' }], quiz: { q: 'In "Because he studied diligently, he scored an A", what is the cause?', options: ['He scored an A', 'He studied diligently', 'The test was hard', 'None'], correct: 1, exp: 'Studying diligently is the action causing the high score.' } },
          { id: 'eng_5', title: 'Fact vs Opinion', obj: 'Distinguish verifiable statements from personal beliefs.', content: 'A fact can be proven with empirical evidence. An opinion reflects beliefs or emotions.', example: 'Fact: Karachi is a coastal city. Opinion: Karachi is the most exciting city in Asia.', terms: [{ name: 'Fact', def: 'A statement proven objectively true.' }], quiz: { q: 'Which statement is a fact?', options: ['Math is fun', 'Water boils at 100°C at sea level', 'Science is difficult', 'Summer is the best season'], correct: 1, exp: 'Boiling point is an empirically testable scientific fact.' } }
        ]
      },
      {
        id: 'eng_u2',
        title: 'Unit 2 — Grammar & Parts of Speech',
        lessons: [
          { id: 'eng_11', title: 'Nouns & Classifications', obj: 'Categorize proper, common, abstract, and collective nouns.', content: 'Nouns name people, places, things, or ideas. Abstract nouns represent qualities (honesty, courage), and collective nouns represent groups (flock, jury).', example: 'The committee (collective) praised the honesty (abstract) of Ali (proper).', terms: [{ name: 'Abstract Noun', def: 'A noun denoting an idea, quality, or state.' }], quiz: { q: '"Bravery" is an example of what type of noun?', options: ['Proper noun', 'Abstract noun', 'Concrete noun', 'Collective noun'], correct: 1, exp: 'Bravery is an abstract quality that cannot be touched physically.' } },
          { id: 'eng_12', title: 'Pronouns & Antecedents', obj: 'Master personal, possessive, relative, and reflexive pronouns.', content: 'Pronouns replace nouns. The antecedent is the noun a pronoun refers to.', example: 'Sara finished her project; she was proud.', terms: [{ name: 'Antecedent', def: 'The noun replaced by a pronoun.' }], quiz: { q: 'Identify the relative pronoun: "The boy who won the race is my cousin."', options: ['The', 'who', 'won', 'cousin'], correct: 1, exp: '"Who" is a relative pronoun connecting clauses.' } },
          { id: 'eng_13', title: 'Verbs & Action Words', obj: 'Understand transitive, intransitive, and linking verbs.', content: 'Verbs express action or state of being. Transitive verbs take a direct object; intransitive verbs do not.', example: 'Transitive: Fatima baked a cake. Intransitive: The birds sang sweetly.', terms: [{ name: 'Transitive Verb', def: 'A verb requiring a direct object.' }], quiz: { q: 'Which sentence has a transitive verb?', options: ['He laughed loudly', 'She wrote an essay', 'They slept early', 'The rain fell'], correct: 1, exp: '"An essay" receives the action of the verb "wrote".' } }
        ]
      },
      {
        id: 'eng_u3',
        title: 'Unit 3 — Tenses & Verb Forms',
        lessons: [
          { id: 'eng_21', title: 'Simple Present Tense', obj: 'Express habitual actions and universal truths.', content: 'Structure: Subject + Base Verb (+ s/es for 3rd person singular). Used for facts, habits, and schedules.', example: 'The earth orbits the sun. Bilal reads books daily.', terms: [{ name: 'Simple Present', def: 'Tense used for habits and universal facts.' }], quiz: { q: 'Choose the correct form: "She ____ to school every morning."', options: ['go', 'goes', 'going', 'gone'], correct: 1, exp: 'Third person singular (she) takes the -es ending.' } },
          { id: 'eng_22', title: 'Present Continuous Tense', obj: 'Describe actions happening right now or ongoing processes.', content: 'Structure: Subject + is/am/are + Verb-ing.', example: 'We are studying Grade 6 mathematics right now.', terms: [{ name: 'Continuous Tense', def: 'Expresses ongoing uncompleted actions.' }], quiz: { q: 'Which sentence is in present continuous?', options: ['I wrote a letter', 'I am writing a letter', 'I will write', 'I have written'], correct: 1, exp: '"Am writing" signifies present continuous action.' } }
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🔢',
    color: 'var(--accent-teal)',
    badgeColor: 'badge-teal',
    chaptersCount: 9,
    lessonsCount: 52,
    desc: 'Number System, Integers, Fractions, Decimals, Ratios, Percentages, Algebra, Geometry & Data Handling.',
    chapters: [
      {
        id: 'math_u1',
        title: 'Unit 1 — Number System & Integers',
        lessons: [
          { id: 'math_1', title: 'Natural & Whole Numbers', obj: 'Understand the set of natural numbers (N) and whole numbers (W).', content: 'Natural numbers start from 1, 2, 3... while Whole numbers include 0: {0, 1, 2, 3...}. Zero is the additive identity.', example: '5 + 0 = 5 (Identity property of addition).', terms: [{ name: 'Whole Numbers', def: 'Set of numbers {0, 1, 2, 3...}' }], quiz: { q: 'What is the smallest whole number?', options: ['1', '0', '-1', 'None'], correct: 1, exp: 'Zero is the smallest whole number.' } },
          { id: 'math_2', title: 'Integers & The Number Line', obj: 'Represent positive and negative integers on a horizontal line.', content: 'Integers (Z) include negative numbers, zero, and positive numbers. On the number line, values increase to the right and decrease to the left.', example: '-5 < -2, because -2 lies further to the right on the number line.', terms: [{ name: 'Integer', def: 'Any whole number including negative values {... -2, -1, 0, 1, 2...}' }], quiz: { q: 'Which integer is the greatest?', options: ['-15', '-3', '-1', '-20'], correct: 2, exp: '-1 is closest to zero from the negative side.' } },
          { id: 'math_3', title: 'Factors, Multiples, HCF & LCM', obj: 'Calculate Highest Common Factor and Lowest Common Multiple using prime factorization.', content: 'HCF is the largest factor dividing both numbers. LCM is the smallest multiple shared by both numbers. Product rule: HCF × LCM = Product of two numbers.', example: 'For 12 and 18: Factors of 12={1,2,3,4,6,12}, Factors of 18={1,2,3,6,9,18}. HCF = 6. LCM = 36.', terms: [{ name: 'HCF', def: 'Highest Common Factor.' }, { name: 'LCM', def: 'Lowest Common Multiple.' }], quiz: { q: 'What is the HCF of 24 and 36?', options: ['6', '12', '18', '72'], correct: 1, exp: '12 is the largest integer dividing both 24 (12x2) and 36 (12x3).' } }
        ]
      },
      {
        id: 'math_u2',
        title: 'Unit 2 — Fractions & Decimals',
        lessons: [
          { id: 'math_15', title: 'Fractions: Types & Operations', obj: 'Add, subtract, multiply, and divide proper, improper, and mixed fractions.', content: 'To add fractions with unlike denominators, find the LCM of denominators to create equivalent fractions before adding.', example: '1/3 + 1/4 = 4/12 + 3/12 = 7/12.', terms: [{ name: 'Improper Fraction', def: 'Fraction where numerator ≥ denominator (e.g., 7/4).' }], quiz: { q: 'Simplify: 2/5 + 1/10', options: ['3/15', '5/10 (1/2)', '3/10', '4/10'], correct: 1, exp: '2/5 = 4/10; 4/10 + 1/10 = 5/10 = 1/2.' } }
        ]
      },
      {
        id: 'math_u3',
        title: 'Unit 3 — Algebra & Equations',
        lessons: [
          { id: 'math_35', title: 'Variables, Constants & Simple Equations', obj: 'Formulate and solve one-step linear equations.', content: 'An algebraic expression contains variables (letters) and constants (numbers). An equation includes an equality sign (=).', example: 'Solve x + 7 = 15 => x = 15 - 7 => x = 8.', terms: [{ name: 'Variable', def: 'A letter representing an unknown value.' }], quiz: { q: 'If 3x = 21, what is x?', options: ['6', '7', '18', '63'], correct: 1, exp: 'Divide both sides by 3: x = 21/3 = 7.' } }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'General Science',
    icon: '🔬',
    color: 'var(--accent-emerald)',
    badgeColor: 'badge-emerald',
    chaptersCount: 7,
    lessonsCount: 36,
    desc: 'Cell Biology, Plant Structure, Human Body Systems, States of Matter, Energy, Earth & Solar System.',
    chapters: [
      {
        id: 'sci_u1',
        title: 'Unit 1 — Cells & Living Things',
        lessons: [
          { id: 'sci_1', title: 'What is a Cell?', obj: 'Recognize the cell as the structural and functional unit of life.', content: 'All living organisms are made of cells. Unicellular organisms (like Amoeba) consist of one cell, while multicellular organisms (like humans and trees) consist of billions of specialized cells.', example: 'Robert Hooke discovered cells in 1665 using a primitive microscope.', terms: [{ name: 'Cell', def: 'The basic building block of all living organisms.' }, { name: 'Microscope', def: 'An optical instrument used to view microscopic structures.' }], quiz: { q: 'Who first discovered and coined the term "cell"?', options: ['Isaac Newton', 'Robert Hooke', 'Louis Pasteur', 'Gregor Mendel'], correct: 1, exp: 'Robert Hooke observed cork tissue in 1665 and termed them cells.' } },
          { id: 'sci_2', title: 'Plant Cells vs Animal Cells', obj: 'Compare organelles: cell wall, chloroplasts, vacuoles, and membranes.', content: 'Plant cells have a rigid cellulose cell wall and chloroplasts containing chlorophyll for photosynthesis. Animal cells lack cell walls and chloroplasts, and possess smaller, temporary vacuoles.', example: 'Chloroplasts capture sunlight to produce glucose in plants.', terms: [{ name: 'Chloroplast', def: 'Organelle where photosynthesis occurs in plant cells.' }, { name: 'Cell Wall', def: 'Rigid outer layer in plant cells providing structural support.' }], quiz: { q: 'Which organelle is present in plant cells but absent in animal cells?', options: ['Nucleus', 'Mitochondria', 'Cell wall & Chloroplast', 'Cell membrane'], correct: 2, exp: 'Cell walls and chloroplasts are unique to plant cells.' } }
        ]
      },
      {
        id: 'sci_u2',
        title: 'Unit 2 — Human Body Systems',
        lessons: [
          { id: 'sci_15', title: 'Digestive & Respiratory Systems', obj: 'Trace the path of nutrients and gas exchange in humans.', content: 'The digestive system breaks down food into soluble nutrients (Mouth -> Esophagus -> Stomach -> Small Intestine). The respiratory system brings oxygen into the lungs (Alveoli) and expels carbon dioxide.', example: 'Villi in the small intestine maximize surface area for nutrient absorption.', terms: [{ name: 'Alveoli', def: 'Tiny air sacs in the lungs where gas exchange occurs.' }], quiz: { q: 'Where does the primary absorption of digested nutrients occur?', options: ['Stomach', 'Small Intestine', 'Esophagus', 'Large Intestine'], correct: 1, exp: 'The small intestine is lined with villi to absorb nutrients into the bloodstream.' } }
        ]
      },
      {
        id: 'sci_u3',
        title: 'Unit 3 — Matter & Energy',
        lessons: [
          { id: 'sci_21', title: 'States of Matter & Particle Theory', obj: 'Explain solids, liquids, and gases via kinetic particle model.', content: 'Solids have fixed shape and volume (particles tightly packed in regular lattice). Liquids have fixed volume but take container shape (particles slide past each other). Gases have neither fixed shape nor volume (particles move rapidly in all directions).', example: 'Heating ice increases kinetic energy, causing it to melt into water.', terms: [{ name: 'Kinetic Energy', def: 'Energy of motion of particles.' }], quiz: { q: 'In which state do particles move fastest with greatest separation?', options: ['Solid', 'Liquid', 'Gas', 'Plasma only'], correct: 2, exp: 'Gas particles have weak intermolecular forces and high kinetic energy.' } }
        ]
      }
    ]
  },
  {
    id: 'urdu',
    name: 'اردو (Urdu)',
    icon: '🪶',
    color: 'var(--accent-purple)',
    badgeColor: 'badge-purple',
    chaptersCount: 5,
    lessonsCount: 25,
    desc: 'اردو قواعد، اسم و ضمیر، فعل و صفت، تفہیم عبارت، خط نویسی اور تخلیقی تحریر۔',
    chapters: [
      {
        id: 'urdu_u1',
        title: 'حصہ اول — قواعد و زبان دانی',
        lessons: [
          { id: 'urdu_1', title: 'اسم اور اس کی اقسام', obj: 'اسم معرفہ اور اسم نکرہ کی پہچان اور جملوں میں درست استعمال۔', content: 'اسم کسی شخص، جگہ یا چیز کے نام کو کہتے ہیں۔ اسم معرفہ خاص نام کو کہتے ہیں (جیسے علامہ اقبال، دریائے سندھ) جبکہ اسم نکرہ عام نام کو کہتے ہیں (جیسے لڑکا، دریا، کتاب)۔', example: 'مثال: کراچی (اسم معرفہ) پاکستان کا سب سے بڑا شہر (اسم نکرہ) ہے۔', terms: [{ name: 'اسم معرفہ', def: 'کسی خاص شخص، جگہ یا چیز کا نام۔' }, { name: 'اسم نکرہ', def: 'کسی عام شخص، جگہ یا چیز کا نام۔' }], quiz: { q: 'لفظ "ہمالیہ" قواعد کی رو سے کیا ہے؟', options: ['اسم نکرہ', 'اسم معرفہ', 'فعل', 'حرف'], correct: 1, exp: 'ہمالیہ ایک خاص پہاڑی سلسلے کا نام ہے، اس لیے یہ اسم معرفہ ہے۔' } },
          { id: 'urdu_2', title: 'ضمیر اور اس کی اقسام', obj: 'اسم کی جگہ استعمال ہونے والے الفاظ (ضمیر) کی تفہیم۔', content: 'وہ کلمہ جو کسی اسم کی جگہ بار بار دہرانے سے بچنے کے لیے استعمال ہو اسے ضمیر کہتے ہیں، جیسے وہ، اس، تم، میں، ہم۔', example: 'احمد ذہین ہے، وہ روزانہ محنت کرتا ہے۔ (یہاں "وہ" ضمیر ہے)۔', terms: [{ name: 'اسم ضمیر', def: 'جو اسم کی جگہ استعمال ہو۔' }], quiz: { q: 'جملے میں اسم کی جگہ استعمال ہونے والے لفظ کو کیا کہتے ہیں؟', options: ['صفت', 'ضمیر', 'فعل', 'موصوف'], correct: 1, exp: 'ضمیر وہ لفظ ہے جو اسم کے بجائے بولا جائے۔' } }
        ]
      }
    ]
  },
  {
    id: 'sindhi',
    name: 'سنڌي (Sindhi)',
    icon: '📜',
    color: 'var(--accent-orange)',
    badgeColor: 'badge-orange',
    chaptersCount: 5,
    lessonsCount: 20,
    desc: 'سنڌي گرامر، اسم، ضمير، فعل، محاورا، سٺي لکڻي ۽ پڙهڻ جي سمجهه۔',
    chapters: [
      {
        id: 'sindhi_u1',
        title: 'ڀاڱو پھريون — گرامر ۽ سنڌي ٻولي',
        lessons: [
          { id: 'sindhi_1', title: 'اسم ۽ ان جا قسم (اسم خاص ۽ اسم عام)', obj: 'سنڌي ٻوليءَ ۾ اسم خاص ۽ اسم عام جي سڃاڻپ۔', content: 'اسم ڪنهن به ماڻهو، جاءِ، يا شيءِ جي نالي کي چئبو آهي. اسم خاص خاص نالي کي چئبو آهي (جهڙوڪ: شاهه لطيف، سنڌو درياءُ) ۽ اسم عام عام نالن کي چئبو آهي (جهڙوڪ: ڪتاب، ڇوڪرو، شهر).', example: 'مثال: ڪراچي (اسم خاص) سنڌ جو وڏو شهر (اسم عام) آهي.', terms: [{ name: 'اسم خاص', def: 'ڪنهن خاص ماڻهو، شهر يا جاءِ جو نالو.' }], quiz: { q: '"سنڌو درياءُ" سنڌي گرامر موجب ڇا آهي؟', options: ['اسم عام', 'اسم خاص', 'فعل', 'ضمير'], correct: 1, exp: 'سنڌو درياءُ هڪ خاص درياءَ جو نالو آهي، تنهنڪري اهو اسم خاص آهي.' } }
        ]
      }
    ]
  },
  {
    id: 'computer',
    name: 'Computer Science',
    icon: '💻',
    color: 'var(--primary-700)',
    badgeColor: 'badge-blue',
    chaptersCount: 4,
    lessonsCount: 20,
    desc: 'Hardware, Software, OS, Cyber Safety, Algorithms, Flowcharts & Programming Foundations.',
    chapters: [
      {
        id: 'comp_u1',
        title: 'Unit 1 — Hardware & Systems',
        lessons: [
          { id: 'comp_1', title: 'Computer Hardware & Software', obj: 'Differentiate system components, input/output peripherals, and system software.', content: 'Hardware refers to physical components you can touch (CPU, RAM, Motherboard, SSD). Software refers to programmed instructions (Operating Systems, Applications) executing on the hardware.', example: 'The CPU acts as the brain, processing arithmetic and logic operations via the ALU.', terms: [{ name: 'CPU', def: 'Central Processing Unit.' }, { name: 'RAM', def: 'Random Access Memory (Volatile primary storage).' }], quiz: { q: 'Which component is considered the primary volatile memory of a computer?', options: ['Hard Disk Drive', 'RAM', 'Optical Disc', 'ROM'], correct: 1, exp: 'RAM loses its contents when power is turned off (volatile).' } },
          { id: 'comp_2', title: 'Algorithms and Flowcharts', obj: 'Design step-by-step problem-solving sequences using standard flowchart symbols.', content: 'An algorithm is a finite sequence of well-defined instructions to solve a task. A flowchart uses standard geometric shapes: Oval (Start/End), Rectangle (Process), Parallelogram (Input/Output), and Diamond (Decision).', example: 'Algorithm to add two numbers: 1. Start, 2. Input A & B, 3. Sum = A + B, 4. Print Sum, 5. End.', terms: [{ name: 'Algorithm', def: 'Step-by-step procedure for calculations.' }, { name: 'Flowchart', def: 'Graphical representation of an algorithm.' }], quiz: { q: 'What shape represents a Decision in standard flowcharts?', options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'], correct: 2, exp: 'A diamond shape is used for conditional checks (Yes/No branches).' } }
        ]
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Studies',
    icon: '🌍',
    color: 'var(--accent-yellow)',
    badgeColor: 'badge-orange',
    chaptersCount: 4,
    lessonsCount: 18,
    desc: 'Geography of Pakistan, Provinces, Climate, Ancient Civilizations, Heritage & Civic Governance.',
    chapters: [
      {
        id: 'ss_u1',
        title: 'Unit 1 — Pakistan Geography & Landforms',
        lessons: [
          { id: 'ss_1', title: 'Geography & Provinces of Pakistan', obj: 'Explore the administrative boundaries, terrain, and natural rivers of Pakistan.', content: 'Pakistan features diverse topography ranging from the Karakoram & Himalayan peaks in the north to the fertile Indus River Plain, Balochistan plateau, and the Arabian Sea coastline in the south.', example: 'K2 (Godwin-Austen) at 8,611m is the second-highest peak in the world.', terms: [{ name: 'Indus Basin', def: 'The vast agricultural plain fed by River Indus and its 5 tributaries.' }], quiz: { q: 'Which is the longest river in Pakistan?', options: ['Chenab', 'Jhelum', 'Indus', 'Ravi'], correct: 2, exp: 'The Indus River (approx 3,180 km) is the primary lifeline of Pakistan.' } }
        ]
      }
    ]
  },
  {
    id: 'gk',
    name: 'General Knowledge',
    icon: '💡',
    color: 'var(--accent-rose)',
    badgeColor: 'badge-purple',
    chaptersCount: 3,
    lessonsCount: 15,
    desc: 'Scientific Discoveries, Global Landmarks, Inventions, Environmental Ecology & World Facts.',
    chapters: [
      {
        id: 'gk_u1',
        title: 'Unit 1 — Inventions & Discoveries',
        lessons: [
          { id: 'gk_1', title: 'Great Inventions that Changed the World', obj: 'Discover milestones: Printing Press, Electricity, Internet, and Penicillin.', content: 'Inventions like Gutenberg\'s printing press democratized knowledge, while Alexander Fleming\'s discovery of Penicillin in 1928 revolutionized global medicine.', example: 'The World Wide Web was invented by Tim Berners-Lee in 1989.', terms: [{ name: 'Penicillin', def: 'The first widely effective antibiotic derived from Penicillium mold.' }], quiz: { q: 'Who discovered Penicillin?', options: ['Alexander Fleming', 'Thomas Edison', 'Marie Curie', 'Galileo'], correct: 0, exp: 'Alexander Fleming discovered penicillin in 1928.' } }
        ]
      }
    ]
  }
];

// -------------------------------------------------------------
// ENGLISH READING LIBRARY (8 ORIGINAL PASSAGES)
// -------------------------------------------------------------
const READING_LIBRARY = [
  {
    id: 'lib_1',
    title: 'The Young Inventor',
    author: 'EduNexa Original',
    genre: 'Science & Determination',
    excerpt: 'Zayd spent weeks in his garage building a solar-powered water filtration pump for his village...',
    fullText: 'Fourteen-year-old Zayd lived in a vibrant farming village near Hyderabad. During scorching summers, clean water was scarce. Determined to assist his community, Zayd gathered recycled plastic bottles, fine sand, activated charcoal, and a compact solar panel salvaged from an old garden lamp.\n\nWorking late into the evening, he designed a tiered filtration unit where solar energy pumped turbid canal water through successive purification layers. When the local agricultural committee tested the water, it was crystal clear and safe. Zayd proved that innovative problem-solving does not require expensive laboratories, but curiosity and resilience.',
    vocab: [
      { word: 'Scarcity', meaning: 'A state of being in short supply or shortage.' },
      { word: 'Turbid', meaning: 'Cloudy, opaque, or thick with suspended matter.' },
      { word: 'Resilience', meaning: 'The capacity to recover quickly from difficulties.' }
    ],
    questions: [
      { q: 'What motivated Zayd to build the water filtration pump?', options: ['A school competition', 'Scarcity of clean water in his village', 'To sell it for money', 'His teacher forced him'], correct: 1 },
      { q: 'What powered Zayd\'s filtration pump?', options: ['Wind turbine', 'Solar panel', 'Diesel generator', 'Hand crank'], correct: 1 }
    ]
  },
  {
    id: 'lib_2',
    title: 'The Hidden Library',
    author: 'EduNexa Original',
    genre: 'Adventure & History',
    excerpt: 'Deep within an ancient stone fortress, Ayla discovered an arched doorway sealed with terracotta seals...',
    fullText: 'During a weekend archaeological study tour at the ancient Kot Diji fortress, Ayla noticed a hollow echo beneath the courtyard flagstones. Moving aside dust and fallen stones, she uncovered a concealed stairway descending into a cool underground room.\n\nInside stood cedar wood shelves holding preserved parchment manuscripts and navigational star charts created by 16th-century astronomers. The discovery shed new light on how ancient regional scholars charted trade caravans and mapped monsoon currents across the Arabian Sea.',
    vocab: [
      { word: 'Flagstones', meaning: 'Flat stone slabs used for paving.' },
      { word: 'Manuscript', meaning: 'A handwritten book, document, or historical record.' }
    ],
    questions: [
      { q: 'Where was the hidden library discovered?', options: ['Kot Diji fortress', 'Mohenjo-daro', 'Lahore Fort', 'Taxila'], correct: 0 },
      { q: 'What did the star charts demonstrate?', options: ['Ancient cooking techniques', 'Trade routes and monsoon navigation', 'Poetry and rhymes', 'Modern aviation'], correct: 1 }
    ]
  },
  {
    id: 'lib_3',
    title: 'A Journey Through the Desert',
    author: 'EduNexa Original',
    genre: 'Geography & Nature',
    excerpt: 'The Thar Desert at twilight transforms from blistering gold into a serene sanctuary under glittering constellations...',
    fullText: 'Traveling across the Tharparkar desert region reveals an astonishing ecosystem. Contrary to popular belief, deserts are not lifeless wastelands. Peacocks roost in acacia trees, desert foxes burrow beneath sand dunes to stay cool during the day, and hardy indigenous grasses flourish after monsoon showers. The local communities have mastered rainwater harvesting through traditional underground cisterns called "tarai".',
    vocab: [
      { word: 'Ecosystem', meaning: 'A biological community of interacting organisms and their environment.' },
      { word: 'Indigenous', meaning: 'Originating or occurring naturally in a particular place.' }
    ],
    questions: [
      { q: 'What traditional water storage method is used in the desert?', options: ['Concrete dams', 'Tarai cisterns', 'Metal barrels', 'Plastic pipes'], correct: 1 }
    ]
  },
  {
    id: 'lib_4',
    title: 'The Science Fair Triumph',
    author: 'EduNexa Original',
    genre: 'Teamwork & Science',
    excerpt: 'Team Alpha spent three months analyzing urban heat islands and building reflective green roof models...',
    fullText: 'At the National Middle School Science Fair, Noor and her teammate Hamza showcased a scaled model of eco-friendly green roofs. By planting sedum and native shrubs on insulated miniature buildings, they demonstrated an 8°C reduction in indoor temperature compared to conventional concrete roofs. The judges awarded them first prize for ecological practicality and data-driven analysis.',
    vocab: [
      { word: 'Urban Heat Island', meaning: 'An urban area significantly warmer than its surrounding rural areas.' }
    ],
    questions: [
      { q: 'How much temperature reduction did the green roof model show?', options: ['2°C', '5°C', '8°C', '15°C'], correct: 2 }
    ]
  },
  {
    id: 'lib_5',
    title: 'The River Rescue',
    author: 'EduNexa Original',
    genre: 'Wildlife Conservation',
    excerpt: 'A blind Indus River Dolphin was stranded in an irrigation canal after floodwaters receded...',
    fullText: 'The Indus River Dolphin (Platanista minor) is one of the world\'s rarest freshwater mammals. Blind by adaptation, it navigates turbid river currents using sophisticated echolocation. When an adolescent dolphin was stranded in a shallow canal near Sukkur Barrage, wildlife biologists and local fishermen collaborated, gently lifting the dolphin onto a cushioned rescue stretcher to release it back into the main river channel.',
    vocab: [
      { word: 'Echolocation', meaning: 'The location of objects by reflected sound waves.' }
    ],
    questions: [
      { q: 'How does the Indus River Dolphin navigate?', options: ['Sharp eyesight', 'Echolocation', 'Magnetic compass', 'Smell'], correct: 1 }
    ]
  },
  {
    id: 'lib_6',
    title: 'The Future of Technology',
    author: 'EduNexa Original',
    genre: 'Future & Robotics',
    excerpt: 'Autonomous agriculture drones and machine learning are revolutionizing crop monitoring...',
    fullText: 'Modern agriculture is entering a digital revolution. Farmers now deploy multispectral drones to inspect hectares of wheat and cotton in minutes. Sensors detect soil moisture and nutrient deficiencies before visible symptoms appear, reducing water waste by 40% and protecting vital food resources.',
    vocab: [
      { word: 'Autonomous', meaning: 'Operating independently without continuous human intervention.' }
    ],
    questions: [
      { q: 'How much water waste can precision drone technology save?', options: ['10%', '20%', '40%', '80%'], correct: 2 }
    ]
  },
  {
    id: 'lib_7',
    title: 'The Clever Team',
    author: 'EduNexa Original',
    genre: 'Collaboration',
    excerpt: 'When the bridge challenge in physics class seemed impossible, diverse skills saved the day...',
    fullText: 'Tasked with constructing a bridge from balsa wood and string that could hold 15 kilograms, Bilal\'s team initially disagreed. However, they soon assigned roles based on strengths: Sana calculated structural load triangles (trusses), Bilal measured precision joints, and Danish tested tensile strength. Their collaborative truss bridge comfortably withstood 22 kilograms.',
    vocab: [
      { word: 'Truss', meaning: 'A framework supporting a bridge composed of interconnected triangles.' }
    ],
    questions: [
      { q: 'What geometric shape provides strength in bridge trusses?', options: ['Circles', 'Triangles', 'Squares', 'Pentagons'], correct: 1 }
    ]
  },
  {
    id: 'lib_8',
    title: 'A Visit to Mohenjo-daro',
    author: 'EduNexa Original',
    genre: 'Civilization & Heritage',
    excerpt: 'Walking along the baked-brick avenues of the 4,500-year-old Indus Valley metropolis...',
    fullText: 'Mohenjo-daro ("Mound of the Dead"), built around 2500 BCE, stands as a testament to ancient civil engineering. The city possessed an advanced covered drainage network, standardized fired bricks, multi-story houses with indoor bathrooms, and the famous Great Bath lined with watertight natural bitumen sealant.',
    vocab: [
      { word: 'Bitumen', meaning: 'A black viscous mixture of hydrocarbons used for waterproofing.' }
    ],
    questions: [
      { q: 'What material made the Great Bath watertight?', options: ['Cement', 'Natural Bitumen', 'Clay', 'Plastic'], correct: 1 }
    ]
  }
];

// -------------------------------------------------------------
// STUDY MATERIAL CENTER DATA
// -------------------------------------------------------------
const STUDY_MATERIALS = [
  {
    id: 'mat_1',
    category: '📖 Detailed Notes',
    subject: 'General Science',
    chapter: 'Cells & Life',
    topic: 'Cell Organelles & Functions',
    content: 'The cell is the basic structural and functional unit of living organisms.\n• Nucleus: Contains genetic material (DNA) and directs cell activities.\n• Mitochondria: "Powerhouse of the cell", generates ATP through cellular respiration.\n• Ribosomes: Sites of protein synthesis.\n• Cytoplasm: Gel-like medium where biochemical reactions occur.\n• Cell Membrane: Semi-permeable barrier controlling entry and exit of substances.\n• Chloroplasts (Plants only): Contain chlorophyll for photosynthesis.\n• Cell Wall (Plants only): Made of cellulose to provide shape and rigidity.',
    keyPoints: 'Plant cells have cell walls and chloroplasts; animal cells do not.',
    formula: 'Respiration: Glucose + Oxygen -> Carbon Dioxide + Water + ATP'
  },
  {
    id: 'mat_2',
    category: '🧮 Formulas & Rules',
    subject: 'Mathematics',
    chapter: 'Geometry & Numbers',
    topic: 'Essential Math Formulas for Grade 6',
    content: '1. Area of Rectangle = Length × Breadth (A = l × b)\n2. Perimeter of Rectangle = 2(Length + Breadth)\n3. Area of Square = Side × Side (A = s²)\n4. Perimeter of Square = 4 × Side\n5. Sum of Angles in a Triangle = 180°\n6. Percentage = (Part / Whole) × 100\n7. Product Rule: HCF(a, b) × LCM(a, b) = a × b\n8. Speed = Distance / Time',
    keyPoints: 'Always check that units are uniform before calculating area or perimeter.',
    formula: 'HCF × LCM = Product of Numbers'
  },
  {
    id: 'mat_3',
    category: '⚡ Quick Notes',
    subject: 'English',
    chapter: 'Grammar',
    topic: 'Mastering the 8 Parts of Speech',
    content: '1. Noun: Naming word (Ali, City, Courage)\n2. Pronoun: Replaces noun (He, She, They, It)\n3. Verb: Action or state (Run, Think, Is)\n4. Adjective: Modifies noun (Bright, Swift, Three)\n5. Adverb: Modifies verb/adjective (Quickly, Very, Well)\n6. Preposition: Spatial/temporal relationship (In, On, Under, Before)\n7. Conjunction: Connects clauses/words (And, But, Because, Although)\n8. Interjection: Expresses emotion (Wow! Alas! Hurray!)',
    keyPoints: 'A word\'s part of speech depends on how it functions inside the sentence.',
    formula: 'Sentence = Subject + Predicate'
  },
  {
    id: 'mat_4',
    category: '🔬 Science Diagrams',
    subject: 'General Science',
    chapter: 'Earth & Space',
    topic: 'The Water Cycle Processes',
    content: '• Evaporation: Liquid water absorbs solar heat and transforms into water vapor.\n• Transpiration: Plants release water vapor through stomata in leaves.\n• Condensation: Water vapor cools in upper atmosphere forming clouds.\n• Precipitation: Water falls as rain, snow, or hail when droplets grow heavy.\n• Collection / Runoff: Water flows into rivers, lakes, oceans, and aquifers.',
    keyPoints: 'The sun drives the entire water cycle through thermal energy transfer.',
    formula: 'Liquid -> Vapor (Evaporation) -> Droplets (Condensation) -> Rain (Precipitation)'
  },
  {
    id: 'mat_5',
    category: '📝 Important Questions',
    subject: 'Computer Science',
    chapter: 'Hardware & OS',
    topic: 'Exam High-Yield Questions',
    content: 'Q1: What is the difference between RAM and ROM?\nAns: RAM is volatile, read/write memory holding running programs. ROM is non-volatile, read-only memory holding boot instructions (BIOS).\n\nQ2: What is an Operating System?\nAns: System software managing computer hardware and software resources (e.g., Windows, Linux).',
    keyPoints: 'RAM is temporary; Storage (SSD/HDD) is permanent.',
    formula: 'Byte = 8 Bits, 1 KB = 1024 Bytes'
  }
];

// -------------------------------------------------------------
// 60-QUESTION COMPREHENSIVE MASTER QUIZ
// -------------------------------------------------------------
const MASTER_QUIZ_QUESTIONS = [
  // English (1-12)
  { id: 1, subject: 'English', q: 'Identify the abstract noun: "The soldiers fought with great bravery."', options: ['soldiers', 'fought', 'bravery', 'great'], correct: 2, exp: 'Bravery is an abstract quality that cannot be physically touched.' },
  { id: 2, subject: 'English', q: 'Which sentence uses the correct subject-verb agreement?', options: ['The team of doctors are ready.', 'The group of students is studying.', 'Every boys were present.', 'She go to market.'], correct: 1, exp: '"The group" is a singular collective subject requiring "is".' },
  { id: 3, subject: 'English', q: 'What is the synonym of "Vibrant"?', options: ['Dull', 'Energetic & Lively', 'Dark', 'Silent'], correct: 1, exp: 'Vibrant means bright, full of energy and life.' },
  { id: 4, subject: 'English', q: 'Choose the sentence in Past Continuous tense:', options: ['He wrote a letter.', 'He was writing a letter.', 'He had written a letter.', 'He writes.'], correct: 1, exp: '"Was writing" indicates an ongoing action in past time.' },
  { id: 5, subject: 'English', q: 'Identify the conjunction in: "She studied hard, yet she missed the bus."', options: ['studied', 'yet', 'hard', 'missed'], correct: 1, exp: '"Yet" is a coordinating conjunction connecting contrasting clauses.' },
  { id: 6, subject: 'English', q: 'What is an antonym for "Arid"?', options: ['Dry', 'Humid / Fertile', 'Sandy', 'Barren'], correct: 1, exp: 'Arid means dry; fertile/humid is its opposite.' },
  { id: 7, subject: 'English', q: 'Which word contains a prefix meaning "again"?', options: ['Unhappy', 'Rewrite', 'Bicycle', 'Predict'], correct: 1, exp: '"Re-" means again (Rewrite = write again).' },
  { id: 8, subject: 'English', q: 'In "The car stopped suddenly", the word "suddenly" is an:', options: ['Adverb of manner', 'Adjective', 'Preposition', 'Noun'], correct: 0, exp: '"Suddenly" describes how the car stopped (manner).' },
  { id: 9, subject: 'English', q: 'Select the correctly punctuated direct speech:', options: ['Ali said, "I love reading."', 'Ali said "I love reading"', 'Ali said, I love reading.', 'Ali, said "I love reading".'], correct: 0, exp: 'Direct speech uses a comma before opening quotation marks.' },
  { id: 10, subject: 'English', q: 'What is the main purpose of a topic sentence in a paragraph?', options: ['To conclude the essay', 'To state the central idea', 'To ask a question', 'To list references'], correct: 1, exp: 'The topic sentence introduces the main focus of a paragraph.' },
  { id: 11, subject: 'English', q: 'Identify the preposition: "The cat jumped over the wooden fence."', options: ['jumped', 'over', 'wooden', 'cat'], correct: 1, exp: '"Over" is a preposition showing spatial relation.' },
  { id: 12, subject: 'English', q: 'Which suffix turns the verb "teach" into a noun for a person?', options: ['-ful', '-er', '-ness', '-less'], correct: 1, exp: 'Teacher = one who teaches.' },

  // Mathematics (13-27)
  { id: 13, subject: 'Mathematics', q: 'What is the value of (-8) + (+15)?', options: ['-23', '+7', '-7', '+23'], correct: 1, exp: '15 - 8 = +7.' },
  { id: 14, subject: 'Mathematics', q: 'Find the HCF of 18 and 24:', options: ['3', '6', '12', '72'], correct: 1, exp: 'Factors of 18: 1,2,3,6,9,18; Factors of 24: 1,2,3,4,6,8,12,24. HCF is 6.' },
  { id: 15, subject: 'Mathematics', q: 'What is the LCM of 6 and 8?', options: ['12', '16', '24', '48'], correct: 2, exp: 'Multiples of 6 (6,12,18,24) and 8 (8,16,24) share 24 as least multiple.' },
  { id: 16, subject: 'Mathematics', q: 'Simplify: 3/4 + 1/2', options: ['4/6', '5/4 (1 1/4)', '1', '3/8'], correct: 1, exp: '3/4 + 2/4 = 5/4.' },
  { id: 17, subject: 'Mathematics', q: 'Convert 0.75 into a simplified fraction:', options: ['7/5', '3/4', '75/10', '1/2'], correct: 1, exp: '75/100 simplified by dividing by 25 gives 3/4.' },
  { id: 18, subject: 'Mathematics', q: 'Solve for y: 2y + 5 = 19', options: ['7', '8', '14', '12'], correct: 0, exp: '2y = 19 - 5 = 14 => y = 7.' },
  { id: 19, subject: 'Mathematics', q: 'What is 25% of 160?', options: ['30', '40', '50', '25'], correct: 1, exp: '0.25 × 160 = 40.' },
  { id: 20, subject: 'Mathematics', q: 'If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?', options: ['8', '10', '12', '15'], correct: 1, exp: '3 units = 15 => 1 unit = 5. 2 units = 10 girls.' },
  { id: 21, subject: 'Mathematics', q: 'Calculate the perimeter of a rectangle with length 12 cm and width 8 cm:', options: ['96 cm', '40 cm', '20 cm', '48 cm'], correct: 1, exp: 'Perimeter = 2(12 + 8) = 2(20) = 40 cm.' },
  { id: 22, subject: 'Mathematics', q: 'What is the sum of interior angles in any triangle?', options: ['90°', '180°', '360°', '270°'], correct: 1, exp: 'The interior angles of any triangle always add up to 180°.' },
  { id: 23, subject: 'Mathematics', q: 'An angle measuring 135° is classified as:', options: ['Acute', 'Right', 'Obtuse', 'Reflex'], correct: 2, exp: 'Angles between 90° and 180° are obtuse angles.' },
  { id: 24, subject: 'Mathematics', q: 'Evaluate: 15 - 3 × 4 + 2 (using BODMAS)', options: ['50', '5', '14', '20'], correct: 1, exp: 'Multiplication first: 3×4=12. Then: 15 - 12 + 2 = 3 + 2 = 5.' },
  { id: 25, subject: 'Mathematics', q: 'Which number is a prime number?', options: ['9', '15', '29', '33'], correct: 2, exp: '29 has only two factors: 1 and 29.' },
  { id: 26, subject: 'Mathematics', q: 'Find the area of a square whose side is 9 cm:', options: ['36 cm²', '81 cm²', '18 cm²', '72 cm²'], correct: 1, exp: 'Area = side² = 9 × 9 = 81 cm².' },
  { id: 27, subject: 'Mathematics', q: 'Evaluate (-5) × (-4):', options: ['-20', '+20', '-9', '+9'], correct: 1, exp: 'Negative multiplied by negative gives a positive (+20).' },

  // General Science (28-39)
  { id: 28, subject: 'General Science', q: 'Which organelle is called the "Powerhouse of the Cell"?', options: ['Nucleus', 'Mitochondria', 'Vacuole', 'Ribosome'], correct: 1, exp: 'Mitochondria produce ATP energy for cellular activities.' },
  { id: 29, subject: 'General Science', q: 'What green pigment absorbs sunlight for photosynthesis in plants?', options: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Carotene'], correct: 1, exp: 'Chlorophyll inside chloroplasts captures light photons.' },
  { id: 30, subject: 'General Science', q: 'Which blood cells fight infections and pathogens in the body?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1, exp: 'White blood cells (leukocytes) form the body\'s immune defense.' },
  { id: 31, subject: 'General Science', q: 'What is the change of state from gas directly to liquid called?', options: ['Evaporation', 'Condensation', 'Freezing', 'Sublimation'], correct: 1, exp: 'Condensation is gas cooling into liquid.' },
  { id: 32, subject: 'General Science', q: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen (21%)', 'Nitrogen (~78%)', 'Carbon Dioxide', 'Argon'], correct: 1, exp: 'Nitrogen constitutes approx 78% of dry air.' },
  { id: 33, subject: 'General Science', q: 'Which organ produces bile to help digest fats?', options: ['Stomach', 'Liver', 'Pancreas', 'Kidney'], correct: 1, exp: 'The liver synthesizes bile, stored in the gallbladder.' },
  { id: 34, subject: 'General Science', q: 'Sound travels fastest through which medium?', options: ['Vacuum', 'Air', 'Water', 'Solids (e.g. Steel)'], correct: 3, exp: 'Solids have tightly packed molecules transmitting vibrations fastest.' },
  { id: 35, subject: 'General Science', q: 'What is the closest planet to the Sun?', options: ['Venus', 'Mercury', 'Mars', 'Earth'], correct: 1, exp: 'Mercury is the innermost planet of our Solar System.' },
  { id: 36, subject: 'General Science', q: 'Which of the following is a non-renewable energy resource?', options: ['Solar', 'Wind', 'Coal / Fossil fuels', 'Hydroelectric'], correct: 2, exp: 'Coal is a finite fossil fuel that cannot be replenished quickly.' },
  { id: 37, subject: 'General Science', q: 'Tiny microscopic pores in leaves for gas exchange are called:', options: ['Villi', 'Stomata', 'Xylem', 'Phloem'], correct: 1, exp: 'Stomata regulate gas intake (CO₂) and transpiration (H₂O).' },
  { id: 38, subject: 'General Science', q: 'What type of rock is formed by the cooling and solidification of molten lava?', options: ['Sedimentary', 'Igneous', 'Metamorphic', 'Limestone'], correct: 1, exp: 'Igneous rocks (like basalt and granite) crystallize from molten magma.' },
  { id: 39, subject: 'General Science', q: 'Which layer of the Earth is liquid and creates its magnetic field?', options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'], correct: 2, exp: 'The molten liquid iron-nickel Outer Core generates Earth\'s geodynamo.' },

  // Urdu (40-44)
  { id: 40, subject: 'Urdu', q: 'لفظ "سخی" کا متضاد (الٹ) کیا ہے؟', options: ['دانا', 'بخیل (کنجوس)', 'شریف', 'امیر'], correct: 1, exp: 'سخی (کھلے دل سے دینے والا) کا متضاد بخیل یا کنجوس ہے۔' },
  { id: 41, subject: 'Urdu', q: 'جملے میں "کام کرنے والے" کو کیا کہتے ہیں؟', options: ['مفعول', 'فاعل', 'فعل', 'حرف'], correct: 1, exp: 'فاعل کام کرنے والے شخص یا اسم کو کہا جاتا ہے۔' },
  { id: 42, subject: 'Urdu', q: '"چراغ تلے اندھیرا" قواعد کی رو سے کیا ہے؟', options: ['محاورہ / ضرب المثل', 'اسم صفت', 'فعل لازم', 'حرف عطف'], correct: 0, exp: 'یہ ایک مشہور ضرب المثل ہے۔' },
  { id: 43, subject: 'Urdu', q: 'لفظ "آفتاب" کا ہم معنی (مترادف) لفظ ہے:', options: ['مہتاب', 'سورج (خورشید)', 'ستارہ', 'بادل'], correct: 1, exp: 'آفتاب، خورشید اور سورج ہم معنی الفاظ ہیں۔' },
  { id: 44, subject: 'Urdu', q: '"کتابیں میز پر ہیں" میں حرف ربط کون سا ہے؟', options: ['کتابیں', 'میز', 'پر', 'ہیں'], correct: 2, exp: '"پر" ایک حرف ہے جو تعلق ظاہر کرتا ہے۔' },

  // Sindhi (45-49)
  { id: 45, subject: 'Sindhi', q: 'سنڌي گرامر موجب "ڪم ڪرڻ واري" کي ڇا چئبو آهي؟', options: ['مفعول', 'فاعل', 'فعل', 'ظرف'], correct: 1, exp: 'ڪم ڪرڻ واري کي فاعل چئبو آهي.' },
  { id: 46, subject: 'Sindhi', q: 'لفظ "ڏاهو" جو متضاد لفظ ڪھڙو آهي؟', options: ['عالم', 'نادان / بيوقوف', 'سياڻو', 'هوشيار'], correct: 1, exp: 'ڏاهو (سمجهدار) جو ضد نادان يا اڻ سمجهه آهي.' },
  { id: 47, subject: 'Sindhi', q: 'سنڌ جو سڀ کان وڏو درياءُ ڪھڙو آهي؟', options: ['جهلم', 'سنڌو درياءُ', 'چناب', 'راوي'], correct: 1, exp: 'سنڌو درياءُ سنڌ جي سڀ کان وڏي ۽ تاريخي ندي آهي.' },
  { id: 48, subject: 'Sindhi', q: '"شاهه عبداللطيف ڀٽائي" ڪير هئا؟', options: ['مشهور سنڌي صوفي شاعر', 'سائنسدان', 'بادشاهه', 'مصور'], correct: 0, exp: 'شاهه ڀٽائي سنڌ جا عظيم صوفي شاعر ۽ اديب آهن.' },
  { id: 49, subject: 'Sindhi', q: 'لفظ "روشني" جو هم معنيٰ لفظ آهي:', options: ['اوندهه', 'چمڪ / سوجهرو', 'پاڇو', 'رات'], correct: 1, exp: 'سوجهرو ۽ روشني هڪ ئي معنيٰ رکن ٿا.' },

  // Computer & Social Studies (50-60)
  { id: 50, subject: 'Computer Science', q: 'Which protocol is used for securely transmitting web pages on the Internet?', options: ['FTP', 'HTTPS', 'SMTP', 'POP3'], correct: 1, exp: 'HTTPS encrypts web traffic for secure communication.' },
  { id: 51, subject: 'Computer Science', q: 'What is the full form of CPU?', options: ['Central Processing Unit', 'Central Power Unit', 'Core Program Utility', 'Computer Primary Unit'], correct: 0, exp: 'Central Processing Unit is the main processor of a computer.' },
  { id: 52, subject: 'Computer Science', q: 'Which symbol is used for Start/Stop in a flowchart?', options: ['Rectangle', 'Oval / Rounded Box', 'Diamond', 'Circle'], correct: 1, exp: 'An oval denotes the start or termination of a flowchart.' },
  { id: 53, subject: 'Computer Science', q: 'What is phishing in cyber safety?', options: ['Catching fish online', 'Fraudulent attempts to steal passwords and sensitive data', 'Upgrading computer RAM', 'Playing multiplayer games'], correct: 1, exp: 'Phishing involves deceptive links or messages aiming to steal credentials.' },
  { id: 54, subject: 'Computer Science', q: '1 Gigabyte (GB) is equal to approximately how many Megabytes (MB)?', options: ['100 MB', '1024 MB', '500 MB', '10000 MB'], correct: 1, exp: 'In binary computer storage, 1 GB = 1024 MB.' },
  { id: 55, subject: 'Social Studies', q: 'Which is the second-highest mountain peak in the world, located in northern Pakistan?', options: ['Mount Everest', 'K2 (Godwin-Austen)', 'Nanga Parbat', 'Broad Peak'], correct: 1, exp: 'K2 stands at 8,611 meters above sea level in the Karakoram range.' },
  { id: 56, subject: 'Social Studies', q: 'Mohenjo-daro belongs to which ancient human civilization?', options: ['Mesopotamian', 'Indus Valley Civilization', 'Egyptian', 'Mayan'], correct: 1, exp: 'Mohenjo-daro was a major urban metropolis of the Indus Valley Civilization.' },
  { id: 57, subject: 'Social Studies', q: 'What is the capital city of Pakistan?', options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'], correct: 2, exp: 'Islamabad was constructed as the purpose-built federal capital.' },
  { id: 58, subject: 'Social Studies', q: 'Which imaginary line divides the Earth into the Northern and Southern Hemispheres?', options: ['Prime Meridian', 'Tropic of Cancer', 'Equator (0° Latitude)', 'Arctic Circle'], correct: 2, exp: 'The Equator is the 0-degree latitude line dividing the hemispheres.' },
  { id: 59, subject: 'Social Studies', q: 'What is the primary seaport city of Pakistan?', options: ['Multan', 'Karachi', 'Quetta', 'Faisalabad'], correct: 1, exp: 'Karachi hosts major ports (Port of Karachi and Port Qasim).' },
  { id: 60, subject: 'Social Studies', q: 'The standard scale on a map represents:', options: ['Elevation only', 'Ratio between distance on map and real ground distance', 'Temperature', 'Population'], correct: 1, exp: 'Map scale defines the proportional ratio between map units and ground reality.' }
];

// -------------------------------------------------------------
// FLASHCARDS DATA
// -------------------------------------------------------------
const FLASHCARDS = [
  { id: 1, subject: 'General Science', front: 'Mitochondria', back: 'The powerhouse of the cell; produces ATP energy through cellular respiration.' },
  { id: 2, subject: 'General Science', front: 'Photosynthesis', back: '6CO₂ + 6H₂O + Sunlight -> C₆H₁₂O₆ (Glucose) + 6O₂ inside plant chloroplasts.' },
  { id: 3, subject: 'General Science', front: 'Alveoli', back: 'Tiny, microscopic air sacs in the lungs where oxygen and carbon dioxide are exchanged.' },
  { id: 4, subject: 'Mathematics', front: 'HCF (Highest Common Factor)', back: 'The greatest number that divides exactly into two or more given numbers.' },
  { id: 5, subject: 'Mathematics', front: 'BODMAS Rule', back: 'Order of Operations: Brackets -> Orders/Powers -> Division & Multiplication -> Addition & Subtraction.' },
  { id: 6, subject: 'Mathematics', front: 'Area of a Triangle', back: 'Area = 1/2 × Base × Height (A = 1/2 · b · h).' },
  { id: 7, subject: 'English', front: 'Transitive Verb', back: 'An action verb that requires a direct object to complete its meaning (e.g., "She caught the ball").' },
  { id: 8, subject: 'English', front: 'Metaphor', back: 'A figure of speech comparing two unlike things without using "like" or "as" (e.g., "Time is a thief").' },
  { id: 9, subject: 'Computer Science', front: 'RAM vs ROM', back: 'RAM is temporary/volatile working memory. ROM contains permanent startup instructions.' },
  { id: 10, subject: 'Social Studies', front: 'Indus Valley Civilization', back: 'Bronze-Age civilization (c. 2500 BCE) famous for urban planning, Great Bath, and brick drainage networks.' }
];

// -------------------------------------------------------------
// 12 INTERACTIVE GAMES DEFINITION & ENGINES
// -------------------------------------------------------------
const GAMES_DATA = [
  { id: 'game_1', name: 'Integer Challenge', icon: '⚡', category: 'Mathematics', desc: 'Solve positive & negative integer operations at speed!' },
  { id: 'game_2', name: 'Fraction Challenge', icon: '🍕', category: 'Mathematics', desc: 'Match equivalent fractions and calculate sums!' },
  { id: 'game_3', name: 'Ratio Challenge', icon: '⚖️', category: 'Mathematics', desc: 'Balance recipes and scale proportional values!' },
  { id: 'game_4', name: 'Equation Solver', icon: '🎯', category: 'Mathematics', desc: 'Find the unknown x in single-step equations!' },
  { id: 'game_5', name: 'Grammar Master', icon: '🖋️', category: 'English', desc: 'Identify nouns, verbs, adverbs, and clauses!' },
  { id: 'game_6', name: 'Vocabulary Match', icon: '🧠', category: 'English', desc: 'Match synonyms, antonyms, and advanced terms!' },
  { id: 'game_7', name: 'Science Detective', icon: '🔍', category: 'General Science', desc: 'Identify mystery organisms and chemical reactions!' },
  { id: 'game_8', name: 'Cell Explorer', icon: '🔬', category: 'General Science', desc: 'Assign correct organelles to their vital cell functions!' },
  { id: 'game_9', name: 'Human Body Challenge', icon: '🫀', category: 'General Science', desc: 'Route organs to Digestive, Respiratory & Circulatory systems!' },
  { id: 'game_10', name: 'Solar System Explorer', icon: '🪐', category: 'General Science', desc: 'Order planetary orbits and match space trivia!' },
  { id: 'game_11', name: 'Pakistan Map Explorer', icon: '🗺️', category: 'Social Studies', desc: 'Test your knowledge on provincial geography and rivers!' },
  { id: 'game_12', name: 'Cyber & Tech Challenge', icon: '🛡️', category: 'Computer Science', desc: 'Classify hardware/software and spot phishing traps!' }
];

// -------------------------------------------------------------
// ACHIEVEMENTS / BADGES
// -------------------------------------------------------------
const BADGES = [
  { id: 'badge_first_lesson', title: 'First Lesson', icon: '🌱', desc: 'Completed your first Grade 6 lesson.' },
  { id: 'badge_first_quiz', title: 'First Quiz', icon: '🎯', desc: 'Attempted your first comprehensive quiz.' },
  { id: 'badge_first_revision', title: 'First Revision', icon: '🔁', desc: 'Reviewed smart revision notes.' },
  { id: 'badge_math_explorer', title: 'Math Explorer', icon: '🔢', desc: 'Solved 10+ Mathematics questions.' },
  { id: 'badge_sci_explorer', title: 'Science Explorer', icon: '🔬', desc: 'Explored cells and science diagrams.' },
  { id: 'badge_eng_master', title: 'English Master', icon: '📖', desc: 'Completed 5+ English grammar lessons.' },
  { id: 'badge_comp_explorer', title: 'Tech Explorer', icon: '💻', desc: 'Mastered computer hardware & cyber safety.' },
  { id: 'badge_history_explorer', title: 'Heritage Explorer', icon: '🌍', desc: 'Mastered Pakistan geography & heritage.' },
  { id: 'badge_100_q', title: 'Century Solver', icon: '💯', desc: 'Answered 100 practice questions.' },
  { id: 'badge_250_q', title: 'Quiz Master', icon: '🏆', desc: 'Answered 250 practice questions.' },
  { id: 'badge_500_q', title: 'Grandmaster', icon: '👑', desc: 'Answered 500 questions total.' },
  { id: 'badge_10_lessons', title: 'Dedication', icon: '📚', desc: 'Completed 10 comprehensive lessons.' },
  { id: 'badge_25_lessons', title: 'Scholar', icon: '🎓', desc: 'Completed 25 Grade 6 lessons.' },
  { id: 'badge_50_lessons', title: 'Valedictorian', icon: '🌟', desc: 'Completed 50 Grade 6 lessons.' },
  { id: 'badge_90_quiz', title: 'High Achiever', icon: '🔥', desc: 'Scored 90%+ on the Master Quiz.' },
  { id: 'badge_perfect_quiz', title: 'Flawless 100%', icon: '💎', desc: 'Scored a perfect 100% on the Master Quiz.' },
  { id: 'badge_7_streak', title: '7-Day Streak', icon: '⚡', desc: 'Maintained a 7-day study streak.' },
  { id: 'badge_30_streak', title: '30-Day Master', icon: '🚀', desc: 'Maintained a 30-day study streak.' }
];

// -------------------------------------------------------------
// INITIALIZATION & EVENT DISPATCH
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTheme();
  initNavigation();
  initCounters();
  renderSubjectsGrid();
  renderDailyPlan();
  renderReadingLibrary();
  renderEduNexarial('all');
  renderFlashcardUI();
  renderGamesGrid();
  renderBadges();
  renderParentReport();
  initSpeechSynthesis();
  initSearch();
  initCurriculumViewer('english');
  setupEventListeners();
});

// Theme Management (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem('studymate_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('studymate_theme', next);
  updateThemeButton(next);
  showToast(`Theme switched to ${next} mode`);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

// Navigation & Tab Switching
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        navigateToSection(targetId.substring(1));
        // Close mobile drawer if open
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.remove('open');
      }
    });
  });

  const mobileToggle = document.getElementById('mobile-menu-toggle-btn');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) drawer.classList.toggle('open');
    });
  }
}

function navigateToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update active class on nav
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${sectionId}`);
    });
  }
}

// Stats & Overview Counters
function initCounters() {
  updateOverviewCounters();
}

function updateOverviewCounters() {
  const totalLessons = 234;
  const compCount = AppState.completedLessons.length;
  const overallProg = Math.min(100, Math.round((compCount / totalLessons) * 100));

  const elProg = document.getElementById('stat-overall-progress');
  const elLessons = document.getElementById('stat-lessons-completed');
  const elQuestions = document.getElementById('stat-questions-solved');
  const elAvg = document.getElementById('stat-quiz-average');
  const elMat = document.getElementById('stat-materials-studied');
  const elStreak = document.getElementById('stat-learning-streak');
  const elHeaderStreak = document.getElementById('header-streak-num');
  const elHeaderXP = document.getElementById('header-xp-num');

  if (elProg) elProg.innerText = `${overallProg}%`;
  if (elLessons) elLessons.innerText = compCount;
  if (elQuestions) elQuestions.innerText = AppState.questionsSolved;
  
  const avg = AppState.quizScores.length > 0 
    ? Math.round(AppState.quizScores.reduce((a, b) => a + b, 0) / AppState.quizScores.length)
    : 0;
  if (elAvg) elAvg.innerText = `${avg}%`;
  if (elMat) elMat.innerText = AppState.studiedMaterials.length;
  if (elStreak) elStreak.innerText = `${AppState.streak} Days`;
  if (elHeaderStreak) elHeaderStreak.innerText = AppState.streak;
  if (elHeaderXP) elHeaderXP.innerText = `${AppState.xp} XP`;
}

// -------------------------------------------------------------
// SUBJECT CARDS RENDERING
// -------------------------------------------------------------
function renderSubjectsGrid() {
  const grid = document.getElementById('subjects-grid');
  if (!grid) return;

  grid.innerHTML = SUBJECTS.map(s => {
    // calculate completed lessons in this subject
    let subjectLessonsCount = 0;
    s.chapters.forEach(ch => { subjectLessonsCount += ch.lessons.length; });
    const completedInSubject = s.chapters.reduce((acc, ch) => {
      return acc + ch.lessons.filter(l => AppState.completedLessons.includes(l.id)).length;
    }, 0);
    const pct = subjectLessonsCount > 0 ? Math.round((completedInSubject / subjectLessonsCount) * 100) : 0;

    return `
      <div class="subject-card" id="subject-card-${s.id}">
        <div class="subject-card-top">
          <div class="subject-icon-box" style="background: ${s.color}15; color: ${s.color};">
            ${s.icon}
          </div>
          <span class="badge ${s.badgeColor}">${s.chaptersCount} Chapters</span>
        </div>
        <div>
          <h3 class="subject-title">${s.name}</h3>
          <p class="subject-desc">${s.desc}</p>
        </div>
        <div>
          <div class="subject-stats-bar">
            <span>Progress</span>
            <span>${pct}% (${completedInSubject}/${subjectLessonsCount})</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width: ${pct}%; background: ${s.color};"></div>
          </div>
          <div class="subject-actions">
            <button class="btn btn-primary btn-sm" onclick="openSubjectCurriculum('${s.id}')">📖 Study</button>
            <button class="btn btn-secondary btn-sm" onclick="openSubjectPractice('${s.id}')">📝 Practice</button>
            <button class="btn btn-secondary btn-sm" onclick="openSubjectRevision('${s.id}')">⚡ Revision</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// CHAPTER SYSTEM & INTERACTIVE LESSON VIEWER
// -------------------------------------------------------------
let currentSubjectId = 'english';
let currentLessonId = 'eng_1';

function initCurriculumViewer(subjectId) {
  currentSubjectId = subjectId;
  const select = document.getElementById('curriculum-subject-select');
  if (select) {
    select.value = subjectId;
  }
  renderCurriculumSidebar();
  // Open first lesson if available
  const sub = SUBJECTS.find(s => s.id === subjectId);
  if (sub && sub.chapters.length > 0 && sub.chapters[0].lessons.length > 0) {
    openLesson(sub.chapters[0].lessons[0].id);
  }
}

function onSubjectSelectChange(val) {
  initCurriculumViewer(val);
}

function renderCurriculumSidebar() {
  const treeContainer = document.getElementById('chapter-tree-container');
  if (!treeContainer) return;

  const sub = SUBJECTS.find(s => s.id === currentSubjectId);
  if (!sub) return;

  treeContainer.innerHTML = sub.chapters.map((ch, idx) => `
    <div class="chapter-accordion-item">
      <button class="chapter-accordion-header" onclick="toggleAccordion('ch-acc-${ch.id}')">
        <span>${ch.title}</span>
        <span id="ch-acc-icon-${ch.id}">▾</span>
      </button>
      <div class="chapter-lesson-list" id="ch-acc-${ch.id}">
        ${ch.lessons.map(l => {
          const isComp = AppState.completedLessons.includes(l.id);
          const isAct = l.id === currentLessonId;
          return `
            <button class="chapter-lesson-btn ${isAct ? 'active' : ''} ${isComp ? 'completed' : ''}" onclick="openLesson('${l.id}')">
              <span>${l.title}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function toggleAccordion(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
  }
}

function openLesson(lessonId) {
  currentLessonId = lessonId;
  renderCurriculumSidebar();

  // Find lesson data
  let targetSubject = null;
  let targetChapter = null;
  let targetLesson = null;

  for (const s of SUBJECTS) {
    for (const ch of s.chapters) {
      const l = ch.lessons.find(item => item.id === lessonId);
      if (l) {
        targetSubject = s;
        targetChapter = ch;
        targetLesson = l;
        break;
      }
    }
    if (targetLesson) break;
  }

  if (!targetLesson) return;

  const viewer = document.getElementById('lesson-viewer-body');
  if (!viewer) return;

  const isCompleted = AppState.completedLessons.includes(targetLesson.id);
  const isUrdu = targetSubject.id === 'urdu';
  const isSindhi = targetSubject.id === 'sindhi';

  viewer.innerHTML = `
    <div class="lesson-breadcrumbs">
      <span>${targetSubject.name}</span> &gt;
      <span>${targetChapter.title}</span> &gt;
      <span>${targetLesson.title}</span>
    </div>

    <div class="lesson-header-box">
      <div>
        <h2 class="lesson-header-title ${isUrdu ? 'urdu-text' : isSindhi ? 'sindhi-text' : ''}">${targetLesson.title}</h2>
        <div class="lesson-objective-box">
          <strong>🎯 Learning Objective:</strong> ${targetLesson.obj}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="speakText('${targetLesson.title}. ${targetLesson.content.replace(/'/g, "\\'")}')">
        🔊 Read Aloud
      </button>
    </div>

    <div class="lesson-section">
      <h3 class="lesson-section-heading">📖 Detailed Academic Notes</h3>
      <div class="lesson-text ${isUrdu ? 'urdu-text' : isSindhi ? 'sindhi-text' : ''}">
        ${targetLesson.content.replace(/\n/g, '<br><br>')}
      </div>
    </div>

    ${targetLesson.example ? `
      <div class="worked-example-box">
        <h4>💡 Worked Example / Context:</h4>
        <p style="margin-top: 0.35rem; font-weight: 500;">${targetLesson.example}</p>
      </div>
    ` : ''}

    ${targetLesson.terms && targetLesson.terms.length > 0 ? `
      <div class="lesson-section">
        <h3 class="lesson-section-heading">📌 Key Terms & Vocabulary</h3>
        <div class="key-terms-grid">
          ${targetLesson.terms.map(t => `
            <div class="key-term-card">
              <div class="key-term-name">${t.name}</div>
              <div class="key-term-desc">${t.def}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Quick Mini Quiz -->
    ${targetLesson.quiz ? `
      <div class="lesson-quiz-box">
        <h3 class="lesson-section-heading">⚡ Concept Check Mini-Quiz</h3>
        <p class="mini-quiz-question">${targetLesson.quiz.q}</p>
        <div class="mini-quiz-options">
          ${targetLesson.quiz.options.map((opt, idx) => `
            <button class="mini-quiz-opt-btn" onclick="checkLessonMiniQuiz(this, ${idx}, ${targetLesson.quiz.correct}, '${targetLesson.quiz.exp.replace(/'/g, "\\'")}')">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div id="lesson-quiz-feedback" style="margin-top: 1rem; display: none; font-weight: 600;"></div>
      </div>
    ` : ''}

    <!-- Lesson Footer -->
    <div class="lesson-nav-footer">
      <button class="btn ${isCompleted ? 'btn-emerald' : 'btn-primary'}" onclick="markLessonComplete('${targetLesson.id}')">
        ${isCompleted ? '✓ Lesson Completed (+25 XP)' : 'Mark Lesson Complete (+25 XP)'}
      </button>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="navigateLesson(-1)">← Previous</button>
        <button class="btn btn-primary btn-sm" onclick="navigateLesson(1)">Next Lesson →</button>
      </div>
    </div>
  `;
}

function checkLessonMiniQuiz(btn, selectedIdx, correctIdx, exp) {
  const parent = btn.parentElement;
  const buttons = parent.querySelectorAll('.mini-quiz-opt-btn');
  buttons.forEach(b => b.disabled = true);

  const fb = document.getElementById('lesson-quiz-feedback');
  if (selectedIdx === correctIdx) {
    btn.classList.add('correct');
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = 'var(--accent-emerald)';
      fb.innerHTML = `🎉 Correct! ${exp}`;
    }
    addXP(10, 'Mini Quiz Correct');
    triggerConfetti();
  } else {
    btn.classList.add('wrong');
    buttons[correctIdx].classList.add('correct');
    if (fb) {
      fb.style.display = 'block';
      fb.style.color = 'var(--accent-rose)';
      fb.innerHTML = `Incorrect. ${exp}`;
    }
  }
}

function markLessonComplete(lessonId) {
  if (!AppState.completedLessons.includes(lessonId)) {
    AppState.completedLessons.push(lessonId);
    addXP(25, 'Lesson Completed');
    triggerConfetti();
    showToast('🎉 Lesson Marked as Completed! +25 XP');
    saveState();
    openLesson(lessonId);
    renderSubjectsGrid();
  } else {
    showToast('You have already completed this lesson!');
  }
}

function navigateLesson(direction) {
  const sub = SUBJECTS.find(s => s.id === currentSubjectId);
  if (!sub) return;

  const allLessons = [];
  sub.chapters.forEach(ch => {
    ch.lessons.forEach(l => allLessons.push(l.id));
  });

  const curIdx = allLessons.indexOf(currentLessonId);
  if (curIdx === -1) return;

  const nextIdx = curIdx + direction;
  if (nextIdx >= 0 && nextIdx < allLessons.length) {
    openLesson(allLessons[nextIdx]);
  } else {
    showToast(direction > 0 ? 'You reached the last lesson in this subject!' : 'This is the first lesson!');
  }
}

function openSubjectCurriculum(subId) {
  initCurriculumViewer(subId);
  navigateToSection('chapters-section');
}

function openSubjectPractice(subId) {
  navigateToSection('practice-section');
  startPractice(subId);
}

function openSubjectRevision(subId) {
  navigateToSection('revision-section');
}

// -------------------------------------------------------------
// ENGLISH READING LIBRARY MODAL & RENDERING
// -------------------------------------------------------------
function renderReadingLibrary() {
  const grid = document.getElementById('reading-library-grid');
  if (!grid) return;

  grid.innerHTML = READING_LIBRARY.map((item, idx) => `
    <div class="passage-card">
      <div>
        <div class="passage-header">
          <div class="passage-number">${idx + 1}</div>
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800;">${item.title}</h4>
            <span style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700;">${item.genre}</span>
          </div>
        </div>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 1rem;">
          "${item.excerpt}"
        </p>
      </div>
      <button class="btn btn-accent btn-sm" onclick="openReadingModal('${item.id}')">
        📖 Read Passage & Quiz
      </button>
    </div>
  `).join('');
}

function openReadingModal(libId) {
  const item = READING_LIBRARY.find(p => p.id === libId);
  if (!item) return;

  const modal = document.getElementById('app-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="reading-modal-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <div>
          <span class="badge badge-purple">${item.genre}</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.35rem;">${item.title}</h2>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="speakText('${item.title}. ${item.fullText.replace(/'/g, "\\'")}')">
          🔊 Read Aloud
        </button>
      </div>

      <div class="passage-body-text">
        ${item.fullText.replace(/\n\n/g, '<br><br>')}
      </div>

      <div style="margin: 1.5rem 0;">
        <h4 style="font-weight: 700; margin-bottom: 0.5rem;">📚 Vocabulary in Context:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${item.vocab.map(v => `
            <div style="background: var(--bg-card); padding: 0.6rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <strong style="color: var(--primary-600);">${v.word}:</strong> ${v.meaning}
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 1.5rem;">
        <h4 style="font-weight: 700; margin-bottom: 0.75rem;">📝 Comprehension Check:</h4>
        ${item.questions.map((q, qIdx) => `
          <div style="background: var(--bg-card-subtle); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
            <p style="font-weight: 700; margin-bottom: 0.5rem;">Q${qIdx + 1}: ${q.q}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              ${q.options.map((opt, oIdx) => `
                <button class="mini-quiz-opt-btn" onclick="checkReadingQuiz(this, ${oIdx}, ${q.correct})">
                  ${opt}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function checkReadingQuiz(btn, selected, correct) {
  const p = btn.parentElement;
  p.querySelectorAll('button').forEach(b => b.disabled = true);
  if (selected === correct) {
    btn.classList.add('correct');
    addXP(15, 'Reading Comprehension Correct');
    showToast('🎉 Excellent! Comprehension question correct.');
    triggerConfetti();
  } else {
    btn.classList.add('wrong');
    p.children[correct].classList.add('correct');
  }
}

function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) modal.classList.remove('open');
}

// -------------------------------------------------------------
// STUDY MATERIAL CENTER
// -------------------------------------------------------------
function renderEduNexarial(filter) {
  const grid = document.getElementById('study-material-grid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? STUDY_MATERIALS 
    : STUDY_MATERIALS.filter(m => m.subject.toLowerCase().includes(filter.toLowerCase()) || m.category.includes(filter));

  grid.innerHTML = filtered.map(m => {
    const isStudied = AppState.studiedMaterials.includes(m.id);
    return `
      <div class="subject-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge badge-blue">${m.category}</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${m.subject}</span>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">${m.topic}</h3>
        <div style="background: var(--bg-card-subtle); padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; max-height: 180px; overflow-y: auto;">
          ${m.content.replace(/\n/g, '<br>')}
        </div>
        ${m.keyPoints ? `<p style="font-size: 0.85rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.75rem;">💡 ${m.keyPoints}</p>` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn ${isStudied ? 'btn-emerald' : 'btn-secondary'} btn-sm" onclick="markMaterialStudied('${m.id}')">
            ${isStudied ? '✓ Studied' : 'Mark as Studied'}
          </button>
          <button class="btn btn-secondary btn-sm" onclick="speakText('${m.topic}. ${m.content.replace(/'/g, "\\'")}')">🔊 Read</button>
        </div>
      </div>
    `;
  }).join('');
}

function filterEduNexarial(cat) {
  document.querySelectorAll('.study-tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderEduNexarial(cat);
}

function markMaterialStudied(matId) {
  if (!AppState.studiedMaterials.includes(matId)) {
    AppState.studiedMaterials.push(matId);
    addXP(15, 'Study Material Studied');
    showToast('📘 Marked as Studied! +15 XP');
    saveState();
    renderEduNexarial('all');
  }
}

// -------------------------------------------------------------
// SCIENCE & MATH VISUAL LABS
// -------------------------------------------------------------
function switchLabTab(labId) {
  document.querySelectorAll('.lab-tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  const container = document.getElementById('interactive-lab-body');
  if (!container) return;

  if (labId === 'cell') {
    container.innerHTML = `
      <div style="text-align: center;">
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Cell Explorer (Plant vs Animal Cell)</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Click on organelles to reveal their microscopic structure and biochemical roles.</p>
        <div class="interactive-svg-wrap">
          <svg viewBox="0 0 500 300" style="width: 100%; border-radius: 12px; background: #0f172a;">
            <!-- Outer membrane -->
            <ellipse cx="250" cy="150" rx="200" ry="110" fill="#1e293b" stroke="#3b82f6" stroke-width="4" />
            <!-- Nucleus -->
            <circle cx="250" cy="150" r="45" fill="#7c3aed" stroke="#c084fc" stroke-width="3" style="cursor:pointer;" onclick="showLabOrganelle('Nucleus', 'Controls all cellular activities and harbors genetic DNA information.')">
              <title>Nucleus</title>
            </circle>
            <text x="250" y="155" fill="white" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">Nucleus</text>
            <!-- Mitochondria -->
            <ellipse cx="150" cy="120" rx="25" ry="14" fill="#ef4444" stroke="#fca5a5" stroke-width="2" style="cursor:pointer;" onclick="showLabOrganelle('Mitochondria', 'The power generator of the cell; produces ATP energy.')" />
            <text x="150" y="124" fill="white" font-size="9" text-anchor="middle" pointer-events="none">Mito</text>
            <!-- Chloroplast / Vacuole -->
            <ellipse cx="340" cy="130" rx="35" ry="20" fill="#10b981" stroke="#6ee7b7" stroke-width="2" style="cursor:pointer;" onclick="showLabOrganelle('Chloroplast', 'Absorbs sunlight to produce glucose through photosynthesis.')" />
            <text x="340" y="134" fill="white" font-size="10" text-anchor="middle" pointer-events="none">Chloroplast</text>
            <!-- Ribosomes -->
            <circle cx="200" cy="200" r="6" fill="#fbbf24" style="cursor:pointer;" onclick="showLabOrganelle('Ribosome', 'Site of biological protein synthesis.')" />
            <circle cx="280" cy="210" r="6" fill="#fbbf24" style="cursor:pointer;" onclick="showLabOrganelle('Ribosome', 'Site of biological protein synthesis.')" />
          </svg>
        </div>
        <div id="lab-organelle-info" class="lab-info-panel">
          👉 <strong>Interactive Tip:</strong> Click any organelle (Nucleus, Mitochondria, Chloroplast, Ribosome) on the SVG diagram above.
        </div>
      </div>
    `;
  } else if (labId === 'digestive') {
    container.innerHTML = `
      <div style="text-align: center;">
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Human Digestive System Simulator</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Trace the journey of nutrients from Mouth to Stomach and Intestines.</p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="showLabOrganelle('Mouth & Saliva', 'Teeth mechanically grind food; salivary amylase begins starch digestion.')">1. Mouth</button>
          <button class="btn btn-secondary" onclick="showLabOrganelle('Esophagus', 'Peristaltic muscular contractions push food bolus down to stomach.')">2. Esophagus</button>
          <button class="btn btn-secondary" onclick="showLabOrganelle('Stomach', 'Gastric acid (HCl) and pepsin enzyme churn and break down proteins.')">3. Stomach</button>
          <button class="btn btn-secondary" onclick="showLabOrganelle('Small Intestine', 'Bile and pancreatic enzymes complete digestion; villi absorb nutrients.')">4. Small Intestine</button>
          <button class="btn btn-secondary" onclick="showLabOrganelle('Large Intestine', 'Reabsorbs water and electrolytes, forming solid waste.')">5. Large Intestine</button>
        </div>
        <div id="lab-organelle-info" class="lab-info-panel" style="margin-top: 2rem;">
          Click any organ stage to see its physiological role.
        </div>
      </div>
    `;
  } else if (labId === 'numberline') {
    container.innerHTML = `
      <div style="text-align: center;">
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Integer Number Line Explorer</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Visualize positive and negative jumps on the number line.</p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <label>Start: <input type="number" id="numline-start" value="0" style="width: 60px; padding: 0.3rem; text-align: center;"></label>
          <label>Operation: 
            <select id="numline-op" style="padding: 0.3rem;">
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </label>
          <label>Jump: <input type="number" id="numline-jump" value="5" style="width: 60px; padding: 0.3rem; text-align: center;"></label>
          <button class="btn btn-primary btn-sm" onclick="calculateNumberLine()">Calculate Jump</button>
        </div>
        <div id="numline-result-display" style="font-size: 1.5rem; font-weight: 800; color: var(--primary-600); margin-top: 1rem;">
          Result: 0 + 5 = 5
        </div>
      </div>
    `;
  } else if (labId === 'fractions') {
    container.innerHTML = `
      <div style="text-align: center;">
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Interactive Fraction Pizza Visualizer</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Select fraction slices to see visual proportion and decimal equivalents.</p>
        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem;">
          <button class="btn btn-secondary" onclick="showFractionVisual(1, 2)">1/2 (50%)</button>
          <button class="btn btn-secondary" onclick="showFractionVisual(3, 4)">3/4 (75%)</button>
          <button class="btn btn-secondary" onclick="showFractionVisual(2, 5)">2/5 (40%)</button>
          <button class="btn btn-secondary" onclick="showFractionVisual(5, 8)">5/8 (62.5%)</button>
        </div>
        <div id="fraction-visual-display" style="font-size: 1.3rem; font-weight: 700; color: var(--accent-emerald);">
          Visual: 1/2 = 0.5 = 50%
        </div>
      </div>
    `;
  }
}

function showLabOrganelle(title, desc) {
  const info = document.getElementById('lab-organelle-info');
  if (info) {
    info.innerHTML = `<h4 style="color: var(--primary-600); margin-bottom: 0.25rem;">🔬 ${title}</h4><p>${desc}</p>`;
  }
}

function calculateNumberLine() {
  const start = parseInt(document.getElementById('numline-start').value) || 0;
  const op = document.getElementById('numline-op').value;
  const jump = parseInt(document.getElementById('numline-jump').value) || 0;
  const res = op === '+' ? start + jump : start - jump;
  const disp = document.getElementById('numline-result-display');
  if (disp) {
    disp.innerHTML = `Result: ${start} ${op} ${jump} = <span style="color: var(--accent-purple);">${res}</span>`;
  }
}

function showFractionVisual(num, den) {
  const pct = ((num / den) * 100).toFixed(1);
  const dec = (num / den).toFixed(3);
  const disp = document.getElementById('fraction-visual-display');
  if (disp) {
    disp.innerHTML = `Fraction: <strong style="font-size: 1.8rem;">${num}/${den}</strong> | Decimal: <strong>${dec}</strong> | Percentage: <strong>${pct}%</strong>`;
  }
}

// -------------------------------------------------------------
// LEARNING GAME CENTER (12 GAMES ENGINE)
// -------------------------------------------------------------
function renderGamesGrid() {
  const grid = document.getElementById('games-grid');
  if (!grid) return;

  grid.innerHTML = GAMES_DATA.map(g => `
    <div class="game-card">
      <div>
        <div class="game-card-icon" style="background: var(--primary-50); color: var(--primary-600);">
          ${g.icon}
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.35rem;">${g.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">${g.desc}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="game-score-badge">⭐ 3 Stars</span>
        <button class="btn btn-primary btn-sm" onclick="launchGame('${g.id}')">🎮 Play Now</button>
      </div>
    </div>
  `).join('');
}

let activeGameInterval = null;
let activeGameScore = 0;
let activeGameQuestionsCount = 0;

function launchGame(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const modal = document.getElementById('app-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  activeGameScore = 0;
  activeGameQuestionsCount = 0;

  modal.classList.add('open');
  loadNextGameRound(game, container);
}

function loadNextGameRound(game, container) {
  if (activeGameQuestionsCount >= 5) {
    // Game completed summary
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Game Completed!</h2>
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.5rem;">
          You scored <strong>${activeGameScore} / 5</strong> in ${game.name}!
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <button class="btn btn-primary" onclick="launchGame('${game.id}')">🔄 Play Again</button>
          <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
    addXP(activeGameScore * 10, `${game.name} Finished`);
    triggerConfetti();
    return;
  }

  activeGameQuestionsCount++;
  let promptText = '';
  let choices = [];
  let correctChoiceIdx = 0;

  if (game.id === 'game_1') { // Integer Challenge
    const n1 = Math.floor(Math.random() * 20) - 10;
    const n2 = Math.floor(Math.random() * 20) - 10;
    const ans = n1 + n2;
    promptText = `${n1} + (${n2}) = ?`;
    choices = [ans, ans + 2, ans - 3, ans + 5].sort(() => Math.random() - 0.5);
    correctChoiceIdx = choices.indexOf(ans);
  } else if (game.id === 'game_4') { // Equation Solver
    const x = Math.floor(Math.random() * 12) + 1;
    const a = Math.floor(Math.random() * 10) + 1;
    const b = x + a;
    promptText = `Solve: x + ${a} = ${b}`;
    choices = [x, x + 2, x - 1, x + 4].sort(() => Math.random() - 0.5);
    correctChoiceIdx = choices.indexOf(x);
  } else {
    // General subject question
    const qObj = MASTER_QUIZ_QUESTIONS[Math.floor(Math.random() * MASTER_QUIZ_QUESTIONS.length)];
    promptText = qObj.q;
    choices = qObj.options;
    correctChoiceIdx = qObj.correct;
  }

  container.innerHTML = `
    <div class="game-active-arena">
      <div class="game-top-hud">
        <div>
          <span class="badge badge-purple">${game.name}</span>
          <span style="margin-left: 0.5rem; font-weight: 700;">Round ${activeGameQuestionsCount} / 5</span>
        </div>
        <div style="font-weight: 800; color: var(--accent-yellow); font-size: 1.1rem;">
          ⭐ Score: ${activeGameScore}
        </div>
      </div>

      <div class="game-board">
        <div class="game-prompt-large">${promptText}</div>
        <div class="game-choices-grid">
          ${choices.map((c, idx) => `
            <button class="game-choice-btn" onclick="handleGameAnswer(this, ${idx}, ${correctChoiceIdx}, '${game.id}')">
              ${c}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function handleGameAnswer(btn, selected, correct, gameId) {
  const parent = btn.parentElement;
  parent.querySelectorAll('button').forEach(b => b.disabled = true);

  const game = GAMES_DATA.find(g => g.id === gameId);
  const container = document.getElementById('modal-dynamic-content');

  if (selected === correct) {
    btn.style.background = 'var(--accent-emerald)';
    btn.style.color = 'white';
    activeGameScore++;
    showToast('✨ Correct Answer!');
  } else {
    btn.style.background = 'var(--accent-rose)';
    btn.style.color = 'white';
    parent.children[correct].style.background = 'var(--accent-emerald)';
    parent.children[correct].style.color = 'white';
  }

  setTimeout(() => {
    loadNextGameRound(game, container);
  }, 1200);
}

// -------------------------------------------------------------
// MASTER GRADE 6 QUIZ (60 QUESTIONS ENGINE)
// -------------------------------------------------------------
let quizState = {
  active: false,
  currentIdx: 0,
  userAnswers: {},
  timerSeconds: 45 * 60,
  timerInterval: null
};

function startMasterQuiz() {
  quizState.active = true;
  quizState.currentIdx = 0;
  quizState.userAnswers = {};
  quizState.timerSeconds = 45 * 60;

  const runner = document.getElementById('quiz-runner-container');
  const launcher = document.getElementById('quiz-launcher-card');
  if (runner) runner.style.display = 'block';
  if (launcher) launcher.style.display = 'none';

  clearInterval(quizState.timerInterval);
  quizState.timerInterval = setInterval(() => {
    if (quizState.timerSeconds > 0) {
      quizState.timerSeconds--;
      updateQuizTimerDisplay();
    } else {
      submitMasterQuiz();
    }
  }, 1000);

  renderQuizQuestion();
  renderQuizPalette();
  navigateToSection('quiz-section');
}

function updateQuizTimerDisplay() {
  const timerEl = document.getElementById('quiz-timer-text');
  if (!timerEl) return;
  const mins = Math.floor(quizState.timerSeconds / 60);
  const secs = quizState.timerSeconds % 60;
  timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function renderQuizPalette() {
  const pal = document.getElementById('quiz-palette-container');
  if (!pal) return;

  pal.innerHTML = MASTER_QUIZ_QUESTIONS.map((q, idx) => {
    const isAns = quizState.userAnswers[idx] !== undefined;
    const isCur = quizState.currentIdx === idx;
    return `
      <button class="quiz-palette-btn ${isCur ? 'current' : ''} ${isAns ? 'answered' : ''}" onclick="jumpToQuizQuestion(${idx})">
        ${idx + 1}
      </button>
    `;
  }).join('');
}

function renderQuizQuestion() {
  const q = MASTER_QUIZ_QUESTIONS[quizState.currentIdx];
  if (!q) return;

  const qNum = document.getElementById('quiz-question-number');
  const qSubject = document.getElementById('quiz-subject-tag');
  const qText = document.getElementById('quiz-question-text');
  const qOptions = document.getElementById('quiz-options-container');

  if (qNum) qNum.innerText = `Question ${quizState.currentIdx + 1} of ${MASTER_QUIZ_QUESTIONS.length}`;
  if (qSubject) qSubject.innerText = q.subject;
  if (qText) qText.innerText = q.q;

  if (qOptions) {
    qOptions.innerHTML = q.options.map((opt, oIdx) => {
      const isSelected = quizState.userAnswers[quizState.currentIdx] === oIdx;
      return `
        <button class="mini-quiz-opt-btn ${isSelected ? 'active' : ''}" style="${isSelected ? 'background: var(--primary-100); border-color: var(--primary-600);' : ''}" onclick="selectQuizAnswer(${oIdx})">
          <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}
        </button>
      `;
    }).join('');
  }

  renderQuizPalette();
}

function selectQuizAnswer(optIdx) {
  quizState.userAnswers[quizState.currentIdx] = optIdx;
  renderQuizQuestion();
}

function jumpToQuizQuestion(idx) {
  quizState.currentIdx = idx;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (quizState.currentIdx < MASTER_QUIZ_QUESTIONS.length - 1) {
    quizState.currentIdx++;
    renderQuizQuestion();
  }
}

function prevQuizQuestion() {
  if (quizState.currentIdx > 0) {
    quizState.currentIdx--;
    renderQuizQuestion();
  }
}

function submitMasterQuiz() {
  clearInterval(quizState.timerInterval);

  let correctCount = 0;
  const subjectScores = {};

  MASTER_QUIZ_QUESTIONS.forEach((q, idx) => {
    if (!subjectScores[q.subject]) {
      subjectScores[q.subject] = { total: 0, correct: 0 };
    }
    subjectScores[q.subject].total++;

    if (quizState.userAnswers[idx] === q.correct) {
      correctCount++;
      subjectScores[q.subject].correct++;
    }
  });

  const percentage = Math.round((correctCount / MASTER_QUIZ_QUESTIONS.length) * 100);

  // Update State
  AppState.quizAttempts++;
  AppState.quizScores.push(percentage);
  AppState.questionsSolved += MASTER_QUIZ_QUESTIONS.length;
  AppState.correctQuestions += correctCount;

  if (percentage >= 90 && !AppState.unlockedBadges.includes('badge_90_quiz')) {
    AppState.unlockedBadges.push('badge_90_quiz');
  }
  if (percentage === 100 && !AppState.unlockedBadges.includes('badge_perfect_quiz')) {
    AppState.unlockedBadges.push('badge_perfect_quiz');
  }

  addXP(percentage * 2, 'Master Quiz Completed');
  saveState();
  triggerConfetti();

  // Render Result Screen
  const runner = document.getElementById('quiz-runner-container');
  if (runner) {
    runner.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem;">Quiz Result Report</h2>
        <div style="font-size: 3rem; font-weight: 800; color: var(--primary-600); margin-bottom: 0.5rem;">
          ${percentage}%
        </div>
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">
          You answered <strong>${correctCount}</strong> out of <strong>${MASTER_QUIZ_QUESTIONS.length}</strong> questions correctly!
        </p>

        <div style="text-align: left; background: var(--bg-card-subtle); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">📊 Subject-Wise Performance</h3>
          ${Object.keys(subjectScores).map(sub => {
            const sc = subjectScores[sub];
            const subPct = Math.round((sc.correct / sc.total) * 100);
            return `
              <div style="margin-bottom: 0.85rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem;">
                  <span>${sub}</span>
                  <span>${subPct}% (${sc.correct}/${sc.total})</span>
                </div>
                <div class="progress-bar-wrap">
                  <div class="progress-bar-fill" style="width: ${subPct}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="startMasterQuiz()">🔄 Retake Quiz</button>
          <button class="btn btn-secondary" onclick="navigateToSection('parent-section')">📈 View Parent Dashboard</button>
        </div>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// PRACTICE CENTER ENGINE
// -------------------------------------------------------------
let practiceQuestions = [];
let currentPracticeIdx = 0;

function startPractice(subjectFilter) {
  if (subjectFilter === 'all') {
    practiceQuestions = [...MASTER_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
  } else {
    practiceQuestions = MASTER_QUIZ_QUESTIONS.filter(q => q.subject.toLowerCase().includes(subjectFilter.toLowerCase()));
    if (practiceQuestions.length === 0) practiceQuestions = MASTER_QUIZ_QUESTIONS.slice(0, 10);
  }

  currentPracticeIdx = 0;
  renderPracticeCard();
}

function renderPracticeCard() {
  const container = document.getElementById('practice-question-card');
  if (!container) return;

  const q = practiceQuestions[currentPracticeIdx];
  if (!q) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span class="badge badge-teal">${q.subject}</span>
      <span style="font-weight: 700; color: var(--text-muted);">Question ${currentPracticeIdx + 1} of ${practiceQuestions.length}</span>
    </div>
    <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem;">${q.q}</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem;">
      ${q.options.map((opt, idx) => `
        <button class="mini-quiz-opt-btn" onclick="checkPracticeAnswer(this, ${idx}, ${q.correct}, '${q.exp.replace(/'/g, "\\'")}')">
          ${opt}
        </button>
      `).join('')}
    </div>
    <div id="practice-feedback" style="display: none; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;"></div>
    <div style="display: flex; justify-content: flex-end;">
      <button class="btn btn-primary btn-sm" onclick="nextPracticeCard()">Next Question →</button>
    </div>
  `;
}

function checkPracticeAnswer(btn, selected, correct, exp) {
  const p = btn.parentElement;
  p.querySelectorAll('button').forEach(b => b.disabled = true);
  const fb = document.getElementById('practice-feedback');

  AppState.questionsSolved++;

  if (selected === correct) {
    btn.classList.add('correct');
    AppState.correctQuestions++;
    addXP(10, 'Practice Correct');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'var(--accent-emerald-light)';
      fb.style.color = '#065f46';
      fb.innerHTML = `🎉 <strong>Correct!</strong> ${exp}`;
    }
  } else {
    btn.classList.add('wrong');
    p.children[correct].classList.add('correct');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'var(--accent-rose-light)';
      fb.style.color = '#9f1239';
      fb.innerHTML = `❌ <strong>Incorrect.</strong> ${exp}`;
    }
  }
  saveState();
}

function nextPracticeCard() {
  if (currentPracticeIdx < practiceQuestions.length - 1) {
    currentPracticeIdx++;
    renderPracticeCard();
  } else {
    showToast('🎉 Practice session completed!');
    startPractice('all');
  }
}

// -------------------------------------------------------------
// FLASHCARDS SYSTEM
// -------------------------------------------------------------
let currentFlashcardIdx = 0;

function renderFlashcardUI() {
  const card = FLASHCARDS[currentFlashcardIdx];
  if (!card) return;

  const catEl = document.getElementById('flashcard-cat');
  const termEl = document.getElementById('flashcard-term-text');
  const ansEl = document.getElementById('flashcard-answer-text');
  const numEl = document.getElementById('flashcard-counter-text');

  if (catEl) catEl.innerText = card.subject;
  if (termEl) termEl.innerText = card.front;
  if (ansEl) ansEl.innerText = card.back;
  if (numEl) numEl.innerText = `${currentFlashcardIdx + 1} / ${FLASHCARDS.length}`;

  const inner = document.getElementById('flashcard-inner-box');
  if (inner) inner.classList.remove('flipped');
}

function flipFlashcard() {
  const inner = document.getElementById('flashcard-inner-box');
  if (inner) inner.classList.toggle('flipped');
}

function nextFlashcard() {
  currentFlashcardIdx = (currentFlashcardIdx + 1) % FLASHCARDS.length;
  renderFlashcardUI();
}

function prevFlashcard() {
  currentFlashcardIdx = (currentFlashcardIdx - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  renderFlashcardUI();
}

// -------------------------------------------------------------
// PARENT & TEACHER REPORT
// -------------------------------------------------------------
function renderParentReport() {
  const totalLessons = 234;
  const compCount = AppState.completedLessons.length;
  const overallProg = Math.min(100, Math.round((compCount / totalLessons) * 100));

  const pProg = document.getElementById('parent-overall-progress');
  const pLessons = document.getElementById('parent-lessons-count');
  const pQuestions = document.getElementById('parent-questions-count');
  const pQuizAvg = document.getElementById('parent-quiz-avg');
  const pStreak = document.getElementById('parent-streak-count');

  if (pProg) pProg.innerText = `${overallProg}%`;
  if (pLessons) pLessons.innerText = compCount;
  if (pQuestions) pQuestions.innerText = AppState.questionsSolved;
  
  const avg = AppState.quizScores.length > 0 
    ? Math.round(AppState.quizScores.reduce((a, b) => a + b, 0) / AppState.quizScores.length)
    : 0;
  if (pQuizAvg) pQuizAvg.innerText = `${avg}%`;
  if (pStreak) pStreak.innerText = `${AppState.streak} Days`;
}

// -------------------------------------------------------------
// DAILY PLAN & STREAK TRACKING
// -------------------------------------------------------------
function renderDailyPlan() {
  const container = document.getElementById('daily-plan-items');
  if (!container) return;

  const plans = [
    { key: 'eng', subject: 'English', duration: '25 min' },
    { key: 'math', subject: 'Mathematics', duration: '30 min' },
    { key: 'sci', subject: 'General Science', duration: '25 min' },
    { key: 'urdu_sindhi', subject: 'Urdu / Sindhi', duration: '20 min' },
    { key: 'comp_ss', subject: 'Computer & Social Studies', duration: '20 min' },
    { key: 'revision', subject: 'Smart Revision', duration: '15 min' },
    { key: 'challenge', subject: 'Daily Challenge', duration: '10 min' }
  ];

  container.innerHTML = plans.map(p => {
    const isDone = AppState.dailyPlan[p.key];
    return `
      <div class="plan-item ${isDone ? 'completed' : ''}">
        <div class="plan-left">
          <input type="checkbox" class="plan-checkbox" ${isDone ? 'checked' : ''} onchange="toggleDailyPlanItem('${p.key}')">
          <span class="plan-subject">${p.subject}</span>
        </div>
        <span class="plan-duration">${p.duration}</span>
      </div>
    `;
  }).join('');
}

function toggleDailyPlanItem(key) {
  AppState.dailyPlan[key] = !AppState.dailyPlan[key];
  if (AppState.dailyPlan[key]) {
    addXP(15, 'Daily Task Complete');
    showToast('✅ Daily study task completed!');
  }
  saveState();
  renderDailyPlan();
}

// -------------------------------------------------------------
// ACHIEVEMENTS & BADGES RENDERING
// -------------------------------------------------------------
function renderBadges() {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;

  grid.innerHTML = BADGES.map(b => {
    const isUnlocked = AppState.unlockedBadges.includes(b.id);
    return `
      <div class="badge-item-card ${isUnlocked ? '' : 'locked'}">
        <div class="badge-icon-lg">${b.icon}</div>
        <h4 style="font-size: 1rem; font-weight: 800;">${b.title}</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">${b.desc}</p>
        <span style="font-size: 0.75rem; font-weight: 700; color: ${isUnlocked ? 'var(--accent-emerald)' : 'var(--text-light)'};">
          ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
        </span>
      </div>
    `;
  }).join('');
}

function updateBadgesUI() {
  renderBadges();
}

function addXP(amount, reason) {
  AppState.xp += amount;
  // Calculate Level (100 XP per level)
  AppState.level = Math.floor(AppState.xp / 100) + 1;
  saveState();
}

// -------------------------------------------------------------
// SEARCH SYSTEM
// -------------------------------------------------------------
function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearchQuery(e.target.value);
    });
  }
}

function openSearchModal() {
  const modal = document.getElementById('app-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <div>
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem;">🔍 Search Grade 6 Curriculum</h3>
      <input type="text" id="modal-search-field" placeholder="Search lessons, formulas, definitions..." 
             style="width: 100%; padding: 0.85rem 1rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; margin-bottom: 1.5rem;"
             oninput="handleSearchQuery(this.value)">
      <div id="search-results-list" style="max-height: 360px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;">
        <p style="color: var(--text-muted); text-align: center; padding: 1.5rem;">Type above to search across Grade 6 topics...</p>
      </div>
    </div>
  `;

  modal.classList.add('open');
  setTimeout(() => {
    const f = document.getElementById('modal-search-field');
    if (f) f.focus();
  }, 100);
}

function handleSearchQuery(query) {
  const resultsContainer = document.getElementById('search-results-list');
  if (!resultsContainer) return;

  if (!query || query.trim().length < 2) {
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 1rem;">Type at least 2 letters...</p>`;
    return;
  }

  const qLower = query.toLowerCase().trim();
  const matchedLessons = [];

  SUBJECTS.forEach(s => {
    s.chapters.forEach(ch => {
      ch.lessons.forEach(l => {
        if (l.title.toLowerCase().includes(qLower) || l.content.toLowerCase().includes(qLower)) {
          matchedLessons.push({ ...l, subjectName: s.name, subjectId: s.id });
        }
      });
    });
  });

  if (matchedLessons.length === 0) {
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No lessons or notes found for "${query}".</p>`;
    return;
  }

  resultsContainer.innerHTML = matchedLessons.slice(0, 8).map(m => `
    <div style="padding: 0.75rem 1rem; background: var(--bg-card-subtle); border-radius: var(--radius-md); cursor: pointer;" onclick="jumpFromSearch('${m.subjectId}', '${m.id}')">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: var(--primary-600);">
        <span>${m.subjectName}</span>
      </div>
      <h4 style="font-size: 1rem; font-weight: 700; margin: 0.2rem 0;">${m.title}</h4>
      <p style="font-size: 0.85rem; color: var(--text-muted);">${m.obj}</p>
    </div>
  `).join('');
}

function jumpFromSearch(subId, lessonId) {
  closeModal();
  initCurriculumViewer(subId);
  openLesson(lessonId);
  navigateToSection('chapters-section');
}

// -------------------------------------------------------------
// SPEECH SYNTHESIS (READ ALOUD)
// -------------------------------------------------------------
let synth = null;

function initSpeechSynthesis() {
  if ('speechSynthesis' in window) {
    synth = window.speechSynthesis;
  }
}

function speakText(text) {
  if (!synth) {
    showToast('Speech synthesis not supported in this browser.');
    return;
  }
  synth.cancel(); // stop previous speech

  const cleanText = text.replace(/<[^>]*>?/gm, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  synth.speak(utterance);
  showToast('🔊 Playing Read Aloud audio...');
}

// -------------------------------------------------------------
// CONFETTI CELEBRATION
// -------------------------------------------------------------
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#2563eb', '#7c3aed', '#059669', '#ea580c', '#fbbf24', '#e11d48'];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.opacity -= 0.015;

      if (p.opacity > 0) {
        alive = true;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    frame++;
    if (alive && frame < 80) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// -------------------------------------------------------------
// TOAST NOTIFICATIONS
// -------------------------------------------------------------
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Event Listeners for UI Actions
function setupEventListeners() {
  // Modal backdrop click
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
