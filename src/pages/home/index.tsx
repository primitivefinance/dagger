import { useNavigate } from 'react-router-dom'
import { zeroAddress } from 'viem'

import { useGraphQL } from '../../useGraphQL'
import {
    SYTokenQueryDocument,
    allMarketsQueryDocument,
} from '../../queries/markets'
import { Button } from '@/components/ui/button'
import { LabelWithEtherscan } from '@/components/EtherscanLinkLabels'
import { Card } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import PoolsTable from '@/components/PoolsTable'
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { MarketItemFragment } from 'gql/graphql'
import { Skeleton } from '@/components/ui/skeleton'
import AvatarSkeletonTooltip from '@/components/AvatarSkeletonTooltip'
import SkeletonText from '@/components/SkeletonText'
import TokenHoldings from '@/components/TokenHoldings'
import { title, subtitle } from '@/data/copy/home'
import { FALLBACK_AVATAR } from '@/utils/address'
import { fromExpiry } from '@/utils/dates'
import { formatWad } from '@/utils/numbers'

type CuratorInfo = {
    name: string
    description: string
    fees: string
    pools: number
    address: `0x${string}`
    icon?: string
}

const curators: { [key: string]: CuratorInfo } = {
    autonomous: {
        name: 'Autonomous',
        description:
            'The default pool curator. These pools are calibrated upon creation and cannot be altered during operations.',
        fees: '0.000',
        pools: 5,
        address: zeroAddress,
        icon: undefined,
    },
}

export const CURATOR_TITLE = 'Curator'
export const MARKET_TITLE = 'Market'
export const AVATAR_SIZE = 'size-[3rem] md:size-[6rem]' as const

