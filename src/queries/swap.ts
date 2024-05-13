import { graphql } from '../gql'

//TODO: update tokenin/out pattern to include full token struct
export const SwapFragment = graphql(/* GraphQL */ `
    fragment SwapItem on Swap {
        id
        sender
        tokenIn
        tokenOut
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
