"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { products, ProductStatus } from "@/data/projects";
import { useCursor } from "../context/CursorContext";
import Footer from "../components/Footer";

const statusConfig: Record<
  ProductStatus,
  { label: string; color: string; dot: string }
> = {
  live: { label: "Live", color: "#00F0FF", dot: "bg-[#00F0FF]" },
  beta: { label: "Beta", color: "#F0A500", dot: "bg-[#F0A500]" },
  "in-dev": { label: "In Development", color: "#8075FF", dot: "bg-[#8075FF]" },
};

const cardColors = ["#8075FF", "#00F0FF", "#FF006E", "#F0A500"];

export default function ProductsClient() {
  const { setCursorType } = useCursor();
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveReveal = (e: MouseEvent) => {
      if (!revealRef.current) return;
      gsap.to(revealRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveReveal);

    const ctx = gsap.context(() => {
      gsap.from(".product-row", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.3,
      });
    }, listRef);

    return () => {
      window.removeEventListener("mousemove", moveReveal);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black">
      {/* Background colour reveal on hover */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-[500px] h-[340px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden mix-blend-soft-light"
        style={{ opacity: activeProduct !== null ? 0.6 : 0, transition: "opacity 0.3s ease" }}
      >
        {activeProduct !== null && (
          <div
            className="w-full h-full"
            style={{ backgroundColor: cardColors[activeProduct % cardColors.length] }}
          />
        )}
      </div>

      {/* Cursor label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: activeProduct !== null ? 1 : 0 }}
      >
        <div className="bg-white text-black px-4 py-2 rounded-full font-bold font-mono text-xs tracking-widest uppercase">
          View
        </div>
      </div>

      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-20 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#00F0FF] opacity-70 block mb-6">
            Products
          </span>
          <h1 className="font-display text-[14vw] md:text-[11vw] leading-[0.85] tracking-tighter uppercase text-white">
            THINGS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8075FF] to-[#00F0FF]">
              I BUILT
            </span>
          </h1>
          <p className="mt-8 font-serif italic text-xl opacity-50 max-w-lg">
            Each one a product of curiosity, obsession, and a refusal to just stay in one lane.
          </p>
        </div>
      </section>

      {/* Products list */}
      <section ref={listRef} className="relative z-10 px-6 md:px-20 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col">
          {products.map((product, index) => {
            const status = statusConfig[product.status];
            return (
              <div
                key={index}
                className="product-row group border-b border-white/10 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-6 hover:bg-white/[0.02] px-2 -mx-2 transition-colors duration-300 opacity-0"
                onMouseEnter={() => {
                  setActiveProduct(index);
                  setCursorType("none");
                }}
                onMouseLeave={() => {
                  setActiveProduct(null);
                  setCursorType("default");
                }}
              >
                {/* Left: info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-[#8075FF] text-xs tracking-widest">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: status.color }}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
                      {status.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest opacity-30 uppercase">
                      {product.year}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white group-hover:translate-x-3 transition-transform duration-500 mb-3">
                    {product.title}
                  </h2>

                  <p className="font-serif italic text-lg md:text-xl opacity-50 mb-1">
                    {product.tagline}
                  </p>

                  <p className="font-sans text-sm opacity-40 leading-relaxed max-w-xl mt-3 hidden md:block">
                    {product.description}
                  </p>
                </div>

                {/* Right: tags + links */}
                <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                  <div className="flex flex-wrap md:flex-col gap-2">
                    {product.tags.slice(0, 3).map((tag, t) => (
                      <span
                        key={t}
                        className="px-3 py-1 border border-white/15 rounded-full text-[10px] uppercase tracking-wider opacity-60 group-hover:border-white/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-2">
                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-white text-black rounded-full font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-[#00F0FF] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("none")}
                      >
                        Live Demo
                      </a>
                    )}
                    {product.githubUrl && (
                      <a
                        href={product.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-white/20 text-white rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("none")}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
