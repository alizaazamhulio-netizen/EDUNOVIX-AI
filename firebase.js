import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1GZXzDnCnFtoovRTDYc0WETe-2QsOehA",
  authDomain: "novix-9d5ec.firebaseapp.com",
  projectId: "novix-9d5ec",
  storageBucket: "novix-9d5ec.firebasestorage.app",
  messagingSenderId: "277875137556",
  appId: "1:277875137556:web:4407a52f5a4fc605295b01"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);