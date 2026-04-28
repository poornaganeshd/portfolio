"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useMenu } from "./MenuContext";
import { useCursor } from "../context/CursorContext";
import { useSound } from "../context/SoundContext";

const menuItems = [
  { label: "Home", href: "/", sub: "01" },
  { label: "About", href: "/about", sub: "02" },
  { label: "Products", href: "/products", sub: "03" },
  { label: "Thoughts", href: "/thoughts", sub: "04" },
  { label: "Resume", href: "/resume", sub: "05" },
  { label: "Contact", href: "/contact", sub: "06" },
];

export default function MenuContent() {
  const { isOpen, closeMenu } = useMenu();
  const { setCursorType } = useCursor();
  const { playSound } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(
          linksRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.4,
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <nav ref={containerRef} className="w-full h-full flex flex-col justify-center px-8 md:px-32">
      {menuItems.map((item, i) => (
        <div
          key={item.href}
          className="group relative w-fit flex items-baseline gap-4 md:gap-6 overflow-hidden"
        >
          <Link
            href={item.href}
            onClick={closeMenu}
            ref={(el) => { linksRef.current[i] = el; }}
            className="block text-6xl md:text-[10vw] font-black uppercase text-white leading-[0.9] tracking-tighter transition-colors duration-300 hover:text-[#00FFA3] opacity-0"
            onMouseEnter={() => {
              setCursorType("hover");
              playSound("hover");
            }}
            onMouseLeave={() => setCursorType("default")}
          >
            {item.label}
          </Link>
          <span className="relative -top-2 md:-top-4 inline-flex items-center justify-center px-2 py-1 bg-white text-black text-xs md:text-sm font-bold font-mono rounded-sm transition-colors duration-300 group-hover:bg-[#00FFA3]">
            {item.sub}
          </span>
        </div>
      ))}
    </nav>
  );
}
