import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { CardList } from '@/components/CardList';
import { Search } from '@/components/Search';
import { CONST, type Card } from '@/types';
import { useEffect, useState } from 'react';

function Index() {
  const [value, setValue] = useState(
    localStorage.getItem(CONST.POKEMON_QUERY) ?? ''
  );
  const [pokemonCards, setPokemonCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const onSearch = async () => {
    const query = value.trim();
    localStorage.setItem(CONST.POKEMON_QUERY, query);
    setLoading(true);

    const responseData: Card[] = await getPokemonByQuery(query);
    console.warn('PokemonResponse: ', responseData);

    if (responseData) {
      setPokemonCards(responseData);
      setLoading(false);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        value={value}
        onChange={handleInputChange}
        loading={loading}
        onClick={() => onSearch()}
      />
      <CardList data={pokemonCards} loading={loading} />
    </div>
  );
}
export default Index;
