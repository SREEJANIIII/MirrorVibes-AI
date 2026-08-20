import { useEffect, useRef, useState } from "react";

const SpotifyPlayer = ({ songs = [] }) => {
  const playerRef = useRef(null);

  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [status, setStatus] = useState("Connecting to Spotify...");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getToken = async () => {
    const response = await fetch(
      "http://localhost:5000/api/spotify/token",
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not get Spotify token.");
    }

    const data = await response.json();

    setSpotifyToken(data.accessToken);

    return data.accessToken;
  };

  useEffect(() => {
    let cancelled = false;

    const initializePlayer = async () => {
      try {
        const token = await getToken();

        // Load Spotify Web Playback SDK
        if (!window.Spotify) {
          const existingScript = document.querySelector(
            'script[src="https://sdk.scdn.co/spotify-player.js"]'
          );

          if (!existingScript) {
            const script = document.createElement("script");

            script.src =
              "https://sdk.scdn.co/spotify-player.js";

            script.async = true;

            document.body.appendChild(script);
          }

          await new Promise((resolve) => {
            window.onSpotifyWebPlaybackSDKReady = resolve;
          });
        }

        if (cancelled || !window.Spotify) {
          return;
        }

        const spotifyPlayer =
          new window.Spotify.Player({
            name: "MirrorVibes Player",

            getOAuthToken: async (callback) => {
              try {
                const freshToken = await getToken();
                callback(freshToken);
              } catch (error) {
                console.error(
                  "Could not refresh Spotify token:",
                  error
                );
              }
            },

            volume: 0.5,
          });

        spotifyPlayer.addListener(
          "ready",
          ({ device_id }) => {
            console.log(
              "🎧 MirrorVibes Spotify device:",
              device_id
            );

            setDeviceId(device_id);
            setStatus("Spotify player ready 🎧");
          }
        );

        spotifyPlayer.addListener(
          "not_ready",
          ({ device_id }) => {
            console.log(
              "Spotify device went offline:",
              device_id
            );

            setStatus("Spotify player offline");
          }
        );

        spotifyPlayer.addListener(
          "initialization_error",
          ({ message }) => {
            console.error(
              "Spotify initialization error:",
              message
            );

            setStatus(
              "Spotify player initialization failed"
            );
          }
        );

        spotifyPlayer.addListener(
          "authentication_error",
          ({ message }) => {
            console.error(
              "Spotify authentication error:",
              message
            );

            setStatus(
              "Spotify authentication failed"
            );
          }
        );

        spotifyPlayer.addListener(
          "account_error",
          ({ message }) => {
            console.error(
              "Spotify account error:",
              message
            );

            setStatus(
              "Spotify Premium is required"
            );
          }
        );

        spotifyPlayer.addListener(
          "playback_error",
          ({ message }) => {
            console.error(
              "Spotify playback error:",
              message
            );

            setStatus(
              "Spotify playback error"
            );
          }
        );

        spotifyPlayer.addListener(
          "autoplay_failed",
          () => {
            console.log(
              "Spotify autoplay was blocked."
            );
          }
        );

        spotifyPlayer.addListener(
          "player_state_changed",
          (state) => {
            if (!state) return;

            const track =
              state.track_window.current_track;

            setCurrentTrack(track);
            setIsPlaying(!state.paused);
          }
        );

        const connected =
          await spotifyPlayer.connect();

        if (!connected) {
          setStatus(
            "Could not connect to Spotify."
          );
          return;
        }

        if (!cancelled) {
          setPlayer(spotifyPlayer);
          playerRef.current = spotifyPlayer;
        }

      } catch (error) {
        console.error(
          "Spotify Player Error:",
          error
        );

        setStatus(
          "Could not initialize Spotify."
        );
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;

      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!player) return;

    await player.activateElement();
    await player.togglePlay();
  };

  const playGeminiPlaylist = async () => {
    if (!deviceId || !player) {
      alert("Spotify player is not ready yet.");
      return;
    }

    if (!songs.length) {
      alert("No songs found in the playlist.");
      return;
    }

    try {
      // User interaction activates the player
      await player.activateElement();

      // Get a fresh access token
      const accessToken = await getToken();

      console.log(
        "🎵 Gemini playlist contains:",
        songs.length,
        "songs"
      );

      const spotifyTracks = [];

      // Find each Gemini song on Spotify
      for (const song of songs) {
        try {
          const query =
            `track:${song.title} artist:${song.artist}`;

          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
              query
            )}&type=track&limit=1`,
            {
              headers: {
                Authorization:
                  `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            console.error(
              `Spotify search failed for ${song.title}:`,
              await response.text()
            );

            continue;
          }

          const data = await response.json();

          const track =
            data.tracks?.items?.[0];

          if (track) {
            spotifyTracks.push(track);

            console.log(
              `✅ ${song.title} → ${track.name} - ${track.artists[0].name}`
            );
          } else {
            console.warn(
              `❌ Not found: ${song.title} - ${song.artist}`
            );
          }

        } catch (error) {
          console.error(
            `Error finding ${song.title}:`,
            error
          );
        }
      }

      if (!spotifyTracks.length) {
        alert(
          "None of the Gemini songs could be found on Spotify."
        );

        return;
      }

      const uris =
        spotifyTracks.map(
          (track) => track.uri
        );

      console.log(
        "🎧 Spotify tracks found:",
        spotifyTracks.length
      );

      console.log(
        "🎧 Spotify URIs:",
        uris
      );

      // Start playback
      const playResponse = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${accessToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            uris,
          }),
        }
      );

      if (!playResponse.ok) {
        const error =
          await playResponse.text();

        console.error(
          "Spotify playback failed:",
          playResponse.status,
          error
        );

        alert(
          `Spotify playback failed (${playResponse.status}). Check the console.`
        );

        return;
      }

      console.log(
        `🎵 Playing ${spotifyTracks.length} Gemini songs!`
      );

    } catch (error) {
      console.error(
        "Gemini playlist playback failed:",
        error
      );

      alert(
        "Could not start the MirrorVibes playlist."
      );
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "24px",
        borderRadius: "16px",
        background: "#181818",
        color: "white",
      }}
    >
      <h2>🎧 MirrorVibes Player</h2>

      <p>{status}</p>

      {currentTrack && (
        <div>
          <h3>
            {currentTrack.name}
          </h3>

          <p>
            {currentTrack.artists
              .map(
                (artist) => artist.name
              )
              .join(", ")}
          </p>
        </div>
      )}

      <button
        onClick={playGeminiPlaylist}
        disabled={
          !deviceId || !songs.length
        }
      >
        🎧 Play MirrorVibes Playlist
      </button>

      <button
        onClick={togglePlay}
        disabled={!player}
        style={{
          marginLeft: "10px",
        }}
      >
        {isPlaying
          ? "⏸ Pause"
          : "▶ Play / Resume"}
      </button>
    </div>
  );
};

export default SpotifyPlayer;