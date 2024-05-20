import React from 'react'
import { useParams } from 'react-router-dom'

import { useGraphQL } from '../../useGraphQL'
import {
    MarketInfoQueryDocument,
    SYTokenQueryDocument,
} from '../../queries/markets'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SkeletonText from '@/components/SkeletonText'
import AvatarSkeletonTooltip from '@/components/AvatarSkeletonTooltip'
import { Skeleton } from '@/components/ui/skeleton'
import TradeChart from '../TradeChart'
import { useTradeRoute } from '@/lib/useTradeRoute'
import { FALLBACK_ALT, FALLBACK_AVATAR } from '@/utils/address'
import { formatWad } from '@/utils/numbers'
import { fromExpiry } from '@/utils/dates'

const MarketStatCard = ({
    label,
    data,
}: {
    label: React.ReactNode
    data?: React.ReactNode
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-xs border items-center justify-center text-center p-md">
            <h4 className="text-muted dark:text-muted-foreground">{label}</h4>
            <h3>{data ?? <SkeletonText />}</h3>
        </div>
    )
}

export const MARKET_AVATAR_SIZE = 'size-24 md:size-48' as const

const MarketView = (): JSX.Element => {
    const { id } = useParams()
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x59d26a4e574e8c3c7be83697acbfed57d1793045',
    })
    const market = data?.markets?.items?.[0]
    const { data: sy } = useGraphQL(SYTokenQueryDocument, {
        tokenId: market?.pool?.tokenX?.id,
    })
    const syToken = sy?.sYTokens?.items?.[0]
    const { setTokenParams } = useTradeRoute()

    return (
        <div className="flex flex-col gap-2xl p-xl">
            <div className="flex flex-row gap-sm justify-between items-center">
                <div className="flex flex-row gap-lg items-center w-1/2">
                    <AvatarSkeletonTooltip
                        src={market?.icon ?? FALLBACK_AVATAR}
                        alt={market?.name ?? FALLBACK_ALT}
                        loading={typeof market === 'undefined'}
                        size={MARKET_AVATAR_SIZE}
                    >
                        {market?.name ?? <SkeletonText />}
                    </AvatarSkeletonTooltip>
                    <div className="flex flex-col gap-xs truncate w-full">
                        <h2>{market?.name ?? <SkeletonText />}</h2>
                        <h4 className="text-muted-foreground">
                            {market?.name ? (
                                <>This is a description of the market.</>
                            ) : (
                                <SkeletonText />
                            )}
                        </h4>
                    </div>
                </div>
                <div className="flex flex-row gap-2xl items-start w-1/2 justify-end">
                    <div className="flex flex-col gap-md">
                        <Badge variant="secondary" className="p-0">
                            <div className="p-sm flex flex-row gap-lg items-center justify-between w-full">
                                <p className="text-muted dark:text-muted-foreground">
                                    Expiry
                                </p>

                                {market?.expiry ? (
                                    <p>{fromExpiry(market?.expiry)}</p>
                                ) : (
                                    <Skeleton>
                                        <p className="text-transparent selection:text-transparent dark:text-transparent dark:selection:text-transparent">
                                            12/12/1999
                                        </p>
                                    </Skeleton>
                                )}
                            </div>
                        </Badge>
                        <Badge variant="secondary" className="p-0">
                            <div className="p-sm flex flex-row gap-lg items-center justify-between w-full">
                                <p className="text-muted dark:text-muted-foreground">
                                    Rate
                                </p>

                                {syToken?.exchangeRate ? (
                                    <p>{formatWad(syToken?.exchangeRate)}</p>
                                ) : (
                                    <Skeleton>
                                        <p className="text-transparent selection:text-transparent dark:text-transparent dark:selection:text-transparent">
                                            1000.000
                                        </p>
                                    </Skeleton>
                                )}
                            </div>
                        </Badge>
                    </div>
                    <div className="flex flex-col gap-sm w-1/4">
                        <Button
                            size="lg"
                            variant="tx"
                            onClick={() =>
                                setTokenParams(
                                    market?.pool?.tokenX?.id,
                                    market?.pool?.tokenY?.id
                                )
                            }
                        >
                            Buy Yield
                        </Button>

                        <Button
                            size="lg"
                            variant="info"
                            onClick={() =>
                                setTokenParams(
                                    market?.pool?.tokenY?.id,
                                    market?.pool?.tokenX?.id
                                )
                            }
                        >
                            Sell Yield
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex h-96 w-full items-center justify-center text-center border">
                <TradeChart
                    marketId={
                        id ? id : '0x59d26a4e574e8c3c7be83697acbfed57d1793045'
                    }
                    isLong={false}
                />
            </div>
            <div className="grid grid-cols-3 gap-lg">
                <MarketStatCard label="Volume" data="$10,000" />
                <MarketStatCard label="Liquidity" data="$10,000" />
                <MarketStatCard label="Price" data="$10,000" />
            </div>
        </div>
    )
}

export default MarketView
