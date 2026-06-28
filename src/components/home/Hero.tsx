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

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-[550px] lg:min-h-[640px] flex items-center overflow-hidden py-12 lg:py-20 bg-white">
      {/* Decorative background shapes */}
      <div className="absolute top-10 right-0 w-[40%] h-[80%] bg-[#EEF4F8] rounded-l-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content Column (Left) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-navy font-semibold text-xs tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Qoqon 2-PIIMA School
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight leading-[1.1] text-wrap balance"
            >
              <span className="text-brand-navy block mb-2">{t.hero.titleTop}</span>
              <span className="text-brand-gold">{t.hero.titleBottom}</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl text-wrap pretty"
            >
              {t.hero.subtitle}
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#about"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy/95 transition-all inline-flex items-center gap-2 shadow-premium"
              >
                {t.hero.primaryAction} 
                <ArrowRight size={16} />
              </motion.a>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg border border-gray-200 text-gray-700 bg-white/50 backdrop-blur-sm font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                {t.hero.secondaryAction}
              </motion.button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100"
            >
              {featureItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-brand-gold/30"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#FAFBFD] border border-gray-100 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-brand-dark truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-500 truncate">{item.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portrait Image Frame Column (Right) */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            {/* Ambient glows and decorative frame borders */}
            <div className="absolute -inset-4 border border-brand-gold/10 rounded-2xl -z-10" />
            <div className="absolute inset-2 border-2 border-brand-gold/30 rounded-2xl -z-10" />
            
            {/* Visual image mask frame */}
            <motion.div 
              variants={imageVariants}
              className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-premium border-4 border-white"
            >
              <img 
                src={entranceImage} 
                alt="School Entrance" 
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Soft overlay on the image corner */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Float Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-xl p-4 shadow-premium flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-brand-dark leading-none">PIIMA</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{t.footer.brand}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
