export type TextAnalysisResult = {
  stats: {
    totalChars: number;
    totalWords: number;
    uniqueWords: number;
    stopWordCount: number;
    waterPercent: number;
    classicToshnota: number;
    academicToshnota: number;
  };
  semanticCore: string[];
  stopWords: string[];
};
