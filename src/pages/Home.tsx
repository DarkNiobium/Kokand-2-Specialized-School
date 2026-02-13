import React, { useMemo, useState } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutSection from '../components/home/AboutSection';
import NewsSection from '../components/home/NewsSection';
import TeachersSection from '../components/home/TeachersSection';
import ContactSection from '../components/home/ContactSection';
import { contactInfo } from '../data/siteData';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

const Home = () => {
  const [openIndex, setOpenIndex] = useState(1);
  const phoneHref = useMemo(() => contactInfo.phone.replace(/[^\d+]/g, ''), []);
  const faqList = [
    {
      question: "Maktabga qabul qilish jarayoni qanday amalga oshiriladi?",
      answer: "Qabul imtihon asosida amalga oshiriladi. Ro‘yxatga olish iyun oyida, imtihonlar esa iyul oyida o‘tkaziladi."
    },
    {
      question: "Maktabda qanday qo‘shimcha darslar mavjud?",
      answer: "Sport, musiqa, san’at, robototexnika, shaxmat va fan to‘garaklari mavjud. Barcha to‘garaklar bepul."
    },
    {
      question: "Maktab soatlari qanday?",
      answer: "Darslar dushanbadan jumagacha 8:30 dan 16:00 gacha bo‘lib o‘tadi."
    },
    {
      question: "Ota-onalar uchun uchrashuvlar qachon bo‘ladi?",
      answer: "Ota-onalar bilan uchrashuvlar reja asosida oyda bir marta va zaruratga ko‘ra o‘tkaziladi."
    },
    {
      question: "Maktabda ovqatlanish xizmati bormi?",
      answer: "Ha, o‘quvchilar uchun ovqatlanish xizmati yo‘lga qo‘yilgan."
    },
    {
      question: "Maktabda xavfsizlik choralari qanday?",
      answer: "Maktab hududi nazorat ostida, kirish-chiqish tizimi va videokuzatuv mavjud."
    },
    {
      question: "Transport xizmati mavjudmi?",
      answer: "Transport xizmati mavjudligi bo‘yicha ma’lumotlarni maktab ma’muriyatidan olish mumkin."
    },
    {
      question: "Maktabda internet va kompyuter darslari bormi?",
      answer: "Ha, informatika va IT yo‘nalishidagi darslar muntazam o‘tiladi."
    }
  ];
  return (
    <main>
      <Hero />
      <AboutSection />
      <Stats />
      
      <NewsSection />
      <TeachersSection />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Eng ko'p so'raladigan savollar</h2>
            <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {faqList.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.question} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="min-w-0 break-words">{item.question}</span>
                      <ArrowUpRight size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-90 text-blue-700" : "text-gray-400"}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 shadow-sm h-fit">
              <h3 className="text-lg font-semibold text-gray-900">Qo'shimcha yordam kerakmi?</h3>
              <p className="text-sm text-gray-600 mt-2">Agar savolingiz ro‘yxatda bo‘lmasa, biz bilan bog‘laning.</p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`tel:${phoneHref}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-3 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                >
                  <Phone size={16} />
                  Qo'ng'iroq qilish
                </a>
                <a
                  href={`mailto:${contactInfo.extraEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Mail size={16} />
                  Email yuborish
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </main>
  );
};

export default Home;
