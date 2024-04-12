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

export type Account = {
  __typename?: 'Account';
  id: Scalars['String']['output'];
  pointsTotal: Scalars['BigInt']['output'];
  positions?: Maybe<PositionPage>;
  slPoints: Scalars['BigInt']['output'];
  swapPoints: Scalars['BigInt']['output'];
  wrPoints: Scalars['BigInt']['output'];
};


export type AccountPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AccountFilter>;
};

export type AccountFilter = {
  AND?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AccountFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pointsTotal?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  pointsTotal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_not?: InputMaybe<Scalars['BigInt']['input']>;
  pointsTotal_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  slPoints?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  slPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  slPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapPoints?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  wrPoints?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  wrPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  wrPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type AccountPage = {
  __typename?: 'AccountPage';
  items: Array<Account>;
  pageInfo: PageInfo;
};

export type Allocate = {
  __typename?: 'Allocate';
  block: Scalars['BigInt']['output'];
  deltaLiquidity: Scalars['Float']['output'];
  deltaLiquidityWad: Scalars['BigInt']['output'];
  deltas: Array<Scalars['Float']['output']>;
  deltasWad: Array<Scalars['BigInt']['output']>;
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
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
  deltaLiquidity?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidityWad?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidityWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity_gt?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_gte?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltaLiquidity_lt?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_lte?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_not?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltas?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltasWad?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltasWad_has?: InputMaybe<Scalars['BigInt']['input']>;
  deltasWad_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltasWad_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  deltas_has?: InputMaybe<Scalars['Float']['input']>;
  deltas_not?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltas_not_has?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type ConstantSumParams = {
  __typename?: 'ConstantSumParams';
  controller: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastComputedPrice: Scalars['Float']['output'];
  lastComputedPriceWad: Scalars['BigInt']['output'];
  lastPriceUpdate: Scalars['Int']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  priceUpdateEnd: Scalars['Int']['output'];
  priceUpdatePerSecond: Scalars['Float']['output'];
  priceUpdatePerSecondWad: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
};

export type ConstantSumParamsFilter = {
  AND?: InputMaybe<Array<InputMaybe<ConstantSumParamsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ConstantSumParamsFilter>>>;
  controller?: InputMaybe<Scalars['String']['input']>;
  controller_gt?: InputMaybe<Scalars['String']['input']>;
  controller_gte?: InputMaybe<Scalars['String']['input']>;
  controller_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  controller_lt?: InputMaybe<Scalars['String']['input']>;
  controller_lte?: InputMaybe<Scalars['String']['input']>;
  controller_not?: InputMaybe<Scalars['String']['input']>;
  controller_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedPrice?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPriceWad?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedPriceWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedPriceWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedPrice_gt?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPrice_gte?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPrice_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lastComputedPrice_lt?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPrice_lte?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPrice_not?: InputMaybe<Scalars['Float']['input']>;
  lastComputedPrice_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lastPriceUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastPriceUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastPriceUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  priceUpdateEnd?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  priceUpdateEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_not?: InputMaybe<Scalars['Int']['input']>;
  priceUpdateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  priceUpdatePerSecond?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecondWad?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  priceUpdatePerSecondWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdatePerSecondWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  priceUpdatePerSecond_gt?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecond_gte?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecond_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  priceUpdatePerSecond_lt?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecond_lte?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecond_not?: InputMaybe<Scalars['Float']['input']>;
  priceUpdatePerSecond_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ConstantSumParamsPage = {
  __typename?: 'ConstantSumParamsPage';
  items: Array<ConstantSumParams>;
  pageInfo: PageInfo;
};

export type Deallocate = {
  __typename?: 'Deallocate';
  block: Scalars['BigInt']['output'];
  deltaLiquidity: Scalars['Float']['output'];
  deltaLiquidityWad: Scalars['BigInt']['output'];
  deltas?: Maybe<Array<Scalars['Float']['output']>>;
  deltasWad?: Maybe<Array<Scalars['BigInt']['output']>>;
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
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
  deltaLiquidity?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidityWad?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidityWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  deltaLiquidityWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltaLiquidity_gt?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_gte?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltaLiquidity_lt?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_lte?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_not?: InputMaybe<Scalars['Float']['input']>;
  deltaLiquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltas?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltasWad?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltasWad_has?: InputMaybe<Scalars['BigInt']['input']>;
  deltasWad_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  deltasWad_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  deltas_has?: InputMaybe<Scalars['Float']['input']>;
  deltas_not?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  deltas_not_has?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type GeometricMeanParams = {
  __typename?: 'GeometricMeanParams';
  controller: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastComputedWeightX: Scalars['BigInt']['output'];
  lastWeightXUpdate: Scalars['Int']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
  weightXUpdateEnd: Scalars['Int']['output'];
  weightXUpdatePerSecond: Scalars['BigInt']['output'];
};

export type GeometricMeanParamsFilter = {
  AND?: InputMaybe<Array<InputMaybe<GeometricMeanParamsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GeometricMeanParamsFilter>>>;
  controller?: InputMaybe<Scalars['String']['input']>;
  controller_gt?: InputMaybe<Scalars['String']['input']>;
  controller_gte?: InputMaybe<Scalars['String']['input']>;
  controller_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  controller_lt?: InputMaybe<Scalars['String']['input']>;
  controller_lte?: InputMaybe<Scalars['String']['input']>;
  controller_not?: InputMaybe<Scalars['String']['input']>;
  controller_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWeightX?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWeightX_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeightX_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastWeightXUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastWeightXUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastWeightXUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightXUpdateEnd?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  weightXUpdateEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_not?: InputMaybe<Scalars['Int']['input']>;
  weightXUpdateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  weightXUpdatePerSecond?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightXUpdatePerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_not?: InputMaybe<Scalars['BigInt']['input']>;
  weightXUpdatePerSecond_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type GeometricMeanParamsPage = {
  __typename?: 'GeometricMeanParamsPage';
  items: Array<GeometricMeanParams>;
  pageInfo: PageInfo;
};

export type LogNormalParams = {
  __typename?: 'LogNormalParams';
  controller: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastComputedMean: Scalars['BigInt']['output'];
  lastComputedWidth: Scalars['BigInt']['output'];
  lastMeanUpdate: Scalars['Int']['output'];
  lastWidthUpdate: Scalars['Int']['output'];
  meanUpdateEnd: Scalars['Int']['output'];
  meanUpdatePerSecond: Scalars['BigInt']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
  widthUpdateEnd: Scalars['Int']['output'];
  widthUpdatePerSecond: Scalars['BigInt']['output'];
};

export type LogNormalParamsFilter = {
  AND?: InputMaybe<Array<InputMaybe<LogNormalParamsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LogNormalParamsFilter>>>;
  controller?: InputMaybe<Scalars['String']['input']>;
  controller_gt?: InputMaybe<Scalars['String']['input']>;
  controller_gte?: InputMaybe<Scalars['String']['input']>;
  controller_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  controller_lt?: InputMaybe<Scalars['String']['input']>;
  controller_lte?: InputMaybe<Scalars['String']['input']>;
  controller_not?: InputMaybe<Scalars['String']['input']>;
  controller_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedMean?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedMean_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedMean_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWidth?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWidth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWidth_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastMeanUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastMeanUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastMeanUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastWidthUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastWidthUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastWidthUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  meanUpdateEnd?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  meanUpdateEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_not?: InputMaybe<Scalars['Int']['input']>;
  meanUpdateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  meanUpdatePerSecond?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  meanUpdatePerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_not?: InputMaybe<Scalars['BigInt']['input']>;
  meanUpdatePerSecond_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  widthUpdateEnd?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  widthUpdateEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_not?: InputMaybe<Scalars['Int']['input']>;
  widthUpdateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  widthUpdatePerSecond?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  widthUpdatePerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_not?: InputMaybe<Scalars['BigInt']['input']>;
  widthUpdatePerSecond_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type LogNormalParamsPage = {
  __typename?: 'LogNormalParamsPage';
  items: Array<LogNormalParams>;
  pageInfo: PageInfo;
};

export type NTokenGeometricMeanParams = {
  __typename?: 'NTokenGeometricMeanParams';
  controller: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastComputedWeights: Array<Scalars['BigInt']['output']>;
  lastWeightsUpdate: Scalars['Int']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
  weightsUpdateEnd: Scalars['Int']['output'];
  weightsUpdatePerSecond: Array<Scalars['BigInt']['output']>;
};

export type NTokenGeometricMeanParamsFilter = {
  AND?: InputMaybe<Array<InputMaybe<NTokenGeometricMeanParamsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<NTokenGeometricMeanParamsFilter>>>;
  controller?: InputMaybe<Scalars['String']['input']>;
  controller_gt?: InputMaybe<Scalars['String']['input']>;
  controller_gte?: InputMaybe<Scalars['String']['input']>;
  controller_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  controller_lt?: InputMaybe<Scalars['String']['input']>;
  controller_lte?: InputMaybe<Scalars['String']['input']>;
  controller_not?: InputMaybe<Scalars['String']['input']>;
  controller_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWeights?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWeights_has?: InputMaybe<Scalars['BigInt']['input']>;
  lastComputedWeights_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastComputedWeights_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  lastWeightsUpdate?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_gt?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_gte?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastWeightsUpdate_lt?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_lte?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_not?: InputMaybe<Scalars['Int']['input']>;
  lastWeightsUpdate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightsUpdateEnd?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_gt?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_gte?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  weightsUpdateEnd_lt?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_lte?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_not?: InputMaybe<Scalars['Int']['input']>;
  weightsUpdateEnd_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  weightsUpdatePerSecond?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightsUpdatePerSecond_has?: InputMaybe<Scalars['BigInt']['input']>;
  weightsUpdatePerSecond_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightsUpdatePerSecond_not_has?: InputMaybe<Scalars['BigInt']['input']>;
};

export type NTokenGeometricMeanParamsPage = {
  __typename?: 'NTokenGeometricMeanParamsPage';
  items: Array<NTokenGeometricMeanParams>;
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
  id: Scalars['BigInt']['output'];
  initTimestamp: Scalars['BigInt']['output'];
  liquidity: Scalars['Float']['output'];
  liquidityWad: Scalars['BigInt']['output'];
  lpToken: Scalars['String']['output'];
  name: Scalars['String']['output'];
  poolTokens?: Maybe<PoolTokenPage>;
  positions?: Maybe<PositionPage>;
  reserves: Array<Scalars['Float']['output']>;
  reservesWad: Array<Scalars['BigInt']['output']>;
  strategy: Strategy;
  strategyId: Scalars['String']['output'];
  tokens: Array<Scalars['String']['output']>;
};


export type PoolPoolTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PoolFilter>;
};


export type PoolPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PoolFilter>;
};

export type PoolFilter = {
  AND?: InputMaybe<Array<InputMaybe<PoolFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PoolFilter>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  initTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  initTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  initTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidity?: InputMaybe<Scalars['Float']['input']>;
  liquidityWad?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidity_gt?: InputMaybe<Scalars['Float']['input']>;
  liquidity_gte?: InputMaybe<Scalars['Float']['input']>;
  liquidity_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  liquidity_lt?: InputMaybe<Scalars['Float']['input']>;
  liquidity_lte?: InputMaybe<Scalars['Float']['input']>;
  liquidity_not?: InputMaybe<Scalars['Float']['input']>;
  liquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lpToken?: InputMaybe<Scalars['String']['input']>;
  lpToken_gt?: InputMaybe<Scalars['String']['input']>;
  lpToken_gte?: InputMaybe<Scalars['String']['input']>;
  lpToken_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lpToken_lt?: InputMaybe<Scalars['String']['input']>;
  lpToken_lte?: InputMaybe<Scalars['String']['input']>;
  lpToken_not?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  reserves?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  reservesWad?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reservesWad_has?: InputMaybe<Scalars['BigInt']['input']>;
  reservesWad_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reservesWad_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_has?: InputMaybe<Scalars['Float']['input']>;
  reserves_not?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  reserves_not_has?: InputMaybe<Scalars['Float']['input']>;
  strategyId?: InputMaybe<Scalars['String']['input']>;
  strategyId_gt?: InputMaybe<Scalars['String']['input']>;
  strategyId_gte?: InputMaybe<Scalars['String']['input']>;
  strategyId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  strategyId_lt?: InputMaybe<Scalars['String']['input']>;
  strategyId_lte?: InputMaybe<Scalars['String']['input']>;
  strategyId_not?: InputMaybe<Scalars['String']['input']>;
  strategyId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokens?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokens_has?: InputMaybe<Scalars['String']['input']>;
  tokens_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokens_not_has?: InputMaybe<Scalars['String']['input']>;
};

export type PoolPage = {
  __typename?: 'PoolPage';
  items: Array<Pool>;
  pageInfo: PageInfo;
};

export type PoolToken = {
  __typename?: 'PoolToken';
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  token: Token;
  tokenId: Scalars['String']['output'];
};

export type PoolTokenFilter = {
  AND?: InputMaybe<Array<InputMaybe<PoolTokenFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PoolTokenFilter>>>;
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
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_gt?: InputMaybe<Scalars['String']['input']>;
  tokenId_gte?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_lt?: InputMaybe<Scalars['String']['input']>;
  tokenId_lte?: InputMaybe<Scalars['String']['input']>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PoolTokenPage = {
  __typename?: 'PoolTokenPage';
  items: Array<PoolToken>;
  pageInfo: PageInfo;
};

export type Position = {
  __typename?: 'Position';
  account: Account;
  accountId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  liquidity: Scalars['Float']['output'];
  liquidityWad: Scalars['BigInt']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
};

export type PositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  accountId?: InputMaybe<Scalars['String']['input']>;
  accountId_gt?: InputMaybe<Scalars['String']['input']>;
  accountId_gte?: InputMaybe<Scalars['String']['input']>;
  accountId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accountId_lt?: InputMaybe<Scalars['String']['input']>;
  accountId_lte?: InputMaybe<Scalars['String']['input']>;
  accountId_not?: InputMaybe<Scalars['String']['input']>;
  accountId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  liquidity?: InputMaybe<Scalars['Float']['input']>;
  liquidityWad?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidity_gt?: InputMaybe<Scalars['Float']['input']>;
  liquidity_gte?: InputMaybe<Scalars['Float']['input']>;
  liquidity_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  liquidity_lt?: InputMaybe<Scalars['Float']['input']>;
  liquidity_lte?: InputMaybe<Scalars['Float']['input']>;
  liquidity_not?: InputMaybe<Scalars['Float']['input']>;
  liquidity_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type PositionPage = {
  __typename?: 'PositionPage';
  items: Array<Position>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: AccountPage;
  allocate?: Maybe<Allocate>;
  allocates: AllocatePage;
  constantSumParams?: Maybe<ConstantSumParams>;
  constantSumParamss: ConstantSumParamsPage;
  deallocate?: Maybe<Deallocate>;
  deallocates: DeallocatePage;
  geometricMeanParams?: Maybe<GeometricMeanParams>;
  geometricMeanParamss: GeometricMeanParamsPage;
  logNormalParams?: Maybe<LogNormalParams>;
  logNormalParamss: LogNormalParamsPage;
  nTokenGeometricMeanParams?: Maybe<NTokenGeometricMeanParams>;
  nTokenGeometricMeanParamss: NTokenGeometricMeanParamsPage;
  pool?: Maybe<Pool>;
  poolToken?: Maybe<PoolToken>;
  poolTokens: PoolTokenPage;
  pools: PoolPage;
  position?: Maybe<Position>;
  positions: PositionPage;
  strategy?: Maybe<Strategy>;
  strategys: StrategyPage;
  swap?: Maybe<Swap>;
  swaps: SwapPage;
  token?: Maybe<Token>;
  tokens: TokenPage;
};


export type QueryAccountArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountFilter>;
};


export type QueryAllocateArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllocatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AllocateFilter>;
};


export type QueryConstantSumParamsArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryConstantSumParamssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConstantSumParamsFilter>;
};


export type QueryDeallocateArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDeallocatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DeallocateFilter>;
};


export type QueryGeometricMeanParamsArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGeometricMeanParamssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GeometricMeanParamsFilter>;
};


