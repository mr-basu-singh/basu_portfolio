// All site copy lives here so content edits never require touching component/layout code.

export const profile = {
  name: 'Basu Singh',
  fullName: 'Kumar Basu Singh',
  title: 'AI Agent Engineer',
  email: 'basueps@gmail.com',
  phone: '+91-9311551167',
  location: 'New Delhi, India',
  github: 'https://github.com/mr-basu-singh',
  linkedin: 'https://www.linkedin.com/in/kumar-basu-singh/',
  resumeFile: '/docs/Kumar_Basu_Singh_Resume.pdf',
  resumeDownloadName: "Kumar Basu Singh's Resume.pdf",
};

export const heroContent = {
  kaiIntro: "Hi, I'm Kai — Basu's AI assistant, built by Basu Singh, an AI Agent Engineer.",
  headlinePre: 'Building AI agents that ',
  headlineHighlight: 'think, decide, and act',
  headlinePost: " — so humans don't have to do the repetitive part.",
  sub: "I design and build multi-agent systems that automate complex workflows, make reliable decisions, and deliver real business value.",
  ctaPrimary: 'Explore My Agents',
  ctaSecondary: 'Download Resume',
  scrollCue: 'Scroll for exploring portfolio',
};

export const stats = [
  { value: '6+', label: 'AI Agents Built', icon: 'shield' },
  { value: '4+', label: 'LLMs Integrated', icon: 'box' },
  { value: '10+', label: 'GitHub Repositories', icon: 'github' },
  { value: '5+', label: 'Multi-Agent Pipelines', icon: 'network' },
  { value: '15+', label: 'Tools & APIs Used', icon: 'wrench' },
  { value: '100+', label: 'GitHub Contributions', icon: 'link' },
];

export const about = {
  eyebrow: 'origin node',
  title: 'About Me',
  paragraphs: [
    "I'm an AI Agent Engineer who builds systems that reason, decide, and act — not just respond.",
    'I design multi-agent pipelines where several agents work together in a coordinated, step-by-step process — each handling a specific part of a larger decision, passing context forward, until the system produces an output a human would otherwise have to generate manually.',
    "What I care about most is making sure an autonomous agent can be trusted to make the right call, not just generate a plausible-sounding one — the difference between a demo and something you'd actually put into production.",
    "I'm a fresher, applying my hands-on experience in agent orchestration to real-world roles where autonomous systems can take real workload off real people.",
  ],
};

export const expertise = [
  {
    key: 'lang',
    title: 'Programming Languages',
    items: ['Python'],
  },
  {
    key: 'stack',
    title: 'AI / Agentic Stack',
    items: ['LangChain', 'LangGraph', 'Multi-Agent Systems', 'Agent Orchestration', 'Tool Calling', 'RAG', 'Prompt Engineering', 'LLM Integration', 'API Integration'],
  },
  {
    key: 'models',
    title: 'Models & APIs',
    items: ['Llama 3.1', 'Llama 3.3', 'Groq API', 'OpenAI', 'Tavily', 'EXA Search'],
  },
  {
    key: 'data',
    title: 'Data & Retrieval',
    items: ['FAISS', 'ChromaDB', 'Embeddings', 'Document Loaders', 'Text Splitters'],
  },
  {
    key: 'tools',
    title: 'Dev Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Claude Code', 'Docker', 'Postman', 'FastAPI'],
  },
];

