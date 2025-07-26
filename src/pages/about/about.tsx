import { Link } from 'react-router-dom';
import { Path } from '@/config/routesConfig';
function About(): React.ReactNode {
  return (
    <div className="flex flex-col items-center p-10 gap-4 text-4xl">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/wingedseraph`}
      >
        author: wingedseraph
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://rs.school/courses/reactjs`}
      >
        react course link
      </a>
      <Link to={Path.index}>← return to index page</Link>
    </div>
  );
}
export default About;
