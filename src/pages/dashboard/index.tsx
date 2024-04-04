import { tokens } from '@/data/tokens'
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
import { shortAddress } from '../../utils/address'
import { allPositionsQueryDocument } from '../../queries/positions'
import { useChainId } from 'wagmi'

function Dashboard() {
    const { data } = useGraphQL(allPositionsQueryDocument, {
        limit: 20,
    })
    const chainId = useChainId()
    if (!data?.positions?.items[0]?.pool.poolTokens || !chainId) return <></>
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
                            <TableHead className="text-left">Tokens</TableHead>
                            <TableHead className="text-right">Owner</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead className="text-right">
                                Pool TVL
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="cursor-pointer">
                        {data.positions.items.length > 0 &&
                            data.positions.items.map((position) => (
                                <TableRow
                                    key={position.pool.id.toString()}
                                    onClick={() =>
                                        (location.href = `/pool/${position.pool.id.toString()}`)
                                    }
                                >
                                    <TableCell>
                                        <div className="flex flex-row items-right gap-2">
                                            <div className="bg-purple-600 px-2 rounded-full text-xs">
                                                {position.pool.name}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="flex flex-row items-center">
                                                {position.pool.poolTokens.items.map(
                                                    (poolToken) => {
                                                        return (
                                                            <>
                                                                <img
                                                                    src={
                                                                        tokens[
                                                                            chainId
                                                                        ].find(
                                                                            (
                                                                                tkn
                                                                            ) =>
                                                                                tkn.symbol.toLowerCase() ===
                                                                                poolToken.token.symbol.toLowerCase()
                                                                        )?.logo
                                                                    }
                                                                    alt={
                                                                        poolToken
                                                                            .token
                                                                            .symbol
                                                                    }
                                                                    className="rounded-full size-8"
                                                                    style={{
                                                                        zIndex: 1,
                                                                        opacity:
                                                                            '70%',
                                                                    }}
                                                                />
                                                                <div
                                                                    className="bg-gray-600 px-2 rounded-full text-xs"
                                                                    style={{
                                                                        zIndex: 2,
                                                                        marginLeft:
                                                                            '-1rem',
                                                                        marginTop:
                                                                            '1rem',
                                                                    }}
                                                                >
                                                                    {
                                                                        poolToken
                                                                            .token
                                                                            .symbol
                                                                    }
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {shortAddress(position.accountId)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {position.liquidity.toLocaleString(
                                            undefined
                                        )}{' '}
                                        LP
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {position.pool.liquidity.toLocaleString(
                                            undefined
                                        )}{' '}
                                        LP
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
