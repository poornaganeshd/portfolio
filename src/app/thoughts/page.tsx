import { Metadata } from "next";
import ThoughtsClient from "./ThoughtsClient";

export const metadata: Metadata = {
  title: "Thoughts | Poornaganesh",
  description: "Ideas, reflections, and observations on AI, film, and building.",
};

export default function ThoughtsPage() {
  return <ThoughtsClient />;
}
