"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import HeroCanvas from "./HeroCanvas";
import MagneticButton from "../ui/MagneticButton";
import { fadeUp } from "@/animations/variants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".hero-char", { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    // GSAP character animation
    gsap.fromTo(
      ".hero-char",
      {
        y: 60,
        opacity: 0,
        rotateX: -40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        ease: "expo.out",
        duration: 1.5,
        delay: 0.2,
      }
    );
  }, []);

  const nameText = "THAVIN G P";
  const nameChars = nameText.split("");

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8F9FB] dark:bg-[#09090B] px-6 md:px-12 lg:px-24"
    >
      {/* 3D Canvas Background */}
      <HeroCanvas />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-4xl flex flex-col items-start select-none mt-16">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase border border-black/[0.06] dark:border-white/[0.08] bg-[#F8F9FB]/90 dark:bg-[#111827]/90 text-[#6B7280] dark:text-[#A1A1AA] mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]"></span>
          </span>
          Available for opportunities
        </motion.div>

        {/* Name Header with split text animation */}
        <h1
          ref={nameRef}
          className="hero-name flex flex-wrap text-[#111827] dark:text-[#FAFAFA] mb-4 perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          {nameChars.map((char, index) => {
            if (char === " ") {
              return (
                <span key={index} className="w-4 md:w-6 inline-block">
                  &nbsp;
                </span>
              );
            }
            return (
              <span
                key={index}
                className="hero-char inline-block origin-bottom transform-gpu"
                style={{ display: "inline-block", willChange: "transform, opacity" }}
              >
                {char}
              </span>
            );
          })}
        </h1>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-2xl font-semibold tracking-tight text-[#1D4ED8] dark:text-[#3B82F6] mb-6"
          style={{ transitionDelay: "0.6s" }}
        >
          Software Developer & AI Engineering Student
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="body-text max-w-xl text-[#4B5563] dark:text-[#A1A1AA] mb-10"
          style={{ transitionDelay: "0.8s" }}
        >
          Currently pursuing B.Tech in Artificial Intelligence & Data Science in Tamil Nadu, India.
          I specialize in crafting high-performance, responsive web interfaces, system tooling,
          and researching intelligent user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 1 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center px-6 rounded-small bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-[#FAFAFA] text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              View Projects
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-11 items-center justify-center px-6 rounded-small border border-black/[0.15] dark:border-white/[0.08] bg-transparent hover:bg-black/[0.05] dark:hover:bg-white/[0.04] text-[#111827] dark:text-[#FAFAFA] text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              Download Resume
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 z-10 flex flex-col items-center gap-3"
      >
        <span className="label-text text-[#6B7280] dark:text-[#71717A] text-[9px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="w-[1px] h-14 bg-black/[0.12] dark:bg-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1D4ED8] dark:bg-[#3B82F6] animate-scroll-line" />
        </div>
      </motion.div>
    </section>
  );
}
