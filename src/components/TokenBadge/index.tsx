import { useTokens } from '@/lib/useTokens'
import { getAddress } from 'viem'
import { useChainId } from 'wagmi'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FALLBACK_LOGO } from '@/utils/pools'
import { Skeleton } from '../ui/skeleton'

function TokenBadge({
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

    const {
        data: { sorted: sortedTokens },
    } = useTokens({})

    const token =
        typeof address !== 'undefined'
            ? sortedTokens?.find(
                  (t) => getAddress(t.id) === getAddress(address)
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
                                src={token?.icon ?? FALLBACK_LOGO}
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

export default TokenBadge
