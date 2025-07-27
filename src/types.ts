import type { ReactNode } from 'react';

export enum CONST {
  POKEMON_QUERY = 'POKEMON_QUERY',
}

export type AppProps = Record<string, unknown>;

export type ButtonProps = {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export type Card = {
  id: string;
  image: string;
  localId: string;
  name: string;
  error?: string;
};

export type PokemonCardDetails = {
  category: string;
  id: string;
  illustrator?: string;
  image: string;
  localId: string;
  name: string;
  rarity: string;
  dexId: number[];
  hp: number;
  types: string[];
  stage: string;
  suffix?: string;
};

export type CardProps = {
  card: Card;
};

export type CardListProps = {
  loading: boolean;
  data: Card[] | null;
};

export type SearchProps = {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
