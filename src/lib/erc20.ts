import { useConfig } from 'wagmi';
import { readContract, multicall } from 'wagmi/actions';
import { erc20Abi, formatUnits } from 'viem';
import { config } from '../App';

export async function balanceOf(token: `0x${string}`, account: `0x${string}`): Promise<string> {
  try {
    const result = await multicall(config, {
      contracts: [
        {
          abi: erc20Abi,
          address: token,
          functionName: 'balanceOf',
          args: [account],
        },
        {
          abi: erc20Abi,
          address: token,
          functionName: 'decimals',
        },
      ],
    });

    return formatUnits(result[0].result!, result[1].result!);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch balance');
  }
}