import React from 'react';
import { ArrowRight, Sparkles, GraduationCap, Monitor, ShieldCheck } from 'lucide-react';
import entranceImage from '../../assets/school pictures/entrance.jpg';

const Hero = () => {
  return (
    <div className="relative h-[460px] md:h-[600px] flex items-start justify-center overflow-hidden pt-8 md:pt-12">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${entranceImage})`
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-blue-50/90"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_55%)]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-900 mb-4 leading-snug drop-shadow-sm max-w-3xl mx-auto">
          Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi
          <br />
          Qo'qon shahar 2-son ixtisoslashtirilgan maktab
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          Sifatli ta'lim va professional o'qituvchilar bilan bolalaringizning kelajagini yarating
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <LinkButton href="#about">
            Batafsil <ArrowRight size={18} className="ml-2" />
          </LinkButton>
          <button className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
            Portfolio yuklash
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: <GraduationCap size={18} />, title: "Kuchli akademik baza", text: "Maqsadli tayyorgarlik" },
            { icon: <Monitor size={18} />, title: "Raqamli sinflar", text: "Zamonaviy infratuzilma" },
            { icon: <ShieldCheck size={18} />, title: "Xavfsiz muhit", text: "Tartib va nazorat" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl bg-white/80 border border-blue-100 px-4 py-3 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-blue-700">{item.icon}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="px-6 py-3 rounded-md bg-blue-700 text-white font-medium hover:bg-blue-800 transition-colors inline-flex items-center"
  >
    {children}
  </a>
);
