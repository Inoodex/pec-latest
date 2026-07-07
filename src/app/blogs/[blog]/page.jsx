import { getBlogData, getSingleBlogData } from "@/apis/getData";
import BlogContent from "@/sections/blogs/blogContent";
import BlogHero from "@/sections/blogs/blogHero";

export default async function BlogDetailsPage({ params }) {
  const { blog: slug } = await params;
  const blogDetails = await getSingleBlogData(slug);
  const allBlogsRes = await getBlogData();
  const allBlogs = allBlogsRes?.data?.data || [];
  const fullBlog = allBlogs.find((b) => b.slug === slug) || {};
  const blogData = { ...blogDetails?.data, content: fullBlog?.content || blogDetails?.data?.content };
  return (
    <div className="bg-gray-100 overflow-x-hidden">
      {/* <BlogHero blogDetails={{ data: blogData }} /> */}
      <BlogContent blogDetails={{ data: blogData }} allBlogs={allBlogs} />
    </div>
  );
}
