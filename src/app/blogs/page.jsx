import { getBlogData } from "@/apis/getData";
import Blog from "@/components/blog";
import Heading from "@/components/heading";

const Blogs = async () => {
    const { data } = await getBlogData("blogs", 300);
    console.log(data);

    return (
        <div className="bg-gray-100">
            <div className="md:py-20 py-10 md:pt-40 max-w-7xl pt-30 mx-auto px-4 2xl:px-0 overflow-x-hidden">
                <Heading
                    title="Discover our latest"
                    highlight="Blogs"
                    subtitle="- Our Insights"
                    color={false}
                    paragraph="Explore our latest blogs and insights on web development, design, and technology trends. Stay informed and inspired with our expert articles and tips."
                />
                <h2 className="text-3xl font-semibold pl-3 text-brand-primary mt-10">
                    Latest Blogs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                    {data?.data?.map((blog) => (
                        <div key={blog.id}>
                            <div className="shadow-lg rounded-2xl ">
                                <Blog blog={blog} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
