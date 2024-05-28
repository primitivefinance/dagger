/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
};

export type Allocate = {
  __typename?: 'Allocate';
  block: Scalars['BigInt']['output'];
  debitX: Scalars['BigInt']['output'];
  debitY: Scalars['BigInt']['output'];
  deltaLiquidity: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type AllocateFilter = {
  AND?: InputMaybe<Array<InputMaybe<AllocateFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AllocateFilter>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  debitX?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_gt?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_gte?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  debitX_lt?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_lte?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_not?: InputMaybe<Scalars['BigInt']['input']>;
  debitX_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  debitY?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_gt?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_gte?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  debitY_lt?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_lte?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_not?: InputMaybe<Scalars['BigInt']['input']>;
  debitY_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  poolId_gt?: InputMaybe<Scalars['String']['input']>;
  poolId_gte?: InputMaybe<Scalars['String']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['String']['input']>;
  poolId_lte?: InputMaybe<Scalars['String']['input']>;
  poolId_not?: InputMaybe<Scalars['String']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type AllocatePage = {
  __typename?: 'AllocatePage';
  items: Array<Allocate>;
  pageInfo: PageInfo;
};

export type Curator = {
  __typename?: 'Curator';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CuratorFilter = {
  AND?: InputMaybe<Array<InputMaybe<CuratorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CuratorFilter>>>;
  icon?: InputMaybe<Scalars['String']['input']>;
  icon_contains?: InputMaybe<Scalars['String']['input']>;
  icon_ends_with?: InputMaybe<Scalars['String']['input']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not?: InputMaybe<Scalars['String']['input']>;
  icon_not_contains?: InputMaybe<Scalars['String']['input']>;
  icon_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  icon_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_contains?: InputMaybe<Scalars['String']['input']>;
  link_ends_with?: InputMaybe<Scalars['String']['input']>;
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  link_not?: InputMaybe<Scalars['String']['input']>;
  link_not_contains?: InputMaybe<Scalars['String']['input']>;
  link_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  link_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  link_starts_with?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type CuratorPage = {
  __typename?: 'CuratorPage';
  items: Array<Curator>;
  pageInfo: PageInfo;
};

export type Deallocate = {
  __typename?: 'Deallocate';
  block: Scalars['BigInt']['output'];
  creditX: Scalars['BigInt']['output'];
  creditY: Scalars['BigInt']['output'];
  deltaLiquidity: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type DeallocateFilter = {
  AND?: InputMaybe<Array<InputMaybe<DeallocateFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DeallocateFilter>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  creditX?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  creditX_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_not?: InputMaybe<Scalars['BigInt']['input']>;
  creditX_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  creditY?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  creditY_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_not?: InputMaybe<Scalars['BigInt']['input']>;
  creditY_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  poolId_gt?: InputMaybe<Scalars['String']['input']>;
  poolId_gte?: InputMaybe<Scalars['String']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['String']['input']>;
  poolId_lte?: InputMaybe<Scalars['String']['input']>;
  poolId_not?: InputMaybe<Scalars['String']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type DeallocatePage = {
  __typename?: 'DeallocatePage';
  items: Array<Deallocate>;
  pageInfo: PageInfo;
};

export type ImpliedYield = {
  __typename?: 'ImpliedYield';
  id: Scalars['Int']['output'];
  marketId: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type ImpliedYieldFilter = {
  AND?: InputMaybe<Array<InputMaybe<ImpliedYieldFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ImpliedYieldFilter>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_gt?: InputMaybe<Scalars['Int']['input']>;
  id_gte?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_lt?: InputMaybe<Scalars['Int']['input']>;
  id_lte?: InputMaybe<Scalars['Int']['input']>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['Float']['input']>;
  value_gt?: InputMaybe<Scalars['Float']['input']>;
  value_gte?: InputMaybe<Scalars['Float']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  value_lt?: InputMaybe<Scalars['Float']['input']>;
  value_lte?: InputMaybe<Scalars['Float']['input']>;
  value_not?: InputMaybe<Scalars['Float']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type ImpliedYieldPage = {
  __typename?: 'ImpliedYieldPage';
  items: Array<ImpliedYield>;
  pageInfo: PageInfo;
};

export type Market = {
  __typename?: 'Market';
  expiry: Scalars['BigInt']['output'];
  ibAsset: Token;
  ibAssetId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  marketTokens?: Maybe<MarketTokenPage>;
  name: Scalars['String']['output'];
  nativeAsest: Token;
  nativeAssetId: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['String']['output'];
  pt: PToken;
  ptId: Scalars['String']['output'];
  sy: SyToken;
  syId: Scalars['String']['output'];
  underlyingToUsd: Scalars['Float']['output'];
  wrappedIbAsset: Token;
  wrappedIbAssetId: Scalars['String']['output'];
  wrappedNativeAsset: Token;
  wrappedNativeAssetId: Scalars['String']['output'];
  yt: YToken;
  ytId: Scalars['String']['output'];
};


export type MarketMarketTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MarketFilter>;
};

export type MarketFilter = {
  AND?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  expiry?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  expiry_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiry_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  ibAssetId?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_gt?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_gte?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ibAssetId_lt?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_lte?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_not?: InputMaybe<Scalars['String']['input']>;
  ibAssetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_gt?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_gte?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nativeAssetId_lt?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_lte?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_not?: InputMaybe<Scalars['String']['input']>;
  nativeAssetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  poolId_gt?: InputMaybe<Scalars['String']['input']>;
  poolId_gte?: InputMaybe<Scalars['String']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['String']['input']>;
  poolId_lte?: InputMaybe<Scalars['String']['input']>;
  poolId_not?: InputMaybe<Scalars['String']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ptId?: InputMaybe<Scalars['String']['input']>;
  ptId_gt?: InputMaybe<Scalars['String']['input']>;
  ptId_gte?: InputMaybe<Scalars['String']['input']>;
  ptId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ptId_lt?: InputMaybe<Scalars['String']['input']>;
  ptId_lte?: InputMaybe<Scalars['String']['input']>;
  ptId_not?: InputMaybe<Scalars['String']['input']>;
  ptId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  syId?: InputMaybe<Scalars['String']['input']>;
  syId_gt?: InputMaybe<Scalars['String']['input']>;
  syId_gte?: InputMaybe<Scalars['String']['input']>;
  syId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  syId_lt?: InputMaybe<Scalars['String']['input']>;
  syId_lte?: InputMaybe<Scalars['String']['input']>;
  syId_not?: InputMaybe<Scalars['String']['input']>;
  syId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  underlyingToUsd?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_gt?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_gte?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  underlyingToUsd_lt?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_lte?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_not?: InputMaybe<Scalars['Float']['input']>;
  underlyingToUsd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  wrappedIbAssetId?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_gt?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_gte?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  wrappedIbAssetId_lt?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_lte?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_not?: InputMaybe<Scalars['String']['input']>;
  wrappedIbAssetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  wrappedNativeAssetId?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_gt?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_gte?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  wrappedNativeAssetId_lt?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_lte?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_not?: InputMaybe<Scalars['String']['input']>;
  wrappedNativeAssetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ytId?: InputMaybe<Scalars['String']['input']>;
  ytId_gt?: InputMaybe<Scalars['String']['input']>;
  ytId_gte?: InputMaybe<Scalars['String']['input']>;
  ytId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ytId_lt?: InputMaybe<Scalars['String']['input']>;
  ytId_lte?: InputMaybe<Scalars['String']['input']>;
  ytId_not?: InputMaybe<Scalars['String']['input']>;
  ytId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MarketPage = {
  __typename?: 'MarketPage';
  items: Array<Market>;
  pageInfo: PageInfo;
};

export type MarketToken = {
  __typename?: 'MarketToken';
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['String']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
};

export type MarketTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<MarketTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MarketTokenFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MarketTokenPage = {
  __typename?: 'MarketTokenPage';
  items: Array<MarketToken>;
  pageInfo: PageInfo;
};

export type PToken = {
  __typename?: 'PToken';
  id: Scalars['String']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
};

export type PTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<PTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PTokenFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PTokenPage = {
  __typename?: 'PTokenPage';
  items: Array<PToken>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Pool = {
  __typename?: 'Pool';
  aggregateVolumeInUnderlying: Scalars['Float']['output'];
  curator: Curator;
  curatorId: Scalars['String']['output'];
  fee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  liquidityInUnderlying: Scalars['Float']['output'];
  maturity: Scalars['BigInt']['output'];
  reserveX: Scalars['BigInt']['output'];
  reserveY: Scalars['BigInt']['output'];
  sigma: Scalars['BigInt']['output'];
  strike: Scalars['BigInt']['output'];
  tokenX: Token;
  tokenXId: Scalars['String']['output'];
  tokenY: Token;
  tokenYId: Scalars['String']['output'];
  totalLiquidity: Scalars['BigInt']['output'];
};

export type PoolFilter = {
  AND?: InputMaybe<Array<InputMaybe<PoolFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PoolFilter>>>;
  aggregateVolumeInUnderlying?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_gt?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_gte?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  aggregateVolumeInUnderlying_lt?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_lte?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_not?: InputMaybe<Scalars['Float']['input']>;
  aggregateVolumeInUnderlying_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  curatorId?: InputMaybe<Scalars['String']['input']>;
  curatorId_gt?: InputMaybe<Scalars['String']['input']>;
  curatorId_gte?: InputMaybe<Scalars['String']['input']>;
  curatorId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  curatorId_lt?: InputMaybe<Scalars['String']['input']>;
  curatorId_lte?: InputMaybe<Scalars['String']['input']>;
  curatorId_not?: InputMaybe<Scalars['String']['input']>;
  curatorId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fee?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  liquidityInUnderlying?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_gt?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_gte?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  liquidityInUnderlying_lt?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_lte?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_not?: InputMaybe<Scalars['Float']['input']>;
  liquidityInUnderlying_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  maturity?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  maturity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_not?: InputMaybe<Scalars['BigInt']['input']>;
  maturity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveX?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveX_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserveX_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveY?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveY_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserveY_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sigma?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sigma_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_not?: InputMaybe<Scalars['BigInt']['input']>;
  sigma_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  strike?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_gte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  strike_lt?: InputMaybe<Scalars['BigInt']['input']>;
  strike_lte?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not?: InputMaybe<Scalars['BigInt']['input']>;
  strike_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenXId?: InputMaybe<Scalars['String']['input']>;
  tokenXId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenXId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenXId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenXId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenXId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenXId_not?: InputMaybe<Scalars['String']['input']>;
  tokenXId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenYId?: InputMaybe<Scalars['String']['input']>;
  tokenYId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenYId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenYId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenYId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenYId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenYId_not?: InputMaybe<Scalars['String']['input']>;
  tokenYId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  totalLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type PoolPage = {
  __typename?: 'PoolPage';
  items: Array<Pool>;
  pageInfo: PageInfo;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  id: Scalars['String']['output'];
  positions?: Maybe<PositionPage>;
};


export type PortfolioPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PortfolioFilter>;
};

export type PortfolioFilter = {
  AND?: InputMaybe<Array<InputMaybe<PortfolioFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PortfolioFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PortfolioPage = {
  __typename?: 'PortfolioPage';
  items: Array<Portfolio>;
  pageInfo: PageInfo;
};

export type Position = {
  __typename?: 'Position';
  avgEntryImpliedRate: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['String']['output'];
  netYieldDelta: Scalars['Float']['output'];
  portfolio: Portfolio;
  portfolioId: Scalars['String']['output'];
};

export type PositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  avgEntryImpliedRate?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_gt?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_gte?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  avgEntryImpliedRate_lt?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_lte?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_not?: InputMaybe<Scalars['Float']['input']>;
  avgEntryImpliedRate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  netYieldDelta?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_gt?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_gte?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  netYieldDelta_lt?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_lte?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_not?: InputMaybe<Scalars['Float']['input']>;
  netYieldDelta_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  portfolioId?: InputMaybe<Scalars['String']['input']>;
  portfolioId_gt?: InputMaybe<Scalars['String']['input']>;
  portfolioId_gte?: InputMaybe<Scalars['String']['input']>;
  portfolioId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  portfolioId_lt?: InputMaybe<Scalars['String']['input']>;
  portfolioId_lte?: InputMaybe<Scalars['String']['input']>;
  portfolioId_not?: InputMaybe<Scalars['String']['input']>;
  portfolioId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PositionPage = {
  __typename?: 'PositionPage';
  items: Array<Position>;
  pageInfo: PageInfo;
};

export type PrincipalPricesHourly = {
  __typename?: 'PrincipalPricesHourly';
  average: Scalars['Float']['output'];
  close: Scalars['Float']['output'];
  count: Scalars['Int']['output'];
  high: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  low: Scalars['Float']['output'];
  marketId: Scalars['String']['output'];
  open: Scalars['Float']['output'];
  volume: Scalars['Float']['output'];
};

export type PrincipalPricesHourlyFilter = {
  AND?: InputMaybe<Array<InputMaybe<PrincipalPricesHourlyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PrincipalPricesHourlyFilter>>>;
  average?: InputMaybe<Scalars['Float']['input']>;
  average_gt?: InputMaybe<Scalars['Float']['input']>;
  average_gte?: InputMaybe<Scalars['Float']['input']>;
  average_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  average_lt?: InputMaybe<Scalars['Float']['input']>;
  average_lte?: InputMaybe<Scalars['Float']['input']>;
  average_not?: InputMaybe<Scalars['Float']['input']>;
  average_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  close?: InputMaybe<Scalars['Float']['input']>;
  close_gt?: InputMaybe<Scalars['Float']['input']>;
  close_gte?: InputMaybe<Scalars['Float']['input']>;
  close_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  close_lt?: InputMaybe<Scalars['Float']['input']>;
  close_lte?: InputMaybe<Scalars['Float']['input']>;
  close_not?: InputMaybe<Scalars['Float']['input']>;
  close_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_gt?: InputMaybe<Scalars['Int']['input']>;
  count_gte?: InputMaybe<Scalars['Int']['input']>;
  count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  count_lt?: InputMaybe<Scalars['Int']['input']>;
  count_lte?: InputMaybe<Scalars['Int']['input']>;
  count_not?: InputMaybe<Scalars['Int']['input']>;
  count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  high?: InputMaybe<Scalars['Float']['input']>;
  high_gt?: InputMaybe<Scalars['Float']['input']>;
  high_gte?: InputMaybe<Scalars['Float']['input']>;
  high_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  high_lt?: InputMaybe<Scalars['Float']['input']>;
  high_lte?: InputMaybe<Scalars['Float']['input']>;
  high_not?: InputMaybe<Scalars['Float']['input']>;
  high_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_gt?: InputMaybe<Scalars['Int']['input']>;
  id_gte?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_lt?: InputMaybe<Scalars['Int']['input']>;
  id_lte?: InputMaybe<Scalars['Int']['input']>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  low?: InputMaybe<Scalars['Float']['input']>;
  low_gt?: InputMaybe<Scalars['Float']['input']>;
  low_gte?: InputMaybe<Scalars['Float']['input']>;
  low_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  low_lt?: InputMaybe<Scalars['Float']['input']>;
  low_lte?: InputMaybe<Scalars['Float']['input']>;
  low_not?: InputMaybe<Scalars['Float']['input']>;
  low_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  open?: InputMaybe<Scalars['Float']['input']>;
  open_gt?: InputMaybe<Scalars['Float']['input']>;
  open_gte?: InputMaybe<Scalars['Float']['input']>;
  open_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  open_lt?: InputMaybe<Scalars['Float']['input']>;
  open_lte?: InputMaybe<Scalars['Float']['input']>;
  open_not?: InputMaybe<Scalars['Float']['input']>;
  open_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  volume_gt?: InputMaybe<Scalars['Float']['input']>;
  volume_gte?: InputMaybe<Scalars['Float']['input']>;
  volume_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  volume_lt?: InputMaybe<Scalars['Float']['input']>;
  volume_lte?: InputMaybe<Scalars['Float']['input']>;
  volume_not?: InputMaybe<Scalars['Float']['input']>;
  volume_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type PrincipalPricesHourlyPage = {
  __typename?: 'PrincipalPricesHourlyPage';
  items: Array<PrincipalPricesHourly>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  allocate?: Maybe<Allocate>;
  allocates: AllocatePage;
  curator?: Maybe<Curator>;
  curators: CuratorPage;
  deallocate?: Maybe<Deallocate>;
  deallocates: DeallocatePage;
  impliedYield?: Maybe<ImpliedYield>;
  impliedYields: ImpliedYieldPage;
  market?: Maybe<Market>;
  marketToken?: Maybe<MarketToken>;
  marketTokens: MarketTokenPage;
  markets: MarketPage;
  pToken?: Maybe<PToken>;
  pTokens: PTokenPage;
  pool?: Maybe<Pool>;
  pools: PoolPage;
  portfolio?: Maybe<Portfolio>;
  portfolios: PortfolioPage;
  position?: Maybe<Position>;
  positions: PositionPage;
  principalPricesHourly?: Maybe<PrincipalPricesHourly>;
  principalPricesHourlys: PrincipalPricesHourlyPage;
  sYToken?: Maybe<SyToken>;
  sYTokens: SyTokenPage;
  swap?: Maybe<Swap>;
  swaps: SwapPage;
  token?: Maybe<Token>;
  tokens: TokenPage;
  underlyingYield?: Maybe<UnderlyingYield>;
  underlyingYields: UnderlyingYieldPage;
  yToken?: Maybe<YToken>;
  yTokens: YTokenPage;
  yieldPricesHourly?: Maybe<YieldPricesHourly>;
  yieldPricesHourlys: YieldPricesHourlyPage;
};


export type QueryAllocateArgs = {
  id: Scalars['String']['input'];
};


export type QueryAllocatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AllocateFilter>;
};


export type QueryCuratorArgs = {
  id: Scalars['String']['input'];
};


export type QueryCuratorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CuratorFilter>;
};


export type QueryDeallocateArgs = {
  id: Scalars['String']['input'];
};


export type QueryDeallocatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DeallocateFilter>;
};


export type QueryImpliedYieldArgs = {
  id: Scalars['Int']['input'];
};


export type QueryImpliedYieldsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ImpliedYieldFilter>;
};


export type QueryMarketArgs = {
  id: Scalars['String']['input'];
};


export type QueryMarketTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryMarketTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MarketTokenFilter>;
};


export type QueryMarketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MarketFilter>;
};


export type QueryPTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryPTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PTokenFilter>;
};


export type QueryPoolArgs = {
  id: Scalars['String']['input'];
};


export type QueryPoolsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PoolFilter>;
};


export type QueryPortfolioArgs = {
  id: Scalars['String']['input'];
};


export type QueryPortfoliosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PortfolioFilter>;
};


export type QueryPositionArgs = {
  id: Scalars['String']['input'];
};


export type QueryPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PositionFilter>;
};


export type QueryPrincipalPricesHourlyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPrincipalPricesHourlysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PrincipalPricesHourlyFilter>;
};


