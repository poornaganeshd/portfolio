"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full pt-[36px] pl-[28px] pr-8 pb-8 flex justify-between items-center z-[9999] pointer-events-none mix-blend-difference text-white">
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="text-sm font-mono font-bold tracking-widest uppercase hover:opacity-60 transition-opacity"
        >
          Poornaganesh
        </Link>
      </div>
      <div className="flex gap-8 pointer-events-auto font-medium font-sans" />
    </nav>
  );
}
