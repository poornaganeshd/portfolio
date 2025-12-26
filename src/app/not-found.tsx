"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useCursor } from "./context/CursorContext";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for the 404
            gsap.to(".float-element", {
                y: -20,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Stagger in text
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            // Glitch effect on title
            const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            glitchTl
                .to(".glitch-text", { skewX: 5, duration: 0.1 })
                .to(".glitch-text", { skewX: -5, duration: 0.1 })
                .to(".glitch-text", { skewX: 0, duration: 0.1 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
            {/* Starfield Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 text-center">
                {/* 404 Number */}
                <div className="float-element glitch-text text-[30vw] md:text-[20vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#00F0FF] to-[#FF006E] select-none">
                    404
                </div>

                {/* Message */}
                <h1 className="reveal-text text-3xl md:text-5xl font-bold mt-4 mb-4">
                    LOST IN <span className="text-[#00F0FF]">SPACE</span>
                </h1>
                <p className="reveal-text text-lg md:text-xl opacity-60 max-w-md mx-auto mb-8">
                    The page you&apos;re looking for has drifted beyond our reach. Perhaps it never existed, or maybe it was consumed by a black hole.
                </p>

                {/* Return Link */}
                <Link
                    href="/"
                    className="reveal-text inline-block px-8 py-4 border border-[#00F0FF] text-[#00F0FF] font-mono text-sm tracking-widest rounded-full hover:bg-[#00F0FF] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
                    onMouseEnter={() => setCursorType("hover")}
                    onMouseLeave={() => setCursorType("default")}
                >
                    RETURN TO BASE →
                </Link>
            </div>

            {/* Floating Astronaut Emoji (placeholder for actual asset) */}
            <div className="absolute bottom-20 right-20 text-6xl float-element opacity-30 hidden md:block">
                🚀
            </div>
        </div>
    );
}
