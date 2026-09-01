/**
 * EduNexa AI — English Subject Module Engine
 * Comprehensive Secondary & Senior Secondary English Curriculum
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // =========================================================================
  // 1. CURRICULUM DATABASE (20 Comprehensive Exam Topics)
  // =========================================================================
  const ENGLISH_TOPICS = [
    {
      id: 'tenses',
      title: 'Tenses & Time Aspects',
      category: 'grammar',
      difficulty: 'Intermediate',
      studyTime: '25 mins',
      xp: 50,
      summary: 'Master the 12 English tenses, timeline aspect structures, formulaic verb forms, and subtle time signal adverbs essential for board examinations.',
      objectives: [
        'Distinguish clearly between Simple Past and Present Perfect aspect.',
        'Apply the correct auxiliary verbs (have/has, had, will have) in complex timelines.',
        'Identify time signal words (since, for, already, yet, by the time) in board questions.',
        'Avoid common tense consistency errors in multi-clause sentences.'
      ],
      detailedNotes: `
        <h4>1. The 12-Tense Matrix Overview</h4>
        <p>In English, tense indicates <strong>when</strong> an action occurs (Past, Present, Future), while aspect describes <strong>how</strong> the action unfolds (Simple, Continuous, Perfect, Perfect Continuous).</p>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr>
                <th>Tense Aspect</th>
                <th>Present</th>
                <th>Past</th>
                <th>Future</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Simple</strong></td>
                <td>V1 / V1 + s/es (<em>writes</em>)</td>
                <td>V2 (<em>wrote</em>)</td>
                <td>will + V1 (<em>will write</em>)</td>
              </tr>
              <tr>
                <td><strong>Continuous</strong></td>
                <td>is/am/are + V-ing</td>
                <td>was/were + V-ing</td>
                <td>will be + V-ing</td>
              </tr>
              <tr>
                <td><strong>Perfect</strong></td>
                <td>has/have + V3</td>
                <td>had + V3</td>
                <td>will have + V3</td>
              </tr>
              <tr>
                <td><strong>Perf. Continuous</strong></td>
                <td>has/have been + V-ing</td>
                <td>had been + V-ing</td>
                <td>will have been + V-ing</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>2. The Past Perfect Trap (Board Exam Favorite)</h4>
        <p>Use the <strong>Past Perfect (had + V3)</strong> only when comparing TWO past actions to show which occurred first. The earlier action takes Past Perfect; the later action takes Past Simple.</p>
        <div class="formula-box">Rule: Earlier Past Action [had + V3] + BEFORE / WHEN + Later Past Action [V2]</div>
      `,
      rules: [
        {
          rule: 'Past Perfect with "By the time"',
          formula: 'By the time + Subject + V2 (Past Simple), Subject + had + V3 (Past Perfect)',
          tip: 'Exam Tip: Never use "had" for both clauses.'
        },
        {
          rule: 'Present Perfect vs Past Simple',
          formula: 'Specific past time word (yesterday, in 2021, ago) = Past Simple (V2). Unspecified connection to now (already, just, so far) = Present Perfect (has/have + V3).',
          tip: 'Do NOT say "I have visited London last year." Correct: "I visited London last year."'
        }
      ],
      examples: [
        {
          sentence: 'By the time the doctor arrived, the patient had regained consciousness.',
          explanation: 'Regaining consciousness happened FIRST (had regained), followed by the doctor arriving (arrived).',
          label: 'Past Perfect Timeline'
        },
        {
          sentence: 'The train has just departed the platform.',
          explanation: 'The action is completed in the immediate past with a direct result in the present.',
          label: 'Present Perfect Result'
        }
      ],
      mistakes: [
        {
          wrong: 'I am knowing him for five years.',
          correct: 'I have known him for five years.',
          why: '"Know" is a stative verb; it does not take continuous forms. Duration over time requires Present Perfect.'
        },
        {
          wrong: 'When I reached the station, the train left.',
          correct: 'When I reached the station, the train had left.',
          why: 'The train left before my arrival, requiring Past Perfect (had left).'
        }
      ],
      revision: [
        'Stative verbs (know, believe, understand, love, belong) are rarely used in continuous tenses.',
        '"Since" denotes a specific starting point (since Monday); "For" denotes a duration (for 3 days).',
        'In conditional type 1 sentences: If + Simple Present, Future Simple (If it rains, we will stay home).'
      ],
      flashcards: [
        { front: 'When do we use Past Perfect (had + V3)?', back: 'To indicate the EARLIER of two past actions.', category: 'Grammar Rule' },
        { front: 'Difference between "Since" and "For"?', back: '"Since" = Point in time (Since 2015). "For" = Duration/Period (For 5 years).', category: 'Time Signals' },
        { front: 'Can stative verbs (like "understand") be used in Present Continuous?', back: 'No. Say "I understand now", NOT "I am understanding now".', category: 'Stative Verbs' },
        { front: 'Future Perfect formula and keyword?', back: 'Formula: will have + V3. Keyword: "By tomorrow", "By next month".', category: 'Future Tense' }
      ],
      practiceDrills: [
        {
          instruction: 'Fill in the blank with the correct tense of the verb in brackets:',
          sentence: 'She _______ (live) in this city since 2018.',
          blank: 'has lived',
          answer: 'has lived',
          hint: 'Time marker "since 2018" with an ongoing state.',
          explanation: 'Present Perfect (has lived) is used for an action that started in the past and continues into the present.'
        },
        {
          instruction: 'Fill in the blank with the correct tense:',
          sentence: 'By next June, our team _______ (complete) the research project.',
          blank: 'will have completed',
          answer: 'will have completed',
          hint: 'Look for "By next June" (Future deadline).',
          explanation: 'Future Perfect (will have completed) expresses an action completed before a future deadline.'
        }
      ],
      mcqs: [
        {
          question: 'Identify the correct option: "Hardly had the teacher entered the classroom _______ the students stood up."',
          options: ['than', 'when', 'then', 'before'],
          answerIndex: 1,
          explanation: 'The correlative conjunction pair is "Hardly... when" or "Scarcely... when". ("No sooner" takes "than").',
          ruleRef: 'Inverted Correlative Tenses'
        },
        {
          question: 'Choose the grammatically sound sentence:',
          options: [
            'I have seen him yesterday at the library.',
            'I saw him yesterday at the library.',
            'I had seen him yesterday at the library.',
            'I was seeing him yesterday at the library.'
          ],
          answerIndex: 1,
          explanation: 'The specific past time adverb "yesterday" mandates Simple Past (V2 - saw), not Present Perfect.',
          ruleRef: 'Time Adverb Rule'
        },
        {
          question: 'Which tense is used in: "They will have been traveling for 12 hours by midnight"?',
          options: ['Future Continuous', 'Future Perfect', 'Future Perfect Continuous', 'Present Perfect Continuous'],
          answerIndex: 2,
          explanation: 'will have been + V-ing is the Future Perfect Continuous tense, representing continuous duration up to a future point.',
          ruleRef: 'Tense Aspect Matrix'
        }
      ]
    },
    {
      id: 'active-passive-voice',
      title: 'Active and Passive Voice',
      category: 'grammar',
      difficulty: 'Intermediate',
      studyTime: '30 mins',
      xp: 50,
      summary: 'Learn voice transformation formulas for all tenses, modal auxiliaries, imperative commands, interrogatives, and agent omissions.',
      objectives: [
        'Transform active assertions into passive structures with precision.',
        'Convert imperative commands (Order, Request, Advice) using "Let" and modal forms.',
        'Handle two-object verbs (Direct vs Indirect objects).',
        'Recognize when the agent (by + subject) must be omitted for formal registers.'
      ],
      detailedNotes: `
        <h4>1. The Universal Passive Rule</h4>
        <p>In passive voice, the <strong>object</strong> of the active sentence becomes the <strong>subject</strong>, followed by the appropriate form of <strong>be + V3 (Past Participle)</strong>.</p>
        <div class="formula-box">Active: Subject + Verb + Object<br>Passive: Object + appropriate form of 'BE' + V3 + (by Subject)</div>
        <h4>2. Imperative Sentence Conversions</h4>
        <ul class="notes-list">
          <li><strong>Command/Order:</strong> Let + Object + be + V3 (<em>"Shut the door" → "Let the door be shut"</em>).</li>
          <li><strong>Advice:</strong> Object + should be + V3 (<em>"Help the needy" → "The needy should be helped"</em>).</li>
          <li><strong>Request:</strong> You are requested to + V1 (<em>"Please wait here" → "You are requested to wait here"</em>).</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Modal Auxiliary Voice Transformation',
          formula: 'Active: Modal + V1 → Passive: Modal + be + V3',
          tip: 'Example: "You must submit the assignment" → "The assignment must be submitted."'
        },
        {
          rule: 'Interrogative "Who" Conversion',
          formula: 'Who + V2 + Object? → By whom + was/were + Object + V3?',
          tip: '"Who wrote Hamlet?" → "By whom was Hamlet written?"'
        }
      ],
      examples: [
        {
          sentence: 'The committee is reviewing the scholarship applications.',
          explanation: 'Passive: The scholarship applications are being reviewed by the committee.',
          label: 'Present Continuous Passive'
        },
        {
          sentence: 'Someone has stolen my bicycle.',
          explanation: 'Passive: My bicycle has been stolen. (Agent "by someone" is omitted as it is vague).',
          label: 'Omission of Agent'
        }
      ],
      mistakes: [
        {
          wrong: 'The bridge was built by two years ago.',
          correct: 'The bridge was built two years ago.',
          why: 'Do not insert "by" before time expressions unless indicating a deadline.'
        }
      ],
      revision: [
        'Intransitive verbs (verbs without an object, like sleep, arrive, occur) CANNOT be changed into passive voice.',
        'Continuous perfect tenses (Present/Past/Future Perfect Continuous) are rarely used in passive voice.'
      ],
      flashcards: [
        { front: 'Convert to Passive: "Who composed this symphony?"', back: '"By whom was this symphony composed?"', category: 'Interrogatives' },
        { front: 'Convert to Passive: "Post this letter immediately."', back: '"Let this letter be posted immediately."', category: 'Imperative' },
        { front: 'What is the passive form of "is cleaning"?', back: '"is being cleaned" (is/am/are + being + V3)', category: 'Continuous Voice' }
      ],
      practiceDrills: [
        {
          instruction: 'Convert to Passive Voice:',
          sentence: 'They had announced the board results before noon.',
          blank: 'The board results had been announced before noon',
          answer: 'The board results had been announced before noon',
          hint: 'Past perfect passive uses "had been + V3".',
          explanation: '"had announced" becomes "had been announced".'
        }
      ],
      mcqs: [
        {
          question: 'What is the correct passive form of: "The chef prepared an exquisite dessert"?',
          options: [
            'An exquisite dessert is prepared by the chef.',
            'An exquisite dessert was prepared by the chef.',
            'An exquisite dessert had been prepared by the chef.',
            'An exquisite dessert was being prepared by the chef.'
          ],
          answerIndex: 1,
          explanation: 'The original sentence is in Simple Past (prepared), so the passive requires was/were + V3 (was prepared).',
          ruleRef: 'Simple Past Passive'
        }
      ]
    },
    {
      id: 'direct-indirect-speech',
      title: 'Direct and Indirect Speech',
      category: 'grammar',
      difficulty: 'Intermediate',
      studyTime: '30 mins',
      xp: 50,
      summary: 'Comprehensive reported speech rules: backshifting tenses, pronoun shifts, time/place adverb conversions, and reporting questions and imperatives.',
      objectives: [
        'Master the mandatory backshift rules when the reporting verb is in the past tense.',
        'Transform interrogative questions (Wh- questions vs Yes/No questions with if/whether).',
        'Identify exceptions where tense does not change (Universal Truths, Habitual Facts).',
        'Accurately adjust temporal and spatial deictic markers (tomorrow → the next day).'
      ],
      detailedNotes: `
        <h4>1. Backshift of Tenses (When Reporting Verb is in Past: said/told)</h4>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr><th>Direct Speech</th><th>Indirect / Reported Speech</th></tr>
            </thead>
            <tbody>
              <tr><td>Simple Present (V1)</td><td>Simple Past (V2)</td></tr>
              <tr><td>Present Continuous (is/am/are)</td><td>Past Continuous (was/were)</td></tr>
              <tr><td>Simple Past (V2)</td><td>Past Perfect (had + V3)</td></tr>
              <tr><td>Present Perfect (has/have + V3)</td><td>Past Perfect (had + V3)</td></tr>
              <tr><td>Will / Can / May</td><td>Would / Could / Might</td></tr>
            </tbody>
          </table>
        </div>
        <h4>2. The Universal Truth Exception</h4>
        <p>If the reported clause states a universal scientific truth, geographical fact, or perpetual habit, the tense <strong>remains unchanged</strong> even if the reporting verb is in the past.</p>
        <div class="formula-box">Direct: The teacher said, "The Earth orbits the Sun."<br>Indirect: The teacher said that the Earth orbits the Sun. (NOT orbited)</div>
      `,
      rules: [
        {
          rule: 'Reporting Questions',
          formula: 'Wh- questions retain the question word as conjunction. Yes/No questions use "if" or "whether". The sentence structure becomes assertive (Subject + Verb).',
          tip: 'Say "He asked me where I lived", NOT "where did I live".'
        }
      ],
      examples: [
        {
          sentence: 'He said, "I have finished my project today."',
          explanation: 'Indirect: He said that he had finished his project that day.',
          label: 'Pronoun, Tense & Time Shift'
        }
      ],
      mistakes: [
        {
          wrong: 'She asked me that where was my house.',
          correct: 'She asked me where my house was.',
          why: 'Never use "that" before Wh- words in reported questions, and revert inversion to Subject + Verb order.'
        }
      ],
      revision: [
        'said to + object → told + object (No "to" after told).',
        'this → that, these → those, now → then, yesterday → the previous day, tomorrow → the following day.'
      ],
      flashcards: [
        { front: 'Convert "tomorrow" in indirect speech:', back: '"the next day" or "the following day"', category: 'Adverb Shift' },
        { front: 'Reporting Yes/No questions requires which conjunction?', back: '"if" or "whether"', category: 'Question Rules' },
        { front: 'Does universal truth backshift in tense?', back: 'No, it retains Simple Present tense.', category: 'Exceptions' }
      ],
      practiceDrills: [
        {
          instruction: 'Convert to indirect speech:',
          sentence: 'Rohan said, "Water boils at 100 degrees Celsius."',
          blank: 'Rohan said that water boils at 100 degrees Celsius',
          answer: 'Rohan said that water boils at 100 degrees Celsius',
          hint: 'Universal scientific fact.',
          explanation: 'Because water boiling at 100°C is a scientific fact, the tense remains in Simple Present.'
        }
      ],
      mcqs: [
        {
          question: 'Choose the correct indirect form: The doctor said to the patient, "Take this medicine twice daily."',
          options: [
            'The doctor said that take this medicine twice daily.',
            'The doctor advised the patient to take that medicine twice daily.',
            'The doctor ordered the patient taking that medicine twice daily.',
            'The doctor told the patient take that medicine twice daily.'
          ],
          answerIndex: 1,
          explanation: 'Imperative sentences reporting medical advice use "advised + object + to + V1" with "this" changed to "that".',
          ruleRef: 'Imperative Reporting'
        }
      ]
    },
    {
      id: 'subject-verb-agreement',
      title: 'Subject-Verb Agreement',
      category: 'grammar',
      difficulty: 'Advanced',
      studyTime: '25 mins',
      xp: 50,
      summary: 'Master the 20 fundamental rules of concord: compound subjects, indefinite pronouns, collective nouns, inverted syntax, and proximity rules.',
      objectives: [
        'Apply proximity agreement with "either... or" and "neither... nor".',
        'Handle parenthetical connectors (along with, as well as, together with).',
        'Determine correct verb number for indefinite pronouns (everyone, each, neither, none, all).',
        'Resolve agreement issues with collective nouns and nouns ending in -s.'
      ],
      detailedNotes: `
        <h4>1. Core Concord Rules</h4>
        <p>A singular subject requires a singular verb; a plural subject requires a plural verb. However, structural traps frequently cause errors in competitive and board exams.</p>
        <div class="formula-box">
          <strong>Rule 1 (Parenthetical Interrupters):</strong> Subject + [as well as / along with / together with / in addition to / accompanied by] + Noun → Verb agrees strictly with the FIRST subject!<br><br>
          <strong>Rule 2 (Correlative Proximity):</strong> Neither... nor / Either... or / Not only... but also → Verb agrees with the NEAREST subject!
        </div>
      `,
      rules: [
        {
          rule: 'Indefinite Pronoun Agreement',
          formula: 'Each, every, everyone, everybody, someone, nobody, neither, either take SINGULAR verbs.',
          tip: '"Each of the students HAS submitted the paper", NOT have.'
        }
      ],
      examples: [
        {
          sentence: 'The captain, along with his crew members, is navigating the storm.',
          explanation: 'The verb "is" agrees with the singular first subject "The captain", ignoring the parenthetical phrase.',
          label: 'Parenthetical Agreement'
        },
        {
          sentence: 'Neither the teacher nor the students were aware of the schedule change.',
          explanation: 'The verb "were" agrees with the closest subject "the students" (plural).',
          label: 'Proximity Rule'
        }
      ],
      mistakes: [
        {
          wrong: 'One of my friends are arriving today.',
          correct: 'One of my friends is arriving today.',
          why: 'The true subject is "One" (singular), not the plural prepositional complement "friends".'
        }
      ],
      revision: [
        'Nouns plural in form but singular in meaning (Physics, Mathematics, News, Measles) take singular verbs.',
        'Units of measurement, distance, time, and money viewed as a whole take a singular verb (Ten kilometers is a long walk).'
      ],
      flashcards: [
        { front: 'Verb for "Neither the manager nor the employees _____ present"?', back: '"were" (agrees with closest noun "employees")', category: 'Proximity' },
        { front: 'Is "Everybody" singular or plural?', back: 'Singular (takes singular verb: "Everybody is ready")', category: 'Indefinite Pronouns' },
        { front: 'Does "along with" change the verb number?', back: 'No, verb agrees solely with the main subject before "along with".', category: 'Interrupters' }
      ],
      practiceDrills: [
        {
          instruction: 'Fill in the blank with the correct verb (is/are):',
          sentence: 'The quality of these mangoes _______ exceptional.',
          blank: 'is',
          answer: 'is',
          hint: 'The subject is "quality", not "mangoes".',
          explanation: '"Quality" is singular uncountable, requiring "is".'
        }
      ],
      mcqs: [
        {
          question: 'Choose the correct sentence:',
          options: [
            'Five hundred dollars are an exorbitant amount for this ticket.',
            'Five hundred dollars is an exorbitant amount for this ticket.',
            'Five hundred dollars were an exorbitant amount for this ticket.',
            'Five hundred dollars have an exorbitant amount for this ticket.'
          ],
          answerIndex: 1,
          explanation: 'A specific sum of money considered as a single quantity takes a singular verb (is).',
          ruleRef: 'Quantities and Amounts'
        }
      ]
    },
    {
      id: 'articles-determiners',
      title: 'Articles and Determiners',
      category: 'grammar',
      difficulty: 'Beginner',
      studyTime: '20 mins',
      xp: 40,
      summary: 'Rules for definite article "The", indefinite articles "A/An", vowel sounds, zero article usage, and quantifiers (few/a few/the few, little/a little/the little).',
      objectives: [
        'Distinguish consonant/vowel sounds vs spelling for "a" vs "an" (e.g., a European, an honest man).',
        'Master the definite article "The" with geographical features, unique celestial bodies, and superlatives.',
        'Identify zero article contexts (proper nouns, abstract qualities, meals, languages).',
        'Differentiate "few", "a few", and "the few" in examination questions.'
      ],
      detailedNotes: `
        <h4>1. Phonetic Basis of A vs An</h4>
        <p>Use <strong>An</strong> before vowel <em>sounds</em> (a, e, i, o, u sounds), not just vowel letters. Use <strong>A</strong> before consonant sounds.</p>
        <ul class="notes-list">
          <li><strong>An honest man</strong> (/ɒ/ vowel sound) vs <strong>A house</strong> (/h/ consonant sound)</li>
          <li><strong>A university</strong> (/j/ consonant glide sound) vs <strong>An umbrella</strong> (/ʌ/ vowel sound)</li>
          <li><strong>An MBA graduate</strong> (/ɛm/ vowel sound) vs <strong>A member</strong> (/m/ consonant sound)</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Few vs Little Quantifiers',
          formula: 'Few/A few/The few = Countable nouns. Little/A little/The little = Uncountable nouns. (Without "a" = negative almost none; with "a" = positive small quantity).',
          tip: '"He has few friends" = virtually none (lonely). "He has a few friends" = some friends.'
        }
      ],
      examples: [
        {
          sentence: 'He is an honorable person who holds a European passport.',
          explanation: '"Honorable" starts with silent h (vowel sound); "European" starts with /j/ consonant sound.',
          label: 'Phonetic Sound Rule'
        }
      ],
      mistakes: [
        {
          wrong: 'He goes to the school by the bus.',
          correct: 'He goes to school by bus.',
          why: 'No article before primary purpose locations (school, church, prison) or modes of travel (by bus, by car).'
        }
      ],
      revision: [
        'Use "The" before superlatives (The highest peak) and ordinal numbers (The first chapter).',
        'Do not use articles before names of languages (He speaks French), but use "The" when referring to the people (The French love bread).'
      ],
      flashcards: [
        { front: 'Why do we write "a university" instead of "an university"?', back: 'Because "university" begins with the consonant sound /juː/ (like "you").', category: 'Phonetics' },
        { front: 'What is the meaning of "a little"?', back: 'A small but positive quantity (e.g., "There is a little hope left").', category: 'Quantifiers' }
      ],
      practiceDrills: [
        {
          instruction: 'Fill in the blank with a, an, or the:',
          sentence: 'She has been working as _______ honest accountant for ten years.',
          blank: 'an',
          answer: 'an',
          hint: 'Vowel sound in "honest".',
          explanation: '"honest" starts with a silent "h", producing a vowel sound.'
        }
      ],
      mcqs: [
        {
          question: 'Fill in the blank: "_______ Himalayas act as a natural climatic barrier for the subcontinent."',
          options: ['A', 'An', 'The', 'No article'],
          answerIndex: 2,
          explanation: 'Mountain ranges (plural mountain chains like The Himalayas, The Alps) always take the definite article "The".',
          ruleRef: 'Geographical Articles'
        }
      ]
    },
    {
      id: 'prepositions',
      title: 'Prepositions & Prepositional Phrases',
      category: 'grammar',
      difficulty: 'Intermediate',
      studyTime: '30 mins',
      xp: 50,
      summary: 'Master spatial, temporal, and directional prepositions, dependent prepositions with verbs and adjectives, and tricky contrasting pairs.',
      objectives: [
        'Differentiate in/on/at for spatial and temporal contexts.',
        'Distinguish between/among, beside/besides, since/for, into/in, and onto/on.',
        'Learn high-yield dependent prepositions (abstain from, comply with, prone to).',
        'Avoid redundant prepositions (e.g., discuss about, enter into a room).'
      ],
      detailedNotes: `
        <h4>1. Prepositions of Time & Place (The AT / ON / IN Pyramid)</h4>
        <ul class="notes-list">
          <li><strong>AT:</strong> Precise time / specific point (at 5 PM, at midnight, at the door, at the corner).</li>
          <li><strong>ON:</strong> Days / dates / surfaces (on Monday, on 15th August, on the table, on the wall).</li>
          <li><strong>IN:</strong> Enclosed spaces / months / years / centuries / large areas (in July, in 2026, in the room, in India).</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Beside vs Besides',
          formula: 'Beside = by the side of / adjacent to. Besides = in addition to / apart from.',
          tip: '"He sat beside me" vs "Besides English, she knows Spanish."'
        }
      ],
      examples: [
        {
          sentence: 'The committee agreed to comply with all safety regulations.',
          explanation: '"Comply" strictly takes the dependent preposition "with".',
          label: 'Dependent Preposition'
        }
      ],
      mistakes: [
        {
          wrong: 'We discussed about the examination pattern yesterday.',
          correct: 'We discussed the examination pattern yesterday.',
          why: '"Discuss" is a transitive verb meaning "talk about"; adding "about" creates a redundant error.'
        }
      ],
      revision: [
        'Between is used for two items; Among is used for three or more.',
        'Enter into is used for agreements/discussions, but NOT for entering physical spaces (Enter the hall).'
      ],
      flashcards: [
        { front: 'Difference between "beside" and "besides"?', back: '"Beside" = next to. "Besides" = in addition to.', category: 'Confusing Pairs' },
        { front: 'What preposition follows "congratulate"?', back: '"congratulate on" (NOT for). Example: "Congratulated him on his victory."', category: 'Dependent Prepositions' }
      ],
      practiceDrills: [
        {
          instruction: 'Fill in the blank with the correct preposition:',
          sentence: 'She has been suffering _______ malaria for two days.',
          blank: 'from',
          answer: 'from',
          hint: 'Dependent preposition with suffer.',
          explanation: '"Suffer" takes the preposition "from".'
        }
      ],
      mcqs: [
        {
          question: 'Choose the correct preposition: "The property was divided _______ the four brothers equally."',
          options: ['between', 'among', 'with', 'amidst'],
          answerIndex: 1,
          explanation: 'For distribution among three or more distinct individuals, "among" is the grammatically correct preposition.',
          ruleRef: 'Distribution Prepositions'
        }
      ]
    },
    {
      id: 'clauses-conditionals',
      title: 'Clauses & Complex Sentences',
      category: 'grammar',
      difficulty: 'Advanced',
      studyTime: '30 mins',
      xp: 50,
      summary: 'Master Independent vs Dependent clauses, Noun clauses, Relative clauses, Adverbial clauses, and Conditionals (Zero, First, Second, Third, Mixed).',
      objectives: [
        'Identify Noun, Adjective (Relative), and Adverb clauses in complex sentences.',
        'Apply the four conditional structures with accurate verb pairings.',
        'Construct Third Conditional hypothetical past structures (had + V3 ... would have + V3).',
        'Handle inverted conditionals without "if" (Had I known..., Were I in your place...).'
      ],
      detailedNotes: `
        <h4>1. The 4 Conditional Structures Matrix</h4>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr><th>Conditional Type</th><th>If Clause (Condition)</th><th>Main Clause (Result)</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Zero (Facts)</strong></td><td>Simple Present (If it heats)</td><td>Simple Present (it expands)</td></tr>
              <tr><td><strong>First (Real Future)</strong></td><td>Simple Present (If you study)</td><td>will + V1 (you will pass)</td></tr>
              <tr><td><strong>Second (Unreal Present)</strong></td><td>Simple Past (If I were rich)</td><td>would + V1 (I would travel)</td></tr>
              <tr><td><strong>Third (Unreal Past)</strong></td><td>Past Perfect (If he had run)</td><td>would have + V3 (he would have won)</td></tr>
            </tbody>
          </table>
        </div>
      `,
      rules: [
        {
          rule: 'Inverted Third Conditional',
          formula: 'Had + Subject + V3, Subject + would have + V3 (Omission of "If").',
          tip: '"Had you informed me earlier, I would have rescheduled the meeting."'
        }
      ],
      examples: [
        {
          sentence: 'If she had practiced regularly, she would have cleared the audition.',
          explanation: 'Third conditional expressing an unreal past possibility with an unfulfilled past result.',
          label: 'Third Conditional'
        }
      ],
      mistakes: [
        {
          wrong: 'If I will see him, I will give him your message.',
          correct: 'If I see him, I will give him your message.',
          why: 'Never use "will" inside the "if" condition clause in First Conditionals.'
        }
      ],
      revision: [
        'Relative pronouns: "Who" for subject people, "Whom" for object people, "Which" for things, "That" for restrictive clauses.',
        'In Second Conditional, use "were" for all subjects in formal English (If I were you).'
      ],
      flashcards: [
        { front: 'Formula for Third Conditional?', back: 'If + had + V3, ... would have + V3', category: 'Conditionals' },
        { front: 'Can "will" appear inside an "if" clause?', back: 'No, the condition clause takes Simple Present in Type 1.', category: 'Conditional Rules' }
      ],
      practiceDrills: [
        {
          instruction: 'Complete the conditional sentence:',
          sentence: 'If I _______ (know) the answer yesterday, I would have told you.',
          blank: 'had known',
          answer: 'had known',
          hint: 'Third conditional requires Past Perfect in if-clause.',
          explanation: 'The result clause contains "would have told", so the condition must be Past Perfect (had known).'
        }
      ],
      mcqs: [
        {
          question: 'Identify the clause type of the bracketed section: "The student [who scored the highest marks] received a gold medal."',
          options: ['Noun Clause', 'Adjective (Relative) Clause', 'Adverb Clause of Manner', 'Independent Clause'],
          answerIndex: 1,
          explanation: 'It modifies the noun "The student", acting as an Adjective/Relative clause.',
          ruleRef: 'Clause Analysis'
        }
      ]
    },
    {
      id: 'vocabulary-synonyms-antonyms',
      title: 'Vocabulary & Academic Lexicon',
      category: 'vocabulary',
      difficulty: 'Intermediate',
      studyTime: '25 mins',
      xp: 50,
      summary: 'High-frequency academic and exam vocabulary, Latin and Greek prefixes/suffixes, context clue strategies, and precision synonyms/antonyms.',
      objectives: [
        'Decipher unfamiliar words using root analysis (bene-, mal-, chron-, anthrop-, voc-).',
        'Learn 50+ high-frequency examination words with contextual nuance.',
        'Distinguish near-synonyms (e.g., famous vs notorious, child-like vs childish).',
        'Master common antonym pairs in senior secondary papers.'
      ],
      detailedNotes: `
        <h4>1. High-Yield Academic Vocabulary Bank</h4>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr><th>Word</th><th>Meaning</th><th>Synonyms</th><th>Antonyms</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Meticulous</strong></td><td>Showing extreme care for details</td><td>Scrupulous, Painstaking</td><td>Careless, Sloppy</td></tr>
              <tr><td><strong>Pragmatic</strong></td><td>Dealing with things sensibly and realistically</td><td>Practical, Rational</td><td>Idealistic, Impractical</td></tr>
              <tr><td><strong>Ephemeral</strong></td><td>Lasting for a very short time</td><td>Transient, Fleeting</td><td>Permanent, Eternal</td></tr>
              <tr><td><strong>Eloquent</strong></td><td>Fluent and persuasive in speech or writing</td><td>Articulate, Expressive</td><td>Inarticulate, Hesitant</td></tr>
              <tr><td><strong>Resilient</strong></td><td>Able to recover quickly from difficulties</td><td>Tough, Adaptable</td><td>Fragile, Vulnerable</td></tr>
            </tbody>
          </table>
        </div>
      `,
      rules: [
        {
          rule: 'Root Word Analysis',
          formula: 'Prefix + Root + Suffix. Example: "Benevolent" = Bene (good) + Vol (wish/will) + ent (adjective suffix) = Wishing good to others.',
          tip: 'When encountering an unfamiliar word in a reading passage, split it into its morphological roots.'
        }
      ],
      examples: [
        {
          sentence: 'Her ephemeral fame faded as quickly as it had arrived.',
          explanation: '"Ephemeral" highlights the short-lived nature of her popularity.',
          label: 'Contextual Usage'
        }
      ],
      mistakes: [
        {
          wrong: 'He is a notorious scientist who won the Nobel Prize.',
          correct: 'He is a renowned / celebrated scientist who won the Nobel Prize.',
          why: '"Notorious" means famous for bad or disgraceful reasons.'
        }
      ],
      revision: [
        'Prefix "mal-" indicates bad/evil (malicious, malevolent, malfunction).',
        'Prefix "bene-" indicates good/well (benefactor, benevolent, beneficial).'
      ],
      flashcards: [
        { front: 'What is an antonym for "Ephemeral"?', back: 'Permanent / Eternal / Everlasting', category: 'Antonyms' },
        { front: 'Define "Meticulous":', back: 'Extremely careful, precise, and attentive to small details.', category: 'Definitions' }
      ],
      practiceDrills: [
        {
          instruction: 'Type the synonym for "fleeting" / "short-lived":',
          sentence: 'The beauty of the sunset was _______ (e_______).',
          blank: 'ephemeral',
          answer: 'ephemeral',
          hint: 'Starts with e, 9 letters.',
          explanation: '"Ephemeral" means short-lived or transient.'
        }
      ],
      mcqs: [
        {
          question: 'Choose the correct antonym for "PRAGMATIC":',
          options: ['Practical', 'Sensible', 'Idealistic', 'Rational'],
          answerIndex: 2,
          explanation: '"Pragmatic" means practical and realistic. Its direct opposite is "Idealistic" (guided by ideals rather than practical realities).',
          ruleRef: 'Antonym Precision'
        }
      ]
    },
    {
      id: 'idioms-phrases',
      title: 'Idioms & Phrasal Verbs',
      category: 'vocabulary',
      difficulty: 'Intermediate',
      studyTime: '25 mins',
      xp: 45,
      summary: '50+ essential idioms, metaphorical expressions, and tricky phrasal verbs commonly tested in reading comprehension and writing assessments.',
      objectives: [
        'Understand figurative meanings of traditional and modern English idioms.',
        'Distinguish literal verb meanings from idiomatic phrasal verbs (look up to, bring about, call off).',
        'Employ idioms naturally in essays and descriptive writing without over-saturation.',
        'Avoid common preposition errors in set expressions.'
      ],
      detailedNotes: `
        <h4>1. High-Frequency Exam Idioms</h4>
        <ul class="notes-list">
          <li><strong>Burn the midnight oil:</strong> To study or work late into the night.</li>
          <li><strong>Bite the bullet:</strong> To face a difficult situation with fortitude and resolve.</li>
          <li><strong>Leave no stone unturned:</strong> To try every possible method to achieve an outcome.</li>
          <li><strong>A blessing in disguise:</strong> An apparent misfortune that eventuates in good fortune.</li>
          <li><strong>Read between the lines:</strong> To perceive the hidden or implied meaning.</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Phrasal Verb Separation',
          formula: 'Transitive separable phrasal verbs can place pronouns between the verb and particle (e.g., "call him up", NOT "call up him").',
          tip: 'Pronoun objects must always sit between the verb and particle in separable phrasal verbs.'
        }
      ],
      examples: [
        {
          sentence: 'The committee decided to call off the symposium due to inclement weather.',
          explanation: '"Call off" is a phrasal verb meaning to cancel.',
          label: 'Phrasal Verb'
        }
      ],
      mistakes: [
        {
          wrong: 'He turned down the offer because he was busy.',
          correct: 'He turned down the offer... (Correct usage of turn down = reject)',
          why: 'Make sure not to confuse "turn down" (reject) with "turn away" (refuse admittance).'
        }
      ],
      revision: [
        'Break down = stop functioning or lose emotional control.',
        'Look into = investigate.',
        'Put off = postpone.'
      ],
      flashcards: [
        { front: 'What does "to call off" mean?', back: 'To cancel an event or activity.', category: 'Phrasal Verbs' },
        { front: 'Meaning of "leave no stone unturned"?', back: 'To make every possible effort to achieve a goal.', category: 'Idioms' }
      ],
      practiceDrills: [
        {
          instruction: 'Complete the idiom: "She worked hard and left no stone _______ to secure the first rank."',
          sentence: 'left no stone _______',
          blank: 'unturned',
          answer: 'unturned',
          hint: 'Past participle of unturn.',
          explanation: '"Leave no stone unturned" is the complete idiom.'
        }
      ],
      mcqs: [
        {
          question: 'What is the meaning of the phrasal verb "PUT UP WITH"?',
          options: ['To postpone', 'To tolerate or endure', 'To construct a building', 'To extinguish a fire'],
          answerIndex: 1,
          explanation: '"Put up with" means to tolerate, bear, or endure an unpleasant situation or person.',
          ruleRef: 'Phrasal Verb Semantics'
        }
      ]
    },
    {
      id: 'essay-writing',
      title: 'Essay Writing & Formal Structure',
      category: 'writing',
      difficulty: 'Advanced',
      studyTime: '35 mins',
      xp: 60,
      summary: 'Master the 5-paragraph academic essay architecture, thesis statement formulation, body paragraph coherence with PEEL methodology, and powerful conclusions.',
      objectives: [
        'Craft clear, arguable thesis statements in the introductory paragraph.',
        'Structure cohesive body paragraphs using the PEEL method (Point, Evidence, Explanation, Link).',
        'Employ varied transition markers for contrast, reinforcement, and cause-and-effect.',
        'Synthesize arguments in a conclusion without simply copying the introduction word-for-word.'
      ],
      detailedNotes: `
        <h4>1. The 5-Paragraph Essay Framework</h4>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr><th>Section</th><th>Key Elements</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Introduction</strong></td><td>Hook, Background Context, Thesis Statement</td><td>Engage reader & establish thesis claim</td></tr>
              <tr><td><strong>Body Paragraph 1</strong></td><td>Point 1, Evidence/Fact, Explanation, Link (PEEL)</td><td>Primary supporting argument</td></tr>
              <tr><td><strong>Body Paragraph 2</strong></td><td>Point 2, Analytical reasoning, Examples</td><td>Secondary reinforcement</td></tr>
              <tr><td><strong>Body Paragraph 3</strong></td><td>Counterargument & Rebuttal</td><td>Demonstrates depth and nuance</td></tr>
              <tr><td><strong>Conclusion</strong></td><td>Restate thesis in new words, summarize, final takeaway</td><td>Leaves lasting intellectual impression</td></tr>
            </tbody>
          </table>
        </div>
      `,
      rules: [
        {
          rule: 'PEEL Paragraph Technique',
          formula: 'P (Point: Topic sentence) → E (Evidence: Concrete example/data) → E (Explanation: Why it matters) → L (Link: Connects back to thesis).',
          tip: 'Every body paragraph must begin with a strong, single-focused topic sentence.'
        }
      ],
      examples: [
        {
          sentence: 'Furthermore, the transition to renewable energy sources not only mitigates carbon emissions but also fosters technological innovation.',
          explanation: 'Demonstrates sophisticated transition and parallel sentence structure in a body paragraph.',
          label: 'Academic Style'
        }
      ],
      mistakes: [
        {
          wrong: 'Starting conclusions with "In this essay I showed you that..."',
          correct: 'Use formal synthesizers: "Ultimately, the evidence underscores that..."',
          why: 'Avoid first-person conversational clichés in formal academic essays.'
        }
      ],
      revision: [
        'Use signposting transitions: Consequently, However, In contrast, On the contrary, Subsequently.',
        'Maintain a formal, objective tone—avoid slang, colloquialisms, and informal contractions (write "do not", not "don\'t").'
      ],
      flashcards: [
        { front: 'What does the PEEL acronym stand for?', back: 'Point, Evidence, Explanation, Link', category: 'Writing Frameworks' },
        { front: 'Where should a thesis statement be positioned?', back: 'At the end of the introductory paragraph.', category: 'Essay Structure' }
      ],
      practiceDrills: [
        {
          instruction: 'Which transition best shows contrast?',
          sentence: 'The initial costs were steep; _______, the long-term savings proved substantial.',
          blank: 'however',
          answer: 'however',
          hint: 'Starts with h, indicates contrast.',
          explanation: '"However" or "nevertheless" provides smooth contrast between two independent clauses.'
        }
      ],
      mcqs: [
        {
          question: 'What is the primary function of a thesis statement in an expository essay?',
          options: [
            'To ask a rhetorical question to captivate the reader.',
            'To clearly state the central argument or claim of the essay.',
            'To provide a comprehensive list of all cited sources.',
            'To serve as a generic opening greeting.'
          ],
          answerIndex: 1,
          explanation: 'The thesis statement articulates the central claim or roadmap of the entire essay in one or two concise sentences.',
          ruleRef: 'Essay Architecture'
        }
      ]
    },
    {
      id: 'letter-writing',
      title: 'Formal Letter & Application Writing',
      category: 'writing',
      difficulty: 'Intermediate',
      studyTime: '25 mins',
      xp: 45,
      summary: 'Standard board exam formats for formal letters to editors, principals, business inquiries, complaints, and official applications with exact marking schemes.',
      objectives: [
        'Format standard block layout (Sender\'s address, Date, Receiver\'s designation, Subject, Salutation, Body, Sign-off).',
        'Write crisp, concise Subject lines that instantly communicate the objective.',
        'Structure the 3-tier formal letter body (Introduction, Detailed Cause/Context, Requested Action).',
        'Employ appropriate formal complimentary closes (Yours faithfully vs Yours sincerely).'
      ],
      detailedNotes: `
        <h4>1. Standard Block Format for Formal Letters</h4>
        <div class="formula-box">
          [Sender's Postal Address]<br>
          [Date: e.g., 8th August 2026]<br><br>
          [Receiver's Designation: e.g., The Editor / The Principal]<br>
          [Organization / Newspaper Name]<br>
          [City and Pincode]<br><br>
          <strong>Subject:</strong> Concise statement of purpose (under 8-10 words)<br><br>
          <strong>Respected Sir / Madam,</strong><br><br>
          <strong>Paragraph 1:</strong> Opening statement and purpose of writing.<br>
          <strong>Paragraph 2:</strong> Detailed facts, problems, or specifications.<br>
          <strong>Paragraph 3:</strong> Expected remedial action or request.<br><br>
          <strong>Yours faithfully,</strong><br>
          [Signature / Full Name]<br>
          [Designation, if applicable]
        </div>
      `,
      rules: [
        {
          rule: 'Salutation and Complimentary Close Concord',
          formula: 'Sir/Madam (Name unknown) → Yours faithfully. Dear Mr. Sharma (Name known) → Yours sincerely.',
          tip: 'Never write "Your\'s faithfully" with an apostrophe. "Yours" is already possessive.'
        }
      ],
      examples: [
        {
          sentence: 'Subject: Urgent need for repairing the broken streetlights in Sector 9.',
          explanation: 'Clear, concise, and professional subject line format.',
          label: 'Subject Line'
        }
      ],
      mistakes: [
        {
          wrong: 'Your\'s obediently / Your\'s faithfully',
          correct: 'Yours obediently / Yours faithfully',
          why: 'Possessive pronouns (yours, hers, theirs, its) NEVER take an apostrophe.'
        }
      ],
      revision: [
        'Letters to the Editor should NOT ask the editor to solve the issue directly, but to "highlight the issue through the columns of your esteemed newspaper to draw the authorities\' attention".',
        'All elements align with the left margin in modern block format.'
      ],
      flashcards: [
        { front: 'Is there an apostrophe in "Yours faithfully"?', back: 'NO. "Yours" never takes an apostrophe.', category: 'Letter Etiquette' },
        { front: 'How should you open a Letter to the Editor?', back: '"Through the esteemed columns of your newspaper, I wish to draw attention to..."', category: 'Opening Formulas' }
      ],
      practiceDrills: [
        {
          instruction: 'Type the correct spelling of the possessive formal sign-off:',
          sentence: '_______ (Yours/Your\'s) sincerely, Rohan Gupta',
          blank: 'Yours',
          answer: 'Yours',
          hint: 'No apostrophe.',
          explanation: 'Possessive pronoun "Yours" is written without an apostrophe.'
        }
      ],
      mcqs: [
        {
          question: 'In modern block format for formal letters, where are all sections (date, address, salutation) aligned?',
          options: ['Right margin', 'Centered', 'Left margin', 'Indented 5 spaces'],
          answerIndex: 2,
          explanation: 'Modern formal letter writing mandates standard left-alignment for all components without indentation.',
          ruleRef: 'Letter Formatting'
        }
      ]
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension & Inference',
      category: 'comprehension',
      difficulty: 'Intermediate',
      studyTime: '30 mins',
      xp: 50,
      summary: 'Strategies for unseen passages: skimming for gist, scanning for specific data, contextual vocabulary deduction, and tone/inference question mastery.',
      objectives: [
        'Apply the SQ3R technique (Survey, Question, Read, Recite, Review) to unseen passages.',
        'Distinguish between factual, inferential, and vocabulary-in-context questions.',
        'Determine the author\'s tone (objective, critical, laudatory, satirical, nostalgic).',
        'Extract central themes and summarize main arguments under timed conditions.'
      ],
      detailedNotes: `
        <h4>1. Skimming vs Scanning Strategy</h4>
        <ul class="notes-list">
          <li><strong>Skimming (30 seconds):</strong> Read the title, first sentence of every paragraph, and the concluding sentence to form a mental map of the passage.</li>
          <li><strong>Question First Approach:</strong> Read the questions BEFORE deep-reading the passage to identify targeted keywords.</li>
          <li><strong>Scanning:</strong> Search for specific names, dates, numerical values, or technical terms highlighted in the question stems.</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Tone Identification Spectrum',
          formula: 'Analyze adjectives and modal verbs. Positive words = laudatory/optimistic; data-driven neutral = objective/analytical; sarcastic contrast = satirical/ironic.',
          tip: 'An objective tone contains factual data and balanced views without emotional bias.'
        }
      ],
      examples: [
        {
          sentence: 'Passage excerpt: "While the technological leap is undeniable, one must question the ethical implications of unfettered automation."',
          explanation: 'The tone is analytical and critical, highlighting both progress and ethical caution.',
          label: 'Tone Analysis'
        }
      ],
      mistakes: [
        {
          wrong: 'Bringing personal outside knowledge into answers instead of sticking strictly to the passage text.',
          correct: 'Answer solely based on the text provided in the passage.',
          why: 'In reading comprehension, truth is defined entirely by what is written in the passage.'
        }
      ],
      revision: [
        'Always read one sentence before and one sentence after a vocabulary word to determine its contextual meaning.',
        'Title questions require capturing the whole passage\'s scope, not just one single paragraph.'
      ],
      flashcards: [
        { front: 'What is "Skimming"?', back: 'Reading quickly to grasp the general gist and structure of a text.', category: 'Reading Strategies' },
        { front: 'What is "Scanning"?', back: 'Searching for a specific fact, date, name, or keyword in the text.', category: 'Reading Strategies' }
      ],
      practiceDrills: [
        {
          instruction: 'Type the reading technique used to locate a specific date or name in a passage:',
          sentence: 'Locating a phone number or date is called _______ (s_______).',
          blank: 'scanning',
          answer: 'scanning',
          hint: 'Starts with s, 8 letters.',
          explanation: 'Scanning is the rapid search for specific facts or keywords.'
        }
      ],
      mcqs: [
        {
          question: 'When an author presents only statistical data, factual chronology, and balanced arguments without personal feelings, what is the tone?',
          options: ['Satirical', 'Nostalgic', 'Objective', 'Cynical'],
          answerIndex: 2,
          explanation: 'An "Objective" tone presents neutral facts and balanced perspectives without emotional bias.',
          ruleRef: 'Authorial Tone'
        }
      ]
    },
    {
      id: 'summary-precis-writing',
      title: 'Summary & Précis Writing',
      category: 'comprehension',
      difficulty: 'Advanced',
      studyTime: '25 mins',
      xp: 50,
      summary: 'Rules for compressing texts to one-third of their original length: eliminating redundant fluff, preserving core arguments, and crafting concise titles.',
      objectives: [
        'Condense dense texts into approximately one-third of the original word count.',
        'Extract primary thematic ideas while discarding secondary examples, anecdotes, and redundant adjectives.',
        'Write in the third person and past/objective tense in your own original words.',
        'Formulate crisp, representative titles that encapsulate the main thesis.'
      ],
      detailedNotes: `
        <h4>1. The 5 Golden Rules of Précis Writing</h4>
        <ul class="notes-list">
          <li><strong>Word Limit Rule:</strong> A standard précis must be roughly <strong>one-third (1/3)</strong> of the total word count of the original passage.</li>
          <li><strong>No Direct Quotations:</strong> Express every idea in your own words; never copy long sentences directly.</li>
          <li><strong>Eliminate Examples & Figures of Speech:</strong> Remove rhetorical questions, similes, metaphors, anecdotes, and illustrative numbers.</li>
          <li><strong>Objective Perspective:</strong> Write strictly in indirect speech / third person without adding your own commentary.</li>
          <li><strong>Appropriate Title:</strong> Every précis must be crowned with an insightful title.</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Précis Word Count Calculation',
          formula: 'Target Length = (Original Word Count / 3) ± 5 words.',
          tip: 'Always state the rough word count at the bottom of your completed précis.'
        }
      ],
      examples: [
        {
          sentence: 'Original (32 words): "At this point in time, it is of the utmost imperative necessity that all citizens must come together to protect our endangered ecological environment."',
          explanation: 'Précis (8 words): "Citizens must unite urgently to protect the environment."',
          label: 'Compression Example'
        }
      ],
      mistakes: [
        {
          wrong: 'Adding personal opinions like "I agree with the author\'s view that..."',
          correct: 'Summarize only what the author stated without editorial comment.',
          why: 'A précis is a factual compression, not a personal review.'
        }
      ],
      revision: [
        'Replace long phrases with single-word substitutes (e.g., "a person who looks at the bright side of things" → "an optimist").',
        'Maintain a single, cohesive paragraph structure.'
      ],
      flashcards: [
        { front: 'What is the standard length of a précis compared to the original passage?', back: 'Approximately one-third (1/3rd) of the original length.', category: 'Précis Rules' },
        { front: 'Should personal opinions be added in a précis?', back: 'Never. Only summarize the author\'s stated points.', category: 'Précis Rules' }
      ],
      practiceDrills: [
        {
          instruction: 'Type the single word substitute for "that which cannot be heard":',
          sentence: 'A sound that cannot be heard is _______ (i_______).',
          blank: 'inaudible',
          answer: 'inaudible',
          hint: 'Starts with in, 9 letters.',
          explanation: '"Inaudible" means unable to be heard.'
        }
      ],
      mcqs: [
        {
          question: 'Which of the following must be OMITTED when composing a formal précis?',
          options: [
            'The central thesis of the author',
            'Illustrative examples, anecdotes, and decorative metaphors',
            'The chronological sequence of main points',
            'A concise representative title'
          ],
          answerIndex: 1,
          explanation: 'Illustrative examples, figures of speech, and decorative digressions are strictly omitted during précis compression.',
          ruleRef: 'Précis Compression'
        }
      ]
    },
    {
      id: 'poetry-analysis-literary-devices',
      title: 'Poetry Analysis & Literary Devices',
      category: 'literature',
      difficulty: 'Intermediate',
      studyTime: '30 mins',
      xp: 55,
      summary: 'Analyze figurative language: Metaphor, Simile, Personification, Alliteration, Oxymoron, Hyperbole, Onomatopoeia, Irony, Rhyme schemes, and Stanza meters.',
      objectives: [
        'Identify and explain figurative devices in senior secondary poetry extracts.',
        'Distinguish subtle differences between Metaphor and Simile, Oxymoron and Paradox.',
        'Analyze sound devices: Alliteration, Assonance, Consonance, and Onomatopoeia.',
        'Decode poetic meter, stanzaic structures, and rhyme schemes (e.g., ABAB, AABB).'
      ],
      detailedNotes: `
        <h4>1. Core Literary Devices Master Table</h4>
        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr><th>Device</th><th>Definition</th><th>Poetic Example</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Simile</strong></td><td>Comparison using 'like' or 'as'</td><td><em>"I wandered lonely as a cloud"</em></td></tr>
              <tr><td><strong>Metaphor</strong></td><td>Direct comparison without 'like' or 'as'</td><td><em>"Life is a broken-winged bird"</em></td></tr>
              <tr><td><strong>Personification</strong></td><td>Giving human qualities to non-human entities</td><td><em>"The wind whispered through the pines"</em></td></tr>
              <tr><td><strong>Oxymoron</strong></td><td>Two contradictory words side-by-side</td><td><em>"Deafening silence", "Bitter sweet"</em></td></tr>
              <tr><td><strong>Hyperbole</strong></td><td>Deliberate exaggeration for dramatic effect</td><td><em>"Ten thousand saw I at a glance"</em></td></tr>
              <tr><td><strong>Alliteration</strong></td><td>Repetition of initial consonant sounds</td><td><em>"Fair is foul, and foul is fair"</em></td></tr>
              <tr><td><strong>Onomatopoeia</strong></td><td>Words that imitate natural sounds</td><td><em>"Buzz", "Hiss", "Babble", "Murmur"</em></td></tr>
            </tbody>
          </table>
        </div>
      `,
      rules: [
        {
          rule: 'Oxymoron vs Paradox',
          formula: 'Oxymoron = Two contradictory words side-by-side (e.g., "cruel kindness"). Paradox = A full contradictory statement that reveals a deeper truth (e.g., "The child is father of the man").',
          tip: 'An oxymoron is a 2-word phrase; a paradox is an entire philosophical assertion.'
        }
      ],
      examples: [
        {
          sentence: 'The tree stretched its weary arms towards the twilight sky.',
          explanation: 'Personification: attributing human body parts (arms) and emotional states (weary) to a tree.',
          label: 'Personification'
        }
      ],
      mistakes: [
        {
          wrong: 'Confusing Assonance with Alliteration.',
          correct: 'Alliteration repeats initial consonants (Peter Piper); Assonance repeats vowel sounds within words (Men sell the wedding bells).',
          why: 'Ensure correct phonetic categorization in board exam annotations.'
        }
      ],
      revision: [
        'Irony occurs when there is a contrast between expectation and reality (Situational, Dramatic, Verbal).',
        'Enjambment is the continuation of a sentence without a pause beyond the end of a line or stanza.'
      ],
      flashcards: [
        { front: 'Identify device: "The camel is the ship of the desert"', back: 'Metaphor (direct comparison without like/as)', category: 'Literary Devices' },
        { front: 'Identify device: "Deafening silence"', back: 'Oxymoron (two contradictory terms placed side-by-side)', category: 'Literary Devices' },
        { front: 'What is Enjambment?', back: 'Continuation of a poetic sentence across line breaks without terminal punctuation.', category: 'Poetry Metrics' }
      ],
      practiceDrills: [
        {
          instruction: 'Identify the literary device in: "O Wild West Wind, thou breath of Autumn\'s being"',
          sentence: 'O Wild West Wind...',
          blank: 'apostrophe',
          answer: 'apostrophe',
          hint: 'Directly addressing an inanimate force (or alliteration).',
          explanation: 'Addressing an absent or non-human entity (The Wind) as if alive is Apostrophe (and Alliteration with W).'
        }
      ],
      mcqs: [
        {
          question: 'Identify the poetic device used in: "The child is father of the man" (William Wordsworth):',
          options: ['Simile', 'Paradox', 'Onomatopoeia', 'Hyperbole'],
          answerIndex: 1,
          explanation: 'It is a classic Paradox: a statement seemingly self-contradictory on the surface, but containing a profound philosophical truth.',
          ruleRef: 'Literary Figures'
        }
      ]
    },
    {
      id: 'modals-semi-modals',
      title: 'Modals & Semi-Modal Auxiliaries',
      category: 'grammar',
      difficulty: 'Intermediate',
      studyTime: '20 mins',
      xp: 40,
      summary: 'Expressing ability, obligation, permission, probability, and advice using Can/Could, May/Might, Must/Have to, Shall/Should, and Ought to.',
      objectives: [
        'Differentiate degrees of probability (must > should > may > might > could).',
        'Use "ought to" vs "should" for moral obligation.',
        'Master past modal structures (must have, should have, could have).',
        'Handle semi-modals: need, dare, and used to.'
      ],
      detailedNotes: `
        <h4>1. Modal Functions Overview</h4>
        <ul class="notes-list">
          <li><strong>Must / Have to:</strong> Strong obligation or logical deduction (<em>"You must wear a helmet", "He must be at home"</em>).</li>
          <li><strong>Should / Ought to:</strong> Recommendation, advice, or moral duty (<em>"We ought to respect our elders"</em>).</li>
          <li><strong>May / Might:</strong> Possibility or formal permission (<em>"May I enter?", "It might rain tonight"</em>).</li>
          <li><strong>Could have / Should have:</strong> Unfulfilled past possibilities or regret (<em>"You should have informed us"</em>).</li>
        </ul>
      `,
      rules: [
        {
          rule: 'Past Modal Regret Formula',
          formula: 'Should have + V3 = An action that was advisable in the past but was NOT done.',
          tip: '"You should have studied" implies you did not study.'
        }
      ],
      examples: [
        {
          sentence: 'The roads are wet; it must have rained heavily last night.',
          explanation: '"Must have rained" expresses a high-probability logical deduction about a past event.',
          label: 'Logical Deduction'
        }
      ],
      mistakes: [
        {
          wrong: 'You must to submit your work today.',
          correct: 'You must submit your work today.',
          why: 'Modal verbs (except ought to, have to, used to) are followed directly by bare infinitive (V1 without "to").'
        }
      ],
      revision: [
        'Dare and Need act as semi-modals in negative and interrogative sentences (e.g., "You needn\'t worry", "How dare you speak?").',
        '"Used to" expresses discontinued past habits.'
      ],
      flashcards: [
        { front: 'What follows modal verbs like "must", "can", "will"?', back: 'Bare infinitive (V1 without "to").', category: 'Modal Syntax' },
        { front: 'Meaning of "could have + V3"?', back: 'Past ability or opportunity that was not fulfilled.', category: 'Past Modals' }
      ],
      practiceDrills: [
        {
          instruction: 'Fill in the blank with the appropriate modal (must/may):',
          sentence: 'He has won three gold medals; he _______ be a skilled athlete.',
          blank: 'must',
          answer: 'must',
          hint: 'Strong logical certainty.',
          explanation: '"Must" expresses certainty based on clear evidence.'
        }
      ],
      mcqs: [
        {
          question: 'Which modal auxiliary best conveys moral obligation?',
          options: ['can', 'might', 'ought to', 'would'],
          answerIndex: 2,
          explanation: '"Ought to" specifically conveys moral duty, ethical obligation, or strong righteousness.',
          ruleRef: 'Modal Auxiliaries'
        }
      ]
    }
  ];

  // =========================================================================
  // 2. APPLICATION STATE MANAGEMENT (Local Persistence)
  // =========================================================================
  const STATE = {
    xp: parseInt(localStorage.getItem('sm_english_xp') || '1450', 10),
    streak: parseInt(localStorage.getItem('sm_english_streak') || '7', 10),
    completedTopics: JSON.parse(localStorage.getItem('sm_english_completed') || '["tenses", "articles-determiners"]'),
    bookmarks: JSON.parse(localStorage.getItem('sm_english_bookmarks') || '["tenses", "essay-writing"]'),
    questionsSolved: parseInt(localStorage.getItem('sm_english_q_solved') || '142', 10),
    correctAnswers: parseInt(localStorage.getItem('sm_english_q_correct') || '122', 10),
    activeTopicId: 'tenses',
    currentFilterCategory: 'all',
    currentDifficulty: 'all',
    currentSearchQuery: '',
    onlyBookmarked: false,
    fontSize: 16,
    
    // Quiz Engine State
    quiz: {
      activeTopic: null,
      questions: [],
      currentIndex: 0,
      userAnswers: {},
      timeRemaining: 300,
      timerInterval: null,
      isActive: false
    },

    // Flashcard State
    flashcard: {
      currentIndex: 0,
      isFlipped: false
    }
  };

  // DOM Elements Selection
  const elements = {
    // Badges & Counters
    xpCount: document.getElementById('xp-count-display'),
    streakCount: document.getElementById('streak-count-display'),
    bookmarkBadge: document.getElementById('bookmark-badge-count'),
    statCompleted: document.getElementById('stat-topics-completed'),
    statSolved: document.getElementById('stat-questions-solved'),
    statAccuracy: document.getElementById('stat-accuracy-rate'),
    progressCircle: document.getElementById('overall-progress-circle'),
    progressPercentage: document.getElementById('overall-progress-percentage'),
    dailyGoalBar: document.getElementById('daily-goal-bar-fill'),
    savedCountLabel: document.getElementById('saved-count-label'),

    // Category Counts
    countAll: document.getElementById('count-all'),
    countGrammar: document.getElementById('count-grammar'),
    countVocab: document.getElementById('count-vocabulary'),
    countWriting: document.getElementById('count-writing'),
    countComp: document.getElementById('count-comprehension'),
    countLit: document.getElementById('count-literature'),

    // Hero Actions
    btnHeroContinue: document.getElementById('btn-hero-continue'),
    heroContinueText: document.getElementById('hero-continue-text'),
    btnHeroMockTest: document.getElementById('btn-hero-mock-test'),
    btnHeroFlashcards: document.getElementById('btn-hero-flashcards'),

    // Recent Activity Container
    recentContainer: document.getElementById('recent-activity-container'),

    // Topic Library
    searchInput: document.getElementById('topic-search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    categoryGroup: document.getElementById('category-filter-group'),
    difficultySelect: document.getElementById('difficulty-select'),
    btnFilterBookmarks: document.getElementById('btn-filter-bookmarked-only'),
    btnQuickFlashcards: document.getElementById('btn-quick-flashcards-mode'),
    btnQuickMockTest: document.getElementById('btn-quick-mock-test-mode'),
    topicsGrid: document.getElementById('topics-grid-container'),
    emptyState: document.getElementById('topics-empty-state'),
    btnResetFilters: document.getElementById('btn-reset-filters'),

    // Topic Reader View
    readerView: document.getElementById('topic-reader-view'),
    btnCloseReader: document.getElementById('btn-close-reader'),
    readerCatCrumb: document.getElementById('reader-category-breadcrumb'),
    readerTitleCrumb: document.getElementById('reader-title-breadcrumb'),
    readingProgressFill: document.getElementById('reading-progress-fill'),
    readingProgressText: document.getElementById('reading-progress-text'),
    btnReaderBookmark: document.getElementById('btn-reader-bookmark'),
    btnReaderFontToggle: document.getElementById('btn-reader-font-toggle'),
    readerFontSizeLabel: document.getElementById('reader-font-size-label'),
    btnReaderAiAssist: document.getElementById('btn-reader-ai-assist'),
    readerSidebarTitle: document.getElementById('reader-sidebar-title'),
    readerMetaDiff: document.getElementById('reader-meta-difficulty'),
    readerMetaTime: document.getElementById('reader-meta-time'),
    readerMetaXp: document.getElementById('reader-meta-xp'),
    btnMarkComplete: document.getElementById('btn-mark-topic-complete'),
    btnMarkCompleteText: document.getElementById('btn-mark-topic-text'),
    readerHeroCat: document.getElementById('reader-hero-cat-badge'),
    readerHeroTitle: document.getElementById('reader-hero-title'),
    readerHeroDesc: document.getElementById('reader-hero-desc'),
    btnJumpQuiz: document.getElementById('btn-jump-to-quiz'),
    btnJumpFlashcards: document.getElementById('btn-jump-to-flashcards'),
    btnAskAiSummary: document.getElementById('btn-ask-ai-summary'),
    readerArticle: document.getElementById('reader-article'),
    readerObjectives: document.getElementById('reader-objectives-list'),
    readerNotesBody: document.getElementById('reader-detailed-notes-body'),
    readerRulesBody: document.getElementById('reader-rules-body'),
    readerExamplesBody: document.getElementById('reader-examples-body'),
    readerMistakesBody: document.getElementById('reader-mistakes-body'),
    readerRevisionList: document.getElementById('reader-revision-list'),
    readerPracticeBody: document.getElementById('reader-practice-body'),
    btnStartTopicQuiz: document.getElementById('btn-start-topic-quiz'),

    // Flashcard Deck In Reader
    activeFlashcard: document.getElementById('active-flashcard'),
    flashcardFrontText: document.getElementById('flashcard-front-text'),
    flashcardBackText: document.getElementById('flashcard-back-text'),
    flashcardBackCat: document.getElementById('flashcard-back-category'),
    flashcardCurrentIdx: document.getElementById('flashcard-current-index'),
    flashcardTotalCount: document.getElementById('flashcard-total-count'),
    btnFlashcardPrev: document.getElementById('btn-flashcard-prev'),
    btnFlashcardNext: document.getElementById('btn-flashcard-next'),
    btnCardNeedReview: document.getElementById('btn-card-need-review'),
    btnCardGotIt: document.getElementById('btn-card-got-it'),

    // Quiz Arena Modal
    quizModal: document.getElementById('quiz-arena-modal'),
    quizTitleBadge: document.getElementById('quiz-title-badge'),
    quizActiveTitle: document.getElementById('quiz-active-title'),
    quizTimerDisplay: document.getElementById('quiz-timer-display'),
    btnExitQuiz: document.getElementById('btn-exit-quiz'),
    quizProgressFill: document.getElementById('quiz-progress-bar-fill'),
    quizCurrentQNum: document.getElementById('quiz-current-q-num'),
    quizTotalQNum: document.getElementById('quiz-total-q-num'),
    quizQPoints: document.getElementById('quiz-q-points'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsContainer: document.getElementById('quiz-options-container'),
    quizInstantExp: document.getElementById('quiz-instant-explanation'),
    quizExpStatus: document.getElementById('quiz-exp-status'),
    quizExpText: document.getElementById('quiz-exp-text'),
    btnQuizPrev: document.getElementById('btn-quiz-prev-q'),
    btnQuizNext: document.getElementById('btn-quiz-next-q'),
    btnQuizNextLabel: document.getElementById('btn-quiz-next-label'),
    quizAnsweredCount: document.getElementById('quiz-answered-count-text'),

    // Quiz Results Modal
    resultsModal: document.getElementById('quiz-results-modal'),
    resultsHeadline: document.getElementById('results-headline'),
    resultsSubheadline: document.getElementById('results-subheadline'),
    resScoreText: document.getElementById('res-score-text'),
    resAccuracyText: document.getElementById('res-accuracy-text'),
    resXpText: document.getElementById('res-xp-text'),
    resTimeText: document.getElementById('res-time-text'),
    resultsReviewList: document.getElementById('results-review-list'),
    btnRetryQuiz: document.getElementById('btn-retry-quiz'),
    btnReturnToTopics: document.getElementById('btn-return-to-topics'),

    // AI Tutor Drawer
    aiDrawer: document.getElementById('ai-tutor-drawer'),
    aiDrawerOverlay: document.getElementById('ai-drawer-overlay'),
    btnCloseAiDrawer: document.getElementById('btn-close-ai-drawer'),
    btnQuickAiTutor: document.getElementById('btn-quick-ai-tutor'),
    aiTopicContextTag: document.getElementById('ai-active-topic-tag'),
    aiPromptChips: document.getElementById('ai-prompt-chips'),
    aiMessagesFeed: document.getElementById('ai-messages-feed'),
    aiChatForm: document.getElementById('ai-chat-form'),
    aiPromptInput: document.getElementById('ai-prompt-input'),

    // Bookmarks Drawer
    bookmarksDrawer: document.getElementById('bookmarks-drawer'),
    bookmarksOverlay: document.getElementById('bookmarks-drawer-overlay'),
    btnOpenBookmarks: document.getElementById('btn-open-bookmarks'),
    btnCloseBookmarks: document.getElementById('btn-close-bookmarks-drawer'),
    bookmarksListContainer: document.getElementById('bookmarks-list-container'),

    // Toast
    toast: document.getElementById('toast-notification'),
    toastMessage: document.getElementById('toast-message'),
    toastIcon: document.getElementById('toast-icon')
  };

  // =========================================================================
  // 3. UI SYNC & STATS FUNCTIONS
  // =========================================================================
  function updateUIStats() {
    if (elements.xpCount) elements.xpCount.textContent = STATE.xp.toLocaleString();
    if (elements.streakCount) elements.streakCount.textContent = STATE.streak;
    if (elements.bookmarkBadge) elements.bookmarkBadge.textContent = STATE.bookmarks.length;
    if (elements.savedCountLabel) elements.savedCountLabel.textContent = STATE.bookmarks.length;

    // Topics Completed
    const completedCount = STATE.completedTopics.length;
    const totalTopics = ENGLISH_TOPICS.length;
    if (elements.statCompleted) elements.statCompleted.textContent = `${completedCount} / ${totalTopics}`;

    // Questions Solved & Accuracy
    if (elements.statSolved) elements.statSolved.textContent = STATE.questionsSolved;
    const accuracy = STATE.questionsSolved > 0 
      ? Math.round((STATE.correctAnswers / STATE.questionsSolved) * 100) 
      : 86;
    if (elements.statAccuracy) elements.statAccuracy.textContent = `${accuracy}%`;

    // Circular Progress Ring
    const percentage = Math.round((completedCount / totalTopics) * 100);
    if (elements.progressPercentage) elements.progressPercentage.textContent = `${percentage}%`;
    if (elements.progressCircle) {
      const radius = 28;
      const circumference = 2 * Math.PI * radius; // ~175.9
      const offset = circumference - (percentage / 100) * circumference;
      elements.progressCircle.style.strokeDashoffset = offset;
    }

    // Daily Goal
    if (elements.dailyGoalBar) {
      const goalPct = Math.min(100, Math.round((completedCount * 10 + STATE.questionsSolved) / 3));
      elements.dailyGoalBar.style.width = `${goalPct}%`;
    }

    // Save to localStorage
    localStorage.setItem('sm_english_xp', STATE.xp);
    localStorage.setItem('sm_english_streak', STATE.streak);
    localStorage.setItem('sm_english_completed', JSON.stringify(STATE.completedTopics));
    localStorage.setItem('sm_english_bookmarks', JSON.stringify(STATE.bookmarks));
    localStorage.setItem('sm_english_q_solved', STATE.questionsSolved);
    localStorage.setItem('sm_english_q_correct', STATE.correctAnswers);

    // Update Category Counts
    updateCategoryCounts();
  }

  function updateCategoryCounts() {
    const counts = { all: ENGLISH_TOPICS.length, grammar: 0, vocabulary: 0, writing: 0, comprehension: 0, literature: 0 };
    ENGLISH_TOPICS.forEach(t => {
      if (counts[t.category] !== undefined) counts[t.category]++;
    });
    if (elements.countAll) elements.countAll.textContent = counts.all;
    if (elements.countGrammar) elements.countGrammar.textContent = counts.grammar;
    if (elements.countVocab) elements.countVocab.textContent = counts.vocabulary;
    if (elements.countWriting) elements.countWriting.textContent = counts.writing;
    if (elements.countComp) elements.countComp.textContent = counts.comprehension;
    if (elements.countLit) elements.countLit.textContent = counts.literature;
  }

  function addXP(amount, message) {
    STATE.xp += amount;
    updateUIStats();
    showToast(`+${amount} XP Earned! ${message || ''}`, 'zap');
  }

  function showToast(message, iconName = 'check-circle') {
    if (!elements.toast) return;
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('hidden');
    
    if (window.lucide) {
      elements.toastIcon.setAttribute('data-lucide', iconName);
      window.lucide.createIcons();
    }

    clearTimeout(elements.toast._timer);
    elements.toast._timer = setTimeout(() => {
      elements.toast.classList.add('hidden');
    }, 3200);
  }

  // =========================================================================
  // 4. TOPIC LIBRARY RENDERING & FILTERING
  // =========================================================================
  function renderTopicCards() {
    if (!elements.topicsGrid) return;
    elements.topicsGrid.innerHTML = '';

    const query = STATE.currentSearchQuery.toLowerCase().trim();
    const filteredTopics = ENGLISH_TOPICS.filter(topic => {
      // Category Filter
      if (STATE.currentFilterCategory !== 'all' && topic.category !== STATE.currentFilterCategory) {
        return false;
      }
      // Difficulty Filter
      if (STATE.currentDifficulty !== 'all' && topic.difficulty !== STATE.currentDifficulty) {
        return false;
      }
      // Bookmarked Only Filter
      if (STATE.onlyBookmarked && !STATE.bookmarks.includes(topic.id)) {
        return false;
      }
      // Search Query
      if (query) {
        const matchTitle = topic.title.toLowerCase().includes(query);
        const matchSummary = topic.summary.toLowerCase().includes(query);
        const matchCategory = topic.category.toLowerCase().includes(query);
        const matchRules = topic.rules.some(r => r.rule.toLowerCase().includes(query) || r.formula.toLowerCase().includes(query));
        return matchTitle || matchSummary || matchCategory || matchRules;
      }
      return true;
    });

    if (filteredTopics.length === 0) {
      elements.emptyState.classList.remove('hidden');
      return;
    } else {
      elements.emptyState.classList.add('hidden');
    }

    filteredTopics.forEach(topic => {
      const isCompleted = STATE.completedTopics.includes(topic.id);
      const isBookmarked = STATE.bookmarks.includes(topic.id);

      const card = document.createElement('div');
      card.className = `topic-card ${isCompleted ? 'completed' : ''}`;
      card.id = `card-${topic.id}`;

      // Pick first 2 objectives as micro highlights
      const highlightPills = topic.objectives.slice(0, 2).map(obj => 
        `<span class="micro-pill">${escapeHTML(obj.length > 45 ? obj.slice(0, 42) + '...' : obj)}</span>`
      ).join('');

      card.innerHTML = `
        <div class="topic-card-header">
          <div class="topic-card-badges">
            <span class="badge-cat ${topic.category}">${topic.category}</span>
            <span class="badge-difficulty ${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
          </div>
          <button class="btn-card-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-topic-id="${topic.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Save Topic'}">
            <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}"></i>
          </button>
        </div>

        <h3 class="topic-card-title">${escapeHTML(topic.title)}</h3>
        <p class="topic-card-desc">${escapeHTML(topic.summary)}</p>

        <div class="topic-card-highlights">
          <span class="highlight-label">Key Objectives:</span>
          <div class="highlight-pills">
            ${highlightPills}
          </div>
        </div>

        <div class="topic-card-footer">
          <div class="card-meta-left">
            <span><i data-lucide="clock"></i> ${topic.studyTime}</span>
            <span><i data-lucide="zap"></i> +${topic.xp} XP</span>
          </div>
          <button class="btn-open-topic" data-topic-id="${topic.id}">
            <span>${isCompleted ? 'Review Topic' : 'Start Study'}</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      `;

      elements.topicsGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderRecentActivity() {
    if (!elements.recentContainer) return;
    elements.recentContainer.innerHTML = '';

    // Take the active topic and 2 other topics as recent
    const active = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId) || ENGLISH_TOPICS[0];
    const recents = [
      active,
      ENGLISH_TOPICS.find(t => t.id === 'active-passive-voice') || ENGLISH_TOPICS[1],
      ENGLISH_TOPICS.find(t => t.id === 'essay-writing') || ENGLISH_TOPICS[2]
    ];

    recents.forEach(topic => {
      const isDone = STATE.completedTopics.includes(topic.id);
      const card = document.createElement('div');
      card.className = 'dock-card';
      card.innerHTML = `
        <div class="dock-card-left">
          <div class="dock-card-icon ${topic.category}">
            <i data-lucide="${getCategoryIcon(topic.category)}"></i>
          </div>
          <div class="dock-card-info">
            <h4>${escapeHTML(topic.title)}</h4>
            <div class="dock-card-meta">
              <span>${topic.difficulty}</span>
              <span>•</span>
              <span>${topic.studyTime}</span>
              <span>•</span>
              <span style="color: ${isDone ? '#10b981' : '#4f46e5'}">${isDone ? '✓ Mastered' : 'In Progress'}</span>
            </div>
          </div>
        </div>
        <button class="btn-resume" data-topic-id="${topic.id}">
          <i data-lucide="play"></i>
          <span>${isDone ? 'Review' : 'Resume'}</span>
        </button>
      `;
      elements.recentContainer.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function getCategoryIcon(cat) {
    switch (cat) {
      case 'grammar': return 'code-2';
      case 'vocabulary': return 'book';
      case 'writing': return 'pen-tool';
      case 'comprehension': return 'file-text';
      case 'literature': return 'feather';
      default: return 'book-open';
    }
  }

  // =========================================================================
  // 5. TOPIC READER / DIGITAL TEXTBOOK VIEW
  // =========================================================================
  function openTopicReader(topicId) {
    const topic = ENGLISH_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    STATE.activeTopicId = topic.id;
    localStorage.setItem('sm_english_active_topic', topic.id);

    // Update Reader Header & Meta
    if (elements.readerCatCrumb) elements.readerCatCrumb.textContent = capitalize(topic.category);
    if (elements.readerTitleCrumb) elements.readerTitleCrumb.textContent = topic.title;
    if (elements.readerSidebarTitle) elements.readerSidebarTitle.textContent = topic.title;
    if (elements.readerMetaDiff) {
      elements.readerMetaDiff.textContent = topic.difficulty;
      elements.readerMetaDiff.className = `badge-difficulty ${topic.difficulty.toLowerCase()}`;
    }
    if (elements.readerMetaTime) elements.readerMetaTime.innerHTML = `<i data-lucide="clock"></i> ${topic.studyTime}`;
    if (elements.readerMetaXp) elements.readerMetaXp.innerHTML = `<i data-lucide="zap"></i> +${topic.xp} XP`;

    // Hero in Reader
    if (elements.readerHeroCat) elements.readerHeroCat.textContent = `${capitalize(topic.category)} Module`;
    if (elements.readerHeroTitle) elements.readerHeroTitle.textContent = topic.title;
    if (elements.readerHeroDesc) elements.readerHeroDesc.textContent = topic.summary;

    // Bookmark State in Reader
    const isBookmarked = STATE.bookmarks.includes(topic.id);
    if (elements.btnReaderBookmark) {
      elements.btnReaderBookmark.classList.toggle('bookmarked', isBookmarked);
      elements.btnReaderBookmark.innerHTML = `
        <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}"></i>
        <span>${isBookmarked ? 'Saved' : 'Save'}</span>
      `;
    }

    // Mark Complete Button
    const isDone = STATE.completedTopics.includes(topic.id);
    if (elements.btnMarkComplete) {
      elements.btnMarkCompleteText.textContent = isDone ? 'Topic Completed (Marked)' : 'Mark Topic as Complete';
      elements.btnMarkComplete.className = isDone ? 'btn btn-primary w-full' : 'btn btn-outline-success w-full';
    }

    // 1. Objectives
    if (elements.readerObjectives) {
      elements.readerObjectives.innerHTML = topic.objectives.map(obj => `
        <li class="objective-item">
          <i data-lucide="check-circle-2" class="obj-icon"></i>
          <span class="obj-text">${escapeHTML(obj)}</span>
        </li>
      `).join('');
    }

    // 2. Detailed Notes
    if (elements.readerNotesBody) {
      elements.readerNotesBody.innerHTML = topic.detailedNotes;
    }

    // 3. Golden Rules
    if (elements.readerRulesBody) {
      elements.readerRulesBody.innerHTML = topic.rules.map(r => `
        <div class="rule-callout">
          <div class="rule-header">
            <i data-lucide="shield-alert"></i>
            <span>${escapeHTML(r.rule)}</span>
          </div>
          <div class="rule-body">
            <strong>Formula:</strong> ${escapeHTML(r.formula)}<br>
            <span style="color: #92400e; font-size: 0.82rem;">💡 ${escapeHTML(r.tip)}</span>
          </div>
        </div>
      `).join('');
    }

    // 4. Examples
    if (elements.readerExamplesBody) {
      elements.readerExamplesBody.innerHTML = topic.examples.map(ex => `
        <div class="example-item">
          <div class="example-header">
            <span class="example-label">${escapeHTML(ex.label)}</span>
          </div>
          <div class="example-sentence">"${escapeHTML(ex.sentence)}"</div>
          <div class="example-explanation">${escapeHTML(ex.explanation)}</div>
        </div>
      `).join('');
    }

    // 5. Common Mistakes
    if (elements.readerMistakesBody) {
      elements.readerMistakesBody.innerHTML = topic.mistakes.map(m => `
        <div class="mistake-box">
          <div class="mistake-row">
            <div class="wrong-side">
              <span class="label"><i data-lucide="x"></i> INCORRECT</span>
              <span class="text">"${escapeHTML(m.wrong)}"</span>
            </div>
            <div class="correct-side">
              <span class="label"><i data-lucide="check"></i> CORRECT</span>
              <span class="text">"${escapeHTML(m.correct)}"</span>
            </div>
          </div>
          <div class="mistake-why">
            <strong>Why:</strong> ${escapeHTML(m.why)}
          </div>
        </div>
      `).join('');
    }

    // 6. Quick Revision
    if (elements.readerRevisionList) {
      elements.readerRevisionList.innerHTML = topic.revision.map(rev => `
        <li class="revision-point">
          <i data-lucide="zap" class="revision-icon"></i>
          <span class="revision-text">${escapeHTML(rev)}</span>
        </li>
      `).join('');
    }

    // 7. Flashcards Setup
    STATE.flashcard.currentIndex = 0;
    STATE.flashcard.isFlipped = false;
    renderCurrentFlashcard(topic);

    // 8. Practice Drills Setup
    if (elements.readerPracticeBody) {
      elements.readerPracticeBody.innerHTML = topic.practiceDrills.map((drill, idx) => `
        <div class="practice-drill-box" id="drill-box-${idx}">
          <div class="drill-header">
            <span class="drill-title">Drill #${idx + 1}</span>
            <span style="font-size: 0.75rem; color: #4f46e5; font-weight: 700;">+10 XP</span>
          </div>
          <div class="drill-instruction">${escapeHTML(drill.instruction)}</div>
          <div style="font-weight: 600; color: #0f172a; margin-bottom: 0.75rem;">"${escapeHTML(drill.sentence)}"</div>
          <div class="drill-input-row">
            <input type="text" class="drill-input" id="drill-input-${idx}" placeholder="Type your answer..." />
            <button class="btn-check-drill" data-drill-idx="${idx}">Check</button>
          </div>
          <div id="drill-feedback-${idx}" class="drill-feedback hidden"></div>
        </div>
      `).join('');
    }

    // Update AI Tutor Context Label
    if (elements.aiTopicContextTag) {
      elements.aiTopicContextTag.textContent = `Context: ${topic.title} (${capitalize(topic.category)})`;
    }

    // Show Reader
    elements.readerView.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Reset Scroll & Progress
    if (elements.readerArticle) {
      elements.readerArticle.scrollTop = 0;
    }
    updateReadingProgress();

    // Re-render recent dock
    renderRecentActivity();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeTopicReader() {
    elements.readerView.classList.add('hidden');
    document.body.style.overflow = 'auto';
    renderTopicCards();
    renderRecentActivity();
  }

  function updateReadingProgress() {
    if (!elements.readerArticle) return;
    const { scrollTop, scrollHeight, clientHeight } = elements.readerArticle;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? Math.min(100, Math.round((scrollTop / maxScroll) * 100)) : 0;
    
    if (elements.readingProgressFill) elements.readingProgressFill.style.width = `${progress}%`;
    if (elements.readingProgressText) elements.readingProgressText.textContent = `${progress}%`;
  }

  // =========================================================================
  // 6. FLASHCARD DECK ENGINE (3D Flip & Navigation)
  // =========================================================================
  function renderCurrentFlashcard(topic) {
    if (!topic || !topic.flashcards || topic.flashcards.length === 0) return;
    
    const card = topic.flashcards[STATE.flashcard.currentIndex];
    const total = topic.flashcards.length;

    if (elements.flashcardCurrentIdx) elements.flashcardCurrentIdx.textContent = STATE.flashcard.currentIndex + 1;
    if (elements.flashcardTotalCount) elements.flashcardTotalCount.textContent = total;

    if (elements.flashcardFrontText) elements.flashcardFrontText.textContent = card.front;
    if (elements.flashcardBackText) elements.flashcardBackText.innerHTML = card.back;
    if (elements.flashcardBackCat) elements.flashcardBackCat.textContent = card.category || 'Rule';

    if (elements.activeFlashcard) {
      elements.activeFlashcard.classList.toggle('is-flipped', STATE.flashcard.isFlipped);
    }
  }

  function flipFlashcard() {
    STATE.flashcard.isFlipped = !STATE.flashcard.isFlipped;
    if (elements.activeFlashcard) {
      elements.activeFlashcard.classList.toggle('is-flipped', STATE.flashcard.isFlipped);
    }
  }

  function nextFlashcard() {
    const topic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId);
    if (!topic || !topic.flashcards) return;

    STATE.flashcard.isFlipped = false;
    STATE.flashcard.currentIndex = (STATE.flashcard.currentIndex + 1) % topic.flashcards.length;
    renderCurrentFlashcard(topic);
  }

  function prevFlashcard() {
    const topic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId);
    if (!topic || !topic.flashcards) return;

    STATE.flashcard.isFlipped = false;
    STATE.flashcard.currentIndex = (STATE.flashcard.currentIndex - 1 + topic.flashcards.length) % topic.flashcards.length;
    renderCurrentFlashcard(topic);
  }

  // =========================================================================
  // 7. INTERACTIVE PRACTICE DRILLS VERIFICATION
  // =========================================================================
  function handleDrillCheck(drillIdx) {
    const topic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId);
    if (!topic || !topic.practiceDrills[drillIdx]) return;

    const drill = topic.practiceDrills[drillIdx];
    const inputEl = document.getElementById(`drill-input-${drillIdx}`);
    const feedbackEl = document.getElementById(`drill-feedback-${drillIdx}`);
    if (!inputEl || !feedbackEl) return;

    const userVal = inputEl.value.trim().toLowerCase();
    const correctVal = drill.answer.trim().toLowerCase();

    feedbackEl.classList.remove('hidden', 'correct', 'incorrect');

    if (userVal === correctVal || (userVal && correctVal.includes(userVal))) {
      feedbackEl.classList.add('correct');
      feedbackEl.innerHTML = `✓ <strong>Correct!</strong> ${escapeHTML(drill.explanation)}`;
      addXP(10, 'Practice Drill Mastered!');
    } else {
      feedbackEl.classList.add('incorrect');
      feedbackEl.innerHTML = `✗ <strong>Not quite.</strong> Correct answer: <em>"${escapeHTML(drill.answer)}"</em>.<br>${escapeHTML(drill.explanation)}`;
    }
  }

  // =========================================================================
  // 8. QUIZ ARENA / MOCK TEST ENGINE
  // =========================================================================
  function startTopicQuiz(topicId) {
    const topic = ENGLISH_TOPICS.find(t => t.id === topicId) || ENGLISH_TOPICS[0];
    
    STATE.quiz.activeTopic = topic;
    STATE.quiz.questions = [...topic.mcqs];
    STATE.quiz.currentIndex = 0;
    STATE.quiz.userAnswers = {};
    STATE.quiz.timeRemaining = 180; // 3 minutes for 5 questions
    STATE.quiz.isActive = true;

    // Header updates
    if (elements.quizTitleBadge) elements.quizTitleBadge.textContent = `${capitalize(topic.category)} Quiz`;
    if (elements.quizActiveTitle) elements.quizActiveTitle.textContent = topic.title;
    if (elements.quizTotalQNum) elements.quizTotalQNum.textContent = STATE.quiz.questions.length;

    // Show modal
    elements.quizModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Start Timer
    startQuizTimer();

    // Render Question 1
    renderQuizQuestion();
  }

  function startFullPracticeMockTest() {
    // Combine 10 questions across multiple topics
    const fullQuestions = [];
    ENGLISH_TOPICS.forEach(t => {
      if (t.mcqs && t.mcqs.length > 0) {
        fullQuestions.push({ ...t.mcqs[0], topicTitle: t.title });
      }
    });

    STATE.quiz.activeTopic = { title: 'Senior Secondary Comprehensive Mock Test', category: 'Exam Paper' };
    STATE.quiz.questions = fullQuestions.slice(0, 10);
    STATE.quiz.currentIndex = 0;
    STATE.quiz.userAnswers = {};
    STATE.quiz.timeRemaining = 600; // 10 minutes
    STATE.quiz.isActive = true;

    if (elements.quizTitleBadge) elements.quizTitleBadge.textContent = 'All-Syllabus Mock Test';
    if (elements.quizActiveTitle) elements.quizActiveTitle.textContent = 'Comprehensive English Exam Drill';
    if (elements.quizTotalQNum) elements.quizTotalQNum.textContent = STATE.quiz.questions.length;

    elements.quizModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    startQuizTimer();
    renderQuizQuestion();
  }

  function startQuizTimer() {
    clearInterval(STATE.quiz.timerInterval);
    updateQuizTimerDisplay();

    STATE.quiz.timerInterval = setInterval(() => {
      STATE.quiz.timeRemaining--;
      updateQuizTimerDisplay();

      if (STATE.quiz.timeRemaining <= 0) {
        clearInterval(STATE.quiz.timerInterval);
        submitQuiz();
      }
    }, 1000);
  }

  function updateQuizTimerDisplay() {
    if (!elements.quizTimerDisplay) return;
    const mins = Math.floor(STATE.quiz.timeRemaining / 60);
    const secs = STATE.quiz.timeRemaining % 60;
    elements.quizTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function renderQuizQuestion() {
    const qIndex = STATE.quiz.currentIndex;
    const question = STATE.quiz.questions[qIndex];
    if (!question) return;

    const totalQ = STATE.quiz.questions.length;
    const selectedAnswer = STATE.quiz.userAnswers[qIndex];
    const isAnswered = selectedAnswer !== undefined;

    // Progress bar
    if (elements.quizProgressFill) {
      const pct = Math.round(((qIndex + 1) / totalQ) * 100);
      elements.quizProgressFill.style.width = `${pct}%`;
    }

    if (elements.quizCurrentQNum) elements.quizCurrentQNum.textContent = qIndex + 1;
    if (elements.quizQuestionText) elements.quizQuestionText.textContent = question.question;

    // Options Rendering
    if (elements.quizOptionsContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      elements.quizOptionsContainer.innerHTML = question.options.map((opt, optIdx) => {
        let optionClass = 'option-btn';
        if (isAnswered) {
          optionClass += ' disabled';
          if (optIdx === question.answerIndex) {
            optionClass += ' correct';
          } else if (optIdx === selectedAnswer) {
            optionClass += ' incorrect';
          }
        } else if (optIdx === selectedAnswer) {
          optionClass += ' selected';
        }

        return `
          <button class="${optionClass}" data-opt-idx="${optIdx}">
            <span class="option-letter">${letters[optIdx]}</span>
            <span class="option-text">${escapeHTML(opt)}</span>
          </button>
        `;
      }).join('');
    }

    // Instant Explanation Reveal
    if (elements.quizInstantExp) {
      if (isAnswered) {
        elements.quizInstantExp.classList.remove('hidden');
        const isCorrect = selectedAnswer === question.answerIndex;
        if (elements.quizExpStatus) {
          elements.quizExpStatus.textContent = isCorrect ? '✓ Correct Answer!' : '✗ Explanation for Correction';
          elements.quizExpStatus.style.color = isCorrect ? '#065f46' : '#9f1239';
        }
        if (elements.quizExpText) {
          elements.quizExpText.textContent = question.explanation;
        }
      } else {
        elements.quizInstantExp.classList.add('hidden');
      }
    }

    // Footer Buttons
    if (elements.btnQuizPrev) elements.btnQuizPrev.disabled = qIndex === 0;
    if (elements.btnQuizNextLabel) {
      elements.btnQuizNextLabel.textContent = qIndex === totalQ - 1 ? 'Finish & See Results' : 'Next Question';
    }

    // Answered Count
    const answeredCount = Object.keys(STATE.quiz.userAnswers).length;
    if (elements.quizAnsweredCount) {
      elements.quizAnsweredCount.textContent = `Answered: ${answeredCount} / ${totalQ}`;
    }
  }

  function handleOptionSelect(optIdx) {
    const qIndex = STATE.quiz.currentIndex;
    if (STATE.quiz.userAnswers[qIndex] !== undefined) return; // already answered

    STATE.quiz.userAnswers[qIndex] = optIdx;
    STATE.questionsSolved++;

    const question = STATE.quiz.questions[qIndex];
    if (optIdx === question.answerIndex) {
      STATE.correctAnswers++;
      addXP(10, 'Correct Answer!');
    }

    updateUIStats();
    renderQuizQuestion();
  }

  function handleNextQuizQuestion() {
    const qIndex = STATE.quiz.currentIndex;
    const totalQ = STATE.quiz.questions.length;

    if (qIndex < totalQ - 1) {
      STATE.quiz.currentIndex++;
      renderQuizQuestion();
    } else {
      submitQuiz();
    }
  }

  function handlePrevQuizQuestion() {
    if (STATE.quiz.currentIndex > 0) {
      STATE.quiz.currentIndex--;
      renderQuizQuestion();
    }
  }

  function submitQuiz() {
    clearInterval(STATE.quiz.timerInterval);
    elements.quizModal.classList.add('hidden');

    const total = STATE.quiz.questions.length;
    let score = 0;
    STATE.quiz.questions.forEach((q, idx) => {
      if (STATE.quiz.userAnswers[idx] === q.answerIndex) {
        score++;
      }
    });

    const percentage = Math.round((score / total) * 100);
    const xpGained = score * 10 + 20;
    addXP(xpGained, 'Quiz Completed!');

    // Show Results Modal
    if (elements.resScoreText) elements.resScoreText.textContent = `${score} / ${total}`;
    if (elements.resAccuracyText) elements.resAccuracyText.textContent = `${percentage}%`;
    if (elements.resXpText) elements.resXpText.textContent = `+${xpGained} XP`;
    
    const timeUsed = 300 - STATE.quiz.timeRemaining;
    const mins = Math.floor(timeUsed / 60);
    const secs = timeUsed % 60;
    if (elements.resTimeText) elements.resTimeText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (elements.resultsHeadline) {
      elements.resultsHeadline.textContent = percentage >= 80 ? 'Outstanding Mastery!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!';
    }
    if (elements.resultsSubheadline) {
      elements.resultsSubheadline.textContent = percentage >= 80 
        ? 'You have demonstrated strong command of this topic!' 
        : 'Review the detailed explanations below to cement your understanding.';
    }

    // Detailed Review List
    if (elements.resultsReviewList) {
      const letters = ['A', 'B', 'C', 'D'];
      elements.resultsReviewList.innerHTML = STATE.quiz.questions.map((q, idx) => {
        const userAnsIdx = STATE.quiz.userAnswers[idx];
        const isCorrect = userAnsIdx === q.answerIndex;
        const userAnsText = userAnsIdx !== undefined ? `${letters[userAnsIdx]}. ${q.options[userAnsIdx]}` : 'Not Answered';
        const correctAnsText = `${letters[q.answerIndex]}. ${q.options[q.answerIndex]}`;

        return `
          <div class="review-card ${isCorrect ? 'is-correct' : 'is-wrong'}">
            <div class="review-q-header">
              <span class="review-q-title">Q${idx + 1}: ${escapeHTML(q.question)}</span>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${isCorrect ? '#059669' : '#e11d48'}">
                ${isCorrect ? '✓ Correct (+10 XP)' : '✗ Incorrect'}
              </span>
            </div>
            <div class="review-answers-grid">
              <div class="user-ans"><strong>Your Answer:</strong> ${escapeHTML(userAnsText)}</div>
              <div class="correct-ans"><strong>Correct:</strong> ${escapeHTML(correctAnsText)}</div>
            </div>
            <div class="review-exp"><strong>Explanation:</strong> ${escapeHTML(q.explanation)}</div>
          </div>
        `;
      }).join('');
    }

    elements.resultsModal.classList.remove('hidden');
  }

  function exitQuiz() {
    clearInterval(STATE.quiz.timerInterval);
    elements.quizModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // =========================================================================
  // 9. AI ENGLISH TUTOR ENGINE (Context-Aware Responses)
  // =========================================================================
  function toggleAiDrawer(open = true) {
    if (open) {
      elements.aiDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      const activeTopic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId) || ENGLISH_TOPICS[0];
      if (elements.aiTopicContextTag) {
        elements.aiTopicContextTag.textContent = `Context: ${activeTopic.title}`;
      }
    } else {
      elements.aiDrawer.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  function handleAiChipAction(action) {
    const activeTopic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId) || ENGLISH_TOPICS[0];
    let prompt = '';

    switch (action) {
      case 'explain':
        prompt = `Explain ${activeTopic.title} with simple analogies and real-world board exam examples.`;
        break;
      case 'summarize':
        prompt = `Give me a 3-bullet golden rule summary of ${activeTopic.title}.`;
        break;
      case 'mistakes':
        prompt = `What are the most common exam traps students fall into regarding ${activeTopic.title}?`;
        break;
      case 'testme':
        prompt = `Generate a tricky board-level MCQ question on ${activeTopic.title}.`;
        break;
      case 'checkgrammar':
        prompt = `Analyze this sentence for tense consistency and subject-verb agreement.`;
        break;
      default:
        prompt = `Tell me more about ${activeTopic.title}.`;
    }

    submitAiPrompt(prompt);
  }

  function submitAiPrompt(promptText) {
    if (!promptText || !promptText.trim()) return;

    // Append User Message
    appendAiMessage('user', promptText);
    if (elements.aiPromptInput) elements.aiPromptInput.value = '';

    // Generate Curriculum-Aware Response
    const activeTopic = ENGLISH_TOPICS.find(t => t.id === STATE.activeTopicId) || ENGLISH_TOPICS[0];
    
    // Simulate intelligent educational synthesis based on curriculum
    setTimeout(() => {
      const responseHtml = generateEducationalResponse(promptText, activeTopic);
      appendAiMessage('assistant', responseHtml);
    }, 450);
  }

  function generateEducationalResponse(prompt, topic) {
    const p = prompt.toLowerCase();

    if (p.includes('3-bullet') || p.includes('summary')) {
      return `
        <p>Here is your high-yield summary for <strong>${topic.title}</strong>:</p>
        <ul>
          <li><strong>Rule 1:</strong> ${escapeHTML(topic.rules[0]?.rule || 'Maintain strict tense and agreement harmony.')}</li>
          <li><strong>Formula:</strong> <code>${escapeHTML(topic.rules[0]?.formula || 'Subject + Verb + Object')}</code></li>
          <li><strong>Exam Strategy:</strong> ${escapeHTML(topic.revision[0] || 'Carefully check time adverbs before picking verb forms.')}</li>
        </ul>
      `;
    }

    if (p.includes('mistake') || p.includes('trap')) {
      const m = topic.mistakes[0];
      return `
        <p><strong>Top Exam Trap for ${topic.title}:</strong></p>
        <p>❌ <em>"${escapeHTML(m?.wrong || 'Incorrect usage')}"</em><br>
        ✅ <em>"${escapeHTML(m?.correct || 'Correct usage')}"</em></p>
        <p><strong>Why:</strong> ${escapeHTML(m?.why || 'Violates concord rules.')}</p>
      `;
    }

    if (p.includes('question') || p.includes('test me')) {
      const q = topic.mcqs[0];
      return `
        <p><strong>Challenge Question:</strong></p>
        <p>${escapeHTML(q.question)}</p>
        <ul>
          ${q.options.map((opt, i) => `<li><strong>${['A','B','C','D'][i]}:</strong> ${escapeHTML(opt)}</li>`).join('')}
        </ul>
        <p><em>(Hint: Review the rule: ${escapeHTML(q.ruleRef)})</em></p>
      `;
    }

    // Default In-depth Explanation
    return `
      <p><strong>EduNexa AI Insight on ${topic.title}:</strong></p>
      <p>${escapeHTML(topic.summary)}</p>
      <p><strong>Key Concept:</strong> ${escapeHTML(topic.objectives[0] || 'Understand structural grammar rules.')}</p>
      <p>💡 <em>Tip: You can take the 5-question topic quiz in the reader view to earn +50 XP!</em></p>
    `;
  }

  function appendAiMessage(sender, contentHtml) {
    if (!elements.aiMessagesFeed) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;
    
    msgEl.innerHTML = `
      <div class="msg-avatar">
        <i data-lucide="${sender === 'user' ? 'user' : 'sparkles'}"></i>
      </div>
      <div class="msg-bubble">
        ${contentHtml}
      </div>
    `;

    elements.aiMessagesFeed.appendChild(msgEl);
    elements.aiMessagesFeed.scrollTop = elements.aiMessagesFeed.scrollHeight;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // =========================================================================
  // 10. BOOKMARK DRAWER & ACTIONS
  // =========================================================================
  function toggleBookmarksDrawer(open = true) {
    if (open) {
      renderBookmarksList();
      elements.bookmarksDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      elements.bookmarksDrawer.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  function renderBookmarksList() {
    if (!elements.bookmarksListContainer) return;
    elements.bookmarksListContainer.innerHTML = '';

    if (STATE.bookmarks.length === 0) {
      elements.bookmarksListContainer.innerHTML = `
        <div style="text-align: center; color: #64748b; padding: 2rem 0;">
          <i data-lucide="bookmark" style="width: 36px; height: 36px; margin-bottom: 0.5rem; color: #94a3b8;"></i>
          <p>No saved topics yet.</p>
          <span style="font-size: 0.8rem;">Click the bookmark icon on any topic card to save it for quick revision.</span>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    STATE.bookmarks.forEach(topicId => {
      const topic = ENGLISH_TOPICS.find(t => t.id === topicId);
      if (!topic) return;

      const item = document.createElement('div');
      item.className = 'bm-item';
      item.innerHTML = `
        <div class="bm-item-info">
          <h4>${escapeHTML(topic.title)}</h4>
          <span>${capitalize(topic.category)} • ${topic.difficulty}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary btn-sm" data-action="open-bm" data-topic-id="${topic.id}">Study</button>
          <button class="btn-remove-bm" data-action="remove-bm" data-topic-id="${topic.id}" title="Remove">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
      elements.bookmarksListContainer.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function toggleTopicBookmark(topicId) {
    const idx = STATE.bookmarks.indexOf(topicId);
    if (idx >= 0) {
      STATE.bookmarks.splice(idx, 1);
      showToast('Removed from Bookmarks', 'bookmark');
    } else {
      STATE.bookmarks.push(topicId);
      showToast('Saved to Bookmarks!', 'bookmark-check');
    }
    updateUIStats();
    renderTopicCards();

    // If reader is currently open for this topic, update its bookmark button
    if (STATE.activeTopicId === topicId && elements.btnReaderBookmark) {
      const isSaved = STATE.bookmarks.includes(topicId);
      elements.btnReaderBookmark.classList.toggle('bookmarked', isSaved);
      elements.btnReaderBookmark.innerHTML = `
        <i data-lucide="${isSaved ? 'bookmark-check' : 'bookmark'}"></i>
        <span>${isSaved ? 'Saved' : 'Save'}</span>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  // =========================================================================
  // 11. EVENT LISTENERS & DELEGATION
  // =========================================================================

  // Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      STATE.currentSearchQuery = e.target.value;
      if (elements.btnClearSearch) {
        elements.btnClearSearch.classList.toggle('hidden', !STATE.currentSearchQuery);
      }
      renderTopicCards();
    });
  }

  if (elements.btnClearSearch) {
    elements.btnClearSearch.addEventListener('click', () => {
      STATE.currentSearchQuery = '';
      if (elements.searchInput) elements.searchInput.value = '';
      elements.btnClearSearch.classList.add('hidden');
      renderTopicCards();
    });
  }

  // Category Filter Pills
  if (elements.categoryGroup) {
    elements.categoryGroup.addEventListener('click', (e) => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;

      elements.categoryGroup.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      STATE.currentFilterCategory = pill.dataset.category || 'all';
      renderTopicCards();
    });
  }

  // Difficulty Filter
  if (elements.difficultySelect) {
    elements.difficultySelect.addEventListener('change', (e) => {
      STATE.currentDifficulty = e.target.value;
      renderTopicCards();
    });
  }

  // Filter Bookmarks Only
  if (elements.btnFilterBookmarks) {
    elements.btnFilterBookmarks.addEventListener('click', () => {
      STATE.onlyBookmarked = !STATE.onlyBookmarked;
      elements.btnFilterBookmarks.classList.toggle('active', STATE.onlyBookmarked);
      renderTopicCards();
    });
  }

  // Reset Filters
  if (elements.btnResetFilters) {
    elements.btnResetFilters.addEventListener('click', () => {
      STATE.currentSearchQuery = '';
      STATE.currentFilterCategory = 'all';
      STATE.currentDifficulty = 'all';
      STATE.onlyBookmarked = false;

      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.difficultySelect) elements.difficultySelect.value = 'all';
      if (elements.btnFilterBookmarks) elements.btnFilterBookmarks.classList.remove('active');
      if (elements.categoryGroup) {
        elements.categoryGroup.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        elements.categoryGroup.querySelector('[data-category="all"]')?.classList.add('active');
      }

      renderTopicCards();
    });
  }

  // Quick Action Hero Buttons
  if (elements.btnHeroContinue) {
    elements.btnHeroContinue.addEventListener('click', () => {
      openTopicReader(STATE.activeTopicId || 'tenses');
    });
  }

  if (elements.btnHeroMockTest || elements.btnQuickMockTest) {
    const handler = () => startFullPracticeMockTest();
    if (elements.btnHeroMockTest) elements.btnHeroMockTest.addEventListener('click', handler);
    if (elements.btnQuickMockTest) elements.btnQuickMockTest.addEventListener('click', handler);
  }

  if (elements.btnHeroFlashcards || elements.btnQuickFlashcards) {
    const handler = () => {
      openTopicReader(STATE.activeTopicId || 'tenses');
      setTimeout(() => {
        document.getElementById('toc-flashcards')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };
    if (elements.btnHeroFlashcards) elements.btnHeroFlashcards.addEventListener('click', handler);
    if (elements.btnQuickFlashcards) elements.btnQuickFlashcards.addEventListener('click', handler);
  }

  // Topic Card / Recent Dock delegation
  document.addEventListener('click', (e) => {
    // Open Topic Reader
    const openBtn = e.target.closest('.btn-open-topic') || e.target.closest('.btn-resume');
    if (openBtn && openBtn.dataset.topicId) {
      openTopicReader(openBtn.dataset.topicId);
      return;
    }

    // Bookmark Toggle on Card
    const bmBtn = e.target.closest('.btn-card-bookmark');
    if (bmBtn && bmBtn.dataset.topicId) {
      toggleTopicBookmark(bmBtn.dataset.topicId);
      return;
    }

    // Bookmarks Drawer item actions
    const bmAction = e.target.closest('[data-action="open-bm"]');
    if (bmAction && bmAction.dataset.topicId) {
      toggleBookmarksDrawer(false);
      openTopicReader(bmAction.dataset.topicId);
      return;
    }
    const rmAction = e.target.closest('[data-action="remove-bm"]');
    if (rmAction && rmAction.dataset.topicId) {
      toggleTopicBookmark(rmAction.dataset.topicId);
      renderBookmarksList();
      return;
    }
  });

  // Reader Header Actions
  if (elements.btnCloseReader) elements.btnCloseReader.addEventListener('click', closeTopicReader);

  if (elements.btnReaderBookmark) {
    elements.btnReaderBookmark.addEventListener('click', () => {
      toggleTopicBookmark(STATE.activeTopicId);
    });
  }

  // Reader Font Size Toggle (16px → 18px → 20px → 16px)
  if (elements.btnReaderFontToggle) {
    elements.btnReaderFontToggle.addEventListener('click', () => {
      if (STATE.fontSize === 16) STATE.fontSize = 18;
      else if (STATE.fontSize === 18) STATE.fontSize = 20;
      else STATE.fontSize = 16;

      if (elements.readerArticle) elements.readerArticle.style.fontSize = `${STATE.fontSize}px`;
      if (elements.readerFontSizeLabel) elements.readerFontSizeLabel.textContent = `${STATE.fontSize}px`;
      showToast(`Reader font size: ${STATE.fontSize}px`, 'type');
    });
  }

  if (elements.btnReaderAiAssist || elements.btnQuickAiTutor) {
    const handler = () => toggleAiDrawer(true);
    if (elements.btnReaderAiAssist) elements.btnReaderAiAssist.addEventListener('click', handler);
    if (elements.btnQuickAiTutor) elements.btnQuickAiTutor.addEventListener('click', handler);
  }

  // Mark Topic Complete Button
  if (elements.btnMarkComplete) {
    elements.btnMarkComplete.addEventListener('click', () => {
      const isDone = STATE.completedTopics.includes(STATE.activeTopicId);
      if (isDone) {
        const idx = STATE.completedTopics.indexOf(STATE.activeTopicId);
        STATE.completedTopics.splice(idx, 1);
        showToast('Topic marked as in-progress', 'rotate-ccw');
      } else {
        STATE.completedTopics.push(STATE.activeTopicId);
        addXP(50, 'Topic Mastered!');
      }
      updateUIStats();
      openTopicReader(STATE.activeTopicId); // re-sync reader
    });
  }

  // Reader Quick Action Jumps
  if (elements.btnJumpQuiz) {
    elements.btnJumpQuiz.addEventListener('click', () => {
      startTopicQuiz(STATE.activeTopicId);
    });
  }
  if (elements.btnStartTopicQuiz) {
    elements.btnStartTopicQuiz.addEventListener('click', () => {
      startTopicQuiz(STATE.activeTopicId);
    });
  }
  if (elements.btnJumpFlashcards) {
    elements.btnJumpFlashcards.addEventListener('click', () => {
      document.getElementById('toc-flashcards')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (elements.btnAskAiSummary) {
    elements.btnAskAiSummary.addEventListener('click', () => {
      toggleAiDrawer(true);
      handleAiChipAction('summarize');
    });
  }

  // Article Scroll Progress
  if (elements.readerArticle) {
    elements.readerArticle.addEventListener('scroll', updateReadingProgress);
  }

  // Flashcard Deck Interactions
  if (elements.activeFlashcard) {
    elements.activeFlashcard.addEventListener('click', flipFlashcard);
    elements.activeFlashcard.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        flipFlashcard();
      }
    });
  }
  if (elements.btnFlashcardPrev) elements.btnFlashcardPrev.addEventListener('click', prevFlashcard);
  if (elements.btnFlashcardNext) elements.btnFlashcardNext.addEventListener('click', nextFlashcard);
  if (elements.btnCardGotIt) {
    elements.btnCardGotIt.addEventListener('click', () => {
      addXP(5, 'Flashcard Recall Verified!');
      nextFlashcard();
    });
  }
  if (elements.btnCardNeedReview) {
    elements.btnCardNeedReview.addEventListener('click', () => {
      showToast('Card marked for review', 'bookmark');
      nextFlashcard();
    });
  }

  // Practice Drills verification delegation
  if (elements.readerPracticeBody) {
    elements.readerPracticeBody.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-check-drill');
      if (btn && btn.dataset.drillIdx !== undefined) {
        handleDrillCheck(parseInt(btn.dataset.drillIdx, 10));
      }
    });
  }

  // Quiz Arena Options & Navigation
  if (elements.quizOptionsContainer) {
    elements.quizOptionsContainer.addEventListener('click', (e) => {
      const optBtn = e.target.closest('.option-btn');
      if (optBtn && optBtn.dataset.optIdx !== undefined) {
        handleOptionSelect(parseInt(optBtn.dataset.optIdx, 10));
      }
    });
  }

  if (elements.btnQuizNext) elements.btnQuizNext.addEventListener('click', handleNextQuizQuestion);
  if (elements.btnQuizPrev) elements.btnQuizPrev.addEventListener('click', handlePrevQuizQuestion);
  if (elements.btnExitQuiz) elements.btnExitQuiz.addEventListener('click', exitQuiz);

  // Results Actions
  if (elements.btnRetryQuiz) {
    elements.btnRetryQuiz.addEventListener('click', () => {
      elements.resultsModal.classList.add('hidden');
      startTopicQuiz(STATE.activeTopicId);
    });
  }
  if (elements.btnReturnToTopics) {
    elements.btnReturnToTopics.addEventListener('click', () => {
      elements.resultsModal.classList.add('hidden');
      closeTopicReader();
    });
  }

  // AI Drawer Interactions
  if (elements.btnCloseAiDrawer) elements.btnCloseAiDrawer.addEventListener('click', () => toggleAiDrawer(false));
  if (elements.aiDrawerOverlay) elements.aiDrawerOverlay.addEventListener('click', () => toggleAiDrawer(false));

  if (elements.aiPromptChips) {
    elements.aiPromptChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (chip && chip.dataset.action) {
        handleAiChipAction(chip.dataset.action);
      }
    });
  }

  if (elements.aiChatForm) {
    elements.aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = elements.aiPromptInput?.value || '';
      submitAiPrompt(val);
    });
  }

  // Bookmarks Drawer
  if (elements.btnOpenBookmarks) elements.btnOpenBookmarks.addEventListener('click', () => toggleBookmarksDrawer(true));
  if (elements.btnCloseBookmarks) elements.btnCloseBookmarks.addEventListener('click', () => toggleBookmarksDrawer(false));
  if (elements.bookmarksOverlay) elements.bookmarksOverlay.addEventListener('click', () => toggleBookmarksDrawer(false));

  // Helper Escape Function
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // =========================================================================
  // 12. INITIAL APPLICATION BOOTSTRAP
  // =========================================================================
  updateUIStats();
  renderTopicCards();
  renderRecentActivity();
});
