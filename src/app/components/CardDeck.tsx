"use client";

import React from "react";
import { useCursor } from "../context/CursorContext";
import { projects } from "@/data/projects";

// Themes matching the user's "TaskMaster" / "EcoTr" images
const projectThemes = [
    {
        bg: "bg-[#e11d48]", // Red/Pink (TaskMaster)
        text: "text-[#e11d48]",
        title: "TASKMASTER",
        accent: "text-white"
    },
    {
        bg: "bg-[#2dd4bf]", // Teal (EcoTracker)
        text: "text-[#2dd4bf]",
        title: "ECOTRACKER",
        accent: "text-black"
    },
    {
        bg: "bg-[#7c3aed]", // Purple
        text: "text-[#7c3aed]",
        title: "INNOVATION",
        accent: "text-white"
    },
    {
        bg: "bg-[#0f172a]", // Dark Navy
        text: "text-[#0f172a]",
        title: "PORTFOLIO",
        accent: "text-white"
    }
];

export default function CardDeck() {
    const { setCursorType } = useCursor();

    return (
        <section className="relative w-full">
            {projects.slice(0, 4).map((project, i) => {
                const theme = projectThemes[i % projectThemes.length];

                return (
                    <div
                        key={i}
                        className={`sticky top-0 w-full h-screen ${theme.bg} overflow-hidden flex items-center justify-center`}
                        style={{ zIndex: i + 1 }} // Explicit z-index ensures stacking order
                    >
                        {/* 1. GIANT BACKGROUND TYPE */}
                        {/* Cropped text at bottom/center */}
                        <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden">
                            <h1
                                className="text-[25vw] font-display font-black leading-[0.75] tracking-tighter opacity-20 mix-blend-overlay text-white translate-y-[5%]"
                            >
                                {theme.title}
                            </h1>
                        </div>

                        {/* 2. MAIN CONTENT GRID */}
                        <div className="relative w-full max-w-[1600px] h-full grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-20">

                            {/* LEFT: INFO */}
                            <div className="flex flex-col justify-center items-start space-y-8 z-10 order-2 md:order-1">
                                {/* Number */}
                                <div className={`w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm ${theme.accent}`}>
                                    <span className="font-mono text-xl">{i + 1}</span>
                                </div>

                                {/* Title & Desc */}
                                <div className={theme.accent}>
                                    <h2 className="text-6xl md:text-8xl font-display font-bold uppercase leading-none mb-6">
                                        {project.title}
                                    </h2>
                                    <p className="text-xl md:text-2xl font-light opacity-90 max-w-md leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag, t) => (
                                        <span
                                            key={t}
                                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-white/20 ${theme.accent}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Button */}
                                <button
                                    className={`mt-4 px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-xl`}
                                    onMouseEnter={() => setCursorType("hover")}
                                    onMouseLeave={() => setCursorType("default")}
                                >
                                    View Project
                                </button>
                            </div>

                            {/* RIGHT: IMAGE CARD */}
                            <div className="flex items-center justify-center md:justify-end z-10 order-1 md:order-2">
                                <div
                                    className="relative w-[85%] aspect-square bg-gray-900 rounded-lg shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out border border-white/10 overflow-hidden group"
                                    onMouseEnter={() => setCursorType("view")}
                                    onMouseLeave={() => setCursorType("default")}
                                >
                                    {/* Fake UI Header */}
                                    <div className="absolute top-0 left-0 w-full h-8 bg-black/20 backdrop-blur-md flex items-center px-4 space-x-2 z-20">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>

                                    {/* Image / Gradient Placeholder */}
                                    <div className={`w-full h-full bg-gradient-to-br from-gray-800 to-black relative`}>
                                        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                                        {/* Inner Content Placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/10 font-display text-6xl uppercase transform -rotate-45">
                                                Preview
                                            </span>
                                        </div>
                                    </div>

                                    {/* Date/Info Overlay */}
                                    <div className="absolute bottom-6 right-6 text-right">
                                        <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">Year</span>
                                        <span className="block text-xl font-display text-white">2024</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </section>
    );
}
