// 1. imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

// 2. app setup
const app = express();
app.use(cors());
app.use(express.json());


// PART 3 FUNCTIONS

function analyzePatterns(entry, emotion) {
  const patterns = {
    workStress: ["work", "boss", "deadline"],
    isolation: ["alone", "lonely", "no one"],
    legalStress: ["court", "case", "lawyer", "hearing"],
  };

  let detected = [];

  for (let key in patterns) {
    for (let word of patterns[key]) {
      if (entry.toLowerCase().includes(word)) {
        detected.push(key);
        break;
      }
    }
  }

  return detected;
}

function getKnowledgeSupport(patterns) {
  let support = "";

  if (patterns.includes("legalStress")) {
    support +=
      " Legal processes can feel overwhelming, but focusing on small controllable steps can help.";
  }

  if (patterns.includes("isolation")) {
    support +=
      " Feeling isolated is common — reaching out to someone you trust may help.";
  }

  if (patterns.includes("workStress")) {
    support +=
      " Try breaking tasks into smaller steps to reduce pressure.";
  }

  return support;
}


// 4. API route
app.post("/api/journal", async (req, res) => {
  const { emotion, entry } = req.body;

  try {
    // PART 3 LOGIC USED HERE
    const patterns = analyzePatterns(entry, emotion);
    const supportText = getKnowledgeSupport(patterns);

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
              "You are a supportive journaling assistant. Be calm and helpful.",
          },
          {
            role: "user",
            content: `Emotion: ${emotion}\nEntry: ${entry}`,
          },
        ],
      }),
    });

    const data = await response.json();

    const aiInsight =
      data.choices?.[0]?.message?.content || "No response from AI";

    const finalInsight = aiInsight + supportText;

    res.json({ insight: finalInsight });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});


// 5. start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
