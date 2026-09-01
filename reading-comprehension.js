/**
 * Reading Comprehension Master - Complete JavaScript Application Engine
 * Pure Vanilla JavaScript (ES6+) with localStorage persistence
 */

// ==========================================================================
// 1. DATA REPOSITORY: ORIGINAL HIGH-CALIBER PASSAGES
// ==========================================================================
const PASSAGES = [
  {
    id: "p1-quantum-avian",
    title: "The Quantum Biology of Avian Navigation",
    category: "Science",
    difficulty: "Advanced",
    readTime: "4 min read",
    tagline: "How Migratory Birds Exploit Quantum Mechanics to Navigate Earth's Magnetic Field",
    paragraphs: [
      "For decades, ornithologists marveled at the astounding precision with which migratory songbirds traverse thousands of miles across featureless oceanic stretches and dense cloud cover. While celestial cues, olfactory maps, and landmark recognition provide partial guidance, behavioral experiments confirmed that birds possess an innate geomagnetic inclination compass. However, the biophysical mechanism enabling such exquisite sensitivity to Earth's minuscule magnetic field—tens of thousands of times weaker than a common refrigerator magnet—remained an enigma until the emergence of quantum biology.",
      "The prevailing hypothesis centers on cryptochromes, a specialized class of flavoproteins embedded in the retinas of migratory birds. When ambient blue light strikes cryptochrome-4 (Cry4), it triggers a sequential ultra-fast electron transfer across four tryptophan residues, generating a spatially separated radical pair. These entangled electron spins oscillate between singlet and triplet quantum states. Crucially, the lifetime and ultimate chemical fate of this radical pair are modulated by the orientation of the external geomagnetic field.",
      "This quantum chemical process translates sub-microtesla magnetic variations into neurobiological signals. Rather than feeling a physical tug like a conventional compass needle, researchers theorize that birds visually perceive the geomagnetic field as subtle variations of brightness or hue superimposed across their field of vision. Consequently, what appears to the casual observer as routine flight behavior is, in reality, a living macroscopic manifestation of quantum coherence operating at physiological temperatures.",
      "Nonetheless, this delicate quantum compass is vulnerable to anthropogenic disturbances. Broadband electromagnetic noise emitted by urban electronics and telecommunications infrastructure can disrupt the spin dynamics of radical pairs, temporarily disorienting migratory species. Understanding these quantum mechanisms is therefore not merely an academic triumph, but an urgent conservation imperative in an increasingly electrified biosphere."
    ],
    questions: [
      {
        id: "q1-1",
        type: "Main Idea",
        stem: "Which of the following statements best captures the central idea of the passage?",
        options: [
          "Avian navigation relies exclusively on celestial coordinates and learned geographic landmarks.",
          "Migratory birds utilize a light-activated quantum radical pair mechanism in retinal proteins to detect Earth's magnetic field.",
          "Urban electromagnetic radiation has permanently halted the migration patterns of most songbirds.",
          "Cryptochromes are magnetic minerals found inside the beaks of migratory species that act like physical compass needles."
        ],
        correct: 1,
        explanation: "The passage explains how cryptochrome proteins in birds' retinas generate quantum-entangled radical pairs that sense geomagnetic orientation.",
        evidence: "Paragraph 2 & 3: 'The prevailing hypothesis centers on cryptochromes... living macroscopic manifestation of quantum coherence'."
      },
      {
        id: "q1-2",
        type: "Vocabulary in Context",
        stem: "The word 'enigma' in paragraph 1 most nearly means:",
        options: [
          "A well-documented historical fact",
          "An inexplicable mystery or puzzle",
          "A hazardous obstacle in navigation",
          "A proven mathematical theorem"
        ],
        correct: 1,
        explanation: "In context, the mechanism remained an 'enigma' until quantum biology provided answers, meaning an unsolved mystery.",
        evidence: "Paragraph 1: '...remained an enigma until the emergence of quantum biology.'"
      },
      {
        id: "q1-3",
        type: "Inference",
        stem: "It can be logically inferred from paragraph 3 that migratory birds:",
        options: [
          "Possess microscopic iron filings that physically pull their heads toward the magnetic north.",
          "Experience geomagnetic fields as visual modulations rather than tactile sensations.",
          "Are incapable of flying during the day because direct sunlight destroys retinal enzymes.",
          "Rely on magnetic navigation only after all landmarks have been destroyed by humans."
        ],
        correct: 1,
        explanation: "Paragraph 3 explicitly notes that birds 'visually perceive the geomagnetic field as subtle variations of brightness or hue superimposed across their field of vision' rather than feeling a physical pull.",
        evidence: "Paragraph 3: 'Rather than feeling a physical tug... birds visually perceive the geomagnetic field as subtle variations of brightness or hue'."
      },
      {
        id: "q1-4",
        type: "Author's Tone",
        stem: "The author's tone in the final paragraph can best be described as:",
        options: [
          "Dismissive and indifferent toward ecological issues",
          "Objective and analytical with a note of conservationist urgency",
          "Satirical and mocking of modern technological advancements",
          "Overly sensational and pessimistic regarding avian extinction"
        ],
        correct: 1,
        explanation: "The author methodically explains how electromagnetic noise disrupts the mechanism and calls it an 'urgent conservation imperative', combining analytical rigor with environmental concern.",
        evidence: "Paragraph 4: '...not merely an academic triumph, but an urgent conservation imperative in an increasingly electrified biosphere.'"
      },
      {
        id: "q1-5",
        type: "Cause and Effect",
        stem: "According to paragraph 4, how does anthropogenic electromagnetic noise impact migratory birds?",
        options: [
          "It permanently damages their optic nerves through thermal radiation.",
          "It disrupts the quantum spin dynamics of radical pairs, hindering navigation.",
          "It alters Earth's core geomagnetic lines, forcing birds to adjust flight paths.",
          "It accelerates their metabolic rate, leading to premature fatigue."
        ],
        correct: 1,
        explanation: "Paragraph 4 explains that broadband electromagnetic noise disrupts the spin dynamics of radical pairs, leading to disorientation.",
        evidence: "Paragraph 4: 'Broadband electromagnetic noise... can disrupt the spin dynamics of radical pairs, temporarily disorienting migratory species.'"
      }
    ]
  },
  {
    id: "p2-algorithmic-epistemology",
    title: "Algorithmic Epistemology: Machine Learning in Science",
    category: "Technology",
    difficulty: "Advanced",
    readTime: "5 min read",
    tagline: "Evaluating the Shift from Hypothesis-Driven Theory to Black-Box Predictive Modeling",
    paragraphs: [
      "For centuries, the classical scientific method rested upon a foundational dialectic: the formulation of causal hypotheses derived from physical principles, followed by controlled empirical experimentation designed to falsify or substantiate those claims. Science was fundamentally explanatory, prioritizing intelligible mechanisms over mere correlation. Today, however, the rapid integration of deep learning architectures across disciplines—from protein folding prediction to astrophysics—has initiated a profound epistemological shift toward predictive capability without mechanistic transparency.",
      "Consider structural biology. For half a century, the 'protein folding problem' stumped researchers who sought analytical equations to describe how amino acid sequences spontaneously collapse into functional three-dimensional conformations. Deep neural networks solved this grand challenge not by deriving first-principles thermodynamic proofs, but by extracting high-dimensional statistical representations from vast crystallographic repositories. The predictions achieved atomic-level accuracy, yet the internal heuristics by which the model calculates these configurations remain largely impenetrable to human intuition.",
      "This 'black box' phenomenon raises thorny philosophical dilemmas. If an algorithm accurately forecasts a physical phenomenon without providing a conceptual framework that a scientist can comprehend, have we truly expanded scientific understanding, or merely constructed an oracle? Proponents argue that complex natural systems—such as climate dynamics and polygenic diseases—harbor non-linear interactions that exceed the cognitive bandwidth of the human brain, making algorithmic models an indispensable extension of inquiry.",
      "Conversely, skeptics caution against the uncritical acceptance of predictive accuracy in lieu of explanatory depth. They emphasize that models trained exclusively on historical data may inherit unrecognized biases, fail catastrophically when encountering out-of-distribution domain shifts, and obscure underlying physical laws. The future of scientific discovery will likely not belong to pure empiricism or pure computation, but to hybrid epistemologies that systematically couple data-driven machine learning with rigorous physical constraints."
    ],
    questions: [
      {
        id: "q2-1",
        type: "Best Title",
        stem: "Which of the following titles most accurately reflects the scope and focus of the passage?",
        options: [
          "The Complete Replacement of Human Scientists by Autonomous Algorithms",
          "Algorithmic Prediction versus Mechanistic Explanation in Modern Science",
          "A Step-by-Step Guide to Coding Neural Networks for Protein Synthesis",
          "The Fatal Flaws and Inevitable Collapse of Computational Biology"
        ],
        correct: 1,
        explanation: "The passage explores the tension and balance between traditional mechanistic explanations and modern black-box predictive machine learning models in scientific inquiry.",
        evidence: "Throughout: 'epistemological shift toward predictive capability without mechanistic transparency... hybrid epistemologies'."
      },
      {
        id: "q2-2",
        type: "Passage Structure",
        stem: "The overall organizational structure of the passage is best described as:",
        options: [
          "A chronological narrative tracing the invention of computers from antiquity to today.",
          "A problem introduced, followed by contrasting viewpoints and a proposed synthesis.",
          "A series of unrelated anecdotes about failed laboratory experiments.",
          "A purely descriptive taxonomy of deep learning mathematical algorithms."
        ],
        correct: 1,
        explanation: "The author introduces the epistemological shift/problem (paras 1-2), presents arguments from proponents (para 3) and skeptics (para 4), and concludes with a hybrid synthesis.",
        evidence: "Paragraphs 1-4 structural flow."
      },
      {
        id: "q2-3",
        type: "Vocabulary in Context",
        stem: "The word 'oracle' in paragraph 3 is used metaphorically to denote:",
        options: [
          "A religious artifact revered in historical mythology",
          "A system that delivers accurate answers without illuminating how they were derived",
          "A computer virus designed to corrupt laboratory databases",
          "An open-source scientific database accessible to the general public"
        ],
        correct: 1,
        explanation: "The author asks whether we expanded understanding or 'merely constructed an oracle'—a source of accurate answers lacking transparent explanation.",
        evidence: "Paragraph 3: 'If an algorithm accurately forecasts a physical phenomenon without providing a conceptual framework... have we truly expanded scientific understanding, or merely constructed an oracle?'"
      },
      {
        id: "q2-4",
        type: "NOT / EXCEPT",
        stem: "According to the passage, all of the following are concerns raised by skeptics EXCEPT:",
        options: [
          "Deep learning models may fail when exposed to conditions outside their training distribution.",
          "Models may inherit subtle biases present within historical datasets.",
          "Machine learning algorithms consume too much physical electricity to be used in chemistry labs.",
          "High predictive accuracy can obscure genuine underlying physical laws."
        ],
        correct: 2,
        explanation: "Paragraph 4 lists biases, out-of-distribution failures, and obscuring physical laws. Electricity/power consumption is never mentioned in the text.",
        evidence: "Paragraph 4: '...may inherit unrecognized biases, fail catastrophically when encountering out-of-distribution domain shifts, and obscure underlying physical laws.'"
      },
      {
        id: "q2-5",
        type: "Inference",
        stem: "Based on the concluding paragraph, the author advocates for:",
        options: [
          "The complete abandonment of machine learning in academic research.",
          "An integrated methodology harmonizing computational prediction with physical theory.",
          "Relying solely on intuition without validating mathematical models.",
          "Restricting protein research exclusively to manual crystallographic methods."
        ],
        correct: 1,
        explanation: "The author explicitly concludes that future scientific discovery requires 'hybrid epistemologies that systematically couple data-driven machine learning with rigorous physical constraints'.",
        evidence: "Paragraph 4: 'The future of scientific discovery will likely... belong to hybrid epistemologies that systematically couple data-driven machine learning with rigorous physical constraints.'"
      }
    ]
  },
  {
    id: "p3-urban-canopy",
    title: "The Urban Canopy: Microclimate Mitigation",
    category: "Environment",
    difficulty: "Intermediate",
    readTime: "3.5 min read",
    tagline: "Combating the Urban Heat Island Effect through Strategic Vegetative Infrastructure",
    paragraphs: [
      "Dense urban centers frequently register ambient temperatures between 3°C and 8°C higher than their surrounding rural peripheries, a meteorological anomaly known as the Urban Heat Island (UHI) effect. This thermal disparity stems from a confluence of anthropogenic factors: the proliferation of dark, low-albedo asphalt and concrete surfaces that absorb solar irradiance; the geometry of urban canyons that trap radiant heat; and the continuous release of waste heat from transportation, air conditioning, and industrial machinery.",
      "The consequences of unmitigated urban heat extend far beyond mere discomfort. Elevated urban temperatures exacerbate cardiovascular and respiratory illnesses, accelerate photochemical smog formation by speeding up ground-level ozone reactions, and trigger substantial spikes in municipal electricity demand during peak cooling hours. In response, municipal planners and environmental engineers are increasingly prioritizing the expansion of the urban canopy as a cost-effective, nature-based cooling mechanism.",
      "Vegetation mitigates urban heat through two primary mechanisms: solar shading and evapotranspiration. Tree canopies intercept incoming solar radiation, preventing impervious surfaces from storing sensible heat during the day. Concurrently, root systems draw moisture from the soil, which leaves release into the surrounding air as water vapor, converting solar energy into latent heat and cooling the localized microclimate. Studies indicate that mature tree canopies can reduce peak summer surface temperatures by up to 15°C.",
      "However, the implementation of urban forestry is fraught with socioeconomic disparities. In many metropolitan areas, high-income neighborhoods boast lush, mature tree coverage, whereas historically disinvested districts suffer from sparse vegetation and disproportionate heat vulnerability. Rectifying this 'canopy gap' is not merely an ecological objective, but a cornerstone of equitable urban climate adaptation."
    ],
    questions: [
      {
        id: "q3-1",
        type: "Supporting Detail",
        stem: "According to paragraph 1, which factor directly contributes to the Urban Heat Island effect?",
        options: [
          "An overabundance of reflective glass mirrors along rural highways",
          "Low-albedo materials that absorb solar radiation and urban canyon geometry",
          "A decrease in the rate of municipal electricity consumption",
          "The natural elevation of cities above sea level"
        ],
        correct: 1,
        explanation: "Paragraph 1 lists 'dark, low-albedo asphalt and concrete surfaces that absorb solar irradiance' and 'geometry of urban canyons that trap radiant heat'.",
        evidence: "Paragraph 1: '...proliferation of dark, low-albedo asphalt and concrete surfaces... geometry of urban canyons...'"
      },
      {
        id: "q3-2",
        type: "Vocabulary in Context",
        stem: "The term 'albedo' as implied in paragraph 1 refers to:",
        options: [
          "The chemical toxicity of industrial emissions",
          "The fraction of solar radiation reflected by a surface",
          "The total population density within an urban area",
          "The speed of air currents moving through street canyons"
        ],
        correct: 1,
        explanation: "Low-albedo surfaces 'absorb solar irradiance', indicating that albedo relates to surface reflectivity.",
        evidence: "Paragraph 1: '...dark, low-albedo asphalt and concrete surfaces that absorb solar irradiance...'"
      },
      {
        id: "q3-3",
        type: "Fact vs Opinion",
        stem: "Which of the following statements from the passage represents a verifiable factual claim rather than a subjective opinion?",
        options: [
          "High-income neighborhoods are morally superior due to their green parks.",
          "Mature tree canopies can reduce peak summer surface temperatures by up to 15°C.",
          "Living in a city without trees is the worst human experience possible.",
          "Modern architecture is aesthetically unpleasing to all citizens."
        ],
        correct: 1,
        explanation: "The temperature reduction figure of 15°C is an empirical scientific measurement, making it a verifiable fact.",
        evidence: "Paragraph 3: 'Studies indicate that mature tree canopies can reduce peak summer surface temperatures by up to 15°C.'"
      },
      {
        id: "q3-4",
        type: "Author's Purpose",
        stem: "Why does the author include the discussion of socioeconomic disparities in paragraph 4?",
        options: [
          "To argue that urban forestry should be abandoned in wealthy communities",
          "To demonstrate that heat vulnerability intersects with social and economic inequality",
          "To prove that trees grow faster in lower-income residential areas",
          "To criticize environmental engineers for using scientific terminology"
        ],
        correct: 1,
        explanation: "Paragraph 4 connects tree canopy distribution with historical disinvestment and demands equitable climate adaptation.",
        evidence: "Paragraph 4: '...historically disinvested districts suffer from sparse vegetation... Rectifying this canopy gap is... a cornerstone of equitable urban climate adaptation.'"
      }
    ]
  },
  {
    id: "p4-paradox-choice",
    title: "The Paradox of Choice and Decision Fatigue",
    category: "Psychology",
    difficulty: "Intermediate",
    readTime: "4 min read",
    tagline: "How Modern Hyper-Abundance Undermines Subjective Well-Being",
    paragraphs: [
      "In contemporary consumer culture, autonomy is frequently conflated with the sheer volume of available options. Standard neoclassical economic theory posits that expanding consumer choice is unconditionally beneficial: with more alternatives, an individual has a higher probability of identifying an option that perfectly matches their unique preferences. Yet empirical research in behavioral economics and cognitive psychology reveals a counterintuitive reality: beyond a modest threshold, the proliferation of choices generates cognitive overload, elevated anxiety, and systemic paralysis.",
      "Psychologist Barry Schwartz famously bifurcated decision-makers into two archetypes: 'maximizers' and 'satisficers.' Maximizers strive to make the absolute optimal choice across all parameters, compelling them to exhaustively evaluate every available alternative. Satisficers, by contrast, operate with defined threshold criteria; once an option satisfies their standard of 'good enough,' they terminate their search. While maximizers may occasionally attain marginally superior objective outcomes, they consistently report lower subjective satisfaction, higher post-decision regret, and persistent counterfactual rumination.",
      "Furthermore, the neurological cost of continuous micro-deliberations culminates in a phenomenon known as 'decision fatigue.' Unlike physical exertion, which signals exhaustion through localized muscular strain, cognitive depletion degrades self-regulatory capacity covertly. As the prefrontal cortex processes successive dilemmas throughout the day, mental stamina erodes. Consequently, decision-makers default to cognitive shortcuts, impulsive selections, or complete postponement of critical choices.",
      "Mitigating the paradox of choice does not necessitate a return to scarcity, but rather the intentional curation of choice architecture. By establishing pre-commitments, automating routine choices, and embracing satisficing heuristics, individuals can preserve cognitive bandwidth for substantive deliberative tasks."
    ],
    questions: [
      {
        id: "q4-1",
        type: "Main Idea",
        stem: "What is the core argument advanced by the author throughout the text?",
        options: [
          "Consumer choice should be eliminated entirely by government regulatory bodies.",
          "Having an excessive number of choices often leads to psychological distress and poorer decision-making.",
          "Satisficers always earn less income than maximizers due to their laziness.",
          "Decision fatigue only occurs in corporate executives managing large financial funds."
        ],
        correct: 1,
        explanation: "The passage demonstrates how choice abundance leads to cognitive overload, lower satisfaction, and decision fatigue.",
        evidence: "Paragraph 1: '...the proliferation of choices generates cognitive overload, elevated anxiety, and systemic paralysis.'"
      },
      {
        id: "q4-2",
        type: "Vocabulary in Context",
        stem: "The word 'paralysis' in paragraph 1 most nearly means:",
        options: [
          "Physical loss of motor function in the nervous system",
          "Inability to make a decision or take action due to overwhelm",
          "A state of profound happiness and relaxation",
          "Rapid financial growth in retail markets"
        ],
        correct: 1,
        explanation: "In this cognitive context, paralysis refers to the psychological inability to decide due to excessive options.",
        evidence: "Paragraph 1: '...generates cognitive overload, elevated anxiety, and systemic paralysis.'"
      },
      {
        id: "q4-3",
        type: "Compare and Contrast",
        stem: "According to paragraph 2, how do 'satisficers' differ from 'maximizers'?",
        options: [
          "Satisficers inspect every single product on the market before purchasing.",
          "Satisficers stop searching once an option meets their acceptable criteria, experiencing less regret.",
          "Satisficers never experience happiness from their choices.",
          "Satisficers rely exclusively on algorithmic recommendations."
        ],
        correct: 1,
        explanation: "Paragraph 2 explains satisficers set criteria and terminate search upon finding 'good enough', reporting higher subjective satisfaction.",
        evidence: "Paragraph 2: 'Satisficers... operate with defined threshold criteria; once an option satisfies their standard of good enough, they terminate their search.'"
      },
      {
        id: "q4-4",
        type: "Inference",
        stem: "Which of the following scenarios best illustrates the concept of 'decision fatigue' described in paragraph 3?",
        options: [
          "An athlete completing a marathon and feeling muscle soreness.",
          "A judge making more lenient or default rulings late in the afternoon after hearing cases all day.",
          "A student reading a textbook in absolute silence without any distractions.",
          "A customer purchasing a product simply because it was on discount."
        ],
        correct: 1,
        explanation: "Decision fatigue involves cognitive stamina eroding after successive decisions, causing default or shortcut behaviors.",
        evidence: "Paragraph 3: 'As the prefrontal cortex processes successive dilemmas throughout the day, mental stamina erodes... decision-makers default to cognitive shortcuts'."
      }
    ]
  },
  {
    id: "p5-spacing-effect",
    title: "The Spacing Effect and Desirable Difficulties",
    category: "Education",
    difficulty: "Beginner",
    readTime: "3 min read",
    tagline: "Optimizing Long-Term Knowledge Retention through Cognitive Science",
    paragraphs: [
      "When preparing for academic assessments, a ubiquitous tendency among students is 'cramming'—concentrating study efforts into intensive, marathon sessions immediately preceding an exam. While massed practice of this kind can produce satisfactory immediate recall on short-term evaluations, cognitive psychologists have repeatedly demonstrated that its long-term retention rate is remarkably abysmal.",
      "The counterweight to cramming is the 'spacing effect,' first systematically documented by Hermann Ebbinghaus in the late nineteenth century. Distributed practice involves spacing study sessions across intervals of time. When study sessions are distributed, the brain is forced to repeatedly retrieve information from memory just as that information begins to fade. This effortful retrieval reconstructs neural pathways, signaling to the brain that the knowledge is vital for future recall.",
      "Cognitive scientist Robert Bjork coined the term 'desirable difficulties' to encapsulate this phenomenon. Learning strategies that feel fluent, such as passive re-reading or highlighted notes, generate an illusion of mastery. In reality, durable comprehension requires cognitive friction: self-testing, flashcard retrieval, and interleaving distinct problem types. Although these techniques feel harder and slower during the initial acquisition phase, they dramatically enhance durable recall over months and years."
    ],
    questions: [
      {
        id: "q5-1",
        type: "Best Title",
        stem: "Which title best captures the core theme of the passage?",
        options: [
          "Why Cramming is the Most Efficient Strategy for Final Exams",
          "The Spacing Effect: How Effortful Retrieval Builds Lasting Memory",
          "The History of Twentieth Century School Curriculums",
          "The Dangers of Highlighting Textbooks in Ink"
        ],
        correct: 1,
        explanation: "The passage discusses why distributed practice and effortful retrieval ('spacing effect' and 'desirable difficulties') lead to superior long-term memory.",
        evidence: "Paragraph 2 & 3 themes."
      },
      {
        id: "q5-2",
        type: "Supporting Detail",
        stem: "According to the author, passive re-reading of notes is problematic because it:",
        options: [
          "Permanently damages the reader's eyesight",
          "Creates a deceptive illusion of mastery without durable memory formation",
          "Takes far more time than distributed self-testing",
          "Has been banned by cognitive psychology organizations"
        ],
        correct: 1,
        explanation: "Paragraph 3 notes that strategies feeling fluent like passive re-reading 'generate an illusion of mastery' while durable learning requires cognitive friction.",
        evidence: "Paragraph 3: 'Learning strategies that feel fluent, such as passive re-reading... generate an illusion of mastery.'"
      },
      {
        id: "q5-3",
        type: "Vocabulary in Context",
        stem: "The word 'ubiquitous' in paragraph 1 most nearly means:",
        options: [
          "Extremely rare and unheard of",
          "Found everywhere or widespread",
          "Scientifically validated",
          "Dangerous to public safety"
        ],
        correct: 1,
        explanation: "A 'ubiquitous tendency' refers to a common, widespread habit among students.",
        evidence: "Paragraph 1: '...a ubiquitous tendency among students is cramming...'"
      }
    ]
  },
  {
    id: "p6-mycorrhizal-networks",
    title: "Mycorrhizal Networks: Underground Forest Mutualism",
    category: "Nature",
    difficulty: "Intermediate",
    readTime: "4.5 min read",
    tagline: "Deconstructing the Fungal Hyphae Connecting Arboreal Ecosystems",
    paragraphs: [
      "Beneath the tranquil floor of temperate and tropical forests lies a dynamic, microscopic infrastructure that challenges traditional conceptions of plant individualism. Mycorrhizal networks—symbiotic associations between specialized soil fungi and tree root systems—connect disparate flora into continuous subterranean webs. Through these fungal hyphae, trees trade photosynthetic carbon for vital soil nutrients, such as phosphorus and nitrogen, which the fungi extract with exceptional biochemical efficiency.",
      "Pioneering isotope tracing experiments have revealed that these networks facilitate inter-plant resource sharing. Mature 'mother trees' with extensive foliage can transfer surplus carbon to shaded understory saplings, buffering them against premature mortality until they penetrate the forest canopy. Furthermore, when attacked by insect herbivores or fungal pathogens, infested trees can transmit biochemical warning signals through the network, prompting neighboring trees to preemptively upregulate their chemical defenses, such as tannins and protease inhibitors.",
      "However, some ecologists urge caution against romanticizing mycorrhizal networks as purely altruistic communes. The subterranean economy is governed by mutualistic negotiation and evolutionary self-interest: the fungi actively regulate resource allocation to maximize their own carbon intake, and certain parasitic plant species infiltrate the network solely to siphon nutrients without contributing reciprocally. A rigorous understanding of forest ecology must embrace both collaborative mutualism and fierce biological competition."
    ],
    questions: [
      {
        id: "q6-1",
        type: "Main Idea",
        stem: "What is the primary focus of the passage?",
        options: [
          "The rapid deforestation caused by parasitic subterranean mushrooms",
          "The complex mutualistic resource sharing and chemical signaling mediated by forest fungal networks",
          "The industrial extraction of phosphorus for commercial agriculture",
          "The failure of trees to defend themselves without human chemical pesticides"
        ],
        correct: 1,
        explanation: "The passage describes mycorrhizal networks, their role in resource transfer and defense signaling, and the nuanced dynamics of mutualism and competition.",
        evidence: "Paragraph 1 & 2 summaries."
      },
      {
        id: "q6-2",
        type: "Author's Tone",
        stem: "The author's perspective in paragraph 3 is best characterized as:",
        options: [
          "Overly sentimental and poetic",
          "Critical, nuanced, and scientifically grounded",
          "Despairing and pessimistic about forest survival",
          "Skeptical of all biological laboratory data"
        ],
        correct: 1,
        explanation: "Paragraph 3 cautions against 'romanticizing' the network and emphasizes rigorous scientific nuance incorporating competition and self-interest.",
        evidence: "Paragraph 3: '...ecologists urge caution against romanticizing... A rigorous understanding of forest ecology must embrace both collaborative mutualism and fierce biological competition.'"
      },
      {
        id: "q6-3",
        type: "Inference",
        stem: "Based on paragraph 2, if an isolated tree without mycorrhizal connections is attacked by insects, it will most likely:",
        options: [
          "Immediately absorb carbon from distant understory saplings",
          "Be unable to warn adjacent trees via subterranean fungal pathways",
          "Grow new leaves within twenty-four hours to replace damaged foliage",
          "Transform into a carnivorous plant to eliminate the pest"
        ],
        correct: 1,
        explanation: "Because biochemical warnings travel through the mycorrhizal fungal network, an unconnected tree cannot send subterranean warnings to neighbors.",
        evidence: "Paragraph 2: '...infested trees can transmit biochemical warning signals through the network, prompting neighboring trees to preemptively upregulate...'"
      }
    ]
  },
  {
    id: "p7-lidar-archaeology",
    title: "Lidar Remote Sensing in Mesoamerican Archaeology",
    category: "History",
    difficulty: "Intermediate",
    readTime: "4 min read",
    tagline: "Peering Through the Dense Canopy to Uncover Ancient Megacities",
    paragraphs: [
      "For over a century, archaeologists reconstructing ancient Mesoamerican civilizations were constrained by the impenetrable jungles of Guatemala, Belize, and southern Mexico. Ground surveys were painstakingly slow, requiring machete-wielding expeditions to map mounds and stone masonry buried beneath dense multi-layered canopies. Consequently, the prevailing historical consensus held that classical Maya settlements were relatively modest, decentralized ceremonial centers surrounded by sparse rural populations practicing slash-and-burn farming.",
      "The deployment of airborne Lidar (Light Detection and Ranging) technology obliterated this modest paradigm. Operating from low-flying aircraft, Lidar instruments pulse hundreds of thousands of laser beams per second toward the earth. While the majority of photons reflect off dense leaves and branches, a vital fraction penetrates the forest canopy, reflects off the true terrain, and returns to the sensor. Digital filtering algorithms subsequently strip away the vegetative layer, generating high-resolution digital elevation models of the bare ground surface.",
      "The resultant archaeological maps stunned the academic community. Buried beneath the jungle was a continuous, interconnected urban landscape featuring tens of thousands of previously unknown structures: monumental pyramids, elevated causeways connecting distant city-states, sophisticated agricultural terracing, and extensive irrigation canals. The demographic data forced historians to revise Maya population estimates upward by several million people, proving that pre-Columbian Mesoamerica supported complex agrarian civilizations on a scale comparable to classical Greece or imperial Rome."
    ],
    questions: [
      {
        id: "q7-1",
        type: "Cause and Effect",
        stem: "What was the direct historical effect of introducing airborne Lidar mapping in Mesoamerica?",
        options: [
          "It caused irreversible physical destruction to archaeological stone monuments.",
          "It forced historians to dramatically increase population estimates and recognize massive urban complexity.",
          "It proved that the Maya civilization never built stone structures.",
          "It halted all future jungle excavations due to government regulations."
        ],
        correct: 1,
        explanation: "Paragraph 3 states Lidar maps revealed interconnected cities and forced historians to revise population estimates upward by several millions.",
        evidence: "Paragraph 3: '...forced historians to revise Maya population estimates upward by several million people, proving that pre-Columbian Mesoamerica supported complex agrarian civilizations...'"
      },
      {
        id: "q7-2",
        type: "Inference",
        stem: "Why were pre-Lidar estimates of Maya population and urbanism so significantly understated?",
        options: [
          "Ancient Maya scribes intentionally falsified their demographic records.",
          "Traditional ground expeditions could only survey small clearings through impenetrable jungle foliage.",
          "Previous archaeologists deliberately ignored monumental architecture.",
          "Early aerial photography could only be taken at night."
        ],
        correct: 1,
        explanation: "Paragraph 1 explains ground surveys were constrained by impenetrable jungle canopies requiring slow machete expeditions.",
        evidence: "Paragraph 1: '...constrained by the impenetrable jungles... Ground surveys were painstakingly slow...'"
      },
      {
        id: "q7-3",
        type: "NOT / EXCEPT",
        stem: "According to paragraph 3, all of the following archaeological features were revealed by Lidar EXCEPT:",
        options: [
          "Elevated causeways linking distant city-states",
          "Extensive agricultural terracing and irrigation canals",
          "Underground subway tunnels powered by steam engines",
          "Previously undiscovered monumental pyramids"
        ],
        correct: 2,
        explanation: "Pyramids, causeways, terraces, and canals are explicitly mentioned; steam-powered subway tunnels are absurd and unmentioned.",
        evidence: "Paragraph 3: '...monumental pyramids, elevated causeways... agricultural terracing, and extensive irrigation canals.'"
      }
    ]
  },
  {
    id: "p8-social-contagion",
    title: "The Architecture of Social Contagion and Echo Chambers",
    category: "Society",
    difficulty: "Advanced",
    readTime: "4.5 min read",
    tagline: "Examining Homophily, Emotional Cascades, and Algorithmic Polarization",
    paragraphs: [
      "Human sociability has always exhibited 'homophily'—the natural sociological propensity of individuals to affiliate predominantly with peers holding concordant beliefs, values, and socioeconomic backgrounds. Historically, however, geographic friction, diverse workplace encounters, and broad public broadcasting acted as mitigating counterweights, exposing citizens to serendipitous cross-cutting perspectives. The migration of discourse into digital social architectures has systematically dismantled these analog guardrails.",
      "Contemporary recommendation algorithms operate on engagement optimization metrics. Because emotional resonance—particularly high-arousal moral outrage and tribal indignation—drives higher click-through rates and dwell time, platform algorithms preferentially amplify contentious content. This creates self-reinforcing epistemic bubbles where users are repeatedly fed ideological affirmations while dissenting viewpoints are either hidden or presented solely as objects of collective ridicule.",
      "This dynamic fosters 'social contagion,' wherein affective states propagate rapidly across network nodes like infectious pathogens. Within closed ideological clusters, group polarization accelerates: individuals adopt progressively more extreme positions to signal fidelity to their in-group. As epistemic trust in external institutions erodes, the capacity for democratic deliberation, nuanced compromise, and collective fact-finding becomes severely compromised."
    ],
    questions: [
      {
        id: "q8-1",
        type: "Main Idea",
        stem: "What is the central thesis articulated in the passage?",
        options: [
          "Social media platforms have eliminated all interpersonal prejudice and restored true democracy.",
          "Algorithmic optimization for engagement combined with homophily creates polarized echo chambers that degrade public discourse.",
          "Moral outrage is an evolutionary flaw that only exists in internet users under thirty.",
          "Broadcasting television networks have always been more dangerous than internet algorithms."
        ],
        correct: 1,
        explanation: "The passage analyzes how algorithmic amplification of outrage and homophily fuel polarization and damage public deliberation.",
        evidence: "Paragraphs 1-3 synthesis."
      },
      {
        id: "q8-2",
        type: "Vocabulary in Context",
        stem: "The word 'concordant' in paragraph 1 most nearly means:",
        options: [
          "Conflicting and hostile",
          "Harmonious, similar, or agreeing",
          "Mysterious and unpredictable",
          "Financially profitable"
        ],
        correct: 1,
        explanation: "Homophily is the tendency to affiliate with peers holding similar/agreeing beliefs.",
        evidence: "Paragraph 1: '...affiliate predominantly with peers holding concordant beliefs, values...'"
      },
      {
        id: "q8-3",
        type: "Inference",
        stem: "It can be inferred that social media companies prioritize moral outrage primarily because:",
        options: [
          "Their stated philanthropic mission is to eliminate political corruption.",
          "High-arousal emotional content maximizes user engagement and commercial platform metrics.",
          "Algorithms are incapable of processing calm or factual text.",
          "Users specifically request anger-inducing stories in their user profile settings."
        ],
        correct: 1,
        explanation: "Paragraph 2 explains algorithms optimize for engagement, and moral outrage produces higher click-through rates and dwell time.",
        evidence: "Paragraph 2: 'Because emotional resonance—particularly high-arousal moral outrage... drives higher click-through rates and dwell time...'"
      }
    ]
  },
  {
    id: "p9-circadian-clocks",
    title: "Circadian Misalignment and the Cellular Clock",
    category: "Health",
    difficulty: "Intermediate",
    readTime: "4 min read",
    tagline: "How Modern Artificial Lighting and Irregular Eating Disrupt Peripheral Biological Rhythms",
    paragraphs: [
      "For nearly all of terrestrial evolutionary history, biological life conformed to the predictable diurnal oscillation of the solar cycle. To anticipate recurring environmental fluctuations in temperature, light, and food availability, organisms developed internal circadian clocks. In mammals, this master pacemaker resides in the suprachiasmatic nucleus (SCN) of the hypothalamus, synchronized primarily by ambient photons detected by retinal ganglion cells containing the photopigment melanopsin.",
      "However, modern chronobiology has revealed that circadian clocks are not confined to the brain. Virtually every peripheral tissue—including the liver, pancreas, adipose tissue, and skeletal muscle—contains autonomous molecular clock machinery governed by autoregulatory transcriptional-translational feedback loops of genes such as CLOCK, BMAL1, and PERIOD. While the central SCN clock responds principally to light, peripheral clocks are strongly entrained by metabolic inputs, specifically the timing of nutrient ingestion.",
      "When an individual engages in chronic late-night feeding under artificial blue-wavelength LED illumination, a pathological state of 'circadian misalignment' ensues. The central SCN clock perceives daylight from screen exposure, while liver and pancreatic clocks are activated by midnight calorie surges. This desynchronization impairs insulin sensitivity, disrupts lipid metabolism, and promotes systemic inflammation. Prolonged chronodisruption is now recognized as a primary risk factor for metabolic syndrome, cardiovascular disease, and immunological decline."
    ],
    questions: [
      {
        id: "q9-1",
        type: "Supporting Detail",
        stem: "According to paragraph 2, while the central SCN clock is primarily synchronized by light, peripheral organ clocks are entrained by:",
        options: [
          "Auditory sounds from natural environments",
          "The timing of food consumption and nutrient ingestion",
          "Atmospheric barometric pressure changes",
          "Rigid physical exercise alone"
        ],
        correct: 1,
        explanation: "Paragraph 2 states 'peripheral clocks are strongly entrained by metabolic inputs, specifically the timing of nutrient ingestion.'",
        evidence: "Paragraph 2: '...peripheral clocks are strongly entrained by metabolic inputs, specifically the timing of nutrient ingestion.'"
      },
      {
        id: "q9-2",
        type: "Cause and Effect",
        stem: "What occurs during 'circadian misalignment' as described in paragraph 3?",
        options: [
          "The brain completely shuts down all metabolic processes permanently.",
          "Central and peripheral clocks fall out of synchronization, impairing insulin and lipid metabolism.",
          "Melanopsin in the eyes begins producing synthetic sugar molecules.",
          "The heart rate doubles during sleeping hours."
        ],
        correct: 1,
        explanation: "Desynchronization between light-cued central clocks and food-cued peripheral clocks leads to metabolic disruption.",
        evidence: "Paragraph 3: 'This desynchronization impairs insulin sensitivity, disrupts lipid metabolism, and promotes systemic inflammation.'"
      },
      {
        id: "q9-3",
        type: "Vocabulary in Context",
        stem: "The word 'diurnal' in paragraph 1 most nearly means:",
        options: [
          "Occurring at irregular multi-year intervals",
          "Pertaining to or recurring during the daily day-night cycle",
          "Caused exclusively by artificial chemical reactions",
          "Extremely hazardous to human cells"
        ],
        correct: 1,
        explanation: "Diurnal refers to daily patterns recurring across day and night.",
        evidence: "Paragraph 1: '...diurnal oscillation of the solar cycle.'"
      }
    ]
  },
  {
    id: "p10-exoplanet-biosignatures",
    title: "The Search for Biosignatures in Exoplanetary Atmospheres",
    category: "Space",
    difficulty: "Advanced",
    readTime: "4.5 min read",
    tagline: "Spectroscopy, Chemical Disequilibrium, and the Quest for Extraterrestrial Life",
    paragraphs: [
      "In the burgeoning discipline of astrobiology, the definitive detection of extraterrestrial life is unlikely to arrive as an intercepted radio broadcast. Instead, the most promising evidence will likely manifest as subtle spectral fingerprints within the atmospheres of transiting exoplanets orbiting distant stars. As an exoplanet passes in front of its host star, starlight filters through its atmospheric annulus, where specific chemical molecules absorb characteristic wavelengths, imprinting distinct absorption lines upon transmission spectra.",
      "The holy grail of atmospheric analysis is the identification of 'thermodynamic disequilibrium.' In a sterile, abiotic planetary atmosphere, chemical constituents will naturally settle into stable thermodynamic equilibrium dictated by ambient temperature, pressure, and solar ultraviolet radiation. Conversely, biological life actively metabolizes energy and expels waste gases, maintaining atmospheric combinations that could not persist together without continuous biological replenishment.",
      "A classic potential biosignature is the simultaneous coexistence of abundant methane (CH4) and oxygen (O2) or ozone (O3). In the presence of sunlight, methane and oxygen react rapidly to produce carbon dioxide and water; thus, their ongoing coexistence on Earth is sustained solely by relentless biological generation from photosynthesis and methanogens. However, astrobiologists exercise extreme caution against false positives: abiotic geochemical pathways, such as serpentinization and ultraviolet photolysis of water ice, can mimic individual biosignatures under specific stellar conditions."
    ],
    questions: [
      {
        id: "q10-1",
        type: "Inference",
        stem: "Why is the simultaneous detection of both methane and oxygen considered a strong indicator of biological activity?",
        options: [
          "Because neither gas can ever exist on an icy planet without humans.",
          "Because the two gases react and destroy each other quickly, requiring continuous active replenishment.",
          "Because oxygen is the only element capable of absorbing infrared light.",
          "Because telescopes cannot detect any other chemical elements in space."
        ],
        correct: 1,
        explanation: "Paragraph 3 explains that methane and oxygen react rapidly in sunlight, so their ongoing coexistence requires continuous biological replenishment.",
        evidence: "Paragraph 3: 'In the presence of sunlight, methane and oxygen react rapidly... thus, their ongoing coexistence on Earth is sustained solely by relentless biological generation...'"
      },
      {
        id: "q10-2",
        type: "Author's Tone",
        stem: "The author's tone toward claiming the discovery of extraterrestrial life can best be described as:",
        options: [
          "Recklessly optimistic and credulous",
          "Methodical, cautious, and scientifically rigorous",
          "Skeptical to the point of denying all astronomical research",
          "Apathetic and uninterested in space exploration"
        ],
        correct: 1,
        explanation: "The author highlights spectroscopic techniques while emphasizing 'extreme caution against false positives' and abiotic mimicry.",
        evidence: "Paragraph 3: '...astrobiologists exercise extreme caution against false positives: abiotic geochemical pathways... can mimic individual biosignatures...'"
      },
      {
        id: "q10-3",
        type: "Best Title",
        stem: "Which title best captures the core subject of the passage?",
        options: [
          "The Impossibility of Finding Water on Mars",
          "Spectral Biosignatures and Atmospheric Disequilibrium in Exoplanet Science",
          "Why Radio Telescopes Have Failed to Find Alien Intelligence",
          "The Chemical Composition of Common Household Gases"
        ],
        correct: 1,
        explanation: "The passage centers on using transmission spectra to identify chemical disequilibrium as biosignatures on exoplanets.",
        evidence: "Paragraphs 1-3 thematic synthesis."
      }
    ]
  },
  {
    id: "p11-sunk-cost",
    title: "The Sunk Cost Fallacy: Cognitive Traps in Rationality",
    category: "Critical Thinking",
    difficulty: "Beginner",
    readTime: "3.5 min read",
    tagline: "Why Past Investments Distort Future Strategic Deliberation",
    paragraphs: [
      "In classical economic modeling, a rational agent makes forward-looking decisions based strictly on expected marginal benefits and marginal costs. Past expenditures—whether of currency, time, or emotional energy—that cannot be recovered are classified as 'sunk costs' and should exert zero mathematical influence on subsequent strategic evaluations. In practice, human psychology frequently violates this fundamental axiom of rational decision-making.",
      "The 'sunk cost fallacy' describes the cognitive tendency to persist in an endeavor, investment, or failing project primarily because of cumulative resources already expended. Whether continuing to watch an unengaging film because one purchased the ticket, or pumping millions into a doomed corporate venture to 'justify' initial capital outlays, individuals fall prey to loss aversion and an aversion to admitting waste.",
      "Psychologically, abandoning a project feels like converting a temporary setback into a permanent, undeniable loss. Consequently, decision-makers exhibit an 'escalation of commitment,' irrationally squandering additional valuable resources in a futile attempt to salvage past investments. Overcoming this cognitive distortion requires cultivating prospective discipline: evaluating every choice strictly on its future utility regardless of historical expenditure."
    ],
    questions: [
      {
        id: "q11-1",
        type: "Main Idea",
        stem: "What is the primary message of the passage regarding the sunk cost fallacy?",
        options: [
          "Investors should always finish every movie they start to ensure maximum financial return.",
          "People irrationally persist in failing endeavors to justify unrecoverable past investments rather than assessing future utility.",
          "Sunk costs are valid accounting assets that can be legally refunded by banks.",
          "Rationality is impossible for any human being under any economic circumstances."
        ],
        correct: 1,
        explanation: "The passage explains that individuals persist in failing projects because of past unrecoverable expenditures rather than future benefits.",
        evidence: "Paragraph 2 & 3 summary."
      },
      {
        id: "q11-2",
        type: "Vocabulary in Context",
        stem: "The word 'prospective' in paragraph 3 most nearly means:",
        options: [
          "Looking forward toward future outcomes",
          "Obsessed with ancient historical events",
          "Financially bankrupt or insolvent",
          "Legally prohibited by court order"
        ],
        correct: 0,
        explanation: "Prospective discipline evaluates future utility rather than historical/past expenditure.",
        evidence: "Paragraph 3: '...cultivating prospective discipline: evaluating every choice strictly on its future utility...'"
      },
      {
        id: "q11-3",
        type: "Inference",
        stem: "According to the passage, a strictly rational decision-maker facing a failing software project with $500,000 already spent would:",
        options: [
          "Spend another $1,000,000 immediately so the previous $500,000 is not considered wasted.",
          "Assess whether future returns exceed remaining future costs, ignoring the $500,000 already spent.",
          "Sue the software engineers for emotional distress.",
          "Refuse to work on any future projects for the rest of their career."
        ],
        correct: 1,
        explanation: "A rational actor ignores unrecoverable sunk costs ($500k) and assesses future marginal costs versus future marginal benefits.",
        evidence: "Paragraph 1: '...makes forward-looking decisions based strictly on expected marginal benefits and marginal costs. Past expenditures... should exert zero mathematical influence...'"
      }
    ]
  },
  {
    id: "p12-15-minute-city",
    title: "The 15-Minute City: Reimagining Urban Proximity",
    category: "Society",
    difficulty: "Intermediate",
    readTime: "4 min read",
    tagline: "Decentralizing Urban Geography for Quality of Life and Climate Resilience",
    paragraphs: [
      "For much of the twentieth century, urban development adhered to rigid functional zoning paradigms inspired by modern industrialization and automotive supremacy. Residential suburbs were segregated from commercial business districts and manufacturing sectors, mandating extensive, car-dependent daily commutes. This spatial fragmentation has inflicted severe ecological and psychological tolls, resulting in traffic congestion, vehicular air pollution, and sedentary lifestyles.",
      "The '15-Minute City' framework, championed by urban scholar Carlos Moreno, proposes a radical inversion of this model. The core premise posits that all essential urban functions—housing, employment, commerce, healthcare, education, and recreation—should be accessible within a 15-minute journey on foot or by bicycle from any resident's doorstep. Rather than forcing inhabitants to adapt to citywide travel corridors, urban infrastructure is decentralized into self-sufficient, polycentric neighborhoods.",
      "Beyond reducing greenhouse gas emissions and reclaiming asphalt corridors for pedestrian plazas and bike lanes, hyper-proximity fosters social cohesion and localized economic vitality. However, critics caution that poorly implemented proximity models risk exacerbating socio-spatial segregation: affluent districts can quickly coalesce into hyper-resourced enclaves, while historically marginalized neighborhoods may lack the initial capital to support diverse amenities. Ensuring equitable municipal investment is thus pivotal to fulfilling the concept's transformative promise."
    ],
    questions: [
      {
        id: "q12-1",
        type: "Author's Purpose",
        stem: "The author's primary purpose in writing this passage is to:",
        options: [
          "Advocate for the complete banning of all bicycles in major capital cities",
          "Explain the principles, advantages, and potential equity challenges of the 15-Minute City urban model",
          "Promote the construction of wider eight-lane express highways through residential areas",
          "Criticize Carlos Moreno for supporting automotive manufacturing plants"
        ],
        correct: 1,
        explanation: "The passage introduces the 15-minute city concept, outlines its benefits (decentralization, emissions, community), and addresses criticisms regarding equity.",
        evidence: "Paragraphs 1-3 synthesis."
      },
      {
        id: "q12-2",
        type: "Compare and Contrast",
        stem: "How does the 15-Minute City model contrast with twentieth-century urban planning?",
        options: [
          "It forces citizens to work solely in manufacturing factories.",
          "It decentralizes amenities into walkable polycentric zones rather than segregating residential areas from commercial centers.",
          "It requires all citizens to own at least two private automobiles.",
          "It eliminates all public parks and green spaces."
        ],
        correct: 1,
        explanation: "Twentieth century planning segregated functions requiring long commutes; the 15-minute city decentralizes essential services within walking/cycling distance.",
        evidence: "Paragraph 2: 'Rather than forcing inhabitants to adapt to citywide travel corridors, urban infrastructure is decentralized into self-sufficient, polycentric neighborhoods.'"
      },
      {
        id: "q12-3",
        type: "Vocabulary in Context",
        stem: "The word 'enclaves' in paragraph 3 most nearly means:",
        options: [
          "Distinct, enclosed territories or communities with specific characteristics",
          "Underground subway tunnels used for industrial freight",
          "Public agricultural fields owned by university researchers",
          "Natural lakes formed by glacial melting"
        ],
        correct: 0,
        explanation: "Enclaves refers to isolated, well-resourced communities segregated from surrounding areas.",
        evidence: "Paragraph 3: '...affluent districts can quickly coalesce into hyper-resourced enclaves...'"
      }
    ]
  },
  {
    id: "p13-biomimetic-materials",
    title: "Biomimetic Materials: Engineering Solutions from Evolution",
    category: "Innovation",
    difficulty: "Expert",
    readTime: "5 min read",
    tagline: "Translating Billions of Years of Natural Selection into Next-Generation Nanotechnology",
    paragraphs: [
      "Over 3.8 billion years of organic evolution, natural selection has served as the ultimate research and development laboratory. Biological organisms have evolved extraordinary mechanical, optical, and aerodynamic adaptations under severe thermodynamic and environmental constraints. Biomimetics—the interdisciplinary practice of translating biological principles into synthetic engineering—has emerged as a transformative frontier in materials science.",
      "Consider the superhydrophobic surface of the sacred lotus leaf (Nelumbo nucifera). While casual observation attributes its self-cleaning capability to chemical waxy coatings, electron microscopy revealed a sophisticated hierarchy of micro-scale epidermal papillae coated with nanoscale hydrophobic wax crystals. When water droplets impact the surface, air pockets trapped within the micro-roughness prevent the droplet from spreading, maintaining a contact angle exceeding 150 degrees. As the spherical droplets roll off under gravity, they effortlessly gather dirt particles, inspiring self-cleaning exterior architectural coatings and anti-icing aviation surfaces.",
      "Similarly, the dry adhesion of gecko feet relies on millions of microscopic keratinous hairs termed setae, which branch into billions of sub-micron spatulae. These nanoscale structures conform so intimately to rough surfaces that intermolecular van der Waals forces—ordinarily negligible at macroscopic scales—generate substantial cumulative adhesion without chemical glues. Synthetic dry adhesives modeled on gecko morphology now enable robotic grippers to manipulate fragile electronic wafers in vacuum environments where traditional suction cups fail.",
      "However, transitioning from natural prototypes to industrial fabrication presents formidable challenges. Biological systems synthesize complex hierarchical architectures from ambient temperatures and benign precursors via self-assembly. In contrast, replicating these nanostructures synthetically often demands energy-intensive lithography and specialized cleanroom environments. Overcoming these scalability bottlenecks remains the primary frontier of biomimetic engineering."
    ],
    questions: [
      {
        id: "q13-1",
        type: "Supporting Detail",
        stem: "According to paragraph 2, what physical mechanism enables the self-cleaning 'lotus effect'?",
        options: [
          "High thermal radiation generated inside the plant stem",
          "Micro-scale papillae and nanoscale wax crystals that trap air pockets, causing water droplets to roll and gather dirt",
          "Active carnivorous enzymes on the leaf surface that dissolve dust",
          "Continuous electric currents pulsating through the leaf veins"
        ],
        correct: 1,
        explanation: "Paragraph 2 explains micro-papillae and nanoscale wax crystals trap air pockets, maintaining >150° contact angle so rolling droplets collect dirt.",
        evidence: "Paragraph 2: '...hierarchy of micro-scale epidermal papillae coated with nanoscale hydrophobic wax crystals... air pockets trapped within the micro-roughness...'"
      },
      {
        id: "q13-2",
        type: "Passage Structure",
        stem: "Which of the following best describes the organization of the passage?",
        options: [
          "An introductory concept followed by specific biological case studies and an assessment of manufacturing challenges.",
          "A chronological history of botanists in the sixteenth century.",
          "An aggressive debate between two competing chemical engineering corporations.",
          "A step-by-step laboratory tutorial for synthesizing gecko setae."
        ],
        correct: 0,
        explanation: "The author introduces biomimetics (para 1), provides two detailed case studies (lotus effect in para 2, gecko adhesion in para 3), and discusses manufacturing bottlenecks (para 4).",
        evidence: "Paragraphs 1-4 structural flow."
      },
      {
        id: "q13-3",
        type: "Vocabulary in Context",
        stem: "The word 'benign' in paragraph 4 most nearly means:",
        options: [
          "Harmless, gentle, or non-toxic",
          "Extremely corrosive and explosive",
          "Unnecessarily expensive to purchase",
          "Artificial and synthetic"
        ],
        correct: 0,
        explanation: "Benign precursors refer to safe, non-toxic chemical starting materials used by living organisms.",
        evidence: "Paragraph 4: '...from ambient temperatures and benign precursors via self-assembly.'"
      },
      {
        id: "q13-4",
        type: "Inference",
        stem: "Based on paragraph 3, gecko-inspired adhesives are particularly advantageous in space or vacuum environments because they:",
        options: [
          "Rely on microscopic van der Waals forces rather than air pressure or chemical wet glues.",
          "Emit bright green light in total darkness to illuminate the workspace.",
          "Can only operate at extreme freezing temperatures below absolute zero.",
          "Absorb radioactive particles from solar flares."
        ],
        correct: 0,
        explanation: "Paragraph 3 notes gecko adhesion uses van der Waals intermolecular forces without liquid glues, making them ideal in vacuum where suction cups (which need air pressure) fail.",
        evidence: "Paragraph 3: '...intermolecular van der Waals forces... generate substantial cumulative adhesion without chemical glues... in vacuum environments where traditional suction cups fail.'"
      }
    ]
  },
  {
    id: "p14-digital-commons",
    title: "The Digital Commons and Artificial Scarcity",
    category: "Critical Thinking",
    difficulty: "Advanced",
    readTime: "4.5 min read",
    tagline: "Rethinking Property Rights and Intellectual Creation in the Post-Physical Era",
    paragraphs: [
      "In classical physical economics, goods are inherently 'rivalrous' and 'excludable': if an individual consumes an apple or occupies a parcel of arable land, another person is physically precluded from simultaneously enjoying that identical resource. Market pricing mechanisms historically arose to allocate these scarce physical commodities efficiently. The digital revolution, however, introduced an economic novelty: pure information goods characterized by near-zero marginal reproduction costs and non-rivalrous consumption.",
      "Once a software program, academic treatise, or musical composition is created, duplicating and distributing it to millions of global recipients incurs negligible incremental expenditure. In a frictionless digital landscape, information naturally tilts toward boundless abundance. To preserve traditional revenue models and incentivize creative investment, legal and technical architectures were engineered to construct 'artificial scarcity' through aggressive copyright regimes, proprietary licensing, and digital rights management (DRM) encryptions.",
      "This artificial constraint creates a profound societal tension. Proponents contend that robust intellectual property protections are indispensable to stimulate substantial research and development capital. Critics, conversely, argue that excessive intellectual fences stifle cumulative innovation, restrict educational access in developing nations, and enclose the shared knowledge commons. Reconciling creator compensation with open public dissemination represents one of the defining legal and philosophical dilemmas of our era."
    ],
    questions: [
      {
        id: "q14-1",
        type: "Main Idea",
        stem: "What is the central tension examined in the passage?",
        options: [
          "The difficulty of manufacturing physical computer hardware in developing countries",
          "The conflict between the natural non-rivalrous abundance of digital information and the legal enforcement of artificial scarcity for intellectual property",
          "The legal requirement to eliminate all musical compositions from the public domain",
          "The failure of agricultural markets to distribute apples fairly"
        ],
        correct: 1,
        explanation: "The passage explores the economic uniqueness of non-rivalrous digital goods versus artificial scarcity created by intellectual property laws.",
        evidence: "Paragraphs 1-3 core theme."
      },
      {
        id: "q14-2",
        type: "Reference",
        stem: "In paragraph 2, the word 'it' in the sentence 'duplicating and distributing it to millions of global recipients incurs negligible incremental expenditure' refers to:",
        options: [
          "An apple or agricultural parcel",
          "A software program, academic treatise, or musical composition",
          "The physical market pricing mechanism",
          "A proprietary hardware factory"
        ],
        correct: 1,
        explanation: "The preceding clause states 'Once a software program, academic treatise, or musical composition is created...', so 'it' refers to that digital information good.",
        evidence: "Paragraph 2: 'Once a software program, academic treatise, or musical composition is created, duplicating and distributing it...'"
      },
      {
        id: "q14-3",
        type: "Author's Tone",
        stem: "The author's tone throughout the passage is best described as:",
        options: [
          "Highly emotional and partisan toward piracy",
          "Balanced, analytical, and intellectually objective",
          "Indifferent and uneducated regarding economics",
          "Satirical and mocking of all creators"
        ],
        correct: 1,
        explanation: "The author methodically explains both sides of the issue (economic incentives for creators vs open access for society) in an analytical manner.",
        evidence: "Paragraph 3: 'Proponents contend... Critics, conversely, argue... Reconciling creator compensation with open public dissemination represents one of the defining dilemmas...'"
      }
    ]
  }
];

