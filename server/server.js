require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const moodRoutes = require("./routes/moodRoutes");
const youtubeRoutes = require("./routes/youtubeRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "mirrorvibes-secret-key",
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,      // localhost
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use("/api/playlist", playlistRoutes);

app.get("/", (req, res) => {
  res.send("MirrorVibes Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/youtube", youtubeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});