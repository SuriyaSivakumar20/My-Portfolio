import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import ProjectCard, { ProjectType } from '../components/projects/ProjectCard';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: ProjectType[] = [
    {
      id: 1,
      title: "FoundersAICircle - AI for VCs & Startups",
      description: "An AI-powered chatbot that helps venture capitalists identify promising startups by analyzing market trends and founder backgrounds.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Python", "NLP", "Machine Learning", "Flask"],
      liveUrl: "https://founderscircleai.vercel.app",
      githubUrl: "https://github.com/SuriyaSivakumar20/founderscircleai"
    },
    {
      id: 2,
      title: "Movie Hub",
      description: "An entertaining platform for watching movies and videos together with friends and family on a local host. Upload any video and share the experience with your loved ones in real time.",
      image: "https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Node.js", "Python", "Html", "CSS"],
      liveUrl: "https://suriyasivakumar20.github.io/Watch_Hub/",
      githubUrl: "https://github.com/SuriyaSivakumar20/Watch_Hub"
    },
    {
      id: 3,
      title: "Mail Dispatcher",
      description: "A web-based bulk email automation platform. Validates recipient lists, customises content per-recipient, and sends mass emails reliably — cutting manual email effort by 80%.",
      image: "https://images.pexels.com/photos/4913769/pexels-photo-4913769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["HTML", "CSS", "JS"],
      liveUrl: "https://suriyasivakumar20.github.io/Mail_Dispatcher/",
      githubUrl: "https://github.com/SuriyaSivakumar20/Mail_Dispatcher"
    },
    {
      id: 4,
      title: "Automated Resume Screening",
      description: "Hackathon-winning project that uses AI to match resumes with job descriptions, reducing hiring time by 70%. By uploading the resumes and job descriptions, the AI model analyzes and ranks candidates based on their fit for the role.",
      image: "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Python", "ML", "NLP", "React"],
      githubUrl: "https://github.com/SuriyaSivakumar20/AI_Resume_Screener"
    },
    {
      id: 5,
      title: "AI Phishing Detection",
      description: "A machine learning model that detects phishing attempts in emails and messages with 96% accuracy using natural language processing.",
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Python", "TensorFlow", "Cybersecurity", "NLP"],
      githubUrl: "https://github.com/SuriyaSivakumar20/AI-Phishing_detection"
    },
    {
      id: 6,
      title: "IPv6 Transmission Mechanism",
      description: "A novel approach to IPv6 packet transmission that improves efficiency in mixed IPv4/IPv6 networks by 35%.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Networking", "Python", "Protocol Design"],
      githubUrl: "https://github.com/SuriyaSivakumar20/Transition-Mechanism-of-IPV4-to-IPV6"
    }
  ];

  // Get unique tags for filter buttons
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  // Filter projects based on selected filter
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(filter));

  return (
    <PageTransition style="rotate">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Projects"
            subtitle="Check out some of my recent work"
          />

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* All button */}
            <motion.button
              className={filter === 'all' ? 'filter-active' : 'secondary-button'}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                padding: '8px 16px',
                letterSpacing: '0.06em',
              }}
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ALL
            </motion.button>

            {allTags.map((tag, index) => (
              <motion.button
                key={index}
                className={filter === tag ? 'filter-active' : 'secondary-button'}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '10px',
                  padding: '8px 14px',
                  letterSpacing: '0.05em',
                }}
                onClick={() => setFilter(tag)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                No projects found with the selected filter.
              </p>
              <button
                className="mt-6 secondary-button"
                onClick={() => setFilter('all')}
              >
                Show All Projects
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;