export type QueryLogNormalParamsArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLogNormalParamssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LogNormalParamsFilter>;
};


export type QueryNTokenGeometricMeanParamsArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNTokenGeometricMeanParamssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NTokenGeometricMeanParamsFilter>;
};


export type QueryPoolArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPoolTokenArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPoolTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PoolTokenFilter>;
};


export type QueryPoolsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PoolFilter>;
};


export type QueryPositionArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionFilter>;
};


export type QueryStrategyArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStrategysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StrategyFilter>;
};


export type QuerySwapArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySwapsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SwapFilter>;
};


export type QueryTokenArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTokensArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TokenFilter>;
};

export type Strategy = {
  __typename?: 'Strategy';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pools?: Maybe<PoolPage>;
};


export type StrategyPoolsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<StrategyFilter>;
};

export type StrategyFilter = {
  AND?: InputMaybe<Array<InputMaybe<StrategyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<StrategyFilter>>>;
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
};

export type StrategyPage = {
  __typename?: 'StrategyPage';
  items: Array<Strategy>;
  pageInfo: PageInfo;
};

export type Swap = {
  __typename?: 'Swap';
  amountIn: Scalars['Float']['output'];
  amountInWad: Scalars['BigInt']['output'];
  amountOut: Scalars['Float']['output'];
  amountOutWad: Scalars['BigInt']['output'];
  block: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  pool: Pool;
  poolId: Scalars['BigInt']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
};

