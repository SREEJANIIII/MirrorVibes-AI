import { BsChatHeart } from "react-icons/bs";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiPlantLine } from "react-icons/ri";
import "../styles/features.css";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <BsChatHeart />,
    title: "Talk Freely",
    description: "Express your thoughts without judgment. Mirror listens first."
  },
  {
    icon: <IoMusicalNotesOutline />,
    title: "Your Soundtrack",
    description: "Discover music that reflects your emotions and helps you heal."
  },
  {
    icon: <RiPlantLine />,
    title: "Your Journey",
    description: "Revisit past conversations and see how you've grown over time."
  }
];

const Features = () => {
  return (
    <section className="features">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default Features;