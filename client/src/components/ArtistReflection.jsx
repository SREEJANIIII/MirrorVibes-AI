import { useState } from "react";
import ArtistQuotes from "../data/ArtistQuotes";
import "../styles/ArtistReflection.css";

const ArtistReflection = () => {
  const getRandomReflection = () =>
    ArtistQuotes[Math.floor(Math.random() * ArtistQuotes.length)];

  const [reflection, setReflection] = useState(getRandomReflection());

  const newReflection = () => {
    let random = getRandomReflection();

    // Prevent the same quote from appearing twice in a row
    while (random.quote === reflection.quote) {
      random = getRandomReflection();
    }

    setReflection(random);
  };

  return (
    <section className="reflection-card">
      <h2>🎵 Artist Reflection</h2>

      <p className="quote">
        "{reflection.quote}"
      </p>

      <h3>{reflection.artist}</h3>

      <span>
        {reflection.genre} • {reflection.country}
      </span>

      <button onClick={newReflection}>
        🔄 New Reflection
      </button>
    </section>
  );
};

export default ArtistReflection;