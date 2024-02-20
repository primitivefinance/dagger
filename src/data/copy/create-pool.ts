export const title:string = 'Create New DFMM Pool'

export const subtitle:string = 'Determine parameters, define a DFMM strategy contract, and deposit assets.'

type Tag = { title:string, sub:string }

export const tags:Tag[] = [
  { title: 'Pair', sub: 'Select the tokens to include in the pool.'},
  { title: 'Strategy', sub: 'Select a DFMM strategy.'},
  { title: 'Fee Rate', sub: 'Cost of automated portfolio rebalancing.'},
  { title: 'Pool Weights', sub: 'Portfolio composition of a particular pair.'},
  { title: 'Strategy Controller', sub: 'Smart contract address of a DFMM strategy.'},
  { title: 'Add Liquidity', sub: 'Determine the required asset quantities for pool creation.'}
]

export const strats:Tag[] = [
  { title: 'G3M', sub: 'Geometric mean strategy.'},
  { title: 'LogNormal', sub: 'LogNormal strategy.'}
]

export const feeLevels:Tag[] = [
  { title: '0.01%', sub: 'Highly correlated asset pairs with negligible volatility.'},
  { title: '0.05%', sub: 'Correlated asset pairs, such as stablecoins, with low volatility.'},
  { title: '0.30%', sub: 'Asset pairs with normal volaility.'},
  { title: '1.00%', sub: 'Exotic pairs with high volatility.'}
]

export const weights:Tag[] = [
  { title: '20%/80%', sub: 'lorem'},
  { title: '30%/70%', sub: 'ipsum'},
  { title: '50%/50%', sub: 'Even portfolio composition.'}
]