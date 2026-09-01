/**
 * ==========================================================================
 * PUNCTUATION MASTERY - COMPLETE CORE SCRIPT (punctuation.js)
 * ==========================================================================
 * Contains all 21 detailed lessons, meaning comparisons, quiz engine,
 * interactive flashcards, error fixer lab, bookmarks, search & progress.
 */

// --- 1. FULL CURRICULUM DATABASE (ALL 21 DETAILED NOTES) ---
const PUNCTUATION_DATABASE = [
  {
    id: 1,
    slug: 'what-is-punctuation',
    title: '1. What Is Punctuation?',
    symbol: '§',
    category: 'Fundamentals',
    summary: 'The traffic signal system of written language that organizes ideas and prevents confusion.',
    definition: 'Punctuation is the system of marks used in written language to organize ideas, show relationships between words and clauses, indicate pauses, and make meaning clear.',
    whyItMatters: 'Without punctuation, even a simple sentence can become difficult or accidentally comedic. For example, "Let\'s eat students" sounds like cannibalism, while "Let\'s eat, students." is a polite lunchtime invitation.',
    rules: [
      {
        heading: 'Why Punctuation Matters',
        points: [
          'Tells the reader where a sentence begins and ends.',
          'Signals where a question begins and ends.',
          'Clarifies which ideas belong together in logical harmony.',
          'Marks where supplementary or parenthetical information starts.',
          'Distinguishes direct address (who is being spoken to).',
          'Indicates whether words show possession or contraction.',
          'Identifies where direct speech begins and ends.'
        ]
      }
    ],
    examples: [
      { text: "Without punctuation: Let's eat students", type: 'incorrect', note: 'Unintended cannibalistic meaning!' },
      { text: "With punctuation: Let's eat, students.", type: 'correct', note: 'Direct address comma clarifies lunchtime invitation.' }
    ],
    proTip: 'Think of punctuation marks as the vocal gestures, pauses, and tone inflections of written language.'
  },
  {
    id: 2,
    slug: 'full-stop',
    title: '2. Full Stop (Period) — .',
    symbol: '.',
    category: 'Terminators',
    summary: 'Marks the definitive end of a complete declarative statement.',
    definition: 'A full stop marks the end of a complete statement of fact, thought, or certain abbreviations.',
    rules: [
      {
        heading: 'Uses of the Full Stop',
        points: [
          'At the end of declarative sentences and commands.',
          'At the end of many standard abbreviations (e.g., Dr., Prof., etc., e.g., i.e.).',
          'After certain initials in names (e.g., C. S. Lewis, J. K. Rowling).'
        ]
      }
    ],
    examples: [
      { text: 'The students completed the assignment.', type: 'correct', note: 'Declarative sentence' },
      { text: 'She studies English every evening.', type: 'correct', note: 'Complete statement' },
      { text: 'Dr. Ahmed is a researcher.', type: 'correct', note: 'Abbreviation & terminal stop' }
    ],
    commonMistakes: [
      {
        incorrect: 'She went to the library',
        correct: 'She went to the library.',
        explanation: 'If the sentence forms a complete thought, it MUST have a closing terminal punctuation mark.'
      }
    ],
    proTip: 'In British English, abbreviations retaining the first and last letters (like Dr or Mr) often omit the dot, while American style consistently retains it.'
  },
  {
    id: 3,
    slug: 'question-mark',
    title: '3. Question Mark — ?',
    symbol: '?',
    category: 'Terminators',
    summary: 'Used strictly at the end of direct inquiries.',
    definition: 'A question mark replaces a full stop at the end of a direct question.',
    rules: [
      {
        heading: 'Direct vs. Indirect Questions',
        points: [
          'Direct Question: Asks directly for information and MUST end with a question mark (e.g., "Where are you going?").',
          'Indirect Question: Reports a question within a declarative sentence and normally ends with a full stop (e.g., "I asked where the laboratory was.").',
          'Rhetorical Questions: Still take a question mark despite not expecting an answer.',
          'Important: Don\'t add a question mark simply because a sentence contains a question word (who, what, where, why).'
        ]
      }
    ],
    examples: [
      { text: 'Where are you going?', type: 'correct', note: 'Direct question' },
      { text: 'Did you finish the assignment?', type: 'correct', note: 'Direct inquiry' },
      { text: 'Why is the experiment important?', type: 'correct', note: 'Direct question' },
      { text: 'I asked where the laboratory was.', type: 'correct', note: 'Indirect question — ends with full stop' }
    ],
    commonMistakes: [
      {
        incorrect: 'I asked him what time it was?',
        correct: 'I asked him what time it was.',
        explanation: 'This is an indirect statement reporting a past inquiry, not a direct question.'
      }
    ],
    memoryTrick: 'If you want an answer right now from the reader, use "?". If you are merely reporting what happened, use ".".'
  },
  {
    id: 4,
    slug: 'exclamation-mark',
    title: '4. Exclamation Mark — !',
    symbol: '!',
    category: 'Terminators',
    summary: 'Expresses strong emotion, surprise, urgency, or emphasis.',
    definition: 'An exclamation mark expresses intense feeling, shock, enthusiasm, anger, or strong warning.',
    rules: [
      {
        heading: 'Appropriate Usages',
        points: [
          'Surprise or astonishment (e.g., "What an incredible result!").',
          'Urgent warnings and commands (e.g., "Be careful!").',
          'Excitement or strong feeling (e.g., "That was amazing!").',
          'Formal writing rule: In formal academic essays, exclamation marks should be used very sparingly.'
        ]
      }
    ],
    examples: [
      { text: 'What an incredible result!', type: 'correct', note: 'Joy and astonishment' },
      { text: 'Be careful!', type: 'correct', note: 'Urgent warning' },
      { text: 'That was amazing!', type: 'correct', note: 'Strong feeling' }
    ],
    commonMistakes: [
      {
        incorrect: 'The data showed huge growth!!!!!',
        correct: 'The data showed substantial growth.',
        explanation: 'Avoid multiple exclamation marks in academic or professional communications.'
      }
    ],
    proTip: 'Use strong descriptive verbs instead of relying on exclamation points to inject energy into writing.'
  },
  {
    id: 5,
    slug: 'comma',
    title: '5. Comma — ,',
    symbol: ',',
    category: 'Commas & Connectors',
    summary: 'The most versatile mark: lists, introductory clauses, direct addresses, and compound sentences.',
    definition: 'A comma indicates a slight pause and separates clauses, items, or phrases to ensure grammatical clarity.',
    rules: [
      {
        heading: '4 Primary Comma Functions',
        points: [
          'A. Items in a Series: Separates three or more words or phrases (e.g., "She bought books, notebooks, pens, and folders.").',
          'B. Introductory Elements: Follows introductory clauses, phrases, or transitions (e.g., "After completing the experiment, the students recorded the results.").',
          'C. Direct Address: Sets off the person spoken to (e.g., "Sara, please close the door.").',
          'D. Independent Clauses with FANBOYS: Joins two full sentences when paired with a coordinating conjunction (For, And, Nor, But, Or, Yet, So).'
        ]
      }
    ],
    examples: [
      { text: 'She bought books, notebooks, pens, and folders.', type: 'correct', note: 'Items in a series' },
      { text: 'After completing the experiment, the students recorded the results.', type: 'correct', note: 'Introductory element' },
      { text: 'Sara, please close the door.', type: 'correct', note: 'Direct address' },
      { text: 'She studied hard, and she passed the examination.', type: 'correct', note: 'Independent clauses with FANBOYS' }
    ],
    memoryTrick: 'FANBOYS: For, And, Nor, But, Or, Yet, So. Never insert commas randomly wherever you pause when speaking!',
    commonMistakes: [
      {
        incorrect: 'She studied hard, she passed the examination.',
        correct: 'She studied hard, and she passed the examination.',
        explanation: 'A comma alone cannot connect two independent clauses. This creates a Comma Splice.'
      }
    ]
  },
  {
    id: 6,
    slug: 'semicolon',
    title: '6. Semicolon — ;',
    symbol: ';',
    category: 'Commas & Connectors',
    summary: 'Bridges closely related independent clauses without needing a conjunction.',
    definition: 'A semicolon connects closely related independent clauses that could each stand alone as complete sentences.',
    rules: [
      {
        heading: 'Key Uses of the Semicolon',
        points: [
          'Connects two independent clauses that share a tight conceptual bond.',
          'Used before transition adverbs (e.g., "; however,", "; therefore,", "; moreover,").',
          'Separates complex list items that already contain internal commas (e.g., "London, England; Paris, France; Rome, Italy").',
          'Avoids comma splices.'
        ]
      }
    ],
    examples: [
      { text: 'The experiment was difficult; the students completed it successfully.', type: 'correct', note: 'Two balanced independent clauses' },
      { text: 'The weather was terrible; the match continued.', type: 'correct', note: 'Related independent clauses' }
    ],
    commonMistakes: [
      {
        incorrect: 'The weather was terrible, the match continued.',
        correct: 'The weather was terrible; the match continued.',
        explanation: 'A comma alone cannot join two independent clauses (Comma Splice).'
      }
    ],
    proTip: 'If both halves could be standalone sentences with a period between them, a semicolon is grammatically valid.'
  },
  {
    id: 7,
    slug: 'colon',
    title: '7. Colon — :',
    symbol: ':',
    category: 'Commas & Connectors',
    summary: 'Introduces lists, direct explanations, summaries, or expanded details.',
    definition: 'A colon introduces something that explains, expands, or illustrates what came before it.',
    rules: [
      {
        heading: 'Golden Rule of Colons',
        points: [
          'The material BEFORE the colon should generally form a complete thought (independent clause).',
          'Before a list: "She brought three things: a notebook, a pen, and a calculator."',
          'Before an explanation: "He had one goal: to improve his writing."',
          'Before clarification: "There was only one problem: nobody had the key."',
          'Never place a colon after a bare verb like "are" or prepositions like "such as".'
        ]
      }
    ],
    examples: [
      { text: 'She brought three things: a notebook, a pen, and a calculator.', type: 'correct', note: 'Before a list with complete lead-in' },
      { text: 'He had one goal: to improve his writing.', type: 'correct', note: 'Before an explanation' },
      { text: 'There was only one problem: nobody had the key.', type: 'correct', note: 'Before clarification' }
    ],
    commonMistakes: [
      {
        incorrect: 'My favorite subjects are: biology and chemistry.',
        correct: 'I have two favorite subjects: biology and chemistry.',
        explanation: 'Do not put a colon directly after a linking verb ("are") because the lead-in is not a complete sentence.'
      }
    ]
  },
  {
    id: 8,
    slug: 'apostrophe',
    title: "8. Apostrophe — '",
    symbol: "'",
    category: 'Modifiers & Marks',
    summary: 'Denotes possession or replaces omitted letters in contractions.',
    definition: 'The apostrophe has two major uses in English: indicating possession (ownership) and marking contractions.',
    rules: [
      {
        heading: 'A. Possession Rules',
        points: [
          'Singular noun: Add \'s (Ali\'s notebook, The teacher\'s desk).',
          'Regular plural ending in -s: Add only apostrophe (The students\' books).',
          'Irregular plural not ending in -s: Add \'s (The children\'s books, The women\'s team).'
        ]
      },
      {
        heading: 'B. Contractions Rules',
        points: [
          'do not → don\'t',
          'cannot → can\'t',
          'they are → they\'re',
          'it is → it\'s'
        ]
      }
    ],
    examples: [
      { text: "Ali's notebook", type: 'correct', note: 'Singular possession' },
      { text: "The students' books", type: 'correct', note: 'Plural possession (many students)' },
      { text: "The children's books", type: 'correct', note: 'Irregular plural possession' },
      { text: "They're coming over later.", type: 'correct', note: 'Contraction (they are)' }
    ],
    proTip: 'Never use an apostrophe to make a regular word plural (write "two computers", not "two computer\'s").'
  },
  {
    id: 9,
    slug: 'its-vs-its',
    title: "9. ITS vs IT'S",
    symbol: "its / it's",
    category: 'Common Confusions',
    summary: 'The single most common apostrophe confusion in English writing.',
    definition: 'ITS is the possessive form showing ownership. IT\'S is short for "it is" or "it has".',
    rules: [
      {
        heading: 'The Quick Replacement Test',
        points: [
          'ITS: Possessive form (e.g., "The bird spread its wings.").',
          'IT\'S: Short for "it is" or "it has" (e.g., "It\'s raining.", "It\'s been a long day.").',
          'Easy trick: If you can substitute "it is" and the sentence still makes sense, use it\'s. Otherwise, use its.'
        ]
      }
    ],
    examples: [
      { text: 'The bird spread its wings.', type: 'correct', note: 'Possessive (belongs to the bird)' },
      { text: "It's raining outside.", type: 'correct', note: 'Contraction for "It is raining"' },
      { text: "It's been a long day.", type: 'correct', note: 'Contraction for "It has been"' }
    ],
    commonMistakes: [
      {
        incorrect: "The car lost it's wheel.",
        correct: 'The car lost its wheel.',
        explanation: 'Test: "The car lost it is wheel" makes no sense, so use possessive "its".'
      }
    ],
    memoryTrick: 'The apostrophe in "it\'s" is the missing letter "i" from "it is"!'
  },
  {
    id: 10,
    slug: 'quotation-marks',
    title: '10. Quotation Marks — " "',
    symbol: '" "',
    category: 'Modifiers & Marks',
    summary: 'Encloses direct speech and verbatim quotes from other sources.',
    definition: 'Quotation marks are used to enclose spoken dialogue or exact words quoted from a text.',
    rules: [
      {
        heading: 'Direct vs. Indirect Speech',
        points: [
          'Direct Speech: Quoting the exact words spoken (The teacher said, "Complete your assignment.").',
          'Indirect Speech: Reporting what was said without quoting exact words (She said that she was ready.).',
          'Comma placement: A comma usually introduces direct speech after attribution phrases (She said, "I am ready.").'
        ]
      }
    ],
    examples: [
      { text: 'The teacher said, "Complete your assignment."', type: 'correct', note: 'Direct speech' },
      { text: 'She said, "I am ready."', type: 'correct', note: 'Direct quote' },
      { text: 'She said that she was ready.', type: 'correct', note: 'Indirect speech (no quotation marks)' }
    ],
    proTip: 'In American English, commas and periods generally go inside quotation marks; in British English, placement depends on logic.'
  },
  {
    id: 11,
    slug: 'parentheses',
    title: '11. Parentheses — ( )',
    symbol: '( )',
    category: 'Modifiers & Marks',
    summary: 'Encloses supplementary or non-essential background details.',
    definition: 'Parentheses contain additional information that is not essential to the main sentence.',
    rules: [
      {
        heading: 'Usage Guidelines',
        points: [
          'The sentence must still make complete grammatical sense if parenthetical text is removed.',
          'Used for extra context, dates, examples, or acronym definitions (e.g., "World Health Organization (WHO)").'
        ]
      }
    ],
    examples: [
      { text: 'The meeting will take place tomorrow (if the weather remains clear).', type: 'correct', note: 'Supplementary condition' },
      { text: 'Mount Everest (8,848 m) is the highest peak on Earth.', type: 'correct', note: 'Extra factual detail' }
    ],
    proTip: 'Parentheses whisper, dashes shout, and commas speak neutrally.'
  },
  {
    id: 12,
    slug: 'brackets',
    title: '12. Brackets — [ ]',
    symbol: '[ ]',
    category: 'Modifiers & Marks',
    summary: 'Inserts editorial clarifications or missing context inside quoted material.',
    definition: 'Square brackets are used inside quoted material to add clarification or information from the writer/editor.',
    rules: [
      {
        heading: 'Editorial Clarification',
        points: [
          'Clarifies unclear pronouns in quotes: "The researcher wrote that \'they [the participants] showed significant improvement.\'"',
          'Indicates modifications made to maintain grammar in quotes.',
          'Never use parentheses inside quotes when clarifying—use square brackets.'
        ]
      }
    ],
    examples: [
      { text: 'The researcher wrote that "they [the participants] showed significant improvement."', type: 'correct', note: 'Clarifies pronoun' }
    ],
    proTip: 'Brackets signal to readers: "These words were added by the editor for clarity, not spoken by the original author."'
  },
  {
    id: 13,
    slug: 'dash',
    title: '13. Dash — —',
    symbol: '—',
    category: 'Modifiers & Marks',
    summary: 'Creates emphasis, abrupt interruption, or sudden change of thought.',
    definition: 'An em dash creates a strong pause, dramatic emphasis, or abrupt change in thought.',
    rules: [
      {
        heading: 'Dash vs. Comma',
        points: [
          'A dash creates a stronger break than a comma.',
          'Used for emphasis or dramatic realization: "She had one objective—to finish the project."',
          'Used for sudden shifts: "The answer was obvious—or so it seemed."'
        ]
      }
    ],
    examples: [
      { text: 'She had one objective—to finish the project.', type: 'correct', note: 'Dramatic emphasis' },
      { text: 'The answer was obvious—or so it seemed.', type: 'correct', note: 'Sudden change of thought' }
    ],
    proTip: 'To type an em dash: Press Option+Shift+Hyphen on Mac, or Alt+0151 on Windows.'
  },
  {
    id: 14,
    slug: 'hyphen',
    title: '14. Hyphen — -',
    symbol: '-',
    category: 'Modifiers & Marks',
    summary: 'Connects compound words and modifiers before nouns.',
    definition: 'A hyphen connects words or parts of words into unified descriptive modifiers.',
    rules: [
      {
        heading: 'Compound Adjectives & Placement',
        points: [
          'Hyphenate compound adjectives BEFORE the noun: "well-known writer", "high-speed train", "long-term plan".',
          'Do NOT hyphenate when the adjective phrase follows the noun: "The writer is well known.", "The plan is long term."'
        ]
      }
    ],
    examples: [
      { text: 'She is a well-known scientist.', type: 'correct', note: 'Hyphenated before the noun' },
      { text: 'The scientist is well known.', type: 'correct', note: 'No hyphen after the noun' },
      { text: 'We boarded a high-speed train.', type: 'correct', note: 'Compound adjective' }
    ],
    memoryTrick: 'If two words team up together in front of a noun to describe it, link them with a hyphen!'
  },
  {
    id: 15,
    slug: 'ellipsis',
    title: '15. Ellipsis — ...',
    symbol: '...',
    category: 'Modifiers & Marks',
    summary: 'Indicates omitted words in quotes, hesitation, or trailing thoughts.',
    definition: 'An ellipsis (three dots) indicates omitted words, hesitation, an unfinished thought, or a trailing statement.',
    rules: [
      {
        heading: 'Ellipsis Rules',
        points: [
          'Indicates omitted words in quoted material.',
          'Captures spoken hesitation or trailing thought: "I thought I knew the answer, but..."',
          'Always consists of exactly three dots (...).'
        ]
      }
    ],
    examples: [
      { text: 'I thought I knew the answer, but...', type: 'correct', note: 'Hesitation/trailing thought' }
    ],
    proTip: 'In formal essays, use an ellipsis only to skip words in direct quotes without changing original meaning.'
  },
  {
    id: 16,
    slug: 'slash',
    title: '16. Slash — /',
    symbol: '/',
    category: 'Modifiers & Marks',
    summary: 'Indicates alternatives, paired expressions, or fractions.',
    definition: 'A slash indicates alternatives, options, or certain paired expressions.',
    rules: [
      {
        heading: 'Slash Usage & Cautions',
        points: [
          'Indicates alternatives: "and/or", "his/her", "pass/fail".',
          'Denotes per unit: "$50/day", "100 km/h".',
          'Caution: Excessive slash usage can make formal academic writing look informal and less clear.'
        ]
      }
    ],
    examples: [
      { text: 'The class is graded on a pass/fail basis.', type: 'correct', note: 'Alternative pair' }
    ],
    proTip: 'In formal academic writing, write out "either or both" instead of "and/or".'
  },
  {
    id: 17,
    slug: 'comma-splice',
    title: '17. Comma Splice',
    symbol: '⚠️ ,',
    category: 'Critical Errors',
    summary: 'A critical grammatical error: joining two independent clauses with only a comma.',
    definition: 'A comma splice occurs when two independent clauses (complete sentences) are incorrectly joined with only a comma.',
    rules: [
      {
        heading: '3 Proven Ways to Fix a Comma Splice',
        points: [
          'Fix 1: Add a coordinating conjunction (Comma + FANBOYS): "She studied hard, and she passed the examination."',
          'Fix 2: Use a Semicolon (;): "She studied hard; she passed the examination."',
          'Fix 3: Use a Full Stop (.) to form two separate sentences: "She studied hard. She passed the examination."'
        ]
      }
    ],
    examples: [
      { text: '❌ She studied hard, she passed the examination.', type: 'incorrect', note: 'Comma Splice Error' },
      { text: '✅ She studied hard, and she passed the examination.', type: 'correct', note: 'Fixed with comma + "and"' },
      { text: '✅ She studied hard; she passed the examination.', type: 'correct', note: 'Fixed with semicolon' },
      { text: '✅ She studied hard. She passed the examination.', type: 'correct', note: 'Fixed with full stop' }
    ],
    memoryTrick: 'A comma alone is not strong enough to glue two full sentences together!'
  },
  {
    id: 18,
    slug: 'run-on-sentence',
    title: '18. Run-On Sentence',
    symbol: '⚠️ ⚡',
    category: 'Critical Errors',
    summary: 'When two independent clauses collide with zero punctuation between them.',
    definition: 'A run-on sentence occurs when two or more independent clauses are incorrectly joined without appropriate punctuation.',
    rules: [
      {
        heading: 'How to Fix Run-On Sentences',
        points: [
          'Method 1: Connect with a Comma + FANBOYS: "The lecture ended, and the students left the classroom."',
          'Method 2: Separate into two distinct sentences with a Full Stop: "The lecture ended. The students left the classroom."',
          'Method 3: Connect with a Semicolon: "The lecture ended; the students left the classroom."'
        ]
      }
    ],
    examples: [
      { text: '❌ The lecture ended the students left the classroom.', type: 'incorrect', note: 'Fused Run-on sentence' },
      { text: '✅ The lecture ended, and the students left the classroom.', type: 'correct', note: 'Fixed with comma + and' },
      { text: '✅ The lecture ended. The students left the classroom.', type: 'correct', note: 'Fixed with full stop' }
    ],
    proTip: 'A long sentence is not automatically a run-on; a run-on is defined strictly by missing grammatical connections between independent clauses.'
  },
  {
    id: 19,
    slug: 'punctuation-changes-meaning',
    title: '19. Punctuation Can Change Meaning',
    symbol: '🔀 💡',
    category: 'Fundamentals',
    summary: 'A single comma or mark can alter a sentence from polite to catastrophic.',
    definition: 'Punctuation changes tone, vocal pauses, and syntax. Misplacing or omitting a mark can reverse the entire meaning.',
    rules: [
      {
        heading: 'Classic Meaning Shift Demonstrations',
        points: [
          'Direct Address vs Object: "Let\'s eat, Sara." (Inviting Sara) vs. "Let\'s eat Sara." (Cannibalism!).',
          'Quotation vs Paraphrase: "The teacher said, \'The student is ready.\'" vs. "The teacher said the student is ready."',
          'Direct Address with group: "Let\'s eat, students." vs "Let\'s eat students."'
        ]
      }
    ],
    examples: [
      { text: "Let's eat, Sara.", type: 'correct', note: 'Friendly invitation to Sara' },
      { text: "Let's eat Sara.", type: 'incorrect', note: 'Eating Sara as food!' },
      { text: 'The teacher said, "The student is ready."', type: 'correct', note: 'Direct quote' },
      { text: 'The teacher said the student is ready.', type: 'correct', note: 'Indirect report' }
    ],
    proTip: 'Always read your writing aloud to hear where natural pauses dictate commas!'
  },
  {
    id: 20,
    slug: 'most-common-confusions',
    title: '20. Most Common Confusions',
    symbol: '⚡ ❓',
    category: 'Common Confusions',
    summary: 'Master the high-frequency homophone and apostrophe traps.',
    definition: 'English contains words that sound identical but differ fundamentally based on apostrophes and spelling.',
    rules: [
      {
        heading: 'The 5 Critical Confusion Pairs',
        points: [
          '1. Your vs. You\'re: Your = belonging to you ("Your book is on the table."). You\'re = you are ("You\'re ready.").',
          '2. Their / They\'re / There: Their = possession ("Their car"). They\'re = they are ("They\'re coming"). There = place/existence ("Over there").',
          '3. Whose vs. Who\'s: Whose = possession ("Whose book?"). Who\'s = who is / who has ("Who\'s calling?").',
          '4. Then vs. Than: Then = time/order ("We ate, then left"). Than = comparison ("Taller than me").',
          '5. Its vs. It\'s: Its = possession ("Its tail"). It\'s = it is ("It\'s hot").'
        ]
      }
    ],
    examples: [
      { text: "Your book is on the table; you're ready.", type: 'correct', note: 'Your (possessive) vs You\'re (you are)' },
      { text: "They're over there getting their bags.", type: 'correct', note: 'They are + place + possessive' },
      { text: "Who's the person whose car is outside?", type: 'correct', note: 'Who is + possessive whose' }
    ],
    proTip: 'Whenever you see an apostrophe in you\'re, they\'re, or who\'s, substitute the two-word phrase (you are, they are, who is) to verify!'
  },
  {
    id: 21,
    slug: 'quick-revision',
    title: '21. Quick Revision (Reference Table)',
    symbol: '📋',
    category: 'Reference',
    summary: 'The master reference table of all standard punctuation marks at a glance.',
    definition: 'A complete summary matrix of all major punctuation marks, symbols, main functions, and quick examples.',
    rules: [
      {
        heading: 'Master Quick Reference Table',
        points: [
          '. (Full Stop) — Ends a statement',
          ', (Comma) — Separates ideas, list items, and clauses',
          '? (Question Mark) — Direct question',
          '! (Exclamation Mark) — Strong emotion or emphasis',
          ': (Colon) — Introduces explanation or list',
          '; (Semicolon) — Connects related independent clauses',
          '\' (Apostrophe) — Possession or contraction',
          '" " (Quotation Marks) — Direct speech or quotation',
          '( ) (Parentheses) — Extra non-essential information',
          '[ ] (Brackets) — Editorial clarification inside quotes',
          '— (Dash) — Emphasis or abrupt interruption',
          '- (Hyphen) — Connects compound words before nouns',
          '... (Ellipsis) — Omission or trailing thought',
          '/ (Slash) — Alternatives and options'
        ]
      }
    ],
    examples: [
      { text: 'A well-crafted sentence uses punctuation marks precisely.', type: 'correct', note: 'Quick review' }
    ],
    proTip: 'Keep this table handy as a rapid writing cheat sheet.'
  }
];

