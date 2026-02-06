"use client";

import { motion } from "framer-motion";
import { useStyle } from "@/context/StyleContext";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
    const { activeStyle } = useStyle();

    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const getStyleVariants = () => {
        switch (activeStyle) {
            case "MINIMAL":
                return {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
                };
            case "BRUTALIST":
                return {
                    initial: { opacity: 0, x: -50 },
                    animate: { opacity: 1, x: 0, transition: { duration: 0, delay } }, // Instant
                };
            case "EDITORIAL":
                return {
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay } }, // Elegant ease
                };
            case "CINEMATIC":
                return {
                    initial: { opacity: 0, scale: 1.1, filter: "blur(5px)" },
                    animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 2, ease: "easeInOut", delay } }, // Slow focus
                };
            case "CLASSIC":
                return {
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay } },
                };
            default:
                return variants;
        }
    };

    return (
        <motion.div
            className={className}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-10%" }}
            variants={getStyleVariants()}
        >
            {children}
        </motion.div>
    );
}
