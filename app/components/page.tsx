import type { Metadata } from "next";
import ComponentsPage from "@/components/components/ComponentsPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Components — UI Showcase & Design System",
  description: "A showcase of interactive UI components, design patterns, tech stack layouts, and micro-interactions built by Sahil Singh.",
  alternates: {
    canonical: `${siteUrl}/components`,
  },
  openGraph: {
    title: "Components — Sahil Singh",
    description: "A showcase of interactive UI components, design patterns, tech stack layouts, and micro-interactions built by Sahil Singh.",
    url: `${siteUrl}/components`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Sahil Singh | UI Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Components — Sahil Singh",
    description: "A showcase of interactive UI components, design patterns, tech stack layouts, and micro-interactions built by Sahil Singh.",
    images: [`${siteUrl}/og-image.webp`],
    creator: "@sahilcodex",
  },
};

export default function Page() {
  return <ComponentsPage />;
}
