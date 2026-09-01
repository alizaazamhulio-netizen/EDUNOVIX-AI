/**
 * MDCAT Chemistry: Alcohols, Phenols & Ethers
 * Interactive Learning Engine & Exam Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroPods();
  initProgressAndScroll();
  initSearch();
  initBookmarks();
  initFunctionalGroupIdentifier();
  initAlcoholClassificationDrill();
  initOxidationPathway();
  initHighYieldCards();
  initFlashcards();
  initQuiz();
  initChapterCompletion();
  initBackToTop();
});

/* ==========================================================================
   1. HERO MOLECULAR PODS
   ========================================================================== */
function initHeroPods() {
  const pods = document.querySelectorAll('.molecular-pod');
  const tipBox = document.getElementById('heroDynamicTip');

  const podTips = {
    'Alcohol': '<strong>Alcohols (R–OH):</strong> Contains a hydroxyl group bound to an sp³ saturated carbon. Form strong intermolecular hydrogen bonds, leading to high boiling points and water solubility for lower members.',
    'Phenol': '<strong>Phenols (Ar–OH):</strong> The –OH group is directly attached to an aromatic benzene ring. The conjugate phenoxide ion is resonance-stabilized over 5 canonical structures, making phenol ~10⁶ times more acidic than ethanol!',
    'Ether': '<strong>Ethers (R–O–R′):</strong> Divalent oxygen bonded to two alkyl or aryl groups. Lack O–H bonds and cannot form hydrogen bonds with themselves, resulting in low boiling points and high chemical inertness.'
  };

  pods.forEach(pod => {
    pod.addEventListener('click', () => {
      pods.forEach(p => p.classList.remove('active'));
      pod.classList.add('active');
      const target = pod.getAttribute('data-target');
      if (podTips[target] && tipBox) {
        tipBox.innerHTML = podTips[target];
      }
    });
  });
}

/* ==========================================================================
   2. SCROLL PROGRESS & ACTIVE NAVBAR SPY
   ========================================================================== */
function initProgressAndScroll() {
  const progressBar = document.getElementById('scrollProgressBar');
  const progressText = document.getElementById('progressPercentageText');
  const navLinks = document.querySelectorAll('.nav-scroll-container .nav-item');
  const sections = document.querySelectorAll('.chapter-section, .hero-section');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    if (progressBar) progressBar.style.width = scrolled + '%';
    if (progressText) progressText.innerText = Math.round(scrolled) + '%';

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (winScroll >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. SMART SEARCH
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('chapterSearchInput');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const searchBoxArea = document.getElementById('searchBoxArea');
  const chips = document.querySelectorAll('.quick-search-chip');
  const resultsCount = document.getElementById('searchResultsCount');

  if (openSearchBtn && searchBoxArea) {
    openSearchBtn.addEventListener('click', () => {
      searchBoxArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (searchInput) searchInput.focus();
    });
  }

  function performSearch(query) {
    const trimmed = query.trim().toLowerCase();
    const searchableCards = document.querySelectorAll('.study-card, .functional-group-card, .rxn-card, .interactive-tool-box, .hy-card');
    
    if (!trimmed) {
      searchableCards.forEach(c => c.style.display = '');
      if (resultsCount) resultsCount.style.display = 'none';
      return;
    }

    let matchCount = 0;
    searchableCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(trimmed)) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      resultsCount.style.display = 'block';
      resultsCount.innerHTML = `Found <strong>${matchCount}</strong> learning modules matching "<em>${query}</em>"`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-search');
      if (searchInput) {
        searchInput.value = val;
        performSearch(val);
      }
    });
  });
}

/* ==========================================================================
   4. BOOKMARKS SYSTEM (LOCALSTORAGE)
   ========================================================================== */
function initBookmarks() {
  const STORAGE_KEY = 'mdcat_organic_bookmarks';
  let bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  const navBookmarkCount = document.getElementById('navBookmarkCount');
  const openBookmarksBtn = document.getElementById('openBookmarksBtn');
  const closeBookmarksBtn = document.getElementById('closeBookmarksBtn');
  const drawer = document.getElementById('bookmarkDrawer');
  const backdrop = document.getElementById('bookmarkDrawerBackdrop');
  const drawerList = document.getElementById('drawerBookmarksList');
  const sectionBookmarkBtns = document.querySelectorAll('.btn-section-bookmark');

  function updateBadge() {
    if (navBookmarkCount) navBookmarkCount.innerText = bookmarks.length;
    sectionBookmarkBtns.forEach(btn => {
      const secId = btn.getAttribute('data-section');
      if (bookmarks.includes(secId)) {
        btn.classList.add('bookmarked');
        btn.innerText = '🔖 Saved';
      } else {
        btn.classList.remove('bookmarked');
        btn.innerText = '🔖 Bookmark';
      }
    });
  }

  function renderDrawerList() {
    if (!drawerList) return;
    if (bookmarks.length === 0) {
      drawerList.innerHTML = '<div class="drawer-empty-msg">No bookmarks saved yet. Click the 🔖 button next to any section to pin it here.</div>';
      return;
    }

    drawerList.innerHTML = '';
    bookmarks.forEach(secId => {
      const sectionEl = document.getElementById(secId);
      const title = sectionEl ? (sectionEl.querySelector('.section-title')?.innerText || secId) : secId;

      const item = document.createElement('div');
      item.className = 'drawer-bookmark-item';
      item.innerHTML = `
        <a href="#${secId}" class="drawer-bm-link">${title}</a>
        <button class="drawer-bm-remove" data-remove="${secId}" title="Remove Bookmark">✕</button>
      `;
      drawerList.appendChild(item);
    });

    drawerList.querySelectorAll('.drawer-bm-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idToRemove = e.target.getAttribute('data-remove');
        bookmarks = bookmarks.filter(b => b !== idToRemove);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
        updateBadge();
        renderDrawerList();
      });
    });

    drawerList.querySelectorAll('.drawer-bm-link').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  function openDrawer() {
    renderDrawerList();
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  }

  if (openBookmarksBtn) openBookmarksBtn.addEventListener('click', openDrawer);
  if (closeBookmarksBtn) closeBookmarksBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  sectionBookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.getAttribute('data-section');
      if (bookmarks.includes(secId)) {
        bookmarks = bookmarks.filter(b => b !== secId);
      } else {
        bookmarks.push(secId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      updateBadge();
      renderDrawerList();
    });
  });

  updateBadge();
}

/* ==========================================================================
   5. INTERACTIVE FUNCTIONAL GROUP IDENTIFIER
   ========================================================================== */
