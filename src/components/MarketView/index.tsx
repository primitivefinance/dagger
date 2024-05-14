import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useGraphQL } from '../../useGraphQL'
import {
    MarketInfoQueryDocument,
    SYTokenQueryDocument,
} from '../../queries/markets'
import SkeletonText from '../SkeletonText'
import { formatWad } from '@/utils/numbers'
import { MarketItemFragment, MarketQuery } from 'gql/graphql'

const MarketStatCard = ({
    label,
    data,
}: {
    label: React.ReactNode
    data: React.ReactNode
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-xs border items-center justify-center text-center p-md">
            <h4 className="text-muted-foreground">{label}</h4>
            <h3>{data}</h3>
        </div>
    )
}

const MarketView = ({ id }): JSX.Element => {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })
    const market = data?.markets?.items?.[0]
    const { data: sy } = useGraphQL(SYTokenQueryDocument, {
        tokenId: market?.pool?.tokenX?.id,
    })
    const syToken = sy?.sYTokens?.items?.[0]

    return (
        <div className="flex flex-col gap-2xl p-xl">
            <div className="flex flex-row gap-sm justify-between items-center">
                <div className="flex flex-row gap-lg items-center w-1/2">
                    <Avatar className="h-48 w-48">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-xs truncate">
                        {market?.name ? (
                            <h2>{market.name}</h2>
                        ) : (
                            <SkeletonText />
                        )}
                        <h4 className="text-muted-foreground">
                            This is a description of the market.
                        </h4>
                    </div>
                </div>
                <div className="flex flex-row gap-2xl items-start w-1/2 justify-end">
                    <div className="flex flex-col gap-md">
                        <Badge variant="secondary" className="p-0">
                            {market?.expiry ? (
                                <div className="p-sm flex flex-row gap-lg items-center justify-between w-full">
                                    <p className="text-muted dark:text-muted-foreground">
                                        Expiry
                                    </p>
                                    <p>
                                        {new Date(
                                            market?.expiry * 1000
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <SkeletonText />
                            )}
                        </Badge>
                        <Badge variant="secondary" className="p-0">
                            {syToken?.exchangeRate ? (
                                <div className="p-sm flex flex-row gap-lg items-center justify-between w-full">
                                    <p className="text-muted dark:text-muted-foreground">
                                        Rate
                                    </p>
                                    <p>{formatWad(syToken?.exchangeRate)}</p>
                                </div>
                            ) : (
                                <SkeletonText />
                            )}
                        </Badge>
                    </div>
                    <div className="flex flex-col gap-sm w-1/4">
                        <Button size="lg" variant="tx">
                            Buy Yield
                        </Button>
                        <Button size="lg" variant="info">
                            Sell Yield
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex h-96 w-full items-center justify-center text-center border">
                <h1 className="text-muted-foreground/25">Chart</h1>
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
