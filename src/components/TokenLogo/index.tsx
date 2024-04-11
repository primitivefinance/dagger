import { TokenList, tokens as tokenList } from '@/data/tokens'
import { Skeleton } from '../ui/skeleton'
import { getAddress } from 'viem'
import React from 'react'

interface TokenLogoProps {
    key: string
    chainId: number
    address?: string
    tokens?: TokenList
}
function TokenLogo({
    key,
    chainId,
    address,
    tokens = tokenList,
}: TokenLogoProps): JSX.Element {
    const token = tokens[chainId].find(
        (tkn) => address && getAddress(tkn.address) === getAddress(address)
    )

    return (
        <React.Fragment key={key}>
            {address! ? (
                <img
                    src={token?.logo}
                    alt={token?.symbol}
                    className="rounded-full size-12"
                    style={{
                        zIndex: 1,
                    }}
                />
            ) : (
                <Skeleton className="rounded-full size-12" />
            )}
            {!address ? (
                <Skeleton
                    className="bg-gray-600 px-2 rounded-full text-xs"
                    style={{
                        zIndex: 2,
                        marginLeft: '-1rem',
                        marginTop: '1rem',
                    }}
                >
                    <span className="text-transparent">TICKER</span>
                </Skeleton>
            ) : (
                <div
                    className="bg-gray-600 px-2 rounded-full text-xs"
                    style={{
                        zIndex: 2,
                        marginLeft: '-1rem',
                        marginTop: '1rem',
                    }}
                >
                    {token?.symbol}
                </div>
            )}
        </React.Fragment>
    )
}

export default TokenLogo