// --- 2. MEANING COMPARISONS DATA ---
const MEANING_COMPARISONS_DATA = [
  {
    id: 'eat-students',
    title: "1. Dinner Invitation vs. Cannibalism",
    ruleLabel: "Direct Address Comma",
    versionA: {
      sentence: "Let's eat, students.",
      badge: "Friendly Lunch Invite 🥗",
      tone: "tone-safe",
      meaning: "The teacher or speaker politely invites the students to join in for lunch."
    },
    versionB: {
      sentence: "Let's eat students.",
      badge: "Cannibalism Alert! 🚨",
      tone: "tone-dangerous",
      meaning: "The speaker proposes to physically consume human students as food!"
    },
    explanation: "When addressing someone directly, always set off their name with a comma. Without the comma, 'students' becomes the direct object of 'eat'."
  },
  {
    id: 'eat-sara',
    title: "2. Inviting Sara vs. Consuming Sara",
    ruleLabel: "Direct Address Comma",
    versionA: {
      sentence: "Let's eat, Sara.",
      badge: "Dining With Sara 🍝",
      tone: "tone-safe",
      meaning: "Telling Sara that the dinner is served and ready."
    },
    versionB: {
      sentence: "Let's eat Sara.",
      badge: "Sara on the Menu 😱",
      tone: "tone-dangerous",
      meaning: "Sara is unfortunately the main dish on the dining table."
    },
    explanation: "Rule 5C: Always set off names in direct address with a comma."
  },
  {
    id: 'teacher-ready',
    title: "3. Direct Speech vs. Indirect Report",
    ruleLabel: "Quotation Marks & Dialogue",
    versionA: {
      sentence: 'The teacher said, "The student is ready."',
      badge: 'Direct Spoken Dialogue 💬',
      tone: 'tone-formal',
      meaning: 'Directly quotes the exact spoken words uttered by the teacher.'
    },
    versionB: {
      sentence: 'The teacher said the student is ready.',
      badge: 'Indirect Reported Speech 📝',
      tone: 'tone-safe',
      meaning: 'Narrates a paraphrased statement without quoting the spoken voice word-for-word.'
    },
    explanation: "Quotation marks represent verbatim dialogue; indirect speech integrates the thought smoothly into running text."
  },
  {
    id: 'private-pool',
    title: "4. Signboard: Prohibition vs. Invitation",
    ruleLabel: "Exclamation vs. Question & Comma",
    versionA: {
      sentence: "Private! No swimming allowed.",
      badge: "Strictly Prohibited ⛔",
      tone: "tone-dangerous",
      meaning: "A strict legal warning: swimming is forbidden on private property."
    },
    versionB: {
      sentence: "Private? No, swimming allowed!",
      badge: "Everyone Welcome to Swim 🏊",
      tone: "tone-funny",
      meaning: "Dismisses privacy concerns and enthusiastically welcomes everyone into the water!"
    },
    explanation: "Terminal marks and commas completely reverse the tone and legal intent of signs."
  },
  {
    id: 'cooking-family',
    title: "5. Culinary Hobby vs. Horror Movie",
    ruleLabel: "Series List Commas (Oxford Comma)",
    versionA: {
      sentence: "I love cooking, my family, and my pets.",
      badge: "Loving Chef & Pet Owner ❤️",
      tone: "tone-safe",
      meaning: "A wholesome list of three separate passions: cooking, family, and pets."
    },
    versionB: {
      sentence: "I love cooking my family and my pets.",
      badge: "Horror Movie Cooking Show 🍳",
      tone: "tone-dangerous",
      meaning: "The speaker is admitting to cooking family members and pets in a pan!"
    },
    explanation: "Without commas separating list items, subsequent nouns become direct objects of the verb 'cooking'."
  }
];

