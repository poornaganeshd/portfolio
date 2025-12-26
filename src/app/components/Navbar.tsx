"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function Navbar() {
  // const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full pt-[36px] pl-[28px] pr-8 pb-8 flex justify-between items-center z-[9999] pointer-events-none mix-blend-difference text-white">
      {/* Logo */}
      <div className="pointer-events-auto">
        <Link href="/" className="text-xl font-bold font-serif hover:opacity-70 transition-opacity">

        </Link>
      </div>

      {/* Links - Removed to rely on Overlay Navigation */}
      <div className="flex gap-8 pointer-events-auto font-medium font-sans">
        {/* Empty for now, or maybe just a call to action? */}
      </div>
    </nav>
  );
}
