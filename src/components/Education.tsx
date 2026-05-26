import { motion } from "motion/react";
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react";
import { EDUCATION_DATA } from "../data";

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors border-t border-zinc-200/40 dark:border-zinc-900/40"
    >
      <div id="education-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div id="education-header" className="max-w-2xl mb-16">
          <h2 id="education-subtitle" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase">
            Academics
          </h2>
          <p id="education-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
            Education Timeline
          </p>
          <p id="education-desc" className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm sm:text-base">
            Formal training in Computer Science Enginnering and foundations in Mathematics & Sciences.
          </p>
        </div>

        {/* Roadmap Display Grid */}
        <div id="education-grid" className="max-w-3xl space-y-8 relative before:absolute before:inset-y-2 before:left-3.5 sm:before:left-6 before:w-[1.5px] before:bg-zinc-200/60 dark:before:bg-zinc-800/60">
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div
              id={`edu-item-box-${edu.id}`}
              key={edu.id}
              className="relative pl-10 sm:pl-16 group"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {/* Timeline Bullet Anchor */}
              <div id={`edu-bullet-${edu.id}`} className="absolute left-0 sm:left-2.5 top-1 w-7.5 h-7.5 bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 group-hover:border-zinc-950 dark:group-hover:border-white group-hover:text-zinc-950 dark:group-hover:text-white transition-all">
                <GraduationCap size={13} />
              </div>

              {/* Course Detail Card */}
              <div id={`edu-card-${edu.id}`} className="p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200/65 dark:border-zinc-800/65 rounded-2xl shadow-xs transition-colors">
                <div id={`edu-card-top-${edu.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  {/* Timeline Badge */}
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg text-xs font-mono text-zinc-500 w-fit shrink-0">
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </span>
                </div>

                {/* Optional description detail or courseworks */}
                <div id={`edu-body-${edu.id}`} className="mt-4 space-y-3.5">
                  {edu.details && (
                    <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                  {edu.coursework && (
                    <div id={`edu-coursework-${edu.id}`} className="flex flex-col gap-1">
                      <p className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase flex items-center gap-1">
                        <BookOpen size={10} />
                        <span>Core Curriculum Focus</span>
                      </p>
                      <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {edu.coursework}
                      </p>
                    </div>
                  )}

                  {/* Recognition tags */}
                  {edu.id === "edu1" && (
                    <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Award size={14} />
                      <span>Currently active 4th-year student in Computer Science</span>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
