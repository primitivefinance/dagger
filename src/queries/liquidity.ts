import { graphql } from '../gql'

export const AllocateFragment = graphql(/* GraphQL */ `
    fragment AllocateItem on Allocate {
        id
        poolId
        sender
        block
        deltas
        deltaLiquidity
        timestamp
        block
    }
`)

export const allAllocatesQueryDocument = graphql(/* GraphQL */ `
    query allAllocates($poolId: BigInt!) {
        allocates(where: { poolId: $poolId }) {
            items {
                ...AllocateItem
            }
        }
    }
`)

export const DeallocateFragment = graphql(/* GraphQL */ `
    fragment DeallocateItem on Deallocate {
        id
        poolId
        sender
        block
        deltas
        deltaLiquidity
        timestamp
        block
    }
`)

export const allDeallocatesQueryDocument = graphql(/* GraphQL */ `
    query allDeallocates($poolId: BigInt!) {
        deallocates(where: { poolId: $poolId }) {
            items {
                ...DeallocateItem
            }
        }
    }
`)
