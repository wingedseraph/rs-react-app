import { Spinner } from '@/components/Spinner';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="transition-all md:w-[40%] m-auto hover:scale-110">
        <img src="/logo.png" />
      </header>
      <main className="transition-all mt-20">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
