import { PoolToken, PoolWithTokensFragment } from 'gql/graphql'
import { erc20Abi, zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { formatWad } from '@/utils/numbers'
import { dfmmAddress, nG3mStrategy } from '@/data/contracts'
import { Skeleton } from '../ui/skeleton'
import { PoolTypes, getPoolType } from '@/utils/pools'
import { Badge } from '../ui/badge'

type PoolInfoItem = {
    key: React.ReactNode
    value: React.ReactNode
}

/// todo: add controller to strategy query
function PoolInfo({
    pool,
    items = [],
    title = 'Pool Info',
}: {
    pool: PoolWithTokensFragment
    items?: PoolInfoItem[]
    title?: string
}): JSX.Element {
    const poolType = getPoolType(pool)

    const { data: lpTokenSupply } = useReadContract({
        abi: erc20Abi,
        address: pool.lpToken as `0x${string}`,
        functionName: 'totalSupply',
    })

    items = [
        {
            key: 'Name',
            value: (
                <LabelWithEtherscan
                    label={pool.name}
                    address={pool.lpToken as `0x${string}`}
                />
            ),
        },

        {
            key: 'Strategy',
            value: (
                <LabelWithEtherscan
                    label={pool.strategy.name}
                    address={
                        poolType == PoolTypes.nTokenGeometricMean
                            ? nG3mStrategy
                            : nG3mStrategy
                    }
                />
            ),
        },
        {
            key: 'Curator',
            value: (
                <LabelWithEtherscan
                    label={
                        <Badge variant="secondary">
                            {pool?.strategy?.controller == zeroAddress ||
                            !pool?.strategy?.controller
                                ? 'Autonomous'
                                : 'Curated'}
                        </Badge>
                    }
                    address={pool?.strategy?.controller ?? zeroAddress}
                />
            ),
        },
        {
            key: 'Protocol',
            value: (
                <LabelWithEtherscan
                    label={<Badge variant="blue">DFMM v0.2.0</Badge>}
                    address={dfmmAddress as `0x${string}`}
                />
            ),
        },
        {
            key: 'Tokens',
            value: pool?.poolTokens?.items.map((poolToken: PoolToken) => {
                return (
                    <LabelWithEtherscan
                        key={poolToken.token.id}
                        label={poolToken.token.symbol}
                        address={poolToken.token.id as `0x${string}`}
                    />
                )
            }),
        },

        {
            key: 'Ticker',
            value: 'TODO',
        },
        {
            key: 'Pool #',
            value: pool.id,
        },
        {
            key: 'Created',
            value: new Date(pool.initTimestamp * 1000).toISOString(),
        },
        {
            key: 'Total Supply',
            value: (
                <>
                    {lpTokenSupply ? (
                        <p className="text-sm">{formatWad(lpTokenSupply)}</p>
                    ) : (
                        <Skeleton />
                    )}
                </>
            ),
        },
    ]

    const firstColumnLength = Math.max(items.length / 2)
    return (
        <section id="pool-info">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>
                                <h5 className="text-primary">{title}</h5>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, i) => {
                            if (i < firstColumnLength) {
                                return (
                                    <TableRow key={i}>
                                        <TableHead>{item.key}</TableHead>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, i) => {
                            if (i >= firstColumnLength) {
                                return (
                                    <TableRow key={i}>
                                        <TableHead>{item.key}</TableHead>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default PoolInfo