// --- 3. QUIZ QUESTIONS DATABASE ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Which sentence correctly avoids a comma splice?',
    options: [
      'The experiment was difficult, the students succeeded.',
      'The experiment was difficult; the students succeeded.',
      'The experiment was difficult, however the students succeeded.',
      'The experiment was difficult the students succeeded.'
    ],
    correctIndex: 1,
    explanation: 'A semicolon correctly links two independent clauses without creating a comma splice.',
    ruleTag: 'Semicolons & Comma Splices',
    difficulty: 'beginner'
  },
  {
    id: 2,
    question: 'Choose the sentence with correct direct address punctuation:',
    options: [
      "Let's eat Sara before we go.",
      "Let's eat, Sara, before we go.",
      "Let's, eat Sara before we go.",
      "Let's eat Sara, before we go."
    ],
    correctIndex: 1,
    explanation: 'Direct address requires setting off the name ("Sara") with commas on both sides when inside a clause.',
    ruleTag: 'Direct Address Commas',
    difficulty: 'beginner'
  },
  {
    id: 3,
    question: 'Identify the sentence with correct colon usage:',
    options: [
      'My favorite classes are: physics and biology.',
      'She had only one goal: to publish her research in a leading journal.',
      'The ingredients include: flour, sugar, and milk.',
      'We visited: London, Paris, and Rome.'
    ],
    correctIndex: 1,
    explanation: 'The clause before a colon must form a complete independent thought. Never put a colon directly after verbs like "are" or "include".',
    ruleTag: 'Colons',
    difficulty: 'intermediate'
  },
  {
    id: 4,
    question: 'Select the sentence that correctly distinguishes ITS vs. IT\'S:',
    options: [
      "The dog wagged it's tail because its happy.",
      "The dog wagged its tail because it's happy.",
      "The dog wagged it's tail because it's happy.",
      "The dog wagged its tail because its happy."
    ],
    correctIndex: 1,
    explanation: '"its" is possessive (its tail), and "it\'s" is the contraction for "it is" (it is happy).',
    ruleTag: 'ITS vs IT\'S',
    difficulty: 'beginner'
  },
  {
    id: 5,
    question: 'Which of the following is an indirect question and should end with a full stop?',
    options: [
      'Where did the professor go?',
      'Why is the experiment failing?',
      'I asked the professor where the laboratory was.',
      'Did you submit your project on time?'
    ],
    correctIndex: 2,
    explanation: '"I asked where the laboratory was." reports a question indirectly, so it terminates with a period, not a question mark.',
    ruleTag: 'Question Marks',
    difficulty: 'intermediate'
  },
  {
    id: 6,
    question: 'Which sentence correctly uses hyphens with compound adjectives?',
    options: [
      'She is a well known scientist.',
      'She is a well-known scientist, and her work is well known.',
      'She is a well-known scientist, and her work is well-known.',
      'She is a well known scientist, and her work is well-known.'
    ],
    correctIndex: 1,
    explanation: 'Hyphenate "well-known" before the noun, but do NOT hyphenate when it follows the noun as a predicate adjective.',
    ruleTag: 'Hyphens',
    difficulty: 'advanced'
  },
  {
    id: 7,
    question: 'Which sentence correctly demonstrates plural possession for multiple students?',
    options: [
      "The students' books were on the table.",
      "The student's books were on the table.",
      "The students books' were on the table.",
      "The students's books were on the table."
    ],
    correctIndex: 0,
    explanation: 'For regular plural nouns ending in -s, place only an apostrophe at the very end ("students\'").',
    ruleTag: 'Apostrophe Possession',
    difficulty: 'intermediate'
  },
  {
    id: 8,
    question: 'Identify the sentence that correctly uses FANBOYS with a comma:',
    options: [
      'She studied hard and she passed the exam.',
      'She studied hard, and she passed the exam.',
      'She studied hard, and passed the exam.',
      'She studied hard; and she passed the exam.'
    ],
    correctIndex: 1,
    explanation: 'When two complete independent clauses are joined by FANBOYS ("and"), place a comma immediately before the conjunction.',
    ruleTag: 'Commas & FANBOYS',
    difficulty: 'beginner'
  },
  {
    id: 9,
    question: 'What is the role of square brackets [ ] in academic writing?',
    options: [
      'To provide funny commentary.',
      'To insert editorial clarification inside quoted material.',
      'To replace regular parentheses in all situations.',
      'To highlight compound adjectives.'
    ],
    correctIndex: 1,
    explanation: 'Square brackets clarify pronouns or add context inside direct quotations without altering the original speaker\'s words.',
    ruleTag: 'Brackets',
    difficulty: 'intermediate'
  },
  {
    id: 10,
    question: 'Which sentence is a run-on sentence?',
    options: [
      'The lecture ended, and the students left.',
      'The lecture ended; the students left.',
      'The lecture ended the students left the classroom.',
      'The lecture ended. The students left.'
    ],
    correctIndex: 2,
    explanation: 'Two independent clauses joined with zero punctuation or conjunction form a fused run-on sentence.',
    ruleTag: 'Run-On Sentences',
    difficulty: 'beginner'
  }
];

