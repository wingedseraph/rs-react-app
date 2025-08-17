import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T extends string>(
  initialValue: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key) as T | null;

    if (stored) {
      setState(stored);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, state.trim());
  }, [state, key]);

  return [state, setState];
};
