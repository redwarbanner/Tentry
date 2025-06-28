export function getWaterTagColor(waterPercentage: number): string {
  if (waterPercentage > 50) return 'red';
  if (waterPercentage > 30) return 'orange';
  return 'green';
}
