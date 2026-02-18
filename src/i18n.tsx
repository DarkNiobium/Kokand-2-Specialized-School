import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'uz' | 'en' | 'ru';

const translations = {
  uz: {
    languageLabel: 'UZ',
    nav: {
      agency: "Ixtisoslashtirilgan ta'lim muassasalari agentligi",
      school: "Qo'qon shahar 2-son ixtisoslashtirilgan maktab",
      home: "Bosh sahifa",
      leadership: "Ma'muriyat",
      teachers: "O'qituvchilar",
      news: "Yangiliklar",
      gallery: "Galereya",
      contact: "Aloqa"
    },
    hero: {
      titleTop: "Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi",
      titleBottom: "Qo'qon shahar 2-son ixtisoslashtirilgan maktab",
      subtitle: "Sifatli ta'lim va professional o'qituvchilar bilan bolalaringizning kelajagini yarating",
      primaryAction: "Batafsil",
      secondaryAction: "Portfolio yuklash",
      features: [
        { title: "Kuchli akademik baza", text: "Maqsadli tayyorgarlik" },
        { title: "Raqamli sinflar", text: "Zamonaviy infratuzilma" },
        { title: "Xavfsiz muhit", text: "Tartib va nazorat" }
      ]
    },
    about: {
      title: "Maktab haqida",
      text: "Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi Qo'qon 2-ixtisoslashtirilgan maktab",
      imageAlt: "Maktab"
    },
    stats: {
      students: "O'quvchilar",
      teachers: "O'qituvchilar",
      achievements: "Yutuqlar"
    },
    news: {
      title: "So'nggi yangiliklar",
      subtitle: "Yangiliklar va e'lonlar bilan doimiy xabardor bo'ling",
      viewAll: "Barchasini ko'rish",
      more: "Batafsil"
    },
    leadership: {
      title: "Rahbariyat",
      subtitle: "Maktab boshqaruv jamoasi bilan tanishing",
      viewAll: "Barchasi",
      pageTitle: "Rahbarlar"
    },
    faq: {
      title: "Eng ko'p so'raladigan savollar",
      supportTitle: "Qo'shimcha yordam kerakmi?",
      supportText: "Agar savolingiz ro‘yxatda bo‘lmasa, biz bilan bog‘laning.",
      call: "Qo'ng'iroq qilish",
      email: "Email yuborish",
      items: [
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
      ]
    },
    contact: {
      title: "Aloqa",
      subtitle: "Savollar va hamkorlik uchun biz bilan bog'laning",
      infoTitle: "Aloqa ma'lumotlari",
      importantTitle: "Muhim ma'lumotlar",
      phone: "Telefon",
      email: "Email",
      address: "Manzil",
      addressValue: "Oʻzbekiston Respublikasi, Fargʻona viloyati, Qoʻqon shahri",
      mapTitle: "Xarita",
      faqItems: [
        "Maktab davlat tasarrufida hisoblanadi. Maktabga oʻqish mutlaqo bepul.",
        "Aniq fanlar yoʻnalishiga 4-sinfni bitirib 5-sinfga oʻtayotgan oʻquvchilar imtihon asosida qabul qilinadi.",
        "Tabiiy fanlar yoʻnalishiga 6-sinf bitirib 7-sinfga oʻtayotgan oʻquvchilar imtihon asosida qabul qilinadi.",
        "Aniq fanlar yoʻnalishi uchun fanlar majmuasi: Matematika va Ingliz tili.",
        "Tabiiy fanlar yoʻnalishi uchun fanlar majmuasi: Biologiya va Ingliz tili.",
        "Imtihonlar har yili Iyul oyida oʻtkaziladi.",
        "Imtihonlarga roʻyxatga olish Iyun oyida boʻlib oʻtadi.",
        "Maktabda darslar Dushanbadan Jumagacha. Soat 8:30 dan 16:00 gacha boʻlib oʻtadi.",
        "Maktabda har xil fan toʻgaraklari tashkil etilgan. Fan toʻgaraklari ham mutlaqo bepul."
      ]
    },
    teachersPage: {
      title: "O'qituvchilar",
      searchPlaceholder: "Ism yoki fan",
      allSubjects: "Hammasi"
    },
    newsPage: {
      title: "Yangiliklar",
      subtitle: "So'nggi e'lonlar",
      more: "Batafsil"
    },
    gallery: {
      title: "Galereya",
      imageAlt: "Galereya rasm",
      more: "Yangi suratlar tez orada."
    },
    footer: {
      brand: "Qo'qon 2-IM",
      description: "Ixtisoslashtirilgan taʼlim muassasalari agentligi tizimidagi Qo'qon shahar 2-ixtisoslashtirilgan maktab. Sifatli ta'lim - porloq kelajak garovidir.",
      linksTitle: "Foydali havolalar",
      contactTitle: "Bog'lanish",
      rights: "Qo'qon 2-ixtisoslashtirilgan maktab. Barcha huquqlar himoyalangan."
    }
  },
  en: {
    languageLabel: 'EN',
    nav: {
      agency: "Specialized Educational Institutions Agency",
      school: "Kokand Specialized School No. 2",
      home: "Home",
      leadership: "Administration",
      teachers: "Teachers",
      news: "News",
      gallery: "Gallery",
      contact: "Contact"
    },
    hero: {
      titleTop: "Part of the Specialized Educational Institutions Agency system",
      titleBottom: "Kokand Specialized School No. 2",
      subtitle: "Build your children's future with quality education and professional teachers",
      primaryAction: "Learn more",
      secondaryAction: "Download brochure",
      features: [
        { title: "Strong academics", text: "Focused preparation" },
        { title: "Digital classrooms", text: "Modern infrastructure" },
        { title: "Safe environment", text: "Order and supervision" }
      ]
    },
    about: {
      title: "About the school",
      text: "Kokand Specialized School No. 2 within the Specialized Educational Institutions Agency system",
      imageAlt: "School"
    },
    stats: {
      students: "Students",
      teachers: "Teachers",
      achievements: "Achievements"
    },
    news: {
      title: "Latest news",
      subtitle: "Stay updated with news and announcements",
      viewAll: "View all",
      more: "Read more"
    },
    leadership: {
      title: "Leadership",
      subtitle: "Meet the school leadership team",
      viewAll: "View all",
      pageTitle: "Leadership"
    },
    faq: {
      title: "Frequently asked questions",
      supportTitle: "Need more help?",
      supportText: "If your question is not on the list, contact us.",
      call: "Call",
      email: "Send email",
      items: [
        {
          question: "How does the admission process work?",
          answer: "Admission is based on entrance exams. Registration is in June, and exams are held in July."
        },
        {
          question: "What extracurricular classes are available?",
          answer: "Sports, music, arts, robotics, chess, and science clubs are available. All clubs are free."
        },
        {
          question: "What are the school hours?",
          answer: "Classes run Monday to Friday from 8:30 to 16:00."
        },
        {
          question: "When are parent meetings held?",
          answer: "Parent meetings are held once a month according to schedule and additionally when needed."
        },
        {
          question: "Is there a school meal service?",
          answer: "Yes, a meal service is provided for students."
        },
        {
          question: "What safety measures are in place?",
          answer: "The school is supervised, with controlled entry and exit and video surveillance."
        },
        {
          question: "Is transportation available?",
          answer: "Information about transportation services can be obtained from the school administration."
        },
        {
          question: "Are there internet and computer classes?",
          answer: "Yes, IT and computer science classes are held regularly."
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch for questions and cooperation",
      infoTitle: "Contact details",
      importantTitle: "Important information",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressValue: "Republic of Uzbekistan, Fergana region, Kokand city",
      mapTitle: "Map",
      faqItems: [
        "The school is state-owned. Education is completely free.",
        "Admission to the exact sciences track for students moving from 4th to 5th grade is based on exams.",
        "Admission to the natural sciences track for students moving from 6th to 7th grade is based on exams.",
        "Required subjects for the exact sciences track: Mathematics and English.",
        "Required subjects for the natural sciences track: Biology and English.",
        "Exams are held every year in July.",
        "Registration for exams takes place in June.",
        "Classes are held Monday to Friday from 8:30 to 16:00.",
        "Various subject clubs are available. All clubs are free."
      ]
    },
    teachersPage: {
      title: "Teachers",
      searchPlaceholder: "Name or subject",
      allSubjects: "All"
    },
    newsPage: {
      title: "News",
      subtitle: "Latest announcements",
      more: "Read more"
    },
    gallery: {
      title: "Gallery",
      imageAlt: "Gallery photo",
      more: "More photos coming soon."
    },
    footer: {
      brand: "Kokand 2-IM",
      description: "Kokand Specialized School No. 2 within the Specialized Educational Institutions Agency system. Quality education is the key to a bright future.",
      linksTitle: "Useful links",
      contactTitle: "Contact",
      rights: "Kokand Specialized School No. 2. All rights reserved."
    }
  },
  ru: {
    languageLabel: 'RU',
    nav: {
      agency: "Агентство специализированных образовательных учреждений",
      school: "Кокандская специализированная школа №2",
      home: "Главная",
      leadership: "Администрация",
      teachers: "Учителя",
      news: "Новости",
      gallery: "Галерея",
      contact: "Контакты"
    },
    hero: {
      titleTop: "В системе Агентства специализированных образовательных учреждений",
      titleBottom: "Кокандская специализированная школа №2",
      subtitle: "Создайте будущее детей вместе с качественным образованием и профессиональными педагогами",
      primaryAction: "Подробнее",
      secondaryAction: "Скачать брошюру",
      features: [
        { title: "Сильная академическая база", text: "Целенаправленная подготовка" },
        { title: "Цифровые классы", text: "Современная инфраструктура" },
        { title: "Безопасная среда", text: "Порядок и контроль" }
      ]
    },
    about: {
      title: "О школе",
      text: "Кокандская специализированная школа №2 в системе Агентства специализированных образовательных учреждений",
      imageAlt: "Школа"
    },
    stats: {
      students: "Ученики",
      teachers: "Учителя",
      achievements: "Достижения"
    },
    news: {
      title: "Последние новости",
      subtitle: "Будьте в курсе новостей и объявлений",
      viewAll: "Смотреть все",
      more: "Подробнее"
    },
    leadership: {
      title: "Руководство",
      subtitle: "Познакомьтесь с руководящей командой школы",
      viewAll: "Смотреть все",
      pageTitle: "Руководство"
    },
    faq: {
      title: "Часто задаваемые вопросы",
      supportTitle: "Нужна дополнительная помощь?",
      supportText: "Если вашего вопроса нет в списке, свяжитесь с нами.",
      call: "Позвонить",
      email: "Отправить email",
      items: [
        {
          question: "Как проходит процесс поступления?",
          answer: "Поступление осуществляется на основе вступительных экзаменов. Регистрация в июне, экзамены проходят в июле."
        },
        {
          question: "Какие дополнительные занятия есть в школе?",
          answer: "Есть спортивные, музыкальные, художественные, робототехнические, шахматные и научные кружки. Все кружки бесплатны."
        },
        {
          question: "Какой график занятий?",
          answer: "Занятия проходят с понедельника по пятницу с 8:30 до 16:00."
        },
        {
          question: "Когда проходят встречи с родителями?",
          answer: "Встречи с родителями проводятся по плану раз в месяц и дополнительно по необходимости."
        },
        {
          question: "Есть ли питание в школе?",
          answer: "Да, для учеников организовано питание."
        },
        {
          question: "Какие меры безопасности предусмотрены?",
          answer: "Территория школы под контролем, действует пропускная система и видеонаблюдение."
        },
        {
          question: "Есть ли транспорт?",
          answer: "Информацию о наличии транспорта можно получить у администрации школы."
        },
        {
          question: "Есть ли интернет и уроки информатики?",
          answer: "Да, уроки информатики и IT проходят регулярно."
        }
      ]
    },
    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами по вопросам и сотрудничеству",
      infoTitle: "Контактная информация",
      importantTitle: "Важная информация",
      phone: "Телефон",
      email: "Email",
      address: "Адрес",
      addressValue: "Республика Узбекистан, Ферганская область, город Коканд",
      mapTitle: "Карта",
      faqItems: [
        "Школа находится в государственной собственности. Обучение полностью бесплатное.",
        "Поступление на направление точных наук для учащихся, переходящих из 4 в 5 класс, осуществляется на основе экзаменов.",
        "Поступление на направление естественных наук для учащихся, переходящих из 6 в 7 класс, осуществляется на основе экзаменов.",
        "Предметы для направления точных наук: математика и английский язык.",
        "Предметы для направления естественных наук: биология и английский язык.",
        "Экзамены проводятся ежегодно в июле.",
        "Регистрация на экзамены проходит в июне.",
        "Занятия проходят с понедельника по пятницу с 8:30 до 16:00.",
        "В школе организованы различные предметные кружки. Все кружки бесплатны."
      ]
    },
    teachersPage: {
      title: "Учителя",
      searchPlaceholder: "Имя или предмет",
      allSubjects: "Все"
    },
    newsPage: {
      title: "Новости",
      subtitle: "Последние объявления",
      more: "Подробнее"
    },
    gallery: {
      title: "Галерея",
      imageAlt: "Фото галереи",
      more: "Новые фотографии скоро."
    },
    footer: {
      brand: "Коканд 2-ИМ",
      description: "Кокандская специализированная школа №2 в системе Агентства специализированных образовательных учреждений. Качественное образование — залог светлого будущего.",
      linksTitle: "Полезные ссылки",
      contactTitle: "Связаться",
      rights: "Кокандская специализированная школа №2. Все права защищены."
    }
  }
} as const;

type Translations = (typeof translations)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const languageOptions: Language[] = ['uz', 'en', 'ru'];

const resolveInitialLanguage = (): Language => {
  const stored = localStorage.getItem('language') as Language | null;
  if (stored && languageOptions.includes(stored)) {
    return stored;
  }
  const browser = navigator.language.toLowerCase();
  if (browser.includes('ru')) {
    return 'ru';
  }
  if (browser.includes('en')) {
    return 'en';
  }
  return 'uz';
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
