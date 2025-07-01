import type { StopWord } from '../types';
import { STOP_WORDS } from './textAnalysis.ts';
import { splitIntoWords } from './splitIntoWords.ts';

export function extractStopWords(text: string): StopWord[] {
  const words = splitIntoWords(text);
  const totalWords = words.length;

  if (totalWords === 0) return [];

  const stopWordCounts = new Map<string, number>();

  words.forEach(word => {
    if (STOP_WORDS.has(word)) {
      stopWordCounts.set(word, (stopWordCounts.get(word) || 0) + 1);
    }
  });

  return Array.from(stopWordCounts.entries())
    .map(([word, count]) => ({
      word,
      count,
      frequency: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}
