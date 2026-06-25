"use client";
import { Citrus, Leaf, Palette, Sparkles, ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";

const themeOptions = [
    {
        name: "arrow",
        icon: ChevronLeft,
    },
    {
        name: "blue",
        label: "Blue",
        icon: Palette,
        swatchClass: "bg-blue-500",
    },
    {
        name: "green",
        label: "Green",
        icon: Leaf,
        swatchClass: "bg-green-500",
    },
    {
        name: "orange",
        label: "Orange",
        icon: Citrus,
        swatchClass: "bg-orange-500",
    },
    {
        name: "purple",
        label: "Purple",
        icon: Sparkles,
        swatchClass: "bg-purple-500",
    },
];

const ToggleButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    if (!mounted) return null;

    return (
        <motion.div
            animate={{
                x: isOpen ? 0 : 145,
                opacity: isOpen ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed -right-10 top-1/2 -translate-1/2 z-50"
        >
            <div
                className="flex items-center gap-1 rounded-full border border-brand-primary bg-brand-primary p-1 shadow-md backdrop-blur-2xl"
                aria-label="Choose color theme"
            >
                {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = theme === option.name;

                    return (
                        <button
                            key={option.name}
                            type="button"
                            onClick={() => setTheme(option.name)}
                            className={`relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white transition-all hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                                isActive
                                    ? "bg-brand-primary shadow-sm hover:bg-brand-primary"
                                    : "bg-transparent"
                            }`}
                            title={option.label}
                            aria-label={`Use ${option.label} theme`}
                            aria-pressed={isActive}
                        >
                            <Icon size={17} />
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};
export default ToggleButton;
