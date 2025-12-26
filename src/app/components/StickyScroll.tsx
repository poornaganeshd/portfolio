"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useCursor } from "../context/CursorContext";
import Link from "next/link";
import TextGravityReveal from "./TextGravityReveal";

export default function StickyScroll() {
    const componentRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const { setCursorType } = useCursor();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray(".story-slide") as HTMLElement[];

            // Horizontal Scroll Logic
            const totalWidth = sliderRef.current?.scrollWidth || 0;
            const windowWidth = window.innerWidth;
            const scrollDistance = totalWidth - windowWidth;
            const pauseDistance = window.innerHeight * 0.8; // Pause for 80% of viewport height

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentRef.current, // Trigger the wrapper
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    start: "top top",
                    end: () => "+=" + (scrollDistance + pauseDistance), // Scroll = move + pause
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Handle resize
                }
            });

            // Move left by the exact distance
            tl.to(sliderRef.current, {
                x: -scrollDistance,
                ease: "none",
                duration: scrollDistance, // Proportional duration
            });

            // Pause duration (holds the last slide)
            tl.to({}, { duration: pauseDistance });

            // Progress Bar Animation
            // Animate width from 0 to 100% over the duration of the scroll
            tl.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
                duration: scrollDistance + pauseDistance // Matches total duration
            }, 0);

            // Zoom Effect on scroll
            slides.forEach((slide) => {
                gsap.to(slide.querySelector(".slide-img"), {
                    scale: 1.2,
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: tl,
                        start: "left center",
                        end: "right center",
                        scrub: true,
                    }
                })
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    const stories = [
        {
            title: "THE VISION",
            desc: "We don't predict the future. We write the code for it.",
            link: null,
            img: "linear-gradient(135deg, #000000, #0c4a6e, #000000)"
        },
        {
            title: "THE METHOD",
            desc: "Fusion of Art & Algorithm. Where design meets physics.",
            link: null,
            img: "linear-gradient(135deg, #000000, #4c0519, #000000)"
        },
        {
            title: "THE IMPACT",
            desc: "Digital experiences that defy gravity and expectation.",
            link: "/contact",
            cta: "START YOUR PROJECT",
            img: "linear-gradient(135deg, #000000, #064e3b, #000000)"
        },
    ];

    return (
        <section ref={componentRef} className="relative bg-[#050505] overflow-hidden">

            {/* Progress Bar */}
            <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full h-1 bg-[#00F0FF] z-50 origin-left scale-x-0"
                style={{ transformOrigin: "left" }}
            />

            <div ref={sliderRef} className="h-screen w-[300vw] flex flex-nowrap">
                {stories.map((story, i) => (
                    <div key={i} className="story-slide w-screen h-full flex items-center justify-center relative border-r border-white/10 group">
                        <div className="absolute inset-0 -z-10 overflow-hidden">
                            <div
                                className="slide-img w-full h-full opacity-60"
                                style={{ background: story.img }}
                            />
                        </div>

                        <div className="z-10 text-center mix-blend-difference px-4 max-w-4xl mx-auto"
                            onMouseEnter={() => setCursorType(story.link ? "hover" : "default")}
                            onMouseLeave={() => setCursorType("default")}
                        >
                            <div className="block p-12 focus:outline-none">
                                <h2 className="text-[8vw] md:text-[6vw] font-black text-white mb-6 translate-y-10 opacity-50 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 hover:text-[#00F0FF] leading-none">
                                    <TextGravityReveal charClassName="hover:text-[#00F0FF] transition-colors duration-300">
                                        {story.title}
                                    </TextGravityReveal>
                                </h2>
                                <p className="text-xl md:text-3xl font-light tracking-wide text-[#F1F1F1] opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100 italic">
                                    &quot;{story.desc}&quot;
                                </p>

                                {story.link && (
                                    <Link href={story.link} className="mt-12 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0 text-sm font-bold font-mono tracking-widest border border-[#00F0FF] text-[#00F0FF] inline-block px-8 py-4 rounded-full hover:bg-[#00F0FF] hover:text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]">
                                        {story.cta || "EXPLORE"} &rarr;
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-10 text-[10vw] font-black opacity-10 select-none pointer-events-none">
                            0{i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
