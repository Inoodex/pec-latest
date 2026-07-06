"use client";
import AgentForm from "@/components/agentForm";
import Link from "next/link";
import { useState } from "react";

const AgentModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="max-w-6xl mt-16 md:mt-20 lg:mt-24 mx-auto text-center rounded-2xl p-6 md:p-10 bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] shadow-2xl border border-white/5 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                        Career <span className="text-brand-primary">Opportunity</span>
                    </h1>
                    
                    <div className="w-20 h-1 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto rounded-full mb-5"></div>
                    
                    <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed mb-7">
                        Partner with us and expand your business with Global Study
                        &amp; Migration's reliable education and immigration
                        services.
                    </p>
                    
                    <Link
                        className="inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 hover:scale-105"
                        href={"/career"}
                    >
                        Explore Opportunity
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    
                    {/* Modal Container */}
                    <div className="relative w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
                        <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 z-10 bg-[#1a1a2e] px-6 py-4 border-b border-white/10 rounded-t-2xl flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Apply Now</h3>
                                    <p className="text-xs text-gray-400">Fill the form to get started</p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-6 md:p-8">
                                <AgentForm />
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-3 border-t border-white/10 bg-black/20 rounded-b-2xl">
                                <p className="text-xs text-center text-gray-500">
                                    By submitting, you agree to our{" "}
                                    <Link href="/terms" className="text-brand-primary hover:underline">
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AgentModal;