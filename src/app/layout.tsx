import MenuContainer from "./menu/MenuContainer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import { CursorProvider } from "./context/CursorContext";
import { SoundProvider } from "./context/SoundContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poornaganesh | Creative Developer",
  description: "Portfolio of Poornaganesh, a creative developer specializing in Next.js, WebGL, and Agentic AI.",
  openGraph: {
    title: "Poornaganesh | Creative Developer",
    description: "Building digital experiences that defy gravity.",
    url: "https://poorna.dev",
    siteName: "Poornaganesh Portfolio",
    images: [
      {
        url: "/images/neural-scape.png", // Using an existing image for now
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poornaganesh | Creative Developer",
    description: "Building digital experiences that defy gravity.",
    creator: "@poorna_dev",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-[#F1F1F1] antialiased">
        <CursorProvider>
          <SoundProvider>
            <SmoothScroll>
              <Preloader />
              <GrainOverlay />
              <ScrollProgress />
              <CustomCursor />
              <Navbar />
              <MenuContainer />
              <main>{children}</main>
            </SmoothScroll>
          </SoundProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
