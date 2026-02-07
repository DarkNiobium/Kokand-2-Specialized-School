import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { contactInfo } from '../../data/siteData';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Aloqa</h2>
          <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-gray-600 mt-3">Savollar va hamkorlik uchun biz bilan bog'laning</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
                  <Phone size={16} />
                  Telefon
                </div>
                <div className="text-sm text-gray-700 mt-2">{contactInfo.phone}</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
                  <Mail size={16} />
                  Email
                </div>
                <div className="text-sm text-gray-700 mt-2">{contactInfo.extraEmail}</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 text-blue-700 text-sm font-semibold">
                  <MapPin size={16} />
                  Manzil
                </div>
                <div className="text-xs text-gray-700 mt-2">{contactInfo.address}</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aloqa ma'lumotlari</h3>
              <div className="space-y-4 text-sm">
                <p className="flex items-start gap-3 text-gray-700">
                  <MapPin size={18} className="text-blue-700 mt-0.5" />
                  {contactInfo.address}
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <Phone size={18} className="text-blue-700" />
                  {contactInfo.phone}
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <Mail size={18} className="text-blue-700" />
                  {contactInfo.extraEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="h-72 bg-gray-200 rounded-xl overflow-hidden shadow border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6063.419558494379!2d70.94546050000001!3d40.548000599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38baefd1b280cff7%3A0x6d76140dc187f149!2zMi3RgdC_0LXRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdCw0Y8g0YjQutC-0LvQsA!5e0!3m2!1sru!2s!4v1770465602483!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
