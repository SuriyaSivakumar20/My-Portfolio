/* =========================================================
   SURIYA.OS — CONTENT
   Everything here reflects the existing portfolio. No
   invented experience, projects, companies or numbers.
   ========================================================= */

export const profile = {
  firstName: 'Suriya',
  lastName: 'Sivakumar',
  name: 'Suriya Sivakumar',
  role: 'Software Engineer',
  subline: 'Building Systems • Automation • Applications',
  headline: 'CS Engineer | AI Enthusiast | Freelance Developer',
  tagline:
    'CS Engineering student (Class of 2026) who has shipped 6+ projects spanning AI, NLP, and full-stack web — including a hackathon-selected accessibility tool for the visually impaired. Currently working at CaratLane (A Tata Product) and open to freelance collaborations.',
  location: 'Pondicherry, Puducherry, India',
  education: 'B.Tech CSE, Class of 2026',
  status: 'Working @ CaratLane (A Tata Product)',
  focus: 'AI systems · Backend · Automation · Full-stack',
  available: true,
};

export const links = {
  github: 'https://github.com/SuriyaSivakumar20',
  linkedin: 'https://www.linkedin.com/in/suriya-sivakumar-483735258/',
  instagram: 'https://www.instagram.com/iam.suriyaa._/',
  email: 'mailto:suriyasivakumar08@gmail.com',
  emailRaw: 'suriyasivakumar08@gmail.com',
  tel: 'tel:+919176234640',
  telRaw: '+91 9176234640',
  resume: '/resume.pdf',
  map: 'https://maps.google.com/?q=Pondicherry,Puducherry,India',
  site: 'https://suriyasivakumar20.vercel.app/',
};

/* Default document metadata — index.html and the dynamic per-section
   title/description both read from here so they never drift apart. */
export const siteMeta = {
  title: 'Suriya Sivakumar — Software Engineer | SURIYA.OS',
  description:
    'Portfolio operating system of Suriya Sivakumar — CS Engineer, AI developer and freelance full-stack builder. Intern at CaratLane (A Tata Product). Building systems, automation and applications.',
};

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  verbs: string[];
  lines: string[];
  tags: string[];
  current?: boolean;
}

