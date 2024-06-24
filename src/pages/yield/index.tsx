import React from 'react'
import { useAccount } from 'wagmi'

import { allMarketsQueryDocument } from '../../queries/markets'
import { useGraphQL } from '../../useGraphQL'
import { ImplYieldQueryDocument } from '../../queries/prices'
import { PositionQueryDocument } from '../../queries/positions'

import YieldPositionsTable from '@/components/YieldPositionsTable'
import InfoCard from '@/components/InfoCard'
import InfoHeader from '@/components/InfoHeader'
import SectionHeader from '@/components/SectionHeader'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { ETH_ADDRESS } from '@/lib/useTokens'
import { useOutputAmount } from '@/lib/useOutputAmount'
import { daysUntilDate, fromExpiryToDate } from '@/utils/dates'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'
import { formatPercentage } from '@/utils/numbers'
import TradeView from '@/components/TradeView'

const EmptyPositionTable: React.FC = () => {
    return (
        <div className="border flex flex-col gap-0 p-xl items-center justify-center h-48">
            <h3 className="text-muted/35 dark:text-muted-foreground/35">
                Connect to View Positions
            </h3>
        </div>
    )
}

type YieldCardProps = {
    selectedMarket: string
    setSelectedMarket: (marketId: string) => void
    marketId: string
    yieldTokenId: string
    expiry: number
    avgEntryImpliedRate: number
}

const YieldCard: React.FC<YieldCardProps> = ({
    selectedMarket,
    setSelectedMarket,
    marketId,
    yieldTokenId,
    expiry,
    avgEntryImpliedRate,
}) => {
    const { setTokenParams } = useTradeRoute()

    const bg = marketId.comp(selectedMarket)
        ? 'bg-secondary border-foreground/50'
        : ''

    return (
        <div
            key={marketId}
            className={`${bg} flex flex-col gap-sm border p-md items-center justify-center hover:cursor-pointer`}
            onClick={() => {
                setSelectedMarket(marketId)
                setTokenParams(ETH_ADDRESS, yieldTokenId)
            }}
        >
            <div className="flex flex-row gap-xs items-center">
                <h4 className="font-500">{fromExpiryToDate(expiry)}</h4>
                <p className="text-muted dark:text-muted-foreground">
                    ({daysUntilDate(expiry)}d)
                </p>
            </div>

            <div className="flex flex-row gap-xs items-center">
                <h4 className="text-cyan">
                    {formatPercentage(avgEntryImpliedRate)}
                </h4>
                <p className="text-muted dark:text-muted-foreground">
                    Implied vAPR
                </p>
            </div>
        </div>
    )
}

const YieldPage: React.FC = () => {
    const { address } = useAccount()
    const { getOutputAmount } = useOutputAmount()
    const outputAmount = Number(getOutputAmount())
    const [selectedMarket, setSelectedMarket] = React.useState<
        string | undefined
    >(undefined)

    // market data
    const { data, refetch, isFetching, isLoading } = useGraphQL(
        allMarketsQueryDocument,
        { limit: 10 }
    )
    // position data
    const { data: positionData } = useGraphQL(PositionQueryDocument, {
        marketId: selectedMarket as string,
    })
    // yield data
    const { data: implied } = useGraphQL(ImplYieldQueryDocument, {
        marketId: selectedMarket as string,
    })

    return (
        <div className="flex flex-col gap-2xl p-xl pt-0 mx-auto">
            <div className="flex flex-col gap-lg">
                <InfoHeader title=" Trade ETH for variable stETH yield exposure." />

                <SectionHeader
                    title={'Select Maturity'}
                    quantity={data?.markets?.items?.length}
                    refetch={refetch}
                    isFetching={isFetching}
                    isLoading={isLoading}
                />

                <div className="grid-cols-3 grid gap-md ">
                    {data?.markets?.items?.map((market) => (
                        <YieldCard
                            key={market.id}
                            selectedMarket={selectedMarket}
                            setSelectedMarket={setSelectedMarket}
                            marketId={market.id}
                            yieldTokenId={market.ytId}
                            expiry={market.expiry}
                            avgEntryImpliedRate={
                                implied?.impliedYields?.items?.filter((item) =>
                                    market.id.comp(item?.marketId)
                                )?.[0]?.value
                            }
                        />
                    ))}

                    <InfoCard
                        title="Position must be sold to exit."
                        content="Variable rates are impacted by underlying stETH yield rates."
                    />
                </div>

                {/* {address ? (
                    <div className="w-1/2 items-center justify-center">
                        <TradeView />
                    </div>
                ) : null} */}

                {address ? (
                    <div className="flex flex-row gap-md items-start justify-between">
                        <div className="flex flex-col gap-0 items-center justify-center">
                            <SectionHeader title={'My Position'} />
                            <div className="flex flex-col gap-0 border border-t-0">
                                <div className="grid grid-cols-1 gap-md">
                                    {data && (
                                        <YieldPositionsTable
                                            data={positionData}
                                            isFetching={isFetching}
                                            delta={outputAmount}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 items-start justify-center">
                            <TradeView />
                        </div>
                    </div>
                ) : (
                    <EmptyPositionTable />
                )}
            </div>
        </div>
    )
}

export default YieldPage