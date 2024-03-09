import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="grow p-4 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
