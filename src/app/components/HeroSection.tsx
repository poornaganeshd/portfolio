"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const words = ["AI engineer", "AI researcher", "Creator"]; // <-- Moved outside

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentWord = words[wordIndex];
      let displayText = "";

      if (isDeleting) {
        displayText = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        displayText = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      setTypedText(displayText);

      let typeSpeed = isDeleting ? 75 : 150;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, []); // ✅ Now safe, no ESLint complaint

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
          Hi, I&apos;m poorna
          <span className="block sm:inline text-lime-400 ml-3">
            {typedText}
            <span className="animate-ping">|</span>
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
          I test AI tools, design AI agents, automate workflows.
        </p>
        <div>
          <Link
            href="/projects"
            className="inline-block bg-transparent text-lime-400 font-medium text-lg px-8 py-3 rounded-md border-2 border-lime-400 shadow-lg hover:bg-lime-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-lime-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
