import { graphql } from '../gql'

export const MarketFragment = graphql(`
    fragment MarketItem on Market {
        id
        name
        pool {
            id
            tokenX
            tokenY
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
            rewardTokens
        }
        yt {
            id
            name
            symbol
            decimals
            redeemableInterest
            redeemaableRewards
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
    query allMarkets($id: BigInt!) {
        markets(where: { id: $id }) {
            items {
                ...MarketItem
            }
        }
    }
`)