export type QuerySyTokenArgs = {
  id: Scalars['String']['input'];
};


export type QuerySyTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<SyTokenFilter>;
};


export type QuerySwapArgs = {
  id: Scalars['String']['input'];
};


export type QuerySwapsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<SwapFilter>;
};


export type QueryTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TokenFilter>;
};


export type QueryUnderlyingYieldArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUnderlyingYieldsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UnderlyingYieldFilter>;
};


export type QueryYTokenArgs = {
  id: Scalars['String']['input'];
};


export type QueryYTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<YTokenFilter>;
};


export type QueryYieldPricesHourlyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryYieldPricesHourlysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<YieldPricesHourlyFilter>;
};

export type SyToken = {
  __typename?: 'SYToken';
  exchangeRate: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
  tokensIn?: Maybe<Array<Scalars['BigInt']['output']>>;
  tokensOut?: Maybe<Array<Scalars['BigInt']['output']>>;
};

export type SyTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<SyTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SyTokenFilter>>>;
  exchangeRate?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  exchangeRate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_not?: InputMaybe<Scalars['BigInt']['input']>;
  exchangeRate_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokensIn?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensIn_has?: InputMaybe<Scalars['BigInt']['input']>;
  tokensIn_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensIn_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOut?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensOut_has?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOut_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensOut_not_has?: InputMaybe<Scalars['BigInt']['input']>;
};

