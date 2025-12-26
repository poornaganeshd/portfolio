"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.5); // Strength factor 0.5
            yTo(y * 0.5);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const el = magnetic.current;
        el?.addEventListener("mousemove", mouseMove);
        el?.addEventListener("mouseleave", mouseLeave);

        return () => {
            el?.removeEventListener("mousemove", mouseMove);
            el?.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    // Clone the child to attach the ref directly to it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as any, { ref: magnetic });
}
