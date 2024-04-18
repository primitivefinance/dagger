import {
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHeader,
    TableHead,
} from '../ui/table'

import { FragmentType, useFragment } from '../../gql'
import {
    PoolFragment,
    TokenFragment,
    allPoolsQueryDocument,
} from '../../queries/pools'
import { tokens } from '@/data/tokens'

import { FC } from 'react'
import { useGraphQL } from '../../useGraphQL'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Link2Icon } from '@radix-ui/react-icons'
import { useChainId } from 'wagmi'

type TokenCellProps = {
    token: FragmentType<typeof TokenFragment>
    index: number
    zIndex: number
}

const TokenCell: FC<TokenCellProps> = ({ token, index, zIndex }) => {
    const tokenData = useFragment(TokenFragment, token)
    const chainId = useChainId()

    return (
        <img
            key={tokenData.token.id}
            src={
                tokens[chainId].find(
                    (tkn) =>
                        tkn.symbol.toLowerCase() ===
                        tokenData.token.symbol.toLowerCase()
                )?.logo
            }
            alt={tokenData.token.symbol}
            className="rounded-full size-8"
            style={{
                marginLeft: index > 0 ? '-8px' : 0,
                zIndex: zIndex,
            }}
        />
    )
}

type PoolCellProps = {
    pool: FragmentType<typeof PoolFragment>
}

const PoolCell: FC<PoolCellProps> = (props: {
    pool: FragmentType<typeof PoolFragment>
}) => {
    const poolData = useFragment(PoolFragment, props.pool)
    const navigate = useNavigate()
    return (
        <TableRow
            key={poolData.id}
            onClick={() => navigate(`/pool/${poolData.id}`)}
        >
            <TableCell>
                <div className="flex flex-row items-center">
                    {poolData?.poolTokens?.items?.map((poolToken, index) => (
                        <TokenCell
                            key={index}
                            token={poolToken}
                            index={index}
                            zIndex={
                                (poolData?.poolTokens?.items
                                    ?.length as number) - index
                            }
                        />
                    ))}
                </div>
            </TableCell>
            <TableCell className="text-right">{poolData.name}</TableCell>
            <TableCell className="text-right">$0.0</TableCell>
            <TableCell className="text-right">$0.0</TableCell>
            <TableCell className="text-right">$0.0</TableCell>
            <TableCell className="text-right">$0.0</TableCell>
            <TableCell className="text-right">$0.0</TableCell>
        </TableRow>
    )
}

const PoolsTable: FC = () => {
    const { data } = useGraphQL(allPoolsQueryDocument, { limit: 10 })
    const pools = data?.pools?.items

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Composition</TableHead>
                    <TableHead className="text-right">Name</TableHead>
                    <TableHead className="text-right">TVL</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                    <TableHead className="text-right">Volume (1w)</TableHead>
                    <TableHead className="text-right">Volume (1m)</TableHead>
                    <TableHead className="text-right">Fees (24h)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="cursor-pointer">
                {pools?.map((pool, i) => <PoolCell key={i} pool={pool} />)}
            </TableBody>
        </Table>
    )
}

export default PoolsTable
