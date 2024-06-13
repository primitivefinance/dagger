import React from 'react'
import { useAccount } from 'wagmi'
import { PositionsQuery, YieldPosition } from 'gql/graphql'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { TableHeaderWithTooltip } from '../PoolsTable'
import SkeletonText from '../SkeletonText'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Badge } from '../ui/badge'
import { formatNumber, formatPercentage } from '@/utils/numbers'

type YieldPositionRowProps = {
    position: YieldPosition
    preview?: { netYieldDelta: number; impliedYieldRate: number }
}

const YieldPositionRow: React.FC<YieldPositionRowProps> = ({
    position,
    preview,
}) => {
    const previewDelta = preview
        ? preview.netYieldDelta - position?.netYieldDelta
        : 0
    const previewHoldings = preview
        ? preview.netYieldDelta
        : position?.netYieldDelta
    const previewRate = preview
        ? preview.impliedYieldRate
        : position?.avgEntryImpliedRate

    return (
        <TableRow key={position?.id} className="hover:bg-transparent">
            <TableCell className="text-left">
                <Tooltip>
                    <TooltipTrigger>
                        <Badge variant="secondary">
                            <h4>stETH</h4>
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        Underlying yield-bearing asset.
                    </TooltipContent>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip>
                    <TooltipTrigger>
                        <Badge variant="secondary">
                            <h4>
                                {formatNumber(position?.netYieldDelta ?? 0)}
                            </h4>
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Notional size exposure.</TooltipContent>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip>
                    <TooltipTrigger>
                        <Badge variant="secondary">
                            <h4>
                                {formatPercentage(
                                    position?.avgEntryImpliedRate ?? 0
                                )}
                            </h4>
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        Implied entry APR. This rate is variable and can change.
                    </TooltipContent>
                </Tooltip>
            </TableCell>
            <TableCell>
                <h4 className="text-cyan">
                    {previewDelta > 0 ? formatNumber(previewDelta) : '-'}
                </h4>
            </TableCell>
            <TableCell>
                <h4 className="text-cyan">
                    {previewHoldings != position?.netYieldDelta
                        ? formatNumber(previewHoldings)
                        : '-'}
                </h4>
            </TableCell>
            <TableCell>
                <h4 className="text-cyan">
                    {previewRate != position?.avgEntryImpliedRate
                        ? formatPercentage(previewRate)
                        : '-'}
                </h4>
            </TableCell>
        </TableRow>
    )
}

const EmptyPositionsDataRow = ({
    cols = 6,
    rows = 1,
}: {
    cols?: number
    rows?: number
}): JSX.Element => {
    const row = (
        <TableRow key="loading">
            {Array.from({ length: cols }).map((_, i) => (
                <TableCell key={`loading-${i}`}>
                    <SkeletonText />
                </TableCell>
            ))}
        </TableRow>
    )

    return <>{Array.from({ length: rows }).map(() => row)}</>
}

type YieldPositionsTableProps = {
    data?: PositionsQuery
    isFetching?: boolean
    delta?: number
}

const YieldPositionsTable: React.FC<YieldPositionsTableProps> = ({
    data,
    isFetching,
    delta,
}) => {
    const { address } = useAccount()

    let positions = data?.yieldPositions?.items ?? []
    if (address)
        positions = positions.filter((item) => address.comp(item?.portfolioId))

    const preview = delta
        ? {
              netYieldDelta: Number(positions[0]?.netYieldDelta) + delta,
              impliedYieldRate: positions[0]?.avgEntryImpliedRate,
          }
        : undefined

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="text-left">Underlying</TableHead>
                    <TableHead className="text-left">Holdings</TableHead>
                    <TableHeaderWithTooltip
                        title="Rate"
                        content="Variable APR."
                    />
                    <TableHeaderWithTooltip
                        title="Preview Delta"
                        content="Type in a trade amount to preview the change in position."
                    />
                    <TableHeaderWithTooltip
                        title="Preview Holdings"
                        content="Type in a trade amount to preview the new position."
                    />
                    <TableHeaderWithTooltip
                        title="Preview APR"
                        content="Type in a trade amount to preview the new APR."
                    />
                </TableRow>
            </TableHeader>
            <TableBody>
                {isFetching ? (
                    <EmptyPositionsDataRow rows={1} />
                ) : (
                    positions?.map((position, i) => (
                        <YieldPositionRow
                            key={i}
                            position={position}
                            preview={preview}
                        />
                    )) ?? <EmptyPositionsDataRow rows={1} />
                )}
            </TableBody>
        </Table>
    )
}

export default YieldPositionsTable
