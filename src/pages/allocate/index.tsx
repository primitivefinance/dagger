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
import AddLiquidityView from '@/components/AddLiquidityView'

const EmptyPositionTable: React.FC = () => {
    return (
        <div className="border flex flex-col gap-0 p-xl items-center justify-center h-48">
            <h3 className="text-muted/35 dark:text-muted-foreground/35">
                Connect to View Positions
            </h3>
        </div>
    )
}

type AllocateCardProps = {
    selectedMarket: string
    setSelectedMarket: (marketId: string) => void
    marketId: string
    syTokenId: string
    liquidityTokenId: string
    expiry: number
    avgEntryImpliedRate: number
}

const AllocateCard: React.FC<AllocateCardProps> = ({
    selectedMarket,
    setSelectedMarket,
    marketId,
    syTokenId,
    liquidityTokenId,
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
                setTokenParams(syTokenId, liquidityTokenId)
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

const AllocatePage: React.FC = () => {
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
                <InfoHeader title="Provide liquidity to fixed yield markets." />

                <SectionHeader
                    title={'Select Maturity'}
                    quantity={data?.markets?.items?.length}
                    refetch={refetch}
                    isFetching={isFetching}
                    isLoading={isLoading}
                />

                <div className="grid-cols-3 grid gap-md ">
                    {data?.markets?.items?.map((market) => (
                        <AllocateCard
                            key={market.id}
                            selectedMarket={selectedMarket}
                            setSelectedMarket={setSelectedMarket}
                            marketId={market.id}
                            syTokenId={market.syId}
                            liquidityTokenId={market.id}
                            expiry={market.expiry}
                            avgEntryImpliedRate={
                                implied?.impliedYields?.items?.filter((item) =>
                                    market.id.comp(item?.marketId)
                                )?.[0]?.value
                            }
                        />
                    ))}

                    <InfoCard
                        title="Adding liquidity has additional risks."
                        content="Liquidity providers hold both tokens in the pool."
                    />
                </div>

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
                            <AddLiquidityView />
                        </div>
                    </div>
                ) : (
                    <EmptyPositionTable />
                )}
            </div>
        </div>
    )
}

export default AllocatePage
