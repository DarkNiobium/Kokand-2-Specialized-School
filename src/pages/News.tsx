import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [items, setItems] = useState<NewsItem[]>(() =>
    initialNewsItems.map((item) => ({
      ...item,
      image: item.image || entranceImg,
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedNews]);

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
    uz: { prev: 'Oldingi', next: 'Keyingi', close: 'Yopish' },
    ru: { prev: 'Назад', next: 'Вперёд', close: 'Закрыть' },
    en: { prev: 'Previous', next: 'Next', close: 'Close' },
  }[language] || { prev: 'Oldingi', next: 'Keyingi', close: 'Yopish' };

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
        description="Qöqon şahar 2-son ixtisoslaştirilgan maktabi yangiliklari, eʼlonlari va tadbirlari."
      />

      <div ref={topRef} className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title */}
        <div className="mb-12 border-b border-gray-100 pb-8 text-left">
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
        </div>

        {/* News Grid */}
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
                onClick={() => setSelectedNews(item)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100/80 flex flex-col h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1 cursor-pointer"
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
                    <div className="flex items-center text-xs font-semibold text-brand-gold mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-3 py-1 border border-brand-gold/20">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-brand-dark mb-3 line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNews(item);
                    }}
                    className="inline-flex items-center text-brand-navy hover:text-brand-gold font-bold text-xs uppercase tracking-wider gap-2 self-start transition-colors duration-300"
                  >
                    <span>{t.newsPage.more}</span>
                    <ArrowUpRight
                      size={14}
                      className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
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

      {/* On-Site News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-105"
                aria-label={paginationLabels.close}
              >
                <X size={20} />
              </button>

              {/* Image banner */}
              {selectedNews.image && (
                <div className="w-full h-64 sm:h-80 overflow-hidden relative bg-gray-100 flex-shrink-0">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== entranceImg) {
                        target.src = entranceImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/10 px-3 py-1 border border-brand-gold/20 text-xs font-semibold text-brand-gold">
                  <Calendar size={13} />
                  <span>{selectedNews.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark leading-snug">
                  {selectedNews.title}
                </h2>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 pt-2">
                  {selectedNews.fullText || selectedNews.excerpt}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default News;
