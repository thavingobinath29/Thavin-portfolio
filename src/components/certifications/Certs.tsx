"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink } from "lucide-react";
import { certifications, Certification } from "@/data/certifications";
import { fadeUp, staggerContainer } from "@/animations/variants";

export default function Certs() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section
      id="certifications"
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
            Credentials
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            Certifications
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
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              onClick={() => setSelectedCert(cert)}
              className="p-6 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#2563EB]/30 dark:hover:border-[#3B82F6]/30 flex flex-col items-start select-none"
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex w-full items-center justify-between gap-4 mb-5">
                <span className="text-2xl">{cert.icon}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                    cert.badge.type === "elite"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/15"
                      : "bg-[#2563EB]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/15"
                  }`}
                >
                  {cert.badge.text}
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-[14px] font-semibold tracking-tight text-[#111827] dark:text-[#FAFAFA] mb-1 line-clamp-2 min-h-[40px]">
                {cert.name}
              </h3>
              <p className="text-[12px] text-[#6B7280] dark:text-[#A1A1AA] mb-4">
                {cert.issuer}
              </p>

              {/* Action Trigger Link */}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] hover:opacity-85 mt-auto">
                Verify Credential <ExternalLink size={10} />
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Overlay details */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              {/* Modal Card Surface */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-xl w-full bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.08] dark:border-white/[0.08] rounded-largeCard overflow-hidden shadow-2xl p-6 md:p-8 cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#111827] dark:hover:text-[#FAFAFA] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>

                {/* Modal Title Block */}
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-[#2563EB] dark:text-[#3B82F6]" />
                  <span className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                </div>

                <h3 className="text-[18px] font-bold text-[#111827] dark:text-[#FAFAFA] tracking-tight mb-4 pr-8">
                  {selectedCert.name}
                </h3>

                {/* Styled Image Preview */}
                <div className="relative aspect-[1.41/1] w-full rounded-card border border-black/[0.06] dark:border-white/[0.06] bg-[#F3F4F6] dark:bg-[#0d1117] overflow-hidden flex items-center justify-center select-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedCert.previewUrl}
                    alt={selectedCert.name}
                    className="object-cover w-full h-full opacity-95"
                    loading="lazy"
                  />
                  
                  {/* Overlay branding text simulating dynamic cert signature */}
                  <div className="absolute bottom-4 left-4 flex flex-col">
                    <span className="text-[10px] font-bold text-[#111827] dark:text-[#FAFAFA] tracking-wide">
                      ID: {selectedCert.id.toUpperCase()}-2024
                    </span>
                    <span className="text-[8px] text-[#6B7280] dark:text-[#A1A1AA]">
                      ISSUED VIA DIGITAL CREDENTIAL REGISTRY
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
