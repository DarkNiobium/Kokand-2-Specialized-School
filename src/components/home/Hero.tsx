import React from 'react';
import { ArrowRight, GraduationCap, Monitor, ShieldCheck } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import entranceImage from '../../assets/school pictures/entrance.jpg';
import { useLanguage } from '../../i18n';

const Hero = () => {
  const { t } = useLanguage();
  const featureItems = [
    { icon: <GraduationCap size={20} />, title: t.hero.features[0].title, text: t.hero.features[0].text },
    { icon: <Monitor size={20} />, title: t.hero.features[1].title, text: t.hero.features[1].text },
    { icon: <ShieldCheck size={20} />, title: t.hero.features[2].title, text: t.hero.features[2].text }
  ];

  // Framer motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[700px] flex items-center justify-center overflow-hidden py-20 lg:py-32">
      {/* Background wallpaper with zoom effect */}
      <motion.div 
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${entranceImage})`
        }}
      />
      
      {/* Deep overlay to blend wallpaper into background and keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/65 via-[#0A192F]/85 to-[#FAFBFD] z-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-20 text-center max-w-5xl">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold font-bold text-xs tracking-wider uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            Qoqon 2-PIIMA School
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-wrap balance text-white"
          >
            <span className="block mb-2">{t.hero.titleTop}</span>
            <span className="text-brand-gold">{t.hero.titleBottom}</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl text-wrap pretty"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-sm hover:bg-brand-gold/90 transition-all inline-flex items-center gap-2 shadow-premium"
            >
              {t.hero.primaryAction} 
              <ArrowRight size={16} />
            </motion.a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl border border-white/30 text-white bg-white/10 backdrop-blur-md font-semibold text-sm hover:bg-white/20 transition-all"
            >
              {t.hero.secondaryAction}
            </motion.button>
          </motion.div>

          {/* Premium translucent feature badges */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 w-full max-w-4xl"
          >
            {featureItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-glass backdrop-blur-md hover:bg-white/10 hover:border-brand-gold/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-extrabold text-white truncate leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-300 mt-1 truncate leading-none">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
