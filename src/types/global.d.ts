type Pool = {
    id: bigint
    tokenX: Token
    tokenY: Token
    reserveX: number
    reserveXWad: bigint
    reserveYWad: bigint
    reserveY: number
    liquidity: number
    liquidityWad: bigint
    timestamp: bigint
    name: string
    lpToken: `0x${string}`
    parameters: G3MParameters
    strategy: Strategy
    positions: {
        items: Position[]
    }
}

type Token = {
    name: string
    symbol: string
    decimals: number
    id: `0x${string}`
}

type G3MParameters = {
    id: bigint
    swapFeeWad: bigint
    swapFee: number
    weightXWad: bigint
    weightX: number
    weightY: number
    weightYWad: bigint
    controller: string
}

type Strategy = {
    name: string
    id: `0x${string}`
}

type Position = {
    liquidityWad: bigint
    liquidity: number
    accountId: `0x${string}`
    id: `0x${string}`
    poolId: bigint
    pool: Pool
}
