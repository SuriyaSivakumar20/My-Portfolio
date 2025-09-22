import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/SuriyaSivakumar20' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/suriya-sivakumar-483735258/' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/iam.suriyaa._/' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:suriyasivakumar08@gmail.com' }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-dark-light/90 backdrop-blur-md py-8 mt-16"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold font-poppins mb-4 md:mb-0">
              <span className="gradient-text">Suriya Sivakumar</span>
            </h3>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4"
            variants={itemVariants}
          >
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-secondary transition-colors duration-300"
                aria-label={link.name}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-white/10 text-center text-white/60 text-sm"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Suriya Sivakumar. All rights reserved.</p>
          <p className="mt-2">CS Engineer | AI Enthusiast | Startup Visionary</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;