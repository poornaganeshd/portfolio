"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

interface UseMouseParallaxOptions {
    /** Maximum movement in pixels (default: 50) */
    maxMovement?: number;
    /** Animation duration in seconds (default: 0.8) */
    duration?: number;
    /** GSAP ease function (default: "power3.out") */
    ease?: string;
}

/**
 * Custom hook for mouse-driven parallax effects using GSAP quickTo
 * @param options - Configuration options
 * @returns Object containing ref to attach and event handlers
 */
export function useMouseParallax<T extends HTMLElement>(options: UseMouseParallaxOptions = {}) {
    const { maxMovement = 50, duration = 0.8, ease = "power3.out" } = options;

    const ref = useRef<T>(null);
    const xTo = useRef<(value: number) => void>(null);
    const yTo = useRef<(value: number) => void>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            xTo.current = gsap.quickTo(ref.current, "x", { duration, ease });
            yTo.current = gsap.quickTo(ref.current, "y", { duration, ease });
        }, ref);

        return () => ctx.revert();
    }, [duration, ease]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget;
        const { width, height } = target.getBoundingClientRect();
        const { clientX, clientY } = e;

        const xPct = (clientX / width - 0.5) * maxMovement;
        const yPct = (clientY / height - 0.5) * maxMovement;

        if (xTo.current) xTo.current(xPct);
        if (yTo.current) yTo.current(yPct);
    };

    const handleMouseLeave = () => {
        if (xTo.current) xTo.current(0);
        if (yTo.current) yTo.current(0);
    };

    return {
        ref,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
        }
    };
}
