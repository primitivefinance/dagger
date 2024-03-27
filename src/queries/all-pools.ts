import { graphql } from "../gql";

export const TokenFragment = graphql(/* GraphQL */ `
    fragment PoolTokenItem on PoolToken {
      token {
        id
        name
        symbol
        decimals
      }
    }
  `
);

export const PoolFragment = graphql(/* GraphQL */ `
    fragment PoolItem on Pool {
      id
      poolTokens {
        items {
          ...PoolTokenItem
        }
      }
    }
  `
);

export const allPoolsQueryDocument = graphql(/* GraphQL */ `
    query allPools($limit: Int!) {
      pools(limit: $limit) {
        items {
          id
          poolTokens {
            items {
              token {
                id
                name
                symbol
                decimals
              }
            }
          }
        }
      }
    }
  `
);
