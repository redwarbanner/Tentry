export interface TextStats {
  characterCount: number;
  characterCountNoSpaces: number;
  wordCount: number;
  uniqueWordCount: number;
  significantWordCount: number;
  stopWordCount: number;
  waterPercentage: number;
  classicToxicity: number;
  academicToxicity: number;
}

export interface SemanticPhrase {
  phrase: string;
  count: number;
  frequency: number;
}

export interface StopWord {
  word: string;
  count: number;
  frequency: number;
}

export interface UniquenessResult {
  phrase: string;
  isUnique: boolean;
  sources?: string[];
}

export interface UniquenessCheck {
  text: string;
  phrases: string[];
  results: UniquenessResult[];
  overallUniqueness: number;
  isCompleted: boolean;
  progress: number;
}

export interface PageAnalysis {
  url: string;
  title: string;
  description: string;
  headings: {
    level: number;
    text: string;
  }[];
  error?: string;
}

export interface Theme {
  isDark: boolean;
}

export interface TextAnalysisResult {
  stats: TextStats;
  semanticCore: SemanticPhrase[];
  stopWords: StopWord[];
}

export type ToxicityLevel = 'low' | 'medium' | 'high';

export interface AppState {
  currentText: string;
  analysisResult: TextAnalysisResult | null;
  uniquenessCheck: UniquenessCheck | null;
  pageAnalysis: PageAnalysis | null;
  theme: Theme;
  savedTexts: SavedText[];
}

export interface SavedText {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
