import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import { Download, Award, BookOpen, Briefcase } from 'lucide-react';

const Resume: React.FC = () => {
  const experiences = [
    {
      title: "Softskill training Intern",
      company: "LSE GLOBAL ACADEMY",
      period: "Aug 2025 - Till Date",
      description: "Pursuing a comprehensive soft skills training program covering communication, teamwork, problem-solving, and leadership. Conducting in workshops and group activities to enhance interpersonal skills.",
      skills: ["Communication", "Teamwork", "Problem-solving", "Leadership"]
    },
    {
      title: "Cyber Security Intern",
      company: "VEI Technologies",
      period: "Jun 2025 - Oct 2025",
      description: "Worked on natural language processing models for automated content generation. Implemented transformer-based architectures for text summarization with improved accuracy.",
      skills: ["Phishing", "Kali Linux", "White hackers", "Protection"]
    },
    {
      title: "Software Web Development Intern",
      company: "EXPOSYS DATA LABS",
      period: "Jun 2025 - Oct 2025",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with senior developers to implement new features and improve existing codebase.",
      skills: ["HTML", "CSS", "js", "MongoDB"]
    },

    {
      title: "Hackathon Participant",
      company: "YI Innovate Hackathon,SIH, And various",
      period: "Mar 2023 - Present",
      description: "Led a team of 4 to develop an AI solution for automated resume screening. Selected top 20 place among 120+ teams.",
      skills: ["Python", "Machine Learning", "Team Leadership"]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Manakula Vinayagar Institute of Technology",
      period: "2022 - 2026",      
      description: "Specializing in Computer Science Softwares and Other Recent Softwares. Maintaining a CGPA of 8.4/10.",
      courses: ["Data Structures & Algorithms", "Database Management System", "Artificial Intelligence", "Computer Networks"]
    },
    {
      degree: "High School",
      institution: "Petit Seminare Higher Secondary School",
      period: "2020 - 2022",
      description: "Completed with distinction in Mathematics, Physics, and Biology.",
      courses: ["Mathematics", "Physics", "Biology"]
    }
  ];

  const certifications = [
    "Deep Learning Specialization - Coursera (Andrew Ng)",
    "TensorFlow Developer Certification - Google",
    "AWS Certified Machine Learning - Specialty",
    "Full Stack Web Development - Udemy",
    "Python & C Programming (Edusphere)",   
"Cyber Security Certificate (Forage)",   
"NLP with Deep Learning (Coursera)",
"Google Cyber Security Certificate (Coursera)",
"UI/UX Design (VEI Technologies)",
"HTML/CSS - Free Code Camp (Datanerdz.ai)", 
"Workshops: AI & LLM (NIT Puducherry), Cyber Security (IIT Madras). ",
"Participation in Hackathons such as Yi-innovation, Unisys, and Smart India Hackathon.  ",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition style="scale">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <SectionTitle 
              title="Resume"
              subtitle="My professional background"
              align="left"
            />
            
            <motion.a
              href="src\resume\resume.pdf"
              download="Gotcha!.pdf"
              className="primary-button flex items-center gap-2 mt-6 md:mt-0 self-start md:self-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </div>

          {/* Experience Section */}
          <motion.section 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold font-poppins">Work Experience</h2>
            </div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(138, 43, 226, 0.2)' }}
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary to-secondary" />
                  
                  <div className="ml-2">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-dark-lighter rounded-full text-secondary">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-secondary mb-3">{exp.company}</h4>
                    <p className="text-white/80 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-3 py-1 bg-dark-lighter rounded-full text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <BookOpen size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold font-poppins">Education</h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(138, 43, 226, 0.2)' }}
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-secondary to-accent" />
                  
                  <div className="ml-2">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-dark-lighter rounded-full text-secondary">
                        {edu.period}
                      </span>
                    </div>
                    
                    <h4 className="text-lg text-secondary mb-3">{edu.institution}</h4>
                    <p className="text-white/80 mb-4">{edu.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-3 py-1 bg-dark-lighter rounded-full text-white/70"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold font-poppins">Certifications</h2>
            </div>
            
            <motion.div 
              className="glass-card p-6"
              variants={itemVariants}
            >
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-2 w-2 rounded-full bg-secondary mt-2.5" />
                    <span className="text-white/90">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Resume;