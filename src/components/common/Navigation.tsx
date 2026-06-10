import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, FileText, Briefcase, Cpu, Mail, BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={14} /> },
    { name: 'About', path: '/about', icon: <User size={14} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={14} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={14} /> },
    { name: 'Skills', path: '/skills', icon: <Cpu size={14} /> },
    { name: 'Achievements', path: '/achievements', icon: <BookOpen size={14} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={14} /> },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 border-b-2 border-white/80 py-3'
          : 'bg-black/70 border-b-2 border-white/20 py-4'
      }`}
      style={{ backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo — retro HUD style */}
        <Link to="/" className="group flex items-center gap-2">
          <span
            className="text-white font-pixel text-xs md:text-sm tracking-widest"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '2px 2px 0px #444444',
              letterSpacing: '0.12em',
            }}
          >
            &gt; SURIYA.EXE
          </span>
          <span
            className="text-white"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              animation: 'cursor-blink 1s step-end infinite',
            }}
          >
            ▮
          </span>
        </Link>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden md:flex space-x-1 items-center"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.li key={link.name} variants={itemVariants}>
              <Link
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] transition-all duration-150 border-2 ${
                  location.pathname === link.path
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/70 border-transparent hover:border-white/50 hover:text-white hover:bg-white/10'
                }`}
                style={{ fontFamily: "'Press Start 2P', monospace", letterSpacing: '0.05em' }}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-black border-t-2 border-white/50 absolute top-full left-0 right-0 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ul className="py-4 px-6 space-y-2">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 py-3 px-4 border-l-4 transition-all ${
                    location.pathname === link.path
                      ? 'border-white bg-white/10 text-white'
                      : 'border-transparent text-white/60 hover:border-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', letterSpacing: '0.05em' }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;