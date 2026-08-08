document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-box");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value.trim();
            const password = document.querySelector('input[type="password"]').value.trim();

            if (email === "" || password === "") {
                alert("Please enter your email and password.");
                return;
            }

            // Demo login
            window.location.href = "index.html";
        });
    }

    const aiButtons = document.querySelectorAll(".ai-action");
    aiButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const aiSection = document.getElementById("ai-assistant");
            if (aiSection) {
                aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    const reveals = document.querySelectorAll(".reveal");
    const authButton = document.getElementById("authButton");
    const startFreeButton = document.getElementById("startFreeButton");

    const revealOnScroll = () => {
        reveals.forEach((r) => {
            const top = r.getBoundingClientRect().top;
            if (top < window.innerHeight - 90) {
                r.classList.add("active");
            }
        });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll, { passive: true });

    const loginKeys = [
        "studyMateAuth",
        "studyMateUser",
        "studyMateLoggedIn",
        "loggedIn",
        "isLoggedIn",
        "authState",
        "user",
        "loginState",
        "auth"
    ];

    const getStoredValue = (key) => {
        const localValue = localStorage.getItem(key);
        const sessionValue = sessionStorage.getItem(key);

        if (localValue) return localValue;
        if (sessionValue) return sessionValue;
        return null;
    };

    const isLoggedIn = () => {
        const values = loginKeys.map(getStoredValue).filter(Boolean);

        if (!values.length) return false;

        return values.some((value) => {
            const normalized = String(value).trim().toLowerCase();
            if (normalized === "true" || normalized === "1" || normalized === "yes") return true;

            try {
                const parsed = JSON.parse(value);
                if (parsed && typeof parsed === "object") {
                    return parsed.loggedIn === true || parsed.isLoggedIn === true || parsed.authenticated === true;
                }
            } catch (e) {
                // ignore parse errors
            }

            return false;
        });
    };

    const clearAuthState = () => {
        loginKeys.forEach((key) => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });

        sessionStorage.removeItem("studyMateRedirectAfterLogin");
        sessionStorage.removeItem("studyMateRedirectTarget");
    };

    const updateAuthUI = () => {
        if (!authButton) return;

        if (isLoggedIn()) {
            authButton.textContent = "Sign Out";
            authButton.classList.add("is-logged-in");
            authButton.href = "#";
            authButton.setAttribute("data-auth", "signout");
        } else {
            authButton.textContent = "Sign In";
            authButton.classList.remove("is-logged-in");
            authButton.href = "login.html";
            authButton.removeAttribute("data-auth");
        }
    };

    updateAuthUI();

    if (authButton) {
        authButton.addEventListener("click", (event) => {
            if (authButton.classList.contains("is-logged-in")) {
                event.preventDefault();
                clearAuthState();
                window.location.href = "login.html";
            }
        });
    }

    if (startFreeButton) {
        startFreeButton.addEventListener("click", (event) => {
            if (isLoggedIn()) {
                window.location.href = "dashboard.html";
                return;
            }

            event.preventDefault();
            sessionStorage.setItem("studyMateRedirectAfterLogin", "dashboard.html");
            window.location.href = "login.html";
        });
    }

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        document.querySelectorAll(".modal.open").forEach((m) => m.classList.remove("open"));
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove("open");
        if (!document.querySelector(".modal.open")) {
            document.body.style.overflow = "";
        }
    };

    const closeAllModals = () => {
        document.querySelectorAll(".modal.open").forEach((modal) => modal.classList.remove("open"));
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".modal-trigger").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const modalId = button.getAttribute("data-modal");
            if (modalId) openModal(modalId);
        });
    });

    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.querySelectorAll(".modal-close").forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });

    document.querySelectorAll("[data-action='continue-dashboard']").forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    });

    document.querySelectorAll("[data-action='signin']").forEach((button) => {
        button.addEventListener("click", () => {
            sessionStorage.setItem("studyMateRedirectAfterLogin", "dashboard.html");
        });
    });

    window.addEventListener("storage", updateAuthUI);
});
