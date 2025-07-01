export function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0400-\u04FF\s]/g, '') // Оставляем только кириллицу и пробелы
    .replace(/\s+/g, ' ')
    .trim();
}
