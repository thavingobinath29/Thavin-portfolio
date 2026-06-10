"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for X/Y position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configurations for clean return animation
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Avoid running animations if users request reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Center point of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from mouse to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Standard translation with limit of max 8px
    const maxOffset = 8;
    const factorX = distanceX / (width / 2);
    const factorY = distanceY / (height / 2);

    x.set(factorX * maxOffset);
    y.set(factorY * maxOffset);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}
