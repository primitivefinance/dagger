import React, { useEffect } from 'react'
import TransactionDrawer from '../TransactionDrawer'
import { useGraphQL } from '../../useGraphQL'
import {
    MarketInfoQueryDocument,
    allMarketsQueryDocument,
} from '../../queries/markets'
import { Input } from '../ui/input'
import { overrideAllowanceDFMM } from '@/utils/simulate'
import TransactionButton from '../TransactionButton'
import { useAccount } from 'wagmi'
import { useTransactionStatus } from '../TransactionButton/useTransactionStatus'
import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import TokenSelector from '../TokenSelector'
import { getAddress } from 'viem'
import { tokens as ListedTokens } from '@/data/tokens'
import { Button } from '../ui/button'
import { useTokens } from '@/lib/useTokens'
import { useLocation, useParams } from 'react-router-dom'
import { useTradeRoute } from '@/lib/useTradeRoute'

const TokenInput = ({
    token,
    setToken,
    amount,
    setAmount,
    disabled,
    disabledTokens,
}): JSX.Element => {
    console.log({ token })
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
                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    disabled={disabled} // todo
                    className="py-8 px-4 text-4xl"
                />
            </div>
        </div>
    )
}

const SwapWidget = ({ id }): JSX.Element => {
    const { getTokenIn, getTokenOut, setTokenParams } = useTradeRoute()
    const tokenIn = getTokenIn()
    const tokenOut = getTokenOut()

    const [independentAmount, setIndependentAmount] = React.useState('')
    const [dependentAmount, setDependentAmount] = React.useState('')
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })
    const market = data?.markets?.items?.[0]

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
                        amount={independentAmount}
                        setAmount={setIndependentAmount}
                        disabled={false}
                        disabledTokens={tokens.map((t) => t.id)}
                    />
                    <TokenInput
                        token={tokens?.[1]}
                        setToken={setTokenOut}
                        amount={dependentAmount}
                        setAmount={setDependentAmount}
                        disabled={true}
                        disabledTokens={tokens.map((t) => t.id)}
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

const Action = ({ market }): JSX.Element => {
    const { address } = useAccount()
    const allocatePayload = ''
    const { setTxHash: setTx, txHash, txReceipt } = useTransactionStatus({})

    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Submit</h4>
            </div>
            <div className="flex flex-col gap-sm bg-blue/25 p-md">
                <div className="flex flex-col gap-xs">
                    <p>Review Transaction</p>
                    <p className="text-muted dark:text-muted-foreground">
                        You are about to swap 0.1 ETH for 100 DAI
                    </p>
                </div>
                <TransactionButton
                    key={market?.id}
                    contractName="dfmm"
                    from={address}
                    to={market?.id}
                    args={[allocatePayload]}
                    setTxHash={setTx}
                    txHash={txHash as `0x${string}`}
                    txReceipt={txReceipt}
                    functionName="allocate"
                >
                    Swap
                </TransactionButton>
            </div>
        </div>
    )
}

const TradeView = ({ id }): JSX.Element => {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })
    const market = data?.markets?.items?.[0]

    const { id: marketId } = useParams()

    const [amount, setAmount] = React.useState('')
    const [depositAll, setDepositAll] = React.useState(false)
    const tokensToApprove: any[] = []

    const { address } = useAccount()

    const { setTxHash: setTx, txHash, txReceipt } = useTransactionStatus({})

    const allocatePayload = ''

    return (
        <div className="flex flex-col gap-0 border flex-grow">
            <SwapWidget id={id} />
            <Summary market={market} />
            <Action market={market} />
        </div>
    )
}

export default TradeView
