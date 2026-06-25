"use client";
import React, { useState } from "react";
import CareerModal from "./careerModal";
import Link from "next/link";

const CareerCTA = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Become an Agent</h3>
                <p className="mb-4">
                    Join our agent network and help students find the right
                    programs.
                </p>
                <Link
                    href="/about"
                    className="inline-block px-4 py-2 bg-brand-accent text-white rounded-md"
                >
                    Learn More
                </Link>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Career Opportunity</h3>
                <p className="mb-4">
                    Check current openings and apply to join our team.
                </p>
                <button
                    onClick={() => setOpen(true)}
                    className="inline-block px-4 py-2 bg-brand-primary text-white rounded-md"
                >
                    View Openings
                </button>
            </div>
            <CareerModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default CareerCTA;
