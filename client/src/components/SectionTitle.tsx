import type { SectionTitleProps } from "../types";
import { motion } from "motion/react";

/**
 * SectionTitle - Reusable animated section header with three parts:
 * 1. A pink badge/pill (text1)
 * 2. A large heading (text2)
 * 3. A subtitle/description (text3)
 * Each element animates in from below using spring physics on scroll.
 */
export default function SectionTitle({ text1, text2, text3 }: SectionTitleProps) {
    return (
        <>
            {/* Badge pill */}
            <motion.p className="text-center font-medium text-pink-600 mt-28 px-10 py-2 rounded-full bg-pink-950/70 border border-pink-800 w-max mx-auto"
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                {text1}
            </motion.p>
            {/* Main heading */}
            <motion.h3 className="text-3xl font-semibold text-center mx-auto mt-4"
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                {text2}
            </motion.h3>
            {/* Subtitle description */}
            <motion.p className="text-slate-300 text-center mt-2 max-w-xl mx-auto"
                initial={{ y: 120, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                {text3}
            </motion.p>
        </>
    );
}