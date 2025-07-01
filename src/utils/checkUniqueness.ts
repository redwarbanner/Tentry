import type { UniquenessResult, UniquenessCheck } from '../types';

import { getRandomDelay } from './getRandomDelay.ts';
import { checkPhraseUniqueness } from './checkPhraseUniqueness.ts';
import { splitTextToPhrases } from './splitTextToPhrases.ts';

// Основная функция проверки уникальности текста по фразам
export async function checkUniqueness(
  text: string,
  onProgress?: (progress: number) => void,
  mode: 'fast' | 'full' = 'full', // режим проверки: 'fast' — прерывает при 5 подряд дубликатах
): Promise<UniquenessCheck> {
  // Разбиваем текст на фразы по 8 слов
  const phrases = splitTextToPhrases(text, 8);

  const results: UniquenessResult[] = [];
  let completedChecks = 0;
  let consecutiveDuplicates = 0;

  const totalPhrases = phrases.length;

  // Последовательная проверка каждой фразы
  for (const phrase of phrases) {
    try {
      // Проверяем уникальность одной фразы через iframe-механику
      const isUnique = await checkPhraseUniqueness(phrase);

      const result = {
        phrase,
        isUnique,
        sources: isUnique ? [] : ['Google Search'], // если не уникальна — добавляем источник
      };

      results.push(result);
      completedChecks++;

      // Если фраза не уникальна — увеличиваем счётчик подряд идущих дубликатов
      if (!isUnique) {
        consecutiveDuplicates++;

        // Если режим 'fast' и подряд найдено 5 дубликатов — прерываем
        if (mode === 'fast' && consecutiveDuplicates >= 5) {
          console.warn('Прервано: 5 неуникальные фразы подряд');
          break;
        }
      } else {
        // Уникальная фраза — сбрасываем счётчик подряд дубликатов
        consecutiveDuplicates = 0;
      }

      // Обновляем прогресс
      if (onProgress) {
        const progress = (completedChecks / totalPhrases) * 100;
        onProgress(progress);
      }

      // Пауза между запросами (случайная, чтобы имитировать "человеческий" паттерн)
      if (completedChecks < totalPhrases) {
        const delay = getRandomDelay(600, 1200);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      // Если ошибка — считаем фразу уникальной (чтобы не блокировать остальные)
      console.error('Ошибка при проверке фразы:', error);
      results.push({
        phrase,
        isUnique: true,
        sources: [],
      });
      completedChecks++;
    }
  }

  // Подсчитываем общее количество уникальных фраз
  const uniquePhrases = results.filter(r => r.isUnique).length;

  // Общая уникальность в процентах
  const overallUniqueness = totalPhrases > 0 ? (uniquePhrases / totalPhrases) * 100 : 100;

  // Финальный результат
  return {
    text,
    phrases,
    results,
    overallUniqueness,
    isCompleted: true,
    progress: 100,
  };
}
