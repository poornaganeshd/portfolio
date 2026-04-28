"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import CardDeck from "./components/CardDeck";
import Services from "./components/Services";
import TechMarquee from "./components/TechMarquee";
import ThoughtsPreview from "./components/Testimonials";
import Footer from "./components/Footer";
import Process from "./components/Process";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={containerRef}
      className="w-full min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black"
    >
      {/* 1. Personal hero */}
      <Hero />

      {/* 2. Featured products (sticky card deck) */}
      <CardDeck />

      {/* 3. My Craft — three obsessions */}
      <Services />

      {/* 4. The Way — how I work */}
      <Process />

      {/* 5. Featured Thoughts */}
      <ThoughtsPreview />

      {/* 6. Tech stack marquee */}
      <TechMarquee />

      {/* Footer */}
      <Footer />
    </main>
  );
}