function initFunctionalGroupIdentifier() {
  const molecules = [
    {
      formula: 'CH₃CH₂OH',
      name: 'Ethanol',
      correctType: 'Alcohol',
      explanation: '<strong>Alcohol (R–OH):</strong> The –OH group is bonded to an sp³ hybridized saturated alkyl carbon (ethyl group). It does not react with NaOH and oxidizes to ethanal then ethanoic acid.'
    },
    {
      formula: 'C₆H₅OH',
      name: 'Phenol (Carbolic Acid)',
      correctType: 'Phenol',
      explanation: '<strong>Phenol (Ar–OH):</strong> The –OH is directly attached to an aromatic benzene ring. Its phenoxide conjugate base is resonance-stabilized, making it acidic enough to react with aqueous NaOH and give a white precipitate with Br₂ water.'
    },
    {
      formula: 'CH₃–O–CH₃',
      name: 'Dimethyl Ether (Methoxymethane)',
      correctType: 'Ether',
      explanation: '<strong>Ether (R–O–R′):</strong> Contains an oxygen bridge bonded to two methyl groups. Lacks active O–H bonds; thus cannot form hydrogen bonds with other ether molecules.'
    },
    {
      formula: 'CH₃–CH(OH)–CH₃',
      name: 'Propan-2-ol (Isopropyl Alcohol)',
      correctType: 'Alcohol',
      explanation: '<strong>Secondary Alcohol (2° R–OH):</strong> The –OH is attached to a 2° carbon carrying two methyl groups and one α-hydrogen. Oxidizes exclusively to propanone (acetone).'
    },
    {
      formula: 'C₆H₅–O–CH₃',
      name: 'Anisole (Methoxybenzene)',
      correctType: 'Ether',
      explanation: '<strong>Ether (Ar–O–R):</strong> Contains an ether oxygen connecting an aromatic phenyl ring to a methyl group (mixed aromatic-aliphatic ether).'
    },
    {
      formula: 'CH₃–C₆H₄–OH',
      name: 'o-Cresol (2-Methylphenol)',
      correctType: 'Phenol',
      explanation: '<strong>Phenol (Ar–OH derivative):</strong> Even though it possesses a methyl substituent, the key functional group is the –OH attached directly to the aromatic ring.'
    }
  ];

  let currentIndex = 0;
  const formulaText = document.getElementById('identifierFormulaText');
  const compoundName = document.getElementById('identifierCompoundName');
  const indexDisplay = document.getElementById('identifierCurrentIndex');
  const feedbackBox = document.getElementById('identifierFeedbackBox');
  const optionButtons = document.querySelectorAll('.identifier-buttons-row .btn-tool-option');
  const prevBtn = document.getElementById('prevIdentifierBtn');
  const nextBtn = document.getElementById('nextIdentifierBtn');

  function renderMolecule(idx) {
    const mol = molecules[idx];
    if (formulaText) formulaText.innerText = mol.formula;
    if (compoundName) compoundName.innerText = mol.name;
    if (indexDisplay) indexDisplay.innerText = `${idx + 1}`;
    
    if (feedbackBox) {
      feedbackBox.className = 'feedback-explanation-box';
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
    }

    optionButtons.forEach(btn => {
      btn.className = 'btn-tool-option';
      btn.disabled = false;
    });
  }

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-answer');
      const mol = molecules[currentIndex];
      const isCorrect = (selected === mol.correctType);

      optionButtons.forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-answer') === mol.correctType) {
          b.classList.add('selected-correct');
        }
      });

      if (!isCorrect) {
        btn.classList.add('selected-incorrect');
      }

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = `feedback-explanation-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'} show`;
        feedbackBox.innerHTML = `
          <strong>${isCorrect ? '✓ Correct Choice!' : '✕ Incorrect Identification'}</strong><br>
          ${mol.explanation}
        `;
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + molecules.length) % molecules.length;
      renderMolecule(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % molecules.length;
      renderMolecule(currentIndex);
    });
  }

  renderMolecule(0);
}

/* ==========================================================================
   6. ALCOHOL CLASSIFICATION DRILL (1°, 2°, 3°)
   ========================================================================== */
function initAlcoholClassificationDrill() {
  const drillItems = [
    {
      formula: 'CH₃–CH(OH)–CH₂–CH₃',
      name: 'Butan-2-ol (sec-Butyl Alcohol)',
      degree: '2',
      explanation: '<strong>Secondary (2°) Alcohol:</strong> The carbon carrying the –OH group is directly bonded to two other carbons (a methyl group and an ethyl group) and 1 hydrogen atom.'
    },
    {
      formula: 'CH₃–CH₂–CH₂–CH₂–OH',
      name: 'Butan-1-ol (n-Butyl Alcohol)',
      degree: '1',
      explanation: '<strong>Primary (1°) Alcohol:</strong> The α-carbon (–CH₂–OH) is directly bonded to only 1 other carbon (the propyl group) and possesses 2 α-hydrogens.'
    },
    {
      formula: '(CH₃)₃C–OH',
      name: '2-Methylpropan-2-ol (tert-Butyl Alcohol)',
      degree: '3',
      explanation: '<strong>Tertiary (3°) Alcohol:</strong> The α-carbon is directly bonded to 3 methyl groups and has 0 α-hydrogens. Therefore, it resists mild oxidation.'
    },
    {
      formula: '(CH₃)₂CH–CH₂–OH',
      name: '2-Methylpropan-1-ol (Isobutanol)',
      degree: '1',
      explanation: '<strong>Primary (1°) Alcohol:</strong> MDCAT Trap! Despite having a branched isopropyl skeleton, the carbon bearing the –OH group is a –CH₂– attached to only 1 adjacent carbon.'
    },
    {
      formula: 'CH₃–CH₂–C(CH₃)(OH)–CH₃',
      name: '2-Methylbutan-2-ol (tert-Amyl Alcohol)',
      degree: '3',
      explanation: '<strong>Tertiary (3°) Alcohol:</strong> The –OH group is on carbon #2, which is bonded to two methyl groups and one ethyl group (3 carbons total).'
    }
  ];

  let currentIdx = 0;
  const formulaText = document.getElementById('classifFormulaText');
  const nameText = document.getElementById('classifCompoundName');
  const feedbackBox = document.getElementById('classifFeedbackBox');
  const buttons = document.querySelectorAll('.identifier-container .btn-tool-option[data-degree]');
  const prevBtn = document.getElementById('prevClassifBtn');
  const nextBtn = document.getElementById('nextClassifBtn');

  function renderDrill(idx) {
    const item = drillItems[idx];
    if (formulaText) formulaText.innerText = item.formula;
    if (nameText) nameText.innerText = item.name;
    if (feedbackBox) {
      feedbackBox.className = 'feedback-explanation-box';
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
    }

    buttons.forEach(btn => {
      btn.className = 'btn-tool-option';
      btn.disabled = false;
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-degree');
      const item = drillItems[currentIdx];
      const isCorrect = (selected === item.degree);

      buttons.forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-degree') === item.degree) {
          b.classList.add('selected-correct');
        }
      });

      if (!isCorrect) {
        btn.classList.add('selected-incorrect');
      }

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = `feedback-explanation-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'} show`;
        feedbackBox.innerHTML = `
          <strong>${isCorrect ? '✓ Exact Classification!' : '✕ Incorrect Degree'}</strong><br>
          ${item.explanation}
        `;
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + drillItems.length) % drillItems.length;
      renderDrill(currentIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % drillItems.length;
      renderDrill(currentIdx);
    });
  }

  renderDrill(0);
}

/* ==========================================================================
   7. OXIDATION PATHWAY VISUALIZER
   ========================================================================== */
