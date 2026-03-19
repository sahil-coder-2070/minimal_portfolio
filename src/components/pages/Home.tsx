import Hero from "../layouts/Hero";
import ExperienceCard from "@/components/Experience/ExperienceCard";
import Project from "@/app/projects/Project";
import AboutMe from "../landing/TechSkills";
import Featured from "../landing/Featured";
import Blog from "@/app/blog/Blog";
import CTA from "../landing/CTA";
import Setup from "../landing/Setup";

const sectionIds = {
  experience: "experience",
  projects: "featured-projects",
  skills: "skills",
  featured: "featured",
  blog: "latest-blogs",
  cta: "contact",
  setup: "gear",
};

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />

      <section id={sectionIds.experience}>
        <ExperienceCard />
      </section>

      <section id={sectionIds.projects}>
        <Project />
      </section>

      <section id={sectionIds.skills}>
        <AboutMe />
      </section>

      <section id={sectionIds.featured}>
        <Featured />
      </section>

      <section id={sectionIds.blog}>
        <Blog />
      </section>

      <section id={sectionIds.cta}>
        <CTA />
      </section>

      <section id={sectionIds.setup}>
        <Setup />
      </section>
    </main>
  );
};

export default Home;
