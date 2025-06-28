export const getHeadingColor = (level: number): string => {
  const colors = ['red', 'orange', 'gold', 'green', 'blue', 'purple'];
  return colors[level - 1] || 'default';
};
