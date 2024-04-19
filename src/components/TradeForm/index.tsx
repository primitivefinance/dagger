import { useEffect, useState, createContext } from 'react'
import type { FC } from 'react'
import { useAccount, useChainId } from 'wagmi'

import { balanceOf } from '@/lib/erc20'
import TokenSelector from '@/components/TokenSelector'
import { tokens } from '@/data/tokens'

export type YieldParams = {}

export type PrincipalParams = {}

export type TradeYieldParams = {
    tokenIn: `0x${string}`
    isLong: boolean
    poolId: string
    amountIn: string
    amountOut: string
}

const initialParams: TradeYieldParams = {
    tokenIn: '0x0',
    isLong: true,
    poolId: '',
    amountIn: '',
    amountOut: '',
}

export const TradeYieldContext = createContext<TradeYieldParams>(initialParams)

export type TradeFormProps = {
    children?: React.ReactNode
    poolId: string
    isLong: boolean
}

const TradeForm: FC<TradeFormProps> = ({ children, poolId = '', isLong = true }) => {
    const { address } = useAccount()
    const chainId = useChainId()

    const [tokenIn, setTokenIn] = useState<`0x${string}`>('0x0')

    const [amountIn, setAmountIn] = useState<string>('')
    const [amountOut, setAmountOut] = useState<string>('')
    // Helpful Metrics
    const [leverage, setLeverage] = useState<number>(0)
    const [fee, setFee] = useState<string>('')
    return (
        <>
            <div className="grid w-1/3 items-center gap-1">
              <h2>Trade</h2>
            </div>
            <TradeYieldContext.Provider
                value={{ tokenIn, isLong, amountIn, amountOut, poolId }}
            >
                {children}
            </TradeYieldContext.Provider>
        </>
    )
}

export default TradeForm
