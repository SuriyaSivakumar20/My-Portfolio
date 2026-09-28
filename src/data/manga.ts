/* =========================================================
   MANGA PORTFOLIO — SECTION CONTENT
   Every string here is traceable to one of three sources:
     • the existing portfolio (src/data/content.ts)
     • the CV (public/resume.pdf)
     • the generated design plates (.ref/artwork/*.png)
   Nothing is invented. Where a plate or a request named a
   project without shipping any detail, `pending` is used so
   the slot stays honest instead of being filled with filler.
   ========================================================= */

import { links, profile } from './content';

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

/* ------------------------------------------------------------------ HOME */
export const hero = {
  wordmark: 'SURIYA',
  role: 'Software Developer / SDE',
  status: profile.status,
  kicker: 'Home',
  lead:
    'I build backend services, automation pipelines and AI-assisted products — currently shipping production code at CaratLane, a Tata product.',
  tagsLeft: ['Developer', 'Problem Solver', 'Lifelong Learner'],
  tagsRight: ['Ideas', 'Code', 'People', 'Impact'],
  footLeft: ['Building', 'A Better Version', 'Everyday'],
  footRight: ['Explore', 'Learn', 'Create', 'Grow'],
  scrollNote: 'Scroll to read',
};

/* ----------------------------------------------------------------- ABOUT */
export const about = {
  kicker: 'About me',
  title: 'About',
  intro:
    'A Full Stack Engineer and 2026 CSE graduate with hands-on experience building automation pipelines, AI-integrated applications and backend services across production and personal projects. Pursuing my SDE role at CaratLane (A Tata Product) — building internal automation tools, tracing root causes on live system failures and shipping inside an agile engineering team.',
  blocks: [
    {
      label: 'Education',
      value: 'B.Tech CSE',
      meta: '2022 — 2026',
      lines: [
        'Manakula Vinayagar Institute of Technology · Pondicherry University',
        'CGPA 8.32 / 10',
      ],
    },
    {
      label: 'Experience',
      value: 'SDE Intern',
      meta: 'Dec 2025 — Ongoing',
      lines: ['CaratLane — A Tata Product', 'Full stack Engineering & automation'],
    },
    {
      label: 'Location',
      value: 'India',
      meta: 'Open to remote',
      lines: ['Pondicherry, Puducherry, India'],
    },
  ],
  interests: [
    'Building Products',
    'Problem Solving',
    'Learning New Technology',
    'Automation',
  ],
};

