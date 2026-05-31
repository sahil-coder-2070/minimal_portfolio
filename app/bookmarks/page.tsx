import type { Metadata } from "next";
import BookmarksPage from "@/components/bookmarks/Bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "A curated list of my favorite websites, design collections, developer portfolios, and productivity tools.",
};

export default function Page() {
  return <BookmarksPage />;
}
