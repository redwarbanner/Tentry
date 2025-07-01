import { getToxicityLevel } from './getToxicityLevel.ts';

export function getToxicityColor(toxicity: number): string {
  const level = getToxicityLevel(toxicity);
  switch (level) {
    case 'low':
      return '#52c41a'; // green
    case 'medium':
      return '#fa8c16'; // orange
    case 'high':
      return '#f5222d'; // red
  }
}
