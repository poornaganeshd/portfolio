export type ProductStatus = "live" | "beta" | "in-dev";

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: ProductStatus;
  year: string;
  image: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
}

export const products: Product[] = [
  {
    slug: "neural-scape",
    title: "Neural Scape",
    tagline: "Visualise the invisible mind",
    description:
      "An interactive 3D visualisation of neural network architectures — making AI concepts tangible, explorable, and beautiful for anyone curious enough to look.",
    tags: ["AI", "WebGL", "Three.js", "Next.js"],
    status: "live",
    year: "2024",
    image: "/images/neural-scape.png",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    slug: "void-terminal",
    title: "Void Terminal",
    tagline: "A command line for the creative mind",
    description:
      "An AI-powered terminal experience that bridges creative writing and code. Ask, build, create — all from one dark, minimal interface.",
    tags: ["AI Agents", "CLI", "Node.js", "LLM"],
    status: "beta",
    year: "2024",
    image: "/images/void-terminal.png",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    slug: "frame-ai",
    title: "Frame AI",
    tagline: "Turn story into shot list",
    description:
      "An agentic tool that reads a film script and generates a production-ready shot list, scene breakdowns, and mood board suggestions — bridging my two worlds.",
    tags: ["AI Agents", "Film", "Python", "Next.js"],
    status: "in-dev",
    year: "2025",
    image: null,
    demoUrl: null,
    githubUrl: "#",
  },
  {
    slug: "scout",
    title: "Scout",
    tagline: "Research at the speed of thought",
    description:
      "An autonomous research agent that aggregates, synthesises, and presents information across the web — no prompt engineering required.",
    tags: ["Agentic AI", "n8n", "Langflow", "React"],
    status: "live",
    year: "2024",
    image: null,
    demoUrl: "#",
    githubUrl: "#",
  },
];

// Legacy export for backward compatibility
export const projects = products.map((p) => ({
  title: p.title,
  description: p.description,
  githubUrl: p.githubUrl ?? "#",
  demoUrl: p.demoUrl ?? "#",
  tags: p.tags,
}));
