import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Send, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold">{t.footer.brand}</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm break-words">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Send size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">{t.footer.linksTitle}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/leadership" className="text-gray-400 hover:text-white transition-colors">{t.nav.leadership}</Link></li>
              <li><Link to="/teachers" className="text-gray-400 hover:text-white transition-colors">{t.nav.teachers}</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">{t.nav.news}</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">{t.nav.gallery}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">{t.footer.contactTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="flex-shrink-0 text-blue-500" size={20} />
                <span className="break-words">{t.contact.addressValue}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="flex-shrink-0 text-blue-500" size={20} />
                <span className="break-words">+998 (55) 803 17 82</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="flex-shrink-0 text-blue-500" size={20} />
                <span className="break-words">info@kokand2piima.uz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
