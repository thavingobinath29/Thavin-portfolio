"use client";

import React, { useEffect, useRef } from "react";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (project.id === "info-hub") {
      // 1. Constellation Network Canvas Animation
      const points: { x: number; y: number; vx: number; vy: number }[] = [];
      const numPoints = 22;

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }

      const draw = () => {
        ctx.fillStyle = "#0d1117";
        ctx.fillRect(0, 0, width, height);

        // Grid plane lines
        ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 25) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw points and lines
        points.forEach((p) => {
          if (!prefersReducedMotion) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
          ctx.fill();
        });

        ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    } else {
      // 2. Bar Chart & Analytics Map Canvas Animation
      const bars = 18;
      const barWidth = 8;
      const barHeights = Array(bars)
        .fill(0)
        .map(() => Math.random() * 90 + 20);
      const targets = [...barHeights];

      const draw = () => {
        ctx.fillStyle = "#0d1117";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        const padding = (width - bars * barWidth) / (bars + 1);

        for (let i = 0; i < bars; i++) {
          if (!prefersReducedMotion && Math.random() < 0.03) {
            targets[i] = Math.random() * 100 + 20;
          }

          if (!prefersReducedMotion) {
            barHeights[i] += (targets[i] - barHeights[i]) * 0.08;
          }

          const x = padding + i * (barWidth + padding);
          const y = height - barHeights[i] - 25;

          const gradient = ctx.createLinearGradient(x, y, x, height);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.55)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          // Draw rounded rectangle for bar elements
          if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, barHeights[i], 3);
          } else {
            ctx.rect(x, y, barWidth, barHeights[i]);
          }
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [project.id]);

  return (
    <div className="group rounded-largeCard bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] overflow-hidden flex flex-col w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[#2563EB]/25 dark:hover:border-[#3B82F6]/25 hover:shadow-2xl dark:hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* 200px Height Canvas Preview Area */}
      <div className="w-full h-[200px] overflow-hidden relative border-b border-black/[0.06] dark:border-white/[0.06]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Card Body with slight lift transition */}
      <div className="p-6 md:p-8 flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {/* Title */}
        <h3 className="text-[20px] font-semibold tracking-tight text-[#111827] dark:text-[#FAFAFA] mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="body-text text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-6">
          {project.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded bg-black/[0.03] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] text-[#6B7280] dark:text-[#A1A1AA]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Tech Badges & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech, idx) => (
              <span
                key={tech}
                className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6] bg-[#2563EB]/5 dark:bg-[#3B82F6]/5 px-2 py-0.5 rounded transition-transform duration-300 transform-gpu group-hover:scale-105"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-black/[0.06] dark:border-white/[0.07] hover:border-black/[0.15] dark:hover:border-white/[0.15] text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#111827] dark:hover:text-[#FAFAFA] transition-colors"
                aria-label="GitHub Repository"
              >
                <Github size={15} />
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="p-2 rounded-full border border-black/[0.06] dark:border-white/[0.07] hover:border-black/[0.15] dark:hover:border-white/[0.15] text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#111827] dark:hover:text-[#FAFAFA] transition-colors"
                aria-label="Case Study"
              >
                <BookOpen size={15} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-small bg-[#111827] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#111827] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Live Demo <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
