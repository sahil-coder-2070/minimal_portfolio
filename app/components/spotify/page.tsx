import type { Metadata } from "next";
import SpotifyDocPage from "@/components/components/SpotifyDocPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Spotify Live Player — Component Documentation",
  description: "Live Spotify currently playing widget with audio spectrum animations, song metadata, and CLI installation docs.",
  alternates: {
    canonical: `${siteUrl}/components/spotify`,
  },
};

export default function Page() {
  return <SpotifyDocPage />;
}
