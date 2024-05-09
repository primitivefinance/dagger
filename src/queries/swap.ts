import { graphql } from '../gql'

export const SwapFragment = graphql(/* GraphQL */ `
    fragment SwapItem on Swap {
        id
        sender
        tokenIn {
            id
            name
            symbol
        }
        tokenOut {
            id
            name
            symbol
        }
        amountIn
        amountOut
        timestamp
        block
    }
`)

export const allSwapsQueryDocument = graphql(/* GraphQL */ `
    query allSwaps($poolId: String!) {
        swaps(where: { poolId: $poolId }) {
            items {
                ...SwapItem
            }
        }
    }
`)
