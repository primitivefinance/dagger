import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'
import { getAddress } from 'viem'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FetchStatus } from '@tanstack/react-query'

import { useGraphQL } from '../../useGraphQL'
import { MarketInfoQueryDocument } from '../../queries/markets'

import { EtherscanLink, LabelWithEtherscan } from '../EtherscanLinkLabels'
import TokenSelector from '../TokenSelector'
import { useTokens } from '@/lib/useTokens'
import { useTradeRoute } from '@/lib/useTradeRoute'
import SwapAction from '@/actions/SwapAction'
import { useMarketRoute } from '@/lib/useMarketRoute'
import useSlippagePreference from '@/lib/useSlippagePreference'
import { useOutputAmount } from '@/lib/useOutputAmount'
import { FALLBACK_MARKET_ADDRESS, shortAddress } from '@/utils/address'
import { formatNumber, formatPercentage } from '@/utils/numbers'

import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'

type TokenInputProps = {
    token: { id: `0x${string}`; symbol: string; name: string }
    setToken: (tokenAddress: `0x${string}`) => void
    amount: string
    setAmount: (amount: string) => void
    disabled: boolean
    disabledTokens: Array<`0x${string}`>
    isFetching: boolean
}

const TokenInput: React.FC<TokenInputProps> = ({
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
                        onBlur={(e) => setAmount(e.target.value)}
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
    const loc = useLocation()
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
                // If either tokenIn or tokenOut is not found, use the first sorted token as a default for the missing one
                const defaultToken = sortedTokens[0]
                const newTokenIn = foundTokenIn || defaultToken
                const newTokenOut =
                    foundTokenOut ||
                    (newTokenIn === defaultToken
                        ? sortedTokens[1]
                        : defaultToken)
                setTokens([newTokenIn, newTokenOut])
            }
        }
    }, [tokenIn, tokenOut, sortedTokens])

    const setTokenIn = (tokenAddress: `0x${string}`): void => {
        setTokenParams(tokenAddress, tokenOut)
    }
    const setTokenOut = (tokenAddress: `0x${string}`): void => {
        setTokenParams(tokenIn, tokenAddress)
    }

    const [clickedShare, setClickedShare] = React.useState(false)

    useEffect(() => {
        if (clickedShare) {
            const timer = setTimeout(() => {
                setClickedShare(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [clickedShare])

    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md items-center justify-between">
                <h4>Trade</h4>

                <Button
                    onClick={() => {
                        navigator.clipboard
                            .writeText(window.location.href)
                            .then(() => setClickedShare(true))
                            .catch((err) =>
                                console.error('Failed to copy URL: ', err)
                            )
                    }}
                    variant="link"
                    size="xs"
                    disabled={clickedShare || loc.pathname === '/'}
                >
                    {clickedShare ? (
                        <p className="flex flex-row gap-sm items-center text-green-500">
                            <CheckIcon /> Copied
                        </p>
                    ) : (
                        <p>Share Trade</p>
                    )}
                </Button>
            </div>
            {tokens && (
                <>
                    <TokenInput
                        token={tokens?.[0]}
                        setToken={setTokenIn}
                        amount={tokenInForm.amount}
                        setAmount={tokenInForm.setAmount}
                        disabledTokens={tokens.map((t) => t?.id)}
                        isFetching={tokenInForm.isFetching}
                        disabled={false}
                    />
                    <TokenInput
                        token={tokens?.[1]}
                        setToken={setTokenOut}
                        amount={tokenOutForm.amount}
                        setAmount={tokenOutForm.setAmount}
                        disabled={true}
                        disabledTokens={tokens.map((t) => t?.id)}
                        isFetching={tokenOutForm.isFetching}
                    />
                </>
            )}
        </div>
    )
}

const Summary = ({
    marketRoute,
}: {
    marketRoute: `0x${string}`
}): JSX.Element => {
    const { address, isConnected } = useAccount()
    const [slippage, _setSlipage] = useSlippagePreference()
    const { getTokenIn, getTokenOut } = useTradeRoute()
    const tokenIn = getTokenIn()
    const tokenOut = getTokenOut()

    const totalCost = tokenIn === null && tokenOut === null ? 0 : 100
    return (
        <div className="flex flex-col gap-0">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="flex flex-row gap-sm data-[state=open]:border-b bg-muted/50 p-md">
                        <div className="flex flex-row items-center gap-sm p-0 w-full justify-between">
                            <h4>Summary</h4>
                            <div className="flex flex-row items-center gap-sm p-0 w-full justify-end">
                                <p className="text-muted dark:text-muted-foreground">
                                    {formatNumber(100, 'USD')}
                                </p>
                                <ArrowRightIcon className="text-muted dark:text-muted-foreground" />
                                <p className="text-muted dark:text-muted-foreground">
                                    {formatNumber(100, 'USD')}
                                </p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-xs p-md">
                            <div className="flex flex-row gap-1 items-center justify-between">
                                <p>Total cost</p>
                                <p
                                    className={`px-2 ${totalCost == 0 ? 'text-muted dark:text-muted-foreground' : ''}`}
                                >
                                    {formatNumber(totalCost, 'USD')}
                                </p>
                            </div>

                            <div className="flex flex-row gap-1 items-center justify-between">
                                <p>Max Slippage</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="link" size="xs">
                                            {formatPercentage(slippage)}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            Slippage
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup
                                            value={slippage}
                                            onValueChange={_setSlipage}
                                        >
                                            <DropdownMenuRadioItem value={0.01}>
                                                {formatPercentage(0.01)}
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={0.02}>
                                                {formatPercentage(0.02)}
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={0.03}>
                                                {formatPercentage(0.03)}
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <LabelWithEtherscan
                                label={<p>Route through</p>}
                                address={marketRoute}
                            />

                            {isConnected && (
                                <LabelWithEtherscan
                                    label={<p>Pay from</p>}
                                    address={address as `0x${string}`}
                                />
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export const ConnectToTrade = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Submit</h4>
            </div>
            <div className="flex flex-col items-center justify-center text-center w-full py-lg">
                <h4 className="text-muted dark:text-muted-foreground/50">
                    Connect to Trade
                </h4>
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

function useTokenFormState(
    initialAmount = '',
    syncOutputAmountQuery?: boolean
): TokenForm {
    const [amount, setAmount] = React.useState(initialAmount)
    const [isFetching, setFetchStatus] = React.useState('idle')

    const { getOutputAmount, setOutputAmount } = useOutputAmount()

    // Effect to initialize and synchronize the amount with the URL query parameter
    useEffect(() => {
        if (syncOutputAmountQuery) {
            const outputAmount = getOutputAmount()
            if (outputAmount !== null) {
                setAmount(outputAmount)
            }
        }
    }, [getOutputAmount, syncOutputAmountQuery])

    // Function to handle amount change on input blur
    const handleAmountChange = (newAmount: string): void => {
        setAmount(newAmount)
        if (syncOutputAmountQuery) {
            setOutputAmount(newAmount)
        }
    }

    return {
        amount,
        setAmount: handleAmountChange,
        isFetching: isFetching === 'fetching',
        setFetchStatus,
    }
}

const TradeView = (): JSX.Element => {
    const { isConnected } = useAccount()

    const { id } = useMarketRoute()
    const tokenInForm = useTokenFormState()
    const tokenOutForm = useTokenFormState('', true)

    return (
        <div className="flex flex-col gap-0 border flex-grow">
            <SwapWidget tokenInForm={tokenInForm} tokenOutForm={tokenOutForm} />
            {isConnected ? (
                <>
                    <Summary marketRoute={id} />
                    <SwapAction
                        marketRoute={id}
                        amountIn={tokenInForm.amount}
                        setAmountOut={tokenOutForm.setAmount}
                        setTokenOutFetching={tokenOutForm.setFetchStatus}
                    />
                </>
            ) : (
                <ConnectToTrade />
            )}
        </div>
    )
}

export default TradeView
