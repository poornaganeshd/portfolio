"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.2,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(".hero-line-1", { x: -120, opacity: 0.3 }, 0)
        .to(".hero-line-2", { x: 120, opacity: 0.3 }, 0)
        .to(".hero-sub", { y: -40, opacity: 0 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden bg-[#050505]"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#8075FF]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#00F0FF]/5 blur-[100px]" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center w-full px-4">
        {/* Label */}
        <div className="hero-sub mb-8 md:mb-12">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#00F0FF] opacity-70">
            Tech &amp; Film Wanderer
          </span>
        </div>

        {/* Line 1 */}
        <div className="hero-line hero-line-1 overflow-hidden">
          <h1
            className="font-display text-[16vw] md:text-[17vw] leading-none tracking-tighter uppercase text-white"
            onMouseEnter={() => setCursorType("text")}
            onMouseLeave={() => setCursorType("default")}
          >
            Poorna
          </h1>
        </div>

        {/* Line 2 */}
        <div className="hero-line hero-line-2 overflow-hidden flex items-center gap-4 md:gap-12">
          <h1
            className="font-display text-[16vw] md:text-[17vw] leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8075FF] to-[#00F0FF]"
            onMouseEnter={() => setCursorType("text")}
            onMouseLeave={() => setCursorType("default")}
          >
            ganesh
          </h1>
        </div>

        {/* Sub */}
        <div className="hero-sub mt-10 md:mt-14 text-center max-w-2xl px-6">
          <p className="font-serif text-lg md:text-2xl italic opacity-60 leading-relaxed text-white">
            Building intelligent systems.
            <br />
            <span className="text-[#00F0FF] not-italic opacity-80">Dreaming in frames.</span>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 text-white">
        <div className="w-[1px] h-12 bg-white" />
        <span className="text-[9px] tracking-widest uppercase font-mono">Scroll</span>
      </div>
    </section>
  );
}
