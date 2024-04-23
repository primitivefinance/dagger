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
import {
    InfoCircledIcon,
    Link2Icon,
    QuestionMarkIcon,
} from '@radix-ui/react-icons'
import { useChainId, useReadContract } from 'wagmi'
import { erc20Abi, getAddress } from 'viem'
import { formatNumber, formatWad } from '@/utils/numbers'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { Badge } from '../ui/badge'

const tooltipContent = {
    lptOutstanding:
        'Liquidity pool tokens (LPTs) can be redeemed for the proportional amount of pool holdings.',
    curator:
        'Curators have power over pool calibration that can impact the value of deposits.',
    autonomous: 'Algorithmic pool calibrated upon creation; cannot be altered.',
}

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

const HoldingsCell = ({ poolTokens, reserves }) => {
    const chainId = useChainId()
    return (
        <div className="flex flex-row items-center gap-xs">
            {poolTokens.map((token, index) => {
                const reserve = reserves[index]

                return (
                    <div
                        key={index}
                        className="flex flex-row items-center gap-xs"
                    >
                        <img
                            src={
                                tokens?.[chainId].find(
                                    (tkn) =>
                                        getAddress(tkn.address) ===
                                        getAddress(token.token.id)
                                )?.logo
                            }
                            alt={token.symbol}
                            className="rounded-full size-lg"
                        />
                        <span>{formatNumber(reserve)}</span>
                        {index === poolTokens.length - 1 ? null : (
                            <span className="text-dagger4">/</span>
                        )}
                    </div>
                )
            })}
        </div>
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

    const poolTokens = poolData?.poolTokens?.items?.map(
        (poolToken) => poolToken
    )
    const reserves = poolData?.reserves?.map((reserve) => reserve)

    // todo: this should be in the database instead of an onchain call.
    const { data: lpTokenSupply } = useReadContract({
        abi: erc20Abi,
        address: poolData.lpToken as `0x${string}`,
        functionName: 'totalSupply',
    })

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
            <TableCell className="text-left">{poolData.name}</TableCell>
            <TableCell className="text-left">
                <HoldingsCell poolTokens={poolTokens} reserves={reserves} />
            </TableCell>
            <TableCell className="text-left">
                <div className="flex flex-row items-center gap-xs">
                    <span>
                        {lpTokenSupply
                            ? formatWad(lpTokenSupply)
                            : 'Loading...'}
                    </span>
                </div>
            </TableCell>

            <TableCell className="text-left">
                <Badge variant="secondary">Autonomous</Badge>
            </TableCell>
        </TableRow>
    )
}

const PoolsTable: FC = () => {
    const { data } = useGraphQL(allPoolsQueryDocument, { limit: 10 })
    const pools = data?.pools?.items

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="text-left">Tokens</TableHead>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-left">Total Holdings</TableHead>
                    <TableHead className="text-left">
                        <TooltipProvider delayDuration={200}>
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
                        </TooltipProvider>
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
    )
}

export default PoolsTable
