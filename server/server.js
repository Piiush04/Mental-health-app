import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CohereClient } from "cohere-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// POST route
app.post("/api/mental-tip", async (req, res) => {
  try {

    const { scores } = req.body;

    // Validate request
    if (!scores) {
      return res.status(400).json({ error: "Scores are required" });
    }

    const message = `
A user filled out a mental health self-check with these scores (scale 0-3):

Mood: ${scores.mood}
Stress: ${scores.stress}
Sleep: ${scores.sleep}
Focus: ${scores.focus}
Self Perception: ${scores.selfPerception}
Social Connection: ${scores.socialConnection}
Functionality: ${scores.functionality}

Give one helpful, kind, and practical mental health tip in 1–2 sentences that is suitable for a non-clinical user.
`;

    const response = await cohere.chat({
      model: "command-r",
      message: message,
      temperature: 0.7,
      maxTokens: 150,
    });

    const tip = response.text.trim();

    res.json({ tip });

  } catch (err) {
    console.error("Cohere API error:", err);
    res.status(500).json({ error: "Failed to generate tip" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});