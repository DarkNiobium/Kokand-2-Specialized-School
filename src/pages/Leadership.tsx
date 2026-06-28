import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { leadership } from '../data/siteData';
import { useLanguage } from '../i18n';
import SEO from '../components/SEO';

const Leadership = () => {
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
    <main className="py-20 bg-[#FAFBFD] relative overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <SEO 
        title={t.leadership.pageTitle}
        description="Qo'qon shahar 2-son ixtisoslashtirilgan maktabining boshqaruv jamoasi va rahbariyati haqida ma'lumot."
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title */}
        <div className="text-left space-y-2 mb-12">
          <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
            {t.nav.leadership}
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            {t.leadership.pageTitle}
          </h1>
          <div className="w-12 h-1 bg-brand-gold rounded-full" />
        </div>

        {/* Leadership Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {leadership.map((person, idx) => (
            <motion.div 
              key={idx} 
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-premium border border-gray-100/80 flex flex-col justify-between h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              variants={cardVariants}
            >
              <div className="space-y-5 text-left">
                <div className="flex items-center gap-4">
                  {/* Avatar squircle badge */}
                  <div className="h-14 w-14 rounded-2xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center text-lg font-extrabold shadow-inner group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:border-brand-gold/30 transition-all duration-300">
                    <User size={22} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-extrabold text-brand-dark group-hover:text-brand-gold transition-colors duration-300 truncate">
                      {person.name}
                    </h2>
                    <p className="text-brand-navy font-semibold text-xs mt-1 truncate">
                      {person.role}
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100" />

                {/* Details */}
                <div className="space-y-3 text-sm text-gray-500">
                  {person.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={15} className="text-brand-gold flex-shrink-0" /> 
                      <a href={`tel:${person.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand-gold transition-colors font-medium">
                        {person.phone}
                      </a>
                    </div>
                  )}
                  {person.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={15} className="text-brand-gold flex-shrink-0" /> 
                      <a href={`mailto:${person.email}`} className="hover:text-brand-gold transition-colors font-medium break-all">
                        {person.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Leadership;