export const experience: Experience[] = [
  {
    id: 'caratlane',
    role: 'Software Developer Intern',
    company: 'CaratLane — A Tata Product',
    period: 'Dec 2025 — Ongoing',
    verbs: ['SYSTEMS', 'AUTOMATION', 'BACKEND'],
    lines: [
      'Working on real-world backend systems in a production environment.',
      'Contributing to feature development and system optimization.',
      'Collaborating with experienced engineers while improving the EZ Sales app experience.',
    ],
    tags: ['SQL', 'Node', 'Go'],
    current: true,
  },
  {
    id: 'lse',
    role: 'Softskill Training Intern',
    company: 'LSE Global Academy',
    period: 'Aug 2025 — Dec 2025',
    verbs: ['COMMUNICATION', 'LEADERSHIP', 'WORKSHOPS'],
    lines: [
      'Comprehensive soft skills program covering communication, teamwork, problem-solving and leadership.',
      'Conducted workshops and group activities to enhance interpersonal skills.',
      'Trained students to see English as just a language — not a barrier.',
    ],
    tags: ['Communication', 'Teamwork', 'Problem-solving', 'Leadership'],
  },
  {
    id: 'vei',
    role: 'Cyber Security Intern',
    company: 'VEI Technologies',
    period: 'Jun 2025 — Oct 2025',
    verbs: ['NLP', 'SECURITY', 'MODELS'],
    lines: [
      'Built natural language processing models for automated content generation.',
      'Implemented transformer-based architectures for text summarization with improved accuracy.',
    ],
    tags: ['Phishing', 'Kali Linux', 'White Hacking', 'Protection'],
  },
  {
    id: 'exposys',
    role: 'Software Web Development Intern',
    company: 'Exposys Data Labs',
    period: 'Jun 2025 — Oct 2025',
    verbs: ['WEB', 'FRONTEND', 'BACKEND'],
    lines: [
      'Developed and maintained web applications using React and Node.js.',
      'Collaborated with senior developers to implement features and improve the existing codebase.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
  },
  {
    id: 'hackthon',
    role: 'Hackathon Participant',
    company: 'YI Innovate Hackathon · SIH · Various',
    period: 'Mar 2023 — Present',
    verbs: ['AI', 'TEAM LEADERSHIP', 'PROTOTYPING'],
    lines: [
      'Led a team of 4 to build an AI solution for automated resume screening.',
      'Selected in the top 20 among 120+ teams.',
    ],
    tags: ['Python', 'Machine Learning', 'Team Leadership'],
  },
];

export interface Project {
  id: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  domain: string;
  status: 'LIVE' | 'PROJECT';
  stack: string[];
  results?: string;
  problem?: string;
  solution?: string;
  url?: string;
  github?: string;
  image: string;
  facts: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'founders-circle',
    index: 1,
    title: 'FoundersAICircle',
    tagline: 'AI for VCs & Startups',
    description:
      'An AI-powered chatbot that helps venture capitalists identify promising startups by analyzing market trends and founder backgrounds.',
    problem:
      'Venture capitalists need to identify promising startups early, but scanning market trends and founder backgrounds manually is slow.',
    solution:
      'An AI chatbot that analyzes market trends and founder backgrounds to surface promising startups.',
    domain: 'AI / NLP',
    status: 'LIVE',
    stack: ['Python', 'NLP', 'Machine Learning', 'TypeScript', 'Flask'],
    url: 'https://founderscircleai.vercel.app',
    github: 'https://github.com/SuriyaSivakumar20/FoundersAICircle',
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'LIVE' },
      { label: 'DOMAIN', value: 'AI CHATBOT' },
    ],
  },
  {
    id: 'movie-hub',
    index: 2,
    title: 'Movie Hub',
    tagline: 'Watch together, in real time',
    description:
      'An entertaining platform for watching movies and videos together with friends and family on a local host. Upload any video and share the experience with your loved ones in real time.',
    domain: 'FULL-STACK WEB',
    status: 'LIVE',
    stack: ['React', 'Node.js', 'Python', 'HTML', 'CSS'],
    url: 'https://suriyasivakumar20.github.io/Watch_Hub/',
    github: 'https://github.com/SuriyaSivakumar20/Watch_Hub',
    image:
      'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'LIVE' },
      { label: 'DOMAIN', value: 'REALTIME MEDIA' },
    ],
  },
  {
    id: 'mail-dispatcher',
    index: 3,
    title: 'Mail Dispatcher',
    tagline: 'Bulk email automation',
    description:
      'A web-based bulk email automation platform. Validates recipient lists, customises content per-recipient, and sends mass emails reliably — cutting manual email effort by 80%.',
    problem:
      'Sending customised mass emails by hand is slow, error-prone and impossible to scale.',
    solution:
      'A web platform that validates recipient lists, personalises content per recipient, and sends reliably at scale.',
    results: 'Cut manual email effort by 80%.',
    domain: 'AUTOMATION',
    status: 'LIVE',
    stack: ['HTML', 'CSS', 'JS'],
    url: 'https://suriyasivakumar20.github.io/Mail_Dispatcher/',
    github: 'https://github.com/SuriyaSivakumar20/Mail_Dispatcher',
    image:
      'https://images.pexels.com/photos/4913769/pexels-photo-4913769.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'LIVE' },
      { label: 'IMPACT', value: '−80% EMAIL EFFORT' },
    ],
  },
  {
    id: 'resume-screening',
    index: 4,
    title: 'Automated Resume Screening',
    tagline: 'Hackathon-winning hiring AI',
    description:
      'Hackathon-winning project that uses AI to match resumes with job descriptions, reducing hiring time by 70%. Uploading the resumes and job descriptions, the AI model analyzes and ranks candidates based on their fit for the role.',
    problem:
      'Recruiters spend hours manually matching resumes to job descriptions.',
    solution:
      'An AI model that analyzes uploaded resumes and job descriptions, then ranks candidates by fit.',
    results: 'Reduced hiring time by 70%.',
    domain: 'AI / ML / NLP',
    status: 'PROJECT',
    stack: ['Python', 'ML', 'NLP', 'React'],
    github: 'https://github.com/SuriyaSivakumar20/Resume-Screening',
    image:
      'https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'PROJECT' },
      { label: 'IMPACT', value: '−70% HIRING TIME' },
    ],
  },
  {
    id: 'phishing-detection',
    index: 5,
    title: 'AI Phishing Detection',
    tagline: 'NLP threat detection',
    description:
      'A machine learning model that detects phishing attempts in emails and messages with 96% accuracy using natural language processing.',
    problem:
      'Phishing attempts hide inside convincing emails and messages that pass rule-based checks.',
    solution:
      'An NLP machine learning model that classifies emails and messages as phishing attempts.',
    results: '96% detection accuracy.',
    domain: 'CYBERSECURITY / NLP',
    status: 'PROJECT',
    stack: ['Python', 'TensorFlow', 'Cybersecurity', 'NLP'],
    github: 'https://github.com/SuriyaSivakumar20/Phishing-Detection',
    image:
      'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'PROJECT' },
      { label: 'ACCURACY', value: '96%' },
    ],
  },
  {
    id: 'ipv6',
    index: 6,
    title: 'IPv6 Transmission Mechanism',
    tagline: 'Protocol design',
    description:
      'A novel approach to IPv6 packet transmission that improves efficiency in mixed IPv4/IPv6 networks by 35%.',
    problem:
      'Mixed IPv4/IPv6 networks transmit packets inefficiently.',
    solution:
      'A novel IPv6 packet transmission mechanism designed for mixed-network efficiency.',
    results: '35% efficiency improvement in mixed networks.',
    domain: 'NETWORKING / RESEARCH',
    status: 'PROJECT',
    stack: ['Networking', 'Python', 'Protocol Design'],
    github: 'https://github.com/SuriyaSivakumar20/IPv6-Transmission-Mechanism',
    image:
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2',
    facts: [
      { label: 'STATUS', value: 'PROJECT' },
      { label: 'GAIN', value: '+35% EFFICIENCY' },
    ],
  },
];

