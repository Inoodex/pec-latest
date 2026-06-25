"use client";

import { ExternalLink, MapPin, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaymentForm from "./paymentForm";

const UniversityHero = ({ university }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-foreground px-4 text-white md:py-20 py-10">
            <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl border border-white/15 bg-brand-primary shadow-2xl backdrop-blur">
                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="flex min-h-full h-20 items-center justify-center bg-white/10 p-5">
                        <Image
                            src={university.logo}
                            alt={university.name}
                            height={1000}
                            width={1000}
                            className="w-full object-cover rounded-2xl"
                        />
                    </div>

                    <div className="p-6 md:p-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-gray-100">
                            <MapPin size={15} />
                            {university.location}
                        </span>

                        <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
                            Overview {university.name}
                        </h2>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: university?.desc,
                            }}
                            className="mt-4 text-base leading-7 text-white/80 md:text-lg"
                        />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <Link
                                href={"/contact"}
                                className="rounded-2xl border border-white/15 bg-brand-accent p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-semibold">
                                    {university.tuition || "Contact Us"}
                                </h2>
                                <span className="mt-1 block text-xs text-gray-200">
                                    Tuition Fee
                                </span>
                            </Link>

                            <div className="rounded-2xl border border-white/15 bg-brand-accent p-6 shadow-lg">
                                <h2 className="text-2xl font-semibold">
                                    {university.students || "Available"}
                                </h2>
                                <span className="mt-1 block text-xs text-gray-200">
                                    Students
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-accent px-6 py-4 font-medium text-white shadow-lg transition hover:bg-brand-accent/80"
                            >
                                <MessageCircle size={18} />
                                Get Guidance
                            </button>

                            <Link
                                href={university.url}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-medium text-brand-primary transition hover:bg-gray-100"
                            >
                                Visit University <ExternalLink size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
                    <button
                        type="button"
                        aria-label="Close modal"
                        className="absolute inset-0 cursor-default"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-brand-primary p-5 text-white shadow-2xl md:p-8">
                        <button
                            type="button"
                            aria-label="Close modal"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-brand-primary transition hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <PaymentForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniversityHero;
