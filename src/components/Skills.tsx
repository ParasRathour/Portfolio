import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Sparkles, Filter, Database, Terminal, ShieldAlert, Cpu } from "lucide-react";
import { SKILLS_DATA } from "../data";

export default function Skills() {
  const [skillFilter, setSkillFilter] = useState("");

  const categorizedSkills = useMemo(() => {
    return SKILLS_DATA.map((cat) => {
      const filtered = cat.skills.filter((s) =>
        s.toLowerCase().includes(skillFilter.toLowerCase())
      );
      return {
        ...cat,
        skills: filtered,
        hasMatches: filtered.length > 0
      };
    });
  }, [skillFilter]);

  // Total matching count
  const matchCount = useMemo(() => {
    return categorizedSkills.reduce((sum, cat) => sum + cat.skills.length, 0);
  }, [categorizedSkills]);

  // Map categories to visual helper icons
  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("lang")) return <Terminal className="text-sky-500" size={16} />;
    if (lower.includes("frame")) return <Cpu className="text-emerald-500" size={16} />;
    if (lower.includes("database")) return <Database className="text-amber-500" size={16} />;
    if (lower.includes("os") || lower.includes("operating")) return <ShieldAlert className="text-rose-500" size={16} />;
    return <Sparkles className="text-blue-500" size={16} />;
  };

  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-200/40 dark:border-zinc-900/40"
    >
      <div id="skills-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="skills-heading-flex" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div id="skills-titles">
            <h2 id="skills-tag" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase">
              Capabilities
            </h2>
            <p id="skills-main-head" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
              Technical Stack & Tools
            </p>
            <p id="skills-sub" className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm sm:text-base max-w-xl">
              An inventory of languages, frameworks, protocols, and tooling acquired through computer science academic and industry workloads.
            </p>
          </div>

          {/* Quick Realtime Filter Box */}
          <div id="skills-search-wrapper" className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Filter skills instantly..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-150 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Real-time Filter Count Feedback */}
        {skillFilter && (
          <div id="skills-filter-feedback" className="mb-6 flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Filter size={12} />
            <span>Found <span className="font-bold text-zinc-950 dark:text-white">{matchCount}</span> matching skill{matchCount !== 1 ? "s" : ""} across {categorizedSkills.filter(c => c.hasMatches).length} categories.</span>
          </div>
        )}

        {/* Categories Bento Grid */}
        <div id="skills-bento-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categorizedSkills.map((cat, catIdx) => {
            if (skillFilter && !cat.hasMatches) return null;
            return (
              <motion.div
                id={`skills-cat-card-${catIdx}`}
                key={cat.category}
                layout
                className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 p-5 rounded-2xl flex flex-col shadow-xs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: catIdx * 0.04 }}
              >
                {/* Category Header */}
                <div id={`skills-cat-header-${catIdx}`} className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-4 shrink-0">
                  <div id={`skills-cat-icon-wrap-${catIdx}`} className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-lg">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-zinc-800 dark:text-zinc-100">
                    {cat.category}
                  </h3>
                </div>

                {/* Tags container */}
                <div id={`skills-cat-tags-${catIdx}`} className="flex flex-wrap gap-2 flex-1 items-start content-start">
                  {cat.skills.map((skill) => {
                    const isQueried = skillFilter && skill.toLowerCase().includes(skillFilter.toLowerCase());
                    return (
                      <motion.span
                        id={`skill-tag-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          isQueried
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold dark:bg-amber-500/20 dark:text-amber-300"
                            : "bg-zinc-50 text-zinc-600 border-zinc-200/60 hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:text-white"
                        }`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Empty State for Filters */}
        {matchCount === 0 && skillFilter && (
          <div id="skills-no-results" className="text-center py-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl mt-4">
            <span className="text-zinc-400 font-mono text-xs">No matching skills found. Try searching for "Python", "Docker", etc.</span>
          </div>
        )}

      </div>
    </section>
  );
}
