/**
 * All human-authored page content for the portfolio lives here as plain data.
 * Section components import from this file; no copy should be hard-coded in JSX.
 */
import type { StatDisplayOptions } from "../lib/formatStat";

import goldAward from "../assets/award-gold.jpg";
import silverAward from "../assets/award-silver.jpg";
import communityImg from "../assets/community-event.jpg";
import iciciLogo from "../assets/bank-logos/icici-bank-logo-vector-free-11574201415tjm5c6ttti.png";
import hdfcLogo from "../assets/bank-logos/HDFC.jpg";
import sbmLogo from "../assets/bank-logos/SBM bank.jpg";
import rblLogo from "../assets/bank-logos/RBL.png";
import scbLogo from "../assets/bank-logos/StandardChartered.png";

export { goldAward, silverAward, communityImg };

export interface NavItem {
  id: string;
  label: string;
}

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "partners", label: "Banking Partners" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export const NAV_IDS: string[] = NAV.map((n) => n.id);

export type SkillIconKey = "storage" | "code" | "cloud" | "psychology" | "ai-tools";

export interface SkillGroup {
  label: string;
  icon: SkillIconKey;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Backend & Databases",
    icon: "storage",
    items: ["Node.js", "Express.js", "MS-SQL", "PG-Admin", "Supabase", "MongoDB"],
  },
  {
    label: "Frontend",
    icon: "code",
    items: ["JavaScript", "React.js", "Redux", "Material UI", "Ant Design", "HTML", "CSS"],
  },
  {
    label: "Cloud",
    icon: "cloud",
    items: ["AWS"],
  },
  {
    label: "AI & Machine Learning",
    icon: "psychology",
    items: ["Python", "Machine Learning", "Artificial Intelligence", "RAG", "OLLAMA"],
  },
  {
    label: "AI Tools & Productivity",
    icon: "ai-tools",
    items: ["Claude", "ChatGPT", "Gemini", "NotebookLM", "Lovable.ai", "Cursor AI"],
  },
];

export interface Stat extends StatDisplayOptions {
  value: number;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 5, prefix: "₹", suffix: "Cr+", label: "Weekly Volume Automated" },
  { value: 3000, suffix: "+", format: "comma", label: "Customers Served" },
  { value: 5, label: "Banking Partners Integrated" },
];

export interface BankingPartner {
  name: string;
  logo: string;
  description: string;
  services: string[];
}

export const BANKING_PARTNERS: BankingPartner[] = [
  {
    name: "ICICI Bank",
    logo: iciciLogo,
    description:
      "Integrated ICICI APIs for custom payment gateway orchestration, mandate lifecycle automation, and real-time transaction reconciliation workflows.",
    services: ["Payment Gateway", "E-NACH", "Reconciliation"],
  },
  {
    name: "HDFC Bank",
    logo: hdfcLogo,
    description:
      "Connected HDFC payment and status-checking flows to automate verification, account updates, and secure financial data exchange.",
    services: ["Status APIs", "Payouts", "Verification"],
  },
  {
    name: "SBM Bank",
    logo: sbmLogo,
    description:
      "Built and maintained SBM integrations for virtual-account processes, transaction monitoring, and payment validation across high-volume applications.",
    services: ["Virtual Accounts", "Monitoring", "Validation"],
  },
  {
    name: "RBL Bank",
    logo: rblLogo,
    description:
      "Worked with RBL APIs for payment approval checks, ledger validations, and automated processing logic in fin-tech transaction pipelines.",
    services: ["Ledger Checks", "Approval Flow", "Automation"],
  },
  {
    name: "Standard Chartered",
    logo: scbLogo,
    description:
      "Consumed Standard Chartered banking APIs for stable status checks, secure settlement coordination, and end-to-end payment confidence at scale.",
    services: ["Bank Status", "Settlement", "Monitoring"],
  },
];

