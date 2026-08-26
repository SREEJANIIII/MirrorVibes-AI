import { useState, useEffect } from "react";
import "../styles/MoodResult.css";
import ArtistReflection from "./ArtistReflection";
import axios from "axios";
const MoodResult = ({ mood }) => {
const [spotifySaved, setSpotifySaved] = useState(null);
  useEffect(() => {
  setSpotifySaved(null);
}, [mood]);
if (!mood) return null;
const saveSpotifyPlaylist = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/spotify/save-playlist`,
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



setSpotifySaved({
  count: response.data.matchedSongs.length,
  total: mood.songs.length,
  unmatched: response.data.unmatchedSongs,
  url: response.data.playlistUrl,
});
  } catch (err) {
    console.error(
      "Spotify playlist error:",
      err.response?.data || err
    );

    if (err.response?.status === 401) {
      const token =
        localStorage.getItem("token");

      window.location.href =
  `${import.meta.env.VITE_API_URL}/api/spotify/login?token=${token}`;;

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

        <p><strong>Energy:</strong> {mood.energy}</p>

        <p><strong>Listener Intent:</strong> {mood.listenerIntent}</p>

      </div>

      <div className="section">

        <h4>🪞Reflection</h4>

        <p>{mood.reflection}</p>

      </div>

      <div className="section comfort">

  <h4>A Little Reminder</h4>

  <p>{mood.comfort}</p>

</div>

<ArtistReflection mood={mood.emotion} />

      <div className="playlist-card">

        <h3>🎵 {mood.playlistTitle}</h3>

        <p>{mood.playlistDescription}</p>

      </div>

      <div className="section">

        <h4>Playlist Journey</h4>

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

        <h4>Curated Playlist</h4>

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
<div className="playlist-actions">

  <button
    className="mv-btn"
    onClick={saveSpotifyPlaylist}
  >
    Save to Spotify
  </button>

</div>
{spotifySaved && (
  <div className="spotify-success">
    <h3>Saved to Spotify!</h3>

    <p>
      {spotifySaved.count} of {spotifySaved.total} songs
      were added successfully.
    </p>

    {spotifySaved.unmatched?.length > 0 && (
      <p className="spotify-unmatched">
        {spotifySaved.unmatched.length} song
        {spotifySaved.unmatched.length > 1 ? "s" : ""}
        couldn't be found on Spotify.
      </p>
    )}

    <button
      className="mv-btn"
      onClick={() =>
        window.open(
          spotifySaved.url,
          "_blank"
        )
      }
    >
      Open Spotify Playlist →
    </button>
  </div>
)}

    </section>

  );

};

export default MoodResult;