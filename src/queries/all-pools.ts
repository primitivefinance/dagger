import { graphql } from "../gql";

export const TokenFragment = graphql(
  `
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

export const PoolFragment = graphql(
  `
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

export const allPoolsQueryDocument = graphql(
  `
    query allPools($limit: Int!) {
      pools(limit: $limit) {
        items {
          ...PoolItem
        }
      }
    }
  `
);