// --- 4. FLASHCARDS DATA (3D FLIP) ---
const FLASHCARDS_DATA = [
  {
    id: 1,
    symbol: '.',
    name: 'Full Stop (Period)',
    category: 'Terminators',
    quickDefinition: 'Marks the end of a complete declarative statement or abbreviation.',
    topRule: 'Must end every complete independent thought.',
    example: 'She studies English every evening.',
    mistakeAlert: 'Never forget terminal stops at sentence ends.'
  },
  {
    id: 2,
    symbol: '?',
    name: 'Question Mark',
    category: 'Terminators',
    quickDefinition: 'Closes direct interrogative questions.',
    topRule: 'Only for DIRECT questions, not indirect reported queries.',
    example: 'Where is the laboratory located?',
    mistakeAlert: 'Do NOT use ? for "I wonder where he went."'
  },
  {
    id: 3,
    symbol: '!',
    name: 'Exclamation Mark',
    category: 'Terminators',
    quickDefinition: 'Expresses strong surprise, excitement, anger, or urgent warning.',
    topRule: 'Use sparingly in formal academic prose.',
    example: 'What an incredible result!',
    mistakeAlert: 'Avoid multiple marks (!!!).'
  },
  {
    id: 4,
    symbol: ',',
    name: 'Comma',
    category: 'Commas & Connectors',
    quickDefinition: 'Indicates a brief pause to separate items, clauses, and direct address.',
    topRule: 'Needs FANBOYS to join two independent clauses.',
    example: 'Let\'s eat, Sara.',
    mistakeAlert: 'Comma Splice: joining two sentences with only a comma.'
  },
  {
    id: 5,
    symbol: ';',
    name: 'Semicolon',
    category: 'Commas & Connectors',
    quickDefinition: 'Connects closely related independent clauses without conjunctions.',
    topRule: 'Both sides MUST stand as complete sentences.',
    example: 'The weather was terrible; the match continued.',
    mistakeAlert: 'Do not use a semicolon before an incomplete fragment.'
  },
  {
    id: 6,
    symbol: ':',
    name: 'Colon',
    category: 'Commas & Connectors',
    quickDefinition: 'Introduces a list, explanation, clarification, or summary.',
    topRule: 'The clause before the colon MUST be a complete sentence.',
    example: 'He had one goal: to master English grammar.',
    mistakeAlert: 'Never place after verbs like "are" or "include".'
  },
  {
    id: 7,
    symbol: "'",
    name: 'Apostrophe',
    category: 'Modifiers & Marks',
    quickDefinition: 'Indicates possession or omitted letters in contractions.',
    topRule: 'Singular: Ali\'s book | Plural: students\' books.',
    example: 'They\'re studying for the exam.',
    mistakeAlert: 'Never use to make a regular noun plural (apple\'s).'
  },
  {
    id: 8,
    symbol: "—",
    name: 'Em Dash',
    category: 'Modifiers & Marks',
    quickDefinition: 'Delivers dramatic emphasis or abrupt interruption.',
    topRule: 'Stronger and more emphatic than a comma or parenthesis.',
    example: 'She had one objective—to finish the project.',
    mistakeAlert: 'Don\'t confuse with short hyphen (-).'
  },
  {
    id: 9,
    symbol: '-',
    name: 'Hyphen',
    category: 'Modifiers & Marks',
    quickDefinition: 'Joins compound adjectives before a noun.',
    topRule: 'Hyphenate before noun, omit after noun.',
    example: 'She is a well-known researcher.',
    mistakeAlert: 'Do NOT hyphenate -ly adverbs (highly rated).'
  },
  {
    id: 10,
    symbol: '...',
    name: 'Ellipsis',
    category: 'Modifiers & Marks',
    quickDefinition: 'Indicates omitted words in quotes or trailing thoughts.',
    topRule: 'Always exactly three dots (...).',
    example: 'I thought I knew the answer, but...',
    mistakeAlert: 'Do not type 2 or 5 dots.'
  }
];

