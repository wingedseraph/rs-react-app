import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

export const useLocalStorage = <T extends string>(
  default_: T,
  key: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    return (localStorage.getItem(key) ?? default_) as T;
  });

  useEffect(() => {
    localStorage.setItem(key, state.trim());
  }, [state, key]);

  return [state, setState];
};
