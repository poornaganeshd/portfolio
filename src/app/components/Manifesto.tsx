"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const chars = gsap.utils.toArray(".manifesto-char") as HTMLElement[];

            // Staggered Fade In for main statement
            gsap.from(chars, {
                opacity: 0.1,
                y: 20,
                duration: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 1,
                }
            });

            // Parallax/Kinetic line movement
            gsap.to(".kinetic-line-1", {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: 1,
                }
            });
            gsap.to(".kinetic-line-2", {
                xPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: 1,
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Helper to split text
    const splitText = (text: string) => {
        return text.split("").map((char, i) => (
            <span key={i} className="manifesto-char inline-block transition-colors duration-300 hover:text-[#00F0FF]">
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            className="w-full py-40 bg-[#050505] overflow-hidden flex flex-col items-center justify-center relative z-10"
            onMouseEnter={() => setCursorType("text")}
            onMouseLeave={() => setCursorType("default")}
        >
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#00F0FF] rounded-full blur-[150px] opacity-5 pointer-events-none" />

            <div ref={textRef} className="text-center relative z-20 flex flex-col gap-4 mix-blend-difference">

                {/* Line 1: Left drift */}
                <div className="kinetic-line-1 whitespace-nowrap">
                    <h2 className="text-[8vw] leading-[0.9] font-black uppercase tracking-tighter text-white/90">
                        {splitText("GRAVITY IS A MYTH")}
                    </h2>
                </div>

                {/* Line 2: Right drift */}
                <div className="kinetic-line-2 whitespace-nowrap">
                    <h2 className="text-[8vw] leading-[0.9] font-black uppercase tracking-tighter text-[#00F0FF] italic">
                        {splitText("WE DEFY THE NORM")}
                    </h2>
                </div>

                {/* Static Subtext */}
                <p className="max-w-xl mx-auto mt-12 text-lg md:text-xl font-light opacity-60 leading-relaxed px-6">
                    We don&apos;t just build websites; we engineer digital velocity.
                    In a world of static noise, we are the signal.
                </p>

            </div>
        </section>
    );
}
