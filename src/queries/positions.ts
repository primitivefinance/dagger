import { graphql } from '../gql'

export const YieldPositionsQueryDocument = graphql(`
    query yieldPositions($marketId: String!, $portfolioId: String!) {
        yieldPositions(
            where: { marketId: $marketId, portfolioId: $portfolioId }
        ) {
            items {
                avgEntryImpliedRate
                netYieldDelta
                ptBalance
                ptCurrentUSD
                ptCurrentUnderlying
                ptEntryUSD
                ptEntryUnderlying
                ytBalance
                ytCurrentUSD
                ytCurrentUnderlying
                ytEntryUSD
                ytEntryUnderlying
            }
        }
    }
`)

export const LiquidityPositionsQueryDocument = graphql(`
    query liquidityPositions($marketId: String!, $portfolioId: String!) {
        liquidityPositions(
            where: { marketId: $marketId, portfolioId: $portfolioId }
        ) {
            items {
                liquidityCurrentBalance
                liquidityCurrentUSD
                liquidityCurrentUnderlying
                liquidityEntryBalance
                liquidityEntryUSD
                liquidityEntryUnderlying
            }
        }
    }
`)
