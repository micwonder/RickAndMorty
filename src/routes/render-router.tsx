import { FC, lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const Layout = lazy(() => import('../layout'));

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
