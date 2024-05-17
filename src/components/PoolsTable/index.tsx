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
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem'
import { formatWad } from '@/utils/numbers'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { Badge } from '../ui/badge'

import {
    MarketFragment,
    SYTokenQueryDocument,
    allMarketsQueryDocument,
} from '../../queries/markets'
import TokenHoldings from '../TokenHoldings'
import SkeletonText from '../SkeletonText'

const tooltipContent = {
    lptOutstanding:
        'Liquidity pool tokens (LPTs) can be redeemed for the proportional amount of pool holdings.',
    curator:
        'Curators have power over pool calibration that can impact the value of deposits.',
    rate: 'Exchange rate from the underlying yield bearing asset to the standardized yield parent token.',
    autonomous: 'Algorithmic pool calibrated upon creation; cannot be altered.',
}

type PoolCellProps = {
    pool: FragmentType<typeof MarketFragment>
}

const PoolCell: FC<PoolCellProps> = (props: {
    pool: FragmentType<typeof MarketFragment>
}) => {
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
            onClick={() => navigate(`/market/${poolData.id}`)}
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
            <TableCell className="text-left">
                {lpTokenSupply && !isFetchingLPSupply ? (
                    <span>{formatWad(lpTokenSupply)}</span>
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

const PoolsTable: FC = () => {
    const { data } = useGraphQL(allMarketsQueryDocument, { limit: 10 })
    const pools = data?.markets?.items

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
                                        Rate
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {tooltipContent.rate}
                                </TooltipContent>
                            </Tooltip>
                        </TableHead>
                        <TableHead className="text-left">
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
                        </TableHead>

                        <TableHead className="text-left">
                            <TooltipProvider delayDuration={200}>
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
                            </TooltipProvider>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="cursor-pointer">
                    {pools?.map((pool, i) => <PoolCell key={i} pool={pool} />)}
                </TableBody>
            </Table>
        </TooltipProvider>
    )
}

export default PoolsTable
