import Navbar2 from "../components/Navbar2";
import SpotifyPlayer from "../components/SpotifyPlayer";

const Playlist = () => {
  return (
    <>
      <Navbar2 />

      <main className="home">
        <h1>🎵 Playlist</h1>

        <p>
          Your personalized soundtracks will appear here.
        </p>

        <SpotifyPlayer />
      </main>
    </>
  );
};

export default Playlist;