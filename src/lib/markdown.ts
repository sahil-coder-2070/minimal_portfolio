import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface MarkdownPost {
  meta: {
    title?: string;
    description?: string;
    date?: string;
    formattedDate?: string;
    image?: string;
    tags?: string[];
    [key: string]: any;
  };
  content: string;
}

export async function getMarkdownContent(folder: string, slug: string): Promise<MarkdownPost | null> {
  const filePath = path.join(process.cwd(), "src/data", folder, `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      meta: data,
      content,
    };
  } catch {
    return null;
  }
}

export async function getMarkdownSlugs(folder: string): Promise<string[]> {
  const directory = path.join(process.cwd(), "src/data", folder);
  try {
    const files = await fs.readdir(directory);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}