export type SyTokenPage = {
  __typename?: 'SYTokenPage';
  items: Array<SyToken>;
  pageInfo: PageInfo;
};

export type Swap = {
  __typename?: 'Swap';
  amountIn: Scalars['BigInt']['output'];
  amountOut: Scalars['BigInt']['output'];
  block: Scalars['BigInt']['output'];
  deltaLiquidity: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
};

export type SwapFilter = {
  AND?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  amountIn?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountIn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountOut?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['String']['input']>;
  poolId_gt?: InputMaybe<Scalars['String']['input']>;
  poolId_gte?: InputMaybe<Scalars['String']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['String']['input']>;
  poolId_lte?: InputMaybe<Scalars['String']['input']>;
  poolId_not?: InputMaybe<Scalars['String']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenIn?: InputMaybe<Scalars['String']['input']>;
  tokenIn_gt?: InputMaybe<Scalars['String']['input']>;
  tokenIn_gte?: InputMaybe<Scalars['String']['input']>;
  tokenIn_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenIn_lt?: InputMaybe<Scalars['String']['input']>;
  tokenIn_lte?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenOut?: InputMaybe<Scalars['String']['input']>;
  tokenOut_gt?: InputMaybe<Scalars['String']['input']>;
  tokenOut_gte?: InputMaybe<Scalars['String']['input']>;
  tokenOut_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenOut_lt?: InputMaybe<Scalars['String']['input']>;
  tokenOut_lte?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SwapPage = {
  __typename?: 'SwapPage';
  items: Array<Swap>;
  pageInfo: PageInfo;
};

export type Token = {
  __typename?: 'Token';
  decimals: Scalars['Int']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  marketTokens?: Maybe<MarketTokenPage>;
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};


export type TokenMarketTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TokenFilter>;
};

