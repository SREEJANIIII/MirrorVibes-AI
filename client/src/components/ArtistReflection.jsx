import { useState } from "react";
import ArtistQuotes from "../data/ArtistQuotes";
import "../styles/ArtistReflection.css";

const ArtistReflection = ({ mood }) => {

  const getRandomReflection = () => {
    const matchingQuotes = ArtistQuotes.filter((quote) =>
      quote.moods.includes(mood?.toLowerCase())
    );

    const availableQuotes =
      matchingQuotes.length > 0 ? matchingQuotes : ArtistQuotes;

    return availableQuotes[
      Math.floor(Math.random() * availableQuotes.length)
    ];
  };

  const [reflection, setReflection] = useState(getRandomReflection());

  const newReflection = () => {
    let random = getRandomReflection();

    while (
      ArtistQuotes.length > 1 &&
      random.quote === reflection.quote
    ) {
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

      <p className="quote-source">
        Source: {reflection.source}
      </p>

      <button onClick={newReflection}>
        🔄 New Reflection
      </button>

    </section>
  );
};

export default ArtistReflection;