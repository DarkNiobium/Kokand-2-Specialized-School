import React, { useMemo, useState } from 'react';
import { Search, Phone } from 'lucide-react';
import { teachers as teachersData } from '../data/siteData';
import { useLanguage } from '../i18n';

const subjects = Array.from(new Set(teachersData.map(t => t.subject)));

const Teachers = () => {
  const { t } = useLanguage();
  const allSubjectKey = 'all';
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState<string>(allSubjectKey);

  const filtered = useMemo(() => {
    return teachersData.filter(t => {
      const matchesQuery =
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.role.toLowerCase().includes(query.toLowerCase()) ||
        t.subject.toLowerCase().includes(query.toLowerCase());
      const matchesSubject = subject === allSubjectKey ? true : t.subject === subject;
      return matchesQuery && matchesSubject;
    });
  }, [query, subject]);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.teachersPage.title}</h1>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.teachersPage.searchPlaceholder}
                className="pl-9 pr-3 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 w-full md:w-64"
              />
            </div>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 w-full md:w-48"
            >
              <option value={allSubjectKey}>{t.teachersPage.allSubjects}</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-blue-700 text-sm">{t.role}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{t.subject}</span>
              </div>
              <div className="mt-4 text-sm text-gray-700">
                <p className="flex items-center gap-2 break-words">
                  <Phone size={16} className="text-blue-700" /> {t.phone || '—'}
                </p>
                <p className="mt-1 text-gray-500 break-words">{t.education}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Teachers;
