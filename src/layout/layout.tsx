import { Spinner } from '@/components/Spinner';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="bg-red-600">header</header>
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="bg-blue-600">footer</footer>
    </>
  );
};
