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
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.15, ease: "easeOut" }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "48px",
      transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={`mb-12 max-w-xl ${alignClasses[align]}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {/* Pixel label above heading */}
      <motion.span
        className="inline-block mb-3"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          color: '#888888',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
        variants={subtitleVariants}
      >
        ▶ SECTION
      </motion.span>

      <motion.h2
        className="mb-3"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(14px, 2.5vw, 22px)',
          color: '#FFFFFF',
          textShadow: '3px 3px 0px #444444, 5px 5px 0px #222222',
          letterSpacing: '0.04em',
          lineHeight: '1.5',
        }}
        variants={titleVariants}
      >
        {title}
      </motion.h2>

      {/* Pixel underline — solid white bar */}
      <motion.div
        className={`h-1 bg-white mb-4 ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`}
        style={{ height: '3px' }}
        variants={lineVariants}
      />

      {subtitle && (
        <motion.p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '13px',
            color: '#888888',
            letterSpacing: '0.05em',
          }}
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;