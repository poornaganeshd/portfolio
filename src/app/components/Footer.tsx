"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useCursor } from "../context/CursorContext";
import Magnetic from "./Magnetic";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { setCursorType } = useCursor();
  const textRef = useRef<HTMLHeadingElement>(null);

  const handleMouseEnter = () => {
    setCursorType("text");
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".footer-char");
      gsap.to(chars, {
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
  };

  const handleMouseLeave = () => {
    setCursorType("default");
  };

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="footer-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <footer className="w-full bg-[#050505] text-[#F1F1F1] py-24 px-6 md:px-20 border-t border-white/10 relative overflow-hidden">

      {/* Background Texture similar to rest of site */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-12 md:gap-0">

        {/* Left Side: Call to Action */}
        <div className="flex flex-col items-start gap-4">
          <h2
            ref={textRef}
            className="text-6xl md:text-8xl font-black tracking-tighter mix-blend-difference cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {splitText("LET'S TALK.")}
          </h2>
          <Magnetic>
            <a
              href="mailto:contact@antigravity.agency"
              className="text-xl md:text-2xl font-serif italic text-[#00F0FF] hover:text-white transition-colors duration-300 inline-block"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              contact@antigravity.agency
            </a>
          </Magnetic>
        </div>

        {/* Right Side: Navigation & Socials */}
        <div className="flex flex-col md:items-end gap-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest opacity-50">Sitemap</h3>
              <Link href="/ai-lab" className="hover:text-[#00F0FF] transition-colors" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>AI Lab</Link>
              <Link href="/playground" className="hover:text-[#00F0FF] transition-colors" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>Playground</Link>
              <Link href="/projects" className="hover:text-[#00F0FF] transition-colors" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>Projects</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-widest opacity-50">Socials</h3>
              <Magnetic><a href="#" className="hover:text-[#FF006E] transition-colors inline-block" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>LinkedIn</a></Magnetic>
              <Magnetic><a href="#" className="hover:text-[#FF006E] transition-colors inline-block" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>Twitter / X</a></Magnetic>
              <Magnetic><a href="#" className="hover:text-[#FF006E] transition-colors inline-block" onMouseEnter={() => setCursorType("hover")} onMouseLeave={() => setCursorType("default")}>GitHub</a></Magnetic>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs opacity-30 uppercase tracking-widest">
        <p>&copy; {currentYear} ANTIGRAVITY AGENCY.</p>
        <p>Designed with Clarity.</p>
      </div>

    </footer>
  );
};

export default Footer;
