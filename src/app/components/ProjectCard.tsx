"use client";

import React from 'react';
import { useCursor } from '../context/CursorContext';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubUrl, demoUrl, tags = [] }) => {
  const { setCursorType } = useCursor();

  return (
    <div
      className="group relative bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00F0FF]/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
      onMouseEnter={() => setCursorType("hover")}
      onMouseLeave={() => setCursorType("default")}
    >
      {/* Neon Glow Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-[#FF006E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-8 flex flex-col h-full relative z-10">
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#00F0FF] transition-colors">{title}</h3>

        <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] border border-[#00F0FF]/30 px-3 py-1 rounded-full bg-[#00F0FF]/5">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-auto">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 border border-white/20 rounded-xl text-center font-bold hover:bg-white hover:text-black transition-all"
          >
            CODE
          </a>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-[#00F0FF] text-black rounded-xl text-center font-bold hover:bg-[#00C0CC] hover:scale-105 transition-all"
          >
            DEMO
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
