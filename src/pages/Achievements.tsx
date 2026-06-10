import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  rotation: number;
}

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "CARATLANE - A TATA PRODUCT Internship",
      description: "A Real World Experience at Tata Product, where I worked on a project to improve the user experience of the Tata Product app, and also working on the main working concept of the app.",
      image: "/caratlane.jpg",
      date: "Dec 2025",
      rotation: -2
    },
    {
      id: 2,
      title: "LSE Internship",
      description: "Spent an amazing winter at LSE, where I developed my interpersonal skills as well i trained students to openup the concept of English is just a language. The team spirit was incredible!",
      image: "/lse-internship.jpeg",
      date: "Dec 2025",
      rotation: 1.5
    },
    {
      id: 3,
      title: "Hackathon Victory",
      description: "Selected in one of the Global AI Hackathon 2025! We built a vision-based accessibility tool for the visually impaired in 48 hours.",
      image: "/hackathon-victory.jpeg",
      date: "Nov 2025",
      rotation: -1.5
    },
    {
      id: 4,
      title: "Innovation Prize",
      description: "Honored to receive the Best event Innovation Award for non technical event conducted in our own college, It was the 1st time we all conducted a event in our college, and it was a great experience.",
      image: "/innovation-award.jpeg",
      date: "Dec 2023",
      rotation: 2
    },
    {
      id: 5,
      title: "First Tech Talk",
      description: "Gave my first public talk on React Performance at the university level paper presentation. Nervous but thrilled!",
      image: "/tech-talk.jpeg",
      date: "Oct 2024",
      rotation: -1
    },
    {
      id: 6,
      title: "Open Source Journey",
      description: "Participated in hackathon with my team and learned many new concepts, other fellow team members idea on different projects.",
      image: "/open-source.jpeg",
      date: "Mar 2025",
      rotation: 1
    },
    {
      id: 7,
      title: "My First offer letter",
      description: "Simply a memorable day celebrating 4 years of hard work, coding late nights, and amazing friendships.",
      image: "/offer-letter.jpeg",
      date: "Sept 2025",
      rotation: -2
    },
    {
      id: 8,
      title: "Motivation Session",
      description: "Conducted a motivation session for new 1st year students at my college, sharing my journey and insights to inspire them, along with my friends.",
      image: "/motivation-session.jpg",
      date: "Oct 2025",
      rotation: 1.5
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="My Achievements"
            subtitle="Polaroid memories of my internships, hackathons, and prizes"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16 px-4 md:px-12">
            {achievements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="relative flex justify-center"
              >
                {/* Polaroid Card — monochrome: white card on black background */}
                <motion.div
                  className="relative max-w-sm w-full flex flex-col"
                  style={{
                    rotate: item.rotation,
                    background: '#F8F8F8',
                    padding: '16px 16px 24px 16px',
                    boxShadow: '8px 8px 0px rgba(255,255,255,0.12)',
                    border: '1px solid #E0E0E0',
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.04,
                    zIndex: 20,
                    boxShadow: '12px 12px 0px rgba(255,255,255,0.25)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Pin Effect — monochrome gray pin */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#555555',
                        border: '2px solid #999999',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      }}
                    />
                  </div>

                  {/* Image — grayscale */}
                  <div
                    className="w-full overflow-hidden mb-4 shrink-0"
                    style={{
                      aspectRatio: '4/3',
                      background: '#CCCCCC',
                      border: '1px solid #DDDDDD',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text area */}
                  <div className="pt-2 pb-6 px-2 flex flex-col justify-center items-center text-center min-h-[5rem]">
                    <h3
                      className="mb-2 leading-tight"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '9px',
                        color: '#111111',
                        letterSpacing: '0.03em',
                        lineHeight: '1.7',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="leading-snug px-1 mb-6"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        color: '#555555',
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                      }}
                    >
                      {item.description}
                    </p>
                    <span
                      className="absolute bottom-2 right-4"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '10px',
                        color: '#999999',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Achievements;