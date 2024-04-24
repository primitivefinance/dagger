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
import { EtherscanLink, EtherscanTxLink } from '../EtherscanLinkLabels'
import { getAddress } from 'viem'
import { FALLBACK_LOGO } from '@/utils/pools'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { TokenBadge } from '@/pages/pool'

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
        <div className="flex flex-col gap-md">
            <h5 className="text-primary">Recent Transactions</h5>
            <Table className="border">
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
                                        <div className="flex flex-row gap-xs overflow-x-auto">
                                            {event.action === 'Deallocate' ? (
                                                <div
                                                    key={'lpt'}
                                                    className="flex flex-row items-center gap-xs"
                                                >
                                                    <TokenBadge
                                                        address={undefined}
                                                    />
                                                    <>{'-' + event.deltas}</>
                                                </div>
                                            ) : (
                                                event?.deltas?.map((d, z) => {
                                                    const token = poolTokens[z]
                                                    return (
                                                        <div
                                                            key={z}
                                                            className="flex flex-row justify-between"
                                                        >
                                                            <div
                                                                key={z}
                                                                className="flex flex-row items-center gap-xs"
                                                            >
                                                                <TokenBadge
                                                                    address={
                                                                        token
                                                                            ?.token
                                                                            ?.id as `0x${string}`
                                                                    }
                                                                />
                                                                <>
                                                                    {event.action ===
                                                                        'Swap' &&
                                                                    z === 0 ? (
                                                                        <>
                                                                            {
                                                                                '-'
                                                                            }
                                                                            {d}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {
                                                                                '+'
                                                                            }
                                                                            {d}
                                                                        </>
                                                                    )}
                                                                </>
                                                                {z ===
                                                                poolTokens.length -
                                                                    1 ? null : (
                                                                    <span className="text-dagger4">
                                                                        /
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <EtherscanLink address={event.sender} />
                                    </TableCell>
                                    <TableCell>
                                        <EtherscanTxLink
                                            txHash={event.transaction}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            event.timestamp * 1000
                                        ).toISOString()}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
            <div className="flex w-full items-center justify-end gap-xl p-2">
                <div className="flex flex-row gap-md items-center">
                    <Button
                        disabled={page === 5 ? true : false}
                        onClick={() => {
                            setPage(page - 5)
                        }}
                        variant="outline"
                    >
                        <ArrowLeftIcon />
                    </Button>
                    <Button disabled variant="outline">
                        Page {page / 5} of {(events.length / 5).toFixed()}
                    </Button>

                    <Button
                        variant="outline"
                        disabled={
                            page === Number((events.length / 5).toFixed())
                                ? true
                                : false
                        }
                        onClick={() => {
                            setPage(page + 5)
                        }}
                    >
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TransactionTable
