import { Metadata } from "next";
import Link from "next/link";
import { thoughts } from "@/data/thoughts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return thoughts.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const thought = thoughts.find((t) => t.slug === slug);
  if (!thought) return {};
  return {
    title: `${thought.title} | Poornaganesh`,
    description: thought.excerpt,
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const thought = thoughts.find((t) => t.slug === slug);
  if (!thought) notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F1F1]">
      <article className="max-w-3xl mx-auto px-6 md:px-8 pt-40 pb-32">
        {/* Back */}
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00F0FF] opacity-70 hover:opacity-100 transition-opacity mb-16"
        >
          &larr; All thoughts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#00F0FF] opacity-70">
            {new Date(thought.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="w-4 h-[1px] bg-white/20" />
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">
            {thought.readTime} read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white mb-8">
          {thought.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {thought.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest opacity-50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content placeholder */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="font-serif text-xl italic leading-relaxed opacity-70">{thought.excerpt}</p>
          <div className="mt-12 border-t border-white/10 pt-12">
            <p className="font-mono text-xs uppercase tracking-widest opacity-30">
              Full essay coming soon.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
