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
      title: "LSE Internship",
      description: "Spent an amazing winter at LSE, where I developed my interpersonal skills as well i trained students to openup the concept of English is just a language. The team spirit was incredible!",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "Dec 2025",
      rotation: -2
    },
    {
      id: 2,
      title: "Hackathon Victory",
      description: "Winner of the Global AI Hackathon 2023! We built a vision-based accessibility tool for the visually impaired in 48 sleepless hours.",
      image: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "Oct 2023",
      rotation: 1.5
    },
    {
      id: 3,
      title: "Innovation Prize",
      description: "Honored to receive the Best Student Innovation Award for my research project on sustainable computing.",
      image: "https://images.pexels.com/photos/7005041/pexels-photo-7005041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "Dec 2023",
      rotation: -1.5
    },
    {
      id: 4,
      title: "First Tech Talk",
      description: "Gave my first public talk on React Performance at the local developer meetup. Nervous but thrilled!",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "Feb 2024",
      rotation: 2
    },
    {
      id: 5,
      title: "Open Source Journey",
      description: "My pull request was merged into a major open source library. Contributing to the community feels great.",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "Mar 2024",
      rotation: -1
    },
    {
      id: 6,
      title: "Graduation Day",
      description: "Simply a memorable day celebrating 4 years of hard work, coding late nights, and amazing friendships.",
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "May 2024",
      rotation: 1
    }
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
                {/* Polaroid Card */}
                <motion.div
                  className="bg-white p-4 pb-20 shadow-2xl relative max-w-sm w-full"
                  style={{ rotate: item.rotation }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                    zIndex: 20,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Pin Effect */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-md border-2 border-white/50"></div>
                  </div>

                  {/* Tape Effect (Alternative to pin, uncomment if preferred)
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm border border-white/20"></div>
                  */}

                  {/* Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.05]"
                    />
                  </div>

                  {/* Handwritten-style Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 h-24 flex flex-col justify-center items-center text-center">
                    <h3 className="text-gray-900 font-bold text-lg font-serif mb-1 leading-tight">{item.title}</h3>
                    <p className="text-gray-600 font-serif text-sm italic leading-snug px-2 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-mono">{item.date}</span>
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