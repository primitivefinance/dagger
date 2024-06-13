import { InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'

const InfoCard: React.FC<{ title: string; content: string }> = ({
    title,
    content,
}) => {
    return (
        <div className={`flex flex-col gap-sm border p-md`}>
            <InfoCircledIcon className="text-muted dark:text-muted-foreground" />
            <div className="flex flex-row gap-xs items-center">
                <p>{title}</p>
            </div>

            <div className="flex flex-row gap-xs items-center">
                <p className="text-muted dark:text-muted-foreground">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default InfoCard
