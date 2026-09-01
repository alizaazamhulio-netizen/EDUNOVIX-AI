/* ============================================================
   EduNexa AI — GRADE 4
   grade4.js — PART 1
   ------------------------------------------------------------
   Part 1 includes:
   1. Global App State
   2. LocalStorage
   3. DOM Helpers
   4. Toast Notifications
   5. Modal System
   6. Navigation
   7. Search System
   8. Dashboard Statistics
   9. Daily Streak
   10. 25-Minute Study Timer
   11. Daily Study Plan
   12. Sound / Speech Helpers
   13. Basic Utility Functions
   ============================================================ */


/* ============================================================
   1. GLOBAL APPLICATION STATE
   ============================================================ */

const EduNexaApp = {

    version: "1.0.0",

    student: {
        name: "Young Explorer",
        grade: 4,
        level: 1,
        levelName: "Explorer",
        stars: 0,
        streak: 0,
        bestStreak: 0,
        lastCheckIn: null
    },

    progress: {
        lessonsCompleted: 0,
        practiceQuestions: 0,
        correctAnswers: 0,
        quizAttempts: 0,
        quizTotalScore: 0,
        bestQuizScore: 0
    },

    subjects: {
        english: 0,
        math: 0,
        science: 0,
        urdu: 0,
        sindhi: 0,
        computer: 0,
        gk: 0
    },

    dailyPlan: {
        completed: [],
        target: 5
    },

    games: {
        totalScore: 0,
        gamesPlayed: 0
    },

    achievements: [],

    settings: {
        soundEnabled: true,
        speechEnabled: true
    }
};


/* ============================================================
   2. LOCAL STORAGE
   ============================================================ */

const STORAGE_KEY = "studymate_grade4_data";


function saveAppData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(EduNexaApp)
        );

    } catch (error) {

        console.error("Could not save EduNexa data:", error);

    }
}


function loadAppData() {

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return;
        }

        const parsedData = JSON.parse(savedData);

        if (parsedData.student) {
            EduNexaApp.student = {
                ...EduNexaApp.student,
                ...parsedData.student
            };
        }

        if (parsedData.progress) {
            EduNexaApp.progress = {
                ...EduNexaApp.progress,
                ...parsedData.progress
            };
        }

        if (parsedData.subjects) {
            EduNexaApp.subjects = {
                ...EduNexaApp.subjects,
                ...parsedData.subjects
            };
        }

        if (parsedData.dailyPlan) {
            EduNexaApp.dailyPlan = {
                ...EduNexaApp.dailyPlan,
                ...parsedData.dailyPlan
            };
        }

        if (parsedData.games) {
            EduNexaApp.games = {
                ...EduNexaApp.games,
                ...parsedData.games
            };
        }

        if (Array.isArray(parsedData.achievements)) {
            EduNexaApp.achievements = parsedData.achievements;
        }

        if (parsedData.settings) {
            EduNexaApp.settings = {
                ...EduNexaApp.settings,
                ...parsedData.settings
            };
        }

    } catch (error) {

        console.error("Could not load EduNexa data:", error);

    }
}


/* ============================================================
   3. DOM HELPER FUNCTIONS
   ============================================================ */

function $(selector) {
    return document.querySelector(selector);
}


function $$(selector) {
    return document.querySelectorAll(selector);
}


function getElement(id) {
    return document.getElementById(id);
}


function setText(id, value) {

    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


function setHTML(id, html) {

    const element = getElement(id);

    if (element) {
        element.innerHTML = html;
    }
}


function setWidth(id, percentage) {

    const element = getElement(id);

    if (element) {

        const safePercentage = Math.max(
            0,
            Math.min(100, percentage)
        );

        element.style.width = `${safePercentage}%`;
    }
}


/* ============================================================
   4. NUMBER / TEXT UTILITIES
   ============================================================ */

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );
}


function formatNumber(number) {

    return Number(number || 0).toLocaleString();
}


