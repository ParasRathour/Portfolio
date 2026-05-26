export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  coursework?: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  technologies: string[];
  points: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  challengesSolved?: string;
  architectureDetails?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const PERSONAL_INFO = {
  name: "Paras Rathour",
  title: "Software Developer Intern & Systems Engineer",
  email: "parasdgi2022@gmail.com",
  phone: "+91-8957326686",
  location: "India",
  github: "https://github.com/ParasRathour",
  linkedin: "https://linkedin.com/in/paras-rathour",
  summary: "Software developer with hands-on experience in building scalable web applications using Python, Django, Java, and Spring Boot. Skilled in designing efficient backend systems, developing RESTful and GraphQL APIs, and delivering end-to-end solutions. Strong analytical and logical thinking with a focus on writing clean, maintainable code, optimizing application performance, and contributing to high-impact engineering teams.",
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu1",
    institution: "Dronacharya Group Of Institutions",
    degree: "Bachelor of Technology in Computer Science Engineering",
    period: "Nov 2022 – Jun 2026",
    coursework: "Operating Systems, Analysis of Algorithms, Networking, Databases",
    details: "Focus on software engineering, clean architecture, and advanced web services."
  },
  {
    id: "edu2",
    institution: "HRA Inter College (UP Board)",
    degree: "Intermediate (Class XII)",
    period: "Apr 2021 – Jun 2022",
    details: "Physics, Chemistry, and Mathematics focus with top-tier academic standing."
  },
  {
    id: "edu3",
    institution: "HRA Inter College (UP Board)",
    degree: "High School (Class X)",
    period: "Apr 2019 – Mar 2020",
    details: "Structured foundation in basic computing, mathematics, and science."
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp1",
    role: "IT Intern",
    company: "CGPDTM (Controller General of Patents, Designs and Trade Marks)",
    period: "Apr 2026 – Present",
    points: [
      "Enhanced console-based applications to generate WIPO-compliant XML files for trademarks registered in India.",
      "Built data migration scripts for large datasets ensuring data integrity, consistency, and reliability.",
      "Automated email workflows for generating and sending admin reports to ministry officials, including officer target tracking reports for daily and weekly performance tracking/monitoring.",
      "Expanded backend automation tools to streamline operational workflows and reduce manual processing effort."
    ],
    skills: ["Python", "XML Serialization", "Data Migration", "Automation Scripts", "SQL"]
  },
  {
    id: "exp2",
    role: "Backend Intern",
    company: "MikeLegal",
    period: "Aug 2025 – Feb 2026",
    points: [
      "Developed multi-court web scrapers to extract case-related data from various court websites, followed by data cleaning, transformation, and storage into backend systems.",
      "Resolved critical functional bugs and improved modules related to cause lists, court orders, and case status tracking functionalities.",
      "Optimized backend workflows using Django and Python to improve application performance and system efficiency.",
      "Developed Microsoft Excel generation and bulk data upload functionalities supporting multiple complex, user-defined Excel formats."
    ],
    skills: ["Python", "Django", "Web Scraping", "Data Transformation", "Excel Automation", "PostgreSQL"]
  },
  {
    id: "exp3",
    role: "Data Science Intern",
    company: "EI Systems",
    period: "Feb 2025 – Mar 2025",
    points: [
      "Preprocessed and cleaned complex real-world datasets using Python, Pandas, and NumPy to establish high-fidelity model inputs, boosting quality metrics.",
      "Evaluated machine learning architecture performance comprehensively using key statistical metrics, improving target accuracy by 18% and pipeline speed by 40%.",
      "Conducted thorough exploratory data analysis (EDA) to uncover critical trends, correlation patterns, and actionable data-driven insights.",
      "Enhanced model reliability, generalization capacity, and feature representation through rigorous engineering, imputation, and outlier cleaning workflows."
    ],
    skills: ["Python", "Pandas", "NumPy", "Data Preprocessing", "Machine Learning Pipeline", "Exploratory Data Analysis"]
  },
  {
    id: "exp4",
    role: "Full Stack Intern",
    company: "EY / Edunet Foundation",
    period: "Feb 2024 – Apr 2024",
    points: [
      "Engineered interactive analytics dashboards that streamlined scheduling operations, slashing system booking workflows by 60%.",
      "Bridged front-end presentation logic with secure backend SQL query engines, driving a 25% increase in user engagement metrics.",
      "Maintained strict cross-browser compatibility and optimized layout stability across varied viewport sizes with Tailwind responsive utilities.",
      "Refactored legacy modules into reusable React components to improve code readability, simplify maintenance, and reduce render latency."
    ],
    skills: ["React", "Python", "API Integration", "Web Dashboard Design", "SQL", "Tailwind CSS"]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj1",
    title: "Email Campaign Manager",
    technologies: ["Python", "Django", "Mailgun APIs", "Django ORM", "Git"],
    points: [
      "Built a highly responsive system to automate and manage bulk email campaigns for multiple target groups.",
      "Implemented intelligent campaign user targeting and real-time open/delivery analytics tracking utilizing Mailgun webhook notifications and optimized Django ORM.",
      "Streamlined high-volume database queries and backend workflows for efficient scheduling, dispatching, and tracking of over 100+ weekly email campaign sequences.",
      "Engineered clean database models for detailed recipient contact lists, custom newsletter templates, and trigger-based system notifications."
    ],
    githubUrl: "https://github.com/ParasRathour/email-campaign",
    liveUrl: "#",
    category: "Backend & Systems",
    challengesSolved: "Faced rate limiting constraints and slow database write cycles when sending over 100+ simultaneous campaigns. Solved by decoupling query execution using bulk database saves and introducing background queue processing.",
    architectureDetails: "Utilizes a model-view-controller system in Django where transactional mailer APIs interface through clean, decoupled utility helpers. Relies on state machines in Django ORM to record scheduled campaigns."
  },
  {
    id: "proj2",
    title: "Secure Journal App",
    technologies: ["Spring Boot", "Java", "Maven", "Spring Security", "JWT Token"],
    points: [
      "Developed a commercial-grade, multi-user journal application incorporating role-based access control (RBAC) to restrict and secure access across system operations.",
      "Configured robust Spring Security filters with secure stateless JSON Web Token (JWT) credentials & session tracking, preventing unauthorized requests by over 95%.",
      "Created RESTful APIs to control resource CRUD routines with precise DTO design, request body validations, and unified error handling middleware."
    ],
    githubUrl: "https://github.com/ParasRathour/journalApp",
    liveUrl: "#",
    category: "Security & API",
    challengesSolved: "Securing resources while supporting flexible roles. Solved by writing strict Method Security annotations (@PreAuthorize) and configuring structured JWT encoders to embed user permissions directly.",
    architectureDetails: "Spring Boot architecture featuring controller-service-repository patterns, using JWT interceptor chains, Hibernate ORM validation rules, and specialized exceptions controllers."
  },
  {
    id: "proj3",
    title: "Multithreaded Web Server",
    technologies: ["Java", "Spring Boot", "Maven", "Sockets", "Concurrency API"],
    points: [
      "Built a highly scalable, raw TCP/HTTP multithreaded web server to handle hundreds of concurrent requests efficiently without framework dependency overhead.",
      "Implemented a custom thread-pooling architecture and manual socket stream request dispatchers to control thread reuse and limit system memory overhead.",
      "Optimized payload parsing and web server socket response speeds under heavy simulation load, achieving high data throughput under strict resource conditions."
    ],
    githubUrl: "https://github.com/ParasRathour/MultiThread-WebServer",
    liveUrl: "#",
    category: "Low-level Systems",
    challengesSolved: "Thread overhead and race conditions during socket read/write operations. Solved by managing socket lifecycles through an ExecutorService pool and enforcing boundary condition checks.",
    architectureDetails: "Constructed at a low level with ServerSockets, custom HTTP protocol stream parsers, routing directories mapping to content, and thread context handlers."
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C", "C++", "SQL", "C#", "HTML/CSS", "TypeScript"]
  },
  {
    category: "Frameworks & UI",
    skills: ["Django", "Spring Boot", "ASP.NET", "React", "Tailwind CSS", "Bootstrap", "Express"]
  },
  {
    category: "APIs & Networking",
    skills: ["RESTful APIs", "GraphQL", "HTTP/HTTPS Protocol", "TCP/IP Networking", "WebSockets"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "Oracle Database (PL/SQL)", "SQLite"]
  },
  {
    category: "Messaging & Queues",
    skills: ["Redis", "Celery", "RabbitMQ", "Message Broker Systems"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Visual Studio", "IntelliJ IDEA", "Amazon S3", "Maven", "Postman"]
  },
  {
    category: "Operating Systems",
    skills: ["Ubuntu (Linux)", "Kali Linux", "Wireshark Network Analyzer", "Nmap Port Scanner"]
  },
  {
    category: "AI & Low-Code Productivity",
    skills: ["ChatGPT", "GitHub Copilot", "Prompt Engineering", "Appsmith No-Code", "Budibase Builders"]
  }
];
