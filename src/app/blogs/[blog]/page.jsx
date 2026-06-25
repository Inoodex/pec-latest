import { getSingleBlogData } from "@/apis/getData";
import BlogContent from "@/sections/blogs/blogContent";
import BlogHero from "@/sections/blogs/blogHero";

export default async function BlogDetailsPage({ params }) {
  const { blog } = await params;
  const blogDetails = await getSingleBlogData(blog);
  return (
    <div className="bg-gray-100 overflow-x-hidden">
      <BlogHero blogDetails={blogDetails} />
      <BlogContent blogDetails={blogDetails} />
    </div>
  );
}
