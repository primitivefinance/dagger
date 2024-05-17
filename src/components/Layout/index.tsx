import AccountHoldings from '../AccountHoldings'
import Container from '../Container'
import TradeView from '../TradeView'

/**
 * Layout of the three main columns, Account, Market, and Trade.
 */
const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return (
        <main className="flex pt-8 pb-12 px-8 min-h-screen">
            <div className="w-1/4 sticky top-16 h-full z-10">
                <AccountHoldings />
            </div>
            <Container>{children}</Container>
            <div className="w-1/4 sticky top-16 h-full z-10">
                <TradeView />
            </div>
        </main>
    )
}

export default Layout
