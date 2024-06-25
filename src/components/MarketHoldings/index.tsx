import React, { useCallback, useAccount } from 'react'

import { shortAddress } from '@/utils/address'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

import TokenBadge from '../TokenBadge'
import { useGraphQL } from 'useGraphQL'
import {
    MarketInfoQueryDocument,
    allMarketsQueryDocument,
} from '../../queries/markets'
import {
  LiquidityPositionsQueryDocument,
  YieldPositionsQueryDocument
} from '../../queries/positions'

type MarketToken = {
    icon: string
    address: `0x${string}`
    name: string
    symbol: string
}

export type MarketData = {
  name: string
  address: `0x${string}`
  expiry: number
  ibAsset: MarketToken
  nativeAsset: MarketToken
}

export type YieldPositionData = {
  avgEntryImpliedRate: number
  netYieldDelta: number
  ptBalance: number
  ptCurrentUSD: number
  ptCurrentUnderlying: number
  ptEntryUSD: number
  ptEntryUnderlying: number
  ytBalance: number
  ytCurrentUSD: number
  ytCurrentUnderlying: number
  ytEntryUSD: number
  ytEntryUnderlying: number
}

export type LiquidityPositionData = {
  liquidityCurrentBalance: number
  liquidityCurrentUSD: number
  liquidityCurrentUnderlying: number
  liquidityEntryBalance: number
  liquidityEntryUSD: number
  liquidityEntryUnderlying: number
}

const LiquidityPosition = (lp: LiquidityPositionData): JSX.Element => {
  return (
    <div className='flex flex-col gap-0'>
       <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
          <h5>Liquidity Position</h5>
        </div>
        <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
        </div>
        <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
          <h5>Net Position</h5>
        </div>
    </div>  
  )
}
const YieldPosition = (yp: YieldPositionData): JSX.Element => {
  return (
    <div className='flex flex-col gap-0'>
       <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
          <h5>Long Yield</h5>
        </div>
        <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
          <h5>Short Yield</h5>
        </div>
        <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
          <h5>Net Position</h5>
        </div>
    </div>
  )
} 

const MarketInfo = ({
    marketData,
  } : {
    marketData: MarketData,
  }): JSX.Element => {
    const account = useAccount()

    const yp = useGraphQL(YieldPositionsQueryDocument, {marketId: marketData.id, portfolioId: account.address})
    const lp = useGraphQL(LiquidityPositionsQueryDocument, {marketId: marketData.id, portfolioId: account.address})
    const isPosition = yp.items[0].id || lp.items[0].id ?? true : false 
    if (!isPosition) return <></>
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
                <h5>{marketData.name}</h5>
            </div>
            <div className="flex flex-row gap-md items-center py-lg px-md w-1/2">
              {yp.items[0].id ? <YieldPosition yp={yp.items[0]} /> : <></>}
              {lp.items[0].id ? <LiquidityPosition lp={lp.items[0]} /> : <></>}
            </div>
        </div>
    )
}
const MarketHoldings: React.FC = (): JSX.Element => {
    const marketData = useGraphQL(allMarketsQueryDocument, { limit: 100 })
    return (
        <div className="flex flex-col gap-0 border">
            <TooltipProvider delayDuration={100}>
                {marketData.data?.markets.items.map((mkt, i) => {
                    const posId = account.address.concat(mkt.id).toLowerCase()
                    return (
                        <MarketInfo
                            key={i}
                            marketData={{
                                name: mkt.name,
                                address: mkt.id,
                                expiry: mkt.expiry,
                                ibAsset: mkt.ibAssetId,
                                nativeAsset: mkt.nativeAssetId,
                            }}
                        />
                    )
                })}
            </TooltipProvider>
        </div>
    )
}

export default MarketHoldings
