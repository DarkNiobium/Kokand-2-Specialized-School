import React from 'react';
import { Users, BookOpen, Trophy } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../i18n';

const Stats = () => {
  const { t } = useLanguage();
  const stats = [
    {
      icon: <Users size={24} />,
      value: '400+',
      label: t.stats.students,
    },
    {
      icon: <BookOpen size={24} />,
      value: '45+',
      label: t.stats.teachers,
    },
    {
      icon: <Trophy size={24} />,
      value: '25+',
      label: t.stats.achievements,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <section className="py-6 bg-[#FAFBFD] relative z-20 -mt-16 sm:-mt-20">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div 
          className="relative overflow-hidden bg-brand-dark/95 text-white rounded-3xl shadow-premium p-8 lg:p-10 border border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[200px] h-[200px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-8 md:gap-4 relative z-10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-6 px-4 py-4 md:py-2 justify-center md:justify-start lg:pl-12 group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                {/* Icon wrapper with gold spotlight */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center transition-all duration-300 group-hover:bg-brand-gold group-hover:text-brand-dark shadow-inner">
                  <div className="group-hover:rotate-12 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight tabular-nums group-hover:text-brand-gold transition-colors duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
