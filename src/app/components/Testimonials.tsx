"use client";

import React from "react";
import Link from "next/link";
import { useCursor } from "../context/CursorContext";
import { thoughts } from "@/data/thoughts";

export default function ThoughtsPreview() {
  const { setCursorType } = useCursor();
  const featured = thoughts.slice(0, 2);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center bg-[#0A0A0A] px-6 md:px-20 py-32 border-t border-white/5 relative overflow-hidden">
      {/* Ambient line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="flex justify-between items-end mb-20 md:mb-28">
          <h2 className="font-display text-[12vw] leading-[0.9] tracking-tighter uppercase text-white mix-blend-difference">
            THOUGHTS
          </h2>
          <Link
            href="/thoughts"
            className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#00F0FF] hover:text-white transition-colors"
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            All thoughts <span className="text-lg">&rarr;</span>
          </Link>
        </div>

        <div className="space-y-20 md:space-y-28">
          {featured.map((thought, i) => (
            <Link
              key={i}
              href={`/thoughts/${thought.slug}`}
              className="group relative block"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-16">
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
                  <h3 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-500 mb-4">
                    {thought.title}
                  </h3>
                  <p className="text-base md:text-lg opacity-50 leading-relaxed max-w-2xl font-serif italic">
                    {thought.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-2 md:pt-10 shrink-0">
                  {thought.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest opacity-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-[1px] bg-white/10 group-hover:bg-[#00F0FF]/30 transition-colors duration-500" />
            </Link>
          ))}
        </div>

        <Link
          href="/thoughts"
          className="mt-16 flex md:hidden items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#00F0FF] hover:text-white transition-colors"
          onMouseEnter={() => setCursorType("hover")}
          onMouseLeave={() => setCursorType("default")}
        >
          All thoughts <span className="text-lg">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
