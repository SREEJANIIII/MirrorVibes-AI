import "../styles/MoodResult.css";
import axios from "axios";
const MoodResult = ({ mood }) => {

  if (!mood) return null;
const createYoutubePlaylist = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/youtube/create",
      {
        playlistTitle: mood.playlistTitle,
        playlistDescription: mood.playlistDescription,
        songs: mood.songs,
      },
      {
        withCredentials: true,
      }
    );

    window.open(response.data.playlistUrl, "_blank");

  } catch (err) {
  console.error("Frontend Error:", err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Data:", err.response.data);
  }

  alert("Failed to create YouTube playlist.");
}

};
  return (

    <section className="mood-result-card">

      <h2>Your Reflection</h2>

      <div className="emotion-card">

        <h3>{mood.emotion}</h3>

        <span>{mood.subEmotion}</span>

      </div>

      <div className="section">

        <h4>Reflection</h4>

        <p>{mood.reflection}</p>

      </div>

      <div className="section comfort">

        <h4>A Little Reminder</h4>

        <p>{mood.comfort}</p>

      </div>

      <div className="playlist-card">

        <h3>🎵 {mood.playlistTitle}</h3>

        <p>{mood.playlistDescription}</p>

      </div>

      <div className="section">

        <h4>✨ Playlist Journey</h4>

        <div className="flow">

          {mood.playlistFlow.map((step, index) => (

            <div key={index} className="flow-card">

              <h5>{step.phase}</h5>

              <p>{step.purpose}</p>

            </div>

          ))}

        </div>

      </div>

      <div className="section">

        <h4>🎧 Curated Playlist</h4>

        <div className="songs">

          {mood.songs.map((song, index) => (

            <div key={index} className="song">

              <div>

                <h5>{song.title}</h5>

                <span>{song.artist}</span>

              </div>

              <p>{song.reason}</p>

            </div>

          ))}

        </div>

      </div>
<div className="export-buttons">

  <button
    className="youtube-btn"
    onClick={createYoutubePlaylist}
  >
    ▶ Export to YouTube
  </button>

</div>
    </section>

  );

};

export default MoodResult;