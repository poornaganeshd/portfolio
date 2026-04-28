"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";
import { resume } from "@/data/resume";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const skillSections: { label: string; key: keyof typeof resume.skills }[] = [
  { label: "Core Stack", key: "core" },
  { label: "AI & Agents", key: "ai" },
  { label: "Creative & Motion", key: "creative" },
  { label: "Tools", key: "tools" },
];

const accentByKey: Record<string, string> = {
  core: "#00F0FF",
  ai: "#8075FF",
  creative: "#FF006E",
  tools: "#F0A500",
};

export default function ResumeClient() {
  const { setCursorType } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resume-fade", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black"
    >
      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="resume-fade font-mono text-[10px] tracking-[0.4em] uppercase text-[#00F0FF] opacity-70 block mb-6">
              Resume
            </span>
            <h1 className="resume-fade font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter uppercase text-white">
              Poorna<br />ganesh
            </h1>
            <p className="resume-fade font-serif italic text-xl md:text-2xl opacity-50 mt-6">
              {resume.headline}
            </p>
          </div>

          <div className="resume-fade shrink-0">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold font-mono text-xs uppercase tracking-widest rounded-full hover:bg-[#00F0FF] transition-colors duration-300"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              Download PDF
              <span className="text-base">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="px-6 md:px-20 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[200px_1fr] gap-6 md:gap-20 scroll-reveal">
          <span className="font-mono text-xs uppercase tracking-widest opacity-40 pt-1">
            Summary
          </span>
          <p className="font-serif text-xl md:text-2xl italic leading-relaxed opacity-70 max-w-3xl">
            {resume.summary}
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-20 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-20">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40 pt-1">
              Skills
            </span>
            <div className="grid sm:grid-cols-2 gap-10 md:gap-14">
              {skillSections.map(({ label, key }) => (
                <div key={key} className="scroll-reveal">
                  <div
                    className="text-xs font-mono uppercase tracking-widest mb-4"
                    style={{ color: accentByKey[key] }}
                  >
                    {label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills[key].map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 border rounded-full text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity"
                        style={{ borderColor: accentByKey[key] + "40" }}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-20 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-20">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40 pt-1">
              Experience
            </span>
            <div className="space-y-14">
              {resume.experience.map((exp, i) => (
                <div
                  key={i}
                  className="scroll-reveal group border-t border-white/10 pt-10"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="text-[#00F0FF] font-mono text-sm opacity-80">
                        {exp.org}
                      </span>
                    </div>
                    <span className="font-mono text-xs tracking-widest opacity-40 uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed opacity-60 max-w-2xl">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-6 md:px-20 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-20">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40 pt-1">
              Education
            </span>
            <div className="space-y-14">
              {resume.education.map((edu, i) => (
                <div
                  key={i}
                  className="scroll-reveal border-t border-white/10 pt-10"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {edu.degree}
                      </h3>
                      <span className="text-[#8075FF] font-mono text-sm opacity-80">
                        {edu.institution}
                      </span>
                    </div>
                    <span className="font-mono text-xs tracking-widest opacity-40 uppercase">
                      {edu.period}
                    </span>
                  </div>
                  <p className="font-serif text-lg italic leading-relaxed opacity-60 max-w-2xl">
                    {edu.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-20 scroll-reveal">
            <span className="font-mono text-xs uppercase tracking-widest opacity-40 pt-1">
              Certifications
            </span>
            <ul className="space-y-4">
              {resume.certifications.map((cert, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 font-serif text-lg italic opacity-60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
