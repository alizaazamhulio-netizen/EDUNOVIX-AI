/**
 * BIOTECHNOLOGY — MDCAT BIOLOGY MASTER JAVASCRIPT
 * Pure Vanilla JavaScript • Zero External Dependencies • LocalStorage Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initNavbar();
  initQuickRevisionDrawer();
  initBackToTop();
  initWorkflowStepper();
  initRestrictionCutDemo();
  initLigaseDemo();
  initPlasmidExplorer();
  initPcrSimulator();
  initGelElectrophoresis();
  initFingerprintMatcher();
  initGmoTraitBuilder();
  initMcqQuiz();
  initProgressTracker();
});

/* ==========================================================================
   1. Reading Progress Bar & Back to Top
   ========================================================================== */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    const progress = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Update reading section progress in tracker
    updateReadingProgress(progress);
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   2. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isExpanded = mobileDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   3. Quick Revision Floating Drawer
   ========================================================================== */
function initQuickRevisionDrawer() {
  const toggleBtn = document.getElementById('floating-revision-toggle');
  const drawer = document.getElementById('quick-revision-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  // Close drawer on clicking links inside
  if (drawer) {
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. Genetic Engineering Workflow Stepper (Section 2)
   ========================================================================== */
const workflowSteps = [
  {
    step: 1,
    name: "Gene of Interest",
    title: "1. Identification & Isolation of Gene of Interest",
    desc: "The specific DNA sequence coding for the desired protein (e.g., human insulin, growth hormone, or Bt toxin) is identified and extracted from donor genomic DNA or reverse-transcribed from mRNA into cDNA using reverse transcriptase.",
    examTip: "MDCAT Trap: Eukaryotic genes with introns cannot be expressed in bacteria unless cDNA (synthesized from spliced mRNA) is used!",
    visual: "🧬 Donor DNA ➔ Target Gene Extracted [mRNA ➔ cDNA]"
  },
  {
    step: 2,
    name: "Vector Selection",
    title: "2. Selection of Cloning Vector",
    desc: "A vector (typically a bacterial plasmid or bacteriophage) is selected to carry the foreign gene into the host. The vector must possess an Origin of Replication (ori), a Selectable Marker (e.g., ampR antibiotic resistance), and a Multiple Cloning Site (MCS).",
    examTip: "A vector must be capable of autonomous replication inside the host cell.",
    visual: "⭕ Bacterial Plasmid Vector (ori + ampR + MCS)"
  },
  {
    step: 3,
    name: "Restriction Cut",
    title: "3. Cleavage with Restriction Endonuclease",
    desc: "BOTH the target gene DNA and the plasmid vector are cut with the SAME restriction enzyme (e.g., EcoRI). This creates identical complementary single-stranded 'sticky ends' (palindromic overhangs) on both DNA molecules.",
    examTip: "MDCAT Core Rule: Using the SAME restriction enzyme ensures complementary sticky ends for pairing.",
    visual: "✂️ EcoRI cuts both Target Gene & Plasmid Vector"
  },
  {
    step: 4,
    name: "DNA Ligase",
    title: "4. Ligation by DNA Ligase",
    desc: "The cut gene of interest and linearized plasmid are mixed together. Base pairing occurs between complementary sticky ends, and DNA Ligase seals the phosphodiester bonds in the sugar-phosphate backbone, yielding Recombinant DNA (chimeric plasmid).",
    examTip: "Ligase = Link. Forms covalent phosphodiester bonds requiring ATP.",
    visual: "🔗 DNA Ligase seals Phosphodiester Bonds ➔ Recombinant Plasmid"
  },
  {
    step: 5,
    name: "Transformation",
    title: "5. Transformation into Host Cell",
    desc: "The recombinant plasmid is introduced into a competent bacterial host (such as E. coli) via chemical transformation (CaCl2 + heat shock) or electroporation. The host cell now takes up the foreign genetic material.",
    examTip: "Transformation is the process by which a cell takes up naked exogenous DNA from its environment.",
    visual: "🧫 Recombinant Plasmid enters competent E. coli host"
  },
  {
    step: 6,
    name: "Selection",
    title: "6. Selection of Transformed Cells",
    desc: "Bacteria are plated on an agar medium containing antibiotics (e.g., ampicillin). Only cells that have successfully taken up the plasmid containing the selectable marker gene (ampR) will survive and form colonies.",
    examTip: "Selectable markers distinguish transformed bacteria from non-transformed bacteria.",
    visual: "🧫 Antibiotic Plate: Only Transformed Bacteria survive (ampR+)"
  },
  {
    step: 7,
    name: "Gene Cloning",
    title: "7. Multiplication & Gene Cloning",
    desc: "The transformed bacterial cells divide rapidly in a bioreactor/fermenter. Every time the host cell replicates its chromosome, the recombinant plasmid replicates autonomously, producing millions of exact copies (molecular cloning).",
    examTip: "Molecular cloning copies specific DNA fragments, unlike reproductive cloning.",
    visual: "📈 1 bacterium ➔ 10^9 identical clone cells carrying target gene"
  },
  {
    step: 8,
    name: "Expression",
    title: "8. Gene Expression & Downstream Processing",
    desc: "The host cell's transcription and translation machinery expresses the foreign gene, synthesizing the desired therapeutic protein (e.g., active human insulin). The protein is harvested, purified, and formulated for clinical use.",
    examTip: "Downstream processing involves separation, purification, and quality testing.",
    visual: "💊 Purified Therapeutic Protein (e.g., Human Insulin) Harvested"
  }
];

function initWorkflowStepper() {
  const navContainer = document.getElementById('workflow-step-nav');
  const infoTitle = document.getElementById('step-info-title');
  const infoDesc = document.getElementById('step-info-desc');
  const infoTip = document.getElementById('step-info-tip');
  const visualBox = document.getElementById('step-visual-box');

  if (!navContainer || !infoTitle) return;

  navContainer.innerHTML = '';
  workflowSteps.forEach((step, index) => {
    const btn = document.createElement('button');
    btn.className = `step-btn ${index === 0 ? 'active' : ''}`;
    btn.id = `step-btn-${step.step}`;
    btn.innerHTML = `
      <span class="s-num">Step ${step.step}</span>
      <span class="s-name">${step.name}</span>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStep(index);
      markActivityCompleted('workflow_stepper');
    });
    navContainer.appendChild(btn);
  });

  function renderStep(idx) {
    const s = workflowSteps[idx];
    infoTitle.textContent = s.title;
    infoDesc.textContent = s.desc;
    infoTip.textContent = s.examTip;
    visualBox.innerHTML = `
      <div style="font-size: 1.125rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">${s.name} Stage</div>
      <div style="font-family: var(--font-mono); font-size: 0.9375rem; background: var(--navy-50); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--navy-200);">${s.visual}</div>
    `;
  }

  renderStep(0);
}

/* ==========================================================================
   5. Restriction Enzyme Interactive Cutting Demo (Section 3)
   ========================================================================== */
function initRestrictionCutDemo() {
  const cutBtn = document.getElementById('cut-dna-btn');
  const resetBtn = document.getElementById('reset-dna-btn');
  const dnaStage = document.getElementById('dna-cutting-stage');
  const statusMsg = document.getElementById('restriction-status-msg');

  if (!cutBtn || !dnaStage) return;

  const originalHtml = dnaStage.innerHTML;

  cutBtn.addEventListener('click', () => {
    dnaStage.classList.add('cut-animation-active');
    
    setTimeout(() => {
      dnaStage.innerHTML = `
        <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; width: 100%;">
          <!-- Left Fragment -->
          <div style="background: rgba(255,255,255,0.06); padding: 1rem; border-radius: 8px; border: 1px dashed #34d399; text-align: center;">
            <div style="color: #34d399; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.25rem;">FRAGMENT 1 (5' OVERHANG)</div>
            <div style="font-family: var(--font-mono); font-size: 1.1rem; letter-spacing: 0.15em;">
              <div>5'- C T A <span style="background: rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 3px; color: #34d399;">G</span> - 3'</div>
              <div>3'- G A T <span style="background: rgba(239,68,68,0.3); padding: 2px 6px; border-radius: 3px; color: #f87171;">C T T A A</span> - 5'</div>
            </div>
          </div>
          
          <div style="font-size: 1.5rem; color: #f59e0b;">✂️</div>

          <!-- Right Fragment -->
          <div style="background: rgba(255,255,255,0.06); padding: 1rem; border-radius: 8px; border: 1px dashed #34d399; text-align: center;">
            <div style="color: #34d399; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.25rem;">FRAGMENT 2 (STICKY END)</div>
            <div style="font-family: var(--font-mono); font-size: 1.1rem; letter-spacing: 0.15em;">
              <div>5'- <span style="background: rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 3px; color: #34d399;">A A T T C</span> G A T - 3'</div>
              <div>3'- <span style="opacity: 0.3;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="background: rgba(59,130,246,0.3); padding: 2px 6px; border-radius: 3px; color: #60a5fa;">G</span> C T A - 5'</div>
            </div>
          </div>
        </div>
      `;
      dnaStage.classList.remove('cut-animation-active');
      if (statusMsg) {
        statusMsg.innerHTML = `<span style="color: #10b981; font-weight: 700;">✓ EcoRI Cleaved Palindrome!</span> Created complementary 5' single-stranded sticky ends (AATT overhangs).`;
      }
      markActivityCompleted('restriction_cut');
    }, 400);
  });

  resetBtn?.addEventListener('click', () => {
    dnaStage.innerHTML = originalHtml;
    if (statusMsg) {
      statusMsg.textContent = "Click 'Cut DNA with EcoRI' to simulate endonuclease cleavage.";
    }
  });
}

/* ==========================================================================
   6. DNA Ligase Interactive Linker (Section 4)
   ========================================================================== */
function initLigaseDemo() {
  const sealBtn = document.getElementById('seal-ligase-btn');
  const resetBtn = document.getElementById('reset-ligase-btn');
  const gapLine = document.getElementById('ligase-gap');
  const statusMsg = document.getElementById('ligase-status-msg');

  if (!sealBtn || !gapLine) return;

  sealBtn.addEventListener('click', () => {
    gapLine.classList.add('sealed');
    if (statusMsg) {
      statusMsg.innerHTML = `<span style="color: #10b981; font-weight: 700;">✓ Phosphodiester Bond Sealed!</span> DNA Ligase utilized ATP energy to covalently join the 3'-OH and 5'-phosphate ends.`;
    }
    markActivityCompleted('ligase_demo');
  });

  resetBtn?.addEventListener('click', () => {
    gapLine.classList.remove('sealed');
    if (statusMsg) {
      statusMsg.textContent = "Click 'Activate DNA Ligase' to join the sticky end fragments.";
    }
  });
}

/* ==========================================================================
   7. Circular Plasmid Map Interactive Explorer (Section 5)
   ========================================================================== */
const plasmidFeatures = {
  ori: {
    title: "Origin of Replication (ori)",
    desc: "A specific DNA sequence where replication initiates inside the host bacterium. Without 'ori', the plasmid cannot replicate when the host cell divides.",
    color: "#059669",
    mdcatFact: "Origin of replication controls copy number per bacterial cell (high copy vs low copy plasmids)."
  },
  ampR: {
    title: "Selectable Marker (ampR Gene)",
    desc: "Encodes beta-lactamase enzyme conferring resistance to the antibiotic Ampicillin. Allows survival and identification of transformed bacteria on selective media.",
    color: "#0284c7",
    mdcatFact: "Selectable markers distinguish transformants from non-transformants."
  },
  mcs: {
    title: "Multiple Cloning Site (MCS / Polylinker)",
    desc: "A short region containing multiple unique restriction enzyme recognition sites (e.g., EcoRI, BamHI, HindIII) where foreign genes can be inserted.",
    color: "#e11d48",
    mdcatFact: "Each restriction site in the MCS should ideally occur only once in the plasmid."
  },
  insert: {
    title: "Inserted Gene of Interest (cDNA)",
    desc: "The foreign human or target DNA sequence (such as Human Insulin chain cDNA) inserted into the cloning site to produce recombinant protein.",
    color: "#d97706",
    mdcatFact: "Recombinant plasmid = Vector + Inserted foreign gene."
  }
};

function initPlasmidExplorer() {
  const parts = document.querySelectorAll('.plasmid-part');
  const titleEl = document.getElementById('plasmid-part-title');
  const descEl = document.getElementById('plasmid-part-desc');
  const factEl = document.getElementById('plasmid-part-fact');
  const legendItems = document.querySelectorAll('.legend-item');

  function selectPart(key) {
    const data = plasmidFeatures[key];
    if (!data || !titleEl) return;

    titleEl.textContent = data.title;
    titleEl.style.color = data.color;
    descEl.textContent = data.desc;
    factEl.textContent = data.mdcatFact;

    parts.forEach(p => {
      if (p.getAttribute('data-part') === key) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    legendItems.forEach(item => {
      if (item.getAttribute('data-part') === key) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    markActivityCompleted('plasmid_explorer');
  }

  parts.forEach(part => {
    part.addEventListener('click', () => {
      const key = part.getAttribute('data-part');
      if (key) selectPart(key);
    });
  });

  legendItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-part');
      if (key) selectPart(key);
    });
  });

  // default selection
  selectPart('ori');
}

/* ==========================================================================
   8. PCR Thermocycler Simulator (Section 8)
   ========================================================================== */
let pcrCurrentCycle = 0;
let pcrCurrentStage = 1;

const pcrStagesInfo = {
  1: {
    name: "Stage 1: Denaturation",
    temp: "94°C - 96°C",
    desc: "Thermal energy breaks hydrogen bonds between complementary base pairs, unwinding double-stranded template DNA into two separate single strands.",
    tempColor: "#ef4444",
    animation: "Strands Separate (H-Bonds Melt)"
  },
  2: {
    name: "Stage 2: Annealing",
    temp: "50°C - 65°C",
    desc: "Temperature is reduced to allow short, sequence-specific oligonucleotide forward and reverse primers to hybridize to their complementary 3' ends.",
    tempColor: "#3b82f6",
    animation: "Primers Bind to 3' Ends"
  },
  3: {
    name: "Stage 3: Extension / Synthesis",
    temp: "72°C",
    desc: "Thermostable Taq DNA Polymerase (isolated from Thermus aquaticus) adds complementary dNTPs to extend the primers in the 5' ➔ 3' direction.",
    tempColor: "#10b981",
    animation: "Taq Polymerase Synthesizes DNA (5'➔3')"
  }
};

function initPcrSimulator() {
  const stageCards = document.querySelectorAll('.pcr-stage-card');
  const nextStageBtn = document.getElementById('pcr-next-stage-btn');
  const runFullCycleBtn = document.getElementById('pcr-run-cycle-btn');
  const resetPcrBtn = document.getElementById('pcr-reset-btn');
  const cycleNumDisplay = document.getElementById('pcr-cycle-count');
  const copiesCountDisplay = document.getElementById('pcr-copies-count');
  const stageDescDisplay = document.getElementById('pcr-live-desc');
  const chamberDisplay = document.getElementById('pcr-visual-chamber');

  function updatePcrUI() {
    const stage = pcrStagesInfo[pcrCurrentStage];
    stageCards.forEach((c, idx) => {
      if (idx + 1 === pcrCurrentStage) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    if (stageDescDisplay) {
      stageDescDisplay.innerHTML = `
        <span style="display:inline-block; padding: 2px 8px; border-radius: 4px; background:${stage.tempColor}; color:#fff; font-weight:700; font-family:var(--font-mono); margin-right:8px;">${stage.temp}</span>
        <strong>${stage.name}:</strong> ${stage.desc}
      `;
    }

    const copies = Math.pow(2, pcrCurrentCycle);
    if (cycleNumDisplay) cycleNumDisplay.textContent = pcrCurrentCycle.toString();
    if (copiesCountDisplay) {
      if (pcrCurrentCycle === 0) {
        copiesCountDisplay.textContent = "1 Template";
      } else if (pcrCurrentCycle <= 10) {
        copiesCountDisplay.textContent = `${copies.toLocaleString()} copies (2^${pcrCurrentCycle})`;
      } else {
        copiesCountDisplay.textContent = `~${(copies / 1000000).toFixed(1)} Million (${copies.toLocaleString()})`;
      }
    }

    if (chamberDisplay) {
      if (pcrCurrentStage === 1) {
        chamberDisplay.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:1.5rem; width:100%; align-items:center;">
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:#f87171; letter-spacing:0.2em; border-bottom:2px dashed #f87171; padding-bottom:4px;">5' ─── A-T-G-C-C-G-T-A-A-C-G-T ─── 3'</div>
            <div style="font-size:0.8125rem; color:#ef4444; font-weight:700;">🔥 95°C DENATURATION: Hydrogen bonds ruptured</div>
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:#f87171; letter-spacing:0.2em; border-top:2px dashed #f87171; padding-top:4px;">3' ─── T-A-C-G-G-C-A-T-T-G-C-A ─── 5'</div>
          </div>
        `;
      } else if (pcrCurrentStage === 2) {
        chamberDisplay.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:1rem; width:100%; align-items:center;">
            <div style="font-family:var(--font-mono); font-size:1.05rem; color:#94a3b8;">5' ─── A-T-G-C-C-G-T-A-A-C-G-T ─── 3'</div>
            <div style="display:flex; gap:3rem;">
              <span style="background:rgba(59,130,246,0.3); border:1px solid #3b82f6; padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem; color:#60a5fa;">[Primer ➔]</span>
              <span style="background:rgba(59,130,246,0.3); border:1px solid #3b82f6; padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem; color:#60a5fa;">[➔ Primer]</span>
            </div>
            <div style="font-size:0.8125rem; color:#60a5fa; font-weight:700;">❄️ 55°C ANNEALING: Primers anneal to complementary flanking sequences</div>
            <div style="font-family:var(--font-mono); font-size:1.05rem; color:#94a3b8;">3' ─── T-A-C-G-G-C-A-T-T-G-C-A ─── 5'</div>
          </div>
        `;
      } else {
        chamberDisplay.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.75rem; width:100%; align-items:center;">
            <div style="font-family:var(--font-mono); font-size:1.05rem; color:#34d399;">5' ─── A-T-G-C-C-G-T-A-A-C-G-T ─── 3'</div>
            <div style="font-family:var(--font-mono); font-size:1.05rem; color:#34d399; border-bottom:2px solid #10b981;">3' ─── T-A-C-G-G-C-A-T-T-G-C-A ─── 5' [Taq Pol ➔]</div>
            <div style="font-size:0.8125rem; color:#34d399; font-weight:700;">⚡ 72°C EXTENSION: Taq Polymerase synthesized complementary strand!</div>
            <div style="font-family:var(--font-mono); font-size:0.875rem; color:#a7f3d0;">Copies doubled! Total molecules: <strong>${Math.pow(2, pcrCurrentCycle || 1)}</strong></div>
          </div>
        `;
      }
    }
  }

  stageCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      pcrCurrentStage = idx + 1;
      updatePcrUI();
      markActivityCompleted('pcr_simulator');
    });
  });

  nextStageBtn?.addEventListener('click', () => {
    pcrCurrentStage++;
    if (pcrCurrentStage > 3) {
      pcrCurrentStage = 1;
      pcrCurrentCycle++;
    }
    updatePcrUI();
    markActivityCompleted('pcr_simulator');
  });

  runFullCycleBtn?.addEventListener('click', () => {
    pcrCurrentCycle++;
    pcrCurrentStage = 3;
    updatePcrUI();
    markActivityCompleted('pcr_simulator');
  });

  resetPcrBtn?.addEventListener('click', () => {
    pcrCurrentCycle = 0;
    pcrCurrentStage = 1;
    updatePcrUI();
  });

  updatePcrUI();
}

/* ==========================================================================
   9. Gel Electrophoresis Tank Simulator (Section 9)
   ========================================================================== */
function initGelElectrophoresis() {
  const runBtn = document.getElementById('run-gel-btn');
  const resetBtn = document.getElementById('reset-gel-btn');
  const powerIndicator = document.getElementById('gel-power-indicator');
  const bands = document.querySelectorAll('.dna-band');
  const statusMsg = document.getElementById('gel-status-msg');

  if (!runBtn) return;

  runBtn.addEventListener('click', () => {
    if (powerIndicator) powerIndicator.classList.add('running');
    if (statusMsg) {
      statusMsg.innerHTML = `<span style="color: #38bdf8; font-weight:700;">⚡ Electric Current Running:</span> DNA (negative charge) is migrating through agarose pores toward the Positive Anode (+). Smaller fragments travel faster!`;
    }

    bands.forEach(band => {
      const finalTop = band.getAttribute('data-top');
      if (finalTop) {
        band.style.top = finalTop;
      }
    });

    markActivityCompleted('gel_electrophoresis');
  });

  resetBtn?.addEventListener('click', () => {
    if (powerIndicator) powerIndicator.classList.remove('running');
    if (statusMsg) {
      statusMsg.textContent = "Click 'Run Gel Electrophoresis' to turn on current and separate DNA by size.";
    }

    bands.forEach(band => {
      band.style.top = '15px'; // reset near wells
    });
  });

  // Clicking individual bands to view base pair size
  bands.forEach(band => {
    band.addEventListener('click', () => {
      const bp = band.getAttribute('data-bp');
      const lane = band.closest('.gel-lane')?.querySelector('.lane-title')?.textContent || "DNA";
      if (statusMsg && bp) {
        statusMsg.innerHTML = `<strong>Inspecting Band:</strong> ${lane} — Size: <span style="color:#facc15; font-weight:800;">${bp}</span>. Smaller base pairs move farther down the matrix.`;
      }
    });
  });
}

/* ==========================================================================
   10. DNA Fingerprinting Forensic Matcher (Section 10)
   ========================================================================== */
const suspectsData = {
  A: {
    name: "Suspect A",
    bars: [25, 60, 110, 150],
    isMatch: false,
    report: "❌ Non-Match: Band pattern does not align with the crime scene sample (RFLP locus mismatch at 60px and 150px)."
  },
  B: {
    name: "Suspect B",
    bars: [35, 75, 120, 170],
    isMatch: true,
    report: "✅ PERFECT MATCH! All 4 VNTR / STR polymorphic loci match the crime scene DNA profile with 99.999% statistical certainty."
  },
  C: {
    name: "Suspect C",
    bars: [45, 90, 130, 160],
    isMatch: false,
    report: "❌ Non-Match: Distinct genetic profile. Excluded from crime scene biological evidence."
  }
};

function initFingerprintMatcher() {
  const btns = document.querySelectorAll('.suspect-card-btn');
  const suspectBox = document.getElementById('suspect-fp-pattern');
  const reportBox = document.getElementById('fp-report-box');
  const crimeBars = document.querySelectorAll('#crime-fp-pattern .fp-bar');

  if (!btns.length || !suspectBox) return;

  function loadSuspect(key) {
    const data = suspectsData[key];
    if (!data) return;

    btns.forEach(b => {
      if (b.getAttribute('data-suspect') === key) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });

    suspectBox.innerHTML = '';
    data.bars.forEach(topPos => {
      const bar = document.createElement('div');
      bar.className = `fp-bar ${data.isMatch ? 'match' : 'mismatch'}`;
      bar.style.top = `${topPos}px`;
      suspectBox.appendChild(bar);
    });

    // Color crime scene bars accordingly
    crimeBars.forEach(cb => {
      cb.className = `fp-bar ${data.isMatch ? 'match' : ''}`;
    });

    if (reportBox) {
      reportBox.className = `fp-result-feedback ${data.isMatch ? 'match' : 'mismatch'}`;
      reportBox.style.background = data.isMatch ? '#064e3b' : '#881337';
      reportBox.style.color = '#fff';
      reportBox.textContent = data.report;
    }

    markActivityCompleted('fingerprint_matcher');
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-suspect');
      if (key) loadSuspect(key);
    });
  });

  // Default load Suspect A
  loadSuspect('A');
}

/* ==========================================================================
   11. GMO Trait Builder (Section 13)
   ========================================================================== */
const gmoTraits = {
  cotton: {
    crop: "Bt Cotton",
    gene: "cry1Ac / cry2Ab (from Bacillus thuringiensis)",
    trait: "Endotoxin insecticidal protein crystal production",
    benefit: "Natural resistance against cotton bollworms; reduces synthetic pesticide spraying by 80%."
  },
  rice: {
    crop: "Golden Rice",
    gene: "psy (daffodil/corn) & crtI (Pantoea bacteria)",
    trait: "Beta-carotene (Provitamin A) biosynthesis in endosperm",
    benefit: "Prevents Vitamin A deficiency and childhood blindness in developing nations."
  },
  soybean: {
    crop: "Roundup Ready Soybean",
    gene: "cp4 epsps (from Agrobacterium sp. strain CP4)",
    trait: "Glyphosate herbicide tolerance",
    benefit: "Allows farmers to spray herbicide to kill weeds without harming the standing soybean crop."
  },
  tomato: {
    crop: "Flavr Savr Tomato",
    gene: "Antisense Polygalacturonase RNA gene",
    trait: "Inhibition of pectin breakdown during ripening",
    benefit: "Longer shelf-life, increased firmness, and delayed rot without chemical preservation."
  }
};

function initGmoTraitBuilder() {
  const btns = document.querySelectorAll('.trait-select-btn');
  const nameEl = document.getElementById('trait-crop-name');
  const geneEl = document.getElementById('trait-gene-inserted');
  const mechanismEl = document.getElementById('trait-mechanism');
  const benefitEl = document.getElementById('trait-benefit');

  if (!btns.length || !nameEl) return;

  function setTrait(key) {
    const d = gmoTraits[key];
    if (!d) return;

    btns.forEach(b => {
      if (b.getAttribute('data-crop') === key) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    nameEl.textContent = d.crop;
    geneEl.textContent = d.gene;
    mechanismEl.textContent = d.trait;
    benefitEl.textContent = d.benefit;

    markActivityCompleted('gmo_trait_builder');
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-crop');
      if (key) setTrait(key);
    });
  });

  setTrait('cotton');
}

/* ==========================================================================
   12. MDCAT 25-Question MCQ Quiz Engine
   ========================================================================== */
const mcqDatabase = [
  {
    id: 1,
    question: "Which of the following enzymes is known as 'molecular scissors' because it cuts double-stranded DNA at specific palindromic recognition sequences?",
    options: [
      "DNA Ligase",
      "Restriction Endonuclease",
      "DNA Polymerase III",
      "Reverse Transcriptase"
    ],
    answer: 1,
    explanation: "Restriction enzymes (endonucleases) cut DNA at specific palindromic recognition sequences and are known as molecular scissors."
  },
  {
    id: 2,
    question: "DNA ligase facilitates recombinant DNA formation by sealing which type of chemical bond in the DNA molecule?",
    options: [
      "Hydrogen bonds between nitrogenous bases",
      "Peptide bonds between amino acids",
      "Phosphodiester bonds in the sugar-phosphate backbone",
      "Disulfide bridges between cysteine residues"
    ],
    answer: 2,
    explanation: "DNA ligase joins DNA fragments together by forming covalent phosphodiester bonds between the 3'-hydroxyl and 5'-phosphate ends of the DNA backbone."
  },
  {
    id: 3,
    question: "Which of the following is an essential feature of a plasmid vector that allows it to duplicate independently within a bacterial host?",
    options: [
      "Selectable antibiotic resistance marker",
      "Multiple cloning site (MCS)",
      "Origin of replication (ori)",
      "Poly-A tail signal"
    ],
    answer: 2,
    explanation: "The origin of replication (ori) is the specific DNA sequence recognized by replication enzymes to initiate independent plasmid replication."
  },
  {
    id: 4,
    question: "What is the correct temperature order of the three steps in a standard Polymerase Chain Reaction (PCR) cycle?",
    options: [
      "Annealing (72°C) ➔ Denaturation (94°C) ➔ Extension (55°C)",
      "Denaturation (94°C) ➔ Annealing (55°C) ➔ Extension (72°C)",
      "Extension (94°C) ➔ Denaturation (55°C) ➔ Annealing (72°C)",
      "Denaturation (55°C) ➔ Extension (72°C) ➔ Annealing (94°C)"
    ],
    answer: 1,
    explanation: "PCR proceeds through Denaturation (94°C-96°C to separate strands) ➔ Annealing (50°C-65°C for primer binding) ➔ Extension (72°C for Taq polymerase synthesis)."
  },
  {
    id: 5,
    question: "Taq DNA polymerase used in PCR is isolated from which thermophilic organism?",
    options: [
      "Escherichia coli",
      "Thermus aquaticus",
      "Bacillus thuringiensis",
      "Agrobacterium tumefaciens"
    ],
    answer: 1,
    explanation: "Taq polymerase is extracted from the heat-tolerant bacterium Thermus aquaticus, allowing it to withstand the repeated 95°C denaturation temperatures without denaturing."
  },
  {
    id: 6,
    question: "During agarose gel electrophoresis, DNA fragments migrate toward which electrode and why?",
    options: [
      "Negative electrode (cathode) because DNA is positively charged",
      "Positive electrode (anode) because the phosphate backbone gives DNA an overall negative charge",
      "Positive electrode because deoxyribose sugar is positively charged",
      "Negative electrode because nitrogenous bases carry negative charges"
    ],
    answer: 1,
    explanation: "Because of its phosphate groups (PO4^3-), DNA carries an overall negative charge and therefore migrates toward the positively charged anode."
  },
  {
    id: 7,
    question: "In gel electrophoresis, which DNA fragments will migrate the farthest distance away from the loading wells?",
    options: [
      "The largest base-pair fragments",
      "The fragments with the highest GC content",
      "The smallest base-pair fragments",
      "Circular uncut plasmids"
    ],
    answer: 2,
    explanation: "Agarose acts as a molecular sieve; smaller DNA fragments face less resistance through the gel matrix pores and travel faster and farther."
  },
  {
    id: 8,
    question: "Starting with a single molecule of double-stranded DNA template, how many DNA copies are generated after 5 complete cycles of PCR?",
    options: [
      "10 copies",
      "16 copies",
      "32 copies",
      "64 copies"
    ],
    answer: 2,
    explanation: "The formula for PCR amplification is 2^n. After 5 cycles, total copies = 2^5 = 32 molecules."
  },
  {
    id: 9,
    question: "Which blotting technique is specifically designed to detect and analyze specific RNA molecules?",
    options: [
      "Southern Blot",
      "Northern Blot",
      "Western Blot",
      "Eastern Blot"
    ],
    answer: 1,
    explanation: "Remember the mnemonic SNOW DROP: Southern detects DNA, Northern detects RNA, and Western detects Protein."
  },
  {
    id: 10,
    question: "The commercial production of recombinant human insulin (Humulin) in 1978 was achieved by expressing human insulin genes in which host microorganism?",
    options: [
      "Saccharomyces cerevisiae",
      "Escherichia coli",
      "Bacillus subtilis",
      "Pseudomonas putida"
    ],
    answer: 1,
    explanation: "Eli Lilly and Genentech produced human insulin using recombinant plasmids cloned into the bacterium Escherichia coli."
  },
  {
    id: 11,
    question: "The uptake of naked foreign DNA by a bacterial cell from its surrounding medium is termed:",
    options: [
      "Transduction",
      "Conjugation",
      "Transformation",
      "Transfection"
    ],
    answer: 2,
    explanation: "Transformation is the process where a competent bacterial cell absorbs exogenous DNA from its environment."
  },
  {
    id: 12,
    question: "Why must complementary DNA (cDNA) synthesized via reverse transcriptase be used when expressing human genes in bacterial hosts?",
    options: [
      "Bacteria cannot transcribe double-stranded DNA",
      "Bacterial cells lack the spliceosome machinery to remove eukaryotic introns",
      "Bacterial ribosomes cannot translate mRNA",
      "Human promoters do not function in animals"
    ],
    answer: 1,
    explanation: "Bacteria lack RNA splicing machinery (spliceosomes) to excise introns. Therefore, cDNA synthesized from already-spliced mRNA (containing only exons) must be cloned."
  },
  {
    id: 13,
    question: "What is the primary difference between molecular cloning and reproductive cloning?",
    options: [
      "Molecular cloning duplicates an entire multi-cellular organism, while reproductive cloning amplifies DNA",
      "Molecular cloning makes identical copies of specific DNA fragments/genes, while reproductive cloning produces a whole organism",
      "Molecular cloning uses Taq polymerase, while reproductive cloning uses DNA ligase",
      "Molecular cloning occurs only in plants"
    ],
    answer: 1,
    explanation: "Molecular cloning is the replication of a specific DNA segment in a host organism, whereas reproductive cloning (e.g. Dolly the sheep) produces an entire genetically identical individual."
  },
  {
    id: 14,
    question: "Which gene was introduced into 'Golden Rice' to combat dietary Vitamin A deficiency in developing countries?",
    options: [
      "cry1Ac endotoxin gene",
      "Phytoene synthase (psy) and carotene desaturase (crtI)",
      "Antisense polygalacturonase gene",
      "cp4-epsps glyphosate resistance gene"
    ],
    answer: 1,
    explanation: "Golden Rice is genetically engineered with psy and crtI genes to synthesize beta-carotene (provitamin A) in the edible endosperm of rice grains."
  },
  {
    id: 15,
    question: "An organism that contains a functional gene artificially introduced from an entirely different species is termed:",
    options: [
      "Polyploid",
      "Aneuploid",
      "Transgenic",
      "Heterozygous"
    ],
    answer: 2,
    explanation: "A transgenic organism is a genetically modified organism (GMO) that contains foreign DNA/genes transferred from a different species."
  },
  {
    id: 16,
    question: "The severe genetic condition ADA-SCID (Severe Combined Immunodeficiency) became the first human disease treated via:",
    options: [
      "Monoclonal antibody infusion",
      "Somatic cell gene therapy",
      "Whole-genome reproductive cloning",
      "Northern blotting"
    ],
    answer: 1,
    explanation: "In 1990, Ashanti DeSilva was the first patient successfully treated with ex vivo somatic gene therapy for ADA-SCID using a retroviral vector carrying the functional ADA gene."
  },
  {
    id: 17,
    question: "The use of biological organisms or their enzymes to clean up environmental pollutants and oil spills is known as:",
    options: [
      "Biofortification",
      "Bioremediation",
      "Bioprospecting",
      "Biomagnification"
    ],
    answer: 1,
    explanation: "Bioremediation uses microorganisms (like Pseudomonas putida) or plants to metabolize and remove toxic contaminants from soil and water."
  },
  {
    id: 18,
    question: "Which of the following DNA sequences represents a classic palindromic recognition sequence for a restriction enzyme?",
    options: [
      "5'- G A A T T C - 3'\n3'- C T T A A G - 5'",
      "5'- G A T C C A - 3'\n3'- C T A G G T - 5'",
      "5'- A A A T T T - 3'\n3'- T T T C C C - 5'",
      "5'- G G G C C C - 3'\n3'- C C C A A A - 5'"
    ],
    answer: 0,
    explanation: "5'-GAATTC-3' reads identically in the 5' to 3' direction on both complementary strands (EcoRI recognition site), making it palindromic."
  },
  {
    id: 19,
    question: "In recombinant plasmid vectors, what is the role of an antibiotic resistance gene (such as ampR)?",
    options: [
      "To kill the host bacterium after protein synthesis",
      "To act as a selectable marker so only successfully transformed bacteria survive in antibiotic-containing media",
      "To provide nutrients for plasmid replication",
      "To stimulate high-rate DNA mutations"
    ],
    answer: 1,
    explanation: "Selectable markers like ampR enable researchers to select transformed cells by growing bacteria on ampicillin plates where non-transformants perish."
  },
  {
    id: 20,
    question: "Which forensic technique compares Variable Number Tandem Repeats (VNTRs) and Short Tandem Repeats (STRs) to identify suspects?",
    options: [
      "Western Blotting",
      "DNA Fingerprinting / Profiling",
      "Gel Filtration Chromatography",
      "Gram Staining"
    ],
    answer: 1,
    explanation: "DNA Fingerprinting analyzes polymorphic minisatellites (VNTRs) and STRs across individuals to produce unique band patterns for forensic and paternity testing."
  },
  {
    id: 21,
    question: "Western blotting is primarily used in biochemistry and medical diagnostics to detect which target molecule using labeled antibodies?",
    options: [
      "Specific DNA sequences",
      "Specific RNA transcripts",
      "Specific Proteins",
      "Phospholipids"
    ],
    answer: 2,
    explanation: "Western blotting separates proteins via SDS-PAGE and detects specific target antigens/proteins using primary and secondary enzyme-linked antibodies."
  },
  {
    id: 22,
    question: "Why do restriction enzymes NOT digest or degrade the bacterial host's own genomic DNA in nature?",
    options: [
      "Bacterial DNA does not contain any restriction sequences",
      "Bacterial DNA is protected by methylation of its own restriction sites via methylase enzymes",
      "Bacterial DNA is enclosed inside a nuclear envelope",
      "Restriction enzymes only operate outside the bacterium"
    ],
    answer: 1,
    explanation: "Bacteria possess Restriction-Modification (R-M) systems where host methylases add methyl groups (-CH3) to adenine or cytosine bases in the host DNA, blocking cleavage."
  },
  {
    id: 23,
    question: "Which method is commonly used to produce transgenic plants by utilizing a natural plant-transforming soil bacterium?",
    options: [
      "Agrobacterium tumefaciens with modified Ti-plasmid",
      "Escherichia coli heat shock only",
      "Retrovirus microinjection into pollen",
      "Bacteriophage lambda infection"
    ],
    answer: 0,
    explanation: "Agrobacterium tumefaciens naturally transfers its Ti (Tumor-inducing) plasmid T-DNA into plant genomes and is widely used as a vector for plant transgenesis."
  },
  {
    id: 24,
    question: "What type of ends are generated when a restriction enzyme cleaves both DNA strands straight across at the exact same base pair position?",
    options: [
      "Sticky ends",
      "Cohesive ends",
      "Blunt ends",
      "Palindromic overhangs"
    ],
    answer: 2,
    explanation: "Enzymes like SmaI cut straight across the center of the palindrome to generate non-overhanging 'blunt ends'."
  },
  {
    id: 25,
    question: "Gene therapy performed on somatic cells differs from germ-line gene therapy because somatic gene modifications:",
    options: [
      "Are inherited by subsequent generations and offspring",
      "Affect only the treated patient and are NOT passed on to offspring",
      "Can only be performed using plant viruses",
      "Require complete destruction of the immune system"
    ],
    answer: 1,
    explanation: "Somatic gene therapy targets non-reproductive body cells (e.g. bone marrow or lung cells), treating the individual patient without transmitting genetic changes to their children."
  }
];

let currentQuestionIndex = 0;
let quizScore = 0;
let answeredQuestionsCount = 0;
let selectedOption = null;

function initMcqQuiz() {
  const qText = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options-container');
  const nextBtn = document.getElementById('quiz-next-btn');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const metaBadge = document.getElementById('quiz-meta-badge');
  const scoreLive = document.getElementById('quiz-score-live');
  const progressFill = document.getElementById('quiz-progress-fill');
  const quizBody = document.getElementById('quiz-active-body');
  const quizSummary = document.getElementById('quiz-summary-card');
  const restartBtn = document.getElementById('quiz-restart-btn');

  if (!qText || !optionsContainer) return;

  function renderQuestion() {
    selectedOption = null;
    explanationBox.classList.remove('show');
    explanationBox.textContent = '';
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestionIndex === mcqDatabase.length - 1 ? "Finish Test 🏁" : "Next Question ➔";

    const q = mcqDatabase[currentQuestionIndex];
    qText.textContent = `${q.id}. ${q.question}`;
    metaBadge.textContent = `Question ${currentQuestionIndex + 1} of ${mcqDatabase.length}`;
    scoreLive.textContent = `Score: ${quizScore}/${answeredQuestionsCount}`;

    const progressPct = ((currentQuestionIndex) / mcqDatabase.length) * 100;
    progressFill.style.width = `${progressPct}%`;

    optionsContainer.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.id = `opt-btn-${idx}`;
      btn.innerHTML = `
        <span class="option-prefix">${prefixes[idx]}</span>
        <span>${opt}</span>
      `;

      btn.addEventListener('click', () => {
        if (selectedOption !== null) return; // already answered
        handleAnswer(idx, q);
      });

      optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(choiceIdx, q) {
    selectedOption = choiceIdx;
    answeredQuestionsCount++;
    const isCorrect = choiceIdx === q.answer;
    if (isCorrect) quizScore++;

    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answer) {
        b.classList.add('correct');
      } else if (idx === choiceIdx) {
        b.classList.add('wrong');
      }
    });

    explanationBox.innerHTML = `
      <div style="font-weight: 800; margin-bottom: 0.25rem;">
        ${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect choice!'}
      </div>
      <div>${q.explanation}</div>
    `;
    explanationBox.classList.add('show');
    nextBtn.disabled = false;

    scoreLive.textContent = `Score: ${quizScore}/${answeredQuestionsCount}`;
    saveQuizProgress();
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < mcqDatabase.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      showQuizSummary();
    }
  });

  function showQuizSummary() {
    quizBody.style.display = 'none';
    quizSummary.style.display = 'block';
    progressFill.style.width = '100%';

    const pct = Math.round((quizScore / mcqDatabase.length) * 100);
    const scoreBadge = document.getElementById('quiz-final-score');
    const msgEl = document.getElementById('quiz-final-msg');

    if (scoreBadge) scoreBadge.textContent = `${quizScore} / ${mcqDatabase.length}`;
    if (msgEl) {
      let grade = "Outstanding! MDCAT Rank 1 Potential 🏆";
      if (pct < 60) grade = "Needs Revision. Review High-Yield and Memory Maps! 📚";
      else if (pct < 85) grade = "Good Job! Revise the tricky questions to reach 100% 🎯";
      
      msgEl.innerHTML = `
        <div style="font-size: 1.25rem; font-weight: 800; color: var(--navy-900); margin-bottom: 0.5rem;">${pct}% Score — ${grade}</div>
        <p style="color: var(--navy-600);">You have completed the full MDCAT Biotechnology MCQ module. Your score is securely stored locally.</p>
      `;
    }

    saveQuizProgress(true);
    updateTrackerCard();
  }

  restartBtn?.addEventListener('click', () => {
    currentQuestionIndex = 0;
    quizScore = 0;
    answeredQuestionsCount = 0;
    quizBody.style.display = 'block';
    quizSummary.style.display = 'none';
    renderQuestion();
  });

  // Start initial question
  renderQuestion();
}

function saveQuizProgress(completed = false) {
  try {
    localStorage.setItem('mdcat_biotech_score', quizScore.toString());
    localStorage.setItem('mdcat_biotech_attempted', answeredQuestionsCount.toString());
    if (completed) {
      localStorage.setItem('mdcat_biotech_quiz_done', 'true');
    }
  } catch (e) {
    // ignore
  }
}

/* ==========================================================================
   13. LocalStorage & Chapter Progress Tracker
   ========================================================================== */
const activitiesKey = 'mdcat_biotech_activities';

function getCompletedActivities() {
  try {
    const raw = localStorage.getItem(activitiesKey);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function markActivityCompleted(actName) {
  try {
    const current = getCompletedActivities();
    if (!current.includes(actName)) {
      current.push(actName);
      localStorage.setItem(activitiesKey, JSON.stringify(current));
      updateTrackerCard();
    }
  } catch (e) {
    // ignore
  }
}

let lastReadingPct = 0;
function updateReadingProgress(pct) {
  if (pct > lastReadingPct) {
    lastReadingPct = Math.round(pct);
    updateTrackerCard();
  }
}

function initProgressTracker() {
  updateTrackerCard();
}

function updateTrackerCard() {
  const notesPctEl = document.getElementById('tracker-notes-pct');
  const activitiesCountEl = document.getElementById('tracker-activities-count');
  const mcqScoreEl = document.getElementById('tracker-mcq-score');
  const totalBarEl = document.getElementById('tracker-total-bar');
  const totalPctEl = document.getElementById('tracker-total-pct');

  const acts = getCompletedActivities();
  const actCount = acts.length; // max 6 tracked activities

  let savedScore = localStorage.getItem('mdcat_biotech_score') || '0';
  let savedAttempted = localStorage.getItem('mdcat_biotech_attempted') || '0';

  if (notesPctEl) notesPctEl.textContent = `${lastReadingPct}%`;
  if (activitiesCountEl) activitiesCountEl.textContent = `${actCount}/6 Done`;
  if (mcqScoreEl) mcqScoreEl.textContent = `${savedScore}/25`;

  // Calculate composite chapter completion: 40% reading + 30% activities + 30% quiz
  const quizWeight = (parseInt(savedAttempted, 10) / 25) * 30;
  const actWeight = (actCount / 6) * 30;
  const readWeight = (lastReadingPct / 100) * 40;
  const overall = Math.min(100, Math.round(quizWeight + actWeight + readWeight));

  if (totalBarEl) totalBarEl.style.width = `${overall}%`;
  if (totalPctEl) totalPctEl.textContent = `${overall}% Complete`;
}
