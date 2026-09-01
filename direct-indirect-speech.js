/**
 * MDCAT English: Direct & Indirect Speech Mastery
 * Complete JavaScript Module (direct-indirect.js)
 * Standalone, zero-dependency, fully interactive
 */

// ==========================================================================
// 1. DATA DEFINITIONS: 30+ ORIGINAL MDCAT-STYLE MCQS
// ==========================================================================
const mdcatMCQs = [
  {
    id: 1,
    category: "Interrogative",
    ruleTested: "Question word order & auxiliary removal",
    question: "Select the correct indirect speech form:\nAli said to the student, 'Where do you perform the chemical titration?'",
    options: [
      { id: "A", text: "Ali asked the student where did he perform the chemical titration." },
      { id: "B", text: "Ali asked the student where he performed the chemical titration." },
      { id: "C", text: "Ali asked the student where he does perform the chemical titration." },
      { id: "D", text: "Ali asked to the student where he performed the chemical titration." }
    ],
    correctAnswer: "B",
    explanation: "In WH-questions, indirect speech uses statement word order (Subject + Verb) rather than question word order. The auxiliary 'do' is removed, and present simple 'perform' shifts to past simple 'performed'. Also, 'asked to' is ungrammatical."
  },
  {
    id: 2,
    category: "Universal Truth",
    ruleTested: "Tense non-backshift for permanent scientific facts",
    question: "Select the correct indirect speech form:\nThe biology professor said, 'Mitochondria are the powerhouses of eukaryotic cells.'",
    options: [
      { id: "A", text: "The biology professor said that mitochondria were the powerhouses of eukaryotic cells." },
      { id: "B", text: "The biology professor said that mitochondria had been the powerhouses of eukaryotic cells." },
      { id: "C", text: "The biology professor said that mitochondria are the powerhouses of eukaryotic cells." },
      { id: "D", text: "The biology professor told that mitochondria are the powerhouses of eukaryotic cells." }
    ],
    correctAnswer: "C",
    explanation: "Universal scientific truths, biological realities, and perpetual facts retain their present tense in indirect speech even when the reporting verb is in the past tense ('said'). Option D is incorrect because 'told' requires a personal object."
  },
  {
    id: 3,
    category: "Reporting Verb",
    ruleTested: "Say vs. Tell personal object syntax",
    question: "Identify the grammatically accurate indirect sentence:",
    options: [
      { id: "A", text: "Dr. Ahmed told to the resident that the patient had stabilized." },
      { id: "B", text: "Dr. Ahmed told that the patient had stabilized." },
      { id: "C", text: "Dr. Ahmed said to the resident that the patient had stabilized." },
      { id: "D", text: "Dr. Ahmed said the resident that the patient had stabilized." }
    ],
    correctAnswer: "C",
    explanation: "'Tell' is a transitive verb that must take a direct personal object without the preposition 'to' (e.g., 'told the resident'). 'Say' cannot take a personal object directly without 'to' ('said to the resident' or 'said that'). Hence, only Option C is syntactically flawless."
  },
  {
    id: 4,
    category: "Imperative",
    ruleTested: "Negative command: 'not to + V1'",
    question: "Choose the correct indirect transformation:\nThe laboratory in-charge said to the students, 'Do not touch the concentrated sulfuric acid.'",
    options: [
      { id: "A", text: "The laboratory in-charge warned the students to not touch the concentrated sulfuric acid." },
      { id: "B", text: "The laboratory in-charge warned the students not to touch the concentrated sulfuric acid." },
      { id: "C", text: "The laboratory in-charge warned the students that do not touch the concentrated sulfuric acid." },
      { id: "D", text: "The laboratory in-charge forbade the students not to touch the concentrated sulfuric acid." }
    ],
    correctAnswer: "B",
    explanation: "Negative commands convert using 'not to + base verb (V1)'. Option A has a split infinitive ('to not touch'), Option C uses an incorrect conjunction ('that do not'), and Option D creates an erroneous double negative ('forbade... not to')."
  },
  {
    id: 5,
    category: "Tense Shift",
    ruleTested: "Past Simple backshift to Past Perfect",
    question: "Convert into indirect speech:\nShe said, 'I solved twenty complex physics numericals yesterday.'",
    options: [
      { id: "A", text: "She said that she solved twenty complex physics numericals the previous day." },
      { id: "B", text: "She said that she had solved twenty complex physics numericals yesterday." },
      { id: "C", text: "She said that she had solved twenty complex physics numericals the previous day." },
      { id: "D", text: "She said that she has solved twenty complex physics numericals the day before." }
    ],
    correctAnswer: "C",
    explanation: "Past Simple ('solved') must backshift to Past Perfect ('had solved'), and the time expression 'yesterday' must convert to 'the previous day' or 'the day before'."
  },
  {
    id: 6,
    category: "Yes/No Question",
    ruleTested: "If / Whether conjunction without redundant 'that'",
    question: "Select the correct indirect speech sentence:\nThe examiner said to me, 'Are you appearing in the MDCAT test this year?'",
    options: [
      { id: "A", text: "The examiner asked me that if I was appearing in the MDCAT test that year." },
      { id: "B", text: "The examiner asked me if I was appearing in the MDCAT test that year." },
      { id: "C", text: "The examiner asked me whether was I appearing in the MDCAT test that year." },
      { id: "D", text: "The examiner inquired me if I had been appearing in the MDCAT test this year." }
    ],
    correctAnswer: "B",
    explanation: "In Yes/No indirect questions, use 'if' or 'whether' alone (never combine 'that if'). The inverted order ('was I') becomes statement order ('I was'), and 'this year' becomes 'that year'."
  },
  {
    id: 7,
    category: "Present Continuous",
    ruleTested: "Present Continuous to Past Continuous",
    question: "Direct: The surgeon said, 'I am monitoring the patient's arterial pressure.'\nIndirect:",
    options: [
      { id: "A", text: "The surgeon said that he is monitoring the patient's arterial pressure." },
      { id: "B", text: "The surgeon said that he had been monitoring the patient's arterial pressure." },
      { id: "C", text: "The surgeon said that he was monitoring the patient's arterial pressure." },
      { id: "D", text: "The surgeon told that he was monitoring the patient's arterial pressure." }
    ],
    correctAnswer: "C",
    explanation: "Present Continuous ('am monitoring') backshifts into Past Continuous ('was monitoring'). First person pronoun 'I' changes to 'he' referring to the surgeon."
  },
  {
    id: 8,
    category: "Present Perfect",
    ruleTested: "Present Perfect to Past Perfect",
    question: "Direct: Zainab said, 'I have memorized the entire classification of Kingdom Plantae.'\nIndirect:",
    options: [
      { id: "A", text: "Zainab said that she had memorized the entire classification of Kingdom Plantae." },
      { id: "B", text: "Zainab said that she has memorized the entire classification of Kingdom Plantae." },
      { id: "C", text: "Zainab told she had memorized the entire classification of Kingdom Plantae." },
      { id: "D", text: "Zainab said that I had memorized the entire classification of Kingdom Plantae." }
    ],
    correctAnswer: "A",
    explanation: "'have memorized' (Present Perfect) shifts to 'had memorized' (Past Perfect), and 1st person 'I' changes to 3rd person 'she'."
  },
  {
    id: 9,
    category: "Modal Shift",
    ruleTested: "Modal transformation (can -> could)",
    question: "Direct: The mentor said to us, 'You can secure admission if you practice daily.'\nIndirect:",
    options: [
      { id: "A", text: "The mentor told us that we can secure admission if we practiced daily." },
      { id: "B", text: "The mentor told us that we could secure admission if we practiced daily." },
      { id: "C", text: "The mentor said us that we could secure admission if we practiced daily." },
      { id: "D", text: "The mentor told us that they could secure admission if they practice daily." }
    ],
    correctAnswer: "B",
    explanation: "Modal 'can' becomes 'could', second person 'you' shifts to 'we' (matching the object 'us'), and present simple 'practice' shifts to past simple 'practiced'."
  },
  {
    id: 10,
    category: "Exclamatory",
    ruleTested: "Exclamation to assertive with intensifier",
    question: "Direct: The student said, 'What a difficult biology paper it is!'\nIndirect:",
    options: [
      { id: "A", text: "The student exclaimed that what a difficult biology paper it was." },
      { id: "B", text: "The student exclaimed with surprise that it was a very difficult biology paper." },
      { id: "C", text: "The student exclaimed that it is a very difficult biology paper." },
      { id: "D", text: "The student said with wonder that what a difficult paper was it." }
    ],
    correctAnswer: "B",
    explanation: "Exclamatory sentences beginning with 'What a...' convert into assertive statements using intensifiers like 'a very', replacing the exclamation mark with a period."
  },
  {
    id: 11,
    category: "Request",
    ruleTested: "Removal of 'please' and imperative infinitive 'to + V1'",
    question: "Direct: The patient said to the physician, 'Please prescribe a milder painkiller.'\nIndirect:",
    options: [
      { id: "A", text: "The patient requested the physician to please prescribe a milder painkiller." },
      { id: "B", text: "The patient requested the physician that he should prescribe a milder painkiller." },
      { id: "C", text: "The patient requested the physician to prescribe a milder painkiller." },
      { id: "D", text: "The patient told the physician to kindly prescribe a milder painkiller." }
    ],
    correctAnswer: "C",
    explanation: "When 'requested' is used, courtesy words like 'please' and 'kindly' are dropped. The imperative clause is linked by the to-infinitive ('to prescribe')."
  },
  {
    id: 12,
    category: "Present Reporting Verb",
    ruleTested: "No tense shift when reporting verb is in present tense",
    question: "Direct: The cardiologist says, 'Hypertension damages coronary blood vessels.'\nIndirect:",
    options: [
      { id: "A", text: "The cardiologist says that hypertension damaged coronary blood vessels." },
      { id: "B", text: "The cardiologist says that hypertension damages coronary blood vessels." },
      { id: "C", text: "The cardiologist said that hypertension damages coronary blood vessels." },
      { id: "D", text: "The cardiologist tells that hypertension damaged coronary blood vessels." }
    ],
    correctAnswer: "B",
    explanation: "When the reporting verb is in the Present tense ('says'), NO tense backshift occurs in the reported speech."
  },
  {
    id: 13,
    category: "Advice",
    ruleTested: "Reporting verb 'advised' with infinitive",
    question: "Direct: The senior doctor said to the patient, 'Take your antibiotic doses at regular intervals.'\nIndirect:",
    options: [
      { id: "A", text: "The senior doctor advised the patient to take his antibiotic doses at regular intervals." },
      { id: "B", text: "The senior doctor advised to the patient that take your antibiotic doses at regular intervals." },
      { id: "C", text: "The senior doctor ordered the patient that he takes his antibiotic doses at regular intervals." },
      { id: "D", text: "The senior doctor suggested the patient to take your doses at regular intervals." }
    ],
    correctAnswer: "A",
    explanation: "Medical counsel uses the reporting verb 'advised + object + to + V1'. Possessive pronoun 'your' changes to 'his' referring to the patient."
  },
  {
    id: 14,
    category: "Time Marker",
    ruleTested: "'now' becomes 'then'",
    question: "Direct: Hamza said, 'I am preparing my chemistry notes now.'\nIndirect:",
    options: [
      { id: "A", text: "Hamza said that he was preparing his chemistry notes now." },
      { id: "B", text: "Hamza said that he was preparing his chemistry notes then." },
      { id: "C", text: "Hamza said that he is preparing his chemistry notes then." },
      { id: "D", text: "Hamza told that he had been preparing his chemistry notes then." }
    ],
    correctAnswer: "B",
    explanation: "'am preparing' becomes 'was preparing', and the time marker 'now' transforms to 'then'."
  },
  {
    id: 15,
    category: "Past Continuous",
    ruleTested: "Past Continuous to Past Perfect Continuous",
    question: "Direct: She said, 'I was revising the nervous system when the lights went out.'\nIndirect:",
    options: [
      { id: "A", text: "She said that she was revising the nervous system when the lights went out." },
      { id: "B", text: "She said that she had been revising the nervous system when the lights had gone out." },
      { id: "C", text: "She said that she has been revising the nervous system when the lights went out." },
      { id: "D", text: "She told she had revised the nervous system when the lights went out." }
    ],
    correctAnswer: "B",
    explanation: "Past Continuous ('was revising') shifts to Past Perfect Continuous ('had been revising'), and Past Simple in the time clause ('went out') backshifts to Past Perfect ('had gone out')."
  },
  {
    id: 16,
    category: "Demonstrative",
    ruleTested: "'these' becomes 'those', 'here' becomes 'there'",
    question: "Direct: The instructor said, 'Examine these bacterial slides here.'\nIndirect:",
    options: [
      { id: "A", text: "The instructor told us to examine these bacterial slides there." },
      { id: "B", text: "The instructor told us to examine those bacterial slides here." },
      { id: "C", text: "The instructor told us to examine those bacterial slides there." },
      { id: "D", text: "The instructor ordered that examine those bacterial slides there." }
    ],
    correctAnswer: "C",
    explanation: "Demonstrative 'these' changes to 'those', and location marker 'here' changes to 'there'. Imperative connects via 'to + examine'."
  },
  {
    id: 17,
    category: "Scientific Fact",
    ruleTested: "Physical constants / laws retain present tense",
    question: "Direct: The physicist stated, 'The speed of light in vacuum is approximately 300,000 km/s.'\nIndirect:",
    options: [
      { id: "A", text: "The physicist stated that the speed of light in vacuum was approximately 300,000 km/s." },
      { id: "B", text: "The physicist stated that the speed of light in vacuum is approximately 300,000 km/s." },
      { id: "C", text: "The physicist told that the speed of light in vacuum is approximately 300,000 km/s." },
      { id: "D", text: "The physicist stated that the speed of light in vacuum had been approximately 300,000 km/s." }
    ],
    correctAnswer: "B",
    explanation: "Universal physical constants and laws remain in Present Simple regardless of reporting verb tense."
  },
  {
    id: 18,
    category: "Interrogative",
    ruleTested: "WH question word order with 'Why'",
    question: "Direct: The teacher said to Bilal, 'Why are you lagging in your organic chemistry assignments?'\nIndirect:",
    options: [
      { id: "A", text: "The teacher asked Bilal why was he lagging in his organic chemistry assignments." },
      { id: "B", text: "The teacher asked Bilal that why he was lagging in his organic chemistry assignments." },
      { id: "C", text: "The teacher asked Bilal why he was lagging in his organic chemistry assignments." },
      { id: "D", text: "The teacher inquired Bilal why was he lagging in his organic chemistry assignments." }
    ],
    correctAnswer: "C",
    explanation: "In indirect WH-questions, statement word order is mandatory: 'why he was lagging' (NOT 'why was he lagging'). Also, never prepend 'that' before 'why'."
  },
  {
    id: 19,
    category: "Modal Shift",
    ruleTested: "'will' becomes 'would'",
    question: "Direct: Tariq said, 'I will complete my revision of biotechnology tomorrow.'\nIndirect:",
    options: [
      { id: "A", text: "Tariq said that he will complete his revision of biotechnology the next day." },
      { id: "B", text: "Tariq said that he would complete his revision of biotechnology the following day." },
      { id: "C", text: "Tariq said that he would complete his revision of biotechnology tomorrow." },
      { id: "D", text: "Tariq told that he would complete his revision of biotechnology the following day." }
    ],
    correctAnswer: "B",
    explanation: "'will' shifts to 'would', 1st person 'my' shifts to 'his', and 'tomorrow' shifts to 'the following day' or 'the next day'."
  },
  {
    id: 20,
    category: "Exclamatory",
    ruleTested: "'Hurrah' exclamation with joy",
    question: "Direct: Amina said, 'Hurrah! I have cleared the MDCAT entrance examination!'\nIndirect:",
    options: [
      { id: "A", text: "Amina exclaimed with joy that she had cleared the MDCAT entrance examination." },
      { id: "B", text: "Amina exclaimed with sorrow that she had cleared the MDCAT entrance examination." },
      { id: "C", text: "Amina exclaimed with joy that I have cleared the MDCAT entrance examination." },
      { id: "D", text: "Amina said happily that she cleared the MDCAT entrance examination." }
    ],
    correctAnswer: "A",
    explanation: "'Hurrah' is replaced by 'exclaimed with joy that', and 'have cleared' (Present Perfect) backshifts to 'had cleared' (Past Perfect)."
  },
  {
    id: 21,
    category: "Past Perfect",
    ruleTested: "Past Perfect remains unchanged in tense",
    question: "Direct: Usman said, 'I had already revised the circulatory system before the mock exam.'\nIndirect:",
    options: [
      { id: "A", text: "Usman said that he had already revised the circulatory system before the mock exam." },
      { id: "B", text: "Usman said that he has already revised the circulatory system before the mock exam." },
      { id: "C", text: "Usman said that he had had already revised the circulatory system before the mock exam." },
      { id: "D", text: "Usman told that he had already revised the circulatory system before the mock exam." }
    ],
    correctAnswer: "A",
    explanation: "Past Perfect ('had revised') undergoes NO tense change because there is no grammatical tense further in the past."
  },
  {
    id: 22,
    category: "Pronoun Shift",
    ruleTested: "Second person pronoun matching listener object",
    question: "Direct: The professor said to me, 'You must submit your research paper by Friday.'\nIndirect:",
    options: [
      { id: "A", text: "The professor told me that you must submit your research paper by Friday." },
      { id: "B", text: "The professor told me that I had to submit my research paper by Friday." },
      { id: "C", text: "The professor said to me that you had to submit your research paper by Friday." },
      { id: "D", text: "The professor told that I must submit my research paper by Friday." }
    ],
    correctAnswer: "B",
    explanation: "'You' and 'your' change to 'I' and 'my' because the object of reporting verb is 'me'. Urgent necessity 'must' becomes 'had to'."
  },
  {
    id: 23,
    category: "Negative Imperative",
    ruleTested: "'forbade' with positive infinitive (double negative trap)",
    question: "Direct: The warden said to the students, 'Do not leave the hostel after 9 PM.'\nIndirect:",
    options: [
      { id: "A", text: "The warden forbade the students not to leave the hostel after 9 PM." },
      { id: "B", text: "The warden forbade the students to leave the hostel after 9 PM." },
      { id: "C", text: "The warden ordered the students to not leave the hostel after 9 PM." },
      { id: "D", text: "The warden said the students not to leave the hostel after 9 PM." }
    ],
    correctAnswer: "B",
    explanation: "Because 'forbade' is inherently negative, it takes a positive infinitive ('to leave'). Adding 'not to' creates an incorrect double negative."
  },
  {
    id: 24,
    category: "Present Perfect Continuous",
    ruleTested: "Present Perfect Continuous to Past Perfect Continuous",
    question: "Direct: Asad said, 'I have been studying photosynthesis for three consecutive hours.'\nIndirect:",
    options: [
      { id: "A", text: "Asad said that he has been studying photosynthesis for three consecutive hours." },
      { id: "B", text: "Asad said that he was studying photosynthesis for three consecutive hours." },
      { id: "C", text: "Asad said that he had been studying photosynthesis for three consecutive hours." },
      { id: "D", text: "Asad told that he had been studying photosynthesis for three consecutive hours." }
    ],
    correctAnswer: "C",
    explanation: "'have been studying' shifts into 'had been studying' (Past Perfect Continuous)."
  },
  {
    id: 25,
    category: "Future Reporting Verb",
    ruleTested: "Future reporting verb ('will say') retains tense",
    question: "Direct: The chemist will say, 'The chemical reaction is exothermic.'\nIndirect:",
    options: [
      { id: "A", text: "The chemist will say that the chemical reaction was exothermic." },
      { id: "B", text: "The chemist will say that the chemical reaction is exothermic." },
      { id: "C", text: "The chemist would say that the chemical reaction is exothermic." },
      { id: "D", text: "The chemist will tell that the chemical reaction had been exothermic." }
    ],
    correctAnswer: "B",
    explanation: "When the reporting verb is in the Future tense ('will say'), the tense in the reported clause is NOT backshifted."
  },
  {
    id: 26,
    category: "Interrogative",
    ruleTested: "'Did' question in direct speech converts to Past Perfect in indirect",
    question: "Direct: The teacher said to Fatima, 'Did you attend yesterday's biology lecture?'\nIndirect:",
    options: [
      { id: "A", text: "The teacher asked Fatima if she attended the previous day's biology lecture." },
      { id: "B", text: "The teacher asked Fatima if did she attend yesterday's biology lecture." },
      { id: "C", text: "The teacher asked Fatima if she had attended the previous day's biology lecture." },
      { id: "D", text: "The teacher asked Fatima that whether she had attended yesterday's biology lecture." }
    ],
    correctAnswer: "C",
    explanation: "The direct question is in Past Simple ('Did you attend'). In indirect speech, it backshifts to Past Perfect ('she had attended') in statement word order, and 'yesterday' becomes 'the previous day'."
  },
  {
    id: 27,
    category: "Exclamatory",
    ruleTested: "'Alas' sorrow exclamation",
    question: "Direct: The researcher said, 'Alas! Our experimental culture has been contaminated.'\nIndirect:",
    options: [
      { id: "A", text: "The researcher exclaimed with sorrow that their experimental culture had been contaminated." },
      { id: "B", text: "The researcher exclaimed with joy that their experimental culture had been contaminated." },
      { id: "C", text: "The researcher cried that our experimental culture was contaminated." },
      { id: "D", text: "The researcher exclaimed with sorrow that our experimental culture has been contaminated." }
    ],
    correctAnswer: "A",
    explanation: "'Alas!' converts into 'exclaimed with sorrow that', 1st person plural 'our' shifts to 3rd person 'their', and 'has been' shifts to 'had been'."
  },
  {
    id: 28,
    category: "Suggestion",
    ruleTested: "'Let us' suggestion pattern with 'suggested that we should'",
    question: "Direct: Ali said to his classmates, 'Let us solve the past paper together.'\nIndirect:",
    options: [
      { id: "A", text: "Ali ordered his classmates that they should solve the past paper together." },
      { id: "B", text: "Ali suggested to his classmates that they should solve the past paper together." },
      { id: "C", text: "Ali suggested his classmates to solve the past paper together." },
      { id: "D", text: "Ali told to his classmates that let them solve the past paper together." }
    ],
    correctAnswer: "B",
    explanation: "Proposals or suggestions with 'Let us' convert using 'suggested (to someone) that they/we should + V1'."
  },
  {
    id: 29,
    category: "Time Marker",
    ruleTested: "'ago' becomes 'before'",
    question: "Direct: Dr. Bilal said, 'The patient suffered a stroke two weeks ago.'\nIndirect:",
    options: [
      { id: "A", text: "Dr. Bilal said that the patient had suffered a stroke two weeks ago." },
      { id: "B", text: "Dr. Bilal said that the patient had suffered a stroke two weeks before." },
      { id: "C", text: "Dr. Bilal said that the patient suffered a stroke two weeks earlier." },
      { id: "D", text: "Dr. Bilal told that the patient had suffered a stroke two weeks before." }
    ],
    correctAnswer: "B",
    explanation: "Past Simple 'suffered' backshifts to Past Perfect 'had suffered', and time adverbial 'ago' changes to 'before'."
  },
  {
    id: 30,
    category: "Grammar Trap",
    ruleTested: "Double Conjunction prohibition ('that where')",
    question: "Which of the following sentences is free from grammatical errors?",
    options: [
      { id: "A", text: "She inquired that where the biochemical analyzers were kept." },
      { id: "B", text: "She inquired where were the biochemical analyzers kept." },
      { id: "C", text: "She inquired where the biochemical analyzers were kept." },
      { id: "D", text: "She asked to me where the biochemical analyzers were kept." }
    ],
    correctAnswer: "C",
    explanation: "Option C correctly uses the WH-word 'where' as connector without redundant 'that', avoids inversion ('were kept' follows subject), and uses valid reporting verb syntax."
  }
];

