import { getPokemonByQuery } from '@/api/getPokemonByQuery';
import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { CardList } from '@/components/CardList';
import { CardSlider } from '@/components/CardSlider';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CONST, type Card, type PokemonCardDetails } from '@/types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Index() {
  const { pageId, cardId } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useLocalStorage('', CONST.POKEMON_QUERY);
  const [pokemonCards, setPokemonCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHasMorePages, isSetHasMorePages] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [currentPokemonPage, setCurrentPokemonPage] = useState(1);

  const [selectedCardDetails, setSelectedCardDetails] =
    useState<PokemonCardDetails | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const onSearch = async () => {
    const query = value.trim();
    setIsLoading(true);

    const responseData: { data: Card[]; hasMorePages: boolean } =
      await getPokemonByQuery(query, currentPokemonPage);

    if (responseData) {
      setPokemonCards(responseData.data);
      setIsLoading(false);
      isSetHasMorePages(responseData.hasMorePages);
    }
  };

  useEffect(() => {
    const page = pageId ? Number(pageId) : 1;
    setCurrentPokemonPage(page);
  }, [pageId]);

  useEffect(() => {
    onSearch();
  }, [currentPokemonPage]);

  useEffect(() => {
    if (cardId) {
      const loadCardDetails = async () => {
        const details = await getPokemonCardDetails(cardId);
        setSelectedCardDetails(details);
        setIsLoadingImage(true);
        setIsSliderOpen(true);
      };
      loadCardDetails();
    } else {
      setIsSliderOpen(false);
      setIsLoadingImage(false);
      setSelectedCardDetails(null);
    }
  }, [cardId]);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPokemonPage(page);
    if (cardId) {
      navigate(`/page/${page}/card/${cardId}`);
    } else {
      navigate(`/page/${page}`);
    }
  };

  const handleCardClick = (cardId: string) => {
    navigate(`/page/${currentPokemonPage}/card/${cardId}`);
  };

  const handleSliderClose = () => {
    navigate(`/page/${currentPokemonPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        value={value}
        onChange={handleInputChange}
        loading={isLoading}
        onClick={() => onSearch()}
      />
      <CardList
        data={pokemonCards}
        loading={isLoading}
        onCardClick={handleCardClick}
      />
      <Pagination
        currentPage={currentPokemonPage}
        disabled={isLoading}
        hasMorePages={isHasMorePages}
        onClick={handlePageChange}
      />
      <CardSlider
        isOpen={isSliderOpen}
        onClose={handleSliderClose}
        isLoadingImage={isLoadingImage}
        cardDetails={selectedCardDetails}
        onImageLoad={() => setIsLoadingImage(false)}
      />
    </div>
  );
}
export default Index;
