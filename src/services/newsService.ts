import entranceImg from '../assets/school pictures/entrance.jpg';
import { newsItems as fallbackNewsItems } from '../data/siteData';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  telegramUrl?: string;
}

let cachedNews: NewsItem[] | null = null;

export async function fetchSchoolNews(): Promise<NewsItem[]> {
  if (cachedNews && cachedNews.length > 0) {
    return cachedNews;
  }

  try {
    const res = await fetch('/api/news');
    if (!res.ok) {
      throw new Error(`News API responded with status ${res.status}`);
    }
    const json = await res.json();
    if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
      const liveItems: NewsItem[] = json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        excerpt: item.excerpt,
        image: item.image || entranceImg,
        telegramUrl: item.telegramUrl,
      }));
      cachedNews = liveItems;
      return liveItems;
    }
  } catch (error) {
    console.warn('Failed to fetch telegram news, using fallback:', error);
  }

  // Graceful fallback to static data
  return fallbackNewsItems.map((item) => ({
    ...item,
    image: item.image || entranceImg,
    telegramUrl: 'https://t.me/qoqon_shahar_2_son_IM',
  }));
}