/* ------------------------------------------------------------ EXPERIENCE */
export interface TimelineEntry {
  id: string;
  date: string;
  role: string;
  company: string;
  place: string;
  summary: string;
  bullets: string[];
  panelTitle: string;
  tags: string[];
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    id: 'caratlane',
    date: 'Dec 2025 — Jun 2026',
    role: 'SDE Intern',
    company: 'CaratLane — A Tata Product',
    place: 'Chennai, India',
    summary:
      'Worked with the Pricing team on backend services and internal automation tools — building and maintaining scripts for reporting, invoicing and internal system syncs to improve operational efficiency across support workflows.',
    bullets: [
      'Developed and maintained backend services using Golang.',
      'Built automation scripts for Freshservice and invoice-sync workflows.',
      'Worked with internal APIs, databases (Magento / Oracle) and cron jobs to streamline processes.',
      'Performed root-cause analysis on live system failures and shipped fixes with the team.',
    ],
    panelTitle: 'Tech stack',
    tags: ['Golang', 'Python', 'Oracle', 'Magento', 'Freshservice', 'Automation', 'Git', 'Linux'],
    current: true,
  },
  {
    id: 'lse',
    date: 'Aug 2025 — Dec 2025',
    role: 'Soft Skills Trainer Intern',
    company: 'LSE Global Academy',
    place: 'Remote',
    summary:
      'Ran a comprehensive soft-skills programme for school students covering communication, teamwork, problem-solving and leadership — training students to see English as just a language, not a barrier.',
    bullets: [
      'Prepared detailed lesson plans and structured the sessions myself.',
      'Conducted workshops and group activities to build interpersonal skills.',
      'Took live sessions with school students and focused on practical confidence building.',
    ],
    panelTitle: 'Key areas',
    tags: ['Teaching', 'Communication', 'Lesson Planning', 'Student Mentoring', 'Content Creation'],
  },
  {
    id: 'vei',
    date: 'Jun 2025 — Oct 2025',
    role: 'Cyber Security Intern',
    company: 'VEI Technologies',
    place: 'Remote',
    summary:
      'Built natural-language processing models for automated content generation and implemented transformer-based architectures for text summarisation with improved accuracy.',
    bullets: [
      'Implemented transformer-based architectures for text summarisation.',
      'Worked on phishing detection, content protection and secure-system research.',
    ],
    panelTitle: 'Focus',
    tags: ['Phishing', 'NLP', 'Kali Linux', 'Protection', 'Python'],
  },
  {
    id: 'exposys',
    date: 'Jun 2025 — Oct 2025',
    role: 'Software Web Development Intern',
    company: 'Exposys Data Labs',
    place: 'Remote',
    summary:
      'Developed and maintained web applications using React and Node.js, collaborating with senior developers to implement features and improve the existing codebase.',
    bullets: [
      'Built responsive features with React and Node.js in an agile team.',
      'Refactored modules for readability, performance and modularity.',
    ],
    panelTitle: 'Tech stack',
    tags: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Git'],
  },
  {
    id: 'hackathon',
    date: 'Mar 2023 — Present',
    role: 'Hackathon Participant',
    company: 'YI Innovate Hackathon · SIH · Various',
    place: 'India',
    summary:
      'Led teams turning short briefs into working AI prototypes — from automated resume screening to vision-based accessibility tools.',
    bullets: [
      'Led a team of 4 to build an AI solution for automated resume screening.',
      'Selected in the top 20 among 120+ teams.',
      'Built a vision-based accessibility tool for the visually impaired in 48 hours.',
    ],
    panelTitle: 'Skills used',
    tags: ['Python', 'Machine Learning', 'Team Leadership'],
  },
];

/* -------------------------------------------------------------- PROJECTS */
export interface MangaProject {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  date?: string;
  summary?: string;
  bullets?: string[];
  stack: string[];
  github?: string;
  live?: string;
  /** slot exists, but no real detail was ever published for it */
  pending?: string;
}

export const projects: MangaProject[] = [
  {
    id: 'FoundersCircle',
    index: '01',
    title: 'FoundersCircle',
    date: 'Jul 2025 — March 2026',
    summary:
      'A full-stack Python AI platform that connects startups with venture capitalists — live on Vercel with active users, built to scale across roles and data volumes.',
    bullets: [
      'Rule-based weighted scoring engine that produces automated investor-readiness assessments.',
      'OpenAI + Google APIs drive a chatbot for onboarding and role selection.',
      'MySQL schema with role-based access control and scoring audit trails.',
    ],
    stack: ['Python', 'OpenAI API', 'Google API', 'MySQL', 'NLP', 'Vercel'],
    github: 'https://github.com/SuriyaSivakumar20/FoundersAICircle',
    live: 'https://founderscircleai.vercel.app',
  },
  {
    id: 'cafequick',
    index: '02',
    title: 'CafeQuick',
    stack: ['React', 'TypeScript', 'Vercel', 'three.js'],
    pending:
      'This build is real, but no public description, stack or links have been written for it yet — slot left open rather than filled with filler.',
    live: "https://cafequick.vercel.app",
      },
  {
    id: 'ctrlclub',
    index: '03',
    title: 'CtrlClub',
    stack: [],
    pending:
      'This build is real, but no public description, stack or links have been written for it yet — slot left open rather than filled with filler.',
    live: "https://ctrlclub.vercel.app",

  },
  {
    id: 'phishing',
    index: '04',
    title: 'AI Phishing Detection',
    subtitle: 'NLP threat detection',
    date: 'Project',
    summary:
      'A machine learning model that detects phishing attempts in emails and messages with 96% accuracy using natural language processing.',
    bullets: [
      'Classifies emails and messages as phishing attempts.',
      'Rule-based checks were not enough — this learns the phrasing instead.',
    ],
    stack: ['Python', 'TensorFlow', 'Cybersecurity', 'NLP'],
    github: 'https://github.com/SuriyaSivakumar20/Phishing-Detection',
  },
  {
    id: 'resume-screener',
    index: '05',
    title: 'AI Resume Screener',
    subtitle: 'Hackathon-winning hiring AI',
    date: 'Mar 2025 — Apr 2025',
    summary:
      'A resume parsing and ranking pipeline that matches candidate profiles against job descriptions and shortlists by skill-match percentage.',
    bullets: [
      'BERT semantic embeddings score candidate-to-role fit.',
      'Scikit-learn algorithm outputs ranked shortlists.',
      'Pandas preprocessing normalises raw resume text before scoring.',
    ],
    stack: ['Python', 'BERT', 'Scikit-learn', 'Pandas', 'NLP', 'React'],
    github: 'https://github.com/SuriyaSivakumar20/Resume-Screening',
  }
];