export type SwapFilter = {
  AND?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SwapFilter>>>;
  amountIn?: InputMaybe<Scalars['Float']['input']>;
  amountInWad?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountInWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountInWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountIn_gt?: InputMaybe<Scalars['Float']['input']>;
  amountIn_gte?: InputMaybe<Scalars['Float']['input']>;
  amountIn_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  amountIn_lt?: InputMaybe<Scalars['Float']['input']>;
  amountIn_lte?: InputMaybe<Scalars['Float']['input']>;
  amountIn_not?: InputMaybe<Scalars['Float']['input']>;
  amountIn_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  amountOut?: InputMaybe<Scalars['Float']['input']>;
  amountOutWad?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountOutWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountOutWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountOut_gt?: InputMaybe<Scalars['Float']['input']>;
  amountOut_gte?: InputMaybe<Scalars['Float']['input']>;
  amountOut_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  amountOut_lt?: InputMaybe<Scalars['Float']['input']>;
  amountOut_lte?: InputMaybe<Scalars['Float']['input']>;
  amountOut_not?: InputMaybe<Scalars['Float']['input']>;
  amountOut_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  block?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  poolTokens?: Maybe<PoolTokenPage>;
  symbol: Scalars['String']['output'];
};


export type TokenPoolTokensArgs = {
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

export type AllocateItemFragment = { __typename?: 'Allocate', id: string, poolId: any, sender: string, block: any, deltas: Array<number>, deltaLiquidity: number, timestamp: any } & { ' $fragmentName'?: 'AllocateItemFragment' };

export type AllAllocatesQueryVariables = Exact<{
  poolId: Scalars['BigInt']['input'];
}>;


export type AllAllocatesQuery = { __typename?: 'Query', allocates: { __typename?: 'AllocatePage', items: Array<(
      { __typename?: 'Allocate' }
      & { ' $fragmentRefs'?: { 'AllocateItemFragment': AllocateItemFragment } }
    )> } };

export type DeallocateItemFragment = { __typename?: 'Deallocate', id: string, poolId: any, sender: string, block: any, deltas?: Array<number> | null, deltaLiquidity: number, timestamp: any } & { ' $fragmentName'?: 'DeallocateItemFragment' };

export type AllDeallocatesQueryVariables = Exact<{
  poolId: Scalars['BigInt']['input'];
}>;


export type AllDeallocatesQuery = { __typename?: 'Query', deallocates: { __typename?: 'DeallocatePage', items: Array<(
      { __typename?: 'Deallocate' }
      & { ' $fragmentRefs'?: { 'DeallocateItemFragment': DeallocateItemFragment } }
    )> } };

export type NgParamsItemFragment = { __typename?: 'NTokenGeometricMeanParams', id: any, poolId: any, swapFee: any, controller: string, lastComputedWeights: Array<any>, weightsUpdatePerSecond: Array<any>, weightsUpdateEnd: number, lastWeightsUpdate: number } & { ' $fragmentName'?: 'NgParamsItemFragment' };

export type NgParamsQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type NgParamsQuery = { __typename?: 'Query', nTokenGeometricMeanParams?: (
    { __typename?: 'NTokenGeometricMeanParams' }
    & { ' $fragmentRefs'?: { 'NgParamsItemFragment': NgParamsItemFragment } }
  ) | null };

export type CsParamsItemFragment = { __typename?: 'ConstantSumParams', id: any, poolId: any, swapFee: any, controller: string, lastComputedPrice: number, priceUpdatePerSecond: number, priceUpdateEnd: number, lastPriceUpdate: number } & { ' $fragmentName'?: 'CsParamsItemFragment' };

export type CsParamsQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type CsParamsQuery = { __typename?: 'Query', constantSumParams?: (
    { __typename?: 'ConstantSumParams' }
    & { ' $fragmentRefs'?: { 'CsParamsItemFragment': CsParamsItemFragment } }
  ) | null };

export type LNParamsItemFragment = { __typename?: 'LogNormalParams', id: any, poolId: any, swapFee: any, controller: string, lastComputedMean: any, lastComputedWidth: any, lastMeanUpdate: number, lastWidthUpdate: number, meanUpdateEnd: number, meanUpdatePerSecond: any, widthUpdateEnd: number, widthUpdatePerSecond: any } & { ' $fragmentName'?: 'LNParamsItemFragment' };

export type LnParamsQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type LnParamsQuery = { __typename?: 'Query', logNormalParams?: (
    { __typename?: 'LogNormalParams' }
    & { ' $fragmentRefs'?: { 'LNParamsItemFragment': LNParamsItemFragment } }
  ) | null };

export type PoolTokenItemFragment = { __typename?: 'PoolToken', token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number } } & { ' $fragmentName'?: 'PoolTokenItemFragment' };

