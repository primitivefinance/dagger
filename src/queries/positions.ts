import { graphql } from '../gql'

export const PositionFragment = graphql(/* GraphQL */ `
    fragment PositionItem on Position {
        id
        liquidity
        accountId
        poolId
        pool {
            ...PoolItem
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
