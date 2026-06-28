import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../../assets/school pictures/logo.jpg';
import { useLanguage } from '../../i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/leadership", label: t.nav.leadership },
    { to: "/teachers", label: t.nav.teachers },
    { to: "/news", label: t.nav.news },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact }
  ];

  const languageButtonClass = (value: typeof language) =>
    value === language
      ? "px-2 py-1 rounded bg-brand-gold text-brand-dark font-medium shadow-sm transition-all duration-300"
      : "px-2 py-1 rounded hover:bg-black/5 text-gray-500 transition-all duration-300";

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 w-full ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-premium py-2" 
          : "bg-white/95 border-b border-transparent py-4"
      }`}
    >
      {/* Top micro-bar for contacts (desktop only) */}
      <div className="hidden lg:block border-b border-gray-100 pb-2 mb-2 text-xs text-gray-500">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+998905702802" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={12} className="text-brand-gold" /> 
              <span>+998 (90) 570 28 02</span>
            </a>
            <a href="mailto:info@kokand2piima.uz" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Mail size={12} className="text-brand-gold" /> 
              <span>info@kokand2piima.uz</span>
            </a>
          </div>
          <div className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">
            {t.nav.school}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
        {/* Logo & Brand Info */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-full border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <img src={logoImage} alt={t.nav.agency} className="h-full w-full object-cover" />
          </div>
          <div className="text-left leading-tight min-w-0">
            <h1 className="text-brand-dark font-bold text-[10px] min-[380px]:text-xs sm:text-[13px] tracking-wide uppercase truncate max-w-[120px] min-[380px]:max-w-[180px] sm:max-w-[280px] md:max-w-md">
              {t.nav.agency}
            </h1>
            <p className="text-gray-500 text-[9px] min-[380px]:text-[10px] sm:text-[11px] truncate max-w-[120px] min-[380px]:max-w-[180px] sm:max-w-[280px] md:max-w-md">
              {t.nav.school}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 relative ${
                  isActive 
                    ? "text-brand-gold" 
                    : "text-brand-dark hover:text-brand-gold"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side actions (Languages & Mobile Menu Trigger) */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1 text-[11px] font-bold">
            <button className={languageButtonClass('uz')} onClick={() => setLanguage('uz')}>UZ</button>
            <button className={languageButtonClass('en')} onClick={() => setLanguage('en')}>EN</button>
            <button className={languageButtonClass('ru')} onClick={() => setLanguage('ru')}>RU</button>
          </div>

          {/* Contact Button (Desktop) */}
          <Link 
            to="/contact" 
            className="hidden sm:inline-flex items-center justify-center bg-brand-navy hover:bg-brand-gold hover:text-brand-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
          >
            {t.nav.contact}
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-50 border border-gray-100 text-brand-dark hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-premium lg:hidden z-40 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-base font-bold tracking-wide transition-colors ${
                        isActive ? "text-brand-gold" : "text-brand-dark hover:text-brand-gold"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 text-sm text-gray-500">
                <a href="tel:+998905702802" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <Phone size={14} className="text-brand-gold" />
                  <span>+998 (90) 570 28 02</span>
                </a>
                <a href="mailto:info@kokand2piima.uz" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <Mail size={14} className="text-brand-gold" />
                  <span>info@kokand2piima.uz</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
