type Token = {
    address: `0x${string}` | string
    logo: string
    decimals: number
    symbol: string
    name: string
    faucet?: number
}

type TokenList = {
    [key: number]: Token[]
}

export const eth: Token = {
    address: '0x0',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
}

export const tokens: TokenList = {
    [11155420]: [
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
        },
        {
            address: '0x64542b6fea64EBa7a8Ab643b6ECEbA425D4aeA1E',
            name: 'Mantle Staked Ether',
            symbol: 'mETH',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/33345/standard/symbol_transparent_bg.png?1701697066',
        },
    ],
}
