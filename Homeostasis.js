/**
 * HOMEOSTASIS — MDCAT BIOLOGY MASTER JAVASCRIPT
 * Interactive learning engine with real-time simulations, flashcards, and practice quiz
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initStickyNav();
  initSearch();
  initEquilibriumScale();
  initControlFlow();
  initThermoregulationSim();
  initOsmoregulationSim();
  initNephronExplorer();
  initGlucoseSim();
  initHighYieldFacts();
  initFlashcards();
  initQuiz();
  initBookmarks();
  initChapterCompletion();
  initBackToTop();
});

/* ==========================================================================
   1. SCROLL PROGRESS & READING TIME
   ========================================================================== */
function initScrollProgress() {
  const globalIndicator = document.getElementById('globalScrollIndicator');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const readingTimeEl = document.getElementById('readingTime');

  // Estimate reading time from text content
  const fullText = document.getElementById('mainContent')?.innerText || '';
  const wordCount = fullText.trim().split(/\s+/).length;
  const estimatedMinutes = Math.max(5, Math.ceil(wordCount / 220));
  if (readingTimeEl) {
    readingTimeEl.textContent = `${estimatedMinutes} min read`;
  }

  function updateProgress() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / scrollHeight) * 100))) : 0;

    if (globalIndicator) globalIndicator.style.width = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `${progress}% Complete`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ==========================================================================
   2. STICKY CHAPTER NAVIGATION & ACTIVE STATE
   ========================================================================== */
function initStickyNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section, .hero-section');
  const navContainer = document.querySelector('.nav-container');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 140;

    let currentSectionId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.id;
      }
    });

    if (!currentSectionId && window.scrollY < 300) {
      currentSectionId = 'sec-overview';
    }

    navLinks.forEach(link => {
      const secTarget = link.getAttribute('data-sec');
      if (secTarget === currentSectionId) {
        link.classList.add('active');
        // Auto scroll horizontal pill nav to keep active item in view
        if (navContainer) {
          const linkLeft = link.offsetLeft;
          const linkWidth = link.offsetWidth;
          const containerWidth = navContainer.offsetWidth;
          const currentScroll = navContainer.scrollLeft;

          if (linkLeft < currentScroll || linkLeft + linkWidth > currentScroll + containerWidth) {
            navContainer.scrollTo({
              left: linkLeft - containerWidth / 2 + linkWidth / 2,
              behavior: 'smooth'
            });
          }
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  // Smooth scroll handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 100;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   3. LIVE SEARCH SYSTEM
   ========================================================================== */
function initSearch() {
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchStatus = document.getElementById('searchStatus');
  const mainContent = document.getElementById('mainContent');

  if (!searchToggleBtn || !searchOverlay || !searchInput) return;

  searchToggleBtn.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
      searchInput.focus();
    }
  });

  // Keyboard shortcut Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchOverlay.classList.add('active');
      searchInput.focus();
    }
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      clearSearch();
    }
  });

  function clearSearch() {
    searchInput.value = '';
    searchStatus.textContent = '';
    removeHighlights();
  }

  clearSearchBtn?.addEventListener('click', clearSearch);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length < 2) {
      searchStatus.textContent = '';
      removeHighlights();
      return;
    }
    performSearch(query);
  });

  function removeHighlights() {
    const marks = mainContent.querySelectorAll('.search-highlight');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  function performSearch(query) {
    removeHighlights();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    let matchCount = 0;
    let firstMatch = null;

    // Search in text nodes inside sections
    const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (['script', 'style', 'button', 'input'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (regex.test(node.nodeValue)) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      }
    });

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, '<mark class="search-highlight">$1</mark>');
      const createdMarks = span.querySelectorAll('.search-highlight');
      matchCount += createdMarks.length;
      if (!firstMatch && createdMarks.length > 0) {
        firstMatch = createdMarks[0];
      }
      node.parentNode?.replaceChild(span, node);
    });

    searchStatus.textContent = `${matchCount} match${matchCount === 1 ? '' : 'es'} found`;

    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/* ==========================================================================
   4. DYNAMIC EQUILIBRIUM BALANCER (HERO)
   ========================================================================== */
function initEquilibriumScale() {
  const beam = document.getElementById('scaleBeam');
  const leftVal = document.getElementById('panLeftVal');
  const rightVal = document.getElementById('panRightVal');
  const statusText = document.getElementById('scaleStatusText');

  const coldBtn = document.getElementById('disturbColdBtn');
  const sugarBtn = document.getElementById('disturbSugarBtn');
  const dehyBtn = document.getElementById('disturbDehydrateBtn');
  const restoreBtn = document.getElementById('restoreScaleBtn');

  if (!beam) return;

  function applyDisturbance(angle, disturbanceName, leftText, rightText, statusMsg) {
    beam.style.transform = `rotate(${angle}deg)`;
    if (leftVal) leftVal.textContent = leftText;
    if (rightVal) rightVal.textContent = rightText;
    if (statusText) statusText.textContent = `Disturbance: ${disturbanceName} — ${statusMsg}`;
  }

  coldBtn?.addEventListener('click', () => {
    applyDisturbance(-14, 'Cold Shock', 'Core Temp: 34.8°C (Hypothermia)', 'Counter: 0', 'Vasoconstriction & Shivering needed!');
  });

  sugarBtn?.addEventListener('click', () => {
    applyDisturbance(14, 'Sugar Spike', 'Blood Glucose: 165 mg/dL', 'Counter: 0', 'Pancreatic Insulin release required!');
  });

  dehyBtn?.addEventListener('click', () => {
    applyDisturbance(-12, 'Severe Dehydration', 'Osmolarity: 320 mOsm/L', 'Counter: 0', 'Hypothalamic ADH activation needed!');
  });

  restoreBtn?.addEventListener('click', () => {
    beam.style.transform = 'rotate(0deg)';
    if (leftVal) leftVal.textContent = 'Normal Baseline';
    if (rightVal) rightVal.textContent = 'Feedback Active';
    if (statusText) statusText.textContent = 'System Status: Balanced at Normal Set Point (37°C / 90 mg/dL / pH 7.40)';
    showToast('Dynamic Equilibrium Restored via Negative Feedback!');
  });
}

/* ==========================================================================
   5. UNIVERSAL HOMEOSTATIC CONTROL FLOW (SECTION 2)
   ========================================================================== */
