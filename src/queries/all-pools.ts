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
`);

export const PoolFragment = graphql(/* GraphQL */ `
  fragment PoolItem on Pool {
    id
    poolTokens {
      items {
        ...PoolTokenItem
      }
    }
    tokens
    reserves
    liquidity
    lpToken
    name
    initTimestamp
  }
`);

export const allPoolsQueryDocument = graphql(/* GraphQL */ `
  query allPools($limit: Int!) {
    pools(limit: $limit) {
      items {
        ...PoolItem
      }
    }
  }
`);

export const PoolWithTokensFragment = graphql(/* GraphQL */ `
  fragment PoolWithTokens on Pool {
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
    tokens
    reserves
    liquidity
    lpToken
    name
    initTimestamp
  }
`);

export const poolInfoQueryDocument = graphql(/* GraphQL */ `
  query poolInfo($id: BigInt!) {
    pool(id: $id) {
      ...PoolWithTokens
    }
  }
`);
