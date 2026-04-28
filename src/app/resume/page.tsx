import { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume | Poornaganesh",
  description:
    "Skills, experience, and the journey so far — AI agentic developer and aspiring filmmaker.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
