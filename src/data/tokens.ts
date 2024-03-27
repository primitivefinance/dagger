type Token = {
  address: `0x${string}`;
  logo: string;
  decimals: number;
  symbol: string;
  name: string;
  faucet?: number;
}

export const tokens: Token[] = [
  {
    address: '0xCB79ea015aCF9dc52843F47460c1ebab8eF0C613',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    logo: "https://assets.smold.app/api/token/1/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo-128.png",
    faucet: 10,
  },
  {
    address: '0x71C03954a0078a102d14A78e60a8E5CD5e5A1F3C',
    logo: 'https://assets.smold.app/api/token/1/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo-128.png',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    faucet: 10000,
  },
  {
    address: '0x1815EdF2Da311B42794F8b55990D7D2539073e64',
    logo: 'https://assets.smold.app/api/token/10/0x94b008aA00579c1307B0EF2c499aD98a8ce58e58/logo-128.png',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    faucet: 10000,
  },
  {
    address: '0x2b624C9C1E2cDc79639811Caa92C5c796a908166',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logo: 'https://assets.smold.app/api/token/10/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1/logo-128.png',
    faucet: 10000,
  },
  {
    address: '0xd694F704a835BfaF22b2709C2150A7957096412B',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 18,
    logo: 'https://assets.smold.app/api/token/10/0x68f180fcCe6836688e9084f035309E29Bf0A2095/logo-128.png',
    faucet: 5,
  },
];


export const l1_test_tokens: Token[] = [
  {
    address: '0x9e16Ace538956f6654E20EEB2DB6972Fe6884F71',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    faucet: 10
  },
  {
    address: '0xFAA53A584B893359D5c15C6a97edF982B0D142dF',
    symbol: 'mETH',
    name: 'Mantle Staked ETH',
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/33345/standard/symbol_transparent_bg.png?1701697066',
    faucet: 1000
  },
  {
    address: '0xbCEc7763Cb0683dE98095bfA6A8C14a49675E655',
    symbol: 'cbETH',
    name: 'Coinbase Staked ETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21535.png',
    faucet: 1000
  },
  {
    address: '0x97Fd5e441902bE62A78f6d4110B1E094e7A70a56',
    symbol: 'rETH',
    name: 'Rocketpool Staked ETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/15060.png',
    faucet: 1000
  },
  {
    address: '0x797CD94ba30A85c95Db09C832B0197C3832156E5',
    symbol: 'wstETH',
    name: 'Wrapped stETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/12409.png',
    faucet: 1000
  }
]

export const l2_test_tokens: Token[] = [
  {
    address: '0x6AA84FBbc17c87bC29B7A8D457c09360858Ce8f1',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    faucet: 10
  },
  {
    address: '0x5E4b52E6a1922af9f4eF981ffFd3D1Cc0a574004',
    symbol: 'mETH',
    name: 'Mantle Staked ETH',
    decimals: 18,
    logo: 'https://assets.coingecko.com/coins/images/33345/standard/symbol_transparent_bg.png?1701697066',
    faucet: 1000
  },
  {
    address: '0x24240Be4f445763F7684F48Deb74B3B05a025b00',
    symbol: 'cbETH',
    name: 'Coinbase Staked ETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21535.png',
    faucet: 1000
  },
  {
    address: '0x8240A8D6Ea6bC5D431DF9bD96c3ef09b2a7E0E28',
    symbol: 'rETH',
    name: 'Rocketpool Staked ETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/15060.png',
    faucet: 1000
  },
  {
    address: '0xeaF28e4A2E9F11ABaBF6c3B01305A7d656974ce9',
    symbol: 'wstETH',
    name: 'Wrapped stETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/12409.png',
    faucet: 1000
  }
]