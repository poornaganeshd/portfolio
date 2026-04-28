"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCursor } from "../context/CursorContext";
import { products } from "@/data/projects";

const cardThemes = [
  { bg: "bg-[#3d2b8c]", accent: "text-white", watermark: "#8075FF" },
  { bg: "bg-[#003d42]", accent: "text-white", watermark: "#00F0FF" },
  { bg: "bg-[#5c0028]", accent: "text-white", watermark: "#FF006E" },
  { bg: "bg-[#2d2000]", accent: "text-white", watermark: "#F0A500" },
];

const statusLabel: Record<string, string> = {
  live: "● Live",
  beta: "◐ Beta",
  "in-dev": "○ In Dev",
};

export default function CardDeck() {
  const { setCursorType } = useCursor();

  return (
    <section className="relative w-full">
      {products.slice(0, 4).map((product, i) => {
        const theme = cardThemes[i % cardThemes.length];

        return (
          <div
            key={i}
            className={`sticky top-0 w-full h-screen ${theme.bg} overflow-hidden flex items-center justify-center`}
            style={{ zIndex: i + 1 }}
          >
            {/* Giant watermark */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden">
              <h1
                className="text-[25vw] font-display font-black leading-[0.75] tracking-tighter opacity-10 text-white translate-y-[5%]"
              >
                {product.title.split(" ")[0].toUpperCase()}
              </h1>
            </div>

            {/* Content */}
            <div className="relative w-full max-w-[1600px] h-full grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-20">
              {/* Left */}
              <div className="flex flex-col justify-center items-start space-y-6 z-10 order-2 md:order-1">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center ${theme.accent}`}>
                    <span className="font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    {statusLabel[product.status]}
                  </span>
                </div>

                <div className={theme.accent}>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">
                    {product.year}
                  </p>
                  <h2 className="text-5xl md:text-8xl font-display font-bold uppercase leading-none mb-4">
                    {product.title}
                  </h2>
                  <p className="font-serif italic text-lg md:text-xl opacity-70 mb-2">
                    {product.tagline}
                  </p>
                  <p className="text-sm md:text-base opacity-50 max-w-md leading-relaxed hidden md:block">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-white/20 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="mt-2 px-8 py-3 bg-white text-black rounded-full font-bold font-mono text-xs uppercase tracking-wider hover:scale-105 transition-transform duration-300"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  All Products →
                </Link>
              </div>

              {/* Right: product card */}
              <div className="flex items-center justify-center md:justify-end z-10 order-1 md:order-2">
                <div
                  className="relative w-[85%] aspect-square bg-black/30 rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 border border-white/10 overflow-hidden group backdrop-blur-sm"
                  onMouseEnter={() => setCursorType("view")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  {/* Fake browser chrome */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-black/40 backdrop-blur-md flex items-center px-4 space-x-2 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <div className="ml-4 flex-1 h-4 bg-white/5 rounded-sm" />
                  </div>

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover pt-8"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center pt-8">
                      <div className="text-center">
                        <span
                          className="font-display text-6xl md:text-8xl font-black opacity-20 block"
                          style={{ color: theme.watermark }}
                        >
                          {product.title.split(" ").map(w => w[0]).join("")}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-30 mt-4 block">
                          {product.status === "in-dev" ? "Coming Soon" : "Preview"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="block text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      {product.status}
                    </span>
                    <span className="block text-sm font-display text-white/60">{product.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
