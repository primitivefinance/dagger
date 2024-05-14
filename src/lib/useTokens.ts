import { useMemo } from 'react'
import { useGraphQL } from '../useGraphQL'
import { MarketInfoQueryDocument } from '../queries/markets'
import { MarketItemFragment } from 'gql/graphql'

export function useTokens({ id }: { id?: string }): {
    data: any[]
} {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
    })

    return useMemo(() => {
        if (!data || !data.markets || !data.markets.items) return { data: [] }

        // Gets a flat map of all tokens in all the markets tracked in the indexer.
        const allTokens = (data.markets.items as MarketItemFragment[]).flatMap(
            (market) => [
                {
                    id: market?.id,
                    symbol: market?.name,
                    name: market?.name,
                    decimals: 18,
                },
                market?.pool?.tokenX,
                market?.pool?.tokenY,
                market?.sy,
                market?.pt,
                market?.yt,
            ]
        )

        // Filter out duplicates based on a combination of 'id' and 'symbol' for uniqueness
        const uniqueTokens = Array.from(
            new Map(
                allTokens.map((token) => [`${token.id}-${token.symbol}`, token])
            ).values()
        )

        return { data: uniqueTokens as any[] }
    }, [data])
}
