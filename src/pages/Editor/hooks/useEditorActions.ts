import { useCallback } from 'react';
import type { TextFile } from '../types.ts';

export const useEditorActions = (
  savedTexts: TextFile[],
  setContent: (v: string) => void,
  setCurrentFileName: (v: string) => void,
  currentFileName: string,
  saveTexts: (v: TextFile[]) => void,
) => {
  const updateCurrentFile = useCallback(
    (id: string) => {
      setCurrentFileName(id);
      localStorage.setItem('tentry-editor-current-file', id);
    },
    [setCurrentFileName],
  );

  const clearCurrentFile = useCallback(() => {
    setCurrentFileName('');
    localStorage.removeItem('tentry-editor-current-file');
  }, [setCurrentFileName]);

  const handleSave = useCallback(
    (content: string, showModal: () => void) => {
      if (!currentFileName) {
        showModal();
        return;
      }

      const idx = savedTexts.findIndex(t => t.id === currentFileName);
      if (idx === -1) return;

      const updated = [...savedTexts];
      updated[idx] = { ...updated[idx], content, updatedAt: new Date() };
      saveTexts(updated);
    },
    [currentFileName, savedTexts, saveTexts],
  );

  const handleLoad = useCallback(
    (text: TextFile) => {
      setContent(text.content);
      updateCurrentFile(text.id);
    },
    [setContent, updateCurrentFile],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updated = savedTexts.filter(t => t.id !== id);
      saveTexts(updated);
      if (currentFileName === id) {
        clearCurrentFile();
      }
    },
    [currentFileName, savedTexts, saveTexts, clearCurrentFile],
  );

  const handleNewFile = useCallback(() => {
    setContent('');
    clearCurrentFile();
  }, [setContent, clearCurrentFile]);

  return {
    handleSave,
    handleLoad,
    handleDelete,
    handleNewFile,
    updateCurrentFile,
  };
};
