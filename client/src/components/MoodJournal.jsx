import { useState } from "react";
import axios from "axios";
import "../styles/MoodJournal.css";

const MoodJournal = ({ setMoodResult }) => {
  const [journal, setJournal] = useState("");

  async function handleAnalyze() {

  if (!journal.trim()) {
    alert("Please write something before finding your soundtrack.");
    return;
  }

  try {
    const analysis = await axios.post(
      "http://localhost:5000/api/mood/analyze",
      {
        text: journal,
      }
    );

    console.log("Emotion Analysis:", analysis.data);

    const playlist = await axios.post(
      "http://localhost:5000/api/playlist",
      {
        journal,

        emotion: analysis.data.emotion,
        subEmotion: analysis.data.subEmotion,
        energy: analysis.data.energy,
        listenerIntent: analysis.data.listenerIntent,

        favoriteArtists: [],
      }
    );
    console.log("Analysis:", analysis.data);
console.log("Playlist:", playlist.data);

const merged = {
  ...analysis.data,
  ...playlist.data,
};

console.log("Merged:", merged);

setMoodResult(merged);

    console.log("Playlist:", playlist.data);

    // STEP 3 - Merge both responses
    setMoodResult({
      ...analysis.data,
      ...playlist.data,
    });

    setJournal("");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong!"
    );

  }

}

  return (
    <section className="mood-card">
      <h2>
    <span className="music-icon">🎶</span>
    Mood Journal
</h2>

      <p className="journal-subtitle">
    <span>Take your time.</span>

    <span>There's no right way to express yourself.</span>

    <span>I'm listening...</span>
    <span> Also do mention ur favourite or preferred artists and genres </span>
</p>
      <textarea
        rows="8"
        placeholder="Start writing here..."
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
      />

      <button className="reflect-btn" onClick={handleAnalyze}>
        ♫ Reflect & Listen
      </button>
    </section>
  );
};

export default MoodJournal;