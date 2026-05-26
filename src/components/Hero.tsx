import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check, Terminal, Play, Sparkles, Code2, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"python" | "java">("python");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const pythonCode = `class SoftwareDeveloper:
    def __init__(self):
        self.name = "${PERSONAL_INFO.name}"
        self.specialties = ["Django", "Scalable REST APIs", "Web Scrapers"]
        self.databases = ["PostgreSQL", "MySQL", "Oracle PL/SQL"]
        self.core_tools = ["Docker", "Git", "Celery", "Redis"]

    def run_build(self):
        return {
            "status": "Production Ready",
            "message": "Delivering high-throughput socket threads and clean systems."
        }

developer = SoftwareDeveloper()
print(developer.run_build()["message"])`;

  const javaCode = `package com.paras.portfolio;

import org.springframework.stereotype.Component;

@Component
public class SystemsEngineer {
    private final String name = "${PERSONAL_INFO.name}";
    private final String[] stack = {"Spring Boot", "JWT Security", "Multithreading"};

    public String execute() {
        return "Loaded " + stack.length + " Core Spring Modules. Socket listening on Port 3000.";
    }
}`;

  const handleRunCode = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalOutput(["$ init compile-pipeline", "Fetching environment credentials...", "Generating target structures..."]);

    setTimeout(() => {
      setTerminalOutput((prev) => [...prev, "Checking thread boundaries...", "Linking memory buffers..."]);
    }, 600);

    setTimeout(() => {
      if (activeTab === "python") {
        setTerminalOutput((prev) => [
          ...prev,
          "✔ Compilation completed successfully.",
          "",
          "Output:",
          "Delivering high-throughput socket threads and clean systems.",
          "",
          "Session closed. Exit code: 0"
        ]);
      } else {
        setTerminalOutput((prev) => [
          ...prev,
          "✔ Compilation completed successfully.",
          "",
          "Output:",
          "Loaded 3 Core Spring Modules. Socket listening on Port 3000.",
          "",
          "Session closed. Exit code: 0"
        ]);
      }
      setIsCompiling(false);
    }, 1300);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-zinc-50 dark:bg-zinc-950 transition-colors overflow-hidden"
    >
      {/* Decorative background grid and ambient glows */}
      <div id="hero-grid-pattern" className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] opacity-50" />
      
      {/* Dynamic blurred orbs */}
      <div id="hero-orb-light" className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-sky-200/40 dark:bg-sky-950/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div id="hero-orb-dark" className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[300px] h-[300px] bg-amber-200/30 dark:bg-amber-950/15 rounded-full filter blur-[100px] pointer-events-none" />

      <div id="hero-content-container" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div id="hero-responsive-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Landing Copy Column */}
          <div id="hero-text-col" className="lg:col-span-7 space-y-8">
            
            {/* Tagline Indicator */}
            <motion.div
              id="hero-tagline-wrapper"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
              <span id="hero-tagline-text" className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
                Open to Software Engineering Opportunities
              </span>
            </motion.div>

            {/* Headline and Title */}
            <div id="hero-headings" className="space-y-4">
              <motion.h1
                id="hero-fullname"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Hi, I'm <span className="text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-8 decoration-4">{PERSONAL_INFO.name}</span>
              </motion.h1>
              <motion.p
                id="hero-subtitle"
                className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {PERSONAL_INFO.title}
              </motion.p>
              <motion.p
                id="hero-summary"
                className="max-w-2xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {PERSONAL_INFO.summary}
              </motion.p>
            </div>

            {/* Interactive Clipboard and Call to action buttons */}
            <motion.div
              id="hero-actions-container"
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                id="hero-action-contact"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-xl font-medium shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </a>
              <a
                id="hero-action-projects"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Browse Projects
              </a>
            </motion.div>

            {/* Micro details panel: Quick copies */}
            <motion.div
              id="hero-copies-grid"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Copy Email Card */}
              <div
                id="copy-email-card"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs"
              >
                <div id="copy-email-meta" className="overflow-hidden mr-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">EMAIL</p>
                  <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 truncate">{PERSONAL_INFO.email}</p>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Copy Phone Card */}
              <div
                id="copy-phone-card"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs"
              >
                <div id="copy-phone-meta" className="overflow-hidden mr-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">TELEPHONE</p>
                  <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 truncate">{PERSONAL_INFO.phone}</p>
                </div>
                <button
                  id="copy-phone-btn"
                  onClick={handleCopyPhone}
                  className="p-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Interactive IDE Mockup Column */}
          <div id="hero-ide-col" className="lg:col-span-5 h-[480px] lg:h-[500px]">
            <motion.div
              id="hero-ide-card"
              className="w-full h-full flex flex-col bg-[#0d0d10] text-[#cfd2d9] rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden font-mono text-xs text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Header Bar */}
              <div id="ide-header-bar" className="flex items-center justify-between px-4 py-3 bg-[#131317] border-b border-zinc-900">
                {/* Traffic elements */}
                <div id="ide-traffic-dots" className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                {/* Visual tabs tab strip */}
                <div id="ide-tab-handles" className="flex items-center gap-1">
                  <button
                    id="ide-tab-python"
                    onClick={() => { setActiveTab("python"); setTerminalOutput([]); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "python" ? "bg-[#1d1d24] text-white font-medium" : "text-zinc-500 hover:bg-[#1d1d24]/55"
                    }`}
                  >
                    <Code2 size={12} className="text-yellow-500" />
                    <span>paras.py</span>
                  </button>
                  <button
                    id="ide-tab-java"
                    onClick={() => { setActiveTab("java"); setTerminalOutput([]); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === "java" ? "bg-[#1d1d24] text-white font-medium" : "text-zinc-500 hover:bg-[#1d1d24]/55"
                    }`}
                  >
                    <Cpu size={12} className="text-orange-500" />
                    <span>SystemsEngineer.java</span>
                  </button>
                </div>
                {/* Action build toggle */}
                <button
                  id="ide-run-btn"
                  onClick={handleRunCode}
                  disabled={isCompiling}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider font-bold bg-green-500 hover:bg-green-400 text-black rounded-md shadow-xs active:scale-95 transition-all disabled:opacity-50"
                  title="Execute module"
                >
                  <Play size={10} fill="black" />
                  <span>Run</span>
                </button>
              </div>

              {/* Editor Code Area */}
              <div id="ide-code-scroll" className="flex-1 p-4 overflow-y-auto leading-relaxed bg-[#0d0d10] font-mono text-[11px] sm:text-xs">
                {activeTab === "python" ? (
                  <pre id="code-content-python" className="text-zinc-300">
                    <span className="text-pink-400">class</span> <span className="text-blue-400">SoftwareDeveloper</span>:
                    {"\n"}    <span className="text-pink-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-400">self</span>):
                    {"\n"}        <span className="text-orange-400">self</span>.name = <span className="text-emerald-400">"{PERSONAL_INFO.name}"</span>
                    {"\n"}        <span className="text-orange-400">self</span>.specialties = [<span className="text-emerald-400">"Django"</span>, <span className="text-emerald-400">"Scalable REST APIs"</span>]
                    {"\n"}        <span className="text-orange-400">self</span>.databases = [<span className="text-emerald-400">"PostgreSQL"</span>, <span className="text-emerald-400">"MySQL"</span>]
                    {"\n"}        <span className="text-orange-400">self</span>.core_tools = [<span className="text-emerald-400">"Docker"</span>, <span className="text-emerald-400">"Git"</span>, <span className="text-emerald-400">"Celery"</span>]
                    {"\n"}
                    {"\n"}    <span className="text-pink-400">def</span> <span className="text-blue-400">run_build</span>(<span className="text-orange-400">self</span>):
                    {"\n"}        <span className="text-pink-400">return</span> {"{"}
                    {"\n"}            <span className="text-emerald-400">"status"</span>: <span className="text-emerald-400">"Production Ready"</span>,
                    {"\n"}            <span className="text-emerald-400">"message"</span>: <span className="text-emerald-400">"Delivering high-throughput socket threads."</span>
                    {"\n"}        {"}"}
                    {"\n"}
                    {"\n"}developer = <span className="text-blue-400">SoftwareDeveloper</span>()
                    {"\n"}print(developer.run_build()[<span className="text-emerald-400">"message"</span>])
                  </pre>
                ) : (
                  <pre id="code-content-java" className="text-zinc-300">
                    <span className="text-pink-400">package</span> com.paras.portfolio;
                    {"\n"}
                    {"\n"}<span className="text-pink-400">import</span> org.springframework.stereotype.Component;
                    {"\n"}
                    {"\n"}<span className="text-orange-400">@Component</span>
                    {"\n"}<span className="text-pink-400">public class</span> <span className="text-blue-400">SystemsEngineer</span> {"{"}
                    {"\n"}    <span className="text-pink-400">private final</span> String name = <span className="text-emerald-400">"{PERSONAL_INFO.name}"</span>;
                    {"\n"}    <span className="text-pink-400">private final</span> String[] stack = {"{"}<span className="text-emerald-400">"Spring Boot"</span>, <span className="text-emerald-400">"JWT"</span>, <span className="text-emerald-400">"Multithreading"</span>{"}"};
                    {"\n"}
                    {"\n"}    <span className="text-pink-400">public</span> String <span className="text-blue-400">execute</span>() {"{"}
                    {"\n"}        <span className="text-pink-400">return</span> <span className="text-emerald-400">"Loaded "</span> + stack.length + <span className="text-emerald-400">" Core Spring Modules. Sockets listening."</span>;
                    {"\n"}    {"}"}
                    {"\n"}{"}"}
                  </pre>
                )}
              </div>

              {/* Terminal Logs Output */}
              <div id="ide-terminal-area" className="h-[140px] bg-[#07070a] border-t border-zinc-900 p-3 font-mono text-[10px] leading-tight text-zinc-400 overflow-y-auto">
                {terminalOutput.length === 0 ? (
                  <div id="terminal-idle" className="flex items-center gap-1.5 text-zinc-600 h-full justify-center">
                    <Terminal size={12} />
                    <span>Click 'Run' to execute code and see runtime logs</span>
                  </div>
                ) : (
                  <div id="terminal-stream" className="space-y-1">
                    {terminalOutput.map((log, i) => (
                      <p
                        id={`terminal-log-${i}`}
                        key={i}
                        className={
                          log.startsWith("✔") || log.startsWith("Output:")
                            ? "text-green-400"
                            : log.startsWith("$")
                            ? "text-blue-400"
                            : "text-zinc-400"
                        }
                      >
                        {log}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
