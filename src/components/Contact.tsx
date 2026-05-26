import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Mail, Phone, MapPin, Trash2, ShieldCheck, Mailbox, Send, Sparkles, FileText, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  textMessage: string;
  timestamp: string;
}

const EMAIL_TEMPLATES = [
  {
    id: "collab",
    label: "Collaboration",
    icon: Sparkles,
    subject: "Project Collaboration Proposal - Paras' Portfolio",
    body: "Hi Paras,\n\nI visited your engineering portfolio and was highly impressed by your experience. I would love to connect and discuss a potential system architecture or web project collaboration with you.\n\nBest regards,\n[Your Name]"
  },
  {
    id: "hiring",
    label: "Hiring / Freelance",
    icon: FileText,
    subject: "Contract Opportunity - Paras' Portfolio",
    body: "Hi Paras,\n\nWe have an exciting project and believe your front-end and full-stack expertise is the perfect fit. Let's connect to discuss terms, scope, and timeline.\n\nBest regards,\n[Your Name]"
  },
  {
    id: "greeting",
    label: "Quick Hello",
    icon: Mail,
    subject: "Short wave from Paras' Portfolio",
    body: "Hi Paras,\n\nI was browsing through your web portfolio and wanted to reach out to say hello. Great design, interactive panels, and clean architecture!\n\nBest regards,\n[Your Name]"
  }
];