export const projects = [
  {
    id: 'resume-agent',
    num: 'A1',
    title: 'AI Resume Matching Agent',
    desc: '6-agent workflow that analyzes 25+ resumes at once, scores candidates against a job description, and auto-ranks them with explanations.',
    stack: ['Python', 'LangChain', 'Groq', 'Streamlit'],
    demo: 'https://mr-basu-singh-ai-resume-matching-agent-app-zrljfo.streamlit.app/',
    github: 'https://github.com/mr-basu-singh/AI-Resume-Matching-Agent',
  },
  {
    id: 'career-mentor',
    num: 'A2',
    title: 'AI Career Mentor Agent',
    desc: '3-node LangGraph workflow that builds a personalized, phase-wise learning roadmap with verified docs and a downloadable PDF.',
    stack: ['Python', 'LangGraph', 'Groq', 'Tavily', 'ReportLab'],
    demo: 'https://aicareermentoragent-2t243896yctlxcyvrvitqh.streamlit.app/',
    github: 'https://github.com/mr-basu-singh/AICareerMentorAgent',
  },
  {
    id: 'tour-guide',
    num: 'A3',
    title: 'AI Tour Guide Agent',
    desc: '7-agent multi-phase travel planner with destination research, itinerary, hotels, currency-aware budgeting, and targeted refinement.',
    stack: ['Python', 'LangGraph', 'Tavily', 'Groq', 'ReportLab'],
    demo: 'https://ai-tour-guide-agent.streamlit.app/',
    github: 'https://github.com/mr-basu-singh/AI-Tour-Guide-Agent',
  },
  {
    id: 'aiforge',
    num: 'A4',
    title: 'AIForge (LLM Evaluation)',
    desc: 'Benchmarking platform with hallucination detection and LLM-as-a-judge evaluation across 4 models, 15 REST endpoints, Docker deployment.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Docker'],
    demo: null,
    github: 'https://github.com/mr-basu-singh/AIForge',
  },
  {
    id: 'blog-agent',
    num: 'A5',
    title: 'Blog Generation Agent',
    desc: 'Agent that researches topics and writes/publishes SEO-aware blog posts automatically, with multi-language output (English, French, Hindi).',
    stack: ['Python', 'LangGraph', 'FastAPI'],
    demo: null,
    github: 'https://github.com/mr-basu-singh/Blog-Generation-Agent',
  },
  {
    id: 'agentic-chatbot',
    num: 'A6',
    title: 'Agentic ChatBot',
    desc: 'Autonomous chatbot with memory, tool integration, multi-step reasoning, and context awareness for complex multi-turn conversations.',
    stack: ['Python', 'LangChain', 'Groq'],
    demo: null,
    github: 'https://github.com/mr-basu-singh/Agentic-ChatBot',
  },
];

export const whyBuilt = [
  {
    id: 'resume-agent',
    title: 'AI Resume Matching Agent',
    problem: 'Recruiters spend hours manually screening resumes.',
    solution: 'Multi-agent system that parses, scores & ranks candidates automatically.',
    impact: 'Faster shortlisting with accurate, explainable scoring.',
  },
  {
    id: 'career-mentor',
    title: 'AI Career Mentor Agent',
    problem: "People don't know what skills to learn or how to grow.",
    solution: 'Agent that maps skills to verified docs and a phased roadmap.',
    impact: 'Personalized, job-ready guidance in one place.',
  },
  {
    id: 'tour-guide',
    title: 'AI Tour Guide Agent',
    problem: 'Planning a trip end-to-end is fragmented and time-consuming.',
    solution: '7-agent pipeline covering destinations to budget and PDF delivery.',
    impact: 'Hours of trip planning turned into minutes.',
  },
  {
    id: 'aiforge',
    title: 'AIForge (LLM Evaluation)',
    problem: 'Choosing the right LLM for production is mostly guesswork.',
    solution: 'Benchmarking platform with hallucination detection & LLM-as-judge.',
    impact: 'Data-driven model selection on quality and cost.',
  },
  {
    id: 'blog-agent',
    title: 'Blog Generation Agent',
    problem: 'Creating consistent, SEO-aware content at scale is slow.',
    solution: 'Agent that researches, writes, and publishes automatically.',
    impact: 'Consistent content creation, including multi-language output.',
  },
  {
    id: 'agentic-chatbot',
    title: 'Agentic ChatBot',
    problem: "Traditional bots can't handle complex, multi-step conversations.",
    solution: 'Chatbot with memory, tools & multi-step reasoning.',
    impact: 'Smarter, more genuinely helpful conversations.',
  },
];

