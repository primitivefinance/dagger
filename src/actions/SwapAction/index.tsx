import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount, useReadContract } from 'wagmi'
import { erc20Abi, getAddress, parseAbi } from 'viem'
import { FetchStatus } from '@tanstack/react-query'

import { useGraphQL } from '../../useGraphQL'
import { MarketInfoQueryDocument } from '../../queries/markets'
import TransactionButton from '@/components/TransactionButton'
import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { rmmABI } from '@/lib/abis/rmm'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { formatNumber, fromWad, toWad } from '@/utils/numbers'
import { useTokens } from '@/lib/useTokens'
import { Skeleton } from '@/components/ui/skeleton'
import ApproveAction from '../ApproveAction'

/**
 * Wrapper for TransactionButton component to be used for Swapping.
 *
 * @dev To execute swaps we have to have two tokens selected, and be smart about choosing the right function based on the selection.
 * We also have to call the `prepareSwap` function to get the estimated amount out. We have to adjust this amount based on the users slippage tolerance preference.
 * Token selection can be fetched via query params, from the `useTradeRoute` hook.
 * Input amount and computed output amount can be passed as a parameter in state and then returned.
 * If there is an invalid state, we will return a disabled transaction button.
 */
const SwapAction: React.FC<{
    amountIn: string
    setAmountOut: (amount: string) => void
    setTokenOutFetching: (status: FetchStatus) => void
}> = ({ amountIn, setAmountOut, setTokenOutFetching }) => {
    const { id } = useParams()
    const { data: marketData } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })
    const market = marketData?.markets?.items?.[0]
    const {
        data: { sorted: sortedTokens },
    } = useTokens({})
    const { getTokenIn, getTokenOut } = useTradeRoute()
    const tokenIn = getTokenIn()
    const tokenOut = getTokenOut()
    const { address } = useAccount()
    const { setTxHash, txReceipt } = useTransactionStatus({})
    const tokenInMeta =
        tokenIn &&
        sortedTokens?.find((tkn) => getAddress(tkn.id) === getAddress(tokenIn))
    const tokenOutMeta =
        tokenOut &&
        sortedTokens?.find((tkn) => getAddress(tkn.id) === getAddress(tokenOut))

    const { data: allowance, status: allowanceStatus } = useReadContract({
        abi: erc20Abi,
        functionName: 'allowance',
        address: tokenIn as `0x${string}`,
        args: [address as `0x${string}`, id as `0x${string}`],
    })

    const preparedIn =
        !isNaN(parseFloat(amountIn)) && toWad(parseFloat(amountIn))

    const approved = allowance && preparedIn && allowance >= preparedIn

    const props = {
        key: id as `0x${string}`,
        from: address as `0x${string}`,
        to: id as `0x${string}`,
        setTxHash,
        txReceipt,
        args: [preparedIn, 1, address as `0x${string}`, ''],
        contractName: 'rmm' as const,
    }

    const timestamp = Math.floor(Date.now() / 1000)

    const { data: ytAddress } = useReadContract({
        abi: rmmABI,
        address: id as `0x${string}`,
        functionName: 'YT',
    })

    const { data: storedIndex } = useReadContract({
        abi: parseAbi([
            'function pyIndexStored() external view returns(uint256)',
        ] as const),
        address: ytAddress as `0x${string}`,
        functionName: 'pyIndexStored',
    })

    const {
        data: preparedSwap,
        status,
        error,
        fetchStatus: fetchAmountOutStatus,
    } = useReadContract({
        abi: rmmABI,
        address: id as `0x${string}`,
        account: address as `0x${string}`,
        functionName: 'prepareSwap',
        args: [tokenIn, tokenOut, preparedIn, timestamp, storedIndex],
        query: {
            enabled:
                !!id &&
                !!tokenIn &&
                !!tokenOut &&
                !!preparedIn &&
                !!storedIndex,
        },
    })

    useEffect(() => {
        setTokenOutFetching(fetchAmountOutStatus)
    }, [fetchAmountOutStatus, setTokenOutFetching])

    const [amountInWad, amountOutWad, amountOut, deltaLiquidity, strikePrice] =
        preparedSwap || []

    useEffect(() => {
        if (amountOutWad && status === 'success') {
            setAmountOut(fromWad(amountOutWad).toString())
        }
    }, [amountOut, amountOutWad, status])

    let action = null
    if (tokenIn === null || tokenOut === null || !preparedIn) {
        action = (
            <TransactionButton disabled {...props} functionName={'swapX'} />
        )
    } else if (!approved) {
        action = (
            <ApproveAction
                token={tokenIn as `0x${string}`}
                spender={id as `0x${string}`}
                amount={amountIn}
                setTxHash={setTxHash}
                txReceipt={txReceipt}
            />
        )
    } else {
        action = <TransactionButton {...props} functionName={'swapX'} />
    }

    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Submit</h4>
            </div>
            <div className="flex flex-col gap-xl bg-blue/25 p-md">
                <div className="flex flex-col gap-xs">
                    <p>Review Transaction</p>
                    {error ? (
                        <p className="truncate">{error.message}</p>
                    ) : amountIn ? (
                        <div className="flex flex-wrap gap-xs">
                            {!approved ? (
                                <>
                                    <p className="text-muted dark:text-muted-foreground">
                                        Approving{' '}
                                    </p>
                                    <p className="text-primary">
                                        {formatNumber(parseFloat(amountIn))}{' '}
                                    </p>
                                    <p className="text-muted dark:text-muted-foreground">
                                        {tokenInMeta?.symbol}.
                                    </p>
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <p className="text-muted dark:text-muted-foreground">
                                        Swapping{' '}
                                    </p>
                                    <p className="text-primary">
                                        {formatNumber(parseFloat(amountIn))}{' '}
                                    </p>
                                    <p className="text-muted dark:text-muted-foreground">
                                        {tokenInMeta?.symbol} for{' '}
                                    </p>
                                    {fetchAmountOutStatus === 'fetching' ||
                                    !amountOutWad ? (
                                        <Skeleton className={`w-auto h-auto`}>
                                            <p className="text-transparent dark:text-transparent selection:text-transparent">
                                                100.00
                                            </p>
                                        </Skeleton>
                                    ) : (
                                        <p className="text-primary">
                                            {formatNumber(
                                                fromWad(amountOutWad)
                                            )}
                                        </p>
                                    )}{' '}
                                    <p className="text-muted dark:text-muted-foreground">
                                        {tokenOutMeta?.symbol}.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <p className="text-muted dark:text-muted-foreground">
                            Select tokens and input amounts to swap.
                        </p>
                    )}
                </div>

                {action}
            </div>
        </div>
    )
}

export default SwapAction