// ==========================================================================
// 2. 10 CORE READING SKILLS DATA
// ==========================================================================
const SKILLS_DATA = [
  {
    id: "main-idea",
    name: "Main Idea",
    icon: "fa-solid fa-bullseye",
    difficulty: "Beginner",
    diffClass: "diff-beginner",
    desc: "Identify the primary thesis or overarching message that unites all paragraphs of a text.",
    rule: "Formula: Topic + Author's Specific Point = Main Idea. Avoid narrow supporting details or overly broad generalizations.",
    questionType: "Main Idea"
  },
  {
    id: "supporting-details",
    name: "Supporting Details",
    icon: "fa-solid fa-layer-group",
    difficulty: "Beginner",
    diffClass: "diff-beginner",
    desc: "Pinpoint explicit facts, statistics, examples, and causal evidence used to substantiate the core claim.",
    rule: "Strategy: Match key terms directly to the passage. Do not rely on outside assumptions.",
    questionType: "Supporting Detail"
  },
  {
    id: "inference",
    name: "Inference",
    icon: "fa-solid fa-brain",
    difficulty: "Intermediate",
    diffClass: "diff-intermediate",
    desc: "Draw airtight logical conclusions implied by the passage evidence without relying on outside speculation.",
    rule: "Equation: Stated Clues + Logical Reasoning = Valid Inference. Reject extreme or unsupported claims.",
    questionType: "Inference"
  },
  {
    id: "vocab-context",
    name: "Vocabulary in Context",
    icon: "fa-solid fa-book-open-reader",
    difficulty: "Intermediate",
    diffClass: "diff-intermediate",
    desc: "Determine the precise situational meaning of a word based on surrounding tone, syntax, and cues.",
    rule: "Technique: Substitute your candidate definition back into the sentence to verify coherence.",
    questionType: "Vocabulary in Context"
  },
  {
    id: "authors-purpose",
    name: "Author's Purpose",
    icon: "fa-solid fa-crosshairs",
    difficulty: "Intermediate",
    diffClass: "diff-intermediate",
    desc: "Uncover why the writer crafted the passage: to Inform, Explain, Persuade, Compare, Criticize, or Analyze.",
    rule: "Check: Inspect action verbs and closing arguments to reveal authorial intent.",
    questionType: "Author's Purpose"
  },
  {
    id: "tone",
    name: "Author's Tone",
    icon: "fa-solid fa-masks-theater",
    difficulty: "Advanced",
    diffClass: "diff-advanced",
    desc: "Decipher the author's underlying attitude: Objective, Analytical, Concerned, Skeptical, or Enthusiastic.",
    rule: "Cue: Analyze adjective choices, punctuation, and qualitative qualifiers.",
    questionType: "Author's Tone"
  },
  {
    id: "fact-opinion",
    name: "Fact vs Opinion",
    icon: "fa-solid fa-scale-balanced",
    difficulty: "Beginner",
    diffClass: "diff-beginner",
    desc: "Distinguish between objectively verifiable empirical claims and subjective value judgments.",
    rule: "Test: Can this statement be mathematically or historically verified? If subjective, it is an opinion.",
    questionType: "Fact vs Opinion"
  },
  {
    id: "cause-effect",
    name: "Cause & Effect",
    icon: "fa-solid fa-arrow-right-arrow-left",
    difficulty: "Intermediate",
    diffClass: "diff-intermediate",
    desc: "Trace directional relationships: why an event occurred (cause) and its subsequent consequence (effect).",
    rule: "Watch for: because, resulted in, triggered, consequently, stemmed from, therefore.",
    questionType: "Cause and Effect"
  },
  {
    id: "compare-contrast",
    name: "Compare & Contrast",
    icon: "fa-solid fa-code-compare",
    difficulty: "Intermediate",
    diffClass: "diff-intermediate",
    desc: "Evaluate nuanced parallels (comparisons) and diverging distinctions (contrasts) between concepts.",
    rule: "Markers: whereas, unlike, conversely, similarly, in contrast, on the other hand.",
    questionType: "Compare and Contrast"
  },
  {
    id: "passage-structure",
    name: "Passage Structure",
    icon: "fa-solid fa-sitemap",
    difficulty: "Advanced",
    diffClass: "diff-advanced",
    desc: "Understand structural archetypes: Problem->Solution, Cause->Effect, General->Specific, Claim->Evidence.",
    rule: "Map: Outline paragraph transitions to identify organizational architecture.",
    questionType: "Passage Structure"
  }
];

