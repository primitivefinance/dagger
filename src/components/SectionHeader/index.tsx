import React from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '../ui/skeleton'
import { LoadingDots } from '../TransactionButton'
import { ReloadIcon } from '@radix-ui/react-icons'

type SectionHeaderProps = {
    title?: string
    quantity?: number
    refetch?: () => void
    isFetching?: boolean
    isLoading?: boolean
    children?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    quantity,
    refetch,
    isFetching,
    isLoading,
    children,
}) => {
    return (
        <div className="flex flex-row items-center w-full justify-between border bg-muted/50 p-md">
            <div className="flex flex-row gap-md items-center">
                <h4 className="scroll-m-20">{title}</h4>
                {quantity || isFetching ? (
                    <h4 className="flex flex-row gap-xs items-center">
                        ({quantity ?? <Skeleton className="h-4 w-12" />})
                    </h4>
                ) : null}
                {refetch && (
                    <Button
                        variant="transparent"
                        size="icon"
                        onClick={() => refetch()}
                        disabled={isFetching || isLoading}
                    >
                        {isFetching ? <LoadingDots /> : <ReloadIcon />}
                    </Button>
                )}
            </div>

            {children}
        </div>
    )
}

export default SectionHeader
