import { graphql } from '../gql'

export const PositionFragment = graphql(/* GraphQL */ `
    fragment PositionItem on Position {
        id
        accountId
        liquidity
        poolId
        pool {
            ...PoolWithTokens
        }
    }
`)

export const allPositionsQueryDocument = graphql(/* GraphQL */ `
    query allPositions($limit: Int!) {
        positions(limit: $limit) {
            items {
                ...PositionItem
            }
        }
    }
`)
