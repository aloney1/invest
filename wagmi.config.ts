import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import TokenABI from './src/abis/Token';
import PoolABI from './src/abis/pool';
import { ContractAddresses } from './src/config/addresses';

const reactPlugin = react({
  useContractEvent: false,
  useContractItemEvent: false,
});

export default defineConfig([
  {
    out: 'src/modules/abis/Token.ts',
    contracts: [
      {
        abi: TokenABI,
        address: {
          97: ContractAddresses[97].usdt,
        },
        name: 'Token',
      },
    ],
    plugins: [reactPlugin],
  },
  {
    out: 'src/modules/abis/Pool.ts',
    contracts: [
      {
        abi: PoolABI,
        address: {
          97: ContractAddresses[97].pool,
        },
        name: 'Pool',
      },
    ],
    plugins: [reactPlugin],
  },
]);
