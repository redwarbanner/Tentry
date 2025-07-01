import type { SemanticPhrase } from '../types';
import { getStemmedWordsWithOriginals, STOP_WORDS } from './textAnalysis.ts';

export function extractSemanticCore(text: string): SemanticPhrase[] {
  const { stems, stemToOriginal } = getStemmedWordsWithOriginals(text);
  const total = stems.length;
  if (total === 0) return [];

  const frequency = new Map<string, number>();

  stems.forEach(stem => {
    if (!STOP_WORDS.has(stem)) {
      frequency.set(stem, (frequency.get(stem) || 0) + 1);
    }
  });

  return (
    Array.from(frequency.entries())
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, count]) => count > 1)
      .map(([stem, count]) => {
        const originals = stemToOriginal.get(stem) || [stem];
        return {
          phrase: originals.join(', '), // можно показывать все формы
          count,
          frequency: (count / total) * 100,
        };
      })
      .sort((a, b) => b.count - a.count)
  );
}
