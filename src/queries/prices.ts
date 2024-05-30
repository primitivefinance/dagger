import { graphql } from '../gql'

export const MarketPriceFragment = graphql(`
    fragment MarketPriceItem on YieldPricesHourly {
        id
        marketId
        open
        close
        high
        low
        average
        volume
        count
    }
`)
// TODO: add sort
export const MarketPriceQueryDocument = graphql(`
    query marketPrice($marketId: String!) {
        yieldPricesHourlys(where: { marketId: $marketId }) {
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
        impliedYields(where: { marketId: $marketId }) {
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
        underlyingYields(where: { marketId: $marketId }) {
            items {
                ...UnderlyingYieldItem
            }
        }
    }
`)
