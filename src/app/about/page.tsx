import Link from 'next/link';

import { Path } from '@/config/routesConfig';

function About(): React.ReactNode {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-4xl">
      <a
        className="transition-all"
        href={`https://github.com/wingedseraph`}
        rel="noopener noreferrer"
        target="_blank"
      >
        author: wingedseraph
      </a>
      <a
        className="transition-all"
        href={`https://rs.school/courses/reactjs`}
        rel="noopener noreferrer"
        target="_blank"
      >
        react course link
      </a>
      <Link className="transition-all" href={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
export default About;
