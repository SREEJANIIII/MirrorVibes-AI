const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generatePlaylist = async (req, res) => {
    console.log("🔥 PLAYLIST CONTROLLER HIT");
  console.log(req.body);
  try {

    const {
      journal,
      emotion,
      subEmotion,
      energy,
      listenerIntent,
      favoriteArtists,
    } = req.body;

    const prompt = `
You are Mirror, an expert music curator inside the MirrorVibes application.

Your task is to create a deeply personalized playlist based on the user's emotional analysis.

The emotional analysis has ALREADY been completed.

Do NOT change or reinterpret it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User Journal

${journal}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detected Emotion

Emotion: ${emotion}

Sub Emotion: ${subEmotion}

Energy: ${energy}

Listener Intent: ${listenerIntent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Favorite Artists

${favoriteArtists?.length
? favoriteArtists.join(", ")
: "No favorite artists specified."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your Job

Create a playlist that feels intentionally handcrafted.

The playlist should feel like something a close friend would spend an hour making.

Never recommend songs simply because they are popular.

Every recommendation should emotionally fit.

Consider ALL of the following:

• Lyrics
• Musical energy
• Tempo
• Instrumentation
• Production
• Storytelling
• Vocal delivery
• Emotional atmosphere

The emotional consistency of the playlist is more important than popularity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Favorite Artists

If favorite artists are provided:

• Prioritize them whenever their songs naturally fit the emotional journey.

• Around 50–70% of the playlist should come from favorite artists whenever possible.

• Never force a song simply because it belongs to a favorite artist.

• Emotional fit is ALWAYS more important.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Playlist Journey

Create a playlist that evolves naturally.

Think in emotional chapters.

For example:

Beginning

Acceptance

Healing

Celebrate

Dream Bigger

Reflection

Freedom

Calm

Hope

The phases depend entirely on the detected emotion.

Do NOT force the same structure every time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Song Selection

Generate 15–20 REAL songs.

Never invent songs.

Never recommend duplicate songs.

Avoid more than THREE consecutive songs from the same artist.

Mix artists naturally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Song Explanation

For every song write ONE concise sentence explaining why it belongs in the playlist.

Avoid generic explanations.

Make every explanation unique.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reflection

Write a thoughtful reflection (2–3 sentences).

It should help the user understand what they're feeling.

Never sound robotic.

Never sound like therapy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comfort

Write a warm, supportive message.

Keep it genuine.

Avoid clichés.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY valid JSON.

{
  "reflection": "",

  "comfort": "",

  "playlistTitle": "",

  "playlistDescription": "",

  "playlistTheme": "",

  "playlistFlow": [
    {
      "phase": "",
      "purpose": ""
    }
  ],

  "songs": [
    {
      "title": "",
      "artist": "",
      "reason": ""
    }
  ]
}
`;
const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: prompt,
});

const result = response.text;

const clean = result
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
console.log("Gemini Playlist Response:");
console.log(clean);
const playlist = JSON.parse(clean);

return res.status(200).json(playlist);


  } catch (err) {

    console.error(err);
if (err.status === 503) {
  return res.status(503).json({
    message:
      "Mirror is a little busy right now. Please try again in a few moments."
  });
}
    return res.status(500).json({
      message: "Playlist generation failed.",
    });

  }
};


module.exports = {
  generatePlaylist,
};