import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface ArticleType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
  categories: string[];
}

const Articles: React.FC = () => {
  const articles: ArticleType[] = [
    {
      id: 1,
      title: "The Future of AI in Startup Ecosystems",
      excerpt: "How artificial intelligence is revolutionizing the way startups operate and innovate in today's competitive landscape.",
      date: "May 15, 2024",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      url: "https://medium.com/@suriyasivakumar/ai-startup-ecosystems",
      categories: ["AI", "Startups", "Innovation"]
    },
    {
      id: 2,
      title: "Building Resilient ML Systems: Lessons Learned",
      excerpt: "Key insights and best practices for developing machine learning systems that can withstand real-world challenges and edge cases.",
      date: "April 3, 2024",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      url: "https://medium.com/@suriyasivakumar/resilient-ml-systems",
      categories: ["Machine Learning", "System Design", "Best Practices"]
    },
    {
      id: 3,
      title: "From Idea to MVP: A Technical Founder's Guide",
      excerpt: "A comprehensive roadmap for technical founders to transform their ideas into viable minimum viable products with limited resources.",
      date: "March 17, 2024",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      url: "https://medium.com/@suriyasivakumar/idea-to-mvp-guide",
      categories: ["Startups", "Product Development", "Engineering"]
    },
    {
      id: 4,
      title: "Natural Language Processing: Current Trends and Future Directions",
      excerpt: "An exploration of the latest advancements in NLP and what the future holds for this rapidly evolving field.",
      date: "February 28, 2024",
      readTime: "15 min read",
      image: "https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      url: "https://medium.com/@suriyasivakumar/nlp-trends-future",
      categories: ["NLP", "AI", "Research"]
    },
    {
      id: 5,
      title: "Why IPv6 Matters: The Future of Internet Connectivity",
      excerpt: "A deep dive into IPv6, its benefits over IPv4, and why it's crucial for the future of internet infrastructure.",
      date: "January 12, 2024",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      url: "https://medium.com/@suriyasivakumar/ipv6-matters",
      categories: ["Networking", "IPv6", "Internet Infrastructure"]
    }
  ];
  
  return (
    <PageTransition style="fade">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Featured Articles"
            subtitle="Insights and perspectives on AI, startups, and technology"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT to-transparent opacity-70" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2">
                      {article.categories.map((category, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-primary/50 backdrop-blur-sm text-white"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center text-sm text-white/70 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold font-poppins mb-3 text-white">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <motion.div 
                      className="text-secondary flex items-center gap-2 mt-auto text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Read more
                      <ExternalLink size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Articles;