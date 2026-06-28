import { motion, Variants } from 'framer-motion';
import { galleryImages } from '../../data/siteData';
import { useLanguage } from '../../i18n';

const AboutSection = () => {
  const { t } = useLanguage();
  const images = galleryImages.slice(0, 4);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section id="about" className="py-24 bg-[#FAFBFD] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Text Content Column (Left) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
              <span>{t.nav.home}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span>{t.about.title}</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight"
            >
              {t.about.title}
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="w-12 h-1 bg-brand-gold rounded-full"
            />
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 text-base sm:text-lg leading-relaxed text-wrap pretty"
            >
              {t.about.text}
            </motion.p>
          </div>

          {/* Asymmetric Image Collage Column (Right) */}
          <motion.div 
            className="lg:col-span-6 grid grid-cols-12 gap-4 relative"
            variants={itemVariants}
          >
            {/* Top Left Image */}
            <div className="col-span-6 pt-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-premium border border-gray-100 bg-white group aspect-[4/3] relative"
              >
                <img 
                  src={images[0]} 
                  alt={t.about.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
              </motion.div>
            </div>
            
            {/* Top Right Image (Tall offset) */}
            <div className="col-span-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-premium border border-gray-100 bg-white group aspect-[4/5] relative"
              >
                <img 
                  src={images[1]} 
                  alt={t.about.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            </div>
            
            {/* Bottom Left Image (Tall offset) */}
            <div className="col-span-6 -mt-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-premium border border-gray-100 bg-white group aspect-[4/5] relative"
              >
                <img 
                  src={images[2]} 
                  alt={t.about.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Bottom Right Image */}
            <div className="col-span-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-premium border border-gray-100 bg-white group aspect-[4/3] relative"
              >
                <img 
                  src={images[3]} 
                  alt={t.about.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
