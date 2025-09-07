import React from 'react';

// Define the types for the component's props
interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  tags: string[]; // Added tags for technologies
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubUrl, demoUrl, tags = [] }) => {
  return (
    <div className="relative group bg-gray-900 rounded-lg shadow-xl p-px overflow-hidden h-full transform transition-all duration-300 ease-in-out hover:shadow-cyan-400/50 hover:scale-[1.02]">
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
      
      <div className="relative bg-gray-900 rounded-lg p-6 flex flex-col h-full">
        {/* Project Title */}
        <h3 className="text-2xl font-bold text-white mb-3 z-10">{title}</h3>

        {/* Project Description */}
        <p className="text-gray-400 mb-4 flex-grow z-10">{description}</p>
        
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-6 z-10">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-800 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center space-x-4 z-10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-medium text-gray-300 py-2 px-4 rounded-md hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
            <span>Code</span>
          </a>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

