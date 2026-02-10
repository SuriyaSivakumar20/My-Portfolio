import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import { Trophy, Star, Code, GitBranch } from 'lucide-react';

interface CodingProfileType {
  id: number;
  name: string;
  username: string;
  url: string;
  icon: React.ReactNode;
  stats: {
    label: string;
    value: string;
  }[];
  description: string;
  color: string;
}

const CodingProfiles: React.FC = () => {
  const profiles: CodingProfileType[] = [
    {
      id: 1,
      name: "LeetCode",
      username: "suriyasivakumar",
      url: "https://leetcode.com/suriyasivakumar",
      icon: <Code size={24} />,
      stats: [
        { label: "Problems Solved", value: "450+" },
        { label: "Contest Rating", value: "1842" },
        { label: "Global Rank", value: "Top 5%" }
      ],
      description: "Regular participant in LeetCode contests with a focus on algorithms and data structures.",
      color: "#E50914" // Netflix Red
    },
    {
      id: 2,
      name: "Codeforces",
      username: "suriya_sk",
      url: "https://codeforces.com/profile/suriya_sk",
      icon: <Code size={24} />,
      stats: [
        { label: "Rating", value: "1723" },
        { label: "Rank", value: "Expert" },
        { label: "Contests", value: "46" }
      ],
      description: "Active competitive programmer with consistent participation in Codeforces rounds.",
      color: "#B81D24" // Dark Red
    },
    {
      id: 3,
      name: "HackerRank",
      username: "suriyasivakumar",
      url: "https://www.hackerrank.com/suriyasivakumar",
      icon: <Code size={24} />,
      stats: [
        { label: "Badges", value: "12" },
        { label: "Certificates", value: "5" },
        { label: "Points", value: "2540" }
      ],
      description: "5-star coder in Problem Solving, Python, and Java with multiple certifications.",
      color: "#FFFFFF" // White
    },
    {
      id: 4,
      name: "GitHub",
      username: "suriyasivakumar",
      url: "https://github.com/suriyasivakumar",
      icon: <GitBranch size={24} />,
      stats: [
        { label: "Repositories", value: "32" },
        { label: "Stars", value: "125" },
        { label: "Contributions", value: "750+" }
      ],
      description: "Open source contributor with projects focusing on AI, web development, and utilities.",
      color: "#E50914" // Red
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <PageTransition style="scale">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Coding Profiles"
            subtitle="My competitive programming and development platforms"
          />

          <div className="flex justify-center items-center mb-12">
            <motion.div
              className="glass-card p-6 inline-flex items-center gap-3 max-w-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy size={24} className="text-warning" />
              <p className="text-white/80">
                I'm passionate about competitive programming and regularly participate in coding challenges to sharpen my algorithmic skills.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {profiles.map((profile) => (
              <motion.a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className="glass-card p-6 h-full relative overflow-hidden"
                  style={{ borderLeft: `4px solid ${profile.color}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${profile.color}30` }}
                    >
                      <span style={{ color: profile.color }}>{profile.icon}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                      <p className="text-sm text-white/70">@{profile.username}</p>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6">{profile.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {profile.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="text-xl font-bold mb-1"
                          style={{ color: profile.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <motion.div
                      className="flex items-center gap-1 text-sm"
                      style={{ color: profile.color }}
                      whileHover={{ x: 5 }}
                    >
                      View Profile
                      <Star size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CodingProfiles;