import { THEMES, DEFAULT_THEME } from '@/config/themeConfig';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useEffect, type ReactNode } from 'react';

export type Theme = (typeof THEMES)[number];

const initialState: {
  theme: Theme;
  setTheme: (selectedTheme: Theme) => void;
} = {
  theme: DEFAULT_THEME,
  setTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    DEFAULT_THEME,
    'POKEMON_THEME'
  );

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark');
    }

    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (selectedTheme: Theme) => {
      setTheme(selectedTheme);
    },
  };

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
export default ThemeContext;
