import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsItems } from '../../data/siteData';

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">So'nggi yangiliklar</h2>
            <p className="text-sm text-gray-600 mt-2">Yangiliklar va e'lonlar bilan doimiy xabardor bo'ling</p>
          </div>
          <Link to="/news" className="text-sm font-semibold text-blue-700 inline-flex items-center gap-2">
            Barchasini ko'rish <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.slice(0, 3).map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow border border-gray-100 flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="h-52 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs font-semibold text-blue-700 mb-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm flex-1 break-words">
                  {item.excerpt}
                </p>
                <button className="inline-flex items-center text-blue-700 font-semibold mt-auto gap-2">
                  Batafsil <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
