/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
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
  constantSumParams?: Maybe<ConstantSumParams>;
  constantSumParamss: ConstantSumParamsPage;
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

export type PoolTokenItemFragment = { __typename?: 'PoolToken', token: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number } } & { ' $fragmentName'?: 'PoolTokenItemFragment' };

export type PoolItemFragment = { __typename?: 'Pool', id: any, poolTokens?: { __typename?: 'PoolTokenPage', items: Array<(
      { __typename?: 'PoolToken' }
      & { ' $fragmentRefs'?: { 'PoolTokenItemFragment': PoolTokenItemFragment } }
    )> } | null } & { ' $fragmentName'?: 'PoolItemFragment' };

export type AllPoolsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type AllPoolsQuery = { __typename?: 'Query', pools: { __typename?: 'PoolPage', items: Array<(
      { __typename?: 'Pool' }
      & { ' $fragmentRefs'?: { 'PoolItemFragment': PoolItemFragment } }
    )> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const PoolTokenItemFragmentDoc = new TypedDocumentString(`
    fragment PoolTokenItem on PoolToken {
  token {
    id
    name
    symbol
    decimals
  }
}
    `, {"fragmentName":"PoolTokenItem"}) as unknown as TypedDocumentString<PoolTokenItemFragment, unknown>;
export const PoolItemFragmentDoc = new TypedDocumentString(`
    fragment PoolItem on Pool {
  id
  poolTokens {
    items {
      ...PoolTokenItem
    }
  }
}
    fragment PoolTokenItem on PoolToken {
  token {
    id
    name
    symbol
    decimals
  }
}`, {"fragmentName":"PoolItem"}) as unknown as TypedDocumentString<PoolItemFragment, unknown>;
export const AllPoolsDocument = new TypedDocumentString(`
    query allPools($limit: Int!) {
  pools(limit: $limit) {
    items {
      ...PoolItem
    }
  }
}
    fragment PoolTokenItem on PoolToken {
  token {
    id
    name
    symbol
    decimals
  }
}
fragment PoolItem on Pool {
  id
  poolTokens {
    items {
      ...PoolTokenItem
    }
  }
}`) as unknown as TypedDocumentString<AllPoolsQuery, AllPoolsQueryVariables>;