import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../assets/school pictures/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/40">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white border border-white/60 shadow-sm flex items-center justify-center overflow-hidden">
              <img src={logoImage} alt="Agentlik logotipi" className="h-full w-full object-cover" />
            </div>
            <div className="text-sm leading-tight min-w-0">
              <p className="text-blue-900 font-semibold uppercase tracking-wide text-xs sm:text-sm break-words">Ixtisoslashtirilgan ta'lim muassasalari agentligi</p>
              <p className="text-gray-600 text-[11px] sm:text-xs break-words">Qo'qon shahar 2-son ixtisoslashtirilgan maktab</p>
            </div>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-6 text-sm">
            <div className="hidden md:flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2"><Phone size={14} /> +998 (55) 803 17 82</span>
              <span className="flex items-center gap-2"><Mail size={14} /> info@kokand2piima.uz</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button className="px-2 py-1 rounded bg-blue-600 text-white">UZ</button>
              <button className="px-2 py-1 rounded border border-gray-200 text-gray-600">EN</button>
              <button className="px-2 py-1 rounded border border-gray-200 text-gray-600">RU</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-2">
              {[
                { to: "/", label: "Bosh sahifa" },
                { to: "/leadership", label: "Ma'muriyat" },
                { to: "/teachers", label: "O'qituvchilar" },
                { to: "/news", label: "Yangiliklar" },
                { to: "/gallery", label: "Galereya" },
                { to: "/contact", label: "Aloqa" }
              ].map((item) => (
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
              <Link to="/" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Bosh sahifa</Link>
              <Link to="/leadership" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Rahbarlar</Link>
              <Link to="/teachers" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>O'qituvchilar</Link>
              <Link to="/news" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Yangiliklar</Link>
              <Link to="/gallery" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Galereya</Link>
              <Link to="/contact" className="block px-3 py-2 rounded text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Aloqa</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
