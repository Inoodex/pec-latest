import Blog from "@/components/blog";
import Button from "@/components/button";
import Heading from "@/components/heading";

export default async function BlogsSection({ blogs = [] }) {
  return (
    <section className="w-full bg-foreground py-20">
      <section className="max-w-7xl mx-auto">
        <Heading
          subtitle="Blogs & News"
          title="Today's News & "
          highlight="Updates"
          paragraph="Catch up on today’s latest news, important
                              updates, and announcements everything you need to
                              stay informed."
        />
        <section className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 px-4 gap-5 mt-10">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </section>
        <div className="mt-5 flex justify-center">
          <Button url={"blogs"}>View All Blogs</Button>
        </div>
      </section>
    </section>
  );
}
