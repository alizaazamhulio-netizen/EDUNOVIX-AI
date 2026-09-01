/**
 * EduNexa AI - Homepage Interactive Script
 * Learn Smarter. Achieve More.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollEffects();
  initAiPreview();
  initAuthDetection();
  initCurrentYear();
  initBackToTop();
  initScrollReveal();
  initTestCardsInteraction();
});

/**
 * 1. Mobile Navbar Toggle & Keyboard Accessibility
 */
function initNavbar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close on outside click on mobile
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/**
 * 2. Sticky Navbar Shadow & Active Navigation Tracking
 */
function initScrollEffects() {
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Header shadow toggle
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active Section Tracking
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. AI Assistant Interactive Prompt Preview Switcher
 */
function initAiPreview() {
  const pills = document.querySelectorAll('.ai-pill');
  const userMessageEl = document.getElementById('aiChatUserMsg');
  const botMessageEl = document.getElementById('aiChatBotMsg');

  if (!pills.length || !userMessageEl || !botMessageEl) return;

  const promptData = {
    explain: {
      user: "Explain photosynthesis in simple words.",
      bot: `<strong>Photosynthesis</strong> is the process through which green plants use sunlight, water, and carbon dioxide to create oxygen and glucose for energy.
      <ul class="assistant-subpoints">
        <li><strong>Light Absorption:</strong> Chlorophyll in leaves absorbs solar photon energy.</li>
        <li><strong>Chemical Equation:</strong> 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂</li>
        <li><strong>Key Output:</strong> Releases breathable oxygen into the atmosphere.</li>
      </ul>`
    },
    mcqs: {
      user: "Generate 2 high-yield MDCAT Biology MCQs with explanations.",
      bot: `<strong>Question 1:</strong> Which organelle is primarily responsible for ATP synthesis in eukaryotic cells?<br>
      <em>Answer: Mitochondria (Inner mitochondrial membrane / Cristae).</em><br><br>
      <strong>Question 2:</strong> What is the main protein constituent of microfilaments?<br>
      <em>Answer: Actin.</em>`
    },
    summarize: {
      user: "Summarize Newton's Three Laws of Motion for Class 9 Physics.",
      bot: `<strong>Newton's Laws Summary:</strong>
      <ul class="assistant-subpoints">
        <li><strong>1st Law (Inertia):</strong> An object stays at rest or uniform motion unless acted upon by a net force.</li>
        <li><strong>2nd Law (F = ma):</strong> Force equals mass multiplied by acceleration.</li>
        <li><strong>3rd Law (Action/Reaction):</strong> For every action, there is an equal and opposite reaction.</li>
      </ul>`
    },
    planner: {
      user: "Create a 4-week revision schedule for NUST NET (Engineering).",
      bot: `<strong>Recommended 4-Week Schedule:</strong>
      <ul class="assistant-subpoints">
        <li><strong>Week 1:</strong> Mathematics (Conics, Vectors, Calculus & Integration).</li>
        <li><strong>Week 2:</strong> Physics (Electromagnetism, Waves & Modern Physics).</li>
        <li><strong>Week 3:</strong> Chemistry / Computer Science & English vocabulary drilling.</li>
        <li><strong>Week 4:</strong> Daily full-length timed mock tests & weak area analysis.</li>
      </ul>`
    },
    solutions: {
      user: "Step-by-step solution: Solve 2x² - 8x + 6 = 0 using quadratic formula.",
      bot: `<strong>Solution Steps:</strong><br>
      Given $a = 2$, $b = -8$, $c = 6$<br>
      1. Discriminant: $b² - 4ac = (-8)² - 4(2)(6) = 64 - 48 = 16$<br>
      2. Root calculation: $x = \\frac{8 \\pm \\sqrt{16}}{2(2)} = \\frac{8 \\pm 4}{4}$<br>
      3. Solutions: <strong>$x = 3$</strong> or <strong>$x = 1$</strong>.`
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const topicKey = pill.getAttribute('data-prompt') || 'explain';
      const data = promptData[topicKey] || promptData.explain;

      // Animate chat transition
      userMessageEl.style.opacity = '0';
      botMessageEl.style.opacity = '0';

      setTimeout(() => {
        userMessageEl.innerHTML = data.user;
        botMessageEl.innerHTML = data.bot;
        userMessageEl.style.opacity = '1';
        botMessageEl.style.opacity = '1';
      }, 150);
    });
  });
}

/**
 * 4. Auth State Detection
 * Gracefully adapts buttons if a user session is logged in locally
 */
function initAuthDetection() {
  try {
    const userSession = localStorage.getItem('studymate_user') || 
                        localStorage.getItem('currentUser') || 
                        localStorage.getItem('user');

    if (userSession) {
      const loginBtn = document.getElementById('navLoginBtn');
      const getStartedBtn = document.getElementById('navSignupBtn');

      if (loginBtn) {
        loginBtn.textContent = 'Dashboard';
        loginBtn.setAttribute('href', 'dashboard.html');
      }
      if (getStartedBtn) {
        getStartedBtn.textContent = 'My Learning';
        getStartedBtn.setAttribute('href', 'dashboard.html');
      }
    }
  } catch (e) {
    // Local storage access error safeguard
    console.debug('Auth check fallback', e);
  }
}

/**
 * 5. Current Year
 */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 6. Back To Top
 */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. Scroll Reveal via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/**
 * 8. University Tests Dynamic Architecture & Safe Navigation
 */
function initTestCardsInteraction() {
  // Helpful notification toast if needed
  let toastTimeout;
  window.showToast = function(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-notification';
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span id="toastMessage"></span>
      `;
      document.body.appendChild(toast);
    }

    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };
}
