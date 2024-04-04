import { tokens } from '@/data/tokens'
import { usePrices } from '@/store/PricesContext'
import { Link } from 'react-router-dom'
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useGraphQL } from '../../useGraphQL'
import { allPositionsQueryDocument } from '../../queries/positions'
import { useAccount } from 'wagmi'
import { useState } from 'react'

function Dashboard() {
    const { status, data } = useGraphQL(allPositionsQueryDocument, { limit: 20})
    const { prices } = usePrices().state

    const { address } = useAccount()

    if (!data?.positions?.items[0]?.pool.poolTokens) return <></>
    return (
        <div className="container mx-auto max-w-4xl gap-2 flex flex-col my-12">
            <div className="flex flex-row items-center w-full justify-between">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    All Positions ({data.positions.items.length})
                </h3>
                <Button variant="secondary" asChild>
                    <Link to="/">
                        <svg
                            className="w-4 h-3 text-dagger4"
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
                        Browse pools
                    </Link>
                </Button>
            </div>
            <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Pool</TableHead>
                            <TableHead className="text-right">Owner</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead className="text-right">Pool TVL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.positions.items.length > 0 &&
                            data.positions.items.map((position) => (
                                <TableRow
                                    key={position.pool.id.toString()}
                                    onClick={() =>
                                        (location.href = `/pool/${position.pool.id.toString()}`)
                                    }
                                >
                                    <TableCell>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="flex flex-row items-center">
                                                {/** position.pool.poolTokens.items.map((poolToken) => {
                                                    <img
                                                    src={
                                                        tokens.find(
                                                            (token) => token.symbol.toLowerCase() === poolToken.symbol.toLowerCase()
                                                        )?.logo
                                                    }
                                                    alt={
                                                        poolToken.symbol
                                                    }
                                                    className="rounded-full size-8"
                                                    style={{ zIndex: 1 }}
                                                />})*/}
                                            </div>
                                            <div className="flex flex-col font-bold">
                                                <div className="flex flex-row gap-2">
                                                    {position.pool.poolTokens.items.map((poolToken) => 
                                                        <div className="bg-gray-600 px-2 rounded-full text-xs">
                                                            {poolToken.token.symbol}
                                                        </div> 
                                                    )}
                                                    <div className="bg-blue-600 px-2 rounded-full text-xs">
                                                        0%
                                                    </div>
                                                    <div className="bg-purple-600 px-2 rounded-full text-xs">
                                                        {position.pool.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {position.accountId.substring(0, 10)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {(position.liquidity).toLocaleString(undefined)} LP
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {(position.pool.liquidity).toLocaleString(undefined)} LP
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Dashboard
