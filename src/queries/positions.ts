import { graphql } from '../gql'

export const PositionQueryDocument = graphql(`
    query positions($id: String!) {
        positions(where: { id: $id }) {
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
