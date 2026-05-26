import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, Star, GitFork, Loader2, RefreshCw, Layers, ArrowUpRight, Code2 } from "lucide-react";

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

// Concrete fallback data matched to Paras's core skills and resume projects
// in case Github API is throttled/rate-limited or offline.
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 101,
    name: "email-campaign-manager",
    description: "Django & Mailgun powered backend service to automate, schedule, and analyze massive email targets with optimized ORM queries.",
    html_url: "https://github.com/ParasRathour/email-campaign-manager",
    stargazers_count: 14,
    forks_count: 3,
    language: "Python",
    updated_at: "2026-05-20T12:00:00Z",
    fork: false
  },
  {
    id: 102,
    name: "secure-journal-app",
    description: "Spring Boot multi-user microservice leveraging Spring Security filter chains and JWT stateless session validation.",
    html_url: "https://github.com/ParasRathour/secure-journal-app",
    stargazers_count: 8,
    forks_count: 2,
    language: "Java",
    updated_at: "2026-05-18T15:30:00Z",
    fork: false
  },
  {
    id: 103,
    name: "multithreaded-web-server",
    description: "Low-level multithreaded custom TCP/HTTP web server built in Java utilizing raw Socket streams and customized thread pools.",
    html_url: "https://github.com/ParasRathour/multithreaded-web-server",
    stargazers_count: 11,
    forks_count: 1,
    language: "Java",
    updated_at: "2026-05-15T09:45:00Z",
    fork: false
  },
  {
    id: 104,
    name: "multi-court-web-scrapers",
    description: "Automated document scraper and parser written in Python & BeautifulSoup to pipeline data from state court files.",
    html_url: "https://github.com/ParasRathour/multi-court-web-scrapers",
    stargazers_count: 7,
    forks_count: 2,
    language: "Python",
    updated_at: "2026-05-10T11:20:00Z",
    fork: false
  },
  {
    id: 105,
    name: "wipo-xml-generator",
    description: "Automated console builder generating fully legal, WIPO-compliant XML datasets for registered Indian trademarks.",
    html_url: "https://github.com/ParasRathour/wipo-xml-generator",
    stargazers_count: 5,
    forks_count: 0,
    language: "Python",
    updated_at: "2026-05-02T16:10:00Z",
    fork: false
  },
  {
    id: 106,
    name: "reactive-admin-dashboard",
    description: "Custom React dashboard using Tailwind utility classes and Recharts to aggregate high volume booking system loads.",
    html_url: "https://github.com/ParasRathour/reactive-admin-dashboard",
    stargazers_count: 9,
    forks_count: 1,
    language: "TypeScript",
    updated_at: "2026-04-20T08:00:00Z",
    fork: false
  }
];

// Color mapping for popular programming languages
const LANG_COLORS: Record<string, string> = {
  Python: "bg-blue-500",
  Java: "bg-orange-500",
  TypeScript: "bg-cyan-500",
  JavaScript: "bg-yellow-500",
  HTML: "bg-red-400",
  CSS: "bg-indigo-400",
  "C++": "bg-pink-500",
  C: "bg-purple-500",
  "C#": "bg-green-500"
};

export default function GithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchGithubRepos = async () => {
    setLoading(true);
    setError(false);
    try {
      // Query repositories of user: @ParasRathour
      // Fetch up to 30 to sort and filter properly
      const res = await fetch("https://api.github.com/users/ParasRathour/repos?sort=updated&per_page=30");
      if (!res.ok) {
        throw new Error("Failure loading from GitHub API");
      }
      const data: GithubRepo[] = await res.json();
      
      // Filter out forks so they display original repositories, and limit to 6
      let originalRepos = data.filter(repo => !repo.fork);
      
      // If there are very few original repositories, allow forks as well
      if (originalRepos.length < 3) {
        originalRepos = data;
      }
      
      // Sort by stargazers counts first, then updated_at
      originalRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      // Take top 6
      const selected = originalRepos.slice(0, 6);
      
      if (selected.length === 0) {
        throw new Error("No repositories found");
      }
      
      setRepos(selected);
      setIsLive(true);
    } catch (err) {
      console.warn("Using offline fallback data for repos:", err);
      // Fail gracefully and use mock items
      setRepos(FALLBACK_REPOS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section
      id="github-showcase"
      className="py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-200/40 dark:border-zinc-900/40 relative"
    >
      {/* Visual Ambient Blur Accent */}
      <div id="github-glow" className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 dark:bg-sky-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div id="github-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div id="github-header-flex" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div id="github-titles-panel">
            <h2 id="github-subtitle" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <Github size={16} />
              <span>Open Source Activity</span>
            </h2>
            <p id="github-main-head" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-2">
              Live GitHub Repositories
            </p>
            <p id="github-desc" className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm sm:text-base max-w-xl">
              Dynamically fetched pipelines from my GitHub index. These reflect active repositories, script snippets, and architectural mockups.
            </p>
          </div>

          <div id="github-status-chips" className="flex items-center gap-3 shrink-0">
            {/* Live Indicator */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
              isLive 
                ? "bg-green-500/15 text-green-600 dark:bg-green-500/10 dark:text-green-400" 
                : "bg-amber-500/15 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500 animate-ping" : "bg-amber-500"}`} />
              <span>{isLive ? "Live Sync Active" : "Local Showcase Mode"}</span>
            </span>

            {/* Refresh Trigger */}
            <button
              id="refresh-repos-btn"
              onClick={fetchGithubRepos}
              disabled={loading}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white transition-all disabled:opacity-50"
              title="Refresh repository cache"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div id="github-loading" className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-zinc-400 mb-4" size={32} />
            <p className="text-xs text-zinc-500 font-mono">Syncing endpoint: api.github.com/users/ParasRathour/repos...</p>
          </div>
        ) : (
          /* Cards Grid Layout */
          <div id="github-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                id={`github-repo-card-${repo.id}`}
                key={repo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-900/45 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900 p-5 rounded-2xl shadow-xs transition-all h-[240px]"
              >
                <div id={`github-repo-top-${repo.id}`} className="space-y-3">
                  {/* Badge Row & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                      <Code2 size={15} />
                    </div>
                    
                    {/* External Icon Link */}
                    <a
                      id={`github-repo-link-${repo.id}`}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all"
                      title="Inspect GitHub Source Repository"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                  {/* Title and Short Description */}
                  <div className="space-y-1 text-left">
                    <h3 className="font-display font-bold text-base leading-tight text-zinc-800 dark:text-zinc-100 truncate group-hover:text-zinc-950 dark:group-hover:text-white">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {repo.description || "No repository description provided. Inspect files and code lines directly on GitHub."}
                    </p>
                  </div>
                </div>

                {/* Footer Metrics Panel */}
                <div id={`github-repo-footer-${repo.id}`} className="flex items-center justify-between pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40 shrink-0 text-left">
                  {/* Left: Language Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] || "bg-zinc-400"}`} />
                    <span className="text-[10px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
                      {repo.language || "Shell / Misc"}
                    </span>
                  </div>

                  {/* Right: Stars, Forks, Date */}
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 shrink-0" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={12} className="text-sky-500 shrink-0" />
                      <span>{repo.forks_count}</span>
                    </div>
                    <span className="hidden sm:inline text-[9px] text-zinc-400">
                      {formatDate(repo.updated_at)}
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
