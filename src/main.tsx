import React from 'react';

import ReactDOM from 'react-dom/client';

import LayoutConfigProvider from './provider/ThemeProvider.tsx';
import Routes from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LayoutConfigProvider>
      <Routes />
    </LayoutConfigProvider>
  </React.StrictMode>,
);
