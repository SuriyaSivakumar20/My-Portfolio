import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import { FileText, Github as GitHub, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  // For animation sequencing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition style="slide">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="About Me"
            subtitle="Get to know me better"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Monochrome profile image with pixel border */}
              <div
                className="aspect-square w-full max-w-md mx-auto overflow-hidden"
                style={{
                  border: '3px solid rgba(255,255,255,0.5)',
                  boxShadow: '8px 8px 0px rgba(255,255,255,0.15)',
                }}
              >
                <img
                  src="/su1.jpeg"
                  alt="Suriya Sivakumar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info badge */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 p-3"
                style={{
                  background: 'rgba(0,0,0,0.85)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  boxShadow: '4px 4px 0px rgba(255,255,255,0.15)',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '10px',
                    color: '#FFFFFF',
                    letterSpacing: '0.03em',
                    lineHeight: '1.8',
                    wordBreak: 'break-word',
                  }}
                >
                  Computer Science Engineering
                </p>
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '11px',
                    color: '#AAAAAA',
                    marginTop: '4px',
                    letterSpacing: '0.05em',
                  }}
                >
                  Class of 2026
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h3
                  className="mb-6"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 'clamp(11px, 1.8vw, 15px)',
                    color: '#FFFFFF',
                    textShadow: '2px 2px 0px #444444',
                    lineHeight: '1.7',
                    letterSpacing: '0.03em',
                  }}
                >
                  CS Engineer with a passion for AI & Innovation
                </h3>
              </motion.div>

              <motion.div
                className="space-y-4 mb-8"
                variants={itemVariants}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: '1.8',
                }}
              >
                <p>
                  I'm a Computer Science Engineering student with a keen interest in artificial intelligence,
                  machine learning, and freelance development. My journey in tech began with a simple curiosity
                  about how computers work, which quickly evolved into a passion for creating solutions that
                  solve real business problems.
                </p>
                <p>
                  My academic focus has been on developing AI solutions that can be applied to real-world scenarios.
                  I've worked on projects ranging from natural language processing to computer vision, always
                  with an eye toward practical implementation and client needs.
                </p>
                <p>
                  Beyond coding, I'm deeply interested in the freelance ecosystem and how technology can drive
                  business growth. I believe that professional software development holds tremendous
                  potential for transforming ideas into reality.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 mt-6"
                variants={itemVariants}
              >
                <Link to="/resume">
                  <motion.button
                    className="primary-button flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FileText size={14} />
                    View Resume
                  </motion.button>
                </Link>

                <a
                  href="https://github.com/SuriyaSivakumar20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="secondary-button flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitHub size={14} />
                    GitHub
                  </motion.button>
                </a>

                <a
                  href="https://www.linkedin.com/in/suriya-sivakumar-483735258/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="secondary-button flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Fun Facts Section */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle title="Fun Facts" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Hackathon Participant",
                  description: "Won two appreciation in a national AI hackathon with a solution for the projects."
                },
                {
                  title: "Freelance Developer",
                  description: "Delivering high-quality software solutions for clients while pursuing my degree."
                },
                {
                  title: "Open Source Contributor",
                  description: "Actively contributes to AI open source projects with over 10+ contributions."
                }
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  className="p-6"
                  style={{
                    background: '#0a0a0a',
                    border: '2px solid rgba(255,255,255,0.2)',
                    boxShadow: '5px 5px 0px rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    borderColor: 'rgba(255,255,255,0.6)',
                    boxShadow: '8px 8px 0px rgba(255,255,255,0.25)',
                  }}
                >
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 'clamp(9px, 1.2vw, 11px)',
                      color: '#FFFFFF',
                      lineHeight: '1.6',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {fact.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.60)',
                      lineHeight: '1.7',
                    }}
                  >
                    {fact.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;