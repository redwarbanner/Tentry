import type {
  TextStats,
  SemanticPhrase,
  StopWord,
  TextAnalysisResult,
  ToxicityLevel,
} from '../types';

// Список стоп-слов
const STOP_WORDS = new Set([
  // Союзы
  'и',
  'а',
  'но',
  'или',
  'да',
  'либо',
  'то',
  'не то',
  'затем',
  'потом',
  'однако',
  'зато',
  'также',
  // Местоимения
  'я',
  'ты',
  'он',
  'она',
  'оно',
  'мы',
  'вы',
  'они',
  'мой',
  'твой',
  'его',
  'её',
  'наш',
  'ваш',
  'их',
  'себя',
  'тебя',
  'меня',
  'нас',
  'вас',
  'этот',
  'тот',
  'такой',
  'который',
  'какой',
  'чей',
  // Предлоги
  'в',
  'на',
  'с',
  'к',
  'по',
  'за',
  'от',
  'до',
  'для',
  'при',
  'через',
  'между',
  'над',
  'под',
  'перед',
  'после',
  'без',
  'против',
  'вместо',
  'кроме',
  'около',
  'возле',
  'среди',
  'вокруг',
  'вдоль',
  // Частицы
  'не',
  'ни',
  'же',
  'ли',
  'бы',
  'даже',
  'уже',
  'ещё',
  'только',
  'лишь',
  'хотя',
  'пусть',
  'пускай',
  // Междометия
  'ах',
  'ох',
  'эх',
  'ой',
  'ай',
  'увы',
  'браво',
  'спасибо',
  'пожалуйста',
  'извините',
  'простите',
  // Числительные
  'один',
  'два',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
  'десять',
  'первый',
  'второй',
  'третий',
  'последний',
  'много',
  'мало',
  'несколько',
  // Вводные слова
  'например',
  'допустим',
  'предположим',
  'честно говоря',
  'кстати',
  'между прочим',
  'во-первых',
  'во-вторых',
  'в-третьих',
  'наконец',
  'итак',
  'таким образом',
  'следовательно',
  // Отдельные буквы
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я',
  // Служебные слова
  'быть',
  'есть',
  'был',
  'была',
  'было',
  'были',
  'будет',
  'будут',
  'это',
  'то',
  'что',
  'как',
  'где',
  'когда',
  'почему',
  'зачем',
]);

export function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0400-\u04FF\s]/g, '') // Оставляем только кириллицу и пробелы
    .replace(/\s+/g, ' ')
    .trim();
}

export function splitIntoWords(text: string): string[] {
  const cleaned = cleanText(text);
  return cleaned ? cleaned.split(' ').filter(word => word.length > 0) : [];
}

export function calculateTextStats(text: string): TextStats {
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;

  const words = splitIntoWords(text);
  const wordCount = words.length;

  const uniqueWords = new Set(words);
  const uniqueWordCount = uniqueWords.size;

  const stopWords = words.filter(word => STOP_WORDS.has(word));
  const stopWordCount = stopWords.length;

  const significantWords = words.filter(word => !STOP_WORDS.has(word));
  const significantWordCount = significantWords.length;

  const waterPercentage = wordCount > 0 ? (stopWordCount / wordCount) * 100 : 0;

  // Классическая тошнота - корень из количества повторений самого частого слова
  const wordFrequency = new Map<string, number>();
  words.forEach(word => {
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  });

  const maxFrequency = Math.max(...Array.from(wordFrequency.values()));
  const classicToxicity = Math.sqrt(maxFrequency);

  // Академическая тошнота - (сумма повторений всех повторяющихся слов / общее количество символов) × 100%
  const repeatedWordsCount = Array.from(wordFrequency.values())
    .filter(count => count > 1)
    .reduce((sum, count) => sum + count, 0);

  const academicToxicity = characterCount > 0 ? (repeatedWordsCount / characterCount) * 100 : 0;

  return {
    characterCount,
    characterCountNoSpaces,
    wordCount,
    uniqueWordCount,
    significantWordCount,
    stopWordCount,
    waterPercentage,
    classicToxicity,
    academicToxicity,
  };
}

export function extractSemanticCore(text: string): SemanticPhrase[] {
  const words = splitIntoWords(text);
  const totalWords = words.length;

  if (totalWords === 0) return [];

  const phrases = new Map<string, number>();

  // Одиночные слова (исключаем стоп-слова)
  words.forEach(word => {
    if (!STOP_WORDS.has(word) && word.length > 2) {
      phrases.set(word, (phrases.get(word) || 0) + 1);
    }
  });

  // Биграммы
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    if (!STOP_WORDS.has(word1) || !STOP_WORDS.has(word2)) {
      const bigram = `${word1} ${word2}`;
      phrases.set(bigram, (phrases.get(bigram) || 0) + 1);
    }
  }

  // Триграммы
  for (let i = 0; i < words.length - 2; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    const word3 = words[i + 2];

    const trigram = `${word1} ${word2} ${word3}`;
    phrases.set(trigram, (phrases.get(trigram) || 0) + 1);
  }

  return Array.from(phrases.entries())
    .filter(([_, count]) => count > 1)
    .map(([phrase, count]) => ({
      phrase,
      count,
      frequency: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

export function extractStopWords(text: string): StopWord[] {
  const words = splitIntoWords(text);
  const totalWords = words.length;

  if (totalWords === 0) return [];

  const stopWordCounts = new Map<string, number>();

  words.forEach(word => {
    if (STOP_WORDS.has(word)) {
      stopWordCounts.set(word, (stopWordCounts.get(word) || 0) + 1);
    }
  });

  return Array.from(stopWordCounts.entries())
    .map(([word, count]) => ({
      word,
      count,
      frequency: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

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

export function getToxicityLevel(toxicity: number): ToxicityLevel {
  if (toxicity < 4) return 'low';
  if (toxicity <= 7) return 'medium';
  return 'high';
}

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

export function splitTextToPhrases(text: string, phraseLength: number = 8): string[] {
  const words = splitIntoWords(text);
  const phrases: string[] = [];

  for (let i = 0; i <= words.length - phraseLength; i++) {
    const phrase = words.slice(i, i + phraseLength).join(' ');
    phrases.push(phrase);
  }

  return phrases;
}
