import React from 'react';
import { Users, BookOpen, Trophy } from 'lucide-react';

const stats = [
  {
    icon: <Users size={40} />,
    value: '400+',
    label: "O'quvchilar",
    color: 'text-blue-700'
  },
  {
    icon: <BookOpen size={40} />,
    value: '45+',
    label: "O'qituvchilar",
    color: 'text-blue-700'
  },
  {
    icon: <Trophy size={40} />,
    value: '25+',
    label: 'Yutuqlar',
    color: 'text-blue-700'
  }
];

const Stats = () => {
  return (
    <section className="py-10 bg-white relative -mt-12 z-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="absolute -top-16 -right-10 h-32 w-32 rounded-full bg-blue-100 blur-2xl opacity-70"></div>
          <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-blue-50 blur-2xl opacity-70"></div>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative z-10 flex flex-col items-center text-center rounded-xl border border-gray-100 bg-white/90 px-4 py-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-700">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
