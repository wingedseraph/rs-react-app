import { Spinner } from '@/components/Spinner';
import { Path } from '@/config/routesConfig';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="m-auto transition-all hover:scale-110 md:w-[40%]">
        <Link className="transition-all" to={Path.about}>
          <img src="/logo.png" alt="pokemon logo" loading="lazy" /> to about
          page →
        </Link>
      </header>
      <main className="mt-20 bg-inherit">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
