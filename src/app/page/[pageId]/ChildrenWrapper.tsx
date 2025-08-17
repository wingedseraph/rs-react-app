'use client';

import { Card } from '@/app/types';
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
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function ChildrenWrapper({
  pageId,
  cardId = null,
  allCards,
}: {
  pageId: string;
  cardId: string | null;
  allCards: Card[];
}) {
  const router = useRouter();
  const { setTheme, theme } = useContext(ThemeContext);
  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );
  const [page, setPage] = useState(parseInt(pageId, 10) || 1);

  const { data: pokemonCards } = usePokemonCards(value, page);

  const { data: cardDetails, isLoading: isCardLoading } = usePokemonCardDetails(
    cardId ?? null
  );

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    router.push(`/page/${String(page)}`, { scroll: false });
    setPage(page);
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/page/${String(page)}?cardId=${cardId}`, { scroll: false });
  };

  const handleCloseCardModal = () => {
    router.push(`/page/${String(page)}`, { scroll: false });
  };

  const handlePage = () => {
    router.push(`/page/${String(page)}`, { scroll: false });
  };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  return (
    <>
      <Search
        loading={!allCards}
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
        data={value ? (pokemonCards?.data ?? []) : allCards}
        loading={!allCards}
        onCardClick={handleCardClick}
      />
      <Pagination
        currentPage={page}
        disabled={!value}
        hasMorePages={true}
        onClick={handlePageChange}
      />
      <Flyout />

      {cardId && (
        <CardSlider
          isOpen={!!cardId}
          onClose={handleCloseCardModal}
          isLoadingData={isCardLoading}
          cardDetails={cardDetails ?? null}
        />
      )}
    </>
  );
}
