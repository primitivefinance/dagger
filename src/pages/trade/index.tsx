import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TradeHeader from '@/components/TradeHeader'
import TradeChart from '@/components/TradeChart'
import TradePositions from '@/components/TradePositions'
import TradeForm from '@/components/TradeForm'

import { useGraphQL } from 'useGraphQL'

import type { ListedToken, ytData, lptData } from '@/data/tokens'
import { useAccount, useChainId } from 'wagmi'
import { tokens as listedTokens, yieldTokens, lpTokens } from '@/data/tokens'



const Trade: React.FC = () => {
    const address = useAccount()
    const chainId = useChainId()
    const navigate = useNavigate()
    const { tokenIn, tokenOut } = useParams()

    const [tokens, setTokens] = useState<ListedToken[] | null>()

    const [amounts, setAmounts] = useState<string[] | null>()

    const [metadata, setMetadata] = useState<ytData | lptData | null>()

    useEffect(() => {
        let _tokenIn = listedTokens[chainId].find(
            (tkn, i) => tkn.symbol.toLowerCase() === tokenIn?.toLowerCase()
        )
        if (!_tokenIn) {
            _tokenIn = yieldTokens[chainId].find(
                (tkn) => tkn.symbol.toLowerCase() === tokenIn?.toLowerCase()
            )
        } else if (!_tokenIn) {
            _tokenIn = lpTokens[chainId].find(
                (tkn) => tkn.symbol.toLowerCase() === tokenIn?.toLowerCase()
            )
        }
        let _tokenOut = listedTokens[chainId].find(
            (tkn) => tkn.symbol.toLowerCase() === tokenOut?.toLowerCase()
        )
        if (!_tokenOut) {
            _tokenOut = yieldTokens[chainId].find(
                (tkn) => tkn.symbol.toLowerCase() === tokenOut?.toLowerCase()
            )
        } else if (!_tokenOut) {
            _tokenOut = lpTokens[chainId].find(
                (tkn) => tkn.symbol.toLowerCase() === tokenOut?.toLowerCase()
            )
        }
        if (_tokenIn && _tokenOut) {
            setTokens([_tokenIn, _tokenOut])
        }
    }, [tokenIn, tokenOut])

    useEffect(() => {
        console.log(tokens === null)
        if (tokens !== undefined)
            navigate({
                pathname: `/trade/${tokens[0].symbol}/${tokens[1].symbol}`,
            })
    }, [tokens])

    if (tokens === undefined) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-2xl">
            <div>
                <TradeChart marketToken={token[1]} />
                <TradeInfo marketToken={token[1]} metadata={metadata} />
            </div>

            <div className="flex flex-row gap-2xl">
                <TradeForm
                    tokens={tokens}
                    setTokens={tokens}
                    amounts={amounts}
                    setAmounts={setAmounts}
                >
                    <p>digest trade form context here</p>
                </TradeForm>
            </div>
            <TradePositions account={address} />
        </div>
    )
}

export default Trade