// ==========================================================================
// 3. FLASHCARDS DATASET (3D Flip Cards)
// ==========================================================================
const FLASHCARDS = [
  {
    category: "Main Idea",
    term: "MAIN IDEA",
    hint: "Click to flip and inspect formula",
    definition: "The central thesis or primary message that unites all paragraphs into a coherent argument.",
    tip: "Tip: Topic + Author's Stance = Main Idea. Eliminate choices that are only true for one paragraph."
  },
  {
    category: "Inference",
    term: "INFERENCE",
    hint: "Click to flip and inspect formula",
    definition: "Drawing a strict logical conclusion directly from evidence provided in the text without outside bias.",
    tip: "Tip: Inference = Evidence + Logic. If a choice requires assumptions not in the text, eliminate it."
  },
  {
    category: "Tone",
    term: "AUTHOR'S TONE",
    hint: "Click to flip and inspect formula",
    definition: "The author's emotional attitude toward the subject matter (e.g., Objective, Analytical, Concerned).",
    tip: "Tip: Examine adjective valence and modal verbs (must, may, alarmingly, ostensibly)."
  },
  {
    category: "Purpose",
    term: "AUTHOR'S PURPOSE",
    hint: "Click to flip and inspect formula",
    definition: "The underlying motivation for writing the piece: Inform, Explain, Persuade, Compare, Criticize, or Analyze.",
    tip: "Tip: Look at the conclusion to see whether the writer urges action or simply informs."
  },
  {
    category: "Context",
    term: "CONTEXTUAL MEANING",
    hint: "Click to flip and inspect formula",
    definition: "The exact situational definition of a polysemous word determined by surrounding sentence clues.",
    tip: "Tip: Never pick a dictionary meaning that makes no sense in the specific paragraph context."
  },
  {
    category: "Detail",
    term: "SUPPORTING DETAIL",
    hint: "Click to flip and inspect formula",
    definition: "A specific fact, statistic, observation, or reason provided to justify the main argument.",
    tip: "Tip: In 'According to the passage' questions, answer ONLY using the text verbatim."
  },
  {
    category: "Transitions",
    term: "TRANSITION MARKERS",
    hint: "Click to flip and inspect formula",
    definition: "Signpost words that indicate logical progression (Addition, Contrast, Cause, Result, Conclusion).",
    tip: "Tip: 'However' and 'Nevertheless' signal pivots where the author's true stance often appears."
  },
  {
    category: "Structure",
    term: "PASSAGE STRUCTURE",
    hint: "Click to flip and inspect formula",
    definition: "The architectural framework organizing ideas (Problem->Solution, Claim->Evidence, Chronological).",
    tip: "Tip: Track how each paragraph transitions from the previous to identify the macro structure."
  },
  {
    category: "Conclusion",
    term: "LOGICAL CONCLUSION",
    hint: "Click to flip and inspect formula",
    definition: "The deduction that must be true if all preceding premise statements in the passage are true.",
    tip: "Tip: Beware of extreme leap answers containing 'always', 'never', or 'completely'."
  }
];

