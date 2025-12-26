"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "none" },
                onComplete: () => setIsComplete(true),
            });

            gsap.set(".char-wrap", { opacity: 0 });
            gsap.set(".loader-info", { opacity: 0 });

            for (let i = 0; i < 3; i++) {
                tl.to(".char-wrap", {
                    opacity: () => (Math.random() > 0.5 ? 1 : 0),
                    duration: 0.06,
                    stagger: {
                        amount: 0.4,
                        from: "random",
                    },
                });
            }

            tl.to(".char-wrap", {
                opacity: 1,
                duration: 0.25,
                stagger: 0.015,
                ease: "power2.out",
            });

            tl.to(
                ".loader-info",
                {
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                },
                "-=0.3"
            );

            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1.1,
                ease: "power4.inOut",
                delay: 0.8,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (isComplete) return null;

    const title = "POORNAGANESH";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] bg-[#0A0A0A] text-[#F1F1F1] font-mono flex flex-col justify-between p-6 md:p-12 overflow-hidden"
        >
            <div className="flex justify-between items-start w-full relative z-10 loader-info opacity-0">
                <div className="flex flex-col gap-1 text-xs md:text-sm tracking-wide opacity-70">
                    <p>NAME:</p>
                    <p>ROLE:</p>
                    <p>LOC:</p>
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm text-right tracking-wide opacity-70">
                    <p>POORNAGANESH</p>
                    <p>CREATIVE DEV</p>
                    <p>INDIA</p>
                </div>
            </div>

            <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
                <h1 className="font-display text-[12vw] md:text-[13vw] leading-[0.85] tracking-tighter uppercase overflow-hidden flex">
                    {title.split("").map((char, i) => (
                        <span key={i} className="inline-block overflow-hidden">
                            <span className="char-wrap inline-block origin-bottom transform will-change-transform opacity-0">
                                {char}
                            </span>
                        </span>
                    ))}
                </h1>
            </div>

            <div className="flex justify-between items-end w-full relative z-10 loader-info opacity-0">
                <div className="flex flex-col gap-1 text-xs md:text-sm tracking-wide opacity-70">
                    <p>PORTFOLIO &apos;25</p>
                    <p>INIT_SYSTEM...</p>
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm text-right tracking-wide opacity-70">
                    <p>SOUND [OFF]</p>
                    <p>LOADING...</p>
                </div>
            </div>

            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
            />
        </div>
    );
}
