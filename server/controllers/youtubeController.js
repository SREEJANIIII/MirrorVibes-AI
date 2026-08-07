const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  createPlaylist,
  searchVideo,
  addVideoToPlaylist,
} = require("../services/youtubeService");


// ==========================================
// GOOGLE OAUTH CLIENT
// ==========================================

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);


const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
];


// ==========================================
// GOOGLE LOGIN
// ==========================================

const googleLogin = async (req, res) => {

  try {

    const token = req.query.token;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }


    // Verify MirrorVibes JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Create Google authorization URL
    const url = oauth2Client.generateAuthUrl({

      access_type: "offline",

      prompt: "consent",

      scope: SCOPES,

      // Remember which MirrorVibes user
      // started Google OAuth
      state: decoded.id,

    });


    return res.redirect(url);


  } catch (err) {

    console.error("Google Login Error:", err);

    return res.status(401).send(
      "Invalid or expired login token."
    );

  }

};


// ==========================================
// GOOGLE CALLBACK
// ==========================================

const googleCallback = async (req, res) => {

  try {

    const { code, state } = req.query;


    if (!code) {
      return res.status(400).send(
        "Authorization code missing."
      );
    }


    if (!state) {
      return res.status(400).send(
        "User information missing."
      );
    }


    // Exchange Google authorization code
    // for OAuth tokens
    const { tokens } =
      await oauth2Client.getToken(code);


    oauth2Client.setCredentials(tokens);


    // Find MirrorVibes user
    const user = await User.findById(state);


    if (!user) {
      return res.status(404).send(
        "MirrorVibes user not found."
      );
    }


    // Save Google tokens to MongoDB
    user.youtube = {

      accessToken:
        tokens.access_token,

      refreshToken:
        tokens.refresh_token,

      expiryDate:
        tokens.expiry_date,

    };


    await user.save();


    console.log(
      "✅ YouTube connected for:",
      user.username
    );


    // Send user back to MirrorVibes
    return res.redirect(
      "http://localhost:5173"
    );


  } catch (err) {

    console.error(
      "Google Callback Error:",
      err
    );


    return res.status(500).send(
      "Google Login Failed"
    );

  }

};


// ==========================================
// CREATE YOUTUBE PLAYLIST
// ==========================================

const createYoutubePlaylist = async (
  req,
  res
) => {

  try {

    console.log(
      "========== CREATE PLAYLIST =========="
    );


    // req.user comes from authMiddleware
    const user = await User.findById(
      req.user.id
    );


    if (!user) {

      return res.status(404).json({
        message: "User not found.",
      });

    }


    // Has user connected YouTube?
    if (!user.youtube?.accessToken) {

      return res.status(401).json({
        message:
          "Please connect your YouTube account first.",
      });

    }


    // Build Google OAuth credentials
    // using tokens stored in MongoDB
    const tokens = {

      access_token:
        user.youtube.accessToken,

      refresh_token:
        user.youtube.refreshToken,

      expiry_date:
        user.youtube.expiryDate,

    };


    const {
      playlistTitle,
      playlistDescription,
      songs,
    } = req.body;


    if (!playlistTitle) {

      return res.status(400).json({
        message:
          "Playlist title is required.",
      });

    }


    if (
      !Array.isArray(songs) ||
      songs.length === 0
    ) {

      return res.status(400).json({
        message:
          "Playlist must contain songs.",
      });

    }


    // Create playlist
    const {
      playlistId,
      youtube,
    } = await createPlaylist(

      tokens,

      playlistTitle,

      playlistDescription ||
        "Created with MirrorVibes"

    );


    console.log(
      "Playlist created:",
      playlistId
    );


    // ======================================
    // FIND + ADD SONGS
    // ======================================

    for (const song of songs) {

      try {

        const videoId =
          await searchVideo(

            youtube,

            song.title,

            song.artist

          );


        if (videoId) {

          await addVideoToPlaylist(

            youtube,

            playlistId,

            videoId

          );


          console.log(
            `Added: ${song.title} - ${song.artist}`
          );

        }


      } catch (songError) {

        // Don't destroy entire playlist
        // because one song failed

        console.error(
          `Failed to add ${song.title}:`,
          songError.message
        );

      }

    }


    console.log(
      "✅ YouTube playlist complete!"
    );


    return res.status(200).json({

      playlistId,

      playlistUrl:
        `https://www.youtube.com/playlist?list=${playlistId}`,

    });


  } catch (err) {

    console.error(
      "Playlist Error:",
      err
    );


    return res.status(500).json({

      message:
        err.message ||
        "Playlist creation failed.",

    });

  }

};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

  googleLogin,

  googleCallback,

  createYoutubePlaylist,

};