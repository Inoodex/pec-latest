"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { animate, inView } from "motion";

const Scoreboard = ({ scoreObject, title, subtitle }) => {
    const refs = useRef([]);
    const globalScore = [
        {
            id: 1,
            score: scoreObject?.first?.score || "",
            text: scoreObject?.first?.text || "",
        },
        {
            id: 2,
            score: scoreObject?.second?.score || "",
            text: scoreObject?.second?.text || "",
        },
        {
            id: 3,
            score: scoreObject?.third?.score || "",
            text: scoreObject?.third?.text || "",
        },
        {
            id: 4,
            score: scoreObject?.fouth?.score || "",
            text: scoreObject?.fouth?.text || "",
        },
    ];

    useEffect(() => {
        refs.current.forEach((el, idx) => {
            if (!el) return;
            const raw = globalScore[idx]?.score || "";
            const m = raw.match(/(\d+)(.*)/);
            if (!m) return;
            const target = parseInt(m[1], 10);
            const suffix = m[2] || "";

            inView(
                el,
                () => {
                    animate(0, target, {
                        duration: 1.4,
                        onUpdate(value) {
                            el.textContent = `${Math.round(value)}${suffix}`;
                        },
                    });
                },
                { once: false, amount: 0.5 },
            );
        });
    }, []);
    return (
        <section className="md:py-20 py-10 bg-foreground">
            {subtitle && (
                <div className="max-w-7xl mx-auto px-6 mb-5 md:mb-10 text-center">
                    <h2 className="text-black/60 uppercase bg-black/10 w-fit mx-auto px-4 py-2 rounded-full tracking-widest text-sm font-bold">
                        Global clients
                    </h2>
                </div>
            )}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-brand-contrast text-center text-3xl px-5 md:px-20 md:text-5xl font-semibold"
            >
                {title}
            </motion.h1>
            <section className="grid md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                {globalScore.map((score, idx) => (
                    <section key={score.id} className="text-center mt-8">
                        <h2
                            ref={(el) => (refs.current[idx] = el)}
                            className="text-6xl font-bold text-brand-contrast"
                        >
                            0
                        </h2>
                        <div
                            className="text-lg font-medium mt-2 text-brand-contrast/80"
                            dangerouslySetInnerHTML={{
                                __html: score.text,
                            }}
                        />
                    </section>
                ))}
            </section>
        </section>
    );
};

export default Scoreboard;
