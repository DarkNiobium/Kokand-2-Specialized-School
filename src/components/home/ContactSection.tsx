import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { contactInfo } from '../../data/siteData';
import { useLanguage } from '../../i18n';

const ContactSection = () => {
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
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFBFD] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className="text-left space-y-2 mb-16">
          <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
            {t.contact.title}
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm text-gray-500 max-w-xl">
            {t.contact.subtitle}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Phone Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-gold/30 text-left space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contact.phone}</p>
                  <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="block text-xs font-bold text-brand-dark hover:text-brand-gold transition-colors break-words">
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-gold/30 text-left space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contact.email}</p>
                  <a href={`mailto:${contactInfo.extraEmail}`} className="block text-xs font-bold text-brand-dark hover:text-brand-gold transition-colors break-words">
                    {contactInfo.extraEmail}
                  </a>
                </div>
              </motion.div>

              {/* Address Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-100/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-gold/30 text-left space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20 shadow-inner group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contact.address}</p>
                  <p className="text-[10px] leading-relaxed font-bold text-brand-dark line-clamp-2">
                    {t.contact.addressValue}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Info Summary Panel */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-brand-dark mb-6 text-left">{t.contact.infoTitle}</h3>
              <div className="space-y-5 text-sm text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Address</p>
                    <p className="text-gray-600 leading-relaxed">{t.contact.addressValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Phone</p>
                    <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="text-gray-600 hover:text-brand-gold transition-colors">{contactInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Email</p>
                    <a href={`mailto:${contactInfo.extraEmail}`} className="text-gray-600 hover:text-brand-gold transition-colors">{contactInfo.extraEmail}</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Maps Column */}
          <motion.div 
            className="lg:col-span-6 h-[380px] lg:h-[420px] bg-white rounded-3xl overflow-hidden shadow-premium border-4 border-white relative"
            variants={itemVariants}
          >
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.contact.mapTitle}
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
