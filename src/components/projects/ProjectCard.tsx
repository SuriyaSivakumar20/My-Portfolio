import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      className="flex flex-col h-full"
      style={{
        background: '#0a0a0a',
        border: '2px solid rgba(255,255,255,0.25)',
        boxShadow: '5px 5px 0px rgba(255,255,255,0.15)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(255,255,255,0.8)',
        boxShadow: '8px 8px 0px rgba(255,255,255,0.4)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Image section */}
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)',
          }}
        />
        {/* Project number badge */}
        <div
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-white/50"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: 'rgba(255,255,255,0.6)',
            background: 'rgba(0,0,0,0.7)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content section */}
      <div className="p-5 flex-grow flex flex-col border-t border-white/10">
        <h3
          className="mb-3"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(9px, 1.5vw, 11px)',
            color: '#FFFFFF',
            lineHeight: '1.6',
            letterSpacing: '0.02em',
          }}
        >
          {project.title}
        </h3>

        <p
          className="mb-4 flex-grow"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: '1.7',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '10px',
                padding: '3px 8px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        {project.liveUrl && (
          <div className="mt-auto">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full justify-center"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                padding: '9px 12px',
                background: '#FFFFFF',
                color: '#000000',
                border: '2px solid #FFFFFF',
                boxShadow: '3px 3px 0px #888888',
                letterSpacing: '0.04em',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}
              whileHover={{
                background: '#000000',
                color: '#FFFFFF',
                boxShadow: '5px 5px 0px #FFFFFF',
                x: -2,
                y: -2,
              }}
              whileTap={{ scale: 0.97, x: 2, y: 2 }}
            >
              <ExternalLink size={12} />
              LIVE DEMO
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;