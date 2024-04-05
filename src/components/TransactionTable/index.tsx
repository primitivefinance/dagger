{/*import { FC, useEffect } from 'react'
import { useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'
import { parseEther } from 'viem'

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

type TransactionTableProps = {
    poolId: string
}
const TransactionTable: FC<TransactionTableProps> = ({ poolId }) => {
    const chainId = useChainId()

    const dt = useGraphQL(allSwapsQueryDocument, { poolId })

    const swaps = dt.data

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Swap</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}

export default TransactionTable
*/}