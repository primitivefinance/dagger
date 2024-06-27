import AccountHoldings from '@/components/AccountHoldings'
import MarketHoldings from '@/components/MarketHoldings'

const Portfolio: React.FC = () => {
    return (
        <div className="w-2/3 mx-auto">
            <AccountHoldings />
            <MarketHoldings />
        </div>
    )
}

export default Portfolio
