import { Link } from 'react-router-dom';
import { Path } from '@/config/routesConfig';
export function NotFound({ error }: { error: string }): React.ReactNode {
  return (
    <div className="flex flex-col items-center p-10 gap-2 text-[#F6CD46] bg-[#203566] rounded-xl text-3xl ">
      <h1 className="text-4xl font-bold mb-10">page not found</h1>
      <p>error: {error}</p>
      <Link to={Path.index}>return to index page</Link>
    </div>
  );
}
