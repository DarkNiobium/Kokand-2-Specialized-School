import React, { useMemo, useState } from 'react';
import { Search, Phone, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { teachers as teachersData } from '../data/siteData';
import { useLanguage } from '../i18n';
import SEO from '../components/SEO';

const subjects = Array.from(new Set(teachersData.map(t => t.subject)));

const Teachers = () => {
  const { t } = useLanguage();
  const allSubjectKey = 'all';
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState<string>(allSubjectKey);

  const filtered = useMemo(() => {
    return teachersData.filter(item => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase()) ||
        item.subject.toLowerCase().includes(query.toLowerCase());
      const matchesSubject = subject === allSubjectKey ? true : item.subject === subject;
      return matchesQuery && matchesSubject;
    });
  }, [query, subject]);

  return (
    <main className="py-20 bg-[#FAFBFD] relative overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <SEO 
        title={t.teachersPage.title}
        description="Qo'qon shahar 2-son ixtisoslashtirilgan maktabi o'qituvchilari, ularning fanlari va malakalari ro'yxati."
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title and Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <div className="text-left space-y-2">
            <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              {t.nav.teachers}
            </div>
            <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              {t.teachersPage.title}
            </h1>
            <div className="w-12 h-1 bg-brand-gold rounded-full" />
          </div>

          {/* Search & Select Box */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.teachersPage.searchPlaceholder}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold w-full sm:w-72 text-sm transition-all shadow-sm"
              />
            </div>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold w-full sm:w-56 text-sm transition-all shadow-sm text-brand-dark font-medium cursor-pointer"
            >
              <option value={allSubjectKey}>{t.teachersPage.allSubjects}</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Teachers Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                key={item.name} 
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-premium border border-gray-100/80 flex flex-col justify-between h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-extrabold text-brand-dark group-hover:text-brand-gold transition-colors duration-300 leading-snug break-words">
                        {item.name}
                      </h2>
                      <p className="text-brand-navy font-semibold text-xs mt-1 leading-snug">
                        {item.role}
                      </p>
                    </div>
                    {/* Subject badge pill */}
                    <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 shadow-inner">
                      {item.subject}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gray-100" />

                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="text-brand-gold flex-shrink-0" />
                      {item.phone ? (
                        <a href={`tel:${item.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand-gold transition-colors font-medium">
                          {item.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <GraduationCap size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">
                        {item.education}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-gray-100/80 shadow-sm max-w-xl mx-auto space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-dark">Hech narsa topilmadi</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Qidiruv so‘rovingiz bo‘yicha hech qanday o‘qituvchi topilmadi. Iltimos, boshqa so‘zlarni kiritib ko‘ring.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Teachers;
