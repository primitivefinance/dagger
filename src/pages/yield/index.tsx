import React from 'react'
import { getAddress } from 'viem'
import { useAccount } from 'wagmi'

import { allMarketsQueryDocument } from '../../queries/markets'
import { useGraphQL } from '../../useGraphQL'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { ETH_ADDRESS } from '@/lib/useTokens'
import { daysUntilDate, fromExpiry, fromExpiryToDate } from '@/utils/dates'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'
import { ImplYieldQueryDocument } from '../../queries/prices'
import { formatNumber, formatPercentage } from '@/utils/numbers'
import { PositionQueryDocument } from '../../queries/positions'
import { DoubleArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { useOutputAmount } from '@/lib/useOutputAmount'

const PositionSummary: React.FC<{
    netYieldDelta?: number
    impliedYieldRate?: number
}> = ({ netYieldDelta = 0, impliedYieldRate = 0 }) => {
    return (
        <div className="flex flex-row gap-sm items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Badge variant="secondary">
                        <h4>{formatNumber(netYieldDelta)}</h4>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>Notional size exposure.</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <Badge variant="secondary">
                        <h4>stETH</h4>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>Underlying yield-bearing asset.</TooltipContent>
            </Tooltip>
            <h4>@</h4>
            <Tooltip>
                <TooltipTrigger>
                    <Badge variant="secondary">
                        <h4>{formatPercentage(impliedYieldRate)}</h4>
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    Implied entry APR. This rate is variable and can change.
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

const YieldPage: React.FC = () => {
    const { data, refetch, isFetching, isLoading } = useGraphQL(
        allMarketsQueryDocument,
        { limit: 10 }
    )

    const [selectedMarket, setSelectedMarket] = React.useState<
        string | undefined
    >(FALLBACK_MARKET_ADDRESS)

    const { data: implied } = useGraphQL(ImplYieldQueryDocument, {
        marketId: selectedMarket as string,
    })
    const market = data?.markets?.items?.find(
        (item) => getAddress(item?.id) === getAddress(selectedMarket)
    )
    const { getOutputAmount } = useOutputAmount()
    const outputAmount = Number(getOutputAmount())

    const impliedYieldRate =
        implied?.impliedYields?.items?.[
            implied?.impliedYields?.items?.length - 1
        ]?.value

    const { setTokenParams } = useTradeRoute()

    const { data: positionData } = useGraphQL(PositionQueryDocument, {
        marketId: selectedMarket as string,
    })

    const { address } = useAccount()
    const position = positionData?.positions?.items?.filter(
        (item) => getAddress(item?.portfolioId) === address
    )?.[0]

    const resultPosition = {
        netYieldDelta: Number(position?.netYieldDelta) + outputAmount,
        impliedYieldRate: impliedYieldRate ?? 0,
    }

    return (
        <div className="flex flex-col gap-2xl p-xl pt-0 mx-auto w-3/4 ">
            <div className="flex flex-col gap-lg">
                <div className="flex flex-row items-center w-full justify-between border bg-blue/20 p-md">
                    <div className="flex flex-row gap-md items-center text-muted dark:text-muted-foreground">
                        <InfoCircledIcon />
                        <h5 className="scroll-m-20 ">
                            Trade ETH for variable stETH yield exposure.
                        </h5>
                    </div>
                </div>

                <div className="flex flex-row items-center w-full justify-between border bg-muted/50 p-md">
                    <div className="flex flex-row gap-md items-center">
                        <h4 className="scroll-m-20">Select Maturity</h4>
                        <h4 className="flex flex-row gap-xs items-center"></h4>
                    </div>
                </div>

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

                <div className="flex flex-row items-center w-full justify-between border bg-muted/50 p-md">
                    <div className="flex flex-row gap-md items-center justify-between w-full">
                        <h4 className="scroll-m-20">My Position</h4>
                        <div className="flex flex-row gap-lg items-center">
                            <PositionSummary
                                netYieldDelta={position?.netYieldDelta ?? 0}
                                impliedYieldRate={impliedYieldRate}
                            />
                            <DoubleArrowRightIcon />
                            <PositionSummary
                                netYieldDelta={resultPosition.netYieldDelta}
                                impliedYieldRate={
                                    resultPosition.impliedYieldRate
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YieldPage
