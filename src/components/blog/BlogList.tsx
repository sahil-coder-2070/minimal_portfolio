import React from 'react';
import Container from '@/components/layouts/Container';
import { Separator } from '@/components/ui/separator';
import BlogCard from '@/components/blog/BlogCard';
import SectionHeading from '../common/SectionHeading';
interface BlogItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  formattedDate: string;
}

const Blogs = ({ posts = [] }: { posts?: BlogItem[] }) => {
  return (
    <Container className="mt-5">
      <div>
        <div>
          <SectionHeading
            classname=" text-neutral-400 dark:text-neutral-500 font-medium "
            heading="blog"
          />
          <h2 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
            Showcase of Blogs
          </h2>
        </div>
      </div>
      <div>
        <BlogCard data={posts} />
      </div>
    </Container>
  );
};

export default Blogs;
