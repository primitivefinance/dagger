import { graphql } from '../gql'

export const MarketFragment = graphql(`
    fragment MarketItem on Market {
        id
        name
        pool {
            aggregateVolumeInUnderlying
            id
            liquidityInUnderlying
            tokenX {
                id
                name
                symbol
                decimals
                icon
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
        ibAssetId
        nativeAssetId
        ptId
        syId
        underlyingToUsd
        wrappedNativeAssetId
        ytId
    }
`)

export const SYTokenQueryDocument = graphql(`
    query syToken($tokenId: String!) {
        sYTokens(where: { id: $tokenId }) {
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
