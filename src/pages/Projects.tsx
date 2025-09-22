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
      title: "B.I.R.D. - AI Chatbot for VCs & Startups",
      description: "An AI-powered chatbot that helps venture capitalists identify promising startups by analyzing market trends and founder backgrounds.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Python", "NLP", "Machine Learning", "Flask"],
      liveUrl: "https://suriyasivakumar20.github.io/B.I.R.D./",
      githubUrl: "https://github.com/SuriyaSivakumar20/B.I.R.D."
    },
    {
      id: 2,
      title: "Movie_Hub",
      description: "A platform that aggregates Movie Watching wiht the friends and families on a local host.A entertaining platform that allows to upload a video or the movie you want to watch with your loved ones!.",
      image: "https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Node.js", "Python", "Html", "CSS"],
      liveUrl: "https://suriyasivakumar20.github.io/Watch_Hub/",
      githubUrl: "https://github.com/SuriyaSivakumar20/Watch_Hub"
    },
    {
      id: 3,
      title: "Mail_Dispatcher",
      description: "The Mass-Mail Dispatcher system provides a reliable and efficient way to manage bulk email communication. By automating the validation and distribution of emails, web-based application offers a simple, structured, and customizable platform for sending mass emails. ",
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
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-lighter text-white/70 hover:text-white'
              }`}
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            
            {allTags.map((tag, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tag 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-white/70 hover:text-white'
                }`}
                onClick={() => setFilter(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/70 text-lg">No projects found with the selected filter.</p>
              <button 
                className="mt-4 secondary-button"
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