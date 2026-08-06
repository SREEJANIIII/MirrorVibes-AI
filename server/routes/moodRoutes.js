const express = require("express");
const router = express.Router();

const { analyzeMood } = require("../controllers/moodController");

router.post("/analyze", analyzeMood);

module.exports = router;