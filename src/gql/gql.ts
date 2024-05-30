/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n    fragment AllocateItem on Allocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        debitX\n        debitY\n        deltaLiquidity\n        timestamp\n        block\n    }\n": types.AllocateItemFragmentDoc,
    "\n    query allAllocates($poolId: String!) {\n        allocates(where: { poolId: $poolId }) {\n            items {\n                ...AllocateItem\n            }\n        }\n    }\n": types.AllAllocatesDocument,
    "\n    fragment DeallocateItem on Deallocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        creditX\n        creditY\n        deltaLiquidity\n        timestamp\n        block\n    }\n": types.DeallocateItemFragmentDoc,
    "\n    query allDeallocates($poolId: String!) {\n        deallocates(where: { poolId: $poolId }) {\n            items {\n                ...DeallocateItem\n            }\n        }\n    }\n": types.AllDeallocatesDocument,
    "\n    fragment MarketItem on Market {\n        id\n        lastImpliedRate\n        name\n        pool {\n            aggregateVolumeInUnderlying\n            id\n            liquidityInUnderlying\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        marketTokens {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n        expiry\n        ibAssetId\n        nativeAssetId\n        ptId\n        syId\n        underlyingToUsd\n        wrappedNativeAssetId\n        ytId\n    }\n": types.MarketItemFragmentDoc,
    "\n    query syToken($tokenId: String!) {\n        sYTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                exchangeRate\n                tokensIn\n                tokensOut\n            }\n        }\n    }\n": types.SyTokenDocument,
    "\n    query pToken($tokenId: String!) {\n        pTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n    }\n": types.PTokenDocument,
    "\n    query yToken($tokenId: String!) {\n        yTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                redeemableInterest\n                redeemableRewards\n            }\n        }\n    }\n": types.YTokenDocument,
    "\n    query allMarkets($limit: Int!) {\n        markets(limit: $limit) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n": types.AllMarketsDocument,
    "\n    query market($id: String!) {\n        markets(where: { id: $id }) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n": types.MarketDocument,
    "\n    query positions($marketId: String!) {\n        positions(where: { marketId: $marketId }) {\n            items {\n                id\n                avgEntryImpliedRate\n                netYieldDelta\n                marketId\n                portfolioId\n            }\n        }\n    }\n": types.PositionsDocument,
    "\n    fragment MarketPriceItem on YieldPricesHourly {\n        id\n        marketId\n        open\n        close\n        high\n        low\n        average\n        volume\n        count\n    }\n": types.MarketPriceItemFragmentDoc,
    "\n    query marketPrice($marketId: String!) {\n        yieldPricesHourlys(where: { marketId: $marketId }) {\n            items {\n                ...MarketPriceItem\n            }\n        }\n    }\n": types.MarketPriceDocument,
    "\n    fragment ImpliedYieldItem on ImpliedYield {\n        id\n        marketId\n        value\n    }\n": types.ImpliedYieldItemFragmentDoc,
    "\n    query implYield($marketId: String!) {\n        impliedYields(where: { marketId: $marketId }) {\n            items {\n                ...ImpliedYieldItem\n            }\n        }\n    }\n": types.ImplYieldDocument,
    "\n    fragment UnderlyingYieldItem on UnderlyingYield {\n        id\n        marketId\n        value\n    }\n": types.UnderlyingYieldItemFragmentDoc,
    "\n    query underlyingYield($marketId: String!) {\n        underlyingYields(where: { marketId: $marketId }) {\n            items {\n                ...UnderlyingYieldItem\n            }\n        }\n    }\n": types.UnderlyingYieldDocument,
    "\n    fragment SwapItem on Swap {\n        id\n        sender\n        tokenIn\n        tokenOut\n        amountIn\n        amountOut\n        timestamp\n        block\n    }\n": types.SwapItemFragmentDoc,
    "\n    query allSwaps($poolId: String!) {\n        swaps(where: { poolId: $poolId }) {\n            items {\n                ...SwapItem\n            }\n        }\n    }\n": types.AllSwapsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment AllocateItem on Allocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        debitX\n        debitY\n        deltaLiquidity\n        timestamp\n        block\n    }\n"): (typeof documents)["\n    fragment AllocateItem on Allocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        debitX\n        debitY\n        deltaLiquidity\n        timestamp\n        block\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query allAllocates($poolId: String!) {\n        allocates(where: { poolId: $poolId }) {\n            items {\n                ...AllocateItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query allAllocates($poolId: String!) {\n        allocates(where: { poolId: $poolId }) {\n            items {\n                ...AllocateItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment DeallocateItem on Deallocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        creditX\n        creditY\n        deltaLiquidity\n        timestamp\n        block\n    }\n"): (typeof documents)["\n    fragment DeallocateItem on Deallocate {\n        id\n        sender\n        pool {\n            id\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        creditX\n        creditY\n        deltaLiquidity\n        timestamp\n        block\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query allDeallocates($poolId: String!) {\n        deallocates(where: { poolId: $poolId }) {\n            items {\n                ...DeallocateItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query allDeallocates($poolId: String!) {\n        deallocates(where: { poolId: $poolId }) {\n            items {\n                ...DeallocateItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment MarketItem on Market {\n        id\n        lastImpliedRate\n        name\n        pool {\n            aggregateVolumeInUnderlying\n            id\n            liquidityInUnderlying\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        marketTokens {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n        expiry\n        ibAssetId\n        nativeAssetId\n        ptId\n        syId\n        underlyingToUsd\n        wrappedNativeAssetId\n        ytId\n    }\n"): (typeof documents)["\n    fragment MarketItem on Market {\n        id\n        lastImpliedRate\n        name\n        pool {\n            aggregateVolumeInUnderlying\n            id\n            liquidityInUnderlying\n            tokenX {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            tokenY {\n                id\n                name\n                symbol\n                decimals\n                icon\n            }\n            reserveX\n            reserveY\n            totalLiquidity\n            strike\n            sigma\n            fee\n            maturity\n            curator {\n                id\n                name\n            }\n        }\n        marketTokens {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n        expiry\n        ibAssetId\n        nativeAssetId\n        ptId\n        syId\n        underlyingToUsd\n        wrappedNativeAssetId\n        ytId\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query syToken($tokenId: String!) {\n        sYTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                exchangeRate\n                tokensIn\n                tokensOut\n            }\n        }\n    }\n"): (typeof documents)["\n    query syToken($tokenId: String!) {\n        sYTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                exchangeRate\n                tokensIn\n                tokensOut\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query pToken($tokenId: String!) {\n        pTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query pToken($tokenId: String!) {\n        pTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query yToken($tokenId: String!) {\n        yTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                redeemableInterest\n                redeemableRewards\n            }\n        }\n    }\n"): (typeof documents)["\n    query yToken($tokenId: String!) {\n        yTokens(where: { id: $tokenId }) {\n            items {\n                token {\n                    id\n                    name\n                    symbol\n                    decimals\n                    icon\n                }\n                redeemableInterest\n                redeemableRewards\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query allMarkets($limit: Int!) {\n        markets(limit: $limit) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query allMarkets($limit: Int!) {\n        markets(limit: $limit) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query market($id: String!) {\n        markets(where: { id: $id }) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query market($id: String!) {\n        markets(where: { id: $id }) {\n            items {\n                ...MarketItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query positions($marketId: String!) {\n        positions(where: { marketId: $marketId }) {\n            items {\n                id\n                avgEntryImpliedRate\n                netYieldDelta\n                marketId\n                portfolioId\n            }\n        }\n    }\n"): (typeof documents)["\n    query positions($marketId: String!) {\n        positions(where: { marketId: $marketId }) {\n            items {\n                id\n                avgEntryImpliedRate\n                netYieldDelta\n                marketId\n                portfolioId\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment MarketPriceItem on YieldPricesHourly {\n        id\n        marketId\n        open\n        close\n        high\n        low\n        average\n        volume\n        count\n    }\n"): (typeof documents)["\n    fragment MarketPriceItem on YieldPricesHourly {\n        id\n        marketId\n        open\n        close\n        high\n        low\n        average\n        volume\n        count\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query marketPrice($marketId: String!) {\n        yieldPricesHourlys(where: { marketId: $marketId }) {\n            items {\n                ...MarketPriceItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query marketPrice($marketId: String!) {\n        yieldPricesHourlys(where: { marketId: $marketId }) {\n            items {\n                ...MarketPriceItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ImpliedYieldItem on ImpliedYield {\n        id\n        marketId\n        value\n    }\n"): (typeof documents)["\n    fragment ImpliedYieldItem on ImpliedYield {\n        id\n        marketId\n        value\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query implYield($marketId: String!) {\n        impliedYields(where: { marketId: $marketId }) {\n            items {\n                ...ImpliedYieldItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query implYield($marketId: String!) {\n        impliedYields(where: { marketId: $marketId }) {\n            items {\n                ...ImpliedYieldItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment UnderlyingYieldItem on UnderlyingYield {\n        id\n        marketId\n        value\n    }\n"): (typeof documents)["\n    fragment UnderlyingYieldItem on UnderlyingYield {\n        id\n        marketId\n        value\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query underlyingYield($marketId: String!) {\n        underlyingYields(where: { marketId: $marketId }) {\n            items {\n                ...UnderlyingYieldItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query underlyingYield($marketId: String!) {\n        underlyingYields(where: { marketId: $marketId }) {\n            items {\n                ...UnderlyingYieldItem\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment SwapItem on Swap {\n        id\n        sender\n        tokenIn\n        tokenOut\n        amountIn\n        amountOut\n        timestamp\n        block\n    }\n"): (typeof documents)["\n    fragment SwapItem on Swap {\n        id\n        sender\n        tokenIn\n        tokenOut\n        amountIn\n        amountOut\n        timestamp\n        block\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query allSwaps($poolId: String!) {\n        swaps(where: { poolId: $poolId }) {\n            items {\n                ...SwapItem\n            }\n        }\n    }\n"): (typeof documents)["\n    query allSwaps($poolId: String!) {\n        swaps(where: { poolId: $poolId }) {\n            items {\n                ...SwapItem\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;