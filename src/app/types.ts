export type Card = {
  error?: string;
  id: string;
  image: string;
  localId: string;
  name: string;
};

export type PokemonCardDetails = {
  category: string;
  dexId: number[];
  hp: number;
  id: string;
  illustrator?: string;
  image: string;
  localId: string;
  name: string;
  rarity: string;
  stage: string;
  suffix?: string;
  types: string[];
};
