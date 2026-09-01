/**
 * EduNexa AI - MDCAT Biology Chapter: Support & Movement
 * Interactive Engine & Laboratory Scripts
 */

(function () {
  "use strict";

  // Persistent storage key
  const STORAGE_KEY = "studymate_support_movement_progress";

  // App State
  const state = {
    progress: 0,
    sectionsViewed: new Set(),
    selectedSkeletonRegion: "skull",
    skeletonFilter: "all", // all | axial | appendicular
    sarcomereContraction: 0, // 0 = relaxed, 100 = fully contracted
    contractionStep: 0,
    isContractionPlaying: false,
    contractionTimer: null,
    calciumActive: true,
    atpActive: true,
    selectedMuscle: "skeletal",
    selectedHierarchy: 0,
    selectedJoint: "shoulder",
    selectedSynovial: "fluid",
    flashcardsFlipped: new Set(),
    quizCurrentQuestion: 0,
    quizScore: 0,
    quizUserAnswers: {},
    quizAttempts: 0,
    quizBestScore: 0,
    revisionCurrentIndex: 0,
    revisionAutoPlay: false,
    revisionTimer: null
  };

  // Load progress from localStorage
  function loadSavedProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.quizBestScore = parsed.quizBestScore || 0;
        state.quizAttempts = parsed.quizAttempts || 0;
        if (parsed.sectionsViewed) {
          state.sectionsViewed = new Set(parsed.sectionsViewed);
        }
        if (parsed.completed) {
          state.progress = 100;
        }
      }
    } catch (e) {
      console.warn("Could not load saved progress:", e);
    }
  }

  function saveProgress() {
    try {
      const dataToSave = {
        progress: state.progress,
        sectionsViewed: Array.from(state.sectionsViewed),
        quizBestScore: state.quizBestScore,
        quizAttempts: state.quizAttempts,
        completed: state.progress >= 100,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Could not save progress:", e);
    }
  }

  // Skeleton Database
  const SKELETON_DATA = {
    skull: {
      name: "Skull & Cranial Cavity",
      type: "axial",
      count: 29,
      desc: "A rigid bony case protecting the brain (cranium, 8 bones) and supporting facial structures (14 facial bones, 6 auditory ossicles in the middle ear, and 1 hyoid bone in the neck). Articulates with the atlas (C1) vertebra via occipital condyles.",
      items: [
        { name: "Cranial Bones", count: "8 bones" },
        { name: "Facial Bones", count: "14 bones" },
        { name: "Auditory Ossicles", count: "6 (3 pairs)" },
        { name: "Hyoid Bone", count: "1 bone" }
      ],
      examPoint: "The skull belongs strictly to the Axial Skeleton. It articulates with the vertebral column via two occipital condyles."
    },
    spine: {
      name: "Vertebral Column (Spine)",
      type: "axial",
      count: 26,
      desc: "Flexible central column extending from the skull base to the pelvis. Protects the spinal cord, supports the head and trunk, and serves as an attachment point for ribs and back muscles.",
      items: [
        { name: "Cervical Vertebrae", count: "7 (C1-C7)" },
        { name: "Thoracic Vertebrae", count: "12 (T1-T12)" },
        { name: "Lumbar Vertebrae", count: "5 (L1-L5)" },
        { name: "Sacrum", count: "1 (5 fused)" },
        { name: "Coccyx", count: "1 (4 fused)" }
      ],
      examPoint: "The adult human vertebral column has 26 bones (33 distinct vertebrae in early childhood before sacral and coccygeal fusion)."
    },
    thorax: {
      name: "Rib Cage & Sternum",
      type: "axial",
      count: 25,
      desc: "Protective cage enclosing the heart and lungs, supporting the shoulder girdles, and playing a vital role in breathing mechanics. Composed of 12 pairs of ribs (24 total) and the central Sternum.",
      items: [
        { name: "True Ribs (Pairs 1-7)", count: "14 ribs" },
        { name: "False Ribs (Pairs 8-10)", count: "6 ribs" },
        { name: "Floating Ribs (11-12)", count: "4 ribs" },
        { name: "Sternum (Breastbone)", count: "1 bone" }
      ],
      examPoint: "Floating ribs (11th & 12th pairs) do NOT attach to the sternum anteriorly, giving them free anterior ends."
    },
    pectoral: {
      name: "Pectoral / Shoulder Girdle",
      type: "appendicular",
      count: 4,
      desc: "Attaches the upper limbs to the axial skeleton. Composed of 2 clavicles (anterior collarbones) and 2 scapulae (posterior shoulder blades). Forms the shallow glenohumeral joint allowing wide range of motion.",
      items: [
        { name: "Clavicles (Collarbones)", count: "2 bones" },
        { name: "Scapulae (Shoulder blades)", count: "2 bones" }
      ],
      examPoint: "Pectoral girdle belongs to the Appendicular skeleton and prioritizes mobility over structural stability."
    },
    "upper-limbs": {
      name: "Upper Limbs (Arms, Forearms & Hands)",
      type: "appendicular",
      count: 60,
      desc: "Specialized for grasping, manipulation, and fine motor skills. Each side consists of 1 Humerus, 1 Radius, 1 Ulna, 8 Carpals, 5 Metacarpals, and 14 Phalanges.",
      items: [
        { name: "Humerus (Arm)", count: "2 bones" },
        { name: "Radius & Ulna (Forearm)", count: "4 bones" },
        { name: "Carpals (Wrist)", count: "16 bones" },
        { name: "Metacarpals (Palm)", count: "10 bones" },
        { name: "Phalanges (Fingers)", count: "28 bones" }
      ],
      examPoint: "Total 60 bones in upper extremities. The Radius is situated laterally (thumb side); the Ulna is medial (pinky side)."
    },
    pelvis: {
      name: "Pelvic Girdle (Hip Bones)",
      type: "appendicular",
      count: 2,
      desc: "Heavy, robust basin-shaped girdle attaching lower limbs to axial skeleton. Composed of 2 Coxal (hip) bones. Each hip bone is formed by the fusion of three bones: Ilium, Ischium, and Pubis.",
      items: [
        { name: "Coxal Bones (Hip bones)", count: "2 bones" },
        { name: "Formed by", count: "Ilium, Ischium, Pubis" }
      ],
      examPoint: "The pelvic girdle belongs to the Appendicular skeleton and is specialized for heavy weight-bearing and stability."
    },
    "lower-limbs": {
      name: "Lower Limbs (Thighs, Legs & Feet)",
      type: "appendicular",
      count: 60,
      desc: "Strong weight-bearing pillars adapted for upright posture and bipedal locomotion. Each limb contains 1 Femur, 1 Patella, 1 Tibia, 1 Fibula, 7 Tarsals, 5 Metatarsals, and 14 Phalanges.",
      items: [
        { name: "Femur (Thigh bone)", count: "2 bones" },
        { name: "Patella (Kneecap)", count: "2 bones" },
        { name: "Tibia & Fibula (Leg)", count: "4 bones" },
        { name: "Tarsals (Ankle)", count: "14 bones" },
        { name: "Metatarsals & Phalanges", count: "38 bones" }
      ],
      examPoint: "The Femur is the longest, heaviest, and strongest bone in the human body. The Tibia bears the body's weight, while the Fibula is non-weight-bearing."
    }
  };

  // Contraction Steps Data
  const CONTRACTION_STAGES = [
    {
      step: 1,
      title: "1. Nerve Stimulation & Action Potential",
      desc: "Action potential travels down the motor neuron to the neuromuscular junction. Acetylcholine (ACh) is released into the synaptic cleft and depolarizes the sarcolemma."
    },
    {
      step: 2,
      title: "2. T-Tubules & Calcium (Ca²⁺) Release",
      desc: "The action potential spreads deep into the muscle fiber via Transverse (T) Tubules, triggering the Sarcoplasmic Reticulum to release stored Calcium ions (Ca²⁺) into the sarcoplasm."
    },
    {
      step: 3,
      title: "3. Calcium Binds to Troponin",
      desc: "Released Calcium ions bind to Troponin-C on the actin thin filaments. This binding induces a conformational change in the troponin molecule."
    },
    {
      step: 4,
      title: "4. Tropomyosin Shifts & Exposes Active Sites",
      desc: "The conformational change pulls Tropomyosin out of the myosin-binding grooves on Actin, fully uncovering the active binding sites for myosin cross-bridges."
    },
    {
      step: 5,
      title: "5. Cross-Bridge Formation",
      desc: "Energized myosin heads (carrying ADP + inorganic phosphate, Pi) bind strongly to the newly exposed active sites on the actin thin filament."
    },
    {
      step: 6,
      title: "6. Power Stroke (Actin Slides)",
      desc: "Myosin heads pivot toward the center of the sarcomere (M-line), releasing ADP and Pi. This power stroke pulls the actin thin filaments past the thick filaments."
    },
    {
      step: 7,
      title: "7. ATP Binds & Detaches Cross-Bridge",
      desc: "A new ATP molecule binds to the myosin head. This causes the myosin head to detach from actin. (Absence of ATP causes muscles to lock in Rigor Mortis)."
    },
    {
      step: 8,
      title: "8. ATP Hydrolysis & Resetting / Shortening",
      desc: "Myosin ATPase hydrolyzes ATP to ADP + Pi, resetting the myosin head to its high-energy cocked state. Sarcomere shortens while filaments maintain their constant lengths."
    }
  ];

  // 17 Vault Flashcards Data
  const FLASHCARD_DATA = [
    {
      term: "206 Bones",
      answer: "Adult human skeleton contains 206 bones (80 Axial + 126 Appendicular).",
      tag: "Skeleton Total"
    },
    {
      term: "Axial Skeleton",
      answer: "Central axis bones (80 total): Skull (29), Vertebrae (26), Ribs (24), Sternum (1).",
      tag: "Axial System"
    },
    {
      term: "Appendicular Skeleton",
      answer: "Limbs & girdles (126 total): Pectoral (4), Upper Limbs (60), Pelvic (2), Lower Limbs (60).",
      tag: "Appendicular System"
    },
    {
      term: "Bone Matrix",
      answer: "Rigid connective tissue with mineralized matrix (Calcium Phosphate/Hydroxyapatite) & Osteocytes. Well-vascularized.",
      tag: "Tissue Biology"
    },
    {
      term: "Cartilage Matrix",
      answer: "Flexible connective tissue with Chondrocytes in lacunae. Crucially AVASCULAR with slow repair.",
      tag: "Tissue Biology"
    },
    {
      term: "Skeletal Muscle",
      answer: "Striated, Voluntary, Multi-nucleated with peripheral nuclei. Attached to skeleton via tendons.",
      tag: "Muscle Histology"
    },
    {
      term: "Smooth Muscle",
      answer: "Non-striated, Involuntary, Spindle-shaped single central nucleus. Found in walls of hollow organs.",
      tag: "Muscle Histology"
    },
    {
      term: "Cardiac Muscle",
      answer: "Striated, Involuntary, Branched fibers with Intercalated Discs. Exclusively in the heart myocardium.",
      tag: "Muscle Histology"
    },
    {
      term: "Sarcomere",
      answer: "The basic functional contractile unit of a muscle fiber, spanning between two consecutive Z-lines/discs.",
      tag: "Sarcomere Unit"
    },
    {
      term: "Actin",
      answer: "Thin myofilament composed of F-actin double helix associated with Troponin and Tropomyosin regulatory proteins.",
      tag: "Myofilament"
    },
    {
      term: "Myosin",
      answer: "Thick myofilament composed of protein tails and protruding globular cross-bridge heads with ATPase activity.",
      tag: "Myofilament"
    },
    {
      term: "Role of Calcium (Ca²⁺)",
      answer: "Binds Troponin-C, causing Tropomyosin to shift and expose myosin-binding active sites on actin.",
      tag: "Molecular Trigger"
    },
    {
      term: "Role of ATP",
      answer: "Required to detach myosin heads from actin, re-cock cross-bridges, and pump Ca²⁺ back to Sarcoplasmic Reticulum.",
      tag: "Energy Currency"
    },
    {
      term: "Ligament",
      answer: "Dense fibrous connective tissue that connects BONE to BONE. (Memory: LINK = Ligament).",
      tag: "Connective Tissue"
    },
    {
      term: "Tendon",
      answer: "Tough collagenous cord that connects MUSCLE to BONE. (Memory: TRANSFER = Tendon).",
      tag: "Connective Tissue"
    },
    {
      term: "Synovial Fluid",
      answer: "Lubricating fluid secreted by synovial membrane in freely movable joints to reduce friction and nourish cartilage.",
      tag: "Joint Mechanics"
    },
    {
      term: "Arthritis",
      answer: "Inflammation or degeneration of joints causing pain, morning stiffness, reduced range of motion, and swelling.",
      tag: "Pathology"
    }
  ];

  // 16 Rapid Revision Bullets
  const REVISION_BULLETS = [
    "Adult human skeleton contains approximately <strong>206 bones</strong>.",
    "<strong>Axial Skeleton (80 bones)</strong> = Skull, Vertebral Column, Ribs, Sternum (Central Axis).",
    "<strong>Appendicular Skeleton (126 bones)</strong> = Pectoral Girdle, Pelvic Girdle, Upper & Lower Limbs.",
    "<strong>Bone</strong> is mineralized (Calcium/Phosphate) and <strong>well-vascularized</strong> with Osteocytes.",
    "<strong>Cartilage</strong> is flexible, less mineralized, and <strong>AVASCULAR</strong> with Chondrocytes.",
    "<strong>Skeletal Muscle</strong> = Striated + Voluntary + Attached to bones.",
    "<strong>Smooth Muscle</strong> = Non-striated + Involuntary + Internal hollow organs.",
    "<strong>Cardiac Muscle</strong> = Striated + Involuntary + Heart (Intercalated Discs).",
    "<strong>Sarcomere</strong> = Basic functional unit of skeletal muscle contraction between two <strong>Z-lines</strong>.",
    "<strong>Actin</strong> = Thin myofilament; <strong>Myosin</strong> = Thick myofilament.",
    "During contraction, filaments <strong>SLIDE</strong> past each other; they <strong>DO NOT</strong> shorten.",
    "<strong>A-band</strong> remains constant in length; <strong>I-band</strong> and <strong>H-zone</strong> shorten.",
    "<strong>Calcium (Ca²⁺)</strong> binds Troponin to expose myosin-binding sites on actin.",
    "<strong>ATP</strong> is required for myosin head detachment and cross-bridge resetting.",
    "<strong>Ligament</strong> = Bone to Bone; <strong>Tendon</strong> = Muscle to Bone.",
    "<strong>Synovial Fluid</strong> is produced by the synovial membrane to lubricate joints."
  ];

  // 15 High-Yield MDCAT MCQs
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "How many total bones constitute the adult human skeleton, and what is their proper division into axial and appendicular systems?",
      options: [
        "206 bones: 80 Axial, 126 Appendicular",
        "206 bones: 126 Axial, 80 Appendicular",
        "208 bones: 88 Axial, 120 Appendicular",
        "200 bones: 100 Axial, 100 Appendicular"
      ],
      correctIndex: 0,
      explanation: "The adult human skeleton has 206 bones: 80 in the axial skeleton (skull, vertebrae, ribs, sternum) and 126 in the appendicular skeleton (girdles and limbs)."
    },
    {
      id: 2,
      question: "Which of the following bones belongs exclusively to the Axial Skeleton?",
      options: [
        "Clavicle",
        "Scapula",
        "Sternum",
        "Coxal bone"
      ],
      correctIndex: 2,
      explanation: "The Sternum (breastbone) is part of the thoracic cage in the axial skeleton. Clavicle, scapula, and coxal bones belong to the appendicular skeleton."
    },
    {
      id: 3,
      question: "Which statement accurately highlights a fundamental histological difference between bone and cartilage tissue?",
      options: [
        "Bone is avascular, while cartilage is rich in Haversian blood vessels",
        "Bone matrix is mineralized with calcium/phosphate and vascularized; cartilage is generally avascular",
        "Bone contains chondrocytes; cartilage contains osteocytes",
        "Cartilage is harder and more rigid than compact bone"
      ],
      correctIndex: 1,
      explanation: "Bone is heavily mineralized (hydroxyapatite) and well-vascularized with osteocytes. Cartilage is flexible, contains chondrocytes, and is avascular (lacks direct blood vessels)."
    },
    {
      id: 4,
      question: "A muscle biopsy reveals striated tissue that operates involuntarily and contains specialized intercalated discs. This muscle is:",
      options: [
        "Skeletal muscle",
        "Smooth muscle",
        "Cardiac muscle",
        "Visceral muscle"
      ],
      correctIndex: 2,
      explanation: "Cardiac muscle is striated, involuntary, and uniquely features intercalated discs (gap junctions and desmosomes) for synchronized contraction."
    },
    {
      id: 5,
      question: "Which combination of structural and functional traits correctly describes Smooth Muscle?",
      options: [
        "Striated + Voluntary + Multi-nucleated",
        "Striated + Involuntary + Branched",
        "Non-striated + Involuntary + Spindle-shaped with single nucleus",
        "Non-striated + Voluntary + Spindle-shaped"
      ],
      correctIndex: 2,
      explanation: "Smooth muscle fibers are non-striated, involuntary, spindle-shaped (fusiform), with a single central nucleus, found in hollow internal organs."
    },
    {
      id: 6,
      question: "What is the correct structural hierarchy of skeletal muscle organization from largest to smallest level?",
      options: [
        "Muscle → Fascicle → Muscle fiber → Myofibril → Sarcomere",
        "Muscle → Muscle fiber → Fascicle → Sarcomere → Myofibril",
        "Fascicle → Muscle → Myofibril → Muscle fiber → Sarcomere",
        "Muscle → Myofibril → Muscle fiber → Fascicle → Sarcomere"
      ],
      correctIndex: 0,
      explanation: "Gross Muscle (Epimysium) → Fascicle (Perimysium) → Muscle Fiber (Endomysium/Sarcolemma) → Myofibril → Sarcomere (Functional unit)."
    },
    {
      id: 7,
      question: "In a skeletal muscle myofibril, a single sarcomere is structurally defined as the contractile segment between two consecutive:",
      options: [
        "M-lines",
        "H-zones",
        "Z-lines / Z-discs",
        "A-bands"
      ],
      correctIndex: 2,
      explanation: "A sarcomere is the basic functional unit of skeletal muscle contraction located strictly between two consecutive Z-lines (Z-discs)."
    },
    {
      id: 8,
      question: "According to the Sliding Filament Theory, which of the following bands/zones remains CONSTANT in width during active muscle contraction?",
      options: [
        "I-band",
        "H-zone",
        "A-band",
        "Distance between adjacent Z-lines"
      ],
      correctIndex: 2,
      explanation: "The A-band corresponds to the full length of the thick myosin filaments, which do not change in length during contraction. The I-band, H-zone, and sarcomere shorten."
    },
    {
      id: 9,
      question: "What is the direct biochemical trigger of Calcium (Ca²⁺) ions released from the sarcoplasmic reticulum during muscle contraction?",
      options: [
        "Directly hydrolyzing ATP into ADP and Pi",
        "Binding to Troponin-C to shift Tropomyosin away from actin binding sites",
        "Binding directly to the myosin tail to lengthen the thick filament",
        "Synthesizing acetylcholine in the synaptic cleft"
      ],
      correctIndex: 1,
      explanation: "Calcium ions bind to Troponin-C, causing a conformational change that pulls Tropomyosin off the active myosin-binding sites on the actin thin filament."
    },
    {
      id: 10,
      question: "During cross-bridge cycling, what molecular event is directly responsible for the DETACHMENT of the myosin head from the actin filament?",
      options: [
        "Release of Calcium back into the sarcoplasm",
        "Binding of a new ATP molecule to the myosin head",
        "Hydrolysis of ADP into AMP",
        "Shift of Tropomyosin back over the binding site"
      ],
      correctIndex: 1,
      explanation: "Binding of a fresh ATP molecule to the myosin head causes detachment from the actin binding site. In ATP absence, cross-bridges cannot detach, causing Rigor Mortis."
    },
    {
      id: 11,
      question: "The immovable sutures between the bones of the adult human cranium represent which category of joint?",
      options: [
        "Synovial / Freely movable joints",
        "Cartilaginous / Slightly movable joints",
        "Fibrous / Immovable joints (Synarthroses)",
        "Ball and socket joints"
      ],
      correctIndex: 2,
      explanation: "Skull sutures are fibrous (immovable) joints where bones are tightly united by dense fibrous connective tissue, providing maximum protection."
    },
    {
      id: 12,
      question: "What is the primary physiological function of Synovial Fluid inside a freely movable joint cavity?",
      options: [
        "Mineralizing the bone matrix with calcium phosphate",
        "Lubricating articulating surfaces, reducing friction, and nourishing cartilage",
        "Transmitting muscular contractile forces directly to the periosteum",
        "Producing red blood cells via hematopoiesis"
      ],
      correctIndex: 1,
      explanation: "Synovial fluid is a viscous egg-white-like fluid secreted by the synovial membrane that lubricates joint surfaces, reduces friction, and nourishes avascular chondrocytes."
    },
    {
      id: 13,
      question: "A football athlete suffers an injury tearing a dense fibrous connective tissue band that directly connects his Femur to his Tibia. Which structure is damaged?",
      options: [
        "A Tendon",
        "A Ligament",
        "The Epimysium",
        "The Sarcoplasmic Reticulum"
      ],
      correctIndex: 1,
      explanation: "Ligaments connect Bone to Bone (Femur to Tibia) to stabilize joints. Tendons connect Muscle to Bone."
    },
    {
      id: 14,
      question: "Which anatomical structure transmits the mechanical tensile force generated by contracting muscle fibers directly to the skeleton to create movement?",
      options: [
        "Ligament",
        "Tendon",
        "Synovial membrane",
        "Articular cartilage"
      ],
      correctIndex: 1,
      explanation: "Tendons are tough, non-elastic collagenous bands that connect muscle to bone, transferring muscular tension into skeletal movement."
    },
    {
      id: 15,
      question: "Arthritis is fundamentally defined in medical biology as:",
      options: [
        "Bacterial infection of the bone marrow cavity",
        "Inflammation or degenerative disorder affecting one or more joints",
        "Lack of vitamin D causing soft bowed bones",
        "Genetic failure in actin and myosin protein synthesis"
      ],
      correctIndex: 1,
      explanation: "Arthritis is the general term for joint inflammation and cartilage degeneration, clinically presenting with pain, stiffness, reduced range of motion, and swelling."
    }
  ];

  // DOM Elements Initializer
  function initDOM() {
    loadSavedProgress();
    setupHeaderAndNav();
    setupSkeletonViewer();
    setupBoneCartilageSlider();
    setupMuscleLab();
    setupHierarchyZoom();
    setupSarcomereSimulator();
    setupContractionPlayer();
    setupMolecularSwitches();
    setupJointExplorer();
    setupConnectiveMemoryButtons();
    setupSynovialExplorer();
    setupFlashcardVault();
    setupRapidRevisionModal();
    setupQuiz();
    setupChapterCompletion();
    setupScrollObserver();
    updateDashboardMetrics();
  }

  // Header & Scroll Tracking
  function setupHeaderAndNav() {
    const header = document.getElementById("chapterHeader");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Quick nav highlight on click
    const navLinks = document.querySelectorAll(".quick-nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // Update Dynamic Metrics
  function updateDashboardMetrics() {
    const progressEl = document.getElementById("progressPercentage");
    const progressFill = document.getElementById("progressFillMini");
    const sectionsCountEl = document.getElementById("sectionsViewedCount");
    const quizBestScoreEl = document.getElementById("bestQuizScore");
    const quizAttemptsEl = document.getElementById("quizAttemptsCount");

    // Calculate progress percentage
    const totalTopics = 14;
    const viewedCount = state.sectionsViewed.size;
    const calculatedProgress = Math.min(100, Math.round((viewedCount / totalTopics) * 70 + (state.quizScore > 0 ? (state.quizScore / 15) * 30 : 0)));
    
    if (state.progress < 100) {
      state.progress = Math.max(state.progress, calculatedProgress);
    }

    if (progressEl) progressEl.textContent = `${state.progress}%`;
    if (progressFill) progressFill.style.width = `${state.progress}%`;
    if (sectionsCountEl) sectionsCountEl.textContent = `${viewedCount}/${totalTopics}`;
    if (quizBestScoreEl) quizBestScoreEl.textContent = state.quizBestScore > 0 ? `${state.quizBestScore}/15` : "--/15";
    if (quizAttemptsEl) quizAttemptsEl.textContent = state.quizAttempts;

    saveProgress();
  }

  // Scroll Observer for Section Mastery
  function setupScrollObserver() {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          state.sectionsViewed.add(entry.target.id);
          updateDashboardMetrics();
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(sec => observer.observe(sec));
  }

  // VIP FEATURE 1: Interactive Skeleton Viewer
  function setupSkeletonViewer() {
    const filterBtns = document.querySelectorAll(".skeleton-toggle-group .toggle-btn");
    const boneZones = document.querySelectorAll(".bone-zone");
    const hotspots = document.querySelectorAll(".hotspot-dot");
    const quickPills = document.querySelectorAll(".region-select-pill");

    function renderSkeletonRegion(regionKey) {
      const data = SKELETON_DATA[regionKey];
      if (!data) return;

      state.selectedSkeletonRegion = regionKey;

      // Update Info Card
      const titleEl = document.getElementById("skeletonRegionTitle");
      const typeBadge = document.getElementById("skeletonRegionType");
      const countChip = document.getElementById("skeletonRegionCount");
      const descEl = document.getElementById("skeletonRegionDesc");
      const sublistEl = document.getElementById("skeletonRegionSublist");
      const examPointEl = document.getElementById("skeletonRegionExamPoint");

      if (titleEl) titleEl.textContent = data.name;
      if (typeBadge) {
        typeBadge.textContent = `${data.type} skeleton`;
        typeBadge.className = `region-type-badge badge-${data.type}`;
      }
      if (countChip) countChip.textContent = `${data.count} bones`;
      if (descEl) descEl.textContent = data.desc;
      if (examPointEl) examPointEl.textContent = data.examPoint;

      if (sublistEl) {
        sublistEl.innerHTML = data.items.map(item => `
          <div class="sublist-item">
            <strong>${item.name}</strong>
            <span>${item.count}</span>
          </div>
        `).join("");
      }

      // Update SVG styling
      boneZones.forEach(zone => {
        const zoneKey = zone.getAttribute("data-region");
        if (zoneKey === regionKey) {
          zone.classList.add("selected");
        } else {
          zone.classList.remove("selected");
        }
      });

      // Update Pills
      quickPills.forEach(pill => {
        if (pill.getAttribute("data-region") === regionKey) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });
    }

    function applySkeletonFilter(filter) {
      state.skeletonFilter = filter;
      boneZones.forEach(zone => {
        const zoneType = zone.getAttribute("data-type");
        zone.classList.remove("axial-highlight", "appendicular-highlight", "dimmed");

        if (filter === "axial") {
          if (zoneType === "axial") {
            zone.classList.add("axial-highlight");
          } else {
            zone.classList.add("dimmed");
          }
        } else if (filter === "appendicular") {
          if (zoneType === "appendicular") {
            zone.classList.add("appendicular-highlight");
          } else {
            zone.classList.add("dimmed");
          }
        }
      });
    }

    // Toggle filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applySkeletonFilter(btn.getAttribute("data-filter"));
      });
    });

    // Bone Zones Click & Hover
    boneZones.forEach(zone => {
      zone.addEventListener("click", () => {
        renderSkeletonRegion(zone.getAttribute("data-region"));
      });
    });

    hotspots.forEach(spot => {
      spot.addEventListener("click", () => {
        renderSkeletonRegion(spot.getAttribute("data-region"));
      });
    });

    // Quick selector pills
    quickPills.forEach(pill => {
      pill.addEventListener("click", () => {
        renderSkeletonRegion(pill.getAttribute("data-region"));
      });
    });

    // Initial render
    renderSkeletonRegion("skull");
  }

  // Section 3: Bone vs Cartilage Interactive Slider
  function setupBoneCartilageSlider() {
    const slider = document.getElementById("boneCartilageSlider");
    const banner = document.getElementById("sliderStateBanner");
    const tableRows = document.querySelectorAll(".comparison-table tbody tr");

    if (!slider) return;

    slider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (val < 35) {
        banner.textContent = "Current View: 🧊 CARTILAGE (Flexible, Avascular, Chondrocytes)";
        banner.style.color = "var(--accent-sky)";
      } else if (val > 65) {
        banner.textContent = "Current View: 🦴 COMPACT BONE (Rigid, Mineralized Hydroxyapatite, Osteocytes)";
        banner.style.color = "var(--primary-emerald-dark)";
      } else {
        banner.textContent = "Current View: ⚖️ TRANSITIONAL FIBROCARTILAGE (Intermediate strength & elasticity)";
        banner.style.color = "var(--text-navy-primary)";
      }
    });
  }

  // Section 4: Muscle Types Interactive Lab
  function setupMuscleLab() {
    const muscleCards = document.querySelectorAll(".muscle-type-card");
    const infoText = document.getElementById("selectedMuscleInfo");

    const descriptions = {
      skeletal: "Skeletal Muscle is striated and strictly under voluntary somatic nervous control. Fibers are cylindrical, multi-nucleated with peripheral nuclei, and attach to the skeleton to create body movement.",
      smooth: "Smooth Muscle is non-striated (lacks sarcomeres) and under involuntary autonomic control. Fibers are spindle-shaped with a single central nucleus, found in the walls of the gut, blood vessels, and bronchi.",
      cardiac: "Cardiac Muscle is striated and operates involuntarily with intrinsic rhythmic pacemaker activity. Fibers are branched with Intercalated Discs (gap junctions & desmosomes) to synchronize heartbeat."
    };

    muscleCards.forEach(card => {
      card.addEventListener("click", () => {
        muscleCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        const type = card.getAttribute("data-muscle");
        state.selectedMuscle = type;
        if (infoText) {
          infoText.textContent = descriptions[type] || "";
        }
      });
    });
  }

  // Section 5: Muscle Hierarchy Zoom Pathway
  function setupHierarchyZoom() {
    const nodes = document.querySelectorAll(".hierarchy-step-node");
    const titleEl = document.getElementById("hierarchyDetailTitle");
    const descEl = document.getElementById("hierarchyDetailDesc");

    const hierarchyData = [
      {
        title: "1. Gross Muscle (Organ Level)",
        desc: "The entire anatomical muscle belly (e.g. Biceps brachii). Surrounded and enclosed by the dense connective tissue sheath called the Epimysium. Anchored to bone via tendons."
      },
      {
        title: "2. Muscle Fascicle (Bundle Level)",
        desc: "A bundle of 10 to 100+ skeletal muscle fibers bundled together. Ensheathed by the collagenous connective tissue layer called the Perimysium."
      },
      {
        title: "3. Muscle Fiber / Myocyte (Cellular Level)",
        desc: "A single elongated, multi-nucleated muscle cell. Enclosed by its specialized plasma membrane (Sarcolemma) and wrapped in delicate Endomysium. Contains sarcoplasm, mitochondria, and myofibrils."
      },
      {
        title: "4. Myofibril (Organelle Level)",
        desc: "A cylindrical contractile organelle running parallel the entire length of the muscle fiber. Packed with repeating microfilament units (myofilaments) called sarcomeres."
      },
      {
        title: "5. Sarcomere (Molecular Functional Unit)",
        desc: "The basic functional unit of skeletal muscle contraction spanning between two consecutive Z-lines. Contains interdigitating thin Actin and thick Myosin myofilaments."
      }
    ];

    nodes.forEach(node => {
      node.addEventListener("click", () => {
        nodes.forEach(n => n.classList.remove("active"));
        node.classList.add("active");
        const idx = parseInt(node.getAttribute("data-step"), 10);
        if (hierarchyData[idx]) {
          titleEl.textContent = hierarchyData[idx].title;
          descEl.textContent = hierarchyData[idx].desc;
        }
      });
    });
  }

  // VIP FEATURE 2: Animated Sarcomere Simulator (Sliding Filament Theory)
  function setupSarcomereSimulator() {
    const slider = document.getElementById("sarcomereSlider");
    const sliderValDisplay = document.getElementById("sarcomereSliderVal");
    const btnRelaxed = document.getElementById("btnSarcomereRelaxed");
    const btnContracted = document.getElementById("btnSarcomereContracted");
    
    // SVG Parts
    const leftZ = document.getElementById("zDiscLeft");
    const rightZ = document.getElementById("zDiscRight");
    const actinLeft = document.getElementById("actinLeftGroup");
    const actinRight = document.getElementById("actinRightGroup");
    const hZoneBracket = document.getElementById("hZoneBracket");
    const iBandBracket = document.getElementById("iBandBracket");
    const aBandStatus = document.getElementById("aBandStatus");
    const hZoneStatus = document.getElementById("hZoneStatus");
    const iBandStatus = document.getElementById("iBandStatus");
    const sarcomereStatus = document.getElementById("sarcomereLengthStatus");

    function renderSarcomereState(percent) {
      state.sarcomereContraction = percent;
      if (slider) slider.value = percent;
      if (sliderValDisplay) sliderValDisplay.textContent = `${percent}%`;

      // Movement calculations:
      // When relaxed (0%): Z-lines far apart (dx = 0)
      // When contracted (100%): Z-lines shift inwards by ~45px each
      const zShift = (percent / 100) * 45;
      const actinShift = (percent / 100) * 45;

      if (leftZ) leftZ.setAttribute("transform", `translate(${zShift}, 0)`);
      if (rightZ) rightZ.setAttribute("transform", `translate(-${zShift}, 0)`);
      if (actinLeft) actinLeft.setAttribute("transform", `translate(${actinShift}, 0)`);
      if (actinRight) actinRight.setAttribute("transform", `translate(-${actinShift}, 0)`);

      // Update status badges
      if (sarcomereStatus) {
        const length = (2.5 - (percent / 100) * 0.7).toFixed(2);
        sarcomereStatus.textContent = `${length} µm (${percent > 0 ? "Shortened" : "Relaxed"})`;
      }
      if (hZoneStatus) {
        hZoneStatus.textContent = percent > 80 ? "Disappeared / Narrow" : percent > 30 ? "Narrowing" : "Wide (Open)";
      }
      if (iBandStatus) {
        iBandStatus.textContent = percent > 80 ? "Narrow (Shortened)" : percent > 30 ? "Shortening" : "Wide (Maximum)";
      }
      if (aBandStatus) {
        aBandStatus.textContent = "Constant (1.5 µm)";
      }
    }

    if (slider) {
      slider.addEventListener("input", (e) => {
        renderSarcomereState(parseInt(e.target.value, 10));
      });
    }

    if (btnRelaxed) {
      btnRelaxed.addEventListener("click", () => {
        btnRelaxed.classList.add("active");
        btnContracted.classList.remove("active");
        animateSarcomereTransition(0);
      });
    }

    if (btnContracted) {
      btnContracted.addEventListener("click", () => {
        btnContracted.classList.add("active");
        btnRelaxed.classList.remove("active");
        animateSarcomereTransition(100);
      });
    }

    function animateSarcomereTransition(target) {
      const start = state.sarcomereContraction;
      const startTime = performance.now();
      const duration = 400;

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const current = Math.round(start + (target - start) * progress);
        renderSarcomereState(current);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }

    // Initial relaxed state
    renderSarcomereState(0);
  }

  // Section 6: Muscle Contraction Step Player
  function setupContractionPlayer() {
    const playBtn = document.getElementById("btnPlayContraction");
    const pauseBtn = document.getElementById("btnPauseContraction");
    const replayBtn = document.getElementById("btnReplayContraction");
    const nextBtn = document.getElementById("btnNextContraction");
    const prevBtn = document.getElementById("btnPrevContraction");
    const stepDots = document.querySelectorAll(".step-dot");

    const badgeEl = document.getElementById("stageBadgeNumber");
    const titleEl = document.getElementById("stageTitle");
    const descEl = document.getElementById("stageDesc");

    function renderStage(stepIdx) {
      state.contractionStep = stepIdx;
      const stage = CONTRACTION_STAGES[stepIdx];
      if (!stage) return;

      if (badgeEl) badgeEl.textContent = stage.step;
      if (titleEl) titleEl.textContent = stage.title;
      if (descEl) descEl.textContent = stage.desc;

      stepDots.forEach((dot, idx) => {
        dot.classList.remove("active", "completed");
        if (idx === stepIdx) dot.classList.add("active");
        else if (idx < stepIdx) dot.classList.add("completed");
      });
    }

    function playSequence() {
      state.isContractionPlaying = true;
      if (playBtn) playBtn.style.display = "none";
      if (pauseBtn) pauseBtn.style.display = "inline-flex";

      clearInterval(state.contractionTimer);
      state.contractionTimer = setInterval(() => {
        if (state.contractionStep < CONTRACTION_STAGES.length - 1) {
          renderStage(state.contractionStep + 1);
        } else {
          pauseSequence();
        }
      }, 2400);
    }

    function pauseSequence() {
      state.isContractionPlaying = false;
      clearInterval(state.contractionTimer);
      if (playBtn) playBtn.style.display = "inline-flex";
      if (pauseBtn) pauseBtn.style.display = "none";
    }

    if (playBtn) playBtn.addEventListener("click", playSequence);
    if (pauseBtn) pauseBtn.addEventListener("click", pauseSequence);
    if (replayBtn) replayBtn.addEventListener("click", () => {
      pauseSequence();
      renderStage(0);
      playSequence();
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
      pauseSequence();
      if (state.contractionStep < CONTRACTION_STAGES.length - 1) {
        renderStage(state.contractionStep + 1);
      }
    });

    if (prevBtn) prevBtn.addEventListener("click", () => {
      pauseSequence();
      if (state.contractionStep > 0) {
        renderStage(state.contractionStep - 1);
      }
    });

    stepDots.forEach(dot => {
      dot.addEventListener("click", () => {
        pauseSequence();
        const step = parseInt(dot.getAttribute("data-step"), 10);
        renderStage(step);
      });
    });

    renderStage(0);
  }

  // Section 7: Molecular Controls (Calcium + ATP)
  function setupMolecularSwitches() {
    const calciumSwitch = document.getElementById("calciumSwitch");
    const atpSwitch = document.getElementById("atpSwitch");
    const calciumResult = document.getElementById("calciumResultText");
    const atpResult = document.getElementById("atpResultText");

    if (calciumSwitch) {
      calciumSwitch.addEventListener("change", (e) => {
        state.calciumActive = e.target.checked;
        if (state.calciumActive) {
          calciumResult.textContent = "✅ Ca²⁺ Present: Binds Troponin-C → Tropomyosin shifts → Active binding sites on Actin EXPOSED.";
          calciumResult.className = "molecular-state-result";
        } else {
          calciumResult.textContent = "🛑 Zero Ca²⁺: Tropomyosin covers actin active sites → Myosin cannot bind → Muscle in RELAXED state.";
          calciumResult.className = "molecular-state-result alert";
        }
      });
    }

    if (atpSwitch) {
      atpSwitch.addEventListener("change", (e) => {
        state.atpActive = e.target.checked;
        if (state.atpActive) {
          atpResult.textContent = "⚡ ATP Present: Enables myosin head detachment, power stroke resetting, and active Ca²⁺ pumping.";
          atpResult.className = "molecular-state-result";
        } else {
          atpResult.textContent = "⚠️ ATP Depleted: Myosin heads remain locked to actin filaments! (Causes RIGOR MORTIS).";
          atpResult.className = "molecular-state-result alert";
        }
      });
    }
  }

  // Section 8: Joint Explorer
  function setupJointExplorer() {
    const jointBtns = document.querySelectorAll(".joint-nav-btn");
    const titleEl = document.getElementById("jointDetailTitle");
    const categoryEl = document.getElementById("jointDetailCategory");
    const mobilityBadge = document.getElementById("jointMobilityBadge");
    const descEl = document.getElementById("jointDetailDesc");
    const structEl = document.getElementById("jointKeyStructure");
    const examEl = document.getElementById("jointExamTip");

    const jointsData = {
      shoulder: {
        name: "Shoulder Joint (Glenohumeral)",
        category: "Synovial — Ball & Socket",
        mobility: "Freely Movable (Multiaxial)",
        desc: "Articulation between the head of the humerus and the shallow glenoid cavity of the scapula. Offers the greatest range of movement of any joint in the body at the expense of stability.",
        keyStruct: "Glenoid labrum, rotator cuff muscles & tendons, capsular ligaments",
        examTip: "Ball & socket joints allow movement in all planes (flexion, extension, abduction, adduction, rotation, circumduction)."
      },
      elbow: {
        name: "Elbow Joint",
        category: "Synovial — Hinge Joint",
        mobility: "Freely Movable (Uniaxial)",
        desc: "Articulation between the trochlea/capitulum of the humerus and the trochlear notch of the ulna and head of the radius. Allows flexion and extension in a single sagittal plane.",
        keyStruct: "Collateral ligaments (ulnar & radial), annular ligament, synovial capsule",
        examTip: "Hinge joints allow movement strictly in one plane (like a door hinge)."
      },
      hip: {
        name: "Hip Joint (Coxofemoral)",
        category: "Synovial — Ball & Socket",
        mobility: "Freely Movable (Multiaxial)",
        desc: "Articulation between the spherical head of the femur and the deep cup-shaped acetabulum of the pelvis. Heavily reinforced for full body weight transmission and locomotion.",
        keyStruct: "Acetabular labrum, iliofemoral ligament (strongest ligament), ligamentum teres",
        examTip: "Much deeper and more stable than the shoulder joint, designed for weight-bearing."
      },
      knee: {
        name: "Knee Joint (Tibiofemoral)",
        category: "Synovial — Modified Hinge / Bicondylar",
        mobility: "Freely Movable (Biaxial)",
        desc: "The largest and most complex joint in the human body. Articulation between femur condyles, tibia condyles, and the patella sesamoid bone.",
        keyStruct: "Medial & lateral menisci (fibrocartilage shock absorbers), Cruciate ligaments (ACL/PCL), Patellar tendon",
        examTip: "Contains menisci to deepen articular surface and absorb vertical compressive shocks."
      },
      skull: {
        name: "Skull Sutures",
        category: "Fibrous Joint (Synarthrosis)",
        mobility: "Immovable (Zero Movement)",
        desc: "Rigid seams between adjacent cranial bones united by dense fibrous connective tissue. Locks the skull bones firmly together to safeguard the brain.",
        keyStruct: "Dense Sharpey's collagen fibers interlocking serrated bone edges",
        examTip: "Fibrous joints have no joint cavity and permit little to no movement."
      },
      vertebral: {
        name: "Intervertebral Joints",
        category: "Cartilaginous Joint (Amphiarthrosis)",
        mobility: "Slightly Movable",
        desc: "Articulations between adjacent vertebral bodies cushioned by fibrocartilaginous intervertebral discs. Provides flexibility to the trunk while absorbing shock.",
        keyStruct: "Intervertebral discs (Annulus fibrosus outer ring + Nucleus pulposus gelatinous core)",
        examTip: "Cartilaginous joints lack a synovial cavity and allow limited movement."
      }
    };

    jointBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        jointBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.getAttribute("data-joint");
        const data = jointsData[key];
        if (data) {
          titleEl.textContent = data.name;
          categoryEl.textContent = data.category;
          mobilityBadge.textContent = data.mobility;
          descEl.textContent = data.desc;
          structEl.textContent = data.keyStruct;
          examEl.textContent = data.examTip;
        }
      });
    });
  }

  // Section 9: Ligament vs Tendon Memory Actions
  function setupConnectiveMemoryButtons() {
    const btnLink = document.getElementById("btnMemoryLigament");
    const btnTransfer = document.getElementById("btnMemoryTendon");

    if (btnLink) {
      btnLink.addEventListener("click", () => {
        alert("⭐ MDCAT MEMORY TRICK:\n\n'LINK = LIGAMENT'\nLigament links Bone to Bone to prevent joint dislocation!");
      });
    }

    if (btnTransfer) {
      btnTransfer.addEventListener("click", () => {
        alert("⭐ MDCAT MEMORY TRICK:\n\n'TRANSFER = TENDON'\nTendon transfers contractile force from Muscle to Bone to create movement!");
      });
    }
  }

  // Section 10: Synovial Joint Cross Section Interactive Items
  function setupSynovialExplorer() {
    const items = document.querySelectorAll(".structure-item-card");
    const hotspots = document.querySelectorAll(".synovial-hotspot");

    function selectSynovialStructure(structKey) {
      state.selectedSynovial = structKey;
      items.forEach(item => {
        if (item.getAttribute("data-struct") === structKey) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    items.forEach(item => {
      item.addEventListener("click", () => {
        selectSynovialStructure(item.getAttribute("data-struct"));
      });
    });

    hotspots.forEach(spot => {
      spot.addEventListener("click", () => {
        selectSynovialStructure(spot.getAttribute("data-struct"));
      });
    });
  }

  // Section 12: VIP High-Yield Flashcard Vault (17 Cards)
  function setupFlashcardVault() {
    const vaultGrid = document.getElementById("vaultFlashcardsGrid");
    const countDisplay = document.getElementById("masteredCardsCount");

    if (!vaultGrid) return;

    vaultGrid.innerHTML = FLASHCARD_DATA.map((card, idx) => `
      <div class="flashcard-wrapper" data-index="${idx}">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <span class="card-prompt-label">MDCAT Concept</span>
            <div class="card-term">${card.term}</div>
            <span class="tap-hint">👆 Tap to flip & reveal</span>
          </div>
          <div class="flashcard-back">
            <div class="card-answer">${card.answer}</div>
            <span class="card-tag">⭐ ${card.tag}</span>
          </div>
        </div>
      </div>
    `).join("");

    const cardWrappers = vaultGrid.querySelectorAll(".flashcard-wrapper");
    cardWrappers.forEach(card => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        const idx = card.getAttribute("data-index");
        state.flashcardsFlipped.add(idx);
        if (countDisplay) {
          countDisplay.textContent = `${state.flashcardsFlipped.size} / ${FLASHCARD_DATA.length} Reviewed`;
        }
      });
    });
  }

  // Section 14: Rapid 60-Second Revision Modal
  function setupRapidRevisionModal() {
    const openBtn = document.getElementById("btnOpenRapidRevision");
    const modal = document.getElementById("revisionModalBackdrop");
    const closeBtn = document.getElementById("btnCloseRevision");
    const prevBtn = document.getElementById("btnRevisionPrev");
    const nextBtn = document.getElementById("btnRevisionNext");
    const autoBtn = document.getElementById("btnRevisionAuto");
    const factNumberEl = document.getElementById("revisionFactNumber");
    const factTextEl = document.getElementById("revisionFactText");

    if (!modal) return;

    function renderFact(idx) {
      state.revisionCurrentIndex = idx;
      if (factNumberEl) factNumberEl.textContent = `High-Yield Fact ${idx + 1} of ${REVISION_BULLETS.length}`;
      if (factTextEl) factTextEl.innerHTML = REVISION_BULLETS[idx];
    }

    function openModal() {
      modal.classList.add("active");
      renderFact(0);
    }

    function closeModal() {
      modal.classList.remove("active");
      clearInterval(state.revisionTimer);
      state.revisionAutoPlay = false;
      if (autoBtn) autoBtn.textContent = "▶ Auto-Advance";
    }

    if (openBtn) openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.revisionCurrentIndex < REVISION_BULLETS.length - 1) {
          renderFact(state.revisionCurrentIndex + 1);
        } else {
          renderFact(0);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.revisionCurrentIndex > 0) {
          renderFact(state.revisionCurrentIndex - 1);
        }
      });
    }

    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        state.revisionAutoPlay = !state.revisionAutoPlay;
        if (state.revisionAutoPlay) {
          autoBtn.textContent = "⏸ Pause Auto";
          state.revisionTimer = setInterval(() => {
            if (state.revisionCurrentIndex < REVISION_BULLETS.length - 1) {
              renderFact(state.revisionCurrentIndex + 1);
            } else {
              renderFact(0);
            }
          }, 3500);
        } else {
          autoBtn.textContent = "▶ Auto-Advance";
          clearInterval(state.revisionTimer);
        }
      });
    }
  }

  // Section 15: MDCAT Practice Quiz (15 MCQs)
  function setupQuiz() {
    const questionContainer = document.getElementById("quizQuestionContainer");
    const resultsContainer = document.getElementById("quizResultsContainer");
    const progressFill = document.getElementById("quizProgressFill");
    const questionCounter = document.getElementById("quizQuestionCounter");
    const nextBtn = document.getElementById("btnQuizNext");
    const retryBtn = document.getElementById("btnQuizRetry");

    function renderQuestion(idx) {
      const q = QUIZ_QUESTIONS[idx];
      if (!q || !questionContainer) return;

      const letters = ["A", "B", "C", "D"];

      questionContainer.innerHTML = `
        <div class="question-card-block">
          <div class="question-meta">Question ${idx + 1} of ${QUIZ_QUESTIONS.length} • MDCAT Standard</div>
          <div class="question-stem-text">${q.question}</div>
          <div class="options-list">
            ${q.options.map((opt, oIdx) => `
              <button class="option-btn" data-opt-index="${oIdx}">
                <div class="option-letter">${letters[oIdx]}</div>
                <span>${opt}</span>
              </button>
            `).join("")}
          </div>
          <div class="quiz-explanation-box" id="explanationBox">
            <div class="explanation-header" id="explanationHeader"></div>
            <div class="explanation-body">${q.explanation}</div>
          </div>
        </div>
      `;

      // Update trackers
      if (questionCounter) questionCounter.textContent = `Q ${idx + 1}/${QUIZ_QUESTIONS.length}`;
      if (progressFill) progressFill.style.width = `${((idx) / QUIZ_QUESTIONS.length) * 100}%`;
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.textContent = idx === QUIZ_QUESTIONS.length - 1 ? "Submit & View Results" : "Next Question →";
      }

      // Attach option listeners
      const optionBtns = questionContainer.querySelectorAll(".option-btn");
      optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          handleAnswerSelection(parseInt(btn.getAttribute("data-opt-index"), 10), q);
        });
      });
    }

    function handleAnswerSelection(selectedIdx, question) {
      const optionBtns = questionContainer.querySelectorAll(".option-btn");
      const expBox = document.getElementById("explanationBox");
      const expHeader = document.getElementById("explanationHeader");

      // Disable all options once picked
      optionBtns.forEach(b => b.disabled = true);

      state.quizUserAnswers[state.quizCurrentQuestion] = selectedIdx;

      const isCorrect = selectedIdx === question.correctIndex;
      if (isCorrect) {
        state.quizScore++;
        optionBtns[selectedIdx].classList.add("correct");
        expHeader.innerHTML = "✅ Correct! Excellent MDCAT Mastery.";
        expHeader.className = "explanation-header correct";
      } else {
        optionBtns[selectedIdx].classList.add("incorrect");
        optionBtns[question.correctIndex].classList.add("correct");
        expHeader.innerHTML = "❌ Incorrect. Key Concept Review:";
        expHeader.className = "explanation-header incorrect";
      }

      if (expBox) expBox.classList.add("visible");
      if (nextBtn) nextBtn.disabled = false;
    }

    function showResults() {
      if (questionContainer) questionContainer.style.display = "none";
      if (resultsContainer) resultsContainer.classList.add("visible");
      if (nextBtn) nextBtn.style.display = "none";

      const total = QUIZ_QUESTIONS.length;
      const score = state.quizScore;
      const percentage = Math.round((score / total) * 100);

      state.quizAttempts++;
      if (score > state.quizBestScore) {
        state.quizBestScore = score;
      }

      const scoreEl = document.getElementById("quizFinalScore");
      const percentageEl = document.getElementById("quizFinalPercentage");
      const tierEl = document.getElementById("quizPerformanceTier");
      const correctEl = document.getElementById("quizCorrectCount");
      const incorrectEl = document.getElementById("quizIncorrectCount");

      if (scoreEl) scoreEl.textContent = `${score} / ${total}`;
      if (percentageEl) percentageEl.textContent = `${percentage}%`;
      if (correctEl) correctEl.textContent = score;
      if (incorrectEl) incorrectEl.textContent = total - score;

      if (tierEl) {
        if (percentage >= 90) {
          tierEl.textContent = "🏆 Medical Merit Top Tier! Outstanding mastery of Support & Movement.";
        } else if (percentage >= 70) {
          tierEl.textContent = "🌟 Strong High-Yield Performance! Review the missed trap questions.";
        } else {
          tierEl.textContent = "📚 Recommended: Review the Rapid Revision facts and Trap Zone before retrying.";
        }
      }

      updateDashboardMetrics();
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.quizCurrentQuestion < QUIZ_QUESTIONS.length - 1) {
          state.quizCurrentQuestion++;
          renderQuestion(state.quizCurrentQuestion);
        } else {
          showResults();
        }
      });
    }

    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        state.quizCurrentQuestion = 0;
        state.quizScore = 0;
        state.quizUserAnswers = {};
        if (resultsContainer) resultsContainer.classList.remove("visible");
        if (questionContainer) questionContainer.style.display = "block";
        if (nextBtn) nextBtn.style.display = "inline-flex";
        renderQuestion(0);
      });
    }

    // Start Question 1
    renderQuestion(0);
  }

  // Chapter Completion System
  function setupChapterCompletion() {
    const markCompleteBtn = document.getElementById("btnMarkChapterComplete");
    const banner = document.getElementById("chapterCompleteBanner");

    if (markCompleteBtn) {
      markCompleteBtn.addEventListener("click", () => {
        state.progress = 100;
        updateDashboardMetrics();
        if (banner) banner.scrollIntoView({ behavior: "smooth" });
        alert("🎉 Congratulations! You have successfully mastered Chapter 16: Support & Movement for MDCAT.");
      });
    }
  }

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDOM);
  } else {
    initDOM();
  }
})();
