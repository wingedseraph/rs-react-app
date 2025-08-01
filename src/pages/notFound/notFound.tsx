import { Path } from '@/config/routesConfig';
import { Link } from 'react-router-dom';
export function NotFound({ error }: { error: string }): React.ReactNode {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-[#203566] p-10 text-3xl text-[#F6CD46]">
      <h1 className="mb-10 text-4xl font-bold">page not found</h1>
      <p>error: {error}</p>
      <Link
        className="transition-all hover:bg-[#F6CD46] hover:text-[#203363]"
        to={Path.index}
      >
        ← to index page
      </Link>
    </div>
  );
}
