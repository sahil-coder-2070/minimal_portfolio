import type { Metadata } from "next";
import MacKeyboardDocPage from "@/components/components/MacKeyboardDocPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Mac Keyboard — Interactive UI Component Docs",
  description: "Interactive Mac keyboard replica with real-time keystroke tracking, authentic layout geometry, sound effects, and installation docs.",
  alternates: {
    canonical: `${siteUrl}/components/mac-keyboard`,
  },
  openGraph: {
    title: "Mac Keyboard Component — Sahil Singh",
    description: "Interactive Mac keyboard replica with real-time keystroke tracking, authentic layout geometry, sound effects, and installation docs.",
    url: `${siteUrl}/components/mac-keyboard`,
    type: "website",
  },
};

export default function Page() {
  return <MacKeyboardDocPage />;
}