// ==========================================================================
// 4. TRANSITIONS MATRIX DATASET
// ==========================================================================
const TRANSITIONS_DATA = {
  all: [
    { token: "However", role: "Contrast", example: "The hypothesis seemed viable; however, subsequent tests refuted it." },
    { token: "Furthermore", role: "Addition", example: "Furthermore, the data confirmed elevated metabolic activity." },
    { token: "Consequently", role: "Result", example: "The river flooded; consequently, crops were inundated." },
    { token: "Because", role: "Cause", example: "The reaction accelerated because ambient temperature rose." },
    { token: "For instance", role: "Example", example: "Migratory birds, for instance, utilize cryptochrome proteins." },
    { token: "In conclusion", role: "Conclusion", example: "In conclusion, both theories offer complementary insights." },
    { token: "Nevertheless", role: "Contrast", example: "The journey was arduous; nevertheless, the expedition proceeded." },
    { token: "Moreover", role: "Addition", example: "Moreover, the policy reduced municipal waste by 30%." },
    { token: "Therefore", role: "Result", example: "Resources were finite; therefore, rationing was instituted." },
    { token: "Due to", role: "Cause", example: "Due to atmospheric friction, the meteor disintegrated." },
    { token: "Such as", role: "Example", example: "Heavy metals, such as lead and mercury, pose severe risks." },
    { token: "Overall", role: "Conclusion", example: "Overall, the findings substantiate the evolutionary model." }
  ],
  addition: [
    { token: "Furthermore", role: "Addition", example: "Furthermore, the data confirmed elevated metabolic activity." },
    { token: "Moreover", role: "Addition", example: "Moreover, the policy reduced municipal waste by 30%." },
    { token: "Additionally", role: "Addition", example: "Additionally, tree cover mitigates ambient sound pollution." },
    { token: "Besides", role: "Addition", example: "Besides financial gains, the program heightened civic trust." }
  ],
  contrast: [
    { token: "However", role: "Contrast", example: "The hypothesis seemed viable; however, subsequent tests refuted it." },
    { token: "Nevertheless", role: "Contrast", example: "The journey was arduous; nevertheless, the expedition proceeded." },
    { token: "Although", role: "Contrast", example: "Although results were promising, clinical trials remained small." },
    { token: "Whereas", role: "Contrast", example: "Maximizers seek perfection, whereas satisficers choose 'good enough'." },
    { token: "In contrast", role: "Contrast", example: "In contrast to classical models, quantum states exhibit superposition." }
  ],
  cause: [
    { token: "Because", role: "Cause", example: "The reaction accelerated because ambient temperature rose." },
    { token: "Since", role: "Cause", example: "Since sunlight was scarce, understory saplings relied on fungi." },
    { token: "Due to", role: "Cause", example: "Due to atmospheric friction, the meteor disintegrated." },
    { token: "Stemming from", role: "Cause", example: "Disorientation stemming from electromagnetic noise was documented." }
  ],
  result: [
    { token: "Consequently", role: "Result", example: "The river flooded; consequently, crops were inundated." },
    { token: "Therefore", role: "Result", example: "Resources were finite; therefore, rationing was instituted." },
    { token: "Thus", role: "Result", example: "Thus, the algorithm converged on an optimal state." },
    { token: "Hence", role: "Result", example: "Hence, conservationists urged swift policy interventions." }
  ],
  example: [
    { token: "For instance", role: "Example", example: "Migratory birds, for instance, utilize cryptochrome proteins." },
    { token: "For example", role: "Example", example: "For example, lotus leaves exhibit superhydrophobic behavior." },
    { token: "Such as", role: "Example", example: "Heavy metals, such as lead and mercury, pose severe risks." }
  ],
  conclusion: [
    { token: "In conclusion", role: "Conclusion", example: "In conclusion, both theories offer complementary insights." },
    { token: "Overall", role: "Conclusion", example: "Overall, the findings substantiate the evolutionary model." },
    { token: "Finally", role: "Conclusion", example: "Finally, the experiment validated the mathematical theorem." }
  ]
};

