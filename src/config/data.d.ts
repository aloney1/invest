export interface ChildMenu {
  name: string;
  url: string;
  childList?: {
    name: string;
    url: string;
  }[];
}

export interface MenuListType {
  name: string;
  url: string;
  key: string;
  index: number;
  childList?: ChildMenu[];
}

export interface tokenType {
  decimals: number;
  priceFeed: string;
  symbol: string;
  token: `0x${string}` | undefined;
}

export interface PoolListType {
  starter: string;
  poolId: number;
  type: string;
  creator: string;
  hot: number;
  tvl: number;
  avgPrice: number;
  profitPrice: number;
  spotPrice: number;
  floor: number;
  radio: number;
  layerProgress: number;
  token: string;
  decimals: number;
  name: string;
  sortOrder?: string;
  shareRatio: number;
  status: number;
  inputCount: number;
  farming: number;
  lastRatio: number;
  boost: number;
  poolid: number;
  logo: string;
  lastLayer: number;
  id: number;
  rewardRatio: number;
}

export interface InputListType {
  poolId: number;
  type: string;
  tvl: string;
  avgPrice: number;
  profitPrice: number;
  spotPrice: number;
  purchase: number;
  layer: number;
  quantity: number;
  equity: number;
  reward: number;
  farming: number;
  status: number;
  tokenId: number;
}

export interface PoolType {
  avg: number;
  double: number;
  fallRatio: number;
  floor: number;
  lastCap: number;
  floorProgress: number;
  floorUnits: any[];
  hot: number;
  poolId: number;
  profitPrice: number;
  profitRatio: number;
  rewardUnits: number;
  shareRatio: number;
  creator: '';
  targetPrice: number;
  token: '';
  tvl: number;
  unitAmount: number;
  rewards: number;
  lastRatio: number;
  rewardRatio: number;
  units: number;
  poolid: number;
  floorData: [];
  spotPrice: number;
  status: number;
  lastFloorUnits: number;
  endPrice: number;
  maxRewardUnits: number;
  joins: number;
  fixYield?: number;
  flexYield?: number;
}
