import { Path } from '@/config/routesConfig';
import { Layout } from '@/layout/layout';
import { NotFound } from '@/pages/notFound/notFound';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PAGE_NOT_FOUND_ERROR = '404';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound error={PAGE_NOT_FOUND_ERROR} />,
    children: [
      {
        path: Path.index,
        Component: lazy(() => import('@/pages/index/index')),
      },
    ],
  },
]);
