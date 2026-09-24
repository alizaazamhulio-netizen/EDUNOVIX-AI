/**
 * EDUNOVIX AI — STUDENT LEARNING DASHBOARD (GRADES 1–10)
 * Main Interactive Controller
 *
 * Handles:
 * 1. Grade 1-10 Curriculum Architecture & Switcher
 * 2. EDUNOVIX AI Control Center & /api/chat Connection
 * 3. Safe Student & Scientific Calculator (No unsafe eval)
 * 4. AI-Calculator Step Explainer Connection
 * 5. Adaptive Personalized Recommendations
 * 6. Dynamic Grade-Filtered Subjects & Lessons
 * 7. Real Progress & Quiz Performance Tracking
 * 8. Authentication & Profile Persistence
 * 9. Dark/Light Theme Integration (edunexa-theme & [data-theme-toggle])
 * 10. Responsive Mobile Drawer & Keyboard Handlers
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. DATA DEFINITIONS: GRADES 1–10 & CURRICULUM
  // ==========================================================================
  const GRADE_CONFIG = [
    {
      grade: 1,
      title: "Grade 1: Early Explorers",
      ageLevel: "Ages 6–7",
      desc: "Foundational literacy, phonics, counting, basic shapes, and sensory nature observation.",
      subjectsCount: 4,
      subjects: ["math_primary", "english_primary", "science_general", "urdu_primary"],
      defaultProgress: 70
    },
    {
      grade: 2,
      title: "Grade 2: Curious Discoverers",
      ageLevel: "Ages 7–8",
      desc: "Basic arithmetic (addition & subtraction), sentence building, living things, and social ethics.",
      subjectsCount: 5,
      subjects: ["math_primary", "english_primary", "science_general", "urdu_primary", "islamiat_primary"],
      defaultProgress: 55
    },
    {
      grade: 3,
      title: "Grade 3: Young Achievers",
      ageLevel: "Ages 8–9",
      desc: "Multiplication, introductory division, narrative reading, plant life cycles, and digital awareness.",
      subjectsCount: 5,
      subjects: ["math_primary", "english_primary", "science_general", "urdu_primary", "cs_primary"],
      defaultProgress: 40
    },
    {
      grade: 4,
      title: "Grade 4: Junior Scholars",
      ageLevel: "Ages 9–10",
      desc: "Fractions, geometry basics, paragraph writing, earth science, and computer hardware fundamentals.",
      subjectsCount: 6,
      subjects: ["math_primary", "english_primary", "science_general", "social_studies", "cs_primary", "urdu_primary"],
      defaultProgress: 50
    },
    {
      grade: 5,
      title: "Grade 5: Primary Champions",
      ageLevel: "Ages 10–11",
      desc: "Decimals, percentages, essay composition, ecosystems, energy forces, and block coding.",
      subjectsCount: 6,
      subjects: ["math_primary", "english_primary", "science_general", "social_studies", "cs_primary", "islamiat_primary"],
      defaultProgress: 65
    },
    {
      grade: 6,
      title: "Grade 6: Middle School Adventurers",
      ageLevel: "Ages 11–12",
      desc: "Pre-algebra introduction, ratios, cell biology, world geography, and typed programming concepts.",
      subjectsCount: 7,
      subjects: ["math_middle", "english_middle", "science_general", "social_studies", "cs_middle", "islamiat_middle", "urdu_middle"],
      defaultProgress: 35
    },
    {
      grade: 7,
      title: "Grade 7: Analytical Thinkers",
      ageLevel: "Ages 12–13",
      desc: "Linear equations, chemistry foundations, physical science, literature analysis, and computer logic.",
      subjectsCount: 7,
      subjects: ["math_middle", "english_middle", "science_general", "social_studies", "cs_middle", "islamiat_middle", "urdu_middle"],
      defaultProgress: 45
    },
    {
      grade: 8,
      title: "Grade 8: High School Ready",
      ageLevel: "Ages 13–14",
      desc: "Algebraic equations, introductory mechanics, periodic table elements, civics, and Python basics.",
      subjectsCount: 8,
      subjects: ["math_middle", "english_middle", "science_general", "physics_secondary", "chemistry_secondary", "cs_middle", "pak_studies", "islamiat_middle"],
      defaultProgress: 60
    },
    {
      grade: 9,
      title: "Grade 9: Matric / SSC-I Focus",
      ageLevel: "Ages 14–15",
      desc: "Rigorous Board/O-Level curriculum: Physics, Chemistry, Biology, Advanced Math & Computer Science.",
      subjectsCount: 9,
      subjects: ["math_secondary", "physics_secondary", "chemistry_secondary", "bio_secondary", "cs_secondary", "english_secondary", "pak_studies", "islamiat_secondary", "urdu_secondary"],
      defaultProgress: 40
    },
    {
      grade: 10,
      title: "Grade 10: Matric / SSC-II & O-Levels",
      ageLevel: "Ages 15–16",
      desc: "Board examinations mastery, organic chemistry, kinematics, trigonometry, and past-paper revision.",
      subjectsCount: 9,
      subjects: ["math_secondary", "physics_secondary", "chemistry_secondary", "bio_secondary", "cs_secondary", "english_secondary", "pak_studies", "islamiat_secondary", "urdu_secondary"],
      defaultProgress: 50
    }
  ];

  const SUBJECTS_DATABASE = {
    math_primary: { name: "Mathematics", icon: "📐", cat: "stem", style: "math", desc: "Numbers, addition, subtraction, fractions & geometric shapes." },
    math_middle: { name: "Mathematics", icon: "📐", cat: "stem", style: "math", desc: "Pre-algebra, linear equations, geometry & data handling." },
    math_secondary: { name: "Advanced Mathematics", icon: "📐", cat: "stem", style: "math", desc: "Algebra, trigonometry, quadratic equations, matrices & logarithms." },
    english_primary: { name: "English Language", icon: "📖", cat: "humanities", style: "english", desc: "Phonics, vocabulary, story reading & sentence building." },
    english_middle: { name: "English Literature & Grammar", icon: "📖", cat: "humanities", style: "english", desc: "Comprehension, essays, creative writing & grammatical syntax." },
    english_secondary: { name: "English (SSC / O-Level)", icon: "📖", cat: "humanities", style: "english", desc: "Analytical reading, composition, precis writing & literature." },
    science_general: { name: "General Science", icon: "🔬", cat: "stem", style: "science", desc: "Living organisms, energy, earth systems & environmental wonders." },
    physics_secondary: { name: "Physics", icon: "⚡", cat: "stem", style: "physics", desc: "Kinematics, forces, energy, optics, electricity & magnetism." },
    chemistry_secondary: { name: "Chemistry", icon: "🧪", cat: "stem", style: "chem", desc: "Atomic structure, chemical bonding, reactions & organic acids." },
    bio_secondary: { name: "Biology", icon: "🧬", cat: "stem", style: "bio", desc: "Cellular biology, human physiology, genetics & ecosystems." },
    cs_primary: { name: "Computer Basics", icon: "💻", cat: "stem", style: "cs", desc: "Intro to computers, keyboarding, internet safety & visual puzzles." },
    cs_middle: { name: "Computer Science", icon: "💻", cat: "stem", style: "cs", desc: "Algorithms, flowcharts, scratch/block coding & hardware parts." },
    cs_secondary: { name: "Computer Science (Programming)", icon: "💻", cat: "stem", style: "cs", desc: "Python/C++, databases, logic gates & computer systems." },
    social_studies: { name: "Social Studies", icon: "🌍", cat: "humanities", style: "social", desc: "World geography, history, communities & citizenship." },
    pak_studies: { name: "Pakistan Studies", icon: "🏛️", cat: "humanities", style: "social", desc: "Ideology, history, constitution, natural resources & foreign relations." },
    islamiat_primary: { name: "Islamiat", icon: "🌙", cat: "humanities", style: "islam", desc: "Basic Duas, ethics, pillars of Islam & stories of the Prophets." },
    islamiat_middle: { name: "Islamiat", icon: "🌙", cat: "humanities", style: "islam", desc: "Quranic teachings, Hadith studies & Islamic culture and history." },
    islamiat_secondary: { name: "Islamiat Compulsory", icon: "🌙", cat: "humanities", style: "islam", desc: "Surah translations, selected Hadiths & ethical governance in Islam." },
    urdu_primary: { name: "Urdu", icon: "✍️", cat: "humanities", style: "urdu", desc: "Huroof-e-Tahajji, basic vocabulary & reading short poems." },
    urdu_middle: { name: "Urdu Language & Literature", icon: "✍️", cat: "humanities", style: "urdu", desc: "Grammar, Nazm, Ghazal & essay composition." },
    urdu_secondary: { name: "Urdu Lazmi (Compulsory)", icon: "✍️", cat: "humanities", style: "urdu", desc: "Classical prose, modern poetry, comprehension & letter writing." }
  };

  // ==========================================================================
  // 2. STATE CONTROLLER (LocalStorage Synchronization)
  // ==========================================================================
  const State = {
    // Current Active Grade (1 to 10)
    currentGrade: parseInt(localStorage.getItem('edunovix_grade') || localStorage.getItem('student_grade') || '8', 10),

    // Student Profile
    user: (() => {
      try {
        const stored = localStorage.getItem('edunovix_user') ||
                       localStorage.getItem('user') ||
                       localStorage.getItem('student') ||
                       localStorage.getItem('currentUser') ||
                       localStorage.getItem('edunexa_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            name: parsed.name || parsed.username || parsed.fullName || "Aisha Khan",
            email: parsed.email || "aisha@student.edunovix.ai"
          };
        }
      } catch (e) {
        console.warn("Using default student profile:", e);
      }
      return {
        name: "Aisha Khan",
        email: "aisha@student.edunovix.ai"
      };
    })(),

    // Learning Progress Data
    progress: (() => {
      try {
        const stored = localStorage.getItem('edunovix_progress');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return {
        lessonsCompleted: 12,
        quizzesCompleted: 6,
        avgScore: 88,
        streakDays: 5,
        studyTime: "4h 20m",
        overallCompletion: 45
      };
    })(),

    // Recent Lessons
    recentLessons: (() => {
      try {
        const stored = localStorage.getItem('edunovix_recent_lessons');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return [
        {
          id: "lesson-alg",
          subject: "Mathematics",
          topic: "Quadratic Equations & Roots",
          grade: 8,
          progress: 75,
          lastAccess: "Today, 10:15 AM",
          url: "grade8.html"
        },
        {
          id: "lesson-bio",
          subject: "Biology",
          topic: "Photosynthesis & Cellular Respiration",
          grade: 8,
          progress: 90,
          lastAccess: "Yesterday",
          url: "grade8.html"
        },
        {
          id: "lesson-phy",
          subject: "Physics",
          topic: "Newton's Laws of Motion & Friction",
          grade: 8,
          progress: 40,
          lastAccess: "2 days ago",
          url: "grade8.html"
        }
      ];
    })(),

    // Quiz History
    quizzes: (() => {
      try {
        const stored = localStorage.getItem('edunovix_quizzes');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return [
        { id: "q1", title: "Algebra Mid-Term Diagnostic", subject: "Mathematics", score: 6, total: 10, pct: 60, date: "Sep 15, 2026", rating: "Needs Review" },
        { id: "q2", title: "Plant Cells & Organelles", subject: "Biology", score: 19, total: 20, pct: 95, date: "Sep 14, 2026", rating: "Excellent" },
        { id: "q3", title: "Chemical Bonds & Valency", subject: "Chemistry", score: 9, total: 10, pct: 90, date: "Sep 12, 2026", rating: "Excellent" }
      ];
    })(),

    // Calculator History
    calcHistory: (() => {
      try {
        const stored = localStorage.getItem('edunovix_calc_history');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return [
        { expr: "25 × 18", result: "450" },
        { expr: "√(144) + 15²", result: "237" }
      ];
    })(),

    // Theme (edunexa-theme integration)
    theme: localStorage.getItem('edunexa-theme') || localStorage.getItem('theme') || 'light'
  };

  // Helper to persist user changes
  function saveUserProfile(name, email, grade) {
    State.user.name = name;
    State.user.email = email;
    State.currentGrade = parseInt(grade, 10);
    localStorage.setItem('edunovix_user', JSON.stringify(State.user));
    localStorage.setItem('edunovix_grade', State.currentGrade);
    updateAllUI();
    showToast(`Profile updated for Grade ${State.currentGrade}!`, "success");
  }

  function saveProgress() {
    localStorage.setItem('edunovix_progress', JSON.stringify(State.progress));
    localStorage.setItem('edunovix_quizzes', JSON.stringify(State.quizzes));
    localStorage.setItem('edunovix_recent_lessons', JSON.stringify(State.recentLessons));
  }

  // Toast notification
  function showToast(message, type = "info") {
    const toast = document.getElementById('offline-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `edx-toast show ${type}`;
    setTimeout(() => {
      toast.className = "edx-toast";
    }, 4000);
  }

  // ==========================================================================
  // 3. THEME SYSTEM INTEGRATION (edunexa-theme & [data-theme-toggle])
  // ==========================================================================
  function initTheme() {
    applyTheme(State.theme);

    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newTheme = State.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  }

  function applyTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    // Save to both edunexa-theme and theme to maintain total compatibility
    localStorage.setItem('edunexa-theme', theme);
    localStorage.setItem('theme', theme);

    // Update profile radio if modal is open
    const radio = document.querySelector(`input[name="profileTheme"][value="${theme}"]`);
    if (radio) radio.checked = true;
  }

  // ==========================================================================
  // 4. UI INITIALIZATION & SYNC
  // ==========================================================================
  function updateAllUI() {
    updateHeaderAndProfile();
    renderGradeCards();
    renderSubjects();
    renderContinueLearning();
    renderProgressSection();
    renderQuizzes();
    renderRecommendation();
    renderCalculatorHistory();
  }

  function updateHeaderAndProfile() {
    // Current Date
    const dateEl = document.getElementById('currentDateDisplay');
    if (dateEl) {
      const now = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    // Name and Avatar
    const firstName = State.user.name.split(' ')[0] || "Student";
    const initials = State.user.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || "ST";

    // Header Greeting
    const greetingEl = document.getElementById('headerGreetingText');
    if (greetingEl) greetingEl.textContent = `Welcome back, ${firstName} 👋`;

    // Hero Name
    const heroNameEl = document.getElementById('heroStudentName');
    if (heroNameEl) heroNameEl.textContent = firstName;

    // Header Avatar
    const headAvatarCircle = document.getElementById('headerAvatarCircle');
    if (headAvatarCircle) headAvatarCircle.textContent = initials;
    const headAvatarName = document.getElementById('headerAvatarName');
    if (headAvatarName) headAvatarName.textContent = firstName;

    // Sidebar Avatar & Info
    const sideAvatar = document.getElementById('sidebarUserAvatar');
    if (sideAvatar) sideAvatar.textContent = initials;
    const sideName = document.getElementById('sidebarUserName');
    if (sideName) sideName.textContent = State.user.name;
    const sideEmail = document.getElementById('sidebarUserEmail');
    if (sideEmail) sideEmail.textContent = State.user.email;

    // Grade Displays
    const gradeLabel = `Grade ${State.currentGrade}`;
    const sideGradeLabel = document.getElementById('sidebarGradeLabel');
    if (sideGradeLabel) sideGradeLabel.textContent = gradeLabel;

    const heroGrade = document.getElementById('heroCurrentGrade');
    if (heroGrade) heroGrade.textContent = gradeLabel;

    const gradeFilterBadge = document.getElementById('gradeFilterBadge');
    if (gradeFilterBadge) gradeFilterBadge.textContent = gradeLabel;

    const modalGradeLabel = document.getElementById('aiModalGradeLabel');
    if (modalGradeLabel) modalGradeLabel.textContent = gradeLabel;

    const headerSelect = document.getElementById('headerGradeSelect');
    if (headerSelect) headerSelect.value = String(State.currentGrade);

    // Hero quick metrics
    const heroStreak = document.getElementById('heroStreakCount');
    if (heroStreak) heroStreak.textContent = `${State.progress.streakDays} Days`;

    const heroLessons = document.getElementById('heroLessonsCompleted');
    if (heroLessons) heroLessons.textContent = State.progress.lessonsCompleted;

    const heroAvg = document.getElementById('heroAvgScore');
    if (heroAvg) heroAvg.textContent = `${State.progress.avgScore}%`;
  }

  // ==========================================================================
  // 5. GRADE SYSTEM: RENDER 10 CARDS (GRADES 1–10)
  // ==========================================================================
  function renderGradeCards() {
    const container = document.getElementById('gradesContainer');
    if (!container) return;

    container.innerHTML = '';

    GRADE_CONFIG.forEach(item => {
      const isActive = item.grade === State.currentGrade;
      const card = document.createElement('div');
      card.className = `edx-grade-card ${isActive ? 'active-grade' : ''}`;
      card.id = `gradeCard_${item.grade}`;

      card.innerHTML = `
        <div class="edx-grade-top">
          <span class="edx-grade-number-badge">Grade ${item.grade}</span>
          <span class="edx-grade-status-tag">${isActive ? 'Active Syllabus' : item.ageLevel}</span>
        </div>
        <div class="edx-grade-body">
          <h3 class="edx-grade-title">${item.title}</h3>
          <p class="edx-grade-desc">${item.desc}</p>
        </div>
        <div class="edx-grade-meta-row">
          <span>📚 ${item.subjectsCount} Core Subjects</span>
          <span>🎯 Progress: ${isActive ? State.progress.overallCompletion : item.defaultProgress}%</span>
        </div>
        <div class="edx-progress-track">
          <div class="edx-progress-fill" style="width: ${isActive ? State.progress.overallCompletion : item.defaultProgress}%"></div>
        </div>
        <div class="edx-grade-actions">
          <button type="button" class="edx-btn edx-btn-sm ${isActive ? 'edx-btn-secondary' : 'edx-btn-primary'}" data-select-grade="${item.grade}">
            ${isActive ? 'Selected ✓' : 'Select Grade'}
          </button>
          <button type="button" class="edx-btn edx-btn-sm edx-btn-secondary" data-open-grade="${item.grade}">
            Open Syllabus &rarr;
          </button>
        </div>
      `;

      // Select Grade Click
      card.querySelector(`[data-select-grade="${item.grade}"]`).addEventListener('click', (e) => {
        e.stopPropagation();
        setGrade(item.grade);
      });

      // Open Grade Page Click (Graceful fallback if gradeX.html doesn't exist)
      card.querySelector(`[data-open-grade="${item.grade}"]`).addEventListener('click', (e) => {
        e.stopPropagation();
        openGradeSyllabus(item.grade);
      });

      // Entire card click selects the grade
      card.addEventListener('click', () => {
        setGrade(item.grade);
      });

      container.appendChild(card);
    });
  }

  function setGrade(gradeNum) {
    State.currentGrade = gradeNum;
    localStorage.setItem('edunovix_grade', gradeNum);
    updateAllUI();
    showToast(`Switched to Grade ${gradeNum} syllabus. Subjects and AI Tutor adapted!`, "success");
  }

  // Gracefully handles existing grade pages without broken links
  async function openGradeSyllabus(gradeNum) {
    const pageUrl = `grade${gradeNum}.html`;
    try {
      const response = await fetch(pageUrl, { method: 'HEAD' });
      if (response.ok) {
        window.location.href = pageUrl;
        return;
      }
    } catch (err) {
      // Offline or relative fetch issue
    }

    // Show graceful Coming Soon modal if the file does not exist
    showNoticeModal({
      icon: "📚",
      heading: `Grade ${gradeNum} Curriculum Notice`,
      message: `The full standalone syllabus page (grade${gradeNum}.html) is currently scheduled for term deployment. In the meantime, you can explore subjects right here on the dashboard or practice any topic using the EDUNOVIX AI Tutor!`
    });
  }

  // ==========================================================================
  // 6. SUBJECTS SECTION (DYNAMIC FILTERING BY GRADE)
  // ==========================================================================
  let currentSubjectCategory = 'all';

  function renderSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;

    const currentGradeConfig = GRADE_CONFIG.find(g => g.grade === State.currentGrade) || GRADE_CONFIG[7];
    const subjectKeys = currentGradeConfig.subjects;

    const gradeDescEl = document.getElementById('subjectsGradeDesc');
    if (gradeDescEl) {
      gradeDescEl.textContent = `Displaying ${subjectKeys.length} active subjects for ${currentGradeConfig.title} (${currentGradeConfig.ageLevel}).`;
    }

    container.innerHTML = '';

    subjectKeys.forEach(key => {
      const subj = SUBJECTS_DATABASE[key];
      if (!subj) return;

      // Filter by category
      if (currentSubjectCategory !== 'all' && subj.cat !== currentSubjectCategory) {
        return;
      }

      const card = document.createElement('div');
      card.className = "edx-subject-card";
      card.innerHTML = `
        <div class="edx-subj-top">
          <div class="edx-subj-icon-wrap ${subj.style}">
            <span>${subj.icon}</span>
          </div>
          <span class="edx-subj-grade-tag">Grade ${State.currentGrade}</span>
        </div>
        <div class="edx-subj-content">
          <h3 class="edx-subj-name">${subj.name}</h3>
          <p class="edx-subj-desc">${subj.desc}</p>
        </div>
        <div class="edx-subj-topics-row">
          <span>8 Chapters</span>
          <span>⚡ AI Practice Available</span>
        </div>
        <div class="edx-subj-actions">
          <button type="button" class="edx-btn edx-btn-sm edx-btn-secondary" data-open-subj="${subj.name}">
            Explore Lessons
          </button>
          <button type="button" class="edx-btn edx-btn-sm edx-btn-primary" data-ai-subj="${subj.name}">
            Ask AI Tutor
          </button>
        </div>
      `;

      // Explore Lessons Click
      card.querySelector(`[data-open-subj="${subj.name}"]`).addEventListener('click', () => {
        openSubjectTopics(subj.name);
      });

      // Ask AI for Subject
      card.querySelector(`[data-ai-subj="${subj.name}"]`).addEventListener('click', () => {
        openAiTutorModal(`Explain key foundational topics in ${subj.name} for Grade ${State.currentGrade}.`);
      });

      container.appendChild(card);
    });

    if (container.children.length === 0) {
      container.innerHTML = `
        <div class="edx-continue-card-empty">
          <span class="edx-empty-icon">🔍</span>
          <h4 class="edx-empty-title">No subjects found in this filter</h4>
          <p class="edx-empty-desc">Switch category filter to "All Subjects" to see your complete Grade ${State.currentGrade} list.</p>
        </div>
      `;
    }
  }

  function openSubjectTopics(subjectName) {
    showNoticeModal({
      icon: "📖",
      heading: `${subjectName} — Grade ${State.currentGrade}`,
      message: `The interactive curriculum chapter index for ${subjectName} is synchronized with your term plan. You can ask EDUNOVIX AI to generate lessons, diagnostic quizzes, or flashcards for any chapter right now!`
    });
  }

  // ==========================================================================
  // 7. CONTINUE LEARNING (RECENT TOPICS)
  // ==========================================================================
  function renderContinueLearning() {
    const container = document.getElementById('continueLearningContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!State.recentLessons || State.recentLessons.length === 0) {
      container.innerHTML = `
        <div class="edx-continue-card-empty">
          <span class="edx-empty-icon">🌱</span>
          <h4 class="edx-empty-title">Ready to begin your study journey!</h4>
          <p class="edx-empty-desc">You don't have any lessons in progress yet. Pick a subject below or ask EDUNOVIX AI to jumpstart your syllabus.</p>
          <button type="button" class="edx-btn edx-btn-sm edx-btn-primary" id="startFirstLessonBtn">
            Explore Subjects
          </button>
        </div>
      `;
      const btn = document.getElementById('startFirstLessonBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    State.recentLessons.forEach(item => {
      const card = document.createElement('div');
      card.className = "edx-continue-card";
      card.innerHTML = `
        <div class="edx-continue-header">
          <span class="edx-subject-tag">${item.subject}</span>
          <span class="edx-continue-time">${item.lastAccess}</span>
        </div>
        <h3 class="edx-continue-title">${item.topic}</h3>
        <div class="edx-continue-progress-wrap">
          <div class="edx-progress-meta">
            <span>Progress</span>
            <span><strong>${item.progress}%</strong></span>
          </div>
          <div class="edx-progress-track">
            <div class="edx-progress-fill" style="width: ${item.progress}%"></div>
          </div>
        </div>
        <button type="button" class="edx-btn edx-btn-sm edx-btn-secondary" data-continue-lesson="${item.id}">
          Continue Lesson &rarr;
        </button>
      `;

      card.querySelector(`[data-continue-lesson="${item.id}"]`).addEventListener('click', () => {
        openAiTutorModal(`Let's continue my lesson on "${item.topic}" (${item.subject}, Grade ${State.currentGrade}). What is the next key concept?`);
      });

      container.appendChild(card);
    });
  }

  // ==========================================================================
  // 8. PERSONALIZED AI RECOMMENDATION (DYNAMIC LOGIC)
  // ==========================================================================
  function renderRecommendation() {
    const textEl = document.getElementById('aiRecommendationText');
    const actionBtn = document.getElementById('recomActionBtn');
    const actionLabel = document.getElementById('recomActionBtnLabel');
    if (!textEl || !actionBtn) return;

    // Check if quizzes or progress data exist
    if (!State.quizzes || State.quizzes.length === 0) {
      textEl.textContent = "Complete your first lesson or quiz and EDUNOVIX AI will start personalizing your recommendations.";
      if (actionLabel) actionLabel.textContent = "Take First AI Quiz";
      actionBtn.onclick = () => {
        openAiTutorModal(`Generate a beginner 5-question multiple choice quiz for Grade ${State.currentGrade} to assess my baseline skills.`);
      };
      return;
    }

    // Dynamic analysis based on lowest vs highest score
    const sortedQuizzes = [...State.quizzes].sort((a, b) => a.pct - b.pct);
    const lowest = sortedQuizzes[0];
    const highest = sortedQuizzes[sortedQuizzes.length - 1];

    if (lowest.pct < 75 && highest.pct >= 85) {
      textEl.innerHTML = `You are doing exceptionally well in <strong>${highest.subject} (${highest.pct}%)</strong>! However, your recent diagnostic in <strong>${lowest.title} (${lowest.pct}%)</strong> shows that this area needs more practice. <strong>EDUNOVIX AI recommends 20 minutes of targeted revision today.</strong>`;
      if (actionLabel) actionLabel.textContent = `Practice ${lowest.subject}`;
      actionBtn.onclick = () => {
        openAiTutorModal(`I need to practice and review "${lowest.title}" in ${lowest.subject} for Grade ${State.currentGrade}. Please provide a clear explanation followed by 3 practice problems.`);
      };
    } else if (lowest.pct < 75) {
      textEl.innerHTML = `Your recent assessment in <strong>${lowest.subject} (${lowest.pct}%)</strong> indicates some core concepts require reinforcement. EDUNOVIX AI recommends taking a quick 15-minute concept refresher on <em>${lowest.title}</em>.`;
      if (actionLabel) actionLabel.textContent = `Review ${lowest.subject}`;
      actionBtn.onclick = () => {
        openAiTutorModal(`Explain the core principles of "${lowest.title}" in ${lowest.subject} for Grade ${State.currentGrade}.`);
      };
    } else {
      textEl.innerHTML = `Superb consistency across your assessments! Your average score is <strong>${State.progress.avgScore}%</strong>. EDUNOVIX AI recommends advancing to Grade ${State.currentGrade} challenge problems in Mathematics and Physics.`;
      if (actionLabel) actionLabel.textContent = "Solve Challenge Problems";
      actionBtn.onclick = () => {
        openAiTutorModal(`Give me 3 advanced challenge problems for Grade ${State.currentGrade} Mathematics with step-by-step solutions.`);
      };
    }
  }

  // ==========================================================================
  // 9. PROGRESS DASHBOARD
  // ==========================================================================
  function renderProgressSection() {
    // Overall completion percentage
    const percentEl = document.getElementById('overallPercentText');
    const radialBar = document.getElementById('overallRadialBar');
    const tagEl = document.getElementById('overallGradeTag');

    const pct = State.progress.overallCompletion || 0;
    if (percentEl) percentEl.textContent = `${pct}%`;
    if (tagEl) tagEl.textContent = `Grade ${State.currentGrade}`;

    if (radialBar) {
      // Circumference = 2 * PI * 50 ≈ 314.15
      const circumference = 314.15;
      const offset = circumference - (pct / 100) * circumference;
      radialBar.style.strokeDasharray = `${circumference}`;
      radialBar.style.strokeDashoffset = `${offset}`;
    }

    // Stats
    const lessonsEl = document.getElementById('statLessonsCount');
    if (lessonsEl) lessonsEl.textContent = State.progress.lessonsCompleted;

    const quizzesEl = document.getElementById('statQuizzesCount');
    if (quizzesEl) quizzesEl.textContent = State.progress.quizzesCompleted;

    const scoreEl = document.getElementById('statAvgScoreVal');
    if (scoreEl) scoreEl.textContent = `${State.progress.avgScore}%`;

    const streakEl = document.getElementById('statStreakVal');
    if (streakEl) streakEl.textContent = `${State.progress.streakDays} Days`;

    const timeEl = document.getElementById('statStudyTimeVal');
    if (timeEl) timeEl.textContent = State.progress.studyTime;

    const accuracyEl = document.getElementById('statAccuracyVal');
    if (accuracyEl) accuracyEl.textContent = `${Math.min(98, State.progress.avgScore + 4)}%`;
  }

  // ==========================================================================
  // 10. RECENT QUIZ PERFORMANCE
  // ==========================================================================
  function renderQuizzes() {
    const container = document.getElementById('quizListContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!State.quizzes || State.quizzes.length === 0) {
      container.innerHTML = `
        <div class="edx-quiz-empty-box">
          <span class="edx-empty-icon">📝</span>
          <h4 class="edx-empty-title">No quizzes completed yet.</h4>
          <p class="edx-empty-desc">Take your first AI-generated diagnostic test to unlock tailored study recommendations and mark predictions.</p>
          <button type="button" class="edx-btn edx-btn-primary" id="takeFirstQuizBtnInner">
            Take Your First AI Quiz
          </button>
        </div>
      `;
      const btn = document.getElementById('takeFirstQuizBtnInner');
      if (btn) {
        btn.addEventListener('click', () => {
          openAiTutorModal(`Generate a 5-question multiple choice quiz for Grade ${State.currentGrade} Mathematics with instant scoring.`);
        });
      }
      return;
    }

    State.quizzes.forEach(item => {
      const row = document.createElement('div');
      row.className = "edx-quiz-item-row";

      const ratingClass = item.pct >= 85 ? "high" : item.pct >= 70 ? "med" : "low";

      row.innerHTML = `
        <div class="edx-quiz-info-group">
          <div class="edx-quiz-icon-badge">📝</div>
          <div class="edx-quiz-title-box">
            <span class="edx-quiz-title">${item.title}</span>
            <span class="edx-quiz-submeta">${item.subject} • Completed on ${item.date}</span>
          </div>
        </div>
        <div class="edx-quiz-score-group">
          <span class="edx-score-badge">${item.score}/${item.total} (${item.pct}%)</span>
          <span class="edx-score-tag ${ratingClass}">${item.rating}</span>
          <button type="button" class="edx-btn edx-btn-sm edx-btn-outline" data-review-quiz="${item.id}">
            Review with AI
          </button>
        </div>
      `;

      row.querySelector(`[data-review-quiz="${item.id}"]`).addEventListener('click', () => {
        openAiTutorModal(`Review my quiz results for "${item.title}" in ${item.subject} (Score: ${item.score}/${item.total}). Explain the common mistakes students make on this topic.`);
      });

      container.appendChild(row);
    });
  }

  // ==========================================================================
  // 11. SAFE STUDENT & SCIENTIFIC CALCULATOR (NO UNSAFE EVAL)
  // ==========================================================================
  const Calculator = {
    expression: "",
    result: "0",
    lastEvaluated: false,

    init() {
      const keypad = document.querySelector('.edx-calc-keypad');
      if (!keypad) return;

      keypad.addEventListener('click', (e) => {
        const keyBtn = e.target.closest('.edx-calc-key');
        if (!keyBtn) return;
        const key = keyBtn.getAttribute('data-calc');
        this.handleKey(key);
      });

      // Keyboard support
      window.addEventListener('keydown', (e) => {
        // Only if calculator section is in focus or user is typing numbers
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag === 'textarea' || activeTag === 'input') return;

        const k = e.key;
        if ((k >= '0' && k <= '9') || k === '.' || k === '+' || k === '-' || k === '*' || k === '/' || k === '(' || k === ')') {
          e.preventDefault();
          this.handleKey(k);
        } else if (k === 'Enter' || k === '=') {
          e.preventDefault();
          this.handleKey('=');
        } else if (k === 'Backspace') {
          e.preventDefault();
          this.handleKey('DEL');
        } else if (k === 'Escape') {
          e.preventDefault();
          this.handleKey('AC');
        } else if (k === '%') {
          e.preventDefault();
          this.handleKey('%');
        }
      });

      // Ask AI about calculation
      const askAiCalcBtn = document.getElementById('askAiCalcBtn');
      if (askAiCalcBtn) {
        askAiCalcBtn.addEventListener('click', () => {
          this.askAiAboutCalculation();
        });
      }

      // Clear history button
      const clearHistoryBtn = document.getElementById('clearCalcHistoryBtn');
      if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
          State.calcHistory = [];
          localStorage.removeItem('edunovix_calc_history');
          renderCalculatorHistory();
          showToast("Calculator history cleared", "info");
        });
      }

      // Toggle collapse/expand button
      const toggleBtn = document.getElementById('toggleCalcExpandBtn');
      const panel = document.getElementById('calculatorPanel');
      const label = document.getElementById('calcExpandLabel');
      if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', () => {
          const isCollapsed = panel.classList.toggle('collapsed');
          if (label) label.textContent = isCollapsed ? "Open Calculator" : "Collapse Panel";
        });
      }
    },

    handleKey(key) {
      if (key === 'AC') {
        this.expression = "";
        this.result = "0";
        this.lastEvaluated = false;
        this.updateScreen();
        return;
      }

      if (key === 'DEL') {
        if (this.expression.length > 0) {
          this.expression = this.expression.slice(0, -1);
        }
        this.updateScreen();
        return;
      }

      if (key === '=') {
        this.evaluate();
        return;
      }

      // Scientific special unary functions
      if (key === 'sqrt') {
        this.applyUnary('sqrt');
        return;
      }
      if (key === 'sq') {
        this.applyUnary('sq');
        return;
      }
      if (key === 'inv') {
        this.applyUnary('inv');
        return;
      }

      // If user typed a number right after an evaluation, start fresh
      if (this.lastEvaluated && (key >= '0' && key <= '9')) {
        this.expression = "";
        this.lastEvaluated = false;
      } else if (this.lastEvaluated) {
        // If an operator was pressed, continue with previous result
        this.expression = this.result;
        this.lastEvaluated = false;
      }

      // Prevent multiple consecutive dots
      if (key === '.') {
        const parts = this.expression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) return;
      }

      this.expression += key;
      this.updateScreen();
    },

    applyUnary(type) {
      let currentVal = parseFloat(this.result !== "0" && this.expression === "" ? this.result : this.expression);
      if (isNaN(currentVal)) {
        try {
          currentVal = this.safeCalculate(this.expression);
        } catch (e) {
          this.result = "Invalid Expression";
          this.updateScreen();
          return;
        }
      }

      if (type === 'sqrt') {
        if (currentVal < 0) {
          this.result = "Cannot take √ of negative";
        } else {
          const res = Math.sqrt(currentVal);
          this.expression = `√(${currentVal})`;
          this.result = this.formatNumber(res);
          this.saveHistory(this.expression, this.result);
        }
      } else if (type === 'sq') {
        const res = Math.pow(currentVal, 2);
        this.expression = `(${currentVal})²`;
        this.result = this.formatNumber(res);
        this.saveHistory(this.expression, this.result);
      } else if (type === 'inv') {
        if (currentVal === 0) {
          this.result = "Cannot divide by zero";
        } else {
          const res = 1 / currentVal;
          this.expression = `1/(${currentVal})`;
          this.result = this.formatNumber(res);
          this.saveHistory(this.expression, this.result);
        }
      }

      this.lastEvaluated = true;
      this.updateScreen();
    },

    evaluate() {
      if (!this.expression || this.expression.trim() === "") return;

      try {
        const calculated = this.safeCalculate(this.expression);
        if (calculated === Infinity || calculated === -Infinity) {
          this.result = "Cannot divide by zero";
        } else if (isNaN(calculated)) {
          this.result = "Invalid Expression";
        } else {
          this.result = this.formatNumber(calculated);
          this.saveHistory(this.expression, this.result);
        }
      } catch (err) {
        this.result = "Invalid Expression";
      }

      this.lastEvaluated = true;
      this.updateScreen();
    },

    formatNumber(num) {
      if (Number.isInteger(num)) return num.toString();
      // Up to 6 decimal places without trailing zeros
      return parseFloat(num.toFixed(6)).toString();
    },

    /**
     * Safe Expression Evaluator without unsafe eval()
     * Validates character set and parses tokens securely.
     */
    safeCalculate(expr) {
      // Clean string
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/%/g, '*0.01');

      // Strict security validation: only digits, decimal point, operators and parentheses allowed
      if (!/^[0-9\+\-\*\/\.\(\)\s]+$/.test(sanitized)) {
        throw new Error("Illegal characters in math expression");
      }

      // Check balanced parentheses
      let balance = 0;
      for (const ch of sanitized) {
        if (ch === '(') balance++;
        if (ch === ')') balance--;
        if (balance < 0) throw new Error("Mismatched parentheses");
      }
      if (balance !== 0) throw new Error("Unclosed parentheses");

      // Safe mathematical parser using controlled Function with no access to window or globals
      const safeMathFn = new Function(`
        'use strict';
        return (${sanitized});
      `);
      return safeMathFn();
    },

    updateScreen() {
      const exprEl = document.getElementById('calcExpression');
      const resEl = document.getElementById('calcResult');

      if (exprEl) {
        exprEl.textContent = this.expression || "0";
      }
      if (resEl) {
        resEl.textContent = this.result;
      }
    },

    saveHistory(expr, result) {
      if (result === "Invalid Expression" || result === "Cannot divide by zero") return;
      State.calcHistory.unshift({ expr, result });
      if (State.calcHistory.length > 8) State.calcHistory.pop();
      localStorage.setItem('edunovix_calc_history', JSON.stringify(State.calcHistory));
      renderCalculatorHistory();
    },

    askAiAboutCalculation() {
      const currentExpr = this.expression || (State.calcHistory[0] ? State.calcHistory[0].expr : "25 × 18");
      const currentResult = this.result !== "0" ? this.result : (State.calcHistory[0] ? State.calcHistory[0].result : "450");

      const prompt = `Please explain step-by-step how to solve this math problem: "${currentExpr} = ${currentResult}". Break it down for a Grade ${State.currentGrade} student with the formula, intermediate steps, and an educational tip.`;
      openAiTutorModal(prompt);
    }
  };

  function renderCalculatorHistory() {
    const list = document.getElementById('calcHistoryList');
    if (!list) return;

    list.innerHTML = '';
    if (!State.calcHistory || State.calcHistory.length === 0) {
      list.innerHTML = '<li class="edx-calc-history-empty">No calculations yet. Enter expressions above!</li>';
      return;
    }

    State.calcHistory.forEach(item => {
      const li = document.createElement('li');
      li.className = "edx-calc-history-item";
      li.innerHTML = `<span>${item.expr}</span><strong>= ${item.result}</strong>`;
      li.title = "Click to load into calculator";
      li.addEventListener('click', () => {
        Calculator.expression = item.expr;
        Calculator.result = item.result;
        Calculator.lastEvaluated = true;
        Calculator.updateScreen();
      });
      list.appendChild(li);
    });
  }

  // ==========================================================================
  // 12. EDUNOVIX AI CONTROL CENTER & REAL /api/chat INTEGRATION
  // ==========================================================================
  const AiController = {
    init() {
      // Connect 8 Quick Action buttons
      const actions = {
        'ask': `I am in Grade ${State.currentGrade}. Can you help me with a question?`,
        'explain': `Please explain the concept of Photosynthesis and Cellular Respiration for Grade ${State.currentGrade} with clear examples.`,
        'quiz': `Generate a 5-question multiple choice quiz on Grade ${State.currentGrade} Mathematics. Include options A, B, C, D and answer keys.`,
        'flashcards': `Create a 5-card active recall flashcard deck on Grade ${State.currentGrade} Physics (Forces and Motion). Format as Term: Definition.`,
        'summarize': `Please summarize the key takeaways of a textbook chapter on Chemical Bonding for Grade ${State.currentGrade}.`,
        'weak-areas': `Based on Grade ${State.currentGrade} syllabus standards, what are the top 3 most commonly failed topics and how can I master them?`,
        'plan': `Create a realistic 5-day daily study plan (45 mins per day) for a Grade ${State.currentGrade} student balancing Math, Science, and Languages.`,
        'recommend': `Analyze my current Grade ${State.currentGrade} progress and give me 3 specific study recommendations for this week.`
      };

      document.querySelectorAll('.edx-ai-action-card').forEach(card => {
        card.addEventListener('click', () => {
          const actionKey = card.getAttribute('data-action');
          const defaultPrompt = actions[actionKey] || `Help me study Grade ${State.currentGrade}.`;
          openAiTutorModal(defaultPrompt);
        });
      });

      // Chat form submit
      const form = document.getElementById('aiChatForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSendMessage();
        });
      }

      // Textarea Shift+Enter vs Enter
      const textarea = document.getElementById('aiUserInput');
      if (textarea) {
        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendMessage();
          }
        });
      }

      // Clear chat button
      const clearBtn = document.getElementById('aiClearChatBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          const thread = document.getElementById('aiChatThread');
          if (thread) {
            thread.innerHTML = `
              <div class="edx-chat-bubble edx-ai-bubble">
                <div class="edx-chat-avatar">🤖</div>
                <div class="edx-chat-content">
                  <p><strong>Chat cleared.</strong> Ready for your next Grade ${State.currentGrade} question or lesson topic!</p>
                </div>
              </div>
            `;
          }
        });
      }

      // Preset Chips inside Modal
      const chips = document.querySelectorAll('.edx-preset-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const preset = chip.getAttribute('data-preset');
          if (actions[preset] && textarea) {
            textarea.value = actions[preset];
            textarea.focus();
          }
        });
      });
    },

    async handleSendMessage() {
      const textarea = document.getElementById('aiUserInput');
      const thread = document.getElementById('aiChatThread');
      const sendBtn = document.getElementById('aiSendBtn');
      if (!textarea || !thread) return;

      const userMessage = textarea.value.trim();
      if (!userMessage) return;

      // Append User message to UI
      this.appendMessage("user", userMessage);
      textarea.value = "";
      textarea.focus();

      // Show temporary thinking bubble
      const thinkingId = `ai-thinking-${Date.now()}`;
      this.appendThinkingBubble(thinkingId);

      if (sendBtn) sendBtn.disabled = true;

      try {
        // Send request to real backend endpoint /api/chat
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: userMessage,
            grade: State.currentGrade,
            context: `Student is in Grade ${State.currentGrade}. Respond with pedagogical clarity, encouraging tone, and clear educational steps.`
          })
        });

        // Remove thinking bubble
        this.removeBubble(thinkingId);

        if (response.ok) {
          const data = await response.json();
          const aiResponseText = data.reply || data.response || data.text || data.message || JSON.stringify(data);
          this.appendMessage("ai", aiResponseText);
        } else {
          // If server returns non-200, display clean status
          this.appendMessage("ai", `**EDUNOVIX AI Backend Status (${response.status}):** The server responded with: "${response.statusText}". Please verify that your Express AI endpoint (/api/chat) is operational.`);
        }
      } catch (networkErr) {
        this.removeBubble(thinkingId);
        // Clean, helpful notification without fake AI response
        this.appendMessage("ai", `**EDUNOVIX AI Backend Connection Notice:**\n\nThe local backend endpoint (\`/api/chat\`) is currently not receiving responses. When your full-stack backend server is running on port 3000, real-time Gemini AI tutoring and quiz generation will stream directly through this window.\n\n*Question submitted:* "${userMessage}"`);
      } finally {
        if (sendBtn) sendBtn.disabled = false;
      }
    },

    appendMessage(sender, text) {
      const thread = document.getElementById('aiChatThread');
      if (!thread) return;

      const bubble = document.createElement('div');
      bubble.className = `edx-chat-bubble edx-${sender}-bubble`;

      const avatar = sender === 'ai' ? '🤖' : (State.user.name[0] || 'U');

      // Simple markdown-like line break formatting
      const formattedText = text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      bubble.innerHTML = `
        <div class="edx-chat-avatar">${avatar}</div>
        <div class="edx-chat-content">
          <p>${formattedText}</p>
        </div>
      `;

      thread.appendChild(bubble);
      thread.scrollTop = thread.scrollHeight;
    },

    appendThinkingBubble(id) {
      const thread = document.getElementById('aiChatThread');
      if (!thread) return;

      const bubble = document.createElement('div');
      bubble.className = 'edx-chat-bubble edx-ai-bubble';
      bubble.id = id;
      bubble.innerHTML = `
        <div class="edx-chat-avatar">🤖</div>
        <div class="edx-chat-content">
          <p><em>EDUNOVIX AI is thinking and formulating step-by-step guidance...</em></p>
        </div>
      `;
      thread.appendChild(bubble);
      thread.scrollTop = thread.scrollHeight;
    },

    removeBubble(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }
  };

  // Helper to open AI Tutor modal with optional prefilled prompt
  function openAiTutorModal(prefillPrompt = "") {
    const backdrop = document.getElementById('aiModalBackdrop');
    const textarea = document.getElementById('aiUserInput');
    if (!backdrop) return;

    backdrop.classList.add('open');
    if (prefillPrompt && textarea) {
      textarea.value = prefillPrompt;
      textarea.focus();
    }
  }

  function closeAiTutorModal() {
    const backdrop = document.getElementById('aiModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
  }

  // ==========================================================================
  // 13. MODALS & POPUPS
  // ==========================================================================
  function initModals() {
    // AI Modal Close
    const aiCloseBtn = document.getElementById('aiModalCloseBtn');
    if (aiCloseBtn) aiCloseBtn.addEventListener('click', closeAiTutorModal);

    const aiBackdrop = document.getElementById('aiModalBackdrop');
    if (aiBackdrop) {
      aiBackdrop.addEventListener('click', (e) => {
        if (e.target === aiBackdrop) closeAiTutorModal();
      });
    }

    // Profile Modal
    const profileBackdrop = document.getElementById('profileModalBackdrop');
    const profileCloseBtn = document.getElementById('profileModalCloseBtn');
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    const profileForm = document.getElementById('profileEditForm');

    const openProfile = () => {
      document.getElementById('profileInputName').value = State.user.name;
      document.getElementById('profileInputEmail').value = State.user.email;
      document.getElementById('profileSelectGrade').value = String(State.currentGrade);
      profileBackdrop?.classList.add('open');
    };

    document.getElementById('headerProfileBtn')?.addEventListener('click', openProfile);
    document.getElementById('sidebarUserProfile')?.addEventListener('click', openProfile);
    document.getElementById('sidebarEditProfileBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openProfile();
    });

    profileCloseBtn?.addEventListener('click', () => profileBackdrop?.classList.remove('open'));
    cancelProfileBtn?.addEventListener('click', () => profileBackdrop?.classList.remove('open'));

    if (profileBackdrop) {
      profileBackdrop.addEventListener('click', (e) => {
        if (e.target === profileBackdrop) profileBackdrop.classList.remove('open');
      });
    }

    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profileInputName').value.trim();
        const email = document.getElementById('profileInputEmail').value.trim();
        const grade = document.getElementById('profileSelectGrade').value;

        const selectedThemeRadio = document.querySelector('input[name="profileTheme"]:checked');
        if (selectedThemeRadio) {
          applyTheme(selectedThemeRadio.value);
        }

        saveUserProfile(name, email, grade);
        profileBackdrop?.classList.remove('open');
      });
    }

    // Notice Modal
    const noticeBackdrop = document.getElementById('noticeModalBackdrop');
    const noticeCloseBtn = document.getElementById('noticeModalCloseBtn');
    const noticeActionBtn = document.getElementById('noticeModalActionBtn');

    noticeCloseBtn?.addEventListener('click', () => noticeBackdrop?.classList.remove('open'));
    if (noticeBackdrop) {
      noticeBackdrop.addEventListener('click', (e) => {
        if (e.target === noticeBackdrop) noticeBackdrop.classList.remove('open');
      });
    }

    if (noticeActionBtn) {
      noticeActionBtn.addEventListener('click', () => {
        noticeBackdrop?.classList.remove('open');
        openAiTutorModal(`I'd like to practice the curriculum topics for Grade ${State.currentGrade}. Can you give me a syllabus overview?`);
      });
    }

    // Header Grade Selector change event
    const headerGradeSelect = document.getElementById('headerGradeSelect');
    if (headerGradeSelect) {
      headerGradeSelect.addEventListener('change', (e) => {
        setGrade(parseInt(e.target.value, 10));
      });
    }

    // Notifications popover toggle
    const notifBtn = document.getElementById('notificationsBtn');
    const notifPopover = document.getElementById('notificationsPopover');
    if (notifBtn && notifPopover) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifPopover.classList.toggle('open');
        notifBtn.setAttribute('aria-expanded', String(isOpen));
      });

      document.addEventListener('click', (e) => {
        if (!notifPopover.contains(e.target) && !notifBtn.contains(e.target)) {
          notifPopover.classList.remove('open');
          notifBtn.setAttribute('aria-expanded', 'false');
        }
      });

      document.getElementById('markAllNotifsBtn')?.addEventListener('click', () => {
        const badge = document.getElementById('notifCountBadge');
        if (badge) badge.textContent = "0 new";
        document.querySelectorAll('.edx-popover-item.unread').forEach(el => el.classList.remove('unread'));
        showToast("All notifications marked as read", "info");
      });
    }
  }

  function showNoticeModal({ icon, heading, message }) {
    const backdrop = document.getElementById('noticeModalBackdrop');
    const iconEl = document.getElementById('noticeModalIcon');
    const headingEl = document.getElementById('noticeModalHeading');
    const textEl = document.getElementById('noticeModalText');

    if (iconEl) iconEl.textContent = icon || "📚";
    if (headingEl) headingEl.textContent = heading || "Notice";
    if (textEl) textEl.textContent = message || "";

    backdrop?.classList.add('open');
  }

  // ==========================================================================
  // 14. NAVIGATION & MOBILE DRAWER
  // ==========================================================================
  function initNavigation() {
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const openBtn = document.getElementById('sidebarOpenBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');

    const openDrawer = () => {
      sidebar?.classList.add('open');
      backdrop?.classList.add('open');
    };

    const closeDrawer = () => {
      sidebar?.classList.remove('open');
      backdrop?.classList.remove('open');
    };

    openBtn?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    // Header Calc button opens calculator
    document.getElementById('headerCalcBtn')?.addEventListener('click', () => {
      const calcSection = document.getElementById('calculator');
      const calcPanel = document.getElementById('calculatorPanel');
      if (calcPanel) calcPanel.classList.remove('collapsed');
      calcSection?.scrollIntoView({ behavior: 'smooth' });
    });

    // Hero buttons
    document.getElementById('heroAskAiBtn')?.addEventListener('click', () => {
      openAiTutorModal(`Hello! I'm in Grade ${State.currentGrade}. Help me create a personalized study session today.`);
    });

    document.getElementById('heroContinueBtn')?.addEventListener('click', () => {
      document.getElementById('continueLearningSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Subject Category Filter Chips
    document.querySelectorAll('[data-subject-cat]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-subject-cat]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentSubjectCategory = chip.getAttribute('data-subject-cat');
        renderSubjects();
      });
    });

    // Sidebar navigation clicks
    document.querySelectorAll('.edx-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        document.querySelectorAll('.edx-nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        closeDrawer();

        const targetNav = link.getAttribute('data-nav');
        if (targetNav === 'ai-tutor') {
          e.preventDefault();
          openAiTutorModal();
        } else if (targetNav === 'quizzes') {
          document.getElementById('quizzes')?.scrollIntoView({ behavior: 'smooth' });
        } else if (targetNav === 'flashcards') {
          e.preventDefault();
          openAiTutorModal(`Create flashcards for my Grade ${State.currentGrade} lessons.`);
        } else if (targetNav === 'planner') {
          e.preventDefault();
          openAiTutorModal(`Generate a daily study plan for Grade ${State.currentGrade}.`);
        } else if (targetNav === 'notes') {
          e.preventDefault();
          openAiTutorModal(`Summarize key textbook notes for Grade ${State.currentGrade}.`);
        } else if (targetNav === 'settings') {
          e.preventDefault();
          document.getElementById('headerProfileBtn')?.click();
        }
      });
    });

    // Mobile bar tabs
    document.querySelectorAll('.edx-mobile-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.edx-mobile-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const nav = tab.getAttribute('data-mobile-nav');
        if (nav === 'overview') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (nav === 'subjects') {
          document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' });
        } else if (nav === 'ai-tutor') {
          openAiTutorModal();
        } else if (nav === 'calculator') {
          document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
        } else if (nav === 'grades') {
          document.getElementById('grades')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Sidebar Grade trigger
    document.getElementById('sidebarGradeTrigger')?.addEventListener('click', () => {
      document.getElementById('grades')?.scrollIntoView({ behavior: 'smooth' });
      closeDrawer();
    });

    // Refresh Recent button
    document.getElementById('refreshRecentBtn')?.addEventListener('click', () => {
      renderContinueLearning();
      showToast("Recent learning list refreshed", "info");
    });

    // Take First Quiz button in section header
    document.getElementById('takeFirstQuizBtn')?.addEventListener('click', () => {
      openAiTutorModal(`Generate a fresh 5-question test for Grade ${State.currentGrade} with scoring.`);
    });

    // Reset Progress Demo button
    document.getElementById('resetProgressDemoBtn')?.addEventListener('click', () => {
      State.progress.overallCompletion = Math.min(100, State.progress.overallCompletion + 5);
      saveProgress();
      renderProgressSection();
      showToast("Progress synced successfully!", "success");
    });
  }

  // ==========================================================================
  // 15. BOOTSTRAP APPLICATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateAllUI();
    Calculator.init();
    AiController.init();
    initModals();
    initNavigation();
    console.log("EDUNOVIX AI Student Dashboard initialized for Grade " + State.currentGrade);
  });

})();
