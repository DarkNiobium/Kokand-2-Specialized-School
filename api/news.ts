export const config = {
  runtime: 'edge',
};

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  telegramUrl: string;
}

export async function getTelegramNews(): Promise<NewsItem[]> {
  const channel = 'qoqon_shahar_2_son_IM';
  let curUrl = `https://t.me/s/${channel}`;
  let allHtml = '';

  for (let page = 0; page < 3; page++) {
    try {
      const res = await fetch(curUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      if (!res.ok) break;
      const html = await res.text();
      allHtml += '\n' + html;
      const m = html.match(/<link\s+rel="prev"\s+href="([^"]+)"/);
      if (!m) break;
      curUrl = 'https://t.me' + m[1];
    } catch {
      break;
    }
  }

  const blocks = allHtml.split(/class="tgme_widget_message_wrap/);
  const items: NewsItem[] = [];
  const seenIds = new Set<number>();

  for (const block of blocks) {
    const postMatch = block.match(/data-post="([^"]+\/(\d+))"/);
    if (!postMatch) continue;

    const fullPostId = postMatch[1];
    const numId = parseInt(postMatch[2], 10);
    if (seenIds.has(numId)) continue;
    seenIds.add(numId);

    const timeMatch = block.match(/<time\s+datetime="([^"]+)"/);
    const rawDate = timeMatch ? timeMatch[1] : new Date().toISOString();
    const date = rawDate.split('T')[0];

    // Image
    const imgMatch = block.match(/background-image:url\(\x27([^\x27]+)\x27\)/);
    const image = imgMatch ? imgMatch[1] : null;

    // Text
    let text = '';
    const m = block.match(
      /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="tgme_widget_message_reactions|<div class="tgme_widget_message_footer)/
    );
    if (m) {
      let raw = m[1];
      raw = raw.replace(/<i class="emoji"[^>]*><b>(.*?)<\/b><\/i>/gi, '$1');
      raw = raw.replace(/<br\s*\/?>/gi, '\n');
      raw = raw.replace(/<[^>]+>/g, '');
      raw = raw
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#33;/g, '!')
        .replace(/&#39;/g, "'");
      text = raw.trim();
    }

    if (!text && !image) continue;

    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    let title = '';
    const contentLines: string[] = [];

    for (const line of lines) {
      if (!title && !line.startsWith('#')) {
        title = line
          .replace(/^[📚⚜️📢🎉✨📌⚠️🔹🔸🏆🥇🥈🥉🎓⚡️🤝🇺🇿🇷🇺🇬🇧📖💡]\s*/u, '')
          .trim();
      } else if (title) {
        contentLines.push(line);
      }
    }

    if (!title && lines.length > 0) {
      title = lines[0];
      contentLines.push(...lines.slice(1));
    }
    if (!title) {
      title = "Qo'qon shahar 2-son ixtisoslashtirilgan maktabi yangiligi";
    }

    const excerpt =
      contentLines.join(' ').slice(0, 200).trim() +
      (contentLines.join(' ').length > 200 ? '...' : '');

    items.push({
      id: numId,
      title: title.slice(0, 140),
      date,
      excerpt: excerpt || title,
      image,
      telegramUrl: `https://t.me/${fullPostId}`,
    });
  }

  // Sort newest first
  items.sort((a, b) => b.id - a.id);

  // Deduplicate albums and identical repeated announcements
  const uniqueItems: NewsItem[] = [];
  const seenKeys = new Set<string>();
  for (const item of items) {
    const key = `${item.date}_${item.title}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export default async function handler(req: any, res?: any) {
  // Node.js serverless signature
  if (res && typeof res.status === 'function') {
    try {
      const data = await getTelegramNews();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
      return res.status(200).json({ success: true, count: data.length, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || 'Failed', data: [] });
    }
  }

  // Web Request / Response (Edge runtime)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const data = await getTelegramNews();
    return new Response(
      JSON.stringify({ success: true, count: data.length, data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Failed to fetch news',
        data: [],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
