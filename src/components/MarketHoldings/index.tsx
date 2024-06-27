import React, { useCallback } from 'react'

import { shortAddress } from '@/utils/address'
import { useAccount } from 'wagmi'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
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
import { TableHeaderWithTooltip } from '../PoolsTable'

type MarketToken = {
    icon: string
    address: `0x${string}`
    name: string
    symbol: string
}

export type MarketProps = {
    name: string
    address: `0x${string}`
    expiry: number
    ibAsset: MarketToken
    nativeAsset: MarketToken
}

export type PositionTableProps = {
    underlyingValue: number
    usdValue: number
    underlyingEntry: number
    usdEntry: number
    underlyingPnL: number
    usdPnL: number
}

const PositionTable = ({
    underlyingValue,
    usdValue,
    underlyingEntry,
    usdEntry,
    underlyingPnL,
    usdPnL,
}: PositionTableProps): JSX.Element => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Value (stETH)</TableHead>
                    <TableHead className="text-left">Value (USD)</TableHead>
                    <TableHead className="text-left">Entry (stETH)</TableHead>
                    <TableHead className="text-left">Entry (USD)</TableHead>
                    <TableHead className="text-left">P/L (stETH)</TableHead>
                    <TableHead className="text-left">P/L (USD)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <span>{underlyingValue.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                        <span>{usdValue.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                        <span>{underlyingEntry.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                        <span>{usdEntry.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                        <span>{underlyingPnL.toFixed(3)}</span>
                    </TableCell>
                    <TableCell>
                        <span>{usdPnL.toFixed(2)}</span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const LiquidityPosition = ({ id }: { id: string }): JSX.Element => {
    const { data, isFetching } = useGraphQL(LiquidityPositionsQueryDocument, {
        id,
    })
    const position = data?.liquidityPositions.items[0]
    if (isFetching || !position) return <></>
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row items-center justify-between">
                <h5 className="pr-10">Liquidity</h5>
                <PositionTable
                    underlyingValue={position.liquidityCurrentUnderlying}
                    usdValue={position.liquidityCurrentUSD}
                    underlyingEntry={position.liquidityEntryUnderlying}
                    usdEntry={position.liquidityEntryUSD}
                    underlyingPnL={
                        position.liquidityCurrentUnderlying -
                        position.liquidityEntryUnderlying
                    }
                    usdPnL={
                        position.liquidityCurrentUSD -
                        position.liquidityEntryUSD
                    }
                />
            </div>
        </div>
    )
}
const YieldPosition = ({ id }: { id: string }): JSX.Element => {
    const { data, isFetching } = useGraphQL(YieldPositionsQueryDocument, {
        id,
    })
    const position = data?.yieldPositions.items[0]
    if (isFetching || !position) return <>Loading</>
    return (
        <div className="flex flex-col gap-0">
            <div className="flex flex-row items-center justify-between">
                <h5 className="pr-10">Long</h5>
                <PositionTable
                    underlyingValue={position.ytCurrentUnderlying}
                    usdValue={position.ytCurrentUSD}
                    underlyingEntry={position.ytEntryUnderlying}
                    usdEntry={position.ytEntryUSD}
                    underlyingPnL={
                        position.ytCurrentUnderlying -
                        position.ytEntryUnderlying
                    }
                    usdPnL={position.ytCurrentUSD - position.ytEntryUSD}
                />
            </div>
            <div className="flex flex-row items-center">
                <h5 className="pr-10">Short</h5>
                <PositionTable
                    underlyingValue={position.ptCurrentUnderlying}
                    usdValue={position.ptCurrentUSD}
                    underlyingEntry={position.ptEntryUnderlying}
                    usdEntry={position.ptEntryUSD}
                    underlyingPnL={
                        position.ptCurrentUnderlying -
                        position.ptEntryUnderlying
                    }
                    usdPnL={position.ptCurrentUSD - position.ptEntryUSD}
                />
            </div>
        </div>
    )
}

const MarketPositions = ({
    marketData,
    address,
}: {
    marketData: MarketProps
    address: `0x${string}`
}): JSX.Element => {
    const positions = useGraphQL(PositionsInMarketQueryDocument, {
        marketId: marketData.address,
        portfolioId: address,
    })
    const isPosition =
        !!positions?.data?.yieldPositions?.items[0]?.id ||
        !!positions?.data?.liquidityPositions?.items[0]?.id
            ? true
            : false

    if (!isPosition) return <></>
    return (
        <div className="flex flex-col pt-10">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-mid">
                <h3>{marketData.name}</h3>
            </div>
            <div className="flex flex-col gap-md items-start py-lg px-md w-full">
                {positions?.data?.yieldPositions.items[0].id ? (
                    <YieldPosition
                        id={positions.data?.yieldPositions.items[0].id}
                    />
                ) : (
                    <></>
                )}
                {positions?.data?.liquidityPositions.items[0].id ? (
                    <LiquidityPosition
                        id={positions.data?.liquidityPositions.items[0].id}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
const MarketHoldings: React.FC = (): JSX.Element => {
    const { data, isFetching } = useGraphQL(allMarketsQueryDocument, {
        limit: 100,
    })
    const { address } = useAccount()
    if (isFetching || !address) return <></>
    return (
        <div className="flex flex-col gap-0 border">
            <TooltipProvider delayDuration={100}>
                {data?.markets.items.map((mkt, i) => {
                    return (
                        <MarketPositions
                            key={i}
                            marketData={{
                                name: mkt.name,
                                address: mkt.id,
                                expiry: mkt.expiry,
                                ibAsset: mkt.ibAssetId,
                                nativeAsset: mkt.nativeAssetId,
                            }}
                            address={address}
                        />
                    )
                })}
            </TooltipProvider>
        </div>
    )
}

export default MarketHoldings
