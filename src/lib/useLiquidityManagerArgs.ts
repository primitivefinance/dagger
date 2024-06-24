import { useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { getAddress } from 'viem'

import { liquidityManagerABI } from './abis/liquidityManager'
import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { toWad } from '@/utils/numbers'

import useSlippagePreference from './useSlippagePreference'
import { ArgsHookReturn } from './useSwapArgs'
import { timestamp } from '@/utils/dates'
import { rmmABI } from './abis/rmm'

export function useLiquidityManagerArgs({
    marketId,
    liquidityManagerAddress,
    pyIndexStored,
    reserveX,
    reserveY,
    isZapSy,
    amountIn,
    enabled,
}: {
    marketId: string
    liquidityManagerAddress: string
    pyIndexStored: bigint
    reserveX: bigint
    reserveY: bigint
    isZapSy: boolean
    amountIn: string
    enabled: boolean
}): ArgsHookReturn {
    const { address } = useAccount()
    const { setTxHash, txHash, txReceipt } = useTransactionStatus({})
    const [slippage] = useSlippagePreference()

    const inputAmount = !isNaN(parseFloat(amountIn))
        ? toWad(parseFloat(amountIn))
        : 0n

    let RMM = undefined
    try {
        RMM = getAddress(marketId)
    } catch (e) {}

    const prepareFunctionName = isZapSy
        ? 'computeSyToPtToAddLiquidity'
        : 'computePtToSyToAddLiquidity'
    const functionName = isZapSy ? 'allocateFromSy' : 'allocateFromPt'

    const { data, status, error, failureReason, fetchStatus } = useReadContract(
        {
            abi: liquidityManagerABI,
            address: liquidityManagerAddress as `0x${string}`,
            account: address as `0x${string}`,
            functionName: prepareFunctionName,
            args: [
                {
                    rmm: RMM,
                    rX: reserveX,
                    rY: reserveY,
                    index: pyIndexStored,
                    maxIn: inputAmount,
                    blockTime: timestamp(),
                    initialGuess: 0n,
                    epsilon: 10_000n,
                },
            ],
            query: {
                enabled: enabled && !!RMM && !!liquidityManagerAddress,
            },
        }
    )

    console.log({ data, failureReason })

    const swapInput = (data?.[0] as bigint) ?? 0n
    const swapOutput = (data?.[1] as bigint) ?? 0n - 1000n

    const {
        data: prepareAllocateData,
        status: prepareAllocateStatus,
        error: prepareAllocateError,
        failureReason: prepareAllocateFailureReason,
    } = useReadContract({
        abi: rmmABI,
        address: RMM as `0x${string}`,
        account: address as `0x${string}`,
        functionName: 'prepareAllocate',
        args: [inputAmount - swapInput, swapOutput, pyIndexStored],
        query: {
            enabled: enabled && !!RMM && !!data,
        },
    })

    const minLiquidityDelta = (prepareAllocateData?.[2] as bigint) ?? 0n
    const outputAmount = minLiquidityDelta
    const minOutputAmount = outputAmount
        ? (outputAmount * toWad(1 - slippage)) / toWad(1)
        : 0n
    const lptMinted = (prepareAllocateData?.[3] as bigint) ?? 0n

    useEffect(() => {
        if (error || failureReason) {
            console.log('useLiquidityManagerArgs error: ', error, failureReason)
        }

        if (prepareAllocateError || prepareAllocateFailureReason) {
            console.log(
                'useLiquidityManagerArgs prepareAllocateError: ',
                prepareAllocateError,
                prepareAllocateFailureReason
            )
        }
    }, [
        error,
        failureReason,
        prepareAllocateError,
        prepareAllocateFailureReason,
    ])

    console.log({
        rmm: RMM,
        amountIn: inputAmount,
        minOut: swapOutput,
        minLiquidtyDelta: minOutputAmount,
        initialGuess: swapInput,
        epsilon: toWad(5) / 1000n,
    })

    return {
        amountOut: lptMinted,
        status,
        fetchStatus,
        payload: {
            from: address as `0x${string}`,
            to: liquidityManagerAddress as `0x${string}`,
            contractName: 'liquidityManager',
            functionName,
            args: [
                {
                    rmm: RMM,
                    amountIn: inputAmount,
                    minOut: swapOutput,
                    minLiquidityDelta: minOutputAmount,
                    initialGuess: swapInput,
                    epsilon: toWad(5) / 1000n,
                } as const,
            ],
            value: 0n,
            txHash,
            txReceipt,
            setTxHash,
        },
    }
}
