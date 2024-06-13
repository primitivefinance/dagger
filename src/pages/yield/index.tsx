import React from 'react'
import { getAddress } from 'viem'
import { useAccount } from 'wagmi'
import {
    DoubleArrowRightIcon,
    InfoCircledIcon,
    PlusCircledIcon,
    PlusIcon,
} from '@radix-ui/react-icons'

import { allMarketsQueryDocument } from '../../queries/markets'
import { useGraphQL } from '../../useGraphQL'
import { ImplYieldQueryDocument } from '../../queries/prices'
import { PositionQueryDocument } from '../../queries/positions'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import SectionHeader from '@/components/SectionHeader'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { ETH_ADDRESS } from '@/lib/useTokens'
import { useOutputAmount } from '@/lib/useOutputAmount'
import { daysUntilDate, fromExpiryToDate } from '@/utils/dates'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'
import { formatNumber, formatPercentage } from '@/utils/numbers'
import YieldPositionsTable from '@/components/YieldPositionsTable'

const PositionSummary: React.FC<{
    netYieldDelta?: number
    impliedYieldRate?: number
    color?: string
}> = ({ netYieldDelta = 0, impliedYieldRate = 0, color }) => {
    return (
        <div className="flex flex-row gap-sm items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Badge variant="secondary">
                        <h4 className={`${color ? `text-${color}` : ''}`}>
                            {formatNumber(netYieldDelta)}
                        </h4>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>Notional size exposure.</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Badge variant="secondary">
                        <h4 className={`${color ? `text-${color}` : ''}`}>
                            stETH
                        </h4>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>Underlying yield-bearing asset.</TooltipContent>
            </Tooltip>
            {impliedYieldRate > 0 && (
                <>
                    <h4>@</h4>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge variant="secondary">
                                <h4>{formatPercentage(impliedYieldRate)}</h4>
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            Implied entry APR. This rate is variable and can
                            change.
                        </TooltipContent>
                    </Tooltip>
                </>
            )}
        </div>
    )
}

const YieldPage: React.FC = () => {
    const { address } = useAccount()
    const { getOutputAmount } = useOutputAmount()
    const outputAmount = Number(getOutputAmount())
    const { setTokenParams } = useTradeRoute()

    // market data
    const { data, refetch, isFetching, isLoading } = useGraphQL(
        allMarketsQueryDocument,
        { limit: 10 }
    )
    const amountMarkets = data?.markets?.items?.length
    const [selectedMarket, setSelectedMarket] = React.useState<
        string | undefined
    >(FALLBACK_MARKET_ADDRESS)

    const { data: implied } = useGraphQL(ImplYieldQueryDocument, {
        marketId: selectedMarket as string,
    })
    const market = data?.markets?.items?.find((item) =>
        item?.id.comp(selectedMarket)
    )
    // position data
    const { data: positionData } = useGraphQL(PositionQueryDocument, {
        marketId: selectedMarket as string,
    })

    const filteredPositions = positionData?.positions?.items?.filter((item) =>
        address.comp(item?.portfolioId)
    )
    const totalPositions = filteredPositions?.length
    const position = filteredPositions?.[0]

    const impliedYieldRate =
        implied?.impliedYields?.items?.[
            implied?.impliedYields?.items?.length - 1
        ]?.value

    const resultPosition = {
        netYieldDelta: Number(position?.netYieldDelta) + outputAmount,
        impliedYieldRate: impliedYieldRate ?? 0,
    }

    return (
        <div className="flex flex-col gap-2xl p-xl pt-0 mx-auto">
            <div className="flex flex-col gap-lg">
                <div className="flex flex-row items-center w-full justify-between border bg-blue/20 p-md">
                    <div className="flex flex-row gap-md items-center text-muted dark:text-muted-foreground">
                        <InfoCircledIcon />
                        <h5 className="scroll-m-20 ">
                            Trade ETH for variable stETH yield exposure.
                        </h5>
                    </div>
                </div>

                <SectionHeader
                    title={'Select Maturity'}
                    quantity={amountMarkets}
                    refetch={refetch}
                    isFetching={isFetching}
                    isLoading={isLoading}
                />

                <div className="grid-cols-3 grid gap-md ">
                    {data?.markets?.items?.map((market) => (
                        <div
                            key={market.id}
                            className={`flex flex-col gap-sm border p-md items-center justify-center ${getAddress(market?.id) === getAddress(selectedMarket) ? 'bg-secondary border-foreground/50' : ''} hover:cursor-pointer`}
                            onClick={() => {
                                setSelectedMarket(market?.id)
                                setTokenParams(ETH_ADDRESS, market?.ytId)
                            }}
                        >
                            <div className="flex flex-row gap-xs items-center">
                                <h4 className="font-500">
                                    {fromExpiryToDate(market?.expiry)}
                                </h4>
                                <p className="text-muted dark:text-muted-foreground">
                                    ({daysUntilDate(market?.expiry)}d)
                                </p>
                            </div>

                            <div className="flex flex-row gap-xs items-center">
                                <h4 className="text-cyan">
                                    {formatPercentage(impliedYieldRate)}
                                </h4>
                                <p className="text-muted dark:text-muted-foreground">
                                    Implied vAPR
                                </p>
                            </div>
                        </div>
                    ))}
                    <div
                        key={'market-info'}
                        className={`flex flex-col gap-sm border p-md`}
                    >
                        <InfoCircledIcon />
                        <div className="flex flex-row gap-xs items-center">
                            <p>Position must be sold to exit.</p>
                        </div>

                        <div className="flex flex-row gap-xs items-center">
                            <p className="text-muted dark:text-muted-foreground">
                                Variable rates are impacted by underlying stETH
                                yield rates.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-0">
                    <SectionHeader
                        title={'My Positions'}
                        quantity={totalPositions}
                    />
                    <div className="flex flex-col gap-0 border border-t-0">
                        <div className="grid grid-cols-1 gap-md">
                            {data && (
                                <YieldPositionsTable
                                    data={positionData}
                                    isFetching={isFetching}
                                    amount={totalPositions}
                                    preview={{
                                        netYieldDelta:
                                            resultPosition.netYieldDelta,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YieldPage
