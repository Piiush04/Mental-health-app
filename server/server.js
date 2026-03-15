import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CohereClient } from "cohere-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// ✅ POST route
app.post("/api/mental-tip", async (req, res) => {
  const { scores } = req.body;

  const prompt = `
A user filled out a mental health self-check with these scores (scale 0-3):
${JSON.stringify(scores)}

Give one helpful, kind, and practical tip in 1–2 sentences that is suitable for a non-clinical user.
`;

  try {
    const response = await cohere.chat({
      model: "command-r",
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 150,
    });

    const tip = response.text.trim();
    res.json({ tip });
  } catch (err) {
    console.error("Cohere API error:", err);
    res.status(500).send("Failed to generate tip");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
