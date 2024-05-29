import {
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHeader,
    TableHead,
} from '../ui/table'

import { FragmentType, useFragment } from '../../gql'

import { FC } from 'react'
import { useGraphQL } from '../../useGraphQL'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useReadContract } from 'wagmi'
import { erc20Abi, getAddress } from 'viem'
import { formatNumber, formatWad } from '@/utils/numbers'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { Badge } from '../ui/badge'

import { MarketFragment, SYTokenQueryDocument } from '../../queries/markets'
import TokenHoldings from '../TokenHoldings'
import SkeletonText from '../SkeletonText'
import { AllMarketsQuery } from 'gql/graphql'
import { useMarketRoute } from '@/lib/useMarketRoute'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'

const tooltipContent = {
    lptOutstanding:
        'Liquidity pool tokens (LPTs) can be redeemed for the proportional amount of pool holdings.',
    curator:
        'Curators have power over pool calibration that can impact the value of deposits.',
    rate: 'Amount of stETH per Standardized Yield token (composite token).',
    autonomous: 'Algorithmic pool calibrated upon creation; cannot be altered.',
    volume: 'Total volume of trades in the pool, converted to the underlying asset then to USD.',
}

const EmptyPoolDataRow = ({ rows = 1 }: { rows?: number }): JSX.Element => {
    const row = (
        <TableRow key="loading">
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
            <TableCell className="text-left">
                <SkeletonText />
            </TableCell>
        </TableRow>
    )

    return <>{Array.from({ length: rows }).map(() => row)}</>
}

type PoolCellProps = {
    pool: FragmentType<typeof MarketFragment>
}

const PoolCell: FC<PoolCellProps> = (props: {
    pool: FragmentType<typeof MarketFragment>
}) => {
    const { id } = useParams()
    const isMarketSelected = id
        ? getAddress(id) === getAddress(props.pool.id)
        : false
    const navigate = useNavigate()
    const poolData = useFragment(MarketFragment, props.pool)
    const { data: sy, isFetching: isFetchingSY } = useGraphQL(
        SYTokenQueryDocument,
        {
            tokenId: poolData.pool.tokenX.id,
        }
    )

    // todo: this should be in the database instead of an onchain call.
    const { data: lpTokenSupply, isFetching: isFetchingLPSupply } =
        useReadContract({
            abi: erc20Abi,
            address: poolData.id as `0x${string}`,
            functionName: 'totalSupply',
        })

    return (
        <TableRow
            key={poolData.id}
            onClick={() =>
                isMarketSelected
                    ? navigate(`/`)
                    : navigate(`/market/${poolData.id}`)
            }
            className={`${isMarketSelected ? 'bg-blue/15 hover:bg-blue/15' : ''}`}
        >
            <TableCell className="text-left">
                {poolData.name ?? <SkeletonText />}
            </TableCell>
            <TableCell className="text-left">
                <TokenHoldings
                    tokens={[poolData?.pool?.tokenX, poolData?.pool?.tokenY]}
                    reserves={[
                        poolData?.pool?.reserveX,
                        poolData?.pool?.reserveY,
                    ]}
                />
            </TableCell>
            <TableCell className="text-left">
                {poolData?.expiry ? (
                    new Date(poolData.expiry * 1000).toLocaleDateString()
                ) : (
                    <SkeletonText />
                )}
            </TableCell>
            <TableCell className="text-left">
                {sy?.sYTokens.items?.[0] && !isFetchingSY ? (
                    <span>
                        {formatWad(sy?.sYTokens.items?.[0]?.exchangeRate)}
                    </span>
                ) : (
                    <SkeletonText />
                )}
            </TableCell>
            {/* <TableCell className="text-left">
                {lpTokenSupply && !isFetchingLPSupply ? (
                    <span>{formatWad(lpTokenSupply)}</span>
                ) : (
                    <SkeletonText />
                )}
            </TableCell> */}

            <TableCell className="text-left">
                {poolData?.pool?.aggregateVolumeInUnderlying ? (
                    <span>
                        {formatNumber(
                            poolData?.pool?.aggregateVolumeInUnderlying,
                            'USD'
                        )}
                    </span>
                ) : (
                    <SkeletonText />
                )}
            </TableCell>

            <TableCell className="text-left">
                <Badge variant="secondary">Autonomous</Badge>
            </TableCell>
        </TableRow>
    )
}

const PoolsTable: FC<{
    data: AllMarketsQuery
    isFetching: boolean
    amount?: number
}> = ({ data, isFetching, amount }) => {
    const pools = data?.markets?.items?.filter((market) =>
        market?.id
            ? getAddress(market?.id) === getAddress(FALLBACK_MARKET_ADDRESS)
            : true
    )

    return (
        <TooltipProvider delayDuration={50}>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">
                            Total Holdings
                        </TableHead>
                        <TableHead className="text-left">Expiry</TableHead>
                        <TableHead className="text-left">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-row items-center gap-xs hover:text-primary">
                                        <InfoCircledIcon />
                                        stETH / SY
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent.rate}
                                </TooltipContent>
                            </Tooltip>
                        </TableHead>
                        {/* <TableHead className="text-left">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-row items-center gap-xs hover:text-primary">
                                        <InfoCircledIcon />
                                        LPT Outstanding
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent.lptOutstanding}
                                </TooltipContent>
                            </Tooltip>
                        </TableHead> */}

                        <TableHead className="text-left">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-row items-center gap-xs hover:text-primary">
                                        <InfoCircledIcon />
                                        Volume
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent.volume}
                                </TooltipContent>
                            </Tooltip>
                        </TableHead>

                        <TableHead className="text-left">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-row items-center gap-xs hover:text-primary">
                                        <InfoCircledIcon />
                                        Curator
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent.curator}
                                </TooltipContent>
                            </Tooltip>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="cursor-pointer">
                    {isFetching ? (
                        <EmptyPoolDataRow rows={amount} />
                    ) : (
                        pools?.map((pool, i) => (
                            <PoolCell key={i} pool={pool} />
                        )) ?? <EmptyPoolDataRow rows={amount} />
                    )}
                </TableBody>
            </Table>
        </TooltipProvider>
    )
}

export default PoolsTable
