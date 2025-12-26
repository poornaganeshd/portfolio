"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useMenu } from "./MenuContext";
import { useCursor } from "../context/CursorContext";
import MenuContent from "./MenuContent";

export default function MenuOverlay() {
    const { isOpen } = useMenu();
    const { setCursorType } = useCursor();
    const containerRef = useRef<HTMLDivElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    const layer3Ref = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Initialize timeline once
    useLayoutEffect(() => {
        const layer1 = layer1Ref.current;
        const layer2 = layer2Ref.current;
        const layer3 = layer3Ref.current;

        if (!layer1 || !layer2 || !layer3) return;

        const layers = [layer1, layer2, layer3];

        // Set initial state with GSAP (off-screen to the right)
        gsap.set(layers, {
            x: "100%",
            borderTopLeftRadius: "100vh",
            borderBottomLeftRadius: "100vh"
        });

        // Create timeline
        tlRef.current = gsap.timeline({ paused: true });

        tlRef.current
            .to(layers, {
                x: "0%",
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.inOut",
            })
            .to(layers, {
                borderTopLeftRadius: "0vh",
                borderBottomLeftRadius: "0vh",
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3");

        return () => {
            if (tlRef.current) {
                tlRef.current.kill();
            }
        };
    }, []);

    // Handle open/close
    useLayoutEffect(() => {
        if (!tlRef.current || !containerRef.current) return;

        if (isOpen) {
            gsap.set(containerRef.current, { visibility: "visible" });
            tlRef.current.timeScale(1).play();
        } else {
            tlRef.current.timeScale(1.5).reverse();
            // Hide after reverse completes
            gsap.delayedCall(tlRef.current.duration() / 1.5, () => {
                if (!isOpen && containerRef.current) {
                    gsap.set(containerRef.current, { visibility: "hidden" });
                }
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] pointer-events-none"
            style={{ visibility: "hidden" }}
        >
            {/* Layer 1: Cyber Mint Accent */}
            <div
                ref={layer1Ref}
                className="absolute inset-0 bg-[#00FFA3] z-[10001]"
            />

            {/* Layer 2: Silver Separator */}
            <div
                ref={layer2Ref}
                className="absolute inset-0 bg-[#F1F1F1] z-[10002]"
            />

            {/* Layer 3: Main Content (Black) */}
            <div
                ref={layer3Ref}
                className="absolute inset-0 bg-[#0A0A0A] z-[10003]"
            >
                <div
                    className={`w-full h-full flex items-center justify-center ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                    onMouseEnter={() => setCursorType("menu")}
                    onMouseLeave={() => setCursorType("default")}
                >
                    <MenuContent />
                </div>
            </div>
        </div>
    );
}
