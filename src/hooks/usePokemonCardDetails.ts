import { useQuery } from '@tanstack/react-query';

import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';

export const usePokemonCardDetails = (cardId: string | null) => {
  return useQuery({
    enabled: cardId !== undefined,
    queryFn: () => getPokemonCardDetails(String(cardId)),
    queryKey: ['singlePokemonCard', { cardId }],
  });
};