// ==========================================================================
// 5. LOCALSTORAGE STATE MANAGEMENT
// ==========================================================================
const STORAGE_KEYS = {
  STATS: "rc_app_stats_v1",
  BOOKMARKS: "rc_app_bookmarks_v1",
  MISTAKES: "rc_app_mistakes_v1"
};

function getStoredStats() {
  const defaultStats = {
    passagesCompleted: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    accuracy: 0,
    currentStreak: 1,
    lastActiveDate: new Date().toDateString(),
    completedPassageIds: []
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    
    // Check streak
    const today = new Date().toDateString();
    const lastDate = parsed.lastActiveDate;
    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastDate === yesterday) {
        parsed.currentStreak += 1;
      } else {
        parsed.currentStreak = 1;
      }
      parsed.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return defaultStats;
  }
}

function saveStats(stats) {
  try {
    if (stats.questionsAnswered > 0) {
      stats.accuracy = Math.round((stats.correctAnswers / stats.questionsAnswered) * 100);
    } else {
      stats.accuracy = 0;
    }
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    updateStatsUI();
  } catch (e) {
    console.error("Failed to save stats", e);
  }
}

function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) || [];
  } catch (e) {
    return [];
  }
}

function toggleBookmark(passageId) {
  let bookmarks = getBookmarks();
  if (bookmarks.includes(passageId)) {
    bookmarks = bookmarks.filter(id => id !== passageId);
    showToast("Passage removed from Saved list.");
  } else {
    bookmarks.push(passageId);
    showToast("Passage bookmarked successfully!");
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  renderPassages();
  renderSavedList();
}

function getMistakes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MISTAKES)) || [];
  } catch (e) {
    return [];
  }
}

