// Single source of truth for everything the site renders.
// Edit here — the pages read from these objects.

export const profile = {
  name: "Harish B",
  firstName: "Harish",
  initials: "H",
  // Photo lives at public/logos/me.jpeg. Swap the path to change it;
  // if the file is missing a monogram shows instead.
  avatar: "/logos/me.jpeg",
  // How the photo is framed inside its round tile. The source is a wide desk
  // shot, so it's zoomed in and nudged onto the face. If you swap the photo:
  // raise/lower `scale` to zoom, and adjust `translate(x, y)` — negative x
  // moves the crop right, positive y moves it up.
  avatarFraming: "scale(2.2) translate(-11%, 6%)",
  role: "CS Student & Software Developer",
  // The hero renders these as: "I'm a {lead} & {accent}."
  roleLead: "CS Student",
  roleAccent: "Software Developer",
  tagline:
    "I build scalable web architectures and AI-integrated systems — production-ready features that cut manual effort and keep data honest.",
  location: "Coimbatore, India",
  email: "imharishba@gmail.com",
  // Opens in a new tab for reading — deliberately not a download link.
  resumeUrl: "/resume/Harish_B_S76.pdf",
  available: true,
  availableLabel: "Open to work",
  socials: {
    github: "https://github.com/harishb2006",
    linkedin: "https://www.linkedin.com/in/harishb2006",
    leetcode: "https://leetcode.com/u/harishb2006",
  },
};

export const nowBuilding = {
  title: "An AI platform for finance",
  note: "Production-grade AI infrastructure for financial workflows — the kind that has to be right, not just plausible.",
  status: "In active development",
  tags: ["Agentic AI", "RAG", "Finance"],
};

export const experience = [
  {
    role: "AI / Software Engineering Intern",
    company: "Aarogya ID",
    org: "Vesak Technologies Pvt. Ltd.",
    period: "May 2026 — Aug 2026",
    status: "Completed",
    logo: "/logos/Aarogya.png",
    url: "",
    summary:
      "Built a non-chat AI adjudication workflow for payer-side healthcare claims — the agents, sub-agents and RAG pipelines behind one automated flow.",
    points: [
      "Rebuilt and tuned the claim-processing modules and tuned the agents behind them.",
      "Optimised the RAG pipelines and the async processing that feeds them.",
      "Shipped it to production and fixed the live issues that followed.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "Vertex AI",
      "Qdrant",
      "MongoDB",
      "GCP",
    ],
  },
];

export const education = {
  program: "BCA — Software Product Engineering",
  school: "Kalvium",
  detail: "UG Program in CS · University of Mysore · Coimbatore campus",
  period: "2024 — 2028",
  logo: "/logos/Kalvium.png",
  url: "https://kalvium.com",
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  category: "AI" | "Full-Stack" | "Web";
  year: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "nexis",
    title: "Nexis",
    subtitle: "Agentic AI for e-commerce support",
    description:
      "Agentic system that classifies intent and calls functions to run hybrid RAG plus live database operations, so support answers stay grounded in real order data.",
    stack: ["MERN", "Llama 3.3", "MongoDB", "Cohere"],
    category: "AI",
    year: "2025",
    github: "https://github.com/harishb2006/Nexis.git",
  },
  {
    slug: "rulebook-ai",
    title: "RuleBook AI",
    subtitle: "Source-grounded policy retrieval",
    description:
      "Enterprise RAG system that lets employees query HR and corporate policy PDFs with citations on every answer, replacing manual document lookups.",
    stack: ["FastAPI", "React", "LangChain", "Pinecone"],
    category: "AI",
    year: "2025",
    github: "https://github.com/harishb2006/DocGuard.git",
  },
  {
    slug: "collab-o",
    title: "Collab-O",
    subtitle: "AI freelance collaboration platform",
    description:
      "Capstone platform matching clients with freelancers — AI-assisted scoping, milestone tracking and payments in one flow.",
    stack: ["MERN", "Gemini", "Stripe", "Tailwind"],
    category: "Full-Stack",
    year: "2025",
    github:
      "https://github.com/kalviumcommunity/S76_harish_Capstone_collab_o.git",
    live: "https://freecoll.netlify.app/",
  },
  {
    slug: "dataspeaks",
    title: "DataSpeaks",
    subtitle: "Plain English to SQL",
    description:
      "Turns natural language questions into safe, schema-aware SQL queries with retrieval over table metadata.",
    stack: ["TypeScript", "Next.js", "RAG", "LangChain"],
    category: "AI",
    year: "2025",
    github: "https://github.com/kalviumcommunity/DataSpeaks.git",
  },
  {
    slug: "whiteboard-to-code",
    title: "Whiteboard to Code",
    subtitle: "Draw it, ship it",
    description:
      "Collaborative canvas with real-time drawing and chat that turns sketched interfaces into working component code.",
    stack: ["React", "Socket.io", "Canvas API", "Node.js"],
    category: "Full-Stack",
    year: "2025",
    github: "https://github.com/harishb2006/WhiteBoardToCode.git",
  },
  {
    slug: "knowledge-assistant",
    title: "Knowledge Assistant",
    subtitle: "Personal retrieval layer",
    description:
      "AI assistant that indexes scattered notes and documents, then answers questions against them with traceable sources.",
    stack: ["Python", "LangChain", "Gemini", "RAG"],
    category: "AI",
    year: "2024",
    github: "https://github.com/harishb2006/know.git",
  },
  {
    slug: "cultura-connect",
    title: "Cultura Connect",
    subtitle: "Social layer for regional culture",
    description:
      "Community platform for documenting and discovering lesser-known Indian cultural practices, with real-time feeds.",
    stack: ["Next.js", "TypeScript", "Material UI", "Realtime"],
    category: "Web",
    year: "2024",
    github: "https://github.com/kalviumcommunity/s76_Weird_Indian_cultures.git",
  },
  {
    slug: "ecommerce-platform",
    title: "Commerce Platform",
    subtitle: "Cart to checkout, end to end",
    description:
      "Scalable storefront with catalog, cart, order lifecycle and payment integration built from the ground up.",
    stack: ["React", "Node.js", "PayPal", "MongoDB"],
    category: "Full-Stack",
    year: "2024",
    github: "https://github.com/harishb2006/Ecommerce-Follow-Along.git",
  },
  {
    slug: "ai-notes",
    title: "AI Notes Taker",
    subtitle: "Notes that summarise themselves",
    description:
      "Note-taking app that structures raw capture into summaries, action items and searchable threads.",
    stack: ["Python", "LangChain", "Gemini", "Firebase"],
    category: "AI",
    year: "2024",
  },
];

// Scrolling toolkit strip on the home page.
export const marqueeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "LangChain",
  "Pinecone",
  "Postgres",
  "MongoDB",
  "Docker",
  "AWS",
  "Redis",
  "Tailwind",
];
