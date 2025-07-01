import { splitIntoWords } from './splitIntoWords.ts';

export function splitTextToPhrases(text: string, phraseLength: number = 8): string[] {
  const words = splitIntoWords(text);
  const phrases: string[] = [];

  for (let i = 0; i <= words.length - phraseLength; i++) {
    const phrase = words.slice(i, i + phraseLength).join(' ');
    phrases.push(phrase);
  }

  return phrases;
}
