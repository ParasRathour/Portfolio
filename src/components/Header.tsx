import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Terminal, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Open Source", href: "#github-showcase" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="header-flex" className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            id="header-logo-link"
            href="#home"
            className="flex items-center gap-2 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div id="header-logo-icon" className="p-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-lg group-hover:rotate-6 transition-transform">
              <Terminal size={18} />
            </div>
            <span id="header-logo-text" className="font-display font-medium text-lg leading-none text-zinc-900 dark:text-zinc-50 tracking-tight">
              paras<span className="text-zinc-500 font-normal">.dev</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                id={`nav-link-${index}`}
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Actions: Socials, Theme, Mobile toggle */}
          <div id="header-actions" className="flex items-center gap-3">
            {/* Quick social links on desktop */}
            <div id="desktop-socials" className="hidden lg:flex items-center gap-2 mr-2">
              <a
                id="social-github-header"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer referrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                id="social-linkedin-header"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer referrer"
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>

            {/* Light/Dark Toggle */}
            <motion.button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
              aria-label="Toggle visual theme"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 5, opacity: 0, rotate: 45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -5, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 5, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
              aria-label="Toggle navigational menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            className="md:hidden fixed inset-x-0 top-[60px] bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div id="mobile-menu-inner" className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  id={`mobile-nav-${link.label}`}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div id="mobile-socials-divider" className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-around">
                <a
                  id="mobile-github"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  id="mobile-linkedin"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
