import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../assets/school pictures/logo.jpg';
import { useLanguage } from '../../i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
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
      ? "px-2 py-1 rounded bg-blue-600 text-white"
      : "px-2 py-1 rounded border border-gray-200 text-gray-600";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/40">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white border border-white/60 shadow-sm flex items-center justify-center overflow-hidden">
              <img src={logoImage} alt={t.nav.agency} className="h-full w-full object-cover" />
            </div>
            <div className="text-sm leading-tight min-w-0">
              <p className="text-blue-900 font-semibold uppercase tracking-wide text-xs sm:text-sm break-words">{t.nav.agency}</p>
              <p className="text-gray-600 text-[11px] sm:text-xs break-words">{t.nav.school}</p>
            </div>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-6 text-sm">
            <div className="hidden md:flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2"><Phone size={14} /> +998 (55) 803 17 82</span>
              <span className="flex items-center gap-2"><Mail size={14} /> info@kokand2piima.uz</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button className={languageButtonClass('uz')} onClick={() => setLanguage('uz')}>UZ</button>
              <button className={languageButtonClass('en')} onClick={() => setLanguage('en')}>EN</button>
              <button className={languageButtonClass('ru')} onClick={() => setLanguage('ru')}>RU</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-white text-blue-900" : "text-white/90 hover:bg-white/10"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="md:hidden text-white font-semibold text-sm break-words">kokand2piima.uz</div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-blue-200"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-blue-900 border-t border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 rounded text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
