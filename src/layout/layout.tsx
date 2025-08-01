import { Spinner } from '@/components/Spinner';
import { Path } from '@/config/routesConfig';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="m-auto transition-all hover:scale-110 md:w-[40%]">
        <Link
          className="text-[#203363] transition-all hover:bg-[#203363] hover:text-[#F6CD46]"
          to={Path.about}
        >
          <img src="/logo.png" alt="pokemon logo" loading="lazy" /> to about
          page →
        </Link>
      </header>
      <main className="mt-20 transition-all">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
