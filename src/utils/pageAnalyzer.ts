import type { PageAnalysis } from '../types';

export async function analyzePage(url: string): Promise<PageAnalysis> {
  try {
    // Проверяем URL
    new URL(url);
    
    // Для демонстрации используем простой подход с fetch
    // В реальном проекте потребуется прокси-сервер для обхода CORS
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Не удалось загрузить страницу');
    }
    
    const data = await response.json();
    const html = data.contents;
    
    // Создаем временный DOM элемент для парсинга
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Извлекаем title
    const titleElement = doc.querySelector('title');
    const title = titleElement ? titleElement.textContent?.trim() || '' : '';
    
    // Извлекаем description
    const descriptionElement = doc.querySelector('meta[name="description"]');
    const description = descriptionElement ? 
      descriptionElement.getAttribute('content')?.trim() || '' : '';
    
    // Извлекаем заголовки H1-H6
    const headings: { level: number; text: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      const headingElements = doc.querySelectorAll(`h${i}`);
      headingElements.forEach(element => {
        const text = element.textContent?.trim();
        if (text) {
          headings.push({
            level: i,
            text
          });
        }
      });
    }
    
    return {
      url,
      title,
      description,
      headings
    };
    
  } catch (error) {
    return {
      url,
      title: '',
      description: '',
      headings: [],
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
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
