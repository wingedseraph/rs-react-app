'use client';

import { useContext, useState } from 'react';

import { queryClient } from '@/api/queryClient';
import { Button } from '@/components/Button/Button';
import { CardList } from '@/components/CardList/CardList';
import { CardSlider } from '@/components/CardSlider/CardSlider';
import { Flyout } from '@/components/Flyout/Flyout';
import { Pagination } from '@/components/Pagination/Pagination';
import { Search } from '@/components/Search/Search';
import { POKEMON_LOCAL_STORAGE_QUERY } from '@/config/apiConfig';
import { THEMES } from '@/config/themeConfig';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePokemonCards } from '@/hooks/usePokemonCards';
import NotFound from './not-found';
// import { useNavigate, useParams } from 'react-router-dom';

function Index() {
  // const { cardId } = useParams();
  // const navigate = useNavigate();

  const { setTheme, theme } = useContext(ThemeContext);
  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );

  const [page, setPage] = useState(1);

  const { refetch } = usePokemonCards(value, page);

  const {
    data: pokemonCards,
    error,
    isLoading,
    isPlaceholderData,
  } = usePokemonCards(value, page);
  // const { data: cardDetails, isLoading: isDetailedPending } =
  //   usePokemonCardDetails(cardId);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  // const handlePageChange = (page: number) => {
  //   navigate(`/page/${page}`);
  //   setPage(page);
  // };

  // const handleCardClick = (cardId: string) => {
  //   navigate(`/page/${page}/card/${cardId}`);
  // };

  // const handlePage = () => {
  //   navigate(`/page/${page}`);
  // };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  if (error) return <NotFound error="problem with API" />;

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        loading={isLoading}
        onChange={handleInputChange}
        // onClick={handlePage}
        onClick={() => {}}
        value={value}
      />
      <select
        className="mt-4 cursor-pointer"
        defaultValue={theme}
        onChange={handleThemeChange}
      >
        {THEMES.map((theme) => (
          <option key={theme} value={theme}>
            {theme} theme
          </option>
        ))}
      </select>
      <CardList
        className={isPlaceholderData ? 'animate-pulse' : ''}
        data={pokemonCards?.data || []}
        loading={isLoading}
        // onCardClick={handleCardClick}
        onCardClick={() => {}}
      />
      <Pagination
        currentPage={page}
        disabled={isLoading}
        hasMorePages={pokemonCards?.hasMorePages}
        // onClick={handlePageChange}

        onClick={() => {}}
      />
      <Flyout />
      <CardSlider
        cardDetails={null}
        isLoadingData={false}
        // isOpen={cardId !== false}
        isOpen={false}
        // onClose={handlePage}
        // isLoadingData={isDetailedPending}
        // cardDetails={cardDetails || null}
        onClose={() => {}}
      />

      <Button onClick={() => refetch()}>refresh current cards</Button>

      <Button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ['allPokemonCards'],
          })
        }
      >
        refresh all cards
      </Button>
    </div>
  );
}
export default Index;
