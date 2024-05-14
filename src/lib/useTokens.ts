import { useMemo } from 'react'
import { useGraphQL } from '../useGraphQL'
import { MarketInfoQueryDocument } from '../queries/markets'
import { MarketItemFragment } from 'gql/graphql'
import { getAddress } from 'viem'

export function useTokens({ id }: { id?: string }): {
    data: {
        raw: any[]
        sorted: any[]
    }
} {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x02afecb37fe22c4f9181c19b9e933cae6c57b0ee',
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

        // Filter out duplicates based on a combination of 'id' and 'symbol' for uniqueness
        const uniqueTokens = Array.from(
            new Map(
                allTokens.map((token) => [`${token.id}-${token.symbol}`, token])
            ).values()
        )

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
