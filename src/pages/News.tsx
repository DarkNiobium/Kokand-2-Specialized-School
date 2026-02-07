import React from 'react';
import { Calendar } from 'lucide-react';
import { newsItems } from '../data/siteData';

const News = () => {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Yangiliklar</h1>
          <span className="text-sm text-gray-500">So'nggi e'lonlar</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map(item => (
            <article key={item.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-blue-700 gap-2">
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <h2 className="mt-3 font-semibold text-gray-900 leading-snug">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{item.excerpt}</p>
                <button className="mt-4 text-sm font-semibold text-blue-700">Batafsil</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default News;
