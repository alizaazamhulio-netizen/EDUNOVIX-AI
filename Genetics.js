/**
 * ==========================================================================
 * MDCAT Biology — Genetics Laboratory & Learning Platform
 * JavaScript Engine (genetics.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- STATE MANAGEMENT & LOCAL STORAGE ---
  const STORAGE_KEY = 'mdcat_genetics_progress_v2';

  let appProgress = {
    activitiesCompleted: {},
    mcqAttempted: 0,
    mcqScore: 0,
    notesViewed: 0,
    lastUpdated: Date.now()
  };

  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        appProgress = Object.assign(appProgress, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    updateProgressUI();
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appProgress));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
    updateProgressUI();
  }

  function markActivity(activityId) {
    if (!appProgress.activitiesCompleted[activityId]) {
      appProgress.activitiesCompleted[activityId] = true;
      saveProgress();
    }
  }

  function updateProgressUI() {
    const actCount = Object.keys(appProgress.activitiesCompleted).length;
    const totalActivities = 10; // Key interactive checkpoints
    const actPercent = Math.min(100, Math.round((actCount / totalActivities) * 50));
    
    // MCQ contribution (up to 50%)
    const mcqPercent = appProgress.mcqAttempted > 0 
      ? Math.min(50, Math.round((appProgress.mcqScore / Math.max(1, appProgress.mcqAttempted)) * 50)) 
      : 0;

    const totalCompletion = Math.min(100, actPercent + mcqPercent);

    const percentEl = document.getElementById('progress-percentage-val');
    const fillEl = document.getElementById('progress-bar-fill');
    const actCountEl = document.getElementById('activities-done-count');
    const mcqScoreEl = document.getElementById('mcq-latest-score-display');

    if (percentEl) percentEl.textContent = `${totalCompletion}%`;
    if (fillEl) fillEl.style.width = `${totalCompletion}%`;
    if (actCountEl) actCountEl.textContent = `${actCount}/${totalActivities}`;
    if (mcqScoreEl) {
      mcqScoreEl.textContent = appProgress.mcqAttempted > 0 
        ? `${appProgress.mcqScore}/${appProgress.mcqAttempted}` 
        : '0/0';
    }
  }

  // --- NAVIGATION & SCROLL TRACKING ---
  const progressBar = document.getElementById('scroll-progress-bar');
  const navBar = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${scrollPercent}%`;
    if (navBar) {
      if (scrollTop > 40) {
        navBar.classList.add('scrolled');
      } else {
        navBar.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburger-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Reset Progress Button
  const resetBtn = document.getElementById('btn-reset-progress');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your Genetics progress and MCQ scores?')) {
        appProgress = {
          activitiesCompleted: {},
          mcqAttempted: 0,
          mcqScore: 0,
          notesViewed: 0,
          lastUpdated: Date.now()
        };
        localStorage.removeItem(STORAGE_KEY);
        updateProgressUI();
        alert('Genetics progress has been reset.');
      }
    });
  }

  // --- HERO HIERARCHY INTERACTIVE VISUAL ---
  const hierarchyNodes = document.querySelectorAll('.hierarchy-node');
  const hierarchyPreview = document.getElementById('hierarchy-preview-text');

  const hierarchyData = {
    dna: '<strong>DNA (Deoxyribonucleic Acid):</strong> Polymer composed of nucleotide subunits (deoxyribose sugar, phosphate, and nitrogenous base) storing hereditary instructions in an antiparallel double helix.',
    gene: '<strong>Gene:</strong> Specific nucleotide sequence on DNA encoding a functional peptide chain or RNA molecule. The fundamental physical and functional unit of heredity.',
    chromosome: '<strong>Chromosome:</strong> Compact nuclear structure containing a single long DNA molecule condensed around basic histone proteins. Humans contain 46 chromosomes (23 homologous pairs).',
    genome: '<strong>Genome:</strong> The complete, collective set of genetic material (nuclear + mitochondrial) present in an organism or individual cell.'
  };

  hierarchyNodes.forEach(node => {
    node.addEventListener('click', () => {
      hierarchyNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const key = node.getAttribute('data-level');
      if (hierarchyPreview && hierarchyData[key]) {
        hierarchyPreview.innerHTML = hierarchyData[key];
      }
      markActivity('hierarchy_visual');
    });
  });

  // --- BASE PAIRING TOOL (Section 3) ---
  const baseButtons = document.querySelectorAll('.btn-base');
  const baseTileLeft = document.getElementById('base-tile-left');
  const baseTileRight = document.getElementById('base-tile-right');
  const baseBondsContainer = document.getElementById('base-bonds-container');
  const pairingDetailsText = document.getElementById('pairing-details-text');

  const baseComplements = {
    A: { partner: 'T', bonds: 2, name: 'Adenine', partName: 'Thymine', type: 'Purine (2 rings)', partType: 'Pyrimidine (1 ring)' },
    T: { partner: 'A', bonds: 2, name: 'Thymine', partName: 'Adenine', type: 'Pyrimidine (1 ring)', partType: 'Purine (2 rings)' },
    G: { partner: 'C', bonds: 3, name: 'Guanine', partName: 'Cytosine', type: 'Purine (2 rings)', partType: 'Pyrimidine (1 ring)' },
    C: { partner: 'G', bonds: 3, name: 'Cytosine', partName: 'Guanine', type: 'Pyrimidine (1 ring)', partType: 'Purine (2 rings)' }
  };

  baseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      baseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.getAttribute('data-base');
      const comp = baseComplements[selected];

      if (baseTileLeft && baseTileRight && comp) {
        baseTileLeft.innerHTML = `${selected}<small>${comp.name}</small>`;
        baseTileLeft.style.background = getBaseColor(selected);

        baseTileRight.innerHTML = `${comp.partner}<small>${comp.partName}</small>`;
        baseTileRight.style.background = getBaseColor(comp.partner);

        // Hydrogen bonds lines
        if (baseBondsContainer) {
          baseBondsContainer.innerHTML = '';
          for (let i = 0; i < comp.bonds; i++) {
            const line = document.createElement('div');
            line.className = 'h-bond-line';
            baseBondsContainer.appendChild(line);
          }
        }

        if (pairingDetailsText) {
          pairingDetailsText.innerHTML = `
            <strong>${comp.name} (${selected})</strong> pairs specifically with <strong>${comp.partName} (${comp.partner})</strong> via <strong>${comp.bonds} Hydrogen Bonds</strong>.<br>
            • ${selected} is a ${comp.type}.<br>
            • ${comp.partner} is a ${comp.partType}.<br>
            <span style="color: var(--emerald-primary); font-weight: 600;">MDCAT Rule:</span> Purine always pairs with Pyrimidine, maintaining a uniform 2.0 nm diameter across the DNA double helix.
          `;
        }
        markActivity('base_pairing');
      }
    });
  });

  function getBaseColor(base) {
    switch (base) {
      case 'A': return '#ef4444';
      case 'T': return '#3b82f6';
      case 'G': return '#10b981';
      case 'C': return '#f59e0b';
      case 'U': return '#ec4899';
      default: return '#64748b';
    }
  }

  // --- DNA REPLICATION SIMULATOR (Section 4) ---
  const runReplBtn = document.getElementById('btn-run-replication');
  const replStepDesc = document.getElementById('repl-step-desc');
  const leadingTrack = document.getElementById('leading-new-track');
  const laggingTrack = document.getElementById('lagging-new-track');
  const replProgressBadge = document.getElementById('repl-progress-badge');

  const leadingSequence = ['T', 'G', 'C', 'A', 'A', 'T', 'G', 'C'];
  const laggingSequence = ['A', 'C', 'G', 'T', 'T', 'A', 'C', 'G'];

  let replStep = 0;
  let replRunning = false;

  const replSteps = [
    {
      label: 'Step 1: Helicase Unwinds DNA',
      desc: '<strong>Helicase</strong> binds to replication origins, breaking hydrogen bonds between complementary base pairs to create the replication fork.',
      action: () => {
        clearReplTracks();
        if (replProgressBadge) replProgressBadge.textContent = 'Stage 1/5: Unwinding';
      }
    },
    {
      label: 'Step 2: Primase Synthesizes RNA Primers',
      desc: '<strong>Primase</strong> synthesizes short RNA primers (5\' → 3\') providing free 3\'-OH groups required by DNA Polymerase III.',
      action: () => {
        if (leadingTrack && leadingTrack.children[0]) {
          leadingTrack.children[0].className = 'base-pill base-U synthesized';
          leadingTrack.children[0].textContent = 'U';
        }
        if (laggingTrack && laggingTrack.children[0]) {
          laggingTrack.children[0].className = 'base-pill base-U synthesized';
          laggingTrack.children[0].textContent = 'U';
        }
        if (replProgressBadge) replProgressBadge.textContent = 'Stage 2/5: Priming';
      }
    },
    {
      label: 'Step 3: Continuous Synthesis of Leading Strand',
      desc: '<strong>DNA Polymerase III</strong> extends the leading strand continuously in the 5\' → 3\' direction, moving towards the advancing replication fork.',
      action: () => {
        if (leadingTrack) {
          for (let i = 1; i < leadingSequence.length; i++) {
            const b = leadingSequence[i];
            leadingTrack.children[i].className = `base-pill base-${b} synthesized`;
            leadingTrack.children[i].textContent = b;
          }
        }
        if (replProgressBadge) replProgressBadge.textContent = 'Stage 3/5: Leading Synthesis';
      }
    },
    {
      label: 'Step 4: Discontinuous Synthesis (Okazaki Fragments)',
      desc: 'On the lagging strand, <strong>DNA Polymerase III</strong> synthesizes short <strong>Okazaki fragments</strong> away from the fork in discontinuous bursts.',
      action: () => {
        if (laggingTrack) {
          for (let i = 1; i < 4; i++) {
            const b = laggingSequence[i];
            laggingTrack.children[i].className = `base-pill base-${b} synthesized`;
            laggingTrack.children[i].textContent = b;
          }
          if (laggingTrack.children[4]) {
            laggingTrack.children[4].className = 'base-pill base-U synthesized';
            laggingTrack.children[4].textContent = 'U';
          }
          for (let i = 5; i < laggingSequence.length; i++) {
            const b = laggingSequence[i];
            laggingTrack.children[i].className = `base-pill base-${b} synthesized`;
            laggingTrack.children[i].textContent = b;
          }
        }
        if (replProgressBadge) replProgressBadge.textContent = 'Stage 4/5: Okazaki Fragments';
      }
    },
    {
      label: 'Step 5: DNA Ligase Seals the Nicks',
      desc: '<strong>DNA Polymerase I</strong> replaces RNA primers with DNA nucleotides, and <strong>DNA Ligase</strong> seals phosphodiester nicks. Two semiconservative double helices are complete!',
      action: () => {
        if (leadingTrack && leadingTrack.children[0]) {
          leadingTrack.children[0].className = 'base-pill base-T synthesized';
          leadingTrack.children[0].textContent = 'T';
        }
        if (laggingTrack && laggingTrack.children[0]) {
          laggingTrack.children[0].className = 'base-pill base-A synthesized';
          laggingTrack.children[0].textContent = 'A';
        }
        if (laggingTrack && laggingTrack.children[4]) {
          laggingTrack.children[4].className = 'base-pill base-T synthesized';
          laggingTrack.children[4].textContent = 'T';
        }
        if (replProgressBadge) replProgressBadge.textContent = 'Stage 5/5: Ligase Sealing — Complete!';
        markActivity('dna_replication');
      }
    }
  ];

  function clearReplTracks() {
    if (leadingTrack) {
      leadingTrack.innerHTML = '';
      for (let i = 0; i < leadingSequence.length; i++) {
        const span = document.createElement('span');
        span.className = 'base-pill ghost';
        span.textContent = '·';
        leadingTrack.appendChild(span);
      }
    }
    if (laggingTrack) {
      laggingTrack.innerHTML = '';
      for (let i = 0; i < laggingSequence.length; i++) {
        const span = document.createElement('span');
        span.className = 'base-pill ghost';
        span.textContent = '·';
        laggingTrack.appendChild(span);
      }
    }
  }

  if (runReplBtn) {
    clearReplTracks();
    runReplBtn.addEventListener('click', () => {
      if (replRunning) return;
      replRunning = true;
      runReplBtn.disabled = true;
      replStep = 0;

      function executeNextStep() {
        if (replStep < replSteps.length) {
          const current = replSteps[replStep];
          if (replStepDesc) {
            replStepDesc.innerHTML = `<h5 style="color: var(--teal-primary); margin-bottom: 0.25rem;">${current.label}</h5>${current.desc}`;
          }
          current.action();
          replStep++;
          setTimeout(executeNextStep, 1400);
        } else {
          replRunning = false;
          runReplBtn.disabled = false;
          runReplBtn.textContent = 'Re-run Replication Simulation';
        }
      }

      executeNextStep();
    });
  }

  // --- CENTRAL DOGMA INTERACTIVE (Section 5) ---
  const dogmaCards = document.querySelectorAll('.dogma-arrow-card');
  const dogmaDetailBox = document.getElementById('dogma-detail-content');

  const dogmaData = {
    replication: {
      title: 'DNA Replication (DNA → DNA)',
      text: 'Occurs during the S-phase of interphase in the nucleus. Helicase unwinds the double helix, and DNA Polymerase synthesizes new complementary strands semiconservatively in the 5\' → 3\' direction.'
    },
    transcription: {
      title: 'Transcription (DNA → RNA)',
      text: 'RNA Polymerase reads the template DNA strand (3\' → 5\') to synthesize pre-mRNA (5\' → 3\'). Uracil (U) is incorporated in place of Thymine (T). Occurs inside the eukaryotic nucleus.'
    },
    translation: {
      title: 'Translation (mRNA → Protein)',
      text: 'Ribosomes decode triplet codons in mature mRNA. tRNAs deliver corresponding amino acids matching their anticodon loops, forming peptide bonds to synthesize polypeptides.'
    }
  };

  dogmaCards.forEach(card => {
    card.addEventListener('click', () => {
      dogmaCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const process = card.getAttribute('data-process');
      if (dogmaDetailBox && dogmaData[process]) {
        dogmaDetailBox.innerHTML = `
          <h4 style="color: var(--teal-primary); margin-bottom: 0.5rem;">${dogmaData[process].title}</h4>
          <p style="margin: 0; color: var(--text-secondary);">${dogmaData[process].text}</p>
        `;
      }
      markActivity('central_dogma');
    });
  });

  // --- TRANSCRIPTION SIMULATOR (Section 6) ---
  const transcribeBtn = document.getElementById('btn-run-transcription');
  const mrnaTrack = document.getElementById('transcription-mrna-track');
  const transcripNotes = document.getElementById('transcription-notes-box');

  const templateBases = ['3\'', 'T', 'A', 'C', 'G', 'T', 'T', 'A', 'G', 'C', 'A', '5\''];
  const mrnaComplements = ['5\'', 'A', 'U', 'G', 'C', 'A', 'A', 'U', 'C', 'G', 'U', '3\''];

  if (transcribeBtn && mrnaTrack) {
    transcribeBtn.addEventListener('click', () => {
      mrnaTrack.innerHTML = '';
      transcribeBtn.disabled = true;
      let idx = 0;

      function addBase() {
        if (idx < mrnaComplements.length) {
          const char = mrnaComplements[idx];
          const span = document.createElement('span');
          span.className = char === '5\'' || char === '3\'' ? 'strand-label' : `base-pill base-${char} synthesized`;
          span.textContent = char;
          span.style.margin = '2px';
          mrnaTrack.appendChild(span);
          idx++;
          setTimeout(addBase, 200);
        } else {
          transcribeBtn.disabled = false;
          if (transcripNotes) {
            transcripNotes.innerHTML = `
              <strong>Transcription Complete:</strong> Notice that DNA Template <code>3'-TAC-5'</code> transcribed into mRNA <code>5'-AUG-3'</code> (Start Codon). Thymine is replaced by <strong>Uracil (U)</strong> in RNA!
            `;
          }
          markActivity('transcription');
        }
      }

      addBase();
    });
  }

  // --- RNA PROCESSING BEFORE/AFTER (Section 7) ---
  const toggleSplicingBtn = document.getElementById('btn-toggle-splicing');
  const intronSegments = document.querySelectorAll('.segment-intron');
  const splicingStatusText = document.getElementById('splicing-status-text');
  let isSpliced = false;

  if (toggleSplicingBtn) {
    toggleSplicingBtn.addEventListener('click', () => {
      isSpliced = !isSpliced;
      intronSegments.forEach(intron => {
        if (isSpliced) {
          intron.classList.add('spliced');
        } else {
          intron.classList.remove('spliced');
        }
      });

      if (splicingStatusText) {
        splicingStatusText.innerHTML = isSpliced
          ? '<strong>Mature mRNA Formed:</strong> Introns spliced out by spliceosomes. Exons E1-E2-E3 ligated with <strong>5\' 7-methylguanosine cap</strong> and <strong>3\' Poly-A tail</strong> for nuclear export and ribosome stability.'
          : '<strong>Pre-mRNA (Primary Transcript):</strong> Contains alternating coding <em>Exons</em> and non-coding intervening <em>Introns</em>.';
      }

      toggleSplicingBtn.textContent = isSpliced ? 'Reset to Pre-mRNA' : 'Perform Splicing & Capping';
      markActivity('rna_processing');
    });
  }

  // --- CODON EXPLORER (Section 9) ---
  const codonTable = {
    UUU: { aa: 'Phenylalanine (Phe)', code: 'F', prop: 'Non-polar, hydrophobic' },
    UUC: { aa: 'Phenylalanine (Phe)', code: 'F', prop: 'Non-polar, hydrophobic' },
    UUA: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    UUG: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    UCU: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    UCC: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    UCA: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    UCG: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    UAU: { aa: 'Tyrosine (Tyr)', code: 'Y', prop: 'Polar, aromatic' },
    UAC: { aa: 'Tyrosine (Tyr)', code: 'Y', prop: 'Polar, aromatic' },
    UAA: { aa: 'STOP (Ochre)', code: 'Stop', prop: 'Nonsense / Termination codon' },
    UAG: { aa: 'STOP (Amber)', code: 'Stop', prop: 'Nonsense / Termination codon' },
    UGU: { aa: 'Cysteine (Cys)', code: 'C', prop: 'Polar, forms disulfide bridges' },
    UGC: { aa: 'Cysteine (Cys)', code: 'C', prop: 'Polar, forms disulfide bridges' },
    UGA: { aa: 'STOP (Opal)', code: 'Stop', prop: 'Nonsense / Termination codon' },
    UGG: { aa: 'Tryptophan (Trp)', code: 'W', prop: 'Non-polar, aromatic' },

    CUU: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    CUC: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    CUA: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    CUG: { aa: 'Leucine (Leu)', code: 'L', prop: 'Non-polar, aliphatic' },
    CCU: { aa: 'Proline (Pro)', code: 'P', prop: 'Non-polar, cyclic ring' },
    CCC: { aa: 'Proline (Pro)', code: 'P', prop: 'Non-polar, cyclic ring' },
    CCA: { aa: 'Proline (Pro)', code: 'P', prop: 'Non-polar, cyclic ring' },
    CCG: { aa: 'Proline (Pro)', code: 'P', prop: 'Non-polar, cyclic ring' },
    CAU: { aa: 'Histidine (His)', code: 'H', prop: 'Positively charged, basic' },
    CAC: { aa: 'Histidine (His)', code: 'H', prop: 'Positively charged, basic' },
    CAA: { aa: 'Glutamine (Gln)', code: 'Q', prop: 'Polar, uncharged' },
    CAG: { aa: 'Glutamine (Gln)', code: 'Q', prop: 'Polar, uncharged' },
    CGU: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },
    CGC: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },
    CGA: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },
    CGG: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },

    AUU: { aa: 'Isoleucine (Ile)', code: 'I', prop: 'Non-polar, hydrophobic' },
    AUC: { aa: 'Isoleucine (Ile)', code: 'I', prop: 'Non-polar, hydrophobic' },
    AUA: { aa: 'Isoleucine (Ile)', code: 'I', prop: 'Non-polar, hydrophobic' },
    AUG: { aa: 'Methionine (Met) / START', code: 'M', prop: 'Initiation codon (Universal Start)' },
    ACU: { aa: 'Threonine (Thr)', code: 'T', prop: 'Polar, uncharged' },
    ACC: { aa: 'Threonine (Thr)', code: 'T', prop: 'Polar, uncharged' },
    ACA: { aa: 'Threonine (Thr)', code: 'T', prop: 'Polar, uncharged' },
    ACG: { aa: 'Threonine (Thr)', code: 'T', prop: 'Polar, uncharged' },
    AAU: { aa: 'Asparagine (Asn)', code: 'N', prop: 'Polar, uncharged' },
    AAC: { aa: 'Asparagine (Asn)', code: 'N', prop: 'Polar, uncharged' },
    AAA: { aa: 'Lysine (Lys)', code: 'K', prop: 'Positively charged, basic' },
    AAG: { aa: 'Lysine (Lys)', code: 'K', prop: 'Positively charged, basic' },
    AGU: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    AGC: { aa: 'Serine (Ser)', code: 'S', prop: 'Polar, uncharged' },
    AGA: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },
    AGG: { aa: 'Arginine (Arg)', code: 'R', prop: 'Positively charged, basic' },

    GUU: { aa: 'Valine (Val)', code: 'V', prop: 'Non-polar, branched chain' },
    GUC: { aa: 'Valine (Val)', code: 'V', prop: 'Non-polar, branched chain' },
    GUA: { aa: 'Valine (Val)', code: 'V', prop: 'Non-polar, branched chain' },
    GUG: { aa: 'Valine (Val)', code: 'V', prop: 'Non-polar, branched chain' },
    GCU: { aa: 'Alanine (Ala)', code: 'A', prop: 'Non-polar, aliphatic' },
    GCC: { aa: 'Alanine (Ala)', code: 'A', prop: 'Non-polar, aliphatic' },
    GCA: { aa: 'Alanine (Ala)', code: 'A', prop: 'Non-polar, aliphatic' },
    GCG: { aa: 'Alanine (Ala)', code: 'A', prop: 'Non-polar, aliphatic' },
    GAU: { aa: 'Aspartate (Asp)', code: 'D', prop: 'Negatively charged, acidic' },
    GAC: { aa: 'Aspartate (Asp)', code: 'D', prop: 'Negatively charged, acidic' },
    GAA: { aa: 'Glutamate (Glu)', code: 'E', prop: 'Negatively charged, acidic' },
    GAG: { aa: 'Glutamate (Glu)', code: 'E', prop: 'Negatively charged, acidic' },
    GGU: { aa: 'Glycine (Gly)', code: 'G', prop: 'Smallest amino acid, achiral' },
    GGC: { aa: 'Glycine (Gly)', code: 'G', prop: 'Smallest amino acid, achiral' },
    GGA: { aa: 'Glycine (Gly)', code: 'G', prop: 'Smallest amino acid, achiral' },
    GGG: { aa: 'Glycine (Gly)', code: 'G', prop: 'Smallest amino acid, achiral' }
  };

  let selBase1 = 'A';
  let selBase2 = 'U';
  let selBase3 = 'G';

  const b1Btns = document.querySelectorAll('#b1-group .btn-codon-base');
  const b2Btns = document.querySelectorAll('#b2-group .btn-codon-base');
  const b3Btns = document.querySelectorAll('#b3-group .btn-codon-base');

  const codonBadge = document.getElementById('codon-display-badge');
  const aminoAcidName = document.getElementById('amino-acid-name-display');
  const codonStatusPill = document.getElementById('codon-status-pill');
  const codonPropsText = document.getElementById('codon-properties-text');

  function updateCodonDisplay() {
    const triplet = `${selBase1}${selBase2}${selBase3}`;
    const info = codonTable[triplet] || { aa: 'Unknown', code: '?', prop: 'Standard codon' };

    if (codonBadge) codonBadge.textContent = triplet;
    if (aminoAcidName) aminoAcidName.textContent = info.aa;
    if (codonPropsText) codonPropsText.textContent = info.prop;

    if (codonStatusPill) {
      codonStatusPill.className = 'codon-status-pill';
      if (triplet === 'AUG') {
        codonStatusPill.classList.add('status-start');
        codonStatusPill.textContent = 'START CODON (Met)';
      } else if (['UAA', 'UAG', 'UGA'].includes(triplet)) {
        codonStatusPill.classList.add('status-stop');
        codonStatusPill.textContent = 'STOP CODON (Nonsense)';
      } else {
        codonStatusPill.classList.add('status-standard');
        codonStatusPill.textContent = `Sense Codon (Single Letter: ${info.code})`;
      }
    }
  }

  function setupCodonButtons(buttons, setter) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setter(btn.getAttribute('data-base'));
        updateCodonDisplay();
        markActivity('codon_explorer');
      });
    });
  }

  setupCodonButtons(b1Btns, b => selBase1 = b);
  setupCodonButtons(b2Btns, b => selBase2 = b);
  setupCodonButtons(b3Btns, b => selBase3 = b);
  updateCodonDisplay();

  // --- REAL DYNAMIC PUNNETT SQUARE (Section 11) ---
  let p1Geno = 'Aa';
  let p2Geno = 'Aa';

  const p1Btns = document.querySelectorAll('.btn-p1');
  const p2Btns = document.querySelectorAll('.btn-p2');

  function calculatePunnett() {
    const gametes1 = [p1Geno[0], p1Geno[1]];
    const gametes2 = [p2Geno[0], p2Geno[1]];

    // Header gametes
    const gTop1 = document.getElementById('p-top-1');
    const gTop2 = document.getElementById('p-top-2');
    const gLeft1 = document.getElementById('p-left-1');
    const gLeft2 = document.getElementById('p-left-2');

    if (gTop1) gTop1.textContent = gametes2[0];
    if (gTop2) gTop2.textContent = gametes2[1];
    if (gLeft1) gLeft1.textContent = gametes1[0];
    if (gLeft2) gLeft2.textContent = gametes1[1];

    // Combine alleles
    function combine(a, b) {
      // Capital letter first for consistency
      if (a === 'A' && b === 'a') return 'Aa';
      if (a === 'a' && b === 'A') return 'Aa';
      return a + b;
    }

    const cells = [
      combine(gametes1[0], gametes2[0]),
      combine(gametes1[0], gametes2[1]),
      combine(gametes1[1], gametes2[0]),
      combine(gametes1[1], gametes2[1])
    ];

    const c11 = document.getElementById('cell-1-1');
    const c12 = document.getElementById('cell-1-2');
    const c21 = document.getElementById('cell-2-1');
    const c22 = document.getElementById('cell-2-2');

    if (c11) c11.textContent = cells[0];
    if (c12) c12.textContent = cells[1];
    if (c21) c21.textContent = cells[2];
    if (c22) c22.textContent = cells[3];

    // Calculate Frequencies
    let countAA = 0, countAa = 0, countaa = 0;
    cells.forEach(g => {
      if (g === 'AA') countAA++;
      else if (g === 'Aa') countAa++;
      else if (g === 'aa') countaa++;
    });

    const pctAA = (countAA / 4) * 100;
    const pctAa = (countAa / 4) * 100;
    const pctaa = (countaa / 4) * 100;

    const domPhenoPct = ((countAA + countAa) / 4) * 100;
    const recPhenoPct = (countaa / 4) * 100;

    const genoRatioText = document.getElementById('punnett-geno-ratio-text');
    const phenoRatioText = document.getElementById('punnett-pheno-ratio-text');

    if (genoRatioText) {
      genoRatioText.innerHTML = `
        <strong>AA:</strong> ${pctAA}% (${countAA}/4) &nbsp;|&nbsp;
        <strong>Aa:</strong> ${pctAa}% (${countAa}/4) &nbsp;|&nbsp;
        <strong>aa:</strong> ${pctaa}% (${countaa}/4)
      `;
    }

    if (phenoRatioText) {
      phenoRatioText.innerHTML = `
        <span style="color: var(--teal-primary); font-weight: 700;">Dominant Phenotype:</span> ${domPhenoPct}% (${countAA + countAa}/4)<br>
        <span style="color: #64748b; font-weight: 700;">Recessive Phenotype:</span> ${recPhenoPct}% (${countaa}/4)
      `;
    }

    const domBar = document.getElementById('pheno-bar-dom');
    const recBar = document.getElementById('pheno-bar-rec');

    if (domBar) domBar.style.width = `${domPhenoPct}%`;
    if (recBar) recBar.style.width = `${recPhenoPct}%`;
  }

  p1Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      p1Btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      p1Geno = btn.getAttribute('data-geno');
      calculatePunnett();
      markActivity('punnett_square');
    });
  });

  p2Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      p2Btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      p2Geno = btn.getAttribute('data-geno');
      calculatePunnett();
      markActivity('punnett_square');
    });
  });

  calculatePunnett();

  // --- TEST CROSS LAB (Section 12) ---
  const testCrossBtns = document.querySelectorAll('.btn-test-parent');
  const testCrossResultBox = document.getElementById('test-cross-result-box');

  testCrossBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      testCrossBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const geno = btn.getAttribute('data-geno');

      if (testCrossResultBox) {
        if (geno === 'AA') {
          testCrossResultBox.innerHTML = `
            <div style="background: #ecfdf5; border-left: 4px solid var(--emerald-primary); padding: 1rem; border-radius: var(--radius-md);">
              <h5 style="color: var(--emerald-dark); margin-bottom: 0.25rem;">Result for Homozygous Dominant Parent (AA × aa):</h5>
              <p style="color: #065f46; margin: 0;">
                • <strong>Offspring:</strong> 100% Aa (Heterozygous Dominant phenotype).<br>
                • <strong>Conclusion:</strong> If all test-cross offspring exhibit the dominant trait, the parent is definitively <strong>AA (Homozygous)</strong>.
              </p>
            </div>
          `;
        } else {
          testCrossResultBox.innerHTML = `
            <div style="background: #eff6ff; border-left: 4px solid var(--blue-accent); padding: 1rem; border-radius: var(--radius-md);">
              <h5 style="color: #1e40af; margin-bottom: 0.25rem;">Result for Heterozygous Parent (Aa × aa):</h5>
              <p style="color: #1e3a8a; margin: 0;">
                • <strong>Offspring:</strong> 50% Aa (Dominant phenotype) : 50% aa (Recessive phenotype) — <strong>1:1 Ratio</strong>.<br>
                • <strong>Conclusion:</strong> The appearance of even ONE recessive individual proves the unknown dominant parent carried a hidden recessive allele (<strong>Aa</strong>).
              </p>
            </div>
          `;
        }
      }
      markActivity('test_cross');
    });
  });

  // --- MEIOSIS INTERACTIVE STAGES (Section 17) ---
  const meiosisSteps = document.querySelectorAll('.btn-stage-step');
  const meiosisStageTitle = document.getElementById('meiosis-stage-title');
  const meiosisStageDesc = document.getElementById('meiosis-stage-desc');
  const meiosisStageCanvas = document.getElementById('meiosis-stage-graphic');

  const meiosisData = {
    prophase1: {
      title: 'Prophase I (Synapsis & Crossing Over)',
      desc: 'Homologous chromosomes pair up closely in <strong>synapsis</strong> to form bivalents (tetrads). Non-sister chromatids exchange genetic segments at <strong>chiasmata</strong> (crossing over), creating novel allele combinations.',
      graphic: '🧬 [Homologs Paired: Maternal (Pink) & Paternal (Blue) Chiasma Exchange]'
    },
    metaphase1: {
      title: 'Metaphase I (Independent Assortment)',
      desc: 'Homologous pairs align randomly along the metaphase plate in independent assortment. Maternal and paternal chromosomes orient independently towards opposite spindle poles.',
      graphic: '⫯⫯ [Tetrads Aligned on Equatorial Plate: 2^23 combinations possible]'
    },
    anaphase1: {
      title: 'Anaphase I (Segregation of Homologs)',
      desc: 'Homologous chromosomes separate and migrate to opposite poles. <em>Sister chromatids remain attached at their centromeres</em>. This is the reductional division (2n → n).',
      graphic: '← ⫯  |  ⫯ → [Homologs Segregated, Sister Chromatids Intact]'
    },
    telophase1: {
      title: 'Telophase I & Cytokinesis',
      desc: 'Two haploid (n) daughter cells form. Each cell contains one chromosome from each homologous pair (consisting of two joined recombinant sister chromatids).',
      graphic: '◯ (n) & ◯ (n) [Two Haploid Intermediate Cells]'
    },
    meiosis2: {
      title: 'Meiosis II (Equational Division)',
      desc: 'Resembles mitosis: Sister chromatids finally separate during Anaphase II. Results in <strong>4 genetically unique haploid (n) gametes</strong>.',
      graphic: '◯ (n)  ◯ (n)  ◯ (n)  ◯ (n) [4 Non-Identical Gametes]'
    }
  };

  meiosisSteps.forEach(btn => {
    btn.addEventListener('click', () => {
      meiosisSteps.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const stage = btn.getAttribute('data-stage');
      const info = meiosisData[stage];

      if (info) {
        if (meiosisStageTitle) meiosisStageTitle.textContent = info.title;
        if (meiosisStageDesc) meiosisStageDesc.innerHTML = info.desc;
        if (meiosisStageCanvas) meiosisStageCanvas.textContent = info.graphic;
      }
      markActivity('meiosis');
    });
  });

  // --- PEDIGREE ANALYSIS (Section 21) ---
  const pedModeBtns = document.querySelectorAll('.btn-pedigree-mode');
  const pedCluesBox = document.getElementById('pedigree-clues-box');

  const pedData = {
    autosomal_dom: {
      title: 'Autosomal Dominant Inheritance',
      clues: [
        'Trait appears in <strong>every generation</strong> (no skipping of generations).',
        'Every affected individual has at least one affected parent.',
        'Males and females are affected with equal frequency.',
        'Examples: Huntington\'s disease, Achondroplasia, Marfan syndrome.'
      ]
    },
    autosomal_rec: {
      title: 'Autosomal Recessive Inheritance',
      clues: [
        'Trait frequently <strong>skips generations</strong>.',
        'Unaffected carrier parents (Aa × Aa) can produce affected offspring (aa) with a 25% probability.',
        'Equal frequency in males and females.',
        'Consanguinity increases the probability of affected offspring.',
        'Examples: Cystic fibrosis, Phenylketonuria (PKU), Sickle cell anemia.'
      ]
    },
    x_linked_rec: {
      title: 'X-Linked Recessive Inheritance',
      clues: [
        'Substantially <strong>more frequent in males</strong> (hemizygous XY need only 1 mutant allele).',
        'Affected fathers NEVER transmit the trait to their sons (father gives Y chromosome).',
        'All daughters of an affected father are obligate carriers (XHXh).',
        'Examples: Hemophilia A & B, Red-Green Color Blindness, Duchenne Muscular Dystrophy.'
      ]
    }
  };

  pedModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pedModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      const data = pedData[mode];

      if (pedCluesBox && data) {
        let listHtml = data.clues.map(c => `<li>${c}</li>`).join('');
        pedCluesBox.innerHTML = `
          <h4 style="color: var(--teal-primary); margin-bottom: 0.5rem;">${data.title}</h4>
          <ul style="margin: 0; padding-left: 1.25rem;">${listHtml}</ul>
        `;
      }
      markActivity('pedigree');
    });
  });

  // --- MUTATION SIMULATOR (Section 22) ---
  const mutBtns = document.querySelectorAll('.btn-mut-type');
  const mutDnaTrack = document.getElementById('mut-dna-track');
  const mutMrnaTrack = document.getElementById('mut-mrna-track');
  const mutProteinTrack = document.getElementById('mut-protein-track');
  const mutImpactBox = document.getElementById('mut-impact-box');

  const mutScenarios = {
    normal: {
      dna: 'TAC GAA TTT CCG TCA ACT',
      mrna: 'AUG CUU AAA GGC AGU UGA',
      protein: 'Met - Leu - Lys - Gly - Ser - [STOP]',
      impact: '<strong>Wild-Type Sequence:</strong> Produces standard functional enzymatic protein.'
    },
    silent: {
      dna: 'TAC GA<strong>G</strong> TTT CCG TCA ACT',
      mrna: 'AUG CU<strong>C</strong> AAA GGC AGU UGA',
      protein: 'Met - <strong>Leu</strong> - Lys - Gly - Ser - [STOP]',
      impact: '<strong>Silent Mutation:</strong> Base substitution <code>CUU → CUC</code> still codes for <strong>Leucine</strong> due to genetic code degeneracy (wobble). No change in peptide sequence!'
    },
    missense: {
      dna: 'TAC G<strong>C</strong>A TTT CCG TCA ACT',
      mrna: 'AUG C<strong>G</strong>U AAA GGC AGU UGA',
      protein: 'Met - <strong>Arg</strong> - Lys - Gly - Ser - [STOP]',
      impact: '<strong>Missense Mutation:</strong> Base substitution replaces Leucine with <strong>Arginine</strong>. May alter protein folding (classic cause of Sickle Cell: Glu → Val in β-globin).'
    },
    nonsense: {
      dna: 'TAC <strong>ATT</strong> TTT CCG TCA ACT',
      mrna: 'AUG <strong>UAA</strong> AAA GGC AGU UGA',
      protein: 'Met - <strong>[PREMATURE STOP]</strong>',
      impact: '<strong>Nonsense Mutation:</strong> Base substitution generates a premature stop codon (<code>UAA</code>), truncating the polypeptide chain into a non-functional fragment.'
    },
    frameshift: {
      dna: 'TAC <strong>A</strong>GA ATT TCC GTC AAC T',
      mrna: 'AUG <strong>U</strong>CU UAA AGG CAG UUG A',
      protein: 'Met - <strong>Ser - [STOP]</strong> (Altered Frame)',
      impact: '<strong>Frameshift Mutation (1-bp Insertion):</strong> Shifts all downstream triplet reading frames, completely altering amino acid sequence and usually generating early stop codons.'
    }
  };

  mutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mutBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-mut');
      const sc = mutScenarios[type];

      if (sc) {
        if (mutDnaTrack) mutDnaTrack.innerHTML = sc.dna;
        if (mutMrnaTrack) mutMrnaTrack.innerHTML = sc.mrna;
        if (mutProteinTrack) mutProteinTrack.innerHTML = sc.protein;
        if (mutImpactBox) mutImpactBox.innerHTML = sc.impact;
      }
      markActivity('mutations');
    });
  });

  // --- LAC OPERON SIMULATOR (Section 27) ---
  let lactosePresent = false;
  let glucosePresent = true;

  const lactoseToggle = document.getElementById('switch-lactose');
  const glucoseToggle = document.getElementById('switch-glucose');
  const operonStatusTitle = document.getElementById('operon-status-title');
  const operonStatusDesc = document.getElementById('operon-status-desc');
  const operonRepressorBadge = document.getElementById('operon-repressor-badge');
  const operonCapBadge = document.getElementById('operon-cap-badge');

  function updateOperonState() {
    if (!lactosePresent) {
      // Repressor bound
      if (operonStatusTitle) operonStatusTitle.textContent = 'Operon OFF (Repressed)';
      if (operonStatusDesc) {
        operonStatusDesc.innerHTML = 'Because lactose is absent, the active <strong>LacI repressor protein</strong> binds firmly to the <strong>Operator (O)</strong>, sterically blocking RNA Polymerase from transcribing lacZ, lacY, and lacA.';
      }
      if (operonRepressorBadge) operonRepressorBadge.textContent = 'LacI Repressor: BOUND to Operator';
      if (operonCapBadge) operonCapBadge.textContent = glucosePresent ? 'CAP-cAMP: Inactive (Glucose Present)' : 'CAP-cAMP: Active (cAMP High)';
    } else {
      // Lactose present -> Allolactose inducers free repressor
      if (glucosePresent) {
        if (operonStatusTitle) operonStatusTitle.textContent = 'Operon BASAL (Low Transcription)';
        if (operonStatusDesc) {
          operonStatusDesc.innerHTML = 'Allolactose binds LacI repressor, releasing it from the operator. However, because glucose is high, <strong>cAMP is low</strong>, and CAP is inactive. RNA polymerase initiates transcription only at a low basal rate.';
        }
        if (operonRepressorBadge) operonRepressorBadge.textContent = 'LacI Repressor: INACTIVE (Released)';
        if (operonCapBadge) operonCapBadge.textContent = 'CAP-cAMP: Inactive (cAMP Low)';
      } else {
        if (operonStatusTitle) operonStatusTitle.textContent = 'Operon HIGH INDUCTION (Max Transcription)';
        if (operonStatusDesc) {
          operonStatusDesc.innerHTML = 'Lactose is present (repressor off) AND glucose is absent (cAMP is high). <strong>CAP-cAMP binds CAP site</strong>, assisting RNA Polymerase to achieve maximum transcription of lactose-metabolizing enzymes!';
        }
        if (operonRepressorBadge) operonRepressorBadge.textContent = 'LacI Repressor: INACTIVE (Released)';
        if (operonCapBadge) operonCapBadge.textContent = 'CAP-cAMP: BOUND (High cAMP)';
      }
    }
  }

  if (lactoseToggle) {
    lactoseToggle.addEventListener('change', (e) => {
      lactosePresent = e.target.checked;
      updateOperonState();
      markActivity('lac_operon');
    });
  }

  if (glucoseToggle) {
    glucoseToggle.addEventListener('change', (e) => {
      glucosePresent = e.target.checked;
      updateOperonState();
      markActivity('lac_operon');
    });
  }

  updateOperonState();

  // --- MDCAT MCQ SYSTEM (30+ High-Yield Questions) ---
  const mcqDatabase = [
    {
      q: 'Which enzyme is responsible for breaking hydrogen bonds between complementary nitrogenous bases to unwind the DNA double helix?',
      options: ['DNA Polymerase I', 'Helicase', 'DNA Ligase', 'Primase'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Helicase unwinds the double helix at replication forks by breaking the hydrogen bonds holding base pairs together.'
    },
    {
      q: 'In a typical human somatic cell, what is the total chromosome number and the number of autosome pairs respectively?',
      options: ['46 chromosomes, 23 autosome pairs', '46 chromosomes, 22 autosome pairs', '23 chromosomes, 22 autosome pairs', '44 chromosomes, 2 autosome pairs'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Humans have 46 chromosomes (23 pairs) in somatic cells: 22 pairs of autosomes (44 chromosomes) and 1 pair of sex chromosomes (XX or XY).'
    },
    {
      q: 'During DNA replication, which of the following is synthesized discontinuously away from the replication fork?',
      options: ['Leading strand', 'Okazaki fragments on lagging strand', 'RNA primers on leading strand', 'Promoter sequences'],
      correct: 1,
      diff: 'Medium',
      explanation: 'Because DNA Polymerase synthesizes strictly 5\' → 3\', the lagging strand must be synthesized discontinuously in short pieces called Okazaki fragments.'
    },
    {
      q: 'If a DNA template strand has the sequence 3\'-TAC GGT CCA-5\', what is the complementary mRNA sequence produced during transcription?',
      options: ['5\'-AUG CCA GGU-3\'', '5\'-AUG CCU GGU-3\'', '5\'-UAC GGU CCA-3\'', '3\'-AUG CCA GGU-5\''],
      correct: 0,
      diff: 'Medium',
      explanation: 'Transcription pairs 3\'-T→5\'-A, 3\'-A→5\'-U, 3\'-C→5\'-G, 3\'-G→5\'-C, 3\'-G→5\'-C, 3\'-T→5\'-A, 3\'-C→5\'-G, 3\'-C→5\'-G, 3\'-A→5\'-U. So 3\'-TAC GGT CCA-5\' produces 5\'-AUG CCA GGU-3\'.'
    },
    {
      q: 'Which of the following codons functions as the universal initiation (START) signal for translation in eukaryotes?',
      options: ['UAA', 'UAG', 'AUG', 'UGA'],
      correct: 2,
      diff: 'Easy',
      explanation: 'AUG codes for Methionine and acts as the universal start codon for initiating translation.'
    },
    {
      q: 'What are the three nonsense (STOP) codons that trigger translation termination?',
      options: ['AUG, UAA, UAG', 'UAA, UAG, UGA', 'UGA, UGG, UAC', 'CAU, CAG, CAA'],
      correct: 1,
      diff: 'Easy',
      explanation: 'UAA (Ochre), UAG (Amber), and UGA (Opal) are the three stop codons that do not code for amino acids and bind release factors.'
    },
    {
      q: 'A cross between two heterozygous purple pea plants (Pp × Pp) produces 400 offspring. Under complete dominance, how many are expected to show the white recessive phenotype?',
      options: ['300', '200', '100', '50'],
      correct: 2,
      diff: 'Medium',
      explanation: 'The phenotypic ratio for Pp × Pp is 3 dominant : 1 recessive. 1/4 of 400 = 100 white flowered plants.'
    },
    {
      q: 'A test cross is performed by mating an individual displaying a dominant phenotype with an individual of which genotype?',
      options: ['Homozygous dominant (AA)', 'Heterozygous (Aa)', 'Homozygous recessive (aa)', 'Any dominant phenotype'],
      correct: 2,
      diff: 'Easy',
      explanation: 'A test cross always crosses an unknown dominant organism with a homozygous recessive tester (aa).'
    },
    {
      q: 'What is the classic phenotypic ratio resulting from a dihybrid cross (AaBb × AaBb) assuming complete dominance and independent assortment?',
      options: ['1:2:1', '3:1', '9:3:3:1', '1:1:1:1'],
      correct: 2,
      diff: 'Easy',
      explanation: 'A dihybrid cross between two double heterozygotes yields a 9:3:3:1 phenotypic ratio.'
    },
    {
      q: 'In Mirabilis jalapa (4 o\'clock plant), crossing true-breeding red (RR) and white (rr) flowers yields 100% pink (Rr) F1 flowers. What is the phenotypic ratio in the F2 generation?',
      options: ['3 red : 1 white', '1 red : 2 pink : 1 white', '9 red : 3 pink : 3 white : 1 yellow', 'All pink'],
      correct: 1,
      diff: 'Medium',
      explanation: 'In incomplete dominance, the heterozygote has an intermediate pink phenotype. The F2 phenotypic ratio matches the genotypic ratio: 1 RR (red) : 2 Rr (pink) : 1 rr (white) = 1:2:1.'
    },
    {
      q: 'A man with blood group AB marries a woman with blood group O (ii). Which blood group is IMPOSSIBLE among their children?',
      options: ['Group A', 'Group B', 'Group O', 'Both Group A and Group B are possible'],
      correct: 2,
      diff: 'MDCAT Trap',
      explanation: 'The father transmits IA or IB. The mother transmits only i. Possible offspring genotypes are IAi (Group A) and IBi (Group B). Group O (ii) and Group AB (IAIB) are impossible.'
    },
    {
      q: 'Why are X-linked recessive disorders such as hemophilia and red-green color blindness observed much more frequently in human males than females?',
      options: ['Males have two X chromosomes', 'Males are hemizygous (XY) and have no second X allele to mask the mutant allele', 'The Y chromosome carries a dominant suppressor', 'Testosterone activates the mutant gene'],
      correct: 1,
      diff: 'Medium',
      explanation: 'Males possess only one X chromosome (XY). A single recessive allele on their maternal X chromosome is immediately expressed.'
    },
    {
      q: 'During which specific phase of meiosis does crossing over (genetic recombination) occur?',
      options: ['Metaphase I', 'Prophase I', 'Anaphase I', 'Prophase II'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Crossing over between non-sister chromatids of homologous chromosomes occurs during Prophase I of meiosis.'
    },
    {
      q: 'Mendel\'s Law of Independent Assortment is biologically explained by the random orientation of homologous pairs during which stage?',
      options: ['Prophase I', 'Metaphase I', 'Anaphase II', 'Telophase I'],
      correct: 1,
      diff: 'Medium',
      explanation: 'During Metaphase I, homologous chromosome pairs orient independently along the equatorial plate.'
    },
    {
      q: 'Which of the following mutations results from the insertion or deletion of a number of nucleotides NOT divisible by 3 in a coding sequence?',
      options: ['Silent mutation', 'Missense mutation', 'Frameshift mutation', 'Conservative mutation'],
      correct: 2,
      diff: 'Easy',
      explanation: 'Inserting or deleting nucleotides not divisible by 3 disrupts the downstream triplet reading frame (frameshift mutation).'
    },
    {
      q: 'A point mutation that converts a codon for Glutamate (GAA) into a stop codon (UAA) is classified as a:',
      options: ['Silent mutation', 'Missense mutation', 'Nonsense mutation', 'Neutral mutation'],
      correct: 2,
      diff: 'Easy',
      explanation: 'A mutation creating a premature termination (stop) codon is a nonsense mutation.'
    },
    {
      q: 'Nondisjunction of chromosome 21 during meiosis produces gametes that can result in Down syndrome upon fertilization. Down syndrome is an example of:',
      options: ['Monosomy', 'Trisomy (Aneuploidy)', 'Polyploidy', 'Translocation'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Down syndrome is Trisomy 21 (47, XX,+21 or 47, XY,+21), an aneuploidy involving one extra chromosome 21.'
    },
    {
      q: 'In the E. coli lac operon, what molecule acts as the direct inducer that binds and inactivates the LacI repressor protein?',
      options: ['Glucose', 'Allolactose', 'cAMP', 'Tryptophan'],
      correct: 1,
      diff: 'MDCAT Trap',
      explanation: 'When lactose enters the cell, a small portion is isomerized to allolactose, which acts as the true physiological inducer binding LacI.'
    },
    {
      q: 'Under which environmental conditions is transcription of the lac operon at its HIGHEST induced level?',
      options: ['High Glucose + High Lactose', 'High Glucose + No Lactose', 'No Glucose + High Lactose', 'No Glucose + No Lactose'],
      correct: 2,
      diff: 'MDCAT Trap',
      explanation: 'Lactose must be present (to release the LacI repressor) AND glucose must be absent (so cAMP is high, allowing CAP-cAMP to stimulate RNA polymerase binding).'
    },
    {
      q: 'Two genes located very close to each other on the same homologous chromosome that do NOT assort independently are called:',
      options: ['Complementary genes', 'Linked genes', 'Epistatic genes', 'Codominant alleles'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Linked genes reside on the same chromosome and tend to be inherited together unless separated by crossing over.'
    },
    {
      q: 'In eukaryotic mRNA processing, what is the chemical nature and role of the 5\' cap?',
      options: ['Poly-Adenine tail preventing exonuclease decay', '7-methylguanosine cap protecting pre-mRNA and aiding ribosome binding', 'Spliceosome complex removing exons', 'Histone tail acetylation'],
      correct: 1,
      diff: 'Medium',
      explanation: 'The 5\' cap is 7-methylguanosine attached via an unusual 5\'-to-5\' triphosphate bridge, protecting mRNA from degradation and assisting ribosome recognition.'
    },
    {
      q: 'A carrier woman for hemophilia (XHXh) marries a healthy man (XHY). What percentage of their SONS will have hemophilia?',
      options: ['0%', '25%', '50%', '100%'],
      correct: 2,
      diff: 'MDCAT Trap',
      explanation: 'Considering only the sons: Sons receive Y from father and either XH or Xh from mother. Probability of a son receiving Xh is 50%.'
    },
    {
      q: 'Which RNA molecule features an anticodon loop at one end and a specific amino acid attachment site (3\'-CCA) at the other?',
      options: ['mRNA', 'tRNA', 'rRNA', 'snRNA'],
      correct: 1,
      diff: 'Easy',
      explanation: 'tRNA (Transfer RNA) folds into a cloverleaf structure carrying an anticodon loop and a 3\'-CCA aminoacyl attachment arm.'
    },
    {
      q: 'What type of bond is formed by the peptidyl transferase center of the ribosome between adjacent amino acids during translation elongation?',
      options: ['Phosphodiester bond', 'Hydrogen bond', 'Peptide bond', 'Disulfide bridge'],
      correct: 2,
      diff: 'Easy',
      explanation: 'Peptide bonds link the carboxyl group of one amino acid to the amino group of the incoming amino acid.'
    },
    {
      q: 'If a double-stranded DNA sample contains 28% Cytosine, what percentage of Adenine does it contain (Chargaff\'s Rules)?',
      options: ['28%', '22%', '44%', '56%'],
      correct: 1,
      diff: 'Medium',
      explanation: 'By Chargaff\'s Rule: %G = %C = 28% (Total G+C = 56%). Remaining A+T = 100% - 56% = 44%. Therefore %A = 44% / 2 = 22%.'
    },
    {
      q: 'Which structural chromosomal mutation involves a segment breaking off, rotating 180 degrees, and re-attaching within the same chromosome?',
      options: ['Translocation', 'Duplication', 'Inversion', 'Deletion'],
      correct: 2,
      diff: 'Medium',
      explanation: 'Inversion occurs when a chromosome segment breaks off, flips 180°, and re-inserts.'
    },
    {
      q: 'In a pedigree analysis, a rare disease affects both males and females in every generation. An affected father transmits the condition to half of his children. What is the most likely mode of inheritance?',
      options: ['Autosomal Recessive', 'Autosomal Dominant', 'X-linked Recessive', 'Y-linked'],
      correct: 1,
      diff: 'Medium',
      explanation: 'Affecting every generation without skipping, equal male/female prevalence, and 50% transmission from a heterozygous parent is classic Autosomal Dominant inheritance.'
    },
    {
      q: 'Which enzyme seals the single-stranded phosphodiester nicks between adjacent Okazaki fragments on the lagging strand?',
      options: ['Helicase', 'Topoisomerase', 'DNA Ligase', 'Telomerase'],
      correct: 2,
      diff: 'Easy',
      explanation: 'DNA Ligase catalyzes phosphodiester bond formation between adjacent 3\'-OH and 5\'-phosphate groups, sealing nicks.'
    },
    {
      q: 'How many total codons exist in the standard genetic code, and how many of them code for amino acids (sense codons)?',
      options: ['64 total, 64 sense', '64 total, 61 sense', '60 total, 57 sense', '32 total, 20 sense'],
      correct: 1,
      diff: 'Medium',
      explanation: 'There are 4^3 = 64 total codons: 61 sense codons coding for amino acids and 3 nonsense/stop codons (UAA, UAG, UGA).'
    },
    {
      q: 'Which statement regarding human sex determination is strictly correct?',
      options: ['The mother\'s egg determines offspring sex', 'The father\'s sperm provides either an X or Y chromosome, determining biological sex', 'Sex chromosomes pair without a pseudoautosomal region', 'Females have Barr bodies because both X chromosomes remain fully active'],
      correct: 1,
      diff: 'Easy',
      explanation: 'Eggs contribute only X chromosomes. Sperm contribute either an X or Y chromosome, determining the zygote\'s chromosomal sex.'
    }
  ];

  let currentMcqIdx = 0;
  let userScore = 0;
  let mcqAnswered = false;

  const mcqTotalCountEl = document.getElementById('mcq-total-count');
  const mcqCurrentNumEl = document.getElementById('mcq-current-num');
  const mcqDiffBadge = document.getElementById('mcq-diff-badge');
  const mcqQuestionText = document.getElementById('mcq-question-text');
  const mcqOptionsList = document.getElementById('mcq-options-list');
  const mcqFeedbackBox = document.getElementById('mcq-feedback-box');
  const mcqNextBtn = document.getElementById('btn-mcq-next');
  const mcqRestartBtn = document.getElementById('btn-mcq-restart');
  const mcqScoreTally = document.getElementById('mcq-score-tally');

  if (mcqTotalCountEl) mcqTotalCountEl.textContent = mcqDatabase.length;

  function renderMcq(idx) {
    mcqAnswered = false;
    const item = mcqDatabase[idx];
    if (!item) return;

    if (mcqCurrentNumEl) mcqCurrentNumEl.textContent = idx + 1;
    if (mcqQuestionText) mcqQuestionText.textContent = item.q;

    if (mcqDiffBadge) {
      mcqDiffBadge.textContent = item.diff;
      mcqDiffBadge.className = 'mcq-difficulty-badge';
      if (item.diff === 'Easy') mcqDiffBadge.classList.add('diff-easy');
      else if (item.diff === 'Medium') mcqDiffBadge.classList.add('diff-medium');
      else mcqDiffBadge.classList.add('diff-trap');
    }

    if (mcqFeedbackBox) {
      mcqFeedbackBox.classList.remove('active');
      mcqFeedbackBox.innerHTML = '';
    }

    if (mcqNextBtn) mcqNextBtn.style.display = 'none';

    if (mcqOptionsList) {
      mcqOptionsList.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      item.options.forEach((opt, oIdx) => {
        const btn = document.createElement('button');
        btn.className = 'mcq-option-btn';
        btn.innerHTML = `<span class="mcq-opt-letter">${letters[oIdx]}</span><span>${opt}</span>`;
        btn.addEventListener('click', () => handleOptionSelect(oIdx));
        mcqOptionsList.appendChild(btn);
      });
    }

    if (mcqScoreTally) {
      mcqScoreTally.textContent = `Score: ${userScore} / ${idx}`;
    }
  }

  function handleOptionSelect(selectedIdx) {
    if (mcqAnswered) return;
    mcqAnswered = true;

    const item = mcqDatabase[currentMcqIdx];
    const optionBtns = mcqOptionsList.querySelectorAll('.mcq-option-btn');

    optionBtns.forEach((btn, bIdx) => {
      btn.disabled = true;
      if (bIdx === item.correct) {
        btn.classList.add('correct');
      } else if (bIdx === selectedIdx) {
        btn.classList.add('incorrect');
      }
    });

    const isCorrect = selectedIdx === item.correct;
    if (isCorrect) {
      userScore++;
    }

    // Update global app progress
    appProgress.mcqAttempted = Math.max(appProgress.mcqAttempted, currentMcqIdx + 1);
    appProgress.mcqScore = userScore;
    saveProgress();

    if (mcqFeedbackBox) {
      mcqFeedbackBox.classList.add('active');
      mcqFeedbackBox.innerHTML = `
        <h5 style="color: ${isCorrect ? 'var(--emerald-primary)' : 'var(--rose-accent)'}; margin-bottom: 0.35rem;">
          ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect Answer'}
        </h5>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">${item.explanation}</p>
      `;
    }

    if (mcqScoreTally) {
      mcqScoreTally.textContent = `Score: ${userScore} / ${currentMcqIdx + 1}`;
    }

    if (mcqNextBtn) {
      mcqNextBtn.style.display = 'inline-flex';
      if (currentMcqIdx === mcqDatabase.length - 1) {
        mcqNextBtn.textContent = 'View Final Results';
      } else {
        mcqNextBtn.textContent = 'Next Question →';
      }
    }
  }

  if (mcqNextBtn) {
    mcqNextBtn.addEventListener('click', () => {
      if (currentMcqIdx < mcqDatabase.length - 1) {
        currentMcqIdx++;
        renderMcq(currentMcqIdx);
      } else {
        // Show Final summary
        if (mcqQuestionText) {
          const pct = Math.round((userScore / mcqDatabase.length) * 100);
          mcqQuestionText.innerHTML = `
            🎉 <strong>MCQ Quiz Completed!</strong><br>
            Your Final Score: <span style="color: var(--teal-primary);">${userScore} / ${mcqDatabase.length}</span> (${pct}%)
          `;
        }
        if (mcqOptionsList) mcqOptionsList.innerHTML = '';
        if (mcqFeedbackBox) {
          mcqFeedbackBox.classList.add('active');
          mcqFeedbackBox.innerHTML = `
            <strong>Performance Assessment:</strong> ${
              userScore >= 26 
                ? '🌟 Outstanding! You have mastered the MDCAT Genetics syllabus with high conceptual precision.' 
                : userScore >= 20 
                ? '👍 Good work! Review the High-Yield section and memory anchors to turn tricky questions into points.' 
                : '📖 Keep studying! Work through the interactive simulators and review the comparison tables.'
            }
          `;
        }
        mcqNextBtn.style.display = 'none';
        if (mcqRestartBtn) mcqRestartBtn.style.display = 'inline-flex';
      }
    });
  }

  if (mcqRestartBtn) {
    mcqRestartBtn.addEventListener('click', () => {
      currentMcqIdx = 0;
      userScore = 0;
      mcqRestartBtn.style.display = 'none';
      renderMcq(currentMcqIdx);
    });
  }

  renderMcq(0);

  // --- QUICK REVISION FLOATING DRAWER ---
  const fabRevBtn = document.getElementById('fab-revision-btn');
  const navRevBtn = document.getElementById('nav-revision-btn');
  const revDrawer = document.getElementById('revision-panel-drawer');
  const closeRevBtn = document.getElementById('btn-close-revision-drawer');

  function openRevisionDrawer() {
    if (revDrawer) revDrawer.classList.add('open');
  }

  function closeRevisionDrawer() {
    if (revDrawer) revDrawer.classList.remove('open');
  }

  if (fabRevBtn) fabRevBtn.addEventListener('click', openRevisionDrawer);
  if (navRevBtn) navRevBtn.addEventListener('click', openRevisionDrawer);
  if (closeRevBtn) closeRevBtn.addEventListener('click', closeRevisionDrawer);

  document.querySelectorAll('.revision-link-item').forEach(link => {
    link.addEventListener('click', () => {
      closeRevisionDrawer();
    });
  });

  // Initialize progress
  loadProgress();
});
