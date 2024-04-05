import { graphql } from '../gql'

export const SwapFragment = graphql(/* GraphQL */ `
    fragment SwapItem on Swap {
        id
        poolId
        pool {
            ...PoolItem
        }
        sender
        amountIn
        amountOut
        tokenIn
        tokenOut
        timestamp
        block
    }
`)

export const allSwapsQueryDocument = graphql(/* GraphQL */ `
    query allSwaps($poolId: BigInt!) {
        swaps(where: { poolId: $poolId }) {
            items {
                ...SwapItem
            }
        }
    }
`)
