import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGraphQL } from '../../useGraphQL'

import TradeInfo from '@/components/TradeInfo'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import { useAccount } from 'wagmi'
import { MarketInfoQueryDocument } from '../../queries/markets'

const Market: React.FC = () => {
    const address = useAccount()
    const { id } = useParams()

    const [isPT, setPT] = useState(true)

    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })

    const [amounts, setAmounts] = useState<string[]>(['', ''])

    const market = data?.markets?.items[0]

    if (!market) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-xl">
            <div className="w-full">
                <TradeChart marketId={market.id} isPT={isPT} />
            </div>
            <div className="grid grid-col">
                <TradeForm
                    market={market}
                    isPt={isPT}
                    amounts={amounts}
                    setAmounts={setAmounts}
                ></TradeForm>
                <TradeInfo market={market} isPT={isPT} />
            </div>
            <TradePositions account={address} />
        </div>
    )
}

export default Market
