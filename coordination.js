/**
 * EduNexa AI - Coordination & Control (MDCAT Biology)
 * coordination.js
 * Vanilla JavaScript for Interactive Concepts, Reflex Arc, Brain Selector,
 * 10 High-Yield MDCAT MCQs, Local Storage Progress, and Quick Search.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSubnavScrollSpy();
  initSearchDrawer();
  initCoordinationPathway();
  initReceptorsExplorer();
  initNeuronInteractiveDiagram();
  initNeuronTypesSelector();
  initReflexArcInteractive();
  initBrainRegionSelector();
  initEndocrineGlands();
  initRevisionAccordion();
  initMcqQuiz();
  initChapterProgress();
});

/* ==========================================================================
   1. Navigation Scroll-Spy & Smooth Scrolling
   ========================================================================== */
function initSubnavScrollSpy() {
  const subnavLinks = document.querySelectorAll('.subnav-link');
  const sections = document.querySelectorAll('.content-section, .hero-section');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      subnavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === currentSectionId) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Topic Quick Search
   ========================================================================== */
function initSearchDrawer() {
  const searchBtn = document.getElementById('btn-search-toggle');
  const searchDrawer = document.getElementById('search-drawer');
  const searchInput = document.getElementById('topic-search-input');
  const clearBtn = document.getElementById('btn-clear-search');
  const resultsContainer = document.getElementById('search-results-list');

  if (!searchBtn || !searchDrawer || !searchInput || !resultsContainer) return;

  const searchableTopics = [
    { title: 'Coordination & Control Overview', target: 'section-overview', keywords: 'nervous chemical stimulus receptor coordinator effector response' },
    { title: 'Receptors & Senses (Photoreceptors, Retina)', target: 'section-receptors', keywords: 'photoreceptors mechanoreceptors chemoreceptors thermoreceptors pain retina rods cones light' },
    { title: 'Neuron Anatomy (Dendrites, Axon, Myelin)', target: 'section-neurons', keywords: 'neuron dendrites soma axon myelin sheath nodes ranvier terminals schwann' },
    { title: 'Types of Neurons (Sensory, Relay, Motor)', target: 'section-neurons', keywords: 'sensory afferent relay interneuron motor efferent reflex SAME DAVE' },
    { title: 'Nerve Impulse & Action Potential', target: 'section-impulse', keywords: 'nerve impulse action potential resting potential depolarization repolarization sodium potassium na k' },
    { title: 'The Synapse & Acetylcholine', target: 'section-synapse', keywords: 'synapse synaptic cleft acetylcholine neurotransmitter vesicles calcium ca' },
    { title: 'Reflex Action & Reflex Arc', target: 'section-reflex', keywords: 'reflex action reflex arc involuntary automatic hot stove withdrawal' },
    { title: 'Central Nervous System (CNS) & Brain', target: 'section-cns-brain', keywords: 'brain cerebrum cerebellum medulla oblongata hypothalamus cns pns' },
    { title: 'Chemical vs. Nervous Coordination', target: 'section-chemical', keywords: 'chemical coordination hormone endocrine bloodstream speed duration' },
    { title: 'Major Endocrine Glands (Pituitary, Thyroid, Pancreas)', target: 'section-glands', keywords: 'pituitary master gland thyroid thyroxine parathyroid pth adrenal adrenaline pancreas insulin glucagon pineal melatonin negative feedback' },
    { title: '🔥 MDCAT Must-Know High-Yield Facts', target: 'section-must-know', keywords: 'must know high yield pmdc facts exam summary' },
    { title: '⚡ Quick Revision Flashcards', target: 'section-revision', keywords: 'revision flashcards questions answers' },
    { title: '❓ MDCAT Practice Quiz (10 MCQs)', target: 'section-quiz', keywords: 'quiz mcqs test questions practice assessment' }
  ];

  searchBtn.addEventListener('click', () => {
    const isHidden = searchDrawer.classList.toggle('hidden');
    if (!isHidden) {
      searchInput.focus();
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    searchInput.focus();
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matches = searchableTopics.filter(t => 
      t.title.toLowerCase().includes(query) || t.keywords.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = '<div class="search-result-item" style="color: var(--text-muted);">No matching topics found. Try searching "insulin", "reflex", or "cerebrum".</div>';
      return;
    }

    resultsContainer.innerHTML = matches.map(m => `
      <a href="#${m.target}" class="search-result-item" data-search-target="${m.target}">
        <strong>${m.title}</strong>
      </a>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        searchDrawer.classList.add('hidden');
      });
    });
  });
}

/* ==========================================================================
   3. Section 1: Coordination Pathway Interactive
   ========================================================================== */
function initCoordinationPathway() {
  const steps = document.querySelectorAll('#coordination-pathway-interactive .pathway-step');
  const detailText = document.getElementById('pathway-detail-text');
  if (!steps.length || !detailText) return;

  const stepDetails = {
    1: '<strong>1. Stimulus:</strong> Any measurable physical or chemical alteration in external or internal environment (e.g., thermal touch, light wavelength change, blood glucose fluctuation).',
    2: '<strong>2. Receptor:</strong> Specialized transducer cell (e.g., photoreceptor, thermoreceptor) that converts physical/chemical energy into an electrochemical action potential.',
    3: '<strong>3. Coordinator:</strong> The CNS (Brain/Spinal cord) or Endocrine gland that evaluates sensory input, integrates past memory, and formulates an effector command.',
    4: '<strong>4. Effector:</strong> The responsive tissue — either a <em>muscle</em> (contracts to produce movement) or a <em>gland</em> (secretes hormonal or enzymatic fluids).',
    5: '<strong>5. Response:</strong> The observable physiological action executed by the effector (e.g., hand withdrawal, decreased blood glucose, pupil constriction).'
  };

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      const stepNum = step.getAttribute('data-step');
      detailText.innerHTML = stepDetails[stepNum] || 'Click any pathway step above to view details.';
    });
  });
}

/* ==========================================================================
   4. Section 2: Receptors Interactive Grid
   ========================================================================== */
function initReceptorsExplorer() {
  const receptorCards = document.querySelectorAll('#receptors-interactive-grid .interactive-card');
  if (!receptorCards.length) return;

  receptorCards.forEach(card => {
    card.addEventListener('click', () => {
      receptorCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

/* ==========================================================================
   5. Section 3: Labeled Neuron Interactive Diagram
   ========================================================================== */
function initNeuronInteractiveDiagram() {
  const svgParts = document.querySelectorAll('.svg-clickable-part');
  const partTitle = document.getElementById('neuron-part-title');
  const partText = document.getElementById('neuron-part-text');

  if (!svgParts.length || !partTitle || !partText) return;

  const neuronData = {
    dendrites: {
      title: 'Dendrites (Receptive Extensions)',
      desc: 'Extensively branched projections extending from the soma that receive stimuli from receptors or neurotransmitters from preceding neurons, conducting electrical impulses toward the cell body.'
    },
    soma: {
      title: 'Cell Body (Soma / Cyton)',
      desc: 'The metabolic headquarters containing the prominent nucleus, Nissl granules (rough ER & ribosomes for neurotransmitter synthesis), mitochondria, and neurofibrils.'
    },
    axon: {
      title: 'Axon (Conducting Nerve Fiber)',
      desc: 'A single, elongated cylindrical cytoplasmic process (axoplasm) enclosed by the axolemma that conducts action potentials unidirectionally AWAY from the soma toward target effectors.'
    },
    myelin: {
      title: 'Myelin Sheath (Insulating Layers)',
      desc: 'Lipid-rich covering produced by Schwann cells in PNS (Oligodendrocytes in CNS). Prevents ion leakage and accelerates transmission via saltatory conduction (up to 120 m/s).'
    },
    nodes: {
      title: 'Nodes of Ranvier',
      desc: 'Periodic unmyelinated gaps along the axon where voltage-gated Na+ and K+ channels are densely clustered, allowing the action potential to jump from node to node (Saltatory Conduction).'
    },
    terminals: {
      title: 'Axon Terminals & Synaptic Knobs',
      desc: 'Terminal arborizations ending in swollen synaptic knobs containing membrane-bound vesicles of neurotransmitters (e.g., Acetylcholine) ready for exocytosis into the synaptic cleft.'
    }
  };

  svgParts.forEach(part => {
    part.addEventListener('click', () => {
      const partKey = part.getAttribute('data-part');
      if (neuronData[partKey]) {
        partTitle.textContent = neuronData[partKey].title;
        partText.textContent = neuronData[partKey].desc;
      }
    });
  });
}

/* ==========================================================================
   6. Section 4: Types of Neurons Selector
   ========================================================================== */
function initNeuronTypesSelector() {
  const typeCards = document.querySelectorAll('#neuron-types-interactive .neuron-type-card');
  if (!typeCards.length) return;

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ==========================================================================
   7. Section 8: Reflex Arc Interactive Pathway
   ========================================================================== */
function initReflexArcInteractive() {
  const reflexNodes = document.querySelectorAll('#reflex-arc-container .reflex-node');
  const badgeEl = document.getElementById('reflex-step-badge');
  const titleEl = document.getElementById('reflex-step-title');
  const descEl = document.getElementById('reflex-step-desc');

  if (!reflexNodes.length || !badgeEl || !titleEl || !descEl) return;

  const reflexData = {
    1: {
      badge: 'Step 1: Stimulus',
      title: 'Stimulus: Extreme Thermal / Pain Energy',
      desc: 'High thermal heat or sharp pressure touches the skin surface, providing an intense environmental stimulus that triggers rapid sensory firing.'
    },
    2: {
      badge: 'Step 2: Receptor',
      title: 'Receptor: Dermal Thermoreceptors & Nociceptors',
      desc: 'Specialized sensory nerve endings in the skin detect the noxious heat and generate graded generator potentials that reach threshold.'
    },
    3: {
      badge: 'Step 3: Sensory Neuron',
      title: 'Sensory Neuron (Afferent Pathway)',
      desc: 'Carries high-speed action potentials along the peripheral nerve via the dorsal root ganglion into the dorsal horn of the spinal cord.'
    },
    4: {
      badge: 'Step 4: Relay Neuron',
      title: 'Relay Neuron (Interneuron in Spinal Cord)',
      desc: 'Located within the gray matter of the spinal cord. It synapses with the sensory neuron, immediately processes the signal, and activates the motor neuron without routing to the brain first.'
    },
    5: {
      badge: 'Step 5: Motor Neuron',
      title: 'Motor Neuron (Efferent Pathway)',
      desc: 'Emerges from the ventral horn of the spinal cord and travels via the ventral root directly toward the effector muscle in the limb.'
    },
    6: {
      badge: 'Step 6: Effector',
      title: 'Effector: Biceps Brachii Muscle',
      desc: 'Neuromuscular junctions receive acetylcholine; muscle fibers depolarize and contract vigorously.'
    },
    7: {
      badge: 'Step 7: Response',
      title: 'Response: Rapid Hand Withdrawal',
      desc: 'The arm contracts instantaneously, pulling the hand away from the hot surface within milliseconds to minimize skin tissue damage.'
    }
  };

  reflexNodes.forEach(node => {
    node.addEventListener('click', () => {
      reflexNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const nodeNum = node.getAttribute('data-node');
      if (reflexData[nodeNum]) {
        badgeEl.textContent = reflexData[nodeNum].badge;
        titleEl.textContent = reflexData[nodeNum].title;
        descEl.textContent = reflexData[nodeNum].desc;
      }
    });
  });
}

/* ==========================================================================
   8. Section 10: Brain Region Selector
   ========================================================================== */
function initBrainRegionSelector() {
  const tabs = document.querySelectorAll('#brain-nav-tabs .brain-tab-btn');
  const tagEl = document.getElementById('brain-tag');
  const titleEl = document.getElementById('brain-title');
  const badgeEl = document.getElementById('brain-type-badge');
  const responsibilitiesEl = document.getElementById('brain-responsibilities');
  const bodyTextEl = document.getElementById('brain-body');

  if (!tabs.length || !tagEl || !titleEl || !badgeEl || !responsibilitiesEl) return;

  const brainData = {
    cerebrum: {
      tag: 'Forebrain / Telencephalon',
      title: 'Cerebrum',
      badge: 'Voluntary & Conscious Mind',
      intro: 'The largest and most evolved part of the human brain, characterized by deep folds (gyri and sulci). Composed of two cerebral hemispheres connected by the corpus callosum.',
      points: [
        '<strong>Conscious activities & Voluntary muscular movements</strong>',
        '<strong>High-order thinking, Reasoning, Logic & Intelligence</strong>',
        '<strong>Memory storage, Learning & Emotional processing</strong>',
        '<strong>Perception and interpretation of sensory inputs</strong> (Vision, Hearing, Smell, Taste, Touch)'
      ]
    },
    cerebellum: {
      tag: 'Hindbrain / Metencephalon',
      title: 'Cerebellum ("Little Brain")',
      badge: 'Motor Coordination & Posture',
      intro: 'Located posteriorly beneath the occipital lobes of the cerebrum. Contains over 50% of the brain\'s neurons densely packed to calculate precise muscular firing.',
      points: [
        '<strong>Maintenance of body equilibrium and balance</strong>',
        '<strong>Regulation of posture and muscle tone</strong>',
        '<strong>Smooth coordination of voluntary motor movements</strong> (e.g., walking, typing, surgical precision)'
      ]
    },
    medulla: {
      tag: 'Hindbrain / Myelencephalon',
      title: 'Medulla Oblongata',
      badge: 'Vital Involuntary Reflexes',
      intro: 'The lowest part of the brainstem, transitioning directly into the spinal cord. Contains autonomic centers critical for human survival.',
      points: [
        '<strong>Cardiac center:</strong> Regulates heart rate and force of contraction',
        '<strong>Respiratory center:</strong> Controls breathing rate and depth based on blood CO₂ / pH',
        '<strong>Vasomotor center:</strong> Controls blood vessel diameter and blood pressure',
        '<strong>Autonomic protective reflexes:</strong> Swallowing, coughing, sneezing, vomiting, and hiccuping'
      ]
    },
    hypothalamus: {
      tag: 'Forebrain / Diencephalon',
      title: 'Hypothalamus',
      badge: 'Homeostasis & Master Link',
      intro: 'Located below the thalamus, forming the floor of the third ventricle. Serves as the primary neuro-endocrine bridge linking the nervous system to the pituitary gland.',
      points: [
        '<strong>Master homeostatic center:</strong> Regulates body temperature (central thermostat)',
        '<strong>Controls hunger, appetite, satiety, and thirst</strong>',
        '<strong>Regulates sleep-wake circadian rhythm</strong> and emotional responses',
        '<strong>Produces releasing and inhibiting hormones</strong> controlling the anterior pituitary gland; synthesizes ADH and oxytocin stored in posterior pituitary'
      ]
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const partKey = tab.getAttribute('data-part');
      const data = brainData[partKey];
      if (data) {
        tagEl.textContent = data.tag;
        titleEl.textContent = data.title;
        badgeEl.textContent = data.badge;
        responsibilitiesEl.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');
      }
    });
  });
}

/* ==========================================================================
   9. Endocrine Gland Highlights
   ========================================================================== */
function initEndocrineGlands() {
  const glandCards = document.querySelectorAll('#endocrine-glands-grid .gland-card');
  glandCards.forEach(card => {
    card.addEventListener('click', () => {
      glandCards.forEach(c => c.style.borderColor = 'var(--border-subtle)');
      card.style.borderColor = 'var(--brand-600)';
    });
  });
}

/* ==========================================================================
   10. Section 22: Quick Revision Accordion
   ========================================================================== */
function initRevisionAccordion() {
  const items = document.querySelectorAll('#revision-accordion .revision-item');
  items.forEach(item => {
    const btn = item.querySelector('.revision-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.revision-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   11. Section 23: ❓ MDCAT Practice Quiz (10 Complete MCQs)
   ========================================================================== */
const MDCAT_MCQS = [
  {
    id: 1,
    topic: 'Coordination Pathway',
    question: 'Which of the following correctly describes the universal sequence of events in nervous coordination?',
    options: [
      'Receptor → Stimulus → Coordinator → Response → Effector',
      'Stimulus → Receptor → Coordinator → Effector → Response',
      'Effector → Stimulus → Receptor → Coordinator → Response',
      'Stimulus → Coordinator → Receptor → Effector → Response'
    ],
    correctIndex: 1,
    explanation: 'The universal biological coordination sequence is: Stimulus (environmental change) → Receptor (detection) → Coordinator (CNS/endocrine) → Effector (muscle/gland) → Response (final action).'
  },
  {
    id: 2,
    topic: 'Sensory Receptors',
    question: 'Photoreceptors responsible for detecting light energy in the human visual system are located in which structure?',
    options: [
      'Cornea',
      'Retina of the eye',
      'Cochlea of inner ear',
      'Pacinian corpuscle'
    ],
    correctIndex: 1,
    explanation: 'The retina contains specialized photoreceptor cells (rods for dim light vision and cones for bright light/color vision) that detect light stimuli.'
  },
  {
    id: 3,
    topic: 'Neuron Anatomy',
    question: 'What is the primary function of the myelin sheath covering the axons of many neurons?',
    options: [
      'To secrete neurotransmitters into the synaptic cleft',
      'To provide insulation and increase the velocity of nerve impulse transmission',
      'To act as the metabolic control center containing the nucleus',
      'To receive stimuli from preceding neurons'
    ],
    correctIndex: 1,
    explanation: 'The lipid-rich myelin sheath provides electrical insulation, preventing charge dissipation and allowing rapid saltatory conduction from node to node.'
  },
  {
    id: 4,
    topic: 'Types of Neurons',
    question: 'A neuron that transmits nerve impulses from sensory receptors towards the Central Nervous System (CNS) is classified as a:',
    options: [
      'Motor neuron (Efferent)',
      'Relay neuron (Interneuron)',
      'Sensory neuron (Afferent)',
      'Effector neuron'
    ],
    correctIndex: 2,
    explanation: 'Sensory (afferent) neurons carry electrical impulses from peripheral receptors towards the CNS. Motor (efferent) neurons conduct impulses away from the CNS to effectors.'
  },
  {
    id: 5,
    topic: 'Nerve Impulse',
    question: 'During the depolarization phase of an action potential in a stimulated neuron:',
    options: [
      'Potassium channels open, causing massive K⁺ efflux',
      'Sodium channels open, causing rapid influx of Na⁺ into the axon',
      'The membrane potential becomes more negative than -70 mV',
      'The Na⁺/K⁺ pump stops functioning permanently'
    ],
    correctIndex: 1,
    explanation: 'Depolarization occurs when voltage-gated Na⁺ channels open in response to a threshold stimulus, allowing rapid influx of Na⁺ down its electrochemical gradient, making the interior electropositive (+35 mV).'
  },
  {
    id: 6,
    topic: 'Synapse Transmission',
    question: 'At a chemical synapse, the arrival of an action potential at the axon terminal triggers the release of which classic neurotransmitter into the synaptic cleft?',
    options: [
      'Thyroxine',
      'Acetylcholine',
      'Glucagon',
      'Melatonin'
    ],
    correctIndex: 1,
    explanation: 'Acetylcholine (ACh) is a primary neurotransmitter stored in synaptic vesicles that is exocytosed into the synaptic cleft to transmit impulses chemically.'
  },
  {
    id: 7,
    topic: 'Brain Functions',
    question: 'A patient experiences loss of muscular coordination, loss of body balance, and unsteady gait following an injury. Which brain region is most likely damaged?',
    options: [
      'Cerebrum',
      'Cerebellum',
      'Medulla oblongata',
      'Hypothalamus'
    ],
    correctIndex: 1,
    explanation: 'The cerebellum is the primary coordinator of muscular activity, posture, and body balance. Damage leads to ataxia and loss of fine motor coordination.'
  },
  {
    id: 8,
    topic: 'Endocrine Glands',
    question: 'Why is the pituitary gland frequently designated as the "Master Gland" of the human body?',
    options: [
      'It is the largest endocrine gland by physical mass',
      'It produces thyroxine that controls whole-body metabolism',
      'Its tropic hormones regulate the secretion of numerous other endocrine glands',
      'It independently generates electrical action potentials'
    ],
    correctIndex: 2,
    explanation: 'The pituitary gland produces tropic hormones (TSH, ACTH, FSH, LH, GH) that regulate other major endocrine target organs like the thyroid, adrenal cortex, and gonads.'
  },
  {
    id: 9,
    topic: 'Thyroid & Parathyroid',
    question: 'Which chemical element is strictly required for the synthesis of thyroxine, and which hormone acts to increase blood calcium levels?',
    options: [
      'Iron; Insulin',
      'Iodine; Parathyroid Hormone (PTH)',
      'Calcium; Glucagon',
      'Sodium; Melatonin'
    ],
    correctIndex: 1,
    explanation: 'Iodine is essential for thyroid hormone (T4/T3) synthesis. Parathyroid Hormone (PTH) acts directly to increase blood calcium (Ca²⁺) concentration.'
  },
  {
    id: 10,
    topic: 'Pancreatic Hormones',
    question: 'Which pair of hormones correctly illustrates opposing homeostatic regulation of blood glucose concentration by the pancreas?',
    options: [
      'Insulin (decreases glucose) and Glucagon (increases glucose)',
      'Insulin (increases glucose) and Glucagon (decreases glucose)',
      'Adrenaline (decreases glucose) and Melatonin (increases glucose)',
      'PTH (decreases glucose) and Thyroxine (increases glucose)'
    ],
    correctIndex: 0,
    explanation: 'Beta cells secrete Insulin (which lowers blood glucose by promoting cellular uptake and glycogenesis), while Alpha cells secrete Glucagon (which raises blood glucose by stimulating glycogenolysis).'
  }
];

let userAnswers = {};
let quizScore = 0;

function initMcqQuiz() {
  const container = document.getElementById('mcqs-list');
  const liveScoreDisplay = document.getElementById('live-score-display');
  const resultsCard = document.getElementById('quiz-results-card');
  const retryBtn = document.getElementById('btn-retry-quiz');
  const saveProgressBtn = document.getElementById('btn-save-progress');

  if (!container) return;

  renderMcqs();

  function renderMcqs() {
    container.innerHTML = '';
    userAnswers = {};
    quizScore = 0;
    if (liveScoreDisplay) liveScoreDisplay.textContent = '0 / 10';
    if (resultsCard) resultsCard.classList.add('hidden');

    MDCAT_MCQS.forEach((mcq, idx) => {
      const qNum = idx + 1;
      const letters = ['A', 'B', 'C', 'D'];

      const card = document.createElement('div');
      card.className = 'mcq-card';
      card.id = `mcq-card-${mcq.id}`;

      card.innerHTML = `
        <div class="mcq-header">
          <span class="mcq-number">Question ${qNum} of 10</span>
          <span class="mcq-topic-tag">${mcq.topic}</span>
        </div>
        <p class="mcq-question">${mcq.question}</p>
        <div class="mcq-options-grid" id="options-grid-${mcq.id}">
          ${mcq.options.map((opt, oIdx) => `
            <button type="button" class="option-btn" data-qid="${mcq.id}" data-oidx="${oIdx}">
              <span class="opt-letter">${letters[oIdx]}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="mcq-explanation" id="exp-${mcq.id}"></div>
      `;

      container.appendChild(card);
    });

    // Attach click handlers
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    const btn = e.currentTarget;
    const qid = parseInt(btn.getAttribute('data-qid'), 10);
    const selectedOidx = parseInt(btn.getAttribute('data-oidx'), 10);

    if (userAnswers[qid] !== undefined) return; // already answered

    const mcq = MDCAT_MCQS.find(q => q.id === qid);
    if (!mcq) return;

    userAnswers[qid] = selectedOidx;

    const optionsGrid = document.getElementById(`options-grid-${qid}`);
    const explanationBox = document.getElementById(`exp-${qid}`);
    const optionButtons = optionsGrid.querySelectorAll('.option-btn');

    // Disable all options for this question
    optionButtons.forEach(b => b.disabled = true);

    const isCorrect = (selectedOidx === mcq.correctIndex);
    if (isCorrect) {
      quizScore++;
      btn.classList.add('correct');
      if (explanationBox) {
        explanationBox.className = 'mcq-explanation show correct-exp';
        explanationBox.innerHTML = `<strong>✓ Correct!</strong> ${mcq.explanation}`;
      }
    } else {
      btn.classList.add('incorrect');
      // Highlight the correct one
      const correctBtn = optionsGrid.querySelector(`[data-oidx="${mcq.correctIndex}"]`);
      if (correctBtn) correctBtn.classList.add('correct');
      if (explanationBox) {
        explanationBox.className = 'mcq-explanation show incorrect-exp';
        explanationBox.innerHTML = `<strong>✗ Incorrect.</strong> ${mcq.explanation}`;
      }
    }

    if (liveScoreDisplay) {
      liveScoreDisplay.textContent = `${quizScore} / 10`;
    }

    // Check if all 10 are answered
    if (Object.keys(userAnswers).length === MDCAT_MCQS.length) {
      showQuizResults();
    }
  }

  function showQuizResults() {
    if (!resultsCard) return;
    resultsCard.classList.remove('hidden');

    const statCorrect = document.getElementById('stat-correct');
    const statIncorrect = document.getElementById('stat-incorrect');
    const statPercentage = document.getElementById('stat-percentage');
    const feedbackBox = document.getElementById('results-feedback');
    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');

    const total = MDCAT_MCQS.length;
    const correct = quizScore;
    const incorrect = total - correct;
    const percentage = Math.round((correct / total) * 100);

    if (statCorrect) statCorrect.textContent = correct;
    if (statIncorrect) statIncorrect.textContent = incorrect;
    if (statPercentage) statPercentage.textContent = `${percentage}%`;

    let feedbackMessage = '';
    if (percentage >= 90) {
      if (resultsIcon) resultsIcon.textContent = '🌟';
      if (resultsTitle) resultsTitle.textContent = 'Outstanding Mastery!';
      feedbackMessage = 'Superb performance! You have mastered the nervous and chemical coordination concepts thoroughly for MDCAT biology.';
    } else if (percentage >= 70) {
      if (resultsIcon) resultsIcon.textContent = '👍';
      if (resultsTitle) resultsTitle.textContent = 'Solid Understanding!';
      feedbackMessage = 'Good job! Review the reflex arc, endocrine glands, and neurotransmitter sections to achieve 100% accuracy.';
    } else {
      if (resultsIcon) resultsIcon.textContent = '📖';
      if (resultsTitle) resultsTitle.textContent = 'Revision Recommended';
      feedbackMessage = 'Review the high-yield notes and flashcards above, then retry the quiz to solidify your understanding.';
    }

    if (feedbackBox) {
      feedbackBox.innerHTML = `<p>${feedbackMessage}</p>`;
    }

    // Save quiz score to localStorage
    try {
      localStorage.setItem('studymate_coordination_quiz_score', quizScore.toString());
      localStorage.setItem('studymate_coordination_quiz_percentage', percentage.toString());
      updateProgressUI();
    } catch (err) {
      // Storage safe ignore
    }

    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      renderMcqs();
      const quizSection = document.getElementById('section-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (saveProgressBtn) {
    saveProgressBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('studymate_coordination_quiz_score', quizScore.toString());
        saveProgressBtn.textContent = 'Progress Saved ✓';
        setTimeout(() => {
          saveProgressBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>Save Progress</span>
          `;
        }, 2000);
      } catch (err) {}
    });
  }
}

/* ==========================================================================
   12. Local Chapter Progress & Completion
   ========================================================================== */
function initChapterProgress() {
  const topMarkBtn = document.getElementById('btn-mark-complete-top');
  const bottomMarkBtn = document.getElementById('btn-mark-chapter-complete');
  const topMarkText = document.getElementById('top-mark-btn-text');
  const bottomMarkText = document.getElementById('bottom-complete-btn-text');

  // Load existing status from localStorage
  try {
    const isCompleted = localStorage.getItem('studymate_coordination_completed') === 'true';
    if (isCompleted) {
      setChapterCompletedState(true);
    }
  } catch (err) {}

  function toggleCompletion() {
    try {
      const current = localStorage.getItem('studymate_coordination_completed') === 'true';
      const newState = !current;
      localStorage.setItem('studymate_coordination_completed', newState.toString());
      setChapterCompletedState(newState);
    } catch (err) {}
  }

  function setChapterCompletedState(completed) {
    if (completed) {
      if (topMarkBtn) topMarkBtn.classList.add('completed');
      if (topMarkText) topMarkText.textContent = 'Completed ✓';
      if (bottomMarkBtn) bottomMarkBtn.classList.add('completed');
      if (bottomMarkText) bottomMarkText.textContent = 'Chapter Completed ✓';
    } else {
      if (topMarkBtn) topMarkBtn.classList.remove('completed');
      if (topMarkText) topMarkText.textContent = 'Mark Complete';
      if (bottomMarkBtn) bottomMarkBtn.classList.remove('completed');
      if (bottomMarkText) bottomMarkText.textContent = 'Mark Chapter Complete';
    }
    updateProgressUI();
  }

  if (topMarkBtn) topMarkBtn.addEventListener('click', toggleCompletion);
  if (bottomMarkBtn) bottomMarkBtn.addEventListener('click', toggleCompletion);

  // Monitor scroll for section reading percentage
  window.addEventListener('scroll', () => {
    updateProgressUI();
  }, { passive: true });

  updateProgressUI();
}

function updateProgressUI() {
  const progressFill = document.getElementById('top-progress-fill');
  const progressText = document.getElementById('top-progress-text');
  if (!progressFill || !progressText) return;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  let scrollPercentage = 0;
  if (docHeight > 0) {
    scrollPercentage = Math.min(100, Math.round((scrolled / docHeight) * 100));
  }

  let finalPercentage = scrollPercentage;
  try {
    const isCompleted = localStorage.getItem('studymate_coordination_completed') === 'true';
    if (isCompleted) {
      finalPercentage = 100;
    }
  } catch (err) {}

  progressFill.style.width = `${finalPercentage}%`;
  progressText.textContent = `${finalPercentage}%`;
}
