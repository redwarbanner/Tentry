export interface Theme {
  isDark: boolean;
}

export const storage = {
  getTheme(): Theme | null {
    try {
      const raw = localStorage.getItem('tentry-theme');
      const parsed: unknown = JSON.parse(raw ?? 'null');

      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'isDark' in parsed &&
        typeof (parsed as { isDark?: unknown }).isDark === 'boolean'
      ) {
        return parsed as Theme;
      }
    } catch {
      // ignore parse error
    }

    return null;
  },

  setTheme(theme: Theme) {
    localStorage.setItem('tentry-theme', JSON.stringify(theme));
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },
};
