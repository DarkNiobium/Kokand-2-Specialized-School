import React from 'react';
import { galleryImages } from '../data/siteData';

const Gallery = () => {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Galereya</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, idx) => (
            <div key={`${src}-${idx}`} className="rounded-xl overflow-hidden shadow border border-gray-100">
              <img src={src} alt="Galereya rasm" className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          ...
        </div>
      </div>
    </main>
  );
};

export default Gallery;
