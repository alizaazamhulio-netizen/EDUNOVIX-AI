/**
 * MDCAT Synonyms & Antonyms Master
 * Comprehensive Educational Dataset & Interactive Learning Engine
 */

(function () {
  'use strict';

  // ==========================================
  // 1. VOCABULARY DATASET (100+ High-Yield Words)
  // ==========================================
  const VOCAB_DATA = [
    // --- BASIC LEVEL ---
    {
      word: "Abandon",
      level: "Basic",
      partOfSpeech: "verb",
      meaning: "To cease to support or look after someone; to desert or leave completely.",
      urduMeaning: "چھوڑ دینا / دستبردار ہونا",
      synonyms: ["Desert", "Forsake", "Relinquish", "Vacate"],
      antonyms: ["Retain", "Maintain", "Keep", "Cherish"],
      example: "He had to abandon his vehicle during the severe snowstorm.",
      difficulty: 1
    },
    {
      word: "Abundant",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Existing or available in large quantities; overflowing or plentiful.",
      urduMeaning: "وافر / کثیر",
      synonyms: ["Plentiful", "Ample", "Copious", "Profuse"],
      antonyms: ["Scarce", "Sparse", "Meager", "Deficient"],
      example: "The Indus river basin provides abundant water for agricultural harvests.",
      difficulty: 1
    },
    {
      word: "Accurate",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Correct in all details; exact and free from errors.",
      urduMeaning: "درست / بالکل ٹھیک",
      synonyms: ["Precise", "Exact", "Correct", "Flawless"],
      antonyms: ["Inaccurate", "Erroneous", "Faulty", "Imprecise"],
      example: "An accurate clinical diagnosis is crucial before administering medication.",
      difficulty: 1
    },
    {
      word: "Admire",
      level: "Basic",
      partOfSpeech: "verb",
      meaning: "To regard with respect or warm approval; look at with pleasure.",
      urduMeaning: "تعریف کرنا / سراہنا",
      synonyms: ["Appreciate", "Respect", "Venerate", "Esteem"],
      antonyms: ["Despise", "Disdain", "Scorn", "Condemn"],
      example: "Students admire doctors who dedicate their lives to rural healthcare.",
      difficulty: 1
    },
    {
      word: "Ancient",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Belonging to the very distant past and no longer in existence.",
      urduMeaning: "قدیم / دیرینہ",
      synonyms: ["Archaic", "Antique", "Primordial", "Timeworn"],
      antonyms: ["Modern", "Contemporary", "Recent", "Novel"],
      example: "Mohenjo-Daro is an ancient civilization excavated in Sindh.",
      difficulty: 1
    },
    {
      word: "Brave",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Ready to face and endure danger or pain; showing courage.",
      urduMeaning: "بہادر / شجاع",
      synonyms: ["Courageous", "Valiant", "Intrepid", "Dauntless"],
      antonyms: ["Cowardly", "Timid", "Craven", "Pusillanimous"],
      example: "The brave rescue team entered the burning ward to evacuate patients.",
      difficulty: 1
    },
    {
      word: "Calm",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Not showing or feeling nervousness, anger, or other strong emotions; serene.",
      urduMeaning: "پرسکون / پرامن",
      synonyms: ["Serene", "Tranquil", "Placid", "Composed"],
      antonyms: ["Agitated", "Turbulent", "Furious", "Frantic"],
      example: "Maintaining a calm demeanor helps surgeons handle high-pressure crises.",
      difficulty: 1
    },
    {
      word: "Confident",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Feeling or showing certainty about something; assured of self-worth.",
      urduMeaning: "پر اعتماد / مطمئن",
      synonyms: ["Assured", "Poised", "Convinced", "Self-reliant"],
      antonyms: ["Insecure", "Diffident", "Apprehensive", "Doubtful"],
      example: "She felt confident in her preparation after months of rigorous study.",
      difficulty: 1
    },
    {
      word: "Difficult",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Needing much effort or skill to accomplish, deal with, or understand.",
      urduMeaning: "مشکل / کٹھن",
      synonyms: ["Arduous", "Challenging", "Demanding", "Formidable"],
      antonyms: ["Easy", "Facile", "Effortless", "Simple"],
      example: "The MDCAT physics paper contained several difficult conceptual problems.",
      difficulty: 1
    },
    {
      word: "Eager",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Wanting to do or have something very much; keen and enthusiastic.",
      urduMeaning: "مشتاق / بے تاب",
      synonyms: ["Keen", "Enthusiastic", "Avid", "Fervent"],
      antonyms: ["Apathetic", "Indifferent", "Reluctant", "Uninterested"],
      example: "The medical freshmen were eager to begin their anatomy dissection lab.",
      difficulty: 1
    },
    {
      word: "Fragile",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Easily broken or damaged; delicate and vulnerable.",
      urduMeaning: "نازک / جلد ٹوٹنے والا",
      synonyms: ["Delicate", "Brittle", "Frail", "Vulnerable"],
      antonyms: ["Sturdy", "Robust", "Resilient", "Durable"],
      example: "Handle the optical microscope slides with care because they are fragile.",
      difficulty: 1
    },
    {
      word: "Generous",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Showing a readiness to give more of something than is strictly necessary.",
      urduMeaning: "سخی / فیاض",
      synonyms: ["Magnanimous", "Benevolent", "Altruistic", "Bountiful"],
      antonyms: ["Miserly", "Stingy", "Parsimonious", "Selfish"],
      example: "The philanthropist made a generous donation to establish an oncology wing.",
      difficulty: 1
    },
    {
      word: "Honest",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Free of deceit and untruthfulness; sincere and candid.",
      urduMeaning: "دیانت دار / سچا",
      synonyms: ["Candid", "Truthful", "Veracious", "Trustworthy"],
      antonyms: ["Deceitful", "Mendacious", "Dishonest", "Duplicitous"],
      example: "An honest doctor will communicate both risks and prognosis clearly.",
      difficulty: 1
    },
    {
      word: "Rapid",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Happening in a short time or at a fast pace.",
      urduMeaning: "تیز / تیز رفتار",
      synonyms: ["Swift", "Fleet", "Brisk", "Expeditious"],
      antonyms: ["Sluggish", "Tardy", "Slow", "Lethargic"],
      example: "Early intervention led to a rapid recovery for the ICU patient.",
      difficulty: 1
    },
    {
      word: "Humble",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Having or showing a modest estimate of one's own importance.",
      urduMeaning: "عاجز / خاکسار",
      synonyms: ["Modest", "Unassuming", "Meek", "Deferential"],
      antonyms: ["Arrogant", "Haughty", "Pompous", "Conceited"],
      example: "Despite winning international awards, the professor remained humble.",
      difficulty: 1
    },
    {
      word: "Candid",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Truthful and straightforward; frank without sugarcoating.",
      urduMeaning: "بے باک / کھرا",
      synonyms: ["Frank", "Outspoken", "Forthright", "Unreserved"],
      antonyms: ["Evasive", "Guarded", "Disingenuous", "Insincere"],
      example: "The surgeon gave a candid assessment of the patient's condition.",
      difficulty: 1
    },
    {
      word: "Frugal",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Sparing or economical with regard to money or food; simple and plain.",
      urduMeaning: "کفایت شعار / کم خرچ",
      synonyms: ["Thrifty", "Economical", "Prudent", "Parsimonious"],
      antonyms: ["Extravagant", "Prodigal", "Wasteful", "Lavish"],
      example: "Leading a frugal lifestyle allowed the student to afford medical textbooks.",
      difficulty: 1
    },
    {
      word: "Hostile",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Unfriendly; antagonistic; of or belonging to a military enemy.",
      urduMeaning: "مخالف / دشمنانہ",
      synonyms: ["Antagonistic", "Belligerent", "Inimical", "Aggressive"],
      antonyms: ["Amicable", "Cordial", "Friendly", "Hospitable"],
      example: "The bacteria thrive even in acidic, hostile environments inside the gut.",
      difficulty: 1
    },
    {
      word: "Vague",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Of uncertain, indefinite, or unclear character or meaning.",
      urduMeaning: "مبہم / غیر واضح",
      synonyms: ["Ambiguous", "Indistinct", "Obscure", "Equivocal"],
      antonyms: ["Explicit", "Definite", "Lucid", "Clear"],
      example: "The patient gave only vague symptoms, making differential diagnosis tricky.",
      difficulty: 1
    },
    {
      word: "Keen",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Having or showing eagerness or enthusiasm; highly developed senses.",
      urduMeaning: "تیز / پرشوق",
      synonyms: ["Sharp", "Acute", "Perceptive", "Astute"],
      antonyms: ["Dull", "Blunt", "Obtuse", "Apathetic"],
      example: "A keen observer can detect slight changes in vital cardiac signs.",
      difficulty: 1
    },
    {
      word: "Radiant",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Sending out light; shining or glowing brightly.",
      urduMeaning: "چمکدار / تابناک",
      synonyms: ["Luminous", "Brilliant", "Resplendent", "Gleaming"],
      antonyms: ["Dim", "Dull", "Somber", "Gloomy"],
      example: "Her radiant smile brought comfort to the worried family.",
      difficulty: 1
    },
    {
      word: "Swift",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Happening quickly or promptly; moving at high speed.",
      urduMeaning: "تیز رفتار / برق رفتار",
      synonyms: ["Expeditious", "Nimble", "Prompt", "Fleet"],
      antonyms: ["Sluggish", "Slow", "Languid", "Deliberate"],
      example: "Swift diagnosis of stroke symptoms prevents irreversible neural damage.",
      difficulty: 1
    },
    {
      word: "Timid",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Showing a lack of courage or confidence; easily frightened.",
      urduMeaning: "ڈربوک / بزدل",
      synonyms: ["Diffident", "Apprehensive", "Meek", "Cowardly"],
      antonyms: ["Bold", "Audacious", "Dauntless", "Valiant"],
      example: "The timid child clung to his mother before the vaccination injection.",
      difficulty: 1
    },
    {
      word: "Lenient",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "More merciful or tolerant than expected; not strict.",
      urduMeaning: "نرم مزاج / رحمدل",
      synonyms: ["Forgiving", "Tolerant", "Indulgent", "Clement"],
      antonyms: ["Strict", "Severe", "Harsh", "Draconian"],
      example: "The examiner was lenient regarding minor spelling slips on the biology viva.",
      difficulty: 1
    },
    {
      word: "Vivid",
      level: "Basic",
      partOfSpeech: "adjective",
      meaning: "Producing powerful feelings or strong, clear images in the mind.",
      urduMeaning: "واضح / روشن",
      synonyms: ["Graphic", "Lucid", "Lively", "Striking"],
      antonyms: ["Vague", "Dim", "Dull", "Faint"],
      example: "The biology textbook provides vivid microscopic illustrations of mitosis.",
      difficulty: 1
    },

    // --- INTERMEDIATE LEVEL ---
    {
      word: "Alleviate",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "To make suffering, deficiency, or a problem less severe; soothe or mitigate.",
      urduMeaning: "تکلیف کم کرنا / تسکین دینا",
      synonyms: ["Mitigate", "Assuage", "Palliate", "Relieve"],
      antonyms: ["Aggravate", "Exacerbate", "Intensify", "Worsen"],
      example: "Analgesic medications are administered to alleviate postoperative pain.",
      difficulty: 2
    },
    {
      word: "Ambiguous",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Open to more than one interpretation; not having one obvious meaning.",
      urduMeaning: "مبہم / دو معنی خیز",
      synonyms: ["Equivocal", "Cryptic", "Enigmatic", "Obscure"],
      antonyms: ["Unambiguous", "Explicit", "Clear", "Definitive"],
      example: "The research conclusion was ambiguous and lacked statistical clarity.",
      difficulty: 2
    },
    {
      word: "Benevolent",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Well meaning and kindly; serving a charitable rather than profit-making purpose.",
      urduMeaning: "مہربان / فیاض",
      synonyms: ["Altruistic", "Philanthropic", "Magnanimous", "Benign"],
      antonyms: ["Malevolent", "Spiteful", "Hostile", "Malicious"],
      example: "A benevolent benefactor funded the medical college's modern research library.",
      difficulty: 2
    },
    {
      word: "Coherent",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Logical and consistent; forming a unified whole.",
      urduMeaning: "مربوط / منطقی",
      synonyms: ["Lucid", "Articulate", "Congruous", "Systematic"],
      antonyms: ["Incoherent", "Disjointed", "Chaotic", "Muddled"],
      example: "The student presented a coherent hypothesis for the biochemistry seminar.",
      difficulty: 2
    },
    {
      word: "Compel",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "To force or oblige someone to do something; bring about by force.",
      urduMeaning: "مجبور کرنا / دباؤ ڈالنا",
      synonyms: ["Coerce", "Constrain", "Impel", "Obligate"],
      antonyms: ["Dissuade", "Halt", "Deter", "Discourage"],
      example: "Severe respiratory distress compelled the physician to intubate the patient.",
      difficulty: 2
    },
    {
      word: "Concise",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Giving a lot of information clearly and in a few words; brief and comprehensive.",
      urduMeaning: "مختصر اور جامع",
      synonyms: ["Succinct", "Laconic", "Terse", "Pithy"],
      antonyms: ["Verbose", "Wordy", "Prolix", "Redundant"],
      example: "Write a concise summary of the biochemical pathway within 50 words.",
      difficulty: 2
    },
    {
      word: "Deteriorate",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "To become progressively worse in condition, value, or health.",
      urduMeaning: "خراب ہونا / بگڑنا",
      synonyms: ["Degenerate", "Decline", "Worsen", "Decay"],
      antonyms: ["Ameliorate", "Improve", "Flourish", "Heal"],
      example: "Without immediate oxygen therapy, arterial oxygen saturation may deteriorate.",
      difficulty: 2
    },
    {
      word: "Diligent",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Having or showing care and conscientiousness in one's work or duties.",
      urduMeaning: "محنتی / انتھک",
      synonyms: ["Industrious", "Assiduous", "Sedulous", "Meticulous"],
      antonyms: ["Indolent", "Slothful", "Lazy", "Negligent"],
      example: "Diligent students practice MDCAT practice papers under strict timed conditions.",
      difficulty: 2
    },
    {
      word: "Eliminate",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "Completely remove or get rid of; exclude from consideration.",
      urduMeaning: "خارج کرنا / ختم کرنا",
      synonyms: ["Eradicate", "Expel", "Abolish", "Exterminate"],
      antonyms: ["Incorporate", "Retain", "Preserve", "Adopt"],
      example: "Proper hand hygiene helps eliminate hospital-acquired bacterial strains.",
      difficulty: 2
    },
    {
      word: "Feasible",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Possible to do easily or conveniently; workable and viable.",
      urduMeaning: "ممکن العمل / قرین قیاس",
      synonyms: ["Plausible", "Viable", "Practicable", "Achievable"],
      antonyms: ["Infeasible", "Impracticable", "Impossible", "Unworkable"],
      example: "Is it feasible to administer gene therapy directly into targeted neurons?",
      difficulty: 2
    },
    {
      word: "Inevitable",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Certain to happen; unavoidable and inescapable.",
      urduMeaning: "ناگزیر / حتمی",
      synonyms: ["Unavoidable", "Inescapable", "Inexorable", "Fated"],
      antonyms: ["Avoidable", "Preventable", "Eludible", "Uncertain"],
      example: "Cellular aging is an inevitable biological process governed by telomeres.",
      difficulty: 2
    },
    {
      word: "Meticulous",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Showing great attention to detail; very careful and precise.",
      urduMeaning: "باریک بین / نہایت محتاط",
      synonyms: ["Scrupulous", "Fastidious", "Punctilious", "Painstaking"],
      antonyms: ["Careless", "Sloppy", "Cursory", "Negligent"],
      example: "Forensic pathologists conduct meticulous examinations of toxicological samples.",
      difficulty: 2
    },
    {
      word: "Obsolete",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "No longer produced or used; out of date.",
      urduMeaning: "متروک / فرسودہ",
      synonyms: ["Archaic", "Outdated", "Antiquated", "Superseded"],
      antonyms: ["Modern", "Contemporary", "Current", "Cutting-edge"],
      example: "Old mercury thermometers have become obsolete in modern pediatric care.",
      difficulty: 2
    },
    {
      word: "Pragmatic",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Dealing with things sensibly and realistically in a way based on practical considerations.",
      urduMeaning: "عملی / حقیقت پسندانہ",
      synonyms: ["Practical", "Utilitarian", "Realistic", "Sensible"],
      antonyms: ["Idealistic", "Quixotic", "Impractical", "Utopian"],
      example: "In emergency triage, surgeons must adopt a pragmatic approach to save lives.",
      difficulty: 2
    },
    {
      word: "Reluctant",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Unwilling and hesitant; disinclined to act.",
      urduMeaning: "ہچکچانے والا / ناخوشگوار",
      synonyms: ["Hesitant", "Averse", "Loath", "Disinclined"],
      antonyms: ["Eager", "Willing", "Enthusiastic", "Inclined"],
      example: "The patient was reluctant to undergo invasive laparoscopic surgery.",
      difficulty: 2
    },
    {
      word: "Resilient",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Able to withstand or recover quickly from difficult conditions; adaptable and tenacious.",
      urduMeaning: "مضبوط اور جلد سنبھلنے والا",
      synonyms: ["Tenacious", "Supple", "Enduring", "Robust"],
      antonyms: ["Fragile", "Vulnerable", "Brittle", "Susceptible"],
      example: "Resilient immune systems fight off virulent viral infections effectively.",
      difficulty: 2
    },
    {
      word: "Scrutinize",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "Examine or inspect closely and thoroughly with critical analysis.",
      urduMeaning: "غور سے دیکھنا / باریک بینی سے جانچنا",
      synonyms: ["Examine", "Inspect", "Probe", "Dissect"],
      antonyms: ["Glance", "Overlook", "Ignore", "Neglect"],
      example: "The admissions committee will scrutinize every applicant's MDCAT score.",
      difficulty: 2
    },
    {
      word: "Substantial",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Of considerable importance, size, or worth; solid and essential.",
      urduMeaning: "ٹھوس / نمایاں / وزنی",
      synonyms: ["Significant", "Considerable", "Weighty", "Colossal"],
      antonyms: ["Insignificant", "Negligible", "Minor", "Trivial"],
      example: "A substantial decrease in systolic pressure indicated blood loss.",
      difficulty: 2
    },
    {
      word: "Versatile",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Able to adapt or be adapted to many different functions or activities.",
      urduMeaning: "ہر فن مولا / کثیر الجہتی",
      synonyms: ["Adaptable", "All-round", "Flexible", "Multifaceted"],
      antonyms: ["Rigid", "Inflexible", "Limited", "Monolithic"],
      example: "Stem cells are extraordinarily versatile because they differentiate into various cell types.",
      difficulty: 2
    },
    {
      word: "Adversity",
      level: "Intermediate",
      partOfSpeech: "noun",
      meaning: "Difficulties; misfortune; a state of adverse conditions.",
      urduMeaning: "مصیبت / نامساعد حالات",
      synonyms: ["Hardship", "Misfortune", "Tribulation", "Affliction"],
      antonyms: ["Prosperity", "Fortune", "Advantage", "Comfort"],
      example: "A doctor learns to stay calm and deliver optimal care even in deep adversity.",
      difficulty: 2
    },
    {
      word: "Augment",
      level: "Intermediate",
      partOfSpeech: "verb",
      meaning: "Make something greater by adding to it; increase in size or value.",
      urduMeaning: "اضافہ کرنا / بڑھانا",
      synonyms: ["Enhance", "Amplify", "Enlarge", "Boost"],
      antonyms: ["Diminish", "Decrease", "Curtail", "Lessen"],
      example: "Electrolyte supplements were given to augment the dehydrated patient's fluids.",
      difficulty: 2
    },
    {
      word: "Capricious",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Given to sudden and unaccountable changes of mood or behavior; erratic.",
      urduMeaning: "متلون مزاج / بے ثبات",
      synonyms: ["Fickle", "Whimsical", "Mercurial", "Volatile"],
      antonyms: ["Constant", "Stable", "Predictable", "Steadfast"],
      example: "The disease had a capricious course, fluctuating between remission and relapse.",
      difficulty: 2
    },
    {
      word: "Disparate",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Essentially different in kind; not allowing comparison; distinct.",
      urduMeaning: "مختلف / متضاد",
      synonyms: ["Diverse", "Dissimilar", "Heterogeneous", "Divergent"],
      antonyms: ["Similar", "Homogeneous", "Uniform", "Identical"],
      example: "The epidemiologist compiled data from disparate medical registries.",
      difficulty: 2
    },
    {
      word: "Lucid",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Expressed clearly; easy to understand; showing ability to think clearly.",
      urduMeaning: "واضح / صاف",
      synonyms: ["Articulate", "Coherent", "Intelligible", "Luminous"],
      antonyms: ["Confusing", "Obscure", "Ambiguous", "Murky"],
      example: "The concussed athlete became fully lucid after receiving neurological care.",
      difficulty: 2
    },
    {
      word: "Transient",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Lasting only for a short time; impermanent; passing through briefly.",
      urduMeaning: "عارضی / چند روزہ",
      synonyms: ["Ephemeral", "Evanescent", "Fleeting", "Temporary"],
      antonyms: ["Permanent", "Enduring", "Perpetual", "Eternal"],
      example: "The medication caused a transient spike in heart rate before stabilizing.",
      difficulty: 2
    },
    {
      word: "Vulnerable",
      level: "Intermediate",
      partOfSpeech: "adjective",
      meaning: "Susceptible to physical or emotional attack or harm.",
      urduMeaning: "غیر محفوظ / زد پذیر",
      synonyms: ["Susceptible", "Exposed", "Defenseless", "Fragile"],
      antonyms: ["Invulnerable", "Immune", "Protected", "Shielded"],
      example: "Immunocompromised infants are especially vulnerable to respiratory infections.",
      difficulty: 2
    },

    // --- ADVANCED LEVEL ---
    {
      word: "Aberration",
      level: "Advanced",
      partOfSpeech: "noun",
      meaning: "A departure from what is normal, usual, or expected, typically one that is unwelcome.",
      urduMeaning: "گمراہی / معمول سے انحراف",
      synonyms: ["Anomaly", "Deviation", "Divergence", "Eccentricity"],
      antonyms: ["Normality", "Conformity", "Regularity", "Standard"],
      example: "The sudden arrhythmia was an aberration in an otherwise healthy cardiac rhythm.",
      difficulty: 3
    },
    {
      word: "Acquiesce",
      level: "Advanced",
      partOfSpeech: "verb",
      meaning: "Accept something reluctantly but without protest; submit passively.",
      urduMeaning: "بادل نخواستہ ماننا / رضامند ہونا",
      synonyms: ["Consent", "Comply", "Concede", "Accede"],
      antonyms: ["Dissent", "Resist", "Protest", "Rebel"],
      example: "The board had to acquiesce to the revised national clinical protocol.",
      difficulty: 3
    },
    {
      word: "Belligerent",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Hostile and aggressive; engaged in a war or conflict.",
      urduMeaning: "جھگڑالو / جنگجو",
      synonyms: ["Pugnacious", "Combative", "Truculent", "Antagonistic"],
      antonyms: ["Peaceful", "Conciliatory", "Pacifist", "Amicable"],
      example: "Severe hypoxia can occasionally make disoriented patients belligerent.",
      difficulty: 3
    },
    {
      word: "Clandestine",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Kept secret or done secretively, especially because illicit.",
      urduMeaning: "خفیہ / پوشیدہ",
      synonyms: ["Surreptitious", "Covert", "Furtive", "Stealthy"],
      antonyms: ["Overt", "Blatant", "Public", "Conspicuous"],
      example: "The black market sale of counterfeit medications was a clandestine operation.",
      difficulty: 3
    },
    {
      word: "Conundrum",
      level: "Advanced",
      partOfSpeech: "noun",
      meaning: "A confusing and difficult problem or question; a dilemma.",
      urduMeaning: "معمہ / پیچیدہ مسئلہ",
      synonyms: ["Enigma", "Paradox", "Puzzle", "Predicament"],
      antonyms: ["Solution", "Resolution", "Explanation", "Answer"],
      example: "Treating multi-drug resistant tuberculosis remains a formidable clinical conundrum.",
      difficulty: 3
    },
    {
      word: "Deleterious",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Causing harm or damage; injurious to health or development.",
      urduMeaning: "مضر / نقصان دہ",
      synonyms: ["Detrimental", "Pernicious", "Harmful", "Noxious"],
      antonyms: ["Beneficial", "Salutary", "Advantageous", "Innocuous"],
      example: "Chronic sleep deprivation has deleterious effects on cognitive recall.",
      difficulty: 3
    },
    {
      word: "Ephemeral",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Lasting for a very short time; fleeting and transient.",
      urduMeaning: "عارضی / ناپائیدار",
      synonyms: ["Transient", "Evanescent", "Fleeting", "Momentary"],
      antonyms: ["Permanent", "Perpetual", "Eternal", "Everlasting"],
      example: "The analgesic effect of the anesthetic spray was only ephemeral.",
      difficulty: 3
    },
    {
      word: "Equivocal",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Open to more than one interpretation; ambiguous; uncertain.",
      urduMeaning: "مشکوک / مبہم",
      synonyms: ["Ambiguous", "Dubious", "Evasive", "Cryptic"],
      antonyms: ["Unequivocal", "Definite", "Clear-cut", "Unambiguous"],
      example: "The MRI scan gave equivocal results, necessitating a biopsy.",
      difficulty: 3
    },
    {
      word: "Fastidious",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Very attentive to and concerned about accuracy and detail; hard to please.",
      urduMeaning: "نکتہ چین / باریک بین",
      synonyms: ["Meticulous", "Punctilious", "Scrupulous", "Finicky"],
      antonyms: ["Careless", "Lenient", "Undemanding", "Sloppy"],
      example: "Sterilization of surgical instruments demands fastidious adherence to guidelines.",
      difficulty: 3
    },
    {
      word: "Gregarious",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Fond of company; sociable; living in herds or social communities.",
      urduMeaning: "ملنسار / مل جل کر رہنے والا",
      synonyms: ["Sociable", "Companionable", "Convivial", "Extroverted"],
      antonyms: ["Reclusive", "Introverted", "Solitary", "Antisocial"],
      example: "Humans are gregarious beings whose mental health relies on social connection.",
      difficulty: 3
    },
    {
      word: "Impeccable",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "In accordance with the highest standards; faultless and spotless.",
      urduMeaning: "بے عیب / بے نقص",
      synonyms: ["Flawless", "Spotless", "Exemplary", "Infallible"],
      antonyms: ["Flawed", "Defective", "Blemished", "Faulty"],
      example: "The surgeon demonstrated impeccable technique during the cardiac bypass.",
      difficulty: 3
    },
    {
      word: "Incongruous",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Not in harmony or keeping with the surroundings or other aspects of something.",
      urduMeaning: "بے جوڑ / غیر موافق",
      synonyms: ["Incompatible", "Discordant", "Inappropriate", "Disparate"],
      antonyms: ["Harmonious", "Compatible", "Congruous", "Fitting"],
      example: "Loud laughter felt incongruous inside the solemn intensive care unit.",
      difficulty: 3
    },
    {
      word: "Laconic",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Using very few words in speech or writing; concise to the point of seeming terse.",
      urduMeaning: "مختصر گو / کم گو",
      synonyms: ["Succinct", "Terse", "Pithy", "Breviloquent"],
      antonyms: ["Verbose", "Loquacious", "Garrulous", "Voluble"],
      example: "The chief surgeon gave a laconic nod, confirming the operation's success.",
      difficulty: 3
    },
    {
      word: "Magnanimous",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Generous or forgiving, especially toward a rival or someone less powerful.",
      urduMeaning: "عالی ظرف / فراخ دل",
      synonyms: ["Generous", "Benevolent", "Noble", "Altruistic"],
      antonyms: ["Petty", "Vindictive", "Resentful", "Mean-spirited"],
      example: "He was magnanimous in victory, congratulating his runner-up opponent warmly.",
      difficulty: 3
    },
    {
      word: "Ostensible",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Stated or appearing to be true, but not necessarily so; professed.",
      urduMeaning: "ظاہری / نمائش",
      synonyms: ["Apparent", "Seeming", "Superficial", "Professed"],
      antonyms: ["Genuine", "Real", "Actual", "Underlying"],
      example: "The ostensible purpose of the meeting was budget review, but restructuring was discussed.",
      difficulty: 3
    },
    {
      word: "Pernicious",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Having a harmful effect, especially in a gradual or subtle way; insidiously ruinous.",
      urduMeaning: "مہلک / نقصان دہ",
      synonyms: ["Deleterious", "Destructive", "Insidious", "Fatal"],
      antonyms: ["Beneficial", "Salutary", "Wholesome", "Harmless"],
      example: "Pernicious anemia stems from the body's inability to absorb vitamin B12.",
      difficulty: 3
    },
    {
      word: "Quintessential",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Representing the most perfect or typical example of a quality or class.",
      urduMeaning: "خالص / کامل ترین نمونہ",
      synonyms: ["Archetypal", "Definitive", "Exemplary", "Prototypical"],
      antonyms: ["Atypical", "Unrepresentative", "Substandard", "Uncharacteristic"],
      example: "Compassion combined with sharp clinical judgment is the quintessential physician trait.",
      difficulty: 3
    },
    {
      word: "Scrupulous",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Diligent, thorough, and extremely attentive to details; very moral.",
      urduMeaning: "دیانت دار / باریک بین",
      synonyms: ["Meticulous", "Conscientious", "Honorable", "Fastidious"],
      antonyms: ["Unscrupulous", "Careless", "Dishonest", "Slack"],
      example: "Clinical trials require scrupulous recording of all side effects.",
      difficulty: 3
    },
    {
      word: "Tenacious",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Tending to keep a firm hold of something; clinging or adhering closely; persistent.",
      urduMeaning: "مستقل مزاج / مضبوط گرفت رکھنے والا",
      synonyms: ["Persistent", "Resolute", "Persevering", "Dogged"],
      antonyms: ["Yielding", "Surrendering", "Weak", "Faltering"],
      example: "Her tenacious pursuit of the cure won her international accolades.",
      difficulty: 3
    },
    {
      word: "Anachronism",
      level: "Advanced",
      partOfSpeech: "noun",
      meaning: "A thing belonging or appropriate to a period other than that in which it exists.",
      urduMeaning: "زمانہ یا تاریخ کی غلطی",
      synonyms: ["Misplacement", "Prolepsis", "Antiquity", "Incongruity"],
      antonyms: ["Contemporaneity", "Modernity", "Synchronism", "Timeliness"],
      example: "Using bloodletting in a modern hospital is a dangerous medical anachronism.",
      difficulty: 3
    },
    {
      word: "Cacophony",
      level: "Advanced",
      partOfSpeech: "noun",
      meaning: "A harsh, discordant mixture of sounds.",
      urduMeaning: "بے ہنگم آواز / شور",
      synonyms: ["Dissonance", "Clamor", "Racket", "Discord"],
      antonyms: ["Euphony", "Harmony", "Melody", "Concord"],
      example: "The trauma unit was a cacophony of beeping monitors, alarms, and shouts.",
      difficulty: 3
    },
    {
      word: "Enigmatic",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Difficult to interpret or understand; mysterious.",
      urduMeaning: "پراسرار / پرپیچ",
      synonyms: ["Inscrutable", "Cryptic", "Mysterious", "Perplexing"],
      antonyms: ["Straightforward", "Lucid", "Transparent", "Obvious"],
      example: "The patient presented with an enigmatic constellation of autoimmune markers.",
      difficulty: 3
    },
    {
      word: "Panacea",
      level: "Advanced",
      partOfSpeech: "noun",
      meaning: "A solution or remedy for all difficulties or diseases; a universal cure.",
      urduMeaning: "اکسیر / ہر مرض کی دوا",
      synonyms: ["Cure-all", "Elixir", "Universal remedy", "Catholicon"],
      antonyms: ["Poison", "Toxin", "Noxious agent", "Bane"],
      example: "Antibiotics are vital drugs, but they are not a panacea for viral infections.",
      difficulty: 3
    },
    {
      word: "Superfluous",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Unnecessary, especially through being more than enough; redundant.",
      urduMeaning: "ضرورت سے زیادہ / زائد",
      synonyms: ["Redundant", "Surplus", "Excessive", "Gratuitous"],
      antonyms: ["Essential", "Necessary", "Indispensable", "Vital"],
      example: "Avoid superfluous laboratory tests that strain the patient's finances without benefit.",
      difficulty: 3
    },
    {
      word: "Taciturn",
      level: "Advanced",
      partOfSpeech: "adjective",
      meaning: "Reserved or uncommunicative in speech; saying little.",
      urduMeaning: "کم گو / خاموش طبع",
      synonyms: ["Reticent", "Untalkative", "Reserved", "Laconic"],
      antonyms: ["Loquacious", "Talkative", "Voluble", "Garrulous"],
      example: "The taciturn professor spoke only when essential scientific facts needed clarifying.",
      difficulty: 3
    },

    // --- ELITE LEVEL ---
    {
      word: "Abstruse",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Difficult to understand; obscure, esoteric, and recondite.",
      urduMeaning: "دقیق / مشکل الفہم",
      synonyms: ["Recondite", "Esoteric", "Arcane", "Incomprehensible"],
      antonyms: ["Simple", "Lucid", "Exoteric", "Comprehensible"],
      example: "The theoretical physicist wrote an abstruse paper on quantum mechanics.",
      difficulty: 4
    },
    {
      word: "Apocryphal",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Of doubtful authenticity, although widely circulated as being true.",
      urduMeaning: "جعلی / غیر مستند",
      synonyms: ["Spurious", "Dubious", "Fictitious", "Fabricated"],
      antonyms: ["Authentic", "Genuine", "Veritable", "Legitimate"],
      example: "The rumor claiming a miracle cancer herb was entirely apocryphal.",
      difficulty: 4
    },
    {
      word: "Circumlocution",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "The use of many words where fewer would do, especially in a deliberate attempt to be vague.",
      urduMeaning: "گھما پھرا کر بات کرنا",
      synonyms: ["Periphrasis", "Verbosity", "Tautology", "Equivocation"],
      antonyms: ["Conciseness", "Directness", "Brevity", "Succinctness"],
      example: "The politician resorted to tedious circumlocution to dodge the direct inquiry.",
      difficulty: 4
    },
    {
      word: "Deference",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "Polite submission and respect due to recognized authority or superiority.",
      urduMeaning: "احترام / تعظیم",
      synonyms: ["Reverence", "Veneration", "Homage", "Obeisance"],
      antonyms: ["Disrespect", "Contempt", "Impudence", "Defiance"],
      example: "Junior resident doctors listened in silence out of deference to the emeritus surgeon.",
      difficulty: 4
    },
    {
      word: "Enervate",
      level: "Elite",
      partOfSpeech: "verb",
      meaning: "To cause someone to feel drained of energy or vitality; weaken physically or mentally.",
      urduMeaning: "کمزور کرنا / بے دم کرنا",
      synonyms: ["Debilitate", "Exhaust", "Sap", "Weaken"],
      antonyms: ["Invigorate", "Energize", "Fortify", "Strengthen"],
      example: "Prolonged high fever and dehydration can severely enervate a frail patient.",
      difficulty: 4
    },
    {
      word: "Esoteric",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Intended for or likely to be understood by only a small number of people with specialized knowledge.",
      urduMeaning: "مخصوص / صرف اہل علم کے لیے",
      synonyms: ["Arcane", "Occult", "Recondite", "Cabbalistic"],
      antonyms: ["Exoteric", "Commonplace", "Familiar", "Universal"],
      example: "Structural proteomics involves esoteric algorithms only bioinformatics PhDs master.",
      difficulty: 4
    },
    {
      word: "Exculpate",
      level: "Elite",
      partOfSpeech: "verb",
      meaning: "Show or declare that someone is not guilty of wrongdoing; exonerate.",
      urduMeaning: "بری کرنا / بے گناہ قرار دینا",
      synonyms: ["Exonerate", "Absolve", "Vindicate", "Acquit"],
      antonyms: ["Inculpate", "Incriminate", "Condemn", "Blame"],
      example: "Subsequent DNA evidence served to completely exculpate the accused laboratory manager.",
      difficulty: 4
    },
    {
      word: "Ineffable",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Too great or extreme to be expressed or described in words; inexpressible.",
      urduMeaning: "ناقابل بیان / الفاظ سے بالا",
      synonyms: ["Indescribable", "Inexpressible", "Transcendent", "Unutterable"],
      antonyms: ["Definable", "Utterable", "Describable", "Mundane"],
      example: "The relief a parent feels upon hearing their child survived critical surgery is ineffable.",
      difficulty: 4
    },
    {
      word: "Intransigent",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Unwilling or refusing to change one's views or to agree about something.",
      urduMeaning: "سخت گیر / غیر لچکدار",
      synonyms: ["Obstinate", "Uncompromising", "Inflexible", "Recalcitrant"],
      antonyms: ["Compliant", "Flexible", "Yielding", "Accommodating"],
      example: "The administration remained intransigent, refusing to lower exorbitant hospital fees.",
      difficulty: 4
    },
    {
      word: "Obfuscate",
      level: "Elite",
      partOfSpeech: "verb",
      meaning: "To render obscure, unclear, or unintelligible; bewilder deliberately.",
      urduMeaning: "ابہام پیدا کرنا / الجھانا",
      synonyms: ["Befuddle", "Confuse", "Obscure", "Cloud"],
      antonyms: ["Clarify", "Elucidate", "Illuminate", "Explain"],
      example: "Do not use dense medical jargon to obfuscate bad news from anxious patients.",
      difficulty: 4
    },
    {
      word: "Perspicacious",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Having a ready insight into and understanding of things; mentally acute.",
      urduMeaning: "تیز فہم / دور اندیش",
      synonyms: ["Shrewd", "Discerning", "Sagacious", "Astute"],
      antonyms: ["Obtuse", "Undiscerning", "Myopic", "Dull"],
      example: "A perspicacious diagnostician caught the subtle early signs of metabolic disease.",
      difficulty: 4
    },
    {
      word: "Prodigious",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Remarkably or impressively great in extent, size, or degree; monumental.",
      urduMeaning: "حیرت انگیز / غیر معمولی",
      synonyms: ["Colossal", "Monumental", "Enormous", "Stupendous"],
      antonyms: ["Minuscule", "Negligible", "Modest", "Petite"],
      example: "The human brain contains a prodigious network of billions of synaptic connections.",
      difficulty: 4
    },
    {
      word: "Recalcitrant",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Having an obstinately uncooperative attitude toward authority or discipline.",
      urduMeaning: "سرکش / نافرمان",
      synonyms: ["Refractory", "Defiant", "Intractable", "Unruly"],
      antonyms: ["Docile", "Amenable", "Compliant", "Obedient"],
      example: "The refractory infection was recalcitrant to standard first-line antibiotic regimens.",
      difficulty: 4
    },
    {
      word: "Sagacious",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Having or showing keen mental discernment and good judgment; wise.",
      urduMeaning: "دانا / عقلمند",
      synonyms: ["Wise", "Judicious", "Prudent", "Perceptive"],
      antonyms: ["Foolish", "Imprudent", "Vacuous", "Fatuous"],
      example: "The clinic benefited greatly from the sagacious counsel of its retired dean.",
      difficulty: 4
    },
    {
      word: "Sycophant",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "A person who acts obsequiously toward someone important to gain advantage.",
      urduMeaning: "خوشامدی / چاپلوس",
      synonyms: ["Flatterer", "Toady", "Fawner", "Obsequious minion"],
      antonyms: ["Critic", "Dissentient", "Detractor", "Rebel"],
      example: "An honest research leader values constructive peer critique over empty sycophants.",
      difficulty: 4
    },
    {
      word: "Ubiquitous",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Present, appearing, or found everywhere; omnipresent.",
      urduMeaning: "ہر جگہ موجود / ہمہ گیر",
      synonyms: ["Omnipresent", "Pervasive", "Universal", "All-pervading"],
      antonyms: ["Rare", "Scarce", "Infrequent", "Isolated"],
      example: "Microscopic bacteria and dust mites are ubiquitous in the ambient atmosphere.",
      difficulty: 4
    },
    {
      word: "Vicissitude",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "A change of circumstances or fortune, typically one that is unwelcome or unpleasant.",
      urduMeaning: "گردش ایام / نشیب و فراز",
      synonyms: ["Fluctuation", "Alteration", "Shift", "Reversal"],
      antonyms: ["Stability", "Invariance", "Constancy", "Uniformity"],
      example: "A doctor must cultivate mental fortitude to withstand the vicissitudes of clinical practice.",
      difficulty: 4
    },
    {
      word: "Voracious",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Wanting or devouring great quantities of food; having a very eager approach to an activity.",
      urduMeaning: "حریص / پیٹو / بے حد شوقین",
      synonyms: ["Insatiable", "Ravenous", "Rapacious", "Edacious"],
      antonyms: ["Abstemious", "Ascetic", "Sated", "Moderate"],
      example: "He had a voracious appetite for medical literature, reading three journals a week.",
      difficulty: 4
    },
    {
      word: "Zeitgeist",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "The defining spirit or mood of a particular period of history as shown by the ideas of the time.",
      urduMeaning: "روحِ عصر / زمانے کا مزاج",
      synonyms: ["Spirit of the age", "Ethos", "Trend", "Atmosphere"],
      antonyms: ["Anachronism", "Timelessness", "Obsolescence", "Stagnation"],
      example: "Preventative medicine and AI diagnostics embody the contemporary medical zeitgeist.",
      difficulty: 4
    },
    {
      word: "Grandiloquent",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Pompous or extravagant in language, style, or manner, especially in a way that is intended to impress.",
      urduMeaning: "پرشکوہ / شیخی باز",
      synonyms: ["Bombastic", "Magniloquent", "Pretentious", "Flowery"],
      antonyms: ["Simple", "Unadorned", "Plainspoken", "Restrained"],
      example: "The speaker's grandiloquent rhetoric could not conceal his lack of empirical data.",
      difficulty: 4
    },
    {
      word: "Hegemony",
      level: "Elite",
      partOfSpeech: "noun",
      meaning: "Leadership or dominance, especially by one state or social group over others.",
      urduMeaning: "غلبہ / بالا دستی",
      synonyms: ["Dominance", "Supremacy", "Sovereignty", "Ascendancy"],
      antonyms: ["Subordination", "Servitude", "Submission", "Inferiority"],
      example: "Western research centers long held hegemony over scientific clinical publications.",
      difficulty: 4
    },
    {
      word: "Inchoate",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Just begun and so not fully formed or developed; rudimentary.",
      urduMeaning: "ابتدائی / ناتمام",
      synonyms: ["Rudimentary", "Nascent", "Embryonic", "Inceptive"],
      antonyms: ["Mature", "Developed", "Finished", "Full-fledged"],
      example: "His ideas for vaccine distribution were still inchoate and required logistical drafting.",
      difficulty: 4
    },
    {
      word: "Nefarious",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Wicked, villainous, or criminal in character.",
      urduMeaning: "بد ذات / خبیث",
      synonyms: ["Wicked", "Villainous", "Sinister", "Heinous"],
      antonyms: ["Admirable", "Virtuous", "Benevolent", "Righteous"],
      example: "The fraudulent clinic engaged in nefarious schemes to bill for fictitious procedures.",
      difficulty: 4
    },
    {
      word: "Quixotic",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Exceedingly idealistic; unrealistic and impractical.",
      urduMeaning: "خیالی پلاؤ پکانے والا / غیر عملی",
      synonyms: ["Impractical", "Utopian", "Visionary", "Chimerical"],
      antonyms: ["Pragmatic", "Realistic", "Sensible", "Utilitarian"],
      example: "Attempting to eradicate all viral pathogens within a decade is a quixotic ambition.",
      difficulty: 4
    },
    {
      word: "Sanguine",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Optimistic or positive, especially in an apparently bad or difficult situation.",
      urduMeaning: "پر امید / خوش فہم",
      synonyms: ["Optimistic", "Hopeful", "Buoyant", "Confident"],
      antonyms: ["Pessimistic", "Despondent", "Gloomy", "Morose"],
      example: "The oncologist remained sanguine about the new monoclonal antibody therapy.",
      difficulty: 4
    },
    {
      word: "Trenchant",
      level: "Elite",
      partOfSpeech: "adjective",
      meaning: "Vigorous or incisive in expression or style; sharp and penetrating.",
      urduMeaning: "کاٹ دار / مدلل اور پر اثر",
      synonyms: ["Incisive", "Cutting", "Pungent", "Penetrating"],
      antonyms: ["Vague", "Blunt", "Feeble", "Dull"],
      example: "The medical journal editor published a trenchant critique of lax safety oversight.",
      difficulty: 4
    }
  ];

  // ==========================================
  // 2. ANTONYM PAIRS DATASET
  // ==========================================
  const ANTONYM_PAIRS = [
    { word1: "Abundant", word2: "Scarce", desc: "Plentiful vs Rare" },
    { word1: "Ancient", word2: "Modern", desc: "Distant Past vs Contemporary" },
    { word1: "Brave", word2: "Cowardly", desc: "Courageous vs Timid" },
    { word1: "Expand", word2: "Contract", desc: "Enlarge vs Shrink" },
    { word1: "Optimistic", word2: "Pessimistic", desc: "Hopeful vs Defeatist" },
    { word1: "Transparent", word2: "Opaque", desc: "Clear vs Obscure" },
    { word1: "Hostile", word2: "Friendly", desc: "Antagonistic vs Cordial" },
    { word1: "Permanent", word2: "Temporary", desc: "Enduring vs Transient" },
    { word1: "Artificial", word2: "Natural", desc: "Synthetic vs Organic" },
    { word1: "Compulsory", word2: "Optional", desc: "Mandatory vs Elective" },
    { word1: "Ephemeral", word2: "Eternal", desc: "Fleeting vs Everlasting" },
    { word1: "Benevolent", word2: "Malevolent", desc: "Kind vs Malicious" },
    { word1: "Diligent", word2: "Slothful", desc: "Industrious vs Lazy" },
    { word1: "Meticulous", word2: "Careless", desc: "Precise vs Negligent" },
    { word1: "Deleterious", word2: "Salutary", desc: "Harmful vs Wholesome" },
    { word1: "Acquiesce", word2: "Dissent", desc: "Submit vs Protest" },
    { word1: "Lucid", word2: "Obscure", desc: "Clear vs Murky" },
    { word1: "Exculpate", word2: "Inculpate", desc: "Acquit vs Incriminate" },
    { word1: "Enervate", word2: "Invigorate", desc: "Weaken vs Energize" },
    { word1: "Ubiquitous", word2: "Scarce", desc: "Everywhere vs Rare" },
    { word1: "Frugal", word2: "Extravagant", desc: "Thrifty vs Wasteful" },
    { word1: "Laconic", word2: "Verbose", desc: "Concise vs Wordy" }
  ];

  // ==========================================
  // 3. CONTEXT DRILL SCENARIOS
  // ==========================================
  const CONTEXT_SCENARIOS = [
    {
      sentence: "The professor delivered an <span class='context-target-word'>abstruse</span> lecture on quantum biological mechanics that left even senior postgraduates baffled.",
      targetWord: "abstruse",
      clueType: "Result / Contrast Clue",
      question: "What does 'abstruse' mean in this clinical and academic context?",
      options: [
        "Simple and introductory",
        "Difficult to understand and obscure",
        "Ordinary and universally familiar",
        "Short and entertaining"
      ],
      correctIndex: 1,
      explanation: "Context Clue: The sentence notes that 'even senior postgraduates were baffled,' demonstrating that the lecture was obscure, complex, and difficult to comprehend."
    },
    {
      sentence: "Although untreated tuberculosis has a <span class='context-target-word'>deleterious</span> impact on pulmonary tissue, modern chemotherapy can halt bacterial replication swiftly.",
      targetWord: "deleterious",
      clueType: "Direct Impact Clue",
      question: "What does 'deleterious' mean in this medical sentence?",
      options: [
        "Harmless and mild",
        "Highly beneficial",
        "Harmful and destructive",
        "Temporary and negligible"
      ],
      correctIndex: 2,
      explanation: "Context Clue: The contrast with 'modern chemotherapy halts replication' highlights that untreated disease wreaks severe, destructive harm on tissue."
    },
    {
      sentence: "Unlike his <span class='context-target-word'>taciturn</span> lab supervisor who rarely spoke, the junior resident was cheerful and overly talkative.",
      targetWord: "taciturn",
      clueType: "Antonym Contrast Clue",
      question: "What is the meaning of 'taciturn' in this passage?",
      options: [
        "Reserved and saying little",
        "Aggressive and violent",
        "Extremely funny and lively",
        "Careless and disorganized"
      ],
      correctIndex: 0,
      explanation: "Context Clue: The word 'Unlike' sets up a direct contrast with the resident who was 'cheerful and overly talkative,' showing that taciturn means quiet and uncommunicative."
    },
    {
      sentence: "Dr. Farooq took <span class='context-target-word'>meticulous</span> notes during the surgery, ensuring that every suture and millimeter of incision was accurately documented.",
      targetWord: "meticulous",
      clueType: "Definition & Detail Clue",
      question: "What does 'meticulous' indicate about the surgeon's documentation?",
      options: [
        "Hasty and superficial",
        "Extremely careful and precise with detail",
        "Confusing and illegible",
        "Brief and incomplete"
      ],
      correctIndex: 1,
      explanation: "Context Clue: 'Ensuring that every suture and millimeter was accurately documented' illustrates extreme attention to detail and rigorous precision."
    },
    {
      sentence: "The initial euphoria following the patient's temporary recovery proved to be <span class='context-target-word'>ephemeral</span> as the infection flared up 48 hours later.",
      targetWord: "ephemeral",
      clueType: "Temporal Clue",
      question: "What does 'ephemeral' mean in this clinical update?",
      options: [
        "Lasting for a very short time",
        "Permanent and irreversible",
        "Completely fake",
        "Unusually severe"
      ],
      correctIndex: 0,
      explanation: "Context Clue: The fact that the infection flared up only '48 hours later' demonstrates that the relief was fleeting and transient."
    },
    {
      sentence: "Despite facing repeated rejections and funding cuts, her <span class='context-target-word'>tenacious</span> spirit kept the cancer research laboratory functioning.",
      targetWord: "tenacious",
      clueType: "Concession Clue",
      question: "What does 'tenacious' describe in this situation?",
      options: [
        "Weak and ready to quit",
        "Persistent, determined, and unyielding",
        "Uninterested and detached",
        "Carefree and playful"
      ],
      correctIndex: 1,
      explanation: "Context Clue: 'Despite facing repeated rejections' shows an unyielding, persistent attitude that refuses to surrender in hardship."
    }
  ];

  // ==========================================
  // 4. STORAGE & STATE MANAGEMENT
  // ==========================================
  const STORAGE_KEYS = {
    BOOKMARKS: 'mdcat_vocab_bookmarks',
    REVIEW_QUEUE: 'mdcat_vocab_review_queue',
    MASTERED: 'mdcat_vocab_mastered',
    PRACTICED: 'mdcat_vocab_practiced',
    QUIZ_STATS: 'mdcat_vocab_quiz_stats'
  };

  let state = {
    bookmarks: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]')),
    reviewQueue: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEW_QUEUE) || '[]')),
    mastered: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.MASTERED) || '[]')),
    practiced: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICED) || '[]')),
    quizStats: JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_STATS) || '{"attempts": 0, "correct": 0, "total": 0}'),
    
    // Explorer filter/sort states
    searchQuery: '',
    activeFilter: 'all',
    activeSort: 'az',
    viewMode: 'grid',
    renderedCardsLimit: 24,

    // Flashcard state
    flashcardDeck: [...VOCAB_DATA],
    flashcardIndex: 0,
    flashcardIsFlipped: false,

    // Quiz engine state
    quizQuestions: [],
    quizIndex: 0,
    quizScore: 0,
    quizStartTime: null,
    quizMistakes: [],
    quizAnswered: false,

    // Context drill state
    contextIndex: 0
  };

  function saveStorage() {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(state.bookmarks)));
    localStorage.setItem(STORAGE_KEYS.REVIEW_QUEUE, JSON.stringify(Array.from(state.reviewQueue)));
    localStorage.setItem(STORAGE_KEYS.MASTERED, JSON.stringify(Array.from(state.mastered)));
    localStorage.setItem(STORAGE_KEYS.PRACTICED, JSON.stringify(Array.from(state.practiced)));
    localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(state.quizStats));
    updateGlobalStatsUI();
  }

  // ==========================================
  // 5. GLOBAL STATS & DAILY CHALLENGE
  // ==========================================
  function updateGlobalStatsUI() {
    const totalWords = VOCAB_DATA.length;
    
    // Update count labels
    const totalWordsLabels = document.querySelectorAll('.total-words-count');
    totalWordsLabels.forEach(el => el.textContent = totalWords.toString());

    // Words Practiced
    const practicedCount = state.practiced.size;
    const statPracticedCountEl = document.getElementById('statPracticedCount');
    const barPracticedEl = document.getElementById('barPracticed');
    if (statPracticedCountEl) statPracticedCountEl.textContent = practicedCount;
    if (barPracticedEl) barPracticedEl.style.width = Math.min(100, (practicedCount / totalWords) * 100) + '%';

    // Synonyms / Mastered
    const masteredCount = state.mastered.size;
    const statSynonymsEl = document.getElementById('statSynonymsMastered');
    const barSynonymsEl = document.getElementById('barSynonyms');
    if (statSynonymsEl) statSynonymsEl.textContent = masteredCount;
    if (barSynonymsEl) barSynonymsEl.style.width = Math.min(100, (masteredCount / totalWords) * 100) + '%';

    // Antonyms Count (tracked through mastered & practiced opposites)
    const antonymsMastered = Math.round(masteredCount * 1.2);
    const statAntonymsEl = document.getElementById('statAntonymsMastered');
    const barAntonymsEl = document.getElementById('barAntonyms');
    if (statAntonymsEl) statAntonymsEl.textContent = antonymsMastered;
    if (barAntonymsEl) barAntonymsEl.style.width = Math.min(100, (antonymsMastered / (totalWords * 1.5)) * 100) + '%';

    // Quiz Accuracy
    const accuracy = state.quizStats.total > 0
      ? Math.round((state.quizStats.correct / state.quizStats.total) * 100)
      : 0;
    const statQuizAccuracyEl = document.getElementById('statQuizAccuracy');
    const statQuizAttemptsTextEl = document.getElementById('statQuizAttemptsText');
    const barAccuracyEl = document.getElementById('barAccuracy');
    if (statQuizAccuracyEl) statQuizAccuracyEl.textContent = accuracy + '%';
    if (statQuizAttemptsTextEl) statQuizAttemptsTextEl.textContent = `(${state.quizStats.attempts} quiz${state.quizStats.attempts === 1 ? '' : 'zes'})`;
    if (barAccuracyEl) barAccuracyEl.style.width = accuracy + '%';

    // Header Badges
    const headerBookmarkCountEl = document.getElementById('headerBookmarkCount');
    const headerReviewCountEl = document.getElementById('headerReviewCount');
    if (headerBookmarkCountEl) headerBookmarkCountEl.textContent = state.bookmarks.size;
    if (headerReviewCountEl) headerReviewCountEl.textContent = state.reviewQueue.size;

    // Filter pill count badges
    const countAllEl = document.getElementById('countAll');
    const countBookmarkedEl = document.getElementById('countBookmarked');
    const countReviewEl = document.getElementById('countReview');
    if (countAllEl) countAllEl.textContent = totalWords;
    if (countBookmarkedEl) countBookmarkedEl.textContent = state.bookmarks.size;
    if (countReviewEl) countReviewEl.textContent = state.reviewQueue.size;

    // Level Cards Progress calculation
    const levels = ['Basic', 'Intermediate', 'Advanced', 'Elite'];
    levels.forEach(lvl => {
      const lvlWords = VOCAB_DATA.filter(w => w.level === lvl);
      const lvlMastered = lvlWords.filter(w => state.mastered.has(w.word)).length;
      const pct = lvlWords.length > 0 ? Math.round((lvlMastered / lvlWords.length) * 100) : 0;
      
      const countEl = document.getElementById(`level${lvl.substring(0, 3)}Count`);
      const pctEl = document.getElementById(`level${lvl.substring(0, 3)}Percent`);
      const barEl = document.getElementById(`level${lvl.substring(0, 3)}Bar`);
      
      if (countEl) countEl.textContent = `${lvlWords.length} Words`;
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;
    });
  }

  function initDailyWordChallenge() {
    const today = new Date();
    // Deterministic day of year
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dailyIndex = dayOfYear % VOCAB_DATA.length;
    const dailyWord = VOCAB_DATA[dailyIndex];

    const wordEl = document.getElementById('dailyWord');
    const posEl = document.getElementById('dailyPos');
    const urduEl = document.getElementById('dailyUrdu');
    const meaningEl = document.getElementById('dailyMeaning');
    const synEl = document.getElementById('dailySynonym');
    const antEl = document.getElementById('dailyAntonym');
    const exampleEl = document.getElementById('dailyExample');
    const challengeBtn = document.getElementById('dailyChallengeBtn');

    if (wordEl && dailyWord) {
      wordEl.textContent = dailyWord.word;
      posEl.textContent = dailyWord.partOfSpeech;
      urduEl.textContent = dailyWord.urduMeaning;
      meaningEl.textContent = dailyWord.meaning;
      synEl.textContent = dailyWord.synonyms.join(', ');
      antEl.textContent = dailyWord.antonyms.join(', ');
      exampleEl.innerHTML = `<em>"${dailyWord.example}"</em>`;

      if (challengeBtn) {
        challengeBtn.onclick = () => {
          startFocusedWordPractice(dailyWord.word);
        };
      }
    }
  }

  // ==========================================
  // 6. EXPLORER: FILTER, SORT, & RENDER
  // ==========================================
  function getFilteredVocabulary() {
    let list = VOCAB_DATA.filter(item => {
      // Level or Category Filter
      if (state.activeFilter === 'Basic' || state.activeFilter === 'Intermediate' || state.activeFilter === 'Advanced' || state.activeFilter === 'Elite') {
        if (item.level !== state.activeFilter) return false;
      } else if (state.activeFilter === 'bookmarked') {
        if (!state.bookmarks.has(item.word)) return false;
      } else if (state.activeFilter === 'reviewQueue') {
        if (!state.reviewQueue.has(item.word)) return false;
      }

      // Search Query
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim();
        const inWord = item.word.toLowerCase().includes(query);
        const inMeaning = item.meaning.toLowerCase().includes(query);
        const inUrdu = item.urduMeaning.includes(query);
        const inSyn = item.synonyms.some(s => s.toLowerCase().includes(query));
        const inAnt = item.antonyms.some(a => a.toLowerCase().includes(query));
        return inWord || inMeaning || inUrdu || inSyn || inAnt;
      }

      return true;
    });

    // Sorting
    if (state.activeSort === 'az') {
      list.sort((a, b) => a.word.localeCompare(b.word));
    } else if (state.activeSort === 'za') {
      list.sort((a, b) => b.word.localeCompare(a.word));
    } else if (state.activeSort === 'easyHard') {
      list.sort((a, b) => a.difficulty - b.difficulty || a.word.localeCompare(b.word));
    } else if (state.activeSort === 'hardEasy') {
      list.sort((a, b) => b.difficulty - a.difficulty || a.word.localeCompare(b.word));
    } else if (state.activeSort === 'random') {
      // Deterministic or soft shuffle
      list.sort(() => 0.5 - Math.random());
    }

    return list;
  }

  function renderExplorerCards() {
    const grid = document.getElementById('vocabCardsGrid');
    const emptyState = document.getElementById('emptyStateCard');
    const countBadge = document.getElementById('resultsCountText');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    const remainingCountEl = document.getElementById('remainingWordsCount');

    if (!grid) return;

    const filtered = getFilteredVocabulary();
    const totalMatches = filtered.length;

    if (countBadge) {
      countBadge.textContent = `Showing ${Math.min(state.renderedCardsLimit, totalMatches)} of ${totalMatches} word${totalMatches === 1 ? '' : 's'}`;
    }

    if (totalMatches === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const visibleItems = filtered.slice(0, state.renderedCardsLimit);
    
    grid.innerHTML = visibleItems.map(item => {
      const isBookmarked = state.bookmarks.has(item.word);
      const isMastered = state.mastered.has(item.word);

      let levelClass = 'pill-basic';
      if (item.level === 'Intermediate') levelClass = 'pill-intermediate';
      if (item.level === 'Advanced') levelClass = 'pill-advanced';
      if (item.level === 'Elite') levelClass = 'pill-elite';

      return `
        <div class="vocab-card" id="card_${item.word.toLowerCase()}">
          <div class="card-top-row">
            <div>
              <h3 class="card-word-title">${item.word}</h3>
              <span class="card-pos-tag">${item.partOfSpeech}</span>
            </div>
            <span class="level-pill ${levelClass}">${item.level}</span>
          </div>

          <div class="card-urdu-text">${item.urduMeaning}</div>
          <p class="card-eng-meaning">${item.meaning}</p>

          <div class="card-chips-section">
            <div class="card-chip-row">
              <span class="chip-row-label"><i class="fa-solid fa-circle-check text-success"></i> Synonyms</span>
              <div class="chip-pill-list">
                ${item.synonyms.map(s => `<span class="vocab-chip syn-chip clickable-chip" data-search="${s}">${s}</span>`).join('')}
              </div>
            </div>

            <div class="card-chip-row">
              <span class="chip-row-label"><i class="fa-solid fa-circle-xmark text-danger"></i> Antonyms</span>
              <div class="chip-pill-list">
                ${item.antonyms.map(a => `<span class="vocab-chip ant-chip clickable-chip" data-search="${a}">${a}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="card-example-quote">
            "${item.example}"
          </div>

          <div class="card-actions-row">
            <button class="card-btn btn-learn" data-action="learn" data-word="${item.word}">
              <i class="fa-solid fa-book-open"></i> Learn
            </button>
            <button class="card-btn btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" data-word="${item.word}">
              <i class="fa-solid ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark'}"></i> ${isBookmarked ? 'Saved' : 'Bookmark'}
            </button>
            <button class="card-btn btn-practice" data-action="practice" data-word="${item.word}">
              <i class="fa-solid fa-fire"></i> Practice
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Load More visibility
    if (totalMatches > state.renderedCardsLimit) {
      if (loadMoreWrap) loadMoreWrap.style.display = 'block';
      if (remainingCountEl) remainingCountEl.textContent = (totalMatches - state.renderedCardsLimit).toString();
    } else {
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    }

    // Attach click listeners to chips & buttons
    attachExplorerCardEvents();
  }

  function attachExplorerCardEvents() {
    const grid = document.getElementById('vocabCardsGrid');
    if (!grid) return;

    // Clickable synonym/antonym chips for fast search
    grid.querySelectorAll('.clickable-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const term = e.currentTarget.getAttribute('data-search');
        if (term) {
          const searchInput = document.getElementById('vocabSearchInput');
          if (searchInput) {
            searchInput.value = term;
            state.searchQuery = term;
            renderExplorerCards();
            showSearchClearBtn(true);
          }
        }
      });
    });

    // Card Action buttons
    grid.querySelectorAll('.card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        const wordName = e.currentTarget.getAttribute('data-word');
        const wordObj = VOCAB_DATA.find(w => w.word === wordName);
        if (!wordObj) return;

        if (action === 'learn') {
          openWordDetailModal(wordObj);
        } else if (action === 'bookmark') {
          toggleBookmark(wordName);
        } else if (action === 'practice') {
          startFocusedWordPractice(wordName);
        }
      });
    });
  }

  function toggleBookmark(wordName) {
    if (state.bookmarks.has(wordName)) {
      state.bookmarks.delete(wordName);
      showToast(`Removed "${wordName}" from bookmarks`);
    } else {
      state.bookmarks.add(wordName);
      showToast(`Bookmarked "${wordName}"`);
    }
    saveStorage();
    renderExplorerCards();
    updateGlobalStatsUI();
  }

  function toggleReviewQueue(wordName) {
    if (state.reviewQueue.has(wordName)) {
      state.reviewQueue.delete(wordName);
      showToast(`Removed "${wordName}" from review queue`);
    } else {
      state.reviewQueue.add(wordName);
      showToast(`Added "${wordName}" to review queue`);
    }
    saveStorage();
    renderExplorerCards();
    updateGlobalStatsUI();
  }

  function showSearchClearBtn(show) {
    const btn = document.getElementById('searchClearBtn');
    if (btn) btn.style.display = show ? 'block' : 'none';
  }

  // ==========================================
  // 7. 3D FLASHCARD ENGINE
  // ==========================================
  function initFlashcardEngine() {
    updateFlashcardDeck();

    const flashcardEl = document.getElementById('activeFlashcard');
    const prevBtn = document.getElementById('cardPrevBtn');
    const nextBtn = document.getElementById('cardNextBtn');
    const shuffleBtn = document.getElementById('shuffleDeckBtn');
    const resetBtn = document.getElementById('resetDeckBtn');
    const masteredBtn = document.getElementById('cardMasteredBtn');
    const reviewAgainBtn = document.getElementById('cardReviewAgainBtn');
    const levelFilterSelect = document.getElementById('flashcardLevelFilter');

    if (flashcardEl) {
      flashcardEl.addEventListener('click', flipFlashcard);
      flashcardEl.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          flipFlashcard();
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', prevFlashcard);
    if (nextBtn) nextBtn.addEventListener('click', nextFlashcard);
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleFlashcards);
    if (resetBtn) resetBtn.addEventListener('click', () => {
      state.flashcardIndex = 0;
      renderCurrentFlashcard();
    });

    if (masteredBtn) {
      masteredBtn.addEventListener('click', () => {
        const cur = state.flashcardDeck[state.flashcardIndex];
        if (cur) {
          state.mastered.add(cur.word);
          state.practiced.add(cur.word);
          state.reviewQueue.delete(cur.word);
          saveStorage();
          showToast(`Mastered "${cur.word}"!`);
          nextFlashcard();
        }
      });
    }

    if (reviewAgainBtn) {
      reviewAgainBtn.addEventListener('click', () => {
        const cur = state.flashcardDeck[state.flashcardIndex];
        if (cur) {
          state.reviewQueue.add(cur.word);
          state.practiced.add(cur.word);
          saveStorage();
          showToast(`Added "${cur.word}" to review queue`);
          nextFlashcard();
        }
      });
    }

    if (levelFilterSelect) {
      levelFilterSelect.addEventListener('change', (e) => {
        const filterVal = e.target.value;
        updateFlashcardDeck(filterVal);
      });
    }
  }

  function updateFlashcardDeck(filter = 'all') {
    if (filter === 'Basic' || filter === 'Intermediate' || filter === 'Advanced' || filter === 'Elite') {
      state.flashcardDeck = VOCAB_DATA.filter(w => w.level === filter);
    } else if (filter === 'bookmarked') {
      state.flashcardDeck = VOCAB_DATA.filter(w => state.bookmarks.has(w.word));
    } else if (filter === 'reviewQueue') {
      state.flashcardDeck = VOCAB_DATA.filter(w => state.reviewQueue.has(w.word));
    } else {
      state.flashcardDeck = [...VOCAB_DATA];
    }

    if (state.flashcardDeck.length === 0) {
      state.flashcardDeck = [...VOCAB_DATA];
      showToast("No words in selected filter. Loading full deck.");
    }

    state.flashcardIndex = 0;
    renderCurrentFlashcard();
  }

  function flipFlashcard() {
    const card = document.getElementById('activeFlashcard');
    if (!card) return;
    state.flashcardIsFlipped = !state.flashcardIsFlipped;
    card.classList.toggle('flipped', state.flashcardIsFlipped);
  }

  function renderCurrentFlashcard() {
    const card = document.getElementById('activeFlashcard');
    if (!card || state.flashcardDeck.length === 0) return;

    // Reset flip state
    state.flashcardIsFlipped = false;
    card.classList.remove('flipped');

    const item = state.flashcardDeck[state.flashcardIndex];
    if (!item) return;

    // Mark as practiced
    state.practiced.add(item.word);
    saveStorage();

    // Front
    const frontLevel = document.getElementById('cardFrontLevel');
    const frontWord = document.getElementById('cardFrontWord');
    const frontPos = document.getElementById('cardFrontPos');
    if (frontLevel) frontLevel.textContent = item.level.toUpperCase();
    if (frontWord) frontWord.textContent = item.word;
    if (frontPos) frontPos.textContent = item.partOfSpeech;

    // Back
    const backWord = document.getElementById('cardBackWord');
    const backPos = document.getElementById('cardBackPos');
    const backUrdu = document.getElementById('cardBackUrdu');
    const backMeaning = document.getElementById('cardBackMeaning');
    const backSynonyms = document.getElementById('cardBackSynonyms');
    const backAntonyms = document.getElementById('cardBackAntonyms');
    const backExample = document.getElementById('cardBackExample');

    if (backWord) backWord.textContent = item.word;
    if (backPos) backPos.textContent = item.partOfSpeech;
    if (backUrdu) backUrdu.textContent = item.urduMeaning;
    if (backMeaning) backMeaning.textContent = item.meaning;
    if (backExample) backExample.textContent = `"${item.example}"`;

    if (backSynonyms) {
      backSynonyms.innerHTML = item.synonyms.map(s => `<span class="vocab-chip syn-chip">${s}</span>`).join('');
    }
    if (backAntonyms) {
      backAntonyms.innerHTML = item.antonyms.map(a => `<span class="vocab-chip ant-chip">${a}</span>`).join('');
    }

    // Counters
    const curIndexEl = document.getElementById('currentCardIndex');
    const totalCountEl = document.getElementById('totalCardsCount');
    if (curIndexEl) curIndexEl.textContent = (state.flashcardIndex + 1).toString();
    if (totalCountEl) totalCountEl.textContent = state.flashcardDeck.length.toString();
  }

  function nextFlashcard() {
    if (state.flashcardDeck.length === 0) return;
    state.flashcardIndex = (state.flashcardIndex + 1) % state.flashcardDeck.length;
    renderCurrentFlashcard();
  }

  function prevFlashcard() {
    if (state.flashcardDeck.length === 0) return;
    state.flashcardIndex = (state.flashcardIndex - 1 + state.flashcardDeck.length) % state.flashcardDeck.length;
    renderCurrentFlashcard();
  }

  function shuffleFlashcards() {
    state.flashcardDeck.sort(() => Math.random() - 0.5);
    state.flashcardIndex = 0;
    renderCurrentFlashcard();
    showToast("Deck shuffled!");
  }

  // ==========================================
  // 8. MDCAT QUIZ ENGINE
  // ==========================================
  function generateQuizQuestions(count = 20, scope = 'all') {
    let pool = [...VOCAB_DATA];
    if (scope === 'Basic' || scope === 'Intermediate' || scope === 'Advanced' || scope === 'Elite') {
      pool = VOCAB_DATA.filter(w => w.level === scope);
    } else if (scope === 'review') {
      const reviewWords = VOCAB_DATA.filter(w => state.reviewQueue.has(w.word));
      if (reviewWords.length >= 5) pool = reviewWords;
    }

    // Shuffle pool
    pool.sort(() => Math.random() - 0.5);
    const selectedWords = pool.slice(0, Math.min(count, pool.length));

    const questionTypes = [
      'SYNONYM',
      'ANTONYM',
      'CLOSEST_MEANING',
      'OPPOSITE_MEANING',
      'CONTEXT_SYNONYM',
      'CONTEXT_ANTONYM'
    ];

    const questions = selectedWords.map((item, idx) => {
      const qType = questionTypes[idx % questionTypes.length];
      let prompt = '';
      let correctAnswer = '';
      let wrongAnswers = [];
      let contextSentence = null;
      let badgeLabel = 'SYNONYM QUESTION';

      // Pick distractor words
      const otherWords = VOCAB_DATA.filter(w => w.word !== item.word);
      otherWords.sort(() => Math.random() - 0.5);

      if (qType === 'SYNONYM' || qType === 'CLOSEST_MEANING') {
        badgeLabel = qType === 'SYNONYM' ? 'CHOOSE THE SYNONYM' : 'CLOSEST MEANING';
        prompt = qType === 'SYNONYM'
          ? `Choose the closest synonym of <strong>${item.word.toUpperCase()}</strong>:`
          : `Which word is closest in meaning to <strong>${item.word.toUpperCase()}</strong>?`;
        
        correctAnswer = item.synonyms[Math.floor(Math.random() * item.synonyms.length)];
        // Distractors: Antonyms or unrelated synonyms
        wrongAnswers = [
          item.antonyms[0] || otherWords[0].word,
          otherWords[1].synonyms[0] || otherWords[1].word,
          otherWords[2].synonyms[0] || otherWords[2].word
        ];
      } else if (qType === 'ANTONYM' || qType === 'OPPOSITE_MEANING') {
        badgeLabel = qType === 'ANTONYM' ? 'CHOOSE THE ANTONYM' : 'OPPOSITE MEANING';
        prompt = qType === 'ANTONYM'
          ? `Choose the most direct antonym of <strong>${item.word.toUpperCase()}</strong>:`
          : `Which word expresses the opposite concept of <strong>${item.word.toUpperCase()}</strong>?`;
        
        correctAnswer = item.antonyms[Math.floor(Math.random() * item.antonyms.length)];
        wrongAnswers = [
          item.synonyms[0] || otherWords[0].word,
          otherWords[1].antonyms[0] || otherWords[1].word,
          otherWords[2].synonyms[0] || otherWords[2].word
        ];
      } else if (qType === 'CONTEXT_SYNONYM') {
        badgeLabel = 'CONTEXTUAL SYNONYM';
        contextSentence = item.example;
        prompt = `In the sentence below, what is the best synonym for <strong>${item.word.toUpperCase()}</strong>?`;
        correctAnswer = item.synonyms[0];
        wrongAnswers = [
          item.antonyms[0] || "Inappropriate",
          otherWords[0].synonyms[0] || "Standard",
          otherWords[1].synonyms[0] || "Ordinary"
        ];
      } else {
        badgeLabel = 'CONTEXTUAL ANTONYM';
        contextSentence = item.example;
        prompt = `In this context, choose the strongest antonym (opposite) of <strong>${item.word.toUpperCase()}</strong>:`;
        correctAnswer = item.antonyms[0];
        wrongAnswers = [
          item.synonyms[0] || "Favorable",
          otherWords[0].synonyms[0] || "Neutral",
          otherWords[1].antonyms[0] || "Common"
        ];
      }

      // Shuffle options randomly
      const allOptions = [correctAnswer, ...wrongAnswers];
      allOptions.sort(() => Math.random() - 0.5);

      return {
        wordObj: item,
        badgeLabel,
        prompt,
        contextSentence,
        options: allOptions,
        correctAnswer,
        explanation: `${correctAnswer} is the correct answer. "${item.word}" means ${item.meaning}`
      };
    });

    return questions;
  }

  function startQuiz(count = 20, scope = 'all') {
    state.quizQuestions = generateQuizQuestions(count, scope);
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizMistakes = [];
    state.quizStartTime = Date.now();
    state.quizAnswered = false;

    const introView = document.getElementById('quizIntroView');
    const activeView = document.getElementById('quizActiveView');
    const resultsView = document.getElementById('quizResultsView');

    if (introView) introView.style.display = 'none';
    if (resultsView) resultsView.style.display = 'none';
    if (activeView) activeView.style.display = 'block';

    renderCurrentQuizQuestion();
  }

  function renderCurrentQuizQuestion() {
    state.quizAnswered = false;
    const q = state.quizQuestions[state.quizIndex];
    if (!q) return;

    // Progress updates
    const qNumEl = document.getElementById('quizCurrentQNum');
    const totalQEl = document.getElementById('quizTotalQNum');
    const typeBadgeEl = document.getElementById('quizQTypeBadge');
    const liveScoreEl = document.getElementById('quizLiveScore');
    const progressBarEl = document.getElementById('quizProgressBar');

    if (qNumEl) qNumEl.textContent = (state.quizIndex + 1).toString();
    if (totalQEl) totalQEl.textContent = state.quizQuestions.length.toString();
    if (typeBadgeEl) typeBadgeEl.textContent = q.badgeLabel;
    if (liveScoreEl) liveScoreEl.textContent = state.quizScore.toString();
    if (progressBarEl) {
      const pct = ((state.quizIndex + 1) / state.quizQuestions.length) * 100;
      progressBarEl.style.width = pct + '%';
    }

    // Prompt & Context
    const promptEl = document.getElementById('quizQuestionPrompt');
    const contextBoxEl = document.getElementById('quizContextBox');
    const contextTextEl = document.getElementById('quizContextText');

    if (promptEl) promptEl.innerHTML = q.prompt;
    if (contextBoxEl && contextTextEl) {
      if (q.contextSentence) {
        contextBoxEl.style.display = 'flex';
        contextTextEl.textContent = `"${q.contextSentence}"`;
      } else {
        contextBoxEl.style.display = 'none';
      }
    }

    // Explanation & Next Button hiding
    const expBox = document.getElementById('quizExplanationBox');
    const nextBtn = document.getElementById('quizNextBtn');
    if (expBox) expBox.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // Render Options
    const optionsGrid = document.getElementById('quizOptionsGrid');
    if (optionsGrid) {
      const letters = ['A', 'B', 'C', 'D'];
      optionsGrid.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option-btn" data-option="${opt}">
          <span class="option-letter">${letters[i]}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join('');

      optionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (state.quizAnswered) return;
          const chosen = e.currentTarget.getAttribute('data-option');
          handleQuizAnswer(chosen);
        });
      });
    }
  }

  function handleQuizAnswer(selectedOption) {
    state.quizAnswered = true;
    const q = state.quizQuestions[state.quizIndex];
    if (!q) return;

    const isCorrect = selectedOption === q.correctAnswer;
    const optionsGrid = document.getElementById('quizOptionsGrid');

    // Highlight correct & wrong options
    if (optionsGrid) {
      optionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
        const opt = btn.getAttribute('data-option');
        btn.disabled = true;
        if (opt === q.correctAnswer) {
          btn.classList.add('correct');
        } else if (opt === selectedOption && !isCorrect) {
          btn.classList.add('wrong');
        }
      });
    }

    if (isCorrect) {
      state.quizScore++;
      state.mastered.add(q.wordObj.word);
    } else {
      state.reviewQueue.add(q.wordObj.word);
      state.quizMistakes.push({
        question: q,
        userAnswer: selectedOption
      });
    }

    // Mark as practiced
    state.practiced.add(q.wordObj.word);
    saveStorage();

    // Show Explanation
    const expBox = document.getElementById('quizExplanationBox');
    const expText = document.getElementById('quizExplanationText');
    const expUrdu = document.getElementById('quizExplanationUrdu');
    const nextBtn = document.getElementById('quizNextBtn');

    if (expBox && expText && expUrdu) {
      expBox.style.display = 'block';
      expText.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${q.explanation}`;
      expUrdu.textContent = `اردو معنی: ${q.wordObj.urduMeaning}`;
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.onclick = () => {
        if (state.quizIndex < state.quizQuestions.length - 1) {
          state.quizIndex++;
          renderCurrentQuizQuestion();
        } else {
          finishQuiz();
        }
      };
    }
  }

  function finishQuiz() {
    const totalQuestions = state.quizQuestions.length;
    const correctAnswers = state.quizScore;
    const timeSpentMs = Date.now() - (state.quizStartTime || Date.now());
    const minutes = Math.floor(timeSpentMs / 60000);
    const seconds = Math.floor((timeSpentMs % 60000) / 1000);
    const timeString = `${minutes}m ${seconds}s`;

    // Update global state stats
    state.quizStats.attempts++;
    state.quizStats.correct += correctAnswers;
    state.quizStats.total += totalQuestions;
    saveStorage();

    // UI View transition
    const activeView = document.getElementById('quizActiveView');
    const resultsView = document.getElementById('quizResultsView');
    if (activeView) activeView.style.display = 'none';
    if (resultsView) resultsView.style.display = 'block';

    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    // Update results elements
    const finalScoreEl = document.getElementById('finalScoreText');
    const finalTotalEl = document.getElementById('finalTotalText');
    const accuracyRingEl = document.getElementById('finalAccuracyPercent');
    const evalTextEl = document.getElementById('resultsEvaluationText');
    const resCorrectEl = document.getElementById('resCorrectCount');
    const resWrongEl = document.getElementById('resWrongCount');
    const resTimeEl = document.getElementById('resTimeSpent');
    const badgeEl = document.getElementById('resultsBadge');

    if (finalScoreEl) finalScoreEl.textContent = correctAnswers.toString();
    if (finalTotalEl) finalTotalEl.textContent = totalQuestions.toString();
    if (accuracyRingEl) accuracyRingEl.textContent = accuracy + '%';
    if (resCorrectEl) resCorrectEl.textContent = correctAnswers.toString();
    if (resWrongEl) resWrongEl.textContent = (totalQuestions - correctAnswers).toString();
    if (resTimeEl) resTimeEl.textContent = timeString;

    if (badgeEl && evalTextEl) {
      if (accuracy >= 85) {
        badgeEl.textContent = "OUTSTANDING MDCAT MASTERY";
        evalTextEl.textContent = "Exceptional performance! Your semantic vocabulary discrimination and synonym recognition rank in the top MDCAT percentile.";
      } else if (accuracy >= 65) {
        badgeEl.textContent = "GOOD VOCABULARY FOUNDATION";
        evalTextEl.textContent = "Solid work! Review the words you missed and practice the flashcard deck to boost speed and precision.";
      } else {
        badgeEl.textContent = "NEEDS SYSTEMATIC PRACTICE";
        evalTextEl.textContent = "Keep practicing! Focus on word roots, antonym pairs, and review the missed items in your Review Queue.";
      }
    }

    // Mistakes drawer
    const mistakesContainer = document.getElementById('mistakesReviewContainer');
    const mistakesList = document.getElementById('mistakesList');
    const reviewMistakesBtn = document.getElementById('quizReviewMistakesBtn');

    if (state.quizMistakes.length > 0 && mistakesContainer && mistakesList) {
      mistakesContainer.style.display = 'block';
      if (reviewMistakesBtn) reviewMistakesBtn.style.display = 'inline-flex';

      mistakesList.innerHTML = state.quizMistakes.map(m => `
        <div class="mistake-item">
          <strong>${m.question.wordObj.word}</strong> (${m.question.wordObj.partOfSpeech}) — ${m.question.wordObj.meaning}<br>
          <span style="color: var(--danger);">Your Answer: ${m.userAnswer}</span> | 
          <span style="color: var(--success);">Correct Answer: ${m.question.correctAnswer}</span>
        </div>
      `).join('');

      if (reviewMistakesBtn) {
        reviewMistakesBtn.onclick = () => {
          const mistakeWords = state.quizMistakes.map(m => m.question.wordObj.word);
          state.flashcardDeck = VOCAB_DATA.filter(w => mistakeWords.includes(w.word));
          state.flashcardIndex = 0;
          renderCurrentFlashcard();
          location.href = '#flashcardSection';
        };
      }
    } else {
      if (mistakesContainer) mistakesContainer.style.display = 'none';
      if (reviewMistakesBtn) reviewMistakesBtn.style.display = 'none';
    }
  }

  function startFocusedWordPractice(wordName) {
    const wordObj = VOCAB_DATA.find(w => w.word === wordName);
    if (!wordObj) return;

    // Load word as first card in flashcards
    const deckIndex = VOCAB_DATA.findIndex(w => w.word === wordName);
    state.flashcardDeck = [...VOCAB_DATA];
    state.flashcardIndex = deckIndex >= 0 ? deckIndex : 0;
    renderCurrentFlashcard();

    // Scroll to flashcards
    const flashSection = document.getElementById('flashcardSection');
    if (flashSection) {
      flashSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded "${wordName}" in Flashcard Mode`);
  }

  // ==========================================
  // 9. ANTONYM PAIRS & CONTEXT DRILLS
  // ==========================================
  function renderAntonymPairs(query = '') {
    const grid = document.getElementById('antonymPairsGrid');
    if (!grid) return;

    const filtered = ANTONYM_PAIRS.filter(p => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return p.word1.toLowerCase().includes(q) || p.word2.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    });

    grid.innerHTML = filtered.map(p => `
      <div class="antonym-pair-card">
        <span class="pair-word-left">${p.word1}</span>
        <span class="pair-divider"><i class="fa-solid fa-arrows-left-right"></i></span>
        <span class="pair-word-right">${p.word2}</span>
      </div>
    `).join('');
  }

  function initContextDrills() {
    renderCurrentContextDrill();

    const prevBtn = document.getElementById('contextPrevBtn');
    const nextBtn = document.getElementById('contextNextBtn');

    if (prevBtn) {
      prevBtn.onclick = () => {
        state.contextIndex = (state.contextIndex - 1 + CONTEXT_SCENARIOS.length) % CONTEXT_SCENARIOS.length;
        renderCurrentContextDrill();
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        state.contextIndex = (state.contextIndex + 1) % CONTEXT_SCENARIOS.length;
        renderCurrentContextDrill();
      };
    }
  }

  function renderCurrentContextDrill() {
    const item = CONTEXT_SCENARIOS[state.contextIndex];
    if (!item) return;

    const indexBadge = document.getElementById('contextCurrentIndex');
    const totalCount = document.getElementById('contextTotalCount');
    const clueType = document.getElementById('contextClueType');
    const sentenceEl = document.getElementById('contextSentenceText');
    const targetWordDisplay = document.getElementById('contextTargetWordDisplay');
    const optionsGrid = document.getElementById('contextOptionsGrid');
    const feedbackBox = document.getElementById('contextFeedbackBox');

    if (indexBadge) indexBadge.textContent = (state.contextIndex + 1).toString();
    if (totalCount) totalCount.textContent = CONTEXT_SCENARIOS.length.toString();
    if (clueType) clueType.textContent = item.clueType;
    if (sentenceEl) sentenceEl.innerHTML = `"${item.sentence}"`;
    if (targetWordDisplay) targetWordDisplay.textContent = item.targetWord;
    if (feedbackBox) feedbackBox.style.display = 'none';

    if (optionsGrid) {
      optionsGrid.innerHTML = item.options.map((opt, i) => `
        <button class="context-opt-btn" data-index="${i}">
          <strong>${String.fromCharCode(65 + i)}.</strong> ${opt}
        </button>
      `).join('');

      optionsGrid.querySelectorAll('.context-opt-btn').forEach(btn => {
        btn.onclick = (e) => {
          const selectedIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          handleContextDrillAnswer(selectedIdx, item);
        };
      });
    }
  }

  function handleContextDrillAnswer(chosenIndex, item) {
    const isCorrect = chosenIndex === item.correctIndex;
    const optionsGrid = document.getElementById('contextOptionsGrid');
    const feedbackBox = document.getElementById('contextFeedbackBox');
    const feedbackBadge = document.getElementById('contextFeedbackBadge');
    const feedbackExp = document.getElementById('contextFeedbackExplanation');

    if (optionsGrid) {
      optionsGrid.querySelectorAll('.context-opt-btn').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === item.correctIndex) {
          btn.style.borderColor = 'var(--success)';
          btn.style.background = 'rgba(16, 185, 129, 0.2)';
        } else if (idx === chosenIndex && !isCorrect) {
          btn.style.borderColor = 'var(--danger)';
          btn.style.background = 'rgba(239, 68, 68, 0.2)';
        }
      });
    }

    if (feedbackBox && feedbackBadge && feedbackExp) {
      feedbackBox.style.display = 'block';
      feedbackBadge.textContent = isCorrect ? "Correct! Excellent Deduction." : "Incorrect Context Selection.";
      feedbackBadge.className = `feedback-badge ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackExp.innerHTML = item.explanation;
    }
  }

  // ==========================================
  // 10. MODALS & UI DETAILS
  // ==========================================
  function openWordDetailModal(item) {
    const modal = document.getElementById('wordDetailModal');
    const levelEl = document.getElementById('detailModalLevel');
    const wordEl = document.getElementById('detailModalWord');
    const bodyEl = document.getElementById('detailModalBody');
    const bookmarkBtn = document.getElementById('detailModalBookmarkBtn');
    const quizBtn = document.getElementById('detailModalQuizBtn');

    if (!modal) return;

    if (levelEl) levelEl.textContent = item.level;
    if (wordEl) wordEl.textContent = item.word;

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <div style="font-family: var(--font-urdu); font-size: 1.6rem; color: #fbcfe8; direction: rtl; margin-bottom: 0.5rem;">
            ${item.urduMeaning}
          </div>
          <div style="font-size: 0.95rem; color: var(--cyan-accent); font-style: italic; margin-bottom: 0.75rem;">
            Part of Speech: ${item.partOfSpeech}
          </div>
          <p style="font-size: 1.05rem; color: #fff; line-height: 1.6; margin-bottom: 1.25rem;">
            ${item.meaning}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(0,0,0,0.25); padding: 1rem; border-radius: var(--radius-md);">
            <strong style="color: #86efac; display: block; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-check"></i> Synonyms:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${item.synonyms.map(s => `<span class="vocab-chip syn-chip">${s}</span>`).join('')}
            </div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 1rem; border-radius: var(--radius-md);">
            <strong style="color: #fca5a5; display: block; margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-xmark"></i> Antonyms:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${item.antonyms.map(a => `<span class="vocab-chip ant-chip">${a}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--violet-primary); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          <strong style="color: #cbd5e1; display: block; margin-bottom: 0.25rem;"><i class="fa-solid fa-quote-left"></i> Example Sentence:</strong>
          <p style="color: #e2e8f0; font-style: italic;">"${item.example}"</p>
        </div>
      `;
    }

    if (bookmarkBtn) {
      const isBookmarked = state.bookmarks.has(item.word);
      bookmarkBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${isBookmarked ? 'Remove Bookmark' : 'Bookmark Word'}`;
      bookmarkBtn.onclick = () => {
        toggleBookmark(item.word);
        openWordDetailModal(item);
      };
    }

    if (quizBtn) {
      quizBtn.onclick = () => {
        modal.style.display = 'none';
        startFocusedWordPractice(item.word);
      };
    }

    modal.style.display = 'flex';
  }

  function openUserListModal(initialTab = 'bookmarks') {
    const modal = document.getElementById('userListModal');
    const tabBookmarks = document.getElementById('modalTabBookmarks');
    const tabReview = document.getElementById('modalTabReview');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const countB = document.getElementById('modalBookmarkCount');
    const countR = document.getElementById('modalReviewCount');

    if (!modal) return;

    let activeModalTab = initialTab;

    function renderModalList() {
      const body = document.getElementById('modalBody');
      if (!body) return;

      if (countB) countB.textContent = state.bookmarks.size;
      if (countR) countR.textContent = state.reviewQueue.size;

      const wordsSet = activeModalTab === 'bookmarks' ? state.bookmarks : state.reviewQueue;
      const wordList = Array.from(wordsSet);

      if (modalTitle) modalTitle.textContent = activeModalTab === 'bookmarks' ? 'My Saved Bookmarks' : 'My Review Queue';
      if (modalIcon) modalIcon.className = activeModalTab === 'bookmarks' ? 'fa-solid fa-bookmark text-accent' : 'fa-solid fa-rotate text-accent';

      if (wordList.length === 0) {
        body.innerHTML = `
          <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
            <p>No words saved in ${activeModalTab === 'bookmarks' ? 'Bookmarks' : 'Review Queue'} yet.</p>
          </div>
        `;
        return;
      }

      body.innerHTML = wordList.map(wName => {
        const item = VOCAB_DATA.find(w => w.word === wName);
        if (!item) return '';

        return `
          <div class="modal-item-card">
            <div class="modal-item-left">
              <h4>${item.word} <small style="color: var(--cyan-accent); font-size: 0.8rem;">(${item.partOfSpeech})</small></h4>
              <div class="modal-item-meta">
                <span>Syn: ${item.synonyms.slice(0, 2).join(', ')}</span> • 
                <span>Ant: ${item.antonyms.slice(0, 2).join(', ')}</span>
              </div>
            </div>
            <div class="modal-item-actions">
              <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" data-action="practice-item" data-word="${item.word}">
                <i class="fa-solid fa-play"></i> Study
              </button>
              <button class="btn btn-glass" style="padding: 0.4rem 0.6rem;" data-action="remove-item" data-word="${item.word}">
                <i class="fa-solid fa-trash-can text-danger"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      body.querySelectorAll('[data-action="practice-item"]').forEach(b => {
        b.onclick = (e) => {
          const w = e.currentTarget.getAttribute('data-word');
          modal.style.display = 'none';
          startFocusedWordPractice(w);
        };
      });

      body.querySelectorAll('[data-action="remove-item"]').forEach(b => {
        b.onclick = (e) => {
          const w = e.currentTarget.getAttribute('data-word');
          if (activeModalTab === 'bookmarks') {
            state.bookmarks.delete(w);
          } else {
            state.reviewQueue.delete(w);
          }
          saveStorage();
          renderModalList();
          renderExplorerCards();
        };
      });
    }

    if (tabBookmarks) {
      tabBookmarks.onclick = () => {
        activeModalTab = 'bookmarks';
        tabBookmarks.classList.add('active');
        if (tabReview) tabReview.classList.remove('active');
        renderModalList();
      };
    }

    if (tabReview) {
      tabReview.onclick = () => {
        activeModalTab = 'review';
        tabReview.classList.add('active');
        if (tabBookmarks) tabBookmarks.classList.remove('active');
        renderModalList();
      };
    }

    const clearAllBtn = document.getElementById('modalClearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.onclick = () => {
        if (activeModalTab === 'bookmarks') {
          state.bookmarks.clear();
        } else {
          state.reviewQueue.clear();
        }
        saveStorage();
        renderModalList();
        renderExplorerCards();
        showToast("List cleared");
      };
    }

    const practiceListBtn = document.getElementById('modalPracticeListBtn');
    if (practiceListBtn) {
      practiceListBtn.onclick = () => {
        const wordsSet = activeModalTab === 'bookmarks' ? state.bookmarks : state.reviewQueue;
        const targetWords = Array.from(wordsSet);
        if (targetWords.length === 0) {
          showToast("No words in list to practice");
          return;
        }
        state.flashcardDeck = VOCAB_DATA.filter(w => targetWords.includes(w.word));
        state.flashcardIndex = 0;
        renderCurrentFlashcard();
        modal.style.display = 'none';
        location.href = '#flashcardSection';
        showToast(`Loaded ${targetWords.length} words into flashcard deck!`);
      };
    }

    renderModalList();
    modal.style.display = 'flex';
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ==========================================
  // 11. EVENT ATTACHMENTS & INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State UI
    updateGlobalStatsUI();
    initDailyWordChallenge();
    renderExplorerCards();
    initFlashcardEngine();
    renderAntonymPairs();
    initContextDrills();

    // 2. Navigation & Mobile Menu
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
      mobileToggle.onclick = () => mainNav.classList.toggle('open');
      mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = () => mainNav.classList.remove('open');
      });
    }

    // 3. Header Modals
    const headerBookmarkBtn = document.getElementById('headerBookmarkBtn');
    const headerReviewBtn = document.getElementById('headerReviewBtn');
    if (headerBookmarkBtn) headerBookmarkBtn.onclick = () => openUserListModal('bookmarks');
    if (headerReviewBtn) headerReviewBtn.onclick = () => openUserListModal('review');

    // 4. Modal Close Handlers
    const userListModal = document.getElementById('userListModal');
    const wordDetailModal = document.getElementById('wordDetailModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const detailModalCloseBtn = document.getElementById('detailModalCloseBtn');

    if (modalCloseBtn && userListModal) modalCloseBtn.onclick = () => userListModal.style.display = 'none';
    if (detailModalCloseBtn && wordDetailModal) detailModalCloseBtn.onclick = () => wordDetailModal.style.display = 'none';

    window.onclick = (e) => {
      if (e.target === userListModal) userListModal.style.display = 'none';
      if (e.target === wordDetailModal) wordDetailModal.style.display = 'none';
    };

    // 5. Explorer Search & Filter Inputs
    const searchInput = document.getElementById('vocabSearchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        showSearchClearBtn(state.searchQuery.length > 0);
        state.renderedCardsLimit = 24;
        renderExplorerCards();
      });
    }

    if (searchClearBtn && searchInput) {
      searchClearBtn.onclick = () => {
        searchInput.value = '';
        state.searchQuery = '';
        showSearchClearBtn(false);
        renderExplorerCards();
      };
    }

    // Filter Pills
    const filterContainer = document.getElementById('filterPillsContainer');
    if (filterContainer) {
      filterContainer.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          filterContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          e.currentTarget.classList.add('active');
          state.activeFilter = e.currentTarget.getAttribute('data-filter');
          state.renderedCardsLimit = 24;
          renderExplorerCards();
        });
      });
    }

    // Sort Dropdown
    const sortDropdown = document.getElementById('sortDropdown');
    if (sortDropdown) {
      sortDropdown.addEventListener('change', (e) => {
        state.activeSort = e.target.value;
        renderExplorerCards();
      });
    }

    // View Grid / Compact toggles
    const viewGridBtn = document.getElementById('viewGridBtn');
    const viewCompactBtn = document.getElementById('viewCompactBtn');
    const vocabGrid = document.getElementById('vocabCardsGrid');

    if (viewGridBtn && viewCompactBtn && vocabGrid) {
      viewGridBtn.onclick = () => {
        viewGridBtn.classList.add('active');
        viewCompactBtn.classList.remove('active');
        vocabGrid.classList.remove('compact-view');
      };
      viewCompactBtn.onclick = () => {
        viewCompactBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        vocabGrid.classList.add('compact-view');
      };
    }

    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.onclick = () => {
        state.renderedCardsLimit += 24;
        renderExplorerCards();
      };
    }

    // Reset Filters Button (in empty state)
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        state.searchQuery = '';
        state.activeFilter = 'all';
        showSearchClearBtn(false);
        if (filterContainer) {
          filterContainer.querySelectorAll('.filter-pill').forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
          });
        }
        renderExplorerCards();
      };
    }

    // Hero quick tags
    const quickTagsContainer = document.getElementById('heroQuickTags');
    if (quickTagsContainer) {
      quickTagsContainer.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
          const w = e.currentTarget.getAttribute('data-word');
          if (w && searchInput) {
            searchInput.value = w;
            state.searchQuery = w;
            showSearchClearBtn(true);
            renderExplorerCards();
            location.href = '#explorerSection';
          }
        });
      });
    }

    // Level Cards click -> Filter Explorer
    document.querySelectorAll('.level-card, .btn-level-select').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const lvl = e.currentTarget.getAttribute('data-level');
        if (lvl && filterContainer) {
          filterContainer.querySelectorAll('.filter-pill').forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-filter') === lvl);
          });
          state.activeFilter = lvl;
          renderExplorerCards();
          location.href = '#explorerSection';
        }
      });
    });

    // Antonym Pair search input
    const pairSearchInput = document.getElementById('pairSearchInput');
    if (pairSearchInput) {
      pairSearchInput.addEventListener('input', (e) => {
        renderAntonymPairs(e.target.value);
      });
    }

    // Quiz Launchers
    const quizStartBtn = document.getElementById('quizStartBtn');
    if (quizStartBtn) {
      quizStartBtn.onclick = () => {
        const qCount = parseInt(document.getElementById('quizQuestionCount')?.value || '20', 10);
        const qScope = document.getElementById('quizCategoryFilter')?.value || 'all';
        startQuiz(qCount, qScope);
      };
    }

    const quizRetryBtn = document.getElementById('quizRetryBtn');
    if (quizRetryBtn) {
      quizRetryBtn.onclick = () => {
        const introView = document.getElementById('quizIntroView');
        const resultsView = document.getElementById('quizResultsView');
        if (resultsView) resultsView.style.display = 'none';
        if (introView) introView.style.display = 'block';
      };
    }

    const quizQuitBtn = document.getElementById('quizQuitBtn');
    if (quizQuitBtn) {
      quizQuitBtn.onclick = () => {
        const introView = document.getElementById('quizIntroView');
        const activeView = document.getElementById('quizActiveView');
        if (activeView) activeView.style.display = 'none';
        if (introView) introView.style.display = 'block';
      };
    }

  });

})();
