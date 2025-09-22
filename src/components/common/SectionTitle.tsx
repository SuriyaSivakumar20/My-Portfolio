import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center' 
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      } 
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "40px",
      transition: { 
        duration: 0.6,
        delay: 0.3,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <motion.div 
      className={`mb-12 max-w-xl ${alignClasses[align]}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold font-poppins mb-2"
        variants={titleVariants}
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      
      <motion.div 
        className={`h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`}
        variants={lineVariants}
      />
      
      {subtitle && (
        <motion.p 
          className="text-white/80 mt-2"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;