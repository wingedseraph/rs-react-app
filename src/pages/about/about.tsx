import { Path } from '@/config/routesConfig';
import { Link } from 'react-router-dom';
function About(): React.ReactNode {
  return (
    <div className="flex flex-col items-center p-10 gap-4 text-4xl">
      <a
        className="transition-all text-[#203363] hover:text-[#F6CD46] hover:bg-[#203363]"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/wingedseraph`}
      >
        author: wingedseraph
      </a>
      <a
        className="transition-all text-[#203363] hover:text-[#F6CD46] hover:bg-[#203363]"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://rs.school/courses/reactjs`}
      >
        react course link
      </a>
      <Link
        className="transition-all text-[#203363] hover:text-[#F6CD46] hover:bg-[#203363]"
        to={Path.index}
      >
        ← to index page
      </Link>
    </div>
  );
}
export default About;
