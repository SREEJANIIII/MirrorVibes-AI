import React from "react";
import "../styles/Hero.css";
import { IoMusicalNotes } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
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

    <button
  className="hero-btn"
  onClick={() => navigate("/signup")}
>
    <IoMusicalNotes />
    <span>Find Your Reflection</span>
    <HiArrowRight />
</button>

    </section>
  );
};

export default Hero;