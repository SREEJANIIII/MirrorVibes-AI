import { useState, useEffect } from "react";
import ArtistQuotes from "../data/ArtistQuotes";
import "../styles/ArtistReflection.css";

const moodGroups = {
  longing: ["longing", "heartbroken", "sad", "lonely", "nostalgic"],
  heartbroken: ["heartbroken", "sad", "lonely", "longing", "nostalgic"],
  sad: ["sad", "heartbroken", "lonely", "longing", "reflective"],
  lonely: ["lonely", "sad", "heartbroken", "reflective"],
  anxious: ["anxious", "overwhelmed", "burnout"],
  overwhelmed: ["overwhelmed", "anxious", "burnout"],
  burnout: ["burnout", "overwhelmed", "anxious"],
  motivated: ["motivated", "confident", "hopeful"],
  confident: ["confident", "motivated", "hopeful"],
  hopeful: ["hopeful", "motivated", "happy"],
  happy: ["happy", "hopeful", "confident"],
  happiness: ["happy", "hopeful", "confident"],
  joy: ["happy", "hopeful", "confident"],
  content: ["happy", "hopeful", "reflective"],
  angry: ["angry", "confident", "motivated"],
  reflective: ["reflective", "sad", "lonely", "nostalgic"],
  nostalgic: ["nostalgic", "longing", "sad", "heartbroken"],
  creative: ["creative", "happy", "motivated", "reflective"],
};

const ArtistReflection = ({ mood }) => {

  const getRandomReflection = () => {
    const normalizedMood = mood?.toLowerCase();

    const relatedMoods =
      moodGroups[normalizedMood] || [normalizedMood];

    const matchingQuotes = ArtistQuotes.filter((quote) =>
      quote.moods.some((quoteMood) =>
        relatedMoods.includes(quoteMood.toLowerCase())
      )
    );

    const availableQuotes =
      matchingQuotes.length > 0
        ? matchingQuotes
        : ArtistQuotes;

    return availableQuotes[
      Math.floor(Math.random() * availableQuotes.length)
    ];
  };

  const [reflection, setReflection] =
    useState(getRandomReflection());

  // 🔥 Update reflection whenever the detected mood changes
  useEffect(() => {
    if (mood) {
      setReflection(getRandomReflection());
    }
  }, [mood]);

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