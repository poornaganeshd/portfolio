import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "AI Chatbot",
    description: "Conversational AI built with OpenRouter APIs.",
    githubUrl: "https://github.com/yourusername/ai-chatbot",
    demoUrl: "https://ai-chatbot.vercel.app",
    tags: ["AI", "Chatbot", "Next.js"], // 👈 add tags
  },
  {
    title: "Portfolio Website",
    description: "The site you are currently browsing.",
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "https://portfolio.vercel.app",
    tags: ["Portfolio", "Tailwind", "React"], // 👈 add tags
  },
];


export default function ProjectsPage() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
}
