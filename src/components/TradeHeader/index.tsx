import { Switch } from '../ui/switch'

export type TradeHeaderProps = {
    underlying: string
    expiry: string
    currentRate: number
    isLong: boolean
    setLong: (long: boolean) => void
}

const TradeHeader: React.FC<TradeHeaderProps> = ({
    underlying,
    expiry,
    currentRate,
    isLong,
    setLong,
}) => {
    return (
        <>
            <div className="flex flex-row items-center gap-xl">
                <h2>{underlying}</h2>
                <h3>{expiry}</h3>
                <h3>Current Rate {currentRate}%</h3>
            </div>
            <div className="flex flex-row items-center gap-xl">
                <h4 className={isLong ? 'text-green' : ''}>
                    Long Variable Rate
                </h4>
                <Switch
                    checked={!isLong}
                    onCheckedChange={() => setLong(!isLong)}
                />
                <h4 className={!isLong ? 'text-red' : ''}>
                    Short Variable Rate
                </h4>
            </div>
        </>
    )
}

export default TradeHeader
