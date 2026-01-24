import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, FileText, Briefcase, Cpu, Mail, BookOpen, Github as GitHub } from 'lucide-react';

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
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Resume', path: '/resume', icon: <FileText size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={18} /> },
    { name: 'Skills', path: '/skills', icon: <Cpu size={18} /> },
    { name: 'Achievements', path: '/achievements', icon: <BookOpen size={18} /> },
    //{ name: 'Coding', path: '/coding-profiles', icon: <Code size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-light/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-poppins">
          <span className="gradient-text">Suriya Sivakumar</span>
        </Link>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden md:flex space-x-6 items-center"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.li key={link.name} variants={itemVariants}>
              <Link
                to={link.path}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all ${location.pathname === link.path
                    ? 'text-secondary font-medium'
                    : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-dark-light/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 py-2 ${location.pathname === link.path
                      ? 'text-secondary font-medium'
                      : 'text-white/80'
                    }`}
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