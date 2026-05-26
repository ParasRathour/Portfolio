import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GithubRepos from "./components/GithubRepos";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { Terminal, Github, Linkedin, Mail, Heart } from "lucide-react";
import { PERSONAL_INFO } from "./data";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("paras_theme");
      if (stored) {
        return stored === "dark";
      }
    } catch (e) {
      // Ignored
    }
    // Default to dark theme for that sleek dev portfolio aesthetic
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem("paras_theme", isDark ? "dark" : "light");
    } catch (e) {
      // Ignored
    }

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      id="app-root-wrapper"
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? "dark bg-zinc-950 text-zinc-300" : "bg-zinc-50 text-zinc-600"
      }`}
    >
      {/* Floating Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main id="main-content-flow" className="relative">
        <Hero />
        <Experience />
        <Projects />
        <GithubRepos />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Modern Developer Footer */}
      <footer
        id="site-footer"
        className="py-12 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors"
      >
        <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="footer-flex" className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left label & icon */}
            <div id="footer-left" className="flex items-center gap-2">
              <div id="footer-dec" className="p-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-md">
                <Terminal size={14} />
              </div>
              <span id="footer-logo-text" className="font-display font-medium text-sm text-zinc-900 dark:text-white">
                paras<span className="text-zinc-500 font-normal">.dev</span>
              </span>
            </div>

            {/* Middle Copyright */}
            <div id="footer-middle" className="text-center text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <span>© {new Date().getFullYear()} Paras Rathour. Built with precision and</span>
              <Heart size={10} className="text-red-500 animate-pulse fill-red-500" />
            </div>

            {/* Right External Handles */}
            <div id="footer-right" className="flex items-center gap-4">
              <a
                id="footer-github"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer referrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="GitHub Profiles"
              >
                <Github size={16} />
              </a>
              <a
                id="footer-linkedin"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer referrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="LinkedIn Network"
              >
                <Linkedin size={16} />
              </a>
              <a
                id="footer-email"
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Send Direct Email"
              >
                <Mail size={16} />
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
