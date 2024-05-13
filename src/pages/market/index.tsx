import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGraphQL } from '../../useGraphQL'

import TradeInfo from '@/components/TradeInfo'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import { useAccount, useChainId } from 'wagmi'
import { MarketInfoQueryDocument } from '../../queries/markets'

const Market: React.FC = () => {
    const address = useAccount()
    const chainId = useChainId()
    const {id} = useParams()

    const [isPT, setPT] = useState(true)

    const { data } = useGraphQL(MarketInfoQueryDocument, { id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee'})
    const [amounts, setAmounts] = useState<string[]>(['',''])

    return <></>
    /** 
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-xl">
            <div className="w-full">
                <TradeChart market={id} isPT={isPT} />
            </div>
            <div className="grid grid-col">
                <TradeForm
                    market={id}
                    isPt={isPT}
                    amounts={amounts}
                    setAmounts={setAmounts}
                >
                </TradeForm>
                <TradeInfo market={id} isPT={isPT} />
            </div>
            <TradePositions market={id} account={address} />
        </div>
    )
    */
}

export default Market
