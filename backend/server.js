import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/journal", async (req, res) => {
  const { emotion, entry } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a supportive journaling assistant that gives calm, practical advice.",
          },
          {
            role: "user",
            content: `Emotion: ${emotion}\nEntry: ${entry}`,
          },
        ],
      }),
    });

    const data = await response.json();

    const insight =
      data.choices?.[0]?.message?.content || "No response from AI";

    res.json({ insight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
