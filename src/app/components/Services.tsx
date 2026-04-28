"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: "01",
    title: "AGENTIC AI",
    desc: "I build systems that think, plan, and act. Autonomous agents that handle research, content, and workflow — without hand-holding.",
    specs: ["LangChain / LangFlow", "n8n Orchestration", "OpenRouter APIs", "Multi-Agent Systems"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
  },
  {
    id: "02",
    title: "ENGINEERING",
    desc: "Robust software built with intention. Full-stack systems that perform at scale and feel fast — because performance is a feature.",
    specs: ["Next.js / React", "TypeScript + Python", "Supabase + Edge", "GSAP + WebGL"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)",
  },
  {
    id: "03",
    title: "CINEMA",
    desc: "The long-term obsession. Film is the most powerful storytelling medium alive — and I'm working toward telling stories in it.",
    specs: ["Narrative Direction", "Cinematography", "Visual Storytelling", "Film Theory"],
    gradient: "linear-gradient(135deg, #0f172a 0%, #1c1917 100%)",
  },
];

export default function Services() {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalWidth = sliderRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const scrollDistance = totalWidth - windowWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (scrollDistance + window.innerHeight),
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(sliderRef.current, { x: -scrollDistance, ease: "none" });

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top top",
            end: () => "+=" + scrollDistance,
            scrub: 1,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={componentRef}
      className="relative bg-[#0F172A] overflow-hidden min-h-screen text-white"
    >
      <div
        ref={progressRef}
        className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-aqua)] z-50 origin-left hidden md:block"
      />

      <div
        ref={sliderRef}
        className="h-full flex flex-col md:flex-row md:flex-nowrap w-full md:w-[300vw]"
      >
        {/* Intro slide */}
        <div className="w-full md:w-screen min-h-screen md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0 relative bg-[#0F172A]">
          <div className="text-center p-6 md:p-10">
            <h2 className="font-display text-[15vw] leading-[0.95] tracking-normal uppercase text-white mix-blend-difference mb-6">
              MY<br />CRAFT
            </h2>
            <p className="font-serif text-lg md:text-xl opacity-60 max-w-md mx-auto">
              Three obsessions. One person. Scroll to explore.
            </p>
            <div className="mt-12 animate-bounce opacity-50 text-2xl hidden md:block">&rarr;</div>
            <div className="mt-12 animate-bounce opacity-50 text-2xl md:hidden">&darr;</div>
          </div>
        </div>

        {/* Pillar slides */}
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="w-full md:w-screen min-h-screen md:h-full flex flex-col md:flex-row border-b md:border-b-0 md:border-r border-white/10 shrink-0 relative group"
            style={{ background: pillar.gradient }}
          >
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none leading-none">
              {pillar.id}
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-24 relative z-10">
              <div className="max-w-4xl w-full">
                <span className="font-mono text-[var(--accent-aqua)] tracking-widest text-sm mb-4 block">
                  0{i + 1} / 03
                </span>

                <h3 className="text-5xl md:text-9xl font-display font-bold mb-8 md:mb-12 uppercase text-white tracking-tight">
                  {pillar.title}
                </h3>

                <p className="font-serif text-xl md:text-4xl leading-relaxed mb-8 md:mb-12 opacity-80 max-w-2xl text-white/90">
                  {pillar.desc}
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4">
                  {pillar.specs.map((spec, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 md:px-6 md:py-3 border border-white/20 rounded-full text-xs md:text-base uppercase tracking-wider bg-white/5 text-white hover:bg-white hover:text-black transition-colors duration-300"
                      onMouseEnter={() => setCursorType("hover")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
