import { cleanText } from './cleanText.ts';

export function splitIntoWords(text: string): string[] {
  const cleaned = cleanText(text);
  return cleaned ? cleaned.split(' ').filter(word => word.length > 0) : [];
}