export interface StackGroup {
  id: string;
  label: string;
  sys: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    sys: 'UI / INTERFACES',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    sys: 'SERVICES / APIS',
    items: ['Python', 'Flask', 'Node.js', 'Go', 'Java', 'Computer Networks'],
  },
  {
    id: 'data',
    label: 'DATA',
    sys: 'STORAGE / QUERIES',
    items: ['SQL', 'MongoDB'],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    sys: 'MODELS / NLP',
    items: ['Scikit-learn', 'TensorFlow', 'NLP', 'Prompt Engineering'],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    sys: 'WORKFLOW',
    items: ['Git', 'Figma', 'Docker', 'AWS', 'Canva', 'StarUML'],
  },
];

export const languages = [
  { name: 'Python', level: 85 },
  { name: 'JavaScript', level: 60 },
  { name: 'C++', level: 65 },
  { name: 'Java', level: 65 },
  { name: 'Go', level: 60 },
  { name: 'SQL', level: 70 },
];

/* Builds (projects + internships) used to derive technology
   connections. Co-appearing technologies light up together. */
export const builds: { name: string; techs: string[] }[] = [
  { name: 'FoundersAICircle', techs: ['Python', 'NLP', 'Machine Learning', 'TypeScript', 'Flask'] },
  { name: 'Movie Hub', techs: ['React', 'Node.js', 'Python', 'HTML', 'CSS'] },
  { name: 'Mail Dispatcher', techs: ['HTML', 'CSS', 'JS'] },
  { name: 'Resume Screening', techs: ['Python', 'ML', 'NLP', 'React'] },
  { name: 'Phishing Detection', techs: ['Python', 'TensorFlow', 'NLP', 'Cybersecurity'] },
  { name: 'IPv6 Mechanism', techs: ['Networking', 'Python', 'Protocol Design'] },
  { name: 'CaratLane', techs: ['SQL', 'Node', 'Go'] },
  { name: 'Exposys Data Labs', techs: ['HTML', 'CSS', 'JS', 'MongoDB'] },
  { name: 'VEI Technologies', techs: ['NLP', 'Python'] },
];

/* Canonical renderable skill set (from the Skills page) */
export const skillIndex = new Set(
  stackGroups.flatMap((g) => g.items),
);

export interface Achievement {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  meta: string;
}

