"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { thoughts } from "@/data/thoughts";
import { useCursor } from "../context/CursorContext";
import Footer from "../components/Footer";

const tagColors: Record<string, string> = {
  AI: "#00F0FF",
  Agents: "#8075FF",
  Future: "#8075FF",
  Film: "#FF006E",
  Design: "#FF006E",
  Philosophy: "#FF006E",
  Building: "#F0A500",
  Indie: "#F0A500",
  Mindset: "#F0A500",
  Tech: "#00F0FF",
  Personal: "#FF006E",
};

export default function ThoughtsClient() {
  const { setCursorType } = useCursor();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".thought-row", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black">
      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00F0FF] opacity-70 block mb-6">
            Thoughts
          </span>
          <h1 className="font-display text-[15vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase text-white">
            IDEAS &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8075FF] to-[#00F0FF]">
              WORDS
            </span>
          </h1>
          <p className="mt-8 font-serif italic text-xl opacity-50 max-w-lg">
            Unpolished observations on AI, cinema, and the act of building things.
          </p>
        </div>
      </section>

      {/* Thought list */}
      <section ref={listRef} className="px-6 md:px-20 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col">
          {thoughts.map((thought, i) => (
            <Link
              key={i}
              href={`/thoughts/${thought.slug}`}
              className="thought-row group border-b border-white/10 py-10 md:py-14 flex flex-col md:flex-row justify-between items-start gap-6 hover:bg-white/[0.02] px-2 -mx-2 transition-colors duration-300 opacity-0"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#00F0FF] opacity-70">
                    {new Date(thought.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="w-4 h-[1px] bg-white/20" />
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">
                    {thought.readTime} read
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-light leading-tight tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-400 mb-4">
                  {thought.title}
                </h2>

                <p className="text-sm md:text-base opacity-40 leading-relaxed max-w-2xl font-serif italic">
                  {thought.excerpt}
                </p>
              </div>

              {/* Right: tags + arrow */}
              <div className="flex md:flex-col items-end gap-2 shrink-0">
                <div className="flex flex-wrap md:flex-col gap-2">
                  {thought.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border opacity-60"
                      style={{
                        borderColor: tagColors[tag] ? tagColors[tag] + "40" : "#ffffff20",
                        color: tagColors[tag] ?? "#ffffff",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-2xl text-white/20 group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all duration-300 hidden md:block mt-4">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
