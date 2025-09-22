import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';

const Home: React.FC = () => {
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

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <PageTransition style="fade">
      <div className="min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 filter blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-secondary/20 filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-accent/20 filter blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold font-poppins mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm <span className="gradient-text">Suriya Sivakumar</span> 👋
              </motion.h1>

              <motion.h2 
                className="text-xl md:text-2xl text-white/90 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CS Engineer | AI Enthusiast | Startup Visionary
              </motion.h2>
            </motion.div>

            <motion.p 
              className="text-lg text-white/80 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Welcome to my digital portfolio. I'm passionate about artificial intelligence, 
              innovative startups, and cutting-edge technologies that shape our future. 
              Explore my projects and discover how I'm working to make a difference in the tech world.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link to="/projects">
                <motion.button 
                  className="primary-button flex items-center gap-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                  <ArrowRight size={18} />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button 
                  className="secondary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;