function saveMistake(mistakeObj) {
  let mistakes = getMistakes();
  // avoid duplicates of same question
  mistakes = mistakes.filter(m => m.questionId !== mistakeObj.questionId);
  mistakes.unshift(mistakeObj);
  localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
}

function removeMistake(questionId) {
  let mistakes = getMistakes();
  mistakes = mistakes.filter(m => m.questionId !== questionId);
  localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  renderMistakesList();
  showToast("Mistake marked reviewed and removed.");
}

// ==========================================================================
// 6. APPLICATION RUNTIME CONTROLLER
// ==========================================================================
let currentFilterCategory = "All";
let currentFilterDifficulty = "All";
let currentSearchTerm = "";
let currentSortMode = "A-Z";

// Active Workspace Session State
let activePassage = null;
let activeQuestions = [];
let currentQuestionIndex = 0;
let sessionCorrectCount = 0;
let sessionAnswers = [];
let sessionStartTime = 0;
let readingTimerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;

// Flashcard state
let currentFlashcardIndex = 0;
let knownCards = new Set();

// ==========================================================================
// 7. INITIALIZATION & DOM MOUNTING
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initDailySpotlight();
  initSkillsGrid();
  renderPassages();
  initFlashcard();
  initTransitionMatrix();
  initStrategiesAccordion();
  updateStatsUI();
  setupEventListeners();
});

