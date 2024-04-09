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
                action: 'Allocate',
                deltas: dealloc.deltas?.concat().map((d) => d.toFixed(3)),
                sender: dealloc.sender,
                timestamp: dealloc.timestamp,
                transaction: dealloc.id,
            })
        })
        setEvents(parsed)
    }, [swaps, allocs, deallocs])

    if (!swaps.data) return <>Loading Transactions...</>
    return (
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
                    .sort((a, b) => a.timestamp + b.timestamp)
                    .map((event, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    {!event.deltas
                                        ? 'Pool Created'
                                        : event.action}
                                </TableCell>
                                <TableCell>
                                    {event.deltas?.map((d, z) => (
                                        <div
                                            key={z}
                                            className="flex flex-row justify-between"
                                        >
                                            <div>
                                                {poolTokens[z].token.symbol}
                                            </div>
                                            <>
                                                {event.action === 'Swap' &&
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
                                    ))}
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
    )
}

export default TransactionTable