export type PoolItemFragment = { __typename?: 'Pool', id: any, tokens: Array<string>, reserves: Array<number>, liquidity: number, lpToken: string, name: string, initTimestamp: any, poolTokens?: { __typename?: 'PoolTokenPage', items: Array<(
      { __typename?: 'PoolToken' }
      & { ' $fragmentRefs'?: { 'PoolTokenItemFragment': PoolTokenItemFragment } }
    )> } | null, strategy: { __typename?: 'Strategy', name: string } } & { ' $fragmentName'?: 'PoolItemFragment' };

export type AllPoolsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type AllPoolsQuery = { __typename?: 'Query', pools: { __typename?: 'PoolPage', items: Array<(
      { __typename?: 'Pool' }
      & { ' $fragmentRefs'?: { 'PoolItemFragment': PoolItemFragment } }
    )> } };

export type PoolWithTokensFragment = { __typename?: 'Pool', id: any, tokens: Array<string>, reserves: Array<number>, liquidity: number, lpToken: string, name: string, initTimestamp: any, poolTokens?: { __typename?: 'PoolTokenPage', items: Array<{ __typename?: 'PoolToken', token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number } }> } | null, strategy: { __typename?: 'Strategy', name: string }, positions?: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', accountId: string }> } | null } & { ' $fragmentName'?: 'PoolWithTokensFragment' };

