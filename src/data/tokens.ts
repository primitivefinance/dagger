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
