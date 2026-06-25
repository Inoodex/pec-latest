"use client";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function BlogContent() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-[1fr_350px] gap-14">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-none"
                >
                    <div className="relative h-112.5 rounded-3xl overflow-hidden mb-10 shadow-2xl">
                        <Image
                            src="/study_abroad/america.webp"
                            alt="blog image"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-8 text-gray-700 leading-8 text-lg">
                        <p>
                            Studying abroad has become one of the most exciting
                            opportunities for Bangladeshi students. Every year
                            thousands of students choose countries like Canada,
                            Australia, UK, USA and Europe to pursue higher
                            education and build international careers.
                        </p>

                        <h2 className="text-3xl font-bold text-[#0f172a]">
                            Why Students Prefer Studying Abroad
                        </h2>

                        <p>
                            International education opens doors to global
                            opportunities, multicultural experiences, advanced
                            learning systems, and better career growth. Students
                            gain confidence, improve communication skills, and
                            become globally competitive.
                        </p>

                        <div className="relative bg-blue-50 border border-blue-100 rounded-3xl p-8 my-10 overflow-hidden">
                            <Quote className="absolute right-6 top-6 text-blue-200 w-20 h-20" />

                            <h3 className="text-2xl font-semibold text-[#0f172a] leading-relaxed relative z-10">
                                “Education is the passport to the future, for
                                tomorrow belongs to those who prepare for it
                                today.”
                            </h3>
                        </div>

                        <h2 className="text-3xl font-bold text-[#0f172a]">
                            Popular Study Destinations
                        </h2>

                        <p>
                            Canada offers affordable tuition and PR
                            opportunities. The UK provides globally recognized
                            universities. Australia is known for
                            student-friendly policies and work opportunities.
                            European countries attract students with
                            scholarships and cultural diversity.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-10">
                            <div className="relative h-65 rounded-2xl overflow-hidden">
                                <Image
                                    src="/study_abroad/america.webp"
                                    alt="blog"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative h-65 rounded-2xl overflow-hidden">
                                <Image
                                    src="/study_abroad/america.webp"
                                    alt="blog"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-[#0f172a]">
                            Visa & Documentation Process
                        </h2>

                        <p>
                            Students must prepare academic documents, language
                            proficiency test scores, financial proof, SOP,
                            recommendation letters and valid passports before
                            applying for visas. Proper documentation increases
                            visa approval chances significantly.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "University application support",
                                "Scholarship guidance",
                                "Visa documentation",
                                "IELTS preparation",
                                "Accommodation support",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl"
                                >
                                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-10 border-t flex flex-wrap gap-3">
                            {[
                                "Study Abroad",
                                "Student Visa",
                                "Scholarship",
                                "Travel",
                                "Education",
                            ].map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-5 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition cursor-pointer text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-6">
                            <span className="font-semibold text-[#0f172a]">
                                Share Article:
                            </span>

                            <div className="flex gap-3">
                                {[FaFacebook, FaTwitter, FaLinkedin].map(
                                    (Icon, i) => (
                                        <button
                                            key={i}
                                            className="w-11 h-11 rounded-full border hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                                        >
                                            <Icon size={18} />
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <aside className="space-y-8">
                    <div className="bg-linear-to-br from-[#0f172a] to-blue-900 rounded-3xl p-8 text-white">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mb-5">
                            <Image
                                src="/logo.png"
                                alt="author"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="text-2xl font-bold">PECEDU Team</h3>

                        <p className="text-gray-300 mt-3 leading-7">
                            We provide expert guidance for students and
                            travelers looking for international opportunities.
                        </p>

                        <button className="mt-6 px-5 py-3 bg-white text-[#0f172a] rounded-xl font-semibold hover:bg-gray-100 transition">
                            Contact Us
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-7">
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">
                            Recent Posts
                        </h3>

                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <Link
                                    href="#"
                                    key={item}
                                    className="group flex gap-4"
                                >
                                    <div className="relative min-w-22.5 h-22.5 rounded-2xl overflow-hidden">
                                        <Image
                                            src="/study_abroad/america.webp"
                                            alt="blog"
                                            fill
                                            className="object-cover group-hover:scale-110 transition duration-500"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-[#0f172a] leading-6 group-hover:text-blue-600 transition">
                                            UK Student Visa Requirements for
                                            Bangladeshi Students
                                        </h4>

                                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarDays size={14} />
                                            May 10, 2026
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="bg-gray-50 rounded-3xl p-7">
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">
                            Categories
                        </h3>

                        <div className="space-y-4">
                            {[
                                "Study Abroad",
                                "Student Visa",
                                "Scholarships",
                                "Travel Guide",
                                "IELTS Tips",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between group cursor-pointer"
                                >
                                    <span className="group-hover:text-blue-600 transition">
                                        {item}
                                    </span>

                                    <ChevronRight
                                        size={18}
                                        className="group-hover:text-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden h-87.5">
                        <Image
                            src="/study_abroad/america.webp"
                            alt="cta"
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white p-6">
                            <h3 className="text-3xl font-bold leading-tight">
                                Start Your Journey Today
                            </h3>

                            <p className="mt-4 text-gray-200">
                                Get expert consultation and apply with
                                confidence.
                            </p>

                            <button className="mt-6 px-6 py-3 bg-blue-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition">
                                Free Consultation
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
