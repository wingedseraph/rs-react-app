import { CONST } from '@/types';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const useLocalStorage = (
  default_: string,
  key: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [state, setState] = useState(() => {
    return localStorage.getItem(CONST.POKEMON_QUERY) ?? default_;
  });

  useEffect(() => {
    localStorage.setItem(key, state.trim());
  }, [state, key]);
  return [state, setState];
};
