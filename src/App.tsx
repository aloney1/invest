import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import en from 'antd/locale/en_US';
import { wagmiConfig, chains } from '@wallet/index.ts';
import { initializeApollo } from '@/modules/graphql/apollo.ts';
import routes from './routes.tsx';

import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './store/theme.ts';

function App() {
  const r = useRoutes(routes);
  const themeType = useTheme(state => state.type);
  const graphQLClient = initializeApollo();

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ApolloProvider client={graphQLClient}>
          <RainbowKitProvider
            chains={chains}
            locale="en"
            theme={lightTheme({
              accentColor: '#faf2ef',
              accentColorForeground: '#2f354d',
            })}
          >
            <ConfigProvider
              locale={en}
              theme={{
                components: {
                  Steps: {
                    algorithm: true,
                    colorPrimary: 'rgb(250, 78, 68)',
                    colorText: 'rgb(250, 78, 68)',
                  },
                  Popover: {
                    colorBgElevated: themeType === 'dark' ? '#202020' : '#fff',
                  },
                  Select: {
                    colorBgElevated: themeType === 'dark' ? '#272727' : '#fff',
                    colorText: themeType === 'dark' ? '#9da4b2' : 'rgba(0, 0, 0, 0.88)',
                    optionActiveBg:
                      themeType === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                  },
                },
              }}
            >
              {r}
            </ConfigProvider>
          </RainbowKitProvider>
        </ApolloProvider>
      </WagmiConfig>
      <ToastContainer />
    </>
  );
}

export default App;
