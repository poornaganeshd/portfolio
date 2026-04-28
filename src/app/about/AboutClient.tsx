"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const duality = [
  {
    side: "The Engineer",
    color: "#00F0FF",
    lines: [
      "Obsessed with agentic AI systems",
      "Building products that ship and scale",
      "Thinking in loops, nodes, and pipelines",
      "At home in the terminal",
    ],
  },
  {
    side: "The Filmmaker",
    color: "#FF006E",
    lines: [
      "Studying cinema as a language",
      "Drawn to light, shadow, and silence",
      "Thinking in frames, cuts, and rhythm",
      "Long-term goal: directing stories on screen",
    ],
  },
];

const timeline = [
  {
    year: "2020",
    event: "Started self-teaching programming out of necessity — and never stopped.",
  },
  {
    year: "2022",
    event: "Built first client projects. Learned that shipping is scarier than coding.",
  },
  {
    year: "2023",
    event: "Discovered AI agents. Realised this changes everything. Went all in.",
  },
  {
    year: "2024",
    event: "Shipped Neural Scape, Void Terminal, and Scout. Started seriously studying film.",
  },
  {
    year: "2025",
    event: "Building Frame AI — where the two worlds finally collide.",
  },
];

export default function AboutClient() {
  const { setCursorType } = useCursor();
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-fade", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black"
    >
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-20 pb-20 pt-40 relative overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#8075FF]/5 blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="about-fade mb-6">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00F0FF] opacity-70">
              About
            </span>
          </div>

          <h1 className="about-fade font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase text-white mb-12">
            Tech &amp;<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8075FF] to-[#FF006E]">
              Film
            </span>
          </h1>

          <div className="about-fade grid md:grid-cols-2 gap-8 md:gap-20 max-w-5xl">
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed opacity-70">
              A tech and film wanderer who shows enthusiasm in AI agentic development — with a long-term goal as a filmmaker.
            </p>
            <p className="font-sans text-base md:text-lg leading-relaxed opacity-50">
              I exist at the intersection of two disciplines that the world treats as opposites. Code and cinema. Systems and stories. Both are about directing attention. Both require an obsessive eye for detail. I refuse to choose.
            </p>
          </div>
        </div>
      </section>

      {/* Duality */}
      <section className="border-t border-white/10 px-6 md:px-20 py-24 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 md:gap-0">
            {duality.map((d, i) => (
              <div
                key={i}
                className={`p-8 md:p-16 border-b md:border-b-0 ${i === 0 ? "md:border-r" : ""} border-white/10`}
              >
                <div
                  className="w-8 h-1 mb-8 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <h2
                  className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10"
                  style={{ color: d.color }}
                >
                  {d.side}
                </h2>
                <ul className="space-y-4">
                  {d.lines.map((line, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4 font-serif text-lg md:text-xl italic opacity-70"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="border-t border-white/10 px-6 md:px-20 py-24 md:py-40 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-[10vw] leading-[0.9] tracking-tighter uppercase text-white mix-blend-difference mb-20 md:mb-32">
            THE<br />STORY
          </h2>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item group flex flex-col md:flex-row gap-4 md:gap-16 border-t border-white/10 py-10 hover:bg-white/2 transition-colors duration-300 px-2"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
              >
                <span className="font-mono text-[#00F0FF] text-sm tracking-widest w-16 shrink-0 pt-1">
                  {item.year}
                </span>
                <p className="font-serif text-xl md:text-2xl italic leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity duration-300 max-w-2xl">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/10 px-6 md:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12">
          {[
            { label: "See my products", href: "/products" },
            { label: "Read my thoughts", href: "/thoughts" },
            { label: "View resume", href: "/resume" },
          ].map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="group flex items-center gap-4 text-xl md:text-2xl font-light tracking-tight hover:text-[#00F0FF] transition-colors duration-300"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              <span className="w-8 h-[1px] bg-white/30 group-hover:w-14 group-hover:bg-[#00F0FF] transition-all duration-300" />
              {cta.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