export interface ExperienceEntry {
  year: string;
  role: string;
  company: string;
  points: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    year: "09/2025 — Present",
    role: "Software Developer",
    company: "Paya Tech Systems Pvt. Ltd.",
    points: [
      "Engineered a highly scalable community carnival application ranked top-10 on Zomato’s \"District,\" processing 1,500+ registrations with zero downtime.",
    ],
  },
  {
    year: "04/2024 — 09/2025",
    role: "Jr. Software Developer",
    company: "Sunorbit Consulting",
    points: [
      "Co-developed a React.js/Node.js referral & loyalty platform for a major real estate client, driving continuous engagement for a base of 3,000+ customers via the AppPayout gateway.",
      "Built a secure backend consuming status-check APIs from Standard Chartered (SCB), SBM, ICICI, HDFC and RBL to automate payment verification, processing and reconciliation.",
      "Orchestrated the daily automated creation of 600 virtual accounts across 300 applications, processing an average weekly transaction volume of ₹5 Crore.",
      "Engineered an automated E-NACH platform on ICICI APIs for mandate registration, verification and real-time status tracking, settling an average of ₹60 Lakh per month with dynamic GST/base-amount splitting.",
    ],
  },
  {
    year: "07/2023 — 12/2023",
    role: "Software Developer Intern",
    company: "Scalefull Technologies LLP",
    points: [
      "Delivered a dynamic MERN-stack admin panel to streamline property data management for an international real estate client.",
    ],
  },
  {
    year: "10/2022 — 12/2022",
    role: "Software Developer Intern",
    company: "PieInfocomm Pvt. Ltd.",
    points: [
      "Developed a Python-based machine learning model for accurate image segmentation and component classification.",
    ],
  },
];

export interface Project {
  title: string;
  tag: string;
  desc: string;
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "E-Collection System",
    tag: "Fintech · Banking Integration",
    desc: "A secure backend consuming status-check APIs from Standard Chartered Bank (UK), State Bank of Mauritius, ICICI, HDFC and RBL to automate Virtual accounts creation and transactions, payment verification, processing and reconciliation — orchestrating 600 virtual accounts across 300 applications and ₹5 Crore in average weekly transaction volume.",
    stack: ["Node.js", "MS-SQL", "ICICI", "HDFC", "SBM", "RBL", "SCB"],
  },
  {
    title: "E-NACH System",
    tag: "Fintech · Automated Mandates",
    desc: "An automated E-NACH platform integrating ICICI APIs for end-to-end mandate registration, verification, transaction scheduling and real-time status tracking, with dynamic GST/base-amount splitting settling an average of ₹60 Lakh per month.",
    stack: ["Node.js", "ICICI APIs", "E-NACH", "Automated Billing"],
  },
  {
    title: "VJ-Carnival 2026",
    tag: "Event Management · Full-Stack",
    desc: "A comprehensive full-stack information and ticketing platform built for Carnival 2026, successfully processing over 1,500 user registrations. The seamless frontend experience and robust backend architecture helped propel the festival to become the #1 ranked event on the Zomato District app.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Material UI"],
  },
  {
    title: "Referral and Loyalty Web Application",
    tag: "Real Estate · Customer Service",
    desc: "A full-stack customer service application managing client referral and loyalty programs for a major real estate project — serving a base of 3,000+ customers who track and claim rewards via an integrated AppPayout gateway.",
    stack: ["React.js", "Material UI", "Node.js", "Express.js", "MS-SQL"],
  },
  {
    title: "Custom Payment Gateway",
    tag: "Fintech · Payment Infrastructure",
    desc: "A highly secure, enterprise-grade payment processing platform developed as an in-house alternative to Razorpay. Built by directly consuming ICICI banking APIs, the system features a bulletproof transaction architecture with rigorous security protocols, maintainable audit logging, real-time tracking, and proactive system monitoring.",
    stack: ["Node.js", "Express.js", "PostgreSQL", "ICICI APIs", "System Monitoring"],
  },
  {
    title: "LLM Application with RAG",
    tag: "AI / ML · Retrieval-Augmented Generation",
    desc: "An AI/ML application leveraging Python and vector database technology, featuring Retrieval-Augmented Generation (RAG) with integrated open-source LLMs such as OLLAMA for domain-grounded responses.",
    stack: ["Python", "OLLAMA", "Vector DB", "RAG", "LLM"],
  },
  {
    title: "Building Theory Web Platform",
    tag: "Full-Stack · International Client",
    desc: "A full-stack web application developed during an internship for a Canadian client, \"Building Theory.\" Engineered a responsive frontend using React.js and Redux for complex state management, integrated with a scalable Node.js backend to deliver a seamless user experience.",
    stack: ["React.js", "Redux", "Node.js", "Express.js"],
  },
  {
    title: "Acne Image Segmentation",
    tag: "Computer Vision · Healthcare AI",
    desc: "An AI/ML internship project focused on automated dermatological analysis. Developed and trained a computer vision model using Python to perform precise image segmentation of acne, enabling accurate detection and mapping of skin conditions.",
    stack: ["Python", "Computer Vision", "Machine Learning", "Image Processing"],
  },
];

