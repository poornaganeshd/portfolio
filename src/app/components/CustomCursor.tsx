"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursor } from "../context/CursorContext";

export default function CustomCursor() {
    const { cursorType } = useCursor();
    const cursorDot = useRef<HTMLDivElement>(null);
    const cursorOutline = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = cursorDot.current;
        const outline = cursorOutline.current;

        if (!dot || !outline) return;

        // Set initial mix-blend-mode via GSAP (this will work as inline style)
        gsap.set(outline, { mixBlendMode: "difference" });

        const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
        const xOutline = gsap.quickTo(outline, "x", { duration: 0.6, ease: "power3" });
        const yOutline = gsap.quickTo(outline, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xOutline(e.clientX);
            yOutline(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    useEffect(() => {
        const dot = cursorDot.current;
        const outline = cursorOutline.current;

        if (!dot || !outline) return;

        if (cursorType === "hover") {
            gsap.to(outline, { scale: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", mixBlendMode: "difference", duration: 0.3 });
            gsap.to(dot, { scale: 0, duration: 0.3 });
        } else if (cursorType === "text") {
            gsap.to(outline, { width: "2px", height: "30px", borderRadius: 0, backgroundColor: "white", mixBlendMode: "difference", duration: 0.3 });
            gsap.to(dot, { opacity: 0 });
        } else if (cursorType === "view") {
            gsap.to(outline, { scale: 3, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "transparent", mixBlendMode: "difference", duration: 0.3 });
            gsap.to(dot, { scale: 0, opacity: 0 });
        } else if (cursorType === "menu") {
            // Menu cursor: Large visible circle - NO blend mode so it's visible on dark bg
            gsap.to(outline, {
                scale: 2.5,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 255, 255, 0.9)",
                mixBlendMode: "normal",
                duration: 0.3
            });
            gsap.to(dot, { scale: 0.8, backgroundColor: "#ffffff", opacity: 1, duration: 0.3 });
        } else if (cursorType === "hidden" || cursorType === "none") {
            gsap.to(outline, { opacity: 0, duration: 0.2 });
            gsap.to(dot, { opacity: 0, duration: 0.2 });
        } else {
            // Default
            gsap.to(outline, {
                scale: 1,
                backgroundColor: "transparent",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                opacity: 1,
                borderColor: "rgba(255,255,255,0.5)",
                mixBlendMode: "difference",
                duration: 0.3
            });
            gsap.to(dot, { scale: 1, opacity: 1, backgroundColor: "white", duration: 0.3 });
        }

    }, [cursorType]);

    return (
        <>
            {/* Removed mix-blend-difference from className - controlled via GSAP now */}
            <div ref={cursorDot} className="cursor-dot pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[99999] bg-white rounded-full w-2 h-2" />
            <div ref={cursorOutline} className="cursor-outline pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[99998] border border-white/50 rounded-full w-10 h-10" />
        </>
    );
}
