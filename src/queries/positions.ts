import { graphql } from '../gql'

export const YieldPositionsQueryDocument = graphql(`
    query yieldPositions($id: String!) {
        yieldPositions(where: { id: $id }) {
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
    query liquidityPositions($id: String!) {
        liquidityPositions(where: { id: $id }) {
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

export const PositionsInMarketQueryDocument = graphql(`
    query positions($marketId: String!, $portfolioId: String!) {
        liquidityPositions(
            where: { marketId: $marketId, portfolioId: $portfolioId }
        ) {
            items {
                id
            }
        }
        yieldPositions(
            where: { marketId: $marketId, portfolioId: $portfolioId }
        ) {
            items {
                id
            }
        }
    }
`)
