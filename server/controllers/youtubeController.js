const { google } = require("googleapis");

const {
  createPlaylist,
  searchVideo,
  addVideoToPlaylist,
} = require("../services/youtubeService");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
];

const googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  res.redirect(url);
};

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code missing.");
    }

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    req.session.tokens = tokens;

req.session.save((err) => {
  if (err) {
    console.error("Session Save Error:", err);
    return res.status(500).send("Failed to save session.");
  }

  console.log("Session saved successfully!");
  console.log("Session ID:", req.sessionID);

  return res.redirect("http://localhost:5173");
});
    console.log("✅ Google Login Successful");
    console.log("Session Saved:", !!req.session.tokens);

    return res.redirect("http://localhost:5173");

  } catch (err) {
    console.error("Google Callback Error:", err);

    return res.status(500).send("Google Login Failed");
  }
};
const createYoutubePlaylist = async (req, res) => {
  try {
    console.log("STEP 1");
    console.log("Session object:", req.session);

const tokens = req.session?.tokens;

console.log("Tokens:", tokens);
console.log("STEP 2");

    if (!tokens) {
      return res.status(401).json({
        message: "Please login with Google first.",
      });
    }

    const {
      playlistTitle,
      playlistDescription,
    } = req.body;
console.log("STEP 2");
    const { playlistId } = await createPlaylist(
      tokens,
      playlistTitle,
      playlistDescription
    );
 console.log("STEP 3", playlistId);
    return res.json({
      playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
    });
   

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  googleLogin,
  googleCallback,
    createYoutubePlaylist,
};