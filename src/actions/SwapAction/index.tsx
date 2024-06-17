import React, { useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { erc20Abi, getAddress, parseAbi, zeroAddress } from 'viem'
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
import {
    useSwapArgsSyAndPt,
    useSwapExactTokenForYtArgs,
} from '@/lib/useSwapArgs'
import { useMintSyArgs } from '@/lib/useMintSyArgs'

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
    ETH_TO_YT = 'ETH_TO_YT',
    YT_TO_ETH = 'YT_TO_ETH',
}

function getTradeRoute(
    universe: TokenUniverse,
    tokenIn: string,
    tokenOut: string
): TradeRoutes {
    if (tokenIn === universe.native && tokenOut === universe.sy) {
        return TradeRoutes.ETH_TO_SY
    } else if (tokenIn === universe.sy && tokenOut === universe.native) {
        return TradeRoutes.SY_TO_ETH
    } else if (tokenIn === universe.sy && tokenOut === universe.pt) {
        return TradeRoutes.SY_TO_PT
    } else if (tokenIn === universe.pt && tokenOut === universe.sy) {
        return TradeRoutes.PT_TO_SY
    } else if (
        tokenIn === universe.native &&
        tokenOut &&
        universe.yt &&
        getAddress(tokenOut) === getAddress(universe.yt)
    ) {
        return TradeRoutes.ETH_TO_YT
    } else if (
        tokenOut &&
        universe.yt &&
        getAddress(tokenOut) === getAddress(universe.yt)
    ) {
        return TradeRoutes.SY_TO_YT
    } else if (tokenIn === universe.yt) {
        return TradeRoutes.YT_TO_SY
    } else {
        return TradeRoutes.INVALID
    }
}

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
    marketRoute: `0x${string}`
    amountIn: string
    setAmountOut: (amount: string) => void
    setTokenOutFetching: (status: FetchStatus) => void
}> = ({ marketRoute, amountIn, setAmountOut, setTokenOutFetching }) => {
    // Transaction related info.
    const { address } = useAccount()
    const { txHash, setTxHash, txReceipt } = useTransactionStatus({})

    // Get the market data.
    const { data: marketData } = useGraphQL(MarketInfoQueryDocument, {
        id: marketRoute,
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

    // todo: make sure tokens in ponder match these universe ones.
    const universe = {
        native: ETH_ADDRESS as `0x${string}`,
        wrapped: market?.wrappedNativeAssetId as `0x${string}`,
        ib: market?.ibAssetId as `0x${string}`,
        sy: market?.syId as `0x${string}`,
        pt: market?.ptId as `0x${string}`,
        yt: market?.ytId as `0x${string}`,
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

    const { data: storedIndex, failureReason: storedIndexFailure } =
        useReadContract({
            abi: parseAbi([
                'function pyIndexStored() external view returns(uint256)',
            ] as const),
            address: universe.yt,
            functionName: 'pyIndexStored',
        })

    const isSwapSyForPt = tradeRoute === TradeRoutes.SY_TO_PT
    const isMintSy = tradeRoute === TradeRoutes.ETH_TO_SY
    const isSwapYt =
        tradeRoute === TradeRoutes.SY_TO_YT ||
        tradeRoute === TradeRoutes.ETH_TO_YT

    const {
        amountOut: amtSyMinted,
        payload: payloadSyMint,
        status: prepareSyMint,
        fetchStatus: fetchSharesOutStatus,
    } = useMintSyArgs({
        syAddress: universe.sy,
        amountIn: amountIn,
        enabled: isMintSy,
    })

    const {
        amountOut: amtSwapOut,
        payload: payloadSyAndPt,
        status: prepareSyAndPtSwap,
        fetchStatus: fetchAmountOutStatus,
    } = useSwapArgsSyAndPt({
        marketId: universe.market,
        pyIndexStored: storedIndex,
        amountIn,
        isSwapSyForPt,
        enabled:
            !!storedIndex &&
            !!preparedIn &&
            (tradeRoute === TradeRoutes.SY_TO_PT ||
                tradeRoute === TradeRoutes.PT_TO_SY),
    })

    const {
        amountOut: amtYt,
        payload: payloadYTOut,
        status: prepareTokenToYt,
        fetchStatus: fetchYtOutStatus,
    } = useSwapExactTokenForYtArgs({
        marketId: universe.market,
        pyIndexStored: storedIndex,
        tokenIn: tokenIn as `0x${string}`,
        amountIn,
        enabled:
            !!storedIndex &&
            !!tokenIn &&
            !!amountIn &&
            tradeRoute === TradeRoutes.ETH_TO_YT,
    })

    const estimatedAmountOut =
        tradeRoute === TradeRoutes.ETH_TO_SY
            ? amtSyMinted
            : tradeRoute === TradeRoutes.SY_TO_YT ||
                tradeRoute === TradeRoutes.ETH_TO_YT
              ? amtYt
              : amtSwapOut
                ? amtSwapOut
                : 0

    useEffect(() => {
        if (isMintSy) {
            setTokenOutFetching(fetchSharesOutStatus)
        } else if (isSwapYt) {
            setTokenOutFetching(fetchYtOutStatus)
        } else {
            setTokenOutFetching(fetchAmountOutStatus)
        }
    }, [
        isMintSy,
        fetchSharesOutStatus,
        isSwapYt,
        fetchYtOutStatus,
        fetchAmountOutStatus,
        setTokenOutFetching,
    ])

    useEffect(() => {
        if (estimatedAmountOut) {
            setAmountOut(fromWad(estimatedAmountOut).toString())
        }

        if (!amountIn) {
            setAmountOut('')
        }
    }, [
        amountIn,
        estimatedAmountOut,
        amtSwapOut,
        prepareSyAndPtSwap,
        setAmountOut,
        amtYt,
        prepareTokenToYt,
        amtSyMinted,
        prepareSyMint,
    ])

    let action = null
    if (tokenIn === null || tokenOut === null || !preparedIn) {
        action = <TransactionButton disabled {...payloadSyAndPt} />
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
                action = <TransactionButton {...payloadSyMint} />
                break
            case TradeRoutes.ETH_TO_YT:
                action = <TransactionButton {...payloadYTOut} />
                break
            case TradeRoutes.SY_TO_PT:
                action = <TransactionButton {...payloadSyAndPt} />
                break
            case TradeRoutes.PT_TO_SY:
                action = <TransactionButton {...payloadSyAndPt} />
                break
            default:
                action = <TransactionButton disabled {...payloadSyAndPt} />
                break
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
                    {prepareSyAndPtSwap === 'error' ? (
                        <p className="truncate">Error during preparing.</p>
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
