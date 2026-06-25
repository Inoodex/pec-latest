"use client";
import { useEffect, useRef } from "react";
import { animate, inView } from "motion/react";
import Heading from "@/components/heading";

const GlobalClients = ({ statistics }) => {
  const { section_title } = statistics.blocks[0];
  const elements = statistics.blocks[0].elements;
  const refs = useRef([]);
  const globalScore = elements;

  useEffect(() => {
    refs.current.forEach((el, idx) => {
      if (!el) return;
      const raw = globalScore[idx]?.element_title;
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
    <section className="md:py-20 py-10 bg-gray-100">
      <Heading
        title={statistics.title}
        color={false}
        subtitle={section_title}
      />
      <section className="grid md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {globalScore.map((score, idx) => (
          <section key={score.id} className="text-center mt-8">
            <h2
              ref={(el) => (refs.current[idx] = el)}
              className="text-6xl font-bold text-brand-primary"
            >
              0
            </h2>
            <div
              className="text-lg font-medium mt-2 text-center text-brand-primary/80 prose max-w-none prose-p:my-0"
              dangerouslySetInnerHTML={{
                __html: score?.element_body,
              }}
            />
          </section>
        ))}
      </section>
    </section>
  );
};

export default GlobalClients;