function initOxidationPathway() {
  const tabs = document.querySelectorAll('.btn-ox-tab');
  const displayCard = document.getElementById('pathwayDisplayCard');

  const pathways = {
    primary: {
      title: 'Primary (1°) Alcohol: Stepwise Oxidation to Carboxylic Acid',
      reagentNote: 'Oxidizing Agent: Acidified Potassium Dichromate (K₂Cr₂O₇ / H₂SO₄) or KMnO₄. (Orange Cr₂O₇²⁻ turns Green Cr³⁺).',
      steps: [
        { role: '1° Alcohol', formula: 'CH₃–CH₂–OH', name: 'Ethanol' },
        { reagent: '[O] (–2H)' },
        { role: 'Aldehyde', formula: 'CH₃–CH=O', name: 'Ethanal (Acetaldehyde)' },
        { reagent: '[O] (+O)' },
        { role: 'Carboxylic Acid', formula: 'CH₃–COOH', name: 'Ethanoic Acid (Acetic Acid)' }
      ],
      mdcatInsight: 'Primary alcohols possess 2 α-hydrogens. They first lose 2H to form an aldehyde. Because aldehydes have an active carbonyl hydrogen, they undergo further rapid oxidation to carboxylic acids with the SAME number of carbon atoms.'
    },
    secondary: {
      title: 'Secondary (2°) Alcohol: Oxidation to Ketone',
      reagentNote: 'Oxidizing Agent: Acidified K₂Cr₂O₇ / H₂SO₄ under reflux.',
      steps: [
        { role: '2° Alcohol', formula: 'CH₃–CH(OH)–CH₃', name: 'Propan-2-ol' },
        { reagent: '[O] (–2H)' },
        { role: 'Ketone', formula: 'CH₃–CO–CH₃', name: 'Propanone (Acetone)' },
        { reagent: 'Severe [O]' },
        { role: 'Cleavage Mix', formula: 'CH₃COOH + CO₂ + H₂O', name: 'Shorter Carboxylic Acids' }
      ],
      mdcatInsight: 'Secondary alcohols have 1 α-hydrogen. Oxidation removes both hydrogens to produce a Ketone. Ketones lack a carbonyl hydrogen and resist further oxidation under mild conditions. Drastic oxidation requires C–C bond cleavage giving acids with fewer carbons.'
    },
    tertiary: {
      title: 'Tertiary (3°) Alcohol: Resistant to Mild Oxidation',
      reagentNote: 'Mild Reagents (K₂Cr₂O₇ / neutral KMnO₄): NO REACTION at room temperature.',
      steps: [
        { role: '3° Alcohol', formula: '(CH₃)₃C–OH', name: '2-Methylpropan-2-ol' },
        { reagent: 'Acid + Heat (Elimination)' },
        { role: 'Alkene', formula: '(CH₃)₂C=CH₂', name: '2-Methylpropene' },
        { reagent: 'Cleavage [O]' },
        { role: 'Oxidized Mix', formula: 'CH₃COCH₃ + CO₂ + H₂O', name: 'Acetone + Carbon Dioxide' }
      ],
      mdcatInsight: 'Tertiary alcohols contain NO hydrogen on the α-carbon (C–OH). Therefore, they cannot undergo normal dehydrogenation. Under severe hot acidic conditions, tertiary alcohols first undergo DEHYDRATION to form an Alkene, which subsequently cleaves oxidatively!'
    }
  };

  function renderPathway(type) {
    const p = pathways[type];
    if (!displayCard || !p) return;

    let stepsHtml = '';
    p.steps.forEach((step, idx) => {
      if (step.role) {
        stepsHtml += `
          <div class="pathway-step-node">
            <div class="node-role-badge">${step.role}</div>
            <div class="node-formula">${step.formula}</div>
            <div class="node-name">${step.name}</div>
          </div>
        `;
      } else if (step.reagent) {
        stepsHtml += `
          <div class="pathway-arrow-node">
            <span class="arrow-reagent">${step.reagent}</span>
            <span class="arrow-icon-svg">➔</span>
          </div>
        `;
      }
    });

    displayCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
        <h4 style="font-size:1.15rem; color:#0f172a;">${p.title}</h4>
        <span class="badge badge-emerald">MDCAT Reaction Route</span>
      </div>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">${p.reagentNote}</p>
      <div class="pathway-steps-container">
        ${stepsHtml}
      </div>
      <div style="background:#f0fdf4; border-left:3px solid #0d9488; padding:0.75rem 1rem; border-radius:0 var(--radius-md) var(--radius-md) 0; font-size:0.85rem; color:#166534; margin-top:1rem;">
        <strong>Mechanism Rationale:</strong> ${p.mdcatInsight}
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      renderPathway(type);
    });
  });

  renderPathway('primary');
}

/* ==========================================================================
   8. 30+ HIGH-YIELD MDCAT REVISION CARDS
   ========================================================================== */
