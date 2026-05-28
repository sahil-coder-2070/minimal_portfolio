import type { Metadata } from "next";
import Blogs from "@/components/pages/Blogs";

export const metadata: Metadata = {
  title: "Blog - Thoughts and Tutorials",
  description: "Read articles on React, JavaScript, frontend development, best practices, performance optimization, and modern web technologies.",
};

export default function BlogsPage() {
  return <Blogs />;
}
