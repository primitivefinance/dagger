import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TradeInfo from '@/components/TradeInfo'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import type { ListedToken, ytData, lptData } from '@/data/tokens'
import { useAccount, useChainId } from 'wagmi'
import {
    tokens as listedTokens,
    yieldTokenMetadata,
    lpTokenMetadata,
} from '@/data/tokens'

const Trade: React.FC = () => {
    const address = useAccount()
    const chainId = useChainId()

    const { tokenIn, tokenOut } = useParams()

    const [tokens, setTokens] = useState<ListedToken[] | null>(null)

    const [amounts, setAmounts] = useState<string[]>(['',''])

    const [metadata, setMetadata] = useState<ytData | lptData | null>(null)

    useEffect(() => {
        const _tokenIn = listedTokens[chainId].find(
            (tkn) => tkn.symbol.toLowerCase() === tokenIn?.toLowerCase()
        )
        const _tokenOut = listedTokens[chainId].find(
            (tkn) => tkn.symbol.toLowerCase() === tokenOut?.toLowerCase()
        )
        if (_tokenIn && _tokenOut) {
            setTokens([_tokenIn, _tokenOut])
        }
        setMetadata(lpTokenMetadata[chainId][0])
    }, [tokenIn, tokenOut])

    useEffect(() => {
        console.log(tokens)
        /*    navigate({
                pathname: `/trade/${tokens[0].symbol}/${tokens[1].symbol}`,
            })*/
    }, [tokens])

    if (tokens === null) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-xl">
            <div className="w-full">
                <TradeChart tokens={tokens} metadata={metadata} />
            </div>
            <div className="grid grid-col">
                <TradeForm
                    tokens={tokens}
                    setTokens={setTokens}
                    amounts={amounts}
                    setAmounts={setAmounts}
                    tokenType={metadata}
                >
                    {/**digest context here */}
                </TradeForm>

                <TradeInfo metadata={metadata} />
            </div>
            <TradePositions account={address} />
        </div>
    )
}

export default Trade
