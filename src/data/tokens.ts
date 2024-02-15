type Token = {
  address: `0x${string}`;
  logo: string;
  decimals: number;
  symbol: string;
  name: string;
}

export const tokens: Token[] = [
  {
    address: '0x9E4c7F96C883994ad0D6Ed690B68B2c53EF60048',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    logo: "https://assets.smold.app/api/token/1/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo-128.png",
  },
  {
    address: '0x935B7D29B20Fad7DF00eDE0D7F80Dc70F0AA8B75',
    logo: 'https://assets.smold.app/api/token/1/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo-128.png',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  }, {
    address: '0x6FAaE08f288F54578952C28D510332570DDc93CF',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logo: 'https://assets.smold.app/api/token/10/0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1/logo-128.png',
  },
];
