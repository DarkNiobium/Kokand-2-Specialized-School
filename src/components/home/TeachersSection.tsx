import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { leadership } from '../../data/siteData';

const TeachersSection = () => {
  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Rahbariyat</h2>
            <p className="text-sm text-gray-600 mt-2">Maktab boshqaruv jamoasi bilan tanishing</p>
          </div>
          <a href="/leadership" className="text-sm font-semibold text-blue-700 inline-flex items-center gap-2">Barchasi <ArrowUpRight size={16} /></a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.slice(0, 3).map((person, index) => (
            <div key={index} className="bg-white rounded-2xl shadow border border-gray-100 p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-lg font-semibold">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{person.name}</p>
                  <p className="text-blue-700 text-sm mt-1">{person.role}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                {person.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
