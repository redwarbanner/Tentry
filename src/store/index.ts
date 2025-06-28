import { create } from 'zustand';
import type {
  AppState,
  TextAnalysisResult,
  UniquenessCheck,
  PageAnalysis,
  SavedText,
} from '../types';

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

// Initialize theme from localStorage
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tentry-theme');
    return saved ? JSON.parse(saved) : { isDark: false };
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
  // Actions
  setCurrentText: (text: string) => set({ currentText: text }),
  setAnalysisResult: (result: TextAnalysisResult | null) => set({ analysisResult: result }),
  setUniquenessCheck: (check: UniquenessCheck | null) => set({ uniquenessCheck: check }),
  setPageAnalysis: (analysis: PageAnalysis | null) => set({ pageAnalysis: analysis }),
  toggleTheme: () => {
    const newTheme = { isDark: !get().theme.isDark };
    localStorage.setItem('tentry-theme', JSON.stringify(newTheme));
    set({ theme: newTheme });
  },
  addSavedText: (savedText: SavedText) =>
    set(state => ({ savedTexts: [...state.savedTexts, savedText] })),
  updateSavedText: (updatedText: SavedText) =>
    set(state => {
      const index = state.savedTexts.findIndex(text => text.id === updatedText.id);
      const newSavedTexts = [...state.savedTexts];
      if (index !== -1) newSavedTexts[index] = updatedText;
      return { savedTexts: newSavedTexts };
    }),
  deleteSavedText: (id: string) =>
    set(state => ({
      savedTexts: state.savedTexts.filter(text => text.id !== id),
    })),
}));
