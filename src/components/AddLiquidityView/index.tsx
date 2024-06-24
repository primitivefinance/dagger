import React from 'react'
import { useAccount } from 'wagmi'

import { useMarketRoute } from '@/lib/useMarketRoute'

import AllocateAction from '@/actions/AllocateAction'
import {
    ConnectToTrade,
    Summary,
    SwapWidget,
    useTokenFormState,
} from '../TradeView'

const AddLiquidityView = (): JSX.Element => {
    const { isConnected } = useAccount()

    const { id } = useMarketRoute()
    const tokenInForm = useTokenFormState()
    const tokenOutForm = useTokenFormState('', true)

    const [isSwapView, setIsSwapView] = React.useState(false)

    return (
        <div className="flex flex-col gap-0 border flex-grow">
            <SwapWidget
                tokenInForm={tokenInForm}
                tokenOutForm={tokenOutForm}
                isSwapView={isSwapView}
                setIsSwapView={setIsSwapView}
            />
            {isConnected ? (
                <>
                    <Summary marketRoute={id} />
                    <AllocateAction
                        marketRoute={id}
                        amountIn={tokenInForm.amount}
                        setAmountOut={tokenOutForm.setAmount}
                        setTokenOutFetching={tokenOutForm.setFetchStatus}
                    />
                </>
            ) : (
                <ConnectToTrade />
            )}
        </div>
    )
}

export default AddLiquidityView