export const achievements: Achievement[] = [
  {
    id: 'caratlane',
    title: 'CaratLane Internship',
    description:
      'A real-world experience at a Tata Product. Worked on improving the user experience of the EZ Sales app, its backend working concept, and internal team dependency automation scripts.',
    image: '/caratlane.jpg',
    date: 'Dec 2025',
    meta: 'INTERNSHIP',
  },
  {
    id: 'global-ai-hackathon',
    title: 'Global AI Hackathon 2025 — Selected',
    description:
      'Selected in one of the Global AI Hackathons. Built a vision-based accessibility tool for the visually impaired in 48 hours — turning a real-world problem into a productive solution.',
    image: '/hackathon-victory.jpeg',
    date: 'Nov 2025',
    meta: 'HACKATHON',
  },
  {
    id: 'motivation',
    title: 'Motivation Session',
    description:
      'Conducted a motivation session for first-year students at my college — sharing my journey and insights to inspire them, alongside my friends.',
    image: '/motivation-session.jpg',
    date: 'Oct 2025',
    meta: 'TALKS',
  },
  {
    id: 'lse',
    title: 'LSE Internship',
    description:
      'A great stint at LSE Global Academy — developed interpersonal skills and trained students to see English as just a language. Incredible team spirit.',
    image: '/lse-internship.jpeg',
    date: 'Sep 2025',
    meta: 'INTERNSHIP',
  },
  {
    id: 'offer-letter',
    title: 'First Offer Letter',
    description:
      'A memorable day celebrating years of hard work, late-night coding, and amazing friendships.',
    image: '/offer-letter.jpeg',
    date: 'Sep 2025',
    meta: 'MILESTONE',
  },
  {
    id: 'open-source',
    title: 'Open Source Journey',
    description:
      'Contributed to multiple AI open-source repositories — 10+ merged PRs across projects in NLP tooling and ML utilities.',
    image: '/open-source.jpeg',
    date: 'Mar 2025',
    meta: 'COMMUNITY',
  },
  {
    id: 'tech-talk',
    title: 'First Tech Talk',
    description:
      'Gave my first public paper presentation on Business Intelligence at the university level. Nervous but thrilled!',
    image: '/tech-talk.jpeg',
    date: 'Oct 2024',
    meta: 'TALKS',
  },
  {
    id: 'innovation',
    title: 'Best Innovation Award',
    description:
      'Received the Best Innovation Award at our college\u2019s first-ever inter-departmental event for a gamified learning concept that engaged 50+ students.',
    image: '/innovation-award.jpeg',
    date: 'Dec 2023',
    meta: 'AWARD',
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Manakula Vinayagar Institute of Technology',
    period: '2022 — 2026',
    detail: 'CGPA 8.4/10',
    courses: ['Data Structures & Algorithms', 'Database Management System', 'Artificial Intelligence', 'Computer Networks'],
  },
  {
    degree: 'High School',
    institution: 'Petit Seminare Higher Secondary School',
    period: '2020 — 2022',
    detail: 'Distinction in Mathematics, Physics & Biology',
    courses: ['Mathematics', 'Physics', 'Biology'],
  },
];

export const certifications = [
  'Deep Learning Specialization — Coursera (Andrew Ng)',
  'TensorFlow Developer Certification — Google',
  'AWS Certified Machine Learning — Specialty',
  'Full Stack Web Development — Udemy',
  'Python & C Programming — Edusphere',
  'Cyber Security Certificate — Forage',
  'NLP with Deep Learning — Coursera',
  'Google Cyber Security Certificate — Coursera',
  'UI/UX Design — VEI Technologies',
  'HTML/CSS — Free Code Camp (Datanerdz.ai)',
  'Workshops: AI & LLM (NIT Puducherry) · Cyber Security (IIT Madras)',
  'Hackathons: Yi-Innovation · Unisys · Smart India Hackathon',
];

export const funFacts = [
  {
    title: 'HACKATHON SELECTED',
    text: 'Selected in a Global AI Hackathon 2025 — built a vision-based accessibility tool for the visually impaired in 48 hours.',
  },
  {
    title: 'FREELANCE DEVELOPER',
    text: 'Delivered 4+ client projects while pursuing my degree — from AI chatbots to bulk email systems.',
  },
  {
    title: 'OPEN SOURCE',
    text: 'Actively contributes to AI open-source projects with 10+ merged contributions across multiple repositories.',
  },
];

/* Sections for nav + command interface */
export const sections = [
  { id: 'top', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'stack', label: 'Stack', path: '/stack' },
  { id: 'skills', label: 'Skills', path: '/skills' },
  { id: 'career', label: 'Education & Achievements', path: '/achievements' },
  { id: 'contact', label: 'Contact', path: '/contact' },
] as const;