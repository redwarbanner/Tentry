import type { TextStats } from '../types';
import { STOP_WORDS } from './textAnalysis.ts';
import { splitIntoWords } from './splitIntoWords.ts';

export function calculateTextStats(text: string): TextStats {
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;

  const words = splitIntoWords(text);
  const wordCount = words.length;

  const uniqueWords = new Set(words);
  const uniqueWordCount = uniqueWords.size;

  const stopWords = words.filter(word => STOP_WORDS.has(word));
  const stopWordCount = stopWords.length;

  const significantWords = words.filter(word => !STOP_WORDS.has(word));
  const significantWordCount = significantWords.length;

  const waterPercentage = wordCount > 0 ? (stopWordCount / wordCount) * 100 : 0;

  // Классическая тошнота - корень из количества повторений самого частого слова
  const wordFrequency = new Map<string, number>();
  words.forEach(word => {
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  });

  const maxFrequency = Math.max(...Array.from(wordFrequency.values()));
  const classicToxicity = Math.sqrt(maxFrequency);

  // Академическая тошнота - (сумма повторений всех повторяющихся слов / общее количество символов) × 100%
  const repeatedWordsCount = Array.from(wordFrequency.values())
    .filter(count => count > 1)
    .reduce((sum, count) => sum + count, 0);

  const academicToxicity = characterCount > 0 ? (repeatedWordsCount / characterCount) * 100 : 0;

  return {
    characterCount,
    characterCountNoSpaces,
    wordCount,
    uniqueWordCount,
    significantWordCount,
    stopWordCount,
    waterPercentage,
    classicToxicity,
    academicToxicity,
  };
}
