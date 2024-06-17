import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { useEffect, useMemo } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { rmmABI } from './abis/rmm'
import { ETH_ADDRESS } from './useTokens'
import { zeroAddress } from 'viem'
import { toWad } from '@/utils/numbers'
import { timestamp } from '@/utils/dates'
import { TransactionButtonProps } from '@/components/TransactionButton'
import useSlippagePreference from './useSlippagePreference'
import { FetchStatus } from '@tanstack/react-query'

export type ArgsHookReturn = {
    amountOut?: bigint
    status: 'idle' | 'loading' | 'success' | 'error' | 'pending'
    fetchStatus: FetchStatus
    payload: TransactionButtonProps
}

export function useSwapArgsSyAndPt({
    marketId,
    pyIndexStored,
    amountIn,
    isSwapSyForPt,
    enabled,
}): ArgsHookReturn {
    const { address } = useAccount()
    const { setTxHash, txHash, txReceipt } = useTransactionStatus({})
    const [slippage] = useSlippagePreference()

    // convert the input amount to the proper units
    const inputAmount = !isNaN(parseFloat(amountIn))
        ? toWad(parseFloat(amountIn))
        : 0n

    const prepareFunctionName = isSwapSyForPt
        ? 'prepareSwapSyIn'
        : 'prepareSwapPtIn'

    const functionName = isSwapSyForPt ? 'swapExactSyForPt' : 'swapExactPtForSy'

    const prepareArgs = useMemo(() => {
        return [inputAmount, timestamp(), pyIndexStored as bigint]
    }, [pyIndexStored, inputAmount])

    const { data, status, error, failureReason, fetchStatus } = useReadContract(
        {
            abi: rmmABI,
            address: marketId,
            account: address as `0x${string}`,
            functionName: prepareFunctionName,
            args: prepareArgs,
            query: {
                enabled,
            },
        }
    )

    const outputAmount = (data?.[1] as bigint) ?? 0n
    const minOutputAmount = outputAmount
        ? (outputAmount * toWad(1 - slippage)) / toWad(1)
        : 0n

    useEffect(() => {
        if (error || failureReason) {
            console.log('useSwapArgsSyAndPt error: ', error, failureReason)
        }
    }, [error, failureReason])

    return {
        amountOut: outputAmount,
        status,
        fetchStatus,
        payload: {
            from: address as `0x${string}`,
            to: marketId as `0x${string}`,
            contractName: 'rmm' as const,
            functionName,
            args: [inputAmount, outputAmount, address as `0x${string}`],
            txHash,
            txReceipt,
            setTxHash,
        },
    }
}

export function useSwapExactTokenForYtArgs({
    marketId,
    pyIndexStored,
    tokenIn,
    amountIn,
    enabled,
}): ArgsHookReturn {
    const { address } = useAccount()
    const { setTxHash, txHash, txReceipt } = useTransactionStatus({})
    const [slippage] = useSlippagePreference()

    // use the frontend's defined ETH address instead.
    const inputToken =
        tokenIn !== null
            ? tokenIn.comp(ETH_ADDRESS)
                ? zeroAddress
                : tokenIn
            : zeroAddress

    // convert the input amount to the proper units
    const inputAmount = !isNaN(parseFloat(amountIn))
        ? toWad(parseFloat(amountIn))
        : 0n

    const guess = toWad(100)

    // Prepares the arguments for `swapExactTokenForYt`
    const { data, status, error, fetchStatus, failureReason } = useReadContract(
        {
            abi: rmmABI,
            address: marketId,
            account: address as `0x${string}`,
            functionName: 'computeTokenToYt',
            args: [
                pyIndexStored as bigint,
                inputToken as `0x${string}`,
                inputAmount as bigint,
                timestamp(),
                guess,
            ],
            query: {
                enabled,
            },
        }
    )

    const intermediaryInputPt = (data?.[0] as bigint) ?? 0n
    const outputAmount = (data?.[1] as bigint) ?? 0n
    const minOutputAmount = outputAmount
        ? (outputAmount * toWad(1 - slippage)) / toWad(1)
        : 0n

    useEffect(() => {
        if (error || failureReason) {
            console.log(
                'useSwapExactTokenForYtArgs error: ',
                error,
                failureReason
            )
        }
    }, [error, failureReason])

    const args = useMemo(() => {
        if (data) {
            return [
                inputToken,
                inputAmount,
                outputAmount,
                intermediaryInputPt,
                minOutputAmount,
                address as `0x${string}`,
            ]
        } else {
            return []
        }
    }, [
        data,
        inputToken,
        inputAmount,
        outputAmount,
        intermediaryInputPt,
        minOutputAmount,
        address,
    ])

    const payload: TransactionButtonProps = {
        from: address as `0x${string}`,
        to: marketId as `0x${string}`,
        contractName: 'rmm' as const,
        functionName: 'swapExactTokenForYt' as const,
        args,
        txHash,
        txReceipt,
        setTxHash,
        value: inputToken.comp(ETH_ADDRESS) ? inputAmount : 0n,
    }

    return {
        amountOut: outputAmount,
        status,
        fetchStatus,
        payload,
    }
}