export type TokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TokenFilter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  icon?: InputMaybe<Scalars['String']['input']>;
  icon_contains?: InputMaybe<Scalars['String']['input']>;
  icon_ends_with?: InputMaybe<Scalars['String']['input']>;
  icon_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not?: InputMaybe<Scalars['String']['input']>;
  icon_not_contains?: InputMaybe<Scalars['String']['input']>;
  icon_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  icon_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  icon_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type TokenPage = {
  __typename?: 'TokenPage';
  items: Array<Token>;
  pageInfo: PageInfo;
};

export type UnderlyingYield = {
  __typename?: 'UnderlyingYield';
  id: Scalars['Int']['output'];
  marketId: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type UnderlyingYieldFilter = {
  AND?: InputMaybe<Array<InputMaybe<UnderlyingYieldFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UnderlyingYieldFilter>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_gt?: InputMaybe<Scalars['Int']['input']>;
  id_gte?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_lt?: InputMaybe<Scalars['Int']['input']>;
  id_lte?: InputMaybe<Scalars['Int']['input']>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['Float']['input']>;
  value_gt?: InputMaybe<Scalars['Float']['input']>;
  value_gte?: InputMaybe<Scalars['Float']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  value_lt?: InputMaybe<Scalars['Float']['input']>;
  value_lte?: InputMaybe<Scalars['Float']['input']>;
  value_not?: InputMaybe<Scalars['Float']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type UnderlyingYieldPage = {
  __typename?: 'UnderlyingYieldPage';
  items: Array<UnderlyingYield>;
  pageInfo: PageInfo;
};

export type YToken = {
  __typename?: 'YToken';
  id: Scalars['String']['output'];
  redeemableInterest: Scalars['BigInt']['output'];
  redeemableRewards: Scalars['BigInt']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
};

export type YTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<YTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<YTokenFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  redeemableInterest?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_gt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_gte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  redeemableInterest_lt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_lte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_not?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableInterest_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  redeemableRewards?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  redeemableRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  redeemableRewards_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type YTokenPage = {
  __typename?: 'YTokenPage';
  items: Array<YToken>;
  pageInfo: PageInfo;
};

export type YieldPricesHourly = {
  __typename?: 'YieldPricesHourly';
  average: Scalars['Float']['output'];
  close: Scalars['Float']['output'];
  count: Scalars['Int']['output'];
  high: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  low: Scalars['Float']['output'];
  marketId: Scalars['String']['output'];
  open: Scalars['Float']['output'];
  volume: Scalars['Float']['output'];
};

export type YieldPricesHourlyFilter = {
  AND?: InputMaybe<Array<InputMaybe<YieldPricesHourlyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<YieldPricesHourlyFilter>>>;
  average?: InputMaybe<Scalars['Float']['input']>;
  average_gt?: InputMaybe<Scalars['Float']['input']>;
  average_gte?: InputMaybe<Scalars['Float']['input']>;
  average_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  average_lt?: InputMaybe<Scalars['Float']['input']>;
  average_lte?: InputMaybe<Scalars['Float']['input']>;
  average_not?: InputMaybe<Scalars['Float']['input']>;
  average_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  close?: InputMaybe<Scalars['Float']['input']>;
  close_gt?: InputMaybe<Scalars['Float']['input']>;
  close_gte?: InputMaybe<Scalars['Float']['input']>;
  close_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  close_lt?: InputMaybe<Scalars['Float']['input']>;
  close_lte?: InputMaybe<Scalars['Float']['input']>;
  close_not?: InputMaybe<Scalars['Float']['input']>;
  close_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_gt?: InputMaybe<Scalars['Int']['input']>;
  count_gte?: InputMaybe<Scalars['Int']['input']>;
  count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  count_lt?: InputMaybe<Scalars['Int']['input']>;
  count_lte?: InputMaybe<Scalars['Int']['input']>;
  count_not?: InputMaybe<Scalars['Int']['input']>;
  count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  high?: InputMaybe<Scalars['Float']['input']>;
  high_gt?: InputMaybe<Scalars['Float']['input']>;
  high_gte?: InputMaybe<Scalars['Float']['input']>;
  high_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  high_lt?: InputMaybe<Scalars['Float']['input']>;
  high_lte?: InputMaybe<Scalars['Float']['input']>;
  high_not?: InputMaybe<Scalars['Float']['input']>;
  high_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  id_gt?: InputMaybe<Scalars['Int']['input']>;
  id_gte?: InputMaybe<Scalars['Int']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id_lt?: InputMaybe<Scalars['Int']['input']>;
  id_lte?: InputMaybe<Scalars['Int']['input']>;
  id_not?: InputMaybe<Scalars['Int']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  low?: InputMaybe<Scalars['Float']['input']>;
  low_gt?: InputMaybe<Scalars['Float']['input']>;
  low_gte?: InputMaybe<Scalars['Float']['input']>;
  low_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  low_lt?: InputMaybe<Scalars['Float']['input']>;
  low_lte?: InputMaybe<Scalars['Float']['input']>;
  low_not?: InputMaybe<Scalars['Float']['input']>;
  low_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  marketId?: InputMaybe<Scalars['String']['input']>;
  marketId_gt?: InputMaybe<Scalars['String']['input']>;
  marketId_gte?: InputMaybe<Scalars['String']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['String']['input']>;
  marketId_lte?: InputMaybe<Scalars['String']['input']>;
  marketId_not?: InputMaybe<Scalars['String']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  open?: InputMaybe<Scalars['Float']['input']>;
  open_gt?: InputMaybe<Scalars['Float']['input']>;
  open_gte?: InputMaybe<Scalars['Float']['input']>;
  open_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  open_lt?: InputMaybe<Scalars['Float']['input']>;
  open_lte?: InputMaybe<Scalars['Float']['input']>;
  open_not?: InputMaybe<Scalars['Float']['input']>;
  open_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  volume_gt?: InputMaybe<Scalars['Float']['input']>;
  volume_gte?: InputMaybe<Scalars['Float']['input']>;
  volume_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  volume_lt?: InputMaybe<Scalars['Float']['input']>;
  volume_lte?: InputMaybe<Scalars['Float']['input']>;
  volume_not?: InputMaybe<Scalars['Float']['input']>;
  volume_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type YieldPricesHourlyPage = {
  __typename?: 'YieldPricesHourlyPage';
  items: Array<YieldPricesHourly>;
  pageInfo: PageInfo;
};

export type AllocateItemFragment = { __typename?: 'Allocate', id: string, sender: string, debitX: any, debitY: any, deltaLiquidity: any, timestamp: any, block: any, pool: { __typename?: 'Pool', id: string, reserveX: any, reserveY: any, totalLiquidity: any, strike: any, sigma: any, fee: any, maturity: any, tokenX: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, tokenY: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, curator: { __typename?: 'Curator', id: string, name: string } } } & { ' $fragmentName'?: 'AllocateItemFragment' };

export type AllAllocatesQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
}>;


export type AllAllocatesQuery = { __typename?: 'Query', allocates: { __typename?: 'AllocatePage', items: Array<(
      { __typename?: 'Allocate' }
      & { ' $fragmentRefs'?: { 'AllocateItemFragment': AllocateItemFragment } }
    )> } };

export type DeallocateItemFragment = { __typename?: 'Deallocate', id: string, sender: string, creditX: any, creditY: any, deltaLiquidity: any, timestamp: any, block: any, pool: { __typename?: 'Pool', id: string, reserveX: any, reserveY: any, totalLiquidity: any, strike: any, sigma: any, fee: any, maturity: any, tokenX: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, tokenY: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, curator: { __typename?: 'Curator', id: string, name: string } } } & { ' $fragmentName'?: 'DeallocateItemFragment' };

export type AllDeallocatesQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
}>;


export type AllDeallocatesQuery = { __typename?: 'Query', deallocates: { __typename?: 'DeallocatePage', items: Array<(
      { __typename?: 'Deallocate' }
      & { ' $fragmentRefs'?: { 'DeallocateItemFragment': DeallocateItemFragment } }
    )> } };

export type MarketItemFragment = { __typename?: 'Market', id: string, name: string, expiry: any, ibAssetId: string, nativeAssetId: string, ptId: string, syId: string, underlyingToUsd: number, wrappedNativeAssetId: string, ytId: string, pool: { __typename?: 'Pool', aggregateVolumeInUnderlying: number, id: string, liquidityInUnderlying: number, reserveX: any, reserveY: any, totalLiquidity: any, strike: any, sigma: any, fee: any, maturity: any, tokenX: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, tokenY: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null }, curator: { __typename?: 'Curator', id: string, name: string } }, marketTokens?: { __typename?: 'MarketTokenPage', items: Array<{ __typename?: 'MarketToken', token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null } }> } | null } & { ' $fragmentName'?: 'MarketItemFragment' };