// --- 5. SENTENCE FIXER CHALLENGES ---
const FIXER_CHALLENGES = [
  {
    id: 1,
    title: 'Challenge 1: The Classic Comma Splice',
    errorType: 'Comma Splice',
    brokenSentence: 'She studied hard for the test, she passed with an A.',
    hint: 'Two complete sentences cannot be joined by a comma alone. Choose the grammatically sound fix.',
    fixOptions: [
      {
        label: 'A',
        text: 'She studied hard for the test, and she passed with an A.',
        isCorrect: true,
        explanation: '✅ Correct! Adding comma + coordinating conjunction "and" fixes the comma splice cleanly.'
      },
      {
        label: 'B',
        text: 'She studied hard for the test she passed with an A.',
        isCorrect: false,
        explanation: '❌ Incorrect. Removing the comma creates a fused run-on sentence.'
      },
      {
        label: 'C',
        text: 'She studied hard for the test, however, she passed with an A.',
        isCorrect: false,
        explanation: '❌ Incorrect. "However" is a conjunctive adverb and still creates a comma splice without a semicolon (; however,).'
      }
    ]
  },
  {
    id: 2,
    title: 'Challenge 2: The Fused Run-On Sentence',
    errorType: 'Run-On',
    brokenSentence: 'The lecture ended the students left the classroom immediately.',
    hint: 'There is zero punctuation separating two independent clauses.',
    fixOptions: [
      {
        label: 'A',
        text: 'The lecture ended, the students left the classroom immediately.',
        isCorrect: false,
        explanation: '❌ Incorrect. Adding only a comma creates a comma splice.'
      },
      {
        label: 'B',
        text: 'The lecture ended; the students left the classroom immediately.',
        isCorrect: true,
        explanation: '✅ Correct! A semicolon bridges the two independent clauses perfectly.'
      },
      {
        label: 'C',
        text: 'The lecture ended: the students left the classroom immediately.',
        isCorrect: false,
        explanation: '❌ Incorrect. A colon is used for explanations/lists, not ordinary sequential actions.'
      }
    ]
  },
  {
    id: 3,
    title: 'Challenge 3: The Dangerous Direct Address',
    errorType: 'Missing Comma',
    brokenSentence: "Let's eat Grandma before the food gets cold.",
    hint: 'Grandma is in immediate danger of being cooked!',
    fixOptions: [
      {
        label: 'A',
        text: "Let's eat Grandma, before the food gets cold.",
        isCorrect: false,
        explanation: '❌ Grandma is still on the menu because there is no comma after "eat".'
      },
      {
        label: 'B',
        text: "Let's eat, Grandma, before the food gets cold.",
        isCorrect: true,
        explanation: '✅ Correct! Setting off "Grandma" with commas makes it a polite dinner invitation.'
      },
      {
        label: 'C',
        text: "Let's eat Grandma: before the food gets cold.",
        isCorrect: false,
        explanation: '❌ Incorrect colon placement.'
      }
    ]
  },
  {
    id: 4,
    title: 'Challenge 4: Colon After Verb Error',
    errorType: 'Colon Misuse',
    brokenSentence: 'My favorite research topics are: machine learning, linguistics, and neuroscience.',
    hint: 'Do not place a colon directly after a linking verb ("are").',
    fixOptions: [
      {
        label: 'A',
        text: 'I have three favorite research topics: machine learning, linguistics, and neuroscience.',
        isCorrect: true,
        explanation: '✅ Correct! The clause before the colon is now a complete independent thought.'
      },
      {
        label: 'B',
        text: 'My favorite research topics are; machine learning, linguistics, and neuroscience.',
        isCorrect: false,
        explanation: '❌ A semicolon cannot follow a linking verb.'
      },
      {
        label: 'C',
        text: 'My favorite research topics are— machine learning, linguistics, and neuroscience.',
        isCorrect: false,
        explanation: '❌ Avoid dangling dashes after linking verbs.'
      }
    ]
  }
];