export const process = [
  {
    step: 1,
    title: 'Understand the Task',
    text: "Before writing any code, I figure out who the agent is actually for and what task they're currently doing manually. I identify what data or tools the agent needs access to — an API, a document, real-time search — since that shapes everything downstream.",
  },
  {
    step: 2,
    title: 'Design the Architecture',
    text: "I decide whether the task needs a single agent or several specialized ones. If the task has distinct phases — research, then decide, then produce output — that's usually a sign multiple focused agents will be more reliable than one giant prompt. I sketch how agents pass information to each other.",
  },
  {
    step: 3,
    title: 'Set Up the Skeleton',
    text: 'Folder structure, data models (e.g. Pydantic schemas for valid input/output), config, and how state flows through the pipeline — all before writing agent logic. Skipping this is how agent projects turn into unmaintainable spaghetti.',
  },
  {
    step: 4,
    title: 'Build & Test Each Agent',
    text: 'I build one agent at a time and test it in isolation with real and edge-case inputs before moving to the next. Testing agent-by-agent catches bugs early and tells you exactly which agent is wrong when something breaks.',
  },
  {
    step: 5,
    title: 'Integrate & Test the Pipeline',
    text: 'Once each agent works alone, I connect them and run realistic end-to-end scenarios, including edge cases a real user might trigger — empty input, contradictory requests. This is where integration bugs surface that unit tests alone never catch.',
  },
  {
    step: 6,
    title: 'Harden It',
    text: 'Before anyone else touches it: what happens if the LLM returns malformed output, an API call fails, or a user asks something out of scope? Error handling, validation, and guardrails are what separate a demo from something trustworthy.',
  },
  {
    step: 7,
    title: 'Deploy & Monitor',
    text: 'Ship it, then actually watch how real usage differs from my assumptions. Real users are creative about breaking things in ways test cases never anticipate — deployment is the start of learning, not the finish line.',
  },
];


export const certifications = [
  {
    title: 'Agentic AI with Python',
    issuer: 'Krish Naik · Udemy',
    date: '28 May 2026',
    desc: 'Hands-on training in building AI agents and multi-agent systems using LangChain, LangGraph, RAG pipelines, Vectorless RAG, Model Context Protocol (MCP), Guardrails, and LLM integration.',
    skills: ['LangChain', 'LangGraph', 'RAG Pipelines', 'Vectorless RAG', 'MCP', 'Guardrails', 'LLM Integration'],
    tools: ['Groq API', 'Tavily API', 'LangSmith', 'Postman'],
    link: 'https://www.udemy.com/certificate/UC-062a0b20-ce9b-4a5d-b494-d68bd4c6ca8c/',
  },
];

export const education = [
  { year: '2022 – 2026', title: 'B.Tech — Electrical and Electronics Engineering', institution: 'G.L. Bajaj Institute of Technology and Management', emphasize: true },
  { year: '2021', title: 'Class XII (CBSE)', institution: 'Commercial Sr. Sec. School, New Delhi' },
  { year: '2019', title: 'Class X (CBSE)', institution: 'Evergreen Public School' },
];

export const loaderExplore = [
  'About Me', 'Projects',
  'Skills', 'Education',
  'Project Workflow', 'Agent Workflow Example',
  'Resume', 'Contact',
];

