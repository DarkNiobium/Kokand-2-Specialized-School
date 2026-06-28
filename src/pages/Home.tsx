import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutSection from '../components/home/AboutSection';
import NewsSection from '../components/home/NewsSection';
import TeachersSection from '../components/home/TeachersSection';
import ContactSection from '../components/home/ContactSection';
import SEO from '../components/SEO';
import { contactInfo } from '../data/siteData';
import { ArrowUpRight, Mail, Phone, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n';

const Home = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const phoneHref = useMemo(() => contactInfo.phone.replace(/[^\d+]/g, ''), []);
  const faqList = t.faq.items;

  return (
    <main>
      <SEO 
        title={t.nav.home}
        description="Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi Qo'qon shahar 2-son ixtisoslashtirilgan maktabining rasmiy veb-sayti. Sifatli ta'lim va zamonaviy infratuzilma."
        keywords="Qoqon 2-PIIMA, Qo'qon ixtisoslashtirilgan maktab, presidential schools uzbekistan, piima, maktab, ta'lim"
      />
      
      <Hero />
      <AboutSection />
      <Stats />
      
      <NewsSection />
      <TeachersSection />
      
      {/* FAQ Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-left space-y-2 mb-16">
            <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              {t.faq.title}
            </div>
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              {t.faq.title}
            </h2>
            <div className="w-12 h-1 bg-brand-gold rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* FAQ Accordion List */}
            <div className="lg:col-span-8 space-y-4">
              {faqList.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={item.question} 
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-[#FAFBFD] ${
                      isOpen ? "border-brand-gold/30 shadow-md bg-white" : "border-gray-100 shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-sm sm:text-base font-bold text-brand-dark hover:text-brand-gold transition-colors"
                    >
                      <span className="min-w-0 break-words">{item.question}</span>
                      <div className={`shrink-0 w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 transition-all ${isOpen ? "rotate-185 text-brand-gold border-brand-gold/20" : ""}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 break-words">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            
            {/* Sidebar Support Panel */}
            <div className="lg:col-span-4 rounded-3xl bg-[#FAFBFD] border border-gray-100/80 p-8 shadow-sm h-fit space-y-6 text-left relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-xl font-extrabold text-brand-dark leading-tight">{t.faq.supportTitle}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.faq.supportText}</p>
              
              <div className="flex flex-col gap-3 pt-2">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${phoneHref}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy hover:bg-brand-navy/95 px-5 py-3.5 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  <Phone size={14} />
                  {t.faq.call}
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${contactInfo.extraEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-brand-dark hover:bg-gray-50 hover:border-brand-gold/30 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Mail size={14} className="text-brand-gold" />
                  {t.faq.email}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default Home;
