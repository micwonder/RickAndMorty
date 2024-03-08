import { FC, lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const Layout = lazy(() => import('../layout'));
const CharacterList = lazy(() => import('../pages/characters/CharacterList'));

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [{ path: '', element: <CharacterList /> }],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
