import ClientWrapper from './ChildrenWrapper';

export default async function Index({
  params,
  searchParams,
}: {
  params: Promise<{ pageId: string }>;
  searchParams: Promise<{ cardId?: string }>;
}) {
  const { pageId } = await params;
  const { cardId } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center">
      <ClientWrapper pageId={pageId} cardId={cardId ?? null} />
    </div>
  );
}
