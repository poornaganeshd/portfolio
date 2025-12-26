"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Robust Entry Animation
        const el = document.getElementById("page-transition-container");

        if (el) {
            // Ensure starting state
            gsap.set(el, { y: 50, opacity: 0, scale: 0.98 });

            gsap.to(el, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2,
                clearProps: "all"
            });
        }
    }, [pathname]);

    return (
        <div id="page-transition-container" className="w-full">
            {children}
        </div>
    );
}
