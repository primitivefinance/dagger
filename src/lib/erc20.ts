import { multicall, writeContract } from 'wagmi/actions';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { config } from '../App';
import { mockERC20Abi } from './abis/mockERC20';

export async function balanceOf(token: `0x${string}`, account: `0x${string}`): Promise<number> {
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

    return parseFloat(formatUnits(result[0].result!, result[1].result!));
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch balance');
  }
}

export async function mint(token: `0x${string}`, account: `0x${string}`, amount: number, decimals: number): Promise<void> {
  try {
    const result = await writeContract(config, {
      address: token,
      abi: mockERC20Abi,
      functionName: 'mint',
      args: [account, parseUnits(amount.toString(), decimals)],
    });
    console.log(result);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to mint');
  }
}