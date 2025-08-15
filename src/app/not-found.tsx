import { Path } from '@/config/routesConfig';
import Link from 'next/link';

export default function NotFound(): React.ReactNode {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl p-10 text-3xl">
      <h1 className="mb-10 bg-red-500 text-4xl font-bold">page not found</h1>
      <Link className="transition-all" href={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
