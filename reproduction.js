/**
 * EduNexa AI - MDCAT Biology Chapter: Reproduction
 * Vanilla JavaScript Engine
 * Handles State, LocalStorage, Interactive Anatomy, Menstrual Cycle Timeline,
 * Dynamic Hormone Visualization, Flashcard Accordions, and 15 MDCAT MCQs.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. STATE & LOCAL STORAGE PERSISTENCE
  // ==========================================================================
  const STORAGE_KEY = 'studymate_reproduction_progress';

  const defaultState = {
    completedSections: [],
    quizAttempted: false,
    quizScore: 0,
    bestScore: 0,
    chapterCompleted: false,
    lastVisitedTime: Date.now()
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage not accessible, falling back to session state', e);
    }
    return { ...defaultState };
  }

  const appState = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Unable to persist to LocalStorage', e);
    }
    updateDashboardUI();
  }

  function showToast(message, icon = '✅') {
    const toast = document.getElementById('app-toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function updateDashboardUI() {
    const totalSections = 10;
    const completedCount = Math.min(appState.completedSections.length, totalSections);
    
    // Progress calculation: sections (60%) + quiz (20%) + completion (20%)
    let pct = Math.round((completedCount / totalSections) * 60);
    if (appState.quizAttempted) {
      pct += Math.round((appState.quizScore / 15) * 20);
    }
    if (appState.chapterCompleted) {
      pct = 100;
    }

    const progressBar = document.getElementById('chapter-progress-bar');
    const progressText = document.getElementById('chapter-progress-text');
    const sectionsCount = document.getElementById('nav-sections-count');
    const quizScoreNav = document.getElementById('nav-quiz-score');

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}%`;
    if (sectionsCount) sectionsCount.textContent = `${completedCount}/${totalSections} Studied`;

    if (quizScoreNav) {
      if (appState.quizAttempted) {
        quizScoreNav.textContent = `Quiz: ${appState.quizScore}/15 (${Math.round((appState.quizScore / 15) * 100)}%)`;
      } else {
        quizScoreNav.textContent = `Quiz: Unattempted`;
      }
    }
  }

  // ==========================================================================
  // 2. SCROLL REVEAL & INTERSECTION OBSERVER
  // ==========================================================================
  const studySections = document.querySelectorAll('.study-section');
  const roadmapSteps = document.querySelectorAll('.roadmap-step-item');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (!appState.completedSections.includes(sectionId)) {
            appState.completedSections.push(sectionId);
            saveState();
          }

          // Highlight corresponding roadmap step
          roadmapSteps.forEach(step => {
            if (step.dataset.target === sectionId) {
              step.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    studySections.forEach(sec => sectionObserver.observe(sec));
  }

  // Roadmap click smooth scrolling
  roadmapSteps.forEach(step => {
    step.addEventListener('click', () => {
      const targetId = step.dataset.target;
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        roadmapSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      }
    });
  });

  // Header quick buttons
  const btnQuickJump = document.getElementById('btn-quick-jump');
  if (btnQuickJump) {
    btnQuickJump.addEventListener('click', () => {
      const el = document.getElementById('section-quick-revision');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const btnHeaderQuiz = document.getElementById('btn-header-quiz');
  if (btnHeaderQuiz) {
    btnHeaderQuiz.addEventListener('click', () => {
      const el = document.getElementById('quiz-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE MALE REPRODUCTIVE SYSTEM
  // ==========================================================================
  const maleOrgansData = {
    'testes': {
      tag: 'Primary Male Gonads',
      title: 'Testes (Testicles)',
      desc: 'The testes are the paired primary male reproductive organs situated inside the extra-abdominal scrotum. They are composed of hundreds of tightly coiled seminiferous tubules.',
      points: [
        '<strong>Spermatogenesis:</strong> Germinal epithelium produces mature haploid spermatozoa continuously.',
        '<strong>Testosterone Synthesis:</strong> Interstitial cells of Leydig secrete androgens under LH/ICSH stimulation.',
        '<strong>Sertoli (Nurse) Cells:</strong> Provide nutrition, support, and form the blood-testis barrier.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Testes = Sperm production + Testosterone secretion.'
    },
    'scrotum': {
      tag: 'Thermoregulatory Sac',
      title: 'Scrotum',
      desc: 'A cutaneous fibromuscular pouch holding the testes outside the pelvic cavity. It acts as a specialized natural climate-control mechanism.',
      points: [
        '<strong>Temperature Regulation:</strong> Maintains testes 2°C to 3°C cooler than the 37°C core body temperature.',
        '<strong>Optimal Spermatogenesis:</strong> High core body temperatures inhibit viable sperm formation.',
        '<strong>Dartos & Cremaster Muscles:</strong> Contract in cold weather to pull testes closer to the body.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Scrotum keeps testes 2–3°C below core temperature for viable sperm production.'
    },
    'epididymis': {
      tag: 'Sperm Maturation & Storage',
      title: 'Epididymis',
      desc: 'A tightly coiled crescent-shaped duct (~6 meters long uncoiled) resting along the posterior border of each testis.',
      points: [
        '<strong>Sperm Maturation:</strong> Immature, immotile spermatozoa spend 12–14 days acquiring motility and fertilizing ability.',
        '<strong>Temporary Storage:</strong> Serves as a reservoir where viable sperm can be stored for several weeks.',
        '<strong>Propulsion:</strong> Smooth muscle contractions propel sperm into the vas deferens during ejaculation.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Epididymis = Maturation (motility acquisition) and storage of sperm.'
    },
    'vas-deferens': {
      tag: 'Sperm Transport Duct',
      title: 'Vas Deferens (Ductus Deferens)',
      desc: 'A muscular tube (~45 cm) that carries sperm upward from the epididymis, through the inguinal canal, around the urinary bladder to the ejaculatory duct.',
      points: [
        '<strong>Sperm Conduction:</strong> Peristaltic contractions rapidly propel sperm toward the urethra.',
        '<strong>Vasectomy Site:</strong> Surgical sterilization procedure cuts/ties the vas deferens to prevent sperm emission.',
        '<strong>Ampulla:</strong> Terminal dilated portion that joins with the seminal vesicle duct.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Vas deferens conducts sperm from epididymis toward reproductive ducts.'
    },
    'seminal-vesicles': {
      tag: 'Accessory Gland (60% Semen)',
      title: 'Seminal Vesicles',
      desc: 'Pair of convoluted sac-like glands situated behind the urinary bladder, contributing ~60% of total ejaculate volume.',
      points: [
        '<strong>Fructose Rich:</strong> Provides the primary metabolic fuel (energy source) for sperm motility.',
        '<strong>Alkaline pH:</strong> Neutralizes the acidic environment of the male urethra and female vagina.',
        '<strong>Prostaglandins:</strong> Stimulate reverse peristalsis in the female reproductive tract.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Seminal vesicles produce fructose-rich, alkaline fluid nourishing sperm.'
    },
    'prostate-gland': {
      tag: 'Accessory Gland (30% Semen)',
      title: 'Prostate Gland',
      desc: 'A single, walnut-sized gland encircling the base of the urethra just below the urinary bladder.',
      points: [
        '<strong>Milky Alkaline Secretion:</strong> Contributes ~25–30% of semen volume.',
        '<strong>Enzymatic Activity:</strong> Contains citrate, acid phosphatase, and clotting enzymes.',
        '<strong>Motility Enhancement:</strong> Activates sperm motility and neutralizes vaginal acidity.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Prostate gland adds alkaline fluid to semen, boosting sperm motility.'
    },
    'urethra': {
      tag: 'Urogenital Passage',
      title: 'Urethra',
      desc: 'A shared terminal fibromuscular conduit passing through the prostate and penis, serving both urinary and reproductive systems at separate times.',
      points: [
        '<strong>Dual Function:</strong> Conducts urine from the bladder and semen during ejaculation.',
        '<strong>Sphincter Coordination:</strong> Internal sphincter closes during ejaculation to prevent retrograde flow into bladder.',
        '<strong>Cowper’s / Bulbourethral Glands:</strong> Lubricate and neutralize residual acidic urine prior to ejaculation.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Urethra is the common passage through which semen and urine exit the male body.'
    }
  };

  function updateMaleOrgan(organKey) {
    const data = maleOrgansData[organKey];
    if (!data) return;

    // Update panel text
    const tag = document.getElementById('male-panel-tag');
    const title = document.getElementById('male-panel-title');
    const desc = document.getElementById('male-panel-desc');
    const pointsList = document.getElementById('male-panel-points');
    const vital = document.getElementById('male-panel-vital');

    if (tag) tag.textContent = data.tag;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (vital) vital.innerHTML = `<p>${data.vital}</p>`;

    if (pointsList) {
      pointsList.innerHTML = data.points.map(pt => `<li>${pt}</li>`).join('');
    }

    // Update active states
    document.querySelectorAll('#male-selector-chips .structure-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.organ === organKey);
    });

    document.querySelectorAll('#male-anatomy-svg .hotspot-pin').forEach(pin => {
      pin.classList.toggle('active', pin.dataset.organ === organKey);
    });
  }

  // Chip buttons click
  document.querySelectorAll('#male-selector-chips .structure-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      updateMaleOrgan(btn.dataset.organ);
    });
  });

  // SVG Hotspots click
  document.querySelectorAll('#male-anatomy-svg .hotspot-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      updateMaleOrgan(pin.dataset.organ);
    });
  });

  // ==========================================================================
  // 4. INTERACTIVE SPERM CELL BREAKDOWN
  // ==========================================================================
  const spermPartData = {
    'head': {
      title: 'Head & Haploid Nucleus',
      desc: 'Contains the highly condensed haploid nucleus carrying 23 paternal chromosomes. It delivers the paternal genetic blueprint to the ovum during fertilization.'
    },
    'acrosome': {
      title: 'Acrosome Cap (Modified Golgi)',
      desc: 'A cap-like vesicle filled with hydrolytic enzymes (hyaluronidase and acrosin). Upon contacting the ovum, it undergoes the acrosomal reaction to dissolve the corona radiata and zona pellucida.'
    },
    'middle-piece': {
      title: 'Middle Piece (Mitochondrial Spiral)',
      desc: 'Packed with dozens of mitochondria arranged in a tight spiral around the axial filament. These produce abundant ATP via oxidative phosphorylation to power flagellar propulsion.'
    },
    'tail': {
      title: 'Flagellar Tail (Axoneme 9+2)',
      desc: 'Formed by an axoneme of microtubules (9+2 arrangement) surrounded by dense fibers. Its whip-like undulating motion propels the sperm forward through fluid media.'
    }
  };

  function updateSpermPart(partKey) {
    const data = spermPartData[partKey];
    if (!data) return;

    const title = document.getElementById('sperm-detail-title');
    const desc = document.getElementById('sperm-detail-desc');

    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;

    document.querySelectorAll('#sperm-buttons-grid .gamete-part-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.spermPart === partKey);
    });
  }

  document.querySelectorAll('#sperm-buttons-grid .gamete-part-button').forEach(btn => {
    btn.addEventListener('click', () => {
      updateSpermPart(btn.dataset.spermPart);
    });
  });

  // SVG sperm regions click
  document.querySelectorAll('#sperm-svg [data-sperm-part]').forEach(el => {
    el.addEventListener('click', () => {
      updateSpermPart(el.dataset.spermPart);
    });
  });

  // ==========================================================================
  // 5. INTERACTIVE FEMALE REPRODUCTIVE SYSTEM
  // ==========================================================================
  const femaleOrgansData = {
    'ovaries': {
      tag: 'Primary Female Gonads',
      title: 'Ovaries',
      desc: 'Paired solid ovoid organs (~3 cm) located in the lateral pelvic wall. They carry out oogenesis and act as primary endocrine glands.',
      points: [
        '<strong>Oogenesis:</strong> Cyclical maturation of follicles to release a mature secondary oocyte/ovum.',
        '<strong>Estrogen:</strong> Secreted by developing follicular cells; stimulates endometrial proliferation.',
        '<strong>Progesterone:</strong> Secreted by the corpus luteum to maintain the uterine lining for pregnancy.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Ovaries = Ova + Estrogen + Progesterone production.'
    },
    'fallopian-tubes': {
      tag: 'Site of Fertilization',
      title: 'Fallopian Tubes (Oviducts / Uterine Tubes)',
      desc: 'Pair of muscular tubes (~10–12 cm) extending from near the ovaries to the uterus. Their fimbriated ends sweep up the ovulated egg.',
      points: [
        '<strong>Fertilization Site:</strong> Syngamy (fusion of sperm and ovum) typically occurs in the ampulla region.',
        '<strong>Ciliated Epithelium:</strong> Cilia and peristaltic contractions move the ovum/zygote toward the uterus.',
        '<strong>Early Cleavage:</strong> Zygote begins mitotic divisions while traveling down the tube.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Fertilization usually occurs in the Fallopian tube (ampulla).'
    },
    'uterus': {
      tag: 'Gestation Chamber',
      title: 'Uterus (Womb)',
      desc: 'A hollow, thick-walled, inverted pear-shaped muscular organ situated between the urinary bladder and rectum.',
      points: [
        '<strong>Embryo Implantation:</strong> Blastocyst implants into the specialized inner lining on days 6–7.',
        '<strong>Fetal Development:</strong> Accommodates and nourishes the developing fetus throughout the 9 months of pregnancy.',
        '<strong>Parturition:</strong> Strong contractions of the smooth muscle myometrium expel the baby during childbirth.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Uterus is the site of blastocyst implantation and fetal gestation.'
    },
    'endometrium': {
      tag: 'Inner Mucosal Lining',
      title: 'Endometrium',
      desc: 'The highly vascular, glandular inner epithelial lining of the uterus that undergoes cyclical histological changes.',
      points: [
        '<strong>Proliferation:</strong> Grows and thickens during the follicular phase under estrogen influence.',
        '<strong>Secretory Phase:</strong> Becomes vascular and nutrient-rich under progesterone from corpus luteum.',
        '<strong>Menstrual Shedding:</strong> Breaks down and sheds during menses when hormone levels drop.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Endometrium is the inner uterine lining where implantation occurs.'
    },
    'cervix': {
      tag: 'Uterine Neck & Gateway',
      title: 'Cervix',
      desc: 'The lower narrow cylinder of the uterus that projects into the upper anterior wall of the vagina.',
      points: [
        '<strong>Mucus Barrier:</strong> Secretes cervical mucus that changes viscosity to permit or block sperm entry.',
        '<strong>Childbirth Dilation:</strong> Dilates up to 10 cm during labor to permit passage of the fetus.',
        '<strong>Protective Canal:</strong> Protects the sterile uterine cavity from vaginal bacteria.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Cervix connects the lower uterus to the vagina.'
    },
    'vagina': {
      tag: 'Copulatory & Birth Canal',
      title: 'Vagina',
      desc: 'An elastic, muscular canal (~8–10 cm) extending from the cervix to the exterior genital vestibule.',
      points: [
        '<strong>Copulatory Organ:</strong> Receives the penis and semen during sexual intercourse.',
        '<strong>Birth Canal:</strong> Passageway through which the fetus is delivered during childbirth.',
        '<strong>Menstrual Outlet:</strong> Conducts menstrual fluid outside the body.'
      ],
      vital: '⭐ <strong>MDCAT Key:</strong> Vagina receives sperm and serves as the birth canal during delivery.'
    }
  };

  function updateFemaleOrgan(organKey) {
    const data = femaleOrgansData[organKey];
    if (!data) return;

    const tag = document.getElementById('female-panel-tag');
    const title = document.getElementById('female-panel-title');
    const desc = document.getElementById('female-panel-desc');
    const pointsList = document.getElementById('female-panel-points');
    const vital = document.getElementById('female-panel-vital');

    if (tag) tag.textContent = data.tag;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (vital) vital.innerHTML = `<p>${data.vital}</p>`;

    if (pointsList) {
      pointsList.innerHTML = data.points.map(pt => `<li>${pt}</li>`).join('');
    }

    document.querySelectorAll('#female-selector-chips .structure-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.femaleOrgan === organKey);
    });

    document.querySelectorAll('#female-anatomy-svg .hotspot-pin').forEach(pin => {
      pin.classList.toggle('active', pin.dataset.femaleOrgan === organKey);
    });
  }

  document.querySelectorAll('#female-selector-chips .structure-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      updateFemaleOrgan(btn.dataset.femaleOrgan);
    });
  });

  document.querySelectorAll('#female-anatomy-svg .hotspot-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      updateFemaleOrgan(pin.dataset.femaleOrgan);
    });
  });

  // ==========================================================================
  // 6. MAIN VIP FEATURE: MENSTRUAL CYCLE TIMELINE & HORMONE GRAPH
  // ==========================================================================
  const cyclePhasesData = {
    '1': {
      badge: 'Phase 1 • Days 1 – 5',
      title: 'Menstruation Phase',
      desc: 'If fertilization and implantation do not occur, estrogen and progesterone levels fall drastically as the corpus luteum degenerates. The functional layer of the endometrium breaks down and is discharged through the vagina.',
      hormoneText: 'Estrogen and progesterone plunge to baseline levels; low levels relieve negative feedback on pituitary, allowing FSH to slowly rise.',
      ovaryText: 'Corpus luteum degenerates into the fibrous corpus albicans; primary ovarian follicles begin recruitment.',
      uterusText: 'Spasm and rupture of spiral endometrial arteries; necrotic endometrial tissue and blood (30–50 ml) are shed as menses.',
      highlightX: 10,
      highlightW: 80
    },
    '2': {
      badge: 'Phase 2 • Days 6 – 13',
      title: 'Follicular (Proliferative) Phase',
      desc: 'Under the influence of anterior pituitary FSH, a cohort of ovarian follicles matures. The developing granulosa cells synthesize increasing amounts of estrogen, which repairs and thickens the endometrium.',
      hormoneText: 'FSH stimulates follicle growth; developing follicles produce surging Estrogen levels. Estrogen peaks around Day 12–13.',
      ovaryText: 'One dominant follicle matures into a large, fluid-filled Graafian follicle containing a secondary oocyte.',
      uterusText: 'Endometrium proliferates rapidly, thickening from 1 mm to 3–5 mm with elongation of uterine glands.',
      highlightX: 90,
      highlightW: 155
    },
    '3': {
      badge: 'Phase 3 (Peak) • Day 14',
      title: 'Ovulation (LH Surge Trigger)',
      desc: 'High threshold levels of estrogen exert positive feedback on the hypothalamus and anterior pituitary, triggering an acute, massive surge of Luteinizing Hormone (LH surge). This ruptures the Graafian follicle, releasing the mature secondary oocyte.',
      hormoneText: 'A massive spike in LH (LH Surge) accompanied by a minor FSH peak. LH Surge is the absolute trigger for ovulation!',
      ovaryText: 'The mature Graafian follicle bursts at the ovarian surface (stigma) and discharges the secondary oocyte into the pelvic cavity.',
      uterusText: 'Endometrium is fully proliferative and ready for progesterone-induced secretory transformation.',
      highlightX: 245,
      highlightW: 35
    },
    '4': {
      badge: 'Phase 4 • Days 15 – 28',
      title: 'Luteal (Secretory) Phase',
      desc: 'After ovulation, LH stimulates the remnants of the ruptured follicle to differentiate into the glandular Corpus Luteum ("yellow body"). The corpus luteum secretes abundant progesterone (and estrogen) to maintain the uterine lining.',
      hormoneText: 'Progesterone reaches high dome-shaped peak levels; moderate estrogen secretion. Progesterone inhibits FSH and LH.',
      ovaryText: 'Active Corpus Luteum secretes progesterone. If unfertilized, it begins degenerating by day 26–28 into corpus albicans.',
      uterusText: 'Endometrium becomes highly vascular, spongy, and secretes glycogen-rich fluid to support blastocyst implantation.',
      highlightX: 280,
      highlightW: 200
    }
  };

  function updateMenstrualPhase(phaseKey) {
    const data = cyclePhasesData[phaseKey];
    if (!data) return;

    // Update buttons
    document.querySelectorAll('#cycle-tabs-container .cycle-phase-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.phase === phaseKey);
    });

    // Update text elements
    const badge = document.getElementById('cycle-detail-badge');
    const title = document.getElementById('cycle-detail-title');
    const desc = document.getElementById('cycle-detail-desc');
    const hormoneText = document.getElementById('cycle-event-hormone-text');
    const ovaryText = document.getElementById('cycle-event-ovary-text');
    const uterusText = document.getElementById('cycle-event-uterus-text');

    if (badge) badge.textContent = data.badge;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (hormoneText) hormoneText.textContent = data.hormoneText;
    if (ovaryText) ovaryText.textContent = data.ovaryText;
    if (uterusText) uterusText.textContent = data.uterusText;

    // Update SVG Highlight Box
    const highlightBox = document.getElementById('graph-phase-highlight');
    if (highlightBox) {
      highlightBox.setAttribute('x', data.highlightX);
      highlightBox.setAttribute('width', data.highlightW);
    }
  }

  document.querySelectorAll('#cycle-tabs-container .cycle-phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateMenstrualPhase(btn.dataset.phase);
    });
  });

  // ==========================================================================
  // 7. FERTILIZATION PATHWAY NODES
  // ==========================================================================
  document.querySelectorAll('#fertilization-pathway .pathway-node').forEach(node => {
    node.addEventListener('click', () => {
      document.querySelectorAll('#fertilization-pathway .pathway-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  // ==========================================================================
  // 8. QUICK REVISION FLASHCARD ACCORDIONS
  // ==========================================================================
  document.querySelectorAll('#revision-accordion .accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other accordions for clean UX
        document.querySelectorAll('#revision-accordion .accordion-item').forEach(other => {
          other.classList.remove('active');
          const otherBody = other.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });

  // ==========================================================================
  // 9. MDCAT PRACTICE QUIZ (15 HIGH-YIELD QUESTIONS)
  // ==========================================================================
  const quizQuestions = [
    {
      topic: 'Biological Foundations',
      question: 'What is the primary evolutionary advantage of sexual reproduction compared with asexual reproduction?',
      options: [
        'Production of genetically identical clones rapidly',
        'Generation of genetic variation in offspring',
        'Lower requirement of metabolic energy and time',
        'Complete absence of meiotic gametogenesis'
      ],
      correctIndex: 1,
      explanation: 'Sexual reproduction combines haploid genomes from two parents via meiotic crossing over and random syngamy, producing high genetic variation essential for natural selection.'
    },
    {
      topic: 'Male Reproductive System',
      question: 'In the male reproductive tract, where do spermatozoa acquire motility and undergo functional maturation?',
      options: [
        'Seminiferous tubules',
        'Epididymis',
        'Vas deferens',
        'Seminal vesicles'
      ],
      correctIndex: 1,
      explanation: 'Sperm are produced in seminiferous tubules, but they must spend 12–14 days in the coiled epididymis to mature, acquire motility, and be stored.'
    },
    {
      topic: 'Endocrine Regulation',
      question: 'Which testicular cells are stimulated by Luteinizing Hormone (ICSH) to produce testosterone?',
      options: [
        'Sertoli cells',
        'Interstitial Leydig cells',
        'Primary spermatocytes',
        'Spermatids'
      ],
      correctIndex: 1,
      explanation: 'Leydig (interstitial) cells located between seminiferous tubules synthesize testosterone under LH stimulation. Sertoli cells respond to FSH.'
    },
    {
      topic: 'Thermoregulation',
      question: 'The scrotum holds the testes outside the abdominal cavity primarily to maintain a temperature that is:',
      options: [
        '2°C to 3°C higher than core body temperature',
        '2°C to 3°C lower than core body temperature',
        'Exactly equal to the rectally measured core temperature',
        'Fluctuating dynamically between 40°C and 42°C'
      ],
      correctIndex: 1,
      explanation: 'Normal human spermatogenesis requires an optimal temperature approximately 2–3°C cooler than the 37°C core body temperature.'
    },
    {
      topic: 'Gamete Cytology',
      question: 'The middle piece of a human spermatozoon is densely packed with which organelle to synthesize ATP for flagellar propulsion?',
      options: [
        'Lysosomes',
        'Endoplasmic reticulum',
        'Mitochondria',
        'Ribosomes'
      ],
      correctIndex: 2,
      explanation: 'A spiral sheath of mitochondria in the middle piece generates continuous ATP through oxidative phosphorylation to power flagellar motility.'
    },
    {
      topic: 'Gamete Cytology',
      question: 'Which specialized structure at the anterior tip of the sperm head contains hydrolytic enzymes for penetrating ovum coats?',
      options: [
        'Centrosome',
        'Acrosome',
        'Axoneme',
        'Corona radiata'
      ],
      correctIndex: 1,
      explanation: 'The acrosome is a modified Golgi cap containing enzymes like hyaluronidase and acrosin that digest the protective corona radiata and zona pellucida of the ovum.'
    },
    {
      topic: 'Site of Fertilization',
      question: 'In the human female reproductive tract, fertilization usually takes place in which specific structure?',
      options: [
        'Uterine cavity',
        'Cervical canal',
        'Fallopian tube (Ampulla)',
        'Ovarian cortex'
      ],
      correctIndex: 2,
      explanation: 'Fertilization (syngamy) typically occurs in the ampulla (upper third) of the Fallopian tube / Oviduct.'
    },
    {
      topic: 'Menstrual Cycle',
      question: 'Which critical hormonal event directly triggers ovulation on approximately Day 14 of the menstrual cycle?',
      options: [
        'A sharp surge in LH (Luteinizing Hormone)',
        'A sudden plunge in estrogen below baseline',
        'A rapid spike in progesterone secretion',
        'A sharp drop in both FSH and oxytocin'
      ],
      correctIndex: 0,
      explanation: 'Peak estrogen from the Graafian follicle triggers positive feedback causing a massive LH Surge, which ruptures the follicle and releases the ovum. LH Surge = Ovulation!'
    },
    {
      topic: 'Ovarian Endocrinology',
      question: 'Following ovulation, the ruptured follicle transforms into the corpus luteum, which primarily secretes:',
      options: [
        'FSH',
        'Progesterone',
        'Oxytocin',
        'Prolactin'
      ],
      correctIndex: 1,
      explanation: 'The corpus luteum ("yellow body") secretes high levels of progesterone to maintain and vascularize the uterine endometrium for potential pregnancy.'
    },
    {
      topic: 'Uterine Physiology',
      question: 'What is the primary role of progesterone during the luteal (secretory) phase of the menstrual cycle?',
      options: [
        'Stimulating development of primary ovarian follicles',
        'Maintaining the vascular, secretory uterine endometrium',
        'Inducing rapid shedding and menstruation',
        'Triggering the immediate release of secondary oocytes'
      ],
      correctIndex: 1,
      explanation: 'Progesterone converts the endometrium into a thick, nutrient-rich, secretory bed for blastocyst implantation and suppresses uterine contractions.'
    },
    {
      topic: 'Menstrual Cycle',
      question: 'If fertilization does not take place, what physiological event marks Day 1 of a new menstrual cycle?',
      options: [
        'Onset of LH surge',
        'Breakdown and discharge of the uterine endometrium (Menstruation)',
        'Implantation of the morula',
        'Peak secretory activity of the corpus luteum'
      ],
      correctIndex: 1,
      explanation: 'When the corpus luteum degenerates, estrogen and progesterone plunge, causing necrosis and shedding of the endometrial lining (menstruation), marking Day 1.'
    },
    {
      topic: 'Gamete Comparison',
      question: 'Compared with a sperm cell, a mature human ovum is characterized by being:',
      options: [
        'Smaller, motile, and devoid of cellular organelles',
        'Much larger, non-motile, with abundant cytoplasm and nutrient yolk',
        'Equally motile with an axoneme tail',
        'Produced continuously in hundreds of millions daily'
      ],
      correctIndex: 1,
      explanation: 'The ovum is non-motile, ~100–120 µm in size (~85,000x larger volume than sperm), and contains abundant cytoplasm and maternal organelles for early cleavage.'
    },
    {
      topic: 'Pathology & STIs',
      question: 'What is the medically accurate distinction between HIV and AIDS?',
      options: [
        'HIV is a bacterial infection, while AIDS is a fungal infection',
        'HIV is the causative viral pathogen, while AIDS is the advanced clinical syndrome',
        'AIDS is the infectious agent, whereas HIV is the genetic disease',
        'HIV only infects erythrocytes, while AIDS affects platelets'
      ],
      correctIndex: 1,
      explanation: 'HIV (Human Immunodeficiency Virus) is the causative retrovirus that depletes CD4+ T-lymphocytes; AIDS is the resultant advanced clinical syndrome with severe opportunistic infections.'
    },
    {
      topic: 'Pathology & STIs',
      question: 'Which sexually transmitted bacterial infection is caused by the spirochete Treponema pallidum?',
      options: [
        'Gonorrhea',
        'Syphilis',
        'Genital Herpes',
        'Chlamydia'
      ],
      correctIndex: 1,
      explanation: 'Syphilis is caused by the bacterium Treponema pallidum. Gonorrhea is caused by Neisseria gonorrhoeae.'
    },
    {
      topic: 'Embryogenesis',
      question: 'In human sexual reproduction, syngamy of a haploid sperm (n=23) and a haploid ovum (n=23) results in a:',
      options: [
        'Haploid blastocyst',
        'Diploid (2n = 46) zygote',
        'Triploid (3n = 69) gamete',
        'Tetraploid (4n = 92) morula'
      ],
      correctIndex: 1,
      explanation: 'Fertilization fuses two haploid gametes (23 chromosomes each) to restore the diploid chromosome number (2n=46) in the zygote.'
    }
  ];

  let currentQuestionIndex = 0;
  let currentScore = 0;
  let answeredQuestions = new Array(quizQuestions.length).fill(null);

  function renderQuestion(index) {
    const q = quizQuestions[index];
    const questionText = document.getElementById('quiz-question-text');
    const topicTag = document.getElementById('quiz-topic-tag');
    const optionsContainer = document.getElementById('quiz-options-container');
    const progressCounter = document.getElementById('quiz-progress-counter');
    const liveScoreBadge = document.getElementById('quiz-live-score');
    const explanationDrawer = document.getElementById('quiz-explanation');
    const btnNext = document.getElementById('btn-next-question');
    const footerHint = document.getElementById('quiz-footer-hint');

    if (!questionText || !optionsContainer) return;

    if (progressCounter) progressCounter.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    if (liveScoreBadge) liveScoreBadge.textContent = `Score: ${currentScore}/${quizQuestions.length}`;
    if (topicTag) topicTag.textContent = q.topic;
    questionText.textContent = q.question;

    if (explanationDrawer) explanationDrawer.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';
    if (footerHint) footerHint.textContent = 'Select one option to evaluate';

    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.id = `quiz-opt-${index}-${optIdx}`;

      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span>${optText}</span>
      `;

      btn.addEventListener('click', () => {
        handleOptionSelection(optIdx, q, btn, optionsContainer);
      });

      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelection(selectedIndex, questionObj, selectedBtn, container) {
    if (answeredQuestions[currentQuestionIndex] !== null) return; // Prevent changing answer

    answeredQuestions[currentQuestionIndex] = selectedIndex;
    const isCorrect = (selectedIndex === questionObj.correctIndex);

    // Disable all options
    container.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === questionObj.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      currentScore++;
      const liveScoreBadge = document.getElementById('quiz-live-score');
      if (liveScoreBadge) liveScoreBadge.textContent = `Score: ${currentScore}/${quizQuestions.length}`;
    }

    // Show Explanation
    const explanationDrawer = document.getElementById('quiz-explanation');
    const explanationBody = document.getElementById('quiz-explanation-body');
    const explanationTitle = document.getElementById('quiz-explanation-title');

    if (explanationDrawer && explanationBody) {
      explanationTitle.innerHTML = isCorrect ? '✅ Correct! Conceptual Insight' : '❌ Conceptual Breakdown &amp; Solution';
      explanationTitle.style.color = isCorrect ? '#065f46' : '#9f1239';
      explanationBody.textContent = questionObj.explanation;
      explanationDrawer.style.display = 'block';
    }

    // Show Next or Results button
    const btnNext = document.getElementById('btn-next-question');
    const footerHint = document.getElementById('quiz-footer-hint');

    if (btnNext) {
      btnNext.style.display = 'inline-flex';
      if (currentQuestionIndex === quizQuestions.length - 1) {
        btnNext.textContent = 'View Quiz Summary 📊';
      } else {
        btnNext.textContent = 'Next Question →';
      }
    }
    if (footerHint) footerHint.textContent = isCorrect ? 'Well done!' : 'Review the concept above';
  }

  const btnNextQuestion = document.getElementById('btn-next-question');
  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
      } else {
        showQuizResults();
      }
    });
  }

  function showQuizResults() {
    const activeBox = document.getElementById('quiz-active-box');
    const resultsScreen = document.getElementById('quiz-results-screen');
    const pctText = document.getElementById('results-pct-text');
    const correctCount = document.getElementById('results-correct-count');
    const feedbackTitle = document.getElementById('results-feedback-title');
    const feedbackDesc = document.getElementById('results-feedback-desc');
    const gauge = document.getElementById('results-gauge-element');

    if (activeBox) activeBox.style.display = 'none';
    if (resultsScreen) resultsScreen.style.display = 'block';

    const percentage = Math.round((currentScore / quizQuestions.length) * 100);

    if (pctText) pctText.textContent = `${percentage}%`;
    if (correctCount) correctCount.textContent = currentScore;

    if (gauge) {
      const degrees = (percentage / 100) * 360;
      gauge.style.setProperty('--gauge-deg', `${degrees}deg`);
    }

    // Feedback according to score tier
    let titleText = '';
    let descText = '';

    if (percentage >= 90) {
      titleText = '🌟 Outstanding MDCAT Mastery!';
      descText = `Exceptional! You scored ${currentScore}/15 (${percentage}%). You have an excellent command of human reproduction, hormonal control, and clinical pathologies.`;
    } else if (percentage >= 70) {
      titleText = '👏 Very Good Performance!';
      descText = `Great job! You scored ${currentScore}/15 (${percentage}%). Review the few missed concepts in the menstrual cycle and hormone sections to reach 100%.`;
    } else if (percentage >= 50) {
      titleText = '💪 Solid Foundation - Keep Practicing!';
      descText = `You scored ${currentScore}/15 (${percentage}%). Revisit the interactive anatomy hotspots, LH surge notes, and memory vault mnemonics.`;
    } else {
      titleText = '📖 Chapter Review Recommended';
      descText = `You scored ${currentScore}/15 (${percentage}%). Go through the interactive diagrams and quick revision flashcards, then retake the quiz.`;
    }

    if (feedbackTitle) feedbackTitle.textContent = titleText;
    if (feedbackDesc) feedbackDesc.textContent = descText;

    // Save score
    appState.quizAttempted = true;
    appState.quizScore = currentScore;
    if (currentScore > appState.bestScore) {
      appState.bestScore = currentScore;
    }
    saveState();
    showToast(`Quiz Completed: ${percentage}%`, '🎯');
  }

  // Retake quiz button
  const btnRetake = document.getElementById('btn-retake-quiz');
  if (btnRetake) {
    btnRetake.addEventListener('click', () => {
      currentQuestionIndex = 0;
      currentScore = 0;
      answeredQuestions = new Array(quizQuestions.length).fill(null);

      const activeBox = document.getElementById('quiz-active-box');
      const resultsScreen = document.getElementById('quiz-results-screen');
      if (resultsScreen) resultsScreen.style.display = 'none';
      if (activeBox) activeBox.style.display = 'block';

      renderQuestion(0);
    });
  }

  // Initialize first quiz question
  renderQuestion(0);

  // ==========================================================================
  // 10. CHAPTER COMPLETION SYSTEM
  // ==========================================================================
  function markChapterAsComplete() {
    appState.chapterCompleted = true;
    if (!appState.completedSections.includes('chapter-complete')) {
      appState.completedSections.push('chapter-complete');
    }
    saveState();

    showToast('🏆 Chapter 18: Reproduction Marked 100% Complete!', '🎉');

    const btnComplete = document.getElementById('btn-mark-chapter-complete');
    if (btnComplete) {
      btnComplete.innerHTML = `
        <span>✔ Completed (100%)</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      `;
      btnComplete.style.background = '#059669';
    }

    const btnResultsComplete = document.getElementById('btn-results-complete');
    if (btnResultsComplete) {
      btnResultsComplete.textContent = '✔ Chapter 100% Complete';
      btnResultsComplete.disabled = true;
    }
  }

  const btnMarkComplete = document.getElementById('btn-mark-chapter-complete');
  if (btnMarkComplete) {
    btnMarkComplete.addEventListener('click', markChapterAsComplete);
  }

  const btnResultsComplete = document.getElementById('btn-results-complete');
  if (btnResultsComplete) {
    btnResultsComplete.addEventListener('click', markChapterAsComplete);
  }

  // Initial UI refresh
  updateDashboardUI();
  if (appState.chapterCompleted) {
    const btnComplete = document.getElementById('btn-mark-chapter-complete');
    if (btnComplete) {
      btnComplete.innerHTML = `<span>✔ Completed (100%)</span>`;
    }
  }
});
