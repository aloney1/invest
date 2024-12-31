import { Chain } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import Ico1 from '@/assets/coin/BNB.png';

const bnbChain: Chain = {
  id: 97,
  name: 'Bsc Testnet',
  network: 'Bsc Testnet',
  iconUrl: Ico1,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: {
      http: ['https://bsc-testnet-rpc.publicnode.com'],
    },
    default: {
      http: ['https://bsc-testnet-rpc.publicnode.com'],
    },
  },
  testnet: true,
};

export { mainnet, bnbChain };
