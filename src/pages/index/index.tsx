import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { CardList } from '@/components/CardList/CardList';
import { CardSlider } from '@/components/CardSlider/CardSlider';
import { Flyout } from '@/components/Flyout/Flyout';
import { Pagination } from '@/components/Pagination/Pagination';
import { Search } from '@/components/Search/Search';
import { POKEMON_LOCAL_STORAGE_QUERY } from '@/config/apiConfig';
import { THEMES } from '@/config/themeConfig';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NotFound } from '@/pages/notFound/notFound';
import { type PokemonCardDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Index() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const { theme, setTheme } = useContext(ThemeContext);

  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );
  const [page, setPage] = useState(1);

  const {
    data: pokemonCards,
    error,
    isPending,
  } = useQuery({
    queryKey: ['pokemons', { value, page }],
    queryFn: () => getPokemonByQuery(value, page),
  });

  const [selectedCardDetails, setSelectedCardDetails] =
    useState<PokemonCardDetails | null>(null);

  useEffect(() => {
    if (cardId) {
      const loadCardDetails = async () => {
        const details = await getPokemonCardDetails(cardId);
        setSelectedCardDetails(details);
      };
      loadCardDetails();
    } else {
      setSelectedCardDetails(null);
    }
  }, [cardId]);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
    setPage(page);
  };

  const handleCardClick = (cardId: string) => {
    navigate(`/page/${page}/card/${cardId}`);
  };

  const handleSliderClose = () => {
    navigate(`/page/${page}`);
  };

  const handleSearchClick = () => {
    navigate(`/page/${page}`);
  };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  if (error) return <NotFound error="problem with API" />;
  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        value={value}
        onChange={handleInputChange}
        loading={isPending}
        onClick={handleSearchClick}
      />
      <select
        className="mt-4 cursor-pointer"
        onChange={handleThemeChange}
        defaultValue={theme}
      >
        {THEMES.map((theme) => (
          <option value={theme} key={theme}>
            {theme}
          </option>
        ))}
      </select>
      <CardList
        data={pokemonCards?.data || []}
        loading={isPending}
        onCardClick={handleCardClick}
      />
      <Pagination
        currentPage={page}
        disabled={isPending}
        hasMorePages={pokemonCards?.hasMorePages}
        onClick={handlePageChange}
      />
      <Flyout />
      <CardSlider
        isOpen={!!cardId}
        onClose={handleSliderClose}
        isLoadingImage={isPending}
        cardDetails={selectedCardDetails}
      />
    </div>
  );
}
export default Index;