export type SyTokenQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type SyTokenQuery = { __typename?: 'Query', sYTokens: { __typename?: 'SYTokenPage', items: Array<{ __typename?: 'SYToken', exchangeRate: any, tokensIn?: Array<any> | null, tokensOut?: Array<any> | null, token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null } }> } };

export type PTokenQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type PTokenQuery = { __typename?: 'Query', pTokens: { __typename?: 'PTokenPage', items: Array<{ __typename?: 'PToken', token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null } }> } };

export type YTokenQueryVariables = Exact<{
  tokenId: Scalars['String']['input'];
}>;


export type YTokenQuery = { __typename?: 'Query', yTokens: { __typename?: 'YTokenPage', items: Array<{ __typename?: 'YToken', redeemableInterest: any, redeemableRewards: any, token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number, icon?: string | null } }> } };

export type AllMarketsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type AllMarketsQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<(
      { __typename?: 'Market' }
      & { ' $fragmentRefs'?: { 'MarketItemFragment': MarketItemFragment } }
    )> } };

export type MarketQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MarketQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<(
      { __typename?: 'Market' }
      & { ' $fragmentRefs'?: { 'MarketItemFragment': MarketItemFragment } }
    )> } };

export type PositionsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PositionsQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', id: string, avgEntryImpliedRate: number, netYieldDelta: number, marketId: string, portfolioId: string }> } };