export const resumeDoc = {
  skills: [
    { label: 'Programming Languages', value: 'Python' },
    { label: 'Developer Tools', value: 'Git, GitHub, VS Code, Cursor, Postman, Docker' },
    { label: 'Libraries & Frameworks', value: 'LangChain, LangGraph, Multi-Agent Systems, Agent Orchestration, Tool Calling, Tavily Search API, EXA Search, Groq API, Llama 3.1 (8B), Llama 3.3 (70B), Prompt Engineering, RAG, LLM Integration, FAISS, ChromaDB, Document Loaders, Text Splitters, Embeddings, Sentence Transformers, SQLAlchemy, FastAPI' },
    { label: 'Core Competencies', value: 'Agentic AI, Generative AI & LLMs, Vector Databases & RAG' },
    { label: 'AI Coding Assistants', value: 'Claude Code' },
  ],
  projects: [
    {
      heading: 'Lead Developer | AI Resume Matching Agent | Python, LangChain, Groq (Llama 3.3 70B), FAISS, Streamlit | GitHub',
      date: '03/2026 – 03/2026',
      demo: 'Live Demo: AI Resume Matching Agent · Streamlit',
      bullets: [
        'Engineered a 5-agent LangGraph pipeline for automated resume screening, reducing recruiter manual review time by 70% through structured multi-agent orchestration.',
        'Developed a weighted scoring engine using multi-criteria analysis (Skill, Experience, Projects, Education) to automate candidate ranking, achieving 95% alignment with manual screening benchmarks.',
        'Deployed a Streamlit-based dashboard for high-volume resume processing, enabling recruiters to filter and export ranked candidate lists from batches of 20+ resumes with sub-second latency.',
      ],
    },
    {
      heading: 'AI Career Mentor Agent | Python, LangGraph, LangChain, Groq, Tavily, Streamlit, ReportLab | GitHub',
      date: '05/2026 – 05/2026',
      demo: 'Live Demo: AI Career Mentor Agent · Streamlit',
      bullets: [
        'Architected a 3-node LangGraph workflow that dynamically extracts top 10 in-demand skills for target roles, integrating Tavily Search API to provide real-time, verified documentation links for each skill.',
        'Developed a structured roadmap generation engine that synthesizes role-specific learning paths, pro tips, and completion timelines.',
        'Automated the generation of branded, downloadable career roadmaps using ReportLab, reducing manual document creation time by 90%.',
      ],
    },
    {
      heading: 'AIForge: AI Evaluation & Agent Testing Platform | Python, FastAPI, Streamlit, Groq API | GitHub',
      date: '06/2026 – 06/2026',
      demo: null,
      bullets: [
        'Engineered a full-stack benchmarking platform evaluating 4 LLMs (Llama 3.3, Llama 3.1, Gemma 2, Qwen QwQ) against custom datasets using Sentence Transformer similarity and LLM-as-a-Judge metrics.',
        'Implemented a custom hallucination detection system with a 0.4 similarity threshold, identifying Llama 3.3 as the optimal high-performance model while validating Llama 3.1 for 4.5× cost reduction.',
        'Developed 15 REST API endpoints via FastAPI with Swagger documentation, backed by a SQLite/SQLAlchemy experiment-tracking system and Docker Compose deployment.',
      ],
    },
  ],
  certifications: [
    { title: 'Agentic AI with Python — Krish Naik (Udemy)', date: '28 May 2026', desc: 'Hands-on training in building AI agents and multi-agent systems using LangChain, LangGraph, RAG pipelines, Vectorless RAG, Model Context Protocol (MCP), Guardrails, and LLM integration.' },
  ],
  education: [
    { range: '2022 – 2026', title: 'B.Tech — Electrical and Electronics Engineering', place: 'G.L. Bajaj Institute of Technology and Management' },
    { range: '2021', title: 'Class XII (CBSE)', place: 'Commercial Sr. Sec. School' },
    { range: '2019', title: 'Class X (CBSE)', place: 'Evergreen Public School' },
  ],
  languages: ['English', 'Hindi'],
};

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Workflow', href: '#process' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const socials = [
  { key: 'github', label: 'GitHub', href: profile.github },
  { key: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
  { key: 'mail', label: 'Email', href: `mailto:${profile.email}` },
];
