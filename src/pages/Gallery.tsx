import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/siteData';
import { useLanguage } from '../i18n';
import SEO from '../components/SEO';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  return (
    <main className="py-20 bg-[#FAFBFD] relative overflow-hidden min-h-screen">
      {/* Background shape */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <SEO 
        title={t.gallery.title}
        description="Qo'qon shahar 2-son ixtisoslashtirilgan maktabining hayoti, tadbirlari va dars jarayonlaridan foto-galereya."
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Title */}
        <div className="text-left space-y-2 mb-12 border-b border-gray-100 pb-8">
          <div className="text-brand-gold font-bold text-xs uppercase tracking-widest">
            {t.nav.gallery}
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            {t.gallery.title}
          </h1>
          <div className="w-12 h-1 bg-brand-gold rounded-full" />
        </div>

        {/* Gallery Grid - Staggered heights for a premium aesthetic */}
        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((src, idx) => {
            // Apply varied heights to create a masonry-like grid
            const aspectClass = idx % 3 === 0 ? "aspect-[4/3]" : idx % 3 === 1 ? "aspect-[3/4]" : "aspect-[1/1]";
            return (
              <motion.div 
                key={`${src}-${idx}`} 
                variants={itemVariants}
                onClick={() => setSelectedImg(src)}
                className={`break-inside-avoid w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100/80 bg-white group relative cursor-zoom-in transition-all duration-500 hover:border-brand-gold/30 ${aspectClass}`}
              >
                <img 
                  src={src} 
                  alt={t.gallery.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
                
                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-md">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info footer */}
        <div className="mt-16 text-center text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {t.gallery.more}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Image display */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-premium"
              onClick={e => e.stopPropagation()} // Prevent close on image click
            >
              <img 
                src={selectedImg} 
                alt="Selected Gallery Item" 
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;
