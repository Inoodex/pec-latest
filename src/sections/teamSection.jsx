"use client";
import Image from "next/image";
// import CEOIMG from "@/images/ceo.webp"

// import { useEffect, useRef, useState } from "react";
// import {
//     motion,
//     useAnimationFrame,
//     useMotionValue,
//     useTransform,
// } from "motion/react";
import Heading from "@/components/heading";

const TeamSection = ({ officials }) => {
  // const baseX = useMotionValue(0);
  // const [isHovered, setIsHovered] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const directionFactor = useRef(1);
  // const containerRef = useRef(null);
  // const [contentWidth, setContentWidth] = useState(0);

  // useEffect(() => {
  //     if (containerRef.current) {
  //         const singleSet = containerRef.current.children[0];
  //         if (singleSet) {
  //             setContentWidth(singleSet.offsetWidth);
  //         }
  //     }
  // }, []);

  // const x = useTransform(baseX, (v) => {
  //     if (!contentWidth) return "0px";
  //     const wrapValue =
  //         (((v % contentWidth) + contentWidth) % contentWidth) - contentWidth;
  //     return `${wrapValue}px`;
  // });

  // useAnimationFrame((t, delta) => {
  //     if (isHovered || isDragging || !contentWidth) return;

  //     let moveBy = directionFactor.current * 100 * (delta / 1000);
  //     baseX.set(baseX.get() + moveBy);
  // });

  // const handlePanEnd = (e, info) => {
  //     setIsDragging(false);
  //     if (
  //         info.velocity.x > 0 ||
  //         (info.velocity.x === 0 && info.offset.x > 0)
  //     ) {
  //         directionFactor.current = 1;
  //     } else {
  //         directionFactor.current = -1;
  //     }
  // };

  console.log(officials);

  return (
    <section className="bg-foreground w-full">
      {/* Message of CEO Section */}
     <section className="px-4">
  <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#4aaf6c]/20 to-[#1b4329]/10 mt-15 rounded-3xl overflow-hidden border border-[#4aaf6c]/20 shadow-2xl transition-all duration-300">
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-8 lg:gap-10 px-6 md:px-10 lg:px-12 py-10 md:py-14">
      
      {/* Content - Left Side */}
      <div className="space-y-5 lg:pr-4">
        <div className="inline-block">
          <span className="text-brand-primary text-sm font-semibold uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full">
            Leadership
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
          Message From The <br />
          <span className="text-white">CEO & Founder</span>
        </h3>

        <div className="h-1 w-20 bg-brand-primary rounded-full"></div>

        <p className="text-gray-300 leading-7 text-base md:text-lg font-medium text-justify lg:text-left">
          Welcome to PEC EDU GLOBAL. We are honored to be a trusted
          partner in shaping the academic aspirations and global ambitions
          of future leaders. At the core of our mission lies a commitment
          to excellence, integrity, and personalized guidance, ensuring
          that each student receives comprehensive support throughout
          their international education journey. Through our expertise,
          strategic partnerships, and student-centric approach, we strive
          to provide access to world-class educational opportunities while
          simplifying the complexities of studying abroad. Our dedication
          extends beyond admissions; we aim to inspire confidence, nurture
          potential, and empower students to achieve their academic and
          professional aspirations. We sincerely appreciate the trust
          placed in us by students, families, and institutional partners,
          and we remain steadfast in our pursuit of innovation, quality
          service, and educational excellence. Together, we will continue
          to transform aspirations into achievements and create pathways
          to a future without boundaries.
        </p>

        <div className="pt-3 border-t border-white/10">
          <h4 className="font-bold text-2xl text-white">
            Md. Rafiqul Islam
          </h4>
          <p className="text-white font-semibold text-lg mt-.08">
            Founder & CEO
          </p>
        </div>
      </div>

      {/* CEO Image - Right Side */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
          <img
            src="/images/ceo.webp"
            alt="CEO"
            width={660}
            height={460}
            className="relative rounded-2xl shadow-2xl object-cover border-4 border-white/20 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ width: '520px', height: '560px' }}
          />
        </div>
      </div>
      
    </div>
  </div>
</section>
      {/* Our Team Section  */}
      <section className="w-full mx-auto md:py-20 py-10 overflow-hidden relative">
        <Heading
          subtitle="Officials"
          title="Our Team"
          paragraph="At PECEDU GLOBAL, our success is driven by a team of dedicated professionals with a shared commitment to student achievement and service excellence."
        />
        {/* officials section old */}
        {/* <div
                    className="hidden lg:block w-full relative mt-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-15 lg:w-70 h-full bg-linear-to-r from-foreground to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-15 lg:w-70 bg-linear-to-l from-foreground to-transparent z-10 pointer-events-none"></div>
                    <motion.div
                        ref={containerRef}
                        className="flex w-max cursor-grab active:cursor-grabbing touch-pan-y py-0"
                        style={{ x }}
                        onPanStart={() => setIsDragging(true)}
                        onPan={(e, info) => {
                            baseX.set(baseX.get() + info.delta.x);
                        }}
                        onPanEnd={handlePanEnd}
                    >
                        {[1, 2, 3, 4, 5].map((set) => (
                            <section
                                key={set}
                                className="flex gap-6 pr-6 shrink-0"
                            >
                                {officials.map((official) => (
                                    <section
                                        key={`${set}-${official.id}`}
                                        className="relative w-75 sm:w-75 h-100 group shrink-0"
                                    >
                                        <section className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105">
                                            <Image
                                                src={
                                                    official?.photo ||
                                                    "/images/classroom.webp"
                                                }
                                                height={400}
                                                width={1000}
                                                className="rounded-3xl h-full shadow-lg object-cover"
                                                alt={
                                                    official.name ||
                                                    "officials photo"
                                                }
                                                draggable={false}
                                            />
                                        </section>
                                        <section
                                            className="absolute inset-0 z-20 rounded-3xl bg-brand-primary/80 p-5 opacity-0 pointer-events-none transform
                                                translate-y-20 group-hover:opacity-100
                                                group-hover:pointer-events-auto backdrop-blur-[10px]
                                                group-hover:translate-y-0 transition-all ease-in-out
                                                duration-1000 flex flex-col justify-center"
                                        >
                                            <div className="text-center">
                                                <h1 className="mt-5 font-medium text-3xl text-brand-contrast">
                                                    {official.name}
                                                </h1>
                                                <p className="mt-3 font-normal text-lg mb-16 text-brand-soft-text">
                                                    {official.designation}
                                                </p>
                                                <h3 className="text-white text-lg font-medium text-left px-2 mb-2">
                                                    Responsibilities
                                                </h3>
                                                <p className="text-gray-300 h-40 text-left text-sm overflow-y-scroll scroll-none px-2">
                                                    {official.content}
                                                </p>
                                            </div>
                                        </section>
                                    </section>
                                ))}
                            </section>
                        ))}
                    </motion.div>
                </div> */}

        {/* officials section new */}
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officials.map((official) => (
              <section
                key={official.id}
                className="group relative h-105 rounded-3xl overflow-hidden shadow-xl"
              >
                <Image
                  src={official?.photo || "/images/classroom.webp"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={official.name || "official photo"}
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
                <div
                  className="
                                            absolute bottom-0 left-0 right-0
                                            p-6

                                            bg-slate-950/70
                                            backdrop-blur-sm


                                            h-27.5
                                            group-hover:h-50

                                            transition-all duration-500

                                            group-hover:bg-linear-to-t
                                            group-hover:from-[#0A2647]/95
                                            group-hover:via-[#144272]/85
                                            group-hover:to-[#205295]/40

                                            overflow-hidden
                                            "
                >
                  <h3
                    className="
                                        text-2xl font-bold text-white
                                        group-hover:text-white
                                        drop-shadow-md
                                    "
                  >
                    {official.name}
                  </h3>

                  <p
                    className="
                                            mt-1 
                                            text-cyan-100
                                            font-medium
                                            "
                  >
                    {official.designation}
                  </p>

                  <div
                    className="
                                                mt-4
                                                opacity-0
                                                translate-y-2

                                                group-hover:opacity-100
                                                group-hover:translate-y-0
                                                transition-all duration-500 
                                                "
                  >
                    <p className="text-slate-100 text-sm leading-relaxed max-h-24 overflow-y-auto pr-2">
                      {official.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* card section
                <div className="lg:hidden mt-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {officials.map((official) => (
                            <section
                                key={official.id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <div className="relative w-full aspect-4/3 bg-gray-100">
                                    <Image
                                        src={
                                            official?.photo ||
                                            "/images/classroom.webp"
                                        }
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover"
                                        alt={official.name || "officials photo"}
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-brand-primary text-2xl font-semibold leading-snug">
                                        {official.name}
                                    </h3>
                                    <p className="mt-1 text-gray-600 font-medium">
                                        {official.designation}
                                    </p>
                                    <div className="mt-2 border-t border-gray-200 pt-2">
                                        <h4 className="text-brand-primary text-base font-semibold">
                                            Responsibilities
                                        </h4>
                                        <p className="mt-2 text-gray-600 text-sm leading-relaxed max-h-10 overflow-y-auto pr-2 scroll-none">
                                            {official.content}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </div> */}
      </section>
    </section>
  );
};

export default TeamSection;
