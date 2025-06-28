export type PhraseResult = {
  phrase: string;
  isUnique: boolean;
  sources: string[];
};

export type UniquenessCheckResult = {
  overallUniqueness: number;
  results: PhraseResult[];
};
