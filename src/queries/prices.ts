import { graphql } from '../gql'

export const ExchangeRateFragment = graphql(`
    fragment ExchangeRateItem on ExchangeRateHourly {
        id
        marketId
        open
        close
        high
        low
        average
        count
    }
`)

// TODO: sort
export const ExchangeRateQueryDocument = graphql(`
    query exchangeRate($limit: Int!) {
        exchangeRateHourlys(limit: $limit) {
            items {
                ...ExchangeRateItem
            }
        }
    }
`)

export const MarketPriceFragment = graphql(`
    fragment MarketPriceItem on MarketPricesHourly {
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
        marketPricesHourlys(where: { marketId: $marketId }) {
            items {
                ...MarketPriceItem
            }
        }
    }
`)

export const ImpliedYieldFragment = graphql(`
    fragment ImpliedYieldItem on ImpliedYield {
        id
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
