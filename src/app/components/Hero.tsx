"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Parallax / Kinetic Typography Effect
            // As user scrolls, the text spreads apart or scales up aggressively

            // Initial reveal
            gsap.from(".hero-line", {
                y: 200,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.5
            });

            // Scroll effect
            tl.to(".hero-line-1", { x: -100, opacity: 0.5 }, 0)
                .to(".hero-line-2", { x: 100, opacity: 0.5 }, 0)
                .to(".hero-line-3", { scale: 1.5, opacity: 0 }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[var(--sunset-neon-1)] via-[var(--sunset-neon-2)] to-[var(--sunset-neon-4)] text-white"
        >
            {/* Background noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
            </div>

            {/* Cinematic Overlay for Depth */}
            <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

            <div ref={textRef} className="relative z-10 flex flex-col justify-center items-center w-full">

                {/* Line 1 */}
                <div className="hero-line hero-line-1 overflow-hidden">
                    <h1
                        className="font-display text-[18vw] leading-none tracking-normal uppercase text-white mix-blend-overlay"
                        onMouseEnter={() => setCursorType("text")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        CLARITY
                    </h1>
                </div>

                {/* Line 2 */}
                <div className="hero-line hero-line-2 overflow-hidden flex items-center gap-4 md:gap-12">
                    <h1
                        className="font-display text-[18vw] leading-none tracking-normal uppercase text-white mix-blend-overlay"
                        onMouseEnter={() => setCursorType("text")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        FIRST
                    </h1>
                </div>

                {/* Line 3 (Subtext) */}
                <div className="hero-line hero-line-3 mt-12 md:mt-24 text-center max-w-xl px-6">
                    <p className="font-serif text-xl md:text-2xl italic opacity-90 leading-relaxed text-white">
                        We build digital experiences that feel physical.
                        <br />
                        <span className="font-bold not-italic font-sans text-sm tracking-widest uppercase mt-4 block opacity-70">Based in the Cloud • Global Impact</span>
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 text-white">
                <div className="w-[1px] h-12 bg-white" />
                <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
            </div>

        </section>
    );
}
