import { readContract } from 'wagmi/actions';
import { dfmmABI } from './dfmmABI';

export async function getNonce(): Promise<bigint> {
  try {
    const nonce = await readContract({
      address: '0xedfC913a848A8a1567CfA8a81158118c20D3D508',
      abi: dfmmABI,
      functionName: 'nonce',
    });

    return nonce;
  } catch (error) {
    throw new Error('Failed to get nonce');
  }
}