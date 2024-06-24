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
import { useMarketRoute } from '@/lib/useMarketRoute'
import { TokenBalance } from '../AccountHoldings'
import { erc20Abi } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'
import { ETH_ADDRESS } from '@/lib/useTokens'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { formatNumber } from '@/utils/numbers'
import SectionHeader from '../SectionHeader'

const MarketStatCard = ({
    label,
    data,
}: {
    label: React.ReactNode
    data?: React.ReactNode
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-0 border">
            <div className="border-b p-sm bg-muted/50 items-center justify-center text-center">
                <h4 className="text-muted dark:text-muted-foreground">
                    {label}
                </h4>
            </div>
            <div className="flex flex-col gap-xs items-center justify-center text-center p-lg">
                <h3>{data ?? <SkeletonText />}</h3>
            </div>
        </div>
    )
}

export const MARKET_AVATAR_SIZE = 'size-24 md:size-36' as const

const MarketView = (): JSX.Element => {
    const { id } = useMarketRoute()
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id,
    })
    const market = data?.markets?.items?.[0]
    const { data: sy } = useGraphQL(SYTokenQueryDocument, {
        tokenId: market?.pool?.tokenX?.id,
    })
    const syToken = sy?.sYTokens?.items?.[0]
    const { setTokenParams } = useTradeRoute()
    const { address } = useAccount()

    const balanceCall = {
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
    }

    const tokens = [{ id }, { id: market?.syId }]

    const {
        data: balances,
        isFetching,
        refetch: refetchTokenBalances,
    } = useReadContracts({
        contracts: tokens?.map((token: { id: string }) => ({
            ...balanceCall,
            address: token.id as `0x${string}`,
        })),
        query: {
            enabled: !!address,
        },
    })

    const syBalanceIndex = tokens.findIndex(
        (token: { id: string }) => token.id === market?.syId
    )

    const syBalance = balances?.[syBalanceIndex]?.result as bigint

    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-col gap-lg">
                <div className="grid grid-cols-3 gap-lg">
                    <MarketStatCard
                        label="Volume"
                        data={formatNumber(
                            market?.pool?.aggregateVolumeInUnderlying,
                            'USD'
                        )}
                    />
                    <MarketStatCard
                        label="Liquidity"
                        data={formatNumber(
                            market?.pool?.liquidityInUnderlying,
                            'USD'
                        )}
                    />
                    <MarketStatCard
                        label="Underlying Asset Price"
                        data={formatNumber(market?.underlyingToUsd, 'USD')}
                    />
                </div>
            </div>

            <div className="border flex flex-col gap-0">
                <div className="flex flex-row items-center w-full justify-between border-b bg-muted/50 p-md">
                    <div className="flex flex-row items-center gap-sm w-1/2">
                        <h4>Implied Yield Rates</h4>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InfoCircledIcon />
                            </TooltipTrigger>
                            <TooltipContent>
                                The implied yield rates are calculated based on
                                the current price of the yield tokens.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex flex-row items-center gap-sm w-1/2">
                        <h4>Implied Discount</h4>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InfoCircledIcon />
                            </TooltipTrigger>
                            <TooltipContent>
                                The price of each principal token per 1 stETH
                                token. Principal tokens have a small discount to
                                the current price of stETH because they do not
                                accrue yield. They can be redeemed for a full
                                stETH at expiry.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex h-96 w-full items-center justify-center text-center">
                    <TradeChart
                        marketId={
                            id
                                ? id
                                : '0x59d26a4e574e8c3c7be83697acbfed57d1793045'
                        }
                        isLong={false}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-lg">
                {address && (
                    <MarketStatCard
                        label="Your Liquidity Position"
                        data={
                            <div className="flex flex-row gap-md items-start justify-start">
                                <TokenBalance
                                    token={id}
                                    balance={balances?.[0]}
                                    disableTicker
                                    ticker={'LP'}
                                />
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default MarketView
