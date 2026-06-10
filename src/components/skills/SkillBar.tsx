import React from 'react';
import { motion } from 'framer-motion';

export interface SkillType {
  name: string;
  level: number; // 0-100
  color?: string;
}

interface SkillBarProps {
  skill: SkillType;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const barVariants = {
    initial: { width: 0 },
    animate: {
      width: `${skill.level}%`,
      transition: {
        duration: 1,
        delay: 0.2 + (index * 0.1),
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const labelVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + (index * 0.1),
      }
    }
  };

  // Monochrome fill based on level: brighter = higher level
  const getFill = () => {
    if (skill.level >= 90) return '#FFFFFF';
    if (skill.level >= 75) return '#DDDDDD';
    if (skill.level >= 60) return '#BBBBBB';
    if (skill.level >= 40) return '#999999';
    return '#666666';
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <motion.span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px',
            color: '#EEEEEE',
            letterSpacing: '0.05em',
          }}
          variants={labelVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: '#888888',
          }}
          variants={labelVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="overflow-hidden"
        style={{
          height: '8px',
          background: '#1a1a1a',
          border: '1px solid #333333',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: getFill(),
          }}
          variants={barVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default SkillBar;