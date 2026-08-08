import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            const userEmail = document.getElementById("userEmail");
            const userName = document.getElementById("userName");
            const userGreeting = document.getElementById("userGreeting");

            if (userEmail) {
                userEmail.textContent = data.email;
            }

            if (userName) {
                userName.textContent = data.email.split("@")[0];
            }

            if (userGreeting) {
                const hour = new Date().getHours();

                let message = "Good Evening";

                if (hour < 12) {
                    message = "Good Morning";
                } else if (hour < 18) {
                    message = "Good Afternoon";
                }

                userGreeting.textContent = `${message}, ${data.email.split("@")[0]}`;
            }
        }
    } else {
        window.location.href = "login.html";
    }
});
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const backdrop = document.querySelector(".page-backdrop");
    const themeToggle = document.getElementById("themeToggle");
    const currentDate = document.getElementById("currentDate");
    const notificationButton = document.getElementById("notificationButton");
    const notificationBadge = document.getElementById("notificationBadge");
    const searchInput = document.getElementById("dashboardSearch");
    const searchSubmit = document.getElementById("searchSubmit");
    const searchFeedback = document.getElementById("searchFeedback");
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarTitle = document.getElementById("calendarTitle");
    const calendarSubtitle = document.getElementById("calendarSubtitle");
    const assistantInput = document.getElementById("assistantInput");
    const generateButton = document.getElementById("generateButton");
    const assistantOutput = document.getElementById("assistantOutput");

    const themeKey = "studymate-theme";
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === "light") {
        body.dataset.theme = "light";
    }

    const updateThemeButton = () => {
        const isLight = body.dataset.theme === "light";
        themeToggle.innerHTML = `<i class="${isLight ? "fa-solid fa-sun" : "fa-regular fa-moon"}"></i>`;
        themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    };

    const formatDate = () => {
        const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(new Date());
    };

    currentDate.textContent = formatDate();
    updateThemeButton();

    const closeSidebar = () => body.classList.remove("sidebar-open");
    const toggleSidebar = () => body.classList.toggle("sidebar-open");

    sidebarToggle.addEventListener("click", toggleSidebar);
    backdrop.addEventListener("click", closeSidebar);

    sidebar.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                closeSidebar();
            }
        });
    });

    themeToggle.addEventListener("click", () => {
        body.dataset.theme = body.dataset.theme === "light" ? "dark" : "light";
        localStorage.setItem(themeKey, body.dataset.theme);
        updateThemeButton();
    });

    notificationButton.addEventListener("click", () => {
        notificationBadge.textContent = "0";
        notificationBadge.style.display = "none";
        notificationButton.classList.add("pulse-highlight");
        window.setTimeout(() => notificationButton.classList.remove("pulse-highlight"), 1200);
    });

    const formatMonth = (date) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
    const buildCalendar = () => {
        const now = new Date();
        const yearValue = now.getFullYear();
        const monthValue = now.getMonth();
        const firstDay = new Date(yearValue, monthValue, 1);
        const lastDay = new Date(yearValue, monthValue + 1, 0);
        const startDay = (firstDay.getDay() + 6) % 7;
        const totalDays = lastDay.getDate();
        const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        calendarTitle.textContent = formatMonth(now);
        calendarSubtitle.textContent = `Live calendar for ${now.getFullYear()}`;
        calendarGrid.innerHTML = "";

        weekdays.forEach((day) => {
            const label = document.createElement("div");
            label.className = "calendar-weekday";
            label.textContent = day;
            calendarGrid.appendChild(label);
        });

        for (let index = 0; index < startDay; index += 1) {
            const empty = document.createElement("div");
            empty.className = "calendar-day empty";
            calendarGrid.appendChild(empty);
        }

        for (let day = 1; day <= totalDays; day += 1) {
            const cell = document.createElement("div");
            cell.className = "calendar-day";
            cell.textContent = String(day);
            if (day === now.getDate()) {
                cell.classList.add("today");
            }
            calendarGrid.appendChild(cell);
        }
    };

    buildCalendar();

    const animatedCounters = Array.from(document.querySelectorAll("[data-counter]"));
    const progressBars = Array.from(document.querySelectorAll(".progress-fill[data-fill]"));
    const rings = Array.from(document.querySelectorAll("[data-ring]"));
    const subjectMeters = Array.from(document.querySelectorAll(".subject-meter [data-fill]"));
    const revealables = Array.from(document.querySelectorAll(".reveal"));
    const allProgressRoots = Array.from(document.querySelectorAll(".stats-grid, .progress-layout, .subjects-grid, .assistant-panel, .timeline, .activity-list, .calendar-panel, .streak-panel, .section, .panel"));

    const animateCount = (element, target) => {
        const duration = 1300;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            element.textContent = String(value);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const animateRing = (element, target) => {
        const duration = 1400;
        const start = performance.now();
        const updateLabel = element.classList.contains("hero-ring") || element.classList.contains("ring");

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            element.style.setProperty("--progress", String(value));

            const inner = element.querySelector("strong");
            if (updateLabel && inner) {
                inner.textContent = `${Math.round(value)}%`;
            }

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const fillProgress = (root) => {
        root.querySelectorAll("[data-fill]").forEach((fill) => {
            fill.style.width = `${fill.dataset.fill}%`;
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const target = entry.target;

            if (target.classList.contains("reveal")) {
                target.classList.add("active");
            }

            if (target.dataset.counter && !target.dataset.counted) {
                target.dataset.counted = "true";
                animateCount(target, Number(target.dataset.counter));
            }

            if (target.dataset.ring && !target.dataset.ringAnimated) {
                target.dataset.ringAnimated = "true";
                animateRing(target, Number(target.dataset.ring));
            }

            if (target.classList.contains("stats-grid") || target.classList.contains("progress-layout") || target.classList.contains("subjects-grid") || target.classList.contains("assistant-panel") || target.classList.contains("timeline") || target.classList.contains("activity-list") || target.classList.contains("calendar-panel") || target.classList.contains("streak-panel") || target.classList.contains("section") || target.classList.contains("panel")) {
                fillProgress(target);
            }
        });
    }, { threshold: 0.22 });

    revealables.forEach((element) => observer.observe(element));
    allProgressRoots.forEach((element) => observer.observe(element));
    animatedCounters.forEach((element) => observer.observe(element));
    rings.forEach((element) => observer.observe(element));
    progressBars.forEach((element) => observer.observe(element));
    subjectMeters.forEach((element) => observer.observe(element));

    const focusSection = (selector) => {
        const element = document.querySelector(selector);
        if (!element) {
            return false;
        }

        element.classList.add("pulse-highlight");
        window.setTimeout(() => element.classList.remove("pulse-highlight"), 1200);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
    };

    const searchTargets = Array.from(document.querySelectorAll("[data-search]"));
    const exactMap = {
        dashboard: "#dashboard",
        subjects: "#subjects",
        subject: "#subjects",
        assistant: "#assistant",
        notes: "#assistant",
        quiz: "#assistant",
        planner: "#planner",
        progress: "#progress",
        activity: "#activity",
        calendar: "#calendarTitle",
        settings: "#settings"
    };

    const search = () => {
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            searchFeedback.textContent = "Search any section and press Enter.";
            return;
        }

        if (exactMap[query] && focusSection(exactMap[query])) {
            searchFeedback.textContent = `Jumped to ${query}.`;
            return;
        }

        const match = searchTargets.find((element) => {
            const text = `${element.dataset.search || ""} ${element.textContent || ""}`.toLowerCase();
            return text.includes(query);
        });

        if (match) {
            match.classList.add("pulse-highlight");
            window.setTimeout(() => match.classList.remove("pulse-highlight"), 1200);
            match.scrollIntoView({ behavior: "smooth", block: "start" });
            searchFeedback.textContent = `Found ${match.dataset.search || "a match"}.`;
        } else {
            searchFeedback.textContent = "No direct match found. Try a section or subject name.";
        }
    };

    searchSubmit.addEventListener("click", search);
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });

    document.querySelectorAll(".action-card").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.target;
            const label = button.dataset.action || "Quick action";
            if (target) {
                focusSection(target);
            }
            searchInput.value = label;
            searchFeedback.textContent = `${label} selected.`;
        });
    });

    const responses = {
        notes: "Here is a crisp revision note set: 1) define the topic, 2) list core formulas or ideas, 3) add one memory cue, 4) finish with a short recap.",
        quiz: "I can generate a 5-question quiz: start with one easy recall question, two concept checks, and two application questions.",
        summarize: "Summary mode: keep the main definition, 3 key points, and one exam-style example.",
        homework: "Homework support: identify what the question asks, isolate the known values, and solve step by step before checking the result.",
        default: "Ask for notes, quizzes, summaries, flashcards, or a plan for any chapter."
    };

    const appendAssistantMessage = (role, title, text) => {
        const message = document.createElement("div");
        message.className = `assistant-message ${role}`;
        message.innerHTML = `<strong>${title}</strong><p>${text}</p>`;
        assistantOutput.appendChild(message);
        assistantOutput.scrollTop = assistantOutput.scrollHeight;
    };

    generateButton.addEventListener("click", () => {
        const prompt = assistantInput.value.trim();
        const lowered = prompt.toLowerCase();
        appendAssistantMessage("user", "You", prompt || "Generate a study helper.");

        let response = responses.default;
        if (lowered.includes("quiz")) {
            response = responses.quiz;
        } else if (lowered.includes("note")) {
            response = responses.notes;
        } else if (lowered.includes("summary") || lowered.includes("summarize")) {
            response = responses.summarize;
        } else if (lowered.includes("homework")) {
            response = responses.homework;
        }

        window.setTimeout(() => {
            appendAssistantMessage("bot", "NOVIX", response);
        }, 350);

        assistantInput.value = "";
        focusSection("#assistant");
    });

    assistantInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            generateButton.click();
        }
    });

    const navLinks = document.querySelectorAll(".sidebar-link[data-scroll-link]");
    const sectionMap = new Map();
    navLinks.forEach((link) => sectionMap.set(link.dataset.scrollLink, link));

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const active = sectionMap.get(entry.target.id);
            if (!active) {
                return;
            }

            navLinks.forEach((link) => link.classList.remove("active"));
            active.classList.add("active");
        });
    }, { threshold: 0.35, rootMargin: "-20% 0px -45% 0px" });

    ["dashboard", "planner", "progress", "subjects", "assistant", "activity", "settings"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            navObserver.observe(element);
        }
    });

    if (window.matchMedia("(max-width: 1024px)").matches) {
        closeSidebar();
    }
});