// ==========================================================================
// 2. DATA: 16 FLASHCARDS
// ==========================================================================
const flashcardsData = [
  {
    id: 1,
    topic: "Direct vs Indirect",
    category: "Concept Definition",
    badge: "Basics",
    front: {
      title: "Direct vs. Indirect Speech",
      prompt: "What happens to quotation marks, pronouns, and tenses when converting Direct to Indirect Speech?"
    },
    back: {
      rule: "Direct speech quotes exact words in quotation marks. Indirect speech removes quotation marks, adjusts pronouns to the narrative perspective, and backshifts tense if the reporting verb is in the past.",
      formula: "Direct: Said, \"...\" ➔ Indirect: Said that / asked if / told to + V1",
      example: "Direct: Ali said, \"I am preparing for MDCAT.\"\nIndirect: Ali said that he was preparing for MDCAT."
    }
  },
  {
    id: 2,
    topic: "Pronoun Formula",
    category: "Pronoun Shift",
    badge: "S-O-N Rule",
    front: {
      title: "The S-O-N Pronoun Rule",
      prompt: "How do 1st, 2nd, and 3rd person pronouns in reported speech change based on the reporting verb?"
    },
    back: {
      rule: "1st Person (I, we, my) changes according to the SUBJECT (S).\n2nd Person (you, your) changes according to the OBJECT (O).\n3rd Person (he, she, it, they) undergoes NO CHANGE (N).",
      formula: "1 ➔ Subject | 2 ➔ Object | 3 ➔ No change",
      example: "Direct: She said to me, \"You have taken my notes.\"\nIndirect: She told me that I had taken her notes."
    }
  },
  {
    id: 3,
    topic: "Tense Shift 1",
    category: "Present Simple",
    badge: "Tense Rule",
    front: {
      title: "Present Simple ➔ Past Simple",
      prompt: "How does Present Simple (Subject + V1) change when reporting verb is in Past Tense?"
    },
    back: {
      rule: "Present Simple shifts one step back to Past Simple (Subject + V2). Auxiliary 'do/does' becomes 'did' in negatives and questions.",
      formula: "V1 / Vs,es ➔ V2 | do/does not ➔ did not",
      example: "Direct: She said, \"I study biology daily.\"\nIndirect: She said that she studied biology daily."
    }
  },
  {
    id: 4,
    topic: "Tense Shift 2",
    category: "Present Continuous",
    badge: "Tense Rule",
    front: {
      title: "Present Continuous ➔ Past Continuous",
      prompt: "What does 'is/am/are + V-ing' convert into in indirect speech?"
    },
    back: {
      rule: "is/am/are + V-ing changes into was/were + V-ing. Ensure subject-verb agreement matches the new pronoun.",
      formula: "is/am/are + V-ing ➔ was/were + V-ing",
      example: "Direct: He said, \"I am preparing for the test.\"\nIndirect: He said that he was preparing for the test."
    }
  },
  {
    id: 5,
    topic: "Tense Shift 3",
    category: "Present Perfect",
    badge: "Tense Rule",
    front: {
      title: "Present Perfect ➔ Past Perfect",
      prompt: "How do 'has/have + V3' and 'has/have been + V-ing' transform in indirect speech?"
    },
    back: {
      rule: "Present Perfect (has/have + V3) becomes Past Perfect (had + V3). Present Perfect Continuous becomes Past Perfect Continuous (had been + V-ing).",
      formula: "has/have + V3 ➔ had + V3 | has/have been ➔ had been",
      example: "Direct: Sara said, \"I have completed my work.\"\nIndirect: Sara said that she had completed her work."
    }
  },
  {
    id: 6,
    topic: "Tense Shift 4",
    category: "Past Simple",
    badge: "MDCAT Favorite",
    front: {
      title: "Past Simple ➔ Past Perfect",
      prompt: "How does Past Simple (V2 / did + V1) convert in indirect speech?"
    },
    back: {
      rule: "Past Simple (V2) backshifts to Past Perfect (had + V3). Do not leave it in past simple!",
      formula: "Subject + V2 ➔ Subject + had + V3",
      example: "Direct: He said, \"I visited Lahore yesterday.\"\nIndirect: He said that he had visited Lahore the previous day."
    }
  },
  {
    id: 7,
    topic: "Tense Shift 5",
    category: "Past Continuous",
    badge: "Tense Rule",
    front: {
      title: "Past Continuous ➔ Past Perfect Continuous",
      prompt: "What does 'was/were + V-ing' convert into in indirect speech?"
    },
    back: {
      rule: "Past Continuous (was/were + V-ing) transforms into Past Perfect Continuous (had been + V-ing).",
      formula: "was/were + V-ing ➔ had been + V-ing",
      example: "Direct: She said, \"I was studying genetics.\"\nIndirect: She said that she had been studying genetics."
    }
  },
  {
    id: 8,
    topic: "Modal Auxiliaries",
    category: "Modal Verbs",
    badge: "Modals",
    front: {
      title: "Modal Shifts (will, can, may, shall)",
      prompt: "How do primary modals change? What happens to would, could, should, might?"
    },
    back: {
      rule: "will ➔ would | can ➔ could | may ➔ might | shall ➔ should/would. Modals already in past form (would, could, should, might, ought to) remain UNCHANGED.",
      formula: "will ➔ would | can ➔ could | may ➔ might",
      example: "Direct: Ali said, \"I can crack MDCAT.\"\nIndirect: Ali said that he could crack MDCAT."
    }
  },
  {
    id: 9,
    topic: "Exceptions",
    category: "Universal Truths",
    badge: "No Tense Change",
    front: {
      title: "Universal Truths & Scientific Laws",
      prompt: "Does tense change when reported speech expresses a universal truth or scientific fact?"
    },
    back: {
      rule: "NO. Universal scientific truths, perpetual natural laws, mathematical facts, and proverbs retain their present tense in indirect speech.",
      formula: "Reporting Verb (Past) + Universal Fact ➔ Retain Present Tense",
      example: "Direct: Teacher said, \"The Earth revolves around the Sun.\"\nIndirect: Teacher said that the Earth revolves around the Sun."
    }
  },
  {
    id: 10,
    topic: "Interrogatives",
    category: "Yes/No Questions",
    badge: "Questions 1",
    front: {
      title: "Yes / No Questions Conversion",
      prompt: "How are Yes/No questions transformed into indirect speech?"
    },
    back: {
      rule: "1. Reporting verb becomes 'asked/inquired of'.\n2. Use conjunction 'if' or 'whether' (NEVER 'that').\n3. Convert question order to statement order (Subject + Verb).\n4. Drop question mark.",
      formula: "asked + object + if/whether + Subject + Verb + .",
      example: "Direct: He said, \"Are you ready?\"\nIndirect: He asked if I was ready."
    }
  },
  {
    id: 11,
    topic: "Interrogatives",
    category: "WH Questions",
    badge: "Questions 2",
    front: {
      title: "WH Questions (What, Where, Why, How)",
      prompt: "What conjunction is used for WH questions, and what happens to word order?"
    },
    back: {
      rule: "1. The WH-word itself acts as the connector (DO NOT use 'that' or 'if').\n2. Inverted order reverts to standard Subject + Verb.\n3. Auxiliary 'did/do' is dropped in positive statements.",
      formula: "asked + WH-word + Subject + Verb + .",
      example: "Direct: She said, \"Where do you live?\"\nIndirect: She asked where I lived."
    }
  },
  {
    id: 12,
    topic: "Imperatives",
    category: "Commands & Orders",
    badge: "Imperatives 1",
    front: {
      title: "Commands & Orders (To + V1)",
      prompt: "How do direct commands (e.g. 'Open the book!') transform in indirect speech?"
    },
    back: {
      rule: "1. Reporting verb becomes 'ordered', 'commanded', or 'told'.\n2. Mandatory personal object follows reporting verb.\n3. The action verb is introduced by 'to + base verb (V1)'. Do NOT use 'that'.",
      formula: "Subject + ordered + Object + to + V1",
      example: "Direct: The teacher said to the student, \"Open the book.\"\nIndirect: The teacher told the student to open the book."
    }
  },
  {
    id: 13,
    topic: "Imperatives",
    category: "Negative Commands",
    badge: "Trap Alert",
    front: {
      title: "Negative Commands (Do Not...)",
      prompt: "How do you convert 'Do not eat junk food' into indirect speech?"
    },
    back: {
      rule: "Convert 'Do not + V1' into 'not to + V1'. If using 'forbade', use positive infinitive 'to + V1' (double negative error if you add 'not').",
      formula: "warned/advised + Object + NOT TO + V1",
      example: "Direct: Doctor said, \"Do not eat junk food.\"\nIndirect: Doctor advised me not to eat junk food."
    }
  },
  {
    id: 14,
    topic: "Requests",
    category: "Polite Appeals",
    badge: "Requests",
    front: {
      title: "Requests (Please / Kindly)",
      prompt: "What reporting verb is used for sentences with 'Please', and what happens to 'please'?"
    },
    back: {
      rule: "1. Reporting verb changes to 'requested', 'begged', or 'pleaded'.\n2. Words like 'please' and 'kindly' are dropped because their politeness is in the verb.\n3. Connect with 'to + V1'.",
      formula: "Subject + requested + Object + to + V1",
      example: "Direct: He said to me, \"Please help me.\"\nIndirect: He requested me to help him."
    }
  },
  {
    id: 15,
    topic: "Say vs Tell",
    category: "Exam Traps",
    badge: "Syntax Rule",
    front: {
      title: "Say vs. Tell (The Personal Object Rule)",
      prompt: "What is the critical structural difference between 'say' and 'tell'?"
    },
    back: {
      rule: "'Say' takes 'that' or 'to + person' (said that... / said to me). 'Tell' MUST take a direct personal object without 'to' (told me that...).",
      formula: "say + that | say to + person | tell + person + that (NEVER 'tell to me' / 'tell that')",
      example: "Wrong: ❌ He told that he was tired.\nCorrect: ✅ He told me that he was tired."
    }
  },
  {
    id: 16,
    topic: "Exclamations",
    category: "Emotional Sentences",
    badge: "Exclamations",
    front: {
      title: "Exclamatory Sentences",
      prompt: "How are exclamations with 'Hurrah', 'Alas', and 'What a...' transformed?"
    },
    back: {
      rule: "1. Reporting verb: 'exclaimed with joy / sorrow / admiration'.\n2. Conjunction is 'that'.\n3. Interjections are removed.\n4. 'What a / How + Adj' converts to 'a very / great'.",
      formula: "exclaimed with [emotion] + that + Subject + was/were + very + Adjective",
      example: "Direct: She said, \"What a beautiful place!\"\nIndirect: She exclaimed with admiration that it was a very beautiful place."
    }
  }
];

