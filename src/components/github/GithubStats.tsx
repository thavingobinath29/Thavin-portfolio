"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Folder, GitCommit, ArrowUpRight } from "lucide-react";
import { GithubStats as GithubStatsType } from "@/lib/github";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { fadeUp, staggerContainer } from "@/animations/variants";

function StatCounter({ value }: { value: number }) {
  const { count, ref } = useCounterAnimation(value, 1.5);
  return <span ref={ref}>{count}</span>;
}

export default function GithubStats({ stats }: { stats: GithubStatsType }) {
  return (
    <section
      id="github-stats"
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
            Telemetry
          </span>
          <h2 className="section-title text-[#111827] dark:text-[#FAFAFA] mt-1">
            GitHub Analytics
          </h2>
        </motion.div>

        {/* 4 Stat Cards Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Repositories", value: stats.publicRepos, icon: <Folder size={16} /> },
            { label: "Total Stars", value: stats.totalStars, icon: <Star size={16} /> },
            { label: "Commits (Recent)", value: stats.recentCommits, icon: <GitCommit size={16} /> },
            { label: "Pull Requests", value: stats.pullRequests, icon: <GitBranch size={16} /> },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-5 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] flex flex-col justify-between"
            >
              <div className="text-[#6B7280] dark:text-[#A1A1AA] mb-4 flex items-center justify-between">
                <span className="text-[12px] font-medium">{stat.label}</span>
                <span className="text-[#2563EB]/80 dark:text-[#3B82F6]/80">{stat.icon}</span>
              </div>
              <span className="text-3xl font-semibold tracking-tight text-[#111827] dark:text-[#FAFAFA]">
                <StatCounter value={stat.value} />
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Language Split Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] mb-12"
        >
          <h3 className="text-sm font-semibold text-[#111827] dark:text-[#FAFAFA] mb-4">
            Language Distribution
          </h3>

          {/* Combined Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-black/[0.05] dark:bg-white/[0.05] mb-6">
            {stats.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Language Pills with dots */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {stats.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: lang.color }}
                  className="w-2.5 h-2.5 rounded-full"
                />
                <span className="text-[12px] font-semibold text-[#111827] dark:text-[#FAFAFA]">
                  {lang.name}
                </span>
                <span className="text-[12px] text-[#6B7280] dark:text-[#71717A]">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pinned Repository Showcase */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] dark:text-[#FAFAFA] mb-6">
            Showcase Repositories
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.pinnedRepos.map((repo, idx) => (
              <motion.a
                key={idx}
                variants={fadeUp}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-card bg-[#FFFFFF] dark:bg-[#111827] border border-black/[0.06] dark:border-white/[0.07] hover:border-[#2563EB]/25 dark:hover:border-[#3B82F6]/25 transition-all duration-300 flex flex-col select-none"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[14px] font-bold text-[#111827] dark:text-[#FAFAFA] tracking-tight group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                    {repo.name}
                  </h4>
                  <ArrowUpRight
                    size={14}
                    className="text-[#6B7280] dark:text-[#71717A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
                
                <p className="text-[12px] text-[#6B7280] dark:text-[#A1A1AA] line-clamp-3 mb-6 leading-relaxed">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" />
                    {repo.language}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
                    <Star size={11} className="text-amber-500 fill-amber-500/20" />
                    {repo.stars}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
