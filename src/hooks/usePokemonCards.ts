import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { useQuery } from '@tanstack/react-query';

export const usePokemonCards = (query: string, page: number) => {
  return useQuery({
    queryKey: ['allPokemonCards', { query, page }],
    queryFn: () => getPokemonByQuery(query, page),
  });
};
