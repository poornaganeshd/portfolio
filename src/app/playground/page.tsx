import React from 'react';
import { Metadata } from "next";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground | Poornaganesh",
  description: "AI-powered RAG chatbot and image generation experiments.",
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
