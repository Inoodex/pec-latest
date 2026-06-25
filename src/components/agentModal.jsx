"use client";
import AgentForm from "@/components/agentForm";
import Link from "next/link";
import { useState } from "react";

const AgentModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="max-w-6xl mt-10 py-10 mx-auto text-center rounded-2xl p-6 bg-foreground">
                <h1 className="md:text-5xl text-3xl text-white font-semibold mb-5">
                    Career Oppurtunity
                </h1>
                <div className="md:text-base text-sm prose text-gray-200 max-w-3xl mx-auto prose-p:my-0 mb-6">
                    Partner with us and expand your business with Global Study
                    &amp; Migration’s reliable education and immigration
                    services.
                </div>
                <Link
                    className="px-6 py-2 rounded-md bg-white text-brand-primary"
                    href={"/career"}
                >
                    Explore Oppurtunity
                </Link>
                {/* <div className="flex items-center justify-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="px-6 py-2 rounded-md bg-white text-brand-primary"
                    >
                        Explore Opportunities
                    </button>
                </div> */}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl mx-auto">
                        <div className="rounded-xl shadow-lg p-4 max-h-[90vh] overflow-y-auto scroll-none">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute h-9 w-9 text-white flex items-center justify-center top-25 right-8 z-50 bg-white/80 dark:bg-black/20 rounded-full p-2"
                            >
                                ✕
                            </button>
                            <div className="pt-6">
                                <AgentForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AgentModal;
