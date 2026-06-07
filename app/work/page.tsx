import type { Metadata } from "next";
import Container from "@/components/layouts/Container";
import { Separator } from "@/components/ui/separator";
import ExperienceContent from "@/components/experience/ExperienceContent";

export const metadata: Metadata = {
  title: "Work Experience - Professional Journey",
  description: "A detailed overview of my professional journey, work experience, and contributions to real-world projects using React and modern frontend technologies.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work Experience - Professional Journey",
    description: "A detailed overview of my professional journey, work experience, and contributions to real-world projects using React and modern frontend technologies.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Work Experience
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My work experiences across different companies and roles.
          </p>
        </div>
      </div>
      <Separator />
      <div className="space-y-6">
        <ExperienceContent />
      </div>
    </Container>
  );
}