export interface Award {
  img: string;
  title: string;
  sub: string;
}

export const AWARDS: Award[] = [
  {
    img: silverAward,
    title: "Quality Award 2024 (Silver)",
    sub: "Recognized for outstanding performance as a quality worker — reliable, scalable code and improved system stability.",
  },
  {
    img: goldAward,
    title: "Annual Awards 2025 (Gold) — Quality & Safety",
    sub: "Awarded for implementing critical safety measures and rigorous quality standards on high-impact financial projects.",
  },
];

export interface Activity {
  role: string;
  org: string;
}

export const ACTIVITIES: Activity[] = [
  { role: "Founder Vice President", org: "Basements Social Forum, Wardha" },
  { role: "Core Committee Member & ERC", org: "Wardha Youth Fest 2024" },
];

export interface Cert {
  title: string;
  org: string;
}

export const CERTS: Cert[] = [
  { title: "MERN Stack Internship Certification", org: "ScaleFull Technologies LLP" },
  { title: "Python Internship Certification", org: "PIE INFOCOMM Pvt. Ltd." },
  { title: "SDLC Agile Certification", org: "Cognizant Technology Solutions" },
  { title: "Generative AI and LLMs Certification", org: "Udemy" },
];

export interface EducationEntry {
  title: string;
  org: string;
  year: string;
}

export const EDUCATION: EducationEntry[] = [
  { title: "B.E. Computer Science Engineering", org: "CGPA: 8.37", year: "2019 – 2023" },
  { title: "HSC — Maharashtra State Board", org: "81.23%", year: "2017 – 2018" },
];

export interface Publication {
  title: string;
  venue: string;
  authors: string;
  link: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    title: "Case Study: Prediction on Iris Dataset using KNN Algorithm",
    venue: "International Research Journal of Engineering and Technology (IRJET) — Vol. 10, Issue 4, April 2023",
    authors: "Shreyas Tayade, Rakhi Gupta, Deval Kherde, Chaitanya Ubale",
    link: "https://www.irjet.net/archives/V10/i4/IRJET-V10I447.pdf",
  },
];

export interface SocialLink {
  label: string;
  href: string;
}

/** TODO: replace with your real GitHub profile URL. */
export const GITHUB_URL = "https://github.com/your-username";

export const CONTACT = {
  email: "chaitanya.ubale410@gmail.com",
  phone: "+91 7385955746",
  phoneHref: "tel:+917385955746",
  location: "Bella Casa, Baner, Pune 411045",
  linkedin: "https://www.linkedin.com/in/chaitanya-ubale-2248a6360",
  github: GITHUB_URL,
} as const;
