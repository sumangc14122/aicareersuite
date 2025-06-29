// src/components/AnimatedSection.tsx
"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import React from "react";
// import { clsx } from 'clsx';

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  yOffset?: number;
  duration?: number;
  id?: string; // Added id prop for ToC linking
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  staggerChildren,
  once = true,
  yOffset = 20,
  duration = 0.1,
  id, // Destructure id
  ...rest
}) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
        delay: delay,
        ...(staggerChildren && { staggerChildren: staggerChildren }),
      },
    },
  };

  return (
    <motion.section // Changed back to motion.section for semantic correctness, pass id here
      id={id} // Assign the id to the section
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
