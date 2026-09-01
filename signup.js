import { auth, db } from "./firebase.js";
import { redirectIfAuthenticated } from "./auth.js";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const form = document.getElementById("signupForm");
const message = document.getElementById("signupMessage");
const submit = document.getElementById("signupBtn");
const show = (text, type = "error") => { message.textContent = text; message.className = `auth-feedback ${type}`; };
const passwordIssue = (password) => password.length < 10 ? "Use at least 10 characters for your password." : (!/[a-z]/i.test(password) || !/\d/.test(password) ? "Use a mix of letters and numbers in your password." : "");

document.addEventListener("DOMContentLoaded", async () => {
  await redirectIfAuthenticated("dashboard.html");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (name.length < 2) return show("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return show("Enter a valid email address.");
    const issue = passwordIssue(password);
    if (issue) return show(issue);
    if (password !== confirmPassword) return show("Passwords do not match.");
    submit.disabled = true;
    show("Creating your account…", "info");
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await setDoc(doc(db, "users", credential.user.uid), { uid: credential.user.uid, name, email, role: "student", plan: "free", createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
      await sendEmailVerification(credential.user);
      show("Account created. Check your email to verify it, then sign in.", "success");
      await auth.signOut();
      setTimeout(() => window.location.replace("login.html"), 1800);
    } catch (error) {
      show(({ "auth/email-already-in-use": "An account already exists for this email address.", "auth/invalid-email": "Enter a valid email address.", "auth/weak-password": "Choose a stronger password.", "auth/network-request-failed": "We could not reach the authentication service. Check your connection and try again." })[error.code] || "We could not create your account. Please try again.");
      submit.disabled = false;
    }
  });
});
