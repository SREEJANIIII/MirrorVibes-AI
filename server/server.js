require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const moodRoutes = require("./routes/moodRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const spotifyRoutes = require("./routes/spotifyRoutes");

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mirror-vibes-ai-git-main-sreejanis-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/spotify", spotifyRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});