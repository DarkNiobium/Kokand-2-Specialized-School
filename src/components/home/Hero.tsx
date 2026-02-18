import React from 'react';
import { ArrowRight, GraduationCap, Monitor, ShieldCheck } from 'lucide-react';
import entranceImage from '../../assets/school pictures/entrance.jpg';
import { useLanguage } from '../../i18n';

const Hero = () => {
  const { t } = useLanguage();
  const featureItems = [
    { icon: <GraduationCap size={18} />, title: t.hero.features[0].title, text: t.hero.features[0].text },
    { icon: <Monitor size={18} />, title: t.hero.features[1].title, text: t.hero.features[1].text },
    { icon: <ShieldCheck size={18} />, title: t.hero.features[2].title, text: t.hero.features[2].text }
  ];

  return (
    <div className="relative min-h-[460px] md:min-h-[600px] flex items-start justify-center overflow-hidden pt-8 md:pt-12 pb-10">
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
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-900 mb-4 leading-snug drop-shadow-sm max-w-3xl mx-auto break-words">
          {t.hero.titleTop}
          <br />
          {t.hero.titleBottom}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-sm sm:text-base break-words">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <LinkButton href="#about">
            {t.hero.primaryAction} <ArrowRight size={18} className="ml-2" />
          </LinkButton>
          <button className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
            {t.hero.secondaryAction}
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {featureItems.map((item, idx) => (
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
