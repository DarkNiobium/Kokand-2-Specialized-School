import React from 'react';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { leadership } from '../../data/siteData';
import { useLanguage } from '../../i18n';

const TeachersSection = () => {
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
    <section id="teachers" className="py-24 bg-[#FAFBFD] relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              {t.leadership.title}
            </div>
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
              {t.leadership.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl">
              {t.leadership.subtitle}
            </p>
          </div>
          <Link 
            to="/leadership" 
            className="group text-sm font-bold text-brand-navy hover:text-brand-gold inline-flex items-center gap-2 transition-colors duration-300 self-start sm:self-auto"
          >
            <span>{t.leadership.viewAll}</span> 
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
          {leadership.slice(0, 3).map((person, index) => (
            <motion.div 
              key={index} 
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-premium border border-gray-100/80 flex flex-col justify-between h-full transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              variants={cardVariants}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Squirclish Initials Badge */}
                  <div className="h-14 w-14 rounded-2xl bg-brand-gold/10 text-brand-gold font-extrabold text-lg flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                    {person.name.charAt(0)}
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-extrabold text-brand-dark truncate leading-tight group-hover:text-brand-gold transition-colors duration-300">
                      {person.name}
                    </h3>
                    <p className="text-brand-navy font-semibold text-xs mt-1 truncate">
                      {person.role}
                    </p>
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-gray-100" />
                
                {/* Contact phone detail */}
                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                  <Phone size={14} className="text-brand-gold" />
                  <a 
                    href={`tel:${person.phone.replace(/[^\d+]/g, '')}`} 
                    className="hover:text-brand-gold transition-colors font-medium"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link 
                  to="/leadership"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:border-brand-gold transition-all duration-300"
                  aria-label="View Leadership Info"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeachersSection;
