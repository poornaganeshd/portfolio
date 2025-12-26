import React from 'react';
import { Metadata } from "next";
import AILabClient from "./AILabClient";

export const metadata: Metadata = {
  title: "AI Lab | Poornaganesh",
  description: "Experimental AI interfaces and generative models.",
};

export default function AILabPage() {
  return <AILabClient />;
}