// --- 6. STATE MANAGEMENT ---
class PunctuationApp {
  constructor() {
    this.currentView = 'notes';
    this.bookmarks = JSON.parse(localStorage.getItem('punct_bookmarks') || '[]');
    this.completedLessons = JSON.parse(localStorage.getItem('punct_completed') || '[]');
    this.quizState = {
      currentIndex: 0,
      score: 0,
      answers: {},
      finished: false
    };
    this.flashcardIndex = 0;
    this.isCardFlipped = false;
    this.currentSearchTerm = '';

    this.init();
  }

  init() {
    this.renderLessonsNav();
    this.renderLessonsContent();
    this.renderMeaningLab();
    this.renderFlashcard();
    this.renderQuiz();
    this.renderFixerLab();
    this.renderCheatSheet();
    this.setupEventListeners();
    this.updateProgressBar();
  }

  // --- View Switcher ---
  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

    const targetSec = document.getElementById(`view-${viewName}`);
    const targetBtn = document.querySelector(`.tab-button[data-view="${viewName}"]`);

    if (targetSec) targetSec.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  // --- Lessons Rendering ---
  renderLessonsNav() {
    const navContainer = document.getElementById('topicsNavList');
    if (!navContainer) return;

    navContainer.innerHTML = '';
    const categories = ['Fundamentals', 'Terminators', 'Commas & Connectors', 'Modifiers & Marks', 'Critical Errors', 'Common Confusions', 'Reference'];

    categories.forEach(cat => {
      const items = PUNCTUATION_DATABASE.filter(t => t.category === cat);
      if (items.length === 0) return;

      const groupDiv = document.createElement('div');
      groupDiv.className = 'topic-category-group';
      groupDiv.innerHTML = `<div class="category-label">${cat}</div>`;

      const ul = document.createElement('ul');
      ul.className = 'topic-nav-list';

      items.forEach(t => {
        const li = document.createElement('li');
        const isDone = this.completedLessons.includes(t.id);
        const isBookmarked = this.bookmarks.includes(t.id);

        li.innerHTML = `
          <a class="topic-nav-item" href="#lesson-${t.id}" data-id="${t.id}">
            <span>${isDone ? '✓ ' : ''}${t.title.replace(/^\d+\.\s*/, '')}</span>
            <span class="topic-symbol-badge">${t.symbol || '•'}</span>
          </a>
        `;
        ul.appendChild(li);
      });

      groupDiv.appendChild(ul);
      navContainer.appendChild(groupDiv);
    });
  }

