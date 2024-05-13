export type ListedToken = {
    address: `0x${string}`
    logo: string
    decimals: number
    symbol: string
    name: string
    faucet?: number
}

export type TokenList = {
    [key: number]: ListedToken[]
}

export type ytData = {
    syToken: ListedToken
    ptToken: ListedToken
    ytToken: ListedToken
    ibToken: ListedToken
    underlyingToken: ListedToken
    expiry: string
    initialRate: number // temporary, will convert to string w/ real data
    currentRate: number
    isYT: boolean
    strategy: `0x${string}`
    description: string
    poolLink: string
}

export type ytDataList = {
    [key: number]: ytData[]
}

export type lptData = {
    lpToken: ListedToken
    curator: `0x${string}`
    strategy: `0x${string}`
    description: string
    poolLink: string
}

export type lptDataList = {
    [key: number]: lptData[]
}

export const eth: ListedToken = {
    address: '0x0',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
}

export const tokens: TokenList = {
    [11155420]: [
        {
            address: '0xd26CC5E66b5BaE0412D89Eb8ddDF54b9A7afe600',
            name: 'Superliquid',
            symbol: 'Superliquid',
            decimals: 18,
            logo: '',
        },
        {
            address: '0x91eC29AB1efedb051253A3283E7e3b3B517A079f',
            name: 'SY wstETH',
            symbol: 'SY-wstETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png?1696518295',
            faucet: 10,
        },
        {
            address: '0x91eC29AB1efedb051253A3283E7e3b3B517A079f',
            name: 'Y-2025-05-01 wstETH',
            symbol: 'Y250501-wstETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png?1696518295',
            faucet: 10,
        },
        {
            address: '0x91eC29AB1efedb051253A3283E7e3b3B517A079f',
            name: 'P-2025-05-01 wstETH',
            symbol: 'P250501-wstETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png?1696518295',
            faucet: 10,
        },
        {
            address: '0x91eC29AB1efedb051253A3283E7e3b3B517A079f',
            name: 'Wrapped stETH',
            symbol: 'wstETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/18834/standard/wstETH.png?1696518295',
            faucet: 10,
        },
        {
            address: '0x77070b7A5d9226D5D5779A6eDa2B5062D9127767',
            name: 'Coinbase Wrapped Staked ETH',
            symbol: 'cbETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1709186989',
            faucet: 10,
        },
        {
            address: '0xD9b682E2835B25f9DB9F1524C7810141915c7eC0',
            name: 'Rocket Pool ETH',
            symbol: 'rETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/20764/standard/reth.png?1696520159',

            faucet: 10,
        },
        {
            address: '0x64542b6fea64EBa7a8Ab643b6ECEbA425D4aeA1E',
            name: 'Mantle Staked Ether',
            symbol: 'mETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/33345/standard/symbol_transparent_bg.png?1701697066',
            faucet: 10,
        },
        {
            address: '0x8344B682D4FAfd21D1600044d66e3844ea99B844',
            name: 'Wrapped Ether',
            symbol: 'WETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/2518/standard/weth.png?1696503332',
            faucet: 10,
        },
    ],
}

/// MOCKED
export const yieldTokenMetadata: ytDataList = {
    [11155420]: [
        {
            syToken: tokens[11155420][1],
            ptToken: tokens[11155420][2],
            ytToken: tokens[11155420][3],
            ibToken: tokens[11155420][0],
            underlyingToken: tokens[11155420][0],
            expiry: '1714536000', // May 1st, 2024,
            initialRate: 1.04,
            currentRate: 1.03,
            isYT: true,
            strategy: '0x8Cc5377b8384F210170901c5EAb6C8a257f02316', // temp, replace with real contract,
            description:
                'Yield Token on wstETH.  Represents the the yield accured by wstETH until expiry.',
            poolLink: '/pool/0',
        },
    ],
}

export const lpTokenMetadata: lptDataList = {
    [11155420]: [
        {
            lpToken: tokens[11155420][0],
            curator: `0x00000000000000`,
            strategy: `0x8Cc5377b8384F210170901c5EAb6C8a257f02316`,
            description:
                'Superliquid is an even-weight, 4 asset portfolio of wstETH, cbETH, mETH, and rETH.',
            poolLink: '/pool/0',
        },
    ],
}
