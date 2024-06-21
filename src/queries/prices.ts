import { graphql } from '../gql'

export const MarketPriceFragment = graphql(`
    fragment MarketPriceItem on PrincipalPrice {
        id
        time
        value
        volume
    }
`)
// TODO: add sort
export const MarketPriceQueryDocument = graphql(`
    query marketPrice($marketId: String!) {
        principalPrices(
            where: { marketId: $marketId }
            orderBy: "time"
            orderDirection: "asc"
        ) {
            items {
                ...MarketPriceItem
            }
        }
    }
`)

export const ImpliedYieldFragment = graphql(`
    fragment ImpliedYieldItem on ImpliedYield {
        id
        time
        marketId
        value
    }
`)

export const ImplYieldQueryDocument = graphql(`
    query implYield($marketId: String!) {
        impliedYields(
            where: { marketId: $marketId }
            orderDirection: "asc"
            orderBy: "time"
        ) {
            items {
                ...ImpliedYieldItem
            }
        }
    }
`)

export const UnderlyingYieldFragment = graphql(`
    fragment UnderlyingYieldItem on UnderlyingYield {
        id
        time
        marketId
        value
    }
`)

export const UnderlyingYieldQueryDocument = graphql(`
    query underlyingYield($marketId: String!) {
        underlyingYields(
            where: { marketId: $marketId }
            orderDirection: "asc"
            orderBy: "time"
        ) {
            items {
                ...UnderlyingYieldItem
            }
        }
    }
`)
