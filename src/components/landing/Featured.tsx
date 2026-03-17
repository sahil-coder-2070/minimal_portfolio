import React, { useState, useEffect } from "react";
import Container from "../layouts/Container";
import SectionHeading from "../common/SectionHeading";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "./theme-provider";
import { motion as Motion } from "motion/react";
import { fetchGitHubContributions } from "@/api/github";

const Featured = () => {
  const [contributions, setContributions] = useState(0);

  useEffect(() => {
    const loadContributions = async () => {
      const count = await fetchGitHubContributions();
      setContributions(count);
    };
    loadContributions();
  }, []);
  
  const { theme } = useTheme();
  const currentTheme = theme;

  return (
    <Container className={`mt-25`}>
      <SectionHeading subHeading={"Featured"} heading={"GitHub Activity"} />
      <div className="space-y-6">
        <div className="flex w-full justify-between">
          <p className="text-primary mt-1 text-sm font-medium">
            Total: <span className="font-bold">{contributions} </span>{" "}
            contributions
          </p>
        </div>
        <Motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="inset-shadow bg-background/50 github-card-shadow relative flex items-center justify-center rounded-lg border border-black/10 p-2 px-5 py-2 backdrop-blur-sm sm:p-4 md:p-6 dark:border-white/10"
        >
          <GitHubCalendar
            username="sahilcodexx"
            blockSize={7}
            blockMargin={5}
            colorScheme={currentTheme === "dark" ? "dark" : "light"}
            showTotalCount={false}
            // year={2026}
          />
        </Motion.div>
      </div>
    </Container>
  );
};

export default Featured;
