import React from 'react';
import { galleryImages } from '../../data/siteData';

const AboutSection = () => {
  const images = galleryImages.slice(0, 4);
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.08),_transparent_60%)]"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Maktab haqida</h2>
          <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-gray-700 leading-relaxed">
            Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi Qo'qon 2-ixtisoslashtirilgan maktab
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg">
                <img src={src} alt="Maktab" className="w-full h-40 md:h-44 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