function initControlFlow() {
  const nodes = document.querySelectorAll('.flow-node');
  const tag = document.getElementById('flowDetailTag');
  const title = document.getElementById('flowDetailTitle');
  const desc = document.getElementById('flowDetailDescription');
  const list = document.getElementById('flowDetailExamplesList');

  const flowData = {
    'stimulus': {
      tag: 'Step 1: Stimulus',
      title: 'Stimulus (The Environmental Disturbance)',
      desc: 'A physical or chemical change in the internal or external environment that causes a parameter to deviate from its optimal set point (e.g., thermal fluctuations, osmotic shifts, or glucose load).',
      examples: [
        'Rise in body temperature above 37°C during heavy physical exertion.',
        'Drop in blood glucose below 70 mg/dL after prolonged fasting.',
        'High blood osmolarity from salt consumption or dehydration.'
      ]
    },
    'receptor': {
      tag: 'Step 2: Receptor / Sensor',
      title: 'Receptor (The Sensory Transducer)',
      desc: 'Specialized sensory structures or cellular receptors that monitor the regulated variable, detect the magnitude of deviation, and generate afferent signals (neural impulses or hormone signals).',
      examples: [
        'Central thermoreceptors in the Preoptic Anterior Hypothalamus.',
        'Osmoreceptors in the supraoptic and paraventricular nuclei of the Hypothalamus.',
        'Glucose-sensing ATP-sensitive K+ channels in pancreatic Beta cells.',
        'Carotid sinus and aortic arch Baroreceptors detecting blood pressure.'
      ]
    },
    'control-center': {
      tag: 'Step 3: Control Center / Integrator',
      title: 'Control Center (The Set-Point Integrator)',
      desc: 'The master physiological processor (usually in the central nervous system or endocrine gland) that compares incoming afferent sensory input against the genetically programmed set point, computes the error, and outputs efferent instructions.',
      examples: [
        'Hypothalamus (acts as the master thermostat & osmoregulation hub).',
        'Endocrine Pancreas Islets (acts directly as both sensor & control center).',
        'Medullary Respiratory Center (regulates breathing rate to manage pCO2 and pH).'
      ]
    },
    'effector': {
      tag: 'Step 4: Effector',
      title: 'Effector (The Responding Organ / Tissue)',
      desc: 'The target muscle, gland, or organ that receives efferent motor signals or circulating hormones from the control center and executes physiological modifications to counteract the perturbation.',
      examples: [
        'Eccrine sweat glands & cutaneous blood vessels (heat dissipation).',
        'Skeletal muscles (involuntary shivering for heat generation).',
        'Hepatocytes & Adipocytes (glycogen storage or breakdown).',
        'Kidney collecting ducts & DCT (water and ion reabsorption).'
      ]
    },
    'response': {
      tag: 'Step 5: Response',
      title: 'Response (Equilibrium Restoration)',
      desc: 'The final biological effect produced by the effectors. In negative feedback systems, the response directly opposes and diminishes the original disturbance, restoring stability and shutting off the initial stimulus.',
      examples: [
        'Core temperature falls back to 37.0°C.',
        'Blood glucose normalizes to 90 mg/dL.',
        'Plasma osmolarity returns to 300 mOsm/L.',
        'Homeostatic balance is preserved.'
      ]
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const flowKey = node.getAttribute('data-flow');
      const data = flowData[flowKey];
      if (data && tag && title && desc && list) {
        tag.textContent = data.tag;
        title.textContent = data.title;
        desc.textContent = data.desc;
        list.innerHTML = data.examples.map(ex => `<li>${ex}</li>`).join('');
      }
    });
  });
}

/* ==========================================================================
   6. THERMOREGULATION SIMULATOR (SECTION 5)
   ========================================================================== */
function initThermoregulationSim() {
  const hotBtn = document.getElementById('simHotBtn');
  const coldBtn = document.getElementById('simColdBtn');
  const tempIndicator = document.getElementById('tempIndicator');
  const tempDisplayVal = document.getElementById('tempDisplayVal');
  const tempDisplayLabel = document.getElementById('tempDisplayLabel');
  const sweatDrops = document.getElementById('sweatDrops');
  const capillaryLoop = document.getElementById('capillaryLoop');
  const capillaryLabel = document.getElementById('capillaryLabel');
  const hairFollicles = document.querySelectorAll('.hair');
  const simPathwayTitle = document.getElementById('simPathwayTitle');
  const simPathwayList = document.getElementById('simPathwayList');

  if (!hotBtn || !coldBtn) return;

  hotBtn.addEventListener('click', () => {
    hotBtn.classList.add('active');
    coldBtn.classList.remove('active');

    if (tempIndicator) tempIndicator.style.transform = 'rotate(45deg)';
    if (tempDisplayVal) tempDisplayVal.textContent = '39.0°C';
    if (tempDisplayLabel) tempDisplayLabel.textContent = 'Heat Stress (Too Hot)';

    if (sweatDrops) sweatDrops.style.display = 'flex';
    if (capillaryLoop) {
      capillaryLoop.className = 'capillaryLoop dilated';
      capillaryLoop.classList.remove('constricted');
      capillaryLoop.classList.add('dilated');
    }
    if (capillaryLabel) capillaryLabel.textContent = 'Vasodilation (Dermal arterioles widen ➔ High blood flow & heat loss)';
    hairFollicles.forEach(h => {
      h.classList.remove('erect');
      h.classList.add('flat');
    });

    if (simPathwayTitle) simPathwayTitle.textContent = '🔥 Heat Loss Pathway (Hyperthermia Response)';
    if (simPathwayList) {
      simPathwayList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Stimulus:</strong> Core body temperature rises above 37.5°C.</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Detection:</strong> Central thermoreceptors in Preoptic / Anterior Hypothalamus detect blood temp increase.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>Vasodilation:</strong> Precapillary sphincters relax; dermal arterioles dilate, directing blood flow to skin surface for heat loss via radiation and convection.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Sweating:</strong> Sympathetic cholinergic stimulation activates eccrine sweat glands. Evaporative cooling dissipates latent heat of vaporization.</div></div>
        <div class="path-step active"><span class="p-num">5</span><div class="p-text"><strong>Metabolic Shift:</strong> Reduction in thyroid hormones & epinephrine lowers basal metabolic heat production.</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Result:</strong> Core temperature returns to 37°C set point.</div></div>
      `;
    }
  });

  coldBtn.addEventListener('click', () => {
    coldBtn.classList.add('active');
    hotBtn.classList.remove('active');

    if (tempIndicator) tempIndicator.style.transform = 'rotate(-60deg)';
    if (tempDisplayVal) tempDisplayVal.textContent = '35.0°C';
    if (tempDisplayLabel) tempDisplayLabel.textContent = 'Cold Stress (Too Cold)';

    if (sweatDrops) sweatDrops.style.display = 'none';
    if (capillaryLoop) {
      capillaryLoop.className = 'capillaryLoop constricted';
      capillaryLoop.classList.remove('dilated');
      capillaryLoop.classList.add('constricted');
    }
    if (capillaryLabel) capillaryLabel.textContent = 'Vasoconstriction (Arterioles narrow ➔ Blood kept in deep core)';
    hairFollicles.forEach(h => {
      h.classList.remove('flat');
      h.classList.add('erect');
    });

    if (simPathwayTitle) simPathwayTitle.textContent = '❄️ Heat Conservation & Generation Pathway (Hypothermia Response)';
    if (simPathwayList) {
      simPathwayList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Stimulus:</strong> Core body temperature falls below 36.5°C.</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Detection:</strong> Posterior Hypothalamus heat-gain center detects cold blood.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>Vasoconstriction:</strong> Cutaneous arterioles constrict; blood diverted from surface to warm vital organs.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Shivering:</strong> Involuntary somatic motor nerve oscillations produce rapid skeletal muscle twitches (ATP hydrolysis generates heat).</div></div>
        <div class="path-step active"><span class="p-num">5</span><div class="p-text"><strong>Thermogenesis:</strong> Increased thyroxine (TSH ➔ T3/T4) and adrenaline elevate cellular metabolic rate; brown fat uncoupling (thermogenin).</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Result:</strong> Core temperature rises back to 37°C set point.</div></div>
      `;
    }
  });
}

/* ==========================================================================
   7. OSMOREGULATION & ADH SIMULATOR (SECTION 6)
   ========================================================================== */
