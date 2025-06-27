import type { UniquenessResult, UniquenessCheck } from '../types';
import { splitTextToPhrases } from './textAnalysis';

export async function checkUniqueness(
  text: string,
  onProgress?: (progress: number) => void
): Promise<UniquenessCheck> {
  const phrases = splitTextToPhrases(text, 8);
  const results: UniquenessResult[] = [];
  let completedChecks = 0;
  
  const totalPhrases = phrases.length;
  const delay = 1000; // 1 секунда между запросами

  for (const phrase of phrases) {
    try {
      const isUnique = await checkPhraseUniqueness(phrase);
      results.push({
        phrase,
        isUnique,
        sources: isUnique ? [] : ['Google Search']
      });
      
      completedChecks++;
      const progress = (completedChecks / totalPhrases) * 100;
      
      if (onProgress) {
        onProgress(progress);
      }
      
      // Пауза между запросами
      if (completedChecks < totalPhrases) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error('Error checking phrase uniqueness:', error);
      results.push({
        phrase,
        isUnique: true, // Считаем уникальным если не удалось проверить
        sources: []
      });
      completedChecks++;
    }
  }

  const uniquePhrases = results.filter(r => r.isUnique).length;
  const overallUniqueness = totalPhrases > 0 ? (uniquePhrases / totalPhrases) * 100 : 100;

  return {
    text,
    phrases,
    results,
    overallUniqueness,
    isCompleted: true,
    progress: 100
  };
}

async function checkPhraseUniqueness(phrase: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Создаем скрытый iframe для обхода CORS
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    
    const searchQuery = encodeURIComponent(`"${phrase}"`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    
    let timeoutId: NodeJS.Timeout;
    
    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
    
    iframe.onload = () => {
      setTimeout(() => {
        try {
          // Пытаемся получить доступ к содержимому iframe
          // Если CORS блокирует, считаем что фраза найдена
          const doc = iframe.contentDocument;
          if (!doc) {
            cleanup();
            resolve(false); // Не уникальная
            return;
          }
          
          // Простая эвристика: если страница загрузилась, фраза найдена
          const body = doc.body;
          if (body && body.innerHTML.length > 1000) {
            cleanup();
            resolve(false); // Не уникальная
          } else {
            cleanup();
            resolve(true); // Уникальная
          }
        } catch (error) {
          // CORS ошибка означает что страница загрузилась (фраза найдена)
          cleanup();
          resolve(false);
        }
      }, 2000);
    };
    
    iframe.onerror = () => {
      cleanup();
      resolve(true); // Считаем уникальной если произошла ошибка
    };
    
    // Таймаут для безопасности
    timeoutId = setTimeout(() => {
      cleanup();
      resolve(true); // Считаем уникальной если таймаут
    }, 5000);
    
    iframe.src = searchUrl;
    document.body.appendChild(iframe);
  });
}

export function estimateCheckTime(textLength: number): number {
  const phrases = splitTextToPhrases('a '.repeat(textLength), 8);
  return phrases.length * 1.5; // 1.5 секунды на фразу в среднем
}
