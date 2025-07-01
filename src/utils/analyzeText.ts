import type { TextAnalysisResult } from '../types';
import { calculateTextStats } from './calculateTextStats.ts';
import { extractSemanticCore } from './extractSemanticCore.ts';
import { extractStopWords } from './extractStopWords.ts';

export function analyzeText(text: string): TextAnalysisResult {
  const stats = calculateTextStats(text);
  const semanticCore = extractSemanticCore(text);
  const stopWords = extractStopWords(text);

  return {
    stats,
    semanticCore,
    stopWords,
  };
}
