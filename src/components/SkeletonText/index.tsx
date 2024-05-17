import { Skeleton } from '../ui/skeleton'

/**
 * Wrapper component for displaying a skeleton specifically for text inside a container.
 */
const SkeletonText = (): JSX.Element => {
    return (
        <Skeleton className={`w-full h-full`}>
            <h3 className="text-transparent dark:text-transparent selection:text-transparent">
                Loading
            </h3>
        </Skeleton>
    )
}

export default SkeletonText
