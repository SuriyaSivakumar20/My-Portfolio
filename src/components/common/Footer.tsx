import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/SuriyaSivakumar20' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/suriya-sivakumar-483735258/' },
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://www.instagram.com/iam.suriyaa._/' },
    { name: 'Email', icon: <Mail size={18} />, url: 'mailto:suriyasivakumar08@gmail.com' }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      className="bg-black border-t-2 border-white/20 py-10 mt-16 relative"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Top pixel divider line with game-panel feel */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-2">
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '11px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0px #444',
                letterSpacing: '0.08em',
              }}
            >
              SURIYA SIVAKUMAR
            </span>
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px',
                color: '#888888',
                letterSpacing: '0.06em',
              }}
            >
              CS Engineer | AI Enthusiast | Freelance Developer
            </span>
          </motion.div>

          {/* Social Icons */}
          <motion.div className="flex items-center gap-3" variants={itemVariants}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="group"
              >
                <motion.div
                  className="w-10 h-10 border-2 border-white/30 flex items-center justify-center text-white/50
                             hover:border-white hover:text-white hover:bg-white hover:text-black
                             transition-all duration-150"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: 'inherit' }}
                >
                  <span className="group-hover:text-black transition-colors">{link.icon}</span>
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-8 pt-6 border-t border-white/10 text-center"
          variants={itemVariants}
        >
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '11px',
              color: '#555555',
              letterSpacing: '0.06em',
            }}
          >
            © {new Date().getFullYear()} SURIYA SIVAKUMAR &nbsp;|&nbsp; ALL RIGHTS RESERVED
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '10px',
              color: '#333333',
              letterSpacing: '0.04em',
            }}
          >
            [ PRESS START TO COLLABORATE ]
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;