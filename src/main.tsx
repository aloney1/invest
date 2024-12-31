import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
// Material UI Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './global.css';

import { ThemeProvider } from '@emotion/react';
import { CircularProgress, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useCountStore } from './store/user.ts';
import { useTheme } from './store/theme.ts';

const muiTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Spining>
        <App />
      </Spining>
    </HashRouter>
  </React.StrictMode>
);

function Spining({ children }: { children: JSX.Element }) {
  const spining = useCountStore(state => state.spining);
  const tips = useCountStore(state => state.tips);
  const theme = useTheme(state => state.theme);
  const themeType = useTheme(state => state.type);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        {!!spining && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '1000002',
              background: 'rgba(255,255,255,0.5)',
              fontFamily: "'Poppins', Sans-serif",
            }}
          >
            <CircularProgress color="primary" size={25} thickness={5} />
            <div
              style={{
                marginLeft: '10px',
                fontSize: '16px',
                color: themeType === 'dark' ? 'white' : 'gray',
              }}
            >
              {tips || 'Loading...'}
            </div>
          </div>
        )}
        {children}
      </ThemeProvider>
    </MUIThemeProvider>
  );
}
