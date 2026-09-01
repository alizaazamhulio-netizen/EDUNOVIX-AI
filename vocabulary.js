/**
 * MDCAT Vocabulary Mastery - Core Engine
 * Complete standalone JavaScript application logic
 */

(function () {
  'use strict';

  // ---------------------------------------------------------
  // 1. DATASETS
  // ---------------------------------------------------------
  const VOCABULARY_DATA = [
    // LEVEL 1: BASIC
    {
      id: 'b1', word: 'Abandon', phonetic: '/əˈbæn.dən/', pos: 'verb', level: 'BASIC',
      meaning: 'To leave completely and forever; to give up control or responsibility.',
      urdu: 'مکمل طور پر چھوڑ دینا / دستبردار ہونا',
      synonyms: ['Desert', 'Forsake', 'Relinquish', 'Vacate'],
      antonyms: ['Keep', 'Retain', 'Maintain', 'Claim'],
      example: 'The expedition had to abandon their camp due to severe blizzard conditions.',
      family: 'Abandon (v), Abandonment (n)', affix: 'Root: French abandonner'
    },
    {
      id: 'b2', word: 'Abundant', phonetic: '/əˈbʌn.dənt/', pos: 'adjective', level: 'BASIC',
      meaning: 'Existing or available in large quantities; more than enough.',
      urdu: 'کثیر / وافر / بکثرت',
      synonyms: ['Plentiful', 'Ample', 'Copious', 'Profuse'],
      antonyms: ['Scarce', 'Meager', 'Sparse', 'Deficient'],
      example: 'Tropical rainforests have abundant rainfall and diverse biological species.',
      family: 'Abound (v), Abundance (n), Abundantly (adv)', affix: 'Prefix: ab- (from/away)'
    },
    {
      id: 'b3', word: 'Accurate', phonetic: '/ˈæk.jə.rət/', pos: 'adjective', level: 'BASIC',
      meaning: 'Correct in all details; exact and free from error.',
      urdu: 'درست / بالکل ٹھیک / عین مطابق',
      synonyms: ['Precise', 'Exact', 'Flawless', 'Rigorous'],
      antonyms: ['Incorrect', 'Erroneous', 'Inaccurate', 'Faulty'],
      example: 'Accurate diagnosis is paramount before prescribing high-potency antibiotics.',
      family: 'Accuracy (n), Accurately (adv), Inaccurate (adj)', affix: 'Prefix: ad- + cura (care)'
    },
    {
      id: 'b4', word: 'Admire', phonetic: '/ədˈmaɪər/', pos: 'verb', level: 'BASIC',
      meaning: 'To regard with respect, warm approval, or genuine pleasure.',
      urdu: 'تعریف کرنا / پسند کرنا / قدر کی نگاہ سے دیکھنا',
      synonyms: ['Appreciate', 'Esteem', 'Venerate', 'Praise'],
      antonyms: ['Despise', 'Scorn', 'Disdain', 'Detest'],
      example: 'Medical students admire senior surgeons who maintain calm during complications.',
      family: 'Admiration (n), Admirable (adj), Admirably (adv)', affix: 'Prefix: ad- + mirari (to wonder)'
    },
    {
      id: 'b5', word: 'Ancient', phonetic: '/ˈeɪn.ʃənt/', pos: 'adjective', level: 'BASIC',
      meaning: 'Belonging to the very distant past and no longer in existence.',
      urdu: 'قدیم / بہت پرانا',
      synonyms: ['Archaic', 'Antique', 'Primeval', 'Antiquated'],
      antonyms: ['Modern', 'Contemporary', 'Recent', 'Novel'],
      example: 'Ancient herbal remedies laid the foundational principles for pharmacology.',
      family: 'Ancientness (n), Antiquity (n)', affix: 'Origin: Latin ante (before)'
    },
    {
      id: 'b6', word: 'Brave', phonetic: '/breɪv/', pos: 'adjective', level: 'BASIC',
      meaning: 'Ready to face and endure danger, pain, or difficult obstacles; courageous.',
      urdu: 'بہادر / دلیر',
      synonyms: ['Courageous', 'Valiant', 'Heroic', 'Dauntless'],
      antonyms: ['Cowardly', 'Timid', 'Fearful', 'Craven'],
      example: 'The brave healthcare workers treated infectious patients without hesitation.',
      family: 'Bravery (n), Bravely (adv), Brave (v)', affix: 'Root: bravus'
    },
    {
      id: 'b7', word: 'Calm', phonetic: '/kɑːm/', pos: 'adjective', level: 'BASIC',
      meaning: 'Not showing or feeling nervousness, anger, or other strong emotions.',
      urdu: 'پرسکون / پرامن / خاموش',
      synonyms: ['Serene', 'Tranquil', 'Placid', 'Composed'],
      antonyms: ['Agitated', 'Turbulent', 'Furious', 'Anxious'],
      example: 'Maintaining a calm respiratory rate helps reduce autonomic tachycardia.',
      family: 'Calmness (n), Calmly (adv), Becalm (v)', affix: 'Root: Greek kauma'
    },
    {
      id: 'b8', word: 'Clever', phonetic: '/ˈklev.ər/', pos: 'adjective', level: 'BASIC',
      meaning: 'Quick to understand, learn, and devise innovative ideas.',
      urdu: 'ہوشیار / ذہین / چالاک',
      synonyms: ['Intelligent', 'Astute', 'Shrewd', 'Ingenious'],
      antonyms: ['Foolish', 'Obtuse', 'Dense', 'Ignorant'],
      example: 'The research fellow devised a clever assay to measure enzyme kinetics.',
      family: 'Cleverness (n), Cleverly (adv)', affix: 'Origin: Middle English'
    },
    {
      id: 'b9', word: 'Confident', phonetic: '/ˈkɒn.fɪ.dənt/', pos: 'adjective', level: 'BASIC',
      meaning: 'Feeling or showing certainty about oneself and one\'s capabilities.',
      urdu: 'پر اعتماد / پختہ یقین رکھنے والا',
      synonyms: ['Assured', 'Self-reliant', 'Positive', 'Certain'],
      antonyms: ['Doubtful', 'Insecure', 'Diffident', 'Apprehensive'],
      example: 'Candidates who revise past MDCAT papers feel confident in the examination hall.',
      family: 'Confide (v), Confidence (n), Confidently (adv)', affix: 'Prefix: con- + fidere (trust)'
    },
    {
      id: 'b10', word: 'Difficult', phonetic: '/ˈdɪf.ɪ.kəlt/', pos: 'adjective', level: 'BASIC',
      meaning: 'Needing much effort or skill to accomplish, deal with, or understand.',
      urdu: 'مشکل / کٹھن / دشوار',
      synonyms: ['Arduous', 'Challenging', 'Demanding', 'Formidable'],
      antonyms: ['Easy', 'Simple', 'Effortless', 'Facile'],
      example: 'Synthesizing enantiomerically pure pharmaceutical compounds is a difficult process.',
      family: 'Difficulty (n), Difficultly (adv)', affix: 'Prefix: dis- + facilis (easy)'
    },
    {
      id: 'b11', word: 'Eager', phonetic: '/ˈiː.ɡər/', pos: 'adjective', level: 'BASIC',
      meaning: 'Strongly wanting to do or have something; keenly expectant.',
      urdu: 'مشتاق / بے چین / پرجوش',
      synonyms: ['Enthusiastic', 'Keen', 'Avid', 'Zealous'],
      antonyms: ['Reluctant', 'Apathetic', 'Indifferent', 'Hesitant'],
      example: 'Pre-medical students are eager to begin clinical rotations in anatomy.',
      family: 'Eagerness (n), Eagerly (adv)', affix: 'Root: Latin acer (sharp)'
    },
    {
      id: 'b12', word: 'Famous', phonetic: '/ˈfeɪ.məs/', pos: 'adjective', level: 'BASIC',
      meaning: 'Known about by many people across a wide public domain.',
      urdu: 'مشہور / معروف / نامور',
      synonyms: ['Renowned', 'Celebrated', 'Eminent', 'Illustrious'],
      antonyms: ['Unknown', 'Obscure', 'Anonymous', 'Ignominious'],
      example: 'Alexander Fleming became famous worldwide after isolating penicillin from mold.',
      family: 'Fame (n), Famously (adv), Infamous (adj)', affix: 'Suffix: -ous (having quality of)'
    },
    {
      id: 'b13', word: 'Fragile', phonetic: '/ˈfrædʒ.aɪl/', pos: 'adjective', level: 'BASIC',
      meaning: 'Easily broken, shattered, or damaged; delicate in constitution.',
      urdu: 'نازک / آسانی سے ٹوٹ جانے والا',
      synonyms: ['Delicate', 'Brittle', 'Frail', 'Vulnerable'],
      antonyms: ['Strong', 'Resilient', 'Sturdy', 'Durable'],
      example: 'Capillary walls are fragile structures susceptible to severe hypertensive damage.',
      family: 'Fragility (n), Fragileness (n), Fragment (n)', affix: 'Root: frangere (to break)'
    },
    {
      id: 'b14', word: 'Generous', phonetic: '/ˈdʒen.ər.əs/', pos: 'adjective', level: 'BASIC',
      meaning: 'Showing a readiness to give more of something than is strictly necessary.',
      urdu: 'سخی / فیاض / کشادہ دل',
      synonyms: ['Charitable', 'Magnanimous', 'Benevolent', 'Munificent'],
      antonyms: ['Stingy', 'Miserly', 'Parsimonious', 'Greedy'],
      example: 'The philanthropist made a generous donation to establish a pediatric ICU.',
      family: 'Generosity (n), Generously (adv)', affix: 'Suffix: -ous'
    },
    {
      id: 'b15', word: 'Honest', phonetic: '/ˈɒn.ɪst/', pos: 'adjective', level: 'BASIC',
      meaning: 'Free of deceit and untruthfulness; morally upright and sincere.',
      urdu: 'دیانتدار / سچا / ایماندار',
      synonyms: ['Sincere', 'Truthful', 'Candid', 'Trustworthy'],
      antonyms: ['Dishonest', 'Deceitful', 'Mendacious', 'Fraudulent'],
      example: 'Ethical medical practitioners provide honest prognoses to patients and families.',
      family: 'Honesty (n), Honestly (adv), Dishonest (adj)', affix: 'Root: honestus'
    },
    {
      id: 'b16', word: 'Huge', phonetic: '/hjuːdʒ/', pos: 'adjective', level: 'BASIC',
      meaning: 'Extremely large; enormous in size, scale, or extent.',
      urdu: 'بہت بڑا / دیو ہیکل / وسیع',
      synonyms: ['Enormous', 'Colossal', 'Immense', 'Gigantic'],
      antonyms: ['Tiny', 'Minute', 'Miniature', 'Microscopic'],
      example: 'Cardiomegaly represents a huge pathological enlargement of the ventricles.',
      family: 'Hugeness (n), Hugely (adv)', affix: 'Origin: Old French ahuge'
    },
    {
      id: 'b17', word: 'Ignore', phonetic: '/ɪɡˈnɔːr/', pos: 'verb', level: 'BASIC',
      meaning: 'Refuse to take notice of or acknowledge; disregard deliberately.',
      urdu: 'نظر انداز کرنا / دھیان نہ دینا',
      synonyms: ['Disregard', 'Overlook', 'Neglect', 'Dismiss'],
      antonyms: ['Notice', 'Acknowledge', 'Heed', 'Observe'],
      example: 'Clinicians cannot afford to ignore borderline electrolyte imbalances.',
      family: 'Ignorant (adj), Ignorance (n), Ignorable (adj)', affix: 'Prefix: in- + gnarus (knowing)'
    },
    {
      id: 'b18', word: 'Lazy', phonetic: '/ˈleɪ.zi/', pos: 'adjective', level: 'BASIC',
      meaning: 'Unwilling to work or use energy; characterized by lack of effort.',
      urdu: 'سست / کاہل',
      synonyms: ['Idle', 'Indolent', 'Slothful', 'Sluggish'],
      antonyms: ['Diligent', 'Industrious', 'Active', 'Energetic'],
      example: 'Sedentary and lazy lifestyle habits accelerate early-onset vascular disease.',
      family: 'Laziness (n), Lazily (adv)', affix: 'Origin: Low German'
    },
    {
      id: 'b19', word: 'Rapid', phonetic: '/ˈræp.ɪd/', pos: 'adjective', level: 'BASIC',
      meaning: 'Happening in a short time or at a fast pace.',
      urdu: 'تیز / تیز رفتار / جلد',
      synonyms: ['Swift', 'Quick', 'Fleet', 'Expeditious'],
      antonyms: ['Slow', 'Sluggish', 'Gradual', 'Tardy'],
      example: 'Emergency triage requires rapid diagnostic assessment and prompt stabilization.',
      family: 'Rapidity (n), Rapidly (adv)', affix: 'Root: rapere (to seize)'
    },
    {
      id: 'b20', word: 'Wealthy', phonetic: '/ˈwel.θi/', pos: 'adjective', level: 'BASIC',
      meaning: 'Having a great deal of money, resources, or assets; affluent.',
      urdu: 'دولت مند / امیر / خوشحال',
      synonyms: ['Affluent', 'Opulent', 'Prosperous', 'Well-off'],
      antonyms: ['Poor', 'Destitute', 'Impoverished', 'Indigent'],
      example: 'Developing nations require greater healthcare subsidies than wealthy states.',
      family: 'Wealth (n), Wealthiness (n)', affix: 'Suffix: -y'
    },

    // LEVEL 2: INTERMEDIATE
    {
      id: 'i1', word: 'Alleviate', phonetic: '/əˈliː.vi.eɪt/', pos: 'verb', level: 'INTERMEDIATE',
      meaning: 'To make pain, suffering, or a problem less severe or more bearable.',
      urdu: 'تسکین دینا / شدت کم کرنا / تخفیف کرنا',
      synonyms: ['Relieve', 'Mitigate', 'Assuage', 'Palliate'],
      antonyms: ['Aggravate', 'Exacerbate', 'Worsen', 'Intensify'],
      example: 'The physician prescribed analgesics to alleviate the patient’s acute abdominal pain.',
      family: 'Alleviation (n), Alleviative (adj)', affix: 'Prefix: ad- (to) + levis (light)'
    },
    {
      id: 'i2', word: 'Ambiguous', phonetic: '/æmˈbɪɡ.ju.əs/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Open to more than one interpretation; not having one obvious meaning.',
      urdu: 'مبہم / غیر واضح / مشکوک المعنی',
      synonyms: ['Unclear', 'Equivocal', 'Vague', 'Obscure'],
      antonyms: ['Explicit', 'Lucid', 'Unambiguous', 'Clear-cut'],
      example: 'An ambiguous medical history report can lead to dangerous diagnostic errors.',
      family: 'Ambiguity (n), Ambiguously (adv)', affix: 'Prefix: ambi- (both/around)'
    },
    {
      id: 'i3', word: 'Arrogant', phonetic: '/ˈær.ə.ɡənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Having an exaggerated sense of one\'s own importance or abilities.',
      urdu: 'متکبر / مغرور / خود پسند',
      synonyms: ['Haughty', 'Conceited', 'Pompous', 'Overbearing'],
      antonyms: ['Humble', 'Modest', 'Unassuming', 'Meek'],
      example: 'An arrogant specialist refused to listen to the nurse\'s vital clinical observations.',
      family: 'Arrogance (n), Arrogantly (adv)', affix: 'Root: arrogare (to claim)'
    },
    {
      id: 'i4', word: 'Benevolent', phonetic: '/bəˈnev.əl.ənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Well meaning, kindly, and motivated by a desire to do good.',
      urdu: 'مہربان / فیاض / خیر خواہ',
      synonyms: ['Compassionate', 'Altruistic', 'Beneficent', 'Humane'],
      antonyms: ['Malevolent', 'Spiteful', 'Malicious', 'Malignant'],
      example: 'The benevolent foundation funded chemotherapy treatment for indigent children.',
      family: 'Benevolence (n), Benevolently (adv)', affix: 'Prefix: bene- (good) + volens (wishing)'
    },
    {
      id: 'i5', word: 'Coherent', phonetic: '/kəʊˈhɪə.rənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Logical and consistent; forming a unified whole in argument or structure.',
      urdu: 'منطقی / مربوط / باہم جڑا ہوا',
      synonyms: ['Logical', 'Lucid', 'Rational', 'Articulate'],
      antonyms: ['Incoherent', 'Disjointed', 'Chaotic', 'Inconsistent'],
      example: 'The researcher presented a coherent hypothesis explaining viral RNA replication.',
      family: 'Cohere (v), Coherence (n), Cohesion (n)', affix: 'Prefix: co- (together) + haerere (stick)'
    },
    {
      id: 'i6', word: 'Compel', phonetic: '/kəmˈpel/', pos: 'verb', level: 'INTERMEDIATE',
      meaning: 'To force or oblige someone to do something; bring about by overwhelming force.',
      urdu: 'مجبور کرنا / دباؤ ڈالنا',
      synonyms: ['Coerce', 'Constrain', 'Oblige', 'Impel'],
      antonyms: ['Deter', 'Dissuade', 'Discourage', 'Halt'],
      example: 'Severe cardiac ischemia will compel clinicians to perform emergency catheterization.',
      family: 'Compulsion (n), Compulsory (adj), Compelling (adj)', affix: 'Prefix: com- + pellere (drive)'
    },
    {
      id: 'i7', word: 'Concise', phonetic: '/kənˈsaɪs/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Giving a lot of information clearly and in a few words; brief but comprehensive.',
      urdu: 'مختصر اور جامع / پر مغز',
      synonyms: ['Succinct', 'Terse', 'Pithy', 'Breviloquent'],
      antonyms: ['Verbose', 'Wordy', 'Prolix', 'Redundant'],
      example: 'The surgeon dictated a concise operating note highlighting key anatomical milestones.',
      family: 'Conciseness (n), Concisely (adv)', affix: 'Root: caedere (to cut)'
    },
    {
      id: 'i8', word: 'Deteriorate', phonetic: '/dɪˈtɪə.ri.ə.reɪt/', pos: 'verb', level: 'INTERMEDIATE',
      meaning: 'To become progressively worse in quality, condition, or physiological state.',
      urdu: 'خراب ہونا / بگڑنا / تنزلی کا شکار ہونا',
      synonyms: ['Decline', 'Degenerate', 'Worsen', 'Decay'],
      antonyms: ['Improve', 'Ameliorate', 'Recover', 'Flourish'],
      example: 'Without supplemental oxygen, the patient\'s arterial saturation will rapidly deteriorate.',
      family: 'Deterioration (n), Deteriorative (adj)', affix: 'Root: deterior (worse)'
    },
    {
      id: 'i9', word: 'Diligent', phonetic: '/ˈdɪl.ɪ.dʒənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Having or showing persistent care and conscientious effort in one\'s work.',
      urdu: 'محنتی / انتھک / مستعد',
      synonyms: ['Industrious', 'Assiduous', 'Sedulous', 'Conscientious'],
      antonyms: ['Negligent', 'Lazy', 'Remiss', 'Careless'],
      example: 'A diligent student reviews vocabulary notes daily to ensure long-term retention.',
      family: 'Diligence (n), Diligently (adv)', affix: 'Root: diligere (to value/love)'
    },
    {
      id: 'i10', word: 'Eliminate', phonetic: '/ɪˈlɪm.ɪ.neɪt/', pos: 'verb', level: 'INTERMEDIATE',
      meaning: 'Completely remove or get rid of something undesirable.',
      urdu: 'خارج کرنا / ختم کرنا / جڑ سے اکھاڑنا',
      synonyms: ['Eradicate', 'Extirpate', 'Abolish', 'Expel'],
      antonyms: ['Preserve', 'Retain', 'Foster', 'Establish'],
      example: 'The kidneys filter metabolic waste to eliminate nitrogenous toxins from blood.',
      family: 'Elimination (n), Eliminative (adj)', affix: 'Prefix: e- (out) + limen (threshold)'
    },
    {
      id: 'i11', word: 'Feasible', phonetic: '/ˈfiː.zə.bəl/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Possible and practical to do easily or conveniently.',
      urdu: 'قابل عمل / ممکن / قرین قیاس',
      synonyms: ['Viable', 'Practicable', 'Workable', 'Achievable'],
      antonyms: ['Impossible', 'Infeasible', 'Unworkable', 'Impractical'],
      example: 'With proper equipment, laparoscopic cholecystectomy is a feasible outpatient procedure.',
      family: 'Feasibility (n), Feasibly (adv)', affix: 'Suffix: -able (capable of)'
    },
    {
      id: 'i12', word: 'Inevitable', phonetic: '/ɪnˈev.ɪ.tə.bəl/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Certain to happen; unavoidable.',
      urdu: 'ناگزیر / جس سے بچا نہ جا سکے',
      synonyms: ['Unavoidable', 'Inescapable', 'Destined', 'Inexorable'],
      antonyms: ['Avoidable', 'Preventable', 'Uncertain', 'Evitable'],
      example: 'Cellular senescence is an inevitable biological consequence of repetitive mitosis.',
      family: 'Inevitability (n), Inevitably (adv)', affix: 'Prefix: in- (not) + evitare (avoid)'
    },
    {
      id: 'i13', word: 'Meticulous', phonetic: '/məˈtɪk.jə.ləs/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Showing great attention to detail; very careful and precise.',
      urdu: 'نہایت باریک بین / بے حد محتاط',
      synonyms: ['Thorough', 'Punctilious', 'Scrupulous', 'Fastidious'],
      antonyms: ['Careless', 'Sloppy', 'Slapdash', 'Heedless'],
      example: 'Microscopic forensic analysis demands meticulous histological preparation.',
      family: 'Meticulousness (n), Meticulously (adv)', affix: 'Suffix: -ous'
    },
    {
      id: 'i14', word: 'Obsolete', phonetic: '/ˌɒb.səˈliːt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'No longer produced or used; out of date.',
      urdu: 'متروک / فرسودہ / پرانے طرز کا',
      synonyms: ['Outdated', 'Antiquated', 'Archaic', 'Superannuated'],
      antonyms: ['Modern', 'Contemporary', 'Current', 'State-of-the-art'],
      example: 'The older analog blood pressure cuffs became obsolete after digital monitors arrived.',
      family: 'Obsolescence (n), Obsolescent (adj)', affix: 'Root: obsolescere'
    },
    {
      id: 'i15', word: 'Pragmatic', phonetic: '/præɡˈmæt.ɪk/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Dealing with things sensibly and realistically based on practical considerations.',
      urdu: 'حقیقت پسندانہ / عملی',
      synonyms: ['Realistic', 'Practical', 'Utilitarian', 'Sensible'],
      antonyms: ['Idealistic', 'Impractical', 'Utopian', 'Quixotic'],
      example: 'The triage physician adopted a pragmatic approach to prioritize critical casualties.',
      family: 'Pragmatism (n), Pragmatist (n), Pragmatically (adv)', affix: 'Root: Greek pragma (deed)'
    },
    {
      id: 'i16', word: 'Reluctant', phonetic: '/rɪˈlʌk.tənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Unwilling and hesitant; disinclined.',
      urdu: 'ہچکچانے والا / ناخوشگوار / غیر آمادہ',
      synonyms: ['Hesitant', 'Disinclined', 'Averse', 'Loath'],
      antonyms: ['Willing', 'Eager', 'Inclined', 'Enthusiastic'],
      example: 'The elderly patient was reluctant to undergo an invasive spinal biopsy.',
      family: 'Reluctance (n), Reluctantly (adv)', affix: 'Prefix: re- + luctari (to struggle)'
    },
    {
      id: 'i17', word: 'Resilient', phonetic: '/rɪˈzɪl.jənt/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Able to withstand or recover quickly from difficult conditions or trauma.',
      urdu: 'لچکدار / جلد سنبھل جانے والا / ثابت قدم',
      synonyms: ['Tough', 'Tenacious', 'Buoyant', 'Robust'],
      antonyms: ['Fragile', 'Vulnerable', 'Brittle', 'Delicate'],
      example: 'Young children possess remarkably resilient bone tissue that heals rapidly.',
      family: 'Resilience (n), Resiliently (adv)', affix: 'Prefix: re- + salire (to leap)'
    },
    {
      id: 'i18', word: 'Scrutinize', phonetic: '/ˈskruː.tɪ.naɪz/', pos: 'verb', level: 'INTERMEDIATE',
      meaning: 'Examine or inspect closely and thoroughly.',
      urdu: 'باریک بینی سے جائزہ لینا / گہری چھان بین کرنا',
      synonyms: ['Inspect', 'Examine', 'Audit', 'Dissect'],
      antonyms: ['Ignore', 'Overlook', 'Disregard', 'Skim'],
      example: 'Pathologists scrutinize stained cell biopsy specimens under high magnification.',
      family: 'Scrutiny (n), Scrutinizer (n)', affix: 'Root: scrutari (to search)'
    },
    {
      id: 'i19', word: 'Substantial', phonetic: '/səbˈstæn.ʃəl/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Of considerable importance, size, or worth; strongly built or made.',
      urdu: 'نمایاں / ٹھوس / کثیر مقدار میں',
      synonyms: ['Significant', 'Considerable', 'Weighty', 'Substantive'],
      antonyms: ['Insignificant', 'Trivial', 'Negligible', 'Minor'],
      example: 'The clinical trial demonstrated a substantial reduction in mortality rates.',
      family: 'Substance (n), Substantially (adv)', affix: 'Prefix: sub- + stare (to stand)'
    },
    {
      id: 'i20', word: 'Versatile', phonetic: '/ˈvɜː.sə.taɪl/', pos: 'adjective', level: 'INTERMEDIATE',
      meaning: 'Able to adapt or be adapted to many different functions or activities.',
      urdu: 'ہر فن مولا / کثیر الجہتی / ہمہ صفت',
      synonyms: ['Adaptable', 'Multifaceted', 'Flexible', 'All-around'],
      antonyms: ['Limited', 'Inflexible', 'Narrow', 'Rigid'],
      example: 'Stem cells are versatile biological units capable of differentiating into various cell lines.',
      family: 'Versatility (n), Versatilely (adv)', affix: 'Root: vertere (to turn)'
    },

    // LEVEL 3: ADVANCED
    {
      id: 'a1', word: 'Aberration', phonetic: '/ˌæb.əˈreɪ.ʃən/', pos: 'noun', level: 'ADVANCED',
      meaning: 'A departure from what is normal, usual, or expected, typically unwelcome.',
      urdu: 'انحراف / بے قاعدگی / معمول سے ہٹ کر',
      synonyms: ['Anomaly', 'Deviation', 'Divergence', 'Irregularity'],
      antonyms: ['Normality', 'Conformity', 'Regularity', 'Standard'],
      example: 'The sudden spike in leukocytes was an aberration caused by transient stress.',
      family: 'Aberrant (adj), Aberrantly (adv)', affix: 'Prefix: ab- (away) + errare (to stray)'
    },
    {
      id: 'a2', word: 'Acquiesce', phonetic: '/ˌæk.wiˈes/', pos: 'verb', level: 'ADVANCED',
      meaning: 'Accept something reluctantly but without protest; submit passively.',
      urdu: 'بے چون و چرا مان لینا / رضامندی ظاہر کرنا',
      synonyms: ['Consent', 'Concede', 'Accede', 'Comply'],
      antonyms: ['Resist', 'Dissent', 'Protest', 'Object'],
      example: 'The committee decided to acquiesce to the revised regulatory protocols.',
      family: 'Acquiescence (n), Acquiescent (adj)', affix: 'Prefix: ad- + quiescere (to rest)'
    },
    {
      id: 'a3', word: 'Belligerent', phonetic: '/bəˈlɪdʒ.ər.ənt/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Hostile, aggressive, and eager to fight.',
      urdu: 'جنگجو / جارحانہ / جھگڑالو',
      synonyms: ['Aggressive', 'Combative', 'Pugnacious', 'Bellicose'],
      antonyms: ['Peaceful', 'Conciliatory', 'Pacifist', 'Amicable'],
      example: 'Hypoglycemia can cause sudden belligerent outbursts in confused patients.',
      family: 'Belligerence (n), Belligerently (adv)', affix: 'Root: bellum (war) + gerere (to wage)'
    },
    {
      id: 'a4', word: 'Clandestine', phonetic: '/klænˈdes.tɪn/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Kept secret or done secretively, especially because illicit.',
      urdu: 'خفیہ / پوشیدہ / صیغہ راز میں رکھا گیا',
      synonyms: ['Covert', 'Surreptitious', 'Furtive', 'Stealthy'],
      antonyms: ['Open', 'Overt', 'Public', 'Conspicuous'],
      example: 'Authorities seized clandestine shipments of counterfeit analgesics at the border.',
      family: 'Clandestinely (adv), Clandestinity (n)', affix: 'Root: clam (secretly)'
    },
    {
      id: 'a5', word: 'Conundrum', phonetic: '/kəˈnʌn.drəm/', pos: 'noun', level: 'ADVANCED',
      meaning: 'A confusing, intricate, and difficult problem or question.',
      urdu: 'گتھی / چیستان / پیچیدہ مسئلہ',
      synonyms: ['Puzzle', 'Enigma', 'Dilemma', 'Quagmire'],
      antonyms: ['Solution', 'Resolution', 'Clarity', 'Explanation'],
      example: 'Treating resistant bacterial strains without damaging renal tubules is a therapeutic conundrum.',
      family: 'Conundrums (pl)', affix: 'Origin: Oxford student slang'
    },
    {
      id: 'a6', word: 'Deleterious', phonetic: '/ˌdel.ɪˈtɪə.ri.əs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Causing harm or damage; injurious to living systems.',
      urdu: 'مضر / نقصان دہ / زہریلا',
      synonyms: ['Harmful', 'Detrimental', 'Inimical', 'Pernicious'],
      antonyms: ['Beneficial', 'Salubrious', 'Wholesome', 'Advantageous'],
      example: 'Chronic sleep deprivation exerts deleterious impacts on neuroendocrine regulation.',
      family: 'Deleteriousness (n), Deleteriously (adv)', affix: 'Root: Greek deleterios (noxious)'
    },
    {
      id: 'a7', word: 'Ephemeral', phonetic: '/ɪˈfem.ər.əl/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Lasting for a very short time; transient and fleeting.',
      urdu: 'عارضی / ناپائیدار / چند روزہ',
      synonyms: ['Fleeting', 'Transient', 'Evanescent', 'Momentary'],
      antonyms: ['Permanent', 'Enduring', 'Perpetual', 'Everlasting'],
      example: 'The analgesic relief offered by local lidocaine is ephemeral, lasting barely an hour.',
      family: 'Ephemerality (n), Ephemerally (adv)', affix: 'Prefix: epi- (upon) + hemera (day)'
    },
    {
      id: 'a8', word: 'Equivocal', phonetic: '/ɪˈkwɪv.ə.kəl/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Open to more than one interpretation; deliberately ambiguous or uncertain.',
      urdu: 'دو پہلو / گول مول / غیر قطعی',
      synonyms: ['Ambiguous', 'Noncommittal', 'Indefinite', 'Vague'],
      antonyms: ['Unequivocal', 'Definite', 'Unmistakable', 'Explicit'],
      example: 'The ultrasound scan provided equivocal findings regarding appendiceal inflammation.',
      family: 'Equivocate (v), Equivocation (n), Equivocally (adv)', affix: 'Prefix: aequi- (equal) + vox (voice)'
    },
    {
      id: 'a9', word: 'Fastidious', phonetic: '/fæsˈtɪd.i.əs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Very attentive to and concerned about accuracy and detail; hard to please.',
      urdu: 'نہایت حساس / نکتہ چین / باریک بین',
      synonyms: ['Meticulous', 'Punctilious', 'Demanding', 'Hypercritical'],
      antonyms: ['Careless', 'Lax', 'Indiscriminate', 'Sloppy'],
      example: 'Certain fastidious bacteria require specialized culture media containing blood agar.',
      family: 'Fastidiousness (n), Fastidiously (adv)', affix: 'Root: fastidium (disgust)'
    },
    {
      id: 'a10', word: 'Gregarious', phonetic: '/ɡrɪˈɡeə.ri.əs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Fond of company; sociable; living in flocks or communities.',
      urdu: 'ملنسار / صحبت پسند / گروہ میں رہنے والا',
      synonyms: ['Sociable', 'Companionable', 'Extroverted', 'Convivial'],
      antonyms: ['Reserved', 'Solitary', 'Introverted', 'Reclusive'],
      example: 'Primates are naturally gregarious mammals that suffer stress when isolated.',
      family: 'Gregariousness (n), Gregariously (adv)', affix: 'Root: grex (flock/herd)'
    },
    {
      id: 'a11', word: 'Impeccable', phonetic: '/ɪmˈpek.ə.bəl/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'In accordance with the highest standards of propriety; faultless.',
      urdu: 'بے عیب / بے داغ / بے خطا',
      synonyms: ['Flawless', 'Spotless', 'Infallible', 'Exemplary'],
      antonyms: ['Defective', 'Flawed', 'Faulty', 'Imperfect'],
      example: 'The surgeon maintained impeccable sterile technique throughout the vascular graft.',
      family: 'Impeccability (n), Impeccably (adv)', affix: 'Prefix: in- (not) + peccare (to sin)'
    },
    {
      id: 'a12', word: 'Incongruous', phonetic: '/ɪnˈkɒŋ.ɡru.əs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Not in harmony or keeping with the surroundings or other aspects of something.',
      urdu: 'بے جوڑ / غیر موافق / ناموزوں',
      synonyms: ['Inconsistent', 'Incompatible', 'Inappropriate', 'Jarring'],
      antonyms: ['Compatible', 'Harmonious', 'Congruous', 'Consistent'],
      example: 'A cheerful demeanor seemed incongruous with the patient\'s terminal prognosis.',
      family: 'Incongruity (n), Incongruously (adv)', affix: 'Prefix: in- (not) + congruere (agree)'
    },
    {
      id: 'a13', word: 'Juxtapose', phonetic: '/ˌdʒʌk.stəˈpəʊz/', pos: 'verb', level: 'ADVANCED',
      meaning: 'Place or deal with close together for contrasting effect.',
      urdu: 'موازنے کے لیے برابر رکھنا / پہلو بہ پہلو رکھنا',
      synonyms: ['Compare', 'Collocate', 'Contrast', 'Place side-by-side'],
      antonyms: ['Separate', 'Isolate', 'Disconnect', 'Distance'],
      example: 'The professor juxtaposed healthy lung tissue with emphysematous slides.',
      family: 'Juxtaposition (n), Juxtaposed (adj)', affix: 'Prefix: juxta (near) + poser (place)'
    },
    {
      id: 'a14', word: 'Laconic', phonetic: '/ləˈkɒn.ɪk/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Using very few words; concise to the point of seeming rude or mysterious.',
      urdu: 'مختصر گو / کم گو / پر معنی انداز میں بولنے والا',
      synonyms: ['Concise', 'Terse', 'Pithy', 'Succinct'],
      antonyms: ['Verbose', 'Loquacious', 'Garrulous', 'Voluble'],
      example: 'His laconic response of "Proceed" masked intense underlying anxiety.',
      family: 'Laconically (adv), Laconism (n)', affix: 'Root: Lakon (Spartan)'
    },
    {
      id: 'a15', word: 'Magnanimous', phonetic: '/mæɡˈnæn.ɪ.məs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Generous or forgiving, especially toward a rival or less powerful person.',
      urdu: 'عالی ظرف / فراخ دل / فیاض',
      synonyms: ['Noble', 'Generous', 'Altruistic', 'Beneficent'],
      antonyms: ['Petty', 'Spiteful', 'Vindictive', 'Mean'],
      example: 'The senior doctor was magnanimous, praising the junior resident\'s keen catch.',
      family: 'Magnanimity (n), Magnanimously (adv)', affix: 'Root: magnus (great) + animus (soul)'
    },
    {
      id: 'a16', word: 'Ostensible', phonetic: '/ɒsˈten.sɪ.bəl/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Stated or appearing to be true, but not necessarily so.',
      urdu: 'ظاہری / نمائش کے طور پر / برائے نام',
      synonyms: ['Apparent', 'Superficial', 'Avowed', 'Plausible'],
      antonyms: ['Genuine', 'Real', 'Actual', 'Authentic'],
      example: 'The ostensible reason for his clinic absence was fatigue, but severe burnout was true.',
      family: 'Ostension (n), Ostensibly (adv)', affix: 'Root: ostendere (to show)'
    },
    {
      id: 'a17', word: 'Pernicious', phonetic: '/pəˈnɪʃ.əs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Having a harmful effect, especially in a gradual or subtle way.',
      urdu: 'مہلک / نہایت نقصان دہ / تباہ کن',
      synonyms: ['Destructive', 'Inimical', 'Malignant', 'Noxious'],
      antonyms: ['Beneficial', 'Innocuous', 'Salubrious', 'Harmless'],
      example: 'Pernicious anemia stems from intrinsic factor deficiency impairing B12 absorption.',
      family: 'Perniciousness (n), Perniciously (adv)', affix: 'Prefix: per- (thoroughly) + nex (death)'
    },
    {
      id: 'a18', word: 'Quintessential', phonetic: '/ˌkwɪn.tɪˈsen.ʃəl/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Representing the most perfect or typical example of a quality or class.',
      urdu: 'بہترین نمونہ / کامل مثال',
      synonyms: ['Typical', 'Archetypal', 'Exemplary', 'Definitive'],
      antonyms: ['Atypical', 'Unrepresentative', 'Aberrant', 'Unusual'],
      example: 'A resting tremor is the quintessential clinical manifestation of Parkinsonism.',
      family: 'Quintessence (n), Quintessentially (adv)', affix: 'Root: quinta essentia (fifth element)'
    },
    {
      id: 'a19', word: 'Scrupulous', phonetic: '/ˈskruː.pjə.ləs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Diligent, thorough, and extremely attentive to details; very principled.',
      urdu: 'انتہائی با اصول / محتاط / فرض شناس',
      synonyms: ['Conscientious', 'Meticulous', 'Ethical', 'Punctilious'],
      antonyms: ['Careless', 'Unprincipled', 'Dishonest', 'Remiss'],
      example: 'Clinical trial protocols demand scrupulous adherence to ethical consent guidelines.',
      family: 'Scruple (n), Scrupulously (adv)', affix: 'Root: scrupulus (uneasiness)'
    },
    {
      id: 'a20', word: 'Tenacious', phonetic: '/təˈneɪ.ʃəs/', pos: 'adjective', level: 'ADVANCED',
      meaning: 'Tending to keep a firm hold of something; clinging; persistent.',
      urdu: 'ثابت قدم / سختی سے جڑ جانے والا / پر عزم',
      synonyms: ['Persistent', 'Resolute', 'Dogged', 'Unyielding'],
      antonyms: ['Yielding', 'Irresolute', 'Vacillating', 'Surrendering'],
      example: 'Biofilms form tenacious coatings on prosthetic joints that resist antimicrobial action.',
      family: 'Tenacity (n), Tenaciously (adv)', affix: 'Root: tenere (to hold)'
    },

    // LEVEL 4: ELITE / VERY ADVANCED
    {
      id: 'e1', word: 'Abstruse', phonetic: '/æbˈstruːs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Difficult to understand; obscure and esoteric in nature.',
      urdu: 'دقیق / پیچیدہ / سمجھنے میں نہایت مشکل',
      synonyms: ['Esoteric', 'Arcane', 'Recondite', 'Inscrutable'],
      antonyms: ['Obvious', 'Lucid', 'Simple', 'Transparent'],
      example: 'The professor\'s abstruse dissertation on quantum neurobiology puzzled the students.',
      family: 'Abstruseness (n), Abstrusely (adv)', affix: 'Prefix: ab- (away) + trudere (to thrust)'
    },
    {
      id: 'e2', word: 'Apocryphal', phonetic: '/əˈpɒk.rɪ.fəl/', pos: 'adjective', level: 'ELITE',
      meaning: 'Of doubtful authenticity, although widely circulated as being true.',
      urdu: 'جعلی / غیر مستند / من گھڑت',
      synonyms: ['Dubious', 'Spurious', 'Fictitious', 'Unverified'],
      antonyms: ['Authentic', 'Genuine', 'Verifiable', 'True'],
      example: 'The story that Fleming discovered penicillin entirely by accident is partly apocryphal.',
      family: 'Apocrypha (n), Apocryphally (adv)', affix: 'Prefix: apo- + kryptein (to hide)'
    },
    {
      id: 'e3', word: 'Circumlocution', phonetic: '/ˌsɜː.kəm.ləˈkjuː.ʃən/', pos: 'noun', level: 'ELITE',
      meaning: 'The use of many words where fewer would do, especially in a deliberate attempt to be vague.',
      urdu: 'بات گھما پھرا کر کہنا / طوالت کلامی',
      synonyms: ['Verbosity', 'Periphrasis', 'Tautology', 'Wordiness'],
      antonyms: ['Brevity', 'Conciseness', 'Directness', 'Succinctness'],
      example: 'Instead of admitting negligence, the administrator spoke in tedious circumlocution.',
      family: 'Circumlocutory (adj)', affix: 'Prefix: circum- (around) + loqui (speak)'
    },
    {
      id: 'e4', word: 'Deference', phonetic: '/ˈdef.ər.əns/', pos: 'noun', level: 'ELITE',
      meaning: 'Polite submission and respect shown towards an elder or authority.',
      urdu: 'احترام / تعظیم / تابعداری',
      synonyms: ['Respect', 'Reverence', 'Veneration', 'Obedience'],
      antonyms: ['Defiance', 'Insolence', 'Contempt', 'Disrespect'],
      example: 'Junior surgeons displayed deep deference toward the pioneer of neurosurgery.',
      family: 'Defer (v), Deferential (adj), Deferentially (adv)', affix: 'Prefix: de- + ferre (to bear)'
    },
    {
      id: 'e5', word: 'Enervate', phonetic: '/ˈen.ə.veɪt/', pos: 'verb', level: 'ELITE',
      meaning: 'Cause someone to feel drained of energy or vitality; weaken.',
      urdu: 'کمزور کرنا / نڈھال کر دینا / طاقت سلب کرنا',
      synonyms: ['Exhaust', 'Debilitate', 'Sap', 'Fatigue'],
      antonyms: ['Invigorate', 'Energize', 'Strengthen', 'Fortify'],
      example: 'Prolonged febrile episodes can severely enervate pediatric patients.',
      family: 'Enervation (n), Enervative (adj)', affix: 'Prefix: e- (out) + nervus (sinew/nerve)'
    },
    {
      id: 'e6', word: 'Esoteric', phonetic: '/ˌes.əˈter.ɪk/', pos: 'adjective', level: 'ELITE',
      meaning: 'Intended for or likely to be understood by only a small number of people with specialized knowledge.',
      urdu: 'مخصوص / باطنی / خاص لوگوں کی سمجھ میں آنے والا',
      synonyms: ['Arcane', 'Recondite', 'Cryptic', 'Occult'],
      antonyms: ['Common', 'Exoteric', 'Universal', 'Familiar'],
      example: 'Enzyme conformational thermodynamic theory remains an esoteric branch of biochemistry.',
      family: 'Esotericism (n), Esoterically (adv)', affix: 'Root: Greek esotero (inner)'
    },
    {
      id: 'e7', word: 'Exculpate', phonetic: '/ˈek.skʌl.peɪt/', pos: 'verb', level: 'ELITE',
      meaning: 'Show or declare that someone is not guilty of wrongdoing.',
      urdu: 'بری الذمہ قرار دینا / بے گناہ ٹھہرانا',
      synonyms: ['Acquit', 'Exonerate', 'Absolve', 'Vindicate'],
      antonyms: ['Condemn', 'Incriminate', 'Culpate', 'Blame'],
      example: 'Histopathological evidence served to exculpate the surgeon from malpractice allegations.',
      family: 'Exculpation (n), Exculpatory (adj)', affix: 'Prefix: ex- (out) + culpa (blame)'
    },
    {
      id: 'e8', word: 'Ineffable', phonetic: '/ɪnˈef.ə.bəl/', pos: 'adjective', level: 'ELITE',
      meaning: 'Too great or extreme to be expressed or described in words.',
      urdu: 'ناقابل بیان / جو لفظوں میں نہ سمائے',
      synonyms: ['Indescribable', 'Inexpressible', 'Transcendent', 'Unutterable'],
      antonyms: ['Expressible', 'Describable', 'Utterable', 'Definable'],
      example: 'Witnessing the miraculous revival of a cardiac arrest victim caused ineffable relief.',
      family: 'Ineffability (n), Ineffably (adv)', affix: 'Prefix: in- (not) + effabilis (speakable)'
    },
    {
      id: 'e9', word: 'Intransigent', phonetic: '/ɪnˈtræn.zɪ.dʒənt/', pos: 'adjective', level: 'ELITE',
      meaning: 'Unwilling or refusing to change one\'s views or to agree about something.',
      urdu: 'سخت گیر / غیر لچکدار / اڑ جانے والا',
      synonyms: ['Unyielding', 'Obstinate', 'Intractable', 'Inflexible'],
      antonyms: ['Flexible', 'Accommodating', 'Compliant', 'Pliable'],
      example: 'The intransigent patient refused life-saving blood transfusions on philosophical grounds.',
      family: 'Intransigence (n), Intransigently (adv)', affix: 'Prefix: in- + transigere (compromise)'
    },
    {
      id: 'e10', word: 'Obfuscate', phonetic: '/ˈɒb.fʌs.keɪt/', pos: 'verb', level: 'ELITE',
      meaning: 'Make obscure, unclear, or unintelligible; bewilder someone.',
      urdu: 'الجھانا / مبہم بنانا / دھندلا دینا',
      synonyms: ['Confuse', 'Cloud', 'Muddle', 'Mystify'],
      antonyms: ['Clarify', 'Illuminate', 'Elucidate', 'Simplify'],
      example: 'Using complex medical jargon in patient counseling only serves to obfuscate diagnosis.',
      family: 'Obfuscation (n), Obfuscatory (adj)', affix: 'Prefix: ob- + fuscare (to darken)'
    },
    {
      id: 'e11', word: 'Perspicacious', phonetic: '/ˌpɜː.spɪˈkeɪ.ʃəs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Having a ready insight into and understanding of things; mentally acute.',
      urdu: 'تیز فہم / دور اندیش / صاحب بصیرت',
      synonyms: ['Perceptive', 'Astute', 'Discerning', 'Sagacious'],
      antonyms: ['Unperceptive', 'Obtuse', 'Blind', 'Dulled'],
      example: 'A perspicacious diagnostician noticed the faint jaundice in the sclera immediately.',
      family: 'Perspicacity (n), Perspicaciously (adv)', affix: 'Prefix: per- (through) + spicere (to look)'
    },
    {
      id: 'e12', word: 'Prodigious', phonetic: '/prəˈdɪdʒ.əs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Remarkably or impressively great in extent, size, or degree.',
      urdu: 'حیرت انگیز حد تک بڑا / غیر معمولی / عظیم',
      synonyms: ['Enormous', 'Colossal', 'Phenomenal', 'Monumental'],
      antonyms: ['Insignificant', 'Puny', 'Minuscule', 'Unremarkable'],
      example: 'The human cerebral cortex possesses a prodigious capacity for synaptic plasticity.',
      family: 'Prodigy (n), Prodigiousness (n), Prodigiously (adv)', affix: 'Root: prodigium (omen/marvel)'
    },
    {
      id: 'e13', word: 'Recalcitrant', phonetic: '/rɪˈkæl.sɪ.trənt/', pos: 'adjective', level: 'ELITE',
      meaning: 'Having an obstinately uncooperative attitude toward authority or discipline.',
      urdu: 'سرکش / نافرمان / حکم نہ ماننے والا',
      synonyms: ['Defiant', 'Refractory', 'Contumacious', 'Disobedient'],
      antonyms: ['Obedient', 'Compliant', 'Docile', 'Submissive'],
      example: 'The patient developed recalcitrant hypertension unresponsive to triple therapy.',
      family: 'Recalcitrance (n), Recalcitrantly (adv)', affix: 'Prefix: re- + calcitrare (to kick)'
    },
    {
      id: 'e14', word: 'Sagacious', phonetic: '/səˈɡeɪ.ʃəs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Having or showing keen mental discernment and good judgment; wise.',
      urdu: 'دانا / عقل مند / صاحب حکمت',
      synonyms: ['Wise', 'Discerning', 'Judicious', 'Prudent'],
      antonyms: ['Foolish', 'Injudicious', 'Fatuous', 'Unwise'],
      example: 'The sagacious professor advised against rushing into unnecessary invasive interventions.',
      family: 'Sagacity (n), Sagaciously (adv)', affix: 'Root: sagax (wise/keen)'
    },
    {
      id: 'e15', word: 'Sycophant', phonetic: '/ˈsɪk.ə.fænt/', pos: 'noun', level: 'ELITE',
      meaning: 'A person who acts obsequiously toward someone important in order to gain advantage.',
      urdu: 'خوشامدی / چاپلوس / کاسہ لیس',
      synonyms: ['Flatterer', 'Toady', 'Bootlicker', 'Fawner'],
      antonyms: ['Critic', 'Detractor', 'Independent'],
      example: 'The clinical director valued honest peer criticism over the praise of a sycophant.',
      family: 'Sycophancy (n), Sycophantic (adj)', affix: 'Root: Greek sukophantes'
    },
    {
      id: 'e16', word: 'Ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Present, appearing, or found everywhere simultaneously.',
      urdu: 'ہر جگہ موجود / ہمہ گیر',
      synonyms: ['Omnipresent', 'Pervasive', 'Prevalent', 'Universal'],
      antonyms: ['Rare', 'Scarce', 'Infrequent', 'Localized'],
      example: 'Escherichia coli bacteria are ubiquitous inhabitants of mammalian gastrointestinal tracts.',
      family: 'Ubiquity (n), Ubiquitously (adv)', affix: 'Root: Latin ubique (everywhere)'
    },
    {
      id: 'e17', word: 'Vicissitude', phonetic: '/vɪˈsɪs.ɪ.tjuːd/', pos: 'noun', level: 'ELITE',
      meaning: 'A change of circumstances or fortune, typically one that is unwelcome.',
      urdu: 'حالات کا اتار چڑھاؤ / نیرنگی گردش ایام',
      synonyms: ['Variation', 'Fluctuation', 'Shift', 'Transmutation'],
      antonyms: ['Stability', 'Uniformity', 'Constancy', 'Invariance'],
      example: 'A medical career demands emotional resilience to endure the vicissitudes of patient care.',
      family: 'Vicissitudes (pl), Vicissitudinous (adj)', affix: 'Root: vicis (change)'
    },
    {
      id: 'e18', word: 'Voracious', phonetic: '/vəˈreɪ.ʃəs/', pos: 'adjective', level: 'ELITE',
      meaning: 'Wanting or devouring great quantities of food; having an eager approach.',
      urdu: 'نہایت بھوکا / حریص / پیاسا',
      synonyms: ['Insatiable', 'Ravenous', 'Avid', 'Gluttonous'],
      antonyms: ['Satisfied', 'Abstemious', 'Moderate', 'Quenched'],
      example: 'Medical aspirants require a voracious appetite for biological and chemical literature.',
      family: 'Voracity (n), Voraciously (adv)', affix: 'Root: vorare (to devour)'
    },
    {
      id: 'e19', word: 'Zephyr', phonetic: '/ˈzef.ər/', pos: 'noun', level: 'ELITE',
      meaning: 'A soft, gentle, pleasant breeze.',
      urdu: 'باد نسیم / دھیمی ٹھنڈی ہوا',
      synonyms: ['Breeze', 'Air', 'Draft', 'Gentle wind'],
      antonyms: ['Gale', 'Storm', 'Hurricane', 'Tempest'],
      example: 'A cool spring zephyr refreshed the exhausted doctors during their hospital courtyard break.',
      family: 'Zephyrs (pl)', affix: 'Root: Greek Zephuros (West wind)'
    },
    {
      id: 'e20', word: 'Zeitgeist', phonetic: '/ˈtsaɪt.ɡaɪst/', pos: 'noun', level: 'ELITE',
      meaning: 'The defining spirit or mood of a particular period of history as shown by ideas and beliefs.',
      urdu: 'روح عصر / زمانے کا عمومی رجحان',
      synonyms: ['Spirit of the age', 'Ethos', 'Climate of opinion', 'Trend'],
      antonyms: ['Anachronism', 'Timelessness'],
      example: 'The modern healthcare zeitgeist prioritizes evidence-based medicine and patient autonomy.',
      family: 'German: Zeit (time) + Geist (spirit)', affix: 'Origin: German'
    }
  ];

  // CONFUSING PAIRS DATASET
  const CONFUSING_PAIRS_DATA = [
    {
      id: 'cp1', pair: 'Affect vs. Effect',
      word1: 'Affect', pos1: 'Verb', def1: 'To influence or produce a change in something.', ex1: 'Lack of sleep can affect concentration.',
      word2: 'Effect', pos2: 'Noun', def2: 'The result or consequence of a change.', ex2: 'The therapeutic effect of the drug was noticeable.',
      rule: 'Remember RAVEN: Remember Affect Verb, Effect Noun.',
      testQ: 'The antibiotic had an immediate _______ on the bacterial colony.',
      options: ['affect', 'effect'], correct: 'effect'
    },
    {
      id: 'cp2', pair: 'Accept vs. Except',
      word1: 'Accept', pos1: 'Verb', def1: 'To agree to receive or undertake.', ex1: 'The candidate was honored to accept the admission offer.',
      word2: 'Except', pos2: 'Preposition', def2: 'Not including; other than.', ex2: 'All tissues were healthy except the inflamed appendix.',
      rule: 'Accept = receive with approval; Except = exclude.',
      testQ: 'Every organ was examined _______ the gall bladder.',
      options: ['accept', 'except'], correct: 'except'
    },
    {
      id: 'cp3', pair: 'Principal vs. Principle',
      word1: 'Principal', pos1: 'Noun/Adj', def1: 'Main, highest in rank, or head of an institution.', ex1: 'The principal investigator published the trial.',
      word2: 'Principle', pos2: 'Noun', def2: 'A fundamental truth, rule, or doctrine.', ex2: 'First do no harm is a cardinal principle of medical ethics.',
      rule: 'The princiPAL is your PAL / main; a princiPLE is a ruLE.',
      testQ: 'Osmosis operates on the fundamental _______ of concentration gradients.',
      options: ['principal', 'principle'], correct: 'principle'
    },
    {
      id: 'cp4', pair: 'Complement vs. Compliment',
      word1: 'Complement', pos1: 'Verb/Noun', def1: 'To complete or bring to perfection.', ex1: 'Serum complement proteins enhance phagocytosis.',
      word2: 'Compliment', pos2: 'Verb/Noun', def2: 'An expression of praise or admiration.', ex2: 'The professor gave a compliment on her surgical precision.',
      rule: 'ComplEment complEtes; ComplIment expresses "I like you".',
      testQ: 'The biochemical assay acts as a diagnostic _______ to the MRI scan.',
      options: ['complement', 'compliment'], correct: 'complement'
    },
    {
      id: 'cp5', pair: 'Stationary vs. Stationery',
      word1: 'Stationary', pos1: 'Adjective', def1: 'Not moving; staying in one place.', ex1: 'The patient remained stationary during the CT scan.',
      word2: 'Stationery', pos2: 'Noun', def2: 'Writing materials such as paper and envelopes.', ex2: 'Prescription pads are printed on official clinic stationery.',
      rule: 'StationERy has ER like papER and lettER; StationARy has AR like cAR parked.',
      testQ: 'Keep your head completely _______ while the X-ray is taken.',
      options: ['stationary', 'stationery'], correct: 'stationary'
    },
    {
      id: 'cp6', pair: 'Advice vs. Advise',
      word1: 'Advice', pos1: 'Noun', def1: 'Guidance or recommendations offered.', ex1: 'The physician offered sound lifestyle advice.',
      word2: 'Advise', pos2: 'Verb', def2: 'To offer suggestions or counsel.', ex2: 'I advise you to rest before the MDCAT examination.',
      rule: 'Advise (with s) is the action verb; Advice (with c) is the noun.',
      testQ: 'The cardiologist will _______ the patient to lower sodium intake.',
      options: ['advice', 'advise'], correct: 'advise'
    },
    {
      id: 'cp7', pair: 'Loose vs. Lose',
      word1: 'Loose', pos1: 'Adjective', def1: 'Not firmly fixed in place; not tight.', ex1: 'Wear loose clothing for the electrocardiogram.',
      word2: 'Lose', pos2: 'Verb', def2: 'To be deprived of or fail to retain.', ex2: 'Dehydrated patients rapidly lose essential electrolytes.',
      rule: 'Lose has lost an \'o\'; Loose has too much space (two o\'s).',
      testQ: 'Severe burns cause victims to _______ dangerous amounts of plasma.',
      options: ['loose', 'lose'], correct: 'lose'
    },
    {
      id: 'cp8', pair: 'Elicit vs. Illicit',
      word1: 'Elicit', pos1: 'Verb', def1: 'To draw out a response, answer, or fact.', ex1: 'The neurologist tapped the knee to elicit a patellar reflex.',
      word2: 'Illicit', pos2: 'Adjective', def2: 'Forbidden by law, rules, or custom.', ex2: 'Illicit narcotics cause severe organ toxicity.',
      rule: 'Elicit = Extract/Evoke (starts with E); Illicit = Illegal (starts with I).',
      testQ: 'The doctor asked targeted questions to _______ the pain history.',
      options: ['elicit', 'illicit'], correct: 'elicit'
    }
  ];

  // MORPHOLOGY DATASETS (PREFIXES & SUFFIXES)
  const PREFIXES_DATA = [
    { affix: 'anti-', meaning: 'Against / Opposite to', origin: 'Greek', desc: 'Used in medical terms to indicate counteracting agents.', examples: [{ word: 'Antibiotic', urdu: 'جراثیم کش دوا' }, { word: 'Antidote', urdu: 'تریاق / زہر کا توڑ' }, { word: 'Antisocial', urdu: 'معاشرہ دشمن' }] },
    { affix: 'auto-', meaning: 'Self / Same', origin: 'Greek', desc: 'Indicates automatic, independent, or self-directed action.', examples: [{ word: 'Autonomic', urdu: 'خود مختار' }, { word: 'Autoimmune', urdu: 'خود کار مدافعتی' }, { word: 'Autonomy', urdu: 'خود مختاری' }] },
    { affix: 'bio-', meaning: 'Life / Living organisms', origin: 'Greek', desc: 'Used widely in biology and medical biochemistry.', examples: [{ word: 'Biochemistry', urdu: 'حیاتیاتی کیمیا' }, { word: 'Biopsy', urdu: 'حیاتی معائنہ' }, { word: 'Biodiversity', urdu: 'حیاتیاتی تنوع' }] },
    { affix: 'contra-', meaning: 'Against / Contrary', origin: 'Latin', desc: 'Indicates opposition or contradicting conditions.', examples: [{ word: 'Contradict', urdu: 'تردید کرنا' }, { word: 'Contraindication', urdu: 'ممانعت علاج' }, { word: 'Contraceptive', urdu: 'مانع حمل' }] },
    { affix: 'hyper-', meaning: 'Excessive / Above normal', origin: 'Greek', desc: 'Denotes heightened or pathological elevation.', examples: [{ word: 'Hypertension', urdu: 'ہائی بلڈ پریشر' }, { word: 'Hyperglycemia', urdu: 'خون میں شکر کی زیادتی' }, { word: 'Hypertrophy', urdu: 'عضو کی غیر طبعی نشوونما' }] },
    { affix: 'hypo-', meaning: 'Below / Less than normal', origin: 'Greek', desc: 'Denotes deficiency or depression below normal baseline.', examples: [{ word: 'Hypothermia', urdu: 'جسم کا درجہ حرارت گر جانا' }, { word: 'Hypoglycemia', urdu: 'خون میں شکر کی کمی' }, { word: 'Hypotension', urdu: 'لو بلڈ پریشر' }] },
    { affix: 'micro-', meaning: 'Small / Microscopic', origin: 'Greek', desc: 'Refers to entities requiring magnification.', examples: [{ word: 'Microscope', urdu: 'خوردبین' }, { word: 'Microbiology', urdu: 'خورد حیاتیات' }, { word: 'Microscopic', urdu: 'نہایت باریک' }] },
    { affix: 'macro-', meaning: 'Large / On a large scale', origin: 'Greek', desc: 'Refers to gross macroscopic observation.', examples: [{ word: 'Macroscopic', urdu: 'بغیر خوردبین نظر آنے والا' }, { word: 'Macrophage', urdu: 'بڑا نگلنے والا خلیہ' }, { word: 'Macroeconomics', urdu: 'کلیاتی معاشیات' }] },
    { affix: 'pre-', meaning: 'Before / In advance', origin: 'Latin', desc: 'Denotes prior time or spatial position.', examples: [{ word: 'Preoperative', urdu: 'آپریشن سے قبل' }, { word: 'Premature', urdu: 'وقت سے پہلے' }, { word: 'Precursor', urdu: 'پیش خیمہ' }] },
    { affix: 'post-', meaning: 'After / Subsequent to', origin: 'Latin', desc: 'Denotes subsequent timeline or outcome.', examples: [{ word: 'Postoperative', urdu: 'آپریشن کے بعد' }, { word: 'Postgraduate', urdu: 'گریجویشن کے بعد' }, { word: 'Postnatal', urdu: 'پیدائش کے بعد' }] }
  ];

  const SUFFIXES_DATA = [
    { affix: '-able / -ible', meaning: 'Capable of being / Worthy of', origin: 'Latin', desc: 'Forms adjectives denoting capability or feasibility.', examples: [{ word: 'Readable', urdu: 'قابل مطالعہ' }, { word: 'Feasible', urdu: 'قابل عمل' }, { word: 'Permeable', urdu: 'نفوذ پذیر' }] },
    { affix: '-less', meaning: 'Without / Lacking', origin: 'Old English', desc: 'Forms adjectives indicating absence of a quality.', examples: [{ word: 'Painless', urdu: 'بے درد' }, { word: 'Flawless', urdu: 'بے عیب' }, { word: 'Homeless', urdu: 'بے گھر' }] },
    { affix: '-ful', meaning: 'Full of / Characterized by', origin: 'Old English', desc: 'Forms adjectives showing abundance of quality.', examples: [{ word: 'Careful', urdu: 'محتاط' }, { word: 'Harmful', urdu: 'نقصان دہ' }, { word: 'Hopeful', urdu: 'پرامید' }] },
    { affix: '-tion / -sion', meaning: 'State / Action / Process', origin: 'Latin', desc: 'Forms nouns from verbs indicating operations.', examples: [{ word: 'Education', urdu: 'تعلیم' }, { word: 'Respiration', urdu: 'تنفس کا عمل' }, { word: 'Elimination', urdu: 'اخراج' }] },
    { affix: '-ity / -ty', meaning: 'State / Quality / Condition', origin: 'Latin', desc: 'Forms abstract nouns indicating condition.', examples: [{ word: 'Activity', urdu: 'سرگرمی' }, { word: 'Purity', urdu: 'خلوص / پاکیزگی' }, { word: 'Flexibility', urdu: 'لچک' }] },
    { affix: '-ous / -ious', meaning: 'Full of / Possessing quality', origin: 'Latin', desc: 'Forms descriptive adjectives.', examples: [{ word: 'Pernicious', urdu: 'تباہ کن' }, { word: 'Meticulous', urdu: 'باریک بین' }, { word: 'Dangerous', urdu: 'خطرناک' }] }
  ];

  // WORD FAMILIES DATASET
  const WORD_FAMILIES_DATA = [
    {
      root: 'CREATE',
      derivatives: [
        { word: 'Create', pos: 'Verb', def: 'To bring something into existence.' },
        { word: 'Creation', pos: 'Noun', def: 'The act or result of creating.' },
        { word: 'Creative', pos: 'Adjective', def: 'Having the ability to produce original ideas.' },
        { word: 'Creativity', pos: 'Noun', def: 'The capacity for creative thought.' },
        { word: 'Creatively', pos: 'Adverb', def: 'In an imaginative and innovative manner.' }
      ]
    },
    {
      root: 'DECIDE',
      derivatives: [
        { word: 'Decide', pos: 'Verb', def: 'To make a choice from a number of alternatives.' },
        { word: 'Decision', pos: 'Noun', def: 'A conclusion or resolution reached after consideration.' },
        { word: 'Decisive', pos: 'Adjective', def: 'Settling an issue; producing a definite result.' },
        { word: 'Indecisive', pos: 'Adjective', def: 'Unable to make decisions firmly.' },
        { word: 'Decisively', pos: 'Adverb', def: 'In a manner that settles an issue conclusively.' }
      ]
    },
    {
      root: 'PERCEIVE',
      derivatives: [
        { word: 'Perceive', pos: 'Verb', def: 'To become aware or conscious of something via senses.' },
        { word: 'Perception', pos: 'Noun', def: 'The ability to see, hear, or understand through the senses.' },
        { word: 'Perceptive', pos: 'Adjective', def: 'Having sensitive insight and quick understanding.' },
        { word: 'Perceptibly', pos: 'Adverb', def: 'In a noticeable or distinguishable way.' }
      ]
    },
    {
      root: 'CONCLUDE',
      derivatives: [
        { word: 'Conclude', pos: 'Verb', def: 'To bring something to an end or arrive at a judgment.' },
        { word: 'Conclusion', pos: 'Noun', def: 'The final proposition or outcome deduced.' },
        { word: 'Conclusive', pos: 'Adjective', def: 'Serving to prove a case decisively; indisputable.' },
        { word: 'Conclusively', pos: 'Adverb', def: 'In a manner not open to doubt or question.' }
      ]
    }
  ];

  // SYNONYM CHAINS DATASET
  const SYNONYM_CHAINS_DATA = [
    {
      theme: 'Emotional Intensity (Happiness & Triumph)',
      title: 'The Spectrum of Joy',
      nodes: [
        { word: 'Glad', rank: 'Mild / Common', note: 'Everyday satisfaction' },
        { word: 'Joyful', rank: 'Moderate', note: 'Deep positive warmth' },
        { word: 'Delighted', rank: 'High', note: 'Great pleasure' },
        { word: 'Jubilant', rank: 'Academic', note: 'Triumphant celebration' },
        { word: 'Ecstatic', rank: 'Extreme', note: 'Overwhelming intense delight' }
      ]
    },
    {
      theme: 'Significance & Priority in Passages',
      title: 'Degrees of Importance',
      nodes: [
        { word: 'Notable', rank: 'Noticeable', note: 'Worthy of remark' },
        { word: 'Significant', rank: 'Statistical', note: 'Meaningfully large' },
        { word: 'Substantial', rank: 'Weighty', note: 'Of major size or worth' },
        { word: 'Crucial', rank: 'Decisive', note: 'Critical to the outcome' },
        { word: 'Paramount', rank: 'Supreme', note: 'Above all other matters' }
      ]
    },
    {
      theme: 'Difficulty & Cognitive Challenge',
      title: 'Levels of Hardship',
      nodes: [
        { word: 'Hard', rank: 'Simple', note: 'Requiring effort' },
        { word: 'Arduous', rank: 'Physical/Strenuous', note: 'Tiring and demanding' },
        { word: 'Formidable', rank: 'Intimidating', note: 'Inspiring awe or fear' },
        { word: 'Daunting', rank: 'Psychological', note: 'Seeming nearly impossible' }
      ]
    }
  ];

  // ---------------------------------------------------------
  // 2. STATE MANAGEMENT (LocalStorage)
  // ---------------------------------------------------------
  const STORAGE_KEY = 'MDCAT_VOCAB_STATE_V1';

  let appState = {
    learned: {},      // { id: true }
    mastered: {},     // { id: true }
    bookmarked: {},   // { id: true }
    reviewQueue: {},  // { id: true }
    quizScores: {
      totalAnswered: 0,
      totalCorrect: 0,
      highScore: 0
    },
    activeTab: 'explorer',
    filterLevel: 'ALL',
    filterStatus: 'ALL',
    filterPos: 'ALL',
    filterSort: 'A-Z',
    searchQuery: '',
    soundEnabled: true
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        appState = Object.assign({}, appState, parsed);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    updateDashboardStats();
  }

  // ---------------------------------------------------------
  // 3. AUDIO SYNTHESIS & TOASTS
  // ---------------------------------------------------------
  function speakWord(text) {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech error', e);
    }
  }

  function showToast(message, icon) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="fa-solid ${icon || 'fa-circle-info'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(function () { toast.remove(); }, 300);
    }, 2400);
  }

  // ---------------------------------------------------------
  // 4. UI DASHBOARD & PROGRESS
  // ---------------------------------------------------------
  function updateDashboardStats() {
    const totalWords = VOCABULARY_DATA.length;
    const learnedCount = Object.keys(appState.learned).length;
    const masteredCount = Object.keys(appState.mastered).length;
    const bookmarkedCount = Object.keys(appState.bookmarked).length;
    const reviewCount = Object.keys(appState.reviewQueue).length;

    const percentage = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

    // Header updates
    const hLearned = document.getElementById('header-learned-count');
    const hTotal = document.getElementById('header-total-count');
    if (hLearned) hLearned.textContent = learnedCount;
    if (hTotal) hTotal.textContent = totalWords;

    const bBadge = document.getElementById('bookmark-badge');
    const rBadge = document.getElementById('review-badge');
    const tBadge = document.getElementById('tab-queue-count');
    if (bBadge) bBadge.textContent = bookmarkedCount;
    if (rBadge) rBadge.textContent = reviewCount;
    if (tBadge) tBadge.textContent = reviewCount;

    // Dashboard Panel updates
    const dLearned = document.getElementById('dash-learned-num');
    const dMastered = document.getElementById('dash-mastered-num');
    const dBookmark = document.getElementById('dash-bookmarked-num');
    const dReview = document.getElementById('dash-review-num');
    const dPercent = document.getElementById('overall-percentage-text');
    const dFill = document.getElementById('overall-progress-fill');
    const dFraction = document.getElementById('progress-words-fraction');

    if (dLearned) dLearned.textContent = learnedCount;
    if (dMastered) dMastered.textContent = masteredCount;
    if (dBookmark) dBookmark.textContent = bookmarkedCount;
    if (dReview) dReview.textContent = reviewCount;
    if (dPercent) dPercent.textContent = percentage + '%';
    if (dFill) dFill.style.width = percentage + '%';
    if (dFraction) dFraction.textContent = `${learnedCount} / ${totalWords} Words Completed`;

    // Level Cards breakdown
    ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'ELITE'].forEach(function (lvl) {
      const lvlWords = VOCABULARY_DATA.filter(w => w.level === lvl);
      const lvlLearned = lvlWords.filter(w => appState.learned[w.id]).length;
      const lvlPct = lvlWords.length > 0 ? Math.round((lvlLearned / lvlWords.length) * 100) : 0;

      const countEl = document.getElementById(`count-level-${lvl.toLowerCase()}`);
      const pctEl = document.getElementById(`percent-level-${lvl.toLowerCase()}`);
      const fillEl = document.getElementById(`progress-fill-${lvl.toLowerCase()}`);
      const pillEl = document.getElementById(`pill-count-${lvl.toLowerCase()}`);

      if (countEl) countEl.textContent = `${lvlWords.length} Words`;
      if (pctEl) pctEl.textContent = `${lvlPct}%`;
      if (fillEl) fillEl.style.width = `${lvlPct}%`;
      if (pillEl) pillEl.textContent = lvlWords.length;
    });

    const pillAll = document.getElementById('pill-count-all');
    if (pillAll) pillAll.textContent = totalWords;
  }

  // ---------------------------------------------------------
  // 5. WORD OF THE DAY
  // ---------------------------------------------------------
  function initWordOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const wotdIndex = dayOfYear % VOCABULARY_DATA.length;
    const wotd = VOCABULARY_DATA[wotdIndex] || VOCABULARY_DATA[0];

    const dateDisplay = document.getElementById('wotd-date-display');
    if (dateDisplay) {
      dateDisplay.textContent = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const titleEl = document.getElementById('wotd-word-title');
    const phonEl = document.getElementById('wotd-pronunciation');
    const posEl = document.getElementById('wotd-pos');
    const lvlEl = document.getElementById('wotd-level-badge');
    const engEl = document.getElementById('wotd-english-def');
    const urduEl = document.getElementById('wotd-urdu-def');
    const synList = document.getElementById('wotd-synonyms-list');
    const exEl = document.getElementById('wotd-example-text');

    if (titleEl) titleEl.textContent = wotd.word;
    if (phonEl) phonEl.textContent = wotd.phonetic;
    if (posEl) posEl.textContent = wotd.pos;
    if (engEl) engEl.textContent = wotd.meaning;
    if (urduEl) urduEl.textContent = wotd.urdu;
    if (exEl) exEl.innerHTML = wotd.example.replace(new RegExp(wotd.word, 'gi'), `<strong>$&</strong>`);

    if (lvlEl) {
      lvlEl.className = `level-badge badge-${wotd.level.toLowerCase()}`;
      lvlEl.textContent = wotd.level;
    }

    if (synList) {
      synList.innerHTML = wotd.synonyms.map(s => `<span class="tag-synonym">${s}</span>`).join('');
    }

    // Buttons
    const audioBtn = document.getElementById('wotd-audio-btn');
    if (audioBtn) audioBtn.onclick = function () { speakWord(wotd.word); };

    const addBtn = document.getElementById('wotd-add-btn');
    if (addBtn) {
      addBtn.onclick = function () {
        appState.learned[wotd.id] = true;
        saveState();
        showToast(`Added "${wotd.word}" to Learned Words!`, 'fa-circle-check');
      };
    }

    const bmBtn = document.getElementById('wotd-bookmark-btn');
    if (bmBtn) {
      bmBtn.onclick = function () {
        toggleBookmark(wotd.id);
      };
    }

    const pracBtn = document.getElementById('wotd-practice-btn');
    if (pracBtn) {
      pracBtn.onclick = function () {
        openWordModal(wotd.id);
      };
    }
  }

  // ---------------------------------------------------------
  // 6. WORD EXPLORER (FILTERING & RENDERING)
  // ---------------------------------------------------------
  function getFilteredWords() {
    return VOCABULARY_DATA.filter(function (item) {
      // Level filter
      if (appState.filterLevel !== 'ALL' && item.level !== appState.filterLevel) return false;

      // Status filter
      if (appState.filterStatus === 'LEARNED' && !appState.learned[item.id]) return false;
      if (appState.filterStatus === 'UNLEARNED' && appState.learned[item.id]) return false;
      if (appState.filterStatus === 'BOOKMARKED' && !appState.bookmarked[item.id]) return false;
      if (appState.filterStatus === 'REVIEW' && !appState.reviewQueue[item.id]) return false;

      // Part of speech filter
      if (appState.filterPos !== 'ALL' && item.pos.toLowerCase() !== appState.filterPos.toLowerCase()) return false;

      // Search query (checks word, English definition, Urdu, synonyms, antonyms)
      if (appState.searchQuery.trim() !== '') {
        const q = appState.searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchEng = item.meaning.toLowerCase().includes(q);
        const matchUrdu = item.urdu.includes(q);
        const matchSyn = item.synonyms.some(s => s.toLowerCase().includes(q));
        const matchAnt = item.antonyms.some(a => a.toLowerCase().includes(q));
        if (!matchWord && !matchEng && !matchUrdu && !matchSyn && !matchAnt) return false;
      }

      return true;
    }).sort(function (a, b) {
      if (appState.filterSort === 'A-Z') return a.word.localeCompare(b.word);
      if (appState.filterSort === 'Z-A') return b.word.localeCompare(a.word);
      const levelRank = { BASIC: 1, INTERMEDIATE: 2, ADVANCED: 3, ELITE: 4 };
      if (appState.filterSort === 'LEVEL-ASC') return levelRank[a.level] - levelRank[b.level];
      if (appState.filterSort === 'LEVEL-DESC') return levelRank[b.level] - levelRank[a.level];
      return 0;
    });
  }

  function renderWordCardHTML(item) {
    const isLearned = !!appState.learned[item.id];
    const isBookmarked = !!appState.bookmarked[item.id];
    const inQueue = !!appState.reviewQueue[item.id];

    return `
      <article class="word-card" id="card-${item.id}">
        <div class="word-card-top">
          <div class="word-card-main-title">
            <h3 class="word-title">${item.word}</h3>
            <button class="btn-audio-circle btn-sm" onclick="window.MDCAT.speak('${item.word}')" title="Pronounce">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <span class="word-phonetic">${item.phonetic}</span>
            <span class="pos-tag">${item.pos}</span>
          </div>
          <div class="word-card-actions-quick">
            <button class="btn-card-action ${isBookmarked ? 'bookmarked' : ''}" onclick="window.MDCAT.toggleBookmark('${item.id}')" title="Bookmark">
              <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
            <button class="btn-card-action ${inQueue ? 'in-queue' : ''}" onclick="window.MDCAT.toggleReviewQueue('${item.id}')" title="Review Queue">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>

        <div class="word-card-meanings">
          <p class="word-eng-def">${item.meaning}</p>
          <p class="word-urdu-def">${item.urdu}</p>
        </div>

        <div class="word-syn-ant-block">
          <div><span class="synonyms-label">Synonyms:</span> ${item.synonyms.map(s => `<span class="synonym-chip" onclick="window.MDCAT.searchFor('${s}')">${s}</span>`).join('')}</div>
          <div class="mt-1"><span class="antonyms-label">Antonyms:</span> ${item.antonyms.map(a => `<span class="antonym-chip">${a}</span>`).join('')}</div>
        </div>

        <div class="word-card-example">
          "${item.example}"
        </div>

        <div class="word-card-footer">
          <span class="level-badge badge-${item.level.toLowerCase()}">${item.level}</span>
          <div style="display: flex; gap: 6px;">
            <button class="btn-outline btn-sm" onclick="window.MDCAT.openModal('${item.id}')">
              <i class="fa-solid fa-expand"></i> Details
            </button>
            <button class="btn-${isLearned ? 'primary' : 'outline'} btn-sm" onclick="window.MDCAT.toggleLearned('${item.id}')">
              <i class="fa-solid fa-${isLearned ? 'check-double' : 'check'}"></i> ${isLearned ? 'Learned' : 'Mark Learned'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderExplorerGrid() {
    const container = document.getElementById('word-cards-container');
    const emptyState = document.getElementById('empty-state-display');
    const countDisplay = document.getElementById('results-count-display');
    if (!container) return;

    const filtered = getFilteredWords();

    if (countDisplay) {
      countDisplay.innerHTML = `<i class="fa-solid fa-list-check"></i> Showing <strong>${filtered.length}</strong> ${filtered.length === 1 ? 'word' : 'words'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      container.innerHTML = filtered.map(renderWordCardHTML).join('');
    }
  }

  // ---------------------------------------------------------
  // 7. FLASHCARD ENGINE
  // ---------------------------------------------------------
  let flashcardDeck = [];
  let flashcardIndex = 0;
  let isCardFlipped = false;

  function initFlashcardDeck(filterType) {
    const type = filterType || 'ALL';
    if (type === 'ALL') {
      flashcardDeck = [...VOCABULARY_DATA];
    } else if (type === 'BOOKMARKED') {
      flashcardDeck = VOCABULARY_DATA.filter(w => appState.bookmarked[w.id]);
    } else if (type === 'REVIEW') {
      flashcardDeck = VOCABULARY_DATA.filter(w => appState.reviewQueue[w.id]);
    } else {
      flashcardDeck = VOCABULARY_DATA.filter(w => w.level === type);
    }

    if (flashcardDeck.length === 0) {
      flashcardDeck = [...VOCABULARY_DATA]; // fallback
    }

    flashcardIndex = 0;
    isCardFlipped = false;
    renderCurrentFlashcard();
  }

  function renderCurrentFlashcard() {
    const cardWrapper = document.getElementById('flashcard-element');
    const curIdxEl = document.getElementById('fc-current-index');
    const totCountEl = document.getElementById('fc-total-count');

    if (!cardWrapper || flashcardDeck.length === 0) return;

    if (cardWrapper.classList.contains('flipped')) {
      cardWrapper.classList.remove('flipped');
      isCardFlipped = false;
    }

    const word = flashcardDeck[flashcardIndex];

    if (curIdxEl) curIdxEl.textContent = flashcardIndex + 1;
    if (totCountEl) totCountEl.textContent = flashcardDeck.length;

    // Front elements
    const fWord = document.getElementById('fc-front-word');
    const fPhon = document.getElementById('fc-front-phonetic');
    const fPos = document.getElementById('fc-front-pos');
    const fLvl = document.getElementById('fc-front-level');
    const fBm = document.getElementById('fc-front-bookmark');

    if (fWord) fWord.textContent = word.word;
    if (fPhon) fPhon.textContent = word.phonetic;
    if (fPos) fPos.textContent = word.pos;
    if (fLvl) {
      fLvl.className = `level-badge badge-${word.level.toLowerCase()}`;
      fLvl.textContent = word.level;
    }
    if (fBm) {
      fBm.innerHTML = `<i class="fa-${appState.bookmarked[word.id] ? 'solid' : 'regular'} fa-bookmark"></i>`;
      fBm.onclick = function (e) {
        e.stopPropagation();
        toggleBookmark(word.id);
        fBm.innerHTML = `<i class="fa-${appState.bookmarked[word.id] ? 'solid' : 'regular'} fa-bookmark"></i>`;
      };
    }

    const fAudio = document.getElementById('fc-front-audio');
    if (fAudio) {
      fAudio.onclick = function (e) {
        e.stopPropagation();
        speakWord(word.word);
      };
    }

    // Back elements
    const bMini = document.getElementById('fc-back-word-mini');
    const bLvl = document.getElementById('fc-back-level');
    const bMean = document.getElementById('fc-back-meaning');
    const bUrdu = document.getElementById('fc-back-urdu');
    const bSyn = document.getElementById('fc-back-synonyms');
    const bAnt = document.getElementById('fc-back-antonyms');
    const bEx = document.getElementById('fc-back-example');

    if (bMini) bMini.textContent = word.word;
    if (bLvl) {
      bLvl.className = `level-badge badge-${word.level.toLowerCase()}`;
      bLvl.textContent = word.level;
    }
    if (bMean) bMean.textContent = word.meaning;
    if (bUrdu) bUrdu.textContent = word.urdu;
    if (bSyn) bSyn.textContent = word.synonyms.join(', ');
    if (bAnt) bAnt.textContent = word.antonyms.join(', ');
    if (bEx) bEx.textContent = word.example;
  }

  function flipFlashcard() {
    const card = document.getElementById('flashcard-element');
    if (!card) return;
    card.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;
  }

  function nextFlashcard() {
    if (flashcardDeck.length === 0) return;
    flashcardIndex = (flashcardIndex + 1) % flashcardDeck.length;
    renderCurrentFlashcard();
  }

  function prevFlashcard() {
    if (flashcardDeck.length === 0) return;
    flashcardIndex = (flashcardIndex - 1 + flashcardDeck.length) % flashcardDeck.length;
    renderCurrentFlashcard();
  }

  function shuffleFlashcards() {
    for (let i = flashcardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = flashcardDeck[i];
      flashcardDeck[i] = flashcardDeck[j];
      flashcardDeck[j] = temp;
    }
    flashcardIndex = 0;
    renderCurrentFlashcard();
    showToast('Flashcard deck shuffled!', 'fa-shuffle');
  }

  // ---------------------------------------------------------
  // 8. PRACTICE QUIZ ENGINE
  // ---------------------------------------------------------
  let quizQuestions = [];
  let currentQuizIndex = 0;
  let quizScore = 0;
  let missedWords = [];
  let userQuizAnswers = [];

  function generateQuiz(level, count) {
    let pool = VOCABULARY_DATA;
    if (level !== 'ALL') {
      pool = VOCABULARY_DATA.filter(w => w.level === level);
    }
    if (pool.length < 4) pool = VOCABULARY_DATA;

    // Shuffle pool
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const totalQ = Math.min(count, shuffledPool.length);
    const selected = shuffledPool.slice(0, totalQ);

    quizQuestions = selected.map(function (targetWord) {
      // Pick question type randomly: 'SYNONYM', 'ANTONYM', 'DEFINITION', 'CONTEXT'
      const types = ['SYNONYM', 'ANTONYM', 'DEFINITION', 'CONTEXT'];
      const qType = types[Math.floor(Math.random() * types.length)];

      let instruction = '';
      let correctAnswer = '';
      let options = [];

      // Generate distractors
      const otherWords = VOCABULARY_DATA.filter(w => w.id !== targetWord.id).sort(() => 0.5 - Math.random());

      if (qType === 'SYNONYM') {
        instruction = `Choose the word most nearly SYNONYMOUS with:`;
        correctAnswer = targetWord.synonyms[0] || targetWord.word;
        const dists = otherWords.slice(0, 3).map(w => w.synonyms[0] || w.word);
        options = [correctAnswer, ...dists].sort(() => 0.5 - Math.random());
      } else if (qType === 'ANTONYM') {
        instruction = `Choose the word most nearly OPPOSITE (Antonym) to:`;
        correctAnswer = targetWord.antonyms[0] || 'Opposite';
        const dists = otherWords.slice(0, 3).map(w => w.antonyms[0] || w.word);
        options = [correctAnswer, ...dists].sort(() => 0.5 - Math.random());
      } else if (qType === 'CONTEXT') {
        instruction = `Fill in the blank with the most contextually appropriate word:`;
        correctAnswer = targetWord.word;
        const dists = otherWords.slice(0, 3).map(w => w.word);
        options = [correctAnswer, ...dists].sort(() => 0.5 - Math.random());
      } else {
        instruction = `Identify the exact definition for:`;
        correctAnswer = targetWord.meaning;
        const dists = otherWords.slice(0, 3).map(w => w.meaning);
        options = [correctAnswer, ...dists].sort(() => 0.5 - Math.random());
      }

      return {
        target: targetWord,
        type: qType,
        instruction: instruction,
        options: options,
        correct: correctAnswer,
        sentence: targetWord.example.replace(new RegExp(targetWord.word, 'gi'), '__________')
      };
    });

    currentQuizIndex = 0;
    quizScore = 0;
    missedWords = [];
    userQuizAnswers = [];
  }

  function startQuizUI() {
    const levelRadio = document.querySelector('input[name="quiz-level"]:checked');
    const countRadio = document.querySelector('input[name="quiz-count"]:checked');
    const lvl = levelRadio ? levelRadio.value : 'ALL';
    const cnt = countRadio ? parseInt(countRadio.value, 10) : 10;

    generateQuiz(lvl, cnt);

    document.getElementById('quiz-setup-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').style.display = 'none';
    document.getElementById('active-quiz-screen').style.display = 'block';

    renderCurrentQuizQuestion();
  }

  function renderCurrentQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
      showQuizResults();
      return;
    }

    const q = quizQuestions[currentQuizIndex];
    const total = quizQuestions.length;

    // Header & Meta
    document.getElementById('quiz-question-badge').textContent = `Question ${currentQuizIndex + 1} of ${total}`;
    document.getElementById('quiz-question-level').textContent = q.target.level;
    document.getElementById('quiz-question-level').className = `level-badge badge-${q.target.level.toLowerCase()}`;
    document.getElementById('quiz-question-type').textContent = q.type;
    document.getElementById('quiz-current-score').textContent = quizScore;
    document.getElementById('quiz-answered-count').textContent = currentQuizIndex;

    const progressPct = ((currentQuizIndex) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progressPct}%`;

    // Prompt
    document.getElementById('quiz-instruction-text').textContent = q.instruction;
    const wordEl = document.getElementById('quiz-target-word');
    const contextEl = document.getElementById('quiz-context-sentence');

    if (q.type === 'CONTEXT') {
      wordEl.textContent = `[ Context Clue Drill ]`;
      contextEl.style.display = 'block';
      contextEl.textContent = `"${q.sentence}"`;
    } else {
      wordEl.textContent = q.target.word;
      contextEl.style.display = 'none';
    }

    // Hide feedback & Next button
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const nextBtn = document.getElementById('btn-quiz-next');
    feedbackBox.style.display = 'none';
    nextBtn.style.display = 'none';

    // Render Options
    const optContainer = document.getElementById('quiz-options-container');
    optContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach(function (optText, idx) {
      const card = document.createElement('button');
      card.className = 'quiz-option-card';
      card.innerHTML = `
        <span class="quiz-option-letter">${letters[idx]}</span>
        <span class="quiz-option-text">${optText}</span>
      `;
      card.onclick = function () { handleQuizSelection(optText, card); };
      optContainer.appendChild(card);
    });
  }

  function handleQuizSelection(selectedOption, selectedCard) {
    const q = quizQuestions[currentQuizIndex];
    const optCards = document.querySelectorAll('.quiz-option-card');
    optCards.forEach(c => { c.disabled = true; c.classList.add('disabled'); });

    const isCorrect = selectedOption === q.correct;
    if (isCorrect) {
      quizScore++;
      selectedCard.classList.add('correct');
    } else {
      selectedCard.classList.add('wrong');
      missedWords.push(q.target);
      // Highlight correct card
      optCards.forEach(c => {
        if (c.querySelector('.quiz-option-text').textContent === q.correct) {
          c.classList.add('correct');
        }
      });
    }

    // Save history stats
    appState.quizScores.totalAnswered++;
    if (isCorrect) appState.quizScores.totalCorrect++;
    saveState();

    // Show Feedback Box
    const fbBox = document.getElementById('quiz-feedback-box');
    const fbIcon = document.getElementById('feedback-icon');
    const fbTitle = document.getElementById('feedback-title');
    const fbDetail = document.getElementById('feedback-explanation');
    const fbUrdu = document.getElementById('fb-urdu-meaning');
    const fbSyn = document.getElementById('fb-synonyms');

    fbBox.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
    fbBox.style.display = 'block';

    if (isCorrect) {
      fbIcon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
      fbTitle.textContent = 'Correct Answer!';
      fbDetail.textContent = `Well done. "${q.target.word}" means "${q.target.meaning}".`;
    } else {
      fbIcon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
      fbTitle.textContent = 'Incorrect!';
      fbDetail.textContent = `Correct answer was "${q.correct}". "${q.target.word}" means "${q.target.meaning}".`;
    }

    fbUrdu.textContent = q.target.urdu;
    fbSyn.textContent = q.target.synonyms.join(', ');

    // Reveal Next Button
    const nextBtn = document.getElementById('btn-quiz-next');
    nextBtn.style.display = 'inline-flex';
  }

  function showQuizResults() {
    document.getElementById('active-quiz-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').style.display = 'block';

    const total = quizQuestions.length;
    const percentage = Math.round((quizScore / total) * 100);

    document.getElementById('result-final-percentage').textContent = `${percentage}%`;
    document.getElementById('result-score-ratio').textContent = `${quizScore} out of ${total} Correct`;
    document.getElementById('res-correct-count').textContent = quizScore;
    document.getElementById('res-wrong-count').textContent = total - quizScore;
    document.getElementById('res-accuracy-rate').textContent = `${percentage}%`;

    const missedSection = document.getElementById('missed-questions-section');
    const missedList = document.getElementById('missed-cards-list');

    if (missedWords.length > 0) {
      missedSection.style.display = 'block';
      missedList.innerHTML = missedWords.map(w => `
        <div class="missed-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <strong>${w.word} (${w.pos})</strong>
            <span class="level-badge badge-${w.level.toLowerCase()}">${w.level}</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;"><strong>Meaning:</strong> ${w.meaning}</p>
          <p style="font-size: 0.95rem; font-family: 'Noto Nastaliq Urdu'; color: var(--color-primary);">${w.urdu}</p>
        </div>
      `).join('');
    } else {
      missedSection.style.display = 'none';
    }
  }

  // ---------------------------------------------------------
  // 9. CONFUSING PAIRS RENDERING
  // ---------------------------------------------------------
  function renderConfusingPairs(filterQuery) {
    const container = document.getElementById('confusing-pairs-container');
    if (!container) return;

    const filtered = CONFUSING_PAIRS_DATA.filter(function (p) {
      if (!filterQuery) return true;
      const q = filterQuery.toLowerCase();
      return p.pair.toLowerCase().includes(q) || p.word1.toLowerCase().includes(q) || p.word2.toLowerCase().includes(q);
    });

    container.innerHTML = filtered.map(function (p) {
      return `
        <article class="confusing-card">
          <div class="confusing-header">
            <h3 class="confusing-pair-title">${p.pair}</h3>
            <span class="confusing-vs-badge">MDCAT PAIR</span>
          </div>
          <div class="confusing-split-grid">
            <div class="confusing-word-col">
              <h4 class="confusing-word-name">${p.word1} <small>(${p.pos1})</small></h4>
              <p class="confusing-def">${p.def1}</p>
              <p class="confusing-example">"${p.ex1}"</p>
            </div>
            <div class="confusing-word-col">
              <h4 class="confusing-word-name">${p.word2} <small>(${p.pos2})</small></h4>
              <p class="confusing-def">${p.def2}</p>
              <p class="confusing-example">"${p.ex2}"</p>
            </div>
          </div>
          <div class="confusing-rule-box">
            <i class="fa-solid fa-lightbulb"></i> <strong>Memory Rule:</strong> ${p.rule}
          </div>
          <div class="confusing-quiz-mini" id="mini-q-${p.id}">
            <p class="mini-q-text"><i class="fa-solid fa-circle-question"></i> Mini Test: ${p.testQ}</p>
            <div class="mini-q-options">
              ${p.options.map(opt => `<button class="btn-mini-opt" onclick="window.MDCAT.answerMiniQ('${p.id}', '${opt}', '${p.correct}')">${opt}</button>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ---------------------------------------------------------
  // 10. MORPHOLOGY, WORD FAMILIES, & SYNONYM CHAINS
  // ---------------------------------------------------------
  function renderMorphology() {
    const prefGrid = document.getElementById('prefixes-cards-grid');
    const suffGrid = document.getElementById('suffixes-cards-grid');

    if (prefGrid) {
      prefGrid.innerHTML = PREFIXES_DATA.map(p => `
        <div class="affix-card">
          <div class="affix-head">
            <h4 class="affix-title">${p.affix}</h4>
            <span class="affix-meaning-pill">${p.meaning}</span>
          </div>
          <p class="affix-desc">${p.desc}</p>
          <div class="affix-examples-list">
            ${p.examples.map(ex => `
              <div class="affix-example-item">
                <strong>${ex.word}</strong>
                <span class="affix-urdu">${ex.urdu}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    if (suffGrid) {
      suffGrid.innerHTML = SUFFIXES_DATA.map(s => `
        <div class="affix-card">
          <div class="affix-head">
            <h4 class="affix-title">${s.affix}</h4>
            <span class="affix-meaning-pill">${s.meaning}</span>
          </div>
          <p class="affix-desc">${s.desc}</p>
          <div class="affix-examples-list">
            ${s.examples.map(ex => `
              <div class="affix-example-item">
                <strong>${ex.word}</strong>
                <span class="affix-urdu">${ex.urdu}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  function renderWordFamilies() {
    const container = document.getElementById('word-families-container');
    if (!container) return;

    container.innerHTML = WORD_FAMILIES_DATA.map(f => `
      <div class="family-card">
        <h3 class="family-card-root"><i class="fa-solid fa-seedling"></i> ROOT: ${f.root}</h3>
        <div class="family-deriv-list">
          ${f.derivatives.map(d => `
            <div class="family-deriv-item">
              <div>
                <strong>${d.word}</strong>
                <span class="deriv-pos">${d.pos}</span>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${d.def}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderSynonymChains() {
    const container = document.getElementById('synonym-chains-container');
    if (!container) return;

    container.innerHTML = SYNONYM_CHAINS_DATA.map(c => `
      <div class="chain-card">
        <h3 class="chain-title">${c.title}</h3>
        <p class="chain-theme">${c.theme}</p>
        <div class="chain-ladder">
          ${c.nodes.map((n, i) => `
            <div class="chain-node">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="chain-node-arrow">${i === 0 ? '▶' : '➔'}</span>
                <strong>${n.word}</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">(${n.note})</span>
              </div>
              <span class="chain-intensity-badge">${n.rank}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ---------------------------------------------------------
  // 11. REVIEW QUEUE & MODAL
  // ---------------------------------------------------------
  function renderReviewQueueGrid() {
    const container = document.getElementById('queue-cards-container');
    const emptyState = document.getElementById('queue-empty-state');
    if (!container) return;

    const queueWords = VOCABULARY_DATA.filter(w => appState.reviewQueue[w.id]);

    if (queueWords.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      container.innerHTML = queueWords.map(renderWordCardHTML).join('');
    }
  }

  function openWordModal(wordId) {
    const modal = document.getElementById('word-detail-modal');
    const word = VOCABULARY_DATA.find(w => w.id === wordId);
    if (!modal || !word) return;

    document.getElementById('modal-word-title').textContent = word.word;
    document.getElementById('modal-phonetic').textContent = word.phonetic;
    document.getElementById('modal-pos').textContent = word.pos;
    document.getElementById('modal-eng-def').textContent = word.meaning;
    document.getElementById('modal-urdu-def').textContent = word.urdu;
    document.getElementById('modal-example-text').textContent = `"${word.example}"`;
    document.getElementById('modal-extra-text').textContent = `${word.family} | ${word.affix}`;

    const lvlEl = document.getElementById('modal-level-badge');
    lvlEl.className = `level-badge badge-${word.level.toLowerCase()}`;
    lvlEl.textContent = word.level;

    const synList = document.getElementById('modal-synonyms-list');
    synList.innerHTML = word.synonyms.map(s => `<span class="tag-synonym">${s}</span>`).join('');

    const antList = document.getElementById('modal-antonyms-list');
    antList.innerHTML = word.antonyms.map(a => `<span class="antonym-chip">${a}</span>`).join('');

    const audioBtn = document.getElementById('modal-audio-btn');
    audioBtn.onclick = function () { speakWord(word.word); };

    const bmBtn = document.getElementById('modal-btn-bookmark');
    bmBtn.innerHTML = `<i class="fa-${appState.bookmarked[word.id] ? 'solid' : 'regular'} fa-bookmark"></i> ${appState.bookmarked[word.id] ? 'Bookmarked' : 'Bookmark'}`;
    bmBtn.onclick = function () {
      toggleBookmark(word.id);
      bmBtn.innerHTML = `<i class="fa-${appState.bookmarked[word.id] ? 'solid' : 'regular'} fa-bookmark"></i> ${appState.bookmarked[word.id] ? 'Bookmarked' : 'Bookmark'}`;
    };

    const qBtn = document.getElementById('modal-btn-queue');
    qBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> ${appState.reviewQueue[word.id] ? 'In Review Queue' : 'Add to Review Queue'}`;
    qBtn.onclick = function () {
      toggleReviewQueue(word.id);
      qBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> ${appState.reviewQueue[word.id] ? 'In Review Queue' : 'Add to Review Queue'}`;
    };

    const lBtn = document.getElementById('modal-btn-learn');
    lBtn.innerHTML = `<i class="fa-solid fa-${appState.learned[word.id] ? 'check-double' : 'check'}"></i> ${appState.learned[word.id] ? 'Learned' : 'Mark as Learned'}`;
    lBtn.onclick = function () {
      toggleLearned(word.id);
      lBtn.innerHTML = `<i class="fa-solid fa-${appState.learned[word.id] ? 'check-double' : 'check'}"></i> ${appState.learned[word.id] ? 'Learned' : 'Mark as Learned'}`;
    };

    modal.showModal();
  }

  function closeModal() {
    const modal = document.getElementById('word-detail-modal');
    if (modal) modal.close();
  }

  // ---------------------------------------------------------
  // 12. PUBLIC ACTIONS / EXPORTS
  // ---------------------------------------------------------
  function toggleLearned(id) {
    if (appState.learned[id]) {
      delete appState.learned[id];
      showToast('Word unmarked as learned', 'fa-rotate-left');
    } else {
      appState.learned[id] = true;
      showToast('Marked as Learned!', 'fa-circle-check');
    }
    saveState();
    renderExplorerGrid();
    renderReviewQueueGrid();
  }

  function toggleBookmark(id) {
    if (appState.bookmarked[id]) {
      delete appState.bookmarked[id];
      showToast('Removed from bookmarks', 'fa-bookmark');
    } else {
      appState.bookmarked[id] = true;
      showToast('Added to bookmarks!', 'fa-bookmark');
    }
    saveState();
    renderExplorerGrid();
    renderReviewQueueGrid();
  }

  function toggleReviewQueue(id) {
    if (appState.reviewQueue[id]) {
      delete appState.reviewQueue[id];
      showToast('Removed from review queue', 'fa-circle-check');
    } else {
      appState.reviewQueue[id] = true;
      showToast('Added to Review Queue!', 'fa-rotate-left');
    }
    saveState();
    renderExplorerGrid();
    renderReviewQueueGrid();
  }

  function switchTab(tabId) {
    appState.activeTab = tabId;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `pane-${tabId}`);
    });

    if (tabId === 'explorer') renderExplorerGrid();
    if (tabId === 'flashcards') initFlashcardDeck(appState.filterLevel);
    if (tabId === 'confusing') renderConfusingPairs();
    if (tabId === 'queue') renderReviewQueueGrid();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------------------------------------------------------
  // 13. EVENT LISTENERS SETUP
  // ---------------------------------------------------------
  function setupEventListeners() {
    // Navigation Tabs
    document.getElementById('main-nav-tabs').addEventListener('click', function (e) {
      const btn = e.target.closest('.nav-tab-btn');
      if (btn) {
        switchTab(btn.getAttribute('data-tab'));
      }
    });

    // Global Search
    const searchInput = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        appState.searchQuery = e.target.value;
        if (clearBtn) clearBtn.style.display = appState.searchQuery ? 'block' : 'none';
        switchTab('explorer');
        renderExplorerGrid();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        appState.searchQuery = '';
        searchInput.value = '';
        clearBtn.style.display = 'none';
        renderExplorerGrid();
      });
    }

    // Header Quick Filters
    const bmBtn = document.getElementById('header-bookmark-filter-btn');
    if (bmBtn) {
      bmBtn.addEventListener('click', function () {
        appState.filterStatus = 'BOOKMARKED';
        document.getElementById('filter-status').value = 'BOOKMARKED';
        switchTab('explorer');
      });
    }

    const revBtn = document.getElementById('header-review-filter-btn');
    if (revBtn) {
      revBtn.addEventListener('click', function () {
        switchTab('queue');
      });
    }

    // Level Cards Clicks
    document.querySelectorAll('.level-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const lvl = this.getAttribute('data-level');
        appState.filterLevel = lvl;
        document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active-level'));
        this.classList.add('active-level');

        // Update pills
        document.querySelectorAll('.pill-btn').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-filter-level') === lvl);
        });

        switchTab('explorer');
        renderExplorerGrid();
      });
    });

    // Level Pills
    document.getElementById('explorer-level-pills').addEventListener('click', function (e) {
      const pill = e.target.closest('.pill-btn');
      if (pill) {
        const lvl = pill.getAttribute('data-filter-level');
        appState.filterLevel = lvl;
        document.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderExplorerGrid();
      }
    });

    // Explorer Selects
    document.getElementById('filter-status').addEventListener('change', function (e) {
      appState.filterStatus = e.target.value;
      renderExplorerGrid();
    });
    document.getElementById('filter-pos').addEventListener('change', function (e) {
      appState.filterPos = e.target.value;
      renderExplorerGrid();
    });
    document.getElementById('filter-sort').addEventListener('change', function (e) {
      appState.filterSort = e.target.value;
      renderExplorerGrid();
    });

    document.getElementById('btn-reset-filters').addEventListener('click', function () {
      appState.filterLevel = 'ALL';
      appState.filterStatus = 'ALL';
      appState.filterPos = 'ALL';
      appState.filterSort = 'A-Z';
      appState.searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.getElementById('filter-status').value = 'ALL';
      document.getElementById('filter-pos').value = 'ALL';
      document.getElementById('filter-sort').value = 'A-Z';
      document.querySelectorAll('.pill-btn').forEach(p => p.classList.toggle('active', p.getAttribute('data-filter-level') === 'ALL'));
      renderExplorerGrid();
    });

    // Flashcard Controls
    const fcElem = document.getElementById('flashcard-element');
    if (fcElem) fcElem.addEventListener('click', flipFlashcard);

    document.getElementById('fc-btn-flip').addEventListener('click', flipFlashcard);
    document.getElementById('fc-btn-next').addEventListener('click', nextFlashcard);
    document.getElementById('fc-btn-prev').addEventListener('click', prevFlashcard);
    document.getElementById('fc-shuffle-btn').addEventListener('click', shuffleFlashcards);
    document.getElementById('fc-reset-btn').addEventListener('click', function () {
      flashcardIndex = 0;
      renderCurrentFlashcard();
    });

    document.getElementById('flashcard-deck-select').addEventListener('change', function (e) {
      initFlashcardDeck(e.target.value);
    });

    document.getElementById('fc-btn-know-it').addEventListener('click', function () {
      const curWord = flashcardDeck[flashcardIndex];
      if (curWord) {
        appState.learned[curWord.id] = true;
        appState.mastered[curWord.id] = true;
        delete appState.reviewQueue[curWord.id];
        saveState();
        showToast(`Mastered "${curWord.word}"!`, 'fa-award');
        nextFlashcard();
      }
    });

    document.getElementById('fc-btn-review-again').addEventListener('click', function () {
      const curWord = flashcardDeck[flashcardIndex];
      if (curWord) {
        appState.reviewQueue[curWord.id] = true;
        saveState();
        showToast(`Added "${curWord.word}" to Review Queue`, 'fa-rotate-left');
        nextFlashcard();
      }
    });

    // Quiz Controls
    document.getElementById('btn-start-quiz').addEventListener('click', startQuizUI);
    document.getElementById('btn-quit-quiz').addEventListener('click', function () {
      document.getElementById('active-quiz-screen').style.display = 'none';
      document.getElementById('quiz-setup-screen').style.display = 'block';
    });
    document.getElementById('btn-quiz-next').addEventListener('click', function () {
      currentQuizIndex++;
      renderCurrentQuizQuestion();
    });
    document.getElementById('btn-quiz-retry').addEventListener('click', startQuizUI);
    document.getElementById('btn-quiz-back-setup').addEventListener('click', function () {
      document.getElementById('quiz-result-screen').style.display = 'none';
      document.getElementById('quiz-setup-screen').style.display = 'block';
    });
    document.getElementById('btn-add-missed-to-queue').addEventListener('click', function () {
      missedWords.forEach(w => { appState.reviewQueue[w.id] = true; });
      saveState();
      showToast(`Added ${missedWords.length} words to Review Queue!`, 'fa-circle-check');
    });

    // Confusing Search
    const confInput = document.getElementById('confusing-search-input');
    if (confInput) {
      confInput.addEventListener('input', function (e) {
        renderConfusingPairs(e.target.value);
      });
    }

    // Morphology Toggles
    const btnPref = document.getElementById('btn-show-prefixes');
    const btnSuff = document.getElementById('btn-show-suffixes');
    if (btnPref && btnSuff) {
      btnPref.addEventListener('click', function () {
        btnPref.classList.add('active');
        btnSuff.classList.remove('active');
        document.getElementById('prefixes-container').style.display = 'block';
        document.getElementById('suffixes-container').style.display = 'none';
      });
      btnSuff.addEventListener('click', function () {
        btnSuff.classList.add('active');
        btnPref.classList.remove('active');
        document.getElementById('prefixes-container').style.display = 'none';
        document.getElementById('suffixes-container').style.display = 'block';
      });
    }

    // Modal Close
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Review Queue Controls
    document.getElementById('btn-practice-queue-flashcards').addEventListener('click', function () {
      switchTab('flashcards');
      document.getElementById('flashcard-deck-select').value = 'REVIEW';
      initFlashcardDeck('REVIEW');
    });
    document.getElementById('btn-clear-review-queue').addEventListener('click', function () {
      if (confirm('Clear all words from your review queue?')) {
        appState.reviewQueue = {};
        saveState();
        renderReviewQueueGrid();
        showToast('Review queue cleared', 'fa-trash-can');
      }
    });
    document.getElementById('btn-queue-go-explore').addEventListener('click', function () {
      switchTab('explorer');
    });

    // Reset Progress
    const resetAllBtn = document.getElementById('btn-reset-all-progress');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to reset all study progress, learned words, and bookmarks?')) {
          localStorage.removeItem(STORAGE_KEY);
          appState.learned = {};
          appState.mastered = {};
          appState.bookmarked = {};
          appState.reviewQueue = {};
          saveState();
          renderExplorerGrid();
          renderReviewQueueGrid();
          showToast('All progress reset', 'fa-arrows-rotate');
        }
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', function (e) {
      if (appState.activeTab === 'flashcards') {
        if (e.code === 'Space') {
          e.preventDefault();
          flipFlashcard();
        } else if (e.code === 'ArrowRight') {
          nextFlashcard();
        } else if (e.code === 'ArrowLeft') {
          prevFlashcard();
        } else if (e.key === '1') {
          document.getElementById('fc-btn-review-again').click();
        } else if (e.key === '2') {
          document.getElementById('fc-btn-know-it').click();
        }
      }
    });
  }

  // ---------------------------------------------------------
  // 14. GLOBAL NAMESPACE EXPORTS
  // ---------------------------------------------------------
  window.MDCAT = {
    speak: speakWord,
    toggleLearned: toggleLearned,
    toggleBookmark: toggleBookmark,
    toggleReviewQueue: toggleReviewQueue,
    openModal: openWordModal,
    searchFor: function (query) {
      const sInput = document.getElementById('global-search-input');
      if (sInput) sInput.value = query;
      appState.searchQuery = query;
      switchTab('explorer');
      renderExplorerGrid();
    },
    answerMiniQ: function (pairId, chosenOpt, correctOpt) {
      const qBlock = document.getElementById(`mini-q-${pairId}`);
      if (!qBlock) return;
      if (chosenOpt === correctOpt) {
        qBlock.innerHTML = `<p style="color: var(--status-success); font-weight: 700; font-size: 0.85rem;"><i class="fa-solid fa-circle-check"></i> Correct! "${correctOpt}" is the proper choice.</p>`;
      } else {
        qBlock.innerHTML = `<p style="color: var(--status-danger); font-weight: 700; font-size: 0.85rem;"><i class="fa-solid fa-circle-xmark"></i> Incorrect. The correct choice is "${correctOpt}".</p>`;
      }
    }
  };

  // ---------------------------------------------------------
  // 15. INITIALIZATION
  // ---------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    loadState();
    updateDashboardStats();
    initWordOfTheDay();
    renderExplorerGrid();
    renderConfusingPairs();
    renderMorphology();
    renderWordFamilies();
    renderSynonymChains();
    setupEventListeners();
  });
})();