function initHighYieldCards() {
  const cardsData = [
    {
      tag: 'Functional Group',
      title: 'Alcohol Formula',
      body: 'Contains –OH group attached to saturated sp³ carbon. General formula: <span class="hy-formula-chip">CₙH₂ₙ₊₁OH</span> or <span class="hy-formula-chip">R–OH</span>.'
    },
    {
      tag: 'Functional Group',
      title: 'Phenol Formula',
      body: 'Contains –OH directly attached to aromatic sp² benzene carbon. Formula: <span class="hy-formula-chip">C₆H₅OH</span> (Carbolic acid).'
    },
    {
      tag: 'Functional Group',
      title: 'Ether Formula',
      body: 'Divalent oxygen atom flanked by two alkyl or aryl groups: <span class="hy-formula-chip">R–O–R′</span>.'
    },
    {
      tag: 'Classification',
      title: 'Primary Alcohol (1°)',
      body: 'α-Carbon attached to only 1 other carbon. Has 2 α-hydrogens. Example: <span class="hy-formula-chip">CH₃CH₂OH</span>.'
    },
    {
      tag: 'Classification',
      title: 'Secondary Alcohol (2°)',
      body: 'α-Carbon attached to 2 other carbons. Has 1 α-hydrogen. Example: <span class="hy-formula-chip">CH₃CH(OH)CH₃</span>.'
    },
    {
      tag: 'Classification',
      title: 'Tertiary Alcohol (3°)',
      body: 'α-Carbon attached to 3 other carbons. Has 0 α-hydrogens. Example: <span class="hy-formula-chip">(CH₃)₃COH</span>.'
    },
    {
      tag: 'Acidity',
      title: 'Alcohol Acidity',
      body: 'Extremely weak acids (pKa ~16–18). Alkoxide ion (<span class="hy-formula-chip">RO⁻</span>) is destabilized by +I effect of alkyl groups.'
    },
    {
      tag: 'Acidity',
      title: 'Phenol Acidity',
      body: 'Moderately acidic (pKa ~10). Delocalizes negative charge over 5 resonance structures in phenoxide ion.'
    },
    {
      tag: 'Acidity Ranking',
      title: 'Acidity Order',
      body: 'Carboxylic acids > Phenol > Water > Aliphatic Alcohols > Terminal Alkynes.'
    },
    {
      tag: 'Intermolecular',
      title: 'Hydrogen Bonding',
      body: 'Alcohols form intermolecular H-bonds as both donor and acceptor, giving exceptionally high boiling points.'
    },
    {
      tag: 'Boiling Point',
      title: 'BP Comparison',
      body: 'For comparable mass: <strong>Ethanol (78°C) > Dimethyl ether (–24°C) > Propane (–42°C)</strong>.'
    },
    {
      tag: 'Solubility',
      title: 'Water Solubility Trend',
      body: 'Methanol, ethanol, propanol are miscible in all proportions. Solubility decreases as hydrophobic R chain grows.'
    },
    {
      tag: 'Reactions',
      title: 'Active Metal Reaction',
      body: '<span class="hy-formula-chip">2ROH + 2Na → 2RONa + H₂↑</span>. Proves presence of acidic hydrogen.'
    },
    {
      tag: 'Reactions',
      title: 'Alcohol with NaOH',
      body: 'Aliphatic alcohols do <strong>NOT</strong> react with NaOH because they are weaker acids than water.'
    },
    {
      tag: 'Reactions',
      title: 'Phenol with NaOH',
      body: '<span class="hy-formula-chip">C₆H₅OH + NaOH → C₆H₅ONa + H₂O</span>. Dissolves cleanly in NaOH.'
    },
    {
      tag: 'Distinguishing Test',
      title: 'Phenol with NaHCO₃',
      body: 'Phenol does <strong>NOT</strong> react with NaHCO₃ (no CO₂ effervescence). Distinguishes phenol from carboxylic acids.'
    },
    {
      tag: 'Oxidation',
      title: '1° Alcohol Oxidation',
      body: '1° Alcohol ──► Aldehyde ──► Carboxylic Acid (same number of carbon atoms).'
    },
    {
      tag: 'Oxidation',
      title: '2° Alcohol Oxidation',
      body: '2° Alcohol ──► Ketone (requires drastic conditions to cleave C–C bonds further).'
    },
    {
      tag: 'Oxidation',
      title: '3° Alcohol Oxidation',
      body: 'Resists oxidation under mild conditions because α-carbon lacks hydrogen atoms.'
    },
    {
      tag: 'Elimination',
      title: 'Dehydration of Alcohols',
      body: '<span class="hy-formula-chip">CH₃CH₂OH ──[conc H₂SO₄ / 170°C]──► CH₂=CH₂ + H₂O</span>. Ease: 3° > 2° > 1°.'
    },
    {
      tag: 'Temperature Trap',
      title: 'Dehydration Temperature',
      body: 'Ethanol at 170°C yields <strong>Ethene</strong>; ethanol at 140°C with excess alcohol yields <strong>Diethyl ether</strong>.'
    },
    {
      tag: 'Condensation',
      title: 'Esterification',
      body: 'Acid + Alcohol ⇌ Ester + Water. Isotope tracer shows –OH comes from acid and –H from alcohol.'
    },
    {
      tag: 'Preparation',
      title: 'Williamson Synthesis',
      body: '<span class="hy-formula-chip">RONa + R′X ──► ROR′ + NaX</span>. Best with 1° alkyl halide via S<sub style="font-size:0.7em;">N</sub>2.'
    },
    {
      tag: 'Mechanism Trap',
      title: 'Williamson with 3° Halide',
      body: 'Reacting alkoxide with 3° alkyl halide yields <strong>Alkene (E2 elimination)</strong>, NOT ether!'
    },
    {
      tag: 'Cleavage',
      title: 'Ether Cleavage with HI',
      body: 'Cold 1 mol HI: forms smaller alkyl iodide + larger alcohol. Hot excess HI: forms 2 moles alkyl iodide.'
    },
    {
      tag: 'Aromatic Sub',
      title: 'Phenol Bromination',
      body: '<span class="hy-formula-chip">Phenol + 3Br₂(aq) ──► 2,4,6-tribromophenol↓</span> (White Precipitate diagnostic test).'
    },
    {
      tag: 'Aromatic Sub',
      title: 'Phenol Nitration',
      body: 'Dilute HNO₃ yields o- and p-nitrophenol. Conc HNO₃ + conc H₂SO₄ yields <strong>Picric Acid</strong> (2,4,6-trinitrophenol).'
    },
    {
      tag: 'Diagnostic Test',
      title: 'Neutral FeCl₃ Test',
      body: 'Phenol gives intense <strong>violet/purple coloration</strong> with neutral FeCl₃. Alcohols give no coloration.'
    },
    {
      tag: 'Diagnostic Test',
      title: 'Lucas Test',
      body: 'Conc. HCl + anhy. ZnCl₂. 3° alcohol: immediate turbidity; 2°: 5–10 mins; 1°: only on heating.'
    },
    {
      tag: 'Diagnostic Test',
      title: 'Iodoform Test',
      body: 'Alcohols with <span class="hy-formula-chip">CH₃CH(OH)–</span> group give yellow CHI₃ ppt. Ethanol is the only 1° alcohol that responds.'
    },
    {
      tag: 'Preparation',
      title: 'Alkene Hydration',
      body: 'Ethene + H₂O (H₃PO₄ / 300°C / 60 atm) → Ethanol. Propene follows Markovnikov rule yielding Propan-2-ol.'
    },
    {
      tag: 'Biochemical',
      title: 'Fermentation',
      body: '<span class="hy-formula-chip">C₆H₁₂O₆ ──[Zymase]──► 2C₂H₅OH + 2CO₂↑</span>. Optimal temp: 25–35°C (anaerobic).'
    }
  ];

  const grid = document.getElementById('highYieldCardsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  cardsData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'hy-card';
    card.innerHTML = `
      <div>
        <div class="hy-card-header">
          <span class="hy-topic-tag">${item.tag}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">#${index + 1}</span>
        </div>
        <h4 class="hy-card-title" style="margin-top:0.4rem;">${item.title}</h4>
        <div class="hy-card-body" style="margin-top:0.4rem;">${item.body}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   9. INTERACTIVE 3D FLASHCARDS SYSTEM (20 CARDS)
   ========================================================================== */
function initFlashcards() {
  const flashcardsData = [
    {
      id: 1,
      category: 'Alcohols • Functional Group',
      filter: 'alcohols',
      front: 'What is the functional group of an alcohol and what type of carbon is it attached to?',
      back: 'The functional group is the <strong>hydroxyl group (–OH)</strong>, attached to a saturated <strong>sp³ hybridized carbon</strong> atom (General formula: R–OH).'
    },
    {
      id: 2,
      category: 'Phenols • Structure',
      filter: 'phenols',
      front: 'What structural feature fundamentally distinguishes a phenol from an aliphatic alcohol?',
      back: 'In phenol, the –OH group is attached <strong>directly to an sp² aromatic benzene ring</strong>, permitting resonance delocalization of lone pairs into the π-system.'
    },
    {
      id: 3,
      category: 'Ethers • Structure',
      filter: 'ethers',
      front: 'What is the functional group and general representation of an ether?',
      back: 'An ether contains a divalent oxygen bridging two alkyl/aryl groups (<span class="chemical-formula">R–O–R′</span>). It has no active O–H bond.'
    },
    {
      id: 4,
      category: 'Alcohols • Classification',
      filter: 'alcohols',
      front: 'How do you classify primary (1°), secondary (2°), and tertiary (3°) alcohols?',
      back: 'By counting carbons attached to the α-carbon carrying the –OH:<br>• <strong>1°:</strong> 1 carbon (2 α-H)<br>• <strong>2°:</strong> 2 carbons (1 α-H)<br>• <strong>3°:</strong> 3 carbons (0 α-H).'
    },
    {
      id: 5,
      category: 'Alcohols • Oxidation',
      filter: 'reactions',
      front: 'What is the oxidation sequence for a primary (1°) alcohol using acidified K₂Cr₂O₇?',
      back: '<strong>1° Alcohol ──► Aldehyde ──► Carboxylic Acid</strong> (all with the same number of carbon atoms).'
    },
    {
      id: 6,
      category: 'Alcohols • Oxidation',
      filter: 'reactions',
      front: 'What is the primary oxidation product of a secondary (2°) alcohol?',
      back: 'A <strong>Ketone</strong> (e.g. Propan-2-ol oxidizes to Propanone). Ketones resist further oxidation without breaking C–C bonds.'
    },
    {
      id: 7,
      category: 'Alcohols • Oxidation',
      filter: 'reactions',
      front: 'Why do tertiary (3°) alcohols resist oxidation under mild conditions?',
      back: 'Because the carbon carrying the –OH group has <strong>no hydrogen atom (0 α-hydrogens)</strong> attached to it for dehydrogenation.'
    },
    {
      id: 8,
      category: 'Phenols • Acidity',
      filter: 'phenols',
      front: 'Why is phenol significantly more acidic than ethanol?',
      back: 'Losing H⁺ generates the <strong>phenoxide ion</strong>, which is <strong>resonance-stabilized over 5 canonical forms</strong>, whereas alkoxide has localized charge destabilized by +I alkyl groups.'
    },
    {
      id: 9,
      category: 'Phenols • Reactions',
      filter: 'phenols',
      front: 'How does phenol react differently with NaOH compared to aliphatic alcohols?',
      back: 'Phenol is acidic enough (pKa ~10) to <strong>react with and dissolve in aqueous NaOH</strong> forming sodium phenoxide. Alcohols do NOT react with NaOH.'
    },
    {
      id: 10,
      category: 'Ethers • Preparation',
      filter: 'ethers',
      front: 'What is Williamson Ether Synthesis and what mechanism does it follow?',
      back: 'Reaction between a sodium alkoxide and a primary alkyl halide: <span class="chemical-formula">RONa + R′X → ROR′ + NaX</span> via an <strong>S<sub style="font-size:0.7em;">N</sub>2 mechanism</strong>.'
    },
    {
      id: 11,
      category: 'Alcohols • Dehydration',
      filter: 'reactions',
      front: 'What happens when ethanol is heated with concentrated H₂SO₄ at 170°C vs 140°C?',
      back: '• <strong>170°C:</strong> Elimination occurs yielding <strong>Ethene</strong> (<span class="chemical-formula">CH₂=CH₂</span>).<br>• <strong>140°C:</strong> Intermolecular dehydration yields <strong>Diethyl ether</strong> (<span class="chemical-formula">C₂H₅OC₂H₅</span>).'
    },
    {
      id: 12,
      category: 'Alcohols • Reactions',
      filter: 'reactions',
      front: 'What is Fischer Esterification and where does the oxygen in water originate from?',
      back: 'Reaction of Carboxylic Acid + Alcohol (acid catalyst) ⇌ Ester + Water. Isotopic labeling shows the <strong>–OH group originates from the carboxylic acid</strong>.'
    },
    {
      id: 13,
      category: 'Diagnostic Tests',
      filter: 'reactions',
      front: 'What visual observation confirms the presence of phenol with Bromine water?',
      back: 'Formation of an instant <strong>white precipitate of 2,4,6-tribromophenol</strong> and decolourisation of bromine water.'
    },
    {
      id: 14,
      category: 'Diagnostic Tests',
      filter: 'reactions',
      front: 'What observation is seen when phenol reacts with neutral FeCl₃ solution?',
      back: 'An intense <strong>violet or purple coloration</strong> is produced due to formation of a coordination complex ion [<span class="chemical-formula">Fe(OC₆H₅)₆</span>]³⁻.'
    },
    {
      id: 15,
      category: 'Diagnostic Tests • Lucas Test',
      filter: 'alcohols',
      front: 'How does the Lucas reagent (conc. HCl + anhy. ZnCl₂) distinguish 1°, 2°, and 3° alcohols?',
      back: '• <strong>3°:</strong> Immediate cloudiness/turbidity.<br>• <strong>2°:</strong> Turbidity after 5–10 minutes.<br>• <strong>1°:</strong> No turbidity at room temp (only upon heating).'
    },
    {
      id: 16,
      category: 'Diagnostic Tests • Iodoform Test',
      filter: 'alcohols',
      front: 'Which alcohols give a positive yellow precipitate in the Iodoform test (I₂ + NaOH)?',
      back: 'Alcohols containing the <strong><span class="chemical-formula">CH₃–CH(OH)–</span> unit</strong>. Ethanol is the only 1° alcohol that tests positive; propan-2-ol and butan-2-ol also test positive.'
    },
    {
      id: 17,
      category: 'Physical Properties',
      filter: 'alcohols',
      front: 'Why do alcohols have much higher boiling points than isomeric ethers of the same molar mass?',
      back: 'Alcohols possess polar O–H bonds that form strong <strong>intermolecular hydrogen bonds</strong> with each other; ethers lack O–H bonds and cannot self-associate via H-bonding.'
    },
    {
      id: 18,
      category: 'Ethers • Cleavage',
      filter: 'ethers',
      front: 'What products are formed when ethyl methyl ether is cleaved with 1 mole of cold HI?',
      back: '<span class="chemical-formula">C₂H₅OCH₃ + HI → CH₃I + C₂H₅OH</span>. The iodide ion attacks the smaller, less sterically hindered methyl group.'
    },
    {
      id: 19,
      category: 'Phenols • Electrophilic Sub',
      filter: 'phenols',
      front: 'What positions on the benzene ring does the –OH group direct incoming electrophiles?',
      back: 'The –OH group is strongly activating and directs electrophiles to the <strong>ortho (2, 6) and para (4)</strong> positions due to positive mesomeric (+M) resonance.'
    },
    {
      id: 20,
      category: 'Phenols • Nitration',
      filter: 'phenols',
      front: 'What is Picric Acid and how is it synthesized from phenol?',
      back: 'Picric acid is <strong>2,4,6-trinitrophenol</strong>, prepared by reacting phenol with concentrated <span class="chemical-formula">HNO₃</span> in the presence of concentrated <span class="chemical-formula">H₂SO₄</span>.'
    }
  ];

  let currentList = [...flashcardsData];
  let currentIndex = 0;
  let masteredIds = JSON.parse(localStorage.getItem('mdcat_fc_mastered') || '[]');

  const stage = document.getElementById('flashcardStage');
  const inner = document.getElementById('flashcardInner');
  const frontCategory = document.getElementById('fcFrontCategory');
  const frontText = document.getElementById('fcFrontText');
  const backCategory = document.getElementById('fcBackCategory');
  const backText = document.getElementById('fcBackText');
  const currentNumEl = document.getElementById('fcCurrentNum');
  const totalNumEl = document.getElementById('fcTotalNum');
  const masteredCountEl = document.getElementById('fcMasteredCount');
  const masterToggleBtn = document.getElementById('fcMasterToggleBtn');
  const masterStatusText = document.getElementById('fcMasterStatusText');
  const prevBtn = document.getElementById('fcPrevBtn');
  const nextBtn = document.getElementById('fcNextBtn');
  const filterBtns = document.querySelectorAll('.btn-fc-filter');

  function updateCard() {
    if (inner) inner.classList.remove('flipped');
    if (currentList.length === 0) return;

    const card = currentList[currentIndex];
    if (frontCategory) frontCategory.innerText = card.category;
    if (frontText) frontText.innerHTML = card.front;
    if (backCategory) backCategory.innerText = card.category;
    if (backText) backText.innerHTML = card.back;
    if (currentNumEl) currentNumEl.innerText = `${currentIndex + 1}`;
    if (totalNumEl) totalNumEl.innerText = `${currentList.length}`;
    if (masteredCountEl) masteredCountEl.innerText = `${masteredIds.length}`;

    const isMastered = masteredIds.includes(card.id);
    if (masterStatusText) {
      masterStatusText.innerText = isMastered ? 'Mastered ✓' : 'Mark as Mastered';
    }
    if (masterToggleBtn) {
      masterToggleBtn.style.background = isMastered ? '#dcfce7' : '#f0fdf4';
      masterToggleBtn.style.borderColor = isMastered ? '#22c55e' : '#bbf7d0';
    }
  }

  if (stage && inner) {
    stage.addEventListener('click', () => {
      inner.classList.toggle('flipped');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      updateCard();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % currentList.length;
      updateCard();
    });
  }

  if (masterToggleBtn) {
    masterToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentList.length === 0) return;
      const card = currentList[currentIndex];
      if (masteredIds.includes(card.id)) {
        masteredIds = masteredIds.filter(id => id !== card.id);
      } else {
        masteredIds.push(card.id);
      }
      localStorage.setItem('mdcat_fc_mastered', JSON.stringify(masteredIds));
      updateCard();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-fcfilter');
      if (filter === 'all') {
        currentList = [...flashcardsData];
      } else {
        currentList = flashcardsData.filter(c => c.filter === filter);
      }
      currentIndex = 0;
      updateCard();
    });
  });

  updateCard();
}

/* ==========================================================================
   10. MDCAT MINI QUIZ (20 MCQS)
   ========================================================================== */
function initQuiz() {
  const mcqQuestions = [
    {
      topic: 'Classification of Alcohols',
      question: 'Which of the following alcohols is classified as a tertiary (3°) alcohol?',
      options: [
        'Propan-2-ol',
        '2-Methylpropan-1-ol',
        '2-Methylpropan-2-ol',
        'Butan-2-ol'
      ],
      correct: 2,
      explanation: 'In 2-Methylpropan-2-ol (tert-butyl alcohol), the carbon carrying the –OH group is bonded to 3 other methyl carbons, making it a 3° tertiary alcohol.'
    },
    {
      topic: 'Functional Groups',
      question: 'In Phenol, the hydroxyl (–OH) group is attached to which type of hybridized carbon atom?',
      options: [
        'sp³ hybridized aliphatic carbon',
        'sp² hybridized aromatic carbon',
        'sp hybridized linear carbon',
        'dsp² hybridized planar carbon'
      ],
      correct: 1,
      explanation: 'In phenol (C₆H₅OH), the –OH group is directly attached to one of the sp² hybridized ring carbons of the benzene nucleus.'
    },
    {
      topic: 'Physical Properties & Boiling Points',
      question: 'Ethanol (m.w. 46) has a boiling point of 78.3°C, whereas Dimethyl ether (m.w. 46) boils at –24°C. The primary reason for this marked difference is:',
      options: [
        'Greater London dispersion forces in ethanol',
        'Extensive intermolecular hydrogen bonding in ethanol',
        'Dipole-dipole repulsion in dimethyl ether',
        'Higher polarity of C–O bonds in ethers'
      ],
      correct: 1,
      explanation: 'Ethanol contains polar O–H bonds allowing intermolecular hydrogen bonding. Dimethyl ether lacks O–H bonds and cannot form hydrogen bonds with itself.'
    },
    {
      topic: 'Acidity of Phenols',
      question: 'Phenol is approximately one million times more acidic than ethanol because:',
      options: [
        'The oxygen in phenol is less electronegative',
        'The phenoxide ion is stabilized by resonance delocalization into the benzene ring',
        'Phenol readily donates OH⁻ ions in solution',
        'The benzene ring possesses a strong positive inductive (+I) effect'
      ],
      correct: 1,
      explanation: 'The phenoxide conjugate base disperses its negative charge over the ortho and para positions of the aromatic ring across 5 resonance structures.'
    },
    {
      topic: 'Reaction with Active Metals',
      question: 'When ethanol reacts with sodium metal at room temperature, which gas is liberated?',
      options: [
        'Oxygen (O₂)',
        'Carbon dioxide (CO₂)',
        'Hydrogen (H₂)',
        'Methane (CH₄)'
      ],
      correct: 2,
      explanation: 'Active metals like Na displace the acidic proton in alcohols to form sodium ethoxide and evolve hydrogen gas (2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑).'
    },
    {
      topic: 'Distinguishing Reactions',
      question: 'Which of the following statements regarding the reaction of Phenol with bases is CORRECT?',
      options: [
        'Phenol reacts with both NaOH and NaHCO₃ to liberate CO₂ gas',
        'Phenol reacts with NaOH to form sodium phenoxide, but does NOT react with NaHCO₃',
        'Phenol does not react with either NaOH or NaHCO₃',
        'Phenol reacts with NaHCO₃ but fails to react with NaOH'
      ],
      correct: 1,
      explanation: 'Phenol is acidic enough to neutralize strong base NaOH (forming sodium phenoxide + water), but is weaker than carbonic acid (H₂CO₃), so it cannot liberate CO₂ from NaHCO₃.'
    },
    {
      topic: 'Oxidation of Alcohols',
      question: 'Oxidation of Propan-2-ol with acidified potassium dichromate (K₂Cr₂O₇/H₂SO₄) yields:',
      options: [
        'Propanal',
        'Propanoic acid',
        'Propanone (Acetone)',
        'Ethanoic acid'
      ],
      correct: 2,
      explanation: 'Propan-2-ol is a secondary (2°) alcohol; oxidation removes two hydrogen atoms to yield a ketone (Propanone).'
    },
    {
      topic: 'Oxidation Resistance',
      question: 'Which of the following compounds is generally resistant to oxidation by acidified K₂Cr₂O₇ under normal conditions?',
      options: [
        'Methanol',
        'Propan-1-ol',
        'Butan-2-ol',
        '2-Methylpropan-2-ol'
      ],
      correct: 3,
      explanation: '2-Methylpropan-2-ol is a tertiary (3°) alcohol. Since there is no α-hydrogen on the C–OH carbon, it cannot undergo dehydrogenation under ordinary conditions.'
    },
    {
      topic: 'Elimination & Dehydration',
      question: 'Heating ethanol with excess concentrated H₂SO₄ at 170°C produces:',
      options: [
        'Diethyl ether',
        'Ethene',
        'Ethanal',
        'Ethyl hydrogen sulphate'
      ],
      correct: 1,
      explanation: 'At 170°C, intramolecular dehydration dominates, converting ethanol into Ethene (CH₂=CH₂). At 140°C with excess ethanol, diethyl ether is produced.'
    },
    {
      topic: 'Esterification Mechanism',
      question: 'During the acid-catalyzed esterification of ethanoic acid with ethanol (CH₃COOH + C₂H₅OH), isotopic tracer studies establish that:',
      options: [
        'The –OH group is removed from ethanol and –H from ethanoic acid',
        'The –OH group is removed from ethanoic acid and –H from ethanol',
        'Both –H and –OH are lost from ethanol',
        'Both –H and –OH are lost from ethanoic acid'
      ],
      correct: 1,
      explanation: 'Using oxygen-18 (¹⁸O) labeled ethanol shows the ester retains the ¹⁸O tag, proving the –OH group is cleaved from the carboxylic acid and only –H from alcohol.'
    },
    {
      topic: 'Ethers Preparation',
      question: 'In Williamson Ether Synthesis, reacting Sodium Ethoxide (C₂H₅ONa) with 2-Bromo-2-methylpropane ((CH₃)₃C–Br) will yield primarily:',
      options: [
        'Ethyl tert-butyl ether',
        'Diethyl ether',
        '2-Methylpropene (Alkene)',
        'Di-tert-butyl ether'
      ],
      correct: 2,
      explanation: 'Alkoxide ions are strong bases. When reacted with a 3° alkyl halide, E2 elimination dominates over S<sub style="font-size:0.7em;">N</sub>2 substitution, yielding an alkene (2-Methylpropene) instead of an ether.'
    },
    {
      topic: 'Ether Cleavage',
      question: 'Cleavage of Ethyl methyl ether (C₂H₅–O–CH₃) with one mole of cold concentrated HI produces:',
      options: [
        'C₂H₅I + CH₃OH',
        'CH₃I + C₂H₅OH',
        'C₂H₅I + CH₃I',
        'C₂H₆ + CH₃I'
      ],
      correct: 1,
      explanation: 'With 1 mole of cold HI, the iodide nucleophile attacks the less sterically hindered methyl carbon (S<sub style="font-size:0.7em;">N</sub>2), producing Methyl iodide (CH₃I) and Ethanol (C₂H₅OH).'
    },
    {
      topic: 'Qualitative Tests for Phenol',
      question: 'When aqueous bromine water is added to phenol at room temperature, the characteristic observation is:',
      options: [
        'Evolution of brown NO₂ gas',
        'Formation of a white precipitate of 2,4,6-tribromophenol',
        'Formation of a red oily liquid',
        'Effervescence of hydrogen gas'
      ],
      correct: 1,
      explanation: 'The –OH group strongly activates the benzene ring, causing rapid electrophilic tribromination to yield a white precipitate of 2,4,6-tribromophenol.'
    },
    {
      topic: 'Qualitative Tests for Phenol',
      question: 'Phenol reacts with neutral ferric chloride (FeCl₃) solution to give an intense:',
      options: [
        'Blood red precipitate',
        'Violet / purple coloration',
        'Yellow crystalline solid',
        'Silver mirror'
      ],
      correct: 1,
      explanation: 'Phenol forms a characteristic purple/violet hexaphenoxidoferrate(III) complex ion [Fe(OC₆H₅)₆]³⁻ with neutral FeCl₃.'
    },
    {
      topic: 'Lucas Test',
      question: 'In the Lucas test (conc. HCl + anhy. ZnCl₂), which class of alcohol produces oily turbidity immediately at room temperature?',
      options: [
        'Primary (1°) alcohols',
        'Secondary (2°) alcohols',
        'Tertiary (3°) alcohols',
        'Phenols'
      ],
      correct: 2,
      explanation: 'Tertiary alcohols react immediately (within seconds) to form an insoluble alkyl chloride via a highly stable 3° carbocation intermediate.'
    },
    {
      topic: 'Iodoform Test',
      question: 'Which of the following is the ONLY primary alcohol that gives a positive yellow precipitate with I₂ and NaOH (Iodoform Test)?',
      options: [
        'Methanol',
        'Ethanol',
        'Propan-1-ol',
        'Butan-1-ol'
      ],
      correct: 1,
      explanation: 'Ethanol (CH₃CH₂OH) is the only primary alcohol with a terminal methyl group adjacent to the –CH(OH)– unit that oxidizes to ethanal and yields iodoform (CHI₃).'
    },
    {
      topic: 'Preparation of Alcohols',
      question: 'Industrial fermentation of molasses/glucose to ethanol relies on which yeast enzyme for the final conversion of glucose into ethanol and CO₂?',
      options: [
        'Invertase',
        'Zymase',
        'Diastase',
        'Maltase'
      ],
      correct: 1,
      explanation: 'Zymase, an enzyme complex secreted by yeast cells, catalyzes the anaerobic fermentation of glucose (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂).'
    },
    {
      topic: 'Nitration of Phenol',
      question: 'Reacting phenol with concentrated HNO₃ in the presence of concentrated H₂SO₄ produces:',
      options: [
        'o-Nitrophenol',
        'p-Nitrophenol',
        '2,4,6-Trinitrophenol (Picric Acid)',
        'Benzoic acid'
      ],
      correct: 2,
      explanation: 'Under concentrated nitrating mixture conditions, phenol undergoes electrophilic substitution at all available ortho and para positions yielding 2,4,6-trinitrophenol (Picric acid).'
    },
    {
      topic: 'Ether Structure & Bonds',
      question: 'Why are ethers relatively chemically inert and widely used as laboratory solvents?',
      options: [
        'They have unstable resonance structures',
        'They lack active acidic hydrogen (O–H) and have no electrophilic centers susceptible to bases/reducing agents',
        'They are completely non-polar molecules',
        'Their C–O bonds cannot be cleaved under any conditions'
      ],
      correct: 1,
      explanation: 'Ethers lack acidic protons and are resistant to attack by bases, active metals, and mild oxidizing agents at room temperature.'
    },
    {
      topic: 'IUPAC Nomenclature',
      question: 'What is the correct IUPAC name for the compound: (CH₃)₂CH–CH(OH)–CH₃?',
      options: [
        '2-Methylbutan-3-ol',
        '3-Methylbutan-2-ol',
        '2-Isopropylpropan-2-ol',
        'Pentanol'
      ],
      correct: 1,
      explanation: 'Number the longest 4-carbon chain from the end nearest to the –OH group: carbon #2 bears the –OH group and carbon #3 carries a methyl substituent, giving 3-Methylbutan-2-ol.'
    }
  ];

  let currentQIdx = 0;
  let userAnswers = Array(mcqQuestions.length).fill(null);

  const activeView = document.getElementById('quizActiveView');
  const resultsCard = document.getElementById('quizResultsCard');
  const qIndexEl = document.getElementById('quizQIndex');
  const qTotalEl = document.getElementById('quizQTotal');
  const scoreCurrentEl = document.getElementById('quizScoreCurrent');
  const answeredCountEl = document.getElementById('quizAnsweredCount');
  const categoryTag = document.getElementById('quizCategoryTag');
  const questionText = document.getElementById('quizQuestionText');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const explanationBox = document.getElementById('quizExplanationBox');
  const explanationHeader = document.getElementById('quizExplanationHeader');
  const explanationText = document.getElementById('quizExplanationText');
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const retryBtn = document.getElementById('retryQuizBtn');

  function calculateScore() {
    return userAnswers.reduce((acc, ans, idx) => {
      return (ans === mcqQuestions[idx].correct) ? acc + 1 : acc;
    }, 0);
  }

  function renderQuestion(idx) {
    const q = mcqQuestions[idx];
    if (qIndexEl) qIndexEl.innerText = `${idx + 1}`;
    if (qTotalEl) qTotalEl.innerText = `${mcqQuestions.length}`;
    if (categoryTag) categoryTag.innerText = `Topic: ${q.topic}`;
    if (questionText) questionText.innerText = q.question;

    const answeredTotal = userAnswers.filter(a => a !== null).length;
    if (answeredCountEl) answeredCountEl.innerText = `${answeredTotal}`;
    if (scoreCurrentEl) scoreCurrentEl.innerText = `${calculateScore()}`;

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="option-prefix">${letters[optIdx]}</span>
          <span>${opt}</span>
        `;

        if (userAnswers[idx] !== null) {
          btn.disabled = true;
          if (optIdx === q.correct) {
            btn.classList.add('opt-correct');
          } else if (optIdx === userAnswers[idx]) {
            btn.classList.add('opt-wrong');
          }
        } else {
          btn.addEventListener('click', () => {
            selectOption(idx, optIdx);
          });
        }

        optionsContainer.appendChild(btn);
      });
    }

    if (userAnswers[idx] !== null) {
      const isCorrect = (userAnswers[idx] === q.correct);
      if (explanationBox) {
        explanationBox.classList.add('show');
        if (explanationHeader) {
          explanationHeader.style.color = isCorrect ? '#15803d' : '#b91c1c';
          explanationHeader.innerText = isCorrect ? '✓ Correct Answer!' : '✕ Incorrect Selection';
        }
        if (explanationText) {
          explanationText.innerHTML = q.explanation;
        }
      }
    } else {
      if (explanationBox) explanationBox.classList.remove('show');
    }

    if (prevBtn) prevBtn.style.display = (idx > 0) ? 'inline-flex' : 'none';
    if (nextBtn) {
      nextBtn.innerText = (idx === mcqQuestions.length - 1) ? 'Finish & View Score' : 'Next Question →';
    }
  }

  function selectOption(qIdx, optIdx) {
    if (userAnswers[qIdx] !== null) return;
    userAnswers[qIdx] = optIdx;
    renderQuestion(qIdx);
  }

  function showResults() {
    if (activeView) activeView.style.display = 'none';
    if (resultsCard) resultsCard.classList.add('show');

    const finalScore = calculateScore();
    const total = mcqQuestions.length;
    const percentage = Math.round((finalScore / total) * 100);

    const scoreNum = document.getElementById('resScoreNum');
    const correctCount = document.getElementById('resCorrectCount');
    const wrongCount = document.getElementById('resWrongCount');
    const percentCount = document.getElementById('resPercentCount');
    const heading = document.getElementById('resVerdictHeading');
    const message = document.getElementById('resVerdictMessage');

    if (scoreNum) scoreNum.innerText = `${finalScore}`;
    if (correctCount) correctCount.innerText = `${finalScore}`;
    if (wrongCount) wrongCount.innerText = `${total - finalScore}`;
    if (percentCount) percentCount.innerText = `${percentage}%`;

    if (heading && message) {
      if (percentage >= 85) {
        heading.innerText = '🏆 Outstanding Mastery!';
        message.innerText = `You scored ${percentage}%. You have demonstrated solid command over Alcohols, Phenols, and Ethers reaction pathways and distinctions for MDCAT.`;
      } else if (percentage >= 65) {
        heading.innerText = '👍 Good Effort!';
        message.innerText = `You scored ${percentage}%. Review the high-yield reaction lab cards and flashcards to solidify distinguishing tests.`;
      } else {
        heading.innerText = '📚 Revision Recommended';
        message.innerText = `You scored ${percentage}%. Review the oxidation pathways, Williamson ether synthesis, and acidity comparisons, then retry the quiz!`;
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQIdx > 0) {
        currentQIdx--;
        renderQuestion(currentQIdx);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQIdx < mcqQuestions.length - 1) {
        currentQIdx++;
        renderQuestion(currentQIdx);
      } else {
        showResults();
      }
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = Array(mcqQuestions.length).fill(null);
      currentQIdx = 0;
      if (resultsCard) resultsCard.classList.remove('show');
      if (activeView) activeView.style.display = 'block';
      renderQuestion(0);
    });
  }

  renderQuestion(0);
}

