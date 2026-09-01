/**
 * HUMAN PHYSIOLOGY — MDCAT BIOLOGY COMPANION
 * Vanilla JavaScript Engine for Interactive Simulations, Flashcards, Quiz, Search & Bookmarks
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. LOCAL STORAGE KEYS & INITIAL STATES
     ========================================================================== */
  const STORAGE_KEYS = {
    BOOKMARKS: 'mdcat_physio_bookmarks',
    COMPLETED: 'mdcat_physio_completed',
    FLASHCARD_STATE: 'mdcat_physio_fc_mastered',
    QUIZ_STATE: 'mdcat_physio_quiz_state'
  };

  let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
  let isChapterCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED) === 'true';

  /* ==========================================================================
     2. READING PROGRESS & SCROLL SPY NAVIGATION
     ========================================================================== */
  const readingProgressBar = document.getElementById('readingProgressBar');
  const scrollProgressText = document.getElementById('scrollProgressText');
  const subnavItems = document.querySelectorAll('.subnav-item');
  const sections = document.querySelectorAll('.chapter-section, .hero-section');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;

    if (readingProgressBar) {
      readingProgressBar.style.width = `${progress}%`;
    }
    if (scrollProgressText) {
      scrollProgressText.textContent = `${progress}% Complete`;
    }

    // Floating Back to top visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }

    // Scroll spy for subnav tabs
    let currentActiveId = '';
    const scrollOffset = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollOffset >= top && scrollOffset < top + height) {
        currentActiveId = section.id;
      }
    });

    if (currentActiveId) {
      subnavItems.forEach(item => {
        if (item.getAttribute('data-target') === currentActiveId) {
          item.classList.add('active');
          // Smoothly bring active subnav tab into view if scrolling horizontally
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // System node jumpers in hero
  const systemNodes = document.querySelectorAll('.system-node');
  systemNodes.forEach(node => {
    node.addEventListener('click', () => {
      const targetId = node.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     3. BOOKMARK SYSTEM
     ========================================================================== */
  const bookmarkDrawerBtn = document.getElementById('bookmarkDrawerBtn');
  const bookmarkDrawer = document.getElementById('bookmarkDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeBookmarkDrawer = document.getElementById('closeBookmarkDrawer');
  const bookmarkList = document.getElementById('bookmarkList');
  const bookmarkBadge = document.getElementById('bookmarkBadge');
  const bookmarkButtons = document.querySelectorAll('.btn-bookmark');

  function updateBookmarkUI() {
    if (bookmarkBadge) {
      bookmarkBadge.textContent = bookmarks.length;
    }

    // Update section bookmark button active states
    bookmarkButtons.forEach(btn => {
      const id = btn.getAttribute('data-bookmark-id');
      const isSaved = bookmarks.some(b => b.id === id);
      if (isSaved) {
        btn.classList.add('is-bookmarked');
        btn.setAttribute('title', 'Remove Bookmark');
      } else {
        btn.classList.remove('is-bookmarked');
        btn.setAttribute('title', 'Bookmark Section');
      }
    });

    // Populate Drawer List
    if (bookmarkList) {
      if (bookmarks.length === 0) {
        bookmarkList.innerHTML = '<p class="empty-bookmark-msg">No bookmarks saved yet. Click the bookmark icon on any section to save key concepts for quick revision!</p>';
      } else {
        bookmarkList.innerHTML = bookmarks.map(bm => `
          <div class="bookmark-item">
            <a href="#${bm.id}" class="bookmark-link" data-id="${bm.id}">${escapeHTML(bm.title)}</a>
            <button type="button" class="btn-remove-bm" data-id="${bm.id}" title="Remove" aria-label="Remove bookmark">&times;</button>
          </div>
        `).join('');

        // Attach click handlers to drawer items
        bookmarkList.querySelectorAll('.bookmark-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-id');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              closeDrawer();
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });

        bookmarkList.querySelectorAll('.btn-remove-bm').forEach(btn => {
          btn.addEventListener('click', () => {
            const idToRemove = btn.getAttribute('data-id');
            toggleBookmark(idToRemove, '');
          });
        });
      }
    }
  }

  function toggleBookmark(id, title) {
    const existingIndex = bookmarks.findIndex(b => b.id === id);
    if (existingIndex > -1) {
      bookmarks.splice(existingIndex, 1);
    } else {
      bookmarks.push({ id, title });
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    updateBookmarkUI();
  }

  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-bookmark-id');
      const title = btn.getAttribute('data-bookmark-title');
      toggleBookmark(id, title);
    });
  });

  function openDrawer() {
    if (bookmarkDrawer && drawerOverlay) {
      bookmarkDrawer.classList.remove('hidden');
      drawerOverlay.classList.remove('hidden');
      bookmarkDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDrawer() {
    if (bookmarkDrawer && drawerOverlay) {
      bookmarkDrawer.classList.add('hidden');
      drawerOverlay.classList.add('hidden');
      bookmarkDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (bookmarkDrawerBtn) bookmarkDrawerBtn.addEventListener('click', openDrawer);
  if (closeBookmarkDrawer) closeBookmarkDrawer.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  updateBookmarkUI();

  /* ==========================================================================
     4. CHAPTER COMPLETION TOGGLE
     ========================================================================== */
  const completeChapterBtn = document.getElementById('completeChapterBtn');
  const completeChapterText = document.getElementById('completeChapterText');
  const footerCompleteBtn = document.getElementById('footerCompleteBtn');
  const footerCompleteText = document.getElementById('footerCompleteText');

  function updateCompletionUI() {
    if (isChapterCompleted) {
      if (completeChapterBtn) completeChapterBtn.classList.add('is-completed');
      if (completeChapterText) completeChapterText.textContent = '✓ Completed';
      if (footerCompleteBtn) footerCompleteBtn.classList.add('is-completed');
      if (footerCompleteText) footerCompleteText.textContent = '✓ Chapter Completed!';
    } else {
      if (completeChapterBtn) completeChapterBtn.classList.remove('is-completed');
      if (completeChapterText) completeChapterText.textContent = 'Mark Complete';
      if (footerCompleteBtn) footerCompleteBtn.classList.remove('is-completed');
      if (footerCompleteText) footerCompleteText.textContent = 'Mark Chapter as Completed';
    }
  }

  function toggleChapterCompletion() {
    isChapterCompleted = !isChapterCompleted;
    localStorage.setItem(STORAGE_KEYS.COMPLETED, isChapterCompleted ? 'true' : 'false');
    updateCompletionUI();
  }

  if (completeChapterBtn) completeChapterBtn.addEventListener('click', toggleChapterCompletion);
  if (footerCompleteBtn) footerCompleteBtn.addEventListener('click', toggleChapterCompletion);
  updateCompletionUI();

  /* ==========================================================================
     5. GLOBAL SEARCH WITH DROPDOWN & HIGHLIGHTING
     ========================================================================== */
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  // Pre-indexed searchable database of sections and topics
  const SEARCH_DATABASE = [
    { title: '1. Human Physiology Overview & Organization', targetId: 'intro', keywords: ['physiology', 'definition', 'levels', 'organization', 'cell', 'tissue', 'organ', 'system', 'homeostasis'] },
    { title: '2. Nervous System & Neuron Anatomy', targetId: 'nervous', keywords: ['nervous', 'cns', 'pns', 'brain', 'spinal cord', 'neuron', 'dendrite', 'axon', 'soma', 'myelin', 'synapse', 'action potential', 'reflex', 'reflex arc'] },
    { title: '3. Circulatory System & Heart Chambers', targetId: 'circulatory', keywords: ['circulatory', 'heart', 'atrium', 'ventricle', 'left ventricle', 'tricuspid', 'bicuspid', 'valves', 'arteries', 'veins', 'capillaries', 'blood', 'plasma', 'rbc', 'wbc', 'platelets', 'haemoglobin', 'double circulation'] },
    { title: '4. Respiratory System & Alveoli', targetId: 'respiratory', keywords: ['respiratory', 'lungs', 'trachea', 'bronchi', 'bronchioles', 'alveoli', 'gas exchange', 'inspiration', 'expiration', 'diaphragm', 'surfactant', 'ventilation'] },
    { title: '5. Digestive System & Enzymes', targetId: 'digestive', keywords: ['digestive', 'mouth', 'saliva', 'amylase', 'ptyalin', 'oesophagus', 'stomach', 'pepsin', 'hcl', 'small intestine', 'duodenum', 'villi', 'microvilli', 'bile', 'lacteal', 'large intestine', 'rectum'] },
    { title: '6. Urinary System & Nephron Mechanism', targetId: 'urinary', keywords: ['urinary', 'kidney', 'nephron', 'ultrafiltration', 'reabsorption', 'pct', 'loop of henle', 'dct', 'collecting duct', 'gfr', 'osmoregulation', 'urea', 'urine'] },
    { title: '7. Endocrine System & Hormones', targetId: 'endocrine', keywords: ['endocrine', 'hormone', 'pituitary', 'thyroid', 'thyroxine', 'insulin', 'glucagon', 'adh', 'vasopressin', 'adrenaline', 'epinephrine', 'aldosterone', 'pancreas', 'diabetes'] },
    { title: '8. Musculoskeletal System & Muscles', targetId: 'musculoskeletal', keywords: ['musculoskeletal', 'skeleton', 'bones', 'axial', 'appendicular', 'joints', 'skeletal muscle', 'smooth muscle', 'cardiac muscle', 'antagonistic', 'biceps', 'triceps', 'intercalated discs'] },
    { title: '9. Immune System & Defense Lines', targetId: 'immune', keywords: ['immune', 'immunity', 'pathogen', 'skin', 'phagocytes', 'neutrophils', 'macrophages', 'lymphocytes', 'b cells', 't cells', 'antibodies', 'antigens', 'innate', 'adaptive'] },
    { title: '10. MDCAT High-Yield Facts', targetId: 'high-yield', keywords: ['high yield', 'facts', 'one liners', 'mcat', 'mdcat', 'summary', 'revision'] },
    { title: '11. Quick Revision Tables', targetId: 'revision-tables', keywords: ['tables', 'comparison', 'arteries vs veins', 'rbc vs wbc', 'skeletal vs smooth vs cardiac', 'insulin vs glucagon', 'cns vs pns'] },
    { title: '12. Interactive Flashcards', targetId: 'flashcards', keywords: ['flashcards', 'cards', 'active recall', 'practice questions', 'mastery'] },
    { title: '13. MDCAT Mini Quiz (15 MCQs)', targetId: 'mini-quiz', keywords: ['quiz', 'mcqs', 'practice test', 'test', 'questions', 'score'] }
  ];

  if (globalSearchInput && searchResultsDropdown) {
    globalSearchInput.addEventListener('input', () => {
      const query = globalSearchInput.value.trim().toLowerCase();

      if (clearSearchBtn) {
        clearSearchBtn.style.display = query ? 'block' : 'none';
      }

      if (!query) {
        searchResultsDropdown.classList.add('hidden');
        searchResultsDropdown.innerHTML = '';
        return;
      }

      const results = SEARCH_DATABASE.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some(k => k.includes(query));
        return titleMatch || keywordMatch;
      });

      if (results.length === 0) {
        searchResultsDropdown.innerHTML = `<div class="search-result-item" style="color:var(--text-subtle);font-size:0.85rem;">No direct matching topics found for "${escapeHTML(query)}". Try terms like <em>neuron, alveoli, nephron, insulin</em>.</div>`;
      } else {
        searchResultsDropdown.innerHTML = results.map(r => `
          <a href="#${r.targetId}" class="search-result-item" data-target="${r.targetId}">
            <div class="search-result-title">${highlightMatch(r.title, query)}</div>
            <div class="search-result-snippet">Includes: ${r.keywords.slice(0, 5).join(', ')}...</div>
          </a>
        `).join('');

        searchResultsDropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              searchResultsDropdown.classList.add('hidden');
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      }

      searchResultsDropdown.classList.remove('hidden');
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        globalSearchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchResultsDropdown.classList.add('hidden');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#headerSearchWrap')) {
        searchResultsDropdown.classList.add('hidden');
      }
    });
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHTML(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHTML(text).replace(regex, '<span class="search-highlight">$1</span>');
  }

  /* ==========================================================================
     6. NEURON INTERACTIVE SIMULATOR
     ========================================================================== */
  const neuronParts = {
    dendrite: {
      title: 'Dendrites (Receptive Field)',
      desc: 'Dendrites are highly branched cytoplasmic extensions that receive biochemical neurotransmitter signals or physical stimuli from preceding sensory receptors or presynaptic neurons and convey graded potentials towards the cell body.',
      mdcat: '⭐ MDCAT Point: Impulse transmission is always unidirectional: Dendrites ➔ Cell Body (Soma) ➔ Axon.'
    },
    soma: {
      title: 'Cell Body / Soma (Metabolic Control Hub)',
      desc: 'Contains the spherical nucleus, abundant mitochondria, Golgi apparatus, and Nissl granules (rough endoplasmic reticulum). Integrates incoming graded synaptic inputs and initiates the action potential at the Axon Hillock.',
      mdcat: '⭐ MDCAT Point: Action potential is triggered at the Axon Hillock when membrane threshold (~ -55 mV) is reached.'
    },
    axon: {
      title: 'Axon with Myelin Sheath (Conduction Cable)',
      desc: 'A long cylindrical nerve fiber conducting electrical action potentials away from the soma. Wrapped in lipid-rich Myelin Sheaths produced by Schwann cells (PNS) or Oligodendrocytes (CNS) with gaps called Nodes of Ranvier.',
      mdcat: '⭐ MDCAT Point: Saltatory Conduction occurs in myelinated axons where action potentials leap from node to node, increasing impulse velocity up to 120 m/s!'
    },
    terminal: {
      title: 'Axon Terminals & Synapse (Signal Transmitters)',
      desc: 'Distal branched ends terminating in swollen Synaptic Knobs (Buttons). Contains synaptic vesicles packed with neurotransmitters (e.g. Acetylcholine, Noradrenaline) released via Ca²⁺-mediated exocytosis into the synaptic cleft.',
      mdcat: '⭐ MDCAT Point: Synaptic transmission is chemical and unidirectional because neurotransmitter receptors exist exclusively on the postsynaptic membrane.'
    }
  };

  const neuronInteractiveElements = document.querySelectorAll('.neuron-part-interactive');
  const neuronPartTitle = document.getElementById('neuronPartTitle');
  const neuronPartDesc = document.getElementById('neuronPartDesc');
  const neuronPartMDCAT = document.getElementById('neuronPartMDCAT');
  const fireImpulseBtn = document.getElementById('fireImpulseBtn');
  const actionPotentialSpark = document.getElementById('actionPotentialSpark');

  neuronInteractiveElements.forEach(el => {
    el.addEventListener('click', () => {
      const partKey = el.getAttribute('data-part');
      neuronInteractiveElements.forEach(item => item.classList.remove('active-part'));
      el.classList.add('active-part');

      if (neuronParts[partKey]) {
        if (neuronPartTitle) neuronPartTitle.textContent = neuronParts[partKey].title;
        if (neuronPartDesc) neuronPartDesc.textContent = neuronParts[partKey].desc;
        if (neuronPartMDCAT) neuronPartMDCAT.innerHTML = `<strong>${neuronParts[partKey].mdcat}</strong>`;
      }
    });
  });

  if (fireImpulseBtn && actionPotentialSpark) {
    fireImpulseBtn.addEventListener('click', () => {
      actionPotentialSpark.classList.remove('firing');
      void actionPotentialSpark.offsetWidth; // Trigger reflow
      actionPotentialSpark.classList.add('firing');

      if (neuronPartTitle) neuronPartTitle.textContent = '⚡ Action Potential Conduction In Progress!';
      if (neuronPartDesc) neuronPartDesc.textContent = 'Depolarization wave (Na⁺ influx via voltage-gated channels) followed by repolarization (K⁺ efflux) racing along the axon membrane.';
      if (neuronPartMDCAT) neuronPartMDCAT.innerHTML = '<strong>⭐ MDCAT Rule:</strong> "All-or-None Law" — If threshold is reached, the action potential fires at maximum amplitude regardless of stimulus strength.';

      setTimeout(() => {
        actionPotentialSpark.classList.remove('firing');
      }, 1300);
    });
  }

  /* ==========================================================================
     7. CIRCULATORY BLOOD FLOW SIMULATOR
     ========================================================================== */
  const startBloodFlowBtn = document.getElementById('startBloodFlowBtn');
  const resetBloodFlowBtn = document.getElementById('resetBloodFlowBtn');
  const flowNodes = document.querySelectorAll('.flow-node');
  const flowStatusText = document.getElementById('flowStatusText');

  const FLOW_STAGES = [
    { id: 'nodeBody1', label: 'Body Capillaries', desc: '1. Oxygen is released to systemic metabolizing cells; blood picks up CO₂ and becomes deoxygenated (blue).' },
    { id: 'nodeRA', label: 'Right Atrium', desc: '2. Deoxygenated blood returns via Superior & Inferior Vena Cava into the Right Atrium.' },
    { id: 'nodeRV', label: 'Right Ventricle', desc: '3. Blood passes through the open Tricuspid Valve into the Right Ventricle during diastole.' },
    { id: 'nodeLungs', label: 'Pulmonary Alveoli', desc: '4. Right Ventricle pumps blood via Pulmonary Arteries to Lungs: CO₂ is exhaled, O₂ binds to Haemoglobin (turns bright red!).' },
    { id: 'nodeLA', label: 'Left Atrium', desc: '5. Newly oxygenated blood returns to the Left Atrium via 4 Pulmonary Veins.' },
    { id: 'nodeLV', label: 'Left Ventricle', desc: '6. Blood crosses the Bicuspid (Mitral) valve into the thick-walled Left Ventricle.' },
    { id: 'nodeAorta', label: 'Systemic Aorta', desc: '7. Left Ventricle forcefully contracts, ejecting oxygen-rich blood through the Aortic Valve into the systemic arterial tree!' }
  ];

  let currentFlowStep = 0;
  let flowIntervalTimer = null;

  function setFlowStep(stepIndex) {
    flowNodes.forEach(node => node.classList.remove('active-flow'));
    if (stepIndex >= 0 && stepIndex < FLOW_STAGES.length) {
      const stage = FLOW_STAGES[stepIndex];
      const targetNode = document.getElementById(stage.id);
      if (targetNode) {
        targetNode.classList.add('active-flow');
      }
      if (flowStatusText) {
        flowStatusText.innerHTML = `<strong>${stage.label}:</strong> ${stage.desc}`;
      }
    }
  }

  function startBloodFlowAnimation() {
    clearInterval(flowIntervalTimer);
    currentFlowStep = 0;
    setFlowStep(currentFlowStep);

    flowIntervalTimer = setInterval(() => {
      currentFlowStep++;
      if (currentFlowStep >= FLOW_STAGES.length) {
        currentFlowStep = 0; // Loop continuous
      }
      setFlowStep(currentFlowStep);
    }, 1400);

    if (startBloodFlowBtn) {
      startBloodFlowBtn.textContent = '⏸ Pause Flow';
    }
  }

  function pauseBloodFlowAnimation() {
    clearInterval(flowIntervalTimer);
    flowIntervalTimer = null;
    if (startBloodFlowBtn) {
      startBloodFlowBtn.textContent = '▶ Resume Flow';
    }
  }

  if (startBloodFlowBtn) {
    startBloodFlowBtn.addEventListener('click', () => {
      if (flowIntervalTimer) {
        pauseBloodFlowAnimation();
      } else {
        startBloodFlowAnimation();
      }
    });
  }

  if (resetBloodFlowBtn) {
    resetBloodFlowBtn.addEventListener('click', () => {
      clearInterval(flowIntervalTimer);
      flowIntervalTimer = null;
      currentFlowStep = 0;
      flowNodes.forEach(node => node.classList.remove('active-flow'));
      if (startBloodFlowBtn) startBloodFlowBtn.textContent = '▶ Start Blood Flow';
      if (flowStatusText) flowStatusText.textContent = 'Click "Start Blood Flow" to animate erythrocytes moving through the double circulatory loop.';
    });
  }

  /* ==========================================================================
     8. RESPIRATORY BREATHING SIMULATOR
     ========================================================================== */
  const inhaleBtn = document.getElementById('inhaleBtn');
  const exhaleBtn = document.getElementById('exhaleBtn');
  const thoracicModel = document.getElementById('thoracicModel');

  const metricAction = document.getElementById('metricAction');
  const metricDiaphragm = document.getElementById('metricDiaphragm');
  const metricVolume = document.getElementById('metricVolume');
  const metricPressure = document.getElementById('metricPressure');
  const metricAirflow = document.getElementById('metricAirflow');

  function triggerInhale() {
    if (thoracicModel) {
      thoracicModel.classList.remove('exhale-state');
      thoracicModel.classList.add('inhale-state');
    }
    if (metricAction) metricAction.textContent = 'Active Inspiration (Inhale)';
    if (metricDiaphragm) metricDiaphragm.textContent = 'Contracted & Flattened (Moves downward)';
    if (metricVolume) metricVolume.textContent = 'Increased Thoracic & Alveolar Volume (~500+ mL)';
    if (metricPressure) metricPressure.textContent = '758 mmHg (-2 mmHg Sub-atmospheric Negative Pressure)';
    if (metricAirflow) metricAirflow.textContent = 'Air rushes IN through trachea to alveoli';
  }

  function triggerExhale() {
    if (thoracicModel) {
      thoracicModel.classList.remove('inhale-state');
      thoracicModel.classList.add('exhale-state');
    }
    if (metricAction) metricAction.textContent = 'Passive Expiration (Exhale at rest)';
    if (metricDiaphragm) metricDiaphragm.textContent = 'Relaxed & Dome-shaped (Pushes upward)';
    if (metricVolume) metricVolume.textContent = 'Decreased Thoracic Volume';
    if (metricPressure) metricPressure.textContent = '762 mmHg (+2 mmHg Greater than atmospheric)';
    if (metricAirflow) metricAirflow.textContent = 'Air forced OUT from lungs to atmosphere';
  }

  if (inhaleBtn) inhaleBtn.addEventListener('click', triggerInhale);
  if (exhaleBtn) exhaleBtn.addEventListener('click', triggerExhale);

  /* ==========================================================================
     9. DIGESTIVE FOOD JOURNEY SIMULATOR
     ========================================================================== */
  const GI_STAGES = [
    {
      heading: 'Stage 1: Oral Cavity (Mouth) & Salivary Amylase',
      body: 'Teeth mechanically grind food (mastication). Salivary glands secrete saliva containing Salivary Amylase (Ptyalin), which begins carbohydrate digestion by hydrolyzing cooked starch into maltose at optimal pH ~6.8. Bolus is formed.',
      tip: '⭐ MDCAT Point: Carbohydrate digestion begins in the mouth, but protein and lipid chemical digestion does not occur here.'
    },
    {
      heading: 'Stage 2: Oesophagus & Peristalsis',
      body: 'The bolus is propelled through the 25cm muscular oesophagus via involuntary rhythmic waves of smooth muscle contractions called Peristalsis. No digestive enzymes are secreted.',
      tip: '⭐ MDCAT Point: Lower oesophageal (cardiac) sphincter relaxes to admit food into the stomach and prevents acidic reflux.'
    },
    {
      heading: 'Stage 3: Stomach (Gastric Digestion)',
      body: 'Gastric glands secrete Gastric Juice (HCl, Pepsinogen, Mucus). HCl lowers pH to 1.5–2.0, killing pathogens and activating Pepsinogen into active Pepsin. Pepsin cleaves proteins into peptones/proteoses. Mechanical churning converts food into acidic Chyme.',
      tip: '⭐ MDCAT Point: Pepsin requires an acidic pH (1.5–2.0) and ceases functioning once chyme enters the alkaline duodenum.'
    },
    {
      heading: 'Stage 4: Small Intestine (Duodenum, Jejunum, Ileum)',
      body: 'Receives Bile (liver/gallbladder) to emulsify fats and Pancreatic Juice (Amylase, Trypsinogen, Lipase, Bicarbonate). Intestinal villi and microvilli absorb monosaccharides, amino acids, and fatty acids/glycerol into central lacteals.',
      tip: '⭐ MDCAT Point: Small intestine is the site of MAXIMUM digestion and virtually all nutrient absorption.'
    },
    {
      heading: 'Stage 5: Large Intestine (Colon, Caecum, Rectum)',
      body: 'Reabsorbs water, electrolytes, and minerals from undigested residue. Symbiotic colonic bacteria synthesize Vitamin K and B vitamins. Semi-solid faeces are formed and stored in the rectum until defecation.',
      tip: '⭐ MDCAT Point: No digestive enzymes are secreted by the large intestine; primary role is water conservation.'
    }
  ];

  const giStageCards = document.querySelectorAll('.gi-stage-card');
  const giStageHeading = document.getElementById('giStageHeading');
  const giStageBody = document.getElementById('giStageBody');
  const giStageTip = document.getElementById('giStageTip');
  const startFoodJourneyBtn = document.getElementById('startFoodJourneyBtn');

  let giJourneyTimer = null;
  let currentGiStage = 0;

  function setGiStage(index) {
    giStageCards.forEach(card => card.classList.remove('active'));
    const targetCard = document.getElementById(`giStage${index + 1}`);
    if (targetCard) targetCard.classList.add('active');

    const data = GI_STAGES[index];
    if (data) {
      if (giStageHeading) giStageHeading.textContent = data.heading;
      if (giStageBody) giStageBody.textContent = data.body;
      if (giStageTip) giStageTip.innerHTML = `<strong>${data.tip}</strong>`;
    }
  }

  giStageCards.forEach(card => {
    card.addEventListener('click', () => {
      clearInterval(giJourneyTimer);
      const stageNum = parseInt(card.getAttribute('data-stage'), 10) - 1;
      currentGiStage = stageNum;
      setGiStage(currentGiStage);
    });
  });

  if (startFoodJourneyBtn) {
    startFoodJourneyBtn.addEventListener('click', () => {
      clearInterval(giJourneyTimer);
      currentGiStage = 0;
      setGiStage(currentGiStage);

      giJourneyTimer = setInterval(() => {
        currentGiStage++;
        if (currentGiStage >= GI_STAGES.length) {
          clearInterval(giJourneyTimer);
          return;
        }
        setGiStage(currentGiStage);
      }, 2500);
    });
  }

  /* ==========================================================================
     10. NEPHRON SIMULATOR
     ========================================================================== */
  const NEPHRON_DATA = {
    glomerulus: {
      title: "Glomerulus & Bowman's Capsule (Renal Corpuscle)",
      location: "Renal Cortex",
      mechanism: "Ultrafiltration under high glomerular capillary blood hydrostatic pressure (~55 mmHg). Blood is filtered through fenestrated endothelium, basement membrane, and podocyte slit pores.",
      substances: "Forms Glomerular Filtrate: Water, glucose, amino acids, urea, ions (virtually cell-free and protein-free).",
      mdcat: "⭐ MDCAT High-Yield: Normal GFR is 125 mL/min (~180 L/day). Over 99% of this volume is reabsorbed along the tubule!"
    },
    pct: {
      title: "Proximal Convoluted Tubule (PCT)",
      location: "Renal Cortex",
      mechanism: "Obligatory Selective Reabsorption facilitated by dense microvilli brush border and rich mitochondria generating ATP for active transport.",
      substances: "Reabsorbs 100% of filtered Glucose, 100% of Amino Acids, ~65-70% of Na⁺, Cl⁻, and Water (obligatory osmosis), and HCO₃⁻.",
      mdcat: "⭐ MDCAT High-Yield: Maximum reabsorption in the nephron occurs in the PCT (~65–70% of total filtrate volume)."
    },
    loop: {
      title: "Loop of Henle (Countercurrent Multiplier)",
      location: "Renal Medulla (Deep in Juxtamedullary nephrons)",
      mechanism: "Descending limb is permeable to water and impermeable to salts; Ascending limb is impermeable to water and actively pumps out Na⁺ & Cl⁻, establishing a hypertonic medullary osmotic gradient.",
      substances: "Water drawn out into interstitium in descending limb; NaCl pumped out into medulla in thick ascending limb.",
      mdcat: "⭐ MDCAT High-Yield: The longer the Loop of Henle, the greater the capacity of the kidney to produce hypertonic (concentrated) urine."
    },
    dct: {
      title: "Distal Convoluted Tubule (DCT)",
      location: "Renal Cortex",
      mechanism: "Facultative (hormonally regulated) reabsorption and active tubular secretion.",
      substances: "Aldosterone stimulates active Na⁺ reabsorption in exchange for K⁺ secretion. Secretes excess H⁺ ions and drug metabolites to regulate blood pH.",
      mdcat: "⭐ MDCAT High-Yield: Tubular secretion of H⁺ and reabsorption of HCO₃⁻ in the DCT maintains arterial blood pH at 7.35–7.45."
    },
    collecting: {
      title: "Collecting Duct & Osmoregulation",
      location: "Extends from Cortex through Medulla to Renal Papilla",
      mechanism: "Final concentration of urine regulated by Antidiuretic Hormone (ADH / Vasopressin).",
      substances: "Under ADH stimulation, Aquaporin water channels open, allowing water to escape into hypertonic medulla, producing concentrated urine.",
      mdcat: "⭐ MDCAT High-Yield: Absence or deficiency of ADH causes Diabetes Insipidus (excretion of up to 20 Liters of dilute urine daily)."
    }
  };

  const nephronButtons = document.querySelectorAll('.nephron-btn');
  const ndTitle = document.getElementById('ndTitle');
  const ndLocation = document.getElementById('ndLocation');
  const ndMechanism = document.getElementById('ndMechanism');
  const ndSubstances = document.getElementById('ndSubstances');
  const ndMDCAT = document.getElementById('ndMDCAT');

  nephronButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      nephronButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const partKey = btn.getAttribute('data-part');
      const data = NEPHRON_DATA[partKey];
      if (data) {
        if (ndTitle) ndTitle.textContent = data.title;
        if (ndLocation) ndLocation.textContent = data.location;
        if (ndMechanism) ndMechanism.textContent = data.mechanism;
        if (ndSubstances) ndSubstances.textContent = data.substances;
        if (ndMDCAT) ndMDCAT.innerHTML = `<strong>${data.mdcat}</strong>`;
      }
    });
  });

  /* ==========================================================================
     11. HORMONE CARDS FILTER SYSTEM
     ========================================================================== */
  const filterChips = document.querySelectorAll('.filter-chip');
  const hormoneCards = document.querySelectorAll('.hormone-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      hormoneCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     12. 3D FLIP FLASHCARDS (12 CARDS)
     ========================================================================== */
  const flashcards = document.querySelectorAll('.flashcard');
  const flipAllCardsBtn = document.getElementById('flipAllCardsBtn');
  const resetFlashcardsBtn = document.getElementById('resetFlashcardsBtn');
  const fcMasteredCount = document.getElementById('fcMasteredCount');

  let areAllCardsFlipped = false;
  let masteredCards = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.FLASHCARD_STATE) || '[]'));

  function updateFlashcardCounter() {
    if (fcMasteredCount) {
      fcMasteredCount.textContent = masteredCards.size;
    }
  }

  flashcards.forEach(card => {
    const cardId = card.getAttribute('data-card-id');

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      masteredCards.add(cardId);
      localStorage.setItem(STORAGE_KEYS.FLASHCARD_STATE, JSON.stringify(Array.from(masteredCards)));
      updateFlashcardCounter();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        card.classList.toggle('flipped');
        masteredCards.add(cardId);
        localStorage.setItem(STORAGE_KEYS.FLASHCARD_STATE, JSON.stringify(Array.from(masteredCards)));
        updateFlashcardCounter();
      }
    });
  });

  if (flipAllCardsBtn) {
    flipAllCardsBtn.addEventListener('click', () => {
      areAllCardsFlipped = !areAllCardsFlipped;
      flashcards.forEach(card => {
        if (areAllCardsFlipped) {
          card.classList.add('flipped');
        } else {
          card.classList.remove('flipped');
        }
      });
      flipAllCardsBtn.textContent = areAllCardsFlipped ? 'Unflip All Cards' : 'Flip All Cards';
    });
  }

  if (resetFlashcardsBtn) {
    resetFlashcardsBtn.addEventListener('click', () => {
      masteredCards.clear();
      localStorage.removeItem(STORAGE_KEYS.FLASHCARD_STATE);
      flashcards.forEach(card => card.classList.remove('flipped'));
      areAllCardsFlipped = false;
      if (flipAllCardsBtn) flipAllCardsBtn.textContent = 'Flip All Cards';
      updateFlashcardCounter();
    });
  }

  updateFlashcardCounter();

  /* ==========================================================================
     13. MDCAT MINI QUIZ (15 ORIGINAL CONCEPTUAL MCQS)
     ========================================================================== */
  const QUIZ_DATA = [
    {
      id: 1,
      system: 'Circulatory',
      question: 'Which chamber of the human heart possesses the thickest myocardium and why?',
      options: [
        'Right Atrium; to receive venous return from superior vena cava',
        'Right Ventricle; to pump blood against pulmonary capillary resistance',
        'Left Atrium; to collect oxygenated blood from all pulmonary veins',
        'Left Ventricle; to generate sufficient hydrostatic pressure for systemic circulation'
      ],
      correct: 3,
      explanation: 'The Left Ventricle has the thickest muscular wall (~3x thicker than right ventricle) because it must generate high systolic arterial pressure (~120 mmHg) to pump oxygenated blood through the aorta to the entire systemic body.'
    },
    {
      id: 2,
      system: 'Nervous',
      question: 'What is the correct sequential pathway of a basic spinal reflex arc?',
      options: [
        'Effector ➔ Motor Neuron ➔ Relay Neuron ➔ Sensory Neuron ➔ Receptor',
        'Receptor ➔ Sensory Neuron ➔ Relay Neuron (Interneuron) ➔ Motor Neuron ➔ Effector',
        'Receptor ➔ Motor Neuron ➔ Spinal Cord ➔ Sensory Neuron ➔ Effector',
        'Receptor ➔ Relay Neuron ➔ Sensory Neuron ➔ Brain ➔ Effector'
      ],
      correct: 1,
      explanation: 'In a spinal reflex arc, the sensory receptor detects a stimulus, sends an afferent signal via the sensory neuron through the dorsal root into the spinal cord interneuron (relay), which synapses onto an efferent motor neuron exiting via the ventral root to stimulate the effector muscle/gland.'
    },
    {
      id: 3,
      system: 'Urinary',
      question: 'In which segment of the nephron does maximum selective reabsorption of glucose and amino acids take place?',
      options: [
        'Glomerulus',
        'Proximal Convoluted Tubule (PCT)',
        'Descending Loop of Henle',
        'Collecting Duct'
      ],
      correct: 1,
      explanation: 'The Proximal Convoluted Tubule (PCT) possesses a dense microvillar brush border and rich mitochondria, executing obligatory reabsorption of 100% of filtered glucose, 100% of amino acids, and ~65–70% of electrolytes and water.'
    },
    {
      id: 4,
      system: 'Respiratory',
      question: 'During normal quiet inspiration in humans, which physical changes occur?',
      options: [
        'Diaphragm relaxes (domes upward), thoracic volume decreases, intra-alveolar pressure rises',
        'Diaphragm contracts (moves downward), thoracic volume increases, intra-alveolar pressure drops below atmospheric',
        'Internal intercostal muscles contract, ribs move downward and inward',
        'Abdominal muscles forcefully contract, increasing intrathoracic pressure'
      ],
      correct: 1,
      explanation: 'Inspiration is an active process: contraction and flattening of the diaphragm combined with external intercostal contraction expands thoracic volume, causing alveolar pressure to drop (-1 to -3 mmHg below 760 mmHg), drawing air into the lungs.'
    },
    {
      id: 5,
      system: 'Endocrine',
      question: 'Which hormone is secreted by beta (β) cells of the Islets of Langerhans to promote glycogenesis and lower blood glucose?',
      options: [
        'Glucagon',
        'Somatostatin',
        'Insulin',
        'Cortisol'
      ],
      correct: 2,
      explanation: 'Insulin is the primary hypoglycemic hormone secreted by pancreatic beta cells in response to elevated blood glucose. It enhances glucose transport into cells and stimulates glycogenesis in the liver and skeletal muscles.'
    },
    {
      id: 6,
      system: 'Digestive',
      question: 'Which protein-digesting enzyme is active exclusively in the highly acidic environment (pH 1.5–2.0) of the stomach?',
      options: [
        'Trypsin',
        'Pepsin',
        'Pancreatic Lipase',
        'Salivary Amylase'
      ],
      correct: 1,
      explanation: 'Gastric chief cells secrete inactive Pepsinogen, which is converted by hydrochloric acid (HCl) into active Pepsin. Pepsin operates optimally at pH 1.5–2.0 to hydrolyze dietary proteins into peptones and proteoses.'
    },
    {
      id: 7,
      system: 'Musculoskeletal',
      question: 'Which characteristic uniquely distinguishes Cardiac Muscle tissue from Skeletal and Smooth muscle?',
      options: [
        'Absence of striations and single central nucleus',
        'Voluntary somatic motor control and multiple peripheral nuclei',
        'Presence of branched fibers connected by Intercalated Discs with gap junctions',
        'Lack of actin and myosin myofilaments'
      ],
      correct: 2,
      explanation: 'Cardiac muscle cells are striated, branched, and uniquely linked by intercalated discs containing desmosomes and gap junctions that allow action potentials to spread rapidly, enabling the myocardium to contract as a functional syncytium.'
    },
    {
      id: 8,
      system: 'Immune',
      question: 'Which cells of the adaptive immune system differentiate into antibody-secreting plasma cells upon antigenic stimulation?',
      options: [
        'Cytotoxic T-Lymphocytes (CD8+)',
        'B-Lymphocytes (B-Cells)',
        'Natural Killer (NK) Cells',
        'Neutrophils'
      ],
      correct: 1,
      explanation: 'B-lymphocytes mediate humoral adaptive immunity. Upon binding their specific antigen and receiving Helper T-cell cytokine stimulation, they proliferate and differentiate into Plasma cells (secreting thousands of antibodies per second) and Memory B cells.'
    },
    {
      id: 9,
      system: 'Endocrine',
      question: 'A deficiency of Antidiuretic Hormone (ADH / Vasopressin) results in which pathological condition?',
      options: [
        'Diabetes Mellitus characterized by glucosuria',
        'Diabetes Insipidus characterized by excessive excretion of dilute urine (polyuria)',
        'Addison’s disease characterized by hyperkalemia',
        'Cushing’s syndrome characterized by moon face'
      ],
      correct: 1,
      explanation: 'ADH promotes water reabsorption in the collecting ducts. Hyposecretion or receptor insensitivity results in Diabetes Insipidus, leading to the excretion of copious volumes (up to 15–20 L/day) of very dilute urine and intense thirst (polydipsia).'
    },
    {
      id: 10,
      system: 'Circulatory',
      question: 'Which formed elements of human blood are non-nucleated cytoplasmic fragments derived from bone marrow megakaryocytes?',
      options: [
        'Erythrocytes (RBCs)',
        'Platelets (Thrombocytes)',
        'Neutrophils',
        'Monocytes'
      ],
      correct: 1,
      explanation: 'Platelets (Thrombocytes) are non-nucleated, disc-shaped fragments pinched off from megakaryocytes in the red bone marrow, playing a vital role in hemostasis, platelet plug formation, and blood coagulation.'
    },
    {
      id: 11,
      system: 'Digestive',
      question: 'What is the primary physiological function of the finger-like villi and microvilli in the small intestine?',
      options: [
        'To secrete concentrated hydrochloric acid for digestion',
        'To dramatically expand mucosal surface area for optimal nutrient absorption',
        'To store bile produced by hepatocytes',
        'To prevent bacterial colonization through peristaltic churning'
      ],
      correct: 1,
      explanation: 'Villi and microvillar brush borders expand the luminal absorptive surface area of the human small intestine by over 600-fold (~250–300 m²), ensuring rapid, efficient absorption of monosaccharides, amino acids, vitamins, and lipids.'
    },
    {
      id: 12,
      system: 'Nervous',
      question: 'Saltatory conduction of nerve impulses is made possible by which structural feature of axons?',
      options: [
        'Continuous unmyelinated lipid bilayer',
        'Nodes of Ranvier along the Myelin Sheath',
        'High density of dendritic spines',
        'Presence of Nissl granules in the axon terminals'
      ],
      correct: 1,
      explanation: 'In myelinated axons, the myelin sheath acts as an electrical insulator. Voltage-gated Na⁺ channels are clustered at the uninsulated Nodes of Ranvier, allowing the action potential to jump rapidly from node to node (saltatory conduction).'
    },
    {
      id: 13,
      system: 'Immune',
      question: 'Which of the following belongs to the first line of innate, non-specific host defense?',
      options: [
        'Plasma cells secreting Immunoglobulin G (IgG)',
        'Intact keratinized skin and acidic sebum (pH 3–5)',
        'Cytotoxic T-lymphocyte perforin release',
        'Activated Memory B-lymphocytes'
      ],
      correct: 1,
      explanation: 'The first line of defense consists of external physical and chemical barriers including intact keratinized epithelial skin, acidic sebum, mucous secretions, tracheal cilia, and gastric hydrochloric acid.'
    },
    {
      id: 14,
      system: 'Musculoskeletal',
      question: 'When a person flexes their elbow joint to lift a weight, which antagonistic muscle action occurs?',
      options: [
        'Biceps brachii contracts (Flexor) while Triceps brachii relaxes',
        'Triceps brachii contracts (Extensor) while Biceps brachii relaxes',
        'Both Biceps and Triceps contract simultaneously in tetanus',
        'Skeletal muscle converts into involuntary smooth muscle'
      ],
      correct: 0,
      explanation: 'Muscles work in antagonistic pairs because they can only pull (contract) and cannot push. During elbow flexion, the Biceps brachii acts as the agonist (flexor) by contracting, while the Triceps brachii acts as the antagonist by relaxing.'
    },
    {
      id: 15,
      system: 'Urinary',
      question: 'What happens to the glomerular filtrate as it descends through the descending limb of the Loop of Henle?',
      options: [
        'Sodium ions are actively pumped out, making the tubular fluid hypotonic',
        'Water leaves the tubule by osmosis into the hypertonic medulla, making the fluid progressively hypertonic',
        'Urea is actively absorbed into the peritubular capillaries',
        'Glucose is selectively filtered through the slit pores'
      ],
      correct: 1,
      explanation: 'The thin descending limb of the Loop of Henle is permeable to water but impermeable to solutes (NaCl). As filtrate descends into the hypertonic renal medulla, water is drawn out by osmosis, concentrating the tubular fluid up to ~1200 mOsm/L at the hairpin bend.'
    }
  ];

  const quizQuestionsContainer = document.getElementById('quizQuestionsContainer');
  const quizAnsweredCount = document.getElementById('quizAnsweredCount');
  const quizLiveScore = document.getElementById('quizLiveScore');
  const resetQuizBtn = document.getElementById('resetQuizBtn');
  const retryQuizBtn = document.getElementById('retryQuizBtn');

  const quizResultCard = document.getElementById('quizResultCard');
  const resultFeedbackText = document.getElementById('resultFeedbackText');
  const resScoreVal = document.getElementById('resScoreVal');
  const resPercentageVal = document.getElementById('resPercentageVal');
  const resCorrectVal = document.getElementById('resCorrectVal');
  const resWrongVal = document.getElementById('resWrongVal');

  let userAnswers = {}; // { questionId: selectedOptionIndex }

  function renderQuiz() {
    if (!quizQuestionsContainer) return;

    quizQuestionsContainer.innerHTML = QUIZ_DATA.map((q, qIndex) => {
      const answered = userAnswers[q.id] !== undefined;
      const selectedOption = userAnswers[q.id];

      return `
        <div class="mcq-card" id="mcqCard${q.id}">
          <div class="mcq-header">
            <h4 class="mcq-question-text">${qIndex + 1}. ${escapeHTML(q.question)}</h4>
            <span class="mcq-system-tag">🫀 ${q.system}</span>
          </div>

          <div class="mcq-options-grid">
            ${q.options.map((opt, optIndex) => {
              const prefix = ['A', 'B', 'C', 'D'][optIndex];
              let btnClass = 'mcq-option-btn';

              if (answered) {
                if (optIndex === q.correct) {
                  btnClass += ' correct-choice';
                } else if (optIndex === selectedOption) {
                  btnClass += ' wrong-choice';
                }
              }

              return `
                <button type="button" 
                  class="${btnClass}" 
                  data-qid="${q.id}" 
                  data-opt="${optIndex}"
                  ${answered ? 'disabled' : ''}>
                  <span class="option-prefix">${prefix}</span>
                  <span>${escapeHTML(opt)}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${answered ? `
            <div class="mcq-explanation">
              <strong>${selectedOption === q.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> ${escapeHTML(q.explanation)}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach Option Click Listeners
    quizQuestionsContainer.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = parseInt(btn.getAttribute('data-qid'), 10);
        const opt = parseInt(btn.getAttribute('data-opt'), 10);

        if (userAnswers[qid] === undefined) {
          userAnswers[qid] = opt;
          renderQuiz();
          updateQuizStats();
        }
      });
    });
  }

  function updateQuizStats() {
    const answeredKeys = Object.keys(userAnswers);
    const totalAnswered = answeredKeys.length;
    let score = 0;

    QUIZ_DATA.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        score++;
      }
    });

    if (quizAnsweredCount) quizAnsweredCount.textContent = totalAnswered;
    if (quizLiveScore) quizLiveScore.textContent = `${score} / 15`;

    // Show Result Card when all 15 answered
    if (totalAnswered === QUIZ_DATA.length && quizResultCard) {
      const percentage = Math.round((score / QUIZ_DATA.length) * 100);
      const wrong = QUIZ_DATA.length - score;

      if (resScoreVal) resScoreVal.textContent = `${score} / ${QUIZ_DATA.length}`;
      if (resPercentageVal) resPercentageVal.textContent = `${percentage}%`;
      if (resCorrectVal) resCorrectVal.textContent = score;
      if (resWrongVal) resWrongVal.textContent = wrong;

      if (resultFeedbackText) {
        if (percentage >= 90) {
          resultFeedbackText.textContent = '🩺 Outstanding! Mastered MDCAT Human Physiology with entrance-exam readiness!';
        } else if (percentage >= 70) {
          resultFeedbackText.textContent = '🩺 Great performance! Strong conceptual clarity across organ systems.';
        } else {
          resultFeedbackText.textContent = '🩺 Good practice attempt! Recommend reviewing the High-Yield facts and revision tables.';
        }
      }

      quizResultCard.classList.remove('hidden');
      quizResultCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function resetQuiz() {
    userAnswers = {};
    if (quizResultCard) quizResultCard.classList.add('hidden');
    renderQuiz();
    updateQuizStats();
  }

  if (resetQuizBtn) resetQuizBtn.addEventListener('click', resetQuiz);
  if (retryQuizBtn) retryQuizBtn.addEventListener('click', resetQuiz);

  renderQuiz();
  updateQuizStats();

  /* ==========================================================================
     14. UTILITY HELPER FUNCTIONS
     ========================================================================== */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

});
