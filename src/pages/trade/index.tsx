import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TradeHeader from '@/components/TradeHeader'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import { useGraphQL } from 'useGraphQL'
import { useAccount } from 'wagmi'

const Trade: React.FC = () => {
    const address = useAccount()
    const { underlying, timestamp, id } = useParams()

    const [isLong, setLong] = useState(true)
    const expiry = timestamp ? timestamp : '2024-05-01'
    const poolId = id ? id : '0'
    const currentRate = 1.02
  
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-2xl">
            <TradeHeader
                underlying={underlying ? underlying : 'ezETH'}
                expiry={expiry}
                currentRate={currentRate}
                isLong={isLong}
                setLong={setLong}
            />
            <TradeChart
                isLoading={false}
                initialRate={1.03}
                currentRate={currentRate}
                expiry={expiry}
                isLong={isLong}
            />
            <div className="flex flex-row gap-2xl">
                <TradeForm poolId={poolId} isLong={isLong}>
                    <p>digest trade form context here</p>
                </TradeForm>
            </div>
            <TradePositions account={address} />
        </div>
    )
}

export default Trade
