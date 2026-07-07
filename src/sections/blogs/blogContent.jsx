"use client";
import { motion } from "motion/react";
import { CalendarDays, Clock, Tag, Share2, Bookmark, Heart, Mail, Sparkles, GraduationCap, Star, Zap, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function BlogContent({ blogDetails, allBlogs }) {
    const blog = blogDetails?.data;
    const fullBlog = allBlogs?.find((b) => b.slug === blog?.slug) || {};
    const content = blog?.content || fullBlog?.content || "";
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const readTime = Math.ceil(content.split(/\s+/).length / 200) || 1;

    const renderContent = (text) => {
        if (!text) return <p className="text-gray-500 italic">No content available.</p>;

        const isHtml = /<[a-z][\s\S]*>/i.test(text);
        
        if (isHtml) {
            return (
                <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-8 prose-li:text-gray-700 prose-strong:text-brand-primary prose-a:text-brand-primary prose-img:rounded-2xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            );
        }

        const blocks = text.split(/\n\n+/);
        const elements = [];
        let listBuffer = [];
        let listType = null;

        const flushList = (key) => {
            if (listBuffer.length > 0) {
                const Tag = listType === "ol" ? "ol" : "ul";
                elements.push(
                    <Tag key={key} className={`${listType === "ol" ? "list-decimal" : "list-disc"} space-y-2 my-6 pl-6`}>
                        {listBuffer.map((item, i) => (
                            <li key={i} className="text-gray-700 leading-relaxed">{item}</li>
                        ))}
                    </Tag>
                );
                listBuffer = [];
                listType = null;
            }
        };

        blocks.forEach((block, i) => {
            const lines = block.trim().split("\n").map(l => l.trim()).filter(Boolean);
            if (lines.length === 0) return;
            
            const firstLine = lines[0] || "";

            if (lines.every(l => l.startsWith("* ") || l.startsWith("- "))) {
                listType = "ul";
                lines.forEach(l => listBuffer.push(l.replace(/^[*-]\s/, "")));
                return;
            }

            if (lines.every(l => /^\d+[.)]\s/.test(l))) {
                listType = "ol";
                lines.forEach(l => listBuffer.push(l.replace(/^\d+[.)]\s/, "")));
                return;
            }

            flushList(`list-${i}`);

            if (firstLine.startsWith("### ")) {
                elements.push(<h3 key={i} className="text-xl font-bold text-gray-800 mt-8 mb-4">{firstLine.replace(/^###\s/, "")}</h3>);
                if (lines.length > 1) {
                    elements.push(<p key={`${i}-p`} className="text-gray-700 leading-8 mb-5 text-lg">{lines.slice(1).join(" ")}</p>);
                }
            } else if (firstLine.startsWith("## ")) {
                elements.push(<h2 key={i} className="text-2xl font-bold text-gray-800 mt-10 mb-5 border-l-4 border-brand-primary pl-4">{firstLine.replace(/^##\s/, "")}</h2>);
                if (lines.length > 1) {
                    elements.push(<p key={`${i}-p`} className="text-gray-700 leading-8 mb-5 text-lg">{lines.slice(1).join(" ")}</p>);
                }
            } else if (firstLine.startsWith("# ")) {
                elements.push(<h1 key={i} className="text-3xl font-bold text-gray-800 mt-12 mb-6">{firstLine.replace(/^#\s/, "")}</h1>);
                if (lines.length > 1) {
                    elements.push(<p key={`${i}-p`} className="text-gray-700 leading-8 mb-5 text-lg">{lines.slice(1).join(" ")}</p>);
                }
            } else if (firstLine.startsWith("> ")) {
                elements.push(
                    <blockquote key={i} className="border-l-4 border-brand-primary pl-6 py-4 my-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-xl">
                        <p className="text-gray-700 italic text-lg">{firstLine.replace(/^>\s/, "")}</p>
                        {lines.slice(1).map((line, idx) => (
                            <p key={`${i}-q-${idx}`} className="text-gray-700 italic text-lg mt-2">{line}</p>
                        ))}
                    </blockquote>
                );
            } else if (firstLine.startsWith("**") && firstLine.endsWith("**")) {
                elements.push(<h4 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-3">{firstLine.replace(/\*\*/g, "")}</h4>);
                if (lines.length > 1) {
                    elements.push(<p key={`${i}-p`} className="text-gray-700 leading-8 mb-5 text-lg">{lines.slice(1).join(" ")}</p>);
                }
            } else if (/^\d+[.)]\s/.test(firstLine)) {
                elements.push(<h3 key={i} className="text-xl font-bold text-gray-800 mt-8 mb-3">{firstLine}</h3>);
                if (lines.length > 1) {
                    elements.push(<p key={`${i}-p`} className="text-gray-700 leading-8 mb-5 text-lg">{lines.slice(1).join(" ")}</p>);
                }
            } else {
                elements.push(<p key={i} className="text-gray-700 leading-8 mb-5 text-lg">{lines.join(" ")}</p>);
            }
        });
        flushList("list-end");

        return elements;
    };

    const shareLinks = [
        {
            Icon: FaFacebook,
            color: "hover:bg-[#1877F2]",
            label: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        },
        {
            Icon: FaTwitter,
            color: "hover:bg-[#000000]",
            label: "Twitter",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog?.title || '')}`
        },
        {
            Icon: FaLinkedin,
            color: "hover:bg-[#0A66C2]",
            label: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        },
        {
            Icon: FaWhatsapp,
            color: "hover:bg-[#25D366]",
            label: "WhatsApp",
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog?.title || '')} - ${encodeURIComponent(currentUrl)}`
        },
        {
            Icon: FaTelegram,
            color: "hover:bg-[#0088CC]",
            label: "Telegram",
            url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog?.title || '')}`
        }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8 bg-white/60 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg border border-white/50 max-w-fit">
                    <Link href="/" className="hover:text-brand-primary transition font-medium">Home</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <Link href="/blogs" className="hover:text-brand-primary transition font-medium">Blogs</Link>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-brand-primary font-semibold truncate max-w-[200px]">{blog?.title || "Blog Post"}</span>
                </nav>

                <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        {blog?.category?.name && (
                            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 text-brand-primary rounded-full text-sm font-semibold mb-4">
                                <Sparkles size={16} /> {blog.category.name}
                            </span>
                        )}

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{blog?.title}</h1>

                        {blog?.excerpt && (
                            <p className="text-lg text-gray-600 leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-2xl border border-gray-100/50 mb-6">{blog?.excerpt}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold">
                                    {blog?.author?.name?.charAt(0) || "P"}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{blog?.author?.name || "PECEDU Team"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                    <CalendarDays size={14} className="text-brand-primary" /> {blog?.published_at}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                    <Clock size={14} className="text-brand-primary" /> {readTime} min read
                                </span>
                            </div>
                        </div>

                        {blog?.featured_image && (
                            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl">
                                <Image src={process.env.NEXT_PUBLIC_SITE_URL + blog.featured_image} alt={blog?.featured_image_alt || "blog"} fill className="object-cover" priority />
                            </div>
                        )}

                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/50">
                            <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-8 prose-li:text-gray-700 prose-strong:text-brand-primary">
                                {content ? (
                                    renderContent(content)
                                ) : (
                                    <p className="text-gray-500 italic">No content available.</p>
                                )}
                            </article>

                            {blog?.meta?.keyword && (
                                <div className="flex flex-wrap items-center gap-2 pt-8 mt-10 border-t border-gray-200/50">
                                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Tag size={16} className="text-brand-primary" /> Tags:</span>
                                    {blog.meta.keyword.split(",").slice(0, 6).map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-brand-primary/10 hover:text-brand-primary transition cursor-pointer border border-gray-200/50">#{tag.trim()}</span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-200/50">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-800 flex items-center gap-2"><Share2 size={20} className="text-brand-primary" /> Share:</span>
                                    <div className="flex gap-2">
                                        {shareLinks.map(({ Icon, color, label, url }, i) => (
                                            <a
                                                key={i}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Share on ${label}`}
                                                className={`w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 ${color} hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg bg-white/50`}
                                            >
                                                <Icon size={16} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </motion.div>

                    <aside className="space-y-6 lg:sticky lg:top-24 self-start">
                        {allBlogs?.length > 0 && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 shadow-xl border border-white/50 mt-20">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Clock size={20} className="text-brand-primary" /> Recent Posts</h3>
                                <div className="space-y-4">
                                    {allBlogs.filter(item => item.slug !== blog?.slug).slice(0, 4).map((item) => (
                                        <Link href={`/blogs/${item.slug}`} key={item.id} className="group flex gap-4 p-3 rounded-2xl hover:bg-blue-50/50 transition-all">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md">
                                                <Image src={process.env.NEXT_PUBLIC_SITE_URL + (item?.featured_image || "/logo.png")} alt={item?.featured_image_alt || "blog"} fill className="object-cover group-hover:scale-110 transition duration-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-base leading-5 group-hover:text-brand-primary transition line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500"><CalendarDays size={12} className="text-brand-primary" /> {item.published_at}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {blog?.category?.name && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 shadow-xl border border-white/50">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Tag size={20} className="text-brand-primary" /> Categories</h3>
                                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100/50 hover:border-brand-primary/20 transition">
                                    <span className="text-gray-700 font-medium flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />{blog.category.name}</span>
                                    <span className="text-xs bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full font-semibold">{allBlogs?.filter(b => b.category?.name === blog.category.name).length || 1}</span>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </section>
    );
}