import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const MarketStatCard = ({
    label,
    data,
}: {
    label: React.ReactNode
    data: React.ReactNode
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-xs border items-center justify-center text-center p-md">
            <h4 className="text-muted-foreground">{label}</h4>
            <h3>{data}</h3>
        </div>
    )
}

const MarketView = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-2xl p-xl">
            <div className="flex flex-row gap-sm justify-between items-center">
                <Avatar className="h-48 w-48">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-sm w-1/4">
                    <Button size="lg" variant="tx">
                        Buy
                    </Button>
                    <Button size="lg" variant="info">
                        Sell
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-xs">
                <h2>Name</h2>
                <h4 className="text-muted-foreground">
                    This is a description of the market.
                </h4>
            </div>
            <div className="flex h-96 w-full items-center justify-center text-center border">
                <h1 className="text-muted-foreground/25">Chart</h1>
            </div>
            <div className="grid grid-cols-3 gap-lg">
                <MarketStatCard label="Volume" data="$10,000" />
                <MarketStatCard label="Liquidity" data="$10,000" />
                <MarketStatCard label="Price" data="$10,000" />
            </div>
        </div>
    )
}

export default MarketView
