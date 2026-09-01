import { auth } from "./firebase.js";
import { redirectIfAuthenticated, requestPasswordReset } from "./auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const form = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = form?.querySelector('[type="submit"]');
const feedback = document.getElementById("authFeedback");

function showFeedback(message, type = "error") {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.className = `auth-feedback ${type}`;
}

function errorMessage(error) {
  return ({
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please wait before trying again.",
    "auth/network-request-failed": "We could not reach the authentication service. Check your connection and try again.",
  })[error.code] || "We could not sign you in. Please try again.";
}

document.addEventListener("DOMContentLoaded", async () => {
  await redirectIfAuthenticated("dashboard.html");
  document.querySelector(".password-toggle-btn")?.addEventListener("click", () => {
    const reveal = passwordInput.type === "password";
    passwordInput.type = reveal ? "text" : "password";
    document.querySelector(".password-toggle-icon")?.classList.toggle("fa-eye-slash", reveal);
    document.querySelector(".password-toggle-icon")?.classList.toggle("fa-eye", !reveal);
  });
  document.querySelector(".forgot-link")?.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!emailInput.value.trim()) return showFeedback("Enter your email address first, then select Forgot Password.");
    try {
      await requestPasswordReset(emailInput.value);
      showFeedback("If an account exists for that address, a password-reset email has been sent.", "success");
    } catch (error) {
      showFeedback(error.code === "auth/invalid-email" ? "Enter a valid email address." : "Password reset is unavailable right now. Please try again.");
    }
  });
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) return showFeedback("Enter your email address and password.");
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    showFeedback("Signing you in…", "info");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.replace(next && /^[\w-]+\.html(?:\?.*)?$/.test(next) ? next : "dashboard.html");
    } catch (error) {
      showFeedback(errorMessage(error));
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  });
});
