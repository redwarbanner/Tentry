import stopwords from 'stopwords-ru';
import { RussianStemmer } from 'snowball-stemmer.jsx/dest/russian-stemmer.common.js';
import { cleanText } from './cleanText.ts';

const stemmer = new RussianStemmer();

export function getStemmedWordsWithOriginals(text: string): {
  stems: string[];
  stemToOriginal: Map<string, string[]>;
} {
  const cleaned = cleanText(text);

  const stemToOriginal = new Map<string, string[]>();
  const stems: string[] = [];

  cleaned
    .split(' ')
    .filter(word => word.length > 0)
    .forEach(word => {
      const stem = stemmer.stemWord(word);
      stems.push(stem);
      if (!stemToOriginal.has(stem)) {
        stemToOriginal.set(stem, [word]);
      } else if (!stemToOriginal.get(stem)?.includes(word)) {
        stemToOriginal.get(stem)?.push(word);
      }
    });

  return { stems, stemToOriginal };
}

export const STOP_WORDS = new Set<string>(stopwords as string[]);
