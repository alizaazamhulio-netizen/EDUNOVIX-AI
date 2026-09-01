import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const LEGACY_KEYS = ["loggedIn", "studyMateUser", "studymate_user", "currentUser", "isLoggedIn"];

export function waitForAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export function userLabel(user) {
  return user?.displayName?.trim() || user?.email?.split("@")[0] || "Student";
}

export async function requireAuth() {
  const user = await waitForAuthState();
  if (!user) {
    const next = `${window.location.pathname.split("/").pop() || "dashboard.html"}${window.location.search}`;
    window.location.replace(`login.html?next=${encodeURIComponent(next)}`);
    return null;
  }
  document.documentElement.classList.add("auth-ready");
  return user;
}

export async function redirectIfAuthenticated(defaultPath = "dashboard.html") {
  const user = await waitForAuthState();
  if (user) window.location.replace(defaultPath);
  return user;
}

export async function logout() {
  await signOut(auth);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  sessionStorage.clear();
  window.location.replace("login.html");
}

export async function setDisplayName(name) {
  if (!auth.currentUser) throw new Error("Your session has expired. Please sign in again.");
  await updateProfile(auth.currentUser, { displayName: name.trim() });
}

export async function requestPasswordReset(email) {
  await sendPasswordResetEmail(auth, email.trim());
}

export async function getAuthorizationHeader() {
  const user = auth.currentUser;
  if (!user) return {};
  return { Authorization: `Bearer ${await user.getIdToken()}` };
}

// Classic scripts (such as the existing AI workspace) can request an ID token
// without storing a token or password in browser storage.
window.EduNexaAuth = { getAuthorizationHeader, logout };
