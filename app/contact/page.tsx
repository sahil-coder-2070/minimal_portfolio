import type { Metadata } from "next";
import Contact from "@/components/contact/ContactPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description: "Reach out to Sahil Singh for frontend development projects, engineering roles, collaborations, or technical inquiries.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact — Get in Touch with Sahil Singh",
    description: "Reach out to Sahil Singh for frontend development projects, engineering roles, collaborations, or technical inquiries.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Sahil Singh | Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Get in Touch with Sahil Singh",
    description: "Reach out to Sahil Singh for frontend development projects, engineering roles, collaborations, or technical inquiries.",
    images: [`${siteUrl}/og-image.webp`],
    creator: "@sahilcodex",
  },
};

export default function ContactPage() {
  return <Contact />;
}
