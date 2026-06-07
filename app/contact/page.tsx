import type { Metadata } from "next";
import Contact from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact - Get in Touch",
  description: "Reach out to me for project discussions, collaborations, or inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Get in Touch",
    description: "Reach out to me for project discussions, collaborations, or inquiries.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
