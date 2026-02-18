import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/siteData';
import { useLanguage } from '../i18n';

const Contact = () => {
  const { language, t } = useLanguage();
  const mapLanguage = language === 'uz' ? 'uz' : language;
  const mapSrcBase = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6063.419558494379!2d70.94546050000001!3d40.548000599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38baefd1b280cff7%3A0x6d76140dc187f149!2zMi3RgdC_0LXRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdCw0Y8g0YjQutC-0LvQsA!5e0!3m2!1sru!2s!4v1770465602483!5m2!1sru!2s";
  const mapSrc = `${mapSrcBase.replace('!1sru!2s', `!1s${mapLanguage}!2s`)}&hl=${mapLanguage}`;

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.contact.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.contact.infoTitle}</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <p className="flex items-start gap-3 break-words">
                <MapPin size={18} className="text-blue-700 mt-0.5" />
                {t.contact.addressValue}
              </p>
              <p className="flex items-center gap-3 break-words">
                <Phone size={18} className="text-blue-700" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-3 break-words">
                <Mail size={18} className="text-blue-700" />
                {contactInfo.email}
              </p>
              <p className="flex items-center gap-3 break-words">
                <Mail size={18} className="text-blue-700" />
                {contactInfo.extraEmail}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.contact.importantTitle}</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {t.contact.faqItems.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-blue-700">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow border border-gray-100">
          <iframe
            src={mapSrc}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t.contact.mapTitle}
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default Contact;
