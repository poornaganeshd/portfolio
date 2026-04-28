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
  title: "Poornaganesh — Tech & Film",
  description:
    "Poornaganesh is a tech and film wanderer specialising in AI agentic development, with a long-term goal as a filmmaker.",
  openGraph: {
    title: "Poornaganesh — Tech & Film",
    description:
      "Building intelligent systems by day. Chasing cinematic stories by soul.",
    url: "https://poornaganesh.dev",
    siteName: "Poornaganesh",
    images: [
      {
        url: "/images/neural-scape.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poornaganesh — Tech & Film",
    description:
      "Building intelligent systems by day. Chasing cinematic stories by soul.",
    creator: "@poornaganesh",
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
