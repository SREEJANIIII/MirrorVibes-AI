const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../Middleware/authMiddleware");

const {
    spotifyLogin,
    spotifyCallback,
    getSpotifyToken,
    saveSpotifyPlaylist,
} = require("../controllers/spotifyController");

// Start Spotify OAuth
router.get("/login", spotifyLogin);

// Spotify OAuth callback
router.get("/callback", spotifyCallback);

// Get a valid Spotify access token
router.get(
    "/token",
    authMiddleware,
    getSpotifyToken 
);
router.post(
    "/save-playlist",
    authMiddleware,
    saveSpotifyPlaylist
);

module.exports = router;