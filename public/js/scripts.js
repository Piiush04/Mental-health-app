window.myMenuFunction = function () {
  const menuBtn = document.getElementById("myNavMenu");
  menuBtn.classList.toggle("responsive");
};

// Scroll shadow
window.onscroll = function () {
  const navHeader = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
};

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6sDz8YWl1RIkLS-fYeQruNkY9HBjpq9o",
  authDomain: "mentalhealthapp-77250.firebaseapp.com",
  projectId: "mentalhealthapp-77250",
  storageBucket: "mentalhealthapp-77250.appspot.com",
  messagingSenderId: "316795280840",
  appId: "1:316795280840:web:bb7b5d0355a907f462b4fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Global logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.reload();
  }).catch((err) => {
    console.error("Logout failed:", err);
    alert("Logout failed. Check console.");
  });
};

// ✅ Auth state UI update
onAuthStateChanged(auth, (user) => {
  const userSection = document.getElementById("userSection");
  const loginBtn = document.getElementById("login");

  if (user && userSection) {
    const name = user.displayName || "User";
    userSection.innerHTML = `
      <span class="userName">${name}</span>
      <button class="btn" onclick="logout()">Logout</button>
    `;
    const resultHeading = document.getElementById("resultHeading");
    resultHeading.innerHTML=`Welcome, ${name}`;
  } else if (loginBtn) {
    loginBtn.style.display = "inline-block";
  }
});

// ✅ Form submission handler
const form = document.getElementById("mentalHealthForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const scores = {
        mood: Number(document.getElementById("mood").value),
        stress: Number(document.getElementById("stress").value),
        sleep: Number(document.getElementById("sleep").value),
        focus: Number(document.getElementById("focus").value),
        selfPerception: Number(document.getElementById("selfPerception").value),
        socialConnection: Number(document.getElementById("socialConnection").value),
        functionality: Number(document.getElementById("functionality").value)
      };

      const user = auth.currentUser;

      if (user) {
        console.log("Submitting scores:", scores);
        await addDoc(collection(db, "mentalHealthScores"), {
          email: user.email,
          date: new Date().toLocaleDateString(),
          scores
        });
        alert("✅ Scores submitted!");
        window.location.href = "result.html";
      } else {
        alert("⚠ Please log in to save your results and get personalized tips.");
      }
    } catch (err) {
      console.error("Firestore submission error:", err);
      alert("❌ Failed to submit data. Please try again.");
    }
  });
}

