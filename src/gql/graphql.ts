/* eslint-disable */
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
  positions?: Maybe<PositionPage>;
};


export type AccountPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AccountPage = {
  __typename?: 'AccountPage';
  items?: Maybe<Array<Account>>;
  pageInfo?: Maybe<PageInfo>;
};

export type G3MParameters = {
  __typename?: 'G3MParameters';
  controller: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  swapFee: Scalars['Float']['output'];
  swapFeeWad: Scalars['BigInt']['output'];
  weightX: Scalars['Float']['output'];
  weightXWad: Scalars['BigInt']['output'];
  weightY: Scalars['Float']['output'];
  weightYWad: Scalars['BigInt']['output'];
};

export type G3MParametersFilter = {
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
  swapFee?: InputMaybe<Scalars['Float']['input']>;
  swapFeeWad?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFeeWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  swapFeeWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  swapFee_gt?: InputMaybe<Scalars['Float']['input']>;
  swapFee_gte?: InputMaybe<Scalars['Float']['input']>;
  swapFee_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  swapFee_lt?: InputMaybe<Scalars['Float']['input']>;
  swapFee_lte?: InputMaybe<Scalars['Float']['input']>;
  swapFee_not?: InputMaybe<Scalars['Float']['input']>;
  swapFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  weightX?: InputMaybe<Scalars['Float']['input']>;
  weightXWad?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightXWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  weightXWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightX_gt?: InputMaybe<Scalars['Float']['input']>;
  weightX_gte?: InputMaybe<Scalars['Float']['input']>;
  weightX_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  weightX_lt?: InputMaybe<Scalars['Float']['input']>;
  weightX_lte?: InputMaybe<Scalars['Float']['input']>;
  weightX_not?: InputMaybe<Scalars['Float']['input']>;
  weightX_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  weightY?: InputMaybe<Scalars['Float']['input']>;
  weightYWad?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightYWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  weightYWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  weightY_gt?: InputMaybe<Scalars['Float']['input']>;
  weightY_gte?: InputMaybe<Scalars['Float']['input']>;
  weightY_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  weightY_lt?: InputMaybe<Scalars['Float']['input']>;
  weightY_lte?: InputMaybe<Scalars['Float']['input']>;
  weightY_not?: InputMaybe<Scalars['Float']['input']>;
  weightY_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type G3MParametersPage = {
  __typename?: 'G3MParametersPage';
  items?: Maybe<Array<G3MParameters>>;
  pageInfo?: Maybe<PageInfo>;
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
  account: Account;
  accountId: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  liquidity: Scalars['Float']['output'];
  liquidityWad: Scalars['BigInt']['output'];
  lpToken: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parameters: G3MParameters;
  parametersId: Scalars['BigInt']['output'];
  positions?: Maybe<PositionPage>;
  reserveX: Scalars['Float']['output'];
  reserveXWad: Scalars['BigInt']['output'];
  reserveY: Scalars['Float']['output'];
  reserveYWad: Scalars['BigInt']['output'];
  strategy: Strategy;
  strategyId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  tokenX: Token;
  tokenXId: Scalars['String']['output'];
  tokenY: Token;
  tokenYId: Scalars['String']['output'];
};


export type PoolPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type PoolFilter = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  accountId_gt?: InputMaybe<Scalars['String']['input']>;
  accountId_gte?: InputMaybe<Scalars['String']['input']>;
  accountId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accountId_lt?: InputMaybe<Scalars['String']['input']>;
  accountId_lte?: InputMaybe<Scalars['String']['input']>;
  accountId_not?: InputMaybe<Scalars['String']['input']>;
  accountId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  parametersId?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  parametersId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_not?: InputMaybe<Scalars['BigInt']['input']>;
  parametersId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveX?: InputMaybe<Scalars['Float']['input']>;
  reserveXWad?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveXWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserveXWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveX_gt?: InputMaybe<Scalars['Float']['input']>;
  reserveX_gte?: InputMaybe<Scalars['Float']['input']>;
  reserveX_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  reserveX_lt?: InputMaybe<Scalars['Float']['input']>;
  reserveX_lte?: InputMaybe<Scalars['Float']['input']>;
  reserveX_not?: InputMaybe<Scalars['Float']['input']>;
  reserveX_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  reserveY?: InputMaybe<Scalars['Float']['input']>;
  reserveYWad?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveYWad_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserveYWad_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  reserveY_gt?: InputMaybe<Scalars['Float']['input']>;
  reserveY_gte?: InputMaybe<Scalars['Float']['input']>;
  reserveY_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  reserveY_lt?: InputMaybe<Scalars['Float']['input']>;
  reserveY_lte?: InputMaybe<Scalars['Float']['input']>;
  reserveY_not?: InputMaybe<Scalars['Float']['input']>;
  reserveY_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  strategyId?: InputMaybe<Scalars['String']['input']>;
  strategyId_gt?: InputMaybe<Scalars['String']['input']>;
  strategyId_gte?: InputMaybe<Scalars['String']['input']>;
  strategyId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  strategyId_lt?: InputMaybe<Scalars['String']['input']>;
  strategyId_lte?: InputMaybe<Scalars['String']['input']>;
  strategyId_not?: InputMaybe<Scalars['String']['input']>;
  strategyId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
};

export type PoolPage = {
  __typename?: 'PoolPage';
  items?: Maybe<Array<Pool>>;
  pageInfo?: Maybe<PageInfo>;
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
  items?: Maybe<Array<Position>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts?: Maybe<AccountPage>;
  g3MParameters?: Maybe<G3MParameters>;
  g3MParameterss?: Maybe<G3MParametersPage>;
  pool?: Maybe<Pool>;
  pools?: Maybe<PoolPage>;
  position?: Maybe<Position>;
  positions?: Maybe<PositionPage>;
  strategy?: Maybe<Strategy>;
  strategys?: Maybe<StrategyPage>;
  token?: Maybe<Token>;
  tokens?: Maybe<TokenPage>;
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


export type QueryG3MParametersArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryG3MParameterssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<G3MParametersFilter>;
};


export type QueryPoolArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
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
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type StrategyFilter = {
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
  items?: Maybe<Array<Strategy>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Token = {
  __typename?: 'Token';
  decimals: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type TokenFilter = {
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
  items?: Maybe<Array<Token>>;
  pageInfo?: Maybe<PageInfo>;
};
