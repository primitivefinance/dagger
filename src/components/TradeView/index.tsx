import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

import { useGraphQL } from '../../useGraphQL'
import { MarketInfoQueryDocument } from '../../queries/markets'
import { Input } from '../ui/input'
import TransactionButton from '../TransactionButton'
import { useTransactionStatus } from '../TransactionButton/useTransactionStatus'
import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import TokenSelector from '../TokenSelector'
import { getAddress } from 'viem'
import { Button } from '../ui/button'
import { useTokens } from '@/lib/useTokens'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { useParams } from 'react-router-dom'
import SwapAction from '@/actions/SwapAction'
import SkeletonText from '../SkeletonText'
import { Skeleton } from '../ui/skeleton'
import { FetchStatus } from '@tanstack/react-query'
import { formatNumber } from '@/utils/numbers'

const TokenInput = ({
    token,
    setToken,
    amount,
    setAmount,
    disabled,
    disabledTokens,
    isFetching,
}): JSX.Element => {
    return (
        <div className="flex flex-row gap-0 border-b">
            <div className="flex flex-grow w-1/2 h-auto justify-start">
                <TokenSelector
                    token={token}
                    setToken={setToken}
                    disabledTokens={disabledTokens}
                />
            </div>
            <div className="flex flex-grow w-1/2 h-auto">
                {isFetching ? (
                    <Skeleton className="rounded-none">
                        <Input disabled className="py-8 px-4 text-4xl" />
                    </Skeleton>
                ) : (
                    <Input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        disabled={disabled} // todo
                        className="py-8 px-4 text-4xl"
                    />
                )}
            </div>
        </div>
    )
}

/**
 * Fairly dumb component for selecting tokens and inputting values.
 */
const SwapWidget: React.FC<{
    tokenInForm: TokenForm
    tokenOutForm: TokenForm
}> = ({ tokenInForm, tokenOutForm }): JSX.Element => {
    const { getTokenIn, getTokenOut, setTokenParams } = useTradeRoute()
    const tokenIn = getTokenIn()
    const tokenOut = getTokenOut()

    const {
        data: { sorted: sortedTokens },
    } = useTokens({})

    const [tokens, setTokens] = React.useState<
        { id: `0x${string}`; symbol: string; name: string }[]
    >([])

    useEffect(() => {
        if (sortedTokens) {
            const foundTokenIn = sortedTokens.find(
                (tkn) => tokenIn && getAddress(tkn.id) === getAddress(tokenIn)
            )
            const foundTokenOut = sortedTokens.find(
                (tkn) => tokenOut && getAddress(tkn.id) === getAddress(tokenOut)
            )

            // Set tokens only if both tokenIn and tokenOut are found in the sortedTokens list
            if (foundTokenIn && foundTokenOut) {
                setTokens([foundTokenIn, foundTokenOut])
            } else {
                // If either tokenIn or tokenOut is not found, reset to an empty array or default selection
                setTokens(sortedTokens)
            }
        }
    }, [tokenIn, tokenOut, sortedTokens])

    const setTokenIn = (tokenAddress: `0x${string}`): void => {
        setTokenParams(tokenAddress, tokenOut)
    }
    const setTokenOut = (tokenAddress: `0x${string}`): void => {
        setTokenParams(tokenIn, tokenAddress)
    }

    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Trade</h4>
            </div>
            {tokens && (
                <>
                    <TokenInput
                        token={tokens?.[0]}
                        setToken={setTokenIn}
                        amount={tokenInForm.amount}
                        setAmount={tokenInForm.setAmount}
                        disabled={false}
                        disabledTokens={tokens.map((t) => t.id)}
                        isFetching={tokenInForm.isFetching}
                    />
                    <TokenInput
                        token={tokens?.[1]}
                        setToken={setTokenOut}
                        amount={tokenOutForm.amount}
                        setAmount={tokenOutForm.setAmount}
                        disabled={true}
                        disabledTokens={tokens.map((t) => t.id)}
                        isFetching={tokenOutForm.isFetching}
                    />
                </>
            )}
        </div>
    )
}

const Summary = ({ market }): JSX.Element => {
    const { address } = useAccount()
    return (
        <div className="flex flex-col gap-0 border-b">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Summary</h4>
            </div>
            <div className="flex flex-col gap-xs p-md">
                <div className="flex flex-row gap-1 items-center justify-between">
                    <p>Total cost</p>
                    <p className="px-2">$100.00</p>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between">
                    <p>Route Bonus</p>
                    <Button variant="link" size="xs">
                        -0.01%
                    </Button>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between">
                    <p>Max Slippage</p>
                    <Button variant="link" size="xs">
                        0.01%
                    </Button>
                </div>
                <LabelWithEtherscan
                    label={<p>Pay from</p>}
                    address={address as `0x${string}`}
                />
            </div>
        </div>
    )
}

type TokenForm = {
    amount: string
    setAmount: (amount: string) => void
    isFetching: boolean
    setFetchStatus: (isFetching: FetchStatus) => void
}

function useTokenFormState(initialAmount = ''): TokenForm {
    const [amount, setAmount] = React.useState(initialAmount)
    const [isFetching, setFetchStatus] = React.useState('idle')

    return {
        amount,
        setAmount,
        isFetching: isFetching === 'fetching',
        setFetchStatus,
    }
}

const TradeView = (): JSX.Element => {
    const { id } = useParams()
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })
    const market = data?.markets?.items?.[0]

    const tokenInForm = useTokenFormState()
    const tokenOutForm = useTokenFormState()

    return (
        <div className="flex flex-col gap-0 border flex-grow">
            <SwapWidget tokenInForm={tokenInForm} tokenOutForm={tokenOutForm} />
            <Summary market={market} />
            <SwapAction
                amountIn={tokenInForm.amount}
                setAmountOut={tokenOutForm.setAmount}
                setTokenOutFetching={tokenOutForm.setFetchStatus}
            />
        </div>
    )
}

export default TradeView