/* ==========================================================================
   11. CHAPTER COMPLETION (LOCALSTORAGE)
   ========================================================================== */
function initChapterCompletion() {
  const STORAGE_KEY = 'mdcat_chapter_completed_alcohols';
  const completeBtn = document.getElementById('toggleCompleteChapterBtn');
  const btnIcon = document.getElementById('completeBtnIcon');
  const btnText = document.getElementById('completeBtnText');

  let isCompleted = (localStorage.getItem(STORAGE_KEY) === 'true');

  function updateStatus() {
    if (!completeBtn || !btnText) return;
    if (isCompleted) {
      completeBtn.style.background = '#15803d';
      if (btnIcon) btnIcon.innerText = '✓';
      btnText.innerText = 'Alcohols & Phenols Chapter Completed';
    } else {
      completeBtn.style.background = 'var(--accent-emerald)';
      if (btnIcon) btnIcon.innerText = '✓';
      btnText.innerText = 'Mark Chapter as Completed';
    }
  }

  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      isCompleted = !isCompleted;
      localStorage.setItem(STORAGE_KEY, isCompleted ? 'true' : 'false');
      updateStatus();
    });
  }

  updateStatus();
}

/* ==========================================================================
   12. BACK TO TOP FLOATING BUTTON
   ========================================================================== */
function initBackToTop() {
  const backTopBtn = document.getElementById('floatingBackTop');
  if (!backTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backTopBtn.classList.add('visible');
    } else {
      backTopBtn.classList.remove('visible');
    }
  });

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