export type PoolInfoQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type PoolInfoQuery = { __typename?: 'Query', pool?: (
    { __typename?: 'Pool' }
    & { ' $fragmentRefs'?: { 'PoolWithTokensFragment': PoolWithTokensFragment } }
  ) | null };

export type PositionItemFragment = { __typename?: 'Position', id: string, accountId: string, liquidity: number, liquidityWad: any, poolId: any, pool: (
    { __typename?: 'Pool' }
    & { ' $fragmentRefs'?: { 'PoolWithTokensFragment': PoolWithTokensFragment } }
  ) } & { ' $fragmentName'?: 'PositionItemFragment' };

export type AllPositionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type AllPositionsQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<(
      { __typename?: 'Position' }
      & { ' $fragmentRefs'?: { 'PositionItemFragment': PositionItemFragment } }
    )> } };

export type SwapItemFragment = { __typename?: 'Swap', id: string, poolId: any, sender: string, amountIn: number, amountOut: number, tokenIn: string, tokenOut: string, timestamp: any, block: any, pool: (
    { __typename?: 'Pool' }
    & { ' $fragmentRefs'?: { 'PoolItemFragment': PoolItemFragment } }
  ) } & { ' $fragmentName'?: 'SwapItemFragment' };

export type AllSwapsQueryVariables = Exact<{
  poolId: Scalars['BigInt']['input'];
}>;


