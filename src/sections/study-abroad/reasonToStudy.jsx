"use client";
import Heading from "@/components/heading";
import { motion } from "motion/react";
import {
    GraduationCap,
    Briefcase,
    Heart,
    Globe,
    Wallet,
    Building2,
} from "lucide-react";
import Image from "next/image";
import { reasonFadeUp } from "@/animation/animation";

const cards = [
    {
        icon: GraduationCap,
        side: "left",
    },
    {
        icon: Globe,
        side: "right",
    },
    {
        icon: Briefcase,
        side: "left",
    },
    {
        icon: Wallet,
        side: "right",
    },
    {
        icon: Heart,
        side: "left",
    },
    {
        icon: Building2,
        side: "right",
    },
];

export default function ReasonToStudy({ reason }) {
    if (!reason) return null;
    const {
        section_title,
        section_description,
        settings = {},
        elements = [],
    } = reason;

    const mergedCard = elements.map((element, idx) => ({
        ...element,
        title: element.element_title,
        desc: element.element_body || element.desc,
        icon: cards[idx % cards.length]?.icon || GraduationCap,
        side: idx % 2 === 0 ? "left" : "right",
    }));

    const leftMergedCard = mergedCard.filter((c) => c.side === "left");
    const rightMergedCard = mergedCard.filter((c) => c.side === "right");

    return (
        <div className="w-full flex items-start justify-center bg-foreground py-10 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl">
                <Heading
                    title={section_title}
                    color={true}
                    subtitle={settings?.subtitle}
                />

                <div className="flex flex-col md:flex-row items-center gap-8 ">
                    <div
                        className="text-white md:w-6/12 w-full text-lg"
                        dangerouslySetInnerHTML={{
                            __html: section_description,
                        }}
                    />
                    <div className="md:w-6/12 w-full">
                        <Image
                            src={settings?.section_image || "/study_abroad/study-bg.webp"}
                            className="rounded-2xl"
                            alt="country image"
                            height={1000}
                            width={1000}
                        />
                    </div>
                </div>

                {/* Desktop View: Grid with 3 columns (Left Cards, Image, Right Cards) */}
                {/* <div className="hidden lg:grid grid-cols-3 gap-5 xl:gap-6 items-center mb-10">
                    <div className="flex flex-col gap-4 xl:gap-5">
                        {leftMergedCard.map((card, i) => (
                            <CardItem
                                key={card.id || card.title || i}
                                card={card}
                                delay={0.2 + i * 0.1}
                                borderSide="left"
                            />
                        ))}
                    </div>

                    <div className="overflow-hidden h-110">
                        <Image
                            src={settings?.section_image}
                            alt={section_title || "Reason to study"}
                            className="w-full h-full rounded-4xl object-cover"
                            width={1000}
                            height={1000}
                        />
                    </div>

                    <div className="flex flex-col gap-4 xl:gap-5">
                        {rightMergedCard.map((card, i) => (
                            <CardItem
                                key={card.id || card.title || i}
                                card={card}
                                delay={0.2 + i * 0.1}
                                borderSide="right"
                            />
                        ))}
                    </div>
                </div>

                {/* Tablet View: Grid with 2 columns */}
                {/* <div className="hidden sm:flex lg:hidden flex-col gap-8 mb-10">
                    <div className="grid grid-cols-2 gap-4">
                        {mergedCard.map((card, i) => (
                            <CardItem
                                key={card.id || card.title || i}
                                card={card}
                                delay={0.1 + i * 0.07}
                                borderSide="left"
                            />
                        ))}
                    </div>
                </div> */}

                {/* Mobile View: Vertical list */}
                {/* <div className="flex flex-col gap-5 sm:hidden mb-8">
                    {mergedCard.map((card, i) => (
                        <CardItem
                            key={card.id || card.title || i}
                            card={card}
                            delay={0.08 + i * 0.06}
                            borderSide="left"
                        />
                    ))}
                </div>  */}
            </div>
        </div>
    );
}

function CardItem({ card, delay }) {
    const Icon = card.icon;
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            variants={reasonFadeUp}
            custom={delay * 10}
            whileHover={{
                y: -3,
                boxShadow: "0 8px 28px rgba(45,106,79,0.13)",
            }}
            className="flex items-start border border-brand-accent bg-brand-primary gap-3 sm:gap-4 rounded-2xl p-4 sm:p-5 cursor-default w-full"
        >
            <div className="shrink-0 flex items-center justify-center rounded-xl bg-brand-accent shadow-lg p-2">
                <Icon
                    size={25}
                    className="text-brand-contrast"
                    strokeWidth={2}
                />
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-lg mb-1 text-brand-contrast leading-snug">
                    {card.element_title}
                </h3>
                {card.element_body && (
                    <div
                        className="text-xs sm:text-sm text-gray-300 leading-relaxed prose max-w-none prose-p:my-0 text-left"
                        dangerouslySetInnerHTML={{ __html: card.element_body }}
                    />
                )}
            </div>
        </motion.div>
    );
}
