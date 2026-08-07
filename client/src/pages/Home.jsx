import Navbar2 from "../components/Navbar2";
import ArtistReflection from "../components/ArtistReflection";
import "../styles/Home.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MoodJournal from "../components/MoodJournal";
import MoodResult from "../components/MoodResult";

const Home = () => {

  const location = useLocation();

  const firstLogin = location.state?.firstLogin || false;
const [moodResult, setMoodResult] = useState(null);
  return (
    <>
      <Navbar2 />

      <main className="home">

        <section className="greeting">

          <h1>
            {firstLogin
              ? "Welcome to the MirrorVibes Community!"
              : "Welcome Back!"}
          </h1>

          <p>
            {firstLogin
              ? "We're so happy you're here. Let's begin your journey with today's artist reflection."
              : "Let's begin with today's artist reflection."}
          </p>

        </section>

        <section className="reflection-section">
          <ArtistReflection />
        </section>
        <section className="mood-journal-section">
          <MoodJournal setMoodResult={setMoodResult} />
        </section>
{moodResult && <MoodResult mood={moodResult} />}
      </main>
    </>     
  );
};

export default Home;