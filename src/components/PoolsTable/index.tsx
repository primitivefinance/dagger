import {
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHeader,
    TableHead,
} from '../ui/table'

import { FragmentType, useFragment } from '../../gql'
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
import { FALLBACK_LOGO } from '@/utils/pools'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'
import { MarketFragment, allMarketsQueryDocument } from '../../queries/markets'
import TokenHoldings from '../TokenHoldings'
import SkeletonText from '../SkeletonText'

const tooltipContent = {
    lptOutstanding:
        'Liquidity pool tokens (LPTs) can be redeemed for the proportional amount of pool holdings.',
    curator:
        'Curators have power over pool calibration that can impact the value of deposits.',
    autonomous: 'Algorithmic pool calibrated upon creation; cannot be altered.',
}

export function TokenBadge({
    address,
    size = 'size-2xl',
    chainId,
    symbol,
}: {
    address?: `0x${string}`
    size?: string
    chainId?: number
    symbol?: string
}): JSX.Element {
    const connectedChainId = useChainId()

    if (typeof chainId === 'undefined') {
        chainId = connectedChainId
    }

    const token =
        typeof address !== 'undefined'
            ? tokens?.[chainId]?.find(
                  (t) => getAddress(t.address) === getAddress(address)
              )
            : undefined
    const FALLBACK_SYMBOL = 'N/A'

    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger>
                    {address ? (
                        <Avatar className={`rounded-full ${size}`}>
                            <AvatarImage
                                src={token?.logo ?? FALLBACK_LOGO}
                                alt={token?.symbol ?? FALLBACK_SYMBOL}
                            />
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar className={`rounded-full ${size}`}>
                            <Skeleton className={`w-full h-full`}></Skeleton>
                        </Avatar>
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    {symbol ?? token?.symbol ?? FALLBACK_SYMBOL}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
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
                tokens?.[chainId]?.find(
                    (tkn) =>
                        tkn.symbol.toLowerCase() ===
                        tokenData.token.symbol.toLowerCase()
                )?.logo ?? FALLBACK_LOGO
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
    pool: FragmentType<typeof MarketFragment>
}

const PoolCell: FC<PoolCellProps> = (props: {
    pool: FragmentType<typeof MarketFragment>
}) => {
    const navigate = useNavigate()
    const poolData = useFragment(MarketFragment, props.pool)

    // todo: this should be in the database instead of an onchain call.
    const { data: lpTokenSupply, isFetching } = useReadContract({
        abi: erc20Abi,
        address: poolData.id as `0x${string}`,
        functionName: 'totalSupply',
    })

    return (
        <TableRow
            key={poolData.id}
            onClick={() => navigate(`/market/${poolData.id}`)}
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
                {lpTokenSupply && !isFetching ? (
                    <span>{formatWad(lpTokenSupply)}</span>
                ) : (
                    <SkeletonText />
                )}
            </TableCell>

            <TableCell className="text-left">
                <Badge variant="secondary">Autonomous</Badge>
            </TableCell>
        </TableRow>
    )
}

const PoolsTable: FC = () => {
    const { data } = useGraphQL(allMarketsQueryDocument, { limit: 10 })
    const pools = data?.markets?.items

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
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
