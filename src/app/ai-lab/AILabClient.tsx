"use client";

import React, { useState, useRef, useEffect } from "react";
import { tools } from "@/data/aiTools";
import { useCursor } from "../context/CursorContext";
import TextGravityReveal from "../components/TextGravityReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ToolData {
    name: string;
    description: string;
    icon: string;
    longDescription: string;
    bgColor: string;
}

export default function AILabClient() {
    const [selectedTool, setSelectedTool] = useState<ToolData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".ai-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#F1F1F1] relative font-sans selection:bg-[#00FFA3] selection:text-black">

            {/* Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-32">

                {/* Header Section */}
                <div className="mb-24 md:mb-32">
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
                        <span className="block text-white mix-blend-difference">THE</span>
                        <span className="block text-[#00FFA3]">AI LAB</span>
                    </h1>

                    <div className="w-full h-[1px] bg-white/20 mb-8" />

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="max-w-xl text-lg md:text-xl text-white/60 font-mono">
                            <TextGravityReveal>
                                EXPLORING THE FRONTIERS OF MACHINE INTELLIGENCE.
                                A COLLECTION OF EXPERIMENTS AND TOOLS.
                            </TextGravityReveal>
                        </div>
                        <div className="font-mono text-sm text-[#00FFA3] border border-[#00FFA3] px-3 py-1 rounded-full animate-pulse">
                            {`/// SYSTEM ONLINE`}
                        </div>
                    </div>
                </div>

                {/* Experiments Grid (Bento Style) */}
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setCursorType("hover")}
                            onMouseLeave={() => setCursorType("default")}
                            onClick={() => setSelectedTool(tool)}
                            className="ai-card group relative h-[300px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FFA3]/50 transition-all duration-500 cursor-pointer"
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-4xl">{tool.icon}</span>
                                    <span className="font-mono text-xs text-white/30 group-hover:text-[#00FFA3] transition-colors">{`EXP_0${i + 1}`}</span>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#00FFA3] transition-colors">{tool.name}</h3>
                                    <p className="text-sm text-white/50 line-clamp-3 leading-relaxed group-hover:text-white/80 transition-colors">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Reveal Corner */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#00FFA3] blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full translate-x-10 translate-y-10" />
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal / Detail Overlay */}
            {selectedTool && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedTool(null)}
                    />

                    <div className="relative bg-[#0A0A0A] border border-[#00FFA3]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-16 shadow-[0_0_50px_rgba(0,255,163,0.1)]">
                        <button
                            onClick={() => setSelectedTool(null)}
                            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all z-20"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#00FFA3]/10 rounded-2xl flex items-center justify-center text-6xl border border-[#00FFA3]/20 shrink-0">
                                {selectedTool.icon}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-4xl md:text-5xl font-black text-white">{selectedTool.name}</h2>
                                    <span className="font-mono text-[#00FFA3] text-sm border border-[#00FFA3] px-2 py-0.5 rounded-full">ACTIVE</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/60 font-light mb-8 leading-relaxed">
                                    {selectedTool.description}
                                </p>

                                <div className="h-[1px] w-full bg-white/10 mb-8" />

                                <div className="prose prose-invert max-w-none text-white/80 font-mono text-sm leading-7">
                                    <p>{selectedTool.longDescription}</p>
                                </div>

                                <button className="mt-12 group flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#00FFA3] transition-colors">
                                    LAUNCH EXPERIMENT
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
