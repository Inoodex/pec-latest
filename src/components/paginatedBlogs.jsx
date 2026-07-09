"use client";
import { useState } from "react";
import Blog from "@/components/blog";

export default function PaginatedBlogs({ initialBlogs = [], initialMeta }) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [meta, setMeta] = useState(initialMeta || { current_page: 1, last_page: 1 });
    const [loading, setLoading] = useState(false);

    const paginate = async (pageNumber) => {
        setLoading(true);
        try {
            const res = await fetch(`https://apps.peceduglobal.com/api/public/blogs?page=${pageNumber}`);
            const json = await res.json();
            if (json.success) {
                setBlogs(json.data);
                setMeta(json.meta);
                window.scrollTo({ top: 300, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <Blog blog={blog} key={blog.id} index={index} />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {meta.last_page > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                        onClick={() => paginate(meta.current_page - 1)}
                        disabled={meta.current_page === 1 || loading}
                        className={`px-4 py-2 rounded-md font-semibold transition ${
                            meta.current_page === 1 || loading
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white"
                        }`}
                    >
                        Prev
                    </button>

                    {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            disabled={loading}
                            className={`px-4 py-2 rounded-md font-semibold transition ${
                                meta.current_page === number
                                    ? "bg-brand-primary text-white shadow-md"
                                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                            }`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(meta.current_page + 1)}
                        disabled={meta.current_page === meta.last_page || loading}
                        className={`px-4 py-2 rounded-md font-semibold transition ${
                            meta.current_page === meta.last_page || loading
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
