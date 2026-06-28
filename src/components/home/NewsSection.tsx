import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { newsItems } from '../../data/siteData';
import { useLanguage } from '../../i18n';

const NewsSection = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="news" className="py-24 bg-white relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              {t.news.title}
            </div>
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              {t.news.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl">
              {t.news.subtitle}
            </p>
          </div>
          <Link 
            to="/news" 
            className="group text-sm font-bold text-brand-navy hover:text-brand-gold inline-flex items-center gap-2 transition-colors duration-300 self-start sm:self-auto"
          >
            <span>{t.news.viewAll}</span> 
            <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Grid List */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {newsItems.slice(0, 3).map((item) => (
            <motion.div 
              key={item.id} 
              className="group bg-[#FAFBFD] rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100/60 flex flex-col h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              variants={cardVariants}
            >
              {/* Image with zoom effect */}
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-xs font-semibold text-brand-gold mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-3 py-1 border border-brand-gold/20">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3 line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                
                <Link 
                  to="/news"
                  className="inline-flex items-center text-brand-navy hover:text-brand-gold font-bold text-xs uppercase tracking-wider gap-2 self-start transition-colors duration-300"
                >
                  <span>{t.news.more}</span> 
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
