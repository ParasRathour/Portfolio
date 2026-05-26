import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, TrendingUp, Sparkles, Code } from "lucide-react";
import { EXPERIENCE_DATA } from "../data";

export default function Experience() {
  const [selectedId, setSelectedId] = useState(EXPERIENCE_DATA[0].id);

  const selectedRole = EXPERIENCE_DATA.find((item) => item.id === selectedId) || EXPERIENCE_DATA[0];

  return (
    <section
      id="experience"
      className="py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-105/40 dark:border-zinc-900/40 relative overflow-hidden"
    >
      {/* Decorative side badge */}
      <div id="experience-glow" className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-emerald-100/30 dark:bg-emerald-950/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div id="experience-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div id="experience-heading-wrapper" className="max-w-2xl mb-16">
          <h2 id="experience-section-title" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase">
            Professional Timeline
          </h2>
          <p id="experience-section-main-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-2">
            Relevant Engineering Internships
          </p>
          <p id="experience-section-desc" className="text-zinc-500 dark:text-zinc-400 mt-4 text-sm sm:text-base">
            Hands-on backend development, web automation, data engineering, and custom API creation. Click on a role to inspect engineering details.
          </p>
        </div>

        {/* Layout Grid */}
        <div id="experience-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Company Selector Tab Rail (cols-span-4) */}
          <div id="experience-tabs-rail" className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 border-b border-zinc-200 lg:border-b-0 dark:border-zinc-800 lg:border-r lg:border-zinc-200/50 lg:dark:border-zinc-800/50 lg:pr-6 whitespace-nowrap lg:whitespace-normal">
            {EXPERIENCE_DATA.map((item) => {
              const isActive = item.id === selectedId;
              return (
                <button
                  id={`exp-btn-${item.id}`}
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`flex items-start text-left gap-3.5 px-4 lg:px-5 py-3 lg:py-4 rounded-xl transition-all relative ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  {/* Underlay selector logic */}
                  {isActive && (
                    <motion.div
                      id={`exp-active-indicator-${item.id}`}
                      className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-white rounded-r-full hidden lg:block"
                      layoutId="exp-active-sidebar"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <Briefcase size={16} className={`mt-0.5 shrink-0 transition-colors ${isActive ? "text-zinc-950 dark:text-white" : "text-zinc-400"}`} />
                  <div id={`exp-btn-text-${item.id}`} className="leading-tight shrink overflow-hidden max-w-full">
                    <p className="text-sm font-semibold truncate lg:whitespace-normal">
                      {item.company.includes(" (") ? item.company.split(" (")[0] : item.company.split(" / ")[0]}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.role}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Job Details Terminal View (cols-span-8) */}
          <div id="experience-detail-viewer" className="lg:col-span-8 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                id={`exp-detail-card-${selectedRole.id}`}
                key={selectedRole.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 rounded-2xl p-6 sm:p-8 shadow-xs"
              >
                {/* Meta Header */}
                <div id="exp-detail-meta" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div id="exp-meta-left">
                    <h3 id="exp-selected-role" className="font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {selectedRole.role}
                    </h3>
                    <p id="exp-selected-company" className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mt-1 flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedRole.company}</span>
                    </p>
                  </div>
                  <div id="exp-meta-right" className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 w-fit shrink-0">
                    <Calendar size={13} className="text-zinc-400" />
                    <span>{selectedRole.period}</span>
                  </div>
                </div>



                {/* Detailed bullet list */}
                <div id="exp-detail-bullets" className="mt-6 space-y-4">
                  <p className="text-[11px] font-mono tracking-wider font-bold text-zinc-400 uppercase">Core Responsibilities & Impact</p>
                  <ul id="exp-bullets-list" className="space-y-3.5">
                    {selectedRole.points.map((point, i) => (
                      <motion.li
                        id={`exp-bullet-${selectedRole.id}-${i}`}
                        key={i}
                        className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Sparkles size={14} className="text-zinc-400 mt-1 shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies tag group */}
                <div id="exp-tech-tags" className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-[11px] font-mono tracking-wider font-bold text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
                    <Code size={12} />
                    <span>Skills Utilized</span>
                  </p>
                  <div id="exp-skills-flex" className="flex flex-wrap gap-1.5">
                    {selectedRole.skills.map((skill) => (
                      <span
                        id={`exp-skill-tag-${skill}`}
                        key={skill}
                        className="px-2.5 py-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-300 text-xs font-mono rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
