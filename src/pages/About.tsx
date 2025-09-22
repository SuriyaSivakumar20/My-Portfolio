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
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl neon-border">
                <img 
                  src="su.jpg" 
                  alt="Suriya Sivakumar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 glass-card p-4 rounded-lg neon-border"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-secondary font-medium">Computer Science Engineering</p>
                <p className="text-white/70">Class of 2026</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  CS Engineer with a passion for <span className="gradient-text">AI & Innovation</span>
                </h3>
              </motion.div>

              <motion.div 
                className="space-y-4 text-white/80 mb-8"
                variants={itemVariants}
              >
                <p>
                  I'm a Computer Science Engineering student with a keen interest in artificial intelligence, 
                  machine learning, and innovative startups. My journey in tech began with a simple curiosity 
                  about how computers work, which quickly evolved into a passion for creating solutions that 
                  can make a difference.
                </p>
                <p>
                  My academic focus has been on developing AI solutions that can solve real-world problems. 
                  I've worked on projects ranging from natural language processing to computer vision, always 
                  with an eye toward practical applications.
                </p>
                <p>
                  Beyond coding, I'm deeply interested in the startup ecosystem and how technology can drive 
                  innovation. I believe that the intersection of AI and entrepreneurship holds tremendous 
                  potential for creating impactful solutions.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 mt-6"
                variants={itemVariants}
              >
                <Link to="/resume">
                  <motion.button 
                    className="primary-button flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={18} />
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GitHub size={18} />
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
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
                  title: "Startup Enthusiast", 
                  description: "Participated in three startup incubation programs while still in college." 
                },
                { 
                  title: "Open Source Contributor", 
                  description: "Actively contributes to AI open source projects with over 10+ contributions." 
                }
              ].map((fact, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 neon-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(138, 43, 226, 0.2)' }}
                >
                  <h3 className="text-xl font-bold font-poppins mb-3 text-secondary">{fact.title}</h3>
                  <p className="text-white/70">{fact.description}</p>
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