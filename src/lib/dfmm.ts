import { WriteContractReturnType, readContract, writeContract } from 'wagmi/actions';
import { dfmmABI } from './abis/dfmm';
import { config } from '../App';
import { getInitialPoolData } from './g3m';

export const DFMM = '0x5482ca07ac79d0Ca9F495e1c0Ea8A16780C64731';
export const G3M = '0x67f6C0c97ac803A64B56bd7c9479a259aC959B4a';
export const LogNormal = '0xA63e861915c4627e994031dc35E642FAfE018b33';

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
  reserveX: bigint,
  price: bigint,
  wX: bigint,
  feeRate: bigint,
  controller: `0x${string}`,
): Promise<WriteContractReturnType> {
  const data = await getInitialPoolData(reserveX, price, wX, feeRate, controller);
  console.log(data);

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
