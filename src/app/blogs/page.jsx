import { getBlogData } from "@/apis/getData";
import Blog from "@/components/blog";

const Blogs = async () => {
    const { data } = await getBlogData("blogs", 300);

    return (
        <div className="bg-gray-100">
            <section className="relative pt-30 md:pt-40 pb-16 bg-linear-to-br from-brand-primary/10 via-white to-brand-accent/10">
                <div className="max-w-7xl mx-auto px-4 2xl:px-0 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-brand-primary text-brand-contrast text-sm font-bold uppercase tracking-widest mb-4">
                        - Our Insights
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Discover our latest{" "}
                        <span className="bg-brand-accent text-brand-contrast px-3 rounded-md">Blogs</span>
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                        Explore our latest blogs and insights on study abroad, travel, education, and career opportunities.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 2xl:px-0 -mt-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.data?.map((blog, index) => (
                        <Blog blog={blog} key={blog.id} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
