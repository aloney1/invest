import { Address } from 'wagmi';

export interface Token {
  name: string;
  symbol: string;
  logo: string;
  decimals: number;
  address: Address;
}
