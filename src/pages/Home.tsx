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

  return (
    <PageTransition style="fade">
      <div className="min-h-screen flex items-center relative overflow-hidden pt-20">

        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline prefix */}
            <motion.div variants={itemVariants} className="mb-4">
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '12px',
                  color: '#888888',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                ▶ PLAYER 1 HAS ENTERED
              </span>
            </motion.div>

            {/* Main hero heading */}
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.h1
                className="mb-4"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(18px, 4vw, 40px)',
                  color: '#FFFFFF',
                  textShadow: '4px 4px 0px #444444, 8px 8px 0px #222222',
                  lineHeight: '1.5',
                  letterSpacing: '0.02em',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <span
                  style={{
                    color: '#FFFFFF',
                    borderBottom: '4px solid #FFFFFF',
                    paddingBottom: '2px',
                  }}
                >
                  Suriya Sivakumar
                </span>
                {' '}👋
              </motion.h1>

              <motion.h2
                className="mb-6"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 'clamp(13px, 2vw, 18px)',
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.08em',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CS Engineer | AI Enthusiast | Freelance Developer
              </motion.h2>
            </motion.div>

            <motion.p
              className="mb-8 leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'rgba(255,255,255,0.70)',
                lineHeight: '1.8',
              }}
              variants={itemVariants}
            >
              Welcome to my digital portfolio. I'm passionate about artificial intelligence,
              innovative solutions, and cutting-edge technologies that shape our future.
              Explore my freelance projects and discover how I'm helping businesses thrive in the tech world.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link to="/projects">
                <motion.button
                  className="primary-button flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore My Work
                  <ArrowRight size={14} />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="secondary-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>

            {/* Subtle pixel scroll hint */}
            <motion.div
              className="mt-16 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div style={{ width: '32px', height: '2px', background: '#333333' }} />
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '10px',
                  color: '#444444',
                  letterSpacing: '0.15em',
                }}
              >
                SCROLL TO EXPLORE
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;