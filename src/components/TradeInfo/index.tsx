import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

const TradeInfo = ({ market }) => {
    return (
        <Card>
            <CardHeader>{market.name}</CardHeader>
            <hr />
            <CardContent>
                Expiring: {new Date(market.expiry).toDateString()}
            </CardContent>
            <CardFooter>
                <LabelWithEtherscan
                    label={market.pool.curator.name}
                    address={market.pool.curator.id}
                />
                <LabelWithEtherscan
                    label="Liquidity Pool"
                    address={market.id}
                />
            </CardFooter>
        </Card>
    )
}

export default TradeInfo
