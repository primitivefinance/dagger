import { graphql } from '../gql'

export const PositionQueryDocument = graphql(`
    query positions($marketId: String!) {
        yieldPositions(where: { marketId: $marketId }) {
            items {
                id
                avgEntryImpliedRate
                netYieldDelta
                marketId
                portfolioId
            }
        }
    }
`)
