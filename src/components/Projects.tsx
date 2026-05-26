import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink, Github, Code2, AlertCircle, X, CheckSquare, Layers, HelpCircle } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "../data";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Derive unique categories from project list
  const categories = useMemo(() => {
    const cats = new Set<string>();
    PROJECTS_DATA.forEach((proj) => cats.add(proj.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter projects depending on selected chips and search queries
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        proj.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors border-t border-zinc-200/40 dark:border-zinc-900/40 relative"
    >
      <div id="projects-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="projects-header-flex" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div id="projects-header-left">
            <h2 id="projects-subtitle" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase">
              Showcases
            </h2>
            <p id="projects-main-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-2">
              Featured Work & Systems
            </p>
            <p id="projects-desc" className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm sm:text-base max-w-xl">
              Production-focused backend architecture, high-concurrency custom microservices, and secure APIs. Click any project card to audit the design.
            </p>
          </div>

          {/* Search Box */}
          <div id="projects-search-wrapper" className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              id="projects-search-input"
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-150 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-650 transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Categories Chips Layout */}
        <div id="projects-filter-chips" className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                id={`cat-chip-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold"
                    : "bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Empty State visual */}
        {filteredProjects.length === 0 && (
          <motion.div
            id="projects-empty-state"
            className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={32} className="text-zinc-400 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No projects found</h3>
            <p className="text-xs text-zinc-500 mt-1">Try tweaking your search query or choosing another category</p>
          </motion.div>
        )}

        {/* Filtered Grid */}
        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all h-[360px]"
              >
                {/* Meta details */}
                <div id={`proj-card-top-${project.id}`} className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                  
                  {/* Action Link Icons */}
                  <div className="flex items-center gap-2">
                    <a
                      id={`github-link-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      title="View code template"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>

                <div id={`proj-card-body-${project.id}`} className="mt-4 flex-1 flex flex-col justify-start">
                  <h3 className="font-display font-semibold text-lg text-zinc-900 dark:text-white group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Truncated Points list */}
                  <ul className="space-y-1.5 mt-3.5 flex-1 overflow-hidden">
                    {project.points.slice(0, 2).map((pt, i) => (
                      <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        • {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Skills/Tags listed */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-400 self-center">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Inspect Button */}
                <button
                  id={`proj-inspect-btn-${project.id}`}
                  onClick={() => setActiveProjectModal(project)}
                  className="mt-5 w-full py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Code2 size={13} />
                  <span>Audit Architecture & Challenges</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Immersive Deep-Dive Overlay Case Study Modal */}
        <AnimatePresence>
          {activeProjectModal && (
            <div id="project-audit-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop */}
              <motion.div
                id="modal-backdrop"
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectModal(null)}
              />

              {/* Floating Container */}
              <motion.div
                id={`audit-dialog-${activeProjectModal.id}`}
                className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto z-10 text-left"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
              >
                {/* Close Button */}
                <button
                  id="modal-close-btn"
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 p-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Modal Title Segment */}
                <div id="modal-decor" className="p-6 sm:p-8 pb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-950 px-2.5 py-1 rounded-md">
                    {activeProjectModal.category}
                  </span>
                  <h3 id="modal-title" className="font-display font-bold text-2xl tracking-tight text-zinc-900 dark:text-white mt-3">
                    {activeProjectModal.title}
                  </h3>
                  
                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {activeProjectModal.technologies.map((t) => (
                      <span key={t} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 text-zinc-600 dark:text-zinc-350 text-xs font-mono rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description and Audit sections */}
                <div id="modal-body-scroll" className="p-6 sm:p-8 pt-0 space-y-6">
                  {/* Detailed points list */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-mono tracking-wider font-bold text-zinc-400 uppercase flex items-center gap-1">
                      <CheckSquare size={12} fill="none" className="text-zinc-400" />
                      <span>Key Contributions</span>
                    </p>
                    <ul className="space-y-3">
                      {activeProjectModal.points.map((pt, i) => (
                        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed pl-1">
                          • {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Description */}
                  {activeProjectModal.architectureDetails && (
                    <div className="p-4.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl space-y-2">
                      <p className="text-[11px] font-mono tracking-wider font-bold text-zinc-400 uppercase flex items-center gap-1">
                        <Layers size={12} />
                        <span>Systems & Architecture Audit</span>
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono">
                        {activeProjectModal.architectureDetails}
                      </p>
                    </div>
                  )}

                  {/* Challenges Solved */}
                  {activeProjectModal.challengesSolved && (
                    <div className="p-4.5 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/20 rounded-xl space-y-2">
                      <p className="text-[11px] font-mono tracking-wider font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                        <HelpCircle size={12} />
                        <span>Crucial Engineering Hurdle</span>
                      </p>
                      <p className="text-xs text-zinc-700 dark:text-zinc-350 leading-relaxed font-mono">
                        {activeProjectModal.challengesSolved}
                      </p>
                    </div>
                  )}

                  {/* Footer links inside modal */}
                  <div className="pt-4 flex items-center gap-3">
                    <a
                      id="modal-audit-github"
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 text-xs font-mono font-bold rounded-lg transition-colors"
                    >
                      <Github size={13} />
                      <span>Inspect Scaffold</span>
                    </a>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
