export interface Thought {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
}

export const thoughts: Thought[] = [
  {
    slug: "why-agents-change-everything",
    title: "Why AI Agents Change Everything",
    excerpt:
      "We're not building chatbots anymore. We're building autonomous systems that can reason, plan, and act. Here's why that distinction matters more than anyone is admitting.",
    date: "2025-03-12",
    tags: ["AI", "Agents", "Future"],
    readTime: "5 min",
  },
  {
    slug: "cinema-and-code",
    title: "Cinema and Code Are the Same Thing",
    excerpt:
      "Both are about directing attention. A film editor and a UI engineer solve identical problems — they just call the tools by different names. I live in both worlds simultaneously.",
    date: "2025-02-04",
    tags: ["Film", "Design", "Philosophy"],
    readTime: "4 min",
  },
  {
    slug: "building-in-public-as-a-solo-builder",
    title: "On Building in Public as a Solo Builder",
    excerpt:
      "Shipping alone is terrifying. Shipping publicly is terrifying and liberating. A reflection on why transparency is the best accountability system I've ever found.",
    date: "2025-01-18",
    tags: ["Building", "Indie", "Mindset"],
    readTime: "3 min",
  },
  {
    slug: "the-filmmaker-who-codes",
    title: "The Filmmaker Who Codes",
    excerpt:
      "I never planned to become a developer. I wanted to make films. Turns out those two paths are converging faster than anyone expected — and I am standing at exactly that intersection.",
    date: "2024-12-29",
    tags: ["Film", "Tech", "Personal"],
    readTime: "6 min",
  },
];
