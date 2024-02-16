import { ReadContractReturnType, parseEther } from "viem";
import { config } from "../App";
import { readContract } from "wagmi/actions";
import { g3mSolverAbi } from "./abis/g3mSolver";

const G3MSolver = '0x05792cA1459699A3DA6e6E7Af295E3C792D5e038';

export function computePrice(reserveX: number, reserveY: number, weightX: number, weightY: number): number {
  return (reserveY / weightY) / (reserveX / weightX);
}

export function computeAndFormatPrice(reserveX: number, reserveY: number, weightX: number, weightY: number): string {
  const price = computePrice(reserveX, reserveY, weightX, weightY);
  return isNaN(price) ? '0.0' : price.toLocaleString(undefined, { maximumFractionDigits: 8, minimumFractionDigits: 2 });
}

export function computeL(x: bigint, y: bigint, wX: bigint, wY: bigint): bigint {
  const a = x / parseEther('1') ** wX;
  const b = y / parseEther('1') ** wY;
  return a * b;
}

export function computeLNumber(x: number, y: number, wX: number, wY: number): number {
  const a = x ** wX;
  const b = y ** wY;
  return a * b;
}

export function getInitialPoolData(reserveX: bigint, S: bigint, wX: bigint, swapFee: bigint, controller: `0x${string}`): Promise<`0x${string}`> {
  console.log(
    reserveX, S, wX, parseEther('1') - wX, swapFee, controller
  );

  try {
    return readContract(config, {
      abi: g3mSolverAbi,
      address: G3MSolver,
      functionName: 'getInitialPoolData',
      args: [reserveX, S, { wX, wY: parseEther('1') - wX, swapFee, controller }],
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch initial pool data');
  }
}

export async function allocateGivenX(poolId: bigint, x: bigint): Promise<any> {
  try {
    return readContract(config, {
      abi: g3mSolverAbi,
      address: G3MSolver,
      functionName: 'allocateGivenX',
      args: [poolId, x],
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to call allocate given X');
  }
}

export async function deallocateGivenX(poolId: bigint, x: bigint): Promise<any> {
  try {
    return readContract(config, {
      abi: g3mSolverAbi,
      address: G3MSolver,
      functionName: 'deallocateGivenX',
      args: [poolId, x],
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to call deallocate given X');
  }
}