function initOsmoregulationSim() {
  const lowWaterBtn = document.getElementById('adhLowWaterBtn');
  const highWaterBtn = document.getElementById('adhHighWaterBtn');
  const adhLevelFill = document.getElementById('adhLevelFill');
  const adhLevelText = document.getElementById('adhLevelText');
  const beakerFluid = document.getElementById('beakerFluid');
  const beakerVal = document.getElementById('beakerVal');
  const beakerOsm = document.getElementById('beakerOsm');
  const beakerColor = document.getElementById('beakerColor');
  const adhPathwayTitle = document.getElementById('adhPathwayTitle');
  const adhPathwayList = document.getElementById('adhPathwayList');

  if (!lowWaterBtn || !highWaterBtn) return;

  lowWaterBtn.addEventListener('click', () => {
    lowWaterBtn.classList.add('active');
    highWaterBtn.classList.remove('active');

    if (adhLevelFill) adhLevelFill.style.width = '90%';
    if (adhLevelText) adhLevelText.textContent = 'HIGH ADH (Vasopressin Active)';
    if (beakerFluid) {
      beakerFluid.className = 'beaker-fluid conc';
      beakerFluid.style.height = '35%';
    }
    if (beakerVal) beakerVal.textContent = '0.5 L/day';
    if (beakerOsm) beakerOsm.textContent = '1,200 mOsm/L (Hypertonic)';
    if (beakerColor) beakerColor.textContent = 'Dark Amber / Concentrated';

    if (adhPathwayTitle) adhPathwayTitle.textContent = '🏜️ Dehydration Response (High ADH Pathway)';
    if (adhPathwayList) {
      adhPathwayList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Osmotic Stimulus:</strong> Body loses water or gains salt ➔ Blood plasma osmolarity rises above 300 mOsm/L.</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Osmoreceptors:</strong> Hypothalamic osmoreceptors lose water by osmosis, shrink, and fire action potentials.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>ADH Secretion:</strong> Supraoptic nuclei trigger <strong>Posterior Pituitary</strong> to secrete large amounts of ADH.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Aquaporin-2 Insertion:</strong> ADH binds V₂ receptors on <strong>Collecting Ducts</strong> ➔ Aquaporin-2 channels translocate to apical membrane ➔ Massive water reabsorption.</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Homeostatic Result:</strong> Small volume of concentrated, hypertonic urine excreted; blood osmolarity restored.</div></div>
      `;
    }
  });

  highWaterBtn.addEventListener('click', () => {
    highWaterBtn.classList.add('active');
    lowWaterBtn.classList.remove('active');

    if (adhLevelFill) adhLevelFill.style.width = '12%';
    if (adhLevelText) adhLevelText.textContent = 'LOW / INHIBITED ADH';
    if (beakerFluid) {
      beakerFluid.className = 'beaker-fluid dilute';
      beakerFluid.style.height = '85%';
    }
    if (beakerVal) beakerVal.textContent = '2.5 L/day';
    if (beakerOsm) beakerOsm.textContent = '65 mOsm/L (Hypotonic)';
    if (beakerColor) beakerColor.textContent = 'Pale Straw / Dilute Watery';

    if (adhPathwayTitle) adhPathwayTitle.textContent = '🥤 High Water Intake Pathway (Low ADH Diuresis)';
    if (adhPathwayList) {
      adhPathwayList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Osmotic Stimulus:</strong> Excessive water intake ➔ Blood plasma osmolarity drops below 285 mOsm/L.</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Osmoreceptors:</strong> Hypothalamic osmoreceptors swell and reduce firing rate.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>ADH Suppression:</strong> Posterior pituitary secretion of ADH is markedly inhibited.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Impermeable Ducts:</strong> Collecting ducts remain impermeable to water (Aquaporin-2 internalized into endosomes).</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Homeostatic Result:</strong> Large volume of dilute, hypotonic urine excreted (diuresis); normal blood volume maintained.</div></div>
      `;
    }
  });
}

/* ==========================================================================
   8. NEPHRON FUNCTIONAL EXPLORER (SECTION 8)
   ========================================================================== */
function initNephronExplorer() {
  const chips = document.querySelectorAll('.chip-btn');
  const tag = document.getElementById('nephronTag');
  const title = document.getElementById('nephronTitle');
  const osm = document.getElementById('nephronOsm');
  const process = document.getElementById('nephronProcess');
  const desc = document.getElementById('nephronDesc');
  const reabsorb = document.getElementById('nephronReabsorb');
  const secret = document.getElementById('nephronSecret');

  const nephronData = {
    'glomerulus': {
      tag: 'Malpighian Corpuscle (Renal Cortex)',
      title: "Glomerulus & Bowman's Capsule (Ultrafiltration)",
      osm: '300 mOsm/L (Isotonic with plasma)',
      process: 'Non-selective Ultrafiltration (Net Filtration Pressure ~10 mmHg)',
      desc: 'High hydrostatic pressure (55 mmHg) in glomerular capillaries forces fluid through a 3-layer sieve (fenestrated endothelium, basement membrane, podocyte slit diaphragms). Cells and large proteins (albumin) are retained.',
      reabsorb: 'No tubular reabsorption occurs in the capsule itself.',
      secret: 'Ultrafiltrate formed: 125 mL/min (~180 L/day) containing water, glucose, amino acids, urea, ions.'
    },
    'pct': {
      tag: 'Proximal Convoluted Tubule (Renal Cortex)',
      title: 'PCT — Major Site of Obligatory Reabsorption',
      osm: '300 mOsm/L (Isotonic throughout due to proportional water movement)',
      process: 'Active Transport (Na+/Glucose cotransporters) & Obligatory Osmosis',
      desc: 'Contains dense microvilli brush border and abundant mitochondria. Responsible for reclaiming 65-70% of total filtered water and NaCl, 100% of glucose and amino acids via secondary active transport, and 85% of bicarbonate.',
      reabsorb: '100% Glucose, 100% Amino acids, 65% Na+, 65% Cl-, 65% Water, 85% HCO3-, K+, Ca2+.',
      secret: 'H+ ions, NH4+ (ammonium), creatinine, and organic acids/drugs (penicillin).'
    },
    'descending': {
      tag: 'Descending Limb of Loop of Henle (Renal Medulla)',
      title: 'Descending Loop — Water Permeable Segment',
      osm: 'Concentrates progressively from 300 ➔ 1,200 mOsm/L at the hairpin loop apex',
      process: 'Passive Osmotic Water Extraction (Aquaporin-1 channels)',
      desc: 'Highly permeable to water via constitutive Aquaporin-1 channels, but virtually impermeable to NaCl and urea. As the tubular fluid dives into the hypertonic renal medulla, water is pulled out into the interstitium by osmosis.',
      reabsorb: 'Significant volume of water reabsorbed into medullary vasa recta capillaries.',
      secret: 'No active solute secretion.'
    },
    'ascending': {
      tag: 'Ascending Limb of Loop of Henle (Renal Medulla ➔ Cortex)',
      title: 'Thick Ascending Loop — Diluting Segment & Multiplier',
      osm: 'Dilutes drastically from 1,200 ➔ 100-200 mOsm/L (Hypotonic exit)',
      process: 'Active Solute Pumping via NKCC2 Cotransporter (Impermeable to Water)',
      desc: 'Completely impermeable to water! The thick segment actively pumps Na+, K+, and 2Cl- ions out into the medullary interstitium. This creates the vertical hyperosmotic medullary gradient essential for the countercurrent multiplier mechanism.',
      reabsorb: 'Active transport of Na+, K+, 2Cl- (inhibited clinically by loop diuretics like furosemide).',
      secret: 'No water movement.'
    },
    'dct': {
      tag: 'Distal Convoluted Tubule (Renal Cortex)',
      title: 'DCT — Facultative Ion Regulation & Acid-Base Control',
      osm: '100 – 300 mOsm/L',
      process: 'Hormone-Regulated (Aldosterone & PTH) Transport & Active Secretion',
      desc: 'Under the control of Aldosterone (promotes Na+ reabsorption and K+/H+ excretion) and Parathyroid Hormone (PTH, stimulates Ca2+ reabsorption). Plays a central role in fine-tuning arterial blood pH.',
      reabsorb: 'Na+ (via Na+/Cl- cotransporter), Ca2+ (stimulated by PTH), HCO3-.',
      secret: 'Active secretion of K+ and H+ ions into the tubular lumen.'
    },
    'collecting': {
      tag: 'Collecting Duct (Cortex through Medulla to Papilla)',
      title: 'Collecting Duct — Final Osmoregulatory Water Reabsorption',
      osm: '50 mOsm/L (in absence of ADH) up to 1,200 mOsm/L (in presence of ADH)',
      process: 'ADH-Mediated Facultative Water Reabsorption & Urea Recycling',
      desc: 'Passes through the hypertonic renal medulla. When ADH is present, Aquaporin-2 channels open on the luminal membrane, allowing massive water reabsorption to produce concentrated urine. Inner medullary segment facilitates urea recycling.',
      reabsorb: 'Water (strictly controlled by ADH), Na+ (under aldosterone), Urea.',
      secret: 'H+ and K+ ions.'
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-nephron');
      const data = nephronData[key];
      if (data && tag && title && osm && process && desc && reabsorb && secret) {
        tag.textContent = data.tag;
        title.textContent = data.title;
        osm.textContent = data.osm;
        process.textContent = data.process;
        desc.textContent = data.desc;
        reabsorb.textContent = data.reabsorb;
        secret.textContent = data.secret;
      }
    });
  });
}

