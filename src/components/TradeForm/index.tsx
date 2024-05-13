import { useEffect, useState, createContext } from 'react'
import type { FC } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { balanceOf } from '@/lib/erc20'
import type { ListedToken, ytData, lptData } from '@/data/tokens'
import { tokens as listedTokens } from '@/data/tokens'

import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'

import TokenSelector from '../TokenSelector'
import { Input } from '@/components/ui/input'

export enum txType {
    'buyYT',
    'sellYT',
    'buyPT',
    'sellPT',
    'buyLPT',
    'sellLPT',
}

export type TradeYieldParams = {
    tokenIn: `0x${string}`
    tokenOut: `0x${string}`
    txType: txType
    amountIn: string
    amountOut: string
}

const initialParams: TradeYieldParams = {
    tokenIn: '0x0',
    tokenOut: '0x0',
    txType: txType['buyLPT'],
    amountIn: '',
    amountOut: '',
}

export const TradeYieldContext = createContext<TradeYieldParams>(initialParams)

export type TradeFormProps = {
    children?: React.ReactNode
    tokens: ListedToken[] | null
    setTokens: (tkns: ListedToken[]) => void
    amounts: string[] | null
    setAmounts: (amts: string[]) => void
    tokenType: ytData | lptData | null
}

const TradeForm: FC<TradeFormProps> = ({
    children,
    tokens,
    setTokens,
    amounts,
    setAmounts,
    tokenType,
}) => {
    const navigate = useNavigate()
    const { address } = useAccount()
    const chainId = useChainId()

    const [balances, setBalances] = useState<number[]>([0, 0])

    const setTokenIn = (tokenAddress: `0x${string}`): void => {
        const _token = listedTokens[chainId].find(
            (tkn) => tkn.address === tokenAddress
        )
        setTokens([_token, tokens[1]])
        navigate(`/trade/${_token.symbol}/${tokens[1].symbol}`)
    }
    const setTokenOut = (tokenAddress: `0x${string}`): void => {
        const _token = listedTokens[chainId].find(
            (tkn) => tkn.address === tokenAddress
        )
        setTokens([tokens[0], _token])
        navigate(`/trade/${tokens[0].symbol}/${_token.symbol}`)
    }

    const calculateAmountOut = (inputAmount: string): void => {
        const _amountOut: string = inputAmount
        //insert pricing
        setAmounts([inputAmount, _amountOut])
    }
    useEffect(() => {
        ;(async () => {
            if (address && tokens) {
                const _balances: number[] = []
                for (const _token of tokens) {
                    const balance = await balanceOf(_token.address, address)
                    _balances.push(balance)
                }
                setBalances(_balances)
            }
        })()
    }, [address, tokens])

    if (tokens === null) return <></>
    return (
        <>
            <div className="grid items-center gap-1">
                <h2>Trade</h2>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TokenSelector
                                    tokenLogo={tokens[0].logo}
                                    tokenSymbol={tokens[0].symbol}
                                    setToken={setTokenIn}
                                    disabledTokens={tokens}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    className={
                                        !parseFloat(amounts[0]) &&
                                        amounts[0] !== ''
                                            ? 'border-red-500'
                                            : ''
                                    }
                                    type="text"
                                    placeholder="0.0"
                                    value={amounts[0]}
                                    onChange={(e) => {
                                        calculateAmountOut(e.target.value)
                                    }}
                                />
                                <span>
                                    {'Balance: ' + balances[0]}{' '}
                                    {tokens[0].symbol}
                                </span>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TokenSelector
                                    tokenLogo={tokens[1].logo}
                                    tokenSymbol={tokens[1].symbol}
                                    setToken={setTokenOut}
                                    disabledTokens={tokens}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    className={
                                        !parseFloat(amounts[1]) &&
                                        amounts[1] !== ''
                                            ? 'border-red-500'
                                            : ''
                                    }
                                    type="text"
                                    placeholder="0.0"
                                    value={amounts[1]}
                                    onChange={(e) => {
                                        calculateAmountOut(e.target.value)
                                    }}
                                />
                                <span>
                                    {'Balance: ' + balances[1]}{' '}
                                    {tokens[1].symbol}
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <TradeYieldContext.Provider
                value={{
                    tokenIn: tokens[0].address,
                    tokenOut: tokens[1].address,
                    txType: txType.buyLPT,
                    amountIn: amounts[0],
                    amountOut: amounts[1],
                }}
            >
                {children}
            </TradeYieldContext.Provider>
        </>
    )
}

export default TradeForm
