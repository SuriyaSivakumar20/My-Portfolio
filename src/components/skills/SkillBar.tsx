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
        duration: 0.6,
        delay: 0.1 + (index * 0.1),
      }
    }
  };

  const getColorClass = () => {
    if (skill.color) return skill.color;
    
    if (skill.level >= 90) return 'from-secondary to-primary';
    if (skill.level >= 75) return 'from-primary to-secondary';
    if (skill.level >= 60) return 'from-accent to-primary';
    if (skill.level >= 40) return 'from-primary-light to-accent';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <motion.span 
          className="font-medium text-white"
          variants={labelVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skill.name}
        </motion.span>
        <motion.span 
          className="text-white/70"
          variants={labelVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      <div className="h-3 bg-dark-lighter rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColorClass()} rounded-full`}
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