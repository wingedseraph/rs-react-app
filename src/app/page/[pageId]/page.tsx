'use client';

import { useContext, useEffect, useState } from 'react';

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
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { useNavigate, useParams } from 'react-router-dom';

export default function Index() {
  const params = useParams<{ pageId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setTheme, theme } = useContext(ThemeContext);
  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );

  const [page, setPage] = useState(1);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const {
    data: pokemonCards,
    isLoading,
    isPlaceholderData,
  } = usePokemonCards(value, page);

  const cardId = searchParams.get('cardId');
  const { data: cardDetails, isLoading: isCardLoading } = usePokemonCardDetails(
    cardId ?? undefined
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (params.pageId) {
      const pageNumber = parseInt(params.pageId, 10);

      if (!isNaN(pageNumber) && pageNumber !== page) {
        setPage(pageNumber);
      }
    }
  }, [params.pageId, page]);

  useEffect(() => {
    if (isHydrated && cardId) {
      setIsCardModalOpen(true);
    } else {
      setIsCardModalOpen(false);
    }
  }, [cardId, isHydrated]);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    router.push(`/page/${String(page)}`);
    setPage(page);
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/page/${String(page)}?cardId=${cardId}`);
  };

  const handleCloseCardModal = () => {
    router.push(`/page/${String(page)}`);
    setIsCardModalOpen(false);
  };

  const handlePage = () => {
    router.push(`/page/${String(page)}`);
  };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Search
          loading={isLoading}
          onChange={handleInputChange}
          onClick={handlePage}
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
        />
        <Pagination
          currentPage={page}
          disabled={isLoading}
          hasMorePages={pokemonCards?.hasMorePages}
          onClick={handlePageChange}
        />
        <Flyout />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        loading={isLoading}
        onChange={handleInputChange}
        onClick={handlePage}
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
      />
      <Pagination
        currentPage={page}
        disabled={isLoading}
        hasMorePages={pokemonCards?.hasMorePages}
        onClick={handlePageChange}
      />
      <Flyout />

      {cardId && isCardModalOpen && (
        <CardSlider
          isOpen={isCardModalOpen}
          onClose={handleCloseCardModal}
          isLoadingData={isCardLoading}
          cardDetails={cardDetails ?? null}
        />
      )}
    </div>
  );
}
