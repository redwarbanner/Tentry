import { splitTextToPhrases } from './splitTextToPhrases.ts';

export function estimateCheckTime(textLength: number): number {
  const phrases = splitTextToPhrases('a '.repeat(textLength), 8);
  return phrases.length * 1.5; // 1.5 секунды на фразу в среднем
}
