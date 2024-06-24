import { useMemo } from 'react'
import { useGraphQL } from '../useGraphQL'
import { MarketInfoQueryDocument } from '../queries/markets'
import { MarketItemFragment } from 'gql/graphql'
import { getAddress } from 'viem'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export function useTokens({ id }: { id?: string }): {
    data: {
        raw: any[]
        sorted: any[]
    }
} {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : FALLBACK_MARKET_ADDRESS,
    })

    return useMemo(() => {
        if (!data || !data.markets || !data.markets.items)
            return {
                data: {
                    raw: [],
                    sorted: [],
                },
            }

        // Gets a flat map of all tokens in all the markets tracked in the indexer.
        const allTokens = (data.markets.items as MarketItemFragment[]).flatMap(
            (market) =>
                market?.marketTokens?.items.map((item) => item.token) ?? []
        )

        // Add the markets themselves as tokens in the allTokens array
        const marketsAsTokens = data.markets.items.map((market) => ({
            id: market.id,
            symbol: 'LP-' + market.name,
            name: 'LP-' + market.name,
            icon: market.icon,
            decimals: 18,
        }))

        allTokens.push(...marketsAsTokens)

        // Filter out duplicates based on a combination of 'id' and 'symbol' for uniqueness
        const uniqueTokens = Array.from(
            new Map(
                allTokens.map((token) => [`${token.id}-${token.symbol}`, token])
            ).values()
        )

        // Push raw ETH as a token
        uniqueTokens.push({
            id: getAddress(ETH_ADDRESS),
            symbol: 'ETH',
            name: 'Ethereum',
            icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
            decimals: 18,
        })

        return {
            data: {
                raw: uniqueTokens as any[],
                sorted: uniqueTokens.sort(
                    (a: { id: string }, b: { id: string }) =>
                        getAddress(a.id) > getAddress(b.id) ? 1 : -1
                ) as any[],
            },
        }
    }, [data])
}
