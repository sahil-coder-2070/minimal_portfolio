import type { Metadata } from "next";
import Container from "@/components/layouts/Container";
import { Separator } from "@/components/ui/separator";
import ExperienceContent from "@/components/experience/ExperienceContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Work Experience — Professional Engineering Journey",
  description: "A detailed overview of professional work experience, roles, and engineering contributions by Sahil Singh.",
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: "Work Experience — Sahil Singh",
    description: "A detailed overview of professional work experience, roles, and engineering contributions by Sahil Singh.",
    url: `${siteUrl}/work`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Sahil Singh | Work Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience — Sahil Singh",
    description: "A detailed overview of professional work experience, roles, and engineering contributions by Sahil Singh.",
    images: [`${siteUrl}/og-image.webp`],
    creator: "@sahilcodex",
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
