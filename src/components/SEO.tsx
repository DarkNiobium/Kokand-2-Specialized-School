import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../i18n';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "Qöqon 2-PIIMA, Qöqon ixtisoslaştirilgan maktab, presidential schools uzbekistan, piima, maktab, taʼlim, Kokand presidential school",
  ogType = 'website',
  ogImage = '/src/assets/school%20pictures/logo.jpg',
  canonicalUrl = 'https://kokand2piima.uz',
}) => {
  const { language } = useLanguage();

  const fullTitle = `${title} | Qöqon şahar 2-son ixtisoslaştirilgan maktab`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="noindex, nofollow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
