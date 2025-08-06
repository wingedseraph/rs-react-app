import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { queryClient } from '@/api/queryClient';
import { CardList } from '@/components/CardList/CardList';
import { CardSlider } from '@/components/CardSlider/CardSlider';
import { Flyout } from '@/components/Flyout/Flyout';
import { Pagination } from '@/components/Pagination/Pagination';
import { Search } from '@/components/Search/Search';
import { POKEMON_LOCAL_STORAGE_QUERY } from '@/config/apiConfig';
import { THEMES } from '@/config/themeConfig';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type Card, type PokemonCardDetails } from '@/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Index() {
  const { pageId, cardId } = useParams();
  const navigate = useNavigate();

  const { theme, setTheme } = useContext(ThemeContext);

  const [value, setValue] = useLocalStorage<string>(
    '',
    POKEMON_LOCAL_STORAGE_QUERY
  );
  const [pokemonCards, setPokemonCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [currentPokemonPage, setCurrentPokemonPage] = useState(1);

  const [selectedCardDetails, setSelectedCardDetails] =
    useState<PokemonCardDetails | null>(null);

  useEffect(() => {
    const page = pageId ? Number(pageId) : 1;
    setCurrentPokemonPage(page);
  }, [pageId]);

  const fetchPokemonCards = async () => {
    setIsLoading(true);
    const query = value.trim();
    const responseData = await getPokemonByQuery(query, currentPokemonPage);
    if (responseData) {
      setPokemonCards(responseData.data);
      setHasMorePages(responseData.hasMorePages);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemonCards();
  }, [currentPokemonPage]);

  useEffect(() => {
    if (cardId) {
      const loadCardDetails = async () => {
        const details = await getPokemonCardDetails(cardId);
        setSelectedCardDetails(details);
        setIsLoadingImage(true);
      };
      loadCardDetails();
    } else {
      setIsLoadingImage(false);
      setSelectedCardDetails(null);
    }
  }, [cardId]);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
  };

  const handleCardClick = (cardId: string) => {
    navigate(`/page/${currentPokemonPage}/card/${cardId}`);
  };

  const handleSliderClose = () => {
    navigate(`/page/${currentPokemonPage}`);
  };

  const handleSearchClick = () => {
    if (currentPokemonPage === 1) {
      fetchPokemonCards();
    } else {
      navigate('/page/1');
    }
  };

  const handleThemeChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event_.target.value as Theme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center">
        <Search
          value={value}
          onChange={handleInputChange}
          loading={isLoading}
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
          data={pokemonCards}
          loading={isLoading}
          onCardClick={handleCardClick}
        />
        <Pagination
          currentPage={currentPokemonPage}
          disabled={isLoading}
          hasMorePages={hasMorePages}
          onClick={handlePageChange}
        />
        <Flyout />
        <CardSlider
          isOpen={!!cardId}
          onClose={handleSliderClose}
          isLoadingImage={isLoadingImage}
          cardDetails={selectedCardDetails}
          onImageLoad={() => setIsLoadingImage(false)}
        />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Index;
