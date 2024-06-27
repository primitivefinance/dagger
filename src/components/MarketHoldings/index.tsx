import React, { useCallback, useAccount } from 'react'

import { shortAddress } from '@/utils/address'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

import TokenBadge from '../TokenBadge'
import { useGraphQL } from '../../useGraphQL'
import {
    MarketInfoQueryDocument,
    allMarketsQueryDocument,
} from '../../queries/markets'
import {
    LiquidityPositionsQueryDocument,
    PositionsInMarketQueryDocument,
    YieldPositionsQueryDocument,
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

const LiquidityPosition = ({ id }: { id: string }): JSX.Element => {
    const lp = useGraphQL(LiquidityPositionsQueryDocument, {
        id,
    })
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
                <h5>Liquidity Position</h5>
            </div>
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid"></div>
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
                <h5>Net Position</h5>
            </div>
        </div>
    )
}
const YieldPosition = ({ id }: { id: string }): JSX.Element => {
    const yp = useGraphQL(YieldPositionsQueryDocument, {
        id,
    })
    return (
        <div className="flex flex-col gap-0">
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
}: {
    marketData: MarketData
}): JSX.Element => {
    const account = '0x687deb45decb0ff4aa0b2d46725f5d1d5a8e3d22'
    const positions = useGraphQL(PositionsInMarketQueryDocument, {
        marketId: marketData.id,
        portfolioId: account,
    })

    const isPosition =
        positions?.data?.yieldPositions.items[0].id ||
        positions?.data?.liquidityPositions.items[0].id
            ? true
            : false
    if (!isPosition) return <></>
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
                <h5>{marketData.name}</h5>
            </div>
            <div className="flex flex-row gap-md items-center py-lg px-md w-1/2">
                {positions?.data?.yieldPositions.items[0].id ? (
                    <YieldPosition
                        id={positions.data?.yieldPositions.items[0].id}
                    />
                ) : (
                    <></>
                )}
                {positions?.data?.liquidityPositions.items[0].id ? (
                    <LiquidityPosition
                        id={positions.data?.yieldPositions.items[0].id}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
const MarketHoldings: React.FC = (): JSX.Element => {
    const marketData = useGraphQL(allMarketsQueryDocument, { limit: 100 })
    const account = '0x687deb45decb0ff4aa0b2d46725f5d1d5a8e3d22'
    return (
        <div className="flex flex-col gap-0 border">
            <TooltipProvider delayDuration={100}>
                {marketData.data?.markets.items.map((mkt, i) => {
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
