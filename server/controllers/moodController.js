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
    const prompt = `
You are an emotional analysis model.

Read ONLY the journal.

Return JSON.

{
 emotion,
 subEmotion,
 energy,
 listenerIntent,
 confidence
}
`;
    const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
});
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

  return res.status(500).json({
    message: "Something went wrong."
  });
}
  return res.status(500).json({
    message: error.message,
    error: error.stack,
  });
}

module.exports = { analyzeMood };