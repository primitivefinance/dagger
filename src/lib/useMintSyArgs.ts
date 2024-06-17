import { useAccount, useReadContract } from 'wagmi'
import { getAddress, zeroAddress } from 'viem'
import { useEffect } from 'react'

import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { toWad } from '@/utils/numbers'

import { ArgsHookReturn } from './useSwapArgs'
import useSlippagePreference from './useSlippagePreference'
import { SYABI } from './abis/sy'

// For SY.deposit{ETH}() calls.
export function useMintSyArgs({
    syAddress,
    amountIn,
    enabled,
}: {
    syAddress: string
    amountIn: string
    enabled: boolean
}): ArgsHookReturn {
    const { address } = useAccount()
    const { setTxHash, txHash, txReceipt } = useTransactionStatus({})
    const [slippage] = useSlippagePreference()

    const inputAmount = !isNaN(parseFloat(amountIn))
        ? toWad(parseFloat(amountIn))
        : 0n
    let SY = undefined
    try {
        SY = getAddress(syAddress)
    } catch (e) {}

    const PENDLE_ETH = zeroAddress as `0x${string}`

    const prepareFunctionName = 'previewDeposit'
    const functionName = 'deposit' as const

    const { data, status, error, failureReason, fetchStatus } = useReadContract(
        {
            abi: SYABI,
            address: SY as `0x${string}`,
            account: address as `0x${string}`,
            functionName: prepareFunctionName,
            args: [PENDLE_ETH, inputAmount],
            query: {
                enabled: enabled && !!SY,
            },
        }
    )

    const outputAmount = (data as bigint) ?? 0n
    const minOutputAmount = outputAmount
        ? (outputAmount * toWad(1 - slippage)) / toWad(1)
        : 0n

    useEffect(() => {
        if (error || failureReason) {
            console.log('useMintSyArgs error: ', error, failureReason)
        }
    }, [error, failureReason])

    return {
        amountOut: minOutputAmount,
        status,
        fetchStatus,
        payload: {
            from: address as `0x${string}`,
            to: SY as `0x${string}`,
            contractName: 'SY' as const,
            functionName,
            args: [
                address as `0x${string}`,
                PENDLE_ETH,
                inputAmount,
                minOutputAmount,
            ],
            value: inputAmount,
            txHash,
            txReceipt,
            setTxHash,
        },
    }
}
