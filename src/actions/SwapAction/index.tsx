import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount, useReadContract } from 'wagmi'
import { erc20Abi, getAddress, padHex, parseAbi } from 'viem'
import { FetchStatus } from '@tanstack/react-query'

import { useGraphQL } from '../../useGraphQL'
import { MarketInfoQueryDocument } from '../../queries/markets'
import TransactionButton from '@/components/TransactionButton'
import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { rmmABI } from '@/lib/abis/rmm'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { formatNumber, fromWad, toWad } from '@/utils/numbers'
import { ETH_ADDRESS, useTokens } from '@/lib/useTokens'
import { Skeleton } from '@/components/ui/skeleton'
import ApproveAction from '../ApproveAction'

type TokenUniverse = {
    native: `0x${string}`
    wrapped: `0x${string}`
    ib: `0x${string}`
    sy: `0x${string}`
    pt: `0x${string}`
    yt: `0x${string}`
    market: `0x${string}`
}

enum TradeRoutes {
    INVALID = 'INVALID',
    ETH_TO_SY = 'ETH_TO_SY',
    SY_TO_ETH = 'SY_TO_ETH',
    SY_TO_PT = 'SY_TO_PT',
    PT_TO_SY = 'PT_TO_SY',
    SY_TO_YT = 'SY_TO_YT',
    YT_TO_SY = 'YT_TO_SY',
}

function getTradeRoute(
    universe: TokenUniverse,
    tokenIn: string,
    tokenOut: string
): TradeRoutes {
    console.log({ tokenIn, tokenOut })
    if (tokenIn === universe.native && tokenOut === universe.sy) {
        return TradeRoutes.ETH_TO_SY
    } else if (tokenIn === universe.sy && tokenOut === universe.native) {
        return TradeRoutes.SY_TO_ETH
    } else if (tokenIn === universe.sy && tokenOut === universe.pt) {
        return TradeRoutes.SY_TO_PT
    } else if (tokenIn === universe.pt && tokenOut === universe.sy) {
        return TradeRoutes.PT_TO_SY
    } else if (
        tokenOut &&
        universe.yt &&
        getAddress(tokenOut) === getAddress(universe.yt)
    ) {
        console.log('SY_TO_YT')
        return TradeRoutes.SY_TO_YT
    } else if (tokenIn === universe.yt) {
        return TradeRoutes.YT_TO_SY
    } else {
        return TradeRoutes.INVALID
    }
}

const stETHABI = parseAbi([
    'function getPooledEthByShares(uint256 _sharesAmount) external view returns(uint256)',
    'function getSharesByPooledEth(uint256 _ethAmount) external view returns(uint256)',
])

