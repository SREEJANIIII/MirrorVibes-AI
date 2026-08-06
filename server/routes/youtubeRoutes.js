const express = require("express");
const router = express.Router();

const {
  googleLogin,
  googleCallback,
  createYoutubePlaylist,
} = require("../controllers/youtubeController");

router.get("/login", googleLogin);
router.get("/callback", googleCallback);
router.post("/create", createYoutubePlaylist);

module.exports = router;