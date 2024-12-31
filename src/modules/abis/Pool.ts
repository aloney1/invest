import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi';
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export const poolABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_usdt', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'round', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'roleC3Ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'roleC2Ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'roleC1Ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'roleBIds', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'roleAIds', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'NewRoundStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'previousAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'newAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'roleId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'account', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'UserAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'roleId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'account', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'UserFilledEmptyRole',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'superior', internalType: 'address', type: 'address', indexed: true },
      { name: 'sn', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'UserInvested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'roleId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'UserSenior',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'C3_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'accounts', internalType: 'address[]', type: 'address[]' }],
    name: 'addUser',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'emptyRoleIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'emptyRoleIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'userRoleIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'fillEmptyRoleIds',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'endIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getEmptyRoleIds',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'sn', internalType: 'uint256', type: 'uint256' }],
    name: 'getIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRound',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'superior', internalType: 'address', type: 'address' }],
    name: 'invest',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastSn',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'price',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'roleId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'roleInfos',
    outputs: [
      { name: 'roleId', internalType: 'uint256', type: 'uint256' },
      { name: 'roleToAddress', internalType: 'address', type: 'address' },
      { name: 'oldRoleToAddress', internalType: 'address', type: 'address' },
      { name: 'level', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'roundRoleIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'userRoleIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'setSenior',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'snToAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'roleC3Ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'roleC2Ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'roleC1Ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'roleBIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'roleAIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'startNewRound',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'teamSuperiorRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'sn', internalType: 'uint256', type: 'uint256' },
      { name: 'superior', internalType: 'address', type: 'address' },
      { name: 'isSenior', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const;

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export const poolAddress = {
  97: '0x425ee215D67b59c4394989C08A77Cb0922064B9E',
} as const;

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export const poolConfig = { address: poolAddress, abi: poolABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"ADMIN_ROLE"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolAdminRole<
  TFunctionName extends 'ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"C3_ROLE"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolC3Role<
  TFunctionName extends 'C3_ROLE',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'C3_ROLE',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"emptyRoleIds"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolEmptyRoleIds<
  TFunctionName extends 'emptyRoleIds',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'emptyRoleIds',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"emptyRoleIndex"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolEmptyRoleIndex<
  TFunctionName extends 'emptyRoleIndex',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'emptyRoleIndex',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getEmptyRoleIds"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolGetEmptyRoleIds<
  TFunctionName extends 'getEmptyRoleIds',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'getEmptyRoleIds',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getIndex"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolGetIndex<
  TFunctionName extends 'getIndex',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'getIndex',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getRoleAdmin"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getRound"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolGetRound<
  TFunctionName extends 'getRound',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'getRound',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"hasRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"lastSn"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolLastSn<
  TFunctionName extends 'lastSn',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'lastSn',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"price"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolPrice<
  TFunctionName extends 'price',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'price',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"roleId"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRoleId<
  TFunctionName extends 'roleId',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'roleId',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"roleInfos"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRoleInfos<
  TFunctionName extends 'roleInfos',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'roleInfos',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"roundRoleIds"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRoundRoleIds<
  TFunctionName extends 'roundRoleIds',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'roundRoleIds',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"snToAddress"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolSnToAddress<
  TFunctionName extends 'snToAddress',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'snToAddress',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"teamSuperiorRewards"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolTeamSuperiorRewards<
  TFunctionName extends 'teamSuperiorRewards',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'teamSuperiorRewards',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"usdt"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolUsdt<
  TFunctionName extends 'usdt',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'usdt',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"users"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolUsers<
  TFunctionName extends 'users',
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return useContractRead({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'users',
    ...config,
  } as UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof poolABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any
) {
  return useContractWrite<typeof poolABI, TFunctionName, TMode>({
    abi: poolABI,
    address: poolAddress[97],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"addUser"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolAddUser<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'addUser'>['request']['abi'],
        'addUser',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'addUser' }
    : UseContractWriteConfig<typeof poolABI, 'addUser', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'addUser';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'addUser', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'addUser',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"fillEmptyRoleIds"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolFillEmptyRoleIds<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'fillEmptyRoleIds'>['request']['abi'],
        'fillEmptyRoleIds',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'fillEmptyRoleIds' }
    : UseContractWriteConfig<typeof poolABI, 'fillEmptyRoleIds', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'fillEmptyRoleIds';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'fillEmptyRoleIds', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'fillEmptyRoleIds',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"grantRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolGrantRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'grantRole'>['request']['abi'],
        'grantRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof poolABI, 'grantRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'grantRole';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'grantRole', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"invest"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolInvest<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'invest'>['request']['abi'],
        'invest',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'invest' }
    : UseContractWriteConfig<typeof poolABI, 'invest', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'invest';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'invest', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'invest',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"renounceRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRenounceRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'renounceRole'>['request']['abi'],
        'renounceRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof poolABI, 'renounceRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'renounceRole';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'renounceRole', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"revokeRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolRevokeRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'revokeRole'>['request']['abi'],
        'revokeRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof poolABI, 'revokeRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'revokeRole';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'revokeRole', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"setSenior"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolSetSenior<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'setSenior'>['request']['abi'],
        'setSenior',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setSenior' }
    : UseContractWriteConfig<typeof poolABI, 'setSenior', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'setSenior';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'setSenior', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'setSenior',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"startNewRound"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePoolStartNewRound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolABI, 'startNewRound'>['request']['abi'],
        'startNewRound',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'startNewRound' }
    : UseContractWriteConfig<typeof poolABI, 'startNewRound', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'startNewRound';
      } = {} as any
) {
  return useContractWrite<typeof poolABI, 'startNewRound', TMode>({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'startNewRound',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof poolAddress;
  } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"addUser"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolAddUser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'addUser'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'addUser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'addUser'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"fillEmptyRoleIds"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolFillEmptyRoleIds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'fillEmptyRoleIds'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'fillEmptyRoleIds',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'fillEmptyRoleIds'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"grantRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'grantRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"invest"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolInvest(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'invest'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'invest',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'invest'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"renounceRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'renounceRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"revokeRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'revokeRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"setSenior"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolSetSenior(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'setSenior'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'setSenior',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'setSenior'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"startNewRound"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x425ee215d67b59c4394989c08a77cb0922064b9e)
 */
export function usePreparePoolStartNewRound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, 'startNewRound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof poolAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    address: poolAddress[97],
    functionName: 'startNewRound',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, 'startNewRound'>);
}
