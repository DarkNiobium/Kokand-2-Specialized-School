import React, { useMemo, useState } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutSection from '../components/home/AboutSection';
import NewsSection from '../components/home/NewsSection';
import TeachersSection from '../components/home/TeachersSection';
import ContactSection from '../components/home/ContactSection';
import { contactInfo } from '../data/siteData';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../i18n';

const Home = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(1);
  const phoneHref = useMemo(() => contactInfo.phone.replace(/[^\d+]/g, ''), []);
  const faqList = t.faq.items;
  return (
    <main>
      <Hero />
      <AboutSection />
      <Stats />
      
      <NewsSection />
      <TeachersSection />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.faq.title}</h2>
            <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {faqList.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.question} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="min-w-0 break-words">{item.question}</span>
                      <ArrowUpRight size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-90 text-blue-700" : "text-gray-400"}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 shadow-sm h-fit">
              <h3 className="text-lg font-semibold text-gray-900">{t.faq.supportTitle}</h3>
              <p className="text-sm text-gray-600 mt-2">{t.faq.supportText}</p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`tel:${phoneHref}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-3 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                >
                  <Phone size={16} />
                  {t.faq.call}
                </a>
                <a
                  href={`mailto:${contactInfo.extraEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Mail size={16} />
                  {t.faq.email}
                </a>
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