export default function Contact() {
  const [directMail, setDirectMail] = useState({
    subject: "Collaboration Proposal - Paras' Portfolio",
    body: "Hi Paras,\n\nI was browsing your engineering portfolio and would love to connect with you regarding an upcoming project idea!\n\nBest regards,\n[Your Name]"
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("collab");

  // Load any existing simulated messages from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("paras_dev_messages");
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage access failed", e);
    }
  }, []);

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

  const handleDirectSend = () => {
    const mailtoSubject = encodeURIComponent(directMail.subject);
    const mailtoBody = encodeURIComponent(directMail.body);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Log to simulated outbox in LocalStorage for client-side feedback
    const logItem: ContactMessage = {
      id: "msg-" + Date.now(),
      senderName: "Direct Mailer Client",
      senderEmail: "direct-route@client",
      subject: directMail.subject,
      textMessage: directMail.body,
      timestamp: new Date().toLocaleString()
    };

    const updated = [logItem, ...savedMessages];
    setSavedMessages(updated);
    try {
      localStorage.setItem("paras_dev_messages", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = savedMessages.filter((m) => m.id !== id);
    setSavedMessages(updated);
    try {
      localStorage.setItem("paras_dev_messages", JSON.stringify(updated));
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-200/40 dark:border-zinc-900/40"
    >
      <div id="contact-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div id="contact-header" className="max-w-2xl mb-16">
          <h2 id="contact-subtitle" className="font-display text-base font-semibold tracking-wider text-zinc-500 uppercase">
            Get In Touch
          </h2>
          <p id="contact-main-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
            Let's Collaborate
          </p>
          <p id="contact-desc" className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            Have an open requirement, project collaboration idea, or question? Pick a template below to draft a direct email, or copy standard contact targets.
          </p>
        </div>

        {/* Layout Split */}
        <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Details Panel (cols-5) */}
          <div id="contact-info-col" className="lg:col-span-5 space-y-8">
            <div id="contact-badge-card" className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
              <h3 className="font-display font-semibold text-zinc-900 dark:text-white mb-2">Primary Contact Methods</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">Click copy triggers to rapidly place addresses onto your clipboard.</p>

              {/* Stack entries */}
              <div className="space-y-4">
                
                {/* Email entry */}
                <div id="contact-email-entry" className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-zinc-650 dark:text-zinc-300">
                      <Mail size={16} />
                    </div>
                    <div className="truncate leading-tight">
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">EMAIL ADDRESS</p>
                      <p className="text-xs font-mono text-zinc-800 dark:text-zinc-300 truncate">{PERSONAL_INFO.email}</p>
                    </div>
                  </div>
                  <button
                    id="contact-copy-email-btn"
                    onClick={handleCopyEmail}
                    className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  >
                    {copiedEmail ? <Check size={14} className="text-green-500" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Phone entry */}
                <div id="contact-phone-entry" className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-zinc-650 dark:text-zinc-300">
                      <Phone size={16} />
                    </div>
                    <div className="truncate leading-tight">
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">TELEPHONE</p>
                      <p className="text-xs font-mono text-zinc-800 dark:text-zinc-300 truncate">{PERSONAL_INFO.phone}</p>
                    </div>
                  </div>
                  <button
                    id="contact-copy-phone-btn"
                    onClick={handleCopyPhone}
                    className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  >
                    {copiedPhone ? <Check size={14} className="text-green-500" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Location entry */}
                <div id="contact-loc-entry" className="flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-zinc-650 dark:text-zinc-300">
                    <MapPin size={16} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">LOCATION</p>
                    <p className="text-xs font-mono text-zinc-800 dark:text-zinc-300 font-semibold">Greater Noida, UP, India</p>
                  </div>
                </div>

              </div>

            </div>


          </div>

           {/* Direct Mail Column (cols-7) */}
          <div id="contact-mail-col" className="lg:col-span-7">
            <div id="direct-mail-card" className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl space-y-5 text-left">
              <div id="contact-mail-header" className="pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 space-y-1">
                <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Mail className="text-blue-500" size={20} />
                  <span>Direct Web Gmail Routing</span>
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select a template below to pre-format the mail contents or write a customized draft, then redirect instantly to Gmail Web Compose.
                </p>
              </div>

              {/* Template Buttons */}
              <div className="space-y-2.5">
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">Select Email Template</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {EMAIL_TEMPLATES.map((tpl) => {
                    const Icon = tpl.icon;
                    const isActive = activeTemplate === tpl.id;
                    return (
                      <button
                        id={`tpl-btn-${tpl.id}`}
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          setActiveTemplate(tpl.id);
                          setDirectMail({ subject: tpl.subject, body: tpl.body });
                        }}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                          isActive
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold"
                            : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isActive ? "bg-blue-500/20 text-blue-600" : "bg-zinc-100 dark:bg-zinc-900"}`}>
                          <Icon size={14} />
                        </div>
                        <span className="text-xs">{tpl.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Input */}
              <div id="direct-subject-group" className="space-y-1.5">
                <label htmlFor="direct-subject" className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">Subject Line</label>
                <input
                  id="direct-subject"
                  type="text"
                  value={directMail.subject}
                  onChange={(e) => setDirectMail(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Subject of your mail"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all placeholder:text-zinc-400"
                />
              </div>

              {/* Message Input */}
              <div id="direct-body-group" className="space-y-1.5">
                <label htmlFor="direct-body" className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">Message Body</label>
                <textarea
                  id="direct-body"
                  rows={6}
                  value={directMail.body}
                  onChange={(e) => setDirectMail(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Message text body..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all placeholder:text-zinc-400 resize-none font-sans"
                />
              </div>

              {/* Launch Mailbox Action Button */}
              <motion.a
                id="direct-mail-launch-btn"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(directMail.subject)}&body=${encodeURIComponent(directMail.body)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Log to simulated outbox in LocalStorage for client-side feedback
                  const logItem: ContactMessage = {
                    id: "msg-" + Date.now(),
                    senderName: "Direct Mailer Client",
                    senderEmail: "direct-route",
                    subject: directMail.subject,
                    textMessage: directMail.body,
                    timestamp: new Date().toLocaleString()
                  };

                  const updated = [logItem, ...savedMessages];
                  setSavedMessages(updated);
                  try {
                    localStorage.setItem("paras_dev_messages", JSON.stringify(updated));
                  } catch (err) {
                    console.error(err);
                  }

                  setSubmittedMessage(true);
                  setTimeout(() => setSubmittedMessage(false), 5000);
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-xl font-medium shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 text-sm text-center cursor-pointer"
              >
                <Send size={15} />
                <span>Redirect & Compose in Gmail</span>
                <ExternalLink size={13} className="opacity-60" />
              </motion.a>

              {/* Status Indicator */}
              <AnimatePresence>
                {submittedMessage && (
                  <motion.div
                    id="contact-success-toast"
                    className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-xl text-xs flex items-center gap-2 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Check size={14} className="shrink-0" />
                    <span>Selected template and contents mapped to Gmail Compose successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
