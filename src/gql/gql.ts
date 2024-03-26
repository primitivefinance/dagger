/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment PoolTokenItem on PoolToken {\n      token {\n        id\n        name\n        symbol\n        decimals\n      }\n    }\n  ": types.PoolTokenItemFragmentDoc,
    "\n    fragment PoolItem on Pool {\n      id\n      poolTokens {\n        items {\n          ...PoolTokenItem\n        }\n      }\n    }\n  ": types.PoolItemFragmentDoc,
    "\n    query allPools($limit: Int!) {\n      pools(limit: $limit) {\n        items {\n          ...PoolItem\n        }\n      }\n    }\n  ": types.AllPoolsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PoolTokenItem on PoolToken {\n      token {\n        id\n        name\n        symbol\n        decimals\n      }\n    }\n  "): typeof import('./graphql').PoolTokenItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PoolItem on Pool {\n      id\n      poolTokens {\n        items {\n          ...PoolTokenItem\n        }\n      }\n    }\n  "): typeof import('./graphql').PoolItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query allPools($limit: Int!) {\n      pools(limit: $limit) {\n        items {\n          ...PoolItem\n        }\n      }\n    }\n  "): typeof import('./graphql').AllPoolsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
