import { Card } from '@/app/types';
import {
  POKEMON_BASE_API_URL,
  POKEMON_MAX_PAGE_SIZE,
} from '@/config/apiConfig';
import { notFound } from 'next/navigation';
import ClientWrapper from './ChildrenWrapper';

export const revalidate = 3600;

async function getAllCards() {
  const response = await fetch(
    `${POKEMON_BASE_API_URL}cards?name=*&image=*&pagination:itemsPerPage=${String(POKEMON_MAX_PAGE_SIZE)}`,
    {
      next: { revalidate: 3600 },
    }
  );
  const data = (await response.json()) as Card[];

  return data;
}

export default async function Index({
  params,
  searchParams,
}: {
  params: Promise<{ pageId: string }>;
  searchParams: Promise<{ cardId?: string }>;
}) {
  const { pageId } = await params;
  const { cardId } = await searchParams;

  const allCards = await getAllCards();

  if (!/^\d+$/.test(pageId)) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ClientWrapper
        allCards={allCards}
        pageId={pageId}
        cardId={cardId ?? null}
      />
    </div>
  );
}
