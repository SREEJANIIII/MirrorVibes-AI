const express = require("express");

const router = express.Router();

const {
  generatePlaylist,
} = require("../controllers/playlistController");

router.post("/", generatePlaylist);

module.exports = router;