export type MarketPriceItemFragment = { __typename?: 'YieldPricesHourly', id: number, marketId: string, open: number, close: number, high: number, low: number, average: number, volume: number, count: number } & { ' $fragmentName'?: 'MarketPriceItemFragment' };

export type MarketPriceQueryVariables = Exact<{
  marketId: Scalars['String']['input'];
}>;


export type MarketPriceQuery = { __typename?: 'Query', yieldPricesHourlys: { __typename?: 'YieldPricesHourlyPage', items: Array<(
      { __typename?: 'YieldPricesHourly' }
      & { ' $fragmentRefs'?: { 'MarketPriceItemFragment': MarketPriceItemFragment } }
    )> } };

export type ImpliedYieldItemFragment = { __typename?: 'ImpliedYield', id: number, marketId: string, value: number } & { ' $fragmentName'?: 'ImpliedYieldItemFragment' };

export type ImplYieldQueryVariables = Exact<{
  marketId: Scalars['String']['input'];
}>;


export type ImplYieldQuery = { __typename?: 'Query', impliedYields: { __typename?: 'ImpliedYieldPage', items: Array<(
      { __typename?: 'ImpliedYield' }
      & { ' $fragmentRefs'?: { 'ImpliedYieldItemFragment': ImpliedYieldItemFragment } }
    )> } };

