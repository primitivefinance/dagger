import { WriteContractReturnType, readContract, writeContract } from 'wagmi/actions';
import { dfmmABI } from './abis/dfmm';
import { config } from '../App';
import { computeL } from './g3m';
import { encodeAbiParameters } from 'viem';

export const DFMM = '0xc508CB5c417fAdF005b7d30063113B9883a3EB0B';
export const G3M = '0x6001822cfAe06Eb92bf61A86491189cf30c34c4a';
export const LogNormal = '0x3E45fC1bf8d81559A376c7b0Fa26E82D77800aeb';

/*
  DFMM: 0xc508CB5c417fAdF005b7d30063113B9883a3EB0B
  G3M: 0x6001822cfAe06Eb92bf61A86491189cf30c34c4a
  LogNormal: 0x3E45fC1bf8d81559A376c7b0Fa26E82D77800aeb
*/

export async function weth(): Promise<`0x${string}`> {
  try {
    return readContract(config, {
      abi: dfmmABI,
      address: DFMM,
      functionName: 'weth',
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch WETH');
  }
}

export async function init(
  strategy: `0x${string}`,
  tokenX: `0x${string}`,
  tokenY: `0x${string}`,
  x: bigint,
  y: bigint,
  wX: bigint,
  wY: bigint,
  feeRate: bigint,
  controller: `0x${string}`,
): Promise<WriteContractReturnType> {
  const L = computeL(x, y, wX, wY);
  const data = encodeAbiParameters([
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'address' },
  ], [
    x, y, L, wX, wY, feeRate, controller,
  ]);

  try {
    return writeContract(config, {
      abi: dfmmABI,
      address: DFMM,
      functionName: 'init',
      args: [{
        strategy,
        tokenX,
        tokenY,
        data,
      }],
    });
  } catch (e) {
    console.error(e);
    throw new Error('Cannot init pool');
  }
}
