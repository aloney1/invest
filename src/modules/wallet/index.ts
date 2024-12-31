import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { injectedWallet, okxWallet, imTokenWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from './providers';
import { bnbChain } from './chains';
import { PROJECT_ID } from '@/config/constants.ts';
const { chains, publicClient } = configureChains([bnbChain], [publicProvider()]);

const { wallets } = getDefaultWallets({
  appName: 'Invest',
  projectId: PROJECT_ID,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      injectedWallet({ chains }),
      okxWallet({ projectId: PROJECT_ID, chains }),
      imTokenWallet({ projectId: PROJECT_ID, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
