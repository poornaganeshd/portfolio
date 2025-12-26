"use client";

import React, { useLayoutEffect } from "react";
import { useMenu } from "./MenuContext";
import { useCursor } from "../context/CursorContext";
import { useSound } from "../context/SoundContext";

export default function MenuButton() {
    const { isOpen, isVisible, toggleMenu } = useMenu();
    const { setCursorType } = useCursor();
    const { playSound } = useSound();

    // Change cursor when menu opens
    useLayoutEffect(() => {
        if (isOpen) {
            setCursorType("menu");
        } else {
            setCursorType("default");
        }
    }, [isOpen, setCursorType]);

    const handleClick = () => {
        playSound(isOpen ? "menu-close" : "menu-open");
        toggleMenu();
    };

    return (
        <button
            id="menu-trigger-btn"
            className={`fixed top-8 right-8 z-[10002] group pointer-events-auto transition-all duration-500 ease-out
                ${(isVisible || isOpen) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
            `}
            onClick={handleClick}
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType(isOpen ? "menu" : "default")}
        >
            {/* Premium Dark Button Container */}
            <div className={`relative px-5 py-3 rounded-full overflow-hidden transition-all duration-500
                backdrop-blur-xl border
                ${isOpen
                    ? "bg-white/95 border-white/20"
                    : "bg-[#0A0A0A]/90 border-white/10 group-hover:border-white/30"
                }
            `}>
                {/* Inner Glow */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none
                    ${isOpen ? "opacity-0" : "opacity-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"}
                `} />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                    {/* Animated Hamburger / X Icon */}
                    <div className="relative w-5 h-4 flex flex-col justify-between">
                        {/* Top Line */}
                        <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center
                            ${isOpen
                                ? "bg-black rotate-45 translate-y-[7px]"
                                : "bg-white w-full"
                            }
                        `} />
                        {/* Middle Line */}
                        <span className={`block h-[2px] rounded-full transition-all duration-300
                            ${isOpen
                                ? "bg-black opacity-0 scale-0"
                                : "bg-white/60 w-3/4"
                            }
                        `} />
                        {/* Bottom Line */}
                        <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center
                            ${isOpen
                                ? "bg-black -rotate-45 -translate-y-[7px]"
                                : "bg-white w-1/2"
                            }
                        `} />
                    </div>

                    {/* Label */}
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase font-cyber transition-colors duration-300
                        ${isOpen ? "text-black" : "text-white"}
                    `}>
                        {isOpen ? "Close" : "Menu"}
                    </span>
                </div>
            </div>
        </button>
    );
}
