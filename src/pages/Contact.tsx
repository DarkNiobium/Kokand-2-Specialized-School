import React from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { contactInfo } from '../data/siteData';
import { useLanguage } from '../i18n';
import SEO from '../components/SEO';

const Contact = () => {
  const { language, t } = useLanguage();
  const mapLanguage = language === 'uz' ? 'uz' : language;
  const mapSrcBase = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6063.419558494379!2d70.94546050000001!3d40.548000599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38baefd1b280cff7%3A0x6d76140dc187f149!2zMi3RgdC_0LXRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdCw0Y8g0YjQutC-0LvQsA!5e0!3m2!1sru!2s!4v1770465602483!5m2!1sru!2s";
  const mapSrc = `${mapSrcBase.replace('!1sru!2s', `!1s${mapLanguage}!2s`)}&hl=${mapLanguage}`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
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
        title={t.contact.title}
        description="Qo'qon shahar 2-son ixtisoslashtirilgan maktabi bilan bog'lanish ma'lumotlari: telefon, manzil, email va Google xarita."
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title */}
        <div className="text-left space-y-2 mb-12 border-b border-gray-100 pb-8">
          <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
            {t.nav.contact}
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            {t.contact.title}
          </h1>
          <div className="w-12 h-1 bg-brand-gold rounded-full" />
        </div>

        {/* Contact Info blocks */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Info Details Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 flex flex-col justify-between"
          >
            <h2 className="text-xl font-extrabold text-brand-dark mb-6 text-left border-b border-gray-50 pb-3">{t.contact.infoTitle}</h2>
            <div className="space-y-6 text-sm text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 leading-none">Address</p>
                  <p className="text-gray-600 leading-relaxed font-medium">{t.contact.addressValue}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 leading-none">Phone</p>
                  <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="text-gray-600 hover:text-brand-gold transition-colors font-semibold">{contactInfo.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 leading-none">Email Accounts</p>
                  <div className="flex flex-col gap-1.5 font-semibold">
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-brand-gold transition-colors">{contactInfo.email}</a>
                    <a href={`mailto:${contactInfo.extraEmail}`} className="text-gray-600 hover:text-brand-gold transition-colors">{contactInfo.extraEmail}</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Info / FAQs */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80"
          >
            <h2 className="text-xl font-extrabold text-brand-dark mb-6 text-left border-b border-gray-50 pb-3">{t.contact.importantTitle}</h2>
            <ul className="space-y-4 text-sm text-left">
              {t.contact.faqItems.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start group">
                  <div className="w-6 h-6 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare size={13} />
                  </div>
                  <span className="text-gray-600 leading-relaxed font-medium group-hover:text-brand-dark transition-colors duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Map card with gold spotlight border */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-premium border-4 border-white h-[400px] lg:h-[460px] relative"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t.contact.mapTitle}
          ></iframe>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
