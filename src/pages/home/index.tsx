import { title, subtitle } from '@/data/copy/home'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { useGraphQL } from '../../useGraphQL'
import PoolsTable from '@/components/PoolsTable'
import { allPoolsQueryDocument } from '../../queries/pools'
import { zeroAddress } from 'viem'
import { LabelWithEtherscan } from '@/components/EtherscanLinkLabels'
import { Card } from '@/components/ui/card'
import { formatPercentage } from '@/utils/numbers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

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
        <Card className="p-lg hover:bg-muted/50">
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
                    <div className="flex flex-col gap-xs">
                        <DataLabelBetween
                            label={
                                <p className="text-muted dark:text-muted-foreground">
                                    Curator
                                </p>
                            }
                            data={<p>{curator.name}</p>}
                        />
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

function Home(): JSX.Element {
    const { data } = useGraphQL(allPoolsQueryDocument, { limit: 10 })

    return (
        <>
            <div className="w-full pt-16 pb-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="gap-sm flex flex-col">
                        <h2 className="scroll-m-20 ">{title}</h2>
                        <h4 className="scroll-m-20 text-muted-foreground">
                            {subtitle}
                        </h4>
                    </div>
                    <Separator className="my-4" />
                </div>
            </div>
            <div className="container mx-auto max-w-4xl gap-2xl flex flex-col">
                <div className="flex flex-col gap-md">
                    <div className="flex flex-row items-center w-full justify-between">
                        <h4 className="scroll-m-20">
                            Highlighted Pools ({data?.pools?.items?.length ?? 0}
                            )
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
                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                        <PoolsTable />
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
        </>
    )
}

export default Home
