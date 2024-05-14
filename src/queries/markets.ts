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
        marketTokens {
            items {
                token {
                    id
                    name
                    symbol
                    decimals
                    icon
                }
            }
        }
        expiry
    }
`)

export const SYTokenQueryDocument = graphql(`
    query syToken($tokenId: String!) {
        syTokens(where: { id: $tokenId }) {
            items {
                token {
                    id
                    name
                    symbol
                    decimals
                    icon
                }
                exchangeRate
                tokensIn
                tokensOut
            }
        }
    }
`)
export const PTokenQueryDocument = graphql(`
    query pToken($tokenId: String!) {
        pTokens(where: { id: $tokenId }) {
            items {
                token {
                    id
                    name
                    symbol
                    decimals
                    icon
                }
            }
        }
    }
`)
export const YTokenQueryDocument = graphql(`
    query yToken($tokenId: String!) {
        yTokens(where: { id: $tokenId }) {
            items {
                token {
                    id
                    name
                    symbol
                    decimals
                    icon
                }
                redeemableInterest
                redeemableRewards
            }
        }
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
