import { graphql } from '../gql'

export const PositionsQueryDocument = graphql(`
    query position($id: String!) {
        positions(where: { id: $id }) {
            items {
                avgEntryImpliedRate
                netYieldDelta
            }
        }
    }
`)
