// components/blog.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, ArrowUpRight } from "lucide-react";

export default function Blog({ blog, index = 0 }) {
    // ইমেজ URL তৈরি করার ফাংশন
    const getImageUrl = () => {
        if (!blog?.featured_image) return "/logo.png";
        
        // যদি URL ইতিমধ্যেই full হয়
        if (blog.featured_image.startsWith('http')) {
            return blog.featured_image;
        }
        
        // SITE_URL যোগ করুন
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apps.peceduglobal.com';
        return `${baseUrl}${blog.featured_image}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group h-full"
        >
            <Link href={`/blogs/${blog?.slug}`} className="block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-56 w-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                        src={getImageUrl()}
                        alt={blog?.featured_image_alt || "blog image"}
                        className="object-cover group-hover:scale-110 duration-700 transition-all"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                            // ইমেজ লোড না হলে ফ্যালব্যাক
                            e.currentTarget.src = "/logo.png";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-primary uppercase tracking-wider">
                            {blog?.category?.name || "Article"}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <CalendarDays size={14} />
                        {blog?.published_at}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 flex-1">
                        {blog?.title}
                    </h3>
                    <div className="mt-5 flex items-center gap-2 text-brand-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More
                        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}