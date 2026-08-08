import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const signupMessage = document.getElementById("signupMessage");

        if (!name || !email || !password || !confirmPassword) {
            signupMessage.textContent = "❌ Please fill in all fields.";
            return;
        }

        if (password !== confirmPassword) {
            signupMessage.textContent = "❌ Passwords do not match.";
            return;
        }

        try {

            // Create Firebase Authentication account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // Create user profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                role: "student",
                plan: "free",
                xp: 0,
                level: 1,
                streak: 0,
                createdAt: serverTimestamp(),
                emailVerified: false
            });

            // Send verification email
            await sendEmailVerification(user);

            signupMessage.textContent =
                "✅ Account created! Please verify your email before signing in.";

            // Go to login page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } catch (error) {

            console.error("Signup error:", error);

            if (error.code === "auth/email-already-in-use") {
                signupMessage.textContent =
                    "❌ This email is already registered.";
            } else if (error.code === "auth/weak-password") {
                signupMessage.textContent =
                    "❌ Password must be at least 6 characters.";
            } else if (error.code === "auth/invalid-email") {
                signupMessage.textContent =
                    "❌ Please enter a valid email address.";
            } else {
                signupMessage.textContent =
                    "❌ Signup failed: " + error.message;
            }
        }
    });
}