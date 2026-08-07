const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  googleLogin,
  googleCallback,
  createYoutubePlaylist,
} = require("../controllers/youtubeController");


// Start Google OAuth
router.get(
  "/login",
  googleLogin
);


// Google sends user back here
router.get(
  "/callback",
  googleCallback
);


// Actually create playlist
router.post(
  "/create",
  authMiddleware,
  createYoutubePlaylist
);


module.exports = router;