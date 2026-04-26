// src/components/animation/SectionReveal.tsx
"use client";
import { motion } from "framer-motion";

export default function SectionReveal({
  children,
  id,
  isRTL = false,
  delay = 0,
}: {
  children: React.ReactNode;
  id?: string;
  isRTL?: boolean;
  delay?: number;
}) {
  const startX = isRTL ? -60 : 60;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, x: startX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}>
      {children}
    </motion.section>
  );
}