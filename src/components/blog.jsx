"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function Blog({ blog }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl"
        >
            <Link href={`/blogs/${blog?.slug}`} key={blog.id}>
                <div className="overflow-x-hidden h-60 rounded-t-2xl">
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_SITE_URL +
                            blog?.featured_image
                        }
                        alt={blog?.featured_image_alt || "image path failed"}
                        className="object-cover h-full rounded-t-2xl hover:scale-110 duration-300 transition-all"
                        width={1000}
                        height={2000}
                    />
                </div>
                <div className="p-3">
                    <p className="text-gray-600 mt-2">- {blog?.published_at}</p>
                    <h3 className="text-xl text-brand-primary font-bold mt-2 max-w-11/12 overflow-x-hidden whitespace-nowrap text-ellipsis">
                        {blog?.title}
                    </h3>
                    <p className="text-gray-600 mt-2 h-20 overflow-y-scroll scroll-none">
                        {blog?.excerpt}
                    </p>
                </div>
                <div className="p-3">
                    <button className="bg-brand-primary cursor-pointer hover:bg-brand-accent hover:shadow-lg duration-300 hover:scale-102 px-4 py-2.5 rounded-xl text-brand-contrast text-sm font-semibold">
                        Read More
                    </button>
                </div>
            </Link>
        </motion.div>
    );
}