export const CuratorCard = ({
    curator,
}: {
    curator?: CuratorInfo
}): JSX.Element => {
    const navigate = useNavigate()
    return (
        <Card
            className={`
            p-lg rounded-none block h-full 
            hover:bg-muted/50 hover:cursor-pointer hover:no-underline`}
            onClick={() => navigate(`/curator/${curator?.address}`)}
        >
            <div className="flex flex-col gap-lg h-full">
                <div className="flex w-full items-center justify-center">
                    <AvatarSkeletonTooltip
                        src={curator?.icon ?? FALLBACK_AVATAR}
                        alt={curator?.name ?? CURATOR_TITLE}
                        loading={typeof curator === 'undefined'}
                        size={AVATAR_SIZE}
                    >
                        {curator?.name ?? CURATOR_TITLE}
                    </AvatarSkeletonTooltip>
                </div>
                <div className="flex flex-col gap-xs justify-center items-center">
                    <h3>{curator?.name ?? <SkeletonText />}</h3>
                    <LabelWithEtherscan
                        label={
                            <p className="text-muted dark:text-muted-foreground">
                                Address
                            </p>
                        }
                        address={curator?.address}
                    />
                </div>

                <div className="flex flex-col justify-between h-full gap-lg">
                    <div className="flex flex-col gap-sm">
                        <h5 className="text-muted dark:text-muted-foreground">
                            Description
                        </h5>
                        <p className="">
                            {curator?.description ?? <SkeletonText />}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export const PoolCard = ({
    market,
}: {
    market?: MarketItemFragment
}): JSX.Element => {
    const { data: sy } = useGraphQL(SYTokenQueryDocument, {
        tokenId: market?.pool?.tokenX?.id,
    })

    const navigate = useNavigate()

    return (
        <Card
            className={`
            p-lg rounded-none block h-full 
            hover:bg-muted/50 hover:cursor-pointer hover:no-underline`}
            onClick={() => navigate(`/market/${market?.id}`)}
        >
            <div className="flex flex-col gap-lg h-full justify-between">
                <div className="flex w-full items-center justify-center">
                    <AvatarSkeletonTooltip
                        src={market?.icon ?? FALLBACK_AVATAR}
                        alt={market?.name ?? MARKET_TITLE}
                        loading={typeof market === 'undefined'}
                        size={AVATAR_SIZE}
                    >
                        {market?.name ?? MARKET_TITLE}
                    </AvatarSkeletonTooltip>
                </div>
                <div className="flex flex-col gap-xs justify-center items-center">
                    {market ? <h3>{market.name}</h3> : <SkeletonText />}

                    <LabelWithEtherscan
                        label={
                            <small className="text-muted dark:text-muted-foreground">
                                Address
                            </small>
                        }
                        address={market?.id as `0x${string}`}
                    />
                </div>

                <div className="flex flex-col gap-sm">
                    <h5 className="text-muted dark:text-muted-foreground">
                        Holdings
                    </h5>
                    <TokenHoldings
                        tokens={[market?.pool?.tokenX, market?.pool?.tokenY]}
                        reserves={[
                            market?.pool?.reserveX,
                            market?.pool?.reserveY,
                        ]}
                    />
                </div>

                <div className="flex flex-col h-full gap-sm justify-end">
                    <div className="flex flex-row gap-sm items-center justify-between">
                        <p className="text-muted dark:text-muted-foreground">
                            Rate
                        </p>
                        <div>
                            {sy?.sYTokens?.items?.[0]?.exchangeRate ? (
                                <p>
                                    {formatWad(
                                        sy?.sYTokens?.items?.[0]?.exchangeRate
                                    )}
                                </p>
                            ) : (
                                <SkeletonText />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row gap-sm items-center justify-between">
                        <p className="text-muted dark:text-muted-foreground">
                            Expiry
                        </p>
                        <div>
                            {market?.expiry ? (
                                <p>{fromExpiry(market?.expiry as number)}</p>
                            ) : (
                                <SkeletonText />
                            )}
                        </div>
                    </div>

                    <LabelWithEtherscan
                        label={
                            <p className="text-muted dark:text-muted-foreground">
                                Curator
                            </p>
                        }
                        address={market?.pool?.curator?.id as `0x${string}`}
                    />
                </div>
            </div>
        </Card>
    )
}

function Home(): JSX.Element {
    const { data } = useGraphQL(allMarketsQueryDocument, { limit: 10 })

    const [displayCards, setDisplayCards] = React.useState<boolean>(true)

    return (
        <div className="flex flex-col gap-2xl p-xl">
            <div className="gap-sm flex flex-col">
                <h2 className="scroll-m-20 ">{title}</h2>
                <h4 className="scroll-m-20 text-muted-foreground">
                    {subtitle}
                </h4>
            </div>
            <div className="flex flex-col gap-md">
                <div className="flex flex-row items-center w-full justify-between">
                    <div className="flex flex-row gap-md items-center">
                        <h4 className="scroll-m-20">Yield Markets</h4>
                        <h4 className="flex flex-row gap-xs items-center">
                            (
                            {data?.markets?.items?.length ?? (
                                <Skeleton className="h-4 w-12" />
                            )}
                            )
                        </h4>
                        <div className="flex flex-row gap-sm items-center">
                            <Switch
                                id="card-mode"
                                onClick={() => setDisplayCards(!displayCards)}
                                checked={displayCards}
                            />
                            <Label
                                htmlFor="card-mode"
                                className="text-muted dark:text-muted-foreground"
                            >
                                Cards
                            </Label>
                        </div>
                    </div>
                    <TooltipProvider delayDuration={50}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="tx" disabled>
                                    <div className="flex flex-row items-center gap-1">
                                        <svg
                                            className="w-4 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M5 12h14m-7 7V5"
                                            />
                                        </svg>
                                        Create pool
                                    </div>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Coming soon</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {displayCards ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        {data?.markets?.items?.map((market, i) => (
                            <PoolCard key={i} market={market} />
                        )) ??
                            new Array(3).fill(0).map((_, i) => (
                                <Skeleton key={i}>
                                    <PoolCard />
                                </Skeleton>
                            ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-md">
                        <PoolsTable />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-md">
                <h4 className="scroll-m-20 ">Highlighted Curators</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {Object.keys(curators)?.map((key) => (
                        <CuratorCard key={key} curator={curators?.[key]} />
                    )) ??
                        new Array(3).fill(0).map((_, i) => (
                            <Skeleton key={i}>
                                <CuratorCard />
                            </Skeleton>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Home
