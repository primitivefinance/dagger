import { useMemo } from 'react'
import { useGraphQL } from '../useGraphQL'
import { MarketInfoQueryDocument } from '../queries/markets'
import { MarketItemFragment } from 'gql/graphql'
import { getAddress } from 'viem'

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export function useTokens({ id }: { id?: string }): {
    data: {
        raw: any[]
        sorted: any[]
    }
} {
    const { data } = useGraphQL(MarketInfoQueryDocument, {
        id: id ? id : '0x1791d400741E9168fF678bdeE36DB448E2D9ea28',
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
