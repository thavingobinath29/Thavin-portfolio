"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/animations/variants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 text-left"
        >
          <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
            Work Showcase
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Featured Projects
          </h2>
        </motion.div>

        {/* Project cards vertical grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
