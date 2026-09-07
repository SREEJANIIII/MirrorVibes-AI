const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeMood = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Please write something first.",
      });
    }
console.log("Journal:", text);
    const prompt =`You are an emotional analysis model.

Your ONLY task is to analyze the user's journal.

The journal is the ONLY source of truth.

Do NOT let examples, assumptions or stereotypes influence your decision.

Never default to sadness, heartbreak or nostalgia.

Determine:

- emotion
- subEmotion
- energy (Low, Medium or High)
- listenerIntent

Possible listenerIntent values include:
Celebrate, Heal, Cry, Reflect, Relax, Calm Down, Feel Understood, Stay Motivated, Move On, Focus, Recharge.

Journal:
"""
${text}
"""

Return ONLY valid JSON.

{
  "emotion": "",
  "subEmotion": "",
  "energy": "",
  "listenerIntent": ""
}
`;
const generateWithRetry = async (prompt) => {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.4-flash",
        contents: prompt,
      });
    } catch (err) {
      if (err.status === 503 && attempt < maxRetries) {
        const delay = attempt * 5000;

        console.log(
          `Gemini temporarily unavailable. Retrying in ${delay / 1000}s...`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
};
   const response = await generateWithRetry(prompt);
const result = response.text;
const clean = result
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  const moodData = JSON.parse(clean);
  return res.status(200).json(moodData);
  } catch (err) {
  if (err.status === 429) {
    return res.status(429).json({
      message: "MirrorVibes is temporarily busy. Please try again in a minute."
    });
  }

  console.error(err);
if (err.status === 503) {
  return res.status(503).json({
    message:
      "Mirror is a little busy right now. Please try again in a few moments."
  });
}
  return res.status(500).json({
    message: "Something went wrong."
  });
}
}


module.exports = { analyzeMood };
