/**
 * EDUNOVIX-AI — ENGLISH VOCABULARY LEARNING ENGINE
 * Dedicated module for MDCAT, CSS, Academic & Advanced English Learners
 * Features: Comprehensive Lexicon, Sindhi Dictionary, 3D Flashcards,
 * 5-Mode Quiz Arena, Visual Concept SVGs, Speech Synthesis & AI Bridge.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. VISUAL CONCEPT SVG ASSETS (Clean, educational inline vectors)
  // -------------------------------------------------------------------------
  const VisualSVGs = {
    abandon: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50h60M30 50V35a20 20 0 1140 0v15" stroke="#6366f1" stroke-width="3" stroke-linecap="round"/>
      <path d="M45 35l10-10m0 0l-10-10m10 10H15" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
      <circle cx="70" cy="20" r="4" fill="#10b981"/>
    </svg>`,
    frugal: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="38" r="24" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="3"/>
      <path d="M50 26v24M44 32h12a4 4 0 010 8H44" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 14v-4m-6 4l6-6 6 6" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    chaotic: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20c15 30 45-20 60 10M15 50c30-10 10-30 70 0M30 15l40 40M75 15L25 55" stroke="#ec4899" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
      <circle cx="50" cy="35" r="8" fill="#f43f5e"/>
    </svg>`,
    pernicious: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15v30M35 55c0-10 30-10 30 0" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="18" r="4" fill="#ef4444"/>
      <path d="M28 28l44 24M72 28L28 52" stroke="#dc2626" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`,
    ubiquitous: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="22" stroke="#38bdf8" stroke-width="2.5"/>
      <ellipse cx="50" cy="35" rx="9" ry="22" stroke="#38bdf8" stroke-width="2"/>
      <path d="M28 35h44" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="28" cy="35" r="3" fill="#6366f1"/>
      <circle cx="72" cy="35" r="3" fill="#6366f1"/>
      <circle cx="50" cy="13" r="3" fill="#6366f1"/>
      <circle cx="50" cy="57" r="3" fill="#6366f1"/>
    </svg>`,
    resilient: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 55h70" stroke="#64748b" stroke-width="4"/>
      <path d="M50 55V32c0-12 14-16 18-16" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 40c-10-8-12-16-8-22" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
      <circle cx="68" cy="16" r="4" fill="#34d399"/>
    </svg>`,
    benevolent: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 55S25 38 25 25a12 12 0 0124-4 12 12 0 0124 4c0 13-23 30-23 30z" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="3"/>
      <path d="M42 35l6 6 12-12" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    lucid: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15a16 16 0 00-16 16c0 8 6 12 8 16h16c2-4 8-8 8-16a16 16 0 00-16-16z" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="3"/>
      <path d="M42 53h16M45 58h10M50 8v-4M28 20l-4-4M72 20l4-4" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    homeostasis: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20v35M25 32h50M25 32l-8 12h16l-8-12zm50 0l-8 12h16l-8-12z" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="50" cy="18" r="4" fill="#6366f1"/>
      <path d="M40 55h20" stroke="#64748b" stroke-width="3"/>
    </svg>`,
    defaultVisual: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="50" height="40" rx="8" stroke="#6366f1" stroke-width="2.5" fill="rgba(99,102,241,0.08)"/>
      <path d="M35 28h30M35 38h20" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <circle cx="68" cy="45" r="8" fill="#8b5cf6"/>
      <path d="M66 45l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  };

  // -------------------------------------------------------------------------
  // 2. PRIMARY VOCABULARY DATASET
  // -------------------------------------------------------------------------
  const VocabularyData = [
    {
      id: 'abandon',
      word: 'Abandon',
      pronunciation: '/əˈbæn.dən/',
      partOfSpeech: 'verb',
      level: 'Beginner',
      category: 'Everyday',
      simpleMeaning: 'To leave completely and forever; to give up on something.',
      detailedMeaning: 'To cease to support, look after, or continue something; deserting a person, place, or principle without intention of returning.',
      urduMeaning: 'چھوڑ دینا، ترک کرنا، لاوارث چھوڑنا',
      sindhiMeaning: 'ڇڏي ڏيڻ، ترڪ ڪرڻ، بي سھارو ڇڏڻ',
      synonyms: ['Desert', 'Forsake', 'Relinquish', 'Discard', 'Vacate'],
      antonyms: ['Retain', 'Maintain', 'Cherish', 'Adopt', 'Protect'],
      examples: {
        simple: 'The crew had to abandon the sinking ship immediately.',
        academic: 'Scholars argued whether traditional paradigms should be abandoned in favor of empirical methods.',
        exam: 'Under severe economic strain, the administration decided to abandon the prolonged infrastructure project.'
      },
      wordForms: 'abandon (v), abandonment (n), abandoned (adj)',
      collocations: ['abandon hope', 'abandon an attempt', 'abandon all plans', 'reckless abandon'],
      usage: 'Used both literally (abandoning a vehicle) and figuratively (abandoning hope or principles).',
      commonMistake: 'Do not confuse "abandon" with "surrender". Abandon means walking away; surrender means giving in to an opponent.',
      memoryTip: 'Think of "a-ban-done": a ban is placed, and you are done with it forever.',
      visual: VisualSVGs.abandon
    },
    {
      id: 'frugal',
      word: 'Frugal',
      pronunciation: '/ˈfruː.ɡəl/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Everyday',
      simpleMeaning: 'Very careful about spending money; not wasteful.',
      detailedMeaning: 'Practicing economy; living simply without unnecessary expenditure or luxury, characterized by thrift and moderation.',
      urduMeaning: 'کفایت شعار، کم خرچ، سمجھداری سے خرچ کرنے والا',
      sindhiMeaning: 'ڪفايت شعار، سنڀالي خرچ ڪندڙ، گهٽ خرچ',
      synonyms: ['Thrifty', 'Economical', 'Prudent', 'Sparing', 'Abstemious'],
      antonyms: ['Extravagant', 'Prodigal', 'Wasteful', 'Lavish', 'Spendthrift'],
      examples: {
        simple: 'Being a student, Ali lived a very frugal lifestyle to save money for tuition.',
        academic: 'The research institute adopted a frugal budget to maximize output with limited grants.',
        exam: 'Her frugal habits enabled her family to weather the inflationary crisis without incurring debt.'
      },
      wordForms: 'frugal (adj), frugality (n), frugally (adv)',
      collocations: ['frugal lifestyle', 'frugal meal', 'frugal spending', 'strictly frugal'],
      usage: '"Frugal" has a positive connotation of wisdom, whereas "stingy" or "miserly" has a negative connotation.',
      commonMistake: 'Frugal does not mean greedy or mean; it means deliberate and wise with resources.',
      memoryTip: 'Think of eating simple "fruits" instead of lavish steaks to save money.',
      visual: VisualSVGs.frugal
    },
    {
      id: 'chaotic',
      word: 'Chaotic',
      pronunciation: '/keɪˈɒt.ɪk/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Everyday',
      simpleMeaning: 'Completely disordered, messy, and confused.',
      detailedMeaning: 'In a state of complete confusion and disorder; lacking any guiding pattern, structure, or organization.',
      urduMeaning: 'بے ترتیب، ابتر، افراتفری والا، انتشار زدہ',
      sindhiMeaning: 'اڀري پُڀري، گڙٻڙ وارو، وڳوڙي، بي ترتيب',
      synonyms: ['Disordered', 'Tumultuous', 'Turbulent', 'Anarchic', 'Frenzied'],
      antonyms: ['Orderly', 'Harmonious', 'Systematic', 'Organized', 'Peaceful'],
      examples: {
        simple: 'The classroom became chaotic when the electricity suddenly went out.',
        academic: 'Sociologists analyzed the chaotic collapse of institutional governance during the revolution.',
        exam: 'The emergency department presented a chaotic scene following the multi-vehicle highway collision.'
      },
      wordForms: 'chaos (n), chaotic (adj), chaotically (adv)',
      collocations: ['chaotic scene', 'chaotic state of affairs', 'chaotic traffic', 'utterly chaotic'],
      usage: 'Pronounced with a hard "K" sound (/keɪ-/), never with a "ch" sound.',
      commonMistake: 'Mispronouncing as "ch-aotic". Remember: C-H sounds like K in this Greek root.',
      memoryTip: 'Chaotic = Complete Havoc And Total Insecurity.',
      visual: VisualSVGs.chaotic
    },
    {
      id: 'pernicious',
      word: 'Pernicious',
      pronunciation: '/pərˈnɪʃ.əs/',
      partOfSpeech: 'adjective',
      level: 'Upper Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'Very harmful, especially in a slow, sneaky, and hidden way.',
      detailedMeaning: 'Having a harmful, destructive, or fatal effect, especially in a gradual, insidious, or subtle manner over time.',
      urduMeaning: 'مہلک، نقصان دہ، بتدریج تباہی پھیلانے والا، خفیہ زہریلا',
      sindhiMeaning: 'مهلڪ، تمام گهڻو نقصانڪار، هوريان هوريان برباد ڪندڙ',
      synonyms: ['Insidious', 'Deleterious', 'Malignant', 'Noxious', 'Destructive'],
      antonyms: ['Beneficial', 'Innocuous', 'Salubrious', 'Wholesome', 'Remedial'],
      examples: {
        simple: 'Smoking has a pernicious effect on the respiratory lungs.',
        academic: 'Pernicious anemia stems from autoimmune destruction of gastric parietal cells, blocking B12 uptake.',
        exam: 'The corruption within the provincial bureaucracy had a pernicious influence on public trust.'
      },
      wordForms: 'pernicious (adj), perniciously (adv), perniciousness (n)',
      collocations: ['pernicious influence', 'pernicious anemia', 'pernicious effect', 'pernicious rumors'],
      usage: 'Frequently used in both biological/medical contexts (pernicious disease) and social essays.',
      commonMistake: 'Do not confuse with "precocious" (unusually mature for one\'s age).',
      memoryTip: 'Pernicious rhymes with "vicious"—a vicious damage that destroys silently.',
      visual: VisualSVGs.pernicious
    },
    {
      id: 'ubiquitous',
      word: 'Ubiquitous',
      pronunciation: '/juːˈbɪk.wɪ.təs/',
      partOfSpeech: 'adjective',
      level: 'Advanced',
      category: 'CSS',
      simpleMeaning: 'Found or present everywhere at the same time.',
      detailedMeaning: 'Existing, appearing, or being found everywhere; omnipresent in modern society or nature.',
      urduMeaning: 'ہر جگہ پایا جانے والا، ہمہ گیر، حاضر و ناظر',
      sindhiMeaning: 'هر جاءِ تي موجود، سڀني پاسن پکڙيل، همھ گير',
      synonyms: ['Omnipresent', 'Pervasive', 'Prevalent', 'Universal', 'Rife'],
      antonyms: ['Rare', 'Scarce', 'Infrequent', 'Isolated', 'Seldom'],
      examples: {
        simple: 'Mobile phones and internet cafes have become ubiquitous in Pakistani cities.',
        academic: 'Ubiquitin is a ubiquitous regulatory protein found in nearly all eukaryotic cells.',
        exam: 'In the digital era, surveillance apparatuses have become an almost ubiquitous facet of modern governance.'
      },
      wordForms: 'ubiquitous (adj), ubiquitously (adv), ubiquity (n)',
      collocations: ['ubiquitous presence', 'become ubiquitous', 'ubiquitous technology', 'virtually ubiquitous'],
      usage: 'Superb word for CSS and university argumentative essays.',
      commonMistake: 'Do not use it to describe something that is just popular; it means virtually inescapable.',
      memoryTip: 'Ubiquitous: "U-be-quick-with-us" because you are everywhere we turn!',
      visual: VisualSVGs.ubiquitous
    },
    {
      id: 'resilient',
      word: 'Resilient',
      pronunciation: '/rɪˈzɪl.jənt/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'Able to recover quickly from illness, trouble, or damage.',
      detailedMeaning: 'Able to withstand or recover quickly from difficult conditions; in physics, capable of resuming original shape after bending.',
      urduMeaning: 'لچکدار، مصائب سے جلد سنبھلنے والا، قوت مدافعت رکھنے والا',
      sindhiMeaning: 'لچڪدار، تڪڙو وري اصل حالت تي ايندڙ، سگهارو',
      synonyms: ['Tenacious', 'Durable', 'Adaptable', 'Robust', 'Buoyant'],
      antonyms: ['Fragile', 'Vulnerable', 'Brittle', 'Feeble', 'Susceptible'],
      examples: {
        simple: 'Children are remarkably resilient and bounce back from emotional upsets.',
        academic: 'Resilient cartilage tissues absorb mechanical shock across mammalian joints.',
        exam: 'Despite severe macroeconomic shocks, the agricultural export sector proved remarkably resilient.'
      },
      wordForms: 'resilience (n), resilient (adj), resiliently (adv)',
      collocations: ['highly resilient', 'resilient economy', 'resilient tissue', 'resilient spirit'],
      usage: 'Used across psychology, economics, cellular physiology, and materials engineering.',
      commonMistake: 'Do not confuse with "resistant". Resistant stops an attack; resilient recovers after hardship.',
      memoryTip: 'Re-silent = bouncing back without complaining.',
      visual: VisualSVGs.resilient
    },
    {
      id: 'homeostasis',
      word: 'Homeostasis',
      pronunciation: '/ˌhəʊ.mi.əʊˈsteɪ.sɪs/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'The body maintaining internal balance despite outside changes.',
      detailedMeaning: 'The tendency of a physiological organism to maintain stable internal equilibrium through coordinated autonomic feedback loops.',
      urduMeaning: 'حیاتیاتی توازن، اندرونی اعتدال و ہمواری',
      sindhiMeaning: 'جسماني توازن، اندريون هموزن سرشتو',
      synonyms: ['Equilibrium', 'Stability', 'Balance', 'Counterpoise'],
      antonyms: ['Imbalance', 'Instability', 'Dysfunction', 'Disequilibrium'],
      examples: {
        simple: 'Sweating on a hot day helps your body maintain homeostasis.',
        academic: 'Endocrine feedback loops strictly regulate blood glucose homeostasis via insulin and glucagon.',
        exam: 'Kidneys play an indispensable role in maintaining fluid and electrolyte homeostasis in human physiology.'
      },
      wordForms: 'homeostasis (n), homeostatic (adj), homeostatically (adv)',
      collocations: ['maintain homeostasis', 'disrupt homeostasis', 'thermal homeostasis', 'cellular homeostasis'],
      usage: 'Critical core concept in MDCAT Biology and English medical passage comprehension.',
      commonMistake: 'Homeostasis is a noun; homeostatic is the adjective form.',
      memoryTip: 'Homeo (same) + Stasis (standing) = staying constant and balanced.',
      visual: VisualSVGs.homeostasis
    },
    {
      id: 'benevolent',
      word: 'Benevolent',
      pronunciation: '/bəˈnev.əl.ənt/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Literature',
      simpleMeaning: 'Kind, generous, and wanting to do good for others.',
      detailedMeaning: 'Well meaning and kindly; motivated by an active desire to relieve distress and promote general welfare.',
      urduMeaning: 'رحم دل، فیاض، خیر خواہ، مہربان',
      sindhiMeaning: 'رحمدل، مهربان، ٻين جي ڀلائي چاهيندڙ',
      synonyms: ['Altruistic', 'Magnanimous', 'Compassionate', 'Philanthropic', 'Beneficent'],
      antonyms: ['Malevolent', 'Spiteful', 'Malicious', 'Sinister', 'Miserly'],
      examples: {
        simple: 'The benevolent doctor treated impoverished rural patients free of charge.',
        academic: 'Historical texts depict the emperor as a benevolent despot who funded universities and hospitals.',
        exam: 'The philanthropic foundation was founded upon benevolent intentions to eradicate polio.'
      },
      wordForms: 'benevolence (n), benevolent (adj), benevolently (adv)',
      collocations: ['benevolent smile', 'benevolent organization', 'benevolent ruler', 'strictly benevolent'],
      usage: 'Prefix "Bene" means good in Latin; root "Vol" means will (good will).',
      commonMistake: 'Malevolent is the opposite (bad will).',
      memoryTip: 'Bene (Benefit) + Volent (Volunteer) = volunteer for benefit of others.',
      visual: VisualSVGs.benevolent
    },
    {
      id: 'lucid',
      word: 'Lucid',
      pronunciation: '/ˈluː.sɪd/',
      partOfSpeech: 'adjective',
      level: 'Upper Intermediate',
      category: 'Academic',
      simpleMeaning: 'Expressed clearly; easy to understand; mentally clear.',
      detailedMeaning: 'Characterized by clear perception, rational comprehension, and luminous clarity of thought or expression.',
      urduMeaning: 'واضح، صاف، باہوش، سمجھ میں آنے والا',
      sindhiMeaning: 'صاف، چٽو، عقل وارو، سمجهه ۾ ايندڙ',
      synonyms: ['Articulate', 'Luminous', 'Coherent', 'Intelligible', 'Perspicuous'],
      antonyms: ['Ambiguous', 'Confusing', 'Obscure', 'Vague', 'Muddled'],
      examples: {
        simple: 'The professor gave a lucid explanation of organic chemistry reactions.',
        academic: 'The post-operative patient remained lucid and fully oriented to time, place, and person.',
        exam: 'The author presented a lucid critique of prevailing international monetary policies.'
      },
      wordForms: 'lucid (adj), lucidity (n), lucidly (adv)',
      collocations: ['lucid explanation', 'lucid dream', 'lucid interval', 'lucid prose'],
      usage: 'Used for both clear writing and a patient\'s mental wakefulness.',
      commonMistake: 'Do not confuse with "ludicrous" (ridiculous).',
      memoryTip: 'Lucid starts with "Lu" like light (Lux)—shining light on clarity.',
      visual: VisualSVGs.lucid
    },
    {
      id: 'hegemony',
      word: 'Hegemony',
      pronunciation: '/hɪˈdʒem.ə.ni/',
      partOfSpeech: 'noun',
      level: 'Expert',
      category: 'CSS',
      simpleMeaning: 'Dominance or leadership of one country or social group over others.',
      detailedMeaning: 'Leadership or predominant influence exercised by one nation, state, or social class over others in politics, economy, or culture.',
      urduMeaning: 'بالادستی، غلبہ، چودھراہٹ، تسلط',
      sindhiMeaning: 'بالادستي، حاڪميت، غلبو، وڏائي',
      synonyms: ['Dominance', 'Supremacy', 'Ascendancy', 'Sovereignty', 'Paramountcy'],
      antonyms: ['Subordination', 'Servitude', 'Weakness', 'Inferiority', 'Egalitarianism'],
      examples: {
        simple: 'Ancient Rome established military hegemony throughout the Mediterranean.',
        academic: 'Gramscian theory examines cultural hegemony as ideological consent manufactured by the ruling elite.',
        exam: 'The treaty was drafted to prevent any single maritime power from exercising total regional hegemony.'
      },
      wordForms: 'hegemony (n), hegemonic (adj), hegemon (n)',
      collocations: ['regional hegemony', 'cultural hegemony', 'economic hegemony', 'challenge hegemony'],
      usage: 'A premier concept tested in CSS Political Science, International Relations, and Precis.',
      commonMistake: 'Pronunciation emphasis is usually on the second syllable: he-GEM-ony or HEDGE-emony.',
      memoryTip: 'Hedge-money = who has the money has hegemony (leadership).',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'empirical',
      word: 'Empirical',
      pronunciation: '/ɪmˈpɪr.ɪ.kəl/',
      partOfSpeech: 'adjective',
      level: 'Academic',
      category: 'Academic',
      simpleMeaning: 'Based on observation or experiment rather than theory or belief.',
      detailedMeaning: 'Originating in or verified by observation, tangible experience, or scientific experiment rather than pure theory or speculation.',
      urduMeaning: 'تجرباتی، مشاہداتی، شواہد پر مبنی',
      sindhiMeaning: 'تجرباتي، مشاهدي وارو، سچن ثبوتن تي آڌاريل',
      synonyms: ['Experiential', 'Observational', 'Evidence-based', 'Pragmatic', 'Fact-based'],
      antonyms: ['Theoretical', 'Speculative', 'Hypothetical', 'Conjectural', 'Abstract'],
      examples: {
        simple: 'Scientists require empirical proof before accepting a new medical treatment.',
        academic: 'The thesis provides robust empirical data derived from a multi-year randomized clinical trial.',
        exam: 'Without empirical evidence to corroborate the assertion, the court deemed the claim unsubstantiated.'
      },
      wordForms: 'empirical (adj), empirically (adv), empiricism (n), empiricist (n)',
      collocations: ['empirical evidence', 'empirical research', 'empirical study', 'strictly empirical'],
      usage: 'Fundamental word for CSS Précis and university academic dissertations.',
      commonMistake: 'Do not confuse with "imperial" (relating to an empire).',
      memoryTip: 'Empirical = Evidence Measured Practically In Real Investigation.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'virulence',
      word: 'Virulence',
      pronunciation: '/ˈvɪr.jə.ləns/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'Medical',
      simpleMeaning: 'The severe harmfulness or infectivity of a disease or poison; bitter hostility.',
      detailedMeaning: 'The severity or degree of pathogenicity of an infectious organism, or bitter hostility and malice in speech.',
      urduMeaning: 'شدت، زہریلا پن، جراثیم کی مہلک طاقت، کینہ پروری',
      sindhiMeaning: 'زهريلاپڻ، شدت، بيماريءَ جي سخت طاقت، نفرت',
      synonyms: ['Pathogenicity', 'Toxicity', 'Malignancy', 'Noxiousness', 'Ferocity'],
      antonyms: ['Harmlessness', 'Mildness', 'Innocuousness', 'Benevolence', 'Gentleness'],
      examples: {
        simple: 'The mutation significantly increased the virus’s virulence in young children.',
        academic: 'Bacterial virulence factors include capsules, exotoxins, and specialized surface antigens.',
        exam: 'The political debate escalated into extraordinary personal virulence between the rival candidates.'
      },
      wordForms: 'virulent (adj), virulently (adv), virulence (n)',
      collocations: ['bacterial virulence', 'high virulence', 'virulence factor', 'speak with virulence'],
      usage: 'Commonly tested in MDCAT Biology and English reading passages.',
      commonMistake: 'Do not confuse with "viral" (popular on the internet). Virulent means poisonous/hostile.',
      memoryTip: 'Virulence sounds like "virus violence"—the violent severity of a microbe.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'pragmatic',
      word: 'Pragmatic',
      pronunciation: '/præɡˈmæt.ɪk/',
      partOfSpeech: 'adjective',
      level: 'Advanced',
      category: 'CSS',
      simpleMeaning: 'Dealing with things sensibly and realistically based on practical results.',
      detailedMeaning: 'Dealing with problems in a realistic, sensible, and practical way, rather than following idealistic theories or dogmas.',
      urduMeaning: 'عملی، حقیقت پسندانہ، مصلحت آمیز',
      sindhiMeaning: 'عملي، حقيقت پسند، مفاد ۽ نتيجن کي ڏسندڙ',
      synonyms: ['Practical', 'Utilitarian', 'Sensible', 'Expedient', 'Rational'],
      antonyms: ['Idealistic', 'Quixotic', 'Impractical', 'Theoretical', 'Dogmatic'],
      examples: {
        simple: 'A pragmatic approach to revision focuses on topics with the highest exam marks.',
        academic: 'Foreign policy analysts advocated a pragmatic compromise over disputed maritime borders.',
        exam: 'Rather than pursuing dogmatic ideology, the prime minister championed pragmatic fiscal reform.'
      },
      wordForms: 'pragmatic (adj), pragmatically (adv), pragmatism (n), pragmatist (n)',
      collocations: ['pragmatic approach', 'pragmatic decision', 'pragmatic solution', 'strictly pragmatic'],
      usage: 'Essential term in competitive essays, international affairs, and precis.',
      commonMistake: 'Opposite is quixotic or idealistic; not necessarily unethical.',
      memoryTip: 'Pragmatic = Practical Management in Action.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'anachronistic',
      word: 'Anachronistic',
      pronunciation: '/əˌnæk.rəˈnɪs.tɪk/',
      partOfSpeech: 'adjective',
      level: 'Expert',
      category: 'CSS',
      simpleMeaning: 'Belonging or appropriate to an earlier period, often out of date.',
      detailedMeaning: 'Chronologically misplaced; belonging or appropriate to a period other than that in which it exists, especially old-fashioned.',
      urduMeaning: 'زمانہ قدیم سے متعلق، فرسودہ، بے وقت، زمانے کے تقاضوں کے خلاف',
      sindhiMeaning: 'زماني کان پوئتي، پراڻي وقت جو، بي وقتو، اڄ جي دور سان بي ميل',
      synonyms: ['Archaic', 'Antiquated', 'Obsolete', 'Outmoded', 'Superannuated'],
      antonyms: ['Contemporary', 'Modern', 'Synchronous', 'Futuristic', 'Timely'],
      examples: {
        simple: 'Seeing a horse carriage in a futuristic movie felt completely anachronistic.',
        academic: 'Constitutional lawyers argued that colonial-era sedition ordinances are profoundly anachronistic.',
        exam: 'The mandatory physical stamping of paper ledgers seems anachronistic in a digitized banking sector.'
      },
      wordForms: 'anachronism (n), anachronistic (adj), anachronistically (adv)',
      collocations: ['anachronistic view', 'hopelessly anachronistic', 'glaring anachronism'],
      usage: 'Greek roots: "Ana" (against/back) + "Chronos" (time).',
      commonMistake: 'Does not just mean old; it specifically means placed in the wrong chronological era.',
      memoryTip: 'Ana-CHRON-istic: Against the timeline (Chronos = Time).',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'fastidious',
      word: 'Fastidious',
      pronunciation: '/fæsˈtɪd.i.əs/',
      partOfSpeech: 'adjective',
      level: 'Advanced',
      category: 'CSS',
      simpleMeaning: 'Very attentive to accuracy and detail; very hard to please.',
      detailedMeaning: 'Giving excessive care to detail; meticulous and demanding; in microbiology, having complex nutritional requirements.',
      urduMeaning: 'بہت باریک بین، نک چڑھا، کڑے معیار والا، مشکل پسند',
      sindhiMeaning: 'تمام گهڻو ڌيان ڏيندڙ، نڪ چڙهو، ڌيان سان چڪاسيندڙ',
      synonyms: ['Meticulous', 'Punctilious', 'Scrupulous', 'Finicky', 'Hypercritical'],
      antonyms: ['Careless', 'Sloppy', 'Lenient', 'Undemanding', 'Indifferent'],
      examples: {
        simple: 'The surgeon was fastidious about hand sterilization before entering the theatre.',
        academic: 'Neisseria gonorrhoeae is a fastidious bacterium requiring enriched chocolate agar to culture.',
        exam: 'His fastidious editing of the diplomatic communiqué ensured no unintended ambiguity persisted.'
      },
      wordForms: 'fastidious (adj), fastidiously (adv), fastidiousness (n)',
      collocations: ['fastidious attention to detail', 'fastidious cleaner', 'fastidious organism'],
      usage: 'Both human personality trait and medical/biological growth characteristic.',
      commonMistake: 'Do not confuse with "tedious" (boring and slow). Fastidious is picky/meticulous.',
      memoryTip: 'Fastidious = Fast to findidious (fussy) mistakes.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'obsequious',
      word: 'Obsequious',
      pronunciation: '/əbˈsiː.kwi.əs/',
      partOfSpeech: 'adjective',
      level: 'Expert',
      category: 'Literature',
      simpleMeaning: 'Too eager to praise or obey someone important; flattering insincerely.',
      detailedMeaning: 'Obedient or attentive to an excessive or servile degree; sycophantic, fawning, and insincerely flattering.',
      urduMeaning: 'خوشامدی، چاپلوس، حد سے زیادہ جی حضوری کرنے والا',
      sindhiMeaning: 'چاپلوس، خوشامدي، وڏيرن پٺيان ڪنڌ جهڪائيندڙ',
      synonyms: ['Sycophantic', 'Fawning', 'Servile', 'Subservient', 'Ingratiating'],
      antonyms: ['Assertive', 'Imperious', 'Domineering', 'Defiant', 'Insolent'],
      examples: {
        simple: 'The obsequious assistant agreed with every single word the wealthy director uttered.',
        academic: 'Satirical Victorian literature routinely lampooned the obsequious courtiers surrounding the monarchy.',
        exam: 'He detested the obsequious flatterers who surrounded the minister solely to curry political favor.'
      },
      wordForms: 'obsequious (adj), obsequiously (adv), obsequiousness (n)',
      collocations: ['obsequious behavior', 'obsequious smile', 'obsequious flattery'],
      usage: 'Strong negative critical register in literary analyses and political columns.',
      commonMistake: 'Do not confuse with "obedient". Obedient is dutiful; obsequious is sickeningly bootlicking.',
      memoryTip: 'Ob-SEEK-uious: Always seeking approval through servile flattery.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'ephemeral',
      word: 'Ephemeral',
      pronunciation: '/ɪˈfem.ər.əl/',
      partOfSpeech: 'adjective',
      level: 'Upper Intermediate',
      category: 'Literature',
      simpleMeaning: 'Lasting for only a very short time.',
      detailedMeaning: 'Lasting for a markedly brief time; transitory, fleeting, and evanescent, like morning dew or mayflies.',
      urduMeaning: 'عارضی، چند روزہ، ناپائیدار، جلد گزر جانے والا',
      sindhiMeaning: 'عارضي، ٿورڙي وقت لاءِ رهندڙ، فاني، دم کڻڻ جيترو',
      synonyms: ['Transient', 'Fleeting', 'Evanescent', 'Momentary', 'Fugacious'],
      antonyms: ['Permanent', 'Perennial', 'Enduring', 'Eternal', 'Everlasting'],
      examples: {
        simple: 'The beauty of spring blossoms is ephemeral, fading within a fortnight.',
        academic: 'Anthropologists documented the ephemeral desert rivers that flood violently then vanish.',
        exam: 'Fame derived from viral internet trends is inherently ephemeral compared to enduring scholarly craft.'
      },
      wordForms: 'ephemeral (adj), ephemerality (n), ephemerally (adv)',
      collocations: ['ephemeral pleasure', 'ephemeral beauty', 'ephemeral nature', 'highly ephemeral'],
      usage: 'Beloved word for CSS précis, poetry evaluation, and reflective essays.',
      commonMistake: 'Spelled with "ph" and "m" (e-p-h-e-m-e-r-a-l).',
      memoryTip: 'Ephemeral: E-PHEM sounds like "fame"—fame is often fleeting and short-lived.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'gregarious',
      word: 'Gregarious',
      pronunciation: '/ɡrɪˈɡeə.ri.əs/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Everyday',
      simpleMeaning: 'Fond of company; sociable; living in herds or flocks.',
      detailedMeaning: 'Enjoying the company of others; sociable, outgoing, and communicative; in zoology, living in communal flocks or colonies.',
      urduMeaning: 'ملنسار، مجلسی، غول یا جھنڈ بنا کر رہنے والا',
      sindhiMeaning: 'گهلندڙ ملندڙ، سنگتي وڻندڙ، ٽولي ۾ رهندڙ',
      synonyms: ['Sociable', 'Extroverted', 'Convivial', 'Affable', 'Companionable'],
      antonyms: ['Solitary', 'Reclusive', 'Antisocial', 'Introverted', 'Hermitic'],
      examples: {
        simple: 'Sara is exceptionally gregarious and makes friends everywhere she travels.',
        academic: 'Elephants are inherently gregarious mammals that thrive within intricate matriarchal herds.',
        exam: 'The competitive examination interview favors candidates who balance analytical depth with gregarious poise.'
      },
      wordForms: 'gregarious (adj), gregariously (adv), gregariousness (n)',
      collocations: ['gregarious personality', 'gregarious species', 'naturally gregarious'],
      usage: 'Applicable equally to human social interactions and zoological behavior.',
      commonMistake: 'Do not confuse with "egregious" (shockingly bad/outrageous).',
      memoryTip: 'Gregarious = Greg is always with various friends at the party.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'proliferation',
      word: 'Proliferation',
      pronunciation: '/prəˌlɪf.ərˈeɪ.ʃən/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'Rapid increase in numbers; rapid reproduction of cells or items.',
      detailedMeaning: 'A rapid and excessive increase or growth in numbers or cells; expansion and multiplication of biological tissues or weapons.',
      urduMeaning: 'تیزی سے پھیلاؤ، کثرت، خلیات کی تیز رفتار افزائش',
      sindhiMeaning: 'واڌارو، تمام تيزي سان پکڙجڻ، سيلن جو تيزي سان وڌڻ',
      synonyms: ['Multiplication', 'Expansion', 'Propagation', 'Burgeoning', 'Escalation'],
      antonyms: ['Depletion', 'Reduction', 'Contraction', 'Decline', 'Atrophy'],
      examples: {
        simple: 'Unchecked cellular proliferation is the hallmark characteristic of malignant tumors.',
        academic: 'Nuclear non-proliferation treaties were negotiated to prevent geopolitical atomic armaments.',
        exam: 'The unregulated proliferation of unregulated private academies raised serious concerns among education regulators.'
      },
      wordForms: 'proliferate (v), proliferation (n), proliferative (adj)',
      collocations: ['cell proliferation', 'nuclear proliferation', 'rapid proliferation', 'prevent proliferation'],
      usage: 'High-frequency word in MDCAT cancer biology and CSS security essays.',
      commonMistake: 'Verb is proliferate; noun is proliferation.',
      memoryTip: 'Pro-LIFE-ration: generating life and numbers rapidly.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'metastasize',
      word: 'Metastasize',
      pronunciation: '/məˈtæs.tə.saɪz/',
      partOfSpeech: 'verb',
      level: 'Upper Intermediate',
      category: 'Medical',
      simpleMeaning: 'To spread from one part of the body to another (of cancer); to spread uncontrollably.',
      detailedMeaning: 'To spread injuriously from an initial primary site of infection or cancer to distant secondary organs via the lymphatic or vascular system.',
      urduMeaning: 'کینسر کا جسم کے دوسرے حصوں میں پھیلنا، بگاڑ کا پھیلنا',
      sindhiMeaning: 'ڪينسر جو جسم ۾ ڦهلجڻ، برائي جو تيزي سان اڳتي وڌڻ',
      synonyms: ['Disseminate', 'Translocate', 'Spread', 'Infiltrate', 'Permeate'],
      antonyms: ['Localize', 'Contain', 'Confine', 'Encapsulate', 'Restrain'],
      examples: {
        simple: 'Early diagnosis is imperative before the carcinoma metastasizes to the bone marrow.',
        academic: 'Malignant melanoma cells express specific integrins that facilitate their ability to metastasize.',
        exam: 'Public health analysts warned that civic unrest could metastasize into widespread civil insurgency.'
      },
      wordForms: 'metastasize (v), metastasis (n), metastatic (adj)',
      collocations: ['metastasize to lymph nodes', 'tendency to metastasize', 'metastatic tumor'],
      usage: 'Crucial for MDCAT English biological comprehension and figurative political essays.',
      commonMistake: 'Noun is "metastasis" (/məˈtæs.tə.sɪs/), plural is "metastases".',
      memoryTip: 'Meta (change/beyond) + Stasis (standing) = moving beyond the original spot.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'pathogen',
      word: 'Pathogen',
      pronunciation: '/ˈpæθ.ə.dʒən/',
      partOfSpeech: 'noun',
      level: 'Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'A biological bacterium, virus, or microorganism that causes disease.',
      detailedMeaning: 'Any biological agent that can produce infectious disease in a host organism, including viruses, bacteria, protozoa, and fungi.',
      urduMeaning: 'بیماری پیدا کرنے والا جراثیم، مرض آور ایجنٹ',
      sindhiMeaning: 'بيماري پيدا ڪندڙ جراثيم، مرض آڻيندڙ مائڪروب',
      synonyms: ['Infectious agent', 'Microbe', 'Germ', 'Bacterium', 'Virus'],
      antonyms: ['Antibody', 'Probiotic', 'Antidote', 'Antitoxin'],
      examples: {
        simple: 'Handwashing with antiseptic soap eliminates lethal pathogens from skin surfaces.',
        academic: 'The pathogen evades macrophage phagocytosis via an outer polysaccharide capsule.',
        exam: 'Identifying the novel airborne pathogen was critical to containing the localized pulmonary epidemic.'
      },
      wordForms: 'pathogen (n), pathogenic (adj), pathogenesis (n)',
      collocations: ['deadly pathogen', 'bloodborne pathogen', 'airborne pathogen', 'bacterial pathogen'],
      usage: 'Found in almost every MDCAT biological passage and microbiological question.',
      commonMistake: 'Pathogen is the organism; pathogenesis is the mechanism by which it causes disease.',
      memoryTip: 'Patho (disease) + Gen (generator) = disease generator.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'efficacy',
      word: 'Efficacy',
      pronunciation: '/ˈef.ɪ.kə.si/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'The ability of a drug, treatment, or method to produce the desired result.',
      detailedMeaning: 'The capacity for producing a desired therapeutic or functional result; effectiveness under controlled clinical conditions.',
      urduMeaning: 'تاثیر، اثر پذیری، کارگزاری، مطلوبہ نتیجہ پیدا کرنے کی صلاحیت',
      sindhiMeaning: 'اثرائتو هجڻ، اثر ڪرڻ جي طاقت، ڪارگرتا',
      synonyms: ['Effectiveness', 'Potency', 'Competence', 'Virtue', 'Usefulness'],
      antonyms: ['Inefficacy', 'Impotence', 'Futility', 'Inadequacy', 'Uselessness'],
      examples: {
        simple: 'Double-blind trials proved the high efficacy of the experimental vaccine.',
        academic: 'Pharmacologists calculated therapeutic efficacy versus drug toxicity ratios.',
        exam: 'The policy’s ultimate efficacy depended on consistent enforcement across municipal boundaries.'
      },
      wordForms: 'efficacy (n), efficacious (adj), efficaciously (adv)',
      collocations: ['clinical efficacy', 'vaccine efficacy', 'therapeutic efficacy', 'prove efficacy'],
      usage: 'Efficacy is theoretical potential; efficiency relates to speed or cost.',
      commonMistake: 'Do not confuse with efficiency. Efficacy means getting the job done; efficiency means doing it with minimal waste.',
      memoryTip: 'Efficacy = Effect Capacity (the capacity to produce effect).',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'congenital',
      word: 'Congenital',
      pronunciation: '/kənˈdʒen.ɪ.təl/',
      partOfSpeech: 'adjective',
      level: 'Upper Intermediate',
      category: 'Medical',
      simpleMeaning: 'Present from birth (especially a disease, defect, or trait).',
      detailedMeaning: 'Existing at or dating from birth, usually referring to a physical anomaly, medical condition, or constitutional defect.',
      urduMeaning: 'پیدائشی، خلقی، مادر زاد',
      sindhiMeaning: 'ڄمڻ کان وٺي، پيدائشي، جڏهن کان ڄائو هجي',
      synonyms: ['Inborn', 'Innate', 'Hereditary', 'Inherent', 'Constitutional'],
      antonyms: ['Acquired', 'Postnatal', 'Environmental', 'Developed'],
      examples: {
        simple: 'The infant was diagnosed with a congenital heart defect that required pediatric surgery.',
        academic: 'Teratogenic exposure during the first trimester substantially increases congenital anomalies.',
        exam: 'He possessed a congenital distrust of flattery and preferred frank discourse.'
      },
      wordForms: 'congenital (adj), congenitally (adv)',
      collocations: ['congenital defect', 'congenital heart disease', 'congenital condition', 'congenitally blind'],
      usage: 'Contrast with "acquired" (developed after birth through lifestyle or trauma).',
      commonMistake: 'Do not confuse with genial (friendly) or generic.',
      memoryTip: 'Con (with) + Genital (birth/genesis) = born with it.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'lethargic',
      word: 'Lethargic',
      pronunciation: '/ləˈθɑː.dʒɪk/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Medical',
      simpleMeaning: 'Feeling lacking in energy, sluggish, tired, and slow to move.',
      detailedMeaning: 'Characterized by sluggishness, apathy, deficient alertness, and abnormal drowsiness often caused by illness or fatigue.',
      urduMeaning: 'سست، کاہل، نیم بے ہوش، غنودگی زدہ',
      sindhiMeaning: 'سست، سستائي وارو، ڳرو ٿيل، ننڊ اکرائن جهڙو',
      synonyms: ['Sluggish', 'Somnolent', 'Torpid', 'Languid', 'Listless'],
      antonyms: ['Energetic', 'Vigorous', 'Animated', 'Alert', 'Dynamic'],
      examples: {
        simple: 'Dehydration made the marathon runner feel completely lethargic.',
        academic: 'Hypothyroidism frequently causes patients to feel chronically lethargic and cold-intolerant.',
        exam: 'The bureau’s lethargic response to the flash floods drew fierce public condemnation.'
      },
      wordForms: 'lethargy (n), lethargic (adj), lethargically (adv)',
      collocations: ['feel lethargic', 'lethargic patient', 'grow lethargic', 'lethargic response'],
      usage: 'Frequent in both medical triage histories and daily descriptive English.',
      commonMistake: 'Lethargic describes state of energy; lazy is a moral character defect.',
      memoryTip: 'Lethargic sounds like "let\'s-a-park-it" on the sofa and sleep.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'coagulation',
      word: 'Coagulation',
      pronunciation: '/kəʊˌæɡ.jəˈleɪ.ʃən/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'The process of a liquid (especially blood) changing into a semi-solid gel or clot.',
      detailedMeaning: 'The biochemical cascade process by which blood transforms from liquid into solid gel clot to stop hemorrhage.',
      urduMeaning: 'انجمادِ خون، خون کا جمنا، گاڑھا ہونا',
      sindhiMeaning: 'رت ڄمڻ جو عمل، رت جو گوڙهو ٿي بيهڻ',
      synonyms: ['Clotting', 'Curdling', 'Solidification', 'Congealment', 'Thrombosis'],
      antonyms: ['Liquefaction', 'Dissolution', 'Fluidity', 'Dilution'],
      examples: {
        simple: 'Platelets and calcium ions are indispensable for normal blood coagulation.',
        academic: 'Hemophilia is characterized by an intrinsic deficiency in coagulation Factor VIII or IX.',
        exam: 'Heparin acts as an anticoagulant by interrupting the thrombin coagulation cascade.'
      },
      wordForms: 'coagulate (v), coagulation (n), coagulant (n), coagulated (adj)',
      collocations: ['blood coagulation', 'coagulation cascade', 'coagulation factor', 'coagulation disorder'],
      usage: 'Key MDCAT human biology term and English scientific reading comprehension term.',
      commonMistake: 'Coagulate is the verb; coagulation is the noun.',
      memoryTip: 'Coagulate: Clog + gel together.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'benign',
      word: 'Benign',
      pronunciation: '/bɪˈnaɪn/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'Medical',
      simpleMeaning: 'Gentle, kind; in medicine, not cancerous or harmful.',
      detailedMeaning: 'Of a mild, gentle disposition; in pathology, non-malignant, self-limiting, and unlikely to invade surrounding tissues or metastasize.',
      urduMeaning: 'بے ضرر، غیر مہلک، شفیق، رحیم',
      sindhiMeaning: 'بي ضرر، غير هاڃيڪار، مهربان، نرم دل',
      synonyms: ['Non-malignant', 'Harmless', 'Innocuous', 'Gentle', 'Benevolent'],
      antonyms: ['Malignant', 'Pernicious', 'Harmful', 'Hostile', 'Virulent'],
      examples: {
        simple: 'The biopsy confirmed that the breast tumor was fortunately benign.',
        academic: 'Benign prostatic hyperplasia occurs commonly in aging males due to hormonal shifts.',
        exam: 'The king was remembered for his benign rule and broad civic tolerance.'
      },
      wordForms: 'benign (adj), benignly (adv), benignity (n)',
      collocations: ['benign tumor', 'benign neglect', 'benign smile', 'essentially benign'],
      usage: 'Direct opposite of malignant in clinical medicine.',
      commonMistake: 'Pronounce the "g" as silent (/bɪˈnaɪn/), not /be-nig-n/.',
      memoryTip: 'Benign = Be Nice (not harmful).',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'prognosis',
      word: 'Prognosis',
      pronunciation: '/prɒɡˈnəʊ.sɪs/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'Medical',
      simpleMeaning: 'A doctor’s forecast or prediction of the likely outcome of a disease.',
      detailedMeaning: 'A medical prediction of the probable course, duration, and outcome of a disease based on clinical diagnostic data.',
      urduMeaning: 'مرض کی پیشین گوئی، صحتیابی کے امکانات کا تخمینہ',
      sindhiMeaning: 'بيماريءَ جي نتيجي جو اندازو، علاج کانپوءِ اميد',
      synonyms: ['Prediction', 'Forecast', 'Projection', 'Prospect', 'Outlook'],
      antonyms: ['History', 'Retrospect', 'Retrospection', 'Anamnesis'],
      examples: {
        simple: 'With early surgical intervention, the patient’s overall prognosis is excellent.',
        academic: 'Oncologists factored tumor stage and histological grade into the long-term prognosis.',
        exam: 'Economic forecasters offered a gloomy prognosis for the national balance of payments.'
      },
      wordForms: 'prognosis (n), prognostic (adj), prognosticate (v)',
      collocations: ['poor prognosis', 'favorable prognosis', 'long-term prognosis', 'clinical prognosis'],
      usage: 'Used for both medical recovery forecasts and general economic or strategic forecasts.',
      commonMistake: 'Diagnosis identifies what the disease is; prognosis predicts what will happen next.',
      memoryTip: 'Diagnosis = Definition of disease; Prognosis = Prediction of progress.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'asymptomatic',
      word: 'Asymptomatic',
      pronunciation: '/ˌeɪ.sɪmp.təˈmæt.ɪk/',
      partOfSpeech: 'adjective',
      level: 'Intermediate',
      category: 'MDCAT',
      simpleMeaning: 'Showing no symptoms or signs of a disease even when infected.',
      detailedMeaning: 'Producing or showing no subjective or objective signs or clinical indications of disease despite harboring an infection.',
      urduMeaning: 'بغیر علامات، جس میں بیماری کی ظاہری علامت نہ ہو',
      sindhiMeaning: 'بنا علامتن جي، ظاهري نشاني کانسواءِ، بي علامت',
      synonyms: ['Symptomless', 'Subclinical', 'Silent', 'Unapparent', 'Latent'],
      antonyms: ['Symptomatic', 'Manifest', 'Overt', 'Symptom-bearing'],
      examples: {
        simple: 'Many carriers of the viral infection remain completely asymptomatic.',
        academic: 'Asymptomatic transmission complicates contact tracing efforts during respiratory pandemics.',
        exam: 'Hypertension is dubbed a silent killer because patients frequently remain asymptomatic for decades.'
      },
      wordForms: 'asymptomatic (adj), asymptomatically (adv)',
      collocations: ['asymptomatic carrier', 'asymptomatic infection', 'remain asymptomatic'],
      usage: 'Greek prefix "A-" means "without". Without symptoms.',
      commonMistake: 'Asymptomatic individuals can still transmit pathogens to vulnerable populations.',
      memoryTip: 'A (No) + Symptomatic (Symptoms) = No symptoms.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'cacophony',
      word: 'Cacophony',
      pronunciation: '/kəˈkɒf.ə.ni/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'Literature',
      simpleMeaning: 'A harsh, unpleasant mixture of loud sounds.',
      detailedMeaning: 'A harsh, discordant, jarring mixture of sounds, noises, or voices that clash unpleasantly on the ear.',
      urduMeaning: 'بے ہنگم آوازیں، ناگوار شور و غل، بھدی آواز',
      sindhiMeaning: 'ڪَن چيريندو گڙٻڙ وارو آواز، ناگوار گوڙ، بي تالو گوڙ',
      synonyms: ['Dissonance', 'Discord', 'Clamor', 'Racket', 'Din'],
      antonyms: ['Harmony', 'Euphony', 'Symphony', 'Melody', 'Accord'],
      examples: {
        simple: 'The cacophony of car horns in the rush-hour market gave him a severe headache.',
        academic: 'Poets utilize cacophony with hard consonants like \'k\' and \'g\' to evoke conflict and violence.',
        exam: 'The quiet rural morning was shattered by the deafening cacophony of construction artillery.'
      },
      wordForms: 'cacophony (n), cacophonous (adj), cacophonously (adv)',
      collocations: ['deafening cacophony', 'cacophony of sounds', 'cacophony of voices'],
      usage: 'Opposite of euphony (pleasant sound). High-frequency in CSS English Précis.',
      commonMistake: 'Do not pronounce as /ca-co-phony/; stress is on the second syllable /kəˈkɒf-/.',
      memoryTip: 'Cacophony sounds like a coughing cow causing harsh noise.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'catharsis',
      word: 'Catharsis',
      pronunciation: '/kəˈθɑː.sɪs/',
      partOfSpeech: 'noun',
      level: 'Advanced',
      category: 'Literature',
      simpleMeaning: 'The release of strong emotional tension, especially through art, drama, or music.',
      detailedMeaning: 'The process of releasing, and thereby providing relief from, strong or repressed emotions, notably through tragedy or psychotherapy.',
      urduMeaning: 'تطہیر، جذباتی بوجھ سے نجات، تزکیہ نفس',
      sindhiMeaning: 'دل جو هلڪو ٿيڻ، جذبن جي صفائي، روحاني سڪون',
      synonyms: ['Purification', 'Purgation', 'Release', 'Cleansing', 'Deliverance'],
      antonyms: ['Repression', 'Suppression', 'Inhibition', 'Restraint'],
      examples: {
        simple: 'Weeping at the end of the tragic novel gave the reader an unexpected sense of catharsis.',
        academic: 'Aristotle’s Poetics posits that dramatic tragedy evokes pity and terror to achieve moral catharsis.',
        exam: 'Journaling provided the grief-stricken soldier a vital outlet for psychological catharsis.'
      },
      wordForms: 'catharsis (n), cathartic (adj), cathartically (adv)',
      collocations: ['emotional catharsis', 'achieve catharsis', 'experience catharsis', 'cathartic release'],
      usage: 'Quintessential literary theory concept tested in English Literature and CSS.',
      commonMistake: 'Noun is catharsis; adjective is cathartic.',
      memoryTip: 'Catharsis cleanses internal emotional chaos.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'epiphany',
      word: 'Epiphany',
      pronunciation: '/ɪˈpɪf.ən.i/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'Literature',
      simpleMeaning: 'A sudden, powerful realization or moment of deep clarity.',
      detailedMeaning: 'A moment of sudden and profound revelation, intuitive insight, or sudden realization that changes one’s outlook.',
      urduMeaning: 'اچانک بصیرت، سچائی کا انکشاف، لمحہِ ادراک',
      sindhiMeaning: 'اوچتي سمجهه، اندرين روشني، سچائيءَ جو پڌرو ٿيڻ',
      synonyms: ['Revelation', 'Realization', 'Insight', 'Enlightenment', 'Awakening'],
      antonyms: ['Confusion', 'Oblivion', 'Ignorance', 'Blindness', 'Misapprehension'],
      examples: {
        simple: 'While observing falling apples, the young scholar experienced an intellectual epiphany.',
        academic: 'In modern literature, James Joyce perfected the narrative epiphany to mark psychological growth.',
        exam: 'She had an epiphany regarding the root cause of her academic procrastination and immediately adjusted her schedule.'
      },
      wordForms: 'epiphany (n), epiphanic (adj)',
      collocations: ['sudden epiphany', 'experience an epiphany', 'moment of epiphany'],
      usage: 'James Joyce popularized epiphany as a key concept in short story analysis.',
      commonMistake: 'Spelled with "ph", not "f" (e-p-i-p-h-a-n-y).',
      memoryTip: 'Epiphany = An "Aha!" epiphany moment.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'hubris',
      word: 'Hubris',
      pronunciation: '/ˈhjuː.brɪs/',
      partOfSpeech: 'noun',
      level: 'Advanced',
      category: 'Literature',
      simpleMeaning: 'Excessive pride, overconfidence, or arrogance leading to a downfall.',
      detailedMeaning: 'Excessive pride or self-confidence; in classical tragedy, fatal arrogance toward the gods leading to tragic ruin.',
      urduMeaning: 'غرور، تکبر، پندار، حد سے زیادہ خود اعتمادی جو تباہی لائے',
      sindhiMeaning: 'وڏائي، تڪبر، غرور جنهن سان تباهي ٿئي',
      synonyms: ['Arrogance', 'Conceit', 'Haughtiness', 'Overconfidence', 'Pretension'],
      antonyms: ['Humility', 'Modesty', 'Meekness', 'Diffidence', 'Self-effacement'],
      examples: {
        simple: 'The general’s hubris made him believe his army could never be outmaneuvered.',
        academic: 'In Greek tragedies like Oedipus Rex, hubris invariably provokes divine nemesis.',
        exam: 'The tech titan’s hubris blinded him to the imminent collapse of his leveraged portfolio.'
      },
      wordForms: 'hubris (n), hubristic (adj), hubristically (adv)',
      collocations: ['tragic hubris', 'blind hubris', 'hubristic ambition'],
      usage: 'Classic term in tragedy analysis, historical political analyses, and CSS exams.',
      commonMistake: 'Do not confuse with pride alone. Hubris is specifically pride that causes destruction.',
      memoryTip: 'Hubris = Huge Bragging brings Ruin.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'enervate',
      word: 'Enervate',
      pronunciation: '/ˈen.ə.veɪt/',
      partOfSpeech: 'verb',
      level: 'Expert',
      category: 'CSS',
      simpleMeaning: 'To drain someone of energy, vitality, or strength.',
      detailedMeaning: 'To cause someone to feel drained of energy or vitality; weaken physically or mentally.',
      urduMeaning: 'کمزور کر دینا، توانائی نچوڑ لینا، بے دم کرنا',
      sindhiMeaning: 'طاقت ختم ڪرڻ، ضعيف بڻائڻ، دم نڪري وڃڻ',
      synonyms: ['Exhaust', 'Debilitate', 'Fatigue', 'Sap', 'Devitalize'],
      antonyms: ['Invigorate', 'Energize', 'Animate', 'Strengthen', 'Rejuvenate'],
      examples: {
        simple: 'The scorching desert heat enervated the infantry battalions within hours.',
        academic: 'Protracted institutional inertia can enervate even the most passionate reform movements.',
        exam: 'Prolonged bureaucratic delays served only to enervate foreign investor confidence.'
      },
      wordForms: 'enervate (v), enervating (adj), enervation (n)',
      collocations: ['enervate the soul', 'enervating humidity', 'enervate resolve'],
      usage: 'EXTREMELY common trap in CSS! It looks like "energize", but means the EXACT OPPOSITE.',
      commonMistake: 'Never confuse with energize! Enervate means WEAKEN and SAP energy.',
      memoryTip: 'E-NERV-ate: To remove the nerves and energy from someone.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'equivocate',
      word: 'Equivocate',
      pronunciation: '/ɪˈkwɪv.ə.keɪt/',
      partOfSpeech: 'verb',
      level: 'Expert',
      category: 'CSS',
      simpleMeaning: 'To speak vaguely or ambiguously in order to mislead or avoid the truth.',
      detailedMeaning: 'Use ambiguous language so as to conceal the truth or avoid committing oneself to a position.',
      urduMeaning: 'گول مول بات کرنا، تذبذب میں ڈالنا، حقائق چھپانا',
      sindhiMeaning: 'گول مول ڳالهائڻ، صاف جواب نه ڏيڻ، دوکي واري زبان',
      synonyms: ['Prevaricate', 'Hedge', 'Vacillate', 'Evade', 'Palter'],
      antonyms: ['Clarify', 'Confront', 'Articulate', 'Avow', 'Declare'],
      examples: {
        simple: 'When questioned about his campaign financing, the politician chose to equivocate.',
        academic: 'Macbeth’s witches speak in riddles designed to equivocate and lure him to doom.',
        exam: 'Under aggressive cross-examination, the witness could no longer equivocate and confessed.'
      },
      wordForms: 'equivocate (v), equivocation (n), equivocator (n), equivocal (adj)',
      collocations: ['refuse to equivocate', 'deliberately equivocate', 'equivocal response'],
      usage: 'Famous from Shakespeare\'s Macbeth Porter scene. High-frequency in CSS précis.',
      commonMistake: 'Equivocal means ambiguous; unequivocal means crystal clear and unambiguous.',
      memoryTip: 'Equivocate: Equal-voice on both sides so no one knows what you actually mean.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'juxtaposition',
      word: 'Juxtaposition',
      pronunciation: '/ˌdʒʌk.stə.pəˈzɪʃ.ən/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'Literature',
      simpleMeaning: 'Placing two things close together to highlight their differences and contrasts.',
      detailedMeaning: 'The fact of two things being seen or placed close together with contrasting effect in literature, photography, or argument.',
      urduMeaning: 'پہلو بہ پہلو تقابل، آمنے سامنے رکھ کر فرق واضح کرنا',
      sindhiMeaning: 'پاسي ۾ رکي ڀيٽ ڪرڻ، ٻن شين جو ويجهو رکيل فرق',
      synonyms: ['Collocation', 'Contrast', 'Comparison', 'Proximity', 'Apposition'],
      antonyms: ['Separation', 'Distance', 'Isolation', 'Dissociation'],
      examples: {
        simple: 'The painting juxtaposed a decaying slum alongside opulent high-rise penthouses.',
        academic: 'Dickens masterfully opens A Tale of Two Cities with the juxtaposition of best and worst times.',
        exam: 'The essayist relied on the juxtaposition of pastoral serenity and urban grit to establish thematic conflict.'
      },
      wordForms: 'juxtapose (v), juxtaposition (n), juxtapositional (adj)',
      collocations: ['stark juxtaposition', 'jarring juxtaposition', 'poetic juxtaposition'],
      usage: 'Standard tool in literary criticism, poetry, film analysis, and rhetoric.',
      commonMistake: 'Juxtaposition is the noun; juxtapose is the verb.',
      memoryTip: 'Just-position two contrasting ideas side-by-side.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'pedantic',
      word: 'Pedantic',
      pronunciation: '/pɪˈdæn.tɪk/',
      partOfSpeech: 'adjective',
      level: 'Advanced',
      category: 'CSS',
      simpleMeaning: 'Too worried about small rules or trivial details; showing off formal learning.',
      detailedMeaning: 'Excessively concerned with minor details, formal rules, or displaying academic learning in a tedious manner.',
      urduMeaning: 'معمولی اصولوں پر اڑنے والا، علم بگھارنے والا، خود نما استاد',
      sindhiMeaning: 'ننڍڙين ڳالهين تي اٽڪندڙ، ڏاهپ جو ڏيکاءُ ڪندڙ',
      synonyms: ['Fussy', 'Doctrinaire', 'Punctilious', 'Academic', 'Overexacting'],
      antonyms: ['Broad-minded', 'Informal', 'Pragmatic', 'Forgiving', 'Carefree'],
      examples: {
        simple: 'His pedantic insistence on correcting everyone’s spelling in informal group chats alienated his friends.',
        academic: 'Scholars warned against pedantic squabbles over comma placement when the philosophical thesis was sound.',
        exam: 'The reviewer dismissed the monograph as pedantic compilation devoid of genuine intellectual novelty.'
      },
      wordForms: 'pedant (n), pedantic (adj), pedantically (adv), pedantry (n)',
      collocations: ['pedantic detail', 'pedantic manner', 'insufferably pedantic'],
      usage: 'Always holds a slightly negative connotation of tedious perfectionism.',
      commonMistake: 'Do not confuse pedantic with educational or didactic. Pedantic is irritatingly narrow.',
      memoryTip: 'Pedantic: The person won\'t let you take one ped-step without checking grammar.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'rhetoric',
      word: 'Rhetoric',
      pronunciation: '/ˈret.ər.ɪk/',
      partOfSpeech: 'noun',
      level: 'Upper Intermediate',
      category: 'CSS',
      simpleMeaning: 'The art of persuasive speaking or writing; sometimes empty language.',
      detailedMeaning: 'The art of effective or persuasive speaking or writing, especially the exploitation of figures of speech, or insincere language designed to persuade.',
      urduMeaning: 'فنِ خطابت، بلاغت، فصاحت، لفاظی، پُر اثر گفتگو',
      sindhiMeaning: 'تقرير جو فن، فصاحت، دل وٺندڙ ڳالهائڻ، خوش بياني',
      synonyms: ['Oratory', 'Eloquence', 'Persuasion', 'Grandiloquence', 'Discourse'],
      antonyms: ['Inarticulacy', 'Quietude', 'Directness', 'Simplicity'],
      examples: {
        simple: 'The speaker used powerful rhetoric to inspire the graduating medical students.',
        academic: 'Aristotle categorized rhetoric into ethos (credibility), pathos (emotion), and logos (logic).',
        exam: 'Behind all the political rhetoric lay no concrete fiscal plan for deficit reduction.'
      },
      wordForms: 'rhetoric (n), rhetorical (adj), rhetorically (adv), rhetorician (n)',
      collocations: ['political rhetoric', 'empty rhetoric', 'rhetorical question', 'master of rhetoric'],
      usage: 'Can mean both admirable eloquence and cynical wordplay.',
      commonMistake: 'Stress is on the first syllable: RHET-o-ric.',
      memoryTip: 'Rhetoric = Realistic or Hearing-appealing Oratory Technique.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'ineffable',
      word: 'Ineffable',
      pronunciation: '/ɪnˈef.ə.bəl/',
      partOfSpeech: 'adjective',
      level: 'Expert',
      category: 'Literature',
      simpleMeaning: 'Too great, beautiful, or profound to be expressed in words.',
      detailedMeaning: 'Too great or extreme to be expressed or described in human words; transcendent, unutterable, and sublime.',
      urduMeaning: 'ناقابلِ بیان، جو لفظوں میں بیان نہ ہو سکے، ماورائے بیان',
      sindhiMeaning: 'لفظن کان مٿانهون، جيڪو بيان نه ٿي سگهي، اڻ ڳڻيو حسن',
      synonyms: ['Indescribable', 'Inexpressible', 'Unutterable', 'Transcendent', 'Nameless'],
      antonyms: ['Describable', 'Expressible', 'Definable', 'Articulable'],
      examples: {
        simple: 'Watching the sunrise over the Himalayas filled her with ineffable joy.',
        academic: 'Mystics across traditions describe their union with the divine as an ineffable transcendence.',
        exam: 'The mother felt an ineffable sense of relief when her child regained consciousness.'
      },
      wordForms: 'ineffable (adj), ineffably (adv), ineffability (n)',
      collocations: ['ineffable beauty', 'ineffable joy', 'ineffable sadness', 'ineffably profound'],
      usage: 'Latin "effari" (to speak out). In- (not) + effable (speakable).',
      commonMistake: 'Not to be confused with indelible (cannot be erased).',
      memoryTip: 'In-EFF-able: Unable to put into syllables (words).',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'esoteric',
      word: 'Esoteric',
      pronunciation: '/ˌes.əˈter.ɪk/',
      partOfSpeech: 'adjective',
      level: 'Expert',
      category: 'Academic',
      simpleMeaning: 'Intended for or likely to be understood by only a small number of specialists.',
      detailedMeaning: 'Intended for or likely to be understood by only a specialized inner circle with enlightened or esoteric knowledge.',
      urduMeaning: 'پوشیدہ، باطنی، محض خواص کی سمجھ میں آنے والا، دقیق',
      sindhiMeaning: 'ڳجهه وارو، خاص ماڻهن جي سمجهه ۾ ايندڙ، ڏکيو علم',
      synonyms: ['Arcane', 'Abstruse', 'Recondite', 'Occult', 'Enigmatic'],
      antonyms: ['Exoteric', 'Accessible', 'Common', 'Public', 'Elementary'],
      examples: {
        simple: 'Quantum field theory can seem esoteric to anyone outside theoretical physics.',
        academic: 'The medieval monastery possessed an extensive archive of esoteric astrological texts.',
        exam: 'The seminar avoided esoteric jargon so that undergraduate students could follow the legal debate.'
      },
      wordForms: 'esoteric (adj), esoterically (adv), esotericism (n)',
      collocations: ['esoteric knowledge', 'esoteric debate', 'highly esoteric', 'esoteric terminology'],
      usage: 'Opposite is "exoteric" (suited for the general public).',
      commonMistake: 'Do not confuse with eccentric (unconventional or quirky).',
      memoryTip: 'Esoteric knowledge is for the "inner circle".',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'verisimilitude',
      word: 'Verisimilitude',
      pronunciation: '/ˌver.ɪ.sɪˈmɪl.ɪ.tjuːd/',
      partOfSpeech: 'noun',
      level: 'Expert',
      category: 'Literature',
      simpleMeaning: 'The appearance or feeling of being true, real, or lifelike in fiction.',
      detailedMeaning: 'The appearance of being true or real; the quality of realism in a work of literature, theater, or cinema that convinces the audience.',
      urduMeaning: 'سچائی کا گمان، حقیقت پسندی، واقعیت، سچ جیسا ہونا',
      sindhiMeaning: 'سچائيءَ جو احساس، حقيقت نگاري، هوبهو سچ جهڙو لڳڻ',
      synonyms: ['Realism', 'Authenticity', 'Plausibility', 'Truthfulness', 'Credibility'],
      antonyms: ['Falsity', 'Artificiality', 'Implausibility', 'Unreality'],
      examples: {
        simple: 'The historical novel achieved great verisimilitude by accurately describing period clothing.',
        academic: 'Realist dramatists insist upon strict verisimilitude in dialogue to capture everyday conversational rhythm.',
        exam: 'The film’s uncanny verisimilitude regarding surgical procedures impressed veteran practitioners.'
      },
      wordForms: 'verisimilitude (n), verisimilar (adj)',
      collocations: ['heighten verisimilitude', 'aura of verisimilitude', 'strive for verisimilitude'],
      usage: 'From Latin "veri" (true) + "similis" (similar).',
      commonMistake: 'Spelled with double \'i\'s: ver-i-sim-il-i-tude.',
      memoryTip: 'Verisimilitude = Very Similar to Truth.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'sublime',
      word: 'Sublime',
      pronunciation: '/səˈblaɪm/',
      partOfSpeech: 'adjective',
      level: 'Advanced',
      category: 'Literature',
      simpleMeaning: 'Of very great excellence, beauty, or grandeur that inspires awe.',
      detailedMeaning: 'Of such excellence, grandeur, or beauty as to inspire great admiration or awe; in Romantic aesthetics, terrifyingly magnificent nature.',
      urduMeaning: 'عظیم الشان، پر شکوہ، رفیع، مسحور کن حسن',
      sindhiMeaning: 'نهايت اعليٰ، شاندار، دل موهيندڙ، سڀ کان مٿاهون',
      synonyms: ['Exalted', 'Majestic', 'Glorious', 'Transcendent', 'Noble'],
      antonyms: ['Ordinary', 'Mundane', 'Base', 'Trivial', 'Grotesque'],
      examples: {
        simple: 'The view of the northern star lit glacier from the base camp was simply sublime.',
        academic: 'Edmund Burke distinguished between the beautiful (pleasing) and the sublime (vast and overwhelming).',
        exam: 'Beethoven’s Ninth Symphony remains a sublime monument of human artistic composition.'
      },
      wordForms: 'sublime (adj), sublimely (adv), sublimity (n), sublimate (v)',
      collocations: ['sublime beauty', 'sublime experience', 'sublime artistry'],
      usage: 'Crucial concept in Romantic English poetry (Wordsworth, Coleridge, Keats).',
      commonMistake: 'Do not confuse with subliminal (below threshold of conscious sensation).',
      memoryTip: 'Sublime = Sublimely Limelight Excellence.',
      visual: VisualSVGs.defaultVisual
    },
    {
      id: 'melancholy',
      word: 'Melancholy',
      pronunciation: '/ˈmel.əŋ.kɒl.i/',
      partOfSpeech: 'noun',
      level: 'Intermediate',
      category: 'Literature',
      simpleMeaning: 'A deep, pensive, and gentle sadness with no obvious cause.',
      detailedMeaning: 'A feeling of pensive sadness, typically with no obvious cause; also historical humor associated with black bile.',
      urduMeaning: 'افسردگی، اداسی، یاسیت، ملال',
      sindhiMeaning: 'ڏک، اداسي، غمگيني، اڪيلائي جو احساس',
      synonyms: ['Sorrow', 'Despondency', 'Gloom', 'Wistfulness', 'Dejection'],
      antonyms: ['Cheerfulness', 'Exuberance', 'Gaiety', 'Jubilation', 'Joy'],
      examples: {
        simple: 'The rainy autumn afternoon cast a sweet melancholy over the quiet room.',
        academic: 'Keats explored the paradox that beauty and melancholy are inextricably bound in his famous odes.',
        exam: 'Her haunting violin solo evoked a deep melancholy among the concert audience.'
      },
      wordForms: 'melancholy (n/adj), melancholic (adj), melancholically (adv)',
      collocations: ['deep melancholy', 'tinge of melancholy', 'melancholy mood'],
      usage: 'Can function as both noun ("filled with melancholy") and adjective ("a melancholy melody").',
      commonMistake: 'Stress on the first syllable: MEL-an-choly.',
      memoryTip: 'Melan (black) + choly (bile) = dark, heavy pensive sadness.',
      visual: VisualSVGs.defaultVisual
    }
  ];

  // -------------------------------------------------------------------------
  // 3. CONFUSING WORDS PAIRS DATASET
  // -------------------------------------------------------------------------
  const ConfusingWordsData = [
    {
      pair: 'Affect vs Effect',
      category: 'High-Frequency Exam Trap',
      wordA: {
        word: 'Affect',
        pos: 'Verb (usually)',
        meaning: 'To influence, impact, or produce a change in something.',
        example: 'High altitude and low oxygen levels severely affect respiratory endurance.',
        urdu: 'اثر انداز ہونا (فعل)'
      },
      wordB: {
        word: 'Effect',
        pos: 'Noun (usually)',
        meaning: 'The result, consequence, or outcome of an action or event.',
        example: 'The therapeutic effect of the antibiotic was observed within twenty-four hours.',
        urdu: 'اثر، نتیجہ (اسم)'
      },
      memoryTrick: 'Remember RAVEN: Remember Affect Verb, Effect Noun.'
    },
    {
      pair: 'Accept vs Except',
      category: 'Spelling & Semantic Pair',
      wordA: {
        word: 'Accept',
        pos: 'Verb',
        meaning: 'To willingly receive, take, or agree to something.',
        example: 'The candidate was honored to accept the prestigious university scholarship.',
        urdu: 'قبول کرنا، ماننا'
      },
      wordB: {
        word: 'Except',
        pos: 'Preposition / Conjunction',
        meaning: 'Excluding; not including; other than.',
        example: 'All biochemical laboratory samples were tested, except the contaminated batch.',
        urdu: 'سوائے، علاوہ'
      },
      memoryTrick: 'EXcept EXcludes things (starts with EX).'
    },
    {
      pair: 'Advice vs Advise',
      category: 'Noun vs Verb Pair',
      wordA: {
        word: 'Advice',
        pos: 'Noun',
        meaning: 'An opinion or recommendation offered about what should be done.',
        example: 'The mentor offered invaluable advice on mastering the MDCAT syllabus.',
        urdu: 'نصیحت، مشورہ (اسم)'
      },
      wordB: {
        word: 'Advise',
        pos: 'Verb',
        meaning: 'To offer suggestions, recommendations, or formal guidance.',
        example: 'Physicians advise patients to maintain regular physical activity.',
        urdu: 'نصیحت کرنا، مشورہ دینا (فعل)'
      },
      memoryTrick: 'Advise has an "S" for Sound/Speech (you speak when you advise = verb).'
    },
    {
      pair: 'Principal vs Principle',
      category: 'Homophone Homonym',
      wordA: {
        word: 'Principal',
        pos: 'Noun / Adjective',
        meaning: 'The head of a school; chief, main, primary in importance.',
        example: 'The principal investigator published the pivotal clinical trials data.',
        urdu: 'سربراہ، بنیادی، سب سے اہم'
      },
      wordB: {
        word: 'Principle',
        pos: 'Noun only',
        meaning: 'A fundamental truth, rule, law of science, or moral conviction.',
        example: 'Le Chatelier’s principle explains chemical equilibrium responses to stress.',
        urdu: 'اصول، قانون، ضابطہ'
      },
      memoryTrick: 'The school PrinciPAL is your PAL; a princiPLE is a scientific ruLE (both end in LE).'
    },
    {
      pair: 'Stationary vs Stationery',
      category: 'MDCAT / CSS Error Correction',
      wordA: {
        word: 'Stationary',
        pos: 'Adjective',
        meaning: 'Not moving, fixed in one place, static.',
        example: 'The vehicle remained stationary at the red traffic signal.',
        urdu: 'ساکن، غیر متحرک'
      },
      wordB: {
        word: 'Stationery',
        pos: 'Noun',
        meaning: 'Writing materials like pens, paper, envelopes, and notebooks.',
        example: 'Candidates must bring their own exam stationery and transparent pencil cases.',
        urdu: 'لکھنے پڑھنے کا سامان، قلم و کاغذ'
      },
      memoryTrick: 'StationEry with an "E" is for Envelopes and Erasers.'
    },
    {
      pair: 'Compliment vs Complement',
      category: 'Precision Vocabulary',
      wordA: {
        word: 'Compliment',
        pos: 'Noun / Verb',
        meaning: 'An expression of praise, admiration, or polite congratulations.',
        example: 'The examiner paid her a sincere compliment on her analytical essay.',
        urdu: 'تعریف، داد و تحسین'
      },
      wordB: {
        word: 'Complement',
        pos: 'Noun / Verb',
        meaning: 'Something that completes, balances, or brings to perfection.',
        example: 'The red cell infusion complemented the patient’s volume recovery protocol.',
        urdu: 'تکمیل کرنے والی چیز، پورا کرنا'
      },
      memoryTrick: 'ComplEment with an "E" complEtes something.'
    },
    {
      pair: 'Discrete vs Discreet',
      category: 'CSS & Competitive Exam',
      wordA: {
        word: 'Discrete',
        pos: 'Adjective',
        meaning: 'Individually separate, distinct, and detached.',
        example: 'The data set was partitioned into discrete, non-overlapping categories.',
        urdu: 'الگ الگ، جداگانہ، غیر مسلسل'
      },
      wordB: {
        word: 'Discreet',
        pos: 'Adjective',
        meaning: 'Careful and prudent in speech or actions to keep something secret.',
        example: 'The diplomat made discreet inquiries regarding the hostage negotiations.',
        urdu: 'محتاط، رازدار، سنجیدہ'
      },
      memoryTrick: 'In discrEEt, the two "ee"s are huddled together whispering secretly.'
    }
  ];

  // -------------------------------------------------------------------------
  // 4. IDIOMS & PHRASAL VERBS DATASET
  // -------------------------------------------------------------------------
  const IdiomsData = [
    {
      phrase: 'Bite the bullet',
      type: 'idiom',
      meaning: 'To force yourself to face a difficult or unpleasant situation with courage.',
      urdu: 'ناخوشگوار صورتحال کو مجبورا لیکن ہمت سے برداشت کرنا',
      example: 'After delaying for weeks, she bit the bullet and sat down for the 6-hour mock exam.'
    },
    {
      phrase: 'Burn the midnight oil',
      type: 'idiom',
      meaning: 'To work or study late into the night.',
      urdu: 'دیر رات تک جاگ کر محنت سے پڑھنا یا کام کرنا',
      example: 'Aspiring CSS candidates routinely burn the midnight oil reviewing historical archives.'
    },
    {
      phrase: 'Once in a blue moon',
      type: 'idiom',
      meaning: 'Very rarely; happening on rare occasions.',
      urdu: 'شاذ و نادر، کبھی کبھار، عید کا چاند ہونا',
      example: 'A student scoring cent percent on this organic chemistry test occurs once in a blue moon.'
    },
    {
      phrase: 'The ball is in your court',
      type: 'idiom',
      meaning: 'It is your turn or responsibility to take the next decision or action.',
      urdu: 'اب فیصلہ اور اگلا قدم آپ کے ہاتھ میں ہے',
      example: 'The committee has made its offer; the ball is now in the applicant\'s court.'
    },
    {
      phrase: 'Look after',
      type: 'phrasal',
      meaning: 'To take care of or be responsible for someone or something.',
      urdu: 'دیکھ بھال کرنا، خیال رکھنا',
      example: 'Nurses look after intensive care patients with meticulous clinical dedication.'
    },
    {
      phrase: 'Call off',
      type: 'phrasal',
      meaning: 'To cancel an event, plan, or scheduled activity.',
      urdu: 'منسوخ کرنا، ملتوی کر کے ختم کرنا',
      example: 'Due to torrential monsoon storms, the university called off the morning lectures.'
    },
    {
      phrase: 'Carry out',
      type: 'phrasal',
      meaning: 'To perform, execute, or complete an instruction, task, or experiment.',
      urdu: 'کسی کام یا تجربے کو انجام دینا، عمل درآمد کرنا',
      example: 'The laboratory team will carry out the enzyme titration protocol today.'
    },
    {
      phrase: 'Put up with',
      type: 'phrasal',
      meaning: 'To tolerate, endure, or bear an unpleasant person or situation.',
      urdu: 'برداشت کرنا، صبر و تحمل سے سہنا',
      example: 'The hospital staff refuse to put up with disrespectful behavior from visitors.'
    }
  ];

  // -------------------------------------------------------------------------
  // 5. ONE-WORD SUBSTITUTIONS DATASET
  // -------------------------------------------------------------------------
  const SubstitutionsData = [
    {
      description: 'A person who loves, supports, and donates money to help humanity',
      substitution: 'Philanthropist',
      urduSindhi: 'انسان دوست / انسان ذات جو خيرخواه',
      category: 'Human Nature',
      example: 'Abdul Sattar Edhi was a revered philanthropist whose ambulance network served millions.'
    },
    {
      description: 'A person who hates or distrusts humankind',
      substitution: 'Misanthrope',
      urduSindhi: 'مردم بیزار / انسانن کان نفرت ڪندڙ',
      category: 'Human Nature',
      example: 'Following years of bitter deceit, the recluse became a confirmed misanthrope.'
    },
    {
      description: 'A person who speaks or commands multiple languages fluently',
      substitution: 'Polyglot',
      urduSindhi: 'کثیر اللسان / گهڻيون ٻوليون ڄاڻيندڙ',
      category: 'Language',
      example: 'As a gifted polyglot, the interpreter translated between Urdu, Sindhi, Arabic, and English.'
    },
    {
      description: 'One who knows everything; infinitely knowledgeable',
      substitution: 'Omniscient',
      urduSindhi: 'علیمِ کل، ہر بات جاننے والا / سڀ ڪجهه ڄاڻندڙ',
      category: 'Theology & Philosophy',
      example: 'The novel is told through the perspective of an omniscient third-person narrator.'
    },
    {
      description: 'A remedy or medicine believed to cure all diseases or troubles',
      substitution: 'Panacea',
      urduSindhi: 'اکسیرِ اعظم، تریاق / سڀني بيمارين جو علاج',
      category: 'Medicine',
      example: 'Education is considered the greatest panacea for eradicating poverty and ignorance.'
    },
    {
      description: 'Incapable of making mistakes or being wrong',
      substitution: 'Infallible',
      urduSindhi: 'خطا سے پاک، معصوم / غلطي نه ڪندڙ',
      category: 'Character',
      example: 'Even sophisticated AI diagnostic models are not completely infallible and require clinical oversight.'
    }
  ];

  // -------------------------------------------------------------------------
  // 6. APPLICATION STATE & PERSISTENCE
  // -------------------------------------------------------------------------
  const STORAGE_KEYS = {
    THEME: 'edunovix_vocab_theme',
    LEARNED: 'edunovix_vocab_learned',
    FAVORITES: 'edunovix_vocab_favorites',
    WORD_STATUS: 'edunovix_vocab_status',
    STREAK: 'edunovix_vocab_streak',
    STREAK_DATE: 'edunovix_vocab_streak_date',
    QUIZ_HISTORY: 'edunovix_vocab_quiz_history',
    VOICE_RATE: 'edunovix_vocab_voice_rate',
    VOICE_NAME: 'edunovix_vocab_voice_name'
  };

  const AppState = {
    words: VocabularyData,
    learnedWords: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.LEARNED) || '[]')),
    favoriteWords: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')),
    quizHistory: JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '{"totalQuestions":0,"correctAnswers":0,"testsTaken":0}'),
    activeTab: 'library',
    activeLevel: 'all',
    activeCategory: 'all',
    activeStatus: 'all',
    activeLetter: 'all',
    searchQuery: '',
    sortBy: 'default',
    streak: parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '5', 10),
    speechRate: parseFloat(localStorage.getItem(STORAGE_KEYS.VOICE_RATE) || '0.9'),
    selectedVoice: localStorage.getItem(STORAGE_KEYS.VOICE_NAME) || '',
    
    // Flashcards state
    flashcardDeck: [],
    currentCardIdx: 0,
    isCardFlipped: false,

    // Quiz state
    activeQuiz: null
  };

  // -------------------------------------------------------------------------
  // 7. SPEECH SYNTHESIS ENGINE
  // -------------------------------------------------------------------------
  const AudioEngine = {
    synth: window.speechSynthesis || null,
    voices: [],

    init() {
      if (!this.synth) return;
      const loadVoices = () => {
        this.voices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
        this.populateVoiceSelect();
      };
      loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
    },

    populateVoiceSelect() {
      const select = document.getElementById('voiceSelect');
      if (!select || this.voices.length === 0) return;
      select.innerHTML = '<option value="">Default System English Voice</option>';
      this.voices.forEach(voice => {
        const opt = document.createElement('option');
        opt.value = voice.name;
        opt.textContent = `${voice.name} (${voice.lang})`;
        if (voice.name === AppState.selectedVoice) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });
    },

    speak(text, buttonElement) {
      if (!this.synth) {
        App.showToast('Speech synthesis not supported on this browser', 'info');
        return;
      }
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = AppState.speechRate;
      utterance.pitch = 1.0;

      if (AppState.selectedVoice) {
        const found = this.voices.find(v => v.name === AppState.selectedVoice);
        if (found) utterance.voice = found;
      }

      if (buttonElement) {
        buttonElement.classList.add('playing');
        utterance.onend = () => buttonElement.classList.remove('playing');
        utterance.onerror = () => buttonElement.classList.remove('playing');
      }

      this.synth.speak(utterance);
    }
  };

  // -------------------------------------------------------------------------
  // 8. CORE APPLICATION CONTROLLER
  // -------------------------------------------------------------------------
  const App = {
    init() {
      this.initTheme();
      this.initStreak();
      this.initAlphabetBar();
      this.initSindhiAlphabetBar();
      this.bindEvents();
      this.updateDashboardStats();
      this.renderLibrary();
      this.initFlashcards();
      this.renderWordOfTheDay();
      this.renderSindhiDictionary();
      this.renderConfusingWords();
      this.renderIdioms();
      this.renderSubstitutions();
      this.renderSpecializedHubs();
      this.renderExplorer();
      AudioEngine.init();

      // Keyboard shortcut '/' to search
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          const search = document.getElementById('globalSearchInput');
          if (search) search.focus();
        }
      });
    },

    // ------------------- THEME MANAGEMENT -------------------
    initTheme() {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
      document.documentElement.setAttribute('data-theme', saved);
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      this.showToast(`Switched to ${next} theme`, 'info');
    },

    // ------------------- STREAK SYSTEM -------------------
    initStreak() {
      const today = new Date().toISOString().slice(0, 10);
      const lastVisit = localStorage.getItem(STORAGE_KEYS.STREAK_DATE);
      if (!lastVisit) {
        localStorage.setItem(STORAGE_KEYS.STREAK_DATE, today);
      } else if (lastVisit !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (lastVisit === yesterday) {
          AppState.streak += 1;
        }
        localStorage.setItem(STORAGE_KEYS.STREAK, AppState.streak);
        localStorage.setItem(STORAGE_KEYS.STREAK_DATE, today);
      }
      const streakElem = document.getElementById('streakCount');
      if (streakElem) streakElem.textContent = AppState.streak;
    },

    // ------------------- DASHBOARD & STATS -------------------
    updateDashboardStats() {
      const totalWords = AppState.words.length;
      const learned = AppState.learnedWords.size;
      const favorites = AppState.favoriteWords.size;

      const totalWordsElem = document.getElementById('totalWordsStat');
      const learnedStat = document.getElementById('learnedWordsStat');
      const totalFraction = document.getElementById('totalWordsFraction');
      const favStat = document.getElementById('favoriteWordsStat');
      const progressBar = document.getElementById('learnedProgressBar');
      const quizAccuracy = document.getElementById('quizAccuracyStat');
      const quizzesTaken = document.getElementById('quizzesTakenCount');
      const remainingGoal = document.getElementById('dailyGoalRemaining');

      if (totalWordsElem) totalWordsElem.textContent = totalWords;
      if (learnedStat) learnedStat.textContent = learned;
      if (totalFraction) totalFraction.textContent = totalWords;
      if (favStat) favStat.textContent = favorites;

      const pct = totalWords > 0 ? Math.round((learned / totalWords) * 100) : 0;
      if (progressBar) progressBar.style.width = `${pct}%`;

      const history = AppState.quizHistory;
      const accuracy = history.totalQuestions > 0 ? Math.round((history.correctAnswers / history.totalQuestions) * 100) : 100;
      if (quizAccuracy) quizAccuracy.textContent = accuracy;
      if (quizzesTaken) quizzesTaken.textContent = history.testsTaken;

      const target = 7;
      const rem = Math.max(0, target - (learned % target));
      if (remainingGoal) remainingGoal.textContent = rem === 0 ? 'Goal Met! 🔥' : `${rem} remaining`;
    },

    // ------------------- NAVIGATION & TABS -------------------
    navigateTo(tabName) {
      AppState.activeTab = tabName;
      document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
      });
      document.querySelectorAll('.tab-view').forEach(v => {
        v.classList.remove('active');
      });
      const targetView = document.getElementById(`view-${tabName}`);
      if (targetView) targetView.classList.add('active');

      if (tabName === 'favorites') {
        this.renderFavorites();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ------------------- ALPHABET BARS -------------------
    initAlphabetBar() {
      const bar = document.getElementById('alphabetJumpBar');
      if (!bar) return;
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'az-btn';
        btn.setAttribute('data-letter', letter);
        btn.textContent = letter;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          AppState.activeLetter = letter;
          App.renderLibrary();
        });
        bar.appendChild(btn);
      });
    },

    initSindhiAlphabetBar() {
      const bar = document.getElementById('sindhiAlphabetBar');
      if (!bar) return;
      const chars = ['الف', 'ٻ', 'ڀ', 'ت', 'ٿ', 'ٽ', 'ٺ', 'ث', 'پ', 'ج', 'ڄ', 'جھ', 'ڃ', 'چ', 'ڇ', 'ح', 'خ', 'د', 'ڌ', 'ڏ', 'ڊ', 'ڍ', 'ذ', 'ر', 'ڙ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ڦ', 'ق', 'ڪ', 'ک', 'گ', 'ڳ', 'گھ', 'ڱ', 'ل', 'م', 'ن', 'ڻ', 'و', 'ه', 'ء', 'ي'];
      chars.slice(0, 20).forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'sindhi-char-btn';
        btn.setAttribute('data-char', char);
        btn.textContent = char;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.sindhi-char-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const input = document.getElementById('sindhiSearchInput');
          if (input) {
            input.value = char;
            App.renderSindhiDictionary(char);
          }
        });
        bar.appendChild(btn);
      });
    },

    // ------------------- VOCABULARY LIBRARY -------------------
    renderLibrary() {
      const grid = document.getElementById('vocabularyWordsGrid');
      const emptyState = document.getElementById('emptyState');
      const counter = document.getElementById('visibleWordsCount');
      const totalCount = document.getElementById('totalAvailableCount');
      if (!grid) return;

      let filtered = AppState.words.filter(item => {
        // Search query
        if (AppState.searchQuery) {
          const q = AppState.searchQuery.toLowerCase();
          const matchWord = item.word.toLowerCase().includes(q);
          const matchMeaning = item.simpleMeaning.toLowerCase().includes(q) || item.detailedMeaning.toLowerCase().includes(q);
          const matchUrdu = item.urduMeaning.includes(q);
          const matchSindhi = item.sindhiMeaning.includes(q);
          const matchSynonym = item.synonyms.some(s => s.toLowerCase().includes(q));
          const matchAntonym = item.antonyms.some(a => a.toLowerCase().includes(q));
          if (!matchWord && !matchMeaning && !matchUrdu && !matchSindhi && !matchSynonym && !matchAntonym) {
            return false;
          }
        }
        // Level
        if (AppState.activeLevel !== 'all' && item.level !== AppState.activeLevel) {
          return false;
        }
        // Category
        if (AppState.activeCategory !== 'all' && item.category !== AppState.activeCategory) {
          return false;
        }
        // Status
        if (AppState.activeStatus === 'learned' && !AppState.learnedWords.has(item.id)) return false;
        if (AppState.activeStatus === 'learning' && AppState.learnedWords.has(item.id)) return false;
        if (AppState.activeStatus === 'favorites' && !AppState.favoriteWords.has(item.id)) return false;

        // Letter jump
        if (AppState.activeLetter !== 'all' && !item.word.toUpperCase().startsWith(AppState.activeLetter)) {
          return false;
        }

        return true;
      });

      // Sorting
      if (AppState.sortBy === 'alpha-asc') {
        filtered.sort((a, b) => a.word.localeCompare(b.word));
      } else if (AppState.sortBy === 'alpha-desc') {
        filtered.sort((a, b) => b.word.localeCompare(a.word));
      }

      if (counter) counter.textContent = filtered.length;
      if (totalCount) totalCount.textContent = AppState.words.length;

      if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      grid.innerHTML = filtered.map(word => this.createWordCardHTML(word)).join('');
      this.attachCardEventListeners(grid);
    },

    createWordCardHTML(word) {
      const isFav = AppState.favoriteWords.has(word.id);
      const isLearned = AppState.learnedWords.has(word.id);
      const visualSvg = word.visual || VisualSVGs.defaultVisual;

      return `
        <article class="vocab-card ${isLearned ? 'is-mastered' : ''} ${isFav ? 'is-favorite' : ''}" data-word-id="${word.id}">
          <div class="card-header-row">
            <div class="card-title-block">
              <div class="card-word-row">
                <h3 class="card-word">${word.word}</h3>
                <button class="btn-pronounce" title="Pronounce ${word.word}" data-speak="${word.word}">🔊</button>
              </div>
              <div class="card-phonetic">${word.pronunciation}</div>
              <div class="card-badges-row">
                <span class="badge-pos">${word.partOfSpeech}</span>
                <span class="badge-level">${word.level}</span>
                <span class="badge-category">${word.category}</span>
              </div>
            </div>

            <div class="card-header-actions">
              <button class="icon-btn ${isFav ? 'active-fav' : ''}" title="Favorite" data-toggle-fav="${word.id}">
                ${isFav ? '★' : '☆'}
              </button>
              <button class="icon-btn ${isLearned ? 'active-learned' : ''}" title="Mark Mastered" data-toggle-learned="${word.id}">
                ✓
              </button>
            </div>
          </div>

          <!-- Visual Concept Illustration -->
          <div class="card-visual-illustration" title="Visual concept for ${word.word}">
            ${visualSvg}
            <span class="visual-caption-tag">Concept Visual</span>
          </div>

          <!-- English Simple Meaning -->
          <p class="card-simple-meaning">${word.simpleMeaning}</p>

          <!-- Urdu & Sindhi Dual Translation Box -->
          <div class="card-translations-block">
            <div class="translation-row">
              <span class="lang-chip">سنڌي:</span>
              <span class="lang-text sindhi-script">${word.sindhiMeaning}</span>
            </div>
            <div class="translation-row">
              <span class="lang-chip">اردو:</span>
              <span class="lang-text urdu-script">${word.urduMeaning}</span>
            </div>
          </div>

          <!-- Lexical Rows -->
          <div class="card-lexical-section">
            <div class="lexical-sub-row">
              <span class="lexical-label">Synonyms:</span>
              ${word.synonyms.slice(0, 4).map(s => `<span class="word-chip" data-search-chip="${s}">${s}</span>`).join('')}
            </div>
            <div class="lexical-sub-row">
              <span class="lexical-label">Antonyms:</span>
              ${word.antonyms.slice(0, 3).map(a => `<span class="word-chip antonym-chip" data-search-chip="${a}">${a}</span>`).join('')}
            </div>
          </div>

          <!-- Expandable Exam & Memory Area -->
          <div class="card-expandable-details">
            <div class="example-sentence-box">
              "${word.examples.exam || word.examples.academic}"
            </div>
            ${word.memoryTip ? `
              <div class="memory-tip-box">
                <span class="memory-icon">💡</span>
                <span><strong>Memory Hook:</strong> ${word.memoryTip}</span>
              </div>
            ` : ''}
            ${word.collocations && word.collocations.length > 0 ? `
              <div class="collocations-row">
                <strong>Collocations:</strong> ${word.collocations.join(' • ')}
              </div>
            ` : ''}
          </div>

          <!-- Card Bottom Action Row -->
          <div class="card-footer-actions">
            <button class="btn-card-action btn-card-practice" data-practice-word="${word.id}">
              🎯 Quiz Word
            </button>
            <a href="ai-assistant.html?word=${encodeURIComponent(word.word)}&action=explain" class="btn-ask-ai-card" title="Ask Edunovix AI for deep exam analysis">
              <span>✨ Ask AI</span>
            </a>
          </div>
        </article>
      `;
    },

    attachCardEventListeners(container) {
      // Audio buttons
      container.querySelectorAll('[data-speak]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          AudioEngine.speak(word, btn);
        });
      });

      // Favorite toggle
      container.querySelectorAll('[data-toggle-fav]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-toggle-fav');
          App.toggleFavorite(id);
        });
      });

      // Learned toggle
      container.querySelectorAll('[data-toggle-learned]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-toggle-learned');
          App.toggleLearned(id);
        });
      });

      // Word chip search
      container.querySelectorAll('[data-search-chip]').forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = chip.getAttribute('data-search-chip');
          const searchInput = document.getElementById('globalSearchInput');
          if (searchInput) {
            searchInput.value = text;
            AppState.searchQuery = text;
            App.renderLibrary();
          }
        });
      });

      // Quick Quiz for this specific word
      container.querySelectorAll('[data-practice-word]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-practice-word');
          App.startSingleWordQuiz(id);
        });
      });
    },

    toggleFavorite(id) {
      if (AppState.favoriteWords.has(id)) {
        AppState.favoriteWords.delete(id);
        this.showToast('Removed from favorites', 'info');
      } else {
        AppState.favoriteWords.add(id);
        this.showToast('Added to favorites ⭐', 'success');
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(AppState.favoriteWords)));
      this.updateDashboardStats();
      this.renderLibrary();
      if (AppState.activeTab === 'favorites') this.renderFavorites();
    },

    toggleLearned(id) {
      if (AppState.learnedWords.has(id)) {
        AppState.learnedWords.delete(id);
        this.showToast('Marked as still learning', 'info');
      } else {
        AppState.learnedWords.add(id);
        this.showToast('Word Mastered! ✓', 'success');
      }
      localStorage.setItem(STORAGE_KEYS.LEARNED, JSON.stringify(Array.from(AppState.learnedWords)));
      this.updateDashboardStats();
      this.renderLibrary();
    },

    // ------------------- FLASHCARDS 3D ENGINE -------------------
    initFlashcards() {
      AppState.flashcardDeck = [...AppState.words];
      AppState.currentCardIdx = 0;
      this.updateFlashcardView();

      const card = document.getElementById('activeFlashcard');
      const flipBtn = document.getElementById('fcFlipBtn');
      const prevBtn = document.getElementById('fcPrevBtn');
      const nextBtn = document.getElementById('fcNextBtn');
      const shuffleBtn = document.getElementById('shuffleDeckBtn');
      const deckSelect = document.getElementById('flashcardDeckSelect');
      const stillLearnBtn = document.getElementById('fcStillLearningBtn');
      const favBtn = document.getElementById('fcFavoriteBtn');
      const masteredBtn = document.getElementById('fcMasteredBtn');

      const toggleFlip = () => {
        AppState.isCardFlipped = !AppState.isCardFlipped;
        if (card) card.classList.toggle('flipped', AppState.isCardFlipped);
      };

      if (card) card.addEventListener('click', toggleFlip);
      if (flipBtn) flipBtn.addEventListener('click', toggleFlip);

      // Keyboard space to flip, left/right for prev/next
      window.addEventListener('keydown', (e) => {
        if (AppState.activeTab !== 'flashcards') return;
        if (e.code === 'Space') {
          e.preventDefault();
          toggleFlip();
        } else if (e.code === 'ArrowLeft') {
          this.prevFlashcard();
        } else if (e.code === 'ArrowRight') {
          this.nextFlashcard();
        }
      });

      if (prevBtn) prevBtn.addEventListener('click', () => this.prevFlashcard());
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextFlashcard());

      if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
          for (let i = AppState.flashcardDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [AppState.flashcardDeck[i], AppState.flashcardDeck[j]] = [AppState.flashcardDeck[j], AppState.flashcardDeck[i]];
          }
          AppState.currentCardIdx = 0;
          AppState.isCardFlipped = false;
          if (card) card.classList.remove('flipped');
          this.updateFlashcardView();
          this.showToast('Flashcard deck shuffled! 🔀', 'info');
        });
      }

      if (deckSelect) {
        deckSelect.addEventListener('change', (e) => {
          const val = e.target.value;
          if (val === 'all') {
            AppState.flashcardDeck = [...AppState.words];
          } else if (val === 'favorites') {
            AppState.flashcardDeck = AppState.words.filter(w => AppState.favoriteWords.has(w.id));
          } else if (val === 'unlearned') {
            AppState.flashcardDeck = AppState.words.filter(w => !AppState.learnedWords.has(w.id));
          } else {
            AppState.flashcardDeck = AppState.words.filter(w => w.category === val);
          }
          if (AppState.flashcardDeck.length === 0) {
            AppState.flashcardDeck = [...AppState.words];
            this.showToast('No cards matched filter; showing all cards.', 'info');
          }
          AppState.currentCardIdx = 0;
          AppState.isCardFlipped = false;
          if (card) card.classList.remove('flipped');
          this.updateFlashcardView();
        });
      }

      if (stillLearnBtn) {
        stillLearnBtn.addEventListener('click', () => {
          const cur = AppState.flashcardDeck[AppState.currentCardIdx];
          if (cur && AppState.learnedWords.has(cur.id)) {
            AppState.learnedWords.delete(cur.id);
            localStorage.setItem(STORAGE_KEYS.LEARNED, JSON.stringify(Array.from(AppState.learnedWords)));
            this.updateDashboardStats();
          }
          this.showToast(`Reviewing "${cur.word}" soon`, 'info');
          this.nextFlashcard();
        });
      }

      if (favBtn) {
        favBtn.addEventListener('click', () => {
          const cur = AppState.flashcardDeck[AppState.currentCardIdx];
          if (cur) this.toggleFavorite(cur.id);
        });
      }

      if (masteredBtn) {
        masteredBtn.addEventListener('click', () => {
          const cur = AppState.flashcardDeck[AppState.currentCardIdx];
          if (cur) {
            AppState.learnedWords.add(cur.id);
            localStorage.setItem(STORAGE_KEYS.LEARNED, JSON.stringify(Array.from(AppState.learnedWords)));
            this.updateDashboardStats();
            this.showToast(`Mastered "${cur.word}"! ✓`, 'success');
          }
          this.nextFlashcard();
        });
      }

      const audioBtn = document.getElementById('fcAudioBtn');
      if (audioBtn) {
        audioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cur = AppState.flashcardDeck[AppState.currentCardIdx];
          if (cur) AudioEngine.speak(cur.word, audioBtn);
        });
      }
    },

    updateFlashcardView() {
      if (AppState.flashcardDeck.length === 0) return;
      const word = AppState.flashcardDeck[AppState.currentCardIdx];
      const card = document.getElementById('activeFlashcard');
      if (card) card.classList.remove('flipped');
      AppState.isCardFlipped = false;

      // Front
      const fcFrontPos = document.getElementById('fcFrontPos');
      const fcFrontLevel = document.getElementById('fcFrontLevel');
      const fcFrontVisual = document.getElementById('fcFrontVisual');
      const fcFrontWord = document.getElementById('fcFrontWord');
      const fcFrontPron = document.getElementById('fcFrontPron');
      const fcFrontUrdu = document.getElementById('fcFrontUrdu');
      const fcFrontSindhi = document.getElementById('fcFrontSindhi');

      if (fcFrontPos) fcFrontPos.textContent = word.partOfSpeech.toUpperCase();
      if (fcFrontLevel) fcFrontLevel.textContent = word.level;
      if (fcFrontVisual) fcFrontVisual.innerHTML = word.visual || VisualSVGs.defaultVisual;
      if (fcFrontWord) fcFrontWord.textContent = word.word.toUpperCase();
      if (fcFrontPron) fcFrontPron.textContent = word.pronunciation;
      if (fcFrontUrdu) fcFrontUrdu.textContent = word.urduMeaning;
      if (fcFrontSindhi) fcFrontSindhi.textContent = word.sindhiMeaning;

      // Back
      const fcBackPos = document.getElementById('fcBackPos');
      const fcBackSimple = document.getElementById('fcBackSimple');
      const fcBackSindhi = document.getElementById('fcBackSindhiDetailed');
      const fcBackUrdu = document.getElementById('fcBackUrduDetailed');
      const fcBackSynonyms = document.getElementById('fcBackSynonyms');
      const fcBackAntonyms = document.getElementById('fcBackAntonyms');
      const fcBackExample = document.getElementById('fcBackExample');
      const fcBackMemory = document.getElementById('fcBackMemory');

      if (fcBackPos) fcBackPos.textContent = word.partOfSpeech.toUpperCase();
      if (fcBackSimple) fcBackSimple.textContent = word.detailedMeaning || word.simpleMeaning;
      if (fcBackSindhi) fcBackSindhi.textContent = word.sindhiMeaning;
      if (fcBackUrdu) fcBackUrdu.textContent = word.urduMeaning;
      if (fcBackExample) fcBackExample.textContent = `"${word.examples.exam || word.examples.academic}"`;
      if (fcBackMemory) fcBackMemory.textContent = word.memoryTip || 'Sound connection and repeated active recall.';

      if (fcBackSynonyms) {
        fcBackSynonyms.innerHTML = word.synonyms.map(s => `<span class="word-chip">${s}</span>`).join('');
      }
      if (fcBackAntonyms) {
        fcBackAntonyms.innerHTML = word.antonyms.map(a => `<span class="word-chip antonym-chip">${a}</span>`).join('');
      }

      // Meta & Progress
      const curIdxElem = document.getElementById('currentCardIndex');
      const totalCardsElem = document.getElementById('totalCardCount');
      const progressFill = document.getElementById('deckProgressFill');
      const masteryIndicator = document.getElementById('flashcardMasteryStatus');

      if (curIdxElem) curIdxElem.textContent = AppState.currentCardIdx + 1;
      if (totalCardsElem) totalCardsElem.textContent = AppState.flashcardDeck.length;
      if (progressFill) {
        const pct = Math.round(((AppState.currentCardIdx + 1) / AppState.flashcardDeck.length) * 100);
        progressFill.style.width = `${pct}%`;
      }
      if (masteryIndicator) {
        const isM = AppState.learnedWords.has(word.id);
        masteryIndicator.textContent = isM ? 'Status: ✓ Mastered' : 'Status: ⏳ Still Learning';
        masteryIndicator.style.color = isM ? 'var(--color-green)' : 'var(--color-gold)';
      }
    },

    nextFlashcard() {
      if (AppState.currentCardIdx < AppState.flashcardDeck.length - 1) {
        AppState.currentCardIdx++;
      } else {
        AppState.currentCardIdx = 0;
        this.showToast('You completed the entire deck loop! 🌟', 'success');
      }
      this.updateFlashcardView();
    },

    prevFlashcard() {
      if (AppState.currentCardIdx > 0) {
        AppState.currentCardIdx--;
      } else {
        AppState.currentCardIdx = AppState.flashcardDeck.length - 1;
      }
      this.updateFlashcardView();
    },

    // ------------------- QUIZ ARENA -------------------
    startQuiz(type) {
      const modeScreen = document.getElementById('quizModeSelectionScreen');
      const activeScreen = document.getElementById('activeQuizScreen');
      const resultsScreen = document.getElementById('quizResultsScreen');

      if (modeScreen) modeScreen.style.display = 'none';
      if (resultsScreen) resultsScreen.style.display = 'none';
      if (activeScreen) activeScreen.style.display = 'block';

      const questions = this.generateQuizQuestions(type, 10);
      AppState.activeQuiz = {
        type: type,
        questions: questions,
        currentIndex: 0,
        score: 0,
        selectedAnswer: null
      };

      this.renderQuizQuestion();
    },

    startSingleWordQuiz(wordId) {
      const word = AppState.words.find(w => w.id === wordId);
      if (!word) return;
      this.navigateTo('quiz');
      this.startQuiz('synonym');
    },

    generateQuizQuestions(type, count) {
      const shuffled = [...AppState.words].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(count, shuffled.length));

      return selected.map(target => {
        let questionPrompt = '';
        let correctAnswer = '';
        let distractors = [];
        let contextSentence = target.examples.exam || target.examples.academic;

        if (type === 'synonym') {
          questionPrompt = `Choose the closest synonym for:`;
          correctAnswer = target.synonyms[0];
          // pick 3 random words' synonyms or meanings as distractors
          const others = AppState.words.filter(w => w.id !== target.id);
          distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.synonyms[0] || w.antonyms[0]);
        } else if (type === 'antonym') {
          questionPrompt = `Choose the direct opposite (antonym) for:`;
          correctAnswer = target.antonyms[0];
          const others = AppState.words.filter(w => w.id !== target.id);
          distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.synonyms[0] || w.antonyms[0]);
        } else if (type === 'blank') {
          questionPrompt = `Fill in the blank with the optimal word:`;
          const sentence = target.examples.exam || target.examples.simple;
          contextSentence = sentence.replace(new RegExp(target.word, 'gi'), '__________');
          correctAnswer = target.word;
          const others = AppState.words.filter(w => w.id !== target.id);
          distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.word);
        } else {
          // Meaning or context
          questionPrompt = `Identify the accurate definition of:`;
          correctAnswer = target.simpleMeaning;
          const others = AppState.words.filter(w => w.id !== target.id);
          distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.simpleMeaning);
        }

        const allOptions = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

        return {
          targetWord: target.word,
          prompt: questionPrompt,
          context: contextSentence,
          options: allOptions,
          correct: correctAnswer,
          explanation: `<strong>${target.word}</strong> (${target.partOfSpeech}): ${target.detailedMeaning}. In Urdu: ${target.urduMeaning}. In Sindhi: ${target.sindhiMeaning}.`
        };
      });
    },

    renderQuizQuestion() {
      const q = AppState.activeQuiz.questions[AppState.activeQuiz.currentIndex];
      const typeBadge = document.getElementById('quizTypeBadge');
      const curQNum = document.getElementById('quizCurrentQNum');
      const totalQNum = document.getElementById('quizTotalQNum');
      const runningScore = document.getElementById('quizRunningScore');
      const progressBar = document.getElementById('quizProgressBar');
      const promptHeader = document.getElementById('quizPromptHeader');
      const targetWord = document.getElementById('quizTargetWord');
      const contextSentence = document.getElementById('quizContextSentence');
      const optionsGrid = document.getElementById('quizOptionsGrid');
      const feedbackBox = document.getElementById('quizFeedbackBox');

      if (typeBadge) typeBadge.textContent = `${AppState.activeQuiz.type.toUpperCase()} TEST`;
      if (curQNum) curQNum.textContent = AppState.activeQuiz.currentIndex + 1;
      if (totalQNum) totalQNum.textContent = AppState.activeQuiz.questions.length;
      if (runningScore) runningScore.textContent = AppState.activeQuiz.score;

      const pct = Math.round(((AppState.activeQuiz.currentIndex + 1) / AppState.activeQuiz.questions.length) * 100);
      if (progressBar) progressBar.style.width = `${pct}%`;

      if (promptHeader) promptHeader.textContent = q.prompt;
      if (targetWord) targetWord.textContent = q.targetWord.toUpperCase();
      if (contextSentence) contextSentence.textContent = q.context ? `"${q.context}"` : '';
      if (feedbackBox) feedbackBox.style.display = 'none';

      const letters = ['A', 'B', 'C', 'D'];
      if (optionsGrid) {
        optionsGrid.innerHTML = q.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-option="${encodeURIComponent(opt)}">
            <span class="opt-letter">${letters[idx]}</span>
            <span>${opt}</span>
          </button>
        `).join('');

        optionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const chosen = decodeURIComponent(btn.getAttribute('data-option'));
            App.handleQuizAnswer(chosen, btn);
          });
        });
      }
    },

    handleQuizAnswer(chosen, clickedBtn) {
      const q = AppState.activeQuiz.questions[AppState.activeQuiz.currentIndex];
      const feedbackBox = document.getElementById('quizFeedbackBox');
      const feedbackIcon = document.getElementById('feedbackIcon');
      const feedbackTitle = document.getElementById('feedbackTitle');
      const feedbackExplanation = document.getElementById('feedbackExplanation');
      const runningScore = document.getElementById('quizRunningScore');

      // Disable all buttons
      document.querySelectorAll('.quiz-option-btn').forEach(b => {
        b.disabled = true;
        const opt = decodeURIComponent(b.getAttribute('data-option'));
        if (opt === q.correct) {
          b.classList.add('correct');
        }
      });

      const isCorrect = (chosen === q.correct);
      if (isCorrect) {
        AppState.activeQuiz.score++;
        if (runningScore) runningScore.textContent = AppState.activeQuiz.score;
        if (feedbackIcon) feedbackIcon.textContent = '✓';
        if (feedbackTitle) {
          feedbackTitle.textContent = 'Spot on! Correct Answer';
          feedbackTitle.style.color = 'var(--color-green)';
        }
      } else {
        clickedBtn.classList.add('wrong');
        if (feedbackIcon) feedbackIcon.textContent = '✕';
        if (feedbackTitle) {
          feedbackTitle.textContent = 'Incorrect Choice';
          feedbackTitle.style.color = 'var(--color-red)';
        }
      }

      if (feedbackExplanation) feedbackExplanation.innerHTML = q.explanation;
      if (feedbackBox) feedbackBox.style.display = 'block';

      // Update quiz history in persistence
      AppState.quizHistory.totalQuestions++;
      if (isCorrect) AppState.quizHistory.correctAnswers++;
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(AppState.quizHistory));
      this.updateDashboardStats();
    },

    nextQuizQuestion() {
      AppState.activeQuiz.currentIndex++;
      if (AppState.activeQuiz.currentIndex < AppState.activeQuiz.questions.length) {
        this.renderQuizQuestion();
      } else {
        this.showQuizResults();
      }
    },

    showQuizResults() {
      const activeScreen = document.getElementById('activeQuizScreen');
      const resultsScreen = document.getElementById('quizResultsScreen');
      if (activeScreen) activeScreen.style.display = 'none';
      if (resultsScreen) resultsScreen.style.display = 'block';

      AppState.quizHistory.testsTaken++;
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(AppState.quizHistory));
      this.updateDashboardStats();

      const total = AppState.activeQuiz.questions.length;
      const score = AppState.activeQuiz.score;
      const pct = Math.round((score / total) * 100);

      const finalScore = document.getElementById('finalScoreDisplay');
      const finalPct = document.getElementById('finalPercentageDisplay');
      const resCorrect = document.getElementById('resCorrectCount');
      const resIncorrect = document.getElementById('resIncorrectCount');

      if (finalScore) finalScore.textContent = `${score}/${total}`;
      if (finalPct) finalPct.textContent = `${pct}% Accuracy Rate`;
      if (resCorrect) resCorrect.textContent = score;
      if (resIncorrect) resIncorrect.textContent = total - score;
    },

    quitQuiz() {
      const activeScreen = document.getElementById('activeQuizScreen');
      const modeScreen = document.getElementById('quizModeSelectionScreen');
      if (activeScreen) activeScreen.style.display = 'none';
      if (modeScreen) modeScreen.style.display = 'block';
    },

    // ------------------- WORD OF THE DAY -------------------
    renderWordOfTheDay() {
      const container = document.getElementById('dailyShowcaseCard');
      if (!container) return;
      // Featured word: Pernicious or Ubiquitous based on day
      const dayIndex = new Date().getDate() % AppState.words.length;
      const word = AppState.words[dayIndex] || AppState.words[3];

      container.innerHTML = `
        <div class="card-header-row">
          <div>
            <div class="card-word-row">
              <h1 class="card-word" style="font-size: 2.5rem;">${word.word}</h1>
              <button class="btn-pronounce" style="width: 40px; height: 40px;" data-speak="${word.word}">🔊</button>
            </div>
            <div class="card-phonetic" style="font-size: 1rem;">${word.pronunciation}</div>
            <div class="card-badges-row" style="margin-top: 8px;">
              <span class="badge-pos">${word.partOfSpeech.toUpperCase()}</span>
              <span class="badge-level">Level: ${word.level}</span>
              <span class="badge-category">${word.category} Exam</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 20px; align-items: center; margin: 18px 0; flex-wrap: wrap;">
          <div style="width: 140px; height: 100px; background: var(--bg-surface-elevated); border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 10px;">
            ${word.visual || VisualSVGs.defaultVisual}
          </div>
          <div style="flex: 1; min-width: 240px;">
            <p style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
              ${word.simpleMeaning}
            </p>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
              ${word.detailedMeaning}
            </p>
          </div>
        </div>

        <div class="card-translations-block" style="padding: 14px 18px; margin-bottom: 16px;">
          <div class="translation-row" style="margin-bottom: 8px;">
            <span class="lang-chip">سنڌي مستند معنيٰ:</span>
            <span class="lang-text sindhi-script" style="font-size: 1.4rem;">${word.sindhiMeaning}</span>
          </div>
          <div class="translation-row">
            <span class="lang-chip">اردو جامع معنی:</span>
            <span class="lang-text urdu-script" style="font-size: 1.3rem;">${word.urduMeaning}</span>
          </div>
        </div>

        <div style="background: rgba(99,102,241,0.06); border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 16px;">
          <strong style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase;">Official Exam Application:</strong>
          <p style="font-style: italic; font-size: 0.96rem; margin-top: 4px; color: var(--text-primary);">
            "${word.examples.exam || word.examples.academic}"
          </p>
        </div>

        <div class="card-footer-actions">
          <button class="btn-primary" data-practice-word="${word.id}">Practice This Masterword</button>
          <a href="ai-assistant.html?word=${encodeURIComponent(word.word)}&action=deep-dive" class="btn-ai-assistant">
            ✨ Ask AI for 5 More Exam Sentences
          </a>
        </div>
      `;

      this.attachCardEventListeners(container);

      // Verify Sentence handler
      const verifyBtn = document.getElementById('verifySentenceBtn');
      const sentenceInput = document.getElementById('dailyChallengeInput');
      const challengeFeedback = document.getElementById('challengeFeedback');
      if (verifyBtn && sentenceInput && challengeFeedback) {
        verifyBtn.addEventListener('click', () => {
          const val = sentenceInput.value.trim();
          if (!val) {
            App.showToast('Please type your sentence first!', 'info');
            return;
          }
          if (!val.toLowerCase().includes(word.word.toLowerCase())) {
            challengeFeedback.style.display = 'block';
            challengeFeedback.style.background = 'var(--color-red-bg)';
            challengeFeedback.style.color = 'var(--color-red)';
            challengeFeedback.innerHTML = `⚠️ Your sentence must include the word <strong>"${word.word}"</strong>.`;
          } else if (val.split(' ').length < 5) {
            challengeFeedback.style.display = 'block';
            challengeFeedback.style.background = 'var(--color-gold-bg)';
            challengeFeedback.style.color = 'var(--color-gold)';
            challengeFeedback.innerHTML = `Good start! Try making your sentence more descriptive (at least 6-8 words).`;
          } else {
            challengeFeedback.style.display = 'block';
            challengeFeedback.style.background = 'var(--color-green-bg)';
            challengeFeedback.style.color = 'var(--color-green)';
            challengeFeedback.innerHTML = `✓ <strong>Excellent usage!</strong> You successfully applied "${word.word}" in an authentic sentence.`;
          }
        });
      }

      const aiFeedbackBtn = document.getElementById('aiFeedbackSentenceBtn');
      if (aiFeedbackBtn && sentenceInput) {
        aiFeedbackBtn.addEventListener('click', () => {
          const val = sentenceInput.value.trim();
          const q = `Please evaluate my usage of the English vocabulary word "${word.word}" in this sentence: "${val}". Give me feedback and corrections.`;
          window.location.href = `ai-assistant.html?prompt=${encodeURIComponent(q)}`;
        });
      }
    },

    // ------------------- SINDHI DICTIONARY (سنڌي لغت) -------------------
    renderSindhiDictionary(filterChar = '') {
      const grid = document.getElementById('sindhiDictGrid');
      if (!grid) return;

      let items = [...AppState.words];
      if (filterChar) {
        items = items.filter(w => w.sindhiMeaning.includes(filterChar) || w.word.toLowerCase().startsWith(filterChar.toLowerCase()));
      }

      grid.innerHTML = items.map(word => `
        <div class="sindhi-entry-card">
          <div>
            <div class="entry-top-row">
              <div>
                <h3 class="entry-word-en">${word.word}</h3>
                <span class="entry-pronunciation">${word.pronunciation} • ${word.partOfSpeech}</span>
              </div>
              <button class="btn-pronounce" data-speak="${word.word}">🔊</button>
            </div>

            <div class="sindhi-meaning-headline">${word.sindhiMeaning}</div>
            <div class="sindhi-detailed-explanation">
              <strong>سمجهاڻي:</strong> ${word.sindhiMeaning} — هي لفظ ${word.partOfSpeech} طور استعمال ٿيندو آهي ۽ معنيٰ آهي ${word.simpleMeaning}
            </div>

            <div class="urdu-translation-line">
              <strong>اردو میں:</strong> ${word.urduMeaning}
            </div>

            <div class="entry-english-meaning">
              <strong>English:</strong> ${word.detailedMeaning}
            </div>
          </div>

          <div style="margin-top: 14px; border-top: 1px solid var(--border-subtle); padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-muted);">${word.category} Exam</span>
            <a href="ai-assistant.html?word=${encodeURIComponent(word.word)}&lang=sindhi" class="ai-card-cta">
              ✨ سنڌي ۾ وڌيڪ پڇو →
            </a>
          </div>
        </div>
      `).join('');

      this.attachCardEventListeners(grid);
    },

    // ------------------- CONFUSING WORDS -------------------
    renderConfusingWords() {
      const grid = document.getElementById('confusingCardsGrid');
      if (!grid) return;

      grid.innerHTML = ConfusingWordsData.map(pair => `
        <div class="confusing-pair-card">
          <div class="pair-vs-banner">
            <span class="word-node">${pair.wordA.word}</span>
            <span class="vs-badge">VS</span>
            <span class="word-node" style="color: var(--accent-ai);">${pair.wordB.word}</span>
          </div>

          <div class="pair-columns-grid">
            <div class="word-column">
              <div class="word-column-header">
                <span class="col-word-title">${pair.wordA.word}</span>
                <span class="col-pos-tag">${pair.wordA.pos}</span>
              </div>
              <p class="col-meaning">${pair.wordA.meaning}</p>
              <div class="col-example">"${pair.wordA.example}"</div>
              <div style="font-family: var(--font-urdu); direction: rtl; margin-top: 8px; font-size: 0.95rem; color: var(--text-secondary);">
                ${pair.wordA.urdu}
              </div>
            </div>

            <div class="word-column">
              <div class="word-column-header">
                <span class="col-word-title" style="color: var(--accent-ai);">${pair.wordB.word}</span>
                <span class="col-pos-tag">${pair.wordB.pos}</span>
              </div>
              <p class="col-meaning">${pair.wordB.meaning}</p>
              <div class="col-example">"${pair.wordB.example}"</div>
              <div style="font-family: var(--font-urdu); direction: rtl; margin-top: 8px; font-size: 0.95rem; color: var(--text-secondary);">
                ${pair.wordB.urdu}
              </div>
            </div>
          </div>

          <div class="pair-memory-trick">
            <strong>💡 Never Confuse Again:</strong> ${pair.memoryTrick}
          </div>
        </div>
      `).join('');
    },

    // ------------------- IDIOMS & PHRASALS -------------------
    renderIdioms(filterType = 'idiom') {
      const grid = document.getElementById('idiomsGrid');
      if (!grid) return;

      const list = IdiomsData.filter(i => i.type === filterType);
      grid.innerHTML = list.map(item => `
        <div class="idiom-card">
          <h3 class="idiom-phrase">${item.phrase}</h3>
          <div class="idiom-meaning">${item.meaning}</div>
          <div class="idiom-urdu">${item.urdu}</div>
          <div class="idiom-example">"${item.example}"</div>
        </div>
      `).join('');
    },

    // ------------------- ONE-WORD SUBSTITUTIONS -------------------
    renderSubstitutions(search = '') {
      const tbody = document.getElementById('substitutionsTableBody');
      if (!tbody) return;

      let list = SubstitutionsData;
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(s => s.description.toLowerCase().includes(q) || s.substitution.toLowerCase().includes(q));
      }

      tbody.innerHTML = list.map(s => `
        <tr>
          <td>${s.description}</td>
          <td class="sub-word-cell">${s.substitution}</td>
          <td style="font-family: var(--font-urdu); direction: rtl;">${s.urduSindhi}</td>
          <td><span class="badge-category">${s.category}</span></td>
          <td style="font-style: italic; font-size: 0.84rem;">"${s.example}"</td>
        </tr>
      `).join('');
    },

    // ------------------- SPECIALIZED HUBS -------------------
    renderSpecializedHubs() {
      // MDCAT Grid
      const mdcatGrid = document.getElementById('mdcatWordsGrid');
      if (mdcatGrid) {
        const mdcatWords = AppState.words.filter(w => w.category === 'MDCAT' || w.category === 'Medical');
        mdcatGrid.innerHTML = mdcatWords.map(w => this.createWordCardHTML(w)).join('');
        this.attachCardEventListeners(mdcatGrid);
      }

      // CSS Grid
      const cssGrid = document.getElementById('cssWordsGrid');
      if (cssGrid) {
        const cssWords = AppState.words.filter(w => w.category === 'CSS' || w.level === 'Advanced' || w.level === 'Expert');
        cssGrid.innerHTML = cssWords.map(w => this.createWordCardHTML(w)).join('');
        this.attachCardEventListeners(cssGrid);
      }

      // Academic Grid
      const academicGrid = document.getElementById('academicWordsGrid');
      if (academicGrid) {
        const acWords = AppState.words.filter(w => w.category === 'Academic' || w.level === 'Academic');
        academicGrid.innerHTML = acWords.map(w => this.createWordCardHTML(w)).join('');
        this.attachCardEventListeners(academicGrid);
      }
    },

    // ------------------- SYNONYM & ANTONYM EXPLORER -------------------
    renderExplorer() {
      const wordList = document.getElementById('explorerWordList');
      const display = document.getElementById('explorerMainDisplay');
      if (!wordList || !display) return;

      const words = AppState.words.slice(0, 10);
      wordList.innerHTML = words.map((w, idx) => `
        <button class="explorer-btn ${idx === 0 ? 'active' : ''}" data-explore-id="${w.id}">
          ${w.word}
        </button>
      `).join('');

      const renderActiveCluster = (word) => {
        display.innerHTML = `
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge-level">${word.category} Core Concept</span>
            <h1 style="font-family: var(--font-display); font-size: 2.6rem; font-weight: 800; color: var(--primary); margin: 6px 0;">
              ${word.word.toUpperCase()}
            </h1>
            <p style="font-size: 1.05rem; color: var(--text-secondary);">${word.simpleMeaning}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: var(--bg-surface-elevated); padding: 20px; border-radius: 16px; border: 1px solid var(--border-subtle);">
              <h3 style="color: var(--color-green); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span>🎯 Closest Synonyms</span>
              </h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${word.synonyms.map(s => `
                  <div style="background: var(--bg-surface); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--text-primary); font-size: 0.95rem;">${s}</strong>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">High-register</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background: var(--bg-surface-elevated); padding: 20px; border-radius: 16px; border: 1px solid var(--border-subtle);">
              <h3 style="color: var(--color-red); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span>⚡ Polar Antonyms</span>
              </h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${word.antonyms.map(a => `
                  <div style="background: var(--bg-surface); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: var(--color-red); font-size: 0.95rem;">${a}</strong>
                    <span style="font-size: 0.76rem; color: var(--text-muted);">Direct opposite</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      };

      renderActiveCluster(words[0]);

      wordList.querySelectorAll('.explorer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          wordList.querySelectorAll('.explorer-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const id = btn.getAttribute('data-explore-id');
          const target = AppState.words.find(w => w.id === id);
          if (target) renderActiveCluster(target);
        });
      });
    },

    // ------------------- FAVORITES VIEW -------------------
    renderFavorites() {
      const grid = document.getElementById('favoritesWordsGrid');
      const empty = document.getElementById('emptyFavorites');
      if (!grid) return;

      const favs = AppState.words.filter(w => AppState.favoriteWords.has(w.id));
      if (favs.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
      } else {
        if (empty) empty.style.display = 'none';
        grid.innerHTML = favs.map(w => this.createWordCardHTML(w)).join('');
        this.attachCardEventListeners(grid);
      }
    },

    // ------------------- TOAST NOTIFICATION -------------------
    showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 250);
      }, 2400);
    },

    // ------------------- EVENT BINDINGS -------------------
    bindEvents() {
      // Theme Toggle
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

      // Navigation Tabs
      document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-tab');
          this.navigateTo(target);
        });
      });

      // Global Search
      const searchInput = document.getElementById('globalSearchInput');
      const clearSearchBtn = document.getElementById('clearSearchBtn');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          AppState.searchQuery = e.target.value.trim();
          if (clearSearchBtn) clearSearchBtn.style.display = AppState.searchQuery ? 'block' : 'none';
          this.renderLibrary();
        });
      }
      if (clearSearchBtn && searchInput) {
        clearSearchBtn.addEventListener('click', () => {
          searchInput.value = '';
          AppState.searchQuery = '';
          clearSearchBtn.style.display = 'none';
          this.renderLibrary();
        });
      }

      // Level Pills
      const levelPills = document.querySelectorAll('#levelPillsContainer .filter-pill');
      levelPills.forEach(pill => {
        pill.addEventListener('click', () => {
          levelPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          AppState.activeLevel = pill.getAttribute('data-level');
          this.renderLibrary();
        });
      });

      // Category Pills
      const catPills = document.querySelectorAll('#categoryPillsContainer .filter-pill');
      catPills.forEach(pill => {
        pill.addEventListener('click', () => {
          catPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          AppState.activeCategory = pill.getAttribute('data-category');
          this.renderLibrary();
        });
      });

      // Status Pills
      const statusPills = document.querySelectorAll('#statusPillsContainer .filter-pill');
      statusPills.forEach(pill => {
        pill.addEventListener('click', () => {
          statusPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          AppState.activeStatus = pill.getAttribute('data-status');
          this.renderLibrary();
        });
      });

      // Sort Select
      const sortSelect = document.getElementById('sortSelect');
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          AppState.sortBy = e.target.value;
          this.renderLibrary();
        });
      }

      // Empty state reset button
      const emptyReset = document.getElementById('emptyResetBtn');
      if (emptyReset) {
        emptyReset.addEventListener('click', () => {
          AppState.searchQuery = '';
          AppState.activeLevel = 'all';
          AppState.activeCategory = 'all';
          AppState.activeStatus = 'all';
          AppState.activeLetter = 'all';
          if (searchInput) searchInput.value = '';
          document.querySelectorAll('.filter-pill').forEach(p => {
            if (p.getAttribute('data-level') === 'all' || p.getAttribute('data-category') === 'all' || p.getAttribute('data-status') === 'all') {
              p.classList.add('active');
            } else {
              p.classList.remove('active');
            }
          });
          this.renderLibrary();
        });
      }

      // Quiz mode cards
      document.querySelectorAll('.quiz-mode-card').forEach(card => {
        card.addEventListener('click', () => {
          const type = card.getAttribute('data-quiz-type');
          this.startQuiz(type);
        });
      });

      // Quiz Next / Quit buttons
      const quizNextBtn = document.getElementById('quizNextBtn');
      if (quizNextBtn) quizNextBtn.addEventListener('click', () => this.nextQuizQuestion());

      const quitQuizBtn = document.getElementById('quitQuizBtn');
      if (quitQuizBtn) quitQuizBtn.addEventListener('click', () => this.quitQuiz());

      const retryQuizBtn = document.getElementById('retryQuizBtn');
      if (retryQuizBtn) retryQuizBtn.addEventListener('click', () => this.quitQuiz());

      const reviewMissedBtn = document.getElementById('reviewMissedBtn');
      if (reviewMissedBtn) reviewMissedBtn.addEventListener('click', () => this.navigateTo('library'));

      // Audio Settings Modal
      const audioBtn = document.getElementById('audioSettingsBtn');
      const audioModal = document.getElementById('audioModalOverlay');
      const closeAudio = document.getElementById('closeAudioModalBtn');
      const saveVoiceBtn = document.getElementById('saveVoiceBtn');
      const testVoiceBtn = document.getElementById('testVoiceBtn');
      const rateRange = document.getElementById('rateRange');
      const rateValDisplay = document.getElementById('rateValDisplay');
      const voiceSelect = document.getElementById('voiceSelect');

      if (audioBtn && audioModal) audioBtn.addEventListener('click', () => audioModal.style.display = 'flex');
      if (closeAudio && audioModal) closeAudio.addEventListener('click', () => audioModal.style.display = 'none');
      if (saveVoiceBtn && audioModal) saveVoiceBtn.addEventListener('click', () => audioModal.style.display = 'none');

      if (rateRange && rateValDisplay) {
        rateRange.addEventListener('input', (e) => {
          AppState.speechRate = parseFloat(e.target.value);
          rateValDisplay.textContent = `${AppState.speechRate}x`;
          localStorage.setItem(STORAGE_KEYS.VOICE_RATE, AppState.speechRate);
        });
      }

      if (voiceSelect) {
        voiceSelect.addEventListener('change', (e) => {
          AppState.selectedVoice = e.target.value;
          localStorage.setItem(STORAGE_KEYS.VOICE_NAME, AppState.selectedVoice);
        });
      }

      if (testVoiceBtn) {
        testVoiceBtn.addEventListener('click', () => {
          AudioEngine.speak('Edunovix-AI Vocabulary Engine. Pronunciation is crystal clear.');
        });
      }

      // Sindhi search bar
      const sindhiSearch = document.getElementById('sindhiSearchInput');
      if (sindhiSearch) {
        sindhiSearch.addEventListener('input', (e) => {
          this.renderSindhiDictionary(e.target.value.trim());
        });
      }

      // Idioms toggle
      const showIdiomsBtn = document.getElementById('showIdiomsBtn');
      const showPhrasalsBtn = document.getElementById('showPhrasalsBtn');
      if (showIdiomsBtn && showPhrasalsBtn) {
        showIdiomsBtn.addEventListener('click', () => {
          showIdiomsBtn.classList.add('active');
          showPhrasalsBtn.classList.remove('active');
          this.renderIdioms('idiom');
        });
        showPhrasalsBtn.addEventListener('click', () => {
          showPhrasalsBtn.classList.add('active');
          showIdiomsBtn.classList.remove('active');
          this.renderIdioms('phrasal');
        });
      }

      // Substitutions search
      const subSearch = document.getElementById('subSearchInput');
      if (subSearch) {
        subSearch.addEventListener('input', (e) => {
          this.renderSubstitutions(e.target.value.trim());
        });
      }
    }
  };

  // Expose to window for inline onclick handlers
  window.EdunovixApp = App;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
