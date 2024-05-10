import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TradeInfo from '@/components/TradeInfo'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import { useAccount, useChainId } from 'wagmi'

const Market: React.FC = () => {
    const address = useAccount()
    const chainId = useChainId()
    const {id} = useParams()

    const [amounts, setAmounts] = useState<string[]>(['',''])


    if (tokens === null) return <></>
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
                    {/**digest context here */}
                </TradeForm>
                <TradeInfo market={id} isPT={PT} />
            </div>
            <TradePositions market={id} account={address} />
        </div>
    )
}

export default Market
