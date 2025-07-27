import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { CardList } from '@/components/CardList';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CONST, type Card } from '@/types';
import { useEffect, useState } from 'react';

function Index() {
  const [value, setValue] = useLocalStorage('', CONST.POKEMON_QUERY);
  const [pokemonCards, setPokemonCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPokemonPage, setCurrentPokemonPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  const onSearch = async () => {
    const query = value.trim();
    setLoading(true);

    const responseData: { data: Card[]; hasMorePages: boolean } =
      await getPokemonByQuery(query, currentPokemonPage);

    if (responseData) {
      setPokemonCards(responseData.data);
      setLoading(false);
      setHasMorePages(responseData.hasMorePages);
    }
  };

  useEffect(() => {
    onSearch();
  }, [currentPokemonPage]);

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
      <Pagination
        currentPage={currentPokemonPage}
        disabled={loading}
        hasMorePages={hasMorePages}
        onClick={setCurrentPokemonPage}
      />
    </div>
  );
}
export default Index;
