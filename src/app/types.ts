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