function getPercentage(correct, total) {

    if (!total) {
        return 0;
    }

    return Math.round(
        (correct / total) * 100
    );
}


function getQuizGrade(score) {

    if (score >= 90) return "Grade A+";
    if (score >= 80) return "Grade A";
    if (score >= 70) return "Grade B";
    if (score >= 60) return "Grade C";
    if (score >= 50) return "Grade D";

    return "Keep Practicing";
}


function getLevelFromStars(stars) {

    if (stars >= 500) return 10;
    if (stars >= 400) return 9;
    if (stars >= 300) return 8;
    if (stars >= 225) return 7;
    if (stars >= 175) return 6;
    if (stars >= 125) return 5;
    if (stars >= 90) return 4;
    if (stars >= 60) return 3;
    if (stars >= 30) return 2;

    return 1;
}


function getLevelName(level) {

    const names = {
        1: "Explorer",
        2: "Learner",
        3: "Smart Learner",
        4: "Knowledge Seeker",
        5: "Super Learner",
        6: "Skill Builder",
        7: "Bright Mind",
        8: "Learning Hero",
        9: "Master Explorer",
        10: "Grade 4 Champion"
    };

    return names[level] || "Explorer";
}


/* ============================================================
   5. TOAST NOTIFICATION SYSTEM
   ============================================================ */

