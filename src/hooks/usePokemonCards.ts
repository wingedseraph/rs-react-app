import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const usePokemonCards = (query: string, page: number) => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => getPokemonByQuery(query, page),
    queryKey: ['allPokemonCards', { page, query }],
  });
};
