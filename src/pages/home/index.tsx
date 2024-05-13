import { title, subtitle } from '@/data/copy/home'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { useGraphQL } from '../../useGraphQL'
import { allMarketsQueryDocument, MarketFragment } from '../../queries/markets'
import { zeroAddress } from 'viem'
import { LabelWithEtherscan } from '@/components/EtherscanLinkLabels'
import { Card } from '@/components/ui/card'
import { formatNumber, formatPercentage } from '@/utils/numbers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { TokenBadge } from '@/components/PoolsTable'

type CuratorInfo = {
    name: string
    description: string
    fees: string
    pools: number
    address: `0x${string}`
}

const curators: { [key: string]: CuratorInfo } = {
    autonomous: {
        name: 'Autonomous',
        description:
            'The default pool curator. These pools are calibrated upon creation and cannot be altered during operations.',
        fees: '0.000',
        pools: 5,
        address: zeroAddress,
    },
}

const DataLabelBetween = ({
    label,
    data,
}: {
    label: React.ReactNode
    data: React.ReactNode
}): JSX.Element => {
    return (
        <div className="flex flex-row gap-sm items-center justify-between">
            {label}
            {data}
        </div>
    )
}

export const CuratorCard = ({
    curator,
}: {
    curator: CuratorInfo
}): JSX.Element => {
    return (
        <Card className="p-lg hover:bg-muted/50 rounded-none">
            <Link
                to={`/curator/${curator.address}`}
                className="block hover:no-underline h-full"
            >
                <div className="flex flex-col gap-lg h-full">
                    <div className="flex w-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col gap-xs justify-center items-center">
                        <h3>{curator.name}</h3>
                        <LabelWithEtherscan
                            label={
                                <p className="text-muted dark:text-muted-foreground">
                                    Address
                                </p>
                            }
                            address={curator.address}
                        />
                    </div>

                    <div className="flex flex-col justify-between h-full gap-lg">
                        <div className="flex flex-col gap-sm">
                            <h5 className="text-muted dark:text-muted-foreground">
                                Description
                            </h5>
                            <p className="">{curator.description}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <DataLabelBetween
                                label={
                                    <p className="text-muted dark:text-muted-foreground">
                                        Avg. Fee
                                    </p>
                                }
                                data={
                                    <p className="">
                                        {formatPercentage(
                                            parseFloat(curator.fees)
                                        )}
                                    </p>
                                }
                            />
                            <DataLabelBetween
                                label={
                                    <p className="text-muted dark:text-muted-foreground">
                                        Pools
                                    </p>
                                }
                                data={<p className="">{curator.pools}</p>}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    )
}

const HoldingsCell = ({ poolTokens, reserves }) => {
    return (
        <div className="flex flex-wrap items-center gap-xs">
            {poolTokens.map((token, index) => {
                const reserve = reserves[index]

                return (
                    <div
                        key={index}
                        className="flex flex-row items-center gap-xs"
                    >
                        <TokenBadge
                            address={token?.token?.id as `0x${string}`}
                        />
                        <span>{formatNumber(reserve)}</span>
                        {index === poolTokens.length - 1 ? null : (
                            <span className="text-dagger4">/</span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export type Market = {
    expiry: number
    id: string
    name: string
    pool: any
    pt: any
    sy: any
    yt: any
}
export const PoolCard = ({ market }: { market: Market }): JSX.Element => {
    console.log(market)
    return (
        <Card className="p-lg hover:bg-muted/50 rounded-none">
            <Link
                to={`/market/${market?.id}`}
                className="block hover:no-underline h-full"
            >
                <div className="flex flex-col gap-lg h-full justify-between">
                    <div className="flex w-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col gap-xs justify-center items-center">
                        <h3>{market.name}</h3>

                        <LabelWithEtherscan
                            label={
                                <small className="text-muted dark:text-muted-foreground">
                                    Address
                                </small>
                            }
                            address={market.id as any}
                        />
                    </div>

                    <div className="flex flex-col gap-sm">
                        <h5 className="text-muted dark:text-muted-foreground">
                            Holdings
                        </h5>
                        <HoldingsCell
                            poolTokens={[
                                market.pool.tokenX,
                                market.pool.tokenY,
                            ]}
                            reserves={[
                                market.pool.reserveX,
                                market.pool.reserveY,
                            ]}
                        />
                    </div>

                    <div className="flex flex-col h-full gap-sm justify-end">
                        <div className="flex flex-row gap-sm items-center justify-between">
                            <small className="text-muted dark:text-muted-foreground">
                                Total Supply
                            </small>
                            <small>{formatNumber(1000)}</small>
                        </div>
                        <LabelWithEtherscan
                            label={
                                <small className="text-muted dark:text-muted-foreground">
                                    Curator
                                </small>
                            }
                            address={zeroAddress}
                        />
                    </div>
                </div>
            </Link>
        </Card>
    )
}

function Home(): JSX.Element {
    const { data } = useGraphQL(allMarketsQueryDocument, { limit: 10 })
    console.log(data?.markets.items.map((market) => console.log(market)))
    if (!data?.markets?.items) return <></>
    return (
        <div className="flex flex-col gap-2xl">
            <div className="gap-sm flex flex-col">
                <h2 className="scroll-m-20 ">{title}</h2>
                <h4 className="scroll-m-20 text-muted-foreground">
                    {subtitle}
                </h4>
            </div>
            <div className="flex flex-col gap-md">
                <div className="flex flex-row items-center w-full justify-between">
                    <h4 className="scroll-m-20">
                        Yield Markets ({data?.markets?.items?.length ?? 0})
                    </h4>
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {data?.markets.items.map((market, i) => (
                        <PoolCard key={i} market={market} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-md">
                <h4 className="scroll-m-20 ">Highlighted Curators</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {Object.keys(curators).map((key) => (
                        <CuratorCard key={key} curator={curators?.[key]} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
