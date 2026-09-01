/* ============================================================
   Vectors & Equilibrium — MDCAT Physics
   EduNexa AI — Interactive JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Storage Keys ---------- */
  var STORAGE_KEY = "studymate_vectors_equilibrium";
  var store = {
    get: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    },
    set: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        /* ignore */
      }
    },
  };

  var state = store.get();
  state.completed = state.completed || false;
  state.mcqAnswers = state.mcqAnswers || {};
  state.scrollProgress = state.scrollProgress || 0;

  /* ---------- Toast ---------- */
  var toastContainer = document.getElementById("toastContainer");

  function toast(message, type) {
    var el = document.createElement("div");
    el.className = "toast " + (type || "");
    var icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
    el.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + message + "</span>";
    toastContainer.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("show");
    });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 2600);
  }

  /* ---------- Header scroll shadow ---------- */
  var header = document.getElementById("siteHeader");
  var scrollTopBtn = document.getElementById("scrollTopBtn");

  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
    updateProgressBar();
    updateActiveNav();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll to top ---------- */
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var footerScrollTop = document.getElementById("footerScrollTop");
  if (footerScrollTop) {
    footerScrollTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Progress bar ---------- */
  var progressFill = document.getElementById("progressFill");
  var heroProgress = document.getElementById("heroProgress");

  function updateProgressBar() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
    state.scrollProgress = Math.round(pct);
    progressFill.style.width = pct + "%";
    if (heroProgress) heroProgress.textContent = Math.round(pct);
  }

  /* ---------- Sidebar / Mobile menu ---------- */
  var sidebar = document.getElementById("sidebar");
  var menuToggle = document.getElementById("menuToggle");
  var sidebarClose = document.getElementById("sidebarClose");
  var backdrop = document.getElementById("backdrop");

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("show");
    menuToggle.classList.add("active");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
    menuToggle.classList.remove("active");
  }

  menuToggle.addEventListener("click", function () {
    if (sidebar.classList.contains("open")) closeSidebar();
    else openSidebar();
  });
  sidebarClose.addEventListener("click", closeSidebar);
  backdrop.addEventListener("click", closeSidebar);

  /* ---------- Smooth scrolling nav items ---------- */
  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var href = item.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (window.innerWidth <= 900) closeSidebar();
      }
    });
  });

  /* ---------- Active nav tracking ---------- */
  var sections = document.querySelectorAll(".content-section");
  var navMap = {};
  navItems.forEach(function (item) {
    var href = item.getAttribute("href");
    if (href && href.startsWith("#")) navMap[href.slice(1)] = item;
  });

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navItems.forEach(function (item) {
      item.classList.remove("active");
    });
    if (currentId && navMap[currentId]) {
      navMap[currentId].classList.add("active");
    }
  }

  /* ---------- Chapter completion ---------- */
  var markCompleteBtn = document.getElementById("markCompleteBtn");
  var completeLabel = document.getElementById("completeLabel");

  function renderComplete() {
    if (state.completed) {
      markCompleteBtn.classList.add("completed");
      completeLabel.textContent = "Chapter Completed";
    } else {
      markCompleteBtn.classList.remove("completed");
      completeLabel.textContent = "Mark Chapter Complete";
    }
  }

  markCompleteBtn.addEventListener("click", function () {
    state.completed = !state.completed;
    store.set(state);
    renderComplete();
    if (state.completed) {
      toast("Chapter marked complete! Great work!", "success");
    } else {
      toast("Chapter completion removed.", "");
    }
  });

  renderComplete();

  /* ---------- Formula copy buttons ---------- */
  var copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var formula = btn.closest(".formula-card").getAttribute("data-formula") || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formula).then(
          function () {
            btn.classList.add("copied");
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
            toast("Formula copied: " + formula, "success");
            setTimeout(function () {
              btn.classList.remove("copied");
              btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
            }, 2000);
          },
          function () {
            toast("Could not copy to clipboard.", "error");
          }
        );
      } else {
        toast("Clipboard not supported in this browser.", "error");
      }
    });
  });

  /* ---------- Search / Filter ---------- */
  var searchInput = document.getElementById("searchInput");
  var searchClear = document.getElementById("searchClear");
  var searchTerms = ["scalar", "vector", "torque", "equilibrium", "resultant", "components", "couple"];
  var searchableSections = document.querySelectorAll("[data-search]");

  searchInput.addEventListener("input", function () {
    var query = searchInput.value.trim().toLowerCase();
    if (query) {
      searchClear.classList.add("visible");
    } else {
      searchClear.classList.remove("visible");
    }

    if (!query) {
      searchableSections.forEach(function (sec) {
        sec.classList.remove("dimmed", "highlight");
      });
      return;
    }

    var matched = false;
    searchableSections.forEach(function (sec) {
      var text = sec.textContent.toLowerCase();
      var directMatch = text.indexOf(query) !== -1;
      var termMatch = searchTerms.some(function (t) {
        return t.indexOf(query) !== -1 && text.indexOf(t) !== -1;
      });
      if (directMatch || termMatch) {
        sec.classList.remove("dimmed");
        sec.classList.add("highlight");
        matched = true;
      } else {
        sec.classList.add("dimmed");
        sec.classList.remove("highlight");
      }
    });

    if (!matched) {
      searchableSections.forEach(function (sec) {
        sec.classList.remove("dimmed", "highlight");
      });
    }

    setTimeout(function () {
      searchableSections.forEach(function (sec) {
        sec.classList.remove("highlight");
      });
    }, 2000);
  });

  searchClear.addEventListener("click", function () {
    searchInput.value = "";
    searchClear.classList.remove("visible");
    searchableSections.forEach(function (sec) {
      sec.classList.remove("dimmed", "highlight");
    });
    searchInput.focus();
  });

  /* ============================================================
     Interactive Vector Demonstration
     ============================================================ */
  var vecA = document.getElementById("vecA");
  var vecB = document.getElementById("vecB");
  var vecTheta = document.getElementById("vecTheta");
  var vecAVal = document.getElementById("vecAVal");
  var vecBVal = document.getElementById("vecBVal");
  var vecThetaVal = document.getElementById("vecThetaVal");
  var demoResultant = document.getElementById("demoResultant");
  var demoAx = document.getElementById("demoAx");
  var demoAy = document.getElementById("demoAy");
  var demoSvg = document.getElementById("demoSvg");

  function updateDemo() {
    var A = parseFloat(vecA.value);
    var B = parseFloat(vecB.value);
    var theta = parseFloat(vecTheta.value);
    var rad = (theta * Math.PI) / 180;

    vecAVal.textContent = A.toFixed(1);
    vecBVal.textContent = B.toFixed(1);
    vecThetaVal.textContent = theta + "°";

    var R = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(rad));
    var Ax = A * Math.cos(rad);
    var Ay = A * Math.sin(rad);

    demoResultant.textContent = R.toFixed(2);
    demoAx.textContent = Ax.toFixed(2);
    demoAy.textContent = Ay.toFixed(2);

    drawDemoSvg(A, B, theta);
  }

  function drawDemoSvg(A, B, theta) {
    var rad = (theta * Math.PI) / 180;
    var cx = 40, cy = 240;
    var scale = 18;

    var Ax = A * Math.cos(rad);
    var Ay = A * Math.sin(rad);
    var Bx = B;
    var By = 0;
    var Rx = Ax + Bx;
    var Ry = Ay + By;

    var maxR = Math.max(Math.abs(Rx), Math.abs(Ry), A, B, 1);
    var s = (220 / (maxR * 2)) * 0.85;

    var ax2 = cx + Ax * s;
    var ay2 = cy - Ay * s;
    var bx2 = cx + Bx * s;
    var by2 = cy - By * s;
    var rx2 = cx + Rx * s;
    var ry2 = cy - Ry * s;

    demoSvg.innerHTML =
      '<defs>' +
      '<marker id="dA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/></marker>' +
      '<marker id="dB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9"/></marker>' +
      '<marker id="dR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6366f1"/></marker>' +
      '</defs>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="280" y2="' + cy + '" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="20" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#475569"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + ax2 + '" y2="' + ay2 + '" stroke="#10b981" stroke-width="3" marker-end="url(#dA)"/>' +
      '<line x1="' + ax2 + '" y1="' + ay2 + '" x2="' + rx2 + '" y2="' + ry2 + '" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="5 3" marker-end="url(#dB)"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + rx2 + '" y2="' + ry2 + '" stroke="#6366f1" stroke-width="3.5" marker-end="url(#dR)"/>' +
      '<text x="' + (ax2 + 5) + '" y="' + (ay2 - 5) + '" fill="#10b981" font-size="13" font-weight="700" font-family="JetBrains Mono">A</text>' +
      '<text x="' + (rx2 + 5) + '" y="' + (ry2 - 5) + '" fill="#6366f1" font-size="13" font-weight="700" font-family="JetBrains Mono">R</text>' +
      '<text x="' + (bx2 - 15) + '" y="' + (by2 + 18) + '" fill="#0ea5e9" font-size="13" font-weight="700" font-family="JetBrains Mono">B</text>';
  }

  vecA.addEventListener("input", updateDemo);
  vecB.addEventListener("input", updateDemo);
  vecTheta.addEventListener("input", updateDemo);
  updateDemo();

  /* ============================================================
     Vector Calculator
     ============================================================ */
  var calcBtn = document.getElementById("calcBtn");
  var calcResult = document.getElementById("calcResult");
  var calcA = document.getElementById("calcA");
  var calcB = document.getElementById("calcB");
  var calcTheta = document.getElementById("calcTheta");

  calcBtn.addEventListener("click", function () {
    calcA.classList.remove("error");
    calcB.classList.remove("error");
    calcTheta.classList.remove("error");
    calcResult.classList.remove("show", "success", "error");

    var aVal = calcA.value.trim();
    var bVal = calcB.value.trim();
    var tVal = calcTheta.value.trim();

    var hasError = false;
    if (aVal === "" || isNaN(parseFloat(aVal))) {
      calcA.classList.add("error");
      hasError = true;
    }
    if (bVal === "" || isNaN(parseFloat(bVal))) {
      calcB.classList.add("error");
      hasError = true;
    }
    if (tVal === "" || isNaN(parseFloat(tVal))) {
      calcTheta.classList.add("error");
      hasError = true;
    }

    if (hasError) {
      calcResult.classList.add("show", "error");
      calcResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all fields with valid numbers.';
      return;
    }

    var A = parseFloat(aVal);
    var B = parseFloat(bVal);
    var theta = parseFloat(tVal);

    if (A < 0 || B < 0) {
      calcResult.classList.add("show", "error");
      calcResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Magnitudes cannot be negative.';
      return;
    }

    var rad = (theta * Math.PI) / 180;
    var R = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(rad));

    calcResult.classList.add("show", "success");
    calcResult.innerHTML =
      '<i class="fa-solid fa-circle-check"></i> Resultant calculated successfully.' +
      '<span class="result-big">R = ' + R.toFixed(3) + '</span>';
    toast("Resultant: " + R.toFixed(2), "success");
  });

  /* ============================================================
     MCQ System
     ============================================================ */
  var mcqData = [
    {
      q: "Which of the following is a vector quantity?",
      options: ["Mass", "Temperature", "Displacement", "Time"],
      answer: 2,
      explanation: "Displacement has both magnitude and direction, making it a vector. The others are scalars.",
    },
    {
      q: "The SI unit of torque is:",
      options: ["Joule", "Newton", "Newton-meter", "Watt"],
      answer: 2,
      explanation: "Torque is measured in Newton-meter (N·m). Although dimensionally similar to joule, torque is not energy.",
    },
    {
      q: "Two vectors of magnitudes 3 N and 4 N act in the same direction. The resultant is:",
      options: ["1 N", "5 N", "7 N", "12 N"],
      answer: 2,
      explanation: "Same direction: R = A + B = 3 + 4 = 7 N.",
    },
    {
      q: "Two perpendicular vectors of 6 N and 8 N have a resultant of:",
      options: ["10 N", "14 N", "2 N", "48 N"],
      answer: 0,
      explanation: "Perpendicular: R = √(A² + B²) = √(36 + 64) = √100 = 10 N.",
    },
    {
      q: "The x-component of a vector A making angle θ with the x-axis is:",
      options: ["A sinθ", "A cosθ", "A tanθ", "A / cosθ"],
      answer: 1,
      explanation: "The horizontal (x) component is A cosθ. The vertical (y) component is A sinθ.",
    },
    {
      q: "A body is in equilibrium when:",
      options: ["Its velocity is zero", "Its acceleration is zero", "Net force is zero", "Both net force and net torque are zero"],
      answer: 3,
      explanation: "Complete equilibrium requires both translational (ΣF = 0) and rotational (Στ = 0) equilibrium.",
    },
    {
      q: "Maximum torque occurs when the angle between force and lever arm is:",
      options: ["0°", "45°", "90°", "180°"],
      answer: 2,
      explanation: "τ = Fr sinθ is maximum when sinθ = 1, i.e., θ = 90°.",
    },
    {
      q: "A couple consists of:",
      options: ["One force acting on a body", "Two equal and opposite parallel forces", "Two perpendicular forces", "Two unequal parallel forces"],
      answer: 1,
      explanation: "A couple is two equal, opposite, parallel forces producing rotation without translation.",
    },
    {
      q: "The moment of a couple is given by:",
      options: ["τ = Fr sinθ", "τ = Fd", "τ = Fr", "τ = F/d"],
      answer: 1,
      explanation: "For a couple, τ = F × d, where d is the perpendicular distance between the two forces.",
    },
    {
      q: "Which of the following is a scalar quantity?",
      options: ["Velocity", "Force", "Speed", "Acceleration"],
      answer: 2,
      explanation: "Speed has magnitude only, no direction. It is a scalar. Velocity, force, and acceleration are vectors.",
    },
    {
      q: "For a body in rotational equilibrium:",
      options: ["ΣF = 0", "Στ = 0", "a = 0", "v = constant"],
      answer: 1,
      explanation: "Rotational equilibrium requires the net torque to be zero: Στ = 0.",
    },
    {
      q: "The centre of gravity of a uniform rod is at:",
      options: ["One end", "Its midpoint", "One-third from an end", "Anywhere"],
      answer: 1,
      explanation: "For a uniform, symmetrical object like a rod, the centre of gravity is at its geometric centre (midpoint).",
    },
    {
      q: "Two vectors of 5 N each act in opposite directions. The resultant is:",
      options: ["10 N", "0 N", "5 N", "25 N"],
      answer: 1,
      explanation: "Opposite direction: R = |A − B| = |5 − 5| = 0 N.",
    },
    {
      q: "A vector A has components Aₓ = 3 and Aᵧ = 4. Its magnitude is:",
      options: ["1", "5", "7", "12"],
      answer: 1,
      explanation: "A = √(Aₓ² + Aᵧ²) = √(9 + 16) = √25 = 5.",
    },
    {
      q: "Dynamic equilibrium means the object is:",
      options: ["At rest", "Accelerating", "Moving with constant velocity", "Rotating"],
      answer: 2,
      explanation: "In dynamic equilibrium, the object moves with constant velocity — net force is zero but the body is in motion.",
    },
    {
      q: "A unit vector has a magnitude of:",
      options: ["0", "1", "10", "Infinite"],
      answer: 1,
      explanation: "A unit vector has magnitude exactly 1 and indicates direction only, such as î, ĵ, or k̂.",
    },
    {
      q: "The principle of moments states that for equilibrium:",
      options: ["Clockwise = anticlockwise moments", "All forces are zero", "All torques are zero", "Mass is constant"],
      answer: 0,
      explanation: "The principle of moments: clockwise moments = anticlockwise moments about the pivot (Στ = 0).",
    },
    {
      q: "If two vectors are equal, they must have the same:",
      options: ["Starting point", "Magnitude and direction", "Magnitude only", "Direction only"],
      answer: 1,
      explanation: "Equal vectors have the same magnitude AND the same direction, regardless of their starting point.",
    },
    {
      q: "Anti-parallel vectors are vectors that:",
      options: ["Are perpendicular", "Have the same direction", "Are parallel but opposite in direction", "Have zero magnitude"],
      answer: 2,
      explanation: "Anti-parallel vectors act along parallel lines but in opposite directions.",
    },
    {
      q: "A force of 10 N is applied at 90° to a lever arm of 2 m. The torque is:",
      options: ["5 N·m", "10 N·m", "20 N·m", "0 N·m"],
      answer: 2,
      explanation: "τ = Fr sinθ = 10 × 2 × sin90° = 10 × 2 × 1 = 20 N·m.",
    },
  ];

  var mcqList = document.getElementById("mcqList");
  var totalScore = document.getElementById("totalScore");
  var correctCount = document.getElementById("correctCount");
  var incorrectCount = document.getElementById("incorrectCount");
  var percentage = document.getElementById("percentage");
  var performanceMsg = document.getElementById("performanceMsg");
  var resetMcqBtn = document.getElementById("resetMcqBtn");

  function renderMcqs() {
    mcqList.innerHTML = "";
    mcqData.forEach(function (item, idx) {
      var card = document.createElement("div");
      card.className = "mcq-card";
      card.dataset.idx = idx;

      var optionsHtml = item.options
        .map(function (opt, i) {
          return (
            '<label class="mcq-option" data-opt="' + i + '">' +
            '<input type="radio" name="mcq' + idx + '" value="' + i + '" />' +
            "<span>" + String.fromCharCode(65 + i) + ". " + opt + "</span>" +
            "</label>"
          );
        })
        .join("");

      card.innerHTML =
        '<span class="mcq-num">' + (idx + 1) + "</span>" +
        '<p class="mcq-question">' + item.q + "</p>" +
        '<div class="mcq-options">' + optionsHtml + "</div>" +
        '<div class="mcq-actions">' +
        '<button class="mcq-check-btn"><i class="fa-solid fa-check"></i> Check Answer</button>' +
        "</div>" +
        '<div class="mcq-feedback"></div>';

      mcqList.appendChild(card);

      var saved = state.mcqAnswers[idx];
      if (saved !== undefined) {
        var optionEl = card.querySelector('.mcq-option[data-opt="' + saved.selected + '"]');
        if (optionEl) optionEl.classList.add("selected");
        showFeedback(card, idx, saved.selected, true);
      }
    });

    updateScore();
  }

  function showFeedback(card, idx, selected, isRestored) {
    var item = mcqData[idx];
    var options = card.querySelectorAll(".mcq-option");
    var feedback = card.querySelector(".mcq-feedback");
    var checkBtn = card.querySelector(".mcq-check-btn");

    options.forEach(function (opt) {
      opt.classList.add("disabled");
      var optIdx = parseInt(opt.dataset.opt, 10);
      if (optIdx === item.answer) {
        opt.classList.add("correct-answer");
      }
      if (optIdx === selected && optIdx !== item.answer) {
        opt.classList.add("wrong-answer");
      }
    });

    var isCorrect = selected === item.answer;
    card.classList.add("answered", isCorrect ? "correct" : "incorrect");
    feedback.classList.add("show", isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      feedback.innerHTML =
        "<strong>Correct!</strong> " + item.explanation;
    } else {
      feedback.innerHTML =
        "<strong>Incorrect.</strong> The correct answer is " +
        String.fromCharCode(65 + item.answer) +
        ". " + item.explanation;
    }

    checkBtn.disabled = true;

    if (!isRestored) {
      state.mcqAnswers[idx] = { selected: selected, correct: isCorrect };
      store.set(state);
      updateScore();
      if (isCorrect) toast("Correct answer!", "success");
      else toast("Incorrect — see the explanation below.", "error");
    }
  }

  mcqList.addEventListener("change", function (e) {
    if (e.target.type === "radio") {
      var card = e.target.closest(".mcq-card");
      card.querySelectorAll(".mcq-option").forEach(function (opt) {
        opt.classList.remove("selected");
      });
      e.target.closest(".mcq-option").classList.add("selected");
    }
  });

  mcqList.addEventListener("click", function (e) {
    if (e.target.closest(".mcq-check-btn")) {
      var card = e.target.closest(".mcq-card");
      var idx = parseInt(card.dataset.idx, 10);
      var selectedRadio = card.querySelector('input[type="radio"]:checked');
      if (!selectedRadio) {
        toast("Please select an answer first.", "error");
        return;
      }
      showFeedback(card, idx, parseInt(selectedRadio.value, 10), false);
    }
  });

  function updateScore() {
    var correct = 0;
    var incorrect = 0;
    var answered = 0;
    Object.keys(state.mcqAnswers).forEach(function (k) {
      if (state.mcqAnswers[k].correct) correct++;
      else incorrect++;
      answered++;
    });

    totalScore.textContent = correct + " / " + mcqData.length;
    correctCount.textContent = correct;
    incorrectCount.textContent = incorrect;
    var pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    percentage.textContent = pct + "%";

    if (answered === 0) {
      performanceMsg.textContent = "Answer questions to see your performance.";
    } else if (pct >= 90) {
      performanceMsg.textContent = "Outstanding! You're MDCAT-ready on this chapter.";
    } else if (pct >= 75) {
      performanceMsg.textContent = "Great work! A little more practice and you'll ace it.";
    } else if (pct >= 50) {
      performanceMsg.textContent = "Good start. Review the notes and try again.";
    } else {
      performanceMsg.textContent = "Keep studying — revisit the notes above and retry.";
    }
  }

  resetMcqBtn.addEventListener("click", function () {
    state.mcqAnswers = {};
    store.set(state);
    renderMcqs();
    toast("Quiz reset. Good luck!", "");
  });

  renderMcqs();

  /* ============================================================
     Flashcards
     ============================================================ */
  var flashcardData = [
    { front: "What is a vector?", back: "A physical quantity with both magnitude and direction, e.g. force, velocity." },
    { front: "What is a scalar?", back: "A physical quantity with magnitude only, e.g. mass, time, temperature." },
    { front: "What is a resultant?", back: "The single vector that produces the same effect as two or more vectors combined." },
    { front: "What is torque?", back: "The turning effect of a force about a pivot. τ = Fr sinθ. Unit: N·m." },
    { front: "What is equilibrium?", back: "A state where net force and net torque on a body are both zero." },
    { front: "What is a couple?", back: "Two equal, opposite, parallel forces that produce rotation without translation. τ = Fd." },
    { front: "What is a unit vector?", back: "A vector with magnitude 1, used to indicate direction only (î, ĵ, k̂)." },
    { front: "What is the principle of moments?", back: "For rotational equilibrium, clockwise moments equal anticlockwise moments (Στ = 0)." },
    { front: "What is the centre of gravity?", back: "The point through which the entire weight of an object appears to act." },
    { front: "What are the components of a vector?", back: "Aₓ = A cosθ (horizontal) and Aᵧ = A sinθ (vertical), where θ is the angle with the x-axis." },
  ];

  var flashcardGrid = document.getElementById("flashcardGrid");

  flashcardData.forEach(function (card) {
    var el = document.createElement("div");
    el.className = "flashcard";
    el.innerHTML =
      '<div class="flashcard-inner">' +
      '<div class="flashcard-front">' +
      '<span class="fc-label">Question</span>' +
      '<span class="fc-question">' + card.front + "</span>" +
      '<span class="flashcard-hint">Tap to flip</span>' +
      "</div>" +
      '<div class="flashcard-back">' +
      '<span class="fc-label">Answer</span>' +
      '<span class="fc-answer">' + card.back + "</span>" +
      "</div>" +
      "</div>";
    el.addEventListener("click", function () {
      el.classList.toggle("flipped");
    });
    flashcardGrid.appendChild(el);
  });

  /* ---------- Initial render ---------- */
  updateProgressBar();
  updateActiveNav();
  onScroll();
})();