/* ==========================================================================
   9. BLOOD GLUCOSE SIMULATOR (SECTION 9)
   ========================================================================== */
function initGlucoseSim() {
  const highBtn = document.getElementById('glucoseHighBtn');
  const lowBtn = document.getElementById('glucoseLowBtn');
  const meterBar = document.getElementById('glucoseMeterBar');
  const valText = document.getElementById('glucoseValText');
  const betaCell = document.getElementById('betaCellCard');
  const alphaCell = document.getElementById('alphaCellCard');
  const pathTitle = document.getElementById('glucosePathwayTitle');
  const pathList = document.getElementById('glucosePathwayList');

  if (!highBtn || !lowBtn) return;

  highBtn.addEventListener('click', () => {
    highBtn.classList.add('active');
    lowBtn.classList.remove('active');

    if (meterBar) {
      meterBar.style.width = '85%';
      meterBar.style.backgroundColor = '#ef4444';
    }
    if (valText) valText.textContent = '160 mg/dL (Hyperglycemia)';

    if (betaCell) {
      betaCell.className = 'pancreas-cell active';
      betaCell.querySelector('.cell-info strong').textContent = 'Beta (β) Cells Active';
      betaCell.querySelector('.cell-info span').textContent = 'Secreting INSULIN';
    }
    if (alphaCell) {
      alphaCell.className = 'pancreas-cell inactive';
      alphaCell.querySelector('.cell-info strong').textContent = 'Alpha (α) Cells Inactive';
      alphaCell.querySelector('.cell-info span').textContent = 'Glucagon suppressed';
    }

    if (pathTitle) pathTitle.textContent = '🍰 Insulin Action Pathway (Hyperglycemia Response)';
    if (pathList) {
      pathList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Stimulus:</strong> Food intake elevates blood glucose (>110 mg/dL).</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Pancreatic Sensor:</strong> Beta (β) cells of Islets of Langerhans detect high glucose and release <strong>Insulin</strong>.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>Cellular Uptake:</strong> Insulin binds tyrosine kinase receptors ➔ Translocates <strong>GLUT4</strong> transporters to membranes of skeletal muscle and adipocytes.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Glycogenesis:</strong> Liver and muscle convert excess glucose into <strong>Glycogen</strong> for storage; inhibits gluconeogenesis.</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Result:</strong> Blood glucose falls back to normal physiological range (70–110 mg/dL).</div></div>
      `;
    }
  });

  lowBtn.addEventListener('click', () => {
    lowBtn.classList.add('active');
    highBtn.classList.remove('active');

    if (meterBar) {
      meterBar.style.width = '20%';
      meterBar.style.backgroundColor = '#3b82f6';
    }
    if (valText) valText.textContent = '55 mg/dL (Hypoglycemia / Fasting)';

    if (betaCell) {
      betaCell.className = 'pancreas-cell inactive';
      betaCell.querySelector('.cell-info strong').textContent = 'Beta (β) Cells Inactive';
      betaCell.querySelector('.cell-info span').textContent = 'Insulin suppressed';
    }
    if (alphaCell) {
      alphaCell.className = 'pancreas-cell active';
      alphaCell.querySelector('.cell-info strong').textContent = 'Alpha (α) Cells Active';
      alphaCell.querySelector('.cell-info span').textContent = 'Secreting GLUCAGON';
    }

    if (pathTitle) pathTitle.textContent = '🏃 Glucagon Action Pathway (Hypoglycemia Response)';
    if (pathList) {
      pathList.innerHTML = `
        <div class="path-step active"><span class="p-num">1</span><div class="p-text"><strong>Stimulus:</strong> Fasting or strenuous exercise lowers blood glucose (&lt;70 mg/dL).</div></div>
        <div class="path-step active"><span class="p-num">2</span><div class="p-text"><strong>Pancreatic Sensor:</strong> Alpha (α) cells of Islets of Langerhans secrete <strong>Glucagon</strong> into the portal vein.</div></div>
        <div class="path-step active"><span class="p-num">3</span><div class="p-text"><strong>Glycogenolysis:</strong> Glucagon stimulates hepatic glycogen phosphorylase to break down liver glycogen into glucose.</div></div>
        <div class="path-step active"><span class="p-num">4</span><div class="p-text"><strong>Gluconeogenesis:</strong> Liver synthesizes new glucose from non-carbohydrate precursors (amino acids, glycerol, lactate).</div></div>
        <div class="path-step active final"><span class="p-num">✓</span><div class="p-text"><strong>Result:</strong> Glucose is released into systemic circulation, raising blood glucose back to 70–110 mg/dL.</div></div>
      `;
    }
  });
}

/* ==========================================================================
   10. ⭐ MDCAT HIGH-YIELD FACTS DECK (SECTION 12)
   ========================================================================== */
function initHighYieldFacts() {
  const grid = document.getElementById('factsGrid');
  const filterPills = document.querySelectorAll('.filter-pill');
  if (!grid) return;

  const facts = [
    {
      cat: 'thermo',
      tag: 'Thermoregulation',
      formula: 'Hypothalamus ➔ <span>Thermostat Hub</span>',
      desc: 'Anterior preoptic hypothalamus triggers heat-loss (sweating & vasodilation); posterior hypothalamus triggers heat-gain (shivering & vasoconstriction).'
    },
    {
      cat: 'osmo',
      tag: 'Osmoregulation',
      formula: 'ADH (Vasopressin) ➔ <span>Increases H₂O Reabsorption</span>',
      desc: 'Synthesized by hypothalamus, released by posterior pituitary. Inserts Aquaporin-2 channels into Collecting Ducts, producing concentrated hypertonic urine.'
    },
    {
      cat: 'glucose',
      tag: 'Blood Glucose',
      formula: 'Insulin (Beta Cells) ➔ <span>Lowers Blood Sugar</span>',
      desc: 'Promotes GLUT4 translocation, glycogenesis in liver & muscle, and lipogenesis. Inhibits glycogenolysis & gluconeogenesis.'
    },
    {
      cat: 'glucose',
      tag: 'Blood Glucose',
      formula: 'Glucagon (Alpha Cells) ➔ <span>Raises Blood Sugar</span>',
      desc: 'Acts on hepatocytes via cAMP pathway to stimulate glycogenolysis and gluconeogenesis, elevating systemic glucose during fasting.'
    },
    {
      cat: 'osmo',
      tag: 'Kidney Anatomy',
      formula: 'Nephron ➔ <span>Functional Unit of Kidney</span>',
      desc: 'Each human kidney contains ~1 to 1.2 million nephrons consisting of renal corpuscle, PCT, Loop of Henle, DCT, and collecting system.'
    },
    {
      cat: 'feedback',
      tag: 'Control Systems',
      formula: 'Negative Feedback ➔ <span>Dynamic System Stability</span>',
      desc: 'Reverses the direction of disturbance to restore normal set point. Accounts for >99% of biological homeostatic loops.'
    },
    {
      cat: 'feedback',
      tag: 'Control Systems',
      formula: 'Positive Feedback ➔ <span>Amplification to Endpoint</span>',
      desc: 'Does NOT maintain homeostasis; reinforces stimulus to rapid completion (e.g., oxytocin in childbirth, platelet clotting cascade).'
    },
    {
      cat: 'osmo',
      tag: 'Excretion',
      formula: 'Excretion ≠ <span>Egestion (Defecation)</span>',
      desc: 'Excretion is removal of cellular metabolic wastes (urea, CO2, creatinine); egestion is discharge of undigested dietary food residues.'
    },
    {
      cat: 'thermo',
      tag: 'Vascular Control',
      formula: 'Vasodilation ➔ <span>Increases Heat Loss</span>',
      desc: 'Dermal arterioles widen, redirecting warm blood to skin surface for evaporative and radiative heat dissipation.'
    },
    {
      cat: 'thermo',
      tag: 'Vascular Control',
      formula: 'Vasoconstriction ➔ <span>Conserves Core Heat</span>',
      desc: 'Cutaneous vessels narrow under sympathetic stimulation, diverting blood from extremities into deep core organs.'
    },
    {
      cat: 'osmo',
      tag: 'Kidney Physiology',
      formula: 'PCT ➔ <span>100% Glucose Reabsorption</span>',
      desc: 'Reclaims 100% of filtered glucose and amino acids via secondary active Na+/glucose cotransporters (SGLT2/1) along with 65% of water.'
    },
    {
      cat: 'osmo',
      tag: 'Biochemistry',
      formula: 'Urea Synthesis ➔ <span>Ornithine Cycle in Liver</span>',
      desc: 'Highly toxic ammonia (NH3) from amino acid deamination is converted into less toxic, water-soluble urea in hepatocytes.'
    },
    {
      cat: 'feedback',
      tag: 'Acid-Base',
      formula: 'Blood Plasma pH ➔ <span>7.35 to 7.45 Set Point</span>',
      desc: 'Optimal 7.40. Regulated in 3 tiers: Chemical buffers (seconds), Respiratory ventilation of CO2 (minutes), and Renal H+/HCO3- excretion (days).'
    },
    {
      cat: 'osmo',
      tag: 'Hormonal Control',
      formula: 'Aldosterone ➔ <span>Na+ Reabsorption & K+ Secretion</span>',
      desc: 'Mineralocorticoid from adrenal cortex acting on DCT and cortical collecting ducts to maintain blood pressure and electrolyte balance.'
    },
    {
      cat: 'thermo',
      tag: 'Muscle Physiology',
      formula: 'Shivering ➔ <span>Metabolic Heat Generation</span>',
      desc: 'Involuntary, asynchronous skeletal muscle contractions hydrolyze ATP rapidly, converting ~80% of biochemical energy into body heat.'
    },
    {
      cat: 'osmo',
      tag: 'Medullary Gradient',
      formula: 'Juxtamedullary Nephrons ➔ <span>Countercurrent Multiplier</span>',
      desc: 'Long loops of Henle plunging deep into inner medulla create 1200 mOsm/L vertical gradient necessary for urine concentration.'
    }
  ];

  function renderFacts(category) {
    const filtered = category === 'all' ? facts : facts.filter(f => f.cat === category);
    grid.innerHTML = filtered.map(f => `
      <div class="fact-card">
        <div>
          <div class="fact-header">
            <span class="fact-tag">${f.tag}</span>
            <span class="fact-star">⭐</span>
          </div>
          <div class="fact-formula">${f.formula}</div>
          <p class="fact-desc">${f.desc}</p>
        </div>
      </div>
    `).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat') || 'all';
      renderFacts(cat);
    });
  });

  renderFacts('all');
}

/* ==========================================================================
   11. 🧠 INTERACTIVE FLASHCARDS (SECTION 13)
   ========================================================================== */
function initFlashcards() {
  const scene = document.getElementById('flashcardScene');
  const qText = document.getElementById('cardQuestionText');
  const aText = document.getElementById('cardAnswerText');
  const expText = document.getElementById('cardExplanationText');
  const catTag = document.getElementById('cardCategoryTag');
  const counter = document.getElementById('deckCounter');
  const masteredCountEl = document.getElementById('masteredCount');

  const prevBtn = document.getElementById('prevCardBtn');
  const nextBtn = document.getElementById('nextCardBtn');
  const flipBtn = document.getElementById('flipCardBtn');
  const masterBtn = document.getElementById('toggleMasterBtn');
  const shuffleBtn = document.getElementById('shuffleDeckBtn');

  if (!scene || !qText || !aText) return;

  const deck = [
    {
      q: 'What hormone increases water reabsorption in the collecting ducts of the kidney?',
      a: 'ADH (Antidiuretic Hormone / Vasopressin)',
      exp: 'Secreted by posterior pituitary in response to high blood osmolarity; inserts Aquaporin-2 water channels into collecting duct apical membranes.',
      cat: 'Osmoregulation'
    },
    {
      q: 'What is the structural and functional unit of the human kidney?',
      a: 'The Nephron',
      exp: 'Each kidney contains ~1 to 1.2 million nephrons consisting of renal corpuscle (glomerulus + Bowman’s capsule) and renal tubule system.',
      cat: 'Kidney Anatomy'
    },
    {
      q: 'Which pancreatic endocrine hormone lowers blood glucose levels?',
      a: 'Insulin (secreted by Beta cells)',
      exp: 'Promotes cellular glucose uptake via GLUT4 translocation and stimulates glycogenesis in liver and skeletal muscle.',
      cat: 'Blood Glucose'
    },
    {
      q: 'What part of the brain acts as the body’s master thermostat?',
      a: 'The Hypothalamus',
      exp: 'Anterior preoptic area coordinates heat-dissipation reflexes; posterior nucleus controls heat-conservation and shivering.',
      cat: 'Thermoregulation'
    },
    {
      q: 'In which segment of the nephron does 100% of glucose and amino acid reabsorption occur?',
      a: 'Proximal Convoluted Tubule (PCT)',
      exp: 'Reabsorbed completely via secondary active transport with Na+ (SGLT cotransporters) in healthy individuals.',
      cat: 'Kidney Physiology'
    },
    {
      q: 'Name the classic positive feedback hormone released during childbirth contractions.',
      a: 'Oxytocin',
      exp: 'Cervical stretch signals the posterior pituitary to secrete oxytocin, causing stronger myometrial contractions (Ferguson reflex).',
      cat: 'Feedback Mechanisms'
    },
    {
      q: 'What is the fundamental difference between Excretion and Egestion?',
      a: 'Excretion = Metabolic waste; Egestion = Undigested food residue',
      exp: 'Metabolic wastes (urea, CO2) are products of cellular chemical reactions; egested feces never enter or cross internal body fluids.',
      cat: 'Excretion'
    },
    {
      q: 'What is the normal physiological pH range of arterial human blood?',
      a: '7.35 – 7.45 (Optimal = 7.40)',
      exp: 'Maintained by chemical buffers (bicarbonate), pulmonary expiration of CO2, and renal H+/HCO3- exchange.',
      cat: 'Acid-Base Balance'
    },
    {
      q: 'In which organ is toxic ammonia converted into urea via the Ornithine Cycle?',
      a: 'The Liver (Hepatocytes)',
      exp: 'Ammonia from amino acid deamination is combined with CO2 in the mitochondrial and cytosolic steps of the urea cycle.',
      cat: 'Metabolic Pathways'
    },
    {
      q: 'What vascular response occurs in the skin when body temperature drops excessively?',
      a: 'Cutaneous Vasoconstriction',
      exp: 'Dermal arterioles narrow under sympathetic drive, reducing blood flow to skin and minimizing convective/radiative heat loss.',
      cat: 'Thermoregulation'
    },
    {
      q: 'Which endocrine hormone raises blood glucose by stimulating glycogenolysis in hepatocytes?',
      a: 'Glucagon (secreted by Alpha cells)',
      exp: 'Binds GPCR on liver cells to activate adenylyl cyclase, raising cAMP to trigger glycogen breakdown and gluconeogenesis.',
      cat: 'Blood Glucose'
    },
    {
      q: 'What is the primary extracellular chemical buffer system in the human body?',
      a: 'Carbonic Acid – Bicarbonate Buffer System',
      exp: 'CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3-. Controlled dynamically by respiratory CO2 ventilation and renal HCO3- retention.',
      cat: 'Blood Buffers'
    }
  ];

  let currentIndex = 0;
  let masteredSet = new Set(JSON.parse(localStorage.getItem('mdcat_mastered_flashcards') || '[]'));

  function updateCard() {
    scene.classList.remove('is-flipped');
    const card = deck[currentIndex];
    if (qText) qText.textContent = card.q;
    if (aText) aText.textContent = card.a;
    if (expText) expText.textContent = card.exp;
    if (catTag) catTag.textContent = card.cat;
    if (counter) counter.textContent = `Card ${currentIndex + 1} of ${deck.length}`;

    const isMastered = masteredSet.has(currentIndex);
    if (masterBtn) {
      if (isMastered) {
        masterBtn.classList.add('is-mastered');
        masterBtn.textContent = '★ Mastered';
      } else {
        masterBtn.classList.remove('is-mastered');
        masterBtn.textContent = '⭐ Mark as Mastered';
      }
    }
    if (masteredCountEl) masteredCountEl.textContent = masteredSet.size;
  }

  function flipCard() {
    scene.classList.toggle('is-flipped');
  }

  scene.addEventListener('click', flipCard);
  flipBtn?.addEventListener('click', flipCard);

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    updateCard();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % deck.length;
    updateCard();
  });

  masterBtn?.addEventListener('click', () => {
    if (masteredSet.has(currentIndex)) {
      masteredSet.delete(currentIndex);
    } else {
      masteredSet.add(currentIndex);
    }
    localStorage.setItem('mdcat_mastered_flashcards', JSON.stringify([...masteredSet]));
    updateCard();
  });

  shuffleBtn?.addEventListener('click', () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    currentIndex = 0;
    masteredSet.clear();
    localStorage.removeItem('mdcat_mastered_flashcards');
    updateCard();
    showToast('Deck Shuffled!');
  });

  // Spacebar flips card
  scene.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flipCard();
    }
  });

  updateCard();
}

/* ==========================================================================
   12. 📝 MDCAT MINI QUIZ SYSTEM (SECTION 14)
   ========================================================================== */
function initQuiz() {
  const quizData = [
    {
      topic: 'Topic: Feedback Mechanisms',
      question: 'Which of the following best describes the primary biological function of a negative feedback mechanism in homeostasis?',
      options: [
        'A. To accelerate a physiological change until an external threshold is reached',
        'B. To reverse and counteract a deviation, maintaining internal stability around a set point',
        'C. To stimulate hormone synthesis indefinitely without receiving inhibition signals',
        'D. To produce permanent, irreversible shifts in cellular enzymatic kinetics'
      ],
      correct: 1,
      explanation: 'Negative feedback operates by producing an effector response that opposes and reverses the initial stimulus, maintaining dynamic equilibrium around a physiological set point.'
    },
    {
      topic: 'Topic: Thermoregulation',
      question: 'When core body temperature rises above 37.5°C, the anterior hypothalamus coordinates which of the following responses?',
      options: [
        'A. Cutaneous vasoconstriction and activation of arrector pili muscles',
        'B. Cutaneous vasodilation and stimulation of eccrine sweat glands',
        'C. Increased secretion of thyroxine and adrenaline to accelerate metabolic rate',
        'D. Involuntary asynchronous twitches of skeletal muscle fibers (shivering)'
      ],
      correct: 1,
      explanation: 'Hyperthermia triggers the heat-loss center in the preoptic/anterior hypothalamus to cause cutaneous vasodilation (maximizing heat radiation) and sweat secretion (evaporative cooling).'
    },
    {
      topic: 'Topic: Osmoregulation & ADH',
      question: 'A student drinks 2 liters of pure water in a short time. What physiological sequence will immediately occur?',
      options: [
        'A. Blood osmolarity increases ➔ ADH secretion increases ➔ Concentrated urine',
        'B. Blood osmolarity decreases ➔ ADH secretion is inhibited ➔ Large volume of dilute urine',
        'C. Hypothalamic osmoreceptors shrink ➔ Aquaporin-2 insertion increases',
        'D. Aldosterone secretion increases ➔ Na+ excretion is accelerated'
      ],
      correct: 1,
      explanation: 'Excess water ingestion dilutes plasma, lowering blood osmolarity. Hypothalamic osmoreceptors swell, inhibiting ADH secretion from the posterior pituitary. Collecting ducts remain water-impermeable, producing copious dilute urine (diuresis).'
    },
    {
      topic: 'Topic: Excretion vs Egestion',
      question: 'Why is the defecation of feces classified strictly as egestion rather than metabolic excretion?',
      options: [
        'A. Feces contain large concentrations of cellular urea and creatinine',
        'B. Feces consist of undigested dietary matter that was never absorbed into body fluids',
        'C. Feces are filtered through glomerular fenestrations in the kidneys',
        'D. Feces are formed from breakdown products of deaminated amino acids'
      ],
      correct: 1,
      explanation: 'Excretion is the removal of metabolic waste products generated by cellular biochemistry. Egestion is the expulsion of unabsorbed food residues that merely passed through the digestive lumen.'
    },
    {
      topic: 'Topic: Kidney Filtration',
      question: 'Which of the following substances is normally present in high concentrations in glomerular filtrate but ABSENT in normal urine?',
      options: [
        'A. Urea',
        'B. Creatinine',
        'C. Glucose',
        'D. Uric acid'
      ],
      correct: 2,
      explanation: 'Glucose is freely filtered at the glomerulus into Bowman’s capsule, but 100% of it is actively reabsorbed in the Proximal Convoluted Tubule (PCT) via SGLT cotransporters.'
    },
    {
      topic: 'Topic: Endocrine Pancreas',
      question: 'During prolonged fasting or intense exercise, which cellular mechanism is activated by glucagon in hepatocytes?',
      options: [
        'A. Glycogenesis and conversion of glucose into triglycerides',
        'B. Glycogenolysis and gluconeogenesis to elevate blood glucose',
        'C. Translocation of GLUT4 glucose transporters to cell membranes',
        'D. Accelerated synthesis of glycogen synthase enzymes'
      ],
      correct: 1,
      explanation: 'Glucagon binds GPCR receptors on hepatocytes, elevating intracellular cAMP and activating protein kinase A (PKA) to trigger glycogen breakdown (glycogenolysis) and de novo glucose synthesis (gluconeogenesis).'
    },
    {
      topic: 'Topic: Blood pH Regulation',
      question: 'A patient hyperventilates during an acute panic attack, exhaling excessive CO2. What initial acid-base disturbance results?',
      options: [
        'A. Respiratory Acidosis (pH < 7.35)',
        'B. Respiratory Alkalosis (pH > 7.45)',
        'C. Metabolic Acidosis with elevated bicarbonate',
        'D. Neutral pH with unchanged carbonic acid concentration'
      ],
      correct: 1,
      explanation: 'Blowing off CO2 shifts the equilibrium (CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3-) to the left, decreasing H+ concentration and raising arterial pH above 7.45, resulting in Respiratory Alkalosis.'
    },
    {
      topic: 'Topic: Positive Feedback',
      question: 'Which of the following physiological processes relies on a POSITIVE feedback mechanism?',
      options: [
        'A. Maintenance of core body temperature around 37°C',
        'B. Regulation of plasma calcium by parathyroid hormone (PTH) and calcitonin',
        'C. The blood clotting platelet aggregation cascade and the Ferguson childbirth reflex',
        'D. Baroreceptor reflex stabilization of arterial blood pressure'
      ],
      correct: 2,
      explanation: 'Blood clotting (platelets activating more platelets) and childbirth (oxytocin causing contractions that stimulate more oxytocin) are textbook positive feedback loops designed to reach rapid culmination.'
    },
    {
      topic: 'Topic: Nephron Segments',
      question: 'Which segment of the loop of Henle is highly permeable to water but impermeable to NaCl?',
      options: [
        'A. Thick ascending limb',
        'B. Thin descending limb',
        'C. Distal convoluted tubule',
        'D. Macula densa'
      ],
      correct: 1,
      explanation: 'The descending limb of the Loop of Henle is rich in Aquaporin-1 channels and permeable to water, allowing osmotic concentration of filtrate as it descends into the hypertonic medullary interstitium.'
    },
    {
      topic: 'Topic: Nervous vs Endocrine',
      question: 'Compared to endocrine homeostatic control, the nervous system is characterized by:',
      options: [
        'A. Slower onset, longer duration of effect, and blood-borne delivery',
        'B. Rapid transmission via electrical impulses, localized target specificity, and short duration',
        'C. Universal action on all body cells without requiring specific receptors',
        'D. Exclusive synthesis of steroid-based signaling molecules'
      ],
      correct: 1,
      explanation: 'Nervous control operates via high-speed action potentials and synaptic neurotransmitters, producing instantaneous but brief, localized effects.'
    },
    {
      topic: 'Topic: Urea Formation',
      question: 'Ammonia is converted into urea in the liver because:',
      options: [
        'A. Urea is insoluble and precipitates readily in tissues',
        'B. Ammonia is highly toxic and requires large volumes of water for safe excretion',
        'C. Urea can be directly oxidized in mitochondria to yield ATP',
        'D. Ammonia cannot be filtered across the glomerular filtration barrier'
      ],
      correct: 1,
      explanation: 'Ammonia (NH3) is highly alkaline and neurotoxic. Terrestrial mammals convert it in the liver into urea, which is ~100,000 times less toxic and requires significantly less water to excrete.'
    },
    {
      topic: 'Topic: Hormonal Kidney Control',
      question: 'Aldosterone acts primarily on which part of the renal tubule to stimulate Na+ reabsorption and K+ excretion?',
      options: [
        'A. Glomerular basement membrane',
        'B. Descending limb of Henle',
        'C. Distal Convoluted Tubule (DCT) and Cortical Collecting Duct',
        'D. Podocyte filtration slits in Bowman’s capsule'
      ],
      correct: 2,
      explanation: 'Aldosterone (from the adrenal cortex) upregulates basolateral Na+/K+ ATPase pumps and apical ENaC channels in principal cells of the DCT and collecting ducts.'
    },
    {
      topic: 'Topic: Thermoregulation Effector',
      question: 'Why does involuntary shivering increase body temperature during cold exposure?',
      options: [
        'A. It forces cutaneous blood vessels to dilate widely',
        'B. Rapid muscle contractions hydrolyze ATP, releasing metabolic heat energy',
        'C. It inhibits cellular respiration in brown adipose tissue',
        'D. It stimulates evaporative cooling across the epidermis'
      ],
      correct: 1,
      explanation: 'Muscle contractions are thermodynamically inefficient; ~80% of the energy consumed during ATP hydrolysis in rapid skeletal muscle twitches is dissipated as heat.'
    },
    {
      topic: 'Topic: Acid-Base Defense',
      question: 'Which of the following systems is the ULTIMATE and most powerful long-term regulator of acid-base balance in the body?',
      options: [
        'A. Chemical Bicarbonate buffer system (seconds)',
        'B. Respiratory alveolar ventilation (minutes)',
        'C. Renal mechanism of H+ secretion and HCO3- generation (hours to days)',
        'D. Hemoglobin buffering in venous capillaries'
      ],
      correct: 2,
      explanation: 'While chemical buffers and lungs act rapidly, only the Kidneys can permanently eliminate fixed non-volatile metabolic acids and generate brand new bicarbonate ions.'
    },
    {
      topic: 'Topic: Glucose Homeostasis',
      question: 'A patient with untreated Type 1 Diabetes Mellitus exhibits glucosuria (glucose in urine) because:',
      options: [
        'A. The kidneys stop producing aldosterone and ADH',
        'B. Blood glucose exceeds the renal transport maximum (Tm) of SGLT cotransporters in the PCT',
        'C. The ascending limb of Henle becomes permeable to glucose molecules',
        'D. Glomerular podocytes break down, allowing glucose to leak freely'
      ],
      correct: 1,
      explanation: 'When blood glucose exceeds ~180-200 mg/dL (the renal threshold), SGLT transporters in the PCT become fully saturated (transport maximum Tm is exceeded), resulting in unabsorbed glucose spilling into the urine.'
    }
  ];

  let currentQ = 0;
  let userAnswers = new Array(quizData.length).fill(null);
  let liveScoreVal = 0;

  const qTopic = document.getElementById('qTopic');
  const qTitle = document.getElementById('qTitle');
  const qOptionsList = document.getElementById('qOptionsList');
  const qExplanationBox = document.getElementById('qExplanationBox');
  const expStatusTitle = document.getElementById('expStatusTitle');
  const expIcon = document.getElementById('expIcon');
  const expDetailText = document.getElementById('expDetailText');
  const quizCounterText = document.getElementById('quizCounterText');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const liveScore = document.getElementById('liveScore');
  const quizPrevBtn = document.getElementById('quizPrevBtn');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizFinishBtn = document.getElementById('quizFinishBtn');

  const quizQuestionCard = document.getElementById('quizQuestionCard');
  const quizResultsCard = document.getElementById('quizResultsCard');

  const resPercent = document.getElementById('resPercent');
  const resScoreFraction = document.getElementById('resScoreFraction');
  const resMessage = document.getElementById('resMessage');
  const resCorrectCount = document.getElementById('resCorrectCount');
  const resIncorrectCount = document.getElementById('resIncorrectCount');
  const resUnattemptedCount = document.getElementById('resUnattemptedCount');
  const retakeQuizBtn = document.getElementById('retakeQuizBtn');
  const reviewMistakesBtn = document.getElementById('reviewMistakesBtn');

  if (!qTitle || !qOptionsList) return;

  function loadQuestion(index) {
    currentQ = index;
    const q = quizData[index];

    if (qTopic) qTopic.textContent = q.topic;
    if (qTitle) qTitle.textContent = `${index + 1}. ${q.question}`;
    if (quizCounterText) quizCounterText.textContent = `Question ${index + 1} of ${quizData.length}`;
    if (quizProgressFill) quizProgressFill.style.width = `${((index + 1) / quizData.length) * 100}%`;

    const letters = ['A', 'B', 'C', 'D'];
    qOptionsList.innerHTML = q.options.map((opt, i) => {
      let extraClass = '';
      if (userAnswers[index] !== null) {
        if (i === q.correct) extraClass = 'correct';
        else if (i === userAnswers[index]) extraClass = 'incorrect';
      }
      return `
        <button type="button" class="quiz-option-btn ${extraClass}" data-opt="${i}" ${userAnswers[index] !== null ? 'disabled' : ''}>
          <span class="opt-letter">${letters[i]}</span>
          <span class="opt-text">${opt.substring(3)}</span>
        </button>
      `;
    }).join('');

    // Explanation Box state
    if (userAnswers[index] !== null) {
      if (qExplanationBox) {
        qExplanationBox.style.display = 'block';
        const isCorrect = userAnswers[index] === q.correct;
        if (expStatusTitle) expStatusTitle.textContent = isCorrect ? 'Correct Answer!' : 'Incorrect!';
        if (expIcon) expIcon.textContent = isCorrect ? '✓' : '✕';
        if (expDetailText) expDetailText.textContent = q.explanation;
      }
    } else {
      if (qExplanationBox) qExplanationBox.style.display = 'none';
    }

    // Nav buttons
    if (quizPrevBtn) quizPrevBtn.disabled = index === 0;
    if (index === quizData.length - 1) {
      if (quizNextBtn) quizNextBtn.style.display = 'none';
      if (quizFinishBtn) quizFinishBtn.style.display = 'inline-block';
    } else {
      if (quizNextBtn) quizNextBtn.style.display = 'inline-block';
      if (quizFinishBtn) quizFinishBtn.style.display = 'none';
    }

    // Attach option listeners
    const optionBtns = qOptionsList.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedOpt = parseInt(btn.getAttribute('data-opt'), 10);
        userAnswers[index] = selectedOpt;
        if (selectedOpt === q.correct) {
          liveScoreVal++;
          if (liveScore) liveScore.textContent = liveScoreVal;
        }
        loadQuestion(index);
      });
    });
  }

  quizPrevBtn?.addEventListener('click', () => {
    if (currentQ > 0) loadQuestion(currentQ - 1);
  });

  quizNextBtn?.addEventListener('click', () => {
    if (currentQ < quizData.length - 1) loadQuestion(currentQ + 1);
  });

  quizFinishBtn?.addEventListener('click', showResults);

  function showResults() {
    if (quizQuestionCard) quizQuestionCard.style.display = 'none';
    if (quizResultsCard) quizResultsCard.style.display = 'block';

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    userAnswers.forEach((ans, i) => {
      if (ans === null) unattempted++;
      else if (ans === quizData[i].correct) correct++;
      else incorrect++;
    });

    const percentage = Math.round((correct / quizData.length) * 100);

    if (resPercent) resPercent.textContent = `${percentage}%`;
    if (resScoreFraction) resScoreFraction.textContent = `${correct} / ${quizData.length} Correct`;
    if (resCorrectCount) resCorrectCount.textContent = correct;
    if (resIncorrectCount) resIncorrectCount.textContent = incorrect;
    if (resUnattemptedCount) resUnattemptedCount.textContent = unattempted;

    const scoreCircle = document.querySelector('.results-score-circle');
    if (scoreCircle) {
      scoreCircle.style.setProperty('--score-pct', percentage);
    }

    let msg = '';
    if (percentage >= 90) {
      msg = '🌟 Outstanding MDCAT Master! You have exceptional mastery over Homeostasis, Nephron physiology, and Feedback loops.';
    } else if (percentage >= 70) {
      msg = '👍 Very Good Grasp! A solid understanding of core concepts. Review the high-yield facts to achieve a perfect score.';
    } else {
      msg = '📚 Revision Recommended: Review the interactive simulators and flashcards above to strengthen your conceptual foundation.';
    }
    if (resMessage) resMessage.textContent = msg;
  }

  retakeQuizBtn?.addEventListener('click', () => {
    userAnswers = new Array(quizData.length).fill(null);
    liveScoreVal = 0;
    if (liveScore) liveScore.textContent = '0';
    if (quizQuestionCard) quizQuestionCard.style.display = 'block';
    if (quizResultsCard) quizResultsCard.style.display = 'none';
    loadQuestion(0);
    showToast('Quiz Reset! Good Luck.');
  });

  reviewMistakesBtn?.addEventListener('click', () => {
    const firstMistake = userAnswers.findIndex((ans, i) => ans !== quizData[i].correct);
    if (firstMistake !== -1) {
      if (quizQuestionCard) quizQuestionCard.style.display = 'block';
      if (quizResultsCard) quizResultsCard.style.display = 'none';
      loadQuestion(firstMistake);
    } else {
      showToast('No mistakes found! You scored 100%.');
    }
  });

  loadQuestion(0);
}

/* ==========================================================================
   13. BOOKMARKS SYSTEM (LOCALSTORAGE)
   ========================================================================== */
function initBookmarks() {
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  const bookmarksBtnHeader = document.getElementById('bookmarksBtn');
  const bookmarkCountEl = document.getElementById('bookmarkCount');
  const modalBmCount = document.getElementById('modalBmCount');
  const bookmarksModal = document.getElementById('bookmarksModal');
  const closeBmModalBtn = document.getElementById('closeBmModalBtn');
  const bookmarksList = document.getElementById('bookmarksList');

  let savedBookmarks = new Set(JSON.parse(localStorage.getItem('mdcat_homeostasis_bookmarks') || '[]'));

  function updateBookmarksUI() {
    if (bookmarkCountEl) bookmarkCountEl.textContent = savedBookmarks.size;
    if (modalBmCount) modalBmCount.textContent = savedBookmarks.size;

    bookmarkBtns.forEach(btn => {
      const secId = btn.getAttribute('data-target');
      if (savedBookmarks.has(secId)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (bookmarksList) {
      if (savedBookmarks.size === 0) {
        bookmarksList.innerHTML = '<p class="empty-state">No sections bookmarked yet. Click the bookmark icon on any chapter section to save it for rapid revision.</p>';
      } else {
        bookmarksList.innerHTML = Array.from(savedBookmarks).map(id => {
          const sec = document.getElementById(id);
          const title = sec?.querySelector('.section-title')?.textContent || id;
          return `
            <div class="bm-item">
              <a href="#${id}" class="bm-link" data-close-modal="true">${title}</a>
              <button type="button" class="bm-remove-btn" data-remove="${id}">Remove</button>
            </div>
          `;
        }).join('');

        // Attach item handlers inside modal
        bookmarksList.querySelectorAll('.bm-link').forEach(link => {
          link.addEventListener('click', () => {
            bookmarksModal?.classList.remove('active');
          });
        });

        bookmarksList.querySelectorAll('.bm-remove-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const removeId = btn.getAttribute('data-remove');
            savedBookmarks.delete(removeId);
            localStorage.setItem('mdcat_homeostasis_bookmarks', JSON.stringify([...savedBookmarks]));
            updateBookmarksUI();
          });
        });
      }
    }
  }

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.getAttribute('data-target');
      if (!secId) return;

      if (savedBookmarks.has(secId)) {
        savedBookmarks.delete(secId);
        showToast('Bookmark removed.');
      } else {
        savedBookmarks.add(secId);
        showToast('Section saved to bookmarks!');
      }

      localStorage.setItem('mdcat_homeostasis_bookmarks', JSON.stringify([...savedBookmarks]));
      updateBookmarksUI();
    });
  });

  bookmarksBtnHeader?.addEventListener('click', () => {
    bookmarksModal?.classList.add('active');
  });

  closeBmModalBtn?.addEventListener('click', () => {
    bookmarksModal?.classList.remove('active');
  });

  bookmarksModal?.addEventListener('click', (e) => {
    if (e.target === bookmarksModal) {
      bookmarksModal.classList.remove('active');
    }
  });

  updateBookmarksUI();
}

/* ==========================================================================
   14. CHAPTER COMPLETION (LOCALSTORAGE)
   ========================================================================== */
function initChapterCompletion() {
  const headerBtn = document.getElementById('chapterCompleteBtn');
  const headerBtnText = document.getElementById('completeBtnText');
  const footerBtn = document.getElementById('footerCompleteBtn');

  let isCompleted = localStorage.getItem('mdcat_homeostasis_completed') === 'true';

  function updateStatus() {
    if (isCompleted) {
      headerBtn?.classList.add('is-completed');
      if (headerBtnText) headerBtnText.textContent = '✓ Completed';
      if (footerBtn) {
        footerBtn.textContent = '✓ Chapter Completed (Click to Reset)';
        footerBtn.style.backgroundColor = '#10b981';
        footerBtn.style.color = '#ffffff';
      }
    } else {
      headerBtn?.classList.remove('is-completed');
      if (headerBtnText) headerBtnText.textContent = 'Mark Complete';
      if (footerBtn) {
        footerBtn.textContent = '✓ Mark Chapter as Completed';
        footerBtn.style.backgroundColor = '#ffffff';
        footerBtn.style.color = '#0f766e';
      }
    }
  }

  function toggleCompletion() {
    isCompleted = !isCompleted;
    localStorage.setItem('mdcat_homeostasis_completed', isCompleted ? 'true' : 'false');
    updateStatus();
    showToast(isCompleted ? '🎉 Congratulations! Chapter 15 marked as completed.' : 'Chapter status reset to in-progress.');
  }

  headerBtn?.addEventListener('click', toggleCompletion);
  footerBtn?.addEventListener('click', toggleCompletion);

  updateStatus();
}

/* ==========================================================================
   15. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   16. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('active');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 2800);
}
