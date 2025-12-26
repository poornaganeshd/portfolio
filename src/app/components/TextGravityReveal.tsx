"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextGravityRevealProps {
    children: string;
    className?: string;
    charClassName?: string;
    delay?: number;
    staggerDelay?: number;
}

/**
 * TextGravityReveal - Characters "fall" into place from above when entering viewport
 */
export default function TextGravityReveal({
    children,
    className = "",
    charClassName = "",
    delay = 0,
    staggerDelay = 0.03
}: TextGravityRevealProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".gravity-char");

        const ctx = gsap.context(() => {
            // Set initial state - characters above and invisible
            gsap.set(chars, {
                y: -100,
                opacity: 0,
                rotateX: -90,
            });

            // Create scroll-triggered animation
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(chars, {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.8,
                        delay: delay,
                        stagger: staggerDelay,
                        ease: "bounce.out",
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [delay, staggerDelay]);

    return (
        <span ref={containerRef} className={`inline-block ${className}`} style={{ perspective: "1000px" }}>
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className={`gravity-char inline-block ${charClassName}`}
                    style={{
                        whiteSpace: char === " " ? "pre" : "normal",
                        transformStyle: "preserve-3d"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
