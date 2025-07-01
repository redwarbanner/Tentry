import type { ToxicityLevel } from '../types';

export function getToxicityLevel(toxicity: number): ToxicityLevel {
  if (toxicity < 4) return 'low';
  if (toxicity <= 7) return 'medium';
  return 'high';
}
