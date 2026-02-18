import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { leadership } from '../data/siteData';
import { useLanguage } from '../i18n';

const Leadership = () => {
  const { t } = useLanguage();
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.leadership.pageTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((person, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <User size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{person.name}</p>
                  <p className="text-blue-700 text-sm">{person.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {person.phone && (
                  <p className="flex items-center gap-2 text-gray-700 break-words">
                    <Phone size={16} className="text-blue-700" /> {person.phone}
                  </p>
                )}
                {person.email && (
                  <p className="flex items-center gap-2 text-gray-700 break-words">
                    <Mail size={16} className="text-blue-700" /> {person.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Leadership;
