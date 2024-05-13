import { graphql } from '../gql'

export const AllocateFragment = graphql(/* GraphQL */ `
    fragment AllocateItem on Allocate {
        id
        sender
        pool {
            id
            tokenX {
                id
                name
                symbol
                decimals
                icon
                exchangeRate
            }
            tokenY {
                id
                name
                symbol
                decimals
                icon
            }
            reserveX
            reserveY
            totalLiquidity
            strike
            sigma
            fee
            maturity
            curator {
                id
                name
            }
        }
        debitX
        debitY
        deltaLiquidity
        timestamp
        block
    }
`)

export const allAllocatesQueryDocument = graphql(/* GraphQL */ `
    query allAllocates($poolId: String!) {
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
        sender
        pool {
            id
            tokenX {
                id
                name
                symbol
                decimals
                icon
                exchangeRate
            }
            tokenY {
                id
                name
                symbol
                decimals
                icon
            }
            reserveX
            reserveY
            totalLiquidity
            strike
            sigma
            fee
            maturity
            curator {
                id
                name
            }
        }
        creditX
        creditY
        deltaLiquidity
        timestamp
        block
    }
`)

export const allDeallocatesQueryDocument = graphql(/* GraphQL */ `
    query allDeallocates($poolId: String!) {
        deallocates(where: { poolId: $poolId }) {
            items {
                ...DeallocateItem
            }
        }
    }
`)