// ==========================================================================
// 3. DATA: SPEECH TRANSFORMATION LAB CHALLENGES
// ==========================================================================
const labChallenges = [
  {
    id: 1,
    category: "Statement",
    speaker: "Dr. Hamza (Pathology Resident)",
    directSpeech: 'Dr. Hamza said, "I have identified the abnormal lymphocytes under the microscope."',
    context: "Medical Laboratory Diagnostics",
    options: [
      { id: "A", text: 'Dr. Hamza said that he has identified the abnormal lymphocytes under the microscope.', isCorrect: false, reason: "Present Perfect 'has identified' was not backshifted to Past Perfect." },
      { id: "B", text: 'Dr. Hamza said that he had identified the abnormal lymphocytes under the microscope.', isCorrect: true, reason: "Correct! 'I' becomes 'he', and 'have identified' backshifts to 'had identified'." },
      { id: "C", text: 'Dr. Hamza told that he had identified the abnormal lymphocytes under the microscope.', isCorrect: false, reason: "'told' cannot be used without a direct personal object." },
      { id: "D", text: 'Dr. Hamza said that I had identified the abnormal lymphocytes under the microscope.', isCorrect: false, reason: "First person pronoun 'I' was erroneously not shifted to 'he'." }
    ],
    explanationSteps: [
      { step: 1, title: "Reporting Verb", description: "Reporting verb 'said' is in past tense and has no listener, so it remains 'said that'." },
      { step: 2, title: "Pronoun Conversion", description: "First person pronoun 'I' converts to 3rd person 'he' according to subject Dr. Hamza." },
      { step: 3, title: "Tense Backshift", description: "Present Perfect ('have identified') backshifts to Past Perfect ('had identified')." }
    ],
    ruleSummary: "Statement Formula: Subject + said + that + Subject (shifted) + had + V3 + predicate."
  },
  {
    id: 2,
    category: "Yes/No Question",
    speaker: "Senior Cardiologist",
    directSpeech: 'The cardiologist said to the patient, "Are you experiencing chest tightness now?"',
    context: "Emergency Medical Examination",
    options: [
      { id: "A", text: 'The cardiologist asked the patient that if he was experiencing chest tightness then.', isCorrect: false, reason: "Redundant conjunction 'that if' is grammatically incorrect." },
      { id: "B", text: 'The cardiologist asked the patient if was he experiencing chest tightness then.', isCorrect: false, reason: "Inverted word order 'was he' must revert to statement order 'he was'." },
      { id: "C", text: 'The cardiologist asked the patient if he was experiencing chest tightness then.', isCorrect: true, reason: "Correct! Uses 'if', statement word order 'he was', and 'now' transforms to 'then'." },
      { id: "D", text: 'The cardiologist inquired the patient whether he is experiencing chest tightness now.', isCorrect: false, reason: "Tense was not shifted to past continuous and 'now' was not shifted to 'then'." }
    ],
    explanationSteps: [
      { step: 1, title: "Reporting Verb & Connector", description: "'said to' becomes 'asked + patient', connected by 'if' or 'whether'." },
      { step: 2, title: "Word Order Reset", description: "Inverted auxiliary 'Are you' transforms to assertive 'he was'." },
      { step: 3, title: "Time Marker Transformation", description: "'now' transforms to 'then'." }
    ],
    ruleSummary: "Yes/No Question Formula: asked + object + if + Subject + was/were + V-ing + then."
  },
  {
    id: 3,
    category: "WH Question",
    speaker: "Physics Professor",
    directSpeech: 'The professor said to Tariq, "Why did you select magnetic resonance imaging for your project?"',
    context: "Medical Physics Seminar",
    options: [
      { id: "A", text: 'The professor asked Tariq why had he selected magnetic resonance imaging for his project.', isCorrect: false, reason: "Question order 'had he' must be assertive order 'he had'." },
      { id: "B", text: 'The professor asked Tariq why he had selected magnetic resonance imaging for his project.', isCorrect: true, reason: "Correct! WH-word 'why' connects the clause, Past Simple 'did select' backshifts to Past Perfect 'he had selected', and 'your' becomes 'his'." },
      { id: "C", text: 'The professor asked Tariq that why he selected magnetic resonance imaging for his project.', isCorrect: false, reason: "Never place 'that' before a WH question word, and 'selected' did not backshift to past perfect." },
      { id: "D", text: 'The professor inquired of Tariq why did he select magnetic resonance imaging for his project.', isCorrect: false, reason: "Auxiliary 'did' cannot remain inside positive indirect clauses." }
    ],
    explanationSteps: [
      { step: 1, title: "WH-Connector", description: "Use 'why' directly without 'that' or 'if'." },
      { step: 2, title: "Tense Shift (Past Simple ➔ Past Perfect)", description: "Past Simple question ('did you select') becomes Past Perfect statement ('he had selected')." },
      { step: 3, title: "Pronoun Shift", description: "'you' ➔ 'he', 'your' ➔ 'his'." }
    ],
    ruleSummary: "WH Question Formula: asked + Object + WH-word + Subject + had + V3."
  },
  {
    id: 4,
    category: "Command",
    speaker: "Chief Surgeon",
    directSpeech: 'The chief surgeon said to the surgical team, "Maintain a completely sterile environment in the OR."',
    context: "Operating Theater Protocol",
    options: [
      { id: "A", text: 'The chief surgeon ordered the surgical team that maintain a completely sterile environment in the OR.', isCorrect: false, reason: "Commands use to-infinitive, not 'that + bare verb'." },
      { id: "B", text: 'The chief surgeon ordered to the surgical team to maintain a completely sterile environment in the OR.', isCorrect: false, reason: "'ordered' takes direct object without 'to'." },
      { id: "C", text: 'The chief surgeon ordered the surgical team to maintain a completely sterile environment in the OR.', isCorrect: true, reason: "Correct! 'ordered + object + to + V1' correctly conveys the command." },
      { id: "D", text: 'The chief surgeon said to the team to maintaining a completely sterile environment in the OR.', isCorrect: false, reason: "Incorrect infinitive form 'to maintaining'." }
    ],
    explanationSteps: [
      { step: 1, title: "Reporting Verb", description: "'said to' becomes authoritative 'ordered + object'." },
      { step: 2, title: "Infinitive Linker", description: "The imperative base verb 'Maintain' connects via 'to maintain'." }
    ],
    ruleSummary: "Command Formula: ordered + Object + to + Base Verb (V1)."
  },
  {
    id: 5,
    category: "Request",
    speaker: "MDCAT Student",
    directSpeech: 'Bilal said to the professor, "Please clarify the difference between active and passive transport."',
    context: "Cellular Biology Query",
    options: [
      { id: "A", text: 'Bilal requested the professor to clarify the difference between active and passive transport.', isCorrect: true, reason: "Correct! 'requested' absorbs politeness, 'please' is omitted, and infinitive 'to clarify' is used." },
      { id: "B", text: 'Bilal requested the professor to please clarify the difference between active and passive transport.', isCorrect: false, reason: "'please' must be omitted when 'requested' is used." },
      { id: "C", text: 'Bilal told the professor to clarify the difference between active and passive transport.', isCorrect: false, reason: "'told' does not capture the polite request mood indicated by 'Please'." },
      { id: "D", text: 'Bilal requested that the professor clarifies the difference between active and passive transport.', isCorrect: false, reason: "Incorrect subjunctive/assertive construction instead of standard to-infinitive." }
    ],
    explanationSteps: [
      { step: 1, title: "Polite Verb Selection", description: "'said to' + 'Please' becomes 'requested + object'." },
      { step: 2, title: "Drop Courtesy Adverbs", description: "'Please' and 'Kindly' are removed." },
      { step: 3, title: "Infinitive Construction", description: "Use 'to clarify'." }
    ],
    ruleSummary: "Request Formula: requested + Object + to + Base Verb (V1)."
  },
  {
    id: 6,
    category: "Advice",
    speaker: "Consultant Pulmonologist",
    directSpeech: 'The doctor said to the patient, "Avoid smoking and practice diaphragmatic breathing daily."',
    context: "Respiratory Clinic Consultation",
    options: [
      { id: "A", text: 'The doctor advised the patient to avoid smoking and practice diaphragmatic breathing daily.', isCorrect: true, reason: "Correct! 'advised + object + to + V1' correctly represents medical counsel." },
      { id: "B", text: 'The doctor advised to the patient that avoid smoking and practice diaphragmatic breathing daily.', isCorrect: false, reason: "'advised to the patient' has superfluous 'to', and 'that avoid' is ungrammatical." },
      { id: "C", text: 'The doctor ordered the patient that he should avoid smoking and practicing breathing daily.', isCorrect: false, reason: "Medical counsel is better expressed with 'advised'." },
      { id: "D", text: 'The doctor advised the patient not to smoke and practice diaphragmatic breathing daily.', isCorrect: false, reason: "Changes the wording unnecessarily away from the direct text." }
    ],
    explanationSteps: [
      { step: 1, title: "Medical Counsel Verb", description: "'said to' converts to 'advised + patient'." },
      { step: 2, title: "Compound Infinitive", description: "'to avoid smoking and practice...' maintains parallel infinitive structure." }
    ],
    ruleSummary: "Advice Formula: advised + Object + to + Base Verb (V1)."
  },
  {
    id: 7,
    category: "Exclamation",
    speaker: "Dr. Ayesha (Biochemistry Lab Head)",
    directSpeech: 'Dr. Ayesha said, "Hurrah! We have successfully synthesized the recombinant protein!"',
    context: "Genetic Engineering Lab Breakthrough",
    options: [
      { id: "A", text: 'Dr. Ayesha exclaimed with joy that they had successfully synthesized the recombinant protein.', isCorrect: true, reason: "Correct! 'Hurrah' converts to 'exclaimed with joy that', 'we' becomes 'they', and 'have synthesized' backshifts to 'had synthesized'." },
      { id: "B", text: 'Dr. Ayesha exclaimed with surprise that we have successfully synthesized the recombinant protein.', isCorrect: false, reason: "Emotion is joy rather than surprise, 'we' was not converted to 'they', and tense did not shift." },
      { id: "C", text: 'Dr. Ayesha exclaimed with joy that they have successfully synthesized the recombinant protein.', isCorrect: false, reason: "Tense was not backshifted from 'have' to 'had'." },
      { id: "D", text: 'Dr. Ayesha said happily that hurrah they had successfully synthesized the recombinant protein.', isCorrect: false, reason: "Interjection 'hurrah' must be deleted in indirect speech." }
    ],
    explanationSteps: [
      { step: 1, title: "Emotion Mapping", description: "'Hurrah!' maps to 'exclaimed with joy that'." },
      { step: 2, title: "Pronoun Conversion", description: "First person plural 'We' becomes 3rd person plural 'They'." },
      { step: 3, title: "Tense Backshift", description: "Present Perfect ('have synthesized') ➔ Past Perfect ('had synthesized')." }
    ],
    ruleSummary: "Exclamation Formula: exclaimed with [emotion] + that + Subject + had + V3."
  }
];

