export function getToxicityColor(toxicity: number): string {
  if (toxicity > 10) return 'red';
  if (toxicity > 5) return 'orange';
  return 'green';
}
