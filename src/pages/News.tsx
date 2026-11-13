import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { newsItems as initialNewsItems } from '../data/siteData';
import { useLanguage } from '../i18n';
import SEO from '../components/SEO';
import { fetchSchoolNews, NewsItem } from '../services/newsService';
import entranceImg from '../assets/school pictures/entrance.jpg';

const ITEMS_PER_PAGE = 6;

const News: React.FC = () => {
  const { language, t } = useLanguage();
  const topRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [items, setItems] = useState<NewsItem[]>(() =>
    initialNewsItems.map((item) => ({
      ...item,
      image: item.image || entranceImg,
      telegramUrl: 'https://t.me/qoqon_shahar_2_son_IM',
    }))
  );

  useEffect(() => {
    let isMounted = true;
    fetchSchoolNews().then((data) => {
      if (isMounted && data.length > 0) {
        setItems(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const paginationLabels = {
    uz: {
      prev: 'Oldingi',
      next: 'Keyingi',
      showing: `Sahifa ${currentPage} / ${totalPages} • Jami ${items.length} ta yangilik`,
    },
    ru: {
      prev: 'Назад',
      next: 'Вперёд',
      showing: `Страница ${currentPage} из ${totalPages} • Всего ${items.length} новостей`,
    },
    en: {
      prev: 'Previous',
      next: 'Next',
      showing: `Page ${currentPage} of ${totalPages} • Total ${items.length} news`,
    },
  }[language] || {
    prev: 'Oldingi',
    next: 'Keyingi',
    showing: `Sahifa ${currentPage} / ${totalPages} • Jami ${items.length} ta yangilik`,
  };

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <main className="py-20 bg-[#FAFBFD] relative overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <SEO
        title={t.newsPage.title}
        description="Qo'qon shahar 2-son ixtisoslashtirilgan maktabi yangiliklari, e'lonlari va tadbirlari."
      />

      <div ref={topRef} className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 border-b border-gray-100 pb-8 text-left">
          <div className="space-y-2">
            <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              {t.nav.news}
            </div>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              {t.newsPage.title}
            </h1>
            <p className="text-sm text-gray-500 max-w-xl">
              {t.newsPage.subtitle}
            </p>
          </div>

          <a
            href="https://t.me/qoqon_shahar_2_son_IM"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 border border-[#2AABEE]/30 text-brand-navy px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 shadow-sm group"
          >
            <Send size={15} className="text-[#2AABEE] group-hover:scale-110 transition-transform duration-300" />
            <span>Telegram kanalimizga o'tish</span>
          </a>
        </div>

        {/* News Grid with page key for smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {paginatedItems.map((item) => (
              <motion.article
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100/80 flex flex-col h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
                variants={itemVariants}
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
                    <h2 className="text-lg font-bold text-brand-dark mb-3 line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h2>
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
                    <span>{t.newsPage.more}</span>
                    <ArrowUpRight
                      size={14}
                      className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="text-xs font-medium text-gray-400">
              {paginationLabels.showing}
            </div>

            <div className="inline-flex items-center gap-2 p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-brand-dark hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">{paginationLabels.prev}</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === '...') {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs font-semibold"
                      >
                        …
                      </span>
                    );
                  }

                  const num = Number(pageNum);
                  const isActive = num === currentPage;

                  return (
                    <button
                      key={`page-${num}`}
                      type="button"
                      onClick={() => handlePageChange(num)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                        isActive
                          ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20 scale-105'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-brand-dark hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">{paginationLabels.next}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default News;
