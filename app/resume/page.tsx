import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/layouts/Container";
import { resumeConfig } from "@/config/resume";

export const metadata: Metadata = {
  title: "Resume - Professional Profile",
  description: "View my professional resume and qualifications.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume - Professional Profile",
    description: "View my professional resume and qualifications.",
    url: "/resume",
  },
};

export default function ResumePage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Resume
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My resume.
          </p>
        </div>
        <Separator />
        <div className="mx-auto max-w-2xl">
          <iframe
            src={resumeConfig.url}
            className="min-h-screen w-full"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
