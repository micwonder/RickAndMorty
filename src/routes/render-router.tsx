import { FC, lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

const Layout = lazy(() => import('../layout'));
const CharacterList = lazy(() => import('../pages/characters/CharacterList'));
const CharacterDetail = lazy(
  () => import('../pages/characters/CharacterDetail'),
);

const routes = [
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="character" /> },
      { path: 'character', element: <CharacterList /> },
      { path: 'character/:id', element: <CharacterDetail /> },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
