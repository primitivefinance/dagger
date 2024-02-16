type Pool = {
  id: bigint;
  tokenX: Token;
  tokenY: Token;
  reserveX: bigint;
  reserveY: bigint;
  liquidity: bigint;
  timestamp: bigint;
  name: string;
  lpToken: `0x${string}`;
  parameters: G3MParameters;
};

type Token = {
  name: string;
  symbol: string;
  decimals: number;
  id: `0x${string}`
}

type G3MParameters = {
  id: bigint;
  swapFee: bigint;
  weightX: bigint;
  weightY: bigint;
  controller: string;
}

