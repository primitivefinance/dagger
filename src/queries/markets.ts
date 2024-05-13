import { graphql } from '../gql'

export const MarketFragment = graphql(`
    fragment MarketItem on Market {
        id
        name
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
        sy {
            id
            name
            symbol
            decimals
            exchangeRate
        }
        yt {
            id
            name
            symbol
            decimals
            redeemableInterest
            redeemableRewards
        }
        pt {
            id
            name
            symbol
            decimals
        }
        expiry
    }
`)

export const allMarketsQueryDocument = graphql(`
    query allMarkets($limit: Int!) {
        markets(limit: $limit) {
            items {
                ...MarketItem
            }
        }
    }
`)

export const MarketInfoQueryDocument = graphql(`
    query market($id: String!) {
        markets(where: { id: $id }) {
            items {
                ...MarketItem
            }
        }
    }
`)

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
        count
    }
`)
// TODO: add sort
export const MarketPriceQueryDocument = graphql(`
    query marketPrice($limit: Int!) {
        marketPricesHourlys(limit: $limit) {
            items {
                ...MarketPriceItem
            }
        }
    }
`)