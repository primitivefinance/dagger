import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from 'react-router-dom'

import type { ytData, lptData } from '@/data/tokens'
import { lpTokenMetadata } from '../../data/tokens'

export type TradeInfoProps = {
    metadata: ytData | lptData | null
}
const TradeInfo: FC<TradeInfoProps> = ({ metadata }) => {
    enum dataType {
        'yt',
        'lpt',
        'erc',
    }

    const mdType =
        metadata.syToken === undefined
            ? metadata.description
                ? dataType.lpt
                : dataType.erc
            : dataType.yt

    if (mdType === dataType.erc) return <></>

    if (mdType === dataType.lpt) {
        return (
            <Card>
                <Link to={metadata.poolLink}>
                    <CardHeader>{metadata?.lpToken?.name}</CardHeader>
                </Link>
                <hr />
                <CardContent>{metadata.description}</CardContent>
                <CardFooter>
                    <LabelWithEtherscan
                        label="Curator"
                        address={metadata.curator}
                    />
                    <LabelWithEtherscan
                        label="Strategy"
                        address={metadata.strategy}
                    />
                    <LabelWithEtherscan
                        label="Strategy"
                        address={metadata.strategy}
                    />
                </CardFooter>
            </Card>
        )
    }
    return (
        <Card>
            <Link to={metadata.poolLink}>
                <CardHeader>{metadata.syToken.name} Yield Market</CardHeader>
            </Link>
            <hr />
            <CardContent>{metadata.description}</CardContent>
            <CardFooter>
                <div className="flex flex-col gap-1 w-full items-center justify-between">
                    <div className="flex flex-row gap-1 w-full items-center justify-between">
                        Expiry
                        <span>
                            {new Date(metadata.expiry * 1000).toISOString()}
                        </span>
                    </div>
                    <div className="flex flex-row gap-1 w-full items-center justify-between">
                        Initial Rate
                        <span>{metadata.initialRate}</span>
                    </div>
                    <div className="flex flex-row gap-1 w-full items-center justify-between">
                        Current Rate
                        <span>{metadata.currentRate}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TradeInfo
