import { graphql } from "../gql";

export const allPositionsQueryDocument = graphql(/* GraphQL */ `
  query allPositions($account: String!) {
    position(account: $account) {
      items {
        ...PositionItem
      }
    }
  }
`)