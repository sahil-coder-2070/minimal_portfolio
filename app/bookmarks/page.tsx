import type { Metadata } from "next";
import BookmarksPage from "@/components/bookmarks/Bookmarks";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilcodex.vercel.app";

export const metadata: Metadata = {
  title: "Bookmarks — Developer Resources & UI Inspiration",
  description: "A curated list of developer tools, design inspiration, frontend collections, and productivity resources by Sahil Singh.",
  alternates: {
    canonical: `${siteUrl}/bookmarks`,
  },
  openGraph: {
    title: "Bookmarks — Developer Resources & UI Inspiration",
    description: "A curated list of developer tools, design inspiration, frontend collections, and productivity resources by Sahil Singh.",
    url: `${siteUrl}/bookmarks`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Sahil Singh | Bookmarks & Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookmarks — Developer Resources & UI Inspiration",
    description: "A curated list of developer tools, design inspiration, frontend collections, and productivity resources by Sahil Singh.",
    images: [`${siteUrl}/og-image.webp`],
    creator: "@sahilcodex",
  },
};

export default function Page() {
  return <BookmarksPage />;
}
