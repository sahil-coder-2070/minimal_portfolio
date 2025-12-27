import React from "react";
import Container from "../layouts/Container";
import Hero from "../layouts/Hero";
import ExperienceCard from "../layouts/ExperienceCard";

const Home = () => {
  return (
    <Container className={`min-h-[250vh]`}>
      <div>
        <Hero />
        <ExperienceCard />
      </div>
    </Container>
  );
};

export default Home;
