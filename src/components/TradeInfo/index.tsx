import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'

import type { ytData, lptData } from '@/data/tokens'

export type TradeInfoProps = {
    metadata: ytData | lptData | null
}
const TradeInfo: FC<TradeInfoProps> = ({ metadata }) => {
    if (!metadata) return <></>

    if (metadata.syAddress === undefined)
        return (
            <Card>
                <Link to={metadata.poolLink}>
                    <CardHeader>{metadata.lpToken.name}</CardHeader>
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
    return (
        <Card>
            <CardHeader>Yield Token</CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

export default TradeInfo
