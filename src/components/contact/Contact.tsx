"use client";

import React from "react";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

interface ContactCard {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}

const contactDetails: ContactCard[] = [
  {
    label: "Email",
    value: "thavingobinath29@gmail.com",
    href: "mailto:thavingobinath29@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/thavin-gobinath",
    href: "https://www.linkedin.com/in/thavin-gobinath-623a8428b",
    icon: <Linkedin size={16} />,
  },
  {
    label: "GitHub",
    value: "github.com/thavingobinath29",
    href: "https://github.com/thavingobinath29",
    icon: <Github size={16} />,
  },
  {
    label: "Location",
    value: "Tamil Nadu, India",
    icon: <MapPin size={16} />,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="pt-24 pb-12 w-full bg-[#F8F9FB] text-[#111827] dark:bg-[#09090B] dark:text-[#FAFAFA] flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Title */}
        <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase mb-3">
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#FAFAFA] mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="body-text text-[#6B7280] dark:text-[#A1A1AA] max-w-sm mb-12">
          Open to internships, collaborations, and full-time opportunities.
        </p>

        {/* Contact Grid (2x2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-20">
          {contactDetails.map((item, idx) => {
            const CardContent = (
              <div className="w-full p-4 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] flex items-center gap-4 text-left transition-all duration-300 hover:border-[#2563EB]/30 dark:hover:border-[#3B82F6]/30 select-none">
                <div className="p-2.5 rounded bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] text-[#2563EB] dark:text-[#3B82F6]">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#71717A] tracking-wider uppercase">
                    {item.label}
                  </span>
                  <span className="text-[13px] font-semibold text-[#111827] dark:text-[#FAFAFA] tracking-tight">
                    {item.value}
                  </span>
                </div>
              </div>
            );

            return (
              <MagneticButton key={idx} className="w-full">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div className="block w-full">{CardContent}</div>
                )}
              </MagneticButton>
            );
          })}
        </div>

        {/* Footer separator line */}
        <div className="w-full h-[0.5px] bg-black/[0.06] dark:bg-white/[0.06] mb-8" />

        {/* Footer text */}
        <footer className="text-[11px] font-medium tracking-wide text-[#6B7280] dark:text-[#71717A] uppercase select-none">
          Designed & Built by Thavin G P · 2026
        </footer>
      </div>
    </section>
  );
}
