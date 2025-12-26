"use client";

import React from "react";
import { useCursor } from "../context/CursorContext";

const stack = [
    "NEXT.JS", "REACT", "TYPESCRIPT", "THREE.JS", "GSAP", "WEBGL", "NODE.JS", "PYTHON", "TAILWIND", "SUPABASE"
];

export default function TechMarquee() {
    const { setCursorType } = useCursor();

    return (
        <section className="py-24 bg-[#050505] overflow-hidden border-y border-white/5 relative z-10">
            <div className="flex whitespace-nowrap overflow-hidden group">

                {/* We need multiple copies for the infinite loop illusion */}
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex animate-marquee">
                        {stack.map((tech) => (
                            <span
                                key={tech}
                                className="text-[8vw] font-black italic mx-12 text-transparent bg-clip-text bg-white/5 stroke-white/10 hover:text-[#00F0FF] transition-colors duration-300 select-none"
                                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)" }}
                                onMouseEnter={() => setCursorType("hover")}
                                onMouseLeave={() => setCursorType("default")}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                ))}

            </div>


        </section>
    );
}