const SY_stETHABI = parseAbi([
    'function stETH() external view returns(address)',
])

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
    // Transaction related info.
    const { address } = useAccount()
    const { txHash, setTxHash, txReceipt } = useTransactionStatus({})

    // Get the market data.
    const { id } = useParams()
    const { data: marketData } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x1791d400741E9168fF678bdeE36DB448E2D9ea28',
    })
    const market = marketData?.markets?.items?.[0]

    // Get the token data using the query params.
    const {
        data: { sorted: sortedTokens },
    } = useTokens({})
    const { getTokenIn, getTokenOut } = useTradeRoute()
    const tokenIn = getTokenIn()
    const tokenOut = getTokenOut()
    const tokenInMeta =
        tokenIn &&
        sortedTokens?.find((tkn) => getAddress(tkn.id) === getAddress(tokenIn))
    const tokenOutMeta =
        tokenOut &&
        sortedTokens?.find((tkn) => getAddress(tkn.id) === getAddress(tokenOut))

    // Build the token universe
    const { data: ytAddress } = useReadContract({
        abi: rmmABI,
        address: id as `0x${string}`,
        functionName: 'YT',
    })
    const ZERO_ADDRESS = padHex(`0x`, { size: 20 }) as `0x${string}`
    const PENDLE_NATIVE_ETH = ZERO_ADDRESS
    const universe = {
        native: ETH_ADDRESS as `0x${string}`,
        wrapped: ZERO_ADDRESS,
        ib: ZERO_ADDRESS,
        sy: market?.pool?.tokenX?.id as `0x${string}`,
        pt: market?.pool?.tokenY?.id as `0x${string}`,
        yt: ytAddress as `0x${string}`,
        market: market?.id as `0x${string}`,
    }

    // --- Prepare the action --- //

    const tradeRoute = getTradeRoute(
        universe,
        tokenIn as `0x${string}`,
        tokenOut as `0x${string}`
    )

    // Prepare the input amount.
    const preparedIn =
        !isNaN(parseFloat(amountIn)) && toWad(parseFloat(amountIn))

    // Check the allowance for the desired tokenIn.
    const { data: allowance, status: allowanceStatus } = useReadContract({
        abi: erc20Abi,
        functionName: 'allowance',
        address: tokenIn as `0x${string}`,
        args: [address as `0x${string}`, universe.market],
    })

    const approved =
        (allowance && preparedIn && allowance >= preparedIn) ||
        tokenIn === ETH_ADDRESS

    // Props on every transaction.
    const globalProps = {
        from: address as `0x${string}`,
        setTxHash,
        txReceipt,
        txHash,
    }

    const syAddress = universe.sy

    const { data: stETHAddress } = useReadContract({
        abi: SY_stETHABI,
        address: syAddress,
        functionName: 'stETH',
        query: { enabled: !!syAddress },
    })

    // Todo: gets the wstETH shares out given eth? figure exactly which is right.
    const { data: stSharesOut, fetchStatus: fetchSharesOutStatus } =
        useReadContract({
            abi: stETHABI,
            address: stETHAddress as `0x${string}`,
            functionName: 'getSharesByPooledEth',
            args: [preparedIn as bigint],
            query: {
                enabled:
                    !!preparedIn &&
                    !!stETHAddress &&
                    tradeRoute === TradeRoutes.ETH_TO_SY,
            },
        })

    let stSharesOutRoundDown = stSharesOut

    // Need to round down the estimated stShares out
    if (stSharesOutRoundDown) {
        stSharesOutRoundDown = stSharesOutRoundDown - 1n
    }

    // For depositing ETH to mint SY.
    const depositProps = {
        ...globalProps,
        key: universe.sy,
        to: universe.sy,
        args: [
            globalProps.from,
            PENDLE_NATIVE_ETH,
            preparedIn as bigint,
            stSharesOutRoundDown as bigint,
        ],
        value: preparedIn as bigint,
        contractName: 'SY' as const,
        query: {
            enabled:
                !!preparedIn &&
                !!stSharesOutRoundDown &&
                tradeRoute === TradeRoutes.ETH_TO_SY,
        },
    }

    const timestamp = Math.floor(Date.now() / 1000)

    const { data: storedIndex } = useReadContract({
        abi: parseAbi([
            'function pyIndexStored() external view returns(uint256)',
        ] as const),
        address: ytAddress as `0x${string}`,
        functionName: 'pyIndexStored',
    })

    const {
        data: preparedSwap,
        status: prepareSwapStatus,
        error,
        fetchStatus: fetchAmountOutStatus,
    } = useReadContract({
        abi: rmmABI,
        address: universe.market,
        account: address as `0x${string}`,
        functionName: 'prepareSwap',
        args: [tokenIn, tokenOut, preparedIn as bigint, timestamp, storedIndex],
        query: {
            enabled:
                !!id &&
                !!tokenIn &&
                !!tokenOut &&
                !!preparedIn &&
                !!storedIndex &&
                (tradeRoute === TradeRoutes.SY_TO_PT ||
                    tradeRoute === TradeRoutes.PT_TO_SY),
        },
    })

    const {
        data: preparedSwapToYT,
        status: prepareSwapToYTStatus,
        error: errorToYT,
        fetchStatus: fetchAmountOutToYTStatus,
    } = useReadContract({
        abi: rmmABI,
        address: universe.market,
        account: address as `0x${string}`,
        functionName: 'computeSYToYT',
        args: [storedIndex, preparedIn as bigint, timestamp, toWad(100)],
        query: {
            enabled:
                !!id &&
                !!tokenIn &&
                !!tokenOut &&
                !!preparedIn &&
                !!storedIndex &&
                tradeRoute === TradeRoutes.SY_TO_YT,
        },
    })

    useEffect(() => {
        setTokenOutFetching(fetchAmountOutStatus)
    }, [fetchAmountOutStatus, setTokenOutFetching])

    const [amountInWad, amountOutWad, amountOut, deltaLiquidity, strikePrice] =
        preparedSwap || []

    const amountYTOut = preparedSwapToYT ? preparedSwapToYT : 0
    console.log({ preparedSwapToYT })

    const estimatedAmountOut =
        tradeRoute === TradeRoutes.SY_TO_YT
            ? amountYTOut
            : amountOutWad
              ? amountOutWad
              : stSharesOutRoundDown
                ? stSharesOutRoundDown
                : 0

    const triggerFlashSwap =
        tradeRoute === TradeRoutes.SY_TO_YT ||
        tradeRoute === TradeRoutes.YT_TO_SY

    // For swapping on RMM.
    const swapProps = {
        ...globalProps,
        key: universe.market,
        to: universe.market,
        args: triggerFlashSwap
            ? [amountYTOut as bigint, 1n, globalProps.from, '0x1111']
            : [preparedIn as bigint, amountOut as bigint, globalProps.from, ''],
        contractName: 'rmm' as const,
    }

    useEffect(() => {
        if (amountOutWad && prepareSwapStatus === 'success') {
            setAmountOut(fromWad(amountOutWad).toString())
        }

        if (amountYTOut && prepareSwapToYTStatus === 'success') {
            setAmountOut(fromWad(amountYTOut as bigint).toString())
        }
    }, [
        amountOut,
        amountOutWad,
        prepareSwapStatus,
        setAmountOut,
        amountYTOut,
        prepareSwapToYTStatus,
    ])

    // Use effect to update the amount out with the deposit estimated sy shares out
    useEffect(() => {
        if (stSharesOutRoundDown && tradeRoute === TradeRoutes.ETH_TO_SY) {
            setAmountOut(fromWad(stSharesOutRoundDown).toString())
        }
    }, [stSharesOutRoundDown, setAmountOut, tradeRoute])

    let action = null
    if (tokenIn === null || tokenOut === null || !preparedIn) {
        action = (
            <TransactionButton disabled {...swapProps} functionName={'swapX'} />
        )
    } else if (!approved) {
        action = (
            <ApproveAction
                token={tokenIn as `0x${string}`}
                spender={universe.market}
                amount={amountIn}
                txHash={txHash}
                setTxHash={setTxHash}
                txReceipt={txReceipt}
            />
        )
    } else {
        switch (tradeRoute) {
            case TradeRoutes.ETH_TO_SY:
                action = (
                    <TransactionButton
                        {...depositProps}
                        functionName="deposit"
                    />
                )
                break
            case TradeRoutes.SY_TO_PT:
                action = (
                    <TransactionButton {...swapProps} functionName={'swapX'} />
                )
                break
            case TradeRoutes.PT_TO_SY:
                action = (
                    <TransactionButton {...swapProps} functionName={'swapY'} />
                )
                break
            case TradeRoutes.SY_TO_YT:
                action = (
                    <TransactionButton {...swapProps} functionName={'swapY'} />
                )
                break
            default:
                action = (
                    <TransactionButton
                        disabled
                        {...swapProps}
                        functionName={'swapX'}
                    />
                )
        }
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
                                    fetchSharesOutStatus === 'fetching' ||
                                    !estimatedAmountOut ? (
                                        <Skeleton className={`w-auto h-auto`}>
                                            <p className="text-transparent dark:text-transparent selection:text-transparent">
                                                100.00
                                            </p>
                                        </Skeleton>
                                    ) : (
                                        <p className="text-primary">
                                            {formatNumber(
                                                fromWad(estimatedAmountOut)
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
