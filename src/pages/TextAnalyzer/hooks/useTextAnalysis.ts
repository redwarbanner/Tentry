import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../../../hooks/useDebounce.ts';
import { analyzeText } from '../../../utils';
import type { TextAnalysisResult } from '../../../types';

interface UseTextAnalysisOptions {
  setAnalysisResult: (result: TextAnalysisResult | null) => void;
  setCurrentText: (text: string) => void;
}

export const useTextAnalysis = ({ setAnalysisResult, setCurrentText }: UseTextAnalysisOptions) => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  // анализ при изменении текста
  useEffect(() => {
    if (debouncedText.trim()) {
      const result = analyzeText(debouncedText);
      setAnalysisResult(result);
      setCurrentText(debouncedText);

      localStorage.setItem('tentry-current-text', debouncedText);
      localStorage.setItem('tentry-analysis-result', JSON.stringify(result));
    } else {
      setAnalysisResult(null);
    }
  }, [debouncedText, setAnalysisResult, setCurrentText]);

  useEffect(() => {
    const savedText = localStorage.getItem('tentry-current-text');
    const savedResult = localStorage.getItem('tentry-analysis-result');

    if (savedText) {
      setText(savedText);
    }

    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult) as TextAnalysisResult;
        setAnalysisResult(parsed);
      } catch (err) {
        console.error('Ошибка разбора savedResult:', err);
      }
    }
  }, [setAnalysisResult]);

  const handleClear = useCallback(() => {
    setText('');
    setAnalysisResult(null);
    setCurrentText('');
    localStorage.removeItem('tentry-current-text');
    localStorage.removeItem('tentry-analysis-result');
  }, [setAnalysisResult, setCurrentText]);

  return {
    text,
    setText,
    handleClear,
  };
};