export type AllSwapsQuery = { __typename?: 'Query', swaps: { __typename?: 'SwapPage', items: Array<(
      { __typename?: 'Swap' }
      & { ' $fragmentRefs'?: { 'SwapItemFragment': SwapItemFragment } }
    )> } };

export const AllocateItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Allocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"deltas"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllocateItemFragment, unknown>;
export const DeallocateItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeallocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Deallocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"deltas"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<DeallocateItemFragment, unknown>;
export const NgParamsItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NgParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NTokenGeometricMeanParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedWeights"}},{"kind":"Field","name":{"kind":"Name","value":"weightsUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"weightsUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"lastWeightsUpdate"}}]}}]} as unknown as DocumentNode<NgParamsItemFragment, unknown>;
export const CsParamsItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CSParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConstantSumParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"priceUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"priceUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"lastPriceUpdate"}}]}}]} as unknown as DocumentNode<CsParamsItemFragment, unknown>;
export const LNParamsItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lNParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogNormalParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedMean"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedWidth"}},{"kind":"Field","name":{"kind":"Name","value":"lastMeanUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"lastWidthUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"meanUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"meanUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"widthUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"widthUpdatePerSecond"}}]}}]} as unknown as DocumentNode<LNParamsItemFragment, unknown>;
export const PoolWithTokensFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolWithTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}}]} as unknown as DocumentNode<PoolWithTokensFragment, unknown>;
export const PositionItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityWad"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolWithTokens"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolWithTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}}]} as unknown as DocumentNode<PositionItemFragment, unknown>;
export const PoolTokenItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolTokenItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PoolToken"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]} as unknown as DocumentNode<PoolTokenItemFragment, unknown>;
export const PoolItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolTokenItem"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolTokenItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PoolToken"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]} as unknown as DocumentNode<PoolItemFragment, unknown>;
export const SwapItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SwapItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Swap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"amountIn"}},{"kind":"Field","name":{"kind":"Name","value":"amountOut"}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolTokenItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PoolToken"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolTokenItem"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}}]} as unknown as DocumentNode<SwapItemFragment, unknown>;
export const AllAllocatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allAllocates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allocates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AllocateItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AllocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Allocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"deltas"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllAllocatesQuery, AllAllocatesQueryVariables>;
export const AllDeallocatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allDeallocates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deallocates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DeallocateItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DeallocateItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Deallocate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"deltas"}},{"kind":"Field","name":{"kind":"Name","value":"deltaLiquidity"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllDeallocatesQuery, AllDeallocatesQueryVariables>;
export const NGParamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nGParams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nTokenGeometricMeanParams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NgParamsItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NgParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NTokenGeometricMeanParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedWeights"}},{"kind":"Field","name":{"kind":"Name","value":"weightsUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"weightsUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"lastWeightsUpdate"}}]}}]} as unknown as DocumentNode<NGParamsQuery, NGParamsQueryVariables>;
export const CsParamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"csParams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constantSumParams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CSParamsItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CSParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConstantSumParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"priceUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"priceUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"lastPriceUpdate"}}]}}]} as unknown as DocumentNode<CsParamsQuery, CsParamsQueryVariables>;
export const LNParamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lNParams"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logNormalParams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"lNParamsItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lNParamsItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogNormalParams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"swapFee"}},{"kind":"Field","name":{"kind":"Name","value":"controller"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedMean"}},{"kind":"Field","name":{"kind":"Name","value":"lastComputedWidth"}},{"kind":"Field","name":{"kind":"Name","value":"lastMeanUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"lastWidthUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"meanUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"meanUpdatePerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"widthUpdateEnd"}},{"kind":"Field","name":{"kind":"Name","value":"widthUpdatePerSecond"}}]}}]} as unknown as DocumentNode<LNParamsQuery, LNParamsQueryVariables>;
export const AllPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolTokenItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PoolToken"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolTokenItem"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}}]} as unknown as DocumentNode<AllPoolsQuery, AllPoolsQueryVariables>;
export const PoolInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"poolInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolWithTokens"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolWithTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}}]} as unknown as DocumentNode<PoolInfoQuery, PoolInfoQueryVariables>;
export const AllPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolWithTokens"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityWad"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolWithTokens"}}]}}]}}]} as unknown as DocumentNode<AllPositionsQuery, AllPositionsQueryVariables>;
export const AllSwapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allSwaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swaps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SwapItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolTokenItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PoolToken"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pool"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolTokenItem"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"liquidity"}},{"kind":"Field","name":{"kind":"Name","value":"lpToken"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initTimestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SwapItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Swap"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poolId"}},{"kind":"Field","name":{"kind":"Name","value":"pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoolItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"amountIn"}},{"kind":"Field","name":{"kind":"Name","value":"amountOut"}},{"kind":"Field","name":{"kind":"Name","value":"tokenIn"}},{"kind":"Field","name":{"kind":"Name","value":"tokenOut"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"}}]}}]} as unknown as DocumentNode<AllSwapsQuery, AllSwapsQueryVariables>;