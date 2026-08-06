import React from "react";
import "../styles/Hero.css";
import { IoMusicalNotes } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="hero">

      <h1>
        Your emotional support,
        <br />
        powered by music.
      </h1>

      <p>
        Some days are harder than others. 
        MirrorVibes listens,
        understands your emotions,
        and helps you find the music you need...
      </p>

    <button className="hero-btn">
    <IoMusicalNotes />
    <span>Find Your Soundtrack</span>
    <HiArrowRight />
</button>

    </section>
  );
};

export default Hero;