export type UnderlyingYieldItemFragment = { __typename?: 'UnderlyingYield', id: number, marketId: string, value: number } & { ' $fragmentName'?: 'UnderlyingYieldItemFragment' };

export type UnderlyingYieldQueryVariables = Exact<{
  marketId: Scalars['String']['input'];
}>;


export type UnderlyingYieldQuery = { __typename?: 'Query', underlyingYields: { __typename?: 'UnderlyingYieldPage', items: Array<(
      { __typename?: 'UnderlyingYield' }
      & { ' $fragmentRefs'?: { 'UnderlyingYieldItemFragment': UnderlyingYieldItemFragment } }
    )> } };

export type SwapItemFragment = { __typename?: 'Swap', id: string, sender: string, tokenIn: string, tokenOut: string, amountIn: any, amountOut: any, timestamp: any, block: any } & { ' $fragmentName'?: 'SwapItemFragment' };

export type AllSwapsQueryVariables = Exact<{
  poolId: Scalars['String']['input'];
}>;


export type AllSwapsQuery = { __typename?: 'Query', swaps: { __typename?: 'SwapPage', items: Array<(
      { __typename?: 'Swap' }
      & { ' $fragmentRefs'?: { 'SwapItemFragment': SwapItemFragment } }
    )> } };

export const AllocateItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Allocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"debitX"}},{"kind":"Field","name":{"kind":"Name","value":"debitY"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllocateItemFragment, unknown>;
export const DeallocateItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeallocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Deallocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditX"}},{"kind":"Field","name":{"kind":"Name","value":"creditY"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<DeallocateItemFragment, unknown>;
export const MarketItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MarketItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Market"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateVolumeInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"ibAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"nativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ptId"}},{"kind":"Field","name":{"kind":"Name","value":"syId"}},{"kind":"Field","name":{"kind":"Name","value":"underlyingToUsd"}},{"kind":"Field","name":{"kind":"Name","value":"wrappedNativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ytId"}}]}}]} as unknown as DocumentNode<MarketItemFragment, unknown>;
export const MarketPriceItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MarketPriceItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YieldPricesHourly"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"average"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<MarketPriceItemFragment, unknown>;
export const ImpliedYieldItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImpliedYieldItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImpliedYield"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<ImpliedYieldItemFragment, unknown>;
export const UnderlyingYieldItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnderlyingYieldItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnderlyingYield"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<UnderlyingYieldItemFragment, unknown>;
export const SwapItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SwapItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Swap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"amountIn"}},{"kind":"Field","name":{"kind":"Name","value":"amountOut"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<SwapItemFragment, unknown>;
export const AllAllocatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allAllocates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allocates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllocateItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Allocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"debitX"}},{"kind":"Field","name":{"kind":"Name","value":"debitY"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllAllocatesQuery, AllAllocatesQueryVariables>;
export const AllDeallocatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allDeallocates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deallocates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DeallocateItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeallocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Deallocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditX"}},{"kind":"Field","name":{"kind":"Name","value":"creditY"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllDeallocatesQuery, AllDeallocatesQueryVariables>;
export const SyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"syToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sYTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exchangeRate"}},{"kind":"Field","name":{"kind":"Name","value":"tokensIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOut"}}]}}]}}]}}]} as unknown as DocumentNode<SyTokenQuery, SyTokenQueryVariables>;
export const PTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PTokenQuery, PTokenQueryVariables>;
export const YTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"yToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"redeemableInterest"}},{"kind":"Field","name":{"kind":"Name","value":"redeemableRewards"}}]}}]}}]}}]} as unknown as DocumentNode<YTokenQuery, YTokenQueryVariables>;
export const AllMarketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allMarkets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MarketItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MarketItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Market"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateVolumeInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"ibAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"nativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ptId"}},{"kind":"Field","name":{"kind":"Name","value":"syId"}},{"kind":"Field","name":{"kind":"Name","value":"underlyingToUsd"}},{"kind":"Field","name":{"kind":"Name","value":"wrappedNativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ytId"}}]}}]} as unknown as DocumentNode<AllMarketsQuery, AllMarketsQueryVariables>;
export const MarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"market"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MarketItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MarketItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Market"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregateVolumeInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityInUnderlying"}},{"kind":"Field","name":{"kind":"Name","value":"tokenX"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reserveX"}},{"kind":"Field","name":{"kind":"Name","value":"reserveY"}},{"kind":"Field","name":{"kind":"Name","value":"totalLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"strike"}},{"kind":"Field","name":{"kind":"Name","value":"sigma"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"maturity"}},{"kind":"Field","name":{"kind":"Name","value":"curator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"ibAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"nativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ptId"}},{"kind":"Field","name":{"kind":"Name","value":"syId"}},{"kind":"Field","name":{"kind":"Name","value":"underlyingToUsd"}},{"kind":"Field","name":{"kind":"Name","value":"wrappedNativeAssetId"}},{"kind":"Field","name":{"kind":"Name","value":"ytId"}}]}}]} as unknown as DocumentNode<MarketQuery, MarketQueryVariables>;
export const PositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"positions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avgEntryImpliedRate"}},{"kind":"Field","name":{"kind":"Name","value":"netYieldDelta"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"portfolioId"}}]}}]}}]}}]} as unknown as DocumentNode<PositionsQuery, PositionsQueryVariables>;
export const MarketPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"marketPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yieldPricesHourlys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MarketPriceItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MarketPriceItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YieldPricesHourly"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"average"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]} as unknown as DocumentNode<MarketPriceQuery, MarketPriceQueryVariables>;
export const ImplYieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"implYield"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impliedYields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImpliedYieldItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImpliedYieldItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImpliedYield"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<ImplYieldQuery, ImplYieldQueryVariables>;
export const UnderlyingYieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"underlyingYield"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"underlyingYields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UnderlyingYieldItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UnderlyingYieldItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnderlyingYield"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<UnderlyingYieldQuery, UnderlyingYieldQueryVariables>;
export const AllSwapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allSwaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SwapItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SwapItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Swap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"amountIn"}},{"kind":"Field","name":{"kind":"Name","value":"amountOut"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllSwapsQuery, AllSwapsQueryVariables>;