import { multicall, readContract, writeContract } from 'wagmi/actions';
import { erc20Abi, formatUnits, maxUint256, parseUnits } from 'viem';
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

export async function allowance(token: `0x${string}`, owner: `0x${string}`, spender: `0x${string}`): Promise<number> {
  try {
    const result = await readContract(config, {
      abi: erc20Abi,
      address: token,
      functionName: 'allowance',
      args: [owner, spender],
    });

    return parseFloat(result.toString());
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch allowance');
  }
}

export async function approve(token: `0x${string}`, spender: `0x${string}`): Promise<void> {
  try {
    const result = await writeContract(config, {
      address: token,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, maxUint256],
    });
    console.log(result);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to approve');
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