function showToast(message, type = "success", duration = 3000) {

    const container = getElement("toast-container");

    if (!container) {
        return;
    }

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "💡",
        star: "⭐"
    };

    toast.innerHTML = `
        <span class="toast-icon">
            ${icons[type] || "💡"}
        </span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, duration);
}


/* ============================================================
   6. MODAL SYSTEM
   ============================================================ */

function openModal(modalId) {

    const modal = getElement(modalId);

    if (!modal) {
        console.warn(`Modal not found: ${modalId}`);
        return;
    }

    modal.classList.add("active");

    document.body.classList.add("modal-open");

    modal.setAttribute("aria-hidden", "false");
}


function closeModal(modalId) {

    const modal = getElement(modalId);

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    const activeModals = document.querySelectorAll(
        ".modal-overlay.active"
    );

    if (activeModals.length === 0) {
        document.body.classList.remove("modal-open");
    }
}


function closeAllModals() {

    document
        .querySelectorAll(".modal-overlay.active")
        .forEach(modal => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        });

    document.body.classList.remove("modal-open");
}


function setupModalEvents() {

    document
        .querySelectorAll(".modal-overlay")
        .forEach(overlay => {

            overlay.addEventListener("click", function(event) {

                if (event.target === overlay) {

                    const modalId = overlay.id;

                    if (modalId === "master-quiz-modal") {
                        return;
                    }

                    closeModal(modalId);
                }

            });

        });
}


/* ============================================================
   7. MOBILE NAVIGATION
   ============================================================ */

function setupMobileNavigation() {

    const hamburger = getElement("hamburger-toggle");
    const drawer = getElement("mobile-drawer");

    if (!hamburger || !drawer) {
        return;
    }

    hamburger.addEventListener("click", () => {

        drawer.classList.toggle("open");

        hamburger.classList.toggle("active");

    });


    drawer
        .querySelectorAll(".mobile-nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                drawer.classList.remove("open");

                hamburger.classList.remove("active");

            });

        });
}


/* ============================================================
   8. SMOOTH NAVIGATION
   ============================================================ */

function setupSmoothNavigation() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function(event) {

                const targetId = this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });
}


/* ============================================================
   9. HEADER SCROLL EFFECT
   ============================================================ */

function setupHeaderScroll() {

    const header = getElement("main-header");

    if (!header) {
        return;
    }

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });
}


/* ============================================================
   10. GLOBAL SEARCH
   ============================================================ */

const searchDatabase = [

    {
        title: "English Language",
        category: "Subject",
        keyword: "english grammar reading vocabulary",
        action: () => openSubjectCurriculum("english")
    },

    {
        title: "Mathematics",
        category: "Subject",
        keyword: "math mathematics numbers fractions division",
        action: () => openSubjectCurriculum("math")
    },

    {
        title: "Science Explorer",
        category: "Subject",
        keyword: "science plants human body matter energy",
        action: () => openSubjectCurriculum("science")
    },

    {
        title: "Urdu",
        category: "Subject",
        keyword: "urdu اردو grammar vocabulary",
        action: () => openSubjectCurriculum("urdu")
    },

    {
        title: "Sindhi",
        category: "Subject",
        keyword: "sindhi سنڌي grammar",
        action: () => openSubjectCurriculum("sindhi")
    },

    {
        title: "Computer Studies",
        category: "Subject",
        keyword: "computer internet safety typing hardware",
        action: () => openSubjectCurriculum("computer")
    },

    {
        title: "General Knowledge",
        category: "Subject",
        keyword: "gk geography pakistan world",
        action: () => openSubjectCurriculum("gk")
    },

    {
        title: "The Mystery of the Missing Map",
        category: "Reading",
        keyword: "story mystery adventure map",
        action: () => openStoryModal("story-1")
    },

    {
        title: "The Science Fair Surprise",
        category: "Reading",
        keyword: "story science solar purifier",
        action: () => openStoryModal("story-2")
    },

    {
        title: "The Little Inventor",
        category: "Reading",
        keyword: "story inventor engineering stem",
        action: () => openStoryModal("story-3")
    },

    {
        title: "Journey to the Old Library",
        category: "Reading",
        keyword: "story library history astronomy",
        action: () => openStoryModal("story-4")
    },

    {
        title: "The Clever Team",
        category: "Reading",
        keyword: "story teamwork coding flood",
        action: () => openStoryModal("story-5")
    },

    {
        title: "The Day the River Changed",
        category: "Reading",
        keyword: "story river ecology nature indus",
        action: () => openStoryModal("story-6")
    },

    {
        title: "Math Speed Challenge",
        category: "Game",
        keyword: "game math speed arithmetic",
        action: () => launchGame("math-speed")
    },

    {
        title: "Fraction Builder",
        category: "Game",
        keyword: "game fractions pizza",
        action: () => launchGame("fraction-builder")
    },

    {
        title: "Times Table Race",
        category: "Game",
        keyword: "game multiplication tables race",
        action: () => launchGame("tables-race")
    },

    {
        title: "Word Builder",
        category: "Game",
        keyword: "game spelling vocabulary words",
        action: () => launchGame("word-builder")
    },

    {
        title: "Vocabulary Match",
        category: "Game",
        keyword: "game vocabulary synonym antonym",
        action: () => launchGame("vocab-match")
    },

    {
        title: "Science Detective",
        category: "Game",
        keyword: "game science solids liquids gases",
        action: () => launchGame("science-detective")
    },

    {
        title: "Human Body Explorer",
        category: "Game",
        keyword: "game human body organs",
        action: () => launchGame("body-explorer")
    },

    {
        title: "Map Explorer",
        category: "Game",
        keyword: "game map pakistan geography",
        action: () => launchGame("map-explorer")
    },

    {
        title: "Grammar Challenge",
        category: "Game",
        keyword: "game grammar punctuation tenses",
        action: () => launchGame("grammar-challenge")
    },

    {
        title: "Reading Detective",
        category: "Game",
        keyword: "game reading inference mystery",
        action: () => launchGame("reading-detective")
    },

    {
        title: "Practice Center",
        category: "Practice",
        keyword: "practice questions difficulty easy medium challenge",
        action: () => {
            document
                .getElementById("practice-section")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    },

    {
        title: "50Q Master Quiz",
        category: "Quiz",
        keyword: "quiz exam assessment 50 questions",
        action: () => {
            document
                .getElementById("quiz-section")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    },

    {
        title: "Books & Resources",
        category: "Resources",
        keyword: "books oxford sindh textbook khan academy",
        action: () => {
            document
                .getElementById("resources-section")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    }

];


function setupSearch() {

    const input = getElement("global-search");
    const dropdown = getElement("search-results-dropdown");
    const clearButton = getElement("clear-search");

    if (!input || !dropdown) {
        return;
    }


    function performSearch() {

        const query = input.value
            .trim()
            .toLowerCase();

        dropdown.innerHTML = "";

        if (clearButton) {
            clearButton.style.display =
                query ? "block" : "none";
        }

        if (!query) {

            dropdown.classList.remove("show");

            return;
        }


        const results = searchDatabase
            .filter(item => {

                const combinedText =
                    `${item.title} ${item.category} ${item.keyword}`
                        .toLowerCase();

                return combinedText.includes(query);

            })
            .slice(0, 8);


        if (results.length === 0) {

            dropdown.innerHTML = `
                <div class="search-no-results">
                    <span>🔍</span>
                    <div>
                        <strong>No results found</strong>
                        <small>Try another Grade 4 topic.</small>
                    </div>
                </div>
            `;

            dropdown.classList.add("show");

            return;
        }


        results.forEach(item => {

            const result = document.createElement("button");

            result.type = "button";
            result.className = "search-result-item";

            result.innerHTML = `
                <div class="search-result-icon">
                    ${getSearchIcon(item.category)}
                </div>

                <div class="search-result-text">
                    <strong>${item.title}</strong>
                    <span>${item.category}</span>
                </div>

                <span class="search-result-arrow">→</span>
            `;

            result.addEventListener("click", () => {

                dropdown.classList.remove("show");

                input.value = "";

                if (clearButton) {
                    clearButton.style.display = "none";
                }

                item.action();

            });

            dropdown.appendChild(result);

        });

        dropdown.classList.add("show");
    }


    input.addEventListener("input", performSearch);


    input.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            input.value = "";

            dropdown.classList.remove("show");

            if (clearButton) {
                clearButton.style.display = "none";
            }
        }

    });


    if (clearButton) {

        clearButton.addEventListener("click", () => {

            input.value = "";

            dropdown.classList.remove("show");

            clearButton.style.display = "none";

            input.focus();

        });

    }


    document.addEventListener("click", event => {

        const wrapper = getElement("search-wrapper");

        if (
            wrapper &&
            !wrapper.contains(event.target)
        ) {
            dropdown.classList.remove("show");
        }

    });

}


function getSearchIcon(category) {

    const icons = {
        Subject: "📚",
        Reading: "📖",
        Game: "🎮",
        Practice: "🧠",
        Quiz: "🏆",
        Resources: "📚"
    };

    return icons[category] || "🔎";
}


/* ============================================================
   11. DASHBOARD UPDATE
   ============================================================ */

function updateDashboard() {

    const progress = EduNexaApp.progress;
    const student = EduNexaApp.student;


    /* Lessons */

    setText(
        "dash-lessons-count",
        formatNumber(progress.lessonsCompleted)
    );

    const lessonsPercentage = clamp(
        Math.round(
            (progress.lessonsCompleted / 209) * 100
        ),
        0,
        100
    );

    setText(
        "dash-lessons-pct",
        `${lessonsPercentage}%`
    );

    setWidth(
        "dash-lessons-bar",
        lessonsPercentage
    );


    /* Practice Questions */

    setText(
        "dash-questions-count",
        formatNumber(progress.practiceQuestions)
    );

    const accuracy =
        progress.practiceQuestions > 0
            ? getPercentage(
                progress.correctAnswers,
                progress.practiceQuestions
            )
            : 100;

    setText(
        "dash-accuracy-val",
        `${accuracy}%`
    );

    setWidth(
        "dash-questions-bar",
        Math.min(accuracy, 100)
    );


    /* Quiz Average */

    const quizAverage =
        progress.quizAttempts > 0
            ? Math.round(
                progress.quizTotalScore /
                progress.quizAttempts
            )
            : 0;

    setText(
        "dash-quiz-avg",
        `${quizAverage}%`
    );

    setText(
        "dash-quiz-grade",
        getQuizGrade(quizAverage)
    );

    setText(
        "dash-quiz-attempts",
        progress.quizAttempts
    );

    setWidth(
        "dash-quiz-bar",
        quizAverage
    );


    /* Stars */

    setText(
        "dash-stars-count",
        formatNumber(student.stars)
    );

    setText(
        "nav-stars-val",
        formatNumber(student.stars)
    );

    const nextBadge =
        student.stars < 50
            ? 50
            : student.stars < 100
                ? 100
                : student.stars < 150
                    ? 150
                    : 200;

    setText(
        "dash-stars-next",
        nextBadge
    );

    const starsProgress =
        (student.stars % 50) * 2;

    setWidth(
        "dash-stars-bar",
        starsProgress
    );


    /* Streak */

    setText(
        "dash-streak-count",
        `${student.streak} Days`
    );

    setText(
        "nav-streak-val",
        student.streak
    );

    setText(
        "dash-best-streak",
        `${student.bestStreak} Days`
    );

    const streakProgress =
        Math.min(
            (student.streak / 7) * 100,
            100
        );

    setWidth(
        "dash-streak-bar",
        streakProgress
    );


    /* Best Score */

    setText(
        "dash-best-score",
        `${progress.bestQuizScore}%`
    );

    setWidth(
        "dash-best-bar",
        progress.bestQuizScore
    );


    /* Level */

    const level =
        getLevelFromStars(student.stars);

    student.level = level;

    student.levelName =
        getLevelName(level);

    setText(
        "nav-level-name",
        `Lvl ${level}`
    );


    updateDailyTarget();

    updateSubjectProgress();

    saveAppData();
}


/* ============================================================
   12. SUBJECT PROGRESS
   ============================================================ */

function updateSubjectProgress() {

    Object.entries(EduNexaApp.subjects)
        .forEach(([subject, progress]) => {

            const safeProgress =
                clamp(Number(progress) || 0, 0, 100);

            setText(
                `${subject}-prog-pct`,
                `${safeProgress}%`
            );

            setWidth(
                `${subject}-prog-bar`,
                safeProgress
            );

        });
}


/* ============================================================
   13. ADD STARS
   ============================================================ */

function addStars(amount, reason = "Great job!") {

    amount = Math.max(
        0,
        Number(amount) || 0
    );

    if (amount === 0) {
        return;
    }

    EduNexaApp.student.stars += amount;

    showToast(
        `+${amount} ⭐ ${reason}`,
        "star",
        3500
    );

    updateDashboard();

    checkLevelUp();

    saveAppData();

    triggerConfetti();
}


function checkLevelUp() {

    const newLevel =
        getLevelFromStars(
            EduNexaApp.student.stars
        );

    const oldLevel =
        EduNexaApp.student.level;

    if (newLevel > oldLevel) {

        EduNexaApp.student.level =
            newLevel;

        EduNexaApp.student.levelName =
            getLevelName(newLevel);

        showToast(
            `🎉 Level Up! You are now ${getLevelName(newLevel)}!`,
            "success",
            5000
        );

        triggerConfetti();
    }
}


/* ============================================================
   14. DAILY STREAK SYSTEM
   ============================================================ */

function getTodayString() {

    const date = new Date();

    return date.toISOString()
        .split("T")[0];
}


function getYesterdayString() {

    const date = new Date();

    date.setDate(
        date.getDate() - 1
    );

    return date.toISOString()
        .split("T")[0];
}


function checkDailyStreak() {

    const student =
        EduNexaApp.student;

    const today =
        getTodayString();

    const yesterday =
        getYesterdayString();


    if (student.lastCheckIn === today) {

        showToast(
            "🔥 You already checked in today!",
            "info"
        );

        return;
    }


    if (student.lastCheckIn === yesterday) {

        student.streak += 1;

    } else {

        student.streak = 1;

    }


    if (
        student.streak >
        student.bestStreak
    ) {

        student.bestStreak =
            student.streak;
    }


    student.lastCheckIn = today;


    addStars(
        5,
        "Daily check-in!"
    );


    setText(
        "claim-daily-streak-btn",
        "Checked In ✓"
    );


    const button =
        getElement("claim-daily-streak-btn");

    if (button) {
        button.disabled = true;
    }


    updateDashboard();

    saveAppData();

    showToast(
        `🔥 ${student.streak}-day learning streak!`,
        "success",
        4000
    );
}


function setupStreakButton() {

    const button =
        getElement("claim-daily-streak-btn");

    if (!button) {
        return;
    }


    const today =
        getTodayString();


    if (
        EduNexaApp.student.lastCheckIn ===
        today
    ) {

        button.textContent =
            "Checked In ✓";

        button.disabled = true;

    }


    button.addEventListener(
        "click",
        checkDailyStreak
    );
}


/* ============================================================
   15. DAILY STUDY PLAN
   ============================================================ */

function updateDailyTarget() {

    const completed =
        EduNexaApp.dailyPlan.completed.length;

    const target =
        EduNexaApp.dailyPlan.target;

    const indicator =
        getElement("daily-target-indicator");

    if (indicator) {

        indicator.innerHTML = `
            <span>
                🎯 Daily Target:
                <strong>
                    ${completed}/${target} Activities
                </strong>
            </span>
        `;

    }
}


function setupDailyPlan() {

    const checkboxes =
        document.querySelectorAll(
            ".plan-checkbox"
        );


    checkboxes.forEach(checkbox => {

        const subject =
            checkbox.dataset.subject;


        if (
            EduNexaApp.dailyPlan.completed
                .includes(subject)
        ) {

            checkbox.checked = true;

            checkbox
                .closest(".plan-item")
                ?.classList.add("completed");
        }


        checkbox.addEventListener(
            "change",
            function() {

                const item =
                    this.closest(".plan-item");


                if (this.checked) {

                    if (
                        !EduNexaApp.dailyPlan.completed
                            .includes(subject)
                    ) {

                        EduNexaApp.dailyPlan.completed
                            .push(subject);

                        addStars(
                            2,
                            "Daily plan completed!"
                        );

                    }

                    item?.classList.add(
                        "completed"
                    );

                } else {

                    EduNexaApp.dailyPlan.completed =
                        EduNexaApp.dailyPlan.completed
                            .filter(
                                value => value !== subject
                            );

                    item?.classList.remove(
                        "completed"
                    );
                }


                updateDailyTarget();

                saveAppData();

            }
        );

    });

}


/* ============================================================
   16. 25-MINUTE STUDY TIMER
   ============================================================ */

let studyTimerInterval = null;

let studyTimerSeconds = 25 * 60;

let studyTimerRunning = false;


function formatTime(totalSeconds) {

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function updateStudyTimerDisplay() {

    setText(
        "study-timer-display",
        formatTime(studyTimerSeconds)
    );
}


function startStudyTimer() {

    if (studyTimerRunning) {
        return;
    }


    studyTimerRunning = true;


    const button =
        getElement("timer-toggle-btn");

    if (button) {
        button.textContent = "Pause Timer";
    }


    studyTimerInterval =
        setInterval(() => {

            studyTimerSeconds--;

            updateStudyTimerDisplay();


            if (studyTimerSeconds <= 0) {

                pauseStudyTimer();

                studyTimerSeconds = 25 * 60;

                updateStudyTimerDisplay();

                addStars(
                    5,
                    "25-minute focus session complete!"
                );

                showToast(
                    "🎉 Focus session complete! Take a short break.",
                    "success",
                    5000
                );

            }

        }, 1000);
}


function pauseStudyTimer() {

    studyTimerRunning = false;

    clearInterval(
        studyTimerInterval
    );

    studyTimerInterval = null;


    const button =
        getElement("timer-toggle-btn");

    if (button) {
        button.textContent =
            "Start Timer";
    }
}


function resetStudyTimer() {

    pauseStudyTimer();

    studyTimerSeconds =
        25 * 60;

    updateStudyTimerDisplay();
}


function setupStudyTimer() {

    const toggleButton =
        getElement("timer-toggle-btn");

    const resetButton =
        getElement("timer-reset-btn");


    if (toggleButton) {

        toggleButton.addEventListener(
            "click",
            () => {

                if (studyTimerRunning) {
                    pauseStudyTimer();
                } else {
                    startStudyTimer();
                }

            }
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetStudyTimer
        );

    }


    updateStudyTimerDisplay();
}


/* ============================================================
   17. AUDIO TOGGLE
   ============================================================ */

function setupAudioToggle() {

    const button =
        getElement("audio-toggle-btn");

    if (!button) {
        return;
    }


    updateAudioIcon();


    button.addEventListener(
        "click",
        () => {

            EduNexaApp.settings.soundEnabled =
                !EduNexaApp.settings.soundEnabled;

            updateAudioIcon();

            saveAppData();


            showToast(
                EduNexaApp.settings.soundEnabled
                    ? "🔊 Sound effects enabled"
                    : "🔇 Sound effects disabled",
                "info"
            );

        }
    );
}


function updateAudioIcon() {

    const button =
        getElement("audio-toggle-btn");

    if (!button) {
        return;
    }


    const onIcon =
        getElement("sound-icon-on");


    if (
        EduNexaApp.settings.soundEnabled
    ) {

        button.classList.remove(
            "muted"
        );

        if (onIcon) {
            onIcon.style.opacity = "1";
        }

        button.setAttribute(
            "aria-label",
            "Mute Sound"
        );

    } else {

        button.classList.add(
            "muted"
        );

        if (onIcon) {
            onIcon.style.opacity = "0.35";
        }

        button.setAttribute(
            "aria-label",
            "Enable Sound"
        );
    }
}


/* ============================================================
   18. SPEECH HELPER
   ============================================================ */

function speakText(text) {

    if (
        !EduNexaApp.settings.speechEnabled
    ) {
        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        showToast(
            "Speech is not supported in this browser.",
            "warning"
        );

        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;


    window.speechSynthesis.speak(
        utterance
    );
}


function stopSpeech() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


/* ============================================================
   19. CONFETTI EFFECT
   ============================================================ */

function triggerConfetti() {

    const canvas =
        getElement("confetti-canvas");

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");

    if (!ctx) {
        return;
    }


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const pieces = [];

    const pieceCount = 100;


    for (let i = 0; i < pieceCount; i++) {

        pieces.push({

            x: Math.random() *
                canvas.width,

            y: -20 -
                Math.random() *
                canvas.height,

            size:
                5 +
                Math.random() * 8,

            speed:
                2 +
                Math.random() * 4,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                -5 +
                Math.random() * 10,

            opacity: 1

        });

    }


    let frameCount = 0;


    function animateConfetti() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        let activePieces = 0;


        pieces.forEach(piece => {

            piece.y += piece.speed;

            piece.rotation +=
                piece.rotationSpeed;

            piece.opacity -= 0.006;


            if (
                piece.y <
                    canvas.height &&
                piece.opacity > 0
            ) {

                activePieces++;


                ctx.save();

                ctx.globalAlpha =
                    piece.opacity;

                ctx.translate(
                    piece.x,
                    piece.y
                );

                ctx.rotate(
                    piece.rotation *
                    Math.PI / 180
                );


                ctx.fillStyle =
                    `hsl(${(frameCount * 7 + piece.x) % 360}, 80%, 60%)`;


                ctx.fillRect(
                    -piece.size / 2,
                    -piece.size / 2,
                    piece.size,
                    piece.size
                );


                ctx.restore();

            }

        });


        frameCount++;


        if (activePieces > 0) {

            requestAnimationFrame(
                animateConfetti
            );

        } else {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }

    }


    animateConfetti();
}


/* ============================================================
   20. ESCAPE KEY
   ============================================================ */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                const activeModal =
                    document.querySelector(
                        ".modal-overlay.active"
                    );


                if (
                    activeModal &&
                    activeModal.id !==
                        "master-quiz-modal"
                ) {

                    closeModal(
                        activeModal.id
                    );

                }

            }

        }
    );
}


/* ============================================================
   21. WINDOW RESIZE
   ============================================================ */

window.addEventListener(
    "resize",
    () => {

        const canvas =
            getElement("confetti-canvas");

        if (canvas) {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

        }

    }
);


/* ============================================================
   22. INITIALIZE APPLICATION
   ============================================================ */

function initializeEduNexa() {

    console.log(
        "🚀 EduNexa AI Grade 4 initializing..."
    );


    loadAppData();


    setupModalEvents();

    setupMobileNavigation();

    setupSmoothNavigation();

    setupHeaderScroll();

    setupSearch();

    setupStreakButton();

    setupDailyPlan();

    setupStudyTimer();

    setupAudioToggle();

    setupKeyboardShortcuts();


    updateDashboard();


    console.log(
        "✅ EduNexa AI Grade 4 ready!"
    );

}


/* ============================================================
   23. DOM READY
   ============================================================ */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeEduNexa
    );

} else {

    initializeEduNexa();

}


/* ============================================================
   24. GLOBAL FUNCTIONS
   ------------------------------------------------------------
   These are intentionally attached to window because your HTML
   uses inline onclick="..." attributes.
   ============================================================ */

window.EduNexaApp = EduNexaApp;

window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;

window.showToast = showToast;

window.addStars = addStars;

window.checkDailyStreak = checkDailyStreak;

window.speakText = speakText;
window.stopSpeech = stopSpeech;

window.triggerConfetti = triggerConfetti;


/* ============================================================
   25. PLACEHOLDER FUNCTIONS
   ------------------------------------------------------------
   These functions are used by the HTML now but their complete
   implementations will be added in later parts of grade4.js.
   ============================================================ */

window.openSubjectCurriculum =
    function(subject) {

        console.log(
            "Subject curriculum requested:",
            subject
        );

        showToast(
            "📚 Curriculum module will open here.",
            "info"
        );

    };


window.openPracticeModal =
    function(subject) {

        console.log(
            "Practice requested:",
            subject
        );

        const section =
            getElement("practice-section");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    };


window.launchGame =
    function(gameId) {

        console.log(
            "Game requested:",
            gameId
        );

        showToast(
            "🎮 Game Center will open here.",
            "info"
        );

    };


window.openStoryModal =
    function(storyId) {

        console.log(
            "Story requested:",
            storyId
        );

        showToast(
            "📖 Reading Corner will open here.",
            "info"
        );

    };


window.generatePracticeSession =
    function() {

        showToast(
            "🧠 Practice generator will be loaded in the next part.",
            "info"
        );

    };


window.startMasterQuiz =
    function() {

        showToast(
            "🏆 Master Quiz will be loaded in the quiz module.",
            "info"
        );

    };


window.confirmQuitQuiz =
    function() {

        const confirmed =
            window.confirm(
                "Are you sure you want to leave the Master Quiz?"
            );

        if (confirmed) {
            closeModal("master-quiz-modal");
        }

    };


window.openParentModal =
    function() {

        openModal("parent-modal");

    };


window.closeGameModal =
    function() {

        closeModal("game-modal");

    };


window.closeStoryModal =
    function() {

        stopSpeech();

        closeModal("story-modal");

    };


window.toggleStorySpeech =
    function() {

        showToast(
            "🔊 Story speech will be connected in the Reading Corner module.",
            "info"
        );

    };


window.prevMasterQuizQ =
    function() {

        console.log(
            "Previous quiz question"
        );

    };


window.nextMasterQuizQ =
    function() {

        console.log(
            "Next quiz question"
        );

    };


window.toggleFlagMasterQuizQ =
    function() {

        console.log(
            "Flag quiz question"
        );

    };


window.submitMasterQuiz =
    function() {

        showToast(
            "🏆 Quiz submission will be handled by the Master Quiz module.",
            "info"
        );

    };
