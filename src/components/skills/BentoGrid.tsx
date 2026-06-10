"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";

export default function BentoGrid() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {skillsData.map((category) => (
        <motion.div
          key={category.category}
          variants={cardVariants}
          className="p-5 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#2563EB]/30 dark:hover:border-[#3B82F6]/30 hover:bg-[#F3F4F6] dark:hover:bg-[#161B27]"
        >
          {/* Category Label */}
          <span className="label-text text-[10px] font-semibold text-[#6B7280] dark:text-[#71717A] tracking-wider block mb-4">
            {category.category}
          </span>

          {/* Skill Pills Container */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] text-[#111827] dark:text-[#FAFAFA]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" />
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
