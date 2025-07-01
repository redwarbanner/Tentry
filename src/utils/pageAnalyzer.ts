import type { PageAnalysis } from '../types';

async function fetchWithProxy(url: string): Promise<string> {
  const encodedUrl = encodeURIComponent(url);

  // Прокси 1 — AllOrigins
  try {
    const firstResponse = await fetch(`https://api.allorigins.win/get?url=${encodedUrl}`);
    if (!firstResponse.ok) {
      throw new Error(`AllOrigins: ${String(firstResponse.status)}`);
    }
    const data = (await firstResponse.json()) as { contents: string };
    if (!data.contents) {
      throw new Error('AllOrigins вернул пустой ответ');
    }
    return data.contents;
  } catch (e) {
    console.warn('AllOrigins failed, trying fallback proxy:', e);
  }

  // Прокси 2 — CodeTabs
  try {
    const secondResponse = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodedUrl}`);
    if (!secondResponse.ok) {
      throw new Error(`AllOrigins: ${String(secondResponse.status)}`);
    }
    return await secondResponse.text();
  } catch (e) {
    console.error('CodeTabs also failed:', e);
    throw new Error('Не удалось загрузить страницу через оба прокси');
  }
}

export async function analyzePage(url: string): Promise<PageAnalysis> {
  try {
    new URL(url); // validate

    const html = await fetchWithProxy(url);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const titleElement = doc.querySelector('title');
    const title = titleElement?.textContent?.trim() || '';

    const descriptionElement = doc.querySelector('meta[name="description"]');
    const description = descriptionElement?.getAttribute('content')?.trim() || '';

    const headings: { level: number; text: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      const elements = doc.querySelectorAll(`h${String(i)}`);
      elements.forEach(el => {
        const text = el.textContent?.trim();
        if (text) {
          headings.push({ level: i, text });
        }
      });
    }

    return { url, title, description, headings };
  } catch (error) {
    return {
      url,
      title: '',
      description: '',
      headings: [],
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    };
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function formatUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}
