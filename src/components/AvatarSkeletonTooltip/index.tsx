import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

/**
 * Wrapper component for an avatar with a tooltip and skeleton loading state.
 */
const AvatarSkeletonTooltip = ({
    children,
    src,
    alt,
    loading,
    size = 'size-2xl',
}: {
    children: React.ReactNode
    src: string
    alt: string
    loading: boolean
    size?: string
}): JSX.Element => {
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {!loading ? (
                        <Avatar className={`rounded-full ${size}`}>
                            <AvatarImage src={src} alt={alt} />
                            <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar className={`rounded-full ${size}`}>
                            <Skeleton className={`w-full h-full`}></Skeleton>
                        </Avatar>
                    )}
                </TooltipTrigger>
                <TooltipContent>{children}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default AvatarSkeletonTooltip
