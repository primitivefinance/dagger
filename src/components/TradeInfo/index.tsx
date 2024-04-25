import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import { Card } from '@/components/ui/card'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

import type { ytData, lptData } from '@/data/tokens'

export type TradeInfoProps = {
    metadata: ytData | lptData | null
}
const TradeInfo: FC<TradeInfoProps> = ({ metadata }) => {
    if (!metadata) return <></>
    return <Card></Card>
}

export default TradeInfo