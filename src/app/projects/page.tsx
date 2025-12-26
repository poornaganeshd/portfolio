import React from 'react';
import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Selected Works | Poornaganesh",
  description: "Case studies of recent web engineering and design projects.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
