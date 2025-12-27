import React from "react";
import Container from "./Container";
import BioText from "../landing/BioText";
import ResumeButton from "../landing/ResumeButton";
import SocialLinks from "../landing/SocialLinks";
import Spotify from "../landing/Spotify";

const Hero = () => {
  return (
    <Container className={`flex flex-col items-start justify-center py-18`}>
      <div className="box-border h-24 w-24 overflow-hidden rounded-full bg-blue-300 p-1 duration-200 dark:bg-yellow-300">
        <img
          src="./Avatar.png"
          alt="Avatar"
          className="box-border h-24 scale-105 object-cover"
        />
      </div>
      <div className="mt-8">
        <h2 className="text-4xl font-semibold text-neutral-700 dark:text-neutral-50">
          Hi, I'm Sahil —
          <span className="font-bold text-neutral-500/70 dark:text-neutral-400">
            A Full Stack web developer.
          </span>
        </h2>
      </div>
      <BioText />
      <ResumeButton />
      <SocialLinks />
    </Container>
  );
};

export default Hero;
