import { createContext, type ReactNode, useEffect } from 'react';

import { DEFAULT_THEME, THEMES } from '@/config/themeConfig';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type Theme = (typeof THEMES)[number];

const initialState: {
  setTheme: (selectedTheme: Theme) => void;
  theme: Theme;
} = {
  setTheme: () => {},
  theme: DEFAULT_THEME,
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
    setTheme: (selectedTheme: Theme) => {
      setTheme(selectedTheme);
    },
    theme,
  };

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
export default ThemeContext;
