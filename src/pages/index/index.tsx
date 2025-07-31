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

  return (
    <div className="flex flex-col items-center justify-center">
      <Search
        value={value}
        onChange={handleInputChange}
        loading={isLoading}
        onClick={handleSearchClick}
      />
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
      <CardSlider
        isOpen={!!cardId}
        onClose={handleSliderClose}
        isLoadingImage={isLoadingImage}
        cardDetails={selectedCardDetails}
        onImageLoad={() => setIsLoadingImage(false)}
      />
    </div>
  );
}
export default Index;
