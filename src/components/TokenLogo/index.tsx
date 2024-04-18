import { TokenList, tokens as tokenList } from '@/data/tokens'
import { Skeleton } from '../ui/skeleton'
import { getAddress } from 'viem'
import React from 'react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'

interface TokenLogoProps {
    key: string
    chainId: number
    address?: string
    tokens?: TokenList
    size?: 'sm' | 'md' | 'lg' | 'xl'
    custom?: {
        logo?: string
        symbol?: string
    }
}

function TokenLogo({
    chainId,
    address,
    tokens = tokenList,
    size = 'md',
    custom,
    ...props
}: TokenLogoProps): JSX.Element {
    const token = tokens[chainId].find(
        (tkn) => address && getAddress(tkn.address) === getAddress(address)
    )

    const sizeStyle =
        size === 'sm'
            ? 'size-12'
            : size === 'md'
              ? 'size-16'
              : size === 'lg'
                ? 'size-24'
                : 'size-32'

    const logoData = custom
        ? {
              src: custom.logo,
              alt: custom.symbol,
              symbol: custom.symbol,
          }
        : {
              src: token?.logo,
              alt: token?.symbol,
              symbol: token?.symbol,
          }

    const isLoading = !address && !custom

    return (
        <React.Fragment {...props}>
            <div className="flex flex-row items-center">
                {!isLoading ? (
                    !logoData.src ? (
                        <QuestionMarkIcon
                            className={`rounded-full ${sizeStyle} bg-gray-900 p-6`}
                        />
                    ) : (
                        <img
                            src={logoData.src}
                            alt={logoData.alt}
                            className={`rounded-full ${sizeStyle}`}
                            style={{
                                zIndex: 1,
                            }}
                        />
                    )
                ) : (
                    <Skeleton className={`rounded-full ${sizeStyle}`} />
                )}
                {isLoading ? (
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
                        {logoData.symbol}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default TokenLogo
