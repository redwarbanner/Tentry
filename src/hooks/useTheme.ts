import { useStore } from '../store';

export function useTheme() {
  const isDark = useStore(state => state.theme.isDark);
  const toggleTheme = useStore(state => state.toggleTheme);

  return {
    isDark,
    toggleTheme,
  };
}
