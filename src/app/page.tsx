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
import { usePokemonCardDetails } from '@/hooks/usePokemonCardDetails';
import { usePokemonCards } from '@/hooks/usePokemonCards';
import { useParams, useRouter } from 'next/navigation';
// import { useNavigate, useParams } from 'react-router-dom';

function Index() {
  const cardId = useParams<{ tag: string; item: string }>();
  const router = useRouter();

  const { setTheme, theme } = useContext(ThemeContext);
  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );

  const [page, setPage] = useState(1);

  const { refetch } = usePokemonCards(value, page);

  const {
    data: pokemonCards,
    isLoading,
    isPlaceholderData,
  } = usePokemonCards(value, page);
  const { data: cardDetails, isLoading: isDetailedPending } =
    usePokemonCardDetails(cardId.tag);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    router.push(`/page/${String(page)}`);
    setPage(page);
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/page/${String(page)}/card/${cardId}`);
  };

  const handlePage = () => {
    router.push(`/page/${String(page)}`);
  };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        loading={isLoading}
        onChange={handleInputChange}
        onClick={handlePage}
        // onClick={() => {}}
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
        data={pokemonCards?.data ?? []}
        loading={isLoading}
        onCardClick={handleCardClick}
        // onCardClick={() => {}}
      />
      <Pagination
        currentPage={page}
        disabled={isLoading}
        hasMorePages={pokemonCards?.hasMorePages}
        onClick={handlePageChange}
      />
      <Flyout />
      <CardSlider
        isOpen={!!cardId}
        onClose={handlePage}
        isLoadingData={isDetailedPending}
        cardDetails={cardDetails ?? null}
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
