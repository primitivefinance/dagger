import { graphql } from '../gql'

export const PositionQueryDocument = graphql(`
    query positions($marketId: String!) {
        positions(where: { marketId: $marketId }) {
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
