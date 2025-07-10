import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6sDz8YWl1RIkLS-fYeQruNkY9HBjpq9o",
  authDomain: "mentalhealthapp-77250.firebaseapp.com",
  projectId: "mentalhealthapp-77250",
  storageBucket: "mentalhealthapp-77250.appspot.com",
  messagingSenderId: "316795280840",
  appId: "1:316795280840:web:bb7b5d0355a907f462b4fd"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const extraFields = document.getElementById("extraFields");
const errorText = document.getElementById("errorText");
const toggleMode = document.getElementById("toggleMode");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");

let isSignup = false; // mode toggle

// Toggle between login/signup
toggleMode.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;

  extraFields.style.display = isSignup ? "block" : "none";
  formTitle.textContent = isSignup ? "Sign Up" : "Login";
  toggleText.textContent = isSignup ? "Already have an account?" : "Don't have an account?";
  toggleMode.textContent = isSignup ? "Login here" : "Sign up here";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const name = nameInput.value.trim();
  const age = ageInput.value;

  if (isSignup) {
    // Sign up
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name
        });
      })
      .then(() => {
        alert("Account created and logged in!");
        window.location.assign ( "index.html");
      })
      .catch((err) => {
        errorText.innerText = err.message;
      });
  } else {
    // Login
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        errorText.innerText = error.message;
      });
  }
});