  renderLessonsContent(filteredTopics = PUNCTUATION_DATABASE) {
    const contentArea = document.getElementById('lessonsContentArea');
    if (!contentArea) return;

    if (filteredTopics.length === 0) {
      contentArea.innerHTML = `
        <div class="lesson-card text-center" style="text-align: center; padding: 3rem;">
          <h3>No matching punctuation rules found.</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">Try searching for terms like "comma", "semicolon", "apostrophe", or "its".</p>
        </div>
      `;
      return;
    }

    contentArea.innerHTML = filteredTopics.map(t => {
      const isBookmarked = this.bookmarks.includes(t.id);
      const isDone = this.completedLessons.includes(t.id);

      return `
        <article class="lesson-card" id="lesson-${t.id}">
          <header class="lesson-card-header">
            <div class="lesson-meta">
              <span class="lesson-category-tag">${t.category}</span>
              <h2 class="lesson-title">
                ${t.title}
                <span class="symbol-display">${t.symbol || '§'}</span>
              </h2>
            </div>
            <div class="lesson-actions">
              <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="app.toggleBookmark(${t.id})">
                ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              <button class="bookmark-btn ${isDone ? 'bookmarked' : ''}" onclick="app.toggleCompleted(${t.id})">
                ${isDone ? '✓ Completed' : '○ Mark Read'}
              </button>
            </div>
          </header>

          <p class="lesson-definition">${t.definition}</p>

          ${t.whyItMatters ? `
            <div class="why-matters-box">
              <strong>💡 Why It Matters</strong>
              ${t.whyItMatters}
            </div>
          ` : ''}

          ${t.rules.map(r => `
            <div class="rules-block">
              <h3 class="rules-heading">📌 ${r.heading}</h3>
              <ul class="rules-list">
                ${r.points.map(p => `<li class="rule-item">${p}</li>`).join('')}
              </ul>
            </div>
          `).join('')}

          ${t.examples && t.examples.length > 0 ? `
            <div class="rules-block">
              <h3 class="rules-heading">📖 Practical Examples</h3>
              <div class="examples-grid">
                ${t.examples.map(ex => `
                  <div class="example-row">
                    <div>
                      <div class="example-text ${ex.type || 'correct'}">${ex.text}</div>
                      ${ex.note ? `<span class="example-note">${ex.note}</span>` : ''}
                    </div>
                    <span class="example-tag ${ex.type || 'correct'}">${ex.type === 'incorrect' ? 'Incorrect' : 'Correct'}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${t.commonMistakes && t.commonMistakes.length > 0 ? `
            <div class="mistake-box">
              <div class="mistake-title">⚠️ Common Trap & Correction</div>
              ${t.commonMistakes.map(m => `
                <div class="mistake-comparison">
                  <div class="mistake-pane wrong">❌ ${m.incorrect}</div>
                  <div class="mistake-pane right">✅ ${m.correct}</div>
                </div>
                <div class="mistake-explanation">💡 Explanation: ${m.explanation}</div>
              `).join('')}
            </div>
          ` : ''}

          ${t.memoryTrick ? `
            <div class="trick-banner" style="margin-top: 1rem;">
              <span>🧠</span>
              <div><strong>Memory Trick:</strong> ${t.memoryTrick}</div>
            </div>
          ` : ''}

          ${t.proTip ? `
            <div class="tip-banner" style="margin-top: 1rem;">
              <span>✨</span>
              <div><strong>Pro Writing Tip:</strong> ${t.proTip}</div>
            </div>
          ` : ''}
        </article>
      `;
    }).join('');
  }

  // --- Meaning Lab Rendering ---
  renderMeaningLab() {
    const grid = document.getElementById('meaningCardsGrid');
    if (!grid) return;

    grid.innerHTML = MEANING_COMPARISONS_DATA.map(m => `
      <div class="meaning-card">
        <div class="meaning-card-top">
          <h3 class="meaning-card-title">${m.title}</h3>
          <span class="rule-pill">${m.ruleLabel}</span>
        </div>

        <div class="shift-duo-container">
          <div class="shift-side ${m.versionA.tone}">
            <div class="shift-badge">${m.versionA.badge}</div>
            <div class="shift-sentence">"${m.versionA.sentence}"</div>
            <div class="shift-desc">${m.versionA.meaning}</div>
          </div>

          <div class="shift-side ${m.versionB.tone}">
            <div class="shift-badge">${m.versionB.badge}</div>
            <div class="shift-sentence">"${m.versionB.sentence}"</div>
            <div class="shift-desc">${m.versionB.meaning}</div>
          </div>
        </div>

        <div class="meaning-explanation-footer">
          <strong>Rule in Action:</strong> ${m.explanation}
        </div>
      </div>
    `).join('');
  }

  // --- Quiz Engine ---
  renderQuiz() {
    const quizCard = document.getElementById('activeQuizCard');
    if (!quizCard) return;

    const q = QUIZ_QUESTIONS[this.quizState.currentIndex];
    const total = QUIZ_QUESTIONS.length;
    const answered = Object.keys(this.quizState.answers).length;

    document.getElementById('quizAnsweredCount').innerText = `${answered}/${total}`;
    document.getElementById('quizScoreCount').innerText = `${this.quizState.score} pts`;

    if (this.quizState.finished) {
      const pct = Math.round((this.quizState.score / total) * 100);
      quizCard.innerHTML = `
        <div class="quiz-summary-card">
          <h2>🎉 Quiz Completed!</h2>
          <div class="score-circle" style="--score-pct: ${pct};">
            <span class="score-text">${pct}%</span>
          </div>
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            You scored <strong>${this.quizState.score}</strong> out of <strong>${total}</strong> questions correctly.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button class="primary-btn" onclick="app.resetQuiz()">🔄 Retake Quiz</button>
            <button class="secondary-btn" onclick="app.switchView('notes')">📖 Review Notes</button>
          </div>
        </div>
      `;
      return;
    }

    const hasAnswered = this.quizState.answers[q.id] !== undefined;
    const userAnswer = this.quizState.answers[q.id];

    quizCard.innerHTML = `
      <div class="question-top-bar">
        <span class="q-counter">Question ${this.quizState.currentIndex + 1} of ${total}</span>
        <span class="q-difficulty ${q.difficulty}">${q.difficulty.toUpperCase()}</span>
      </div>

      <h3 class="question-text">${q.question}</h3>

      <div class="options-list">
        ${q.options.map((opt, idx) => {
          let extraClass = '';
          if (hasAnswered) {
            if (idx === q.correctIndex) extraClass = 'selected-correct';
            else if (idx === userAnswer) extraClass = 'selected-wrong';
          }
          return `
            <button class="option-btn ${extraClass}" 
                    onclick="app.handleQuizAnswer(${idx})" 
                    ${hasAnswered ? 'disabled' : ''}>
              <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}</span>
              ${hasAnswered && idx === q.correctIndex ? '<span>✅</span>' : ''}
              ${hasAnswered && idx === userAnswer && idx !== q.correctIndex ? '<span>❌</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <div class="quiz-feedback-box ${hasAnswered ? 'show ' + (userAnswer === q.correctIndex ? 'correct' : 'wrong') : ''}">
        <strong>${userAnswer === q.correctIndex ? '✨ Correct!' : '⚠️ Incorrect.'}</strong>
        ${q.explanation}
      </div>

      <div class="quiz-nav-actions">
        <button class="secondary-btn" onclick="app.prevQuestion()" ${this.quizState.currentIndex === 0 ? 'disabled' : ''}>
          ← Previous
        </button>
        ${hasAnswered ? `
          <button class="primary-btn" onclick="app.nextQuestion()">
            ${this.quizState.currentIndex === total - 1 ? 'See Results 🏆' : 'Next Question →'}
          </button>
        ` : '<div></div>'}
      </div>
    `;
  }

  handleQuizAnswer(optionIndex) {
    const q = QUIZ_QUESTIONS[this.quizState.currentIndex];
    if (this.quizState.answers[q.id] !== undefined) return;

    this.quizState.answers[q.id] = optionIndex;
    if (optionIndex === q.correctIndex) {
      this.quizState.score += 1;
    }
    this.renderQuiz();
  }

  nextQuestion() {
    if (this.quizState.currentIndex < QUIZ_QUESTIONS.length - 1) {
      this.quizState.currentIndex += 1;
    } else {
      this.quizState.finished = true;
    }
    this.renderQuiz();
  }

  prevQuestion() {
    if (this.quizState.currentIndex > 0) {
      this.quizState.currentIndex -= 1;
      this.renderQuiz();
    }
  }

  resetQuiz() {
    this.quizState = {
      currentIndex: 0,
      score: 0,
      answers: {},
      finished: false
    };
    this.renderQuiz();
  }

  // --- Flashcard 3D Flip Engine ---
  renderFlashcard() {
    const cardScene = document.getElementById('flashcardScene');
    const indexDisplay = document.getElementById('flashcardIndexDisplay');
    if (!cardScene || !indexDisplay) return;

    const card = FLASHCARDS_DATA[this.flashcardIndex];
    indexDisplay.innerText = `Card ${this.flashcardIndex + 1} of ${FLASHCARDS_DATA.length}`;

    cardScene.innerHTML = `
      <div class="flashcard-3d ${this.isCardFlipped ? 'flipped' : ''}" onclick="app.flipFlashcard()">
        <!-- FRONT FACE -->
        <div class="flashcard-face flashcard-front">
          <span class="lesson-category-tag" style="margin-bottom: 1rem;">${card.category}</span>
          <div class="card-symbol-huge">${card.symbol}</div>
          <div class="card-mark-name">${card.name}</div>
          <div class="flip-hint">👆 Click card to flip and reveal rules</div>
        </div>

        <!-- BACK FACE -->
        <div class="flashcard-face flashcard-back">
          <div class="card-back-definition">${card.quickDefinition}</div>
          <div class="card-back-rule"><strong>Rule:</strong> ${card.topRule}</div>
          <div class="card-back-example">Example: "${card.example}"</div>
          <div class="flip-hint">👆 Click to flip back</div>
        </div>
      </div>
    `;
  }

  flipFlashcard() {
    this.isCardFlipped = !this.isCardFlipped;
    this.renderFlashcard();
  }

  nextFlashcard() {
    this.isCardFlipped = false;
    this.flashcardIndex = (this.flashcardIndex + 1) % FLASHCARDS_DATA.length;
    this.renderFlashcard();
  }

  prevFlashcard() {
    this.isCardFlipped = false;
    this.flashcardIndex = (this.flashcardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
    this.renderFlashcard();
  }

  // --- Error Fixer Lab ---
  renderFixerLab() {
    const container = document.getElementById('fixerCardsGrid');
    if (!container) return;

    container.innerHTML = FIXER_CHALLENGES.map(c => `
      <div class="fixer-card" id="fixer-${c.id}">
        <div class="fixer-header">
          <h3 style="font-size: 1.1rem; font-weight: 800;">${c.title}</h3>
          <span class="fixer-tag">${c.errorType}</span>
        </div>

        <div class="broken-sentence-box">
          "${c.brokenSentence}"
        </div>

        <p class="fix-hint-text">💡 <strong>Hint:</strong> ${c.hint}</p>

        <div class="fix-options-list">
          ${c.fixOptions.map((opt, i) => `
            <button class="fix-option-btn" onclick="app.checkFixOption(${c.id}, ${i})">
              <strong>${opt.label}.</strong> ${opt.text}
            </button>
          `).join('')}
        </div>

        <div class="fix-outcome-feedback" id="fixer-feedback-${c.id}"></div>
      </div>
    `).join('');
  }

  checkFixOption(challengeId, optionIndex) {
    const challenge = FIXER_CHALLENGES.find(c => c.id === challengeId);
    const feedbackBox = document.getElementById(`fixer-feedback-${challengeId}`);
    const cardEl = document.getElementById(`fixer-${challengeId}`);
    if (!challenge || !feedbackBox || !cardEl) return;

    const chosen = challenge.fixOptions[optionIndex];
    const buttons = cardEl.querySelectorAll('.fix-option-btn');

    buttons.forEach((btn, idx) => {
      btn.classList.remove('correct-picked', 'wrong-picked');
      if (idx === optionIndex) {
        btn.classList.add(chosen.isCorrect ? 'correct-picked' : 'wrong-picked');
      }
    });

    feedbackBox.className = `fix-outcome-feedback show ${chosen.isCorrect ? 'quiz-feedback-box correct' : 'quiz-feedback-box wrong'}`;
    feedbackBox.innerHTML = `<strong>${chosen.isCorrect ? '✨ Excellent Fix!' : '⚠️ Not Quite:'}</strong> ${chosen.explanation}`;
  }

  // --- Quick Cheat Sheet Table ---
  renderCheatSheet() {
    const tbody = document.getElementById('cheatSheetTableBody');
    if (!tbody) return;

    tbody.innerHTML = PUNCTUATION_DATABASE.map(t => `
      <tr>
        <td class="symbol-cell">
          ${t.symbol || '•'}
          <button class="copy-symbol-btn" onclick="app.copySymbol('${t.symbol || ''}')" title="Copy symbol">📋</button>
        </td>
        <td><strong>${t.title.replace(/^\d+\.\s*/, '')}</strong></td>
        <td>${t.summary}</td>
        <td><code style="font-family: var(--font-mono); color: var(--brand-primary); font-size: 0.85rem;">${t.examples?.[0]?.text || ''}</code></td>
      </tr>
    `).join('');
  }

  copySymbol(symbol) {
    if (!symbol) return;
    navigator.clipboard.writeText(symbol).then(() => {
      this.showToast(`Copied "${symbol}" to clipboard!`);
    });
  }

  // --- Bookmarks & Progress ---
  toggleBookmark(topicId) {
    if (this.bookmarks.includes(topicId)) {
      this.bookmarks = this.bookmarks.filter(id => id !== topicId);
      this.showToast('Bookmark removed.');
    } else {
      this.bookmarks.push(topicId);
      this.showToast('Rule saved to your bookmarks! ★');
    }
    localStorage.setItem('punct_bookmarks', JSON.stringify(this.bookmarks));
    this.renderLessonsNav();
    this.renderLessonsContent();
  }

  toggleCompleted(topicId) {
    if (this.completedLessons.includes(topicId)) {
      this.completedLessons = this.completedLessons.filter(id => id !== topicId);
      this.showToast('Marked as unread.');
    } else {
      this.completedLessons.push(topicId);
      this.showToast('Lesson marked as mastered! ✓');
    }
    localStorage.setItem('punct_completed', JSON.stringify(this.completedLessons));
    this.renderLessonsNav();
    this.renderLessonsContent();
    this.updateProgressBar();
  }

  updateProgressBar() {
    const total = PUNCTUATION_DATABASE.length;
    const completed = this.completedLessons.length;
    const pct = Math.round((completed / total) * 100);

    const fill = document.getElementById('progressBarFill');
    const badge = document.getElementById('masteryBadgeCount');
    if (fill) fill.style.width = `${pct}%`;
    if (badge) badge.innerText = `${completed}/${total} Read (${pct}%)`;
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>💬</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- Search & Filter ---
  handleSearch(term) {
    this.currentSearchTerm = term.trim().toLowerCase();
    if (!this.currentSearchTerm) {
      this.renderLessonsContent(PUNCTUATION_DATABASE);
      return;
    }

    const filtered = PUNCTUATION_DATABASE.filter(t => {
      const matchTitle = t.title.toLowerCase().includes(this.currentSearchTerm);
      const matchDef = t.definition.toLowerCase().includes(this.currentSearchTerm);
      const matchSymbol = t.symbol && t.symbol.toLowerCase().includes(this.currentSearchTerm);
      const matchCategory = t.category.toLowerCase().includes(this.currentSearchTerm);
      const matchSummary = t.summary.toLowerCase().includes(this.currentSearchTerm);
      return matchTitle || matchDef || matchSymbol || matchCategory || matchSummary;
    });

    this.renderLessonsContent(filtered);
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
        if (this.currentView !== 'notes') {
          this.switchView('notes');
        }
      });
    }

    // Tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        if (view) this.switchView(view);
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          themeBtn.innerText = '🌙';
          localStorage.setItem('punct_theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          themeBtn.innerText = '☀️';
          localStorage.setItem('punct_theme', 'dark');
        }
      });

      // Init saved theme
      if (localStorage.getItem('punct_theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerText = '☀️';
      }
    }
  }
}

// Global initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new PunctuationApp();
});
