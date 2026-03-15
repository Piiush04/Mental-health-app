import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyC6sDz8YWl1RIkLS-fYeQruNkY9HBjpq9o",
  authDomain: "mentalhealthapp-77250.firebaseapp.com",
  projectId: "mentalhealthapp-77250",
  storageBucket: "mentalhealthapp-77250.appspot.com",
  messagingSenderId: "316795280840",
  appId: "1:316795280840:web:bb7b5d0355a907f462b4fd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userEmail = user.email;

    // 🔍 Fetch user's past scores
    const q = query(collection(db, "mentalHealthScores"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);

    const scoresList = [];
    querySnapshot.forEach((doc) => {
      scoresList.push(doc.data());
    });

    const latest = scoresList[scoresList.length - 1]; // Most recent

    if (latest) {
      // ✅ Send to Cohere API backend
      const response = await fetch("https://mental-health-app-g87x.onrender.com/api/mental-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores: latest.scores })
      });

      const data = await response.json();
      
      const formattedTip = data.tip.replace(/\n/g, "<br>");

      document.getElementById("tipText").innerHTML = formattedTip;

      // 🧠 Show chart
      renderChart(scoresList);
    } else {
      document.getElementById("tipText").innerText = "No data found. Please complete a self-check first.";
    }
  } else {
    document.getElementById("tipText").innerText = "Please login to see your tips.";
  }
});

function renderChart(data) {
  const labels = [];
  const averageScores = [];

  data.forEach(entry => {
    const scores = entry.scores || {};

    // Extract all 7 score values
    const values = [
      scores.mood,
      scores.stress,
      scores.sleep,
      scores.focus,
      scores.selfPerception,
      scores.socialConnection,
      scores.functionality
    ];

    // Filter out undefined/nulls and calculate average
    const validScores = values.filter(v => typeof v === "number");
    const avg = validScores.length
      ? validScores.reduce((a, b) => a + b, 0) / validScores.length
      : 0;

    labels.push(entry.date || "Day");
    averageScores.push(parseFloat(avg.toFixed(2))); // keep to 2 decimals
  });

  const ctx = document.getElementById("historyChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Average Mental Health Score (0–3)",
          data: averageScores,
          borderColor: "green",
          backgroundColor: "rgba(0, 128, 0, 0.1)",
          fill: true,
          tension: 0.2
        }
      ]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 3,
          title: {
            display: true,
            text: "Average Score"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Mental Health Score Trend"
        }
      }
    }
  });
}