/* ---------------------------------------------------------------- SKILLS */
export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  blurb: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages',
    blurb: 'What I reach for when I start typing.',
    items: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Java', 'C', 'C++', 'SQL', 'Ruby'],
  },
  {
    id: 'frameworks',
    index: '02',
    title: 'Frameworks & Libraries',
    blurb: 'Web, backend and the Python data stack.',
    items: [
      'React',
      'Node.js',
      'Express',
      'Flask',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TensorFlow',
      'Transformers',
      'OpenAI API',
    ],
  },
  {
    id: 'tools',
    index: '03',
    title: 'Tools & Platforms',
    blurb: 'The workflow around the code.',
    items: [
      'Git',
      'GitHub',
      'Vercel',
      'Docker',
      'AWS',
      'VS Code',
      'Linux',
      'Figma',
      'Canva',
      'StarUML',
    ],
  },
  {
    id: 'databases',
    index: '04',
    title: 'Databases',
    blurb: 'Where the data actually lives.',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL'],
  },
  {
    id: 'other',
    index: '05',
    title: 'Other Skills',
    blurb: 'Practices, automation and the AI layer.',
    items: [
      'NLP',
      'Machine Learning',
      'Automation',
      'REST APIs',
      'SMTP Integration',
      'Cron Jobs',
      'Freshservice API',
      'Prompt Engineering',
      'Agile',
      'SDLC',
      'Code Review',
      'Debugging',
      'RCA',
    ],
  },
];

/* --------------------------------------------------------------- CONTACT */
export const contact = {
  kicker: 'Get in touch',
  title: 'Contact',
  intro: [
    'Have a project in mind, a question, or just want to say hi? I would love to hear from you.',
    'Let’s connect and build something great together.',
  ],
  cta: "Let's connect",
  channels: [
    { label: 'Email', value: links.emailRaw, href: links.email },
    { label: 'LinkedIn', value: 'linkedin.com/in/suriya-sivakumar', href: links.linkedin },
    { label: 'GitHub', value: 'github.com/SuriyaSivakumar20', href: links.github },
    { label: 'Location', value: 'Pondicherry, India', href: links.map },
  ],
  aside: ['New Ideas', 'Collaboration', 'Opportunities', 'Good Conversations'],
  button: 'Send message',
};

export const sectionIndex = [
  { n: '01', id: 'home', name: 'Home', note: 'Index' },
  { n: '02', id: 'about', name: 'About', note: 'Who I am' },
  { n: '03', id: 'experience', name: 'Experience', note: 'My journey' },
  { n: '04', id: 'projects', name: 'Projects', note: 'My work' },
  { n: '05', id: 'skills', name: 'Skills', note: 'My toolbox' },
  { n: '06', id: 'contact', name: 'Contact', note: 'Get in touch' },
];
