"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from "gsap";
import { projects } from "@/data/projects";
import { useCursor } from "../context/CursorContext";

export default function ProjectsClient() {
    const { setCursorType } = useCursor();
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const cursorLabelRef = useRef<HTMLDivElement>(null);

    // Vibrant colors for each project to break monochrome
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#33FFF5", "#FF33A8"];

    useEffect(() => {
        // Move the reveal image with cursor
        const moveReveal = (e: MouseEvent) => {
            if (!revealRef.current) return;
            gsap.to(revealRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });

            if (cursorLabelRef.current) {
                gsap.to(cursorLabelRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener("mousemove", moveReveal);

        // Intro Animation
        const ctx = gsap.context(() => {
            gsap.to(".project-row", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2, // Updated to 0.2s
                ease: "expo.out",
                delay: 0.2
            });
        });

        return () => {
            window.removeEventListener("mousemove", moveReveal);
            ctx.revert();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#F1F1F1] py-32 relative overflow-hidden">

            {/* Background Image Reveal */}
            <div
                ref={revealRef}
                className="fixed top-0 left-0 w-[600px] h-[400px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 opacity-0 overflow-hidden rounded-lg mix-blend-difference"
                style={{
                    opacity: activeProject !== null ? 1 : 0,
                    transition: "opacity 0.3s ease"
                }}
            >
                {activeProject !== null && (
                    <div
                        className="w-full h-full bg-cover bg-center scale-110"
                        style={{
                            backgroundColor: colors[activeProject % colors.length],
                            // backgroundImage: `url(${projects[activeProject].image})` // Uncomment when real images exist
                        }}
                    />
                )}
            </div>

            {/* Cursor Label */}
            <div
                ref={cursorLabelRef}
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
                style={{ opacity: activeProject !== null ? 1 : 0 }}
            >
                <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                    View Case
                </div>
            </div>

            <div className="layout-container relative z-10">
                <header className="mb-24 border-b border-white/20 pb-12">
                    <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase text-white mix-blend-difference">
                        SELECTED<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8075FF] to-[#00F0FF] animate-pulse-slow">WORKS</span>
                    </h1>
                </header>

                <div className="flex flex-col project-list">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-row group relative border-b border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 hover:bg-white/5 px-4 md:px-8 opacity-0 translate-y-[140px]"
                            onMouseEnter={() => {
                                setActiveProject(index);
                                setCursorType("none"); // Hide default cursor, show custom label
                            }}
                            onMouseLeave={() => {
                                setActiveProject(null);
                                setCursorType("default");
                            }}
                        >
                            <div className="flex flex-col z-10">
                                <span className="font-mono text-[#8075FF] text-sm mb-4 tracking-widest">0{index + 1}</span>
                                <h2 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 text-white">
                                    {project.title}
                                </h2>
                            </div>

                            <div className="mt-8 md:mt-0 flex gap-4 z-10">
                                {project.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider group-hover:bg-white group-hover:text-black transition-colors text-white/70">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
