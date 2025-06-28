import { useEffect, useState } from 'react';
import type { SavedText } from '../../../types';

export const useEditorStorage = () => {
  const [content, setContent] = useState('');
  const [savedTexts, setSavedTexts] = useState<SavedText[]>([]);
  const [currentFileName, setCurrentFileName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tentry-saved-texts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SavedText[];
        setSavedTexts(parsed);
      } catch (error) {
        console.error('Failed to load saved texts:', error);
      }
    }

    const currentContent = localStorage.getItem('tentry-editor-content');
    const currentFile = localStorage.getItem('tentry-editor-current-file');

    if (currentContent) setContent(currentContent);
    if (currentFile) setCurrentFileName(currentFile);
  }, []);

  useEffect(() => {
    localStorage.setItem('tentry-editor-content', content);
  }, [content]);

  const saveTexts = (texts: SavedText[]) => {
    setSavedTexts(texts);
    localStorage.setItem('tentry-saved-texts', JSON.stringify(texts));
  };

  return {
    content,
    setContent,
    savedTexts,
    saveTexts,
    currentFileName,
    setCurrentFileName,
  };
};
