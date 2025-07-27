import { Path } from '@/config/routesConfig';
import { Link } from 'react-router-dom';
export function NotFound({ error }: { error: string }): React.ReactNode {
  return (
    <div className="flex flex-col items-center p-10 gap-2 text-[#F6CD46] bg-[#203566] rounded-xl text-3xl ">
      <h1 className="text-4xl font-bold mb-10">page not found</h1>
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
