"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

const phases = [
    {
        id: "01",
        title: "IGNITION",
        desc: "We dive deep into your brand's core. Data-driven research meets intuition to find the raw energy that drives your mission.",
    },
    {
        id: "02",
        title: "VELOCITY",
        desc: "High-octane design sprints. We prototype rapid iterations to find the perfect trajectory for your visual identity.",
    },
    {
        id: "03",
        title: "ORBIT",
        desc: "Development stage. We engineer robust, scalable systems that keep your digital presence stable and performant.",
    },
    {
        id: "04",
        title: "RE-ENTRY",
        desc: "Launch day and beyond. We ensure a smooth landing with QA, analytics setup, and post-launch support.",
    }
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // Parallax the header - REMOVED for Statue Stability
            // tl.to(".process-header", { y: -50 }, 0);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full bg-[var(--lux-black)] text-[var(--lux-white)] flex flex-col md:flex-row relative border-t border-white/10">

            {/* Left: Sticky Header - STATUE FIXED - 42% */}
            {/* Left: Sticky Header - STATUE FIXED - 42% */}
            <div className="w-full md:w-[42%] h-auto md:h-screen md:sticky md:top-0 p-6 md:p-10 flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-[var(--lux-black)] z-10 relative">
                <div className="process-header flex-1 flex items-center justify-center md:justify-start">
                    <h2 className="font-display text-[15vw] md:text-[12vw] leading-[0.9] tracking-normal uppercase text-white mix-blend-difference">
                        THE<br />PATH
                    </h2>
                </div>

                <div className="hidden md:block">
                    <p className="font-serif italic text-xl max-w-sm opacity-60 text-white/50">
                        From abstract concept to concrete reality.
                    </p>
                </div>
            </div>

            {/* Right: Scrollable Content - 58% */}
            <div className="w-full md:w-[58%] p-6 md:p-20 flex flex-col gap-20 md:gap-32 pb-20">
                {phases.map((phase, i) => (
                    <div
                        key={i}
                        className="phase-item group border-t border-white/20 py-10"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        <div className="flex justify-between items-baseline mb-8">
                            <span className="font-mono text-sm tracking-widest text-[var(--accent-aqua)] opacity-80">[{phase.id}]</span>
                            <div className="w-3 h-3 bg-[var(--accent-aqua)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_10px_var(--accent-aqua)]" />
                        </div>

                        <h3 className="text-6xl md:text-8xl font-display font-bold mb-8 uppercase text-transparent bg-clip-text bg-gradient-to-tr from-white to-white/50 group-hover:to-[var(--accent-aqua)] transition-all duration-500">
                            {phase.title}
                        </h3>

                        <p className="font-serif text-2xl leading-relaxed mb-8 opacity-60 max-w-md group-hover:opacity-100 transition-opacity duration-300">
                            {phase.desc}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
}
