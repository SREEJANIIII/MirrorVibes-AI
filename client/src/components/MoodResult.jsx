import "../styles/MoodResult.css";
import axios from "axios";
import SpotifyPlayer from "../components/SpotifyPlayer";
const MoodResult = ({ mood }) => {

  if (!mood) return null;

  const createYoutubePlaylist = async () => {

  try {

    const token = localStorage.getItem("token");

const response = await axios.post(
  "http://localhost:5000/api/youtube/create",
  {
    playlistTitle: mood.playlistTitle,
    playlistDescription: mood.playlistDescription,
    songs: mood.songs,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    window.open(response.data.playlistUrl, "_blank");

  } catch (err) {

  if (err.response?.status === 401) {

  const token =
    localStorage.getItem("token");

  window.location.href =
    `http://localhost:5000/api/youtube/login?token=${token}`;

  return;
}



    console.error(err);

  }

};

const saveSpotifyPlaylist = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/spotify/save-playlist",
      {
        playlistTitle: mood.playlistTitle,
        playlistDescription: mood.playlistDescription,
        songs: mood.songs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Spotify playlist:",
      response.data
    );

    if (response.data.playlistUrl) {
      window.open(
        response.data.playlistUrl,
        "_blank"
      );
    }

    alert(
      `💚 Saved ${response.data.matchedSongs.length} songs to Spotify!`
    );

  } catch (err) {
    console.error(
      "Spotify playlist error:",
      err.response?.data || err
    );

    if (err.response?.status === 401) {
      const token =
        localStorage.getItem("token");

      window.location.href =
        `http://localhost:5000/api/spotify/login?token=${token}`;

      return;
    }

    alert(
      err.response?.data?.message ||
      "Could not save playlist to Spotify."
    );
  }
};

  return (

    <section className="mood-result-card">

      <h2>Your Reflection</h2>

      <div className="emotion-card">

        <h3>{mood.emotion}</h3>

        <span>{mood.subEmotion}</span>

        <p><strong>⚡ Energy:</strong> {mood.energy}</p>

        <p><strong>🎯 Listener Intent:</strong> {mood.listenerIntent}</p>

      </div>

      <div className="section">

        <h4>🪞 Reflection</h4>

        <p>{mood.reflection}</p>

      </div>

      <div className="section comfort">

        <h4>💜 A Little Reminder</h4>

        <p>{mood.comfort}</p>

      </div>

      <div className="playlist-card">

        <h3>🎵 {mood.playlistTitle}</h3>

        <p>{mood.playlistDescription}</p>

      </div>

      <div className="section">

        <h4>✨ Playlist Journey</h4>

        <div className="flow">

          {mood.playlistFlow?.map((step, index) => (

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

          {mood.songs?.map((song, index) => (

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
<SpotifyPlayer songs={mood.songs} />
<button
  className="spotify-btn"
  onClick={saveSpotifyPlaylist}
>
  💚 Save to Spotify
</button>
      <button
        className="youtube-btn"
        onClick={createYoutubePlaylist}
      >
        ▶ Export to YouTube
      </button>

    </section>

  );

};

export default MoodResult;