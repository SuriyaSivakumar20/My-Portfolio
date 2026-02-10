import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import SkillBar, { SkillType } from '../components/skills/SkillBar';
import { Code, Server, Database, PenTool as Tool } from 'lucide-react';

const Skills: React.FC = () => {
  const frontendSkills: SkillType[] = [
    { name: "HTML", level: 95 },
    { name: "JavaScript", level: 70 },
    { name: "CSS", level: 85 },
    // { name: "Framer Motion", level: 80 },
    // { name: "TypeScript", level: 75 }
  ];

  const backendSkills: SkillType[] = [
    { name: "Python", level: 85 },
    { name: "Flask", level: 80 },
    { name: "Node.js", level: 80 },
    { name: "Go", level: 60 },
    { name: "Java", level: 65 },
    { name: "SQL", level: 70 }
  ];

  const aiMlSkills: SkillType[] = [
    { name: "Scikit-learn", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "NLP", level: 80 },
    { name: "Computer Networks", level: 75 },
    { name: "Prompt Engineering", level: 90 }
  ];

  const toolsSkills: SkillType[] = [
    { name: "Git", level: 95 },
    { name: "Figma", level: 85 },
    { name: "StarUML", level: 75 },
    { name: "Docker", level: 70 },
    { name: "Canva", level: 90 },
    { name: "AWS", level: 65 }
  ];

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition style="flip">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Skills"
            subtitle="My technical expertise"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Frontend Skills */}
            <motion.div
              className="glass-card p-6"
              variants={sectionVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <Code size={24} className="text-secondary" />
                <h3 className="text-xl font-bold font-poppins">Frontend</h3>
              </div>

              {frontendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>

            {/* Backend Skills */}
            <motion.div
              className="glass-card p-6"
              variants={sectionVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <Server size={24} className="text-secondary" />
                <h3 className="text-xl font-bold font-poppins">Backend</h3>
              </div>

              {backendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>

            {/* AI/ML Skills */}
            <motion.div
              className="glass-card p-6"
              variants={sectionVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <Database size={24} className="text-secondary" />
                <h3 className="text-xl font-bold font-poppins">AI & Machine Learning</h3>
              </div>

              {aiMlSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>

            {/* Tools Skills */}
            <motion.div
              className="glass-card p-6"
              variants={sectionVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <Tool size={24} className="text-secondary" />
                <h3 className="text-xl font-bold font-poppins">Tools & Technologies</h3>
              </div>

              {toolsSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </motion.div>

          {/* Languages Graph */}
          <motion.div
            className="mt-16 glass-card p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold font-poppins mb-8 text-center">Programming Languages Proficiency</h3>

            <div className="flex flex-wrap justify-center items-end gap-6 h-64 mb-6">
              {[
                { name: "Python", level: 85, color: "#E50914" }, // Red
                { name: "JavaScript", level: 60, color: "#F5F5F1" }, // White-ish
                { name: "C++", level: 65, color: "#B81D24" }, // Dark Red
                { name: "Java", level: 65, color: "#E50914" }, // Red
                { name: "Go", level: 60, color: "#F5F5F1" }, // White-ish
                { name: "SQL", level: 70, color: "#B81D24" } // Dark Red
              ].map((lang, index) => (
                <motion.div
                  key={lang.name}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{
                    opacity: 1,
                    height: "auto"
                  }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="relative w-16 md:w-24 rounded-t-lg overflow-hidden flex justify-center items-end"
                    style={{ backgroundColor: lang.color + "30" }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${lang.level * 2}px` }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3 + (index * 0.2),
                      ease: [0.25, 0.1, 0.25, 1.0],
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute bottom-0 w-full"
                      style={{
                        backgroundColor: lang.color,
                        height: `${lang.level}%`
                      }}
                      initial={{ height: "0%" }}
                      whileInView={{ height: `${lang.level}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + (index * 0.2),
                        ease: [0.25, 0.1, 0.25, 1.0],
                      }}
                      viewport={{ once: true }}
                    />
                    <span className="relative z-10 text-white font-medium mb-2">{lang.level}%</span>
                  </motion.div>
                  <span className="text-white/80 text-sm">{lang.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;