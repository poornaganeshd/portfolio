"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll progress indicator that shows page scroll position
 * Fixed at the top of the viewport
 */
export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3,
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={progressRef}
            className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00F0FF] via-[#FF006E] to-[#10B981] z-[9999] origin-left scale-x-0 pointer-events-none"
            style={{ transformOrigin: "left" }}
        />
    );
}
