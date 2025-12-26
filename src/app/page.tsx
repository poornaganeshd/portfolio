"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero";
import CardDeck from "./components/CardDeck";
import Services from "./components/Services";
import TechMarquee from "./components/TechMarquee";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Process from "./components/Process";


gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="w-full min-h-screen bg-[#050505] text-[#F1F1F1] selection:bg-[#00F0FF] selection:text-black">

      {/* 1. Hero Scene */}
      <Hero />

      {/* 2. Card Deck (Replaces Sticky Scroll) */}
      <CardDeck />

      {/* 3. Selected Works */}


      {/* 4. Interactive Services */}
      <Services />

      {/* 4.5 The Process */}
      <Process />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Tech Marquee */}
      <TechMarquee />

      {/* Footer */}
      <Footer />

    </main>
  );
}
