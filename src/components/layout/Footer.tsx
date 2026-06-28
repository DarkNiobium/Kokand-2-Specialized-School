import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Send, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-deep text-white pt-16 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-gold/10 p-2 rounded-lg text-brand-gold border border-brand-gold/20 shadow-spotlight">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-wide">{t.footer.brand}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://t.me/qoqon_shahar_2_son_IM" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-gray-400 hover:text-brand-dark hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a 
                href="https://www.instagram.com/qoqon_2im" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-gray-400 hover:text-brand-dark hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-gray-400 hover:text-brand-dark hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-sm font-semibold tracking-wider text-brand-gold uppercase mb-6">{t.footer.linksTitle}</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.home}</Link></li>
              <li><Link to="/leadership" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.leadership}</Link></li>
              <li><Link to="/teachers" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.teachers}</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.news}</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.gallery}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-brand-gold uppercase mb-6">{t.footer.contactTitle}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="flex-shrink-0 text-brand-gold mt-0.5" size={18} />
                <span className="leading-relaxed">{t.contact.addressValue}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="flex-shrink-0 text-brand-gold" size={18} />
                <a href="tel:+998905702802" className="hover:text-white transition-colors">+998 (90) 570 28 02</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="flex-shrink-0 text-brand-gold" size={18} />
                <a href="mailto:info@qoqon2im.uz" className="hover:text-white transition-colors">info@qoqon2im.uz</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
