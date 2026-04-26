import SectionHeading from "@/components/common/SectionHeading";
import Container from "@/components/layouts/Container";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { BlogCardData } from "@/config/blog/BlogCardData";

const Blog = ({ limit }: { limit?: number }) => {
  const displayData = limit ? BlogCardData.slice(0, limit) : BlogCardData;

  return (
    <Container className={"mt-30 mb-30"}>
      <SectionHeading subHeading={"Featured"} heading={"Blogs"} />
      <BlogCard data={displayData} />
      {!limit && (
        <div className="mt-8 flex w-full items-center justify-center">
          <Link to="/blogs">
            <Button variant="outline">Show all Blogs</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Blog;
