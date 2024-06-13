import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InfoCircledIcon } from '@radix-ui/react-icons'

import { useGraphQL } from '../../useGraphQL'
import { FragmentType, useFragment } from '../../gql'
import { MarketFragment, SYTokenQueryDocument } from '../../queries/markets'
import { AllMarketsQuery } from 'gql/graphql'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHeader,
    TableHead,
} from '@/components/ui/table'
import TokenHoldings from '../TokenHoldings'
import SkeletonText from '../SkeletonText'
import { formatNumber, formatWad } from '@/utils/numbers'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'

const tooltipContent = {
    rate: 'Amount of stETH per Standardized Yield token (composite token).',
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
    const navigate = useNavigate()
    const poolData = useFragment(MarketFragment, props.pool)
    const { data: sy, isFetching: isFetchingSY } = useGraphQL(
        SYTokenQueryDocument,
        {
            tokenId: poolData.pool.tokenX.id,
        }
    )
    const isMarketSelected = id?.comp(props.pool.id)

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
        </TableRow>
    )
}

export const TableHeaderWithTooltip: FC<{ title: string; content: string }> = ({
    title,
    content,
}) => {
    return (
        <TableHead className="text-left">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-row items-center gap-xs hover:text-primary">
                        <InfoCircledIcon />
                        {title}
                    </div>
                </TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </Tooltip>
        </TableHead>
    )
}

// Compares a market address with the fallback market address using their checksummed addresses.
function filterOnlyFallbackMarket(marketAddress: string): boolean {
    return marketAddress.comp(FALLBACK_MARKET_ADDRESS)
}

const PoolsTable: FC<{
    data: AllMarketsQuery
    isFetching: boolean
    amount?: number
}> = ({ data, isFetching, amount }) => {
    const pools = data?.markets?.items?.filter((market) =>
        filterOnlyFallbackMarket(market?.id)
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
                        <TableHeaderWithTooltip
                            title="stETH / SY"
                            content={tooltipContent.rate}
                        />
                        <TableHeaderWithTooltip
                            title="Volume"
                            content={tooltipContent.volume}
                        />
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
