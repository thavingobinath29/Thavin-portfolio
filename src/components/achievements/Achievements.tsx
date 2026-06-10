"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, BookOpen, Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

interface Achievement {
  title: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    title: "District Level Cricket",
    description: "Represented the district cricket team as a player and leader, developing strong communication skills and teamwork dynamics under high-pressure matches.",
    badge: "Sports & Leadership",
    icon: <Trophy className="text-[#3B82F6]" size={20} />,
  },
  {
    title: "NPTEL Elite x2",
    description: "Achieved double Elite status certifications from Indian Institutes of Technology (IIT) in core technical subjects: Java Programming and Cloud Computing.",
    badge: "Academic Excellence",
    icon: <BookOpen className="text-[#3B82F6]" size={20} />,
  },
  {
    title: "UI/UX Design Projects",
    description: "Designed multi-view application projects in Figma, prioritizing interactive micro-animations, color logic, responsive architectures, and pixel-perfect guidelines.",
    badge: "Creative Engineering",
    icon: <Layers className="text-[#3B82F6]" size={20} />,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 text-left"
        >
          <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
            Recognitions
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Achievements
          </h2>
        </motion.div>

        {/* 3-Column Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/25 dark:hover:border-[#3B82F6]/25 select-none"
            >
              {/* Header Icon + Subtle Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
                  {item.icon}
                </div>
                <span className="text-[9px] font-bold text-[#6B7280] dark:text-[#71717A] tracking-wider uppercase border border-black/[0.05] dark:border-white/[0.05] px-2.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.02]">
                  {item.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-bold tracking-tight text-[#111827] dark:text-[#FAFAFA] mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[12.5px] leading-relaxed text-[#6B7280] dark:text-[#A1A1AA]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
