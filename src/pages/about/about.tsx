import { Path } from '@/config/routesConfig';
import { Link } from 'react-router-dom';
function About(): React.ReactNode {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-4xl">
      <a
        className="transition-all"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/wingedseraph`}
      >
        author: wingedseraph
      </a>
      <a
        className="transition-all"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://rs.school/courses/reactjs`}
      >
        react course link
      </a>
      <Link className="transition-all" to={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
export default About;
