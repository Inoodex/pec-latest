"use client";
import { useState } from "react";
import CareerModal from "@/components/careerModal";
import AgentForm from "@/components/agentForm";

const Career = () => {
    const [open, setOpen] = useState(false);
    const [agentOpen, setAgentOpen] = useState(false);

    return (
        <div className="md:py-20 py-10 pt-30 bg-gray-100 min-h-screen flex items-center text-center">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="bg-brand-contrast backdrop-blur-sm text-brand-contrast rounded-2xl p-8">
                        <h2 className="text-3xl text-slate-900 font-bold mb-3">
                            Become an Agent
                        </h2>
                        <p className="mb-6 text-slate-700">
                            Partner with us to grow your business — get
                            exclusive access to leads, marketing support, and
                            partner benefits. Join our network of trusted
                            education consultants.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setAgentOpen(true)}
                                className="bg-brand-accent px-5 py-2 text-white rounded-xl text-lg hover:bg-brand-primary duration-300 cursor-pointer"
                            >
                                Explore Opportunities
                            </button>
                        </div>
                    </div>

                    <div className="bg-brand-contrast backdrop-blur-sm rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">
                            Career Opportunity
                        </h2>
                        <p className="text-slate-700 mb-6">
                            {`We're`} hiring passionate people — check current
                            openings and apply to join our team. We value
                            ambition, professionalism, and a drive to help
                            students succeed.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-brand-accent px-5 py-2 text-white rounded-xl text-lg hover:bg-brand-primary duration-300 cursor-pointer"
                            >
                                View Openings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CareerModal open={open} onClose={() => setOpen(false)} />

            {agentOpen && (
                <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setAgentOpen(false)}
                    />
                    <div className="relative w-full max-w-3xl mx-auto">
                        <div className="rounded-xl shadow-lg max-h-[90vh] overflow-y-auto scroll-none bg-white">
                            <button
                                onClick={() => setAgentOpen(false)}
                                className="absolute h-9 w-9 text-gray-700 flex items-center justify-center top-4 right-4 z-50 bg-white rounded-full p-2"
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
        </div>
    );
};

export default Career;
