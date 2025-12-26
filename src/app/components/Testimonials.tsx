"use client";

import React from "react";
import { useCursor } from "../context/CursorContext";

const quotes = [
    {
        text: "Engineering that feels like magic. The physics engine is unlike anything we've seen.",
        author: "Creative Director @ Studio X"
    },
    {
        text: "A precision instrument. Fast, beautiful, and dangerously effective.",
        author: "Founder @ Stealth Startup"
    }
];

export default function Testimonials() {
    const { setCursorType } = useCursor();

    return (
        <section className="min-h-[80vh] flex flex-col justify-center bg-[#0A0A0A] px-6 md:px-20 py-32 border-t border-white/5 relative overflow-hidden">
            {/* Background Signal Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

            <div className="max-w-6xl mx-auto space-y-32 z-10">
                {quotes.map((quote, i) => (
                    <div key={i} className="group relative">
                        <div className="absolute -left-12 top-0 text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xl">
                            &gt;&gt;
                        </div>

                        <h3
                            className="text-4xl md:text-6xl font-light leading-tight tracking-tight hover:text-[#00F0FF] transition-colors duration-500 cursor-default"
                            onMouseEnter={() => setCursorType("text")}
                            onMouseLeave={() => setCursorType("default")}
                        >
                            &quot;{quote.text}&quot;
                        </h3>

                        <div className="mt-6 flex items-center space-x-4 opacity-50 font-mono text-sm tracking-widest uppercase group-hover:opacity-100 transition-opacity">
                            <span className="w-8 h-[1px] bg-white" />
                            <span>{quote.author}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
