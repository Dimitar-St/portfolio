export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  photo: string;
  heroParagraphs: string[];
  heroStack: string[];
  availability: string;
  location: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: "GitHub" | "LinkedIn";
  href: string;
};

export type Service = {
  title: string;
  description: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  shortTitle: string;
  problem: string;
  whatIBuilt: string;
  technologies: string[];
  links?: ProjectLink[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  description: string;
};

export type TechCategory = {
  name: string;
  technologies: string[];
};

export type ContactInfo = {
  heading: string;
  copy: string[];
  email: string;
  ctaLabel: string;
};

export type Portfolio = {
  profile: Profile;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  services: Service[];
  projects: Project[];
  experience: ExperienceEntry[];
  technologies: TechCategory[];
  aboutParagraphs: string[];
  contact: ContactInfo;
  metadata: {
    title: string;
    description: string;
    url: string;
  };
};

export const portfolio: Portfolio = {
  profile: {
    name: "Dimitar Stoyanov",
    headline: "Senior Software Engineer",
    tagline: "Backend · Full Stack · Distributed Systems",
    photo: "/profile.png",
    heroParagraphs: [
      "I'm Dimitar, a software engineer with 5+ years of experience building backend systems, full-stack applications, APIs, integrations, and data-heavy platforms.",
      "I help teams design and build reliable software using Go, Java, TypeScript, PostgreSQL, Kafka, and modern cloud infrastructure.",
    ],
    heroStack: [
      "Go",
      "Java",
      "TypeScript",
      "PostgreSQL",
      "Kafka",
      "Google Cloud",
      "Cloudflare",
      "Hetzner",
      "AI-driven development",
    ],
    availability:
      "Available for remote contract, part-time, and project-based engagements.",
    location: "Bulgaria",
  },

  navItems: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Technologies", href: "#technologies" },
    { label: "Contact", href: "#contact" },
  ],

  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/Dimitar-St",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dimitar-styoanov",
    },
  ],

  services: [
    {
      title: "Backend Systems & APIs",
      description:
        "Designing and building backend services, REST APIs, internal platforms, and distributed systems.",
    },
    {
      title: "PostgreSQL & Data Modeling",
      description:
        "Database schema design, migrations, query design, data consistency, reconciliation, and performance.",
    },
    {
      title: "System Integrations",
      description:
        "Connecting services and external systems using APIs, asynchronous messaging, Kafka, and event-driven architecture.",
    },
    {
      title: "Developer Tools & SDKs",
      description:
        "Building reusable SDKs, internal libraries, developer tooling, and engineering infrastructure.",
    },
    {
      title: "Full-Stack Product Development",
      description:
        "Taking product features from database and backend design through to TypeScript and JavaScript frontend implementation.",
    },
  ],

  projects: [
    {
      title: "Feature Flag Platform",
      shortTitle: "Feature Flag Platform",
      problem:
        "Engineering teams needed a reliable, low-latency way to manage feature flags across services written in different languages.",
      whatIBuilt:
        "Designed and implemented a feature flag platform backed by PostgreSQL, with Kafka-based synchronization, local in-memory caching, and SDKs for Go and Java. Worked across database modeling, API design, cache synchronization, client libraries, deployment, and integration with consuming services.",
      technologies: ["Go", "Java", "PostgreSQL", "Kafka", "Docker", "Kubernetes"],
    },
    {
      title: "Backend Platform / Integration Project",
      shortTitle: "Backend Platform / Integration",
      problem:
        "Placeholder — describe the problem this backend platform or integration project solved.",
      whatIBuilt:
        "Placeholder — describe what you built and the integration or platform work involved.",
      technologies: ["Go", "PostgreSQL", "Kafka", "Docker", "Kubernetes"],
    },
    {
      title: "Full-Stack Product Project",
      shortTitle: "Full-Stack Product",
      problem:
        "Placeholder — describe the problem this full-stack product project solved.",
      whatIBuilt:
        "Placeholder — describe what you built across the database, backend, and frontend.",
      technologies: ["TypeScript", "Go", "PostgreSQL", "React / Next.js"],
    },
  ],

  experience: [
    {
      company: "SAP",
      role: "Software Engineer — Backend & Full Stack",
      description:
        "Worked across backend and full-stack systems in an enterprise engineering environment, contributing to production applications and services.",
    },
    {
      company: "Current Backend Engineering Role",
      role: "Backend Engineer",
      description:
        "Building backend services and internal platform capabilities using Go, PostgreSQL, Kafka, caching, APIs, and containerized infrastructure.",
    },
  ],

  technologies: [
    { name: "Languages", technologies: ["Go", "Java", "TypeScript", "JavaScript"] },
    { name: "Data", technologies: ["PostgreSQL", "Redis"] },
    { name: "Messaging & Distributed Systems", technologies: ["Kafka"] },
    { name: "Infrastructure", technologies: ["Google Cloud", "Cloudflare", "Hetzner", "Docker", "Kubernetes"] },
    { name: "Frontend", technologies: ["Vue", "React / Next.js"] },
    { name: "AI-Driven Development", technologies: ["AI-assisted workflows", "LLM integrations"] },
  ],

  aboutParagraphs: [
    "I'm Dimitar, a software engineer based in Bulgaria with more than 5 years of experience across backend and full-stack development.",
    "I enjoy working on systems where architecture, database design, APIs, integrations, and reliability matter more than simply choosing a particular framework.",
    "My background spans enterprise engineering and smaller product-focused environments, and I'm comfortable moving between technologies depending on the problem.",
    "I'm particularly interested in working with international teams on backend systems, developer infrastructure, data-heavy products, integrations, and full-stack applications.",
  ],

  contact: {
    heading: "Have something to build?",
    copy: [
      "I'm available for remote contract, part-time, and project-based engineering work.",
      "If your team needs help with backend development, data modeling, system integrations, developer tooling, or full-stack product development, feel free to get in touch.",
    ],
    email: "dimitar.stoyanov@example.com",
    ctaLabel: "Email me",
  },

  metadata: {
    title: "Dimitar Stoyanov — Senior Software Engineer",
    description:
      "Senior backend and full-stack software engineer specializing in Go, Java, TypeScript, PostgreSQL, Kafka, distributed systems, and software architecture. Available for remote contract and part-time work.",
    url: "https://dimitarstoyanov.dev",
  },
};
