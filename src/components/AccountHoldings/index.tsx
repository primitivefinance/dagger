import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TokenBadge } from '../PoolsTable'
import { tokens } from '@/data/tokens'

const DataItem = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-xs">
            <h5 className="text-muted-foreground">{label}</h5>
            <h4>{value}</h4>
        </div>
    )
}

const AccountInfo = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-0 border-b">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Portfolio</h4>
            </div>
            <div className="flex flex-row gap-sm items-center justify-between py-lg px-md">
                <Avatar className="h-24 w-24">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <DataItem label="Account" value="Alice.eth" />
                <DataItem label="Wealth" value="$10,000" />
            </div>
        </div>
    )
}

const TokenBalance = ({
    ticker,
    token,
}: {
    ticker: string
    token: `0x${string}`
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-sm items-center justify-center">
            <h5 className="text-muted-foreground">{ticker}</h5>
            <TokenBadge address={token} size="size-2xl" chainId={11155420} />
            <h4>0.00</h4>
        </div>
    )
}

const Holdings = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-0 border-b">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Holdings</h4>
            </div>
            <div className="grid grid-cols-3 gap-sm items-center py-lg px-md">
                {tokens?.[11155420]?.map((token) => (
                    <TokenBalance
                        key={token.address}
                        token={token.address}
                        ticker={token?.symbol}
                    />
                ))}
            </div>
        </div>
    )
}

const AccountHoldings = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-0 border">
            <AccountInfo />
            <Holdings />
        </div>
    )
}

export default AccountHoldings
