"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        {/* Header (Outer stagger anchor) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-12 text-left"
        >
          <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
            About Me
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Personal Profile
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column: Styled Placeholder Image */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[300px] aspect-[4/5] rounded-largeCard overflow-hidden border border-black/[0.08] dark:border-white/[0.08] group transition-all duration-500 ease-out hover:scale-[1.02] shadow-md dark:shadow-none">
              {/* Blue gradient ring on hover */}
              <div className="absolute inset-0 rounded-largeCard border border-[#3B82F6]/0 group-hover:border-[#3B82F6]/40 transition-colors duration-500 pointer-events-none z-10" />
              <Image
                src="/profile.jpg"
                alt="Thavin G P — Software Developer & AI Engineering Student"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 90vw, 300px"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column: Bio details */}
          <motion.div variants={fadeUp} className="flex flex-col space-y-6">
            <p className="body-text text-[#6B7280] dark:text-[#A1A1AA]">
              I am a Software Developer and AI Engineering Student based in Tamil Nadu, India.
              My development philosophy focuses on building premium interfaces that load fast,
              feel intuitive, and feature strict design alignments.
            </p>
            <p className="body-text text-[#6B7280] dark:text-[#A1A1AA]">
              Having high curiosity for artificial intelligence integrations, I bridge the gap
              between raw data science models and pixel-perfect customer interfaces. I love building
              side-projects, writing clean typescript, and learning computer architectures.
            </p>

            {/* Education Card */}
            <div className="p-5 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] transition-all duration-300 hover:border-black/[0.12] dark:hover:border-white/[0.15]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-[14px] font-semibold text-[#111827] dark:text-[#FAFAFA]">
                  B.Tech Artificial Intelligence & Data Science
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wide">
                  CGPA: 7.8+
                </span>
              </div>
              <p className="text-[12px] text-[#6B7280] dark:text-[#A1A1AA]">
                Anna University Affiliated Institution
              </p>
              <p className="text-[11px] text-[#9CA3AF] dark:text-[#71717A] mt-2">
                2023 – 2027
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
