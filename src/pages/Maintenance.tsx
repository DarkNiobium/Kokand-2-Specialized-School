import React from 'react';
import { Phone, Send, Instagram, AlertTriangle } from 'lucide-react';
import logoImage from '../assets/school pictures/logo.jpg';

export const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFBFD] relative overflow-hidden px-4 selection:bg-brand-gold selection:text-brand-dark">
      {/* Ambient background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-navy/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Main Card */}
      <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10 transition-all duration-300">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <AlertTriangle size={12} />
          <span>Texnik ishlar</span>
        </div>

        {/* Logo and Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-20 w-20 rounded-full border-2 border-brand-gold/30 shadow-md overflow-hidden p-0.5 bg-white">
            <img src={logoImage} alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-brand-dark tracking-wider uppercase">
              Qo'qon shahar 2-son
            </h2>
            <p className="text-[11px] font-semibold text-brand-gold tracking-widest uppercase mt-0.5">
              Ixtisoslashtirilgan Maktab
            </p>
          </div>
        </div>

        {/* Main Status Text */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight leading-none">
            Sayt hozircha yopiq
          </h1>
          
          <div className="h-px w-16 bg-brand-gold/30 mx-auto my-4" />

          {/* Multilingual Descriptions */}
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p className="font-medium text-brand-dark">
              🇺🇿 Saytda profilaktika ishlari olib borilmoqda. Tez orada yangi ko'rinishda ishga tushamiz!
            </p>
            <p className="text-xs text-gray-500 italic">
              🇷🇺 На сайте ведутся профилактические работы. Скоро мы вернемся в новом облике!
            </p>
            <p className="text-[11px] text-gray-400">
              🇬🇧 The website is currently undergoing maintenance. We will launch a new version soon!
            </p>
          </div>
        </div>

        {/* Quick Contact & Socials */}
        <div className="bg-white/50 border border-gray-100 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Murojaat uchun / Для справок
          </p>

          <a 
            href="tel:+998905702802" 
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-brand-navy text-white hover:bg-brand-navy/95 transition-all duration-300 shadow-lg shadow-brand-navy/10 transform hover:-translate-y-0.5 text-sm font-semibold"
          >
            <Phone size={16} className="text-brand-gold" />
            <span>+998 (90) 570 28 02</span>
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-3 pt-2">
            <a 
              href="https://t.me/qoqon_shahar_2_son_IM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-50 hover:bg-brand-gold/10 border border-gray-100 p-3 rounded-xl text-gray-600 hover:text-brand-gold transition-all duration-300"
              title="Telegram"
            >
              <Send size={18} />
            </a>
            <a 
              href="https://www.instagram.com/qoqon_2im" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-50 hover:bg-brand-gold/10 border border-gray-100 p-3 rounded-xl text-gray-600 hover:text-brand-gold transition-all duration-300"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Qo'qon shahar 2-son ixtisoslashtirilgan maktabi.
        </p>

      </div>
    </div>
  );
};

export default Maintenance;
