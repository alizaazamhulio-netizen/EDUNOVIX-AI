/**
 * NOVIX - Login Page
 * Real Firebase Authentication
 */

import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    reload
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const passwordToggleBtn =
        document.querySelector(".password-toggle-btn");

    const passwordToggleIcon =
        document.querySelector(".password-toggle-icon");


    // ==============================
    // PASSWORD SHOW / HIDE
    // ==============================

    if (passwordToggleBtn && passwordInput && passwordToggleIcon) {

        passwordToggleBtn.addEventListener("click", () => {

            const isPassword =
                passwordInput.getAttribute("type") === "password";

            passwordInput.setAttribute(
                "type",
                isPassword ? "text" : "password"
            );

            passwordToggleIcon.classList.toggle(
                "fa-eye",
                !isPassword
            );

            passwordToggleIcon.classList.toggle(
                "fa-eye-slash",
                isPassword
            );
        });
    }


    // ==============================
    // REAL FIREBASE LOGIN
    // ==============================

    if (loginForm) {

        loginForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;


            if (!email || !password) {

                alert("Please enter your email and password.");

                return;
            }


            try {

                // Real Firebase login
                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                const user = userCredential.user;

await reload(user);

// Email verification check
if (!user.emailVerified) {

                    const resend = confirm(
                        "Your email is not verified yet.\n\n" +
                        "Would you like Firebase to send the verification email again?"
                    );

                    if (resend) {

                        try {

                            await sendEmailVerification(user);

                            alert(
                                "Verification email sent again.\n\n" +
                                "Please check your inbox and Spam folder."
                            );

                        } catch (verificationError) {

                            console.error(
                                "Verification email error:",
                                verificationError
                            );

                            alert(
                                "Could not send the verification email right now. " +
                                "Please try again later."
                            );
                        }
                    }

                    await signOut(auth);

                    return;
                }


                // ==============================
                // SAVE USER PROFILE
                // ==============================

                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        email: user.email,
                        plan: "free",
                        createdAt: serverTimestamp()
                    },
                    {
                        merge: true
                    }
                );


                // ==============================
                // LOGIN SUCCESS
                // ==============================

                localStorage.setItem("loggedIn", "true");

                localStorage.setItem(
                    "studyMateUser",
                    JSON.stringify({
                        uid: user.uid,
                        email: user.email
                    })
                );


                // Go to homepage
                window.location.href = "index.html";


            } catch (error) {

                console.error(
                    "Firebase Login Error:",
                    error
                );


                let message =
                    "Login failed. Please check your email and password.";


                if (error.code === "auth/invalid-credential") {

                    message =
                        "Email or password is incorrect.";

                } else if (error.code === "auth/user-not-found") {

                    message =
                        "No account exists with this email.";

                } else if (error.code === "auth/wrong-password") {

                    message =
                        "The password is incorrect.";

                } else if (error.code === "auth/invalid-email") {

                    message =
                        "Please enter a valid email address.";

                } else if (error.code === "auth/too-many-requests") {

                    message =
                        "Too many login attempts. Please try again later.";

                } else if (error.code === "auth/network-request-failed") {

                    message =
                        "Network error. Please check your internet connection.";

                } else if (
                    error.code === "auth/email-not-verified"
                ) {

                    message =
                        "Please verify your email before logging in.";
                }


                alert(message);
            }
        });
    }
});