// Daily Reading Spotlight
function initDailySpotlight() {
  const todayStr = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash << 5) - hash + todayStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % PASSAGES.length;
  const dailyPassage = PASSAGES[index];

  const container = document.getElementById("dailySpotlightContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="daily-spotlight-card">
      <div class="daily-spotlight-info">
        <div class="daily-badge-row">
          <span class="daily-pill"><i class="fa-solid fa-calendar-day"></i> Daily Reading Spotlight</span>
          <span class="category-badge cat-${dailyPassage.category.toLowerCase().replace(/\s+/g, '-')}">${dailyPassage.category}</span>
          <span class="skill-difficulty diff-${dailyPassage.difficulty.toLowerCase()}">${dailyPassage.difficulty}</span>
        </div>
        <h3 class="daily-title">${dailyPassage.title}</h3>
        <p class="daily-excerpt">${dailyPassage.paragraphs[0].substring(0, 240)}...</p>
        <div class="daily-meta">
          <span><i class="fa-regular fa-clock"></i> ${dailyPassage.readTime}</span>
          <span><i class="fa-solid fa-circle-question"></i> ${dailyPassage.questions.length} Questions</span>
          <span><i class="fa-solid fa-bullseye"></i> High-Yield Practice</span>
        </div>
      </div>
      <div class="daily-actions">
        <button class="btn-daily-start" onclick="openWorkspace('${dailyPassage.id}', 'split')">
          <i class="fa-solid fa-book-open"></i> Start Daily Reading
        </button>
        <div class="daily-quote-box">
          "Evidence beats assumption. Read for meaning, not just for words."
        </div>
      </div>
    </div>
  `;
}

// 10 Skills Grid
function initSkillsGrid() {
  const container = document.getElementById("skillsGridContainer");
  if (!container) return;

  container.innerHTML = SKILLS_DATA.map(skill => `
    <div class="skill-card">
      <div class="skill-card-top">
        <div class="skill-icon-wrap">
          <i class="${skill.icon}"></i>
        </div>
        <span class="skill-difficulty ${skill.diffClass}">${skill.difficulty}</span>
      </div>
      <h3 class="skill-name">${skill.name}</h3>
      <p class="skill-desc">${skill.desc}</p>
      <div class="skill-rule-box">${skill.rule}</div>
      <button class="btn-practice-skill" onclick="startSkillPractice('${skill.questionType}')">
        <i class="fa-solid fa-play"></i> Practice ${skill.name}
      </button>
    </div>
  `).join("");
}

// Render Passages Library with Filters, Search, and Sort
function renderPassages() {
  const container = document.getElementById("passagesGridContainer");
  const countEl = document.getElementById("resultsCountDisplay");
  if (!container) return;

  const bookmarks = getBookmarks();

  let filtered = PASSAGES.filter(p => {
    // Difficulty
    if (currentFilterDifficulty !== "All" && p.difficulty !== currentFilterDifficulty) return false;
    // Category
    if (currentFilterCategory !== "All" && p.category !== currentFilterCategory) return false;
    // Search
    if (currentSearchTerm.trim() !== "") {
      const term = currentSearchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(term);
      const matchCategory = p.category.toLowerCase().includes(term);
      const matchText = p.paragraphs.some(par => par.toLowerCase().includes(term));
      const matchDiff = p.difficulty.toLowerCase().includes(term);
      if (!matchTitle && !matchCategory && !matchText && !matchDiff) return false;
    }
    return true;
  });

  // Sort
  if (currentSortMode === "A-Z") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSortMode === "Shortest") {
    filtered.sort((a, b) => a.readTime.localeCompare(b.readTime));
  } else if (currentSortMode === "Longest") {
    filtered.sort((a, b) => b.readTime.localeCompare(a.readTime));
  } else if (currentSortMode === "Easiest") {
    const diffMap = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
    filtered.sort((a, b) => diffMap[a.difficulty] - diffMap[b.difficulty]);
  } else if (currentSortMode === "Hardest") {
    const diffMap = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
    filtered.sort((a, b) => diffMap[b.difficulty] - diffMap[a.difficulty]);
  } else if (currentSortMode === "Random") {
    filtered.sort(() => Math.random() - 0.5);
  }

  if (countEl) {
    countEl.innerText = `Showing ${filtered.length} of ${PASSAGES.length} Passages`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h3>No matching passages found</h3>
        <p>Try adjusting your search terms or clearing your category/difficulty filters.</p>
        <button class="btn-card-read" onclick="clearFilters()" style="margin: 0 auto;">
          <i class="fa-solid fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isBookmarked = bookmarks.includes(p.id);
    const catClass = `cat-${p.category.toLowerCase().replace(/\s+/g, '-')}`;
    const diffClass = `diff-${p.difficulty.toLowerCase()}`;

    return `
      <div class="passage-card">
        <div class="passage-card-top">
          <span class="category-badge ${catClass}">${p.category}</span>
          <button class="btn-bookmark-card ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${p.id}')" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Passage'}">
            <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
          </button>
        </div>
        <h3 class="passage-card-title">${p.title}</h3>
        <p class="passage-card-preview">${p.paragraphs[0]}</p>
        <div class="passage-card-meta">
          <span class="skill-difficulty ${diffClass}">${p.difficulty}</span>
          <span><i class="fa-regular fa-clock"></i> ${p.readTime}</span>
          <span><i class="fa-solid fa-circle-question"></i> ${p.questions.length} Questions</span>
        </div>
        <div class="passage-card-actions">
          <button class="btn-card-read" onclick="openWorkspace('${p.id}', 'reading')">
            <i class="fa-solid fa-book-open"></i> Read
          </button>
          <button class="btn-card-quiz" onclick="openWorkspace('${p.id}', 'split')">
            <i class="fa-solid fa-circle-play"></i> Start Questions
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Clear Search & Filters
function clearFilters() {
  currentFilterCategory = "All";
  currentFilterDifficulty = "All";
  currentSearchTerm = "";
  currentSortMode = "A-Z";

  const searchInput = document.getElementById("passageSearchInput");
  if (searchInput) searchInput.value = "";
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.style.display = "none";
  const catSelect = document.getElementById("categoryFilterSelect");
  if (catSelect) catSelect.value = "All";
  const sortSelect = document.getElementById("sortPassagesSelect");
  if (sortSelect) sortSelect.value = "A-Z";

  document.querySelectorAll(".filter-tab").forEach(tab => {
    if (tab.dataset.diff === "All") tab.classList.add("active");
    else tab.classList.remove("active");
  });

  renderPassages();
}

// Update Stats UI from localStorage
function updateStatsUI() {
  const stats = getStoredStats();
  const passagesCount = document.getElementById("statPassagesCompleted");
  const questionsCount = document.getElementById("statQuestionsAnswered");
  const accuracyVal = document.getElementById("statAccuracy");
  const streakVal = document.getElementById("statStreak");

  if (passagesCount) passagesCount.innerText = stats.passagesCompleted;
  if (questionsCount) questionsCount.innerText = stats.questionsAnswered;
  if (accuracyVal) accuracyVal.innerText = `${stats.accuracy}%`;
  if (streakVal) streakVal.innerText = `${stats.currentStreak} Days`;
}

// ==========================================================================
// 8. FOCUSED READING & QUESTION WORKSPACE ENGINE
// ==========================================================================
function openWorkspace(passageId, initialMode = "split") {
  const p = PASSAGES.find(item => item.id === passageId);
  if (!p) return;

  activePassage = p;
  activeQuestions = [...p.questions];
  currentQuestionIndex = 0;
  sessionCorrectCount = 0;
  sessionAnswers = [];
  sessionStartTime = Date.now();

  const modal = document.getElementById("workspaceModal");
  if (!modal) return;

  // Header Details
  document.getElementById("wsTitle").innerText = p.title;
  document.getElementById("wsCategoryBadge").innerText = p.category;
  document.getElementById("wsDifficultyBadge").innerText = p.difficulty;
  document.getElementById("wsReadTimeBadge").innerText = p.readTime;

  // Render Passage Text
  const passagePaneContent = document.getElementById("wsPassageContent");
  passagePaneContent.innerHTML = `
    <h2 class="passage-article-title">${p.title}</h2>
    <span class="passage-article-tagline">${p.tagline || p.category}</span>
    ${p.paragraphs.map((par, i) => `
      <p class="passage-paragraph">
        <span class="paragraph-marker">[P${i + 1}]</span>
        ${highlightPassageTransitions(par)}
      </p>
    `).join("")}
  `;

  // Set Workspace Layout Mode
  setWorkspaceMode(initialMode);

  // Render First Question
  renderWorkspaceQuestion();

  // Reset Timer
  resetReadingTimer();
  startReadingTimer();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function highlightPassageTransitions(text) {
  // Highlight important structural transition signals softly
  const markers = [
    "However", "Furthermore", "Consequently", "Moreover", "Nevertheless",
    "Therefore", "In contrast", "Conversely", "Thus", "Hence", "Crucially"
  ];
  let res = text;
  markers.forEach(m => {
    const regex = new RegExp(`\\b(${m})\\b`, "g");
    res = res.replace(regex, `<span class="highlight-transition">$1</span>`);
  });
  return res;
}

function setWorkspaceMode(mode) {
  const body = document.getElementById("wsBody");
  const btnSplit = document.getElementById("btnModeSplit");
  const btnReading = document.getElementById("btnModeReading");
  const btnQuiz = document.getElementById("btnModeQuiz");

  if (!body) return;

  body.className = "workspace-body";
  btnSplit.classList.remove("active");
  btnReading.classList.remove("active");
  btnQuiz.classList.remove("active");

  if (mode === "split") {
    body.classList.add("split-view");
    btnSplit.classList.add("active");
  } else if (mode === "reading") {
    body.classList.add("reading-only");
    btnReading.classList.add("active");
  } else if (mode === "quiz") {
    body.classList.add("quiz-only");
    btnQuiz.classList.add("active");
  }
}

function closeWorkspace() {
  const modal = document.getElementById("workspaceModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  stopReadingTimer();
}

function renderWorkspaceQuestion() {
  if (!activeQuestions || activeQuestions.length === 0) return;

  const q = activeQuestions[currentQuestionIndex];
  const total = activeQuestions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / total) * 100);

  document.getElementById("qProgressText").innerText = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById("qProgressPercent").innerText = `${progressPercent}%`;
  document.getElementById("qProgressFill").style.width = `${progressPercent}%`;

  const qTypeBadge = document.getElementById("qTypeBadge");
  qTypeBadge.innerText = q.type;

  const stem = document.getElementById("qStemText");
  stem.innerText = q.stem;

  const optionsContainer = document.getElementById("qOptionsContainer");
  const letters = ["A", "B", "C", "D"];

  optionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="q-option-btn" onclick="selectWorkspaceOption(${idx})" id="optBtn-${idx}">
      <span class="q-option-key">${letters[idx]}</span>
      <span class="q-option-text">${opt}</span>
    </button>
  `).join("");

  const feedbackBox = document.getElementById("qFeedbackBox");
  feedbackBox.className = "q-feedback-box";
  feedbackBox.innerHTML = "";

  const nextBtn = document.getElementById("btnQNext");
  nextBtn.style.display = "none";
  nextBtn.innerText = currentQuestionIndex === total - 1 ? "Finish & View Score" : "Next Question";
}

function selectWorkspaceOption(selectedIndex) {
  const q = activeQuestions[currentQuestionIndex];
  const optionsButtons = document.querySelectorAll(".q-option-btn");
  optionsButtons.forEach(btn => btn.disabled = true);

  const isCorrect = selectedIndex === q.correct;
  sessionAnswers.push({ questionId: q.id, selected: selectedIndex, correct: q.correct, isCorrect });

  if (isCorrect) {
    sessionCorrectCount++;
    document.getElementById(`optBtn-${selectedIndex}`).classList.add("correct");
  } else {
    document.getElementById(`optBtn-${selectedIndex}`).classList.add("wrong");
    document.getElementById(`optBtn-${q.correct}`).classList.add("correct");

    // Save to mistake notebook
    saveMistake({
      questionId: q.id,
      passageTitle: activePassage ? activePassage.title : "Custom Practice",
      stem: q.stem,
      selectedAnswer: q.options[selectedIndex],
      correctAnswer: q.options[q.correct],
      explanation: q.explanation,
      evidence: q.evidence || "",
      date: new Date().toLocaleDateString()
    });
  }

  // Show pedagogical explanation
  const feedbackBox = document.getElementById("qFeedbackBox");
  feedbackBox.innerHTML = `
    <div class="feedback-title ${isCorrect ? 'feedback-correct-title' : 'feedback-wrong-title'}">
      <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
      ${isCorrect ? 'Correct! Excellent Analysis.' : 'Incorrect Choice.'}
    </div>
    <p>${q.explanation}</p>
    ${q.evidence ? `<div class="feedback-evidence-tag"><i class="fa-solid fa-quote-left"></i> Evidence: ${q.evidence}</div>` : ''}
  `;
  feedbackBox.classList.add("show");

  // Show Next Button
  const nextBtn = document.getElementById("btnQNext");
  nextBtn.style.display = "inline-flex";
}

function handleNextWorkspaceQuestion() {
  if (currentQuestionIndex < activeQuestions.length - 1) {
    currentQuestionIndex++;
    renderWorkspaceQuestion();
  } else {
    // Session completed
    finishWorkspaceSession();
  }
}

function finishWorkspaceSession() {
  stopReadingTimer();

  // Update Global Stats
  const stats = getStoredStats();
  stats.questionsAnswered += activeQuestions.length;
  stats.correctAnswers += sessionCorrectCount;
  if (activePassage && !stats.completedPassageIds.includes(activePassage.id)) {
    stats.completedPassageIds.push(activePassage.id);
    stats.passagesCompleted = stats.completedPassageIds.length;
  }
  saveStats(stats);

  // Close workspace and open scorecard
  closeWorkspace();
  showScorecardModal();
}

function showScorecardModal() {
  const modal = document.getElementById("scoreModal");
  if (!modal) return;

  const total = activeQuestions.length;
  const accuracy = Math.round((sessionCorrectCount / total) * 100);
  const timeUsed = document.getElementById("wsTimerDisplay").innerText;

  document.getElementById("scoreModalAccuracy").innerText = `${accuracy}%`;
  document.getElementById("scoreModalCorrect").innerText = `${sessionCorrectCount} / ${total}`;
  document.getElementById("scoreModalTime").innerText = timeUsed;

  const strongAreaEl = document.getElementById("scoreModalStrong");
  const reviewAreaEl = document.getElementById("scoreModalReview");

  // Analyze skills performance
  const skillPerformance = {};
  activeQuestions.forEach((q, i) => {
    const isCorrect = sessionAnswers[i] && sessionAnswers[i].isCorrect;
    if (!skillPerformance[q.type]) skillPerformance[q.type] = { correct: 0, total: 0 };
    skillPerformance[q.type].total++;
    if (isCorrect) skillPerformance[q.type].correct++;
  });

  const strong = [];
  const weak = [];
  Object.keys(skillPerformance).forEach(type => {
    const rate = skillPerformance[type].correct / skillPerformance[type].total;
    if (rate >= 0.7) strong.push(type);
    else weak.push(type);
  });

  strongAreaEl.innerHTML = strong.length > 0 
    ? strong.map(s => `<span class="skill-tag-pill skill-tag-strong"><i class="fa-solid fa-check"></i> ${s}</span>`).join("")
    : `<span class="skill-tag-pill skill-tag-strong">Keep practicing!</span>`;

  reviewAreaEl.innerHTML = weak.length > 0
    ? weak.map(w => `<span class="skill-tag-pill skill-tag-weak"><i class="fa-solid fa-rotate-left"></i> ${w}</span>`).join("")
    : `<span class="skill-tag-pill skill-tag-strong">No major weaknesses identified!</span>`;

  modal.classList.add("active");
}

function closeScoreModal() {
  const modal = document.getElementById("scoreModal");
  if (modal) modal.classList.remove("active");
}

// Reading Timer Functions
function startReadingTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  const timerDisplay = document.getElementById("wsTimerDisplay");
  const toggleBtn = document.getElementById("btnTimerToggle");
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

  readingTimerInterval = setInterval(() => {
    timerSeconds++;
    const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const secs = (timerSeconds % 60).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.innerText = `${mins}:${secs}`;
  }, 1000);
}

function stopReadingTimer() {
  isTimerRunning = false;
  clearInterval(readingTimerInterval);
  const toggleBtn = document.getElementById("btnTimerToggle");
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function toggleReadingTimer() {
  if (isTimerRunning) {
    stopReadingTimer();
  } else {
    startReadingTimer();
  }
}

function resetReadingTimer() {
  stopReadingTimer();
  timerSeconds = 0;
  const timerDisplay = document.getElementById("wsTimerDisplay");
  if (timerDisplay) timerDisplay.innerText = "00:00";
}

// Targeted Skill Practice Launcher
function startSkillPractice(questionType) {
  // Gather all questions across all passages matching this type
  let matching = [];
  PASSAGES.forEach(p => {
    p.questions.forEach(q => {
      if (q.type.toLowerCase().includes(questionType.toLowerCase()) || questionType.toLowerCase().includes(q.type.toLowerCase())) {
        matching.push({ question: q, passage: p });
      }
    });
  });

  if (matching.length === 0) {
    showToast(`Generating targeted practice for ${questionType}...`);
    openWorkspace(PASSAGES[0].id, "split");
    return;
  }

  // Randomize & launch custom session
  matching.sort(() => Math.random() - 0.5);
  activePassage = matching[0].passage;
  activeQuestions = matching.map(m => m.question).slice(0, 6);
  currentQuestionIndex = 0;
  sessionCorrectCount = 0;
  sessionAnswers = [];
  sessionStartTime = Date.now();

  const modal = document.getElementById("workspaceModal");
  if (!modal) return;

  document.getElementById("wsTitle").innerText = `${questionType} Focused Practice`;
  document.getElementById("wsCategoryBadge").innerText = "Skill Drill";
  document.getElementById("wsDifficultyBadge").innerText = "Targeted";
  document.getElementById("wsReadTimeBadge").innerText = `${activeQuestions.length} Questions`;

  // Render first matching passage
  const passagePaneContent = document.getElementById("wsPassageContent");
  passagePaneContent.innerHTML = `
    <h2 class="passage-article-title">${activePassage.title}</h2>
    <span class="passage-article-tagline">Skill Focus: ${questionType}</span>
    ${activePassage.paragraphs.map((par, i) => `
      <p class="passage-paragraph">
        <span class="paragraph-marker">[P${i + 1}]</span>
        ${highlightPassageTransitions(par)}
      </p>
    `).join("")}
  `;

  setWorkspaceMode("split");
  renderWorkspaceQuestion();
  resetReadingTimer();
  startReadingTimer();
  modal.classList.add("active");
}

// ==========================================================================
// 9. CUSTOM PRACTICE CONFIGURATOR
// ==========================================================================
function generateCustomPractice() {
  const diff = document.getElementById("cfgDifficulty").value;
  const cat = document.getElementById("cfgCategory").value;
  const count = parseInt(document.getElementById("cfgCount").value, 10) || 5;

  let pool = [];
  PASSAGES.forEach(p => {
    if (diff !== "All" && p.difficulty !== diff) return;
    if (cat !== "All" && p.category !== cat) return;
    p.questions.forEach(q => pool.push({ question: q, passage: p }));
  });

  if (pool.length === 0) {
    showToast("No questions match that combination. Widening filters...");
    PASSAGES.forEach(p => p.questions.forEach(q => pool.push({ question: q, passage: p })));
  }

  pool.sort(() => Math.random() - 0.5);
  const selected = pool.slice(0, count);

  activePassage = selected[0].passage;
  activeQuestions = selected.map(item => item.question);
  currentQuestionIndex = 0;
  sessionCorrectCount = 0;
  sessionAnswers = [];

  const modal = document.getElementById("workspaceModal");
  if (!modal) return;

  document.getElementById("wsTitle").innerText = `Custom Practice Session (${count} Questions)`;
  document.getElementById("wsCategoryBadge").innerText = cat === "All" ? "Mixed" : cat;
  document.getElementById("wsDifficultyBadge").innerText = diff === "All" ? "Adaptive" : diff;
  document.getElementById("wsReadTimeBadge").innerText = `${count} Qs`;

  document.getElementById("wsPassageContent").innerHTML = `
    <h2 class="passage-article-title">${activePassage.title}</h2>
    <span class="passage-article-tagline">Custom Adaptive Practice</span>
    ${activePassage.paragraphs.map((par, i) => `
      <p class="passage-paragraph"><span class="paragraph-marker">[P${i + 1}]</span> ${highlightPassageTransitions(par)}</p>
    `).join("")}
  `;

  setWorkspaceMode("split");
  renderWorkspaceQuestion();
  resetReadingTimer();
  startReadingTimer();
  modal.classList.add("active");
}

// ==========================================================================
// 10. FLASHCARDS SYSTEM
// ==========================================================================
function initFlashcard() {
  renderFlashcard();
}

function renderFlashcard() {
  const card = FLASHCARDS[currentFlashcardIndex];
  if (!card) return;

  const cardInner = document.getElementById("flashcardInner");
  if (cardInner) cardInner.classList.remove("flipped");

  document.getElementById("fcCategory").innerText = card.category;
  document.getElementById("fcTerm").innerText = card.term;
  document.getElementById("fcHint").innerHTML = `<i class="fa-solid fa-rotate"></i> ${card.hint}`;

  document.getElementById("fcBackCategory").innerText = card.category;
  document.getElementById("fcDefinition").innerText = card.definition;
  document.getElementById("fcTip").innerText = card.tip;

  document.getElementById("fcCardCounter").innerText = `Card ${currentFlashcardIndex + 1} of ${FLASHCARDS.length}`;
  document.getElementById("fcKnownCount").innerText = `${knownCards.size} Mastered`;
}

function flipFlashcard() {
  const cardInner = document.getElementById("flashcardInner");
  if (cardInner) cardInner.classList.toggle("flipped");
}

function nextFlashcard() {
  currentFlashcardIndex = (currentFlashcardIndex + 1) % FLASHCARDS.length;
  renderFlashcard();
}

function prevFlashcard() {
  currentFlashcardIndex = (currentFlashcardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  renderFlashcard();
}

function shuffleFlashcards() {
  FLASHCARDS.sort(() => Math.random() - 0.5);
  currentFlashcardIndex = 0;
  renderFlashcard();
  showToast("Flashcards shuffled!");
}

function markCardKnown() {
  knownCards.add(currentFlashcardIndex);
  showToast("Marked as Mastered! Moving to next card.");
  nextFlashcard();
}

function markCardReview() {
  knownCards.delete(currentFlashcardIndex);
  showToast("Added to Review list.");
  nextFlashcard();
}

// ==========================================================================
// 11. TRANSITIONS MATRIX & STRATEGIES
// ==========================================================================
function initTransitionMatrix() {
  filterTransitionMatrix("all");
}

function filterTransitionMatrix(category) {
  const container = document.getElementById("matrixWordsContainer");
  if (!container) return;

  document.querySelectorAll(".matrix-tab-btn").forEach(btn => {
    if (btn.dataset.cat === category) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  const list = TRANSITIONS_DATA[category] || TRANSITIONS_DATA.all;
  container.innerHTML = list.map(item => `
    <div class="word-pill-card">
      <div class="word-header">
        <span class="word-token">${item.token}</span>
        <span class="word-role">${item.role}</span>
      </div>
      <p class="word-example">"${item.example}"</p>
    </div>
  `).join("");
}

function initStrategiesAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

// ==========================================================================
// 12. SAVED PASSAGES & MISTAKES NOTEBOOK
// ==========================================================================
function openSavedModal() {
  renderSavedList();
  const modal = document.getElementById("savedDrawerModal");
  if (modal) modal.classList.add("active");
}

function closeSavedModal() {
  const modal = document.getElementById("savedDrawerModal");
  if (modal) modal.classList.remove("active");
}

function renderSavedList() {
  const container = document.getElementById("savedListContainer");
  if (!container) return;

  const bookmarks = getBookmarks();
  if (bookmarks.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 2rem;">
        <i class="fa-regular fa-bookmark" style="font-size: 2rem; color: var(--slate-400); margin-bottom: 0.5rem;"></i>
        <p>No saved passages yet. Click the bookmark icon on any passage card to save it here for quick access.</p>
      </div>
    `;
    return;
  }

  const savedPassages = PASSAGES.filter(p => bookmarks.includes(p.id));
  container.innerHTML = savedPassages.map(p => `
    <div class="saved-item-row">
      <div class="saved-item-info">
        <h4>${p.title}</h4>
        <p><span class="category-badge cat-${p.category.toLowerCase().replace(/\s+/g, '-')}">${p.category}</span> • ${p.difficulty} • ${p.readTime}</p>
      </div>
      <div class="saved-actions">
        <button class="btn-card-read" onclick="closeSavedModal(); openWorkspace('${p.id}', 'split');">
          <i class="fa-solid fa-book-open"></i> Read
        </button>
        <button class="btn-bookmark-card bookmarked" onclick="toggleBookmark('${p.id}')" title="Remove">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function openMistakesModal() {
  renderMistakesList();
  const modal = document.getElementById("mistakesDrawerModal");
  if (modal) modal.classList.add("active");
}

function closeMistakesModal() {
  const modal = document.getElementById("mistakesDrawerModal");
  if (modal) modal.classList.remove("active");
}

function renderMistakesList() {
  const container = document.getElementById("mistakesListContainer");
  if (!container) return;

  const mistakes = getMistakes();
  if (mistakes.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 2rem;">
        <i class="fa-solid fa-circle-check" style="font-size: 2rem; color: var(--emerald-500); margin-bottom: 0.5rem;"></i>
        <p>Your mistake notebook is clean! Any question you answer incorrectly will automatically appear here for targeted review.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = mistakes.map(m => `
    <div class="mistake-item-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--indigo-600); text-transform: uppercase;">${m.passageTitle}</span>
          <h4 style="font-size: 1rem; color: var(--navy-950); margin-top: 0.2rem;">${m.stem}</h4>
        </div>
        <button class="btn-card-read" onclick="removeMistake('${m.questionId}')" style="padding: 0.4rem 0.75rem; font-size: 0.78rem;">
          <i class="fa-solid fa-check"></i> Mark Reviewed
        </button>
      </div>
      <div style="font-size: 0.85rem; line-height: 1.5; color: var(--slate-700); background: var(--slate-100); padding: 0.75rem; border-radius: var(--radius-sm);">
        <p style="color: var(--rose-600); margin-bottom: 0.25rem;"><strong>Your Answer:</strong> ${m.selectedAnswer}</p>
        <p style="color: var(--emerald-700); margin-bottom: 0.5rem;"><strong>Correct Answer:</strong> ${m.correctAnswer}</p>
        <p style="color: var(--slate-600);"><strong>Explanation:</strong> ${m.explanation}</p>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// 13. TOAST NOTIFICATION UTILITY
// ==========================================================================
let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById("appToast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// ==========================================================================
// 14. EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById("passageSearchInput");
  const clearBtn = document.getElementById("btnClearSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      if (clearBtn) clearBtn.style.display = currentSearchTerm ? "block" : "none";
      renderPassages();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      currentSearchTerm = "";
      if (searchInput) searchInput.value = "";
      clearBtn.style.display = "none";
      renderPassages();
    });
  }

  // Difficulty tabs
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilterDifficulty = tab.dataset.diff;
      renderPassages();
    });
  });

  // Category dropdown
  const catSelect = document.getElementById("categoryFilterSelect");
  if (catSelect) {
    catSelect.addEventListener("change", (e) => {
      currentFilterCategory = e.target.value;
      renderPassages();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("sortPassagesSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSortMode = e.target.value;
      renderPassages();
    });
  }

  // Escape key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeWorkspace();
      closeScoreModal();
      closeSavedModal();
      closeMistakesModal();
    }
  });
}