// ==========================================================================
// 4. APPLICATION STATE & PERSISTENCE
// ==========================================================================
const STORAGE_KEY = "mdcat_speech_mastery_v1";

const defaultAppState = {
  theme: "light",
  bookmarks: ["sec-traps", "sec-tense-table", "sec-lab"],
  completedSections: ["sec-direct", "sec-indirect"],
  quizBestScore: 0,
  quizAttempts: 0,
  quizCurrentIndex: 0,
  quizScore: 0,
  quizUserAnswers: {},
  masteredFlashcards: [1, 2],
  streakCount: 3,
  lastStudyDate: new Date().toISOString().slice(0, 10),
  activeLabCategory: "Statement"
};

let appState = { ...defaultAppState };

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      appState = { ...defaultAppState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("localStorage not accessible, using default state", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
  updateDashboardUI();
}

// ==========================================================================
// 5. TOAST NOTIFICATIONS & COPY UTILITIES
// ==========================================================================
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied to clipboard!");
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("Copied to clipboard!");
  } catch (err) {
    showToast("Failed to copy text", "error");
  }
  document.body.removeChild(textArea);
}

// ==========================================================================
// 6. THEME SWITCHING (DARK / LIGHT)
// ==========================================================================
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const isDark = appState.theme === "dark" || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && appState.theme !== "light");

  if (isDark) {
    document.body.classList.add("dark-mode");
    appState.theme = "dark";
  } else {
    document.body.classList.remove("dark-mode");
    appState.theme = "light";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const currentIsDark = document.body.classList.contains("dark-mode");
      appState.theme = currentIsDark ? "dark" : "light";
      saveState();
      showToast(`Switched to ${currentIsDark ? "Dark" : "Light"} theme`);
    });
  }
}

