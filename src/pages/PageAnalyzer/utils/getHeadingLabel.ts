export const getHeadingLabel = (count: number): string => {
  if (count === 1) return 'заголовок';
  if (count < 5) return 'заголовка';
  return 'заголовков';
};
