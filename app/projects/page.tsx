import type { Metadata } from "next";
import Projects from "@/components/pages/Projects";

export const metadata: Metadata = {
  title: "Projects | My Work",
  description: "Explore my React and frontend development projects featuring clean UI, performance-focused design, and real-world use cases.",
};

export default function ProjectsPage() {
  return <Projects />;
}
