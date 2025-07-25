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

export type PokemonResponse = Card[];

export type SinglePokemonResponse = {
  category: string;
  id: string;
  illustrator: string;
  image: string;
  localId: string;
  name: string;
  rarity: string;
  set: {
    cardCount: {
      official: number;
      total: number;
    };
    id: string;
    logo: string;
    name: string;
    symbol: string;
  };
  variants: {
    firstEdition: boolean;
    holo: boolean;
    normal: boolean;
    reverse: boolean;
    wPromo: boolean;
  };
  dexId: number[];
  hp: number;
  types: string[];
  stage: string;
  suffix: string;
  attacks: [
    {
      cost: string[];
      name: string;
      effect: string;
    },
    {
      cost: string[];
      name: string;
      effect: string;
      damage: string;
    },
  ];
  weaknesses: [
    {
      type: string;
      value: string;
    },
  ];
  retreat: number;
  regulationMark: string;
  legal: {
    standard: boolean;
    expanded: boolean;
  };
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
