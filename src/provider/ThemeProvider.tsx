import { ReactElement } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type Props = {
  children: ReactElement;
};

function LayoutConfigProvider({ children }: Props) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'light',
        },
        typography: {
          fontFamily: 'Poppins',
        },
      })}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default LayoutConfigProvider;
