import { Spinner } from '@/components/Spinner';
import { Path } from '@/config/routesConfig';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="transition-all md:w-[40%] m-auto hover:scale-110">
        <Link
          className="text-[#203363] hover:text-[#F6CD46] hover:bg-[#203363] transition-all"
          to={Path.about}
        >
          <img src="/logo.png" alt="pokemon logo" loading="lazy" /> to about
          page →
        </Link>
      </header>
      <main className="transition-all mt-20">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
