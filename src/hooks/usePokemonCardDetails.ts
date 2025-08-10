import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { useQuery } from '@tanstack/react-query';

export const usePokemonCardDetails = (cardId: string | undefined) => {
  return useQuery({
    queryKey: ['singlePokemonCard', { cardId }],
    queryFn: () => getPokemonCardDetails(String(cardId)),
    enabled: cardId !== undefined,
  });
};
