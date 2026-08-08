/**
 * NOVIX - Contact Page Script (contact.js)
 * Manages FAQ accordions, form validation & submission, scroll-to-top button,
 * and Intersection Observer animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize components
    initFaqAccordion();
    initContactFormValidation();
    initScrollToTop();
    initScrollReveal();
});

/* ==========================================================================
   1. FAQ ACCORDION HANDLER
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const headerBtn = item.querySelector(".faq-header");

        if (!headerBtn) return;

        headerBtn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all other accordion items for clean UX
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                const otherBtn = otherItem.querySelector(".faq-header");
                if (otherBtn) {
                    otherBtn.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add("active");
                headerBtn.setAttribute("aria-expanded", "true");
            }
        });
    });
}

/* ==========================================================================
   2. CONTACT FORM CLIENT-SIDE VALIDATION & SUBMISSION
   ========================================================================== */
function initContactFormValidation() {
    const form = document.getElementById("contactForm");
    const successBanner = document.getElementById("formSuccessMessage");
    const submitBtn = document.getElementById("submitBtn");

    if (!form) return;

    // Field references
    const fields = {
        fullName: {
            input: document.getElementById("fullName"),
            group: document.getElementById("fullName")?.closest(".form-group"),
            validate: (val) => val.trim().length >= 2
        },
        email: {
            input: document.getElementById("email"),
            group: document.getElementById("email")?.closest(".form-group"),
            validate: (val) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val.trim());
            }
        },
        subject: {
            input: document.getElementById("subject"),
            group: document.getElementById("subject")?.closest(".form-group"),
            validate: (val) => val.trim().length >= 3
        },
        message: {
            input: document.getElementById("message"),
            group: document.getElementById("message")?.closest(".form-group"),
            validate: (val) => val.trim().length >= 10
        }
    };

    // Remove error class on typing
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field.input) {
            field.input.addEventListener("input", () => {
                if (field.group) {
                    field.group.classList.remove("has-error");
                }
            });
        }
    });

    // Form submission handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate each field
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (field.input && field.group) {
                const value = field.input.value;
                if (!field.validate(value)) {
                    field.group.classList.add("has-error");
                    isValid = false;
                } else {
                    field.group.classList.remove("has-error");
                }
            }
        });

        // If form is valid, simulate submission
        if (isValid) {
            // Disable button briefly for submission feel
            if (submitBtn) {
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector(".btn-text");
                if (btnText) btnText.textContent = "Sending...";
            }

            setTimeout(() => {
                // Reset form inputs
                form.reset();

                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector(".btn-text");
                    if (btnText) btnText.textContent = "Send Message";
                }

                // Show success banner smoothly
                if (successBanner) {
                    successBanner.classList.remove("hidden");
                    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }, 600);
        }
    });
}

/* ==========================================================================
   3. SCROLL-TO-TOP BUTTON
   ========================================================================== */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   4. INTERSECTION OBSERVER SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("revealed"));
    }
}
