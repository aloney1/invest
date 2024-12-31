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
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export const tokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
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
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const;

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export const tokenAddress = {
  97: '0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB',
} as const;

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export const tokenConfig = { address: tokenAddress, abi: tokenABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"MINTER_ROLE"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenMinterRole<
  TFunctionName extends 'MINTER_ROLE',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'MINTER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"allowance"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"decimals"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"getRoleAdmin"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"hasRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof tokenABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, TFunctionName, TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof tokenABI, 'approve', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'approve';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'approve', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof tokenABI, 'burn', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'burn';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'burn', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenBurnFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'burnFrom'>['request']['abi'],
        'burnFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof tokenABI, 'burnFrom', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'burnFrom';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'burnFrom', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'burnFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"grantRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenGrantRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'grantRole'>['request']['abi'],
        'grantRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof tokenABI, 'grantRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'grantRole';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'grantRole', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof tokenABI, 'mint', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'mint';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'mint', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"renounceRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenRenounceRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'renounceRole'>['request']['abi'],
        'renounceRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof tokenABI, 'renounceRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'renounceRole';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'renounceRole', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"revokeRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenRevokeRole<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'revokeRole'>['request']['abi'],
        'revokeRole',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof tokenABI, 'revokeRole', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'revokeRole';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'revokeRole', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof tokenABI, 'transfer', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transfer';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'transfer', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function useTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof tokenAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof tokenABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof tokenABI, 'transferFrom', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transferFrom';
      } = {} as any
) {
  return useContractWrite<typeof tokenABI, 'transferFrom', TMode>({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof tokenAddress;
  } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"burn"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"burnFrom"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'burnFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"grantRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'grantRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"renounceRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'renounceRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"revokeRole"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'revokeRole'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6De8328fbB59E5E444ED7DFCf1023DC8dFc917DB)
 */
export function usePrepareTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof tokenAddress } = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    address: tokenAddress[97],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, 'transferFrom'>);
}
