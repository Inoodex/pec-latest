import { Dot } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function QuickLink({ blocks, variant = "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  const dotColor = variant === "light" ? "#FFF" : "#000";
  
  return (
    <motion.div 
      className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300`}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      {blocks.map((block, index) => (
        <div key={block.id} className="flex items-center gap-2">
          <Link
            href={block.link_url || "/"}
            className={`${textColor} text-nowrap text-base md:text-lg font-medium tracking-wide hover:tracking-wider transition-all duration-300 relative group`}
          >
            {block.section_title}
            {/* Creative underline */}
            <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full group-hover:left-0 transition-all duration-500 ease-in-out"></span>
          </Link>
          
          {index < blocks.length - 1 && (
            <motion.div
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Dot 
                stroke={dotColor} 
                size={5} 
                strokeWidth={20} 
                className="opacity-50"
              />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}