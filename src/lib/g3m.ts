import { parseEther } from 'viem'
import { config } from '../App'
import { readContract } from 'wagmi/actions'
import { nG3mSolverAbi } from './abis/nG3mSolver'
import { nG3mSolver } from '@/data/contracts'

export function computePrice(
    reserveX: number,
    reserveY: number,
    weightX: number,
    weightY: number
): number {
    return reserveY / weightY / (reserveX / weightX)
}

export function computeAndFormatPrice(
    reserveX: number,
    reserveY: number,
    weightX: number,
    weightY: number
): string {
    const price = computePrice(reserveX, reserveY, weightX, weightY)
    return isNaN(price)
        ? '0.0'
        : price.toLocaleString(undefined, {
              maximumFractionDigits: 8,
              minimumFractionDigits: 2,
          })
}

export function computeL(x: bigint, y: bigint, wX: bigint, wY: bigint): bigint {
    const a = x / parseEther('1') ** wX
    const b = y / parseEther('1') ** wY
    return a * b
}

export function computeLNumber(
    x: number,
    y: number,
    wX: number,
    wY: number
): number {
    const a = x ** wX
    const b = y ** wY
    return a * b
}

export function computeReservesFromNumeraire(
    amountNumeraire: bigint,
    S: bigint,
    wT: bigint,
    wNumeraire: bigint
): bigint {
    return wt
}

export function getInitialPoolData(
    numeraireAmount: bigint,
    prices: bigint[],
    weights: bigint[],
    swapFee: bigint,
    controller: `0x${string}`
): Promise<`0x${string}`> {
    const reserves: bigint[] = []
    const numerairePrice = prices[prices.length - 1]
    const numeraireWeight = weights[weights.length - 1]

    for (let i = 0; i < prices.length - 1; i++) {
        const amountT = computeReservesFromNumeraire(
            numeraireAmount,
            numerairePrice,
            weights[i],
            numeraireWeight
        )
        reserves[i] = amountT
    }
    try {
        return readContract(config, {
            abi: nG3mSolverAbi,
            address: nG3mSolver,
            functionName: 'getInitialPoolData',
            args: [
                reserveX,
                S,
                { wX, wY: parseEther('1') - wX, swapFee, controller },
            ],
        }) as Promise<`0x${string}`>
    } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch initial pool data')
    }
}

export async function allocateGivenX(poolId: bigint, x: bigint): Promise<any> {
    try {
        return readContract(config, {
            abi: nG3mSolverAbi,
            address: nG3mSolver,
            functionName: 'allocateGivenX',
            args: [poolId, x],
        })
    } catch (e) {
        console.error(e)
        throw new Error('Failed to call allocate given X')
    }
}

export async function deallocateGivenX(
    poolId: bigint,
    x: bigint
): Promise<any> {
    try {
        return readContract(config, {
            abi: nG3mSolverAbi,
            address: nG3mSolver,
            functionName: 'deallocateGivenX',
            args: [poolId, x],
        })
    } catch (e) {
        console.error(e)
        throw new Error('Failed to call deallocate given X')
    }
}
