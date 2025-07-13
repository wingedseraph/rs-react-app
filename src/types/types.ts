import type { ReactNode } from 'react';

export type AppProps = Record<string, unknown>;

export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className: string;
};

export type Card = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
};

export type PokemonResponse = {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
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
  onClick: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
