"use client";
import { motion } from "motion/react";
import Link from "next/link";
export default function Button({ children, url }) {
     return (
          <motion.div
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.97, y: 0 }}
               transition={{ type: "spring", stiffness: 400, damping: 8 }}
               className="w-fit"
          >
               <Link
                    className="bg-white text-xl hover:bg-brand-accent hover:text-brand-contrast duration-300 text-brand-primary block mt-5 font-medium px-8 py-4 rounded-full shadow-lg cursor-pointer"
                    href={`/${url}`}
               >
                    {children}
               </Link>
          </motion.div>
     );
}
