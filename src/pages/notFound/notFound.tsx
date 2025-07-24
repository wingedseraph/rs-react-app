import { Link } from 'react-router-dom';
import { Path } from '@/config/routesConfig';
export function NotFound({ error }: { error: string }): React.ReactNode {
  return (
    <div>
      <h1>Page not found</h1>
      <p>Error: {error}</p>
      <Link to={Path.index}> Return to index page</Link>
    </div>
  );
}
