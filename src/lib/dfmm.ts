import {
    WriteContractReturnType,
    readContract,
    writeContract,
} from 'wagmi/actions'
import { encodeAbiParameters } from 'viem'
import { dfmmABI } from './abis/dfmm'
import { config } from '../App'
import { getInitialPoolData } from './g3m'

export const DFMM = '0x1FEbA1856976c9bBfaEA9A731fF5F4Dc2B49ae9d'
export const G3M = '0x89405925eDFD3743FFdEE2538A7FeeC07d534FD3'
export const LogNormal = '0x3AeA2E89DF75865A908C1BC838afae95a479b3F4'

export async function weth(): Promise<`0x${string}`> {
    try {
        return readContract(config, {
            abi: dfmmABI,
            address: DFMM,
            functionName: 'weth',
        })
    } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch WETH')
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
    controller: `0x${string}`
): Promise<WriteContractReturnType> {
    const data = await getInitialPoolData(
        reserveX,
        price,
        wX,
        feeRate,
        controller
    )
    console.log(data)

    try {
        return writeContract(config, {
            abi: dfmmABI,
            address: DFMM,
            functionName: 'init',
            args: [
                {
                    strategy,
                    tokenX,
                    tokenY,
                    data,
                },
            ],
        })
    } catch (e) {
        console.error(e)
        throw new Error('Cannot init pool')
    }
}

export async function allocate(
    poolId: bigint,
    reserveX: bigint,
    reserveY: bigint,
    liquidity: bigint
): Promise<WriteContractReturnType> {
    try {
        return writeContract(config, {
            abi: dfmmABI,
            address: DFMM,
            functionName: 'allocate',
            args: [
                poolId,
                encodeAbiParameters(
                    [
                        { type: 'uint256', name: '' },
                        { type: 'uint256', name: '' },
                        { type: 'uint256', name: '' },
                    ],
                    [reserveX, reserveY, liquidity]
                ),
            ],
        })
    } catch (e) {
        console.error(e)
        throw new Error('Cannot allocate')
    }
}

export async function deallocate(
    poolId: bigint,
    reserveX: bigint,
    reserveY: bigint,
    liquidity: bigint
): Promise<WriteContractReturnType> {
    try {
        return writeContract(config, {
            abi: dfmmABI,
            address: DFMM,
            functionName: 'deallocate',
            args: [
                poolId,
                encodeAbiParameters(
                    [
                        { type: 'uint256', name: '' },
                        { type: 'uint256', name: '' },
                        { type: 'uint256', name: '' },
                    ],
                    [reserveX, reserveY, liquidity]
                ),
            ],
        })
    } catch (e) {
        console.error(e)
        throw new Error('Cannot deallocate')
    }
}
