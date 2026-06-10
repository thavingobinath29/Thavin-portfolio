"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { timelineItems } from "@/data/timeline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(line, { scaleY: 1 });
      gsap.set(".timeline-item", { opacity: 1, x: 0 });
      return;
    }

    // Scroll line draw animation
    const lineAnim = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      }
    );

    // Timeline items scroll reveal
    const itemTriggers: ScrollTrigger[] = [];
    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    
    items.forEach((item) => {
      const anim = gsap.fromTo(
        item,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      if (anim.scrollTrigger) {
        itemTriggers.push(anim.scrollTrigger);
      }
    });

    return () => {
      lineAnim.scrollTrigger?.kill();
      itemTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-24 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
            History
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Experience Timeline
          </h2>
        </div>

        {/* Timeline Path & Grid */}
        <div className="relative pl-8 md:pl-12 max-w-2xl">
          {/* Vertical Base Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-black/[0.08] dark:bg-white/[0.08]" />

          {/* Vertical Active Scroll Line */}
          <div
            ref={lineRef}
            className="absolute left-[15px] top-2 bottom-2 w-[1.5px] bg-[#2563EB] dark:bg-[#3B82F6] origin-top scale-y-0"
            style={{ willChange: "transform" }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col space-y-12">
            {timelineItems.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative flex flex-col items-start select-none"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-[-24px] md:left-[-28px] top-1.5 z-10 flex items-center justify-center">
                  {item.isFuture ? (
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]" />
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-[#2563EB] dark:border-[#3B82F6] bg-[#F8F9FB] dark:bg-[#09090B] transition-colors" />
                  )}
                </div>

                {/* Milestone Detail Card */}
                <div className="flex flex-col">
                  {/* Year Tag */}
                  <span className="text-[12px] font-semibold text-[#2563EB] dark:text-[#3B82F6] tracking-wide mb-1">
                    {item.year}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-[15px] font-semibold text-[#111827] dark:text-[#FAFAFA] tracking-tight mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] leading-relaxed text-[#6B7280] dark:text-[#A1A1AA]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
