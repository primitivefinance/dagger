import { InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'

const InfoHeader: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="flex flex-row items-center w-full justify-between border bg-blue/20 p-md">
            <div className="flex flex-row gap-md items-center text-muted dark:text-muted-foreground">
                <InfoCircledIcon />
                <h5 className="scroll-m-20 ">{title}</h5>
            </div>
        </div>
    )
}

export default InfoHeader
