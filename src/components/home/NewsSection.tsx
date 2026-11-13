import React, { useEffect, useState } from 'react';
import { Calendar, ArrowUpRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { newsItems as initialNewsItems } from '../../data/siteData';
import { useLanguage } from '../../i18n';
import { fetchSchoolNews, NewsItem } from '../../services/newsService';
import entranceImg from '../../assets/school pictures/entrance.jpg';

const NewsSection: React.FC = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>(() =>
    initialNewsItems.slice(0, 3).map((item) => ({
      ...item,
      image: item.image || entranceImg,
      telegramUrl: 'https://t.me/qoqon_shahar_2_son_IM',
    }))
  );

  useEffect(() => {
    let isMounted = true;
    fetchSchoolNews().then((data) => {
      if (isMounted && data.length > 0) {
        setItems(data.slice(0, 3));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
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
          <div className="flex items-center gap-4 self-start sm:self-auto">
            <a
              href="https://t.me/qoqon_shahar_2_son_IM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#2AABEE] hover:text-brand-navy inline-flex items-center gap-1.5 transition-colors duration-300 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 hover:border-sky-300"
            >
              <Send size={12} className="text-[#2AABEE]" />
              <span>Telegram kanal</span>
            </a>
            <Link
              to="/news"
              className="group text-sm font-bold text-brand-navy hover:text-brand-gold inline-flex items-center gap-2 transition-colors duration-300"
            >
              <span>{t.news.viewAll}</span>
              <ArrowUpRight
                size={16}
                className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Grid List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="group bg-[#FAFBFD] rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100/60 flex flex-col h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              variants={cardVariants}
            >
              {/* Image with zoom effect */}
              <div className="h-56 overflow-hidden relative bg-gray-100">
                <img
                  src={item.image || entranceImg}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== entranceImg) {
                      target.src = entranceImg;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/15 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-brand-gold mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-3 py-1 border border-brand-gold/20">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                    {item.telegramUrl && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 group-hover:text-[#2AABEE] transition-colors">
                        <Send size={11} className="text-[#2AABEE]" />
                        <span>Telegram</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-3 line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <a
                  href={item.telegramUrl || 'https://t.me/qoqon_shahar_2_son_IM'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-brand-navy hover:text-brand-gold font-bold text-xs uppercase tracking-wider gap-2 self-start transition-colors duration-300"
                >
                  <span>{t.news.more}</span>
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
