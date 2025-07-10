const quotes = [
  "Believe you can and you're halfway there.",
  "Your present circumstances don't determine your future.",
  "Small steps every day add up to big progress.",
  "You're doing better than you think.",
  "Progress, not perfection.",
  "You don't have to be positive all the time. It's perfectly okay to feel sad, anxious, or overwhelmed","One small positive thought in the morning can change your whole day."
];

// Pick one quote per day (stable until tomorrow)
const today = new Date().getDate(); // simple daily rotation
const quoteIndex = Math.floor(Math.random() * quotes.length);

document.getElementById("dailyQuote").textContent = quotes[quoteIndex];