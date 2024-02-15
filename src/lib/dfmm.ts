import { useConfig } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { dfmmABI } from './abis/dfmm';

// G3M 0xB5C2c5a4000FB230b289bB54f8b48F4dd8075F3D
// LogNormal 0x6A74a571c638dDDF13ae52F48A37D1019B916520

export async function weth(): Promise<`0x${string}`> {
  const config = useConfig();

  try {
    return readContract(config, {
      abi: dfmmABI,
      address: '0x89a023e3cbccf1c96F00749F87D24C9B1124BaE1',
      functionName: 'weth',
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch WETH');
  }
}