// ==========================================================================
// 7. BOOKMARKS SYSTEM
// ==========================================================================
function toggleBookmark(sectionId, sectionTitle) {
  const index = appState.bookmarks.indexOf(sectionId);
  if (index > -1) {
    appState.bookmarks.splice(index, 1);
    showToast(`Removed "${sectionTitle}" from bookmarks`);
  } else {
    appState.bookmarks.push(sectionId);
    showToast(`Bookmarked "${sectionTitle}"!`);
  }
  saveState();
  renderBookmarkDrawer();
  updateBookmarkButtonsUI();
}

function updateBookmarkButtonsUI() {
  document.querySelectorAll("[data-bookmark-target]").forEach(btn => {
    const targetId = btn.getAttribute("data-bookmark-target");
    if (appState.bookmarks.includes(targetId)) {
      btn.classList.add("bookmarked");
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Bookmarked</span>
      `;
    } else {
      btn.classList.remove("bookmarked");
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Bookmark</span>
      `;
    }
  });

  const badge = document.getElementById("bookmark-count-badge");
  if (badge) {
    badge.textContent = appState.bookmarks.length;
  }
}

function renderBookmarkDrawer() {
  const container = document.getElementById("bookmarks-items-list");
  if (!container) return;

  if (appState.bookmarks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem; opacity: 0.5;">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <p style="font-weight: 600;">No bookmarks saved yet</p>
        <p style="font-size: 0.8rem; margin-top: 0.25rem;">Click the bookmark icon on any section to save it for quick revision.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.bookmarks.map(id => {
    const secEl = document.getElementById(id);
    const title = secEl ? (secEl.querySelector(".section-heading")?.textContent || id) : id;
    return `
      <div class="bookmark-entry-card">
        <a href="#${id}" class="bookmark-link" onclick="closeBookmarkDrawer()" style="color: var(--text-primary); text-decoration: none; font-weight: 600; font-size: 0.9rem; flex: 1;">
          ${title}
        </a>
        <button class="btn-icon" style="width: 28px; height: 28px;" onclick="toggleBookmark('${id}', '${title}')" title="Remove bookmark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  }).join("");
}

function openBookmarkDrawer() {
  document.getElementById("bookmarks-drawer")?.classList.add("open");
  document.getElementById("bookmarks-overlay")?.classList.add("active");
  renderBookmarkDrawer();
}

function closeBookmarkDrawer() {
  document.getElementById("bookmarks-drawer")?.classList.remove("open");
  document.getElementById("bookmarks-overlay")?.classList.remove("active");
}

// ==========================================================================
// 8. FLASHCARDS COMPONENT (3D FLIP & MASTERY)
// ==========================================================================
function renderFlashcards() {
  const container = document.getElementById("flashcards-container");
  if (!container) return;

  container.innerHTML = flashcardsData.map(card => {
    const isMastered = appState.masteredFlashcards.includes(card.id);
    return `
      <div class="flashcard-wrapper" id="flashcard-${card.id}" onclick="flipCard(${card.id})">
        <div class="flashcard-inner">
          <!-- FRONT OF CARD -->
          <div class="flashcard-front">
            <div>
              <div class="flashcard-header">
                <span class="flashcard-badge" style="background: var(--primary-indigo-light); color: var(--primary-indigo);">
                  ${card.badge}
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">
                  #${card.id} / 16
                </span>
              </div>
              <h4 class="flashcard-title">${card.front.title}</h4>
              <p class="flashcard-prompt">${card.front.prompt}</p>
            </div>
            <div class="flashcard-footer">
              <span style="display: flex; align-items: center; gap: 0.3rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Click to flip
              </span>
              ${isMastered ? '<span style="color: var(--emerald); font-weight: 700;">✓ Mastered</span>' : ''}
            </div>
          </div>

          <!-- BACK OF CARD -->
          <div class="flashcard-back">
            <div>
              <div class="flashcard-header">
                <span class="flashcard-badge" style="background: var(--violet-light); color: var(--violet);">
                  Rule & Formula
                </span>
                <button class="btn-action-small" onclick="event.stopPropagation(); toggleMastery(${card.id})" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;">
                  ${isMastered ? '✓ Mastered' : 'Mark Mastered'}
                </button>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.45; white-space: pre-line;">
                ${card.back.rule}
              </p>
              <div style="background: var(--bg-primary); padding: 0.5rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-family: var(--font-mono); color: var(--primary-indigo); margin-bottom: 0.5rem;">
                ${card.back.formula}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); background: var(--bg-primary); padding: 0.4rem; border-radius: var(--radius-sm); white-space: pre-line;">
                ${card.back.example}
              </div>
            </div>
            <div class="flashcard-footer">
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function flipCard(cardId) {
  const cardEl = document.getElementById(`flashcard-${cardId}`);
  if (cardEl) {
    cardEl.classList.toggle("flipped");
  }
}

function toggleMastery(cardId) {
  const idx = appState.masteredFlashcards.indexOf(cardId);
  if (idx > -1) {
    appState.masteredFlashcards.splice(idx, 1);
    showToast(`Card #${cardId} un-marked`);
  } else {
    appState.masteredFlashcards.push(cardId);
    showToast(`Card #${cardId} marked as Mastered!`);
  }
  saveState();
  renderFlashcards();
}

// ==========================================================================
// 9. SPEECH TRANSFORMATION LAB
// ==========================================================================
let currentLabIndex = 0;

function initTransformationLab() {
  const tabsContainer = document.getElementById("lab-category-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = labChallenges.map((challenge, idx) => `
    <button class="lab-tab-btn ${idx === currentLabIndex ? 'active' : ''}" onclick="selectLabChallenge(${idx})">
      ${challenge.category}
    </button>
  `).join("");

  renderActiveLabChallenge();
}

function selectLabChallenge(index) {
  currentLabIndex = index;
  document.querySelectorAll(".lab-tab-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });
  renderActiveLabChallenge();
}

function renderActiveLabChallenge() {
  const challenge = labChallenges[currentLabIndex];
  if (!challenge) return;

  const speakerEl = document.getElementById("lab-speaker");
  const directSpeechEl = document.getElementById("lab-direct-speech");
  const optionsGrid = document.getElementById("lab-options-grid");
  const feedbackPanel = document.getElementById("lab-feedback-panel");
  const contextEl = document.getElementById("lab-context-badge");

  if (speakerEl) speakerEl.textContent = challenge.speaker;
  if (contextEl) contextEl.textContent = challenge.context;
  if (directSpeechEl) directSpeechEl.textContent = challenge.directSpeech;
  if (feedbackPanel) {
    feedbackPanel.className = "lab-feedback-panel";
    feedbackPanel.innerHTML = "";
  }

  if (optionsGrid) {
    optionsGrid.innerHTML = challenge.options.map(opt => `
      <button class="lab-option-btn" id="lab-opt-${opt.id}" onclick="handleLabAnswer('${opt.id}')">
        <span style="display: flex; align-items: center; gap: 0.75rem;">
          <strong style="width: 24px; height: 24px; border-radius: 50%; background: var(--bg-tertiary); display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">
            ${opt.id}
          </strong>
          <span>${opt.text}</span>
        </span>
      </button>
    `).join("");
  }
}

function handleLabAnswer(selectedId) {
  const challenge = labChallenges[currentLabIndex];
  const selectedOption = challenge.options.find(o => o.id === selectedId);
  const feedbackPanel = document.getElementById("lab-feedback-panel");

  // Disable all options
  document.querySelectorAll(".lab-option-btn").forEach(btn => {
    btn.disabled = true;
  });

  // Highlight correct and incorrect
  challenge.options.forEach(opt => {
    const btn = document.getElementById(`lab-opt-${opt.id}`);
    if (opt.isCorrect) {
      btn?.classList.add("correct");
    } else if (opt.id === selectedId) {
      btn?.classList.add("incorrect");
    }
  });

  if (feedbackPanel) {
    feedbackPanel.classList.add("active");
    feedbackPanel.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
        <span style="font-size: 1.25rem;">${selectedOption.isCorrect ? '✅' : '❌'}</span>
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: ${selectedOption.isCorrect ? 'var(--emerald)' : 'var(--coral)'};">
          ${selectedOption.isCorrect ? 'Flawless Transformation!' : 'Grammar Pitfall Detected'}
        </h4>
      </div>
      <p style="font-size: 0.95rem; margin-bottom: 1rem; color: var(--text-secondary);">
        ${selectedOption.reason}
      </p>
      
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
        <h5 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-indigo); font-weight: 700; margin-bottom: 0.5rem;">
          Step-by-Step Rule Breakdown
        </h5>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${challenge.explanationSteps.map(step => `
            <div style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.85rem;">
              <span class="step-number">${step.step}</span>
              <div>
                <strong>${step.title}:</strong> <span style="color: var(--text-secondary);">${step.description}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="badge-formula" style="display: block; padding: 0.5rem 0.75rem;">
        <strong>Golden Formula:</strong> ${challenge.ruleSummary}
      </div>
    `;
  }
}

function nextLabChallenge() {
  currentLabIndex = (currentLabIndex + 1) % labChallenges.length;
  selectLabChallenge(currentLabIndex);
}

// ==========================================================================
// 10. MDCAT 30-MCQS PRACTICE ENGINE
// ==========================================================================
let quizCurrentIndex = 0;
let quizScore = 0;
let quizAnswers = {};

function initQuizEngine() {
  quizCurrentIndex = 0;
  quizScore = 0;
  quizAnswers = {};
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = mdcatMCQs[quizCurrentIndex];
  if (!q) return;

  const currentNumEl = document.getElementById("quiz-current-num");
  const totalNumEl = document.getElementById("quiz-total-num");
  const categoryBadge = document.getElementById("quiz-cat-badge");
  const questionText = document.getElementById("quiz-question-text");
  const optionsList = document.getElementById("quiz-options-list");
  const explanationBox = document.getElementById("quiz-explanation-box");
  const quizProgressFill = document.getElementById("quiz-progress-fill");
  const nextBtn = document.getElementById("quiz-next-btn");

  if (currentNumEl) currentNumEl.textContent = quizCurrentIndex + 1;
  if (totalNumEl) totalNumEl.textContent = mdcatMCQs.length;
  if (categoryBadge) categoryBadge.textContent = `${q.category} • ${q.ruleTested}`;
  if (questionText) questionText.textContent = q.question;
  if (quizProgressFill) {
    const pct = ((quizCurrentIndex + 1) / mdcatMCQs.length) * 100;
    quizProgressFill.style.width = `${pct}%`;
  }

  if (explanationBox) {
    explanationBox.className = "quiz-explanation-box";
    explanationBox.innerHTML = "";
  }

  if (nextBtn) {
    nextBtn.textContent = quizCurrentIndex === mdcatMCQs.length - 1 ? "Finish Test" : "Next Question →";
    nextBtn.disabled = !quizAnswers[quizCurrentIndex];
  }

  if (optionsList) {
    optionsList.innerHTML = q.options.map(opt => {
      const isAnswered = quizAnswers.hasOwnProperty(quizCurrentIndex);
      const isSelected = quizAnswers[quizCurrentIndex] === opt.id;
      let stateClass = "";
      if (isAnswered) {
        if (opt.id === q.correctAnswer) stateClass = "correct";
        else if (isSelected) stateClass = "incorrect";
      }

      return `
        <button class="quiz-option-btn ${stateClass}" id="quiz-opt-${opt.id}" ${isAnswered ? 'disabled' : ''} onclick="handleQuizAnswer('${opt.id}')">
          <span class="option-letter">${opt.id}</span>
          <span style="flex: 1;">${opt.text}</span>
        </button>
      `;
    }).join("");
  }

  if (quizAnswers.hasOwnProperty(quizCurrentIndex)) {
    renderQuizExplanation(quizAnswers[quizCurrentIndex] === q.correctAnswer);
  }
}

function handleQuizAnswer(optionId) {
  if (quizAnswers.hasOwnProperty(quizCurrentIndex)) return;

  const q = mdcatMCQs[quizCurrentIndex];
  quizAnswers[quizCurrentIndex] = optionId;
  const isCorrect = optionId === q.correctAnswer;

  if (isCorrect) {
    quizScore++;
  }

  // Update button classes
  q.options.forEach(opt => {
    const btn = document.getElementById(`quiz-opt-${opt.id}`);
    btn.disabled = true;
    if (opt.id === q.correctAnswer) {
      btn?.classList.add("correct");
    } else if (opt.id === optionId) {
      btn?.classList.add("incorrect");
    }
  });

  renderQuizExplanation(isCorrect);

  const nextBtn = document.getElementById("quiz-next-btn");
  if (nextBtn) nextBtn.disabled = false;
}

function renderQuizExplanation(isCorrect) {
  const q = mdcatMCQs[quizCurrentIndex];
  const explanationBox = document.getElementById("quiz-explanation-box");
  if (!explanationBox) return;

  explanationBox.classList.add("active");
  explanationBox.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
      <strong style="color: ${isCorrect ? 'var(--emerald)' : 'var(--coral)'}; font-size: 1.05rem;">
        ${isCorrect ? '✅ Correct Answer!' : `❌ Incorrect (Correct option is ${q.correctAnswer})`}
      </strong>
      <span class="badge-formula">${q.ruleTested}</span>
    </div>
    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.55;">
      ${q.explanation}
    </p>
  `;
}

function nextQuizQuestion() {
  if (quizCurrentIndex < mdcatMCQs.length - 1) {
    quizCurrentIndex++;
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function prevQuizQuestion() {
  if (quizCurrentIndex > 0) {
    quizCurrentIndex--;
    renderQuizQuestion();
  }
}

function showQuizResults() {
  const quizActiveWrap = document.getElementById("quiz-active-view");
  const quizResultsCard = document.getElementById("quiz-results-card");
  if (!quizResultsCard) return;

  if (quizActiveWrap) quizActiveWrap.style.display = "none";
  quizResultsCard.classList.add("active");

  const total = mdcatMCQs.length;
  const percentage = Math.round((quizScore / total) * 100);

  // Update stats
  appState.quizAttempts++;
  if (quizScore > appState.quizBestScore) {
    appState.quizBestScore = quizScore;
  }
  saveState();

  let performanceTier = "Needs Practice";
  let tierColor = "var(--coral)";
  if (percentage >= 90) {
    performanceTier = "MDCAT Topper / Exemplary";
    tierColor = "var(--emerald)";
  } else if (percentage >= 75) {
    performanceTier = "Strong Command / Medical College Ready";
    tierColor = "var(--primary-indigo)";
  } else if (percentage >= 50) {
    performanceTier = "Moderate / Review Grammar Traps";
    tierColor = "var(--amber)";
  }

  const scoreNum = document.getElementById("results-score-num");
  const scorePct = document.getElementById("results-percentage");
  const correctCount = document.getElementById("results-correct-count");
  const incorrectCount = document.getElementById("results-incorrect-count");
  const tierBadge = document.getElementById("results-tier-badge");
  const bestScoreEl = document.getElementById("results-best-score");

  if (scoreNum) scoreNum.textContent = `${quizScore}/${total}`;
  if (scorePct) scorePct.textContent = `${percentage}%`;
  if (correctCount) correctCount.textContent = quizScore;
  if (incorrectCount) incorrectCount.textContent = total - quizScore;
  if (bestScoreEl) bestScoreEl.textContent = `${appState.quizBestScore} / ${total}`;

  if (tierBadge) {
    tierBadge.textContent = performanceTier;
    tierBadge.style.color = tierColor;
  }
}

function restartQuiz() {
  const quizActiveWrap = document.getElementById("quiz-active-view");
  const quizResultsCard = document.getElementById("quiz-results-card");
  if (quizResultsCard) quizResultsCard.classList.remove("active");
  if (quizActiveWrap) quizActiveWrap.style.display = "block";
  initQuizEngine();
}

// ==========================================================================
// 11. DYNAMIC SEARCH ENGINE
// ==========================================================================
function initSearch() {
  const searchInput = document.getElementById("global-search-input");
  const searchResultsCount = document.getElementById("search-results-count");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sections = document.querySelectorAll(".chapter-section");
    let matchCount = 0;

    if (!query) {
      sections.forEach(sec => sec.style.display = "");
      if (searchResultsCount) searchResultsCount.style.display = "none";
      return;
    }

    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(query)) {
        sec.style.display = "";
        matchCount++;
      } else {
        sec.style.display = "none";
      }
    });

    if (searchResultsCount) {
      searchResultsCount.style.display = "block";
      searchResultsCount.textContent = `${matchCount} matching section${matchCount === 1 ? '' : 's'} found`;
    }
  });
}

// ==========================================================================
// 12. STEP-BY-STEP COMPARISON ACCORDION
// ==========================================================================
function toggleTransformationStepper(id) {
  const stepper = document.getElementById(id);
  if (stepper) {
    stepper.classList.toggle("active");
  }
}

// ==========================================================================
// 13. DASHBOARD METRICS & SPY NAVIGATION
// ==========================================================================
function updateDashboardUI() {
  const totalSections = document.querySelectorAll(".chapter-section").length || 16;
  const completedCount = appState.completedSections.length;
  const overallPercentage = Math.round(
    ((completedCount / totalSections) * 0.4 +
     (appState.masteredFlashcards.length / flashcardsData.length) * 0.3 +
     (appState.quizBestScore / mdcatMCQs.length) * 0.3) * 100
  );

  const progBar = document.getElementById("overall-progress-bar");
  const progPct = document.getElementById("overall-progress-pct");
  const conceptsCount = document.getElementById("stat-concepts-completed");
  const streakCount = document.getElementById("stat-streak-count");
  const bestScoreEl = document.getElementById("stat-best-score");
  const masteredCount = document.getElementById("stat-flashcards-mastered");

  if (progBar) progBar.style.width = `${overallPercentage}%`;
  if (progPct) progPct.textContent = `${overallPercentage}%`;
  if (conceptsCount) conceptsCount.textContent = `${completedCount}/${totalSections}`;
  if (streakCount) streakCount.textContent = `${appState.streakCount} Days`;
  if (bestScoreEl) bestScoreEl.textContent = `${appState.quizBestScore}/${mdcatMCQs.length}`;
  if (masteredCount) masteredCount.textContent = `${appState.masteredFlashcards.length}/${flashcardsData.length}`;
}

function initScrollSpy() {
  const sections = document.querySelectorAll(".chapter-section");
  const navLinks = document.querySelectorAll(".nav-item-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });

      if (!appState.completedSections.includes(currentId)) {
        appState.completedSections.push(currentId);
        saveState();
      }
    }
  });
}

// ==========================================================================
// 14. GLOBAL INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTheme();
  initSearch();
  renderFlashcards();
  initTransformationLab();
  initQuizEngine();
  updateBookmarkButtonsUI();
  updateDashboardUI();
  initScrollSpy();

  // Setup bookmark toggle events
  document.querySelectorAll("[data-bookmark-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-bookmark-target");
      const secEl = document.getElementById(targetId);
      const title = secEl?.querySelector(".section-heading")?.textContent || targetId;
      toggleBookmark(targetId, title);
    });
  });

  // Setup copy buttons
  document.querySelectorAll("[data-copy-text]").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy-text");
      copyToClipboard(text);
    });
  });
});
