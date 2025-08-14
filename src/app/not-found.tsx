import '@/app/globals.css';
import Link from 'next/link';

import { Path } from '@/config/routesConfig';

export default function NotFound({
  error,
}: {
  error: string;
}): React.ReactNode {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl p-10 text-3xl">
      <h1 className="mb-10 text-4xl font-bold">page not found</h1>
      <p>error: {error || 404}</p>
      <Link className="transition-all" href={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
