import { FC, useEffect, useState } from 'react'
import { useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'

import { useGraphQL } from '../../useGraphQL'

import {
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHeader,
    TableHead,
} from '@/components/ui/table'
import { allSwapsQueryDocument } from '../../queries/swap'
import {
    allAllocatesQueryDocument,
    allDeallocatesQueryDocument,
} from '../../queries/liquidity'
import { Button } from '../ui/button'

type Event = {
    action: string
    deltas: number[]
    sender: `0x${string}`
    timestamp: number
    transaction: `0x${string}`
}
type TransactionTableProps = {
    poolId: string
    poolTokens: any[]
}

const TransactionTable: FC<TransactionTableProps> = ({
    poolId,
    poolTokens,
}) => {
    const chainId = useChainId()

    const [page, setPage] = useState(5) // 5 per page

    const swaps = useGraphQL(allSwapsQueryDocument, { poolId })
    const allocs = useGraphQL(allAllocatesQueryDocument, { poolId })
    const deallocs = useGraphQL(allDeallocatesQueryDocument, { poolId })

    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const parsed: Event[] = []
        swaps?.data?.swaps.items.map((swap) => {
            parsed.push({
                action: 'Swap',
                deltas: [swap.amountIn.toFixed(3), swap.amountOut.toFixed(3)],
                sender: swap.sender,
                timestamp: swap.timestamp,
                transaction: swap.id,
            })
        })
        allocs?.data?.allocates.items.map((alloc) => {
            parsed.push({
                action: 'Allocate',
                deltas: alloc.deltas?.concat().map((d) => d.toFixed(3)),
                sender: alloc.sender,
                timestamp: alloc.timestamp,
                transaction: alloc.id,
            })
        })
        deallocs?.data?.deallocates.items.map((dealloc) => {
            parsed.push({
                action: 'Deallocate',
                deltas: dealloc.deltaLiquidity?.toFixed(3),
                sender: dealloc.sender,
                timestamp: dealloc.timestamp,
                transaction: dealloc.id,
            })
        })
        setEvents(parsed)
    }, [swaps.isFetched, allocs.isFetched, deallocs.isFetched])

    if (!swaps.data) return <>Loading Transactions...</>
    return (
        <>
            {' '}
            <div className="flex w-full items-center justify-between">
                <Button
                    disabled={page === 5 ? true : false}
                    onClick={() => {
                        setPage(page - 5)
                    }}
                >
                    Previous Page
                </Button>
                <span>
                    Page {page / 5} of {(events.length / 5).toFixed()}
                </span>
                <Button
                    disabled={
                        page === Number((events.length / 5).toFixed())
                            ? true
                            : false
                    }
                    onClick={() => {
                        setPage(page + 5)
                    }}
                >
                    Next Page
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Deltas</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((event, i) => {
                            if (i + 1 < page - 5 || i + 1 > page) return <></>
                            return (
                                <TableRow key={i}>
                                    <TableCell>{event.action}</TableCell>
                                    <TableCell>
                                        {event.action === 'Deallocate' ? (
                                            <div className="flex flex-row justify-between">
                                                <div>{'LPT'}</div>
                                                {'-' + event.deltas}
                                            </div>
                                        ) : (
                                            event?.deltas?.map((d, z) => {
                                                return (
                                                    <div
                                                        key={z}
                                                        className="flex flex-row justify-between"
                                                    >
                                                        <div>
                                                            {
                                                                poolTokens[z]
                                                                    .token
                                                                    .symbol
                                                            }
                                                        </div>
                                                        <>
                                                            {event.action ===
                                                                'Swap' &&
                                                            z === 0 ? (
                                                                <>
                                                                    {'-'}
                                                                    {d}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {'+'}
                                                                    {d}
                                                                </>
                                                            )}
                                                        </>
                                                    </div>
                                                )
                                            })
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {shortAddress(event.sender)}
                                    </TableCell>
                                    <TableCell>
                                        {shortAddress(event.transaction)}
                                    </TableCell>
                                    <TableCell>{event.timestamp}</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </>
    )
}

export default TransactionTable
