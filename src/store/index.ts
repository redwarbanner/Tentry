import { create } from 'zustand';
import type {
  AppState,
  TextAnalysisResult,
  UniquenessCheck,
  PageAnalysis,
  SavedText,
} from '../types';
import { storage } from './utils/storage.ts';

interface Theme {
  isDark: boolean;
}

interface StoreActions {
  setCurrentText: (text: string) => void;
  setAnalysisResult: (result: TextAnalysisResult | null) => void;
  setUniquenessCheck: (check: UniquenessCheck | null) => void;
  setPageAnalysis: (analysis: PageAnalysis | null) => void;
  toggleTheme: () => void;
  addSavedText: (savedText: SavedText) => void;
  updateSavedText: (updatedText: SavedText) => void;
  deleteSavedText: (id: string) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = storage.getTheme();
    return saved ?? { isDark: false };
  }
  return { isDark: false };
};

export const useStore = create<AppState & StoreActions>((set, get) => ({
  currentText: '',
  analysisResult: null,
  uniquenessCheck: null,
  pageAnalysis: null,
  theme: getInitialTheme(),
  savedTexts: [],

  setCurrentText: text => {
    set({ currentText: text });
  },

  setAnalysisResult: result => {
    set({ analysisResult: result });
  },

  setUniquenessCheck: check => {
    set({ uniquenessCheck: check });
  },

  setPageAnalysis: analysis => {
    set({ pageAnalysis: analysis });
  },

  toggleTheme: () => {
    const newTheme = { isDark: !get().theme.isDark };
    storage.setTheme(newTheme);
    set({ theme: newTheme });
  },

  addSavedText: savedText => {
    set(state => ({
      savedTexts: [...state.savedTexts, savedText],
    }));
  },

  updateSavedText: updatedText => {
    set(state => ({
      savedTexts: state.savedTexts.map(text => (text.id === updatedText.id ? updatedText : text)),
    }));
  },

  deleteSavedText: id => {
    set(state => ({
      savedTexts: state.savedTexts.filter(text => text.id !== id),
    }));
  },
}));
