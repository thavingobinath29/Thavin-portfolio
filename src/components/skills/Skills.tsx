"use client";

import React from "react";
import { motion } from "framer-motion";
import BentoGrid from "./BentoGrid";
import { fadeUp } from "@/animations/variants";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-12 text-left"
        >
          <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
            Capabilities
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Technical Skillset
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid />
      </div>
    </section>
  );
}
