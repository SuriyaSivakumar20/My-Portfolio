import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  style?: 'fade' | 'slide' | 'scale' | 'flip' | 'rotate';
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  style = 'fade'
}) => {
  const variants = {
    initial: {
      opacity: 0,
      ...(style === 'slide' && { x: -100 }),
      ...(style === 'scale' && { scale: 0.9 }),
      ...(style === 'flip' && { rotateY: 90 }),
      ...(style === 'rotate' && { rotate: -5 }),
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      ...(style === 'slide' && { x: 100 }),
      ...(style === 'scale' && { scale: 0.9 }),
      ...(style === 'flip' && { rotateY: -90 }),
      ...(style === 'rotate' && { rotate: 5 }),
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;