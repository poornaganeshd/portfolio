import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Poornaganesh",
  description:
    "A tech and film wanderer — building AI agentic systems and chasing a long-term goal as a filmmaker.",
};

export default function AboutPage() {
  return <AboutClient />;
}
