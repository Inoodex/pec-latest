"use client";
import { motion } from "motion/react";
import { CalendarDays, User, Clock, Tag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogHero({ blogDetails }) {
    const blog = blogDetails?.data;
    const content = blog?.content || "";
    const readTime = Math.ceil(content.split(/\s+/).length / 200) || 1;
    
    return (
        <section className="relative min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
            {/* Gradient Background - Brand Color Focused */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-accent">
                {/* Animated Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                {/* Dot Pattern Overlay */}
                {/* <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20px 20px, white 1.5px, transparent 1.5px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div> */}
            </div>
            
            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
            
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-5 md:space-y-6"
                >
                    {/* Category Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link 
                            href={`/category/${blog?.category?.name}`}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/30 transition-all duration-300 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
                        >
                            <Sparkles size={14} />
                            {blog?.category?.name || "Article"}
                        </Link>
                    </motion.div>
                    
                    {/* Title */}
                    <motion.h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {blog?.title}
                    </motion.h1>
                    
                    {/* Excerpt */}
                    {blog?.excerpt && (
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {blog?.excerpt}
                        </motion.p>
                    )}
                    
                    {/* Meta Info - Glass Cards */}
                    <motion.div 
                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {/* Author */}
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg hover:bg-white/25 transition-all duration-300">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <User size={13} className="text-white" />
                            </div>
                            <span className="font-medium">{blog?.author?.name || "PECEDU Team"}</span>
                        </div>
                        
                        {/* Date */}
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg hover:bg-white/25 transition-all duration-300">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <CalendarDays size={13} className="text-white" />
                            </div>
                            <span className="font-medium">{blog?.published_at}</span>
                        </div>
                        
                        
                        
                        {/* Category Tag */}
                        {blog?.category?.name && (
                            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg hover:bg-white/25 transition-all duration-300">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <Tag size={13} className="text-white" />
                                </div>
                                <span className="font-medium capitalize">{blog.category.name}</span>
                            </div>
                        )}
                    </motion.div>
                    
               
                   
                </motion.div>
            </div>
        </section>
    );
}